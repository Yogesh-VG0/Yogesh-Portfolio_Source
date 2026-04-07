import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * Detect touch-capable devices (phones + tablets) where
 * cursor-following animations are useless and can interfere
 * with other page elements like the GemBox PDF viewer.
 */
function isTouchDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  if (navigator.maxTouchPoints > 0) return true;
  const ua = navigator.userAgent || "";
  if (
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Samsung/i.test(
      ua,
    )
  )
    return true;
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 0) return true;
 return false;
}

/* ── Spring-physics node ── */
class SpringNode {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }
}

/* ── Single short trail line ── */
const TRAIL_LENGTH = 18;   // nodes in the trail (keeps it short)
const SPRING = 0.42;       // spring stiffness toward target
const FRICTION = 0.48;     // velocity damping per node
const DAMPENING = 0.25;    // how much parent velocity carries over
const TENSION = 0.98;      // spring decay along the chain

class Trail {
  nodes: SpringNode[];

  constructor(x: number, y: number) {
    this.nodes = Array.from({ length: TRAIL_LENGTH }, () => new SpringNode(x, y));
  }

  update(tx: number, ty: number) {
    let spring = SPRING;
    const head = this.nodes[0];
    head.vx += (tx - head.x) * spring;
    head.vy += (ty - head.y) * spring;

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * DAMPENING;
        node.vy += prev.vy * DAMPENING;
      }
      node.vx *= FRICTION;
      node.vy *= FRICTION;
      node.x += node.vx;
      node.y += node.vy;
      spring *= TENSION;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const nodes = this.nodes;
    if (nodes.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);

    for (let i = 1; i < nodes.length - 2; i++) {
      const current = nodes[i];
      const next = nodes[i + 1];
      const midX = 0.5 * (current.x + next.x);
      const midY = 0.5 * (current.y + next.y);
      ctx.quadraticCurveTo(current.x, current.y, midX, midY);
    }

    const last = nodes[nodes.length - 2];
    const end = nodes[nodes.length - 1];
    ctx.quadraticCurveTo(last.x, last.y, end.x, end.y);
    ctx.stroke();
  }
}

/* ── Hue oscillator ── */
class Wave {
  phase: number;
  offset: number;
  amplitude: number;
  frequency: number;

  constructor(phase: number, offset: number, amplitude: number, frequency: number) {
    this.phase = phase;
    this.offset = offset;
    this.amplitude = amplitude;
    this.frequency = frequency;
  }

  update() {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

/* ── Component ── */
const CursorGlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isTouch = useMemo(() => isTouchDevice(), []);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    const pos = { x: 0, y: 0 };
    let trail: Trail | null = null;
    let animationFrame = 0;

    const hue = new Wave(
      Math.random() * Math.PI * 2,
      isDark ? 215 : 228,
      isDark ? 40 : 22,
      isDark ? 0.0015 : 0.0012,
    );

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e && e.touches.length) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else if ("clientX" in e) {
        pos.x = (e as MouseEvent).clientX;
        pos.y = (e as MouseEvent).clientY;
      }
      if (!trail) {
        trail = new Trail(pos.x, pos.y);
      }
    };

    const render = () => {
      if (!running) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      if (trail) {
        trail.update(pos.x, pos.y);

        const h = hue.update();
        if (isDark) {
          ctx.globalCompositeOperation = "lighter";
          ctx.strokeStyle = `hsla(${Math.round(h)}, 70%, 55%, 0.25)`;
          ctx.lineWidth = 1;
          for (let i = 0; i < 20; i++) {
            trail.draw(ctx);
          }
          ctx.globalCompositeOperation = "source-over";
        } else {
          const head = trail.nodes[0];
          ctx.strokeStyle = `hsla(${Math.round(h)}, 82%, 60%, 0.13)`;
          ctx.lineWidth = 1.15;
          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsla(${Math.round(h + 18)}, 88%, 72%, 0.18)`;
          for (let i = 0; i < 12; i++) {
            trail.draw(ctx);
          }

          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.fillStyle = `hsla(${Math.round(h + 12)}, 90%, 72%, 0.08)`;
          ctx.arc(head.x, head.y, 22, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = `hsla(${Math.round(h - 16)}, 85%, 68%, 0.05)`;
          ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrame = requestAnimationFrame(render);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [isDark, isTouch]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[30] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default CursorGlow;
