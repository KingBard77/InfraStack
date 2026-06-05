[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-overview">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

  <p>__TOOL_TITLE__ turns file-permission intent into a reviewed <code>chmod</code> command. It keeps octal mode, symbolic mode, owner/group/other bits, special bits, recursion, reference mode, target path, and shell quoting visible before the command is copied.</p>

  <p><a id="__PREFIX__-cite-review" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-review"><span class="__PREFIX__-citation-inline">GNU Project (n.d.-b)</span></a> describes file mode bits as the access model behind symbolic and octal permission forms, so this workspace shows both the compact command and a readable permission breakdown.</p>

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
        <td>Permission model</td>
        <td>Octal and symbolic mode previews for the same intended change.</td>
        <td>Confirm whether the target is a file, directory, executable, or shared directory.</td>
      </tr>
      <tr>
        <td>Traversal options</td>
        <td>Recursive mode and symlink traversal notes where selected.</td>
        <td>Inspect target path scope before using <code>-R</code>.</td>
      </tr>
      <tr>
        <td>Output</td>
        <td>Command, permission summary, warnings, operation rows, CSV, and JSON.</td>
        <td>Exports document intent; they do not inspect the live filesystem.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-technical">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <p>The generated command model follows the documented permission model rather than treating <code>chmod</code> as a memorized list of numbers. <a id="__PREFIX__-cite-primary" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-primary"><span class="__PREFIX__-citation-inline">GNU Project (n.d.-a)</span></a> documents <code>chmod</code> as changing named file permissions by explicit mode or by reference file. <a id="__PREFIX__-cite-method" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-method"><span class="__PREFIX__-citation-inline">Linux man-pages project (2025)</span></a> describes the underlying mode as permission bits plus set-user-ID, set-group-ID, and sticky bits. <a id="__PREFIX__-cite-technical-review" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-review"><span class="__PREFIX__-citation-inline">GNU Project (n.d.-b)</span></a> explains that those mode bits can be represented symbolically or as octal numbers, which is why this workspace keeps both forms visible.</p>

  <table>
    <thead>
      <tr>
        <th>Review layer</th>
        <th>What the workspace makes visible</th>
        <th>What the shell still decides</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Mode source</td><td>Octal, symbolic, and reference-file command shapes with a readable permission breakdown.</td><td>The current mode, ownership, ACLs, labels, mount behavior, and whether the target exists.</td></tr>
      <tr><td>Scope</td><td>Single-path and recursive intent, including directory-sensitive patterns such as uppercase <code>X</code>.</td><td>The expanded path list, symlink behavior, shell globbing, and file count touched by the command.</td></tr>
      <tr><td>Special bits</td><td>Set-user-ID, set-group-ID, and sticky-bit intent as explicit review rows.</td><td>Kernel rules, filesystem support, privilege, group membership, and whether the bit is preserved.</td></tr>
      <tr><td>Evidence boundary</td><td>Command, warning rows, CSV, JSON, and printable review output from one normalized model.</td><td>Whether the command succeeds and what the mode looks like after it runs on the host.</td></tr>
    </tbody>
  </table>

  <h3 class="__PREFIX__-technical-step-heading">1. Permission Model As Review Data</h3>
  <p>The workspace treats a chmod command as a permission decision first and a shell string second. The normalized model separates owner, group, and other from read, write, execute, and the three special bits. That makes the output easier to review than a bare number such as <code>0644</code> or <code>2775</code>. It also makes directory behavior visible. Execute on a directory is search permission, so a directory tree can need execute bits even when regular files inside that tree should not become executable.</p>
  <ul>
    <li>Use the permission matrix to confirm who receives access before copying the command.</li>
    <li>Check whether the target is a regular file, directory, script, shared directory, or reference path.</li>
    <li>Treat the generated command as a requested final state, not as proof that the filesystem changed.</li>
  </ul>

  <h3 class="__PREFIX__-technical-step-heading">2. Octal And Symbolic Mode Selection</h3>
  <p>Octal mode is compact and precise. A value such as <code>0755</code> describes the complete final mode in four digits, including the optional special-bit digit at the front. That is useful for deployment artifacts, package files, and runbooks where the desired final mode is known. The tradeoff is that octal mode replaces the current permission pattern. A command copied from an old note can therefore remove a bit that was intentionally present on the target host.</p>
  <p>Symbolic mode is better when the operator wants to express a narrower change. A command such as <code>chmod g+w shared</code> adds group write without rewriting the owner or public bits. A command such as <code>chmod o-rwx secret</code> removes public access without spelling the complete mode. The generator keeps both forms visible because neither is always better.</p>
  <ul>
    <li>Use octal mode for a known final state.</li>
    <li>Use symbolic mode when the current mode should mostly be preserved.</li>
    <li>Use uppercase <code>X</code> carefully in recursive symbolic changes so directories can be searchable without making every regular file executable.</li>
  </ul>

  <h3 class="__PREFIX__-technical-step-heading">3. Scope, Directories, And Recursive Change</h3>
  <p>Recursive chmod is the section that deserves the most skepticism. The <code>-R</code> option can touch every entry under a directory, and the browser cannot enumerate that tree. It cannot tell whether a glob expands to one path, ten paths, or a sensitive system directory. It also cannot dry-run the permission change. The workspace therefore surfaces recursive intent in warnings, summary rows, and export data instead of treating it as a small flag.</p>
  <p>Directory-sensitive review matters because read, write, and execute do different work on directories. A directory may require execute/search permission for traversal, write permission for entry creation or removal, and read permission for listing. Applying file-oriented bits to directories can break services or expose paths. Applying directory-oriented bits to all files can accidentally make scripts or data executable.</p>
  <ul>
    <li>Inspect the target tree before broad recursive changes.</li>
    <li>Prefer explicit paths over broad globs when the change has operational risk.</li>
    <li>Pair generated commands with shell-side discovery, such as a reviewed <code>find</code> command, when the touched files need to be known first.</li>
  </ul>

  <h3 class="__PREFIX__-technical-step-heading">4. Special Bits And Reference Mode</h3>
  <p>Special bits are separated from ordinary permission bits because they change behavior. Set-user-ID can affect the effective user identity for executable files. Set-group-ID can affect executable behavior and can also influence group ownership inheritance on directories. The sticky bit is commonly used on shared writable directories where users should not remove each other's entries. These choices should read as deliberate design decisions, not hidden leading digits.</p>
  <p>Reference mode has a different review shape. Instead of embedding the mode directly in the command, the generated syntax asks chmod to copy permissions from another path at runtime. That can be clearer than typing a number, but it means the reference file must be correct on the target host when the command runs. The browser cannot stat the reference file, follow symlinks, or compare before-and-after modes.</p>
  <ul>
    <li>Review special bits with the platform or application owner before broad use.</li>
    <li>Use reference mode only when the source path is stable and trusted.</li>
    <li>Record why the special bit or reference file exists, because the command alone does not explain the policy.</li>
  </ul>

  <h3 class="__PREFIX__-technical-step-heading">5. Shell Quoting, Paths, And Execution Context</h3>
  <p>The target path is part of the command contract. Spaces, quotes, glob characters, leading dashes, environment variables, and copied terminal output can all change how the shell splits arguments. The generator can quote the visible command according to the selected shell style, but it cannot know whether a path came from a trusted source or whether a glob expands safely on the real host. If a path starts with a dash, shell-side use of <code>--</code> may be needed so the path is not mistaken for an option.</p>
  <p>Execution context also decides whether chmod succeeds. The running user must have enough privilege, the filesystem must allow the change, and policy layers such as ACLs, labels, immutable attributes, network mounts, container volumes, or read-only mounts can change the result. The tool can make these review points visible; it cannot inspect them.</p>
  <ul>
    <li>Confirm the exact path after shell expansion.</li>
    <li>Check current owner, group, ACL, label, and mount behavior when the target is sensitive.</li>
    <li>Do not read a syntactically valid command as permission policy approval.</li>
  </ul>

  <table>
    <thead>
      <tr>
        <th>Common review miss</th>
        <th>Why it matters</th>
        <th>Safer review pattern</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Broad public modes</td><td>Modes such as <code>777</code> can make files or directories writable by users that were never part of the operational requirement.</td><td>Start from the narrow owner and group permissions required, then add public bits only when the workflow explicitly needs them.</td></tr>
      <tr><td>Recursive globs</td><td>A glob can expand differently on each host, and recursive chmod can apply the chosen mode to far more entries than the reviewer expects.</td><td>Resolve the target list with shell-side inspection first, then run the generated command only against the reviewed path set.</td></tr>
      <tr><td>Reference drift</td><td>Reference mode depends on another file at execution time, so the visible command no longer carries the final mode directly.</td><td>Verify the reference path immediately before use and record why that file is the policy source.</td></tr>
      <tr><td>Mode-only thinking</td><td>ACLs, labels, ownership, capabilities, and mount options can make the effective access model differ from simple mode bits.</td><td>Pair chmod review with host-side permission inspection when the target is sensitive or shared.</td></tr>
    </tbody>
  </table>

  <h3 class="__PREFIX__-technical-step-heading">6. Exports And Operational Boundary</h3>
  <p>The command view, warning rows, summary table, CSV, JSON, and PDF output all come from the same normalized permission model. That alignment is useful for review because a special bit shown in the command should also appear in the table and exported payload. CSV is useful for checklist-style review. JSON records the generated state, but this chmod workspace does not import JSON back into the form, so it should be treated as documentation rather than restore data.</p>
  <p>The boundary is intentionally strict. A chmod command has real side effects only when it runs in a shell on a host with a filesystem. The browser cannot validate current mode, confirm success, roll back a bad permission change, or prove that the result is secure or compliant. The safe workflow is to generate, review, inspect the target environment, then run only when the command matches the operational intent.</p>
  <ul>
    <li>Use PDF, CSV, and JSON as review artifacts.</li>
    <li>Use shell-side commands to confirm before-and-after state.</li>
    <li>For private keys, service files, deployment artifacts, shared directories, and recursive operations, require a second review before execution.</li>
  </ul>
  <p>Use the section as a pre-run checklist. The command should tell the reviewer the requested mode, why that mode form was chosen, how wide the target scope is, whether special bits or a reference file are involved, and which host-side checks remain. If any of those answers are missing, the right next step is not to copy faster. It is to tighten the path, switch from octal to symbolic mode or back, remove broad recursion, or collect filesystem context before the command leaves the browser.</p>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-command-tips">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Command Tips</span></h2>
  <p>Use these checks before applying a generated mode to real files.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span> <span>Prefer symbolic mode for intent</span></summary>
    <div class="tool-guidance-answer">
      <p>Symbolic modes explain the change directly. They are often clearer in runbooks than raw octal values when only one class or bit is changing.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-check2-square" aria-hidden="true"></i></span> <span>Review symlink traversal</span></summary>
    <div class="tool-guidance-answer">
      <p>Recursive chmod behavior around symbolic links is implementation-sensitive. Keep traversal choices explicit and inspect the target tree first.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-arrow-repeat" aria-hidden="true"></i></span> <span>Avoid broad public write bits</span></summary>
    <div class="tool-guidance-answer">
      <p>Modes like <code>777</code> are rarely the right final state. Prefer the narrow owner, group, and public permissions needed for the actual workflow.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span> <span>Use <code>X</code> for directory-safe recursion</span></summary>
    <div class="tool-guidance-answer">
      <p>Uppercase <code>X</code> applies execute/search where it is already meaningful for directories or executable files, which is useful for recursive repair commands.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-how-to">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to convert permission intent into a command review that still respects path scope, special bits, and shell quoting.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-card-checklist" aria-hidden="true"></i></span> <span>Choose the target type</span></summary>
    <div class="tool-guidance-answer">
      <p>Start with the file, directory, script, shared directory, or reference-mode preset that best matches the permission change.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>Set the mode</span></summary>
    <div class="tool-guidance-answer">
      <p>Use the permission grid, octal field, symbolic operation, or reference file controls to define the resulting command.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-clipboard-check" aria-hidden="true"></i></span> <span>Review scope and warnings</span></summary>
    <div class="tool-guidance-answer">
      <p>Check recursive scope, root-path protections, special bits, and symlink behavior before copying.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>Copy or export</span></summary>
    <div class="tool-guidance-answer">
      <p>Copy the command for a terminal, or export the command review as PDF, CSV, or JSON for peer review.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-examples __PREFIX__-markdown-card-commands">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>
  <p>Copy a sample, replace the target path, then confirm the generated mode matches the intended file or directory state.</p>

  <pre class="__PREFIX__-command-pre"><code>chmod 0644 config/app.conf</code></pre>
  <details class="__PREFIX__-command-note">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Readable config:</strong> Owner can write; group and others can read.</div></div>
  </details>

  <pre class="__PREFIX__-command-pre"><code>chmod u=rw,g=r,o= deploy.key</code></pre>
  <details class="__PREFIX__-command-note">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Private key:</strong> Symbolic form makes the denied public permissions obvious.</div></div>
  </details>

  <pre class="__PREFIX__-command-pre"><code>chmod -R u+rwX,g+rX,o-rwx ./release</code></pre>
  <details class="__PREFIX__-command-note">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Recursive release tree:</strong> Keeps directory traversal practical while removing public access.</div></div>
  </details>

  <pre class="__PREFIX__-command-pre"><code>chmod --reference=template.conf app.conf</code></pre>
  <details class="__PREFIX__-command-note __PREFIX__-command-note-last">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Reference mode:</strong> Copies the mode from a known file; confirm the reference path is correct first.</div></div>
  </details>
</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-export">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>Exports capture the generated permission review. They do not inspect files, change modes, or verify filesystem state.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-clipboard" aria-hidden="true"></i></span> <span>Copy Command</span></summary>
    <div class="tool-export-answer">
      <p>Copies the rendered <code>chmod</code> command for the selected shell style.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i></span> <span>PDF</span></summary>
    <div class="tool-export-answer">
      <p>Opens a print-ready report with the command, summary, warnings, and permission operation rows.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i></span> <span>CSV</span></summary>
    <div class="tool-export-answer">
      <p>Downloads the operation table so reviewers can compare mode bits, symbolic operations, and generated values.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span> <span>JSON</span></summary>
    <div class="tool-export-answer">
      <p>Copies or downloads the normalized payload for review. This tool does not import JSON back into the workspace.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-faq">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>These answers clarify what the chmod workspace generates, what it does not inspect, and how exported JSON should be treated.</p>

  <details class="faq-item" open>
    <summary><span>Does the tool change file permissions?</span></summary>
    <div class="faq-answer">
      <p>No. It only generates command text and export data.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Should I use octal or symbolic mode?</span></summary>
    <div class="faq-answer">
      <p>Use octal when the final mode is known. Use symbolic mode when the change needs to be readable or relative to the current state.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Why does recursive mode get extra warnings?</span></summary>
    <div class="faq-answer">
      <p>Recursive permission changes can affect many files and directories. The warning is there because scope mistakes are expensive.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Does JSON restore work here?</span></summary>
    <div class="faq-answer">
      <p>No. JSON can be copied or downloaded for review, but this chmod workspace does not provide a JSON import control.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.11_glossary -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-glossary">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-book" aria-hidden="true"></i><span>Glossary</span></h2>
  <p>Use this glossary to decode the mode, bit, and permission terms shown in the command preview and output rows.</p>

  <table>
    <thead>
      <tr>
        <th>Term</th>
        <th>Meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Octal mode</td>
        <td>Numeric permission form such as <code>0644</code> or <code>0755</code>.</td>
      </tr>
      <tr>
        <td>Symbolic mode</td>
        <td>Readable permission operation such as <code>u+x</code> or <code>g-w</code>.</td>
      </tr>
      <tr>
        <td>Setgid</td>
        <td>Special bit often used on shared directories to keep group ownership consistent.</td>
      </tr>
      <tr>
        <td>Sticky bit</td>
        <td>Special directory bit commonly used to restrict deletion in shared writable directories.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.11_glossary -->

<!-- ns:start main.content.10_references -->
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-citations">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>
  <p>These sources support the in-text citations used in this tool page.</p>

  <table class="__PREFIX__-citation-table">
    <thead>
      <tr>
        <th>Source type</th>
        <th>In-text citation</th>
        <th>Reference</th>
      </tr>
    </thead>
    <tbody>
      <tr id="__PREFIX__-ref-primary">
        <td>Manual</td>
        <td><a class="__PREFIX__-citation-backlink" href="#__PREFIX__-cite-primary"><span class="__PREFIX__-citation-inline">(GNU Project, n.d.-a)</span></a></td>
        <td>GNU Project. (n.d.-a). <em>chmod: Change access permissions</em>. GNU Coreutils Manual. Retrieved May 16, 2026, from <a href="https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html">https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html</a></td>
      </tr>
      <tr id="__PREFIX__-ref-method">
        <td>Manual page</td>
        <td><a class="__PREFIX__-citation-backlink" href="#__PREFIX__-cite-method"><span class="__PREFIX__-citation-inline">(Linux man-pages project, 2025)</span></a></td>
        <td>Linux man-pages project. (2025). <em>chmod(2): change permissions of a file</em>. man7.org. <a href="https://man7.org/linux/man-pages/man2/fchmod.2.html">https://man7.org/linux/man-pages/man2/fchmod.2.html</a></td>
      </tr>
      <tr id="__PREFIX__-ref-review">
        <td>Manual</td>
        <td><a class="__PREFIX__-citation-backlink" href="#__PREFIX__-cite-review"><span class="__PREFIX__-citation-inline">(GNU Project, n.d.-b)</span></a></td>
        <td>GNU Project. (n.d.-b). <em>File permissions</em>. GNU Coreutils Manual. Retrieved May 16, 2026, from <a href="https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html">https://www.gnu.org/software/coreutils/manual/html_node/File-permissions.html</a></td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
