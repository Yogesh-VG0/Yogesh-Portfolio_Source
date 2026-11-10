import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, SiteRoutes } from "./App";
export { indexablePaths, renderSeoHead, SITE_URL } from "./lib/seo";

export function render(pathname: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    let renderingError: unknown;
    const output = new PassThrough();
    output.on("data", (chunk) => { html += chunk.toString(); });
    output.on("end", () => renderingError ? reject(renderingError) : resolve(html));
    output.on("error", reject);
    const { pipe, abort } = renderToPipeableStream(
      <AppShell><StaticRouter location={pathname}><SiteRoutes /></StaticRouter></AppShell>,
      { onAllReady() { pipe(output); }, onError(error) { renderingError = error; }, onShellError: reject },
    );
    const timeout = setTimeout(() => { abort(); reject(new Error(`Prerender timed out: ${pathname}`)); }, 15000);
    output.on("close", () => clearTimeout(timeout));
  });
}
