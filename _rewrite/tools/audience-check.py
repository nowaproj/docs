#!/usr/bin/env python3
"""List code-only details on pages written for non-developers (phase 14, D22).

Scans every docs page outside `docs/code/`, `docs/new/` and `docs/legacy/` for things the primary reader (no Flutter,
no code) shouldn't need: project file paths, Dart/YAML/Gradle/plist files, method calls, generated class names, Dart
keywords and internals, platform build files. A hit isn't always wrong (the UI may show that text, see P14-BRIEF.md
R3), but each one needs a look.

Usage (from the docs repo root):
  python3 -I _rewrite/tools/audience-check.py [docs sub-folder or file ...] [--summary]
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
DOCS = ROOT / 'docs'
SKIP = ('code/', 'new/', 'legacy/')

CHECKS = [
    ('path', re.compile(r'`[^`\n]*\b(?:lib|android|ios|macos|windows|linux|web|test|supabase)/[^`\n]*`')),
    ('file', re.compile(r'`[^`\n]*\.(?:dart|ya?ml|gradle|kts|plist|xml|entitlements|xcconfig|arb)`')),
    ('call', re.compile(r'`[A-Za-z_][\w.]*\([^`\n]*\)`')),
    ('class', re.compile(r'`[A-Z]\w*(?:Service|Provider|Notifier|Controller|Repository|Manager|Model|Activity)`')),
    ('dart', re.compile(r'`[^`\n]*\b(?:await|async|Future<|Stream<|final |const |void |class |extends|import |package:)[^`\n]*`')),
    ('internal', re.compile(r'ChangeNotifier|withConverter|fromJson|toJson|MainActivity|FlutterFragmentActivity|'
                            r'Info\.plist|build\.gradle|AndroidManifest|Runner\.entitlements|pubspec|\bmain\(\)|keytool|'
                            r'firebase_options|NowaGenerated|setState|BuildContext|Widget build')),
]


def scan(text):
    hits = []
    in_front = False
    for number, line in enumerate(text.splitlines(), 1):
        if number == 1 and line.strip() == '---':
            in_front = True
            continue
        if in_front:
            if line.strip() == '---':
                in_front = False
            continue
        for kind, pattern in CHECKS:
            for match in pattern.finditer(line):
                hits.append((number, kind, match.group(0)))
    return hits


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    summary = '--summary' in sys.argv
    filters = [a.strip('/').removeprefix('docs/') for a in args]
    total = 0
    for page in sorted(DOCS.rglob('*.md*')):
        rel = page.relative_to(DOCS).as_posix()
        if rel.startswith(SKIP):
            continue
        if filters and not any(rel == f or rel.startswith(f.rstrip('/') + '/') or rel.startswith(f) for f in filters):
            continue
        hits = scan(page.read_text())
        if not hits:
            continue
        total += len(hits)
        if summary:
            print(f'{len(hits):4d}  {rel}')
            continue
        print(f'## {rel} ({len(hits)})')
        for number, kind, text in hits:
            print(f'  {number:4d} {kind:8s} {text}')
    print(f'Total: {total}')


if __name__ == '__main__':
    main()
