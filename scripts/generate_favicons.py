"""
One-shot favicon + OG image generator.

Reads the new TASH logo from eh_source_assets/Logo/TASH_Logo.png and writes:

  public/favicon-16x16.png
  public/favicon-32x32.png
  public/apple-touch-icon.png
  public/favicon.ico        (multi-resolution: 16, 32, 48)
  public/og-image.jpg       (1200x630, brand-color background, logo centered)

The favicon variants use a transparent background so the logo's silhouette
shows in the browser tab. Apple touch icon uses the brand-color background
(#D1C7B5) because iOS does not support transparency on home-screen icons.

Run from the project root:
    python scripts/generate_favicons.py
"""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC_LOGO = ROOT / "eh_source_assets" / "Logo" / "TASH_Logo.png"
PUBLIC = ROOT / "public"

# Brand color from site.webmanifest theme_color
BRAND_BG = (209, 199, 181, 255)    # #D1C7B5 (canvas)
OG_BG = (209, 199, 181, 255)       # #D1C7B5


def load_logo() -> Image.Image:
    if not SRC_LOGO.exists():
        raise SystemExit(f"Missing source logo: {SRC_LOGO}")
    im = Image.open(SRC_LOGO)
    im = ImageOps.exif_transpose(im)
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    # Crop to the logo's non-transparent bounding box so it scales tightly.
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    return im


def fit_into(logo: Image.Image, canvas_size: tuple[int, int], scale: float) -> tuple[Image.Image, tuple[int, int]]:
    """Resize logo to fit `scale` of the smallest canvas dimension while preserving aspect."""
    target = int(min(canvas_size) * scale)
    w, h = logo.size
    longest = max(w, h)
    ratio = target / longest
    new_size = (max(1, round(w * ratio)), max(1, round(h * ratio)))
    resized = logo.resize(new_size, Image.LANCZOS)
    pos = ((canvas_size[0] - new_size[0]) // 2, (canvas_size[1] - new_size[1]) // 2)
    return resized, pos


def write_favicon(logo: Image.Image, size: int, dst: Path, *, background: tuple[int, int, int, int] | None) -> None:
    if background is None:
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    else:
        canvas = Image.new("RGBA", (size, size), background)
    resized, pos = fit_into(logo, (size, size), scale=0.86)
    canvas.alpha_composite(resized, dest=pos)
    canvas.save(dst, format="PNG", optimize=True)
    print(f"  wrote {dst.relative_to(ROOT)} ({size}x{size})")


def write_ico(logo: Image.Image, dst: Path) -> None:
    # Pillow's .ico writer takes a single image and a `sizes` kwarg.
    base_size = 256
    canvas = Image.new("RGBA", (base_size, base_size), (0, 0, 0, 0))
    resized, pos = fit_into(logo, (base_size, base_size), scale=0.86)
    canvas.alpha_composite(resized, dest=pos)
    canvas.save(dst, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"  wrote {dst.relative_to(ROOT)} (16,32,48)")


def write_og_image(logo: Image.Image, dst: Path) -> None:
    width, height = 1200, 630
    canvas = Image.new("RGBA", (width, height), OG_BG)
    resized, _ = fit_into(logo, (width, height), scale=0.40)
    pos = ((width - resized.size[0]) // 2, (height - resized.size[1]) // 2)
    canvas.alpha_composite(resized, dest=pos)
    # JPG can't carry alpha — flatten on the brand color.
    flattened = Image.new("RGB", (width, height), OG_BG[:3])
    flattened.paste(canvas.convert("RGB"))
    flattened.save(dst, format="JPEG", quality=90, optimize=True, progressive=True)
    print(f"  wrote {dst.relative_to(ROOT)} (1200x630)")


def main() -> None:
    logo = load_logo()
    print(f"loaded logo: {SRC_LOGO.relative_to(ROOT)} ({logo.size})")
    PUBLIC.mkdir(parents=True, exist_ok=True)
    write_favicon(logo, 16, PUBLIC / "favicon-16x16.png", background=None)
    write_favicon(logo, 32, PUBLIC / "favicon-32x32.png", background=None)
    write_favicon(logo, 180, PUBLIC / "apple-touch-icon.png", background=BRAND_BG)
    write_ico(logo, PUBLIC / "favicon.ico")
    write_og_image(logo, PUBLIC / "og-image.jpg")


if __name__ == "__main__":
    main()
