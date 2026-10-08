---
title: Project settings
description: Change your app's name, identifiers, version and icon, set permissions, manage keys and constants, and find every other project setting.
sidebar_label: Project settings
keywords: [App Settings, project details, settings, app name, bundle identifier, package name, app icon, build version, build number, permissions, constants, secret keys, experimental flags, shared preferences, project ID]
---

App Settings holds everything that belongs to one project: its name, the identifiers app stores use, the app icon, permissions, keys, and the settings for packages, Git and integrations.

## Open App Settings

1. In a project, click the gear in the top bar (tooltip **Settings**), or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>.
2. Pick a page in the **Settings** list on the left.
3. Click the back arrow in the top bar (or the gear again) to return to your board.

The **General** group has these pages:

| Page | What it's for | Read more |
|---|---|---|
| **Project Details** | Names, identifiers, version, icon, sharing | This page |
| **Deployment** | Build and publish your app (cloud projects) | [Get ready to publish](../publish/index.md) |
| **Permissions** | Camera, location and other phone permissions | This page |
| **Packages** | Add packages from pub.dev | [Add packages](../code/packages.md) |
| **Git** | Your Git identity, GitHub connection and credentials for this project. It needs a plan that includes Git. | [Use Git](../code/git.md), [Connect GitHub](../code/github.md) |
| **Project Sync** | Link a cloud copy and a local copy (desktop app) | [Work with local projects](../code/local-projects.md) |
| **Constants** | Secret keys and your own values | This page |

The **Integrations** group lists **Google Maps**, **AdMob**, **RevenueCat**, **Deep Links**, **Google Sign-In**, **Stripe** and **Firebase**. Each page holds that service's keys and setup. Start at [Connect data and services](../integrations/index.md).

{/* CAPTURE: id=account-project-settings-1 | state: a project open, click the gear in the top bar so App Settings shows Project Details | show: the Settings list (General and Integrations groups) and the top of Project Details (Project Name, Package Name, App Name, Bundle Identifier, Build info, App Icon) | crop: whole editor window */}

The playground and guest sessions don't show **Deployment**, **Permissions**, **Git** or **Project Sync**: they need a saved project. **Project Sync** is also hidden on the web app.

## Name and identify your app

Open **Project Details**. Type in a field and press <kbd>Enter</kbd> to save it. **Build version** and **Build number** also save when you click out of the field.

| Field | What it does |
|---|---|
| **Project Name** | The name on your dashboard. It has no effect on the app itself. |
| **Package Name** | Flutter's internal name for the project. It can't be changed and your users never see it. |
| **App Name** | The name under the app icon on your users' devices. |
| **Bundle Identifier** | The unique ID that the operating system and app stores use for your app. |
| **Build version** | Your app's version, such as `1.3.4`. |
| **Build number** | A whole number that identifies the build. Raise it each time you upload a new build to a store. |

Two rules to know:

- A **Bundle Identifier** starts with a letter, has at least two parts separated by dots, and uses only letters and digits, for example `com.yourcompany.yourapp`. The last part needs at least two characters. Otherwise the field says "Invalid package name".
- **Build version** needs three numbers separated by dots, or Nowa says "Please enter a valid version name (e.g., 1.3.4)". **Build number** needs digits only, or Nowa says "Please enter a valid number". Nowa saves both together in your `pubspec.yaml`, as in `1.3.4+7`.

Set the **Bundle Identifier** before you publish. [Publish to the App Store](../publish/ios.md) and [Publish to Google Play](../publish/android.md) rely on it.

## Change the app icon

1. In **Project Details**, find **App Icon**.
2. Click **Change all** to set one image for every platform, or click the tile for **Android**, **iOS**, **Web** or **macOS** to change only that one. A tile shows **Change Icon** when you point at it.
3. Pick an image file. Nowa creates the icon sizes for you.

The image can be at most 1024 by 1024 pixels. If it's bigger, a red message says "Exception: Icon must be 1024x1024 or smaller". **Change all** also creates Windows icons.

## Set permissions

Apps ask users for permission before they use the camera, the microphone or their location. **Permissions** turns those requests on for your app.

1. Open **Permissions**.
2. Under **iOS:** or **Android:**, flip the switch for each permission your app needs.
3. For an iOS permission you turned on, edit the message in the box beside it. Users read it in the permission prompt. Nowa fills in a default.

Permissions already in an imported project show as on.

:::warning
Nowa generates the Android manifest and the iOS `Info.plist` from your settings and rewrites the matching file whenever you change a permission here. Edits you make to those two files by hand can be lost.
:::

| Platform | Permissions |
|---|---|
| **iOS** | **Camera**, **Microphone**, **Photo Library**, **Photo Library Add**, **Location When In Use**, **Location Always**, **Location Always and When In Use**, **Speech Recognition**, **User Tracking** |
| **Android** | **Camera**, **Microphone**, **Read Storage**, **Write Storage**, **Boot Completed**, **Fine Location**, **Coarse Location** |

If a package you added needs a permission, **Problems** says so and offers **Fix** to turn it on. See [Find and fix problems](../test/problems.md).

## Manage keys and constants

**Constants** holds the values that live in your app's code, such as Stripe, RevenueCat and Google Sign-In keys, plus constants of your own.

- An integration that keeps its values here gets its own section. Type a value and press <kbd>Enter</kbd>. Changes show up on that integration's page too, and the other way around. Keys that Nowa writes into your Android, iOS or web files, such as Google Maps and AdMob keys, live on their own pages under **Integrations**.
- Under **Custom Constants**, click **+** (tooltip **Add custom constant**), type a **Name** and a **Value**, and click the check mark (**Confirm**). The × button (**Remove**) deletes one. With none yet, Nowa says "No custom constants defined. Click + to add one."

Nowa stores constants in `lib/globals/app_constants.dart`, which is part of your app's code. Don't put secrets there that must stay on a server, and remember that making a project public exposes them. See [Keys and constants](../integrations/constants.md).

## Share your project

At the bottom of **Project Details**, **Sharing** sets the **Cover** image shown on your project card. For cloud projects it also has a **Public project** switch, which gives you a link anyone can open to edit their own copy.

Turning it on opens "Make this project public?". Every file, including any keys, becomes readable, so you tick a checkbox and click **Make public** to confirm. View Only members and playground sessions don't see **Sharing**. For the link options, see [Share your app](../test/share.md).

## Experimental flags {#experimental-flags}

<Badge type="beta" />

**Project Details** → **Experimental flags** → **Edit** opens a short list of switches. Flip a switch, then click **Apply**. Nowa saves your project and reopens it. The button reads **Cancel** if you changed nothing.

| Flag | What it does |
|---|---|
| **load packages** | Lets Nowa AI add packages to your project. With it off, Nowa AI asks you to turn it on first. Adding packages yourself in **Packages** works either way. It's on in new projects. |
| **New UX** | An alternative editor layout. The panel icons move from the left rail into the top bar, with a **More panels** menu for the rest, and a **Debug** panel is added. It's off by default, and a **NEW UX** badge shows in the top bar while it's on. |

## Shared Preferences and the project ID

- **Shared Preferences** → **Clear** erases the values your app saved with Shared Preferences while you tested it on the board.
- Click the name at the left of the status bar. A small popup shows the **Project Name:** and **Project ID:**. Click the ID to copy it ("Copied").

## Next steps

- [Account settings](./account-settings.md) for your profile, plan and sign-in
- [Publish](../publish/index.md) once your app name, icon and version are ready
- [Connect data and services](../integrations/index.md)
