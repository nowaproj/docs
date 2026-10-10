# Features: Themes, assets and the app's look

Source: /home/user/nowa-master (v3.12.5). Researcher: features-theme-assets research subagent. 2026-10-06.

Paths below are relative to `/home/user/nowa-master` unless marked "dev" (`/home/user/nowa`, v3.13 in progress).
"Cmd/Ctrl" = Cmd on macOS, Ctrl elsewhere (`AdaptiveActivator`, `packages/core/lib/src/inputs.dart:22-24`).

## Summary

Themes
- **Themes** (panel): list, create, rename, delete and edit the app's themes (`ThemeData` variables in `lib/globals/themes.dart`); changes show on the board right away.
- **Create New Theme**: adds a new seed-based theme and lets you name it.
- **Active** theme: clicking a theme in the list makes it the theme your app starts with (writes it into code).
- **Rename** / **Delete** (theme right-click menu): the active theme cannot be deleted.
- **Colors** (theme section): edit the color scheme roles (Primary, Secondary, Tertiary, Surface by default) and add more with **Add Color**.
- **Brightness** and **Mode** (**Fixed** / **Seed**), **Seed Color**, **Scheme Variant**: light/dark scheme and generating a full palette from one color.
- **Typography** (theme section): the 15 Material text styles plus **Default Font**; edit size, weight, font, color and more per style.
- **Widgets** (theme section): **Fields** (input decoration theme) and **Buttons** (Button and Icon Button themes).
- Theme extensions (tabs **Default Theme** + one per extension): edit custom `ThemeExtension` classes in a theme; at most 8 extension types.
- **Create Theme Setup**: adds the theme files to a project that has none (e.g. an imported Flutter project).
- **Colors From Theme** (any color property): link a widget color to a theme color, edit the theme color in place, detach it, or add transparency with **With values**.
- **Text Styles** (Text **Style** property): link text to a theme text style, edit the style, override parts with **CopyWith**, or detach.
- **Connect to Theme** (button **Button Style**): make a Button or Icon Button follow the theme's button style.
- Switching themes while the app runs: the default `AppState` global state has a `changeTheme` function (logic area covers the steps).
- Import a theme from Figma: Nowa AI with the Figma connection turns Figma colors and text styles into theme code (AI area covers this).

Fonts and icons
- **Fonts** picker: pick any Google Font (downloaded into the project automatically) or **Import** your own `.ttf`/`.otf` file.
- Custom fonts declared in `pubspec.yaml`: Nowa keeps your declarations and shows those families on the canvas.
- **Icons** picker: choose a Material icon for Icon widgets (searchable; Material Icons only).

Assets
- Assets in the **Files** panel: the **assets** section lists project files; **Import asset** uploads one or more files.
- Pick or upload an asset from a widget property: **Pick Image** / **Upload Image** (also SVG, Lottie, Rive, Video, Audio).
- Paste an image onto the board: Cmd/Ctrl+V saves the image into `assets/` and places an Image widget.
- Drag an asset onto the board: images, SVGs, fonts, Rive files and videos become the matching widget.
- Asset file actions: **Remove file**, **Rename**, **Copy as path**, **View in folder** (Local projects only), **Show file content**, preview and open.
- Automatic `pubspec.yaml` registration of asset folders and fonts.

App look
- **App Icon** (Project Settings → **Project Details**): change the launcher icon for all platforms at once or per platform.
- Localization: no translation UI; Nowa AI sets it up in code and the board renders custom localization delegates.
- Text direction (RTL): Text **Text Direction** property and the **Text Direction** wrapper.
- Templates (**Search for templates**): 13 built-in screen and component templates, some **Premium** (plan-gated).
- Playground starting points and public templates (sandbox only; editor-shell area covers this).

Searched for and not found in v3.12.5 (do not document as features): splash screen settings; a Material 3 toggle;
a theme mode (light/dark/system) switch; a dark-mode preview toggle on the board; a translations/locale editor;
icon packs other than Material Icons; marketplace templates (code exists but is unreachable, see "Not user-facing");
dragging files from the computer onto the board (code exists but is never called); an asset upload size limit for
manual uploads.

## Features

### Themes (panel)
- **What it does:** Shows every theme in `lib/globals/themes.dart` and an editor for the selected theme (colors, typography, widget themes, extensions). Edits are written to the Dart code and the board updates right away.
- **Where:** sidebar icon **Themes** (style/palette icon, tooltip "Themes"), third icon in the left sidebar; also pinned to the top bar by default. Shortcut Cmd/Ctrl+3. Also: click `main.dart` in the Files panel → **Themes Options**, or click `themes.dart` → **Open Themes Panel**.
- **Labels:** panel title "Themes"; header buttons tooltip "Refresh" and "Open in New Tab"; list row "Create New Theme"; label "Active" on the applied theme; section headers "Colors", "Typography", "Widgets" (each with a help icon). Help texts: "Make your app your own! Change the primary, secondary, tertiary and much more to shape the way your app looks." / "Customize the text styles used in your app. Change the font family, size, weight and more to match your brand." / "Customize the look and feel of your widgets. Change the colors, shapes, sizes and more of your inputs, buttons, dialogs and more." `themes.dart` preview text: "Themes editing is now in a separate panel." with button "Open Themes Panel".
- **How to use:**
  1. Open **Themes**. The active theme is selected and the list collapses to just that theme; the editor appears below.
  2. Click the arrow next to the selected theme (or the theme itself) to show the whole list again.
  3. Edit colors, typography and widget themes in the sections below the list.
  4. **Refresh** re-renders the app with the current theme; **Open in New Tab** opens `themes.dart` as code.
  5. Undo/redo inside the panel with Cmd/Ctrl+Z and Cmd/Ctrl+Y (the panel keeps its own undo history).
- **Options:** none beyond the sections documented below.
- **Limits and rules:** every top-level variable in `lib/globals/themes.dart` is listed as a theme. The visual editor works when the theme is written as `ThemeData(...)`; other forms (e.g. `ThemeData.dark()`) show only a basic field. If the theme has no `colorScheme`, opening it adds `ColorScheme.fromSeed(seedColor: Colors.deepPurple)`. New projects get `lightTheme` and `darkTheme` (both Fixed mode, `ColorScheme.light()` / `ColorScheme.dark()`).
- **Gating:** none found.
- **Code refs:** `lib/project/side_bar.dart:46-49`, `lib/project/side_bar.dart:418`, `packages/core/lib/src/panels/panel.dart:32`, `lib/setup_general_actions.dart:43-59`, `lib/project/panels/left_panel.dart:35`, `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:42-58,155-191,194-222,233-253`, `packages/core/lib/src/panels/details/theme_panel/theme_panel_details.dart:100-160`, `packages/core/lib/src/panels/details/theme_panel/theme_panel_fields.dart:40-47`, `packages/core/lib/src/widgets/nowa_widgets.dart:161-163`, `packages/core/lib/src/file_system/templates/common/themes_dart_template.dart:15-25`, `packages/core/lib/src/file_system/templates/file_template.dart:33`, `packages/core/lib/src/file_system/widgets/previews/themes_preview/themes_file_preview.dart:28-36`, `packages/core/lib/src/file_system/widgets/previews/main_preview/main_options.dart:16-45`, `packages/core/lib/src/project_environment/env_manager.dart:21-22,112-115`.
- **Old docs:** `docs/ui/themes/create-themes.md`: wrong (says edit themes inside the `themes.dart` file preview and "Set as default" on hover; both are gone). `docs/new/whats-new.md` 3.0 ("Redesigned Theme System … theme editor from the left bar"): accurate.
- **3.13 (dev) changes:** UI refactor only (NListTile/NMenu); same labels (`dev packages/core/lib/src/panels/details/theme_panel/themes_panel.dart`).
- **Screenshot value:** high: the Themes panel with `lightTheme` marked Active, list expanded, Colors section visible.

### Create New Theme
- **What it does:** Adds a new theme to `themes.dart` and puts its name in edit mode.
- **Where:** **Themes** panel → expand the list → **Create New Theme** (last row).
- **Labels:** "Create New Theme".
- **How to use:**
  1. In the theme list, click **Create New Theme**.
  2. Type a name and press Enter (or click outside).
  3. The new theme is selected for editing. It is not applied yet; click it in the list to make it **Active**.
- **Options:** the new theme is `ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: Color(0xFF673AB7)))`, so it opens in **Seed** mode with a purple seed. The default name is `newTheme` (a free variant if taken).
- **Limits and rules:** names are code names. Errors: "Name cannot be empty", "Name "X" is already taken", "Name X is a reserved keyword", "Name "X" is not a valid code name".
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:107-140,256-287`, `packages/core/lib/src/widgets/rename_declaration_field.dart:112-160`, `packages/core/lib/src/file_system/naming.dart:36-59`.
- **Old docs:** `docs/ui/themes/create-themes.md` ("Click on Create New Theme within the themes.dart file"): partly outdated (now in the Themes panel).
- **Screenshot value:** medium: list with a freshly created theme in rename mode.

### Active theme (apply a theme)
- **What it does:** Makes a theme the one your app starts with and the one the board shows.
- **Where:** **Themes** panel → click a theme in the list.
- **Labels:** "Active" (shown next to the applied theme); undo entry "Change Default Theme".
- **How to use:**
  1. Open **Themes** and expand the list.
  2. Click a theme. It is selected for editing and becomes **Active**.
- **Options:** none.
- **Limits and rules:** selecting a theme always applies it. In new projects `MaterialApp` uses `theme: AppState.of(context).theme`, so applying a theme changes the starting value `ThemeData _theme = <theme>;` in `lib/globals/app_state.dart`; otherwise Nowa sets the `theme:` argument of `MaterialApp` in `main.dart`. If the theme comes from a getter that does not return a variable directly, Nowa shows "Cannot change theme: The theme getter must return a variable directly".
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:333-359,382-383`, `packages/core/lib/src/project_environment/env_manager.dart:90-98`, `packages/core/lib/src/project/env_services/theme_service.dart:21-23,51-90,130-137`, `packages/core/lib/src/file_system/templates/common/app_state_template.dart:28-35`, `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:46-48`.
- **Old docs:** `docs/ui/themes/create-themes.md` ("Hover over a theme and select Set as default"): wrong; there is no "Set as default" (`grep` finds no such label).
- **Screenshot value:** medium: two themes in the list, "Active" label moved to the clicked one.

### Rename / Delete a theme
- **What it does:** Renames the theme variable (and its uses) or removes it.
- **Where:** **Themes** panel → right-click a theme.
- **Labels:** "Rename", "Delete" (red); disabled tooltip "Cannot delete applied theme".
- **How to use:**
  1. Right-click the theme → **Rename**, type the new name, press Enter.
  2. Right-click → **Delete** to remove it. If other code uses it, Nowa lists the references and asks before deleting. Undo with Cmd/Ctrl+Z.
- **Options:** none.
- **Limits and rules:** the **Active** theme cannot be deleted; apply another theme first. Same name rules as Create New Theme.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/themes_context_menu.dart:24-35`, `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:155`, `packages/core/lib/src/actions/block_actions.dart:10-84,202-213`.
- **Old docs:** `docs/ui/themes/create-themes.md` ("rename or delete a theme by right-clicking"): accurate.
- **3.13 (dev) changes:** the disabled Delete item shows the subtitle "The applied theme" instead of a tooltip (`dev packages/core/lib/src/panels/details/theme_panel/themes_context_menu.dart`).
- **Screenshot value:** low.

### Colors (theme color scheme)
- **What it does:** Edits the theme's Material color roles. Each role tile shows the color and, on hover, its matching "on" color (the color for text/icons on top of it).
- **Where:** **Themes** panel → select a theme → **Colors** section.
- **Labels:** role tiles named by role, e.g. "Primary" / "On Primary", "Secondary", "Tertiary", "Surface"; button "Add Color"; popup "Override Color Role"; role editor title "Edit "Primary"" with a reset icon; expandable "Preview"; color picker fields "HEX" and "OP" plus an eyedropper.
- **How to use:**
  1. Click a role tile (e.g. **Primary**). The editor popup opens.
  2. Click the left part (role) or right part (its "on" color) at the top to choose which one you edit.
  3. Pick a color: drag in the saturation/hue area, set opacity, use the eyedropper, or type a HEX value and opacity (OP %).
  4. Check the **Preview**. Close with the back arrow.
  5. To reset the role to the scheme default, click the reset icon in the popup header (removes both overrides).
  6. To edit another role, click **Add Color** and choose it in **Override Color Role**; its editor opens.
- **Options:** always shown: Primary, Secondary, Tertiary, Surface. Addable (if not set yet): Primary Container, Primary Fixed, Primary Fixed Dim, the same for Secondary and Tertiary, Error, Error Container, Surface Dim, Surface Bright, Surface Container Lowest/Low/(plain)/High/Highest, Outline, Outline Variant, Shadow, Scrim, Inverse Surface, Inverse Primary, Surface Tint. Roles with an "on" pair: Primary, Primary Container, Primary Fixed, Secondary…, Tertiary…, Error, Error Container, Surface, Inverse Surface.
- **Limits and rules:** deprecated roles `background`, `onBackground`, `surfaceVariant` are not offered. Colors are saved as `Color(0xAARRGGBB)` in the theme code.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/theme_panel_details.dart:108-116`, `packages/core/lib/src/panels/details/theme_panel/theme_panel_fields.dart:20-55,151-167,238-354,379-553`, `packages/core/lib/src/panels/details/theme_panel/models.dart:4-45`, `packages/core/lib/src/panels/details/theme_panel/override_color_popup.dart:47-51,161`, `packages/core/lib/src/fields/color_fields.dart:926-989`.
- **Old docs:** `docs/ui/themes/colors-themes.md`: partly outdated (still describes `themes.dart → Colors`, the removed "Colors from" menu, and lists Background/On Background).
- **Screenshot value:** high: Colors section with the four role tiles and the "Edit "Primary"" popup open.

### Brightness, Mode, Seed Color, Scheme Variant
- **What it does:** Chooses a light or dark scheme and whether colors are set one by one (**Fixed**) or generated from one seed color (**Seed**).
- **Where:** **Themes** panel → **Colors** section, below the role tiles.
- **Labels:** "Brightness" with "Light" / "Dark"; "Mode" with "Fixed" / "Seed"; in Seed mode "Seed Color" and "Scheme Variant".
- **How to use:**
  1. Set **Brightness** to **Light** or **Dark**.
  2. Set **Mode**: **Fixed** uses Flutter's light/dark defaults plus the roles you override; **Seed** builds the whole palette from **Seed Color**.
  3. In Seed mode pick a **Seed Color** and optionally a **Scheme Variant**.
- **Options:** Scheme Variant values (Flutter `DynamicSchemeVariant`): Tonal Spot, Fidelity, Monochrome, Neutral, Vibrant, Expressive, Content, Rainbow, Fruit Salad. No variant chosen = Flutter's default.
- **Limits and rules:** switching Fixed → Seed uses the current Primary as the seed and removes the Primary override; Seed → Fixed sets Primary to the seed color and removes seed, brightness and variant. In Fixed mode Brightness switches between `ColorScheme.light` and `ColorScheme.dark`.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/theme_panel_fields.dart:57-136,168-231`; enum values `/home/user/flutter/packages/flutter/lib/src/material/color_scheme.dart` (enum `DynamicSchemeVariant`).
- **Old docs:** missing.
- **Screenshot value:** medium: Brightness/Mode toggles with Seed mode showing Seed Color and Scheme Variant.

### Typography (theme text styles)
- **What it does:** Edits the theme's text styles and default font; every text linked to a style updates.
- **Where:** **Themes** panel → **Typography** section.
- **Labels:** "Default Font"; groups "Display", "Title", "Headline", "Body", "Label" (each expands to Large/Medium/Small, e.g. "Display Large"); row hover "Edit"; style icon tooltip "Reset to default"; header button tooltip "Reset all to default"; editor popup "Edit "Display Large"" with expandable "Preview".
- **How to use:**
  1. (Optional) Click **Default Font** and pick a font for the whole theme (see Fonts picker).
  2. Expand a group and click a style (or hover → **Edit**).
  3. In the popup set **Font Family**, **Font Weight**, **Decoration**, **Font Size**, **Color**, **Background**, letter spacing, line height and **Shadows**. Check the **Preview**.
  4. Reset one style with its icon ("Reset to default") or all with "Reset all to default".
- **Options:** 15 styles: displayLarge/Medium/Small, titleLarge/Medium/Small, headlineLarge/Medium/Small, bodyLarge/Medium/Small, labelLarge/Medium/Small. Each row shows weight and size (e.g. "Normal, 57.0 px"). Font Weight values: Thin, Extra Light, Light, Normal, Medium, Semi Bold, Bold, Extra Bold, Thick.
- **Limits and rules:** **Default Font** appears only when the theme uses the plain `ThemeData(...)` constructor (sets `ThemeData.fontFamily`). "Reset all to default" appears only when some style is customized.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/theme_panel_details.dart:118-151`, `packages/core/lib/src/fields/text_fields.dart:241-300,821-924,943-1047`, `packages/core/lib/src/panels/details/theme_panel/theme_panel_fields.dart:606-665`.
- **Old docs:** `docs/ui/themes/typograhies.md`: partly outdated (style names right; location now the Themes panel).
- **Screenshot value:** high: Typography tree with "Body" expanded and the "Edit "Body Medium"" popup.

### Widgets theme: Fields and Buttons
- **What it does:** Sets app-wide styles for text fields and buttons.
- **Where:** **Themes** panel → **Widgets** section → **Fields** or **Buttons**.
- **Labels:** "Fields", "Buttons"; Buttons popup "Buttons Theme" with "Button" and "Icon Button"; style page "Button Theme" with a reset icon; style fields "Background Color", "Foreground Color", "Shadow Color", "Elevation", "Side", "Radius".
- **How to use:**
  1. Click **Fields** to edit the input decoration theme (fill, borders, label/hint/error styles and more) used by every text field.
  2. Click **Buttons** → **Button** (Elevated buttons) or **Icon Button**, then set colors, elevation, side and radius. The reset icon restores the default button style setup.
  3. Make individual buttons follow it with **Connect to Theme** (see below).
- **Options:** Fields shows every `InputDecorationTheme` argument; Buttons edits `elevatedButtonTheme.style` / `iconButtonTheme.style`.
- **Limits and rules:** only these two widget themes are offered in the panel.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/theme_panel_details.dart:152-178`, `packages/core/lib/src/file_system/widgets/previews/themes_preview/theme_details.dart:169-198,265-359`, `packages/core/lib/src/fields/button_fields.dart:316-391`.
- **Old docs:** missing (What's New 2.x mentions `ButtonTheme` and TextField theme).
- **Screenshot value:** medium: "Buttons Theme" popup and the "Button Theme" page.

### Theme extensions
- **What it does:** When a theme has `extensions: [...]` (custom `ThemeExtension` classes, e.g. brand colors), the editor shows one tab per extension so you can edit its values.
- **Where:** **Themes** panel → select a theme that has extensions → tabs at the top of the editor.
- **Labels:** tab "Default Theme" (the normal editor) plus one tab per extension, named after its class (fallback "Extension").
- **How to use:**
  1. Select a theme with extensions.
  2. Click an extension tab and edit its constructor values (colors, text styles, numbers…).
- **Options:** none.
- **Limits and rules:** there is no button to create an extension; extensions come from code (written by hand or by Nowa AI, e.g. the Figma import). A project can use up to 8 extension types; more fails with "Cannot have more than 8 Theme Extensions". The color and text-style pickers on widgets list only Material color scheme and text theme roles, not extension values.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/theme_panel_details.dart:15-46,185-198`, `packages/core/lib/src/themes/theme_class_instance.dart:21-48`, `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:725-731`, `packages/core/lib/src/providers/project_provider.dart:287`.
- **Old docs:** missing; `docs/new/whats-new.md` 3.12.3 ("Up to 8 theme extensions"): accurate.
- **Screenshot value:** medium: editor with "Default Theme" and two extension tabs (needs a project with extensions).

### Create Theme Setup
- **What it does:** Adds Nowa's theme system to a project without it: creates `lib/globals/themes.dart` (light and dark themes) and `lib/globals/app_state.dart`, and points `MaterialApp`'s theme at `AppState`.
- **Where:** **Themes** panel when the themes file is missing (error text + button); also from a button's **Button Style** → **Connect...** when no theme is applied.
- **Labels:** "Error loading themes file: …"; button "Create Theme Setup"; dialog "Create Theme Setup", "This will create a new theme setup in your project. adding these files:", "- lib/global/theme.dart", "- lib/global/app_state.dart", buttons "Cancel" / "Create".
- **How to use:**
  1. Open **Themes**; if the file is missing, click **Create Theme Setup**.
  2. Click **Create**. The panel reloads with `lightTheme` and `darkTheme`.
- **Options:** none.
- **Limits and rules:** the dialog text says `lib/global/theme.dart`, but the files created are `lib/globals/themes.dart` and `lib/globals/app_state.dart`. Existing files are not overwritten. New projects already include both files.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/panels/details/theme_panel/themes_panel.dart:42-50,144-152`, `packages/core/lib/src/file_system/widgets/previews/main_preview/theme_setup_view.dart:5-73`, `packages/core/lib/src/project_environment/env_manager.dart:145-170`, `packages/core/lib/src/file_system/templates/file_template.dart:33-34`, `packages/core/lib/src/file_system/templates/project_bundles/default_bundles.dart:43-67`, `packages/core/lib/src/providers/projects_view_provider.dart:275`, `packages/core/lib/src/fields/button_fields.dart:428-431`.
- **Old docs:** `docs/ui/themes/create-themes.md` note ("Style > Connect > Create"): partly outdated.
- **Screenshot value:** low (edge case).

### Colors From Theme (use theme colors on widgets)
- **What it does:** Links any color property to a theme color, so the widget follows the theme.
- **Where:** select a widget → properties panel → click a color swatch (e.g. Container color, Text color).
- **Labels:** theme list under the color picker (raw role names: "primary", "onPrimary", "secondary", "onSecondary", "tertiary", "onTertiary", "error", "onError", "surface", "onSurface", "shadow"), expander "more colors"; hover "Edit"; linked view header "Colors From Theme" with a detach icon; linked field shows the role name and an "x"; link menu item "With values"; then "Alpha" with "more" (Red, Green, Blue).
- **How to use:**
  1. Click the color swatch. Below the picker, click a theme color (open **more colors** for container, fixed, surface-container, outline and other roles).
  2. The field now shows the role name. Changing that role in the theme updates the widget.
  3. To change the theme color itself, hover it in the list → **Edit** (edits the active theme).
  4. To stop following the theme, click the "x" on the field or the detach icon next to **Colors From Theme**; the current color is kept as a fixed value.
  5. For a transparent version without changing the theme: click the property name (e.g. **Color**) to open its menu → **With values**, then set **Alpha** (0–1).
- **Options:** see labels.
- **Limits and rules:** the theme list appears only for properties that have access to the widget's context (screen/component widgets), and it uses the **Active** theme. Older `withOpacity` values show the note "withOpacity is now deperecated use withValues instead" with an **Update** button.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/color_fields.dart:32-84,241-310,505-531,699-849`, `packages/core/lib/src/fields/style_fields/style_fields.dart:7-68,77-129,257-335`, `packages/core/lib/src/fields/block_field.dart:1011-1016`, `packages/core/lib/src/fields/field_link_menu.dart:352-399`.
- **Old docs:** `docs/ui/themes/colors-themes.md` ("Using Theme Colors", "With Opacity"): partly outdated ("With Opacity" is now "With values" in the property-name menu).
- **3.13 (dev) changes:** cosmetic only.
- **Screenshot value:** high: color picker with the theme color list and "more colors"; a field linked to "primary".

### Text Styles (use theme text styles on Text)
- **What it does:** Links a Text widget's style to a theme text style, with optional overrides.
- **Where:** select a Text widget → properties → **Style**.
- **Labels:** style button showing the linked style (e.g. "bodyMedium") or "Connect..."; popup "Text Styles" (raw names, e.g. "displayLarge"); hover "Edit"; style page ".. / Typography / Display Large" with tooltip "Reset to default"; property-name menu items "CopyWith", "Remove CopyWith", "Modify Style", "Detach..." (red).
- **How to use:**
  1. Click the style button → choose a style in **Text Styles**.
  2. To edit the theme style itself, hover it → **Edit**.
  3. To override only part of it (e.g. color) for this text: click **Style** (the property name) → **CopyWith**, then change the fields; the rest still follows the theme. **Remove CopyWith** goes back to the plain theme style.
  4. To detach completely, click the "x" on the style button (or **Detach...** in the menu).
- **Options:** 15 Material text styles. New Text widgets show `bodyMedium` (or `titleLarge`) as their default style.
- **Limits and rules:** style editing from here changes the **Active** theme.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/style_fields/style_fields.dart:131-255`, `packages/core/lib/src/fields/text_fields.dart:57-144,167-232`, `packages/designer/lib/src/details/widget_fields.dart:266-310`.
- **Old docs:** `docs/ui/themes/typograhies.md`: partly outdated ("Copy with" → "CopyWith"; "Detach Style" no longer exists).
- **Screenshot value:** high: Text **Style** field with the "Text Styles" popup.

### Connect to Theme (button styles)
- **What it does:** Makes a Button or Icon Button use the theme's button style, or a custom one.
- **Where:** select a Button / Icon Button → properties → **Button Style**.
- **Labels:** style button "Button Theme" / "Icon Button Theme" when following the theme, "Connect..." when custom; popup "Connect to Theme" with "Default theme"; hover add tooltip "Add ButtonStyle".
- **How to use:**
  1. Click the style button → **Default theme** to follow the theme's Button / Icon Button theme.
  2. Click its "x" to switch to a custom style for this button.
- **Options:** none.
- **Limits and rules:** if no theme is applied, the **Create Theme Setup** dialog opens instead.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/button_fields.dart:20-30,80-92,281-314,393-489`.
- **Old docs:** missing.
- **Screenshot value:** medium.

### Switch themes while the app runs (dark mode)
- **What it does:** New projects include a global state `AppState` with `changeTheme(ThemeData theme)`; calling it (e.g. from a button) switches the running app between `lightTheme`, `darkTheme` or any other theme.
- **Where:** in logic for an action, the **Globals** suggestions category (logic area owns the exact steps).
- **Labels:** "Globals" (suggestion category); function `changeTheme`.
- **How to use:** (high level) add an action → **Globals** → `AppState` → `changeTheme` → pass a theme. Exact clicks: see the logic research.
- **Options:** none.
- **Limits and rules:** by default `MaterialApp` has only `theme:`, so the app does not follow the phone's dark mode by itself. If you add `darkTheme`/`themeMode` to `MaterialApp` in code, the board honors them. There is no theme-mode switch in the Themes panel.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/file_system/templates/common/app_state_template.dart:20-36`, `packages/core/lib/src/file_system/templates/common/main_dart_template.dart:41-52`, `packages/core/lib/src/interpreter/suggestion.dart:470`, `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:122-161`.
- **Old docs:** `docs/ui/themes/create-themes.md` ("Dynamic Theme Changes"): partly outdated (function name right; UI steps unverified).
- **Screenshot value:** low here (logic area).

### Import a theme from Figma (via Nowa AI)
- **What it does:** With the Figma connection, Nowa AI writes Figma colors and text styles into theme code (`lib/globals/app_colors.dart`, `lib/globals/app_text.dart`) and reloads `themes.dart`.
- **Where:** AI chat → **Figma** icon (AI area documents connection and prompts).
- **Labels:** see AI research.
- **How to use:** see AI research.
- **Options / Limits:** works in cloud and local projects (What's New 3.12.3).
- **Gating:** none in code (`FigmaIntegration.enabled = true`).
- **Code refs:** `packages/ai/lib/src/mcp/figma_mcp.dart:31-37,71-86`, `packages/core/lib/src/figma/figma_oauth_manager.dart:5-7`.
- **Old docs:** missing; `docs/new/whats-new.md` 3.12.3: accurate.
- **Screenshot value:** low here.

### Fonts picker (Google Fonts and custom fonts)
- **What it does:** Picks a font for a text style. Google Fonts are downloaded into the project when chosen; your own font files can be imported.
- **Where:** any **Font Family** field (Text **Style**, theme **Typography** styles) or **Default Font** in the theme → click the font button (shows the font name or "Default").
- **Labels:** "Fonts", button "Import", filter menu (tune icon) "All Fonts" / "Default Fonts" / "Imported by you", hint "We recommend checking the fonts on Google Fonts" (link to fonts.google.com), empty "No Fonts"; page title ".. / Fonts".
- **How to use:**
  1. Click the font button. Search by name.
  2. Click a font. If it is a Google Font not yet in the project, Nowa downloads it to `assets/fonts/<Font Name>.ttf` and registers it.
  3. To use your own font, click **Import** and choose a `.ttf` or `.otf` file. It is saved in `assets/fonts/` and selected.
  4. Use the filter to show only Google Fonts ("Default Fonts") or only your files ("Imported by you").
- **Options:** filter groups above; default "All Fonts".
- **Limits and rules:** Import accepts `.ttf` and `.otf`, one file at a time. An imported font's family name is its file name without extension. For Google Fonts Nowa downloads the family's "regular" file only. In the web app the list shows the first 100 Google Fonts and search shows at most 20 results; the desktop app lists all.
- **Gating:** web vs desktop list size (see above).
- **Code refs:** `packages/core/lib/src/fields/text_fields.dart:16-55,365-455,457-758`, `packages/core/lib/src/file_system/file_object.dart:469-498`.
- **Old docs:** missing (`docs/ui/assets.md` only says fonts live in assets). What's New 3.7.3 ("AI Can Now Download Fonts"): accurate (AI tool `download_font`, `packages/ai/lib/src/tools/download_font_tool.dart:4-27`).
- **Screenshot value:** high: Fonts popup with search and the filter menu.

### Custom fonts declared in pubspec.yaml
- **What it does:** Font families you declare yourself in `pubspec.yaml` (with weights and styles) render on the canvas under their own names, and Nowa keeps your declarations when it updates the file.
- **Where:** `pubspec.yaml` (code; power users).
- **Labels:** none.
- **How to use:** add fonts to `assets/`, declare them under `flutter: fonts:` with a `family`, then use that family name in text styles.
- **Options:** none.
- **Limits and rules:** font files Nowa finds in `assets/` that you did not declare are added automatically, one family per file named after the file. Declared entries whose files no longer exist are dropped.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/pubspec_manager.dart:78-116,165-203`.
- **Old docs:** missing; `docs/new/change-log.md` 3.12.5: accurate.
- **Screenshot value:** low.

### Icons picker
- **What it does:** Chooses the icon for an Icon (and widgets with an icon field).
- **Where:** select an Icon widget → properties → icon field button (shows the icon and its name, or "none").
- **Labels:** popup "Icons", search field, grid with icon-name tooltips.
- **How to use:** click the icon button, search (e.g. "home"), click an icon.
- **Options:** Icon widget also has size, color and, under advanced options, fill, weight, grade, optical size, shadows, text direction, blend mode, text scaling, semantic label.
- **Limits and rules:** only Flutter Material Icons are listed; no other icon packs. For custom icons use an SVG asset.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/icon_field.dart:14-191`, `packages/core/lib/src/fields/button_fields.dart:35-69`.
- **Old docs:** missing.
- **Screenshot value:** medium: Icons popup with a search.

### Assets in the Files panel (import and browse)
- **What it does:** The **assets** section of the Files panel lists every file in the project's `assets/` folder; you import files there and Nowa registers them in `pubspec.yaml`.
- **Where:** sidebar **Files** (folder icon) → section **assets** (after **lib** and **boards**). Also: new empty tab (Cmd/Ctrl+T) → **Upload a File**.
- **Labels:** panel title "Files"; section rows "lib", "boards", "assets"; upload icon tooltip "Import asset"; empty tab "Empty Tab", "Open an existing file or create a new one", buttons "New Widget" and "Upload a File".
- **How to use:**
  1. Open **Files**. Click **assets** to expand it.
  2. Click the upload icon (**Import asset**) on the **assets** row and choose one or more files. They are added to `assets/`.
  3. Click a file to see a preview popup (thumbnail, open and close buttons). Double-click to open it in a tab (images open in an image viewer).
  4. Drag files between folders inside **assets** to move them.
- **Options:** none.
- **Limits and rules:** recognized types: images `.png .jpg .jpeg .webp .gif .bmp .wbmp`, `.svg`, fonts `.ttf .otf`, Rive `.riv`, video `.mp4 .mov`, audio `.mp3 .wav`, `.json` (Lottie), `.yaml`, `.txt`; other files are imported as text. Uploads go to the `assets/` root; Nowa itself creates `assets/fonts/` (fonts) and `assets/images/` (AI-saved images). Assets can only be moved within **assets**. No "New Folder" option for assets in the Files panel (lib's **Add** menu has **New Folder...**). Every non-empty folder under `assets/` is written to `flutter: assets:` in `pubspec.yaml` (Nowa rewrites that list), and `uses-material-design: true` is set. No upload size limit found in the app (see Open questions). Importing a file whose name already exists fails ("File or folder … already exists"); **Upload a File** shows that message as an error, for **Import asset** see Open questions.
- **Gating:** none found (the Files panel shows all project files in code mode).
- **Code refs:** `lib/project/side_bar.dart:62-65`, `lib/project/panels/left_panel.dart:32`, `lib/project/panels/files_panel/files_list.dart:106-126,155-185,334-344,395-409,440-516`, `lib/project/panels/files_panel/file_preview_body.dart:22-118`, `packages/core/lib/src/providers/project_provider.dart:368,463-472,697-715,787-804`, `packages/core/lib/src/file_system/file_info.dart:10-80`, `packages/core/lib/src/file_system/importer.dart:12-15`, `packages/core/lib/src/settings/pubspec_manager.dart:127-132,205-235`, `packages/core/lib/src/file_system/nfile_impl.dart:486-489`, `lib/empty_editor.dart:34-105`, `packages/core/lib/src/editors/image_editor.dart:4-12`.
- **Old docs:** `docs/ui/assets.md`: partly outdated ("Assets section is the last section in the Files panel" is right; "Upload button in the Assets panel" and drag-from-desktop are wrong). `docs/new/whats-new.md` 3.9 "New Assets panel": superseded; the Assets icon was replaced by Files on 15 June 2026 (commit f2d4aba1f).
- **3.13 (dev) changes:** in the designer the **Files** icon is replaced by the **Library** panel, which also lists assets: right-click an assets folder → "Upload assets...", or the add menu → "Upload Assets...". **Files** shows only in code mode (`dev lib/project/side_bar.dart`, `dev lib/project/panels/library_panel/library_host.dart:156-185`).
- **Screenshot value:** high: Files panel with **assets** expanded, the "Import asset" icon, and an image preview popup.

### Pick or upload an asset from a widget property
- **What it does:** Sets an Image, SVG, Lottie, Rive, video or audio source to a project asset, uploading a new file if needed.
- **Where:** select the widget → properties → its source field → **Asset** tab.
- **Labels:** tabs "Network" / "Asset" (Image and Audio also "Bytes"); button "Pick Image" (or "Pick SVG", "Pick Lottie", "Pick Rive", "Pick Video", "Pick Audio"; shows the file name once set); popup header "Pick …" with "Upload Image" (etc.), search, list of matching assets with thumbnails. Audio note: "Asset file will work only on Android and iOS".
- **How to use:**
  1. Choose the **Asset** tab.
  2. Click **Pick Image** (or the matching button). Pick an existing asset from the list, or click **Upload Image** to add a file from your computer (saved in `assets/`).
- **Options:** where it applies: Image widget (field **Image**: Network / Asset / Bytes); Container decoration **Image** (same three tabs); SVG widget (Asset / Network, field "SVG Image"); Lottie (Network / Asset); Rive (Network / Asset, then artboard and state machine choices); Video player controller (Network / Asset); Audio source (Network / Asset / Bytes).
- **Limits and rules:** upload filters: images = any image type; SVG `.svg`; Lottie `.json`; Rive `.riv`; video = any video type; audio `.mp3`, `.wav`. The asset list shows only files of the matching kind in `assets/`. Asset audio works only on Android and iOS (note in the UI).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/asset_fields.dart:12-227`, `packages/core/lib/src/fields/basic_fields.dart:888-953,956-1027,1029-1140,1142-1194,1196-1256,1258-1300,290-321`, `packages/designer/lib/src/details/widget_fields.dart:29-200`, `packages/designer/lib/src/designer_plugin.dart:45-71`.
- **Old docs:** `docs/ui/assets.md` ("Widget Details Panel … Source property"): partly outdated (button is "Pick Image" → "Upload Image"; no "Source" label).
- **3.13 (dev) changes:** same labels, new button style.
- **Screenshot value:** high: Image widget **Asset** tab with the "Pick Image" popup open.

### Paste an image onto the board
- **What it does:** Pasting an image saves it into `assets/` and places an Image widget where your pointer is.
- **Where:** board → Cmd/Ctrl+V, or right-click the board → **Paste**.
- **Labels:** "Paste" (board context menu).
- **How to use:**
  1. Copy an image (or, in the desktop app, image files in your file manager).
  2. Point at the board and press Cmd/Ctrl+V.
- **Options:** none.
- **Limits and rules:** saved as `assets/pasted_image_<id>.<ext>`; the widget uses `AssetImage` with fit cover. Copied files must be JPEG, PNG, WebP or BMP to be treated as images; other files are ignored.
- **Gating:** pasting copied files: Desktop app only (`!kIsWeb`). Pasting image data in the web app: unconfirmed (see Open questions).
- **Code refs:** `packages/designer/lib/src/design/copy_paste.dart:79-141`, `packages/designer/lib/src/design/nowa_copy_paste.dart:40-112`, `packages/designer/lib/src/actions/designer_actions.dart:115-125`, `packages/designer/lib/src/menus/board_context_menu.dart:20`, `lib/setup_general_actions.dart:29`.
- **Old docs:** missing.
- **Screenshot value:** medium (short GIF).

### Drag an asset onto the board
- **What it does:** Dragging an asset file from the Files panel onto the board creates the matching widget.
- **Where:** Files panel → **assets** → drag a file onto the board.
- **Labels:** none.
- **How to use:** drag the file and drop it on the board (or into a screen).
- **Options:** image → Image widget (`AssetImage`, fit cover) sized to one sixth of the image's pixel size; SVG → SVG widget from asset; font → Text "Write something" in that font; Rive → Rive widget from asset; video → video player (350×250) with the asset.
- **Limits and rules:** Lottie `.json` and audio files do not create a widget.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design_experience/designer_board_controller.dart:244-285`, `packages/core/lib/src/file_system/file_object.dart:410-467,519-535,604-616,643-646,670-686`, `packages/core/lib/src/widgets_to_add/default_blocks.dart:143-190`.
- **Old docs:** `docs/ui/assets.md` (drag "from your desktop or file explorer into the design board"): wrong for v3.12.5 (desktop drop code is never called); dragging from the Files panel is not covered.
- **Screenshot value:** medium (GIF).

### Asset file actions (rename, remove, path, folder)
- **What it does:** Manages asset files.
- **Where:** Files panel → right-click a file (multi-select supported).
- **Labels:** "Remove file" / "Remove N files", "Rename", "Copy as path", "View in folder", "Show file content" / "Show files content"; confirm "Are you sure you want to delete "<name>"?" with "Cancel" / "Yes".
- **How to use:**
  1. Right-click → **Rename**, type, press Enter.
  2. Right-click → **Remove file** → **Yes** (or select and press Delete). Undo with Cmd/Ctrl+Z.
- **Options:** none.
- **Limits and rules:** rename errors: "File with name X already exists", "File name cannot contain slashes "/", "\"", "File name cannot be empty". Removing a widget from the board does not delete the asset. No code was found that updates widget asset paths when an asset is renamed or moved, or that warns when a deleted asset is still used (Dart references only). `lib/main.dart` cannot be deleted.
- **Gating:** **View in folder**: Local projects only. View-only projects show only **Copy as path** (and **View in folder** if local).
- **Code refs:** `lib/project/panels/files_panel/file_context_menu.dart:33-121`, `packages/core/lib/src/file_system/actions/file_actions.dart:121-203,383-403`, `packages/core/lib/src/widgets/nowa_dialogs.dart:6-26`, `packages/core/lib/src/file_system/naming.dart:72-86`, `packages/core/lib/src/file_system/nfile_impl.dart:102-128`, `packages/core/lib/src/file_system/file_system.dart:430-465`.
- **Old docs:** `docs/ui/assets.md` ("Remove", "Rename"): partly outdated (label is "Remove file").
- **Screenshot value:** low.

### App Icon
- **What it does:** Generates the app's launcher icons from one image, for all platforms or one.
- **Where:** top bar **Settings** (or Cmd/Ctrl+,) → **Project Details** → **App Icon**.
- **Labels:** "App Icon" (help: "The app icon is the image that represents your app on the user's device. You can change the app icon for each platform or change all at once."), tile "Change all", platform tiles "Android", "iOS", "Web", "macOS", hover "Change Icon".
- **How to use:**
  1. Hover **Change all** (or a platform tile) → **Change Icon**.
  2. Choose an image. Nowa generates the icon files and saves.
- **Options:** **Change all** generates Android, iOS, Web, Windows and macOS icons; a platform tile only that platform.
- **Limits and rules:** image file types only; max 1024×1024 px ("Icon must be 1024x1024 or smaller").
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/app_icon_settings.dart:10-209`, `packages/core/lib/src/settings/app_icon_manager.dart:9-34,94-171`, `packages/core/lib/src/settings/project_detail_settings.dart:16,44`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:754`, `lib/setup_general_actions.dart:33`.
- **Old docs:** not covered in my area's pages (shipping area may cover).
- **Screenshot value:** medium: App Icon section with the platform tiles.

### Localization (multiple languages)
- **What it does:** Running the app in several languages is set up by Nowa AI in code (custom `LocalizationsDelegate`). The board renders the app's `locale`, `localizationsDelegates` and `supportedLocales`.
- **Where:** ask Nowa AI (AI area); no localization panel.
- **Labels:** none.
- **How to use:** ask the AI to add languages (What's New 3.7.3).
- **Options:** none.
- **Limits and rules:** the AI refuses the `flutter_localizations` package ("flutter_localizations is not supported by nowa, use a different approach."). No translation editor, locale switcher or preview toggle in the UI.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/localization/localization_blocks.dart:4-9`, `packages/core/lib/src/interpreter/visitors/ast_to_block_visitor.dart:733-740`, `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:122-161`, `packages/ai/lib/src/tools/packages_tool.dart:164-170`.
- **Old docs:** missing; `docs/new/whats-new.md` 3.7.3: accurate.
- **Screenshot value:** low.

### Text direction (right-to-left)
- **What it does:** Lays out text (or a whole subtree) right-to-left.
- **Where:** Text widget properties → **Text Direction**; or wrap any widget with the **Text Direction** wrapper (widgets area owns wrapping).
- **Labels:** "Text Direction" (property and wrapper name); values "ltr" / "rtl".
- **How to use:** set **Text Direction** to **rtl** on a Text, or wrap a section with **Text Direction** and set it to **rtl**.
- **Options:** wrapper default: ltr.
- **Limits and rules:** no app-wide RTL switch found.
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/widget_fields.dart:308`, `packages/core/lib/src/wrappers_to_add.dart:115-119`, `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:712-717`, `packages/core/lib/src/fields/basic_fields.dart:1517-1536`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Templates (Search for templates)
- **What it does:** Adds a ready-made screen or component (with its files) to the project.
- **Where:** board toolbar **Screen** tool; right-click the board → **Create a page**; Files → **lib** row **Add to library** → **New Widget...**; empty tab → **New Widget**.
- **Labels:** search box "Search for templates"; filters "Screens" / "Components"; badge "Premium"; preview pane with the template name; single-file dialog "New <template name>" with "Cancel" / "Submit"; multi-file dialog "Add <template name>" with "Cancel" / "Import" and tooltip "Please fix the problems before importing"; plan dialog "Time to level up" with "Upgrade" (mobile apps: "Feature unavailable").
- **How to use:**
  1. Click the **Screen** tool (or another entry point). Choose **Screens** or **Components** and search.
  2. Select a template to see its preview, then press Enter or click it.
  3. One-file template: name it in **New …** → **Submit**. Screens get a route `/<screen-name>`; from the Screen tool the screen is placed on the board.
  4. Multi-file template: in **Add …** review the files (names, paths, problems), then **Import**. If files with the same names exist, Nowa asks before overwriting.
- **Options:** Screens: Empty Page, Basic Cards 1, Basic Cards 2, Basic Cards 3, Onboarding Screen, Article (Premium), Dashboard (Premium), Event Info (Premium), Audio Player Page (Premium), Chat Template, Authentication Template. Components: Audio Player, Google Button. Free templates are listed before Premium ones.
- **Limits and rules:** single-file templates go to `lib/pages/` (screens) or `lib/components/` (components). The list is built into the app (no online catalog).
- **Gating:** Premium templates need the `premium_templates` plan entitlement; otherwise the plan dialog opens (link to pricing per D3).
- **Code refs:** `packages/designer/lib/src/widgets/designer_tools.dart:150-160`, `packages/designer/lib/src/menus/board_context_menu.dart:19`, `lib/project/panels/files_panel/add_lib_menu.dart:53-67`, `lib/empty_editor.dart:34-46,94-99`, `packages/core/lib/src/services/templates/add_template_action.dart:16-134`, `packages/core/lib/src/services/templates/templates_service.dart:372-389`, `packages/core/lib/src/services/templates/cloud_templates_services.dart:113-116`, `packages/core/lib/src/services/templates/built_in/*.dart`, `packages/core/lib/src/file_system/actions/file_actions.dart:28-73`, `packages/core/lib/src/file_system/widgets/create_file_dialog.dart:94-126`, `packages/core/lib/src/file_system/widgets/template_widgets/add_template_dialog.dart:139-200`, `packages/designer/lib/src/actions/add_template_designer.dart:7-37`, `packages/core/lib/src/widgets/nowa_dialogs.dart:88-133`, `packages/core/lib/src/billing/entitlement_keys.dart:8`, `packages/core/lib/src/billing/billing_models.dart:4`.
- **Old docs:** `docs/ui/temlpates.mdx`: partly outdated (Screen tool entry is right; it is now a searchable list with Screens/Components filters, and one-file templates show a naming dialog instead of the file list). `docs/tutorials-template/*` stays legacy (D4).
- **Screenshot value:** high: the template palette with the preview pane and a "Premium" badge.

### Playground starting points and public templates (sandbox)
- **What it does:** In the playground or a public project opened as a guest, the top bar picker offers other starting points.
- **Where:** top bar picker chip (sandbox sessions only).
- **Labels:** groups "Playgrounds" ("Starter app" – "Routing, theme and a home page"; "Simple app" – "A single page, no routing"; "Empty app" – "A blank canvas for the assistant to fill") and "Templates" (public sample projects; empty: "No templates to show"); disabled footer "See all projects"; confirm "Discard this app?" / "It was never saved to an account, so opening another one loses it." with "Cancel" / "Discard".
- **How to use / Options:** editor-shell area owns this; noted here because "Templates" overlaps.
- **Limits and rules:** "Empty app" starts without `themes.dart` (the Themes panel then offers **Create Theme Setup**). In the playground the app is stored in the browser only while its encoded size stays under 3 MB, so large assets can stop it from being saved.
- **Gating:** sandbox (playground / guest) only.
- **Code refs:** `lib/sandbox/sandbox_picker.dart:20-117`, `packages/core/lib/src/playground/playground_starter.dart:9-11`, `packages/core/lib/src/file_system/templates/project_bundles/default_bundles.dart:73-87`, `packages/core/lib/src/playground/playground_manager.dart:22-33`.
- **Old docs:** missing.
- **Screenshot value:** low here.

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| Assets panel ("Assets", "Import asset", "No assets yet") | `lib/project/panels/assets_panel.dart`, routed at `lib/project/panels/left_panel.dart:42` | Unreachable: its sidebar icon was replaced by Files in commit f2d4aba1f (2026-06-15); not in `MainSidebar.getIcons()` (`lib/project/side_bar.dart:34-100`), `?panel=` only resolves sidebar icons (`lib/project/workspace_options.dart:100-105`). |
| Files grid view ("Import" button, "New Folder" / "Paste" menu, folder tree) | `lib/project/panels/files_panel/files_grid.dart`, `files_context_menu.dart`; `files_panel.dart:57` | Unreachable: `ViewType.grid` is never set (default list, `packages/core/lib/src/providers/file_provider.dart:14`). |
| Legacy theme pages: "Colors from" (Light/Dark), ThemeDataDetails, AllThemes, ThemeActionsMenu "Remove"/"Rename" | `packages/core/lib/src/fields/color_fields.dart:86-130`, `packages/core/lib/src/file_system/widgets/previews/themes_preview/all_themes.dart`, `theme_details.dart:12-152`, `theme_actions.dart` | Dead code: `AllThemes` is never instantiated; old theme UI removed in 3.0.8. |
| Drop files from the computer onto the board | `packages/designer/lib/src/design/drop_on_board.dart:10-35` | `onDropFromOutside` has no caller. (Dropping files on the AI chat field works: AI area.) |
| "Request a Template" dialog | `packages/core/lib/src/dialogs/feedback_dialogs.dart:59-73` | Never shown (no caller). |
| Marketplace view / sample apps browser | `lib/dashboard/market_place/marketplace_view.dart`; `packages/marketplace` (only native folders) | `MarketplaceView` is never used; `packages/marketplace` is not in the workspace. |
| "Sample Settings" (publish project as sample) | `packages/core/lib/src/samples/samples_settings.dart`, `packages/core/lib/src/plugin.dart:146-148` | `kDebugMode` only. |
| "Import template" / "Export template" | `lib/project/panels/files_panel/add_lib_menu.dart:147-154`, `lib/project/panels/files_panel/file_context_menu.dart:115-119` | `kDebugMode && !kIsWeb` only. |
| "Reanalyze file(s)" | `lib/project/panels/files_panel/file_context_menu.dart:91-106` | `kDebugMode` only. |
| Local templates folder (`Documents/Nowa/templates/templates.yaml`) | `packages/core/lib/src/services/templates/templates_service.dart:178-305` | `LocalTemplatesService` is never registered (`packages/core/lib/src/services/locator.dart:51` registers `CloudTemplatesService`, which streams built-ins only). |
| Animated Onboarding Screen template | `packages/core/lib/src/services/templates/built_in/animated_onboarding_template.dart:3-6`, `packages/core/lib/src/services/templates/templates_service.dart:380` | Commented out of the template list. |
| Device preview "System" section (Locale, Theme Dark/Light) | `packages/device_preview/lib/src/views/tool_panel/sections/system.dart`, `packages/device_preview/lib/src/device_preview.dart:112-118` | Commented out of the default tools; not shown. |
| Nowa editor's own theme (`useMaterial3: false`) | `packages/nowa_ui/lib/src/globals/themes.dart:15`, `theme_provider.dart` | Editor UI styling, not the user's app; no user setting. |

## Open questions
- Manual asset uploads: is there a server-side size limit for cloud projects? No client-side limit exists (`project_provider.dart:787-804`). The connected-agent tool caps 20 images per call and 20 MB per image (`packages/ai/lib/src/mcp/mcp_backend_tools.dart:97-98`) — AI area.
- Importing a file whose name already exists via **Import asset**: code throws "File or folder … already exists" (`nfile_impl.dart:486-489`) with no catch in `DirAddButton.upload` (`files_list.dart:464-474`). Does the user see any message?
- Uploading from a widget property (**Upload Image** etc.) creates the file directly in `assets/` without calling the pubspec refresh (`asset_fields.dart:119-136`). Is `pubspec.yaml` updated before build if `assets/` was empty before?
- Renaming or moving an asset: confirm in the app that widgets using the old path break (no path-rewrite code found).
- Does dropping an SVG/Rive/Lottie asset (or picking one in a property) add `flutter_svg` / `rive` / `lottie` to the project when missing? Default packages are only `nowa_runtime`, `provider`, `shared_preferences`, `dio`, `go_router` (`packages/core/lib/src/interpreter/packages/dart_package.dart:91`).
- Pasting image data onto the board in the web app: `NowaCopyPaste.init()` (web paste listener) is not called by the designer (`copy_paste.dart:80-93`); does Cmd/Ctrl+V with an image work on web?
- Google Fonts download uses the API's `regular` file with `capability=VF` (`text_fields.dart:35,45`). Is that a variable font with all weights, or regular only (bold synthesized)?
- How do pubspec-declared font families with several files (e.g. family "Inter" with Inter-Regular/Inter-Bold) appear in the Fonts picker? The picker lists font files by file name (`text_fields.dart:520-533`).
- Figma theme import: are `app_colors.dart` / `app_text.dart` generated as `ThemeExtension` classes that show as extension tabs in the Themes panel? Server-generated; not visible in this repo (`figma_mcp.dart:71-86`).
- Exact logic steps to call `AppState.changeTheme` in 3.12.5 (logic researcher).
- The **Create Theme Setup** dialog lists `lib/global/theme.dart` and `lib/global/app_state.dart` while the files created are `lib/globals/themes.dart` and `lib/globals/app_state.dart` (`theme_setup_view.dart:59-61` vs `file_template.dart:33-34`). Docs should name the real paths; flag the UI text to the product team?
