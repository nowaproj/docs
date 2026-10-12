---
title: What Nowa adds to your code
description: The files, classes, functions, packages and platform settings Nowa adds to your Flutter project for each feature, for when you read or edit the code yourself.
sidebar_label: What Nowa adds
keywords: [generated code, files, classes, services, lib folder, main.dart, packages, pubspec, platform files, Info.plist, AndroidManifest, integrations code, hybrid approach, .nowa, settings.json, router.dart, GoRouter, AppConstants, SupabaseService, FirebaseService, FirestoreService, NotificationService, StripePaymentService, RevenuecatService, codemagic.yaml, Podfile, MainActivity]
---

Everything you build in Nowa ends up as ordinary Flutter code in your project, and this page shows you where it lives. Look up a feature to see the files, classes, packages and platform settings Nowa added when you turned it on, and what goes away when you turn it off. You never need any of this to build your app with Nowa AI and the board: it's here for the moments you open the code yourself, in [code mode](code-mode.md) or [VS Code](vs-code.md).

## Project files {#project-files}

For a map of the whole project, see [What's in your project](index.md#whats-in-your-project). Code that Nowa owns carries the `@NowaGenerated` tag, explained in [How code and design stay in sync](index.md#how-code-and-design-stay-in-sync).

### `lib/main.dart`

A new project's `main()` looks like this:

```dart
@NowaGenerated()
main() async {
  WidgetsFlutterBinding.ensureInitialized();
  sharedPrefs = await SharedPreferences.getInstance();

  runApp(const MyApp());
}
```

- Nowa writes this `main()` itself. It rebuilds it from that template plus the start-up lines your integrations need, which it keeps in `.nowa/settings.json` under `main` and places between the `sharedPrefs` line and `runApp`. Lines you add to it by hand don't last.
- A `main()` you write yourself, without `@NowaGenerated`, stays exactly as you wrote it. Nowa adds start-up lines only to its own `main()`, so with yours, add them from the table below.
- `sharedPrefs` is a top-level `SharedPreferences` instance that Nowa's code uses to save values on the device. See [Actions and popups](#actions-and-popups).
- `MyApp` builds a `MaterialApp.router` inside a `MultiProvider` that provides your global states. Its `theme` is `AppState.of(context).theme`, and its `routerConfig` is `appRouter` from `lib/globals/router.dart`.
- If a start-up line is missing from the list, **Problems** says `Setup statement in main.dart for "<key>" is required but not found.`, and **Fix** adds it back.

| Feature | Start-up line in `main()` |
|---|---|
| Firebase | `await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);` |
| Supabase | `await SupabaseService().initialize();` |
| Push notifications | `await NotificationService.instance.initialize();` |
| RevenueCat | `await RevenuecatService().configureRevenuecat();` |
| AdMob | `await MobileAds.instance.initialize();` |
| Stripe | `Stripe.publishableKey = AppConstants.stripePublishableKey;`, plus `Stripe.merchantIdentifier = '<merchant ID>';` once you deploy with Apple Pay on |
| **Remove # in URLs** | `usePathUrlStrategy();` |

Each line brings its own import, and they all run before `runApp`, so Firebase, Supabase and the rest are ready before your first screen opens.

You can't delete `lib/main.dart`. If it goes missing anyway, or loses its `main()`, **Problems** offers **Fix**, which opens **Reset main file**. **Reset** writes a fresh `lib/main.dart` and replaces everything in the old one. That file uses Flutter's `Navigator` (a `MaterialApp` with `initialRoute` and `routes`), expects a `HomePage` class in `lib/pages/home_page.dart`, and its `MultiProvider` lists only `AppState`. So afterwards:

- In a GoRouter project, make `MyApp` return `MaterialApp.router(routerConfig: appRouter, ...)` again and import `globals/router.dart`, yourself or with Nowa AI. Don't use **Enable GoRouter** in the Router panel for this: it replaces `lib/globals/router.dart` with a single route for the home screen.
- Attach your other global states again ([Global state](#global-state)).

See [Find and fix problems](../test/problems.md#fix-a-problem-with-one-click).

### `pubspec.yaml`

| Entry | What Nowa puts there |
|---|---|
| `name` | The **Package Name**. For a new local project Nowa builds it from the project name: lowercase, spaces become underscores, and a leading digit is spelled out, so `1project` becomes `one_project`. An imported project keeps the name it has. |
| `version` | **Build version** and **Build number** together, as in `1.3.4+7`. Flutter passes them to iOS as `CFBundleShortVersionString` and `CFBundleVersion`, and to Android as `versionName` and `versionCode`. New projects start at `1.0.0+1`. |
| `dependencies` | Your packages. See [Packages](#packages). |
| `flutter:` → `assets:` and `fonts:` | Rebuilt from your `assets/` folder. See [Images and other assets](#assets) and [Fonts and icons](#fonts-and-icons). Nowa also keeps `uses-material-design: true`. |

### Platform files Nowa rebuilds

Nowa generates these files from its own templates plus your settings, and writes each one whole when a setting that feeds it changes:

| File | Rebuilt when you change |
|---|---|
| `android/app/src/main/AndroidManifest.xml` | The **App Name**, an Android permission (including one an integration turns on, such as **Boot Completed** for push notifications), the AdMob **Android App ID**, the Google Maps **Android API Key** or the Deep Links **Host** |
| `android/app/build.gradle.kts` | The **Bundle Identifier**, the Firebase connection or push notifications |
| `android/settings.gradle.kts` | The Firebase connection |
| `ios/Runner/Info.plist` | The **App Name**, an iOS permission or its message (including one an integration turns on, such as **Camera** for a Stripe deploy), the AdMob **iOS App ID**, the Google Sign-In **iOS Client ID**, the Firebase **Google** or **Phone** sign-in provider, or the Deep Links **URL Scheme** |
| `ios/Podfile` | An integration that needs a newer iOS version: `platform :ios, '...'` is set to the highest one |
| `ios/Runner/AppDelegate.swift` | The Google Maps **iOS API Key** |
| `web/index.html` | The Google Maps **Web API Key**. The **App Name** changes only its `<title>` line. |

Turning one of those integrations off rebuilds its files too. And when you open a project whose `web/index.html` still uses Flutter's older web loader (it doesn't load `flutter_bootstrap.js`), Nowa replaces that file with its own template.

:::warning
A rebuilt file keeps only what Nowa's template and your settings put in it. Anything you added by hand, or that an imported project already had, is gone at the next rebuild. The one exception is permissions: the first time Nowa opens a project, it records the Android permissions in the manifest, and the iOS ones on its own list, and keeps writing those. Commit your project with [Git](git.md) before you change permissions, the **App Name**, the **Bundle Identifier** or an integration, so you can compare and put back what you need.
:::

A few more changes happen outside those files:

- **Bundle Identifier** also sets every `PRODUCT_BUNDLE_IDENTIFIER` line in `ios/Runner.xcodeproj/project.pbxproj` to the new ID (test and extension targets included) and updates `macos/Runner/Configs/AppInfo.xcconfig` and `linux/CMakeLists.txt`. On Android it deletes the deepest folder under `android/app/src/main/kotlin/` that the old and new IDs share, with every Kotlin file in it: `com.example.app` to `com.acme.app` deletes all of `kotlin/com/`, and a change in the first part deletes all of `kotlin/`. Then it writes a fresh `MainActivity.kt`, a `FlutterFragmentActivity`. It doesn't touch `Info.plist`.
- **App Name** also updates the app name in the macOS, Linux and Windows runner files.
- **Permissions** are stored under `permissions` in `.nowa/settings.json`, and Nowa writes them into the manifest and `Info.plist`. See [Set permissions](../account/project-settings.md#set-permissions).
- Integrations edit a few more files, such as `MainActivity.kt` and `ios/Runner/Runner.entitlements`. Their sections below list them.
- Nowa AI can edit any project file, `pubspec.yaml` and platform files included, and create new ones. Its edits to the files in the table last only until Nowa rebuilds them. A [connected external agent](../ai/external-agent.md) can't edit `Info.plist` or `AndroidManifest.xml` at all: Nowa refuses the edit and points it to its `set_permissions` tool.

### The `.nowa` folder

| Path | What it holds |
|---|---|
| `.nowa/settings.json` | The settings Nowa keeps for the project: the app name and bundle ID, permissions, the start-up lines for `main()`, experimental flags, the integration keys that go into platform files (under `packages`), and your Firebase and Stripe setup. |
| `.nowa/assistant_instructions.md` | Your Nowa AI [Custom Instructions](../ai/prompting.md#custom-instructions), so they travel with the project. |
| `.nowa/temp/` | Nowa AI checkpoints. They're an undo button, not a backup: `.nowa/.gitignore` keeps this folder out of Git. |
| `.nowa/thumbnail.png` | Your project's cover in the projects list: a screenshot of the board, taken when Nowa saves while a board is open, or the image you picked. `.nowa/.gitignore` keeps it out of Git too. |
| `.nowa/icon.<ext>` | The last image you picked as your app icon, which Nowa makes the platform icons from. |

The **Files** tree in code mode doesn't list folders whose names start with a dot, so open `.nowa` in VS Code or your file manager.

### Boards, the Library and Run

- Boards are `.board` files in the `boards` folder, subfolders included, named in lowercase with underscores: **Login flow** becomes `login_flow.board`. They're for Nowa only and aren't part of your app's code.
- A loose widget, one you drop straight onto a board, is saved only in its board file. It isn't part of your app until you place it inside a screen.
- The Library's **Project** chip shows the folders of `lib/` and what they declare. **Rename** renames the file too when it's named after the widget, **Delete** removes the file when the widget is the only thing in it, and dragging a row onto a folder moves the file. Files in `lib` stay in `lib`, and assets stay in `assets`. See [Manage project files](files.md).
- **Locate folder**, for a local project Nowa can't find, accepts only a folder that contains a `pubspec.yaml`.
- The **Run** preview builds your app as a web app, so it needs `lib/main.dart` and a `web/` folder. **Nothing to run** means Nowa found no `lib/main.dart` or no Dart package. **Web support is missing** offers **Add web support**, which generates the missing files (with `flutter create` in a local project). See [Fix a preview that won't start](../test/run.md#fix-a-preview-that-wont-start).

## Screens and routes {#screens-and-routes}

To add and set up screens, see [Create and set up screens](../design/screens.md).

- **Files.** A screen is a widget class in its own Dart file. When you add one from a template, the naming dialog (titled after the template, such as **New Empty Page**) shows the **Class name** and the file **Path**: screens go in `lib/pages/` and components in `lib/components/`. New projects start with `HomePage` in `lib/pages/home_page.dart`.
- **Screen or component.** Nowa treats a widget class as a screen when its `build` returns a `Scaffold`, on its own or inside wrappers. Every other widget class is a component.
- **Rename** updates every place that uses the screen. It also renames the file when the file is named after the screen, and always when you rename from **Details**.
- **Add description** writes a doc comment (`///`) above the class. The Library's details card and the widget picker show it.
- **Copy as new widget** creates a separate class in a new file.
- **Remove** takes the screen off the board. Its file stays in your project.
- **Routes in GoRouter projects**, which new projects are (one saved from the **Simple app** playground uses `Navigator`): a screen you add from a single-file template gets a route in `lib/globals/router.dart`, its class name in lowercase with hyphens, so `HomePage` gets `/home-page`. Screens from multi-file templates, such as the **Authentication Template**, start without one. See [Navigation](#navigation).
- **Routes in older Navigator projects:** Nowa keeps the `routes` map of `MaterialApp` in `lib/main.dart`, with one entry per public screen in `lib/` whose constructor has no required parameters, keyed by its class name (`'HomePage'`). The home screen is the `initialRoute`.

## Components {#components}

To build and reuse components, see [Build reusable components](../design/components.md).

- **Create component** saves the component as a Dart file directly in `lib/`, named after it: `ProductCard` goes in `lib/product_card.dart`. Components you add from a template (**New Widget...**) go in `lib/components/`.
- Adding the first variable turns the component into a `StatefulWidget` with a `State` class that holds its variables. There's nothing to set up.
- **Copy as new widget**, on an instance's right-click menu, creates a separate component in its own file.
- **Rename** updates every use and renames the file when it's named after the component. **Delete** removes the file when the component is the only thing in it.
- Flutter's `@Preview` annotation adds variants that show under the component. See [Preview a widget in several states](custom-code.md#preview-variants).

## Themes {#themes}

To create and edit themes, see [Create and edit themes](../design/themes.md).

- **Where themes live.** Each theme is a top-level `ThemeData` variable in `lib/globals/themes.dart`, and the **Themes** panel writes your edits there. New projects have `lightTheme` and `darkTheme`, built on `ColorScheme.light()` and `ColorScheme.dark()`. A `ThemeData` variable that a function builds is listed too; variables of other types aren't. **Open in New Tab** opens your themes as code.
- **New themes** you create in the panel are named `newTheme` at first and use `ColorScheme.fromSeed(seedColor: Color(0xFF673AB7))`. If you open a theme that sets no color scheme, Nowa adds the same `ColorScheme.fromSeed(seedColor: Color(0xFF673AB7))`, Material's deep purple.
- **The applied theme.** In new projects `MaterialApp` reads `AppState.of(context).theme`, so **Apply** sets the starting value of `_theme` in `AppState` (`lib/globals/app_state.dart`), and `AppState.changeTheme(theme)` switches themes while the app runs. In a project without that setup, **Apply** sets `theme:` on the `MaterialApp` in `lib/main.dart`.
- **Default Font** and the **Default Theme** tab appear for themes written as `ThemeData(...)`. A theme that a function or `copyWith` builds shows only its extension tabs.
- **Theme extensions** are classes that extend `ThemeExtension`. A widget reads an extension color as `AppColors.of(context).brand`, or as `Theme.of(context).extension<AppColors>()!.brand` when the class has no `of`. A color that points to another color, such as `AppColors.primary`, shows as the color it reads.
- **Figma.** With the Figma connector on, Nowa AI writes theme files under `lib/globals/`, such as `app_colors.dart` and `app_text.dart`, and reloads your themes.
- **Create Theme Setup**, for a project that has no `lib/globals/themes.dart`, creates that file (with `lightTheme` and `darkTheme`) and `lib/globals/app_state.dart`, and skips a file that already exists. Its dialog lists `lib/global/theme.dart` and `lib/global/app_state.dart`, but the files it creates are the two above.

## Fonts and icons {#fonts-and-icons}

To pick fonts and icons, see [Fonts and icons](../design/fonts-icons.md).

- **Google Fonts** download into your project when you pick one: Nowa saves the family's regular file as `assets/fonts/<Font Name>.ttf` and registers it in `pubspec.yaml`.
- **Your own font files** go in `assets/fonts/`, registered and selected. **Imported by you** lists the font files in `assets/`, including Google Fonts you've already used.
- **Nowa AI** downloads Google Fonts into `assets/fonts/<name>.ttf` too, instead of using the `google_fonts` package, so its text styles use `fontFamily: '<name>'`.
- **Declare fonts yourself**, for example a family made of several files: list your families, weights and styles under `flutter:` → `fonts:` in `pubspec.yaml`. Nowa keeps your declarations and drops only those whose files no longer exist. For each font file in `assets/` you haven't declared, it adds a family named after the file. The board shows each family under the name you declared, but the **Fonts** popup lists font files by file name.
- **`google_fonts`.** If your own code uses the package, such as `GoogleFonts.poppins()`, the board runs it. It's one of the [built-in packages](packages.md#how-nowa-loads-your-packages).
- **Icons** you pick are Flutter's Material icons, written as `Icons.<name>`, such as `Icons.home_outlined`. `uses-material-design: true` in `pubspec.yaml` ships the icon font with your app.

## Images and other assets {#assets}

To add and use files, see [Images, videos and other files](../design/assets.md).

- **Where files go.** Imported files go in `assets/`, or in the subfolder of `assets/` you clicked last (for a file, the folder it's in). **Upload assets...**, on a folder's right-click menu, uploads straight into that folder. Dragging a row onto another folder inside `assets/` moves the file.
- **Upload Image**, when you choose an asset for a widget, saves the file in `assets/` and selects it.
- **A pasted image** is saved as `assets/pasted_image_<id>`, with its own file extension, and Nowa places an Image widget where your pointer is.
- **Images from AI.** Images that Nowa AI saves from your chat attachments, and images a connected external agent adds with `add_image_assets`, go in `assets/images/`.
- **`pubspec.yaml`.** Nowa writes the `flutter:` → `assets:` list for you, with one entry for each folder that isn't empty, `assets/` itself and the folders in it at any depth, such as `assets/images/`. It rebuilds the whole list whenever you import a file, pick a font or add, update or remove a package, so entries for files outside `assets/` don't last. Fonts go under `fonts:`, as in [Fonts and icons](#fonts-and-icons).

## Translations {#localization}

To make your app speak several languages, see [Languages and right-to-left text](../design/localization.md).

- Nowa AI can't add the `flutter_localizations` package. Its package tool refuses it and tells the agent to use a different approach.
- If your `pubspec.yaml` already lists `flutter_localizations: {sdk: flutter}`, Nowa counts it as installed, so **Problems** no longer says it's missing from the pubspec. Like every `sdk:` package, the board doesn't load it, and Nowa AI still doesn't add it for you.
- The board runs localization delegates written in your project: a `LocalizationsDelegate` whose `load` returns your own translations class, which widgets read with `Localizations.of(context, YourClass)`. If a delegate fails to load, the board keeps drawing, and **Logs** says `Could not load <DelegateClass>: <error>`.

## Variables and functions {#variables-and-functions}

To work with logic, see [Store data in variables](../logic/variables.md), [Create functions](../logic/functions.md) and [Build logic in Circuit](../logic/circuit.md).

- **Variables** of a screen or component are fields of its `State` class, which Nowa adds with the first variable (see [Components](#components)).
- **Circuit edits real Dart code.** What you change in Circuit changes the function in its file, and code you save shows up in Circuit. An open Circuit panel rebuilds when the file is read again, and shows "Function was modified in code and could not find it" when the function is gone.
- **await.** Turning on **await** for a step, under **Future Options**, makes the enclosing function `async` and wraps its return type in `Future`. Turning the last one off undoes it. This happens in **InitState Function** too, which becomes `Future<void> initState() async`, and Flutter rejects that in debug builds, the kind **Run** makes. Put the waiting steps in a separate function and call that from `initState` without **await**. See [Run logic when a screen opens or closes](../logic/functions.md#lifecycle).
- **What Circuit can draw.** Circuit draws a function only when its body sticks to these statements: expression statements, local variables, `if`/`else`, `try`/`catch` (one `catch` clause shown), `while` and `return`. It can't draw a function that uses others, such as `for`, `switch`, `break` or `continue`, so keep functions you want to edit visually within that list.
- **Values in text.** The `$` menu writes Dart string interpolation, `${name}`. When you type code yourself, `$name` works for a plain variable, and anything with a dot or a call needs braces: `${textController.text}`, `${getName()}`.

## Global state {#global-state}

To share data across your app, see [Share data across your app](../logic/global-state.md).

- **The class.** A global state is a class that extends Flutter's `ChangeNotifier`, with a factory `of` constructor, such as `factory AppState.of(BuildContext context, {bool listen = true})`, which returns `Provider.of<AppState>(context, listen: listen)`. Calling `notifyListeners()` tells every widget that reads it to rebuild.
- **Attaching** adds `ChangeNotifierProvider<YourState>(create: (context) => YourState())` to the `MultiProvider` in `MyApp`, in `lib/main.dart`, so every screen can read it. Detaching removes it.
- **Where the file goes.** **New Global State...** in the Library creates it in `lib/globals/` and attaches it. **Create global state**, in the **Variables** panel with nothing selected, under **Globals**, creates it directly in `lib/`. **Pick global state** attaches one that already exists in `lib`.
- **AppState.** New projects include `AppState` in `lib/globals/app_state.dart`: a private `ThemeData _theme` that starts as `lightTheme`, a `theme` getter, and `changeTheme(ThemeData theme)`, which calls `notifyListeners()`.
- **How Nowa reads it.** Inside a `build` method, Nowa writes `AppState.of(context)`, which listens, so the widget rebuilds when the state changes. In functions and events it writes `AppState.of(context, listen: false)`, which reads the state without listening.

## Data models {#models}

To create models, see [Data models](../logic/models.md).

- **Files.** **New Model...** creates the model in `lib/models/`. Nowa fills in the class and file names from what you type: "task model" becomes the class `TaskModel` in `task_model.dart`.
- **Generated members.** Each model has a constructor, `factory TaskModel.fromJson({required Map<String, dynamic> json})` and `Map<String, dynamic> toJson()`, so you write `TaskModel.fromJson(json: data)`. Nowa rewrites all three each time you change the fields, and **View Code** shows the result. Models from Supabase templates take the map as a plain argument instead: `TodosModel.fromJson(data)`.
- **JSON keys.** By default each field reads and writes the JSON key with its own name. A field whose type is another model, or a list of models, goes through that model's `fromJson` and `toJson`. A `DateTime` field is read with `DateTime.tryParse` and written with `toIso8601String()`, so it expects dates as text.
- **Generate Models From Json** puts every class it creates in one file named after the main class, in `lib/models/` by default, so `Root` becomes `lib/models/root.dart`. The folder must be inside `lib`. **Generate Model** for a REST API request uses the same dialog.
- **Edit in code.** Open a model's file (in the Library, right-click it and choose **Show in code**, or click **View Code** in the model editor) and add or change fields. Nowa reads them back into the model editor.
- **Models from integrations.** Supabase templates save a model per table as `<Table>Model` in `lib/models/`, such as `TodosModel` in `lib/models/todos_model.dart`, and **Use Existing Model** lists the models in your project's `models` folders. Firestore collections are models too, in `lib/firebase/collections.dart`: see [Firebase](#firebase).

## Navigation {#navigation}

To move between screens, see [Navigate between screens](../logic/navigation.md) and [Set up routes in the Router panel](../logic/router.md).

- **The router.** New projects use the `go_router` package. The router is a top-level `GoRouter` variable in `lib/globals/router.dart`, named `appRouter` in new projects (Nowa uses the first `GoRouter` variable in that file, whatever its name). `MyApp` passes it to `MaterialApp.router(routerConfig: appRouter)`.
- **Routes.** Each route is a `GoRoute`, such as `GoRoute(path: '/home-page', builder: (context, state) => const HomePage())`, and sub-routes go in its `routes` list. A path parameter, such as `:id` in `/product/:id`, is read in the builder with `state.pathParameters['id']` and passed to the screen's constructor. A query parameter is read with `state.uri.queryParameters['q']`.
- **Router Configuration.** **Initial Location** is the router's `initialLocation`, the path your app opens first. **Redirect Logic**, on the router or on one route, adds a `redirect` function that takes `context` and `state` and starts by returning `null`, which lets everyone through. **Remove # in URLs** adds `usePathUrlStrategy();` to `main()` and the `flutter_web_plugins` SDK package.
- **Navigation steps.** The **GoRouter** step writes `GoRouter.of(context).push('/path')`, and its **Type** is the method, such as `push`, `go` or `pop`. The **Navigator** step writes `Navigator.of(context).push(MaterialPageRoute(builder: ...))`.
- **Older projects**, and one saved from the **Simple app** playground, use Flutter's `Navigator`, with the `routes` map in `MaterialApp` described under [Screens and routes](#screens-and-routes). To move one to GoRouter, see [Switch an older project to GoRouter](../logic/router.md#switch-an-older-project-to-gorouter).

## Actions and popups {#actions-and-popups}

To add these steps, see [Use ready-made actions](../logic/actions.md) and [Show dialogs, sheets, snackbars and pickers](../logic/popups.md).

| Step | What it writes or does in code |
|---|---|
| **GLOBALS** → **Show snackbar** | `ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Hello World')))`. **Store result** keeps the `ScaffoldFeatureController<SnackBar, SnackBarClosedReason>` it returns, whose `closed` future completes when the bar goes away. |
| **GLOBALS** → **checkPlatform** | `NPlatform.isWeb`, from `nowa_runtime`. `NPlatform` also has `isMacOs`, `isWindows`, `isLinux`, `isAndroid`, `isIOS`, `isDesktop` and `currentPlatform`. |
| **GLOBALS** → **Media Query** | `MediaQuery.of(context)`. |
| **SHARED PREFERENCES** steps | Calls on the `sharedPrefs` that `main()` creates. **set** writes `setString(key, value)`, or `setInt`, `setDouble`, `setBool` or `setStringList` to match the **Type**. **get** writes the matching getter, such as `getString(key)`. **remove key** writes `remove(key)`, and **clear** writes `clear()`. |
| `openUrl` | Calls `launchUrl(Uri.parse(url))` from the `url_launcher` package. |
| `showMediaPicker` | Returns a `Future<List<XFile>>`. `XFile` comes from the `image_picker` package and has the file's `path`, `name` and `readAsBytes()`. When nothing is picked, the list is empty. |
| `print` | Dart's `print()`. In the editor, Nowa sends its messages to **Logs**. When you run the app from VS Code or another IDE, they show in its debug console. |

In code you can combine platform checks, as in `NPlatform.isAndroid || NPlatform.isIOS`.

The categories in Circuit's **+** menu hold more than the pages show:

- **MATERIAL** also has `showMenu`, `showSearch` (it needs a `SearchDelegate`, which you write in code) and `showAboutDialog`.
- **DART:ASYNC** has `Timer`, `unawaited` and `scheduleMicrotask`.
- **PACKAGE:** followed by your package name, such as `PACKAGE:MY_APP`, lists your own functions, classes with public static members, such as `AppConstants`, and singletons, classes with one shared instance (a static `_instance` and a factory constructor), such as `SupabaseService` and your API collections.
- A package you add brings its own category, listing its functions and the same kinds of classes. To make an object from any other class, use **Create...**.

## REST APIs {#rest-api}

To connect an API, see [Connect a REST API](../integrations/rest-api/index.md).

- **Files.** Each collection is a Dart file in `lib/api/`, named after it: a collection named Cats is `lib/api/cats.api.dart`. Renaming the collection (**Name**) renames the file, and Nowa finds collections by that `.api.dart` ending.
- **The class.** A collection is a singleton class named after it. It holds a `Dio` client, from the `dio` package, whose `BaseOptions` carry the **Base URL** and the collection's headers. Each request is a method that returns a `Future` of Dio's `Response`, or of your model once the request returns one. Headers you add to a single request are written into its method. Everything you type there ships inside your app, a token in a header value included.
- **Auth Key** adds an interceptor to the collection's constructor. Before each request it sets the `Authorization` header to `'Bearer ${sharedPrefs.getString('<Auth Key>')}'`, the token your app saved on the device under that name.
- **File uploads.** If a body has a file field (**MultipartFile**), **Upload File** picks a file to test with. For the test only, Nowa puts its bytes into the request's `Uint8List` or `List<int>` parameters.
- **Models** from **Generate Model** go in `lib/models` by default. See [Data models](#models).
- **Import.** A Postman file needs both an `info` and an `item` section, or Nowa shows an error that starts with `Invalid Postman collection format`. See [Import an API](../integrations/rest-api/import.md).

## Keys and constants {#constants}

To manage your keys, see [Keys and constants](../integrations/constants.md).

- **`AppConstants`.** Constants live in the `AppConstants` class in `lib/globals/app_constants.dart`. Each one is a `String`, read as `AppConstants.<name>`, such as `AppConstants.supabaseUrl`. The file is part of your app's code, so the values ship inside your app.
- **From integrations.** These integrations add constants. RevenueCat, Stripe and Google Sign-In add theirs empty when you turn them on, and Supabase fills in its two when you connect:

  | Integration | Constants |
  |---|---|
  | Supabase | `supabaseUrl`, `supabaseAnonKey` |
  | RevenueCat | `revenueCatAppleApiKey`, `revenueCatAndroidApiKey`, `revenueCatWebApiKey` |
  | Stripe | `stripePublishableKey`, `stripeMerchantName`, `stripeMerchantCountryCode` |
  | Google Sign-In, and the Firebase **Google** provider, which installs the same package | `webClientId` |

- When you turn an integration off, its constants stay, listed under **Custom Constants**. Turning RevenueCat, Stripe or Google Sign-In on again sets theirs back to empty, so note your keys before you switch one off and on.
- **Platform keys aren't constants.** Keys that only platform files need (the Google Maps API keys, the AdMob App IDs, the Deep Links **URL Scheme** and **Host**, and the Google Sign-In **iOS Client ID**) are stored under `packages` in `.nowa/settings.json`, and Nowa writes them into your Android, iOS or web files. They live on their own pages under **Settings** → **Integrations**.
- **In Circuit**, `AppConstants` is in the **PACKAGE:** category of the **+** menu. See [Use a constant](../integrations/constants.md#use-a-constant).

## Supabase {#supabase}

To set it up, see [Connect Supabase](../integrations/supabase/connect.md).

### What connecting adds

| What | Where | What it's for |
|---|---|---|
| `supabase_flutter` | `pubspec.yaml` | Supabase's Flutter package. |
| `SupabaseService` | `lib/integrations/supabase_service.dart` | A singleton class (`SupabaseService()` always returns the same instance) with `initialize()`, `signIn(email, password)`, `signUp(email, password)` and `signOut()`. Every function you add later, from a template, from Nowa AI or through the Supabase connector, goes into this class. |
| Start-up line | `main()` in `lib/main.dart` | `await SupabaseService().initialize();`, which calls `Supabase.initialize(url: AppConstants.supabaseUrl, anonKey: AppConstants.supabaseAnonKey)`. |
| `supabaseUrl`, `supabaseAnonKey` | `AppConstants` | Your project URL and anon key. |

### Functions in `SupabaseService`

- `signIn` calls `Supabase.instance.client.auth.signInWithPassword(...)` and `signUp` calls `auth.signUp(...)`, both returning a `Future<AuthResponse>`. `signOut` calls `auth.signOut()`.
- There's no ready-made "is someone signed in" function. Check `Supabase.instance.client.auth.currentSession != null`, as the [redirect example](../logic/router.md#start-on-login-or-home) does, or ask Nowa AI to add a function to `SupabaseService` that tells you.
- A generated function is ordinary Dart code. Change it with **Edit Code** in its test panel ([Change a function's code](../integrations/supabase/database.md#edit-code)) or in code mode.
- The **Supabase** panel sorts the functions of `SupabaseService` by what their code contains: `.from` (without `.rpc`, `.storage`, `.realtime` or `.functions`) goes under **Queries**, `.auth.s`, as in `.auth.signIn...`, `.auth.signUp` and `.auth.signOut`, under **Authentication**, `.storage` under **Storage**, `.rpc` under **RPC** and `.functions` under **Other Functions**. Functions you write yourself are sorted the same way, and one that matches none of these, such as a function that only calls `.auth.resetPasswordForEmail(...)`, doesn't show in the panel.
- A live query returns a `Stream`, and no template creates one. Here's a minimal one ([Live queries](../integrations/supabase/database.md#live-queries) covers turning on Realtime for the table):

  ```dart
  Stream<List<Map<String, dynamic>>> streamTodos() {
    return Supabase.instance.client.from('todos').stream(primaryKey: ['id']);
  }
  ```

- When Nowa AI builds something with the [Supabase connector](../ai/connectors.md), it also writes the matching functions into `SupabaseService`, so your screens can use what it built. Models from templates go in `lib/models/`: see [Data models](#models).

### Your backend in the `supabase/` folder

**Pull Backend Files**, in the panel's ⋮ menu, copies your backend into the project, so you can commit it:

| Path | What it holds |
|---|---|
| `supabase/migrations/` | One `.sql` file for each migration in your Supabase project's history. |
| `supabase/functions/<function name>/index.ts` | The code of each deployed edge function. |
| `supabase/nowa_setup.json` | The list of your storage buckets, plus a setup note. **Set up Backend** shows that note. |

- It replaces what's already in `supabase/migrations`, `supabase/functions` and `supabase/nowa_setup.json`. Other files in `supabase/`, such as a Supabase CLI `config.toml`, stay. The folder follows the Supabase CLI's layout, so the files work with the CLI too.
- It needs recorded migrations. Without them, Nowa says the project "has no migration history, so its schema cannot be captured". Your table data, the files in your buckets, your auth provider settings and your secrets aren't copied.

### Disconnect Supabase

Nowa deletes `lib/integrations/supabase_service.dart`, removes `supabase_flutter` and takes the start-up line out of `main()`. Every function in `SupabaseService` goes with it, including ones you edited or wrote, so screens and events that call them stop working. Your Supabase project, your models in `lib/models/`, the `supabaseUrl` and `supabaseAnonKey` constants and the `supabase/` folder stay. Connecting again creates a fresh `SupabaseService`. See [Disconnect Supabase](../integrations/supabase/backend.md#disconnect-supabase).

## Firebase {#firebase}

To set it up, see [Connect Firebase](../integrations/firebase/connect.md).

### What connecting adds

| File or change | What it's for |
|---|---|
| `android/app/google-services.json`, `ios/Runner/GoogleService-Info.plist` | The Firebase config files for your Android and iOS apps, downloaded from Firebase. |
| `lib/firebase_options.dart` | `DefaultFirebaseOptions.currentPlatform`, with the connection options for the web, Android and iOS. macOS apps use the iOS options, and other platforms get `null`. |
| `lib/firebase/firebase.dart` | `FirebaseService`, a singleton that holds your sign-in functions and a `firestore` getter for `FirebaseFirestore.instance`. |
| `lib/firebase/collections.dart`, `lib/firebase/queries.dart` | Your Cloud Firestore collections, and the `FirestoreService` class that holds your queries. Both start empty. |
| Start-up line in `main()` | `await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);` |
| `pubspec.yaml` | `firebase_core` and `cloud_firestore`, even if you only use sign-in. |
| `android/app/build.gradle.kts`, `android/settings.gradle.kts` | The `com.google.gms.google-services` Gradle plugin (version `4.3.15` in `settings.gradle.kts`). |
| `ios/Podfile` | `platform :ios, '15.0'` at least, which `cloud_firestore` needs. |
| `.nowa/settings.json` | Your Firebase project and app IDs, under `firebase`. |

- Nowa AI can't connect Firebase for you. Its package tool refuses `firebase_core` and points to **Settings** → **Integrations** → **Firebase**, so the configuration is set up correctly.
- **Refresh/Update apps and config files**, next to **Project ID**, downloads the config files again and rebuilds `lib/firebase_options.dart`.
- In Nowa 3.13, if you reload the page or close Nowa soon after **Connect Apps**, the connection can be lost before it's saved. The Firebase files are then gone, `lib/main.dart` still points at the missing `firebase_options.dart`, so the project doesn't compile, and the **Firebase** page asks for your project again. See [Known issues](../troubleshooting/known-issues.md#firebase-reload-after-connect).

### Authentication

Nowa puts the sign-in functions in `FirebaseService`, in `lib/firebase/firebase.dart`:

| Switch | Functions it adds | Package |
|---|---|---|
| **Authentication** | `signOut()`, `isUserSignedIn()`, `currentUser`, `sendVerificationEmail()` | `firebase_auth` |
| **Email/Password** | `signUpWithEmailAndPassword(email, password)`, `signInWithEmailAndPassword(email, password)`, `sendPasswordResetEmail(email)` | |
| **Google** | `signInWithGoogle()`, which opens a popup on the web (`signInWithPopup`) and uses the `google_sign_in` package everywhere else | `google_sign_in` |
| **Phone** | `verifyPhoneNumber(phoneNumber)`, `signInWithPhoneNumber(verificationId, smsCode)` | |

- **iOS URL schemes.** **Google** adds a `CFBundleURLTypes` entry to `Info.plist` with your reversed client ID. **Phone** needs its own scheme, `app-` plus your iOS app ID with dashes, but it's only added while **Google** is on too: both come from the `google_sign_in` package's settings, and **Phone** doesn't add that package. A scheme you add by hand is lost when Nowa next rebuilds `Info.plist`. See [Functions Nowa adds](../integrations/firebase/auth.md#functions-nowa-adds).
- **Google and `google_sign_in` 7.x.** In Nowa 3.13, `signInWithGoogle()` is written for an older version of `google_sign_in` (it calls `GoogleSignIn().signIn()`) than the 7.x version Nowa installs. If your build reports errors about `GoogleSignIn` in `lib/firebase/firebase.dart`, this is the cause. Turning **Google** off removes the function and the package.
- **Turning Authentication off** removes every function in the table except `sendPasswordResetEmail()`, which stays in `FirebaseService`. Nowa also switches the providers off and removes `firebase_auth`, and `google_sign_in` if **Google** was on. The leftover function still calls `FirebaseAuth.instance`, so it breaks your build: delete it in code mode. Turning only **Email/Password** off leaves it behind too, which is harmless while **Authentication** stays on.

### Cloud Firestore

- **Collections.** Every class in `lib/firebase/collections.dart` is a collection: a model with `fromJson` and `toJson` that your queries use. A main collection carries `@NowaGenerated({'fbCollectionType': 'fbMainCollection'})`, and a sub collection `fbSubCollection` plus `fbParent`. **Select Collection** in the query builder lists main collections only, so a class you or Nowa AI write without that metadata doesn't show there.
- **Field types.** A collection's `fromJson` and `toJson` use each field's name as the document key, and a `DateTime` field is read with `DateTime.tryParse` and written with `toIso8601String()`. It expects dates as text, not Firestore `Timestamp` values.
- **Queries.** Each query is a method of `FirestoreService`, a singleton in `lib/firebase/queries.dart`. **Select Firestore Query** and Circuit's **FIREBASE** category list every method of that class except constructors, after **Refresh/Update apps and config files**.
- **Adding them in Nowa 3.13.** The designer has no button for adding collections or queries, so edit the two files in code mode, then click **Refresh/Update apps and config files** so Nowa's lists match your code. To add, set or delete documents, write the function in `lib/firebase/queries.dart` yourself, without `withConverter`: the builder's `add` and `doc` steps don't work in 3.13. See [Add collections and queries in Nowa 3.13](../integrations/firebase/firestore.md#add-collections-and-queries).

### Push notifications

| What | Where |
|---|---|
| `firebase_messaging`, `flutter_local_notifications` | `pubspec.yaml` |
| `NotificationService` | `lib/firebase/notification_service.dart` |
| Start-up line | `await NotificationService.instance.initialize();` in `main()` |
| Android | Core library desugaring in `android/app/build.gradle.kts` (`isCoreLibraryDesugaringEnabled = true` and `coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.1.4")`), and the **Boot Completed** permission, which `flutter_local_notifications` needs. The permission stays when you turn notifications off. |
| iOS | The `fetch` and `remote-notification` background modes (`UIBackgroundModes`) for `Info.plist`. Turning notifications on doesn't rebuild that file by itself, so they're written at its next rebuild, for example when you change an iOS permission. Check `ios/Runner/Info.plist` before an iOS build. |

- `initialize()` asks for permission to show notifications, shows messages that arrive while the app is open as local notifications (Android channel `high_importance_channel`), keeps the device's token in `fcmToken` and subscribes to the topic `all`, which Nowa's test notifications go to.
- When someone taps a notification that arrived while your app was open, `onNotificationTap` gets the message data as JSON, so set it to react. A tap that opens the app from the background, or starts it, calls `_handleBackgroundMessage`, which Nowa leaves empty for your code.
- Nowa writes no `aps-environment` entitlement. Add the Push Notifications capability in Xcode, under **Signing & Capabilities**. In the macOS desktop app, the **Open Xcode Workspace** link under the switch opens `ios/Runner.xcworkspace` from the project's folder, so it works for [local projects](local-projects.md). See [Set up notifications for iPhone](../integrations/firebase/notifications.md#set-up-notifications-for-iphone).
- Turning off **Push Notifications (FCM)** removes `lib/firebase/notification_service.dart`, the two packages and the start-up line. The background modes leave `Info.plist` only at its next rebuild.

### Disconnect Firebase

Nowa removes `FirebaseService`, the config files, `lib/firebase_options.dart`, the sign-in functions and notification code, the Firebase packages and the start-up line, and rebuilds the Gradle files. **Keep Files** keeps `collections.dart` and `queries.dart` so you can reuse them with another project. Your queries show errors until you connect again.

In Nowa 3.13, disconnecting leaves the `google_sign_in` package in place if the **Google** provider was on. If you don't need it, turn **Enabled** off on the **Google Sign-In** page.

## Stripe {#stripe}

To set it up, see [Accept payments with Stripe](../integrations/stripe.md).

### Turn on Stripe

- **Enabled** adds the `flutter_stripe` package, the start-up line `Stripe.publishableKey = AppConstants.stripePublishableKey;` and the constants `stripePublishableKey`, `stripeMerchantName` and `stripeMerchantCountryCode`. After a **Deploy Configuration** with Apple Pay on and a merchant ID, `main()` also sets `Stripe.merchantIdentifier`.
- Your other choices (purchase types, table and column mapping, currency and wallets) are stored under `stripe_integration` in `.nowa/settings.json`.
- **Secret Key** and **Webhook Secret** don't go into your app. Nowa stores them in your Supabase project as the edge function secrets `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
- Every key is saved exactly as typed, without trimming spaces.

### Deploy Configuration

**Deploy Configuration** creates these in your Supabase project, for the purchase types you chose:

| Purchase type | Table | Edge functions |
|---|---|---|
| **One-Time** | `nowa_stripe_one_time_payments` | `stripe-one-time-payment-intent` |
| **Consumable** | `nowa_stripe_consumable_payments` | `stripe-consumable-payment-intent` |
| **Subscription** | `nowa_stripe_subscriptions` | `stripe-create-subscription`, `stripe-cancel-subscription` |
| Every deploy | | `stripe-webhook` |

In your project, it generates `StripePaymentService` in `lib/integrations/stripe_payment_service.dart`, a class of static methods that call those functions through your Supabase client:

| Purchase type | Methods |
|---|---|
| **One-Time** | `processPayment(recordId: ...)`, which opens Stripe's payment sheet, plus `getPaymentStatus(recordId)` and `getPaymentDetails(recordId)`. With **Consumable** on too, the names include `OneTime`, as in `processOneTimePayment`. |
| **Consumable** | The same three, with `Consumable` in the names when **One-Time** is on too. |
| **Subscription** | `subscribe(priceId: ...)`, `getSubscriptionStatus()`, `getSubscriptionDetails()` and `cancelSubscription()`. |

- **Each deploy regenerates the class.** It rewrites every method, including the private `_initPaymentSheet` and `_presentPaymentSheet`, and deletes any other member, so a hand edit or a Nowa AI edit, or a helper method you added, is lost on the next deploy.
- **Google Pay** is set up in `_initPaymentSheet` as `PaymentSheetGooglePay(merchantCountryCode: AppConstants.stripeMerchantCountryCode, testEnv: true)`, Google's test environment. When Google approves your app, change it to `testEnv: false` after your last deploy, because each deploy puts `true` back.
- **The functions** pin `apiVersion: '2025-12-15.clover'` and load `stripe@17.5.0` from esm.sh. `stripe-webhook` checks each event with `stripe.webhooks.constructEventAsync` and reads `event.data.object`, so your Stripe event destination must send snapshot events, not thin ones.
- **Amounts** are sent as `Math.round(amount * 100)` for every currency. Stripe expects zero-decimal currencies, such as JPY, without that multiplication, so those would be charged 100 times the price ([Stripe: zero-decimal currencies](https://docs.stripe.com/currencies#zero-decimal)). A **Fixed Currency** is lowercased for you; a **Currency Column** value is sent as stored, and Stripe wants lowercase codes.
- **Subscription periods.** `stripe-create-subscription` and `stripe-webhook` read the subscription's `current_period_start` and `current_period_end`, and `stripe-webhook` also reads `invoice.subscription`. Stripe removed these fields in API version `2025-03-31.basil` ([subscription periods](https://docs.stripe.com/changelog/basil/2025-03-31/deprecate-subscription-current-period-start-and-end), [invoices](https://docs.stripe.com/changelog/basil/2025-03-31/adds-new-parent-field-to-invoicing-objects)). The functions call Stripe with the pinned `2025-12-15.clover`, so the subscriptions they create or fetch never have the period fields, and webhook events have them only when your event destination uses an older API version than basil ([Stripe: event destinations](https://docs.stripe.com/event-destinations)). So the period columns can stay empty, and on basil or later the `invoice.*` branches find no subscription. The status still follows the `customer.subscription.*` events.

**Platform changes**, written at the end of each successful deploy:

| Platform | Change |
|---|---|
| Android | Rewrites `MainActivity.kt` as a `FlutterFragmentActivity`, writes `android/app/proguard-rules.pro` with Stripe's rules (replacing an existing file), and sets `NormalTheme` in `res/values/styles.xml` and `res/values-night/styles.xml` to `Theme.MaterialComponents`. |
| iOS | Turns on the **Camera** permission. With Apple Pay on and a merchant ID, writes `ios/Runner/Runner.entitlements` whole with `com.apple.developer.in-app-payments`, which replaces any other entitlement in that file, such as `aps-environment` for push. |

### Remove Stripe

Turning **Enabled** off deletes the Stripe settings, the start-up lines and `lib/integrations/stripe_payment_service.dart`. The **Camera** permission, your constants and everything in Supabase stay.

It also undoes the platform changes, but in Nowa 3.13 only if a **Deploy Configuration** finished since you last opened the project. Otherwise they stay, and you undo them yourself (or ask Nowa AI to):

- Delete `android/app/proguard-rules.pro`.
- Set `NormalTheme` back to `@android:style/Theme.Light.NoTitleBar` in both `styles.xml` files.
- Switch `MainActivity` from `FlutterFragmentActivity` to `FlutterActivity`. If you also use RevenueCat, leave it a `FlutterFragmentActivity`, which Nowa set up for RevenueCat. (When Nowa undoes it, it doesn't check, so look at `MainActivity.kt` afterwards.)
- Remove the `com.apple.developer.in-app-payments` key from `ios/Runner/Runner.entitlements`, and the file if nothing else is left in it.

## RevenueCat {#revenuecat}

To set it up, see [In-app purchases with RevenueCat](../integrations/revenuecat.md).

| What | Where |
|---|---|
| `purchases_flutter` | `pubspec.yaml`. The **RevenueCat Paywall** widget also needs `purchases_ui_flutter`, which **Add Missing Dependencies** adds when you click **Add**. |
| `RevenuecatService` | `lib/integrations/revenuecat_service.dart`, a singleton class. |
| Start-up line | `await RevenuecatService().configureRevenuecat();` in `main()`. |
| Your keys | `revenueCatAppleApiKey`, `revenueCatAndroidApiKey` and `revenueCatWebApiKey` in `AppConstants`. They're public keys, so shipping them inside your app is expected. |
| iOS | `platform :ios, '14.0'` at least in `ios/Podfile`. |
| Android | `MainActivity.kt` rewritten as a `FlutterFragmentActivity`, which new Nowa projects already use. |

| Method | What it does |
|---|---|
| `configureRevenuecat()` | Picks the key for the platform (Apple, Android or web) and calls `Purchases.configure(PurchasesConfiguration(apiKey))`. |
| `fetchOfferings()` | Returns your offerings as a `Future<Offerings?>`, or `null` if the request fails. |
| `purchasePackage(PurchaseParams purchase)` | Buys a package through `Purchases.purchase`. |

- These work with RevenueCat's own types, so for purchase flows beyond the paywall, ask Nowa AI or write the code yourself ([Write your own code](custom-code.md)).
- Nowa doesn't add Apple's In-App Purchase capability to your iOS project. See [Before you publish](../integrations/revenuecat.md#before-you-publish).
- Turning **Enabled** off removes the package, `lib/integrations/revenuecat_service.dart` and the start-up line. Your keys stay in **Constants**, and `MainActivity` stays a `FlutterFragmentActivity`. Remove any logic that calls `RevenuecatService`, and any **RevenueCat Paywall** widgets, first.

## AdMob {#admob}

To set it up, see [Show ads with AdMob](../integrations/admob.md).

| What | Where |
|---|---|
| `nowa_mobile_ads` | `pubspec.yaml`. Nowa's package around `google_mobile_ads`, which it also exports, with `NowaAdBannerWidget` (the **Admob Banner**) and `loadAndShowInterstitialAd()`. |
| Start-up line | `await MobileAds.instance.initialize();` in `main()`. |
| **Android App ID** | `AndroidManifest.xml`, as `<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" .../>`. |
| **iOS App ID** | `Info.plist`, as `GADApplicationIdentifier`, together with Google's `SKAdNetworkItems` list. |

- Both App IDs are stored under `packages` in `.nowa/settings.json` and must start with `ca-app-pub-`.
- The banner takes `androidUnitID`, `iosUnitID` and `showTestAds`, and `loadAndShowInterstitialAd()` takes the same three. While `showTestAds` is `true`, the default (**Show Test Ads**), both use Google's sample ad units instead of yours.
- Turning **Enabled** off removes the package, your App IDs with their manifest and `Info.plist` entries, and the start-up line. Remove your banners and `loadAndShowInterstitialAd` calls first.

## Google Maps {#google-maps}

To set it up, see [Add Google Maps](../integrations/google-maps.md).

Turning on **Enabled** adds the `google_maps_flutter` package and sets `platform :ios, '14.0'` at least in `ios/Podfile`. Nowa puts each key where its platform needs it:

| Key | Where Nowa writes it |
|---|---|
| **Android API Key** | `AndroidManifest.xml`, as `<meta-data android:name="com.google.android.geo.API_KEY" .../>`. |
| **iOS API Key** | `ios/Runner/AppDelegate.swift`, as `GMSServices.provideAPIKey("...")` at app launch, with `import GoogleMaps`. |
| **Web API Key** | A Google Maps `<script>` tag in the head of `web/index.html`. |

- The keys are stored under `packages` in `.nowa/settings.json`.
- Turning **Enabled** off removes the package, your keys and their platform entries.

## Google sign-in {#google-sign-in}

To set it up, see [Google Sign-In](../integrations/google-sign-in.md).

Turning on **Enabled** adds the `google_sign_in` package. Nowa doesn't generate sign-in code for this setup: your code, or the flow Nowa AI builds, does the signing in.

| Field | Used for | What Nowa does with it |
|---|---|---|
| **iOS Client ID** | Required for Google sign-in without Firebase. | Writes it to `Info.plist` as `GIDClientID` and adds the reversed ID as an iOS URL scheme (a `CFBundleURLTypes` entry). It's stored under `packages` in `.nowa/settings.json`. |
| **Web Client ID** | Also used as the server client ID on Android. | Saves it as the constant `AppConstants.webClientId`. It isn't written to any platform file, and Nowa doesn't pass it to Google for you: your sign-in code reads it. |

- When Firebase manages Google sign-in, Nowa builds the same URL scheme from Firebase's client ID.
- If you also set a Deep Links **URL Scheme**, check `Info.plist`, as [Deep links](#deep-links) explains: both write a `CFBundleURLTypes` entry.
- Turning **Enabled** off removes the package and the iOS entries Nowa added. The **Web Client ID** stays in **Constants**, under **Custom Constants** as `webClientId`.

## Deep links {#deep-links}

To set them up, see [Deep links](../integrations/deep-links.md).

Turning on **Enabled** adds the `app_links` package. From then on, each time Nowa rebuilds `Info.plist` or the Android manifest, it switches off Flutter's built-in deep link handling there: `FlutterDeepLinkingEnabled` is `false` in `Info.plist`, and the manifest's activity gets `flutter_deeplinking_enabled` set to `false`. Turning on **Enabled** doesn't rebuild either file by itself; saving the fields below does. Your settings take effect in a built app.

| Field | Opens your app from | Where Nowa writes it |
|---|---|---|
| **URL Scheme** | Links like `myapp://...` | `Info.plist`, as a `CFBundleURLTypes` entry, as soon as you save it. The Android manifest, as an intent filter for the scheme with the host `open.my.app`, only at the manifest's next rebuild (see below). |
| **Host** | Links like `https://example.com/...` | The Android manifest only, as an App Links intent filter with `android:autoVerify="true"`. A path after the domain, as in `example.com/app`, becomes `android:pathPrefix="/app"`. |

- **Check the Android manifest.** Saving **URL Scheme** rebuilds only `Info.plist`. To get your scheme into the manifest, save **Host**, which rebuilds it; without a host, save any **Host** and clear it again. Before you test on Android, open `android/app/src/main/AndroidManifest.xml` and look for your scheme.
- **No iOS Universal Links.** Nowa doesn't add the associated-domains entitlement, so web links open your app on Android only until you set up Universal Links yourself ([Apple's guide](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app)). On Android, `autoVerify` makes the system check that you own the domain, so your site must serve the verification file ([Android's guide](https://developer.android.com/training/app-links)).
- **Two URL types.** Google sign-in, standalone or through Firebase, also writes a `CFBundleURLTypes` entry once its client ID is saved. With both, `Info.plist` holds two separate `CFBundleURLTypes` keys, and since a property list should hold that key once, one of them may not take effect on iOS. Merging them by hand, or with Nowa AI, doesn't last: Nowa rebuilds the whole file whenever one of its settings changes (see [Platform files Nowa rebuilds](#platform-files-nowa-rebuilds)). See [Use deep links with Google Sign-In](../integrations/deep-links.md#with-google-sign-in).
- **Reading the link is up to your code.** Nowa registers the links and adds `app_links`, but it doesn't generate code that reads an incoming link. Your app's logic has to read it and open the right screen.
- Turning **Enabled** off removes the package and the entries Nowa added to the Android and iOS files.

## Publishing {#publishing}

To publish your app, see [Get ready to publish](../publish/index.md).

### Code checks

Publishing to the web starts with a code check, `flutter analyze`, and stops when it finds errors: the deployment fails with **Analysis Failed**, and the findings go to **Logs**. You can run the same check any time: in **Problems**, switch to **From Code Analysis** and click **Run Code Check**. See [Find and fix problems](../test/problems.md).

### Cloud builds and `codemagic.yaml`

Cloud builds run the workflows in your project's `codemagic.yaml`:

| Workflow | What it does |
|---|---|
| `android-debug-workflow` | `flutter build apk --debug`. The artifact is `build/**/outputs/flutter-apk/*.apk`. |
| `android-workflow` | Release `flutter build appbundle` and `flutter build apk`, signed with the keystore from the `android_key_info` variable group: `CM_KEYSTORE` (the keystore, base64-encoded), `CM_KEYSTORE_PASSWORD`, `CM_KEY_ALIAS` and `CM_KEY_PASSWORD`. |
| `web-workflow` | `flutter build web --release`, zipped into `build/web.zip`. |
| `ios-workflow` | Signs with the `ios_credentials` variable group, runs `flutter build ipa --release` and uploads the build to App Store Connect (`publishing: app_store_connect`). |

- If the file breaks, the error bar in code mode offers **Reset to default**, which writes the default content back. See [What runs behind the scenes](../publish/builds.md#what-runs-behind-the-scenes).
- **Android signing in `android/app/build.gradle.kts`.** Release builds use the `release` signing config. On Codemagic, where `CI` is set, it reads the keystore decoded to `$CM_BUILD_DIR/codemagic.keystore` and the `CM_*` passwords. Anywhere else it reads `android/key.properties` (`storeFile`, `storePassword`, `keyAlias`, `keyPassword`), so create that file to build a signed release on your own computer.
- **iOS signing.** The `ios_credentials` group holds `APP_STORE_CONNECT_PRIVATE_KEY`, `APP_STORE_CONNECT_KEY_IDENTIFIER`, `APP_STORE_CONNECT_ISSUER_ID`, `CERTIFICATE_PRIVATE_KEY` (your distribution certificate's private key) and `BUNDLE_ID` (the **Bundle Identifier** saved with your App Store Connect credentials). The signing step runs `keychain initialize`, `app-store-connect fetch-signing-files "$BUNDLE_ID" --type IOS_APP_STORE --create`, `keychain add-certificates` and `xcode-project use-profiles`.
- **What `--create` does.** It registers your bundle ID if it's missing, and when no Apple Distribution certificate matches `CERTIFICATE_PRIVATE_KEY`, it creates one from that key. That new certificate counts toward Apple's limit, as [Add a distribution certificate](../publish/ios.md#apple-distribution-certificate) explains.

### Use a key from a Mac certificate

**Certificate Private Key** must be your certificate's private key as PEM text, a text file that starts with `-----BEGIN`. Nowa reads the file you pick as text, so a binary `.p12` exported from Keychain Access fails, even though the picker only lists `.p12` files. The key file Nowa gives you with **Download Certificate** is already in the right format. To reuse a certificate made on a Mac, follow [Codemagic's steps for the same key](https://docs.codemagic.io/yaml-code-signing/alternative-code-signing-methods/):

1. On the Mac that created the certificate, open **Keychain Access**, right-click your iOS distribution certificate and choose **Export**.
2. Choose the **Personal Information Exchange (.p12)** format, save the file, for example as `IOS_DISTRIBUTION.p12`, and leave the password empty.
3. In Terminal, in the folder where you saved it, run the command below. When it asks for the import password, press <kbd>Enter</kbd>. The key is written to a text file named `ios_distribution_private_key`.

   ```bash
   openssl pkcs12 -in IOS_DISTRIBUTION.p12 -nodes -nocerts | openssl rsa -out ios_distribution_private_key
   ```

   If your `openssl` is OpenSSL 3 and the first command fails with an `unsupported` algorithm error, add `-legacy` after `pkcs12`: OpenSSL 3 loads the older algorithms some `.p12` files use only in its legacy mode ([OpenSSL: pkcs12](https://docs.openssl.org/3.0/man1/openssl-pkcs12/)).

4. Rename that file so it ends in `.p12`, such as `ios_distribution_private_key.p12`, so Nowa's file picker shows it.
5. In the **Distribution Certificate** card, click **Browse** next to **Certificate Private Key**, pick the file and click **Save**. See [Use a key you already have](../publish/ios.md#use-a-key-you-already-have).

### Before you upload to the App Store

- **Export compliance.** Nowa's `Info.plist` template doesn't set `ITSAppUsesNonExemptEncryption`, so App Store Connect asks the encryption questions for each build ([Apple: export compliance](https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-export-compliance-information-for-beta-builds/)). You can add the key yourself, but Nowa rebuilds `Info.plist` whole when one of its settings changes ([Platform files Nowa rebuilds](#platform-files-nowa-rebuilds)), so check that it's still there before each upload.
- **App icon transparency.** Nowa generates the iOS icons without removing transparency (`remove_alpha_ios` isn't set), and the icon generator it uses warns that "Icons with alpha channel are not allowed in the Apple App Store". Use an icon image without transparency for iOS.
- **Version numbers.** **Build version** and **Build number** come from `version:` in `pubspec.yaml`. See [Project files](#project-files).

## Packages {#packages}

To add, update or remove packages yourself, see [Add packages](packages.md).

New projects start with `nowa_runtime`, `provider`, `shared_preferences`, `dio` and `go_router`, plus `flutter_lints` as a dev dependency. When you turn on an integration with its **Enabled** switch, Nowa adds the newest version of its package from pub.dev. Connecting Supabase or Firebase, and the packages Nowa adds for a widget, use versions fixed in your Nowa release, and so does Nowa AI when it adds a package that Nowa has its own setup for.

That setup runs however the package arrives, from an integration, the **Packages** page or Nowa AI: it adds the package's start-up line, files, constants and permissions. Adding `geolocator`, for example, asks first in **Add Missing Dependencies**, then turns on the **Fine Location** and **Coarse Location** permissions on Android and **Location When In Use** on iOS, which rebuilds the manifest and `Info.plist`.

**`nowa_runtime`** is Nowa's helper package. It holds `@NowaGenerated`, `NPlatform`, `openUrl`, `showMediaPicker` and widgets such as **CustomButton**, which the Library lists before Nowa's own **Button** when you search for `button` in a new project. It brings `url_launcher`, `flutter_inappwebview`, `markdown_widget`, `video_player`, `chewie`, `audioplayers`, `image_picker`, `intl` and `web` into your app with it. Each time Nowa loads your project, it sets `nowa_runtime`, and `nowa_mobile_ads` if you use AdMob, back to the versions your Nowa release works with, so a different version you write for either doesn't last.

| Feature | Packages Nowa adds |
|---|---|
| Supabase | `supabase_flutter` |
| Firebase | `firebase_core`, `cloud_firestore`; `firebase_auth` with **Authentication**; `google_sign_in` with the **Google** provider; `firebase_messaging` and `flutter_local_notifications` with push notifications |
| Stripe | `flutter_stripe` |
| RevenueCat | `purchases_flutter`, plus `purchases_ui_flutter` for the paywall |
| AdMob | `nowa_mobile_ads` |
| Google Maps | `google_maps_flutter` |
| Google Sign-In | `google_sign_in` |
| Deep links | `app_links` |
| **Remove # in URLs** | `flutter_web_plugins`, an SDK package |

| Widget | Package it needs |
|---|---|
| **SVG** | `flutter_svg` |
| **Lottie** | `lottie` |
| **Rive** | `rive` |
| **YouTube Player** | `youtube_player_flutter` |
| **Swipeable Stack** | `flutter_card_swiper`. The widget also creates a `swiperController` variable. |
| **Pin Code Field** | `pin_code_fields`. The widget also creates a `pinCode` variable. |
| **Page View** dots | `smooth_page_indicator`, which `nowa_runtime` no longer includes. See [Handle the Page indicator migration](packages.md#page-indicator-migration). |
| **Html** | `flutter_html`. Nowa doesn't add it when you place the widget: click **Fix** on the **Problems** message. |
| **Admob Banner**, **Google Maps**, **RevenueCat Paywall** | The integration's packages above, plus your keys in **Settings** → **Integrations**. |

- The Library's **Packages** chip lists the packages in your `pubspec.yaml` with their versions (**workspace** for a local path), and the widgets and classes they bring.
- `'<package>' is imported but is not in the pubspec.` in **Problems** means your code imports a package your `pubspec.yaml` doesn't list. **Fix** adds the package at its latest version. A package listed with `sdk:`, `git:` or `path:` doesn't cause this problem. If the package is a dev dependency, **Problems** says so instead, with no **Fix**: Nowa doesn't load dev dependencies, so move it to `dependencies` to use it in `lib/`.
- Nowa AI won't add `firebase_core` (see [Firebase](#firebase)) or `flutter_localizations` (see [Translations](#localization)).
