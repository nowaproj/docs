# Decisions log

Decisions made during the rewrite, newest last. "User" = answered by the user before the run; "Orchestrator" =
picked as the most reasonable option during the unattended run.

| ID | Date | Decision | Why | By |
|---|---|---|---|---|
| D1 | 2026-10-06 | Source of truth is `nowaproj/nowa` `origin/master` @ b84bfdafd (v3.12.5, released 25 Sep 2026). `dev` (v3.13.0, 54 commits ahead: Library panel replaces the Widgets panel, new top bar back/forward and board picker, menus moved to NMenu, files tree) is tracked in `_rewrite/upcoming-3.13.md`, not documented as current. | `master` is what web-build.yml deploys to app.nowa.dev and matches the current What's New (3.12.5). Documenting unreleased UI would mislead current users. | Orchestrator |
| D2 | 2026-10-06 | Document every feature a user can reach in the released app, with Beta / Enterprise / platform badges where the code gates it. Internal, debug and hidden-flag features go to `_rewrite/left-out.md`. | User answer ("Shipped + badges"). | User |
| D3 | 2026-10-06 | No prices, credit numbers or plan limits in the docs; link to nowa.dev/pricing; state a plan requirement only where the code enforces it. | User answer ("Link out"). | User |
| D4 | 2026-10-06 | Long tutorials and design courses move untouched into a "Legacy tutorials" section; only links that would break get fixed. | User answer ("Keep as legacy"). | User |
| D5 | 2026-10-06 | Widget reference = one catalog of every Widgets-panel widget + full pages only for widgets with Nowa-specific setup. | User answer ("Catalog + key pages"). | User |
| D6 | 2026-10-06 | Work on branch `docs-rewrite` from `origin/main`; never push to `main`. | User instruction. | User |
| D7 | 2026-10-06 | What's New and Changelog content untouched; they keep their URLs (`/new/whats-new`, `/new/change-log`). | They are the only current pages; keeping URLs avoids redirects. | Orchestrator |
| D8 | 2026-10-06 | Unbuilt legacy folders (`docsOld`, `docsold2`, `docsold3`, `archive`, `.history`, `static/old_versions`) are left untouched. | Not part of the built site; deleting is out of scope. | Orchestrator |
| D9 | 2026-10-06 | `NOWA_TEST_EMAIL` / `NOWA_TEST_PASSWORD` are not set in this session, so captures use `/playground` and public pages only; signed-in captures are listed in `_rewrite/captures/to-capture.md`. | Env vars only reach a new session; asking for a password in chat is not acceptable. | Orchestrator |
| D10 | 2026-10-06 | Screenshots in the app's default theme; docs in English only. | Site has a single `en` locale. | Orchestrator |
| D11 | 2026-10-06 | What's New and Changelog get **link-only** fixes: their 17 links to old pages are pointed at the new pages covering the same topic. No wording changes. | Otherwise removing old pages fails the build (`onBrokenLinks: 'throw'`); keeping 17 outdated pages alive would defeat the rewrite. Refines D7. | Orchestrator |
| D12 | 2026-10-06 | Remove the `src/theme/DocSidebarItem` overrides (they render `label="[object Object]"` on every sidebar link and the icon never shows); the new explicit `sidebars.js` doesn't use `customProps.icon`. Point the missing social card (`img/nowa_icon.png`) at an existing image. | Site bugs found by the inventory; tiny, safe fixes. | Orchestrator |
| D13 | 2026-10-06 | Every docs URL the released app opens (44, incl. 3 anchors) must resolve: to a new page, or to the widget's anchor in the widget catalog. Anchors are kept on new pages with explicit heading IDs. | The app links into the docs (`widgets_to_add.dart` `docUrl`, deploy/Git/local-setup dialogs); the docs repo can only redirect. | Orchestrator |
| D14 | 2026-10-06 | A usage limit stopped all running agents at ~02:30 UTC (reset 05:30; resumed 09:00 on the user's "Try again"). Writers and the widgets research were relaunched on Sonnet, saving each file as soon as it's drafted and relying on the code-cited research; verification against the code stays on Opus. | No pages had been saved; the limit is the binding constraint, and independent Opus verification still checks every claim against the code. | Orchestrator |
