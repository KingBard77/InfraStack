<?php

namespace App\Controller\Tools\Aws\ArchitectureVpcAws;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CustomController extends AbstractController
{
    private const ICON_ROOT = '/templates/content/tools/aws/architecture-vpc-aws/assets/icon';

    private const ICON_FILES = [
        'amazon-vpc' => 'aws-arch-amazon-virtual-private-cloud-48.svg',
        'route-53' => 'aws-arch-amazon-route-53-48.svg',
        'cloud-front' => 'aws-arch-amazon-cloudfront-48.svg',
        'waf' => 'aws-arch-aws-waf-48.svg',
        'internet-gateway' => 'aws-res-amazon-vpc-internet-gateway-48-light.svg',
        'application-load-balancer' => 'aws-res-elastic-load-balancing-application-load-balancer-48-light.svg',
        'vpc-router' => 'aws-res-amazon-vpc-router-48-light.svg',
        'nat-gateway' => 'aws-res-amazon-vpc-nat-gateway-48-light.svg',
        'ec2' => 'aws-arch-amazon-ec2-48.svg',
        'ec2-auto-scaling' => 'aws-arch-amazon-ec2-auto-scaling-48.svg',
        'ecs' => 'aws-arch-amazon-elastic-container-service-48.svg',
        'eks' => 'aws-arch-amazon-elastic-kubernetes-service-48.svg',
        'fargate' => 'aws-arch-aws-fargate-48.svg',
        'lambda' => 'aws-arch-aws-lambda-48.svg',
        'rds' => 'aws-arch-amazon-rds-48.svg',
        'aurora' => 'aws-arch-amazon-aurora-48.svg',
        'dynamodb' => 'aws-arch-amazon-dynamodb-48.svg',
        'elasticache' => 'aws-arch-amazon-elasticache-48.svg',
        'vpc-endpoints' => 'aws-res-amazon-vpc-endpoints-48-light.svg',
        'vpc-flow-logs' => 'aws-res-amazon-vpc-flow-logs-48-light.svg',
        'cloud-watch' => 'aws-arch-amazon-cloudwatch-48.svg',
        'systems-manager' => 'aws-arch-aws-systems-manager-48.svg',
        'site-to-site-vpn' => 'aws-arch-aws-site-to-site-vpn-48.svg',
        'transit-gateway' => 'aws-arch-aws-transit-gateway-48.svg',
        'bastion' => 'aws-arch-amazon-ec2-48.svg',
    ];

    #[Route(
        '/api/aws/architecture-vpc-aws/icon/{iconKey}',
        name: 'app_aws_architecture_vpc_aws_icon',
        requirements: ['iconKey' => '[a-z0-9-]+'],
        methods: ['GET']
    )]
    public function icon(string $iconKey): Response
    {
        if (!isset(self::ICON_FILES[$iconKey])) {
            throw $this->createNotFoundException('Icon not found.');
        }

        $filename = self::ICON_FILES[$iconKey];
        $projectDir = (string) $this->getParameter('kernel.project_dir');
        $iconRoot = realpath($projectDir . self::ICON_ROOT);

        if ($iconRoot === false) {
            throw $this->createNotFoundException('Icon root not found.');
        }

        $iconPath = realpath($iconRoot . DIRECTORY_SEPARATOR . $filename);
        $expectedPrefix = rtrim($iconRoot, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;

        if (
            $iconPath === false
            || !is_file($iconPath)
            || !str_starts_with($iconPath, $expectedPrefix)
        ) {
            throw $this->createNotFoundException('Icon not found.');
        }

        $content = file_get_contents($iconPath);

        if ($content === false) {
            return new Response(
                'Failed to load icon.',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        $response = new Response($content);
        $response->headers->set('Content-Type', 'image/svg+xml; charset=UTF-8');
        $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        return $response;
    }
}
