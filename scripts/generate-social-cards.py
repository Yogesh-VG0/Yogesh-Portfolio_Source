"""Generate code-native SVG social cards; rasterize at 1200x630 for OG JPEGs."""
from pathlib import Path
from html import escape
import textwrap

cards = {
    'home': ('PORTFOLIO', 'Yogesh Vadivel', 'Full-Stack Developer', ['React', 'Next.js', 'Python', 'Node.js']),
    'projects': ('SELECTED WORK', 'Projects I\'ve built', 'Three web apps. Live demos, source code, and how they work.', ['StockPredict AI', 'ExpenseVision', 'Verdict Games']),
    'resume': ('RESUME', 'Yogesh Vadivel', 'Full-Stack Developer · Experience, skills, and education', ['React', 'Python', 'APIs', 'AI integrations']),
    'stockpredict-ai': ('PROJECT DETAILS', 'StockPredict AI', 'Explainable stock forecasts with LightGBM, LSTM, and SHAP.', ['Next.js', 'Python', 'MongoDB', 'GitHub Actions']),
    'expensevision': ('PROJECT DETAILS', 'ExpenseVision', 'An installable expense tracker with AI receipt scanning and budgets.', ['Next.js', 'Supabase', 'Receipt OCR', 'PWA']),
    'verdict-games': ('PROJECT DETAILS', 'Verdict Games', 'Game discovery, reviews, and scores from multiple sources.', ['Next.js', 'PostgreSQL', 'Multi-source data']),
}
root = Path('assets/social-cards')
root.mkdir(parents=True, exist_ok=True)
Path('public/social').mkdir(parents=True, exist_ok=True)
for slug, (eyebrow, title, description, tags) in cards.items():
    title_size = 76 if len(title) < 22 else 66
    description_lines = textwrap.wrap(description, width=53)
    lines = ''.join(f'<tspan x="78" dy="{0 if i == 0 else 47}">{escape(line)}</tspan>' for i, line in enumerate(description_lines))
    chips = ''
    x = 78
    for tag in tags:
        width = len(tag) * 14 + 38
        chips += f'<rect x="{x}" y="465" width="{width}" height="44" rx="10" fill="#101d31" stroke="#234775"/><text x="{x + 19}" y="494" fill="#b7d6ff" font-size="23">{escape(tag)}</text>'
        x += width + 14
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="{escape(title)} by Yogesh Vadivel">
<defs><radialGradient id="glow"><stop stop-color="#173765"/><stop offset="1" stop-color="#080c14"/></radialGradient></defs>
<rect width="1200" height="630" fill="#080c14"/><rect x="560" width="640" height="630" fill="url(#glow)"/>
<path d="M0 600H1200M1040 0V630" stroke="#355479" stroke-opacity=".25"/><rect x="78" y="70" width="52" height="4" rx="2" fill="#60a5fa"/>
<g font-family="Arial, sans-serif"><text x="78" y="128" font-size="22" letter-spacing="4" fill="#8bbcff">{eyebrow}</text>
<text x="78" y="270" font-size="{title_size}" font-weight="700" letter-spacing="-2" fill="#f7faff">{escape(title)}</text>
<text x="78" y="345" font-size="34" fill="#c7d2e2">{lines}</text>{chips}
<text x="78" y="570" font-size="25" fill="#9bb4d5">yogeshv.me</text><text x="1120" y="570" text-anchor="end" font-size="22" fill="#9bb4d5">{'Yogesh Vadivel' if slug not in ('home', 'resume') else 'Developer portfolio'}</text></g>
</svg>'''
    (root / f'{slug}.svg').write_text(svg, encoding='utf-8')
print(f'Generated {len(cards)} SVG social cards in {root}')
