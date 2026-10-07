---
title: Add packages
description: Add, update and remove pub.dev packages in App Settings, and see how Nowa loads them onto the board.
sidebar_label: Packages
keywords: [packages, pub.dev, pubspec, dependencies, add package, remove package, update package, package version, pub get, Packages settings, Add New Package, load packages, plugin, library, dev dependency]
---

Packages are ready-made building blocks from [pub.dev](https://pub.dev), Flutter's package site, such as animations, charts or date tools. Add one in App Settings and Nowa writes your `pubspec.yaml`, loads the package and checks your project for you.

## Open the Packages page

1. Click the gear in the top bar (**Settings**), or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. See [Project settings](../account/project-settings.md#open-app-settings).
2. In the **General** group of the **Settings** list, click **Packages**.

The page lists your packages in a table with a **Name** and a **Version** column. Type in the **Search...** box to filter the list by name.

New projects start with `nowa_runtime`, `provider`, `shared_preferences`, `dio` and `go_router`. Leave `nowa_runtime` in place, because the code Nowa writes imports it.

{/* CAPTURE: id=code-packages-1 | state: playground starter open; click the gear (Settings) → Packages, click Add New Package, type "intl" and pick the first suggestion so the version fills in (needs network access to pub.dev) | show: the Packages page with the Name and Version table, the Search... box and Add New Package, and the New Package dialog with the name field, the version field, Cancel and Add | crop: the settings content area with the dialog */}

## Add a package

1. Click **Add New Package** under the table. The **New Package** dialog opens.
2. Start typing the package name. Nowa suggests matching packages from pub.dev. Pick one, or type the full name.
3. Check the version. Nowa fills in the latest one as a caret version such as `^2.1.0`. Change it if you need another.
4. Click **Add**. "Loading packages..." shows under the table while Nowa works, then the package appears in the list.

Nowa adds the package to `pubspec.yaml`, loads it so the board knows what it offers, and refreshes **Problems**.

The dialog tells you what's wrong: "This field is required" for an empty name or version, "Package is already installed" for a name that's already in the list, and a red error when pub.dev has no package with that name.

A few packages need phone permissions, such as `geolocator` for location. For those, **Add Missing Dependencies** opens with "Package `<name>` requires the following dependencies" and lists each one. Click **Add** to turn them on, or **Cancel** to stop adding the package. The same dialog appears when you add a widget that needs a package. See [Add widgets](../design/add-widgets.md#add-a-widget-that-needs-a-package).

## Change a version

1. In the table, click the package's **Version** and type the new version, such as `^3.0.0`.
2. Press <kbd>Enter</kbd>. Nowa updates `pubspec.yaml` and loads the package again at that version.

In a local project Nowa also runs `flutter pub get`.

## Remove a package

Point at the package's **Version** and click the **×** at its right end. Nowa removes it from `pubspec.yaml` and unloads it. In a local project it also runs `flutter pub get`.

Code that still imports the package shows a problem: `'<name>' is imported but is not in the pubspec.` Remove the import, or click **Fix** in **Problems** to add the latest version back.

## How Nowa loads your packages

- **Plain pub.dev packages only.** Nowa loads the packages under `dependencies` that list only a version. A package from Git, a local path or another host, an `sdk:` package, and anything under `dev_dependencies` isn't loaded. If your code imports a dev dependency, **Problems** says `'<name>' is a dev dependency, so Nowa does not load it. Move it to dependencies to use it in lib/.`
- **Only the packages you list.** Packages that your packages depend on aren't loaded for you. If your code imports one, add it to your list too.
- **After the project opens.** Packages load in the background. **Problems** shows "Loading packages..." and reports nothing until they finish.
- **When one won't load.** **Problems** says `'<name>' is installed but failed to load, so nothing it defines is available:` and gives the reason.
- **Built-in support or placeholders.** Nowa has built-in support for popular packages, such as `provider`, `go_router`, `dio`, `shared_preferences`, `flutter_svg`, `lottie` and `rive`. For any other package, Nowa reads what it offers, but its widgets show as placeholders on the board and its functions return stand-in values. **Run** uses the real package. See [What Nowa can show on the board](limitations.md).
- **`nowa_runtime`.** Nowa keeps it at the version your Nowa release expects, so a version you type for it is reset when the project opens.

:::note
Nowa doesn't list or load packages from Git, a local path or another host, so **Problems** may say such a package "is imported but is not in the pubspec." Don't click **Fix** for it. **Fix** looks the name up on pub.dev and, if it finds a package, writes that version over your entry.
:::

## Edit pubspec.yaml yourself

`pubspec.yaml` is a normal file in [code mode](code-mode.md). To have Nowa load a new package right away, add it on the **Packages** page instead. After you change `pubspec.yaml` by hand, click **Pub get** (the terminal icon) in the **Logs** tab of the **Console** to fetch the packages. See [Run your app](../test/run.md#read-the-logs).

Nowa also keeps the `assets` and `fonts` lists in `pubspec.yaml` in step with your `assets/` folder. See [Images, videos and other files](../design/assets.md).

:::tip Or ask Nowa AI
Try "Add the `intl` package and show each order's date as 12 March 2026." Nowa AI can add and remove packages for you. In **Plan** mode it only writes the plan. If the **load packages** switch is off, Nowa AI asks you to turn it on. It's on in new projects. See [Experimental flags](../account/project-settings.md#experimental-flags).
:::

## Next steps

- [Write your own code](custom-code.md)
- [What Nowa can show on the board](limitations.md)
- [Find and fix problems](../test/problems.md)
- [Run your app](../test/run.md)
