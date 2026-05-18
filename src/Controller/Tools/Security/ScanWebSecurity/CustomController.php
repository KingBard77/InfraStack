<?php

namespace App\Controller\Tools\Security\ScanWebSecurity;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class CustomController extends AbstractController
{
    private const MAX_REDIRECTS = 5;

    private const SECURITY_HEADERS = [
        'strict-transport-security',
        'content-security-policy',
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
        'permissions-policy',
        'cross-origin-opener-policy',
        'cross-origin-resource-policy',
        'cross-origin-embedder-policy',
        'access-control-allow-origin',
        'access-control-allow-credentials',
        'access-control-allow-methods',
        'access-control-allow-headers',
    ];

    private const WELL_KNOWN_PATHS = [
        '/.well-known/security.txt' => 'Security contact disclosure',
        '/security.txt' => 'Legacy security contact disclosure',
        '/robots.txt' => 'Crawler access policy',
        '/.well-known/change-password' => 'Password change endpoint hint',
    ];

    public function __construct(private readonly HttpClientInterface $httpClient)
    {
    }

    #[Route('/api/security/scan-web-security', name: 'app_security_scan_web_security', methods: ['POST'])]
    public function scan(Request $request): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json([
                'error' => 'Invalid JSON payload.',
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $query = $this->buildQuery($payload);
        $validationError = $this->validatePublicUrl($query['url']);

        if ($validationError !== null) {
            return $this->json([
                'error' => $validationError,
                'query' => $query,
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $startedAt = microtime(true);

        try {
            $scan = $this->requestWithRedirects(
                $query['method'],
                $query['url'],
                $query
            );

            if (
                $scan['statusCode'] === 405
                && $query['method'] === 'HEAD'
                && $query['fallbackGetOn405']
            ) {
                $scan = $this->requestWithRedirects('GET', $query['url'], $query);
            }

            $httpUpgrade = $query['probeHttpUpgrade']
                ? $this->probeHttpUpgrade($query['url'], $query)
                : $this->buildSkippedUpgradeResult();

            $knownFileRows = $query['checkWellKnownFiles']
                ? $this->buildKnownFileRows($scan['finalUrl'], $query)
                : [];

            $cookieRows = $this->buildCookieRows($scan['headers']);
            $headerRows = $this->buildHeaderRows($scan['headers']);
            $transportRows = $this->buildTransportRows($scan, $httpUpgrade);
            $findings = $this->buildFindings($scan, $httpUpgrade, $cookieRows, $query);
            $durationMs = (int) round((microtime(true) - $startedAt) * 1000);
            $summary = $this->buildSummary(
                $scan,
                $findings,
                $headerRows,
                $cookieRows,
                $knownFileRows,
                $httpUpgrade,
                $durationMs
            );

            return $this->json([
                'query' => $query,
                'summary' => $summary,
                'findings' => $findings,
                'headerRows' => $headerRows,
                'transportRows' => $transportRows,
                'knownFileRows' => $knownFileRows,
                'cookieRows' => $cookieRows,
                'generatedAt' => gmdate('c'),
            ]);
        } catch (TransportExceptionInterface $exception) {
            return $this->json([
                'error' => $this->formatTransportError($exception->getMessage()),
                'query' => $query,
            ], JsonResponse::HTTP_BAD_GATEWAY);
        } catch (\RuntimeException $exception) {
            return $this->json([
                'error' => $exception->getMessage() ?: 'The web security scan could not be completed.',
                'query' => $query,
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }

    /**
     * @param array<string, mixed> $payload
     *
     * @return array<string, mixed>
     */
    private function buildQuery(array $payload): array
    {
        $method = strtoupper((string) ($payload['method'] ?? 'HEAD'));
        $userAgentProfile = strtolower((string) ($payload['userAgentProfile'] ?? 'default'));

        if (!in_array($method, ['HEAD', 'GET'], true)) {
            $method = 'HEAD';
        }

        if (!in_array($userAgentProfile, ['default', 'desktop', 'mobile'], true)) {
            $userAgentProfile = 'default';
        }

        return [
            'url' => $this->normalizeUrl((string) ($payload['url'] ?? '')),
            'method' => $method,
            'followRedirects' => (bool) ($payload['followRedirects'] ?? true),
            'timeoutSeconds' => $this->normalizeTimeoutSeconds($payload['timeoutSeconds'] ?? 12),
            'validateTls' => (bool) ($payload['validateTls'] ?? true),
            'fallbackGetOn405' => (bool) ($payload['fallbackGetOn405'] ?? true),
            'userAgentProfile' => $userAgentProfile,
            'checkWellKnownFiles' => (bool) ($payload['checkWellKnownFiles'] ?? true),
            'probeHttpUpgrade' => (bool) ($payload['probeHttpUpgrade'] ?? true),
        ];
    }

    private function normalizeUrl(string $value): string
    {
        $trimmedValue = trim($value);

        if ($trimmedValue === '') {
            return '';
        }

        if (!preg_match('#^https?://#i', $trimmedValue)) {
            $trimmedValue = 'https://' . $trimmedValue;
        }

        $parts = parse_url($trimmedValue);

        if ($parts === false || empty($parts['host'])) {
            return '';
        }

        $scheme = strtolower((string) ($parts['scheme'] ?? ''));

        if (!in_array($scheme, ['http', 'https'], true)) {
            return '';
        }

        if (isset($parts['user']) || isset($parts['pass'])) {
            return '';
        }

        $host = strtolower((string) $parts['host']);
        $path = (string) ($parts['path'] ?? '/');
        $query = isset($parts['query']) ? '?' . $parts['query'] : '';
        $port = isset($parts['port']) ? ':' . (int) $parts['port'] : '';

        return $scheme . '://' . $host . $port . ($path === '' ? '/' : $path) . $query;
    }

    private function normalizeTimeoutSeconds(mixed $value): int
    {
        $timeoutSeconds = (int) round((float) $value);

        if ($timeoutSeconds < 1) {
            return 12;
        }

        return min($timeoutSeconds, 30);
    }

    private function validatePublicUrl(string $url): ?string
    {
        if ($url === '') {
            return 'Enter a valid HTTP or HTTPS URL.';
        }

        $parts = parse_url($url);

        if ($parts === false || empty($parts['scheme']) || empty($parts['host'])) {
            return 'Enter a valid HTTP or HTTPS URL.';
        }

        $scheme = strtolower((string) $parts['scheme']);

        if (!in_array($scheme, ['http', 'https'], true)) {
            return 'Only HTTP and HTTPS targets are supported.';
        }

        $host = strtolower((string) $parts['host']);

        if (
            $host === 'localhost'
            || str_ends_with($host, '.localhost')
            || str_ends_with($host, '.local')
            || str_contains($host, '..')
        ) {
            return 'Local and private network targets are not allowed.';
        }

        $ips = $this->resolveHostIps($host);

        if ($ips === []) {
            return 'The target host could not be resolved.';
        }

        foreach ($ips as $ip) {
            if (!$this->isPublicIp($ip)) {
                return 'Local and private network targets are not allowed.';
            }
        }

        return null;
    }

    /**
     * @return list<string>
     */
    private function resolveHostIps(string $host): array
    {
        if (filter_var($host, FILTER_VALIDATE_IP)) {
            return [$host];
        }

        $records = @dns_get_record($host, DNS_A + DNS_AAAA);
        $ips = [];

        if (is_array($records)) {
            foreach ($records as $record) {
                if (isset($record['ip']) && is_string($record['ip'])) {
                    $ips[] = $record['ip'];
                }

                if (isset($record['ipv6']) && is_string($record['ipv6'])) {
                    $ips[] = $record['ipv6'];
                }
            }
        }

        if ($ips === []) {
            $ipv4Records = @gethostbynamel($host);

            if (is_array($ipv4Records)) {
                $ips = array_merge($ips, $ipv4Records);
            }
        }

        return array_values(array_unique($ips));
    }

    private function isPublicIp(string $ip): bool
    {
        return filter_var(
            $ip,
            FILTER_VALIDATE_IP,
            FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
        ) !== false;
    }

    /**
     * @param array<string, mixed> $query
     *
     * @return array<string, mixed>
     */
    private function requestWithRedirects(string $method, string $url, array $query): array
    {
        $currentUrl = $url;
        $redirects = [];
        $headers = [];
        $statusCode = 0;

        for ($redirectIndex = 0; $redirectIndex <= self::MAX_REDIRECTS; $redirectIndex++) {
            $validationError = $this->validatePublicUrl($currentUrl);

            if ($validationError !== null) {
                throw new \RuntimeException($validationError);
            }

            $response = $this->httpClient->request($method, $currentUrl, $this->buildHttpOptions($query));
            $statusCode = $response->getStatusCode();
            $headers = $response->getHeaders(false);

            if (
                !$query['followRedirects']
                || !$this->isRedirectStatus($statusCode)
                || empty($headers['location'][0])
            ) {
                break;
            }

            $nextUrl = $this->resolveRedirectUrl($currentUrl, (string) $headers['location'][0]);
            $validationError = $this->validatePublicUrl($nextUrl);

            if ($validationError !== null) {
                break;
            }

            $redirects[] = [
                'from' => $currentUrl,
                'to' => $nextUrl,
                'status' => $statusCode,
            ];
            $currentUrl = $nextUrl;
        }

        return [
            'finalUrl' => $currentUrl,
            'statusCode' => $statusCode,
            'statusText' => $this->statusText($statusCode),
            'headers' => $this->normalizeHeaders($headers),
            'methodUsed' => $method,
            'redirects' => $redirects,
        ];
    }

    /**
     * @param array<string, mixed> $query
     *
     * @return array<string, mixed>
     */
    private function buildHttpOptions(array $query): array
    {
        $timeoutSeconds = (int) $query['timeoutSeconds'];

        return [
            'headers' => [
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'User-Agent' => $this->userAgent((string) $query['userAgentProfile']),
            ],
            'max_duration' => $timeoutSeconds,
            'max_redirects' => 0,
            'timeout' => $timeoutSeconds,
            'verify_host' => (bool) $query['validateTls'],
            'verify_peer' => (bool) $query['validateTls'],
        ];
    }

    private function userAgent(string $profile): string
    {
        return match ($profile) {
            'desktop' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
            'mobile' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            default => 'InfraStack-Web-Security-Scanner/1.0',
        };
    }

    private function isRedirectStatus(int $statusCode): bool
    {
        return in_array($statusCode, [301, 302, 303, 307, 308], true);
    }

    private function resolveRedirectUrl(string $baseUrl, string $location): string
    {
        $trimmedLocation = trim($location);

        if ($trimmedLocation === '') {
            return $baseUrl;
        }

        if (preg_match('#^https?://#i', $trimmedLocation)) {
            return $this->normalizeUrl($trimmedLocation);
        }

        $base = parse_url($baseUrl);

        if ($base === false || empty($base['scheme']) || empty($base['host'])) {
            return '';
        }

        if (str_starts_with($trimmedLocation, '//')) {
            return $this->normalizeUrl((string) $base['scheme'] . ':' . $trimmedLocation);
        }

        $authority = $this->buildAuthority($base);

        if (str_starts_with($trimmedLocation, '/')) {
            return $this->normalizeUrl((string) $base['scheme'] . '://' . $authority . $trimmedLocation);
        }

        $path = (string) ($base['path'] ?? '/');
        $directory = rtrim(substr($path, 0, (int) strrpos($path, '/') + 1), '/');

        return $this->normalizeUrl(
            (string) $base['scheme'] . '://' . $authority . ($directory === '' ? '/' : $directory . '/') . $trimmedLocation
        );
    }

    /**
     * @param array<string, mixed> $parts
     */
    private function buildAuthority(array $parts): string
    {
        $host = strtolower((string) ($parts['host'] ?? ''));
        $port = isset($parts['port']) ? ':' . (int) $parts['port'] : '';

        return $host . $port;
    }

    /**
     * @param array<string, list<string>> $headers
     *
     * @return array<string, list<string>>
     */
    private function normalizeHeaders(array $headers): array
    {
        $normalizedHeaders = [];

        foreach ($headers as $name => $values) {
            $normalizedName = strtolower((string) $name);
            $normalizedHeaders[$normalizedName] = array_values(array_map(
                static fn (mixed $value): string => (string) $value,
                is_array($values) ? $values : [$values]
            ));
        }

        return $normalizedHeaders;
    }

    /**
     * @param array<string, mixed> $query
     *
     * @return array<string, mixed>
     */
    private function probeHttpUpgrade(string $url, array $query): array
    {
        $parts = parse_url($url);

        if ($parts === false || empty($parts['host'])) {
            return $this->buildSkippedUpgradeResult();
        }

        $parts['scheme'] = 'http';
        $probeUrl = $this->normalizeUrl('http://' . $this->buildAuthority($parts) . (string) ($parts['path'] ?? '/') . (isset($parts['query']) ? '?' . $parts['query'] : ''));

        if ($probeUrl === '') {
            return $this->buildSkippedUpgradeResult();
        }

        try {
            $response = $this->httpClient->request('HEAD', $probeUrl, $this->buildHttpOptions(array_merge($query, [
                'followRedirects' => false,
                'validateTls' => false,
            ])));
            $statusCode = $response->getStatusCode();
            $headers = $this->normalizeHeaders($response->getHeaders(false));
            $location = (string) ($headers['location'][0] ?? '');
            $upgrades = $this->isRedirectStatus($statusCode) && str_starts_with(strtolower($location), 'https://');

            return [
                'state' => $upgrades ? 'pass' : 'warn',
                'label' => $upgrades ? 'HTTP upgrades to HTTPS' : 'HTTP upgrade not confirmed',
                'statusCode' => $statusCode,
                'location' => $location,
                'url' => $probeUrl,
            ];
        } catch (TransportExceptionInterface) {
            return [
                'state' => 'info',
                'label' => 'HTTP upgrade probe unavailable',
                'statusCode' => 0,
                'location' => '',
                'url' => $probeUrl,
            ];
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function buildSkippedUpgradeResult(): array
    {
        return [
            'state' => 'info',
            'label' => 'HTTP upgrade not probed',
            'statusCode' => 0,
            'location' => '',
            'url' => '',
        ];
    }

    /**
     * @param array<string, mixed> $query
     *
     * @return list<array<string, mixed>>
     */
    private function buildKnownFileRows(string $finalUrl, array $query): array
    {
        $parts = parse_url($finalUrl);

        if ($parts === false || empty($parts['scheme']) || empty($parts['host'])) {
            return [];
        }

        $baseUrl = (string) $parts['scheme'] . '://' . $this->buildAuthority($parts);
        $rows = [];

        foreach (self::WELL_KNOWN_PATHS as $path => $note) {
            $probeUrl = $baseUrl . $path;

            try {
                $response = $this->httpClient->request('GET', $probeUrl, $this->buildHttpOptions($query));
                $statusCode = $response->getStatusCode();
                $present = $statusCode >= 200 && $statusCode < 400;
                $rows[] = [
                    'path' => $path,
                    'status' => $statusCode,
                    'statusText' => $this->statusText($statusCode),
                    'statusLabel' => trim($statusCode . ' ' . $this->statusText($statusCode)),
                    'present' => $present,
                    'note' => $present ? $note . ' found.' : $note . ' not found.',
                    'url' => $probeUrl,
                    'copyValue' => $probeUrl . ' ' . $statusCode,
                ];
            } catch (TransportExceptionInterface) {
                $rows[] = [
                    'path' => $path,
                    'status' => 0,
                    'statusText' => 'Unavailable',
                    'statusLabel' => 'Unavailable',
                    'present' => false,
                    'note' => $note . ' could not be probed.',
                    'url' => $probeUrl,
                    'copyValue' => $probeUrl . ' unavailable',
                ];
            }
        }

        return $rows;
    }

    /**
     * @param array<string, list<string>> $headers
     *
     * @return list<array<string, string>>
     */
    private function buildHeaderRows(array $headers): array
    {
        $rows = [];
        $index = 1;

        foreach ($headers as $name => $values) {
            if ($name === 'set-cookie') {
                continue;
            }

            $displayName = $this->displayHeaderName($name);
            $value = $this->truncateValue(implode(', ', $values));

            $rows[] = [
                'index' => (string) $index,
                'category' => str_starts_with($name, 'access-control-')
                    ? 'CORS'
                    : (in_array($name, self::SECURITY_HEADERS, true) ? 'Security' : $this->headerCategory($name)),
                'name' => $displayName,
                'value' => $value,
                'copyValue' => $displayName . ': ' . $value,
            ];
            $index++;
        }

        return $rows;
    }

    private function displayHeaderName(string $name): string
    {
        return implode('-', array_map(
            static fn (string $part): string => ucfirst($part),
            explode('-', $name)
        ));
    }

    private function headerCategory(string $name): string
    {
        if (str_starts_with($name, 'access-control-')) {
            return 'CORS';
        }

        if (in_array($name, ['server', 'x-powered-by', 'via'], true)) {
            return 'Disclosure';
        }

        if (in_array($name, ['cache-control', 'pragma', 'expires'], true)) {
            return 'Cache';
        }

        if (in_array($name, ['location', 'content-type', 'content-length'], true)) {
            return 'Response';
        }

        return 'General';
    }

    private function truncateValue(string $value): string
    {
        $compactValue = preg_replace('/\s+/', ' ', trim($value)) ?? trim($value);

        if (strlen($compactValue) <= 260) {
            return $compactValue;
        }

        return substr($compactValue, 0, 257) . '...';
    }

    /**
     * @param array<string, list<string>> $headers
     *
     * @return list<array<string, string>>
     */
    private function buildCookieRows(array $headers): array
    {
        $cookies = $headers['set-cookie'] ?? [];
        $rows = [];

        foreach ($cookies as $rawCookie) {
            $parts = array_map('trim', explode(';', $rawCookie));
            $nameValue = array_shift($parts) ?? '';
            $name = explode('=', $nameValue, 2)[0] ?? 'cookie';
            $attributes = array_map('strtolower', $parts);
            $secure = in_array('secure', $attributes, true);
            $httpOnly = in_array('httponly', $attributes, true);
            $sameSite = 'Missing';

            foreach ($attributes as $attribute) {
                if (str_starts_with($attribute, 'samesite=')) {
                    $sameSite = ucfirst(substr($attribute, 9));
                }
            }

            $issues = [];

            if (!$secure) {
                $issues[] = 'missing Secure';
            }

            if (!$httpOnly) {
                $issues[] = 'missing HttpOnly';
            }

            if ($sameSite === 'Missing') {
                $issues[] = 'missing SameSite';
            }

            $rows[] = [
                'name' => $name,
                'secure' => $secure ? 'Yes' : 'No',
                'httpOnly' => $httpOnly ? 'Yes' : 'No',
                'sameSite' => $sameSite,
                'issues' => $issues === [] ? 'No visible attribute gaps' : implode(', ', $issues),
                'raw' => $this->truncateValue($rawCookie),
                'copyValue' => $name . ': ' . ($issues === [] ? 'cookie attributes look hardened' : implode(', ', $issues)),
            ];
        }

        return $rows;
    }

    /**
     * @param array<string, mixed> $scan
     * @param array<string, mixed> $httpUpgrade
     *
     * @return list<array<string, string>>
     */
    private function buildTransportRows(array $scan, array $httpUpgrade): array
    {
        $finalUrlParts = parse_url((string) $scan['finalUrl']);
        $scheme = strtoupper((string) ($finalUrlParts['scheme'] ?? 'unknown'));
        $redirectCount = is_array($scan['redirects']) ? count($scan['redirects']) : 0;

        return [
            [
                'label' => 'Final URL',
                'value' => (string) $scan['finalUrl'],
                'copyValue' => (string) $scan['finalUrl'],
            ],
            [
                'label' => 'Final scheme',
                'value' => $scheme,
                'copyValue' => 'Final scheme: ' . $scheme,
            ],
            [
                'label' => 'Redirects followed',
                'value' => (string) $redirectCount,
                'copyValue' => 'Redirects followed: ' . $redirectCount,
            ],
            [
                'label' => 'HTTP upgrade probe',
                'value' => (string) ($httpUpgrade['label'] ?? 'HTTP upgrade not probed'),
                'copyValue' => (string) ($httpUpgrade['label'] ?? 'HTTP upgrade not probed'),
            ],
        ];
    }

    /**
     * @param array<string, mixed> $scan
     * @param array<string, mixed> $httpUpgrade
     * @param list<array<string, string>> $cookieRows
     * @param array<string, mixed> $query
     *
     * @return list<array<string, mixed>>
     */
    private function buildFindings(array $scan, array $httpUpgrade, array $cookieRows, array $query): array
    {
        $headers = is_array($scan['headers']) ? $scan['headers'] : [];
        $finalUrlParts = parse_url((string) $scan['finalUrl']);
        $finalScheme = strtolower((string) ($finalUrlParts['scheme'] ?? ''));
        $findings = [];

        $this->addFinding(
            $findings,
            'Transport',
            'HTTPS final destination',
            $finalScheme === 'https' ? 'pass' : 'fail',
            'high',
            $finalScheme === 'https' ? 'Final URL uses HTTPS.' : 'Final URL does not use HTTPS.',
            'Serve the target over HTTPS and redirect HTTP traffic to HTTPS.'
        );

        $hsts = $this->firstHeader($headers, 'strict-transport-security');
        $this->addFinding(
            $findings,
            'Transport',
            'Strict-Transport-Security',
            $hsts !== '' ? 'pass' : ($finalScheme === 'https' ? 'warn' : 'fail'),
            'high',
            $hsts !== '' ? 'HSTS header present.' : 'HSTS header was not observed.',
            'Set Strict-Transport-Security on HTTPS responses after confirming HTTPS readiness.'
        );

        $this->addHeaderFinding($findings, $headers, 'content-security-policy', 'Headers', 'Content-Security-Policy', 'medium', 'Add a Content-Security-Policy to reduce script and content injection risk.');
        $this->addFrameProtectionFinding($findings, $headers);
        $this->addHeaderFinding($findings, $headers, 'x-content-type-options', 'Headers', 'X-Content-Type-Options', 'low', 'Set X-Content-Type-Options: nosniff.');
        $this->addHeaderFinding($findings, $headers, 'referrer-policy', 'Headers', 'Referrer-Policy', 'low', 'Set a Referrer-Policy that limits unnecessary URL leakage.');
        $this->addHeaderFinding($findings, $headers, 'permissions-policy', 'Headers', 'Permissions-Policy', 'low', 'Set a Permissions-Policy for browser features the site does not need.');
        $this->addCorsFinding($findings, $headers);

        $serverHeader = $this->firstHeader($headers, 'server');
        $poweredBy = $this->firstHeader($headers, 'x-powered-by');
        $disclosureEvidence = trim(implode(' ', array_filter([$serverHeader !== '' ? 'Server: ' . $serverHeader : '', $poweredBy !== '' ? 'X-Powered-By: ' . $poweredBy : ''])));
        $this->addFinding(
            $findings,
            'Disclosure',
            'Technology disclosure headers',
            $disclosureEvidence === '' ? 'pass' : 'warn',
            'low',
            $disclosureEvidence === '' ? 'No Server or X-Powered-By disclosure header observed.' : $this->truncateValue($disclosureEvidence),
            'Avoid exposing detailed platform, framework, or version information in response headers.'
        );

        $cookieIssueCount = count(array_filter(
            $cookieRows,
            static fn (array $row): bool => ($row['issues'] ?? '') !== 'No visible attribute gaps'
        ));
        $this->addFinding(
            $findings,
            'Cookies',
            'Cookie attribute posture',
            $cookieIssueCount === 0 ? 'pass' : 'warn',
            'medium',
            $cookieRows === [] ? 'No Set-Cookie headers observed.' : $cookieIssueCount . ' cookie row(s) have visible attribute gaps.',
            'Use Secure, HttpOnly, and SameSite attributes for cookies that carry session or sensitive state.'
        );

        $this->addFinding(
            $findings,
            'Transport',
            'HTTP to HTTPS upgrade',
            (string) ($httpUpgrade['state'] ?? 'info'),
            'medium',
            (string) ($httpUpgrade['label'] ?? 'HTTP upgrade not probed'),
            'Redirect HTTP requests to the equivalent HTTPS URL where public HTTP access is expected.'
        );

        if (!$query['validateTls']) {
            $this->addFinding(
                $findings,
                'Transport',
                'TLS certificate validation',
                'warn',
                'medium',
                'TLS certificate validation was disabled for this scan.',
                'Keep TLS certificate validation enabled for normal public posture checks.'
            );
        }

        return $findings;
    }

    /**
     * @param list<array<string, mixed>> $findings
     */
    private function addHeaderFinding(
        array &$findings,
        array $headers,
        string $headerName,
        string $category,
        string $control,
        string $severity,
        string $recommendation
    ): void {
        $value = $this->firstHeader($headers, $headerName);
        $this->addFinding(
            $findings,
            $category,
            $control,
            $value !== '' ? 'pass' : 'warn',
            $severity,
            $value !== '' ? $this->displayHeaderName($headerName) . ' present.' : $this->displayHeaderName($headerName) . ' was not observed.',
            $recommendation
        );
    }

    /**
     * @param list<array<string, mixed>> $findings
     */
    private function addFrameProtectionFinding(array &$findings, array $headers): void
    {
        $xFrameOptions = $this->firstHeader($headers, 'x-frame-options');
        $contentSecurityPolicy = strtolower($this->firstHeader($headers, 'content-security-policy'));
        $hasFrameAncestors = str_contains($contentSecurityPolicy, 'frame-ancestors');

        $this->addFinding(
            $findings,
            'Headers',
            'Clickjacking protection',
            $xFrameOptions !== '' || $hasFrameAncestors ? 'pass' : 'warn',
            'medium',
            $xFrameOptions !== '' || $hasFrameAncestors ? 'Frame protection signal present.' : 'No X-Frame-Options or CSP frame-ancestors signal observed.',
            'Set X-Frame-Options or a Content-Security-Policy frame-ancestors directive.'
        );
    }

    /**
     * @param list<array<string, mixed>> $findings
     */
    private function addCorsFinding(array &$findings, array $headers): void
    {
        $allowOrigin = strtolower($this->firstHeader($headers, 'access-control-allow-origin'));
        $allowCredentials = strtolower($this->firstHeader($headers, 'access-control-allow-credentials'));
        $allowsCredentials = in_array($allowCredentials, ['true', '1'], true);

        if ($allowOrigin === '') {
            $this->addFinding(
                $findings,
                'CORS',
                'Cross-origin read exposure',
                'pass',
                'medium',
                'No Access-Control-Allow-Origin header observed on the primary response.',
                'Only enable CORS for origins that need browser read access to this endpoint.'
            );

            return;
        }

        if ($allowOrigin === '*' && $allowsCredentials) {
            $this->addFinding(
                $findings,
                'CORS',
                'Cross-origin read exposure',
                'fail',
                'medium',
                'Access-Control-Allow-Origin is wildcard and Access-Control-Allow-Credentials is true.',
                'Avoid wildcard origins with credentialed cross-origin responses; allow only trusted origins.'
            );

            return;
        }

        if ($allowOrigin === '*') {
            $this->addFinding(
                $findings,
                'CORS',
                'Cross-origin read exposure',
                'warn',
                'medium',
                'Access-Control-Allow-Origin allows any origin.',
                'Use a specific allowlist when browser read access should be limited.'
            );

            return;
        }

        $this->addFinding(
            $findings,
            'CORS',
            'Cross-origin read exposure',
            'info',
            'low',
            'Access-Control-Allow-Origin is set to a specific value.',
            'Confirm the allowed origin list is intentional and does not reflect arbitrary request origins.'
        );
    }

    /**
     * @param list<array<string, mixed>> $findings
     */
    private function addFinding(
        array &$findings,
        string $category,
        string $control,
        string $status,
        string $severity,
        string $evidence,
        string $recommendation
    ): void {
        $findings[] = [
            'index' => count($findings) + 1,
            'category' => $category,
            'control' => $control,
            'status' => $status,
            'severity' => $severity,
            'evidence' => $evidence,
            'recommendation' => $recommendation,
            'copyValue' => $control . ': ' . $evidence,
        ];
    }

    private function firstHeader(array $headers, string $name): string
    {
        $values = $headers[strtolower($name)] ?? [];

        if (!is_array($values) || $values === []) {
            return '';
        }

        return $this->truncateValue((string) $values[0]);
    }

    /**
     * @param array<string, mixed> $scan
     * @param list<array<string, mixed>> $findings
     * @param list<array<string, string>> $headerRows
     * @param list<array<string, string>> $cookieRows
     * @param list<array<string, mixed>> $knownFileRows
     * @param array<string, mixed> $httpUpgrade
     *
     * @return array<string, mixed>
     */
    private function buildSummary(
        array $scan,
        array $findings,
        array $headerRows,
        array $cookieRows,
        array $knownFileRows,
        array $httpUpgrade,
        int $durationMs
    ): array {
        $failCount = count(array_filter($findings, static fn (array $finding): bool => ($finding['status'] ?? '') === 'fail'));
        $warnCount = count(array_filter($findings, static fn (array $finding): bool => ($finding['status'] ?? '') === 'warn'));
        $score = $this->calculateScore($findings);
        $finalUrlParts = parse_url((string) $scan['finalUrl']);

        return [
            'score' => $score,
            'grade' => $this->scoreGrade($score),
            'scoreNote' => 'Visible response posture only',
            'finalScheme' => (string) ($finalUrlParts['scheme'] ?? ''),
            'finalStatus' => (int) $scan['statusCode'],
            'finalStatusText' => (string) $scan['statusText'],
            'finalUrl' => (string) $scan['finalUrl'],
            'failCount' => $failCount,
            'warnCount' => $warnCount,
            'findingCount' => count($findings),
            'httpUpgradeState' => (string) ($httpUpgrade['state'] ?? 'info'),
            'httpUpgradeLabel' => (string) ($httpUpgrade['label'] ?? 'HTTP upgrade not probed'),
            'hstsState' => $this->firstHeader((array) $scan['headers'], 'strict-transport-security') !== '' ? 'pass' : 'warn',
            'hstsLabel' => $this->firstHeader((array) $scan['headers'], 'strict-transport-security') !== '' ? 'HSTS present' : 'HSTS missing',
            'durationMs' => $durationMs,
            'headerCount' => count($headerRows),
            'cookieCount' => count($cookieRows),
            'knownFilePresentCount' => count(array_filter($knownFileRows, static fn (array $row): bool => (bool) ($row['present'] ?? false))),
            'knownFileCount' => count($knownFileRows),
            'methodUsed' => (string) $scan['methodUsed'],
        ];
    }

    /**
     * @param list<array<string, mixed>> $findings
     */
    private function calculateScore(array $findings): int
    {
        $score = 100;

        foreach ($findings as $finding) {
            $status = (string) ($finding['status'] ?? 'info');
            $severity = (string) ($finding['severity'] ?? 'low');

            if ($status === 'fail') {
                $score -= match ($severity) {
                    'high' => 20,
                    'medium' => 14,
                    default => 8,
                };
            } elseif ($status === 'warn') {
                $score -= match ($severity) {
                    'high' => 12,
                    'medium' => 8,
                    default => 4,
                };
            }
        }

        return max(0, min(100, $score));
    }

    private function scoreGrade(int $score): string
    {
        return match (true) {
            $score >= 90 => 'A',
            $score >= 80 => 'B',
            $score >= 70 => 'C',
            $score >= 60 => 'D',
            default => 'F',
        };
    }

    private function statusText(int $statusCode): string
    {
        return [
            0 => 'Unavailable',
            200 => 'OK',
            201 => 'Created',
            202 => 'Accepted',
            204 => 'No Content',
            301 => 'Moved Permanently',
            302 => 'Found',
            303 => 'See Other',
            304 => 'Not Modified',
            307 => 'Temporary Redirect',
            308 => 'Permanent Redirect',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            429 => 'Too Many Requests',
            500 => 'Internal Server Error',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout',
        ][$statusCode] ?? 'HTTP ' . $statusCode;
    }

    private function formatTransportError(string $message): string
    {
        $trimmedMessage = trim($message);

        if ($trimmedMessage === '') {
            return 'The target could not be reached by the scanner.';
        }

        return 'The target could not be reached by the scanner: ' . $trimmedMessage;
    }
}
