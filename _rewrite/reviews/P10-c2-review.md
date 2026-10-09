# P10-c2 review: account, reference, guides and troubleshooting pages updated to Nowa 3.13 (writer W30c)

Verifier: non-author agent. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). Baseline for "what changed":
`git diff 9844ed6 -- <page>`; product baseline `b84bfdafd` (3.12.5, in `/home/user/nowa`, used for `git diff b84bfdafd 3cb32031c -- <file>`).
Code refs are `path:line` in the 3.13 tree. Tools: grep for exact labels; a link and anchor checker over the 15 pages.

## Summary

Pages checked: **15** (account 4, reference 6, guides 3, troubleshooting 2), each in its own section below.
Claims checked: about **110** claims in text that 3.13 changed, one by one against `3cb32031c` (rows in the tables below; a row can bundle a key pair or
a label group), plus about **240** labels, keys and steps in unchanged text on the same pages, grepped or taken from the 3.12.5..3.13.0 diff (marked "not re-derived").
Fixed: **8** (in 5 pages), removed: **0**, plus 3 wording changes (6 pages edited in all). Open issues: 5 (end of this file).

Fixes, most serious first:
1. `reference/widgets/index.md`: the **Floating Button**, **App Bar** and **Drawer** rows said "Drop it on a screen and it goes into the screen's slot". The deepest
   opaque drop host wins, so the **Stack** that fills an **Empty Page** body takes the drop, and the live capture saw the same (`ui-diffs-3.13.md` row 12). Rows now point at the
   slot in **Details** > **Screen** and link `navigation.md#screen-parts`. The writer had fixed `navigation.md` but not these rows (3 fixes).
2. `reference/shortcuts.md` "Library search": the first row said ↓ moves "from the search to the first result". While you type, the first result is already highlighted
   (`library_panel.dart:241`), so the first ↓ lands on the second. Row reworded (1 fix).
3. `reference/widgets/navigation.md`: "the dialog titled **Search for a widget**" is a search-box hint, not a title (now "the dialog with the hint ..."); the drag
   sentence now says what the code does (a drag fills the slot only where no group is under the pointer; the **Stack** of an **Empty Page** screen takes it), the same
   wording as `design/screens.md` (2 fixes).
4. `reference/widgets/media.md`: "drag a file from **assets**" pointed at the old Files section; now the **Assets** chip of the Library (1 fix).
5. `account/projects.md`: list rows show the edit time only in a window of 600 px or more (`projects_grid.dart:179`); the example package name `docs_capture_notes` (the
   capture sandbox's project) replaced by `my_app`; the paragraph tightened (1 fix, 2 wording changes).
6. `troubleshooting/known-issues.md`: "in any app" reworded to "on any platform" (wording change).

The 3.13 text the writer produced held up: all key bindings, Mac key order, the sheet's group contents, sidebar numbers, the Back/Forward and Boards behavior, the
Library keys, the banner limit, the Download Nowa buttons, the Linux preview pane and update dialog, and the Firestore finding (re-derived: no reachable entry point).
No price, credit amount or plan limit on any page. Nothing on the pages still says "Widgets panel", "Move Up/Down/To Top/To Bottom", "No Linux desktop app", or
"macOS and Windows" for the desktop app (the one remaining "on macOS and Windows" in `troubleshooting/index.md` is the in-app update path, which is right).

## Link, anchor and syntax checks

- Outgoing: **307** links, anchors and images in the 15 pages (relative paths, `#anchors`, `/img/` files): **0 broken**. Every changed target resolves, among them
  `design/library.md`, `design/theme-styles.md#colors-from-theme-extensions`, `integrations/firebase/firestore.md#test-a-query` and `#add-collections-and-queries`,
  `test/run.md#choose-where-to-run`, `get-started/desktop-app.md#install-on-linux`, `code/packages.md#page-indicator-migration`, `reference/widgets/navigation.md#screen-parts`
  and `#page-view`.
- Inbound: **143** links from the rest of `docs/` into these pages (with anchors such as `known-issues.md#firebase-on-windows`): **0 broken**. **42** redirects in
  `redirects.js` that end on these pages (widget anchors, `/troubleshooting/known-issues#firebase-on-windows`): 0 broken anchors. No link to the deleted
  `#no-linux-desktop-app` anywhere (docs, `redirects.js`, `sidebars.js`).
- Old anchor `{#find-a-widget-in-the-picker}` is kept on the renamed heading; the redirect and widget anchors (`<Anchor id=...>`) are unchanged.
- All 15 pages compile as MDX (syntax check with `@mdx-js/mdx`, heading ids stripped as Docusaurus does); no build was run.
- Style lint: no H1 in a body, no `---` rule, at most two admonitions per page, no hype words, no emoji, CAPTURE placeholders well formed (`account-workspaces-1/2`,
  `account-help-1`, `account-index-1`, `account-projects-1/2`, `reference-forms-2`, `reference-navigation-2`, `integrations-firebase-firestore-1`).

## docs/account/workspaces.md

Changed in 3.13: one bullet of the **View Only** list (the Files panel line).

| claim | verdict | code ref | note |
|---|---|---|---|
| In code mode, right-clicking a file in the **Files** panel only offers **Copy as path** (View Only) | ok | `lib/project/panels/files_panel/files_tree_host.dart:34` (`_viewOnly = gProject.isViewOnly`), `:440-493` (`_rowEntries`: Remove file / Rename / Cut under `movable = !_viewOnly && ...`, Paste under `!_viewOnly`, **Copy as path** always, **View in folder** only `gProject.project.isLocal`, **Show file content** under `!_viewOnly`); `packages/core/lib/src/providers/project_provider.dart:578` (`isViewOnly` = role is viewer) | A View Only role exists only for a project in a workspace; workspaces hold cloud projects only (page line 13), so **View in folder** never shows for the role. |
| The **Files** panel is reachable in code mode (so the bullet's "In code mode" is the right qualifier) | ok | `lib/project/side_bar.dart:44-53` (`if (codeMode) SidebarIconData(name: "Files" ...) else ... "Library"`) | no `isViewOnly` gate on the code-mode toggle or the panel |
| Old text "the **Add** (or **Import**) button is turned off" is gone and nothing else on the page says "Widgets panel", "Files panel" outside the changed bullet | ok | grep of the page | no 3.12.5 wording left |
| Unchanged View Only bullets: **View only** toolbar label, **Export as image...**, status bar save icon hidden, code editor read-only, **Project Details** hides **Sharing** | ok | `packages/designer/lib/src/widgets/designer_tools.dart:208-218` (`Text('View only')`), `packages/designer/lib/src/menus/widget_context_menu.dart:11-16` (View Only menu = **Copy**, **Export as image...**), `lib/status_bar.dart:42`, `packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:181`, `packages/core/lib/src/settings/project_detail_settings.dart:89` | unchanged in the 3.12.5..3.13.0 diff |
| 29 labels and messages in the other sections (Personal, "Projects not in a workspace", Create workspace, Workspace Name, "Name cannot be empty", Move to workspace..., Workspace settings, "teammate@company.com", Cancel invitation, Resend invitation, "Please enter a valid email address", "Invitation accepted!", Remove member, Save changes, Leave workspace, Delete workspace ...) | ok | `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:486,505`, `lib/dashboard/side_bar/workspace_widgets.dart:34,80,137,227,289,351,440`, `packages/core/lib/src/settings/member_settings.dart:267,340-341`, `packages/nowa_ui/lib/dashboard/projects_grid.dart:309`, `lib/invitation_page.dart:28` | the 3.12.5..3.13.0 diff of these files changes only button widgets (`NButton`), no label |

Unproven umbrella sentence, left as written: "the editor is read-only" (line 90). The Library never reads `isViewOnly`
(`lib/project/panels/library_panel/library_host.dart`, `packages/nowa_ui/lib/library/library_panel.dart`: `grep isViewOnly` finds nothing), so whether a
viewer can use **Add**, **Rename**, **Delete** or **Insert** there is not shown by the code. The page lists specific behaviors, none about the Library, so
nothing is claimed that the code contradicts. Needs a live check (writer note 2, product issue P-W30c-2).

Fixed 0, removed 0. Length 964 words by `wc -w` (tables included): fine.

## docs/account/help.md

Changed in 3.13: the banner sentence in "Stay up to date".

| claim | verdict | code ref | note |
|---|---|---|---|
| At most two banners show at a time | ok | `packages/core/lib/src/announcements/widgets/notification_banner.dart:9` (`maxVisible = 2`), `:22` (`banners.take(maxVisible)`); both call sites use the default: `lib/project/banners/nowa_banner_host.dart:14`, `lib/dashboard/dashboard_page.dart:367,370` | 3.12.5 had 3 (`git diff b84bfdafd 3cb32031c`) |
| An announcement past its expiration date no longer shows as a banner | ok | `packages/core/lib/src/announcements/announcement_provider.dart:22-23` (`a.isBanner && !a.isExpired && ...`), `announcement_service.dart:122` (`isExpired`: `expirationDate` is before now) | the check is on the banner list only; the bell list is unchanged, and the sentence says "as a banner" |
| Banners sit at the bottom right | ok | `lib/project/project_page.dart:138` (`Positioned(bottom: 25, right: 60, ...)`), `packages/nowa_ui/lib/dashboard/dashboard_view.dart:53` (`bottom: 16, right: 16`, not on a small layout) | pre-existing wording; on a phone-sized dashboard the banner is inline at the top (`projects_view.dart:115`). The sentence says banners "can" appear there, so it stays |
| Close button tooltip **Dismiss announcement** | ok | `notification_banner.dart:76` | unchanged |
| 15 other labels (Hey There, Your tickets, Report an issue, Chat with support, Hire an Expert, Book a Free Consultation, Become an expert, "Include a snapshot of the current project", "Type a detailed message...", "Open a project to report an issue", **Notifications** tooltip, "No notifications", "How much would you rate Nowa?", **Submit Feedback**, Learning Resources) | ok | `packages/nowa_ui/lib/components/support_dialog.dart:205,340,404,473,509-512,520,540`, `packages/nowa_ui/lib/hire_expert_dialog.dart:57,83,88`, `packages/nowa_ui/lib/src/components/notification_bell.dart:79,128`, `packages/core/lib/src/dialogs/feedback_dialogs.dart:46`, `content_dialogs.dart:49` | the 3.12.5..3.13.0 diff of these files is `NButton` restyle only |

Fixed 0, removed 0. Length 867 words by `wc -w`: fine.

## docs/account/index.md

Changed in 3.13: the **Download Desktop App** row.

| claim | verdict | code ref | note |
|---|---|---|---|
| **Download Nowa** has download buttons for macOS, Windows and Linux | ok | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8` (`_showLinuxDownload = true`), buttons **MacOS** `:52`, **Windows** `:64`, **Linux** `:84` | the button labels are **MacOS**, **Windows**, **Linux**; the cell writes the systems in running text ("macOS"), which is fine |
| A line names the version you get | ok | `download_nowa_dialog.dart:94` (`'Download Nowa version: ${info.version}'`) | |
| A button is greyed out when there is no download for that system | ok | `download_nowa_dialog.dart:53,65,85` (`onPressed: info.<system>Link != null ? ... : null`) | a disabled button; a failed version lookup shows "No download available at the moment" instead of the buttons (not on the page, not needed) |
| **Download Desktop App** shows in the web app only | ok | `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:183-188` (`if (kIsWeb)`) | |
| 22 other labels in the sidebar table, the main-area list and the dialogs list (Notifications, Create workspace, RECENTS, Upgrade your plan, Adjust Plan, Invite a Friend, Hire an Expert, Learning Resources, Settings, **Logout** tooltip, What do you want to build?, Search..., On this device, **New project**, A new version of Nowa is available, "Question 1 of 4", ...) | ok | `dashboard_side_bar.dart:151,166,186,201,210,239,360,505`, `describe_app_panel.dart:591`, `projects_view.dart:314,494`, `lib/dashboard/overlays/update_overlay.dart:116`, `survey_overlay.dart:183` | no label differs in the 3.12.5..3.13.0 diff |
| "The Linux" word elsewhere: nothing on the page says "macOS and Windows" | ok | grep | |

Fixed 0, removed 0. Length 731 words: fine.

## docs/account/projects.md

Changed in 3.13: the paragraph under "Find a project" about card text (the writer's addition from the capture agent's `ui-diffs` row 11; a page omission, not a 3.13 change).

| claim | verdict | code ref | note |
|---|---|---|---|
| Cards show a cover image, or the project's first letter, and the name | ok | `packages/nowa_ui/lib/dashboard/projects_grid.dart:274-282` (`ProjectCover`: initial when no cover or the image fails), `:106` (title) | |
| The line under the name is the project's package name when it differs from the name | ok | `projects_grid.dart:79` (`project.subtitle == null \|\| hovering ? editedLabel : subtitle`), `lib/dashboard/dashboard_mapper.dart:56-62` (`title = friendlyName ?? name`, `subtitle: hasFriendlyName ? project.name : null`); local projects: `packages/core/lib/src/services/local_project_service.dart:26-27` (`friendlyName` = typed name, `name = generatePackageName(...)`) | For a cloud project the server sets `name`; the code cannot show that, but the live capture saw the package-style `docs_capture_notes` under the card (`captures/ui-diffs-3.13.md` row 11), and the page defines **Package Name** in "Name your project". The code's own comment calls this line "the folder name" (`projects_grid.dart:76`), the same value. The example `docs_capture_notes` (the capture sandbox's project) was replaced by `my_app` for a project called My App (`packages/core/lib/src/file_system/naming.dart:193-215`, `generatePackageName`: lowercase, spaces to underscores) |
| While you point at a card, or when the package name equals the name, the line shows "Edited 5m ago" style text | ok | `projects_grid.dart:79`, `dashboard_mapper.dart:84-103` (`Edited ${m}m ago`, `just now`, `yesterday`, ...) | |
| List rows show the name, a **Cloud** or **Local** badge and the edit time | fixed | `projects_grid.dart:176` (badge), `:179-186` (`if (!compact)` edit time; `compact` = window under 600 px: `packages/nowa_ui/lib/src/globals/responsive_utils.dart:55`) | the edit time is left out in a narrow window; page now says "unless the window is narrow" |
| **RECENTS** shows the edit time | ok | `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:403` (`subtitle: Text(project.editedLabel)`) | up to five projects: `dashboard_mapper.dart:7` |
| Labels **Cloud**, **Local** | ok | `projects_grid.dart:253` | |
| 30 other labels (New project menu, Clone from GitHub, Import project, Sort by, Load More, Open in safe mode, Move to workspace..., Upload to cloud, Remove from list, Delete, Project not found, Locate folder ...) | ok | `projects_grid.dart:300-330`, `projects_view.dart:324-333,434,549` | the 3.12.5..3.13.0 diff of `projects_grid.dart` and `projects_view.dart` is `NMenu`/`NButton` restyle only |

Fixed 1 (narrow-window caveat), plus two wording changes (the example package name; the paragraph tightened by about 10 words). Removed 0. Length about 1,400 words of body by my count (tables included): a long how-to, unchanged in size by the edits.

## docs/reference/shortcuts.md

Heavy 3.13 page: key order sentence, sheet paragraph and slip table, 5 General rows, 4 sidebar rows, 5 design rows, 2 mouse rows, the Pickers
intro and the new "Library search" subsection. Method: every key re-read from the binding maps, every sheet label from the sheet source, every
behavior from the action it reaches.

| claim | verdict | code ref | note |
|---|---|---|---|
| Mac tooltips and menus write modifiers in the order Control ⌃, Option ⌥, Shift ⇧, Cmd ⌘ (⇧⌘Z, ⌥⌘]); Windows and Linux "Ctrl, Alt and ⇧" in the same order | ok | `packages/core/lib/src/inputs.dart:27-37` (`ActivatorExtension.shortcut`: control, alt, shift, meta; `Ctrl `, `Alt `, `⇧`, `Win ` off the Mac); used for menus and tooltips at `packages/core/lib/src/widgets/menu.dart:68`, `lib/project/top_bar.dart:194`, `lib/project/side_bar.dart:424`, `packages/designer/lib/src/widgets/designer_tools.dart:63` | "Win" is left out on purpose: no binding uses the Windows key (`AdaptiveActivator`, `inputs.dart:23-25`, sets control off the Mac and meta on it) |
| The sheet has four groups **General**, **Tab Actions**, **Widgets**, **Designer**; **Tab Actions** holds **Back**, **Forward**, **Boards**; **Designer** holds **Add a widget**, **Go to a widget**; **Widgets** holds **Bring forward**, **Send backward**, **Bring to front**, **Send to back** | ok | `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:16-61` | exact label case checked entry by entry; the sheet also lists Next tab, Previous tab, Close current tab, Zoom In/out, Open selection in new file, Container, Text, Group/Ungroup, Delete (the page says it "leaves out many that are on this page", true) |
| Two sheet entries are wrong: **Show/Hide panels** (Ctrl/Cmd + `\`) is bound to nothing; **Group/Ungroup** (Ctrl/Cmd + G) only groups | ok | sheet `:49`, `:56`; no `backslash` binding anywhere (`grep -ri backslash --include=*.dart lib packages`: only string escapes); `packages/designer/lib/src/designer_setup.dart:20` (`keyG` -> `CreateGroupIntent`), `designer_actions.dart:46-56` (`CreateGroupAction`: `designer.group(...)` only) | the rows for **Open widget picker** and **Bring to front and Bring to back**, and the right-click **Move Up/Move Down** paragraph, are gone: the sheet now says **Add a widget** with K and gives each reorder its own keys (`:57-60`) |
| **Back** Ctrl+- / **Forward** Ctrl+Shift+-, Control on macOS too | ok | `lib/setup_general_actions.dart:37-38` (`SingleActivator(minus, control: true[, shift: true])`); sheet `:34-35` (control-key icon, not ⌘) | not `AdaptiveActivator`, so Control on every OS |
| **Back** goes to the editor you were in before, like a browser; Back and Forward keep your last 50 places | ok | `packages/core/lib/src/actions/tab_actions.dart:211-239`, `packages/core/lib/src/providers/navigation_history.dart:26` (`_limit = 50`), `:56-68` (`_record`, drops the oldest past the limit) | |
| The top-bar **Back**/**Forward** arrows do the same, grey out with nowhere to go, are hidden in code mode and the Run view where the keys still work | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271` (tooltips **Back** `⌃-`, **Forward** `⌃⇧-`; `onPressed: canGoBack ? ... : null`), `:338` (greyed icon); `lib/project/top_bar_mapper.dart:58-62` (`_leading`: code -> none, run open -> run tools, else breadcrumbs); the actions are registered whenever the editor provider exists and gated only by `canGoBack`/`canGoForward` (`tab_actions.dart:225,236`) | |
| Ctrl/Cmd+B opens the **Boards** list with its search ready; not in code mode or the Run view | ok | `lib/setup_general_actions.dart:35` (`OpenBoardPickerIntent`), `lib/project/panels/panel_actions.dart:28-40`, `packages/core/lib/src/panels/panel.dart:45-48` (`openBoardPicker` bumps `boardPickerRequests`), chip in the breadcrumbs only (`lib/project/top_bar_mapper.dart:78-130`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:257-272`) | known product issue P3: the key does nothing where the chip isn't shown; the page says so |
| Ctrl/Cmd+O is **Go to a widget**: in the designer it opens the Library with its search ready (field reads **Go to...**); in code mode **Search for a file** | ok | `packages/core/lib/src/actions/tab_actions.dart:29-38` (`!isCodeMode && library != null` -> open the **Library** panel, `focusSearch()`), `:39-50` (palette hint 'Search for a file'); `packages/nowa_ui/lib/library/library_panel.dart:739` (`_adding ? 'Add...' : 'Go to...'`) | |
| Ctrl/Cmd+K is **Add a widget**: opens the Library with its search ready (field reads **Add...**); Enter inserts the highlighted result | ok | `packages/designer/lib/src/actions/add_actions.dart:14-31` (switches the side panel to **Library**, `focusSearch(add: true)`), `packages/nowa_ui/lib/library/library_panel.dart:241` (first result highlighted as you type), `:527-542` (`_activate`: insert when `_adding` and no Ctrl/Cmd), `:622-656` | the picker dialog still opens during an interactive walkthrough (`add_actions.dart:20-21`); the page does not describe walkthroughs |
| Remove row: Delete on Windows/Linux, Backspace on macOS; files in **Files** (code mode), routes in **Router** | ok | `lib/setup_general_actions.dart:44` (`getRemoveKey()`: `packages/core/lib/src/inputs.dart:11-13`), `lib/project/panels/files_panel/files_panel.dart:42` (`RemoveIntent: RemoveFileAction()`) | |
| The Library has no Delete key; right-click a row and choose **Delete** | ok | `lib/project/panels/library_panel/library_host.dart:168` (menu entry **Delete**, no key hint), `:299` (a `RemoveFileAction` is bound but its `SelectionProvider` `_selection` is never filled: `:42,295` only; `RemoveIntent.selection` reads it, `packages/core/lib/src/actions/general_actions.dart:14-16`, and `RemoveFileAction` returns on an empty selection, `packages/core/lib/src/file_system/actions/file_actions.dart:139-140`); `packages/nowa_ui/lib/library/library_panel.dart:544-577` (`_onKey`) handles typing, ↑, F2, Esc, Enter only | the key reaches the Library's own action, which does nothing, so a selected board widget isn't removed by accident either |
| Undo areas include "the **Library**, **Files** (code mode)", each with its own history | ok | `lib/project/panels/library_panel/library_host.dart:39` (`Undo(debugLabel: 'Library')`, `:294,299` provides it and binds `UndoIntent`/`RedoIntent`), `lib/project/panels/files_panel/files_panel.dart:30` (`Undo(debugLabel: 'Files')`) | |
| Sidebar keys: Assistant 1, **Library** (**Files** in code mode) 2, Themes 3, Search 4 or Shift+F, Git 5, Outline 6, Api 7, Supabase 8; none for **Router**; no **Git** in the playground or as a guest, so later numbers drop one | ok | `lib/project/side_bar.dart:36-80` (list order; `:64` `if (!gProject.project.isSandboxed)` for **Git**; `isSandboxed` = mock or guest: `packages/core/lib/src/models/project.dart:164`), `lib/setup_general_actions.dart:43-62`, `lib/project/panels/panel_actions.dart:19-26` (`getIcons(codeMode:)`, default `showOutlinePanel: true`, so the numbers hold while the Outline floats), `packages/data/lib/src/supabase/supabase_plugin.dart:24` (the only `registerPluginPanel`) | the old **Files** 6 row is gone; in code mode **Files** takes slot 2 (`side_bar.dart:44-48`) |
| Reorder keys: **Bring forward** Ctrl/Cmd+] (one step later), **Send backward** Ctrl/Cmd+[ (one earlier), **Bring to front** Alt+Ctrl+] / Option+Cmd+] (last place), **Send to back** Alt+Ctrl+[ / Option+Cmd+[ (first place) | ok | `packages/designer/lib/src/designer_setup.dart:22-25` (`ReorderIntent(goNext, allTheWay)`), `packages/designer/lib/src/design/order_design.dart:49-54` (`_calcSlot`: all the way = `length - 1` or `0`, else slot +/- 1), `packages/designer/lib/src/actions/widget_actions.dart:52-62`; sheet `:57-60` | "later in the parent" = drawn in front in a Stack, so the closing sentence ("`]` brings a widget forward and `[` sends it back") holds |
| 14 other design-table rows (tool keys V, R, T; F; Ctrl+A; Ctrl+G; arrows 1 and 10 px; Ctrl+I; Ctrl+Shift+B opens **New Board**; Esc) | ok | `designer_setup.dart:17-19,26-54`; `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94` (title `New ${creatingText}`), `packages/designer/lib/src/actions/file_actions.dart:7-20` (`creatingText: 'Board'`) | unchanged by 3.13 |
| Mouse: Shift+click selects a range and Ctrl/Cmd+click toggles one item in **Files** (code mode) | ok | `packages/nowa_ui/lib/files/files_tree_view.dart:132-146` (`toggle` = meta or control, `range` = shift) | the Library has no multi-select (`library_panel.dart:_onTap`) |
| Pickers intro: **Search for a file** (code mode), the widget picker dialog, the template picker, **Add context** | ok | `tab_actions.dart:39-50`; `packages/core/lib/src/widgets/widget_picker.dart:131-150` (`showWidgetPicker` is a command palette); `packages/core/lib/src/widgets/command_palette.dart:34` (`addOverlay("palette")`) | |
| "Library search" table, Enter and Ctrl/Cmd+Enter: Enter opens when the field reads **Go to...** and inserts when it reads **Add...**; Ctrl/Cmd+Enter does the other | ok | `packages/nowa_ui/lib/library/library_panel.dart:527-542` (`_activate`: `open != null && _adding == flipped`, `flipped` = meta or control pressed), `:622-656` (`_onSearchKey`: Enter acts when `_searching \|\| _adding`) | Enter in an empty Go to... field does nothing (not claimed) |
| ↑ from the first row goes back to the search | ok | `library_panel.dart:554-557` | "first row" = first visible row |
| Esc clears the search; on an empty search it hands the keys back to the board | ok | `library_panel.dart:645-653` (`_search.text.isNotEmpty` -> clear, else `_leave()`), `:658-661` (`_leave`) | |
| Typing a letter, digit or symbol on a row jumps into the search | ok | `library_panel.dart:545-548` (call in `_onKey`), `:579-584` (`_typesText`: not with Ctrl, Cmd or Alt; not space), `:587-593` (`_typeIntoSearch`) | |
| F2 renames the row you are on; Esc puts the details card away | ok | `library_panel.dart:558-561,562-565` (`startRename`; `escape && _shown != null` -> `_dismiss()`) | |
| ↓ moves "from the search to the first result, then down the list" | fixed | `library_panel.dart:241` (a new query sets `_active` to `_firstSymbolRow()`), `:626-636` (↓ moves to the next result after the highlighted one) | with a query typed the first result is already highlighted, so the first ↓ lands on the second; row now says so |
| View Only: only copy, the two tab keys and Ctrl/Cmd+W work (unchanged line) | ok | `lib/setup_general_actions.dart:66-71,134` | |
| Pop-ups: Ctrl/Cmd+O and K don't open while the Shortcuts sheet or a picker is open | ok | `packages/core/lib/src/actions/tab_actions.dart:113-116` and `packages/designer/lib/src/actions/add_actions.dart:8-11` (`panels.overlays.isEmpty`); overlays are added only by `command_palette.dart:34` (every picker, including the widget picker dialog) and `shortcuts_cheat_sheet.dart:65` | the writer's note that an ordinary dialog is not an overlay is right; "picker" is the correct word |
| Run, chat, Circuit, code-editor and code-tabs tables (about 45 rows) | ok | `packages/nowa_run/lib/src/actions/actions_setup.dart:20-21`; no key change in the 3.12.5..3.13.0 diff of `nowa_run/src/actions`, `packages/code/lib/src/widgets/node_widgets.dart` (restyle), `nowa_code_editor.dart` (restyle) | not re-derived key by key: unchanged since W12's verification, and the diffs show no key edits |

Not on the page, on purpose: the `/` key that focuses the AI chat (`designer_setup.dart:54`) works only when the New UX bottom bar is shown
(`research/features-editor-shell.md:358`), not in the released layout.

Live evidence seen after the code check (the other agent's captures in the scratchpad `live-checks/`, 3.13.0 playground, Chromium on Linux; `P10-live-checks.md` item 2 is
still being written): with `ext` typed, **Text** is highlighted and one press of ↓ moves to **Text Field** (`22-add-mode-text-results.png`, `25-after-arrowdown.png`, which
confirms the reworded ↓ row); Esc with the card showing puts the card away and keeps the row (`26b-after-escape.png`); a letter typed on a row lands in the search field
(`40b-typing-while-row-focused.png`); Delete on the **HomePage** row does nothing (`43a-delete-on-homepage-row.png`); Back is greyed on the first place and the
tooltip reads "Boards (Ctrl B)" (`31b-zoom.png`, `32c-zoom.png`), as the Ctrl format on line 9 says.

Fixed 1 (the ↓ row), removed 0. The "Library search" table has 8 rows, 7 ok. Length is 2,936 words by `wc -w` because the tables carry many `<kbd>`
tags; prose is short. Front matter fine (keywords added: library, back, forward, boards). One `:::tip`, no H1, no `---` rule.

## docs/reference/widgets/index.md

Changed in 3.13: description, "Find a widget in the Library", the package paragraph, the screenshot alt text plus the sentence under it, the Page View row,
the Next steps link text. Found beyond the writer's list: three rows that still said "Drop it on a screen ..." (fixed).

| claim | verdict | code ref | note |
|---|---|---|---|
| Ctrl/Cmd+K, or the **Widget** tool, opens the Library with its search ready; type part of a name and press Enter | ok | `packages/designer/lib/src/actions/add_actions.dart:14-31`, `packages/designer/lib/src/widgets/designer_tools.dart:174-182` (tooltip **Widget**, `OpenWidgetsDialogIntent`), `packages/nowa_ui/lib/library/library_panel.dart:527-542,622-656` | |
| The widgets are under **Built-in**, in groups such as **Basic**, **Buttons**, **Layout**; own screens and components under **Project**; **Filter** limits the kind, default **Widgets** (screens, components, widgets) | ok | `packages/core/lib/src/library/library_service.dart:394-419` (`_mapBuiltIn`: one folder per `widgetCategories` entry), `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:95-107` (10 categories, the page's H2 groups), `library_panel.dart:432-437` (`_sourceLabel`: Project, Packages, Assets, Built-in), `:744-775` (menu headed **Show**, tooltip **Filter**), `packages/nowa_ui/lib/library/library_contract.dart:223-225` | the page's "Progress indicators" H2 is sentence case for the app's "Progress Indicators" |
| The Library has no request link; **Request a Widget** is in the widget picker dialog, opened by selecting an empty container and clicking **+**; then **Submit Request** | ok | `packages/core/lib/src/widgets/widget_picker.dart:148-160` (only place), `packages/designer/lib/src/details/widget_details.dart:249` (`+` of an empty slot opens the picker), `packages/core/lib/src/dialogs/feedback_dialogs.dart:71,88` (**Submit Request**) | same wording as `design/add-widgets.md` "Can't find a widget?" |
| "The Library lists the built-in widgets by group, not in the order of the tables below" | ok | `library_service.dart:394-419` | the earlier "in the order of the tables" sentence is gone |
| Nine widgets need a Flutter package (SVG, Swipeable Stack, YouTube Player, Lottie, Rive, Pin Code Field, Admob Banner, Google Maps, RevenueCat Paywall) | ok | `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:240-250,311-325,426-440,492-505,577-590,674-690` plus the three integration widgets | still nine; the dots (`AnimatedSmoothIndicator`) are a tenth package user, handled in the Page View row |
| **Add Missing Dependencies** opens when you add one with Enter or **Insert**; **Add** installs the package and places the widget | ok | `packages/core/lib/src/library/library_actions.dart:76-92` (`placeLibraryWidget`: `MissingDependencyDialog.show(..., onFix: placeIt)`), `lib/project/panels/library_panel/library_host.dart:135-143` (Insert), `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:47` | a drag from the Library does not ask (`packages/designer/lib/src/design_experience/designer_board_controller.dart:244-283` creates the widget from the drag data with no dependency check); the page does not say a drag asks (writer note: needs a live check) |
| Alt text and sentence: the screenshot is the widget picker dialog, which shows **Dependencies** and **Open Documentation**; the Library's details card shows a preview, the name and the first lines of the description only | ok | `packages/core/lib/src/widgets/widget_picker.dart:342,529`; `library_panel.dart:1192-1253` (`LibraryDetails`: 200 px preview, name, "Kind · location", doc `maxLines: 4`) | |
| Page View row: the dots come from `smooth_page_indicator`; link to `navigation.md#page-view` | ok | `widget_info.dart:256-266` (`SmoothIndicatorWidgetInfo`, description "A Package for page indicators"), `declaration_info_factory.dart:28-29` | anchor `{#page-view}` exists in `navigation.md` |
| Floating Button, App Bar and Drawer rows said "Drop it on a screen and it goes into the screen's slot" | fixed | `packages/designer/lib/src/design_experience/drag_rule.dart:393-436` (`ScaffoldRule`), `packages/designer/lib/src/design_experience/move_tool.dart:340-394` (`DeepHostWidgetFinder`: the deepest opaque host wins, so the **Stack** that fills an **Empty Page** body beats the screen), `packages/designer/lib/src/details/widget_fields.dart:218-226` (slots in **Details** > **Screen**); `captures/ui-diffs-3.13.md` row 12; same finding as `design/select-and-edit.md` and `design/screens.md` (P10-a) | not a 3.13 change, but the capture contradicts the old text. Rows now say "Set it in the screen's **App Bar** / **Drawer** / **Floating Action Button** slot" with a link to `navigation.md#screen-parts`. The Bottom Navigation Bar row had no drop claim |
| Old anchor `{#find-a-widget-in-the-picker}` kept on the renamed heading; the 36 widget anchors (`<Anchor id=...>`) unchanged | ok | link and redirect check: 42 redirects into my pages, 0 broken anchors | |
| Front matter, no H1, one `:::tip`, 45 widgets | ok | `widgets_to_add.dart` category lists unchanged in count since 3.12.5 (the diff adds `withVariant` only) | |

Fixed 3 (the three drop rows), removed 0. Length 2,141 words by `wc -w` (catalog tables): fine for a reference page.

## docs/reference/widgets/forms.md, lists.md, media.md

Changed in 3.13: forms L82 (Dropdown menu), media intro and step 1, and the closing "Widget catalog" line on all three. Found beyond the list: media L35 (fixed).

| claim | verdict | code ref | note |
|---|---|---|---|
| forms: "Add a **Dropdown menu** from the Library (Ctrl/Cmd+K)" | ok | `add_actions.dart:14-31`; the **Dropdown menu** pick is in category **Forms** (`widgets_to_add.dart:615`) and is found with the default **Widgets** filter (`library_service.dart:438-455`, `featured: true`) | |
| media: "Add pictures, videos, animations and web content from the Library (Ctrl/Cmd+K)"; "Add an **Image** from the Library" | ok | same | **Image** is in **Images** (`widgets_to_add.dart:203`) |
| "Widget catalog for every built-in widget" (3 pages) | ok | `library_service.dart:394-419` | |
| forms L12 and lists L21 ("Press Ctrl/Cmd+K, search for `text field` / `list view`, press Enter") | ok | `library_panel.dart:241` (first result highlighted as you type), `:527-542` | unchanged; Nowa's picks rank first (`:432-437`) |
| media L22 and the SVG, YouTube, Lottie and Rive steps: "Nowa opens **Add Missing Dependencies** as you pick it" | ok | `library_actions.dart:76-92` | true for Enter and **Insert**; a drag from the Library does not ask (see index.md). Not changed |
| media L35: "drag a file from **assets**" | fixed | `packages/nowa_ui/lib/library/library_panel.dart:432-437` (chip **Assets**), `packages/designer/lib/src/design_experience/designer_board_controller.dart:244-262` (a dragged file or Library asset becomes a widget via `createDragData` / `dragDataFor`); `design/assets.md` L63-65 says the same | "assets" pointed at the old Files section; now "the **Assets** chip of the Library" with a link |
| 20 other labels in the three pages (Details sections, **Items**, **Value type**, **On Changed**, **Pick Image**, **Upload Image**, **Pick SVG**, ...) | ok (not re-derived) | no widget-field label differs in the 3.12.5..3.13.0 diff of `packages/core/lib/src/fields`, `packages/designer/lib/src/details` (restyle and the theme-extension tabs only) | these pages were verified in W13 |

Fixed 1, removed 0. Lengths 1,502 / 1,200 / 1,390 words by `wc -w` (tables included), unchanged by the edits.

## docs/reference/widgets/navigation.md

Changed in 3.13: the "Add a screen part" procedure, step 1 of "Add a bottom navigation bar", a CAPTURE description, the Page View dependency paragraph, the Next steps link text.
Another verifier had already aligned the screen-part text with `design/screens.md`; I re-checked it against the drag code and the slot code.

| claim | verdict | code ref | note |
|---|---|---|---|
| Steps 1-3: select the screen, open **Screen** in **Details**, click a slot (**App Bar**, **Drawer**, **Floating Action Button**, **Bottom Navigation Bar**; an empty slot shows `null`), search the widget picker and press Enter | ok | `packages/designer/lib/src/details/widget_fields.dart:218-226` (the four slots as `BFWidget` fields of the Scaffold), `packages/core/lib/src/fields/nowa_fields.dart:435-441` (`_showPicker`), `:445-449` (`evalText` -> `'null'`), `packages/core/lib/src/widgets/widget_picker.dart:131-205` | the picker's Enter chooses the highlighted result (`command_palette`) |
| "The part sits in its own place, not in the body" (slot pick) | ok | same; the slot's `onUpdate` puts the widget in that slot | |
| "The widget picker is the dialog titled **Search for a widget**" | fixed | `packages/core/lib/src/widgets/widget_picker.dart:147` (`hintText: 'Search for a widget'`; `showCommandPalette` has no title) | it is a hint; now "the dialog with the hint **Search for a widget**", as `design/add-widgets.md` L56 and the glossary say |
| It offers your own components too, so a custom header can be the app bar | ok | `widget_picker.dart:131-205` (filter chips **All**, **BuiltIn**, **Components**, `_loadWidgetsAsStream`) | unchanged |
| A drag from the Library fills the slot only where none of the screen's groups is under the pointer; over the **Stack** of an **Empty Page** screen it lands in the Stack | fixed (made precise) | `packages/designer/lib/src/design_experience/move_tool.dart:340-394`, `drag_rule.dart:70-79,393-436`, `packages/core/lib/src/services/templates/built_in/empty_page.dart:21-28`; capture `captures/ui-diffs-3.13.md` row 12 (live: free widget in the body, Outline next to `appBar`) | the writer's hedge ("can land in the body as a free widget") was true but vaguer than `screens.md`; now the same wording as `design/screens.md` L43. Not a 3.13 change; the live result of a Library drag on a non-Stack body is not proven (needs a live check, writer note 5) |
| Bottom navigation bar step 1 "Set a **Bottom Navigation Bar** in the screen's slot ... Nowa adds `pageIndex`, links **Current Index**, fills **On Tap**" | ok | `packages/core/lib/src/interpreter/widget/nav_bar_info.dart:12-45` (`BottomNavBarConnector`: `pageIndex`, `currentIndex`, `onTap`), `packages/core/lib/src/interpreter/widget/widget_blocks.dart:195-209` (`onAdd` -> `connector.connect()`) | the connector runs for any add of the widget, slot or drop |
| Page View dots come from `smooth_page_indicator`, which `nowa_runtime` no longer includes | ok | `packages/nowa_runtime/CHANGELOG.md:1-3` (0.2.0 "Remove smooth_page_indicator from dependencies"), `packages/core/lib/version.dart:4` (`nowaRuntimeVersion = '0.2.0'`) | |
| Select the dots: **Details** lists the package under **Dependencies**; click **Hot Fix** to add it | ok | `packages/core/lib/src/fields/expression_builder/expression_dependencies.dart:43,54,77` ("Dependencies" header, **Hot Fix** button while a dependency is missing, "Packages:" section), `packages/core/lib/src/fields/class_field.dart:62` (`ExprDependencies(block)` after a class field), `widget_info.dart:256-266`, `declaration_info_factory.dart:28-29` | **Hot Fix** calls `fixAllDependencies` (`packages/core/lib/src/dependency_system/dependency_helper.dart:35-40`), which fixes each dependency (a package dependency registers the package). Needs a live check that **Details** shows the block for the dots (writer note 4); code supports it |
| A project that already uses the dots without the package is offered **Page indicator migration** | ok | `packages/core/lib/src/migrations/migration_service.dart:193-262` (dialog title, "nowa_runtime no longer includes smooth_page_indicator ...", **Later**, **Migrate**) | link target `code/packages.md#page-indicator-migration` exists (link check) |
| App Bar, Drawer, Floating Button, tabs and Cross Fade sections (about 30 labels) | ok (not re-derived) | unchanged text; no field label change in the diff | verified in W13 |

CAPTURE `reference-navigation-2` is well formed and its state now names the slot path (request row `skipped: low value`; not my concern).

Fixed 2 ("titled", drag rule wording), removed 0. Length 1,529 words by `wc -w` (tables included): fine.

## docs/guides/complete-app.md

Changed in 3.13: step 6.2 (open `RecipeCard`). Also changed since the baseline, not by W30c: the CAPTURE placeholder of step 1 became an embedded 3.13 screenshot (commit `0614733`).

| claim | verdict | code ref | note |
|---|---|---|---|
| "Open `RecipeCard` on its own: in the **Library**, double-click it, or select it and press Enter" | ok | `lib/project/panels/library_panel/library_host.dart:147-154` (`_open` -> `openLibrarySource`), `packages/core/lib/src/library/library_actions.dart:67-73` (opens the file at the declaration), `packages/nowa_ui/lib/library/library_panel.dart:527-542` (`_activate` opens when not adding), `:566-573` (Enter on a row), `packages/nowa_ui/lib/library/library_contract.dart:223-225` (default filter **Widgets** lists components) | a component opens on its own as in 3.12.5. Not in add mode: after Ctrl/Cmd+K a double-click inserts instead (`_adding` flips it); the step starts from a plain click, so this holds |
| The page no longer says "**Widgets** panel", "**Page**/**Component**" | ok | grep | |
| Embedded screenshot `guides-complete-app-1.png`: alt text matches the image | ok | viewed the file | shows the board with HomePage, SignInPage, RecipeDetailPage, the **Your app design is complete** card with **Make it real**; status bar `v3.13.0-79` |
| 25 other labels and steps (Design chip, **Build it**, **Questions**, **Create component**, **Supabase** panel steps, **Authentication Template**, **Future Options**, **Redirect Logic**, **Screen Parameters**, **Pick Widget**, **Item Builder**, **Generate a Query**, **No Tables Found**, **Fetch Tables**, **Open on Mobile**, **Run on**, **Router** panel, **Make home screen** ...) | ok | `packages/designer/lib/src/menus/widget_context_menu.dart` (**Create component**), `packages/nowa_ui/lib/top_bar/top_bar_contract.dart` (**Open on Mobile**), `lib/project/run/run_button.dart` (**Run on**), `lib/project/side_bar.dart:102-108` (**Router**), `packages/designer/lib/src/details/route_details.dart`, `packages/core/lib/src/services/templates/built_in/auth_template.dart`, `packages/code/lib/src/fields/future_options.dart`, `packages/core/lib/src/editors/router_editor/router_block_view.dart`, `go_route_node_view.dart`, `packages/core/lib/src/fields/basic_fields.dart`, `grid_view_field.dart`, `packages/data/lib/src/supabase/ui/sb_outline.dart`, `.../templates/ui/template_category_view.dart` | grepped as labels; the flows are unchanged in the 3.12.5..3.13.0 diff |

Fixed 0, removed 0. 1,481 words by `wc -w`, body 1,439: a tutorial, a little over the ~1,400 target. Not cut: every step is needed and the 3.13 edit added 4 words.

## docs/guides/design-tips.md

Changed in 3.13: the theme-extensions bullet, the Descriptions bullet, and (beyond the writer's list) the Boards naming bullet.

| claim | verdict | code ref | note |
|---|---|---|---|
| A widget's color picker shows your extension colors as tabs next to **Material** | ok | `packages/core/lib/src/fields/color_fields.dart:826-838` (`NowaTabBar`: one tab per extension, named after its class, plus `NowaTabItem(label: 'Material')`, only when `extensions.isNotEmpty`) | the page says "your extension colors"; the tab is per extension class |
| **Text Styles** lists their text styles in groups | ok | `packages/core/lib/src/fields/style_fields/style_fields.dart:245-261` (`StyleGroupHeader(extension.name)` per extension at `:248`, then a `Material` header at `:261` over the usual styles) | |
| Link `../design/theme-styles.md#colors-from-theme-extensions` | ok | heading `### Colors from theme extensions` in `design/theme-styles.md` (link check) | |
| Theme extensions have no create button, and come from code | ok (unchanged) | `ThemeClassDecl`/`env.themeTokens` read classes from the project; no creation UI found by grep | verified in W4 |
| Descriptions: **Add description** under a screen's or component's name; the note shows in the Library's details card and in the widget picker dialog | ok | `packages/designer/lib/src/details/widget_details.dart:369` (**Add description**, else the one-line doc), `packages/core/lib/src/library/library_service.dart:281` (`doc: decl.comment.docText?.docSummary`), `packages/nowa_ui/lib/library/library_panel.dart:1192-1253` (card shows up to 4 lines of `doc`), `packages/core/lib/src/widgets/widget_picker.dart:299` (`componentDoc?.docSummary`) | |
| Boards: Nowa writes the board name in snake_case, so **Login flow** becomes `login_flow` | ok | `packages/designer/lib/src/actions/file_actions.dart:7-26,62-67` (`_recordCreateBoardFile` -> `generateFileName`), `packages/core/lib/src/file_system/naming.dart:158-163` (`strategy: Cases.snakecase`), `:165-172` (`input.snakeCase`) | 3.12.5 gave `loginFlow`; found beyond the writer's list (C9). The **New Board** dialog title is `New ${creatingText}` (`create_file_dialog.dart:94`) |
| 28 other claims (Themes Ctrl/Cmd+3, **Mode** / **Seed Color** / **Scheme Variant**, `changeTheme`, **Create component**, **Copy as new widget**, **Detach**, template names, size modes, **Safe Area**, **Visibility**, size presets, Ctrl/Cmd+C ...) | ok (not re-derived) | no label change in the 3.12.5..3.13.0 diff of the theme, template and details code beyond restyle and the theme-extension tabs; Themes is sidebar slot 3 (`lib/project/side_bar.dart:55-58`) | verified in P9 |

Fixed 0, removed 0. 1,001 words by `wc -w`: fine.

## docs/guides/data-and-state-tips.md

Changed in 3.13: the **Firestore** bullet under "Test queries before you build the screen" (a coverage find, depends on the Firestore finding).

| claim | verdict | code ref | note |
|---|---|---|---|
| "**Firestore:** click **Run Test** in the **Queries** editor" | ok | `packages/data/lib/src/firebase/firestore/queries_builder/ui/query_test_section.dart:94,102` (**Restart**, **Run Test**) | |
| "Testing isn't possible in the Windows desktop app" | ok | `packages/data/lib/src/firebase/firestore/queries_builder/ui/queries_builder.dart:104-130` (`kIsWeb == false && Platform.isWindows` overlay, "Testing Firestore Queries isn't possible on Windows version") | Windows only: the Linux app shows the active **Test** section; whether it works there is unknown (nothing claimed) |
| "In Nowa 3.13 the designer can't open a query in that editor" | ok (code finding re-derived) | the outline widgets with **Add New Query** exist only in `FileInfo.preview` (`packages/data/lib/src/firebase/firebase_plugin.dart:37-47`; `FirestoreOutline` has no user); `FileInfo.preview` is read only by `FilePreviewDialogBody` (`lib/project/panels/files_panel/file_preview_body.dart:27`), created only by `FilesTreeHost._activate` in design mode (`files_tree_host.dart:266-282`); **Files** is in the sidebar only in code mode (`lib/project/side_bar.dart:44-53`); `openedQueryObject` is set only by the outline and the manager (`firestore_outline_tile.dart:248`, `query_builder_manager.dart:61-78`) | I re-ran the writer's greps (`CollectionsOutline`, `QueryBuilderOutline`, `FirestoreOutline`, `FilePreviewDialogBody`, `openedQueryObject`) and found no other entry point. Needs a live check (writer note 1); revert as the writer lists if one is found |
| Links `firestore.md#test-a-query` and `firestore.md#add-collections-and-queries` | ok | link check | both headings exist; the second has an explicit id |
| 20 other labels (**Testing values**, **Run**, **RLS Policy Error**, **Empty Result - Possible RLS Filtering**, **Test**, **Run Test**, **Json**, **Object**, **Generate Model**, **Generate Models From Json...**, **Loading Widget**, **Error Builder**, **Get Record by ID**, **Future Options**, ...) | ok (not re-derived) | unchanged text; the 3.12.5..3.13.0 diff of the Supabase and REST test code is restyle only; **Generate Models From Json...** is in the Library **Add** menu (`lib/project/panels/files_panel/add_lib_menu.dart:61-82`) | verified in P9 |

Fixed 0, removed 0. 1,027 words by `wc -w`: fine.

## docs/troubleshooting/known-issues.md

Changed in 3.13: the Firestore section (two sentences), the new "Linux" section (replacing "No Linux desktop app"), the keyword list.

| claim | verdict | code ref | note |
|---|---|---|---|
| In the Windows desktop app the **Test** section of a Firestore query is switched off: "Testing Firestore Queries isn't possible on Windows version" | ok | `queries_builder.dart:104-130` | unchanged; anchor `{#firebase-on-windows}` kept (redirect `/data-connections/firebase/known-issues/firebase-windows` resolves) |
| "Or open the same project in the web app or the macOS desktop app, where the **Test** section is on" | ok | the gate is `Platform.isWindows` only (`queries_builder.dart:104,110`) | careful wording: "section is on", not "testing works" (Linux and Android-style desktop are not claimed) |
| "In Nowa 3.13 the designer can't open a query in its editor on any platform" | ok (reworded) | as in `data-and-state-tips.md` above | applies to web and every desktop app (no platform gate in the plugin). "in any app" could read as "in any app you build", so it now says "on any platform" |
| Linux: the preview pane says "Your app is running" and offers **Open in Browser**; the in-app preview isn't available on Linux yet | ok | `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:129-130` (comment, then `if (NPlatform.isLinux) return _BrowserPreview(...)`), `:145-171` (texts "Your app is running", "The in-app preview is not available on Linux yet. Open it in your browser instead.", **Open in Browser**, the URL); `packages/nowa_runtime/lib/src/nowa_platform.dart:18` (`isLinux` is `!kIsWeb && defaultTargetPlatform == linux`, so the web app on Linux is not affected) | what the run toolbar does while the pane shows is not claimed (writer note 6) |
| The Linux app doesn't install updates itself; the message offers **Download v...** and **Skip**; download the new archive and run `install.sh` again | ok | `lib/dashboard/overlays/update_overlay.dart:135-154` (`hasLink && !canAutoInstall` -> **Download v{version}** `:141-144`, then **Skip**), `packages/core/lib/src/services/version_service.dart:39` (`canAutoInstall = !kIsWeb && !NPlatform.isLinux`), `linux/packaging/install.sh:8-12` (replaces the old copy) | |
| Links `../test/run.md#choose-where-to-run`, `../get-started/desktop-app.md#install-on-linux` | ok | link check | |
| Old "No Linux desktop app" section removed | ok | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8` (`_showLinuxDownload = true`) | no inbound link to `#no-linux-desktop-app` anywhere (docs, `redirects.js`, `sidebars.js`) |
| 6 other sections (API tests in the web app, **Continue with Apple**, Google Maps placeholder, test ads, Instant Play tooltip) | ok (not re-derived) | `lib/auth/auth_widgets.dart:500` (`kAppleSignInSupported = isIOS \|\| isWeb`) for the one that changed shape with the platform list | unchanged text |

Fixed 0 (one wording change: "on any platform"), removed 0. 575 words by `wc -w`: fine.

## docs/troubleshooting/index.md

Changed in 3.13: the Linux bullet under "The preview won't start", **Browse widgets** in "A project freezes", the update-dialog bullets (macOS and Windows split from Linux).

| claim | verdict | code ref | note |
|---|---|---|---|
| "Your app is running" with **Open in Browser** in the Linux desktop app is not an error; click it to see your app | ok | `nowa_run_preview.dart:129-130,145-171` | same as `known-issues.md` |
| **Browse widgets** opens the Library | ok | `lib/project/panels/empty_workspace.dart:41-45` (`sidePanel = 'Library'`); labels **Nothing is open** `:25`, **Open board** `:35`, **Open code mode** `:47` | |
| macOS and Windows: **Update to v...**, then "Download complete!", **Install & Restart**; **Later** and **Skip** wait; **Or download manually** opens the link | ok | `lib/dashboard/overlays/update_overlay.dart:135-154,202-218` | **Later** is on the "Download complete!" step, **Skip** on the first; the sentence covers both |
| Linux: **Download v...** and **Skip**; run `install.sh` from the new archive again | ok | `update_overlay.dart:141-144`, `version_service.dart:39`, `linux/packaging/install.sh:8-12` | link `get-started/desktop-app.md#install-on-linux` exists |
| "Update failed" shows the reason; **Retry**, **Download manually instead** | ok | `update_overlay.dart:235-255` | only the in-app path can fail |
| **Version out of date** (desktop: **Download**) | ok | `lib/update_required_screen.dart:58` | Linux is in the **Download Nowa** dialog now |
| Package messages ("'x' is imported but is not in the pubspec.", dev dependency, failed to load) | ok | `packages/core/lib/src/interpreter/packages/package_service.dart:405-419` | an `sdk:` dependency no longer raises the first one (`:410-425`); the page's generic wording stays true |
| 40 other labels and messages in the page | ok (not re-derived) | unchanged text; no label change in the diffs of `lib/`, `packages/nowa_run`, `lib/project/run` | verified in W11 |

Fixed 0, removed 0. 1,817 words by `wc -w`, a long page by design (many separate symptoms).

## Writer's "needs a live check" items (stay as written when the code supports them)

| # | Item (writer notes) | Pages in this batch | My finding |
|---|---|---|---|
| 1 | Firestore: no way to add or select a collection or query in the 3.13 designer | `guides/data-and-state-tips.md`, `troubleshooting/known-issues.md` | Code re-derived (no other user of `CollectionsOutline`, `QueryBuilderOutline`, `FilePreviewDialogBody`, `openedQueryObject`; **Files** is code mode only). The two sentences say only "the designer can't open a query in that editor", which the code shows. Stay as written; revert as the writer lists if a live check finds an entry point. Query testing on Linux is not claimed anywhere |
| 2 | Library with the View Only role | `account/workspaces.md` | The Library never reads `isViewOnly` (`library_host.dart`, `library_panel.dart`; `_editable` only checks the id prefix). The page says nothing about the Library, but its umbrella sentence "the editor is read-only" is unproven for **Add**, **Rename**, **Delete**, **Insert** there. Left as written |
| 3 | Dragging a package widget from the Library when its package is missing | `reference/widgets/index.md`, `media.md` | Code: no dependency check on a drop (`designer_board_controller.dart:244-283`). The pages say only that Enter and **Insert** ask, which is true. The live check file (`P10-live-checks.md` item 1) confirms both |
| 4 | Page View without `smooth_page_indicator`; **Details** showing **Dependencies** for the dots | `reference/widgets/navigation.md`, `index.md` | Code supports it (`SmoothIndicatorWidgetInfo`, `ExprDependencies`, **Hot Fix**); stays as written |
| 5 | Screen parts dragged from the Library | `reference/widgets/navigation.md` | The text now matches `design/screens.md` and the drag code (the **Stack** of an **Empty Page** screen wins). A Library drag onto a screen whose body is not a Stack is not proven live |
| 6 | Linux run pane: what the run toolbar does | `known-issues.md`, `troubleshooting/index.md` | Not claimed |
| 7 | RevenueCat Paywall refused in the capture sandbox | `reference/widgets/index.md` (row **RevenueCat Paywall**) | Not a label change; the row says the board shows a placeholder, unchanged. Likely the sandbox's analyzer; check on a normal account |
| 8 | Library keyboard table | `reference/shortcuts.md` | Checked against `library_panel.dart:527-665`; one row fixed (↓). Esc order, F2 and typing-to-search all match |
| 9 | **Linux** button enabled only while the server has a Linux link | `account/index.md` | The row says a button is greyed out when there is no download for that system, which is what the code does (`download_nowa_dialog.dart:53,65,85`) |
| 10 | Boards chip tooltip on Windows and Linux; Linux minimum system | none of these pages | |

## Open issues

1. **Firestore entry point (P-W30c-1).** Code says there is none in the 3.13 designer. `data-and-state-tips.md` and `known-issues.md` state the limit; `integrations/firebase/firestore.md`
   and `connect.md` (other batch) carry the long form. If a live check or a product change finds one, revert the places the writer lists at the end of `W30c-writer-notes.md`.
2. **View Only and the Library (P-W30c-2).** The code does not gate it; whether the server refuses the writes is unknown. `workspaces.md` keeps its umbrella sentence.
3. **A Library drag of a screen part onto a screen with a non-Stack body** is not proven live (`navigation.md`, `index.md` now point at the slot instead).
4. **Page View dots: `Dependencies` block and **Hot Fix** in **Details**.** Supported by the code, not seen live (`navigation.md`).
5. **Firestore query testing and the run toolbar on Linux.** Unknown; no page claims either.
