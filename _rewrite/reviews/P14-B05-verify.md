# P14-B05 verify (design: responsive, outline, themes, theme-styles, assets, fonts-icons, templates, localization)

Verifier: P14-B05-V. Diff checked: `git diff origin/main` for the 8 pages. Code: `/home/user/nowa-master` (3.13.0,
`3cb32031c`); refs are `path:line` from there. Flutter refs are the local SDK `/home/user/flutter/packages/flutter/lib/src/`.

## Summary

- Pages checked: 8 (all `+` and `-` lines, then each whole page against R1-R9).
- Claims checked: about 155 (UI labels, steps, results, the writer's 6 flagged items, the 24 moved facts).
- Fixed: 6. Restored: 2. Removed: 0. Added: 1 (routed from B13). Audience fixes (R5/R9): 2 of the fixes.
- Most serious: responsive.md had dropped "press Enter" from the typed-formula option (the formula doesn't apply
  without it); themes.md said the **Shape** tool's box is "the exception" that starts light gray, but a **Container**
  added as a widget starts light gray too (same block); themes.md had lost "In a new project" before "your app doesn't
  switch between light and dark by itself".
- Structure: explicit `{#id}` anchors from `origin/main` all present; the only heading removed (`## Declare fonts
  yourself`, moved to for-code) has no inbound link; all relative links and anchors resolve (script check);
  `generated-code.md` links use only `#themes`, `#assets`, `#fonts-and-icons`, `#localization`; admonitions ≤ 2 per page;
  no H1, no `---` rules, no hype words; images and video lines identical to `origin/main`.
- For-code file: 24 moved facts compared with the `-` lines: copied unchanged, plain-word versions left on the pages.
  Its two context notes checked (`theme_setup_view.dart:62-63` vs `file_template.dart:33-34`;
  `packages/ai/lib/src/tools/download_font_tool.dart:8-10`). No change needed.

## responsive.md

| claim | verdict | source | note |
|---|---|---|---|
| Visual width condition, step 3: click **Visible**, open **EXPRESSIONS**, choose **Logical**, a popup opens | ok | `packages/core/lib/src/fields/field_link_menu.dart:325-345` (Details field: `showGlobals` false at `:341` → `inCircuit` false); `packages/core/lib/src/interpreter/suggestion.dart:467-474,526-566` (LOCALS, GLOBALS, EXPRESSIONS; **Logical** offered when the field is `bool`); `packages/core/lib/src/fields/link_menu.dart:331` (category names upper-cased); `field_link_menu.dart:167-173` + `expression_builder_popup.dart:44-55` (an expression suggestion closes the menu and opens the popup) | `visible` → label "Visible" via `camelCaseToSpaces` (`block_field.dart:215`, `utils.dart:77-79`) |
| Step 4: **Type** → `double`; changing it resets both sides; **Operator** → `greaterThanOrEqual` | ok | `packages/core/lib/src/fields/expression_builder/expression_details.dart:282-321` (Operator lists `e.name` of logical operators; Type's `onUpdate` replaces both sides); `nowa_fields.dart:686` (basic types incl. `double`); `block_utils.dart:95-96` (double → `0.0`); `block_tree.dart:2383-2430` (operator names) | Setting Type first is required: with a `bool` left side the member drill-down never closes (`link_menu.dart:152-160`, `field_link_menu.dart:175-181`) |
| Step 5: **Left side** → **GLOBALS** → **Media Query** → `size` → `width` | ok | `expression_details.dart:262-266` ("Left side"/"Right side"); `block_field.dart:1020-1028` (label opens the link menu); `global_state_suggestions.dart:60-64` (**Media Query**, type `MediaQueryData`); `link_menu.dart:152-160`, `field_link_menu.dart:175-181,333-340` (a type mismatch shows the value's members, until a `double` matches) | Not run live (open issue 1); the whole chain is consistent in code |
| Steps 6-8 (Right side 600, `smallerThan`, test with **Size** + **Play**) | ok | same files | |
| Typed formula: "choose **Custom Expression...** instead and type ..." | restored | `expression_builder_popup.dart:242-262` (text mode applies on <kbd>Enter</kbd> or **Eval**); old page step 4; `logic/expressions.md#custom-expression` step 3 | "and press <kbd>Enter</kbd>" was dropped in the rewrite; put back |
| "While your data isn't connected yet, Nowa fills in empty values on the board" | fixed | `test/instant-play.md#placeholders-on-the-board-real-values-in-play` (board placeholders are for empty values; **Play** runs real logic) | Implied the board shows real data once data is connected. Now: "On the board, Nowa fills in values that are still empty, such as a list your app only fills once it runs, ..." |
| AI prompt for side menu / bottom bar, then check with **Size** + **Play** | ok | R5 | No promised output |
| Intro, breakpoints explained, sign-up form example, Grid **Max** rephrase, "Don't worry about picking the right size", variable/param glosses, **Test String** example, "never your app", side-menu example | ok | unchanged facts; `group_details.dart:160-292` (test changes only the board, W4) | R4/R8/R9 additions, accurate |

## outline.md

| claim | verdict | source | note |
|---|---|---|---|
| Right-click entries **Remove**, **Replace with...**, **Group** / **Ungroup**, **Copy** / **Cut**, **Bring to front**, **Send to back** "and more", **Create component**; acts on the row clicked | ok | `packages/designer/lib/src/menus/widget_context_menu.dart:21-58`; `packages/designer/lib/src/panels/outline_panel.dart:189-197` (selects the row's widget, then the same `widgetMenuEntries`); `packages/nowa_ui/lib/outline/outline_view.dart:257-261` | Slot and branch rows have no widget, so no menu (`_mapper.instanceOf` null): "widget row" is right. No "Duplicate" entry exists |
| Home icon "on the right" = trailing; component name purple | ok | `outline_view.dart:217-246` | |
| Condition rows from a **Conditional** that picks between widgets, and conditions in AI-built screens; flipping branches is safe | ok | `packages/core/lib/src/interpreter/widget/model_node.dart:48-62` (`if`, `?:`, `switch` producing widgets); branch tooltips `outline_view.dart:290-310` | |
| Intro, auto-expand result, nesting line, glosses (home screen, component, wrappers), repeat example, reorder example | ok | | R4/R9, accurate |

## themes.md

| claim | verdict | source | note |
|---|---|---|---|
| "The theme your app uses opens for editing" | ok | `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:51-53,304-324` (tapping a theme selects and applies it) | Differs only right after **Create New Theme** (selected, not applied), which the page says |
| `lightTheme` light / `darkTheme` dark; board shows the **Active** one | ok | `packages/core/lib/src/file_system/templates/common/themes_dart_template.dart` | |
| **Refresh** redraws; undo/redo "while the panel has focus"; **Open in New Tab** opens themes as code | ok | `themes_panel.dart:159-191` (panel's own Undo/Redo actions and Z/Y shortcuts; Refresh → `evalEnv()`) | |
| Note: imported theme without colors gets a purple palette | ok | `theme_panel_fields.dart:39-46` (`ColorScheme.fromSeed(Colors.deepPurple)`, not recorded for undo) | |
| `holidayTheme` example; "empty, already taken or reserved" | ok | `packages/core/lib/src/file_system/naming.dart:34-45` ("is already taken", "reserved keyword") | |
| New theme: **Seed** mode, purple seed, not applied | ok | `themes_panel.dart:110-145` (`0xFF673AB7`; `onTapTheme` without `_setDefault`) | |
| "Nowa saves your choice with the project" | ok | `packages/core/lib/src/project/env_services/theme_service.dart:115-145` | |
| "Your app doesn't switch between light and dark by itself" | restored | `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:48,101` (`theme:` only, no `darkTheme`/`themeMode`) | "In a new project," was dropped; an imported project may already switch. Put back |
| Rename updates every use; Delete lists uses, asks; **The applied theme** greyed out | ok | `themes_context_menu.dart:8-20` | |
| Tiles, popup sides, **HEX** (six characters, e.g. `6200EE`) and **OP**, eyedropper, live result | ok | `theme_panel_fields.dart:281-345,379-560`; `packages/core/lib/src/fields/color_fields.dart:960-1030,616-641` | |
| Role table (Primary, Secondary, Tertiary, Surface, Error, Shadow, "on" colors) | ok | Flutter `material/color_scheme.dart:76-87,1037-1043,1085-1086,1136-1139,1188-1189,1214,1303-1304`; https://api.flutter.dev/flutter/material/ColorScheme-class.html. Nowa labels: `models.dart:22-45` + `camelCaseToSpaces` in tiles and **Override Color Role** (`override_color_popup.dart:80-84,161`) | Error and Shadow are reachable through **Add Color**. Nuance kept as is: the FAB uses `primaryContainer` in Material 3, which falls back to Primary in **Fixed** mode (`color_scheme.dart:1047-1050`); in **Seed** mode the seed drives it |
| **Primary Container**, **Outline** glosses; reset clears role and its "on" color | ok | `color_scheme.dart:1048,1292`; `theme_panel_fields.dart:463-471` | |
| Flagged: "Colors you haven't edited switch with light/dark, colors you set stay" | ok | `theme_panel_fields.dart:111-127` (Fixed: `changeConstructor` light ↔ dark keeps role arguments; Seed: only `brightness` changes, overrides stay) | True in both modes |
| **Mode** carries Primary ↔ **Seed Color** | ok | `theme_panel_fields.dart:69-101` | |
| Scheme variant table and labels; Tonal Spot is the default; variant change undoable | ok | Flutter `color_scheme.dart:30-62,312`; https://api.flutter.dev/flutter/material/DynamicSchemeVariant.html; labels `theme_panel_fields.dart:214-229`; `tryRecord` `:103-110` | |
| Typography table (Display, Headline, Title, Body, Label; Body Medium default; button text Label Large) | ok | Flutter `material/text_theme.dart:139-230`; https://api.flutter.dev/flutter/material/TextTheme-class.html; group and row labels `packages/core/lib/src/fields/text_fields.dart:893-920` ("Body Medium", "Label Large"); **Button** is `ElevatedButton` (`widgets_to_add.dart:233`) | |
| **Default Font**: every style uses it unless the style has its own font; missing for other theme setups | ok | Flutter `material/theme_data.dart:510-524` (font applied to the default text theme, then the theme's own styles merged over it); `text_fields.dart:858-869` | |
| Reset one style / **Reset all to default** puts all 15 back | ok | `theme_panel_details.dart:129-144` (empty `TextTheme`) | |
| Button field glosses (Foreground, Elevation, Side, Radius) | ok | `packages/core/lib/src/fields/button_fields.dart:322-373` | |
| "New buttons follow these styles from the start" | fixed | `packages/core/lib/src/file_system/widgets/previews/themes_preview/theme_details.dart:295-304` (**Button** = `elevatedButtonTheme`, **Icon Button** = `iconButtonTheme`); `widgets_to_add.dart:231-262` | **Floating Button** has no style here. Now "New buttons and icon buttons follow these styles from the start." |
| Flagged: "new texts, buttons and icons start with the theme's look, but a box drawn with the Shape tool starts light gray" | fixed | `default_blocks.dart:8-13,318-330`; `designer_tools.dart:90-91`; `widgets_to_add.dart:146` (Library **Container** = same gray `containerBlock`), `:292` (**TabView** black tab labels), `:581`, `:743` | Texts, buttons and icons: ok. "The **Shape** tool's box is the exception" was incomplete. Now: "Boxes are the main exception: a **Container**, whether you add it as a widget or draw it with the **Shape** tool, starts light gray. A few other widgets, such as **TabView**, and many templates bring fixed colors of their own too." |
| Extensions: tabs named after the set (`AppColors`); **Default Theme** tab for most themes; other setups only extension tabs; up to 8 | ok | `theme_panel_details.dart:20-49`; `packages/core/lib/src/themes/theme_class_instance.dart:10-34` (8 extension types, slots reset per project) | |
| Flagged: AI prompt for an extension, then check the tab | ok | R5 | No promised output; says how to check |
| "A project without them, such as one you imported, shows an error" | fixed | `themes_panel.dart:41-48,148-156` (error when `lib/globals/themes.dart` can't load) | An imported project can have themes in its own code and still see the error. Now "A project without Nowa's theme setup" (matches the button) |
| **Create Theme Setup** dialog lists files; **Create**; adds both, skips existing, panel reloads | ok | `packages/core/lib/src/file_system/widgets/previews/main_preview/theme_setup_view.dart:12-19,55-73`; `packages/core/lib/src/project_environment/env_manager.dart:155-180` | Dialog shows wrong paths (product issue P13); the page names no paths |
| Tip prompt + check | ok | | |

## theme-styles.md

| claim | verdict | source | note |
|---|---|---|---|
| Picker lists the **Active** theme's roles in raw form (`onPrimary`); **Show more colors** | ok | `color_fields.dart:33-83,805-880` (`appliedThemeVar`; `AdvancedOptions(message: 'more colors')`) | |
| Detach keeps the current color as fixed | ok | `color_fields.dart:520-531` (W4) | |
| Extension tabs named after the set; **Material** last; opens on the used color's tab, unlinked field on first extension | ok | `color_fields.dart:826-891` (`_tabOf`) | Dropped clause ("**Material** when linked to a Material role") is covered by "the tab of the color the field uses" |
| **With values**: 3 steps, starts at 0.5, still follows the theme; **Show more** → Red, Green, Blue | ok | `color_fields.dart:277-312`; `block_field.dart:1332-1356` ("Show more") | |
| Old `withOpacity` note (typo quoted) and **Update** keeps the look | ok | `color_fields.dart:243-266` | |
| `bodyMedium` default; `headlineSmall` example consistent with themes.md table | ok | Flutter `text_theme.dart:202` | |
| **CopyWith** gloss, strikethrough under **Decoration**, later theme size change still reaches it | ok | `text_fields.dart:174-197,309-333` | |
| x on style starts empty; **Font Size**, **Color** | ok | `style_fields/style_fields.dart:162` (W4) | |
| Buttons: change once in **Widgets** → **Buttons**, connected buttons follow; red Delete example | ok | `theme_details.dart:295-304` | |
| `AppState` / `changeTheme` glosses; **Run** then the app switches; second button for `lightTheme` | ok | `app_state_template.dart:28-35` | |
| Flagged: "starts in the **Active** theme again" + AI prompt to remember the choice, how to check | ok | `theme_service.dart:115-145`; `app_state_template.dart:28-35` (nothing saved) | No promised output |
| Figma in **Agent** mode: adds them, reloads themes, check board and **Themes** | ok | `packages/ai/lib/src/mcp/figma_mcp.dart:32-37,71-97` | |
| Tip check (color fields show `secondary`) | ok | | A check, not a promise |

## assets.md

| claim | verdict | source | note |
|---|---|---|---|
| Assets ship with the app, show offline | ok | `packages/core/lib/src/settings/pubspec_manager.dart:127-132,205-235` (W4) | |
| Plain-word upload target; folder upload (`fonts`); "nothing else to set up" | ok | `lib/project/panels/library_panel/library_host.dart:160-186` | |
| Naming tip (old page) | ok | `packages/core/lib/src/library/library_service.dart:331-339`; rename keeps old paths (`nfile_impl.dart:102-128`) | |
| New Image starts with a web sample; **Upload Image** adds the file and the widget shows it | ok | `widgets_to_add.dart:203-213`; `packages/core/lib/src/fields/asset_fields.dart:106-145,177` (upload calls `stringUpdate` on the field) | |
| **Network**, **Asset**, **Bytes** tabs explained | ok | `packages/core/lib/src/fields/basic_fields.dart:912-931` | |
| Audio asset note | ok | `basic_fields.dart:1127` ("Asset file will work only on Android and iOS") | |
| Paste: `pasted_image_` name, clipboard permission | ok | `packages/designer/lib/src/design/copy_paste.dart:110-118`; P12 live check | |
| Dropping on the board doesn't import; images dropped on the AI chat are attached | ok | `lib/project/drop_from_outside.dart:8` (`DropFromOutside` is never instantiated; grep finds only its own constructor); `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:255` | |
| Rename row, **Copy as path** gloss, unused files make the app bigger, AI tip | ok | `files_tree_host.dart:469-470`; `save_attached_image_tool.dart:10-38` | |

## fonts-icons.md

| claim | verdict | source | note |
|---|---|---|---|
| Fonts listed in their own typeface; Google Fonts suggestion | ok | `text_fields.dart:787-791,612` | |
| Picked font bundled, file in `fonts`, named after the font; import adds to `fonts` and selects it; name = file name | ok | `text_fields.dart:16-55`; `file_object.dart:469-498` | |
| Filter table, web list sizes | ok | `text_fields.dart:521,542-547` | |
| Icon search "contains"; style variants (`home_outlined`, `home_rounded`) | ok | `packages/core/lib/src/fields/icon_field.dart:127-141`; Flutter `material/icons.dart` | |
| Figma icons as SVG | ok | `figma_mcp.dart:33-34` | |
| "A new icon has no color of its own ... Pick a theme color to keep it in step with your theme" | fixed (R9) | `widgets_to_add.dart:184` | Read as if the icon didn't already follow the theme. Now "To give it another color that still changes with your theme, pick a theme color." |
| Routed from B13: fill, weight, grade, optical size have no visible effect on the picker's icons; **Text Direction** flips direction-aware icons such as a back arrow | added | Flutter `widgets/icon.dart:113-127,145-160,227-239`; picker loads `MaterialIcons` only (`icon_field.dart:128`) and writes `Icons.<name>` (`:58`), so `matchTextDirection` is kept (`material/icons.dart:2290-2294`, `arrow_back`); `MaterialIcons-Regular.otf` has no `fvar` table (table directory read: CFF, GSUB, OS/2, cmap, head, hhea, hmtx, maxp, name, post); field label "Text Direction" (`button_fields.dart:35-69`) | New paragraph after the advanced-options sentence, in the page's tone |

## templates.md

| claim | verdict | source | note |
|---|---|---|---|
| **Components** for smaller blocks (audio player) | ok | `templates_service.dart:383` | |
| Name dialog: leave **Class name** / **Path**; GoRouter gloss; route gloss | ok | `file_actions.dart:48-53`; new projects use GoRouter (`projects_view_provider.dart:275`) | |
| Empty Page "shown at the size" of Pixel 3a on the board | ok | | |
| **Files in** + name; overwrite confirmation; tooltip "Please fix the problems before importing" | ok | `template_files_list.dart:100-111`; `add_template_dialog.dart:187` | |
| Screens on the board, other files imported; add routes before linking | ok | `add_template_designer.dart:7-37` (W4) | |
| **Google Button** is look only | ok | `built_in/google_button.dart:49,63` ("Continue with Google", `onTap: () {}`) | |
| "Make a template yours" bullets, AI tip | ok | advice, links resolve | |

## localization.md

| claim | verdict | source | note |
|---|---|---|---|
| Flagged: AI prompts for languages and a switcher, checks with board, **Problems**, **Run** | ok | R5 | No promised output |
| "Instead, Nowa AI adds the translations to your project" | fixed (R5) | | Stated what the agent will do. Now "Instead, you ask Nowa AI to add the translations to your project" |
| "Could not load" + name in **Logs**, board keeps drawing; paste it to Nowa AI; Logs link | ok | `packages/core/lib/src/localization/localizations_class_instance.dart:39-46`; `utils.dart:29-32` (`logError` → Logs); `test/run.md#read-the-logs` | |
| Font coverage advice | ok | advice | |
| `rtl` / `ltr` glosses; first widget in a row moves right | ok | `wrappers_to_add.dart:115-119` (wrapper is `Directionality`); Flutter `Row` start follows direction | |
| Flagged: RTL AI tip + check | ok | | |

## Removed facts (the `-` lines)

- All 24 moved facts: in `P14-B05-for-code.md`, unchanged; each has a plain-word version on its page where the reader
  needs one (upload target, "registers your files", font file location, Theme Setup steps, Default Font fallback,
  "saves your choice", Figma result, "Could not load"). The rest is code-only (file paths, `pubspec.yaml`, class and
  method names, `ThemeData(...)` / `copyWith`, `AppColors.of(context)`, `google_fonts`, `flutter_localizations`).
- Not in the for-code file and needed by the reader: "press <kbd>Enter</kbd>" (responsive.md) and "In a new project"
  (themes.md). Both restored.
- Other `-` lines reworded without losing facts (checked line by line).

## Coverage spot checks

Obsolete rows (7 of 7 checked):

| row | result |
|---|---|
| Open `themes.dart` → **Colors** | confirmed: now the **Themes** panel (`themes_panel.dart:180`) |
| **Background** / **On Background** roles | confirmed: skipped as deprecated (`models.dart:42`) |
| **Colors from** menu | confirmed obsolete for users: the label still exists (`color_fields.dart:108`, `ColorSchemeDetails`) but only `ThemeDataDetails` opens it (`themes_preview/theme_details.dart:131`), and `ThemeDataDetails` is never instantiated (grep). The panel uses **Brightness** / **Mode** |
| **Set as default** | confirmed: no such label; tapping a theme applies it (`themes_panel.dart:304-324`) |
| Open `themes.dart` → **Typography** | confirmed: **Themes** → **Typography** (`theme_panel_details.dart:122-155`) |
| **Files** panel → **Assets** | confirmed: the Library's **Assets** source (`packages/nowa_ui/lib/library/library_panel.dart:435`) |
| Drag files from the computer onto the board | confirmed: `DropFromOutside` (`lib/project/drop_from_outside.dart:8`) is never instantiated; only the AI chat takes drops |

Covered rows sampled (12): Outline double-click (outline.md, select section) ok; purple components (read the tree)
ok; template **Import** (multi-file section) ok; template kinds (built-in table) ok; **With Opacity** (transparent
section, **With values** plus the old note) ok; rename/delete theme ok; `changeTheme` switch ok; **Copy with** with
the strikethrough example ok; **Detach Style** (the x on the style button; label gone, grep) ok; asset **Rename** ok;
upload from a widget property ok; **Remove** → now **Delete** (`library_host.dart:166-167`) ok.

## Routed from B13

Applied to `design/fonts-icons.md`, "Choose an icon", after the advanced-options sentence (row above). Evidence
re-checked: the SDK docs, the picker's font, and the font file's table directory.

## Open issues

1. Not run in the app (no live session): the full **Logical** + **Media Query** chain on responsive.md, and the typed
   formula. The code path is consistent end to end (see the table).
2. AI prompts not tried, by the rules (extension tab, remembering the theme, languages, switcher, RTL, Figma). Every
   page says how to check the result and promises no exact output.
3. themes.md is about 2,150 words of prose, above the style guide's ~1,200. The writer's split proposal stands (not
   split here).
4. Unchanged from earlier phases: whether **Play** shows a `changeTheme` switch (the page says **Run**), and whether a
   first asset uploaded only through **Upload Image** is registered for the build (`asset_fields.dart:106-145` doesn't
   refresh the pubspec).
5. Product issue P13 (the **Create Theme Setup** dialog lists `lib/global/...` paths): no page impact.
