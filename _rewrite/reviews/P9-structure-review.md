# P9 structure: review log

Verifier: batch "P9 structure" (new text written during the structure fixes, after the pages were verified).
Editor's log: `_rewrite/reviews/phase9-fixes.md`, section "Structure fixes". Source of truth: `/home/user/nowa-master` (v3.12.5).
What changed on a page: `git diff b0b2c98 -- <page>`. Only the structure-fix parts were checked; the rest of each page was verified in its own batch.

## Summary

- **Pages checked:** 21 (all of items 1-10). Text checked: the structure-fix parts only, as listed in the editor's log.
- **Claims checked:** about 100: 63 rows for the new text on items 1-9 (labels, behavior, anchors, links) and 38 link and one-line description pairs in the 12 Next-steps lists (item 10). Each UI label, gate and behavior was grepped in `/home/user/nowa-master`; the code refs are in the tables.
- **Fixed: 3.** `reference/index.md` and `design/add-widgets.md`: the lead-in of the four widget guides ("A few widgets need more than a drop onto the board. Each has its own guide:") implied that these four were the only widgets with a guide, so it now says "Four guides go deeper on the widgets that need some setup after you drop them on the board:". `test/index.md`: the Next-steps blurb "put your app on the web or in the app stores" overstated **Deploy**, so it now matches the other pages ("put your app on the web, Android and iOS").
- **Removed: 0.** No claim failed against the code, and nothing had to be cut.
- **Links:** every relative link and anchor in the 21 pages resolves (385 links), and so does every link in the other 94 non-legacy pages (1,438 links in all 115). The 21 old headings of `troubleshooting/index.md` are unchanged (headings and bodies compared by script); `{#update-prompts}` and `#this-screen-failed-to-render` still exist; `redirects.js` has no entry into that page. All 21 pages compile as MDX (checked with Docusaurus-style heading-id escaping).
- **Style:** no hype words, emoji, `---` rules, H1s or prices in the 21 pages; headings are sentence case; no page has more than two admonitions (`code/index.md`, `first-app.md` and `assets.md` have two each). The editor's log says "20 existing sections" moved on the troubleshooting page; there were 21 (it counts "Still stuck?"), and all 21 are intact.
- **Open issues:** see the end of this file.

## 1. `docs/troubleshooting/index.md`

Scope: new first section "My app shows an error", the intro pointer, front matter, new Next steps, and the move of the other 21 sections.

### New section "My app shows an error"

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| The red error count sits in the status bar at the bottom of the editor; clicking it opens the **Console** on **Problems** | ok | `lib/status_bar.dart:166-176, 193-201` | The error, warning and info counts share one tap target (`_showConsole(context, true)` = `startIndex: 0`); the red count is `problemService.errorCount`. |
| Console tabs are **Problems** (first) and **Logs** (second) | ok | `packages/core/lib/src/panels/logs_and_errors_panel.dart:11-16` | |
| A row with a **Fix** button has a one-click fix | ok | `packages/core/lib/src/panels/errors_panel.dart:194` | Same sentence as `test/problems.md` ("Read a problem and jump to it"). |
| **Run**; click the last log line in the status bar; **Console** opens on **Logs** | ok | `lib/status_bar.dart:204-214` (`_showConsole(context, false)` = `startIndex: 1`; text is `Ready` when there is no log) | |
| Logs is where the running app prints its errors | ok | `packages/nowa_run/lib/src/nowa_run_manager.dart:288-322` | App console output and log lines are forwarded to the project's `LoggerProvider`; a message with `code == 1` is typed `LogType.error`. |
| An error screen can offer **Fix with AI**; it puts the error log in the chat | ok | `packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:12-32, 88-104`, `packages/core/lib/src/widgets/fix_with_ai_button.dart:31-43` | The prompt holds the compiler output and recent app logs. It is sent at once, or left in the chat field when the chat is busy (the nuance is on `test/run.md`). Kept as written. |
| Switch to **Agent** mode and ask: "Why does the app show an error when I tap Sign in? Check the logs and fix it." | ok | `packages/ai/lib/src/agent/local_agent.dart:18, 243-245, 271`; chips from `_rewrite/glossary.md` | Prompt text is the one verified on `test/run.md` (tip under "Read the logs"). |
| The agent can read your app's logs once you have run the app | ok | `packages/ai/lib/src/tools/analyze_tool.dart:38-58` | `read_logs`: "Logs exist only after the user has run the app in the simulator or built-in previewer; empty otherwise." Also in the Plan agent (`planning_agent.dart:48, 103`). |
| A widget shown as a placeholder means Nowa couldn't read its code | ok | `packages/designer/lib/src/details/widget_details.dart:531-556` | "Explains a placeholder: the class could not be loaded". |
| Links: `../test/problems.md`, `../test/run.md#read-the-logs`, `#a-widget-shows-as-a-placeholder-or-problems-says-could-not-be-loaded`, `../code/limitations.md`, `#the-preview-wont-start` | ok | | All resolve (checked with a script: file exists and the heading slug or `{#id}` exists). |

### Moved sections, anchors and inbound links

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| The 21 sections that existed at `b0b2c98` keep their headings and bodies word for word | ok | `git show b0b2c98:docs/troubleshooting/index.md` vs now | Compared heading by heading with a script: 0 missing, 0 changed. Only "My app shows an error" and "Next steps" are new. |
| `{#update-prompts}` is still on "A new version of Nowa is available" | ok | | `docs/account/index.md:41` links to it. |
| `#this-screen-failed-to-render` still exists | ok | | `docs/test/problems.md:97` links to it. |
| Other inbound links (no anchor): `account/help.md:71`, `account/index.md:59`, `test/problems.md:103`, `test/index.md:51`, `guides/ship-tips.md:76`, `docs/index.md:93` (`/troubleshooting`), `sidebars.js:182` | ok | | All target the page itself, which exists. |
| `redirects.js` | ok | | No entry points at `/troubleshooting` or its anchors. The two entries into this folder target `/troubleshooting/known-issues` and `...#firebase-on-windows`; `known-issues.md:11` has `{#firebase-on-windows}`. |
| The app opens no troubleshooting URL | ok | `grep docs.nowa.dev` over `/home/user/nowa-master` | The 44 app URLs (D13) do not include this folder. |

### Intro, front matter, Next steps

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Intro pointer, description and keywords mention the app-error path | ok | | Keywords are search terms; `Fix with AI`, `Problems`, `logs` are real labels. |
| Next steps: Find and fix problems ("check your project for errors"), Run your app ("compile the real app and read its logs"), Known issues ("limits that depend on where you run Nowa") | ok | | Each matches the target's intro (`test/problems.md`, `test/run.md` "Read the logs", `known-issues.md` intro). |
| Style: no H1, no `---` rules, no emoji, sentence-case headings, no admonitions | ok | | |

Open point for item 1: the page is about 1,620 words (the new section is about 250 of them). It holds 23 independent symptom sections that readers reach by heading, and splitting it would need new files and sidebar changes, which are outside this batch. Left as is.

## 2. `docs/publish/index.md`: "Ship an update" and Next steps

Only the new H2 "Ship an update" and the new Next steps bullet were checked. The "publish checklist" paragraph in "Check your app details" came from another agent (guides batch) and was not touched.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Web: click **Update** on the **Web** tab | ok | `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:294-299` | `btnName` returns `Update ` (trailing space in code) when `envManager.isLive`; after a failed publish it reads **Republish**, and while publishing **Cancel**. |
| Web: **Redeploy** on the **Web** row of the **Deploy** menu | ok | `lib/project/run/deploy_button.dart:356` | `label: live ? 'Redeploy' : 'Deploy'`. |
| Web: "Your site keeps the same address" | ok | `packages/core/lib/src/web_deploy/web_environment_manager.dart:99-118` | A first publish creates the web environment (`createWebPreview` only when `_environment?.id == null`); later publishes call `deployWebPreview` on the same environment, whose `generatedPreviewUrl` is the row's address. Same sentence as `publish/web.md#update-your-site`. |
| Android: raise **Build number** in **Settings** → **Project Details** | ok | `packages/core/lib/src/settings/project_detail_settings.dart:16, 42, 311` | Page name `Project Details`; the **Build info** group holds **Build version** and **Build number** (whole number, `^\d+$`). |
| Android: build a release again with the same signing key | ok | `packages/core/lib/src/cloud_build_v2/ui/android_signing_key_card.dart:105-112` | The **Signing Key** card says "If you lose this key, you will not be able to release any new updates for your app". The key is saved once and reused by the release workflow (`CM_KEYSTORE`, `codemagic_file.dart:48-49`). |
| Android: upload the new `.aab` in Google Play Console | ok | `packages/core/lib/src/file_system/codemagic_file.dart:54-60` | The release workflow runs `flutter build appbundle --release` and keeps `*.aab`. Same step as `publish/android.md#release-an-update`; the Play Console part is Google's side. |
| Why raising the number is needed | ok | `packages/core/lib/src/file_system/codemagic_file.dart:52-54, 111-113`; `packages/core/lib/src/settings/pubspec_manager.dart:60-63` | The two build steps are named "... and automatic versioning", but the scripts only run `flutter build appbundle --release` and `flutter build ipa --release` with no `--build-number` or `--build-name`. The version comes from `pubspec.yaml`, where **Build version** and **Build number** are saved as `version: <name>+<number>`. Nothing bumps it for the user. |
| iOS: raise **Build number** (and **Build version** for a new release), then build again | ok | `project_detail_settings.dart:289, 311`; `codemagic_file.dart:111-113` | Same sentence as `publish/ios.md#build-and-send-to-app-store-connect` (last paragraph). |
| Links `./web.md#update-your-site`, `./android.md#release-an-update`, `./ios.md#build-and-send-to-app-store-connect` | ok | | All three headings exist. |
| Next steps: "Build a great app" ("a complete walkthrough and tips for design, Nowa AI, data and shipping") | ok | | `guides/index.md`: habits, checklist and five guides (complete app, AI, design, data and state, ship). |
| Style: table with three rows, no new admonition, no prices or limits | ok | | |

## 3. `docs/code/index.md`: developer tip, table rows, Next steps

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Tip "Already a Flutter developer?": install the desktop app, set up Flutter, import your folder as a local-only project, open it in VS Code, keep its history with Git | ok | `packages/nowa_ui/lib/dashboard/projects_view.dart:325-336` (**Import project** only `if (NPlatform.isDesktop)`); `lib/dashboard/create_new_project/import_project_dialog.dart:242-256`, `creation_dialog_widgets.dart:92, 129` (**Advanced** → **Local-only project**) | Each step is the page that covers it: `get-started/desktop-app.md`, `code/import.md`, `code/vs-code.md`, `code/git.md`. The new tip is the first of two admonitions on the page (the old closing tip is the second), not stacked. |
| Link `../get-started/desktop-app.md#setting-up-flutter-sdk` | ok | | `{#setting-up-flutter-sdk}` is on "Set up Flutter". |
| Import row: "Bring in an app you already have, from a folder or from GitHub" | ok | | `import.md` covers **Import project** and **Clone from GitHub**. |
| Row "Work with local projects": "Keep your app in a Flutter folder on your computer, link it to the cloud and find it again if it goes missing" | ok | | Matches `local-projects.md` (description; sections "Link a cloud copy with Project Sync" and "Fix "Project not found""). |
| Row "Use Nowa with VS Code": "Open the same folder in Nowa and VS Code at once and see every save in both" | ok | | Matches the `vs-code.md` description. |
| Next steps: desktop app ("set up Flutter so you can use local projects"), Download your code ("take the full Flutter source with you"), Get ready to publish ("put your app on the web, Android and iOS") | ok | | Each matches the target's description or intro (`desktop-app.md`, `publish/download-code.md`, `publish/index.md`). |
| Links, front matter, style | ok | | All links resolve; no new H1, no `---` rules, no prices. |

## 4. `docs/code/import.md`: "Before you start"

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| To import a folder, install the desktop app; **Import project** isn't in the web app | ok | `packages/nowa_ui/lib/dashboard/projects_view.dart:331-335`; `packages/nowa_runtime/lib/src/nowa_platform.dart:21` | The menu entry is built only when `NPlatform.isDesktop` (macOS, Windows or Linux build; never web). Matches the table row "Desktop app only". |
| To keep the project on your computer, set up Flutter first; local projects need the Flutter SDK, for example to run your app | ok | `packages/core/lib/flutter_tool.dart:34-39` ("Flutter SDK path is not set..."); `packages/core/lib/src/interpreter/packages/local/package_resolver_service_local.dart:118`; `packages/nowa_run/lib/src/services/local/nowa_run_service_local.dart:15` | Local runs, the code check and package resolving all go through `FlutterTool`. Same statement as `desktop-app.md` ("Local projects, and running your app on devices and emulators, need the Flutter SDK") and `local-projects.md` "Before you start". |
| Link `../get-started/desktop-app.md#setting-up-flutter-sdk` and `../get-started/desktop-app.md` | ok | | Anchor `{#setting-up-flutter-sdk}` exists. |
| Style: new H2 sits before "Choose how to bring it in"; the later "Before you start:" in the GitHub section is a paragraph, not a heading, so no duplicate anchor | ok | | The page is 1,240 words, mostly the unchanged reference sections; the new list adds about 60. |

## 5. `docs/reference/index.md` (whole page)

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Table rows: Widget catalog ("every built-in widget in the picker, what it does and what it needs"), Wrappers ("widgets that go around another widget to add space, a tap, a fade or scrolling"), Keyboard shortcuts ("the editor's keys and mouse gestures, for Windows, Linux and macOS"), Glossary ("the words Nowa uses, in plain language, and where to learn more") | ok | | Each one-liner matches the target's intro and description (`widgets/index.md`, `wrappers.md`, `shortcuts.md`, `glossary.md`). Those pages were verified in W12, W13 and W18. |
| Four widget guides: lists and grids, text fields and forms, navigation bars and screen parts, images/video/web content | ok | | `widgets/lists.md`, `forms.md`, `navigation.md`, `media.md` exist and are the four children of the catalog in `sidebars.js:193-198`. One-liners match their intros. The link text "Images, video and web content" is the page's `sidebar_label` (title: "Images, video, animations and web content"). |
| Lead-in "A few widgets need more than a drop onto the board. Each has its own guide:" | fixed | | It read as if these four were the only widgets with a guide, but Data Builder, Google Maps, AdMob Banner and RevenueCat Paywall have guides under Integrations (linked from `widgets/index.md` rows). Now: "Four guides go deeper on the widgets that need some setup after you drop them on the board:". |
| Next steps: Add widgets ("put what you looked up on a screen"), Tour the editor ("find your way around"), Build a great app | ok | | `design/add-widgets.md`, `get-started/editor-tour.md` (description: "Find your way around the Nowa editor"), `guides/index.md`. |
| Front matter (title, description, sidebar_label "Overview", keywords), no H1, no admonitions, no prices | ok | | `sidebars.js:188` uses `reference/index` as the category link. About 230 words. |

## 6. `docs/design/add-widgets.md`: "Set up lists, forms, navigation bars and media"

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Lead-in "A few widgets need more than a drop onto the board. Each has its own guide:" | fixed | | Same wording problem as on `reference/index.md` (reads as an exhaustive list; integration widgets have guides too). Now "Four guides go deeper on the widgets that need some setup after you drop them on the board:". |
| Four bullets: Lists and grids, Text fields and forms, Navigation bars and screen parts, Images, video and web content, with one-liners | ok | | Targets `../reference/widgets/{lists,forms,navigation,media}.md` exist; one-liners match their intros (same four as on `reference/index.md`). Link text for the last one is the target's `sidebar_label`. |
| Heading "Set up lists, forms, navigation bars and media": sentence case, no explicit id needed | ok | | No page links to its auto anchor. |
| Rest of the page | not in scope | | Not changed by the structure fixes. One admonition (`:::tip Or ask Nowa AI`), so the two-admonition limit holds. |

## 7. `docs/design/index.md`: "Set up common widgets" and "What's in this section"

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| New group "Set up common widgets" with the four guides and the Widget catalog ("every built-in widget and what it needs") | ok | | One-liners identical to the ones checked on `reference/index.md`; catalog line matches `widgets/index.md` ("lists every one, what it does and what it needs"). All five targets exist. |
| "Where to go next" renamed "What's in this section" | ok | | No page, `sidebars.js`, `redirects.js` or `src/` file links to the old auto anchor `#where-to-go-next`. |
| Next steps: How logic works ("make your design react to taps, remember values and move between screens"), Build a great app | ok | | `logic/index.md` covers events (tap), variables (remember a value) and "Navigate between screens: send people to another screen". |
| The other groups ("Set up the board and its parts", "Build a screen", "Style your app") | not in scope | | Unchanged. Spot check: every link in them resolves (script run over the whole page). |

## 8. `docs/get-started/welcome.md`: "How building works", "Developers and teams", Key terms, Next steps

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| "How building works" has 9 steps in a sensible order; steps 1-3 and the old Play, Run and Publish text are unchanged apart from renumbering | ok | | 1 Describe, 2 Watch it build, 3 Refine visually, 4 Add logic, 5 Connect data and sign-in, 6 Play, 7 Run, 8 Publish, 9 Update. Link texts match the sidebar categories (`sidebars.js`: "Design your app", "Add logic", "Connect data and services", "Preview and test") or the page title ("Get ready to publish"). |
| Step 4: "Make your app react to taps, remember values and move between screens. In Agent mode, Nowa AI can build it for you." | ok | `packages/ai/lib/src/agent/local_agent.dart:5-27` (Agent mode tool set) | Matches `logic/index.md` (intro, the **Agent** mode tip and "Navigate between screens"). Step 2 already says "In Agent mode it also writes the logic". |
| Step 5: "Save data in a database and let people sign in with Supabase or Firebase, or call a REST API." | ok | `packages/data/lib/src/supabase/supabase_manager.dart:228-240` (`signIn`, `signUp`, `signOut` in the generated `SupabaseService`); `packages/data/lib/src/firebase/setup/views/auth_management_view.dart:20-60` (**Available Providers**: Email/Password, Google, Phone) | Matches `integrations/index.md` ("Choose a backend", "Add sign-in"): Supabase and Firebase for database and sign-in, REST API as a third backend. Link text "Connect data and services" is the page title. |
| Step 9: "Change your app, then publish it again. See Ship an update" | ok | | `publish/index.md#ship-an-update` exists (item 2). |
| "Developers and teams": Git, packages, custom code, workspaces, import as a local project in the desktop app, VS Code on the same folder | ok | | Links go to `code/git.md`, `code/packages.md`, `code/custom-code.md`, `account/workspaces.md`, `code/import.md`, `code/local-projects.md`, `code/vs-code.md`. **Import project** is desktop-only (`projects_view.dart:331-335`) and can open the folder in place as a local project (`import_project_dialog.dart:242-256`). |
| Key terms: "More terms are in the glossary" | ok | | `reference/glossary.md` exists. |
| Next steps: Create your account ("sign up and sign in"), Build your first app ("describe an app and run it"), Build with Nowa AI ("modes, prompts, context and checkpoints"), Build a complete app ("follow one app from idea to published") | ok | | `ai/index.md` mentions modes (line 55), context (59), **Restore Checkpoint** (62) and prompts (83). The other three match their descriptions. |
| Length, style, prices | ok | | About 770 words. No prices; the existing pricing link stays. |

## 9. `docs/get-started/first-app.md`: step 5 sentence and Next steps

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Step 5: "To keep data in a database and let people sign in, connect a backend: see Connect data and services" | ok | | Follows the existing sentence that Design mode uses demo data. `integrations/index.md` covers the database (Supabase, Firestore) and sign-in under "Choose a backend" and "Add sign-in". |
| Next steps: Build a complete app, How logic works ("make your app react to taps, remember values and move between screens"), Connect data and services ("save data in a database and add sign-in"), Get ready to publish ("put your app on the web, Android and iOS") | ok | | Each matches the target's description or intro. Four links, as the editor intended. |
| Length | ok | | About 1,360 words, inside the ~1,400 allowed for tutorials. |

## 10. Next-steps lists on 12 pages (link targets and one-line descriptions only)

Every link in these lists resolves (file exists; no anchors are used). Each description was compared with the target's front matter and first paragraph.

| Page | Link and description | Verdict | Note |
|---|---|---|---|
| `get-started/cloud-and-local.md` | Install the desktop app ("set up Flutter so you can use local projects"); Work with local projects ("create one, link it to the cloud and find it again if it goes missing"); Create and manage projects ("start, find and move your projects") | ok | Match the descriptions of `desktop-app.md`, `code/local-projects.md`, `account/projects.md`. |
| `design/boards.md` | Create and set up screens ("add a screen and choose your home screen"); Add widgets ("fill a screen with the widget picker"); Play your app on the board ("tap through a screen without leaving the editor") | ok | |
| `design/screens.md` | Add widgets; Navigation bars and screen parts ("set up the app bar, drawer, floating button and bottom navigation bar"); Build reusable components ("turn part of a screen into a widget you can reuse"); Navigate between screens ("open one screen from another") | ok | `components.md` says "Turn any widget into a component". `logic/navigation.md` still has this title after the routes split. |
| `design/components.md` | Pass data with parameters ("give a screen or component values from outside"); Add widgets ("drop your components in from the widget picker"); Lists and grids ("repeat one item design for every entry in a list") | ok | The picker lists **Components** (`add-widgets.md` step 2). |
| `design/select-and-edit.md` | Change widget properties ("edit what you selected in **Details**"); Lay out widgets ("rows, columns, stacks and sizes"); Use the Outline ("select any widget from the widget tree") | ok | |
| `logic/index.md` | Connect data and services ("need data from a server, or sign-in?"); Preview and test ("try your app at every step"); Find and fix problems ("something not working?"); Build a great app (guides blurb) | ok | |
| `integrations/index.md` | Preview and test; Get ready to publish ("put your app on the web, Android and iOS"); Build a complete app ("follow one app from idea to published") | ok | |
| `test/index.md` | Get ready to publish ("put your app on the web or in the app stores"); Troubleshooting ("fix an app error, or find the message Nowa shows"); Build a great app | fixed | "in the app stores" overstated what **Deploy** does: Nowa uploads the iOS build to App Store Connect and gives you an `.aab` to upload to Google Play yourself (`publish/index.md`, `android.md`, `ios.md`). Now "put your app on the web, Android and iOS", as on the other pages. |
| `account/index.md` | Build your first app ("describe an app in the dashboard's prompt box"); Get ready to publish ("set your app's name, identifier and icon, then deploy it"); Troubleshooting ("having trouble right now? Start here") | ok | `publish/index.md` "Check your app details" lists **App Name**, **Bundle Identifier**, **App Icon**; the Troubleshooting page now opens with "My app shows an error". |
| `troubleshooting/known-issues.md` | Troubleshooting ("find a fix by the message you see"); Get help ("chat with the Nowa team, report an issue or find the community") | ok | `account/help.md` description covers chat, reporting an issue and the community. |
| `reference/glossary.md` | Tour the editor ("find your way around the panels and the board"); Build your first app ("put the words to work"); Widget catalog ("every built-in widget") | ok | |
| `design/assets.md` | Images, video and web content ("show your files with the right widget"); Change widget properties; Fonts and icons; Manage project files | ok | `reference/widgets/media.md`: widgets take "a file from your project's assets". The other three bullets have no description and exist. |

## Open issues

1. **Length of `troubleshooting/index.md`.** About 1,620 words, over the ~1,200 guideline. The new "My app shows an error" section is about 250 of them; the other 21 sections are independent symptoms that readers reach by heading. Splitting it needs new files and a sidebar change, so it was left for the lead.
2. **"Fix with AI" wording.** Step 3 of "My app shows an error" says Nowa AI "gets the error log in the chat". In code the button writes the prompt (compiler output and recent app logs) into the chat field and sends it unless the chat is busy, in which case it waits for you to send it (`fix_with_ai_button.dart:31-43`). The short form is true in the normal case, and `test/run.md` ("Fix a preview that won't start") has the exact behavior. Kept as written.
3. **Google's side of the Android row.** "upload the new `.aab` in Google Play Console" is not something Nowa's code shows. It repeats the verified step in `publish/android.md#release-an-update`, and the code only shows that the release workflow produces the `.aab` (`codemagic_file.dart:54-60`).
4. **Version fields.** The Android and iOS build steps are named "automatic versioning" (`codemagic_file.dart:52, 111`), but the scripts never set a build number, so the project's **Build number** (saved in `pubspec.yaml`) is what the stores see. If a later release makes Nowa bump it, the Android and iOS rows of "Ship an update" and the last paragraph of `publish/ios.md#build-and-send-to-app-store-connect` need a second look.
5. **Concurrent edits.** Other agents were editing `design/screens.md`, `design/components.md`, `logic/index.md`, `integrations/index.md`, `test/index.md` and `publish/index.md` while this batch ran. Only the structure-fix parts were checked; the routes link in `design/screens.md`, the guide line in `design/components.md`, the **Route** row in `logic/index.md`, the sign-in section of `integrations/index.md` and the "publish checklist" line in `publish/index.md` belong to other batches.
