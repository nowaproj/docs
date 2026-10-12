# P14-B05 coverage: old design pages (outline, templates, themes, assets)

Batch pages: `docs/design/` `responsive`, `outline`, `themes`, `theme-styles`, `assets`, `fonts-icons`, `templates`,
`localization`. Old pages: `_rewrite/old-docs/ui/outline.md`, `ui/temlpates.mdx`, `ui/themes/colors-themes.md`,
`ui/themes/create-themes.md`, `ui/themes/typograhies.md`, `ui/assets.md`.

Code refs are `path:line` in `/home/user/nowa-master` (3.13.0, `3cb32031c`). Flutter refs are in the local SDK
(`/home/user/flutter`, `packages/flutter/lib/src/material/...`); the matching official pages are on api.flutter.dev
(confirmed by web search; direct fetch of that host fails in this environment).

Statuses: `covered` (page#section) / `added` (page#section) / `obsolete` (code ref) / `not useful` / `dev-only` /
`for other page` (target).

## ui/outline.md (redirects to `/design/outline`)

| item | status | where / evidence | note |
|---|---|---|---|
| The Outline shows the whole structure of a screen as a tree | covered | outline.md intro | |
| Where it is: top-left corner of the design board | covered | outline.md#open-the-outline | 3.13: a floating **Outline** box at the top left when a screen or component is open on its own; the sidebar **Outline** icon on a board (W30a notes, `packages/designer/lib/src/panels/outline_panel.dart`) |
| Lists every widget, nested "like in Flutter code" | covered | outline.md#read-the-tree | the "like code" comparison is dropped (not for this reader) |
| Find things in complex layouts without scrolling the board | covered | outline.md intro | |
| Rows, columns, texts, buttons, grids appear in order, showing nesting | covered | outline.md#read-the-tree | |
| A home icon marks the home screen (old text: yellow) | covered | outline.md#read-the-tree ("Orange home icon") | color is the editor's primary orange: `packages/nowa_ui/lib/outline/outline_view.dart:242`, `packages/nowa_ui/lib/src/globals/nowa_colors.dart:3` (`0xFFFFAB3F`) |
| Purple items are components | covered | outline.md#read-the-tree | `outline_view.dart:211-215` (`premiumColor`), `nowa_colors.dart:40` (`0xFFE28BFF`) |
| Expand or collapse rows to see what's inside | covered | outline.md#read-the-tree (chevron) | |
| Double-click a row to center the widget on the board | covered | outline.md#select-find-and-zoom | `outline_view.dart:235` |
| Right-click: remove, duplicate, group/ungroup, make a component, other quick actions | added | outline.md#select-find-and-zoom (the menu's main entries named, link to the full table) | `packages/designer/lib/src/menus/widget_context_menu.dart:9-56` (same menu as the board, `outline_panel.dart` calls `widgetMenuEntries`). There is no "Duplicate": copy and paste instead |
| Video | not useful | media | |
| "Benefits for designers" (code-like overview, fewer mistakes, faster edits, collaboration) | not useful | marketing filler | |

## ui/temlpates.mdx (redirects to `/design/templates`)

| item | status | where / evidence | note |
|---|---|---|---|
| Templates are ready-made screens you customize | covered | templates.md intro | |
| Connect them to your logic, change colors, apply your branding | covered | templates.md intro and "Make a template yours" | |
| Kinds: dashboards, music players, article pages and more | covered | templates.md#built-in-templates | `packages/core/lib/src/services/templates/templates_service.dart:371-389` |
| Step: pick the **Screen** tool in the toolbar | covered | templates.md#add-a-template, step 1 | `packages/designer/lib/src/widgets/designer_tools.dart:150-161` |
| Step: scroll through the templates and see their previews | covered | templates.md#add-a-template, step 3 | |
| Step: click the template | covered | templates.md#add-a-template, step 3 | |
| Step: a popup lists the template's files; choose which to import | covered | templates.md#import-a-multi-file-template | `packages/core/lib/src/file_system/widgets/template_widgets/template_files_list.dart:107` |
| Step: click **Import** | covered | templates.md#import-a-multi-file-template | `add_template_dialog.dart:190` |
| Video | not useful | media | |
| Tip: templates are a good way to learn how screens are built; explore them, tweak the layout, connect your data | added | templates.md "Make a template yours" (open the Outline to see how it's put together) | advice; Outline tree: outline.md |

## ui/themes/colors-themes.md (redirects to `/design/theme-styles`)

| item | status | where / evidence | note |
|---|---|---|---|
| "Some info is outdated" warning box | not useful | | |
| A theme gives one consistent color palette for the whole app | covered | themes.md intro | |
| Open `themes.dart` in the `globals` folder, then **Colors** | obsolete | now the **Themes** panel: `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:180`, sidebar shortcut (W4 notes) | covered by themes.md#open-the-themes-panel |
| What each color is for: Primary, On Primary, Secondary, On Secondary, Tertiary, On Tertiary, Error, On Error, Surface, On Surface, Shadow | added | themes.md#edit-colors (new table "What each color is for") | Flutter `color_scheme.dart:1037-1045,1085-1094,1136-1139,1188-1190,1214-1222,1292-1309`; https://api.flutter.dev/flutter/material/ColorScheme-class.html. Roles offered: `models.dart:4-45` |
| Background and On Background roles | obsolete | not offered: `packages/core/lib/src/panels/details/theme_panel/models.dart:42` (deprecated roles skipped) | the table says Surface is the screens' background (Flutter `color_scheme.dart:1214`) |
| **Colors from** menu to load the default Light or Dark colors | obsolete | replaced by **Brightness** (**Light** / **Dark**) and **Mode** (**Fixed** / **Seed**): `theme_panel_fields.dart:170-205` | covered by themes.md#choose-light-or-dark-fixed-or-seed |
| Colors you haven't changed follow light or dark mode; colors you changed stay as you set them | added | themes.md#choose-light-or-dark-fixed-or-seed | Fixed mode swaps `ColorScheme.light` / `ColorScheme.dark` and keeps the overridden roles: `theme_panel_fields.dart:111-127`; Seed mode rebuilds the palette for the new brightness: same lines |
| "Useful for a theme not based on Light or Dark" | not useful | filler | |
| Changing a theme color updates the app right away | covered | themes.md intro | |
| Use a theme color on a widget from its color picker; it follows theme changes | covered | theme-styles.md#use-a-theme-color | |
| Transparent version of a theme color (**With Opacity**) without changing the theme | covered | theme-styles.md#make-a-theme-color-transparent | label is now **With values**: `packages/core/lib/src/fields/color_fields.dart:311` |
| New widgets start with the theme's colors (example: a button) | added | themes.md#widgets-that-keep-their-own-color | texts, buttons and icons are added without their own colors (`packages/core/lib/src/widgets_to_add/default_blocks.dart:318-330`, `widgets_to_add.dart:184,233,243,254`); the **Shape** tool's box gets a fixed light gray (`default_blocks.dart:8-13`, `designer_tools.dart:90-91,140-149`) |
| Closing paragraph | not useful | filler | |

## ui/themes/create-themes.md (redirects to `/design/themes`)

| item | status | where / evidence | note |
|---|---|---|---|
| "Some info is outdated" warning box | not useful | | |
| Themes hold colors, typography and styles | covered | themes.md intro | |
| New projects come with a Light and a Dark theme | covered | themes.md#open-the-themes-panel | `default_bundles.dart:43-70` (`createGoRouterBundle`, used for new projects at `packages/core/lib/src/providers/projects_view_provider.dart:275`), `themes_dart_template.dart` |
| They live in `themes.dart` in the `globals` folder | dev-only | for-code file, `#themes` | |
| Older project: Text → **Style** → **Connect** → **Create** adds the theme setup | covered (updated) | themes.md#add-themes-to-a-project-that-has-none; theme-styles.md#connect-buttons-to-the-theme | 3.13: the **Themes** panel's **Create Theme Setup** button (`themes_panel.dart:146-153`) and a button's **Button Style** (`packages/core/lib/src/fields/button_fields.dart:433-436`). The Text style button no longer opens it (`style_fields/style_fields.dart` has no `ThemeSetupDialog`) |
| Set the default theme: hover a theme, **Set as default** | obsolete | click a theme to make it **Active**: `themes_panel.dart:296-310` (`_setDefault` on tap) | covered by themes.md#apply-a-theme |
| **Create New Theme** | covered | themes.md#create-a-theme | `themes_panel.dart:260-274` |
| Rename or delete a theme with a right-click | covered | themes.md#rename-or-delete-a-theme | `themes_context_menu.dart:12-15` |
| Customize colors and typography per theme | covered | themes.md#edit-colors, #edit-text-styles | |
| Switch theme while the app runs: `changeTheme` in the `AppState` global state, from a button | covered | theme-styles.md#switch-themes-while-the-app-runs | `app_state_template.dart:28-35` |
| Test the app to see the switch | covered | theme-styles.md#switch-themes-while-the-app-runs | |
| Closing paragraph | not useful | filler | |

## ui/themes/typograhies.md (redirects to `/design/theme-styles`)

| item | status | where / evidence | note |
|---|---|---|---|
| "Some info is outdated" warning box | not useful | | |
| Typography = the theme's text styles; text follows theme changes | covered | themes.md#edit-text-styles, theme-styles.md#use-a-theme-text-style | |
| Open `themes.dart` → **Typography** | obsolete | now **Themes** → **Typography**: `theme_panel_details.dart:121-150` | covered by themes.md#edit-text-styles |
| The ready-made styles (Display Large, Title Medium, Headline Small, Body Small, Label Large...) | covered | themes.md#edit-text-styles | 15 styles: `packages/core/lib/src/fields/text_fields.dart:817-833` |
| The styles give text a clear hierarchy (which style for what) | added | themes.md#edit-text-styles (table: what each group is for) | Flutter `text_theme.dart:139-230`; https://api.flutter.dev/flutter/material/TextTheme-class.html |
| Every Text is linked to a style; pick one in **Style** | covered | theme-styles.md#use-a-theme-text-style | |
| Editing a style updates every linked text | covered | theme-styles.md#use-a-theme-text-style, themes.md#edit-text-styles | |
| Edit a style in the theme | covered | themes.md#edit-text-styles | |
| Edit the style from the Text widget: **Style** → **Edit** | covered | theme-styles.md#use-a-theme-text-style, step 3 | |
| **Copy with**: override parts of a style; the rest still follows the theme; example: add a strikethrough | covered (example added) | theme-styles.md#use-a-theme-text-style | label **CopyWith**: `text_fields.dart:181-205`; **Decoration** is a field of the style editor (W4 notes) |
| **Detach Style**: a standalone style for one text | covered | theme-styles.md#use-a-theme-text-style (the **x** on the style button) | `style_fields/style_fields.dart:162` (W4 notes); there is no "Detach Style" label |
| Closing paragraph | not useful | filler | |

## ui/assets.md (redirects to `/design/assets`)

| item | status | where / evidence | note |
|---|---|---|---|
| Assets: fonts, icons, images, videos, sounds | covered | assets.md intro | |
| Find them in the **Files** panel, last section **Assets** | obsolete | 3.13: the Library's **Assets** chip and group (`packages/nowa_ui/lib/library/library_panel.dart:432-437`, `packages/core/lib/src/library/library_service.dart:296-345`); **Files** is code mode only (W30b notes) | covered by assets.md#import-files |
| Import with the **Upload** button | covered | assets.md#import-files | **Add** (+) → **Upload Assets...**, or a folder's **Upload assets...**: `lib/project/panels/library_panel/library_host.dart:160-186` |
| Import by dragging files from your computer onto the board | obsolete | `DropFromOutside` is never instantiated (`lib/project/drop_from_outside.dart:8`); only the AI chat field takes dropped files (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:255`) | the page says dropping files on the board doesn't import them |
| Upload straight from a widget's property in **Details** (Image) | covered | assets.md#use-an-asset-in-a-widget | `packages/core/lib/src/fields/asset_fields.dart:52,175-177` |
| Removing a widget from the board doesn't delete its file | covered | assets.md#rename-remove-and-find-files | |
| Delete a file (screen, component or asset) with a right-click → **Remove** | covered | assets.md#rename-remove-and-find-files (assets); library.md "Open, rename, delete and move" and screens.md "Delete a screen" (screens, components) | label is now **Delete**: `library_host.dart:166-167` |
| Rename with a right-click → **Rename** | covered | assets.md#rename-remove-and-find-files | |
| Tip: keep asset names short and clear (`app_logo.png`, `main_font.ttf`) | added | assets.md#import-files (tip paragraph) | names show as-is in the Library and pickers (`library_service.dart:331-339`); a font's file name becomes its name (`packages/core/lib/src/file_system/file_object.dart:481`, fonts-icons.md) |
| Video | not useful | media | |

## Totals

| Status | Count |
|---|---|
| covered (incl. updated labels and one added example) | 43 |
| added | 7 |
| obsolete | 7 |
| not useful | 11 |
| dev-only | 1 |
| for other page | 0 |
| **Items** | **69** |
