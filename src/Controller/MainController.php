<?php

namespace App\Controller;

use App\Service\SidebarService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Yaml\Yaml;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function main(SidebarService $sidebarService): Response
    {
        $homePosts = $this->getHomePosts();
        $categoryPosts = $this->getCategoryPosts($homePosts);
        $sidebarData = $sidebarService->getSidebarData();

        return $this->render('page/main.html.twig', array_merge([
            'page_title' => 'Home',
            'home_posts' => $homePosts,
            'home_post_templates' => $this->getHomePostTemplates($homePosts),
            'hero_posts' => array_slice($homePosts, 0, 5),
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

    private function getHomePosts(): array
    {
        $basePath = $this->getParameter('kernel.project_dir') . '/templates/content/tools';
        $posts = [];

        if (!is_dir($basePath)) {
            return $posts;
        }

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
                $postTemplateFile = $toolPath . '/assets/img/post.html.twig';

                if (!file_exists($metaFile) || !file_exists($postTemplateFile)) {
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
                $dateDisplay = $meta['date'] ?? date('M j, Y');
                $timestamp = strtotime((string) $dateDisplay);

                if ($timestamp === false) {
                    $timestamp = time();
                }

                $posts[] = [
                    'title' => $title,
                    'slug' => $toolFolder,
                    'category_slug' => $categoryFolder,
                    'category' => $categoryLabel,
                    'author' => $meta['author'] ?? 'InfraStack',
                    'author_image' => $meta['author_image'] ?? '',
                    'author_initial' => $this->getInitial($meta['author'] ?? $title),
                    'date_display' => $dateDisplay,
                    'date_attribute' => date('Y-m-d', $timestamp),
                    'timestamp' => $timestamp,
                    'comments' => $meta['comments'] ?? 'Interactive tool',
                    'reading_time' => $meta['reading_time'] ?? '3 min read',
                    'summary' => $meta['summary'] ?? ($meta['intro'] ?? ''),
                    'intro' => $meta['intro'] ?? ($meta['summary'] ?? ''),
                    'tags' => is_array($meta['tags'] ?? null) ? $meta['tags'] : [],
                    'card_summary' => $card['card_summary'] ?? ($meta['summary'] ?? ($meta['intro'] ?? '')),
                    'card_gradient_start' => $card['card_gradient_start'] ?? '#CBD5E1',
                    'card_gradient_end' => $card['card_gradient_end'] ?? '#94A3B8',
                    'card_text_color' => $card['card_text_color'] ?? '#FFFFFF',
                    'card_kicker' => $card['card_kicker'] ?? $categoryLabel,
                    'card_image_title' => $card['card_image_title'] ?? $title,
                    'card_icon_class' => $card['card_icon_class'] ?? 'bi bi-tools',
                    'post_template' => 'content/tools/' . $categoryFolder . '/' . $toolFolder . '/assets/img/post.html.twig',
                    'url' => $this->generateUrl('tool_detail', [
                        'category' => $categoryFolder,
                        'slug' => $toolFolder,
                    ]),
                ];
            }
        }

        usort($posts, function (array $a, array $b): int {
            return ($b['timestamp'] ?? 0) <=> ($a['timestamp'] ?? 0);
        });

        return $posts;
    }

    private function getHomePostTemplates(array $posts): array
    {
        $templates = [];

        foreach ($posts as $post) {
            $template = (string) ($post['post_template'] ?? '');

            if ($template === '') {
                continue;
            }

            $templates[$template] = $template;
        }

        return array_values($templates);
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

    private function getInitial(string $value): string
    {
        $normalizedValue = trim($value);

        if ($normalizedValue === '') {
            return 'I';
        }

        return strtoupper(substr($normalizedValue, 0, 1));
    }
}
