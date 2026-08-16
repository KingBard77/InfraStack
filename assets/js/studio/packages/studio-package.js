// studio-package.js
const InfraStackStudioPackageLoader = (function () {
    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function assertPackage(entry, manifest, templateData, result, content) {
        if (!manifest || manifest.id !== entry.id || manifest.provider !== entry.provider || manifest.family !== entry.family) {
            throw new Error(`Invalid Studio package manifest: ${entry.id}`);
        }
        if (!templateData || templateData.package_id !== entry.id || !Array.isArray(templateData.templates)) {
            throw new Error(`Invalid Studio templates: ${entry.id}`);
        }
        if (!result || result.package_id !== entry.id || !Array.isArray(result.rules)) {
            throw new Error(`Invalid Studio result: ${entry.id}`);
        }
        if (!content || content.package_id !== entry.id) {
            throw new Error(`Invalid Studio content: ${entry.id}`);
        }
    }

    async function fetchJson(url) {
        const response = await fetch(url, {
            credentials: 'same-origin',
            headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error(`Studio package request failed: ${response.status}`);
        return response.json();
    }

    /**
     * Creates a lazy loader for file-based Studio packages.
     *
     * @param {object} registry Decorated package registry supplied by Symfony.
     * @param {object} providerRegistry Shared Studio provider registry.
     * @returns {{loadProvider: function(string): Promise<boolean>, packageIds: function(): string[]}}
     */
    function create(registry, providerRegistry) {
        const entries = Array.isArray(registry?.packages) ? registry.packages : [];
        const entryLoads = new Map();
        const providerLoads = new Map();

        async function loadEntry(entry) {
            const [manifest, templateData, result, content] = await Promise.all([
                fetchJson(entry.manifest_url),
                fetchJson(entry.templates_url),
                fetchJson(entry.result_url),
                fetchJson(entry.content_url)
            ]);
            assertPackage(entry, manifest, templateData, result, content);
            return { manifest, templates: templateData.templates, result, content };
        }

        async function registerProvider(provider, matches) {
            const loadedPackages = await Promise.all(matches.map(function (entry) {
                if (!entryLoads.has(entry.id)) entryLoads.set(entry.id, loadEntry(entry));
                return entryLoads.get(entry.id);
            }));
            const templates = new Map();
            loadedPackages.forEach(function (loadedPackage) {
                loadedPackage.templates.forEach(function (template) {
                    if (templates.has(template.id)) {
                        throw new Error(`Duplicate Studio template identifier: ${template.id}`);
                    }
                    templates.set(template.id, template);
                });
            });
            providerRegistry.register(provider, {
                packages: loadedPackages.map(function (loadedPackage) { return loadedPackage.manifest; }),
                results: loadedPackages.map(function (loadedPackage) { return loadedPackage.result; }),
                content: loadedPackages.map(function (loadedPackage) {
                    return { package: loadedPackage.manifest, ...loadedPackage.content };
                }),
                listTemplates: function () {
                    return Array.from(templates.values()).map(function (template) {
                        return {
                            id: template.id,
                            name: template.name,
                            description: template.description,
                            icon: template.icon
                        };
                    });
                },
                createProject: function (core, templateId) {
                    const template = templates.get(templateId);
                    if (!template) return null;
                    const result = core.normalizeProject(clone(template.project));
                    return result.ok ? result.project : null;
                }
            });
        }

        /**
         * Loads and registers packages for one provider only when requested.
         *
         * @param {string} provider Provider identifier such as aws or gcp.
         * @returns {Promise<boolean>} Whether at least one package was available.
         */
        async function loadProvider(provider) {
            const matches = entries.filter(function (entry) { return entry.provider === provider; });
            if (!matches.length) return false;
            if (!providerLoads.has(provider)) {
                providerLoads.set(provider, registerProvider(provider, matches));
            }
            await providerLoads.get(provider);
            return true;
        }

        return {
            loadProvider,
            packageIds: function () { return entries.map(function (entry) { return entry.id; }); }
        };
    }

    return { create };
}());

export default InfraStackStudioPackageLoader;
