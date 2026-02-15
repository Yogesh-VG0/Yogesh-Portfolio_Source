import { motion } from "framer-motion";

/**
 * Aurora-style background — soft, ethereal gradient blobs that drift and pulse.
 * Designed for dark backgrounds (Contact section).
 */
const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ maxWidth: "100vw" }}>
      {/* Base noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Aurora blob 1 — primary/purple — top left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, hsla(var(--primary), 0.12) 0%, hsla(var(--primary), 0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 30, -10, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora blob 2 — cyan/teal — right side */}
      <motion.div
        className="absolute -top-10 -right-1/4 w-[60%] h-[80%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.10) 0%, rgba(56, 189, 248, 0.03) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora blob 3 — indigo/violet — bottom center */}
      <motion.div
        className="absolute -bottom-1/4 left-1/4 w-[50%] h-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.10) 0%, rgba(139, 92, 246, 0.03) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.05, 0.92, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Aurora blob 4 — emerald accent — subtle center left */}
      <motion.div
        className="absolute top-1/3 -left-10 w-[35%] h-[40%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(52, 211, 153, 0.06) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.12, 0.96, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Horizontal aurora band — subtle glow across the middle */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsla(var(--primary), 0.08) 20%, rgba(56, 189, 248, 0.06) 50%, hsla(var(--primary), 0.08) 80%, transparent 100%)",
          boxShadow: "0 0 60px 30px hsla(var(--primary), 0.04)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scaleY: [1, 2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AuroraBackground;
