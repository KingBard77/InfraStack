<?php

namespace App\Controller;

use App\Service\SidebarService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Yaml\Yaml;

class CategoryController extends AbstractController
{
    #[Route('/tools', name: 'app_category')]
    public function category(Request $request, SidebarService $sidebarService): Response
    {
        $basePath = $this->getParameter('kernel.project_dir') . '/templates/content/tools';

        $allTools = [];

        $searchQuery = trim((string) $request->query->get('q', ''));
        $sort = (string) $request->query->get('sort', 'newest');
        $categoryFilter = trim((string) $request->query->get('category', ''));
        $tagFilter = trim((string) $request->query->get('tag', ''));
        $page = max(1, (int) $request->query->get('page', 1));
        $perPage = 6;

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

                    $cardImage = array_key_exists('card_image', $card)
                        ? $card['card_image']
                        : null;

                    $allTools[] = [
                        'title' => $title,
                        'slug' => $toolFolder,
                        'category_slug' => $categoryFolder,
                        'category' => $categoryLabel,
                        'author' => $meta['author'] ?? 'Infra Stack',
                        'date' => $meta['date'] ?? date('Y-m-d'),
                        'summary' => $meta['summary'] ?? '',
                        'author_image' => $meta['author_image'] ?? 'https://placehold.co/80x80?text=' . urlencode($categoryLabel ?: 'IS'),
                        'author_initial' => $this->getInitial($title),
                        'tags' => is_array($meta['tags'] ?? null) ? $meta['tags'] : [],
                        'card_summary' => $card['card_summary'] ?? ($meta['summary'] ?? ''),
                        'card_image' => $cardImage,
                        'card_gradient_start' => $card['card_gradient_start'] ?? '#CBD5E1',
                        'card_gradient_end' => $card['card_gradient_end'] ?? '#94A3B8',
                        'card_text_color' => $card['card_text_color'] ?? '#FFFFFF',
                        'card_kicker' => $card['card_kicker'] ?? $categoryLabel,
                        'card_image_title' => $card['card_image_title'] ?? $title,
                        'card_icon_class' => $card['card_icon_class'] ?? 'bi bi-tools',
                        'card_icon_animation' => $this->resolveCardIconAnimation($card, $toolFolder),
                    ];
                }
            }
        }

        $tools = $allTools;

        if ($searchQuery !== '') {
            $tools = array_values(array_filter($tools, function (array $tool) use ($searchQuery): bool {
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
            $tools = array_values(array_filter($tools, function (array $tool) use ($categoryFilter): bool {
                return mb_strtolower((string) ($tool['category_slug'] ?? '')) === mb_strtolower($categoryFilter);
            }));
        }

        if ($tagFilter !== '') {
            $tools = array_values(array_filter($tools, function (array $tool) use ($tagFilter): bool {
                $tags = array_map('mb_strtolower', $tool['tags'] ?? []);

                return in_array(mb_strtolower($tagFilter), $tags, true);
            }));
        }

        usort($tools, function (array $a, array $b) use ($sort): int {
            return match ($sort) {
                'oldest' => strcmp((string) $a['date'], (string) $b['date']),
                'title_asc' => strcasecmp((string) $a['title'], (string) $b['title']),
                'title_desc' => strcasecmp((string) $b['title'], (string) $a['title']),
                'category_asc' => strcasecmp((string) $a['category'], (string) $b['category']),
                'category_desc' => strcasecmp((string) $b['category'], (string) $a['category']),
                default => strcmp((string) $b['date'], (string) $a['date']),
            };
        });

        $totalTools = count($tools);
        $totalPages = max(1, (int) ceil($totalTools / $perPage));

        if ($page > $totalPages) {
            $page = $totalPages;
        }

        $offset = ($page - 1) * $perPage;
        $paginatedTools = array_slice($tools, $offset, $perPage);

        $breadcrumbs = [
            ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
            ['label' => 'Tools'],
        ];

        if ($categoryFilter !== '') {
            $breadcrumbs[] = [
                'label' => ucwords(str_replace('-', ' ', $categoryFilter)),
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

        $pageTitle = 'Tools';
        $pageDescription = 'Browse infrastructure tools, utilities, and references by category.';

        if ($categoryFilter !== '') {
            $categoryLabel = ucwords(str_replace('-', ' ', $categoryFilter));
            $pageTitle = $categoryLabel . ' Tools';
            $pageDescription = 'Showing tools in the ' . $categoryLabel . ' category.';
        }

        if ($tagFilter !== '') {
            $pageTitle = 'Tag: ' . $tagFilter;
            $pageDescription = 'Showing tools tagged with "' . $tagFilter . '".';
        }

        if ($searchQuery !== '') {
            $pageTitle = 'Search Results';
            $pageDescription = 'Showing results for "' . $searchQuery . '".';
        }

        $sidebarData = $sidebarService->getSidebarData(
            $searchQuery,
            $sort,
            $categoryFilter,
            $tagFilter
        );

        return $this->render('page/category.html.twig', array_merge([
            'page_title' => $pageTitle,
            'page_description' => $pageDescription,
            'breadcrumbs' => $breadcrumbs,
            'tools' => $paginatedTools,
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_tools' => $totalTools,
        ], $sidebarData));
    }

    private function getInitial(string $value): string
    {
        $normalizedValue = trim($value);

        if ($normalizedValue === '') {
            return 'T';
        }

        return strtoupper(substr($normalizedValue, 0, 1));
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
}
