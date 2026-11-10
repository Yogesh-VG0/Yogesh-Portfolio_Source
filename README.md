# Yogesh Vadivel — Portfolio

Source for [yogeshv.me](https://yogeshv.me), built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion. Hosted on GitHub Pages with a custom domain.

## Local development

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
```

Vite serves the site at `http://localhost:8080`. Contact form configuration is documented in `.env.example`.

## Checks and production build

```sh
npm run lint
npm run test
npm run build
npm run preview
```

`build` runs TypeScript checks, bundles the app, prerenders all public routes, generates the sitemap, and verifies HTML, structured data, canonical URLs, images, and internal links. `npm run typecheck` is also available separately. Preview serves the production output, normally at `http://localhost:4173`.

## Appearance and navigation

The initial theme follows the visitor's operating-system preference and reacts to system changes. Choosing the sun/moon toggle saves an explicit override in `portfolio-theme`; the old generic `theme` storage key is ignored so a legacy dark default cannot override the new system default. Theme controls use the resolved light/dark mode, including when the preference is `system`.

The skills section presents 28 selected technologies in six compact groups. Testing tools sit alongside DevOps tools; there is no separate strip. The resume uses a single 64px site header with an explicit Back to home link, YV branding, title, PDF actions and theme toggle. On small screens, PDF actions become labeled icon buttons and decorative branding is hidden to keep Back to home visible. Decorative cursor trails, backgrounds and click effects are disabled on the resume route so they cannot overlap the document.

## Search visibility

The homepage targets **Yogesh Vadivel**, **Yogesh Vadivel portfolio**, and **full-stack developer in Dubai** through its visible name, role, relevant content, title, and description. Project pages explain the actual React, Next.js, Python, Node.js, and AI work. Keywords are used naturally; there is no keyword stuffing or fabricated credential/location markup.

`src/lib/seo.ts` defines the page metadata and structured data. The build emits complete HTML for the homepage, resume, and all three project pages, so direct GitHub Pages requests can return HTTP 200 without a JavaScript redirect. React hydrates this HTML for interactivity. Legacy SPA redirects are retained, while missing pages receive `noindex` metadata.

Each public page has its own title, description, trailing-slash canonical URL, absolute social image URL, and JSON-LD. The homepage connects `ProfilePage`, `Person`, and `WebSite` entities to the existing GitHub and LinkedIn profile links. Projects include authorship and breadcrumbs. The sitemap is generated from the same route list during every build; `robots.txt` permits crawling.

After publishing, verify the `yogeshv.me` property in [Google Search Console](https://search.google.com/search-console), submit `https://yogeshv.me/sitemap.xml`, and inspect the homepage and project URLs. Request indexing after significant updates. Property verification requires the owner's Google account or DNS access; this repository does not contain a verification token. Maintain the same portfolio URL in GitHub and LinkedIn profiles and monitor name-related search queries in Search Console. Search engines decide rankings and when to recrawl; these changes do not guarantee a particular position.

## Responsive images

Project screenshots are served as WebP files at 640, 1280, and 1920 pixels, with browser-selected `srcset` sizes. Original PNGs live in `assets/source-screenshots/` and are excluded from the published `public/` directory. The social image uses a compressed JPEG; its original is `assets/og-image.png`.

To regenerate image assets after replacing a source image, install Pillow in your Python environment and run:

```sh
python scripts/optimize-images.py
```

Normal builds need only Node.js; Python is not required to deploy the already-generated image files.

## Resume selection

The `/resume` page automatically selects:

| Visitor's IP country | Resume |
| --- | --- |
| India (`IN`) | Indian resume |
| Any other country | UAE resume |
| Lookup unavailable, invalid, or timed out | UAE resume |

The preview, Open PDF link, and download always use the same selected file. During automatic detection, downloads wait until selection finishes so an Indian visitor cannot accidentally download the fallback version while the lookup is pending.

Selection is fully automatic. The page has no version selector or country-selection messages. Legacy `region` query parameters are ignored, so `/resume` always selects by the visitor's IP country.

### Location and privacy

The static site calls the [GeoJS country endpoint](https://www.geojs.io/docs/v1/endpoints/country/) only when automatic selection is needed on the resume page. It has a four-second timeout. The browser stores only the country code and lookup timestamp in session storage, expiring after 30 minutes. Storage being disabled does not prevent selection or downloads.

This is an IP lookup: GeoJS receives the visitor's IP as part of the request, but this app does not store it or request GPS permission. VPNs, proxies, blockers, and service availability can affect detection. Country is not inferred from browser language or timezone.

If the hosting stack later supports server or edge functions, a same-origin country endpoint using the hosting provider's geolocation would remove the external browser lookup. GitHub Pages itself cannot run this server logic.

### Updating resumes

Replace the PDFs in `public/resumes/`, retaining their names:

```text
public/resumes/
  Yogesh_Vadivel_Resume_India.pdf
  Yogesh_Vadivel_Resume_UAE.pdf
```

Both are the supplied November 2026 versions, copied without modifying their contents. The obsolete `public/Yogesh_Vadivel_Resume.pdf` has been removed. Resume paths and download names have one source of truth in `src/data/resumes.ts`.

The existing GemBox viewer remains available on desktop and mobile, loaded separately after automatic resume selection. Direct Open PDF and Download PDF links remain available if previewing fails. The viewer is a large, lazy-loaded dependency; Vite may report its chunk size during builds.

## Source organization

```text
public/
  resumes/                    Current regional PDFs
  *_img/                      Responsive WebP project screenshots
  CNAME, 404.html              GitHub Pages domain and SPA routing
src/
  entry-server.tsx            Build-time HTML rendering
  components/                 Portfolio sections and shared UI
    ResumePreview.tsx         Embedded PDF viewer
    ui/                       Used notification and tooltip components
  data/
    experience.ts             Roles, dates, locations, and achievements
    resumes.ts                Regional resume metadata
    skills.ts                 Skill groups
    projectEntries.tsx        Project details
    projects.ts               Project list
    socials.tsx               Contact and profile links
  hooks/
    use-resume-region.ts      Automatic selection and request lifecycle
  lib/
    resume-location.ts        Country lookup, validation, and cache
    motion.ts                 Shared animation presets
    seo.ts                    Page metadata and structured data
    images.ts                 Responsive screenshot sources
  pages/                      Home, resume, project detail, and not-found routes
  test/                       Tests and browser API setup
scripts/                      Prerendering, artifact checks and image conversion
assets/                       Original images, excluded from the deployment
```

Unused starter UI templates and their unused form dependencies have been removed. Temporary review files, screenshots, generated builds, and TypeScript build metadata are ignored by Git.

## Deployment

```sh
npm run deploy
```

The existing deployment command builds and publishes `dist/` to the `main` branch of `Yogesh-VG0/Yogesh-VG0.github.io`. This is separate from the source repository. `public/CNAME`, `public/404.html`, and the SPA redirect receiver in `index.html` must remain so custom-domain routes and query parameters work on direct visits.

Before publishing, run lint, tests, and the production build. Smoke-test the homepage, automatic resume selection, PDF actions, a project detail page, and the mobile layout. The contact form sends email through EmailJS and should be tested with intentional messages only.
