<?php

namespace App\Controller;

use App\Exception\ShareSnapshotException;
use App\Service\ShareService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ShareController extends AbstractController
{
    #[Route('/api/{category}/{slug}/share-snapshot', name: 'app_share_snapshot_create', requirements: ['category' => '[a-z0-9-]+', 'slug' => '[a-z0-9-]+'], methods: ['POST'])]
    public function createShareSnapshot(
        string $category,
        string $slug,
        Request $request,
        ShareService $shareService
    ): JsonResponse {
        try {
            $snapshot = $shareService->createSnapshot(
                $category,
                $slug,
                $request->files->get('image'),
                (string) $request->request->get('title', ''),
                (string) $request->request->get('summary', '')
            );
            $snapshotId = (string) $snapshot['snapshotId'];
            $tool = $snapshot['tool'];
            $metadata = $snapshot['metadata'];

            return $this->json([
                'snapshotId' => $snapshotId,
                'snapshotUrl' => $this->generateUrl(
                    'app_share_snapshot_page',
                    [
                        'category' => $tool['category_slug'],
                        'slug' => $tool['slug'],
                        'snapshotId' => $snapshotId,
                    ],
                    UrlGeneratorInterface::ABSOLUTE_URL
                ),
                'imageUrl' => $shareService->getSnapshotPublicImageUrl(
                    (string) $tool['category_slug'],
                    (string) $tool['slug'],
                    $snapshotId,
                    $request->getSchemeAndHttpHost()
                ),
                'createdAt' => $metadata['createdAt'],
            ]);
        } catch (ShareSnapshotException $exception) {
            return $this->json([
                'error' => $exception->getMessage(),
            ], $exception->getStatusCode());
        }
    }

    #[Route('/share/{category}/{slug}/{snapshotId}', name: 'app_share_snapshot_page', requirements: ['category' => '[a-z0-9-]+', 'slug' => '[a-z0-9-]+', 'snapshotId' => '[a-f0-9]{32}'], methods: ['GET'])]
    public function shareSnapshotPage(
        string $category,
        string $slug,
        string $snapshotId,
        Request $request,
        ShareService $shareService
    ): Response {
        try {
            $snapshot = $shareService->readSnapshot($category, $slug, $snapshotId);
            $metadata = $snapshot['metadata'];
            $tool = $snapshot['tool'];
            $imageUrl = $shareService->getSnapshotPublicImageUrl(
                (string) $tool['category_slug'],
                (string) $tool['slug'],
                $snapshotId,
                $request->getSchemeAndHttpHost()
            );
            $snapshotUrl = $this->generateUrl(
                'app_share_snapshot_page',
                [
                    'category' => $tool['category_slug'],
                    'slug' => $tool['slug'],
                    'snapshotId' => $snapshotId,
                ],
                UrlGeneratorInterface::ABSOLUTE_URL
            );
            $articleUrl = $this->generateUrl(
                'tool_detail',
                [
                    'category' => $tool['category_slug'],
                    'slug' => $tool['slug'],
                ],
                UrlGeneratorInterface::ABSOLUTE_URL
            );
        } catch (ShareSnapshotException $exception) {
            throw $this->createNotFoundException($exception->getMessage(), $exception);
        }

        $response = $this->render('base.html.twig', [
            'body_template' => 'layout/share.html.twig',
            'share_mode' => 'snapshot',
            'snapshot_id' => $snapshotId,
            'snapshot_image_url' => $imageUrl,
            'snapshot_created_at' => $metadata['createdAt'],
            'article_url' => $articleUrl,
            'tool_title' => $tool['title'],
            'page_title' => $metadata['title'],
            'page_description' => $metadata['summary'],
            'page_url' => $snapshotUrl,
            'page_type' => 'article',
            'page_image' => $imageUrl,
            'page_image_alt' => $metadata['title'],
            'page_image_width' => $metadata['width'],
            'page_image_height' => $metadata['height'],
        ]);

        $response->headers->set('X-Robots-Tag', 'index, follow');

        return $response;
    }

    #[Route('/share/{category}/{slug}/{snapshotId}/image', name: 'app_share_snapshot_image', requirements: ['category' => '[a-z0-9-]+', 'slug' => '[a-z0-9-]+', 'snapshotId' => '[a-f0-9]{32}'], methods: ['GET'])]
    public function shareSnapshotImage(
        string $category,
        string $slug,
        string $snapshotId,
        ShareService $shareService
    ): BinaryFileResponse {
        try {
            $snapshot = $shareService->readSnapshot($category, $slug, $snapshotId);
        } catch (ShareSnapshotException $exception) {
            throw $this->createNotFoundException($exception->getMessage(), $exception);
        }

        $response = new BinaryFileResponse((string) $snapshot['imagePath']);
        $response->headers->set('Content-Type', 'image/png');
        $response->headers->set('X-Robots-Tag', 'index, follow');
        $response->setPublic();
        $response->setMaxAge(604800);
        $response->setSharedMaxAge(604800);

        return $response;
    }
}
