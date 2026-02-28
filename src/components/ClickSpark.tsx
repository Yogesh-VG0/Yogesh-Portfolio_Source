import { useEffect, useRef, useCallback } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

/**
 * Global click-spark effect.
 * Renders tiny sparks radiating from click position.
 * Renders on a fixed full-screen canvas, pointer-events-none.
 */
const ClickSpark = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

  const spawnSparks = useCallback((x: number, y: number) => {
    const count = 8 + Math.floor(Math.random() * 6);
    const baseHue = 210 + Math.random() * 40; // blue-ish range
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.4 + Math.random() * 0.3,
        size: 1.5 + Math.random() * 2,
        hue: baseHue + Math.random() * 30,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onClick = (e: MouseEvent) => {
      spawnSparks(e.clientX, e.clientY);
      if (!activeRef.current) {
        activeRef.current = true;
        rafRef.current = requestAnimationFrame(render);
      }
    };

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const sparks = sparksRef.current;
      const dt = 1 / 60;

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= dt / s.maxLife;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.vy += 0.08; // gravity

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, s.life);
        const size = s.size * (0.5 + 0.5 * alpha);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${s.hue}, 80%, 65%)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Glow trail
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (sparks.length > 0) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        activeRef.current = false;
      }
    };

    window.addEventListener("click", onClick);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [spawnSparks]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ClickSpark;
