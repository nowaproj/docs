# W4 writer notes (Design your app: properties, layout, responsive, themes, theme-styles, assets, fonts-icons, templates, localization)

Paths are relative to `/home/user/nowa-master` (v3.12.5) unless marked "dev". Research files: `_rewrite/research/features-*.md`.
Code wins over research; contradictions are noted per page.

## themes.md (`docs/design/themes.md`)

Research: `features-theme-assets.md` sections Themes (panel), Create New Theme, Active theme, Rename / Delete a theme, Colors, Brightness/Mode/Seed Color/Scheme Variant, Typography, Widgets theme, Theme extensions, Create Theme Setup.

Code spot-checks (all matched the research unless noted):
- Ctrl/Cmd+3 = Themes: sidebar order Assistant, Widgets, Themes (`lib/project/side_bar.dart:34-50`), digit keys by index (`lib/setup_general_actions.dart:47-61`). The Git icon is inserted after Search in real projects but Themes stays third.
- Panel title/Refresh/Open in New Tab/Create New Theme/Active: `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:154-175,255-287,336-390`; `packages/core/lib/src/widgets/nowa_widgets.dart:161-163`.
- Clicking a theme tile applies it (`_setDefault`, `themes_panel.dart:333-339,382-383`); the arrow button only expands the list (`:340-355,397`). After **Create New Theme** the theme is selected but not applied (`:107-140`).
- Rename/Delete + "Cannot delete applied theme": `themes_context_menu.dart:24-35`; delete asks when references exist: `packages/core/lib/src/actions/block_actions.dart:10-84`; rename updates references (`DeclGen.rename`, `packages/core/lib/src/interpreter/generators/declaration_generator.dart:27-60`).
- Name rules/errors: `packages/core/lib/src/file_system/naming.dart:36-59`, `packages/core/lib/src/widgets/rename_declaration_field.dart:112-140`.
- Colors/Brightness/Mode/Seed/Scheme Variant: `theme_panel_fields.dart:57-240` (variant labels via `camelCaseToSpaces`, `packages/core/lib/src/utils.dart:77-79`; enum values `/home/user/flutter/packages/flutter/lib/src/material/color_scheme.dart:30-62`). Color picker (eyedropper, HEX, OP, opacity slider): `packages/core/lib/src/fields/color_fields.dart:849-989`. Role list and deprecated roles excluded: `models.dart:4-45`.
- Typography groups/15 styles/Default Font only for plain `ThemeData(` constructor: `packages/core/lib/src/fields/text_fields.dart:821-924`; reset icon tooltips: `text_fields.dart:943-1047`, `theme_panel_details.dart:121-135`; style editor popup: `theme_panel_fields.dart:606-665`.
- Widgets theme (Fields / Buttons -> Button, Icon Button; field labels): `theme_panel_details.dart:152-178`, `packages/core/lib/src/file_system/widgets/previews/themes_preview/theme_details.dart:169-359`, `packages/core/lib/src/fields/button_fields.dart:316-391`.
- Extensions tabs ("Default Theme" + class names), up to 8: `theme_panel_details.dart:15-46`, `packages/core/lib/src/themes/theme_class_instance.dart:31`; What's New 3.12.3 line 69.
- Create Theme Setup: `packages/core/lib/src/file_system/widgets/previews/main_preview/theme_setup_view.dart`, `packages/core/lib/src/project_environment/env_manager.dart:145-170`.

Left out / changed vs research:
- Research said "other forms (e.g. `ThemeData.dark()`) show only a basic field". The code only falls back to the basic field when the block is not a `ThemeData` call (`theme_panel_details.dart:102-104`); I could not confirm what happens for `ThemeData.dark()`, so the page says nothing about it. It states instead what I confirmed: a theme without a `colorScheme` gets `ColorScheme.fromSeed(seedColor: Colors.deepPurple)` added when opened (`theme_panel_fields.dart:44-50,206-209`), and **Default Font** shows only for the plain `ThemeData(` constructor.
- Listing all addable color roles: left out (list comes from the Flutter version's `ColorScheme`); the page names a few.
- Undo/redo inside the panel (Ctrl/Cmd+Z, Ctrl/Cmd+Y): `themes_panel.dart:167-171`. Shift+Z is not bound in the panel.
- Create Theme Setup dialog text lists `lib/global/theme.dart` and `lib/global/app_state.dart` but the real files are `lib/globals/themes.dart` / `lib/globals/app_state.dart` (`theme_setup_view.dart:59-61` vs `file_template.dart:33-34`). The page names the real paths. Product team may want to fix the dialog text.
- Default MaterialApp in new projects has only `theme:` (no `darkTheme`/`themeMode`), so the app never follows the device's dark mode by itself (`packages/core/lib/src/file_system/templates/common/main_dart_template.dart:41-52`); the page says so in "Apply a theme" and links to theme-styles for `changeTheme`.
- Not mentioned: "Open in New Tab" for `themes.dart` also reachable from Files (`main.dart` -> **Themes Options**, `themes.dart` -> **Open Themes Panel**); minor.

Capture requests: design-themes-1, design-themes-2.

## theme-styles.md (`docs/design/theme-styles.md`)

Research: `features-theme-assets.md` sections Colors From Theme, Text Styles, Connect to Theme, Switch themes while the app runs, Import a theme from Figma; `features-logic.md` (Events, Circuit, All nodes for this circuit, Using global states); `features-ai.md` Figma MCP.

Code spot-checks:
- Theme color list under the color picker, "Colors From Theme" header + detach icon, `Theme.of(context).colorScheme.<role>` written: `packages/core/lib/src/fields/color_fields.dart:699-849` (`BFColorPicker`, `_buildTheme`). Raw role names (`primary`, `onPrimary`...) and the extra list: `color_fields.dart:25-83`.
- Expander label is "Show more colors" / "Hide more colors" (not "more colors"): `AdvancedOptions` builds `'Show ${message}'` (`packages/core/lib/src/fields/block_field.dart:1318-1355`), message `'more colors'` at `color_fields.dart:822`. Same for `With values` -> "Show more" (`color_fields.dart:270`).
- Hover **Edit** on theme color/style tiles: `packages/core/lib/src/fields/style_fields/style_fields.dart:270-335`; opens the Active theme's field (`color_fields.dart:150-165`).
- Linked color field shows role name + x; x keeps the current value (`blockFromValue(val)`): `color_fields.dart:520-531`; detach icon in picker: `color_fields.dart:765-783`.
- **With values** menu item (only when the field is a `ReferenceBlock`) and **Alpha**/**Show more**/Red/Green/Blue: `color_fields.dart:241-312`. Old `withOpacity` note with **Update** button exists (`color_fields.dart:243-266`), not mentioned on the page.
- Text **Style**: button shows the linked or default style (`bodyMedium` / `titleLarge`), `packages/designer/lib/src/details/widget_fields.dart:266-310`; **Text Styles** popup with raw names: `style_fields.dart:131-255`; **CopyWith** / **Remove CopyWith** / **Modify Style** menu items: `packages/core/lib/src/fields/text_fields.dart:181-232`; the x on the style button replaces the style with an empty `TextStyle()` (so after detaching the text starts empty): `style_fields.dart:162`.
- Button style: header shows **Button Theme** / **Icon Button Theme** when the field is null or linked, **Connect...** when custom; x calls `setupButtonStyle` (custom `ButtonStyle` with null values); popup **Connect to Theme** -> **Default theme**; no applied theme -> `ThemeSetupDialog`: `packages/core/lib/src/fields/button_fields.dart:281-489`. Style fields (labels): `button_fields.dart:316-391`.
- `changeTheme`: `packages/core/lib/src/file_system/templates/common/app_state_template.dart:28-35`; MaterialApp uses `AppState.of(context).theme` only (`main_dart_template.dart:41-52`). **GLOBALS** lists attached global states only inside screens/components (`packages/core/lib/src/state_management/global_state_suggestions.dart:66-93`). ThemeData-typed inputs use `BFThemeData` (button **Select theme**, link menu category "Themes"): `packages/core/lib/src/fields/basic_fields.dart:2045-2070`, registered at `packages/core/lib/src/fields/block_field.dart:72`.
- Figma: `packages/ai/lib/src/mcp/figma_mcp.dart:31-37,71-86` (cloud projects write `lib/globals/app_colors.dart` / `app_text.dart` and reimport `themes.dart`).

Left out / assumptions:
- Old docs said theme changes can be seen "by testing the app". I wrote "Run your app, then tap the button". I did not verify whether Instant Play shows the switch on the board.
- Persisting the chosen theme across app restarts: not by default (`AppState._theme = lightTheme`); not stated on the page.
- The theme color list appears only when the field can access a `BuildContext` (widget fields on the board or inside a build method; `block_field.dart:724-730`); not stated on the page.
- Step list for `changeTheme` is the minimal flow; W5/W6 pages (`circuit.md`, `global-state.md`) own the detail. Needs verification of the **+** member picker on a global-state node in Details (taken from `features-logic.md` "Using global states").

Capture requests: design-theme-styles-1.

## fonts-icons.md (`docs/design/fonts-icons.md`)

Research: `features-theme-assets.md` sections Fonts picker, Custom fonts declared in pubspec.yaml, Icons picker; `features-ai.md` "What the agent can do" (Fonts); What's New 3.7.3 and change-log 3.12.5 line 30.

Code spot-checks:
- Fonts popup (title "Fonts", **Import**, search, tune-icon filter with **All Fonts** / **Default Fonts** / **Imported by you**, "We recommend checking the fonts on Google Fonts", "No Fonts"): `packages/core/lib/src/fields/text_fields.dart:365-455,457-758`. Font button shows the name or **Default** (`text_fields.dart:370-395`).
- Google Fonts download of the family's `regular` file to `assets/fonts/<Name>.ttf` (`capability=VF`), skipped if the file exists: `text_fields.dart:25-55`. Whether that file is a variable font (all weights) is unconfirmed, so the page says only "regular file".
- Import: `.ttf`/`.otf`, `allowMultiple: false`, saved in `assets/fonts/`, pubspec refreshed, family = file name without extension: `text_fields.dart:16-23,724-748`; `packages/core/lib/src/file_system/file_object.dart:469-498`.
- Web vs desktop list size (first 100 Google Fonts, search `take(20)`): `text_fields.dart:520-533`. **Imported by you** lists every `FontFile` under `assets/` (so downloaded Google Fonts show there too): `text_fields.dart:507-521`.
- The picker lists `FontFile.family` (file name without extension), so family names declared in `pubspec.yaml` are NOT listed (answers the research open question): `text_fields.dart:507-521`, `file_object.dart:481`. Declared families still render on the board: `packages/core/lib/src/settings/pubspec_manager.dart:78-116`; declarations kept, undeclared font files added, missing files dropped: `pubspec_manager.dart:165-203`; change-log 3.12.5 line 30.
- Icons picker (popup title "Icons", search, grid; button shows icon + name or "none"; lists `Icons` class members only): `packages/core/lib/src/fields/icon_field.dart:14-191`. Icon widget fields (size, color, advanced options list): `packages/core/lib/src/fields/button_fields.dart:35-69`; expander label is "Show advanced options" (`block_field.dart:1318-1355`).
- Font Family field is part of every text style editor (`BFTextStyleFields`, `text_fields.dart:233-260`); on a Text widget those fields appear only after **CopyWith** or detaching (`text_fields.dart:181-232`).

Left out: Google Fonts download uses the web API key and `proxyLink` (internal). A theme's **Default Font** exists only for the plain `ThemeData(` constructor (`text_fields.dart:~833`); not repeated here (stated on themes.md).

Capture requests: design-fonts-icons-1, design-fonts-icons-2.

## assets.md (`docs/design/assets.md`)

Research: `features-theme-assets.md` sections Assets in the Files panel, Pick or upload an asset from a widget property, Paste an image onto the board, Drag an asset onto the board, Asset file actions; `features-designer-core.md` Copy / Cut / Paste, Adding things to a board.

Code spot-checks:
- Files panel rows **lib** / **boards** / **assets**; the **assets** row has the upload icon with tooltip **Import asset** (`DirAddButton`, `lib/project/panels/files_panel/files_list.dart:395-409,440-516`); screenshot `captures/ui-map/05-panel-files.png` confirms the rows. Click shows a preview popup (board view), double-click opens (`files_list.dart:300-330`, `file_preview_body.dart`). Moving inside **assets** only: `files_list.dart:106-126`.
- Import: `gProject.upload` -> any file type, multiple files -> `importInDir` -> `PubspecManager.refresh()` (`packages/core/lib/src/providers/project_provider.dart:697-715,787-804`). Pubspec lists every non-empty folder under `assets/` and rewrites `fonts:` (`packages/core/lib/src/settings/pubspec_manager.dart:127-132,205-235`). Recognized extensions and importers: `packages/core/lib/src/file_system/file_info.dart:10-80`, `importer.dart`. Other extensions fall back to the text importer.
- Widget picker: `BFAsset` button **Pick <name>**, popup header **Pick <name>** + **Upload <name>** + search + thumbnails; uploads are created directly in `assets/` (undo removes them): `packages/core/lib/src/fields/asset_fields.dart:12-227`. Tabs: Image/Container decoration **Network / Asset / Bytes** (`basic_fields.dart:888-953`), Video **Network / Asset** (`:956-1027`), Audio **Network / Asset / Bytes** with the note "Asset file will work only on Android and iOS" (`:1029-1140`), Lottie (`:1142-1194`), SVG (`:1196-1256`, `packages/designer/lib/src/details/widget_fields.dart:120-210`), Rive (`:1258-1300`). Widget picker names: Image, SVG, Video Player, Lottie, Rive (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart`). `AudioSource` fields appear for audio players such as the **Audio Player** template (`packages/core/lib/src/services/templates/built_in/audio_player.dart:38`); there is no audio widget in the picker, so the page says "an audio player's source".
- Paste: `packages/designer/lib/src/design/copy_paste.dart:79-141`, `nowa_copy_paste.dart:40-112` (files only when `!kIsWeb`). RESOLVED research open question: web image paste goes through `Pasteboard.image` which reads `navigator.clipboard` on web (`~/.pub-cache/hosted/pub.dev/pasteboard-0.4.0/lib/src/pasteboard_platform_web.dart`), so Ctrl/Cmd+V with a copied image can work in the web app (browser clipboard permission needed; not tested). The page says "Copy an image ... press Ctrl/Cmd+V" without a platform restriction and only restricts copying files to the desktop app.
- Drag from **assets**: `createDragData` per file type (`packages/core/lib/src/file_system/file_object.dart:410-467,519-535,604-616,643-686`); Lottie `.json` and audio have none; image size = pixel size / 6 (`file_object.dart:437`).
- File menu labels and the view-only variant: `lib/project/panels/files_panel/file_context_menu.dart:33-121`; delete confirmation `Are you sure you want to delete "<name>"?` Cancel/Yes: `packages/core/lib/src/file_system/actions/file_actions.dart:121-203`, `packages/core/lib/src/widgets/nowa_dialogs.dart:6-26`.

Contradiction between research files (code wins): `features-designer-core.md` "Adding things to a board" step 4 says you can drag a file from your computer onto the board and it is imported. `features-theme-assets.md` says that code is never called. Code check: `DropFromOutside` (`lib/project/drop_from_outside.dart`) is never instantiated, only the AI chat field uses `PlatformDropFromOutside` (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:255`). So dropping files on the board does nothing in 3.12.5; assets.md says so. W3's `add-widgets.md` should not claim otherwise.

Left out / open questions:
- Renaming or moving an asset does not rewrite widget paths: `NFile.move` only updates Dart import references (`packages/core/lib/src/file_system/nfile_impl.dart:102-128`, `file_system.dart:430-465`). Not stated on the page (unconfirmed in the running app).
- Uploading from a widget property (**Upload Image** etc.) does not call `PubspecManager.refresh()` itself (`asset_fields.dart:119-136`); only imports, pastes, font imports, package changes and AI image saves do. The page says "When you import a file, Nowa updates `pubspec.yaml`" and does not claim it for property uploads. Open: is `assets/` registered if the first asset is added only through a widget property?
- Importing a file whose name exists: error is thrown (`nfile_impl.dart:486-489`); not shown to the user for **Import asset**? (open question from research). Not on the page.
- Empty tab (**New Tab** -> **Upload a File**, `lib/empty_editor.dart:56-65`) also uploads to `assets/`; left out (code mode route).
- Playground: stored only while the encoded project is under 3 MB (`packages/core/lib/src/playground/playground_manager.dart:19-37`); the page says "large files can stop your app from being saved in the browser" with a link to `get-started/playground.md` (W1). 
- No upload size limit found in the client.

Capture requests: design-assets-1.

## templates.md (`docs/design/templates.md`)

Research: `features-theme-assets.md` "Templates (Search for templates)" and "Playground starting points"; `features-designer-core.md` "Screen tool / Create a page".

Code spot-checks:
- Entry points: toolbar **Screen** (`packages/designer/lib/src/widgets/designer_tools.dart:150-160`), board context menu **Create a page** (`packages/designer/lib/src/menus/board_context_menu.dart:19`), Files **lib** row **Add to library** -> **New Widget...** (`lib/project/panels/files_panel/add_lib_menu.dart:48-67`).
- Picker (command palette): hint "Search for templates", tabs `Screens` / `Components`, preview pane, "Premium" label, free templates before premium (`premiumFirst` sorts false first), hover or arrow keys highlight, Enter or click select: `packages/core/lib/src/services/templates/add_template_action.dart:41-107`, `packages/command_palette/lib/src/widgets/options/command_palette_body.dart:200-210`, `.../command_palette_modal.dart:146-148`.
- Template list and flags (premium: Article, Dashboard, Event Info, Audio Player Page; components: Audio Player, Google Button; Animated Onboarding commented out): `packages/core/lib/src/services/templates/templates_service.dart:372-389`, `.../built_in/*.dart`. The "Empty" size-list branch is dead code because the template is named "Empty Page" (`add_template_action.dart:~160`).
- Premium check: `EntitlementKeys.premiumTemplates` (`packages/core/lib/src/billing/entitlement_keys.dart:8`), `PaymentDialog` "Time to level up" / "Upgrade" (and "Feature unavailable" when `kShowPurchaseUi` is false): `add_template_action.dart:19-36`, `packages/core/lib/src/widgets/nowa_dialogs.dart:88-133`. Code does not name a plan, so the page doesn't either (badge `paid` only).
- Single-file flow: `FileDialog` titled "New <template name>", name field with hint "<template name> name", **Class name**, **Path**, **Cancel** / **Submit**, target `lib/pages` or `lib/components`; route added with `addRouteByWidget('/${name.camelCaseToHyphenCase()}')` which does something only for GoRouter (`packages/core/lib/src/file_system/actions/file_actions.dart:28-73`, `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94-126`, `file_name_text_field.dart:140-210`, `packages/core/lib/src/project/env_services/app_routing_service.dart:105-109`, `go_router_routing_service.dart:79-82`). The route is NOT added for multi-file templates.
- Multi-file flow: dialog "Add <template name>", list "Files in <name>" with checkboxes (`showCheckbox`), rename/move, **Cancel** / **Import**, overwrite confirmation, tooltip "Please fix the problems before importing": `packages/core/lib/src/file_system/widgets/template_widgets/add_template_dialog.dart`, `template_files_list.dart:100-270`.
- Board placement (only screens when several files, 400 px apart, default size Pixel 3a 393x808): `packages/designer/lib/src/actions/add_template_designer.dart:7-37`, `packages/core/lib/src/screen_sizes.dart:12-21`. From the Files panel the file opens instead of being placed: `add_lib_menu.dart:53-63`.
- Playground picker groups **Playgrounds** / **Templates**: `lib/sandbox/sandbox_picker.dart:20-65`.

Left out: template previews fetched from storage for some templates (Onboarding Screen, Chat Template use image previews); `Request a Template` dialog, local/marketplace templates, import/export templates (debug only, see research "Not user-facing"). The `Audio Player` template component is mentioned only as a name.

Capture requests: design-templates-1.

## localization.md (`docs/design/localization.md`)

Research: `features-theme-assets.md` "Localization (multiple languages)" and "Text direction (right-to-left)"; `features-ai.md` "What the agent can do" (limits: `flutter_localizations`); What's New 3.7.3 (`docs/new/whats-new.md:334-338`) and change-log 3.7.3 (`docs/new/change-log.md:185`): "Just ask Nowa AI to set it up and it'll handle everything for you, end to end."

Basis for "Nowa AI can set up localization": What's New 3.7.3 plus `features-theme-assets.md` (verdict "accurate"). The AI package itself only contains the refusal of `flutter_localizations` (`packages/ai/lib/src/tools/packages_tool.dart:164-170`: "flutter_localizations is not supported by nowa, use a different approach."), no localization prompt text is visible in the client (prompts are server-side). The page therefore says only "ask Nowa AI to set it up" and does not describe how (no ARB files, no locale list, nothing about output).

Code spot-checks:
- Board honors `locale`, `localizationsDelegates`, `supportedLocales` (default `[Locale('en','US')]`), `darkTheme` and `themeMode` (default `ThemeMode.system`) of the app's `MaterialApp`: `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:103-161`. Custom `LocalizationsDelegate` classes are modelled: `packages/core/lib/src/localization/localization_blocks.dart:4-9`, `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:733-740`.
- Text **Text Direction** property: `packages/designer/lib/src/details/widget_fields.dart:300-310`; value dropdown lists enum members `ltr` / `rtl` (`BFEnum`, `packages/core/lib/src/fields/basic_fields.dart:1509-1535`).
- **Text Direction** wrapper = `Directionality(textDirection: ltr)`: `packages/core/lib/src/wrappers_to_add.dart:115-119`; display name `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:712-717`.

Left out: no app-wide RTL switch exists in the editor (research); the page says to wrap the screen's main widget. "Rows included" relies on Flutter's `Directionality` semantics (Row resolves its direction from it); not tested on the board. Device-preview Locale/Theme sections are disabled in code (`packages/device_preview/lib/src/device_preview.dart:112-118`), so no locale preview exists; not mentioned.

Capture requests: none (text-only page).

## layout.md (`docs/design/layout.md`)

Research: `features-designer-core.md` sections Group / Ungroup, Group section, Rows and columns, Stacks and constraints, Layout section (sizing), Scrolling and wrapping, Add Wrapper. Anchor `{#groups}` is on "Groups" (app link `/ui/layout/groups`, `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:249`).

Code spot-checks:
- Group/Ungroup rules: `_createGroup` copies the parent when the common ancestor is a children list, else a Stack; **Ungroup** menu item only for one group; Ctrl/Cmd+G always groups (nests): `packages/designer/lib/src/design/common_design.dart:25-130`, `packages/designer/lib/src/actions/designer_actions.dart:46-113`, `packages/designer/lib/src/menus/widget_context_menu.dart:68-75`.
- Group header buttons (Stack icon `NowaIcons.stack` rendered as an asterisk in the editor, right arrow = Row, down arrow = Column, no tooltips), conversion from Stack orders children and derives the gap, **Padding** field with **Individual padding** tooltip, **Test <Type>** / **Edit Test** / **Clear**: `packages/designer/lib/src/details/group_details.dart:44-157,243-298`, `inline_wrapper_fields.dart:8-148`. Screenshot `captures/ui-map/10-screen-selected.png` confirms the three buttons and the Stack fields (**Alignment** X/Y sliders, **Text Direction**, **Fit**, **Clip Behavior**, **Children**, **Padding**).
- Rows/columns settings: **Alignment** 3x3, **Main Axis Size** (enum dropdown `max`/`min`, label derived from `mainAxisSize`), **Spacing** (Fixed/Between/Around/Evenly), **Gap** only when Fixed (min 0), **Children**: `packages/designer/lib/src/details/flex_field.dart:11-52,382-446`. Around/Between/Evenly wording follows Flutter's `MainAxisAlignment` docs.
- Stack child layout (L/T/R/B/W/H fields enabled only when set; constraint dropdowns; constraint box; Shift-click second bar pins both only when the opposite side is already pinned; center + clears pins): `packages/designer/lib/src/details/positioned_details.dart:26-279`.
- Layout section variants by parent (Stack -> Positioned, Row/Column/NFlex/Wrap -> FlexLayout, ListView -> SizedLayout, board item -> BoardPosition; anything else shows an empty section with a + that adds a `SizedBox`): `packages/core/lib/src/layout/layout.dart:52-66`, `packages/designer/lib/src/details/layout_details.dart:15-171`.
- Size modes: **Fixed** / **Expand** (only if `canExpandField`) / **Auto** (only if the widget has an intrinsic size, never for TextField width); dropdown hidden with a single option; Expand along the main axis sets flex 1, across it sets infinity; Scroll View blocks Expand along the scroll direction (any ancestor Scroll View): `packages/designer/lib/src/details/size_fields.dart:5-132,154-227`, `flex_size_field.dart:6-137`.
- Scroll View wrapper name `Scroll View` (`packages/core/lib/src/wrappers_to_add.dart:56-60`); widget picker names **Wrap**, **List View**, **Grid View**, **Page View** (`widgets_to_add.dart`).

Left out / assumptions:
- "Plain box first in the selection becomes the group's background" (`common_design.dart:_firstIsBg`): condition depends on selection order; not stated.
- **Expand** inside **Wrap** is listed because `Wrap` uses `FlexLayout`; behavior inside Wrap not verified in the running app.
- "Main Axis Size" semantics (`max` fills / `min` shrinks) is Flutter's `MainAxisSize` meaning; not tested in the editor.
- Link to `../reference/widgets/index.md` assumes W13 creates that page (pages.md lists `widgets/index.md`).

Capture requests: design-layout-1, design-layout-2.


## properties.md (`docs/design/properties.md`) (batch W4b)

Research: `features-widgets.md` "Add Wrapper", "Details panel (properties)", "Field editors in Details", "Link a property (link menu)", "Reset to default / Set to null", Wrappers table; `features-logic.md` "Link <field> menu", "Events", "Visibility wrapper", "Reset to default / Set to null"; `features-designer-core.md` "Add Wrapper (wrap and unwrap)", "Selecting". Written after reading the W4a pages `layout.md`, `select-and-edit.md`, `themes.md`, `theme-styles.md`, and `logic/expressions.md`, `logic/events.md` (link menu is documented in depth there, so the page only introduces it and links `expressions.md#link-menu`).

Code spot-checks (all matched the research unless noted):
- Panel position, resizing, collapse: `packages/designer/lib/src/designer_setup.dart:166-232` (Details under Variables, 240 px start, left-edge resize, not built in code mode or under 600 px), `packages/core/lib/src/panels/nowa_expanded_tile.dart:48-98` (title bar toggles), `packages/core/lib/src/panels/details/details_panel.dart:52-77`.
- Section order: `packages/designer/lib/src/details/widget_details.dart:160-200` (breadcrumbs, name, doc summary, **Kept as code** box, Layout, component field, base widget field, one section per wrapper, **Add Wrapper**). Name row: `name_group.dart:15-35,81-111` (**Widget x N**, **Create a component**, **Rename**, **Open in New Tab**, shown only when the file isn't already open). Breadcrumbs: `widget_details.dart:327-370`. **Kept as code**: `widget_details.dart:116-139,543-564`.
- Several widgets selected: `BatchBlockField` applies every update to all (`packages/core/lib/src/fields/block_field.dart:478-600`), **Mixed** text (`:1285-1294`), **Add Wrapper** hidden unless exactly one widget (`widget_details.dart:140-143`).
- Text section labels: `packages/designer/lib/src/details/widget_fields.dart:262-312` (**Text**, **Text Align**, **Text Direction**, **Overflow**, **Style**).
- Editors: text (hint `null`, `$` opens the link menu, grows to several lines for Text) `packages/core/lib/src/fields/basic_fields.dart:53-180`, `widget_fields.dart:300-306`; number boxes (hint `-`, min 0 for padding) `basic_fields.dart:182-288`; **number drag zone**: a 7 px strip on the left edge of every number box changes the value by the horizontal drag (`packages/core/lib/src/fields/nowa_fields.dart:275-292`; ints round `:325`, doubles round to 0.1 `:383`); switch `basic_fields.dart:378-398`; color swatch + HEX + opacity `packages/core/lib/src/fields/color_fields.dart:440-565`, Container fill popup with Solid/Linear/Radial/Sweep `color_fields.dart:313-440`; padding (fields are shown as icons, **Individual padding** tooltip) `basic_fields.dart:744-870`; alignment sliders **X** and **Y**, -1 to 1 `basic_fields.dart:1543-1580`; enum dropdown `basic_fields.dart:1510-1540`; event **+** / bolt **Edit** `nowa_fields.dart:793-825`; widget slot button + brush "Edit <name>" `nowa_fields.dart:420-520`; list editor (length box, hover **+**, drag handle, **Load More** after 10) `packages/core/lib/src/fields/list_field.dart:8-210`; object fields (hover **+** / remove, arrow) `packages/core/lib/src/fields/class_field.dart:100-330`, `block_field.dart:1161-1205`; **Show advanced options** / **Hide advanced options** `block_field.dart:1318-1352`; tooltip on the name (type + label, 500 ms) `block_field.dart:998-1010`.
- Link: clicking the name opens the menu (`block_field.dart:990-1030`), menu title and items `packages/core/lib/src/fields/field_link_menu.dart:317-404`.
- Reset / Set to null: right-click menu on every field row, **Set to null** only for nullable types `block_field.dart:812-842`; `remove()` restores a starter value for required properties (`:257-280`).
- Add Wrapper: palette hint **Search for a wrapper**, 32 entries (`grep -c "WrapperData("` gives 33 because the class constructor matches) `widget_details.dart:66-113`, `packages/core/lib/src/wrappers_to_add.dart:12-188`; new wrapper is added as the outermost (`designer_model.dart:472-503`, `widgets.last` is the top, `widgets.first` the base); section order `block_field.dart:791-806`; drag grip, **...** menu and **Remove** `class_field.dart:344-446`, reorder drop line `packages/designer/lib/src/details/wrapper_details.dart:8-109`; Padding default 8 / 8 `wrappers_to_add.dart:13-26`; button hidden when `canWrapWidget` is false `widget_blocks.dart:356-372`.

Contradictions with research (code wins):
- `features-widgets.md` calls the Container's color field **Fill**. No "Fill" string exists in the code; the label is derived from the `color` slot (`block_field.dart:213-225`), so it is **Color**. The page names no Container-specific labels.
- Research lists the Padding boxes as "Horizontal / Vertical". In the editor the two fields are labelled with icons (`NowaPaddingIcons`), not words, so the page says "two boxes, for horizontal and vertical space".
- `DraggableText` (a scrub label) exists but nothing uses it (`block_field.dart:1207`). The real scrub zone is the number box's left edge (documented).

Left out and why:
- The **Layout** wrapper always stays outermost; new wrappers are inserted inside it (`designer_model.dart:472-486`). Not stated (consequence for sizes not tested).
- A Group's first **Padding** wrapper is drawn inside the Group's own **Padding** row (`block_field.dart:791-806`): covered on `layout.md`.
- The **...** menu on class fields and wrapper headers also switches constructors (for example `Text.rich`) and offers "Open in new tab" for your own widgets (`class_field.dart:280-340`). Advanced; not covered.
- `canWrapWidget` hides **Add Wrapper** in some slots beyond multi-selection (research open question 14). The page only states the multi-selection case.
- A component's root, opened on its own, also shows a "component field" section above the widget's own (`widget_details.dart:183-185`). Not described.
- Theme popup resets (text style refresh icon) belong to `theme-styles.md` / `themes.md`.

Assumptions and open questions:
- "Type a value, then press Enter or click away": values update live as you type (`onChanged`) and the undo step closes on blur (`nowa_fields.dart:222-231,267`, `basic_fields.dart:119-135`). Enter unfocusing the field was not tested in the app.
- The **Kept as code** sentence says Nowa "shows a placeholder", based on the code comment at `widget_details.dart:116-121`; it links to `../code/limitations.md` (W9b).
- Examples in "Add a wrapper" (Padding, Visibility, Gesture Detector, Scroll View) link to the wrapper anchors promised in `redirects.md` (`padding`, `visibility`, `gesture-detector`, `scrollview`). Their one-liners are plain restatements; W13a owns the wrapper wording.
- Order explanation ("With Padding below Container, the space is outside the container's color") follows from the section order above; not rendered in the app.

Coverage notes (not in `pages.md`): number-box drag zone; **Kept as code** box; **Mixed** and multi-edit; **Show advanced options**; name tooltip. Anchor `{#add-a-wrapper}` is required by `design/localization.md` (link `properties.md#add-a-wrapper`).

Capture requests: design-properties-1, design-properties-2.
