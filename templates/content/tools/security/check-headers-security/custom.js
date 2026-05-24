// custom.js
(function () {
    const root = document.querySelector('.check-headers-security-tool');

    if (!root) {
        return;
    }

    const fields = {
        input: root.querySelector('#checkHeadersSecurityInput'),
        inputError: root.querySelector('#checkHeadersSecurityInputError'),
        primaryAction: root.querySelector('#checkHeadersSecurityPrimaryAction'),
        secondaryAction: root.querySelector('#checkHeadersSecuritySecondaryAction'),
        baseline: root.querySelector('#checkHeadersSecurityBasicPrimary'),
        method: root.querySelector('#checkHeadersSecurityMethod'),
        methodSummary: root.querySelector('#checkHeadersSecurityMethodValue'),
        target: root.querySelector('#checkHeadersSecurityBasicText'),
        followRedirects: root.querySelector('#checkHeadersSecurityBasicToggle'),
        route: root.querySelector('#checkHeadersSecurityCustomText'),
        cspMode: root.querySelector('#checkHeadersSecurityCspMode'),
        cookieSummary: root.querySelector('#checkHeadersSecurityCustomSelectValue'),
        findingCap: root.querySelector('#checkHeadersSecurityCustomNumber'),
        hstsMaxAge: root.querySelector('#checkHeadersSecurityHstsMaxAge'),
        includeCookies: root.querySelector('#checkHeadersSecurityCustomToggle'),
        hstsSubdomains: root.querySelector('#checkHeadersSecurityHstsSubdomains'),
        headers: root.querySelector('#checkHeadersSecurityCustomTextarea'),
        policyNotes: root.querySelector('#checkHeadersSecurityPolicyTextarea'),
        summary: root.querySelector('#checkHeadersSecuritySummary'),
        rows: root.querySelector('#checkHeadersSecurityRows'),
        contractTarget: root.querySelector('#checkHeadersSecurityContractTarget'),
        visualRing: root.querySelector('#checkHeadersSecurityVisualRing'),
        visualScore: root.querySelector('#checkHeadersSecurityVisualScore'),
        primaryValue: root.querySelector('#checkHeadersSecurityPrimaryValue'),
        primaryNote: root.querySelector('#checkHeadersSecurityPrimaryNote'),
        metricCsp: root.querySelector('#checkHeadersSecurityMetricCsp'),
        metricHsts: root.querySelector('#checkHeadersSecurityMetricHsts'),
        metricHstsCopy: root.querySelector('#checkHeadersSecurityMetricHstsCopy'),
        metricCookies: root.querySelector('#checkHeadersSecurityMetricCookies'),
        evidenceCsp: root.querySelector('#checkHeadersSecurityEvidenceCsp'),
        evidenceHsts: root.querySelector('#checkHeadersSecurityEvidenceHsts'),
        evidenceCookies: root.querySelector('#checkHeadersSecurityEvidenceCookies'),
        findingOne: root.querySelector('#checkHeadersSecurityFindingOne'),
        findingTwo: root.querySelector('#checkHeadersSecurityFindingTwo'),
    };

    const defaults = {
        input: '',
        baseline: 'balanced',
        method: 'HEAD',
        target: 'Web application',
        followRedirects: true,
        route: '',
        cspMode: 'Content-Security-Policy',
        findingCap: '8',
        hstsMaxAge: '31536000',
        includeCookies: true,
        hstsSubdomains: true,
        headers: '',
        policyNotes: '',
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
        const targetId = details?.dataset.customDropdownFor || '';
        const targetInput = targetId ? root.querySelector(`#${targetId}`) : null;
        const summary = details?.querySelector('[data-custom-dropdown-label]') || details?.querySelector('[id$="CustomSelectValue"]');

        if (summary) {
            summary.textContent = value;
        }

        if (targetInput) {
            targetInput.value = value;
            targetInput.dispatchEvent(new Event('change', { bubbles: true }));
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

    function render() {
        const brief = fields.input.value.trim();
        const headers = fields.headers.value.trim().replace(/\n+/g, ', ') || 'Default header set';
        const policyNotes = fields.policyNotes.value.trim().replace(/\n+/g, ', ') || 'Policy directives not listed yet';
        const route = fields.route.value.trim();
        const routeText = route ? ` (${route})` : '';
        const focus = checkedValue('checkHeadersSecurityCustomRadio') || 'Standard';
        const cookieMode = fields.cookieSummary.textContent.trim();
        const headerCount = fields.headers.value.trim() ? fields.headers.value.trim().split(/\n+/).filter(Boolean).length : 5;
        const coverage = Math.min(8, Math.max(3, headerCount + 1 + (fields.includeCookies.checked ? 1 : 0)));
        const hstsSuffix = fields.hstsSubdomains.checked ? ' + subdomains' : '';
        const cspMode = optionText(fields.cspMode);

        setError('');
        fields.summary.textContent = `${fields.target.value || 'Web application'}${routeText}: ${brief || 'No target brief entered yet'}`;
        replaceRows([
            `Baseline: ${optionText(fields.baseline)}`,
            `Method: ${fields.method.value || defaults.method}`,
            `Redirects: ${fields.followRedirects.checked ? 'follow final destination' : 'stay on initial response'}`,
            `Header focus: ${focus}`,
            `CSP mode: ${cspMode}`,
            `HSTS max-age: ${fields.hstsMaxAge.value || '0'}${hstsSuffix}`,
            `Headers: ${headers}`,
            `Cookie review: ${fields.includeCookies.checked ? cookieMode : 'Hidden from draft preview'}`,
            `Policy directives: ${policyNotes}`,
            `Finding cap: ${fields.findingCap.value || '8'}`,
        ]);
        fields.contractTarget.textContent = fields.target.value || 'No target yet';
        fields.visualScore.textContent = String(coverage);
        fields.visualRing.style.setProperty('--check-headers-security-visual-contract-progress', `${coverage * 36}deg`);
        fields.primaryValue.textContent = `${coverage} header groups planned`;
        fields.primaryNote.textContent = `${cspMode}, HSTS ${fields.hstsMaxAge.value || '0'}${hstsSuffix}, ${cookieMode.toLowerCase()}.`;
        fields.metricCsp.textContent = cspMode.replace(' policy', '');
        fields.metricHsts.textContent = fields.hstsMaxAge.value || '0';
        fields.metricHstsCopy.textContent = fields.hstsSubdomains.checked ? 'includeSubDomains planned' : 'single-host HSTS planning';
        fields.metricCookies.textContent = fields.includeCookies.checked ? 'Included' : 'Hidden';
        fields.evidenceCsp.textContent = `${cspMode} selected.`;
        fields.evidenceHsts.textContent = `max-age=${fields.hstsMaxAge.value || '0'}${fields.hstsSubdomains.checked ? '; includeSubDomains' : ''}`;
        fields.evidenceCookies.textContent = fields.includeCookies.checked ? `${cookieMode} in draft.` : 'Cookie notes hidden.';
        fields.findingOne.textContent = headers;
        fields.findingTwo.textContent = policyNotes;
    }

    function reset() {
        fields.input.value = defaults.input;
        fields.baseline.value = defaults.baseline;
        fields.method.value = defaults.method;
        fields.methodSummary.textContent = defaults.method;
        fields.target.value = defaults.target;
        fields.followRedirects.checked = defaults.followRedirects;
        fields.route.value = defaults.route;
        fields.cspMode.value = defaults.cspMode;
        fields.findingCap.value = defaults.findingCap;
        fields.hstsMaxAge.value = defaults.hstsMaxAge;
        fields.includeCookies.checked = defaults.includeCookies;
        fields.hstsSubdomains.checked = defaults.hstsSubdomains;
        fields.headers.value = defaults.headers;
        fields.policyNotes.value = defaults.policyNotes;
        root.querySelector('input[name="checkHeadersSecurityCustomRadio"][value="Standard"]').checked = true;
        render();
    }

    root.querySelectorAll('input, select, textarea').forEach((control) => {
        control.addEventListener('input', render);
        control.addEventListener('change', () => {
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
    render();
}());
