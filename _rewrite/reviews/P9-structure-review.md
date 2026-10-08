# P9 structure: review log

Verifier: batch "P9 structure" (new text written during the structure fixes, after the pages were verified).
Editor's log: `_rewrite/reviews/phase9-fixes.md`, section "Structure fixes". Source of truth: `/home/user/nowa-master` (v3.12.5).
What changed on a page: `git diff b0b2c98 -- <page>`. Only the structure-fix parts were checked; the rest of each page was verified in its own batch.

## Summary

(Filled in at the end. Items are appended one at a time below, so a stopped run can resume after the last section.)

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
| Web: click **Update** on the **Web** tab | ok | `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:293-299` | `btnName` returns `Update ` (trailing space in code) when `envManager.isLive`; after a failed publish it reads **Republish**, and while publishing **Cancel**. |
| Web: **Redeploy** on the **Web** row of the **Deploy** menu | ok | `lib/project/run/deploy_button.dart:356` | `label: live ? 'Redeploy' : 'Deploy'`. |
| Web: "Your site keeps the same address" | ok | `packages/core/lib/src/web_deploy/web_environment_manager.dart:99-118` | A first publish creates the web environment (`createWebPreview` only when `_environment?.id == null`); later publishes call `deployWebPreview` on the same environment, whose `generatedPreviewUrl` is the row's address. Same sentence as `publish/web.md#update-your-site`. |
| Android: raise **Build number** in **Settings** → **Project Details** | ok | `packages/core/lib/src/settings/project_detail_settings.dart:16, 42, 311` | Page name `Project Details`; the **Build info** group holds **Build version** and **Build number** (whole number, `^\d+$`). |
| Android: build a release again with the same signing key | ok | `packages/core/lib/src/cloud_build_v2/ui/android_signing_key_card.dart:105-112` | The **Signing Key** card says "If you lose this key, you will not be able to release any new updates for your app". The key is saved once and reused by the release workflow (`CM_KEYSTORE`, `codemagic_file.dart:44-50`). |
| Android: upload the new `.aab` in Google Play Console | ok | `packages/core/lib/src/file_system/codemagic_file.dart:54-60` | The release workflow runs `flutter build appbundle --release` and keeps `*.aab`. Same step as `publish/android.md#release-an-update`; the Play Console part is Google's side. |
| Why raising the number is needed | ok | `codemagic_file.dart:54, 110-113` | The step names say "automatic versioning", but the scripts only run `flutter build appbundle --release` and `flutter build ipa --release` with no `--build-number`, so the version comes from the project (`pubspec.yaml`). Nothing bumps it for the user. |
| iOS: raise **Build number** (and **Build version** for a new release), then build again | ok | `project_detail_settings.dart:289, 311`; `codemagic_file.dart:110-113` | Same sentence as `publish/ios.md#build-and-send-to-app-store-connect` (last paragraph). |
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
