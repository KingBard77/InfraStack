[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-overview">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

  <p>Netcat Command Generator turns a socket troubleshooting brief into a reviewed <code>nc</code>, <code>netcat</code>, or <code>ncat</code> command. It keeps the implementation, mode, protocol, host, port, timing, source binding, proxy, TLS, and handler choices visible before the command is copied into a shell.</p>

  <p><a id="generate-netcat-shell-cite-review" class="generate-netcat-shell-citation-link" href="#generate-netcat-shell-ref-review"><span class="generate-netcat-shell-citation-inline">BusyBox (n.d.)</span></a> documents a compact <code>nc</code> applet with fewer options than full implementations, so this page treats variant support as a first-class review item instead of pretending every flag exists everywhere.</p>

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
        <td>Connection mode</td>
        <td>Client, listener, or zero-I/O scan command shape.</td>
        <td>Confirm host, port range, and whether listen mode should stay open.</td>
      </tr>
      <tr>
        <td>Implementation</td>
        <td>OpenBSD <code>nc</code>, traditional netcat, BusyBox <code>nc</code>, or Ncat-style flags.</td>
        <td>Check the target system with <code>nc -h</code> or <code>ncat --help</code>.</td>
      </tr>
      <tr>
        <td>Output</td>
        <td>Command, warnings, option rows, CSV data, and JSON payload.</td>
        <td>Use exported data as a review artifact, not as proof that a remote service is reachable.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-technical">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <p>The generated command model is based on the documented behavior of netcat-style utilities, but it deliberately treats each implementation as a separate target. <a id="generate-netcat-shell-cite-primary" class="generate-netcat-shell-citation-link" href="#generate-netcat-shell-ref-primary"><span class="generate-netcat-shell-citation-inline">OpenBSD Project (2025)</span></a> documents <code>nc</code> as a socket utility for TCP, UDP, Unix-domain sockets, listening, scanning, IPv4, and IPv6. <a id="generate-netcat-shell-cite-method" class="generate-netcat-shell-citation-link" href="#generate-netcat-shell-ref-method"><span class="generate-netcat-shell-citation-inline">Nmap Project (n.d.)</span></a> documents Ncat as a broader connector with SSL, proxy, access-control, broker, and command-execution features. <a id="generate-netcat-shell-cite-technical-review" class="generate-netcat-shell-citation-link" href="#generate-netcat-shell-ref-review"><span class="generate-netcat-shell-citation-inline">BusyBox (n.d.)</span></a> documents a smaller applet surface, which is why the workspace does not assume that every flag exists on every host.</p>

  <table>
    <thead>
      <tr>
        <th>Review layer</th>
        <th>What the workspace makes visible</th>
        <th>What the network still decides</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Implementation</td><td>OpenBSD <code>nc</code>, Ncat, BusyBox <code>nc</code>, or traditional netcat-oriented command shape.</td><td>The actual binary, local help output, packaged feature set, and platform-specific option behavior.</td></tr>
      <tr><td>Direction</td><td>Client, listener, scan, host, port, protocol, address family, and binding intent.</td><td>DNS, route, firewall, authorization, interface availability, and whether testing is allowed.</td></tr>
      <tr><td>Session behavior</td><td>Timeouts, delays, standard input behavior, keep-open choices, proxy, TLS, and handler options.</td><td>Runtime blocking, peer behavior, packet loss, certificates, proxy policy, and local process exposure.</td></tr>
      <tr><td>Evidence boundary</td><td>Command text, warnings, option rows, CSV, JSON, and printable review output.</td><td>Reachability, service response, packet flow, server logs, and whether the command was safe to run.</td></tr>
    </tbody>
  </table>

  <h3 class="generate-netcat-shell-technical-step-heading">1. Implementation Variant Comes First</h3>
  <p>The first technical decision is the implementation selector because <code>nc</code> is not one universal grammar. OpenBSD <code>nc</code> exposes options for listening, UDP, zero-I/O scanning, source binding, timeouts, address-family selection, proxying, and TLS. Ncat overlaps with that shape but has its own long-option vocabulary and a wider connector feature set. BusyBox <code>nc</code> is common in small images and recovery environments, but its option surface is compact. Traditional variants may support older execution flags that modern OpenBSD builds do not provide.</p>
  <p>The generator stores that implementation choice in the normalized model and uses it to decide which flags can be rendered, warned, or blocked. That keeps a laptop command from being silently treated as portable to a container image, router shell, appliance, or rescue environment.</p>
  <ul>
    <li>Confirm the target binary with local help output before trusting optional flags.</li>
    <li>Use the selected variant as part of the review, not as background metadata.</li>
    <li>Expect feature drift between full systems and minimal images.</li>
  </ul>

  <h3 class="generate-netcat-shell-technical-step-heading">2. Direction, Transport, Host, And Port</h3>
  <p>Netcat commands are easier to review when direction is explicit. A client command initiates a connection to a destination. A listener binds locally and waits for a peer. A scan checks whether one or more ports appear reachable without becoming a normal application session. Those modes share syntax, but they have different operational meaning. Listener mode can hold a terminal open and expose a local port. Scan mode can be noisy and should only be used where testing is authorized.</p>
  <p>Transport choice also changes interpretation. TCP has connection-oriented feedback; UDP does not provide the same handshake. A silent UDP result is not the same as a clean failure or success. Address family and binding options add another layer because IPv4, IPv6, source address, and source port choices can interact with routing and firewall policy.</p>
  <ul>
    <li>Review client, listener, and scan mode as separate workflows.</li>
    <li>Check UDP results carefully because lack of output is ambiguous.</li>
    <li>Confirm host, port, source binding, and address family against the actual network path.</li>
  </ul>

  <h3 class="generate-netcat-shell-technical-step-heading">3. Timing, Blocking, Input, And Output</h3>
  <p>Timeouts and delays are not cosmetic. They decide how long the command waits for a connection, how quickly multiple attempts happen, and how long an idle session may appear stuck. A short timeout can create false negatives on slow links. A long timeout can block a terminal or script. Some implementations also handle timeout flags differently in listen mode, so the generated warning rows are part of the command review.</p>
  <p>Netcat is often used as a pipe between standard input, standard output, and a network socket. That makes input behavior important. A command can wait for terminal input, disable stdin for a probe-like workflow, send a file through shell redirection, or close the write side after end-of-file. Redirection belongs to the shell, not to netcat itself, so examples should keep that syntax visible.</p>
  <ul>
    <li>Choose timeout values based on troubleshooting intent and expected network latency.</li>
    <li>Check whether the command should read from stdin, send a payload, or only test reachability.</li>
    <li>Remember that captured banners or responses may contain internal service details.</li>
  </ul>

  <h3 class="generate-netcat-shell-technical-step-heading">4. Proxy, TLS, And Handler Options</h3>
  <p>Proxy and TLS controls are grouped as advanced decisions because they can change routing and trust assumptions. Proxy type, proxy host, proxy port, and proxy authentication must match the selected implementation and local policy. TLS flags can enable encrypted transport, but they do not prove certificate names, trust roots, client certificates, protocol versions, or proxy interception behavior are acceptable. The workspace can expose fields and warnings; it cannot inspect a certificate chain or validate trust.</p>
  <p>Handler or command-execution options need even stronger review. Some netcat-family tools can connect a network session to a local program. That can be legitimate in controlled diagnostics, but it can also expose a process stream or shell-like behavior. The browser never executes handlers and never opens sockets. It only renders command text when the selected implementation can represent the requested behavior.</p>
  <ul>
    <li>Treat proxy and TLS settings as routing and trust decisions.</li>
    <li>Keep handler commands out of shared examples unless the context is controlled and authorized.</li>
    <li>Review local path, privilege, quoting, and exposure before running any handler workflow.</li>
  </ul>

  <h3 class="generate-netcat-shell-technical-step-heading">5. Warnings, Option Rows, And Normalized Output</h3>
  <p>The command, summary cards, warnings, option rows, CSV, JSON, and PDF output are generated from one normalized result. That matters because command builders drift when each output format is assembled independently. If a flag is unsupported for BusyBox <code>nc</code>, the warning and table should reflect that same decision. If a target port is missing, the command should not look copy-ready while the JSON pretends the model is valid.</p>
  <p>The option table is the peer-review surface. It breaks the command into tokens, values, and notes so reviewers can see why each flag exists. CSV can move that review into a runbook or ticket. JSON is stronger for restore in this netcat workspace because the tool can import the structured payload back into the form. None of those artifacts prove the network outcome.</p>
  <ul>
    <li>Read warnings before trusting the generated command.</li>
    <li>Use option rows to spot unsupported, risky, or missing values.</li>
    <li>Use JSON for restore only where this tool explicitly supports import.</li>
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
      <tr><td>Wrong variant</td><td>A flag that works with OpenBSD <code>nc</code> or Ncat may fail or mean something different in BusyBox or traditional netcat.</td><td>Confirm the target binary before enabling advanced options or copying a command into a runbook.</td></tr>
      <tr><td>Listener exposure</td><td>Listener mode can expose a local port and wait for inbound traffic longer than intended.</td><td>Review bind address, port, timeout, keep-open behavior, and firewall scope before running the listener.</td></tr>
      <tr><td>UDP interpretation</td><td>UDP has no connection handshake, so silence can mean success, packet loss, firewall drop, or application behavior.</td><td>Interpret UDP tests with logs, packet capture, or application-side evidence when the result matters.</td></tr>
      <tr><td>Handler normalization</td><td>Execution or handler options can connect network input to a local program and are sensitive even when the syntax is valid.</td><td>Keep handler commands out of shared examples unless the diagnostic context is controlled, authorized, and documented.</td></tr>
    </tbody>
  </table>

  <h3 class="generate-netcat-shell-technical-step-heading">6. Operational Boundary</h3>
  <p>The safe use of this workspace is command review. It makes implementation differences visible, reduces copy mistakes, and keeps risky options from hiding inside one dense line. It is not a port-scanner service, packet generator, socket runner, authorization system, compliance checker, or network proof. That boundary matters most for scan mode, listener mode, proxy traversal, TLS verification bypass, and handler commands.</p>
  <p>Before running a generated command, confirm the selected implementation, host, port, protocol, timeout, DNS behavior, source binding, output handling, and authorization to test the target. After running it, interpret results cautiously. A refused TCP connection, a silent UDP command, a proxy error, a timeout, or a TLS warning can each have several causes. The generated command starts the investigation; it does not finish it.</p>
  <ul>
    <li>Run netcat-style tests only against systems where testing is permitted.</li>
    <li>Do not treat exported review data as packet-flow evidence.</li>
    <li>Pair generated commands with host logs, firewall logs, service logs, or packet capture when the result matters.</li>
  </ul>
  <p>Use the section as a network command review checklist. The generated command should make the variant, direction, target, transport, timing, input behavior, proxy or TLS policy, and warning state clear before execution. If the workflow listens, scans, traverses a proxy, bypasses trust checks, or connects traffic to a local program, slow down and confirm authorization. Netcat-style tools are valuable because they are small and direct; that same directness makes explicit review more important, not less. The final check should identify which system initiates traffic, which system listens, what evidence will be collected, and who authorized the test path. Keep that context with the command whenever it leaves the browser.</p>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-command-tips">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Command Tips</span></h2>
  <p>Use these checks when the generated command moves from the browser into a terminal.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span> <span>Start with the implementation</span></summary>
    <div class="tool-guidance-answer">
      <p>OpenBSD <code>nc</code>, BusyBox <code>nc</code>, traditional netcat, and Ncat do not share the same flag surface. Confirm the binary first, then adjust optional flags.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-check2-square" aria-hidden="true"></i></span> <span>Keep listener intent explicit</span></summary>
    <div class="tool-guidance-answer">
      <p>Listener mode can block while waiting for a peer. Review bind address, port, keep-open behavior, and whether the listener should accept more than one connection.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-arrow-repeat" aria-hidden="true"></i></span> <span>Treat execution flags as sensitive</span></summary>
    <div class="tool-guidance-answer">
      <p>Options that run a local program after connection can expose a shell or process stream. Keep them out of shared examples unless the operational context is controlled and authorized.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span> <span>Set timeouts deliberately</span></summary>
    <div class="tool-guidance-answer">
      <p>Timeout and delay flags change troubleshooting behavior. Use short values for quick probes and more patient values for slow links or manual service interaction.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-how-to">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to turn a socket task into a reviewed command without skipping implementation, warning, and export checks.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-card-checklist" aria-hidden="true"></i></span> <span>Describe the socket task</span></summary>
    <div class="tool-guidance-answer">
      <p>Enter a short brief or choose a preset for a client probe, listener, UDP test, proxy path, TLS probe, or port range scan.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>Choose implementation and shell</span></summary>
    <div class="tool-guidance-answer">
      <p>Select the netcat variant and output shell so quoting, line continuation, and supported flags match the environment where the command will run.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-clipboard-check" aria-hidden="true"></i></span> <span>Review warnings and option rows</span></summary>
    <div class="tool-guidance-answer">
      <p>Check warnings for unsupported combinations, risky execution behavior, missing ports, or implementation mismatch before copying the command.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>Export the review artifact</span></summary>
    <div class="tool-guidance-answer">
      <p>Copy the command for the terminal, or export PDF, CSV, or JSON when the command needs to be reviewed in a runbook or handoff note.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-examples generate-netcat-shell-markdown-card-commands">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>
  <p>Copy a sample, replace the host or port values, then compare the generated options with the target implementation before use.</p>

  <pre class="generate-netcat-shell-command-pre"><code>nc -vz -w 3 db.internal.example 5432</code></pre>
  <details class="generate-netcat-shell-command-note">
    <summary>
      <span class="generate-netcat-shell-command-note-label generate-netcat-shell-command-note-label-closed">Show command use</span>
      <span class="generate-netcat-shell-command-note-label generate-netcat-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-netcat-shell-command-copy-btn" data-command-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>TCP reachability:</strong> Checks whether a specific TCP port accepts a connection within a short timeout.</div></div>
  </details>

  <pre class="generate-netcat-shell-command-pre"><code>printf 'GET /health HTTP/1.1\r\nHost: app.internal.example\r\nConnection: close\r\n\r\n' | nc -w 5 app.internal.example 80</code></pre>
  <details class="generate-netcat-shell-command-note">
    <summary>
      <span class="generate-netcat-shell-command-note-label generate-netcat-shell-command-note-label-closed">Show command use</span>
      <span class="generate-netcat-shell-command-note-label generate-netcat-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-netcat-shell-command-copy-btn" data-command-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Manual HTTP probe:</strong> Sends a minimal request and prints the raw response for protocol-level troubleshooting.</div></div>
  </details>

  <pre class="generate-netcat-shell-command-pre"><code>nc -ul 0.0.0.0 1514</code></pre>
  <details class="generate-netcat-shell-command-note">
    <summary>
      <span class="generate-netcat-shell-command-note-label generate-netcat-shell-command-note-label-closed">Show command use</span>
      <span class="generate-netcat-shell-command-note-label generate-netcat-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-netcat-shell-command-copy-btn" data-command-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>UDP listener:</strong> Opens a local UDP listener for packet inspection on an allowed test host.</div></div>
  </details>

  <pre class="generate-netcat-shell-command-pre"><code>ncat --ssl --proxy proxy.internal.example:8080 --proxy-type http api.internal.example 443</code></pre>
  <details class="generate-netcat-shell-command-note generate-netcat-shell-command-note-last">
    <summary>
      <span class="generate-netcat-shell-command-note-label generate-netcat-shell-command-note-label-closed">Show command use</span>
      <span class="generate-netcat-shell-command-note-label generate-netcat-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-netcat-shell-command-copy-btn" data-command-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Ncat proxy path:</strong> Uses Ncat-specific TLS and proxy options; confirm Ncat is installed before using it.</div></div>
  </details>
</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-export">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>Exports preserve the generated review state. They do not run the command or confirm network reachability.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-clipboard" aria-hidden="true"></i></span> <span>Copy Command</span></summary>
    <div class="tool-export-answer">
      <p>Copies the rendered command exactly as shown for the selected shell style.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i></span> <span>PDF</span></summary>
    <div class="tool-export-answer">
      <p>Opens a print-ready command report with the current summary, warnings, options, and output sections.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i></span> <span>CSV</span></summary>
    <div class="tool-export-answer">
      <p>Downloads the option table so reviewers can inspect generated flags, values, and notes in spreadsheet form.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span> <span>JSON</span></summary>
    <div class="tool-export-answer">
      <p>Copies or downloads the normalized command payload. This tool also supports importing that JSON back into the workspace for restoration.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-faq">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>These answers define the browser boundary, implementation-review expectations, and restore behavior for the netcat workspace.</p>

  <details class="faq-item" open>
    <summary><span>Does the browser open sockets or run netcat?</span></summary>
    <div class="faq-answer">
      <p>No. The workspace generates command text and export data only.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Why do some options warn for BusyBox or traditional netcat?</span></summary>
    <div class="faq-answer">
      <p>Netcat variants differ. A warning means the selected command may need implementation-specific review before use.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Can I use the generated scan command anywhere?</span></summary>
    <div class="faq-answer">
      <p>No. Port scans and listeners should only be used on systems and networks where you have permission.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>What should I test after copying?</span></summary>
    <div class="faq-answer">
      <p>Run the binary help on the target host, confirm DNS or IP routing, and test against a non-critical endpoint before adding the command to an operational runbook.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.11_glossary -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-glossary">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-book" aria-hidden="true"></i><span>Glossary</span></h2>
  <p>Use this glossary to decode the socket and command terms used by the generated output and review notes.</p>

  <table>
    <thead>
      <tr>
        <th>Term</th>
        <th>Meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>nc</code></td>
        <td>Common command name for netcat-style socket tools.</td>
      </tr>
      <tr>
        <td>Ncat</td>
        <td>Nmap's netcat-compatible connector with additional features such as SSL and proxy modes.</td>
      </tr>
      <tr>
        <td>Zero-I/O</td>
        <td>A scan-style mode that checks connection status without sending application payload data.</td>
      </tr>
      <tr>
        <td>TLS</td>
        <td>Transport Layer Security, used for encrypted application connections when the implementation supports it.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.11_glossary -->

<!-- ns:start main.content.10_references -->
<div class="content-card generate-netcat-shell-markdown-card generate-netcat-shell-markdown-card-citations">
  <h2 class="generate-netcat-shell-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>
  <p>These sources support the in-text citations used in this tool page.</p>

  <table class="generate-netcat-shell-citation-table">
    <thead>
      <tr>
        <th>Source type</th>
        <th>In-text citation</th>
        <th>Reference</th>
      </tr>
    </thead>
    <tbody>
      <tr id="generate-netcat-shell-ref-primary">
        <td>Manual page</td>
        <td><a class="generate-netcat-shell-citation-backlink" href="#generate-netcat-shell-cite-primary"><span class="generate-netcat-shell-citation-inline">(OpenBSD Project, 2025)</span></a></td>
        <td>OpenBSD Project. (2025). <em>nc(1): arbitrary TCP and UDP connections and listens</em>. OpenBSD manual pages. <a href="https://man.openbsd.org/nc.1">https://man.openbsd.org/nc.1</a></td>
      </tr>
      <tr id="generate-netcat-shell-ref-method">
        <td>Project documentation</td>
        <td><a class="generate-netcat-shell-citation-backlink" href="#generate-netcat-shell-cite-method"><span class="generate-netcat-shell-citation-inline">(Nmap Project, n.d.)</span></a></td>
        <td>Nmap Project. (n.d.). <em>Ncat Users' Guide</em>. Retrieved May 16, 2026, from <a href="https://nmap.org/ncat/guide/index.html">https://nmap.org/ncat/guide/index.html</a></td>
      </tr>
      <tr id="generate-netcat-shell-ref-review">
        <td>Project documentation</td>
        <td><a class="generate-netcat-shell-citation-backlink" href="#generate-netcat-shell-cite-review"><span class="generate-netcat-shell-citation-inline">(BusyBox, n.d.)</span></a></td>
        <td>BusyBox. (n.d.). <em>BusyBox command documentation</em>. Retrieved May 16, 2026, from <a href="https://busybox.net/downloads/BusyBox.html">https://busybox.net/downloads/BusyBox.html</a></td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
