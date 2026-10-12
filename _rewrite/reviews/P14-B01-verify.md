# P14-B01 verification log

Verifier: P14-B01-V. Product code: `/home/user/nowa-master` (3.13.0, `3cb32031c`). Code refs are relative to it.
Diff checked: `git -C /home/user/docs diff origin/main -- docs/index.md docs/get-started docs/guides`.

## Summary

- **Pages checked:** 15, all of B01 (diff `+` and `-` lines, plus the unchanged text for the audience rules R2-R5, R9).
- **Claims checked:** about 130, in 95 table rows below.
- **Fixed:** 17 wrong or overstated claims. Most serious: `welcome.md` said moving between screens needs **Agent** mode (Design mode already designs the flow); `complete-app.md` said **Make it real** hands over the whole design at once (it starts with one recommended feature); `desktop-app.md` said the Android emulator can be added later from **Local Setup** (routed from B12: in 3.13 that screen only opens while the toolchain is missing) and that the emulator row says **Managed by Nowa**; `editor-tour.md` said all Agent-built logic opens in Circuit (some loops can't be drawn) and implied Git is opt-in; `first-app.md` called **Run** "the same app your users will get" (it runs the web build).
- **Removed:** 2 unverifiable phrases ("especially on a first run", "each row takes a minute to check").
- **Facts restored:** 0 needed. Every removed fact was moved unchanged to `P14-B01-for-code.md` (checked against `origin/main`) or kept in plain words.
- **Routed items:** 5 applied (B03 Terms/Privacy links, B10 ×2, B12, B09); 5 already applied by the writer, verified (B02 ×2, B04, B05 ×2).
- **Audience fixes:** 7 (Agent mode and/or a way to check added to 7 prompts; "Git repository" and "webhook" explained).
- **Old-docs items the writer brought back:** all verified (Xcode "Flutter failed to initialize" + **Try again**, **Managed by Nowa** (refined), stopwatch prompt pattern, internet needed in the desktop app).
- **Open issues:** 3 (product caption contradicting the Android step's behavior, complete-app length, offline start screen). See the end.

## index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Hero and description: describe it, Nowa AI builds it, refine visually, no code, publish to iOS, Android and the web | ok | `lib/project/run/deploy_button.dart` (web and mobile deploy rows) | |
| "It takes about 15 minutes" (first card) | ok | `docs/get-started/first-app.md` intro | Same figure as the walkthrough. |
| Card texts (undo a request, Circuit, "Optional, for people who code") | ok | `docs/ai/undo-and-history.md`, `docs/logic/circuit.md` | Wording only. |
| Unchanged: **?** button at the bottom right opens chat with support / report an issue | ok | `lib/project/project_page.dart:137` (`Positioned(right: 16, bottom: 32, child: SupportLauncher())`), `packages/nowa_ui/lib/src/components/nicons.dart:11` (`Icons.question_mark`), `packages/nowa_ui/lib/components/support_dialog.dart:509-520` | |

Structure: the hero `<h1>` existed on `origin/main` (`hide_title: true`), not added. Links unchanged.

## get-started/welcome.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Step 2: "In **Agent** mode it also makes them work: buttons, data and moving between screens" | fixed | `packages/ai/lib/src/agent/designer_agent.dart:7` ("Design mode's agents: screens, navigation, theming, and demo data only"), `packages/ai/lib/src/ui/chat_field/mode_selector.dart:37` ("Create/refine the look and flow without logic"), `docs/ai/modes.md` | Design mode already designs how people move between screens; the line implied that was Agent-only. Now: "makes them work, with real data and the logic behind every button". |
| Board is the real app, not a mockup; code belongs to you; download it and hand it over | ok | `docs/publish/download-code.md`, `docs/test/run.md` | Download is for cloud projects; local projects already have the files. |
| Flutter explained in one clause | ok | | R4. |
| Circuit: visual editor, each step a block | ok | `packages/core/lib/src/fields/field_link_menu.dart:389`, `docs/logic/circuit.md` | |
| Run: in the editor, on your phone, on a device or emulator with the desktop app | ok | `lib/project/top_bar_mapper.dart:187-188` (**Open on Mobile**), `lib/project/run/run_button.dart:636-655` | |
| Desktop row: your computer shows up in the **Run on** menu | ok | `lib/local_export.dart:102-115` (every Flutter daemon device, no platform filter), `packages/core/lib/src/runner/local_build_manager.dart:90-96`, `docs/test/devices.md:27`, `:57` (screenshot lists macOS) | |
| Free plan; Deploy for cloud projects; web publish and Android/iOS builds need a paid plan | ok | `packages/core/lib/src/billing/billing_models.dart:45`, `lib/project/top_bar_mapper.dart:157-163`, `lib/project/run/deploy_button.dart:21`, `:51-55` (`webPreviewDeploys`, `cloudBuilds` grants), `:282` ("Mobile deployment is available on paid plans") | No amounts (D3). |
| "You don't need [the desktop app] to build and publish your app" | ok | `lib/project/run/deploy_button.dart:21` (Deploy hidden only for local projects) | |
| Key terms (Component "change it once and every copy updates", Circuit row, Board, Screen examples) | ok | `docs/design/components.md`, `docs/logic/circuit.md` | |

Removed facts: "Developers and teams" bullet split into "Teams" and "People who also code"; every link kept. Nothing lost.

## get-started/first-app.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "Run builds and starts the actual app, the same one your users will get, so it's the most accurate test" | fixed | `docs/test/run.md` intro ("nothing is approximated: it's your actual app, running as a web app"), `packages/core/lib/src/runner/run_preflight.dart:84-86` ("The preview runs your app as a web app") | The embedded run is the web build in a phone frame, and `test/devices.md` calls a real phone the best test. Now: "builds and starts your actual app, with nothing approximated, so you see how it really behaves before you publish". |
| "Errors happen, especially on a first run" | fixed | | "Especially on a first run" isn't verifiable; now "Errors can happen." |
| Nowa creates, names and opens the project | ok | loading texts on the page (verified in earlier phases) | |
| Deep Thinking reasons more | ok | `packages/ai/lib/src/agent/agent.dart:22-27` ("Extra reasoning. Great for complex tasks.") | |
| Outline "lists every widget on the board" | ok | `docs/design/outline.md` intro | |
| Questions card, attached widget, backend, API key glosses | ok | | R4 glosses, no new product claim. |

Two admonitions (tip, warning). Labels, steps and images unchanged.

## get-started/create-account.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Routed from B03 (optional): Terms and Conditions and Privacy Policy links after the terms checkbox, plus `../account/account-settings.md#your-data-and-privacy` | applied | `lib/auth/auth_view.dart:496-512`, `lib/auth/google_signup.dart:105` (the label opens `https://www.nowa.dev/terms-and-conditions`); `https://nowa.dev/terms-and-conditions/` → 200, title "Terms & Conditions \| Nowa"; `https://nowa.dev/privacy-policy/` → 200, title "Privacy Policy \| Nowa" (the `www` forms redirect there); anchor at `docs/account/account-settings.md:75` | Added as an indented paragraph under step 3. The app itself links only the terms; the privacy link is a docs addition. |
| Apple: web app incl. a phone's browser, not the desktop app; use email or Google there | ok | `lib/auth/auth_widgets.dart:500` (`NPlatform.isIOS \|\| NPlatform.isWeb`), `lib/auth/auth_view.dart:316-331`, `:524-539` (Google button always shown, `useGoogle` defaults to true) | |
| **Invalid link**: "incomplete or has expired" | ok | `lib/auth/reset_password_page.dart:60-66` (shown when the link carries no token; app text "missing or has expired") | Plain-words rephrase of "missing". |
| Playground work can be saved after signing up | ok | `docs/get-started/playground.md#keep-your-work` | |
| Code confirms the address; check spam; "most take a single click"; projects stay after logout | ok | | Tone (R9); no new label. |

## get-started/playground.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Menu descriptions quoted and explained; the playground opens on **Starter app** | ok | `packages/core/lib/src/playground/playground_starter.dart:9-11`, `:22` (falls back to `starter`) | R3: UI text kept in quotes, "routing" explained. |
| Nowa AI needs an account, not a saved app; other features return after saving | ok | unchanged facts reworded | |
| Guest copy: "edit and play it as much as you like, nothing changes the owner's project" | ok | unchanged fact | |

## get-started/mobile.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Tone additions (dictation is quicker, attach so Nowa AI knows which one, Supabase connector gloss, start or check a build from the **Build** tabs) | ok | `docs/ai/connectors.md`, `docs/publish/android.md`, `docs/publish/ios.md` | Labels, table and image unchanged. |

## get-started/editor-tour.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| New Circuit section: floating panel; opens from the button next to an event in **Details** (**+** or **Edit**), or from a function in **Variables** | ok | `packages/core/lib/src/fields/nowa_fields.dart:797-830` (label `+`, or bolt + **Edit** when a function is set), `docs/logic/circuit.md#open-circuit` | |
| "Logic that Nowa AI builds in **Agent** mode lands in the same events and functions, so you can open them in Circuit" | fixed | `_rewrite/reviews/P14-B06-for-code.md` (`#variables-and-functions`: `for`, `switch`, `break` can't be drawn; `packages/code/lib/src/models/block_to_circuit_visitor.dart:24-89`), `docs/logic/conditions.md:68` (moved there from `circuit.md` by the If/Try/loops split) | Overgeneralized. Now "open most of it in Circuit ... A few kinds of steps, such as some loops, can't be shown there." |
| Steps stack and run top to bottom | ok | `docs/logic/circuit.md#read-a-circuit-top-to-bottom` | |
| **Variables** tabs in plain words (Params received from outside, Variables remembered while open, Functions as named sets of steps); **Globals** = attached global states | ok | `docs/logic/variables.md:25-32`, `docs/logic/global-state.md:50-58`, `packages/core/lib/src/state_management/global_state_widgets.dart:53` | R8. |
| Status bar: "if the project uses Git, the branch ..." | fixed | `lib/status_bar.dart:73-77` (shown whenever `GitManager.isReady`), `packages/git_nowa/lib/src/git_manager.dart:175-191` (false only without a repo, while loading or on error), `docs/code/git.md` ("New projects start with a repository") | Implied Git is opt-in. Now "for projects with Git version history (new projects have it from the start)". |
| Package chip: "usually in an imported project" | fixed | `lib/project/owned_package_chip.dart:6-10` (a workspace holding more than one package) | "Usually" isn't backed by the code; now "as some imported projects have". |
| Search: text with replace everywhere, **Symbols** finds names such as a screen's | ok | `lib/project/panels/search_panel.dart:10-12`, `:229-260` (**Replace all**), `docs/code/files.md:110-112` ("Class: HomePage") | |
| Router: routes and the screen people start on | ok | `docs/logic/router.md` intro (**Initial Location**) | |
| Gear: app name, icon and other project details | ok | `docs/account/project-settings.md:20`, `:64-72` | |
| Safe mode gloss: dashboard option for a project that freezes when it opens | ok | `packages/nowa_ui/lib/dashboard/projects_grid.dart:303` (**Open in safe mode**), `docs/account/projects.md:96` | |
| Other glosses (Library assets, Themes, Git, Outline, Api, Supabase sections, Problems first place to look, code mode optional) | ok | `docs/design/library.md`, `docs/integrations/supabase/connect.md`, `docs/test/problems.md` | |

Anchors kept (`{#welcome-tour}`; the H2 auto anchors are unchanged, Circuit section is new). About 2,000 words: the writer's split proposal (tour + "Editor controls" reference) is in the notes; not needed yet.

## get-started/cloud-and-local.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| New section "Tell which kind you have": **On this device**, **LOCAL-ONLY**, the section text, **Cloud**/**Local** badge; no **Deploy** for local; **Hot Reload**/**Open in Browser** vs **Hot Restart**/**Open on Mobile** | ok | `packages/nowa_ui/lib/dashboard/projects_view.dart:504`, `:521`, `packages/nowa_ui/lib/dashboard/projects_grid.dart:253`, `lib/project/run/deploy_button.dart:21`, `lib/project/top_bar_mapper.dart:186-188` | |
| Run rows: saving restarts a cloud run (**Hot Restart**) and updates a local run in place (**Hot Reload**) | ok | `packages/nowa_run/lib/src/nowa_run_plugin.dart:46`, `packages/nowa_run/lib/src/nowa_run_manager.dart:84`, `:150-157`, `packages/nowa_run/lib/src/services/local/nowa_run_service_local.dart:79` + `daemon_protocol.dart:115-122` (`fullRestart: false`), `docs/test/run.md:43` | |
| Internet needed, also in the desktop app and for local projects | ok | `lib/router.dart:46-63` (version check and profile fetch on every signed-in route: `:176`, `:248`, `:280`, `:307`, `:317`), `:86-111` | Restores the correction of the old "work offline" claims. |
| "What Nowa creates unless you ask for a local one" | ok | `docs/account/projects.md:39-41` | |
| "Sync in the direction of the copy you changed" | ok | both buttons overwrite the other side (unchanged fact) | Advice that follows from it. |

Removed: the dashboard-badge paragraph moved into the new section, unchanged. Auto anchors all kept.

## get-started/desktop-app.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Routed from B12: step 7 said the Android tools can be added later from **Local Setup** (**Environment**) | fixed | `packages/core/lib/src/environment/environment_setup_dialog.dart:331-333` (header steps are only Flutter and Verify), `:525` (the "Android isn't set up" note shows only while the toolchain isn't installed), `:580` (its **Download** is the only way to the Android step), `:548` (caption "You can add these later from Settings → Environment."), `:89-93` (emulator blocked until the toolchain is in); `packages/core/lib/src/environment/environment_doctor.dart:51-71` (a found Android Studio SDK also counts as installed); `packages/core/lib/src/settings/editor_settings/local_setup.dart:69`, `:144` (the page offers only **Set up automatically**) | Now: install the emulator in the same go, because in 3.13 the screen only opens while the toolchain is missing; link to `test/devices.md#no-emulators-listed`; the toolchain itself can still be added later. Same wording as `test/devices.md:34`, `:77`. |
| New "Do you need the desktop app?": the web app designs, builds with AI, plays, runs (QR to phone), shares and publishes; desktop for devices/emulators, local projects, importing | ok | `lib/project/top_bar.dart:377`, `lib/project/top_bar_mapper.dart:188`, `lib/project/run/run_button.dart:636-655`, `docs/account/projects.md:48` (Import project is desktop only), `docs/test/devices.md` | |
| Set up Flutter intro: what Flutter and the SDK are; cloud projects run in the editor can skip it | ok | `packages/nowa_run/lib/src/nowa_run_plugin.dart:14-16` (cloud projects run on `NowaRunServiceImpl`, local ones on `NowaRunServiceLocal`), `docs/code/local-projects.md`, `docs/test/devices.md` | R4. |
| Xcode error: red "Flutter failed to initialize" + Flutter's message under the row, then **Try again** | ok | `packages/core/lib/src/environment/flutter_installer.dart:111-114`, `:38-41`; `environment_setup_dialog.dart:181-186`, `:880-883` (error text in `errorColor`), `:913-916` (`hasError ? 'Try again' : 'Install'`) | The page paraphrases Apple's `xcode-select` text instead of quoting it; fine. |
| Xcode "a large download"; Apple's free app | ok | general fact (old docs); in-app helper `environment_setup_dialog.dart:463-470` covers the first-launch steps | |
| "**Managed by Nowa** next to the ones Nowa installed" | fixed | `environment_doctor.dart:21-25` (Flutter, when `flutterManagedByNowa`), `:63-68` (Android toolchain, stored path), `checkEmulator` ("Virtual device ready"); `flutter_installer.dart:122`; status joined at `environment_setup_dialog.dart:943-953` | The emulator row says **Virtual device ready**, not **Managed by Nowa**. Now names the **Flutter** and **Android toolchain** rows. |
| **Found on PATH** for a Flutter found on the computer | ok | `environment_doctor.dart:28-31` | |
| Internet needed to sign in and open projects, local ones included | ok | `lib/router.dart:46-63`, `:86-111` | |
| `flutter doctor` and Android toolchain glosses; "terminal" for `ldd --version` | ok | `environment_setup_dialog.dart:487` ("Running flutter doctor…") | R3/R4. |

Anchors kept: `{#install-on-linux}`, `{#setting-up-flutter-sdk}`, `{#macos-install-xcode}` (the app's helper links to `#macos-install-xcode` and `#setting-up-flutter-sdk` on the old URL, D13), and the two auto anchors under Set up Flutter. One admonition (note).

## guides/index.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Habits and checklist reworded with glosses (global state, Git, Row Level Security, Bundle Identifier); "secret key ... in a REST API's request settings" | ok | `docs/guides/data-and-state-tips.md#keep-secrets-out-of-your-app` | Same facts, plain words. Anchors checked (see Links). |

## guides/data-and-state-tips.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Routed from B10: link "create them in Supabase" to `../integrations/supabase/database.md#create-a-table` | applied | anchor at `docs/integrations/supabase/database.md:16` | |
| "Ask Nowa AI ... through its Supabase connector" (tables, RLS) and the empty-list prompt without a mode | fixed | `docs/ai/modes.md` ("the only mode that can use the Figma and Supabase connectors"), `docs/integrations/supabase/database.md:20-22` | R5 asks for **Agent** mode; connectors only work there. Added "in **Agent** mode" to the three prompts. |
| Anon key gloss "the public key Supabase gives every app" | fixed | | It's per Supabase project; now "your Supabase project's public key". |
| Model bullet without `fromJson`/`toJson`: Nowa keeps the model up to date, including the part that turns backend data into a recipe and back | ok | `docs/logic/models.md:19` | Original moved to the for-code file (`#models`), unchanged. |
| **refresh** redraws the screen; **notifyListeners** tells every screen showing the data to update | ok | `docs/logic/variables.md:87-91`, `docs/logic/global-state.md:40-42` | R3. |
| Future / **Future Options** / **onValue** / **onError** glosses | ok | `docs/logic/circuit.md:120-124` | |
| JSON, base URL, header values, webhook secret, query, `isEmpty` glosses | ok | | R4. Webhook secret role per https://docs.stripe.com/webhooks (signature verification). |

## guides/complete-app.md

Flagged: every build step leads with an **Agent** prompt and a check. Result: steps 4, 5 and 6 had prompt + check + visual path; steps 2 and 3 had prompts without a check (added). No prompt promises an exact result. The visual steps match the verified pages (`integrations/supabase/auth.md#login-screen`, `integrations/supabase/database.md`, `logic/navigation.md`, `logic/circuit.md#future-options`).

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "**Make it real** on the design card hands the whole design to **Agent** mode at once" | fixed | `packages/ai/lib/src/ui/guided_inline_views.dart:37-44` (switches to Agent and sends "Make it real — start with what you recommend."), `docs/ai/modes.md` | It starts with one recommended feature. Now "is the shortcut: Nowa switches to **Agent** mode and starts with the feature Nowa AI recommends". |
| Step 3: "'Signed-in people can read it but not change it' becomes Row Level Security" | fixed | | Promised the agent's output (R5). Now "asks for Row Level Security (RLS)". |
| Step 3 prompt had no way to check | fixed | `packages/data/lib/src/supabase/ui/sb_outline.dart:286-301` (⋮ menu: **Open Supabase**, **Tables**), `docs/integrations/supabase/database.md:22` | Added "click ⋮ in the **Supabase** panel, then **Tables**, and look for your recipes table". |
| Step 2 prompt had no way to check | fixed | `docs/design/library.md` (components listed in the Library) | Added "look for `RecipeCard` among the components in the **Library**". |
| "A uuid is a long unique ID that Supabase creates for each row" | fixed | | Whether Supabase fills it depends on the column default the agent picks; now "a long unique ID for each row". |
| Routed from B10: Supabase asks for email confirmation by default; the built-in sender only writes to your Supabase team; link `../integrations/supabase/auth.md#confirm-email` | applied | https://supabase.com/docs/guides/auth/passwords ("On hosted Supabase projects, this is true by default."), https://supabase.com/docs/guides/auth/auth-smtp ("Supabase Auth will refuse to deliver messages to addresses that are not part of the project's team"); anchor at `docs/integrations/supabase/auth.md:26` | Added to step 4.2 with "so use your own email here". |
| **Size** presets "to see the screens on other devices" | fixed | `docs/design/responsive.md:56` (**Size** only changes the board size) | Now "at other device sizes". |
| "That's the whole loop, and your app is live" | fixed | `docs/publish/ios.md:172` (App Store builds still go through review) | Now "from the first prompt to a published app". |
| Supabase setup without the package/`SupabaseService` sentence: ready-made `signUp`, `signIn`, `signOut` under **Authentication** | ok | `packages/data/lib/src/supabase/ui/sb_outline.dart:93-105`, `docs/integrations/supabase/connect.md` | Original moved to the for-code file (`#supabase`), unchanged; one link to `../code/generated-code.md#supabase` at the end (allowed anchor). |
| Sign-in visual steps (button next to **On Pressed**, dot → **+**, `SupabaseService` → `signIn`, **LOCALS** → controller → `text`, **Future Options** **+** next to **onValue**, **Edit** next to **onError**, **Show snackbar**, **Make home screen**) | ok | `docs/integrations/supabase/auth.md:58-75` (steps 3-9), `docs/logic/circuit.md:120-124` | |
| `go` replaces the login screen; `push` opens on top so Back returns | ok | `docs/logic/navigation.md:51-54` | |
| `:id` placeholder typed in the Router panel's **Path**; `$` inserts a value; type mismatch shows in **Problems** | ok | `docs/logic/navigation.md:49`, `:93-95` (the **Path** in **Details** drops `/` in 3.13, so the Router panel is the right place) | |
| Checks for steps 4-6 go through the login screen (the table is readable only when signed in) | ok | step 3 prompt; `docs/test/instant-play.md` (Play makes real calls) | |
| Publish glosses (`.apk`, signing key, `.aab`, Bundle Identifier example, submit for review) | ok | `docs/publish/android.md`, `docs/publish/ios.md:172` | |

Length: about 2,350 words of visible text after these additions. Routing item #24 (split): not required for correctness; the writer's split (part 1: design and sign-in, steps 1-4; part 2: data, detail screen, publishing, steps 5-8) is reasonable if the orchestrator wants pages under ~2,200 words.

## guides/design-tips.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Routed from B05 (1): "Need two layouts?" without the typed `MediaQuery` formula, prompt first, **Visibility** with a width condition, link to `design/responsive.md#show-different-widgets-on-wide-and-narrow-screens` | ok, then fixed | `docs/design/responsive.md` (section "Show different widgets on wide and narrow screens", which keeps the formula and the menu path) | The prompt had no mode and no check. Added "in **Agent** mode" and "Then change the screen's **Size** and click **Play** at each size to check", as on the responsive page. |
| Routed from B05 (2): the app starts in the **Active** theme each time; ask Nowa AI to remember the choice | ok | `packages/core/lib/src/file_system/templates/common/app_state_template.dart:28-35` (`_theme = lightTheme`, `changeTheme` only in memory), `docs/design/theme-styles.md` ("Each time your app opens, it starts in the **Active** theme again") | |
| Routed from B04: "snake_case" replaced by "lowercase with underscores" (**Login flow** → `login_flow`) | ok | `packages/designer/lib/src/actions/file_actions.dart:61-66`, `packages/core/lib/src/file_system/naming.dart:158-163` (`Cases.snakecase`) | The reader sees that name on the **Boards** chip, so it stays. |
| Dark mode: Agent prompt, check by running and tapping the switch; by hand `changeTheme` in Circuit, explained | ok | `docs/design/theme-styles.md#switch-themes-while-the-app-runs` | R3/R5. |
| Theme extensions: no create button because they live in the code; Agent prompt; a new tab in **Themes** shows it worked | ok | `docs/design/themes.md:144-150` | |
| HEX, breakpoints, params, route glosses; everyday examples | ok | | R4/R9. |

## guides/ai-tips.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| New "Describe behavior the way people see it" (old quickstart's stopwatch prompt) | ok, then fixed | old `getting-started/quickstart.md` | Prompt pattern, no product claim. "Leaves Nowa AI nothing to guess" overpromised (R5): now "little to guess". The example had no mode; behavior needs logic, so "For example, in **Agent** mode:". The check (play the screen, try each case) was already there. |
| Routed from B02 (2): link to `../ai/prompting.md#when-the-result-isnt-right` in "Review what the agent did" | ok | heading at `docs/ai/prompting.md:78` | |
| "Nowa AI always works from your latest version, including the changes you've made by hand" | ok | `packages/ai/lib/src/chat_session.dart:266-268` (code-mode buffers flushed before sending), `packages/ai/lib/src/tools/read_file_content_tool.dart:49-55` (reads the in-memory file, unsaved changes included) | Replaces the code-centric wording. |
| Checkpoints: Git doesn't save them; keep a commit or a downloaded copy | ok | `docs/ai/undo-and-history.md:40`; `packages/core/lib/src/project/settings_service.dart:34-38` | `.nowa/temp/` moved to the for-code file (`#project-files`), unchanged. |
| **Writing code** cards, hover to highlight, click to jump, no need to read code | ok | `packages/ai/lib/src/tools/legacy/write_code_tool.dart:23`, `docs/ai/chat.md:41` | |
| Packages, RLS policies, migrations, logs glosses; Design "a safe place to explore" | ok | `docs/ai/modes.md` (Design doesn't touch a backend) | R4/R9. |

## guides/ship-tips.md

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Routed from B09: Google Pay's test setting comes back after each **Deploy Configuration**, so change it after the last one; live-mode webhook needs its own destination; link `../integrations/stripe.md#go-live` | applied | `packages/core/lib/src/integrations/stripe/services/stripe_supabase_service.dart:392-394` (deploy calls `_updateServiceClass`), `:517-566`, `:846-852` (writes `testEnv: true` whenever Google Pay is on); `packages/core/lib/src/integrations/stripe/stripe_settings.dart:613` (**Deploy Configuration**); https://docs.stripe.com/events/how-events-work ("a maximum of 16 event destinations per livemode or sandbox account"); `docs/integrations/stripe.md:150-158` (`## Go live`, step 3) | Said as "Google Pay's test setting", no bare code (R2). The Stripe link in the Where column now points to `#go-live`. |
| Routed from B02 (1): checkpoints bullet without `.nowa/temp/` | ok | `packages/core/lib/src/project/settings_service.dart:34-38`, `packages/core/lib/src/file_system/templates/common/gitignore_template.dart:13-16` | Folder kept in the for-code file (`#project-files`). |
| **From Code Analysis (Accurate)** "checks your whole app thoroughly"; web publishing "starts with that same check" | ok | `packages/core/lib/src/panels/problems_panel.dart:14`, `:47`, `:501`; `packages/core/lib/src/web_deploy/web_environment_manager.dart:118-119` (both call `FlutterService.analyze()`) | `flutter analyze` moved to the for-code file (`#publishing`), unchanged. |
| **Pull Backend Files** in plain words (database setup, server functions, bucket list, "into your project, so Git can keep them") | ok | `docs/integrations/supabase/backend.md:22-24` | `supabase/` folder sentence moved to the for-code file (`#supabase`), unchanged. |
| Google Pay switch via an **Agent** prompt | ok | `docs/integrations/stripe.md:75` | R5. |
| "Each row takes a minute to check" | fixed | | Not verifiable (reading the store rules takes longer). Removed; the reason that stays is "fixing something after release can mean another store review". |
| "So launch day holds no surprises" | fixed | | Overpromise. Now "so you don't forget a step". |
| Play starts the app's navigation at a played screen with a route; paywall, logs, commit, migrations, edge functions, Bundle Identifier, `.aab` glosses; bundle ID registered in your Apple Developer account | ok | `docs/test/instant-play.md`, `docs/publish/ios.md` (register a bundle ID) | |

## Removed facts (all pages)

Every `-` line of the diff was traced. Nothing the reader needs was dropped:
- Moved unchanged to `P14-B01-for-code.md` (checked word for word against `origin/main`): the `SupabaseService`/package sentence (complete-app), `.nowa/temp/` (ai-tips, ship-tips), the `supabase/` folder (ship-tips), Google Pay's `testEnv: true` (ship-tips), `flutter analyze` (ship-tips), the model constructor/`fromJson`/`toJson` sentence (data-and-state-tips). Each page keeps the consequence in plain words.
- Still on the page in simpler words: old complete-app tip (Make it real, Agent + connector, Plan) now in step 1; design-tips' `MediaQuery` formula replaced by "a condition on the screen's width" with the link to `design/responsive.md`, which keeps the formula and menu path; "Nowa applies your code edits before it sends a request" now "always works from your latest version, including the changes you've made by hand".
- Dropped on purpose: "on iOS" for Apple sign-in (native iOS is Nowa GO, not documented, D15). Fine.

Facts restored from removed lines: 0 needed.

## Links and structure

- Relative links and anchors on all 15 pages: checked with a script (resolves files and explicit or auto heading anchors; sanity-tested on a scratch file with a bad anchor and a missing file, both caught, scratch file deleted). 0 problems, also after the orchestrator's If/Try/loops split of `logic/circuit.md` (`#future-options` still there).
- `../code/generated-code.md#supabase` (complete-app) is in the allowed anchor list; no other generated-code links.
- All `{#id}` anchors present on `origin/main` still exist (`#welcome-tour`, `#install-on-linux`, `#setting-up-flutter-sdk`, `#macos-install-xcode`, `#future-options` targets, etc.). Only auto anchor that changed: complete-app `#2-refine-it-by-hand` (heading renamed "2. Make it look like yours"); no inbound link in `docs/`, the product code or the redirect list (only a stale `build/` bundle).
- Front matter valid on all pages; no H1 in the body (index.md's hero `<h1>` predates this pass, `hide_title: true`); admonitions: first-app 2, cloud-and-local 1, desktop-app 1, others 0; no `---` rules besides front matter; no hype words from the style guide list; no emoji; image paths identical to `origin/main`.
- R2 sweep of every inline code span: what's left is UI text the reader sees (function names in the Supabase panel and Circuit, params, routes, theme names, `?screen=`, the `xcode-select` error text, `flutter doctor`) or Linux install facts (archive name, `install.sh`, install folder), each explained where it first appears. No file paths, class names or code lines left outside the for-code file.

## Coverage spot checks

Obsolete rows (all 11 checked in code, all hold):

| Old item | Result | Code |
|---|---|---|
| "No metadata, no hidden files" (introduction) | still obsolete | `packages/core/lib/src/project/settings_service.dart:34-38` (`.nowa/temp` + nested ignore), `packages/designer/lib/src/actions/file_actions.dart:61-66` (`.board` files in `boardsDir`) |
| Nowa Marketplace (introduction) | still obsolete | `lib/dashboard/market_place/marketplace_view.dart:11` (`MarketplaceView` is never used elsewhere) |
| Confirm by clicking the email link (install) | still obsolete | `lib/auth/auth_view.dart:745`, `:793`, `:797` (6-digit code, **Verify**, **Resend the code**) |
| Welcome screen with **Let's Get Started** (install) | still obsolete | no such string in `lib/` or `packages/` |
| Local: work offline (install) | still obsolete | `lib/router.dart:46-63`, `:86-111` |
| Toolbar at the top of the board (toolbar) | still obsolete | `packages/designer/lib/src/panels/designer_board.dart:142-146` (`Alignment.bottomCenter`) |
| **Play** tool in the toolbar (toolbar) | still obsolete | `packages/designer/lib/src/widgets/designer_tools.dart:135-174` (Select tool, Shape, Screen, Text, Widget) |
| **Pages** / **Components** tabs (widget-panel) | still obsolete | `packages/nowa_ui/lib/library/library_panel.dart:432-437` (sections **Project**, **Packages**, **Assets**, **Built-in**; the coverage note omits **Assets**, harmless) |
| Offline mode (createlocalproject) | still obsolete | `lib/router.dart:46-63` |
| "Desktop available for all users, no premium plan" (createlocalproject) | still obsolete | `lib/router.dart:76-82` (desktop grant, else `/upgrade`); covered by the note on `desktop-app.md` |
| Cloud testing needs a download or rebuild each time (whylocalproject) | still obsolete | `lib/project/run/run_button.dart:695` ("Cached on disk · re-synced on save"), `:744` (**Local cache**) |

Also confirmed inside covered rows: no **Templates** entry in the dashboard sidebar (`packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:185-215`: **Download Desktop App**, **Hire an Expert**, **Learning Resources**, **Settings**); Airtable only as an internal endpoint (`packages/core/lib/src/dialogs/dialog_data_sender.dart:10`).

Covered rows sampled (11, all confirmed on the cited page): Play with no build step (`first-app.md#4-play-a-screen`); custom domains (`publish/web.md:59`); change a color from the theme (`first-app.md` step 3, `design-tips.md` "Link, don't type"); email sign-up labels (`create-account.md`); create a workspace (`account/workspaces.md#create-a-workspace`, switcher → **Create workspace**); API collections (`editor-tour.md`, **Api** row); Shape draws a Container (`editor-tour.md` toolbar table); right-click to rename or delete (`design/library.md#open-rename-delete-and-move`); install location, licenses, 1 GB / 10 GB (`desktop-app.md`); first local project with current labels (`code/local-projects.md#create-a-local-project`); IDE and Nowa in sync (`code/vs-code.md:78`).

## Routed items

| From | Page | Status |
|---|---|---|
| B02 (1) checkpoints without `.nowa/temp/` | `guides/ship-tips.md` | verified as applied |
| B02 (2) link to `ai/prompting.md#when-the-result-isnt-right` | `guides/ai-tips.md` | verified as applied |
| B04 "lowercase with underscores" | `guides/design-tips.md` | verified as applied |
| B05 (1) two layouts without the formula | `guides/design-tips.md` | verified; added Agent mode and a check |
| B05 (2) app starts in the **Active** theme | `guides/design-tips.md` | verified as applied |
| B03 (optional) Terms / Privacy links | `get-started/create-account.md` | applied (URLs load) |
| B10 (1) email confirmation default + team-only sender | `guides/complete-app.md` | applied |
| B10 (2) link to `supabase/database.md#create-a-table` | `guides/data-and-state-tips.md` | applied |
| B12 emulator row unreachable after the toolchain | `get-started/desktop-app.md` | applied |
| B09 Google Pay test setting returns after **Deploy Configuration**; live-mode webhook | `guides/ship-tips.md` | applied |

## Open issues

1. **Product copy (for the report):** the Android step's caption says "You can add these later from Settings → Environment." (`packages/core/lib/src/environment/environment_setup_dialog.dart:548`), but in 3.13 that step only opens while the Android toolchain is missing, so the emulator can't be added later from there. The docs now say so (`desktop-app.md`, `test/devices.md`); the caption or the flow should change.
2. **Length (routing #24):** `guides/complete-app.md` is about 2,350 words of visible text. It's correct and scannable; splitting into part 1 (steps 1-4) and part 2 (steps 5-8) as the writer proposes is an orchestrator call. `get-started/editor-tour.md` is about 2,000 words (split proposal in the notes).
3. **Offline start (writer's open question, routed to B12):** by the code, starting the desktop app offline likely lands on sign-in rather than **No Internet Connection**; not tried live. B01 pages don't name either screen, so nothing to change here.
