# SEO and responsive verification — 10 November 2026

## Live baseline

The public homepage at `https://yogeshv.me/` was inspected in a browser. At inspection time it still showed the older content without TechMagic Technologies. Direct HTTP requests to `/resume` and all three project URLs returned 404 before the legacy JavaScript redirect loaded the application. The live sitemap omitted Verdict Games. The original mobile Lighthouse accessibility score was 92; prohibited ARIA attributes and primary-button contrast were flagged.

## Completed source changes

- Build-time rendering produces full HTML for the homepage, resume and all three project pages. Directory routes use trailing-slash canonical URLs for GitHub Pages.
- Page titles, descriptions, canonical links, Open Graph and Twitter metadata, and JSON-LD share one route-aware implementation.
- ProfilePage, Person and WebSite markup connects Yogesh Vadivel's name, role, education and existing public profile links. Projects include authorship and breadcrumbs.
- The sitemap is generated from the same public route list. Unknown client routes are noindex; the GitHub Pages 404 response also includes noindex metadata.
- The visible hero identifies Yogesh Vadivel and his full-stack, React, Next.js and Python work. No keyword stuffing, hidden keyword lists, invented ratings, or ranking promises were added.
- Responsive WebP images at 640, 1280 and 1920 pixels replace the published PNG screenshots. All variants total 5,287,716 bytes versus 31,390,920 bytes for the originals. Source PNGs are retained under `assets/`, outside the deployment directory.
- The social image is compressed from 2,456,497 bytes to 228,529 bytes.
- Small-screen heading clipping, animated-text accessibility, primary-button contrast, mobile menu scrolling, gallery touch controls, and lightbox keyboard/focus handling were improved.
- Country-based resume selection remains fully automatic, with no selector. Failure or timeout defaults to the UAE PDF.

## Verification

| Check | Result |
| --- | --- |
| Unit/integration tests | 39 passed |
| TypeScript, lint and production build | Passed |
| Generated HTML, schema, canonicals, image variants and internal links | Verified for all five pages |
| Homepage widths | 320, 390, 768, 1024 and 1440 pixels |
| GitHub activity | Same unfiltered full-year total on phones and desktops; scrollable chart, visible wrapping footer, and profile-link fallback |
| Resume | Mobile preview and download select the Indian PDF from the test network; no selector; no overflow or console errors |
| Project routes | All three checked on mobile with no missing images, overflow or hydration errors; 640px image variants served |
| Lightbox | Opens, focuses Close, locks background interaction, navigates with arrow keys, closes with Escape, restores scrolling |
| Mobile navigation | Opens, locks page scrolling and closes with Escape |
| Contact form | Empty submission displays all three validation errors; no email sent |
| Legacy SPA URLs | Correct route and canonical restored without hydration errors |
| Unknown routes | Page-not-found title and noindex metadata |
| Dark-theme mobile Lighthouse | Accessibility 100, best practices 100, SEO 100 |
| Light-theme desktop snapshot audit | Accessibility 100, best practices 100, SEO 100 |

The local performance trace recorded LCP 960ms and CLS 0.01 on an unthrottled connection. These are local lab measurements, not real-user production metrics. The nonstandard agent-discovery audit still flags the absence of an `ai-catalog.json`; this is separate from the SEO, accessibility and best-practices categories. The existing lazy-loaded PDF viewer still produces a bundle-size warning. Browserslist reports an older browser dataset; no dependency upgrades were made as part of this change.

## Publication and indexing

The verified build is in `dist/`. The initial deployment attempt was blocked pending explicit permission. The owner subsequently authorized pushing both the source repository and GitHub Pages repository. Deployment results should be verified against the remote commits and live site after publication.

After deployment, verify that all five canonical URLs return HTTP 200, inspect their original HTML metadata, and recheck the live mobile layout and resume. The owner should verify `yogeshv.me` in Google Search Console, submit `https://yogeshv.me/sitemap.xml`, and request indexing of the homepage and project pages. Account or DNS verification credentials are not present in this repository. Rankings and indexing times are controlled by search engines.
