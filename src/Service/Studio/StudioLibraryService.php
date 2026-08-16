<?php

namespace App\Service\Studio;

use Symfony\Component\Asset\Packages;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class StudioLibraryService
{
    public function __construct(
        #[Autowire('%kernel.project_dir%')]
        private readonly string $projectDirectory
    ) {
    }

    public function decoratedRegistry(Packages $assets): array
    {
        $registry = $this->registry();
        $libraries = [];

        foreach ($registry['libraries'] ?? [] as $library) {
            $decorated = $this->decorateLibrary($library, $assets);
            if ($decorated !== null) {
                $libraries[] = $decorated;
            }
        }

        return [
            'schema_version' => (string) ($registry['schema_version'] ?? '1.0'),
            'groups' => $this->normalizeGroups($registry['groups'] ?? []),
            'libraries' => $libraries,
        ];
    }

    public function iconUrls(Packages $assets): array
    {
        $urls = [];

        foreach ($this->decoratedRegistry($assets)['libraries'] as $library) {
            $urls = array_replace($urls, $library['icon_urls']);
        }

        return $urls;
    }

    private function registry(): array
    {
        $path = $this->projectDirectory . '/assets/data/studio/libraries/registry.json';
        $registry = is_file($path) ? json_decode((string) file_get_contents($path), true) : null;

        return is_array($registry) ? $registry : ['schema_version' => '1.0', 'groups' => [], 'libraries' => []];
    }

    private function normalizeGroups(mixed $groups): array
    {
        if (!is_array($groups)) {
            return [];
        }

        return array_values(array_filter($groups, function (mixed $group): bool {
            return is_array($group)
                && is_string($group['id'] ?? null)
                && preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $group['id']) === 1
                && is_string($group['label'] ?? null)
                && trim($group['label']) !== '';
        }));
    }

    private function decorateLibrary(mixed $library, Packages $assets): ?array
    {
        if (!is_array($library)) {
            return null;
        }

        foreach (['id', 'group', 'label', 'provider', 'provider_label', 'catalog', 'icons'] as $key) {
            if (!is_string($library[$key] ?? null) || trim($library[$key]) === '') {
                return null;
            }
        }

        if (
            preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $library['id']) !== 1
            || preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $library['group']) !== 1
            || preg_match('/^[a-z0-9-]+(?:\/[a-z0-9-]+)*\/catalog\.json$/', $library['catalog']) !== 1
            || preg_match('/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/', $library['icons']) !== 1
        ) {
            return null;
        }

        $catalogPath = $this->projectDirectory . '/assets/data/studio/libraries/' . $library['catalog'];
        $catalog = is_file($catalogPath) ? json_decode((string) file_get_contents($catalogPath), true) : null;
        if (!is_array($catalog) || !is_array($catalog['assets'] ?? null)) {
            return null;
        }

        $iconUrls = [];
        foreach ($catalog['assets'] as $definition) {
            if (!is_array($definition)) {
                continue;
            }
            $catalogId = $definition['catalog_id'] ?? $definition['type'] ?? null;
            $filename = $definition['icon'] ?? null;
            if (
                !is_string($catalogId)
                || preg_match('/^[a-z0-9-]+$/', $catalogId) !== 1
                || !is_string($filename)
                || preg_match('/^[a-z0-9-]+\.svg$/', $filename) !== 1
            ) {
                continue;
            }
            $iconUrls[$catalogId] = $assets->getUrl(
                'icons/studio/libraries/' . $library['icons'] . '/' . $filename
            );
        }

        return [
            ...$library,
            'catalog_url' => $assets->getUrl('data/studio/libraries/' . $library['catalog']),
            'icon_urls' => $iconUrls,
        ];
    }
}
