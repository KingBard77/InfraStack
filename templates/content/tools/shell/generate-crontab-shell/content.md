[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-overview">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

  <p>Crontab Command Generator turns schedule intent into a reviewed cron expression and installable cron line. It keeps minute, hour, day-of-month, month, day-of-week, nickname schedules, command text, environment hints, and metadata visible before anything is copied into a terminal or crontab editor.</p>

  <p><a id="generate-crontab-shell-cite-review" class="generate-crontab-shell-citation-link" href="#generate-crontab-shell-ref-review"><span class="generate-crontab-shell-citation-inline">Cronie Project (2013)</span></a> describes the cron daemon as checking stored crontabs each minute and running due jobs, so this workspace focuses on schedule expression review, not runtime execution.</p>

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
        <td>Schedule fields</td>
        <td>Five-field cron expression or supported nickname form.</td>
        <td>Confirm day-of-month and day-of-week behavior before installing.</td>
      </tr>
      <tr>
        <td>Command line</td>
        <td>Full cron line with command, redirection, and optional environment notes.</td>
        <td>Use absolute paths and explicit output handling.</td>
      </tr>
      <tr>
        <td>Output</td>
        <td>Expression, full line, warnings, field rows, CSV, and JSON.</td>
        <td>Exports explain the generated line; they do not install or validate it on the host.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-technical">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <p>The generated schedule model follows cron and crontab documentation, but it keeps host-specific behavior visible instead of pretending that every scheduler behaves identically. <a id="generate-crontab-shell-cite-primary" class="generate-crontab-shell-citation-link" href="#generate-crontab-shell-ref-primary"><span class="generate-crontab-shell-citation-inline">Cronie Project (2012)</span></a> describes a crontab entry as five time-and-date fields followed by a command, with environment-setting lines also allowed. <a id="generate-crontab-shell-cite-method" class="generate-crontab-shell-citation-link" href="#generate-crontab-shell-ref-method"><span class="generate-crontab-shell-citation-inline">IEEE and The Open Group (2017)</span></a> define the <code>crontab</code> utility as creating, replacing, or editing a user's crontab entry. <a id="generate-crontab-shell-cite-technical-review" class="generate-crontab-shell-citation-link" href="#generate-crontab-shell-ref-review"><span class="generate-crontab-shell-citation-inline">Cronie Project (2013)</span></a> describes the cron daemon as checking stored crontabs and running due jobs, which is why this tool focuses on schedule review rather than execution.</p>

  <table>
    <thead>
      <tr>
        <th>Review layer</th>
        <th>What the workspace makes visible</th>
        <th>What the host still decides</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Schedule grammar</td><td>Minute, hour, day-of-month, month, day-of-week, ranges, steps, lists, and nicknames.</td><td>The exact cron implementation, supported extensions, and real run times on that host.</td></tr>
      <tr><td>Command payload</td><td>The command text, quoting style, output redirection intent, and environment notes.</td><td>Executable paths, shell environment, user privileges, credentials, and working directory.</td></tr>
      <tr><td>Destination format</td><td>User crontab versus system-crontab review notes and install command shape.</td><td>Whether the line belongs in <code>crontab -e</code>, <code>/etc/crontab</code>, <code>/etc/cron.d</code>, or a managed scheduler.</td></tr>
      <tr><td>Runtime evidence</td><td>Warnings, schedule summary, option rows, CSV, JSON, and printable review output.</td><td>Daemon load, log output, mail delivery, missed jobs, overlap, and application-side success.</td></tr>
    </tbody>
  </table>

  <h3 class="generate-crontab-shell-technical-step-heading">1. Schedule Grammar As Structured Fields</h3>
  <p>The workspace treats a cron line as a structured schedule model before it renders the final text. Classic user crontabs use five time fields followed by a command: minute, hour, day of month, month, and day of week. Each field can carry a single value, a list, a range, a step expression, or a wildcard where the implementation allows it. Showing those fields separately matters because compact cron syntax hides operational frequency. A small expression such as <code>*/5 * * * *</code> looks harmless but creates a persistent job every five minutes.</p>
  <p>The generated full line is therefore only one view of the model. The summary, warnings, table rows, CSV, and JSON preserve the same field choices so reviewers can inspect the schedule without mentally parsing the entire line every time.</p>
  <ul>
    <li>Review every field before copying the combined expression.</li>
    <li>Use exact values when a runbook needs readability.</li>
    <li>Use step syntax only when the repeated cadence is intended and operationally affordable.</li>
  </ul>

  <h3 class="generate-crontab-shell-technical-step-heading">2. Calendar Matching, Day Fields, And Nicknames</h3>
  <p>The day-of-month and day-of-week fields are review-sensitive because cron behavior is easy to misremember. In common cron implementations, restricting both fields can behave like an OR match rather than a strict intersection. A line intended for the first Monday can run on the first day of the month and on every Monday if the expression is not designed carefully for the target implementation. The workspace keeps those fields visible and warns where a calendar schedule needs extra review.</p>
  <p>Nickname schedules such as <code>@hourly</code>, <code>@daily</code>, and <code>@reboot</code> improve readability, but they are still implementation syntax. <code>@reboot</code> is especially environment-sensitive because cron startup does not always mean the network, mount points, databases, or application dependencies are ready. The generator separates nickname output from five-field output so that shortcut syntax does not hide portability concerns.</p>
  <ul>
    <li>Check monthly weekday schedules against the target cron manual.</li>
    <li>Do not assume business calendars, holidays, or maintenance windows are built into cron.</li>
    <li>Use <code>@reboot</code> only when daemon startup timing is acceptable for the command.</li>
  </ul>

  <h3 class="generate-crontab-shell-technical-step-heading">3. Command Payload And Environment</h3>
  <p>The command portion is shell text, not a protected object. A command that works in an interactive terminal can fail under cron because the working directory, shell startup files, PATH, locale, user profile, and environment variables are different. The workspace keeps the payload visible so reviewers can see whether it depends on implicit state. For production jobs, absolute paths, explicit interpreters, and intentional output handling are easier to troubleshoot than interactive-shell assumptions.</p>
  <p>Environment lines can be part of a complete crontab, but they need careful handling. Values such as <code>SHELL</code>, <code>PATH</code>, <code>MAILTO</code>, or timezone-related settings can document the schedule. Secret values, deployment paths, and credentials should not be pasted into shared generated artifacts. This tool focuses on line generation and schedule review; it does not manage a complete crontab file.</p>
  <ul>
    <li>Use full paths for scripts, interpreters, config files, and logs.</li>
    <li>Redirect stdout and stderr deliberately instead of relying on accidental mail behavior.</li>
    <li>Keep secrets out of copied lines, CSV, JSON, and printable exports.</li>
  </ul>

  <h3 class="generate-crontab-shell-technical-step-heading">4. Timezone, Load, And Overlap Risk</h3>
  <p>Schedule correctness depends on the host clock and timezone. A line that looks correct in the browser can run at a different wall-clock time on a server in another region or inside a container with inherited timezone settings. Daylight-saving transitions add another edge case: skipped or repeated local times can affect once-per-day jobs differently from frequent interval jobs. The generator can carry timezone notes and warnings, but it cannot inspect the daemon environment.</p>
  <p>Frequency also needs operational review. A frequent job can pile up if the command takes longer than the interval. A job at the top of the hour can collide with backups, log rotation, billing reports, or other conventional schedules. Cron itself does not know whether the command is idempotent, whether overlap is allowed, or whether downstream APIs can tolerate the cadence.</p>
  <ul>
    <li>Review host timezone and daylight-saving behavior for customer-visible jobs.</li>
    <li>Estimate runtime before choosing every-minute or short-step schedules.</li>
    <li>Add command-side locking when overlap would cause corruption, duplicate work, or excess load.</li>
  </ul>

  <h3 class="generate-crontab-shell-technical-step-heading">5. Destination Format And Ownership</h3>
  <p>User crontabs and system cron files look similar enough to cause mistakes. A user crontab line normally contains the five fields and command. System files such as <code>/etc/crontab</code> or files under <code>/etc/cron.d</code> commonly include an additional user field before the command. Pasting a user-style line into a system file can shift tokens into the wrong positions. The workspace keeps destination notes visible because the browser cannot know where the user will paste the result.</p>
  <p>Ownership also changes operational meaning. A job running as a personal account inherits different privileges, paths, and failure visibility from a job running as a service user. Package-managed cron files may be overwritten during deployment. Jobs that belong to applications may fit better in a service manager, queue worker, or application scheduler than in a hand-edited crontab.</p>
  <ul>
    <li>Choose user crontab, system crontab, or managed scheduler before installation.</li>
    <li>Confirm the user identity that should run the command.</li>
    <li>Review file permissions and package ownership for files under system cron directories.</li>
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
      <tr><td>Day-field assumptions</td><td>Restricted day-of-month and day-of-week fields can match more dates than a reviewer expects, depending on the cron implementation.</td><td>Translate the expression into expected calendar dates before installing monthly or weekday-sensitive jobs.</td></tr>
      <tr><td>Interactive shell dependency</td><td>Cron does not usually inherit the same PATH, working directory, profile files, or interactive variables as a login shell.</td><td>Use absolute paths, explicit interpreters, and wrapper scripts when the command has multiple environment assumptions.</td></tr>
      <tr><td>Overlap risk</td><td>A frequent job can start again before the previous run exits, causing duplicate work, lock contention, or noisy downstream calls.</td><td>Add command-side locking or choose a cadence that matches runtime and recovery expectations.</td></tr>
      <tr><td>Wrong destination file</td><td>User crontabs and system cron files have different field layouts, and a misplaced user field can break the command shape.</td><td>Choose the destination format first, then review whether the generated line matches that file type.</td></tr>
    </tbody>
  </table>

  <h3 class="generate-crontab-shell-technical-step-heading">6. Exports, Restore Boundary, And Runtime Evidence</h3>
  <p>The expression, full cron line, warnings, table rows, CSV, JSON, and PDF output all come from one normalized schedule model. CSV is useful for schedule-review checklists. JSON records the generated payload, but this crontab workspace does not import JSON back into the form, so JSON should be treated as documentation rather than restore data. PDF output is a printable snapshot of the review state, not proof that a job is installed.</p>
  <p>Runtime validation belongs on the host. Cron behavior depends on daemon state, file permissions, environment, timezone, logs, mail routing, user privileges, and command success. After installation, confirm the job through cron logs, application logs, explicit output files, or a monitored signal. The generated line can be syntactically useful and still be the wrong operational choice if it runs too often, runs as the wrong user, hides failures, or executes in an unexpected environment.</p>
  <ul>
    <li>Use exports for peer review and runbook notes.</li>
    <li>Use host logs and monitored output for evidence that the job actually ran.</li>
    <li>Do not describe the tool as a scheduler, reliability proof, or deployment validator.</li>
  </ul>
  <p>Use the section as a schedule review checklist. The generated line should make the calendar rule, command payload, destination format, timezone assumption, output path, and evidence boundary clear before installation. If those pieces are not clear, the safer adjustment is to make the schedule more explicit, move complex setup into a reviewed script, add logging, or choose a scheduler that better matches the operational requirement. Cron is simple; the production context around it rarely is. That is why the generated output keeps schedule, command, destination, and evidence as separate review surfaces instead of flattening the job into one line too early.</p>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-command-tips">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Command Tips</span></h2>
  <p>Use these checks before installing a generated cron line.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span> <span>Watch day field interaction</span></summary>
    <div class="tool-guidance-answer">
      <p>If day-of-month and day-of-week are both restricted, many cron implementations run when either field matches. Review this before scheduling monthly weekday jobs.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-check2-square" aria-hidden="true"></i></span> <span>Use absolute paths</span></summary>
    <div class="tool-guidance-answer">
      <p>Cron's environment is smaller than an interactive shell. Use full paths for scripts, interpreters, and output files.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-arrow-repeat" aria-hidden="true"></i></span> <span>Handle output explicitly</span></summary>
    <div class="tool-guidance-answer">
      <p>Redirect stdout and stderr to a log file or intentionally configure mail behavior. Silent failures are the classic cron tax.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span> <span>Check timezone assumptions</span></summary>
    <div class="tool-guidance-answer">
      <p>Review host timezone, daylight-saving behavior, and any <code>CRON_TZ</code> setting before using schedules that must run at a precise local time.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-how-to">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to move from schedule intent to a reviewed cron expression and full crontab line.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-card-checklist" aria-hidden="true"></i></span> <span>Choose schedule intent</span></summary>
    <div class="tool-guidance-answer">
      <p>Start from a preset, nickname, interval, weekday, monthly, or custom expression pattern.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>Set the command payload</span></summary>
    <div class="tool-guidance-answer">
      <p>Enter the script or command exactly as it should appear after the schedule fields, including redirection if needed.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-clipboard-check" aria-hidden="true"></i></span> <span>Review expression and full line</span></summary>
    <div class="tool-guidance-answer">
      <p>Use the expression output for schedule review and the full-line output when ready to paste into a user crontab.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>Export the handoff</span></summary>
    <div class="tool-guidance-answer">
      <p>Copy the expression or full line, or export PDF, CSV, and JSON when schedule decisions need review.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-examples generate-crontab-shell-markdown-card-commands">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>
  <p>Copy a sample, replace the command path, then review the schedule fields before installing it with your system's crontab workflow.</p>

  <pre class="generate-crontab-shell-command-pre"><code>15 2 * * * /usr/local/bin/backup.sh &gt;&gt; /var/log/backup.log 2&gt;&amp;1</code></pre>
  <details class="generate-crontab-shell-command-note">
    <summary>
      <span class="generate-crontab-shell-command-note-label generate-crontab-shell-command-note-label-closed">Show command use</span>
      <span class="generate-crontab-shell-command-note-label generate-crontab-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-crontab-shell-command-copy-btn" data-command-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Nightly backup:</strong> Runs once a day and appends stdout and stderr to a log file.</div></div>
  </details>

  <pre class="generate-crontab-shell-command-pre"><code>*/5 * * * * /usr/local/bin/healthcheck --quiet</code></pre>
  <details class="generate-crontab-shell-command-note">
    <summary>
      <span class="generate-crontab-shell-command-note-label generate-crontab-shell-command-note-label-closed">Show command use</span>
      <span class="generate-crontab-shell-command-note-label generate-crontab-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-crontab-shell-command-copy-btn" data-command-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Frequent healthcheck:</strong> Runs every five minutes; confirm the command is idempotent.</div></div>
  </details>

  <pre class="generate-crontab-shell-command-pre"><code>0 9 * * 1-5 /usr/local/bin/report-weekday</code></pre>
  <details class="generate-crontab-shell-command-note">
    <summary>
      <span class="generate-crontab-shell-command-note-label generate-crontab-shell-command-note-label-closed">Show command use</span>
      <span class="generate-crontab-shell-command-note-label generate-crontab-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-crontab-shell-command-copy-btn" data-command-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Weekday report:</strong> Runs at 09:00 Monday through Friday according to the host timezone.</div></div>
  </details>

  <pre class="generate-crontab-shell-command-pre"><code>@reboot /usr/local/bin/start-worker</code></pre>
  <details class="generate-crontab-shell-command-note generate-crontab-shell-command-note-last">
    <summary>
      <span class="generate-crontab-shell-command-note-label generate-crontab-shell-command-note-label-closed">Show command use</span>
      <span class="generate-crontab-shell-command-note-label generate-crontab-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-crontab-shell-command-copy-btn" data-command-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Startup task:</strong> Runs after cron starts; use service managers for long-running daemons when possible.</div></div>
  </details>
</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-export">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>Exports preserve the generated schedule review. They do not install a crontab or confirm that cron is running on the host.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-clipboard" aria-hidden="true"></i></span> <span>Copy Expression</span></summary>
    <div class="tool-export-answer">
      <p>Copies only the schedule expression or nickname for schedule review.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-clipboard" aria-hidden="true"></i></span> <span>Copy Line</span></summary>
    <div class="tool-export-answer">
      <p>Copies the full generated cron line with the command portion included.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i></span> <span>PDF</span></summary>
    <div class="tool-export-answer">
      <p>Opens a print-ready report with expression, command, warnings, and field analysis.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i></span> <span>CSV and JSON</span></summary>
    <div class="tool-export-answer">
      <p>Downloads field rows as CSV or copies/downloads normalized JSON for review. This workspace does not import JSON back into the form.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-faq">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>These answers clarify install boundaries, destination format differences, and JSON export behavior for the crontab workspace.</p>

  <details class="faq-item" open>
    <summary><span>Does the tool install a crontab?</span></summary>
    <div class="faq-answer">
      <p>No. It only generates schedule text and export data.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Why should I use absolute paths?</span></summary>
    <div class="faq-answer">
      <p>Cron jobs often run with a minimal environment. Absolute paths make command resolution easier to review and debug.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Can I paste the generated line into <code>/etc/crontab</code>?</span></summary>
    <div class="faq-answer">
      <p>User crontabs and system crontabs differ. System crontab formats usually include a user field. Review the destination file format first.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Does JSON restore work here?</span></summary>
    <div class="faq-answer">
      <p>No. JSON can be copied or downloaded for review, but this crontab workspace does not provide a JSON import control.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.11_glossary -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-glossary">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-book" aria-hidden="true"></i><span>Glossary</span></h2>
  <p>Use this glossary to decode the scheduler terms used by the generated expression, full line, and field breakdown.</p>

  <table>
    <thead>
      <tr>
        <th>Term</th>
        <th>Meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Crontab</td>
        <td>A table of scheduled commands for cron to evaluate.</td>
      </tr>
      <tr>
        <td>Cron daemon</td>
        <td>Background service that checks schedules and runs due jobs.</td>
      </tr>
      <tr>
        <td>Nickname</td>
        <td>Shortcut such as <code>@daily</code> or <code>@reboot</code> used instead of five schedule fields.</td>
      </tr>
      <tr>
        <td><code>CRON_TZ</code></td>
        <td>Environment setting supported by some implementations to run cron entries in a named timezone.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.11_glossary -->

<!-- ns:start main.content.10_references -->
<div class="content-card generate-crontab-shell-markdown-card generate-crontab-shell-markdown-card-citations">
  <h2 class="generate-crontab-shell-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>
  <p>These sources support the in-text citations used in this tool page.</p>

  <table class="generate-crontab-shell-citation-table">
    <thead>
      <tr>
        <th>Source type</th>
        <th>In-text citation</th>
        <th>Reference</th>
      </tr>
    </thead>
    <tbody>
      <tr id="generate-crontab-shell-ref-primary">
        <td>Manual page</td>
        <td><a class="generate-crontab-shell-citation-backlink" href="#generate-crontab-shell-cite-primary"><span class="generate-crontab-shell-citation-inline">(Cronie Project, 2012)</span></a></td>
        <td>Cronie Project. (2012). <em>crontab(5): files used to schedule the execution of programs</em>. man7.org. <a href="https://man7.org/linux/man-pages/man5/crontab.5.html">https://man7.org/linux/man-pages/man5/crontab.5.html</a></td>
      </tr>
      <tr id="generate-crontab-shell-ref-method">
        <td>Standard</td>
        <td><a class="generate-crontab-shell-citation-backlink" href="#generate-crontab-shell-cite-method"><span class="generate-crontab-shell-citation-inline">(IEEE and The Open Group, 2017)</span></a></td>
        <td>IEEE and The Open Group. (2017). <em>crontab(1p): POSIX Programmer's Manual</em>. man7.org. <a href="https://man7.org/linux/man-pages/man1/crontab.1p.html">https://man7.org/linux/man-pages/man1/crontab.1p.html</a></td>
      </tr>
      <tr id="generate-crontab-shell-ref-review">
        <td>Manual page</td>
        <td><a class="generate-crontab-shell-citation-backlink" href="#generate-crontab-shell-cite-review"><span class="generate-crontab-shell-citation-inline">(Cronie Project, 2013)</span></a></td>
        <td>Cronie Project. (2013). <em>cron(8): daemon to execute scheduled commands</em>. man7.org. <a href="https://man7.org/linux/man-pages/man8/cron.8.html">https://man7.org/linux/man-pages/man8/cron.8.html</a></td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
