<?php

namespace App\Controller;

use App\Service\SidebarService;
use App\Service\ToolCatalogService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CategoryController extends AbstractController
{
    private const DEFAULT_VIEW_MODE = 'grid';
    private const VIEW_MODES = ['grid', 'list', 'compact', 'table'];
    private const DEFAULT_PER_PAGE = 6;
    private const PER_PAGE_OPTIONS = [6, 12, 24, 48];
    private const VIEW_MODE_OPTIONS = [
        [
            'value' => 'grid',
            'label' => 'Grid',
            'icon' => 'bi bi-grid-3x3-gap',
        ],
        [
            'value' => 'list',
            'label' => 'List',
            'icon' => 'bi bi-list-ul',
        ],
        [
            'value' => 'compact',
            'label' => 'Compact',
            'icon' => 'bi bi-columns-gap',
        ],
        [
            'value' => 'table',
            'label' => 'Table',
            'icon' => 'bi bi-view-stacked',
        ],
    ];

    #[Route('/tools', name: 'app_category')]
    public function category(
        Request $request,
        SidebarService $sidebarService,
        ToolCatalogService $toolCatalogService
    ): Response {
        $searchQuery = trim((string) $request->query->get('q', ''));
        $sort = (string) $request->query->get('sort', 'newest');
        $groupFilter = $toolCatalogService->normalizeSlug(trim((string) $request->query->get('group', '')));
        $categoryFilter = $toolCatalogService->normalizeSlug(trim((string) $request->query->get('category', '')));
        $familyFilter = $toolCatalogService->normalizeFamilySlug(trim((string) $request->query->get('family', '')));
        $tagFilter = trim((string) $request->query->get('tag', ''));
        $viewMode = $this->normalizeViewMode(
            (string) $request->query->get('view', self::DEFAULT_VIEW_MODE)
        );
        $perPage = $this->normalizePerPage(
            (int) $request->query->get('per_page', self::DEFAULT_PER_PAGE)
        );
        $page = max(1, (int) $request->query->get('page', 1));

        $allTools = $toolCatalogService->getTools();
        $tools = $toolCatalogService->filterTools(
            $allTools,
            $searchQuery,
            $sort,
            $categoryFilter,
            $tagFilter,
            $familyFilter,
            $groupFilter
        );

        $totalTools = count($tools);
        $totalPages = max(1, (int) ceil($totalTools / $perPage));

        if ($page > $totalPages) {
            $page = $totalPages;
        }

        $offset = ($page - 1) * $perPage;
        $paginatedTools = array_slice($tools, $offset, $perPage);
        $familyGroups = $categoryFilter !== '' || $groupFilter !== ''
            ? $toolCatalogService->groupToolsByFamily($paginatedTools)
            : $toolCatalogService->buildFlatToolGroup($paginatedTools);

        $breadcrumbs = [
            ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
            ['label' => 'Tools'],
        ];

        if ($groupFilter !== '') {
            $breadcrumbs[] = [
                'label' => $toolCatalogService->getGroupLabel($groupFilter),
            ];
        }

        if ($categoryFilter !== '') {
            $breadcrumbs[] = [
                'label' => $this->resolveCategoryLabel($categoryFilter, $allTools),
            ];
        }

        if ($familyFilter !== '') {
            $breadcrumbs[] = [
                'label' => $toolCatalogService->resolveFamilyLabel($familyFilter),
            ];
        }

        if ($tagFilter !== '') {
            $breadcrumbs[] = [
                'label' => 'Tag: ' . $tagFilter,
            ];
        }

        if ($searchQuery !== '') {
            $breadcrumbs[] = [
                'label' => 'Search: "' . $searchQuery . '"',
            ];
        }

        [$pageTitle, $pageDescription] = $this->resolvePageCopy(
            $searchQuery,
            $groupFilter,
            $categoryFilter,
            $familyFilter,
            $tagFilter,
            $toolCatalogService,
            $allTools
        );

        $sidebarData = $sidebarService->getSidebarData(
            $searchQuery,
            $sort,
            $categoryFilter,
            $tagFilter,
            $familyFilter,
            $groupFilter
        );

        return $this->render('page/category.html.twig', array_merge([
            'page_title' => $pageTitle,
            'page_description' => $pageDescription,
            'breadcrumbs' => $breadcrumbs,
            'tools' => $paginatedTools,
            'family_groups' => $familyGroups,
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_tools' => $totalTools,
            'family_filter' => $familyFilter,
            'group_filter' => $groupFilter,
            'view_mode' => $viewMode,
            'view_modes' => self::VIEW_MODE_OPTIONS,
            'per_page' => $perPage,
            'per_page_options' => self::PER_PAGE_OPTIONS,
        ], $sidebarData));
    }

    private function normalizePerPage(int $perPage): int
    {
        if (in_array($perPage, self::PER_PAGE_OPTIONS, true)) {
            return $perPage;
        }

        return self::DEFAULT_PER_PAGE;
    }

    private function normalizeViewMode(string $viewMode): string
    {
        $viewMode = mb_strtolower(trim($viewMode));

        if (in_array($viewMode, self::VIEW_MODES, true)) {
            return $viewMode;
        }

        return self::DEFAULT_VIEW_MODE;
    }

    private function resolvePageCopy(
        string $searchQuery,
        string $groupFilter,
        string $categoryFilter,
        string $familyFilter,
        string $tagFilter,
        ToolCatalogService $toolCatalogService,
        array $tools
    ): array {
        $pageTitle = 'Tools';
        $pageDescription = 'Browse infrastructure tools, utilities, and references by category.';

        if ($groupFilter !== '') {
            $groupLabel = $toolCatalogService->getGroupLabel($groupFilter);
            $pageTitle = $groupLabel . ' Tools';
            $pageDescription = 'Showing tools in the ' . $groupLabel . ' group.';
        }

        if ($categoryFilter !== '') {
            $categoryLabel = $this->resolveCategoryLabel($categoryFilter, $tools);
            $pageTitle = $categoryLabel . ' Tools';
            $pageDescription = 'Showing tools in the ' . $categoryLabel . ' category.';
        }

        if ($familyFilter !== '') {
            $familyLabel = $toolCatalogService->resolveFamilyLabel($familyFilter);
            $pageTitle = $familyLabel . ' Tools';
            $pageDescription = 'Showing tools in the ' . $familyLabel . ' family.';
        }

        if ($tagFilter !== '') {
            $pageTitle = 'Tag: ' . $tagFilter;
            $pageDescription = 'Showing tools tagged with "' . $tagFilter . '".';
        }

        if ($searchQuery !== '') {
            $pageTitle = 'Search Results';
            $pageDescription = 'Showing results for "' . $searchQuery . '".';
        }

        return [$pageTitle, $pageDescription];
    }

    private function resolveCategoryLabel(string $categorySlug, array $tools): string
    {
        foreach ($tools as $tool) {
            if (($tool['category_slug'] ?? '') === $categorySlug) {
                return (string) ($tool['category'] ?? ucwords(str_replace('-', ' ', $categorySlug)));
            }
        }

        return ucwords(str_replace('-', ' ', $categorySlug));
    }
}
