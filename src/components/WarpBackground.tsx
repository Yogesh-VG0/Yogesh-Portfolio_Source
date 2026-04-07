import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

interface WarpStar {
  x: number;
  y: number;
  z: number;
  previousZ: number;
  radius: number;
  alpha: number;
}

const WarpBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas || !isDark) {
      cancelAnimationFrame(frameRef.current);
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let depth = 0;
    let stars: WarpStar[] = [];
    let isRunning = true;
    let resizeObserver: ResizeObserver | null = null;

    const setCanvasSize = () => {
      const bounds = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      centerX = width / 2;
      centerY = height / 2;
      depth = Math.max(width, height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const placeStar = (star: WarpStar, startNearCenter: boolean) => {
      const spreadX = startNearCenter ? width * 0.18 : width * 0.92;
      const spreadY = startNearCenter ? height * 0.18 : height * 0.82;
      const startZ = startNearCenter
        ? depth
        : Math.random() * depth * 0.85 + depth * 0.15;
      const initialScreenX = (Math.random() - 0.5) * spreadX;
      const initialScreenY = (Math.random() - 0.5) * spreadY;

      star.x = (initialScreenX * startZ) / depth;
      star.y = (initialScreenY * startZ) / depth;
      star.z = startZ;
      star.previousZ = startZ;
      star.radius = Math.random() * 1.1 + 0.35;
      star.alpha = Math.random() * 0.45 + 0.16;
    };

    const starCount = () => {
      const area = width * height;
      if (reduceMotion) {
        return Math.max(32, Math.min(54, Math.floor(area / 42000)));
      }
      if (width < 768) {
        return Math.max(54, Math.min(84, Math.floor(area / 26000)));
      }
      return Math.max(78, Math.min(128, Math.floor(area / 21000)));
    };

    const populateStars = () => {
      stars = Array.from({ length: starCount() }, () => {
        const star: WarpStar = {
          x: 0,
          y: 0,
          z: 0,
          previousZ: 0,
          radius: 0,
          alpha: 0,
        };
        placeStar(star, false);
        return star;
      });
    };

    const getSpeed = () => {
      if (reduceMotion) return 0;
      return width < 768 ? 5.4 : 7.2;
    };

    const drawBackdrop = () => {
      context.clearRect(0, 0, width, height);

      const fill = context.createLinearGradient(0, 0, 0, height);
      fill.addColorStop(0, "rgba(2, 6, 23, 0.86)");
      fill.addColorStop(0.45, "rgba(2, 8, 23, 0.44)");
      fill.addColorStop(1, "rgba(2, 6, 23, 0.08)");
      context.fillStyle = fill;
      context.fillRect(0, 0, width, height);

      const glow = context.createRadialGradient(
        centerX,
        height * 0.24,
        0,
        centerX,
        centerY,
        Math.max(width, height) * 0.72,
      );
      glow.addColorStop(0, "rgba(59, 130, 246, 0.16)");
      glow.addColorStop(0.25, "rgba(37, 99, 235, 0.10)");
      glow.addColorStop(0.55, "rgba(17, 24, 39, 0.04)");
      glow.addColorStop(1, "rgba(2, 6, 23, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const vignette = context.createRadialGradient(
        centerX,
        centerY,
        Math.min(width, height) * 0.16,
        centerX,
        centerY,
        Math.max(width, height) * 0.82,
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.28)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const drawFrame = () => {
      drawBackdrop();

      for (const star of stars) {
        star.previousZ = star.z;

        if (!reduceMotion) {
          star.z -= getSpeed();
          if (star.z <= 1) {
            placeStar(star, true);
            continue;
          }
        }

        const sx = (star.x / star.z) * depth + centerX;
        const sy = (star.y / star.z) * depth + centerY;
        const px = (star.x / star.previousZ) * depth + centerX;
        const py = (star.y / star.previousZ) * depth + centerY;

        if (sx < -24 || sx > width + 24 || sy < -24 || sy > height + 24) {
          placeStar(star, true);
          continue;
        }

        const progress = 1 - star.z / depth;
        const radius = star.radius + progress * 0.75;
        const lineAlpha = star.alpha * (0.34 + progress * 0.92);

        if (!reduceMotion) {
          const dx = sx - px;
          const dy = sy - py;
          const distance = Math.hypot(dx, dy);
          const maxLength = width < 768 ? 10 : 16;
          const ratio = distance > maxLength ? maxLength / distance : 1;

          context.beginPath();
          context.strokeStyle = `rgba(191, 219, 254, ${lineAlpha})`;
          context.lineWidth = Math.min(2, Math.max(0.45, radius));
          context.moveTo(px, py);
          context.lineTo(px + dx * ratio, py + dy * ratio);
          context.stroke();
        }

        context.beginPath();
        context.fillStyle = `rgba(255, 255, 255, ${Math.min(
          lineAlpha + 0.18,
          0.95,
        )})`;
        context.arc(sx, sy, radius, 0, Math.PI * 2);
        context.fill();

        if (radius > 1) {
          context.beginPath();
          context.fillStyle = `rgba(96, 165, 250, ${lineAlpha * 0.2})`;
          context.arc(sx, sy, radius * 2.6, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const animate = () => {
      if (!isRunning) return;
      drawFrame();
      frameRef.current = requestAnimationFrame(animate);
    };

    const resize = () => {
      setCanvasSize();
      populateStars();
      drawFrame();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameRef.current);
        return;
      }
      if (!reduceMotion) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        drawFrame();
      }
    };

    resize();

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!reduceMotion) {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(frameRef.current);
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isDark, reduceMotion]);

  const overlayStyle = isDark
    ? {
        background:
          "radial-gradient(circle at 50% 18%, rgba(59, 130, 246, 0.14) 0%, transparent 30%), radial-gradient(circle at 76% 16%, rgba(168, 85, 247, 0.12) 0%, transparent 22%), linear-gradient(180deg, rgba(2, 6, 23, 0.18) 0%, rgba(2, 6, 23, 0) 58%)",
      }
    : {
        background:
          "radial-gradient(circle at 50% 18%, rgba(59, 130, 246, 0.12) 0%, transparent 28%), radial-gradient(circle at 76% 16%, rgba(168, 85, 247, 0.10) 0%, transparent 22%), linear-gradient(180deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.08) 58%)",
      };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {isDark && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-80"
        />
      )}
      <div className="absolute inset-0" style={overlayStyle} />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background via-background/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute left-1/2 top-[36%] h-48 w-[min(82%,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/45 blur-3xl md:h-56" />
    </div>
  );
};

export default WarpBackground;
