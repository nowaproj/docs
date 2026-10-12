# P9 recipes review

Verifier run, 2026-10-07. Batch "P9 recipes": text added after the pages were verified (items 1 to 7 of the assignment). Source of truth: `/home/user/nowa-master` (v3.12.5). Writer refs: `reviews/phase9-fixes.md` ("Recipes and clarifications", parts 1 to 3) and `reviews/W20-writer-notes.md` (tasks 3, 4, 5). Only the added or changed parts were checked (`git diff b0b2c98 -- <page>`).

Summary:
- Pages checked: 17 (all of the batch): `reference/widgets/lists.md`, `integrations/show-data.md`, `integrations/supabase/database.md`, `ai/prompting.md`, `publish/builds.md`, `publish/android.md`, `publish/ios.md`, `publish/web.md`, `test/devices.md`, `design/themes.md`, `test/index.md`, `design/theme-styles.md`, `logic/global-state.md`, `design/components.md`, `design/templates.md`, `integrations/constants.md`, `publish/index.md`.
- Claims checked: 65 (item 1: 5, item 2: 18, item 3: 10, item 4: 7, item 5: 9, item 6: 7, item 7: 9). Fixed: 4. Removed: 0.
- Pages edited: `test/devices.md` (1 clause) and `test/index.md` (3 small edits). The other 15 pages needed no change.
- Fixes: (1) `test/index.md`, **Run** row said the real app shows "on a device" with no gate; now "or on a device in the desktop app" (devices are desktop-only, `run_button.dart:547, 633-647`). (2) `test/index.md`, **Share preview** row lacked the cloud-only gate (a local project gets a sync notice, `play_mode.dart:46-57`); added "Cloud projects only." (3) `test/index.md`, phone paragraph said **Run real app** is marked **REAL APP**; the badge turns **LIVE** once the app runs (`mobile_view.dart:118`); added it. (4) `test/devices.md`, **Open on Mobile** is a QR icon whose label is a tooltip; the step now says "(the QR icon)".
- Open issues: (a) Play Console Help (`support.google.com`) and `appstoreconnect.apple.com` are blocked here, so the generic Play Console steps ("Create your app there", "Add the `.aab` to a release") are kept only because they carry no button names or store rules, and the new App Store Connect link was not opened. (b) "Starting a build commits all your changes" is the product's own UI message (`workflow_details_page.dart:464`); the commit itself is not visible in client code (the client only posts the workflow id and branch). (c) `integrations/supabase/database.md` (1,230 words) and `design/themes.md` (1,202) sit at or just over the 1,200-word guideline; left as they are. (d) Everything was checked against code and Google's and Apple's pages; nothing was run in the product.

## Item 1. Pointers to the list-to-detail recipe

Pages: `docs/reference/widgets/lists.md`, `docs/integrations/show-data.md`, `docs/integrations/supabase/database.md`, `docs/ai/prompting.md`. Target: `docs/logic/navigation.md`, H2 "Open a detail screen when a list item is tapped" with `{#open-a-detail-screen}` (line 79).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| lists.md (end of "Fill a list from your data"): "To open a screen when someone taps an item, see [Open a detail screen when a list item is tapped](../../logic/navigation.md#open-a-detail-screen)." | ok | recipe heading text matches; anchor `{#open-a-detail-screen}` at `navigation.md:79` | Relative path resolves to `docs/logic/navigation.md`. The sentence only says where to go. |
| show-data.md (end of "Show a list"): "To open a detail screen when someone taps a row, see ..." | ok | same anchor | Path `../logic/navigation.md` resolves. |
| database.md (end of "Show the results in your app"): "load that row with **Get Record by ID**" | ok | template name `Get Record by ID` (`getById`, "Fetch a single record by its ID"): `packages/data/lib/src/supabase/templates/supabase_template_definitions.dart:31-37`; the recipe's step 4 uses the function made from that template | Label is also in the page's own table (line 30). |
| prompting.md: new row "Open a detail screen", mode **Agent**, prompt "When I tap a product in the list, open a detail screen that shows its name, photo and price." | ok | Design mode's toolset has no Supabase or API vertical ("the designer must not be able to wire data even by accident"): `packages/ai/lib/src/agent/designer_agent.dart:7, 35-37`; the recipe says "ask in **Agent** mode" (`navigation.md:93`) | **Agent** is the safe mode for a screen that loads a row. The row's link target resolves. The page keeps its other rows unchanged. |
| Style: no emoji, no hype words, no `---`, headings unchanged | ok | n/a | Front matter of the four pages unchanged. |

Item 1: 5 rows, 0 fixed, 0 removed.

## Item 2. Publishing

Pages: `docs/publish/builds.md`, `docs/publish/android.md`, `docs/publish/ios.md`, `docs/publish/web.md`. Diffs read with `git diff b0b2c98 -- <page>`. External pages: fetched on 2026-10-07 with WebFetch where the host was reachable (list at the end of this item).

### builds.md (new paragraph under "Start a build")

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| "A branch is a named line of saved versions of your project, kept with Git." | ok | branches are Git branches: `gitManager.repo.localBranches`, `packages/core/lib/src/cloud_build_v2/ui/workflow_details_page.dart:346` | Plain-words definition, not a UI claim. |
| "The build starts from the branch you pick" | ok | `manager.startBuild(branch: selectedBranch!.name)` at `workflow_details_page.dart:369`; request field "The branch to build": `packages/core/lib/src/cloud_build_v2/models/api_models.dart:9-13` | |
| "starting it commits all your changes to that branch" | ok | the UI's own text "Starting a build will commit all changes to the selected branch.": `workflow_details_page.dart:464` | Restates the product message. The client only posts `workflowId` and `branch` (`cloud_build_service_impl.dart:12-15`), so the commit itself is not visible in client code. The page words it as the UI does and adds nothing more. |
| "Leave the default, the branch you have checked out" | ok | `selectedBranch = gitManager.repo.checkedOut`: `workflow_details_page.dart:354`; the **Deploy** menu uses `checkedOut?.name ?? 'main'`: `lib/project/run/deploy_button.dart:178` | |
| Link `../code/git.md#work-with-branches` | ok | `docs/code/git.md:62` ("## Work with branches": switch and **New Branch**) | The target covers "create or switch". |

### android.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| "Test on a device" step 3 and "Build a release" step 2: leave the default branch; links `./builds.md#start-a-build` | ok | same as above; anchor `builds.md:12` | Both anchors resolve. |
| "Nowa doesn't upload to Google Play for you." | ok | `packages/core/lib/src/file_system/codemagic_file.dart` has no Google Play publishing key (the only `publishing:` block is `app_store_connect`, lines 120-124) | Unchanged sentence, re-checked. |
| Upload step 1 "Create your app there." and step 3 "Add the `.aab` to a release and publish it." | ok, with a limit | no Nowa code (store side) | Wording carried over from the sentence verified before (W8). Generic: no Play Console button names, no store rules. Google's Play Console Help (`support.google.com`) is blocked here (egress proxy), so the order and the word "release" could not be checked against it. |
| Step 2 "listing details and promotional materials ... screenshots, videos, graphics and text, and details such as the category and content rating" | ok | Google, "Publish your app", section "Release your apps on Google Play": "promotional materials ... such as screenshots, videos, graphics, and promotional text"; "listing details such as the app type, category, and content rating" (fetched) | Page says "app type" too; the docs drop it ("such as"). Fine. |
| "Once it passes Google's review, your app is live." | ok | same page: "Once it has passed Google Play review, your app will be live and available for download around the world." | Sentence follows the **Publish** step in Google's order. |
| [Export as image](../design/select-and-edit.md#export-as-image) "saves a screen from your board as a PNG or JPG" | ok | `packages/designer/lib/src/widgets/export_image_dialog.dart:18-19` (`PNG`, `JPG`); menu item `Export as image...`: `packages/designer/lib/src/menus/widget_context_menu.dart:29, 113` | Anchor at `select-and-edit.md:88`. |

### ios.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| "Build and send" step 1: leave the default branch; link `./builds.md#start-a-build` | ok | as above | |
| "By default, Nowa's part ends at the upload. [After the upload](#after-the-upload) ..." | ok | the workflow's `publishing:` block holds only `app_store_connect` (`api_key`, `key_id`, `issuer_id`): `codemagic_file.dart:120-124`; no TestFlight or review-submission keys | Anchor `#after-the-upload` resolves (`ios.md:70`). |
| After the upload, step 1: Apple processes the build, it appears in App Store Connect when done, Apple emails you | ok | Apple, "Upload builds": "the build needs to be processed in Apple's system before it appears in App Store Connect. You'll receive an email when this process is complete." (fetched) | |
| Step 2: "To try the app with testers first, use TestFlight." | ok | Apple, "TestFlight overview": "TestFlight lets you distribute beta builds of your app, manage beta testers, and collect feedback." (fetched) | |
| Step 3: fill in the information Apple requires, choose the build for your app version, submit for review | ok | Apple, "Submit an app": prerequisites "Provide required metadata" and "Choose a build", then **Add for Review** and **Submit for Review**; "Required, localizable, and editable properties": "the app and version properties required for App Store submission" (both fetched) | No Apple button names or rules in the docs text, only the plain steps. |
| Links to the four Apple pages and App Store Connect Help | ok | the four `developer.apple.com/help/app-store-connect/...` URLs returned content | `https://appstoreconnect.apple.com/` (new link) could not be fetched: the host is blocked here. It is Apple's standard address; kept. |

### web.md

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| "Custom domains need a higher plan: see [pricing](https://nowa.dev/pricing) for what each plan includes. Without one, **Custom Domain** shows **Premium**." | ok | gate `EntitlementKeys.webPreviewCustomDomain`; without it the **Custom Domain** field shows a `PremiumButton` with "Custom domains are available on higher plans. Upgrade to use your own domain.": `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:39-49` | The link follows D3 (no prices, no limits). The **Premium** label was verified earlier (01645fb). |

Checks on the rest: the diffs contain no emoji, hype words, `---` rules or new admonitions; front matter is unchanged apart from the `sidebar_label` edits of the structure editor (not mine); relative links and anchors touched (`builds.md#start-a-build`, `git.md#work-with-branches`, `select-and-edit.md#export-as-image`, `#after-the-upload`) all resolve.

External pages: fetched OK, `developer.android.com/studio/publish`, and the Apple pages `.../manage-builds/upload-builds`, `.../test-a-beta-version/testflight-overview`, `.../manage-submissions-to-app-review/submit-an-app`, `.../reference/app-information/required-localizable-and-editable-properties`. Blocked here (egress proxy): `support.google.com` (Play Console Help, an existing link) and `appstoreconnect.apple.com`. `developer.android.com/distribute/googleplay` redirects to a marketing page (`play.google.com/about/howplayworks/`) and was not used.

Item 2: 18 rows (builds 5, android 6, ios 6, web 1), 0 fixed, 0 removed. Edits made to the four pages: none.

## Item 3. `docs/test/devices.md`, new H2 "No desktop app?"

Diff: `git diff b0b2c98 -- docs/test/devices.md` (one clause in the first "Before you start" bullet, the new H2, nothing else).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Bullet: "No desktop app? See [No desktop app?](#no-desktop-app)." | ok | n/a | Anchor is the auto slug of the new H2; resolves. |
| "You can still see your real app on a phone from the web app." | ok | **Embedded preview** "works for every project": `lib/project/run/run_button.dart:19`; in the web editor the menu has only **Embedded preview** and **iOS & Android devices** / "Download the desktop app": `run_button.dart:547, 609, 633-647` | The web app has cloud projects only. |
| Step 1: click **Run**; the **Embedded preview** compiles the app and shows it in a phone frame; link `run.md` | ok | row label `Embedded preview`: `run_button.dart:609`; steps and "phone frame" as on the verified `test/run.md` ("Run your app" step 1) | `run.md` is in the same folder. |
| Step 2: when the app is running, click **Open on Mobile** in the top bar; a **Scan the QR** code drops down | fixed (clarity) | label `Open on Mobile` for cloud runs and enabled once the run is ready (`canOpen: state.ready`): `lib/project/top_bar_mapper.dart:127-146`; the control is a QR icon button (`Icons.qr_code_rounded`) with that tooltip, a `MenuAnchor` that drops the panel down: `packages/nowa_ui/lib/top_bar/top_bar_view.dart:833-866`; popup title "Scan the QR": `packages/nowa_run/lib/src/ui/nowa_run_play_tools.dart:9-90`; panel wired in `lib/project/top_bar.dart:334` | Label and behavior were right. The button is an icon with a tooltip, so the step now reads "**Open on Mobile** (the QR icon)", the wording `get-started/first-app.md:88` already uses. |
| Step 3: scan the code with the phone's camera to open the running app on the phone | ok | the code encodes `manager.previewUrl`: `nowa_run_play_tools.dart:19-20, 50-52` | Same sentence as `test/run.md` (toolbar table, **Open on Mobile** row). |
| "The preview runs your app as a web app." | ok | `test/run.md` "Fix a preview that won't start" (verified): "The preview runs your app as a web app" | |
| "test a debug build on Android" links `../publish/android.md#test-on-a-device` | ok | heading "Test on a device" at `android.md:18`; the debug build gives an `.apk` to install (steps 3 and 4 there) | |
| "send an iOS build to App Store Connect ... and test it with TestFlight" links `../publish/ios.md` | ok | ios.md "After the upload" step 2 (TestFlight; Apple's TestFlight overview fetched, see Item 2); the build ends at the upload: `codemagic_file.dart:120-124` | Link goes to the page top; fine. |
| "Both need a cloud project on a paid plan." | ok | Android debug and store deploys are gated by the same entitlement: `androidDebugLocked` and `deployLocked` are both `!hasGrantSync(EntitlementKeys.cloudBuilds)`, `lib/project/run/deploy_button.dart:60-61`; stated the same way in `publish/android.md:14` and `publish/ios.md:14` | No plan names, prices or limits (D3). |
| Rest: front matter unchanged, no H1, no emoji or hype words, no new admonition, 832 words | ok | n/a | All links in the new text resolve (`run.md`, `android.md#test-on-a-device`, `ios.md`). |

Item 3: 10 rows, 1 fixed (clarity), 0 removed.

## Item 4. `docs/design/themes.md`

Diff: `git diff b0b2c98 -- docs/design/themes.md` (intro wording, one guide-link line, new H2 "Widgets that keep their own color" before "Edit theme extensions").

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Intro: "Change a color once in the **Themes** panel and every widget that uses it follows, live on the board." | ok | linked colors resolve through the theme: `StyleHelper.actualValue` reads the applied theme's `colorScheme`: `packages/core/lib/src/fields/style_fields/style_fields.dart:42-60` | More precise than the old "your whole app follows". |
| "Set your theme before you design many screens: see [Set the theme first](../guides/design-tips.md#set-the-theme-first)." | ok | `docs/guides/design-tips.md:10` is `## Set the theme first`; its first line is "Open **Themes** ... before you design many screens." | Anchor resolves. The sentence restates that line. |
| "A theme restyles only the widgets that use it. When a widget's color field shows a role's name, such as `primary`, the widget follows the theme." | ok | a linked color shows the role's name: `StyleButton` text = `StyleHelper.styleName`, or the `ReferenceBlock` name: `packages/core/lib/src/fields/color_fields.dart:522-531, 556-562`; `onSelect` writes `Theme.of(context).colorScheme.<role>`: `color_fields.dart:733-740` | Same behavior the verified `theme-styles.md` "Use a theme color" step 3 states. |
| "A widget with its own color, picked in the color picker or typed as a HEX value, keeps that color when you edit the theme." | ok | the picker and the HEX box write a fixed `Color(<hex>)`: `color_fields.dart:723-727` (`updateBlock`), `HEXField` `:616-640`, field shows HEX and opacity boxes when not linked `:563-580` | A fixed `Color(...)` has no link to the theme. |
| "So does a text style you cut loose from the theme." | ok | `theme-styles.md` "Use a theme text style": "To cut the text loose from the theme, click the **x** on the style button. The style becomes your own" (verified page) | Same wording ("cut loose"). |
| "To bring a widget back, pick one of the theme's colors for it, or a theme text style. See [Use theme colors and text styles](theme-styles.md)." | ok | `onSelect` above; detach button writes the current value back as a fixed one: `color_fields.dart:749-768` | Link target is in the same folder; sections "Use a theme color" and "Use a theme text style" cover both. |
| Style: sentence-case H2, no admonition, no emoji, no hype words | ok | n/a | Front matter unchanged. |

Item 4: 7 rows, 0 fixed, 0 removed.

## Item 5. `docs/test/index.md`, three-row table and guide link

Diff: `git diff b0b2c98 -- docs/test/index.md` (new intro table, the guide-link sentence, and the structure editor's Next steps, which I read but did not re-verify beyond link targets).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| Row **Play** (**Instant preview** on the phone layout) = Instant Play, interpreted, instant, close not exact | ok | board button tooltip `Play` (`Stop` while playing): `packages/designer/lib/src/panels/canvas_titles.dart:247`; right-click item `Play`: `packages/designer/lib/src/menus/widget_context_menu.dart:39`; phone layout: top-row button `Play` `lib/project/nowago/mobile_view.dart:347` opens "Play your app" (`:92`) whose first card is **Instant preview** with badge `SIMULATED` (`:102-103`); simulate mode `RunMode.simulate`: `play_mode.dart:257, 474` | The "interprets ... not exact" wording matches `test/instant-play.md` and the accuracy warning quoted below the table. |
| Row **Run** (**Run real app** on the phone layout) = the real app, compiled | ok | top-bar label `Run`: `lib/project/run/run_button.dart:174, 217, 273`; **Run real app**: `mobile_view.dart:117` | `test/run.md` (verified): "Run compiles your real Flutter app". |
| Row **Run**: "On a computer it shows in the **Embedded preview** or on a device." | fixed | **Embedded preview** row `run_button.dart:609`; devices only in the desktop app, the web editor shows **iOS & Android devices** / "Download the desktop app": `run_button.dart:547, 633-647` | Gate was missing. Now "... or on a device in the desktop app." |
| Row **Share preview** = a link and QR code that open Instant Play in other people's browsers | ok | tooltip `Share preview`: `play_mode.dart:508`; popup title `Share Preview`: `:664`; the popup shows the link with copy and open buttons and a `Qr code` button: `:670-700`; phone layout item `Share preview`: `mobile_view.dart:461`. The link is `/preview/:id`, which builds `PreviewPage` and shows `PlayModeLoader` (`MobilePlayModeView` on the phone layout): `lib/router.dart:293-302`, `lib/project/preview_page.dart:15-33` | Opens Instant Play, not a compiled app. |
| Row **Share preview**: cloud-only | fixed | a local project gets a sync notice instead of the popup: `play_mode.dart:46-57` | Gate was missing here, though the table below and `test/share.md` state it. Added "Cloud projects only." |
| "Learn more" links `instant-play.md`, `run.md`, `share.md` | ok | n/a | Files exist in the same folder. |
| Guide link: "[Test in the right place](../guides/ship-tips.md#test-in-the-right-place) shows when to use **Play**, **Run**, a device or a shared link, plus a few habits for testing flows." | ok | `docs/guides/ship-tips.md:10` is `## Test in the right place`: table of **Play**, **Run**, phone or emulator, **Share preview** with a "When" column, then "Start a flow at its first screen" and "Try the unhappy paths" | Restates the guide only. Anchor resolves. |
| Phone paragraph (next to the table): "**Run real app**, marked **REAL APP**" | fixed | badge is `manager.previewReady ? 'LIVE' : 'REAL APP'`: `mobile_view.dart:118`; `previewReady` = run ready and app healthy: `packages/nowa_run/lib/src/nowa_run_manager.dart:86` | True only until the app is running. Now "marked **REAL APP** (**LIVE** once the app is running)". `SIMULATED` on **Instant preview** is right. |
| Next steps (adjacent): Troubleshooting, Build a great app | ok | `docs/troubleshooting/index.md:10` ("My app shows an error"), `docs/guides/index.md` | Link text matches both targets. |

Item 5: 9 rows, 3 fixed (two gates, one badge detail), 0 removed.

## Item 6. "Switch themes while the app runs": `docs/design/theme-styles.md` and `docs/logic/global-state.md`

Diffs: `git diff b0b2c98 -- docs/design/theme-styles.md docs/logic/global-state.md`. The only change in `theme-styles.md` is step 4. In `global-state.md`: the guide-link sentence under the intro, the `AppState` line in "Create a global state", and the shortened section.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| theme-styles.md step 4: "For **Theme**, click **Select theme** and choose a theme under **THEMES**, such as `darkTheme`." | ok | `changeTheme(ThemeData theme)`: `packages/core/lib/src/file_system/templates/common/app_state_template.dart:28-35`; the label **Theme** is the param name through `camelCaseToSpaces`: `packages/core/lib/src/fields/block_field.dart:213-219`, `packages/core/lib/src/utils.dart:77-79`; a `ThemeData` input is drawn by `BFThemeData` (`block_field.dart:72`), a `FieldTile` with a button `Select theme` that opens a link menu with one category `Themes`: `packages/core/lib/src/fields/basic_fields.dart:2044-2072`, shown upper-case (`THEMES`): `packages/core/lib/src/fields/link_menu.dart:331`; the list is the project's public global `ThemeData` variables: `packages/core/lib/src/project/env_services/theme_service.dart:25-28` | `lightTheme` and `darkTheme` exist in new projects (`design/themes.md`, verified). |
| theme-styles.md steps 1 to 3 and the closing "Run your app..." line (unchanged, now the only full copy) | ok | steps were verified in the Design pass (`6b508da`); "Hover the small dot ... It grows into a **+**" matches `logic/circuit.md:25`; **GLOBALS** and **AppState** as in `global-state.md` ("**GLOBALS** lists attached global states") | No wording from the removed copy was lost: its step 1 to 4 content is covered, and step 4 now carries its **THEMES** wording. |
| theme-styles.md: link `../logic/global-state.md` "Share data across your app" | ok | `docs/logic/global-state.md` title is "Share data across your app" | |
| global-state.md, "Create a global state": "New projects already include a global state named **AppState** (`lib/globals/app_state.dart`). It holds the app's theme and a `changeTheme` function" and the link to `../design/theme-styles.md#switch-themes-while-the-app-runs` | ok | file path `FileTemplate.appState`: `packages/core/lib/src/file_system/templates/file_template.dart:34`; class holds `ThemeData _theme = lightTheme`, getter `theme` and `changeTheme`: `app_state_template.dart:28-35`; created in new projects: `packages/core/lib/src/file_system/templates/project_bundles/default_bundles.dart:31-32, 61-62, 82-83` | Anchor exists at `theme-styles.md` ("## Switch themes while the app runs"). |
| global-state.md, section "Switch themes while the app runs": heading kept, two sentences and a link: "**AppState** holds the app's theme and a `changeTheme` function. Call it from a button's **On Pressed** to switch the running app between themes, for example with a dark mode button: the steps are in [...]" | ok | same refs; the **On Pressed** start is step 1 of the steps in `theme-styles.md` | Heading id `#switch-themes-while-the-app-runs` is unchanged, so old links still land on the pointer. No other page links `global-state.md#switch-themes-while-the-app-runs` (grep). The page keeps one admonition (the Nowa AI tip). |
| global-state.md, guide sentence: "Start local: move a value to global state only when a second screen needs it. [Pick where each value lives](../guides/data-and-state-tips.md#pick-where-each-value-lives) compares your options." | ok | `docs/guides/data-and-state-tips.md:10` is `## Pick where each value lives` (a table that compares variable, param, global state, constant, Shared Preferences and backend), then "Start local. Move a value to global state only when a second screen needs it." | Same words as the guide. Anchor resolves. |
| Style and length: no emoji, no hype words, one `:::tip` on global-state.md, none added on theme-styles.md | ok | n/a | 872 and 707 words (limit about 1,200). |

Item 6: 7 rows, 0 fixed, 0 removed.

## Item 7. One-sentence guide links

Pages: `docs/design/components.md`, `docs/design/templates.md` (with its corrected Next steps line), `docs/integrations/constants.md`, `docs/publish/index.md`, plus the links on `prompting.md`, `themes.md`, `global-state.md` and `test/index.md` (the last three are in items 4, 6 and 5). Rule applied: the sentence may only restate what the linked guide says, and the anchor must exist.

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| components.md (after intro): "Make a component as soon as you use a card, header or button twice: see [Build once, reuse everywhere](../guides/design-tips.md#build-once-reuse-everywhere)." | ok | `docs/guides/design-tips.md:21` is `## Build once, reuse everywhere`; its first bullet: "Make components early. Right-click a card, header or button you use twice ..." | Restates that line only. |
| components.md new "Next steps" (structure editor, adjacent): `parameters.md`, `add-widgets.md`, `lists.md` | ok | titles match the link text (`Pass data with parameters`, `Add widgets`, `Lists and grids`); `add-widgets.md:13` lists **Components** in the widget picker, which backs "drop your components in from the widget picker" | |
| templates.md (end of "Add a template"): "Many templates come with fixed colors of their own, so link their colors and text to your theme after you add one: see [Start from a template](../guides/design-tips.md#start-from-a-template)." | ok | `design-tips.md:28` is `## Start from a template`; its first bullet has the same words. Fact checked in code: built-in templates use fixed colors, counting `Color(0x...)`, `Colors.*` and hex literals per file in `packages/core/lib/src/services/templates/built_in/`: `basic_cards.dart` 103, `auth_template.dart` 48, `dashboard.dart` 43, `event_info.dart` 42, `article.dart` 28, `audio_player.dart` 20. `basic_cards`, `dashboard`, `event_info`, `article` and `audio_player` have no `colorScheme` or `Theme.of` use at all; `auth_template.dart` has 7 next to its 48 fixed colors; `chat_template.dart` has 8 theme uses and 7 fixed colors; `empty_page.dart` has neither | "Many", not "all", is right. |
| templates.md Next steps: "[Use theme colors and text styles](theme-styles.md) to link a template's colors and text to your theme." (replaces "so every template follows your colors") | ok | link text is the page title; `theme-styles.md` covers linking colors and text styles ("Use a theme color", "Use a theme text style") | The old line overpromised, given the counts above. |
| constants.md (after intro): "Constants ship inside your app, so anyone who has the app can read them: see [Keep secrets out of your app](../guides/data-and-state-tips.md#keep-secrets-out-of-your-app)." | ok | `data-and-state-tips.md:39` is `## Keep secrets out of your app` ("Anything inside your app can be read by anyone who has it", "**Constants ship in the app.**"); constants are text values of the `AppConstants` class in `lib/globals/app_constants.dart`, project code that is compiled into the app: `packages/core/lib/src/file_system/templates/file_template.dart:35`, `.../common/app_constants_template.dart` | Same point the page already makes ("Behind the scenes, every constant is a text value in the `AppConstants` class"). |
| publish/index.md (end of "Check your app details"): "Before you publish, work through the [publish checklist](../guides/ship-tips.md#publish-checklist): it covers these settings, test keys, secrets and each target." | ok | `docs/guides/ship-tips.md:55` is `## Publish checklist`; rows: app details, permissions, test settings (Stripe, AdMob, Maps), secrets, Problems and device test, Android, iOS, Web, update | "these settings" = the app details and permissions in the paragraph above. |
| publish/index.md "Ship an update" (structure editor, adjacent): Web **Update** / **Redeploy**; Android and iOS rows | ok | **Update** (live site) `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_widgets.dart:298`; **Redeploy** on the **Web** row `lib/project/run/deploy_button.dart:356`; the Android and iOS cells repeat `android.md` "Release an update" and `ios.md` "Build and send" | Anchors `web.md#update-your-site`, `android.md#release-an-update`, `ios.md#build-and-send-to-app-store-connect` resolve. |
| prompting.md: "For habits that keep Nowa AI's changes accurate and easy to review, such as small steps and checkpoints, see [Get the best from Nowa AI](../guides/ai-tips.md)." | ok | `docs/guides/ai-tips.md` title is "Get the best from Nowa AI"; intro: "These habits keep its changes accurate and easy to review"; sections "Work in small steps" and "Undo with checkpoints" | Page link, no anchor. The new **Agent** row in the same table is in item 1. |
| Links on themes.md, global-state.md, test/index.md | ok | see items 4, 6 and 5 | `design-tips.md#set-the-theme-first`, `data-and-state-tips.md#pick-where-each-value-lives`, `ship-tips.md#test-in-the-right-place` all resolve. |

Link check over all 17 pages of this batch (script: markdown links resolved to files, anchors matched against headings and explicit `{#id}`; sanity-tested with a known-bad anchor): 172 relative links, 0 broken.
Style check over the same pages: no emoji, no `---` rules, no H1 in the body, no hype words, at most two admonitions per page. Word counts are under 1,200 except `integrations/supabase/database.md` (1,230, of which the new pointer is 27 words) and `design/themes.md` (1,202); both left as they are.

Item 7: 9 rows, 0 fixed, 0 removed.

## Run notes

- The run was paused after item 2 at the orchestrator's request ("Stopped here; left: items 3 to 7"), then resumed and finished items 3 to 7.
- `publish/android.md`, `publish/ios.md`, `integrations/index.md` and `guides/ship-tips.md` are about to get store-rules links from another agent. Item 2 checked those two publish pages as they were at b0b2c98..HEAD on 2026-10-07; anything added afterwards is not covered here. The anchors this batch relies on in them (`android.md#test-on-a-device`, `android.md#release-an-update`, `ios.md#after-the-upload`, `ios.md#build-and-send-to-app-store-connect`, `ship-tips.md#test-in-the-right-place`, `ship-tips.md#publish-checklist`) should be re-checked if those headings change.
