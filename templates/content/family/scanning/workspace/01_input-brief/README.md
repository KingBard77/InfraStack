# Scan Target Workspace Section

## Purpose

Defines the primary target input and scan action for a scanning-family tool.

Use it for public URL, hostname, endpoint, record, or resource identifiers that start a normalized scan query.

## Expected Behavior

- Target input validates before a scan starts.
- The primary action runs the current query.
- Errors are inline and recoverable.
- The result shell remains hidden until the scan succeeds or a validated restore loads output.

## Validation Checklist

- Target ID matches JavaScript.
- Primary action updates the normalized query.
- Empty or invalid targets show a clear error.
- Exported JSON includes the target when JSON output is implemented.
