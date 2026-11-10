/** Match responsive files produced by scripts/optimize-images.py. */
export function screenshotSources(src: string, sizes: string) {
  const stem = src.replace(/\.webp$/, "");
  return { srcSet: `${stem}-640.webp 640w, ${stem}-1280.webp 1280w, ${src} 1920w`, sizes, decoding: "async" as const };
}
