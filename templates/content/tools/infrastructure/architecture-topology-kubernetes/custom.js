// custom.js
(function () {
    const root = document.querySelector('.architecture-topology-kubernetes-tool');

    if (!root) {
        return;
    }

    const fields = {
        input: root.querySelector('#architectureTopologyKubernetesInput'),
        inputError: root.querySelector('#architectureTopologyKubernetesInputError'),
        primaryAction: root.querySelector('#architectureTopologyKubernetesPrimaryAction'),
        secondaryAction: root.querySelector('#architectureTopologyKubernetesSecondaryAction'),
        viewpoint: root.querySelector('#architectureTopologyKubernetesBasicPrimary'),
        environmentSummary: root.querySelector('#architectureTopologyKubernetesBasicSelectSummary'),
        nodeGroups: root.querySelector('#architectureTopologyKubernetesBasicText'),
        stateful: root.querySelector('#architectureTopologyKubernetesBasicToggle'),
        namespace: root.querySelector('#architectureTopologyKubernetesCustomText'),
        serviceType: root.querySelector('#architectureTopologyKubernetesServiceType'),
        ingressSummary: root.querySelector('#architectureTopologyKubernetesCustomSelectValue'),
        workerPools: root.querySelector('#architectureTopologyKubernetesCustomNumber'),
        replicas: root.querySelector('#architectureTopologyKubernetesReplicaCount'),
        platformServices: root.querySelector('#architectureTopologyKubernetesCustomToggle'),
        networkPolicy: root.querySelector('#architectureTopologyKubernetesNetworkPolicy'),
        workloads: root.querySelector('#architectureTopologyKubernetesCustomTextarea'),
        objects: root.querySelector('#architectureTopologyKubernetesObjectTextarea'),
        zoomInput: root.querySelector('#architectureTopologyKubernetesZoomInput'),
        zoomFit: root.querySelector('#architectureTopologyKubernetesZoomFit'),
        zoomActual: root.querySelector('#architectureTopologyKubernetesZoomActual'),
        zoomIn: root.querySelector('#architectureTopologyKubernetesZoomIn'),
        zoomOut: root.querySelector('#architectureTopologyKubernetesZoomOut'),
        highlightAll: root.querySelector('#architectureTopologyKubernetesHighlightAll'),
        resetLayout: root.querySelector('#architectureTopologyKubernetesResetLayout'),
        stageCanvas: root.querySelector('#architectureTopologyKubernetesStageCanvas'),
        diagramLayer: root.querySelector('#architectureTopologyKubernetesDiagramLayer'),
        usageHelpButton: root.querySelector('#architectureTopologyKubernetesUsageHelpButton'),
        usageHelpPopup: root.querySelector('#architectureTopologyKubernetesUsageHelpPopup'),
        usageHelpClose: root.querySelector('#architectureTopologyKubernetesUsageHelpClose'),
        summary: root.querySelector('#architectureTopologyKubernetesSummary'),
        rows: root.querySelector('#architectureTopologyKubernetesRows'),
    };

    const defaults = {
        input: '',
        viewpoint: 'Cluster layout',
        nodeGroups: '3',
        stateful: false,
        namespace: '',
        serviceType: 'ClusterIP',
        workerPools: '3',
        replicas: '3',
        platformServices: true,
        networkPolicy: true,
        workloads: '',
        objects: '',
        zoom: '80',
    };

    function optionText(select) {
        return select.options[select.selectedIndex]?.textContent || select.value;
    }

    function checkedValue(name) {
        const checked = root.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : '';
    }

    function replaceRows(items) {
        fields.rows.replaceChildren();
        items.forEach((item) => {
            const row = document.createElement('li');
            row.textContent = item;
            fields.rows.appendChild(row);
        });
    }

    function updateDetailsSummary(name, summary) {
        const value = checkedValue(name);

        if (summary && value) {
            summary.textContent = value;
        }
    }

    function setDropdownValue(button) {
        const details = button.closest('details');
        const menu = button.closest('[role="listbox"]');
        const value = button.dataset.customDropdownValue || button.textContent.trim();
        const summary = details?.querySelector('[id$="CustomSelectValue"]');

        if (summary) {
            summary.textContent = value;
        }

        menu?.querySelectorAll('[data-custom-dropdown-value]').forEach((option) => {
            const active = option === button;
            option.classList.toggle('active', active);
            option.setAttribute('aria-selected', String(active));
        });

        if (details) {
            details.open = false;
        }
    }

    function activateTab(tab) {
        const targetId = tab.dataset.customTabTarget;

        root.querySelectorAll('[data-custom-tab-target]').forEach((item) => {
            const active = item === tab;
            item.classList.toggle('active', active);
            item.setAttribute('aria-selected', String(active));
            item.tabIndex = active ? 0 : -1;
        });

        root.querySelectorAll('[data-custom-panel]').forEach((panel) => {
            const active = panel.id === targetId;
            panel.classList.toggle('active', active);
            panel.hidden = !active;
        });
    }

    function setError(message) {
        fields.inputError.textContent = message;
        fields.inputError.classList.toggle('d-none', !message);
    }

    function setUsageHelpOpen(open) {
        fields.usageHelpPopup.classList.toggle('d-none', !open);
        fields.usageHelpButton.setAttribute('aria-expanded', String(open));
    }

    function setZoom(value) {
        const zoom = Math.max(40, Math.min(160, Number(value) || Number(defaults.zoom)));
        fields.zoomInput.value = String(zoom);
        fields.stageCanvas.style.transformOrigin = 'top left';
        fields.stageCanvas.style.transform = `scale(${zoom / 100})`;
    }

    function svgElement(tag, attributes = {}) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, String(value));
        });

        return element;
    }

    function addText(group, x, y, text, className) {
        const item = svgElement('text', { x, y, class: className });
        item.textContent = text;
        group.appendChild(item);
    }

    function addCard({ id, x, y, width, height, title, subtitle, tone }) {
        const group = svgElement('g', {
            class: 'diagram-card-group',
            id,
            transform: `translate(${x} ${y})`,
        });
        const rect = svgElement('rect', {
            class: 'architecture-topology-kubernetes-diagram-card',
            'data-tone': tone,
            width,
            height,
            rx: 14,
        });

        group.appendChild(rect);
        addText(group, 16, 30, title, 'architecture-topology-kubernetes-diagram-label');
        addText(group, 16, 52, subtitle, 'architecture-topology-kubernetes-diagram-sub');
        fields.diagramLayer.appendChild(group);
        return { x, y, width, height };
    }

    function connect(source, target) {
        const x1 = source.x + source.width;
        const y1 = source.y + (source.height / 2);
        const x2 = target.x;
        const y2 = target.y + (target.height / 2);
        const mid = x1 + ((x2 - x1) / 2);
        const path = `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;

        fields.diagramLayer.appendChild(svgElement('path', {
            class: 'diagram-connector-hit-target',
            d: path,
        }));
        fields.diagramLayer.appendChild(svgElement('path', {
            class: 'diagram-connector diagram-connector-active',
            d: path,
        }));
    }

    function renderDiagram({ environment, workloads, density }) {
        const namespace = fields.namespace.value.trim() || environment.toLowerCase();
        const serviceType = fields.serviceType.value;
        const ingress = fields.ingressSummary.textContent.trim();
        const replicaText = `${fields.replicas.value || defaults.replicas} replicas`;
        const policyText = fields.networkPolicy.checked ? 'NetworkPolicy lane' : 'Policy lane omitted';

        fields.diagramLayer.replaceChildren();
        fields.diagramLayer.appendChild(svgElement('rect', {
            class: 'architecture-topology-kubernetes-diagram-boundary',
            x: 230,
            y: 46,
            width: 520,
            height: 300,
            rx: 24,
        }));
        addText(fields.diagramLayer, 252, 78, `Namespace: ${namespace}`, 'architecture-topology-kubernetes-diagram-label');
        addText(fields.diagramLayer, 252, 100, `${density} draft | ${policyText}`, 'architecture-topology-kubernetes-diagram-sub');

        const client = addCard({
            id: 'architectureTopologyKubernetesNodeClient',
            x: 40,
            y: 160,
            width: 150,
            height: 72,
            title: 'Client / DNS',
            subtitle: environment,
            tone: 'entry',
        });
        const ingressNode = addCard({
            id: 'architectureTopologyKubernetesNodeIngress',
            x: 250,
            y: 140,
            width: 160,
            height: 78,
            title: ingress,
            subtitle: serviceType,
            tone: 'entry',
        });
        const service = addCard({
            id: 'architectureTopologyKubernetesNodeService',
            x: 470,
            y: 140,
            width: 160,
            height: 78,
            title: 'Service',
            subtitle: `${serviceType} endpoint`,
            tone: 'workload',
        });
        const workload = addCard({
            id: 'architectureTopologyKubernetesNodeWorkload',
            x: 470,
            y: 250,
            width: 180,
            height: 78,
            title: workloads.split(',')[0] || 'Workload',
            subtitle: replicaText,
            tone: 'workload',
        });
        const platform = addCard({
            id: 'architectureTopologyKubernetesNodePlatform',
            x: 250,
            y: 250,
            width: 160,
            height: 78,
            title: fields.platformServices.checked ? 'Platform services' : 'Core namespace',
            subtitle: fields.stateful.checked ? 'stateful notes' : 'stateless notes',
            tone: 'policy',
        });

        connect(client, ingressNode);
        connect(ingressNode, service);
        connect(service, workload);
        connect(platform, workload);
    }

    function render() {
        const brief = fields.input.value.trim();
        const namespace = fields.namespace.value.trim();
        const namespaceText = namespace ? `, namespace focus ${namespace}` : '';
        const environment = checkedValue('architectureTopologyKubernetesBasicOption') || 'Staging';
        const density = checkedValue('architectureTopologyKubernetesCustomRadio') || 'Compact';
        const workloads = fields.workloads.value.trim().replace(/\n+/g, ', ') || 'Workload groups not listed yet';
        const objects = fields.objects.value.trim().replace(/\n+/g, ', ') || 'Kubernetes objects not listed yet';

        setError('');
        fields.summary.textContent = `${optionText(fields.viewpoint)} for ${environment}: ${brief || 'No topology brief entered yet'}`;
        replaceRows([
            `Node groups: ${fields.nodeGroups.value || defaults.nodeGroups}`,
            `Worker pools: ${fields.workerPools.value || defaults.workerPools}${namespaceText}`,
            `Replicas: ${fields.replicas.value || defaults.replicas}`,
            `Service exposure: ${fields.serviceType.value}`,
            `Ingress: ${fields.ingressSummary.textContent.trim()}`,
            `Density: ${density}`,
            `Workloads: ${workloads}`,
            `Objects: ${objects}`,
            `Stateful review: ${fields.stateful.checked ? 'included' : 'not included yet'}`,
            `Platform services: ${fields.platformServices.checked ? 'included' : 'not included yet'}`,
            `NetworkPolicy lane: ${fields.networkPolicy.checked ? 'shown' : 'hidden'}`,
        ]);
        renderDiagram({ environment, workloads, density });
    }

    function reset() {
        fields.input.value = defaults.input;
        fields.viewpoint.value = defaults.viewpoint;
        fields.nodeGroups.value = defaults.nodeGroups;
        fields.stateful.checked = defaults.stateful;
        fields.namespace.value = defaults.namespace;
        fields.serviceType.value = defaults.serviceType;
        fields.workerPools.value = defaults.workerPools;
        fields.replicas.value = defaults.replicas;
        fields.platformServices.checked = defaults.platformServices;
        fields.networkPolicy.checked = defaults.networkPolicy;
        fields.workloads.value = defaults.workloads;
        fields.objects.value = defaults.objects;
        setZoom(defaults.zoom);
        root.querySelector('input[name="architectureTopologyKubernetesBasicOption"][value="Staging"]').checked = true;
        root.querySelector('input[name="architectureTopologyKubernetesCustomRadio"][value="Compact"]').checked = true;
        updateDetailsSummary('architectureTopologyKubernetesBasicOption', fields.environmentSummary);
        render();
    }

    root.querySelectorAll('input, select, textarea').forEach((control) => {
        control.addEventListener('input', render);
        control.addEventListener('change', () => {
            updateDetailsSummary('architectureTopologyKubernetesBasicOption', fields.environmentSummary);
            render();
        });
    });

    root.querySelectorAll('[data-custom-dropdown-value]').forEach((button) => {
        button.addEventListener('click', () => {
            setDropdownValue(button);
            render();
        });
    });

    root.querySelectorAll('[data-custom-tab-target]').forEach((tab) => {
        tab.addEventListener('click', () => activateTab(tab));
    });

    fields.primaryAction.addEventListener('click', render);
    fields.secondaryAction.addEventListener('click', reset);
    fields.zoomInput.addEventListener('input', () => setZoom(fields.zoomInput.value));
    fields.zoomIn.addEventListener('click', () => setZoom(Number(fields.zoomInput.value) + 10));
    fields.zoomOut.addEventListener('click', () => setZoom(Number(fields.zoomInput.value) - 10));
    fields.zoomActual.addEventListener('click', () => setZoom(100));
    fields.zoomFit.addEventListener('click', () => setZoom(80));
    fields.resetLayout.addEventListener('click', () => {
        setZoom(defaults.zoom);
        render();
    });
    fields.highlightAll.addEventListener('click', () => {
        const pressed = fields.highlightAll.getAttribute('aria-pressed') === 'true';
        fields.highlightAll.setAttribute('aria-pressed', String(!pressed));
        fields.stageCanvas.classList.toggle('is-highlighted', !pressed);
    });
    fields.usageHelpButton.addEventListener('click', () => {
        setUsageHelpOpen(fields.usageHelpPopup.classList.contains('d-none'));
    });
    fields.usageHelpClose.addEventListener('click', () => setUsageHelpOpen(false));
    updateDetailsSummary('architectureTopologyKubernetesBasicOption', fields.environmentSummary);
    setZoom(defaults.zoom);
    render();
}());
