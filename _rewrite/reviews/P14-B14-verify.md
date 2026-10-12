# P14-B14 verify: reference pages (index, wrappers, shortcuts, glossary)

Verifier: P14-B14-V. Source of truth: `/home/user/nowa-master` (3.13.0, `3cb32031c`); Flutter framework doc comments in
`/home/user/flutter` (the text api.flutter.dev publishes). Code refs relative to `/home/user/nowa-master` unless they
start with `flutter/`.

Status: in progress.

## Build blocker fixed first (coordinator request)

| Item | Verdict | Source | Note |
|---|---|---|---|
| `glossary.md` front matter: bare `null` in `keywords` (index 32) parsed as a YAML null, Docusaurus error `"keywords[32]" must be a string` | fixed | coordinator report | Quoted as `"null"`. Re-parsed the front matter of all four batch pages with PyYAML (YAML 1.1, stricter than js-yaml: `yes`/`no`/`on`/`off` would also turn into booleans): every keyword is a string, no other bare special word (`yes`, `no`, `on`, `off`, `true`, `false`, `null`, `~`, numbers) on any of the four pages. |
