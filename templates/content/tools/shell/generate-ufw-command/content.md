[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-overview">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

  <p>UFW Command Generator is a browser-owned command builder for preparing reviewed Ubuntu Uncomplicated Firewall rule commands. It collects the rule target, action, source, destination, protocol, port, direction, route posture, interface, comment, dry-run mode, application profile mode, warning rows, export rows, and JSON restore data.</p>

  <p><a id="generate-ufw-command-cite-overview-server" class="generate-ufw-command-citation-link" href="#generate-ufw-command-ref-server"><span class="generate-ufw-command-citation-inline">Ubuntu Server documentation</span></a> describes UFW as Ubuntu's default firewall frontend for simplifying packet-filtering management. <a id="generate-ufw-command-cite-overview-manpage" class="generate-ufw-command-citation-link" href="#generate-ufw-command-ref-manpage"><span class="generate-ufw-command-citation-inline">The Ubuntu ufw manpage</span></a> documents rule actions such as <code>allow</code>, <code>deny</code>, <code>reject</code>, <code>limit</code>, route rules, dry-run mode, protocol selectors, source and destination selectors, ports, and comments. This workspace formats those choices into command text; it does not run UFW, read host firewall state, or verify traffic flow.</p>

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
        <td>Rule profile</td>
        <td>Common allow, deny, route, and application-profile starting points.</td>
        <td>Confirm the profile matches the host, service, and change ticket.</td>
      </tr>
      <tr>
        <td>Custom settings</td>
        <td>Action, source, destination, direction, protocol, port, interface, logging, route, insert, dry-run, and comments.</td>
        <td>Confirm broad sources, broad destinations, route rules, and comments are intentional.</td>
      </tr>
      <tr>
        <td>Output</td>
        <td>Command preview, operation rows, warnings, errors, CSV, and JSON restore state.</td>
        <td>The browser cannot prove the command is approved, applied, or correct for the target host.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-technical">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <p>The generated command comes from one normalized state model. The same state drives the command preview, result summary, operation rows, warning rows, CSV output, copied JSON, downloaded JSON, and import restore. That alignment matters because firewall commands are easy to misread once a rule includes action, direction, interface, protocol, source, source port, destination, destination port, comments, and route mode.</p>

  <p><a id="generate-ufw-command-cite-technical-server" class="generate-ufw-command-citation-link" href="#generate-ufw-command-ref-server"><span class="generate-ufw-command-citation-inline">Ubuntu Server documentation</span></a> explains that Linux firewall handling is built around kernel packet filtering and user-space tools, with UFW offered as a simpler frontend. <a id="generate-ufw-command-cite-technical-manpage" class="generate-ufw-command-citation-link" href="#generate-ufw-command-ref-manpage"><span class="generate-ufw-command-citation-inline">The Ubuntu ufw manpage</span></a> provides the syntax boundary used by the workspace: <code>ufw</code> commands can use dry-run mode, rule actions, route mode, protocol selectors, source and destination addresses, ports, logging, comments, and application-profile names.</p>

  <h3 class="generate-ufw-command-technical-step-heading">1. Rule State</h3>
  <p>The visible fields are treated as command state, not as hidden helper data. The rule target gives a quick anchor such as <code>22/tcp</code>, <code>443/tcp</code>, <code>OpenSSH</code>, or a reviewed address. The profile sets a starting shape, while the custom controls decide the final command. This lets the generated rows show what the command means before a user copies it.</p>

  <h3 class="generate-ufw-command-technical-step-heading">2. Action And Direction</h3>
  <p>The action selector emits <code>allow</code>, <code>deny</code>, <code>reject</code>, or <code>limit</code>. In normal host-rule mode, the direction selector emits <code>in</code> or <code>out</code>. Route mode emits <code>ufw route</code> and uses inbound and optional outbound interfaces instead of a simple inbound or outbound host rule.</p>

  <h3 class="generate-ufw-command-technical-step-heading">3. Source, Destination, And Ports</h3>
  <p>Source and destination can be <code>any</code>, a host address, or a CIDR range. Destination port and source port values are validated as integers from 1 to 65535. A broad allow rule with <code>any</code> source, <code>any</code> destination, and no service port triggers a warning because that shape is easy to apply too widely.</p>

  <h3 class="generate-ufw-command-technical-step-heading">4. Logging, Dry Run, And Insert</h3>
  <p>The log toggle emits a rule-level logging token. Dry-run mode emits <code>--dry-run</code>, so the command previews parsing behavior instead of applying a change. Insert mode emits <code>ufw insert &lt;position&gt;</code> with a validated position. When insert and route are combined, the output remains explicit and the warning panel tells the operator to confirm support on the target UFW version before applying.</p>

  <h3 class="generate-ufw-command-technical-step-heading">5. Application Profiles</h3>
  <p>Application profile mode emits a profile-oriented command such as <code>sudo ufw allow OpenSSH</code>. In that mode, source, destination, route, insert, and port selectors are intentionally ignored and the warning panel says so. This keeps application-profile commands compact without pretending that host-rule selectors still apply.</p>

  <h3 class="generate-ufw-command-technical-step-heading">6. Export And Restore Boundary</h3>
  <p>The JSON export preserves the normalized state, generated command, warnings, errors, summary rows, operation rows, and metadata. Import JSON restores that state into the workspace. It does not prove the command was ever applied, still matches the host, or is safe for production. Treat JSON as review state, not firewall evidence.</p>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-command-tips">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Command Tips</span></h2>
  <p>Use these checks before copying a generated UFW command into a privileged shell.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span> <span>Keep broad allow rules visible</span></summary>
    <div class="tool-guidance-answer">
      <p>If source is <code>any</code>, confirm the service should be reachable from every source that can route to the host.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-diagram-3" aria-hidden="true"></i></span> <span>Review route rules separately</span></summary>
    <div class="tool-guidance-answer">
      <p>Route rules can affect forwarded traffic, so review interfaces, forwarding policy, and destination service ownership before applying them.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span> <span>Use dry run for first review</span></summary>
    <div class="tool-guidance-answer">
      <p>Dry-run output is useful for command shape review, but it still does not prove that the final rule is authorized or operationally correct.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-how-to">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to convert firewall intent into a reviewed command and restoreable JSON state.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-card-checklist" aria-hidden="true"></i></span> <span>1. Choose a profile</span></summary>
    <div class="tool-guidance-answer">
      <p>Select SSH admin, web service, deny source, route service, or application profile, then apply the preset.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>2. Tune the rule</span></summary>
    <div class="tool-guidance-answer">
      <p>Set action, source, destination, direction, protocol, port, interface, comment, route mode, dry-run, and insert posture.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-clipboard-check" aria-hidden="true"></i></span> <span>3. Generate and inspect</span></summary>
    <div class="tool-guidance-answer">
      <p>Generate the command, then inspect Operations, Command, Details, Warnings, and JSON before copying.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>4. Export or restore</span></summary>
    <div class="tool-guidance-answer">
      <p>Use CSV for review rows and JSON when another person needs to restore the exact command state later.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-examples generate-ufw-command-markdown-card-commands">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>
  <p>Copy a sample only after replacing the addresses, interfaces, service names, and comments with reviewed values.</p>

  <pre class="generate-ufw-command-command-pre"><code>sudo ufw allow in on eth0 proto tcp from 192.0.2.10 to any port 22 comment 'Allow SSH administration'</code></pre>
  <details class="generate-ufw-command-command-note">
    <summary>
      <span class="generate-ufw-command-command-note-label generate-ufw-command-command-note-label-closed">Show command use</span>
      <span class="generate-ufw-command-command-note-label generate-ufw-command-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-ufw-command-command-copy-btn" data-command-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>SSH admin:</strong> Allows TCP/22 only from one reviewed source address.</div></div>
  </details>

  <pre class="generate-ufw-command-command-pre"><code>sudo ufw deny in log from 203.0.113.50 to any comment 'Block reviewed source host'</code></pre>
  <details class="generate-ufw-command-command-note">
    <summary>
      <span class="generate-ufw-command-command-note-label generate-ufw-command-command-note-label-closed">Show command use</span>
      <span class="generate-ufw-command-command-note-label generate-ufw-command-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-ufw-command-command-copy-btn" data-command-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Deny source:</strong> Blocks and logs traffic from one reviewed source.</div></div>
  </details>

  <pre class="generate-ufw-command-command-pre"><code>sudo ufw route allow in on eth0 out on eth1 proto tcp from 10.0.0.0/24 to 10.0.1.10 port 443 comment 'Allow routed HTTPS traffic'</code></pre>
  <details class="generate-ufw-command-command-note">
    <summary>
      <span class="generate-ufw-command-command-note-label generate-ufw-command-command-note-label-closed">Show command use</span>
      <span class="generate-ufw-command-command-note-label generate-ufw-command-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-ufw-command-command-copy-btn" data-command-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Route service:</strong> Formats a forwarded traffic rule with inbound and outbound interfaces.</div></div>
  </details>

  <pre class="generate-ufw-command-command-pre"><code>sudo ufw --dry-run allow OpenSSH comment 'Review OpenSSH application profile'</code></pre>
  <details class="generate-ufw-command-command-note generate-ufw-command-command-note-last">
    <summary>
      <span class="generate-ufw-command-command-note-label generate-ufw-command-command-note-label-closed">Show command use</span>
      <span class="generate-ufw-command-command-note-label generate-ufw-command-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-ufw-command-command-copy-btn" data-command-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Application profile:</strong> Uses a named UFW application profile and dry-run review.</div></div>
  </details>
</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-export">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>Exports capture command-review state. They do not apply firewall rules or prove the target host state.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i></span> <span>Export PDF</span></summary>
    <div class="tool-export-answer"><p>Opens the browser print flow for a review copy of the visible command workspace.</p></div>
  </details>
  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>Download CSV</span></summary>
    <div class="tool-export-answer"><p>Downloads summary rows, operation rows, warnings, and errors for ticket review.</p></div>
  </details>
  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span> <span>Copy or download JSON</span></summary>
    <div class="tool-export-answer"><p>Copies or downloads the normalized UFW command state for later restore.</p></div>
  </details>
  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-upload" aria-hidden="true"></i></span> <span>Import JSON</span></summary>
    <div class="tool-export-answer"><p>Restores a previous command-building state into the visible controls.</p></div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-faq">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>Common boundaries for the UFW command workspace.</p>

  <details class="tool-faq-item" open>
    <summary><span class="tool-faq-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span> <span>Does this tool run UFW?</span></summary>
    <div class="tool-faq-answer"><p>No. It generates command text in the browser and never runs firewall changes.</p></div>
  </details>
  <details class="tool-faq-item">
    <summary><span class="tool-faq-icon"><i class="bi bi-shield-check" aria-hidden="true"></i></span> <span>Does dry run make the rule safe?</span></summary>
    <div class="tool-faq-answer"><p>No. Dry run helps review command parsing, but approval and host-specific correctness still need operational review.</p></div>
  </details>
  <details class="tool-faq-item">
    <summary><span class="tool-faq-icon"><i class="bi bi-diagram-3" aria-hidden="true"></i></span> <span>Why does route mode warn?</span></summary>
    <div class="tool-faq-answer"><p>Route rules affect forwarded traffic and may depend on forwarding policy and interface choices beyond the command text.</p></div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.11_glossary -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-glossary">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-book" aria-hidden="true"></i><span>Glossary</span></h2>

  <table>
    <thead>
      <tr>
        <th>Term</th>
        <th>Meaning in this workspace</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Action</td><td>The UFW rule behavior: <code>allow</code>, <code>deny</code>, <code>reject</code>, or <code>limit</code>.</td></tr>
      <tr><td>Application profile</td><td>A named UFW service profile such as <code>OpenSSH</code> that can stand in for explicit port and protocol selectors.</td></tr>
      <tr><td>Dry run</td><td>The <code>--dry-run</code> option, used to preview UFW parsing without applying a firewall change.</td></tr>
      <tr><td>Route rule</td><td>A UFW rule for forwarded traffic that uses the <code>route</code> keyword and interface direction.</td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.11_glossary -->

<!-- ns:start main.content.10_references -->
<div class="content-card generate-ufw-command-markdown-card generate-ufw-command-markdown-card-references">
  <h2 class="generate-ufw-command-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Source</th>
        <th>Use in this tool</th>
      </tr>
    </thead>
    <tbody>
      <tr id="generate-ufw-command-ref-server">
        <td>1</td>
        <td><a href="https://ubuntu.com/server/docs/how-to/security/firewalls/" rel="noopener noreferrer">Ubuntu Server documentation: Firewall</a></td>
        <td>UFW role as the Ubuntu firewall frontend and firewall management context.</td>
      </tr>
      <tr id="generate-ufw-command-ref-manpage">
        <td>2</td>
        <td><a href="https://manpages.ubuntu.com/manpages/noble/man8/ufw.8.html" rel="noopener noreferrer">Ubuntu manpage: ufw</a></td>
        <td>Command syntax, rule actions, dry-run mode, route mode, protocol, source, destination, port, logging, comments, and application-profile behavior.</td>
      </tr>
      <tr id="generate-ufw-command-ref-wiki">
        <td>3</td>
        <td><a href="https://wiki.ubuntu.com/UncomplicatedFirewall" rel="noopener noreferrer">Ubuntu Wiki: UncomplicatedFirewall</a></td>
        <td>Project background and UFW terminology review.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
