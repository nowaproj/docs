# P14-B14 notes: reference pages (index, wrappers, shortcuts, glossary)

Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Flutter refs point at the framework doc
comments in the local Flutter 3.44.8 stable SDK (`/home/user/flutter`); they are the text api.flutter.dev publishes
(that host doesn't resolve from this environment). Field labels in **Details** are the parameter name split into words
(`packages/core/lib/src/fields/block_field.dart:212-221`, `packages/core/lib/src/utils.dart:77-79`); where a label below
says "derived", it comes from that rule.

## `docs/reference/wrappers.md`

### What changed for the reader

- New warm intro with two everyday examples (product card + Gesture Detector, long column + Scroll View).
- "Add a wrapper": example search terms; reassurance that <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> removes a wrapper again (moved up from "Remove").
- "Reorder wrappers": says why order matters ("each wrapper goes around everything above it") and makes the Container/Padding example explicit (two wrappers).
- New section **The wrappers you'll use most** with one H3 per wrapper that had its own old page: Padding, Scroll View, Gesture Detector, Visibility, Opacity, Material, Text Direction. Each says what it does, when to use it, and what its settings mean.
- **Anchors**: the seven old-page anchors moved from `<Anchor>` spans in the table rows to explicit heading IDs on those H3s (`### Padding {#padding}`, `{#scrollview}`, `{#gesture-detector}`, `{#visibility}`, `{#opacity}`, `{#material}`, `{#text-direction}`). Same IDs, still once each on the page, so the old URLs (`redirects.js:154-160`) and the links from `design/responsive.md` (`#scrollview`, `#visibility`) now land on the detailed section. The other 25 `<Anchor>` IDs are unchanged. Checked with a script: all 32 IDs present exactly once. The seven table rows link up to their section.
- "All wrappers" tables: every description now says what the wrapper does to the widget inside, in plain words, most with a "use it for". Group headings kept word for word (their auto IDs stay the same).
- Jargon explained where it can't be avoided: notifier (Notifier Builder row), validator (Form row), `formKey` (what logic uses it for), screen reader (Opacity), code-like dropdown values (`vertical`/`horizontal`, `ltr`/`rtl`, the `...ScrollPhysics` values, `onDrag`).
- Tip kept (one admonition), with a second example prompt and a way to check the result.
- Nothing moved to the code section (the page had no code-only facts).

### Claims added or changed, with evidence

| Claim | Evidence |
|---|---|
| 32 wrappers, names as listed | `packages/core/lib/src/wrappers_to_add.dart:12-188` |
| Section headers show the friendly names (Scroll View, Text Direction, Clip radius, Color Filter, Screen) | `block_field.dart:180-182` (label from `info.className`), `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:61` (`className => displayName`), `:667-733` |
| **...** menu with **Remove**, shown on hover; grip with move cursor | `packages/core/lib/src/fields/class_field.dart:372-414`, `:416-446` |
| Padding: starts at 8 all round; first field = left/right, second = top/bottom; **Individual padding** switches to left, top, right, bottom and back; minimum 0 | `wrappers_to_add.dart:13-26`; `packages/core/lib/src/fields/basic_fields.dart:745-842` (`_buildSymmetric(horizontal, vertical)`, tooltip `'Individual padding'`, `BFDouble(f, min: 0.0)`) |
| Padding on a Group shows in the Group's **Padding** row | `block_field.dart:796-815`; `packages/designer/lib/src/details/group_details.dart:141-157` |
| Padding use cases (readability, grouping, tap targets) | Old `ui/wrappers/padding.md`; design guidance, no product claim |
| Scroll View settings shown: **Scroll Direction**, **Reverse**, **Padding**, **Physics**, **Keyboard Dismiss Behavior**, **Primary**, **Restoration Id** (derived labels, all constructor parameters except key and child) | `packages/core/lib/src/interpreter/libraries/material_library.dart:109279-109298`; default editor `class_field.dart:100-137` |
| **Scroll Direction** values `vertical` (default) / `horizontal`; enums are dropdowns of the raw value names | `material_library.dart:78960-78966`, `:109286`; `basic_fields.dart:1511-1548` |
| **Reverse** starts at the bottom / the end | Flutter `widgets/single_child_scroll_view.dart:172-185` |
| **Padding** (Scroll View) = space between the scroll area's edges and the content | Flutter `single_child_scroll_view.dart:187-188` |
| **Physics** dropdown: Always/Bouncing/Clamping/NeverScrollable/Page; what each does; empty = platform default | `packages/core/lib/src/fields/list_view_field.dart:355-385`; Flutter `widgets/scroll_physics.dart` class docs (Bouncing "typically seen on iOS", Clamping "typically seen on Android", NeverScrollable "does not allow the user to scroll", AlwaysScrollable "always lets the user scroll"); `single_child_scroll_view.dart:207-213` ("Defaults to matching platform conventions") |
| **Keyboard Dismiss Behavior** `onDrag` hides the keyboard when scrolling starts | `material_library.dart:106642-106658` (values `manual`, `onDrag`; nullable, so the dropdown also has **Default**: `basic_fields.dart:1540-1542`); Flutter `widgets/scroll_view.dart:40-48` |
| **Primary**, **Restoration Id**: special cases, leave as they are | Flutter `scroll_view.dart:191-216` (primary); no Nowa code sets `restorationScopeId` (grep of `packages/core/lib`, `lib`) |
| No **Expand** along the scroll direction inside a Scroll View | `packages/designer/lib/src/details/size_fields.dart:5-41` |
| Try scrolling with **Play** (click the screen's title, then **Play**) | `docs/test/instant-play.md` (clicks go to the app while playing) |
| Gesture Detector: **On Tap**, **On Secondary Tap**, **On Double Tap**, **On Long Press** in Details; more under **Show advanced options** | `packages/designer/lib/src/details/widget_fields.dart:488-514`; `block_field.dart:1331-1365` (`'Show advanced options'`) |
| Advanced events include **On Horizontal Drag End** and **On Scale Update** (derived) | `material_library.dart:92329-92420` (`onHorizontalDragEnd`, `onScaleUpdate`) |
| Secondary tap = right-click with a mouse | Flutter `GestureDetector.onSecondaryTap` (secondary button) |
| Gesture Detector has no visual feedback; Ink Well adds a ripple | Flutter `material/ink_well.dart:298` ("[GestureDetector], for listening for gestures without ink splashes") |
| Event button **+** creates the function and opens Circuit; then reads **Edit** | `basic_fields.dart:533-559`; `packages/core/lib/src/fields/nowa_fields.dart:808`, `:824-826` |
| On the board a click selects; gestures work in **Play** | `docs/test/instant-play.md` |
| Visibility: **Visible** and **Replacement** only; Visible on by default; hidden = replaced by an empty box, so it takes no space | `packages/core/lib/src/fields/text_fields.dart:802-815`; `wrappers_to_add.dart:27-31`; `material_library.dart:115582-115592` (`replacement` default `SizedBox.shrink()`, `maintainSize` false) |
| Click the **Visible** label to link it | `block_field.dart:1003-1046` (label tap opens the link menu); `docs/design/properties.md#link-a-property-to-your-data` |
| Opacity: 0 invisible, 1 fully visible, starts at 0.5 | `wrappers_to_add.dart:37-41`; Flutter `widgets/basic.dart:345-352` |
| Opacity doesn't animate; **Cross Fade** fades between two widgets | Opacity is a plain `Opacity` widget (no duration parameter, `material_library.dart:75019-75040`); Cross Fade `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:444-462`, catalog row `docs/reference/widgets/index.md#cross-fade` |
| At 0 the widget still takes its space and still reacts to taps | Flutter `widgets/basic.dart` Opacity class doc, "Hit testing" ("Setting the opacity to zero does not prevent hit testing"); Opacity only paints, layout unchanged |
| Screen readers skip a widget at 0 unless **Always Include Semantics** is on | Flutter `rendering/proxy_box.dart:956-960` (`_alpha != 0 || alwaysIncludeSemantics`), `widgets/basic.dart:353-362`; label derived from `alwaysIncludeSemantics` |
| Material fields **Color**, **Elevation**, **Shadow Color**, **Tint Color**, **Border**, **Border On Foreground** | `basic_fields.dart:1873-1903` (`surfaceTintColor` labelled **Tint Color**, `shape` labelled **Border**) |
| **Color** empty = theme surface color | `basic_fields.dart:1880-1884` |
| Elevation above 0 casts a shadow; higher = bigger shadow | Flutter `material/material.dart:225-250`, `:317-326` ("A shadow is only displayed if the elevation is greater than zero") |
| **Tint Color** overlay grows with elevation | Flutter `material.dart:287-312` (Material 3); Material 3 is Flutter's default (`material/theme_data.dart:413`) and Nowa doesn't turn it off for user projects (only `packages/nowa_ui` sets `useMaterial3`) |
| **Border**: **+** creates a rounded rectangle with a 1 px black side, with **Border Radius** | `basic_fields.dart:1854-1869`; RoundedRectangleBorder parameters `side`, `borderRadius` |
| **Border On Foreground**: on (default) draws the border over the content | Flutter `material.dart:328-332` |
| Ripple hidden by a filled widget; fix with a Material below the Ink Well | Flutter `material/ink_well.dart:1440-1471` (InkWell needs a Material ancestor; an opaque Container between them hides the splash; use a Material above the opaque widget and around the ink response). Lower in Details = outside: new wrappers are added outermost (`packages/core/lib/src/interpreter/widget/designer_model.dart:482-496`) and Details lists the widget, then its wrappers in order (`packages/designer/lib/src/details/widget_details.dart:185-196`) |
| Text Direction values `rtl` / `ltr` (default `ltr`); rows inside flip their order | `wrappers_to_add.dart:115-119`; `material_library.dart:81163-81168`; Flutter `widgets/basic.dart:5479-5493` (Flex children order follows the ambient direction) |
| Align starts centered; Alignment sliders | `wrappers_to_add.dart:61-70`; `basic_fields.dart:1551` (`BFAlignment`) |
| Fractionally Sized Box: share of the space (0.5 = half) | Flutter `widgets/basic.dart:3228` ("the fraction of the incoming width given to the child") |
| Aspect Ratio starts at 1 | `wrappers_to_add.dart:151-157` |
| Fitted Box scales to fit (shrink a long title) | Flutter `FittedBox` (default `BoxFit.contain`) |
| Safe Area: sides under **Show advanced options**; new screens already wrap their content in one | `widget_fields.dart:516-528`; `packages/core/lib/src/services/templates/built_in/empty_page.dart:21-27`; `packages/core/lib/src/widgets_to_add/default_blocks.dart:333-348` (`screenBlock`), used for drawn screens `packages/designer/lib/src/design_experience/place_board.dart:22-30` |
| Transform doesn't change the space the widget takes | Flutter `widgets/basic.dart:1547-1549` |
| Badge "99", Tooltip "Tooltip message", AnimatedContainer 300 ms + gray | `wrappers_to_add.dart:158-187` |
| Ink Well fields include **On Tap** and **Splash Color** | `widget_fields.dart:460-486` |
| Dismissible: **Direction**, **Background**, **On Dismissed** (derived); remove the item in **On Dismissed** or Flutter raises an error (debug) | `wrappers_to_add.dart:168-172`; Flutter `widgets/dismissible.dart` class doc ("its onDismissed callback must remove the item from the list") and `:621-635` (assert "A dismissed Dismissible widget is still part of the tree") |
| Refresh Indicator needs a scrolling widget inside | Flutter `material/refresh_indicator.dart` class doc ("When the child's Scrollable descendant overscrolls...", "will appear if its scrollable descendant can be overscrolled") |
| Interactive Viewer: pan and zoom (no rotation) | Flutter `widgets/interactive_viewer.dart:510-513` |
| Default Text Style: a Text's own settings win | Flutter `widgets/text.dart:32-33` ("descendant Text widgets which don't have an explicit style"; explicit styles merge on top) |
| Form validates Text Field, Dropdown menu and Pin Code Field; `formKey` | `packages/core/lib/src/fields/form_fields.dart:8-41`; `docs/reference/widgets/forms.md` |
| Screen slots **App Bar**, **Drawer**, **Floating Action Button**, **Bottom Navigation Bar** | `widget_fields.dart:202-259` (derived labels) |

### Open questions

1. **Color Filter wrapper may start broken (probable product bug).** `wrappers_to_add.dart:101-114` passes `color` and `blendMode` as *named* arguments, but `ColorFilter.mode` takes them *positionally* (`material_library.dart:80347-80353`, `LazyParameter('Color', 'color', 0)`). Nowa keeps string keys as named arguments: the run path sends them to `namedArgs` and leaves `posArgs` empty (`packages/core/lib/src/interpreter/declaration_internal.dart:239-257`), the problem check counts 0 of 2 positional arguments (`packages/core/lib/src/interpreter/block_tree.dart:5924-5951`, `NotEnoughPositionalArguments`), and the code writer emits `ColorFilter.mode(color: ..., blendMode: ...)` (`block_tree.dart:6264-6280`), which Dart rejects. The field editor's own **+** builds it correctly with positional keys (`basic_fields.dart:1952-1969`). Not checked live. I kept the row neutral ("Recolors the widget... It starts gray.") and did **not** add the old page's grayscale use case (set **Blend Mode** to `saturation`), because it depends on this default. Please verify live; if it's broken, it belongs in `product-issues.md` and `known-issues.md` (workaround: remove the **Color Filter** object in the section and add it again with **+**, which needs checking too).
2. The page is about 2,550 readable words (was about 1,230). If it should be shorter, split it into "Wrappers" (add, reorder, remove and the full list) and "Common wrappers" (the seven detailed sections); the seven anchors would then need redirects (`redirects.js:154-160`) re-pointed.
3. I couldn't check on screen how a widget whose **Visible** is off looks on the board, so the page doesn't say.

## `docs/reference/shortcuts.md`

### What changed for the reader

- Intro: a "start with these five" list (add a widget, undo, group, run, the Shortcuts sheet), so a newcomer knows where to begin. All five were already on the page and verified.
- Shortcuts sheet: one clause on why it's useful while learning.
- Undo: one sentence on what "each area keeps its own history" means in practice (undoing in Circuit doesn't touch the board).
- "Stack" explained in place (widgets that sit on top of each other); "node" explained for Circuit; "regular expressions" glossed as search patterns (code-editor table).
- **Hot Reload** / **Hot Restart** explained in plain words (updates in place vs starts again), from `docs/test/run.md`.
- New paragraph under "When a shortcut does nothing": the two 3.13 cases where a shortcut swallows a key (`/` in **Details**; t, r, v, f in the **Variables** list), linking to the known-issues workarounds.
- New section **If you used an older version**: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> (was the widget picker, now runs the app) and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> (was group/ungroup, now group only). These are the two entries of the old `/shortcuts` page that changed; people arriving from the old URL get them first-hand.
- Keywords: `embedded preview`, `hot reload`, `hot restart`, `open widget picker`, `ungroup`.
- No headings renamed (`#code-editor` is linked from `docs/code/code-mode.md`). Nothing moved to the code section.

### Evidence for new or changed claims

| Claim | Evidence |
|---|---|
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> opens the Library to add; <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> runs the app; <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> groups only | `packages/designer/lib/src/designer_setup.dart:20`, `:50-51`, `:106` (`PlayInDesignerIntent: RunAppAction()`) |
| Ungroup is a right-click entry | `packages/designer/lib/src/menus/widget_context_menu.dart:41-42` |
| Old page: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> opened the widget picker, <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> grouped/ungrouped | `_rewrite/old-docs/shortcuts.md:15`, `:24` |
| Restart button is **Hot Reload** (local) / **Hot Restart** (cloud); <kbd>Shift</kbd> + <kbd>R</kbd> | `packages/nowa_ui/lib/top_bar/top_bar_contract.dart:358`, `:378`; `packages/nowa_run/lib/src/actions/actions_setup.dart:20`; behavior wording from `docs/test/run.md` ("A local run reloads in place. A cloud run has to come back up.") |
| `/` typed in **Details** is dropped; t, r, v, f in the **Variables** list | `docs/troubleshooting/known-issues.md#slash-in-details`, `#variables-list-rename`. Likely cause, for the record: the designer binds a bare `/` to `FocusAiChatIntent` (`designer_setup.dart:55`); that action only does something in the experimental new UX (`packages/designer/lib/src/panels/vibe_bottom_toolbar.dart:43`, gated by `experimentalSettings.newUXExperimental` in `packages/core/lib/src/providers/editor_provider.dart:348`), so the `/` shortcut itself isn't documented (D2). |

### Open questions

- The page is about 2,670 readable words, most of it key tables (it was about 2,430 before this pass). If it must shrink, split off "Tabs in code mode" and "Code editor" onto a code-section page (`docs/code/code-mode.md` already links `#code-editor`).

### Routed from B13 (applied)

- Container row: "Its fill sits behind the widget it wraps, so it doesn't tint a picture. To tint one, use the Image's **Color** and **Blendmode** (see [Add an image](./widgets/media.md#image))." Checked: Flutter `widgets/container.dart:334` ("The decoration to paint behind the [child]"); Nowa's Container editor always shows decoration, alignment, padding and margin and other parameters only when they already have a value (`packages/designer/lib/src/details/widget_fields.dart:317-350`, `if (p0.block == null) return false`), so there's no foreground fill to reach for; Image labels **Color** and **Blendmode** (`widget_fields.dart:41-42`); `## Add an image {#image}` exists on `docs/reference/widgets/media.md:24`.

## `docs/reference/glossary.md`

### What changed for the reader

- Warm intro: who the page is for, reassurance that nobody has to learn these by heart, and how to find a word (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>F</kbd>).
- The page is now sorted into sections: **Nowa words** (the old table), **Building your app**, **Logic and data**, **Backend and services**, **Testing and publishing**, **Code and Git** (marked as optional for people who don't code), then **Renamed or removed**. The old page had no H2 above its table and nothing links to glossary anchors (grep), so no anchor changed.
- Nowa words: 8 new entries (Api panel, Data Builder, Embedded preview, Instance, Integrations, Node, Router, Template); warmer wording with everyday examples on Board, Circuit, Component, Global state, Screen, Variable, Widget (matching `docs/get-started/welcome.md` "Key terms"); Model rewritten without "data class" and `fromJson`; Wrapper says what it adds.
- 67 technical terms defined in plain words across the new sections (some rows group two or three related words). Chosen by grepping every page outside `docs/new/` and `docs/legacy/` for Flutter, backend, publishing and Git words and keeping the ones pages actually use (counts and contexts checked; for example `bundle ID` 3 pages, `SHA` 3, `keystore` 1, `emulator` 20, `backend` 19, `query` 19, `JSON` 14, `Future` 14, `RLS` 8, `webhook` 3, `MCP` 4, `CORS` 1, `edge function` 4, `cURL` 6). `Map` was considered and dropped (no page uses it as a type).
- Every definition avoids code knowledge; type names and Circuit names that the UI shows (`String`, `int`, `double`, `bool`, **refresh**, `notifyListeners`, **await**) are explained (R3).
- Renamed table: the Move Up/Down/To Top/To Bottom row now pairs each old name with its new one (the old row relied on column order); the widget-picker row says <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> runs the app; new row for the three wrappers whose names changed since the old list.
- Nothing moved to the code section.

### Routed from B04 (applied, labels checked)

| Entry | How it was merged | Evidence |
|---|---|---|
| Constraints | Taken as given, plus one sentence that **Constrained Box** uses the word for min/max size | `packages/designer/lib/src/details/positioned_details.dart:97-100`, `:148-151` (**Left**, **Right**, **Left and right**, **Center**; **Top**, **Bottom**, **Top and bottom**, **Center**); `wrappers_to_add.dart:87-91` |
| Group | Taken as given | `packages/designer/lib/src/details/group_details.dart:101-120` (Stack, Row and Column buttons) |
| Instance | Nowa words, with the recipe-card example from `docs/design/components.md:12` | `docs/design/components.md` |
| Row, Column, Stack | Own row; links `layout.md#pick-the-right-arrangement` (exists, `docs/design/layout.md:12`) | `group_details.dart:101-120` |
| Fixed, Auto, Expand | Replaced my own draft row | `packages/core/lib/src/layout/layout.dart:388` (`enum SizeType { fixed, auto, expand }`) shown as `val.name.capitalize()` (`packages/designer/lib/src/details/size_fields.dart:154`); `flex_size_field.dart:52-67` |

### Evidence for the other new or changed entries

| Entry | Evidence |
|---|---|
| Api panel | Sidebar name `Api` (`lib/project/side_bar.dart:76`); `docs/integrations/rest-api/index.md` |
| Data Builder (widget and wrapper) | `wrappers_to_add.dart:86`; catalog `docs/reference/widgets/index.md#data-builder`; `docs/integrations/show-data.md` |
| Embedded preview | `lib/project/run/run_button.dart:604`; `docs/test/run.md` |
| Integrations (7 names) | `packages/core/lib/src/settings/project_settings.dart:33-40` (Google Maps, AdMob, RevenueCat, Deep Links, Google Sign-In, Stripe) plus Firebase, added by the data plugin (`docs/integrations/index.md:63`); display names in `packages/core/lib/src/interpreter/packages/integrations/*_package_config.dart` |
| Node, **Show snackbar** | `docs/logic/circuit.md:10`; `packages/core/lib/src/state_management/global_state_suggestions.dart:65` |
| Router | `docs/logic/router.md` intro (routes, the screen that opens first) |
| Template | `docs/design/templates.md` intro |
| Model (rewritten) | `docs/logic/models.md`; **New Model...** unchanged from the old entry |
| Asset, **Assets** chip | `docs/design/assets.md`; old entry "Assets panel → Assets chip" |
| Container | `docs/reference/widgets/index.md:27` |
| Dart, Flutter | flutter.dev home page ("Flutter is an open-source framework for building beautiful, natively compiled, multi-platform applications from a single codebase"); real Flutter code the user owns: `_rewrite/BRIEF.md` "What Nowa is" |
| Dialog, snackbar, bottom sheet | `docs/logic/popups.md` sections |
| Localization and RTL | `docs/design/localization.md`; `ltr`/`rtl` values `material_library.dart:81163-81168` |
| Markdown and HTML widgets | Catalog anchors `#markdown`, `#html` (`docs/reference/widgets/index.md`) |
| Material and Cupertino under **Built-in** | `docs/design/library.md:26` |
| Overflow, `ellipsis` | Text's **Overflow** property (`docs/design/properties.md:23`); Flutter `TextOverflow.ellipsis` |
| Padding and margin | Container editor `padding`, `margin` (`widget_fields.dart:317-350`) |
| Responsive | `docs/design/responsive.md` |
| Route `/home` | `docs/logic/router.md`, `docs/logic/navigation.md`; paths start with `/` (`docs/troubleshooting/known-issues.md#slash-in-details`) |
| Safe area | `wrappers.md#safe-area` |
| SVG, Lottie, Rive widgets | `docs/reference/widgets/media.md` |
| Widget tree | `docs/design/outline.md` description |
| Class, mention with `@` | `docs/reference/shortcuts.md` (Chat table) |
| Condition, **If** node | `docs/logic/circuit.md:103-109` |
| Expression | `docs/logic/expressions.md` |
| Function | `docs/logic/functions.md` |
| Future, Stream, **await** | `docs/integrations/firebase/firestore.md:57-58` (`get` returns a Future, `snapshots` a Stream that updates live); `docs/logic/circuit.md:95` (**await**) |
| JSON, models from JSON | `docs/logic/models.md` ("Generate models from JSON") |
| null, **Set to null** | `docs/design/screens.md:43`; `docs/design/properties.md:68` |
| **refresh**, `notifyListeners` | `docs/logic/variables.md:72-74`; `docs/logic/global-state.md:33-35`, `:64` |
| State | `docs/logic/variables.md`, `docs/logic/global-state.md` |
| Types, **As List** | `docs/logic/variables.md:36-59` |
| Ad unit ID | `docs/integrations/admob.md:12`, `:31`, `:55` |
| API, REST API | `docs/integrations/rest-api/index.md` intro |
| Publishable vs secret keys; anything in the app can be dug out | https://docs.stripe.com/keys ("Only publishable keys are safe to expose outside your application's backend"); `docs/integrations/rest-api/index.md:64`; `docs/integrations/supabase/connect.md:82` |
| Authentication | `docs/integrations/index.md#add-sign-in` |
| Backend | `docs/integrations/index.md#choose-a-backend` |
| Cloud Firestore documents and collections | https://firebase.google.com/docs/firestore/data-model ("you store data in documents, which are organized into collections. Each document contains a set of key-value pairs") |
| CORS | `docs/troubleshooting/known-issues.md:37-41` |
| cURL, Swagger, Postman, Xano | `docs/integrations/rest-api/import.md:8`; `docs/ai/prompting.md:59` |
| Deep link, URL scheme `myapp://` | `docs/integrations/deep-links.md:3`, `:8`, `:14` |
| Edge Function | `docs/ai/connectors.md:43`; `docs/integrations/supabase/connect.md:116`; Stripe secret key kept on Supabase (`docs/integrations/stripe.md:43`) |
| Endpoint, methods, base URL | `docs/integrations/rest-api/index.md:49`, `:64` (methods GET, POST, PUT, DELETE, PATCH, HEAD; base URL) |
| Entitlement, offering | `docs/integrations/revenuecat.md:21-22`; https://www.revenuecat.com/docs/getting-started/entitlements ("Entitlements represent a level of access, features, or content that a user is 'entitled' to") |
| Firebase, **Settings** → **Integrations** → **Firebase** | `docs/integrations/index.md:16` |
| In-app purchase, subscription | `docs/integrations/index.md#stripe-or-revenuecat` |
| MCP | https://modelcontextprotocol.io/docs/getting-started/intro ("an open-source standard for connecting AI applications to external systems"); `docs/ai/connectors.md:12`, `:20`; `docs/ai/external-agent.md` |
| Migration | https://supabase.com/docs/guides/deployment/database-migrations ("SQL statements that create, update, or delete your existing database schemas ... tracking changes to your database over time"); `docs/integrations/supabase/backend.md:30` |
| OAuth, client ID | `docs/integrations/google-sign-in.md` intro ("Google OAuth client IDs") |
| Package, pub.dev, dependency, **Add Missing Dependencies** | `docs/code/packages.md:8`, `:28`; `docs/design/add-widgets.md:29` |
| Paywall, **RevenueCat Paywall** | `docs/integrations/revenuecat.md:8` |
| pubspec.yaml updated when you add packages | `docs/code/packages.md:28`, `:37` |
| Push notification, **Push Notifications (FCM)** | `packages/data/lib/src/firebase/setup/views/notification_settings.dart:43`; https://firebase.google.com/docs/cloud-messaging ("a cross-platform messaging solution that lets you reliably send messages"); `docs/integrations/firebase/notifications.md:8` |
| Query | `docs/integrations/firebase/firestore.md`, `docs/integrations/supabase/database.md` |
| Request, response, header | `docs/integrations/rest-api/index.md` intro (headers, sign-in token) |
| Row Level Security, policies | https://supabase.com/docs/guides/database/postgres/row-level-security ("granular authorization rules that run inside the database"; "Each policy is attached to a table"; example "Individuals can view their own todos"); `docs/integrations/supabase/connect.md:82` |
| SDK, Flutter SDK | `docs/test/devices.md#what-your-computer-needs`; `docs/get-started/desktop-app.md#setting-up-flutter-sdk` |
| SQL via the Supabase connector | `docs/ai/connectors.md:37-43` |
| Storage bucket, policies | `docs/integrations/supabase/storage.md:13-15`; https://supabase.com/docs/guides/storage/buckets/fundamentals (access via RLS policies; profile pictures as a use case) |
| Supabase panel | `docs/integrations/index.md:16` |
| Webhook | `docs/integrations/stripe.md:8`; https://docs.stripe.com/webhooks ("Receive Stripe events in your webhook endpoint") |
| APK, AAB, IPA | `docs/publish/android.md:25`, `:66-68`; `docs/publish/ios.md:61-62`; https://developer.android.com/guide/app-bundle ("a publishing format ... Google Play uses your app bundle to generate and serve optimized APKs") |
| App Store Connect | https://developer.apple.com/app-store-connect/ ("upload, submit, and manage your apps on the App Store ... invite users to test your apps and games with TestFlight"); `docs/publish/ios.md:23`, `:61` |
| Build, cloud builds | `docs/publish/builds.md`; `docs/publish/ios.md:8` |
| Bundle Identifier vs **Package Name** | `docs/publish/index.md#app-details` (and the note on **Package Name** below its table); `docs/integrations/firebase/connect.md:14` |
| Debug and release builds, **Debug mode** | `docs/publish/android.md:8`, `:23`, `:31` |
| Distribution certificate | `docs/publish/ios.md:39` |
| Domain, DNS records | `docs/publish/web.md:55-64` |
| Emulator, iOS Simulator (Mac) | `docs/test/devices.md#what-your-computer-needs` |
| Google Play Console | `docs/publish/android.md:8`, `:73` |
| Hot reload, hot restart | `docs/test/run.md:43`; https://docs.flutter.dev/tools/hot-reload ("Flutter's stateful hot reload preserves the state of your app") |
| SHA-1, SHA-256 on the **Android** tab of **Settings** → **Deployment** | `docs/publish/android.md:50`; `docs/publish/ios.md:28` (**Settings** → **Deployment** with platform tabs) |
| Signing key, keystore, Nowa can generate one | `docs/publish/android.md:31-41` |
| TestFlight | https://developer.apple.com/testflight/ ("easy for testers to give feedback on your apps ... before you publish"); `docs/publish/ios.md:75` |
| Commit, push, pull, branch; Git, repository | `docs/code/git.md` sections |
| GitHub, access token (legacy) | `docs/code/github.md` headings (`#connect-github`, `#legacy-remote-credentials`) |
| VS Code | `docs/code/vs-code.md` |
| Xcode, Android Studio, cloud builds need neither | `docs/test/devices.md#what-your-computer-needs`; `docs/publish/ios.md:8` |
| Old widget-picker shortcut | 3.12.5's sheet showed "Open widget picker" with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> (`git show b84bfdafd:packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart`, line 40) while the real binding was <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> (`b84bfdafd:packages/designer/lib/src/designer_setup.dart:47-48`); so the row says what <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> does, not that it changed |
| Move Up → Send backward, etc. | `b84bfdafd:packages/designer/lib/src/menus/widget_context_menu.dart:78-91` (Move Up = `goNext: false`, Move Down = `goNext: true`, Move To Top = `goNext: false, allTheWay`, Move To Bottom = `goNext: true, allTheWay`) vs 3.13 `packages/designer/lib/src/menus/widget_context_menu.dart:45-48` |
| Old wrapper names | `_rewrite/old-docs/ui/wrappers/wrappers-list.md:14`, `:20`, `:32` vs `wrappers_to_add.dart:42`, `:73`, `:122` |

Third-party pages were read with curl through the session proxy (WebFetch could not resolve hosts), on 2026-10-12.

### Open questions

- The page is about 4,400 readable words (was about 1,340), because it now defines every technical term the docs use. If that's too long for one page, split it into "Glossary: Nowa words" (the Nowa words and Renamed tables) and "Glossary: app-building words" (the other five sections). That needs a sidebar change, which is outside this batch.

## `docs/reference/index.md`

- Warmer intro that says what the section is for and that it's for dipping into, not reading through.
- Table rows updated to match the pages as they are now: the catalog lists the widgets "in the Library" (B13's wording, `docs/reference/widgets/index.md` description), wrappers mention their settings, shortcuts mention the five-to-learn-first list, the glossary mentions its new sections.
- Widget guides: one-line lead-in says why the guides exist; the media guide's link text follows its new title ("Images, video, animations and web content", `docs/reference/widgets/media.md`); an everyday example on Lists and grids.
- No new facts that need code refs. Nothing moved to the code section. No coverage items map to this page.

## For other pages

| Target page (batch) | Proposed text | Evidence |
|---|---|---|
| `docs/design/layout.md#scroll-or-wrap-content` (B04) | After the **Scroll View** bullet: "For a Row that scrolls sideways, set **Scroll Direction** to `horizontal` in the wrapper's section; `vertical` is the default. [Wrappers](../reference/wrappers.md#scrollview) explains the other settings." | Old `ui/wrappers/scrollview.md:26-31`; `material_library.dart:78960-78966` (values), `:109286` (default `vertical`); enum dropdown `basic_fields.dart:1511-1548` |
| `_rewrite/product-issues.md` and, once confirmed, `docs/troubleshooting/known-issues.md` (orchestrator / B12) | Verify live: add a **Color Filter** wrapper to any widget and check **Problems**, the board and **Run**. Expected issue: the starting filter passes its color and blend mode by name to a constructor that takes them by position. | See wrappers open question 1 above (`wrappers_to_add.dart:101-114`, `material_library.dart:80347-80353`, `declaration_internal.dart:239-257`, `block_tree.dart:5924-5951`, `:6264-6280`) |
