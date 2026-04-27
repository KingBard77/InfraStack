<?php

namespace App\Controller;

use App\Service\SidebarService;
use League\CommonMark\CommonMarkConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Yaml\Yaml;

class ContentController extends AbstractController
{
    #[Route('/tools/{category}/{slug}', name: 'tool_detail')]
    public function toolDetail(
        string $category,
        string $slug,
        Request $request,
        SidebarService $sidebarService
    ): Response {
        $basePath = $this->getParameter('kernel.project_dir') . '/templates/content/tools';
        $toolPath = $basePath . '/' . $category . '/' . $slug;

        $metaFile = $toolPath . '/meta.yml';
        $contentFile = $toolPath . '/content.md';

        if (!file_exists($metaFile) || !file_exists($contentFile)) {
            throw $this->createNotFoundException('Tool content not found.');
        }

        $meta = Yaml::parseFile($metaFile);
        $markdown = file_get_contents($contentFile);

        if (!is_array($meta)) {
            $meta = [];
        }

        $searchQuery = trim((string) $request->query->get('q', ''));
        $sort = (string) $request->query->get('sort', 'newest');
        $categoryFilter = trim((string) $request->query->get('category', ''));
        $tagFilter = trim((string) $request->query->get('tag', ''));

        $converter = new CommonMarkConverter();
        $contentHtml = $converter->convert($markdown)->getContent();

        $categoryLabel = $meta['category_label'] ?? ucwords(str_replace('-', ' ', $category));
        $title = $meta['title'] ?? 'Tool Detail';

        $sidebarData = $sidebarService->getSidebarData(
            $searchQuery,
            $sort,
            $categoryFilter,
            $tagFilter
        );

        return $this->render('content/content.html.twig', array_merge([
            'meta' => $meta,
            'content_html' => $contentHtml,
            'category' => $category,
            'slug' => $slug,
            'article_url' => $request->getUri(),
            'article_title' => $title,
            'article_summary' => $meta['summary'] ?? '',
            'page_title' => $title,
            'page_description' => $meta['summary'] ?? '',
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
                ['label' => 'Tools', 'url' => $this->generateUrl('app_category')],
                [
                    'label' => $categoryLabel,
                    'url' => $this->generateUrl('app_category', ['category' => $category]),
                ],
                ['label' => $title],
            ],
        ], $sidebarData));
    }
}
