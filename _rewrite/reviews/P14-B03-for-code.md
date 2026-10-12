# P14-B03 for-code: facts moved off the account pages

Each bullet is copied unchanged from the page named in brackets (the text was verified in earlier phases). Code refs
are relative to `/home/user/nowa-master` (3.13.0) and only help the orchestrator place the fact.

## #project-files

- [`account/project-settings.md`, "Name and identify your app", about **Build version** and **Build number**] "Nowa saves both together in your `pubspec.yaml`, as in `1.3.4+7`." (`packages/core/lib/src/settings/project_detail_settings.dart:303,329` set `pubspecManager.buildInfo`)
- [`account/project-settings.md`, "Set permissions", warning] "Nowa generates the Android manifest and the iOS `Info.plist` from your settings and rewrites the matching file whenever you change a permission here. Edits you make to those two files by hand can be lost." (`packages/core/lib/src/services/permissions_service.dart:56-82`, `writeTemplate(... androidManifest : infoPlist)` at `:81`)
- [`account/projects.md`, "Name your project", identifiers table, **Package Name** row] "The Flutter package name in `pubspec.yaml`. For a new local project Nowa builds it from your name: lowercase, spaces become underscores, and a leading digit is spelled out, so `1project` becomes `one_project`. An imported project keeps the name it already has." (`packages/core/lib/src/file_system/naming.dart:193-216` `generatePackageName`, `packages/core/lib/src/services/local_project_service.dart:25-28`; Package Name field reads `flutterProjectName`, `packages/core/lib/src/providers/project_provider.dart:583`)
- [`account/projects.md`, "Fix \"Project not found\"", about **Locate folder**] "(it must contain a `pubspec.yaml`)" (`packages/core/lib/src/services/local_project_service.dart:103-107`, `checkIfValidProject`)

## #constants

- [`account/project-settings.md`, "Manage keys and constants"] "Nowa stores constants in `lib/globals/app_constants.dart`, which is part of your app's code." (`packages/core/lib/src/interpreter/packages/package_config/app_constants_service.dart:13`)
- [`account/project-settings.md`, "Manage keys and constants"] "Keys that Nowa writes into your Android, iOS or web files, such as Google Maps and AdMob keys, live on their own pages under **Integrations**."
