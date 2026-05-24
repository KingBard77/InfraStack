// model-core.js
(function attachScanningVisualContractCore(global) {
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
     * Normalizes a scan metric.
     *
     * @param {{id?: string, label?: string, value?: *, copy?: string, tone?: string}} metric Raw metric.
     * @param {number} index Metric index.
     * @returns {{id: string, label: string, value: string, copy: string, tone: string}} Normalized metric.
     */
    function normalizeMetric(metric, index) {
        const source = metric && typeof metric === 'object' ? metric : {};
        const tone = VALID_TONES.has(source.tone) ? source.tone : 'success';

        return {
            id: String(source.id || `metric-${index + 1}`),
            label: String(source.label || `Metric ${index + 1}`),
            value: String(source.value ?? '0'),
            copy: String(source.copy || ''),
            tone
        };
    }

    /**
     * Normalizes scan evidence card state.
     *
     * @param {{id?: string, label?: string, value?: *, copy?: string, icon?: string, tone?: string}} evidence Raw evidence.
     * @param {number} index Evidence index.
     * @returns {{id: string, label: string, value: string, copy: string, icon: string, tone: string}} Normalized evidence.
     */
    function normalizeEvidence(evidence, index) {
        const source = evidence && typeof evidence === 'object' ? evidence : {};
        const tone = VALID_TONES.has(source.tone) ? source.tone : 'success';

        return {
            id: String(source.id || `evidence-${index + 1}`),
            label: String(source.label || `Evidence ${index + 1}`),
            value: String(source.value ?? '0'),
            copy: String(source.copy || ''),
            icon: String(source.icon || 'bi-shield-check'),
            tone
        };
    }

    /**
     * Normalizes finding summary state.
     *
     * @param {{id?: string, label?: string, value?: string, count?: *, severity?: string}} finding Raw finding.
     * @param {number} index Finding index.
     * @returns {{id: string, label: string, value: string, count: number, severity: string, tone: string}} Normalized finding.
     */
    function normalizeFinding(finding, index) {
        const source = finding && typeof finding === 'object' ? finding : {};
        const severity = String(source.severity || 'info').toLowerCase();
        const tone = severity === 'critical' || severity === 'high'
            ? 'danger'
            : severity === 'medium'
                ? 'warning'
                : 'success';

        return {
            id: String(source.id || `finding-${index + 1}`),
            label: String(source.label || `Finding ${index + 1}`),
            value: String(source.value || severity),
            count: Math.max(0, toFiniteNumber(source.count, 0)),
            severity,
            tone
        };
    }

    /**
     * Normalizes scanning visual contract state.
     *
     * @param {{target?: string, score?: *, status?: string, tone?: string, metrics?: Array, evidence?: Array, findings?: Array}} contract Raw contract.
     * @returns {{target: string, score: number, status: string, tone: string, metrics: Array, evidence: Array, findings: Array}} Normalized contract.
     */
    function normalizeVisualContract(contract) {
        const source = contract && typeof contract === 'object' ? contract : {};
        const score = Math.max(0, Math.min(100, toFiniteNumber(source.score, 0)));
        const tone = VALID_TONES.has(source.tone)
            ? source.tone
            : score >= 80
                ? 'success'
                : score >= 50
                    ? 'warning'
                    : 'danger';

        return {
            target: String(source.target || ''),
            score,
            status: String(source.status || (tone === 'success' ? 'Ready' : tone === 'warning' ? 'Review' : 'Needs work')),
            tone,
            metrics: Array.isArray(source.metrics) ? source.metrics.map(normalizeMetric) : [],
            evidence: Array.isArray(source.evidence) ? source.evidence.map(normalizeEvidence) : [],
            findings: Array.isArray(source.findings) ? source.findings.map(normalizeFinding) : []
        };
    }

    /**
     * Summarizes normalized scan visual contract state.
     *
     * @param {{score?: number, tone?: string, metrics?: Array, evidence?: Array, findings?: Array}} contract Normalized contract.
     * @returns {{score: number, tone: string, metricCount: number, evidenceCount: number, findingCount: number, highFindingCount: number}} Summary.
     */
    function summarizeVisualContract(contract) {
        const source = normalizeVisualContract(contract);
        const highFindingCount = source.findings
            .filter((finding) => finding.tone === 'danger')
            .reduce((total, finding) => total + finding.count, 0);

        return {
            score: source.score,
            tone: source.tone,
            metricCount: source.metrics.length,
            evidenceCount: source.evidence.length,
            findingCount: source.findings.reduce((total, finding) => total + finding.count, 0),
            highFindingCount
        };
    }

    const api = {
        normalizeEvidence,
        normalizeFinding,
        normalizeMetric,
        normalizeVisualContract,
        summarizeVisualContract
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
        return;
    }

    global.InfraStackScanningVisualContractCore = api;
}(typeof globalThis !== 'undefined' ? globalThis : window));
