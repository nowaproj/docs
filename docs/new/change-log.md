---
title: "Changelog"
sidebar_position: 2
---

> Detailed log of all updates, improvements, and bug fixes for each version.

---

## **3.16.1 (22 October 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-16-1).

#### **Added 🌟**
- **Instant play**: a new target in the **Run on** menu (the arrow next to **Run**). Your app runs in place of the board, as on a device, with no build, in a **Phone**, **Tablet**, **Desktop** or **Full screen** frame picked from the left of the top bar (the embedded preview gets these sizes too). It plays your app from its home screen, or a prototype from your design folder, and the name next to the frame shows what plays: click it to play one screen on its own, with placeholder inputs, or another prototype. Edits start it again with the change, and **Start over** runs it from the beginning, with the app's global state reset. In the playground and templates, a **Run** button next to **Save** opens it.
- **Select in Instant play**: **Select** (**V**) selects the widget you click, with the board's selection box, size and layer chips. Open **Details** beside the app to edit it. **Shift** adds to the selection. While Select is on, each message to Nowa AI says which screen is on top and what's selected. **Esc** goes back to using the app, and the selection waits, unseen, until Select is back.
- **Comments in Instant play**: **Comment** (**C**) pins a comment where you click. The **Comments** panel lists them with their author, time and screen. A comment can be resolved and reopened, deleted by its author, or sent to Nowa AI with **Fix with AI**. Comments are saved in the project, in `.nowa/comments.json`.
- **Share in Instant play**: **Share** in the top bar copies a link that opens your app with its comments, for the project's members, or for anyone when the project is public. Signed-in viewers can leave comments. A local project has to be synced to the cloud first, and in the playground you save the app first.
- **Data panel**: one **Data** side panel, with a tab each for APIs, Supabase and Firestore, that opens on the tab you used last. Every tab has search, and clear loading, not connected, failed and empty states. **Ctrl/Cmd + 6** opens it (**Ctrl/Cmd + 5** in the playground, where there's no Git panel), and if you had pinned one of the old panels, the pin carries over.
- **Run a Supabase function from the Data panel**: point at a function and click its run button to open its test panel and run it.
- **Hot reload for device runs**: when your app runs on a device or an emulator, **Hot reload** sits next to **Hot restart**. Both save first, and each spins while its own reload runs.
- **Help menu**: **Docs**, **Talk to an expert**, **Support** and **Shortcuts** (**Ctrl/Cmd + .**), at the bottom of the side bar.

#### **Improved ⚙️**
- **Fewer tokens per message**: Nowa AI reads the project's overview with a tool when it needs it, usually once a chat, instead of receiving it with every message. Attached code over 4,000 characters goes as a one-line reference the agent reads only if the request needs it. A widget selected on the board always goes in full. In team packages built with pureUI, the AI reads the pureUI rules once a chat, and the rules are shorter.
- **Themes for Nowa AI**: Nowa AI lists themes written as getters of a class, like `AppTheme.lightTheme`, and knows which theme your boards use, instead of answering that the project has no theme and adding a second one.
- **Design mode in imported apps**: Nowa AI styles your screens with the theme your app's `MaterialApp` already uses. Only when your app has no theme does it add `lightTheme` and `darkTheme` to `lib/globals/themes.dart`.
- **AI chat header in one row**: chat history, the chat's title, an info button with the tokens in and out, **New chat** and **Options**. Credits and the free weekend show in a slim strip above the message field, only when they matter, and a past chat you open shows its title.
- **MCP button**: the Figma and Supabase logos on the message field's MCP button follow the icon theme until the MCP is on.
- **Supabase tab**: **Connect** or **Use API keys** when not connected, Auth, Queries, Storage, RPC and Edge functions in one searchable tree, and **Try again** when a saved connection fails. Each query shows its kind as a tag, **Auth** shows who you're testing as, and pointing at anything in the list shows **Run**.
- **Firestore tab**: collections and queries in one searchable tree, a way to the Firebase settings when it isn't connected, and **Add collection** in an empty project.
- **APIs tab**: search matches collection names, a failed load shows **Try again**, and an empty project shows **Add collection**. Point at a request and click **Run request** to run it.
- **Side bar**: your notifications and the account menu, which now opens **Project settings**, moved to the bottom of the side bar, and the floating support button is gone. The **Router** entry is gone too: select a screen and click the route icon (**Open Router Editor**) under **Route Settings** in its **Details**.
- **Project settings** open as a popup over your project.
- **Back and forward** in the top bar step in and out of Instant play and the embedded preview.
- **Run controls**: while your app plays, its controls stand in the top bar where **Run** was, and **Back to board** gave way to the top bar's back arrow.
- **Experimental settings**: the experimental features dialog is gone, and Nowa AI adds packages for you without an experimental setting to turn on first.
- **Buttons**: one set of sizes across the editor, and **Run**, **Deploy** and the code toggle share the same height and look.

#### **Fixed 🩹**
- Fixed **the color picker's eyedropper** not picking a color.
- Fixed **the console** opening off screen instead of over the status bar.
- Fixed **apps made only for Android** getting an error for a missing iOS AdMob App ID. One of the two App IDs is enough now, and the AdMob settings say when one can be left empty.
- Fixed **methods that return a widget**, like `_buildHeader()`, being reported as "sealed boxes" the designer can't edit.
- Fixed **Git Sync** pulling and pushing a branch checked out in another worktree of the repository instead of the branch you're on.
- Fixed **Details** showing no fields for a wrapper in the middle of a chain.
- Fixed **button labels** using your system's font instead of Nowa's.

---

## **3.15.0 (20 October 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-15).

#### **Added 🌟**
- **Padding and margin handles**: point at a selected widget's padding to see its bands and drag them. Each padding and margin is its own ring, and when a widget has several, each handle names its own, like **Padding 16** or **Container margin 8**. Handles show on padding that's set, and new padding is added in **Details**.
- **Gap handles**: drag the space between the children of a row, a column or a wrap to set its `spacing`, and a wrap's `runSpacing`. A row that spreads its children out (space between, around or evenly) gets a fixed spacing once dragged.
- **Corner handles**: a dot inside each corner rounds all four corners, or only its own with **Alt** (**Option** on Mac). The radius goes where it's already written, like a `ClipRRect`, a `BoxDecoration` or a card's shape.
- **Rotate and flip**: turn a widget from just outside its corners, in 15° steps with **Shift**. **Shift + H** and **Shift + V** flip it, and so does **Flip** in the right-click menu.
- **Shadow handle**: a widget with a shadow shows a handle where its shadow falls. Drag it to move the shadow.
- **Gradient editor**: **Edit gradient** in the right-click menu shows a gradient's ends, center, radius and color stops on the board, as a design tool's gradient editor does. Ends snap to the box's edges and middle, **Shift** keeps the line to 45° steps, and **Esc** finishes.
- **Size label**: the selection's size shows under it, like `120 × 48`, with **Auto** or **Expand** for a side that fits its content or fills the space.
- **Measuring**: hold **Alt** (**Option** on Mac) to see the distances from the selection to the widget under the pointer, or to what holds it.
- **Align and distribute**: for widgets placed freely, in a stack or on the board, design-tool keys: **Alt + A**, **Alt + H** and **Alt + D** align left, center and right, **Alt + W**, **Alt + V** and **Alt + S** align top, middle and bottom, and **Alt + Shift + H** or **Alt + Shift + V** distribute three or more (**Option** on Mac). They're also under **Align** in the right-click menu.
- **Spacing handles**: several widgets placed freely side by side, in the same stack or on the board, show the gaps between them, and dragging one sets them all.
- **Auto layout**: **Shift + A** puts the selected widgets in a row or a column, spaced as they were, and **Shift + Alt + A** (**Shift + Option + A** on Mac) turns a row or a column back into a stack, its children staying where they are. The children of a row or a column get dotted outlines on hover.
- **Wrappers on the board**: a selected widget with wrappers shows them as chips on top of it, outermost first. Pointing at a chip outlines that layer and the padding it adds, and holding **Ctrl** (**Control** on Mac) shows every layer of the widget under the pointer.
- **One frame per widget**: when a handle has nowhere to write yet, like a turn, or rounded corners on an image, it adds one Container around the widget, which later handles write into too. What's already written somewhere, like your own Padding or ClipRRect, is edited where it is.
- **Simplify wrappers**: in the right-click menu, folds a widget's stack of wrappers into one Container wherever it looks the same, in one undo step.
- **Components like design-tool instances**: a component stays closed until you edit it. Double-click enters it at its top layer, the rest of the board dims around an **Editing** label, and an **Editing … Done** bar sits at the top of **Details**.
- **List items**: clicking a widget a loop builds selects that item. The 12 nearest other items are outlined, and the size label says which one it is, like `2 of 3`.
- **Notes in Details**: under a widget's name, **Details** says what the code around it does, like "For each product in products", "Shown when product.isNew", "Rebuilds when counter changes", "Built by _build()" or "From badge". Screens built through a builder are shown through it, and when a helper can't be shown, Details says why.
- **Variant section**: a widget with `@Preview` variants switches between them from **Details**, and the switch can be undone.
- **Helpers and variables in Details**: a helper's call shows its name with a field for each argument and **Edit** to go inside, a variable shows its name and **Edit**, and a child taken from a variable is a **Child** row that selects it.
- **Selection colors**: a selection of many layers lists its colors in **Details**, and marks the ones written as values instead of taken from the theme.
- **Every widget theme**: the **Themes** panel covers all of `ThemeData`'s widget themes (more than 50), grouped and searchable, each with a preview and an editor.
- **Text styles**: a real text style editor, and a text style picker that draws each style, with a tab for each theme extension.
- **Activity line in the AI chat**: the agent's work shows as one line. While it works, the line says what the agent is doing ("Looking at the Home page…", "Thinking…"), and after 20 seconds how long it has been at it. When it's done, the line sums it up, like "Built the Login screen and updated the Home page". Tap it to list each step and open the file, screen or component a change made.
- **Credit limit pause**: when one request hits your plan's limit, the chat says "Nowa paused: this request hit your plan's limit. You still have credits left." with a **Continue** button.
- **Organizations**: if you belong to an organization, the dashboard sidebar has an organization picker that scopes your workspaces, billing, usage and AI credits to it. With an organization picked, account settings get an **Organization** tab with seats, members, invites, roles and the organization's workspaces, which are open to everyone in it. While an organization is picked, Nowa AI uses its credits, also in your personal projects.
- **Run settings**: in local projects, extra `flutter run` arguments go in `.nowa/run.local`, one per line (`#` skips one), which Git ignores. Project settings get a **Run** page with a switch for each argument, and the **Run** tooltip names them.
- **Git sync in the status bar**: the branch shows a `*` when you have local changes, and its ↓behind ↑ahead counts now show whenever the branch has an upstream, even with local changes. Click them to sync. They spin while Nowa syncs or fetches, and the tooltip names the upstream and when it was last fetched.

#### **Improved ⚙️**
- **Smart guides**: snapping reaches 6 px on screen at any zoom. Guides are red, with a cross where each edge or center meets them and the distance to what you line up with, and a widget also snaps to its neighbors' spacing, with the equal gaps marked.
- **Locked values**: a handle whose value comes from a constant or from data shows as locked and says where the value comes from, and a move that can't happen says why beside the pointer.
- **Themes panel**: edits any theme however it's written, following variables, getters, functions, `copyWith`, `merge` and lists to where each value is set. It adds values that aren't set yet, and says why when one can't be written. A theme extension's `onX` colors show paired with their `x`.
- **Board themes**: boards use the package's own theme. When `main.dart` has none, the theme you pick in **Themes** is used and remembered in `.nowa/settings.json`, and board settings no longer have a theme switcher.
- **Pickers**: open beside their panel, level with their row, sized to what they show, and close with **Esc** or a click outside.
- **Theme edits on big boards**: only the widgets that read the theme rebuild, boards out of view catch up when they're back in view, changes apply without animating, and the panel does less work on each step of a color drag.
- **Wrappers in Details**: each wrapper is its own section under the widget. It starts closed and shows its name and what it sets, like "Padding 16" or "Margin 8 · Color #FF0000 · Radius 12". Hovering highlights it, and wrappers stay out of the breadcrumbs.
- **Row and Column padding**: a Row or a Column no longer has its own padding field. Its padding shows as a Padding wrapper section, and the onboarding's padding step points at **Add Wrapper**.
- **Right-click menus**: short and grouped, as in a design tool: copy and paste, then order (with **Order** for one step at a time), then grouping and auto layout, then **Align**, **Edit gradient** and **Flip**, then components and replacing. **Add auto layout** shows only for several widgets, and components no longer offer **Create component**.
- **Board panels**: the panels on a board fold into chips, and an open panel is a card. Cards on one side share a width you can drag, and with a card open, the closed panels are buttons in its header. The **Outline** is docked on every board and starts closed instead of sitting in the side bar, and opening it unfolds to the selected widget. With the Outline out of the side bar, **Ctrl/Cmd + 6** now opens **Api**, and the panels after it move up one.
- **AI chat**: the activity line replaces the typing indicator and the code cards. Code cards can no longer be dragged onto the board: each change is a step with an open button, and the raw call is under the message's options. A response you stop ends with "You stopped this response."
- **AI reliability**: failed requests are retried, short connection and server problems no longer end a run, and stopping or running out of credits keeps the work already done. Tool results match what happened: failed edits are rolled back and reported as failures.
- **AI follow-through**: each request carries the run's open issues (failed steps, actions you declined and new errors), so the agent fixes or reports them instead of claiming success, and a task ticked with nothing changed gets a note.
- **AI and credits**: a large selected or open screen goes as an outline, very large text attachments are trimmed, an unchanged selection isn't sent again, repeated reads with nothing changed in between are refused, several parts of a file are read in one step, and problem reports quote one line instead of a whole method. Each message uses fewer credits, and tasks take fewer steps.
- **Render checks**: the built-in agents can check that the screens they build render without errors at phone and tablet sizes, with images in lists drawn and no false errors on chips, list tiles, date pickers and navigation bars.
- **Errors the AI can act on**: a syntax error quotes its lines, each new problem names its line, and an edit that breaks a YAML, ARB or XML file says so.
- **AI modes**: each mode keeps to its own tools, so **Plan** mode can read your database but can't change your project. The database switch is remembered for each project, and a project reopens on its latest chat.
- **AI and Supabase**: the agent uses your connected Supabase tools, and is guided to turn on row-level security for every table it creates or changes, with rows scoped to their owner when your app has sign-in.
- **AI and permissions**: the agent adds app permissions through Nowa's settings, and no longer edits `Info.plist`, `AndroidManifest.xml` or the `.nowa` folder directly.
- **Design mode**: runs no longer end with a "Your app design is complete" card.
- **AI on cloud projects**: the agent saves its changes much faster, also while the tab is in the background.
- **Saving code**: const constructors, class modifiers and type parameters, widget mixins, const maps, typedefs and the order of declarations are kept as written, and replaced code keeps its place in the file.
- **Loading screens**: screens with small functions that return numbers load and save faster.
- **Running your app**: hot reload and restart show their progress. The restart button spins while Flutter reloads and turns red with the reason when a reload is rejected. Edits from outside Nowa, like an agent's, hot reload the running app once the writes settle, and a `pubspec.yaml` change asks for a new run. Without a Flutter SDK, the run picker says so and offers the setup.
- **Git panel**: refresh is now **Fetch**, the branches menu shows how long ago each branch's last commit was, most recent first, and changed files get an **Open file** button.
- **Editors**: a text file's edits save in any mode, a Dart file opens on its first widget, the logs open scrolled to the end, and **Files** shows folders like `.nowa` and `.vscode`.
- **Menus**: entries use regular body text, and the command palette's labels are regular weight again.
- **Welcome tour**: waits until the AI has finished building your new app.

#### **Fixed 🩹**
- Fixed **a common cause of "No response" errors** from Nowa AI in the web app.
- Fixed **widgets that take both an icon and a child** turning the canvas grey.
- Fixed **a false "Too many positional arguments" error** on valid code, like calling `setState` inside a `StatefulBuilder`, which made the AI rewrite code that worked.
- Fixed **a false type error** when a function is passed where any `Function` is accepted, and a `StatefulBuilder`'s `setState` call missing its callback not being caught.
- Fixed **the AI changing a different widget** than the one you selected, and chasing problems that were already fixed.
- Fixed **the AI stopping on Supabase tasks** instead of using your connected Supabase tools.
- Fixed **stopping the AI or running out of credits** losing the work it had already done.
- Fixed **the AI losing helper code** when it wrote new files, and reporting a change as done when part of it didn't save.
- Fixed **Enter sending a half-typed message** in the AI chat while typing Japanese or Chinese in the Mac app.
- Fixed **Plan mode** being able to change your project, and the database switch turning off between visits.
- Fixed **app permissions the AI added** being lost.
- Fixed **screens on the board** not updating after the AI edited them until you clicked them.
- Fixed **a stateful widget on the board** showing bare default values, or an error box for a `late` controller, after you changed one of its fields.
- Fixed **the AI's highlight** on the widgets it works on not following a switch between light and dark.
- Fixed **false "View.of()" and null-check errors** in the Logs panel and in Play after Nowa AI checked a screen with images in a list.
- Fixed **screens that failed to render** staying broken until **Reload screen**, even after the next change fixed them.
- Fixed **the preview stopping** on "Failed to start/restart session: 409".
- Fixed **enabling RevenueCat or finishing the Stripe setup** replacing your own code in Android's `MainActivity.kt`.
- Fixed **saved code** losing a `!` or `?.` you wrote, like `friendMap[authorId]!` becoming `friendMap[authorId!]`, or getting ones Dart doesn't need, including inside brackets.
- Fixed **printing a value that can be null** being saved with a `!` that crashes when the value is null.
- Fixed **closures** losing their parameter types, optional brackets and default values when saved.
- Fixed **`final`, `const` and `late` variables set to `null`** losing their `= null`, so the code no longer compiled.
- Fixed **extension members** being saved as `static`, like `safeSetState` and setters, or losing a `static` they had.
- Fixed **generic extensions** losing their type parameters, like the `<T>` in `extension FirstOr<T> on List<T>`.
- Fixed **annotations being removed** when Nowa saved code: `@pragma` (which Firebase background message handlers need in release builds), `@Deprecated`, a field's `@override`, package annotations like `@JsonSerializable`, `@JsonKey` and `@HiveType`, and annotations on extension members, enum values and widget constructors.
- Fixed **decimal numbers like `1.0`** being saved as whole numbers in Nowa on the web, and lists of them written in code, like `stops: [0.0, 0.5, 1.0]`, being reported as errors.
- Fixed **numbers in brackets**, like the `1` in `pressed ? 0.9 : (selected ? 1.1 : 1)`, being reported as the wrong type, and gradient stops written this way breaking the preview.
- Fixed **map keys** being saved as the map's value type, like `scores[1]` becoming `scores[1.0]`, or with a `?` or `!` that broke the code.
- Fixed **switching a property to another constructor** in the designer writing broken code like `Border.Border()`, and the switch undoing itself after the next change.
- Fixed **false errors** on the results of `clamp` and `remainder`.
- Fixed **dot shorthands** like `on ? .start : .center`, `(.start)` and `[.start]` showing a false "Undefined name" error and an error box on the canvas.
- Fixed **`name.characters`** being reported as an error and failing in the preview.
- Fixed **typed lists, sets and maps** like `<double>[0]` holding whole numbers in the preview.
- Fixed **a function that returns a function**, or one that returns a shorthand like `.center`, failing to save.
- Fixed **lists that mix kinds of items**, like dropdown items with a "None" item or text spans of different kinds, being reported as the wrong type.
- Fixed **Copy as new widget** making code that didn't compile: getters, setters, operators, fields with defaults, `const` constructors and custom functions are now copied as they should be.
- Fixed **radio buttons in a `RadioGroup`** not showing which one is selected on the canvas, or not responding to taps.
- Fixed **code using a package Nowa can't fully read**, like file_picker's `pickFiles()`, being reported as using a `void` value in local projects.
- Fixed **a false "undefined" error** after an `is!` check, like in `if (box is! RenderBox || !box.hasSize) return;`.
- Fixed **a State's method passed as a builder**, like `builder: _buildMenu`, failing on the board with a null-check error.
- Fixed **selecting a text with a variable in it**, like `'Hi, $userName'`, breaking its field and the board while a screen reader is on.
- Fixed **undoing a change to a group on the board**, like turning a stack into a column from the group panel, failing with an error.
- Fixed **the Fix and Undo buttons** on snackbars not being visible.
- Fixed **loops and conditions** showing as "null" in widget lists.
- Fixed **trackpad scrolling over a color picker** changing the color.
- Fixed **a pull in a local project** overwriting your uncommitted changes. It now stops with "Your uncommitted changes would be overwritten. Commit them first, then sync again."
- Fixed **text files in an unknown language** failing to open.
- Fixed **package caches** not refreshing after an update on Windows.

---

## **3.14.1 (15 October 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-14-1).

#### **Added 🌟**
- **Library grid view**: a **View** menu at the top of the Library switches between **Tree**, **List** and **Grid**. Grid shows each folder's widgets as preview tiles, without the details popup.
- **Zoom menu**: click the zoom level in the board toolbar for **Zoom in**, **Zoom out**, **Zoom to fit**, **Zoom to selection** and **Zoom to 100%**. Zoom goes from 5% to 1000%.
- **Design-tool keys on the board**: **+** and **-** zoom in and out, **Shift + 1** zooms to fit, **Shift + 2** to the selection and **Shift + 0** to 100%. **Enter** selects the layers inside, **Shift + Enter** the layer above, **Esc** goes up a layer and then deselects, a double-click selects one layer deeper and **Ctrl/Cmd + Click** the deepest layer. The Shortcuts sheet has new **Zoom** and **Layers** groups.
- **Paste to replace**: right-click a widget and choose **Paste to replace** to swap it for the widget you copied. It keeps the target's place and layout and is one undo step. Offered when one widget is selected and it isn't the root of a board item.
- **Must match validator**: **+ Add validator** offers **Must match validator**, with **Message** and **Must equal** fields, for checks like "Repeat password". A `!=` rule written in code loads as **Must match**.
- **Edit approval for agents**: when an AI agent, Nowa's own or one connected over MCP, is about to change a file outside the package open in Nowa, a dialog names the file. **Cancel** leaves it unchanged and tells the agent, and **Allow** lets the change through without asking about that file again until the project is closed.
- **UI packages for agents**: in a team's UI package (a workspace package with no `lib/main.dart`, or with a `design/` folder), an agent's previews, mock data and prototypes go to `design/<feature>.dart`, and only the widgets and their contract go to `lib/`. Each new widget lands on the open board in a row of its own, with its states in the order they're written and, for a screen, its prototype. A widget whose UI is built by helper methods gets a "Sealed box" warning.
- **New MCP tools and options**: `list_boards`, `get_board` and `place_on_board`; `open_project` takes a `package` (name or path) and lists the workspace's packages; `screenshot` with a `declaration` shows a widget's `@Preview` states two to a row.
- **AdMob App ID check**: a problem is listed when the app uses AdMob but its Android or iOS App ID isn't set, with a way to the AdMob settings.
- **Await check**: a warning when `await` is used on a call that no longer returns a `Future`, with a one-click fix that removes it.
- **New File and New Folder** in a folder's right-click menu in **Files** (code mode).
- **Arrow keys in number fields**: **Up** and **Down** change the value by 1, and by 10 with **Shift**.

#### **Improved ⚙️**
- **App icons**: Nowa writes only the icon files the Flutter template uses (15 for iOS, 7 for macOS) and gives iOS icons a white background, because the App Store rejects icons with transparency. Platforms without a folder in the project are skipped, and `AndroidManifest.xml`, `project.pbxproj`, `web/manifest.json` and the `Contents.json` files are no longer rewritten. Icons are drawn off the main thread, so the editor stays responsive.
- **Local notifications on Android**: apps using `flutter_local_notifications` get core library desugaring turned on in their Android build.
- **SHA-1 keys**: the Firebase Auth panel recognises SHA-1 keys with or without colons and extra spaces.
- **Models from JSON**: generated `fromJson` uses a field's default value when an object or list is missing from the response.
- **Supabase**: generated insert and update functions leave out null fields.
- **AI with several widgets selected**: every selected widget is attached to the prompt.
- **AI turns that go quiet**: a turn whose stream stops sending is ended and retried.
- **Agent tool errors**: a tool call with wrong arguments now names the missing, unknown or mistyped ones and lists what the tool takes.
- **Team packages**: Nowa adds `nowa_runtime` to a workspace package the first time a saved file needs it, declares fonts relative to the package, and `download_font` returns the `TextStyle` with the font's `package`. Fonts declared from the workspace root by older versions move into the package.
- **Agent guidance for UI packages**: sample content stays in `design/`, each component gets its own file, a task ends with a screenshot of every screen and component, and `get_theme` in a package without a theme asks for `lightTheme` and `darkTheme` in `lib/globals/themes.dart`, with brand tokens in a ThemeExtension.
- **Outline**: layers are named by what they show (the data a text reads, an icon's name, an image's file), and right-clicking one of several selected rows keeps them all selected.
- **Text properties**: the font and size fields show what the text is drawn with, including a theme text style's font and size.
- **Circuit**: node titles show the object a method is called on, like `emailController.clear`.
- **New screens** are placed in the middle of the view.
- **Pasting SVG**: SVG markup copied from another app is added as an SVG image in your assets.
- **Undo**: renaming a component from **Details** can be undone.
- **Menus**: action and right-click menus show every entry up to the screen's height (menus with a search field keep their cap), and menus round to 8 px.
- **Help popups**: one help component across Nowa, with selectable text so IDs, URLs and keys can be copied.
- **Library previews**: show after 100 ms instead of 400 ms.
- **Status bar**: one line per log, and every count opens Problems.
- **Clone to local**: cloning a cloud project to your computer no longer needs the Flutter SDK, and the steps that do need it lead to the Flutter SDK setup.
- **Git panel**: refreshes when Nowa regains focus, so commits and checkouts made in a terminal or another editor show up without saving first.
- **Updates on Mac**: Nowa swaps in the new app before it restarts, and the update dialog shows an error if the new version can't be put in place.
- **Feedback**: the project snapshot attached to feedback leaves out assets to stay under the 10 MB limit, and the message is sent even when the snapshot can't be attached.
- **Rating prompt**: asked only from the third day you use Nowa, as you come back to the dashboard after a work session, never on sign-in.
- **Environment setup**: the setup wizard's notes, like the Xcode requirement and the low-space warning, are clearer callouts.

#### **Fixed 🩹**
- Fixed **apps failing to build after editing a widget** given an enum-typed field, parameter or property, because Nowa wrote `const` in front of it.
- Fixed **a change made while its file was being saved** being lost, such as the imports an agent's code needs.
- Fixed **updates on Mac** sometimes restarting into the old version and showing the update prompt again.
- Fixed **generated Supabase insert and update functions** sending null fields, which made them fail on phones.
- Fixed **AI prompts with several widgets selected** only changing the first one.
- Fixed **the AI** staying stuck when its connection went quiet in the middle of a task.
- Fixed **AI chat** breaking on Arabic, emoji and other multi-byte text arriving in pieces, and background errors piling up while offline.
- Fixed **the AI's file tools** opening and overwriting Nowa's cache files in `.nowa/temp`.
- Fixed **fonts and components an agent adds to a team's package** failing the team's checks and build, because `nowa_runtime` wasn't added and fonts were declared from the workspace root.
- Fixed **Android builds** failing for apps that use local notifications.
- Fixed **SHA-1 keys** not being recognised in the Firebase Auth panel.
- Fixed **generated `fromJson`** leaving objects and lists empty, or crashing, when the response left them out.
- Fixed **"not equal" validator rules** written in code turning into a **Required** rule after any edit to the validators.
- Fixed **Copy as new widget** leaving the copy linked to the original, so editing or deleting widgets in the original broke the copy.
- Fixed **turning on await** for a call with an **On Value** leaving both in the code.
- Fixed **pasting SVG markup** from another app pasting its code as text.
- Fixed **Create component** being offered for function and variable widgets, where it couldn't work.
- Fixed **new screens** being placed off to the side of the view.
- Fixed **right-clicking in the Outline** dropping a multi-selection.
- Fixed **renaming a component from Details** not being undoable.
- Fixed **timers started in Play** running on after Play stopped.
- Fixed **sending feedback** getting stuck in local projects with large assets.
- Fixed **cloning a project to local** failing with a bare error when the Flutter SDK wasn't set up.
- Fixed **the Outline** red-screening while a component rebuilt, and an error anywhere in the editor failing the canvas mounted last so that **Reload** couldn't bring it back.
- Fixed **the Outline** missing the rows of calls into files written at the same time, until the class changed.
- Fixed **a board's theme** only applying once something else rebuilt the canvases, in projects whose app has no theme.
- Fixed **adjacent string literals** like `'a ' 'b'` showing their quotes on the canvas.
- Fixed **functions that return from several places** showing only their last return on the board.
- Fixed **drag and drop** choosing the dragged widgets or a component's insides as the drop target.
- Fixed **a running design** using the editor's snackbars and navigator instead of its own.
- Fixed **theme tokens** like `colors.inverse.textPrimary` showing as the plain token.
- Fixed **Create Variable** missing from a button's link menu, and **undo** for files dropped on the board.

---

## **3.14.0 (13 October 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-14).

#### **Added 🌟**
- **Linux desktop app**: the Nowa desktop app now runs on Linux, alongside Mac and Windows. Choose **Linux** when you download Nowa to get the 64-bit version, with an install script that adds Nowa to your app menu.
- **Firestore panel**: a new **Firestore** panel in the left sidebar shows your collections and queries, with **Add Main Collection** and **Add New Query**.
- **Delete account in Firebase Authentication**: Authentication now generates `Future<bool> deleteAccount()`, which returns false when no user is signed in or a recent login is required. Projects that already have Authentication on get it after turning Authentication off and on.
- **Google Pay environment**: a new **Environment** dropdown in Stripe (**Test** or **Production**) sets the Google Pay mode.
- **Restore purchases**: the RevenueCat service now includes `restorePurchases()`. Only new projects get it.
- **SSH keys in local projects**: an **Access Token** | **SSH Key** tab bar for local Git credentials, and `ssh://` and `user@host:path` remote URLs are accepted. Keys are looked up in `HOME`, then `USERPROFILE`.
- **Later on key reminders**: the **Important!** dialog for the Android signing key and the iOS certificate now has a **Later** button.
- **Unsaved changes warning**: the web app asks before you leave while files are still unsaved (not in the playground or guest projects).

#### **Improved ⚙️**
- **Code Nowa can't load**: top-level code Nowa doesn't load (functions, typedefs, exports, extension types) is kept as written, with its comments and in file order, when Nowa rewrites the file. Only load failures are listed in Problems for that file.
- **Files Nowa didn't change**: Dart is formatted with the package's SDK language version, as `dart format` does, so untouched code keeps its style. YAML is edited in place, keeping comments, quoting and layout. `nowa_runtime` and `nowa_mobile_ads` are only bumped when their constraint rules out the current version. New projects declare SDK `^3.8.0`.
- **Pubspec assets**: refreshing the pubspec keeps the project's own `assets` entries (other folders, files, and `path:`, `flavors:` and `transformers:` entries) and only adds or drops Nowa's `assets/` folders.
- **Platform files**: App Name, permissions and bundle ID now patch only Nowa's part of `AndroidManifest.xml`, `Info.plist` and `build.gradle(.kts)` instead of rewriting them.
- **Widget sizes on the board**: a widget without a size fits its content instead of 400 × 400, up to the device's width. Content that can't be measured (scroll views, `LayoutBuilder`) takes the device's size. Library previews are measured the same way, and resizing a canvas no longer writes auto width or height into the widget's code.
- **Supabase edge functions**: deployed with the JWT check on, and only `stripe-webhook` stays public. **Pull Backend Files** records each function's `verify_jwt` and **Set up Backend** uses it, and the setup summary lists public functions. A public function in a bundle pulled before 3.14 gets the check on its next deploy, so pull the bundle again to keep it public.
- **Stripe**: regenerating the payment service only touches Nowa's own members and skips any you edited. Each migration, deploy and secret step reports its own error. The webhook returns 500 when `STRIPE_WEBHOOK_SECRET` isn't set.
- **Firebase Connect Apps**: can be retried after a failure, shows the real error (the app limit only for quota errors), stops waiting after about 5 minutes, and saves the project right away when auto save is on.
- **Firebase clean-up**: disconnecting removes `google_sign_in` (including its iOS config), and turning Email/Password off removes `sendPasswordResetEmail()`.
- **Deep links**: Flutter's deep link handling stays on so links reach the router, the fixed `open.my.app` host is removed (**Host** is for Android App Links only), saving a field updates every platform file, and `Info.plist` holds `CFBundleURLTypes` once. If your project has its own `app_links` listener, switch Flutter's deep link handling off by hand.
- **Package versions**: the **Enabled** switch installs the integration's pinned version, so packages like RevenueCat's no longer clash. The Version of a git or path package is read-only.
- **Library**: search results are grouped Project, Built-in, Packages, Assets, so **Enter** picks a built-in widget before a package one. **New Model** and **New Global State** open the new file, View Only members can't edit through the Library, and adding a template to an existing project adds its packages.
- **Scaffold slots**: an App Bar, FAB, Bottom Navigation Bar or Drawer dropped on a screen goes into the Scaffold's slot.
- **Assets**: renaming or moving an asset updates widgets that use its path, and undo puts them back.
- **Missing packages**: the check covers the whole dropped tree, including drops from outside the board, and **Add Missing Dependencies** can always be cancelled and shows a failed install.
- **Detach**: replaces the component's parameters with the values passed to it, or their defaults. A component that uses its own state can't be detached, and says so.
- **Menus and search**: one menu design with a pinned search, fuzzy matching with highlighted matches, and arrow keys, **Enter** and **Esc**. The board, package and Git branch pickers use it, and a menu closes when what opened it is pressed again.
- **New look**: colors and text styles across Nowa now come from one set of design tokens, and **Run** and **New project** are split buttons.
- **Problems panel**: rebuilt, and the code editor's error banner opens the console's Problems tab. Guests and the playground see "Code check needs an account" instead of an error.
- **Flutter processes**: Nowa stops the Flutter processes it started when it exits, even after a crash. Local projects start Nowa Run when the preview is opened, not when the project opens.
- **Flutter SDK install**: extracting the SDK no longer freezes the window.
- **Imported projects**: open on the package's first board instead of a new empty one.
- **Run on**: devices and emulators are refreshed every time the menu opens, an emulator gets one retry after a timeout, and errors show in the menu.
- **Restore Checkpoint**: says "Undo N Requests?" and lists the files of every request it undoes.
- **Error messages**: no longer start with "Exception: " and stay on screen for 4 seconds.
- **Status bar**: the error count opens Problems, and the warning and info counts open Logs.
- **Server errors**: a 503 opens maintenance mode and other server errors open the server error screen, instead of sending you to sign in.
- **Board requests**: in design mode, Dio requests get a mocked response, so the board no longer sends real requests.
- **REST API**: an `x-www-form-urlencoded` body uses the plain text editor, **Ctrl/Cmd + Z** undoes request body edits, and **None** shows in the Select API, Supabase and Firestore pickers. The DOWNLOAD method is no longer offered (requests already using it still open).
- **Circuit**: functions with `for`, `switch`, `break` or `continue` now open, with those statements shown as an **Edit in code mode** node.
- **Dart support**: `try`/`catch` with `on` types, `if (x case ...)` with guards, and closures with named or optional parameters now run in the designer. A widget with only named constructors defaults to the first public one.
- **iOS certificate key**: the key must be a PEM private key, the picker offers `.pem`, `.key` and `.p12`, and the download is a `.pem` file.
- **Publishing**: a failed code check stops web publish instead of leaving it on Deploying, a failed build start no longer greys out **Deploy** and **Build**, and iOS builds use the project's current bundle ID.
- **AI chat**: **Attach text file** works on the web, and **Auto-approve tools (all connectors)** is in the Supabase MCP menu too.
- **Shortcuts**: the Shortcuts sheet matches the real keys, Windows and Linux show Ctrl hints, sidebar tooltips show the right numbers, and **Ctrl/Cmd + B** only opens the board picker in design mode.
- **Passwords**: a new password needs at least 8 characters.
- **New dialogs**: the suggested name is selected, so typing replaces it.
- **Playground**: a playground too large to keep in the browser now says so instead of silently reverting to an older copy.
- **Other touches**: a new Slider follows the theme's Primary color, the Empty Page template offers device sizes, View Only members get Copy and Export on the board, and only owners see member actions.

#### **Fixed 🩹**
- Fixed **Accept Local after Bring my changes** throwing away your own edits, because the Local and Remote panes were swapped.
- Fixed **Accept Remote** sometimes writing the next file's text into the file you resolved.
- Fixed **accepting one conflicted file** clearing every conflict.
- Fixed **deleting an imported local project** deleting its folder. Older entries now name the folder in a **Delete Project and Files** dialog.
- Fixed **Remove on a group** deleting every child but the first.
- Fixed **local Revert** only staging the undo instead of committing it, and **Revert** and **Undo** doing nothing but reporting success when there were uncommitted changes.
- Fixed **a missing Git identity** showing a raw error, and **local pulls** dropping conflicts and errors from their merge.
- Fixed **Firestore collections and queries** missing from the pickers after reopening a project, until **Refresh** was clicked.
- Fixed the **Firestore query builder**'s add and doc steps failing with "The function 'add' isn't defined", and clicking a query parameter blanking the builder.
- Fixed **Firebase Google sign-in** code not compiling against `google_sign_in` 7.x.
- Fixed **an expired Google sign-in** during **Send Test Notification** disconnecting Firebase from the project.
- Fixed **the Firebase iOS app** being registered with a re-cased bundle ID.
- Fixed **removing Google** keeping "Managed by Firebase", and the **phone auth** toggle not being saved.
- Fixed **the `stripe-cancel-subscription` edge function** being generated with a syntax error.
- Fixed **Supabase Connect** staying on "Waiting for Authorization..." when no organization was found.
- Fixed **Supabase template functions** getting invalid names like `getAllTodo Items`.
- Fixed **Fix with AI** saying the backend was already configured. The prompt now names the failed step, the error and the migration SQL.
- Fixed **Open Supabase** doing nothing for some hosts, and the backend bundle being unknown after reopening a project.
- Fixed **typing `/`** in a Details field focusing the AI chat, which saved paths like `/product/:id` as `product:id`.
- Fixed **Create Variable...** on a property left at its default making a variable with no value.
- Fixed **Min length and Max length** validators losing their number.
- Fixed **Navigator, GoRouter, Media Query and Show snackbar** being offered in functions with no `context`.
- Fixed **switching a screen's group** from Column to Row breaking its App Bar.
- Fixed **Route Settings** dropping edits to a route's Path and a parameter's Default value, **Add Redirect Logic** still showing **+**, and **Full Path** keeping the old path.
- Fixed **Google Maps and AdMob fields** missing after reopening a project.
- Fixed **Import from curl** keeping only the path.
- Fixed false **"Undefined name 'headers'"** problems in Dio interceptors.
- Fixed **the Dropdown Value row** editing the wrong property, and **Create Param...** hitting a null check.
- Fixed **void functions** missing from an event's link menu.
- Fixed **a pending custom domain** that couldn't be removed.
- Fixed **Attach all** on the shared preview throwing, and the **Single Screen Preview** warning showing on screens that have a route.
- Fixed **playing another screen** still showing the first one.
- Fixed **the AI chat toolbar** breaking in the playground when signed out.
- Fixed **Linux** starting on a black window without NetworkManager, and **Browse** doing nothing without a file dialog portal.
- Fixed **failed Figma, Supabase and GitHub connections** waiting without saying why.
- Fixed **the Git panel** getting stuck on an error after opening a project.
- Fixed **Clone from GitHub** showing an empty box when GitHub wasn't connected.
- Fixed **New Folder...** in the Library doing nothing, and the Library search losing the first letter you typed.
- Fixed **Expand** being offered to a child of a Wrap.
- Fixed **Globals** hiding variables that aren't final.
- Fixed **a big zoom step** breaking the board view, even after a reload.
- Fixed **T, R and V** switching tools while renaming.
- Fixed **a Bottom Navigation Bar** set through the Scaffold slot not being connected.
- Fixed **a Shift-drag** leaving its screen, and **dragging across an app bar** turning Auto sizes into fixed ones.
- Fixed **a canvas going blank** on a Row or Column emptied by its ifs, and **a board loading forever** when a file it depends on was moved or deleted.
- Fixed **Add to board** on a variant putting its preview function inside the app.
- Fixed **Cmd/Ctrl + K** needing a second click after clicking outside a text field.
- Fixed **holding the mouse** on the board opening the context menu.
- Fixed **Add Function** not selecting the new function, and the **component crumb** missing for a component's top widget.
- Fixed **Details showing "Instance of 'PlaceData'"** after choosing Shape or Text, **pasting a BMP image** doing nothing, and **the breadcrumb** keeping "Stack" after changing a group to Column.
- Fixed **Set up** on a Deploy row opening the Android tab, and **Download code** spinning forever.
- Fixed **build logs** showing HTML entities, and **Explain with AI** sending raw HTML.
- Fixed **picking a `$` variable** selecting the whole field.
- Fixed **the feedback popup** coming back and stealing focus.
- Fixed **the Web View documentation link**, the **Library filter** saying "Classs", **Create Theme Setup** naming the wrong files, and several labels and typos in dialogs.

---

## **3.13.0 (6 October 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-13).

#### **Added 🌟**
- **Library panel**: replaces the Widgets panel. One searchable list of your screens, components, models, global states, classes, functions and variables, the widgets in your packages, Nowa's built-in widgets and Flutter's libraries, and your assets. Filter it by kind, turn sources on and off with the **Project**, **Packages**, **Built-in** and **Assets** chips, insert with drag and drop or **Ctrl/Cmd + Enter**, and jump to the code with **Show in code**.
- **Add and go to from the keyboard**: **Ctrl/Cmd + K** and the toolbar's **Widget** tool open the Library ready to add a widget. In the designer, **Ctrl/Cmd + O** opens it to go to one.
- **Back and Forward**: arrows in the top bar, and **Ctrl + -** / **Ctrl + Shift + -** (Control on macOS too), step through the screens and files you opened.
- **Board picker**: the board chip lists every board in your project, with search, rename, delete and **Create new board**. **Ctrl/Cmd + B** opens it.
- **Linux desktop app**: a 64-bit `.tar.gz` with an `install.sh` that adds Nowa to your app menu. On Linux, updates are downloaded from the update dialog, and your app's preview opens in your browser.
- **Widget variants from `@Preview`**: each Flutter `@Preview` becomes a named variant of its widget, shown next to the component, as a choice in the widget picker, and under the widget in the Library.
- **Theme extensions in the pickers**: the color picker has a tab per theme extension next to **Material**, and the text style picker groups each extension's styles.
- **Default option** first in the dropdown of an enum property that can be left empty.
- **Branch search** in the Git branch menu.
- **Package support**: `gap`, `flutter_animate`, `google_fonts` and `smooth_page_indicator` now work in the designer.

#### **Improved ⚙️**
- **Files panel**: now in code mode only, with keyboard navigation, and several selected files drag into a folder together.
- **Menus and shortcuts**: **Bring forward**, **Send backward**, **Bring to front** and **Send to back** replace the old move entries, and **Ctrl/Cmd + Alt/Option + ]** or **[** moves a widget all the way. Key hints list modifiers in Mac order (⌃⌥⇧⌘), and menus close when the board pans or zooms.
- **Packages**: in local projects, `git:` and `path:` dependencies load as packages, and `sdk:` dependencies like `flutter_localizations` count as installed.
- **Hand-written code on the board**: relational and `&&` switch patterns, named arguments passed to `super(...)`, callable classes, `firstWhere(orElse:)` and more. Screens from open-source apps like compass_app and Wonderous render.
- **Placeholders**: a package widget Nowa can't draw is a small box sized to its label, one that wraps a child shows the child, unset optional colors and enums keep the widget's own defaults, and a placeholder image with no size is 48 × 48 px.
- **Local projects**: dependencies added to `pubspec.yaml` outside Nowa load without reopening the project, and hidden editor temp files are never loaded as code.
- **`nowa_runtime` 0.2.0**: no longer includes `smooth_page_indicator`. Projects that use it get a **Page indicator migration** dialog that adds it to `pubspec.yaml`.
- **Playing from a title**: playing a screen or component from its title also selects it.
- **New look**: refreshed buttons, lists, trees and menus.
- **Announcements**: at most two banners at a time, and expired announcements no longer show as banners.

#### **Fixed 🩹**
- Fixed **edits made in another editor right after Nowa saved** being ignored in local projects.
- Fixed **`part` and `library` lines** being dropped when Nowa saved a file.
- Fixed **a hand-written `main()`** being rewritten by Nowa.
- Fixed **a project's own `LocalizationsDelegate`** blanking the board when it failed to load.
- Fixed **screens painting outside their frame** on the board, so overflow, error boxes and blurs no longer cover the screens next to them.
- Fixed **snap guides** that didn't line up with widgets at some zoom levels.
- Fixed **Material 2 themes** showing a grey background behind widgets on the board.
- Fixed **the editor's font**, which fell back to the system font instead of Albert Sans.
- Fixed **`.nowa/settings.json`** being rewritten by every new release, which showed up as a change in Git.
- Fixed **`index.html` files that inline Flutter's bootstrap** being replaced when Nowa opened the project.
- Fixed **the Shortcuts sheet** showing the wrong key for adding a widget, and **the right-click menu** showing one key for both move entries.

---

## **3.12.5 (25 September 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-12-5).

#### **Added 🌟**
- **Play any board item**: Instant Play now works on any item on the board, including plain widgets and wrapped components, not only screens and components. Right-click a widget and choose **Play** to play the item it belongs to, and while something plays, select another item to play that one instead.
- **Switch branches with local changes**: switch or create a Git branch without committing first. Changes that don't clash with the other branch come along automatically. When they do clash, Nowa asks before bringing them along and opens the conflict resolver if they don't apply cleanly. Unsaved edits are saved before switching. Works in local and cloud projects.
- **Images for connected agents**: the new `add_image_assets` tool lets Claude Code, Claude Desktop, and Cursor add images from links (like the asset links Figma's MCP returns) or from local files. Nowa downloads them into `assets/images/` and registers them in `pubspec.yaml`. Supports PNG, JPG, GIF, WebP, BMP, and SVG.
- **Package support**: `equatable` (classes extending `Equatable` or using `EquatableMixin` compare by their `props`), `auto_size_text`, and `package:collection` iterable extensions like `mapIndexed` and `flattened` now work in the designer.

#### **Improved ⚙️**
- **Big board performance**: up to 50x faster on big boards. Canvases build one per frame with the visible ones first, off-screen canvases hold their rebuilds until they're back in view, animations and timers only run on the canvas you're hovering, selecting, or playing, and when more than 8 canvases are in view the rest are drawn from a snapshot. Panning no longer rebuilds canvas titles.
- **Faster project opening**: the analysis of packages from the pub cache is now saved on disk and reused across sessions, only each package's API is read, and packages are analyzed one at a time so they no longer wait on each other.
- **Widgets panel previews**: previews play their animations for a moment, then pause, and are no longer rebuilt from scratch every time the panel updates.
- **Snapping**: moving and resizing snap more precisely to nearby edges and centers, and resizing only snaps the edge being dragged.
- **FlutterFlow projects**: pages calling `safeSetState`, custom functions called through an import prefix, streams of Firestore records, and flags written as `flag!` now render in the designer with placeholder data. A field whose stream can't start without Firebase no longer stops the whole page from rendering.
- **Placeholder widgets**: a widget the designer has no value for now shows as a small slot instead of taking over the layout.

#### **Fixed 🩹**
- Fixed **projects that import the same files from nearly everywhere**, like the theme and utility files in FlutterFlow exports, hanging while loading their dependencies.
- Fixed **screens that import a design system through a single file that re-exports it** rendering before the theme it re-exports had loaded.
- Fixed **custom app bars** that extend `AppBar` being rejected as a screen's app bar.
- Fixed **custom fonts** declared in `pubspec.yaml` showing as a default font on the canvas. Font families now load under their own names in every weight, and Nowa keeps your own font declarations (families, weights, styles) when it updates the pubspec, instead of replacing them.
- Fixed **stateful components** running `didUpdateWidget` before receiving their new values and without `oldWidget`, which kept components like text fields from reacting to their new values.
- Fixed **overrides that read `super`**, like an app bar overriding `leading`, calling themselves until the editor froze.
- Fixed **constructors that set fields in their initializer list**, like a tab bar creating its `TabBar` there, leaving those fields empty in the designer.
- Fixed **gradient masks**: a `ShaderMask` given a method like `gradient.createShader` now paints its gradient.
- Fixed **`NotificationListener`** passing its callback notifications of other types, which could stop the canvas from responding to the mouse.
- Fixed **components with animations** showing an error when removed from the board, and not restarting when shown again.
- Fixed **a missing SVG file** taking down the whole canvas. Now only that image stays empty.
- Fixed **SVG colors defined with CSS variables** turning black when saved from the AI chat or by a connected agent.
- Fixed **theme extensions from a previously opened project** carrying over into the next one.
- Fixed **date pickers** failing in the designer when their optional dates were filled with placeholder values.
- Fixed **items that size themselves** playing at the wrong size in Instant Play.
- Fixed several **Dart expressions** in the designer: `int` values assigned to `double` properties (like `Paint()..strokeWidth = 2`), `??`, `&&` and `||` with an `await` operand, method calls on `dynamic` values, optional named parameters in function types, and `RegExp` defaulting to case-insensitive.

---

## **3.12.3 (22 September 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-12-3).

#### **Added 🌟**
- **Figma MCP**: connect your Figma account and Nowa AI can bring your images and icons (SVGs included) into your project as assets, and turn your Figma colors and text styles into your app's theme. Turn it on from the **Figma icon** in the AI chat, and connect or disconnect anytime from **Account Details → Connected Accounts**. Works in cloud and local projects, and is available to everyone.
- **One-click web support**: when the in-app preview can't run because your app has no `web/` folder, Nowa explains why and can add web support for you.
- **Problems panel filter**: choose whether Nowa checks only the code it generated or **All files** in your project.
- **Package problems**: the Problems panel now lists packages that failed to load and why, and points out when a package is only a dev dependency.
- **Permissions for connected agents**: Claude Code, Claude Desktop, and Cursor can now add or remove platform permissions through Nowa's settings, the same way the Permissions panel does.
- **Claude Code setup command**: the **Connect External Agent** dialog now includes a ready-made Claude Code command to copy and run.

#### **Improved ⚙️**
- **Dart support**: Nowa now opens and renders much more hand-written Flutter code, including Dart 3 patterns in `switch` expressions and destructuring, InheritedWidgets, mixins, enhanced enums, redirecting constructors, `super.` parameters, widgets that extend other widgets (your own or Flutter's), and generic function references like `identity<int>`.
- **Theme extensions**: themes can now hold up to 8 theme extensions, up from 5.
- **Partial file loading**: code Nowa can't read yet is skipped on its own, so the rest of the file still loads, and the Problems panel shows what was skipped.
- **Placeholder values**: components that take records or typed lists now render in the designer with sensible placeholder values.
- **Null-aware chains**: `?.` in widget arguments now resolves to null in the designer instead of breaking the widget, and is saved exactly as written instead of being turned into `!`.
- **Project checks**: valid projects without a `main.dart` or `web/` folder, like packages or mobile-only apps, are no longer flagged as broken.
- **Problems on open**: the Problems panel waits for packages to finish loading before reporting, so it no longer shows false errors while a project opens.
- **Board performance**: smoother panning and zooming, plus faster code loading and lookups, especially in bigger projects.
- **Safer AI edits**: an edit that would leave a Dart file with syntax errors is now refused and nothing is written, so a typo can't turn into mangled code. Applies to Nowa AI and connected agents.
- **Imports after AI edits**: a file's imports now update automatically after an AI edit.
- **AI code checks**: when `flutter analyze` can't run, the AI is told so instead of treating the project as clean.
- **Connected agent guidance**: agents receive Nowa's building rules as soon as they connect, and can ask for them again at any time.
- **Agent screenshots**: now report widgets that failed to build, overflows, and placeholder values, so agents can find and fix layout issues themselves.
- **Agent safeguards**: edits based on an outdated widget reference are refused instead of landing on a neighboring widget, and switching projects is blocked while the current one has failed to save.

#### **Fixed 🩹**
- Fixed the **board not updating** when changing its color or grid.
- Fixed the **Libraries panel** missing from the sidebar after the top bar was rebuilt.
- Fixed one **canvas that fails to build** leaving every canvas after it stuck on its loading placeholder.
- Fixed **widgets that extend a widget from another file** sometimes loading as plain classes and not rendering.
- Fixed **constructors written by a connected agent** being dropped instead of applied.
- Fixed **packages in local projects** sometimes failing to load when several resolved at the same time.
- Fixed the **screenshot tool** for connected agents.

---

## **3.12.0 (15 September 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-12).

#### **Added 🌟**
- **Connect your own AI agent**: the Nowa desktop app can now be driven by **Claude Code, Claude Desktop, or Cursor**. Your agent can open and switch projects, see your screens, components, theme and current selection, build with Nowa's own tools, open a screen or highlight a widget on the canvas, take a screenshot, and save, all while your board keeps up. **Enterprise only for now**, so email `team@nowa.dev` if you'd like access.
- **Workspace and monorepo support**: import a Flutter app that lives inside a bigger repository, choose which package Nowa edits, and switch packages from a chip in the top bar. Git keeps covering the whole repository.
- **Sign in with Apple**: sign in to Nowa with your Apple ID on the web and on iOS.
- **Git over SSH**: local projects can push and pull over SSH, using a key you choose or the keys already loaded in your ssh-agent.
- **Component descriptions**: write a short description for any screen or component in the details panel, right next to its fields.
- **Preview links for a single screen**: playing a screen from the board now produces a share link that opens on that exact screen.
- **Go to definition**: hold **⌘ (or Ctrl)** in the code editor and click a name to jump to where it's defined.
- **Constructor picker**: choose which constructor to use for widgets that offer more than one.
- **Diff navigator**: move between changes in the diff view instead of scrolling to find them.
- **Cloning progress**: see how far along a project is while it clones from GitHub.
- **Custom app bars**: your own widgets can now be used as a screen's app bar.

#### **Improved ⚙️**
- **A tidier interface**: the top bar was rebuilt and the dashboard cleaned up.
- **Code mode**: switching to code now jumps to the code behind the widget you had selected, and the run and preview controls stay available while you're there.
- **Formatting**: Nowa now reads your project's own rules from `analysis_options.yaml`, so saved files keep the shape your project already uses and diffs only show what actually changed.
- **Project sync and loading**: faster and lighter when opening and syncing projects.
- **Login screen**: now works with your password manager's autofill.
- **Build quota**: running out of builds now shows a clear message explaining what happened.
- **Field initializers in the designer**: widgets that set up their fields on creation now render and edit correctly.

#### **Fixed 🩹**
- Fixed **`$` inside a text value** breaking the text it sat in, so prices like `$20` stay as typed.
- Fixed **variables inside loops** losing their value.
- Fixed **Firebase screens** not displaying correctly in the designer.
- Fixed **images stored inside packages** not rendering.
- Fixed **Git** leaving a project stuck in a merge conflict after a commit.
- Fixed the **outline and top bar** falling out of sync with the current selection.
- Fixed the **QR code placement** in the run toolbar.
- Fixed the **run target** pointing at the wrong place in projects with more than one package.
- Fixed errors in the **widget list**.
- Fixed the board **jumping to the wrong page** when opening a different project.
- Fixed an issue in the **new project dialog**.
- Fixed **build issues on macOS**.

---

## **Gemini 3.7 Flash Upgrade (13 August 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/gemini-3-7-flash).

#### **Added 🌟**

- **Nowa AI now runs on Gemini 3.7 Flash** — the agent moved to Google's new model the day it launched, replacing Gemini 3.6 Flash.
- **Double the daily limits on every plan** — 3.7 Flash costs **50% less** than the model it replaces, and we passed the full saving on. Effective immediately, at the same price, with nothing to claim or upgrade.

#### **Improved ⚙️**

- **UI generation** — 3.7 Flash is ranked **#1 on Code Arena** for building real, working interfaces, so screens come out right on the first try more often.
- **Design fidelity** — the agent follows a screenshot, image, or design system far more faithfully than before.
- **Long, multi-step tasks** — long-horizon engineering work improved from **49% to 65%** on the DeepSWE benchmark, meaning fewer dropped threads and fewer retries.
- **Code quality** — production code quality improved from **34.4% to 43.6%** on FrontierCode, so less debugging after a build.
- **Token efficiency** — the new model completes the same task using fewer tokens, so credits stretch further on top of the doubled limits.
- **Agent improvements** — a round of improvements to the agent itself, with a particular focus on UI generation.

---

## **3.10.5 (14 July 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-10-5).

#### **Added 🌟**
- **Full mobile browser support** — access Nowa from your smartphone to check projects, make quick updates, and deploy directly from your mobile browser.
- **Post-launch support package** — after successfully deploying an app, claim **$25 in Nowa AI credits**, direct support from the Nowa team, and help with exposure, monetization, feedback, and app improvements. The package is available from the deployment panel.

#### **Improved ⚙️**
- **Workspace experience** — improved team invitations and collaboration, workspace organization, and project management.

#### **Fixed 🩹**
- Fixed an issue that affected some **Windows users working with Git in Nowa**.

---

## **3.9 (13 June 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-9).

#### **Added 🌟**
- **Rebuilt multi-agent AI system** — several subagents now work on your project in parallel to plan, build, and refine at once, delivering better UI/UX, reliable complex logic across large projects, and smooth pub.dev package handling (including platform-file setup).
- **Smart context fetching** — the AI reads exactly what it needs without over- or under-reading, keeping it fast and cost-efficient.
- **App Run** — compile and run your real app directly inside Nowa, matching exactly what you'll get on deployment (pub.dev packages, custom code, and native parts included).
- **App preview on the board** — hover over any screen and hit play to instantly run your app right where you're working.
- **New Assets panel** — a dedicated panel for uploading and managing assets.
- **Dedicated code editor** — open the full code panel from the `<>` icon in the top right; every change now compiles automatically.
- **New deployment UI** — more detail and easier management for clearer, more controlled deployments.
- **New settings page** — a cleaner, more organized home for your project settings.
- **Refer a friend** — you and your friend each get 15 free credits when they sign up.

#### **Improved ⚙️**
- **Smarter Planning Mode** — presents a clear, readable plan anyone can follow and better matches what you want to build before work begins.
- **Outline moved to the left side** — out of the board and into the left-side options for a cleaner workspace.
- **Files merged into code editing** — the separate Files panel is gone; everything now lives alongside your code.
- **Smarter logs** — now cover both App Run and preview for full visibility.

#### **Fixed 🩹**
- Fixed **high AI costs** — the new system is dramatically more efficient, so you get far more done per credit.
- Fixed **AI struggling with complex tasks** — it now handles long, intricate jobs across your project reliably.
- Fixed **platform file editing** — editing platform files and native parts is now smooth and stable.
- Fixed **App Run issues** — running your app now reflects exactly what you'll get on deployment.

---

## **3.7.3 (26 April 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-7-3).

#### **Added 🌟**
- **Localisation support** — make your app run in multiple languages with ease. Just ask Nowa AI to set it up and it'll handle everything end to end.
- **AI font downloads** — ask Nowa AI to set any font and, if it's not already in your project, it'll download and set it up automatically. Useful when importing designs from Figma or other tools.

#### **Improved ⚙️**
- **Package conflict handling** — Nowa AI now automatically detects and resolves package conflicts, so you don't have to dig through dependency errors yourself.

#### **Fixed 🩹**
- Fixed an issue where the **widget menu wasn't working** on the web version.

---

## **3.7.2 (23 April 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-7-2).

#### **Added 🌟**
- **New Packaging System** — completely revamped integration with pub.dev packages for much greater stability and better handling by Nowa AI when working with external packages.
- **Experimental UI Updates** — AI has moved to a toolbar at the bottom of the board, accessible by hitting **/**, with project components visible in real-time. Enable it from **App Settings → Project details → Experimentals → "New UX"**.

#### **Improved ⚙️**
- **Faster project loading** — packages now load after the project opens, so you can start working sooner.
- **AI handling of external packages** — Nowa AI is now significantly better at working with pub.dev packages across your projects.

#### **Fixed 🩹**
- Fixed issues with **missing imports** — AI can now work with imports properly, resolving problems some users faced on certain projects.
- Fixed an issue with the **Rive widget on Web**.
- Fixed issues with **AI integrating APIs** — resolved problems some users ran into when asking the AI to connect to external APIs.


## **3.6.1 (12 March 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-6-1).

#### **Improved ⚙️**
- **Editable `main.dart`** — a new system now lets both you and the AI agent freely modify the `main.dart` file without running into issues.
- **AI stability on weak connections** — Nowa now handles weak and moderate internet connections much more gracefully, preventing unexpected disconnects mid-task.

#### **Fixed 🩹**
- Fixed an issue where some projects weren't loading correctly after the 3.6 update.

---

## **3.6 (6 March 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-6).

#### **Added 🌟**
- **RevenueCat Integration** — monetize your iOS and Android apps with in-app purchases using RevenueCat, set up in just a few clicks.
- **AI Planning Mode** — the AI now deeply analyzes your project, asks clarifying questions, and presents a detailed plan before implementing. Review and refine the plan, then get results built correctly from the first shot with fewer credits.
- **Todos in Agent Mode** — for complex prompts, the agent creates an internal plan with todos and completes them one by one, ensuring nothing is missed.
- **Google Sign-In with Supabase** — ask Nowa AI to implement Google Sign-In with Supabase directly.
- **Onboarding for New Projects** — new projects now include a guided onboarding experience to help you get started.

#### **Improved ⚙️**
- **AI search & project analysis** — the agent searches across your project much faster and consumes far fewer credits. It can also trigger source-code analysis to catch issues Nowa might miss.
- **Automatic AI issue reporting** — the AI can automatically report issues it encounters (without private data) and provide a report ID for follow-up.
- General performance and stability improvements across the editor.

#### **Fixed 🩹**
- Fixed an issue where the AI was adding incorrect package versions. Package versions are now managed by Nowa and default to the latest from pub.dev unless the AI has a specific reason not to.

---

## **3.5 (9 February 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-5).

#### **Added 🌟**  
- **Nowa Agent V3** — new AI foundation with 4 modes: Instant, Thinking, Deep Thinking, and Max.  
- **GoRouter by default** — all new projects use GoRouter routing with screen paths and deep linking support.  
- **Git for Local Projects** — Git is enabled by default for local projects (commit, history, push/pull).  

#### **Improved ⚙️**  
- **AI efficiency & quality** — new modes (except Max) use 5× fewer credits, run 4× faster, and produce 2–3× better results.  
- **Supabase workflows** — stronger results when working with Supabase MCP.  
- **UI boards performance** — smoother screen switching, panning, and zooming on large boards.  

---

## **3.4 (19 January 2026)**  

📰 See the highlights of this release in [What's new](/new/whats-new/3-4).

#### **Added 🌟**  
- **Supabase MCP** — connect Supabase and let the AI agent build the frontend + backend (tables, RLS, triggers, and Edge Functions).  
- **Agent Creation Summary** — a post‑chat summary box listing everything the agent created, with drag‑and‑drop to the board and file previews.  
- **New tutorials** — Google Maps integration and instant preview sharing videos.  

#### **Improved ⚙️**  
- Showing publishing errors so if App Store deployment failed at the publishing stage (last stage) you will know exactly why.  

#### **Fixed 🩹**  
- Fixed “[AppState] not found” errors after AI changes.  
- Improved generated code stability for more reliable outputs.  

---


## **3.3.5 (30 December 2025)**  

📰 See the highlights of this release in [What's new](/new/whats-new/3-3-5).

#### **Added 🌟**  
- **Commit History in Nowa** — view your full commit history directly in the Git panel, preview changed files line by line, and revert specific commits with a right‑click.  
- **One‑click GitHub integration** — connect projects to GitHub from `Project Settings → Git → Connect to GitHub` without creating tokens manually.  
- **Faster local project loading** — large local projects now load dependencies faster by using your local Flutter SDK instead of refetching everything from `pub.dev`.  


#### **Fixed 🩹**  
- Fixed an issue where some **imports disappeared** when loading projects.  
- Fixed cases of **double `int` conversion** when using AI, causing incorrect expressions.  
- Multiple fixes to **code generation and type mismatches** for more reliable AI output.  
- General stability and performance improvements across editor and preview.  

---

## **3.3.3 (15 December 2025)**  

#### **Fixed 🩹**  
- Fixed an issue where **some imports were not being saved correctly**, causing inconsistencies in code generation and preview.  

---

## **3.3.2 (10 December 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-3-2).

#### **Added 🌟**  
- **Google Maps Widget** — use Google Maps directly inside Nowa without writing custom code.  
  - Add it from the **Widget Picker**  
  - Fully customizable visually or via AI  
  - Preview real map results in the simulator  

#### **Improved ⚙️**  
- Added loading indicators to show progress when opening projects.  
- Improved UI rendering and consistency across screens and previewer.  
- Enhanced performance for a smoother experience when switching between views.  

#### **Fixed 🩹**  
- Fixed **false error logs** caused by `print` statements in code.  
- Fixed **previewer issues** where some screens failed to render.  
- Fixed **files disappearing** after reopening a project.  
- Fixed **feedback form** hanging during submission.  
- Minor UI polish and general stability improvements.  

---

## **3.2.0 (14 November 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-2).

#### **Added 🌟**  
- **AI That Uses Custom Packages** — the AI can now fetch and use packages directly from **pub.dev**, reading documentation and applying them automatically.  
  - Enabled by default for new projects.  
  - Can be manually activated in `Settings → Packages → Load Packages (Experimental)`.  
- **Cloud Git Integration** — all cloud projects now come with Git pre-configured, with a badge showing pending changes and in-app commit support.  

#### **Improved ⚙️**  
- Major upgrades to the AI’s reasoning and design capabilities.  
  - Defined the entire **Material library** and key Flutter components, eliminating “Not defined” issues.  
  - Smarter architecture creation, logic connection, and theme handling.  
  - Output quality improved up to 3× compared to previous versions.  

#### **Fixed 🩹**  
- Fixed AI error: `litellm.BadRequestError ... Unterminated string...`.  
- Fixed **missing imports** appearing in code view.  
- Fixed **file deletion** issue after reopening a project.  
- Fixed **feedback panel** getting stuck when sending reports.  
- Minor code sync and stability improvements.  

---

## **3.1.2 (25 October 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-1-2).

#### **Improved ⚙️**  
- Enhanced **AI agent stability** and reliability during long prompt sessions.  
- Improved **streaming performance** to reduce delays and errors.  
- Better **bug reporting flow**, capturing more context for faster fixes.  
- Improved **public preview handling** for smoother link sharing.  

#### **Fixed 🩹**  
- Fixed **invalid argument errors** caused by malformed AI JSON responses.  
- Fixed issue with `write_top_level_code` tool execution.  
- Fixed **context overflow** errors (`ContextWindowExceededError`) when sending large prompts.  
- Fixed **public share links** not opening properly when users were logged out.  
- Fixed **shared project endpoints** not loading correctly in public mode.  
- General performance and stability optimizations.  

--

## **3.1.0 (21 October 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-1).

#### **Added 🌟**  
- **New AI System** — rebuilt for speed and quality  
  - Live result streaming  
  - Self‑fixing agent that validates and corrects its output  
  - Clarifying questions when unsure  
  - Agent can run your app to detect runtime issues  
  - Project‑scoped chat history to continue conversations with full context  
- **Cloud + Local Sync** — keep a project in both places with one‑click sync (no Git needed)  
- **Instant Preview Sharing** — generate private or public links to your live preview directly from Play Mode  

#### **Improved ⚙️**  
- Moved from per‑prompt to a **credit‑based system** for fairer, more flexible AI usage (consumption scales with prompt size; small tasks ~0.1 credit, full screens ~1 credit)  
- Major performance and stability improvements across the builder and AI execution  

#### **Fixed 🩹**  
- Various reliability fixes to improve the instant preview, code generation, and runtime flows when building with AI  

---

## **3.0.10 (7 October 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-0-10).

#### **Added 🌟**  
- **Firebase Cloud Messaging** support — enable notifications from your project settings and send them from Firebase, Nowa, or any API (like Supabase Cloud Functions).  
- **Supabase Storage** integration — upload, store, and retrieve files directly from Supabase.  
- **New Code Sync System** — edits in code now sync instantly with the UI without refreshing or repositioning the board.  

#### **Fixed 🩹**  
- Nullability issues that caused build errors in certain cases.  
- Crashes when using lists of widgets as variables in screens or components.  
- AI expressions not working properly when used as return values.  
- Cases where AI-generated UIs couldn’t be selected or modified.  
- AI errors when performing actions on specific widgets.  
- “Not defined” AI generation issues with elements like `RadioListTile`, `SliverPadding`, `DropdownButtonHideUnderline`, and `SliverGrid`.  
- Preview issues with the Image widget caused by mock images on the board.  
- Editing issues with index expressions such as `List[0]` in the details panel.  
- Errors caused by `WidgetStateProperty` breaking the Switch widget.  

#### **Improved ⚙️**  
- Overall AI stability and error handling for rendering issues — only the affected widget now shows an error instead of the whole screen.  
- Added **TextInputAction** support for TextFields for better keyboard control.  
- Added **Phone UI preview** (view-only mode) for better usability on mobile.  
- Improved reliability of loading code that includes list variable formats.  

---

## **3.0.9 (19 September 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-0-9).

#### **Fixed 🩹**  
- Scale plan now shows the **actual credit number** instead of displaying 99+.  
- Fixed issue where **adding headers stopped working** after changing the API type.  
- Fixed issue with **attachments taking long to appear in the chat**.  

---

## **3.0.8 (17 September 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-0-8).

#### **Fixed 🩹**  
- Old templates updated and replaced with new ones matching Nowa 3.0 standards.  
- Older way of changing themes removed to simplify theming workflow.  
- Error build design now clearly shows it’s clickable to access build logs.  
- Added option to include **cloud build logs** when submitting bug reports.  

---

## **3.0.6 (8 September 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-0-6).

#### **Fixed 🩹**  
- Screens glitching or showing errors on the board when using `uid` from Supabase.  
- Horizontal scroll shortcut (Shift + scroll) not working on the Web version.  
- Text themes not reverting back to their default values.  
- Inconsistencies with `DropdownButtonFormField`.  
- Play mode not supporting custom route paths from user’s `MaterialApp`.  
- `Home` property not being recognized despite setting a valid home screen.  
- Global states generated by AI not functioning.  
- Global state not updating correctly inside the previewer.  
- Chat template preview not working.  
- Chat and Auth templates not loading.  
- Dropdown menu preview broken on the board.  
- New files not being added to their default folder.  
- Assignment operators not supported.  
- Pages with required arguments breaking routing.  
- AI generating private widgets that were not editable.  

---

## **3.0.4 (29 August 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-0-4).

#### **Fixed 🩹**  
- Issue with server error `500` when using the AI agent (`https://tools.ietf.org/html/rfc9110#section-15.6.1`).  
- Issue with Android builds failing.  
- Issue with incorrect Apple Bundle ID formatting.  
- Issue with `application/x-www-form-urlencoded` body format.  
- Issue with screens crashing when fetching data using future-based values.  
- Issue with `SliverToBoxAdapter` not being defined.  
- Issue with changing colors of SVG icons.  
- Issue with Supabase project connections.  
- Issue with missing `nowa_runtime` when creating new data models.  
- Issue with old error messages still appearing in Play mode.  
- Issue with deployment through CodeMagic.  
- Issue with OAuth login for Supabase.  
- Issue with global state not including required imports.  
- Issue with popup menu button not working when generated by AI.  
- Issue with backspace not functioning in the code editor search.  
- Various stability fixes and usability improvements across the builder.  


---

## **3.0.2 (12 August 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-0-2).

#### **Fixed 🩹**  
- Issue with building apps due to a package version conflict.  
- Issue with iOS deployment preventing some apps from being published.  
- Issue with project loading caused by conflicts in widget names.  
- Issue with AI tool results where `tool_use ids were found without tool_result`.  

---

## **3.0.1 (11 August 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-0-1).

#### **Fixed 🩹**  
- Fixed **Desktop App access** not available for some plans.  
- Fixed **Board naming** issue where new boards were created with `board*.board` instead of the assigned name.  
- Fixed **AI on macOS** not running on certain versions due to `FileSystemException: '/ai_debug_logs'` error.  

---

## **3.0.0 BETA (4 August 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-0-beta).

#### **Added ✨**  
- **AI Agent (Beta)**  
  - Generate full screens, widgets, or features from a single prompt  
  - Edit or fix logic and UI across your app — even without selecting anything  
  - Understands app context and builds multi-screen flows intelligently  

- **Supabase Integration**  
  - Native support for Supabase Auth  
  - Build queries using AI  
  - Support for row-level security  

- **New Theme System**  
  - Manage design tokens visually  
  - Preview theme changes instantly from the left sidebar  

- **Component Explorer**  
  - View all components inside each screen  
  - Highlights selected elements in the outline and canvas  

- **New Plans & AI Credits System**  
  - New Free, Launch, and Scale plans  
  - Up to 200 AI messages/month and AI credit top-ups  
  - Free plan now includes code export, desktop version, and local projects  

#### **Fixed 🩹**  
- Many improvements for performance and stability across the builder  


---

## **2.0.21 (27 May 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-21).

#### **Added ✨**  
- **API Import from Postman, Swagger, and Xano**:  
  - Instantly import multiple requests at once  
  - Automatically sets up endpoints, request types, headers, and body  
- **cURL Request Support**:  
  - Paste a cURL command to auto-generate a full API request  
  - Great for copying from docs or terminal and getting started fast

#### **Fixed 🩹**  
- Fixed issue with having the **same declaration name in different files**  
- Fixed bug where **TextFields inside WebViews** didn’t respond to some keys  
- Fixed issue where **non-string values** couldn’t be sent in request bodies  
- Improved **selection behavior** across the editor

---

## **2.0.20 (23 April 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-20).

#### **Added ✨**  
- **New API Editor**:
  - Unified panel to view all API requests with type indicators  
  - Simplified flow for creating, testing, and generating models/mock data  
  - Support for **form data** and **file uploads**  
  - Ability to set **content-type** per request  
- **Horizontal and Vertical Padding Fields** for cleaner layout control  
- **Element Selection in Play Mode** for easier debugging  
- **Updated Chat Template**:
  - Added Profile component  
  - Added App Bar with user info  
  - Prevents sending empty messages  
  - Improved naming and structure  
- **Circuit Improvements**:
  - Function return type shown on hover  
  - Main nodes now included in search results  
- **Play Mode Warning for Custom Code** when custom functions or widgets are present  

#### **Fixed 🩹**  
- Resolved iOS deployment issues  
- Icon Button now wraps icon content correctly  
- Fixed various Circuit-related bugs  

---

## **2.0.19 (6 April 2025)**  

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-19).

#### **Added ✨**  
- **Nowa Marketplace**: Browse and add editable sample projects from the dashboard, starting with:
  - Water Tracker App ([Used in this tutorial](https://www.youtube.com/playlist?list=PLVhnHv8Cdhz87lklVjSao4Y0EHdlq2j5a))
  - AI Chat App assistant using ChatGPT
- **Revamped Git Integration**:
  - Clone from any Git provider (e.g. GitHub)
  - Push cloud projects to Git
  - Sync between local, cloud, and remote
  - Perform Git operations like commit, discard, and branch
  - [Full guide](https://docs.nowa.dev/git)
- **New Button Widget**:
  - Style buttons using `ButtonStyle` (background, text, radius, elevation, etc.)
  - Use `ButtonTheme` for consistent styling
- **Improved Error Handling**:
  - Layout warnings before errors occur
  - Prevention of crash-causing actions
  - Displays exact file of the issue

#### **Fixed 🩹**  
- Fixed some cloud projects not opening  
- Fixed feedback dialog popping up repeatedly  
- Fixed undo not working after function deletion  
- Fixed Navigator and data type bugs in Circuit  
- Fixed TextFields in global state not responding

## **2.0.18-beta (12 March 2025)**  

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-18).

#### **Added ✨**  
- **AI Chat Template**: Quickly build chat-based apps using the built-in, fully functional chat template, complete with chat bubbles and logic. [Read more](../legacy/tutorials/chat-template.mdx)
- **Quick Navigation to Functions & APIs**: New "open" icon next to functions and API requests to instantly jump directly to their definitions.

#### **Fixed 🩹**  
- Fixed details panel not showing edit button for some custom expressions.  
- Fixed web deployment issue causing older projects to deploy an empty app.  
- Fixed gray box covering file system when deleting some files.  
- Fixed file panel not updating after adding or removing a file.  
- Fixed OnValue not opening for API requests in Circuit.


## **2.0.17-beta (5 March 2025)**  

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-17).

#### **Added ✨**  
- **Web Deployment**: Deploy your web apps online directly from Nowa in development or production mode, with an option to download build files for external hosting. [Read more](../publish/web.md)
- **Added a Badge Wrapper**
- **Added a Pin Code Field Widget**: New input field for PIN codes and OTP entry.  
- **Dashboard Enhancements**
- **Audio Source Enhancements**: Now supports playing audio from bytes.  
- **Request Templates Directly from the Panel**: Easily request new app templates within Nowa.  

#### **Fixed 🩹**  
- Fixed widget picker drag and drop issue when widgets had dependencies.  
- Fixed set state functions not executing properly.  
- Fixed sync issue when building local projects.  
- Fixed Flutter SDK setting issue in the desktop version that appeared in the latest release.  


## **2.0.15-beta (12 Feb 2025)**  

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-15).

#### **Added ✨**  
- **Swipeable Stack Widget**  
  - Implement a **Tinder-style swiping card effect**.  
  - Connect it to a **list variable** just like ListView for seamless integration.  

- **Time Picker**  
  - Allow users to **select specific times** in your app.  
  - Capture the selected time using `ShowTimePicker` and format it with `.format()`.  

#### **Fixed 🩹**  
- Fixed an issue where **text fields in the details panel** didn’t accept input.  
- **MacOS version now starts in full screen** by default.  
- Adjusted **iPhone 12 device frame size** for correct display.  
- Other minor **bug fixes and performance improvements**.  

---

## **2.0.14 (29 Jan 2025)**  

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-14).

#### **Added ✨**  
- **New Dashboard Design**  
  - Redesigned for a **smoother and more intuitive experience**.  
  - Easily navigate between **projects and workspaces**.  
  - Added a **new Learning Resources section** featuring guides, tutorials, and tips to help you build faster.  

- **Intl Package for Date/Time Formatting**  
  - Nowa now supports the **Intl package in Flutter** for improved localization.  
  - **Format dates, times, and numbers** based on locale preferences.  
  - Easily adapt to **region-specific date formats, timezones, currency, and pluralization rules**.  

#### **Fixed 🩹**  
- Fixed a **deployment issue for apps** caused by an outdated package.  

---

## **2.0.13-beta (4 Feb 2025)**  

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-13).

#### **Added ✨**  
- **Git Integration for Cloud Projects (Web & Windows)**  
  - Link your Nowa **cloud projects** to GitHub (or any Git service).  
  - Push, pull, commit changes, and switch branches.  
  - Connect **local projects to cloud ones** to enjoy both **local hot-reload** and **cloud one-click deployment**.  

- **Media Picker**  
  - Implement a **media picker** in your app.  
  - Upload media via API with **encoding support**.  

- **Account Management**  
  - Change your **name, profile picture, email, and password**.  
  - Option to **delete your account** if needed.  

- **Package Management System**  
  - View all packages in your project.  
  - **Add, remove, and update** package versions instantly.  

#### **Fixed 🩹**  
- Fixed an issue causing **App Preview to break when using multiple global states**.  
- Fixed **Expansion Tile** issues affecting UI behavior.  
- Other minor **stability improvements** and **bug fixes**.  

---

## **2.0.11-beta (7 Jan 2025)**

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-11).

#### **Added ✨**  
- **Expansion Tile Widget:**  
  Easily reveal or hide additional content by adding collapsible sections to your app. Ideal for creating organized and dynamic layouts. [Learn more](../reference/widgets/index.md#expansion-tile) 

- **Getters in the Hybrid Approach:**  
  Custom Getters allow you to write reusable logic in code and use it visually throughout your project.  

- **TextField Theming:**  
  Simplify TextField styling by defining it once in your app theme. Each new TextField inherits the defined style automatically, streamlining UI consistency.  

#### **Fixed 🩹**  
- Fixed an issue where widgets were being wrongly displaced on the board.  
- Fixed the link menu not closing after an expression was chosen.  
- Fixed the details panel closing unexpectedly during parameter selection in circuits.  
- Resolved incorrect placement of positional arguments in certain configurations.

---

## **2.0.10-beta (16 Dec 2024)**

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-10).

#### **Added ✨**  

- **Play Mode on the Board:**  
  Run your app directly from the board without entering file preview. Select a screen and click Play. If no screen is selected, the app starts from the Home screen.  

- **Variables Panel on the Board:**  
  Create variables, parameters, and functions right from the board, eliminating the need to navigate into file preview.  

- **Local Variables in Functions:**  
  Add scoped local variables inside functions. Right-click within Circuit and select “Create Local Variable” to create variables limited to that function.  

- **Store Expression Results in Existing Variables:**  
  When using “Custom Expression” in Circuit, store the result in an existing variable. Simply choose “Pick Variable” next to “Store Results.”  

- **Compute Option:**  
  Reintroducing the “Compute” feature from Version 1, enabling you to create a function to compute field values directly.  

- **Flutter 3.27 Upgrade:**  
  Apps now run on the latest Flutter version, improving performance and stability.  

#### **Fixed 🩹**  

- Fixed deployment failures on Android caused by file conflicts.  
- Resolved “Screen or Component Not Found” errors caused by improper loading.  
- Fixed navigation issues with the Space key.  
- Arrow key shortcuts now function properly.  
- Fixed Shift key issues during multi-selection.  
- Widgets no longer disappear when placed on the board.  
- Fixed drag-and-drop functionality from outside the board.  

---


## **2.0.8-beta (28 Nov 2024)**

📰 See the highlights of this release in [What's new](/new/whats-new/2-0-8-beta).

#### **Added ✨**

- **New Workflow:** Simplified navigation and improved productivity with features like:
  - UI boards to organize all your UIs visually.
  - Focused file tabs for editing individual files.
  - Declaration chips for easy navigation between multiple widgets in a single file.
  - Isolated screen testing from the file preview.
  - A code preview panel with a declaration map for better code organization.

- **New File System:** Manage your project more effectively with:
  - Navigation based on Dart files for structured workflows.
  - A file previewer that displays all Dart files in the project.
  - Dedicated sections for boards, Dart files, and assets for clear organization.

- **Custom Code Support:** Write custom Flutter code anywhere in your project, including functions, widgets, and classes. Modify generated code with instant syncing in Nowa. [Using Custom code Youtube Tutorial](https://www.youtube.com/watch?v=hlOoXTdw1vg&t=1087s)
- **Themes Management:** Add and manage multiple themes with customizable colors and typography. Dynamically switch themes during runtime. [Read more](../design/themes.md)
- **Revamped Logic-Building Circuit:** Create advanced flows with:
  - "Await" for asynchronous functions.
  - "Try-Catch" for handling errors in functions that may throw exceptions.
- **Advanced Expressions:** Build complex Dart expressions visually or directly in the UI Designer and Circuit, including conditional, mathematical, null-aware, and boolean expressions.
- **Integrated Flutter Development:** Sync changes seamlessly between Nowa and your local Flutter development environment.
- **Enhanced Widgets:** Enjoy improved widget customization and functionality for a smoother design experience.

#### **Improved 💪**

- **Generated Code Quality:** Significant enhancements for cleaner, faster, and more maintainable Flutter code.
- **Performance:** Optimized performance for smoother navigation and faster response times.

#### **Fixed 🩹**

- Various bug fixes reported during private testing.
- Usability improvments.
