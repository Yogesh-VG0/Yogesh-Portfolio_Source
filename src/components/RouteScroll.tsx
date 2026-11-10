import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
type Position = { left: number; top: number };

/** New pages start at the top; browser Back/Forward restore their own position. */
export default function RouteScroll() {
  const location = useLocation();
  const navigation = useNavigationType();
  const positions = useRef(new Map<string, Position>());
  const currentKey = useRef(location.key);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const remember = () => {
      positions.current.set(currentKey.current, { left: window.scrollX, top: window.scrollY });
      if (positions.current.size > 100) positions.current.delete(positions.current.keys().next().value!);
    };
    window.addEventListener("scroll", remember, { passive: true });
    return () => {
      window.removeEventListener("scroll", remember);
      window.history.scrollRestoration = previous;
    };
  }, []);

  useBrowserLayoutEffect(() => {
    currentKey.current = location.key;
    const saved = navigation === "POP" ? positions.current.get(location.key) : undefined;
    if (saved) {
      window.scrollTo({ ...saved, behavior: "instant" });
      return;
    }

    let id = location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* Malformed fragments are harmless text. */ }
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (navigation !== "POP") {
      const heading = target?.querySelector<HTMLElement>("h1, h2, h3")
        ?? target ?? document.querySelector<HTMLElement>("main h1, header h1, h1");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
  }, [location.key, location.pathname, location.hash, navigation]);

  return null;
}
