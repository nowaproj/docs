#!/usr/bin/env python3
"""Embed captured images into the docs pages.

Reads the table in _rewrite/captures/log.md (| id | file | alt text | checked |) and replaces each matching
`{/* CAPTURE: id=<id> | ... */}` placeholder in docs/ with the image (or video) markup. Placeholders without a
logged capture are left in place (they are invisible MDX comments) and listed, so to-capture.md can be updated.

Usage: python3 -I _rewrite/captures/tools/embed.py [--dry-run]   (run from the docs repo root)
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
LOG = ROOT / '_rewrite' / 'captures' / 'log.md'
DOCS = ROOT / 'docs'
PLACEHOLDER = re.compile(r'\{/\*\s*CAPTURE:\s*id=([a-z0-9-]+)[^*]*\*/\}')


def read_log():
    captures = {}
    for line in LOG.read_text().splitlines():
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if len(cells) < 4 or cells[0] in ('id', '') or set(cells[0]) <= {'-'}:
            continue
        capture_id, path, alt, checked = cells[:4]
        if checked.lower().startswith('yes') and (path.startswith('/img/') or path.startswith('/videos/')):
            captures[capture_id] = (path, alt.replace('[', '(').replace(']', ')'))
    return captures


def markup(path, alt):
    if path.endswith('.mp4'):
        return ('<video controls playsInline preload="metadata" width="100%">\n'
                f'  <source src="{path}" type="video/mp4" />\n'
                '</video>')
    return f'![{alt}]({path})'


def main():
    dry_run = '--dry-run' in sys.argv
    captures = read_log()
    embedded, missing_file, remaining = [], [], []
    for page in sorted(DOCS.rglob('*.md*')):
        text = page.read_text()
        def replace(match):
            capture_id = match.group(1)
            if capture_id not in captures:
                remaining.append((capture_id, page.relative_to(ROOT)))
                return match.group(0)
            path, alt = captures[capture_id]
            if not (ROOT / 'static' / path.lstrip('/')).exists():
                missing_file.append((capture_id, path))
                return match.group(0)
            embedded.append((capture_id, page.relative_to(ROOT)))
            return markup(path, alt)
        new_text = PLACEHOLDER.sub(replace, text)
        if new_text != text and not dry_run:
            page.write_text(new_text)
    print(f'embedded: {len(embedded)}')
    for capture_id, page in embedded:
        print(f'  + {capture_id} -> {page}')
    if missing_file:
        print(f'logged but file missing: {len(missing_file)}')
        for capture_id, path in missing_file:
            print(f'  ! {capture_id} {path}')
    print(f'placeholders left: {len(remaining)}')
    for capture_id, page in remaining:
        print(f'  - {capture_id} ({page})')


if __name__ == '__main__':
    main()
