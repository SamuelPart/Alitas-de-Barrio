"""
Genera el QR de la carta de Alitas Barrio: módulos redondeados,
localizadores (finders) con acento de fuego y tarjeta de vidrio con el logo.

Uso:  python3 design/make_qr.py [url]
Requiere: qrcode, pillow, numpy
"""
import sys
import numpy as np
import qrcode
from PIL import Image, ImageDraw, ImageFilter

URL = sys.argv[1] if len(sys.argv) > 1 else "https://debarrioalitas.vercel.app/"
OUT_DIR = "public/img"
LOGO = "public/img/logo.png"

# Paleta de marca
FIRE_A = (229, 57, 53)     # #E53935
FIRE_B = (251, 140, 0)     # #FB8C00
GOLD = (253, 216, 53)      # #FDD835
INK = (8, 8, 10)

# Geometría validada (decodifica con lectores estándar)
DOT_RATIO = 0.5            # módulos como círculos
FINDER_RADIUS = 0.15       # radio de esquina del localizador
LOGO_RATIO = 0.15         # lado de la tarjeta central / lienzo
QUIET_MODULES = 3.2        # zona de silencio alrededor del QR


def gradient(size, c1, c2, angle=45):
    y, x = np.mgrid[0:size, 0:size].astype(np.float32)
    a = np.radians(angle)
    t = x * np.cos(a) + y * np.sin(a)
    t = (t - t.min()) / (t.max() - t.min() + 1e-6)
    arr = np.zeros((size, size, 3), np.float32)
    for i in range(3):
        arr[..., i] = c1[i] + (c2[i] - c1[i]) * t
    return Image.fromarray(arr.astype(np.uint8), "RGB").convert("RGBA")


def paint_with_gradient(canvas, mask, c1, c2, angle=45):
    canvas.paste(gradient(canvas.size[0], c1, c2, angle), (0, 0), mask)


def build(dark=False, pixels=2000, out="qr.png"):
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=1, border=0)
    qr.add_data(URL)
    qr.make(fit=True)
    m = qr.get_matrix()
    n = len(m)

    S = pixels
    cell = S / (n + 2 * QUIET_MODULES)
    pad = cell * QUIET_MODULES

    bg = (0, 0, 0, 0) if dark else (250, 248, 244, 255)
    fg = INK if not dark else (245, 242, 236)

    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))

    # ---------- tarjeta de vidrio de fondo
    card = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    cd = ImageDraw.Draw(card)
    cd.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.075), fill=bg or (16, 16, 20, 255))
    img = Image.alpha_composite(img, card)

    gloss = Image.new("L", (S, S), 0)
    gd = ImageDraw.Draw(gloss)
    gd.ellipse([-S * 0.4, -S * 0.5, S * 0.9, S * 0.42], fill=34 if dark else 60)
    gloss = gloss.filter(ImageFilter.GaussianBlur(S * 0.1))
    img = Image.composite(
        Image.new("RGBA", (S, S), (255, 255, 255, 40 if not dark else 22)), img, gloss
    )

    edge = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(edge).rounded_rectangle(
        [S * 0.005, S * 0.005, S * 0.995, S * 0.995],
        radius=int(S * 0.072),
        outline=(255, 255, 255, 70 if not dark else 34),
        width=max(2, int(S * 0.0016)),
    )
    img = Image.alpha_composite(img, edge)

    # ---------- zona reservada al logo (cubre la tarjeta + margen)
    card_side = S * LOGO_RATIO * 1.75
    half_cells = (card_side / 2) / cell + 0.8
    mid = n / 2

    def reserved(r, c):
        return abs(c + 0.5 - mid) < half_cells and abs(r + 0.5 - mid) < half_cells

    def is_finder(r, c):
        return (r < 7 and c < 7) or (r < 7 and c >= n - 7) or (r >= n - 7 and c < 7)

    # ---------- módulos
    dots = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    dd = ImageDraw.Draw(dots)
    rad = cell * DOT_RATIO
    for r in range(n):
        for c in range(n):
            if not m[r][c] or is_finder(r, c) or reserved(r, c):
                continue
            cx = pad + c * cell + cell / 2
            cy = pad + r * cell + cell / 2
            dd.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=fg + (255,))
    img = Image.alpha_composite(img, dots)

    # ---------- localizadores con degradado
    finders = Image.new("L", (S, S), 0)
    fd = ImageDraw.Draw(finders)
    for br, bc in [(0, 0), (0, n - 7), (n - 7, 0)]:
        x0 = pad + bc * cell
        y0 = pad + br * cell
        side = 7 * cell
        radius = int(side * FINDER_RADIUS)
        fd.rounded_rectangle([x0, y0, x0 + side, y0 + side], radius=radius,
                             outline=255, width=int(round(cell)))
        inner = 3 * cell
        cx0 = x0 + (side - inner) / 2
        cy0 = y0 + (side - inner) / 2
        fd.rounded_rectangle([cx0, cy0, cx0 + inner, cy0 + inner], radius=0, fill=255)
    paint_with_gradient(img, finders, FIRE_A, FIRE_B, 40)

    # ---------- tarjeta central con el logo
    box = [S / 2 - card_side / 2, S / 2 - card_side / 2, S / 2 + card_side / 2, S / 2 + card_side / 2]
    radius = int(card_side * 0.26)

    shadow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        [box[0], box[1] + S * 0.012, box[2], box[3] + S * 0.012],
        radius=radius, fill=(0, 0, 0, 80),
    )
    img = Image.alpha_composite(img, shadow.filter(ImageFilter.GaussianBlur(S * 0.012)))

    plate = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(plate).rounded_rectangle(
        box, radius=radius, fill=(255, 255, 255, 252) if not dark else (20, 20, 24, 252)
    )
    img = Image.alpha_composite(img, plate)

    ring = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(ring).rounded_rectangle(
        [box[0] + 1, box[1] + 1, box[2] - 1, box[3] - 1],
        radius=radius, outline=(255, 255, 255, 255), width=max(2, int(S * 0.002)),
    )
    paint_with_gradient(img, ring.split()[3], FIRE_B, GOLD, 40)

    logo = Image.open(LOGO).convert("RGBA")
    target = card_side * 0.68
    logo = logo.resize((max(1, int(logo.width * target / logo.height)), int(target)), Image.LANCZOS)
    img.alpha_composite(logo, (int(S / 2 - logo.width / 2), int(S / 2 - logo.height / 2)))

    img.save(out, optimize=True)
    print(f"{out}  {img.size[0]}px  módulos={n}  url={URL}")


if __name__ == "__main__":
    build(dark=False, out=f"{OUT_DIR}/qr-carta.png")
    build(dark=True, out=f"{OUT_DIR}/qr-carta-dark.png")
