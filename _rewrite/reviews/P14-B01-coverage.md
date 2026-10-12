# P14-B01 coverage: old Get started, toolbar, Widgets panel and local-project pages

Batch P14-B01. Old pages under `_rewrite/old-docs/`, new pages under `docs/`. Code refs are relative to
`/home/user/nowa-master` (3.13.0, `3cb32031c`). Statuses: `covered` (page#section) / `added` (page#section) /
`obsolete` (code ref) / `not useful` / `dev-only` / `for other page` (target). (All planned additions are saved; no `to add` rows remain.)

## index.md (old docs home)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Tagline "build great Flutter apps fast with much fun" | not useful | | Filler. The new hero says what Nowa does. |
| Section cards (Getting started, AI, Designer, Logic, Variables, Data sources, Git, Local projects, Deployment, Hybrid, Tutorials, What's New, Shortcuts) | covered | `index.md#browse-by-topic` | Variables/logic → Add logic; Git, local, hybrid → Work with code; tutorials → Legacy tutorials (`index.md` footer line); shortcuts → Reference. |

## getting-started/introduction.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| What Nowa is: production-ready Flutter apps with AI and visual building, no Flutter or code needed | covered | `get-started/welcome.md` intro | Rewritten so "no code needed" is said plainly, prompt first. |
| Three layers: AI agent, visual designer, Circuit (flow-chart logic editor), code access | added | `get-started/welcome.md#how-building-works` (Circuit named in the logic step) | Circuit was not named on the welcome page. Evidence: `packages/core/lib/src/fields/field_link_menu.dart:389` (**Open in Circuit**), `logic/circuit.md`. |
| AI: keep requests simple, the agent handles the details | covered | `guides/ai-tips.md#work-in-small-steps`, `ai/prompting.md` | |
| Designer works like Figma but builds real Flutter UI, not mockups | added | `get-started/welcome.md` intro | "The screens on your board are your real app": the board edits the project's own files (`packages/core/lib/src/interpreter/block_tree.dart`), the same project runs with **Run** and publishes with **Deploy**. |
| Instant preview: **Play**, no build step | covered | `get-started/welcome.md#how-building-works` step 6, `get-started/first-app.md#4-play-a-screen`, `test/instant-play.md` | |
| View or download the full source code any time; local projects already have it on disk | covered | `publish/download-code.md`, `get-started/cloud-and-local.md#the-difference-at-a-glance` ("Getting your code") | |
| Clean code: hand it to developers, keep developing, import it back, no lock-in | covered | `publish/download-code.md` ("hand it to a developer"), `code/import.md` | A one-line pointer was added to `welcome.md` intro. |
| Desktop app and local projects "for top performance, speed and security"; "no metadata, no hidden files, just pure code" | obsolete | `.nowa/temp/` holds checkpoints (`docs/ai/undo-and-history.md:40`), boards are `.board` files in `boards/` (`docs/code/index.md:25`) | "No hidden files" is not true in 3.13. Performance/security claims are marketing, not verifiable. Local projects themselves: covered in `get-started/cloud-and-local.md`. |
| Hybrid workflow: Nowa and VS Code on the same project, changes sync both ways, keep Git and CLI tools | covered | `code/vs-code.md`, `get-started/cloud-and-local.md` (VS Code row) | |
| Full code control: custom code, any pub.dev package, edit generated and platform files | covered | `code/custom-code.md`, `code/packages.md`, `get-started/welcome.md#who-nowa-is-for` | |
| Integrations: Firebase, Supabase, Airtable, any REST API | covered | `get-started/welcome.md#how-building-works` step 5, `integrations/index.md` | Airtable is obsolete as a named integration: no Airtable UI in 3.13, only an internal endpoint (`packages/core/lib/src/dialogs/dialog_data_sender.dart:10`). Any REST service: `integrations/rest-api/index.md`. |
| Deploy to the App Store, Google Play and the web; web hosting on Nowa with custom domains | covered | `get-started/welcome.md#what-you-can-build`, `publish/web.md` (Custom Domain, higher plan) | |
| Templates | covered | `design/templates.md`, `get-started/playground.md#pick-a-starting-point` | |
| Nowa Marketplace (clone full apps) | obsolete | `lib/dashboard/market_place/marketplace_view.dart:11` (`MarketplaceView` is referenced nowhere else); `_rewrite/left-out.md` | |
| Git integration (local and cloud), GitHub | covered | `code/git.md`, `code/github.md`, `get-started/cloud-and-local.md` (Git row) | |
| "What it means for you" | not useful | | Filler. |
| You can start for free | added | `get-started/welcome.md#what-you-can-build` | Free plan exists: `packages/core/lib/src/billing/billing_models.dart:45` (`isFreePlan`), **Upgrade** shown on it (`lib/project/top_bar_mapper.dart:162`). No limits stated (D3). |
| Free plan contents, AI message count, custom plans for teams | not useful | | Pricing and plan limits (D3): nowa.dev/pricing. No in-app "custom plans" text in 3.13. |
| Reach out any time | covered | `index.md#get-help`, `account/help.md` (team@nowa.dev) | |
| Discord and community forum | covered | `index.md#get-help`, `account/help.md#join-the-community-and-contact-us` | |
| Blog, YouTube, LinkedIn, X | covered | YouTube: `index.md#get-help`; LinkedIn and Twitter/X: site footer (`docusaurus.config.js:214-219`) | Blog: not useful (social link; nowa.dev can't be reached from this session to confirm the current blog address, see `research/positioning.md`). |

## getting-started/quickstart.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Create a cloud project (**New Cloud Project** → name → **Create**) | covered | `get-started/first-app.md#1-describe-your-app` (the prompt box creates the project), `account/projects.md` (**New project**) | Old labels gone: no "New Cloud Project" string in 3.13 code. |
| Describe the app in **Chat** and send | covered | `get-started/first-app.md#1-describe-your-app`, `#2-watch-nowa-ai-build-it` | "Chat" is now the **AI Assistant** panel (glossary). |
| Example prompt: a stopwatch whose single button changes with its state (Start, Stop, Reset) | added | `guides/ai-tips.md#describe-behavior-the-way-people-see-it` | Prompt-writing pattern for non-coders; no product claim. |
| Change the look visually: pick the widget in the tree, set **Color** from the theme | covered | `get-started/first-app.md#3-change-something-by-hand` (Outline, Details), `guides/design-tips.md#set-the-theme-first` ("Link, don't type") | |
| Try it out with Play | covered | `get-started/first-app.md#4-play-a-screen` | |

## getting-started/install.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Sign up with email and password, or with Google | covered | `get-started/create-account.md#sign-up-with-email`, `#sign-up-with-google` (also Apple) | |
| Email sign-up: name, email, password, accept terms, **Create Account** | covered | `get-started/create-account.md#sign-up-with-email` | Current labels: **First name**, **Last name**, **Repeat password**, **Create account**. |
| Confirm by clicking the link in the verification email | obsolete | `lib/auth/auth_view.dart:745-797` (**Confirm your email**, 6-digit code, **Verify**, **Resend the code**) | The current code flow is covered in `create-account.md` step 5. |
| Google sign-up: pick the account, first and last name, terms, **Create Account** | covered | `get-started/create-account.md#sign-up-with-google` (**Complete your account**) | |
| After sign-up: Welcome Screen with **Let's Get Started** | obsolete | No such string in 3.13 code | Replaced by the four-question survey: `get-started/create-account.md#answer-the-four-questions`. |
| Dashboard: create, reopen and organize projects | covered | `account/index.md#the-dashboard-at-a-glance` | |
| Sidebar shortcuts: Workspaces, Templates, Learning resources, Account settings | covered | `account/index.md` (workspace switcher, **Learning Resources**, **Settings**) | **Templates** in the sidebar is obsolete: `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:140-215` has no such entry. |
| Projects in the middle; search and new-project button | covered | `account/index.md`, `account/projects.md` (**Search...**, **New project**) | |
| Create a workspace (**+**, name, **Create**) | covered | `account/workspaces.md#create-a-workspace` (switcher → **Create workspace**) | |
| Choose local or cloud when you start a project | covered | `get-started/cloud-and-local.md` | |
| Cloud: stored online, open anywhere, share with a team | covered | `get-started/cloud-and-local.md#the-difference-at-a-glance`, `#which-should-you-pick` | |
| Create a cloud project (**New Cloud Project** → name → **Create**) | covered | `account/projects.md` (**New project**), `get-started/first-app.md` | Old labels obsolete (see quickstart row). |
| Local: stored only on your computer, keep data private | covered | `get-started/cloud-and-local.md#which-should-you-pick` | |
| Local: work offline | obsolete | `lib/router.dart:45-110` (every signed-in page checks the version and your account with Nowa's server; offline the desktop app shows **No Internet Connection**, `lib/router.dart:86-91`, `:346-355`) | Correction added: Nowa needs an internet connection, also for local projects (`get-started/cloud-and-local.md#which-should-you-pick`, `get-started/desktop-app.md`). |

## getting-started/exploreinterface.mdx

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Interface overview image | not useful | | Pure media; the editor tour has a current annotated screenshot. |
| Toolbar: add elements, play, test | covered | `get-started/editor-tour.md#board-and-toolbar` | Now at the bottom of the board (`packages/designer/lib/src/panels/designer_board.dart:141-146`). |
| Screen and widget properties panel | covered | `get-started/editor-tour.md#details-and-variables`, `design/properties.md` | |
| Variables: values that change while a screen is open | covered | `get-started/editor-tour.md#details-and-variables`, `logic/variables.md` | Plain-words definition added on the editor tour (R8). |
| AI Assistant | covered | `get-started/editor-tour.md#sidebar-and-panels`, `ai/index.md` | |
| API collections | covered | `get-started/editor-tour.md` (**Api** row), `integrations/rest-api/index.md` | |
| File system: `lib`, `boards`, `assets` | covered | `code/index.md:25`, `code/code-mode.md:16` | Code-level; already in the code section. Editor tour points to **Files** in code mode. |
| Play mode, preview in a phone frame | covered | `get-started/editor-tour.md#board-and-toolbar`, `get-started/first-app.md#4-play-a-screen`, `#6-run-the-real-app` | |
| Test mode: simulator or device | covered | `get-started/desktop-app.md`, `test/devices.md`, `get-started/first-app.md#6-run-the-real-app` | |
| Supabase integration | covered | `get-started/editor-tour.md` (**Supabase** row) | |
| Themes | covered | `get-started/editor-tour.md` (**Themes** row), `guides/design-tips.md` | |
| Widgets as building blocks | covered | `get-started/welcome.md#key-terms`, `get-started/editor-tour.md` (**Library** row), `reference/widgets/index.md` | |
| Circuit: set up visually what happens on a tap | added | `get-started/editor-tour.md#circuit-where-logic-lives` | Missing from the tour. Evidence: event button **+**/**Edit** (`packages/core/lib/src/fields/nowa_fields.dart:797-830`), **Open in Circuit** (`packages/core/lib/src/fields/field_link_menu.dart:389`), `logic/circuit.md#open-circuit`, `logic/events.md`. |

## ui/toolbar.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Toolbar at the top of the Design Board | obsolete | `packages/designer/lib/src/panels/designer_board.dart:141-146` (bottom center) | Current location covered in `editor-tour.md#board-and-toolbar`. |
| **Selection** | covered | `get-started/editor-tour.md#board-and-toolbar` (**Select tool**, V) | `packages/designer/lib/src/widgets/designer_tools.dart:135` |
| **Shape** draws a Container | covered | same (**Shape**, R) | `designer_tools.dart:142` |
| **Screen**: empty screen or template | covered | same, `design/templates.md` (**Empty Page**) | `designer_tools.dart:152` |
| **Text** | covered | same (**Text**, T) | `designer_tools.dart:164` |
| **Widget** opens the widget picker | covered | same (**Widget**, Ctrl/Cmd + K opens the Library search) | `designer_tools.dart:174` |
| **Play** tool in the toolbar | obsolete | `designer_tools.dart:130-183` (five tools, no Play) | **Play** is on each item's title bar: `editor-tour.md#board-and-toolbar`, `test/instant-play.md`. |

## ui/widget-panel.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Widgets panel lists screens and components, opened from the sidebar | covered | `get-started/editor-tour.md` (**Library** row), `design/library.md` | 3.13 replaced it with the Library (D20). |
| Tabs **Pages** and **Components** | obsolete | `packages/nowa_ui/lib/library/library_panel.dart:433-436` (sections **Project**, **Packages**, **Built-in**) | The phone layout has **All**, **Pages** and **Components** tabs (`get-started/mobile.md`). |
| Drag screens and components onto the board | covered | `get-started/editor-tour.md` (**Library** row), `design/library.md` | |
| Double-click to open in its own editor | covered | `design/library.md#open-rename-delete-and-move` | |
| Right-click to rename or delete | covered | `design/library.md#open-rename-delete-and-move` | |
| Tip: quickest way to move between screens | covered | `design/library.md` | |

## local-project-simulator/createlocalproject.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Desktop app for macOS and Windows; local Flutter projects | covered | `get-started/desktop-app.md` intro (macOS, Windows, Linux) | |
| Download: sign in on the web, **Download for Desktop**, pick your system, install | covered | `get-started/desktop-app.md#download-and-install` (**Download Desktop App**) | Old label gone in 3.13. |
| Flutter SDK needed for local projects; automatic or manual | covered | `get-started/desktop-app.md#setting-up-flutter-sdk` | Plain-words "why" (and who doesn't need it) added, plus `#do-you-need-the-desktop-app`. |
| macOS: setup fails with "Flutter failed to initialize: xcode-select: No developer tools were found" without Xcode | added | `get-started/desktop-app.md#macos-install-xcode` | `packages/core/lib/src/environment/flutter_installer.dart:112-114` (the error, with Flutter's own message appended), shown in red under the row with **Try again** (`environment_setup_dialog.dart:880-883`, `:917`). |
| Install Xcode from the App Store (a large download), open it once, return to Nowa | covered | `get-started/desktop-app.md#macos-install-xcode` | "Large download" added. Matches the in-app helper text (`environment_setup_dialog.dart:463-470`). |
| Xcode builds macOS and iOS apps | covered | `get-started/desktop-app.md#macos-install-xcode` | |
| Automatic setup: **Settings** → **Local Setup** → **Set up automatically** | covered | `get-started/desktop-app.md#let-nowa-install-flutter` | |
| Install location (no spaces), licenses, **Install** next to **Flutter**, about 1 GB download, about 10 GB of tools | covered | same | |
| Wait for the download and follow the progress | covered | same ("Keep Nowa open") | |
| **Verify** runs `flutter doctor` and lists devices | covered | same | |
| Optional Android toolchain and emulator, **Skip for now**, add later from **Environment** | covered | same | |
| Installed tools show **Ready · Managed by Nowa**; **Done** | added | `get-started/desktop-app.md#let-nowa-install-flutter` | "Managed by Nowa": `packages/core/lib/src/environment/environment_doctor.dart:25`, `:68`; status text `environment_setup_dialog.dart:950-958`. |
| Tools come from Google and the Eclipse Foundation | covered | same | |
| Manual: install Flutter from the official guide; Xcode on macOS | covered | `get-started/desktop-app.md#use-a-flutter-sdk-you-already-have` | |
| Point **Local Setup** to the Flutter folder; default projects folder; VS Code path | covered | same | |
| Why desktop: better performance | not useful | | Marketing, not verifiable in code. |
| Why desktop: local projects are standard Flutter projects for VS Code, GitHub, Copilot and other tools | covered | `get-started/cloud-and-local.md`, `code/vs-code.md`, `code/local-projects.md` | |
| Why desktop: run on Android, iOS, web and desktop simulators | covered | `get-started/desktop-app.md` intro, `test/devices.md` | |
| Why desktop: offline mode | obsolete | `lib/router.dart:45-111`, `:346-355` | Correction added: `get-started/desktop-app.md#sign-in-and-stay-up-to-date`, `get-started/cloud-and-local.md#which-should-you-pick`. |
| "Nowa Desktop is available for all users, no premium plan required" | obsolete | `lib/router.dart:76-82` ("Has to be paid for the desktop version", desktop entitlement → `/upgrade`), `lib/upgrade_page.dart:30` | Current behavior covered in the `desktop-app.md` note. |
| First local project: **Your Projects** → **Local Projects** → **New Local Project**, name, package name, folder, **Create** | covered | `code/local-projects.md#create-a-local-project`, `get-started/cloud-and-local.md#create-each-kind` | Old labels gone (**New project** → **Advanced** → **Local-only project**). |
| Nowa generates a ready-to-use Flutter project | covered | `code/local-projects.md` step 5 | |

## local-project-simulator/whylocalproject.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Choose between cloud and local projects | covered | `get-started/cloud-and-local.md` | |
| Cloud: everything online, Cloud Build for Android, iOS and web without setup | covered | `get-started/cloud-and-local.md` (Deploy row) | |
| Local: on your computer, you build yourself, more control | covered | `get-started/cloud-and-local.md` (Deploy row: link a cloud copy with **Project Sync**) | |
| Local testing on devices and simulators with Hot Reload | covered | `get-started/cloud-and-local.md` (Run rows now say what saving does), `test/run.md` (**Hot Reload**), `test/devices.md` | |
| Cloud testing needs a code download or a cloud rebuild each time | obsolete | `lib/project/run/run_button.dart:561-567` (cloud projects run on devices through a **Local cache** copy "re-synced on save"), Run in the editor on Nowa's servers | Current behavior covered in `cloud-and-local.md` (Run rows). |
| "You can see which project you are viewing" (image) | added | `get-started/cloud-and-local.md#tell-which-kind-you-have` | How to tell: dashboard **Cloud**/**Local** badge (`packages/nowa_ui/lib/dashboard/projects_grid.dart:253`), **LOCAL-ONLY** (`projects_view.dart:504`); in the editor a local project has no **Deploy** button (`lib/project/run/deploy_button.dart:21`) and its run controls read **Hot Reload** and **Open in Browser** (`lib/project/top_bar_mapper.dart:187-188`). |
| Why local: keep VS Code, simulators and Git | covered | `get-started/cloud-and-local.md#which-should-you-pick` | |
| Why local: edit in your IDE and design in Nowa, changes stay in sync | covered | `get-started/cloud-and-local.md` (VS Code row), `code/vs-code.md` | |

## Totals

| Old page | Items | covered | added | obsolete | not useful | dev-only | for other page |
|---|---|---|---|---|---|---|---|
| `index.md` | 2 | 1 | 0 | 0 | 1 | 0 | 0 |
| `getting-started/introduction.md` | 21 | 14 | 3 | 2 | 2 | 0 | 0 |
| `getting-started/quickstart.md` | 5 | 4 | 1 | 0 | 0 | 0 | 0 |
| `getting-started/install.md` | 14 | 11 | 0 | 3 | 0 | 0 | 0 |
| `getting-started/exploreinterface.mdx` | 13 | 11 | 1 | 0 | 1 | 0 | 0 |
| `ui/toolbar.md` | 7 | 5 | 0 | 2 | 0 | 0 | 0 |
| `ui/widget-panel.md` | 6 | 5 | 0 | 1 | 0 | 0 | 0 |
| `local-project-simulator/createlocalproject.md` | 22 | 17 | 2 | 2 | 1 | 0 | 0 |
| `local-project-simulator/whylocalproject.md` | 8 | 6 | 1 | 1 | 0 | 0 | 0 |
| **Total** | **98** | **74** | **8** | **11** | **5** | **0** | **0** |

Besides the 8 `added` rows, 7 rows marked `covered` or `obsolete` brought something back on a page of this batch:
the hand-off-to-a-developer pointer (`welcome.md`), the plain-words Variables tabs (`editor-tour.md`), the Flutter
"why" and "Do you need the desktop app?" (`desktop-app.md`), "large download" for Xcode (`desktop-app.md`), what saving
does in a run (`cloud-and-local.md`), and the internet-connection correction for the two old "work offline" claims
(`cloud-and-local.md`, `desktop-app.md`). The code-level item (project folders `lib`, `boards`, `assets`) was already
in the code section, so nothing went to the for-code file from the old pages. The for-code file holds facts moved off
the new pages (R2). Two items were routed to other batches' pages in the notes ("For other pages").
