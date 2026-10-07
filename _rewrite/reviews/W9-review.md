# W9 review (Work with code, part 1)

Verifier: Opus-class run, source of truth `/home/user/nowa-master` (v3.12.5). Pages: `docs/code/index.md`, `code-mode.md`, `files.md`, `packages.md`, `custom-code.md`, `limitations.md`.
All code refs are relative to `/home/user/nowa-master` unless noted. Progress: pages are appended below as each one is finished (summary at the end is rewritten last).

## Summary

(in progress: index.md done; rest pending)

## docs/code/index.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Front matter (title, description, sidebar_label, keywords), no H1, 1 admonition, no `---` rules, no emoji/hype words, all 17 relative links resolve to files in pages.md | ok | lint script | `../publish/download-code.md`, `../get-started/cloud-and-local.md`, `../ai/index.md` all exist. |
| "Open code mode to see every file" | fixed | `packages/core/lib/src/file_system/file_tree_controller.dart:35-43`, `packages/core/lib/src/services/file_service.dart:234` | Code mode shows the whole project but hides dot-entries and the file service ignores `.git/`, `build/`, `.DS_Store`. Now "to browse the whole project". |
| `lib/main.dart`: editable, can't be deleted | ok | `packages/core/lib/src/file_system/actions/file_actions.dart:121` (`filesCannotBeDeleted = ['lib/main.dart']`); What's New 3.6.1 (editable main.dart, `change-log.md:215`) | |
| `lib/pages/` screens, `lib/components/` components, `lib/models/` models | ok | `packages/core/lib/src/file_system/dart_importer.dart:424-432`, `lib/project/panels/files_panel/add_lib_menu.dart:92` | |
| `lib/globals/`: global state, themes, routes, constants | ok | `packages/core/lib/src/file_system/templates/file_template.dart:29-35` (`router.dart`, `themes.dart`, `app_state.dart`, `app_constants.dart`) | |
| `boards/` holds `.board` files, not app code; `assets/`; `pubspec.yaml` holds packages, assets, fonts | ok | `packages/core/lib/src/file_system/board_file.dart:23` (JSON `BoardFile`), `packages/core/lib/src/settings/pubspec_manager.dart:127-235` | |
| Integrations add folders under `lib/`, e.g. `lib/api/` | ok | `packages/data/lib/src/api/utils/api_util.dart:131`, `packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:41` | |
| Board/Details/AI change: Nowa rewrites code it owns, marked `@NowaGenerated` | ok | `packages/nowa_runtime/lib/src/annotations.dart:1`, `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:229-250` | |
| Code mode edits are read back on save with Ctrl/Cmd+S or auto save | ok | `lib/setup_general_actions.dart:25` (`AdaptiveActivator(keyS)`), `packages/core/lib/src/widgets/code_editor/code_buffer_service.dart:1-9`, `packages/core/lib/src/project/saving_service.dart:8-66`, `lib/widgets/save_options_popup.dart:44` ("Auto save") | Compile happens on save, not per keystroke. |
| Own code is written back exactly as written until changed visually | ok | `ast_to_block_visitor.dart:140-148` (`_preserveSourceIfCustomLoaded`), `packages/core/lib/src/interpreter/block_tree.dart:285-292,548-557` (`markSourceGenerated` when mutated) | |
| On a visual change Nowa adds `@NowaGenerated`, the `nowa_runtime` import, turns relative imports into `package:` imports, can reorder constructor parameters and write `16` as `16.0` | ok | `packages/core/lib/src/interpreter/visitors/imports_visitor.dart:15-17,35-45`, `block_tree.dart:6638-6652,6863` (`Directive.merge`, `generateImports`), `packages/core/lib/src/interpreter/declaration.dart:50-74` (`Parameter.toSource` regroups positional / optional / named), `block_tree.dart:3036` (`NumberBlock.value` is `toDouble()` for a double slot) | Also stated in the released repo's own `docs/interpreter_limitations.md:93-99`. |
| Saved files follow `formatter: page_width` of `analysis_options.yaml`, 80 when none; diffs show only what changed | ok | `packages/core/lib/src/project/code_style_service.dart:12-35`; What's New 3.12.0 ("Code That Looks Like Yours") | |
| AI edit that would leave syntax errors is refused, nothing written | ok | `packages/ai/lib/src/tools/edit_tool.dart:104`, `packages/ai/lib/src/tools/legacy/write_code_tool.dart:36,120`; `docs/new/change-log.md:65` (3.12.3) | |
| Nowa reads code to draw it, does not run it as a device does; unreadable parts are kept and explained | ok | `ast_to_block_visitor.dart:100-109,157-177,570-576` (custom class keeps source, `loadFailure`), `packages/designer/lib/src/details/widget_details.dart:121-146,560-575` (**Kept as code** note with the reason), `packages/core/lib/src/file_system/dart_file.dart:316-318` (Problems: "'name' could not be loaded: reason"); What's New 3.12.3 | |
| Cloud projects: edit in Nowa, push with Git, download the code; local projects are folders any editor opens | ok | `research/features-code-ship.md` "Code and design sync" 6, `docs/publish/download-code.md` exists | Cross-page claims belong to W8/W10 pages. |
| "In this section" descriptions | ok | checked against the five sibling pages after their review | Descriptions match page content (see per-page sections). |

## docs/code/code-mode.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Front matter, no H1, 1 admonition, no `---`, no emoji/hype words, 11 relative links resolve (`files.md#search-the-project` re-checked under files.md; `../reference/shortcuts.md#code-editor` exists), capture placeholder `code-code-mode-1` well formed (image already captured in `static/img/docs/code/`, not yet embedded) | ok | lint script, `docs/reference/shortcuts.md:179` | Orchestrator embeds the captured PNG. |
| `<>` button right before the gear, no label or tooltip, highlighted while code mode is on | ok | `packages/nowa_ui/lib/top_bar/top_bar_view.dart:139-141,717-735` (`selected:`, no `tooltip`) | |
| Nowa saves first; opens the selection's file and scrolls to it; nothing selected: home screen file, else `lib/main.dart` | ok | `lib/project/workspace_actions.dart:10-20,26-91` | |
| Left panel switches to **Files**, restored on leaving | ok | `packages/core/lib/src/panels/panel.dart:198-209` (`_sidePanelBeforeCode`) | |
| "shows every file in the project" | fixed | `file_tree_controller.dart:35-43` | Dot-entries are hidden and `.git/`, `build/`, `.DS_Store` are ignored. Now "shows the whole project, not only `lib/`, `boards/` and `assets/`". |
| **Open code mode** on **Nothing is open**; **View Code** on a Dart file with no screen or component | ok | `lib/project/panels/empty_workspace.dart:49-52`, `packages/core/lib/src/editors/dart_editor/dart_editor.dart:92-95,232-237`, block views only for public widget classes, router and Firebase files (`designer_plugin.dart:35`, `plugin.dart:90`, `firebase_plugin.dart:56-62`) | |
| Tab shows `*` when unsaved; **New Tab** (+, hidden while a blank tab exists); **Empty Tab** with **New Widget**, **Upload a File** (to `assets/`), **Recent Files**; close with **×**, middle-click | ok | `packages/core/lib/src/file_system/widgets/files_widgets.dart:78-80`, `lib/tabs_view.dart:113-142,175`, `lib/empty_editor.dart:84-119`, `lib/setup_general_actions.dart:178-190` | |
| Shortcuts table: new tab Ctrl/Cmd+T, next/previous tab Ctrl+Tab / Ctrl+Shift+Tab (Control on macOS too), close Ctrl/Cmd+W, file search Ctrl/Cmd+O | ok | `lib/setup_general_actions.dart:25-45` (`AdaptiveActivator`: Ctrl or Cmd; `KeyUpActivator(tab, control: true)`), `packages/core/lib/src/inputs.dart:22-25` | Matches `docs/reference/shortcuts.md` "Tabs in code mode". |
| **Search for a file** picker: type, arrows, Enter; lists `lib/` files with paths | ok | `packages/core/lib/src/actions/tab_actions.dart:27-67` (hint "Search for a file", `libDir` outside debug builds), `captures/ui-map/12-file-search.json` | Footer "to select / to navigate / esc to close". |
| Colors Dart, JSON, YAML, XML, HTML, Markdown | ok | `packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:120-127` | |
| "You can edit any file in the Files tree" | fixed | `file_tree_controller.dart`, `Editor.fromContent` (`packages/core/lib/src/editors/editor.dart:12-42`) | Binary files (images) don't open as text. Now "any text file". |
| **View Only** role makes the editor read-only | ok | `nowa_code_editor.dart:181` (`gProject.isViewOnly`), `packages/core/lib/src/models/project.dart:20` | |
| Find Ctrl/Cmd+F with **Aa**, `.*`, **Previous**, **Next**, Esc closes | ok | `packages/core/lib/src/widgets/code_editor/find.dart:114-176`, re_editor 0.10.0 `lib/src/code_shortcuts.dart` (find, esc) | |
| Replace Ctrl/Cmd+Alt/Option+F with **Replace** / **Replace All** | ok | `find.dart:158-176`, re_editor defaults (`replace: ctrl/meta+alt+F`) | |
| Autocomplete: names in scope, members after a dot, named parameters in a call; arrows + Enter or click | ok | `packages/core/lib/src/widgets/code_editor/dart_autocomplete.dart:96-130`, `nowa_code_editor.dart:171-173` | |
| Go to definition: hold Ctrl/Cmd, hover, underline only for names defined in the project, click | ok | `goto_definition_link.dart:40-100` (meta or control, `is RuntimeDeclaration`), What's New 3.12.0 | |
| Copy, cut, paste in right-click menu | ok | `code_menu.dart:41-44` | |
| Auto save on by default, every 20 s; **Save options** in the status bar; Ctrl/Cmd+S; edits compile on save | ok | `packages/core/lib/src/project/saving_service.dart:8-16`, `lib/status_bar.dart:130`, `lib/widgets/save_options_popup.dart:44`, `code_options.dart:101-130` | Status bar capture shows "Save options (CtrlS to save)". |
| "Saving also refreshes the preview" | ok | `lib/project/panels/code_preview_panel.dart:48-57` (reboots on file reimport, 300 ms debounce) | |
| Nowa AI applies unsaved edits before it starts | ok | `packages/ai/lib/src/chat_session.dart:266-268` | |
| Red banner with count and first message after save; click opens **Errors** panel; status bar counts and **Problems** list them | ok | `code_options.dart:440-451`, `nowa_code_editor.dart:200-225`, `packages/core/lib/src/file_system/dart_file.dart:303-305` | |
| Conflict banner "This file changed while you were editing it", **Keep mine** (compile your buffer), **Reload** (reload, drop edits) | ok | `nowa_code_editor.dart:227-241`, `code_options.dart:164-200` | |
| **Show preview** / **Hide preview**; modes **Play · App** (default), **Play · File**, **Run**; no-widget text; warning icon; reload on save | ok | `lib/project/panels/vibe_designer.dart:95-110`, `code_preview_panel.dart:118-251`, `panel.dart:160-172` | |
| "**Reload preview** rebuilds it at any time" | fixed | `code_preview_panel.dart:231-233` | The button exists only in the play modes. Now "In the play modes, ...". |
| Button next to **Show preview**: **Open in VS Code** (local), **Code download** (cloud) | ok | `lib/project/panels/vibe_designer.dart:62`, `lib/project/download_code_button.dart:21-35,40-58` | |
| **Open in VS Code** opens at the file you're viewing | fixed | `download_code_button.dart:43-48`, `packages/core/lib/src/file_system/actions/edit_code_io.dart:5-16` | Only for a Dart file, else `lib/main.dart` (and falls back to a Nowa text tab if VS Code fails to start). Page now says so. |
| **Code download** "compresses your project into a zip" | fixed | `download_code_button.dart:150-175` | It opens a popup with **Compress Project**, then you click the zip. Reworded; plan gate left out (D3). |
| Leave code mode: **Back** (top left) or `<>`; **Unsaved code changes** with **Save** / **Discard** / **Cancel** | fixed | `lib/project/workspace_actions.dart:26-60`, `packages/core/lib/src/dialogs/unsaved_code_dialog.dart:32-57`, `top_bar_view.dart:60-70,163` | The dialog comes before the save, not after. Sentence re-ordered. |
| Must-cover **Import Dart code...** missing from this page | fixed (added) | `lib/project/panels/files_panel/files_list.dart:173-177,432-461`, `add_lib_menu.dart:140-146` | **Add to library** is only on board-view headline rows, so in code mode you leave code mode first. One sentence added, linking `custom-code.md#import-dart-code`. |

