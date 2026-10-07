# Documentation coverage audit

Status: IN PROGRESS (written incrementally; sections are filled one research file at a time, `(pending)` = not audited yet).

Method: every bullet of the `## Summary` of each `_rewrite/research/features-*.md` was checked against the pages under
`/home/user/docs/docs/` (excluding `new/` and `legacy/`): grep for its UI label(s), then read the hit to confirm the
feature is explained, not just mentioned. No docs page was edited.

Statuses: `covered` (explained, the reader can use it), `partial` (mentioned, but something the reader needs is
missing, named in the Note), `missing` (not in the docs and not in `left-out.md`), `left out` (listed in `left-out.md`).

The task said "10 files" but only 9 `features-*.md` files exist (account-projects, editor-shell, designer-core, widgets,
theme-assets, logic, data, ai, code-ship). All 9 were audited.

## Totals

Summary bullets of the 9 research files (one row each). `left out` = listed in `_rewrite/left-out.md`.

| Research file | Features | covered | partial | missing | left out |
|---|---|---|---|---|---|
| features-account-projects | 64 | 62 | 0 | 2 | 0 |
| features-editor-shell | 35 | 32 | 2 | 0 | 1 |
| features-designer-core | 46 | 46 | 0 | 0 | 0 |
| features-widgets | 11 | 11 | 0 | 0 | 0 |
| features-theme-assets | 29 | 29 | 0 | 0 | 0 |
| features-logic | (pending) | | | | |
| features-data | (pending) | | | | |
| features-ai | (pending) | | | | |
| features-code-ship | (pending) | | | | |
| **Total** | **185** | **180** | **2** | **2** | **1** |

Supplementary checks (not in the totals above): features-widgets: 77 covered.


## Gaps to fix

_(filled at the end)_

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

_(pending)_

### features-data

_(pending)_

### features-ai

_(pending)_

### features-code-ship

_(pending)_
