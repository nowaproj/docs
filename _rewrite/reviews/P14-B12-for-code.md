# P14-B12 for-code: facts moved off the batch pages

Each bullet is copied unchanged from the page named in brackets (verified in earlier rounds). Grouped under the
anchors of `docs/code/generated-code.md`.

## #project-files

- [`test/problems.md`, "Fix a problem with one click", row `Main file is not found` or `Main function is not found`]
  Opens **Reset main file**. Click **Reset** to write a new `lib/main.dart` with the default setup.
- [`test/problems.md`, warning under the same table] **Reset** replaces `lib/main.dart` with a fresh default file.
  Anything you added to the old one is gone, so use it only when the file is missing or broken.

## #packages

- [`test/problems.md`, "Fix a problem with one click", row `'<package>' is imported but is not in the pubspec.`]
  Adds the package, at its latest version. A package that `pubspec.yaml` lists with `sdk:`, `git:` or `path:` doesn't
  cause this problem.

## #firebase

- [`troubleshooting/known-issues.md#firebase-reload-after-connect`] In Nowa 3.13, if you reload the page or close Nowa
  soon after **Connect Apps**, the connection can be lost before it's saved. The Firebase files disappear,
  `lib/main.dart` points at a missing `firebase_options.dart` so the project doesn't compile, and **Settings** →
  **Integrations** → **Firebase** asks for your project again.
