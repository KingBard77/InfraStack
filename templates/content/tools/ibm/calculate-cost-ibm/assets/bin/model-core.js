(function (root, factory) {
    const core = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = core;
        return;
    }

    root.CalculateCostIbmModelCore = core;
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    const TOOL_ID = 'calculate-cost-ibm';
    const VERSION = '1.0.0';
    const HOURS_PER_MONTH = 730;

    const computeProfiles = {
        'bx2-2x8': {
            label: 'bx2-2x8 - 2 vCPU - 8 GiB',
            hourly: 0.096,
            vcpu: 2,
            memoryGiB: 8
        },
        'bx2-4x16': {
            label: 'bx2-4x16 - 4 vCPU - 16 GiB',
            hourly: 0.192,
            vcpu: 4,
            memoryGiB: 16
        },
        'cx2-4x8': {
            label: 'cx2-4x8 - 4 vCPU - 8 GiB',
            hourly: 0.18,
            vcpu: 4,
            memoryGiB: 8
        },
        'mx2-4x32': {
            label: 'mx2-4x32 - 4 vCPU - 32 GiB',
            hourly: 0.30,
            vcpu: 4,
            memoryGiB: 32
        },
        'bx3d-4x20': {
            label: 'bx3d-4x20 - 4 vCPU - 20 GiB',
            hourly: 0.24,
            vcpu: 4,
            memoryGiB: 20
        }
    };

    const databaseTiers = {
        'cloudant-standard': {
            label: 'IBM Cloudant Standard starter',
            monthly: 75
        },
        'db2-entry': {
            label: 'Db2 on Cloud entry allowance',
            monthly: 180
        },
        'postgres-standard': {
            label: 'Databases for PostgreSQL starter',
            monthly: 240
        },
        'databases-ha': {
            label: 'Managed database HA allowance',
            monthly: 420
        }
    };

    const defaultRates = {
        storagePerGb: 0.022,
        storageOpsPerMillion: 0.45,
        serverlessPerMillionRequests: 0.20,
        serverlessPerGbSecond: 0.000018,
        egressPerGb: 0.09,
        edgeMonthly: 35
    };

    const presets = {
        'vpc-app': {
            label: 'VPC application',
            state: {
                label: 'IBM Cloud VPC application',
                preset: 'vpc-app',
                region: 'us-south',
                hoursPerMonth: HOURS_PER_MONTH,
                services: {
                    compute: {
                        include: true,
                        profile: 'bx2-2x8',
                        count: 2,
                        hours: HOURS_PER_MONTH,
                        hourlyOverride: 0
                    },
                    storage: {
                        include: true,
                        storageGb: 300,
                        transactionsMillion: 2,
                        storageRateOverride: 0,
                        opsRateOverride: 0
                    },
                    serverless: {
                        include: true,
                        requestsMillion: 1,
                        gbSeconds: 50000,
                        requestRateOverride: 0,
                        gbSecondRateOverride: 0
                    },
                    database: {
                        include: true,
                        tier: 'cloudant-standard',
                        instances: 1,
                        monthlyOverride: 0
                    },
                    network: {
                        include: true,
                        egressGb: 160,
                        edgeMonthly: 35,
                        egressRateOverride: 0
                    }
                },
                assumptions: {
                    commitmentDiscountPct: 0,
                    regionalUpliftPct: 0,
                    supportPct: 5,
                    contingencyPct: 10,
                    manualAdjustment: 0
                }
            }
        },
        'code-engine-api': {
            label: 'Code Engine API',
            state: {
                label: 'IBM Code Engine API',
                preset: 'code-engine-api',
                region: 'us-east',
                hoursPerMonth: HOURS_PER_MONTH,
                services: {
                    compute: {
                        include: false,
                        profile: 'bx2-2x8',
                        count: 0,
                        hours: HOURS_PER_MONTH,
                        hourlyOverride: 0
                    },
                    storage: {
                        include: true,
                        storageGb: 150,
                        transactionsMillion: 8,
                        storageRateOverride: 0,
                        opsRateOverride: 0
                    },
                    serverless: {
                        include: true,
                        requestsMillion: 16,
                        gbSeconds: 260000,
                        requestRateOverride: 0,
                        gbSecondRateOverride: 0
                    },
                    database: {
                        include: true,
                        tier: 'cloudant-standard',
                        instances: 1,
                        monthlyOverride: 0
                    },
                    network: {
                        include: true,
                        egressGb: 220,
                        edgeMonthly: 25,
                        egressRateOverride: 0
                    }
                },
                assumptions: {
                    commitmentDiscountPct: 0,
                    regionalUpliftPct: 0,
                    supportPct: 5,
                    contingencyPct: 12,
                    manualAdjustment: 0
                }
            }
        },
        'data-services': {
            label: 'Data services',
            state: {
                label: 'IBM Cloud data services',
                preset: 'data-services',
                region: 'eu-de',
                hoursPerMonth: HOURS_PER_MONTH,
                services: {
                    compute: {
                        include: true,
                        profile: 'mx2-4x32',
                        count: 3,
                        hours: HOURS_PER_MONTH,
                        hourlyOverride: 0
                    },
                    storage: {
                        include: true,
                        storageGb: 2500,
                        transactionsMillion: 14,
                        storageRateOverride: 0,
                        opsRateOverride: 0
                    },
                    serverless: {
                        include: true,
                        requestsMillion: 4,
                        gbSeconds: 120000,
                        requestRateOverride: 0,
                        gbSecondRateOverride: 0
                    },
                    database: {
                        include: true,
                        tier: 'databases-ha',
                        instances: 2,
                        monthlyOverride: 0
                    },
                    network: {
                        include: true,
                        egressGb: 520,
                        edgeMonthly: 55,
                        egressRateOverride: 0
                    }
                },
                assumptions: {
                    commitmentDiscountPct: 12,
                    regionalUpliftPct: 3,
                    supportPct: 8,
                    contingencyPct: 15,
                    manualAdjustment: 0
                }
            }
        },
        'blank': {
            label: 'Blank estimate',
            state: {
                label: 'IBM Cloud blank estimate',
                preset: 'blank',
                region: 'us-south',
                hoursPerMonth: HOURS_PER_MONTH,
                services: {
                    compute: {
                        include: false,
                        profile: 'bx2-2x8',
                        count: 0,
                        hours: HOURS_PER_MONTH,
                        hourlyOverride: 0
                    },
                    storage: {
                        include: false,
                        storageGb: 0,
                        transactionsMillion: 0,
                        storageRateOverride: 0,
                        opsRateOverride: 0
                    },
                    serverless: {
                        include: false,
                        requestsMillion: 0,
                        gbSeconds: 0,
                        requestRateOverride: 0,
                        gbSecondRateOverride: 0
                    },
                    database: {
                        include: false,
                        tier: 'cloudant-standard',
                        instances: 0,
                        monthlyOverride: 0
                    },
                    network: {
                        include: false,
                        egressGb: 0,
                        edgeMonthly: 0,
                        egressRateOverride: 0
                    }
                },
                assumptions: {
                    commitmentDiscountPct: 0,
                    regionalUpliftPct: 0,
                    supportPct: 0,
                    contingencyPct: 0,
                    manualAdjustment: 0
                }
            }
        }
    };

    const defaultState = clone(presets['vpc-app'].state);

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function asNumber(value, fallback, min, max) {
        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            return fallback;
        }

        return Math.min(Math.max(parsed, min), max);
    }

    function roundCurrency(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    function money(value) {
        return roundCurrency(value);
    }

    function chooseString(value, fallback, allowed) {
        if (typeof value !== 'string' || value.trim() === '') {
            return fallback;
        }

        if (allowed && !allowed.includes(value)) {
            return fallback;
        }

        return value;
    }

    function serviceState(input, key) {
        return input && input.services && typeof input.services[key] === 'object'
            ? input.services[key]
            : {};
    }

    function assumptionState(input) {
        return input && input.assumptions && typeof input.assumptions === 'object'
            ? input.assumptions
            : {};
    }

    function rateOverride(value, fallback) {
        const parsed = asNumber(value, 0, 0, 1000000);

        return parsed > 0 ? parsed : fallback;
    }

    function addLine(lines, service, item, quantity, unit, rate, monthly, note) {
        lines.push({
            id: 'L' + String(lines.length + 1).padStart(3, '0'),
            service: service,
            item: item,
            quantity: quantity,
            unit: unit,
            rate: money(rate),
            monthly: money(monthly),
            note: note
        });
    }

    /**
     * Builds a preset state by ID.
     *
     * @param {string} presetId Calculate-family preset ID.
     * @returns {object} Deep-cloned preset state.
     */
    function buildPresetState(presetId) {
        const preset = presets[presetId] || presets['vpc-app'];

        return clone(preset.state);
    }

    /**
     * Normalizes raw calculator input into the IBM Cloud cost model.
     *
     * @param {object} input Raw state from controls or imported JSON.
     * @returns {object} Normalized estimate state.
     */
    function normalizeState(input) {
        const source = input && typeof input === 'object' ? input : {};
        const compute = serviceState(source, 'compute');
        const storage = serviceState(source, 'storage');
        const serverless = serviceState(source, 'serverless');
        const database = serviceState(source, 'database');
        const network = serviceState(source, 'network');
        const assumptions = assumptionState(source);

        return {
            label: chooseString(source.label, defaultState.label).slice(0, 90),
            preset: chooseString(source.preset, defaultState.preset, Object.keys(presets)),
            region: chooseString(source.region, defaultState.region, ['us-south', 'us-east', 'eu-de', 'eu-gb', 'jp-tok', 'au-syd']),
            hoursPerMonth: asNumber(source.hoursPerMonth, HOURS_PER_MONTH, 1, 744),
            services: {
                compute: {
                    include: Boolean(compute.include),
                    profile: chooseString(compute.profile, defaultState.services.compute.profile, Object.keys(computeProfiles)),
                    count: asNumber(compute.count, defaultState.services.compute.count, 0, 500),
                    hours: asNumber(compute.hours, defaultState.services.compute.hours, 0, 744),
                    hourlyOverride: asNumber(compute.hourlyOverride, 0, 0, 10000)
                },
                storage: {
                    include: Boolean(storage.include),
                    storageGb: asNumber(storage.storageGb, defaultState.services.storage.storageGb, 0, 10000000),
                    transactionsMillion: asNumber(storage.transactionsMillion, defaultState.services.storage.transactionsMillion, 0, 1000000),
                    storageRateOverride: asNumber(storage.storageRateOverride, 0, 0, 10000),
                    opsRateOverride: asNumber(storage.opsRateOverride, 0, 0, 10000)
                },
                serverless: {
                    include: Boolean(serverless.include),
                    requestsMillion: asNumber(serverless.requestsMillion, defaultState.services.serverless.requestsMillion, 0, 1000000),
                    gbSeconds: asNumber(serverless.gbSeconds, defaultState.services.serverless.gbSeconds, 0, 1000000000),
                    requestRateOverride: asNumber(serverless.requestRateOverride, 0, 0, 10000),
                    gbSecondRateOverride: asNumber(serverless.gbSecondRateOverride, 0, 0, 10000)
                },
                database: {
                    include: Boolean(database.include),
                    tier: chooseString(database.tier, defaultState.services.database.tier, Object.keys(databaseTiers)),
                    instances: asNumber(database.instances, defaultState.services.database.instances, 0, 1000),
                    monthlyOverride: asNumber(database.monthlyOverride, 0, 0, 1000000)
                },
                network: {
                    include: Boolean(network.include),
                    egressGb: asNumber(network.egressGb, defaultState.services.network.egressGb, 0, 10000000),
                    edgeMonthly: asNumber(network.edgeMonthly, defaultState.services.network.edgeMonthly, 0, 1000000),
                    egressRateOverride: asNumber(network.egressRateOverride, 0, 0, 10000)
                }
            },
            assumptions: {
                commitmentDiscountPct: asNumber(assumptions.commitmentDiscountPct, defaultState.assumptions.commitmentDiscountPct, 0, 100),
                regionalUpliftPct: asNumber(assumptions.regionalUpliftPct, defaultState.assumptions.regionalUpliftPct, -50, 200),
                supportPct: asNumber(assumptions.supportPct, defaultState.assumptions.supportPct, 0, 100),
                contingencyPct: asNumber(assumptions.contingencyPct, defaultState.assumptions.contingencyPct, 0, 200),
                manualAdjustment: asNumber(assumptions.manualAdjustment, defaultState.assumptions.manualAdjustment, -1000000, 1000000)
            }
        };
    }

    /**
     * Builds a full IBM Cloud estimate from normalized or raw state.
     *
     * @param {object} input Raw or normalized estimate state.
     * @returns {object} Current estimate, line items, assumptions, and recommendations.
     */
    function buildEstimate(input) {
        const state = normalizeState(input);
        const lines = [];
        let discountableSubtotal = 0;

        if (state.services.compute.include && state.services.compute.count > 0) {
            const profile = computeProfiles[state.services.compute.profile];
            const hourly = rateOverride(state.services.compute.hourlyOverride, profile.hourly);
            const monthly = state.services.compute.count * state.services.compute.hours * hourly;
            discountableSubtotal += monthly;
            addLine(
                lines,
                'Compute',
                'IBM Cloud Virtual Server for VPC - ' + profile.label,
                state.services.compute.count * state.services.compute.hours,
                'instance hours',
                hourly,
                monthly,
                state.services.compute.count + ' VSI(s), ' + profile.vcpu + ' vCPU each'
            );
        }

        if (state.services.storage.include && state.services.storage.storageGb > 0) {
            const storageRate = rateOverride(state.services.storage.storageRateOverride, defaultRates.storagePerGb);
            const opsRate = rateOverride(state.services.storage.opsRateOverride, defaultRates.storageOpsPerMillion);
            const storageMonthly = state.services.storage.storageGb * storageRate;
            const opsMonthly = state.services.storage.transactionsMillion * opsRate;
            addLine(lines, 'Storage', 'IBM Cloud Object Storage capacity', state.services.storage.storageGb, 'GB-month', storageRate, storageMonthly, 'Standard storage starter assumption');
            addLine(lines, 'Storage', 'Object Storage operations', state.services.storage.transactionsMillion, 'million operations', opsRate, opsMonthly, 'Request-volume planning input');
        }

        if (state.services.serverless.include) {
            const requestRate = rateOverride(state.services.serverless.requestRateOverride, defaultRates.serverlessPerMillionRequests);
            const gbSecondRate = rateOverride(state.services.serverless.gbSecondRateOverride, defaultRates.serverlessPerGbSecond);
            const requestMonthly = state.services.serverless.requestsMillion * requestRate;
            const executionMonthly = state.services.serverless.gbSeconds * gbSecondRate;
            addLine(lines, 'Serverless', 'IBM Code Engine requests', state.services.serverless.requestsMillion, 'million requests', requestRate, requestMonthly, 'Request-volume planning input');
            addLine(lines, 'Serverless', 'IBM Code Engine runtime', state.services.serverless.gbSeconds, 'GB-seconds', gbSecondRate, executionMonthly, 'Runtime and memory estimate');
        }

        if (state.services.database.include && state.services.database.instances > 0) {
            const tier = databaseTiers[state.services.database.tier];
            const monthlyRate = rateOverride(state.services.database.monthlyOverride, tier.monthly);
            const monthly = state.services.database.instances * monthlyRate;
            discountableSubtotal += monthly;
            addLine(lines, 'Database', tier.label, state.services.database.instances, 'instance-month', monthlyRate, monthly, 'Starter managed database assumption');
        }

        if (state.services.network.include) {
            const egressRate = rateOverride(state.services.network.egressRateOverride, defaultRates.egressPerGb);
            const egressMonthly = state.services.network.egressGb * egressRate;
            addLine(lines, 'Network', 'Internet data transfer out', state.services.network.egressGb, 'GB', egressRate, egressMonthly, 'Outbound transfer planning input');

            if (state.services.network.edgeMonthly > 0) {
                addLine(lines, 'Network', 'Cloud Internet Services allowance', 1, 'monthly allowance', state.services.network.edgeMonthly, state.services.network.edgeMonthly, 'Visible edge-service placeholder');
            }
        }

        const directSubtotal = money(lines.reduce(function (total, line) {
            return total + line.monthly;
        }, 0));
        const discountAmount = money(discountableSubtotal * (state.assumptions.commitmentDiscountPct / 100));
        const afterDiscount = money(directSubtotal - discountAmount);
        const regionalUplift = money(afterDiscount * (state.assumptions.regionalUpliftPct / 100));
        const support = money((afterDiscount + regionalUplift) * (state.assumptions.supportPct / 100));
        const contingency = money((afterDiscount + regionalUplift + support) * (state.assumptions.contingencyPct / 100));
        const total = money(afterDiscount + regionalUplift + support + contingency + state.assumptions.manualAdjustment);
        const overheadLines = [];

        if (discountAmount > 0) {
            addLine(overheadLines, 'Adjustment', 'Reserved or commitment discount', 1, 'discount', -discountAmount, -discountAmount, 'Applied to compute and database subtotal');
        }

        if (regionalUplift !== 0) {
            addLine(overheadLines, 'Adjustment', 'Regional uplift', state.assumptions.regionalUpliftPct, 'percent', regionalUplift, regionalUplift, 'Manual regional or currency planning factor');
        }

        if (support > 0) {
            addLine(overheadLines, 'Adjustment', 'Support uplift', state.assumptions.supportPct, 'percent', support, support, 'Planning support allowance');
        }

        if (contingency > 0) {
            addLine(overheadLines, 'Adjustment', 'Contingency buffer', state.assumptions.contingencyPct, 'percent', contingency, contingency, 'Planning buffer');
        }

        if (state.assumptions.manualAdjustment !== 0) {
            addLine(overheadLines, 'Adjustment', 'Manual monthly adjustment', 1, 'adjustment', state.assumptions.manualAdjustment, state.assumptions.manualAdjustment, 'Named scope gap or known credit');
        }

        const allLines = lines.concat(overheadLines).map(function (line, index) {
            return Object.assign({}, line, {
                id: 'L' + String(index + 1).padStart(3, '0')
            });
        });
        const serviceTotals = buildServiceTotals(allLines);
        const activeServices = Object.keys(state.services).filter(function (key) {
            return state.services[key].include;
        }).length;

        return {
            tool: TOOL_ID,
            version: VERSION,
            state: state,
            currency: 'USD',
            totals: {
                directSubtotal: directSubtotal,
                discount: discountAmount,
                afterDiscount: afterDiscount,
                regionalUplift: regionalUplift,
                support: support,
                contingency: contingency,
                manualAdjustment: money(state.assumptions.manualAdjustment),
                monthlyTotal: total,
                annualizedTotal: money(total * 12)
            },
            metrics: {
                activeServices: activeServices,
                lineItemCount: allLines.length,
                topDriver: topDriver(allLines)
            },
            lineItems: allLines,
            serviceTotals: serviceTotals,
            assumptionRows: buildAssumptions(state),
            recommendations: buildRecommendations(state, allLines, total)
        };
    }

    function buildServiceTotals(lines) {
        return lines.reduce(function (totals, line) {
            totals[line.service] = money((totals[line.service] || 0) + line.monthly);

            return totals;
        }, {});
    }

    function topDriver(lines) {
        const directLines = lines.filter(function (line) {
            return line.monthly > 0 && line.service !== 'Adjustment';
        }).sort(function (a, b) {
            return b.monthly - a.monthly;
        });

        return directLines.length > 0 ? directLines[0] : null;
    }

    function buildAssumptions(state) {
        return [
            ['Region', state.region, 'Label only. No live regional price lookup is performed.'],
            ['Hours per month', state.hoursPerMonth, 'Used as the default monthly runtime boundary.'],
            ['Commitment discount', state.assumptions.commitmentDiscountPct + '%', 'Applied to compute and database subtotal.'],
            ['Regional uplift', state.assumptions.regionalUpliftPct + '%', 'Manual factor for region, currency, or account differences.'],
            ['Support uplift', state.assumptions.supportPct + '%', 'Planning allowance, not a selected IBM support plan.'],
            ['Contingency', state.assumptions.contingencyPct + '%', 'Buffer applied after support.'],
            ['Manual adjustment', '$' + money(state.assumptions.manualAdjustment), 'Visible monthly addition or credit.']
        ];
    }

    function buildRecommendations(state, lines, total) {
        const recommendations = [];
        const driver = topDriver(lines);

        if (!driver) {
            recommendations.push('Add at least one included IBM Cloud service before using the estimate in review.');
        } else {
            recommendations.push('Challenge the largest driver first: ' + driver.item + ' contributes about $' + money(driver.monthly) + ' monthly.');
        }

        if (state.assumptions.commitmentDiscountPct === 0 && state.services.compute.include) {
            recommendations.push('Compare hourly usage with reservations, committed use, or account-specific discount options when runtime is steady.');
        }

        if (state.services.network.include && state.services.network.egressGb > 250) {
            recommendations.push('Review outbound data transfer separately; egress often arrives wearing a fake mustache.');
        }

        if (total > 0 && state.assumptions.contingencyPct < 10) {
            recommendations.push('Use a visible contingency when sizing, region, or service-plan choices are still rough.');
        }

        recommendations.push('Validate material values in the IBM Cloud cost estimator, billing data, saved estimates, or account pricing before committing.');

        return recommendations;
    }

    /**
     * Builds an exportable JSON payload for the current IBM Cloud estimate.
     *
     * @param {object} input Raw or normalized estimate state.
     * @returns {object} Structured export payload.
     */
    function buildExportPayload(input) {
        const estimate = buildEstimate(input);

        return {
            tool: TOOL_ID,
            version: VERSION,
            exported_at: new Date().toISOString(),
            provider: 'IBM Cloud',
            state: estimate.state,
            totals: estimate.totals,
            line_items: estimate.lineItems,
            service_totals: estimate.serviceTotals,
            assumptions: estimate.assumptionRows,
            recommendations: estimate.recommendations
        };
    }

    /**
     * Builds restored state from an imported IBM Cloud calculator payload.
     *
     * @param {object} payload Parsed JSON payload.
     * @returns {object} Restore result with `state` and `estimate`, or `error`.
     */
    function buildImportedPayloadState(payload) {
        if (!payload || payload.tool !== TOOL_ID || typeof payload.state !== 'object') {
            return {
                error: 'Invalid IBM Cloud cost calculator JSON.'
            };
        }

        const state = normalizeState(payload.state);
        const estimate = buildEstimate(state);

        return {
            state: state,
            estimate: estimate
        };
    }

    /**
     * Converts line items into CSV text.
     *
     * @param {Array<object>} rows Estimate line items.
     * @returns {string} CSV payload.
     */
    function lineItemsToCsv(rows) {
        const headers = ['ID', 'Service', 'Item', 'Quantity', 'Unit', 'Rate', 'Monthly', 'Note'];
        const body = rows.map(function (row) {
            return [
                row.id,
                row.service,
                row.item,
                row.quantity,
                row.unit,
                row.rate,
                row.monthly,
                row.note
            ].map(function (value) {
                const text = String(value).replace(/"/g, '""');

                return '"' + text + '"';
            }).join(',');
        });

        return [headers.join(',')].concat(body).join('\n');
    }

    return {
        TOOL_ID: TOOL_ID,
        VERSION: VERSION,
        DEFAULT_STATE: defaultState,
        PRESETS: presets,
        COMPUTE_PROFILES: computeProfiles,
        DATABASE_TIERS: databaseTiers,
        DEFAULT_RATES: defaultRates,
        buildPresetState: buildPresetState,
        normalizeState: normalizeState,
        buildEstimate: buildEstimate,
        buildExportPayload: buildExportPayload,
        buildImportedPayloadState: buildImportedPayloadState,
        lineItemsToCsv: lineItemsToCsv
    };
}));
