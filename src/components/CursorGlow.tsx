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

const CursorGlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isTouch = isTouchDevice();

  useEffect(() => {
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      visible: false,
      alpha: 0,
      targetAlpha: 0,
    };

    const GLOW_SIZE = 110;
    const CORE_SIZE = 26;
    const EASE = 0.16;
    const FADE_EASE = 0.12;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.visible = true;
      pointer.targetAlpha = 1;
    };

    const onPointerLeave = () => {
      pointer.visible = false;
      pointer.targetAlpha = 0;
    };

    const drawGlow = (x: number, y: number, alpha: number) => {
      if (alpha <= 0.001) return;

      const outer = ctx.createRadialGradient(x, y, 0, x, y, GLOW_SIZE);
      outer.addColorStop(0, `rgba(99, 102, 241, ${0.22 * alpha})`);
      outer.addColorStop(0.35, `rgba(99, 102, 241, ${0.14 * alpha})`);
      outer.addColorStop(0.7, `rgba(99, 102, 241, ${0.06 * alpha})`);
      outer.addColorStop(1, "rgba(99, 102, 241, 0)");

      ctx.fillStyle = outer;
      ctx.beginPath();
      ctx.arc(x, y, GLOW_SIZE, 0, Math.PI * 2);
      ctx.fill();

      const core = ctx.createRadialGradient(x, y, 0, x, y, CORE_SIZE);
      core.addColorStop(0, `rgba(255, 255, 255, ${0.16 * alpha})`);
      core.addColorStop(0.45, `rgba(167, 139, 250, ${0.18 * alpha})`);
      core.addColorStop(1, "rgba(167, 139, 250, 0)");

      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(x, y, CORE_SIZE, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      if (!running) return;

      pointer.x += (pointer.tx - pointer.x) * EASE;
      pointer.y += (pointer.ty - pointer.y) * EASE;
      pointer.alpha += (pointer.targetAlpha - pointer.alpha) * FADE_EASE;

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      ctx.globalCompositeOperation = "lighter";
      drawGlow(pointer.x, pointer.y, pointer.alpha);
      ctx.globalCompositeOperation = "source-over";

      raf = window.requestAnimationFrame(render);
    };

    resize();
    raf = window.requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[30] pointer-events-none"
    />
  );
};

export default CursorGlow;
