# Old URL map (current live site)

Source: `/home/user/docs` branch `docs-rewrite`, built with `yarn build` (Docusaurus 3.10.0) on 2026-10-06 at commit
06959a5 and re-built at 780c242 with an identical sitemap. Researcher: current-docs inventory agent.

`old-urls.txt` (same folder) holds the same 166 paths, one per line, sorted. They are every URL in `build/sitemap.xml`
(165, `https://docs.nowa.dev` prefix stripped) plus `/404`, the only other HTML route in `build/`.

| Kind | Count |
|---|---|
| Doc pages (`docs/**/*.md(x)`) | 134 |
| Generated category index pages (`_category_.json` with `link.type: generated-index`) | 29 |
| Standalone page from `src/pages/` (`/markdown-page`) | 1 |
| Theme pages: Algolia search (`/search`), 404 (`/404`) | 2 |
| **Total** | **166** |

## How these URLs are formed (needed for redirects)

- Docs are served at the site root (`routeBasePath: '/'`), so a doc's URL is its path under `docs/` without the
  extension. No page sets `slug` or `id` in its front matter, so every doc URL follows its file path exactly.
- `trailingSlash: false`: each route is written as `<path>.html` (the root is `index.html`) and linked without a
  trailing slash.
- URLs are case-sensitive on GitHub Pages. One old URL has an upper-case letter: `/data-connections/api/Openrouter`.
- Old slugs with typos that redirects must keep exactly: `/ui/temlpates`, `/ui/layout/constrains`,
  `/ui/themes/typograhies`. Misleading slugs: `/getting-started/install` (sign-up and dashboard page),
  `/data-connections/api/Openrouter` (generic POST request guide).
- Category index URLs come from `_category_.json`: an absolute `link.slug` (for example `/ai`, `/payments/stripe`),
  the relative slug `wrappers` (rendered as `/wrappers`), or, with no slug, `/category/<slugified label>`
  (for example `User Interactions & UI Popups` became `/category/user-interactions--ui-popups`).
- No redirect plugin is installed (`@docusaurus/plugin-client-redirects` is not in `package.json`).

## Map

| Old URL | Source file (or "generated index: &lt;dir&gt;") | Title |
|---|---|---|
| `/` | `docs/index.md` | Nowa Documentation Overview |
| `/404` | Docusaurus built-in 404 page (`build/404.html`, not in the sitemap) | Page Not Found |
| `/ai` | generated index: `docs/ai/` | Build with AI (category) |
| `/ai/exampleprompts` | `docs/ai/exampleprompts.mdx` | Actual Prompts Used to Build Full Apps |
| `/ai/howtouseai` | `docs/ai/howtouseai.mdx` | How to Use Nowa AI |
| `/ai/price` | `docs/ai/price.md` | Credits, Limits & Privacy |
| `/ai/prompttip` | `docs/ai/prompttip.mdx` | Prompting Tips |
| `/category/api` | generated index: `docs/data-connections/api/` | API (category) |
| `/category/common-functionalities` | generated index: `docs/logic/common-functionalities/` | Common functionalities (category) |
| `/category/common-issues` | generated index: `docs/data-connections/firebase/known-issues/` | Common issues (category) |
| `/category/control-flow` | generated index: `docs/logic/control-flow/` | Control flow (category) |
| `/category/design-courses` | generated index: `docs/ui/design-courses/` | Design courses (category) |
| `/category/firebase` | generated index: `docs/data-connections/firebase/` | Firebase (category) |
| `/category/functions-and-events` | generated index: `docs/vars-params-functions/functions/` | Functions and events (category) |
| `/category/importing-from` | generated index: `docs/data-connections/api/importapi/` | Importing from (category) |
| `/category/layout` | generated index: `docs/ui/layout/` | Layout (category) |
| `/category/supabase` | generated index: `docs/data-connections/supabase/` | Supabase (category) |
| `/category/themes` | generated index: `docs/ui/themes/` | Themes (category) |
| `/category/user-interactions--ui-popups` | generated index: `docs/logic/ui-popups/` | User Interactions & UI Popups (category) |
| `/category/widget-description` | generated index: `docs/ui/widgets/widget-desc/` | Widget description (category) |
| `/category/widgets` | generated index: `docs/ui/widgets/` | Widgets (category) |
| `/data-connections` | generated index: `docs/data-connections/` | Data Sources (category) |
| `/data-connections/api/Openrouter` | `docs/data-connections/api/Openrouter.md` | POST API Request |
| `/data-connections/api/createapi` | `docs/data-connections/api/createapi.md` | API Collection & API GET Call |
| `/data-connections/api/importapi/postman` | `docs/data-connections/api/importapi/postman.md` | Postman |
| `/data-connections/api/importapi/swagger` | `docs/data-connections/api/importapi/swagger.md` | Swagger |
| `/data-connections/api/importapi/xano` | `docs/data-connections/api/importapi/xano.md` | Xano |
| `/data-connections/firebase/firebase-connect` | `docs/data-connections/firebase/firebase-connect.md` | Setup Firebase with the project |
| `/data-connections/firebase/firebase-email-auth` | `docs/data-connections/firebase/firebase-email-auth.md` | Email/password Authenticaion |
| `/data-connections/firebase/firestore` | `docs/data-connections/firebase/firestore.md` | Firestore integration |
| `/data-connections/firebase/known-issues/firebase-windows` | `docs/data-connections/firebase/known-issues/firebase-windows.md` | Can't test Firebase on Windows version |
| `/data-connections/firebase/notification` | `docs/data-connections/firebase/notification.md` | Push Notifications (FCM) |
| `/data-connections/supabase/auth` | `docs/data-connections/supabase/auth.md` | Authentication |
| `/data-connections/supabase/connect-supabase` | `docs/data-connections/supabase/connect-supabase.md` | Connect |
| `/data-connections/supabase/db` | `docs/data-connections/supabase/db.md` | Queries |
| `/data-connections/supabase/mcp` | `docs/data-connections/supabase/mcp.md` | Supabase MCP |
| `/data-connections/supabase/storage` | `docs/data-connections/supabase/storage.md` | Storage |
| `/data-connections/supabase/streams` | `docs/data-connections/supabase/streams.md` | Stream |
| `/data-connections/supabase/ui` | `docs/data-connections/supabase/ui.md` | Connect Queries to UI |
| `/deployment` | generated index: `docs/deployment/` | Deployment & Sharing (category) |
| `/deployment/android-deploy` | `docs/deployment/android-deploy.md` | Build for Android |
| `/deployment/ios-deploy` | `docs/deployment/ios-deploy.md` | Build for iOS |
| `/deployment/share` | `docs/deployment/share.md` | Instant Preview Share |
| `/deployment/web-deploy` | `docs/deployment/web-deploy.mdx` | Build for Web |
| `/getting-started` | generated index: `docs/getting-started/` | Getting Started (category) |
| `/getting-started/exploreinterface` | `docs/getting-started/exploreinterface.mdx` | Exploring the Nowa Interface |
| `/getting-started/install` | `docs/getting-started/install.md` | Signup and Setup |
| `/getting-started/introduction` | `docs/getting-started/introduction.md` | Introduction to Nowa |
| `/getting-started/quickstart` | `docs/getting-started/quickstart.md` | Quickstart – Your First Project |
| `/git` | generated index: `docs/git/` | Git & Github (category) |
| `/git/clone-from-cloud` | `docs/git/clone-from-cloud.md` | Connect GitHub Repositories with Nowa Cloud Projects |
| `/git/git-local` | `docs/git/git-local.md` | Git on local projects |
| `/git/git-operations-cloud` | `docs/git/git-operations-cloud.md` | Git operations on Cloud projects |
| `/git/intro-git` | `docs/git/intro-git.md` | Using Git and Github with Nowa |
| `/git/token-github` | `docs/git/token-github.md` | Authenticate Github with Nowa |
| `/hybrid-approach` | generated index: `docs/hybrid-approach/` | Hybrid Approach & Custom code (category) |
| `/hybrid-approach/custom-code` | `docs/hybrid-approach/custom-code.md` | Custom code |
| `/hybrid-approach/intro-hybrid-approach` | `docs/hybrid-approach/intro-hybrid-approach.md` | Intro to Hybrid Approach |
| `/local-project-simulator` | generated index: `docs/local-project-simulator/` | Local projects and simulator (category) |
| `/local-project-simulator/createlocalproject` | `docs/local-project-simulator/createlocalproject.md` | Create a local project |
| `/local-project-simulator/openexisting` | `docs/local-project-simulator/openexisting.md` | Import a Flutter Project |
| `/local-project-simulator/othertools` | `docs/local-project-simulator/othertools.md` | Using Other Tools on a Local Project: Git & IDE |
| `/local-project-simulator/simulator` | `docs/local-project-simulator/simulator.md` | Running on a simulator/physical device |
| `/local-project-simulator/sync` | `docs/local-project-simulator/sync.md` | Cloud-Local Synchronization |
| `/local-project-simulator/whylocalproject` | `docs/local-project-simulator/whylocalproject.md` | Why local projects |
| `/logic` | generated index: `docs/logic/` | Building Logic and Action (category) |
| `/logic/common-functionalities/media-picker` | `docs/logic/common-functionalities/media-picker.md` | Media Picker |
| `/logic/common-functionalities/navigation` | `docs/logic/common-functionalities/navigation.md` | Navigation |
| `/logic/common-functionalities/open-url` | `docs/logic/common-functionalities/open-url.md` | Open Url |
| `/logic/common-functionalities/platform-checking` | `docs/logic/common-functionalities/platform-checking.md` | Platform check |
| `/logic/common-functionalities/print` | `docs/logic/common-functionalities/print.md` | Print |
| `/logic/control-flow/if-statement` | `docs/logic/control-flow/if-statement.mdx` | If Statements |
| `/logic/control-flow/try-catch` | `docs/logic/control-flow/try-catch.mdx` | Try Node |
| `/logic/intro-circuit` | `docs/logic/intro-circuit.md` | What is Circuit |
| `/logic/ui-popups/date-picker` | `docs/logic/ui-popups/date-picker.md` | Date picker |
| `/logic/ui-popups/dialog` | `docs/logic/ui-popups/dialog.md` | Dialog |
| `/logic/ui-popups/snackbar` | `docs/logic/ui-popups/snackbar.md` | Snackbar |
| `/logic/ui-popups/time-picker` | `docs/logic/ui-popups/time-picker.md` | Time picker |
| `/markdown-page` | `src/pages/markdown-page.md` | Markdown page example |
| `/new` | generated index: `docs/new/` | What's New (category) |
| `/new/change-log` | `docs/new/change-log.md` | Changelog |
| `/new/whats-new` | `docs/new/whats-new.md` | What's new |
| `/payments` | generated index: `docs/payments/` | Payments & In-App Purchases (category) |
| `/payments/stripe` | generated index: `docs/payments/stripe/` | Stripe Integration (category) |
| `/payments/stripe/stripe-integration` | `docs/payments/stripe/stripe-integration.md` | Integrating Stripe in Nowa |
| `/search` | Algolia search page (`@docusaurus/theme-search-algolia`, `searchPagePath: 'search'` in `docusaurus.config.js`) | Search the documentation |
| `/shortcuts` | `docs/shortcuts.md` | Keyboard shortcuts |
| `/tutorials-template` | generated index: `docs/tutorials-template/` | Tutorials and Templates (category) |
| `/tutorials-template/chat-template` | `docs/tutorials-template/chat-template.mdx` | Chat template |
| `/tutorials-template/design-responsive` | `docs/tutorials-template/design-responsive.md` | Make screen responsive |
| `/tutorials-template/form-validation` | `docs/tutorials-template/form-validation.md` | Form validation |
| `/tutorials-template/loading-indicator` | `docs/tutorials-template/loading-indicator.md` | Loading indicator |
| `/tutorials-template/splashscreen` | `docs/tutorials-template/splashscreen.md` | Splash Screen |
| `/ui` | generated index: `docs/ui/` | Designer (category) |
| `/ui/assets` | `docs/ui/assets.md` | Assets |
| `/ui/boards` | `docs/ui/boards.mdx` | Boards |
| `/ui/components` | `docs/ui/components.md` | Components |
| `/ui/design-courses/booking-app` | `docs/ui/design-courses/booking-app.md` | Hotel Booking App |
| `/ui/design-courses/ecommerce-app` | `docs/ui/design-courses/ecommerce-app.md` | E-Commerce App |
| `/ui/design-courses/football-app` | `docs/ui/design-courses/football-app.md` | Football App |
| `/ui/design-courses/workout-planner` | `docs/ui/design-courses/workout-planner.md` | Workout Planner App |
| `/ui/layout/constrains` | `docs/ui/layout/constrains.md` | Constraints |
| `/ui/layout/groups` | `docs/ui/layout/groups.mdx` | Groups |
| `/ui/layout/intro-layout` | `docs/ui/layout/intro-layout.md` | Intro to Layout |
| `/ui/layout/rows-and-columns` | `docs/ui/layout/rows-and-columns.md` | Columns and Rows |
| `/ui/outline` | `docs/ui/outline.md` | Outline |
| `/ui/screens` | `docs/ui/screens.md` | Screens |
| `/ui/temlpates` | `docs/ui/temlpates.mdx` | Templates |
| `/ui/themes/colors-themes` | `docs/ui/themes/colors-themes.md` | Colors |
| `/ui/themes/create-themes` | `docs/ui/themes/create-themes.md` | Create themes |
| `/ui/themes/typograhies` | `docs/ui/themes/typograhies.md` | Typography |
| `/ui/toolbar` | `docs/ui/toolbar.md` | Toolbar |
| `/ui/widget-panel` | `docs/ui/widget-panel.md` | Widgets Panel |
| `/ui/widgets/widget-desc/admob-banner` | `docs/ui/widgets/widget-desc/admob-banner.md` | Admob Banner |
| `/ui/widgets/widget-desc/alert-dialog` | `docs/ui/widgets/widget-desc/alert-dialog.md` | Alert Dialog |
| `/ui/widgets/widget-desc/appbar` | `docs/ui/widgets/widget-desc/appbar.md` | AppBar |
| `/ui/widgets/widget-desc/button` | `docs/ui/widgets/widget-desc/button.md` | Button |
| `/ui/widgets/widget-desc/checkbox` | `docs/ui/widgets/widget-desc/checkbox.md` | Checkbox |
| `/ui/widgets/widget-desc/container` | `docs/ui/widgets/widget-desc/container.md` | Container |
| `/ui/widgets/widget-desc/cross-fade` | `docs/ui/widgets/widget-desc/cross-fade.md` | Cross fade |
| `/ui/widgets/widget-desc/data-builder` | `docs/ui/widgets/widget-desc/data-builder.md` | Data Builder |
| `/ui/widgets/widget-desc/drawer` | `docs/ui/widgets/widget-desc/drawer.md` | Drawer |
| `/ui/widgets/widget-desc/empty-widget` | `docs/ui/widgets/widget-desc/empty-widget.md` | Empty widget |
| `/ui/widgets/widget-desc/expansion-tile` | `docs/ui/widgets/widget-desc/expansion-tile.md` | Expansion Tile |
| `/ui/widgets/widget-desc/floating-action-button` | `docs/ui/widgets/widget-desc/floating-action-button.md` | Floating Action Button |
| `/ui/widgets/widget-desc/gridview` | `docs/ui/widgets/widget-desc/gridview.md` | Gridview |
| `/ui/widgets/widget-desc/html` | `docs/ui/widgets/widget-desc/html.md` | HTML |
| `/ui/widgets/widget-desc/icon` | `docs/ui/widgets/widget-desc/icon.md` | Icon |
| `/ui/widgets/widget-desc/image` | `docs/ui/widgets/widget-desc/image.md` | Image |
| `/ui/widgets/widget-desc/index-stack` | `docs/ui/widgets/widget-desc/index-stack.md` | Index Stack |
| `/ui/widgets/widget-desc/linear-progress-indicator` | `docs/ui/widgets/widget-desc/linear-progress-indicator.md` | Linear Progress Indicator |
| `/ui/widgets/widget-desc/listtile` | `docs/ui/widgets/widget-desc/listtile.md` | List Tile |
| `/ui/widgets/widget-desc/listview` | `docs/ui/widgets/widget-desc/listview.md` | ListView |
| `/ui/widgets/widget-desc/loading-circular` | `docs/ui/widgets/widget-desc/loading-circular.md` | Loading circular |
| `/ui/widgets/widget-desc/lottie` | `docs/ui/widgets/widget-desc/lottie.md` | Lottie |
| `/ui/widgets/widget-desc/markdown` | `docs/ui/widgets/widget-desc/markdown.md` | Markdown |
| `/ui/widgets/widget-desc/navigation-bar` | `docs/ui/widgets/widget-desc/navigation-bar.md` | Navigation Bar |
| `/ui/widgets/widget-desc/pageview` | `docs/ui/widgets/widget-desc/pageview.md` | PageView |
| `/ui/widgets/widget-desc/rive` | `docs/ui/widgets/widget-desc/rive.md` | Rive |
| `/ui/widgets/widget-desc/slider` | `docs/ui/widgets/widget-desc/slider.md` | Slider |
| `/ui/widgets/widget-desc/svg` | `docs/ui/widgets/widget-desc/svg.md` | SVG |
| `/ui/widgets/widget-desc/tabview` | `docs/ui/widgets/widget-desc/tabview.md` | TabView |
| `/ui/widgets/widget-desc/text` | `docs/ui/widgets/widget-desc/text.md` | Text |
| `/ui/widgets/widget-desc/textfield` | `docs/ui/widgets/widget-desc/textfield.md` | TextField |
| `/ui/widgets/widget-desc/video-player` | `docs/ui/widgets/widget-desc/video-player.md` | Video player |
| `/ui/widgets/widget-desc/webview` | `docs/ui/widgets/widget-desc/webview.md` | WebView |
| `/ui/widgets/widget-desc/wrap` | `docs/ui/widgets/widget-desc/wrap.md` | Wrap |
| `/ui/widgets/widget-desc/youtube-player` | `docs/ui/widgets/widget-desc/youtube-player.md` | Youtube Player |
| `/ui/widgets/widgets-ref` | `docs/ui/widgets/widgets-ref.md` | List of all widgets |
| `/ui/wrappers/gesture-detector` | `docs/ui/wrappers/gesture-detector.md` | Gesture Detector |
| `/ui/wrappers/material` | `docs/ui/wrappers/material.md` | Material |
| `/ui/wrappers/opacity` | `docs/ui/wrappers/opacity.md` | Opacity |
| `/ui/wrappers/padding` | `docs/ui/wrappers/padding.md` | Padding |
| `/ui/wrappers/scrollview` | `docs/ui/wrappers/scrollview.md` | Scroll View |
| `/ui/wrappers/text-direction` | `docs/ui/wrappers/text-direction.md` | Text Direction |
| `/ui/wrappers/visibility` | `docs/ui/wrappers/visibility.md` | Visibility |
| `/ui/wrappers/wrappers-intro` | `docs/ui/wrappers/wrappers-intro.md` | Intro to wrappers |
| `/ui/wrappers/wrappers-list` | `docs/ui/wrappers/wrappers-list.md` | List of all Wrappers |
| `/vars-params-functions` | generated index: `docs/vars-params-functions/` | Variables, Parameters, and Functions (category) |
| `/vars-params-functions/create-variable` | `docs/vars-params-functions/create-variable.mdx` | Local Variables |
| `/vars-params-functions/data-models` | `docs/vars-params-functions/data-models.md` | Data Models |
| `/vars-params-functions/functions/create-local-function` | `docs/vars-params-functions/functions/create-local-function.mdx` | Create a screen function |
| `/vars-params-functions/functions/events` | `docs/vars-params-functions/functions/events.mdx` | Events |
| `/vars-params-functions/global-states` | `docs/vars-params-functions/global-states.md` | Global States |
| `/vars-params-functions/local-parameter` | `docs/vars-params-functions/local-parameter.mdx` | Local Parameters |
| `/wrappers` | generated index: `docs/ui/wrappers/` | Wrappers (category) |


## Files under `docs/` that have no URL

| File | Why it has no URL |
|---|---|
| `docs/data-connections/api/.authkey.md` | File name starts with a dot, so Docusaurus skips it. Unfinished draft ("I hide it because i need to finish it"). |
| `docs/vars-params-functions/functions/override-functions` | No `.md` extension, so it is not a page. Content: "Overriding built-in functions" (`initState`, `dispose`). |
| `docs/cards.module.css` | CSS module imported by `docs/index.md` (homepage card grid). |
| `docs/**/img/*` | Images bundled by webpack only when a page references them. They are served under hashed names (`/assets/images/<name>-<hash>.<ext>`), so their URLs are not stable. |

## Other URLs served from `build/` that are not pages

These stay reachable as long as the files stay in `static/` (they are copied as-is). They are not redirect sources.

- `/img/**` (259 files) and `/videos/**` (109 files): see `media-inventory.md`. Note that Markdown images (`![](/img/...)`)
  are also emitted under hashed `/assets/images/...` names; videos in `<source src>` are served only from `/videos/...`
  or `/img/...` as written.
- `/old_versions/*.md` (9 raw Markdown files from `static/old_versions`, left untouched per D7):
  `adding_members.md`, `assets.md`, `components.md`, `get_request.md`, `getting_started.md`, `hackathon2023.md`,
  `ui_creating.md`, `update_var_state.md`, `wrappers.md`.
- `/CNAME` (`docs.nowa.dev`), and generated `/sitemap.xml`, `/opensearch.xml`, `/assets/**` (hashed JS, CSS, images).

## Links into old URLs that need care when pages move

- **What's New and Changelog (content must stay untouched, D6) link to 17 old doc pages** with relative links. If those
  files are deleted or moved, the links break and `onBrokenLinks: 'throw'` fails the build. Redirect pages made by
  `@docusaurus/plugin-client-redirects` are not routes, so they most likely do not satisfy the broken-link check
  (verify when wiring redirects). Targets:
  `data-connections/api/createapi`, `git/intro-git.md`, `hybrid-approach/intro-hybrid-approach.md`,
  `hybrid-approach/custom-code`, `logic/intro-circuit.md`, `logic/control-flow/if-statement`,
  `logic/control-flow/try-catch`, `logic/common-functionalities/navigation`,
  `logic/common-functionalities/media-picker`, `logic/common-functionalities/platform-checking`,
  `logic/common-functionalities/print`, `vars-params-functions/data-models`, `vars-params-functions/global-states`,
  `tutorials-template/chat-template.mdx` (legacy, stays), `deployment/web-deploy.mdx`,
  `ui/widgets/widget-desc/expansion-tile.md`, `ui/themes/create-themes.md`; plus the image `docs/img/swipingcard.gif`
  (What's New 2.0.15) and the absolute link `https://docs.nowa.dev/git` (Changelog line 576).
  (What's New lines 874-1162, Changelog lines 576-759.)
- `docs/index.md` (homepage cards) links to 12 category index URLs and `/shortcuts`.
- Old URLs are linked from outside the site too (YouTube descriptions, blog posts, the app). Every old URL above should
  get a redirect to its closest new page.


## Links from the released app (v3.12.5) into docs URLs

`/home/user/nowa-master` (v3.12.5) opens 48 docs links (44 distinct targets); `/home/user/nowa` (dev) has the same set.
Most are the "docs" link of each widget in the widget picker (`WidgetDocData.docUrl`,
`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:62`). These URLs, **including the three anchors**, must keep
working after the rewrite (redirects, and the anchor ids must exist on the target pages):
`#apple-distribution-certificate`, `#macos-install-xcode`, `#setting-up-flutter-sdk` (all three exist on today's pages).
`/ui/widgets/widget-desc/switch` is linked by the app but has never existed (404 today).

| Target in the app | Exists today | Code refs (relative to the product repo) |
|---|---|---|
| `/` | yes | `lib/dashboard/dashboard_page.dart:197`, `lib/dashboard/learning_resources/learning_resources_view.dart:54`, `lib/project/onboarding/completion_dialog.dart:18`, `lib/widgets/help_icon.dart:54`, `packages/nowa_ui/lib/components/support_dialog.dart:529` |
| `/deployment/ios-deploy#apple-distribution-certificate` | yes | `packages/core/lib/src/cloud_build_v2/ui/current_build_card.dart:525` |
| `/deployment/android-deploy` | yes | `packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:679` |
| `/deployment/ios-deploy` | yes | `packages/core/lib/src/cloud_build_v2/ui/workflow_manager.dart:711` |
| `/local-project-simulator/createlocalproject#macos-install-xcode` | yes | `packages/core/lib/src/environment/environment_setup_dialog.dart:470` |
| `/deployment/web-deploy` | yes | `packages/core/lib/src/settings/cloud_build/web_build_settings.dart:85` |
| `/deployment` | yes | `packages/core/lib/src/settings/deployment_settings.dart:94` |
| `/local-project-simulator/createlocalproject#setting-up-flutter-sdk` | yes | `packages/core/lib/src/settings/editor_settings/local_setup.dart:189` |
| `/git/token-github` | yes | `packages/core/lib/src/settings/git_settings.dart:290` |
| `/git/intro-git` | yes | `packages/core/lib/src/settings/project_sync_settings.dart:539` |
| `/ui/widgets/widget-desc/container` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:123` |
| `/ui/widgets/widget-desc/text` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:136` |
| `/ui/widgets/widget-desc/textfield` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:151` |
| `/ui/widgets/widget-desc/icon` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:160` |
| `/ui/widgets/widget-desc/image` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:181` |
| `/ui/widgets/widget-desc/svg` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:198` |
| `/ui/widgets/widget-desc/floating-action-button` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:231` |
| `/ui/layout/groups` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:249` |
| `/ui/widgets/widget-desc/tabview` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:289` |
| `/ui/widgets/widget-desc/listview` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:316` |
| `/ui/widgets/widget-desc/gridview` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:355` |
| `/ui/widgets/widget-desc/pageview` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:395` |
| `/ui/widgets/widget-desc/index-stack` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:409` |
| `/ui/widgets/widget-desc/cross-fade` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:432` |
| `/ui/widgets/widget-desc/wrap` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:447` |
| `/ui/widgets/widget-desc/data-builder` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:461` |
| `/ui/widgets/widget-desc/video-player` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:489` |
| `/ui/widgets/widget-desc/youtube-player` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:516` |
| `/ui/widgets/widget-desc/lottie` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:531` |
| `/ui/widgets/widget-desc/rive` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:544` |
| `/ui/widgets/widget-desc/loading-circular` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:566` |
| `/ui/widgets/widget-desc/linear-progress-indicator` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:579` |
| `/ui/widgets/widget-desc/checkbox` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:602` |
| `/ui/widgets/widget-desc/switch` | **no (404)** | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:623` |
| `/ui/widgets/widget-desc/slider` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:701` |
| `/ui/widgets/widget-desc/appbar` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:741` |
| `/ui/widgets/widget-desc/navigation-bar` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:770` |
| `/ui/widgets/widget-desc/drawer` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:782` |
| `/ui/widgets/widget-desc/listtile` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:796` |
| `/ui/widgets/widget-desc/alert-dialog` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:826` |
| `/ui/widgets/widget-desc/admob-banner` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:844` |
| `/ui/widgets/widget-desc/webview` | yes | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:857` |
| `/category/importing-from` | yes | `packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:193` |
| `/data-connections/firebase/known-issues/firebase-windows` | yes | `packages/data/lib/src/firebase/firestore/queries_builder/ui/queries_builder.dart:151` |
