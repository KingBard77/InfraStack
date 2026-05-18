<?php

namespace App\Controller;

use App\Service\SidebarService;
use App\Service\ToolCatalogService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    private const HOME_FAMILY_CONFIG = [
        'architecture' => [
            'label' => 'Architecture',
            'eyebrow' => 'Diagram workspaces',
            'summary' => 'Turn briefs into visual topology, dependency, and exportable architecture workspaces.',
            'icon' => 'bi bi-diagram-3',
            'verb' => 'Design',
            'start' => '#2563EB',
            'end' => '#16A34A',
            'workflow' => ['Brief', 'Stage', 'Export'],
        ],
        'calculate' => [
            'label' => 'Calculator',
            'eyebrow' => 'Assumption models',
            'summary' => 'Tune quantities, rates, buffers, and output tables before sharing a planning number.',
            'icon' => 'bi bi-calculator',
            'verb' => 'Estimate',
            'start' => '#0F766E',
            'end' => '#F97316',
            'workflow' => ['Inputs', 'Totals', 'JSON'],
        ],
        'assessment' => [
            'label' => 'Assessment',
            'eyebrow' => 'Control explorers',
            'summary' => 'Filter controls, inspect selected artifacts, and export review evidence inside clear trust boundaries.',
            'icon' => 'bi bi-clipboard2-check',
            'verb' => 'Assess',
            'start' => '#334155',
            'end' => '#64748B',
            'workflow' => ['Scope', 'Controls', 'Evidence'],
        ],
        'scanning' => [
            'label' => 'Scanning',
            'eyebrow' => 'Target probes',
            'summary' => 'Run bounded target checks, review findings, inspect evidence tables, and preserve JSON snapshots.',
            'icon' => 'bi bi-radar',
            'verb' => 'Scan',
            'start' => '#166534',
            'end' => '#22C55E',
            'workflow' => ['Target', 'Probe', 'Findings'],
        ],
        'shell' => [
            'label' => 'Shell',
            'eyebrow' => 'Command builders',
            'summary' => 'Compose command lines from structured options, warnings, copy actions, and normalized output.',
            'icon' => 'bi bi-terminal',
            'verb' => 'Generate',
            'start' => '#0F766E',
            'end' => '#14B8A6',
            'workflow' => ['Options', 'Command', 'Copy'],
        ],
    ];

    #[Route('/', name: 'app_main')]
    public function main(SidebarService $sidebarService, ToolCatalogService $toolCatalogService): Response
    {
        $homePosts = $this->getHomePosts($toolCatalogService->getTools());
        $categoryPosts = $this->getCategoryPosts($homePosts);
        $sidebarData = $sidebarService->getSidebarData();

        return $this->render('page/main.html.twig', array_merge([
            'page_title' => 'Home',
            'home_posts' => $homePosts,
            'home_family_groups' => $this->getHomeFamilyGroups($homePosts),
            'featured_posts' => $homePosts,
            'category_featured_posts' => $categoryPosts,
        ], $sidebarData));
    }

    #[Route('/author-profile', name: 'app_author')]
    public function profile(SidebarService $sidebarService): Response
    {
        $breadcrumbs = [
            ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
            ['label' => 'Author Profile'],
        ];

        return $this->render('page/author-profile.html.twig', array_merge([
            'page_title' => 'Author Profile',
            'page_description' => 'Learn more about the author behind InfraStack.',
            'breadcrumbs' => $breadcrumbs,
        ], $sidebarService->getSidebarData()));
    }

    #[Route('/contact', name: 'app_contact')]
    public function contact(SidebarService $sidebarService): Response
    {
        $breadcrumbs = [
            ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
            ['label' => 'Contact'],
        ];

        return $this->render('page/contact.html.twig', array_merge([
            'page_title' => 'Contact Us',
            'page_description' => 'Learn more about the author behind InfraStack.',
            'breadcrumbs' => $breadcrumbs,
        ], $sidebarService->getSidebarData()));
    }

    #[Route('/privacy', name: 'app_privacy')]
    public function privacy(SidebarService $sidebarService): Response
    {
        $breadcrumbs = [
            ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
            ['label' => 'Privacy Policy'],
        ];

        return $this->render('page/privacy.html.twig', array_merge([
            'page_title' => 'Privacy Policy',
            'page_description' => 'Privacy notes for InfraStack visitors and tool users.',
            'breadcrumbs' => $breadcrumbs,
        ], $sidebarService->getSidebarData()));
    }

    private function getHomePosts(array $tools): array
    {
        $posts = [];

        foreach ($tools as $tool) {
            $tool['url'] = $this->generateUrl('tool_detail', [
                'category' => $tool['category_slug'],
                'slug' => $tool['slug'],
            ]);
            $posts[] = $tool;
        }

        usort($posts, function (array $a, array $b): int {
            return ($b['timestamp'] ?? 0) <=> ($a['timestamp'] ?? 0);
        });

        return $posts;
    }

    private function getHomeFamilyGroups(array $posts): array
    {
        $groups = [];

        foreach (self::HOME_FAMILY_CONFIG as $familySlug => $config) {
            $groups[$familySlug] = [
                'slug' => $familySlug,
                'label' => $config['label'],
                'eyebrow' => $config['eyebrow'],
                'summary' => $config['summary'],
                'icon' => $config['icon'],
                'verb' => $config['verb'],
                'start' => $config['start'],
                'end' => $config['end'],
                'workflow' => $config['workflow'],
                'tools' => [],
            ];
        }

        foreach ($posts as $post) {
            $familySlug = (string) ($post['family_slug'] ?? '');

            if (!array_key_exists($familySlug, $groups)) {
                continue;
            }

            $groups[$familySlug]['tools'][] = $post;
        }

        return array_values(array_filter(
            array_map(function (array $group): array {
                $group['tool_count'] = count($group['tools']);
                $group['primary_tool'] = $group['tools'][0] ?? null;
                $group['secondary_tools'] = array_slice($group['tools'], 1, 3);

                return $group;
            }, $groups),
            static fn (array $group): bool => $group['tool_count'] > 0
        ));
    }

    private function getCategoryPosts(array $posts): array
    {
        $preferredOrder = ['aws', 'azure', 'gcp', 'cis'];
        $postsByCategory = [];

        foreach ($posts as $post) {
            $categorySlug = (string) ($post['category_slug'] ?? '');

            if ($categorySlug === '' || array_key_exists($categorySlug, $postsByCategory)) {
                continue;
            }

            $postsByCategory[$categorySlug] = $post;
        }

        $categoryPosts = [];

        foreach ($preferredOrder as $categorySlug) {
            if (!array_key_exists($categorySlug, $postsByCategory)) {
                continue;
            }

            $categoryPosts[] = $postsByCategory[$categorySlug];
            unset($postsByCategory[$categorySlug]);
        }

        return array_merge($categoryPosts, array_values($postsByCategory));
    }

}
