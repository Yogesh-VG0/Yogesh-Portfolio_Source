import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

/**
 * Dual-mode background animation (fixed, full-viewport).
 * Dark  → canvas twinkling blue/white stars with glow.
 * Light → CSS animated aurora gradient mesh (no canvas).
 */

interface WarpStar {
  x: number;
  y: number;
  z: number;
  previousZ: number;
  radius: number;
  opacity: number;
  speed: number;
}

interface AmbientStar {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleOffset: number;
  twinkleSpeed: number;
}

/* ============================================================ */
/*  Dark-mode stars (canvas)                                      */
/* ============================================================ */
const DarkStars = ({ reduceMotion }: { reduceMotion: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let depth = 0;
    let warpStars: WarpStar[] = [];
    let ambientStars: AmbientStar[] = [];
    let running = true;
    let lastFrameTime = 0;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const deviceMemory = nav.deviceMemory;
    const hardwareConcurrency = nav.hardwareConcurrency || 4;
    let ambientBrightness = 1.1;
    let warpBrightness = 1.06;
    let streakLengthScale = 0.94;

    const createAmbientStar = (): AmbientStar => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.05 + 0.18,
      opacity: Math.random() * 0.14 + 0.045,
      twinkleOffset: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.55 + 0.18,
    });

    const createWarpStar = (spawnMode: "initial" | "respawn"): WarpStar => {
      const minDimension = Math.min(width, height);
      const angle = Math.random() * Math.PI * 2;
      const radialBias = spawnMode === "initial"
        ? Math.pow(Math.random(), 0.96)
        : Math.pow(Math.random(), 1.45);
      const screenRadius = spawnMode === "initial"
        ? ((width < 768 ? 0.16 : 0.12) + radialBias * (width < 768 ? 0.74 : 0.72)) * minDimension
        : ((width < 768 ? 0.05 : 0.035) + radialBias * (width < 768 ? 0.22 : 0.18)) * minDimension;
      const screenX = Math.cos(angle) * screenRadius;
      const screenY = Math.sin(angle) * screenRadius * (width < 768 ? 0.92 : 0.86);
      const startZ = spawnMode === "initial"
        ? depth * (0.12 + Math.random() * 0.88)
        : depth * (0.88 + Math.random() * 0.12);

      return {
        x: (screenX * startZ) / depth,
        y: (screenY * startZ) / depth,
        z: startZ,
        previousZ: startZ,
        radius: Math.random() * 0.7 + 0.28,
        opacity: Math.random() * 0.3 + 0.16,
        speed: Math.random() * 0.42 + 0.72,
      };
    };

    const resetWarpStar = (star: WarpStar, spawnMode: "initial" | "respawn") => {
      const next = createWarpStar(spawnMode);
      star.x = next.x;
      star.y = next.y;
      star.z = next.z;
      star.previousZ = next.previousZ;
      star.radius = next.radius;
      star.opacity = next.opacity;
      star.speed = next.speed;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const isMobile = width < 768;
      const isConstrainedDevice = isMobile || hardwareConcurrency <= 4 || (deviceMemory !== undefined && deviceMemory <= 4);
      const isHighEndDevice = width >= 1440 && hardwareConcurrency >= 8 && (deviceMemory === undefined || deviceMemory >= 8);
      const dpr = Math.min(window.devicePixelRatio || 1, isConstrainedDevice ? 1.1 : isHighEndDevice ? 1.45 : 1.3);
      centerX = width / 2;
      centerY = height / 2;
      depth = Math.max(width, height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ambientBrightness = isConstrainedDevice ? 1.14 : 1.1;
      warpBrightness = isConstrainedDevice ? 1.1 : 1.06;
      streakLengthScale = isConstrainedDevice ? 0.86 : isHighEndDevice ? 1 : 0.94;

      const area = width * height;
      const warpCount = reduceMotion
        ? Math.max(28, Math.min(40, Math.floor(area / 44000)))
        : isConstrainedDevice
          ? Math.max(70, Math.min(98, Math.floor(area / 17500)))
          : isHighEndDevice
            ? Math.max(110, Math.min(160, Math.floor(area / 12400)))
            : Math.max(96, Math.min(146, Math.floor(area / 13800)));
      const ambientCount = reduceMotion
        ? Math.max(12, Math.min(20, Math.floor(area / 82000)))
        : isConstrainedDevice
          ? Math.max(24, Math.min(36, Math.floor(area / 40000)))
          : isHighEndDevice
            ? Math.max(38, Math.min(58, Math.floor(area / 27500)))
            : Math.max(32, Math.min(48, Math.floor(area / 32000)));

      warpStars = Array.from({ length: warpCount }, () => createWarpStar("initial"));
      ambientStars = Array.from({ length: ambientCount }, () => createAmbientStar());
      lastFrameTime = performance.now();
    };

    const getBaseSpeed = () => {
      if (reduceMotion) return 0;
      if (width < 640) return 0.94;
      if (width < 1024) return 1.12;
      return 1.32;
    };

    const drawBackdrop = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const topGlow = ctx.createRadialGradient(
        centerX,
        height * 0.16,
        0,
        centerX,
        height * 0.18,
        Math.max(width, height) * 0.64,
      );
      topGlow.addColorStop(0, "rgba(59, 130, 246, 0.05)");
      topGlow.addColorStop(0.35, "rgba(37, 99, 235, 0.015)");
      topGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);

      const sideGlow = ctx.createRadialGradient(
        width * 0.82,
        height * 0.2,
        0,
        width * 0.82,
        height * 0.2,
        Math.max(width, height) * 0.42,
      );
      sideGlow.addColorStop(0, "rgba(168, 85, 247, 0.025)");
      sideGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = sideGlow;
      ctx.fillRect(0, 0, width, height);
    };

    const drawAmbientStars = (time: number) => {
      const seconds = time * 0.001;

      for (const star of ambientStars) {
        const shimmer = 0.82 + Math.sin(seconds * star.twinkleSpeed + star.twinkleOffset) * 0.18;
        const alpha = Math.min(0.24, star.opacity * shimmer * ambientBrightness);

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        if (star.radius > 0.95) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(147, 197, 253, ${alpha * 0.12})`;
          ctx.arc(star.x, star.y, star.radius * 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawFrame = (time: number, deltaScale: number) => {
      drawBackdrop();
      drawAmbientStars(time);
      const speed = getBaseSpeed() * deltaScale;

      for (const star of warpStars) {
        star.previousZ = star.z;

        if (!reduceMotion) {
          star.z -= speed * star.speed;
          if (star.z <= 0.8) {
            resetWarpStar(star, "respawn");
            continue;
          }
        }

        const sx = (star.x / star.z) * depth + centerX;
        const sy = (star.y / star.z) * depth + centerY;
        const px = (star.x / star.previousZ) * depth + centerX;
        const py = (star.y / star.previousZ) * depth + centerY;

        if (sx < -32 || sx > width + 32 || sy < -32 || sy > height + 32) {
          resetWarpStar(star, "respawn");
          continue;
        }

        const progress = Math.min(1, Math.max(0, 1 - star.z / depth));
        const warpProgress = Math.pow(progress, 1.22);
        const radius = star.radius + warpProgress * 1.06;
        const alpha = Math.min(0.8, star.opacity * (0.1 + warpProgress * 0.96) * warpBrightness);

        if (!reduceMotion) {
          const dx = sx - px;
          const dy = sy - py;
          const distance = Math.hypot(dx, dy);
          const maxLength = (width < 768 ? 6.5 + warpProgress * 12.5 : 9 + warpProgress * 18) * streakLengthScale;
          const ratio = distance > maxLength ? maxLength / distance : 1;

          if (distance > 0.45) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(224, 238, 255, ${alpha * (0.46 + warpProgress * 0.34)})`;
            ctx.lineWidth = Math.min(1.95, Math.max(0.4, radius * (0.78 + warpProgress * 0.42)));
            ctx.moveTo(px, py);
            ctx.lineTo(px + dx * ratio, py + dy * ratio);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(alpha + 0.06, 0.82)})`;
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        if (radius > 1.02) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(147, 197, 253, ${alpha * 0.13})`;
          ctx.arc(sx, sy, radius * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const render = (time: number) => {
      if (!running) return;
      const delta = lastFrameTime ? Math.min(24, time - lastFrameTime) : 16.67;
      const deltaScale = Math.max(0.9, Math.min(1.12, delta / 16.67));
      lastFrameTime = time;
      drawFrame(time, deltaScale);
      rafRef.current = requestAnimationFrame(render);
    };

    const onVisChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else if (!reduceMotion) {
        lastFrameTime = performance.now();
        rafRef.current = requestAnimationFrame(render);
      } else {
        drawFrame(performance.now(), 1);
      }
    };

    resize();
    document.addEventListener("visibilitychange", onVisChange);
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      rafRef.current = requestAnimationFrame(render);
    } else {
      drawFrame(performance.now(), 1);
    }

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "220px 220px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(59,130,246,0.04),transparent_32%),radial-gradient(circle_at_72%_16%,rgba(168,85,247,0.014),transparent_24%)]" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 42%, rgba(0, 0, 0, 0.1) 76%, rgba(0, 0, 0, 0.32) 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/62 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
    </div>
  );
};

/* ============================================================ */
/*  Light-mode aurora (pure CSS gradient mesh)                     */
/* ============================================================ */
const LightAurora = ({ reduceMotion }: { reduceMotion: boolean }) => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,248,255,0.98)_42%,rgba(248,250,252,1)_100%)]" />
    <div
      className="absolute inset-0 opacity-[0.92]"
      style={{
        background: [
          "radial-gradient(ellipse 80% 60% at 18% 20%, rgba(56, 189, 248, 0.16) 0%, transparent 62%)",
          "radial-gradient(ellipse 70% 55% at 82% 18%, rgba(168, 85, 247, 0.12) 0%, transparent 58%)",
          "radial-gradient(ellipse 60% 70% at 56% 78%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)",
          "radial-gradient(ellipse 52% 48% at 20% 84%, rgba(14, 165, 233, 0.07) 0%, transparent 50%)",
        ].join(", "),
        backgroundSize: "160% 160%, 180% 180%, 150% 150%, 170% 170%",
        animation: reduceMotion ? undefined : "aurora-drift 36s ease-in-out infinite",
      }}
    />
    <div
      className="absolute inset-0 opacity-28"
      style={{
        backgroundImage: "radial-gradient(rgba(59,130,246,0.08) 0.8px, transparent 0.8px)",
        backgroundSize: "24px 24px",
        backgroundPosition: "center center",
      }}
    />
    <div className="absolute -left-16 top-[12%] h-64 w-64 rounded-full bg-sky-300/16 blur-3xl" />
    <div className="absolute right-[-4rem] top-[10%] h-72 w-72 rounded-full bg-violet-300/14 blur-3xl" />
    <div className="absolute left-1/2 top-[68%] h-80 w-[min(90vw,48rem)] -translate-x-1/2 rounded-full bg-blue-200/14 blur-3xl" />
    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/58 via-white/18 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50/78 via-slate-50/24 to-transparent" />
  </div>
);

/* ============================================================ */
/*  Exported wrapper — switches by theme                          */
/* ============================================================ */
const StarsBackground = () => {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;
  const isDark = resolvedTheme !== "light";

  return isDark ? <DarkStars reduceMotion={reduceMotion} /> : <LightAurora reduceMotion={reduceMotion} />;
};

export default StarsBackground;
