# Current docs inventory

Source: `/home/user/docs`, branch `docs-rewrite`, live pages under `docs/` as built on 2026-10-06 (Docusaurus 3.10.0).
Code hints cite `/home/user/nowa-master` (v3.12.5) as `path:line`; they are spot checks, not full feature research.
Researcher: current-docs inventory agent. Companion files in this folder: `old-urls.txt`, `old-urls-map.md`,
`media-inventory.md`.

## Summary

- **135 Markdown files** under `docs/`: **134 live pages** plus 2 files that are never built
  (`data-connections/api/.authkey.md`, `vars-params-functions/functions/override-functions`). With 29 generated
  category index pages, `/search`, `/markdown-page` and `/404`, the site has **166 URLs** (see `old-urls.txt`).
- **Verdicts:** rewrite 58, merge 48, retire 16, keep-as-is 12
  (keep-as-is = What's New, Changelog, the 9 legacy tutorials (D4) and the Stripe guide).
- **Flags:** 28 stubs, 13 pages that duplicate another page, 8 pages with prices, credit numbers or
  plan names, 34 pages whose UI the current What's New contradicts, 39 pages the released app links to.
- **Build:** `yarn build` passes (video check: 147 embeds, 147 MP4 files; Docusaurus build OK). Only warning from the
  build itself: an empty link in What's New. Problems the build does not catch are listed under "Other defects".
- **Main problems:**
  1. Most pages describe the pre-3.9/3.10 editor: Files panel, toolbar at the top, boards as tabs, Outline on the
     board, deployment inside Settings, Think Mode, Development web links, "only local projects run on simulators".
  2. 17 widget pages are "Coming soon" stubs or a single video, and the app's widget picker links to 16 of them.
  3. Prices and quotas (`ai/price.md`, `getting-started/introduction.md`, `ai/howtouseai.mdx`) break D3 and are stale.
  4. Old URLs are load-bearing: the released app opens 44 distinct docs URLs (3 with anchors), and What's New and the
     Changelog link to 17 old pages that D6 forbids editing (details in `old-urls-map.md`).
  5. The theme pages flag themselves as outdated; `deployment/share.md` flags itself as deprecated; the three Firebase
     pages are Nowa V1 videos.
  6. Structure: the same topic is spread over several thin pages (Supabase queries x3, API import x3, wrappers x9,
     layout x4, Circuit x12) while big features have no page at all (list below).

### Topics in What's New with no current page

Run & Deploy buttons, App Run, Nowa Run (live preview, preview on a phone), Instant Play from the board; agent modes
(Instant, Thinking, Deep Thinking, Max), Planning Mode, Agent Creation Summary, "Fix problems in my project";
Figma MCP and Auto-approve tools; Connect External Agent (Claude Code, Claude Desktop, Cursor; Enterprise, desktop app);
Problems panel; code editor (`<>`), go to definition, diff navigator, constructor picker; Assets panel; project
settings page and packages (Load Packages); permissions; GoRouter routing (screen paths, deep links); workspaces and
team invites; workspace/monorepo import with the package chip; Sign in with Apple; Git commit history and Revert,
one-click GitHub, Git over SSH, switching branches with changes, conflict resolver; RevenueCat in-app purchases;
Google Maps, Pin Code Field and Swipeable Stack widgets, Badge wrapper; in-app support chat ("?" icon) and
notifications; onboarding for new projects; component descriptions; custom app bars; mobile browser support.

## How to read the tables

- One table per top-level sidebar category, in sidebar order; rows follow the sidebar order exactly. Sub-categories
  appear as **Category:** rows where they sit in the sidebar (they are generated index pages, not files).
- **Path** is relative to the docs repo root. **URL** is the live path on `https://docs.nowa.dev`. **Title** is the
  title Docusaurus renders (front-matter `title`, else the first H1).
- **Media used** lists every image, video and embed in the page, in order. `/img/...` and `/videos/...` are files in
  `static/`; `docs/.../img/...` are images stored next to the page; `{a,b}.png` means `a.png` and `b.png` in the same
  folder. YouTube embeds show the video id; Arcade demos are interactive embeds from `demo.arcade.software`.
- **Verdict:** keep-as-is (content stays; may move), rewrite (topic stays, content must be rewritten from code),
  merge (content folds into another new page), retire (page goes; redirect its URL).
- **Flags inside the verdict:** `[STUB]` placeholder, single video or links only; `[DUP]` repeats another page;
  `[PRICE]` prices, credit numbers, plan names or plan limits (D3); `[WN]` describes UI or behavior that the current
  What's New contradicts; `[APP-LINK]` the released app links to this URL (it must keep resolving).

## Pages by sidebar category

### 1. Nowa Documentation Overview (top-level page)

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/index.md` | `/` | Nowa Documentation Overview | Docs homepage: one welcome line and a grid of 13 cards (12 category index pages and Keyboard shortcuts). | card grid (`cards.module.css`): Getting Started, Build with AI, Designer, Logic, Variables, Data Sources, Git, Local projects, Deployment, Hybrid, Tutorials, What's New, Shortcuts | none | **rewrite**: new homepage for the new structure; cards point at old sections and miss Payments. [APP-LINK] |

### 2. What's New

Generated index `/new` (from `docs/new/_category_.json`): "Stay up to date with the latest features, improvements, and announcements from our team."

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/new/whats-new.md` | `/new/whats-new` | What's new | Release notes for every version from 2.0.8-beta (Nov 2024) to 3.12.5 (25 Sep 2026). Current and accurate. | Connect External Agent (Enterprise), Figma MCP, Instant Play on any board item, branch switch without commit, App Run, Nowa Run, Run & Deploy buttons, agent modes, Planning Mode, Supabase MCP, Stripe, RevenueCat, GoRouter, Cloud + Local sync, preview sharing, Problems panel | `/img/whats_new/{Nowa-Gemini-3.7-Flash,Nowa-3.10.5-Mobile,nowa3_1}.png`; `docs/img/swipingcard.gif`; YouTube `dLsO05crdSk`, `CuR6uC32ulE` | **keep-as-is**: D6. [PRICE] credit amounts and old plan prices/limits (3.0.0 plans, 15/50 free credits, $25 credits, "double the daily limits"). Build warning: empty link at line 666; link to `app.nowa.com` (wrong domain) at line 177. Links to 17 old pages (see old-urls-map.md). |
| `docs/new/change-log.md` | `/new/change-log` | Changelog | Added / Improved / Fixed log per version up to 3.12.5. | same features as What's New with more detail (e.g. `add_image_assets` tool, Problems panel filter, Libraries panel, build quota message) | none | **keep-as-is**: D6. [PRICE] credit amounts ($25 credits, 15 credits) and plan limits. Links to 4 old pages and `https://docs.nowa.dev/git`. |

### 3. Getting Started

Generated index `/getting-started` (from `docs/getting-started/_category_.json`): "Learn how to get started building in Nowa"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/getting-started/introduction.md` | `/getting-started/introduction` | Introduction to Nowa | What Nowa is, why it is different, plans, community and social links. | AI agent, Figma-like designer, Circuit, Play (instant preview), source download, local projects and desktop app, hybrid workflow, pub.dev packages, Firebase/Supabase/Airtable/REST, deploy, templates, Marketplace, Git | none | **rewrite**: positioning predates App Run, Run & Deploy, agent modes and MCPs. [PRICE] free plan "5 AI messages per month". Claims an Airtable integration; the code only has an internal Airtable endpoint (`packages/core/lib/src/dialogs/dialog_data_sender.dart:10`). |
| `docs/getting-started/install.md` | `/getting-started/install` | Signup and Setup | Sign up (email or Google), welcome screen, dashboard tour, create a workspace, cloud vs local project. | Continue with Google, Create Account, verification email, "Let's Get Started", dashboard sidebar (Workspaces, Templates, Learning resources, Account settings), search, "+" workspace, yellow "New Cloud Project" button | `/img/signup/1.png`; `/img/signup/email/{1,2}.jpg`; `/img/signup/email/3.png`; `/img/signup/google/1.png`; `/img/signup/google/2.jpg`; `/img/signup/after/1.png`; `/img/app.png`; `/videos/getting-started/{createworkspace,create-cloud}.mp4` | **rewrite**: [WN] 3.12 added Sign in with Apple and cleaned up the dashboard; the code button is "New project" (`packages/nowa_ui/lib/dashboard/projects_view.dart:313`). [DUP] cloud-project steps repeated in quickstart.md. |
| `docs/getting-started/exploreinterface.mdx` | `/getting-started/exploreinterface` | Exploring the Nowa Interface | Tour of the editor areas, each linking to a detail page. | Toolbar "at the very top", Properties panel, Variables, AI Assistant, API Collections, File System / Files panel (lib, boards, assets), Play Mode and phone frame, Test Mode - Simulator, Supabase, Themes, Widgets, Circuit | `/img/startedproject.png`; `/videos/getting-started/{toolbar,properties,variable,widgets}.mp4`; `/img/exploreinterface/{ai,api,files,simulator,supabase,theme,circle}.png`; `/videos/playmod.mp4` | **rewrite**: [WN] 3.10 moved the toolbar to the bottom and boards to the top right and added Run & Deploy; 3.9 removed the Files panel, added the Assets panel and the `<>` code editor, moved Outline left. |
| `docs/getting-started/quickstart.md` | `/getting-started/quickstart` | Quickstart – Your First Project | First project: create a cloud project, prompt the AI for a stopwatch, recolor an icon, try it. | "New Cloud Project", Chat icon on the left, Send, Icon widget Color property, theme colors, Start/Stop/Reset | `/videos/qucikstart/{1,2,3,4}.mp4` | **rewrite**: good walkthrough, outdated UI. [WN] 3.12 dashboard clean-up (code button is "New project"), 3.9/3.10 play and run flow. [DUP] create-project steps also in install.md. |

### 4. Build with AI

Generated index `/ai` (from `docs/ai/_category_.json`): "Learn how to get started building with Nowa AI"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/ai/howtouseai.mdx` | `/ai/howtouseai` | How to Use Nowa AI | AI chat basics: open the chat, usage and credits, Think Mode, custom instructions, attachments, checkpoints, new chat, history. | chat icon in the left panel, Session Details, Global Usage, Think Mode (brain icon), Options > Custom Instructions, smart selection context, Attach (screens, Attach Image, Attach Text File), Restore/Replay checkpoint, New Chat, Options > Chat history, long-chat warning | `/videos/ai/{openai,credits2,think,nonthink,chatinstruction,target,attach,image,text,revert,newchat,chathistory}.mp4`; `/img/ai/{warning,warning2}.png` | **rewrite**: [WN] 3.5 agent modes Instant/Thinking/Deep Thinking/Max replace Think Mode (`packages/ai/lib/src/agent/agent.dart:22`); no Planning Mode (3.6/3.9), Supabase/Figma MCP icons, creation summary (3.4) or External Agent (3.12). Code says "Restore Checkpoint" / "Reapply Checkpoint" (`packages/ai/lib/src/ui/content_views.dart:189`). [PRICE] per-action credit costs. |
| `docs/ai/prompttip.mdx` | `/ai/prompttip` | Prompting Tips | Nine prompting tips (small steps, focused attachments, context, new chats, sandwich structure, fixing errors, bug reports) plus a template and checklist. | attachments, new chat, "Fix issues in my project", Feedback > Report, free AI credits for valid bug reports | none | **rewrite**: advice is mostly evergreen, keep it. [WN] 3.7 bug reports go through the "?" support chat, not Feedback > Report; drop the credit-reward claim; fold in exampleprompts.mdx. |
| `docs/ai/price.md` | `/ai/price` | Credits, Limits & Privacy | Plan table with prices and monthly AI message quotas, who each plan is for, privacy link. | Starter / Launch / Scale / Enterprise, monthly and annual prices, AI messages per month, extra credits, custom domain, mobile deployment, GitHub integration, SSO, audit logs, privacy policy | none | **retire**: [PRICE] prices and quotas break D3 and are stale (limits doubled Aug 2026). Redirect to a short "Plans and credits" section that links nowa.dev/pricing and the privacy policy. |
| `docs/ai/exampleprompts.mdx` | `/ai/exampleprompts` | Actual Prompts Used to Build Full Apps | Two full example prompts (profile screen, stopwatch) with design guidelines and result screenshots. | AI prompts and their results | `/img/ai/{prompt1,prompt2}.png` | **merge**: into the prompting guide as examples; result screenshots are from an older agent. [DUP] overlaps prompttip.mdx. |

### 5. Designer

Generated index `/ui` (from `docs/ui/_category_.json`): "Learn the basics about creating a stunning UI for your app"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/ui/boards.mdx` | `/ui/boards` | Boards | Board types, creating and reopening boards from the tabs bar, board color and grid, tips. | Design Boards, Widgets Boards, Assets Board, "+" in the tabs bar, Recent files, Files panel, tabs, Details panel background color and grid | `/img/designer/Clipboard-20251002-105437-071.mp4` | **rewrite**: [WN] 3.10 moved boards to the top right; 3.9 removed the Files panel. (3.13 board picker: upcoming only.) |
| `docs/ui/toolbar.md` | `/ui/toolbar` | Toolbar | Toolbar tools from left to right. | Selection, Shape (Container), Screen (empty or template), Text, Widget (Widget Picker), Play | `/img/designer/Pasted-image-20251001100204.png` | **rewrite**: [WN] 3.10 moved the toolbar to the bottom; Run & Deploy now top right. |
| `docs/ui/widget-panel.md` | `/ui/widget-panel` | Widgets Panel | Sidebar panel listing screens and components; drag to the board, double-click to open, right-click to rename or delete. | Pages tab, Components tab, drag and drop, double-click, right-click Rename/Delete | `/img/designer/Clipboard-20251002-070855-035.mp4` | **rewrite**: [WN] verify: 3.12.5 describes the Widgets panel as showing widget previews, this page says it lists screens and components; easily confused with the Widget Picker. (3.13 replaces it with a Library panel: upcoming only.) |
| `docs/ui/screens.md` | `/ui/screens` | Screens | Create, rename, place and remove screens; screen properties in the Details panel. | Screen tool, empty screen or template, Submit, rename button, Files panel, Detach, Remove, Files library, Details panel: Name, Open in a new tab, Layout, Group (Stack/Column/Row), Screen wrapper, Color, Navigation (Appbar, Floating action, Drawer, Bottom navigation), Size, Make Home Screen, Wrappers | `/img/designer/Clipboard-20251002-101128-422.mp4`; `/img/designer/{screens-pages,screens-details-panel-1}.png` | **rewrite**: [WN] Files panel removed (3.9); no GoRouter screen path (3.5) or screen description (3.12). Code label is "Make home screen" (`packages/designer/lib/src/details/route_details.dart:291`). |
| `docs/ui/temlpates.mdx` | `/ui/temlpates` | Templates | Add a ready-made screen template with the Screen tool and Import. | Screen tool, template previews, file selection popup, Import | `/img/designer/Clipboard-20251002-072720-043.mp4` | **rewrite**: check the template picker in code (templates were replaced in 3.0.8). Slug typo "temlpates". |
| `docs/ui/widgets/` | `/category/widgets` | **Category: Widgets** | generated index page: "Get to know Nowa UI widgets and how to use them" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/ui/widgets/widgets-ref.md` | `/ui/widgets/widgets-ref` | List of all widgets | Table of 32 widgets with one-line descriptions, 13 linked to detail pages. | Container, Text, Image, Button, Text Field, Group, AppBar, Tabs, List, Floating Button, Loading Circular, Data Builder, Checkbox, Icon, Navigation Bar, Drawer, List Tile, Page View, Index Stack, Dropdown Menu, Admob Banner, Video Player, Youtube Player, Lottie, SVG, Rive, HTML, Markdown, WebView, Alert Dialog, Wrap, Cross Fade | none | **rewrite**: becomes the D5 widget catalog built from the Widgets panel in code; misses newer widgets (Google Maps 3.3.2, Pin Code Field and Swipeable Stack in 2.0.x). |
| `docs/ui/widgets/widget-desc/` | `/category/widget-description` | **Category: Widget description** | generated index page: "Get to know each widgets in details" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/ui/widgets/widget-desc/container.md` | `/ui/widgets/widget-desc/container` | Container | Draw or add a Container; color, border, radius, image fill, shadows, gradients, children; Container as a wrapper. | Shape tool, Widget Picker, Color, Border "+", Radius, fill with images, shadows, gradients, add widgets inside, wrapper | `docs/ui/widgets/widget-desc/img/toolbarshapetool.png`; `docs/ui/widgets/widget-desc/img/{modify-container,add-image-to-container,add-widget-to-container,add-gradients-container}.gif` | **merge**: catalog row (D5); styling content can feed a designer "style widgets" page. Toolbar moved (3.10). [APP-LINK] |
| `docs/ui/widgets/widget-desc/gridview.md` | `/ui/widgets/widget-desc/gridview` | Gridview | GridView setup (placeholder, cross-axis count or max extent, spacing, aspect ratio, normal mode) and binding a list of objects. | GridView builder/normal mode, itemBuilder Placeholder, fixed / max cross axis, main and cross spacing, main axis extent, aspect ratio, object, parameter, list variable, "connect" List, element | `docs/ui/widgets/widget-desc/img/gridview/{drop-gridview,add-placeholder,fixed-cros-axis,max-cross-axis,main-spacing,cross-spacing,main-axis-extent,aspect-ratio,normal-gridview,create-plant-object,connect-param,create-list-plants,connect-element}.gif` | **rewrite**: key page (data-bound lists need Nowa-specific setup, D5); verify labels; "new object" in files is outdated (3.9). [APP-LINK] |
| `docs/ui/widgets/widget-desc/listview.md` | `/ui/widgets/widget-desc/listview` | ListView | ListView builder setup: placeholder, item count, separators, connecting a list, padding, normal mode, switching modes. | builder mode, itemBuilder Placeholder, item count, fixed / widget separator, connect list, padding, normal ListView, switch to builder, reorder | `docs/ui/widgets/widget-desc/img/listview/{drop-listview,replace-placeholder,item-count,fixed-seperator,widget-seperator,connect-data,padding,normal-listview,switch-to-builder,reorder-normal}.gif`; YouTube `_ko4iKVXVuA` | **rewrite**: key page with gridview.md (D5). [DUP] same YouTube video as data-builder.md. [APP-LINK] |
| `docs/ui/widgets/widget-desc/text.md` | `/ui/widgets/widget-desc/text` | Text | Add text with the Text tool (click vs drag), text properties, overflow, binding to variables. | Text tool, "T" shortcut, Auto vs Fixed size, text properties, overflow, variables | `docs/ui/widgets/widget-desc/img/{adding-text-widget,editing-text-widget,overflow}.gif` | **merge**: catalog row plus designer basics; toolbar moved (3.10); both "Layout" links point to container.md. [APP-LINK] |
| `docs/ui/widgets/widget-desc/button.md` | `/ui/widgets/widget-desc/button` | Button | Button properties: label text, Enabled, press/long-press/hover events, Button Style. | Widget Picker, Enabled, On Pressed, On Long Press, On Hover (Circuit), Button Style (theme) | `/img/designer/button.png` | **merge**: catalog row; wiki-style links `[[Text]]` and `[[Themes]]` render as plain text. |
| `docs/ui/widgets/widget-desc/image.md` | `/ui/widgets/widget-desc/image` | Image | Add an Image from a URL or from assets; other image properties. | Widget Picker > Image, Url field, Assets, Pick Image, Upload image, drag and drop | `docs/ui/widgets/widget-desc/img/{image1,image2}.gif` | **merge**: catalog row; asset flow changed (3.9 Assets panel). [APP-LINK] |
| `docs/ui/widgets/widget-desc/loading-circular.md` | `/ui/widgets/widget-desc/loading-circular` | Loading circular | Property list of the circular progress indicator. | Value, Background Color, Color, Stroke Width, Stroke Align, Semantics Label, Semantics Value | none | **merge**: catalog row; front-matter description copied from Button ("How to use button widget"). [APP-LINK] |
| `docs/ui/widgets/widget-desc/admob-banner.md` | `/ui/widgets/widget-desc/admob-banner` | Admob Banner | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. Check whether AdMob needs a setup page (`packages/nowa_mobile_ads`). [APP-LINK] |
| `docs/ui/widgets/widget-desc/alert-dialog.md` | `/ui/widgets/widget-desc/alert-dialog` | Alert Dialog | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. Dialogs are covered in logic/ui-popups/dialog.md. [APP-LINK] |
| `docs/ui/widgets/widget-desc/appbar.md` | `/ui/widgets/widget-desc/appbar` | AppBar | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/checkbox.md` | `/ui/widgets/widget-desc/checkbox` | Checkbox | Checkbox property list. | Value, Tristate, On Changed, Active/Check/Focus/Hover Color, Splash Radius, Autofocus, Side, Is Error, Semantic Label | none | **merge**: catalog row. [APP-LINK] |
| `docs/ui/widgets/widget-desc/cross-fade.md` | `/ui/widgets/widget-desc/cross-fade` | Cross fade | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/data-builder.md` | `/ui/widgets/widget-desc/data-builder` | Data Builder | Only a YouTube video (GET request, Data Builder wrapper, ListView). | Data Builder wrapper, GET request, ListView | YouTube `_ko4iKVXVuA` | **rewrite**: [STUB] video only. Data Builder is the core data-binding wrapper (API, Supabase, Firebase), so it needs a real key page (D5). [DUP] same video as listview.md. [APP-LINK] |
| `docs/ui/widgets/widget-desc/drawer.md` | `/ui/widgets/widget-desc/drawer` | Drawer | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/empty-widget.md` | `/ui/widgets/widget-desc/empty-widget` | Empty widget | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. (SizedBox) |
| `docs/ui/widgets/widget-desc/expansion-tile.md` | `/ui/widgets/widget-desc/expansion-tile` | Expansion Tile | Add an Expansion Tile; main properties, children, On Expansion Changed, styles, advanced options. | widget picker, title/leading/trailing, children, On Expansion Changed, styles, advanced options | `docs/ui/widgets/widget-desc/img/expansion/{1,2,3,4,5}.gif` | **merge**: catalog row. |
| `docs/ui/widgets/widget-desc/floating-action-button.md` | `/ui/widgets/widget-desc/floating-action-button` | Floating Action Button | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/html.md` | `/ui/widgets/widget-desc/html` | HTML | HTML widget and its properties. | Data, Shrink Wrap | `docs/ui/widgets/widget-desc/img/html.gif` | **merge**: catalog row. |
| `docs/ui/widgets/widget-desc/icon.md` | `/ui/widgets/widget-desc/icon` | Icon | Icon widget properties. | Icon, Size, Fill, Weight, Grade, Optical Size, Color, Shadows, Semantic Label, Text Direction | none | **merge**: catalog row. [APP-LINK] |
| `docs/ui/widgets/widget-desc/index-stack.md` | `/ui/widgets/widget-desc/index-stack` | Index Stack | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/linear-progress-indicator.md` | `/ui/widgets/widget-desc/linear-progress-indicator` | Linear Progress Indicator | Add a linear progress bar; position, size, alignment and customization. | L/T/R/B, W/H, alignment, height, colors, value | `docs/ui/widgets/widget-desc/img/linear-progress/{drop-linear,change-height}.gif` | **merge**: catalog row. [APP-LINK] |
| `docs/ui/widgets/widget-desc/listtile.md` | `/ui/widgets/widget-desc/listtile` | List Tile | Long List Tile property list. | Leading, Title, Subtitle, Trailing, isThreeLine, Dense, Shape, colors, text styles, Content Padding, Enabled, OnTap / OnLongPress / OnFocusChange, Selected, spacing | none | **merge**: catalog row. [APP-LINK] |
| `docs/ui/widgets/widget-desc/lottie.md` | `/ui/widgets/widget-desc/lottie` | Lottie | Lottie animation widget and its properties. | Source (path or assets), Boomerang, Type (Loop/Once), Fit (Cover/Contain) | none | **merge**: catalog row. [APP-LINK] |
| `docs/ui/widgets/widget-desc/markdown.md` | `/ui/widgets/widget-desc/markdown` | Markdown | Markdown widget and its properties. | Data, Selectable, Shrink Wrap, Style | `docs/ui/widgets/widget-desc/img/markdown.gif` | **merge**: catalog row. |
| `docs/ui/widgets/widget-desc/navigation-bar.md` | `/ui/widgets/widget-desc/navigation-bar` | Navigation Bar | Only a YouTube video (Water Tracker part 4: bottom navigation bar). | Bottom Navigation Bar | YouTube `RxcwMIzJPgs` | **rewrite**: [STUB] video only. Navigation bars work with GoRouter since 3.5, so this is likely a key "navigation" page. [APP-LINK] |
| `docs/ui/widgets/widget-desc/pageview.md` | `/ui/widgets/widget-desc/pageview` | PageView | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/rive.md` | `/ui/widgets/widget-desc/rive` | Rive | Rive animation widget: source and fit. | source (URL or Asset), Fit (Cover/Contain) | none | **merge**: catalog row. [APP-LINK] |
| `docs/ui/widgets/widget-desc/slider.md` | `/ui/widgets/widget-desc/slider` | Slider | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/svg.md` | `/ui/widgets/widget-desc/svg` | SVG | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/tabview.md` | `/ui/widgets/widget-desc/tabview` | TabView | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/textfield.md` | `/ui/widgets/widget-desc/textfield` | TextField | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. Text input (controllers, validation) may need a how-to page. [APP-LINK] |
| `docs/ui/widgets/widget-desc/video-player.md` | `/ui/widgets/widget-desc/video-player` | Video player | Add a Video Player, choose a network or asset source, playback options, show controls. | widget panel (Ctrl/Cmd+P), Source (network / asset upload), playback options, show controller | `docs/ui/widgets/widget-desc/img/{videoplayer-overview,upload-video@2x,videoplayer-play}.png`; `docs/ui/widgets/widget-desc/img/videoplayer-showcontroller.gif` | **merge**: catalog row; "test it on an emulator" note predates App Run (3.9). [APP-LINK] |
| `docs/ui/widgets/widget-desc/webview.md` | `/ui/widgets/widget-desc/webview` | WebView | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/wrap.md` | `/ui/widgets/widget-desc/wrap` | Wrap | Placeholder page: body is only "Coming soon". | - | none | **retire**: [STUB] replace with a catalog row (D5) and redirect. [APP-LINK] |
| `docs/ui/widgets/widget-desc/youtube-player.md` | `/ui/widgets/widget-desc/youtube-player` | Youtube Player | YouTube Player properties. | Initial Video ID, flags (Hide Controls, Controls Visible at Start, Auto Play, Mute, ...), display, actions and events, `youtube_player_flutter` | none | **merge**: catalog row. [APP-LINK] |
| `docs/ui/outline.md` | `/ui/outline` | Outline | Outline panel: widget tree, indicators, double-click to center, right-click actions. | Outline Panel "in the top-left corner of the Design Board", yellow home icon, purple components, expand/collapse, double-click, context menu (remove, duplicate, group/ungroup, convert to Component) | `/img/designer/Clipboard-20251002-074122-268.mp4` | **rewrite**: [WN] 3.9 moved the Outline to the left side panel. |
| `docs/ui/layout/` | `/category/layout` | **Category: Layout** | generated index page: "Learn how to create great responvise layout" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/ui/layout/intro-layout.md` | `/ui/layout/intro-layout` | Intro to Layout | Short intro that links to Groups, Columns and Rows, Constraints, and a YouTube layout tutorial. | Groups, Columns and Rows, Constraints | none | **merge**: [STUB] links only; fold into one Layout page. |
| `docs/ui/layout/constrains.md` | `/ui/layout/constrains` | Constraints | Horizontal, vertical and center constraints. | Left, Right, Left and Right, Top, Bottom, Top and Bottom, Center | `docs/ui/layout/img/contraints-bg.png`; `docs/ui/layout/img/constraints.gif` | **merge**: into one Layout page; verify labels. Slug typo "constrains". |
| `docs/ui/layout/groups.mdx` | `/ui/layout/groups` | Groups | Group and ungroup widgets; group properties. | right-click Group / Ungroup, Ctrl/Cmd+G, Alignment, Text Direction, Fit, Children, convert to Column/Row | `/img/designer/Clipboard-20251002-072320-787.mp4` | **merge**: into the Layout page. [APP-LINK] |
| `docs/ui/layout/rows-and-columns.md` | `/ui/layout/rows-and-columns` | Columns and Rows | Column and Row alignment, spacing modes, resizing modes, reordering. | 9 or 3 alignment options, spacing Fixed / Between / Around / Evenly, resizing Fixed / Auto / Expand, reordering, container becomes wrapper | `/img/designer/{direction,sizing-options}.png`; `/img/designer/{alignment-9,alignment-3,reordering}.gif`; `docs/ui/layout/img/spacing.png` | **merge**: into the Layout page. [DUP] sizing and spacing repeated in tutorials-template/design-responsive.md. |
| `docs/ui/assets.md` | `/ui/assets` | Assets | Where assets live, how to import them (upload, drag and drop, widget source), remove and rename. | Files panel Assets section, Upload button, drag and drop, Image Source property, right-click Remove / Rename | `/img/designer/Pasted-image-20251001095652.png`; `/img/designer/Clipboard-20251002-071748-744.mp4` | **rewrite**: [WN] 3.9 added a dedicated Assets panel and removed the Files panel; 3.12.3/3.12.5 Figma and agent image import. |
| `docs/ui/components.md` | `/ui/components` | Components | What components are; create, duplicate, edit, add variables, detach, delete. | Ctrl/Cmd+G, "Create Component" icon in the Details panel, unique name, copy/paste, Alt-drag, edit outside a screen, variables, Detach, Files panel > Remove | `/img/designer/{Clipboard-20251002-103334-808,Clipboard-20251002-104038-822,Clipboard-20251002-104325-541}.mp4` | **rewrite**: [WN] Files panel removed (3.9); code has "Create component" in the widget context menu (`packages/designer/lib/src/menus/widget_context_menu.dart:93`); add component descriptions (3.12). |
| `docs/ui/wrappers/` | `/wrappers` | **Category: Wrappers** | generated index page: "Learn how to use wrappers" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/ui/wrappers/wrappers-intro.md` | `/ui/wrappers/wrappers-intro` | Intro to wrappers | What wrappers are; adding one with Add Wrapper; reordering (bottom-up). | Details panel "Add Wrapper", Wrapper Picker, drag to reorder | `docs/ui/img/wrappers.gif` | **merge**: with wrappers-list.md into one Wrappers page (code label "Add wrapper", `packages/designer/lib/src/details/widget_details.dart:84`). |
| `docs/ui/wrappers/wrappers-list.md` | `/ui/wrappers/wrappers-list` | List of all Wrappers | Table of 24 wrappers with one-line descriptions. | Gesture detector, Padding, Opacity, Clip Radius, Container, Transform, Fitted Box, Scroll View, Align, Fractional Sized Box, Intrinsic Height/Width, Data Builder, Constrained Box, Material, Ink Well, Interactive Viewer, Safe Area, Drawer, Color Filter, Text Direction, Default text style, Visibility, Form | none | **merge**: regenerate the list from code; 3 links (Gesture detector, Text Direction, Visibility) point to wrappers-intro instead of their pages; no Badge wrapper (2.0.17). |
| `docs/ui/wrappers/padding.md` | `/ui/wrappers/padding` | Padding | When and how to add the Padding wrapper; moving it inside or outside. | Add Wrapper > Padding, padding values, reorder | `docs/ui/wrappers/img/{padding1,padding2}.gif` | **merge**: into the Wrappers page (2.0.20 added Horizontal/Vertical padding). |
| `docs/ui/wrappers/scrollview.md` | `/ui/wrappers/scrollview` | Scroll View | Make a Row or Column scrollable and set scroll properties. | Add Wrapper > Scroll View, Scroll Direction (Horizontal/Vertical), Reverse, Padding, Primary, Restoration Id | `docs/ui/wrappers/img/{scrollview1,scrollview2}.gif` | **merge**: into the Wrappers page. |
| `docs/ui/wrappers/gesture-detector.md` | `/ui/wrappers/gesture-detector` | Gesture Detector | Gesture events that open Circuit. | On Tap, On Secondary Tap, On Double Tap, On Long Press | none | **merge**: into the Wrappers page; wiki link `[[Intro to Circuit]]` renders as plain text. |
| `docs/ui/wrappers/material.md` | `/ui/wrappers/material` | Material | Material wrapper properties. | Color, Elevation, Shadow Color, Tint Color, Border, Border on Foreground | `docs/ui/wrappers/img/material.gif` | **merge**: into the Wrappers page. |
| `docs/ui/wrappers/opacity.md` | `/ui/wrappers/opacity` | Opacity | Add the Opacity wrapper (0 to 1) and Always Include Semantics. | Add Wrapper > Opacity, value 0-1, Always Include Semantics | `docs/ui/wrappers/img/opacity.gif` | **merge**: into the Wrappers page. |
| `docs/ui/wrappers/text-direction.md` | `/ui/wrappers/text-direction` | Text Direction | Left-to-right / right-to-left text direction wrapper. | LTR, RTL | `docs/ui/wrappers/img/text-direction.gif` | **merge**: into the Wrappers page; wiki link `[[Text]]` renders as plain text. |
| `docs/ui/wrappers/visibility.md` | `/ui/wrappers/visibility` | Visibility | Show or hide a widget with a replacement. | Visible, Replacement | `docs/ui/wrappers/img/visibility.gif` | **merge**: into the Wrappers page. |
| `docs/ui/themes/` | `/category/themes` | **Category: Themes** | generated index page: "Learn how to create and themes. Create colors, typographies and more" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/ui/themes/create-themes.md` | `/ui/themes/create-themes` | Create themes | Default Light/Dark themes in `globals/themes.dart`, setup for old projects, set default, create/rename/delete themes, switch theme at runtime. | `themes.dart` (globals folder), Style > Connect > Create, Set as default, Create New Theme, App State node, `changeTheme` | `docs/ui/themes/img/globals.png`; `docs/ui/themes/img/{create-theme-old,change-themes,change-theme-dynamic}.gif` | **rewrite**: page itself says it is outdated. [WN] 3.0.0 redesigned theme editor in the left bar, 3.0.8 removed the old way of changing themes, 3.12.3 Figma styles to theme and up to 8 theme extensions. |
| `docs/ui/themes/colors-themes.md` | `/ui/themes/colors-themes` | Colors | Theme color roles, loading defaults, linking widget colors to the theme, opacity, defaults for new widgets. | Primary ... On Background roles, "Colors from" (Light/Dark), theme colors in the color picker, "With Opacity" | `docs/ui/themes/img/colors-from.png`; `docs/ui/themes/img/{change-colors,container-theme,add-opacity,button-theme}.gif` | **rewrite**: self-flagged outdated. [WN] describes the old `themes.dart` editor (3.0.0 theme editor in the left bar); "Colors from" still in code (`packages/core/lib/src/fields/color_fields.dart:107`), "With Opacity" not found. |
| `docs/ui/themes/typograhies.md` | `/ui/themes/typograhies` | Typography | Typography styles per theme, linking a Text style, editing styles, copy-with overrides, detaching. | `themes.dart` > Typography, Display Large ... Label Large, Style property, Edit, "Copy with", "Detach Style" | `docs/ui/themes/img/typoghraphies.png`; `docs/ui/themes/img/{change-styles,change-text-typo,access-style-from-widget,copywith,detach}.gif` | **rewrite**: self-flagged outdated. [WN] describes the old `themes.dart` editor (3.0.0); "Copy with" and "Detach Style" not found in code. Slug typo "typograhies". |
| `docs/ui/design-courses/` | `/category/design-courses` | **Category: Design courses** | generated index page: "See full design tutorials for common screens" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/ui/design-courses/ecommerce-app.md` | `/ui/design-courses/ecommerce-app` | E-Commerce App | Only a YouTube design course: e-commerce app UI (Ludo). | designer (old UI) | YouTube `Qp-3ylrUOJk` | **keep-as-is**: D4, move untouched to Legacy tutorials. [STUB] video only. |
| `docs/ui/design-courses/booking-app.md` | `/ui/design-courses/booking-app` | Hotel Booking App | Only a YouTube design course: hotel booking app UI (Ludo). | designer (old UI) | YouTube `egbjhuFV86s` | **keep-as-is**: D4, move untouched to Legacy tutorials. [STUB] video only. |
| `docs/ui/design-courses/football-app.md` | `/ui/design-courses/football-app` | Football App | Only a YouTube design course: football app UI (Ludo, EURO 2024). | designer (old UI) | YouTube `-OYzLFvaRbI` | **keep-as-is**: D4, move untouched to Legacy tutorials. [STUB] video only. |
| `docs/ui/design-courses/workout-planner.md` | `/ui/design-courses/workout-planner` | Workout Planner App | Only a YouTube design course: workout planner UI ("logic part will follow-up"). | designer (old UI) | YouTube `Q7Q8UZ24n4U` | **keep-as-is**: D4, move untouched to Legacy tutorials. [STUB] video only. |

### 6. Building Logic and Action

Generated index `/logic` (from `docs/logic/_category_.json`): "learn using Circuit to build logic and actions for your app"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/logic/intro-circuit.md` | `/logic/intro-circuit` | What is Circuit | Circuit, the visual logic editor: opening it, top-to-bottom flow, node types, managing nodes, return values, local variables, generated code. | "Edit" on functions and events, yellow function node (parameters), "+" add node, Action / Value / Control-flow nodes, "Store result", Remove, Move Up/Down (Shift+arrows), Return node, "Create local variable" | `/img/circuit/intro/{add-nodes,load-data-example}.png` | **rewrite**: Circuit is still a plugin (`lib/main.dart:42`) but the page predates the 3.x UI; present it as the visual alternative to the AI agent. |
| `docs/logic/control-flow/` | `/category/control-flow` | **Category: Control flow** | generated index page: "learn using the compound nodes to control the logic flow" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/logic/control-flow/if-statement.mdx` | `/logic/control-flow/if-statement` | If Statements | If node: branches and every way to set the condition. | If Statement node, Condition, True/False branches, linking menu (Locals, Globals), toggle, Custom Expression, Operators, Compute, "Open in Circuit", Detach, Create Variable / Create Param | `/img/circuit/control-flow/if/{dropping-if,if-with-variable,operator-with-if}.mp4`; `/img/circuit/control-flow/if/{nested-if,ifstatement-sections,toggle-condition}.png`; YouTube `8ThDp4Zyqyc` | **merge**: into a Circuit reference page; verify labels. |
| `docs/logic/control-flow/try-catch.mdx` | `/logic/control-flow/try-catch` | Try Node | Try node with an error variable, main branch and On Error branch; API example. | Try node, Error Name, On Error branch, Snackbar (Globals), Bottom Sheet / Dialog (Nowa category) | `/img/circuit/control-flow/try/try-catch.png`; `/img/circuit/control-flow/try/adding-try.mp4` | **merge**: into the Circuit reference page. |
| `docs/logic/common-functionalities/` | `/category/common-functionalities` | **Category: Common functionalities** | generated index page: "Learn using the common nodes in Nowa" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/logic/common-functionalities/navigation.md` | `/logic/common-functionalities/navigation` | Navigation | Navigator node: navigation types, passing parameters, returning data with Pop. | Navigator node (Globals), Type Push / Pop / PushReplacement / PushAndRemoveUntil, To, brush icon for parameters, await, OnValue | `/img/circuit/common-functionalities/navigation/{navigate-with-param,navigator-push-await,pop}.mp4`; `/img/circuit/common-functionalities/navigation/push-with-await.png` | **rewrite**: [WN] 3.5 made GoRouter the default router (screen paths, deep links); the page only covers Navigator push/pop. |
| `docs/logic/common-functionalities/media-picker.md` | `/logic/common-functionalities/media-picker` | Media Picker | Pick an image and display it: bytes variable, media picker node, XFile list, refresh. | Image widget bytes (Uint8List), media picker node options, XFile, Refresh | `/img/circuit/common-functionalities/media-picker/{set-image-bytes,build-logic,final-result}.mp4` | **rewrite**: useful how-to; verify node names in code. |
| `docs/logic/common-functionalities/print.md` | `/logic/common-functionalities/print` | Print | Print node and where to read printed messages. | Print node (Nowa category), Msg, log icon bottom-left, Errors / Logs tabs, `$` interpolation, custom expression | `/img/circuit/common-functionalities/print/{print,print-with-var,print-custom-expression}.mp4` | **merge**: into the Circuit reference. [WN] 3.9 "smarter logs" for App Run and preview (log panel moved). |
| `docs/logic/common-functionalities/open-url.md` | `/logic/common-functionalities/open-url` | Open Url | OpenUrl node with a static or dynamic URL; WebView as the in-app alternative. | OpenUrl node (Nowa category), Url field, linking menu | `/img/circuit/common-functionalities/others/openurl.png` | **merge**: into the Circuit reference. |
| `docs/logic/common-functionalities/platform-checking.md` | `/logic/common-functionalities/platform-checking` | Platform check | Platform check node and combining checks with expressions. | platform check node, available checks, Custom Expression, Expression Builder | `/img/circuit/common-functionalities/others/checkplatform.mp4` | **merge**: into the Circuit reference. |
| `docs/logic/ui-popups/` | `/category/user-interactions--ui-popups` | **Category: User Interactions & UI Popups** | generated index page: "How to show different types of user dialogs and popups" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/logic/ui-popups/dialog.md` | `/logic/ui-popups/dialog` | Dialog | showDialog node, AlertDialog builder, dialog options, async handling, returning data. | showDialog node (Nowa category), AlertDialog (brush icon), Barrier Dismissible / Color / Label, Use Safe Area, Use Root Navigator, Route Settings, Anchor Point, Await, OnValue, OnError, Store Result | `/img/circuit/ui-popups/dialog/show-basic-dialog.mp4`; `/img/circuit/ui-popups/dialog/showdialog-options.png` | **merge**: into the Circuit reference (popups). |
| `docs/logic/ui-popups/snackbar.md` | `/logic/ui-popups/snackbar` | Snackbar | Snackbar node properties, resetting to default, dynamic messages. | Snackbar node, properties, Set to Default / Null, custom expression | `/img/circuit/ui-popups/snackbar/{show-snackbar,reset-to-default,snackbar-custom-expression}.mp4`; `/img/circuit/ui-popups/snackbar/snackbar-properties.png` | **merge**: into the Circuit reference. |
| `docs/logic/ui-popups/date-picker.md` | `/logic/ui-popups/date-picker` | Date picker | showDatePicker node, required dates, await, cancel behavior, displaying and formatting dates. | showDatePicker node, firstDate / lastDate, await, format options (Intl patterns) | `/img/circuit/ui-popups/date-picker/{date-picker-future,await-date-picker}.png`; `/img/circuit/ui-popups/date-picker/datapicker-full-example.mp4` | **merge**: into the Circuit reference. |
| `docs/logic/ui-popups/time-picker.md` | `/logic/ui-popups/time-picker` | Time picker | ShowTimePicker node, await vs On Value, TimeOfDay, formatting. | ShowTimePicker node, await, On Value, TimeOfDay, `.format()` | `/img/circuit/ui-popups/time-picker/{timepicker-options,timeofday-options}.png`; `/img/circuit/ui-popups/time-picker/{time-picker,time-picker-using-onvalue}.mp4` | **merge**: into the Circuit reference; front-matter description copied from the date picker page. |

### 7. Variables, Parameters, and Functions

Generated index `/vars-params-functions` (from `docs/vars-params-functions/_category_.json`): "How to use the basic building blocks of variables, parameters, functions and Objects"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/vars-params-functions/create-variable.mdx` | `/vars-params-functions/create-variable` | Local Variables | Local variables: types, creating, binding to widgets, updating on events, expressions, creating from a widget property. | Variables Panel "+", types (String, Int, Double, Bool, List, Color, DateTime, custom), default value, Custom Expression | `docs/vars-params-functions/img/create-var-from-file-previewer.png`; `docs/vars-params-functions/img/change-value-dynamically.gif`; Arcade demos x6 | **rewrite**: core concept, keep; verify where the Variables panel lives now; Arcade demos show old UI. |
| `docs/vars-params-functions/local-parameter.mdx` | `/vars-params-functions/local-parameter` | Local Parameters | Parameters for screens and components: create, bind, pass on navigation, component example, FAQ. | parameters, quick create, linking menu, Navigator parameters, component instances | Arcade demos x4 | **rewrite**: core concept, keep; Arcade demos show old UI. |
| `docs/vars-params-functions/functions/` | `/category/functions-and-events` | **Category: Functions and events** | generated index page: "Learn how to use functions and events in Nowa" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/vars-params-functions/functions/create-local-function.mdx` | `/vars-params-functions/functions/create-local-function` | Create a screen function | Screen/component functions: create, return type, edit in Circuit, parameters, callbacks, storing results. | "+" next to Functions in the variables panel, return type, Edit, Return node, Locals | Arcade demos x1 | **rewrite**: merge events.mdx into it; the lifecycle-override page exists only as an unbuilt file (`functions/override-functions`). |
| `docs/vars-params-functions/functions/events.mdx` | `/vars-params-functions/functions/events` | Events | Event functions (onPressed, onChanged, ...): add with "+", edit in Circuit, remove. | Details Panel "+" next to an event, onPressed, onChanged, onEditingCompleted | none | **merge**: into the functions page. [DUP] repeats create-local-function.mdx. |
| `docs/vars-params-functions/data-models.md` | `/vars-params-functions/data-models` | Data Models | Data models (objects): create, add fields and functions, view code, use as types and create instances. | "+" next to `lib` in the Files panel, "Create new object", Path / Class, final fields, create instance in Circuit | `/img/vars-params-functions/data-models/{create-model,create-vars-inside-model,see-code,model-as-datatype,create-instance-from-model}.mp4`; YouTube `cnrIhGEGIeE` | **rewrite**: [WN] 3.9 merged the Files panel into code editing; "Create new object" not found in code. |
| `docs/vars-params-functions/global-states.md` | `/vars-params-functions/global-states` | Global States | Global state (ChangeNotifier-like): create, add variables and functions, register it, bind UI, update, call functions. | "+" next to `lib` > "New Global State", Class / Path, Submit, add to the app, notifyListeners | `/img/vars-params-functions/global-state/{create-global-state,add-to-global-state,adding-global-state,connecting-to-global-state,add-to-cart-function,use-add-to-cart}.mp4`; YouTube `cnrIhGEGIeE` | **rewrite**: [WN] Files panel removed (3.9), though code still has "New Global State..." in a files menu (`lib/project/panels/files_panel/add_lib_menu.dart:109`); verify the location. |

### 8. Data Sources

Generated index `/data-connections` (from `docs/data-connections/_category_.json`): "Discover how to pull data from sources and transmit it to any destination."

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/data-connections/firebase/` | `/category/firebase` | **Category: Firebase** | generated index page: "Enable login system using Firebase Authentication" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/data-connections/firebase/firebase-connect.md` | `/data-connections/firebase/firebase-connect` | Setup Firebase with the project | Only a YouTube video from Nowa V1: create a Firebase project, sign in from Nowa, auto-configure apps, auth providers, SHA fingerprint. | Firebase sign-in from Nowa, Authentication, Email and Google providers, SHA fingerprint | YouTube `ko_f9aDZwMg` | **rewrite**: [STUB] V1-era video, no text. |
| `docs/data-connections/firebase/firebase-email-auth.md` | `/data-connections/firebase/firebase-email-auth` | Email/password Authenticaion | Only a YouTube video from Nowa V1: email/password sign-up, sign-in, verification, reset, auto-login. | Firebase Auth, GitHub commit, simulator, generated code view | YouTube `N_Rqrbp8yMQ` | **rewrite**: [STUB] V1-era video only; title typo "Authenticaion". |
| `docs/data-connections/firebase/firestore.md` | `/data-connections/firebase/firestore` | Firestore integration | Only a YouTube video from Nowa V1: Firestore display, queries, streams, writes (shoe store). | Firestore queries, streams, add data | YouTube `vg4-c-BQCrk` | **rewrite**: [STUB] V1-era video only. |
| `docs/data-connections/firebase/notification.md` | `/data-connections/firebase/notification` | Push Notifications (FCM) | Enable push notifications (FCM), iOS capability, rebuild, send a test notification. | Settings > Firebase > Push Notifications, Xcode Push Notifications capability, message title / content / audience / sound, Send | `/videos/firebase/{1,2}.mp4`; `/img/firebase/{ios,android}.png` | **rewrite**: feature exists ("Push Notifications (FCM)", `packages/data/lib/src/firebase/setup/views/notification_settings.dart:43`); settings location changed (3.9 new settings page). |
| `docs/data-connections/firebase/known-issues/` | `/category/common-issues` | **Category: Common issues** | generated index page: "Some common issues that might appear using Firebase and how to work around them" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/data-connections/firebase/known-issues/firebase-windows.md` | `/data-connections/firebase/known-issues/firebase-windows` | Can't test Firebase on Windows version | Firestore queries cannot be tested in the Windows desktop app; three workarounds. | Firestore query test section, Nowa Web/macOS, Firestore Query Builder | `docs/data-connections/firebase/known-issues/img/firebase-windows.png` | **rewrite**: verify it is still true; says cloud GitHub integration is "coming soon" (shipped); fold into Firebase troubleshooting. [APP-LINK] |
| `docs/data-connections/supabase/` | `/category/supabase` | **Category: Supabase** | generated index page: "An introduction to Supabase, the open-source Firebase alternative." | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/data-connections/supabase/connect-supabase.md` | `/data-connections/supabase/connect-supabase` | Connect | Connect Supabase with OAuth (create or select a project) or manually with URL and key; see live data. | Supabase icon in the left panel, Connect, Authorize Nowa, Create New Project (name, Region, database password), Select, "Use keys" (code: "Use Keys"), Connect | `/videos/supabase/{1,createproject,selectproject,connectmanual,3}.mp4`; `/img/supabase/manual.jpg` | **rewrite**: flow still in code (`packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:79`); verify panel location after the 3.9/3.12 layout changes. |
| `docs/data-connections/supabase/mcp.md` | `/data-connections/supabase/mcp` | Supabase MCP | Supabase MCP lets the agent build the backend (tables, RLS, triggers, Edge Functions, storage) with approvals. | Supabase MCP icon in the Chat panel, approval before backend changes, Dev Diary video | `/img/supabase/supabase_mcp.png`; YouTube `bTy3cnsXDnA` | **rewrite**: mostly current (3.4); move into an "AI integrations (MCP)" page next to Figma MCP and Auto-approve tools (3.12.3). |
| `docs/data-connections/supabase/auth.md` | `/data-connections/supabase/auth` | Authentication | Supabase auth by AI prompt or by hand: sign-up test, login UI, SignIn / SignOut nodes, navigation and error dialog. | chat panel, attach SupabaseService, Widgets panel, TextField controllers, Screens icon > Empty Screen, OnPressed > SignIn, OnValue Navigator, OnError showDialog, SignOut | `/videos/supabase/auth/{ai,register,ui,ui2,signin1,signin2,signin3,logout,try}.mp4` | **rewrite**: no Google Sign-In (3.6); panel/icon locations outdated. |
| `docs/data-connections/supabase/db.md` | `/data-connections/supabase/db` | Queries | SQL primer, a todos table with RLS, generating Supabase queries with AI in Nowa, editing and testing them. | SQL Editor, Supabase AI, Table Editor (Supabase side); Nowa: "+" > prompt > Generate, single/multiple queries, query type icons, edit code / ask AI, Play to test (signed in) | `/videos/supabase/db/{create,supabaseai,visual,ai,multiquery,addtask,updatequery}.mp4`; `/img/supabase/{queries,editcode}.png` | **rewrite**: trim generic SQL and Supabase-dashboard steps; verify the Nowa query editor. |
| `docs/data-connections/supabase/ui.md` | `/data-connections/supabase/ui` | Connect Queries to UI | Bind a Supabase query to a ListView through Data Builder and a custom expression. | Widgets > ListView, Add wrapper > Databuilder, source Supabase, Query, Custom Expression `data[index]['task']`, Eval, Play | `/videos/supabase/ui/{listview,databuilder,item}.mp4` | **merge**: into the Supabase queries page. |
| `docs/data-connections/supabase/streams.md` | `/data-connections/supabase/streams` | Stream | Realtime stream queries: enable Realtime in Supabase, ask the AI for a stream query, Stream vs Select icons. | Enable Realtime (Supabase), stream query, Run, yellow Stream border | `/videos/supabase/db/{stream,stream2}.mp4`; `/img/supabase/{stream2,insert2}.png` | **merge**: into the Supabase queries page. |
| `docs/data-connections/supabase/storage.md` | `/data-connections/supabase/storage` | Storage | Supabase Storage: create a bucket, storage operations, generate and test storage queries. | new bucket (Supabase side), Upload / Download / Get Public URL / List / Move / Copy / Delete, "+" > Generate, Storage section in the left panel, Play | `/videos/supabase/storage/{createbucket,createqueries,example}.mp4`; `/img/supabase/storage.jpg` | **rewrite**: verify the storage query UI. |
| `docs/data-connections/api/` | `/category/api` | **Category: API** | generated index page: "Learn how to connect REST APIs to your app." | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/data-connections/api/createapi.md` | `/data-connections/api/createapi` | API Collection & API GET Call | API collection (base URL, headers), a GET request, test, generate a model, bind it with Data Builder. | "+" > New Collection > Submit, Class name / Path, Settings icon (Base URL), Add Header, New request, Test / Run Test, Generate Model > Next > Save, Data Builder source API Request, Locals > Data > Get Data | `/img/api2/post/collectionsettings.png`; `/videos/api2/collection/{create,url,header}.mp4`; `/videos/api2/request/{1,3,4,5}.mp4` | **rewrite**: core API guide; verify editor labels; no cURL import (2.0.21). |
| `docs/data-connections/api/Openrouter.md` | `/data-connections/api/Openrouter` | POST API Request | POST request with an auth header and a JSON body parameter; test, model, call from a button, show the result in a dialog. | GET/POST selector, Add header, Body parameter `${textinput}`, Json, Test, Generate Model, TextField, Button On Pressed > API, Text Controller, showDialog, Custom Expression, Eval | `/videos/api2/post/{1,2,3,4,5,6,7,8,9,10,11,12}.mp4`; `/img/api2/post/{model,value}.jpg` | **merge**: with createapi.md into one API guide; file and slug named after OpenRouter (misleading, mixed case). |
| `docs/data-connections/api/importapi/` | `/category/importing-from` | **Category: Importing from** | generated index page: "Learn how to import APIs to your app." | - | - | n/a: generated index; redirect to the closest new section page. [APP-LINK] |
| `docs/data-connections/api/importapi/postman.md` | `/data-connections/api/importapi/postman` | Postman | Export a Postman collection (v2.1) and import it by file or paste. | Import button in a collection, "Import from Postman", Upload File, paste JSON, Import | `/videos/api2/import/{postman-export,postman-json,postman-json2}.mp4` | **merge**: one "Import APIs" page (Postman, Swagger, Xano, cURL); the app links to `/category/importing-from`. [DUP] same structure as swagger/xano. |
| `docs/data-connections/api/importapi/swagger.md` | `/data-connections/api/importapi/swagger` | Swagger | Import a Swagger definition by URL, pasted JSON or file. | Import, "Import from Swagger", URL / JSON / Upload File | `/videos/api/{swagger-url,swagger-json,swagger-file}.mp4` | **merge**: into "Import APIs". [DUP] |
| `docs/data-connections/api/importapi/xano.md` | `/data-connections/api/importapi/xano` | Xano | Create a Xano metadata API token and import a Xano workspace. | Xano: Metadata API & MCP Server > Manage Access Token; Nowa: Import, "Import from Xano" | `/videos/api2/import/{xano1,xano2}.mp4` | **merge**: into "Import APIs". [DUP] |

### 9. Git & Github

Generated index `/git` (from `docs/git/_category_.json`): "Learn how to integrate git and github with your Nowa project"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/git/intro-git.md` | `/git/intro-git` | Using Git and Github with Nowa | Why Git, what Nowa can do with it, the local/cloud/GitHub sync model, setup paths, teamwork, branching. | local repository, clone into Nowa Cloud, push a cloud project, three synced copies diagram, branches | `/img/git/git-setup-explanation.png` | **rewrite**: [WN] 3.2 cloud projects come with Git, 3.5 local projects have built-in Git, 3.3.5 one-click GitHub, 3.12 Git over SSH. [APP-LINK] |
| `docs/git/token-github.md` | `/git/token-github` | Authenticate Github with Nowa | Connect GitHub: new "Connect to Gitub" button, then the legacy personal access token flow. | "Connect to Gitub" (typo), fine-grained token (GitHub side), Dashboard > Settings > Git > Remote credentials "+", Username / Access token, Add credentials | `/img/git/connect-github.png`; `/img/git/{generate-token,add-token}.mp4` | **rewrite**: keep one short "Connect GitHub" section; code shows "Legacy Remote Credentials" (`packages/core/lib/src/settings/git_settings.dart:280`); "local projects don't need it" is outdated (3.12 SSH). [APP-LINK] |
| `docs/git/clone-from-cloud.md` | `/git/clone-from-cloud` | Connect GitHub Repositories with Nowa Cloud Projects | Clone a GitHub repo into a cloud project; push a cloud project to a new GitHub repo (remote, identity, commit, sync). | Cloud Projects > New Project > Clone from GitHub, Git icon "next to the files icon", Create Git Repository, three-dot menu > Manage Remotes, Add Remote, Identity settings, Commit all, Sync | `/img/git/{clone-github-cloud,create-repo-github,push-cloud-to-remote}.mp4` | **rewrite**: [WN] cloud projects have Git pre-configured (3.2), so "Create Git Repository" is obsolete; 12-hour web links are gone (3.8.2). Two links go to the wrong page (auth guide -> git-local.md, deployment -> intro-git.md). |
| `docs/git/git-operations-cloud.md` | `/git/git-operations-cloud` | Git operations on Cloud projects | Git panel operations for cloud projects: changes, commit, sync, push/pull, discard, staging, branches. | Git icon next to the Files panel, Changes (green/blue/red), Commit All, Sync with counts, ... > Push / Pull, undo arrow (discard), Add files / Staged, Create new branch / From branch, delete branch | `/img/git/{newvschange,numberofsync}.png`; `/img/git/{git-committing,discard,staged-changes,create-branch}.mp4` | **rewrite**: [WN] 3.12.5 branch switching no longer needs a commit or discard (page says it does); no commit history / Revert (3.3.5), diff navigator (3.12) or conflict resolver. |
| `docs/git/git-local.md` | `/git/git-local` | Git on local projects | Use GitHub Desktop with a local project; saving; limitations. | GitHub Desktop Add Existing Repository, Save button / Ctrl+S, discard then reopen | YouTube `i2bmqTUCKfo` | **rewrite**: [WN] 3.5 built-in Git for local projects, 3.12 Git over SSH; "GitHub integration is limited to local projects, cloud coming soon" is wrong. |

### 10. Payments & In-App Purchases

Generated index `/payments` (from `docs/payments/_category_.json`): "Learn how to integrate payments and in-app purchases within your Nowa project"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/payments/stripe/` | `/payments/stripe` | **Category: Stripe Integration** | generated index page: "Learn how to integrate Stripe payments within your Nowa project" | - | - | n/a: generated index; redirect to the closest new section page. |
| `docs/payments/stripe/stripe-integration.md` | `/payments/stripe/stripe-integration` | Integrating Stripe in Nowa | Step-by-step Stripe setup: Supabase + MCP prerequisite, business info, purchase types, keys and webhook, Google/Apple Pay, products table mapping, deploy. | Settings > Stripe > Enable, Merchant Name, Country Code, Publishable Key, One-Time Purchase / Consumable / Subscription, Secret Key, Webhook URL, Webhook Secret Key, Google Pay, Apple Pay, Merchant ID, Business Table, ID Field, Amount Field, Currency / Fixed Value, Deploy Configuration | `/img/stripe/{enable-stripe,product-table,map-fields,supabase-tables}.png`; YouTube `L41ak_WGhPQ` | **keep-as-is**: newest guide (Apr 2026); labels match code (`packages/core/lib/src/integrations/stripe/stripe_settings.dart`, e.g. "Deploy Configuration" at :620). Restyle and re-home only. RevenueCat (3.6) has no page. |

### 11. Local projects and simulator

Generated index `/local-project-simulator` (from `docs/local-project-simulator/_category_.json`): "Explore how to create apps right from your own computer."

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/local-project-simulator/whylocalproject.md` | `/local-project-simulator/whylocalproject` | Why local projects | Cloud vs local projects: building, testing, using your own tools. | Cloud Build, Hot Reload, local/cloud indicator | `/img/checkprojectlocalorcloud.jpg` | **merge**: into a "Cloud vs local projects" page. [WN] 3.10 cloud projects can run locally with hot reload. [DUP] overlaps install.md and sync.md intros. |
| `docs/local-project-simulator/createlocalproject.md` | `/local-project-simulator/createlocalproject` | Create a local project | Download Nowa Desktop, set up Flutter (Xcode on macOS, automatic or manual setup), create a local project. | Download for Desktop, Settings > Local Setup > Set up automatically, Install (Flutter), Verify (`flutter doctor`), Android toolchain Install / Skip for now, Settings > Environment, "Ready · Managed by Nowa", Done, manual SDK path, Your Projects > Local Projects > New Local Project | `/videos/desktopversion/Download.mp4`; `/img/nowadesktop/autosetup/{1,2,3,4,5,6,7}.png`; `/img/nowadesktop/{1,2}.png`; `/img/nowadesktop/createlocalproject/{1,2,3,4,5,6,7}.png` | **rewrite**: the Flutter setup part is recent and matches code ("Set up automatically", `packages/core/lib/src/settings/editor_settings/local_setup.dart:148`; "Local Setup" tab, `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:33`) and two of its anchors are linked from the app; the dashboard steps predate 3.12. [APP-LINK] |
| `docs/local-project-simulator/openexisting.md` | `/local-project-simulator/openexisting` | Import a Flutter Project | Open an existing Flutter folder from the dashboard; supported-packages warning (Riverpod). | dropdown next to New Local Project > Open, Choose, Provider vs Riverpod | `/img/openexistinglocalproject.jpg` | **rewrite**: [WN] 3.12 workspace/monorepo package picker, 3.12.3/3.12.5 much wider Dart and FlutterFlow support; steps likely changed. |
| `docs/local-project-simulator/sync.md` | `/local-project-simulator/sync` | Cloud-Local Synchronization | Keep one project both in the cloud and locally: clone either way, sync direction, unlink (desktop app only). | Settings > Project Sync, Sync, Browse, Clone to Local, Clone to Cloud, from cloud / from local, Proceed with Sync, Unlink Project, onboarding video | `/videos/sync/{local,cloud,sync,unlink}.mp4`; YouTube `PB260DJZruA` | **rewrite**: sync exists ("Proceed with Sync" `packages/core/lib/src/settings/project_sync_settings.dart:436`, "Unlink Project" :122). [WN] the claim that cloud projects can only use the built-in previewer is wrong (3.9 App Run, 3.10 local run for cloud projects); "Clone to Local" not found in code. |
| `docs/local-project-simulator/simulator.md` | `/local-project-simulator/simulator` | Running on a simulator/physical device | Instant preview vs running a local project on simulators and real devices; logs, stop, hot reload. | Play preview with device frames, device menu top right (Chrome, macOS, Windows), Run, Logs tab, Stop, Hot Reload, iOS Simulator, Android emulator, USB debugging | `/videos/simulator/{builtinsimulator,simulator}.mp4` | **rewrite**: [WN] 3.10 Run button and local run for cloud projects (the "only local projects" warning is wrong), 3.9 App Run, 3.8.2 preview on your phone. |
| `docs/local-project-simulator/othertools.md` | `/local-project-simulator/othertools` | Using Other Tools on a Local Project: Git & IDE | Use your IDE and Git alongside Nowa on a local project. | IDE (VS Code, IntelliJ), Git commit/push/pull/branches, live sync | none | **merge**: [DUP] repeats intro-hybrid-approach.md and git-local.md. |

### 12. Deployment & Sharing

Generated index `/deployment` (from `docs/deployment/_category_.json`): "Learn how to deploy your app to any platform to run nativly" The app links to this index.

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/deployment/android-deploy.md` | `/deployment/android-deploy` | Build for Android | Android build: build type, signing key (generate or upload), branch, build, download the APK/AAB. | Settings icon > App Settings > Deployment > Mobile, Release / Debug, Signing Key Generate / Download, Key Alias, Key Password, Keystore Password, Browse (.jks), Save, branch, Build, Latest Build / Active Build | `/img/android_deploy/{1,2,3,4,5,6}.png` | **rewrite**: [WN] 3.9 new deployment UI and settings page, 3.10 Deploy button with one-click deploy; keep the signing-key guidance. [APP-LINK] |
| `docs/deployment/ios-deploy.md` | `/deployment/ios-deploy` | Build for iOS | iOS: Apple prerequisites, bundle ID, App Store Connect app, API key, distribution certificate, build. | Settings > Project Details (icon, package name), Apple Developer identifiers, App Store Connect, Issuer ID, Key ID, .p8, Settings > Deployment > Mobile > iOS Release, Distribution Certificate (.p12 / generate), Start New Build, Build | `/videos/ios_deploy/{bundle_id,create_bundle_id,create_api_key,start_build}.mp4`; `docs/deployment/img/add-app-ios.gif` | **rewrite**: keep the Apple-side steps and the certificate explainer (its anchor is linked from the app); [WN] Nowa-side steps use the old settings path (3.9 new deployment UI and settings page, 3.10 Deploy button). [PRICE] Apple's "$99 per year" (third party). [APP-LINK] |
| `docs/deployment/web-deploy.mdx` | `/deployment/web-deploy` | Build for Web | Web publishing: Development (12 h link) vs Production (custom domain), deactivate, download build files, DNS setup. | Web Deploy icon top right, Development / Production tabs, Publish, Build Failed, Open Link, Settings > Deactivate, Download Files, custom domain, CNAME/TXT records | `/videos/deployment/{web-publishing,web-opening-link}.mp4`; `docs/deployment/img/web-deploy-panel.png` | **rewrite**: [WN] 3.8.2 removed the Development environment for web preview/deploy; 3.10 new Deploy UI. [PRICE] "Pro and Premium plans" (old plan names). [APP-LINK] |
| `docs/deployment/share.md` | `/deployment/share` | Instant Preview Share | Share an interactive preview by link or QR code (public or private) without building; device switcher. | Play, Share, Public / Private, Copy link, QR Code, Open in your browser, device previews (iPhone, iPad, Android, Web, Desktop) | YouTube `ORa4ohpK4pQ` | **rewrite**: page says it is deprecated and "new docs coming soon". [WN] 3.12 share link opens on the played screen; 3.8.2 preview on your phone. |

### 13. Hybrid Approach & Custom code

Generated index `/hybrid-approach` (from `docs/hybrid-approach/_category_.json`): "Learn how to use your IDE next to Nowa"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/hybrid-approach/intro-hybrid-approach.md` | `/hybrid-approach/intro-hybrid-approach` | Intro to Hybrid Approach | Hybrid approach: a local project open in Nowa, an IDE and a simulator at once; setup, benefits, examples. | Nowa Desktop, local project, VS Code / Android Studio, hot reload, custom widgets / functions / classes, `code` chip bottom-left, Medium article | none | **rewrite**: [PRICE] says it needs a "Premium Plan" (old plan name, unverified). [WN] the bottom-left `code` chip was replaced by the `<>` code editor (3.9). |
| `docs/hybrid-approach/custom-code.md` | `/hybrid-approach/custom-code` | Custom code | Custom functions, widgets and classes; `@CustomFunction`; preview limitations and how to test custom code. | Circuit search (app category, Locals), widget picker "Components", Create node, `@CustomFunction`, instant preview placeholders, 12-hour web build | none | **rewrite**: [WN] 3.8.2 Nowa Run and 3.9 App Run run custom code in-app; the 12-hour development web build was removed (3.8.2). |

### 14. Tutorials and Templates

Generated index `/tutorials-template` (from `docs/tutorials-template/_category_.json`): "Here you will find quick tutorials on accomplishing important tasks on Nowa"

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/tutorials-template/chat-template.mdx` | `/tutorials-template/chat-template` | Chat template | Import the Chat template, what its three files do, testing and customizing it. | Screens icon > Chat Template > Import, Files Panel `chat_template` folder, `chat_page.dart`, `chat_bubble.dart`, `message_model.dart`, send(), refresh() | `/videos/templates/chat/{dropping-chat-template,running-template}.mp4` | **keep-as-is**: D4, move untouched to Legacy tutorials (still linked from What's New). [WN] describes the removed Files panel (3.9). |
| `docs/tutorials-template/design-responsive.md` | `/tutorials-template/design-responsive` | Make screen responsive | Responsive screens with columns and rows, sizing and spacing options; card example. | group orientation Column / Row, sizing Expand / Auto / Fixed, spacing Fixed / Between / Around / Evenly, Ctrl/Cmd+G | `docs/tutorials-template/img/{different-screens,columns-rows-screen,card-column-row}.png` | **keep-as-is**: D4, Legacy tutorials. [DUP] with the ui/layout pages. |
| `docs/tutorials-template/splashscreen.md` | `/tutorials-template/splashscreen` | Splash Screen | Only a YouTube video: timed splash screen that checks a stored token. | splash screen, shared preferences token | YouTube `1Uumpn9Xogo` | **keep-as-is**: D4, Legacy tutorials. [STUB] video only. |
| `docs/tutorials-template/form-validation.md` | `/tutorials-template/form-validation` | Form validation | Only a YouTube video: input validation in a sign-up form. | validators: not empty, email, min/max length, Regex | YouTube `Spa8d6e8BQ4` | **keep-as-is**: D4, Legacy tutorials. [STUB] video only. |
| `docs/tutorials-template/loading-indicator.md` | `/tutorials-template/loading-indicator` | Loading indicator | Only a YouTube video: show a loading indicator while signing in. | Circular loading indicator, Visibility wrapper, `isLoggingIn` variable | YouTube `YdMtODwGURw` | **keep-as-is**: D4, Legacy tutorials. [STUB] video only. |

### 15. Keyboard shortcuts (top-level page)

| Path | URL | Title | What it covers | Features / UI it names | Media used | Verdict |
|---|---|---|---|---|---|---|
| `docs/shortcuts.md` | `/shortcuts` | Keyboard shortcuts | Keyboard shortcut table for Windows and macOS. | Ctrl/Cmd+G group, Z undo, Shift+Z / Y redo, zoom, Alt-drag duplicate, C copy, paste, ] and [ layer order, P widget picker | none | **rewrite**: regenerate from code; the Paste row says Ctrl/Cmd+Z (should be V); newer shortcuts missing (e.g. Cmd/Ctrl-click go to definition, 3.12). |

## Files that are not live, and live pages outside `docs/`

| Path | URL | Title | What it covers | Verdict |
|---|---|---|---|---|
| `docs/data-connections/api/.authkey.md` | none (dotfiles are skipped) | Authentication key | Unfinished draft ("I hide it because i need to finish it"): pass an auth key in the request header or from a stored Shared Preferences key. | **retire**: never published; if the Shared Preferences option exists in code, cover it in the API guide. |
| `docs/vars-params-functions/functions/override-functions` | none (no `.md` extension) | Overriding built-in functions | Lifecycle overrides `initState` and `dispose`; one Arcade demo. Probably meant to use the unused `docs/vars-params-functions/functions/img/intiStatee.png`. | **merge**: lifecycle overrides belong on the new functions page. |
| `src/pages/markdown-page.md` | `/markdown-page` | Markdown page example | Docusaurus template example ("You don't need React to write simple standalone pages."). In the sitemap. | **retire**: template leftover; delete and redirect to `/`. |
| (theme) | `/search` | Search the documentation | Algolia search page (`searchPagePath: 'search'`). | **keep-as-is**: generated by the search theme. |
| (theme) | `/404` | Page Not Found | Docusaurus 404 page (not in the sitemap). | **keep-as-is**: generated. |

## Flags

### Stubs (28)

- **"Coming soon" only (15):** `ui/widgets/widget-desc/` admob-banner, alert-dialog, appbar, cross-fade, drawer,
  empty-widget, floating-action-button, index-stack, pageview, slider, svg, tabview, textfield, webview, wrap.
  All but empty-widget are linked from the app's widget picker.
- **A single YouTube video and no text (12):** `ui/widgets/widget-desc/data-builder.md`,
  `ui/widgets/widget-desc/navigation-bar.md`, `data-connections/firebase/firebase-connect.md`,
  `firebase-email-auth.md`, `firestore.md` (all three Nowa V1), `ui/design-courses/*` (4), `tutorials-template/`
  splashscreen, form-validation, loading-indicator.
- **Links only (1):** `ui/layout/intro-layout.md`.
- Thin but not stubs: `local-project-simulator/othertools.md`, `local-project-simulator/openexisting.md`,
  `local-project-simulator/whylocalproject.md`.

### Duplicates and overlaps

1. Create a cloud project: `getting-started/install.md` and `getting-started/quickstart.md` (same four steps).
2. Cloud vs local projects: `getting-started/install.md` ("Projects: Local or Cloud?"),
   `local-project-simulator/whylocalproject.md`, the intro of `local-project-simulator/sync.md`.
3. Your IDE and Git next to Nowa: `local-project-simulator/othertools.md`, `hybrid-approach/intro-hybrid-approach.md`,
   `git/git-local.md`.
4. Prompting: `ai/prompttip.mdx` and `ai/exampleprompts.mdx`.
5. Data-bound lists: `ui/widgets/widget-desc/listview.md` and `data-builder.md` embed the same video
   (`_ko4iKVXVuA`); `gridview.md`, `data-connections/supabase/ui.md` and step 6 of `data-connections/api/createapi.md`
   repeat the Data Builder binding.
6. Layout: `ui/layout/rows-and-columns.md`, `ui/layout/intro-layout.md` and `tutorials-template/design-responsive.md`
   explain the same sizing and spacing options.
7. Widget and wrapper lists: `ui/widgets/widgets-ref.md` vs the 35 `widget-desc` pages (and the unrelated
   `ui/widget-panel.md`); `ui/wrappers/wrappers-intro.md` vs `wrappers-list.md` vs 7 one-wrapper pages.
8. Functions: `vars-params-functions/functions/events.mdx` repeats `create-local-function.mdx`.
9. API import: `importapi/postman.md`, `swagger.md`, `xano.md` share one structure.
10. Supabase queries: `data-connections/supabase/db.md`, `ui.md`, `streams.md` (and `storage.md` follows the same
    pattern).
11. Git setup: `git/intro-git.md`, `git/clone-from-cloud.md`, `git/token-github.md` each describe how to connect.
12. Dialogs: `logic/ui-popups/dialog.md`, the stub `ui/widgets/widget-desc/alert-dialog.md`, step 10 of
    `data-connections/api/Openrouter.md`.
13. await / OnValue / Store result are re-explained in `logic/intro-circuit.md`, `navigation.md`, `dialog.md`,
    `date-picker.md`, `time-picker.md`.

### Prices, credit numbers, plan names and plan limits (D3)

| Page | What it states |
|---|---|
| `ai/price.md` | Plan table: Starter 5 AI messages/month free; Launch 50, $29 monthly / $24 annually; Scale 200 (plus extra), $59 / $49; Enterprise custom. Per-plan feature claims (custom domain, mobile deployment, GitHub integration, SSO, audit logs, on-premise). |
| `getting-started/introduction.md` (line 110-119) | Free plan "Unlimited active projects ... 5 AI messages per month"; "custom plans" for teams. |
| `ai/howtouseai.mdx` (line 33-34) | "0.05–0.1 credits" for a small tweak, "around 1 credit" for a page. |
| `deployment/web-deploy.mdx` (line 16, 26) | Development link "expires every 12 hours"; Production "only for users with Pro and Premium plans" (old plan names). |
| `hybrid-approach/intro-hybrid-approach.md` (line 24) | Local projects "requiring a Premium Plan". |
| `deployment/ios-deploy.md` (line 22) | Apple Developer Program "costs $99 per year" (third-party price). |
| `new/whats-new.md`, `new/change-log.md` | Credit amounts and plan details (3.0.0 plan list, 50 free credits, 15 referral credits, $25 credits, "double the daily limits"). D6: leave untouched. |
| Plan or limit statements without numbers | `local-project-simulator/createlocalproject.md:125` ("no premium plan required"), `ai/prompttip.mdx` (free credits for bug reports), `git/clone-from-cloud.md:25` and `hybrid-approach/custom-code.md:60` (12-hour web versions). |

### Contradicted by What's New (34 pages)

| Page | The page says | What's New says |
|---|---|---|
| `getting-started/install.md` | Sign up with email or Google; dashboard layout; yellow "New Cloud Project" button | 3.12.0: Sign in with Apple; "We rebuilt the top bar and cleaned up the dashboard" |
| `getting-started/exploreinterface.mdx` | Toolbar "at the very top"; Files panel; Test Mode simulator | 3.10: "Toolbar moved to the bottom", "Boards moved to the top right", Run and Deploy buttons; 3.9: "the separate Files panel is gone", new Assets panel, Outline moved left, `<>` code editor |
| `getting-started/quickstart.md` | "New Cloud Project"; Chat icon on the left | 3.12.0 dashboard clean-up; 3.9/3.10 play and run flow |
| `ai/howtouseai.mdx` | One Think Mode toggle (brain icon) | 3.5: four modes "Instant, Thinking, Deep Thinking, and Max"; 3.6/3.9 Planning Mode; 3.4 Agent Creation Summary; 3.12.3 Figma icon next to the Supabase one in the chat |
| `ai/prompttip.mdx` | Report bugs with Feedback > Report | 3.7: "Click the ? icon in the bottom-right corner to chat with us directly ... report issues" |
| `ui/boards.mdx` | Boards are tabs at the top, saved in the Files panel | 3.10: "Boards moved to the top right"; 3.9: Files panel gone |
| `ui/toolbar.md` | Toolbar at the top of the Design Board | 3.10: "Toolbar moved to the bottom" |
| `ui/widget-panel.md` | Widgets Panel = Pages and Components tabs | 3.12.5: "A lighter Widgets panel: previews play their animations" (a panel of widget previews). Verify in code. |
| `ui/screens.md` | Screens live in the Files panel | 3.9: Files panel gone; 3.5: "Each screen has a path"; 3.12.0: screen descriptions |
| `ui/outline.md` | Outline in the top-left corner of the Design Board | 3.9: "Outline moved to the left side" |
| `ui/assets.md` | Assets in the Files panel's Assets section | 3.9: "New Assets panel for uploading and managing your assets" |
| `ui/components.md` | Delete components from the Files panel | 3.9: Files panel gone |
| `ui/themes/create-themes.md`, `colors-themes.md`, `typograhies.md` | Themes are edited in `globals/themes.dart`; Style > Connect | 3.0.0: "Access the new theme editor from the left bar"; 3.0.8: "Removed the older way of changing themes" |
| `logic/common-functionalities/navigation.md` | Navigator push/pop only | 3.5: "All new projects now use GoRouter. Each screen has a path" |
| `logic/common-functionalities/print.md` | Log icon bottom-left, Errors/Logs popup | 3.9: "Smarter logs that cover both App Run and preview" |
| `vars-params-functions/data-models.md`, `global-states.md` | "+" next to `lib` in the Files panel | 3.9: "Files merged into code editing — the separate Files panel is gone" |
| `git/intro-git.md` | Create a repository from your project; push cloud projects to GitHub | 3.2: every cloud project has Git pre-configured; 3.5: Git enabled by default for local projects; 3.3.5 one-click GitHub; 3.12 Git over SSH |
| `git/clone-from-cloud.md` | "Create Git Repository"; Git icon next to the files icon; 12-hour web versions | 3.2 Git pre-configured; 3.9 Files panel gone; 3.8.2 "Removed the Development environment for Web Preview/Deploy" |
| `git/git-operations-cloud.md` | "You cannot switch branches if you have unsaved changes"; no history view | 3.12.5: "Switch Branches Without Committing First"; 3.3.5: Commit History and Revert |
| `git/git-local.md` | Use GitHub Desktop; "GitHub integration is currently limited to local projects", cloud "soon" | 3.5: Git for Local Projects; 3.2: cloud Git; 3.12: Git over SSH |
| `local-project-simulator/whylocalproject.md` | Cloud projects must download code or rebuild to test | 3.10: "Local Run for Cloud Projects ... hot reload works too" |
| `local-project-simulator/openexisting.md` | Open a folder; unsupported packages may not display | 3.12.0: choose a package in workspaces and monorepos; 3.12.3/3.12.5: much more of your code renders |
| `local-project-simulator/sync.md` | Cloud projects can only use the built-in previewer for testing | 3.9 App Run; 3.10 local run for cloud projects |
| `local-project-simulator/simulator.md` | "Only local projects can be run on simulators or real devices" | 3.10: Local Run for Cloud Projects and a Run button; 3.8.2: preview on your phone |
| `deployment/android-deploy.md`, `ios-deploy.md` | Settings > Deployment > Mobile tab | 3.9: new deployment UI and settings page; 3.10: Deploy button top right, "deploy to any platform from the main window with a single click" |
| `deployment/web-deploy.mdx` | Development mode with a 12-hour link | 3.8.2: "Removed the Development environment for Web Preview/Deploy"; 3.10 new Deploy UI |
| `deployment/share.md` | (self-flagged deprecated) Play > Share | 3.12.0: the share link opens on the screen you played; 3.8.2: preview on your phone |
| `hybrid-approach/intro-hybrid-approach.md` | Cloud custom code through the `code` chip bottom-left | 3.9: "click the `<>` icon in the top right to open the full code panel" |
| `hybrid-approach/custom-code.md` | Instant preview does not run custom code; test with a 12-hour web build | 3.8.2 Nowa Run runs the real app; 3.9 App Run compiles custom code; development web environment removed |
| `tutorials-template/chat-template.mdx` (legacy) | Template files appear in the Files Panel | 3.9: Files panel gone (page stays untouched, D4) |

### Other defects

- **Wiki-style links that render as plain text:** `ui/widgets/widget-desc/button.md` (`[[Text]]`, `[[Themes]]`),
  `ui/wrappers/gesture-detector.md` (`[[Intro to Circuit]]`), `ui/wrappers/text-direction.md` (`[[Text]]`).
- **Links to the wrong page:** `git/clone-from-cloud.md` ("See authentication guide" goes to `git-local.md`; "Read
  more about deployment" goes to `intro-git.md`); `ui/wrappers/wrappers-list.md` (Gesture detector, Text Direction
  and Visibility go to `wrappers-intro.md`); `ui/widgets/widget-desc/text.md` (both "Layout" links go to
  `container.md`).
- **Copied front-matter descriptions:** `widget-desc/loading-circular.md` ("How to use button widget"),
  `logic/ui-popups/time-picker.md` (the date picker's), four Git pages share "How to create a Github Repo out of your
  project" (`intro-git`, `token-github`, `clone-from-cloud`, `git-local`).
- **Typos in slugs, titles and folders:** `/ui/temlpates`, `/ui/layout/constrains`, `/ui/themes/typograhies`,
  "Email/password Authenticaion", "Connect to Gitub", `static/videos/qucikstart/`, `intiStatee.png`; category
  descriptions "responvise" (Layout), "nativly" (Deployment), "Learn how to create and themes" (Themes).
- **Self-flagged outdated or deprecated:** the three theme pages, `deployment/share.md`, and the Firebase V1 note on
  `firebase-connect.md`, `firebase-email-auth.md`, `firestore.md`.
- **Wrong content:** `shortcuts.md` lists Paste as Ctrl/Cmd+Z; `getting-started/introduction.md` claims an Airtable
  integration.
- **What's New (D6, leave unless the orchestrator approves a link fix):** empty link `[try the app yourself here]()`
  at line 666 (build warning); `https://app.nowa.com/` (wrong domain) at line 177.
- **Pages with no H1 (52; the title comes from front matter):** `new/change-log.md`, `ui/boards.mdx`, `ui/toolbar.md`, `ui/widget-panel.md`, `ui/screens.md`, `ui/temlpates.mdx`, `ui/widgets/widgets-ref.md`, `ui/widgets/widget-desc/container.md`, `ui/widgets/widget-desc/listview.md`, `ui/widgets/widget-desc/text.md`, `ui/widgets/widget-desc/admob-banner.md`, `ui/widgets/widget-desc/alert-dialog.md`, `ui/widgets/widget-desc/appbar.md`, `ui/widgets/widget-desc/cross-fade.md`, `ui/widgets/widget-desc/data-builder.md`, `ui/widgets/widget-desc/drawer.md`, `ui/widgets/widget-desc/empty-widget.md`, `ui/widgets/widget-desc/floating-action-button.md`, `ui/widgets/widget-desc/index-stack.md`, `ui/widgets/widget-desc/linear-progress-indicator.md`, `ui/widgets/widget-desc/navigation-bar.md`, `ui/widgets/widget-desc/pageview.md`, `ui/widgets/widget-desc/slider.md`, `ui/widgets/widget-desc/svg.md`, `ui/widgets/widget-desc/tabview.md`, `ui/widgets/widget-desc/textfield.md`, `ui/widgets/widget-desc/webview.md`, `ui/widgets/widget-desc/wrap.md`, `ui/outline.md`, `ui/layout/intro-layout.md`, `ui/layout/constrains.md`, `ui/layout/groups.mdx`, `ui/layout/rows-and-columns.md`, `ui/assets.md`, `ui/components.md`, `ui/wrappers/visibility.md`, `ui/themes/create-themes.md`, `ui/themes/colors-themes.md`, `ui/themes/typograhies.md`, `logic/control-flow/if-statement.mdx`, `logic/common-functionalities/print.md`, `vars-params-functions/create-variable.mdx`, `vars-params-functions/local-parameter.mdx`, `vars-params-functions/functions/create-local-function.mdx`, `vars-params-functions/functions/events.mdx`, `data-connections/firebase/known-issues/firebase-windows.md`, `git/intro-git.md`, `git/git-operations-cloud.md`, `git/git-local.md`, `deployment/android-deploy.md`, `deployment/ios-deploy.md`, `hybrid-approach/custom-code.md`.
- **Pages with no front matter (10):** `ui/widgets/widget-desc/checkbox.md`, `ui/widgets/widget-desc/html.md`, `ui/widgets/widget-desc/icon.md`, `ui/widgets/widget-desc/listtile.md`, `ui/widgets/widget-desc/lottie.md`, `ui/widgets/widget-desc/markdown.md`, `ui/widgets/widget-desc/rive.md`, `data-connections/api/importapi/postman.md`, `data-connections/api/importapi/swagger.md`, `data-connections/api/importapi/xano.md`.
- **Media hygiene:** 51 videos live under `static/img/` instead of `static/videos/`; many file names are generic
  (`Clipboard-20251002-...mp4`, `Pasted-image-...png`); 162 files are unused: 115 in `static/img`, 13 in `static/videos`,
  34 next to pages (see `media-inventory.md`).

## Build result and warnings

Commands (run in `/home/user/docs`, nothing under `docs/`, `src/`, `static/` or the config was edited):

1. `yarn install --frozen-lockfile`: OK (60 s). Warnings: `package-lock.json` exists next to `yarn.lock`; unmet peer
   dependencies `react-loadable` (react-loadable-ssr-addon-v5-slorber), `@types/react` (@mdx-js/react),
   `@algolia/client-search` and `search-insights` (Algolia autocomplete).
2. `yarn build` = `node scripts/check-videos.mjs && docusaurus build`: **passed** at commit 06959a5.
   - Video check: "Validated 147 video embed(s) and 147 unique MP4 file(s)."
   - Docusaurus 3.10.0: client and server compiled; "Generated static files in build". 166 HTML routes
     (134 docs, 29 category indexes, `/search`, `/markdown-page`, `/404`).
3. Re-built at HEAD 780c242 (the orchestrator added a `<Badge>` component during step 2) into a scratch folder:
   **passed**, identical 165-URL sitemap. Docusaurus printed "Update available 3.10.0 → 3.10.2".

Warnings printed by the build:

| Warning | Where | Notes |
|---|---|---|
| `Markdown link with empty URL found in source file "docs/new/whats-new.md" (666:139).` (printed twice: client and server) | `docs/new/whats-new.md:666` | `[try the app yourself here]()` in the 3.0.10 entry. D6. |
| `Browserslist: browsers data (caniuse-lite) is 6 months old.` | build tooling | Harmless; `npx update-browserslist-db@latest` updates it. |

No broken links (`onBrokenLinks: 'throw'` would have failed the build), no broken Markdown links
(`onBrokenMarkdownLinks: 'warn'`), and no broken-anchor warnings.

Problems the build does not report (found by inspecting `build/`):

- **Social card image missing:** `themeConfig.image: 'img/nowa_icon.png'` renders as
  `og:image = https://docs.nowa.dev/img/nowa_icon.png`, but `static/img/nowa_icon.png` does not exist (404).
- **Sidebar swizzles are broken:** every sidebar link and category gets a junk `label="[object Object]"` HTML
  attribute (19 on `/ai/howtouseai`), and the Supabase category icon (`customProps.icon: "ti ti-brand-supabase"`)
  is not rendered. See "Site customizations".
- Two files under `docs/` are never built (see above); `src/pages/markdown-page.md` ships a template page.

## Site customizations

| Item | What it does | Notes for the rewrite |
|---|---|---|
| Homepage | No `src/pages/index.js`: because docs are served at `/` (`routeBasePath: '/'`), the homepage is `docs/index.md` ("Nowa Documentation Overview"), a doc page with the sidebar. It imports `docs/cards.module.css` and renders 13 `<Link>` cards (12 category index URLs and `/shortcuts`). | New homepage = rewrite `docs/index.md` (or add `src/pages/index.js` and move the docs index). |
| `docs/cards.module.css` | CSS module for the homepage grid: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`, 1.5rem gap; cards with 12px radius, `--ifm-card-background-color`, shadow, lift on hover. | Lives inside `docs/` but is not a page. |
| `src/pages/index.module.css` | Template `.heroBanner` / `.buttons` styles. | Unused leftover. |
| `src/pages/markdown-page.md` | Template example page at `/markdown-page` (in the sitemap). | Delete and redirect. |
| `src/components/HomepageFeatures/` | Docusaurus template feature row ("Easy to Use", "Focus on What Matters", "Powered by React"). Not imported anywhere. It `require`s `static/img/undraw_docusaurus_*.svg` (underscores), but the files are `undraw-docusaurus-*.svg` (hyphens), so importing it would break the build. | Dead code; delete with the three undraw SVGs and `static/img/docusaurus.png`. |
| `src/components/Badge/` + `src/theme/MDXComponents.js` | Added for the rewrite in commit 780c242 (2026-10-06): a global `<Badge type="...">` (types `beta`, `enterprise`, `paid`, `desktop`, `web`, `local`, `cloud`) usable in any page without an import. | Not used by any live page yet. |
| `src/theme/DocSidebarItem/index.js`, `Category/index.js`, `Link/index.js` | Wrapper swizzles meant to append a Tabler icon (`<i className={customProps.icon}>`, color `customProps.color`, default `#3FCF8E`) after a sidebar label. Only `docs/data-connections/supabase/_category_.json` sets `customProps` (`ti ti-brand-supabase`). | **Broken with the installed Docusaurus 3.10.0:** the original components render `item.label`, ignore the passed `label` prop and spread it onto the `<a>` as `label="[object Object]"`; no icon renders. Remove, or re-implement (for example with `className` and CSS). |
| Tabler icons | `stylesheets: ["https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"]` (unpinned `@latest`, loaded on every page) for the sidebar icons above. | Drop with the swizzles, or pin a version. |
| `src/css/custom.css` | Infima overrides: primary `#e9890e` (light) and `#ffab3f` (dark); code font 95%; highlighted-line backgrounds. The `-dark/-darker/-darkest/-light/-lighter/-lightest` shades are still the template's green/teal values (`#29784c`, `#21af90`, ...), so hover and active states mix orange with green. | Generate a proper orange scale. |
| `sidebars.js` | One sidebar, `tutorialSidebar: [{type: 'autogenerated', dirName: '.'}]`; order comes from `sidebar_position` and `_category_.json` `position`. Ties: Git & Github and Payments both 6; Hybrid and Tutorials both 13; `shortcuts.md` has no position (last). | The new IA will likely need an explicit sidebar. |
| `docusaurus.config.js` (site) | `title: 'Nowa Documentation'`, tagline "The official Documentation for Nowa", `url: 'https://docs.nowa.dev/'`, `baseUrl: '/'`, `trailingSlash: false`, `organizationName: 'nowaproj'`, `projectName: 'docs'`, `deploymentBranch: 'gh-pages'`, `favicon: 'img/favicon.ico'`, i18n `en` only. | |
| `docusaurus.config.js` (links) | `onBrokenLinks: 'throw'`; `markdown.hooks.onBrokenMarkdownLinks: 'warn'`. | Keep `throw`; it guards the redirect work. |
| `docusaurus.config.js` (presets) | `classic` preset: docs at `/` with `sidebars.js`, `blog: false`, `customCss`, `gtag: {trackingID: 'G-CMNS133C82', anonymizeIP: false}`. No `@docusaurus/plugin-client-redirects`. | Add the redirects plugin for old URLs. |
| PostHog | Plugin `posthog-docusaurus` with a public project key, `appUrl: 'https://us.i.posthog.com'`, `enableInDevelopment: false`. | Keep. |
| Algolia | `appId: 'C8KMOL6UCU'`, public search key, `indexName: 'nowa'`, `contextualSearch: true`, `replaceSearchResultPathname: {from: '/docs/', to: '/'}`, `searchPagePath: 'search'`. | The index must be re-crawled after the rewrite; old URLs in the index rely on redirects. |
| Theme config | `image: 'img/nowa_icon.png'` (missing file, see above); `colorMode: {defaultMode: 'dark', disableSwitch: false, respectPrefersColorScheme: false}`; announcement bar commented out ("Nowa 3.0 Docs are live!"); Prism `github` (light) and `dracula` (dark). | Fix or replace the social card. |
| Navbar | Title "Nowa Documentation", logo `img/logo.svg`; right side: "Get Started" -> `https://app.nowa.dev/signup`, "Sign In" -> `https://app.nowa.dev/` (Algolia adds the search box). No docs sections in the navbar. | |
| Footer | Dark style, three columns. Product: Main website (`https://nowa.dev`), Get started with Nowa (`https://app.nowa.dev/signup`), Sign In (`https://app.nowa.dev`). Resources & Communities: Youtube, Discord (`https://discord.gg/ByKfn3H7gX`), Reddit (`r/nowa`). More: Instagram, LinkedIn, Twitter. Copyright "Copyright © (current year) Nowa. All rights reserved". | |
| `package.json` | `@docusaurus/core` and `preset-classic` `^3.9.1` (3.10.0 installed), `posthog-docusaurus`, `globby`, React 18; devDependencies include the unused legacy `docusaurus@^1.14.7` and `gh-pages`. Scripts: `build` and `deploy` run `check:videos` first. Node >= 18. | |
| `scripts/check-videos.mjs` | Runs before every build. Every `<video>` in `docs/` must have `controls`, `playsInline`, `preload="metadata"` and exactly one `<source>` with a root-relative `.mp4` path, `type="video/mp4"`, and an exact-case existing file. ffprobe checks: MP4 container, one H.264 High stream at level 4.1 or lower, `yuv420p`, at most 1920x1080 and 30 fps, AAC-LC audio, fast start (`moov` before `mdat`). | Rules every new video must follow (also in `README.md`). |
| `.github/workflows/` | `deploy.yml`: on push to `main`, Node 20, installs ffmpeg, `yarn build`, publishes `build/` to `gh-pages` (peaceiris/actions-gh-pages). `test-deploy.yml`: same build on pull requests to `main`. | GitHub Pages: redirects must be client-side pages. |
| Repo docs | `README.md` (build and video rules), `documentation-guideline.md` (clarity, numbered steps, one action per step, verify against the product). | |
