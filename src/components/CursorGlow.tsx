// @ts-nocheck
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function Wave(e: any) {
  this.phase = e.phase || 0;
  this.offset = e.offset || 0;
  this.frequency = e.frequency || 0.001;
  this.amplitude = e.amplitude || 1;
}
Wave.prototype.update = function () {
  this.phase += this.frequency;
  return this.offset + Math.sin(this.phase) * this.amplitude;
};

function Node() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
}

const E = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

function Line(e: any, pos: any) {
  this.spring = e.spring + 0.1 * Math.random() - 0.02;
  this.friction = E.friction + 0.01 * Math.random() - 0.002;
  this.nodes = [];
  for (let i = 0; i < E.size; i++) {
    const t = new Node();
    t.x = pos.x;
    t.y = pos.y;
    this.nodes.push(t);
  }
}
Line.prototype.update = function () {
  let e = this.spring;
  let t = this.nodes[0];
  t.vx += (this._pos.x - t.x) * e;
  t.vy += (this._pos.y - t.y) * e;
  for (let i = 0; i < this.nodes.length; i++) {
    t = this.nodes[i];
    if (i > 0) {
      const n = this.nodes[i - 1];
      t.vx += (n.x - t.x) * e;
      t.vy += (n.y - t.y) * e;
      t.vx += n.vx * E.dampening;
      t.vy += n.vy * E.dampening;
    }
    t.vx *= this.friction;
    t.vy *= this.friction;
    t.x += t.vx;
    t.y += t.vy;
    e *= E.tension;
  }
};
Line.prototype.draw = function (ctx: CanvasRenderingContext2D) {
  let n = this.nodes[0].x;
  let i = this.nodes[0].y;
  ctx.beginPath();
  ctx.moveTo(n, i);
  for (let a = 1; a < this.nodes.length - 2; a++) {
    const e = this.nodes[a];
    const t = this.nodes[a + 1];
    n = 0.5 * (e.x + t.x);
    i = 0.5 * (e.y + t.y);
    ctx.quadraticCurveTo(e.x, e.y, n, i);
  }
  const last = this.nodes[this.nodes.length - 2];
  const end = this.nodes[this.nodes.length - 1];
  ctx.quadraticCurveTo(last.x, last.y, end.x, end.y);
  ctx.stroke();
  ctx.closePath();
};

const CursorGlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    const pos = { x: 0, y: 0 };
    let lines: any[] = [];
    let inited = false;

    const f = new Wave({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 40,
      frequency: 0.0015,
      offset: 215,
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const initLines = () => {
      lines = [];
      for (let i = 0; i < E.trails; i++) {
        const l = new Line({ spring: 0.4 + (i / E.trails) * 0.025 }, pos);
        l._pos = pos;
        lines.push(l);
      }
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e && e.touches.length) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else if ("clientX" in e) {
        pos.x = (e as MouseEvent).clientX;
        pos.y = (e as MouseEvent).clientY;
      }
      if (!inited) {
        inited = true;
        initLines();
      }
    };

    const render = () => {
      if (!running) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      const hue = f.update();
      ctx.strokeStyle = `hsla(${Math.round(hue)}, 70%, 55%, 0.25)`;
      ctx.lineWidth = 1;
      for (const line of lines) {
        line.update();
        line.draw(ctx);
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
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default CursorGlow;
