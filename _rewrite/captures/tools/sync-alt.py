#!/usr/bin/env python3
"""Refresh the alt text of embedded screenshots from the capture log.

When a screenshot is re-taken under the same file name, the page keeps the old alt text. The capture log
(_rewrite/captures/log.md, `| id | file | alt text | checked |`) holds the alt text written by whoever looked at the
current image, so this script copies it into every `![alt](file)` that embeds that file. Videos are skipped (their
alt cell describes placement, not the picture).

Usage: python3 -I _rewrite/captures/tools/sync-alt.py [--dry-run]   (run from the docs repo root)
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
LOG = ROOT / '_rewrite' / 'captures' / 'log.md'
DOCS = ROOT / 'docs'


def read_log():
    alts = {}
    for line in LOG.read_text().splitlines():
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if len(cells) < 4 or cells[0] in ('id', '') or set(cells[0]) <= {'-'}:
            continue
        _, path, alt, checked = cells[:4]
        if path.startswith('/img/') and checked.lower().startswith('yes'):
            alts[path] = alt.replace('[', '(').replace(']', ')')
    return alts


def main():
    dry_run = '--dry-run' in sys.argv
    alts = read_log()
    changed = 0
    for page in sorted(DOCS.rglob('*.md*')):
        rel = page.relative_to(DOCS).as_posix()
        if rel.startswith(('new/', 'legacy/')):
            continue
        text = page.read_text()

        def replace(match):
            nonlocal changed
            path = match.group(2)
            if path in alts and alts[path] != match.group(1):
                changed += 1
                print(f'{rel}: {path}')
                return f'![{alts[path]}]({path})'
            return match.group(0)

        new_text = re.sub(r'!\[([^\]]*)\]\((/img/[^)\s]+)\)', replace, text)
        if new_text != text and not dry_run:
            page.write_text(new_text)
    print(f'alt texts {"to update" if dry_run else "updated"}: {changed}')


if __name__ == '__main__':
    main()
