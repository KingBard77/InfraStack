// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "03_advanced-settings",
        "title": "advanced settings",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
            [
                        248,
                        261
            ],
            [
                        937,
                        954
            ],
            [
                        1606,
                        1652
            ],
            [
                        6165,
                        6170
            ],
            [
                        6339,
                        6354
            ]
],
        "sourceDomIds": [
            "__DOM_PREFIX__NetworkConfigTab",
            "__DOM_PREFIX__WorkloadConfigTab",
            "__DOM_PREFIX__ServicesConfigTab",
            "__DOM_PREFIX__NetworkConfigPanel",
            "__DOM_PREFIX__WorkloadConfigPanel",
            "__DOM_PREFIX__ServicesConfigPanel",
            "__DOM_PREFIX__Cidr",
            "__DOM_PREFIX__NatMode",
            "__DOM_PREFIX__AppTier",
            "__DOM_PREFIX__Database",
            "__DOM_PREFIX__Route53",
            "__DOM_PREFIX__CloudFront",
            "__DOM_PREFIX__Waf",
            "__DOM_PREFIX__Alb",
            "__DOM_PREFIX__Bastion",
            "__DOM_PREFIX__Endpoints",
            "__DOM_PREFIX__FlowLogs",
            "__DOM_PREFIX__CloudWatch",
            "__DOM_PREFIX__SiteToSiteVpn",
            "__DOM_PREFIX__TransitGateway",
            "__DOM_PREFIX__Cache"
        ],
        "sourceClasses": [
            "__PREFIX__-custom-panel",
            "__PREFIX__-custom-panel-summary",
            "__PREFIX__-config-tabs",
            "__PREFIX__-config-tab",
            "__PREFIX__-config-panel",
            "__PREFIX__-config-grid",
            "__PREFIX__-toggle-grid",
            "__PREFIX__-toggle-item"
        ],
        "sourceVariables": [
            "cidrInput",
            "natModeInput",
            "appTierInput",
            "databaseInput",
            "route53Input",
            "cloudFrontInput",
            "wafInput",
            "albInput",
            "bastionInput",
            "endpointsInput",
            "flowLogsInput",
            "cloudWatchInput",
            "siteToSiteVpnInput",
            "transitGatewayInput",
            "cacheInput"
        ],
        "sourceFunctions": [
            "activateConfigTab",
            "bindTabKeyboardNavigation",
            "buildSpecFromControls",
            "renderFromControls"
        ],
        "sourceBehaviours": [
            "switches advanced tab panels accessibly",
            "reads advanced controls into normalized state",
            "re-renders the preview or generated diagram after control changes"
        ]
    };

    /**
     * Returns the extracted architecture advanced settings JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function customTabSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.customTabSourceSection = customTabSourceSection;
    registry.customTab = customTabSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
