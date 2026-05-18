<?php

namespace App\Controller\Tools\Cis\AssessUbuntu2204Cis;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class CustomController extends AbstractController
{
    private const SCRIPT_ROOT = '/templates/content/tools/cis/assess-ubuntu-2204-cis/assets/bin';

    #[Route('/api/cis/assess-ubuntu-2204-cis/script', name: 'app_cis_assess_ubuntu_2204_cis_script', methods: ['POST'])]
    public function script(Request $request): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json([
                'error' => 'Invalid JSON payload.',
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $relativePath = $this->normalizeScriptPath((string) ($payload['scriptPath'] ?? ''));

        if ($relativePath === '') {
            return $this->json([
                'error' => 'Choose a valid benchmark script.',
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $scriptPath = $this->resolveScriptPath($relativePath);

        if ($scriptPath === null || !is_file($scriptPath)) {
            return $this->json([
                'error' => 'The selected script was not found.',
            ], JsonResponse::HTTP_NOT_FOUND);
        }

        $scriptContent = file_get_contents($scriptPath);

        if ($scriptContent === false) {
            return $this->json([
                'error' => 'Failed to load the selected script.',
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            'script' => [
                'script_path' => $relativePath,
                'script_name' => basename($scriptPath),
                'script_line_count' => $this->countScriptLines($scriptContent),
                'script_content' => $scriptContent,
            ],
            'generatedAt' => gmdate('c'),
        ]);
    }

    private function normalizeScriptPath(string $value): string
    {
        $trimmedValue = trim(str_replace('\\', '/', $value));

        if ($trimmedValue === '' || str_starts_with($trimmedValue, '/')) {
            return '';
        }

        if (str_contains($trimmedValue, '..')) {
            return '';
        }

        if (!preg_match('/^[A-Za-z0-9._\/-]+$/', $trimmedValue)) {
            return '';
        }

        if (!str_ends_with($trimmedValue, '.sh')) {
            return '';
        }

        return ltrim($trimmedValue, './');
    }

    private function resolveScriptPath(string $relativePath): ?string
    {
        $projectDir = (string) $this->getParameter('kernel.project_dir');
        $basePath = $projectDir . self::SCRIPT_ROOT;
        $resolvedBasePath = realpath($basePath);

        if ($resolvedBasePath === false) {
            return null;
        }

        $resolvedScriptPath = realpath($resolvedBasePath . DIRECTORY_SEPARATOR . $relativePath);

        if ($resolvedScriptPath === false) {
            return null;
        }

        $normalizedBasePath = rtrim($resolvedBasePath, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;

        if (!str_starts_with($resolvedScriptPath, $normalizedBasePath)) {
            return null;
        }

        return $resolvedScriptPath;
    }

    private function countScriptLines(string $content): int
    {
        if ($content === '') {
            return 0;
        }

        return substr_count($content, "\n") + (str_ends_with($content, "\n") ? 0 : 1);
    }
}
