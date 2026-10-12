# P14-B02 for-code: facts moved off the Nowa AI pages

Code-only facts moved off `docs/ai/` pages in phase 14 (rule R2), copied unchanged, grouped by the anchors of
`docs/code/generated-code.md`. Each bullet names its source page.

## #project-files

- From `docs/ai/index.md` ("What Nowa AI can do" table, row "Edit other files"): "Changes files such as `pubspec.yaml` and platform files, and creates new ones."
- From `docs/ai/prompting.md` ("Save standing rules with Custom Instructions"): "Nowa stores them in the project, in `.nowa/assistant_instructions.md`, so they travel with it."
- From `docs/ai/undo-and-history.md` ("Reapply a checkpoint", rules list): "Checkpoints are saved with your project, in its `.nowa/temp/` folder, which Git ignores."
- From `docs/ai/external-agent.md` ("What your agent can do", safeguards): "Direct edits to `Info.plist` and `AndroidManifest.xml` are refused, because Nowa generates them from your settings. Your agent uses `set_permissions` instead."

## #themes

- From `docs/ai/connectors.md` ("Connect Figma"): "Nowa AI writes the theme results to your theme files, such as `lib/globals/app_colors.dart` and `lib/globals/app_text.dart`."

## #supabase

- From `docs/ai/connectors.md` ("Connect Supabase"): "It also writes the matching functions in your app's `SupabaseService`, so your screens can use what it built."

## #assets

- From `docs/ai/external-agent.md` ("What your agent can do" table, row "Setup", tool `add_image_assets`): "Add images from links or local files to `assets/images/` and register them."
