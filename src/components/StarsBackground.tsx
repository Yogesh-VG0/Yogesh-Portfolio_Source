import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

/**
 * Dual-mode background animation (fixed, full-viewport).
 * Dark  → canvas twinkling blue/white stars with glow.
 * Light → CSS animated aurora gradient mesh (no canvas).
 */

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  drift: number;
}

/* ============================================================ */
/*  Dark-mode stars (canvas)                                      */
/* ============================================================ */
const DarkStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  const initStars = useCallback((w: number, h: number) => {
    const count = Math.min(400, Math.max(80, Math.floor((w * h) / 3000)));
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.008 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.15,
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars(window.innerWidth, window.innerHeight);
    };

    resize();

    let time = 0;
    const render = () => {
      if (!running) return;
      time += 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const star of starsRef.current) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * (0.5 + 0.5 * twinkle);

        star.y += star.drift * 0.05;
        if (star.y < -5) star.y = h + 5;
        if (star.y > h + 5) star.y = -5;

        const blueShift = Math.sin(star.twinkleOffset) * 0.3;
        const r = Math.round(200 + 55 * blueShift);
        const g = Math.round(210 + 45 * blueShift);
        ctx.fillStyle = `rgba(${r},${g},255,${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        if (star.radius > 1) {
          ctx.fillStyle = `rgba(100,160,255,${alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const onVisChange = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else rafRef.current = requestAnimationFrame(render);
    };

    document.addEventListener("visibilitychange", onVisChange);
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("resize", resize);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

/* ============================================================ */
/*  Light-mode aurora (pure CSS gradient mesh)                     */
/* ============================================================ */
const LightAurora = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none"
    aria-hidden="true"
    style={{
      background: [
        "radial-gradient(ellipse 80% 60% at 20% 30%, hsla(220, 75%, 82%, 0.55) 0%, transparent 60%)",
        "radial-gradient(ellipse 70% 50% at 80% 20%, hsla(260, 65%, 84%, 0.45) 0%, transparent 55%)",
        "radial-gradient(ellipse 60% 70% at 60% 80%, hsla(190, 70%, 80%, 0.4) 0%, transparent 55%)",
        "radial-gradient(ellipse 50% 50% at 10% 70%, hsla(320, 55%, 86%, 0.35) 0%, transparent 50%)",
      ].join(", "),
      backgroundSize: "200% 200%, 200% 200%, 200% 200%, 200% 200%",
      animation: "aurora-drift 25s ease-in-out infinite",
    }}
  />
);

/* ============================================================ */
/*  Exported wrapper — switches by theme                          */
/* ============================================================ */
const StarsBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return isDark ? <DarkStars /> : <LightAurora />;
};

export default StarsBackground;
