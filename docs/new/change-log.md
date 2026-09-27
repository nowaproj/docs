---
title: "Changelog"
sidebar_position: 2
---

> Detailed log of all updates, improvements, and bug fixes for each version.

---

## **3.12.5 (25 September 2026)**

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

#### **Added 🌟**
- **Full mobile browser support** — access Nowa from your smartphone to check projects, make quick updates, and deploy directly from your mobile browser.
- **Post-launch support package** — after successfully deploying an app, claim **$25 in Nowa AI credits**, direct support from the Nowa team, and help with exposure, monetization, feedback, and app improvements. The package is available from the deployment panel.

#### **Improved ⚙️**
- **Workspace experience** — improved team invitations and collaboration, workspace organization, and project management.

#### **Fixed 🩹**
- Fixed an issue that affected some **Windows users working with Git in Nowa**.

---

## **3.9 (13 June 2026)**

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

#### **Added 🌟**
- **Localisation support** — make your app run in multiple languages with ease. Just ask Nowa AI to set it up and it'll handle everything end to end.
- **AI font downloads** — ask Nowa AI to set any font and, if it's not already in your project, it'll download and set it up automatically. Useful when importing designs from Figma or other tools.

#### **Improved ⚙️**
- **Package conflict handling** — Nowa AI now automatically detects and resolves package conflicts, so you don't have to dig through dependency errors yourself.

#### **Fixed 🩹**
- Fixed an issue where the **widget menu wasn't working** on the web version.

---

## **3.7.2 (23 April 2026)**

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

#### **Improved ⚙️**
- **Editable `main.dart`** — a new system now lets both you and the AI agent freely modify the `main.dart` file without running into issues.
- **AI stability on weak connections** — Nowa now handles weak and moderate internet connections much more gracefully, preventing unexpected disconnects mid-task.

#### **Fixed 🩹**
- Fixed an issue where some projects weren't loading correctly after the 3.6 update.

---

## **3.6 (6 March 2026)**

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

#### **Fixed 🩹**  
- Scale plan now shows the **actual credit number** instead of displaying 99+.  
- Fixed issue where **adding headers stopped working** after changing the API type.  
- Fixed issue with **attachments taking long to appear in the chat**.  

---

## **3.0.8 (17 September 2025)**

#### **Fixed 🩹**  
- Old templates updated and replaced with new ones matching Nowa 3.0 standards.  
- Older way of changing themes removed to simplify theming workflow.  
- Error build design now clearly shows it’s clickable to access build logs.  
- Added option to include **cloud build logs** when submitting bug reports.  

---

## **3.0.6 (8 September 2025)**

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

#### **Fixed 🩹**  
- Issue with building apps due to a package version conflict.  
- Issue with iOS deployment preventing some apps from being published.  
- Issue with project loading caused by conflicts in widget names.  
- Issue with AI tool results where `tool_use ids were found without tool_result`.  

---

## **3.0.1 (11 August 2025)**

#### **Fixed 🩹**  
- Fixed **Desktop App access** not available for some plans.  
- Fixed **Board naming** issue where new boards were created with `board*.board` instead of the assigned name.  
- Fixed **AI on macOS** not running on certain versions due to `FileSystemException: '/ai_debug_logs'` error.  

---

## **3.0.0 BETA (4 August 2025)**

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

#### **Added ✨**  
- **AI Chat Template**: Quickly build chat-based apps using the built-in, fully functional chat template, complete with chat bubbles and logic. [Read more](../tutorials-template/chat-template.mdx)
- **Quick Navigation to Functions & APIs**: New "open" icon next to functions and API requests to instantly jump directly to their definitions.

#### **Fixed 🩹**  
- Fixed details panel not showing edit button for some custom expressions.  
- Fixed web deployment issue causing older projects to deploy an empty app.  
- Fixed gray box covering file system when deleting some files.  
- Fixed file panel not updating after adding or removing a file.  
- Fixed OnValue not opening for API requests in Circuit.


## **2.0.17-beta (5 March 2025)**  

#### **Added ✨**  
- **Web Deployment**: Deploy your web apps online directly from Nowa in development or production mode, with an option to download build files for external hosting. [Read more](../deployment/web-deploy.mdx)
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

#### **Added ✨**  
- **Expansion Tile Widget:**  
  Easily reveal or hide additional content by adding collapsible sections to your app. Ideal for creating organized and dynamic layouts. [Learn more](../ui/widgets/widget-desc/expansion-tile.md) 

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
- **Themes Management:** Add and manage multiple themes with customizable colors and typography. Dynamically switch themes during runtime. [Read more](../ui/themes/create-themes.md)
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
