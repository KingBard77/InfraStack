<?php

namespace App\Controller;

use App\Service\SidebarService;
use App\Service\ToolCatalogService;
use League\CommonMark\CommonMarkConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Yaml\Yaml;

class ContentController extends AbstractController
{
    #[Route('/tools/{category}/{slug}', name: 'tool_detail')]
    public function toolDetail(
        string $category,
        string $slug,
        Request $request,
        SidebarService $sidebarService,
        ToolCatalogService $toolCatalogService
    ): Response {
        return $this->renderTool(
            $category,
            $slug,
            $request,
            $sidebarService,
            $toolCatalogService,
            (string) $request->query->get('share') === 'embed'
        );
    }

    #[Route('/embed/{category}/{slug}', name: 'tool_embed')]
    public function toolEmbed(
        string $category,
        string $slug,
        Request $request,
        SidebarService $sidebarService,
        ToolCatalogService $toolCatalogService
    ): Response {
        return $this->renderTool(
            $category,
            $slug,
            $request,
            $sidebarService,
            $toolCatalogService,
            true
        );
    }

    private function renderTool(
        string $category,
        string $slug,
        Request $request,
        SidebarService $sidebarService,
        ToolCatalogService $toolCatalogService,
        bool $isEmbedFrame
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
        $card = $this->loadToolCard($toolPath);

        if (!is_array($meta)) {
            $meta = [];
        }

        $meta = $toolCatalogService->decorateMetaForPublicationStatus($meta);

        if (!$toolCatalogService->shouldIncludeDraftTools() && ($meta['is_draft'] ?? false)) {
            throw $this->createNotFoundException('Tool content not found.');
        }

        $searchQuery = trim((string) $request->query->get('q', ''));
        $sort = (string) $request->query->get('sort', 'newest');
        $categoryFilter = trim((string) $request->query->get('category', ''));
        $tagFilter = trim((string) $request->query->get('tag', ''));

        $converter = new CommonMarkConverter();
        $contentHtml = $converter->convert($markdown)->getContent();

        $categoryLabel = $meta['category_label'] ?? ucwords(str_replace('-', ' ', $category));
        $title = $meta['title'] ?? 'Tool Detail';
        $displayTitle = $meta['display_title'] ?? $title;

        $sidebarData = $isEmbedFrame
            ? []
            : $sidebarService->getSidebarData(
                $searchQuery,
                $sort,
                $categoryFilter,
                $tagFilter
            );
        $articleUrl = $this->generateUrl(
            'tool_detail',
            ['category' => $category, 'slug' => $slug],
            UrlGeneratorInterface::ABSOLUTE_URL
        );
        $embedUrl = $this->generateUrl(
            'tool_embed',
            ['category' => $category, 'slug' => $slug],
            UrlGeneratorInterface::ABSOLUTE_URL
        );
        $pageImage = $this->resolveToolShareImage($category, $slug, $toolPath, $request, $card);
        $template = $isEmbedFrame ? 'layout/embed.html.twig' : 'content/content.html.twig';

        return $this->render($template, array_merge([
            'meta' => $meta,
            'card' => $card,
            'content_html' => $contentHtml,
            'category' => $category,
            'slug' => $slug,
            'article_url' => $articleUrl,
            'embed_url' => $embedUrl,
            'article_title' => $title,
            'article_summary' => $meta['summary'] ?? '',
            'page_title' => $title,
            'page_description' => $meta['summary'] ?? '',
            'page_url' => $articleUrl,
            'page_type' => 'article',
            'page_image' => $pageImage['url'],
            'page_image_alt' => $title,
            'page_image_width' => $pageImage['width'],
            'page_image_height' => $pageImage['height'],
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
                ['label' => 'Tools', 'url' => $this->generateUrl('app_category')],
                [
                    'label' => $categoryLabel,
                    'url' => $this->generateUrl('app_category', ['category' => $category]),
                ],
                ['label' => $displayTitle],
            ],
        ], $sidebarData));
    }

    private function resolveToolShareImage(
        string $category,
        string $slug,
        string $toolPath,
        Request $request,
        array $card
    ): array {
        $cardImage = isset($card['card_image']) && is_string($card['card_image'])
            ? trim($card['card_image'])
            : '';

        if ($cardImage !== '') {
            return [
                'url' => $this->resolvePublicAssetUrl($cardImage, $request),
                'width' => null,
                'height' => null,
            ];
        }

        $publicRelativePath = sprintf(
            'images/tools/%s/%s/share.png',
            trim($category, '/'),
            trim($slug, '/')
        );
        $publicPath = $this->getParameter('kernel.project_dir') . '/public/' . $publicRelativePath;

        if (file_exists($publicPath)) {
            return [
                'url' => $this->resolvePublicAssetUrl($publicRelativePath, $request),
                'width' => 1200,
                'height' => 630,
            ];
        }

        return [
            'url' => null,
            'width' => null,
            'height' => null,
        ];
    }

    private function loadToolCard(string $toolPath): array
    {
        $cardFile = $toolPath . '/card.yml';

        if (!file_exists($cardFile)) {
            return [];
        }

        $card = Yaml::parseFile($cardFile);

        return is_array($card) ? $card : [];
    }

    private function resolvePublicAssetUrl(string $assetPath, Request $request): string
    {
        $assetPath = trim($assetPath);

        if (preg_match('#^https?://#i', $assetPath)) {
            return $assetPath;
        }

        if (str_starts_with($assetPath, '//')) {
            return $request->getScheme() . ':' . $assetPath;
        }

        return $request->getSchemeAndHttpHost() . '/' . ltrim($assetPath, '/');
    }
}
