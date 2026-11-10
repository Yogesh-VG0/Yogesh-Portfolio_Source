"""Rasterize native SVG cards. Optional tooling: pip install resvg-py Pillow."""
import io
from pathlib import Path
import resvg_py
from PIL import Image

for source in Path('assets/social-cards').glob('*.svg'):
    data = resvg_py.svg_to_bytes(svg_string=source.read_text(encoding='utf-8'))
    image = Image.open(io.BytesIO(data)).convert('RGB')
    target = Path('public/og-image.jpg') if source.stem == 'home' else Path('public/social') / f'{source.stem}.jpg'
    image.save(target, quality=90, optimize=True)
    print(target, image.size, target.stat().st_size)
