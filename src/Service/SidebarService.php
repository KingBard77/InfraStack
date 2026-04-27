<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Yaml\Yaml;

class SidebarService
{
    public function __construct(
        private ParameterBagInterface $parameterBag
    ) {
    }

    public function getSidebarData(
        string $searchQuery = '',
        string $sort = 'newest',
        string $categoryFilter = '',
        string $tagFilter = ''
    ): array {
        $basePath = $this->parameterBag->get('kernel.project_dir') . '/templates/content/tools';

        $allTools = [];
        $tagCounts = [];
        $sidebarCategoryMap = [];
        $sidebarDiscussions = [];

        if (is_dir($basePath)) {
            $categories = array_filter(
                scandir($basePath),
                function ($item) use ($basePath): bool {
                    return $item !== '.'
                        && $item !== '..'
                        && is_dir($basePath . '/' . $item);
                }
            );

            foreach ($categories as $categoryFolder) {
                $categoryPath = $basePath . '/' . $categoryFolder;

                $toolFolders = array_filter(
                    scandir($categoryPath),
                    function ($item) use ($categoryPath): bool {
                        return $item !== '.'
                            && $item !== '..'
                            && is_dir($categoryPath . '/' . $item);
                    }
                );

                foreach ($toolFolders as $toolFolder) {
                    $toolPath = $categoryPath . '/' . $toolFolder;
                    $metaFile = $toolPath . '/meta.yml';
                    $cardFile = $toolPath . '/card.yml';

                    if (!file_exists($metaFile)) {
                        continue;
                    }

                    $meta = Yaml::parseFile($metaFile);
                    $card = file_exists($cardFile) ? Yaml::parseFile($cardFile) : [];

                    if (!is_array($meta)) {
                        $meta = [];
                    }

                    if (!is_array($card)) {
                        $card = [];
                    }

                    $defaultTitle = ucwords(str_replace('-', ' ', $toolFolder));
                    $defaultCategory = ucwords(str_replace('-', ' ', $categoryFolder));
                    $title = $meta['title'] ?? $defaultTitle;
                    $categoryLabel = $meta['category_label'] ?? $defaultCategory;

                    $tool = [
                        'title' => $title,
                        'slug' => $toolFolder,
                        'category_slug' => $categoryFolder,
                        'category' => $categoryLabel,
                        'author' => $meta['author'] ?? 'InfraStack',
                        'author_initial' => $this->getInitial($meta['author'] ?? $title),
                        'date' => $meta['date'] ?? date('Y-m-d'),
                        'summary' => $meta['summary'] ?? '',
                        'comments' => $meta['comments'] ?? 'Interactive tool',
                        'tags' => is_array($meta['tags'] ?? null) ? $meta['tags'] : [],
                        'card_image' => $card['card_image'] ?? null,
                        'card_gradient_start' => $card['card_gradient_start'] ?? '#CBD5E1',
                        'card_gradient_end' => $card['card_gradient_end'] ?? '#94A3B8',
                        'card_text_color' => $card['card_text_color'] ?? '#FFFFFF',
                        'card_icon_class' => $card['card_icon_class'] ?? 'bi bi-tools',
                    ];

                    $allTools[] = $tool;
                    $sidebarDiscussions[] = [
                        'title' => $title,
                        'slug' => $toolFolder,
                        'category_slug' => $categoryFolder,
                        'author' => $tool['author'],
                        'author_initial' => $tool['author_initial'],
                        'date' => $tool['date'],
                        'timestamp' => strtotime((string) $tool['date']) ?: 0,
                        'count' => $tool['comments'],
                        'likes' => $this->getDiscussionLikes($title),
                        'excerpt' => $this->truncateText($tool['summary'], 92),
                    ];

                    if (!isset($sidebarCategoryMap[$categoryFolder])) {
                        $sidebarCategoryMap[$categoryFolder] = [
                            'name' => $categoryLabel,
                            'slug' => $categoryFolder,
                            'count' => 0,
                        ];
                    }

                    $sidebarCategoryMap[$categoryFolder]['count']++;

                    foreach ($tool['tags'] as $tag) {
                        $tagCounts[$tag] = ($tagCounts[$tag] ?? 0) + 1;
                    }
                }
            }
        }

        $sidebarCategories = array_values($sidebarCategoryMap);

        usort($sidebarCategories, function (array $a, array $b): int {
            return strcasecmp((string) $a['name'], (string) $b['name']);
        });

        $filteredTools = $allTools;

        if ($searchQuery !== '') {
            $filteredTools = array_values(array_filter($filteredTools, function (array $tool) use ($searchQuery): bool {
                $needle = mb_strtolower($searchQuery);

                $haystack = mb_strtolower(
                    ($tool['title'] ?? '') . ' ' .
                    ($tool['summary'] ?? '') . ' ' .
                    ($tool['category'] ?? '') . ' ' .
                    implode(' ', $tool['tags'] ?? [])
                );

                return str_contains($haystack, $needle);
            }));
        }

        if ($categoryFilter !== '') {
            $filteredTools = array_values(array_filter($filteredTools, function (array $tool) use ($categoryFilter): bool {
                return mb_strtolower((string) ($tool['category_slug'] ?? '')) === mb_strtolower($categoryFilter);
            }));
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
                default => strcmp((string) $b['date'], (string) $a['date']),
            };
        });

        arsort($tagCounts);

        $recentTools = array_slice($filteredTools, 0, 5);
        usort($sidebarDiscussions, function (array $a, array $b): int {
            return ($b['timestamp'] ?? 0) <=> ($a['timestamp'] ?? 0);
        });

        $sidebarDiscussions = array_slice($sidebarDiscussions, 0, 4);

        $popularTags = [];
        foreach (array_slice($tagCounts, 0, 12, true) as $name => $count) {
            $popularTags[] = [
                'name' => $name,
                'count' => $count,
            ];
        }

        return [
            'sidebar_categories' => $sidebarCategories,
            'recent_tools' => $recentTools,
            'popular_tags' => $popularTags,
            'sidebar_discussions' => $sidebarDiscussions,
            'search_query' => $searchQuery,
            'sort' => $sort,
            'category_filter' => $categoryFilter,
            'tag_filter' => $tagFilter,
        ];
    }

    private function getInitial(string $value): string
    {
        $normalizedValue = trim($value);

        if ($normalizedValue === '') {
            return 'I';
        }

        return strtoupper(substr($normalizedValue, 0, 1));
    }

    private function truncateText(string $value, int $limit): string
    {
        $normalizedValue = trim($value);

        if ($normalizedValue === '') {
            return 'Open the tool workspace and review the latest practical infrastructure notes.';
        }

        if (mb_strlen($normalizedValue) <= $limit) {
            return $normalizedValue;
        }

        return rtrim(mb_substr($normalizedValue, 0, $limit - 3)) . '...';
    }

    private function getDiscussionLikes(string $value): int
    {
        return (abs(crc32($value)) % 9) + 3;
    }
}
