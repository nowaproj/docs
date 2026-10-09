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
- Group step says "type `group`, move to **Group** with the down arrow if it isn't highlighted, press Enter" because the Library
  lists a project widget with "group" in its name before the built-in one (groups are ordered Project, Packages, Built-in:
  `packages/nowa_ui/lib/library/library_panel.dart:245-292`; first symbol row is highlighted: `:241`). Built-in entries **Group**, **Wrap**,
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
- **Onboarding Screen** declares `packages: {'smooth_page_indicator': '^2.0.1'}` (`packages/core/lib/src/services/templates/built_in/onboarding_template.dart:6`);
  `importTemplate` registers missing template packages after the files (`packages/core/lib/src/providers/project_provider.dart:766-773`).
  The animated onboarding template also declares it but is commented out of the picker (`templates_service.dart:380`), so not mentioned.

### design/localization.md (C22, C19)
- AI package tool still refuses `flutter_localizations`: `packages/ai/lib/src/tools/packages_tool.dart:164-169` ("flutter_localizations is not supported by nowa, use a different approach."); page says it tells the agent to use another approach (the string is a tool result, not UI text).
- `sdk:` dependency counts as installed so "'x' is imported but is not in the pubspec." isn't reported: `packages/core/lib/src/interpreter/packages/package_service.dart:363-369`, problem text `:419`.
- Project `LocalizationsDelegate` that fails to load: `logError('Could not load ${instance.type?.name}: $e')` and returns null so the board keeps drawing: `packages/core/lib/src/localization/localizations_class_instance.dart:33-44`. The text says "the delegate's name" (that is the delegate class name).
- Deliberately NOT claimed: that the board draws `flutter_localizations` classes (no bridged library exists: `grep flutter_localizations` finds only package_service and packages_tool), and not claimed any new rendering support beyond the fail-soft load. Note: commit `5e4097e84` also gives each interpreted resource class a real `Type` so `Localizations.of(context, YourClass)` finds the loaded resource (`localizations_class_instance.dart:6-30`); the page's existing sentence "the board can render it" stays as it was.

### design/fonts-icons.md (C22)
- Research said "no edit". Added one sentence: the `google_fonts` package is built in and runs on the board (`packages/core/lib/src/interpreter/packages/dart_package.dart:82-130,192-196`; `packages/core/lib/src/interpreter/libraries/google_fonts_library_custom.dart:1-45`, one static per family calling `GoogleFonts.getFont`). Needs a live check that the font actually shows on the board.

### design/responsive.md (C19)
- Research said "no edit". The "Design with realistic content" table changed for two rows: nullable colors now mock to `null` (`packages/core/lib/src/interpreter/mock.dart:300-304`, was always grey), and a mocked image is 48 x 48 when it sets no size (`mock.dart:118-132`, `:323-331`, `_mockImageSize` `:243-245`). Widget (48 px box when non-nullable), Icon (info), Text, List rows are unchanged.
- Not added (optional, belongs to boards.md): a screen on the board is clipped to its frame (`packages/core/lib/src/board/board_canvas.dart:225-230`).

