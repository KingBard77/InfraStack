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

    public function registry(): array
    {
        $registry = $this->rawRegistry();
        $libraries = [];

        foreach ($registry['libraries'] ?? [] as $library) {
            $normalized = $this->normalizeLibrary($library);
            if ($normalized !== null) {
                $libraries[] = $normalized;
            }
        }

        return [
            'schema_version' => (string) ($registry['schema_version'] ?? '1.0'),
            'groups' => $this->normalizeGroups($registry['groups'] ?? []),
            'libraries' => $libraries,
        ];
    }

    public function catalogue(string $libraryId, Packages $assets, ?string $version = null): ?array
    {
        $library = null;
        foreach ($this->registry()['libraries'] as $candidate) {
            if ($candidate['id'] === $libraryId) {
                $library = $candidate;
                break;
            }
        }
        if ($library === null) {
            return null;
        }
        if ($version !== null && $library['version'] !== $version) {
            return null;
        }

        $catalogPath = $this->projectDirectory . '/assets/data/studio/libraries/' . $library['catalog'];
        $catalog = json_decode((string) file_get_contents($catalogPath), true);
        if (!is_array($catalog) || !is_array($catalog['assets'] ?? null)) {
            return null;
        }

        $catalog['library_id'] = $libraryId;
        $catalog['assets'] = array_values(array_filter(array_map(
            fn (mixed $definition): ?array => $this->decorateAsset($definition, $library, $assets),
            $catalog['assets']
        )));

        return $catalog;
    }

    public function iconUrls(Packages $assets): array
    {
        $urls = [];

        foreach ($this->registry()['libraries'] as $library) {
            $catalog = $this->catalogue($library['id'], $assets);
            foreach ($catalog['assets'] ?? [] as $definition) {
                $catalogId = $definition['catalog_id'] ?? $definition['type'] ?? null;
                $iconUrl = $definition['icon_url'] ?? null;
                if (is_string($catalogId) && is_string($iconUrl)) {
                    $urls[$catalogId] = $iconUrl;
                }
            }
        }

        return $urls;
    }

    private function rawRegistry(): array
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

    private function normalizeLibrary(mixed $library): ?array
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
        $iconPath = $this->projectDirectory . '/assets/icons/studio/libraries/' . $library['icons'];
        if (!is_file($catalogPath) || !is_dir($iconPath)) {
            return null;
        }
        $catalogVersion = hash_file('sha256', $catalogPath);
        if (!is_string($catalogVersion)) {
            return null;
        }

        return [
            ...$library,
            'version' => substr($catalogVersion, 0, 12),
        ];
    }

    private function decorateAsset(mixed $definition, array $library, Packages $assets): ?array
    {
        if (!is_array($definition)) {
            return null;
        }

        $catalogId = $definition['catalog_id'] ?? $definition['type'] ?? null;
        $filename = $definition['icon'] ?? null;
        if (
            !is_string($catalogId)
            || preg_match('/^[a-z0-9-]+$/', $catalogId) !== 1
            || !is_string($filename)
            || preg_match('/^[a-z0-9-]+\.svg$/', $filename) !== 1
        ) {
            return $definition;
        }

        return [
            ...$definition,
            'icon_url' => $assets->getUrl('icons/studio/libraries/' . $library['icons'] . '/' . $filename),
        ];
    }
}
