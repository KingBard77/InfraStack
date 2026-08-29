<?php

namespace App\Controller\Studio;

use App\Service\Studio\StudioLibraryService;
use App\Service\Studio\StudioTemplateRouteService;
use Symfony\Component\Asset\Packages;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Yaml\Yaml;

class StudioController extends AbstractController
{
    #[Route('/studio', name: 'app_studio', methods: ['GET'])]
    public function index(Packages $assets, StudioLibraryService $libraryService): Response
    {
        return $this->renderStudio($assets, $libraryService, null);
    }

    #[Route(
        '/studio/{provider}/{templateId}',
        name: 'app_studio_template',
        requirements: [
            'provider' => '[a-z0-9]+(?:-[a-z0-9]+)*',
            'templateId' => '[a-z0-9]+(?:-[a-z0-9]+)*',
        ],
        methods: ['GET']
    )]
    public function template(
        string $provider,
        string $templateId,
        Packages $assets,
        StudioLibraryService $libraryService,
        StudioTemplateRouteService $templateRouteService
    ): Response {
        $templateRoute = $templateRouteService->resolve($provider, $templateId);
        if ($templateRoute === null) {
            throw $this->createNotFoundException('Studio template route was not found.');
        }

        return $this->renderStudio($assets, $libraryService, $templateRoute);
    }

    private function renderStudio(
        Packages $assets,
        StudioLibraryService $libraryService,
        ?array $templateRoute
    ): Response {
        $pageTitle = $templateRoute['page_title'] ?? 'InfraStack Studio';
        $pageDescription = $templateRoute['page_description']
            ?? 'Model physical and logical infrastructure views from one local-first architecture project.';
        $pageUrl = $templateRoute === null
            ? $this->generateUrl('app_studio', [], UrlGeneratorInterface::ABSOLUTE_URL)
            : $this->generateUrl('app_studio_template', [
                'provider' => $templateRoute['provider'],
                'templateId' => $templateRoute['template_id'],
            ], UrlGeneratorInterface::ABSOLUTE_URL);

        return $this->render('studio/index.html.twig', [
            'page_title' => $pageTitle,
            'page_description' => $pageDescription,
            'page_keywords' => 'InfraStack Studio, infrastructure architecture, physical diagram, logical network diagram',
            'page_url' => $pageUrl,
            'studio_libraries' => $this->studioLibraries($libraryService),
            'studio_packages' => $this->studioPackages($assets),
            'studio_initial_template' => $templateRoute,
            'studio_page_heading' => $templateRoute['page_heading']
                ?? 'Cloud and Infrastructure Architecture Diagram Builder',
        ]);
    }

    #[Route(
        '/api/studio/libraries/{libraryId}/{version}',
        name: 'app_studio_library_catalogue',
        requirements: ['libraryId' => '[a-z0-9-]+', 'version' => '[a-f0-9]{12}'],
        methods: ['GET']
    )]
    public function libraryCatalogue(
        string $libraryId,
        string $version,
        Packages $assets,
        StudioLibraryService $libraryService
    ): JsonResponse {
        $catalogue = $libraryService->catalogue($libraryId, $assets, $version);
        if ($catalogue === null) {
            throw $this->createNotFoundException('Studio library catalogue was not found.');
        }

        return $this->json($catalogue)
            ->setPublic()
            ->setImmutable()
            ->setMaxAge(604800)
            ->setSharedMaxAge(604800);
    }

    #[Route(
        '/api/studio/packages/{packageId}/content',
        name: 'app_studio_package_content',
        requirements: ['packageId' => '[a-z0-9-]+'],
        methods: ['GET']
    )]
    public function packageContent(string $packageId): JsonResponse
    {
        $registry = $this->packageRegistry();
        foreach ($registry['packages'] ?? [] as $package) {
            if (!is_array($package) || ($package['id'] ?? null) !== $packageId) {
                continue;
            }

            $relativePath = $package['content'] ?? null;
            if (!is_string($relativePath) || preg_match('/^[a-z0-9-]+(?:\/[a-z0-9-]+)*\.yml$/', $relativePath) !== 1) {
                break;
            }

            $basePath = (string) $this->getParameter('kernel.project_dir') . '/assets/studio/packages/';
            $content = Yaml::parseFile($basePath . $relativePath);
            if (!is_array($content) || ($content['package_id'] ?? null) !== $packageId) {
                break;
            }

            return $this->json($this->normalizePackageContent($content));
        }

        throw $this->createNotFoundException('Studio package content was not found.');
    }

    private function studioLibraries(StudioLibraryService $libraryService): array
    {
        $registry = $libraryService->registry();
        $registry['libraries'] = array_map(function (array $library): array {
            return [
                ...$library,
                'catalog_url' => $this->generateUrl('app_studio_library_catalogue', [
                    'libraryId' => $library['id'],
                    'version' => $library['version'],
                ]),
            ];
        }, $registry['libraries']);

        return $registry;
    }

    private function studioPackages(Packages $assets): array
    {
        $registry = $this->packageRegistry();

        if (!is_array($registry) || !is_array($registry['packages'] ?? null)) {
            return ['schema_version' => '1.0', 'packages' => []];
        }

        $packages = [];
        foreach ($registry['packages'] as $package) {
            if (!is_array($package)) {
                continue;
            }

            $valid = true;
            foreach (['manifest', 'templates', 'result', 'content'] as $entry) {
                $path = $package[$entry] ?? null;
                if (!is_string($path) || preg_match('/^[a-z0-9-]+(?:\/[a-z0-9-]+)*\.(?:json|yml)$/', $path) !== 1) {
                    $valid = false;
                    break;
                }
                if ($entry !== 'content') {
                    $package[$entry . '_url'] = $assets->getUrl('studio/packages/' . $path);
                }
            }

            if ($valid) {
                $package['content_url'] = $this->generateUrl('app_studio_package_content', [
                    'packageId' => $package['id'],
                ]);
                $packages[] = $package;
            }
        }

        return [
            'schema_version' => (string) ($registry['schema_version'] ?? '1.0'),
            'packages' => $packages,
        ];
    }

    private function packageRegistry(): array
    {
        $projectDir = (string) $this->getParameter('kernel.project_dir');
        $registryPath = $projectDir . '/assets/studio/packages/registry.json';
        $registry = is_file($registryPath) ? json_decode((string) file_get_contents($registryPath), true) : null;

        return is_array($registry) ? $registry : ['schema_version' => '1.0', 'packages' => []];
    }

    private function normalizePackageContent(array $content): array
    {
        $faq = [];
        foreach ($content['faq'] ?? [] as $item) {
            if (!is_array($item) || !is_string($item['question'] ?? null) || !is_string($item['answer'] ?? null)) {
                continue;
            }
            $faq[] = ['question' => trim($item['question']), 'answer' => trim($item['answer'])];
        }

        $references = [];
        foreach ($content['references'] ?? [] as $item) {
            if (!is_array($item)) {
                continue;
            }
            $url = $item['url'] ?? null;
            if (
                !is_string($item['title'] ?? null)
                || !is_string($url)
                || filter_var($url, FILTER_VALIDATE_URL) === false
                || parse_url($url, PHP_URL_SCHEME) !== 'https'
            ) {
                continue;
            }
            $id = $item['id'] ?? null;
            if (!is_string($id) || preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $id) !== 1) {
                continue;
            }
            $references[] = ['id' => $id, 'title' => trim($item['title']), 'url' => $url];
        }

        return [
            'schema_version' => (string) ($content['schema_version'] ?? '1.0'),
            'package_id' => (string) ($content['package_id'] ?? ''),
            'introduction' => trim((string) ($content['introduction'] ?? '')),
            'faq' => $faq,
            'references' => $references,
        ];
    }

}
