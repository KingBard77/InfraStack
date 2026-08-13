<?php

namespace App\Controller\Studio;

use Symfony\Component\Asset\Packages;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class StudioController extends AbstractController
{
    private const PROVIDERS = [
        'generic' => 'Generic',
        'aws' => 'AWS',
    ];

    #[Route('/studio', name: 'app_studio', methods: ['GET'])]
    public function index(Packages $assets): Response
    {
        return $this->render('studio/index.html.twig', [
            'page_title' => 'InfraStack Studio',
            'page_description' => 'Model physical and logical infrastructure views from one local-first architecture project.',
            'page_keywords' => 'InfraStack Studio, infrastructure architecture, physical diagram, logical network diagram',
            'studio_providers' => $this->studioProviders($assets),
        ]);
    }

    private function studioProviders(Packages $assets): array
    {
        $projectDir = (string) $this->getParameter('kernel.project_dir');
        $providers = [];

        foreach (self::PROVIDERS as $provider => $label) {
            $catalogPath = $projectDir . sprintf('/assets/data/studio/providers/%s/catalog.json', $provider);
            $catalog = is_file($catalogPath) ? json_decode((string) file_get_contents($catalogPath), true) : null;
            $iconUrls = [];

            foreach ($catalog['assets'] ?? [] as $definition) {
                $filename = $definition['icon'] ?? null;
                $catalogId = $definition['catalog_id'] ?? $definition['type'] ?? null;
                if (
                    !is_string($catalogId)
                    || !is_string($filename)
                    || $filename === ''
                    || preg_match('/^[a-z0-9-]+$/', $catalogId) !== 1
                    || preg_match('/^[a-z0-9-]+\.svg$/', $filename) !== 1
                ) {
                    continue;
                }
                $iconUrls[$catalogId] = $assets->getUrl(sprintf('icons/providers/%s/%s', $provider, $filename));
            }

            $providers[$provider] = [
                'label' => $label,
                'catalog_url' => $assets->getUrl(sprintf('data/studio/providers/%s/catalog.json', $provider)),
                'icon_urls' => $iconUrls,
            ];
        }

        return $providers;
    }
}
