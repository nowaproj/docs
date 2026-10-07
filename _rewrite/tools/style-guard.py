#!/usr/bin/env python3
"""Flag fact-bearing changes made by a wording-only pass.

Compares each docs page in the working tree with the same page at a git ref and lists, per page, what a
wording-only edit should never change: bold UI labels, inline code, link targets, explicit heading ids,
capture placeholders, badges, keyboard keys, images and videos, numbers, and the count of headings and steps.
A flagged item is not necessarily wrong (a label may have moved into a table, a duplicate may be removed),
but each one needs a look.

Usage (from the docs repo root):
  python3 -I _rewrite/tools/style-guard.py <git-ref> [docs sub-folder or file ...]
"""
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
DOCS = ROOT / 'docs'

PATTERNS = {
    'bold': re.compile(r'\*\*(.+?)\*\*'),
    'code': re.compile(r'`([^`\n]+)`'),
    'link': re.compile(r'\]\(([^)\s]+)\)|(?:to|href|src)="([^"]+)"'),
    'id': re.compile(r'\{#([\w-]+)\}|<Anchor id="([\w-]+)"'),
    'capture': re.compile(r'CAPTURE:\s*id=([a-z0-9-]+)'),
    'badge': re.compile(r'<Badge type="(\w+)"'),
    'kbd': re.compile(r'<kbd>(.+?)</kbd>'),
    'number': re.compile(r'(?<![\w.#/-])(\d+(?:[.,]\d+)*)(?![\w/-])'),
}
STEP = re.compile(r'^\s*\d+\.\s', re.M)
HEADING = re.compile(r'^#{2,6}\s', re.M)
LIST_MARKER = re.compile(r'^\s*\d+\.\s', re.M)


def extract(text):
    body = LIST_MARKER.sub('', text)
    found = {}
    for kind, pattern in PATTERNS.items():
        values = set()
        for match in pattern.finditer(body if kind == 'number' else text):
            value = next((g for g in match.groups() if g), None) if match.groups() else match.group(0)
            if value:
                values.add(value.strip())
        found[kind] = values
    found['steps'] = len(STEP.findall(text))
    found['headings'] = len(HEADING.findall(text))
    return found


def old_text(ref, rel):
    result = subprocess.run(['git', 'show', f'{ref}:docs/{rel}'], cwd=ROOT, capture_output=True, text=True)
    return result.stdout if result.returncode == 0 else None


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    ref = sys.argv[1]
    filters = [a.strip('/').removeprefix('docs/') for a in sys.argv[2:]]
    flagged = 0
    for page in sorted(DOCS.rglob('*.md*')):
        rel = page.relative_to(DOCS).as_posix()
        if rel.startswith(('new/', 'legacy/')):
            continue
        if filters and not any(rel == f or rel.startswith(f + '/') for f in filters):
            continue
        before_text = old_text(ref, rel)
        if before_text is None:
            print(f'## {rel}: new page since {ref}')
            continue
        after_text = page.read_text()
        if before_text == after_text:
            continue
        before, after = extract(before_text), extract(after_text)
        lines = []
        for kind in PATTERNS:
            removed = sorted(before[kind] - after[kind])
            added = sorted(after[kind] - before[kind])
            if removed:
                lines.append(f'  - {kind} removed: ' + ' | '.join(removed))
            if added:
                lines.append(f'  + {kind} added: ' + ' | '.join(added))
        for kind in ('steps', 'headings'):
            if before[kind] != after[kind]:
                lines.append(f'  ~ {kind}: {before[kind]} -> {after[kind]}')
        if lines:
            flagged += 1
            print(f'## {rel}')
            print('\n'.join(lines))
    print(f'\npages flagged: {flagged}')


if __name__ == '__main__':
    main()
