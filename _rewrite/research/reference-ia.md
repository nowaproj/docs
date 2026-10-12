# Reference information architectures, and a recommended structure for the Nowa docs

Researcher: positioning + reference IA subagent. Date: 2026-10-06. Companion file: `positioning.md`.

## Method and limits (read first)

- **Every reference docs site was blocked** by the session's egress policy (curl `CONNECT … 403`, WebFetch
  `EGRESS_BLOCKED`): docs.flutterflow.io, framer.com, help.webflow.com, manual.bubble.io, docs.lovable.dev,
  support.bolt.new, docs.draftbit.com. Nothing was routed around the block.
- **Section lists come from web search results** restricted to each domain: page titles and URL paths are exact.
  Where the sidebar *order* could not be seen, it is marked **(order inferred)**.
- **Dreamflow is verified from source.** FlutterFlow's public repo `FlutterFlow/dreamflow-documentation` was
  readable through raw.githubusercontent.com and github.com: its sidebar is quoted verbatim below. (FlutterFlow's
  own docs repo, `FlutterFlow/flutterflow-documentation`, now returns 404 and `add_repo` was refused, so its
  structure is from search only.)
- Page lengths are measured only for Dreamflow (WebFetch's analysis of the raw Markdown, approximate) and for the
  current Nowa docs (script over `docs/`). For the others, page anatomy is described from search snippets.
  Lengths stated without a measurement are labelled **estimate**.
- Bolt and Draftbit were not researched beyond the reachability test. Dreamflow was added instead because it is
  the closest analog to Nowa (AI agent + visual editing + code, for Flutter).

## At a glance

| Docs | Top-level sections, in order | Learn vs look up | AI | Integrations | Test / deploy | Troubleshooting | Glossary |
|---|---|---|---|---|---|---|---|
| **FlutterFlow** | Getting Started · FlutterFlow UI · Resources · Concepts · Integrations · Generated Code · Testing · Deployment · Exporting / CLI · Collaboration · Marketplace · Accounts & Billing · Troubleshooting · Misc **(order inferred)** + separate Designer space | Concepts vs Resources (reference) | Concepts → AI Agent; CLI pages; Designer space | by vendor | separate Testing and Deployment | own section + FAQs on pages | no |
| **Dreamflow** | Welcome · Getting Started · Workspace · Test & Publish · Integrations · Debugging · Concepts (**verified**) | tiny; Concepts last | Workspace → Agent Panel; Concepts → Prompting | by vendor | one section | own "Debugging" section + FAQ on pages | no |
| **Lovable** | Introduction · Features · Integrations · Prompting · Tips & tricks · Glossary · Changelog · API reference **(order inferred)** | Features (how-to) vs Glossary / API | modes are the core of Features | by vendor | Publish, custom domain under Features | per-page sections + debugging guide | **yes** |
| **Bubble** | Introduction · New? Start Here · User Manual · Core Reference · The Glossary | explicit two books | (not researched) | in Core Reference / plugins | Maintaining an application | inside Testing and debugging | **yes** |
| **Framer** | Help: Get started · Agents · Canvas · Data · Enterprise · Localization · Publishing (+ Academy courses) | Help (Q&A) vs Academy (video) | **"Agents" is category 2** | in Data | Publishing | Q&A articles | no |
| **Webflow** | Getting started · AI · Accounts & Workspaces · Billing, plans, & pricing · Design & accessibility · Enterprise features · Hosting & domains · Site management & SEO · CMS & dynamic content · Analyze · Optimize · Localize · Forms & Logic · Ecommerce & User Accounts · Marketplace & integrations (+ University) | Help Center vs University | **"AI" is category 2** | Marketplace & integrations | Hosting & domains | inside articles | no |

## 1. FlutterFlow — docs.flutterflow.io (Docusaurus)

**Top-level sections (order inferred from URL paths in search results):**
1. **Getting Started**: `/` ("Getting Started"), `/quickstart/` ("Quickstart Guide"), `/before-you-begin/setup-flutterflow/`,
   `/getting-started/...` (dashboard, resources).
2. **FlutterFlow UI**: `/flutterflow-ui/builder/` ("App Builder"), `/flutterflow-ui/canvas/`, `/flutterflow-ui/toolbar/`,
   `/flutterflow-ui/resource-hierarchy/`.
3. **Resources** (the reference layer): `/resources/projects/...`, `/resources/ui/pages|components|widgets/...`,
   `/resources/data-representation/app-state/`, `/resources/functions/action-blocks/`, `/resources/backend-logic/rest-api/`,
   `/resources/forms/textfield/`.
4. **Concepts**: `/concepts/state-management/`, `/concepts/navigation/tabbar/`, `/concepts/layouts/wrap/`,
   `/concepts/custom-code/...`, `/concepts/ai-agent/` ("AI Agent").
5. **Integrations**: `/integrations/authentication/...`, `/integrations/database/...`, `/integrations/firebase/connect-to-firebase/`,
   `/integrations/supabase/setup/`, `/integrations/payments/revenuecat/`, `/integrations/gemini/`.
6. **Generated Code**: `/generated-code/state-management/`, `/generated-code/page-model/`.
7. **Testing**: `/testing/run-your-app/`, `/testing/local-run/`, `/testing/dev-environments/`.
8. **Deployment**: `/deployment/apple-app-store-deployment/`, `/deployment/google-playstore-deployment/`,
   `/deployment/web-publishing/`, `/deployment/pre-checks-before-publishing/`, `/deployment/deploy-from-github/`.
9. **Exporting and CLI**: `/exporting/ff-cli/`, `/flutterflow-cli/build/` ("Build with AI Agents"),
   `/flutterflow-cli/claude-code/` ("Claude Code Plugin"), `/flutterflow-cli/codex/` ("Build with Codex").
10. **Collaboration**: `/collaboration/branching/`. 11. **Marketplace**: `/marketplace/creators-hub/...`.
12. **Accounts & Billing**: `/accounts-billing/plan-pricing/`, `/accounts-billing/subscriptions/...`.
13. **Troubleshooting**: `/troubleshooting/testing-your-app`. 14. **Misc**: `/misc/customer-support-policy/`.
- Separate **Designer** space for the AI design product: `/designer/` ("Welcome"), `/designer/quickstart/`,
  `/designer/prompting/`, `/designer/export/`.
- The docs home groups "Explore Resources" (Projects, UI Building Blocks, Data Representation, Control Flow &
  Logic, Naming Variables & Functions) and "Building Concepts" (Design System, Layout, State Management) (snippet).

**How it separates the layers:** getting started = Getting Started + Quickstart + a UI tour; concepts = Concepts;
how-to steps live inside Resources and Integrations pages; reference = Resources + Generated Code; integrations,
testing, deployment and troubleshooting each get their own section.

**Widget reference:** "Introduction to Widgets" (`/resources/ui/widgets/`) → group pages ("Basic Widgets",
"Built-in widgets" e.g. Dividers, "Composing widgets" → "Rows, Column & Stack") → single-widget pages (e.g.
Container) for rich widgets only. Shared settings are factored into **"Common Widget Properties"**
(`/resources/ui/widgets/widget-commonalities/`) and "Widget Properties", so widget pages only cover what is unique.
Weak spot: some widgets live where they are used (TabBar and PageView under `/concepts/navigation/`, Wrap under
`/concepts/layouts/`, TextField under `/resources/forms/`), so a widget page is hard to guess.

**What makes it guessable:** section and page names reuse the builder's own nouns. The App Builder page names
"four main sections: Navigation Menu, Toolbar, Canvas, and Properties Panel" and the Navigation Menu items
(Widget Palette, Page Selector, Widget Tree, Storyboard) (snippet). Integrations are named by vendor, deployment by
store.

**Page anatomy:** short definition first ("The Container widget is a highly versatile widget…"), then settings or
steps, screenshots, admonitions, and FAQ sections at the end (the API Calls page answers "Predefined Paths don't
show options"; Local Run has fixes for "Command not found: flutter"). The quickstart states the prerequisites and
time up front ("a FlutterFlow account, a web browser, and about 15-20 minutes") and starts from a clonable starter
project. The same team uses interactive Arcade walkthroughs (demo.arcade.software iframes, confirmed in the
Dreamflow repo below). Length **estimate**: 500-1,500 words per page.

**Avoid:** old URL schemes are still indexed beside the new ones (`/widgets-and-components/...`,
`/data-and-backend/...`, `/settings-and-integrations/...`, `/customizing-your-app/...`), which splits search results;
paths nest 4-5 levels deep.

## 2. Dreamflow — docs.dreamflow.com (Docusaurus, verified from `FlutterFlow/dreamflow-documentation`)

**Sidebar (verbatim from `sidebars.ts`):** `Welcome` (doc `index`) · `Getting Started` (`get-started`) ·
`Workspace` (`workspace`) · `Test & Publish` (`test-and-publish`) · `Integrations` (`integrations`) ·
`Debugging` (`debugging`) · `Concepts` (`concepts`). Every category is `autogenerated` from its folder and
`collapsed: false`, so the whole map is always visible.

**Pages:** `get-started/quickstart.md`; `workspace/` → `workspace.md`, `agent-panel.md`, `content-panel.md`,
`properties-panel.md`, `screen-planner.md`, `modules-panel/`; `test-and-publish/` → `test/`, `publish/`;
`integrations/` → `firebase.md`, `supabase.md`, `git.md`; `debugging/layout-errors.md`;
`concepts/prompting-effectively.md`. About 15 pages in all.

**How it separates the layers:** one quickstart; the interface tour is one page per panel ("Workspace"); testing
and publishing share a section; debugging has its own; "Concepts" holds a single page, on prompting. There is no
widget reference: it relies on Flutter's own docs.

**Page anatomy (measured):**
- `quickstart.md`: frontmatter `slug`, `title`, `description`, `tags`, `keywords`, `sidebar_position`; about
  650 words. H2s are the three ways to start ("Start With a Prompt", "Start from Scratch", "Start from a
  Template"), with sample prompts as H4s; 3 screenshots, 3 Arcade embeds, one 3-step list; no admonitions.
  It opens with "When starting a new Dreamflow project you have three options: …".
- `agent-panel.md`: one H2/H3 per capability (Agent Context, Image Attachments, Screenshot Mode, Add to Agent,
  Prompt Edit, App Logs, Project Rules, Restore Checkpoint, OpenAI Integration) and a closing **FAQ**; 6 Arcade
  embeds, 4 info/warning admonitions, 5 numbered step lists, 3 code blocks. It is long (the tool estimated about
  2,800 words).

**Why it matters for Nowa:** its three starting paths match Nowa's dashboard (a prompt box, then "More ways to
start" → **Learn how Nowa works** / **Start from Scratch**, `lib/dashboard/dashboard_page.dart:317-326` in
nowa-master). Its flat, always-expanded map is easy to scan.

## 3. Lovable — docs.lovable.dev (Mintlify)

**Sections (from URL paths and titles; order inferred):**
- **Introduction**: `/introduction/welcome`, `/introduction/getting-started` ("Quick start"),
  `/introduction/create-an-account`, `/introduction/faq`, `/introduction/video-tutorials`,
  `/introduction/subscription-plans`, `/introduction/credits-and-usage`, `/introduction/support-policy`.
- **Features**: "Implement changes in Build mode" (`/features/agent-mode`), "Plan a change in Plan mode",
  "Work with Lovable in the project chat", "Edit from the preview" (`/features/design`), "Design systems",
  "Define workspace and project knowledge", "Test and verify your app", "Publish your Lovable project",
  "Set up a custom domain", "Lovable workspace", "Manage workspace members from the People tab", "Collaboration",
  "Workspace security center".
- **Integrations**: "Connect to Supabase", "Connect your own Stripe account", "Lovable API", "Lovable MCP server".
- **Prompting**: "Prompting best practices", "Debug and improve your app", "Prompt library".
- **Tips & tricks**: "How to build a real product with Lovable", self-hosting, "Launch your site on a custom domain",
  troubleshooting.
- **Glossary**, **Changelog**, **API reference**, plus an `/AGENTS` page written for AI agents.

**How it separates the layers:** getting started = Introduction (the quick start defines account, workspace and
project in three lines); how-to = Features, all **task-titled**; concepts = Glossary + Prompting; reference =
Glossary + API reference; publishing lives in Features; troubleshooting = a "Troubleshooting" section at the end of
feature pages (e.g. "If a domain status shows 'Unable to verify'…", "If the Cloud view shows a 'Supabase
connection issue'…") + a debugging guide ("use 'Try to fix' once or twice… then switch to Plan mode").

**Component reference:** none (the AI writes the code); a "Design systems" page instead.

**What makes it guessable:** page titles are the task in the user's own words, verb first ("Connect to Supabase",
"Set up a custom domain", "Publish your Lovable project"). The modes are documented under their exact UI names,
and the glossary records renames ("Build mode … previously Agent mode"; the "Preview toolbar … replaces the older
Visual edits panel"), so old terms still lead somewhere.

**Page anatomy:** title + one-line description; a short intro; steps; notes and tips; a closing troubleshooting
block of symptom → fix. The quick start promises time and outcome ("about ten minutes, from your first prompt to a
live URL you can share. There is nothing to install and nothing to configure") and teaches one habit ("Ask for one
change at a time and check the preview after each"). Length **estimate**: 300-900 words.

## 4. Bubble — manual.bubble.io (GitBook)

**Top level:** Introduction · **New? Start Here** · **User Manual** (`/help-guides/`) · **Core Reference**
(`/core-resources/`) · **The Glossary**.
- User Manual: Getting started (what Bubble is, building your first app, "The Bubble editor" → "Tabs and
  sections" → "Design tab" → "The property editor", custom domain and DNS, "Transitioning to Bubble from…",
  "Mobile app quick start guide"), Design (Elements, Responsive design, Styles), Data (the database), Logic
  (Workflows → Actions), Maintaining an application (Testing and debugging → "The debugger", "The server logs";
  Version control).
- Core Reference: Bubble's interface (Design tab, Data tab, Toolbar, "Deployment & Version Control Dropdown
  (legacy)"), Elements (e.g. Containers), Actions (Account, Element), Events (Custom events), Data (Operators and
  comparisons), Application Settings, API (The Workflow API).

**How it separates the layers:** the manual says it outright: "the User Manual with long-form articles for learning
and in-depth explanation of tools and concepts" versus "the Core Reference with short, technical documentation
covering all properties, settings and technical details". The glossary links to both.

**Element reference:** Core Reference → Elements (every property, by element group); the User Manual → Design →
Elements explains the ideas.

**What makes it guessable:** two modes, learn or look up. The reference mirrors the editor's tabs, so you find a
setting by where it lives in the editor. Outdated UI is labelled "(Legacy)" instead of mixed in.

**Page anatomy:** User Manual pages are long-form, multi-section chapters ("read it from beginning to end, or pick
the chapters that interest you the most"); Core Reference pages are short property lists. Length **estimate**:
manual chapters 1,500-3,000 words, reference pages 200-600.

## 5. Framer — framer.com/help + framer.com/academy

**Help Center categories, as listed:** Get started (10 articles) · **Agents** (9) · Canvas (16) · Data (12) ·
Enterprise (16) · Localization (15) · Publishing (20) (snippet, may be partial).
**Academy:** courses ("Framer Fundamentals", 4h 6m; "Framer CMS Basics", 26 min; "Get Started with Framer Agents")
and lessons ("Learn the Framer interface", "Prompt, build and publish your first site with Framer"); topics: Basics,
Agents, CMS, Publishing, Animations, Layout, Content, SEO & AEO, Design Systems.

**How it separates the layers:** Help = short task and question articles ("How to use Agents", "How to build a
website from scratch with Framer Agents", "What you can do with Claude Code, Codex in ChatGPT, and other External
Agents"); learning = Academy video courses; no formal reference.

**What makes it guessable:** few, broad categories with article counts; the AI category sits right after Get
started; titles are the question the user would ask.

**Page anatomy:** short article; exact UI path in bold ("select **Agent** in the right-hand Properties panel");
practical tips ("start by generating a single section instead of an entire page", select a section to give the
Agent context, attach a reference image). Length **estimate**: 300-800 words.

## 6. Webflow — help.webflow.com + university.webflow.com

**Help Center categories, as listed:** Getting started · AI · Accounts & Workspaces · Billing, plans, & pricing ·
Design & accessibility · Enterprise features · Hosting & domains · Site management & SEO · CMS & dynamic content ·
Analyze · Optimize · Localize · Forms & Logic · Ecommerce & User Accounts · Marketplace & integrations. Plus Webflow
University (courses, videos) and the Community.

**How it separates the layers:** the Help Center holds "Intro to …" entry articles ("Intro to Webflow", "Intro to the
Webflow CMS") and task articles ("Manage CMS Collections"); University teaches through courses ("Getting started
with Webflow").

**Element reference:** one short article per complex element, titled with the element's name only ("Slider",
"Tabs", "Navbar"). Each gives the panel path to add it ("open the Add panel > Elements and drag a Navbar from the
Advanced section onto the Webflow canvas") and to configure it ("Element Settings panel").

**What makes it guessable:** every area has an "Intro to <feature>" entry page; panels are named with their
shortcut ("Navigator panel (shortcut: Z)", "Style panel (shortcut: S)").

## Patterns that make navigation easy to guess (and what to avoid)

1. **One quickstart that promises time and outcome**: FlutterFlow "about 15-20 minutes", Lovable "about ten
   minutes … a live URL you can share", Dreamflow "your first app in just 4 minutes" (frontmatter description).
2. **Task titles for how-tos, UI nouns for reference**: Lovable's verb-first titles; FlutterFlow, Bubble and
   Webflow name reference pages after the panels and elements users see.
3. **AI near the top**: Framer's "Agents" and Webflow's "AI" are category 2; Lovable's Features open with the modes.
4. **An interface tour with one short page per panel**: Dreamflow Workspace, FlutterFlow App Builder.
5. **Learn and look up kept apart**: Bubble's two books. For widgets, FlutterFlow's "Common Widget Properties"
   plus per-widget pages only where needed (matches D5).
6. **Integrations named by vendor, publishing named by destination** (App Store, Google Play, Web).
7. **Troubleshooting in two places**: a closing "Troubleshooting" or "FAQ" block on each page (Lovable,
   FlutterFlow, Dreamflow) plus a central section (FlutterFlow Troubleshooting, Dreamflow Debugging).
8. **A glossary that pins exact UI terms and records renames** (Lovable, Bubble).
9. **A shallow, visible map**: Dreamflow expands every category (`collapsed: false`), with about 7 top-level items.
10. **Account, plans and billing in their own section** (Lovable, FlutterFlow, Webflow). For Nowa: no numbers,
    just a link to pricing (D3).

**Avoid:** old URL schemes left live beside new ones (FlutterFlow); one kind of thing scattered across sections
(FlutterFlow widgets); very long chapters (Bubble); stub pages. Nowa has 15 "Coming soon" widget pages today,
14 of them linked from the app (see positioning.md §7).

## Current Nowa docs, measured (for contrast)

124 live pages, excluding What's New, the changelog, design courses and tutorials: median **390 words**, maximum
1,536 (`deployment/ios-deploy.md`). 342 horizontal rules across 65 pages; 132 emoji across 30 pages; 170 video embeds
across 57 pages (mostly local mp4); 166 images across 59 pages; 133 admonitions across 57 pages. The sidebar is
autogenerated from the folders (`sidebars.js`), and every section index is a Docusaurus `generated-index` with no
written overview. No redirect plugin is installed (`docusaurus.config.js` has only `posthog-docusaurus`).

---

## Recommendation for Nowa

### Principles (from the references, applied to Nowa's positioning)

- **Follow the user's journey, AI first, visual second, code third.** nowa.dev's story is "describe it → the AI
  builds it on the board → refine every detail visually → play → ship", and the app opens on a prompt box
  ("What do you want to build?"). The sidebar follows the same order. Power-user topics (code, Git, local
  projects, your own agent) sit together further down, clearly labelled (D8).
- **Name sections by goal, pages by task, reference by UI noun.** Users guess "Publish → App Store", not
  "Deployment → ios-deploy".
- **About a dozen top-level items** (13 below, counting What's new and Legacy tutorials), **two levels deep**,
  with a third level only for big integrations (Supabase, Firebase). Expand "Get started" by default; collapse
  the rest.
- **Every section opens with a written overview page** (100-250 words + cards), not a generated index.

### Proposed top-level structure (sidebar order)

Page kinds: **O** overview/concept · **T** tutorial · **H** how-to · **R** reference · **TS** troubleshooting.
Page names below are proposals; final titles must use the UI labels the feature research confirms.

| # | Section | What it holds (page kinds) |
|---|---|---|
| 0 | **Docs home** | Hero: "Build the exact app you imagine." + the one-liner from positioning.md. Three large cards: **Build your first app**, **Build with Nowa AI**, **Design visually**. Then section cards, a "Get help" strip (Discord, Community, YouTube, `team@nowa.dev`) and the latest What's New entry. |
| 1 | **Get started** | *Welcome to Nowa* (O: AI agent + visual editing + real Flutter code; who it's for; 300 words) · *Build your first app* (T: dashboard prompt → mode → board → refine visually → Play → share; time and outcome stated) · *Create your account* (H: email, Google, Apple) · *Tour the editor* (O: one labelled screenshot of the board, top bar, side panels, details panel, AI chat, each linking to its page) · *Cloud or local project?* (O: comparison table + badges) |
| 2 | **Build with Nowa AI** | *How Nowa AI works* (O: **Design / Plan / Agent** modes, thinking levels **Instant / Thinking / Deep Thinking**, credits → link pricing) · *Design your app with AI* (H: Design mode → **Make it real**) · *Plan before you build* (H: Plan mode) · *Build and fix with Agent mode* (H) · *Give the AI context* (H: select on the board, attach screens/files/images) · *Write prompts that work* (O + example prompts) · *Connect Figma* and *Let Nowa AI manage Supabase* (H; or under Integrations with cross-links) |
| 3 | **Design your app** | *Boards, screens and components* (O) · *Add widgets* (H: Widget Palette / Widgets panel) · *Arrange layouts* (H: rows, columns, groups, stacks, responsive) · *Style widgets* (H: details panel) · *Themes: colors and text styles* (H) · *Reusable components* (H) · *Images, icons and fonts* (H: assets) · *Start from a template* (H, if confirmed) |
| 4 | **Add logic** | *How logic works in Nowa* (O: variables, parameters, functions, events, Circuit) · *Store data in variables* (H) · *Pass data with parameters* (H) · *React to events* (H) · *Navigate between screens* (H) · *Show dialogs, pickers and snackbars* (H) · *Common actions* (R: open URL, media picker, platform check…) · *Data models* (H) |
| 5 | **Connect data and services** | *Choose a backend* (O) · *Supabase* (sub-group: connect, auth, database, storage, realtime) · *Firebase* (connect, auth, Firestore, notifications) · *REST APIs* (create; import from Postman, Swagger, Xano) · *Payments* (Stripe, RevenueCat) · *Ads* (AdMob). Only integrations the code confirms (positioning.md Q-P7). |
| 6 | **Preview and test** | *Play your app* (H: Instant Play, Embedded preview) · *Run on a simulator or device* (H, **Desktop app only**) · *Share a preview* (H: link and QR, one screen) · *Find and fix problems* (H: Problems panel) |
| 7 | **Publish** | *Get ready to publish* (O + checklist: app name, icon, permissions) · *Publish to the web* (H: hosting, custom domain, plan-gated per code) · *Publish to Google Play* (H) · *Publish to the App Store* (H) · *Download your code* (H) |
| 8 | **Work with code** (for developers) | *Local projects and Nowa Desktop* (H: install, Flutter SDK, Xcode) · *Use Nowa with VS Code* (H; "Hybrid Approach" as alias) · *Write custom code* (H) · *Add packages* (H) · *Import an existing Flutter project* (H: import, clone from GitHub, workspaces and monorepos) · *Git and GitHub* (H: commit, branches, conflicts, SSH, tokens) · *Connect your own AI agent* (H, **Enterprise**) |
| 9 | **Account and plans** | *Account and connected accounts* (H) · *Workspaces and members* (H) · *Plans and AI credits* (O: what uses credits, where to see usage, link https://nowa.dev/pricing, no numbers) · *Get help* (H: help menu **Report an issue**, **Share feedback**, Community, Discord, **Hire an Expert**) |
| 10 | **Troubleshooting** | *Common problems* (TS: by symptom, quoted error → fix) · *Known issues* (TS: e.g. Firebase on Windows) · links to the TS blocks on feature pages |
| 11 | **Reference** | *Widget catalog* (R: every Widgets-panel widget from code, grouped as the panel groups them, one line each, anchor per widget; D5) · *Key widget pages* (R/H: only widgets that need Nowa-specific setup, D5) · *Common widget properties* (R) · *Keyboard shortcuts* (R) · *Glossary* (R: board, screen, component, widget, Nowa AI, modes, cloud/local project, Nowa Desktop, Instant Play, Circuit…) |
| 12 | **What's new** | What's New + Changelog, content and URLs unchanged (`/new/whats-new`, `/new/change-log`, D6/D7) |
| 13 | **Legacy tutorials** | Design courses + old tutorials, moved untouched (D4), collapsed, with one banner: "Made with an earlier version of Nowa; screens may look different." |

Navbar: keep **Get Started** (→ app.nowa.dev/signup) and **Sign In** (→ app.nowa.dev); add **What's new**.

### Mapping from today's folders

| Current | Goes to |
|---|---|
| `getting-started/*` | 1 Get started (rewritten) |
| `ai/*` | 2 Build with Nowa AI; `ai/price.md` → 9 Plans and AI credits (no numbers) |
| `ui/boards`, `screens`, `components`, `widget-panel`, `toolbar`, `outline`, `assets`, `layout/*`, `themes/*`, `wrappers/*` | 3 Design your app |
| `ui/widgets/*` | 11 Reference (catalog + key pages) |
| `logic/*`, `vars-params-functions/*` | 4 Add logic |
| `data-connections/*`, `payments/*` | 5 Connect data and services |
| `local-project-simulator/simulator.md`, `deployment/share.md` | 6 Preview and test |
| `deployment/*` (others) | 7 Publish |
| `local-project-simulator/*` (others), `hybrid-approach/*`, `git/*` | 8 Work with code |
| `shortcuts.md` | 11 Reference |
| `ui/design-courses/*`, `tutorials-template/*` | 13 Legacy tutorials (untouched, D4) |
| `new/*` | 12 What's new (untouched) |

### Page templates (anatomy)

- **How-to (most pages), 300-800 words:** title (verb first) → 1-2 sentence intro with the outcome → badge if
  gated → "Before you start" only if there are prerequisites → numbered steps with a screenshot where the screen
  changes → an "Or ask Nowa AI" tip with one example prompt, where the capability is confirmed → options table if
  needed → **Troubleshooting** (symptom → fix, quoting the app's error text) → "Next steps" (2-3 links).
- **Overview, 150-500 words:** what it is in one paragraph → a labelled screenshot → key terms → "when to use
  which" table → cards to the task pages.
- **Reference:** one-line purpose → table or list with an anchor per item → "Learn more" links. Length as needed;
  must scan.
- **Tutorial (the quickstart only):** time, prerequisites and result up front → 4-6 steps, each ending with a
  checkpoint ("You should see …") → next steps.
- **Media:** screenshots in the default theme (D10), cropped to the panel that matters; short silent clips only for
  motion (drag and drop, Play); YouTube walkthroughs at the end as "Watch it"; alt text says what to notice. At
  most 3 admonitions per page: `:::tip` for shortcuts and AI alternatives, `:::note` for scope ("Local projects
  only"), `:::warning` for anything irreversible.
- **Length rule:** split any page over about 1,200 words. No "Coming soon" pages: an unwritten widget gets a
  catalog row, not a stub.

### URLs, redirects, sidebar mechanics

- Explicit `sidebars.js` (not autogenerated) to fix order and labels; short, stable slugs per section
  (`/get-started/…`, `/ai/…`, `/design/…`, `/logic/…`, `/integrations/…`, `/test/…`, `/publish/…`, `/code/…`,
  `/account/…`, `/troubleshooting/…`, `/reference/…`, `/legacy/…`).
- Add `@docusaurus/plugin-client-redirects` and redirect **every** old URL, first the **43 deep links the app opens**
  (positioning.md §7). Keep the old anchor IDs on the new pages with explicit heading IDs
  (e.g. `{#setting-up-flutter-sdk}`, `{#macos-install-xcode}`, `{#apple-distribution-certificate}`), and check that
  redirects keep the `#hash`.
- Point the 32 in-app widget links at the key widget page, or at the widget's catalog anchor when it has no page
  (this also fixes the Switch 404 and the 14 "Coming soon" targets). Report the URL list to the product team so
  `widgets_to_add.dart` can be updated later; the docs repo can only redirect.

### Style rules: simple, clear, confident, concise, a little exciting

1. **Lead with the payoff.** The first sentence says what the reader gets or does. Background comes after the
   steps, if at all.
2. **Talk to the reader.** Second person, present tense, active voice: "Click **Build it**", not "The Build it
   button can be clicked".
3. **Keep it short and plain.** One idea per sentence (about 20 words max), 1-3 sentences per paragraph, everyday
   words. Cut throat-clearing: "In this guide we will…", "Let's dive in", "That's it!", horizontal rules between
   sections.
4. **Quote UI labels exactly, in bold, same case as the app.** **Build it**, **Make it real**, **Agent**. Never
   paraphrase a label. For an icon-only control, name it and give its tooltip: "the send button (**Build it**)".
5. **One word per thing.** Use the glossary terms (board, screen, component, widget, Nowa AI, Design / Plan /
   Agent mode, cloud project, local project, Nowa Desktop) and never swap in synonyms ("canvas", "Chat", "AI
   Assistant").
6. **Be confident, not hyped.** State what Nowa does as fact. No superlatives ("insanely", "astonishing", "the
   best"), no "simply", "just" or "easy", no hedging ("should", "might") unless behavior really varies, and then
   say when.
7. **Get excitement from specifics, not adjectives.** Show the result: the board after a prompt, "your app runs
   right on the board, no build step". At most one exclamation mark per page. No emoji in headings or body (What's
   New is exempt and untouched).
8. **Show both ways to build.** Where Nowa AI and visual editing can both do a task, give the visual steps and add
   an "Or ask Nowa AI" tip with one example prompt. That keeps the AI-plus-visual promise on every page. Only do
   this where the capability is confirmed.
9. **Write steps nobody can misread.** Numbered, one action each, place before action ("In the top bar, click
   **Run**"), about 7 steps per list at most; split longer tasks under subheadings.
10. **Explain Flutter just enough.** One plain sentence when a Flutter idea matters ("A Row places widgets side by
    side."), then move on. Depth goes in "Work with code" or an external link.
11. **Make headings tasks.** Sentence case, 6 words max; verb first for how-tos ("Connect Supabase", "Publish to
    the App Store"), nouns for reference ("Widget catalog"). No "Introduction" or "Overview" headings inside a page.
12. **Be exact about gates and limits.** No prices, credit amounts or plan limits: link https://nowa.dev/pricing.
    Add a badge (**Beta**, **Enterprise**, **Desktop app only**, **Local projects only**, **Cloud projects only**)
    or name a plan only where the code gates it. Quote error messages word for word.

### Before / after (from `docs/getting-started/quickstart.md:11-37`)

**Before** (verbatim; video embeds removed):

```markdown
## Step 1: Create a New Cloud Project

To get started, you'll create a fresh project in Nowa.

1. Click the yellow **New Cloud Project** button.
2. From the options, select **New Cloud Project**.
3. Give your project a **name** (anything you like).
4. Click **Create** to confirm.

That's it — you've just created your first project!

## Step 2: Use Chat to Shape Your App

Now comes the fun part — telling Nowa what you want to build.

With Chat, you simply describe your idea in plain English and let Nowa do the heavy lifting.

1. Click the **Chat** icon on the left.
2. Type what you'd like your app to do.
3. Press **Send** and watch your app take shape.
```

Problems: **New Cloud Project** and **Chat** don't exist in v3.12.5 (**Send** survives only as the chat button's
tooltip). The product does in one step what the page spreads over two. Filler ("That's it", "Now comes the fun
part", "simply", "heavy lifting"). The reader never learns what they'll see.

**After** (every label checked in `/home/user/nowa-master`):

```markdown
## Describe your app

Your app starts as one sentence. On the dashboard, under **What do you want to build?**:

1. Type your idea, for example *A habit tracker with streaks and reminders*.
   No idea yet? Pick one under **Or try an example prompt**.
2. Pick a mode. **Design**, marked **Start here**, designs the look and flow before making it
   functional. Choose **Plan** for planning complex tasks before building, or **Agent** for
   everything, from design to functionality.
3. Click the send button (**Build it**).

Nowa names your app, creates the project and opens it, with your idea already sent to Nowa AI.
In Design mode, watch your screens appear on the board.
```

Evidence: "What do you want to build?" (`packages/nowa_ui/lib/dashboard/describe_app_panel.dart:593`); example idea
(`:36`); "Or try an example prompt" (`:555`); **Build it** tooltip on the send button (`:468`); mode chips with
Design recommended and its dashboard description (`lib/dashboard/dashboard_page.dart:219-223`), the recommended
choice showing a **Start here** badge (`packages/nowa_ui/lib/src/components/option_chip.dart:159`, `:186`); Plan and Agent
descriptions (`packages/ai/lib/src/ui/chat_field/mode_selector.dart:38-39`); naming, creating, opening and sending
the prompt (`lib/dashboard/create_new_project/prompt_to_app_page.dart:8-16`, `:55`, `:60`). The new version is about
95 words against about 120 before, it replaces two steps with one, and it ends on the payoff.

Micro rewrites in the same voice:

| Before | After |
|---|---|
| "Welcome to Nowa, the place to build great Flutter apps fast with much fun." (`docs/index.md:10`) | "Build the exact app you imagine. Nowa AI builds it on your board, you refine every detail visually, and the Flutter code is yours." |
| "Build production-ready Flutter apps insanely fast using AI and visual building — no Flutter knowledge required." (`docs/getting-started/introduction.md:4`) | "Describe your app, refine it visually, and ship real Flutter code. No Flutter knowledge needed." |
| "### 🧩 Visual Building at Its Best" (`introduction.md:42`) | "## Edit everything visually" |

## Sources

- FlutterFlow: docs.flutterflow.io pages listed above (search results), e.g. `/quickstart/`, `/flutterflow-ui/builder/`,
  `/resources/ui/widgets/`, `/resources/ui/widgets/widget-commonalities/`, `/concepts/ai-agent/`, `/deployment/web-publishing/`,
  `/troubleshooting/testing-your-app`, `/collaboration/branching/`, `/accounts-billing/plan-pricing/`, `/designer/prompting/`.
- Dreamflow: `https://raw.githubusercontent.com/FlutterFlow/dreamflow-documentation/main/sidebars.ts`,
  `…/docs/get-started/quickstart.md`, `…/docs/workspace/agent-panel.md`; folder listings on github.com.
- Lovable: docs.lovable.dev `/introduction/getting-started`, `/introduction/welcome`, `/features/agent-mode`,
  `/features/plan-mode`, `/features/design`, `/features/knowledge`, `/features/publish`, `/features/custom-domain`,
  `/integrations/supabase`, `/integrations/stripe`, `/prompting/prompting-one`, `/prompting/prompting-debugging`, `/glossary`.
- Bubble: manual.bubble.io `/`, `/new-start-here`, `/help-guides/getting-started`, `/help-guides/design`,
  `/core-resources/elements`, `/help-guides/maintaining-an-application/testing-and-debugging`, `/the-glossary`.
- Framer: framer.com/help, `/help/get-started/`, `/help/articles/how-to-use-agents/`, framer.com/academy, `/academy/lessons`.
- Webflow: help.webflow.com/hc/en-us, "Intro to Webflow", "Slider", "Tabs", "Navbar" articles; university.webflow.com.
