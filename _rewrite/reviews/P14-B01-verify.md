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
