# B1: editor, designer, widgets, code sync

Code references are against 3.13.0 (`/home/user/nowa-master` at `3cb32031c`) unless a line says otherwise. `dev` (`7c341f356`)
changes only `lib/project/project_page.dart` and `packages/nowa_ui/lib/library/library_panel.dart` (rename and snackbar fixes),
so every "present" below is the same on dev. The app was not run for this report (the only execution was a one-line
`Uri.parse` check on the Dart SDK for P6); "Reproduced live" means a log in `_rewrite/reviews/` or `_rewrite/captures/`
recorded it in the running app.

### P1. The Shortcuts sheet lists keys that do nothing, or do less than it says

- **Area:** Shortcuts sheet (`packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart`)
- **Severity:** Low — a person presses a listed key and nothing, or something else, happens.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (the ⌘P row of the old entry is fixed; three other rows are wrong or misleading)
- **Confidence:** Confirmed in code — every sheet row compared with the registered shortcuts and actions; not run.

**What happens.** The sheet (the **Shortcuts** icon at the bottom of the left sidebar, or Ctrl/Cmd + .) is a hard-coded list
(`shortcuts_cheat_sheet.dart:15-63`), not built from the bindings, so rows drift from what the keys do. Rows that differ in 3.13.0:

| Sheet row | Sheet shows | What the code does | Verdict |
|---|---|---|---|
| **Show/Hide panels** (`:49`) | ⌘ \ | Nothing is bound to `\`: no `LogicalKeyboardKey.backslash` anywhere in `lib/` or `packages/`. Panels open with ⌘1-9 (`lib/setup_general_actions.dart:46-62`). | Wrong |
| **Group/Ungroup** (`:56`) | ⌘ G | ⌘G only runs `CreateGroupIntent` (`packages/designer/lib/src/designer_setup.dart:20`, `packages/designer/lib/src/actions/designer_actions.dart:46-86`), so on a group it nests it in a new group. **Ungroup** exists only in the right-click menu (`packages/designer/lib/src/menus/widget_context_menu.dart:41-42`). | Half wrong |
| **Boards** (`:36`) | ⌘ B | Opens the board list only where the top bar shows the Boards chip. In code mode, the Run view and Settings it does nothing (P3). | Misleading |
| **Container** (`:47`) | R | The toolbar calls that tool **Shape** (`packages/designer/lib/src/widgets/designer_tools.dart:142`). | Label |
| **Redo**, **Open action history** (`:23-24`) | ⌘ ⇧ Z, ⌘ ⇧ H on a Mac | Menus and tooltips write ⇧⌘ (Mac order ⌃⌥⇧⌘, `packages/core/lib/src/inputs.dart:27-38`). | Order, Mac |
| **Next tab**, **Previous tab**, **Back**, **Forward** (`:31-32`, `:34-35`) | A caret or control-key glyph on every OS | The Control key. Other rows say **Ctrl** as text on Windows and Linux; these use `Icons.keyboard_arrow_up` and `Icons.keyboard_control_key` with no platform check. | Cosmetic |
| **Bring to front**, **Send to back** (`:59-60`) | `Alt Ctrl ]` on Windows and Linux | The menu writes `Ctrl Alt ]`. Same chord. | Order, Win/Linux |

The other rows match their bindings: **Save**, **Copy**, **Paste**, **Cut**, **Undo**, the keys of **Redo** and **Open action
history**, **Close current tab**, the keys of **Back** and **Forward**, **Zoom In/out** (Ctrl/Cmd + scroll,
`packages/core/lib/src/board/board_view.dart:237-241`), **Add a widget** (⌘K), **Go to a widget** (⌘O), **Open selection in new
file** (⌘I), **Text** (T), **Bring forward**, **Send backward**, **Bring to front**, **Send to back** and **Delete**.

Correction: "Open widget picker ⌘P" no longer exists. 3.13.0 reads **Add a widget** ⌘K, which is right (commit `b51ed7216`,
`designer_setup.dart:51`); ⌘P is Play. The entry above is about the rows that are still wrong.

**Steps to reproduce**
1. Open any project (the playground is enough) and press Ctrl/Cmd + . to open the sheet. Under **Designer** it lists **Show/Hide panels** with ⌘\.
2. Close the sheet, click the board and press Ctrl/Cmd + \. No panel opens or closes.
3. Draw two boxes with the **Shape** tool, drag a box around both to select them, press Ctrl/Cmd + G (they group), then press Ctrl/Cmd + G again with the group selected.
4. Click the `<>` button next to **Settings** (code mode) and press Ctrl/Cmd + B.

Expected: each key does what its row says.
Actual: step 2 does nothing; step 3 nests the group in another group instead of taking it apart; step 4 does nothing.

**Root cause.** The rows are literals (`shortcuts_cheat_sheet.dart:15-63`) beside the real maps (`lib/setup_general_actions.dart:24-64`,
`designer_setup.dart:15-56`). The file's own comment says the registry-driven sheet is "currently commented out because the
shortcuts system needs to be refactored" (`:258-266`; the draft is at `:267-400`).

**Suggested fix.** Smallest: delete **Show/Hide panels**; rename **Group/Ungroup** to **Group** (or bind `UngroupIntent`); mark
**Boards** as design mode only; rename **Container** to **Shape**; write ⇧ before ⌘ on a Mac and "Ctrl" as text on Windows and
Linux. Better: build the sheet from `findShortcutRegistry().categorizedShortcuts` (`packages/core/lib/src/shortcuts/shortcut_registry.dart:63-65`)
so it cannot drift, and add a test in `packages/core/test/` that every sheet row matches a registered activator.

**Docs impact.** `docs/reference/shortcuts.md:17-31`: the "Two entries don't match" table stays right until the fix, then delete
its rows; add **Boards** to it (or keep the clause in the General table, line 48). The Mac-order sentence at line 11 is about menus
and tooltips and stays right.

### P2. The right-click menu showed the same key beside Move Up and Move Down

- **Area:** Widget right-click menu (`packages/designer/lib/src/menus`, `packages/core/lib/src/widgets/menu.dart`)
- **Severity:** Low — a wrong key hint on one pair of entries.
- **Where:** both; both
- **Status:** Fixed in 3.13.0 (commit `1e386bd8f`, 1 Oct 2026); dev is the same
- **Confidence:** Reproduced live — the 3.13.0 playground menu (docs screenshot `static/img/docs/design/design-select-and-edit-2.png`, Linux) shows a different key on each reorder entry; also confirmed in code.

**What happens.** In 3.12.5 **Move Up** and **Move Down** both showed `]`. In 3.13.0 the reorder entries are renamed (**Bring to
front**, **Bring forward**, **Send backward**, **Send to back**) and each shows its own keys. Every other entry was checked
against the bindings and is right: **Remove** (Del, ⌫ on a Mac), **Group** ⌘G, **Copy** ⌘C, **Cut** ⌘X, **Bring to front** ⌥⌘],
**Bring forward** ⌘], **Send backward** ⌘[, **Send to back** ⌥⌘[. **Play**, **Replace with...**, **Ungroup**, **Create
component**, **Detach**, **Copy as new widget** and **Export as image...** show no key, and none is bound. The board menu's
**Undo**, **Redo**, **Save** and **Paste** are right too (`packages/designer/lib/src/menus/board_context_menu.dart:7-13`).

Two other hints are wrong on Windows and Linux. They are not in the old row:
- Library row menu: **Insert** always shows ⌘⏎ (`lib/project/panels/library_panel/library_host.dart:161`). The key is Ctrl + Enter (Cmd or Ctrl both work, `packages/nowa_ui/lib/library/library_panel.dart:529-543`). Seen live on Linux: `reviews/P10-live-checks.md:106`.
- Top-bar **Back** and **Forward** tooltips hard-code the Mac glyphs `⌃-` and `⌃⇧-` (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-268`), where other tooltips say "Ctrl".

**Steps to reproduce** (to verify the fix)
1. Open the playground, draw a box with the **Shape** tool and right-click it.
2. Read the keys beside **Bring to front**, **Bring forward**, **Send backward** and **Send to back**.
3. On Windows or Linux open the **Library** (Ctrl/Cmd + 2), right-click a built-in widget row and read **Insert**.

Expected: each entry shows its own key, spelled for the user's OS.
Actual: the reorder entries are right (Ctrl Alt ], Ctrl ], Ctrl [, Ctrl Alt [ on Linux); **Insert** reads ⌘⏎ on Linux.

**Root cause.** 3.12.5: `ContextMenuFromIntent` took the first registered activator of the intent class, so both `ReorderIntent`
entries got `]` (3.12.5 `packages/designer/lib/src/menus/widget_context_menu.dart:78-79`, `packages/core/lib/src/widgets/menu.dart:50-60`).
3.13.0: `intentEntry(..., matches:)` picks the activator whose `goNext` and `allTheWay` match (`menu.dart:49-72`,
`widget_context_menu.dart:45-48,61-68`; bindings `designer_setup.dart:21-25`). The Library hint and the tooltips are literals.

**Suggested fix.** Format the Library hints from `AdaptiveActivator(LogicalKeyboardKey.enter).shortcut` and the Back and Forward
tooltips from `SingleActivator(LogicalKeyboardKey.minus, control: true).shortcut` (`inputs.dart:27-38`) instead of literals. Add
a test in the root `test/` folder that no menu or tooltip hint contains ⌘ or ⌃ when `isMac` is false.

**Docs impact.** `docs/design/library.md:85` says "The menu shows ⌘⏎ on every system": change it when the Library hint is
fixed. `docs/design/select-and-edit.md:80-86` and `docs/reference/glossary.md:75` already describe the fixed menu: no change.

### P3. Ctrl/Cmd + B does nothing in code mode and the Run view

- **Area:** Board picker shortcut (`lib/project`, `packages/nowa_ui/lib/top_bar`)
- **Severity:** Low — the key is listed on the sheet, fires, and nothing visible happens.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — traced from the key to the top bar; not run.

**What happens.** Ctrl/Cmd + B opens the **Boards** list with its search focused, but only while the top bar shows the **Boards**
chip. In code mode, in the Run view and in Settings there is no chip, so the key does nothing. The sheet still lists **Boards** ⌘B
(P1). Correction: the old row says "code mode"; the Run view, Settings and the New UX layout behave the same.

**Steps to reproduce**
1. Open a project and press Ctrl/Cmd + B: the **Boards** list opens. Press Esc.
2. Click the `<>` button next to **Settings** (code mode) and press Ctrl/Cmd + B.
3. Go back to design mode, and in a project of your own click **Run** (the playground shows **Save** instead) and press Ctrl/Cmd + B in the Run view.

Expected: the list opens, or the key is left alone in these views and not listed for them.
Actual: nothing happens in steps 2 and 3.

**Root cause.** ⌘B is bound for the whole project page (`lib/setup_general_actions.dart:35`; the action is registered whenever a
workspace exists, `:104-107`). The action only bumps a counter (`lib/project/panels/panel_actions.dart:28-40`,
`packages/core/lib/src/panels/panel.dart:45-48`) that the **Boards** chip listens to (`lib/project/top_bar.dart:67`,
`packages/nowa_ui/lib/src/components/picker_chip.dart:209`). That chip is only built in the normal bar: code mode shows just
**Back** (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:69-75`), Settings shows just **Back** (`:68`), the Run view shows run
tools (`lib/project/top_bar_mapper.dart:58-62`). Nobody listens, so nothing happens. 3.12.5 bound ⌘B to `OpenBoardsTabIntent`,
which opened or cycled a board tab in any mode.

**Suggested fix.** Smallest: make `OpenBoardPickerAction.isEnabled` return false while `provider.isCodeMode`,
`provider.runOverlayOpen` or `provider.settingsOverlayOpen` is true (the key then falls through), and mark the sheet row "design
mode". Better: in code mode open the same list through `showCommandPalette`, as `FilePickerAction` does
(`packages/core/lib/src/actions/tab_actions.dart:30-59`). Test: a widget test in the root `test/` folder that presses ⌘B in code mode.

**Docs impact.** `docs/reference/shortcuts.md:48`, `docs/design/boards.md:12,21` and `docs/get-started/editor-tour.md:31` already
say "not in code mode or the Run view"; drop that clause only if the key starts working there.

### P4. The "Group" step of the guided walkthrough lost its highlight

- **Area:** Guided walkthrough, "Financial Tracker" project (`packages/core/lib/src/walkthrough`)
- **Severity:** Low — one hint never shows, and the whole walkthrough is switched off in the shipped app.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev (in the code; not reachable in a release build, see below)
- **Confidence:** Confirmed in code — the anchor is registered nowhere; not run, because the feature is off.

**What happens.** In the "Group the text fields" step, the last hint ("Select 'Group' from the context menu to wrap the text
fields in a Column widget") should highlight **Group** in the right-click menu. Nothing registers that highlight target, so the
hint never shows and the overlay keeps the earlier one ("Right-click, and choose 'Group' to wrap them in a Column"), boxing the
two text fields instead.

Correction: the row calls it the "Create login page" walkthrough; in code it is `createLoginPageSteps2`
(`packages/core/lib/src/walkthrough/projects/financial_tracker.dart:6`). It cannot be seen in a release build: `WalkthroughEngine.isEnabled`
is `false` and nothing sets it (`packages/core/lib/src/walkthrough/walkthrough_engine.dart:10`), so the dashboard card **Learn how
Nowa works** (`lib/dashboard/dashboard_page.dart:242,310-318`), the announcement
(`packages/core/lib/src/announcements/announcement_provider.dart:45`) and the project hook (`lib/project/project_page.dart:76-83`) are all off.
It is `false` in 3.12.5 too.

**Steps to reproduce** (only in a build that sets `WalkthroughEngine.isEnabled = true`)
1. On the dashboard click **Start** on **Learn how Nowa works**.
2. Follow the hints to "Group the text fields": add two text fields to the LoginPage and select both with Shift + click.
3. Right-click one of the selected fields.

Expected: the hint changes to "Select 'Group' from the context menu..." and **Group** is highlighted.
Actual: the hint stays "Right-click, and choose 'Group' to wrap them in a Column", with the two fields boxed.

**Root cause.** 3.12.5 gave the Group entry `anchorId: WalkthroughAnchorIds.groupContextMenuItem` (3.12.5
`packages/designer/lib/src/menus/widget_context_menu.dart:68-73`). The NMenu migration (commit `54d7680da`) made the sub-step wait
for the registry (`walkthrough_catalogue.dart:1101-1106`: `shownWhen` is `WalkthroughAnchorRegistry.get(...)?.currentContext != null`),
but the new entry, `intentEntry(context, label: 'Group', ...)` (`widget_context_menu.dart:40`), has no anchor, and `NMenuEntry`
cannot carry one (`packages/nowa_ui/lib/src/components/nmenu.dart:7-47`; `nowa_ui` cannot import core's `WalkthroughAnchor`). The
engine shows the last sub-step whose `shownWhen` is true (`walkthrough_engine.dart:132`), so the earlier hint stays. This is the
only id in `WalkthroughAnchorIds` (`overlay/walkthrough_anchors.dart:15`) that nothing registers.

**Suggested fix.** Give `NMenuEntry` an optional `Widget Function(Widget child)? wrap` that the menu row applies, and pass
`wrap: (child) => WalkthroughAnchor(id: WalkthroughAnchorIds.groupContextMenuItem, child: child)` for **Group** in
`widget_context_menu.dart:40`. Add a test to `packages/core/test/walkthrough_tests.dart`: open the widget menu and expect
`WalkthroughAnchorRegistry.get(WalkthroughAnchorIds.groupContextMenuItem)?.currentContext` to be non-null. Do this before turning
the walkthrough on.

**Docs impact.** None (the docs do not describe walkthrough steps).

### P5. The Library filter says "Classs"

- **Area:** Library filter menu (`packages/nowa_ui/lib/library/library_panel.dart`)
- **Severity:** Low — a typo in a menu label.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Reproduced live — 3.13.0 playground, "**Classs** (three s, confirmed by zooming)" in `reviews/P10-live-checks.md:135`; also in code.

**What happens.** The **Filter** menu of the Library lists the kinds as plural words, and the class entry reads **Classs**.

**Steps to reproduce**
1. Open the playground and open the **Library** (Ctrl/Cmd + 2).
2. Click the **Filter** icon next to the search field.
3. Read the entries under **Show**.

Expected: **Classes**.
Actual: **Classs**.

**Root cause.** `_kindName(kind, plural: true)` appends `s` to the singular (`library_panel.dart:759`, `:971-979`). The singular is
`Class`; every other kind (Screen, Component, Model, Global state, Function, Enum, Variable) takes a plain `s`. Same code on dev
(`library_panel.dart:764`, `:983-991`).

**Suggested fix.** Handle the one irregular plural, for example `plural ? (name.endsWith('s') ? '${name}es' : '${name}s') : name`.
The singular in the details card ("Class · location", `:1236`) is fine. `packages/nowa_ui` has no `test/` folder: a widget test
that opens the filter menu and expects "Classes" needs a new one.

**Docs impact.** `docs/design/library.md:29` quotes "the entry reads **Classs**": change it to **Classes** after the fix.

### P6. The Web View "Open Documentation." link does nothing

- **Area:** Widget picker preview, Web View (`packages/core/lib/src/widgets_to_add`, `packages/core/lib/src/widgets`)
- **Severity:** Low — one documentation link is dead.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — `Uri.parse` on the exact string throws (run on the Dart 3.12.2 SDK on disk); the click itself not run.

**What happens.** In the widget picker dialog the **Web View** preview card has an **Open Documentation.** link. It does nothing:
the URL string starts with a space, so `Uri.parse` throws inside the tap handler.

Correction: the line moved. Web View's `docUrl` is `widgets_to_add.dart:884` in 3.13.0 (857 in 3.12.5). The link exists only in the
dialog picker (right-click **Replace with...**, the **+** of an empty widget slot, widget-valued properties); the Library's
details card has no documentation link.

**Steps to reproduce**
1. Open the playground, draw a box with the **Shape** tool and right-click it.
2. Choose **Replace with...** (the **Search for a widget** dialog opens).
3. Type `web`, select **Web View**, and click **Open Documentation.** in the preview card.

Expected: the docs page for Web View opens in a new tab.
Actual: nothing opens. Repeat with **Container**: its link opens `https://docs.nowa.dev/ui/widgets/widget-desc/container`.

**Root cause.** `docUrl: ' https://docs.nowa.dev/ui/widgets/widget-desc/webview'` (leading space, `widgets_to_add.dart:884`) goes to
`launchUrl(Uri.parse(docUrl))` (`packages/core/lib/src/widgets/widget_picker.dart:338-340`). `Uri.parse(' https://...')` throws
`FormatException: Scheme not starting with alphabetic character (at character 1)`. The other 31 `docUrl`s parse.

**Suggested fix.** Remove the space, and make the tap tolerant: `Uri.tryParse(docUrl.trim())`, ignoring the tap when it is null.
Add a test in `packages/core/test/` that every `WidgetDocData.docUrl` in `widgetsToAdd` parses as an `https` URI (it also
covers P7).

**Docs impact.** `docs/design/add-widgets.md:63` and `docs/reference/widgets/index.md:19-21` describe the link; no change needed. Optionally
list it in `docs/troubleshooting/known-issues.md` until it is fixed.

### P7. 32 widget documentation links point at the old docs site's paths

- **Area:** Widget picker preview links (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart`)
- **Severity:** Low — the links work only because the docs site redirects the old paths.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — the strings read from the source and compared with `redirects.js` and the new catalog's anchors.

**What happens.** 32 widgets link to the old site layout: 31 `https://docs.nowa.dev/ui/widgets/widget-desc/<slug>` and Group's
`https://docs.nowa.dev/ui/layout/groups`. On the old site 14 of the 31 pages were "Coming soon" stubs (`textfield`, `svg`,
`floating-action-button`, `tabview`, `pageview`, `index-stack`, `cross-fade`, `wrap`, `slider`, `appbar`, `drawer`,
`alert-dialog`, `admob-banner`, `webview`) and `switch` never existed. The rewritten docs have no page at these paths;
`redirects.js` sends all 32 to `/reference/widgets#<slug>` or `/design/layout#groups`.

Correction: the old row says "32 `/ui/widgets/widget-desc/<slug>` URLs"; it is 31 of those plus `/ui/layout/groups`
(`widgets_to_add.dart:276`), which together are all 32 `docUrl:` lines (`:150-884`). 3.13 did not touch them.

**Steps to reproduce**
1. Do steps 1 and 2 of P6, then select **Container** and click **Open Documentation.**

Expected: the Container entry of the current docs opens.
Actual: `https://docs.nowa.dev/ui/widgets/widget-desc/container` opens. While the old site is published that is the old Container
page; once the rewritten docs are published the same URL is answered only by the redirect to `/reference/widgets#container`.

**Root cause.** The URLs are string literals in `widgets_to_add.dart`, so every released build keeps them.

**Suggested fix.** Point each `docUrl` at the current page: `https://docs.nowa.dev/reference/widgets#<slug>`, and Group at
`https://docs.nowa.dev/design/layout#groups`. All 31 anchors exist in `docs/reference/widgets/index.md` (`<Anchor id="<slug>" />`).
Keep the old redirects for released builds. The `Uri.parse` test from P6 covers the format.

**Docs impact.** `redirects.js` must keep its `/ui/widgets/widget-desc/<slug>` entries (at least the 31 the app links) and
`/ui/layout/groups` (`:106`) as long as released apps link there (decision D13 in `_rewrite/decisions.md`). `docs/reference/widgets/index.md:19-21`: no change.

### P13. The Create Theme Setup dialog names the wrong files

- **Area:** Themes, Create Theme Setup (`packages/core/lib/src/file_system/widgets/previews/main_preview/theme_setup_view.dart`)
- **Severity:** Low — misleading text; the files are created correctly.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — dialog text compared with the file constants; the dialog was not opened.

**What happens.** The dialog says it will add `lib/global/theme.dart` and `lib/global/app_state.dart`. Nowa creates
`lib/globals/themes.dart` and `lib/globals/app_state.dart`.

**Steps to reproduce**
1. Open `/playground`, open the starting-point chip in the top bar, choose **Empty app** and confirm **Discard** (this starter has no `themes.dart`, `packages/core/lib/src/file_system/templates/project_bundles/default_bundles.dart:73-87`).
2. Open **Themes** (Ctrl/Cmd + 3): it shows "Error loading themes file: ..." and **Create Theme Setup**. (The other way in: select a Button, click its **Style** field while no theme is applied, `packages/core/lib/src/fields/button_fields.dart:434-436`.)
3. Click **Create Theme Setup** and read the dialog.

Expected: it lists `lib/globals/themes.dart` and `lib/globals/app_state.dart`.
Actual: it lists `lib/global/theme.dart` and `lib/global/app_state.dart`.

**Root cause.** The two `Text` lines are literals (`theme_setup_view.dart:62-63`); the files come from `FileTemplate.themesDart` and
`FileTemplate.appState` (`packages/core/lib/src/file_system/templates/file_template.dart:33-34`). The dialog also lists both files every
time, though `setupThemeSystem` skips one that exists (`packages/core/lib/src/project_environment/env_manager.dart:155-176`; the Empty app has
`app_state.dart` already). The sentence has a lower-case "adding" after a full stop (`:61`).

**Suggested fix.** Build the two lines from `FileTemplate.themesDart` and `FileTemplate.appState` and list only the files that do
not exist yet (`gProject.files.getEntitySync`, as `EnvironmentManager.hasThemeSetup` does, `env_manager.dart:24-28`). Extend the test
at `packages/core/test/envirnoment_tests/envirnoment_provider_test.dart:115` to compare the dialog's paths with the created files.

**Docs impact.** `docs/design/themes.md:108` names the real paths and is right; its "Projects you create in Nowa already have
both files" does not hold for the playground's **Empty app**. Nothing else to change.

### P14. Expand is offered for a child of a Wrap, and Flutter rejects it

- **Area:** Details → Layout size modes (`packages/designer/lib/src/details`, `packages/core/lib/src/layout`)
- **Severity:** Medium — an option the UI offers breaks the screen's rendering; picking Fixed or Auto, or Undo, avoids it.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — the option is offered and the widgets Nowa writes are invalid inside a Wrap (Flutter source read); the board result not run.

**What happens.** A child of a **Wrap** gets **W** and **H** mode dropdowns with **Fixed**, **Expand** and **Auto**. **Expand**
cannot work in a Wrap: along the Wrap's direction Nowa wraps the child in a `Flexible`, across it sets an infinite size, and
Flutter rejects both.

**Steps to reproduce** (not run)
1. Open the playground, press Ctrl/Cmd + K, type `wrap` and press Enter to add a **Wrap**.
2. Put two widgets in it (drag two built-in widgets from the **Library**, or draw with the **Shape** tool inside it).
3. Select one child, open **Layout** in **Details**, and set the **W** mode dropdown to **Expand**. Then try **H**.

Expected: **Expand** is not offered for a Wrap's child.
Actual (by the code): **W** → **Expand** puts `Flexible` directly under the Wrap ("Incorrect use of ParentDataWidget" in debug,
a type-cast error in release); **H** → **Expand** gives the child `height: double.infinity` inside a Wrap whose cross axis is
unbounded ("BoxConstraints forces an infinite height"). The board then shows its Canvas error.

**Root cause.** A Wrap's children get the flex layout (`packages/core/lib/src/layout/layout.dart:52-59`, `'Wrap': FlexLayout.new`), so
both dropdowns show (`packages/designer/lib/src/details/flex_size_field.dart:5-31`). The offered modes come from
`SizeTypeHelper.fromFieldFlex` (`packages/designer/lib/src/details/size_fields.dart:125-131`); `canExpandField` (`:42-63`) only
checks for a Scroll View ancestor, never the parent type. Choosing **Expand** on the Wrap's own axis sets `flex = 1`
(`flex_size_field.dart:61-68,114-121`, axis from `DirectionHelper.findDirection`,
`packages/core/lib/src/layout/flex_layout.dart:119-146`), which `FlexSizedBox` builds as `Flexible(fit: tight)`
(`packages/nowa_runtime/lib/src/widgets/widgets.dart:85`); on the other axis it sets `double.infinity`. In the Flutter 3.44.8 source on disk
`Flexible` is a `ParentDataWidget<FlexParentData>` (`packages/flutter/lib/src/widgets/basic.dart:6044-6070`) checked at
`widgets/framework.dart:6876-6902`; `RenderWrap` passes its children an unbounded cross axis (`rendering/wrap.dart:739-742`);
a tight infinite size is rejected (`rendering/box.dart:608-614`).

**Suggested fix.** In `SizeTypeHelper.canExpandField` (or `fromFieldFlex`) return false when the field's instance's parent widget
is a `Wrap` (`FlexSizedBoxHelper.target.widgetParent`, `flex_layout.dart:71-74`, has `className == 'Wrap'`). A child that already
holds an Expand value should show **Fixed** or **Auto**, not an option the menu no longer lists. Test in
`packages/designer/test/details_test.dart`.

**Docs impact.** `docs/design/layout.md:76` says a widget in a Row, Column or Wrap shows **Fixed**, **Auto** and **Expand**: say
that a Wrap's child gets **Fixed** and **Auto** only. Line 68 already limits **Expand** to Row and Column.

### P19. The + under a global state in Globals creates a variable the list then hides

- **Area:** Variables panel → Globals (`packages/core/lib/src/state_management`, `packages/core/lib/src/widgets/code`)
- **Severity:** Medium — the button looks dead and leaves unseen variables in the global state's file; the Library editor shows them.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — the create path and the list filter read; not run.

**What happens.** With nothing selected, **Variables** shows **Globals** with one section per attached global state. Hovering
a section name shows **+**. Clicking it adds a variable to the class, but the list never shows it. The list shows only `final`
variables, and a global state's variables normally are not (the starter's `AppState` keeps a private non-final `_theme`), so the
section usually lists nothing at all.

Correction: the old row blames the hidden list only; the same filter also hides every existing non-final variable of a global
state, not just new ones.

**Steps to reproduce**
1. Open the playground (the starter has the global state **AppState**) and click an empty part of the board so nothing is selected.
2. Click **Variables** above **Details** to open it. It shows **Globals** and **AppState**.
3. Hover **AppState** and click **+**.
4. To see what happened, open the **Library**, choose **Filter** → **Global states**, double-click **AppState** and click its class name.

Expected: a new variable row appears, ready to rename.
Actual: nothing appears in **Globals**. The editor in step 4 lists a new variable (`var1`, then `var2`, one more per click).

**Root cause.** `ProviderList` draws each global state with `ClassVarList(provider, ...)` and no `onlyFinalVars`
(`packages/core/lib/src/state_management/global_state_widgets.dart:60-75`). The default is `onlyFinalVars = true`, and the list keeps only
`e.isFinal` (`packages/core/lib/src/widgets/code/declaration_list_widgets.dart:315,339`). The **+** creates the variable with
`isFinal: calculateIsFinal()` (`:329,353`), which is `klass.constructor is AutoConstructor`: a global state's constructor is a plain
`ConstructorImpl` (`packages/core/lib/src/interpreter/declaration_runtime.dart:455-461`, `NotifierClassDecl.withBody` `packages/core/lib/src/state_management/provider_blocks.dart:20-24`),
so the new variable is non-final and filtered out. The Library's class editor passes `onlyFinalVars: false` (`packages/core/lib/src/fields/class_editor.dart:43`).

**Suggested fix.** Pass `onlyFinalVars: false` in `global_state_widgets.dart:60`. Add a widget test in
`packages/core/test/interpreter_tests/global_state_test.dart`: pump `ProviderList`, tap **+**, expect a new row.

**Docs impact.** `docs/logic/global-state.md:48` ("Under a name it lists only final variables, so open the global state from the
Library...") goes away after the fix; check `docs/logic/variables.md:17` and `docs/design/index.md:33`, which mention **Globals**.

### P20. One large Ctrl + wheel zoom step breaks the board view, and the broken view is saved

- **Area:** Board zoom (`packages/core/lib/src/board/board_view.dart`, `packages/core/lib/src/file_system/board_file_state.dart`)
- **Severity:** Medium — few people send a step this big, but the board then looks empty, and it stays that way after a reload.
- **Where:** both; both (on the web the saved value is in `localStorage`)
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — seen live on 3.12.5 (`_rewrite/captures/README.md:93-95`); the code is unchanged in 3.13.0; not re-run.

**What happens.** `zoom` is meant to cap one zoom event at ±10%, but the cap is never applied. One wheel or pinch event with a
large delta scales the board by zero or a negative number (flipped, huge or gone). Nowa saves the view 400 ms after the last event
and reads it back unchecked, so the broken view returns on reload.

**Steps to reproduce**
1. Open the playground (or any project) with a board in view.
2. Hold Ctrl and send one wheel event with `deltaY = -1800` over the board (for example from a script: `page.mouse.wheel(0, -1800)` with Control down). An ordinary wheel notch is about ±100 and is fine (`_rewrite/captures/README.md:93`); an input device or script that sends 480 or more in one event breaks it.
3. The board content disappears or is flipped. Reload the page: the broken view returns.

Expected: the zoom changes by at most 10% per event, and a stored zoom outside a sane range is ignored.
Actual: the board matrix is multiplied by a value of 0 or less.
Recovery (unverified): select a screen in the **Outline** and press F, or double-click its row (`docs/design/boards.md:40`; the code resets the matrix in `animateTo`, `board_view.dart:261-273`); or delete the `flutter.listBoardViewStatus` entry.

**Root cause.** `zoom` computes `zoomDelta = -delta / 500` and then calls `clampDouble(zoomDelta, -0.1, 0.1);` as a statement
without using the result (`board_view.dart:123-126`), then multiplies the matrix by `zoomDelta + 1` (`:134-136`). That factor is
0 or less when `delta >= 500`. Flutter web turns Ctrl + wheel into a `PointerScaleEvent` with `scale = exp(-deltaY / 200)` (Flutter
3.44.8 `engine/src/flutter/lib/web_ui/lib/src/engine/pointer_binding.dart:758-772`), and Nowa passes `(scale - 1) * 50` (`board_view.dart:225-229`), so
the factor is 0 or less at `deltaY <= -480` (a pinch with no Ctrl held uses `(1 - scale) * 1000`, which breaks at `deltaY >= 139`);
the desktop wheel path passes `scrollDelta.dy` (`:237-241`). The view is saved from `currentZoom` and the translation
(`packages/designer/lib/src/design_experience/designer_board_controller.dart:136-139,160-181`, `board_file_state.dart:44-66`) and applied on open without a check
(`packages/designer/lib/src/board/board_editor.dart:22-31`, `packages/core/lib/src/board/board_controller.dart:18-20`). Web storage:
`shared_preferences_web` writes `localStorage` with the prefix `flutter.` (`shared_preferences_web-2.4.3/lib/shared_preferences_web.dart:26,93`).

**Suggested fix.** Use the result: `final zoomDelta = clampDouble(-delta / 500, -0.1, 0.1);` (`board_view.dart:124-126`). Also reject
a bad view: skip `_saveViewState` when the zoom is not finite or outside, say, 0.05 to 20, and ignore such a stored value in
`BoardFileStateService.getViewData` (`board_file_state.dart:68-76`). Test: a new `packages/core/test/board_view_test.dart` that calls
`ViewController.zoom(-1800)` and `zoom(2000)` and expects `currentZoom` within bounds and a positive scale.

**Docs impact.** None required. `docs/design/boards.md:39-42` ("Each board remembers its zoom and position on your device") is
right; until the fix, a known-issues line may tell people to press F on a selected item.

### P21. The home screen turned grey with a "Canvas error ... preferredSize" after switching its Group from Column to Row

- **Area:** Group section, Stack/Column/Row switch (`packages/designer/lib/src/details/group_details.dart`, `packages/designer/lib/src/error_boundary.dart`)
- **Severity:** Medium — as reported, the main screen is unusable on the board until it is undone; whether it still happens is unknown.
- **Where:** web app (seen in the playground); not tried on the desktop app or in cloud and local projects
- **Status:** Can't tell: the symptom was seen once on 3.12.5, its full error text was not kept, and nobody has re-run that exact sequence on 3.13.0
- **Confidence:** Code reading only, not run — the code path is unchanged, but its failure point was never found.

**What happens.** Seen by a capture agent in the 3.12.5 playground starter (`_rewrite/captures/README.md:113-114`): switching the home
screen's Group to a Row painted the screen grey, with "Canvas error ... preferredSize" in the status bar.

What the code says:
- Grey is a build error. Flutter replaces the failed widget with its error widget, which is plain grey in a release build (Flutter 3.44.8 `packages/flutter/lib/src/rendering/error.dart:112-117`, `widgets/framework.dart:5655`).
- The status text is `Canvas error: <exception>` plus the first 12 stack frames (`error_boundary.dart:95-106`); only "preferredSize" was noted. In Flutter, `preferredSize` is read by `Scaffold` for its `appBar` (`packages/flutter/lib/src/material/scaffold.dart:3051`), and the starter's home page is `Scaffold(appBar: AppBar(...), body: SafeArea(child: Stack(...)))` (`packages/core/lib/src/file_system/templates/common/home_page_template.dart:21-32`).
- The switch runs `BFGroup._toDirection` → `_replace(createRow([]))` (`group_details.dart:44-60`) → `Designer.recordReplaceAndKeepArgs` (`packages/designer/lib/src/design/widget_design.dart:6-40`) → `DesignerModel.replaceWidget` (`packages/core/lib/src/interpreter/widget/designer_model.dart:439-452`) → `CallExpr.replaceAndKeepArgs` (`packages/core/lib/src/interpreter/block_tree.dart:6296-6304`). These are unchanged from 3.12.5 apart from an NMenu edit in `group_details.dart` and a console dump added to `error_boundary.dart:96-98`. `git log -S"preferredSize" b84bfdafd..3cb32031c` finds nothing, so no commit touched it.
- 3.13.0 live evidence points both ways: the re-take of `design-layout-1` switched the home screen's Group to a Row (Stack → Row), and `design-layout-video` ran a Column on the same screen, both without a recorded error (`_rewrite/captures/log.md:20,43`). Neither did Column → Row.

Missing: the full status-bar text (message and frames), and one run of Stack → Column → Row on 3.13.0.

**Steps to reproduce** (to settle it)
1. Open `https://app.nowa.dev/playground` (Starter app).
2. Click the home screen's title to select it. In **Details** → **Group** click the down arrow (Column), then the right arrow (Row).
3. Look at the board and read the whole status-bar message (open the Logs if it is cut).

Expected: the Row, no error.
Actual on 3.12.5: the screen is grey and the status bar reads "Canvas error ... preferredSize".

**Root cause.** Unknown. Where to look once the text is known: if it names `Scaffold` or `AppBar`, check what `Scaffold(appBar:)` receives
after `replaceWidget`, which runs `onRemove()` and `onAdd()` on the top widget (here the Scaffold) and walks everything under it
(`designer_model.dart:439-452`, `packages/core/lib/src/interpreter/widget/widget_blocks.dart:131-200`).

**Suggested fix.** None until the text is captured. Add the whole message to the report; the boundary already logs it
(`error_boundary.dart:106`), and in a debug build every boundary error also reaches the console (`:96-98`). A regression test then
goes in `packages/designer/test/widget_test.dart` beside "Replacing a Row with a Stack".

**Docs impact.** None until confirmed. `docs/design/layout.md` (Groups) documents the three Group buttons.

### P22. A top-level function or enum Nowa could not load is deleted when Nowa saves the file

- **Area:** Code sync (`packages/core/lib/src/interpreter/visitors`, `packages/core/lib/src/file_system`)
- **Severity:** Critical — hand-written code disappears without a warning; the trigger is narrow (a top-level function or enum Nowa cannot read, in a file Nowa then saves).
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Code reading only, not run — every step traced in code; no guard was found.

**What happens.** When a file holds a top-level function or enum that Nowa cannot read, Nowa loads the rest of the file and
lists "'name' could not be loaded: ..." in **Problems**. The skipped declaration is not in Nowa's model. The next time Nowa saves
that file from its model, the file is written without it. Auto-save is on by default and runs every 20 seconds.

**Steps to reproduce**
1. Open a project (the playground works). Click the `<>` button next to **Settings**, open `lib/pages/home_page.dart`, add at the end of the file this function and save with Ctrl/Cmd + S:
   `Stream<int> countDown() async* { yield 3; }`
   **Problems** now lists "'countDown' could not be loaded: ..." (`yield` is not supported, `docs/code/limitations.md:40`).
2. Click `<>` again to leave code mode.
3. Change the home screen on the board, for example draw a box with the **Shape** tool.
4. Wait 20 seconds or press Ctrl/Cmd + S, then open `home_page.dart` in code mode.

Expected: `countDown` is still in the file, as you wrote it.
Actual (by the code): `countDown` is gone, and **Problems** no longer lists it.

**Root cause.**
- Loading. `visitCompilationUnit` loads each top-level declaration in a `try`; with `continueOnException` (set by the importer and by `DartFile.fromSource` and `reparse`: `packages/core/lib/src/file_system/dart_importer.dart:20`, `dart_file.dart:46,101`) an exception only adds a `DeclarationLoadFailure`, and the declaration is left out of the unit (`ast_to_block_visitor.dart:161-180`, `decls` at `:180`).
- No fallback for functions or enums. Classes fall back to a custom class that keeps their text (`:688-691`), methods to `CustomMethodDecl` (`:1130-1136`). A top-level function keeps its text only with `@CustomFunction` (`:1171-1186`); otherwise its body is read with no `try` (`:1168-1223`, `visitBlock` has none: `:1499-1502`; `yield` has no visitor). Enums (`:621-669`), top-level variables (`:945-947`), mixins (`:586-618`) and extensions (`:2146-2162`) have none either.
- Saving. `BlockUnit.source` is the loaded declarations only (`packages/core/lib/src/interpreter/block_tree.dart:7044-7062`); `loadFailures` is read only to list problems (`dart_file.dart:319`). `DartFile.text` returns the original text only when the parser reported syntax errors (`errors.isNotEmpty`), otherwise it regenerates from the unit (`dart_file.dart:116-122`). A dirty file is written from that text (`packages/core/lib/src/file_system/file_object.dart:546`, `nfile_impl.dart:329-343`).
- Triggers. Any change to the unit marks the file dirty (`dart_file.dart:146-158`). A rename or move of a file marks every file that imports it dirty (`nfile_impl.dart:115-127`), as does `relinkProjectAndRegenerateImports` when imports change (`packages/core/lib/src/providers/project_provider.dart:884-902`). Auto-save: `packages/core/lib/src/project/saving_service.dart:8-9,15-16,66`.
- Second path, the AI **edit** tool: it reads `content.text` (the regenerated text, without the function) and writes its edit over that (`packages/ai/lib/src/tools/edit_tool.dart:43-48,60,113`), so an AI edit anywhere in the file drops it as well.
- Safe paths: code-mode saves write the buffer's exact text (`packages/core/lib/src/widgets/code_editor/code_options.dart:210-224`); files with syntax errors; classes and methods; `@CustomFunction(...)` with arguments. A bare `@CustomFunction()` loses its annotation on the first rewrite (`declaration_hybrid.dart:98-111`) and is then loaded as a normal function again.
- Same in 3.12.5 (`block_tree.dart:6851-6858`, `dart_file.dart` unchanged). 3.13 added the `library;` and `part` lines to what `BlockUnit.source` writes and a loader change that keeps the file's declaration order; neither keeps a failed declaration.

**Suggested fix.** Keep what fails. In `visitFunctionDeclaration` catch the load error and fall back to `CustomFunctionDecl(node, ...)..loadFailure = e.toString()`,
as `visitMethodDeclaration` does (`:1130-1136`); do the same for enums with `CustomEnum(node)` (`declaration_hybrid.dart`), and add
one generic "raw declaration" (original text from the AST node) for variables, mixins and extensions. As a backstop store the
source span in `DeclarationLoadFailure` and have `BlockUnit.source` write failed declarations back in file order, so no loader bug
can delete code. Make the edit tool's `old_string` match against the same text it writes. Tests: `packages/core/test/interpreter_tests/dart_loading_test.dart`
(a screen plus an `async*` function: change the screen, expect `file.text` to contain the function) and `packages/ai/test/edit_tool_test.dart`.

**Docs impact.** `docs/code/limitations.md:36` ("Nowa skips only that part and loads the rest of the file") and `:73`,
`docs/test/problems.md:79` and `docs/code/custom-code.md:118` ("skipped and listed in Problems"): until fixed, add that a skipped
function or enum is removed from the file the next time Nowa saves it after a change on the board or by the AI, with the
workarounds (edit such files only in code mode, or give the function `@CustomFunction(preview: '...')`). After the fix, say it stays as you wrote it.

### P38. @CustomWidget has no effect, unlike @CustomFunction

- **Area:** Custom code annotations (`packages/nowa_runtime/lib/src/annotations.dart`, `packages/core/lib/src/interpreter`)
- **Severity:** Low — an exported annotation that looks like `@CustomFunction`'s twin and does nothing; the docs do not mention it.
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Confirmed in code — loader, declaration classes and board rendering read; not run.

**What happens.** `@CustomFunction` on a top-level function makes Nowa keep it as code and never run it on the board (it
returns the `preview`). `@CustomWidget(preview:, imports:)` is the matching annotation for widget classes, but it does not
switch a widget to custom code, and its `preview` is never read.

Correction: the old row's lines moved. In 3.13.0 the reads of `@CustomWidget` are `ast_to_block_visitor.dart:716-732` and
`declaration_hybrid.dart:182-231`.

**Steps to reproduce**
1. In code mode create `lib/components/greeting.dart` with `@CustomWidget(preview: "const Text('preview')")` above `class Greeting extends StatelessWidget` whose `build` returns `const Text('hello')`. Import `package:nowa_runtime/nowa_runtime.dart`. Save, then click `<>` to leave code mode.
2. Open the **Library**, find **Greeting** under **Project** and insert it on a board.
3. Select it and look at **Details**.

Expected (as with `@CustomFunction`): the widget is kept as code, so the board shows a placeholder or the `preview`, and **Details** says **Kept as code**.
Actual (by the code): the board draws the real `Text('hello')`; nothing marks it as custom code.

**Root cause.** `visitFunctionDeclaration` switches on the function annotation at once (`ast_to_block_visitor.dart:1171-1186`, and for methods
`:1099-1102`). `visitClassDeclaration` never looks for `@CustomWidget` (`:672-693`). It is read only in `_createCustomClass`
(`:716-732`), which runs when a class fails to load or when a file is imported with **Import as Custom code** (`loadCustomCode: false`,
`packages/ai/lib/src/tools/ai_response_actions.dart:19`). Even then `CustomWidgetDecl.preview` is stored (`declaration_hybrid.dart:196`) and
never used: its `build` is a `CustomMethodDecl` without a preview, and `customInvoke` returns the blue placeholder for any
widget (`declaration_hybrid.dart:29-32,156-165`). For a regular class the annotation is also in `_interpretedAnnotations` (`:237`), so it is
not kept, and the class is rewritten without it after the next visual edit (`_keepAnnotations`, `:265-285`; not run). `imports` does
work (`declaration_hybrid.dart:201-202`, `imports_visitor.dart:74-104`). The product repo's own plan lists both annotations as one
unchecked item (`docs/features/hybrid approach.md:16`).

**Suggested fix.** Decide with product, then do one of two small things. Make it real: in `visitClassDeclaration` return
`_createCustomClass(node)` when the class has `@CustomWidget` and a widget superclass (mirrors `:1178`), and build `preview` as a
widget expression in `CustomWidgetDecl` instead of the placeholder. Or remove it: delete `CustomWidget` from `annotations.dart` and
`_interpretedAnnotations`. Either way, fix `CustomFunctionDecl.annotationSource` (`declaration_hybrid.dart:98-111`) so a bare
`@CustomFunction()` is kept on rewrite. Test: `packages/core/test/interpreter_tests/lib_test.dart`, next to "loading a custom function" (`:909-922`).

**Docs impact.** `docs/code/custom-code.md` (section "Control what the board shows for a function", line 80) names only
`@CustomFunction`, which is right. Keep it that way until the annotation works (`_rewrite/coverage.md` gap G11 suggests naming
`@CustomWidget`: don't); then add a short `@CustomWidget` paragraph to that section.

### P52. Group header ⋯ → Remove deletes every child but the first

- **Area:** Details → Group section (`packages/core/lib/src/fields/class_field.dart`, `packages/core/lib/src/interpreter/widget`)
- **Severity:** High — widgets the user placed in a group are deleted without a warning, and Undo does not bring them back (by the code).
- **Where:** both; both
- **Status:** Present in 3.13.0 and dev
- **Confidence:** Code reading only, not run — traced from the menu entry to the tree edit and its undo.

**What happens.** On a group that has a wrapper, **⋯** → **Remove** takes the group out and puts only its first child where it
was. The other children are deleted. Undo puts back the group, empty.

Correction: the old row says "when the parent isn't a list of children only the first child survives". A group that shows
**Remove** always has a wrapper above it, so its parent is never a list: first-child-only is the normal case. And the wrappers
include Safe Area and the screen itself (Nowa counts any widget with a `child` or `body` as a wrapper, and calls the Scaffold
**Screen**), so the home screen's own group, the Stack in `SafeArea` under the Scaffold, already shows **Remove** in a new
project. The same menu entry exists on the other multi-child sections (List View, Wrap...) when they have a wrapper.

**Steps to reproduce** (not run)
1. Open the playground (Starter app). Draw two boxes with the **Shape** tool on the home screen so its Stack holds two widgets.
2. Select the Stack (its row in the **Outline**), so **Details** shows the **Group** section.
3. Hover the **Group** header and click **⋯**. The menu lists **Replace with...** and **Remove** (red). Click **Remove**.
4. Look at the board, then press Ctrl/Cmd + Z.

Expected: both boxes stay in place, as with **Ungroup** (or both are removed, with a warning); Undo restores them.
Actual (by the code): the first box stays, the second is deleted; Undo restores an empty Stack in place of the first box.

**Root cause.**
- The entry shows when `instance.widgets.length > 1` (`> 2` when the outermost widget is an Expanded, Positioned, SizedBox, FlexSizedBox or BoardPosition, `packages/core/lib/src/interpreter/widget/widget_blocks.dart:465`) (`packages/core/lib/src/fields/class_field.dart:378-386,396-400`), where `widgets` is the base widget plus every wrapper above it (`packages/core/lib/src/interpreter/widget/designer_model.dart:225-242`, `isWrapperClass` `packages/core/lib/src/interpreter/widget/widget_blocks.dart:291-304`; Scaffold is named **Screen**, `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:667-672`). The Group header uses it at `packages/designer/lib/src/details/group_details.dart:82`.
- **Remove** calls `recordRemoveWidget` on the group itself (`class_field.dart:388-393`), which runs `removeWidget` → `widget.dissolve()` (`designer_model.dart:394-402`). `dissolveTree` takes all widget children out of the group, then `parent.setChild(slot, children.first)` unless the parent is a `ListBlock` (`widget_blocks.dart:131-162`). The wrapper is not a `ListBlock`, so `children[1..]` are dropped.
- Undo is `addBaseWidget(group)` (`designer_model.dart:404-417,419-436`): it sets the already emptied group back into the wrapper's slot, replacing the first child.
- **Ungroup** is safe: it moves each child out first (`packages/designer/lib/src/design/common_design.dart:25-50`).

**Suggested fix.** Smallest: hide **Remove** when the base widget has more than one widget child and its parent is not a list, in
`WidgetMoreButton.isRemovable` (`class_field.dart:378-386`); and make `dissolveTree` throw `UnsupportedError('dissolving an object with
multiple children')` for that case, as `Block.dissolve` does (`block_tree.dart:281`), so nothing is lost silently. If **Remove**
should delete the group and its content, remove the whole widget instead and say so in the label. Give the undo a snapshot of the
group's subtree (as `recordReplaceAndKeepArgs` does with `BlockSnapshot`, `widget_design.dart:31-42`). While there: the `ListBlock` branch
inserts every child at the same index (`widget_blocks.dart:154`), which reverses their order; the menu does not reach it today.
Test in `packages/designer/test/widget_test.dart` beside "Dissolving a column within a tree": `Padding(child: Column([a, b]))`, remove the Column, expect `a` and `b`
still present (or the entry hidden), and that undo restores both.

**Docs impact.** `docs/design/layout.md` (Groups: the paragraph on the **⋯** button, which lists only **Replace with...**): add **Remove**
and what it does once it is fixed; until then leave it out. `docs/design/screens.md:49` (Screen wrapper) is related background.
