<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main', methods: ['GET'])]
    public function main(): Response
    {
        return $this->render('page/main.html.twig', [
            'page_title' => 'InfraStack',
            'page_description' => 'Build, review, share, and export infrastructure architecture in InfraStack Studio.',
            'page_keywords' => 'InfraStack Studio, infrastructure architecture, cloud diagrams, architecture review',
        ]);
    }

    #[Route('/tools', name: 'app_legacy_tools', methods: ['GET'])]
    public function legacyTools(): Response
    {
        return $this->redirectToRoute('app_studio', status: Response::HTTP_MOVED_PERMANENTLY);
    }

    #[Route('/author-profile', name: 'app_author', methods: ['GET'])]
    public function profile(): Response
    {
        return $this->render('page/author-profile.html.twig', [
            'page_title' => 'Author Profile',
            'page_description' => 'Learn more about the author behind InfraStack.',
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
                ['label' => 'Author Profile'],
            ],
        ]);
    }

    #[Route('/contact', name: 'app_contact', methods: ['GET'])]
    public function contact(): Response
    {
        return $this->render('page/contact.html.twig', [
            'page_title' => 'Contact Us',
            'page_description' => 'Contact InfraStack about architecture patterns, feedback, or collaboration.',
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
                ['label' => 'Contact'],
            ],
        ]);
    }

    #[Route('/privacy', name: 'app_privacy', methods: ['GET'])]
    public function privacy(): Response
    {
        return $this->render('page/privacy.html.twig', [
            'page_title' => 'Privacy Policy',
            'page_description' => 'Privacy notes for InfraStack Studio users and visitors.',
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house'],
                ['label' => 'Privacy Policy'],
            ],
        ]);
    }
}
