const GenerateCrontabShellModelCore = (function () {
    const toolId = 'generate-crontab-shell';
    const toolVersion = '1.0.0';
    const exportFormats = ['expression', 'line', 'pdf', 'csv', 'json'];
    const macros = ['none', '@reboot', '@hourly', '@daily', '@midnight', '@weekly', '@monthly', '@yearly', '@annually'];
    const fieldOrder = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'];
    const fieldDefaults = {
        minute: '0',
        hour: '0',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*'
    };

    function normalizeText(value, fallback) {
        const text = String(value || '').trim();

        return text || fallback;
    }

    function normalizeFieldToken(value, fallback) {
        const token = normalizeText(value, fallback);

        return /\s/.test(token) ? fallback : token.toUpperCase();
    }

    /**
     * Returns the stable tool identifier used by package validation and exported payloads.
     *
     * @returns {string} Stable InfraStack tool identifier.
     */
    function getToolId() {
        return toolId;
    }

    /**
     * Returns the current model contract version for the crontab generator.
     *
     * @returns {string} Semantic model contract version.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes a candidate cron macro to a supported shorthand token.
     *
     * @param {unknown} value Cron macro candidate.
     * @returns {string} Supported cron macro or `none`.
     */
    function normalizeMacro(value) {
        const macro = String(value || 'none').trim().toLowerCase();

        return macros.includes(macro) ? macro : 'none';
    }

    /**
     * Builds a normalized five-field cron expression.
     *
     * @param {Record<string, unknown>} fields Raw field token values.
     * @returns {string} Normalized cron expression.
     */
    function buildExpression(fields) {
        const source = fields && typeof fields === 'object' ? fields : {};

        return fieldOrder
            .map(function (field) {
                return normalizeFieldToken(source[field], fieldDefaults[field]);
            })
            .join(' ');
    }

    /**
     * Builds a normalized crontab command state snapshot from raw form-like input.
     *
     * @param {Record<string, unknown>} input Raw schedule input.
     * @returns {Record<string, unknown>} Normalized crontab command state.
     */
    function normalizeCommandState(input) {
        const source = input && typeof input === 'object' ? input : {};
        const macro = normalizeMacro(source.macro);
        const fields = {
            minute: normalizeFieldToken(source.minute, fieldDefaults.minute),
            hour: normalizeFieldToken(source.hour, fieldDefaults.hour),
            dayOfMonth: normalizeFieldToken(source.dayOfMonth || source.day_of_month, fieldDefaults.dayOfMonth),
            month: normalizeFieldToken(source.month, fieldDefaults.month),
            dayOfWeek: normalizeFieldToken(source.dayOfWeek || source.day_of_week, fieldDefaults.dayOfWeek)
        };
        const expression = macro === 'none' ? buildExpression(fields) : macro;

        return {
            macro,
            fields,
            expression,
            command: normalizeText(source.command, '/usr/bin/rotate-logs --quiet'),
            user: normalizeText(source.user, ''),
            metadata: {
                mailto: normalizeText(source.mailto, ''),
                shell: normalizeText(source.shell, ''),
                path: normalizeText(source.path, ''),
                timezone: normalizeText(source.timezone, ''),
                comment: normalizeText(source.comment, '')
            }
        };
    }

    /**
     * Returns the export formats implemented by the crontab command workspace.
     *
     * @returns {string[]} Implemented export format identifiers.
     */
    function getExportFormats() {
        return exportFormats.slice();
    }

    return {
        getToolId,
        getToolVersion,
        normalizeMacro,
        buildExpression,
        normalizeCommandState,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenerateCrontabShellModelCore;
}
