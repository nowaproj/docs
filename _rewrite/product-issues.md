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
| P20 | master (3.12.5) board | A Ctrl+mouse-wheel zoom with a large step breaks the board view, and the broken zoom is saved in the browser (localStorage), so it survives reloads. | capture agent (seen in the running app) | yes (observed) |
| P21 | master (3.12.5) playground starter | Switching the home screen's Group from Column to Row paints the screen gray with a status-bar "Canvas error ... preferredSize". | capture agent (seen in the running app) | yes (observed) |
| P22 | master (3.12.5) code sync | A top-level function or enum that Nowa fails to load may be dropped when Nowa rewrites the file after a visual edit (possible data loss). Needs a runtime check. | W9 verifier | no (code reading) |
| P23 | master (3.12.5) Supabase **Set up Backend** | Edge functions from a bundled backend are deployed with `verify_jwt: false`, so they accept calls without a signed-in user's token unless the function checks itself. Worth a security review. | W15 verifier | yes (code) |
| P24 | master (3.12.5) Supabase connect | The "No organizations found" message is never shown; the waiting dialog just stays open. | W15 verifier | yes (code) |
| P25 | master (3.12.5) Supabase **Query Templates** | Generated names mix styles for snake_case tables, e.g. `getAllUser_profiles`. | W15 verifier | yes (code) |
| P26 | master (3.12.5) Supabase backend setup **Fix with AI** | Sends a fixed prompt that doesn't include the actual failure. | W15 verifier | yes (code) |
| P27 | master (3.12.5) Git, local projects | **Revert Commit** only stages the reverse changes (no commit), while its dialog says it will "create a new commit". | W10 verifier (checked with libgit2) | yes |
| P28 | master (3.12.5) Git conflicts after **Bring my changes** | The Local/Remote panes are swapped in local projects, so **Accept Local** drops your own edits. Risk of lost work. | W10 verifier (checked with libgit2) | yes |
| P29 | master (3.12.5) Git conflicts | **Accept** may clear all remaining conflicts after the first file. | W10 verifier | no (code reading) |
| P30 | master (3.12.5) Git, local projects | Committing without a Git identity shows a raw error; the identity form only exists for cloud projects. | W10 verifier | yes (code) |
| P31 | master (3.12.5) Firebase **Authentication** → Google | The generated `signInWithGoogle()` doesn't compile against `google_sign_in` 7.x (checked against the 7.2.0 source), so Google sign-in through Firebase fails to build. High impact. | W16 verifier | yes (package source) |
| P32 | master (3.12.5) Firebase **Connect Apps** | After a failed Connect Apps the error state never resets; you must go back and pick the project again. | W16 verifier | yes (code) |
| P33 | master (3.12.5) Firebase **Disconnect Project** | Disconnecting leaves the `google_sign_in` package and `sendPasswordResetEmail()` behind. | W16 verifier | yes (code) |
| P34 | master (3.12.5) Firebase **Test Push Notifications** | An expired Google sign-in during the test turns into a full Firebase disconnect. | W16 verifier | yes (code) |
| P35 | master (3.12.5) REST request editor | **DOWNLOAD** is offered in the method dropdown but has no save path. | W14 verifier | yes (code) |
| P36 | master (3.12.5) REST request editor | An `x-www-form-urlencoded` body is saved as JSON text only (no form fields). | W14 verifier | yes (code) |
| P37 | master (3.12.5) API collection settings | Clearing or touching **Base URL** saves an empty string, and **Import from curl** then drops the host. | W14 verifier | yes (code) |
| P38 | master (3.12.5) custom code | `@CustomWidget` exists, but nothing uses its `preview` and it doesn't switch a widget to custom code (`ast_to_block_visitor.dart:586-596`, `declaration_hybrid.dart:182-230`), unlike `@CustomFunction`. | gap fixer | yes (code) |
