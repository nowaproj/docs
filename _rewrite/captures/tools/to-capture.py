#!/usr/bin/env python3
"""Rebuild _rewrite/captures/to-capture.md from the capture placeholders still in the pages.

A placeholder is an invisible MDX comment, `{/* CAPTURE: id=<id> | state: ... | show: ... | crop: ... */}`, left where a
screenshot or video should go. embed.py replaces it once the capture is logged in captures/log.md. This script lists
the placeholders that are left, with the status and reason from the request files (captures/requests/W*.md), so the
list never drifts from the pages.

Usage: python3 -I _rewrite/captures/tools/to-capture.py   (run from the docs repo root, after embed.py)
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[3]
DOCS = ROOT / 'docs'
REQUESTS = ROOT / '_rewrite' / 'captures' / 'requests'
OUT = ROOT / '_rewrite' / 'captures' / 'to-capture.md'

PLACEHOLDER = re.compile(r'\{/\*\s*CAPTURE:\s*id=([a-z0-9-]+)(.*?)\*/\}', re.S)


def cell(text):
    return ' '.join(text.replace('|', '/').split())


def read_placeholders():
    found = []
    for page in sorted(DOCS.rglob('*.md*')):
        rel = page.relative_to(ROOT).as_posix()
        if rel.startswith(('docs/new/', 'docs/legacy/')):
            continue
        for match in PLACEHOLDER.finditer(page.read_text()):
            fields = {}
            for part in match.group(2).split(' | '):
                key, _, value = part.strip().partition(':')
                if value:
                    fields[key.strip()] = value.strip()
            found.append((match.group(1), rel, fields))
    return found


def read_requests():
    rows = {}
    for path in sorted(REQUESTS.glob('W*.md')):
        for line in path.read_text().splitlines():
            cells = [c.strip() for c in line.strip().strip('|').split('|')]
            if len(cells) >= 7 and re.fullmatch(r'[a-z0-9-]+', cells[0]) and cells[0] != 'id':
                rows.setdefault(cells[0], {'type': cells[-2], 'status': cells[-1]})
    return rows


def main():
    requests = read_requests()
    groups = {'not-possible': [], 'skipped': [], 'open': []}
    for capture_id, page, fields in read_placeholders():
        request = requests.get(capture_id, {})
        status = request.get('status', 'no request row')
        what = fields.get('show', '')
        if fields.get('state'):
            what = f"{what} (set-up: {fields['state']})"
        row = [capture_id, page, request.get('type', 'png'), cell(what)]
        if status.startswith('not-possible'):
            groups['not-possible'].append(row + [cell(status.partition(':')[2] or status)])
        elif status.startswith('skipped'):
            groups['skipped'].append(row)
        else:
            groups['open'].append(row + [cell(status)])

    total = sum(len(rows) for rows in groups.values())
    lines = [
        '# Still to capture',
        '',
        f'{total} screenshots or videos the pages still ask for. Each one is an invisible placeholder in its page,',
        '`{/* CAPTURE: id=... */}`, so readers never see it. This file is generated from those placeholders and the request',
        'files in `requests/` by `tools/to-capture.py`: take the capture, log it in `log.md`, run `tools/embed.py`, then run',
        '`tools/to-capture.py` again.',
        '',
        f"## Needs more than the test account allows ({len(groups['not-possible'])})",
        '',
        'These need a paid plan (Git integration, builds), a connected external account (Figma, Supabase, Firebase, GitHub),',
        'a deploy or a public project, which the capture rules for this rewrite forbid, or the desktop app, which a browser',
        'capture can\'t show.',
        '',
        '| id | page | type | what to capture | why it wasn\'t captured |',
        '|---|---|---|---|---|',
    ]
    lines += ['| ' + ' | '.join(row) + ' |' for row in groups['not-possible']]
    lines += [
        '',
        f"## Optional: skipped as low value ({len(groups['skipped'])})",
        '',
        'Possible in the playground, but each page already has a more useful screenshot (the capture runs took at most one',
        'or two per page). Take them only if a page needs more help.',
        '',
        '| id | page | type | what to capture |',
        '|---|---|---|---|',
    ]
    lines += ['| ' + ' | '.join(row) + ' |' for row in groups['skipped']]
    if groups['open']:
        lines += [
            '',
            f"## Not tried yet ({len(groups['open'])})",
            '',
            '| id | page | type | what to capture | status |',
            '|---|---|---|---|---|',
        ]
        lines += ['| ' + ' | '.join(row) + ' |' for row in groups['open']]
    OUT.write_text('\n'.join(lines) + '\n')
    print(f"to-capture.md: {total} placeholders ({len(groups['not-possible'])} not possible, "
          f"{len(groups['skipped'])} skipped, {len(groups['open'])} not tried)")


if __name__ == '__main__':
    main()
