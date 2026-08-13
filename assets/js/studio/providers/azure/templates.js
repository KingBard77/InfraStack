// templates.js
const InfraStackStudioAzureTemplates = (function () {
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
            category: options.category || 'Azure',
            views: options.views || cloudViews,
            is_container: options.container === true,
            parent_id: options.parent || null,
            properties: { provider: 'azure', region: 'southeastasia', ...options.properties },
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

    function createThreeTierProject(core) {
        const project = core.createEmptyProject('Azure Production Web Application');
        project.profile = 'azure-three-tier';
        project.assets = [
            asset('users', 'application', 'Users', 420, 80, { width: 220, height: 76, iconSize: 28, properties: { role: 'External clients', monitoring: true } }),
            asset('dns', 'router', 'Azure DNS', 700, 80, { catalogId: 'azure-dns-zone', width: 220, height: 76, iconSize: 28, properties: { role: 'Public DNS hosting', monitoring: true } }),
            asset('front-door', 'internet', 'Azure Front Door', 980, 80, { catalogId: 'azure-front-door', width: 240, height: 76, iconSize: 28, properties: { role: 'Global edge and routing', monitoring: true, redundant: true, critical: true } }),
            asset('waf', 'firewall', 'WAF Policy', 730, 190, { catalogId: 'azure-waf-policy', width: 230, height: 76, iconSize: 28, properties: { role: 'Web traffic protection', vendor: 'Microsoft Azure', policies: 'Managed rules and application exclusions', monitoring: true, redundant: true, critical: true } }),
            asset('vnet', 'vpc', 'Production Virtual Network', 120, 310, { catalogId: 'azure-virtual-network', container: true, width: 1450, height: 900, category: 'Network', properties: { address: '10.20.0.0/16', role: 'Regional Azure network boundary', dns_hostnames: true, dns_resolution: true, tags: 'Environment=Production, Owner=Platform Team', critical: true } }),
            asset('ingress-subnet', 'subnet', 'Ingress Subnet', 200, 410, { catalogId: 'azure-subnet', parent: 'vnet', container: true, width: 360, height: 300, category: 'Network', properties: { address: '10.20.1.0/24', role: 'Application ingress', subnet_type: 'public', route_table: 'rt-ingress' } }),
            asset('app-subnet', 'subnet', 'Application Subnet', 610, 410, { catalogId: 'azure-subnet', parent: 'vnet', container: true, width: 420, height: 650, category: 'Network', properties: { address: '10.20.10.0/23', role: 'Private application tier', subnet_type: 'private', route_table: 'rt-application' } }),
            asset('data-subnet', 'subnet', 'Data Subnet', 1080, 410, { catalogId: 'azure-subnet', parent: 'vnet', container: true, width: 410, height: 650, category: 'Network', properties: { address: '10.20.20.0/24', role: 'Private data tier', subnet_type: 'isolated', route_table: 'rt-data' } }),
            asset('app-gateway', 'router', 'Application Gateway', 260, 510, { catalogId: 'azure-application-gateway', parent: 'ingress-subnet', width: 250, height: 76, iconSize: 28, properties: { role: 'Regional Layer 7 ingress', monitoring: true, redundant: true, critical: true } }),
            asset('nat', 'router', 'NAT Gateway', 260, 610, { catalogId: 'azure-nat-gateway', parent: 'ingress-subnet', width: 250, height: 76, iconSize: 28, properties: { role: 'Controlled outbound path', monitoring: true, redundant: true } }),
            asset('vmss-zone-1', 'cluster', 'VM Scale Set · Zone 1', 690, 530, { catalogId: 'azure-vm-scale-set', parent: 'app-subnet', width: 270, height: 82, iconSize: 30, views: allViews, properties: { role: 'Web and API workload', instance_type: 'Standard_D4s_v5', operating_system: 'Azure Linux', private_ip: '10.20.10.20', cpu: '4 vCPU', memory: '16 GB', storage: '64 GB managed disk', zone: '1', monitoring: true, backup: true, critical: true } }),
            asset('vmss-zone-2', 'cluster', 'VM Scale Set · Zone 2', 690, 680, { catalogId: 'azure-vm-scale-set', parent: 'app-subnet', width: 270, height: 82, iconSize: 30, views: allViews, properties: { role: 'Web and API workload', instance_type: 'Standard_D4s_v5', operating_system: 'Azure Linux', private_ip: '10.20.11.20', cpu: '4 vCPU', memory: '16 GB', storage: '64 GB managed disk', zone: '2', monitoring: true, backup: true, critical: true } }),
            asset('key-vault', 'storage', 'Azure Key Vault', 690, 830, { catalogId: 'azure-key-vault', parent: 'app-subnet', width: 270, height: 82, iconSize: 30, properties: { role: 'Application secrets and certificates', monitoring: true, backup: true, redundant: true, critical: true } }),
            asset('postgres-primary', 'database', 'PostgreSQL Primary', 1150, 520, { catalogId: 'azure-postgresql', parent: 'data-subnet', width: 270, height: 82, iconSize: 30, properties: { role: 'Zone-redundant writer', zone: '1', storage: '512 GB', monitoring: true, backup: true, critical: true } }),
            asset('postgres-standby', 'database', 'PostgreSQL Standby', 1150, 680, { catalogId: 'azure-postgresql', parent: 'data-subnet', width: 270, height: 82, iconSize: 30, properties: { role: 'High-availability standby', zone: '2', storage: '512 GB', monitoring: true, backup: true, critical: true } }),
            asset('redis', 'cache', 'Azure Managed Redis', 1150, 840, { catalogId: 'azure-cache-redis', parent: 'data-subnet', width: 270, height: 82, iconSize: 30, properties: { role: 'Distributed application cache', monitoring: true, backup: true, redundant: true } }),
            asset('private-endpoint', 'api', 'Private Endpoint', 760, 980, { catalogId: 'azure-private-endpoint', parent: 'app-subnet', width: 220, height: 70, iconSize: 26, properties: { role: 'Private data service access', monitoring: true } }),
            asset('monitor', 'monitoring', 'Azure Monitor', 1680, 480, { catalogId: 'azure-monitor', width: 250, height: 78, iconSize: 28, properties: { role: 'Metrics, logs, and alerts', monitoring: true } }),
            asset('network-watcher', 'monitoring', 'Network Watcher Flow Logs', 1680, 650, { catalogId: 'azure-network-watcher', width: 250, height: 78, iconSize: 28, properties: { role: 'Network diagnostics and traffic telemetry', monitoring: true } })
        ];
        project.connections = [
            connection('users-dns', 'users', 'dns', 'network', 'DNS lookup', { protocol: 'DNS' }),
            connection('dns-edge', 'dns', 'front-door', 'network', 'Global route', { protocol: 'DNS/HTTPS' }),
            connection('edge-waf', 'front-door', 'waf', 'trust', 'Filtered HTTPS', { protocol: 'HTTPS' }),
            connection('waf-gateway', 'waf', 'app-gateway', 'network', 'Protected ingress', { protocol: 'HTTPS' }),
            connection('gateway-app-1', 'app-gateway', 'vmss-zone-1', 'network', 'Application traffic', { protocol: 'HTTPS' }),
            connection('gateway-app-2', 'app-gateway', 'vmss-zone-2', 'network', 'Application traffic', { protocol: 'HTTPS' }),
            connection('app-database-1', 'vmss-zone-1', 'postgres-primary', 'network', 'Database traffic', { protocol: 'TCP/5432' }),
            connection('app-database-2', 'vmss-zone-2', 'postgres-standby', 'network', 'Database traffic', { protocol: 'TCP/5432' }),
            connection('postgres-ha', 'postgres-primary', 'postgres-standby', 'replication', 'Zone-redundant HA', { bidirectional: true }),
            connection('app-cache-1', 'vmss-zone-1', 'redis', 'network', 'Cache traffic', { protocol: 'TLS/6380' }),
            connection('app-cache-2', 'vmss-zone-2', 'redis', 'network', 'Cache traffic', { protocol: 'TLS/6380' }),
            connection('private-data', 'private-endpoint', 'postgres-primary', 'network', 'Private database access', { protocol: 'Private Link' }),
            connection('vnet-monitor', 'vnet', 'monitor', 'administration', 'Platform telemetry'),
            connection('vnet-flow', 'vnet', 'network-watcher', 'administration', 'Flow logs and diagnostics'),
            connection('nat-egress-1', 'nat', 'vmss-zone-1', 'administration', 'Outbound connectivity'),
            connection('nat-egress-2', 'nat', 'vmss-zone-2', 'administration', 'Outbound connectivity')
        ];
        const result = core.normalizeProject(project);

        if (!result.ok) throw new Error(result.error || 'Azure template could not be normalized.');
        return result.project;
    }

    const templates = [
        {
            id: 'azure-three-tier',
            name: 'Azure Production Web Application',
            description: 'Front Door, WAF, Application Gateway, private application and data tiers, zone-redundant PostgreSQL, and Azure operations services.',
            icon: 'bi-microsoft',
            create: createThreeTierProject
        }
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

if (typeof globalThis !== 'undefined') globalThis.InfraStackStudioAzureTemplates = InfraStackStudioAzureTemplates;
if (typeof globalThis !== 'undefined' && globalThis.InfraStackStudioProviderRegistry) {
    globalThis.InfraStackStudioProviderRegistry.register('azure', InfraStackStudioAzureTemplates);
}
if (typeof module !== 'undefined' && module.exports) module.exports = InfraStackStudioAzureTemplates;
