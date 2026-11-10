import { cleanup, render, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { getPageSeo, indexablePaths, renderSeoHead, serializeJsonLd } from "@/lib/seo";
import SeoMetadata from "@/components/SeoMetadata";

afterEach(cleanup);

describe("search metadata", () => {
  it("gives every public page a distinct title, description, and canonical", () => {
    const pages = indexablePaths.map(getPageSeo);
    expect(pages).toHaveLength(6);
    expect(new Set(pages.map(p => p.title)).size).toBe(6);
    expect(new Set(pages.map(p => p.description)).size).toBe(6);
    for (const page of pages) {
      expect(page.title).toContain("Yogesh Vadivel");
      expect(page.canonical).toMatch(/^https:\/\/yogeshv\.me\/.*\/$|^https:\/\/yogeshv\.me\/$/);
      expect(page.robots).toContain("index, follow");
      expect(page.image).toMatch(/^https:\/\//);
    }
  });

  it("marks missing pages and missing projects as noindex", () => {
    expect(getPageSeo("/missing").robots).toBe("noindex, follow");
    expect(getPageSeo("/projects/missing/").robots).toBe("noindex, follow");
  });

  it("normalizes trailing slashes consistently", () => {
    expect(getPageSeo("/resume").canonical).toBe(getPageSeo("/resume/").canonical);
  });

  it("keeps shared search metadata independent of visitor location", () => {
    const home = getPageSeo("/");
    expect(home.title).toBe("Yogesh Vadivel | Full-Stack Developer");
    expect(home.description).toContain("React, Next.js, Python and Node.js");
    expect(home.structuredData["@graph"].find(node => node["@type"] === "Person")).not.toHaveProperty("homeLocation");
  });

  it("connects the profile, projects and breadcrumbs to the same person", () => {
    const home = getPageSeo("/").structuredData["@graph"];
    expect(home.find(node => node["@type"] === "ProfilePage")?.mainEntity).toEqual({ "@id": "https://yogeshv.me/#person" });
    const project = getPageSeo("/projects/verdict-games/").structuredData["@graph"];
    expect(project.find(node => node["@type"] === "SoftwareSourceCode")?.author).toEqual({ "@id": "https://yogeshv.me/#person" });
    expect(project.some(node => node["@type"] === "BreadcrumbList")).toBe(true);
  });

  it("escapes JSON-LD so content cannot terminate its script element", () => {
    const json = serializeJsonLd({ text: "</script><script>alert(1)</script>" });
    expect(json).not.toContain("<");
    expect(JSON.parse(json).text).toContain("</script>");
    expect(renderSeoHead("/projects/expensevision/")).toContain('id="page-structured-data"');
  });

  it("updates canonical, social metadata and robots during client-side navigation", async () => {
    let navigate: ReturnType<typeof useNavigate>;
    const RouteHarness = () => { navigate = useNavigate(); return <SeoMetadata />; };
    render(<MemoryRouter><RouteHarness /></MemoryRouter>);
    await waitFor(() => expect(document.title).toBe(getPageSeo("/").title));
    const { act } = await import("@testing-library/react");
    await act(async () => { navigate("/projects/expensevision/"); });
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://yogeshv.me/projects/expensevision/");
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute("content", getPageSeo("/projects/expensevision/").title);
    await act(async () => { navigate("/missing"); });
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    await act(async () => { navigate("/"); });
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "index, follow, max-image-preview:large");
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('#page-structured-data')).toHaveLength(1);
  });
});
