[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-overview">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

  <p>SSH Command Generator is a browser-owned command builder for preparing reviewed OpenSSH command lines. It collects the target, login user, shell quoting style, profile, optional jump path, port, identity file, host-key posture, known-hosts file, log level, session mode, agent and TTY choices, keepalive settings, forwarding rules, extra arguments, warning rows, export rows, and JSON restore data.</p>

  <p><a id="generate-ssh-shell-cite-primary" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-primary"><span class="generate-ssh-shell-citation-inline">OpenBSD Project (2025)</span></a> documents <code>ssh</code> as the OpenSSH remote login client and describes command-line options such as jump hosts and port forwarding. This workspace turns those option choices into a visible command preview, but it does not connect to the host, test credentials, verify trust, or execute anything.</p>

  <p><a id="generate-ssh-shell-cite-architecture" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-architecture"><span class="generate-ssh-shell-citation-inline">Ylonen and Lonvick (2006)</span></a> describe SSH as a protocol architecture for secure remote login and other network services. The tool stays at the command-review layer: it helps prepare an operator-facing command string and supporting review rows before a person decides whether to run it.</p>

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
        <td>Target and profile</td>
        <td>Target host, login user, shell style, profile defaults, and optional jump route.</td>
        <td>Confirm the target is authorized and the profile matches the intended access path.</td>
      </tr>
      <tr>
        <td>Custom settings</td>
        <td>Port, identity file, host-key checking, known-hosts path, log level, session mode, forwarding, timeout, and extra arguments.</td>
        <td>Review options that can change trust, routing, forwarding, or remote command behavior.</td>
      </tr>
      <tr>
        <td>Output</td>
        <td>SSH command preview, operation rows, summary rows, warnings, errors, CSV, and JSON.</td>
        <td>The browser cannot prove that the remote host, credentials, key files, or network path will work.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-technical">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <p>The generated command comes from one normalized state model. The same state drives the command preview, target summary, option rows, warning rows, CSV output, copied JSON, downloaded JSON, and JSON restore. That alignment matters because SSH commands can become dense quickly. A target, jump host, identity file, forwarding rule, host-key mode, and keepalive setting should appear in the command and in the review rows so an operator can inspect the intent before anything reaches a terminal.</p>

  <p>The workspace follows OpenSSH command and configuration semantics where they are relevant to the exposed controls. <a id="generate-ssh-shell-cite-technical-primary" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-primary"><span class="generate-ssh-shell-citation-inline">OpenBSD Project (2025)</span></a> documents <code>-J</code> as a shortcut for <code>ProxyJump</code> and describes <code>-L</code>, <code>-R</code>, and <code>-D</code> forwarding behavior. <a id="generate-ssh-shell-cite-technical-config" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-config"><span class="generate-ssh-shell-citation-inline">OpenBSD Project (2026)</span></a> documents client configuration options such as <code>StrictHostKeyChecking</code>, <code>ServerAliveInterval</code>, and token expansion. <a id="generate-ssh-shell-cite-technical-architecture" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-architecture"><span class="generate-ssh-shell-citation-inline">Ylonen and Lonvick (2006)</span></a> describe host keys, user authentication, and connection channels as core parts of the SSH architecture, which is why host trust, authentication choices, and forwarding deserve explicit review.</p>

  <table>
    <thead>
      <tr>
        <th>Review layer</th>
        <th>What the workspace makes visible</th>
        <th>What the shell or host still decides</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Target</td><td>Destination host, login user, port, shell quoting, profile, and route preview.</td><td>DNS, routing, reachability, account existence, authorization, and credential validity.</td></tr>
      <tr><td>Trust</td><td>Host-key checking mode, known-hosts path, and trust warnings.</td><td>Actual host key, known-hosts database contents, CA policy, and changed-key handling.</td></tr>
      <tr><td>Routing</td><td>ProxyJump route, local forwarding, remote forwarding, dynamic forwarding, and session mode.</td><td>Firewall rules, server forwarding permissions, bind addresses, privileged ports, and local policy.</td></tr>
      <tr><td>Execution</td><td>Command string, option rows, warning rows, CSV, and restore-ready JSON.</td><td>Whether the command succeeds, prompts, hangs, changes state, or violates local operational policy.</td></tr>
    </tbody>
  </table>

  <h3 class="generate-ssh-shell-technical-step-heading">1. Target State And Profile Defaults</h3>
  <p>The target field is the anchor. It can be a hostname, address, or user-qualified destination such as <code>deploy@app01.example.com</code>. The login user field can also supply the user separately. The model keeps these pieces visible because mixing a user in the target with a different login user in a separate field is a common source of confusion. The generated command should make the final identity unambiguous.</p>
  <p>Profiles seed common shapes without locking the user into them. An interactive profile favors normal login review. A bastion profile makes the jump path visible. A port-forward profile highlights forwarding and no-command behavior. A batch profile emphasizes less interactive behavior. These are command-building presets, not environment detection. They should be reviewed exactly like manually entered options.</p>
  <ul>
    <li>Use the target preview to catch accidental user, host, or route drift.</li>
    <li>Apply a profile as a starting point, then adjust visible options before copying.</li>
    <li>Keep route and session mode choices aligned; a forwarding-only command usually does not need a remote shell.</li>
  </ul>

  <h3 class="generate-ssh-shell-technical-step-heading">2. Host-Key Posture</h3>
  <p>Host-key handling is a command-review decision, not decorative metadata. <a id="generate-ssh-shell-cite-host-keys" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-architecture"><span class="generate-ssh-shell-citation-inline">Ylonen and Lonvick (2006)</span></a> describe host keys as the basis for verifying that the client is talking to the intended server. The workspace exposes <code>StrictHostKeyChecking</code> because changing it can alter how new or changed keys are handled.</p>
  <p>The default mode in this tool is <code>accept-new</code>, which is useful for many modern workflows because new keys can be recorded while changed keys are not silently accepted. The stricter <code>yes</code> mode requires known keys to exist already. The weaker <code>no</code> mode is a risk signal and should be treated as an exception that needs an explicit reason. A known-hosts file field can make a temporary or workflow-specific trust store visible, but the browser cannot read or validate that file.</p>
  <ul>
    <li>Use <code>StrictHostKeyChecking=yes</code> when the known-hosts path is controlled and preloaded.</li>
    <li>Use <code>accept-new</code> only when first-connect behavior is acceptable for the workflow.</li>
    <li>Avoid <code>StrictHostKeyChecking=no</code> unless the risk is deliberate and documented.</li>
  </ul>

  <h3 class="generate-ssh-shell-technical-step-heading">3. Jump Hosts And Route Boundaries</h3>
  <p>A jump host changes the path to the target. <a id="generate-ssh-shell-cite-proxyjump" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-primary"><span class="generate-ssh-shell-citation-inline">OpenBSD Project (2025)</span></a> documents <code>-J</code> as connecting to the target by first making an SSH connection to a jump host and then forwarding to the final destination. That keeps the final destination in the command while making the intermediate route explicit.</p>
  <p>The workspace does not test whether the jump host can reach the target, whether the operator has access to both hops, or whether a bastion policy permits the route. It only puts the route into a reviewable command shape. When a route is sensitive, review it with the bastion owner and confirm whether per-host configuration should live in <code>~/.ssh/config</code> instead of a one-off command.</p>

  <h3 class="generate-ssh-shell-technical-step-heading">4. Forwarding Modes</h3>
  <p>Forwarding options are powerful because they turn an SSH connection into a transport path for other traffic. Local forwarding exposes a local listener that reaches a destination from the remote side. Remote forwarding exposes a remote listener that reaches back toward the client side. Dynamic forwarding creates a SOCKS proxy. The command builder shows these values in operation rows and warnings because a single flag can change network exposure and owner responsibilities.</p>
  <p>Use bind addresses deliberately. A local forward bound to <code>127.0.0.1</code> is different from a listener exposed on all interfaces. A remote forward may depend on server-side settings. Privileged ports may require elevated privileges. The tool can format the option, but it cannot confirm server policy, firewall behavior, or whether the forwarded destination is appropriate.</p>
  <ul>
    <li>Prefer explicit bind addresses such as <code>127.0.0.1</code> for local-only listeners.</li>
    <li>Use <code>-N</code> or a forwarding-only session mode when no remote shell is needed.</li>
    <li>Document why a remote or dynamic forward is needed before sharing the command.</li>
  </ul>

  <h3 class="generate-ssh-shell-technical-step-heading">5. Agent, TTY, And Session Choices</h3>
  <p>Agent forwarding and TTY allocation are not harmless toggles. <a id="generate-ssh-shell-cite-agent" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-primary"><span class="generate-ssh-shell-citation-inline">OpenBSD Project (2025)</span></a> warns that agent forwarding should be enabled with caution because users with access to the remote agent socket can perform operations with loaded identities. The workspace surfaces that as a warning so operators do not treat <code>-A</code> as a convenience-only option.</p>
  <p>TTY allocation affects remote command behavior and interactive tools. It can be useful for menu systems or commands that require a terminal, but it can also break non-interactive batch flows. Session mode should match the goal: interactive login, batch command, forwarding-only, or a reviewed combination. The command preview and operation rows should make this visible enough for peer review.</p>

  <h3 class="generate-ssh-shell-technical-step-heading">6. Keepalive, Timeout, And Logging</h3>
  <p>Connection health options are review controls, not reachability proof. <a id="generate-ssh-shell-cite-keepalive" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-config"><span class="generate-ssh-shell-citation-inline">OpenBSD Project (2026)</span></a> documents <code>ServerAliveInterval</code> as a protocol-level message sent when no data has been received from the server, and <code>ServerAliveCountMax</code> as the threshold for disconnecting. These values can help a workflow fail more clearly, but the browser cannot know the right timeout for a specific network path.</p>
  <p>Log level can make troubleshooting easier, but verbose output may expose hostnames, paths, key names, or operational details in copied terminal logs. Treat debug settings as temporary. If the generated command is going into a ticket or runbook, use the lowest verbosity that still supports the review goal.</p>

  <h3 class="generate-ssh-shell-technical-step-heading">7. Shell Quoting And Extra Arguments</h3>
  <p>Shell quoting is part of the command contract. A path with spaces, a user-supplied host, a local forwarding string, or an extra option can be interpreted differently depending on the selected shell style. <a id="generate-ssh-shell-cite-token-safety" class="generate-ssh-shell-citation-link" href="#generate-ssh-shell-ref-config"><span class="generate-ssh-shell-citation-inline">OpenBSD Project (2026)</span></a> notes that some SSH configuration arguments can expand tokens and that users are responsible for safety where shell characters are involved. The generator can quote its own output, but it cannot prove that a copied external value is safe or intended.</p>
  <p>Extra arguments are therefore review-sensitive. They are useful for advanced OpenSSH options, but they can override visible controls or add behavior that reviewers miss. Keep them short, explicit, and tied to a reason. If the same extra option appears repeatedly, consider moving it into a reviewed SSH config entry instead of hiding it in ad hoc command text.</p>

  <h3 class="generate-ssh-shell-technical-step-heading">8. JSON Restore Boundary</h3>
  <p>The JSON export preserves the normalized state, generated command, warnings, errors, summary rows, operation rows, and metadata. Import JSON restores the command-building state into this browser workspace. It does not prove that the command previously worked, that the remote host still exists, that keys are present, or that policy still permits the route. Treat JSON as editable command-review state, not execution history.</p>
  <p>This boundary is useful during peer review. One operator can generate a command, export JSON, and hand it to another reviewer. The reviewer can restore the state, inspect options, change host-key mode or forwarding, and export a revised command without reverse-engineering a long shell line.</p>

  <h3 class="generate-ssh-shell-technical-step-heading">9. Practical Review Checklist</h3>
  <p>Before copying the command, use the output as a checklist:</p>
  <ul>
    <li><strong>Intent:</strong> Confirm why SSH is needed and whether this is login, batch command, jump access, or forwarding.</li>
    <li><strong>Identity:</strong> Confirm target, login user, identity file, and account ownership.</li>
    <li><strong>Trust:</strong> Confirm host-key mode, known-hosts path, and whether new or changed keys should be accepted.</li>
    <li><strong>Route:</strong> Confirm jump host, final host, bind addresses, and forwarding direction.</li>
    <li><strong>Runtime:</strong> Confirm timeout, keepalive, verbosity, TTY, agent forwarding, and extra arguments.</li>
    <li><strong>Handoff:</strong> Keep CSV or JSON with a ticket when another person must review the command later.</li>
  </ul>

  <h3 class="generate-ssh-shell-technical-step-heading">10. What The Workspace Does Not Prove</h3>
  <p>The workspace does not connect to the target, validate DNS, test a TCP port, check a private key file, authenticate to a server, verify a host key, inspect <code>known_hosts</code>, test jump-host reachability, confirm forwarding policy, run remote commands, or prove operational approval. A command can be syntactically tidy and still fail or violate local policy.</p>
  <p>The safe pattern is generate, review, confirm environment facts, then execute only in the correct terminal context. If the command touches a production host, opens a tunnel, forwards an agent, weakens host-key checking, or includes extra arguments, require the same review discipline you would use for a shell script. It is still a command with real side effects once pasted into a terminal.</p>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-command-tips">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Command Tips</span></h2>
  <p>Use these checks before copying a generated SSH command into a real terminal.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span> <span>Keep host-key behavior deliberate</span></summary>
    <div class="tool-guidance-answer">
      <p>Prefer <code>StrictHostKeyChecking=yes</code> or <code>accept-new</code> for normal work. Treat <code>no</code> as an exception that needs a written reason.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-diagram-3" aria-hidden="true"></i></span> <span>Review jump routes</span></summary>
    <div class="tool-guidance-answer">
      <p>A <code>-J</code> route makes the bastion path explicit, but it does not prove the bastion can reach the target or that the route is authorized.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-hdd-network" aria-hidden="true"></i></span> <span>Bind forwards narrowly</span></summary>
    <div class="tool-guidance-answer">
      <p>Use explicit loopback bind addresses for local forwards unless the listener must be reachable from another host.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-key" aria-hidden="true"></i></span> <span>Use agent forwarding sparingly</span></summary>
    <div class="tool-guidance-answer">
      <p>Enable <code>-A</code> only when the remote workflow requires it and the intermediate host is trusted for that use.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-how-to">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to convert SSH access intent into a reviewed command and restoreable JSON state.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-card-checklist" aria-hidden="true"></i></span> <span>1. Enter the target</span></summary>
    <div class="tool-guidance-answer">
      <p>Start with the destination host or <code>user@host</code> target. Set the login user separately when you want the final identity to be obvious.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>2. Apply a profile</span></summary>
    <div class="tool-guidance-answer">
      <p>Choose interactive, bastion, port-forward, or batch as a starting point, then inspect the fields that changed.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span> <span>3. Tune Custom settings</span></summary>
    <div class="tool-guidance-answer">
      <p>Review port, identity, host-key mode, known-hosts path, log level, TTY, agent forwarding, timeouts, forwarding, and extra arguments.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-clipboard-check" aria-hidden="true"></i></span> <span>4. Generate and inspect</span></summary>
    <div class="tool-guidance-answer">
      <p>Generate the command, then inspect Operations, Command, Details, Warnings, and JSON before copying.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>5. Export or restore</span></summary>
    <div class="tool-guidance-answer">
      <p>Use CSV for review rows and JSON when the complete command state needs to be restored or peer-reviewed later.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-examples generate-ssh-shell-markdown-card-commands">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>
  <p>Copy a sample, replace the hostnames and paths, then confirm the generated command matches the intended profile before running it.</p>

  <pre class="generate-ssh-shell-command-pre"><code>ssh -p 22 -i ~/.ssh/id_ed25519 deploy@app01.example.com</code></pre>
  <details class="generate-ssh-shell-command-note">
    <summary>
      <span class="generate-ssh-shell-command-note-label generate-ssh-shell-command-note-label-closed">Show command use</span>
      <span class="generate-ssh-shell-command-note-label generate-ssh-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-ssh-shell-command-copy-btn" data-command-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Interactive login:</strong> Shows explicit port, identity file, and target identity.</div></div>
  </details>

  <pre class="generate-ssh-shell-command-pre"><code>ssh -J ops@bastion.example.com deploy@app01.internal</code></pre>
  <details class="generate-ssh-shell-command-note">
    <summary>
      <span class="generate-ssh-shell-command-note-label generate-ssh-shell-command-note-label-closed">Show command use</span>
      <span class="generate-ssh-shell-command-note-label generate-ssh-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-ssh-shell-command-copy-btn" data-command-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Bastion route:</strong> Makes the jump host visible before the final destination.</div></div>
  </details>

  <pre class="generate-ssh-shell-command-pre"><code>ssh -N -L 127.0.0.1:15432:db.internal:5432 deploy@app01.example.com</code></pre>
  <details class="generate-ssh-shell-command-note">
    <summary>
      <span class="generate-ssh-shell-command-note-label generate-ssh-shell-command-note-label-closed">Show command use</span>
      <span class="generate-ssh-shell-command-note-label generate-ssh-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-ssh-shell-command-copy-btn" data-command-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Local forward:</strong> Uses no remote command and binds the local listener to loopback.</div></div>
  </details>

  <pre class="generate-ssh-shell-command-pre"><code>ssh -o StrictHostKeyChecking=yes -o UserKnownHostsFile=~/.ssh/known_hosts deploy@app01.example.com</code></pre>
  <details class="generate-ssh-shell-command-note generate-ssh-shell-command-note-last">
    <summary>
      <span class="generate-ssh-shell-command-note-label generate-ssh-shell-command-note-label-closed">Show command use</span>
      <span class="generate-ssh-shell-command-note-label generate-ssh-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-ssh-shell-command-copy-btn" data-command-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Strict trust:</strong> Requires a known host key before connection and makes the trust file explicit.</div></div>
  </details>
</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-export">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>Exports capture command-review state. They do not connect to the target, verify host keys, test forwarding, or confirm that credentials work.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-clipboard" aria-hidden="true"></i></span> <span>Copy generated command</span></summary>
    <div class="tool-export-answer">
      <p>Copies the rendered SSH command from the Command tab. Review warnings and option rows before using it in a terminal.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i></span> <span>Export PDF</span></summary>
    <div class="tool-export-answer">
      <p>Opens a print-ready command review with the command, summary, operation rows, warnings, and JSON boundary notes.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i></span> <span>Download CSV</span></summary>
    <div class="tool-export-answer">
      <p>Downloads summary, option, warning, and error rows for peer review or ticket handoff.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span> <span>Copy JSON / Download JSON</span></summary>
    <div class="tool-export-answer">
      <p>Preserves the normalized SSH command model, generated command, warnings, errors, and output rows.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-upload" aria-hidden="true"></i></span> <span>Import JSON</span></summary>
    <div class="tool-export-answer">
      <p>Restores a JSON payload created by this tool so the command state can be reviewed or adjusted later.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-faq">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>These answers clarify what the SSH workspace generates, what it does not verify, and how to treat the exported state.</p>

  <details class="faq-item" open>
    <summary><span>Does the tool connect to my SSH target?</span></summary>
    <div class="faq-answer">
      <p>No. It generates command text and review data only.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Does it validate credentials or key files?</span></summary>
    <div class="faq-answer">
      <p>No. The browser cannot read your private key path, confirm account access, or verify that a credential will authenticate.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Why does agent forwarding trigger a warning?</span></summary>
    <div class="faq-answer">
      <p>Agent forwarding exposes an agent socket to the remote side. It should be used only when the workflow requires it and the remote host is trusted for that use.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>What does JSON restore preserve?</span></summary>
    <div class="faq-answer">
      <p>JSON restore preserves the command-builder state and generated rows. It does not preserve proof that the command was executed or worked.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.11_glossary -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-glossary">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-book" aria-hidden="true"></i><span>Glossary</span></h2>
  <p>Use these terms to read generated SSH commands and explain the difference between command-line behavior, configuration files, and remote shell execution.</p>
  <table>
    <thead><tr><th>Term</th><th>Meaning</th><th>Why it matters in this tool</th></tr></thead>
    <tbody>
      <tr><td>Destination</td><td>The final SSH target, usually expressed as a user, hostname, and optional port.</td><td>The destination owns the command's remote endpoint and changes how identity, proxy, and port values combine.</td></tr>
      <tr><td>Identity File</td><td>A private key path passed to SSH with <code>-i</code> or selected through configuration.</td><td>The generator keeps it explicit so users can review which credential path the command will try.</td></tr>
      <tr><td>ProxyJump</td><td>An SSH option that connects through one or more intermediate hosts before reaching the final destination.</td><td>Jump-host routing changes the actual network path and is easy to miss in long commands.</td></tr>
      <tr><td>Port Forward</td><td>A local, remote, or dynamic forwarding option that carries traffic through the SSH connection.</td><td>Forwarding changes what services the session exposes and should be reviewed before copying the command.</td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.11_glossary -->

<!-- ns:start main.content.10_references -->
<div class="content-card generate-ssh-shell-markdown-card generate-ssh-shell-markdown-card-citations">
  <h2 class="generate-ssh-shell-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>
  <p>These sources support the in-text citations used in this tool page.</p>

  <table class="generate-ssh-shell-citation-table">
    <thead>
      <tr>
        <th>Source type</th>
        <th>In-text citation</th>
        <th>Reference</th>
      </tr>
    </thead>
    <tbody>
      <tr id="generate-ssh-shell-ref-primary">
        <td>Manual</td>
        <td><a class="generate-ssh-shell-citation-backlink" href="#generate-ssh-shell-cite-primary"><span class="generate-ssh-shell-citation-inline">(OpenBSD Project, 2025)</span></a></td>
        <td>OpenBSD Project. (2025). <em>ssh(1) - OpenBSD manual pages</em>. Retrieved May 31, 2026. <a href="https://man.openbsd.org/ssh.1">https://man.openbsd.org/ssh.1</a></td>
      </tr>
      <tr id="generate-ssh-shell-ref-config">
        <td>Manual</td>
        <td><a class="generate-ssh-shell-citation-backlink" href="#generate-ssh-shell-cite-technical-config"><span class="generate-ssh-shell-citation-inline">(OpenBSD Project, 2026)</span></a></td>
        <td>OpenBSD Project. (2026). <em>ssh_config(5) - OpenBSD manual pages</em>. Retrieved May 31, 2026. <a href="https://man.openbsd.org/ssh_config">https://man.openbsd.org/ssh_config</a></td>
      </tr>
      <tr id="generate-ssh-shell-ref-architecture">
        <td>RFC</td>
        <td><a class="generate-ssh-shell-citation-backlink" href="#generate-ssh-shell-cite-architecture"><span class="generate-ssh-shell-citation-inline">(Ylonen & Lonvick, 2006)</span></a></td>
        <td>Ylonen, T., & Lonvick, C. (2006). <em>RFC 4251: The Secure Shell (SSH) Protocol Architecture</em>. RFC Editor. <a href="https://www.rfc-editor.org/rfc/rfc4251">https://www.rfc-editor.org/rfc/rfc4251</a></td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
