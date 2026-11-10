import { projects } from "@/data/projects";
import { projectDetails, type ProjectSlug } from "@/data/project-details";
import { education } from "@/data/profile";

export const SITE_URL = "https://yogeshv.me";
export const SITE_NAME = "Yogesh Vadivel";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
export const HOME_DESCRIPTION = "Yogesh Vadivel is a full-stack developer building React, Next.js, Python and Node.js apps. Explore live projects, technical case studies, experience and resume.";
export const indexablePaths = ["/", "/projects/", "/resume/", ...projects.map(project => `/projects/${project.slug}/`)];

export function getPageSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const project = projects.find(item => path === `/projects/${item.slug}`);
  const detail = project ? projectDetails[project.slug as ProjectSlug] : null;
  const isHome = path === "/";
  const isResume = path === "/resume";
  const isProjects = path === "/projects";
  const indexable = isHome || isResume || isProjects || Boolean(project);
  const canonical = `${SITE_URL}${path === "/" ? "/" : `${path}/`}`;
  const title = isHome ? "Yogesh Vadivel | Full-Stack Developer"
    : isResume ? "Yogesh Vadivel Resume | Full-Stack Developer"
      : isProjects ? "Projects & Technical Case Studies | Yogesh Vadivel"
        : detail ? `${detail.seoTitle} | Yogesh Vadivel` : "Page not found | Yogesh Vadivel";
  const description = isHome ? HOME_DESCRIPTION
    : isResume ? "Yogesh Vadivel's full-stack developer resume: React, Next.js, Python, Node.js, web development internships, and B.Tech. education. Read online or download the PDF."
      : isProjects ? "Explore Yogesh Vadivel's live web apps and technical case studies: StockPredict AI, ExpenseVision and Verdict Games. Architecture, tradeoffs, results and source code."
        : project && detail ? `${detail.descriptor}, built by Yogesh Vadivel. Explore the architecture, implementation, source code and live application.`
          : "This page could not be found. Explore Yogesh Vadivel's developer portfolio, projects and resume.";
  const imagePath = project ? `/social/${project.slug}.jpg` : isResume ? "/social/resume.jpg" : isProjects ? "/social/projects.jpg" : "/og-image.jpg";
  const image = `${SITE_URL}${imagePath}`;
  const imageAlt = project && detail ? `${project.title} — ${detail.descriptor} — by Yogesh Vadivel` : isResume ? "Yogesh Vadivel — Full-Stack Developer Resume" : isProjects ? "Yogesh Vadivel — Projects and Technical Case Studies" : "Yogesh Vadivel — Full-Stack Developer Portfolio";
  const ogType = project ? "article" : "website";
  const person = {
    "@type": "Person", "@id": PERSON_ID, name: SITE_NAME, alternateName: "Yogesh-VG0",
    url: `${SITE_URL}/`, jobTitle: "Full-Stack Developer", description: HOME_DESCRIPTION,
    sameAs: ["https://github.com/Yogesh-VG0", "https://www.linkedin.com/in/yogesh-vadivel-a287a6269/"],
    knowsAbout: ["Full-stack web development", "React", "Next.js", "TypeScript", "Python", "Node.js", "WordPress", "Technical SEO"],
    alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
    hasCredential: { "@type": "EducationalOccupationalCredential", name: education.degree, credentialCategory: "Degree", educationalLevel: "Bachelor's degree" },
  };
  const page = {
    "@type": isHome ? "ProfilePage" : isProjects ? "CollectionPage" : project ? "TechArticle" : "WebPage",
    "@id": `${canonical}#webpage`, url: canonical, name: title, description, inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID }, about: { "@id": PERSON_ID },
    mainEntity: { "@id": isProjects ? `${canonical}#projects` : project ? `${canonical}#project` : PERSON_ID },
    ...(project ? { headline: detail!.seoTitle, author: { "@id": PERSON_ID }, image, dateModified: "2026-11-10" } : {}),
  };
  const graph: Record<string, unknown>[] = [person,
    { "@type": "WebSite", "@id": WEBSITE_ID, url: `${SITE_URL}/`, name: SITE_NAME, alternateName: "Yogesh Vadivel Portfolio", inLanguage: "en", publisher: { "@id": PERSON_ID } }, page];
  if (isProjects) graph.push({ "@type": "ItemList", "@id": `${canonical}#projects`, itemListElement: projects.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${SITE_URL}/projects/${item.slug}/` })) });
  if (project && detail) {
    graph.push({ "@type": "SoftwareSourceCode", "@id": `${canonical}#project`, name: project.title,
      description: project.cardDescription ?? project.tagline, url: canonical, image,
      author: { "@id": PERSON_ID }, codeRepository: project.githubUrl,
      programmingLanguage: project.slug === "stockpredict-ai" ? ["TypeScript", "JavaScript", "Python"] : ["TypeScript", "SQL"],
      runtimePlatform: "Web browser", targetProduct: { "@id": `${canonical}#application` } });
    graph.push({ "@type": "SoftwareApplication", "@id": `${canonical}#application`, name: project.title,
      description: detail.descriptor, url: project.liveUrl, applicationCategory: detail.category,
      operatingSystem: "Web browser", author: { "@id": PERSON_ID }, image });
  }
  if (!isHome && indexable) graph.push({ "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
    ...(project ? [{ "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects/` }] : []),
    { "@type": "ListItem", position: project ? 3 : 2, name: project?.title ?? (isProjects ? "Projects" : "Resume"), item: canonical },
  ] });
  return { title, description, canonical, image, imageAlt, ogType, robots: indexable ? "index, follow, max-image-preview:large" : "noindex, follow", structuredData: { "@context": "https://schema.org", "@graph": indexable ? graph : [] } };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function renderSeoHead(path: string) {
  const seo = getPageSeo(path);
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}" />`,
    `<meta name="author" content="${SITE_NAME}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<link rel="canonical" href="${escape(seo.canonical)}" />`,
    ...Object.entries({ "og:type": seo.ogType, "og:site_name": SITE_NAME, "og:locale": "en_US", "og:title": seo.title, "og:description": seo.description, "og:url": seo.canonical, "og:image": seo.image, "og:image:alt": seo.imageAlt, "og:image:width": "1200", "og:image:height": "630", "og:image:type": "image/jpeg" }).map(([key, value]) => `<meta property="${key}" content="${escape(value)}" />`),
    ...Object.entries({ "twitter:card": "summary_large_image", "twitter:title": seo.title, "twitter:description": seo.description, "twitter:image": seo.image, "twitter:image:alt": seo.imageAlt }).map(([key, value]) => `<meta name="${key}" content="${escape(value)}" />`),
    `<script id="page-structured-data" type="application/ld+json">${serializeJsonLd(seo.structuredData)}</script>`,
  ].join("\n    ");
}
