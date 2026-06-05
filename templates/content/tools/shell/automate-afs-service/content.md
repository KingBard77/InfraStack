[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card automate-afs-service-markdown-card automate-afs-service-markdown-card-overview">
  <h2 class="automate-afs-service-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

  <p>AFS Service Automation builds a reviewed command for the IaS <code>service-afs.sh</code> script. In this workspace, AFS follows the local service script name and means an NFS export service workflow, not a Linux automounter workflow.</p>

  <p>The tool keeps the action flag, execution mode, export path, exports file, client subnet, NFS options, debug level, delete guard, generated command, export line, operation rows, warnings, CSV, and JSON in one normalized payload. It only generates a command; it does not execute the service script from the browser.</p>

  <table>
    <thead>
      <tr>
        <th>Workspace area</th>
        <th>What it produces</th>
        <th>Review before use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Service action</td>
        <td><code>-i</code>, <code>-c</code>, <code>-r</code>, or <code>-d</code> for install, check, remove, or delete.</td>
        <td>Confirm the target host should run the selected service workflow.</td>
      </tr>
      <tr>
        <td>NFS export model</td>
        <td>Generated <code>/etc/exports</code> line from path, subnet, and option inputs.</td>
        <td>Confirm the subnet, write access, and root mapping choices.</td>
      </tr>
      <tr>
        <td>Output review</td>
        <td>Command, environment table, operation rows, warnings, CSV, PDF, JSON, and JSON restore.</td>
        <td>Use <code>test</code> mode first before copying a live host-changing command.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card automate-afs-service-markdown-card automate-afs-service-markdown-card-technical">
  <h2 class="automate-afs-service-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <p>The local <code>service-afs.sh</code> script is the operational source of truth for this workspace. The script exposes four actions: install, check, remove, and delete. Install updates package metadata, installs <code>nfs-kernel-server</code>, creates the export path when needed, sets ownership and permissions, appends an export line, reloads exports, restarts the service, enables it, and cleans package cache. Check inspects package presence, export path, export file, expected export line, service activity, and exported paths. Remove deletes the matching export line, reloads exports, stops and disables the service, removes the package, and keeps the export path. Delete runs the remove flow and removes the export path only when live delete is confirmed or when <code>test</code> mode is used for preview.</p>

  <p>The generated command writes values through environment variables because the service script sets <code>IS_REMOTE=TRUE</code>, so its local <code>conf/setup.conf</code> path is skipped. The tool therefore emits <code>AFS_EXPORT_PATH</code>, <code>AFS_CONF_EXPORT</code>, <code>AFS_CONF_SUBNET</code>, <code>AFS_CONF_OPTIONS</code>, <code>DEBUG</code>, and <code>ENABLE_DEBUG</code> directly in the command. For live delete, it also emits <code>CONFIRM_DELETE=TRUE</code>. That keeps the command self-contained for review, while still using the script's existing argument parser and action functions.</p>

  <p>NFS export behavior is governed by the exports file grammar and export management tools on the target host. The <a id="automate-afs-service-cite-exports" class="automate-afs-service-citation-link" href="#automate-afs-service-ref-exports"><span class="automate-afs-service-citation-inline">Linux man-pages project (2025a)</span></a> documents the <code>exports</code> file as the access-control file used by NFS server export configuration. The <a id="automate-afs-service-cite-exportfs" class="automate-afs-service-citation-link" href="#automate-afs-service-ref-exportfs"><span class="automate-afs-service-citation-inline">Linux man-pages project (2025b)</span></a> documents <code>exportfs</code> as the administrative command used to maintain the NFS export table. Ubuntu's server documentation also describes installing and configuring an NFS server through the <code>nfs-kernel-server</code> package and export configuration files <a id="automate-afs-service-cite-ubuntu" class="automate-afs-service-citation-link" href="#automate-afs-service-ref-ubuntu"><span class="automate-afs-service-citation-inline">Canonical (n.d.)</span></a>.</p>

  <table>
    <thead>
      <tr>
        <th>Generated input</th>
        <th>Script variable or argument</th>
        <th>Operational effect</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Service action</td><td><code>-i</code>, <code>-c</code>, <code>-r</code>, <code>-d</code></td><td>Selects install, check, remove, or delete in the script dispatcher.</td></tr>
      <tr><td>Mode</td><td><code>test</code>, <code>sudo</code>, or default</td><td>Controls whether script commands print only, use sudo internally, or run as root.</td></tr>
      <tr><td>Export path</td><td><code>AFS_EXPORT_PATH</code></td><td>Directory exported and optionally deleted by the service workflow.</td></tr>
      <tr><td>Exports file</td><td><code>AFS_CONF_EXPORT</code></td><td>File that receives or loses the generated export line.</td></tr>
      <tr><td>Subnet</td><td><code>AFS_CONF_SUBNET</code></td><td>Client network allowed to access the export.</td></tr>
      <tr><td>NFS options</td><td><code>AFS_CONF_OPTIONS</code></td><td>Options placed inside the generated export line.</td></tr>
      <tr><td>Delete guard</td><td><code>CONFIRM_DELETE=TRUE</code></td><td>Allows live delete to remove the export path.</td></tr>
    </tbody>
  </table>

  <h3 class="automate-afs-service-technical-step-heading">1. Command Shape And Script Contract</h3>
  <p>The command starts with <code>env</code> assignments, then invokes <code>bash -x</code> against the configured script path, then appends the script action flag and optional <code>-e</code> environment label. The generated token order mirrors the script parser: action flags are parsed first, <code>-e</code> consumes the next value, and positional modes such as <code>test</code> or <code>sudo</code> are parsed as plain arguments. That matters because shell tools should preserve the command grammar expected by the target script rather than inventing a wrapper syntax.</p>
  <p>The default generated path points to <code>/Users/badrulamin/Dropbox/Project/IaS/service/service-afs/Workspace/service-afs/service-afs.sh</code>. The field remains editable because operators may run from a mounted workspace, a checked-out copy, or a different service path. The tool validates that the path is absolute and warns when it does not end in <code>service-afs.sh</code>. It does not validate that the path exists on the current browser machine or on a remote service host.</p>
  <ul>
    <li>Use <code>test</code> mode to inspect the script's own command preview.</li>
    <li>Use default mode only when the shell context is already root or when the generated <code>sudo env</code> prefix is appropriate.</li>
    <li>Use script <code>sudo</code> mode when you want the script helper to run mutating commands through sudo internally.</li>
  </ul>

  <h3 class="automate-afs-service-technical-step-heading">2. NFS Export Line Review</h3>
  <p>The export line is built as <code>AFS_EXPORT_PATH AFS_CONF_SUBNET(AFS_CONF_OPTIONS)</code>. For the default inputs, that becomes <code>/exportfs/etc/sudoers 172.16.64.0/24(rw,sync,no_subtree_check,no_root_squash)</code>. The script appends this line when install runs and the export path is not already present in the exports file. Check mode compares the exact expected line, so a small option or subnet change can cause a check warning even when the path exists.</p>
  <p>Options deserve explicit review. <code>rw</code> allows client writes. <code>sync</code> asks the server to reply after changes have been committed according to the server's NFS behavior. <code>no_subtree_check</code> avoids subtree verification behavior. <code>no_root_squash</code> changes the usual root mapping expectation and can be powerful on shared infrastructure. The tool surfaces warnings for <code>rw</code> and <code>no_root_squash</code>, but it cannot prove the options are correct for a particular service host.</p>
  <ul>
    <li>Keep the subnet as narrow as the service requirement allows.</li>
    <li>Review write access and root mapping before live install.</li>
    <li>Confirm any existing exports file entries before removing or replacing them.</li>
  </ul>

  <h3 class="automate-afs-service-technical-step-heading">3. Install, Check, Remove, And Delete Boundaries</h3>
  <p>Install and remove are host-changing actions. Install can install packages, create directories, write <code>/etc/exports</code>, reload exports, restart the NFS server, and enable the service. Remove can rewrite the exports file, reload exports, stop the service, disable it, and remove the package. Delete is more destructive because it calls remove and then deletes the export path with <code>rm -rf --</code>. The generated command blocks live delete unless the delete guard checkbox is selected, matching the script's <code>CONFIRM_DELETE=TRUE</code> requirement.</p>
  <p>Check mode is the safest operational read path, but it still depends on the target host's package database, systemd state, filesystem, and export table. It can report that package, path, export line, service state, or exportfs output does not match the generated model. That is evidence to investigate, not proof that a repair should be executed immediately. A different service role, an alternate export file, or a deliberately different subnet may make a mismatch expected.</p>
  <ul>
    <li>Use install only for a host that should run the NFS export service.</li>
    <li>Use remove when package and service removal is intended but the export directory should stay.</li>
    <li>Use delete only when the export path data is safe to remove.</li>
  </ul>

  <h3 class="automate-afs-service-technical-step-heading">4. Environment Payload And Restore Data</h3>
  <p>The environment payload table makes each generated assignment copyable. This is useful when an operator wants to run the same script manually, move values into a deployment runner, or compare two generated states. The JSON output records the same normalized state, generated command, export line, operation rows, warning rows, and timestamps. The import control restores that state back into the form and regenerates the output. That makes JSON a real restore path, not only a documentation artifact.</p>
  <p>The URL state intentionally stores only low-risk workflow selectors: action, mode, environment label, and debug level. It does not write the full export path, subnet, options, or script path into the browser URL. Those values stay in JSON export when a full restore artifact is needed. This split keeps a short review URL useful without turning every command detail into query-string state.</p>
  <ul>
    <li>Use CSV for checklist-style review of rows and warnings.</li>
    <li>Use JSON when the exact command state should be restored later.</li>
    <li>Use PDF only as a printable review artifact; it does not prove the command ran.</li>
  </ul>

  <h3 class="automate-afs-service-technical-step-heading">5. Runtime Trust Boundary</h3>
  <p>The browser can validate syntax, build a command, and align the command with visible rows. It cannot inspect the target host, verify package state, read <code>/etc/exports</code>, prove the NFS service is healthy, prove a client can mount the export, or roll back a destructive path deletion. The service script owns those host-side effects after the command leaves InfraStack. This is why the tool keeps warnings next to the command and defaults to test preview mode.</p>
  <p>A practical workflow is to generate the command in test mode, copy it to the intended service host, inspect the printed commands, run check mode, and only then choose a live install, remove, or delete command. For shared environments, pair the generated command with peer review of the subnet, exported path, and options. For delete, confirm whether the export path contains generated data, source data, or a mounted path before allowing <code>CONFIRM_DELETE=TRUE</code>.</p>
  <ul>
    <li>Do not treat generated output as service validation.</li>
    <li>Do not run live remove or delete from an unreviewed terminal history entry.</li>
    <li>Keep host-side verification close to the actual service host and client subnet.</li>
  </ul>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card automate-afs-service-markdown-card automate-afs-service-markdown-card-command-tips">
  <h2 class="automate-afs-service-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Command Tips</span></h2>
  <p>Use these checks before applying a generated service command to a real host.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span> <span>Start with test mode</span></summary>
    <div class="tool-guidance-answer">
      <p><code>test</code> mode asks the script to print the commands it would run. Keep it as the first review step for install, remove, and delete.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-hdd-network" aria-hidden="true"></i></span> <span>Review the export line</span></summary>
    <div class="tool-guidance-answer">
      <p>Confirm the path, subnet, and options match the intended service host. Small differences change what check mode expects.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-exclamation-triangle" aria-hidden="true"></i></span> <span>Treat delete as destructive</span></summary>
    <div class="tool-guidance-answer">
      <p>Live delete emits <code>CONFIRM_DELETE=TRUE</code> and lets the script remove the export path. Use it only after checking the path content.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-check" aria-hidden="true"></i></span> <span>Keep write access deliberate</span></summary>
    <div class="tool-guidance-answer">
      <p><code>rw</code> and <code>no_root_squash</code> are useful in specific environments, but both should be intentional and reviewed.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card automate-afs-service-markdown-card automate-afs-service-markdown-card-how-to">
  <h2 class="automate-afs-service-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to convert the AFS service script contract into a copy-ready command review.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-1-circle" aria-hidden="true"></i></span> <span>Choose the action and mode</span></summary>
    <div class="tool-guidance-answer">
      <p>Select install, check, remove, or delete. Keep <code>test</code> mode selected until the generated preview is reviewed.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-2-circle" aria-hidden="true"></i></span> <span>Set the export model</span></summary>
    <div class="tool-guidance-answer">
      <p>Set the export path, exports file, subnet, options, environment label, and debug level for the target service host.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-3-circle" aria-hidden="true"></i></span> <span>Generate and inspect</span></summary>
    <div class="tool-guidance-answer">
      <p>Review the generated command, export line, environment payload, operation rows, and warnings before copying.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-4-circle" aria-hidden="true"></i></span> <span>Export or restore</span></summary>
    <div class="tool-guidance-answer">
      <p>Use CSV or PDF for review. Use JSON when you need to restore the exact generated state later.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card automate-afs-service-markdown-card automate-afs-service-markdown-card-export">
  <h2 class="automate-afs-service-section-heading"><i class="bi bi-download" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The export controls document the generated command review. They do not execute, validate, or approve the service workflow.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i></span> <span>Export PDF</span></summary>
    <div class="tool-export-answer">
      <p>Opens the browser print flow for a readable command review artifact.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>Download CSV</span></summary>
    <div class="tool-export-answer">
      <p>Downloads command, export, environment, operation, and warning rows for checklist review.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span> <span>Copy or download JSON</span></summary>
    <div class="tool-export-answer">
      <p>Copies or downloads the normalized state, generated command, export line, operation rows, and warning rows.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-upload" aria-hidden="true"></i></span> <span>Import JSON</span></summary>
    <div class="tool-export-answer">
      <p>Restores a previously exported state into the form and regenerates the AFS service command output.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card automate-afs-service-markdown-card automate-afs-service-markdown-card-examples automate-afs-service-markdown-card-commands">
  <h2 class="automate-afs-service-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>
  <p>Use these examples as command shapes. Adjust paths, subnet, options, and mode for the real service host.</p>

  <pre class="automate-afs-service-command-pre"><code>env DEBUG='1' ENABLE_DEBUG='1' AFS_EXPORT_PATH='/exportfs/etc/sudoers' AFS_CONF_EXPORT='/etc/exports' AFS_CONF_SUBNET='172.16.64.0/24' AFS_CONF_OPTIONS='rw,sync,no_subtree_check,no_root_squash' bash -x '/Users/badrulamin/Dropbox/Project/IaS/service/service-afs/Workspace/service-afs/service-afs.sh' -i -e 'lab' test</code></pre>
  <details class="automate-afs-service-command-note">
    <summary>
      <span class="automate-afs-service-command-note-label automate-afs-service-command-note-label-closed">Show command use</span>
      <span class="automate-afs-service-command-note-label automate-afs-service-command-note-label-open">Hide command use</span>
      <button type="button" class="automate-afs-service-command-copy-btn" data-command-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Install preview:</strong> Prints package, export, exportfs, and service commands without changing the host.</div></div>
  </details>

  <pre class="automate-afs-service-command-pre"><code>env DEBUG='1' ENABLE_DEBUG='1' AFS_EXPORT_PATH='/exportfs/etc/sudoers' AFS_CONF_EXPORT='/etc/exports' AFS_CONF_SUBNET='172.16.64.0/24' AFS_CONF_OPTIONS='rw,sync,no_subtree_check,no_root_squash' bash -x '/Users/badrulamin/Dropbox/Project/IaS/service/service-afs/Workspace/service-afs/service-afs.sh' -c -e 'lab'</code></pre>
  <details class="automate-afs-service-command-note">
    <summary>
      <span class="automate-afs-service-command-note-label automate-afs-service-command-note-label-closed">Show command use</span>
      <span class="automate-afs-service-command-note-label automate-afs-service-command-note-label-open">Hide command use</span>
      <button type="button" class="automate-afs-service-command-copy-btn" data-command-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Check run:</strong> Inspects package, export file, export line, service state, and exportfs output.</div></div>
  </details>

  <pre class="automate-afs-service-command-pre"><code>env DEBUG='1' ENABLE_DEBUG='1' AFS_EXPORT_PATH='/exportfs/etc/sudoers' AFS_CONF_EXPORT='/etc/exports' AFS_CONF_SUBNET='172.16.64.0/24' AFS_CONF_OPTIONS='rw,sync,no_subtree_check,no_root_squash' bash -x '/Users/badrulamin/Dropbox/Project/IaS/service/service-afs/Workspace/service-afs/service-afs.sh' -r -e 'lab' test</code></pre>
  <details class="automate-afs-service-command-note">
    <summary>
      <span class="automate-afs-service-command-note-label automate-afs-service-command-note-label-closed">Show command use</span>
      <span class="automate-afs-service-command-note-label automate-afs-service-command-note-label-open">Hide command use</span>
      <button type="button" class="automate-afs-service-command-copy-btn" data-command-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Remove preview:</strong> Shows the export-line removal, exportfs reload, service stop, package removal, and cleanup commands.</div></div>
  </details>

  <pre class="automate-afs-service-command-pre"><code>sudo env DEBUG='1' ENABLE_DEBUG='1' AFS_EXPORT_PATH='/exportfs/etc/sudoers' AFS_CONF_EXPORT='/etc/exports' AFS_CONF_SUBNET='172.16.64.0/24' AFS_CONF_OPTIONS='rw,sync,no_subtree_check,no_root_squash' CONFIRM_DELETE='TRUE' bash -x '/Users/badrulamin/Dropbox/Project/IaS/service/service-afs/Workspace/service-afs/service-afs.sh' -d -e 'lab'</code></pre>
  <details class="automate-afs-service-command-note">
    <summary>
      <span class="automate-afs-service-command-note-label automate-afs-service-command-note-label-closed">Show command use</span>
      <span class="automate-afs-service-command-note-label automate-afs-service-command-note-label-open">Hide command use</span>
      <button type="button" class="automate-afs-service-command-copy-btn" data-command-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-danger d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Live delete:</strong> Removes the service setup and export path. Use only after reviewing the path contents.</div></div>
  </details>
</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.07_faq -->
<div class="content-card automate-afs-service-markdown-card automate-afs-service-markdown-card-faq">
  <h2 class="automate-afs-service-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>These answers clarify what the workspace generates and where the runtime boundary sits.</p>

  <details class="faq-item" open>
    <summary><span>Is this a Linux automounter tool?</span></summary>
    <div class="faq-answer">
      <p>No. The current source script is named <code>service-afs.sh</code>, but its behavior is NFS export server automation using <code>nfs-kernel-server</code>, <code>/etc/exports</code>, <code>exportfs</code>, and <code>systemctl</code>.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Does the browser run the service script?</span></summary>
    <div class="faq-answer">
      <p>No. InfraStack generates the command, output rows, warnings, and export artifacts. The command runs only if an operator copies it to a shell.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Why is <code>test</code> mode the default?</span></summary>
    <div class="faq-answer">
      <p>Install, remove, and delete can change packages, files, exports, services, or directories. <code>test</code> mode lets the script print its planned commands first.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Why does delete need a checkbox?</span></summary>
    <div class="faq-answer">
      <p>The source script blocks live delete unless <code>CONFIRM_DELETE=TRUE</code> is present. The checkbox makes that destructive guard explicit in the generated command.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Can JSON restore the form?</span></summary>
    <div class="faq-answer">
      <p>Yes. JSON import restores the normalized state and regenerates the output, including command, export line, operation rows, and warnings.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.10_references -->
<div class="content-card automate-afs-service-markdown-card automate-afs-service-markdown-card-citations">
  <h2 class="automate-afs-service-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>

  <table class="automate-afs-service-citation-table">
    <thead>
      <tr>
        <th>Ref</th>
        <th>Source</th>
        <th>Used for</th>
      </tr>
    </thead>
    <tbody>
      <tr id="automate-afs-service-ref-exports">
        <td><a class="automate-afs-service-citation-backlink" href="#automate-afs-service-cite-exports">[1]</a></td>
        <td>Linux man-pages project. (2025a). <em>exports(5): NFS server export table</em>. man7.org. <a href="https://man7.org/linux/man-pages/man5/exports.5.html">https://man7.org/linux/man-pages/man5/exports.5.html</a></td>
        <td>Exports file grammar and NFS export configuration context.</td>
      </tr>
      <tr id="automate-afs-service-ref-exportfs">
        <td><a class="automate-afs-service-citation-backlink" href="#automate-afs-service-cite-exportfs">[2]</a></td>
        <td>Linux man-pages project. (2025b). <em>exportfs(8): maintain table of exported NFS file systems</em>. man7.org. <a href="https://man7.org/linux/man-pages/man8/exportfs.8.html">https://man7.org/linux/man-pages/man8/exportfs.8.html</a></td>
        <td>Export table reload and administrative command context.</td>
      </tr>
      <tr id="automate-afs-service-ref-ubuntu">
        <td><a class="automate-afs-service-citation-backlink" href="#automate-afs-service-cite-ubuntu">[3]</a></td>
        <td>Canonical. (n.d.). <em>Install NFS</em>. Ubuntu Server documentation. <a href="https://ubuntu.com/server/docs/how-to/networking/install-nfs/">https://ubuntu.com/server/docs/how-to/networking/install-nfs/</a></td>
        <td>NFS server package and Ubuntu server setup context.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
