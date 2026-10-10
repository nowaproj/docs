# S1: new issues found in the review logs

### R1. A service token for Nowa's feedback tables is hard-coded in the shipped client

- **Area:** Feedback and "Request a Widget" dialogs (`packages/core/lib/src/dialogs`)
- **Severity:** Critical — a live Airtable token is readable by anyone who opens the web app or unpacks a desktop build, and the tables it writes to receive signed-in users' email addresses.
- **Where:** both; cloud and local projects
- **Status:** Present in 3.13.0 and dev (also in 3.12.5; the token has been in the repo since `831944f37`, 16 Feb 2025)
- **Confidence:** Confirmed in code — found by `reviews/W13a-writer-notes.md` (line 225, "hard-coded credential"). The token's scopes can't be told from the repo, so how much it can read or change is unknown. The token is not copied here.

**What happens.** The dialogs that send feedback ("Request a Widget", "Request a Template", "Report Problem", suggestions) post straight from the app to Airtable. The base URL and a personal access token are default constructor arguments in Dart source, so they ship in every build.

**Steps to reproduce**
1. Open `packages/core/lib/src/dialogs/dialog_data_sender.dart`: lines 10-11 hold the endpoint and a `pat...` token as defaults.
2. In the editor open the widget picker dialog (for example a widget's **Replace with...**), click **Request a Widget**, type some text and click **Submit Request**. The request to `api.airtable.com` carries `Authorization: Bearer <token>` (not run).

Expected: no secret in the client; the app calls a Nowa endpoint that checks the signed-in user.
Actual: the secret is in the bundle and in git history.

**Root cause.** `DialogDataSender` defaults `endpoint` and `apiKey` (`dialog_data_sender.dart:7-12`); `sendData` (`:18-35`) sends them with each submission, plus the user's email (`:21`). Callers: `feedback_dialogs.dart:67,84,99`, `suggestion_dialog.dart:16`, `dialog_controller.dart:68`. **Request a Widget** is reachable from `packages/core/lib/src/widgets/widget_picker.dart:148-152`.

**Suggested fix.** Revoke and rotate the token first: deleting the line doesn't help, it is in history and in released builds. Send feedback to a Nowa backend endpoint that authenticates the user's session and keeps the Airtable credential server-side; remove the `apiKey` default and parameter. Check the rest of the repo and CI for other embedded secrets and add secret scanning.

**Docs impact.** None.

### R2. Stripe **Deploy Configuration** says "Deployed successfully!" even when its steps failed

- **Area:** Stripe integration (`packages/core/lib/src/integrations/stripe`, `packages/data/lib/src/supabase`)
- **Severity:** High — payments set-up can end half-done (no table, function or secret) while the person is told it worked.
- **Where:** both; cloud projects with Supabase
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code (the swallowed errors and the success message). That **Use Keys** makes the steps fail is inferred from the code, not run. Found by `reviews/W17-review.md` (Stripe: "Messages show progress" row, open issue 2) and `reviews/W15-review.md`.

**What happens.** The three server steps (apply migration, deploy edge function, save secret) go through a Supabase helper whose methods catch every error into a private `error` field and return normally. The Stripe service never reads that field. **Deploy Configuration** therefore ends with the green "Deployed successfully!" snackbar, and the **Secret Key** and **Webhook Secret** fields show their check mark after Enter, whatever happened.

**Steps to reproduce**
1. In a cloud project open the **Supabase** panel and connect with **Use Keys** (not **Connect**).
2. Gear (**Settings**) → **Integrations** → **Stripe**; turn on **Enabled**; fill **Publishable Key**; keep **One-Time**; pick a table, **ID Field**, **Amount Field** and a currency.
3. Type a key in **Secret Key** and press Enter; then click **Deploy Configuration**.

Expected: a red error under the button; no check mark.
Actual: a check mark and "Deployed successfully!". With **Use Keys** the migration, function deploy and secrets go through Nowa's Supabase proxy, which needs the grant that only **Connect** creates (inferred, not run). Any other failure (offline, Supabase error) ends the same way.

**Root cause.** `SupabaseOAuthManager.setSecret` (`packages/data/lib/src/supabase/supabase_oauth_manager.dart:125-146`), `deployEdgeFunction` (`:148-188`) and `applyMigration` (`:190-209`) end in `catch (e) { _error = e.toString(); }` and never rethrow. `StripeSupabaseService` owns its own instance (`stripe_supabase_service.dart:20`) and calls it without reading `error` (`:227-252`), so `deploy()` (`:374-427`) reaches `'Deployment successful!'` (`:419`) and `stripe_settings.dart:643-650` shows the snackbar whenever `deploymentError == null`. `saveSecret` (`:499-509`) would rethrow, but nothing is thrown, so `AsyncTextField` (`packages/core/lib/src/fields/nowa_fields.dart:1150-1263`) draws the check mark.

**Suggested fix.** Have the Stripe service check `_oauthManager.error` after each call and throw (or make the three methods rethrow behind a flag; other callers read `error`). Show the Stripe secret and deploy sections only when `isOAuthAuthenticated`. Add a service test with a fake manager whose calls set `error` (`packages/core/test/` has no Stripe tests yet).

**Docs impact.** `docs/integrations/stripe.md`: L13 (**Use Keys** isn't enough) and "Deploy the configuration" (L76, "Deployed successfully!" at the end, errors in red). After the fix say that each step's error shows under the button.

### R3. The `stripe-cancel-subscription` edge function is generated with invalid TypeScript

- **Area:** Stripe integration (`packages/core/lib/src/integrations/stripe`)
- **Severity:** High — with **Subscription** purchases, `cancelSubscription()` can't work, and the deploy still reports success (R2).
- **Where:** both; cloud projects with Supabase
- **Status:** Present in 3.13.0 and dev (same line in 3.12.5)
- **Confidence:** Confirmed in code (the line is a syntax error); the deploy result was not run. Found by `reviews/W17-review.md` and `reviews/W17-writer-notes.md` (Stripe open issue 1).

**What happens.** The cancel function's source contains `.order('created_at', ascending: false)`, a Dart-style named argument. In TypeScript the options must be an object, so the file doesn't parse and Supabase can't bundle it.

**Steps to reproduce**
1. **Settings** → **Integrations** → **Stripe** → **Enabled**; choose purchase type **Subscription**; click **Deploy Configuration**.
2. In the Supabase dashboard open **Edge Functions** → `stripe-cancel-subscription`, or call `StripePaymentService.cancelSubscription()` from a button in the app.

Expected: the function deploys and cancels at period end.
Actual: by the source, it can't be bundled; the deploy error is swallowed (R2). Not run.

**Root cause.** `packages/core/lib/src/integrations/stripe/stripe_edge_functions.dart:659`. Deployed at `services/stripe_supabase_service.dart:487-492`; the app-side call is generated at `:823-834`.

**Suggested fix.** `.order('created_at', { ascending: false })`. Add a test that scans every generated edge-function string for Dart-style named arguments, or run `deno check` over them in CI. Existing projects need a new **Deploy Configuration** to replace the function.

**Docs impact.** `docs/integrations/stripe.md`: the Subscription row of the function table (L84) and the `cancelSubscription()` row (L118).

### R4. **Delete** on a local project erases the folder of an imported repository

- **Area:** Dashboard projects (`lib/dashboard/dashboard_page.dart`, `packages/core/lib/src/providers/projects_view_provider.dart`)
- **Severity:** High — data loss: the user's own working tree, `.git` included, is deleted from disk and Nowa can't bring it back.
- **Where:** desktop app; local projects
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code, not run. Found by `reviews/W10-review.md` (open issue 12), `reviews/W10-writer-notes.md` and `reviews/W11-review.md` (**Delete** row).

**What happens.** A guard exists for a folder "inside a git repository": the dialog then reads "Remove "name" from Nowa?" and "The files stay on disk." But it applies only when the repository root is above the imported folder. A folder that is itself the repository root, the usual import, gets the plain "Are you sure you want to delete...? This action cannot be reversed." and the whole folder is erased. The dialog never mentions the folder. **Remove from list** sits in the same menu.

**Steps to reproduce**
1. Desktop app: arrow next to **New project** → **Import project**. **Browse** to a Flutter repository folder that holds `.git` and `pubspec.yaml`; under **Advanced** choose **Local-only project**; click **Import project**.
2. On the dashboard, open the project card's ⋮ menu → **Delete** → **Delete Project**.

Expected: like the nested-repository case, the files stay; or the dialog says the folder will be erased.
Actual: the folder and its `.git` are deleted.

**Root cause.** `LocalProjectService.addProject` stores `gitRoot: workspace.gitRoot == workspace.root ? null : workspace.gitRoot` (`packages/core/lib/src/services/local_project_service.dart:88`), so a repo-root import has `isInGitRepo == false` (`packages/core/lib/src/models/project.dart:189`). That flag is the only guard (`dashboard_page.dart:256-293`, `projects_view_provider.dart:95-101,278-289`). The delete itself, `NDirectory.removeProject`, is documented "not undoable" (`packages/core/lib/src/file_system/nfile_impl.dart:664-668`).

**Suggested fix.** Record on `Project` that it was imported (set in `addProject`) and treat it like `isInGitRepo`: only unlist. Or, for every local project, name the folder in the dialog ("This also deletes <path> from your disk") and rename the button. Test: `packages/core/test/local_project_service_test.dart` (import a repo-root folder, remove, assert the folder is still there).

**Docs impact.** `docs/account/projects.md` L96-101 and `docs/code/local-projects.md` L87-100 warn about this; update them with the fix.

### R5. Generated Google Pay code is fixed to Google's test environment, and each **Deploy Configuration** rewrites it

- **Area:** Stripe integration (`packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart`)
- **Severity:** Medium — Google Pay can't take real payments until `testEnv` is edited, and Nowa can revert the edit (and delete helper methods added to the class).
- **Where:** both; cloud projects
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code, not run. `testEnv: true` found by `reviews/W17-review.md` (Stripe open issue 4) and `reviews/W19-writer-notes.md`; the overwrite is my addition from reading `_addOrUpdateMembers`.

**What happens.** With **Google Pay** on, the generated `_initPaymentSheet` always contains `testEnv: true`; the docs tell people to change it before publishing. But every **Deploy Configuration** regenerates all members of `StripePaymentService`, including `_initPaymentSheet`, and removes members it didn't generate.

**Steps to reproduce**
1. **Settings** → **Integrations** → **Stripe** → **2. Payment Methods** → turn on **Google Pay** → **Deploy Configuration**.
2. In code mode open `lib/integrations/stripe_payment_service.dart`, change `testEnv: true` to `false`, save. Optionally add a helper method to the class.
3. Click **Deploy Configuration** again and reopen the file.

Expected: the edit and the helper stay.
Actual (from reading): `testEnv: true` is back; the helper is gone.

**Root cause.** The literal is at `stripe_supabase_service.dart:850`. `_updateServiceClass` (`:517-526`) calls `_addOrUpdateMembers` (`:530-566`): `_setMember` replaces every generated member and the loop at `:553-559` removes any member not in the generated set. `deploy()` calls it (`:394`).

**Suggested fix.** Make the environment a setting under **2. Payment Methods** (test by default) and generate `testEnv: <value>`; keep members Nowa didn't generate, and leave a member alone once it no longer matches the generated source. Test: generate the service twice with an edited member (`packages/core/test/`).

**Docs impact.** `docs/integrations/stripe.md`: the Google Pay bullet (L58) and L93 ("click **Deploy Configuration** again").

### R6. Packages: pressing Enter in a git or path package's **Version** cell replaces the dependency with an empty version

- **Area:** Packages settings (`packages/core/lib/src/settings/packages`)
- **Severity:** Medium — the dependency's `git:` or `path:` source is lost without a warning.
- **Where:** both; local projects (cloud projects read from code only)
- **Status:** Present in 3.13.0 and dev. New in 3.13.0: 3.12.5 didn't list git and path dependencies.
- **Confidence:** Confirmed in code, not run. Found by `reviews/W30b-writer-notes.md` ("Needs a live check" 4) and, for the **Fix** path, `reviews/W9-review.md` (open issue 8).

**What happens.** Since 3.13.0 **Packages** lists `git:` and `path:` dependencies with an empty **Version** cell. The cell is an editable field for every row; pressing Enter, even without typing, saves its text as the version, so `{git: ...}` becomes `''` in `pubspec.yaml` and Nowa runs `pub get`. Related: a dependency hosted at a custom URL isn't listed, Problems says "'x' is imported but is not in the pubspec." and **Fix** writes the pub.dev version over the entry (the docs already warn about this one).

**Steps to reproduce**
1. In a local project add to `pubspec.yaml` under `dependencies:` an entry `my_pkg:` with `git: https://github.com/example/my_pkg.git`; save.
2. **Settings** → **Packages**. Click the empty **Version** cell of `my_pkg` and press Enter.
3. Open `pubspec.yaml`.

Expected: unchanged.
Actual (from reading): `my_pkg: ''`.

**Root cause.** `package_service.dart:55-70` lists map-valued git and path dependencies as `DartPackage(name, "")`. `packages_settings.dart:375-378` calls `updateVersion` on `onEditingComplete`; `packages_provider.dart:49-53` → `PackageService.updatePackageVersion` (`package_service.dart:319-340`) → `PubspecManager.updatePackageVersion` (`pubspec_manager.dart:167-171`: `dependencies[package.name] = version`). The **Fix** path: `PackageProblemFinder` offers `addPackageByName` (`package_service.dart:422`) for a name that isn't in `installedPackages`.

**Suggested fix.** Draw the **Version** cell read-only (show "git" or "path") when the pubspec value is a map, and make `updatePackageVersion` return when the new version is empty or the current value is a map. Don't offer **Fix** for a name that has a map-valued pubspec entry. Test: `packages/core/test/dependencies_test.dart`.

**Docs impact.** `docs/code/packages.md`: the caution about the **Version** of a git or path package, and the **Fix** warning (L59).

### R7. The Library never checks the View Only role

- **Area:** Library panel (`lib/project/panels/library_panel/library_host.dart`)
- **Severity:** Medium — a **View Only** member is offered **Rename**, **Delete**, **Insert**, **Upload Assets...**, **Add** and drag-to-move. If the server doesn't refuse the writes, a viewer can change the project (High then).
- **Where:** both; cloud projects in a workspace
- **Status:** Present in 3.13.0 and dev. What the server does with the writes: can't tell.
- **Confidence:** Confirmed in code (no `isViewOnly` read in the Library), not run. Found by `reviews/W30c-writer-notes.md` ("P-W30c-2"); also `reviews/P10-c2-review.md` and `reviews/W30a-writer-notes.md`.

**What happens.** In 3.13.0 the Library replaced the Widgets panel and the Files tree in design mode. The Files tree, the code editor and several menus disable their edit actions for View Only; the Library doesn't.

**Steps to reproduce**
1. As owner invite a teammate as **View Only** (`docs/account/workspaces.md`); that member opens a cloud project of the workspace.
2. Open **Library** (second sidebar icon).
3. Right-click a screen row; open the header **Add** (+) menu.

Expected: edit actions disabled or hidden, as in **Files**.
Actual: **Rename**, **Delete**, **Insert**, **New Widget...**, **New Model...** and **Upload Assets...** are offered. Autosave runs for viewers too (`packages/core/lib/src/project/saving_service.dart:65-69`). Not run.

**Root cause.** `library_host.dart` builds its menu (`:161-170`), the **Add** menu (`:176-186`) and drag-to-move (`:245-263`) without `gProject.isViewOnly` (`packages/core/lib/src/providers/project_provider.dart:578`). Contrast `lib/project/panels/files_panel/files_tree_host.dart:34,41-45,445-462`, which nulls `startDrag`, `drop`, `add`, `rename` and menu entries for viewers. A grep finds `isViewOnly` read only in `setup_general_actions.dart`, `status_bar.dart`, the Files panel, `assets_panel.dart`, the Git commit menu, the designer board controller and tools, and the code editor, so check **Details**, **Themes** and the Variables panel too.

**Suggested fix.** Read `isViewOnly` in `LibraryHost`: hide **Add**, drop the `rename`, `delete`, `insert`, `upload` entries and `startDrag`/`drop`, and don't bind `RemoveFileAction` (`:299`). Confirm on the server that writes from viewers are refused. Test: a `LibraryHost` widget test with a viewer project.

**Docs impact.** `docs/account/workspaces.md` L90-97 ("the editor is read-only") is unproven for the Library; `docs/design/library.md` could say what a viewer sees.

### R8. The member role menu (**Make Owner**, **Remove member**) is offered to every member of a workspace

- **Area:** Workspace members (`packages/core/lib/src/settings/member_settings.dart`)
- **Severity:** Medium — non-owners are shown owner-only actions; whether the server rejects them can't be told.
- **Where:** both; cloud (workspaces)
- **Status:** Present in 3.13.0 and dev. Server behaviour: can't tell.
- **Confidence:** Confirmed in code, not run. Found by `reviews/W11-review.md` (workspaces "Open issues").

**What happens.** The workspace dialog passes `canEdit: isOwner` to each member row, but `MemberItem` never uses it, so every role badge opens the menu.

**Steps to reproduce**
1. Join a workspace as **Editor** or **View Only**.
2. On the dashboard click the workspace's gear to open its settings; under **Members** click another member's role badge.

Expected: no menu for a non-owner (the invite row and **Delete workspace** are already owner-only).
Actual: **Remove member** and **Make ...** items appear; picking one sends the request (`provider.onError` reports a failure).

**Root cause.** `lib/dashboard/side_bar/workspace_widgets.dart:418` passes `canEdit: isOwner`; `member_settings.dart:208-213` declares it; `:287-294` builds `RoleBadge(role: member.role, onMenu: provider.loading ? null : _onTap)` and ignores it.

**Suggested fix.** `onMenu: canEdit && !provider.loading ? _onTap : null`, keeping a self-service path for leaving. Confirm on the server that role changes by non-owners are refused. There are no member-settings tests nearby; add a small widget test.

**Docs impact.** `docs/account/workspaces.md` L69-77 (change roles) and L97.

### R9. Any 5xx answer from Nowa's servers sends a signed-in user to the sign-in page, and the maintenance screen can't be reached

- **Area:** Startup auth redirect (`lib/router.dart`)
- **Severity:** Medium — during an outage or maintenance people look signed out, and "Maintenance in Progress" never shows. On the web app neither error screen can show.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code, not run (needs an outage). Found by `reviews/W7-review.md` ("Product observations for `product-issues.md`").

**What happens.** The redirect picks `/server-error` or `/maintenance-mode` only when `dioError.error is SocketException`. That error type exists only when no HTTP response arrived (and never on the web), so an HTTP 502, 503 or 504 falls through to the last lines, which remember the address and send the user to `/signin`. The `statusCode == 503` branch can't run: a 503 has a response, hence no `SocketException`.

**Steps to reproduce**
1. Sign in to the web app, then make the request that loads the current user answer 503 (for example through a proxy that rewrites that response).
2. Reload the app.

Expected: "Maintenance in Progress" with the server's message.
Actual (from reading): the **Sign in** page.

**Root cause.** `lib/router.dart:87-105`: `statusCode = dioError.response?.statusCode ?? 500` (`:95`), the check `dioError.error is SocketException && statusCode >= 500` (`:96`), then `AuthRedirectManager.remember(...)` and `return '/signin'` (`:104-105`). `/no-internet` is also skipped on the web (`!kIsWeb`, `:89-92`).

**Suggested fix.** Decide on the status code first: 503 → `/maintenance-mode`; other 5xx or `DioExceptionType.connectionError` → `/server-error` (or `/no-internet`); sign-in only for 401/403. Pull the decision into a pure function and unit-test it (the root `test/` has no router tests yet).

**Docs impact.** `docs/troubleshooting/index.md` L155-157 ("We'll Be Right Back or Maintenance in Progress") describes screens that, today, rarely show.

### R10. App Bar, Floating Button, Bottom Navigation Bar and Drawer dragged from the Library land in the screen body, not their slot

- **Area:** Library drag and drop (`packages/designer/lib/src/design_experience`)
- **Severity:** Medium — the part becomes a loose widget in the body Stack, and a Bottom Navigation Bar then logs "Could not find index for navbar". Setting the slot in **Details** → **Screen** works.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live (3.13.0-79 playground, capture agent, `captures/ui-diffs-3.13.md`, read in `reviews/P10-a-review.md`, `reviews/P10-c2-review.md` and `reviews/W30c-writer-notes.md`) and confirmed in code.

**What happens.** A screen made from **Empty Page** has a full-size `Stack` as its body. While a part is dragged over the screen, the deepest drop target wins, so the Stack accepts the part and the Scaffold's slot rule is never used.

**Steps to reproduce**
1. Add a screen: **Library** header **Add** (+) → **New Widget...** → **Empty Page**.
2. Press Ctrl/Cmd+K, search **Bottom Navigation Bar** (or **Drawer**, **Floating Button**, **App Bar**) and drag the Built-in row onto the screen.

Expected: the part fills its Scaffold slot.
Actual: the Outline shows it as a free widget in the body, next to `appBar`; **Layout** shows **L** and **T**; the status bar reads "Could not find index for navbar: ...".

**Root cause.** `ScaffoldRule` (`drag_rule.dart:396-436`) maps the four classes to their slots and marks them opaque, but `DeepHostWidgetFinder` (`move_tool.dart:340-394`) keeps the last opaque candidate, which is the body `Stack` (`StackRule`, `drag_rule.dart:217`; `empty_page.dart:23`). The message is a `logInfo` at `packages/designer/lib/src/details/navbar_field.dart:159`.

**Suggested fix.** When the dragged widget is one of the four slot classes, resolve the host to the nearest Scaffold ancestor before the deeper opaque Stack. Test: `packages/designer/test/move_test.dart`.

**Docs impact.** `docs/design/screens.md`, `docs/design/select-and-edit.md` ("Where a dragged widget lands"), `docs/reference/widgets/navigation.md` (Add a screen part) and `docs/reference/widgets/index.md` now tell readers to use the slot; revert when fixed.

### R11. In the Library, Enter after a search can insert a package widget instead of Nowa's own (`button` gives `CustomButton`)

- **Area:** Library search (`packages/nowa_ui/lib/library/library_panel.dart`)
- **Severity:** Medium — the main flow (Ctrl/Cmd+K, type a name, Enter) can place the wrong widget with no sign until you look at the board.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live (3.13.0-79 playground, `reviews/P10-live-fixes.md` finding 8, from the capture agent's ui-diffs) and confirmed in code. Also noted in `reviews/W30a-writer-notes.md` ("Where the code differs", item 2).

**What happens.** Results are grouped in the order Project, Packages, Built-in, Assets. The highlighted result, which Enter takes, is the first row of the first non-empty group. A new project's `nowa_runtime` package contributes `CustomButton`, which comes before Nowa's own **Button** (Built-in).

**Steps to reproduce**
1. Open a new Starter project.
2. Press Ctrl/Cmd+K (the search reads **Add...**), type `button`, press Enter.

Expected: Nowa's **Button**.
Actual: **CustomButton** (group **Packages**, from `nowa_runtime`). One ↓ first reaches the Built-in **Button**.

**Root cause.** The order of `LibrarySource` (`library_contract.dart:36`) sets the groups (`library_panel.dart:258-270`); `_rank` (`:394-397`) only orders inside a group; `_firstSymbolRow` (`:614-619`) and `_onSearchKey` (`:636-643`) take the first row.

**Suggested fix.** Rank across groups (Nowa's picks and exact or prefix matches first), or list Built-in before Packages. Test: a `LibraryPanel` widget test (`packages/nowa_ui` has no `test/` folder yet; `packages/core/test/library/` is the nearest).

**Docs impact.** `docs/design/add-widgets.md`, `docs/design/library.md`, `docs/reference/widgets/index.md` and six more pages say "check the highlighted result" because of this; drop the caveat after the fix.

### R12. **New Model...** and **New Global State...** in the Library create the file but show nothing

- **Area:** Library (`lib/project/panels/library_panel/library_host.dart`, `packages/nowa_ui/lib/library/library_contract.dart`)
- **Severity:** Medium — the action looks as if it did nothing, and nothing opens or selects the new item.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live (3.13.0-79 playground, `reviews/P10-live-checks.md` item 6) and confirmed in code. Also seen by `reviews/W30c-writer-notes.md` and `reviews/W30b-writer-notes.md` ("Needs a live check" 6).

**What happens.** The Library's default **Filter** is **Widgets** (screens, components, widgets). Creating a model or global state succeeds, but neither is listed and the editor doesn't open the new file.

**Steps to reproduce**
1. **Library** → header **Add** (+) → **New Model...**; name it `Product`; submit.
2. Look at the Library.

Expected: the model is listed and selected, or its file opens.
Actual: only screens show. **Filter** → **Models** or **Everything** lists `models` → `Product`. **New Global State...** behaves the same.

**Root cause.** `library_contract.dart:223-226` (`kinds = widgets`). `library_host.dart:182` calls `addToLibraryEntries(_scoped, _files)` without `onAdd`, and `add_lib_menu.dart:18-33` reveals or opens a new file only through `onAdd` (**New Widget...** opens its own file, `:37-47`).

**Suggested fix.** Pass an `onAdd` that widens the filter to the new kind, selects the row and opens the file. Test: a `LibraryHost` widget test.

**Docs impact.** `docs/logic/models.md`, `docs/logic/global-state.md`, `docs/code/files.md` (L46) and `docs/design/library.md` tell readers to change **Filter** first.

### R13. In a local project, the "You need to provide authentication for this action" popup saves credentials where local Git never looks

- **Area:** Git panel (`lib/project/panels/git_panel/git_details.dart`, `packages/core/lib/src/settings/git_settings.dart`)
- **Severity:** Medium — the person adds a token, the retry fails the same way, and nothing says why.
- **Where:** desktop app; local projects
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code, not run. Found by `reviews/W10-review.md` (open issue 5) and `reviews/W10-writer-notes.md` (open question 2).

**What happens.** When a push or pull from the commit-box button needs credentials (libgit2: "remote authentication required but no callback set"), the popup embeds **Legacy Remote Credentials**, the cloud form, which stores credentials with Nowa's server Git service. A local project reads the device's own store (**External Local Credentials**), so the retry still has none.

**Steps to reproduce**
1. In a local project whose remote needs HTTPS credentials, make sure **Settings** → **Git** → **External Local Credentials** is empty.
2. In the **Git** panel click the commit-box button (**Sync** or **Publish Branch**).
3. In the popup click **Add Credentials**, enter a username and token, and save.

Expected: the retry uses them.
Actual (from reading): the retry runs with no credentials and fails again.

**Root cause.** `git_details.dart:641-645` shows `FixNoRemoteAuthPopup` (`:1383-1400`) for every project kind. It embeds `RemoteGitCredentialsSettings` (`git_settings.dart:221-325`), which uses `locator.get<GitService>()` (`:231`, registered as `NetworkGitService`, `packages/core/lib/src/services/locator.dart:38`) and `GitCredentialsPopup(isLocal: false)` (`:257`). Local credentials live in `LocalGitServiceImpl` (`packages/git_nowa/lib/src/local/local_git_service.dart:290-303,352-357`). `findGitService(isLocal)` already exists (`git_utils.dart:5`) and `GitCredentialsTile` uses it (`git_settings.dart:343`).

**Suggested fix.** For local projects show the **External Local Credentials** form (or open **Settings** → **Git**) in `FixNoRemoteAuthPopup`. Test: `packages/git_nowa/test/` or a widget test.

**Docs impact.** `docs/code/git.md` and `docs/code/github.md` already send local users to **External Local Credentials**; no change needed.

### R14. **Revert commit** and **Undo commit** report success when Nowa did nothing

- **Area:** Git panel, Commit History (`lib/project/panels/git_panel/git_commit_actions.dart`, `packages/git_nowa/lib/src/git_manager.dart`)
- **Severity:** Medium — a green "Commit reverted successfully." appears for an operation that was skipped silently.
- **Where:** both; cloud and local projects
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code, not run. Found by `reviews/W10-writer-notes.md` (open question 1) and `reviews/W10-review.md` (git.md rows).

**What happens.** With uncommitted changes in the working tree both operations return at once without a message, and the action still shows its success snackbar. The menu entries stay enabled.

**Steps to reproduce**
1. Change a file so the **Git** panel lists a change.
2. Open Commit History, right-click the latest commit → **Undo commit** → **Undo Commit** (or any commit → **Revert commit** → **Revert Commit**).

Expected: a message to commit or discard first, or disabled entries.
Actual: a green "Commit undone, changes moved to staging area." or "Commit reverted successfully."; nothing changed.

**Root cause.** `git_manager.dart:806-807` and `:817-818` start with `if (repo.localChanges.isNotEmpty) return;`. `git_commit_actions.dart:34-40` and `:71-77` show the snackbar after the call regardless. `commitMenuEntries` (`git_commit_context_menu.dart:9-33`) enables the entries from commit properties only.

**Suggested fix.** Throw a typed exception (or return a bool) and show an error snackbar ("Commit or discard your changes first"); disable the entries while `localChanges` is not empty. Test: `packages/git_nowa/test/git_nowa_test.dart`.

**Docs impact.** `docs/code/git.md` already says they do nothing with uncommitted changes "even if a success message appears"; remove that clause after the fix. Related: P27 (local **Revert Commit** creates no commit).

### R15. Linking a list item's text to `element.title` logs "Canvas error: NoSuchMethodError: method not found: 'charCodeAt'"

- **Area:** Data Builder on the board (`packages/designer/lib/src/error_boundary.dart` logs it; the failing call isn't traced)
- **Severity:** Medium — an error stays in the status bar (error count 1) in the main "show data" flow; the board still drew the placeholder text.
- **Where:** web app (seen); desktop not run
- **Status:** Present in 3.13.0 (seen on v3.13.0-79); dev not run
- **Confidence:** Reproduced live — `reviews/P10-live-data-pages.md` ("Other observations"). Root cause not traced from the repo.

**What happens.** After the item's Text is linked to `element` → `title`, the status bar shows "Canvas error: NoSuchMethodError: method not found: 'charCodeAt' (n.charCodeAt is not a func..." and the error count goes to 1. The board shows `[title]` in all three items.

**Steps to reproduce**
1. Starter app (playground): **Api** panel → **+** → **New Collection** with a base URL such as `https://jsonplaceholder.typicode.com`; hover it → **+** → **New Request**, `getTodos`, path `/todos`; **Test** → **Run Test** → **Generate Model** → **Next** → **Next** → **Save**.
2. Add a **List View** from the Library; **Add Wrapper** → **Data Builder**; **Source** → **API Request**; **API** → pick `getTodos()`; in the List View click **List** → **Connect** → `data`.
3. Select the item's **Text**; click its **Text** label → **LOCALS** → `element` → `title`.

Expected: no error.
Actual: the status bar message above and one error in the counter.

**Root cause.** Not found. `CanvasErrorBoundary` logs the first frame error with 12 stack frames (`error_boundary.dart:104-106`) and retries once (`:108-117`), which probably explains why the board recovered. In dart2js, `charCodeAt` points at a string method (`codeUnitAt`, `hashCode`) called on a value that isn't a string; a mock object reaching a `Text.data` slot would fit (`packages/core/lib/src/interpreter/mock.dart`). The status bar cuts the message; the **Console** log holds the frames.

**Suggested fix.** Reproduce in a debug build (the boundary also dumps every error to the console in debug, `:98`), read the 12 frames, and fix the mock for the linked `element.title`. Add a regression test next to `packages/data/test/loading_fake_data_test.dart`.

**Docs impact.** None today; `docs/integrations/show-data.md` ("See it on the board and in Play") is right as written.

### R16. The board calls the real API for a request that has no **Model**, including POST, PUT and DELETE

- **Area:** Data Builder, board preview (`packages/core/lib/src/interpreter/block_tree.dart`, `mock.dart`)
- **Severity:** Medium — drawing or editing a screen can send write requests to a backend.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live for a GET request without a model (the Error Builder showed a `DioException`; `reviews/P10-live-data-pages.md`, table row `show-data L70`). The POST or DELETE case is from reading the same path. First noted by `reviews/W14-review.md` (open issue 4) and `reviews/W14-writer-notes.md`.

**What happens.** In designer mode a call that returns a `Future` is replaced by a mock built from its return type. A request with a **Model** returns a model and is mocked (placeholders such as `[title]`). One without returns Dio's `Response`, which can't be mocked, so the real call runs, again on every board rebuild.

**Steps to reproduce**
1. **Api** panel → a collection with a base URL → **New Request**; set the method to **POST** (or **DELETE**); don't generate a model.
2. Library: add a List View → **Add Wrapper** → **Data Builder** → **Source** → **API Request** → pick the request.
3. Watch your server log or the browser's network tab while the board draws.

Expected: no call from the board.
Actual: the request is sent (seen for GET).

**Root cause.** `BlockExpr.tryMock` (`block_tree.dart:790-812`) asks `Mock.tryMockExpr` for `Future` types; for `Response` the mock fails with an `UnsupportedError` and returns null (`mock.dart:195-212`), and the code falls through to `runner.call(scope)`.

**Suggested fix.** In designer mode never run API request functions: return a mock `Response` (a `MockLibraryObject` for Dio's `Response`) or have generated request functions short-circuit when `scope.env?.mode == RunMode.designer`. Test: next to `packages/data/test/loading_fake_data_test.dart`.

**Docs impact.** `docs/integrations/show-data.md` L70 says only that "a request that has a **Model** isn't called"; add the case without a model until it is fixed.

### R17. Turning on **Deep Links** switches off Flutter's own link handling and generates nothing to replace it

- **Area:** Deep Links integration (`packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart`)
- **Severity:** Medium — in a go_router app links open the app at its first screen instead of the screen they name, unless the person writes the handler.
- **Where:** both (Android and iOS builds)
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code (the written files, and a grep for any link listener), not run on a device. Found by `reviews/W17-writer-notes.md` (Deep Links notes) and `reviews/W17-review.md`; the contrast with the Router panel is my addition. Related: P39, P40, P42.

**What happens.** Enabling the integration writes `FlutterDeepLinkingEnabled` `<false/>` (iOS `Info.plist`) and `flutter_deeplinking_enabled` `false` (Android manifest), which Nowa's own comment calls "Flutter's default deep linking". It adds the `app_links` package but no code that reads an incoming link (a grep finds no `AppLinks` or `uriLinkStream` outside the config). The Router panel, meanwhile, lists "Deep Linking: Built-in support for deep links" as a go_router benefit.

**Steps to reproduce**
1. In a go_router project give a screen a route **Path** (**Details** → **Route Settings**).
2. **Settings** → **Integrations** → **Deep Links** → **Enabled**; **URL Scheme** `myapp`; submit.
3. Open `ios/Runner/Info.plist`: `FlutterDeepLinkingEnabled` is `<false/>`.
4. Run on a device and open `myapp://open.my.app/<that path>`.

Expected: the screen of that path opens.
Actual (from reading): the app opens at its initial route.

**Root cause.** `packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart:18-27,58-66` (the two static opt-out tokens and their templates); no listener anywhere; `packages/core/lib/src/editors/router_editor/router_migration_editor.dart:104` (the go_router "built-in" claim).

**Suggested fix.** Don't write the opt-out flags until generated code listens to links, or generate that code: a service using `AppLinks().uriLinkStream` that calls the router, added to `main()` through a `MainStatement` like RevenueCat's (`revenuecat_package_config.dart:55-61`). Also drop the fixed `android:host="open.my.app"` (`:91`), see P42. Test: a config test in `packages/core/test/`.

**Docs impact.** `docs/integrations/deep-links.md` ("Turn on deep links" note about switching off built-in handling, and "Handle the link in your app"), `docs/logic/router.md` (go_router "built in" deep linking).

### R18. The **Dropdown menu** **Value** row edits `value`, but the widget's selected item is `initialValue`

- **Area:** Details for forms (`packages/core/lib/src/fields/form_fields.dart`)
- **Severity:** Medium — the **Value** control may do nothing, or write an argument the widget doesn't have and make **Problems** report it.
- **Where:** both
- **Status:** Can't tell — the mismatch is Present in 3.13.0 and dev; the runtime effect wasn't run.
- **Confidence:** Code reading only. Found by `reviews/W13b-writer-notes.md` ("Left out and why", Dropdown **Value**).

**What happens.** Nowa's model of `DropdownButtonFormField` (the **Dropdown menu** widget) has `initialValue` and no `value`; the starter block sets `initialValue`, and the board mock reads it. The Details **Value** row is built on `value`, which is right for the older `DropdownButton` only.

**Steps to reproduce**
1. **Library** → add a **Dropdown menu** (Forms); it starts with one option, "first".
2. In **Details** → **Items** click **+**, change the new option's **Value** to `second`.
3. Open the **Value** row and pick `second`.

Expected: the board shows `second` selected.
Actual: unknown. By the code the choice goes to `value`, a parameter the interpreter doesn't declare, so **Problems** may report "The named parameter 'value' isn't defined." (`packages/core/lib/src/interpreter/block_problems.dart:216-218`).

**Root cause.** `form_fields.dart:228-238` (`field.getField('value')`) vs `packages/core/lib/src/interpreter/libraries/material_library_custom.dart:989` (`initialValue`), `widgets_to_add.dart:697` and `widget_info.dart:543-545` (`valueName = 'initialValue'`, `'value'` only for `DropdownButton`, `declaration_info_factory.dart:37`).

**Suggested fix.** Use the same `valueName` as `DropdownButtonFormFieldInfo` in `BFDropdownButton` (`initialValue` for the form field, `value` for `DropdownButton`). Test next to `packages/core/test/interpreter_tests/`.

**Docs impact.** `docs/reference/widgets/forms.md` (dropdown section, L78-90) doesn't mention the row; add a sentence once it works.

### R19. Supabase **Query Templates** name a function with a space for camelCase tables

- **Area:** Supabase **Add Supabase Function** (`packages/data/lib/src/supabase/templates`)
- **Severity:** Medium — the generated member can't parse, so the function isn't added (how the failure shows isn't traced).
- **Where:** both; cloud projects
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Code reading only. Found by `reviews/W15-review.md` (product behavior list). Same line as P25, which covers only snake_case names (`getAllUser_profiles`).

**What happens.** The function name is the action plus `tableName.camelCaseToSpaces()`. For a table `todoItems` that is `getAllTodo Items`, not valid Dart.

**Steps to reproduce**
1. Connect a Supabase project that has a table named `todoItems` (quoted camelCase).
2. **Supabase** panel → **+** next to **Generate a Query** → **Query Templates** → **Get All Records** → pick `todoItems` → choose a model → **Generate Function**.

Expected: `getAllTodoItems`.
Actual: the function source starts `Future<List<...>> getAllTodo Items()`.

**Root cause.** `supabase_template_manager.dart:93-95` builds `functionName`; `camelCaseToSpaces` (`packages/core/lib/src/utils.dart:77-79`) inserts a space at each lower-to-upper boundary; the name goes unchanged into `_generateFunctionSource` and `addMemberAction` (`:98-105`).

**Suggested fix.** Build the name with `generateSymbolName(...)` or PascalCase the table (`todoItems` → `TodoItems`, `user_profiles` → `UserProfiles`); this also fixes P25. Test: `packages/data/test/supabase_test.dart`.

**Docs impact.** `docs/integrations/supabase/database.md` L34 ("named after its action and the table, with the first letter capitalized").

### R20. The Firebase iOS app is registered with a re-cased Bundle Identifier that can differ from the Xcode project's

- **Area:** Firebase **Connect Apps** (`packages/data/lib/src/firebase`)
- **Severity:** Medium — if the identifiers differ, iOS Firebase features keyed on the bundle id (the generated `FirebaseOptions`, `GoogleService-Info.plist`, push) may not match the app.
- **Where:** both; iOS builds
- **Status:** Can't tell — the mismatch is Present in 3.13.0 and dev; its effect on iOS can't be told from the repo.
- **Confidence:** Code reading only. Found by `reviews/W16-review.md` (open issue 6) and `reviews/W16-writer-notes.md`.

**What happens.** Nowa creates the iOS app in Firebase from the project's **Bundle Identifier** split on dots, each part converted to camelCase (the `recase` package lowercases the first letter). Xcode's `PRODUCT_BUNDLE_IDENTIFIER` keeps the identifier as typed. For `com.mycompany.MyApp` Firebase gets `com.mycompany.myApp`.

**Steps to reproduce**
1. **Settings** → **Project Details** → set **Bundle Identifier** to `com.mycompany.MyApp`.
2. **Settings** → **Integrations** → **Firebase** → connect a project → **Connect Apps**.
3. In the Firebase console read the iOS app's bundle id; open `ios/Runner/GoogleService-Info.plist` (`BUNDLE_ID`) and the Xcode project's `PRODUCT_BUNDLE_IDENTIFIER`.

Expected: all three identical.
Actual (from reading): Firebase and the plist have `com.mycompany.myApp`, Xcode `com.mycompany.MyApp`.

**Root cause.** `firebase_api_service.dart:103` and `setup/views/fb_apps.dart:168` apply `convertNameCase(e, Cases.camelcase)` per segment; `packages/core/lib/src/project/rename.dart:117-121` writes the identifier unchanged; `setup/fb_setup_manager.dart:195-203` copies the plist's `BUNDLE_ID` into `iosBundleId`.

**Suggested fix.** Send the identifier unchanged and match existing apps case-insensitively in `loadApps` (`fb_apps.dart:168-176`). Check on a device that push and Google sign-in work with the corrected id. Test: `packages/data/test/firebase/firebase_test.dart`.

**Docs impact.** `docs/integrations/firebase/connect.md` ("builds the iOS bundle ID from it").

### R21. Firebase Authentication generates sign-up and sign-in functions but none to delete an account

- **Area:** Firebase Authentication (`packages/data/lib/src/firebase/auth/fb_auth_blocks.dart`)
- **Severity:** Medium — apps with sign-up built this way can be rejected by the App Store (Guideline 5.1.1(v): account deletion inside the app) unless the person writes the deletion.
- **Where:** both; iOS publishing
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code (the full list of generated functions has no deletion). The store rule is as quoted in `docs/publish/ios.md`, not re-fetched. Found by `reviews/P9-store-review.md` (open issue 4) and `reviews/W21-writer-notes.md`. Sibling of P46 (restore purchases).

**What happens.** Turning on Authentication writes `signOut`, `isUserSignedIn`, `currentUser`, `sendVerificationEmail`, `sendPasswordResetEmail`, `signUpWithEmailAndPassword`, `signInWithEmailAndPassword`, `signInWithGoogle`, `verifyPhoneNumber` and `signInWithPhoneNumber`. There is no `deleteAccount`.

**Steps to reproduce**
1. **Settings** → **Integrations** → **Firebase**; connect; turn **Authentication** on; **Add Provider** → **Email/Password**.
2. In code mode open `lib/firebase/firebase.dart` and look for a way to delete the signed-in user.

Expected: a generated function (for example one calling `FirebaseAuth.instance.currentUser?.delete()`).
Actual: none.

**Root cause.** The function list at `fb_auth_blocks.dart:36-407`; `fb_auth_manager.dart:24-153` (what each switch adds).

**Suggested fix.** Generate a `deleteAccount()` with Authentication (handle `requires-recent-login`) and a preview dialog like the others. Test: `packages/data/test/firebase/firebase_test.dart`.

**Docs impact.** `docs/integrations/firebase/auth.md` (function table), `docs/publish/ios.md` L86 and the account-deletion bullet in `docs/publish/android.md` say the functions don't delete accounts; update both after the fix.

### R22. Adding the **Onboarding Screen** template to an existing project doesn't add `smooth_page_indicator`

- **Area:** Templates (`packages/core/lib/src/services/templates`, `packages/core/lib/src/providers/project_provider.dart`)
- **Severity:** Medium — the added screens don't compile until the package is added; **Problems** offers **Fix**.
- **Where:** both
- **Status:** Present in 3.13.0 and dev (more visible since 3.13.0, because `nowa_runtime` 0.2.0 no longer includes the package)
- **Confidence:** Confirmed in code, not run. Found by `reviews/P10-b-review.md` (live-check item 14) and `reviews/W30b-writer-notes.md` (open question 14).

**What happens.** The template declares `packages: {'smooth_page_indicator': '^2.0.1'}` and its source imports the package, but that list is read only when a whole project is created from the template, not when the template is added to an existing one.

**Steps to reproduce**
1. Open a project without `smooth_page_indicator`.
2. Click the **Screen** tool (or **New Widget...** in the Library) → template picker → **Onboarding Screen** → **Import**.
3. Open **Problems**.

Expected: the package is added with the template.
Actual (from reading): `'smooth_page_indicator' is imported but is not in the pubspec.` with **Fix**.

**Root cause.** `onboarding_template.dart:6` (and `animated_onboarding_template.dart:7`). `ProjectProvider.importTemplate` registers `template.packages` (`project_provider.dart:~762-772`), and its only caller is `template_project_provider.dart:58`. The add flow (`add_template_dialog.dart`, `file_actions.dart:25-70`) never calls `registerPackage`.

**Suggested fix.** After a template is added to a project, run the same `registerPackage` loop for `template.packages`. Test: `packages/core/test/file_tests/template_test.dart`.

**Docs impact.** `docs/design/templates.md` (multi-file templates), `docs/code/packages.md#page-indicator-migration`.

### R23. Dragging a package widget from the Library, or adding a **Page View**, doesn't offer **Add Missing Dependencies**

- **Area:** Library insert (`packages/core/lib/src/library/library_actions.dart`, `packages/designer/lib/src/design_experience/designer_board_controller.dart`)
- **Severity:** Low — the widget is placed and **Problems** lists the missing package with **Fix** (also **Details** → **Dependencies** → **Hot Fix**).
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live (3.13.0-79 playground, `reviews/P10-live-checks.md` items 1 and 7) and confirmed in code.

**What happens.** **Insert** and Enter go through `placeLibraryWidget`, which asks first. A drag doesn't. **Page View** is a `Stack` whose dots need `smooth_page_indicator`, but only the root widget's dependencies are checked.

**Steps to reproduce**
1. Starter app (it has no `lottie` package).
2. **Library** → search `lottie` → drag the Built-in **Lottie** row onto the Home Page screen.

Expected: **Add Missing Dependencies**, as with **Insert**.
Actual: the widget drops; **Problems** shows `'lottie' is imported but is not in the pubspec.` Same for **Google Maps**. **Page View** added with Enter shows no dialog either.

**Root cause.** `designer_board_controller.dart:228-283` (`onDragEnd` and `onDragMove` never read `WidgetInfo.dependencies`) vs `library_actions.dart:76-92` (`placeLibraryWidget` builds `DependencyHelper(WidgetInfo(widget.data()).dependencies)` for the root widget only).

**Suggested fix.** Run the dependency check on drag end, and let `DependencyHelper` walk the whole inserted tree.

**Docs impact.** `docs/design/add-widgets.md` ("Add a widget that needs a package"), `docs/reference/widgets/media.md`, `docs/integrations/index.md`, `docs/reference/widgets/navigation.md` (Page View) describe the drag case.

### R24. Library keyboard: the first letter typed from a focused row is lost, and Ctrl/Cmd+K is ignored while the Library has focus

- **Area:** Library panel (`packages/nowa_ui/lib/library/library_panel.dart`, `packages/designer/lib/src/designer_setup.dart`)
- **Severity:** Low — typing a word loses its first letter; Ctrl/Cmd+K does nothing until the board has focus.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live (3.13.0-79 playground, `reviews/P10-live-checks.md` item 2); the cause of the second part is from reading.

**What happens.** (a) Typing while a row has focus jumps into the search field, but the typed letter ends up selected, so the next key replaces it. (b) Ctrl/Cmd+K isn't handled while the focus is in the Library.

**Steps to reproduce**
1. Click a row in the Library (for example **HomePage**) and type `button` quickly.
2. Press Ctrl/Cmd+K while a row, or the search field in **Go to...** mode, has focus.

Expected: the search reads `button`; the search switches to **Add...**.
Actual: it reads `utton`; nothing happens until you click the board or press Esc in an empty search.

**Root cause.** (a) `_typeIntoSearch` (`library_panel.dart:587-595`) sets the text with the caret at its end, but after `_focusSearch()` (`:597-604`) moves focus the live field shows the letter selected (focus-gain selection; not traced to the exact widget). (b) Ctrl/Cmd+K is in the designer's own shortcut map (`designer_setup.dart:51`) and the side panel sits outside that scope.

**Suggested fix.** (a) Apply the text after focus lands (post-frame) or collapse the selection in `SearchWidget`. (b) Register the key at workspace level (`lib/setup_general_actions.dart`). Dev changes only the rename path of `_onKey`.

**Docs impact.** `docs/design/library.md` ("Use the keyboard") and `docs/reference/shortcuts.md` (Library search table, **Add a widget** row) describe both quirks.

### R25. "New ..." dialogs open with a suggested name that isn't selected, so typing appends to it

- **Area:** File and API dialogs (`packages/core/lib/src/file_system/widgets/file_name_text_field.dart`, `packages/data/lib/src/api/views/widgets/api_request_dialogs.dart`)
- **Severity:** Low — names such as `ApiCollectionCats` get created unless the person selects the suggestion first.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live (3.13.0-79 playground) by `reviews/P10-live-data-pages.md` (mismatch 1) and `reviews/P10-live-checks.md` (items 4 and 6); confirmed in code.

**What happens.** The field is filled from a controller and autofocused with the caret at the end and nothing selected. **Rename** selects the old name, so typing replaces it there.

**Steps to reproduce**
1. **Api** panel → **+** → **New Collection**: the field holds `ApiCollection`.
2. Type `Cats`.

Expected: `Cats`.
Actual: `ApiCollectionCats`. Same for **New Request** (`newRequest`), **New Directory in ...** (`Directory`), **New Model** (`Model`), **New GlobalState** (`GlobalState`) and **New Board** (`board`).

**Root cause.** `file_name_text_field.dart:88-92` (text set in `initState`) and `:166` (`autofocus: true`, no selection); `api_request_dialogs.dart:55-60`.

**Suggested fix.** Select the whole text after autofocus (`TextSelection(baseOffset: 0, extentOffset: text.length)`), as the rename field does (`packages/core/lib/src/widgets/rename_declaration_field.dart`). Test: widget tests in `packages/core/test/file_tests/`.

**Docs impact.** `docs/integrations/rest-api/index.md` L18 and L47 ("delete the suggested name"); `docs/design/boards.md` and `docs/code/files.md` mention the dialogs.

### R26. The request editor's header keeps the last test's URL and status after **Back to Request**

- **Area:** REST request editor (`packages/data/lib/src/api/views/api_overlay`)
- **Severity:** Low — the old "API URL" and "Status" stay above an editor that may now point somewhere else.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live (3.13.0-79 playground, `reviews/P10-live-data-pages.md` "Other observations") and confirmed in code.

**What happens.** The header shows the last response's address and status whenever a response exists, whichever view is open. The test provider lives as long as the panel, so the result stays until the panel closes.

**Steps to reproduce**
1. **Api** panel → open a request → **Test** → **Run Test**. The header reads "API URL: https://catfact.ninja/fact" and "Status: 200 OK".
2. Click **Back to Request** and change the path.

Expected: the result is cleared or marked old.
Actual: the header is unchanged until the panel is closed.

**Root cause.** `api_overlay_header.dart:34-46` draws the URL and status when `testProvider.response != null`, without looking at `showTestSection` (`api_request_overlay.dart:26,43-45`).

**Suggested fix.** Pass `showTestSection` to the header, or clear `response` when the request changes.

**Docs impact.** None.

### R27. Error messages show Dart's raw `Exception: ` prefix

- **Area:** Error snackbars and dialogs (`showSnackbarError` in `packages/core/lib/src/utils.dart:108`, 52 call sites)
- **Severity:** Low — messages read "Exception: Icon must be 1024x1024 or smaller" and stay for 2 seconds.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code for every row. Found by `reviews/W7-review.md`, `W11-review.md`, `W16-review.md`, `W10-review.md` and `P10-b-review.md`.

**What happens.** `showSnackbarError(context, e.toString())` prints `Exception.toString()`, so people read "Exception: ..." in the snackbar. The table lists five messages.

**Steps to reproduce**
1. Do what the first column of any row says (the rows are independent).
2. Read the message that appears.

| Where | Message | Code |
|---|---|---|
| Local project, no Flutter SDK set; click **Run** | "Exception: Flutter SDK path is not set. Please configure it in the settings." | `packages/core/lib/flutter_tool.dart:38`; `packages/nowa_run/lib/src/nowa_run_manager.dart:422-424` |
| **Settings** → **Project Details** → pick an app icon over 1024 px | "Exception: Icon must be 1024x1024 or smaller" | `packages/core/lib/src/settings/app_icon_manager.dart:171`; `app_icon_settings.dart:74` |
| **Settings** → **Firebase** → **Add Provider** → **Google** while Google isn't enabled in Firebase | "Exception: Must Enable Google Authentication on Firebase" | `packages/data/lib/src/firebase/auth/fb_auth_manager.dart:61,115`; `.../setup/views/auth_management_view.dart:96-102` |
| **Page indicator migration** dialog → **Migrate** fails | "Exception: Could not add smooth_page_indicator to the pubspec" | `packages/core/lib/src/migrations/migration_service.dart:~250`; snackbar `:147-150` |
| **Import project** on a folder without `pubspec.yaml` | The dialog first says "No pubspec.yaml here — Nowa can browse and edit the files, but not design them.", then fails with "Exception: Chosen folder is not a nowa project or a flutter project" | `lib/dashboard/create_new_project/import_project_dialog.dart:130,178-183`; `packages/core/lib/src/services/local_project_service.dart:103-107` |

Expected: plain messages. For **Import project**, a warning that doesn't promise what the next click refuses.
Actual: the prefix, and the contradiction in the last row.

**Root cause.** Callers pass `e.toString()` and the helper doesn't strip the prefix. The Import dialog's warning (`_notAFlutterProject`) is shown for a folder that `checkIfValidProject` then rejects.

**Suggested fix.** A `userMessage(Object e)` helper (strip the prefix or use a user-facing exception type) used by `showSnackbarError`, with a longer duration for errors. Change or remove the Import warning (or really open such folders). Test: `packages/core/test/`.

**Docs impact.** `docs/troubleshooting/index.md` and `docs/test/run.md` L68 quote "Exception: Flutter SDK path is not set..."; `docs/account/project-settings.md` (icon limit), `docs/integrations/firebase/auth.md`, `docs/code/packages.md` and `docs/code/import.md` quote the others.

### R28. The in-app Shortcuts sheet lists two shortcuts that don't exist or don't do what it says

- **Area:** Shortcuts sheet (`packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart`)
- **Severity:** Low — **Show/Hide panels** (Ctrl/Cmd+\) is bound to nothing; **Group/Ungroup** (Ctrl/Cmd+G) only groups.
- **Where:** both
- **Status:** Present in 3.13.0 and dev. The two slips of 3.12.5, P1 and P2, are fixed.
- **Confidence:** Confirmed in code, not run. Found by `reviews/W30c-writer-notes.md` and `reviews/P10-c2-review.md` (shortcuts rows).

**What happens.** Two rows of the sheet describe keys that don't behave that way.

**Steps to reproduce**
1. Press Ctrl/Cmd+. to open the Shortcuts sheet.
2. Under **Designer** read **Show/Hide panels**; press Ctrl/Cmd+\ with the board focused.
3. Under **Widgets** read **Group/Ungroup**; select a group and press Ctrl/Cmd+G.

Expected: panels toggle; the group is dissolved.
Actual: nothing happens; Ctrl/Cmd+G runs the group action again, and ungrouping exists only in the right-click menu (**Ungroup**).

**Root cause.** Sheet rows at `shortcuts_cheat_sheet.dart:49` and `:56`; no `LogicalKeyboardKey.backslash` binding anywhere in `lib/` or `packages/`; `designer_setup.dart:20` maps `keyG` to `CreateGroupIntent`, and `UngroupIntent` appears only in `packages/designer/lib/src/menus/widget_context_menu.dart:42`.

**Suggested fix.** Delete the **Show/Hide panels** row or bind the key; rename the second row **Group** (or make Ctrl/Cmd+G ungroup a selected group and add a key for **Ungroup**).

**Docs impact.** `docs/reference/shortcuts.md` L28-29 (the "two entries don't match" caveat).

### R29. Sidebar panel numbers disagree with the icons when the Outline icon is hidden

- **Area:** Sidebar shortcuts (`lib/project/side_bar.dart`, `lib/project/panels/panel_actions.dart`, `lib/setup_general_actions.dart`)
- **Severity:** Low — on a screen opened on its own, the tooltips of **Api** and later icons show a number one too low, and pressing that number opens a different panel.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code, not run. Found by `reviews/W12-review.md` (open issue 1) and `reviews/W1-review.md` (open issue 6a).

**What happens.** The sidebar draws `getIcons(showOutlinePanel: !outlineFloatingPanel, ...)` and the tooltip number comes from that list's index. The key action looks the index up in the full list, Outline included.

**Steps to reproduce**
1. Open a screen on its own so the **Outline** becomes a floating box and its sidebar icon disappears (`docs/design/outline.md`).
2. Hover the **Api** icon and read the tooltip number.
3. Press that Ctrl/Cmd+number.

Expected: **Api** opens.
Actual (from reading): the Outline entry of the full list (which the sidebar doesn't draw), and the next number opens **Api**.

**Root cause.** `side_bar.dart:127` (drawn list without Outline), `:421-423` (tooltip index), `panel_actions.dart:20` (`getIcons(codeMode:)` with the default `showOutlinePanel: true`), and `setup_general_actions.dart:47` (the digit-to-index map is a `static` built once from `getIcons()`).

**Suggested fix.** Build tooltip and action from the same list: pass `showOutlinePanel: !outlineFloatingPanel` in `OpenSidePanelAction`, or reserve Outline's number and skip it in the tooltips.

**Docs impact.** `docs/reference/shortcuts.md` (Sidebar panels table, L60-70).

### R30. The "Waiting for Authorization..." dialog drops errors and the 2-minute timeout

- **Area:** OAuth waiting dialog (`packages/core/lib/src/settings/oauth_settings/auth_dialog.dart` and its three callers)
- **Severity:** Low — after the timeout the dialog stays on screen (Supabase, Figma) or closes with no message (GitHub).
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code, not run. Found by `reviews/W10-review.md` (open issue 7) and `reviews/W15-review.md` (timeout bullet).

**What happens.** `WaitingForAuthDialog` calls `onError` once, after 120 s or when `getError()` returns a message, and stops polling. The callers differ: GitHub pops the dialog and drops the message; Supabase and Figma show a red snackbar for 2 seconds and leave the dialog open (only **Cancel** closes it). The Supabase caller passes `getError: () => null`, so its own errors never show (see P24).

**Steps to reproduce**
1. **Settings** → **Git** → **Connect GitHub**; don't approve; wait two minutes.
2. In the **Supabase** panel click **Connect**; don't approve; wait two minutes.

Expected: an error inside the dialog and a way to retry.
Actual: GitHub: the dialog closes, nothing says why. Supabase: "Authorization timed out. Please try again." for 2 s while the dialog stays on "Waiting for 2m 0s...".

**Root cause.** `auth_dialog.dart:44-60`; callers `github_integration_settings.dart:93-99` (`onError` pops `false`), `packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:192-198`, `packages/core/lib/src/figma/figma_auth_dialog.dart:18-24`.

**Suggested fix.** Handle `onError` in the dialog: show the message, stop the spinner, offer **Try again** and **Close**.

**Docs impact.** `docs/code/github.md` L18 and L91, `docs/integrations/supabase/connect.md` L118.

### R31. Supabase ⋮ menu: **Open Supabase** can do nothing, and **Set up Backend** is missing after the project is reopened

- **Area:** Supabase panel (`packages/data/lib/src/supabase/ui/sb_outline.dart`)
- **Severity:** Low
- **Where:** both; cloud projects
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Code reading only. Found by `reviews/W15-review.md` (open issue 2, product behavior list). Related to P41 and P49 (state not loaded on project open).

**What happens.** (a) **Open Supabase** opens the dashboard only for URLs ending in `.supabase.co`; otherwise nothing happens and nothing is said (custom domains, self-hosted). (b) **Set up Backend** shows only when `hasBundleCached` is true. The cache starts false and is filled only when the bundle is read (after **Connect**, **Use Keys**, **Set up Backend** or **Pull Backend Files**), so a reopened project that already holds `supabase/migrations/*.sql` hides the item until one of those runs.

**Steps to reproduce**
1. (a) Connect a project whose URL is a custom domain; ⋮ in the **Supabase** panel → **Open Supabase**.
2. (b) Open a connected project that already contains `supabase/migrations/<file>.sql`; open the ⋮ menu.

Expected: the dashboard opens (or a message); **Set up Backend** is listed.
Actual: nothing for (a); (b) no **Set up Backend** until **Pull Backend Files** has run.

**Root cause.** `sb_outline.dart:261-271` returns null for other hosts and `:288-291` ignores null; `:326` reads `hasBundleCached` (`packages/data/lib/src/supabase/migrations/sb_backend_bundle_service.dart:65`, set at `:71,77,107,140` only when the bundle is read).

**Suggested fix.** (a) Fall back to `https://supabase.com/dashboard` or show a snackbar. (b) Refresh the cache when the project loads (call `bundledMigrationFiles()` in the Supabase plugin's load).

**Docs impact.** `docs/integrations/supabase/backend.md` and `connect.md` describe the menu and "This item shows when the project has backend files".

### R32. Wrong labels, typos and copy in dialogs and Details (batch)

- **Area:** various (code references below)
- **Severity:** Low — each row is a one-line text fix.
- **Where:** both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code for every row, not run (the Library hint and the grid label were also seen live). Found by the review logs in the last column.

**What happens.** The UI shows text that is misspelled, names the wrong place, or belongs elsewhere.

**Steps to reproduce**
1. Open the place named in the first column of any row (the rows are independent).
2. Read the text.

| Where | UI says | Should say | Code | Log |
|---|---|---|---|---|
| **Git** → **Discard all changes** dialog | "This will discard all uncommited changes, you can't undo this action." | "uncommitted" | `lib/project/panels/git_panel/git_commands.dart:78` | W10-review |
| **Settings** → account → **Delete Account**, password box | "Enter you password" | "your" | `packages/core/lib/src/settings/account_editor_settings/account_details/delete_account.dart:123` | W11-review |
| Environment setup dialog, Android step | "You can add these later from Settings → Environment." The tab is **Local Setup** (its page title is "Environment") | "Local Setup" | `packages/core/lib/src/environment/environment_setup_dialog.dart:548`; `.../account_editor_settings.dart:33` | W1-review |
| **Boards** chip → rename icon | Dialog titled "New Rename first.board" | "Rename first.board" | `file_actions.dart:464` passes "Rename ..." and `create_file_dialog.dart:94` prefixes "New " | W3-review |
| **Grid View** → **Fixed** / **Max** switch | Row label "Source" | for example "Columns" | `packages/core/lib/src/fields/grid_view_field.dart:195-206` gives no `title`; default at `source_tabs_field.dart:32` | W13-review |
| **Cross Fade** widget | Outline and breadcrumb read `AnimatedCrossFade` | "Cross Fade" | `declaration_info_factory.dart:42`: the key is `'AnimatedCrossFadeInfo'` (the info class), not the widget class | W13-review |
| Library row menu → **Insert** | Hint "⌘⏎" on every system | "Ctrl ⏎" on Windows and Linux | `lib/project/panels/library_panel/library_host.dart:161` | P10-live-checks |
| **Firebase** page, before connecting | "Only the project owner can add, modify and remove members from the project. Learn more about roles in the documentation." under the header (workspace text) | remove | `packages/data/lib/src/firebase/setup/views/sign_in_with_google.dart:29-37` | W16-writer-notes |
| Instant Play: Firebase Authentication preview dialogs | Google dialog says "preview for Sign Out"; both **Sign In Preview** dialogs say "preview for Create Account" | name the right function | `packages/data/lib/src/firebase/auth/fb_auth_blocks.dart:142,288,436` | W16-writer-notes |
| **Project Details** → **Experimental flags** → **load packages** | "Load packages from pubspec.yaml file automatically, need to restart the project, this will increase loading times..." The flag only lets Nowa AI's packages tool add packages | describe that | `packages/core/lib/src/settings/experimental_flags_dialog.dart:55-58`; the only reader `packages/ai/lib/src/tools/packages_tool.dart:137-141` | W11-review |

Expected: correct text. Actual: as in the second column.

**Root cause.** Plain text slips; the "New Rename" title is a composed string, and the grid and Cross Fade rows are a missing argument and a wrong map key.

**Suggested fix.** One edit per row. The Library hint should come from the shortcut registry (as other menus do) instead of a literal. P5 (**Classs**) and P55 (**Base URL** popover) are the same kind of slip and already listed.

**Docs impact.** `docs/account/project-settings.md` (**load packages** row, L106), `docs/get-started/desktop-app.md` (Local Setup), `docs/design/library.md` L78 ("The menu shows ⌘⏎ on every system"); the rest: None.

### R33. Controls that do nothing, or fail without a message (batch)

- **Area:** various (code references below)
- **Severity:** Low — each item has a workaround.
- **Where:** both (desktop for local-only items)
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Code reading only for every row (not run). Found by the review logs in the last column.

**What happens.** Each row is a control that is inert or whose error never reaches the person.

**Steps to reproduce**
1. Do what the first column of any row says (the rows are independent).
2. Compare the result with the Expected and Actual columns.

| Where | Expected | Actual | Code | Log |
|---|---|---|---|---|
| **Run** (embedded preview), press Esc | Closes or stops the preview, as the overlay's comment says | Nothing: Esc is registered under "Play Mode" but `StopAppAction.invoke` is empty | `packages/nowa_run/lib/src/actions/actions_setup.dart:19`; `.../actions/nowa_run_actions.dart:17-20` | W7-review |
| **Details** → **Route Settings** → **Route Parameters** → **+** (**Add Route Parameter**) on a screen without a route **Path** | A parameter is added or a message asks for a path | Nothing happens until the **Path** field has a value | `packages/designer/lib/src/details/route_details.dart:55-56` | W6-review |
| **Git** panel → **Refresh** | Fetches from the remote | Only calls `tryUpdateState()`, which fetches when 5 minutes have passed since the last fetch (and a 500 ms throttle drops quick repeats), although the comment says the refresh action fetches | `lib/project/panels/git_panel/git_details.dart:220-224`; `packages/git_nowa/lib/src/git_manager.dart:272-296` | W10-review |
| **Settings** → **Packages** → **Add New Package** → **Cancel** in **Add Missing Dependencies** | The table returns to normal | "Loading packages..." keeps showing: `_handleDependencies` throws on Cancel and the table's handler has no try/catch | `packages/core/lib/src/interpreter/packages/package_service.dart:274-285`; `packages/core/lib/src/settings/packages/packages_settings.dart:108-113` | W9-writer-notes |
| **Library** → **Add** (+) → **Upload Assets...** with a file name that already exists | A message; the rest of the batch still imports | Nothing shown and the batch stops at the first duplicate (`addEntity` throws, the menu handler isn't awaited or caught) | `lib/project/panels/library_panel/library_host.dart:184`; `packages/core/lib/src/providers/project_provider.dart:792-805`; `packages/core/lib/src/file_system/nfile_impl.dart:488` | W4-review |
| **Library** → **Add** (+) → **Import Dart code...** with code Nowa can't load (for example a `sync*` function) | An error in the dialog | The dialog stays open with no message; code with no declarations closes silently | `lib/project/panels/files_panel/import_dart_code.dart:51-60`; `packages/ai/lib/src/tools/ai_response_actions.dart:18-27` | W9-review |
| **Project Details** → **Experimental flags** → **New UX** on, then double-click a widget on the board | Selects the child as usual | Throws `UnimplementedError: Drill into component is not implemented yet` for any widget | `packages/designer/lib/src/design_experience/designer_board_controller.dart:108,365,414-419` | W11-review |

Expected: the second column. Actual: the third column.

**Root cause.** Per row, as listed under "Code".

**Suggested fix.** Esc: make `StopAppAction` close the overlay (`workspace.runOverlayOpen = false`) or drop the binding. Route **+**: disable it (or create a default path). **Refresh**: call `updateState` with `fetch: true`. Add package: wrap the call in try/catch and reset `_loading`. Upload and Import: catch, `showSnackbarError`, continue with the next file. New UX: return `false` until drill-in exists.

**Docs impact.** `docs/account/project-settings.md` (New UX row), `docs/code/git.md` (Refresh), `docs/code/packages.md`; the rest: None.
