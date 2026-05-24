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

        foreach ($allTools as $tool) {
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
            'search_query' => $searchQuery,
            'sort' => $sort,
            'group_filter' => $groupFilter,
            'category_filter' => $categoryFilter,
            'family_filter' => $familyFilter,
            'tag_filter' => $tagFilter,
        ];
    }
}
