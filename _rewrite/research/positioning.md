# Positioning: how nowa.dev presents Nowa, and how the current docs compare

Source: nowa.dev (via search index, see Method), product code `/home/user/nowa-master` (v3.12.5), docs repo
`/home/user/docs`. Researcher: positioning + reference IA subagent. Date: 2026-10-06.

## Method and limits (read first)

- **nowa.dev could not be fetched.** The session's egress policy denies `nowa.dev`, `blog.nowa.dev` and
  `web.archive.org` (curl: `CONNECT tunnel failed, response 403`; WebFetch: `EGRESS_BLOCKED`). Nothing was
  routed around the block.
- What we have instead: **web search results** restricted to `nowa.dev` (page titles, URLs and snippets the
  search tool returned). Titles and URLs are exact. Quoted copy marked **(snippet)** comes from search snippets
  and may be lightly paraphrased by the search tool; treat it as close to, not guaranteed to be, verbatim.
  **Nav and button labels on nowa.dev could not be seen** (only "Start free" surfaced).
- CTAs and URLs below are taken from the **product code** wherever possible (exact), with `path:line` refs
  relative to `/home/user/nowa-master`. Docs refs are relative to `/home/user/docs`.
- No prices, credit amounts, discounts or plan limits are recorded here (D3), even where search results
  contained them.

## 1. One-line positioning

| What | Text | Source |
|---|---|---|
| Homepage title (SEO) | **"AI Mobile App Builder: Flutter Apps You Can Edit Visually"** | nowa.dev page title (exact) |
| Homepage headline | **"Build the exact app you imagine. In days."** with "No code needed", "Flutter-based", "Start free" | nowa.dev (snippet) |
| Homepage description | "Turn your idea into a production-ready native app for iOS, Android, web and desktop in days with AI and a drag-and-drop editor." | nowa.dev (snippet, repeated in many results) |
| Definition | "a visual, AI-powered Flutter app builder: everything you create is real Flutter code" | nowa.dev (snippet) |
| Philosophy | "AI to build fast, and full visual building to understand and control everything you ship." / "full AI with full visual building" | nowa.dev (snippet) |
| On the agent | "In Nowa the agent is how you build, not an assistant bolted on next to it. It generates UI, edits components, fixes bugs, connects data sources, and answers questions about your own project." | nowa.dev/compare/flutterflow/ (snippet) |
| Brief (internal) | Helps non-developers build modern Flutter apps in exact detail without learning Flutter, by combining a full AI agent with full visual editing; real Flutter code they own. | `_rewrite/BRIEF.md` |

**Proposed one-liner for the docs** (consistent with all of the above, no claims beyond them):

> **Nowa is a visual Flutter app builder with a full AI agent.** Describe your app and watch Nowa AI build it
> on your board, then shape every detail visually. Everything you make is real Flutter code you own.

Short form for the docs home hero: **"Build the exact app you imagine."** + one line: "Nowa AI builds it, you
refine every detail visually, and the Flutter code is yours."

## 2. Audience

- **Primary: non-developers with an app idea** (the site speaks to anyone with an idea). nowa.dev FAQ:
  "Do I need to know Flutter? No — all you need is an idea and some creative energy" (snippet). The showcase
  (nowa.dev/showcase/, "Made with Nowa") highlights an app built by one person with no IT or coding background.
- **Secondary: developers and teams who want speed without lock-in.** "Download the full source anytime and
  edit any part by hand"; "on a local project you can keep Nowa and VS Code pointed at the same folder" (compare
  page, snippet). Plus Git, custom code, importing existing Flutter projects.
- **Teams, agencies, enterprises:** custom plans via `team@nowa.dev` / enterprise contact; "Connect your own
  agent" (Claude Code, Claude Desktop, Cursor) is **Enterprise only** (`docs/new/whats-new.md:104-110`, What's
  New 3.12.0).
- **Comparison shoppers:** nowa.dev has a compare hub (nowa.dev/compare/, "Compare AI App Builders, Visual
  Builders and Coding Tools") with pages vs FlutterFlow and vs Replit, and positions against Lovable/v0 (web-only
  React) and Cursor/Claude Code (developer tools). Key contrasts it draws: AI-first vs visual-first (FlutterFlow),
  "connects to a backend rather than being one" (Replit), "only Nowa ends with an App Store listing" (Lovable).

## 3. Key value props (as nowa.dev presents them)

1. **A full AI agent that builds the app.** Planning first: "describe the app you want and answer a few quick
   questions, then review the plan it comes back with. After approving it, the AI builds your screens right on
   the board — and if your app needs a backend, it sets that up too, with Supabase, Firebase, or any API"
   (snippet).
2. **Full visual editing of everything the AI makes.** "Edit any AI-generated UI or logic visually"; "you can see
   all the widgets and components visually, so you can understand and modify the project without reading code"
   (snippets).
3. **Real Flutter code you own, no lock-in.** "Nowa generates standard Flutter against standard libraries, and
   code download is on every plan including the free one" (compare page, snippet); Nowa "can open an existing
   project rather than only emit one".
4. **See it run instantly.** "A built-in previewer that plays the app immediately (no build step)"; "on Nowa
   Desktop you get real Flutter hot reload against a simulator or phone" (snippets).
5. **Ship everywhere.** "Publish to the App Store, Google Play, or the web in a click — and own your source code";
   one project for iOS, Android, web and desktop (snippets).
6. **Integrations.** Supabase (incl. the Supabase MCP for the agent), Firebase, Stripe, RevenueCat, Xano, Google
   Sheets, OpenAI, Gemini, Postman, Swagger (snippets); Figma for Nowa AI (What's New 3.12.3).
7. **Start free; work locally if you want.** "The Starter plan is free"; "Local projects are available on every
   plan through Nowa Desktop" (snippets). Plan names seen on nowa.dev: **Starter, Launch, Scale, Enterprise**
   (no numbers recorded; code defaults the plan name to `'Starter'`, `packages/core/lib/src/billing/widgets/usage_settings_page.dart:313`).
8. Business claims to keep **out of the docs** (they belong on nowa.dev/pricing): "Nowa never takes a cut of your
   app's revenue"; daily AI credits.

## 4. Marketed feature list (nowa.dev) vs what the code confirms

| Marketed on nowa.dev | Code check (v3.12.5) | Note for writers |
|---|---|---|
| AI agent: generate screens/features, edit, fix bugs, connect data | AI modes **Design / Plan / Agent** (`packages/ai/lib/src/assistant_options_manager.dart:18-22`) | Document the three modes by their UI names. |
| Planning mode | **Plan** mode: "For planning complex tasks before building" (`packages/ai/lib/src/ui/chat_field/mode_selector.dart:38`) | Site says you *start* in planning mode, but the dashboard defaults to **Design** and marks it recommended (`lib/dashboard/dashboard_page.dart:50`, `:222`). Docs follow the product. |
| Builds your screens "on the board" | Board UI: "The Design Board" (`lib/project/onboarding/onboarding_step.dart:62`) | "board" is the canonical term. |
| Visual editing of UI and logic | Widget Palette, properties, Circuit ("Open in Circuit", `packages/core/lib/src/fields/field_link_menu.dart:389`) | Feature researchers confirm current logic UI. |
| Instant preview, no build step | Run menu "Embedded preview" (`onboarding_step.dart:92-95`); right-click → **Play** (What's New 3.12.5) | See vocabulary: Instant Play. |
| Hot reload on simulators/devices with Nowa Desktop | "Get the Nowa desktop app for macOS or Windows to run this app on real devices and emulators." (`lib/project/run/run_button.dart:655`) | Badge **Desktop app only**. |
| Publish to App Store, Google Play, web | Cloud build workflows for Android and iOS link to the deploy docs (`packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:679`, `:711`); web build settings (`packages/core/lib/src/settings/cloud_build/web_build_settings.dart:85`); deployment settings (`packages/core/lib/src/settings/deployment_settings.dart:94`) | Plan gating per code only. |
| Custom domains (old docs intro) | Exists, gated: "Custom domains are available on higher plans. Upgrade to use your own domain." (`packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:50`) | Say "needs a higher plan" + link pricing. |
| Download full source code | (feature researchers) | Don't state plan entitlement unless code enforces it. |
| Open existing projects | "Import project" / "Bring an existing Flutter project into Nowa." (`lib/dashboard/create_new_project/import_project_dialog.dart:218-219`); "Clone from GitHub" (`lib/dashboard/create_new_project/github_clone_dialog.dart:261`) | |
| Supabase, Firebase, Stripe, RevenueCat, Xano, Postman, Swagger | UI strings found for each | |
| **Google Sheets, Gemini** (as app integrations) | **No dedicated UI found.** Gemini appears only as the AI backend model (`packages/ai/lib/src/agent/agent.dart:66`) | Do not document as integrations unless feature research finds them (likely "via REST API"). Open question. |
| Figma | Figma connected account (`packages/core/lib/src/figma/figma_settings_section.dart:52`), What's New 3.12.3 | AI section. |
| Marketplace / templates | Marketplace screen is titled **"Sample Projects"** (`lib/dashboard/market_place/marketplace_view.dart:155`); "Create Screen … or drop a template" (`onboarding_step.dart:71`) | Reachability of Sample Projects to confirm. |
| Works on mobile browsers | What's New 3.10.5; mobile UI under `lib/project/nowago/` | "Nowa GO" native app is "still in private beta" (`docs/new/whats-new.md:200`): don't document. |

## 5. Product vocabulary (site vs app vs What's New) and what the docs should use

| Term | nowa.dev | In the app (code) | What's New | **Docs should use** |
|---|---|---|---|---|
| **Nowa AI** | yes ("Nowa AI's planning mode") | "Top up your account to continue using Nowa AI if you hit a limit." (`usage_settings_page.dart:127`); mobile hint "Ask Nowa AI…" (`lib/project/nowago/sheet_panel.dart:253`) | yes (17×) | **Nowa AI** for the feature; "the agent" or "the AI" in running text. |
| **AI agent** | yes ("the agent is how you build") | Tour step **"AI Agent"**: "Use the AI agent to build, edit, or fix anything…" (`onboarding_step.dart:82-85`); panel id `'Assistant'` (`packages/core/lib/src/panels/panel.dart:32`) | yes | "AI agent". Avoid "Chat", "AI Assistant" (old docs). Confirm the sidebar tooltip. |
| **Design / Plan / Agent** (modes) | "planning mode" | Chips **Design**, **Plan**, **Agent**; descriptions "Create/refine the look and flow without logic", "For planning complex tasks before building", "For everything, from design to functionality" (`mode_selector.dart:37-39`); tooltip "Switch mode" (`:51`); dashboard Design description "Design the look and flow before making it functional" (`dashboard_page.dart:223`), shown with a **Start here** badge (`packages/nowa_ui/lib/src/components/option_chip.dart:159`, `:186`) | "Planning Mode", "Agent Mode" | **Design mode, Plan mode, Agent mode** (UI label + "mode"). |
| Chat placeholders | | Design "Describe the app you want to build...", Plan "What would you like to plan?", Agent "Build something wild..." (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:235-237`) | | Quote when showing the chat box. |
| **Instant / Thinking / Deep Thinking** | | Thinking levels, tooltip "Switch thinking level" (`packages/ai/lib/src/agent/agent.dart:22-27`, `packages/ai/lib/src/ui/chat_field/tier_selector.dart:29`) | | Use as-is. |
| **Make it real** | | Card that hands a finished design to Agent mode (`packages/ai/lib/src/ui/guided_inline_views.dart:108`) | | Use in the Design-mode page. |
| **Board** | yes ("right on the board") | "The Design Board" (`onboarding_step.dart:62`), "Boards" (`lib/tabs_view.dart:69`), "Add board" (`lib/project/panels/files_panel/files_list.dart:511`), "Create new board" (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:350`), "Back to Board" (`packages/designer/lib/src/widgets/back_to_board_button.dart:14`) | yes (50×) | **board** (lowercase in text). Never "canvas" for the same thing. |
| Screen, component, widget | yes | "Screens & Components" (`onboarding_step.dart:109`), "Widget Palette" (`:76`) | "Widgets panel" | screen / component / widget. Widget Palette vs Widgets panel naming: feature research to settle (3.13 renames it "Library", see `_rewrite/decisions.md` D1). |
| **Instant Play** | "plays the app immediately" | **Not a UI string.** UI: right-click → **Play**; Run menu "Embedded preview" (`onboarding_step.dart:93`); tooltip "In board preview is not 100% accurate, run the app to see the real output" (`packages/designer/lib/src/play_mode/play_mode.dart:539`) | yes (3.12.5) | Use **Instant Play** as the feature name (it is current in What's New) and always give the UI action (**Play**). Open question Q-P2. |
| **Pure UI** | **not found** in the nowa.dev index | **not found** in master or dev code | not found | **Do not use.** Open question Q-P1. |
| Circuit | not in homepage snippets | "Open in Circuit" (`field_link_menu.dart:389`) | yes (9×) | Keep for the visual logic editor if feature research confirms it is current. |
| **Nowa Desktop** / desktop app | "Nowa Desktop" | "Download Desktop App" (`packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:184`), "Download desktop app" (`lib/dashboard/create_new_project/new_project_dialog.dart:272`), "Or download Nowa Desktop for automatic updates" (`lib/update_required_screen.dart:56`) | "desktop app" | "the desktop app (Nowa Desktop)"; badge **Desktop app only**. |
| Cloud / local project | "local project" | "Local projects are only available in the desktop app." (`new_project_dialog.dart:267`) | yes | cloud project / local project; badges **Cloud projects only** / **Local projects only**. |
| Hybrid Approach | (describes Nowa + VS Code, no name) | "Nowa Hybrid Approach – Full Guide" (`lib/dashboard/learning_resources/learning_resources_view.dart:86`) | yes | Title pages by task ("Use Nowa with VS Code"), keep "Hybrid Approach" as a search alias. |
| Data Sources, Themes, Git, Project Settings | | Tour steps (`onboarding_step.dart:100`, `:134`, `:118`, `:126`) | | Use exactly. |
| Playground | | `/playground`: "No auth gate: the playground is the one editor anyone can open." (`lib/router.dart:267-268`) | | Possible "try it without an account" link; confirm with team (Q-P4). |
| Plan names | Starter, Launch, Scale, Enterprise | default `'Starter'`; others come from the server | "Starter" | Name a plan only where the code gates on it (D3). |

## 6. CTAs and URLs

| Purpose | URL | Evidence |
|---|---|---|
| Website | https://nowa.dev | nowa.dev; docs footer "Main website" (`docusaurus.config.js:163-164`) |
| Sign up | https://app.nowa.dev/signup | route `lib/router.dart:192`; docs navbar **Get Started** (`docusaurus.config.js:145-147`). Sign-up screen: "Create your account" / "Enter your details to start building with Nowa" (`lib/auth/auth_view.dart:446`), **Continue with Google** (`lib/auth/auth_widgets.dart:575`), **Continue with Apple** (`lib/auth/auth_widgets.dart:534`), **Create account** (`lib/auth/auth_view.dart:522`) |
| Sign in / app | https://app.nowa.dev (`/signin`; `/login` redirects to it) | `lib/router.dart:186-190`; docs navbar **Sign In** (`docusaurus.config.js:150-152`) |
| Try without an account | https://app.nowa.dev/playground | `lib/router.dart:267-268` (Q-P4 before linking) |
| Start from a prompt (deep link) | `https://app.nowa.dev/prompt-to-app?prompt=…&mode=design|plan|agent` (sign-in required) | `lib/router.dart:278-287`; built by `lib/dashboard/dashboard_page.dart:211` |
| Pricing | https://nowa.dev/pricing | in-app link `packages/core/lib/src/settings/credits_settings.dart:609`; indexed as nowa.dev/pricing/ |
| Enterprise / custom plans | `team@nowa.dev`; enterprise contact page indexed at both nowa.dev/enterprise-contact and www.nowa.dev/contact-from | What's New; `lib/project/onboarding/completion_dialog.dart:61`. Canonical page unclear (Q-P3) |
| Download desktop app | **No public download URL in code.** In the web app: dashboard sidebar **Download Desktop App** → dialog **Download Nowa** with **MacOS** / **Windows** | `dashboard_side_bar.dart:184`, `packages/core/lib/src/dialogs/download_nowa_dialog.dart:19,51,68`. No nowa.dev download page found in the index |
| Discord | https://discord.gg/ByKfn3H7gX | `learning_resources_view.dart:36`, `completion_dialog.dart:20`, `docusaurus.config.js:184-185` |
| YouTube | https://www.youtube.com/@nowadev (same channel as https://www.youtube.com/channel/UCvP7LKeb2sW1yTUqHAFEKOw) | `completion_dialog.dart:19`, `lib/widgets/help_icon.dart:49-50` |
| 3-minute quick guide video | https://www.youtube.com/watch?v=oSwV3f9ls7U | `lib/project/onboarding/welcome_dialog.dart:13` ("Watch a 3-min quick guide on YouTube", `:49`) |
| Community forum | https://community.nowa.dev/ | `help_icon.dart:57-58` |
| Docs | https://docs.nowa.dev | `help_icon.dart:53-54`, `lib/dashboard/dashboard_page.dart:197` |
| Blog | https://nowa.dev/blog/ (current posts, e.g. Gemini 3.7 Flash upgrade, daily limits, "Why We Built Our Own Flutter Runtime"); https://blog.nowa.dev (older posts) | search index. Current intro links the old one (`docs/getting-started/introduction.md:145`) |
| Showcase | https://nowa.dev/showcase/ ("Made with Nowa") | search index |
| Compare | https://nowa.dev/compare/ , /compare/flutterflow/ , /compare/replit/ | search index |
| About | https://nowa.dev/about/ | search index |
| Terms / Privacy | https://www.nowa.dev/terms-and-conditions , https://nowa.dev/privacy-policy | `lib/auth/auth_view.dart:500`, `web/js/consent.js:67` |
| Referral | `https://app.nowa.dev/?ref=<code>` (**Invite a Friend**) | `packages/ai/lib/src/models/credits_models.dart:117`, `dashboard_side_bar.dart:164` |
| Promo (don't document) | https://nowa.dev/free-weekend/ | `packages/ai/lib/src/models/free_weekend_model.dart:16` |
| Outdated (don't link) | https://ai.nowa.dev ("Nowa 3.0", a coming-soon page) | search index |

In-app help entry points the docs can point to (exact labels):
- Help menu: **Tutorials**, **Documentation**, **Community**, **Shortcuts**, **Report an issue**, **Share feedback**
  (`lib/widgets/help_icon.dart:49-69`).
- Dashboard sidebar: **Upgrade your plan**, **Invite a Friend**, **Download Desktop App** (web only),
  **Hire an Expert**, **Learning Resources**, **Settings** (`dashboard_side_bar.dart:149-208`).
- Learning Resources cards: **Discord Community**, **Video Tutorials**, **Documentation**, **Community**
  (`learning_resources_view.dart:38-65`).
- First-run: "Welcome to Nowa!", "Let's get you building in under a minute.", **Take the quick tour**
  (`welcome_dialog.dart:25-37`); end of tour: "You're all set!", **Explore more features**, **Start building**
  (`completion_dialog.dart:34-82`).
- Dashboard start: "What do you want to build?" (`packages/nowa_ui/lib/dashboard/describe_app_panel.dart:593`),
  placeholder "Describe the app you want to build..." (`:424`), send button tooltip **Build it** (`:468`),
  "Or try an example prompt" (`:555`), "More ways to start" (`:637`) with **Learn how Nowa works** and
  **Start from Scratch** (`lib/dashboard/dashboard_page.dart:317-326`).

## 7. Current docs vs positioning: gaps and outdated claims

### `docs/getting-started/introduction.md` (947 words, 12 emoji H3 sections, no screenshots)

| Line | Current claim | Verdict | Evidence / fix |
|---|---|---|---|
| 4 | "insanely fast" (description) | Tone | Hype word; use the site's calmer "Build the exact app you imagine". |
| 24 | "AI built for Flutter — not a generic model" | **Wrong/risky** | The agent runs on Gemini models (`packages/ai/lib/src/agent/agent.dart:66`; What's New, 13 Aug 2026). Say what it does ("knows Flutter and your project"), not what model it is. |
| 25, 45 | Logic editor "Circuit" | Check | Still in code ("Open in Circuit"); homepage no longer names it. Feature research decides prominence. |
| 47-49 | "Instant App Preview… click **Play**" | Partly outdated | Name it Instant Play (What's New) and give current actions: hover a screen and hit play (`docs/new/whats-new.md:251`), right-click → **Play** (`:27`), Run menu → Embedded preview. |
| 60-63 | Local projects and desktop app | Accurate | Add badge **Desktop app only** (`new_project_dialog.dart:267`). |
| 67 | Nowa + VS Code "sync instantly both ways" | Needs scope | nowa.dev says this for **local projects**; the docs must say so too. |
| 79 | Integrations include **Airtable** | **Unconfirmed** | Only an internal endpoint exists (`packages/core/lib/src/dialogs/dialog_data_sender.dart:10`). Drop it; list integrations from feature research (nowa.dev lists Xano, Stripe, RevenueCat, OpenAI…). |
| 83-84 | Deploy "with a single click", custom domains | Partly | Custom domains need a higher plan (`custom_domain_section.dart:50`). |
| 86-87 | "Templates & Marketplace" | Unverified | Code calls it "Sample Projects" (`marketplace_view.dart:155`); confirm it is reachable. |
| 102 | "better app building" | Tone | Empty superlative. |
| 105-119 | **Plans**: free-plan list incl. a **monthly AI message allowance** | **Outdated + violates D3** | AI usage is now granted per period with "Resets in …" (`usage_settings_page.dart:252`); nowa.dev moved to daily limits. Remove all allowances; link https://nowa.dev/pricing. |
| 145 | Blog → blog.nowa.dev | Outdated | New posts live at nowa.dev/blog/. |
| (missing) | — | **Gaps** | Nothing about: the prompt-first dashboard; the **board**; AI modes **Design / Plan / Agent**, thinking levels, **Make it real**; giving the AI context (select a widget, attach, images); Figma and Supabase connections for Nowa AI; the Problems panel; sharing a preview link; import / clone from GitHub, workspaces and monorepos; Sign in with Apple; mobile browser support; Connect your own agent (**Enterprise**). |

Structure problems: 12 parallel "why we're different" sections with emoji, no single path to "build your first
app", repetition (code freedom appears 4 times), no visuals.

### `docs/index.md` (docs home, 202 words)

- Opening line "Welcome to Nowa, the place to build great Flutter apps fast with much fun." (`docs/index.md:10`):
  no positioning, ungrammatical.
- 13 cards mirror the old folders. "Build with AI" is second; the grid has no "Build your first app" start path,
  no Troubleshooting, no Account and plans, and no glossary. "Tutorials and Templates" points at legacy content.
- Typos: "nativly" (`:55`), lowercase "learn using Circuit" (`:30`).

### Other getting-started pages (spot check against code)

- `docs/getting-started/quickstart.md:11-37`: "yellow **New Cloud Project** button", "**Chat** icon", "**Send**".
  **New Cloud Project** and **Chat** don't exist in v3.12.5 (no such string literal in `lib/` or `packages/`);
  **Send** survives only as the tooltip of the AI chat's send button (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:682`,
  which shows "Abort" while the AI works, `:680`). The dashboard is now prompt-first ("What do you want to build?" → **Build it**), and a new project opens with
  the prompt already sent to Nowa AI (`lib/dashboard/create_new_project/prompt_to_app_page.dart:8-16`).
- `docs/getting-started/install.md:13-67`: says sign-up works "in two ways" (no Apple), button "Create Account"
  (UI: "Create account"), and a "Let's Get Started" welcome button (not found in code).

### In-app links into the docs (constraint for the new IA)

The released app links to **43 distinct docs deep links** plus the docs home; dev (3.13) has the same set. 32 are
widget help links (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart`, field `docUrl`); the rest come from
deploy, Git, local setup and data dialogs (for example `packages/core/lib/src/settings/editor_settings/local_setup.dart:189`
→ `/local-project-simulator/createlocalproject#setting-up-flutter-sdk`, and
`packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:525` → `/deployment/ios-deploy#apple-distribution-certificate`).
Today **14 of those widget links land on "Coming soon" stub pages** (15 of the 35 widget pages are stubs), and
the **Switch** link (`widgets_to_add.dart:623` → `/ui/widgets/widget-desc/switch`) is a **404** (no such file).
The new IA must redirect every one of these URLs, anchors included. (See reference-ia.md, Recommendation.)

## Open questions

- **Q-P1** "Pure UI": not on nowa.dev (as indexed), not in code (master or dev), not in the docs. Is it a planned
  term? Until confirmed, the docs don't use it.
- **Q-P2** Preview naming: What's New says **Instant Play**; the Run menu says **Embedded preview**; old docs say
  "Instant Preview" and "Play mode". Which name should the docs standardize on? (Proposed: Instant Play, always
  with the UI action.)
- **Q-P3** Canonical enterprise contact page: nowa.dev/enterprise-contact or www.nowa.dev/contact-from?
- **Q-P4** May the docs link the no-account **Playground** (`app.nowa.dev/playground`) as a "try it" entry point?
- **Q-P5** nowa.dev says users *start in planning mode*; the app defaults to Design mode. Which should the
  quickstart teach? (Docs follow the product, Design, unless told otherwise.)
- **Q-P6** Is there a public desktop download page on nowa.dev? None was found; the docs would otherwise point
  to **Download Desktop App** inside the web app.
- **Q-P7** Google Sheets and Gemini are marketed as integrations, but no dedicated UI exists. Are they meant as
  "via REST API" examples?
