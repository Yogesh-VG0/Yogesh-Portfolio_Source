"""Create responsive WebP versions from project screenshot PNGs (requires Pillow)."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
public = root / "public"
sources = root / "assets" / "source-screenshots"
original_size = 0
optimized_size = 0
for source in sorted(sources.glob("*_img/*.png")):
    original_size += source.stat().st_size
    with Image.open(source) as image:
        image = image.convert("RGB")
        for width in (640, 1280, 1920):
            variant = image.copy()
            variant.thumbnail((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
            destination = public / source.parent.name / (f"{source.stem}-{width}.webp" if width != 1920 else f"{source.stem}.webp")
            destination.parent.mkdir(parents=True, exist_ok=True)
            variant.save(destination, "WEBP", quality=84, method=6)
            optimized_size += destination.stat().st_size
print(f"Original screenshots: {original_size:,} bytes; all responsive variants: {optimized_size:,} bytes")
with Image.open(root / "assets" / "og-image.png") as image:
    image.convert("RGB").save(public / "og-image.jpg", "JPEG", quality=88, optimize=True)
