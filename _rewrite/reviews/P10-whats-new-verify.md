# P10: code check of the 3.13.0 What's new and Changelog entries

Entries: `docs/new/whats-new.md` (WN) and `docs/new/change-log.md` (CL), top entry `3.13.0 (6 October 2026)` (committed in
`a2ba5df`; my fixes are unstaged, nothing committed). Code refs are `path:line` in `/home/user/nowa-master` at `3cb32031c`
(3.13.0); `3.12.5:` marks `b84bfdafd`. Start point for each row: `_rewrite/research/changes-3.13.md` (C1 to C27).

Links checked: `../design/library.md`, `../get-started/desktop-app.md`, `../design/themes.md#edit-theme-extensions`
(heading "Edit theme extensions"), `../code/custom-code.md#preview-variants` (explicit id), `./change-log.md`. All exist.
Known 3.13.0 bugs (Library rename, **New Folder...**, **New Model...**, **New Global State...**): none of them is promoted in
either entry. Board-picker **Rename** uses a dialog, not the Library's inline field, so the rename bug doesn't touch it.

| entry | claim | verdict (ok / fixed / removed) | code ref |
|---|---|---|---|
| WN | Intro: Library, find and add from the keyboard, Linux app, quicker navigation, theme extension colors in the color picker | ok | see rows below |
| WN | **Library** replaces the Widgets panel; screens, components, models, global states, built-in widgets, package widgets, assets in one searchable list | ok | `lib/project/side_bar.dart:36-80`; `packages/nowa_ui/lib/library/library_panel.dart:745-776,960-969`; `packages/core/lib/src/library/library_service.dart:327-440` |
| WN | **Ctrl/Cmd + K** (or the **Widget** tool), type, **Enter** drops it on the board | ok | `packages/designer/lib/src/designer_setup.dart:48`; `packages/designer/lib/src/widgets/designer_tools.dart:164-176`; `add_actions.dart:16-31`; `library_panel.dart:526-541,632-639` |
| WN | **Ctrl/Cmd + O**, type, **Enter** opens it | ok | `lib/setup_general_actions.dart:32`; `packages/core/lib/src/actions/tab_actions.dart:29-37`; `library_panel.dart:632-639` |
| WN | Filter by kind, "switch between" project, packages, built-in, assets; **Show in code** | fixed: the chips turn sources on and off (several can be on), now "choose which ... to show" | `library_panel.dart:43-48,432-444,782-795`; `lib/project/panels/library_panel/library_host.dart:161,232-241` |
| WN | **Files** moved to code mode and "now shows your whole project as a tree" | fixed: whole-project tree in code mode was already 3.12.5; new is designer removal, keyboard navigation and multi-file drag | `side_bar.dart:43-52`; `files_panel.dart:25-26`; `packages/nowa_ui/lib/files/files_tree_view.dart:18-23,382-391`; `3.12.5:lib/project/panels/files_panel/files_list.dart` (tree, drag, no keys) |
| WN | Back/Forward arrows, **Ctrl + -** / **Ctrl + Shift + -** | fixed: added "with Control on macOS too" (bound with `control: true` on every OS) | `lib/setup_general_actions.dart:36-38`; `packages/nowa_ui/lib/top_bar/top_bar_view.dart:258-271`; `packages/core/lib/src/providers/navigation_history.dart` |
| WN | Board chip lists every board; **Ctrl/Cmd + B**, type, **Enter**; create a new board from the list | ok | `lib/project/top_bar_mapper.dart:65-110`; `lib/project/top_bar.dart:217-246,290-297`; `lib/project/panels/panel_actions.dart:28-40` |
| WN | Linux: choose **Linux**, 64-bit archive, install script adds Nowa to the app menu; updates downloaded from the update dialog; preview in the browser | ok | `packages/core/lib/src/dialogs/download_nowa_dialog.dart:8,79-90`; `.github/workflows/linux-build.yml:48`; `linux/packaging/install.sh`, `com.nowa.nowa.desktop`; `packages/core/lib/src/services/version_service.dart:37`; `lib/dashboard/overlays/update_overlay.dart:139-150`; `packages/nowa_run/lib/src/ui/nowa_run_preview.dart:128-171` |
| WN | Color picker: a tab per theme extension next to **Material**; text style picker groups; picking links to the extension | ok | `packages/core/lib/src/fields/color_fields.dart:818-845`; `packages/core/lib/src/fields/style_fields/style_fields.dart:236-262` |
| WN | `@Preview` on a function or constructor = named variant: next to the component, in the widget picker, under the widget in the Library | ok | `packages/core/lib/src/interpreter/services/variant_service.dart:7-30`; `packages/designer/lib/src/widgets/widget_designer.dart:74-140`; `packages/core/lib/src/widgets/widget_picker.dart:143-199`; `library_service.dart:272-293` |
| WN | Packages: `git:`/`path:` load, `sdk:` counts as installed, four packages "are built in" | fixed: `git:`/`path:` qualified to local projects (only the local resolver finds them; the cloud analyzer gets an empty version); "built in" (read as preinstalled) now "now work on the board" (supported, not added to new projects) | `packages/core/lib/src/interpreter/packages/package_service.dart:55-70,363-370`; `packages/core/lib/src/interpreter/packages/package_resolver_service.dart:30`; `dart_package.dart:85-87,95,126-136,195` |
| WN | Own code: switch patterns like `> 5`, named args to `super(...)`, `part` files kept on save; compass_app and Wonderous screens render | ok | `5e4097e84`, `5d3acebc6`, `a57e5aab8`, `ab384f764`, `a5fa42269`; `packages/core/lib/src/interpreter/block_tree.dart:5093-5160` |
| WN | Placeholders: small box; a wrapper "(like `Animate`)" shows what it wraps | fixed: dropped the `Animate` example, since `flutter_animate` is now bridged and draws for real | `packages/core/lib/src/interpreter/mock_dynamic.dart:92-176`; `ca52f4623` |
| WN | `nowa_runtime` drops `smooth_page_indicator`; a project using page dots gets a one-click **Migrate** | ok | `packages/core/lib/version.dart:4`; `packages/core/lib/src/migrations/migration_service.dart:139-141,193-262` |
| WN | Local projects: outside edits right after a save no longer missed; pubspec dependencies added outside load on their own | ok | `packages/core/lib/src/services/local_file_service.dart:24-27,80-97`; `packages/core/lib/src/providers/default_project_observer.dart:17-36` |
| WN | Fresh look; Albert Sans back | ok | `packages/nowa_ui/pubspec.yaml:33-78` (`f4265d2de`); `3.12.5:packages/nowa_ui/pubspec.yaml:28-37` (one family per file) |
| WN | **Bring forward**, **Send backward**, **Bring to front**, **Send to back**; **Ctrl/Cmd + Alt/Option + ]** / **[** all the way | ok | `packages/designer/lib/src/menus/widget_context_menu.dart:44-47`; `designer_setup.dart:21-25`; `packages/core/lib/src/inputs.dart:22-25` |
| WN | "properties that can be left empty now start with **Default**" | fixed: only an enum dropdown gets it; now "the dropdown of a property that can be left empty" | `packages/core/lib/src/fields/basic_fields.dart:1540-1545` |
| WN | Branch search in the branch menu | ok | `lib/project/panels/git_panel/git_details.dart:227-240,766-770` |
| WN | Each screen stays inside its frame; snap guides line up at any zoom | ok | `packages/core/lib/src/board/board_canvas.dart:225-230`; `packages/designer/lib/src/design_experience/drag_rule.dart:265-271` (`056be228d`) |
| WN | A newer Nowa no longer changes `.nowa/settings.json` | ok (raises only to 3.0.11, so any project made since then is untouched) | `packages/core/lib/version.dart:6-11`; `packages/core/lib/src/plugin.dart:155-159` |
| WN | Closing line: **? icon**, `team@nowa.dev` | ok | `lib/widgets/help_icon.dart:25` |
| CL | **Library panel**: contents list (incl. classes, functions, variables, Flutter's libraries), filter, "switch sources" chips, drag or **Ctrl/Cmd + Enter**, **Show in code** | fixed: "turn sources on and off" | `library_panel.dart:432-444,526-541,960-969`; `library_service.dart:394-424`; `library_host.dart:161,232-241` |
| CL | **Ctrl/Cmd + K** / **Widget** tool open the Library to add; **Ctrl/Cmd + O** goes to one | fixed: "In the designer," added (code mode keeps the file search palette) | `add_actions.dart:16-31`; `tab_actions.dart:29-52` |
| CL | Back/Forward arrows, **Ctrl + -** / **Ctrl + Shift + -** | fixed: "(Control on macOS too)" | `lib/setup_general_actions.dart:36-38` |
| CL | Board picker: every board, search, rename, delete, **Create new board**; **Ctrl/Cmd + B** | ok | `top_bar_mapper.dart:72-110`; `top_bar.dart:290-320` |
| CL | Linux app: 64-bit `.tar.gz`, `install.sh`, app menu, updates from the update dialog, preview in the browser | ok | as WN Linux row |
| CL | `@Preview` variants | ok | as WN row |
| CL | Theme extensions in the pickers | ok | as WN row |
| CL | **Default** first in a nullable enum dropdown | ok | `basic_fields.dart:1540-1545` |
| CL | Branch search | ok | `git_details.dart:766-770` |
| CL | "**Built-in packages**: gap, flutter_animate, google_fonts, smooth_page_indicator" | fixed: "**Package support**: ... now work in the designer" (3.12.5 wording; they are supported, not preinstalled) | `dart_package.dart:85-87,95` |
| CL | **Files panel**: code mode only, "tree of your whole project", keyboard, "multi-select, drag and drop, and **Copy as path**" | fixed: tree, multi-select, drag and **Copy as path** were all in 3.12.5; kept code mode only, keyboard navigation, multi-file drag | `files_tree_view.dart:18-23,382-391`; `files_tree_host.dart:469`; `3.12.5:lib/project/panels/files_panel/file_context_menu.dart:40,68`; `3.12.5:lib/project/panels/widgets_panel/switchable_list_grid_view.dart:84-95` |
| CL | Menus: Figma reorder words, Alt/Option all the way, Mac-order key hints, menus close on board pan/zoom | ok | `widget_context_menu.dart:44-47`; `inputs.dart:28-37` (vs `3.12.5:inputs.dart:27-45`); `packages/nowa_ui/lib/src/components/nmenu.dart` (`52d75c7a9`) |
| CL | Packages: `git:`/`path:` load, `sdk:` installed | fixed: "in local projects" | `package_service.dart:55-70,363-370`; `package_resolver_service.dart:30` |
| CL | Hand-written code: relational and `&&` patterns, `super(...)` named args, callable classes, `firstWhere(orElse:)`; compass_app, Wonderous | ok | `5e4097e84`, `5d3acebc6`, `a5fa42269`, `81e85d767`, `ab384f764` |
| CL | Placeholders: box sized to label, wrapper shows child, "unset optional values keep defaults", "an image with no size is 48 × 48" | fixed: numbers and flags already mocked to null in 3.12.5, new are colors and enums; "a placeholder image" | `packages/core/lib/src/interpreter/mock.dart:284-297,323-330` (diff vs 3.12.5); `mock_dynamic.dart:157-176`; `7206b9354` |
| CL | Local projects: outside pubspec dependencies load; hidden temp files never loaded | ok | `default_project_observer.dart:17-36`; `local_file_service.dart:318-323` |
| CL | `nowa_runtime` 0.2.0; **Page indicator migration** dialog adds the package | ok | `version.dart:4`; `migration_service.dart:193-262` |
| CL | Playing from a title selects it | ok | `packages/designer/lib/src/panels/canvas_titles.dart:328-336` |
| CL | New look | ok | `packages/nowa_ui/lib/src/components/nbutton.dart`, `nlist_tile.dart`, `ntree_tile.dart`, `nmenu.dart` |
| CL | Announcements: at most two banners, "expired announcements no longer show" | fixed: "no longer show as banners" (only the banner list filters them) | `packages/core/lib/src/announcements/widgets/notification_banner.dart:9`; `announcement_provider.dart:22-23` (`9410e74a6`) |
| CL | Fixed outside edits right after a save ignored | ok | `local_file_service.dart:24-27,80-97` |
| CL | Fixed `part` and `library` lines dropped on save | ok | `a57e5aab8`; `block_tree.dart:6974-7060` |
| CL | Fixed hand-written `main()` rewritten | ok | `packages/core/lib/src/project/env_services/main_service.dart:77-86` (`5e4097e84`) |
| CL | Fixed own `LocalizationsDelegate` blanking the board | ok | `packages/core/lib/src/localization/localizations_class_instance.dart:44` |
| CL | Fixed screens painting outside their frame | ok | `board_canvas.dart:225-230` |
| CL | Fixed snap guides off at some zooms | ok | `drag_rule.dart:265-271` |
| CL | Fixed Material 2 grey canvas "behind the board's home widget" | fixed: plain words, "a grey background behind widgets on the board" | `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:160-164` (`23613b05d`); `packages/core/lib/src/project_environment/env_widget.dart:28-36` |
| CL | Fixed the editor font | ok | `packages/nowa_ui/pubspec.yaml:33-78` |
| CL | Fixed `.nowa/settings.json` rewritten each release | ok | `plugin.dart:155-159`; `26a7cb088` |
| CL | Fixed inlined-bootstrap `index.html` replaced "on upgrade" | fixed: the migration runs on every project open, not on upgrade; now "when Nowa opened the project" | `migration_service.dart:35-43,107-121` |
| CL | Fixed Shortcuts sheet: wrong add key, "one key for both reorder entries" | fixed: the one-key slip was the right-click menu (**Move Up**/**Move Down** both showed ⌘]); the sheet had ⌘P for the picker | `3.12.5:packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:39,52-53`; `3.12.5:packages/designer/lib/src/menus/widget_context_menu.dart:78-79`; `3.12.5:packages/core/lib/src/widgets/menu.dart:50` |
| CL | Fixed "a crash in the AI chat" when a project reopened during the plan check | removed: the fix stops an exception thrown in a background `async` poll; no crash or visible symptom in the code (research C26: "no UI change") | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:963-984` (`c09b90eed`) |

## Not changed, worth knowing

- The theme link (`themes.md#edit-theme-extensions`) works but covers the Themes panel. The picker tabs are described in
  `design/theme-styles.md` "Colors from theme extensions". I kept the link as the brief asked.
- Library drag and drop doesn't offer to add a missing package (research part 6, row 3); the entries only say "insert with drag
  and drop", which holds.
- On `dev`, `19a47faae` ("fix snackbar issue") wraps the project page in a `Scaffold`. In 3.13.0 Library snackbars such as "Open a
  screen, a component or a board to insert into" may not show. Neither entry quotes one.
