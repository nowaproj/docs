# Documentation coverage audit

Status: COMPLETE. All 9 research files audited, one row per `## Summary` bullet (358 rows, plus 77 supplementary
widget and wrapper rows).

Result: 348 covered, 5 partial, 3 missing, 2 left out. No P1 gap: every shipped feature named in the nine Summaries is
explained in the docs or listed in `left-out.md`. One P2 gap (managing requests and collections in the **Api** panel);
the rest are P3 one-liners. See "Gaps to fix".

Method: every bullet of the `## Summary` of each `_rewrite/research/features-*.md` was checked against the pages under
`/home/user/docs/docs/` (excluding `new/` and `legacy/`): grep for its UI label(s), then read the hit to confirm the
feature is explained, not just mentioned. For the last three files (data, ai, code-ship) every docs page of the area
was read in full, and every bold UI label and every quoted label of the research "Features" sections was also searched
in the docs (a script, results read by hand): what was not found is transient or trivial text (dialog titles,
empty-state lines, validation messages) except the items in "Gaps to fix". No docs page was edited.

Snapshot: the working tree of 2026-10-07. The verification pass was still editing a few pages while this ran
(`google-maps.md`, `google-sign-in.md`, `reference/widgets/forms.md`, `reference/wrappers.md` showed uncommitted edits);
none of those edits changes a status here, and every gap below was re-checked as still open at the end of the run.

Statuses: `covered` (explained, the reader can use it), `partial` (mentioned, but something the reader needs is
missing, named in the Note), `missing` (not in the docs and not in `left-out.md`), `left out` (listed in `left-out.md`).
A `covered` row may still carry a "Minor" note for a detail that is not worth a ticket on its own.

Priorities in "Gaps to fix": **P1** a shipped feature the reader needs is not explained anywhere; **P2** the reader can
do the task but has to guess or hunt for the way; **P3** a small detail, a one-line absence statement or a consistency fix.

Nine `features-*.md` files exist (account-projects, editor-shell, designer-core, widgets, theme-assets, logic, data, ai,
code-ship); an earlier instruction mentioned ten, there is no tenth. All nine were audited.

## Totals

Summary bullets of the 9 research files (one row each). `left out` = listed in `_rewrite/left-out.md`.

| Research file | Features | covered | partial | missing | left out |
|---|---|---|---|---|---|
| features-account-projects | 64 | 62 | 0 | 2 | 0 |
| features-editor-shell | 35 | 32 | 2 | 0 | 1 |
| features-designer-core | 46 | 46 | 0 | 0 | 0 |
| features-widgets | 11 | 11 | 0 | 0 | 0 |
| features-theme-assets | 29 | 29 | 0 | 0 | 0 |
| features-logic | 49 | 49 | 0 | 0 | 0 |
| features-data | 43 | 41 | 1 | 1 | 0 |
| features-ai | 34 | 32 | 1 | 0 | 1 |
| features-code-ship | 47 | 46 | 1 | 0 | 0 |
| **Total** | **358** | **348** | **5** | **3** | **2** |

Per status: covered 348 (97.2%), partial 5, missing 3, left out 2. The 3 `missing` rows are one-line absence statements
("Nowa has no X"), not features. The 5 `partial` rows are the **Api** panel (data), **Bottom panel** and **Resizing and
collapsing panels** (editor-shell), **AI usage and credits** (ai) and **Code editor** (code-ship).

Supplementary checks (not in the totals above): features-widgets: 77 covered.


## Gaps to fix

Ordered by priority, then by how many readers hit it. "Rows" names the table rows that raised it. No P1 gap.

| # | Pri | Page that should cover it | What to add | Rows |
|---|---|---|---|---|
| G1 | P2 | `docs/integrations/rest-api/index.md` (under "Add a request") | Two lines on managing items in the **Api** panel: right-click a request for **Rename** or **Remove**; right-click a collection for **Remove** (Nowa shows the references dialog first); and the panel's search box, which filters requests by name or endpoint. | data: **Api** panel (partial) |
| G2 | P3 | `docs/get-started/editor-tour.md` | A short "Resize and close panels" paragraph: the API and Supabase test views and the Git commit details open in a docked bottom panel; drag a divider to resize the bottom panel and the side panel; close the bottom panel with X; **Action History** is a floating panel you can move; **Enter Fullscreen** becomes **Exit Fullscreen**. | editor-shell: **Bottom panel** (partial), **Resizing and collapsing panels** (partial) |
| G3 | P3 | `docs/code/code-mode.md` (section "Edit code") | Three lines on the details panel of a text tab opened outside code mode (**Show file content**): **Font size**, **Word wrap** and the **Compile** / **Compiled** button. | code-ship: **Code editor** (partial) |
| G4 | P3 | `docs/integrations/index.md`, and one line in `docs/logic/actions.md#save-values-on-the-device` | A short "What Nowa doesn't include" note: no secure (encrypted) storage integration, no OneSignal or analytics integration, no in-app purchase other than RevenueCat, no Sign in with Apple for the user's app (all "not found in code" in the research). On the Shared Preferences section, one line that Nowa has no secure-storage option. | data: absence statement (missing), **Shared Preferences** (minor) |
| G5 | P3 | `docs/account/workspaces.md` | One sentence on what 3.12.5 does not have: comments, real-time co-editing, duplicating a project. The research line also says "transfer", but **Move to workspace...** exists, so settle what was meant before writing it. | account-projects: absence statement (missing) |
| G6 | P3 | `docs/account/account-settings.md` (or `docs/get-started/editor-tour.md`) | One line: the editor has a single dark look; there is no light/dark switch and no interface-language setting. | account-projects: **Theme (dark only)** (missing) |
| G7 | P3 | `_rewrite/left-out.md` (or `docs/account/plans-and-usage.md#usage`) | Record the Free Weekend **FREE** pill and the **FREE** badges on the thinking levels as a time-limited promotion, like "Claim your Nowa Launch Benefits". Only What's New mentions the event. | ai: AI usage and credits (partial) |
| G8 | P3 | `docs/get-started/editor-tour.md` (the Save button item) | List the **Save every** choices and the leave-project dialog (**Cancel** / **Close** / **Save and close**). | editor-shell: **Save options** (covered, minor) |
| G9 | P3 | `docs/integrations/rest-api/index.md` | Name the JSON editor's ⋮ menu (**Wrap**, **Compress**, **Prettify**), the form-data value types and the **Upload File** picker for a file body. Keep **DOWNLOAD** out: it has no save path (`product-issues.md` P35). | data: **New Request**, **Test** (covered, minor) |
| G10 | P3 | `docs/integrations/firebase/connect.md` ("What Nowa adds to your project") | Say that adding `cloud_firestore` raises the iOS minimum version to 15.0, as the Google Maps and RevenueCat pages already say for 14.0 (`firebase_package_config.dart:44`, applied by `package_config_service.dart:133`). The W16 writer dropped it as an internal detail. | data: **Firebase** connect (covered, consistency) |
| G11 | P3 | `docs/code/custom-code.md` ("Control what the board shows for a function") | Name `@CustomWidget`, the widget counterpart of `@CustomFunction` (same `preview` and `imports` arguments, `packages/nowa_runtime/lib/src/annotations.dart`). | code-ship: **Your own code on the board** (covered, minor) |
| G12 | P3 | `docs/test/share.md#what-people-see-in-a-preview` | Name the **Custom** tab's **Safe areas** fields and the "Unattached global states" / **Attach all** warning card of the device preview. | designer-core: **Device preview** (covered, minor) |
| G13 | P3 | `docs/account/projects.md` | Decide about the direct prompt link `/prompt-to-app?prompt=...&mode=...&tier=...`: one sentence, or an entry in `left-out.md`. Niche. | account-projects: **What do you want to build?** (covered, minor) |
| G14 | P3 | `_rewrite/left-out.md` or `docs/account/project-settings.md` (**New UX** row) | Reconcile: `left-out.md` lists the New UX **Debug** side panel as left out, but the **New UX** row of the Experimental flags table names "a **Debug** panel". Either note "named once in project-settings.md" in the `left-out.md` row or drop the clause from the docs row. | editor-shell: **New UX** layout (left out) |

Trivial omissions kept in the row notes only (no ticket): the **Log out** link on **Confirm your email**, the logout
entries on the verify and upgrade pages, the one-line upgrade-offer dialog, **Open Code Editor** in the code-mode tab menu.

Left-out decisions this audit confirms (nothing to fix): none of the Max Mode agent, the New UX bottom AI toolbar
(**Press / to chat...**), the Files grid view, the Marketplace view, **Libraries** / **Trace** / **ManualTool**, the
`bash` tool or the debug-only Files menu items appears anywhere in the docs. **Press / to chat...** is counted as `left out`.

## Tables

### features-account-projects

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **Create your account** (sign-up page) | covered | `docs/get-started/create-account.md` | Fields, password rule, terms box, newsletter box, 6-digit code. |
| **Welcome back!** (sign-in page) | covered | `docs/get-started/create-account.md` | Includes "link survives sign-in". |
| **Continue with Google** / **Complete your account** | covered | `docs/get-started/create-account.md` | |
| **Continue with Apple** | covered | `docs/get-started/create-account.md`, `docs/troubleshooting/known-issues.md` | Web and iOS only; not in the desktop app, stated. |
| **Confirm your email** | covered | `docs/get-started/create-account.md` | Resend explained. The **Log out** link on this step is not mentioned (minor). |
| **Reset your password** / **Set a new password** | covered | `docs/get-started/create-account.md` | Includes "Invalid link". |
| **Onboarding survey** ("Question 1 of 4") | covered | `docs/get-started/create-account.md` | "Answer the four questions". |
| **Logout** | covered | `docs/get-started/create-account.md`, `docs/account/account-settings.md` | Dashboard and editor menu; the verify step and upgrade page entries are not mentioned (minor). |
| **AppSumo sign-in link** (`/auth/appsumo`) | covered | `docs/account/plans-and-usage.md` | Short paragraph under "Change your plan". |
| **Dashboard** (`/`) | covered | `docs/account/index.md` | Sidebar table, main area, pop-ups. |
| **What do you want to build?** (prompt box) | covered | `docs/account/projects.md`, `docs/get-started/first-app.md`, `docs/ai/prompting.md` | The direct link `/prompt-to-app?prompt=...&mode=...&tier=...` is not documented (P3, niche). |
| **Projects** list (count, **Search...**, **Sort by**, grid/list, **Load More**) | covered | `docs/account/projects.md` | "Find a project". |
| **On this device** (LOCAL-ONLY) | covered | `docs/account/projects.md`, `docs/code/local-projects.md`, `docs/get-started/cloud-and-local.md` | |
| **Project menu (⋮)** | covered | `docs/account/projects.md` | All five items, incl. the Delete warning for local projects. |
| **RECENTS** | covered | `docs/account/projects.md`, `docs/account/index.md` | |
| **Workspace switcher** (**Personal**, **Create workspace**) | covered | `docs/account/workspaces.md` | |
| **Notifications** bell and announcement banners | covered | `docs/account/help.md` | |
| **Invite a Friend** | covered | `docs/account/plans-and-usage.md` | |
| **Hire an Expert** | covered | `docs/account/help.md` | |
| **Learning Resources** | covered | `docs/account/help.md`, `docs/account/index.md` | |
| **Download Desktop App** → **Download Nowa** | covered | `docs/get-started/desktop-app.md` | |
| **Upgrade your plan** and the plan badge | covered | `docs/account/plans-and-usage.md`, `docs/account/index.md` | |
| **Dashboard pop-ups** (update, survey, rating, ticket link, upgrade offer) | covered | `docs/account/index.md`, `docs/troubleshooting/index.md`, `docs/account/help.md` | The "upgrade offer" dialog gets one line only; nothing the reader needs to act on. |
| **New project** dialog (name, **Advanced** → **Local-only project**) | covered | `docs/account/projects.md`, `docs/code/local-projects.md` | |
| **Clone from GitHub** | covered | `docs/code/import.md`, `docs/account/projects.md` | Plan gate (**Time to level up**) stated. |
| **Import project** | covered | `docs/code/import.md`, `docs/code/local-projects.md` | Monorepo **Package to open** explained. |
| **Project names, package name and bundle ID** | covered | `docs/account/projects.md`, `docs/account/project-settings.md` | Validation messages quoted. |
| **Cloud projects vs Local-only projects** | covered | `docs/get-started/cloud-and-local.md` | Comparison table. |
| **Desktop app** (downloads, plan gate, auto-update) | covered | `docs/get-started/desktop-app.md`, `docs/troubleshooting/index.md` | |
| **Local Setup** (Flutter SDK, projects folder, VS Code path, **Set up automatically**) | covered | `docs/get-started/desktop-app.md` | |
| **Project Sync** (**Sync from Cloud/Local**, **Unlink Project**) | covered | `docs/code/local-projects.md`, `docs/get-started/cloud-and-local.md` | |
| **Project not found** | covered | `docs/account/projects.md`, `docs/code/local-projects.md`, `docs/troubleshooting/index.md` | |
| **Playground** (`/playground`) | covered | `docs/get-started/playground.md` | |
| **Starting-point picker** (Playgrounds / Templates) | covered | `docs/get-started/playground.md` | |
| **Save** / **Save to keep changes** → **Save your app** | covered | `docs/get-started/playground.md` | |
| **Public projects opened as a guest** | covered | `docs/get-started/playground.md`, `docs/test/share.md` | |
| **App Settings** window (General / Integrations) | covered | `docs/account/project-settings.md` | |
| **Project Details** (names, identifiers, build info, App Icon, Shared Preferences) | covered | `docs/account/project-settings.md` | |
| **Sharing** (**Cover**, **Public project**, link options) | covered | `docs/account/project-settings.md`, `docs/test/share.md` | |
| **Experimental flags** (**load packages**, **New UX**) | covered | `docs/account/project-settings.md` | |
| **Permissions** (iOS and Android toggles) | covered | `docs/account/project-settings.md` | |
| **Constants** (integration keys + **Custom Constants**) | covered | `docs/account/project-settings.md`, `docs/integrations/constants.md` | |
| **Project info popup** (name, copyable Project ID) | covered | `docs/account/project-settings.md`, `docs/get-started/editor-tour.md` | |
| **Account Settings** window (Account Details, Billing, Usage; Editor Settings) | covered | `docs/account/account-settings.md` | |
| **Account Details** | covered | `docs/account/account-settings.md` | |
| **Change Email** (OTP) | covered | `docs/account/account-settings.md` | |
| **Change Password** / **Set New Password** | covered | `docs/account/account-settings.md` | |
| **Delete Account** | covered | `docs/account/account-settings.md` | |
| **Connected Accounts** (Figma) | covered | `docs/account/account-settings.md`, `docs/ai/connectors.md` | |
| **Billing** | covered | `docs/account/plans-and-usage.md` | |
| **Usage** | covered | `docs/account/plans-and-usage.md` | |
| **Extra AI Usage** (buy credits) | covered | `docs/account/plans-and-usage.md` | Plan gate stated. |
| **Time to level up** and **Premium** badge | covered | `docs/account/plans-and-usage.md` | |
| **Workspace settings** (rename, **Members**, **Invite**, roles, **Delete**/**Leave workspace**) | covered | `docs/account/workspaces.md` | |
| **Accept invitation** page | covered | `docs/account/workspaces.md` | |
| **View Only** access | covered | `docs/account/workspaces.md` | |
| (No comments, real-time co-editing, project duplicate or transfer in 3.12.5) | missing | none | Absence statement, not a feature. The docs never say Editors cannot co-edit live or that there is no duplicate/transfer; one sentence in `docs/account/workspaces.md` would answer the question (P3). |
| **Support panel** (**Chat with support**, **Report an issue**, tickets) | covered | `docs/account/help.md` | |
| **New-project tour** | covered | `docs/get-started/editor-tour.md` | Both steps lists. |
| **Feedback rating** dialog | covered | `docs/account/help.md` | |
| **Update prompts** (desktop auto-update, web reload, "Version out of date") | covered | `docs/troubleshooting/index.md`, `docs/get-started/desktop-app.md` | |
| **System screens** (No Internet Connection, We'll Be Right Back, Maintenance, Preview Not Available, Payment Successful/Failed) | covered | `docs/troubleshooting/index.md`, `docs/account/plans-and-usage.md` | |
| **Version label** (`v3.12.5`) | covered | `docs/get-started/editor-tour.md`, `docs/account/help.md` | Status bar and dashboard bell mention the version; the number itself is not hard-coded (good). |
| **Theme (dark only)**: no light/dark or language preference | missing | none | Absence statement. Nothing says the editor has a single dark look and no language setting; `docs/account/account-settings.md` or `docs/get-started/editor-tour.md` could hold one line (P3). |

### features-editor-shell

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **Editor layout** (no UI label) | covered | `docs/get-started/editor-tour.md` | Numbered tour of top bar, sidebar, side panel, board, Variables/Details, toolbar, status bar, support button. |
| **Top bar** | covered | `docs/get-started/editor-tour.md` | Every control in a table, incl. **Save** replacing **Run**/**Deploy** in playground and guest sessions. |
| **Board chip** (board switcher) | covered | `docs/design/boards.md`, `docs/get-started/editor-tour.md` | **Create new board**, **Rename**, **Delete**, dimmed chip to return. |
| **Sidebar panels** (Assistant ... Router, **Shortcuts**, **Enter Fullscreen**) | covered | `docs/get-started/editor-tour.md`, `docs/reference/shortcuts.md` | Ctrl/Cmd + number per panel. The matching **Exit Fullscreen** label is not named (trivial). |
| **Widgets** panel | covered | `docs/design/components.md` (Manage screens and components) | **Page**/**Component**, search, list/grid, drag, double-click, right-click menu. |
| **Files** panel | covered | `docs/code/files.md` | Tree on board vs code mode, markers (`*`, count, Git letters), add buttons, drag to move, right-click. |
| **Outline** panel | covered | `docs/design/outline.md` | Includes the floating variant on an open screen and branch eye icons. |
| **Search** panel (**Text** / **Symbols**, **Replace all**) | covered | `docs/code/files.md` | Match case, whole word, regex, limits, replace warning. |
| **Variables** and **Details** (right side of the board) | covered | `docs/get-started/editor-tour.md`, `docs/design/properties.md`, `docs/design/boards.md` | Collapsible, resizable by dragging the left edge, hidden under 600 px. |
| **Bottom panel** (no UI label) | partial | `docs/integrations/rest-api/index.md` (only in passing) | There is no description of the docked bottom area that the API and Supabase testers and Git commit details open in, how to resize it (drag the divider) or close it (X). Low impact (P3): add 2 lines to `docs/get-started/editor-tour.md`. |
| **Status bar** | covered | `docs/get-started/editor-tour.md`, `docs/test/problems.md` | Name popup, version, counts, last log line, loading progress, Git branch, Save button. |
| **Console** (**Problems** / **Logs**) | covered | `docs/get-started/editor-tour.md`, `docs/test/run.md#read-the-logs`, `docs/test/problems.md` | **Pub get**, **Clear**, move/resize are explained. |
| **Problems** (**From Nowa** / **From Code Analysis**, **Fix**) | covered | `docs/test/problems.md` | Scope filter, severity filter, **Navigate**/**Copy**, fix table. |
| **Save options** / **Auto save** | covered | `docs/get-started/editor-tour.md`, `docs/code/code-mode.md`, `docs/reference/shortcuts.md`, `docs/get-started/first-app.md` | Minor: the interval choices (10 s to 5 min) are not listed, and the leave-project dialog (**Cancel** / **Close** / **Save and close**) is only hinted ("Nowa asks first"). |
| **Undo / Redo** and **Action History** | covered | `docs/design/select-and-edit.md#undo-and-redo`, `docs/reference/shortcuts.md` | Per-area history explained. |
| **Keyboard shortcuts** | covered | `docs/reference/shortcuts.md` | All groups (general, panels, designer, mouse, run, chat, pickers, Circuit, tabs, code editor) plus "when a shortcut does nothing". |
| **Shortcuts** cheat sheet (Ctrl/Cmd + .) | covered | `docs/reference/shortcuts.md`, `docs/get-started/editor-tour.md` | Documents the four wrong entries in the in-app sheet. |
| **Search for a file** (Ctrl/Cmd + O) and other pickers | covered | `docs/code/files.md`, `docs/code/code-mode.md`, `docs/reference/shortcuts.md#pickers` | |
| **Context menus** | covered | `docs/design/select-and-edit.md`, `docs/code/files.md`, `docs/design/components.md`, `docs/design/themes.md` and others | No single index page, but every menu is explained where its feature lives. The code-mode tab entry **Open Code Editor** is not mentioned (trivial; **View Code** is). |
| **Board navigation** | covered | `docs/design/boards.md`, `docs/reference/shortcuts.md` | Pan, zoom, **F**, remembered view, "no zoom buttons". |
| **Opening screens, components and files** | covered | `docs/design/boards.md`, `docs/design/screens.md`, `docs/code/files.md`, `docs/reference/shortcuts.md` | **Open in new tab**, Ctrl/Cmd + I, Ctrl/Cmd + B, search results, Problems **Navigate**. |
| **Tabs** and **New tab** (code mode) | covered | `docs/code/code-mode.md` | **Recent Files**, shortcuts, middle-click. |
| **Resizing and collapsing panels** | partial | `docs/get-started/editor-tour.md`, `docs/design/properties.md`, `docs/test/run.md` | Toggling by icon, collapsing Details/Variables/Outline and moving/resizing the **Console** are explained. Not said: the side panel and the bottom panel can be resized by dragging their dividers, **Action History** is a movable floating panel, **Exit Fullscreen**. P3. |
| **Settings** (App Settings overlay) | covered | `docs/account/project-settings.md` | Ctrl/Cmd + `,`, General/Integrations groups. |
| **Experimental flags** (**load packages**, **New UX**) | covered | `docs/account/project-settings.md#experimental-flags` | Badge Beta. |
| **New UX** layout (Experimental) | left out | `docs/account/project-settings.md` (flag only) | `left-out.md`: designer-core "New UX designer parts (bottom AI bar ...)" and code-ship "Debug side panel and panel icons in the top bar". The flag and its **NEW UX** badge, **More panels** and **Debug** panel get two lines; **Pin to top bar** is not documented on purpose. |
| **General Settings** → **Editor Settings** (**Local Setup**, **Git**) | covered | `docs/account/account-settings.md`, `docs/get-started/desktop-app.md` | |
| **Support** (floating **?** button) | covered | `docs/account/help.md` | All six options. |
| **Notifications** and announcement banners | covered | `docs/account/help.md#notifications` | |
| **Welcome tour** | covered | `docs/get-started/editor-tour.md#welcome-tour` | Both tours, all step names. |
| **Nothing is open** screen and safe mode | covered | `docs/get-started/editor-tour.md`, `docs/account/projects.md`, `docs/troubleshooting/index.md` | |
| **Mobile layout** | covered | `docs/get-started/mobile.md` | |
| **View only** mode | covered | `docs/account/workspaces.md#view-only`, `docs/design/boards.md`, `docs/reference/shortcuts.md` | |
| **Package chip** | covered | `docs/code/import.md`, `docs/get-started/editor-tour.md` | |
| **Opening the editor from a link** (link options) | covered | `docs/test/share.md#set-how-the-link-opens` | **Code mode**, **Preview**, **Assistant**, **Opened file**. |

### features-designer-core

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **Boards** (**Board** chip, **Create new board**) | covered | `docs/design/boards.md` | Create, switch, rename, delete, `.board` file, Ctrl/Cmd + Shift + B. |
| **Show Grid** / **Board Color** / **Reset** | covered | `docs/design/boards.md`, `docs/get-started/editor-tour.md` | |
| **Moving around the board** (pan, zoom, **F**) | covered | `docs/design/boards.md`, `docs/reference/shortcuts.md` | |
| **Big boards** (behavior) | covered | `docs/design/boards.md#big-boards-and-errors` | The "more than 8 items in view" rule is stated. |
| **Board items** (title bar, home icon, **Play**, **Open in new tab**, **X/Y/W/H**) | covered | `docs/design/boards.md`, `docs/design/index.md` | Loose widgets explained too. |
| **Designer toolbar** (**Select tool**, **Shape**, **Screen**, **Text**, **Widget**) | covered | `docs/design/boards.md`, `docs/get-started/editor-tour.md` | Keys V / R / T and Ctrl/Cmd + K. |
| **Adding things to a board** (drag, picker, paste) | covered | `docs/design/add-widgets.md` | Dragging files in from the computer is unreachable in 3.12.5 (`left-out.md`, theme-assets), correctly not documented. |
| **Play** (Instant Play): **Share preview**, **Reset zoom**, **Stop** | covered | `docs/test/instant-play.md` | |
| **Screen** tool / **Create a page** (template picker) | covered | `docs/design/screens.md`, `docs/design/templates.md` | **Search for templates**, **Premium** badge, **Empty Page**. |
| **Screen settings** (**Color**, **App Bar**, **Drawer**, **Floating Action Button**, **Bottom Navigation Bar**, **Size**) | covered | `docs/design/screens.md`, `docs/design/responsive.md` | Size presets listed with pixel sizes. |
| **Route Settings** (**Path**, **Route Parameters**) | covered | `docs/design/screens.md#name-the-route`, `docs/logic/navigation.md` | GoRouter-only noted. |
| **Make home screen** | covered | `docs/design/screens.md#choose-the-home-screen` | |
| **Rename** (screens and components) | covered | `docs/design/screens.md`, `docs/design/components.md` | All three ways. |
| **Add description** | covered | `docs/design/screens.md` | |
| **Copy as new widget** | covered | `docs/design/screens.md`, `docs/design/components.md` | |
| **Remove** vs **Delete** | covered | `docs/design/boards.md`, `docs/design/screens.md` | |
| **Widgets** panel (**Page** / **Component**) | covered | `docs/design/components.md#manage-screens-and-components` | |
| **Open in new tab** (Ctrl/Cmd + I) | covered | `docs/design/screens.md`, `docs/design/boards.md`, `docs/design/outline.md` | |
| **Create component** | covered | `docs/design/components.md` | |
| **Variables** box (**Params**, **Variables**, **Functions**) | covered | `docs/design/components.md`, `docs/logic/variables.md`, `docs/logic/parameters.md`, `docs/logic/functions.md` | Auto-stateful behaviour stated. |
| **Component instances** (params per instance, edit original, **Detach**) | covered | `docs/design/components.md` | |
| **Selecting** | covered | `docs/design/select-and-edit.md` | Table with every gesture. |
| **Moving** | covered | `docs/design/select-and-edit.md` | |
| **Drop rules** | covered | `docs/design/select-and-edit.md#where-a-dragged-widget-lands` | |
| **Resizing** | covered | `docs/design/select-and-edit.md` | |
| **Snapping and guides** | covered | `docs/design/select-and-edit.md` | |
| **Editing text on the canvas** | covered | `docs/design/select-and-edit.md` | |
| **Copy / Cut / Paste** | covered | `docs/design/select-and-edit.md`, `docs/design/add-widgets.md` | |
| **Remove** (widgets) | covered | `docs/design/select-and-edit.md` | |
| **Replace with...** | covered | `docs/design/select-and-edit.md` | |
| **Group / Ungroup** | covered | `docs/design/select-and-edit.md`, `docs/design/layout.md` | |
| **Move Up / Move Down / Move To Top / Move To Bottom** | covered | `docs/design/select-and-edit.md`, `docs/reference/shortcuts.md` | Real keys vs wrong menu hint explained. |
| **Add Wrapper** | covered | `docs/design/properties.md#add-a-wrapper`, `docs/reference/wrappers.md` | Reorder and **Remove** explained. |
| **Export as image...** | covered | `docs/design/select-and-edit.md#export-as-image` | |
| **Group** section (Stack/Row/Column, **Padding**, **Test ...**) | covered | `docs/design/layout.md`, `docs/design/responsive.md` | The **Test** / **Copies** feature is in responsive.md. |
| **Rows and columns** (**Alignment**, **Main Axis Size**, **Spacing**, **Gap**) | covered | `docs/design/layout.md` | |
| **Stacks and constraints** | covered | `docs/design/layout.md` | |
| **Layout** section (sizing: **Fixed**, **Auto**, **Expand**) | covered | `docs/design/layout.md` | |
| **Scrolling and wrapping** | covered | `docs/design/layout.md` | |
| **Responsive design** | covered | `docs/design/responsive.md` | States clearly that there are no breakpoints. |
| **Outline** panel | covered | `docs/design/outline.md` | |
| **Device preview** (**Play Settings**, **Device Size**, **Full Screen**) | covered | `docs/test/share.md#what-people-see-in-a-preview`, `docs/design/responsive.md` | Minor: the **Custom** tab's **Safe areas** fields and the "Unattached global states" / **Attach all** warning card are not named (P3). "AI play mode" is not reachable (`play_app_tool` is in `left-out.md`). |
| **Placeholder values on the board** | covered | `docs/design/responsive.md`, `docs/test/instant-play.md` | Table of placeholders. |
| **This screen failed to render** / **Reload screen** | covered | `docs/design/boards.md`, `docs/troubleshooting/index.md` | |
| **View only** boards | covered | `docs/design/boards.md`, `docs/account/workspaces.md` | |
| **Designer keyboard shortcuts** | covered | `docs/reference/shortcuts.md` | Includes where the in-app cheat sheet disagrees. |

### features-widgets

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **Widget picker** (Ctrl/Cmd + K or the **Widget** tool) | covered | `docs/design/add-widgets.md`, `docs/reference/widgets/index.md` | Chips **All** / **BuiltIn** / **Components**, preview, **Open Documentation.**, click vs drag. |
| **Request a Widget** | covered | `docs/design/add-widgets.md`, `docs/reference/widgets/index.md` | **Submit Request**. |
| **Add Missing Dependencies** | covered | `docs/design/add-widgets.md#add-a-widget-that-needs-a-package`, `docs/reference/widgets/index.md` | The nine widgets that need a package are named. |
| **Add Wrapper** (32 wrappers, reorder, remove) | covered | `docs/design/properties.md#add-a-wrapper`, `docs/reference/wrappers.md` | |
| **Details** panel | covered | `docs/design/properties.md` | Sections, **Mixed**, **Kept as code**. |
| **Field editors** | covered | `docs/design/properties.md` | One table for every editor type. |
| **Link menu** (click a field name) | covered | `docs/design/properties.md`, `docs/logic/expressions.md#link-menu` | |
| **Reset to default** / **Set to null** | covered | `docs/design/properties.md`, `docs/logic/expressions.md` | |
| **Connectors** (Text Field, Pin Code Field, Form, Swipeable Stack, Bottom Navigation Bar create a variable) | covered | `docs/reference/widgets/forms.md`, `docs/reference/widgets/lists.md`, `docs/reference/widgets/navigation.md`, `docs/reference/wrappers.md` | `text`, `pinCode`, `formKey`, `swiperController`, `pageIndex` all named. |
| **Screen slots** (App Bar, Drawer, Floating Button, Bottom Navigation Bar dropped on a screen) | covered | `docs/design/screens.md`, `docs/design/select-and-edit.md`, `docs/reference/widgets/navigation.md` | |
| **Integration widgets** (Admob Banner, Google Maps, RevenueCat Paywall) | covered | `docs/reference/widgets/index.md`, `docs/integrations/admob.md`, `docs/integrations/google-maps.md`, `docs/integrations/revenuecat.md` | Package and key setup explained on each page. |



#### Supplementary check: the 45 built-in widgets of the catalog (`research/features-widgets.md` "Catalog")

Each widget has its own row, a stable `#anchor` and a one-line description in `docs/reference/widgets/index.md`; widgets with Nowa-specific setup also link to a detail page.

| Widget | Status | Page(s) | Note |
|---|---|---|---|
| **Container** | covered | `docs/reference/widgets/index.md#container` | row with description |
| **Text** | covered | `docs/reference/widgets/index.md#text` | row with description |
| **Text Field** | covered | `docs/reference/widgets/index.md#textfield`, `docs/reference/widgets/forms.md` | row + detail page |
| **Icon** | covered | `docs/reference/widgets/index.md#icon` | row with description |
| **SizedBox** | covered | `docs/reference/widgets/index.md#empty-widget` | row with description |
| **Image** | covered | `docs/reference/widgets/index.md#image`, `docs/reference/widgets/media.md` | row + detail page |
| **SVG** | covered | `docs/reference/widgets/index.md#svg`, `docs/reference/widgets/media.md` | row + detail page |
| **Button** | covered | `docs/reference/widgets/index.md#button` | row with description |
| **Icon Button** | covered | `docs/reference/widgets/index.md#icon-button` | row with description |
| **Floating Button** | covered | `docs/reference/widgets/index.md#floating-action-button`, `docs/reference/widgets/navigation.md` | row + detail page |
| **Group** | covered | `docs/reference/widgets/index.md#group`, `docs/design/layout.md#groups` | row + detail page |
| **TabView** | covered | `docs/reference/widgets/index.md#tabview`, `docs/reference/widgets/navigation.md` | row + detail page |
| **List View** | covered | `docs/reference/widgets/index.md#listview`, `docs/reference/widgets/lists.md` | row + detail page |
| **Grid View** | covered | `docs/reference/widgets/index.md#gridview`, `docs/reference/widgets/lists.md` | row + detail page |
| **Swipeable Stack** | covered | `docs/reference/widgets/index.md#swipeable-stack`, `docs/reference/widgets/lists.md` | row + detail page |
| **Page View** | covered | `docs/reference/widgets/index.md#pageview`, `docs/reference/widgets/navigation.md` | row + detail page |
| **Indexed Stack** | covered | `docs/reference/widgets/index.md#index-stack`, `docs/reference/widgets/navigation.md` | row + detail page |
| **Cross Fade** | covered | `docs/reference/widgets/index.md#cross-fade`, `docs/reference/widgets/navigation.md` | row + detail page |
| **Wrap** | covered | `docs/reference/widgets/index.md#wrap` | row with description |
| **Data Builder** | covered | `docs/reference/widgets/index.md#data-builder`, `docs/integrations/show-data.md` | row + detail page |
| **Video Player** | covered | `docs/reference/widgets/index.md#video-player`, `docs/reference/widgets/media.md` | row + detail page |
| **YouTube Player** | covered | `docs/reference/widgets/index.md#youtube-player`, `docs/reference/widgets/media.md` | row + detail page |
| **Lottie** | covered | `docs/reference/widgets/index.md#lottie`, `docs/reference/widgets/media.md` | row + detail page |
| **Rive** | covered | `docs/reference/widgets/index.md#rive`, `docs/reference/widgets/media.md` | row + detail page |
| **AnimatedContainer** | covered | `docs/reference/widgets/index.md#animated-container` | row with description |
| **Circular Progress Indicator** | covered | `docs/reference/widgets/index.md#loading-circular` | row with description |
| **Linear Progress Indicator** | covered | `docs/reference/widgets/index.md#linear-progress-indicator` | row with description |
| **Checkbox** | covered | `docs/reference/widgets/index.md#checkbox` | row with description |
| **Switch** | covered | `docs/reference/widgets/index.md#switch` | row with description |
| **Popup Menu Button** | covered | `docs/reference/widgets/index.md#popup-menu-button` | row with description |
| **Dropdown menu** | covered | `docs/reference/widgets/index.md#dropdown-menu`, `docs/reference/widgets/forms.md` | row + detail page |
| **Slider** | covered | `docs/reference/widgets/index.md#slider` | row with description |
| **Pin Code Field** | covered | `docs/reference/widgets/index.md#pin-code-field`, `docs/reference/widgets/forms.md` | row + detail page |
| **App Bar** | covered | `docs/reference/widgets/index.md#appbar`, `docs/reference/widgets/navigation.md` | row + detail page |
| **Bottom Navigation Bar** | covered | `docs/reference/widgets/index.md#navigation-bar`, `docs/reference/widgets/navigation.md` | row + detail page |
| **Drawer** | covered | `docs/reference/widgets/index.md#drawer`, `docs/reference/widgets/navigation.md` | row + detail page |
| **List Tile** | covered | `docs/reference/widgets/index.md#listtile` | row with description |
| **Expansion Tile** | covered | `docs/reference/widgets/index.md#expansion-tile` | row with description |
| **Alert Dialog** | covered | `docs/reference/widgets/index.md#alert-dialog` | row with description |
| **Admob Banner** | covered | `docs/reference/widgets/index.md#admob-banner`, `docs/integrations/admob.md` | row + detail page |
| **Web View** | covered | `docs/reference/widgets/index.md#webview`, `docs/reference/widgets/media.md` | row + detail page |
| **Html** | covered | `docs/reference/widgets/index.md#html`, `docs/reference/widgets/media.md` | row + detail page |
| **Markdown** | covered | `docs/reference/widgets/index.md#markdown`, `docs/reference/widgets/media.md` | row + detail page |
| **Google Maps** | covered | `docs/reference/widgets/index.md#google-maps`, `docs/integrations/google-maps.md` | row + detail page |
| **RevenueCat Paywall** | covered | `docs/reference/widgets/index.md#revenuecat-paywall`, `docs/integrations/revenuecat.md` | row + detail page |

#### Supplementary check: the 32 wrappers (`research/features-widgets.md` "Wrappers")

Each wrapper has a row and a stable `#anchor` in `docs/reference/wrappers.md`, grouped by purpose, with what it does and its defaults.

| Wrapper | Status | Page(s) | Note |
|---|---|---|---|
| **Padding** | covered | `docs/reference/wrappers.md#padding` | row with description |
| **Align** | covered | `docs/reference/wrappers.md#align` | row with description |
| **Constrained Box** | covered | `docs/reference/wrappers.md#constrained-box` | row with description |
| **Fractionally Sized Box** | covered | `docs/reference/wrappers.md#fractionally-sized-box` | row with description |
| **Aspect Ratio** | covered | `docs/reference/wrappers.md#aspect-ratio` | row with description |
| **Fitted Box** | covered | `docs/reference/wrappers.md#fitted-box` | row with description |
| **Intrinsic Height** | covered | `docs/reference/wrappers.md#intrinsic-height` | row with description |
| **Intrinsic Width** | covered | `docs/reference/wrappers.md#intrinsic-width` | row with description |
| **Safe Area** | covered | `docs/reference/wrappers.md#safe-area` | row with description |
| **Container** | covered | `docs/reference/wrappers.md#container` | row with description |
| **Opacity** | covered | `docs/reference/wrappers.md#opacity` | row with description |
| **Clip radius** | covered | `docs/reference/wrappers.md#clip-radius` | row with description |
| **Transform** | covered | `docs/reference/wrappers.md#transform` | row with description |
| **Color Filter** | covered | `docs/reference/wrappers.md#color-filter` | row with description |
| **Material** | covered | `docs/reference/wrappers.md#material` | row with description |
| **Badge** | covered | `docs/reference/wrappers.md#badge` | row with description |
| **AnimatedContainer** | covered | `docs/reference/wrappers.md#animated-container` | row with description |
| **Gesture Detector** | covered | `docs/reference/wrappers.md#gesture-detector` | row with description |
| **Ink Well** | covered | `docs/reference/wrappers.md#ink-well` | row with description |
| **Dismissible** | covered | `docs/reference/wrappers.md#dismissible` | row with description |
| **Refresh Indicator** | covered | `docs/reference/wrappers.md#refresh-indicator` | row with description |
| **Interactive Viewer** | covered | `docs/reference/wrappers.md#interactive-viewer` | row with description |
| **Tooltip** | covered | `docs/reference/wrappers.md#tooltip` | row with description |
| **Visibility** | covered | `docs/reference/wrappers.md#visibility` | row with description |
| **Scroll View** | covered | `docs/reference/wrappers.md#scrollview` | row with description |
| **Text Direction** | covered | `docs/reference/wrappers.md#text-direction` | row with description |
| **Default Text Style** | covered | `docs/reference/wrappers.md#default-text-style` | row with description |
| **Data Builder** | covered | `docs/reference/wrappers.md#data-builder` | row with description |
| **Notifier Builder** | covered | `docs/reference/wrappers.md#notifier-builder` | row with description |
| **Form** | covered | `docs/reference/wrappers.md#form` | row with description |
| **Screen** | covered | `docs/reference/wrappers.md#screen` | row with description |
| **Drawer** | covered | `docs/reference/wrappers.md#drawer` | row with description |

### features-theme-assets

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **Themes** (panel) | covered | `docs/design/themes.md` | Ctrl/Cmd + 3, `lib/globals/themes.dart`, **Refresh**, **Open in New Tab**. |
| **Create New Theme** | covered | `docs/design/themes.md#create-a-theme` | Naming rules included. |
| **Active** theme | covered | `docs/design/themes.md#apply-a-theme` | |
| **Rename** / **Delete** (theme right-click menu) | covered | `docs/design/themes.md#rename-or-delete-a-theme` | Active theme cannot be deleted, stated. |
| **Colors** (role tiles, **Add Color**) | covered | `docs/design/themes.md#edit-colors` | |
| **Brightness**, **Mode** (**Fixed** / **Seed**), **Seed Color**, **Scheme Variant** | covered | `docs/design/themes.md#choose-light-or-dark-fixed-or-seed` | All nine variants listed. |
| **Typography** (15 text styles, **Default Font**) | covered | `docs/design/themes.md#edit-text-styles`, `docs/design/fonts-icons.md` | |
| **Widgets** (**Fields**, **Buttons**) | covered | `docs/design/themes.md#style-text-fields-and-buttons` | **Fields** is one line ("fill, borders, label, hint and error styles and more"); enough to find and use it. |
| Theme extensions (**Default Theme** + one tab per extension) | covered | `docs/design/themes.md#edit-theme-extensions` | Limit of 8 and "no create button" stated. |
| **Create Theme Setup** | covered | `docs/design/themes.md#add-themes-to-a-project-that-has-none`, `docs/design/theme-styles.md` | |
| **Colors From Theme** (link, edit in place, detach, **With values**) | covered | `docs/design/theme-styles.md#use-a-theme-color`, `#make-a-theme-color-transparent` | |
| **Text Styles** (**CopyWith**, detach) | covered | `docs/design/theme-styles.md#use-a-theme-text-style` | Includes **Modify Style** / **Remove CopyWith**. |
| **Connect to Theme** (**Button Style**) | covered | `docs/design/theme-styles.md#connect-buttons-to-the-theme` | |
| Switching themes while the app runs (`changeTheme`) | covered | `docs/design/theme-styles.md#switch-themes-while-the-app-runs`, `docs/logic/global-state.md` | Step-by-step in Circuit. |
| Import a theme from Figma (AI) | covered | `docs/design/theme-styles.md#bring-in-a-theme-from-figma`, `docs/design/themes.md`, `docs/ai/connectors.md` | |
| **Fonts** picker (Google Fonts, **Import** `.ttf`/`.otf`) | covered | `docs/design/fonts-icons.md` | Filter options and web 100-font limit included. |
| Custom fonts declared in `pubspec.yaml` | covered | `docs/design/fonts-icons.md#declare-fonts-yourself` | |
| **Icons** picker (Material Icons only) | covered | `docs/design/fonts-icons.md#choose-an-icon` | Says Material Icons only. |
| Assets in the **Files** panel, **Import asset** | covered | `docs/design/assets.md#import-files`, `docs/code/files.md` | File-type table. |
| Pick or upload an asset from a widget property (**Pick Image** / **Upload Image** and SVG, Lottie, Rive, Video, Audio) | covered | `docs/design/assets.md#use-an-asset-in-a-widget` | |
| Paste an image onto the board | covered | `docs/design/assets.md#paste-an-image-onto-the-board`, `docs/design/add-widgets.md` | |
| Drag an asset onto the board | covered | `docs/design/assets.md#drag-an-asset-onto-the-board` | Mapping table; says dropping from the computer does nothing. |
| Asset file actions (**Remove file**, **Rename**, **Copy as path**, **View in folder**, **Show file content**) | covered | `docs/design/assets.md#rename-remove-and-find-files`, `docs/code/files.md` | |
| Automatic `pubspec.yaml` registration of asset folders and fonts | covered | `docs/design/assets.md`, `docs/design/fonts-icons.md` | |
| **App Icon** (Project Details) | covered | `docs/account/project-settings.md#change-the-app-icon`, `docs/publish/index.md` | **Change all**, per-platform tiles, 1024 px limit. |
| Localization (no translation UI, Nowa AI sets it up) | covered | `docs/design/localization.md` | States clearly that there is no translation editor. |
| Text direction (RTL): **Text Direction** property and wrapper | covered | `docs/design/localization.md#show-text-right-to-left`, `docs/reference/wrappers.md` | |
| Templates (**Search for templates**, 13 built-in, some **Premium**) | covered | `docs/design/templates.md` | All 11 screen and 2 component templates named. |
| Playground starting points and public templates | covered | `docs/get-started/playground.md` | |

### features-logic

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **Circuit** (visual logic editor) | covered | `docs/logic/circuit.md`, `docs/logic/index.md` | Opens as a floating panel; ways to open it listed. |
| **All nodes for this circuit** (add-node menu) | covered | `docs/logic/circuit.md#add-a-node` | Five top items and the category table. |
| **Node editing** (select, **Remove** / **Move up** / **Move down**, shortcuts, error icon) | covered | `docs/logic/circuit.md`, `docs/reference/shortcuts.md#circuit` | States that copy/paste of nodes is not possible (consistent with `left-out.md`). |
| **Function node** (**Name**, **Return Type**, **Params**) | covered | `docs/logic/circuit.md#set-up-the-function-node`, `docs/logic/functions.md` | |
| **Store result** (**New Variable** / **Pick Variable** / **none**) | covered | `docs/logic/circuit.md#store-result` | |
| **Future Options** (**await**, **onValue**, **onError**) | covered | `docs/logic/circuit.md#future-options` | |
| **Add If statement** | covered | `docs/logic/circuit.md#branch-with-if` | |
| **Add Try statement** (**On Error**, **Error name**) | covered | `docs/logic/circuit.md#handle-errors-with-try` | |
| **Add Return** | covered | `docs/logic/circuit.md#return-a-value` | |
| **Create Local Variable** | covered | `docs/logic/circuit.md`, `docs/logic/variables.md` | |
| **Add Custom Expression** | covered | `docs/logic/circuit.md`, `docs/logic/expressions.md#custom-expression` | |
| **While** (display only) | covered | `docs/logic/circuit.md#loops` | Says there is no node to add a loop. |
| **Navigator** (GLOBALS) | covered | `docs/logic/navigation.md` | `push`, `pop`, `pushReplacement`, `pushAndRemoveUntil`, parameters, result. |
| **GoRouter** (GLOBALS) | covered | `docs/logic/navigation.md` | `go`, `push`, `pop`, replace and the named variants; Router panel, **Router Configuration**, migration. |
| **Show snackbar** (GLOBALS) | covered | `docs/logic/popups.md`, `docs/logic/events.md` | |
| **checkPlatform** (GLOBALS) | covered | `docs/logic/actions.md#check-the-platform` | |
| **Media Query** (GLOBALS) | covered | `docs/logic/actions.md#read-the-screen-size`, `docs/design/responsive.md` | |
| **Set <variable>** and **refresh** | covered | `docs/logic/variables.md#change-a-variable-from-logic` | "Without refresh the screen keeps the old value" explained. |
| **Shared Preferences** (**clear**, **remove key**, **set**, **get**) | covered | `docs/logic/actions.md#save-values-on-the-device`, `docs/account/project-settings.md` | |
| **Create...** (GENERAL) | covered | `docs/logic/actions.md#create-objects` | `Future.delayed`, `Timer.periodic`, `DateTime.now`, models. |
| **Operators** | covered | `docs/logic/expressions.md#operators`, `docs/logic/actions.md` | Operator table. |
| **Expressions** (**Conditional**, **Math**, **Logical**, **ifNull**) | covered | `docs/logic/expressions.md` | |
| **Library categories** (MATERIAL, DART:CORE, NOWA_RUNTIME, SERVICES, DART:ASYNC ...) | covered | `docs/logic/actions.md#find-any-other-function` | Category table with examples. |
| **showDialog** / **showModalBottomSheet** / **showBottomSheet** | covered | `docs/logic/popups.md` | |
| **showDatePicker** / **showTimePicker** / **showDateRangePicker** and **.format** | covered | `docs/logic/popups.md` | |
| **showMediaPicker** (NOWA_RUNTIME) | covered | `docs/logic/popups.md`, `docs/integrations/supabase/storage.md` | |
| **openUrl** (NOWA_RUNTIME) | covered | `docs/logic/actions.md#open-a-link` | |
| **print** (DART:CORE) | covered | `docs/logic/actions.md#write-to-the-logs` | |
| **Dependencies** / **Hot Fix** | covered | `docs/logic/circuit.md#hot-fix` | |
| **Variables** panel (**Params**, **Variables**, **Functions**, **Globals**) | covered | `docs/logic/variables.md`, `docs/get-started/editor-tour.md` | |
| **Variables** (screen/component): create, rename, type, default, remove | covered | `docs/logic/variables.md` | Naming rules and "in use" dialog included. |
| **Select type** (String, int, double, bool, Color, Widget, **As List**, **show more...**) | covered | `docs/logic/variables.md#choose-a-type`, `docs/logic/models.md` | |
| **Params** (screen/component parameters, passing data between screens) | covered | `docs/logic/parameters.md`, `docs/logic/navigation.md` | |
| **Functions** (**Add Function**, **InitState Function**, **Dispose Function**) | covered | `docs/logic/functions.md` | |
| **Events** (On Pressed, On Tap, On Changed ...; **+** / **Edit**) | covered | `docs/logic/events.md` | |
| **Link <field>** menu (**Custom Expression...**, **Detach...**, **Create Param...**, **Create Variable...**, **Compute...**, **Edit**, **Open in Circuit**) | covered | `docs/logic/expressions.md#link-menu` | One table for all items. |
| **Custom Expression...** (expression builder, **Eval**) | covered | `docs/logic/expressions.md#custom-expression` | |
| **$ inside text** and **+ after a linked value** | covered | `docs/logic/expressions.md#dollar`, `#plus` | |
| **Compute...** | covered | `docs/logic/expressions.md#compute` | |
| **Visibility** wrapper | covered | `docs/logic/expressions.md#visibility`, `docs/reference/wrappers.md` | |
| **Reset to default** / **Set to null** | covered | `docs/design/properties.md`, `docs/logic/expressions.md` | |
| **Global states** (**New Global State...**, **Create global state**, **Pick global state**, **Detach global state**, **Attach**; **AppState**) | covered | `docs/logic/global-state.md` | |
| **Global state variables and functions** (`notifyListeners`) | covered | `docs/logic/global-state.md#add-variables-and-functions` | |
| **Using global states** | covered | `docs/logic/global-state.md#use-a-global-state` | |
| **Notifier Builder** wrapper | covered | `docs/logic/global-state.md#rebuild-only-part-of-a-screen`, `docs/reference/wrappers.md` | |
| **New Model...** | covered | `docs/logic/models.md#create-a-model` | |
| **Generate Models From Json...** | covered | `docs/logic/models.md#generate-models-from-json` | Wizard steps and limits. |
| **Using models** | covered | `docs/logic/models.md#use-a-model-as-a-type`, `#create-a-model-in-logic` | |
| **Constants** (Custom Constants) | covered | `docs/integrations/constants.md`, `docs/account/project-settings.md` | |

### features-data

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **Api** panel → **Collections** (search, **Add Collection** menu, ▶ **Run Query**) | partial | `docs/integrations/rest-api/index.md`, `docs/get-started/editor-tour.md` | **Add Collection** menu, hover gear and **+**, ▶ **Run Query** are explained. Not said: the panel's search box (filters requests by name or endpoint) and how to **Rename** or **Remove** a request or a collection (right-click; **Remove** shows the references dialog first). P2: two lines under "Add a request". |
| **New Collection** (**Create New Collection**) | covered | `docs/integrations/rest-api/index.md#create-a-collection`, `docs/code/files.md` | **Class name** / **Path**, **Submit**, `lib/api/<name>.api.dart`, **API Collection...** in the Files menu. |
| **Collection settings** (**Name**, **Base URL**, **Auth Key**, **Headers**) | covered | `docs/integrations/rest-api/index.md#set-the-base-url-headers-and-sign-in` | Bearer token from Shared Preferences with the matching **set** step, "ships inside your app" warning. |
| **New Request** (**Create New Request**; method, URL, **Headers** / **Body**, **Params**, **Model**) | covered | `docs/integrations/rest-api/index.md#add-a-request` | All five body types, `$` / `${param}` in the address, **Pass Parameters in Body**. Minor (P3): the **DOWNLOAD** method (untested, open question in the research), the JSON editor's ⋮ menu (**Wrap**, **Compress**, **Prettify**) and the form-data value types are not named. |
| **Test** / **Run Test** (**Testing values**, **Auth token value**, **Json** / **Object**) | covered | `docs/integrations/rest-api/index.md#test-a-request`, `docs/troubleshooting/known-issues.md#api-requests-blocked-in-the-browser` | **Back to Request**, ▶ **Run Query**, status header, response **Headers**. Minor (P3): the **Upload File** picker for a file body is not mentioned. |
| **Generate Model** / **Generate from Schema** / **Select Model** / **Return as Response Object** | covered | `docs/integrations/rest-api/index.md#turn-the-response-into-a-model` | Wizard steps (**Content**, **Select Data**, **Generated Models**), default path `lib/models`, hidden after a failed test. |
| **Import from curl** | covered | `docs/integrations/rest-api/import.md#add-one-request-from-a-curl-command` | **Function Name**, **cURL Command**, base-URL rule, **Invalid curl**. |
| **Import From** (**Import from Swagger** / **Postman** / **Xano**) | covered | `docs/integrations/rest-api/import.md` | URL, paste or file; Xano instance, workspace and API group steps; error table; "always creates a new collection". |
| **Supabase** panel → **Connect** (authorize, pick or **Create New Project**) | covered | `docs/integrations/supabase/connect.md#connect-with-your-supabase-account` | **Waiting for Authorization...**, **Change organization**, **Unavailable**, form fields with the default region and the 4-character password rule, error table. |
| **Use Keys** | covered | `docs/integrations/supabase/connect.md#connect-with-keys` | **API Url**, **Key**, "publishable or secret key not supported", comparison table with **Connect**. |
| **Supabase** panel (connected): sections, badges, ⋮ menu | covered | `docs/integrations/supabase/connect.md#find-your-way-around-the-panel` | Section table, every badge, **Rename** / **Remove**, one row per ⋮ item. |
| **Tables** | covered | `docs/integrations/supabase/connect.md#see-your-tables` | Read-only, refresh behaviour, "no table editor". |
| **Query Templates** ("CRUD operations") | covered | `docs/integrations/supabase/database.md#add-a-query-from-a-template` | Five templates, **Fetch Tables**, model step, generated function names, "no filter, sort or page". |
| **Storage Templates** ("File operations") | covered | `docs/integrations/supabase/storage.md` | Three fixed functions, test steps, `showMediaPicker` upload flow and image download flow. |
| **Testing <function>** (**Testing values**, **Run**, RLS help, file preview, **Streaming**) | covered | `docs/integrations/supabase/database.md#test-a-function`, `docs/integrations/supabase/storage.md` | Result table with **RLS Policy Error**, **Empty Result - Possible RLS Filtering**, **Download image**, **Save File to Disk**; "tests change real data" warning. |
| **Edit Code** (**Query Source Code**) | covered | `docs/integrations/supabase/database.md#edit-code` | **Save** / **Discard**, **Test Function**, "Could not parse function name". |
| **Authentication** (Supabase panel; **Testing as:**) | covered | `docs/integrations/supabase/auth.md` | `signUp` / `signIn` / `signOut`, **Testing as:**, full login-screen walkthrough in Circuit. |
| Stream (realtime) queries (**Stream** badge) | covered | `docs/integrations/supabase/database.md#live-queries` | Realtime must be on in Supabase, example function, "no template creates one". |
| **Pull Backend Files** | covered | `docs/integrations/supabase/backend.md#save-your-backend-into-the-project` | Dialog steps, written paths, "Pull failed" message, what is not copied. |
| **Set up Backend** / **Set up Supabase backend** (**Connect app with AI**, **Fix with AI**) | covered | `docs/integrations/supabase/backend.md#set-up-a-backend-that-came-with-a-project` | Skip / Set up, **Backend ready**, **Setup stopped**, "already set up" message, **Use Keys** caveat. |
| **Disconnect** (Supabase) | covered | `docs/integrations/supabase/backend.md#disconnect-supabase` | Confirmation text, what is deleted and what stays. |
| Supabase MCP (**Enable MCP** / **Manage MCP**) | covered | `docs/ai/connectors.md`, `docs/integrations/supabase/backend.md#nowa-ai`, `docs/integrations/supabase/connect.md` | **OAuth Authentication Required**, **Switch project…**, **Turn off MCP**. |
| **Firebase** (Settings → Integrations): **Continue with Google**, project, **Connect Apps** | covered | `docs/integrations/firebase/connect.md` | App-matching rules, "will be automatically created" lines, error banners, files added. |
| **Refresh/Update apps and config files** | covered | `docs/integrations/firebase/connect.md#refresh-the-apps-and-config-files` | Includes the package-name mismatch problem and **Navigate**. |
| **Authentication** (Firebase; **Email/Password**, **Google**, **Phone**) | covered | `docs/integrations/firebase/auth.md` | Functions table, preview dialogs in Instant Play, **Enable on Firebase.**, the known `google_sign_in` version note. |
| **SHA Certificate Fingerprints (For Google Sign in)** | covered | `docs/integrations/firebase/auth.md#sha-fingerprints` | **Release key** **Add**, `keytool` debug key, 59-character rule. |
| **Push Notifications (FCM)** / **Test Push Notifications** | covered | `docs/integrations/firebase/notifications.md` | Xcode step, **All Users** / **Topic**, **Deliver with sound**, four error messages, "Nowa disconnects Firebase on expired sign-in" warning. |
| **Disconnect Project** (Firebase; **Keep Files** / **Clear All Files**) | covered | `docs/integrations/firebase/connect.md#disconnect-firebase` | |
| Firestore **Collections** | covered | `docs/integrations/firebase/firestore.md#define-your-collections` | **Add Main Collection**, **+ Field**, sub collections, **Remove**. |
| Firestore **Queries** (builder, **Test**) | covered | `docs/integrations/firebase/firestore.md#build-a-query`, `#test-a-query`, `docs/troubleshooting/known-issues.md#firebase-on-windows` | Step table, status icon, **Create New Param**, **Run Test** / **Restart**, Windows limit. |
| Firebase Storage / Realtime Database (no UI) | covered | `docs/integrations/firebase/connect.md#the-connected-page` | One sentence: "have no visual tools in Nowa". |
| **Data Builder** (wrapper and widget) | covered | `docs/integrations/show-data.md`, `docs/reference/widgets/index.md`, `docs/reference/wrappers.md` | **Source**, **API** / **Query** pickers, `data`, **Loading Widget**, **Error Builder**, placeholders on the board. |
| **Constants** (integration keys + **Custom Constants**) | covered | `docs/integrations/constants.md`, `docs/account/project-settings.md` | Save with Enter, naming rule, **Remove**, "not secret" warning. |
| **Shared Preferences** actions (**clear**, **remove key**, **set**, **get**; Project Details → **Clear**) | covered | `docs/logic/actions.md#save-values-on-the-device`, `docs/account/project-settings.md` | Not said (P3, see the last row): the values are plain, not encrypted storage. |
| **Stripe** | covered | `docs/integrations/stripe.md` | Keys, purchase types, secret key and webhook, wallets, table mapping, **Deploy Configuration**, service methods, fixes, removal. Includes the **Use Keys** caveat. |
| **RevenueCat** + **RevenueCat Paywall** | covered | `docs/integrations/revenuecat.md` | Three keys, generated service, paywall placeholder, run on a device. |
| **AdMob** + **Admob Banner** + `loadAndShowInterstitialAd` | covered | `docs/integrations/admob.md` | App IDs, unit IDs, **Show Test Ads**, what shows where, before-publish list. |
| **Google Maps** | covered | `docs/integrations/google-maps.md` | Three keys and where each is written, placeholder on the board, location permissions note. |
| **Google Sign-In** (**Managed by Firebase**) | covered | `docs/integrations/google-sign-in.md` | Both IDs, **Managed by Firebase** with **Open Firebase Settings**. |
| **Deep Links** (**URL Scheme**, **Host**) | covered | `docs/integrations/deep-links.md` | Includes "no iOS Universal Links" and the `open.my.app` host. |
| **Add Missing Dependencies** | covered | `docs/design/add-widgets.md#add-a-widget-that-needs-a-package`, `docs/integrations/index.md`, `docs/code/packages.md` | |
| Geolocator (no settings page, location permissions) | covered | `docs/code/packages.md` | One sentence about packages that need phone permissions, naming `geolocator`. |
| Not found in code: secure storage, OneSignal, analytics SDKs, other in-app purchase, Sign in with Apple for user apps | missing | none | Absence statement. Nothing says Nowa has no encrypted storage (Shared Preferences is plain), no OneSignal or analytics integration and no Sign in with Apple for the user's app. One short "What Nowa doesn't include" note in `docs/integrations/index.md` would answer these (P3). |

### features-ai

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **AI Assistant** panel | covered | `docs/ai/index.md#open-the-ai-assistant`, `docs/get-started/editor-tour.md` | **Assistant** icon, Ctrl/Cmd + 1, open by default, header (**+**, **⋮**), playground sign-in note, auto-save after a request. |
| **Switch mode** (Design / Plan / Agent) | covered | `docs/ai/modes.md` | Menu texts, chat-field hints, remembered per project, new projects start in Design, **Start here** badge. |
| **Instant / Thinking / Deep Thinking** | covered | `docs/ai/modes.md#set-the-thinking-level`, `docs/ai/index.md` | Default **Thinking**, hidden in Plan, the old "Think Mode" toggle is gone. The **FREE** badge on the levels is not mentioned (see the usage row). |
| **Send** / **Abort** | covered | `docs/ai/chat.md#send-a-message`, `#stop-a-request` | Enter vs Shift/Ctrl/Cmd + Enter, **Cancelling...**, when **Send** is disabled, changes stay after a stop. |
| **Add context** (**Attach image**, **Attach text file**, **FROM YOUR APP**; selection attached automatically) | covered | `docs/ai/context.md` | Check / lock / **included** markers, paste and drag, 5-image limit, what every request carries, "what to attach when" table. |
| **@ mentions** | covered | `docs/ai/context.md` (Mention a screen with @) | Keys, clickable mention in a sent message. |
| **Suggestions** (empty chat) | covered | `docs/ai/chat.md#start-from-a-suggestion` | Six chips, a chip never sends, Design shows none. |
| **Thinking process** and tool activity | covered | `docs/ai/chat.md#read-the-conversation` | Step icons and their four tooltips, code cards, **Open in New Tab**. |
| **Questions** (**Send Answers**) | covered | `docs/ai/modes.md#plan-mode`, `docs/ai/prompting.md` | **Other...**, **(Recommended)**. Shown in Plan steps only; `docs/ai/index.md` says the agent "asks you questions" in general. |
| **Implementation Plan** (**Implement this plan**, **Keep planning**) | covered | `docs/ai/modes.md#plan-mode` | **Key Decisions**, **Technical details**, latest plan only. |
| **Tasks** | covered | `docs/ai/modes.md#agent-mode`, `docs/ai/index.md` | Progress bar; nothing to operate. |
| **Your app design is complete** / **Make it real** | covered | `docs/ai/modes.md#design-mode` | Feature chips, **Switched to Agent mode**. |
| **Suggested next steps** | covered | `docs/ai/chat.md#pick-a-suggested-next-step` | Mode badge, **Dismiss**, never sent by itself. |
| **Created Widgets** / **Constants updated** | covered | `docs/ai/chat.md#use-what-the-agent-created`, `docs/integrations/constants.md` | Auto-placement of new screens, **Open Constants**. |
| **What the agent can do** | covered | `docs/ai/index.md#what-nowa-ai-can-do` | Table by area; the **load packages** flag; Design and Plan use only part of it. |
| **Restore Checkpoint** / **Reapply Checkpoint** | covered | `docs/ai/undo-and-history.md` | **Undo Last Request?** dialog, chain warning, what is not recorded, `.nowa/temp/`, not in the playground. |
| **Approval Required** | covered | `docs/ai/connectors.md#approve-what-a-connector-does` | **Approve** / **Deny**, **Auto-approve tools** and its project-wide scope with a warning. |
| **New Session**, long-session note, **Session Limit Reached** | covered | `docs/ai/undo-and-history.md#start-a-new-session` | |
| **Chat History** (**All Sessions**) | covered | `docs/ai/undo-and-history.md#reopen-a-past-chat` | **Load More** 25 at a time, **New Chat** label. |
| **Custom Instructions** | covered | `docs/ai/prompting.md#custom-instructions` | 5,000 characters, per project, `.nowa/assistant_instructions.md`, shared with an external agent. |
| **Retry**, **Service under load** and other chat errors | covered | `docs/ai/chat.md#recover-from-errors` | |
| **Bug report ready** / **Report** | covered | `docs/ai/chat.md#send-a-bug-report` | Nothing is sent until the form is submitted. |
| AI usage and credits in the chat (**% used**, **Session Details**, out-of-credits banner, **FREE** pill) | partial | `docs/ai/index.md#usage-and-credits`, `docs/account/plans-and-usage.md#usage`, `#out-of-credits` | The ring, "100% used" states, token counters, **Session Details** (**Credits Used**, **Global Usage**), the "You ran out of credits." banner and its buttons are all explained. Missing: the **FREE** pill during a Free Weekend (only What's New mentions the event) and it is not in `left-out.md`. P3: add it to `left-out.md` as a time-limited promotion, like "Claim your Nowa Launch Benefits". |
| **Supabase MCP** (**Enable MCP** / **Manage MCP**) | covered | `docs/ai/connectors.md#connect-supabase`, `docs/integrations/supabase/backend.md#nowa-ai` | **OAuth Authentication Required**, menu table, "switches off when you reopen the project", Agent mode only. |
| **Figma MCP** | covered | `docs/ai/connectors.md#connect-figma`, `docs/account/account-settings.md#connect-figma` | **Waiting for Authorization...**, 2-minute timeout, **Connected Accounts**, theme file names. |
| **Connect External Agent** | covered | `docs/ai/external-agent.md` | Badges **Enterprise** and **Desktop app**, command and URL, port 4680 message. |
| External agent tools | covered | `docs/ai/external-agent.md#what-your-agent-can-do` | Tool table by group, safeguards, what is not exposed. |
| **What do you want to build?** (dashboard prompt box, **Build it**) | covered | `docs/account/projects.md`, `docs/get-started/first-app.md`, `docs/ai/index.md`, `docs/ai/prompting.md` | Mode and level chips, example prompts and refresh, "Setting things up…" loading screens. |
| **Fix with AI** / **Explain with AI** | covered | `docs/test/run.md`, `docs/publish/web.md`, `docs/publish/builds.md`, `docs/publish/ios.md`, `docs/test/problems.md`, `docs/ai/index.md` | All four surfaces; "runs in the current mode, Plan never changes the project". |
| **Connect app with AI** / **Fix with AI** (Supabase backend setup) | covered | `docs/integrations/supabase/backend.md`, `docs/ai/index.md` | |
| **Press / to chat...** (New UX bottom AI toolbar) | left out | `docs/account/project-settings.md` (flag only) | `left-out.md`, designer-core: "New UX designer parts (bottom AI bar ...)". The **New UX** flag has a row in the Experimental flags table that does not mention the toolbar; consistent with the decision. |
| AI chat in the phone browser | covered | `docs/get-started/mobile.md#chat-with-nowa-ai` | Chat pill, microphone, chips (mode, level → **Model**, **Attach**, **Supabase**, **History**, **⋯**). Nowa GO is private beta (`left-out.md`). |
| **View Raw Data** | covered | `docs/ai/chat.md#read-the-conversation` | Hover → **⋮**, read-only. |
| Prompting guidance in the product | covered | `docs/ai/prompting.md` | Placeholders, dashboard ideas and examples, tour step **AI Agent**, tips, prompt shape, example table. |

### features-code-ship

| Feature | Status | Page(s) | Note |
|---|---|---|---|
| **Code mode** (`<>` button) | covered | `docs/code/code-mode.md#open-code-mode` | `<>` next to **Settings**, **Back**, **Open code mode** / **View Code**, tabs, preview modes (**Play · App**, **Play · File**, **Run**), leave dialog (**Save** / **Discard** / **Cancel**). |
| **Code editor** | partial | `docs/code/code-mode.md#edit-code`, `#fix-errors-and-conflicts`, `docs/code/vs-code.md` | Find / replace, autocomplete, go to definition, error banner and **Keep mine** / **Reload** are explained. Not said: the details panel of a text tab opened outside code mode (**Show file content**): **Font size**, **Word wrap** and the **Compile** / **Compiled** button. Only its **Open in VS Code** button is named. P3. |
| **Code and design sync** | covered | `docs/code/index.md#how-code-and-design-stay-in-sync`, `docs/code/code-mode.md#save-your-edits` | `@NowaGenerated`, what Nowa rewrites, formatter width, refused edits that would leave a syntax error. |
| **Your own code on the board** | covered | `docs/code/limitations.md`, `docs/code/custom-code.md` | Placeholders, what Nowa skips with "try instead" table, **Kept as code**, Problems messages, **Run**. Minor (P3): the `@CustomWidget` annotation is not named, only `@CustomFunction`. |
| **Hybrid approach** (VS Code / IDE + Nowa) | covered | `docs/code/vs-code.md` | **Open in VS Code**, **VS code Path**, what syncs and when, more than 10 changed files re-read the project. Badges Desktop app and Local projects. |
| **Import Dart code...** | covered | `docs/code/custom-code.md#import-dart-code` | **From file**, **Import** vs **Import as Custom code**, where each kind of declaration is filed, same-name replacement warning. |
| **Files panel** | covered | `docs/code/files.md` | Board vs code mode table, markers (`*`, problem count, Git letters), hidden items. |
| **Add to library** / **Add board** / **Import asset** / **New Folder** | covered | `docs/code/files.md#add-files` | All seven menu items. The right-click **New Folder** / **Paste** belongs to the unreachable grid view (`left-out.md`). |
| **Rename, move, delete files** | covered | `docs/code/files.md#rename-move-and-delete-files` | Menu table, drag rules, `lib/main.dart` protected, undo while the panel has focus. |
| **Packages** (App Settings) | covered | `docs/code/packages.md` | Add, change version, remove, dialog errors, **Add Missing Dependencies**, `flutter pub get` in local projects. |
| **pubspec and dependency rules** | covered | `docs/code/packages.md#how-nowa-loads-your-packages`, `#edit-pubspecyaml-yourself` | Plain pub.dev `dependencies` only, dev-dependency message, **Pub get**. |
| **Code problems and Fix** | covered | `docs/test/problems.md` | Source menu, **Which code Nowa checks**, **Fix** table, problems without a button, **Run Code Check**. |
| **Git panel** | covered | `docs/code/git.md#open-the-git-panel` | Badge, branch name in the status bar, **Create Git Repository...**, plan gate, not in the playground. |
| **Commit** | covered | `docs/code/git.md#commit-your-changes` | **Commit All** / **Commit Staged**, staging, **Create Commit** dialog, **Add Files...**, identity. |
| **Discard changes** | covered | `docs/code/git.md#review-or-discard-changes` | "You can't undo it" warning. |
| **Diff view** | covered | `docs/code/git.md#review-or-discard-changes` | **Previous change** / **Next change**, **Staged** / **Unstaged** badge. |
| **Sync**, **Push**, **Pull**, **Publish Branch** | covered | `docs/code/git.md#sync-with-github` | ↑ / ↓ counts, no-remote behaviour, five-minute check, credential errors. |
| **Branches** | covered | `docs/code/git.md#work-with-branches` | Switch with **Bring my changes**, **New Branch**, remote branch, merge, delete. |
| **Resolve Conflicts** | covered | `docs/code/git.md#resolve-conflicts` | **Accept Local** / **Accept Remote** per file, **Conflicts** section, swapped panes in local projects. |
| **Commit History** | covered | `docs/code/git.md#browse-and-undo-history` | **Copy SHA**, **Undo Commit**, **Revert Commit** and their limits. |
| **Manage Remotes** | covered | `docs/code/github.md#connect-a-repository` | **Create GitHub Repository**, **Private**, **Add Existing Repository**, **Disconnect**, **Grant Permission**. |
| **GitHub Integration** (**Connect GitHub**) | covered | `docs/code/github.md#connect-github` | **Waiting for Authorization...**, two-minute timeout, **Manage**, plan gate. |
| **Identity** (**Set Identity**) | covered | `docs/code/github.md#set-your-git-identity` | |
| **Legacy Remote Credentials** / **External Local Credentials** / SSH | covered | `docs/code/github.md#legacy-remote-credentials`, `#local-credentials-and-ssh` | Desktop app badge, ssh-agent and default keys, fix table. |
| **Clone from GitHub** | covered | `docs/code/import.md#clone-from-github` | **Search repositories**, **Local-only**, **Fix** buttons, plan gate. |
| **Run** button and **Run on** menu | covered | `docs/test/run.md#choose-where-to-run`, `docs/test/devices.md` | Status dot, **Hide**, Ctrl/Cmd + P, web app shows **iOS & Android devices**. |
| Embedded preview (Nowa Run / App Run) | covered | `docs/test/run.md` | Toolbar table, QR code, localhost, error-screen table, "Restart failed" card, Flutter SDK message. |
| **Add web support** | covered | `docs/test/run.md#fix-a-preview-that-wont-start` | Also the **Nothing to run** case and the failure message. |
| Instant Play vs Run | covered | `docs/test/index.md`, `docs/test/instant-play.md`, `docs/code/limitations.md` | Comparison table. |
| Run on devices and emulators | covered | `docs/test/devices.md` | Desktop app badge, **DEVICES**, **START AN EMULATOR**, hot restart, Xcode link. |
| Local cache | covered | `docs/test/devices.md#run-a-cloud-project-on-a-device` | Three actions, 14-day cleanup. |
| **Local Setup** / **Set up local environment** | covered | `docs/get-started/desktop-app.md#setting-up-flutter-sdk` | **Set up automatically** steps, **Flutter SDK Path**, **Default Projects Path**, **VS code Path**, Xcode on macOS. |
| **Console** (**Problems** / **Logs**) | covered | `docs/test/run.md#read-the-logs`, `docs/test/problems.md` | **Pub get**, **Clear**, move and resize. |
| **Deploy** button and menu | covered | `docs/publish/index.md#start-a-deployment` | Rows and statuses, **Set up**, **Premium**, **Advanced build settings**. The "Claim your Nowa Launch Benefits" row is in `left-out.md`. |
| **Deployment** settings page | covered | `docs/publish/index.md`, `docs/account/project-settings.md`, `docs/publish/builds.md` | **Android** / **iOS** / **Web** tabs, local-project message with **Sync to cloud**, plan lock with **Upgrade**. |
| Web deployment | covered | `docs/publish/web.md` | Publish, update, **Deactivate**, **Download Files**, failure bar with **Fix with AI**, "Your Project has Problems" dialog. |
| **Custom Domain** | covered | `docs/publish/web.md#use-your-own-domain` | **Set**, **DNS**, **Verify**, **Also www.**, plan gate. |
| Android builds | covered | `docs/publish/android.md` | **Debug mode**, **Signing Key** (generate or upload), **SHA-1** / **SHA-256**, release build, artifacts. |
| iOS builds | covered | `docs/publish/ios.md` | **Distribution Certificate**, **App Store Connect** credentials, **Generate anyways** warning, code-signing failure steps. |
| Build history and build details | covered | `docs/publish/builds.md` | **Start New Build**, **Init Repository**, statuses, **Latest Build**, **Artifacts**, **Steps**, **Explain with AI**, **History**. |
| **Project Sync** | covered | `docs/code/local-projects.md#link-a-cloud-copy-with-project-sync` | **Clone to Cloud** / **Clone to Local**, **Sync from Cloud** / **Sync from Local**, **Sync Warning**, **Unlink Project**. |
| Code download | covered | `docs/publish/download-code.md` | **Compress Project**, plan allowance, local projects get **Open in VS Code**. |
| **Share Preview** | covered | `docs/test/share.md#share-a-preview` | **Public** / **Private**, **Make public** confirmation, QR code, `?screen=` link, local-project message. |
| **Public project** link | covered | `docs/test/share.md#open-your-project-to-others`, `docs/account/project-settings.md#share-your-project` | The four **Link options**, **Cover**, visitors work in a private copy. |
| App details for store builds | covered | `docs/publish/index.md#app-details`, `docs/account/project-settings.md` | Names, **Bundle Identifier** rule, **Build version** / **Build number**, **App Icon**. |
| **Permissions** | covered | `docs/account/project-settings.md#set-permissions` | Both lists, iOS usage text, "manifest is rewritten" warning. |
| Mobile browser **Build** and **Run** pages | covered | `docs/get-started/mobile.md` | **Build** tabs, **Play your app** sheet, **Run real app**, **Launch App**. |

## Gap fixes (applied)

Applied 2026-10-07 against `/home/user/nowa-master` (v3.12.5). 13 of the 14 gaps are closed: 9 docs pages edited, 3 rows appended to `left-out.md` (G7, G13, G14). G11 was skipped because the code does not back it (reason below). Nothing was committed. Code refs are relative to `/home/user/nowa-master`; the "Totals" and table rows above describe the audit snapshot and were not changed.

- **G1** `docs/integrations/rest-api/index.md`: new H3 "Rename, remove and search" at the end of "Add a request", four bullets. **Rename** (request, right-click, inline text box, <kbd>Enter</kbd>); **Remove** a request (no confirmation); **Remove** a collection (references list first when something uses it, then "Are you sure you want to delete ...?"); the **Search...** box (filters requests of every collection by name or endpoint). Refs: `packages/data/lib/src/common/data_request_tile.dart:35-47,55-56` (Rename/Remove; `onRemove` records the removal without asking), `packages/data/lib/src/api/views/api_outline/api_outline_tiles.dart:35-57` (collection **Remove** only), `packages/core/lib/src/actions/block_actions.dart:10-52` (the in-use dialog opens only when references exist, `:31`), `packages/core/lib/src/file_system/actions/file_actions.dart:121-183` (`RemoveFileAction`: always asks, `:151-153`), `packages/core/lib/src/widgets/nowa_dialogs.dart:6-24` (**Cancel** / **Yes**), `packages/core/lib/src/widgets/rename_declaration_field.dart:139-147` (Enter submits), `packages/data/lib/src/api/views/api_outline/api_outline.dart:60-84,283` and `packages/nowa_ui/lib/src/components/nowa_widgets.dart:298` (search filter, hint **Search...**). Read, not run: a collection that other code references may show the in-use list twice (once from the tile, once from `RemoveFileAction`).
- **G2** `docs/get-started/editor-tour.md`: new H2 "Resize and close panels" (three bullets: side panel divider and close; docked bottom panel for an API request, a Supabase function test and a Git commit's details, resize by the top divider, close with ×; floating **Console** and **Action History**, move by title bar, resize by edge or corner, close with ×), plus "It reads **Exit Fullscreen** while the editor is fullscreen." in the sidebar paragraph. Refs: `lib/project/project_page.dart:588-609` (side panel 340/200, bottom panel 400/150), `packages/core/lib/src/panels/panel.dart:625-700` (divider drag, resize cursors), `packages/core/lib/src/panels/bottom_panel_widgets.dart:12-27` (× closes), openers `packages/data/lib/src/api/provider/api_provider.dart:41`, `packages/data/lib/src/api/views/api_outline/api_outline.dart:336`, `packages/data/lib/src/supabase/supabase_manager.dart:306`, `packages/data/lib/src/supabase/ui/func_test_section.dart:38,143`, `lib/project/panels/git_panel/git_commit_history_panel.dart:295,631`; floating panels `packages/core/lib/src/providers/panel_provider.dart:299-330,521-565` (title bar moves, edges and corners resize, × closes), `packages/core/lib/src/actions/undo_actions.dart:44-54` (**Action History** is a floating panel); `lib/project/side_bar.dart:155-158` (**Enter Fullscreen** / **Exit Fullscreen**, web only).
- **G3** `docs/code/code-mode.md` ("Edit code"): one paragraph on **Show file content** outside code mode: the details panel has **Font size** (13), **Word wrap** (on) and **Compile** (reads **Compiled**, greyed out, when nothing is waiting). **Open in VS Code** is left to `vs-code.md`. Refs: `lib/project/panels/files_panel/file_context_menu.dart:82-90`, `packages/core/lib/src/widgets/code_editor/text_editor.dart:179,185,209-226,243-256` (details panel only when not in code mode; options are per tab), `packages/core/lib/src/widgets/code_editor/code_editor_details.dart:19-37,58-112`, `packages/core/lib/src/widgets/code_editor/code_options.dart:140,210-235` (`compiled`, `compile()` writes the file); defaults 13 and wrap on confirmed in `re_editor-0.10.0` (`lib/src/_code_editable.dart:3`, `lib/src/code_editor.dart:504`).
- **G4** `docs/integrations/index.md`: new H2 "What Nowa doesn't include" (one sentence: no built-in integration for secure/encrypted storage, OneSignal or analytics, in-app purchases other than RevenueCat, or Sign in with Apple in the user's app; pointer to Add packages). `docs/logic/actions.md` ("Save values on the device"): one line, "Nowa has no secure (encrypted) storage option for these values." Refs: `packages/core/lib/src/interpreter/packages/dart_package.dart:61-91` (`SupportedPackages.all` and `defaultPackages` hold none of them); grep of `lib/` and `packages/` (no `flutter_secure_storage`, `onesignal`, `firebase_analytics`, `mixpanel`, `in_app_purchase`); `sign_in_with_apple` appears only for signing in to Nowa itself (`packages/core/lib/src/services/user_service.dart:11,136`, `packages/core/pubspec.yaml:45`, `lib/auth/auth_widgets.dart:534`); user apps use plain `SharedPreferences.getInstance()` (`packages/core/lib/src/file_system/templates/common/main_dart_template.dart:30`). Firebase providers are Email/Password, Google and Phone only (data research).
- **G5** `docs/account/workspaces.md`: one bullet under "How workspaces work": no comments, no live co-editing, and the project menu has no option to duplicate a project. "Transfer" is settled by leaving it out: **Move to workspace...** exists and is already on this page, and the code has no ownership-transfer feature (grep for "transfer" finds none), so the research word had no clear meaning. The duplicate claim is limited to the project menu because a guest's **Save to keep changes** does copy a public project (`lib/guest/guest_save.dart:8-14`). Refs: `packages/nowa_ui/lib/dashboard/projects_grid.dart:291-330` (menu: **Open in safe mode**, **Move to workspace...**, **Upload to cloud**, **Remove from list**, **Delete**), `lib/dashboard/projects_view/move_project_dialog.dart:33-58`; no comment or co-editing code found (grep for collaboration, presence, comment and websocket code outside the AI chat).
- **G6** `docs/account/account-settings.md`: one sentence after the group table (single dark look, no light/dark switch, no interface-language setting) and a pointer to Create and edit themes, because "dark mode" can also mean the app's own themes. Refs: `packages/nowa_ui/lib/src/globals/theme_provider.dart:14-23` (defaults to `darkTheme`; `updateTheme` has no callers anywhere), `lib/main.dart:112`, `packages/nowa_ui/lib/src/globals/themes.dart:6-7` (a `lightTheme` exists but is never applied), `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:32-35` (**Editor Settings** has only **Local Setup** and **Git**); no `.arb` or locale code.
- **G7** `_rewrite/left-out.md`: row appended (ai, Free Weekend **FREE** pill and level badges, time-limited promotion). Refs: `packages/ai/lib/src/ui/chat_panel/free_weekend_button.dart:13-98`, `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:155`, `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:1178,1189-1210`, `packages/ai/lib/src/models/free_weekend_model.dart:3-29`, `packages/ai/lib/src/ai_manager.dart:112-132`. Not changed: `docs/account/plans-and-usage.md`.
- **G8** `docs/get-started/editor-tour.md`: the Save button bullet now lists **Save every** (**10 seconds**, **20 seconds**, **30 seconds**, **1 minute**, **5 minutes**), and the **Nowa logo** row names the leave dialog buttons (**Cancel**, **Close** leaves without saving, **Save and close**). Refs: `packages/core/lib/src/project/saving_service.dart:15-16` and `lib/widgets/save_options_popup.dart:14-19,65-67`, `packages/core/lib/src/dialogs/unsaved_dialog.dart:35-88`, `lib/project/top_bar.dart:231-240`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:82` (the logo calls `openHome`).
- **G9** `docs/integrations/rest-api/index.md`: **JSON** row gains the ⋮ menu (**Wrap**, **Compress**, **Prettify**, **Copy**); **form-data** row gains the value types (**String**, **int**, **double**, **bool**, **MultipartFile**), **Connect**, and the **filename** / **Bytes** fields of a file row; a short paragraph in "Test a request" for **Upload File** (shown when the request source contains `MultipartFile`; its bytes fill the request's `Uint8List` / `List<int>` parameters for the test only). **DOWNLOAD** stays out (P35). Refs: `packages/core/lib/src/model_generator/json_editor.dart:139-170` (menu, `Icons.more_vert_rounded` at `:169`), `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_body/form_data.dart:94-119,149,160`, `.../api_request_body/api_request_body.dart:110` (**Add +**), `packages/data/lib/src/common/widgets/binary_field.dart:16`, `packages/data/lib/src/api/views/api_panel/api_test_section/api_test_values_panel.dart:27-31`, `packages/data/lib/src/api/model/test_api_func_provider.dart:84-99`.
- **G10** `docs/integrations/firebase/connect.md`: the "Packages and build files" row now says the iOS minimum version is at least 15.0 (set by `cloud_firestore`), like the Google Maps and RevenueCat pages say for 14.0. Refs: `packages/core/lib/src/interpreter/packages/integrations/firebase_package_config.dart:40-45`, `packages/data/lib/src/firebase/firebase_manager.dart:105` (connect registers `cloud_firestore`), `packages/core/lib/src/interpreter/packages/package_service.dart:232` (`onPackageAdded`), `packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:133-135,266-269,323` (highest `minIosVersion` wins; Podfile rewritten), `packages/core/lib/src/file_system/templates/ios/podfile_template.dart:10-14`.
- **G11 skipped.** The annotation exists (`packages/nowa_runtime/lib/src/annotations.dart:14-19`, registered at `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:22,406-420`), but the code does not back "the widget counterpart of `@CustomFunction`" in 3.12.5. `@CustomWidget`'s arguments are read only when a widget class is already being loaded as custom code (`packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:586-596`, reached with `loadCustomCode` off or after a load failure); `visitClassDeclaration` and `_createClass` never look for the annotation, so it does not switch a widget to custom code. `CustomWidgetDecl.preview` is stored (`packages/core/lib/src/interpreter/declaration_hybrid.dart:182-203`) but never read except by `annotationSource` (`:219-230`), which nothing calls. A custom widget is always drawn as the blue placeholder with its name (`:50-72`). Documenting `preview` for widgets would promise board behavior that does not exist, so nothing was written. Worth a line in `product-issues.md` or a decision to document it once the product wires it up (the in-repo note `docs/features/hybrid approach.md` lists it as a plan with open boxes).
- **G12** `docs/test/share.md#what-people-see-in-a-preview`: two additions. The **Custom** tab sentence now names **Safe areas** (**Left**, **Top**, **Right**, **Bottom**). Then the "Unattached global states" card (what it says, **Attach all** attaches and refreshes the preview, link to the attach section of `logic/global-state.md`). Refs: `packages/designer/lib/src/play_mode/play_mode_settings.dart:106-196` (Custom tab), `packages/device_preview/lib/src/views/tool_panel/sections/subsections/custom_device.dart:73-355` (**Screen**: **Width**, **Height**, **Pixel ratio**; **Safe areas**: sliders 0 to 128), `packages/device_frame/lib/src/frame.dart:61-85` (safe areas become the app's `MediaQuery` padding), `packages/designer/lib/src/play_mode/play_mode_warning.dart:56-66,127-155`, `packages/core/lib/src/project/env_services/global_state_service.dart:55-86`, `packages/designer/lib/src/play_mode/play_mode.dart:201-204` (cards only for owners and editors, not in full screen). Open point: whether **Attach all** in a shared preview is saved to the project was not checked, so the page only says it attaches and refreshes.
- **G13** decided: `_rewrite/left-out.md` row appended (not a docs sentence). The dashboard prompt box builds this link itself and does the same thing, no screen offers it, the parameters are not a published contract (the old `plan=true` alias is still read), and opening it creates a project and sends the prompt. Refs: `lib/router.dart:277-292`, `lib/dashboard/create_new_project/prompt_to_app_page.dart:17-72`, `lib/dashboard/dashboard_page.dart:209-211`; mode and tier values via `AiMode.tryParse` and `AgentTier.tryParse` (`lib/project/project_page.dart:49-50`).
- **G14** reconciled in `_rewrite/left-out.md`: new editor-shell row for the New UX **Debug** panel and **More panels** menu saying `docs/account/project-settings.md` names them in one sentence and describes nothing more, which settles the code-ship "Debug" side panel row above. The docs row was not touched. Refs: `lib/project/side_bar.dart:93-98,251,339`, `lib/project/panels/testing_panel.dart:6-39`, `lib/project/top_bar_mapper.dart:56-62`.
