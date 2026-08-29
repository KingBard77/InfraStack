<?php

namespace App\Service\Studio;

use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class StudioTemplateRouteService
{
    private const PROVIDER_LABELS = [
        'aws' => 'AWS',
        'azure' => 'Microsoft Azure',
        'gcp' => 'Google Cloud',
        'kubernetes' => 'Kubernetes',
        'ubiquiti' => 'Ubiquiti UniFi',
    ];

    public function __construct(
        #[Autowire('%kernel.project_dir%')]
        private readonly string $projectDirectory
    ) {
    }

    public function routes(): array
    {
        $routes = [];

        foreach ($this->registry()['packages'] ?? [] as $package) {
            if (!is_array($package)) {
                continue;
            }
            $provider = $package['provider'] ?? null;
            $family = $package['family'] ?? null;
            $packageId = $package['id'] ?? null;
            if (
                !is_string($provider)
                || preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $provider) !== 1
                || !is_string($family)
                || !is_string($packageId)
            ) {
                continue;
            }

            foreach ($this->packageTemplates($package) as $template) {
                $route = $this->normalizeTemplate($template, $provider, $family, $packageId);
                if ($route !== null) {
                    $routes[] = $route;
                }
            }
        }

        return $routes;
    }

    public function resolve(string $provider, string $templateId): ?array
    {
        foreach ($this->routes() as $route) {
            if ($route['provider'] === $provider && $route['template_id'] === $templateId) {
                return $route;
            }
        }

        return null;
    }

    private function normalizeTemplate(
        mixed $template,
        string $provider,
        string $family,
        string $packageId
    ): ?array {
        if (
            !is_array($template)
            || !is_string($template['id'] ?? null)
            || preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $template['id']) !== 1
            || !is_string($template['name'] ?? null)
            || trim($template['name']) === ''
            || !is_string($template['description'] ?? null)
            || trim($template['description']) === ''
        ) {
            return null;
        }

        $name = trim($template['name']);
        $description = trim($template['description']);
        $providerLabel = self::PROVIDER_LABELS[$provider] ?? ucwords(str_replace('-', ' ', $provider));

        return [
            'provider' => $provider,
            'provider_label' => $providerLabel,
            'family' => $family,
            'package_id' => $packageId,
            'template_id' => $template['id'],
            'name' => $name,
            'description' => $description,
            'page_title' => $name . ' | InfraStack Studio',
            'page_description' => $description . ' Open this editable architecture in InfraStack Studio.',
            'page_heading' => $name . ' Architecture Diagram',
        ];
    }

    private function packageTemplates(array $package): array
    {
        $relativePath = $package['templates'] ?? null;
        if (
            !is_string($relativePath)
            || preg_match('/^[a-z0-9-]+(?:\/[a-z0-9-]+)*\/templates\.json$/', $relativePath) !== 1
        ) {
            return [];
        }

        $path = $this->projectDirectory . '/assets/studio/packages/' . $relativePath;
        $value = is_file($path) ? json_decode((string) file_get_contents($path), true) : null;
        if (!is_array($value) || ($value['package_id'] ?? null) !== ($package['id'] ?? null)) {
            return [];
        }

        return is_array($value['templates'] ?? null) ? $value['templates'] : [];
    }

    private function registry(): array
    {
        $path = $this->projectDirectory . '/assets/studio/packages/registry.json';
        $registry = is_file($path) ? json_decode((string) file_get_contents($path), true) : null;

        return is_array($registry) ? $registry : ['schema_version' => '1.0', 'packages' => []];
    }
}
