# References Markdown Section

## Purpose

Provides the canonical source-backed references table for tool support content.

Use this section when a tool page has narrative in-text citations such as `Amazon Web Services (n.d.-a) says...` or parenthetical citations that need a visible source trail.

## When to use

Use when the user asks for citations, when the content makes source-dependent factual claims, or when a tool page needs visible references for technical claims.

Do not use this section to pad content with unused references.

For factual technical content, substantial `Technical Details` must be 1500+ words, include at least two official or source-of-truth citations, and the full `content.md` should carry at least three real references when enough supportable factual claims exist.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__PRIMARY_SOURCE_TYPE__`
- `__PRIMARY_SOURCE_AUTHOR__`
- `__PRIMARY_SOURCE_YEAR__`
- `__PRIMARY_SOURCE_REFERENCE__`
- `__PRIMARY_SOURCE_URL__`
- equivalent placeholders for method and review sources

## Expected DOM/class rhythm

In-text citations should appear in the actual content above this section:

```html
<a id="__PREFIX__-cite-primary-source" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-primary-source">
  <span class="__PREFIX__-citation-inline">Source Author (Year)</span>
</a>
```

The References section should then contain a matching table row:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-references">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>

<tr id="__PREFIX__-ref-primary-source">
  <td>Website</td>
  <td><a class="__PREFIX__-citation-backlink" href="#__PREFIX__-cite-primary-source"><span class="__PREFIX__-citation-inline">(Source Author, Year)</span></a></td>
  <td>Source Author. (Year). <em>Source title</em>. Publisher or site. <a href="https://example.com/source">https://example.com/source</a></td>
</tr>
</div>
```

The section heading uses a left Bootstrap icon and a divider line. Start with one explanation paragraph before the references table.

## Source rules

- Every cited source must directly support the cited sentence.
- Do not invent source metadata.
- Prefer official or source-of-truth sources for technical claims: provider docs, product docs, standards bodies, protocol specifications, benchmark owners, project maintainers, or primary vendor docs.
- Prefer narrative phrasing such as `Author (Year) says...`, `Author (Year) reports...`, or `Author (Year) frames...`.
- Vary source types when valid sources exist: book, website, newspaper or magazine, article or blog post, scholarly journal, audiovisual, audio, or YouTube.
- Random source type selection never overrides source validity.
- Include retrieval dates for undated web pages.
- Do not claim accuracy, security, production readiness, compliance, current pricing, certification, reliability validation, or similar trust outcomes unless the tool actually validates that outcome.
- Tool behavior claims must match actual code, visible controls, generated output, export behavior, restore behavior, and recorded validation.

## Related CSS source files

- `section.css`

## Related JS helper files

None.

## Validation checklist

- Every in-text citation link has a matching reference row.
- Every reference row links back to an in-text citation.
- Source type, author, year, title, publisher/site, and URL are verified.
- The cited source supports the sentence where it appears.
- The reference table contains only cited sources.
- Citation styling is scoped and does not use unmanaged inline color.
- `Technical Details` includes at least two official or source-of-truth citations when it makes technical claims.
- Substantial `Technical Details` content is 1500+ words.
- Factual `content.md` includes at least three real references when enough supportable technical claims exist.
- Trust and behavior claims match actual implementation and validation evidence.
