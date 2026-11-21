#!/usr/bin/env python3
"""Panadería Alviña — build: inlines CSS, JS, fonts & images into one self-contained index.html."""
import base64, json, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
ASSETS = os.path.join(ROOT, 'assets')
FONTS = os.path.join(ROOT, 'fonts')
OUT = os.path.join(ROOT, 'index.html')

def b64_file(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('ascii')

# 1. image map
images = {}
for f in sorted(os.listdir(ASSETS)):
    if not f.endswith(('.jpg', '.jpeg', '.png', '.webp')):
        continue
    ext = f.rsplit('.', 1)[1].lower()
    mime = {'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png', 'webp': 'image/webp'}[ext]
    images[f.rsplit('.', 1)[0]] = f'data:{mime};base64,{b64_file(os.path.join(ASSETS, f))}'

# 2. font map
fonts = {}
for f in sorted(os.listdir(FONTS)):
    if f.endswith('.woff2'):
        fonts[f.rsplit('.', 1)[0]] = f'data:font/woff2;base64,{b64_file(os.path.join(FONTS, f))}'

# 3. template
html = open(os.path.join(SRC, 'index.html'), encoding='utf-8').read()
css = open(os.path.join(SRC, 'styles.css'), encoding='utf-8').read()
js = open(os.path.join(SRC, 'script.js'), encoding='utf-8').read()

# 4. inline font tokens in css
for name, uri in fonts.items():
    css = css.replace(f'__FONT:{name}__', uri)
if '__FONT:' in css:
    print('WARN: leftover font token', re.findall(r'__FONT:[\w.-]+__', css))

# 5. sass/html token replacement for images
for name, uri in images.items():
    html = html.replace(f'__IMG:{name}__', uri)
if '__IMG:' in html:
    print('WARN: leftover image token', re.findall(r'__IMG:[\w.-]+__', html))

# 6. js: IMGS map bootstrap
html = html.replace('__IMGS_MAP__', json.dumps(images, ensure_ascii=False))

# 7. inline css + js
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + css + '\n</style>')
html = html.replace('<script src="script.js"></script>', '<script>\n' + js + '\n</script>')

# 8. sanity check
if 'styles.css' in html or 'script.js' in html:
    print('WARN: external file reference remains')
if '__IMG:' in html or '__FONT:' in html or '__IMGS_MAP__' in html:
    print('ERROR: token remains after build'); sys.exit(1)

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)

size = os.path.getsize(OUT)
print(f'Built {OUT}')
print(f'  size: {size/1024/1024:.2f} MB')
print(f'  images: {len(images)} · fonts: {len(fonts)}')
