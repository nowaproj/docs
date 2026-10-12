# P14-B12 for-code: facts moved off the batch pages

Each bullet is copied unchanged from the page named in brackets (verified in earlier rounds). Grouped under the
anchors of `docs/code/generated-code.md`.

## #project-files

- [`test/problems.md`, "Fix a problem with one click", row `Main file is not found` or `Main function is not found`]
  Opens **Reset main file**. Click **Reset** to write a new `lib/main.dart` with the default setup.
- [`test/problems.md`, warning under the same table] **Reset** replaces `lib/main.dart` with a fresh default file.
  Anything you added to the old one is gone, so use it only when the file is missing or broken.
- [`test/run.md`, "Fix a preview that won't start"] The preview runs your app as a web app, so the app needs a
  `lib/main.dart` and a `web/` folder. If something is missing, Nowa says so when you click **Run**.
- [`test/run.md`, same section] **Nothing to run**: Nowa can't find `lib/main.dart`, or the folder holds no Dart
  package. Click **Close**. You can still browse and edit the files, but there is no app to preview.
- [`troubleshooting/index.md`, "The preview won't start"] "Nothing to run": Nowa can't find `lib/main.dart`, or the
  folder holds no Dart package. For a missing `lib/main.dart`, click **Fix** on "Main file is not found" in
  **Problems**, then click **Run** again.

## #packages

- [`test/problems.md`, "Fix a problem with one click", row `'<package>' is imported but is not in the pubspec.`]
  Adds the package, at its latest version. A package that `pubspec.yaml` lists with `sdk:`, `git:` or `path:` doesn't
  cause this problem.

## #firebase

- [`troubleshooting/known-issues.md#firebase-reload-after-connect`] In Nowa 3.13, if you reload the page or close Nowa
  soon after **Connect Apps**, the connection can be lost before it's saved. The Firebase files disappear,
  `lib/main.dart` points at a missing `firebase_options.dart` so the project doesn't compile, and **Settings** →
  **Integrations** → **Firebase** asks for your project again.

Total: 7 bullets (`#project-files` 5, `#packages` 1, `#firebase` 1).
