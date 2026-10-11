#!/usr/bin/env python3
"""Merge a capture agent's log (captures/phase11/<name>.md) into the shared log and the request files.

Copies its `| id | file | alt text | checked |` rows into captures/log.md (skipping ids already logged with the same
file), and sets those ids to `captured` in captures/requests/W*.md. Its `| id | status |` rows set `not-possible: ...`.
Usage: python3 -I _rewrite/captures/tools/merge-phase-log.py _rewrite/captures/phase11/<name>.md   (from the repo root)
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
LOG = ROOT / '_rewrite' / 'captures' / 'log.md'
REQUESTS = sorted((ROOT / '_rewrite' / 'captures' / 'requests').glob('W*.md'))


def rows(text):
    for line in text.splitlines():
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if len(cells) >= 2 and re.fullmatch(r'[a-z0-9-]+', cells[0]) and cells[0] != 'id':
            yield cells


def set_status(capture_id, status):
    for path in REQUESTS:
        lines = path.read_text().splitlines()
        changed = False
        for i, line in enumerate(lines):
            if line.startswith(f'| {capture_id} |'):
                cells = line.rstrip().rstrip('|').split('|')
                cells[-1] = f' {status} '
                lines[i] = '|'.join(cells) + '|'
                changed = True
        if changed:
            path.write_text('\n'.join(lines) + '\n')
            return True
    return False


def main():
    src = pathlib.Path(sys.argv[1]).read_text()
    logged = LOG.read_text()
    added, statuses = 0, 0
    with LOG.open('a') as out:
        for cells in rows(src):
            if len(cells) >= 4 and cells[1].startswith(('/img/', '/videos/')):
                if f'| {cells[0]} | {cells[1]} |' not in logged:
                    out.write(f'| {cells[0]} | {cells[1]} | {cells[2]} | {cells[3]} |\n')
                    added += 1
                statuses += set_status(cells[0], 'captured')
            elif len(cells) >= 2 and cells[1].startswith('not-possible'):
                statuses += set_status(cells[0], cells[1])
    print(f'log rows added: {added}, request statuses set: {statuses}')


if __name__ == '__main__':
    main()
