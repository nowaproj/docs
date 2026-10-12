# P14-B01 verification log

Verifier: P14-B01-V. Product code: `/home/user/nowa-master` (3.13.0, `3cb32031c`). Code refs are relative to it.
Diff checked: `git -C /home/user/docs diff origin/main -- docs/index.md docs/get-started docs/guides`.

## Summary

(filled in at the end)

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
| "Logic that Nowa AI builds in **Agent** mode lands in the same events and functions, so you can open them in Circuit" | fixed | `_rewrite/reviews/P14-B06-for-code.md` (`#variables-and-functions`: `for`, `switch`, `break` can't be drawn; `packages/code/lib/src/models/block_to_circuit_visitor.dart:24-89`), `docs/logic/circuit.md#loops` | Overgeneralized. Now "open most of it in Circuit ... A few kinds of steps, such as some loops, can't be shown there." |
| Steps stack and run top to bottom | ok | `docs/logic/circuit.md#read-a-circuit-top-to-bottom` | |
| **Variables** tabs in plain words (Params received from outside, Variables remembered while open, Functions as named sets of steps); **Globals** = attached global states | ok | `docs/logic/variables.md:25-32`, `docs/logic/global-state.md:50-58`, `packages/core/lib/src/state_management/global_state_widgets.dart:53` | R8. |
| Status bar: "if the project uses Git, the branch ..." | fixed | `lib/status_bar.dart:73-77` (shown whenever `GitManager.isReady`), `packages/git_nowa/lib/src/git_manager.dart:175-191` (false only without a repo, while loading or on error), `docs/code/git.md` ("New projects start with a repository") | Implied Git is opt-in. Now "when the project has a Git repository (new projects start with one)". |
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
