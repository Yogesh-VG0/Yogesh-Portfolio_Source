# Security review — 10 November 2026

Scope: this static React/Vite portfolio, its production dependencies, browser storage, country lookup, PDF viewer, contact form, routing, and generated HTML. This is a source and browser review, not a penetration test or an audit of the separate project applications.

## Findings addressed

| ID | Severity before fixes | Finding and resolution |
| --- | --- | --- |
| SEC-01 | High (production); critical (development) | The starting npm audit reported 19 production findings and 34 overall findings. Updated React Router, GemBox PDF Viewer and compatible transitive packages; upgraded Vite, its React plugin, and Vitest; removed unused typography tooling. Updated Sucrase and scoped the patched minimatch override to the TypeScript ESLint parser. Production and full audits now report zero known vulnerabilities. The lockfile and supported Node engine range are committed. |
| SEC-02 | Low | The legacy query-string routing receiver accepted an unchecked destination. It now constructs a URL inside a try/catch, accepts only the current origin, and passes a relative path to history replacement. See `index.html:36`. |
| SEC-03 | Low | Local development listened on every interface. The default is now loopback (`127.0.0.1`); LAN exposure must be requested explicitly with a CLI host option. See `vite.config.ts:8`. |
| SEC-04 | Defense in depth | Added an explicit referrer policy and limited HTML CSP (`base-uri 'self'; object-src 'none'`). These restrict base-element changes and object embeds, but do not constitute a full script policy or prevent framing. See `index.html:6`. |

## Controls checked

- No application use of `dangerouslySetInnerHTML`, `eval`, or untrusted HTML injection was found. Metadata values are escaped, and JSON-LD escapes `<` before embedding (`src/lib/seo.ts:70`).
- Country responses and cached country codes are validated. The lookup omits credentials and referrer, has a four-second timeout, stores only country/timestamp for 30 minutes, and falls back to UAE when unavailable. No IP address is stored by this app. PDF paths come from a fixed two-entry map, never from a visitor-provided URL.
- Public EmailJS identifiers are browser configuration, not private API secrets. No private service credentials are included in source or generated assets. The contact form retains validation, honeypot, duplicate-submit protection, cooldown, and success/failure states. Tests do not send messages.
- External new-tab links use `noopener noreferrer`. PDF open/download remain available if the renderer or its lazy-loaded code fails. Unmounting cancels a pending PDF fetch. File upload, annotation, and signing tools are hidden from the resume viewer.
- Error pages carry `noindex`; unknown live paths use the branded static HTTP 404. Known routes are prerendered and checked for local-link integrity during every production build.

## Hosting and account limits

GitHub Pages does not expose custom response-header configuration through this repository. A complete HTTP-header CSP, `frame-ancestors`, and other response policies would require a host or proxy that supports them. No unsupported `_headers` file was added.

EmailJS allowed origins, quotas, and provider-side abuse controls must be maintained in the owner's EmailJS account. Client-side validation cannot enforce those settings. Country lookup, GitHub activity, analytics, and external demos depend on their providers; useful fallback states and direct links are preserved.

Zero audit findings describes known advisories at verification time; it is not a guarantee against future vulnerabilities. Re-run `npm audit` when dependencies change.
