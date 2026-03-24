// @ts-nocheck
import { useEffect, useRef } from "react";

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
function Node(x: number, y: number) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
}

/* ── Single short trail line ── */
const TRAIL_LENGTH = 18;   // nodes in the trail (keeps it short)
const SPRING = 0.42;       // spring stiffness toward target
const FRICTION = 0.48;     // velocity damping per node
const DAMPENING = 0.25;    // how much parent velocity carries over
const TENSION = 0.98;      // spring decay along the chain

function Trail(x: number, y: number) {
  this.nodes = [];
  for (let i = 0; i < TRAIL_LENGTH; i++) {
    this.nodes.push(new Node(x, y));
  }
}

Trail.prototype.update = function (tx: number, ty: number) {
  let spring = SPRING;
  const head = this.nodes[0];
  head.vx += (tx - head.x) * spring;
  head.vy += (ty - head.y) * spring;

  for (let i = 0; i < this.nodes.length; i++) {
    const n = this.nodes[i];
    if (i > 0) {
      const prev = this.nodes[i - 1];
      n.vx += (prev.x - n.x) * spring;
      n.vy += (prev.y - n.y) * spring;
      n.vx += prev.vx * DAMPENING;
      n.vy += prev.vy * DAMPENING;
    }
    n.vx *= FRICTION;
    n.vy *= FRICTION;
    n.x += n.vx;
    n.y += n.vy;
    spring *= TENSION;
  }
};

Trail.prototype.draw = function (ctx: CanvasRenderingContext2D) {
  const nodes = this.nodes;
  if (nodes.length < 3) return;

  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);

  for (let i = 1; i < nodes.length - 2; i++) {
    const cur = nodes[i];
    const next = nodes[i + 1];
    const mx = 0.5 * (cur.x + next.x);
    const my = 0.5 * (cur.y + next.y);
    ctx.quadraticCurveTo(cur.x, cur.y, mx, my);
  }

  const last = nodes[nodes.length - 2];
  const end = nodes[nodes.length - 1];
  ctx.quadraticCurveTo(last.x, last.y, end.x, end.y);
  ctx.stroke();
};

/* ── Hue oscillator ── */
function Wave(phase: number, offset: number, amplitude: number, frequency: number) {
  this.phase = phase;
  this.offset = offset;
  this.amplitude = amplitude;
  this.frequency = frequency;
}
Wave.prototype.update = function () {
  this.phase += this.frequency;
  return this.offset + Math.sin(this.phase) * this.amplitude;
};

/* ── Component ── */
const CursorGlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isTouch = isTouchDevice();

  useEffect(() => {
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    const pos = { x: 0, y: 0 };
    let trail: any = null;

    const hue = new Wave(
      Math.random() * Math.PI * 2,
      215,
      40,
      0.0015,
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

      if (trail) {
        trail.update(pos.x, pos.y);

        ctx.globalCompositeOperation = "lighter";
        const h = hue.update();
        ctx.strokeStyle = `hsla(${Math.round(h)}, 70%, 55%, 0.25)`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
          trail.draw(ctx);
        }
        ctx.globalCompositeOperation = "source-over";
      }

      requestAnimationFrame(render);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    render();

    return () => {
      running = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [isTouch]);

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
