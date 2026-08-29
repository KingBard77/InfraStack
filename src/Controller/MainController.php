<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\GoneHttpException;
use Symfony\Component\Routing\Attribute\Route;

class MainController extends AbstractController
{
    private const LEGACY_ARCHITECTURE_REDIRECTS = [
        'aws/architecture-vpc-aws' => ['aws', 'aws-three-tier'],
        'azure/architecture-vnet-azure' => ['azure', 'azure-three-tier'],
        'gcp/architecture-vpc-gcp' => ['gcp', 'gcp-regional-web'],
        'infrastructure/architecture-topology-kubernetes' => [
            'kubernetes',
            'kubernetes-cluster-foundation',
        ],
    ];

    private const RETIRED_LANDING_REDIRECTS = [
        'aws' => ['aws', 'aws-three-tier'],
        'azure' => ['azure', 'azure-three-tier'],
        'gcp' => ['gcp', 'gcp-regional-web'],
        'kubernetes' => ['kubernetes', 'kubernetes-production-application'],
        'unifi' => ['ubiquiti', 'ubiquiti-unifi-office-network'],
    ];

    private const LEGACY_STUDIO_PATHS = [
        'cisco/architecture-campus-network-cisco',
        'huawei/architecture-vpc-huawei',
        'ibm/architecture-cloud-ibm',
        'infrastructure/architecture-logical-application',
        'infrastructure/architecture-physical-server',
        'tmcloud/architecture-cloud-tmcloud',
    ];

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

    #[Route(
        '/architecture/{provider}',
        name: 'app_retired_architecture_landing',
        requirements: ['provider' => 'aws|azure|gcp|kubernetes|unifi'],
        methods: ['GET']
    )]
    public function retiredArchitectureLanding(string $provider): Response
    {
        [$studioProvider, $templateId] = self::RETIRED_LANDING_REDIRECTS[$provider];

        return $this->redirectToRoute('app_studio_template', [
            'provider' => $studioProvider,
            'templateId' => $templateId,
        ], Response::HTTP_MOVED_PERMANENTLY);
    }

    #[Route(
        '/tools/{category}/{slug}',
        name: 'app_legacy_tool',
        requirements: [
            'category' => '[a-z0-9-]+',
            'slug' => '[a-z0-9-]+',
        ],
        methods: ['GET']
    )]
    public function legacyTool(string $category, string $slug): Response
    {
        $legacyPath = $category . '/' . $slug;
        if (isset(self::LEGACY_ARCHITECTURE_REDIRECTS[$legacyPath])) {
            [$studioProvider, $templateId] = self::LEGACY_ARCHITECTURE_REDIRECTS[$legacyPath];

            return $this->redirectToRoute('app_studio_template', [
                'provider' => $studioProvider,
                'templateId' => $templateId,
            ], Response::HTTP_MOVED_PERMANENTLY);
        }
        if (in_array($legacyPath, self::LEGACY_STUDIO_PATHS, true)) {
            return $this->redirectToRoute('app_studio', status: Response::HTTP_MOVED_PERMANENTLY);
        }

        throw new GoneHttpException('This retired InfraStack tool has no current equivalent.');
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
