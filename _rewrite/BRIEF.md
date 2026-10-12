# Nowa docs rewrite: shared brief for every agent

Read this whole file before you start. It is the context you would otherwise lack.

## What Nowa is

Nowa (https://nowa.dev) is a visual Flutter app builder. It helps **non-developers build modern Flutter
apps in exact detail without learning Flutter**, by combining a **full AI agent** with **full visual
editing**, so they ship fast while understanding and controlling every part of the app. The output is
real Flutter/Dart code the user owns.

## The job

Rewrite the Nowa documentation (Docusaurus 3 site, served at https://docs.nowa.dev) so users see
up-to-date, well-structured, easy-to-read docs that cover everything they need to use Nowa the right way.
Only "What's New" (`docs/new/whats-new.md`) and the changelog (`docs/new/change-log.md`) are current.
Everything else in `docs/` is months or years out of date and poorly structured.

## Paths

| What | Path | Notes |
|---|---|---|
| Docs repo (this repo) | `/home/user/docs` | branch `docs-rewrite`. Docusaurus. Live pages are only under `docs/`. |
| Rewrite workspace | `/home/user/docs/_rewrite/` | plan, decisions, page list, research, reviews, captures |
| **Product code, released v3.12.5** | `/home/user/nowa-master` | `origin/master` @ b84bfdafd, released 25 Sep 2026, what app.nowa.dev runs. **Source of truth.** Read-only. |
| Product code, dev (v3.13.0 in progress) | `/home/user/nowa` | `origin/dev`, 54 commits ahead of master, unreleased. Read-only. Use only to note upcoming changes. |
| What's New / Changelog | `docs/new/whats-new.md`, `docs/new/change-log.md` | Current and accurate. Great source for feature names and recent behavior. Do not edit them. |

Product code layout (Flutter mono-repo, plugin architecture): `lib/` (app shell), `packages/core`
(projects, files, type system, interpreter, plugin infra, much UI), `packages/designer` (visual editor,
drag and drop), `packages/data` (Firebase, Supabase, REST APIs), `packages/code` (visual logic / circuit
editor), `packages/ai` (AI agent features), `packages/git_nowa` (Git), `packages/marketplace`,
`packages/device_preview`, `packages/device_frame`, `packages/tree_view`, `packages/nowa_ui` (design system),
`packages/command_palette`, `packages/context_menus`, `packages/nowa_run`, `packages/nowa_runtime`,
`packages/nowa_mobile_ads`, `packages/launcher_icon`, `packages/library_generator`. `packages/core` is huge
(~420k lines, much of it generated); search with `grep -rn` / ripgrep for UI strings rather than reading
everything. User-visible strings are usually literal `Text('...')`, `label:`, `tooltip:`, `title:`,
`hintText:` etc. Look for i18n/l10n files too.

## Non-negotiable rules

1. **The code is the source of truth.** Take feature names, UI labels, menu paths and steps from the code
   in `/home/user/nowa-master`. Quote labels exactly as the UI shows them (case included).
2. **Never invent** a feature, label, limit, number or price. If you cannot confirm something in the code,
   don't state it; record it as an open question instead.
3. **Cite code** in research and review notes as `path:line` relative to the repo root
   (e.g. `packages/designer/lib/src/foo.dart:120`), so others can re-check.
4. **Never modify the product repos** (`/home/user/nowa*`). Never commit or push anything in any repo:
   the orchestrator commits. Only write the files your task names.
5. **Never** deploy, buy, invite people, connect external accounts, or send AI prompts in the product,
   unless your task explicitly allots you prompts.
6. Write your results to the files your task names. End with a short final message (at most 15 lines):
   what you did, the files you wrote, and anything blocking. Do not paste file contents in the final message.

## Decisions already made (do not re-litigate)

IDs match `_rewrite/decisions.md` (the full log). The ones that matter most for your work:

- **D1 Source of truth** is `/home/user/nowa-master` (v3.12.5, released). Changes only on `dev` (v3.13)
  are logged in `_rewrite/upcoming-3.13.md`, not documented as current behavior.
- **D2 Scope**: document everything a user can reach in the released app. Mark gated features with a
  badge (**Beta**, **Enterprise**, **Desktop app**, **Local projects**, **Cloud projects**, ...) only where the
  code gates it. Internal, debug, developer-only and hidden-flag features are not documented; they are listed
  in `_rewrite/left-out.md` with the reason.
- **D3 Pricing**: no prices, credit amounts or plan limits in the docs. Link to https://nowa.dev/pricing.
  Say a feature needs a plan only where the code enforces it, naming the plan as the code does.
- **D4 Legacy tutorials**: the long tutorials and design courses (`docs/ui/design-courses/*`,
  `docs/tutorials-template/*`) move **untouched** into a clearly marked "Legacy tutorials" section.
  Only links that would otherwise break get fixed.
- **D5 Widget reference**: one catalog page listing every widget in the Widgets panel (from code), plus
  full pages only for widgets that need Nowa-specific setup.
- **D7 + D11** What's New and Changelog: wording untouched, URLs kept; only their links to removed pages are
  re-pointed to the new pages.
- **D8** Old unbuilt folders (`docsOld`, `docsold2`, `docsold3`, `archive`, `.history`, `static/old_versions`)
  stay untouched.
- **D13** Every docs URL the released app opens (44, incl. 3 anchors) must keep resolving (new page or
  widget-catalog anchor); old anchors are kept on new pages with explicit heading IDs (`## Title {#old-anchor}`).
- **Audience**: non-developers first. Explain Flutter concepts only as far as needed to use Nowa;
  power-user topics (custom code, Git, local projects) are covered but clearly separated.
