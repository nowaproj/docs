# P9 recipes review

Verifier run, 2026-10-07. Batch "P9 recipes": text added after the pages were verified (items 1 to 7 of the assignment). Source of truth: `/home/user/nowa-master` (v3.12.5). Writer refs: `reviews/phase9-fixes.md` ("Recipes and clarifications", parts 1 to 3) and `reviews/W20-writer-notes.md` (tasks 3, 4, 5). Only the added or changed parts were checked (`git diff b0b2c98 -- <page>`).

Summary (run stopped early at the orchestrator's request, see "Stopped here" at the end):
- Pages checked: 8 of 17 (items 1 and 2: `lists.md`, `show-data.md`, `supabase/database.md`, `prompting.md`, `builds.md`, `android.md`, `ios.md`, `web.md`). Not started: items 3 to 7 (9 more pages: `devices.md`, `themes.md`, `test/index.md`, `theme-styles.md`, `global-state.md`, `components.md`, `templates.md`, `constants.md`, `publish/index.md`).
- Claims checked: 23 (item 1: 5, item 2: 18). Fixed: 0. Removed: 0. No page was edited.
- Open issues: (1) Play Console Help (`support.google.com`) and `appstoreconnect.apple.com` are blocked here, so the generic Play Console steps ("Create your app there", "Add the `.aab` to a release") are kept only because they carry no button names or store rules, and the new App Store Connect link was not opened. (2) "Starting a build commits all your changes" is the product's own UI message (`workflow_details_page.dart:464`); the commit itself is not visible in client code (the client only posts the workflow id and branch).

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

## Stopped here

Stopped here; left: items 3, 4, 5, 6 and 7 of the assignment (the orchestrator asked for a pause after the item in progress). None of them was started or checked:
- 3. `docs/test/devices.md`, new H2 "No desktop app?" (Run, **Embedded preview**, **Open on Mobile**, **Scan the QR**, Android debug and iOS TestFlight pointers, cloud and plan gates). Writer refs: `phase9-fixes.md` part 2, last bullet (`lib/project/top_bar_mapper.dart:127-146`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:833-866`, `packages/nowa_run/lib/src/ui/nowa_run_play_tools.dart:9-90`).
- 4. `docs/design/themes.md`, H2 "Widgets that keep their own color", intro wording "every widget that uses it follows", guide link (`../guides/design-tips.md#set-the-theme-first`). Refs: `packages/core/lib/src/fields/color_fields.dart:723-739, 749-768`.
- 5. `docs/test/index.md`, three-row table (Play, Run, Share preview) and the guide link. Refs: `W20-writer-notes.md` task 3 (`lib/project/nowago/mobile_view.dart:92-130, 339-347, 461`, `lib/project/run/run_button.dart:174, 217, 273, 545, 609`, `packages/designer/lib/src/panels/canvas_titles.dart:247`, `packages/designer/lib/src/play_mode/play_mode.dart:508, 664`).
- 6. `docs/design/theme-styles.md` (step 4 **THEMES** wording) and `docs/logic/global-state.md` (heading, two sentences and a link). Refs: `packages/core/lib/src/fields/basic_fields.dart:2044-2072`, `block_field.dart:72`, `theme_service.dart:25-28`, `W20-writer-notes.md` task 4.
- 7. One-sentence guide links: `docs/design/components.md`, `docs/design/templates.md` (and its corrected Next steps line), `docs/integrations/constants.md`, `docs/publish/index.md`, plus the ones on `themes.md`, `prompting.md`, `global-state.md`, `test/index.md`. Each sentence must restate its guide, and each guide anchor must exist (`W20-writer-notes.md` task 5 table). Note: the `prompting.md` guide link (`../guides/ai-tips.md`, "habits ... such as small steps and checkpoints") was seen in the diff but not compared with the guide.
