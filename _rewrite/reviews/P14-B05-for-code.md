# P14-B05 for-code hand-off (facts moved off the design pages)

Each bullet is copied unchanged from the page named in brackets (the text was verified in earlier phases). Group
headings are the anchors of `docs/code/generated-code.md`. Code refs for each fact are in `P14-B05-notes.md` and in
`W4-writer-notes.md` / `W30b-writer-notes.md`.
Relative links inside moved bullets are relative to `docs/design/` (where they came from): from
`docs/code/generated-code.md`, `../code/packages.md#how-nowa-loads-your-packages` becomes `packages.md#how-nowa-loads-your-packages`.

## #themes

- [design/themes.md, Open the Themes panel] Each theme is a variable of type `ThemeData` in `lib/globals/themes.dart`, and Nowa writes your edits to that file. Variables of other types in the file aren't listed as themes. A `ThemeData` variable that a function builds is listed too.
- [design/themes.md, note under Open the Themes panel] If a theme doesn't set a color scheme yet, Nowa adds one when you open it: `ColorScheme.fromSeed` with a purple seed.
- [design/themes.md, Apply a theme] Nowa saves the choice in your code: in new projects it is the starting theme in `lib/globals/app_state.dart`.
- [design/themes.md, Edit text styles, about **Default Font**] It appears for themes written as `ThemeData(...)`.
- [design/themes.md, Edit theme extensions] A theme written as `ThemeData(...)` also keeps a **Default Theme** tab, first. A theme that a function or `copyWith` builds shows only its extension tabs. A color that points to another color, such as `AppColors.primary`, shows as the color it reads.
- [design/themes.md, Add themes to a project that has none] If a project has no `lib/globals/themes.dart`, the panel shows an error and a **Create Theme Setup** button. Click it, then click **Create**. Nowa creates `lib/globals/themes.dart` (with `lightTheme` and `darkTheme`) and `lib/globals/app_state.dart`, and skips any that already exist. Projects you create in Nowa already have both files.
- (Context for the orchestrator, not page text: the **Create Theme Setup** dialog itself lists `- lib/global/theme.dart` and `- lib/global/app_state.dart`, but the files it creates are `lib/globals/themes.dart` and `lib/globals/app_state.dart`: `packages/core/lib/src/file_system/widgets/previews/main_preview/theme_setup_view.dart:55-62` vs `packages/core/lib/src/file_system/templates/file_template.dart:33-34`; product issue P13. Worth one line on the code page so people who compare don't get confused.)
- [design/theme-styles.md, Colors from theme extensions] In your code the field reads `AppColors.of(context).brand`, or `Theme.of(context).extension<AppColors>()!.brand` if the class has no `of`.
- [design/theme-styles.md, Bring in a theme from Figma] It writes them into theme files under `lib/globals/` and reloads your themes.

## #assets

- [design/assets.md, Import files, step 2] They are added to your project's `assets/` folder, or to the subfolder of `assets/` you clicked last (for a file, the folder it is in).
- [design/assets.md, Import files] To upload straight into a folder inside `assets/`, right-click that folder and choose **Upload assets...**.
- [design/assets.md, Import files] When you import a file, Nowa updates `pubspec.yaml` for you: every folder under `assets/` that has files is listed under `flutter:` → `assets:`, and fonts are listed under `fonts:`. You don't need to edit it.
- [design/assets.md, Use an asset in a widget, step 3] To add a new file, click **Upload Image** and choose it from your computer. It is saved in `assets/`.
- [design/assets.md, Paste an image onto the board] Nowa saves the image in `assets/` as `pasted_image_<id>` and places an Image widget where your pointer is.
- [design/assets.md, Rename, remove and find files] To move a file, drag its row onto another folder in `assets/`.

## #fonts-and-icons

- [design/fonts-icons.md, Pick a font] Google Fonts download into your project when you pick them. Nowa saves the family's regular file as `assets/fonts/<Font Name>.ttf` and registers it in `pubspec.yaml`.
- [design/fonts-icons.md, Import your own font] Nowa saves the file in `assets/fonts/`, registers it in `pubspec.yaml` and selects it.
- [design/fonts-icons.md, Filter the font list, **Imported by you**] Font files in your project's `assets/` folder, including Google Fonts you have already used.
- [design/fonts-icons.md, section "Declare fonts yourself", moved whole] If you declare fonts under `flutter:` → `fonts:` in `pubspec.yaml`, with your own families, weights and styles, Nowa keeps your declarations and the board shows each family under its own name. Nowa adds a family for each font file in `assets/` that you haven't declared, named after the file, and removes declarations whose files no longer exist.
- [design/fonts-icons.md, "Declare fonts yourself"] The **Fonts** popup lists font files by file name, not the family names you declare.
- [design/fonts-icons.md, "Declare fonts yourself"] If your own code uses the `google_fonts` package, for example `GoogleFonts.poppins()`, Nowa runs it on the board. The package is one of the [built-in packages](../code/packages.md#how-nowa-loads-your-packages).
- (Context, not page text: Nowa AI's font tool avoids the `google_fonts` package and downloads the family into `assets/fonts/<name>.ttf` instead, "so it can be used directly via TextStyle(fontFamily: '<name>')": `packages/ai/lib/src/tools/download_font_tool.dart:4-10`.)

## #screens-and-routes

- [design/templates.md, Name a single-file template, step 1] Screens go in `lib/pages/` and components in `lib/components/`.
- (Context, not page text: the route a single-file screen template gets is `'/${screen.name.camelCaseToHyphenCase()}'`, added only by the GoRouter routing service: `packages/core/lib/src/file_system/actions/file_actions.dart:48-53`. The **Google Button** template's own file path is `lib/google_button.dart`, but the naming dialog saves single-file templates in the components or pages folder: `file_actions.dart:59-66`.)

## #components

- [design/templates.md, Name a single-file template, step 1] Screens go in `lib/pages/` and components in `lib/components/`. (Same sentence as under `#screens-and-routes`; use it once.)

## #localization

- [design/localization.md, Run your app in several languages] Nowa AI can't add the `flutter_localizations` package to a project. Its package tool refuses the package and tells the agent to use a different approach.
- [design/localization.md, Run your app in several languages] If your `pubspec.yaml` already lists `flutter_localizations` as an SDK package (`flutter_localizations: {sdk: flutter}`), Nowa counts it as installed, so **Problems** no longer says it is missing from the pubspec. Nowa AI still doesn't add it for you.
- [design/localization.md, Run your app in several languages] If a localization delegate in your project fails to load, the board keeps drawing. **Logs** says "Could not load" followed by the delegate's name and the error. (Kept on the page in plain words; the delegate wording is for this section.)
