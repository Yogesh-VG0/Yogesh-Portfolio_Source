# Portfolio audit and changes — 10 November 2026

This audit reviews all three supplied Claude responses against the repository, rendered pages, original response HTML, public project source, HTTP behavior, and the supplied Google screenshot. Recommendations were treated as review input, not instructions to invent content or change accounts.

## Verified scope

The homepage, resume, StockPredict AI, ExpenseVision, Verdict Games, `sitemap.xml`, `robots.txt`, social image, both PDFs, and missing-URL behavior were accessible in a browser/direct HTTP checks. The project index is new in this revision. Claude's fetch-tool restrictions were not evidence that these pages were broken.

The baseline public pages returned HTTP 200. A random missing path returned HTTP 404. HTTP, `www`, and the GitHub Pages hostname redirected to `https://yogeshv.me/` with HTTP 301; known extensionless routes redirected to their trailing-slash canonical paths. The production sitemap was valid and listed five routes before this update; it now lists six, including `/projects/`.

The public GitHub profile already uses the exact name Yogesh Vadivel and links to yogeshv.me. StockPredict's homepage already includes a portfolio backlink. Rendered ExpenseVision and Verdict homepages had no link to yogeshv.me at inspection; Verdict's footer does list its core data providers. Adding portfolio backlinks to those two separate apps remains a concrete follow-up in their repositories. Visible provider credits do not by themselves certify API-account/license compliance.

## Recommendation-by-recommendation review

| Topic from the review | Finding and action |
| --- | --- |
| Person/profile structured data | Already present. Retained identity/profile links, added explicit B.Tech. credential, and used the canonical institution name. No duplicate person entities or invented photo/address. |
| Breadcrumb and project schema | Breadcrumbs existed. Added the projects index to the hierarchy, a collection/item list, technical-article metadata, and factual SoftwareApplication entities without ratings, reviews, or prices. |
| Degree inconsistencies / Google B.S. text | Website source and PDFs say B.Tech. About now spells out B.Tech. in Computer Science and Engineering from Manipal Academy of Higher Education, Dubai. Education, resume HTML, and schema share one data source. Google's old AI summary cannot be directly edited in this repository. |
| Location differences | Intentional user requirement. Preserved one automatic country result: India → Madurai/India PDF; elsewhere → Dubai/UAE PDF. Neutral pending text and a bounded UAE fallback remain. Transient location text is excluded from snippets with `data-nosnippet`. |
| M.Tech. | No verified enrollment information supplied. Not added. |
| Repeated H1/name | Confirmed raw-text duplication. Removed redundant hidden copies; H1 contains one name while preserving animated gradient/letter entrance and a descriptive accessible name. |
| Repeated hero taglines | Replaced device-specific alternatives with one readable sentence in the initial HTML. No animated typing loop delays the main intro's paint. The name remains animated. |
| Zero count-up values in HTML | Confirmed. Final values now render on the server, occupy stable space, and remain available without JavaScript. Animation cancels on unmount and respects reduced motion. |
| Meta descriptions / keyword-led titles | Rewritten naturally around name, real skills, and project purpose. Project titles distinguish the expense tracker PWA and game-discovery application from unrelated products with similar names. |
| Recruiting CTAs | Resume is primary, Contact secondary, Projects available below. GitHub/LinkedIn remain in contact/footer. Contact was already present in the main navigation. |
| Project-card clutter | Live demo remains primary, deep dive secondary, source code tertiary. Home previews show four manual slides; full case-study galleries remain available. |
| Video / demo account | No original recording was supplied. Added the existing public ExpenseVision `/demo` link rather than inventing credentials or a video. |
| Carousel access | Added keyboard arrows to home previews and inline case-study carousels. Controls use 44px targets, focus remains visible, and lightboxes retain Escape/arrow keys, focus trapping, and scroll restoration. No autoplay exists, so pause-on-hover is not needed. |
| GitHub chart fallback and loading | Extracted into a lazy module loaded when About enters view. Initial HTML contains a useful GitHub profile link. Preserved the same unfiltered full-year total, scroll region, visible footer total, tooltip dismissal, and friendly error link. Hint now says scroll or swipe. |
| YV logo | Links to `/`, includes its visible text in the accessible name, and has a 44px home target. |
| Theme support | Already present and OS-based. Preserved remembered overrides and added a toggle to case-study headers. |
| Mobile spacing | Checked at 320, 390, 768, and 1440px. Header actions fit; type wraps without clipping. Forms use 16px mobile inputs. Architecture diagrams stack on phones. Six skill groups remain. |
| Custom 404 | Client page already existed. Replaced the empty public redirect document with a styled, accessible static 404 containing home/project/resume recovery links and OS/manual theme support. Missing public URLs remain true 404 responses. |
| Architecture diagrams | Added responsive semantic data-flow figures with SVG arrow icons, readable text, labels and captions. They do not depend on raster text or unverified topology. |
| Authorship, dates, next steps | Case studies identify Yogesh/full-stack work, show an explicit review date, describe practical next improvements, and link to their implementation notes. The review date reflects this actual content review, not every future build. No unsupported solo/team claim was added. |
| Related projects and contact | Added links among all case studies, to the index, resume, and contact. Footer framework-credit text was replaced with useful navigation. |
| Backtest return | The +13.71% value is labeled 30d Backtest. The September 2025–March 2026 period and historical-simulation limitations are visible in the StockPredict case study. Source README confirms the reported figure; it was not independently reproduced as a trading result. |
| StockPredict production architecture | Source README says ML runs in GitHub Actions and Express reads stored MongoDB results. Corrected the previous claim of a live production FastAPI ML backend and updated the primary link to stockpredict.dev. |
| ExpenseVision provider flow and versions | Verified Next.js 16/React 19 from package data, 18 API route files, eight database tables/migrations, and optional Veryfi → Gemini → OpenRouter fallback. Removed guarantees that scanning always works and unsupported speed/accuracy/free-provider claims. No OCR accuracy metric was fabricated. |
| Verdict data and scheduler | Source confirms 8,200+ documented games, seven core sources plus two mobile-store verification sources, 70 API routes, and GitHub Actions as the recurring scheduler. Corrected stale Heroku wording. Explained scoring inputs without inventing weights or claiming an independent editorial rating. |
| AWS skill | Existing evidence is AWS Cloud Practitioner Essentials training, not the certification exam or production AWS work. Labeled it training; did not inflate the curated skills list with a stronger unsupported claim. |
| Headshot, testimonials, user counts, uptime | No verified assets or measurements supplied. Not fabricated. Project/source evidence and real work remain the proof. |
| Social images | Original was 1536×1024, not 1200×630. Replaced it and added distinct cards for all six pages at 1200×630, approximately 48–66KB each. Native SVG sources and repeatable JPEG export tooling are retained. Image alt/type/dimension metadata is route-aware. |
| Image loading / dimensions | Responsive WebP existed. Main frames reserve aspect ratios; main images now have intrinsic dimensions. Thumbnails are lazy and fixed-size. Only the current full gallery slide is mounted; the original review's suggestion that every full image loads eagerly was inaccurate. |
| Resume crawlability | Added substantial prerendered HTML: summary, experience, skills, education, and case-study links. No-JavaScript reading works. |
| Resume viewer weight | Viewer now loads only on Preview PDF. Preview/open/download all use the same automatically selected file; no version selector or alternate-country chooser was introduced. |
| PDF metadata/layout | Both supplied one-page PDFs already have the correct title, selectable text, six links, degree/experience, and size around 63KB. Left unchanged. |
| Sitemap / lastmod | Generated from the same six-route list used for prerendering. Removed the stale duplicate public sitemap source. Optional lastmod is omitted; no fake build-date updates. robots permits crawling and points to the sitemap. |
| PDF robots exclusion | No exclusion requested by owner. Kept the public resumes crawlable. Disallow is not a reliable way to remove an already indexed URL, so the review's suggested shortcut was not applied. |
| Canonical domains / slash variants | Verified real 301 redirects and matching canonical URLs. No hosting migration needed for these working redirects. |
| Fonts / layout shift | Self-hosted the existing variable WOFF2 fonts, retained SIL OFL licenses, preloaded Inter, and removed the external Google font stylesheet request. Metrics and image frames reserve space; hero badge reserves a stable slot. |
| Analytics | Cloudflare Web Analytics already existed on production hosts. Retained it; no duplicate tracker added. |
| Contact spam and feedback | Added honeypot, in-flight lock, retry cooldown, autocomplete, and live success/error feedback. Existing validation retained. Tests mock the sender; no real email was sent. Provider-side origin restrictions/CAPTCHA remain account configuration work. |
| Email obfuscation | Kept a usable direct-contact path for recruiters; obfuscating an intentionally public resume email does not solve abuse. No user-hostile encoding was added. |
| Writing / blog | The three actual technical case studies now have richer, connected content. No empty blog, synthetic testimonials, or unreviewed first-person posts were published. Future original writing is an optional content task. |
| Rich Results / schema expectations | JSON-LD, IDs, hierarchy, author, credential, canonicals, and app facts are checked locally. A valid schema does not guarantee a rich result; app markup intentionally omits invented ratings/offers. |
| Search Console / Bing / profiles | Requires owner accounts or DNS. See concrete checklist below. GitHub's public profile and the project apps were also inspected where accessible; no account settings were changed. |
| Hosting/security headers | GitHub Pages already supplies working HTTPS/canonical redirects. Custom response headers/edge geolocation would require a different hosting layer; no unnecessary migration was made. |

## Verification evidence

- Unit/integration regressions: **60 tests passed** across nine files, covering static server HTML, country mapping/caching/failure/timeout, one shared lookup, on-demand preview, PDF cancellation/queueing, GitHub totals, route metadata, theme switching, contact honeypot/duplicate/cooldown, and gallery reset when navigating from a long to a shorter case study.
- Production build checks: TypeScript, lint, six prerendered pages, one H1 each, distinct canonicals and social assets, valid JSON-LD, real initial metric values, HTML resume content, local links/srcset targets, and static 404 noindex.
- Browser matrix: all six routes at 320/light, 390/dark, 768/light, and 1440/dark. No horizontal page overflow, clipped header actions, missing images, or page errors in those runs.
- Manual gradient check: the name uses different light/dark palettes. Endpoint contrast against the base background is at least 5.5:1 in light mode and 7.7:1 in dark mode; this addresses gradient text that automated contrast audits may not evaluate.
- Country browser fixtures: India and US each made one lookup; correct PDF was selected; no viewer resource loaded before Preview PDF; preview rendered without page errors at 320px.
- JavaScript disabled: clean name heading, real stock metric, no zero stock counter, and visible resume degree/experience.
- Local mobile Lighthouse after hero fix: **Performance 100 / Accessibility 100 / Best practices 100 / SEO 100**. Lab FCP/LCP approximately 0.9s, CLS 0, total blocking time 20ms. Baseline in this audit had performance 83/LCP 4.7s because the main intro waited for entrance animation.
- All five other routes scored **100 accessibility, 100 best practices, 100 SEO** in mobile Lighthouse. Performance was measured on the homepage only. Reports are local generated artifacts in `output/lighthouse/`, excluded from Git. These are lab results, not production field Core Web Vitals or ranking guarantees.
- Non-scoring source-map diagnostics and Vite's large lazy PDF chunk warning remain. The PDF bundle is excluded from initial resume rendering. No claim is made that these audits prove every possible device, browser, or assistive technology is flawless.

## Account/content follow-up for the owner

1. In Google Search Console, verify the domain if needed, submit `https://yogeshv.me/sitemap.xml`, inspect the six canonical URLs, and request indexing after publication. Check indexing/canonical status and name-related query impressions. This repository contains no Search Console token or DNS account access.
2. In Bing Webmaster Tools, verify/import the property and submit the same sitemap.
3. Keep the exact full name, correct B.Tech. qualification, institution, and portfolio URL consistent in LinkedIn/GitHub and other profiles. Update profile pins, Featured links, and repository social-preview settings in their account UIs if desired.
4. In EmailJS, restrict allowed origins to the real production host(s), review provider quotas/abuse controls, and configure CAPTCHA if required. The public-key client form cannot enforce server-side provider policy by itself.
5. For each separate application, maintain a visible author backlink and confirm provider-specific attribution, licenses, quotas and API agreements in that app/account. This audit does not certify legal compliance of unrelated API integrations or alter those apps' repositories.
6. Supply a real professional portrait, approved recommendation, recording, measured accuracy/user/uptime data, or additional education only when available. Those are content inputs, not values to infer from a generic SEO checklist.

## Google screenshot and indexing limits

The screenshot contains an older location/B.S. summary. The site's shared source now explicitly states the B.Tech. degree and the correct institution; region-specific location remains an automatic presentation requirement. Google automatically selects snippets and may use text from different crawls. Neither a meta description nor schema can force an immediate Google AI Overview rewrite. Request a recrawl through the owner account and monitor the result without promising timing or rank.

Primary references: [Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet), [recrawl requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [noindex and robots limitations](https://developers.google.com/search/docs/crawling-indexing/block-indexing), and [locale-adaptive crawling](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages).

Project evidence: [StockPredict source README](https://github.com/Yogesh-VG0/Stock_Predict_Ai), [ExpenseVision source](https://github.com/Yogesh-VG0/ExpenseVision), [Verdict Games source](https://github.com/Yogesh-VG0/VerdictGames). Versions, route/table counts, and scheduler files were inspected directly in the public repositories during this review.
