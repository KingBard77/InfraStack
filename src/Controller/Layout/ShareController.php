<?php

namespace App\Controller\Layout;

use App\Exception\Layout\ShareException;
use App\Service\Layout\ShareService;
use App\Service\Studio\StudioLibraryService;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Asset\Packages;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ShareController extends AbstractController
{
    private const SHARE_ID_REQUIREMENT = '[a-f0-9]{32}';

    #[Route('/api/studio/share', name: 'app_studio_share_create', methods: ['POST'])]
    public function create(Request $request, ShareService $shareService): JsonResponse
    {
        if (!$this->isCsrfTokenValid('submit', (string) $request->headers->get('X-CSRF-Token'))) {
            return $this->json(['error' => 'The share request expired. Reload Studio and try again.'], Response::HTTP_FORBIDDEN);
        }

        if (strlen($request->getContent()) > 1_048_576) {
            return $this->json(['error' => 'This project is too large to share.'], Response::HTTP_REQUEST_ENTITY_TOO_LARGE);
        }

        try {
            $payload = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            if (!is_array($payload) || !is_array($payload['project'] ?? null)) {
                throw new ShareException('The share request is invalid.', Response::HTTP_BAD_REQUEST);
            }
            $snapshot = $shareService->create($payload['project']);
            $shareId = (string) $snapshot['share_id'];

            return $this->json([
                'share_id' => $shareId,
                'share_url' => $this->generateUrl(
                    'app_studio_share',
                    ['shareId' => $shareId],
                    UrlGeneratorInterface::ABSOLUTE_URL
                ),
                'embed_url' => $this->generateUrl(
                    'app_studio_embed',
                    ['shareId' => $shareId],
                    UrlGeneratorInterface::ABSOLUTE_URL
                ),
                'created_at' => $snapshot['created_at'],
            ], Response::HTTP_CREATED);
        } catch (JsonException) {
            return $this->json(['error' => 'The share request contains invalid JSON.'], Response::HTTP_BAD_REQUEST);
        } catch (ShareException $exception) {
            return $this->json(['error' => $exception->getMessage()], $exception->getStatusCode());
        }
    }

    #[Route('/share/{shareId}', name: 'app_studio_share', requirements: ['shareId' => self::SHARE_ID_REQUIREMENT], methods: ['GET'])]
    public function share(
        string $shareId,
        Request $request,
        Packages $assets,
        ShareService $shareService,
        StudioLibraryService $libraryService
    ): Response {
        $snapshot = $this->snapshotOr404($shareService, $shareId);
        $project = $snapshot['project'];

        return $this->render('layout/share.html.twig', [
            'page_title' => $project['name'] . ' · InfraStack',
            'page_description' => 'Shared read-only infrastructure diagram, inventory, and architecture advisory from InfraStack Studio.',
            'page_url' => $request->getUri(),
            'shared_project' => $project,
            'shared_created_at' => $snapshot['created_at'],
            'studio_icon_urls' => $libraryService->iconUrls($assets),
            'embed_url' => $this->generateUrl('app_studio_embed', ['shareId' => $shareId], UrlGeneratorInterface::ABSOLUTE_URL),
        ]);
    }

    #[Route('/embed/{shareId}', name: 'app_studio_embed', requirements: ['shareId' => self::SHARE_ID_REQUIREMENT], methods: ['GET'])]
    public function embed(
        string $shareId,
        Request $request,
        Packages $assets,
        ShareService $shareService,
        StudioLibraryService $libraryService
    ): Response {
        $snapshot = $this->snapshotOr404($shareService, $shareId);

        $response = $this->render('layout/embed.html.twig', [
            'page_title' => $snapshot['project']['name'] . ' · InfraStack Embed',
            'shared_project' => $snapshot['project'],
            'studio_icon_urls' => $libraryService->iconUrls($assets),
            'show_inventory' => $request->query->getBoolean('inventory'),
            'show_advisory' => $request->query->getBoolean('advisory'),
        ]);
        $response->headers->set('X-Robots-Tag', 'noindex, follow');
        $response->headers->set('Content-Security-Policy', "frame-ancestors *");

        return $response;
    }

    private function snapshotOr404(ShareService $shareService, string $shareId): array
    {
        try {
            return $shareService->read($shareId);
        } catch (ShareException $exception) {
            throw $this->createNotFoundException($exception->getMessage(), $exception);
        }
    }

}
