[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-overview">

<h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

CIS Ubuntu Benchmark 2204 is an InfraStack assessment workspace for browsing the copied Ubuntu 22.04 CIS benchmark script tree. It turns the local <code>assets/bin/</code> inventory into a searchable review surface for <span class="assess-ubuntu-2204-cis-term-accent">control IDs</span>, <span class="assess-ubuntu-2204-cis-term-accent">section paths</span>, declared <span class="assess-ubuntu-2204-cis-term-accent">CRITICALITY</span>, selected shell bodies, and exportable inventory snapshots. <a id="assess-ubuntu-2204-cis-cite-primary" class="assess-ubuntu-2204-cis-citation-link" href="#assess-ubuntu-2204-cis-ref-primary"><span class="assess-ubuntu-2204-cis-citation-inline">Center for Internet Security (n.d.-a)</span></a> publishes the Ubuntu Linux benchmark family, so this workspace cites CIS as the benchmark source while keeping the local script inventory as the reviewed artifact.

<a id="assess-ubuntu-2204-cis-cite-method" class="assess-ubuntu-2204-cis-citation-link" href="#assess-ubuntu-2204-cis-ref-method"><span class="assess-ubuntu-2204-cis-citation-inline">Canonical (2021)</span></a> identifies Ubuntu 22.04 LTS as Jammy Jellyfish and documents its support lifecycle, which anchors the Ubuntu release scope used by this tool.

<a id="assess-ubuntu-2204-cis-cite-review" class="assess-ubuntu-2204-cis-citation-link" href="#assess-ubuntu-2204-cis-ref-review"><span class="assess-ubuntu-2204-cis-citation-inline">Center for Internet Security (n.d.-b)</span></a> documents CIS-CAT Pro Assessor as a tool for comparing target system settings against CIS Benchmarks, so this browser workspace stays honest: it organizes copied controls but does not assess a live host.

The workspace is read-only. It does not run benchmark checks, apply fixes, connect to hosts, or prove compliance. Use it to find the right control script, inspect the source body, copy or download it, and then decide how to test or run it in a controlled Ubuntu shell.

Use it when you need to:

- Browse 297 copied CIS control scripts without walking the folder tree manually
- Filter by family, section path, title, control ID, script filename, or criticality
- Review declared level 1 and level 2 criticality values without treating them as live risk proof
- Review the exact selected shell body before copying it
- Export filtered controls as CSV, JSON, or a printable result view

<div class="assess-ubuntu-2204-cis-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Workspace area</th>
      <th>What it gives you</th>
      <th>What to review before use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Filters</td>
      <td>Family, section path, criticality, query, selected script, sort, and row-limit controls.</td>
      <td>Confirm the filtered scope still contains the controls you intended to review.</td>
    </tr>
    <tr>
      <td>Controls</td>
      <td>A table of matching control IDs, titles, section paths, criticality labels, and script paths.</td>
      <td>Use the control ID and title together; filenames alone can be too terse.</td>
    </tr>
    <tr>
      <td>Sections</td>
      <td>A rollup of matching benchmark paths, depth, child count, and control range.</td>
      <td>Use it to understand where a control sits before narrowing to a single script.</td>
    </tr>
    <tr>
      <td>Script</td>
      <td>The selected local shell file body fetched through a constrained backend endpoint.</td>
      <td>Read the script before running it. Copy-first is not execute-first.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-technical">

<h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-card-checklist" aria-hidden="true"></i><span>Technical Details</span></h2>

The workspace builds one filtered result from the local benchmark catalogue, the current form state, and the selected control. The same result drives the summary cards, Controls table, Sections table, selected Script view, CSV export, and JSON output.

The technical scope stays tied to benchmark and operating-system sources. <a id="assess-ubuntu-2204-cis-cite-technical-primary" class="assess-ubuntu-2204-cis-citation-link" href="#assess-ubuntu-2204-cis-ref-primary"><span class="assess-ubuntu-2204-cis-citation-inline">Center for Internet Security (n.d.-a)</span></a> anchors the benchmark family, <a id="assess-ubuntu-2204-cis-cite-technical-method" class="assess-ubuntu-2204-cis-citation-link" href="#assess-ubuntu-2204-cis-ref-method"><span class="assess-ubuntu-2204-cis-citation-inline">Canonical (2021)</span></a> anchors the Ubuntu 22.04 LTS release scope, and <a id="assess-ubuntu-2204-cis-cite-technical-review" class="assess-ubuntu-2204-cis-citation-link" href="#assess-ubuntu-2204-cis-ref-review"><span class="assess-ubuntu-2204-cis-citation-inline">Center for Internet Security (n.d.-b)</span></a> keeps the boundary clear between a browser catalogue and a live host assessment.

<div class="tool-technical-scan-grid" aria-label="Technical Details quick scan">
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">First scan</span>
    <strong>Read the catalogue before copying.</strong>
    <ul>
      <li>Confirm the family, section, query, selected control, and row limit.</li>
      <li>Treat missing criticality as metadata to inspect, not risk to ignore.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Script path</span>
    <strong>Open the selected shell body.</strong>
    <ul>
      <li>Review whether the script checks, fixes, or changes persistent state.</li>
      <li>Confirm package, service, file, user, group, and permission assumptions before use.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Handoff</span>
    <strong>Export context, not compliance.</strong>
    <ul>
      <li>Use CSV for filtered control lists and JSON for the catalogue snapshot.</li>
      <li>Attach owner, host class, evidence plan, exception policy, and rollback notes outside the export.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Stop line</span>
    <strong>Do not turn browsing into assessment.</strong>
    <ul>
      <li>The browser does not run controls or read a live Ubuntu host.</li>
      <li>Compliance needs controlled execution, evidence review, exceptions, and approval.</li>
    </ul>
  </section>
</div>

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">1. Copied benchmark inventory</h3>

The catalogue is generated from the copied scripts under <code>templates/content/tools/cis/assess-ubuntu-2204-cis/assets/bin/</code> and embedded through <code>assets/custom.json.twig</code>. The current inventory describes 297 shell scripts across 71 section paths and 7 top-level families.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">2. Filter and URL state</h3>

The browser state is derived from the visible controls and synchronized into URL query parameters such as <code>cis_query</code>, <code>cis_family</code>, <code>cis_section</code>, <code>cis_criticality</code>, <code>cis_control</code>, <code>cis_sort</code>, and <code>cis_rows</code>. This supports shareable filtered views without introducing JSON import or restore behavior.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">3. Selected script loading</h3>

The script body is not embedded into the catalogue payload. When a script is selected, the browser posts the relative script path to the Symfony endpoint at <code>/api/cis/assess-ubuntu-2204-cis/script</code>. The endpoint normalizes the path, rejects traversal, limits reads to <code>.sh</code> files under <code>assets/bin/</code>, and returns the selected source body.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">4. Metadata limits</h3>

The copied scripts declare <code>CRITICALITY</code> values that the workspace renders as review labels. The refreshed Ubuntu 22.04 inventory includes level 1 and level 2 controls. It does not infer severity, remap controls, or certify benchmark coverage.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">5. How to read the catalogue</h3>

Read this workspace as a navigation and review layer over a local script set. It helps you find controls, inspect script bodies, group sections, compare metadata, and export a filtered view. It does not decide whether an Ubuntu host is hardened. It does not execute benchmark scripts. It does not inspect packages, services, kernel settings, audit rules, file permissions, users, groups, or running configuration on a server.

That boundary matters. A copied shell script can describe an intended check or remediation, but the host result still depends on the target machine, current package versions, local policy, exceptions, compensating controls, and how the script is run. The browser view gives you order and visibility. Evidence still has to come from the host or from a controlled assessment process.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">6. Filter discipline</h3>

The filter controls are meant to narrow a large benchmark catalogue into a reviewable set. Search is useful when you know a control name, title, command, package, or keyword. Family and section filters are better when the review follows the benchmark structure. Criticality filters are useful for triage, but they should not be treated as a complete risk model because some source scripts have unspecified values.

Sorting and row limits change the visible table, not the underlying catalogue. If a filter returns fewer rows than expected, clear the query before assuming a section has no controls. If a selected control disappears after filter changes, select it again from the current result set so the script view and export match the review context.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">7. Script body handling</h3>

The selected script body is loaded only when requested. The backend endpoint normalizes the submitted relative path and limits reads to local shell files under the tool package. That keeps the page lighter and avoids embedding every script body into the initial catalogue payload. It also keeps path handling explicit instead of trusting arbitrary browser input.

Script display is for reading, copying, and downloading. Treat copied shell as operational material. Review variables, assumptions, package names, service names, filesystem paths, and any command with destructive or persistent effects before use. A script written for one benchmark context may still need local change control, backup, test execution, or approval before it belongs on a production host.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">8. Assessment boundaries</h3>

This workspace does not replace a benchmark scanner, configuration management run, audit program, or compliance platform. It does not compare a live server against every CIS recommendation. It does not prove pass or fail status. It does not know which controls are out of scope for a workload, which exceptions are approved, or which compensating controls an organization accepts.

Use it for preparation and review. A platform engineer can find relevant scripts, inspect shell bodies, and export a filtered list for a change. A security reviewer can compare declared metadata, criticality labels, or areas needing evidence. An operations team can use the section table to plan work by benchmark family. Those are useful tasks, but they are not the same as certification.

<ul class="tool-technical-warning-list">
  <li>Catalogue rows do not prove that packages, services, files, users, groups, permissions, or kernel settings match a benchmark target.</li>
  <li>Copied scripts can still be destructive, persistent, environment-specific, or wrong for the host class under review.</li>
  <li>Exported rows are useful work notes, not audit evidence until a controlled assessment records real host output.</li>
</ul>

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">9. Export and handoff behavior</h3>

CSV is useful for filtered control lists, section summaries, and review notes. JSON is useful when the active filters, selected control metadata, visible rows, and summary counts need to be preserved together. Neither export proves that a host was scanned or remediated. They preserve the workspace state and catalogue view.

When handing off a filtered set, include the target context outside the export: Ubuntu version, host class, environment, exception policy, maintenance window, reviewer, and evidence location. If a control will be executed, pair the copied script with a test plan and rollback plan. If a control is informational, pair it with the evidence expected from the host.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">10. Human review workflow</h3>

Start at the section level. Confirm which top-level benchmark family is in scope, then narrow to the relevant section path. Use search only after the structural scope is clear. Select scripts deliberately and read the source body before copying. The fastest way to misuse a hardening script is to trust a title without reading the command.

Next, separate catalogue completeness from host readiness. Missing criticality metadata is a catalogue issue. A failed package check is a host issue. An approved exception is a governance issue. The workspace can help keep those categories separate by showing filters, sections, selected script content, and export payloads in one place.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">11. Practical review checklist</h3>

Before using a script from the workspace, answer the review questions in the same place as the selected row:

<ul class="tool-technical-checklist">
  <li><strong>Scope:</strong> Confirm the Ubuntu release, host class, benchmark family, section path, and selected control.</li>
  <li><strong>Script:</strong> Decide whether the body is an audit check, remediation action, helper, or mixed shell workflow.</li>
  <li><strong>Evidence:</strong> Define what output should be captured before and after any controlled execution.</li>
  <li><strong>Change:</strong> Name the approval path, maintenance window, rollback plan, and exception owner when needed.</li>
  <li><strong>Decision:</strong> Mark the next action as inspect, test, remediate, defer, except, or close with evidence.</li>
</ul>

The final output should make the next action clear: inspect more scripts, export a filtered evidence list, copy a specific script for controlled testing, record a metadata gap, or hand a section to the owner. That is the useful level for this tool. It turns a large local benchmark tree into a reviewable working surface without pretending to be the host assessment itself.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">12. Change-control context</h3>

Hardening work touches running systems, so catalogue review should be connected to change control. Before a script is used outside a lab, record whether it only checks state or whether it modifies packages, files, services, kernel parameters, audit rules, users, groups, permissions, or authentication behavior. That distinction determines who must approve the action and what evidence should be captured.

Some controls are straightforward on a fresh server and risky on a long-lived workload. A service that should be disabled in a baseline might still support a legacy process. A filesystem option might require a reboot or maintenance window. A permission change might affect application startup. The workspace cannot know those local dependencies. It can only make the script easy to inspect before someone applies it.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">13. Evidence and exception handling</h3>

When a control is accepted, rejected, or deferred, keep the reason near the exported row. Good notes say whether the decision came from successful evidence, approved exception, compensating control, business constraint, or missing data. Weak notes say "not applicable" with no owner and no date. Future reviewers deserve better than that.

Use unspecified criticality as a signal to inspect, not as an excuse to ignore. If the control matters to the environment, assign a local severity or review priority during the assessment process. If it does not apply, record why. The tool is strongest when it helps the team separate real security work from catalogue noise.

Final review should end with an owner, a decision, and an evidence path. If the row is ready for testing, say who tests it, where they test it, and what output proves success. If the row is deferred, say why and when it returns. If the row is an exception, link the approval and expiry date. Catalogue work becomes useful when it leaves fewer unnamed decisions behind for the next engineer who has to trust the record during audit or change.

<h3 class="assess-ubuntu-2204-cis-technical-step-heading">14. Result and export model</h3>

<div class="assess-ubuntu-2204-cis-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Output</th>
      <th>Backed by</th>
      <th>Boundary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Catalogue</td>
      <td>Copied shell scripts, derived control IDs, section paths, titles, and optional criticality values.</td>
      <td>The local file still needs mapping to the benchmark control and local policy scope.</td>
    </tr>
    <tr>
      <td>Selection</td>
      <td>Family, section, query, row limit, sort, and selected script state.</td>
      <td>The filtered set still needs host class, exception policy, and change-window context.</td>
    </tr>
    <tr>
      <td>Controls table</td>
      <td>Filtered local catalogue rows.</td>
      <td>The visible row limit affects the table only; selected script choices still come from the full match set.</td>
    </tr>
    <tr>
      <td>Sections table</td>
      <td>Section rollups calculated from the filtered controls.</td>
      <td>Empty sections can exist in the catalogue when no copied script lives under that path.</td>
    </tr>
    <tr>
      <td>Selected script</td>
      <td>Constrained backend read of one local <code>.sh</code> file.</td>
      <td>It is displayed for review, copy, and download only; the browser does not execute it.</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>Benchmark metadata, active filters, summary counts, selected control metadata, controls, and visible sections.</td>
      <td>JSON is a snapshot export. JSON import and restore are not implemented.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-example-commands">

<h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>

<p>These examples show the shell workflow for taking a copied CIS control script from the Script tab and running it manually on a target host.</p>

<pre class="assess-ubuntu-2204-cis-command-example-pre"><code class="language-bash">vi script.sh</code></pre>

<details class="cisbench-command-note assess-ubuntu-2204-cis-command-note" open>
  <summary>
    <span class="cisbench-command-note-label cisbench-command-note-label-closed">Show use</span>
    <span class="cisbench-command-note-label cisbench-command-note-label-open">Hide use</span>
    <button type="button" class="assess-ubuntu-2204-cis-command-copy-btn" data-command-copy-index="0">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy command</span>
    </button>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-pencil-square fs-5" aria-hidden="true"></i>
    <div><strong>Create:</strong> Start a local shell script file that will hold the copied CIS control body.</div>
  </div>
</details>

<pre class="assess-ubuntu-2204-cis-command-example-pre"><code class="language-bash">#!/bin/sh

CRITICALITY=1
TITLE="Ensure cramfs kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v cramfs 2&gt;&amp;1 | grep -E "install" &gt; /dev/null

    if [ $? == 0 ]; then
        lsmod 2&gt;&amp;1 | grep cramfs &gt; /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install cramfs /bin/true" | tee -a /etc/modprobe.d/cramfs.conf &gt; /dev/null
}</code></pre>

<details class="cisbench-command-note">
  <summary>
    <span class="cisbench-command-note-label cisbench-command-note-label-closed">Show use</span>
    <span class="cisbench-command-note-label cisbench-command-note-label-open">Hide use</span>
    <button type="button" class="assess-ubuntu-2204-cis-command-copy-btn" data-command-copy-index="1">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy script</span>
    </button>
  </summary>
  <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-clipboard-data fs-5" aria-hidden="true"></i>
    <div><strong>Paste:</strong> Paste the copied control script exactly as shown in the Script tab, then save the file.</div>
  </div>
</details>

<pre class="assess-ubuntu-2204-cis-command-example-pre"><code class="language-bash">chmod +x script.sh</code></pre>

<details class="cisbench-command-note">
  <summary>
    <span class="cisbench-command-note-label cisbench-command-note-label-closed">Show use</span>
    <span class="cisbench-command-note-label cisbench-command-note-label-open">Hide use</span>
    <button type="button" class="assess-ubuntu-2204-cis-command-copy-btn" data-command-copy-index="2">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy command</span>
    </button>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-shield-check fs-5" aria-hidden="true"></i>
    <div><strong>Permit:</strong> Mark the copied script as executable before trying to run it.</div>
  </div>
</details>

<pre class="assess-ubuntu-2204-cis-command-example-pre"><code class="language-bash">./script.sh</code></pre>

<details class="cisbench-command-note">
  <summary>
    <span class="cisbench-command-note-label cisbench-command-note-label-closed">Show use</span>
    <span class="cisbench-command-note-label cisbench-command-note-label-open">Hide use</span>
    <button type="button" class="assess-ubuntu-2204-cis-command-copy-btn" data-command-copy-index="3">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy command</span>
    </button>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-play-circle fs-5" aria-hidden="true"></i>
    <div><strong>Execute:</strong> Run the copied CIS control script in the local shell and review its output before deciding whether to apply fixes.</div>
  </div>
</details>

</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-prompt-tips assess-ubuntu-2204-cis-markdown-card-input-tips">

<h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Input Tips</span></h2>

<p>The explorer works best when the filter scope is explicit. Start broad enough to see context, then narrow to one selected script before copying.</p>

<details class="tool-guidance-item" open>
<summary><i class="bi bi-funnel tool-guidance-icon" aria-hidden="true"></i> <span>Start with the benchmark family</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Use the top-level section when you already know the area, such as initial setup, services, network, firewall, access control, logging, or maintenance.</li>
<li>Use Section path when you want one nested benchmark branch instead of the full family.</li>
<li>Reset the section path after changing family if the result set looks unexpectedly narrow.</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-search tool-guidance-icon" aria-hidden="true"></i> <span>Use query for exact jumps</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Search by control ID when you know the benchmark number.</li>
<li>Search by title terms such as <code>auditd</code>, <code>ssh</code>, <code>pam</code>, <code>cramfs</code>, or <code>iptables</code>.</li>
<li>Search by script filename only when the folder naming is already familiar.</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-shield-exclamation tool-guidance-icon" aria-hidden="true"></i> <span>Review before execution</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Open the Script tab and read the selected shell body before copying it.</li>
<li>Check whether the script includes both <code>check</code> and <code>fix</code> functions or only one operational path.</li>
<li>Run copied scripts manually on an appropriate Ubuntu 22.04 host, with your own backup, rollback, and change-control process.</li>
</ul>
</div>
</details>

</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-how-to">
  <h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-list-check assess-ubuntu-2204-cis-section-heading-icon" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to narrow the benchmark catalogue into a reviewable script and export set. The page organizes the work; it does not run checks for you.</p>

  <details class="tool-guidance-item" open>
    <summary><i class="bi bi-funnel tool-guidance-icon" aria-hidden="true"></i> <span>1. Choose the benchmark scope</span></summary>
    <div class="tool-guidance-answer">
      <p>Select the benchmark family, section, profile, severity, status, and result limit that match the review you want to run.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><i class="bi bi-search tool-guidance-icon" aria-hidden="true"></i> <span>2. Filter and explore controls</span></summary>
    <div class="tool-guidance-answer">
      <p>Add a control or keyword filter when needed, then run <code>Explore Controls</code> to build the matched control table, section rollups, and selected script view.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><i class="bi bi-file-earmark-code tool-guidance-icon" aria-hidden="true"></i> <span>3. Review selected script and evidence</span></summary>
    <div class="tool-guidance-answer">
      <p>Open a control row and inspect the selected script, metadata, rationale, and result context before copying it into an operations or review workflow.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><i class="bi bi-clipboard-check tool-guidance-icon" aria-hidden="true"></i> <span>4. Copy or download review artifacts</span></summary>
    <div class="tool-guidance-answer">
      <p>Use <code>Copy script</code>, <code>Download script</code>, row copy actions, and CSV export to move exact review material into tickets, runbooks, or evidence notes.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><i class="bi bi-download tool-guidance-icon" aria-hidden="true"></i> <span>5. Export the assessment snapshot</span></summary>
    <div class="tool-guidance-answer">
      <p>Use <code>Export PDF</code>, <code>Download CSV</code>, <code>Copy JSON</code>, or <code>Download JSON</code> to preserve what the assessment explorer displayed for this review.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->
<!-- ns:start main.content.06_export-notes -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-export">
  <h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-download assess-ubuntu-2204-cis-section-heading-icon" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The workspace supports several copy and export paths, but they do not preserve the same information.</p>

<details class="tool-export-item" open>
  <summary><i class="bi bi-clipboard tool-export-icon" aria-hidden="true"></i> <span>Copy script</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Copy script</code> when you need the selected shell body in a note, terminal buffer, or change review.</p>
    <p>The copied value is the script body currently loaded in the Script tab.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-file-earmark-code tool-export-icon" aria-hidden="true"></i> <span>Download script</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Download script</code> when you want the selected <code>.sh</code> file body as a local artifact.</p>
    <p>Downloading does not make the script safe to run. Review the body and target host first.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-file-earmark-pdf tool-export-icon" aria-hidden="true"></i> <span>Export PDF</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Export PDF</code> for a printable snapshot of the current result panel.</p>
    <p>PDF captures the visible review surface. It does not preserve interactive filter state.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-table tool-export-icon" aria-hidden="true"></i> <span>Download CSV</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Download CSV</code> when filtered controls need spreadsheet review or attachment to a ticket.</p>
    <p>The CSV includes filtered control rows, not an executable benchmark run.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-braces tool-export-icon" aria-hidden="true"></i> <span>Copy JSON / Download JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Copy JSON</code> or <code>Download JSON</code> when you need a structured benchmark review snapshot.</p>
    <ul>
      <li>Benchmark metadata</li>
      <li>Active filters</li>
      <li>Summary counts</li>
      <li>Selected control metadata</li>
      <li>Visible sections and controls</li>
    </ul>
    <p>JSON is a review snapshot in this tool. JSON import and restore are not implemented.</p>
  </div>
</details>
</div>
<!-- ns:end main.content.06_export-notes -->


<!-- ns:start main.content.07_faq -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-faq">

<h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>

<p>Use these answers to keep the page honest about what it is: a benchmark-script explorer, not a live host assessor.</p>

<details class="faq-item" open>
  <summary>Does this page run CIS checks from the browser?</summary>
  <div class="faq-answer">
    No. It renders the copied benchmark inventory and selected script body. Execution still belongs in a shell on the target Ubuntu host.
  </div>
</details>

<details class="faq-item">
  <summary>Does this prove the host is compliant?</summary>
  <div class="faq-answer">
    No. It is a benchmark-script explorer. Compliance or hardening status requires controlled execution, evidence review, exceptions, and operational approval outside this page.
  </div>
</details>

<details class="faq-item">
  <summary>What do the criticality labels mean?</summary>
  <div class="faq-answer">
    They are copied script metadata from <code>CRITICALITY</code> declarations. The workspace renders those labels for review, but it does not turn them into live risk, compliance, or pass/fail evidence.
  </div>
</details>

<details class="faq-item">
  <summary>Why can the controls table show fewer rows than the match count?</summary>
  <div class="faq-answer">
    The visible row limit only affects the rendered table. The selected script picker and CSV export still work from the full filtered match set.
  </div>
</details>

<details class="faq-item">
  <summary>Can JSON restore the explorer later?</summary>
  <div class="faq-answer">
    No. JSON is currently a structured export snapshot. The filter state itself is preserved in URL query parameters.
  </div>
</details>

<details class="faq-item">
  <summary>Why use the Script tab instead of opening files manually?</summary>
  <div class="faq-answer">
    The Script tab keeps filtering context, selected metadata, and the exact local shell body in one place. It saves tree-walking when one control is the target.
  </div>
</details>

</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.08_acronyms -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-acronyms">

<h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-type" aria-hidden="true"></i><span>Acronyms</span></h2>

<div class="assess-ubuntu-2204-cis-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Term</th>
      <th>Meaning</th>
      <th>Why it matters in this tool</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CIS</td>
      <td>Center for Internet Security.</td>
      <td>The copied script tree follows CIS-style benchmark control organization.</td>
    </tr>
    <tr>
      <td>Control ID</td>
      <td>The benchmark identifier derived from a copied script filename, such as <code>1.1.1.1</code> or <code>5.1.20</code>.</td>
      <td>Use it for exact lookup and review notes.</td>
    </tr>
    <tr>
      <td>Section path</td>
      <td>The nested folder path that places a control inside the copied benchmark tree.</td>
      <td>Use it to narrow the review to one benchmark branch.</td>
    </tr>
    <tr>
      <td>CRITICALITY</td>
      <td>A metadata variable declared by the copied shell scripts.</td>
      <td>Use it as source metadata only; do not treat labels as live risk proof.</td>
    </tr>
    <tr>
      <td>CSV</td>
      <td>Comma-separated values.</td>
      <td>Use it when the filtered control inventory needs spreadsheet review.</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>JavaScript Object Notation.</td>
      <td>Use it as a structured export snapshot. It is not a restore format here.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.08_acronyms -->

<!-- ns:start main.content.10_references -->
<div class="content-card assess-ubuntu-2204-cis-markdown-card assess-ubuntu-2204-cis-markdown-card-citations">

<h2 class="assess-ubuntu-2204-cis-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>

<p>These sources support the in-text citations used in this tool page.</p>

<table class="assess-ubuntu-2204-cis-citation-table">
  <thead>
    <tr>
      <th>Source type</th>
      <th>In-text citation</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr id="assess-ubuntu-2204-cis-ref-primary">
      <td>Benchmark website</td>
      <td><a class="assess-ubuntu-2204-cis-citation-backlink" href="#assess-ubuntu-2204-cis-cite-primary"><span class="assess-ubuntu-2204-cis-citation-inline">(Center for Internet Security, n.d.-a)</span></a></td>
      <td>Center for Internet Security. (n.d.-a). <em>Ubuntu Linux Benchmarks</em>. Retrieved May 13, 2026, from <a href="https://www.cisecurity.org/benchmark/ubuntu_linux">https://www.cisecurity.org/benchmark/ubuntu_linux</a></td>
    </tr>
    <tr id="assess-ubuntu-2204-cis-ref-method">
      <td>Release notes</td>
      <td><a class="assess-ubuntu-2204-cis-citation-backlink" href="#assess-ubuntu-2204-cis-cite-method"><span class="assess-ubuntu-2204-cis-citation-inline">(Canonical, 2021)</span></a></td>
      <td>Canonical. (2021, October 15). <em>Jammy Jellyfish Release Notes</em>. Ubuntu Community Hub. <a href="https://discourse.ubuntu.com/t/jammy-jellyfish-release-notes/24668">https://discourse.ubuntu.com/t/jammy-jellyfish-release-notes/24668</a></td>
    </tr>
    <tr id="assess-ubuntu-2204-cis-ref-review">
      <td>Assessment tool website</td>
      <td><a class="assess-ubuntu-2204-cis-citation-backlink" href="#assess-ubuntu-2204-cis-cite-review"><span class="assess-ubuntu-2204-cis-citation-inline">(Center for Internet Security, n.d.-b)</span></a></td>
      <td>Center for Internet Security. (n.d.-b). <em>About CIS-CAT Pro Assessor v4</em>. Retrieved May 13, 2026, from <a href="https://ciscat-assessor.docs.cisecurity.org/en/latest/About/">https://ciscat-assessor.docs.cisecurity.org/en/latest/About/</a></td>
    </tr>
  </tbody>
</table>

</div>
<!-- ns:end main.content.10_references -->
