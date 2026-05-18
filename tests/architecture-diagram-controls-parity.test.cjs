const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');

const architectureTools = [
    {
        name: 'AWS',
        directory: 'templates/content/tools/aws/architecture-vpc-aws',
        prefix: 'architecture-vpc-aws'
    },
    {
        name: 'Azure',
        directory: 'templates/content/tools/azure/architecture-vnet-azure',
        prefix: 'architecture-vnet-azure'
    },
    {
        name: 'GCP',
        directory: 'templates/content/tools/gcp/architecture-vpc-gcp',
        prefix: 'architecture-vpc-gcp'
    },
    {
        name: 'Cisco',
        directory: 'templates/content/tools/cisco/architecture-campus-network-cisco',
        prefix: 'architecture-campus-network-cisco'
    },
    {
        name: 'IBM',
        directory: 'templates/content/tools/ibm/architecture-cloud-ibm',
        prefix: 'architecture-cloud-ibm'
    },
    {
        name: 'Huawei',
        directory: 'templates/content/tools/huawei/architecture-vpc-huawei',
        prefix: 'architecture-vpc-huawei'
    },
    {
        name: 'TM Cloud',
        directory: 'templates/content/tools/tmcloud/architecture-cloud-tmcloud',
        prefix: 'architecture-cloud-tmcloud'
    }
];

const controlRefreshTools = [
    {
        name: 'AWS',
        directory: 'templates/content/tools/aws/architecture-vpc-aws',
        expectedControls: [
            'regionInput',
            'cidrInput',
            'azCountInput',
            'natModeInput',
            'appTierInput',
            'databaseInput',
            'route53Input',
            'cloudFrontInput',
            'wafInput',
            'albInput',
            'bastionInput',
            'endpointsInput',
            'flowLogsInput',
            'cloudWatchInput',
            'siteToSiteVpnInput',
            'transitGatewayInput',
            'cacheInput'
        ],
        refreshPattern: /renderFromControls/
    },
    {
        name: 'Azure',
        directory: 'templates/content/tools/azure/architecture-vnet-azure',
        expectedControls: [
            'regionInput',
            'cidrInput',
            'azCountInput',
            'natModeInput',
            'appTierInput',
            'databaseInput',
            'route53Input',
            'cloudFrontInput',
            'wafInput',
            'albInput',
            'bastionInput',
            'endpointsInput',
            'flowLogsInput',
            'cloudWatchInput',
            'siteToSiteVpnInput',
            'transitGatewayInput',
            'cacheInput'
        ],
        refreshPattern: /renderFromControls/
    },
    {
        name: 'GCP',
        directory: 'templates/content/tools/gcp/architecture-vpc-gcp',
        expectedControls: [
            'regionInput',
            'cidrInput',
            'azCountInput',
            'natModeInput',
            'appTierInput',
            'databaseInput',
            'route53Input',
            'cloudFrontInput',
            'wafInput',
            'albInput',
            'bastionInput',
            'endpointsInput',
            'flowLogsInput',
            'cloudWatchInput',
            'siteToSiteVpnInput',
            'transitGatewayInput',
            'cacheInput'
        ],
        refreshPattern: /renderFromControls/
    },
    {
        name: 'Cisco',
        directory: 'templates/content/tools/cisco/architecture-campus-network-cisco',
        expectedControls: [
            'architectureCampusNetworkCiscoSize',
            'architectureCampusNetworkCiscoAccessBlocks',
            'architectureCampusNetworkCiscoRouting',
            'architectureCampusNetworkCiscoVlans',
            'architectureCampusNetworkCiscoWireless',
            'architectureCampusNetworkCiscoFirewall',
            'architectureCampusNetworkCiscoWan',
            'architectureCampusNetworkCiscoMonitoring',
            'architectureCampusNetworkCiscoDhcpDns',
            'architectureCampusNetworkCiscoHsrp',
            'architectureCampusNetworkCiscoEtherChannel',
            'architectureCampusNetworkCiscoAcl',
            'architectureCampusNetworkCiscoNat',
            'architectureCampusNetworkCiscoVpn',
            'architectureCampusNetworkCiscoTrunkVlans',
            'architectureCampusNetworkCiscoNativeVlan',
            'architectureCampusNetworkCiscoAccessVlan',
            'architectureCampusNetworkCiscoSviGateway',
            'architectureCampusNetworkCiscoOspfArea',
            'architectureCampusNetworkCiscoBgpAsn',
            'architectureCampusNetworkCiscoRedundancyVip'
        ],
        refreshPattern: /controlsAuthoritative/
    },
    {
        name: 'IBM',
        directory: 'templates/content/tools/ibm/architecture-cloud-ibm',
        expectedControls: [
            'architectureCloudIbmSize',
            'architectureCloudIbmAccessBlocks',
            'architectureCloudIbmRouting',
            'architectureCloudIbmVlans',
            'architectureCloudIbmWireless',
            'architectureCloudIbmFirewall',
            'architectureCloudIbmWan',
            'architectureCloudIbmMonitoring',
            'architectureCloudIbmDhcpDns',
            'architectureCloudIbmHsrp',
            'architectureCloudIbmEtherChannel',
            'architectureCloudIbmAcl',
            'architectureCloudIbmNat',
            'architectureCloudIbmVpn',
            'architectureCloudIbmTrunkVlans',
            'architectureCloudIbmNativeVlan',
            'architectureCloudIbmAccessVlan',
            'architectureCloudIbmSviGateway',
            'architectureCloudIbmOspfArea',
            'architectureCloudIbmBgpAsn',
            'architectureCloudIbmRedundancyVip'
        ],
        refreshPattern: /controlsAuthoritative/
    },
    {
        name: 'Huawei',
        directory: 'templates/content/tools/huawei/architecture-vpc-huawei',
        expectedControls: [
            'architectureVpcHuaweiSize',
            'architectureVpcHuaweiAccessBlocks',
            'architectureVpcHuaweiRouting',
            'architectureVpcHuaweiVlans',
            'architectureVpcHuaweiWireless',
            'architectureVpcHuaweiFirewall',
            'architectureVpcHuaweiWan',
            'architectureVpcHuaweiMonitoring',
            'architectureVpcHuaweiDhcpDns',
            'architectureVpcHuaweiHsrp',
            'architectureVpcHuaweiEtherChannel',
            'architectureVpcHuaweiAcl',
            'architectureVpcHuaweiNat',
            'architectureVpcHuaweiVpn',
            'architectureVpcHuaweiTrunkVlans',
            'architectureVpcHuaweiNativeVlan',
            'architectureVpcHuaweiAccessVlan',
            'architectureVpcHuaweiSviGateway',
            'architectureVpcHuaweiOspfArea',
            'architectureVpcHuaweiBgpAsn',
            'architectureVpcHuaweiRedundancyVip'
        ],
        refreshPattern: /controlsAuthoritative/
    },
    {
        name: 'TM Cloud',
        directory: 'templates/content/tools/tmcloud/architecture-cloud-tmcloud',
        expectedControls: [
            'architectureCloudTmcloudSize',
            'architectureCloudTmcloudAccessBlocks',
            'architectureCloudTmcloudRouting',
            'architectureCloudTmcloudVlans',
            'architectureCloudTmcloudWireless',
            'architectureCloudTmcloudFirewall',
            'architectureCloudTmcloudWan',
            'architectureCloudTmcloudMonitoring',
            'architectureCloudTmcloudDhcpDns',
            'architectureCloudTmcloudHsrp',
            'architectureCloudTmcloudEtherChannel',
            'architectureCloudTmcloudAcl',
            'architectureCloudTmcloudNat',
            'architectureCloudTmcloudVpn',
            'architectureCloudTmcloudTrunkVlans',
            'architectureCloudTmcloudNativeVlan',
            'architectureCloudTmcloudAccessVlan',
            'architectureCloudTmcloudSviGateway',
            'architectureCloudTmcloudOspfArea',
            'architectureCloudTmcloudBgpAsn',
            'architectureCloudTmcloudRedundancyVip'
        ],
        refreshPattern: /controlsAuthoritative/
    }
];

function readToolFile(tool, filename) {
    return fs.readFileSync(path.join(projectRoot, tool.directory, filename), 'utf8');
}

test('architecture tools share the AWS Diagram Controls help surface', function () {
    architectureTools.forEach(function (tool) {
        const html = readToolFile(tool, 'tool.html.twig');
        const css = readToolFile(tool, 'custom.css');
        const js = readToolFile(tool, 'custom.js');
        const usageRowMatches = html.match(new RegExp(`${tool.prefix}-usage-row`, 'g')) || [];

        assert.match(html, /Diagram Controls/, `${tool.name} missing Diagram Controls title`);
        assert.match(html, /usage-copy/, `${tool.name} missing usage copy`);
        assert.match(html, /usage-panel/, `${tool.name} missing usage panel`);
        assert.match(html, /usage-divider/, `${tool.name} missing usage divider`);
        assert.match(html, /usage-keys/, `${tool.name} missing usage key grouping`);
        assert.match(html, /<kbd>Mouse<\/kbd>/, `${tool.name} missing mouse drag row`);
        assert.match(html, /undo stage edit/, `${tool.name} missing undo row`);
        assert.match(html, /zoom stage by 1%/, `${tool.name} missing zoom row`);
        assert.equal(usageRowMatches.length, 6, `${tool.name} should have six Diagram Controls rows`);

        assert.match(css, new RegExp(`${tool.prefix}-usage-overlay`), `${tool.name} missing usage overlay CSS`);
        assert.match(css, new RegExp(`${tool.prefix}-usage-card`), `${tool.name} missing usage card CSS`);
        assert.match(css, /usage-card::after/, `${tool.name} missing usage pointer CSS`);
        assert.match(css, new RegExp(`${tool.prefix}-usage-copy`), `${tool.name} missing usage copy CSS`);
        assert.match(css, new RegExp(`${tool.prefix}-usage-panel`), `${tool.name} missing usage panel CSS`);
        assert.match(css, new RegExp(`${tool.prefix}-usage-divider`), `${tool.name} missing usage divider CSS`);
        assert.match(css, new RegExp(`${tool.prefix}-usage-keys kbd`), `${tool.name} missing keycap CSS`);

        assert.match(js, /getUsageHelpFocusableElements/, `${tool.name} missing focusable usage helper`);
        assert.match(js, /handleUsageHelpKeydown/, `${tool.name} missing usage keydown handler`);
        assert.match(js, /addEventListener\('keydown', handleUsageHelpKeydown\)/, `${tool.name} missing usage keydown binding`);
    });
});

test('architecture custom controls refresh generated diagrams', function () {
    controlRefreshTools.forEach(function (tool) {
        const js = readToolFile(tool, 'custom.js');

        assert.match(js, /addEventListener\('change'/, `${tool.name} missing custom control change listeners`);
        assert.match(js, tool.refreshPattern, `${tool.name} missing generated diagram refresh path`);

        tool.expectedControls.forEach(function (control) {
            assert.match(js, new RegExp(control), `${tool.name} missing refresh binding for ${control}`);
        });
    });
});
