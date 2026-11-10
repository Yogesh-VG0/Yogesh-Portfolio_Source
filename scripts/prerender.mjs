import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { render, indexablePaths, renderSeoHead, SITE_URL } = await server.ssrLoadModule("/src/entry-server.tsx");
  const dist = resolve("dist");
  const template = await readFile(join(dist, "index.html"), "utf8");
  for (const pathname of indexablePaths) {
    const markup = await render(pathname);
    const html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${renderSeoHead(pathname)}\n    <!--seo:end-->`)
      .replace('<div id="root"></div>', () => `<div id="root" data-prerendered-path="${pathname}">${markup}</div>`);
    if (!html.includes("page-structured-data") || !markup.includes("<h1")) throw new Error(`Incomplete prerender: ${pathname}`);
    const directory = join(dist, pathname.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, "index.html"), html);
    console.log(`Prerendered ${pathname}`);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths.map(path => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n")}\n</urlset>\n`;
  await writeFile(join(dist, "sitemap.xml"), sitemap);
} finally {
  await server.close();
}
