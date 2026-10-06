# Redirects: old URL → new URL

Map of every old docs URL to the page that replaces it, for `@docusaurus/plugin-client-redirects` (D13). The same map is in `redirects.js` at the repo root (one entry per row of the table below; not wired into `docusaurus.config.js` yet). If you change a target, change it in both files (`redirects.js` is the one that counts). The D11 link fixes in What's New and the changelog are listed further down.

| What | Count |
|---|---|
| Old URLs (`research/old-urls.txt`) | 166 |
| Redirected old URLs | 159 |
| Extra redirect for an app-only URL that never existed (`/ui/widgets/widget-desc/switch`) | 1 |
| **Entries in `redirects.js`** | **160** |
| Same URL on the new site, no redirect | 5 |
| Built in, no redirect (`/404`, `/search`) | 2 |
| App links (`research/app-links.txt`), all resolve | 44 strings, 42 paths |

How it was checked (script over `sidebars.js`, `pages.md`, `old-urls.txt`, `app-links.txt`): every old URL is covered exactly once; every `to` path is a route in `sidebars.js` (113 routes, identical to `pages.md` plus `legacy/*` and `new/*`); no `from` is a real new route (the plugin would ignore it with a warning); no duplicates; every `#anchor` used is declared in "Anchor targets" below; all 44 app links land on an existing page. The installed plugin's own `collectRedirects()` also accepts all entries (run with `onDuplicateRoutes: 'throw'` against the same route list).

Plugin behavior this relies on (read from `node_modules/@docusaurus/plugin-client-redirects` 3.10.0, already in `package.json`): `to` is checked against the built routes (a missing page fails the build, so wire `redirects.js` only after all target pages exist); `to` may contain `#anchor`; when `to` has no `#`, the redirect page forwards the old URL's `?search#hash`; `from` must be a plain path without `#`.

## Redirects

Sorted like `old-urls.txt`. "Why" says how the old page maps to the new one: **same topic** (rewritten in place), **folded into** (several old pages became one new page), **category index** (generated index replaced by the closest overview), **legacy move** (D4), **widget anchor** / **wrapper anchor** (rule: catalog anchor equal to the old slug). `/ui/widgets/widget-desc/switch` is not an old page: the app links to it and it has always been a 404.

| Old URL | New URL | Why | App link? |
|---|---|---|---|
| `/ai/exampleprompts` | `/ai/prompting` | folded into | no |
| `/ai/howtouseai` | `/ai` | folded into | no |
| `/ai/price` | `/account/plans-and-usage` | plans page | no |
| `/ai/prompttip` | `/ai/prompting` | same topic | no |
| `/category/api` | `/integrations/rest-api` | category index | no |
| `/category/common-functionalities` | `/logic` | category index | no |
| `/category/common-issues` | `/troubleshooting/known-issues` | category index | no |
| `/category/control-flow` | `/logic/circuit` | category index | no |
| `/category/design-courses` | `/legacy` | legacy move | no |
| `/category/firebase` | `/integrations/firebase/connect` | category index | no |
| `/category/functions-and-events` | `/logic` | category index | no |
| `/category/importing-from` | `/integrations/rest-api/import` | category index | yes |
| `/category/layout` | `/design/layout` | category index | no |
| `/category/supabase` | `/integrations/supabase/connect` | category index | no |
| `/category/themes` | `/design/themes` | category index | no |
| `/category/user-interactions--ui-popups` | `/logic/popups` | category index | no |
| `/category/widget-description` | `/reference/widgets` | category index | no |
| `/category/widgets` | `/reference/widgets` | category index | no |
| `/data-connections` | `/integrations` | section overview | no |
| `/data-connections/api/Openrouter` | `/integrations/rest-api` | folded into | no |
| `/data-connections/api/createapi` | `/integrations/rest-api` | same topic | no |
| `/data-connections/api/importapi/postman` | `/integrations/rest-api/import` | folded into | no |
| `/data-connections/api/importapi/swagger` | `/integrations/rest-api/import` | folded into | no |
| `/data-connections/api/importapi/xano` | `/integrations/rest-api/import` | folded into | no |
| `/data-connections/firebase/firebase-connect` | `/integrations/firebase/connect` | same topic | no |
| `/data-connections/firebase/firebase-email-auth` | `/integrations/firebase/auth` | same topic | no |
| `/data-connections/firebase/firestore` | `/integrations/firebase/firestore` | same topic | no |
| `/data-connections/firebase/known-issues/firebase-windows` | `/troubleshooting/known-issues#firebase-on-windows` | known issues | yes |
| `/data-connections/firebase/notification` | `/integrations/firebase/notifications` | same topic | no |
| `/data-connections/supabase/auth` | `/integrations/supabase/auth` | same topic | no |
| `/data-connections/supabase/connect-supabase` | `/integrations/supabase/connect` | same topic | no |
| `/data-connections/supabase/db` | `/integrations/supabase/database` | same topic | no |
| `/data-connections/supabase/mcp` | `/ai/connectors` | AI connector | no |
| `/data-connections/supabase/storage` | `/integrations/supabase/storage` | same topic | no |
| `/data-connections/supabase/streams` | `/integrations/supabase/database` | folded into | no |
| `/data-connections/supabase/ui` | `/integrations/show-data` | Data Builder | no |
| `/deployment` | `/publish` | section overview | yes |
| `/deployment/android-deploy` | `/publish/android` | same topic | yes |
| `/deployment/ios-deploy` | `/publish/ios` | same topic | yes |
| `/deployment/share` | `/test/share` | moved | no |
| `/deployment/web-deploy` | `/publish/web` | same topic | yes |
| `/getting-started` | `/get-started/welcome` | section overview | no |
| `/getting-started/exploreinterface` | `/get-started/editor-tour` | same topic | no |
| `/getting-started/install` | `/get-started/create-account` | same topic | no |
| `/getting-started/introduction` | `/get-started/welcome` | same topic | no |
| `/getting-started/quickstart` | `/get-started/first-app` | same topic | no |
| `/git` | `/code/git` | category index | no |
| `/git/clone-from-cloud` | `/code/import` | same topic | no |
| `/git/git-local` | `/code/git` | folded into | no |
| `/git/git-operations-cloud` | `/code/git` | folded into | no |
| `/git/intro-git` | `/code/git` | same topic | yes |
| `/git/token-github` | `/code/github` | same topic | yes |
| `/hybrid-approach` | `/code` | section overview | no |
| `/hybrid-approach/custom-code` | `/code/custom-code` | same topic | no |
| `/hybrid-approach/intro-hybrid-approach` | `/code/vs-code` | same topic | no |
| `/local-project-simulator` | `/code/local-projects` | category index | no |
| `/local-project-simulator/createlocalproject` | `/get-started/desktop-app` | folded into | yes |
| `/local-project-simulator/openexisting` | `/code/import` | same topic | no |
| `/local-project-simulator/othertools` | `/code/vs-code` | folded into | no |
| `/local-project-simulator/simulator` | `/test/devices` | same topic | no |
| `/local-project-simulator/sync` | `/code/local-projects` | folded into | no |
| `/local-project-simulator/whylocalproject` | `/get-started/cloud-and-local` | same topic | no |
| `/logic/common-functionalities/media-picker` | `/logic/popups` | folded into | no |
| `/logic/common-functionalities/navigation` | `/logic/navigation` | same topic | no |
| `/logic/common-functionalities/open-url` | `/logic/actions` | folded into | no |
| `/logic/common-functionalities/platform-checking` | `/logic/actions` | folded into | no |
| `/logic/common-functionalities/print` | `/logic/actions` | folded into | no |
| `/logic/control-flow/if-statement` | `/logic/circuit` | folded into | no |
| `/logic/control-flow/try-catch` | `/logic/circuit` | folded into | no |
| `/logic/intro-circuit` | `/logic/circuit` | same topic | no |
| `/logic/ui-popups/date-picker` | `/logic/popups` | folded into | no |
| `/logic/ui-popups/dialog` | `/logic/popups` | folded into | no |
| `/logic/ui-popups/snackbar` | `/logic/popups` | folded into | no |
| `/logic/ui-popups/time-picker` | `/logic/popups` | folded into | no |
| `/markdown-page` | `/` | template leftover | no |
| `/new` | `/new/whats-new` | category index | no |
| `/payments` | `/integrations/stripe` | category index | no |
| `/payments/stripe` | `/integrations/stripe` | category index | no |
| `/payments/stripe/stripe-integration` | `/integrations/stripe` | moved | no |
| `/shortcuts` | `/reference/shortcuts` | moved | no |
| `/tutorials-template` | `/legacy` | legacy move | no |
| `/tutorials-template/chat-template` | `/legacy/tutorials/chat-template` | legacy move | no |
| `/tutorials-template/design-responsive` | `/legacy/tutorials/design-responsive` | legacy move | no |
| `/tutorials-template/form-validation` | `/legacy/tutorials/form-validation` | legacy move | no |
| `/tutorials-template/loading-indicator` | `/legacy/tutorials/loading-indicator` | legacy move | no |
| `/tutorials-template/splashscreen` | `/legacy/tutorials/splashscreen` | legacy move | no |
| `/ui` | `/design` | section overview | no |
| `/ui/assets` | `/design/assets` | same topic | no |
| `/ui/boards` | `/design/boards` | same topic | no |
| `/ui/components` | `/design/components` | same topic | no |
| `/ui/design-courses/booking-app` | `/legacy/design-courses/booking-app` | legacy move | no |
| `/ui/design-courses/ecommerce-app` | `/legacy/design-courses/ecommerce-app` | legacy move | no |
| `/ui/design-courses/football-app` | `/legacy/design-courses/football-app` | legacy move | no |
| `/ui/design-courses/workout-planner` | `/legacy/design-courses/workout-planner` | legacy move | no |
| `/ui/layout/constrains` | `/design/layout` | folded into | no |
| `/ui/layout/groups` | `/design/layout#groups` | folded into | yes |
| `/ui/layout/intro-layout` | `/design/layout` | folded into | no |
| `/ui/layout/rows-and-columns` | `/design/layout` | folded into | no |
| `/ui/outline` | `/design/outline` | same topic | no |
| `/ui/screens` | `/design/screens` | same topic | no |
| `/ui/temlpates` | `/design/templates` | same topic | no |
| `/ui/themes/colors-themes` | `/design/theme-styles` | closest topic | no |
| `/ui/themes/create-themes` | `/design/themes` | same topic | no |
| `/ui/themes/typograhies` | `/design/theme-styles` | closest topic | no |
| `/ui/toolbar` | `/get-started/editor-tour` | folded into | no |
| `/ui/widget-panel` | `/get-started/editor-tour` | folded into | no |
| `/ui/widgets/widget-desc/admob-banner` | `/reference/widgets#admob-banner` | widget anchor | yes |
| `/ui/widgets/widget-desc/alert-dialog` | `/reference/widgets#alert-dialog` | widget anchor | yes |
| `/ui/widgets/widget-desc/appbar` | `/reference/widgets#appbar` | widget anchor | yes |
| `/ui/widgets/widget-desc/button` | `/reference/widgets#button` | widget anchor | no |
| `/ui/widgets/widget-desc/checkbox` | `/reference/widgets#checkbox` | widget anchor | yes |
| `/ui/widgets/widget-desc/container` | `/reference/widgets#container` | widget anchor | yes |
| `/ui/widgets/widget-desc/cross-fade` | `/reference/widgets#cross-fade` | widget anchor | yes |
| `/ui/widgets/widget-desc/data-builder` | `/reference/widgets#data-builder` | widget anchor | yes |
| `/ui/widgets/widget-desc/drawer` | `/reference/widgets#drawer` | widget anchor | yes |
| `/ui/widgets/widget-desc/empty-widget` | `/reference/widgets#empty-widget` | widget anchor | no |
| `/ui/widgets/widget-desc/expansion-tile` | `/reference/widgets#expansion-tile` | widget anchor | no |
| `/ui/widgets/widget-desc/floating-action-button` | `/reference/widgets#floating-action-button` | widget anchor | yes |
| `/ui/widgets/widget-desc/gridview` | `/reference/widgets#gridview` | widget anchor | yes |
| `/ui/widgets/widget-desc/html` | `/reference/widgets#html` | widget anchor | no |
| `/ui/widgets/widget-desc/icon` | `/reference/widgets#icon` | widget anchor | yes |
| `/ui/widgets/widget-desc/image` | `/reference/widgets#image` | widget anchor | yes |
| `/ui/widgets/widget-desc/index-stack` | `/reference/widgets#index-stack` | widget anchor | yes |
| `/ui/widgets/widget-desc/linear-progress-indicator` | `/reference/widgets#linear-progress-indicator` | widget anchor | yes |
| `/ui/widgets/widget-desc/listtile` | `/reference/widgets#listtile` | widget anchor | yes |
| `/ui/widgets/widget-desc/listview` | `/reference/widgets#listview` | widget anchor | yes |
| `/ui/widgets/widget-desc/loading-circular` | `/reference/widgets#loading-circular` | widget anchor | yes |
| `/ui/widgets/widget-desc/lottie` | `/reference/widgets#lottie` | widget anchor | yes |
| `/ui/widgets/widget-desc/markdown` | `/reference/widgets#markdown` | widget anchor | no |
| `/ui/widgets/widget-desc/navigation-bar` | `/reference/widgets#navigation-bar` | widget anchor | yes |
| `/ui/widgets/widget-desc/pageview` | `/reference/widgets#pageview` | widget anchor | yes |
| `/ui/widgets/widget-desc/rive` | `/reference/widgets#rive` | widget anchor | yes |
| `/ui/widgets/widget-desc/slider` | `/reference/widgets#slider` | widget anchor | yes |
| `/ui/widgets/widget-desc/svg` | `/reference/widgets#svg` | widget anchor | yes |
| `/ui/widgets/widget-desc/switch` | `/reference/widgets#switch` | widget anchor | yes |
| `/ui/widgets/widget-desc/tabview` | `/reference/widgets#tabview` | widget anchor | yes |
| `/ui/widgets/widget-desc/text` | `/reference/widgets#text` | widget anchor | yes |
| `/ui/widgets/widget-desc/textfield` | `/reference/widgets#textfield` | widget anchor | yes |
| `/ui/widgets/widget-desc/video-player` | `/reference/widgets#video-player` | widget anchor | yes |
| `/ui/widgets/widget-desc/webview` | `/reference/widgets#webview` | widget anchor | yes |
| `/ui/widgets/widget-desc/wrap` | `/reference/widgets#wrap` | widget anchor | yes |
| `/ui/widgets/widget-desc/youtube-player` | `/reference/widgets#youtube-player` | widget anchor | yes |
| `/ui/widgets/widgets-ref` | `/reference/widgets` | widget catalog | no |
| `/ui/wrappers/gesture-detector` | `/reference/wrappers#gesture-detector` | wrapper anchor | no |
| `/ui/wrappers/material` | `/reference/wrappers#material` | wrapper anchor | no |
| `/ui/wrappers/opacity` | `/reference/wrappers#opacity` | wrapper anchor | no |
| `/ui/wrappers/padding` | `/reference/wrappers#padding` | wrapper anchor | no |
| `/ui/wrappers/scrollview` | `/reference/wrappers#scrollview` | wrapper anchor | no |
| `/ui/wrappers/text-direction` | `/reference/wrappers#text-direction` | wrapper anchor | no |
| `/ui/wrappers/visibility` | `/reference/wrappers#visibility` | wrapper anchor | no |
| `/ui/wrappers/wrappers-intro` | `/design/properties` | Add Wrapper how-to | no |
| `/ui/wrappers/wrappers-list` | `/reference/wrappers` | wrapper list | no |
| `/vars-params-functions` | `/logic` | category index | no |
| `/vars-params-functions/create-variable` | `/logic/variables` | same topic | no |
| `/vars-params-functions/data-models` | `/logic/models` | same topic | no |
| `/vars-params-functions/functions/create-local-function` | `/logic/functions` | same topic | no |
| `/vars-params-functions/functions/events` | `/logic/events` | same topic | no |
| `/vars-params-functions/global-states` | `/logic/global-state` | same topic | no |
| `/vars-params-functions/local-parameter` | `/logic/parameters` | same topic | no |
| `/wrappers` | `/reference/wrappers` | category index | no |

## Same URL, no redirect

| URL | Why no redirect | Page on the new site |
|---|---|---|
| `/` | new home page at the same URL | `docs/index.mdx` |
| `/ai` | new overview page "How Nowa AI works" (docs/ai/index.md) | `docs/ai/index.md` |
| `/logic` | new overview page "How logic works" (docs/logic/index.md) | `docs/logic/index.md` |
| `/new/whats-new` | unchanged (D7) | `docs/new/whats-new.md` |
| `/new/change-log` | unchanged (D7) | `docs/new/change-log.md` |
| `/404` | Docusaurus built-in 404 page | built in |
| `/search` | Algolia search page from the theme (searchPagePath) | built in |

`/ai` and `/logic` used to be generated category indexes; the new overview pages take over the URL. `/` is the only app link that needs no redirect.

## Anchor targets the catalog/wrapper pages must define

Each target below must be an explicit ID: a heading ID (`## Container {#container}`) or, if the catalog is a table, an inline `<span id="container"></span>` in the row. The redirects and the What's New / changelog links point at them. If an ID is missing, the page still opens, just at the top.

### Widget catalog: `docs/reference/widgets/index.md` (URL `/reference/widgets`)

One anchor per old widget page, equal to the old slug. "Widget" is the name the Widgets picker shows (`research/features-widgets.md`, catalog from `packages/core/lib/src/widgets_to_add/widgets_to_add.dart`). All 36 widgets exist in the released picker. If the catalog writer also makes full pages for some widgets, keep the anchor on the catalog entry anyway (these redirects point here) or tell the orchestrator to re-point them.

| Anchor (`{#id}`) | Widget (picker name) | Opened by the app? |
|---|---|---|
| `admob-banner` | Admob Banner | yes |
| `alert-dialog` | Alert Dialog | yes |
| `appbar` | App Bar | yes |
| `button` | Button | no |
| `checkbox` | Checkbox | yes |
| `container` | Container | yes |
| `cross-fade` | Cross Fade | yes |
| `data-builder` | Data Builder | yes |
| `drawer` | Drawer | yes |
| `empty-widget` | SizedBox (the old "Empty widget" page says "How to use SizedBox (Empty widget)") | no |
| `expansion-tile` | Expansion Tile | no |
| `floating-action-button` | Floating Button | yes |
| `gridview` | Grid View | yes |
| `html` | Html | no |
| `icon` | Icon | yes |
| `image` | Image | yes |
| `index-stack` | Indexed Stack | yes |
| `linear-progress-indicator` | Linear Progress Indicator | yes |
| `listtile` | List Tile | yes |
| `listview` | List View | yes |
| `loading-circular` | Circular Progress Indicator | yes |
| `lottie` | Lottie | yes |
| `markdown` | Markdown | no |
| `navigation-bar` | Bottom Navigation Bar | yes |
| `pageview` | Page View | yes |
| `rive` | Rive | yes |
| `slider` | Slider | yes |
| `svg` | SVG | yes |
| `switch` | Switch (app link only, no old page) | yes |
| `tabview` | TabView | yes |
| `text` | Text | yes |
| `textfield` | Text Field | yes |
| `video-player` | Video Player | yes |
| `webview` | Web View | yes |
| `wrap` | Wrap | yes |
| `youtube-player` | YouTube Player | yes |

The Data Builder (`data-builder`) and Admob Banner (`admob-banner`) entries should also link onward to `../../integrations/show-data.md` and `../../integrations/admob.md` (`pages.md` folds their old pages into those how-tos; here they point at the catalog because the rule says widget pages go to the catalog and the app opens them).

### Wrappers: `docs/reference/wrappers.md` (URL `/reference/wrappers`)

| Anchor (`{#id}`) | Wrapper (name in the Add Wrapper list, `packages/core/lib/src/wrappers_to_add.dart`) | Old page |
|---|---|---|
| `gesture-detector` | Gesture Detector | `/ui/wrappers/gesture-detector` |
| `material` | Material | `/ui/wrappers/material` |
| `opacity` | Opacity | `/ui/wrappers/opacity` |
| `padding` | Padding | `/ui/wrappers/padding` |
| `scrollview` | Scroll View | `/ui/wrappers/scrollview` |
| `text-direction` | Text Direction | `/ui/wrappers/text-direction` |
| `visibility` | Visibility | `/ui/wrappers/visibility` |

`visibility` goes to the wrappers page, not to `/logic/expressions#visibility`: `pages.md` promises no anchor there. `text-direction` goes to the wrappers page too (rule 3); its entry should link to `../design/localization.md`.

### Other anchors (already in `pages.md` "Keep anchors"; listed so nobody drops them)

| Page | Anchor | Used by |
|---|---|---|
| `docs/get-started/desktop-app.md` | `{#setting-up-flutter-sdk}` | app link `/local-project-simulator/createlocalproject#setting-up-flutter-sdk` (hash forwarded) |
| `docs/get-started/desktop-app.md` | `{#macos-install-xcode}` | app link `/local-project-simulator/createlocalproject#macos-install-xcode` (hash forwarded) |
| `docs/publish/ios.md` | `{#apple-distribution-certificate}` | app link `/deployment/ios-deploy#apple-distribution-certificate` (hash forwarded) |
| `docs/design/layout.md` | `{#groups}` | redirect `/ui/layout/groups` (app link: the Group widget's docs link) |
| `docs/troubleshooting/known-issues.md` | `{#firebase-on-windows}` | redirect `/data-connections/firebase/known-issues/firebase-windows` (app link from the Firestore query builder) |
| `docs/reference/widgets/index.md` | `{#expansion-tile}` | What's New and changelog links (see below) |

## What's New / Changelog link fixes

D11: only the target inside `](...)` changed; wording, line count and everything else are byte-identical to `HEAD` (checked by masking all link targets in both versions). 22 links in 2 files; 17 distinct old pages. Targets resolve once the new pages exist (`docs/legacy/tutorials/chat-template.mdx` already does).

`docs/new/whats-new.md` (18 links)

| Line | Link text | Old target | New target |
|---|---|---|---|
| 874 | this page | `../data-connections/api/createapi` | `../integrations/rest-api/import.md` |
| 953 | Check out the full Git guide | `../git/intro-git.md` | `../code/git.md` |
| 975 | Intro to Hybrid Approach | `../hybrid-approach/intro-hybrid-approach.md` | `../code/vs-code.md` |
| 976 | Using Custom Code | `../hybrid-approach/custom-code` | `../code/custom-code.md` |
| 979 | Circuit Intro | `../logic/intro-circuit.md` | `../logic/circuit.md` |
| 980 | If Statement | `../logic/control-flow/if-statement` | `../logic/circuit.md` |
| 981 | Try Catch | `../logic/control-flow/try-catch` | `../logic/circuit.md` |
| 984 | Navigation | `../logic/common-functionalities/navigation` | `../logic/navigation.md` |
| 985 | Media Picker | `../logic/common-functionalities/media-picker` | `../logic/popups.md` |
| 986 | Check Platform | `../logic/common-functionalities/platform-checking` | `../logic/actions.md` |
| 987 | Print | `../logic/common-functionalities/print` | `../logic/actions.md` |
| 990 | Using Data Models | `../vars-params-functions/data-models` | `../logic/models.md` |
| 991 | Global States | `../vars-params-functions/global-states` | `../logic/global-state.md` |
| 994 | Full Git & GitHub Guide | `../git/intro-git.md` | `../code/git.md` |
| 1007 | See how to use it here | `../tutorials-template/chat-template.mdx` | `../legacy/tutorials/chat-template.mdx` |
| 1029 | full guide on web deployment | `../deployment/web-deploy.mdx` | `../publish/web.md` |
| 1123 | Learn more | `../ui/widgets/widget-desc/expansion-tile.md` | `../reference/widgets/index.md#expansion-tile` |
| 1162 | Read more about it here | `../ui/themes/create-themes.md` | `../design/themes.md` |

`docs/new/change-log.md` (4 links)

| Line | Link text | Old target | New target |
|---|---|---|---|
| 595 | Read more | `../tutorials-template/chat-template.mdx` | `../legacy/tutorials/chat-template.mdx` |
| 609 | Read more | `../deployment/web-deploy.mdx` | `../publish/web.md` |
| 691 | Learn more | `../ui/widgets/widget-desc/expansion-tile.md` | `../reference/widgets/index.md#expansion-tile` |
| 759 | Read more | `../ui/themes/create-themes.md` | `../design/themes.md` |

Left as they are:

- `whats-new.md:666`, the empty link `[try the app yourself here]()` (3.0.10, Movie App tutorial): no obvious target. The repo, the old docs and the app contain no URL for that demo app, so I did not guess. It is also the only build warning of the old site; the owner needs to supply the URL (or accept removing the link).
- `whats-new.md:1063`, the image `![](./../img/swipingcard.gif)`: not a page link. `docs/img/swipingcard.gif` must stay where it is (or move it and update this path).
- `whats-new.md:7, 681, 687, 712, 730, 766`, `./change-log.md`: the changelog keeps its URL.
- `whats-new.md:633, 663`, `https://docs.nowa.dev`: the home page keeps its URL.
- `change-log.md:576`, the absolute link `https://docs.nowa.dev/git` ("Full guide"): not a relative link, so the build does not check it, and the redirect `/git` → `/code/git` covers it. Optional one-line fix if you prefer no redirect hop: `](../code/git.md)`.

## App links: where each one lands (D13)

The 44 strings in `research/app-links.txt`, as the released app opens them, and the URL the reader ends up on. For the three anchored links the old hash is forwarded by the redirect page, so the anchor must exist on the target page (see "Other anchors").

| App opens | Lands on |
|---|---|
| `/` | `/` (same URL) |
| `/category/importing-from` | `/integrations/rest-api/import` |
| `/data-connections/firebase/known-issues/firebase-windows` | `/troubleshooting/known-issues#firebase-on-windows` |
| `/deployment` | `/publish` |
| `/deployment/android-deploy` | `/publish/android` |
| `/deployment/ios-deploy` | `/publish/ios` |
| `/deployment/ios-deploy#apple-distribution-certificate` | `/publish/ios#apple-distribution-certificate` |
| `/deployment/web-deploy` | `/publish/web` |
| `/git/intro-git` | `/code/git` |
| `/git/token-github` | `/code/github` |
| `/local-project-simulator/createlocalproject#macos-install-xcode` | `/get-started/desktop-app#macos-install-xcode` |
| `/local-project-simulator/createlocalproject#setting-up-flutter-sdk` | `/get-started/desktop-app#setting-up-flutter-sdk` |
| `/ui/layout/groups` | `/design/layout#groups` |
| `/ui/widgets/widget-desc/admob-banner` | `/reference/widgets#admob-banner` |
| `/ui/widgets/widget-desc/alert-dialog` | `/reference/widgets#alert-dialog` |
| `/ui/widgets/widget-desc/appbar` | `/reference/widgets#appbar` |
| `/ui/widgets/widget-desc/checkbox` | `/reference/widgets#checkbox` |
| `/ui/widgets/widget-desc/container` | `/reference/widgets#container` |
| `/ui/widgets/widget-desc/cross-fade` | `/reference/widgets#cross-fade` |
| `/ui/widgets/widget-desc/data-builder` | `/reference/widgets#data-builder` |
| `/ui/widgets/widget-desc/drawer` | `/reference/widgets#drawer` |
| `/ui/widgets/widget-desc/floating-action-button` | `/reference/widgets#floating-action-button` |
| `/ui/widgets/widget-desc/gridview` | `/reference/widgets#gridview` |
| `/ui/widgets/widget-desc/icon` | `/reference/widgets#icon` |
| `/ui/widgets/widget-desc/image` | `/reference/widgets#image` |
| `/ui/widgets/widget-desc/index-stack` | `/reference/widgets#index-stack` |
| `/ui/widgets/widget-desc/linear-progress-indicator` | `/reference/widgets#linear-progress-indicator` |
| `/ui/widgets/widget-desc/listtile` | `/reference/widgets#listtile` |
| `/ui/widgets/widget-desc/listview` | `/reference/widgets#listview` |
| `/ui/widgets/widget-desc/loading-circular` | `/reference/widgets#loading-circular` |
| `/ui/widgets/widget-desc/lottie` | `/reference/widgets#lottie` |
| `/ui/widgets/widget-desc/navigation-bar` | `/reference/widgets#navigation-bar` |
| `/ui/widgets/widget-desc/pageview` | `/reference/widgets#pageview` |
| `/ui/widgets/widget-desc/rive` | `/reference/widgets#rive` |
| `/ui/widgets/widget-desc/slider` | `/reference/widgets#slider` |
| `/ui/widgets/widget-desc/svg` | `/reference/widgets#svg` |
| `/ui/widgets/widget-desc/switch` | `/reference/widgets#switch` |
| `/ui/widgets/widget-desc/tabview` | `/reference/widgets#tabview` |
| `/ui/widgets/widget-desc/text` | `/reference/widgets#text` |
| `/ui/widgets/widget-desc/textfield` | `/reference/widgets#textfield` |
| `/ui/widgets/widget-desc/video-player` | `/reference/widgets#video-player` |
| `/ui/widgets/widget-desc/webview` | `/reference/widgets#webview` |
| `/ui/widgets/widget-desc/wrap` | `/reference/widgets#wrap` |
| `/ui/widgets/widget-desc/youtube-player` | `/reference/widgets#youtube-player` |

## Judgment calls and open points

Where `pages.md` "Old pages" lists an old page under several new pages, or under none that fits, this is what I picked and the alternative. Each is a one-line change in `redirects.js`.

| Old URL | Picked | Alternative / reason |
|---|---|---|
| `/data-connections/supabase/ui` | `/integrations/show-data` | `pages.md` lists `ui.md` under `supabase/auth.md`, which looks like a slip: the page binds a Supabase query to a ListView with Data Builder. Alternative: `/integrations/supabase/database`. |
| `/local-project-simulator/othertools` | `/code/vs-code` | `pages.md` lists it under `test/devices.md`, but the page is about using an IDE and Git next to Nowa (same as the hybrid approach). Alternative: `/test/devices`. |
| `/local-project-simulator/openexisting` | `/code/import` | `pages.md` lists it under `code/local-projects.md`; "Import an existing Flutter project" is the exact topic. Alternative: `/code/local-projects`. |
| `/ui/toolbar`, `/ui/widget-panel` | `/get-started/editor-tour` | Both are listed under `editor-tour.md` (`widget-panel` also under `design/add-widgets.md`). Alternatives: `/design/boards` (toolbar tools), `/design/components` (Widgets panel list). |
| `/ui/themes/colors-themes` | `/design/theme-styles` | Listed under `themes.md` and `theme-styles.md`; the page is mostly about linking widget colors to the theme (now "Use a theme color"). Alternative: `/design/themes` ("Edit colors"). |
| `/ui/themes/typograhies` | `/design/theme-styles` | `pages.md` lists it under `themes.md` and `fonts-icons.md`, but most of the old page (connect a text widget to a style, edit it from the widget, **Copy with**, **Detach Style**) is now "Use a theme text style" on `theme-styles.md`; nothing on it is about fonts. Alternative: `/design/themes` (the 15 styles in the Themes panel, "Edit text styles"). |
| `/ai/price` | `/account/plans-and-usage` | Also listed under `ai/index.md`; a reader of "Credits, Limits & Privacy" wants plans and usage. |
| `/ai/howtouseai` | `/ai` | Also listed under `ai/modes.md`, `chat.md`, `undo-and-history.md`; the overview is the neutral landing. |
| `/hybrid-approach/intro-hybrid-approach` | `/code/vs-code` | Also listed under `code/index.md`; the old page is "your IDE next to Nowa". `/hybrid-approach` itself goes to `/code`. |
| `/ui/widgets/widget-desc/data-builder`, `.../admob-banner` | catalog anchors | `pages.md` folds them into `integrations/show-data.md` / `admob.md`; rule 3 says every widget page goes to the catalog (the app opens them). The catalog entries should link onward. |
| `/ui/wrappers/text-direction`, `.../visibility` | wrapper anchors | Rule 3. `pages.md` also names `design/localization.md` and `logic/expressions.md`; no anchor is promised there. |
| `/category/common-functionalities`, `/category/functions-and-events` | `/logic` | No single new page covers either (actions + navigation + popups; functions + events), so the section overview. |
| `/payments`, `/payments/stripe` | `/integrations/stripe` | The old category only ever held the Stripe guide. |
| `/new` | `/new/whats-new` | Assumes no `/new` index page: the explicit sidebar links the What's new category to `new/whats-new`. If you keep a `/new` page, delete this entry. |
| `/ui/design-courses` | not an old URL | The brief names it, but the Design courses index was always `/category/design-courses` (mapped to `/legacy`). No entry added. |

Product note, not fixable in the docs: `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:857` gives Web View the docs URL `' https://docs.nowa.dev/ui/widgets/widget-desc/webview'` (leading space). The picker's "Open Documentation." link runs `launchUrl(Uri.parse(docUrl))` (`packages/core/lib/src/widgets/widget_picker.dart:269`), and `Uri.parse` throws `FormatException: Scheme not starting with alphabetic character` for it (tested with the Dart SDK), so that link does nothing in 3.12.5. The redirect for `/ui/widgets/widget-desc/webview` is still in place for the fixed link. Worth adding to `product-issues.md`.

Other notes for the orchestrator:

- The in-app widget links can be updated later to the new URLs (`/reference/widgets#<slug>`, `/design/layout#groups`, `/publish/...`, `/get-started/desktop-app#...`); the redirects keep the released app working until then.
- Algolia (`indexName: nowa`) still holds old URLs until it re-crawls; the redirects cover them.
- Old `static/old_versions/*.md` URLs are not redirected (they stay untouched, D8).
- Case matters on GitHub Pages: the entry for `/data-connections/api/Openrouter` keeps the capital O. The typo slugs `/ui/temlpates`, `/ui/layout/constrains`, `/ui/themes/typograhies` are kept exactly.
