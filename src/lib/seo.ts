import { projects } from "@/data/projects";

export const SITE_URL = "https://yogeshv.me";
export const SITE_NAME = "Yogesh Vadivel";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
export const HOME_DESCRIPTION = "Yogesh Vadivel is a full-stack developer building React, Next.js, Python and Node.js applications. Explore projects, experience and resume for India and the UAE.";

export const indexablePaths = ["/", "/resume/", ...projects.map((project) => `/projects/${project.slug}/`)];

export function getPageSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const project = projects.find((item) => path === `/projects/${item.slug}`);
  const isHome = path === "/";
  const isResume = path === "/resume";
  const indexable = isHome || isResume || Boolean(project);
  const canonical = `${SITE_URL}${path === "/" ? "/" : `${path}/`}`;
  const title = isHome ? "Yogesh Vadivel | Full-Stack Developer"
    : isResume ? "Yogesh Vadivel Resume | Full-Stack Developer"
      : project ? `${project.title} | Yogesh Vadivel — Developer Portfolio`
        : "Page not found | Yogesh Vadivel";
  const description = isHome ? HOME_DESCRIPTION
    : isResume ? "View Yogesh Vadivel's resume, full-stack and web development experience, education, and skills in React, Next.js, Python, Node.js and WordPress."
      : project ? `${project.title} by Yogesh Vadivel. ${project.cardDescription ?? project.tagline}`
        : "This page could not be found. Explore Yogesh Vadivel's developer portfolio, projects and resume.";
  const image = `${SITE_URL}/og-image.jpg`;
  const person = {
    "@type": "Person", "@id": PERSON_ID, name: SITE_NAME, alternateName: "Yogesh-VG0",
    url: `${SITE_URL}/`, jobTitle: "Full-Stack Developer", description: HOME_DESCRIPTION,
    sameAs: ["https://github.com/Yogesh-VG0", "https://www.linkedin.com/in/yogesh-vadivel-a287a6269/"],
    knowsAbout: ["Full-stack web development", "React", "Next.js", "TypeScript", "Python", "Node.js", "WordPress", "Technical SEO"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Manipal Academy of Higher Education, Dubai" },
  };
  const page = {
    "@type": isHome ? "ProfilePage" : "WebPage", "@id": `${canonical}#webpage`, url: canonical,
    name: title, description, inLanguage: "en", isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID }, mainEntity: isHome ? { "@id": PERSON_ID } : project ? { "@id": `${canonical}#project` } : { "@id": PERSON_ID },
  };
  const graph: Record<string, unknown>[] = [
    person,
    { "@type": "WebSite", "@id": WEBSITE_ID, url: `${SITE_URL}/`, name: SITE_NAME, alternateName: "Yogesh Vadivel Portfolio", inLanguage: "en", publisher: { "@id": PERSON_ID } },
    page,
  ];
  if (project) {
    graph.push({ "@type": "SoftwareSourceCode", "@id": `${canonical}#project`, name: project.title,
      description: project.cardDescription ?? project.tagline, url: canonical, image: `${SITE_URL}${project.image}`,
      author: { "@id": PERSON_ID }, codeRepository: project.githubUrl,
      programmingLanguage: project.tech, runtimePlatform: "Web browser" });
  }
  if (!isHome && indexable) {
    graph.push({ "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Yogesh Vadivel", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: project?.title ?? "Resume", item: canonical },
    ] });
  }
  return { title, description, canonical, image, imageAlt: "Yogesh Vadivel — Full-Stack Developer Portfolio", robots: indexable ? "index, follow, max-image-preview:large" : "noindex, follow", structuredData: { "@context": "https://schema.org", "@graph": indexable ? graph : [] } };
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
    ...Object.entries({ "og:type": "website", "og:site_name": SITE_NAME, "og:locale": "en_US", "og:title": seo.title, "og:description": seo.description, "og:url": seo.canonical, "og:image": seo.image, "og:image:alt": seo.imageAlt }).map(([key, value]) => `<meta property="${key}" content="${escape(value)}" />`),
    ...Object.entries({ "twitter:card": "summary_large_image", "twitter:title": seo.title, "twitter:description": seo.description, "twitter:image": seo.image, "twitter:image:alt": seo.imageAlt }).map(([key, value]) => `<meta name="${key}" content="${escape(value)}" />`),
    `<script id="page-structured-data" type="application/ld+json">${serializeJsonLd(seo.structuredData)}</script>`,
  ].join("\n    ");
}
