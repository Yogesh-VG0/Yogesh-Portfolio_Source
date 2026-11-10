# PDF resume and navigation verification — 10 November 2026

This update supersedes the HTML resume and on-demand preview behavior described in the earlier SEO audit.

## Current flow

- Home → **Resume** opens the automatically selected PDF immediately. There is no HTML resume, region selector, or preview confirmation. **Back to home**, **Open PDF**, **Download PDF**, and theme controls stay in the header.
- India (`IN`) selects the India PDF and Madurai profile. Every other valid country selects the UAE PDF and Dubai profile. Invalid, unavailable, or timed-out detection uses UAE. PDF actions wait until selection completes, so the wrong file is not briefly offered.
- Home → **View all projects** opens `/projects/` at the top. **View project** opens the relevant project at the top. Related projects reset their gallery and start at the top. Browser Back/Forward restore each saved page position.
- Contact and homepage section links reach the corresponding heading with a header offset. New-page and section navigation move keyboard focus to the heading; Back/Forward preserve normal history behavior. **Back to top** clears the section fragment and reaches the top of the current page.
- Project pages connect to the project list, homepage, resume, contact, related projects, live app, and source. Shared footers provide the same main destinations. Missing-page recovery links lead to home, projects, and resume.

## Verification

- Clean dependency installation from the lockfile; TypeScript, ESLint, 66 regression tests, production bundle, prerendering, and generated HTML/link checks passed.
- All six routes at 320px, 768px, and 1440px: one H1 per page, no horizontal document overflow, correct initial scroll position, and no browser page errors.
- India and US country fixtures: correct PDF without a second click; shared/cached country lookup across navigation; failure fallback covered by regression tests.
- Mobile PDF starts at page width instead of cutting off the name and right column. The viewer retains zoom controls; desktop renders a centered PDF. The document itself is unchanged.
- New-page, related-project, contact-fragment, footer-top, and browser-Back flows checked in a real browser. A saved project scroll position was restored exactly after navigating to another project.
- System light/dark mode, mobile menu, gallery/lightbox keyboard behavior, PDF failure states, GitHub full-year totals, and legacy URLs checked. No real contact submission was made.
- Lighthouse mobile checks: all six routes scored 100 for accessibility, best practices, and SEO. The viewer's unlabeled page-number field was corrected, including when its toolbar is rebuilt. These automated scores complement the manual keyboard and layout checks; they do not guarantee search rankings or exhaustive accessibility coverage.

The resume viewer remains a large dependency and is loaded only on the resume route. Vite's chunk-size notice remains visible rather than being hidden. PDF layout is fixed by the supplied files; mobile visitors can zoom or use Open PDF for their preferred PDF app. IP-based country detection can be affected by VPNs or provider availability, as disclosed under Privacy.

See [security-review.md](security-review.md) for the dependency review and hosting/account limits.
