---
title: Glossary
description: Plain-language meanings of the words you'll meet in Nowa and in these docs, from Nowa's own terms to app-building, data and publishing words.
sidebar_label: Glossary
keywords: [glossary, terms, definitions, dictionary, what does it mean, jargon, board, screen, component, instance, widget, library, widgets panel, widget picker, Nowa AI, Circuit, Instant Play, Think mode, renamed, Flutter, Dart, group, row, column, stack, constraints, API, API key, backend, database, JSON, query, "null", String, bool, Future, Stream, bundle ID, package name, signing key, keystore, SHA-1, emulator, simulator, APK, AAB, hot reload, Git, commit]
---

New to building apps? This page explains the words you'll meet in Nowa and in these docs, in plain language. You don't need to learn them by heart: Nowa AI and the visual editor take care of the technical side. Come back here whenever a word stops you.

Labels in **bold** are exactly what the app shows. To find a word fast, use your browser's search (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>).

## Nowa words

| Term | What it means |
|---|---|
| Agent mode | The Nowa AI mode that builds everything, from design to working features. Chip: **Agent**. See [Design, Plan and Agent modes](../ai/modes.md#agent-mode). |
| AI Assistant | The panel where you chat with Nowa AI. Open it with the **Assistant** icon in the sidebar. See [Chat with Nowa AI](../ai/chat.md). |
| Api panel | The sidebar panel where you connect REST APIs: you group requests into collections and test them on the spot. See [Connect a REST API](../integrations/rest-api/index.md). |
| AppState | The global state every new project starts with. See [Share data across your app](../logic/global-state.md). |
| Board | The design surface where your screens, components and widgets sit side by side, like pages pinned to a wall. Switch boards from the **Boards** chip in the top bar. See [Work with boards](../design/boards.md). |
| Board item | Anything placed directly on a board: a screen, a component or a loose widget such as a shape. Screens and components have a title bar with **Play** and **Open in new tab**. See [Work with boards](../design/boards.md#know-your-board-items). |
| Checkpoint | A saved point for each Nowa AI request that changes your files. **Restore Checkpoint** takes your project back to before that request and undoes every later one. **Reapply Checkpoint** brings the changes back. See [Undo AI changes and reopen chats](../ai/undo-and-history.md). |
| Circuit | The visual logic editor, where you stack steps to say what happens, for example when someone taps a button. Each function is a chain of nodes. See [Build logic in Circuit](../logic/circuit.md). |
| Cloud project | A project stored in your Nowa account. Open it on any device you sign in on. See [Cloud and local projects](../get-started/cloud-and-local.md). |
| Code mode | The code editor over all your project files, opened with the `<>` button in the top bar. See [Edit code in Nowa](../code/code-mode.md). |
| Component | A piece you build once and reuse on any screen, such as a product card. Change it once and every copy updates. See [Build reusable components](../design/components.md). |
| Connector | A link that lets Nowa AI work in another service, such as Figma or Supabase. In the app they are labeled **MCP**. See [Connect Figma and Supabase to Nowa AI](../ai/connectors.md). |
| Console | The floating panel with the **Problems** and **Logs** tabs. Open it from the status bar. See [Find and fix problems](../test/problems.md). |
| Constants | Project-wide values and integration keys, in project settings. See [Keys and constants](../integrations/constants.md). |
| Dashboard | The page you land on after you sign in. Describe an app in **What do you want to build?** or open one of your **Projects**. See [Create and manage projects](../account/projects.md). |
| Data Builder | A widget, and a wrapper, that loads data, for example from an API or a database, and hands it to the widgets inside, with something to show while it loads. See [Show data in your UI](../integrations/show-data.md). |
| Deploy | The top-bar button that puts your app on the web or builds it for Android and iOS. Cloud projects only. See [Get ready to publish](../publish/index.md). |
| Design mode | The Nowa AI mode for the look and flow of your app, with demo data. Chip: **Design**. See [Design, Plan and Agent modes](../ai/modes.md#design-mode). |
| Desktop app | Nowa for macOS, Windows and Linux. Needed for local projects and running on devices. See [Install the desktop app](../get-started/desktop-app.md). |
| Details panel | The panel on the right of the board that shows the selected item's properties. See [Change widget properties](../design/properties.md). |
| Embedded preview | Where **Run** shows your real, compiled app, right inside Nowa. See [Run your app](../test/run.md). |
| Event | A property like **On Pressed** or **On Tap** that starts your logic when something happens. See [Respond to taps and other events](../logic/events.md). |
| External agent | Claude Code, Claude Desktop or Cursor connected to build in Nowa, from **Connect External Agent** in the **AI Assistant** menu. Desktop app, Enterprise. See [Connect your own AI agent](../ai/external-agent.md). |
| Files panel | The sidebar panel labeled **Files**, shown in code mode. It lists the whole project tree. In the designer, the Library takes its place. See [Manage project files](../code/files.md). |
| Global state | App-wide data and functions that every screen can use, such as a shopping cart. See [Share data across your app](../logic/global-state.md). |
| Instance | One use of a component. Every instance follows the component's design, and params give each one its own content, such as a different recipe on each card. See [Build reusable components](../design/components.md). |
| Instant Play | Running a board item right on the board, instantly. The button says **Play**. See [Play your app on the board](../test/instant-play.md). |
| Integrations | The group of project settings for Firebase, Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In and Deep Links. See [Connect data and services](../integrations/index.md). |
| Library | The sidebar panel with your project's screens, components, models and more, Nowa's built-in widgets, your packages and your assets. Open it with the second icon or <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>2</kbd>. Search it, add from it and drag from it. See [Find and add things with the Library](../design/library.md). |
| Local project | A project stored in a folder on your computer. Desktop app only. On the dashboard it sits under **On this device**. See [Work with local projects](../code/local-projects.md). |
| Model | A description of one kind of data in your app, such as a product with a name and a price. Nowa can build one from JSON. Create one with **New Model...** in the **Add** menu of the **Library**. See [Data models](../logic/models.md). |
| Node | One step in a Circuit function, such as **Show snackbar**. See [Build logic in Circuit](../logic/circuit.md). |
| Nowa AI | The AI agent built into Nowa. It designs, builds and fixes your app with you. See [How Nowa AI works](../ai/index.md). |
| Outline | The panel that shows the widget tree of the board or open screen. See [Use the Outline](../design/outline.md). |
| Parameter | A value a screen or component receives, such as the product to show. Also called a param: the **Variables** panel lists them under **Params**. See [Pass data with parameters](../logic/parameters.md). |
| Plan mode | The Nowa AI mode that writes a plan you review before anything changes. Chip: **Plan**. See [Design, Plan and Agent modes](../ai/modes.md#plan-mode). |
| Playground | The editor you can use without an account, at `app.nowa.dev/playground`. See [Try Nowa without an account](../get-started/playground.md). |
| Project settings | The settings of one project: name, identifiers, permissions, constants and more. Open them with the gear (**Settings**) in the top bar. See [Project settings](../account/project-settings.md). |
| Public project | A cloud project that anyone with its link can open in Nowa and keep their own copy of. Turn it on in **Project Details** → **Sharing**. See [Share your app](../test/share.md). |
| Router | The sidebar panel that lists your app's routes, the paths that open your screens, and decides which screen opens first. See [Set up routes in the Router panel](../logic/router.md). |
| Run | Compiling and running your real app, in the **Embedded preview** inside Nowa or on a device. See [Run your app](../test/run.md). |
| Screen | A page of your app, such as a home page, a product page or a checkout. The **Library** lists your screens. See [Create and set up screens](../design/screens.md). |
| Session | One conversation with Nowa AI. Start one with **New Session**; reopen old ones in **Chat History**. See [Undo AI changes and reopen chats](../ai/undo-and-history.md#start-a-new-session). |
| Share Preview | A link and QR code that let people try your app in a browser. Click **Share preview** while an item plays on the board. Cloud projects only. See [Share your app](../test/share.md). |
| Support panel | The panel that the round **?** button at the bottom right opens, with **Your tickets**, **Report an issue**, **Chat with support** and more. See [Get help](../account/help.md). |
| Template | A ready-made screen or component, such as a login flow or a dashboard, that you add and make your own. See [Start from a template](../design/templates.md). |
| Theme | Your app's colors, text styles and widget styles, edited in the **Themes** panel. See [Create and edit themes](../design/themes.md). |
| Thinking level | How much Nowa AI reasons before it acts: **Instant** (fastest), **Thinking** (balanced, the default) or **Deep Thinking** (extra reasoning). See [Design, Plan and Agent modes](../ai/modes.md#set-the-thinking-level). |
| Variable | A named value a screen or component remembers while it's open, such as the number of items in a cart. See [Store data in variables](../logic/variables.md). |
| Variables panel | The floating panel at the top right of the board. It lists the **Params**, **Variables** and **Functions** of the selected screen or component, and **Globals** when nothing is selected. See [Store data in variables](../logic/variables.md). |
| Widget | A building block of your app, such as a text, a button, an image or a row. Every screen is made of widgets (they're Flutter widgets). See [Widget catalog](./widgets/index.md). |
| Widget picker | The dialog with the hint **Search for a widget**. It opens from **Replace with...**, from the **+** of an empty widget slot and from properties that take a widget. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> and the toolbar's **Widget** tool open the Library instead. See [Add widgets](../design/add-widgets.md). |
| Workspace | A shared space for projects and team members. See [Workspaces and team members](../account/workspaces.md). |
| Wrapper | A widget that goes around another to add one thing, such as space (**Padding**) or scrolling (**Scroll View**). Add one with **Add Wrapper** in **Details**. See [Wrappers](./wrappers.md). |

## Building your app

| Term | What it means |
|---|---|
| Asset | A file that ships inside your app, such as an image, a font or an animation. The **Assets** chip in the Library lists them. See [Images, videos and other files](../design/assets.md). |
| Constraints | Which edges a widget in a Stack keeps its distance to when the screen size changes: **Left**, **Right**, **Left and right** or **Center** across, and **Top**, **Bottom**, **Top and bottom** or **Center** down. You set them under **Layout** in **Details**. The **Constrained Box** wrapper uses the word differently, for the smallest and largest size a widget may take. See [Lay out widgets](../design/layout.md#place-widgets-in-a-stack). |
| Container | A box you can fill with a color, gradient or image, and give a border, rounded corners, a shadow and space inside and around it. See [Widget catalog](./widgets/index.md#container). |
| Dart | The programming language Flutter apps are written in. You don't need to read it: Nowa AI and the visual editor write it for you. |
| Dialog, snackbar and bottom sheet | Three kinds of pop-up. A dialog is a box over the screen that tells or asks something. A snackbar is a short message at the bottom of the screen. A bottom sheet is a panel that slides up from the bottom. See [Show dialogs, sheets, snackbars and pickers](../logic/popups.md). |
| Fixed, Auto and Expand | How a widget's width or height is set under **Layout**: **Fixed** keeps the size you type, **Auto** takes the size of its content, and **Expand** takes the space left in a row or column. See [Lay out widgets](../design/layout.md#size-widgets). |
| Flutter | Google's free, open-source toolkit for building apps for iPhone, Android, the web and desktop from one project. Nowa builds Flutter apps, so what you make is real Flutter code that you own. |
| Group | Widgets held together so they move and resize as one. A group is a **Stack**, a **Row** or a **Column**. See [Lay out widgets](../design/layout.md#groups). |
| Localization and right-to-left (RTL) | Localization means making your app work in several languages. Right-to-left languages, such as Arabic and Hebrew, also mirror the layout: set **Text Direction** to `rtl`. See [Languages and right-to-left text](../design/localization.md). |
| Markdown and HTML | Two ways to write formatted text. Markdown uses simple symbols, such as `**bold**`, and HTML is the language of web pages. The **Markdown** and **Html** widgets show them. See [Widget catalog](./widgets/index.md#markdown). |
| Material and Cupertino | Material is Google's design system and the standard look of Flutter widgets. Cupertino widgets look like iPhone apps. The Library lists both under **Built-in**. |
| Overflow | Content that doesn't fit the space it's given. Text that's too long follows its **Overflow** setting, for example `ellipsis` to end it with "…". Content that's too tall for the screen needs a [Scroll View](./wrappers.md#scrollview). |
| Padding and margin | Padding is empty space inside a widget's edge, around its content. Margin is space outside the edge, between the widget and its neighbors. See [Wrappers](./wrappers.md#padding). |
| Responsive | A layout that adapts to the screen it's on, from a small phone to a wide desktop window. See [Design for every screen size](../design/responsive.md). |
| Route | The path that opens a screen, such as `/home`. The **Router** panel lists your routes. See [Navigate between screens](../logic/navigation.md). |
| Row, Column and Stack | The three ways a group arranges widgets: side by side (Row), one below the other (Column), or layered on top of each other (Stack), where you place each one freely. See [Lay out widgets](../design/layout.md#pick-the-right-arrangement). |
| Safe area | The part of the screen that notches, rounded corners and system bars don't cover. See [Wrappers](./wrappers.md#safe-area). |
| SVG, Lottie and Rive | SVG is an image format that stays sharp at any size, good for icons and logos. Lottie and Rive are animation formats. Nowa has a widget for each. See [Images, video, animations and web content](./widgets/media.md). |
| Widget tree | How the widgets of a screen sit inside each other, like folders inside folders. The **Outline** shows it. See [Use the Outline](../design/outline.md). |

## Logic and data

| Term | What it means |
|---|---|
| Class | In code, the definition of one kind of thing, such as a screen, a component or a model. In the AI chat, you can mention one by typing `@`. |
| Condition | A true-or-false question your logic asks, such as "is the cart empty?", to decide what happens next. An **If** node runs different steps for true and for false. See [Build logic in Circuit](../logic/circuit.md). |
| Expression | A small formula that works out a value, such as a price times a quantity, or a choice between two values. See [Expressions and conditions](../logic/expressions.md). |
| Function | A named set of steps your app runs, such as "add to cart". You build functions in Circuit. See [Create functions](../logic/functions.md). |
| Future and Stream | A Future is a value that arrives later, such as an answer from the internet. A step that waits for it uses **await**. A Stream keeps delivering new values, such as messages in a live chat. See [Build logic in Circuit](../logic/circuit.md). |
| JSON | A common text format for data, made of names and values, such as `{"name": "Mia", "age": 31}`. APIs send and receive it, and Nowa can build a model from it. See [Data models](../logic/models.md). |
| null | Empty: no value at all. An empty widget slot reads **null**, and **Set to null** empties a property on purpose. |
| refresh and notifyListeners | Circuit steps that update what's on screen. **refresh** redraws a screen after its variables change. `notifyListeners` tells every widget that shows a global state to update. See [Store data in variables](../logic/variables.md) and [Share data across your app](../logic/global-state.md). |
| State | The data your app or a screen holds right now, such as what's in the cart or who's signed in. See [Share data across your app](../logic/global-state.md). |
| Types: String, int, double and bool | The kind of value a variable holds. `String` is text, `int` a whole number, `double` a number with decimals and `bool` true or false. Tick **As List** to hold several values of one type in order, such as a list of names. See [Store data in variables](../logic/variables.md). |

## Backend and services

| Term | What it means |
|---|---|
| Ad unit ID | The ID AdMob gives each ad placement in your app, such as a banner. You paste it into Nowa where you place that ad. See [Show ads with AdMob](../integrations/admob.md). |
| API and REST API | An API is a way for one program to ask another for data or actions, like your app asking a weather service for today's forecast. A REST API does it over the web, and it's the most common kind. See [Connect a REST API](../integrations/rest-api/index.md). |
| API key, secret key and token | Codes that prove your app, or you, may use a service. A publishable key is safe inside your app. A secret key works like a password and must stay on a server, because anything inside your app can be dug out. A token is often a temporary key, given after someone signs in. See [Keys and constants](../integrations/constants.md). |
| Authentication | Checking who someone is, for example with an email and a password or a Google account, so your app can show them their own data. Also called sign-in. See [Connect data and services](../integrations/index.md#add-sign-in). |
| Backend | The part of an app that runs on a server instead of on the phone: the database, sign-in and stored files, shared by everyone who uses the app. See [Connect data and services](../integrations/index.md#choose-a-backend). |
| Cloud Firestore | Firebase's database. It stores data in documents, each a set of named values, grouped into collections, such as an `orders` collection with one document per order. See [Use Cloud Firestore](../integrations/firebase/firestore.md). |
| CORS | A browser safety rule: a web page may only call an API that accepts calls from that page's address. It's why an API test can fail in the web app but work in the desktop app. See [Known issues](../troubleshooting/known-issues.md#api-requests-blocked-in-the-browser). |
| cURL, Swagger, Postman and Xano | Common ways to describe or build an API. Nowa can import requests from them. See [Import an API](../integrations/rest-api/import.md). |
| Database | Where your app keeps its data, such as orders, messages or user profiles, so everyone sees the same, up-to-date information. |
| Deep link | A link that opens your app, even a specific screen, from outside it, for example from a message or a QR code. A custom URL scheme, such as `myapp://`, is one kind. See [Deep links](../integrations/deep-links.md). |
| Edge Function | A small program that runs on Supabase's servers instead of in your app, for work that needs a secret key, such as taking payments. |
| Endpoint, method and base URL | An endpoint is one address of an API, such as `/products`. The method says what a request does: **GET** reads, **POST** sends something new, **PUT** and **PATCH** change something and **DELETE** removes it. The base URL is the start all the addresses share, such as `https://api.example.com`. See [Connect a REST API](../integrations/rest-api/index.md). |
| Entitlement and offering | RevenueCat words. An entitlement is what a purchase unlocks, such as `premium` access. An offering is the set of products your paywall shows. See [In-app purchases with RevenueCat](../integrations/revenuecat.md). |
| Firebase | Google's backend service: sign-in, the Cloud Firestore database and push notifications. Connect it from **Settings** → **Integrations** → **Firebase**. See [Connect Firebase](../integrations/firebase/connect.md). |
| In-app purchase and subscription | An in-app purchase is something people buy inside your app. A subscription charges again on a schedule, such as every month, until it's cancelled. See [Connect data and services](../integrations/index.md#stripe-or-revenuecat). |
| MCP | Model Context Protocol, an open standard for connecting AI tools to other apps and services. Nowa's connectors and **Connect External Agent** use it. See [Connect Figma and Supabase to Nowa AI](../ai/connectors.md). |
| Migration | A saved change to your database's structure, such as a new table, kept in order so the same changes can be applied again elsewhere. See [Manage your Supabase backend](../integrations/supabase/backend.md). |
| OAuth and client ID | OAuth is the standard behind buttons like "Sign in with Google": people use an account they already have, without giving your app their password. A client ID tells that sign-in service which app is asking. See [Google Sign-In](../integrations/google-sign-in.md). |
| Package, pub.dev and dependency | A package is a ready-made add-on for Flutter apps, such as charts or maps, and pub.dev is the public site that hosts them. A dependency is a package your app relies on: when a widget needs one, Nowa offers **Add Missing Dependencies**. See [Add packages](../code/packages.md). |
| Paywall | A screen that shows what a subscription or purchase offers and lets people buy it, such as the **RevenueCat Paywall** widget. See [In-app purchases with RevenueCat](../integrations/revenuecat.md). |
| pubspec.yaml | The file that lists your app's name, version and packages. Nowa updates it when you add packages. See [Add packages](../code/packages.md). |
| Push notification | A message that pops up on someone's phone even when your app is closed. **Push Notifications (FCM)** uses Firebase Cloud Messaging to deliver them. See [Send push notifications](../integrations/firebase/notifications.md). |
| Query | A question you ask a database or an API, such as "products in stock, cheapest first". The answer is the data your screen shows. |
| Request, response and header | Your app sends a request to an API, and the API answers with a response, often in JSON. Headers are extra details sent along, such as an API key. |
| Row Level Security (RLS) | Supabase rules, called policies, that decide who may read or change each row of a table, for example only the person who placed an order. See [Connect Supabase](../integrations/supabase/connect.md). |
| SDK | A software development kit: the tools for building for one platform or service. The Flutter SDK is what the desktop app uses to build your app on your computer. See [Install the desktop app](../get-started/desktop-app.md#setting-up-flutter-sdk). |
| SQL | The language for asking questions of databases, such as Supabase's. You don't need to write it: with the Supabase connector, Nowa AI works with your database for you. |
| Storage bucket | A container for files in Supabase Storage, such as profile pictures. Policies decide who may upload and read them. See [Store files in Supabase](../integrations/supabase/storage.md). |
| Supabase | A backend service with a database made of tables and rows, a bit like spreadsheets, plus sign-in and file storage. Connect it from the **Supabase** panel. See [Connect Supabase](../integrations/supabase/connect.md). |
| Webhook | An automatic message one service sends another when something happens, such as Stripe telling your backend that a payment went through. See [Accept payments with Stripe](../integrations/stripe.md). |

## Testing and publishing

| Term | What it means |
|---|---|
| APK, AAB and IPA | App files. An APK installs straight onto an Android phone. An AAB (Android App Bundle) is what you upload to Google Play. An IPA is the iPhone app file that goes to App Store Connect. See [Build history and logs](../publish/builds.md). |
| App Store Connect | Apple's website where you create your app's store page, receive the builds Nowa uploads, invite testers and submit for review. See [Publish to the App Store](../publish/ios.md). |
| Build | Turning your project into an app file a phone or a browser can run. When you publish, Nowa builds your app in the cloud, and you can follow each build step by step. See [Build history and logs](../publish/builds.md). |
| Bundle Identifier | Your app's unique ID in the app stores, such as `com.yourcompany.yourapp`. Apple calls it a bundle ID, and Android calls it a package name or application ID. Set it in **Project Details** before your first build. It isn't the **Package Name** field on the same page. See [Check your app details](../publish/index.md#app-details). |
| Debug and release builds | A debug build is a quick test version you install yourself. A release build is signed and ready for the stores. For Android, the **Debug mode** switch picks between them. See [Publish to Google Play](../publish/android.md). |
| Distribution certificate | Apple's proof that an iPhone app comes from you. Nowa signs every iOS build with it. See [Publish to the App Store](../publish/ios.md#apple-distribution-certificate). |
| Domain and DNS records | A domain is a web address you own, such as `myshop.com`. DNS records are settings at your domain provider that point that address at your app. See [Publish to the web](../publish/web.md). |
| Emulator and simulator | A virtual phone in a window on your computer, for testing without a real phone: an emulator for Android, the iOS Simulator for iPhone (on a Mac). See [Run on a device or emulator](../test/devices.md). |
| Google Play Console | Google's website for publishing Android apps: you upload your app bundle there and fill in its store listing. See [Publish to Google Play](../publish/android.md). |
| Hot reload and hot restart | Two ways to put your latest changes into an app that's running. **Hot Reload** updates it in place, so you stay where you are. **Hot Restart** starts it again from the beginning. See [Run your app](../test/run.md). |
| SHA-1 and SHA-256 fingerprints | Short codes that identify your Android signing key. Services such as Google sign-in ask for them. Nowa shows them on the **Android** tab of **Settings** → **Deployment**. See [Publish to Google Play](../publish/android.md). |
| Signing key | The digital key that proves an Android app comes from you, kept in a keystore file. Google Play needs your releases signed with it, so keep a copy somewhere safe. Nowa can generate one for you. See [Publish to Google Play](../publish/android.md). |
| TestFlight | Apple's way to let testers install your iPhone app before it's on the App Store. See [Publish to the App Store](../publish/ios.md). |

## Code and Git

For people who also work with code. You can build and publish your app without any of these.

| Term | What it means |
|---|---|
| Commit, push, pull and branch | A commit is a saved snapshot of your changes with a short note. Push sends your commits to GitHub, and pull brings in commits made elsewhere. A branch is a separate line of work that you can merge back later. See [Use Git](../code/git.md). |
| Git and repository | Git keeps the history of every saved version of your project, so you can go back or work with others. A repository, or repo, is a project tracked by Git. See [Use Git](../code/git.md). |
| GitHub and access token | GitHub is a website that stores Git repositories online. You connect your GitHub account to Nowa, or, the older way, give it an access token: a password-like code you create on GitHub. See [Connect GitHub](../code/github.md). |
| VS Code | Visual Studio Code, a free code editor from Microsoft. The desktop app can open a local project in it, so you can design in Nowa and code in VS Code side by side. See [Use Nowa with VS Code](../code/vs-code.md). |
| Xcode and Android Studio | Apple's and Google's app-building tools. The desktop app uses Xcode to run your app on an iPhone or the iOS Simulator (Mac only). Android Studio is optional, for creating more emulators. Nowa's cloud builds don't need either. See [Run on a device or emulator](../test/devices.md#what-your-computer-needs). |

## Renamed or removed

If you followed older tutorials, these names changed:

| You may have seen | Now |
|---|---|
| Think Mode | Thinking levels (**Instant**, **Thinking**, **Deep Thinking**) |
| New Chat | **New Session** |
| Replay checkpoint | **Reapply Checkpoint** |
| Instant preview, Play mode | Instant Play (**Play**) |
| Instant Preview Share | **Share preview**, a link and QR code |
| New Cloud Project | **New project** on the dashboard, or **What do you want to build?** |
| Assets panel | The **Assets** chip in the **Library** |
| Widgets panel | The **Library**, with **Page** and **Component** tiles now shown as rows |
| Open widget picker (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd>) | **Add a widget**: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, which opens the Library. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> runs your app. |
| Board chip | The **Boards** chip, with a **Search boards** field |
| Move Up, Move Down, Move To Top, Move To Bottom | **Move Up** is now **Send backward**, **Move Down** is **Bring forward**, **Move To Top** is **Send to back** and **Move To Bottom** is **Bring to front** |
| Fractional Sized Box, Clip Radius, Default text style (wrappers) | **Fractionally Sized Box**, **Clip radius**, **Default Text Style** |

## Next steps

- [Tour the editor](../get-started/editor-tour.md): find your way around the panels and the board.
- [Build your first app](../get-started/first-app.md): put the words to work.
- [Widget catalog](./widgets/index.md): every built-in widget.
