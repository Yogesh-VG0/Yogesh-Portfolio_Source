// @vitest-environment node
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it } from "vitest";
import CountUp from "@/components/CountUp";
import Hero from "@/components/Hero";
import VisitorRegionProvider from "@/components/VisitorRegionProvider";
import Resume from "@/pages/Resume";
import { getPageSeo } from "@/lib/seo";

describe("prerendered content", () => {
  it.each([75, 3, 113, 8200])("renders the final metric %s before JavaScript runs", end => {
    const html = renderToString(<CountUp end={end} suffix="+" />);
    expect(html.replace(/<[^>]*>/g, "")).toBe(`${end}+`);
  });

  it("contains one copy of the animated name in the hero heading", () => {
    const html = renderToString(<VisitorRegionProvider><StaticRouter location="/"><Hero /></StaticRouter></VisitorRegionProvider>);
    expect([...html.matchAll(/<h1\b/g)]).toHaveLength(1);
    const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)![1].replace(/<[^>]*>/g, "");
    expect(heading).toBe("Yogesh Vadivel");
    expect(html).toContain('aria-label="Yogesh Vadivel — Full-Stack Developer"');
    expect([...html.matchAll(/class="animate-aurora /g)]).toHaveLength(1);
  });

  it("serves a useful HTML resume before the PDF viewer is requested", () => {
    const html = renderToString(<VisitorRegionProvider><StaticRouter location="/resume/"><Resume /></StaticRouter></VisitorRegionProvider>);
    expect(html).toContain("TechMagic Technologies");
    expect(html).toContain("B.Tech. in Computer Science and Engineering");
    expect(html).not.toContain('id="resume-pdf-preview"');
    expect([...html.matchAll(/href="\/projects\//g)]).toHaveLength(4);
  });

  it("uses distinct social images and descriptive titles for every case study", () => {
    const paths = ["stockpredict-ai", "expensevision", "verdict-games"];
    const pages = paths.map(slug => getPageSeo(`/projects/${slug}/`));
    expect(new Set(pages.map(page => page.image)).size).toBe(3);
    expect(pages.every(page => page.ogType === "article")).toBe(true);
    expect(pages[1].title).toContain("AI Expense Tracker PWA");
    expect(pages[2].structuredData["@graph"].some(node => node["@type"] === "SoftwareApplication")).toBe(true);
  });
});
