import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve("dist");
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
assert.equal(urls.length, 6, "All six public pages must be in the sitemap");
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
  if (url.pathname === "/") {
    assert.ok(html.split("</head>")[0].includes('<meta name="msvalidate.01" content="EE7B7410111CF4CB9CAF3F656D15AED7"'), "Bing ownership verification must remain in the homepage head");
    const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, "");
    assert.equal(heading, "Yogesh Vadivel", "The animated H1 must contain one clean name");
    assert.ok(html.includes('>75</span>'), "Real stock metric must appear in initial HTML");
    assert.ok(!html.includes("fonts.googleapis.com"), "Font CSS must be self-hosted");
  }
  if (url.pathname === "/resume/") {
    assert.ok(html.includes("Loading resume"), "The resume route must load the selected PDF automatically");
    assert.ok(!html.includes('id="resume-experience"') && !html.includes('id="resume-skills"'), "The resume must remain PDF-only");
    assert.ok(!html.includes("Preview PDF"), "The resume must not require a second preview click");
  }
  const social = html.match(/property="og:image" content="https:\/\/yogeshv\.me([^"?]+)"/)?.[1];
  assert.ok(social, `Missing social image: ${url}`);
  assert.ok((await stat(join(root, social))).size < 300000, `Social image exceeds 300KB: ${social}`);
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
