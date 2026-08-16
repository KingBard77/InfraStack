<?php

namespace App\Controller\Studio;

use App\Service\Studio\StudioLibraryService;
use Symfony\Component\Asset\Packages;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Yaml\Yaml;

class StudioController extends AbstractController
{
    #[Route('/studio', name: 'app_studio', methods: ['GET'])]
    public function index(Packages $assets, StudioLibraryService $libraryService): Response
    {
        return $this->render('studio/index.html.twig', [
            'page_title' => 'InfraStack Studio',
            'page_description' => 'Model physical and logical infrastructure views from one local-first architecture project.',
            'page_keywords' => 'InfraStack Studio, infrastructure architecture, physical diagram, logical network diagram',
            'studio_libraries' => $libraryService->decoratedRegistry($assets),
            'studio_packages' => $this->studioPackages($assets),
        ]);
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
