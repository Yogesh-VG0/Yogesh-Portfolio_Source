import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageSeo, serializeJsonLd, SITE_NAME } from "@/lib/seo";

export default function SeoMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getPageSeo(pathname);
    document.title = seo.title;
    const meta = (attribute: "name" | "property", key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
      element.content = value;
    };
    meta("name", "description", seo.description);
    meta("name", "robots", seo.robots);
    for (const [key, value] of Object.entries({ "og:title": seo.title, "og:description": seo.description, "og:url": seo.canonical, "og:image": seo.image, "og:image:alt": seo.imageAlt, "og:site_name": SITE_NAME })) meta("property", key, value);
    for (const [key, value] of Object.entries({ "twitter:title": seo.title, "twitter:description": seo.description, "twitter:image": seo.image, "twitter:image:alt": seo.imageAlt })) meta("name", key, value);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = seo.canonical;
    let structuredData = document.getElementById("page-structured-data");
    if (!structuredData) { structuredData = document.createElement("script"); structuredData.id = "page-structured-data"; structuredData.setAttribute("type", "application/ld+json"); document.head.appendChild(structuredData); }
    structuredData.textContent = serializeJsonLd(seo.structuredData);
  }, [pathname]);
  return null;
}
