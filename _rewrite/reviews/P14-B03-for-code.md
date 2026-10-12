# P14-B03 for-code: facts moved off the account pages

Each bullet is copied unchanged from the page named in brackets (the text was verified in earlier phases). Code refs
are relative to `/home/user/nowa-master` (3.13.0) and only help the orchestrator place the fact.

## #project-files

- [`account/project-settings.md`, "Name and identify your app", about **Build version** and **Build number**] "Nowa saves both together in your `pubspec.yaml`, as in `1.3.4+7`." (`packages/core/lib/src/settings/project_detail_settings.dart:303,329` set `pubspecManager.buildInfo`)
- [`account/project-settings.md`, "Set permissions", warning] "Nowa generates the Android manifest and the iOS `Info.plist` from your settings and rewrites the matching file whenever you change a permission here. Edits you make to those two files by hand can be lost." (`packages/core/lib/src/services/permissions_service.dart:56-82`, `writeTemplate(... androidManifest : infoPlist)` at `:81`)
- [`account/projects.md`, "Name your project", identifiers table, **Package Name** row] "The Flutter package name in `pubspec.yaml`. For a new local project Nowa builds it from your name: lowercase, spaces become underscores, and a leading digit is spelled out, so `1project` becomes `one_project`. An imported project keeps the name it already has." (`packages/core/lib/src/file_system/naming.dart:193-216` `generatePackageName`, `packages/core/lib/src/services/local_project_service.dart:25-28`; Package Name field reads `flutterProjectName`, `packages/core/lib/src/providers/project_provider.dart:583`)
- [`account/projects.md`, "Fix \"Project not found\"", about **Locate folder**] "(it must contain a `pubspec.yaml`)" (`packages/core/lib/src/services/local_project_service.dart:103-107`, `checkIfValidProject`)

- [`account/project-settings.md`, "Name and identify your app" and the "Set permissions" warning; **added by verifier P14-B03-V**, new fact verified in 3.13.0, not moved text] "Changing the **App Name** regenerates `android/app/src/main/AndroidManifest.xml` and `ios/Runner/Info.plist` from Nowa's templates, rewrites the `<title>` line of `web/index.html` and updates the macOS, Linux and Windows app names. Changing the **Bundle Identifier** regenerates `android/app/build.gradle.kts` and the Kotlin `MainActivity` for the new package, and sets every `PRODUCT_BUNDLE_IDENTIFIER` line in `ios/Runner.xcodeproj/project.pbxproj` (all targets, test and extension targets included) to the new ID. A regenerated file keeps only what Nowa's template and your settings put in it, so in an imported project anything else in it is dropped." (`packages/core/lib/src/project/rename.dart:29-67,117-125,161-173,263-272`; `packages/core/lib/src/file_system/templates/file_template.dart:19-23,87-89`; `packages/core/lib/src/services/permissions_service.dart:12-15`, comment "that regenerates the file from Nowa's template, which wipes everything a brownfield project has")

## #constants

- [`account/project-settings.md`, "Manage keys and constants"] "Nowa stores constants in `lib/globals/app_constants.dart`, which is part of your app's code." (`packages/core/lib/src/interpreter/packages/package_config/app_constants_service.dart:13`)
- [`account/project-settings.md`, "Manage keys and constants"] "Keys that Nowa writes into your Android, iOS or web files, such as Google Maps and AdMob keys, live on their own pages under **Integrations**."
