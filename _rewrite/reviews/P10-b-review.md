# P10-b review: design and code pages updated to Nowa 3.13 (writer W30b)

Verifier: non-author agent. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0). Baseline for "what changed":
`git diff 9844ed6 -- <page>`; product baseline `b84bfdafd` (3.12.5). Code refs are `path:line` in the 3.13 tree.
Tools: grep for exact labels; a link checker (relative links and `#anchors` in every page of the batch, plus every inbound link
to these pages from all of `docs/`).

SUMMARY_PLACEHOLDER

## Link and anchor check (all 19 pages)

268 outgoing links (relative paths, `#anchors`, `/img/` files) in the 19 pages: 0 broken. 269 inbound links from the rest of `docs/` to
these pages (with anchors such as `files.md#add-files`, `layout.md#groups`, `custom-code.md#...`): 0 broken. Links into
`design/library.md` anchors from these pages are included and resolve. Required anchor `{#groups}` on `layout.md` exists (redirect
`/ui/layout/groups`).

## docs/design/properties.md

Changed in 3.13: one table row (**A choice**).

| claim | verdict | code ref | note |
|---|---|---|---|
| A nullable enum property's dropdown starts with **Default** | ok | `packages/core/lib/src/fields/basic_fields.dart:1542` (`if (type.isNullable) const DropdownMenuItem(value: null, child: Text('Default'))`) | first item of `values`; shown only when `type.isNullable` |
| Choosing **Default** removes the value so the widget's own default applies | ok | `basic_fields.dart:1538` (`newVal == null ? field.remove() : field.update(...)`), comment at `:1541` | same call as the field menu's **Reset to default** (`block_field.dart:838`) |
| A property with no value shows **Default** | ok | `basic_fields.dart:1520-1521` (`_findName` returns `null` for an unset value), `nowa_fields.dart:877-882` (`checkCustom` only adds "Custom" when no item matches; the `null` item matches) | only for nullable enums, as the sentence says ("may be empty") |
| 16 other labels and the section list (Create a component, Add description, Open in New Tab, Widget x N, Mixed, Kept as code, Individual padding, Load More, Reset to default, Set to null, Link menu items Detach... / Create Param... / Create Variable... / Custom Expression..., Search for a wrapper, Add Wrapper, Show/Hide advanced options) | ok | `name_group.dart:19,95`, `widget_details.dart:69,194,369,552`, `field_link_menu.dart:353-374`, `block_field.dart:838-840,1332`, `basic_fields.dart:819` | unchanged text; 3.13 diff of `widget_details.dart`, `group_details.dart`, `board_details.dart` is NButton restyle only |
| "Nowa has 32 wrappers" | ok | `packages/core/lib/src/wrappers_to_add.dart` (32 `WrapperData`, file unchanged since 3.12.5) | |
| Links (23) | ok | link checker | `layout.md#groups`, `theme-styles.md#use-a-theme-text-style`, `fonts-icons.md#choose-an-icon`, `select-and-edit.md#undo-and-redo`, `boards.md#set-the-board-color-and-grid` all resolve |

No 3.12.5 wording found (no Widgets panel / picker mention). Fixed 0, removed 0. Length 1,335 words by `wc -w` (tables included), unchanged
by the edit apart from the one row; not cut.

## docs/design/layout.md

Changed in 3.13: the "empty Group" sentence and the Wrap / List View bullets (3 "widget picker" mentions now point to the Library).

| claim | verdict | code ref | note |
|---|---|---|---|
| Ctrl/Cmd+K opens the Library, where you can add a **Group** | ok | `packages/designer/lib/src/actions/add_actions.dart:13-31` (`workspace.toggleSidePanel('Library')` when another panel is open, then `library.focusSearch(add: true)`) | the picker dialog is only the fallback during a walkthrough |
| Type `group`, select **Group**, press Enter | ok | `packages/nowa_ui/lib/library/library_panel.dart:245-262` (search groups in `LibrarySource.values` order: Project, Packages, Built-in, Assets), `:241` (`_firstSymbolRow` highlighted as you type), `:433-436` (`_rank`: Nowa's picks, then prefix, then A-Z); `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:268-277` (built-in **Group**), `library_service.dart:451` (`featured: true`), `library_contract.dart:223-225` (default kinds include `widget`) | "select **Group**" is the careful wording: a project widget whose name contains "group" would be the first row instead; with none, Group is the first row and Enter alone works |
| **Wrap** and **List View** can be added from the Library | ok | `widgets_to_add.dart:467-477` (**Wrap**), `:318-345` (**List View**, `itemCount: 3`, `listViewItemPlaceholder`) | built-in picks, kind `widget`, so the default **Widgets** filter lists them |
| Group section buttons (Stack / Row / Column), Gap, Padding, Individual padding, Alignment grid, Main Axis Size, Spacing options, L/T/R/B/W/H, Fixed/Auto/Expand, constraint dropdowns, Add Wrapper > Scroll View | ok (unchanged text) | `group_details.dart` and `widget_details.dart` diffs 3.12.5 to 3.13 are NButton/NMenuEntry restyle only; `inline_wrapper_fields.dart:132` (**Individual padding**) | no behavior change found |
| Links (8), `{#groups}` anchor | ok | link checker; `[Library](library.md)` resolves | redirect `/ui/layout/groups` target intact |

No 3.12.5 wording left (no "widget picker"). Fixed 0, removed 0. 1,130 words.

## docs/design/themes.md

Changed in 3.13: the "Each theme is a variable..." paragraph, **Delete** on the applied theme, the color-roles sentence, the extension tabs section.

| claim | verdict | code ref | note |
|---|---|---|---|
| Only variables of type `ThemeData` are listed as themes; other variables in the file are not | ok | `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:57-62` (`.where((variable) => variable.type == $ThemeData.thisType)`; 3.12.5 listed every variable) | |
| A function-built theme is listed too | fixed (wording) | `themes_panel.dart:57-62` lists variables only; `packages/core/test/envirnoment_tests/theme_tokens_test.dart:500-512` (`final ThemeData night = _base(...)` is the function-built case) | the original sentence "A theme that your code builds with a function is one too" could be read as "a function returning ThemeData is listed", which it is not. Now: "A `ThemeData` variable that a function builds is listed too." |
| **Delete** on the **Active** theme is greyed out and says **The applied theme** | ok | `packages/core/lib/src/panels/details/theme_panel/themes_context_menu.dart:7-20` (`subtitle: applied ? 'The applied theme' : null`, `enabled: !applied`, `applied` = `activeThemeVar`, the same variable that gets the **Active** label, `themes_panel.dart:63,239,251`) | 3.12.5 showed a tooltip "Cannot delete applied theme" instead |
| Rename / Delete menu, **Create New Theme**, **Active**, **Refresh**, **Open in New Tab**, **Create Theme Setup**, **Override Color Role**, **Scheme Variant**, **Seed Color**, **Add Color**, **Reset all to default**, **Default Font** (only for `ThemeData(...)` themes) | ok | `themes_panel.dart:190-193,271`, `theme_setup_view.dart:13,56`, `override_color_popup.dart:161`, `theme_panel_fields.dart:205-207,269`, `theme_panel_details.dart:137`, `text_fields.dart:868` | labels unchanged |
| A color field shows a role's name (`primary`) or an extension color's name (`brand`) when the widget follows the theme | ok | `packages/core/test/envirnoment_tests/theme_tokens_test.dart:130-140` (field that reads a token shows `accent`), `color_fields.dart` (`StyleHelper.styleName`) | |
| Extension tabs: one per extension, named after its class | ok | `theme_panel_details.dart:15-47` (`NowaTabItem(label: ...cachedReturnType.name ?? 'Extension')`) | |
| A theme written as `ThemeData(...)` also keeps a **Default Theme** tab, first | ok | `theme_panel_details.dart:22,36,42` (`_isWrittenOut` = constructor call whose class is `ThemeData`; tab added first) | |
| A theme built by a function or `copyWith` shows only its extension tabs | ok | `theme_panel_details.dart:22` (`copyWith` is a function-call delegate, not a `ConstructorCallDelegate`: `block_tree.dart:5846`), test `theme_tokens_test.dart:218-245` ("Default Theme" `findsNothing`); extensions found through `theme_service.dart:35-47` (`extensionsOf`) | |
| A color that points to another color (`AppColors.primary`) shows as the color it reads | ok | `themes_panel.dart:214` (`colorsAsValues: true`), `packages/core/lib/src/fields/block_field.dart:861-880` (`BFColor(field, showValue: true)` for a linked `Color`) | |
| Nowa supports up to 8 theme extensions | ok | `packages/core/lib/src/themes/theme_class_instance.dart:21-31` ("Cannot have more than 8 Theme Extensions") | |
| Ctrl/Cmd+3 opens Themes; Ctrl/Cmd+Z / Y undo inside the panel | ok | `lib/project/side_bar.dart:36-80` (Assistant 1, Library 2, Themes 3), `themes_panel.dart:162-163` | in code mode Files replaces Library in slot 2, Themes stays 3 |
| Links (11) | ok | link checker | |

Not claimed (as the writer chose): that the panel now reads the file holding the applied theme (`themes_panel.dart:44`, `theme_service.dart:31-34`).
The page still says `lib/globals/themes.dart` for new projects, which is true; for an imported project whose applied theme lives in another file
the panel reads that file. Left as written (open issue 1 below). Fixed 1 (wording), removed 0. 1,339 words, over the target but the page was that long
before 3.13 and every section is a separate task; not cut.

## docs/design/theme-styles.md

Changed in 3.13: new H3 "Colors from theme extensions" (under "Use a theme color"), one paragraph under "Use a theme text style", new CAPTURE comment `design-theme-styles-2`.

| claim | verdict | code ref | note |
|---|---|---|---|
| With theme extensions that have `Color` fields, the color list has one tab per extension (named after its class) and a last tab **Material** | ok | `packages/core/lib/src/fields/color_fields.dart:816-835` (`tokens` grouped by extension; `NowaTabBar` with one `NowaTabItem(label: extension.name)` each + `NowaTabItem(label: 'Material')`, shown `if (extensions.isNotEmpty)`); tokens = `Color` fields of every `ThemeExtension` subclass in the project: `theme_service.dart:98-107`, `ast_to_block_visitor.dart:856-862` | the page says "has colors", matching the `isNotEmpty` gate |
| **Material** holds the usual roles and **Show more colors** | ok | `color_fields.dart:849-873` (`allThemeColors` + `AdvancedOptions(message: 'more colors')`), `block_field.dart:1331-1362` (`'Show ${widget.message}'`) | the 3.12.5 text already had **Show more colors** |
| Picker opens on the linked color's extension; the first extension when the field isn't linked; **Material** when linked to a Material role | ok | `color_fields.dart:886-891` (`_tabOf`: user-picked tab, else extension of the picked token, else `styleName == null ? 0 : extensions.length`) | |
| Picking an extension color shows its name (`brand`) | ok | `packages/core/test/envirnoment_tests/theme_tokens_test.dart:130-140,195-215` (`styleName == 'accent'`, text `accent` shown) | |
| The field reads `AppColors.of(context).brand`, or `Theme.of(context).extension<AppColors>()!.brand` if the class has no `of` | ok | `packages/core/lib/src/themes/theme_token.dart:22-31`; test `theme_tokens_test.dart:73-86` | |
| Extension colors have no **Edit** button; change them in the **Themes** panel | ok | `color_fields.dart:148-175` (`onEdit: field != null ? _onEdit : null`; extension tiles built without `field:` at `:835-842`); extensions are edited in the Themes panel tabs (`theme_panel_details.dart`, see themes.md) | |
| **Text Styles**: a header per extension that has `TextStyle` fields (extension's name), listed first, then a **Material** header over the usual styles; headers only when there are extension styles | ok | `packages/core/lib/src/fields/style_fields/style_fields.dart:232-283` (`StyleGroupHeader(extension.name)`, `if (tokens.isNotEmpty) const StyleGroupHeader('Material')`) | |
| Extension text styles have no **Edit** button | ok | `style_fields.dart:259-266` (`TextStyleTile(null, ...)`), `text_fields.dart:939-975` (`onEdit: field != null ? _onEdit : null`) | |
| 12 other labels in the unchanged text (Colors From Theme, With values, Alpha, Show more, CopyWith, Remove CopyWith, Modify Style, Button Style, Button Theme, Connect to Theme, Default theme, Select theme) | ok (unchanged) | grep hits in `color_fields.dart`, `text_fields.dart`, `style_fields.dart`, `button_fields` (no 3.13 label diff) | these lines are not in the 3.13 diff |
| CAPTURE comment well formed | ok | | id, state, show, crop present; request row exists in `captures/requests/W30b.md` |
| Links (11) | ok | link checker | `themes.md#edit-theme-extensions` resolves |

Fixed 0, removed 0. 1,080 words.

