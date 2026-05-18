# JSON Output Workspace Section

## Purpose

Defines structured JSON output for calculate-family tools.

Use it when the current estimate, assumptions, result, or export payload should be copied, downloaded, archived, or restored later.

## Baseline Reference

Use the AWS, Azure, and IBM Cloud cost calculators as the reference set. AWS supplies JSON snapshot behavior; Azure and IBM Cloud prove provider-native payload identity, restore boundaries, and copied-token cleanup.

## Expected Behavior

- JSON must be generated from the same normalized model as the visible result.
- Payloads should include tool identity and version when restore or comparison matters.
- Copy and download actions should use the current payload.
- Import/restore should only appear when implemented and validated.
- Restore payloads should preserve enough input state to rebuild controls, included components, assumptions, result summary, tabs, tables, and JSON output.
- JSON preview must escape user-provided values before syntax highlighting.

## Typical UI

- JSON preview
- copy JSON action
- download JSON action
- optional import JSON action
- hidden file input or equivalent safe import control when restore is implemented

## Validation Checklist

- JSON is valid.
- Tool ID and version are present when needed.
- Payload values match summary and tables.
- Import controls are hidden unless restore is implemented.
- Import rejects unsupported tool IDs, invalid JSON, or incompatible payload shapes gracefully.
- Restored state starts output sorting from the family default unless the payload intentionally stores a supported sort choice.
