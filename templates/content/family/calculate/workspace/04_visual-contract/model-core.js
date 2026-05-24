// model-core.js
(function attachCalculateVisualContractCore(global) {
    const VALID_TONES = new Set(['success', 'warning', 'danger']);

    /**
     * Converts a value to a finite number with a fallback.
     *
     * @param {*} value Candidate number.
     * @param {number} fallback Fallback value.
     * @returns {number} Finite number.
     */
    function toFiniteNumber(value, fallback) {
        const number = Number(value);
        return Number.isFinite(number) ? number : fallback;
    }

    /**
     * Normalizes a visual metric.
     *
     * @param {{id?: string, label?: string, value?: *, unit?: string, copy?: string, progress?: *}} metric Raw metric.
     * @param {number} index Metric index.
     * @returns {{id: string, label: string, value: string, unit: string, copy: string, progress: number}} Normalized metric.
     */
    function normalizeMetric(metric, index) {
        const source = metric && typeof metric === 'object' ? metric : {};

        return {
            id: String(source.id || `metric-${index + 1}`),
            label: String(source.label || `Metric ${index + 1}`),
            value: String(source.value ?? '0'),
            unit: String(source.unit || ''),
            copy: String(source.copy || ''),
            progress: Math.max(0, Math.min(360, toFiniteNumber(source.progress, 0)))
        };
    }

    /**
     * Normalizes a calculate component or driver.
     *
     * @param {{id?: string, label?: string, value?: *, monthly?: *, copy?: string, icon?: string, tone?: string}} component Raw component.
     * @param {number} index Component index.
     * @returns {{id: string, label: string, value: string, monthly: number, copy: string, icon: string, tone: string}} Normalized component.
     */
    function normalizeComponent(component, index) {
        const source = component && typeof component === 'object' ? component : {};
        const tone = VALID_TONES.has(source.tone) ? source.tone : 'success';

        return {
            id: String(source.id || `component-${index + 1}`),
            label: String(source.label || `Component ${index + 1}`),
            value: String(source.value ?? source.monthly ?? '0'),
            monthly: toFiniteNumber(source.monthly ?? source.value, 0),
            copy: String(source.copy || ''),
            icon: String(source.icon || 'bi-box'),
            tone
        };
    }

    /**
     * Normalizes a formula row.
     *
     * @param {{id?: string, label?: string, expression?: string, result?: *}} formula Raw formula row.
     * @param {number} index Formula index.
     * @returns {{id: string, label: string, expression: string, result: string}} Normalized formula row.
     */
    function normalizeFormula(formula, index) {
        const source = formula && typeof formula === 'object' ? formula : {};

        return {
            id: String(source.id || `formula-${index + 1}`),
            label: String(source.label || `Formula ${index + 1}`),
            expression: String(source.expression || ''),
            result: String(source.result ?? '')
        };
    }

    /**
     * Normalizes a calculate visual contract.
     *
     * @param {{tone?: string, currency?: string, updatedLabel?: string, metrics?: Array, components?: Array, formulas?: Array}} input Raw contract state.
     * @returns {{tone: string, currency: string, updatedLabel: string, primaryMetric: Object, metrics: Array, components: Array, formulas: Array, totalComponentValue: number, formulaCount: number}} Normalized contract.
     */
    function normalizeVisualContract(input) {
        const source = input && typeof input === 'object' ? input : {};
        const metrics = Array.isArray(source.metrics) ? source.metrics.map(normalizeMetric) : [];
        const components = Array.isArray(source.components) ? source.components.map(normalizeComponent) : [];
        const formulas = Array.isArray(source.formulas) ? source.formulas.map(normalizeFormula) : [];
        const tone = VALID_TONES.has(source.tone) ? source.tone : 'success';
        const primaryMetric = metrics[0] || normalizeMetric({ label: 'Primary metric', value: 0 }, 0);

        return {
            tone,
            currency: String(source.currency || 'USD'),
            updatedLabel: String(source.updatedLabel || 'Not generated'),
            primaryMetric,
            metrics,
            components,
            formulas,
            totalComponentValue: components.reduce((total, component) => total + component.monthly, 0),
            formulaCount: formulas.length
        };
    }

    /**
     * Summarizes a normalized calculate visual contract.
     *
     * @param {{primaryMetric?: Object, components?: Array, formulas?: Array, totalComponentValue?: number, tone?: string}} contract Normalized contract.
     * @returns {{primaryLabel: string, primaryValue: string, componentCount: number, formulaCount: number, totalComponentValue: number, tone: string}} Contract summary.
     */
    function summarizeVisualContract(contract) {
        const source = normalizeVisualContract(contract);

        return {
            primaryLabel: source.primaryMetric.label,
            primaryValue: source.primaryMetric.value,
            componentCount: source.components.length,
            formulaCount: source.formulaCount,
            totalComponentValue: source.totalComponentValue,
            tone: source.tone
        };
    }

    const api = {
        normalizeComponent,
        normalizeFormula,
        normalizeMetric,
        normalizeVisualContract,
        summarizeVisualContract
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
        return;
    }

    global.InfraStackCalculateVisualContractCore = api;
}(typeof globalThis !== 'undefined' ? globalThis : window));
