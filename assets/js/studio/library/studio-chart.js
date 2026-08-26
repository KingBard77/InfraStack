import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const studioViews = [
    { id: 'overview', label: 'Overview' },
    { id: 'physical', label: 'Physical' },
    { id: 'network', label: 'Network' },
    { id: 'availability', label: 'Availability' }
];

const providerAccents = {
    aws: '#c45500',
    azure: '#0078d4',
    gcp: '#4285f4',
    generic: '#2563eb'
};

const chartColors = ['#2563eb', '#0f8b8d', '#7c3aed', '#c45500', '#d97706', '#16835b', '#db2777', '#64748b'];

const studioCanvasBackgroundPlugin = {
    id: 'studioCanvasBackground',
    beforeDraw: function (chart) {
        const context = chart.ctx;
        context.save();
        context.globalCompositeOperation = 'destination-over';
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, chart.width, chart.height);
        context.restore();
    }
};

const studioDataLabelsPlugin = {
    id: 'studioDataLabels',
    afterDatasetsDraw: function (chart, args, options) {
        if (!options.display) return;
        const context = chart.ctx;
        const radialArc = ['doughnut', 'polarArea'].includes(chart.config.type);

        context.save();
        context.font = '700 11px Roboto, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = radialArc ? 'middle' : 'bottom';

        chart.data.datasets.forEach(function (dataset, datasetIndex) {
            if (!chart.isDatasetVisible(datasetIndex)) return;
            const metadata = chart.getDatasetMeta(datasetIndex);
            metadata.data.forEach(function (element, dataIndex) {
                if (radialArc && !chart.getDataVisibility(dataIndex)) return;
                const value = Number(dataset.data[dataIndex]);
                if (!Number.isFinite(value) || value === 0) return;
                const position = element.tooltipPosition();
                const total = dataset.data.reduce(function (sum, item) { return sum + Number(item || 0); }, 0);
                const label = radialArc && total > 0
                    ? `${value} · ${Math.round((value / total) * 100)}%`
                    : String(value);

                context.fillStyle = radialArc ? '#ffffff' : '#344054';
                context.shadowColor = radialArc ? 'rgba(0, 0, 0, .55)' : 'transparent';
                context.shadowBlur = radialArc ? 3 : 0;
                context.fillText(label, position.x, radialArc ? position.y : position.y - 8);
            });
        });

        context.restore();
    }
};

function arrayValue(value) {
    return Array.isArray(value) ? value : [];
}

function visibleInView(asset, view) {
    return arrayValue(asset?.views).includes(view);
}

function relationshipCount(project, view) {
    const visibleIds = new Set(arrayValue(project?.assets).filter(function (asset) {
        return visibleInView(asset, view);
    }).map(function (asset) {
        return asset.id;
    }));

    return arrayValue(project?.connections).filter(function (connection) {
        return visibleIds.has(connection.source) && visibleIds.has(connection.target);
    }).length;
}

function readableLabel(value) {
    return String(value || 'unspecified').replace(/[-_]+/g, ' ').replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
    });
}

function countValues(values, limit) {
    const counts = values.reduce(function (totals, value) {
        const key = readableLabel(value);
        totals[key] = (totals[key] || 0) + 1;
        return totals;
    }, {});
    const entries = Object.entries(counts).sort(function (left, right) {
        return right[1] - left[1] || left[0].localeCompare(right[0]);
    });

    if (!limit || entries.length <= limit) return entries;
    const visible = entries.slice(0, limit - 1);
    const remaining = entries.slice(limit - 1).reduce(function (total, entry) { return total + entry[1]; }, 0);
    visible.push(['Other', remaining]);
    return visible;
}

function viewCoverageData(project) {
    const assets = arrayValue(project?.assets);

    return {
        type: 'line',
        labels: studioViews.map(function (view) { return view.label; }),
        datasets: [
            {
                key: 'components',
                label: 'Components',
                data: studioViews.map(function (view) {
                    return assets.filter(function (asset) {
                        return !asset.is_container && visibleInView(asset, view.id);
                    }).length;
                })
            },
            {
                key: 'boundaries',
                label: 'Boundaries',
                data: studioViews.map(function (view) {
                    return assets.filter(function (asset) {
                        return asset.is_container && visibleInView(asset, view.id);
                    }).length;
                })
            },
            {
                key: 'relationships',
                label: 'Relationships',
                data: studioViews.map(function (view) {
                    return relationshipCount(project, view.id);
                })
            }
        ],
        analysisTitle: 'Architecture View Analysis',
        title: 'Studio View Coverage',
        subtitle: 'Solid, dashed, and filled lines compare components, boundaries, and relationships by projection.',
        emptyMessage: 'No assets or relationships are available for view coverage.',
        xTitle: 'Studio view',
        yTitle: 'Modeled items'
    };
}

function assetTypesData(project) {
    const entries = countValues(arrayValue(project?.assets).map(function (asset) { return asset.type; }), 8);

    return {
        type: 'polarArea',
        labels: entries.map(function (entry) { return entry[0]; }),
        datasets: [{
            key: 'asset-types',
            label: 'Assets',
            data: entries.map(function (entry) { return entry[1]; })
        }],
        analysisTitle: 'Architecture Inventory Analysis',
        title: 'Assets by Type',
        subtitle: 'Centered point labels compare the current normalized inventory; smaller groups may appear as Other.',
        emptyMessage: 'No asset types are available in this project.'
    };
}

function relationshipTypesData(project) {
    const entries = countValues(arrayValue(project?.connections).map(function (connection) { return connection.type; }));

    return {
        type: 'bar',
        labels: entries.map(function (entry) { return entry[0]; }),
        datasets: [{
            key: 'relationship-types',
            label: 'Relationships',
            data: entries.map(function (entry) { return entry[1]; })
        }],
        analysisTitle: 'Architecture Relationship Analysis',
        title: 'Relationships by Type',
        subtitle: 'Fully rounded bars compare normalized network, trust, replication, and administration relationships.',
        emptyMessage: 'No relationship data is available in this project.',
        xTitle: 'Relationship type',
        yTitle: 'Relationships'
    };
}

function operationalControlsData(project) {
    const assets = arrayValue(project?.assets);
    const controls = [
        ['Monitoring', 'monitoring'],
        ['Backup', 'backup'],
        ['Redundant', 'redundant'],
        ['Critical', 'critical']
    ];

    return {
        type: 'radar',
        labels: controls.map(function (control) { return control[0]; }),
        datasets: [{
            key: 'operational-controls',
            label: 'Documented assets',
            data: controls.map(function (control) {
                return assets.filter(function (asset) { return asset.properties?.[control[1]] === true; }).length;
            })
        }],
        analysisTitle: 'Operational Readiness Analysis',
        title: 'Operational Control Coverage',
        subtitle: 'Radial coverage shows assets documented for monitoring, backup, redundancy, or critical handling.',
        emptyMessage: 'No operational control flags are recorded for this project.',
        xTitle: 'Normalized asset property',
        yTitle: 'Assets'
    };
}

function dateLabels(project) {
    const updatedAt = new Date(project?.updated_at || Date.now());
    const end = Number.isNaN(updatedAt.getTime()) ? new Date() : updatedAt;

    return studioViews.map(function (view, index) {
        const date = new Date(end);
        date.setUTCDate(end.getUTCDate() - (studioViews.length - index - 1));
        return date.toISOString().slice(0, 10);
    });
}

function timeComboData(project) {
    const coverage = viewCoverageData(project);
    const assets = arrayValue(project?.assets);

    return {
        type: 'bar',
        labels: dateLabels(project),
        datasets: [
            {
                key: 'timeline-components',
                label: 'Components',
                data: coverage.datasets[0].data,
                type: 'bar',
                order: 2
            },
            {
                key: 'timeline-relationships',
                label: 'Relationships',
                data: coverage.datasets[2].data,
                type: 'bar',
                order: 3
            },
            {
                key: 'timeline-coverage',
                label: 'Visible asset coverage',
                data: studioViews.map(function (view) {
                    if (!assets.length) return 0;
                    return Math.round((assets.filter(function (asset) {
                        return visibleInView(asset, view.id);
                    }).length / assets.length) * 100);
                }),
                type: 'line',
                yAxisID: 'coverage',
                order: 1
            }
        ],
        analysisTitle: 'Architecture Coverage Analysis',
        title: 'Projection Metrics Over Time',
        subtitle: 'Dated bars compare modeled items while the line shows visible asset coverage for each projection.',
        emptyMessage: 'No project metrics are available for the time-scale comparison.',
        xTitle: 'Projection date',
        yTitle: 'Modeled items',
        timeScale: true
    };
}

const chartBuilders = {
    'line-styling': viewCoverageData,
    'radar-controls': operationalControlsData,
    'polar-assets': assetTypesData,
    'rounded-relationships': relationshipTypesData,
    'time-combo': timeComboData
};

function chartValueTotal(chartData) {
    return chartData.datasets.reduce(function (total, dataset) {
        return total + dataset.data.reduce(function (sum, value) { return sum + Number(value || 0); }, 0);
    }, 0);
}

function chartAccessibilitySummary(chartData) {
    if (chartValueTotal(chartData) === 0) return `${chartData.title}. ${chartData.emptyMessage}`;

    const details = chartData.datasets.map(function (dataset) {
        const values = chartData.labels.map(function (label, index) {
            return `${label} ${Number(dataset.data[index] || 0)}`;
        }).join(', ');
        return `${dataset.label}: ${values}`;
    }).join('. ');

    return `${chartData.title}. ${chartData.subtitle} ${details}.`;
}

/**
 * Builds provider-neutral chart metrics from a normalized Studio project.
 *
 * @param {object} project Normalized Studio project.
     * @param {string} [chartKey='line-styling'] Selected Studio visualization.
 * @returns {{type: string, labels: string[], datasets: object[], title: string, subtitle: string, emptyMessage: string, totals: {assets: number, connections: number}, xTitle?: string, yTitle?: string}} Chart data and project totals.
 */
export function buildStudioChartData(project, chartKey = 'line-styling') {
    const assets = arrayValue(project?.assets);
    const connections = arrayValue(project?.connections);
    const builder = chartBuilders[chartKey] || chartBuilders['line-styling'];

    return {
        ...builder(project),
        totals: {
            assets: assets.length,
            connections: connections.length
        }
    };
}

function styledDatasets(datasets, provider) {
    const accent = providerAccents[provider] || providerAccents.generic;
    const styles = {
        components: {
            borderColor: accent,
            backgroundColor: `${accent}1f`,
            pointBackgroundColor: accent,
            pointStyle: 'circle'
        },
        boundaries: {
            borderColor: '#0f8b8d',
            backgroundColor: '#0f8b8d1f',
            pointBackgroundColor: '#0f8b8d',
            borderDash: [8, 6],
            pointStyle: 'rectRounded'
        },
        relationships: {
            borderColor: '#7c3aed',
            backgroundColor: '#7c3aed1f',
            pointBackgroundColor: '#7c3aed',
            fill: 'origin',
            pointStyle: 'triangle'
        },
        'asset-types': {
            backgroundColor: chartColors,
            borderColor: '#ffffff',
            borderWidth: 2
        },
        'relationship-types': {
            backgroundColor: chartColors,
            borderColor: chartColors,
            borderRadius: 999,
            borderSkipped: false
        },
        'operational-controls': {
            backgroundColor: `${accent}2b`,
            borderColor: accent,
            pointBackgroundColor: accent,
            pointStyle: 'star',
            fill: true
        },
        'timeline-components': {
            backgroundColor: `${accent}99`,
            borderColor: accent,
            borderRadius: 8,
            borderSkipped: false,
            pointStyle: 'rectRounded'
        },
        'timeline-relationships': {
            backgroundColor: '#0f8b8d99',
            borderColor: '#0f8b8d',
            borderRadius: 8,
            borderSkipped: false,
            pointStyle: 'rectRounded'
        },
        'timeline-coverage': {
            backgroundColor: '#7c3aed26',
            borderColor: '#7c3aed',
            pointBackgroundColor: '#7c3aed',
            pointStyle: 'triangle',
            fill: false
        }
    };

    return datasets.map(function (dataset) {
        return {
            ...dataset,
            ...styles[dataset.key],
            borderWidth: dataset.key === 'asset-types' ? 2 : 3,
            fill: dataset.fill ?? false,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverRadius: 6,
            pointRadius: 4,
            tension: 0.32
        };
    });
}

function cartesianScales(chartData) {
    const scales = {
        x: {
            grid: { color: '#e7ecf3' },
            ticks: { color: '#667085', font: { family: 'Roboto', weight: 600 } },
            title: {
                color: '#475467',
                display: true,
                font: { family: 'Roboto', weight: 700 },
                text: chartData.xTitle
            }
        },
        y: {
            beginAtZero: true,
            grid: { color: '#e7ecf3' },
            ticks: {
                color: '#667085',
                precision: 0,
                callback: function (value) { return Number.isInteger(value) ? value : ''; }
            },
            title: {
                color: '#475467',
                display: true,
                font: { family: 'Roboto', weight: 700 },
                text: chartData.yTitle
            }
        }
    };

    if (chartData.timeScale) {
        scales.x.type = 'time';
        scales.x.time = { tooltipFormat: 'PP', unit: 'day' };
        scales.coverage = {
            beginAtZero: true,
            max: 100,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { callback: function (value) { return `${value}%`; } },
            title: {
                color: '#475467',
                display: true,
                font: { family: 'Roboto', weight: 700 },
                text: 'Visible asset coverage'
            }
        };
    }

    return scales;
}

function radialScales(chartData) {
    if (chartData.type === 'polarArea') {
        return {
            r: {
                beginAtZero: true,
                grid: { color: '#dfe5ee' },
                pointLabels: {
                    centerPointLabels: true,
                    color: '#475467',
                    display: true,
                    font: { family: 'Roboto', size: 12, weight: 700 }
                },
                ticks: { precision: 0 }
            }
        };
    }
    if (chartData.type === 'radar') {
        return {
            r: {
                beginAtZero: true,
                grid: { color: '#dfe5ee' },
                angleLines: { color: '#dfe5ee' },
                pointLabels: { color: '#475467', font: { family: 'Roboto', size: 12, weight: 700 } },
                ticks: { precision: 0 }
            }
        };
    }
    return null;
}

function chartScales(chartData) {
    return radialScales(chartData) || cartesianScales(chartData);
}

/**
 * Maintains the shared Chart.js overview for the active Studio project.
 */
export class StudioChart {
    /**
     * Creates a Studio chart adapter.
     *
     * @param {HTMLCanvasElement} canvas Canvas used by Chart.js.
     * @param {{onVisibilityChange?: function(boolean): void}} [callbacks={}] Chart interaction callbacks.
     */
    constructor(canvas, callbacks = {}) {
        if (!canvas || typeof canvas.getContext !== 'function') {
            throw new TypeError('StudioChart requires a canvas element.');
        }

        this.canvas = canvas;
        this.chart = null;
        this.chartKey = null;
        this.dataLabelsVisible = false;
        this.onVisibilityChange = typeof callbacks.onVisibilityChange === 'function'
            ? callbacks.onVisibilityChange
            : function () {};
    }

    /**
     * Creates or refreshes the chart from normalized project state.
     *
     * @param {object} project Normalized Studio project.
     * @param {string} provider Active provider identifier.
     * @param {string} [chartKey='view-coverage'] Selected visualization key.
     * @returns {{assets: number, connections: number, analysisTitle: string, title: string, subtitle: string, empty: boolean, emptyMessage: string, accessibilitySummary: string}} Chart status and project totals.
     */
    render(project, provider, chartKey = 'line-styling') {
        const chartData = buildStudioChartData(project, chartKey);
        const data = {
            labels: chartData.labels,
            datasets: styledDatasets(chartData.datasets, provider)
        };
        const status = {
            ...chartData.totals,
            analysisTitle: chartData.analysisTitle,
            title: chartData.title,
            subtitle: chartData.subtitle,
            empty: chartValueTotal(chartData) === 0,
            emptyMessage: chartData.emptyMessage,
            accessibilitySummary: chartAccessibilitySummary(chartData)
        };

        if (this.chart && this.chartKey === chartKey) {
            this.chart.data = data;
            this.chart.update('none');
            this.onVisibilityChange(this.hasHiddenData());
            return status;
        }

        this.destroy();
        this.chartKey = chartKey;

        this.chart = new Chart(this.canvas, {
            type: chartData.type,
            data,
            plugins: [studioCanvasBackgroundPlugin, studioDataLabelsPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 700,
                    delay: function (context) {
                        if (context.type !== 'data') return 0;
                        return (context.dataIndex * 90) + (context.datasetIndex * 140);
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                hover: {
                    intersect: true,
                    mode: 'nearest'
                },
                plugins: {
                    legend: {
                        align: 'center',
                        labels: {
                            boxHeight: 10,
                            boxWidth: 24,
                            color: '#344054',
                            font: {
                                family: 'Roboto',
                                size: 12,
                                weight: 700
                            },
                            padding: 20,
                            usePointStyle: true
                        },
                        onClick: (event, legendItem, legend) => {
                            const chart = legend.chart;
                            const handler = Chart.overrides[chart.config.type]?.plugins?.legend?.onClick
                                || Chart.defaults.plugins.legend.onClick;
                            handler(event, legendItem, legend);
                            this.onVisibilityChange(this.hasHiddenData());
                        },
                        position: 'top'
                    },
                    title: {
                        display: false
                    },
                    subtitle: {
                        display: false
                    },
                    studioDataLabels: {
                        display: this.dataLabelsVisible
                    },
                    tooltip: {
                        usePointStyle: true,
                        titleFont: { family: 'Nunito', weight: 800 },
                        bodyFont: { family: 'Roboto' },
                        callbacks: {
                            label: function (context) {
                                const value = Number(context.raw || 0);
                                const label = context.dataset.label || context.label || 'Value';
                                if (!['doughnut', 'polarArea'].includes(context.chart.config.type)) return `${label}: ${value}`;
                                const total = context.dataset.data.reduce(function (sum, item) {
                                    return sum + Number(item || 0);
                                }, 0);
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${context.label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                scales: chartScales(chartData)
            }
        });

        this.onVisibilityChange(false);
        return status;
    }

    /**
     * Resizes the active chart after its Studio mode becomes visible.
     *
     * @returns {void}
     */
    resize() {
        if (this.chart) this.chart.resize();
    }

    /**
     * Shows or hides numeric labels drawn on chart elements.
     *
     * @param {boolean} visible Whether data labels should be visible.
     * @returns {void}
     */
    setDataLabelsVisible(visible) {
        this.dataLabelsVisible = visible === true;
        if (!this.chart) return;
        this.chart.options.plugins.studioDataLabels.display = this.dataLabelsVisible;
        this.chart.update();
    }

    /**
     * Reports whether a legend interaction has hidden chart data.
     *
     * @returns {boolean} True when a dataset or doughnut segment is hidden.
     */
    hasHiddenData() {
        if (!this.chart) return false;
        const datasetHidden = this.chart.data.datasets.some((dataset, index) => !this.chart.isDatasetVisible(index));
        const segmentHidden = ['doughnut', 'polarArea'].includes(this.chart.config.type)
            && this.chart.data.labels.some((label, index) => !this.chart.getDataVisibility(index));
        return datasetHidden || segmentHidden;
    }

    /**
     * Restores datasets and doughnut segments hidden through the legend.
     *
     * @returns {void}
     */
    resetVisibility() {
        if (!this.chart) return;
        this.chart.data.datasets.forEach((dataset, index) => this.chart.setDatasetVisibility(index, true));
        if (['doughnut', 'polarArea'].includes(this.chart.config.type)) {
            this.chart.data.labels.forEach((label, index) => {
                if (!this.chart.getDataVisibility(index)) this.chart.toggleDataVisibility(index);
            });
        }
        this.chart.update();
        this.onVisibilityChange(false);
    }

    /**
     * Downloads the current chart canvas as a PNG image.
     *
     * @param {string} filename Requested download filename.
     * @returns {boolean} True when a chart image download was started.
     */
    downloadPng(filename) {
        if (!this.chart) return false;
        const safeName = String(filename || 'studio-overview').toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'studio-overview';
        const link = document.createElement('a');
        link.download = `${safeName}.png`;
        link.href = this.chart.toBase64Image('image/png', 1);
        document.body.append(link);
        link.click();
        link.remove();
        return true;
    }

    /**
     * Releases the Chart.js instance and its observers.
     *
     * @returns {void}
     */
    destroy() {
        if (this.chart) this.chart.destroy();
        this.chart = null;
        this.chartKey = null;
    }
}
