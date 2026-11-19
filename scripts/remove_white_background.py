# /// script
# requires-python = ">=3.9"
# dependencies = ["numpy", "Pillow"]
# ///
"""Make the white background of blog images transparent.

The site's paper-colored background makes images with pure white backgrounds
look like pasted-on rectangles. This script removes the white using the
"color to alpha" technique (as in GIMP): every pixel is treated as a blend of
some color over white, and the white part becomes transparency. Unlike simply
deleting white pixels, this keeps anti-aliased edges and soft shadows smooth.

Usage:

    # List the images that would be converted, without changing anything
    uv run scripts/remove_white_background.py --all --dry-run

    # Convert every referenced image with a white background
    uv run scripts/remove_white_background.py --all

    # Convert specific images
    uv run scripts/remove_white_background.py source/images/foo.png

PNGs are rewritten in place. JPEGs and GIFs can't hold an alpha channel, so
they are written as a new .png, references in the posts are updated, and the
original is deleted. Animated GIFs and images that already have transparency
are skipped. The originals remain in git history if you need them back.
"""

import argparse
import pathlib
import re
import sys

import numpy as np
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMAGES_DIR = ROOT / 'source' / 'images'
CONTENT_FILES = [*sorted(path for path in (ROOT / 'source' / 'posts').iterdir()
                         if path.suffix in ('.md', '.markdown')),
                 ROOT / 'source' / 'about.markdown']
EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif'}


def remove_white(rgb, tolerance):
    """Return an RGBA array with the white in `rgb` converted to alpha.

    Pixels within `tolerance` of pure white (on every channel) become fully
    transparent, which absorbs JPEG noise and off-white scanner backgrounds.
    """
    rgb = rgb.astype(np.float64)
    whitest = 255.0 - tolerance

    # Opacity is set by the channel furthest from white.
    alpha = (whitest - rgb.min(axis=-1)) / whitest
    alpha = np.clip(alpha, 0.0, 1.0)

    # Un-blend: solve  observed = alpha * color + (1 - alpha) * white.
    with np.errstate(divide='ignore', invalid='ignore'):
        color = 255.0 - (255.0 - rgb) / alpha[..., None]
    color = np.where(alpha[..., None] > 0, color, 0.0)

    rgba = np.dstack([np.clip(color, 0, 255), alpha * 255.0])
    return np.rint(rgba).astype(np.uint8)


def border_whiteness(rgb, tolerance):
    """Return the fraction of edge pixels that are (nearly) white."""
    white = rgb.min(axis=-1) >= 255 - max(tolerance, 10)
    edges = np.concatenate([white[0], white[-1], white[:, 0], white[:, -1]])
    return edges.mean()


def has_transparency(image):
    """Whether any pixel is actually transparent (many PNGs carry an alpha
    channel that is fully opaque)."""
    if image.mode not in ('RGBA', 'LA', 'PA') and 'transparency' not in image.info:
        return False
    return image.convert('RGBA').getchannel('A').getextrema()[0] < 255


def referenced_images():
    """Return the image files that some post (or the About page) uses."""
    content = '\n'.join(path.read_text() for path in CONTENT_FILES)
    return [path for path in sorted(IMAGES_DIR.iterdir())
            if path.suffix.lower() in EXTENSIONS and
            f'/images/{path.name}' in content]


def update_references(old_name, new_name):
    pattern = re.compile(re.escape(f'/images/{old_name}') + r'(?=[)"\'\s])')
    for path in CONTENT_FILES:
        text = path.read_text()
        updated = pattern.sub(f'/images/{new_name}', text)
        if updated != text:
            path.write_text(updated)
            print(f'    updated reference in {path.relative_to(ROOT)}')


def process(path, args):
    """Convert one image. Returns True if it was (or would be) converted."""
    with Image.open(path) as image:
        if getattr(image, 'n_frames', 1) > 1:
            print(f'skip  {path.name} (animated)')
            return False
        if has_transparency(image):
            print(f'skip  {path.name} (already has transparency)')
            return False
        rgb = np.asarray(image.convert('RGB'))

    whiteness = border_whiteness(rgb, args.tolerance)
    if whiteness < args.min_border:
        if args.verbose:
            print(f'skip  {path.name} (border only {whiteness:.0%} white)')
        return False

    target = path.with_suffix('.png')
    if target != path and target.exists():
        print(f'skip  {path.name} ({target.name} already exists)')
        return False

    rename = f' -> {target.name}' if target != path else ''
    print(f'{"would convert" if args.dry_run else "convert"}  '
          f'{path.name}{rename} (border {whiteness:.0%} white)')
    if args.dry_run:
        return True

    Image.fromarray(remove_white(rgb, args.tolerance), 'RGBA').save(
        target, optimize=True)
    if target != path:
        update_references(path.name, target.name)
        path.unlink()
    return True


def main():
    parser = argparse.ArgumentParser(
        description=__doc__.split('\n\n')[0],
        formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('images', nargs='*', type=pathlib.Path,
                        help='image files to convert')
    parser.add_argument('--all', action='store_true',
                        help='convert every image referenced by a post')
    parser.add_argument('--dry-run', action='store_true',
                        help="list what would change, but don't change it")
    parser.add_argument('--tolerance', type=int, default=6,
                        help='how far from pure white (0-255 per channel) '
                             'still counts as background (default: 6)')
    parser.add_argument('--min-border', type=float, default=0.95,
                        help='fraction of edge pixels that must be white '
                             'for an image to qualify (default: 0.95)')
    parser.add_argument('-v', '--verbose', action='store_true',
                        help='also report images skipped for not having a '
                             'white background')
    args = parser.parse_args()

    if not args.images and not args.all:
        parser.error('pass image paths, or --all')

    paths = referenced_images() if args.all else args.images
    converted = sum(process(path.resolve(), args) for path in paths)
    print(f'\n{"Would convert" if args.dry_run else "Converted"} '
          f'{converted} image(s).')


if __name__ == '__main__':
    sys.exit(main())
