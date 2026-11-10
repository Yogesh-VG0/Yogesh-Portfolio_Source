import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Keep local development and previews out of production analytics.
if (import.meta.env.PROD && ["yogeshv.me", "www.yogeshv.me", "yogesh-vg0.github.io"].includes(window.location.hostname)) {
  const beacon = document.createElement("script");
  beacon.defer = true;
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.dataset.cfBeacon = JSON.stringify({ token: "15c2e68104164135bd305d9716326bed" });
  document.head.appendChild(beacon);
}

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";
if (root.hasChildNodes() && normalizePath(root.dataset.prerenderedPath ?? "") === normalizePath(window.location.pathname)) hydrateRoot(root, app);
else createRoot(root).render(app);
