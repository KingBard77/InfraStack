<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Yaml\Yaml;

class ToolCatalogService
{
    private const PUBLICATION_STATUS_DRAFT = 'draft';
    private const PUBLICATION_STATUS_READY = 'ready';
    private const PUBLICATION_STATUSES = [
        self::PUBLICATION_STATUS_DRAFT,
        self::PUBLICATION_STATUS_READY,
    ];

    private ?array $manifest = null;

    public function __construct(
        private ParameterBagInterface $parameterBag
    ) {
    }

    public function getTools(?bool $includeDraftTools = null): array
    {
        $basePath = $this->getToolsPath();
        $tools = [];
        $includeDraftTools ??= $this->shouldIncludeDraftTools();

        if (!is_dir($basePath)) {
            return $tools;
        }

        foreach ($this->listDirectories($basePath) as $categoryFolder) {
            $categoryPath = $basePath . '/' . $categoryFolder;

            foreach ($this->listDirectories($categoryPath) as $toolFolder) {
                $toolPath = $categoryPath . '/' . $toolFolder;
                $metaFile = $toolPath . '/meta.yml';
                $cardFile = $toolPath . '/card.yml';

                if (!file_exists($metaFile)) {
                    continue;
                }

                $meta = $this->parseYamlFile($metaFile);
                $card = file_exists($cardFile) ? $this->parseYamlFile($cardFile) : [];
                $tool = $this->buildToolRecord($categoryFolder, $toolFolder, $toolPath, $meta, $card);

                if (!$includeDraftTools && $tool['is_draft']) {
                    continue;
                }

                $tools[] = $tool;
            }
        }

        return $tools;
    }

    public function filterTools(
        array $tools,
        string $searchQuery = '',
        string $sort = 'newest',
        string $categoryFilter = '',
        string $tagFilter = '',
        string $familyFilter = '',
        string $groupFilter = ''
    ): array {
        $filteredTools = $tools;
        $searchQuery = trim($searchQuery);
        $categoryFilter = $this->normalizeSlug($categoryFilter);
        $tagFilter = trim($tagFilter);
        $familyFilter = $this->normalizeFamilySlug($familyFilter);
        $groupFilter = $this->normalizeSlug($groupFilter);

        if ($searchQuery !== '') {
            $needle = mb_strtolower($searchQuery);

            $filteredTools = array_values(array_filter($filteredTools, function (array $tool) use ($needle): bool {
                $haystack = mb_strtolower(
                    ($tool['title'] ?? '') . ' ' .
                    ($tool['summary'] ?? '') . ' ' .
                    ($tool['category'] ?? '') . ' ' .
                    ($tool['family'] ?? '') . ' ' .
                    ($tool['group'] ?? '') . ' ' .
                    implode(' ', $tool['tags'] ?? [])
                );

                return str_contains($haystack, $needle);
            }));
        }

        if ($categoryFilter !== '') {
            $filteredTools = array_values(array_filter(
                $filteredTools,
                static fn (array $tool): bool => mb_strtolower((string) ($tool['category_slug'] ?? '')) === $categoryFilter
            ));
        }

        if ($familyFilter !== '') {
            $filteredTools = array_values(array_filter(
                $filteredTools,
                static fn (array $tool): bool => mb_strtolower((string) ($tool['family_slug'] ?? '')) === $familyFilter
            ));
        }

        if ($groupFilter !== '') {
            $filteredTools = array_values(array_filter(
                $filteredTools,
                static fn (array $tool): bool => mb_strtolower((string) ($tool['group_slug'] ?? '')) === $groupFilter
            ));
        }

        if ($tagFilter !== '') {
            $filteredTools = array_values(array_filter($filteredTools, function (array $tool) use ($tagFilter): bool {
                $tags = array_map('mb_strtolower', $tool['tags'] ?? []);

                return in_array(mb_strtolower($tagFilter), $tags, true);
            }));
        }

        usort($filteredTools, function (array $a, array $b) use ($sort): int {
            return match ($sort) {
                'oldest' => strcmp((string) $a['date'], (string) $b['date']),
                'title_asc' => strcasecmp((string) $a['title'], (string) $b['title']),
                'title_desc' => strcasecmp((string) $b['title'], (string) $a['title']),
                'category_asc' => strcasecmp((string) $a['category'], (string) $b['category']),
                'category_desc' => strcasecmp((string) $b['category'], (string) $a['category']),
                default => ($b['timestamp'] ?? 0) <=> ($a['timestamp'] ?? 0),
            };
        });

        return $filteredTools;
    }

    public function buildFlatToolGroup(array $tools): array
    {
        if ($tools === []) {
            return [];
        }

        return [
            [
                'slug' => 'all-tools',
                'label' => '',
                'rank' => 0,
                'tools' => $tools,
            ],
        ];
    }

    public function groupToolsByFamily(array $tools): array
    {
        $groups = [];

        foreach ($tools as $tool) {
            $familySlug = (string) ($tool['family_slug'] ?? 'tool');
            $familyLabel = (string) ($tool['family'] ?? $this->resolveFamilyLabel($familySlug));

            if (!isset($groups[$familySlug])) {
                $groups[$familySlug] = [
                    'slug' => $familySlug,
                    'label' => $familyLabel,
                    'rank' => $this->resolveFamilyRank($familySlug),
                    'tools' => [],
                ];
            }

            $groups[$familySlug]['tools'][] = $tool;
        }

        usort($groups, function (array $a, array $b): int {
            $rankComparison = $a['rank'] <=> $b['rank'];

            if ($rankComparison !== 0) {
                return $rankComparison;
            }

            return strcasecmp((string) $a['label'], (string) $b['label']);
        });

        return $groups;
    }

    public function getCategorySummaries(array $tools): array
    {
        $categories = [];

        foreach ($tools as $tool) {
            $categorySlug = (string) ($tool['category_slug'] ?? '');

            if ($categorySlug === '') {
                continue;
            }

            if (!isset($categories[$categorySlug])) {
                $categories[$categorySlug] = [
                    'name' => $tool['category'] ?? ucwords(str_replace('-', ' ', $categorySlug)),
                    'slug' => $categorySlug,
                    'group_slug' => $tool['group_slug'] ?? '',
                    'group' => $tool['group'] ?? '',
                    'rank' => $this->resolveCategoryRank($categorySlug),
                    'count' => 0,
                ];
            }

            $categories[$categorySlug]['count']++;
        }

        usort($categories, function (array $a, array $b): int {
            $rankComparison = ($a['rank'] ?? 900) <=> ($b['rank'] ?? 900);

            if ($rankComparison !== 0) {
                return $rankComparison;
            }

            return strcasecmp((string) $a['name'], (string) $b['name']);
        });

        return $categories;
    }

    public function getGroupLabel(string $groupSlug): string
    {
        $groupSlug = $this->normalizeSlug($groupSlug);
        $manifest = $this->getManifest();
        $group = $manifest['groups'][$groupSlug] ?? null;

        if (is_array($group) && isset($group['label'])) {
            return (string) $group['label'];
        }

        return ucwords(str_replace('-', ' ', $groupSlug));
    }

    public function resolveFamilyLabel(string $familySlug): string
    {
        $familySlug = $this->normalizeFamilySlug($familySlug);
        $manifest = $this->getManifest();
        $family = $manifest['families'][$familySlug] ?? null;

        if (is_array($family) && isset($family['label'])) {
            return (string) $family['label'];
        }

        return ucwords(str_replace('-', ' ', $familySlug));
    }

    public function normalizeFamilySlug(string $family): string
    {
        $slug = $this->normalizeSlug($family);

        return match ($slug) {
            'calculator' => 'calculate',
            'scan' => 'scanning',
            'analyze' => 'analyzer',
            'assess' => 'assessment',
            'generate' => 'generator',
            'check' => 'checklist',
            'plan' => 'planner',
            'map' => 'table',
            'monitor' => 'dashboard',
            default => $slug,
        };
    }

    public function normalizeSlug(string $value): string
    {
        $slug = strtolower(trim($value));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? '';

        return trim($slug, '-');
    }

    public function getManifest(): array
    {
        if ($this->manifest !== null) {
            return $this->manifest;
        }

        $manifestFile = $this->getToolsPath() . '/manifest.yml';

        if (!file_exists($manifestFile)) {
            $this->manifest = [];

            return [];
        }

        $this->manifest = $this->parseYamlFile($manifestFile);

        return $this->manifest;
    }

    public function normalizePublicationStatus(mixed $status): string
    {
        if (!is_string($status) && !is_numeric($status)) {
            return self::PUBLICATION_STATUS_DRAFT;
        }

        $statusSlug = $this->normalizeSlug((string) $status);

        if ($statusSlug === '') {
            return self::PUBLICATION_STATUS_DRAFT;
        }

        if (in_array($statusSlug, self::PUBLICATION_STATUSES, true)) {
            return $statusSlug;
        }

        return self::PUBLICATION_STATUS_DRAFT;
    }

    public function isPublicationStatusValid(mixed $status): bool
    {
        if (!is_string($status) && !is_numeric($status)) {
            return false;
        }

        $statusSlug = $this->normalizeSlug((string) $status);

        return in_array($statusSlug, self::PUBLICATION_STATUSES, true);
    }

    public function isDraftPublicationStatus(mixed $status): bool
    {
        return $this->normalizePublicationStatus($status) === self::PUBLICATION_STATUS_DRAFT;
    }

    public function shouldIncludeDraftTools(): bool
    {
        return !$this->isProductionEnvironment();
    }

    public function shouldShowDraftMarkers(): bool
    {
        return $this->shouldIncludeDraftTools();
    }

    public function decorateMetaForPublicationStatus(array $meta): array
    {
        $title = (string) ($meta['title'] ?? 'Tool Detail');
        $rawPublicationStatus = $meta['publication_status'] ?? null;
        $publicationStatus = $this->normalizePublicationStatus($rawPublicationStatus);

        $meta['publication_status'] = $publicationStatus;
        $meta['publication_status_valid'] = $this->isPublicationStatusValid($rawPublicationStatus);
        $meta['is_draft'] = $publicationStatus === self::PUBLICATION_STATUS_DRAFT;
        $meta['is_ready'] = $publicationStatus === self::PUBLICATION_STATUS_READY;
        $meta['display_title'] = $this->formatPublicationTitle($title, $publicationStatus);

        return $meta;
    }

    public function formatPublicationTitle(string $title, mixed $status): string
    {
        if (!$this->shouldShowDraftMarkers() || !$this->isDraftPublicationStatus($status)) {
            return $title;
        }

        $trimmedTitle = trim($title);

        if (str_starts_with($trimmedTitle, '*')) {
            return $trimmedTitle;
        }

        return '* ' . $trimmedTitle;
    }

    private function buildToolRecord(
        string $categoryFolder,
        string $toolFolder,
        string $toolPath,
        array $meta,
        array $card
    ): array {
        $defaultTitle = ucwords(str_replace('-', ' ', $toolFolder));
        $defaultCategory = ucwords(str_replace('-', ' ', $categoryFolder));
        $categoryConfig = $this->resolveCategoryConfig($categoryFolder);
        $title = (string) ($meta['title'] ?? $defaultTitle);
        $categoryLabel = (string) ($meta['category_label'] ?? ($categoryConfig['label'] ?? $defaultCategory));
        $familySlug = $this->resolveFamilySlug($meta, $categoryFolder, $toolFolder);
        $groupSlug = $this->resolveGroupSlug($meta, $categoryFolder);
        $dateDisplay = (string) ($meta['date'] ?? date('M j, Y'));
        $timestamp = strtotime($dateDisplay);
        $rawPublicationStatus = $meta['publication_status'] ?? null;
        $publicationStatus = $this->normalizePublicationStatus($rawPublicationStatus);
        $isDraft = $publicationStatus === self::PUBLICATION_STATUS_DRAFT;
        $cardImageTitle = (string) ($card['card_image_title'] ?? $title);

        if ($timestamp === false) {
            $timestamp = time();
        }

        $postTemplateFile = $toolPath . '/assets/img/post.html.twig';

        return [
            'title' => $title,
            'display_title' => $this->formatPublicationTitle($title, $publicationStatus),
            'slug' => $toolFolder,
            'category_slug' => $categoryFolder,
            'category' => $categoryLabel,
            'category_label' => $categoryLabel,
            'publication_status' => $publicationStatus,
            'publication_status_valid' => $this->isPublicationStatusValid($rawPublicationStatus),
            'is_draft' => $isDraft,
            'is_ready' => !$isDraft,
            'group_slug' => $groupSlug,
            'group' => $this->getGroupLabel($groupSlug),
            'family_slug' => $familySlug,
            'family' => $this->resolveFamilyLabel($familySlug),
            'author' => $meta['author'] ?? 'InfraStack',
            'author_image' => $meta['author_image'] ?? '',
            'author_initial' => $this->getInitial($meta['author'] ?? $title),
            'date' => $dateDisplay,
            'date_display' => $dateDisplay,
            'date_attribute' => date('Y-m-d', $timestamp),
            'timestamp' => $timestamp,
            'comments' => $meta['comments'] ?? 'Interactive tool',
            'reading_time' => $meta['reading_time'] ?? '3 min read',
            'summary' => $meta['summary'] ?? '',
            'intro' => $meta['intro'] ?? ($meta['summary'] ?? ''),
            'tags' => is_array($meta['tags'] ?? null) ? $meta['tags'] : [],
            'card_summary' => $card['card_summary'] ?? ($meta['summary'] ?? ($meta['intro'] ?? '')),
            'card_image' => array_key_exists('card_image', $card) ? $card['card_image'] : null,
            'card_gradient_start' => $card['card_gradient_start'] ?? '#CBD5E1',
            'card_gradient_end' => $card['card_gradient_end'] ?? '#94A3B8',
            'card_text_color' => $card['card_text_color'] ?? '#FFFFFF',
            'card_kicker' => $card['card_kicker'] ?? $categoryLabel,
            'card_image_title' => $cardImageTitle,
            'display_card_image_title' => $this->formatPublicationTitle($cardImageTitle, $publicationStatus),
            'card_icon_class' => $card['card_icon_class'] ?? 'bi bi-tools',
            'card_icon_animation' => $this->resolveCardIconAnimation($card, $toolFolder),
            'card_visual_class' => $this->normalizeCssClass(
                (string) ($card['card_visual_class'] ?? ($toolFolder . '-post-visual'))
            ),
            'card_background_icons' => $this->normalizeIconList($card['card_background_icons'] ?? null),
            'card_map_icons' => $this->normalizeIconList($card['card_map_icons'] ?? null),
            'post_template' => file_exists($postTemplateFile)
                ? 'content/tools/' . $categoryFolder . '/' . $toolFolder . '/assets/img/post.html.twig'
                : 'content/main/scaffold/assets/img/post.html.twig',
            'tool_path' => $toolPath,
        ];
    }

    private function resolveFamilySlug(array $meta, string $categoryFolder, string $toolSlug): string
    {
        $family = $meta['family'] ?? '';

        if (is_string($family) && trim($family) !== '') {
            $familySlug = $this->normalizeFamilySlug($family);
        } else {
            $familySlug = $this->inferFamilySlug($toolSlug);
        }

        if ($categoryFolder === 'shell' && in_array($familySlug, ['generator', 'shell'], true)) {
            return 'shell';
        }

        return $familySlug !== '' ? $familySlug : 'tool';
    }

    private function resolveGroupSlug(array $meta, string $categoryFolder): string
    {
        $group = $meta['group'] ?? '';

        if (is_string($group) && trim($group) !== '') {
            return $this->normalizeSlug($group);
        }

        $categoryConfig = $this->resolveCategoryConfig($categoryFolder);
        $categoryGroup = $categoryConfig['group'] ?? '';

        if (is_string($categoryGroup) && trim($categoryGroup) !== '') {
            return $this->normalizeSlug($categoryGroup);
        }

        return $this->normalizeSlug($categoryFolder);
    }

    private function resolveCategoryConfig(string $categoryFolder): array
    {
        $manifest = $this->getManifest();
        $categoryConfig = $manifest['categories'][$categoryFolder] ?? [];

        return is_array($categoryConfig) ? $categoryConfig : [];
    }

    private function resolveCategoryRank(string $categorySlug): int
    {
        $categoryConfig = $this->resolveCategoryConfig($categorySlug);

        return is_numeric($categoryConfig['rank'] ?? null) ? (int) $categoryConfig['rank'] : 900;
    }

    private function resolveFamilyRank(string $familySlug): int
    {
        $manifest = $this->getManifest();
        $family = $manifest['families'][$familySlug] ?? null;

        if (is_array($family) && is_numeric($family['rank'] ?? null)) {
            return (int) $family['rank'];
        }

        return 900;
    }

    private function inferFamilySlug(string $toolSlug): string
    {
        $verb = strtolower(strtok($toolSlug, '-') ?: '');

        return match ($verb) {
            'architecture' => 'architecture',
            'calculate' => 'calculate',
            'assess', 'audit', 'check', 'validate' => 'assessment',
            'scan' => 'scanning',
            'analyze' => 'analyzer',
            'generate', 'compose' => 'generator',
            'plan' => 'planner',
            'map', 'compare' => 'table',
            'monitor', 'summarize' => 'dashboard',
            default => 'tool',
        };
    }

    private function resolveCardIconAnimation(array $card, string $toolSlug): string
    {
        $animation = $card['card_icon_animation'] ?? 'fade';

        if ($animation !== 'random') {
            return $animation;
        }

        $animations = [
            'fade',
            'pop',
            'slide-left',
            'slide-right',
            'spin',
            'bounce',
            'flip',
            'swing',
        ];

        $index = abs(crc32($toolSlug)) % count($animations);

        return $animations[$index];
    }

    private function normalizeIconList(mixed $icons): array
    {
        if (!is_array($icons)) {
            return [];
        }

        $normalizedIcons = array_map(
            static fn (mixed $icon): string => trim((string) $icon),
            $icons
        );

        return array_values(array_filter(
            $normalizedIcons,
            static fn (string $icon): bool => $icon !== ''
        ));
    }

    private function normalizeCssClass(string $className): string
    {
        $normalizedClassName = strtolower(trim($className));
        $normalizedClassName = preg_replace('/[^a-z0-9_-]+/', '-', $normalizedClassName) ?? '';
        $normalizedClassName = trim($normalizedClassName, '-');

        return $normalizedClassName !== '' ? $normalizedClassName : 'tool-post-visual-shared';
    }

    private function getInitial(string $value): string
    {
        $normalizedValue = trim($value);

        if ($normalizedValue === '') {
            return 'I';
        }

        return strtoupper(substr($normalizedValue, 0, 1));
    }

    private function parseYamlFile(string $file): array
    {
        $parsed = Yaml::parseFile($file);

        return is_array($parsed) ? $parsed : [];
    }

    private function listDirectories(string $path): array
    {
        $items = array_filter(
            scandir($path) ?: [],
            static fn (string $item): bool => $item !== '.'
                && $item !== '..'
                && is_dir($path . '/' . $item)
        );

        sort($items);

        return $items;
    }

    private function getToolsPath(): string
    {
        return $this->parameterBag->get('kernel.project_dir') . '/templates/content/tools';
    }

    private function isProductionEnvironment(): bool
    {
        return (string) $this->parameterBag->get('kernel.environment') === 'prod';
    }
}
