[//]: # (content.md)

<div class="content-card">

## Overview

This tool mirrors the copied Ubuntu 22.04 benchmark tree under `assets/bin/` into a browser-side explorer. It indexes 297 control scripts across 70 section paths and 7 top-level families so you can move from benchmark structure to the exact shell body you want to reuse without manually walking the tree.

The page is intentionally read-only. It does not execute `check` or `fix` logic from the browser. Instead, it helps you inspect the exact control inventory, understand section rollups, and copy the selected script body directly from the result panel.

This makes the tool useful when you need a fast benchmark-script catalog, a copy-first compliance helper, or a safer way to review the source tree before you paste a control into a shell on a real Ubuntu 22.04 host.

Common benchmark-explorer concepts include:

- **Control ID** - the benchmark number derived from the copied shell filename
- **Section path** - the nested directory location of a control inside the copied tree
- **`CRITICALITY`** - the metadata flag declared by some copied scripts
- **Selected Script** - the exact local shell body currently rendered for copying
- **`JSON`** - the normalized export of the filtered benchmark inventory

</div>

<div class="content-card">

## Why Use CIS Ubuntu Benchmark 2204

You would use CIS Ubuntu Benchmark 2204 when you want to:

- Browse the copied benchmark tree without leaving the page
- Filter controls by family, section path, title, control ID, or criticality
- Copy an exact local control script without manually opening files in the tree
- Review section rollups before narrowing to one script
- Keep missing metadata visible instead of hiding benchmark gaps
- Export filtered control inventory as CSV or JSON for review notes
- Move from benchmark browsing to shell execution with less manual digging

</div>

<div class="content-card">

## Technical Details

### 1. Copied Benchmark Tree

The explorer is backed by the copied benchmark scripts stored locally under `assets/bin/`. That means the page reflects the copied source tree in this workspace rather than a remote benchmark feed or a regenerated abstraction.

### 2. Read-Only Browser Scope

The tool does not run the benchmark in the browser. It only indexes metadata, filters the copied dataset, renders section summaries, and exposes the selected shell body for copy or download. Execution still belongs in a shell on the target Ubuntu host.

### 3. Family, Section, And Control Filtering

The form lets you narrow the benchmark from the full tree down to a single family, section path, or exact control. Query filtering matches control ID, title, section path, and script filename so you can jump to the right script without memorizing the full path.

### 4. Metadata Fidelity

Not every copied script declares `CRITICALITY`. The explorer keeps those gaps visible so you can distinguish between declared metadata and missing metadata instead of assuming the benchmark source is perfectly normalized.

### 5. Copy-First Script Workflow

The main value of the page is the Selected Script tab. It renders the copied shell body directly so you can review, copy, or download the exact script and then run it in a shell with your own operational controls.

### 6. Export And Inventory Views

The controls table, sections table, selected script view, and JSON export all come from the same local dataset. That keeps the filtering, copy flow, and exported inventory aligned instead of showing different data in different surfaces.

</div>

<div class="content-card">

## What To Review In The Results

### 1. Controls

Start with the Controls tab when you need the main benchmark inventory. It is the fastest way to review control IDs, titles, section locations, criticality declarations, and source script names in one table.

### 2. Sections

The Sections tab gives you the rollup view of the copied benchmark tree. Use it when you want to understand how many controls live under a section path before narrowing down to one script.

### 3. Selected Script

This is the main copy surface. Review the selected script body here before moving it into a shell so you know exactly what the copied control contains.

### 4. JSON Output

The `JSON` tab provides a normalized export of the current filtered state, including benchmark metadata, matched controls, and selected-script context. It is useful when you need a machine-readable snapshot of the filtered inventory.

</div>

<div class="content-card">

## Step-by-Step Guide

1. Load the copied benchmark dataset.
2. Narrow the scope by family and section path if needed.
3. Use the query filter to find the exact control by ID, title, path, or script name.
4. Review the Controls or Sections tab until the match set looks right.
5. Open the Script tab and verify the exact shell body you want to use.
6. Copy or download the script.
7. Run it manually in a shell on the target Ubuntu 22.04 host.

</div>

<div class="content-card">

## Example Commands

<p>These examples show the shell workflow for taking a copied CIS control script from the Script tab and running it manually on a target host.</p>

### Example: Run a copied control script

```bash
vi script.sh
```

<details class="cisbench-command-note">
  <summary>
    <span class="cisbench-command-note-label cisbench-command-note-label-closed">Show use</span>
    <span class="cisbench-command-note-label cisbench-command-note-label-open">Hide use</span>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-pencil-square fs-5"></i>
    <div><strong>Create:</strong> Start a local shell script file that will hold the copied CIS control body.</div>
  </div>
</details>

```bash
#!/bin/sh

CRITICALITY=1
TITLE="Ensure cramfs kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v cramfs 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep cramfs > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install cramfs /bin/true" | tee -a /etc/modprobe.d/cramfs.conf > /dev/null
}
```

<details class="cisbench-command-note">
  <summary>
    <span class="cisbench-command-note-label cisbench-command-note-label-closed">Show use</span>
    <span class="cisbench-command-note-label cisbench-command-note-label-open">Hide use</span>
  </summary>
  <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-clipboard-data fs-5"></i>
    <div><strong>Paste:</strong> Paste the copied control script exactly as shown in the Script tab, then save the file.</div>
  </div>
</details>

```bash
chmod +x script.sh
```

<details class="cisbench-command-note">
  <summary>
    <span class="cisbench-command-note-label cisbench-command-note-label-closed">Show use</span>
    <span class="cisbench-command-note-label cisbench-command-note-label-open">Hide use</span>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-shield-check fs-5"></i>
    <div><strong>Permit:</strong> Mark the copied script as executable before trying to run it.</div>
  </div>
</details>

```bash
./script.sh
```

<details class="cisbench-command-note">
  <summary>
    <span class="cisbench-command-note-label cisbench-command-note-label-closed">Show use</span>
    <span class="cisbench-command-note-label cisbench-command-note-label-open">Hide use</span>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-play-circle fs-5"></i>
    <div><strong>Execute:</strong> Run the copied CIS control script in the local shell and review its output before deciding whether to apply fixes.</div>
  </div>
</details>

</div>

<div class="content-card">

## FAQ

<div class="faq-accordion">

<details class="faq-item" open>
  <summary>Does this page run benchmark checks from the browser?</summary>
  <div class="faq-answer">
    No. It renders the benchmark inventory and script bodies, but execution still belongs in the shell where the benchmark scripts live.
  </div>
</details>

<details class="faq-item">
  <summary>Why do some controls show unspecified criticality?</summary>
  <div class="faq-answer">
    Because the source shell files do not all export `CRITICALITY`. The explorer keeps that gap visible so you can distinguish between declared metadata and missing metadata.
  </div>
</details>

<details class="faq-item">
  <summary>Why can the controls table show fewer rows than the full match count?</summary>
  <div class="faq-answer">
    The visible row limit only affects the rendered controls table. The selected script picker still works from the full matched result set, so you can keep the table compact without losing access to deeper matches.
  </div>
</details>

<details class="faq-item">
  <summary>Can I safely run a copied script exactly as shown?</summary>
  <div class="faq-answer">
    You should review the script first. The page is copy-first and read-only, but the shell script itself can still change system state once you run it on a host.
  </div>
</details>

<details class="faq-item">
  <summary>Why use the Script tab instead of opening files manually?</summary>
  <div class="faq-answer">
    The Script tab keeps filtering, metadata, and source body in one place. That reduces the amount of tree-walking needed when you only want one specific CIS control quickly.
  </div>
</details>

</div>

</div>

<div class="content-card">

## Glossary

<div class="glossary-table-wrap">
    <table class="glossary-table">
      <thead>
        <tr>
          <th>Term</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Control ID</strong></td>
          <td>The benchmark identifier derived from the copied script filename, such as <code>1.1.1.1</code> or <code>5.1.20</code>.</td>
        </tr>
        <tr>
          <td><strong>Section Path</strong></td>
          <td>The nested folder path that places a control inside the copied benchmark tree.</td>
        </tr>
        <tr>
          <td><strong>CRITICALITY</strong></td>
          <td>An optional metadata variable declared by some copied shell scripts to indicate benchmark importance.</td>
        </tr>
        <tr>
          <td><strong>Selected Script</strong></td>
          <td>The exact local shell body currently rendered for copy or download in the Script tab.</td>
        </tr>
        <tr>
          <td><strong>Family</strong></td>
          <td>A top-level benchmark grouping such as <code>01_initial</code> or <code>05_access_control</code>.</td>
        </tr>
      </tbody>
    </table>
</div>

</div>

<div class="content-card">

## References

- `templates/content/tools/cis/cis-ubuntu-benchmark-ubuntu-2204/assets/bin/`
- `templates/content/tools/cis/cis-ubuntu-benchmark-ubuntu-2204/assets/custom.json.twig`

</div>
