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
DUPLICATES = {'R3': 'X1'}  # R3 (review sweep) = X1 (checked with three TypeScript parsers): keep X1


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
    if v.startswith("can't confirm") or v.startswith('cannot confirm'):
        return "Can't confirm"
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
        new_entries += [e for e in split_entries(path.read_text()) if e[0] not in DUPLICATES]
    return groups, new_entries


def renumber(new_entries, start=59):
    """Number new entries P59, P60, ... most severe first (file order within a severity)."""
    new_entries = sorted(new_entries, key=lambda e: SEVERITY_ORDER.get(
        first_word(field(e[2], 'Severity'), list(SEVERITY_ORDER)), 9))
    mapping = {}
    for i, (tid, _, _) in enumerate(new_entries):
        mapping[tid] = f'P{start + i}'
    for dup, kept in DUPLICATES.items():
        if kept in mapping:
            mapping[dup] = mapping[kept]
    out = []
    for tid, title, body in new_entries:
        body = re.sub(r'\b([RMX]\d+)\b', lambda m: mapping.get(m.group(1), m.group(1)), body)
        out.append((mapping[tid], title, body))
    return out, mapping


LOCAL_PATHS = [
    (r'in `/home/user/nowa-build`', 'in 3.12.5 (`b84bfdafd`)'),
    (r'`/home/user/nowa-build`', '3.12.5 (`b84bfdafd`)'),
    (r'`/home/user/nowa-master`', '3.13.0 (`3cb32031c`)'),
]


def clean(body):
    """Replace local checkout paths with the commits they stand for."""
    for pattern, repl in LOCAL_PATHS:
        body = re.sub(pattern, repl, body)
    return body


def info(eid, title, body, group):
    body = clean(body)
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

def header(entries, counts, statuses, confidences):
    total = len(entries)
    sev = ', '.join(f"{counts.get(s, 0)} {s}" for s in SEVERITY_ORDER)
    critical = [e for e in entries if e['severity'] == 'Critical' and e['status'] != 'Fixed']
    fixed = statuses.get('Fixed', 0)
    fixed_note = (f" {fixed} {'is' if fixed == 1 else 'are'} already fixed in 3.13.0 and kept for the record."
                  if fixed else '')
    urgent = '; '.join(f"**{e['id']}** {e['title']}" for e in sorted(critical, key=lambda e: int(e['id'][1:])))
    return f"""# Nowa platform issues (3.13.0)

Problems in Nowa itself, found while the docs were rewritten for 3.13 (October 2026) and written up so an engineer
can fix them one at a time. Each one was re-checked in the 3.13.0 code and comes with steps to reproduce, the root
cause with code references, a suggested fix and, where it helps, a test to add.

**{total} issues:** {sev}. {confidences.get('Live', 0)} were reproduced in the running app,
{confidences.get('Code', 0)} are confirmed in the code, and {confidences.get('Reading only', 0)} come from code reading
only, so reproduce those before you change anything.{fixed_note}

**Most urgent (Critical):** {urgent}.

## How to read an entry

| Field | Values |
| --- | --- |
| **Severity** | **Critical**: work or data lost with no way back from inside Nowa (no undo, no warning first), a security exposure, or a core flow broken for everyone. **High**: a loss that Nowa's undo or a warning can avoid or reverse, generated code or dependencies that don't build, or a common flow broken with no easy workaround. **Medium**: broken or misleading, with a workaround. **Low**: cosmetic, a typo, a small UI glitch. |
| **Confidence** | **Reproduced live**: seen in the running 3.13.0 app (app.nowa.dev). **Confirmed in code**: the code path shows it beyond doubt. **Code reading only**: likely from the code, never run. |
| **Status** | **Present** in 3.13.0 and `dev`, **Fixed** (where), **Can't tell** (what's missing), or **Can't confirm** (a second check couldn't reproduce the cause; the entry says what would settle it). |
| **Code refs** | `path:line` from the root of this repo at `master` = 3.13.0 (`3cb32031c`). `dev` (`7c341f356`) is 6 commits ahead and only changes `lib/project/project_page.dart` and `packages/nowa_ui/lib/library/library_panel.dart`. |
| **Docs impact** | `docs/...` paths there are in the **nowaproj/docs** repo (branch `docs-rewrite` until its PR #18 merges), not in this repo's `docs/` folder. |
| **Sources** | `reviews/...`, `captures/...` and `_rewrite/...` files named under **Confidence** are the working notes in nowaproj/docs, under `_rewrite/` on the same branch. |

## Working on an issue

1. Reproduce it first, above all when its confidence is "Code reading only". If it doesn't reproduce, note why in
   the entry and move on.
2. Make the smallest fix the entry suggests, and add the test it names.
3. Line numbers are for `3cb32031c`; search for the quoted code if they have moved.
4. When the fix ships, update the docs page named under **Docs impact** (table at the end)."""

# Files for the nowa repo (docs/platform_issues/): one README with the tables, one file per area.
NOWA_FILES = [
    ('editor', 'Editor, designer, Library and widgets'),
    ('ai-play-publish-logic', 'AI, play and preview, publishing and builds, logic'),
    ('rest-data', 'REST API, Data Builder and forms'),
    ('supabase-firebase-stripe', 'Supabase, Firebase and Stripe'),
    ('git-code-integrations', 'Git, local projects, code and integrations'),
    ('account-app', 'Account, workspaces, security and app-wide'),
]
BATCH_FILE = {'Editor, designer and widgets': 'editor',
              'AI, play and shared preview, publishing, logic': 'ai-play-publish-logic',
              'REST API, Data Builder and forms': 'rest-data',
              'Supabase, Firebase and Firestore': 'supabase-firebase-stripe',
              'Git, deep links and other integrations': 'git-code-integrations'}
NEW_FILE = {}
for _file, _ids in {
    'editor': 'R7 R10 R11 R12 R22 R23 R24 R28 R29 R34 R35 R36 R37 M3 M9 M11 M12 M18 M19 M20',
    'ai-play-publish-logic': 'M2 M7 M14 M16 M17',
    'rest-data': 'R15 R16 R18 R25 R26',
    'supabase-firebase-stripe': 'R2 R3 R5 R19 R20 R21 R30 R31 X1',
    'git-code-integrations': 'R4 R6 R13 R14 R17 M4 M5 M6 M15 M21 M22 X2 X3',
    'account-app': 'R1 R8 R9 R27 M1 M8 M10 R32 R33 M13',
}.items():
    for _id in _ids.split():
        NEW_FILE[_id] = _file


def github_slug(heading):
    """GitHub's anchor for a Markdown heading."""
    s = re.sub(r'[`*_]', '', heading).strip().lower()
    s = re.sub(r'[^\w\- ]', '', s)
    return s.replace(' ', '-')


def write_nowa(all_entries, header_text, sections, temp_ids):
    out = HERE / 'nowa'
    out.mkdir(exist_ok=True)
    by_file = {f: [] for f, _ in NOWA_FILES}
    unplaced = []
    for e in all_entries:
        f = BATCH_FILE.get(e['group']) or NEW_FILE.get(temp_ids.get(e['id'], ''))
        if f is None:
            unplaced.append(e['id'])
            f = 'account-app'
        e['file'] = f
        by_file[f].append(e)

    def link(e):
        return f"[{e['id']}]({e['file']}.md#{github_slug(e['id'] + '. ' + e['title'])})"

    def sort_key(e):
        return (SEVERITY_ORDER.get(e['severity'], 9), int(e['id'][1:]))

    titles = dict(NOWA_FILES)
    for f, title in NOWA_FILES:
        entries = sorted(by_file[f], key=sort_key)
        body = '\n\n'.join(f"### {e['id']}. {e['title']}\n\n{e['body']}" for e in entries)
        (out / f'{f}.md').write_text(
            f"# {title}\n\nPart of [Nowa platform issues (3.13.0)](README.md): how to read an entry and the summary "
            f"tables are there. Entries are sorted by severity.\n\n{body}\n")

    fix_first = sorted([e for e in all_entries if e['severity'] in ('Critical', 'High') and e['status'] != 'Fixed'],
                       key=sort_key)
    rows = ['| Issue | What breaks | Area | Severity | Confidence |', '| --- | --- | --- | --- | --- |']
    rows += [f"| {link(e)} | {cell(e['title'])} | {titles[e['file']]} | {e['severity']} | {e['confidence']} |"
             for e in fix_first]
    fix = '## Fix first\n\nEvery Critical and High issue, most severe first.\n\n' + '\n'.join(rows)
    files = '## Files\n\n' + '\n'.join(
        f"- [{title}]({f}.md): {len(by_file[f])} issues" for f, title in NOWA_FILES)
    rows = ['| Issue | Title | Severity | Confidence | Status |', '| --- | --- | --- | --- | --- |']
    rows += [f"| {link(e)} | {cell(e['title'])} | {e['severity']} | {e['confidence']} | {e['status']} |"
             for e in sorted(all_entries, key=lambda e: int(e['id'][1:]))]
    alli = '## All issues\n\n' + '\n'.join(rows)
    rows = ['| Issue | Docs page and change after the fix |', '| --- | --- |']
    rows += [f"| {link(e)} | {cell(e['docs'])} |" for e in sorted(all_entries, key=lambda e: int(e['id'][1:]))
             if e['docs'] and not e['docs'].lower().startswith('none')]
    docs = ('## Docs to update after each fix\n\nPaths are in the nowaproj/docs repo.\n\n' + '\n'.join(rows))
    (out / 'README.md').write_text('\n\n'.join([header_text, files, fix, alli, docs]) + '\n')
    return unplaced


def main():
    groups, new_raw = load()
    new_entries, mapping = renumber(new_raw)

    def remap(body):
        return re.sub(r'\b([RMX]\d+)\b', lambda m: mapping.get(m.group(1), m.group(1)), body)

    groups = [(title, [(eid, t, remap(b)) for eid, t, b in entries], ok) for title, entries, ok in groups]
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
        body = '\n\n'.join(f'### {eid}. {t}\n\n{clean(b)}' for eid, t, b in entries)
        sections[slug] = f'## {title}\n\n{body}'
    sections['newly-found'] = '## Newly found\n\n' + '\n\n'.join(
        f'### {eid}. {t}\n\n{clean(b)}' for eid, t, b in sorted(new_entries, key=lambda e: int(e[0][1:])))

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

    sections['header'] = header(all_entries, counts, statuses, confidences)
    (out / 'header.md').write_text(sections['header'] + '\n')
    order = ['header', 'fix-first', 'all-issues'] + [slug for _, slug, _ in AREAS] + ['newly-found', 'docs-impact']
    (HERE / 'report.md').write_text('\n\n'.join(sections[k] for k in order) + '\n')
    temp_ids = {v: k for k, v in mapping.items() if k not in DUPLICATES}
    unplaced = write_nowa(all_entries, sections['header'], sections, temp_ids)
    if unplaced:
        print('not placed in an area file (put in account-app):', unplaced)
    problems = check_refs(all_entries)
    problems += [f"{e['id']}: local path left: {m}" for e in all_entries
                 for m in re.findall(r'/home/user\S*|/tmp/\S*|scratchpad\S*', e['body'])]
    (HERE / 'check.txt').write_text('\n'.join(problems) + '\n')
    print((HERE / 'counts.txt').read_text(), end='')
    print(f'code refs to check: {len(problems)} (check.txt)')


if __name__ == '__main__':
    main()
