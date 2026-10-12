# P14-B05 notes (design: responsive, outline, themes, theme-styles, assets, fonts-icons, templates, localization)

Code refs are `path:line` in `/home/user/nowa-master` (3.13.0, `3cb32031c`). Flutter refs are in the local SDK
`/home/user/flutter/packages/flutter/lib/src/material/` (the SDK on this machine; Material 3 is the default there,
`theme_data.dart:413`, so new Nowa projects, whose themes don't set `useMaterial3`, get Material 3 behavior). The matching
official pages are on api.flutter.dev (confirmed by web search; fetching that host directly fails in this environment).
Coverage audit: `P14-B05-coverage.md`. Moved facts: `P14-B05-for-code.md`.

Tone: R9 (warm, conversational, explained) arrived while I was still reading; every page below was written with it.

## design/themes.md

What changed for the reader
- Intro and section intros rewritten (R9): what a theme is ("your app's style guide"), why set it early, why you'd add a
  second theme, what happens after each step.
- Moved to for-code (`#themes`, copied unchanged): the `ThemeData` / `lib/globals/themes.dart` paragraph; `ColorScheme.fromSeed`
  in the note; where the active theme is saved (`lib/globals/app_state.dart`); the `ThemeData(...)` condition for **Default
  Font**; the extension-tab rules for `ThemeData(...)` / function / `copyWith` themes and `AppColors.primary`; the file paths
  of **Create Theme Setup**. One link to `../code/generated-code.md#themes`, after **Open in New Tab**.
- Kept as UI text and explained (R3): `lightTheme` / `darkTheme` (names shown in the panel), **HEX** (a six-character color
  code), "on" colors, `AppColors` (an extension tab name), `AppState` (shown in Circuit's **GLOBALS**).
- Plain-word consequences instead of code: "Nowa saves your choice with the project"; "If you don't see **Default Font**, the
  theme was set up in code in a different way, as can happen in an imported project"; "A theme that your project's code
  builds in another way, for example from another theme, shows only its extension tabs".
- R5: extensions can't be created in the panel, so the page now leads with a Nowa AI **Agent** prompt and says how to check
  (open **Themes**, look for the tab). The closing tip now says to check the result in **Themes** and on the board.

Added from the old docs (see coverage)
- "What each color is for" table (old colors page listed each role). Flutter docs: `color_scheme.dart:1037-1045` (primary,
  onPrimary), `:1085-1094` (secondary), `:1136-1139` (tertiary), `:1188-1190` (error, "input validation errors"),
  `:1214-1222` (surface, "background color for widgets like Scaffold"), `:1303-1304` (shadow); usage examples (FAB,
  prominent buttons, active states) from https://api.flutter.dev/flutter/material/ColorScheme-class.html. Old
  **Background** / **On Background** are not offered: `packages/core/lib/src/panels/details/theme_panel/models.dart:42`.
  The "Enter a valid email" text is a made-up example of an error message, in quotes.
- Unchanged colors follow light/dark, edited ones stay: `packages/core/lib/src/panels/details/theme_panel/theme_panel_fields.dart:111-127`
  (Fixed: `changeConstructor` between `ColorScheme.light` and `.dark`, overridden role arguments kept; Seed: only
  `brightness` changes, overrides kept). "Check that they still read well" is advice.
- "What each text style group is for" table (old typography page: styles give a hierarchy). Flutter
  `text_theme.dart:139-155` (display), `:157-173` (headline), `:175-191` (title), `:193-203` (body; `bodyMedium` is "the
  default text style for Material"), `:210-230` (label; `labelLarge` "used for text on ElevatedButton, TextButton and
  OutlinedButton"); https://api.flutter.dev/flutter/material/TextTheme-class.html. Nowa's **Button** is an
  `ElevatedButton` (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:233`). The examples (a price, a screen's main
  heading, a card's title) are mine.
- New widgets start with the theme's look (old colors page): a new Text from the **Text** tool is `Text('Write something')`
  with no style (`packages/core/lib/src/widgets_to_add/default_blocks.dart:318`, `packages/designer/lib/src/widgets/designer_tools.dart:93-94`);
  Button, Icon Button, Floating Button and Icon have no color or style (`widgets_to_add.dart:184,233,243,254`; `createTextBlock`
  sets a style only with a font size, `default_blocks.dart:320-330`); the **Shape** tool's Container has `Color(0xFFC4C4C4)`
  (`default_blocks.dart:8-13`, tool name `designer_tools.dart:140-149`). Templates with fixed colors: already on
  templates.md and guides/design-tips.md.

Other new or changed claims
- "The theme your app uses opens for editing": `themes_panel.dart:51-53` (`_selectAppliedTheme` opens the last selected
  theme, else the applied one; they differ only right after **Create New Theme**).
- "If the board doesn't seem to show a change, click **Refresh**": **Refresh** calls `evalEnv()` (`themes_panel.dart:186-191`).
- `lightTheme` "for a light look", `darkTheme` "for a dark one": `packages/core/lib/src/file_system/templates/common/themes_dart_template.dart`
  (`ColorScheme.light()` / `ColorScheme.dark()`).
- Undo/redo keys need the panel to have focus: `themes_panel.dart:156-166` (panel's own `UndoAction` and shortcuts).
- Note: no promise that the purple palette can be undone: `_setupColorScheme` updates the field without recording an undo
  step (`theme_panel_fields.dart:39-46`).
- `holidayTheme` is a valid name (`packages/core/lib/src/file_system/naming.dart:36-59`).
- Rename "so nothing breaks": references are renamed (`DeclGen.rename`, W4 notes `declaration_generator.dart:27-60`).
- **Primary Container** "for parts that need less emphasis than Primary" (`color_scheme.dart:1049`), **Outline** "borders"
  (`:1292`, "creates boundaries"). Reset icon clears the role and its "on" color: `theme_panel_fields.dart:463-471`.
- **Mode** switch "carries your main color over" (was "keeps your look", which overstated it: the rest of the palette does
  change): `theme_panel_fields.dart:69-101`.
- Scheme variants table: Flutter `color_scheme.dart:30-62` (descriptions), `:312` (`tonalSpot` is the default when none is
  passed); https://api.flutter.dev/flutter/material/DynamicSchemeVariant.html. Labels: `theme_panel_fields.dart:214-229`
  with `camelCaseToSpaces` (`packages/core/lib/src/utils.dart:77-79`).
- "Safe to experiment ... undo": the variant change is recorded (`theme_panel_fields.dart:103-110`, `context.tryRecord`).
- **Default Font** "every style uses it unless you give the style a font of its own": Flutter `ThemeData.fontFamily`
  applies to text theme styles without their own family. Missing **Default Font**: shown only for the plain `ThemeData(`
  constructor (`packages/core/lib/src/fields/text_fields.dart:858-869`), while the Colors/Typography/Widgets editor shows for
  any `ThemeData` constructor (`theme_panel_details.dart:97-104`), so **Font Family** per style is still there.
- Button field explanations (Foreground = text and icon color, Elevation, Side = border, Radius = corner radius):
  `packages/core/lib/src/fields/button_fields.dart:323-373` (`side` is a `BorderSide`; **Radius** edits the shape's
  `borderRadius`).
- "New buttons follow these styles from the start" replaces "Buttons pick up the theme once you connect them", which read
  as if buttons needed connecting (they don't: no style on new buttons, `widgets_to_add.dart:233,243`; theme-styles.md).
- Extension limit "up to 8": `packages/core/lib/src/themes/theme_class_instance.dart:21-34`.
- **Create Theme Setup** "A dialog lists the files Nowa will add" (`theme_setup_view.dart:55-62`); adds both, skips existing
  (`packages/core/lib/src/project_environment/env_manager.dart:155-180`).
- AI prompt for an extension: the agent can create and edit any project file (`research/features-ai.md`, "What the agent can
  do"). Not verified live that the result shows as a tab.

Open questions
- Length: ~2,120 words of prose (2,300 with image alt text and front matter). If it must shrink, split into "Create and
  manage themes" (open, create, apply, rename/delete, extensions, theme setup) and "Theme colors and text styles" (colors,
  roles table, brightness/mode/variants, text styles, widget styles, widgets that keep their own color). Not split.
- The AI extension prompt was not tried (no prompts allowed). Does the agent's extension show up as a tab every time?

## design/theme-styles.md

What changed for the reader
- Intro rewritten around why linking matters (R9). Section intros give a reason and an everyday example (a soft tint behind
  a badge, a crossed-out old price, a red Delete button).
- Moved to for-code (`#themes`): the code an extension color writes (`AppColors.of(context).brand` /
  `Theme.of(context).extension<AppColors>()!.brand`); the folder the Figma import writes to (`lib/globals/`). One link to
  `../code/generated-code.md#themes`, in "Colors from theme extensions".
- Kept as UI text and explained (R3): role names as fields show them (`onPrimary` = On Primary), `bodyMedium` (the default
  for text), **CopyWith** (copies the theme style so you can change parts), `AppState` (a global state: data and functions
  every screen can use), `changeTheme` (one of its functions), **On Pressed** (the tap event), Circuit (the visual logic
  editor), the old "withOpacity is now deperecated use withValues instead" note (quoted with its typo).
- "Make a theme color transparent" is now three numbered steps.
- R5: remembering the chosen theme needs logic the starter doesn't have, so the page offers a Nowa AI **Agent** prompt and
  how to check it (switch, close, reopen). Figma import gets an example prompt and "look at the board and the Themes
  panel". The closing tip says how to check (color fields show `secondary`).

Added from the old docs (see coverage)
- **CopyWith** example "click the strikethrough button under **Decoration**" (old typography page's strikethrough example):
  **Decoration** is a row of icon buttons none / strikethrough / underline / overline (`packages/core/lib/src/fields/text_fields.dart:304-333`).
  "If you make the style bigger in the theme later, this text grows with it": a `copyWith` keeps the theme reference
  (`text_fields.dart:181-205`).
- The old "With Opacity" label: older projects' `withOpacity` values show the note and **Update**, which converts to
  `withValues(alpha: ...)` (same look): `packages/core/lib/src/fields/color_fields.dart:243-266`.

Other new or changed claims
- "written the way a field shows them, so On Primary appears as `onPrimary`": the picker lists raw role names
  (`color_fields.dart:25-83`, W4 notes); the panel tiles use `camelCaseToSpaces` (`packages/core/lib/src/panels/details/theme_panel/theme_panel_fields.dart`
  `ColorRoleTile` labels at `:328-341`).
- Extension tab "named after the set, such as `AppColors`": tab label is the class name (`color_fields.dart:810-890`,
  W30b notes). Opening tab simplified to "the tab of the color the field uses; a field that isn't linked yet opens on your
  first extension" (`_tabOf`, `color_fields.dart:886-891`); the dropped clause (Material when linked to a Material role) is
  a case of "the tab of the color the field uses".
- **With values**: wraps the theme reference in `withValues(alpha: 0.5)`, so the widget stays linked and starts at 0.5
  (`color_fields.dart:296-310`); **Show more** = `AdvancedOptions(message: 'more')` (`color_fields.dart:280-292`).
- "The widget keeps the color it has now, as a fixed color": the x writes the current value (`color_fields.dart:520-531`,
  W4 notes).
- `bodyMedium` "the default for text": Text **Style** shows the default style (`packages/designer/lib/src/details/widget_fields.dart:266-310`,
  W4 notes) and Flutter's `bodyMedium` is "the default text style for Material" (`text_theme.dart:202`).
- The x on a style "starts empty, so set the fields you need, such as **Font Size** and **Color**": `TextStyle()` replaces
  the style (`packages/core/lib/src/fields/style_fields/style_fields.dart:162`, W4 notes). I did not claim theme changes stop
  reaching it: an empty style still merges with the default text style.
- "Each time your app opens, it starts in the **Active** theme again": applying a theme sets the starting value of
  `_theme` in `AppState` (`packages/core/lib/src/project/env_services/theme_service.dart:115-145`), and the starter saves
  nothing (`packages/core/lib/src/file_system/templates/common/app_state_template.dart:28-35`).
- "To switch back, give a second button `lightTheme`": same steps with another theme (W4 recipe).
- Figma in **Agent** mode: connectors work in Agent mode (glossary). Cloud projects write `lib/globals/app_colors.dart` /
  `app_text.dart` and reimport `themes.dart` (`packages/ai/lib/src/mcp/figma_mcp.dart:73-86`); local projects import the
  files at the paths the server returns (`:88-97`).

Open questions
- Unchanged from W4: does Instant Play (**Play**) show a `changeTheme` switch on the board? The page says **Run**.
- The persistence prompt was not tried (no prompts allowed).

## design/assets.md

What changed for the reader
- Intro says what assets are, with everyday examples, and why you'd use them (they ship with the app, so they show
  offline, unlike a web picture). Flutter bundles every file of a registered asset folder into the app; Nowa registers
  every non-empty folder under `assets/` (`packages/core/lib/src/settings/pubspec_manager.dart:127-132,205-235`, W4 notes).
- Moved to for-code (`#assets`): how `pubspec.yaml` is updated on import; the `assets/` paths in the upload, picker and paste
  steps. Plain words instead: "your assets", "the folder inside them that you clicked last", "added to your assets", "a
  file whose name starts with `pasted_image_`". Folder names the Library shows (`fonts`) stay. One link to
  `../code/generated-code.md#assets`.
- "There's nothing else to set up. Nowa registers your files with your app as soon as you import them" replaces the
  `pubspec.yaml` paragraph (imports call `PubspecManager.refresh()`: `packages/core/lib/src/providers/project_provider.dart`
  `upload` / `importInDir`, W4 notes). Said under the **Upload Assets...** steps only (property uploads don't refresh it
  themselves, W4 open question).
- R3: SVG explained ("images that stay sharp at any size"); the **Network** and **Bytes** tabs explained (`NetworkImage` /
  `MemoryImage`: `packages/core/lib/src/fields/basic_fields.dart:912-931`); the audio note referred to as "the note under
  the audio source" (`basic_fields.dart:1127`, "Asset file will work only on Android and iOS").
- R9: the paste section says why (quickest way) and gives examples (a website, a design tool); the clipboard-permission
  sentence (verified in P12-live-checks, same wording as responsive.md and add-widgets.md) is now here too.

Added from the old docs (see coverage)
- Naming tip (old assets page): short, clear names; you find them faster (Library rows and picker entries show the file
  name: `packages/core/lib/src/library/library_service.dart:331-339`; pickers search by name, `packages/core/lib/src/fields/asset_fields.dart:101,187`),
  and renaming later means re-picking the file (asset paths are not rewritten on rename: `packages/core/lib/src/file_system/nfile_impl.dart:102-128`,
  P10-b-review row "Rename").

Other new or changed claims
- "A new Image widget starts with a sample picture from the web": the Library's Image is `Image(image: NetworkImage(<sample
  url>), fit: cover)` (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart` imageWidgets, `default_blocks.dart:134-142`).
- "the widget shows it right away" after picking: the pick updates the field (`asset_fields.dart:211`).
- "Images you drop on the Nowa AI chat are attached to your message instead": `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:111-113,133-136,255`
  (dropped files go through the image check; anything else is ignored). Dropping on the board still does nothing:
  `lib/project/drop_from_outside.dart:8` is never instantiated (grep finds no use).
- "every paste adds a new one" (`packages/designer/lib/src/design/copy_paste.dart:110-118`, P12-fixes-2) and "Unused files still
  ship with your app and make it bigger" (all files in registered folders are bundled; see the first bullet).
- **Copy as path** "(copies where the file is stored)": `lib/project/panels/files_panel/files_tree_host.dart:469-470`
  (`file.path`). I did not describe the format, which depends on the project type.
- Tip: "Nowa AI can save it to your assets for you" (`packages/ai/lib/src/tools/save_attached_image_tool.dart:10-38`) and how
  to check (look at the login screen on the board).

Open questions
- Unchanged from W4: is a file uploaded only through a widget property (**Upload Image**) registered for the build when it
  is the first file in `assets/`? (`asset_fields.dart:119-136` doesn't refresh the pubspec.)

## design/fonts-icons.md

What changed for the reader
- Intro says why fonts and icons matter (R9). Steps carry what you'll see (fonts shown in their own typeface; any icon whose
  name contains your word).
- Moved to for-code (`#fonts-and-icons`): the download path `assets/fonts/<Font Name>.ttf` and `pubspec.yaml`
  registration; the import path and registration; the whole "Declare fonts yourself" section (pubspec `fonts:`
  declarations, family names vs file names, the `google_fonts` package). One link to
  `../code/generated-code.md#fonts-and-icons`, after the filter section ("Working in the code, for example with font families
  made of several files?").
- Plain words instead: "Nowa downloads it into your project and sets it up for your app"; "You'll find the file in your
  assets, in the `fonts` folder, named after the font" (the Library shows that folder: `packages/core/lib/src/library/library_service.dart:324-339`).
- R3/R4: semantic label explained (what screen readers say); Material Icons named as Google's icon set.

Other new or changed claims
- Fonts shown in their own typeface: list tiles use `GoogleFonts.getFont(name)` or the family (`packages/core/lib/src/fields/text_fields.dart:787-791`).
- "so your app shows it on every device, whatever fonts a phone has installed": the font is bundled as an asset and
  declared for the app (`text_fields.dart:16-55`, `pubspec_manager.dart:165-203`, W4 notes).
- The popup's Google Fonts suggestion: "We recommend checking the fonts on Google Fonts" with a link (`text_fields.dart:612`, W4 notes).
- Import "That's why it's worth giving font files clear names": family = file name without extension
  (`packages/core/lib/src/file_system/file_object.dart:469-498`, W4 notes).
- Web list sizes unchanged (`text_fields.dart:521,542-547`), phrased as a "can't find a font?" hint.
- Icon search is a case-insensitive "name contains" match (`packages/core/lib/src/fields/icon_field.dart:141`); the picker
  lists every `IconData` of the `Icons` class (`icon_field.dart:27-31`), which includes `_outlined` and `_rounded`
  variants (`home`, `home_outlined`, `home_rounded` are Flutter `Icons` members). "Picking one style ... keeps it looking
  tidy" is design advice.
- "With the Figma connection on, Nowa AI can also bring icons in from your Figma file as SVG files":
  `packages/ai/lib/src/mcp/figma_mcp.dart:32-34` (`export_svg_flutter_assets` hook), research/features-ai.md "Figma MCP".
- "A new icon has no color of its own, so it follows your theme": `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:184`
  (`createIcon(..., color: null)`).
- Tip: how to check added (select a headline, look at its font in **Details**). The AI font download:
  `packages/ai/lib/src/tools/download_font_tool.dart:4-27`.

## design/templates.md

What changed for the reader
- Intro adds the second reason to use templates (see how a polished screen is put together), restored from the old page.
- Moved to for-code: where single-file templates are saved (`lib/pages/` for screens, `lib/components/` for components),
  under `#screens-and-routes` and `#components`. The dialog's **Class name** and **Path** stay (the reader sees them), with
  "you can leave them as they are".
- R3/R4: GoRouter (a label the Router panel and Circuit show) explained as "the way new projects move between screens";
  route explained ("the address other screens use to open it"); home screen explained ("the one your app opens on").
- The fixed-colors advice moved into a new short section, "Make a template yours", so it isn't said twice.

Added from the old docs (see coverage)
- "Learn from it" bullet (old tip: templates are a good way to learn how screens are built): advice, using the Outline.

Other new or changed claims
- **Components** "for smaller building blocks, such as an audio player": the **Audio Player** component template
  (`packages/core/lib/src/services/templates/templates_service.dart:383`).
- **Google Button** "is a "Continue with Google" button. It's the look only": its source has an `InkWell` with no `onTap`
  and the text 'Continue with Google' (`packages/core/lib/src/services/templates/built_in/google_button.dart:3-60`). Link to
  `../integrations/google-sign-in.md`.
- "listed under **Files in** and the template's name": `packages/core/lib/src/file_system/widgets/template_widgets/template_files_list.dart:107`.
- The tooltip quoted: `add_template_dialog.dart:187`.
- "its other files are in your project, ready to use": only screens are placed on the board, all ticked files are imported
  (`packages/designer/lib/src/actions/add_template_designer.dart:7-37`, W4 notes).
- Overwrite confirmation "so you won't replace your own work by accident": the dialog asks before overwriting (W4 notes,
  `template_files_list.dart:100-270`).
- "before you link to it from other screens": a screen with no route can't be opened by path (router.md).
- Tip: "It builds the screen for you, and you can check and restyle it on the board" (the agent creates screens:
  research/features-ai.md).

## design/localization.md

What changed for the reader
- Moved to for-code (`#localization`): Nowa AI's refusal of the `flutter_localizations` package; how an SDK entry for
  `flutter_localizations` in `pubspec.yaml` counts as installed. One link to `../code/generated-code.md#localization`.
- R5: the page now walks through the no-code path as steps: ask in **Agent** mode, check the board and **Problems**, ask
  for a language switcher and check with **Run**, ask Nowa AI to fix a wrong word. None of this promises what the agent
  writes (the prompts are server-side; the client only shows the package refusal).
- The "Could not load" log line is kept as UI text and explained (R3): "followed by a name (the part of your app that loads
  the translations) and the error", plus what to do (paste it to Nowa AI) and where **Logs** is (`../test/run.md#read-the-logs`).
- RTL: `rtl` / `ltr` explained; "rows included" now says what you'll see ("the first widget in a row moves to the right").
- New tip: ask Nowa AI to show the Arabic version right to left, and check on the board and with **Run**.

Other new or changed claims
- "the board can show them": unchanged claim (the board honors `locale`, `localizationsDelegates` and `supportedLocales`
  of the app's `MaterialApp`: `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:138-160`; project
  delegates are interpreted: `packages/core/lib/src/localization/localizations_class_instance.dart`).
- "If your translations can't load on the board, the board still draws your screens": `localizations_class_instance.dart:33-44`
  (`logError('Could not load ${instance.type?.name}: $e')`, returns null).
- "the first widget in a row moves to the right": Flutter `Row` resolves its start side from the ambient `Directionality`
  (the **Text Direction** wrapper is `Directionality`: `packages/core/lib/src/wrappers_to_add.dart:115-119`, W4 notes). Not
  tried on the board (W4 open point, unchanged).
- Font coverage advice: general; Google Fonts linked without naming a filter (I couldn't confirm a filter label from an
  official page; web search found only third-party mentions).

Open questions
- The prompts (languages, switcher, RTL) were not tried. Does the agent's localization flip the layout for Arabic by
  itself? Without `flutter_localizations` (refused by the package tool) Flutter's default widgets localizations are
  left-to-right, so the page keeps the manual **Text Direction** steps.

## design/responsive.md

What changed for the reader
- No code-only facts on this page, so nothing moved. Changes are R4, R5, R8 and R9.
- R4: "breakpoints" explained ("widths at which a screen swaps to a different layout"); **Max Cross Axis Extent**
  explained ("without a tile getting wider than"); variable and param explained in the placeholders section (R8);
  **Test String** given an everyday case ("for a list of texts", "one card per recipe").
- R5: "Show different widgets on wide and narrow screens" now leads with a Nowa AI **Agent** prompt and how to check it
  (change **Size**, **Play** at each size), then a visual way through menus (Visibility → **Logical** expression →
  **Media Query** → `size` → `width`), and keeps the typed formula only as an option for people comfortable typing one.
- R9: intro, "Try it" lead-in, a reassurance that **Size** is safe to change ("only changes how big the screen looks on the
  board"), and a reason to test with long content (a two-line product name, 30 orders).

New or changed claims
- Visual width condition (new steps 3-7):
  - **Visible** link menu has **EXPRESSIONS** → **Logical** for a true/false property (logic/expressions.md "Calculate and
    compare", verified by B06/W5; popup code `packages/core/lib/src/fields/expression_builder/expression_details.dart:245-326`:
    **Operator**, **Type**, **Left side**, **Right side**; changing **Type** resets both sides, `:304-311`).
  - Comparisons are offered under **Logical**: `isLogical` covers `greaterThan`, `smallerThan`, `greaterThanOrEqual`,
    `smallerThanOrEqual` (`packages/core/lib/src/interpreter/block_tree.dart:2386-2430`).
  - **Type** can be `double`: basic types are String, int, double, bool, Color, Widget (`packages/core/lib/src/fields/nowa_fields.dart:686`).
  - Outside Circuit a field's link menu shows **Locals**, **Globals** and **Expressions** (`packages/core/lib/src/interpreter/suggestion.dart:467-474`);
    **Globals** includes **Media Query** = `MediaQuery.of(context)` (`packages/core/lib/src/state_management/global_state_suggestions.dart:60-64`).
  - Picking a value of another type shows its members (logic/expressions.md, "If you pick a value of another type...");
    `size` → `width` verified in Circuit by W5-review row "Media Query under GLOBALS, members size > width".
  - NOT run in the app (no live session here): the full chain inside the **Logical** popup. Flag for a live check.
- Typed formula kept unchanged as the alternative (W4: syntax per expressions.md; not run in the app).
- "The test changes only the board, never your app": same basis as before (`packages/designer/lib/src/details/group_details.dart:160-292`,
  state in `RenderInfo.customScope`, W4 notes).

Open questions
- Live check wanted: Visibility → **Logical** (`greaterThanOrEqual`, `double`) → **Left side** → **GLOBALS** → **Media
  Query** → `size` → `width`, **Right side** 600; does **Play** at **1920x1080** and at **iPhone 12** show the right
  version? Same for the typed formula (W4 open point).

## design/outline.md

What changed for the reader
- No code-only facts on this page, so nothing moved. Changes are R4, R8 and R9.
- Explained in the tree table: home screen ("the one your app opens on"), component ("a reusable widget you built"),
  wrappers ("add spacing, scrolling and similar extras around it"), a repeat row's everyday case ("one card per product").
  A one-line lead-in says rows nest the way widgets do.
- The condition section now starts from a situation the reader knows (a loading spinner, then the list) instead of
  "an if/else or a switch in your logic", and says how such a condition arises in Nowa (a **Conditional**, or conditions
  in screens Nowa AI builds). It adds that flipping branches is safe (not saved).

Added from the old docs (see coverage)
- The right-click menu's main entries named in the Outline section (old page listed remove, duplicate, group/ungroup,
  make a component): **Remove**, **Replace with...**, **Group** / **Ungroup**, **Copy** / **Cut**, the stacking order
  entries, **Create component** (`packages/designer/lib/src/menus/widget_context_menu.dart:9-56`; the Outline calls the same
  `widgetMenuEntries`, `packages/designer/lib/src/panels/outline_panel.dart:196`). There is no
  "Duplicate"; link to the full table at `select-and-edit.md#use-the-right-click-menu`.

Other new or changed claims
- "Orange home icon on the right": the home icon is a trailing icon in the row (`packages/nowa_ui/lib/outline/outline_view.dart:237-246`).
- Condition rows come from an `if`, a `?:` or a `switch` whose branches produce widgets (`packages/core/lib/src/interpreter/widget/model_node.dart:48-62`);
  the **Conditional** expression writes a `?:` (logic/expressions.md#conditional). Repeat rows: a collection `for` or a
  `.map(...).toList()` producing widgets (`model_node.dart:36-46`).
- Branch eye tooltips unchanged (`outline_view.dart:304-310`).
- Reorder "handy when the board is crowded": advice.
