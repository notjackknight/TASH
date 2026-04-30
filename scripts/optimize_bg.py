"""
One-shot image optimizer for section background images.

Reads raw source backgrounds from eh_public_assets/ (working dir, not served),
applies EXIF rotation, downscales, and writes optimized WebP into
public/eh_public_assets/ so Vite can serve them at /eh_public_assets/....

Two job kinds:

- "photo":  photographic background, e.g. a shot of a treatment room. Alpha
            is flattened to white, max side 2400px, quality 80.
- "tile":   seamless repeating pattern. Alpha is preserved (patterns often
            rely on it), max side 1200px, quality 82. Resolution is kept
            lower because tiles render small on-screen anyway — shipping
            them at 2400px wastes bandwidth without visible benefit.

Run from the project root:
    python scripts/optimize_bg.py
"""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "eh_source_assets"
DST = ROOT / "public" / "eh_public_assets"

# Each job: (kind, source relative path, destination relative path)
JOBS: list[tuple[str, str, str]] = [
    ("tile",  "backgrounds/tile_pattern.png",          "backgrounds/tile_pattern.webp"),
    ("tile",  "backgrounds/packages_bg.png",           "backgrounds/packages_bg.webp"),
    ("photo", "backgrounds/teeth_whitening_hero.jpg",  "backgrounds/teeth_whitening_hero.webp"),
    ("photo", "backgrounds/facials_hero.jpg",          "backgrounds/facials_hero.webp"),
    ("photo", "backgrounds/lashes_hero.jpg",           "backgrounds/lashes_hero.webp"),
    ("photo", "backgrounds/microneedling_hero.jpg",    "backgrounds/microneedling_hero.webp"),
    ("photo", "backgrounds/brows_hero.jpg",            "backgrounds/brows_hero.webp"),
    ("photo", "Haus_Packages/HP_BG_New.jpg",           "Haus_Packages/HP_BG_New.webp"),
    ("photo", "Haus_Packages/HP_BG_mobile.jpg",        "Haus_Packages/HP_BG_mobile.webp"),
    ("photo", "Haus_Packages/Brow_Lammy_Combos.png",   "Haus_Packages/Brow_Lammy_Combos.webp"),
    ("photo", "Logo/EH_Logo.png",                      "Logo/EH_Logo.webp"),
    ("photo", "backgrounds/greensboro_hero.png",       "backgrounds/greensboro_hero.webp"),
]

PHOTO_MAX = 2400
PHOTO_QUALITY = 80

TILE_MAX = 1200
TILE_QUALITY = 82

METHOD = 6  # slowest encoder, ~5% smaller output


def optimize(kind: str, src: Path, dst: Path) -> None:
    if not src.exists():
        print(f"  ! missing: {src}")
        return

    before = src.stat().st_size

    im = Image.open(src)
    im = ImageOps.exif_transpose(im)  # respect camera orientation

    if kind == "photo":
        # Photos: flatten alpha to white, no need for transparency.
        if im.mode in ("RGBA", "LA"):
            bg = Image.new("RGB", im.size, (255, 255, 255))
            bg.paste(im, mask=im.split()[-1])
            im = bg
        elif im.mode != "RGB":
            im = im.convert("RGB")
        max_side = PHOTO_MAX
        quality = PHOTO_QUALITY
    elif kind == "tile":
        # Tiles: keep alpha if present (patterns often use transparency).
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA")
        max_side = TILE_MAX
        quality = TILE_QUALITY
    else:
        raise ValueError(f"unknown job kind: {kind}")

    # Never upscale. Downscale so longest side <= max_side.
    w, h = im.size
    longest = max(w, h)
    if longest > max_side:
        scale = max_side / longest
        new_size = (round(w * scale), round(h * scale))
        im = im.resize(new_size, Image.LANCZOS)

    dst.parent.mkdir(parents=True, exist_ok=True)
    save_kwargs = {"format": "WEBP", "quality": quality, "method": METHOD}
    if kind == "tile" and im.mode == "RGBA":
        save_kwargs["lossless"] = False  # lossy even with alpha
    im.save(dst, **save_kwargs)

    after = dst.stat().st_size
    ratio = (1 - after / before) * 100
    print(
        f"  [{kind}] {src.name} "
        f"({before / 1024 / 1024:.1f} MB) "
        f"-> {dst.name} "
        f"({after / 1024:.0f} KB, -{ratio:.1f}%) "
        f"{im.size}"
    )


def main() -> None:
    print(f"src: {SRC}")
    print(f"dst: {DST}")
    for kind, src_rel, dst_rel in JOBS:
        optimize(kind, SRC / src_rel, DST / dst_rel)


if __name__ == "__main__":
    main()
