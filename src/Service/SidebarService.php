<?php

namespace App\Service;

class SidebarService
{
    public function __construct(
        private ToolCatalogService $toolCatalogService
    ) {
    }

    public function getSidebarData(
        string $searchQuery = '',
        string $sort = 'newest',
        string $categoryFilter = '',
        string $tagFilter = '',
        string $familyFilter = '',
        string $groupFilter = ''
    ): array {
        $allTools = $this->toolCatalogService->getTools();
        $tagCounts = [];
        $sidebarDiscussions = [];

        foreach ($allTools as $tool) {
            $sidebarDiscussions[] = [
                'title' => $tool['title'],
                'slug' => $tool['slug'],
                'category_slug' => $tool['category_slug'],
                'author' => $tool['author'],
                'author_initial' => $tool['author_initial'],
                'date' => $tool['date'],
                'timestamp' => $tool['timestamp'] ?? 0,
                'count' => $tool['comments'],
                'likes' => $this->getDiscussionLikes((string) $tool['title']),
                'excerpt' => $this->truncateText((string) $tool['summary'], 92),
            ];

            foreach ($tool['tags'] as $tag) {
                $tagCounts[$tag] = ($tagCounts[$tag] ?? 0) + 1;
            }
        }

        $filteredTools = $this->toolCatalogService->filterTools(
            $allTools,
            $searchQuery,
            $sort,
            $categoryFilter,
            $tagFilter,
            $familyFilter,
            $groupFilter
        );

        arsort($tagCounts);

        $recentTools = array_slice($filteredTools, 0, 5);
        usort($sidebarDiscussions, function (array $a, array $b): int {
            return ($b['timestamp'] ?? 0) <=> ($a['timestamp'] ?? 0);
        });

        $popularTags = [];
        foreach (array_slice($tagCounts, 0, 12, true) as $name => $count) {
            $popularTags[] = [
                'name' => $name,
                'count' => $count,
            ];
        }

        return [
            'sidebar_categories' => $this->toolCatalogService->getCategorySummaries($allTools),
            'recent_tools' => $recentTools,
            'popular_tags' => $popularTags,
            'sidebar_discussions' => $sidebarDiscussions,
            'search_query' => $searchQuery,
            'sort' => $sort,
            'group_filter' => $groupFilter,
            'category_filter' => $categoryFilter,
            'family_filter' => $familyFilter,
            'tag_filter' => $tagFilter,
        ];
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
