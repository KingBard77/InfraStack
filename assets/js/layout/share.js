import { rules } from '../studio/content.js';
import core from '../studio/core/studio-model.js';
import { StudioMaxGraphAdapter } from '../studio/library/studio-maxgraph.js';

const root = document.getElementById('studio-shared-project');
const projectSource = document.getElementById('studio-shared-project-data');

if (root && projectSource && core && rules) {
    const parsed = JSON.parse(projectSource.textContent || '{}');
    const normalized = core.normalizeProject(parsed);

    if (normalized.ok) {
        const project = normalized.project;
        const graphElement = document.getElementById('studio-shared-graph');
        const outlineElement = document.getElementById('studio-shared-outline');
        const viewSelect = document.getElementById('studio-shared-view');
        const zoomLabel = document.getElementById('studio-shared-zoom');
        const iconUrls = JSON.parse(root.dataset.iconUrls || '{}');
        const viewLabels = {
            overview: 'Overview',
            physical: 'Physical',
            network: 'Network',
            availability: 'Availability'
        };
        const adapter = new StudioMaxGraphAdapter(graphElement, outlineElement, {
            onViewportChange: function (viewport) {
                zoomLabel.textContent = `${Math.round(viewport.zoom * 100)}%`;
            }
        });
        let activeView = project.active_view;

        adapter.setReadOnly(true);

        core.supportedViews.filter(function (view) {
            return project.assets.some(function (asset) { return asset.views.includes(view); });
        }).forEach(function (view) {
            viewSelect.add(new Option(viewLabels[view], view));
        });

        if (![...viewSelect.options].some(function (option) { return option.value === activeView; })) {
            activeView = viewSelect.options[0]?.value || 'overview';
        }
        viewSelect.value = activeView;

        function renderGraph() {
            adapter.render(project, activeView, iconUrls);
            window.requestAnimationFrame(function () { adapter.fit(); });
        }

        function assetById(assetId) {
            return project.assets.find(function (asset) { return asset.id === assetId; });
        }

        function placementFor(asset) {
            const labels = [];
            let parent = assetById(asset.parent_id);
            while (parent) {
                labels.unshift(parent.label);
                parent = assetById(parent.parent_id);
            }
            return labels.join(' / ') || 'Top level';
        }

        function renderInventory() {
            const body = document.getElementById('studio-shared-inventory');
            const count = document.getElementById('studio-shared-inventory-count');
            if (!body || !count) return;
            const fragment = document.createDocumentFragment();
            project.assets.forEach(function (asset) {
                const row = document.createElement('tr');
                const controls = ['monitoring', 'backup', 'redundant', 'critical'].filter(function (key) {
                    return asset.properties[key];
                }).join(', ') || '—';
                const resources = [asset.properties.cpu, asset.properties.memory, asset.properties.storage].filter(Boolean).join(' · ') || '—';
                [asset.label, asset.type, placementFor(asset), asset.properties.address || '—', resources, controls].forEach(function (value) {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    row.append(cell);
                });
                fragment.append(row);
            });
            body.replaceChildren(fragment);
            count.textContent = `${project.assets.length} items`;
        }

        function renderAdvisory() {
            const grade = document.getElementById('studio-shared-grade');
            const score = document.getElementById('studio-shared-score');
            const findingsElement = document.getElementById('studio-shared-findings');
            if (!grade || !score || !findingsElement) return;
            const result = rules.evaluateProject(project);
            const dismissed = new Set(project.accepted_risks || []);
            const findings = result.findings.filter(function (finding) { return !dismissed.has(finding.id); });
            grade.textContent = result.grade || '—';
            score.textContent = result.score === null ? result.grade_label : `${result.score}/100 · ${result.grade_label}`;
            const fragment = document.createDocumentFragment();
            if (!findings.length) {
                const empty = document.createElement('p');
                empty.className = 'studio-shared-empty';
                empty.textContent = project.assets.length ? 'No open deterministic findings.' : 'No assets are available to review.';
                fragment.append(empty);
            }
            findings.forEach(function (finding) {
                const card = document.createElement('article');
                const heading = document.createElement('div');
                const severity = document.createElement('span');
                const category = document.createElement('small');
                const title = document.createElement('strong');
                const detail = document.createElement('p');
                const recommendation = document.createElement('p');
                heading.className = 'studio-shared-finding-heading';
                severity.textContent = finding.severity;
                category.textContent = finding.category;
                heading.append(severity, category);
                title.textContent = finding.title;
                detail.textContent = finding.detail;
                recommendation.className = 'studio-shared-recommendation';
                recommendation.textContent = finding.recommendation;
                card.append(heading, title, detail, recommendation);
                fragment.append(card);
            });
            findingsElement.replaceChildren(fragment);
        }

        async function copyText(value, message, event) {
            await navigator.clipboard.writeText(value);
            const button = event.currentTarget;
            const original = button.innerHTML;
            button.textContent = message;
            window.setTimeout(function () { button.innerHTML = original; }, 1600);
        }

        viewSelect.addEventListener('change', function () {
            activeView = viewSelect.value;
            renderGraph();
        });
        document.getElementById('studio-shared-zoom-out').addEventListener('click', function () { adapter.zoom(0.9); });
        document.getElementById('studio-shared-zoom-in').addEventListener('click', function () { adapter.zoom(1.1); });
        document.getElementById('studio-shared-fit').addEventListener('click', function () { adapter.fit(); });
        document.getElementById('studio-share-copy')?.addEventListener('click', function (event) {
            copyText(window.location.href, 'Link copied', event);
        });
        document.getElementById('studio-embed-copy')?.addEventListener('click', function (event) {
            const markup = `<iframe src="${root.dataset.embedUrl}" width="100%" height="700" loading="lazy"></iframe>`;
            copyText(markup, 'Embed copied', event);
        });

        renderGraph();
        renderInventory();
        renderAdvisory();
    }
}
