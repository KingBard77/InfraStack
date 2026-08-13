// aws-templates.js
const InfraStackStudioAwsTemplates = (function () {
    const allViews = ['overview', 'physical', 'network', 'availability'];
    const cloudViews = ['overview', 'network', 'availability'];

    function layout(x, y, width = 156, height = 104, iconSize = 36) {
        return Object.fromEntries(allViews.map(function (view) {
            return [view, { x, y, width, height, icon_size: iconSize }];
        }));
    }

    function asset(id, type, label, x, y, options = {}) {
        return {
            id,
            catalog_id: options.catalogId || null,
            type,
            label,
            category: options.category || 'AWS',
            views: options.views || cloudViews,
            is_container: options.container === true,
            parent_id: options.parent || null,
            properties: { provider: 'aws', region: 'ap-southeast-1', ...options.properties },
            layout: layout(x, y, options.width, options.height, options.iconSize)
        };
    }

    function connection(id, source, target, type, label, options = {}) {
        return {
            id,
            source,
            target,
            type,
            label,
            bidirectional: options.bidirectional === true,
            direction: options.direction || (options.bidirectional ? 'bidirectional' : 'source-to-target'),
            protocol: options.protocol || '',
            bandwidth: options.bandwidth || ''
        };
    }

    function build(core, id, name, assets, connections) {
        const project = core.createEmptyProject(name);
        project.profile = id;
        project.assets = assets;
        project.connections = connections;
        const result = core.normalizeProject(project);

        if (!result.ok) throw new Error(result.error || 'AWS template could not be normalized.');
        return result.project;
    }

    function awsBoundaryAssets(vpcName = 'Production VPC') {
        return [
            asset('aws-cloud', 'domain', 'AWS Cloud', 80, 70, { container: true, width: 2100, height: 1160, category: 'Cloud', views: allViews, properties: { role: 'AWS account boundary', owner: 'Platform Team' } }),
            asset('production', 'environment', 'Production', 140, 145, { container: true, parent: 'aws-cloud', width: 1980, height: 1020, category: 'Environment', views: allViews, properties: { environment: 'production', critical: true } }),
            asset('vpc', 'vpc', vpcName, 210, 220, { catalogId: 'aws-vpc', container: true, parent: 'production', width: 1840, height: 880, category: 'Network', properties: { address: '10.0.0.0/16', role: 'Primary AWS network', dns_hostnames: true, dns_resolution: true, tags: 'Environment=Production, Owner=Platform Team' } }),
            asset('az-a', 'availability-zone', 'Availability Zone A', 280, 310, { container: true, parent: 'vpc', width: 800, height: 700, category: 'Availability', properties: { zone: 'ap-southeast-1a', environment: 'production' } }),
            asset('az-b', 'availability-zone', 'Availability Zone B', 1170, 310, { container: true, parent: 'vpc', width: 800, height: 700, category: 'Availability', properties: { zone: 'ap-southeast-1b', environment: 'production' } })
        ];
    }

    const templates = [
        { id: 'aws-three-tier', name: 'AWS Three-Tier Multi-AZ', description: 'Route 53, internet ingress, isolated application and data tiers, Multi-AZ RDS and operations services.', icon: 'bi-layers', create: function (core) {
            const assets = [
                asset('users', 'application', 'Users', 500, 100, { width: 230, height: 78, iconSize: 28, properties: { role: 'External clients', monitoring: true } }),
                asset('route53', 'router', 'Amazon Route 53', 790, 100, { catalogId: 'aws-route-53', width: 230, height: 78, iconSize: 28, properties: { role: 'Public DNS and routing', monitoring: true } }),
                asset('internet', 'internet', 'Internet', 650, 190, { catalogId: 'aws-internet-gateway', width: 230, height: 78, iconSize: 28, properties: { role: 'Public network edge', monitoring: true } }),
                asset('alb', 'router', 'Application Load Balancer', 620, 275, { catalogId: 'aws-application-load-balancer', width: 300, height: 64, iconSize: 26, properties: { role: 'Internet-facing ingress', monitoring: true, critical: true } }),
                asset('vpc', 'vpc', 'AWS VPC', 120, 350, { catalogId: 'aws-vpc', container: true, width: 1380, height: 980, category: 'Network', properties: { address: '10.0.0.0/16', role: 'AWS network boundary', dns_hostnames: true, dns_resolution: true, tags: 'Environment=Production, Owner=Platform Team' } }),
                asset('az-a', 'availability-zone', 'Availability Zone A', 210, 450, { container: true, parent: 'vpc', width: 560, height: 760, category: 'Availability', properties: { zone: 'ap-southeast-1a', role: 'Subnet and workload grouping', environment: 'production' } }),
                asset('az-b', 'availability-zone', 'Availability Zone B', 850, 450, { container: true, parent: 'vpc', width: 560, height: 760, category: 'Availability', properties: { zone: 'ap-southeast-1b', role: 'Subnet and workload grouping', environment: 'production' } }),
                asset('public-a', 'subnet', 'Public Subnet A', 260, 540, { parent: 'az-a', container: true, width: 460, height: 180, category: 'Network', properties: { address: '10.0.1.0/24', role: 'Ingress and egress tier', subnet_type: 'public', route_table: 'rtb-public-a' } }),
                asset('public-b', 'subnet', 'Public Subnet B', 900, 540, { parent: 'az-b', container: true, width: 460, height: 180, category: 'Network', properties: { address: '10.0.2.0/24', role: 'Ingress and egress tier', subnet_type: 'public', route_table: 'rtb-public-b' } }),
                asset('nat', 'router', 'NAT Gateway', 330, 620, { catalogId: 'aws-nat-gateway', parent: 'public-a', width: 320, height: 74, iconSize: 28, properties: { role: 'Shared outbound path', monitoring: true, critical: true, zone: 'ap-southeast-1a' } }),
                asset('private-app-a', 'subnet', 'Private App Subnet A', 260, 760, { parent: 'az-a', container: true, width: 460, height: 190, category: 'Network', properties: { address: '10.0.11.0/24', role: 'Private workload tier', subnet_type: 'private', route_table: 'rtb-private-app-a' } }),
                asset('private-app-b', 'subnet', 'Private App Subnet B', 900, 760, { parent: 'az-b', container: true, width: 460, height: 190, category: 'Network', properties: { address: '10.0.12.0/24', role: 'Private workload tier', subnet_type: 'private', route_table: 'rtb-private-app-b' } }),
                asset('ec2-a', 'server', 'EC2 Auto Scaling', 330, 850, { catalogId: 'aws-ec2-auto-scaling', parent: 'private-app-a', width: 320, height: 74, iconSize: 28, views: allViews, properties: { role: 'Availability Zone A workload', instance_type: 'm7i.large', operating_system: 'Amazon Linux 2023', private_ip: '10.0.11.20', cpu: '2 vCPU', memory: '8 GB', storage: '40 GB EBS', monitoring: true, backup: true, critical: true, zone: 'ap-southeast-1a' } }),
                asset('ec2-b', 'server', 'EC2 Auto Scaling', 970, 850, { catalogId: 'aws-ec2-auto-scaling', parent: 'private-app-b', width: 320, height: 74, iconSize: 28, views: allViews, properties: { role: 'Availability Zone B workload', instance_type: 'm7i.large', operating_system: 'Amazon Linux 2023', private_ip: '10.0.12.20', cpu: '2 vCPU', memory: '8 GB', storage: '40 GB EBS', monitoring: true, backup: true, critical: true, zone: 'ap-southeast-1b' } }),
                asset('private-data-a', 'subnet', 'Private Data Subnet A', 260, 990, { parent: 'az-a', container: true, width: 460, height: 190, category: 'Network', properties: { address: '10.0.21.0/24', role: 'Stateful data services', subnet_type: 'private', route_table: 'rtb-private-data-a' } }),
                asset('private-data-b', 'subnet', 'Private Data Subnet B', 900, 990, { parent: 'az-b', container: true, width: 460, height: 190, category: 'Network', properties: { address: '10.0.22.0/24', role: 'Stateful data services', subnet_type: 'private', route_table: 'rtb-private-data-b' } }),
                asset('rds-primary', 'database', 'RDS Primary', 330, 1080, { catalogId: 'aws-rds', parent: 'private-data-a', width: 320, height: 74, iconSize: 28, properties: { role: 'Writer placement', storage: '500 GB', backup: true, monitoring: true, critical: true, zone: 'ap-southeast-1a' } }),
                asset('rds-standby', 'database', 'RDS Standby', 970, 1080, { catalogId: 'aws-rds', parent: 'private-data-b', width: 320, height: 74, iconSize: 28, properties: { role: 'Replica or standby', storage: '500 GB', backup: true, monitoring: true, critical: true, zone: 'ap-southeast-1b' } }),
                asset('cloudwatch', 'monitoring', 'Amazon CloudWatch', 1580, 570, { catalogId: 'aws-cloudwatch', width: 260, height: 78, iconSize: 28, properties: { role: 'Metrics and alarms', monitoring: true } }),
                asset('flow-logs', 'monitoring', 'VPC Flow Logs', 1580, 760, { catalogId: 'aws-vpc-flow-logs', width: 260, height: 78, iconSize: 28, properties: { role: 'Traffic telemetry', monitoring: true } }),
                asset('endpoints', 'router', 'VPC Endpoints', 1580, 950, { catalogId: 'aws-vpc-endpoints', width: 260, height: 78, iconSize: 28, properties: { role: 'Private S3 and Systems Manager access', monitoring: true } })
            ];
            return build(core, 'aws-three-tier', 'AWS Three-Tier Multi-AZ', assets, [
                connection('users-dns', 'users', 'route53', 'network', 'DNS routing', { protocol: 'DNS' }),
                connection('dns-internet', 'route53', 'internet', 'network', 'Public route', { protocol: 'DNS/HTTPS' }),
                connection('internet-alb', 'internet', 'alb', 'network', 'HTTPS ingress', { protocol: 'HTTPS' }),
                connection('alb-a', 'alb', 'ec2-a', 'network', 'Application traffic', { protocol: 'HTTPS' }),
                connection('alb-b', 'alb', 'ec2-b', 'network', 'Application traffic', { protocol: 'HTTPS' }),
                connection('nat-a', 'nat', 'ec2-a', 'administration', 'Private egress'),
                connection('nat-b', 'nat', 'ec2-b', 'administration', 'Private egress'),
                connection('app-db-a', 'ec2-a', 'rds-primary', 'network', 'Database traffic', { protocol: 'TCP/5432' }),
                connection('app-db-b', 'ec2-b', 'rds-standby', 'network', 'Database traffic', { protocol: 'TCP/5432' }),
                connection('rds-replication', 'rds-primary', 'rds-standby', 'replication', 'Multi-AZ replication', { bidirectional: true }),
                connection('vpc-monitoring', 'vpc', 'cloudwatch', 'administration', 'Metrics and alarms'),
                connection('vpc-telemetry', 'vpc', 'flow-logs', 'administration', 'Traffic telemetry'),
                connection('vpc-private-access', 'vpc', 'endpoints', 'network', 'Private service access')
            ]);
        } },
        { id: 'aws-serverless', name: 'AWS Serverless Application', description: 'Route 53, CloudFront, WAF, Lambda and DynamoDB.', icon: 'bi-lightning-charge', create: function (core) {
            const assets = [
                asset('aws-cloud', 'domain', 'AWS Cloud', 160, 120, { container: true, width: 1900, height: 850, category: 'Cloud', views: allViews, properties: { role: 'Serverless account boundary' } }),
                asset('route53', 'router', 'Amazon Route 53', 260, 380, { catalogId: 'aws-route-53', parent: 'aws-cloud', properties: { role: 'Public DNS', monitoring: true } }),
                asset('cloudfront', 'internet', 'Amazon CloudFront', 520, 380, { catalogId: 'aws-cloudfront', parent: 'aws-cloud', properties: { role: 'Global content delivery', monitoring: true } }),
                asset('waf', 'firewall', 'AWS WAF', 790, 380, { catalogId: 'aws-waf', parent: 'aws-cloud', properties: { vendor: 'AWS', security_zones: 'Internet, application', policies: 'AWS managed rules', monitoring: true, critical: true } }),
                asset('lambda', 'application', 'AWS Lambda', 1080, 380, { catalogId: 'aws-lambda', parent: 'aws-cloud', properties: { role: 'Application functions', cpu: 'Managed', memory: '2048 MB', monitoring: true, backup: true, critical: true } }),
                asset('dynamodb', 'database', 'Amazon DynamoDB', 1390, 280, { catalogId: 'aws-dynamodb', parent: 'aws-cloud', properties: { role: 'Application state', backup: true, redundant: true, monitoring: true, critical: true } }),
                asset('cloudwatch', 'monitoring', 'Amazon CloudWatch', 1390, 520, { catalogId: 'aws-cloudwatch', parent: 'aws-cloud', properties: { role: 'Metrics, logs and alarms', monitoring: true } })
            ];
            return build(core, 'aws-serverless', 'AWS Serverless Application', assets, [
                connection('dns-edge', 'route53', 'cloudfront', 'network', 'DNS routing', { protocol: 'DNS' }),
                connection('edge-waf', 'cloudfront', 'waf', 'trust', 'Filtered ingress', { protocol: 'HTTPS' }),
                connection('waf-lambda', 'waf', 'lambda', 'api', 'Application API', { protocol: 'HTTPS' }),
                connection('lambda-db', 'lambda', 'dynamodb', 'api', 'Data access', { protocol: 'AWS API' }),
                connection('lambda-monitor', 'lambda', 'cloudwatch', 'administration', 'Telemetry')
            ]);
        } },
        { id: 'aws-eks', name: 'AWS EKS Platform', description: 'Multi-AZ EKS, load balancing, worker capacity, RDS and monitoring.', icon: 'bi-hexagon', create: function (core) {
            const assets = awsBoundaryAssets('EKS Platform VPC');
            assets.push(
                asset('alb', 'router', 'Application Load Balancer', 990, 270, { catalogId: 'aws-application-load-balancer', parent: 'vpc', properties: { monitoring: true, critical: true } }),
                asset('eks', 'kubernetes', 'Amazon EKS', 990, 470, { catalogId: 'aws-eks', parent: 'vpc', properties: { role: 'Managed Kubernetes control plane', monitoring: true, redundant: true, critical: true } }),
                asset('workers-a', 'cluster', 'Worker Group A', 520, 620, { catalogId: 'aws-ec2-auto-scaling', parent: 'az-a', properties: { instance_type: 'm7i.xlarge', zone: 'ap-southeast-1a', monitoring: true, backup: true, critical: true } }),
                asset('workers-b', 'cluster', 'Worker Group B', 1410, 620, { catalogId: 'aws-ec2-auto-scaling', parent: 'az-b', properties: { instance_type: 'm7i.xlarge', zone: 'ap-southeast-1b', monitoring: true, backup: true, critical: true } }),
                asset('rds', 'database', 'Amazon RDS', 990, 790, { catalogId: 'aws-rds', parent: 'vpc', properties: { backup: true, redundant: true, monitoring: true, critical: true, storage: '1 TB' } }),
                asset('cloudwatch', 'monitoring', 'Amazon CloudWatch', 990, 970, { catalogId: 'aws-cloudwatch', parent: 'vpc', properties: { monitoring: true } })
            );
            return build(core, 'aws-eks', 'AWS EKS Platform', assets, [
                connection('alb-eks', 'alb', 'eks', 'network', 'Kubernetes ingress', { protocol: 'HTTPS' }),
                connection('eks-a', 'eks', 'workers-a', 'administration', 'Cluster management', { bidirectional: true }),
                connection('eks-b', 'eks', 'workers-b', 'administration', 'Cluster management', { bidirectional: true }),
                connection('a-rds', 'workers-a', 'rds', 'network', 'Database traffic', { protocol: 'TCP/5432' }),
                connection('b-rds', 'workers-b', 'rds', 'network', 'Database traffic', { protocol: 'TCP/5432' }),
                connection('eks-monitor', 'eks', 'cloudwatch', 'administration', 'Metrics and logs')
            ]);
        } },
        { id: 'aws-hybrid', name: 'AWS Hybrid Connectivity', description: 'On-premises edge, Site-to-Site VPN, Transit Gateway and AWS VPC.', icon: 'bi-bezier2', create: function (core) {
            const assets = [
                asset('onprem', 'domain', 'On-Premises Datacenter', 80, 180, { container: true, width: 650, height: 720, category: 'On-Premises', views: allViews, properties: { provider: 'on-premises', role: 'Corporate datacenter' } }),
                asset('edge-fw', 'firewall', 'Edge Firewall', 300, 360, { parent: 'onprem', views: allViews, properties: { vendor: 'Palo Alto Networks', interfaces: 'outside, inside, vpn', security_zones: 'untrust, trust, vpn', policies: 'Hybrid application access', management_ip: '10.10.0.10', monitoring: true, redundant: true, critical: true } }),
                asset('core-router', 'router', 'Core Router', 300, 600, { parent: 'onprem', views: allViews, properties: { vendor: 'Cisco', model: 'Catalyst 8500', interfaces: 'WAN, core', management_ip: '10.10.0.1', monitoring: true, redundant: true } }),
                asset('aws-cloud', 'domain', 'AWS Cloud', 850, 90, { container: true, width: 1320, height: 970, category: 'Cloud', views: allViews, properties: { role: 'AWS account boundary' } }),
                asset('vpn', 'router', 'AWS Site-to-Site VPN', 930, 340, { catalogId: 'aws-site-to-site-vpn', parent: 'aws-cloud', properties: { role: 'IPSec hybrid tunnel', monitoring: true, redundant: true, critical: true } }),
                asset('tgw', 'router', 'AWS Transit Gateway', 1220, 340, { catalogId: 'aws-transit-gateway', parent: 'aws-cloud', properties: { role: 'Hybrid routing hub', monitoring: true, critical: true } }),
                asset('vpc', 'vpc', 'Workload VPC', 1510, 220, { catalogId: 'aws-vpc', container: true, parent: 'aws-cloud', width: 560, height: 690, category: 'Network', properties: { address: '10.20.0.0/16', dns_hostnames: true, dns_resolution: true } }),
                asset('ec2', 'server', 'Hybrid Application', 1710, 470, { catalogId: 'aws-ec2', parent: 'vpc', views: allViews, properties: { instance_type: 'm7i.large', operating_system: 'RHEL 9', private_ip: '10.20.10.20', monitoring: true, backup: true, critical: true } }),
                asset('rds', 'database', 'Amazon RDS', 1710, 690, { catalogId: 'aws-rds', parent: 'vpc', properties: { backup: true, monitoring: true, critical: true } })
            ];
            return build(core, 'aws-hybrid', 'AWS Hybrid Connectivity', assets, [
                connection('fw-vpn', 'edge-fw', 'vpn', 'vpn', 'IPSec tunnels', { bidirectional: true, protocol: 'IPSec', bandwidth: '1 Gbps' }),
                connection('vpn-tgw', 'vpn', 'tgw', 'network', 'Transit attachment', { bidirectional: true }),
                connection('tgw-vpc', 'tgw', 'vpc', 'peering', 'VPC attachment', { bidirectional: true }),
                connection('vpc-app', 'vpc', 'ec2', 'network', 'Private application traffic'),
                connection('app-db', 'ec2', 'rds', 'network', 'Database traffic', { protocol: 'TCP/5432' })
            ]);
        } },
        { id: 'aws-secure-web', name: 'AWS Secure Web Application', description: 'Route 53, CloudFront, WAF, ALB, private workloads and database.', icon: 'bi-shield-check', create: function (core) {
            const assets = awsBoundaryAssets('Secure Web VPC');
            assets.push(
                asset('route53', 'router', 'Amazon Route 53', 160, 250, { catalogId: 'aws-route-53', properties: { monitoring: true } }),
                asset('cloudfront', 'internet', 'Amazon CloudFront', 160, 470, { catalogId: 'aws-cloudfront', properties: { monitoring: true } }),
                asset('waf', 'firewall', 'AWS WAF', 400, 250, { catalogId: 'aws-waf', parent: 'vpc', properties: { vendor: 'AWS', policies: 'Managed common, reputation and rate-limit rules', security_zones: 'internet, web', monitoring: true, critical: true } }),
                asset('alb', 'router', 'Application Load Balancer', 760, 420, { catalogId: 'aws-application-load-balancer', parent: 'az-a', properties: { monitoring: true, critical: true } }),
                asset('ec2-a', 'server', 'Web Application A', 760, 650, { catalogId: 'aws-ec2', parent: 'az-a', views: allViews, properties: { instance_type: 'm7i.large', operating_system: 'Amazon Linux 2023', private_ip: '10.0.11.20', monitoring: true, backup: true, critical: true, zone: 'ap-southeast-1a' } }),
                asset('ec2-b', 'server', 'Web Application B', 1450, 650, { catalogId: 'aws-ec2', parent: 'az-b', views: allViews, properties: { instance_type: 'm7i.large', operating_system: 'Amazon Linux 2023', private_ip: '10.0.12.20', monitoring: true, backup: true, critical: true, zone: 'ap-southeast-1b' } }),
                asset('rds', 'database', 'RDS Multi-AZ', 1100, 850, { catalogId: 'aws-rds', parent: 'vpc', properties: { backup: true, redundant: true, monitoring: true, critical: true, storage: '500 GB' } })
            );
            return build(core, 'aws-secure-web', 'AWS Secure Web Application', assets, [
                connection('dns-cdn', 'route53', 'cloudfront', 'network', 'Public DNS', { protocol: 'DNS' }),
                connection('cdn-waf', 'cloudfront', 'waf', 'trust', 'Filtered HTTPS', { protocol: 'HTTPS' }),
                connection('waf-alb', 'waf', 'alb', 'network', 'Approved ingress', { protocol: 'HTTPS' }),
                connection('alb-a', 'alb', 'ec2-a', 'network', 'Application traffic', { protocol: 'HTTPS' }),
                connection('alb-b', 'alb', 'ec2-b', 'network', 'Application traffic', { protocol: 'HTTPS' }),
                connection('a-db', 'ec2-a', 'rds', 'network', 'Database traffic', { protocol: 'TCP/5432' }),
                connection('b-db', 'ec2-b', 'rds', 'network', 'Database traffic', { protocol: 'TCP/5432' })
            ]);
        } },
        { id: 'aws-disaster-recovery', name: 'AWS Disaster Recovery', description: 'Primary and recovery regions with replicated application and database tiers.', icon: 'bi-arrow-repeat', create: function (core) {
            const assets = [
                asset('primary-region', 'domain', 'Primary Region · Singapore', 100, 130, { container: true, width: 900, height: 850, category: 'AWS Region', views: allViews, properties: { region: 'ap-southeast-1', critical: true } }),
                asset('primary-vpc', 'vpc', 'Primary VPC', 180, 240, { catalogId: 'aws-vpc', container: true, parent: 'primary-region', width: 740, height: 620, category: 'Network', properties: { region: 'ap-southeast-1', address: '10.0.0.0/16', dns_hostnames: true, dns_resolution: true } }),
                asset('primary-app', 'server', 'Primary Application', 320, 420, { catalogId: 'aws-ec2', parent: 'primary-vpc', views: allViews, properties: { instance_type: 'm7i.large', operating_system: 'Amazon Linux 2023', private_ip: '10.0.10.20', zone: 'ap-southeast-1a', monitoring: true, backup: true, critical: true } }),
                asset('primary-db', 'database', 'Primary RDS', 650, 620, { catalogId: 'aws-rds', parent: 'primary-vpc', properties: { region: 'ap-southeast-1', backup: true, monitoring: true, critical: true, storage: '1 TB' } }),
                asset('recovery-region', 'domain', 'Recovery Region · Sydney', 1200, 130, { container: true, width: 900, height: 850, category: 'AWS Region', views: allViews, properties: { region: 'ap-southeast-2', critical: true } }),
                asset('recovery-vpc', 'vpc', 'Recovery VPC', 1280, 240, { catalogId: 'aws-vpc', container: true, parent: 'recovery-region', width: 740, height: 620, category: 'Network', properties: { region: 'ap-southeast-2', address: '10.100.0.0/16', dns_hostnames: true, dns_resolution: true } }),
                asset('recovery-app', 'server', 'Recovery Application', 1420, 420, { catalogId: 'aws-ec2', parent: 'recovery-vpc', views: allViews, properties: { instance_type: 'm7i.large', operating_system: 'Amazon Linux 2023', private_ip: '10.100.10.20', zone: 'ap-southeast-2a', monitoring: true, backup: true, critical: true } }),
                asset('recovery-db', 'database', 'Recovery RDS', 1750, 620, { catalogId: 'aws-rds', parent: 'recovery-vpc', properties: { region: 'ap-southeast-2', backup: true, monitoring: true, critical: true, storage: '1 TB' } }),
                asset('route53', 'router', 'Amazon Route 53', 1020, 80, { catalogId: 'aws-route-53', properties: { role: 'Health-based failover routing', monitoring: true } })
            ];
            return build(core, 'aws-disaster-recovery', 'AWS Disaster Recovery', assets, [
                connection('dns-primary', 'route53', 'primary-app', 'network', 'Primary route', { protocol: 'DNS/HTTPS' }),
                connection('dns-recovery', 'route53', 'recovery-app', 'network', 'Failover route', { protocol: 'DNS/HTTPS' }),
                connection('vpc-peer', 'primary-vpc', 'recovery-vpc', 'peering', 'Inter-region connectivity', { bidirectional: true, bandwidth: 'Defined by workload' }),
                connection('app-replication', 'primary-app', 'recovery-app', 'replication', 'Application deployment', { direction: 'source-to-target' }),
                connection('db-replication', 'primary-db', 'recovery-db', 'replication', 'Cross-region database replication', { direction: 'source-to-target' })
            ]);
        } }
    ];

    return {
        listTemplates: function () {
            return templates.map(function (template) {
                return { id: template.id, name: template.name, description: template.description, icon: template.icon };
            });
        },
        createProject: function (core, templateId) {
            const template = templates.find(function (candidate) { return candidate.id === templateId; });
            return template ? template.create(core) : null;
        }
    };
}());

if (typeof globalThis !== 'undefined') globalThis.InfraStackStudioAwsTemplates = InfraStackStudioAwsTemplates;
if (typeof globalThis !== 'undefined' && globalThis.InfraStackStudioProviderRegistry) {
    globalThis.InfraStackStudioProviderRegistry.register('aws', InfraStackStudioAwsTemplates);
}
if (typeof module !== 'undefined' && module.exports) module.exports = InfraStackStudioAwsTemplates;
