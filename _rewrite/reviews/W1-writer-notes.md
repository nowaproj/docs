# W1 writer notes (Home + Get started)

Writer: batch W1 (Sonnet). Code refs are relative to `/home/user/nowa-master` (v3.12.5). Research files: `_rewrite/research/features-*.md`.
Status per page is appended below as each page is saved.

## docs/get-started/first-app.md

Research: features-account-projects "What do you want to build?", "Welcome to Nowa tour"; features-ai "Switch mode", "Instant / Thinking / Deep Thinking", "Your app design is complete / Make it real", "Questions", "Send / Abort", "Restore Checkpoint", "Fix with AI"; features-designer-core "Play (Instant Play)", "Selecting"; features-code-ship "Run button", "Embedded preview", "Share Preview"; features-editor-shell "Save options".

Code checked directly:
- Dashboard prompt box labels, example prompts (50, 3 shown at a time, refresh button tooltip "Refresh prompts"), send tooltip "Build it": `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:35-346,424,468,555-561,593`.
- Defaults Design / Thinking, Design description, link built for prompt-to-app: `lib/dashboard/dashboard_page.dart:48-51,209-232`.
- "Start here" badge is shown in the open mode menu next to Design (not on the chip): `packages/nowa_ui/lib/src/components/option_chip.dart:100-190`.
- Loading texts "Setting things up…", "Naming your app…", "Creating your project…"; project always created as a cloud project; prompt sent after load and Assistant panel opened: `lib/dashboard/create_new_project/prompt_to_app_page.dart:46-95`, `lib/project/project_page.dart:186,203-232`.
- Welcome dialog "Welcome to Nowa!" / "Take the quick tour" / "Close" shown 800 ms after a new project loads when the tour was never finished: `lib/project/onboarding/welcome_dialog.dart`, `lib/project/onboarding/onboarding_overlay.dart:48-53`, `lib/project/project_page.dart:625-629,652`.
- Make it real card texts ("Your app design is complete", "Pick what to make work first:", "Make it real", "Switched to Agent mode"): `packages/ai/lib/src/ui/guided_inline_views.dart:36-128`.
- Run toolbar labels: **Back to board**, **Hot Restart** (cloud), **Open on Mobile** (cloud, QR icon, enabled only when the app is ready): `lib/project/top_bar_mapper.dart:127-146`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:765-865`. Save-triggered restart: `packages/nowa_run/lib/src/nowa_run_manager.dart:150-170` (comment).
- Floating Details/Variables hidden below 600 px board width: `packages/designer/lib/src/designer_setup.dart:166-175`. Mobile shell below 840 px: `packages/nowa_ui/lib/src/globals/responsive_utils.dart:40-68`.

Assumptions / open questions:
- "About 15 minutes" is an editorial estimate (pages.md asks to state the time); it is not from code. The AI build time is not known. Adjust after a real walkthrough (the capture run could time it).
- The example prompt (habit tracker) is mine; it is only an example and no output is promised.
- "Public" warning text is a paraphrase of the app's own dialog ("Your project becomes open source, anyone with the link can read every file and save their own copy of it." / "Making the project public would expose any API keys, tokens and any other secrets."): `packages/designer/lib/src/play_mode/play_mode.dart:588-611`.
- Step 6 says the preview restarts when you save after going back to the board; per research ("updating every time you save") and the manager comment, but not tested in the product.
- Not covered on purpose: Approval Required cards (connectors only), Plan mode details (link to modes page), Deploy (linked in next steps).

## docs/get-started/welcome.md

Research: `research/positioning.md` §1, §3, §5 (one-liner, audience, vocabulary); `glossary.md` (terms); features-account-projects "Desktop app", "Import project", "Playground"; features-code-ship "Deploy button and menu", "Run on devices and emulators"; features-editor-shell "Mobile layout".

Code checked directly:
- Paid-plan gating strings for web and mobile deploy: `lib/project/run/deploy_button.dart:188,287,302` ("Publishing to a live web URL is available on paid plans." / "Mobile deployment is available on paid plans.").
- Import project is desktop-only: `lib/dashboard/create_new_project/import_project_dialog.dart` (research `NPlatform.isDesktop`).

Assumptions / open questions:
- "Desktop: run your app on desktop targets from the desktop app" rests on the research line "desktop targets via your Flutter SDK" (features-code-ship "Run on devices and emulators") and the in-app tour text "run it locally on iOS, Android, Chrome, macOS and more" (`lib/project/onboarding/onboarding_step.dart:~95`). No claim about publishing desktop installers (macOS deploy tab is debug-only).
- Did not name the AI model, plan names or prices (D3).
- "No Flutter knowledge needed" is the positioning from BRIEF.md and nowa.dev, not a code fact.

## docs/get-started/create-account.md

Research: features-account-projects "Create your account", "Welcome back!", "Continue with Google", "Continue with Apple", "Confirm your email", "Reset your password", "Onboarding survey", "Logout".

Code checked directly:
- Sign-in and sign-up labels and hints, errors, footer links: `lib/auth/auth_view.dart:286-351,446-549,602-653`.
- 6-digit code step ("Confirm your email", auto-verify on 6th digit via `onCompleted`, **Verify**, "Resend the code" → "Sent!", "Log out"): `lib/auth/auth_view.dart:745-806`.
- Reset flow ("Set a new password", **New password**, **Repeat new password**, **Reset password**, "Password changed", "Invalid link"): `lib/auth/reset_password_page.dart:46-100`.
- Survey ("Question N of 4", five/six options, follow-up for Other/Yes, not dismissible, shown while `user.didSurvey` is false): `lib/dashboard/overlays/survey_overlay.dart:31-77,183`, `lib/dashboard/dashboard_provider.dart:53-70`.
- Playground link on the sign-up page ("Want to look around first?" / "Build an app, no account needed"): `lib/auth/auth_view.dart:542-549`.
- Apple sign-in only on web and iOS: research `lib/auth/auth_widgets.dart:512-539` (`kAppleSignInSupported`).

Left out / open questions:
- AppSumo link (`/auth/appsumo`) is a partner link; not documented. Referral `?ref=` code not documented.
- Whether Google accounts must also confirm an email code is not visible in the client; the page says nothing about it.
- Whether the verification email contains a link as well as the code is unknown (research open question); the page only says "6-digit code".
- The survey is shown on first dashboard load for accounts that have not answered; after email sign-up it follows the code step. The page describes both as "the first time you reach the dashboard".

## docs/get-started/editor-tour.md

Research: features-editor-shell (Editor layout, Top bar, Board chip, Sidebar and side panels, Widgets, Files, Outline, Search, Variables and Details, Status bar, Console, Problems, Save options, Shortcuts, Settings, Support, Notifications, Welcome tour, Nothing is open); features-designer-core (Designer toolbar, Board items); features-logic "Variables panel". Screenshots viewed: `captures/ui-map/01`, `10`, `13`, `15`, `16`, `19`, `23` (playground editor, so no **Git** icon and **Save** instead of **Run**/**Deploy**).

Code checked directly:
- Sidebar icon names and order, **Git** hidden for sandboxed projects (playground/guest), **Outline** hidden while a screen is open alone, **Router** below the divider, **Enter Fullscreen** web only, **Shortcuts** (Ctrl/⌘ + .): `lib/project/side_bar.dart:13-188`.
- Number shortcuts Ctrl/⌘ + 1..9 map to the icon index list built once from `MainSidebar.getIcons()`: `lib/setup_general_actions.dart:24-61`, `lib/project/panels/panel_actions.dart:12-26`. Numbers in the page assume a normal (non-sandboxed) project with Outline shown.
- Top bar order (logo, sandbox/package chips, breadcrumbs left; Upgrade, avatar, bell, `<>`, gear, Run/Deploy or Save right), avatar menu (**General Settings**, **Logout**), **Upgrade** condition (`showPurchaseUi && free plan or no subscription`): `packages/nowa_ui/lib/top_bar/top_bar_view.dart:48-160,595-700`, `lib/project/top_bar_mapper.dart:100-135`.
- Floating Variables/Details hidden under 600 px board width, Variables closed by default, Details open: `packages/designer/lib/src/designer_setup.dart:166-231`.
- Welcome tour steps and their targets (The Design Board = board area, Create Screen = screen tool, Widget Palette = widget palette tool, AI Agent = assistant icon, Run your app = local play button, Data Sources = Api + Supabase icons, Screens & Components = widgets icon; extended: Git, Project Settings, Themes): `lib/project/onboarding/onboarding_step.dart:57-139`; completion dialog **Explore more features** / **Start building** / **You're all set!**: `lib/project/onboarding/completion_dialog.dart:25-97`.

Left out on purpose:
- **New UX** experimental layout and the **Debug** panel (experimental flag, D2); debug-only panels (Libraries, Trace, ManualTool).
- Context menus, Action History, Save options detail (only the three entries are named), pickers (Ctrl/⌘ + O): belong to other pages (shortcuts reference, files page).
- The in-app **Shortcuts** cheat sheet has wrong entries in 3.12.5 (research); the page only names the sheet and points to the reference page.

Open questions:
- Tooltip shortcut shown on the **Assistant** icon may be Ctrl/⌘ + Shift + F instead of Ctrl/⌘ + 1 (research open question); the page does not quote tooltips for shortcuts.
- In the playground the **Git** icon is absent, so the numbers after **Search** may differ there; the page does not give playground numbers.
- Status bar: the warning and info counts are log counts, not Problems (research); the page says only "counts of errors, warnings and info messages".
- The `<>` code-mode toggle has no tooltip in the code, so the page calls it `<>`.

## docs/get-started/cloud-and-local.md

Research: features-account-projects "Cloud projects vs Local-only projects", "On this device", "Project menu (⋮)", "New project (dialog)", "Project Sync", "Import project", "Clone from GitHub"; features-code-ship "Git panel", "Hybrid approach", "Run on devices and emulators", "Local cache", "Embedded preview", "Share Preview", "Code download", "Project Sync (deploying a local project)".

Code checked directly:
- Deploy hidden for local projects: `lib/project/run/deploy_button.dart:21`.
- "Share preview is not available on local projects" + **Sync to cloud** (`SyncNotice`): `packages/designer/lib/src/play_mode/play_mode.dart:44-55`, `packages/core/lib/src/settings/project_sync_settings.dart:482-545`.
- Code download button only for cloud (local shows "Code"/Open in VS Code): `lib/project/download_code_button.dart:27-37`.
- **On this device** / **LOCAL-ONLY** / "Opted out of the cloud — no Cloud Build, sharing or backups.": `packages/nowa_ui/lib/dashboard/projects_view.dart:495-522`; **Cloud**/**Local** badge only in list rows: `packages/nowa_ui/lib/dashboard/projects_grid.dart:160-178,226-258`.
- Local-only option in New project (**Advanced** → **Local-only project**, "Stored only on this device. No Cloud Build or backups."), footer help "Your project lives in the cloud — run it on simulators and devices anytime.": `lib/dashboard/create_new_project/new_project_dialog.dart:248-285`, `creation_dialog_widgets.dart:38,92,129-136`.
- Delete semantics (Delete erases the folder unless the project sits inside a larger Git repository, then only **Remove**): `lib/dashboard/dashboard_page.dart:253-300`, `packages/core/lib/src/providers/projects_view_provider.dart:278-289`.
- Import project is desktop-only (cloud or local); Clone from GitHub can be cloud or **Local-only**: research `import_project_dialog.dart`, `github_clone_dialog.dart`.

Assumptions / open questions:
- "Download a zip from code mode (depends on your plan)": the code gates it with the `codeDownload` entitlement ("Time to level up"); the plan is not named in code, so the page only says "depends on your plan".
- Git row: both project types need the plan with Git support (`github` entitlement); the page leaves the plan out and relies on the Git page.
- Did not state any claim about offline use (old docs said "offline mode"; not verified in code).
- Badge table lists the seven badges the site component supports (`src/components/Badge/index.js`).

## docs/get-started/desktop-app.md

Research: features-account-projects "Download Desktop App → Download Nowa", "Desktop app (Nowa Desktop)", "Local Setup", "Update prompts and Version out of date", "Dashboard"; features-code-ship "Local Setup / Set up local environment", "Run button and Run on menu". Old page used only for the Flutter-SDK / Xcode flow (`old-docs/local-project-simulator/createlocalproject.md`); every label re-checked in code.

Code checked directly:
- **Download Desktop App** (web only) and the **Download Nowa** dialog (**MacOS**, **Windows**, "Download Nowa version: …", "No download available at the moment"): `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:181-186`, `packages/core/lib/src/dialogs/download_nowa_dialog.dart:7-79`. Installer for macOS is a DMG (`.github/workflows/macos-build.yml:166-217`), Windows has an Inno Setup installer (`installer.iss`); the page only says "open the downloaded installer".
- Desktop access check after sign-in, `/upgrade` page text "Upgrade to unlock desktop version, or use on web at app.nowa.dev" and embedded billing page: `lib/router.dart:76-82`, `lib/upgrade_page.dart:8-71`. The code does not say which plans include desktop access (the code comment says "Has to be paid for the desktop version"; What's New 3.0.1 says "available for all plans"). The page only states the check and links to pricing (D3).
- Update flow strings (**Update to v…**, **Install & Restart**, **Later**, **Skip**, **Or download manually**, **Update failed**…): `lib/dashboard/overlays/update_overlay.dart:116-255`. Required update screen ("Version out of date", **Download**): `lib/update_required_screen.dart:27-70`.
- **Local Setup** tab (**Account Settings** / **Editor Settings** groups; page header "Environment"; **Automatic setup**, **Set up automatically**, **Update Flutter SDK**, "Flutter SDK is outdated", **Flutter SDK Path**, **Default Projects Path**, **VS code Path**, "Invalid Flutter SDK path", help link to the `#setting-up-flutter-sdk` anchor): `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:19-35,130-160`, `packages/core/lib/src/settings/editor_settings/local_setup.dart:63-236`. `isFlutterSdkPath` needs `bin/flutter` (`flutter.bat` on Windows): `packages/core/lib/flutter_tool.dart:15-18`.
- **Browse** button on path fields: `packages/core/lib/src/fields/path_field.dart:131-136`.
- Setup dialog ("Set up local environment", steps **Flutter** / **Verify** / **Android**, "Download the Flutter SDK (~1 GB)…", "Xcode must be installed on macOS before setting up Flutter.", help text for Xcode with link to `#macos-install-xcode`, "Install location" / "about 10 GB. The path must not contain spaces.", consent text, **Install** / **Try again** / **Reinstall** / **Update**, **Re-run checks**, **Skip for now** / **Done**, tool rows **Flutter**, **Android toolchain**, **Android emulator**, status "Ready"): `packages/core/lib/src/environment/environment_setup_dialog.dart:313,396-560,715-730,760-960`, `packages/core/lib/src/environment/tool_check.dart:1-11`.
- Entry points into Local Setup (**Setup flutter SDK** in New project, **Fix** in Clone from GitHub, **Local environment settings** in the **Run** menu): research `new_project_dialog.dart:230-238`, `github_clone_dialog.dart`, `lib/project/run/run_button.dart:134-149`.
- On this device section only renders when at least one local project exists: `packages/nowa_ui/lib/dashboard/projects_view.dart:138-150`.

Anchors kept: `{#setting-up-flutter-sdk}` on "Set up Flutter" (H2) and `{#macos-install-xcode}` on "macOS: install Xcode first" (H3), both used by in-app links (`local_setup.dart:189`, `environment_setup_dialog.dart:470`). The app links to `/local-project-simulator/createlocalproject#...`: the orchestrator must redirect that path to `/get-started/desktop-app` and keep the hash (D13).

Left out / open questions:
- Linux: the code supports local projects on Linux and dev hides a Linux download; no Linux button in 3.12.5, so the page says macOS and Windows only.
- Which plans include desktop access (see above). The old docs' "no premium plan required" was not carried over.
- The old page's quoted Xcode error ("xcode-select: No developer tools were found") is not a string in the product code; not quoted.
- Android toolchain/emulator sizes (~0.7 GB / ~1.5 GB) not stated; only the Flutter (~1 GB) and install location (~10 GB) figures that the dialog shows.

## docs/get-started/playground.md

Research: features-account-projects "Playground (`/playground`)", "Starting-point picker (Playgrounds / Templates)", "Save / Save to keep changes → Save your app", "Public projects opened as a guest"; features-ai "AI Assistant" (playground sign-in gate), "Restore Checkpoint" (not in the playground); features-editor-shell "Settings". Screenshots viewed: `captures/ui-map/01`, `13`, `15`.

Code checked directly:
- Route without auth gate: `lib/router.dart:266-276`; page and storage: `lib/playground/playground_page.dart:9-35`, `packages/core/lib/src/playground/playground_manager.dart:10-67` (stored on each save via `onSave`, cap 3 MB encoded, so very large playgrounds are not kept; `reseed` drops the stored app).
- Starting-point chip (**Playgrounds**: **Starter app** "Routing, theme and a home page", **Simple app** "A single page, no routing", **Empty app** "A blank canvas for the assistant to fill"; **Templates** with "No templates to show"; footer **See all projects** disabled; "Discard this app?" / **Discard** / **Cancel**, only asked when something is stored or changed): `lib/sandbox/sandbox_picker.dart:20-128`, `packages/core/lib/src/playground/playground_starter.dart:8-23`. Templates = first 5 sample apps that have a source project.
- Save button label **Save** (playground never shows "Save to keep changes", because `PlaygroundManager` doesn't override `hasChanges`; guests do): `lib/sandbox/sandbox_save.dart:11-56`, `packages/core/lib/src/project/sandbox_session.dart:26`, `packages/core/lib/src/guest/guest_manager.dart:20`.
- Save flow (sign-in dialog, **Save your app** / "Keep this app in your Nowa account.", workspace chip with **Personal** first, name hint "My awesome app", **Cancel** / **Save**, conversation claimed into the new project, "Could not save the project: …"): `lib/auth/save_prompts.dart:21-233`, `lib/sandbox/sandbox_save.dart:95-131`. Name validation: `validateAppName` (research: `packages/core/lib/src/file_system/naming.dart:176-266`).
- AI needs an account in sandbox sessions: `packages/ai/lib/src/chat_session.dart:257-265`.
- Sandboxed projects hide Git icon, Deployment / Permissions / Git / Project Sync settings, Sharing section, and have no Nowa Run: `lib/project/side_bar.dart:55-61`, `packages/core/lib/src/settings/project_settings.dart:21-31`, `packages/core/lib/src/settings/project_detail_settings.dart:87`, `packages/nowa_run/lib/src/nowa_run_plugin.dart:12`. Guests: public project not owned by you is promoted to guest, anonymous visitors included: `packages/core/lib/src/models/project.dart:148-162`, `packages/core/lib/src/providers/project_provider.dart:962-979`, `lib/router.dart:116-135`.

Open questions:
- **Share preview** in the playground's Play bar is not explicitly gated in code (`packages/designer/lib/src/play_mode/play_mode.dart:46-65`), but the playground project has no backend id, so the link probably doesn't work. The page does not mention it. Needs a test in the product.
- The page says "A guest copy has the same limits as the playground" (`isSandboxed` covers both).
- Whether there is a browser "leave page?" warning for unsaved guest edits was not found in code; the page only says edits are lost when you close the tab.
- Google sign-in from the dialog can leave the page; `returnTo` brings you back to `/playground` and the work is restored from browser storage (comment in `lib/sandbox/sandbox_save.dart:84-93`).

## docs/get-started/mobile.md

Research: features-editor-shell "Mobile layout (phone browsers and the iOS/Android app)"; features-ai "AI chat in the phone browser (mobile layout)"; features-code-ship "Mobile browser Build and Run pages"; positioning.md (Nowa GO is private beta, don't document).

Code checked directly:
- Mobile shell condition: native iOS/Android or web viewport narrower than 840 px (`windowSize.index < expanded.index`, `Breakpoints.expanded = 840`): `packages/nowa_ui/lib/src/globals/responsive_utils.dart:40-68`, `lib/project/project_page.dart:103-107`.
- Top row (back arrow to `/`, `MobileLogStatus` pill = green check or error count, `MobileBuildStatusChip` **Build** / progress chip, **Play**, **More** with **View code** (iOS/Android app only) and **Support**): `lib/project/nowago/mobile_view.dart:19-61,318-366`, `lib/project/nowago/mobile_log_status.dart`, `lib/project/nowago/mobile_build_status.dart:111-190`.
- **Play your app** sheet (**Instant preview** / `SIMULATED`, **Run real app** / `REAL APP` or `LIVE`, texts "A design preview that opens instantly. Great for checking layout and flows.", "…first start can take a minute."): `lib/project/nowago/mobile_view.dart:63-128`. Floating edit button → **Stop** / **Restart** / **Share preview**: `mobile_view.dart:391-466`. **Real app** page (statuses "Starting real app…", "Live — your app is ready", **Launch App**, **Hot Restart**, **Stop**, **Start**, "This may take a minute... Please wait."): `lib/project/nowago/mobile_run_page.dart:62-215`.
- Build page ("Build <project>", tabs **Android** / **iOS** / **Web** reuse the Deployment tabs): `lib/project/nowago/mobile_build_page.dart:59-96`.
- Screens list (**Search project...**, **All** / **Pages** / **Components**, carousel/list toggle, tap = attach/detach, long-press = **Play alone** / **Attach to chat** / **Rename** / **Delete**): `lib/project/panels/widgets_panel/widgets_panel.dart:277-347,418-438`, `lib/project/project_dashboard.dart:49-149`.
- AI pill hints, chips (**Mode**, **Model**, **Attach** → **Image** / **Components**, **Supabase**, **History**, **⋯** → **Custom Instructions** / **New Session**), voice button: `lib/project/nowago/sheet_panel.dart:248-310,360-381`, `lib/project/nowago/sheet_panel/chips.dart:133,339,410,459,521`. The **Model** sheet lists the selectable agents (thinking levels).

Assumptions / open questions:
- One sentence says the iOS and Android app uses the same layout and is in private beta. Source: What's New 3.10.5 ("Nowa GO — our dedicated Android and iOS app is still in private beta"). pages.md asks to mention the iOS/Android app, positioning.md says not to document Nowa GO; I kept it to that one clause. Orchestrator may remove it.
- The credits/usage chip and starter chips of the pill are not described (internal detail, conditional).
- Local projects can't be opened in the phone layout (desktop app only); the page doesn't say so explicitly.
