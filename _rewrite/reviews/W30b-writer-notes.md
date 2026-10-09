# W30b writer notes (3.13 update: design + code pages)

Batch W30b. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0); 3.12.5 is `b84bfdafd` (diff with
`git diff b84bfdafd 3cb32031c -- <path>`). Change ids C1-C27 and part numbers refer to
`_rewrite/research/changes-3.13.md`. Code refs are `path:line` in the 3.13 tree.

Pages (all under `docs/`): design/properties, layout, themes, theme-styles, assets, templates, localization,
fonts-icons, responsive; code/files, code-mode, custom-code, limitations, packages, import, index, vs-code,
local-projects, git, github.

"Needs a live check" items are collected at the end of this file.

## Design pages

### design/properties.md (C15)
- Row "A choice": nullable enum dropdown starts with **Default**; choosing it removes the value; an unset property shows
  **Default**. Code: `packages/core/lib/src/fields/basic_fields.dart:1511-1553` (`BFEnum`: `if (type.isNullable) ... Text('Default')`,
  `onUpdate: newVal == null ? field.remove() : ...`); selected-item match for an unset value:
  `packages/core/lib/src/fields/nowa_fields.dart:834-900` (`SelectField`, the `null`-valued item is the current one).
- Nothing else changed on the page (restyle only: `widget_details.dart`, `group_details.dart` diffs show only NButton swaps).

### design/layout.md (C4)
- Three "widget picker" mentions now say Library (Ctrl/Cmd+K opens it in add mode; `packages/designer/lib/src/actions/add_actions.dart:13-31`).
- Group step says "type `group`, select **Group** and press Enter" (not "press Enter"): results are grouped Project, Packages,
  Built-in and the first symbol row is the highlighted one (`packages/nowa_ui/lib/library/library_panel.dart:245-292,241`), so a project
  widget with "group" in its name would be inserted instead of the built-in **Group**. Built-in entries **Group**, **Wrap**,
  **List View**: `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:268-345,467-477`.

### design/themes.md (C12, C20)
- Themes are variables of type `ThemeData`: `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:57-63` (filter
  `variable.type == $ThemeData.thisType`); type is inferred from the initializer, so a function-built theme counts
  (`packages/core/lib/src/interpreter/declaration_runtime.dart:1117-1160`). "Active" label/`activeThemeVar`:
  `themes_panel.dart:57-63`, `packages/core/lib/src/project/env_services/theme_service.dart:20-31`.
- Delete on the applied theme: greyed, subtitle "The applied theme": `packages/core/lib/src/panels/details/theme_panel/themes_context_menu.dart:7-20`.
- Extension tabs: `Default Theme` tab only when the theme is `ThemeData(...)`; function/copyWith themes show only extension tabs:
  `theme_panel_details.dart:15-47`. Colors that point to another color show as the color: `themes_panel.dart:214`
  (`colorsAsValues: true`), `packages/core/lib/src/fields/block_field.dart:870-880`. 8-extension limit still in
  `packages/core/lib/src/themes/theme_class_instance.dart:31`.
- Not claimed: that the panel now reads the file holding the applied theme (`themes_panel.dart:44`), the page still says `lib/globals/themes.dart`.

### design/theme-styles.md (C20)
- New subsection "Colors from theme extensions" (H3 under "Use a theme color", no anchor existed) and one paragraph under the text style steps.
- Tabs: one per extension class with `Color` fields + last tab **Material** (holds the roles and **Show more colors**):
  `packages/core/lib/src/fields/color_fields.dart:810-890`. Opens on the linked extension, else the first, else Material
  when a Material role is linked: `color_fields.dart:886-891` (`_tabOf`). Link text: `packages/core/lib/src/themes/theme_token.dart:22-31`
  (`AppColors.of(context).x` if the class declares `of`, else `Theme.of(context).extension<AppColors>()!.x`). Extension rows have no
  **Edit** (`ColorStyleTile` without `field`, `color_fields.dart:148-175`; `TextStyleTile(null, ...)`, `text_fields.dart:939-975`).
  Extension classes = classes that extend `ThemeExtension`: `ast_to_block_visitor.dart:856-862`; tokens come from all of them
  (`theme_service.dart:98-107`), not only those attached to the applied theme.
- Text styles: group header per extension that has `TextStyle` fields, then header **Material** only when there are tokens:
  `packages/core/lib/src/fields/style_fields/style_fields.dart:232-283`.
- New capture placeholder `design-theme-styles-2` (needs a ThemeExtension in the starter project); request row in `captures/requests/W30b.md`.

### design/assets.md (C1-C3, C6)
- Upload: Library **Add** (+) > **Upload Assets...** (`lib/project/panels/library_panel/library_host.dart:176-186`); target is the folder of the
  last-highlighted row when it is in `assets/`, else `assets/` (`:179-181`). Right-click **Upload assets...** only exists on folders *inside*
  assets (there is no row for the `assets` root itself: `library_service.dart:296-345`), so the page says "right-click that folder".
- Menu for an asset file: **Open** (Enter), **Rename** (F2), **Delete**, **Show in code**; folders: **Upload assets...** (`library_host.dart:156-172`);
  no **Insert** for assets (`widgetFor` is null). Delete confirm text for files is `Are you sure you want to delete "name"?` + Cancel/Yes
  (`packages/core/lib/src/file_system/actions/file_actions.dart:121-160`); page only says "confirm with **Yes**".
- Dragging an asset onto the board: `designer_board_controller.dart:240-262` + `library_service.dart:121-127`.
- Search finds assets even with the chip off (loop over all `LibrarySource.values`, `library_panel.dart:258-271`), assets ignore the kind filter (`:331-332`).
- **Copy as path**, **View in folder**, **Show file content** live only in code mode's Files tree (`files_tree_host.dart:440-494`).
- Alt text of `design-assets-1` rewritten for the Library (Tier 1 in part 5); the image file is still the 3.12.5 one until it is re-taken.

### design/templates.md (C3, C22)
- "Other places to start from": Library **Add** (+) > **New Widget...** (`lib/project/panels/files_panel/add_lib_menu.dart:37-49`: opens the template picker, then `openFile`).
- NOT written (research said "the Onboarding templates add `smooth_page_indicator`"): the template metadata declares `packages: {'smooth_page_indicator': '^2.0.1'}`
  (`packages/core/lib/src/services/templates/built_in/onboarding_template.dart:6`; the animated one is commented out of the picker, `templates_service.dart:380`), but the only reader of
  `template.packages` is `ProjectProvider.importTemplate` (`packages/core/lib/src/providers/project_provider.dart:766-773`), which runs only inside the temporary `TemplateProjectProvider`
  (`packages/core/lib/src/providers/template_project_provider.dart:58`) whose `services` map has no `PubspecManager`, so the loop is skipped. The add-template flow imports the files
  straight into `gProject` (`file_actions.dart:28-56`, `add_template_dialog.dart:_submit`) and registers no package. So nothing in the code adds the package to the user's pubspec when the
  template is imported; the template's Dart does `import 'package:smooth_page_indicator/smooth_page_indicator.dart'`. Needs a live check (see below); the page says nothing about it.

### design/localization.md (C22, C19)
- AI package tool still refuses `flutter_localizations`: `packages/ai/lib/src/tools/packages_tool.dart:164-169` ("flutter_localizations is not supported by nowa, use a different approach."); page says it tells the agent to use another approach (the string is a tool result, not UI text).
- `sdk:` dependency counts as installed so "'x' is imported but is not in the pubspec." isn't reported: `packages/core/lib/src/interpreter/packages/package_service.dart:363-369`, problem text `:419`.
- Project `LocalizationsDelegate` that fails to load: `logError('Could not load ${instance.type?.name}: $e')` and returns null so the board keeps drawing: `packages/core/lib/src/localization/localizations_class_instance.dart:33-44`. The text says "the delegate's name" (that is the delegate class name).
- Deliberately NOT claimed: that the board draws `flutter_localizations` classes (no bridged library exists: `grep flutter_localizations` finds only package_service and packages_tool), and not claimed any new rendering support beyond the fail-soft load. Note: commit `5e4097e84` also gives each interpreted resource class a real `Type` so `Localizations.of(context, YourClass)` finds the loaded resource (`localizations_class_instance.dart:6-30`); the page's existing sentence "the board can render it" stays as it was.

### design/fonts-icons.md (C22)
- Research said "no edit". Added one sentence: the `google_fonts` package is built in and runs on the board (`packages/core/lib/src/interpreter/packages/dart_package.dart:82-130,192-196`; `packages/core/lib/src/interpreter/libraries/google_fonts_library_custom.dart:1-45`, one static per family calling `GoogleFonts.getFont`). Needs a live check that the font actually shows on the board.

### design/responsive.md (C19)
- Research said "no edit". The "Design with realistic content" table changed for two rows: nullable colors now mock to `null` (`packages/core/lib/src/interpreter/mock.dart:300-304`, was always grey), and a mocked image is 48 x 48 when it sets no size (`mock.dart:118-132`, `:323-331`, `_mockImageSize` `:243-245`). Widget (48 px box when non-nullable), Icon (info), Text, List rows are unchanged.
- Added one sentence (C25, optional in the research): a screen on the board is clipped to its frame, so overflow is cut off instead of painting over neighbours (`packages/core/lib/src/board/board_canvas.dart:225-230`, `ClipRect` around every `InstanceCanvas`).


## Code pages

### code/files.md (C2 C3 C5 C6 C7; heavy rewrite)
- Structure now: intro (Library vs Files vs Search) -> "Open the Library or Files" `{#open-the-files-panel}` (table Library | Files) ->
  markers -> "Add files" `{#add-files}` (Library **Add** menu) -> "Rename, move and delete files" (Library one-liner + Files table) -> Search
  sections (unchanged text) -> "Search for a file by name". Anchors `#add-files` and `#search-the-project` kept (inbound links exist);
  `#open-the-files-panel` kept as an explicit id on the renamed heading.
- Sidebar: Files takes the Library's slot in code mode (`lib/project/side_bar.dart:36-80`; `packages/core/lib/src/panels/panel.dart:205-209` opens on Files and
  restores the previous panel on leaving, `:198-214`); Ctrl/Cmd+2 maps by index (`lib/setup_general_actions.dart:44-62`, `lib/project/panels/panel_actions.dart:19-26`).
  `lib/project/panels/left_panel.dart` still builds `FilesPanel(showAllFiles: false)` for a stored panel name "Files", but the sectioned tree
  (**Add to library** / **Add board** / **Import asset**) is only reachable that way (not claimed): `files_tree_host.dart:134-148,160-190`, `files_panel.dart:25-26`.
- Files tree facts: roots are the project root's entries minus names starting with "." (`files_tree_host.dart:138-142`); folders closed
  (`files_tree_view.dart:48-56`); click opens in code mode (`:264-270`), follows the open tab (`:423-434`); markers `*`, red count, git letter
  (`packages/nowa_ui/lib/files/files_tree_view.dart:395-436`); menu order Remove file / Rename / Cut / Paste / Copy as path / View in folder
  (local) / Show file content (`files_tree_host.dart:440-494`); View Only keeps Copy as path and View in folder (`:445,462,477`); right-click selects the row
  first (`:291-295`); drag rules (`:310-318`); keys: `files_tree_view.dart:149-172` (Enter, Space), `packages/nowa_ui/lib/src/tree/n_tree.dart:337-376`
  (arrows, Left/Right), Shift+arrow range (`files_tree_view.dart:174-185`), F2 (`files_tree_host.dart:76,528`). Cut = writes the paths to the clipboard,
  Paste = `entity.move(dir, name)` into the selected folder (`packages/core/lib/src/file_system/actions/file_actions.dart:405-448`). Delete confirm
  text and `lib/main.dart` guard: `file_actions.dart:121-160`.
- Library facts: header **Add** (+) tooltip "Add" and list/tree toggle (`library_panel.dart:697-725`), **Add** menu = `addToLibraryEntries` + **Upload Assets...**
  (`add_lib_menu.dart:37-103`, `library_host.dart:176-186`); **New Model...** -> `lib/models`, **New Global State...** -> `lib/globals`
  (`add_lib_menu.dart:60-77`), **API Collection...** -> `lib/api` (`packages/data/lib/src/api/utils/api_util.dart:114-135`); **New Folder...** goes into the folder of the
  last-clicked row when that row is in `lib` (`library_host.dart:179-181`, `add_lib_menu.dart:50-58`). Default filter `Widgets`
  (`packages/nowa_ui/lib/library/library_contract.dart:214-225`) hides models and global states (`library_panel.dart:331-332,399-425`; confirmed by the capture
  agents' `ui-diffs-3.13.md`). The Library maps folders only from declarations (`packages/core/lib/src/library/library_service.dart:221-242,533-564`), and `_prune`
  drops folders with nothing visible, so an empty folder is not listed (needs a live check, see below).
- Boards: not listed in the Library (declarations only); created from the Boards chip footer or Ctrl/Cmd+Shift+B (`packages/designer/lib/src/actions/file_actions.dart:7-26`,
  `packages/designer/lib/src/designer_setup.dart:54`). A `.board` file clicked in Files opens `BoardEditor`, which in code mode builds
  `Center(Text('Code view is not available for boards'))` in release builds (`packages/designer/lib/src/board/board_editor.dart:38-44`); the page quotes that text (needs a live check).
- Ctrl/Cmd+O: code mode keeps the palette "Search for a file", designer opens the Library search (`packages/core/lib/src/actions/tab_actions.dart:27-96`);
  skipped folders `:56-66`.
- Image alt of `code-files-1` rewritten for the Library **Add** menu and moved from the top to the "Add files" section; the file is still the 3.12.5 shot until re-taken.
- Dropped: the old "On the board | In code mode" table (replaced), the three section-button table (the buttons exist but are never shown), the claim "Double-click a `.board` to open that board".
- Not claimed: Library with the View Only role (open point 2: `library_host.dart` never reads `isViewOnly`).

### code/code-mode.md (C5 C6 C7 C3)
- Files slot and Ctrl/Cmd+2 (see files.md refs); "Click a file ... or Enter" (`files_tree_view.dart:149-160`); Ctrl/Cmd+O note ("On the board, the same keys open the Library search").
- **Show file content**: in code mode the text tab shows only the editor, "Code mode hides the side panel that holds the Compile button, so the buffer has to go
  through the save flow like the dart editor's does" (`packages/core/lib/src/widgets/code_editor/text_editor.dart:63-69,200-235`). The details panel (Font size 13, Word wrap on,
  Compile / Compiled, Open in VS Code for local projects: `packages/core/lib/src/widgets/code_editor/code_editor_details.dart:6-47`) only shows outside code mode. The page now says that, and
  names a `pubspec.yaml` match from the Search panel as an example of how a text file opens outside code mode (`lib/project/panels/search_panel.dart:468-480` opens non-widget matches
  with `editors.openFile`; `YamlFile` -> `TextFileBase` -> `TextFileEditor`, `packages/core/lib/src/editors/editor.dart:34-40`). Entry hidden with View Only: `files_tree_host.dart:477`. Needs a live check (part 6 #8).
- **Import Dart code...** is now in the Library **Add** menu (`add_lib_menu.dart:98-101`).

### code/custom-code.md (C1 C3 C14 C19)
- Widget row: Library under **Project**, Ctrl/Cmd+K (add mode, `add_actions.dart:13-31`); the **Components** chip belongs to the dialog picker, so it is gone from this row.
- Import steps: Library **Add** (+) > **Import Dart code...** (`add_lib_menu.dart:98-101`); code mode has Files, not the Library (`side_bar.dart:36-80`).
- New section "Preview a widget in several states" `{#preview-variants}`: `@Preview` on a function, static method or constructor
  (`packages/core/lib/src/interpreter/services/variant_service.dart:8-95,133-147`); name = `name:` else function name in Title Case (`:25-26`), `group:`/`size:` read (`:28-37`);
  variant belongs to the widget its function returns, else the widget in the same file (`:70-90`); canvases next to the component, one column per group, ungrouped lead the first column
  (`packages/designer/lib/src/widgets/widget_designer.dart:58-140`), group header only when the group stacks in one column (`packages/designer/lib/src/panels/canvas_titles.dart:23-35`);
  title hover icons **Play**, **Open in new tab**, **Add to board** (`canvas_titles.dart:268-285,322-370`); **Add to board** picks a board of the package, snackbar "This package has no boards yet"
  (`packages/designer/lib/src/actions/add_variant_to_board.dart:11-38`); Library rows under the widget (`library_service.dart:272-294`), inserted at the variant's size (`widgets_to_add.dart:46-72`);
  `design/` folder at the package root is searched for files that name the widget and contain `@Preview` (`variant_service.dart:116-150`). Example imports `package:flutter/widget_previews.dart`
  as the repo's own previews do (`packages/nowa_ui/design/nmenu.dart:1-10`); needs a live check that the playground accepts it.
- Not mentioned (belongs to add-widgets / Outline pages): variant chips in the widget picker dialog, the Outline naming such a canvas after the variant.

### code/limitations.md (C19 C22)
- Placeholder rows: crossed box now sized to its label, 10 px text, thin lines (`packages/core/lib/src/interpreter/mock_dynamic.dart:157-176`); the second row is the 48 px crossed box with no name
  (`packages/core/lib/src/interpreter/mock.dart:318-324`). Wrapper-with-child / effect-on-widget stand-ins and sliver slots: `mock_dynamic.dart:36-140`
  (I left out the `Animate(child: page)` example because `flutter_animate` is now a built-in package, see packages.md). New paragraph "Where a value is empty..." (not tied to functions): nullable number/flag/color/enum stay `null`: `mock.dart:281-310` (nullable color and project enums are new in 3.13, numbers and flags already were).
- Switch patterns: relational and `&&` work (`packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:1551-1558`), `when`, list/map and named record fields still throw
  (`:1517-1521`, `:1580-1582`); `is` narrowing (`packages/core/lib/src/interpreter/block_tree.dart:3799-3830`).
- Extending Flutter classes: stand-in logic in `packages/core/lib/src/interpreter/declaration_internal.dart:211-236`; the Problems warning is unchanged (`block_problems.dart:360`).
- Imports/packages: `library;` / `part` lines kept (`block_tree.dart:6974-7060`, `ast_to_block_visitor.dart:186-232`); git/path/sdk dependencies (`package_service.dart:57-70,363-369`);
  `super(name: x)` named arguments read, positional skipped, `assert` doesn't run (`packages/core/lib/src/interpreter/declaration_runtime.dart:1715-1735,1823-1835`).
- Not added (optional list in part 3 C19.7): `call` objects, `firstWhere(orElse:)`, `firstOrNull` etc.; hand-written `main()` is on import.md.

### code/packages.md (C22 C18)
- First bullet rewritten ("pub.dev, Git and path packages"): `installedPackages` includes `git:`/`path:` maps with an empty version (`package_service.dart:57-70`); the table lists `installedPackages`
  (`packages/core/lib/src/settings/packages/packages_provider.dart:20-24`); the local resolver finds them through `.dart_tool/package_config.json`
  (`packages/core/lib/src/interpreter/packages/local/package_resolver_service_local.dart:253-270`); `sdk:` counts as installed but is not loaded (`package_service.dart:363-369`);
  `hosted:` with a custom URL and dev dependencies are not loaded (`:57-70`, problem text `:412-421`). Cloud projects: not claimed (server resolver `package_resolver_service.dart:28-34` sends an empty version).
- Caution "Don't change the Version of a package that comes from Git or a local path": the Version cell is an editable field for every row (`packages_settings.dart:354-395`) and `PubspecManager.updatePackageVersion`
  assigns `dependencies[name] = version` (`packages/core/lib/src/settings/pubspec_manager.dart:167-171`), replacing the map. Derived from code, not exercised live.
- Built-in list: `gap ^3.0.1`, `flutter_animate ^4.5.0`, `google_fonts ^8.0.2`, `smooth_page_indicator ^2.0.1` (`packages/core/lib/src/interpreter/packages/dart_package.dart:82-130,192-196`); versions not quoted in the page.
- `nowa_runtime`: `^0.2.0` (`packages/core/lib/version.dart:4`), 0.2.0 removed `smooth_page_indicator` (`packages/nowa_runtime/CHANGELOG.md:1-3`); version reset on open (`package_service.dart:117-120`).
- New section "Handle the Page indicator migration" `{#page-indicator-migration}`: `SmoothPageIndicatorMigration` (`packages/core/lib/src/migrations/migration_service.dart:191-262`): runs on every project open (no version gate,
  `:24-50`) when `nowa_runtime` is a dependency, `smooth_page_indicator` is not installed and a `lib/` Dart file uses a name of that library; dialog title, message, buttons **Later** / **Migrate**, error text
  "Could not add smooth_page_indicator to the pubspec" (`:213-262`). Without a focus context it applies silently (`:209`) - not mentioned. (The Onboarding Screen template is not said to add the package: see templates.md notes.)
- Outside edits: `DefaultProjectObserver.onFilesChangedFromOutside` re-reads the pubspec and loads new dependencies; failure logs "Could not load the dependencies added outside Nowa: ..."
  (`packages/core/lib/src/providers/default_project_observer.dart:17-36`, `pubspec_manager.dart:78-90`, `package_service.dart:230-240`). Only `LocalFileService` raises that event
  (`packages/core/lib/src/services/local_file_service.dart:262-269`), hence "In a local project".

### code/import.md (C1 C23 C19)
- Library replaces the Widgets panel tiles (see files.md refs); double-click opens it on its own.
- `.nowa/settings.json`: `version` is only raised to `projectFilesVersion` (3.0.11) when lower, never to the app version (`packages/core/lib/version.dart:6-11`, `packages/core/lib/src/plugin.dart:155-168`). The page says Nowa no longer raises it with each release;
  it does not promise the file is never touched (a pre-3.0.11 or new file is bumped once).
- Hand-written `main()` stays as written: only a `main` with `@NowaGenerated` loads as Nowa's template (`ast_to_block_visitor.dart:1206-1211`, `packages/core/lib/src/project/env_services/main_service.dart:77-86`); `library;`/`part` lines kept.

### code/index.md
- One table row reworded (Library + Files tree).

### code/vs-code.md (C17 C18 C7)
- **View in folder** is code mode only; the text-tab **Open in VS Code** button lives in the details panel that exists only outside code mode (`code_editor_details.dart:28-44`).
- Linux default path `/usr/bin` (`packages/core/lib/src/runner/vscode.dart:7-21`).
- Sync table: checksum of what Nowa wrote instead of the 2 s window, atomic save counts, new files in a workspace package's `lib/` or `boards/` load, hidden temp files such as `.!123!main.dart` not loaded,
  pubspec re-read (`packages/core/lib/src/services/local_file_service.dart:19-29,82-97,195-214,308-330`).

### code/local-projects.md (C17 C18 C7)
- "(in code mode, right-click a file in **Files**)"; "for macOS, Windows or Linux" (`packages/core/lib/src/providers/projects_view_provider.dart:64-65`); pointer to vs-code.md "What syncs and when" for outside edits.

### code/git.md (C12 C13)
- Branch menu opens below the row (`lib/project/panels/git_panel/git_details.dart:227-240`), field **Search branches** (autofocus) filters local and remote-only branches (`:768`, `:716-720`).
- **Undo commit** / **Revert commit**: `enabled:` flags, hidden for View Only, **Copy SHA** always (`lib/project/panels/git_panel/git_commit_context_menu.dart:8-32`).
- CAPTURE `code-git-2` description updated (state/show); request row in `captures/requests/W30b.md`.

### code/github.md
- No edit: checked `github_integration_settings.dart`, `git_settings.dart`, `git_remote_details.dart`, `github_clone_dialog.dart` diffs; button restyle only, no label changes.

## Needs a live check (3.13.0 on app.nowa.dev)

1. **A `.board` file clicked in code mode's Files tree** opens a tab with "Code view is not available for boards" (release build). files.md quotes it (`board_editor.dart:38-44`).
2. **Show file content in code mode** gives a plain text tab with no details panel; the Font size / Word wrap / Compile panel only shows outside code mode (e.g. a `pubspec.yaml` Search match). code-mode.md, vs-code.md.
3. **git:/path: dependencies in cloud (web) projects**: only the local-project behavior is written (listed with an empty Version, loaded from `package_config.json`). What a cloud project shows (listed, then maybe "installed but failed to load") is unverified. packages.md, limitations.md.
4. **Version cell of a git/path package**: the caution in packages.md is derived from `PubspecManager.updatePackageVersion`; not exercised.
5. **New Folder... in the Library**: an empty folder is not listed (folders come from declarations only); files.md says it shows in the Files tree in code mode first.
6. **Library default Filter hides new models/global states** (confirmed by capture agents' ui-diffs for logic/models and logic/global-state; files.md repeats it).
7. **Theme extension tabs** in the color picker and the Text Styles picker (needs a project with a `ThemeExtension`; capture `design-theme-styles-2` requested). Also that the Themes panel lists a function-built `ThemeData` variable and marks it **Active**.
8. **`@Preview` section** (custom-code.md): variant canvases, group columns, title icons, **Add to board**, the `design/` folder lookup, and that `import 'package:flutter/widget_previews.dart';` is accepted.
9. **google_fonts on the board** (fonts-icons.md): that `GoogleFonts.poppins()` really shows the font.
10. **Page indicator migration dialog** (packages.md): appears on open for a project that uses `SmoothPageIndicator` etc. without the dependency; **Later** returns on the next open.
11. **Linux**: VS Code default path `/usr/bin`, local projects on Linux (not checkable on the web app).
12. **responsive.md table**: nullable Color stays empty; a mocked Image is 48 x 48 when it sets no size.
13. **Library with the View Only role** (part 6 #2): not claimed anywhere on my pages.
14. **Onboarding Screen template and `smooth_page_indicator`**: does importing the template add the package to the project's pubspec, or does **Problems** report it missing? (`template.packages` looks unused, see templates notes.) Nothing is claimed on templates.md or packages.md.

## Coverage notes
- Pages with no edit needed beyond the list: code/github.md (checked), design/fonts-icons.md and design/responsive.md (small additions found, see above).
- Found but not in the edit list and not documented: `part of` files get no generated imports (included in limitations.md), `Library` keeps its own undo history (select-and-edit page, not mine), the Themes panel reads the file that holds the applied theme (`themes_panel.dart:44`), `Search` with a `directory` scope (`local_file_service.dart:333-345`, no UI).
- Banner/Linux/known-issues items belong to other batches.
