<?php

namespace App\Controller;

use App\Service\Studio\StudioTemplateRouteService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class SitemapController extends AbstractController
{
    #[Route('/sitemap.xml', name: 'app_sitemap', methods: ['GET'])]
    public function index(StudioTemplateRouteService $templateRouteService): Response
    {
        $urls = [];
        foreach (['app_main', 'app_studio', 'app_author', 'app_contact', 'app_privacy'] as $route) {
            $urls[] = $this->generateUrl($route, [], UrlGeneratorInterface::ABSOLUTE_URL);
        }
        foreach ($templateRouteService->routes() as $templateRoute) {
            $urls[] = $this->generateUrl(
                'app_studio_template',
                [
                    'provider' => $templateRoute['provider'],
                    'templateId' => $templateRoute['template_id'],
                ],
                UrlGeneratorInterface::ABSOLUTE_URL
            );
        }

        $response = $this->render('search/sitemap.xml.twig', ['urls' => $urls]);
        $response->headers->set('Content-Type', 'application/xml; charset=UTF-8');

        return $response->setPublic()->setMaxAge(3600)->setSharedMaxAge(3600);
    }
}
