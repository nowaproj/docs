#!/usr/bin/env python3
"""Assemble the platform issues report from the batch files in this folder.

Reads B*.md (re-checked P-entries) and S*.md (new entries with temporary IDs such as R1 or M1), renumbers the new
entries P59, P60, ... in file order, and writes:
  - report.md          the whole report (summary tables, entries by area, docs impact)
  - sections/*.md      one file per report section, for pasting into the doc one section at a time
  - check.txt          code references that don't resolve in /home/user/nowa-master (3.13.0) or are out of range

Usage: python3 -I _rewrite/platform-issues/assemble.py   (from the docs repo root)
"""
import pathlib
import re
import subprocess

HERE = pathlib.Path(__file__).resolve().parent
NOWA = pathlib.Path('/home/user/nowa-master')
DOCS_REPO = HERE.parents[1]

AREAS = [
    ('B1', 'editor', 'Editor, designer and widgets'),
    ('B2', 'ai-play-publish-logic', 'AI, play and shared preview, publishing, logic'),
    ('B3', 'rest-data', 'REST API, Data Builder and forms'),
    ('B4a', 'supabase-firebase', 'Supabase, Firebase and Firestore'),
    ('B4b', 'git-integrations', 'Git, deep links and other integrations'),
]
SEVERITY_ORDER = {'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3}
HEADING = re.compile(r'^### ([PRMX]\d+)\. (.+)$', re.M)


def split_entries(text):
    """Return [(id, title, body)] for each '### X<n>. Title' entry in a batch file."""
    marks = list(HEADING.finditer(text))
    entries = []
    for i, m in enumerate(marks):
        end = marks[i + 1].start() if i + 1 < len(marks) else len(text)
        entries.append((m.group(1), m.group(2).strip(), text[m.end():end].strip()))
    return entries


def field(body, name):
    m = re.search(r'^- \*\*' + re.escape(name) + r':\*\*\s*(.+)$', body, re.M)
    return m.group(1).strip() if m else ''


def first_word(value, choices, default='?'):
    for c in choices:
        if value.lower().startswith(c.lower()):
            return c
    return default


def short_status(value):
    v = value.lower()
    if v.startswith('present'):
        return 'Present'
    if v.startswith('fixed'):
        return 'Fixed'
    if v.startswith("can't tell") or v.startswith('cannot tell'):
        return "Can't tell"
    return value.split(' ')[0] if value else '?'


def short_confidence(value):
    v = value.lower()
    if v.startswith('reproduced live'):
        return 'Live'
    if v.startswith('confirmed in code'):
        return 'Code'
    if v.startswith('code reading only'):
        return 'Reading only'
    return value.split(' — ')[0] if value else '?'


def short_area(value):
    return re.sub(r'\s*\(`.*\)\s*$', '', value).strip()


def cell(text):
    return ' '.join(text.replace('|', '/').split())


def docs_impact(body):
    m = re.search(r'\*\*Docs impact\.\*\*\s*(.+?)(?:\n\n|\Z)', body, re.S)
    return ' '.join(m.group(1).split()) if m else ''


def load():
    """Return entries in report order: [(area_title, [entry dict])] plus the new entries."""
    groups = []
    for prefix, slug, title in AREAS:
        path = HERE / f'{prefix}-{slug}.md'
        entries = split_entries(path.read_text()) if path.exists() else []
        groups.append((title, entries, path.exists()))
    new_entries = []
    for path in sorted(HERE.glob('S*.md')):
        new_entries += split_entries(path.read_text())
    return groups, new_entries


def renumber(new_entries, start=59):
    mapping = {}
    for i, (tid, _, _) in enumerate(new_entries):
        mapping[tid] = f'P{start + i}'
    out = []
    for tid, title, body in new_entries:
        for old, new in mapping.items():
            body = re.sub(r'\b' + re.escape(old) + r'\b', new, body)
        out.append((mapping[tid], title, body))
    return out, mapping


def info(eid, title, body, group):
    return {
        'id': eid, 'title': title, 'body': body, 'group': group,
        'area': short_area(field(body, 'Area')),
        'severity': first_word(field(body, 'Severity'), list(SEVERITY_ORDER)),
        'confidence': short_confidence(field(body, 'Confidence')),
        'status': short_status(field(body, 'Status')),
        'docs': docs_impact(body),
    }


def anchor(eid):
    return eid.lower()


def check_refs(entries):
    """Report code refs that don't resolve to one file in the 3.13.0 tree, or point past its end."""
    files = subprocess.run(['git', '-C', str(NOWA), 'ls-files'], capture_output=True, text=True).stdout.split()
    by_name = {}
    for f in files:
        by_name.setdefault(f.rsplit('/', 1)[-1], []).append(f)
    lengths = {}
    problems = []
    ref = re.compile(r'`([\w./-]+\.(?:dart|yaml|json|plist|xml|gradle|kts|swift|kt|js|html|sh|arb)):(\d+)(?:-(\d+))?`')
    for e in entries:
        for m in ref.finditer(e['body']):
            path, a, b = m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))
            if path.startswith(('docs/', '~', '/')) or 'pub-cache' in path or re.match(r'[\w-]+-\d+\.\d+', path):
                continue
            candidates = [path] if (NOWA / path).is_file() else by_name.get(path.rsplit('/', 1)[-1], [])
            if len(candidates) != 1:
                if not (NOWA / path).is_file():
                    problems.append(f"{e['id']}: {path}:{m.group(2)} -> {'not found' if not candidates else 'ambiguous: ' + ', '.join(candidates[:4])}")
                continue
            target = candidates[0]
            if target not in lengths:
                lengths[target] = sum(1 for _ in (NOWA / target).open(errors='replace'))
            if b > lengths[target] or a > b:
                problems.append(f"{e['id']}: {path}:{m.group(2)}{'-' + m.group(3) if m.group(3) else ''} -> file has {lengths[target]} lines")
    return problems


def main():
    groups, new_raw = load()
    new_entries, mapping = renumber(new_raw)
    all_entries = []
    for title, entries, _ in groups:
        all_entries += [info(eid, t, body, title) for eid, t, body in entries]
    all_entries += [info(eid, t, body, 'Newly found') for eid, t, body in new_entries]

    def sort_key(e):
        return (SEVERITY_ORDER.get(e['severity'], 9), int(e['id'][1:]))

    fix_first = sorted([e for e in all_entries if e['severity'] in ('Critical', 'High') and e['status'] != 'Fixed'],
                       key=sort_key)
    sections = {}
    rows = ['| Issue | What breaks | Area | Severity | Confidence |', '| --- | --- | --- | --- | --- |']
    rows += [f"| {e['id']} | {cell(e['title'])} | {cell(e['area'])} | {e['severity']} | {e['confidence']} |"
             for e in fix_first]
    sections['fix-first'] = '## Fix first\n\n' + '\n'.join(rows)

    rows = ['| Issue | Title | Area | Severity | Confidence | Status |', '| --- | --- | --- | --- | --- | --- |']
    rows += [f"| {e['id']} | {cell(e['title'])} | {cell(e['area'])} | {e['severity']} | {e['confidence']} | {e['status']} |"
             for e in sorted(all_entries, key=lambda e: int(e['id'][1:]))]
    sections['all-issues'] = '## All issues\n\n' + '\n'.join(rows)

    for (title, entries, _), (prefix, slug, _) in zip(groups, AREAS):
        body = '\n\n'.join(f'### {eid}. {t}\n\n{b}' for eid, t, b in entries)
        sections[slug] = f'## {title}\n\n{body}'
    sections['newly-found'] = '## Newly found\n\n' + '\n\n'.join(f'### {eid}. {t}\n\n{b}' for eid, t, b in new_entries)

    rows = ['| Issue | Docs page and change after the fix |', '| --- | --- |']
    rows += [f"| {e['id']} | {cell(e['docs'])} |" for e in sorted(all_entries, key=lambda e: int(e['id'][1:]))
             if e['docs'] and not e['docs'].lower().startswith('none')]
    sections['docs-impact'] = '## Docs to update after each fix\n\n' + '\n'.join(rows)

    out = HERE / 'sections'
    out.mkdir(exist_ok=True)
    for name, text in sections.items():
        (out / f'{name}.md').write_text(text + '\n')

    counts = {}
    for e in all_entries:
        counts[e['severity']] = counts.get(e['severity'], 0) + 1
    statuses = {}
    for e in all_entries:
        statuses[e['status']] = statuses.get(e['status'], 0) + 1
    confidences = {}
    for e in all_entries:
        confidences[e['confidence']] = confidences.get(e['confidence'], 0) + 1
    (HERE / 'counts.txt').write_text(
        f"entries {len(all_entries)} (new {len(new_entries)}: {mapping})\n"
        f"severity {counts}\nstatus {statuses}\nconfidence {confidences}\n"
        f"missing batches {[t for t, _, ok in groups if not ok]}\n")

    order = ['fix-first', 'all-issues'] + [slug for _, slug, _ in AREAS] + ['newly-found', 'docs-impact']
    (HERE / 'report.md').write_text('\n\n'.join(sections[k] for k in order) + '\n')
    problems = check_refs(all_entries)
    (HERE / 'check.txt').write_text('\n'.join(problems) + '\n')
    print((HERE / 'counts.txt').read_text(), end='')
    print(f'code refs to check: {len(problems)} (check.txt)')


if __name__ == '__main__':
    main()
