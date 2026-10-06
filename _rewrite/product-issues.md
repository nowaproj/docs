# Product issues found while documenting

Spotted in passing by research agents while reading the code. Not fixed here (docs-only change); listed for
the product team. "Verified" means the orchestrator re-checked it in the code.

| # | Where | Issue | Source | Verified |
|---|---|---|---|---|
| P1 | master (3.12.5) shortcuts sheet | Says "Open widget picker ⌘P", but ⌘P is Play and ⌘K opens the widget picker. Docs follow the real bindings. | 3.13 diff research | no |
| P2 | master (3.12.5) right-click menu | Shows ⌘] beside both "Move Up" and "Move Down"; real keys are ⌘[ and ⌘]. | 3.13 diff research | no |
| P3 | dev (3.13) | Cmd/Ctrl+B (board picker) appears to do nothing in code mode. | 3.13 diff research | no |
| P4 | dev (3.13) | "Create login page" walkthrough's "Group" step lost its highlight. | 3.13 diff research | no |
| P5 | dev (3.13) | Library filter label reads "Classs" instead of "Classes". | 3.13 diff research | no |
| P6 | master (3.12.5) `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:857` | Web View's `docUrl` starts with a space, so `Uri.parse` throws and its "Open Documentation." link does nothing. | redirects agent (tested with the Dart SDK) | yes (leading space seen in code) |
| P7 | master (3.12.5) `widgets_to_add.dart` | 32 widget `docUrl`s point at the old `/ui/widgets/widget-desc/<slug>` pages (14 were "Coming soon" stubs; `/switch` never existed). The docs now redirect them to `/reference/widgets#<slug>`; updating the URLs in the app would skip the redirect. | redirect mapping | yes |
