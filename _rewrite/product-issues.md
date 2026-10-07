# Product issues found while documenting

Spotted in passing by research agents while reading the code. Not fixed here (docs-only change); listed for
the product team. "Verified" means the orchestrator re-checked it in the code.

| # | Where | Issue | Source | Verified |
|---|---|---|---|---|
| P1 | master (3.12.5) shortcuts sheet | Says "Open widget picker ⌘P", but ⌘P is Play and ⌘K opens the widget picker. Docs follow the real bindings. | 3.13 diff research | no |
| P2 | master (3.12.5) right-click menu | Shows ⌘] beside both "Move Up" and "Move Down"; real keys are ⌘[ and ⌘]. | 3.13 diff research | yes (W12 writer checked the code) |
| P3 | dev (3.13) | Cmd/Ctrl+B (board picker) appears to do nothing in code mode. | 3.13 diff research | no |
| P4 | dev (3.13) | "Create login page" walkthrough's "Group" step lost its highlight. | 3.13 diff research | no |
| P5 | dev (3.13) | Library filter label reads "Classs" instead of "Classes". | 3.13 diff research | no |
| P6 | master (3.12.5) `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:857` | Web View's `docUrl` starts with a space, so `Uri.parse` throws and its "Open Documentation." link does nothing. | redirects agent (tested with the Dart SDK) | yes (leading space seen in code) |
| P7 | master (3.12.5) `widgets_to_add.dart` | 32 widget `docUrl`s point at the old `/ui/widgets/widget-desc/<slug>` pages (14 were "Coming soon" stubs; `/switch` never existed). The docs now redirect them to `/reference/widgets#<slug>`; updating the URLs in the app would skip the redirect. | redirect mapping | yes |
| P8 | master (3.12.5) `deploy_button.dart:220,290` | The "Set up" button on the iOS row of the Deploy menu opens the Android tab. | W8 writer | yes (W8 verifier) |
| P9 | master (3.12.5) `download_code_button.dart:110-117` | On the web app, the code-download spinner never resets after the download. | W8 writer | yes (W8 verifier) |
| P10 | master (3.12.5) AI chat **Add context** → **Attach text file** | Reads the file with `dart:io`, which has no file path in a browser, so it likely does nothing in the web app. | W2 verifier | partly (code path read; not run) |
| P11 | master (3.12.5) AI checkpoints | The restore dialog says "Undo Last Request?" but restoring also undoes every later request in the session. | W2 verifier | yes (code) |
| P12 | master (3.12.5) AI connectors | The single **Auto-approve tools** switch (which also covers Supabase actions) is only reachable from the Figma menu. | W2 verifier | yes (code) |
| P13 | master (3.12.5) **Create Theme Setup** dialog | The dialog text names the wrong file paths. | W4 verifier | yes (code) |
| P14 | master (3.12.5) **Layout** section | The size dropdown offers **Expand** for a child of a Wrap, which Flutter rejects at runtime. | W4 verifier | partly (code; not run) |
| P15 | master (3.12.5) `packages/core/lib/src/fields/link_menu.dart:90-93` | The link menu on an event hides void-typed suggestions, so your own functions (which return nothing) never appear under LOCALS when you click an event's name. Workaround documented: add a node in the event's circuit. | W5 verifier | yes (code) |
| P16 | master (3.12.5) iOS deployment | An existing distribution certificate key (`.p12`) is read as UTF-8 text, which can fail for binary files. | W8 writer/verifier | partly (code) |
| P17 | master (3.12.5) Custom domain | A custom domain still pending verification has no remove action. | W8 writer/verifier | yes (code) |
| P18 | master (3.12.5) Route Settings | The route parameter **Default value** field has no handler (typing in it does nothing). | W6 verifier | yes (code) |
| P19 | master (3.12.5) Variables panel → **Globals** | **+** creates a global state variable that the Globals list then hides (it lists only final variables). | W6 verifier | yes (code) |
