// registry.js
const InfraStackStudioProviderRegistry = (function () {
    const providers = new Map();

    return {
        register: function (provider, adapter) {
            if (typeof provider !== 'string' || !provider || !adapter) return;
            providers.set(provider, adapter);
        },
        templates: function (provider) {
            const adapter = providers.get(provider);
            return adapter && typeof adapter.listTemplates === 'function' ? adapter.listTemplates() : [];
        },
        createProject: function (provider, core, templateId) {
            const adapter = providers.get(provider);
            return adapter && typeof adapter.createProject === 'function'
                ? adapter.createProject(core, templateId)
                : null;
        },
        providerIds: function () {
            return Array.from(providers.keys());
        }
    };
}());

if (typeof globalThis !== 'undefined') globalThis.InfraStackStudioProviderRegistry = InfraStackStudioProviderRegistry;
if (typeof module !== 'undefined' && module.exports) module.exports = InfraStackStudioProviderRegistry;
