# P14-B01 notes: Get started and Build a great app

Batch P14-B01. Pages under `docs/`. Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`).
Coverage audit: `P14-B01-coverage.md`. Moved developer facts: `P14-B01-for-code.md`.
Every page was also rewritten for tone (R9): why and what happens next, transitions, everyday examples,
reassurance where true. Only the changes that alter or add a claim are listed with evidence below.

## get-started/welcome.md

For the reader:
- Intro now leads with the promise in plain words: an app for iOS, Android and the web, no code. Flutter is explained
  in one clause the first time ("Google's toolkit for apps that run on phones, the web and computers"), and the reader
  is told they never have to open the code.
- "Who Nowa is for" puts people with an idea first and says the code section can be skipped. Workspaces are split off
  as a team feature (not a code feature).
- "Where Nowa runs": the desktop app is described as optional ("You don't need it to build and publish your app").
- Steps of the loop explain REST API and emulator in a clause each (R4); logic step names Circuit (R8).
- "Desktop" row of the platform table rewritten without "desktop targets".
- Key terms: added **Circuit**; everyday examples on Screen, Component, Board.

Added / changed claims and evidence:
- "What you see on the board is your real app, not a mockup" (old intro, "real Flutter UI, not mockups"): the board
  edits the project's own Dart files through the BlockTree (`packages/core/lib/src/interpreter/block_tree.dart`), and
  the same project runs with **Run** and builds with **Deploy** (`lib/project/top_bar.dart:377`).
- Download the code and hand it to a developer: `docs/publish/download-code.md` (verified page; the plan allowance
  for downloads is explained there).
- Circuit as the visual logic editor, steps as blocks: `docs/logic/circuit.md` ("You stack nodes, one per step"),
  **Open in Circuit** `packages/core/lib/src/fields/field_link_menu.dart:389`.
- "You can start on the free plan": `packages/core/lib/src/billing/billing_models.dart:45` (`isFreePlan`); the top
  bar offers **Upgrade** on it (`lib/project/top_bar_mapper.dart:162`). No limits stated (D3).
- "You don't need [the desktop app] to build and publish your app": **Deploy** is in the web app's top bar for cloud
  projects (`lib/project/top_bar.dart:377`, `lib/project/run/deploy_button.dart:21` hides it only for local projects).
- Desktop row, "your computer itself shows up in the **Run on** menu": device list comes from the local Flutter device
  list without a platform filter (`lib/local_export.dart:11-180`, `SelectDeviceMenu`); `docs/test/devices.md`
  screenshot shows **macOS** under **DEVICES** (`lib/project/run/run_button.dart:540-560`).
- "Your app goes live on the web and in the stores only when you publish it": web goes live only from **Deploy**/
  **Publish** (`docs/publish/web.md`), store builds only from the Deployment page (`docs/publish/index.md`).

Open questions: none.

## get-started/first-app.md

For the reader:
- Intro says plainly that no code is written along the way.
- Explained in a clause: demo data (sample content), backend (online service that stores data and handles sign-in),
  API keys (the passwords your app uses to reach other services), the Outline (lists every widget on the board).
- Added the why/what-next to steps (R9): what the **Questions** card is for, why **Run** is the most accurate test,
  that undo is always there, what a share link is good for.
- Facts, labels, steps, warning and images unchanged.

Added / changed claims and evidence:
- "Nowa creates the project for you, names it, and opens the editor": loading texts "Naming your app…" and
  "Creating your project…" (already on the page, verified in earlier phases).
- "Deep Thinking ... reasons more before it builds": thinking levels set how much the agent reasons
  (`docs/ai/modes.md`, `packages/ai/lib/src/agent/agent.dart:22-27`).
- "Run ... the same app your users will get": **Run** compiles and runs the real app (glossary; `docs/test/run.md`).

Open questions: none.

## index.md (docs home)

For the reader:
- Hero lead and description now say "no code needed" and name the platforms; card texts reworded in plain words
  (no "functions", "checkpoint" or "agent context" jargon on the home page).
- "Work with code" card marked "Optional, for people who code", so a non-coder knows they can skip it.
- First card says the walkthrough takes about 15 minutes (as `first-app.md` says).

Added / changed claims and evidence: none beyond wording (platforms: `get-started/welcome.md#what-you-can-build`;
undo a request: `docs/ai/undo-and-history.md`).

Open questions: none.

## get-started/create-account.md

For the reader: tone only (R9): why the code is asked for, what to do when no code arrives, reassurance on
**Invalid link**, a word on what logging out does. All labels, steps and the image unchanged.

Added / changed claims and evidence:
- Apple line: "available in the web app, including in your phone's browser, but not in the desktop app" replaces
  "in the web app and on iOS". `kAppleSignInSupported => NPlatform.isIOS || NPlatform.isWeb`
  (`lib/auth/auth_widgets.dart:500`): a phone browser is the web app; native iOS is Nowa GO, not documented (D15).
  Pointer to email/Google for desktop users: `docs/get-started/desktop-app.md#sign-in-and-stay-up-to-date`.
- "Check your spam folder" before **Resend the code**: general advice, no product claim.
- "Most [questions] take a single click": `create-account.md#answer-the-four-questions` (click an answer and Nowa moves
  on; **Other** and **Yes** ask for a few words).

Open questions: none.

## get-started/playground.md

For the reader:
- Starting-point table: kept the menu's own descriptions (UI text, R3) in quotes and explained "routing" (navigation
  between screens) and "the assistant" (Nowa AI) in plain words.
- "The full code check" explained (looks for errors across your whole app); "write code" softened to "even edit
  code" so it reads as optional.
- Tone (R9): why browser storage isn't enough, reassurance that guest edits never touch the owner's project.

Added / changed claims and evidence:
- Descriptions quoted: `packages/core/lib/src/playground/playground_starter.dart:9-11`, shown in the chip menu
  (`lib/sandbox/sandbox_picker.dart:32`).
- "The playground opens on this one" (Starter app): `playground_starter.dart:21-22` (falls back to `starter`), and
  step 2 of the page.

Open questions: none.

## get-started/editor-tour.md

For the reader:
- New section **Circuit, where logic lives** (old `exploreinterface.mdx` listed Circuit as a main area; the tour had
  no mention of it). Explains what it's for, how it opens from an event, and that Nowa AI's logic can be checked there.
- **Variables** panel: each tab now has a plain-words meaning and an everyday example (R8): Params (values it
  receives), Variables (values it remembers, such as the number of items in a cart), Functions (named sets of steps),
  Globals (values and functions every screen can use).
- Plain words for jargon in the tables: package chip ("separate parts of the code, usually in an imported project;
  most projects never show it"), Search ("find text ... and replace it everywhere"; **Symbols** finds names), Git
  ("version history ... for people who use it"), Outline ("every widget ... nested the way they sit inside each
  other"), Api ("connections to online services (REST APIs)"), Router ("the paths that open your screens"), Supabase
  ("sign-in, database and storage"), safe mode (what it's for).
- `<>` and code mode are marked optional ("You don't need it to build your app").
- Git branch in the status bar now reads "if the project uses Git".

Added / changed claims and evidence:
- Circuit opens as a floating panel, from the button next to an event in **Details** (**+** or **Edit**), or from a
  function in **Variables**: `docs/logic/circuit.md#open-circuit`, `docs/logic/events.md` steps 2-3;
  `packages/core/lib/src/fields/nowa_fields.dart:797-830` (`FunctionField`: **+**, or **Edit** with a bolt);
  **Open in Circuit** `packages/core/lib/src/fields/field_link_menu.dart:389`.
- "Logic that Nowa AI builds in Agent mode lands in the same events and functions": the agent edits the project's files
  (`packages/ai/lib/src/tools/read_file_content_tool.dart:49-55` reads them; agent tools in `docs/ai/index.md`), and
  Circuit shows the functions of those files (`docs/logic/circuit.md`).
- Search **Text** / **Symbols** chips: `lib/project/panels/search_panel.dart:10-12`.
- Supabase panel sections Authentication, Queries, Storage: `docs/integrations/supabase/connect.md` (panel table).
- Library assets = "the folders and files in your `assets/` folder": `docs/design/library.md` (sources table).
- Router: lists routes and chooses the first screen: `docs/logic/router.md` intro.
- Safe mode from the dashboard ⋮ menu for a project that freezes: `docs/guides/ship-tips.md#keep-big-boards-fast`.

Length: about 1,990 words of visible text (2,219 with markup). If it grows further, split it into "Tour the editor"
(layout at a glance, board, Details/Variables, Circuit, help) and an "Editor controls" reference page (the Top bar
and Sidebar tables, status bar, resizing panels).

Open questions: none.

## get-started/cloud-and-local.md

For the reader:
- Intro: "a folder of app files on your computer" instead of "a normal Flutter folder"; new line "If you don't write
  code, a cloud project is all you need".
- Table labels explain Git ("version history") and VS Code ("a code editor") in a word (R4).
- New section **Tell which kind you have** (old `whylocalproject.md` note "You can see which project you are
  viewing", with an outdated image): dashboard badges plus what differs in the editor. The existing dashboard-badge
  paragraph moved into it.
- Old docs promised offline work for local projects; that's not true in 3.13, so the page now says Nowa needs an
  internet connection, also in the desktop app.
- Run rows now say what saving does (old `whylocalproject.md` "Hot Reload" item).

Added / changed claims and evidence:
- "It's what Nowa creates unless you ask for a local one": new projects and prompt-box projects are cloud projects
  (`docs/account/projects.md`, "A new project is a cloud project"); local needs **Advanced** → **Local-only project**.
- Editor cues: no **Deploy** button for local projects (`lib/project/run/deploy_button.dart:21`); run controls read
  **Hot Reload** / **Open in Browser** for local and **Hot Restart** / **Open on Mobile** for cloud
  (`lib/project/top_bar_mapper.dart:187-188`). Dashboard: **Cloud**/**Local** badge
  (`packages/nowa_ui/lib/dashboard/projects_grid.dart:253`), **LOCAL-ONLY** (`packages/nowa_ui/lib/dashboard/projects_view.dart:504`).
- Saving restarts a running cloud app and hot reloads a local one: `packages/nowa_run/lib/src/nowa_run_plugin.dart:46`
  (`onSave` → `applySavedCode`), `packages/nowa_run/lib/src/nowa_run_manager.dart:84` (`restartSession`); the local
  daemon restart uses `fullRestart: false`, a hot reload (`packages/nowa_run/lib/src/services/local/daemon_protocol.dart:119-120`);
  `docs/test/run.md:43`, `docs/code/vs-code.md:70`.
- Internet needed: every signed-in route runs `_authorize` (`lib/router.dart:176`, `:248`, `:280`, `:307`, `:317`),
  which checks the version (`packages/core/lib/src/services/version_service.dart:98-103`) and your account
  (`packages/core/lib/src/services/user_service.dart:81-83`) with Nowa's server (`lib/router.dart:45-110`). Offline,
  the version check throws and the redirect sends you to sign-in (`lib/router.dart:108-111`), or to **No Internet
  Connection** (`lib/router.dart:86-91`, `:346-355`). The page doesn't name the screen, because which one appears
  depends on which check fails first.
- "Sync in the direction of the copy you changed": both sync buttons overwrite the other side (already on the page;
  `packages/core/lib/src/settings/project_sync_settings.dart:360`).

Open questions: none.

## get-started/desktop-app.md

For the reader:
- New section **Do you need the desktop app?** right after the intro (batch note): what the web app already does,
  the three reasons to install it (devices and emulators, local projects, importing), and that Nowa installs
  Flutter for you. "Emulator" explained in a clause.
- **Set up Flutter** (`{#setting-up-flutter-sdk}`, kept) now opens with what Flutter and the SDK are, in plain words,
  and who can skip the section (cloud projects run in the editor).
- Xcode (`{#macos-install-xcode}`, kept) explained as Apple's free app for building Mac and iPhone apps.
- `flutter doctor` (UI text in the Verify step, R3) explained as Flutter's own health check; Android toolchain
  explained (the tools that build Android apps); "terminal" mentioned for `ldd --version`.
- All anchors kept: `{#install-on-linux}`, `{#setting-up-flutter-sdk}`, `{#macos-install-xcode}`, and the headings
  "Let Nowa install Flutter" and "Use a Flutter SDK you already have" (linked as auto anchors).
- Linux requirements kept as they are (needed to install; OS facts, not code).

Added from the old docs (`local-project-simulator/createlocalproject.md`), re-derived from code:
- The macOS error when Xcode is missing: the Flutter step fails with "Flutter failed to initialize: <Flutter's own
  message>" (`packages/core/lib/src/environment/flutter_installer.dart:112-114`, sent to the dialog at `:41`); the
  dialog shows it in red under the row (`packages/core/lib/src/environment/environment_setup_dialog.dart:880-883`,
  `:187`) and the button becomes **Try again** (`:917`). On a Mac without developer tools, Flutter's message comes from
  `xcode-select` (the old docs quoted "xcode-select: No developer tools were found"), so the page says "mentions
  `xcode-select` or developer tools" rather than quoting Apple's full text.
- "It's a large download": old docs; matches the in-app helper (`environment_setup_dialog.dart:463-470`).
- Status labels: **Ready**, **Managed by Nowa** for tools Nowa installed, **Found on PATH** for a Flutter found on
  the computer (`packages/core/lib/src/environment/environment_doctor.dart:21-31`, `:68`; status text joined with " · "
  at `environment_setup_dialog.dart:950-958`).
- "If an install fails, the error shows in red under its row, and the button changes to **Try again**":
  `environment_setup_dialog.dart:880-883`, `:917`.
- Internet needed to sign in and open projects, local ones included (corrects the old "Offline mode"):
  `lib/router.dart:45-111` (see the cloud-and-local notes for the full trace).

Other changed claims and evidence:
- Web app can Run and open on your phone, share and publish: `lib/project/top_bar.dart:377` (Run and Deploy in the
  web top bar), `lib/project/top_bar_mapper.dart:188` (**Open on Mobile**), `docs/test/share.md`.
- Devices and emulators need the desktop app: web **Run on** menu says "Get the Nowa desktop app for macOS or Windows
  to run this app on real devices and emulators." (`lib/project/run/run_button.dart:636-655`).
- "Changes showing up every time you save" on a device: `docs/test/devices.md` (intro and step 5).
- Flutter needed for local projects and device runs, not for importing to the cloud: `docs/code/local-projects.md:15`,
  `docs/test/devices.md:17`, `docs/code/import.md:13`.

Open questions: none.

## get-started/mobile.md

For the reader: tone only (R9): when the phone layout is handy, why you attach a screen to a message, what the
Supabase chip does (connector explained in a clause), that the **Build** tabs let you start or check a build from your
phone. Labels, table, image and steps unchanged.

Added / changed claims and evidence:
- Supabase connector "lets Nowa AI work on your Supabase backend": glossary (Connector), `docs/ai/connectors.md`.
- **Build** tabs are the **Deployment** pages, so you can start or check a build: already on the page (verified in
  phase 10); the Deployment pages have the **Build** buttons (`docs/publish/android.md`, `docs/publish/ios.md`).

Open questions: none.

## guides/index.md

For the reader:
- Intro says plainly that no code is needed: every tip uses Nowa AI and the visual tools (batch note).
- Explained in a clause: global state ("what several screens share"), Git (version history), Row Level Security
  (rules that decide who can read and change each row), Bundle Identifier (your app's unique ID in the stores).
- "Server secret ... request headers" reworded as "secret key, such as a Stripe secret key or a database password ...
  in a REST API's request settings" (the facts behind it: `guides/data-and-state-tips.md#keep-secrets-out-of-your-app`).
- "Loading state and error state" reworded as "show something while they load and when loading fails".

Added / changed claims and evidence: none beyond wording.

Open questions: none.

## guides/complete-app.md

For the reader (batch note: prompt first, visual, non-coder friendly):
- Intro says how the guide works: ask Nowa AI for each piece, check it, fine-tune it visually; never write code;
  each step also shows the visual way.
- Steps 4, 5 and 6 now lead with an **Agent** mode prompt and a concrete check (**Play**, a wrong password,
  **Problems**), then "**Or do it yourself:**" with the existing visual steps (Circuit, Data Builder, Router). R5: no
  promise of the exact result, always a way to check.
- Step 2 offers a prompt for the component as an alternative.
- Every technical word the visual steps can't avoid is explained in a clause the first time: Supabase, params,
  uuid, Row Level Security, route, `SupabaseService` (UI text in the Circuit node search, R3), controller (holds what
  the user typed), Future / **Future Options** / **onValue** / **onError**, `go` vs `push`, model, Data Builder,
  **Builder** list type, `data`, `element`, **String**, the `:id` path placeholder, `$` in **Location**, Gesture
  Detector, Bundle Identifier, `.apk`, signing key, `.aab`.
- Step 1 keeps the facts of the old tip (removed as an admonition): **Make it real** hands the whole design to Agent
  mode; **Plan** mode writes a plan and changes nothing until **Implement this plan**.
- Moved to the for-code file (R2): "Nowa adds the Supabase package and a `SupabaseService` with `signUp`, `signIn` and
  `signOut`." Replaced by what it means for the reader ("Nowa sets up everything your app needs to talk to Supabase,
  including ready-made sign-up, sign-in and sign-out actions ... listed under **Authentication** in the panel"). One
  link to `../code/generated-code.md#supabase` at the end of the page.
- Heading "2. Refine it by hand" renamed "2. Make it look like yours" (no inbound anchor links; checked with grep).

Added / changed claims and evidence:
- Sign-up/sign-in/sign-out listed under **Authentication** in the Supabase panel: `docs/integrations/supabase/connect.md`
  (panel table and screenshot).
- Circuit steps (hover the dot, **+**, search `SupabaseService`, pick `signIn`; link **Email** via **LOCALS** →
  controller → `text`; **onValue**/**onError**; **Show snackbar**): `docs/integrations/supabase/auth.md#login-screen`
  steps 3-9 (verified page).
- `push` opens on top so people can go back; `go` replaces the current screens: `docs/logic/navigation.md:45-46`.
- "If the types differ, **Problems** shows an error": `docs/logic/navigation.md:87`.
- "Check my project for problems and fix them" prompt: `docs/guides/ai-tips.md#review-what-the-agent-did`.
- Plan mode changes nothing until **Implement this plan**: `docs/guides/ai-tips.md#pick-the-right-mode-and-level`,
  `docs/ai/modes.md`.
- Signing key "proves that every update comes from you": without the Android key you can't release updates
  (`docs/guides/ship-tips.md#keep-a-way-back`, `docs/publish/android.md`).
- App Store Connect is where you submit the build for review: `docs/publish/ios.md:172` (choose the build and submit it
  for review), citing Apple's https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app.
- Prompts are suggestions to the agent, not product claims; each comes with a way to check the result.

Length: about 2,230 words of visible text (2,290 with markup), slightly over the ~2,200 mark because every build
step now has a prompt path and a visual path. If it needs to shrink, split it in two: "Build a complete app, part 1:
design and sign-in" (steps 1-4) and "part 2: data, detail screen and publishing" (steps 5-8), with the Before you
start list on part 1 and a link between them.

Open questions: none.

## guides/design-tips.md

For the reader:
- R5: dark mode and theme extensions now lead with an **Agent** mode prompt and a way to check it; the hand path
  for dark mode stays short (`changeTheme` in Circuit, explained as the action that switches the running app's theme,
  R3). Theme extensions: "they come from code that you or Nowa AI write" became "an extension lives in your app's
  code, so ask Nowa AI".
- "Need two layouts?": prompt first; the typed expression `MediaQuery.of(context).size.width` was replaced by "a
  condition on the screen's width" with the link to the full steps (the expression and the menu path stay on
  `design/responsive.md#show-different-widgets-on-wide-and-narrow-screens` and `logic/actions.md#read-the-screen-size`,
  so nothing is lost; it isn't generated code, so it isn't in the for-code file).
- Explained in a clause: HEX value, breakpoints, params, route; "snake_case" became "lowercase with underscores".
- Everyday examples added (product card on two screens, a long recipe title, sign-up or checkout boards).

Added / changed claims and evidence:
- `changeTheme` switches the running app's theme, from `AppState` in Circuit: `docs/design/theme-styles.md#switch-themes-while-the-app-runs`.
- A new extension shows up as a tab in **Themes**: same page, `#colors-from-theme-extensions` (already on this page:
  "show up as tabs in **Themes**").
- Width condition via **Visibility**: `docs/design/responsive.md:91-102`; menu path **GLOBALS** → **Media Query** →
  `size` → `width`: `docs/logic/actions.md:37-43`.

Open questions: none.

## guides/ai-tips.md

For the reader:
- New section **Describe behavior the way people see it**, with the old quickstart's stopwatch prompt rewritten as
  a state-by-state description in plain words (coverage: old `getting-started/quickstart.md`, "Example prompt").
  It's a prompt pattern, not a product claim; the check is to play the screen and try each case.
- "Edit by hand in between": "Nowa applies your code edits before it sends a request, so Nowa AI works from your
  latest code" became "Nowa AI always works from your latest version, including the changes you just made by hand"
  (the reader edits visually, not in code).
- Checkpoints: `.nowa/temp/` moved to the for-code file (R2); the page keeps the consequence: "Git doesn't save them.
  Keep a Git commit or a downloaded copy of any version you want to be able to return to."
- Explained in a clause: packages (ready-made add-ons), Row Level Security policies, migrations, logs. "Code card"
  replaced by the UI title **Writing code** with "You don't have to read any code".
- Tone (R9): teammate framing in the intro, why Design is a safe place to explore, why checkpoints make trying ideas
  low-risk, why polish is faster by hand.

Added / changed claims and evidence:
- Latest version incl. hand edits: the agent reads files from the open project in memory
  (`packages/ai/lib/src/tools/read_file_content_tool.dart:49-55`, `gProject.files.file(...).content`), and code-editor
  buffers are flushed before sending (`packages/ai/lib/src/chat_session.dart:268`, `CodeBufferService.flush()`).
- Checkpoints not in Git: `docs/ai/undo-and-history.md:40` (`.nowa/temp/` is ignored by Git).
- **Writing code** cards, hover to highlight, click to jump, no need to read code: `docs/ai/chat.md:41`.
- Connectors let Nowa AI act in Figma and Supabase: glossary (Connector), `docs/ai/connectors.md`.

Open questions: none.

## guides/data-and-state-tips.md

For the reader:
- Models: "Nowa keeps its constructor, `fromJson` and `toJson` up to date" moved to the for-code file (R2, `fromJson`
  is named in the brief); the page now says what it means: Nowa keeps the model up to date as you add and remove
  fields, including the part that turns backend data into a recipe and back. Added a one-line definition of a model.
- R3: **refresh** (redraws the screen) and **notifyListeners** (tells every screen that shows this data to update,
  the brief's own wording) explained where they appear in the table.
- R4 in a clause: publishable key, JSON, backend, base URL, header values, anon key, webhook secret, Supabase secrets,
  query, Future / **Future Options**, `isEmpty`, **Show snackbar** (a short message).
- R5: Supabase tables and RLS lead with "ask Nowa AI with the Supabase connector" (example prompt for RLS, then test
  while signed in); empty-list message leads with a prompt, the visual steps follow.
- "compiled into your app" became "built into your app"; "saved in your project's code" became "saved in your
  project".
- Tone (R9): intro names the everyday failures (a cart that forgets, a list that never loads, a key that leaks); a line
  of why before the testing and loading sections.

Added / changed claims and evidence:
- **refresh** redraws the screen: `docs/logic/variables.md:72-74`.
- **notifyListeners** tells every widget that reads the global state to update: `docs/logic/global-state.md:33-35`.
- Stripe secret key and webhook secret kept in Supabase secrets (already on the page; `docs/integrations/stripe.md`).
- Example RLS prompt and empty-list prompt: suggestions with a check (test signed in, **Play**), no product claim.

Open questions: none.

## guides/ship-tips.md

For the reader:
- Moved to the for-code file (R2): `flutter analyze` (now "checks your whole app thoroughly"; the web publish runs
  "that same check"), `.nowa/temp/` (now "Git doesn't save them"), the `supabase/` folder (now "into your project, so
  Git can keep them"), Google Pay's `testEnv: true` (now "switched from Google's test environment to the real one",
  with an **Agent** mode prompt first, R5).
- Explained in a clause: paywall, route, logs, commit, migrations, edge functions, Bundle Identifier, `.aab`, where a
  bundle ID is registered.
- "No server secret sits in **Constants** or request headers" became "No secret key sits in **Constants** or in a REST
  API's request settings" (same fact, plain words).
- "A screen with a route starts your app's router at that path" became "Play starts your app's navigation at that
  screen, so moving to the next screens works".
- Tone (R9): what each kind of test answers, why the unhappy paths matter, why the checklist saves time.

Added / changed claims and evidence:
- "Publishing to the web starts with that same check": `docs/publish/web.md:15` (code check with `flutter analyze`)
  and `docs/test/problems.md:26` (From Code Analysis = `flutter analyze`).
- Asking Nowa AI to switch Google Pay to production: `docs/integrations/stripe.md:60` ("Change it before you publish,
  in `lib/integrations/stripe_payment_service.dart` ... or by asking Nowa AI").
- Bundle ID registered in your Apple Developer account: `docs/publish/ios.md` (Identifiers, register a bundle ID).
- "Fixing it after release can mean another store review": store updates are new builds that go through each
  store's review (`docs/publish/ios.md:172`, `docs/publish/android.md`); worded "can mean" because the web has none.

Open questions: none.
