import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve("dist");
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
assert.equal(urls.length, 5, "All five public pages must be in the sitemap");
for (const url of urls) {
  const html = await readFile(join(root, url.pathname, "index.html"), "utf8");
  assert.ok(html.includes(`rel="canonical" href="${url.href}"`), `Canonical mismatch: ${url}`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `Expected one H1: ${url}`);
  assert.ok(html.includes(`data-prerendered-path="${url.pathname}"`), `Missing route identity: ${url}`);
  assert.ok(html.includes("Yogesh Vadivel"), `Missing name: ${url}`);
  assert.ok(!html.includes('content="noindex'), `Public page is noindex: ${url}`);
  const json = html.match(/<script id="page-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(json, `Missing structured data: ${url}`);
  assert.ok(JSON.parse(json)["@graph"].some(node => node["@type"] === "Person"));
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
    const file = join(root, match[1]);
    const info = await stat(file).catch(() => null);
    assert.ok(info, `Missing linked file ${match[1]} on ${url.pathname}`);
    if (info.isDirectory()) await stat(join(file, "index.html"));
  }
  for (const match of html.matchAll(/(\/[^"\s,]+\.webp)\s+\d+w/g)) {
    await stat(join(root, match[1]));
  }
  console.log(`Verified HTML, metadata, schema and local links: ${url.pathname}`);
}
assert.ok((await readFile(join(root, "404.html"), "utf8")).includes('content="noindex, follow"'));
console.log("Production artifacts verified.");
