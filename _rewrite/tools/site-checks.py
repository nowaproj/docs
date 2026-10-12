#!/usr/bin/env python3
"""Pre-merge checks the Docusaurus build doesn't fully cover (phase 14).

1. Front matter: title/description/sidebar_label are strings, every keyword is a string (a bare `null`, `yes` or
   `no` in a YAML list breaks the build).
2. MDX hazards outside code: a bare `<word>` that isn't a known tag, and `{...}` that isn't `{#id}` or a comment.
3. With a build folder: every `#anchor` target in `redirects.js` and in the app's links exists on its page
   (old paths are followed through `redirects.js`, since the redirect pages forward the hash).

Usage (from the docs repo root):
  python3 -I _rewrite/tools/site-checks.py [build-folder]
"""
import glob
import os
import re
import sys

import yaml

OK_TAGS = {'kbd', 'Badge', 'Anchor', 'details', 'summary', 'br', 'img', 'video', 'source', 'Tabs', 'TabItem', 'div',
           'span', 'a', 'p', 'sup', 'sub', 'b', 'i', 'em', 'strong', 'code', 'ul', 'ol', 'li', 'table', 'tr', 'td',
           'th', 'thead', 'tbody', 'iframe', 'figure', 'figcaption', 'Link', 'section', 'small', 'pre', 'mark',
           'h1', 'h2', 'h3'}


def pages():
    for path in sorted(glob.glob('docs/**/*.md*', recursive=True)):
        if '/legacy/' not in path and '/new/' not in path:
            yield path


def check_front_matter():
    problems = 0
    for path in pages():
        text = open(path, encoding='utf-8').read()
        if not text.startswith('---'):
            continue
        try:
            data = yaml.safe_load(text.split('---')[1]) or {}
        except yaml.YAMLError as error:
            print(f'{path}: front matter YAML error: {error}')
            problems += 1
            continue
        for key in ('title', 'description', 'sidebar_label'):
            if key in data and not isinstance(data[key], str):
                print(f'{path}: {key} is not a string: {data[key]!r}')
                problems += 1
        for index, keyword in enumerate(data.get('keywords') or []):
            if not isinstance(keyword, str):
                print(f'{path}: keywords[{index}] is not a string: {keyword!r}')
                problems += 1
    return problems


def check_mdx():
    problems = 0
    for path in pages():
        in_front = in_fence = False
        for number, line in enumerate(open(path, encoding='utf-8').read().split('\n'), 1):
            if number == 1 and line.strip() == '---':
                in_front = True
                continue
            if in_front:
                in_front = line.strip() != '---'
                continue
            if line.strip().startswith('```'):
                in_fence = not in_fence
                continue
            if in_fence:
                continue
            bare = re.sub(r'`[^`]*`', '', line)
            for match in re.finditer(r'<\s*/?\s*([A-Za-z][\w.-]*)', bare):
                if match.group(1) not in OK_TAGS:
                    print(f'{path}:{number}: bare <{match.group(1)}>')
                    problems += 1
            rest = re.sub(r'\{#[\w-]+\}|\{/\*.*?\*/\}', '', bare)
            if re.search(r'[{}]', rest) and not re.search(r'<[A-Za-z]', rest):
                print(f'{path}:{number}: bare brace: {line.strip()[:120]}')
                problems += 1
    return problems


def check_anchors(build):
    source_text = open('redirects.js').read()
    redirects = {}
    for entry in re.findall(r'\{[^{}]*\}', source_text):
        found_from = re.search(r"from:\s*'([^']+)'", entry)
        found_to = re.search(r"to:\s*'([^']+)'", entry)
        if found_from and found_to:
            redirects[found_from.group(1)] = found_to.group(1)
    targets = set(re.findall(r"to:\s*'([^']+#[^']+)'", open('redirects.js').read()))
    for line in open('_rewrite/research/app-links.txt', encoding='utf-8'):
        line = line.strip().split('docs.nowa.dev')[-1]
        if line.startswith('/') and '#' in line:
            targets.add(line)
    problems = checked = 0
    for target in sorted(targets):
        path, anchor = target.split('#', 1)
        path = redirects.get(path, path).split('#')[0]
        html_path = os.path.join(build, path.strip('/') + '.html') if path.strip('/') else os.path.join(build, 'index.html')
        if not os.path.exists(html_path):
            print(f'{target}: no page at {path}')
            problems += 1
            continue
        checked += 1
        if f'id="{anchor}"' not in open(html_path, encoding='utf-8').read():
            print(f'{target}: no #{anchor} on {path}')
            problems += 1
    print(f'anchored targets checked: {checked}')
    return problems


def main():
    total = check_front_matter() + check_mdx()
    if len(sys.argv) > 1:
        total += check_anchors(sys.argv[1])
    print(f'problems: {total}')
    sys.exit(1 if total else 0)


if __name__ == '__main__':
    main()
