# P14-B14 verify: reference pages (index, wrappers, shortcuts, glossary)

Verifier: P14-B14-V. Source of truth: `/home/user/nowa-master` (3.13.0, `3cb32031c`); Flutter framework doc comments in
`/home/user/flutter` (the text api.flutter.dev publishes). Code refs relative to `/home/user/nowa-master` unless they
start with `flutter/`.

## Summary

- **Pages checked:** `docs/reference/index.md`, `wrappers.md`, `shortcuts.md`, `glossary.md` (every `+` and `-` line of
  the diff against `origin/main`, plus the audience rules on the whole of each page).
- **Claims checked:** about 190: about 75 on wrappers (every setting label, starting value and behavior in the seven new
  sections and the 25 "use it for" rows), 15 on shortcuts, 95 glossary rows (8 new and 10 rewritten Nowa words, 77 new
  rows, 3 renamed rows, plus 22 unchanged labels spot-checked) and 6 on the index. Third-party definitions were checked
  against 16 official pages read with curl.
- **Fixed (11):** the glossary front matter build blocker (bare `null` keyword); wrappers intro (a Gesture Detector
  doesn't open a page by itself); "click the title and **Play**" → "hover ... and click **Play**"; Text Direction overstated
  ("a whole section mirrors itself"); Dismissible error only in **Run**, not in Instant Play; the shortcuts known-issues
  link covered only one of its two workarounds; glossary **If** → **If Statement**; Firebase row read as exhaustive;
  RTL "mirror the layout"; SHA fingerprint location; `pubspec.yaml` row now explains the **Problems** message the reader
  actually sees (audience, R3).
- **Removed (1):** Color Filter "It starts gray" (the code shows the starting gray never reaches the filter; see the
  finding under wrappers).
- **Restored (2):** "the first Padding" on a Group (dropped from the verified main text); the Scroll View cross-link to
  `design/layout.md#scroll-or-wrap-content`.
- **Precision tweaks (4):** glossary links to `circuit.md#future-options` and `git.md#git-in-a-minute` (2); the hot
  reload row says which projects show which button.
- **Anchors:** all 32 wrapper IDs on `origin/main` exist exactly once (the seven moved to section headings), every old auto
  heading ID survives, `redirects.js:154-160` resolve; no anchor changed on the other three pages.
- **Length:** wrappers about 2,600, shortcuts about 2,500, glossary about 4,500 words (script count). Accepted as reference
  pages. I found no repetition worth cutting: the two undo reminders on wrappers sit in different task sections.
- **Open issues:** (1) the Color Filter wrapper is very likely broken in 3.13 (code evidence below). It needs a live
  check before it goes to `product-issues.md` / `known-issues.md`, and the writer's "remove and re-add" workaround would
  be refused because the filter is a required value. (2) Not seen live: how a hidden (**Visible** off) widget looks on
  the board. The page doesn't claim it.

## Build blocker fixed first (coordinator request)

| Item | Verdict | Source | Note |
|---|---|---|---|
| `glossary.md` front matter: bare `null` in `keywords` (index 32) parsed as a YAML null, Docusaurus error `"keywords[32]" must be a string` | fixed | coordinator report | Quoted as `"null"`. Re-parsed the front matter of all four batch pages with PyYAML (YAML 1.1, stricter than js-yaml: `yes`/`no`/`on`/`off` would also turn into booleans): every keyword is a string, no other bare special word (`yes`, `no`, `on`, `off`, `true`, `false`, `null`, `~`, numbers) on any of the four pages. |

## `docs/reference/wrappers.md`

All labels checked against the 3.13 Details code. Field labels are the parameter name run through `camelCaseToSpaces()`
(`packages/core/lib/src/fields/block_field.dart:178-182`, `:211-221`; `packages/core/lib/src/utils.dart:77-79`) unless an
editor passes its own `label:`.

| Claim | Verdict | Source | Note |
|---|---|---|---|
| 32 wrappers, names as the **Add Wrapper** list shows them; starting values (Padding 8, Visibility on, Opacity 0.5, Transform rotation, Align centered, Aspect Ratio 1, Badge "99", Tooltip "Tooltip message", AnimatedContainer 300 ms + gray, Container gray fill, Text Direction `ltr`) | ok | `packages/core/lib/src/wrappers_to_add.dart:12-188`; `packages/core/lib/src/widgets_to_add/default_blocks.dart:8-13` | |
| **Add Wrapper** opens a list with the hint **Search for a wrapper**; only with exactly one widget selected; undo removes it | ok | `packages/designer/lib/src/details/widget_details.dart:66-91`, `:145-148`, `:189-196` | |
| Order: widget section first, then wrappers from the closest outwards; a new wrapper goes outermost and lands at the bottom; Container/Padding example | ok | `packages/core/lib/src/interpreter/widget/designer_model.dart:482-496`, `:558-572` (new wrapper wraps `widgets.last`); `widget_instance_impl.dart:85`, `:98`, `:274-275`; `block_field.dart:796-813` | |
| Intro: "Wrap a product card in a **Gesture Detector** and it opens the product page when tapped" | fixed | `packages/designer/lib/src/details/widget_fields.dart:488-514` | The wrapper starts with no events; you add the **On Tap** logic. Now "you can make it open the product page". |
| Padding: 8 all round; first field left/right, second top/bottom; **Individual padding** button switches to left, top, right, bottom and back; min 0 | ok | `packages/core/lib/src/fields/basic_fields.dart:745-871` | |
| Padding on a Group shows in the Group's **Padding** row | fixed | `block_field.dart:796-813` (skips only the first Padding of a group); `packages/designer/lib/src/details/group_details.dart:141-157` | The rewrite dropped "first" from the verified main text; a second Padding still gets its own section. Restored "the first Padding". |
| Scroll View settings **Scroll Direction** (`vertical` default / `horizontal`), **Reverse**, **Padding**, **Physics**, **Keyboard Dismiss Behavior** (`onDrag`), **Primary**, **Restoration Id** | ok | `packages/core/lib/src/interpreter/libraries/material_library.dart:109279-109298`; enum dropdown of raw names, **Default** for nullable enums `basic_fields.dart:1511-1548`; physics dropdown `packages/core/lib/src/fields/list_view_field.dart:355-389`; `flutter/packages/flutter/lib/src/widgets/scroll_view.dart:40-48` | "The other settings, such as..." correctly leaves room for **Clip Behavior**, **Drag Start Behavior** and **Hit Test Behavior**, which the default editor also shows. |
| Physics behaviors (Bouncing iPhone style, Clamping Android style, NeverScrollable off, AlwaysScrollable even when content fits, empty = platform default); Reverse starts at the bottom (chat use case); Padding insets the content | ok | Flutter `widgets/scroll_physics.dart` class docs; `widgets/single_child_scroll_view.dart` (`reverse`, `padding`, `physics` docs) | |
| No **Expand** in the scrolling direction inside a Scroll View | ok | `packages/designer/lib/src/details/size_fields.dart:5-41` | |
| "click the screen's title and **Play**" | fixed | `docs/test/instant-play.md` ("Hover the title bar ... Click it (its tooltip is **Play**)") | Now "hover the screen's title and click **Play**", matching the Instant Play page and `shortcuts.md`. |
| Removed cross-link from the old Scroll View row to `layout.md#scroll-or-wrap-content` | restored | `docs/design/layout.md:138-143` | One sentence pointing to the Wrap alternative for a row of tags. |
| Gesture Detector: **On Tap**, **On Secondary Tap**, **On Double Tap**, **On Long Press**; **Show advanced options** with **On Horizontal Drag End**, **On Scale Update**; **+** opens Circuit, then the button reads **Edit**; no visual feedback, Ink Well for a ripple | ok | `widget_fields.dart:488-514`; `block_field.dart:1331-1365`; `material_library.dart:92329-92424`; `basic_fields.dart:533-559`; `packages/core/lib/src/fields/nowa_fields.dart:797-830`; Flutter `material/ink_well.dart` | |
| Visibility: only **Visible** and **Replacement**; on by default; hidden = empty box, takes no space; click the **Visible** label to link it | ok | `packages/core/lib/src/fields/text_fields.dart:802-815`; `material_library.dart:115582-115604`; `block_field.dart:1003-1046` | |
| Opacity: **Opacity** 0-1, starts 0.5; doesn't animate (Cross Fade for a fade); at 0 still takes space and still gets taps; screen readers skip it at 0 unless **Always Include Semantics** | ok | `material_library.dart:75019-75033`; `widgets_to_add/widgets_to_add.dart:444-466`; Flutter `widgets/basic.dart` Opacity "Hit testing", `rendering/proxy_box.dart:956-960` | |
| Material: **Color** (empty = theme surface), **Elevation**, **Shadow Color**, **Tint Color**, **Border** (**+** on hover, starts as a 1 px black rounded rectangle with **Border Radius**), **Border On Foreground** (on by default) | ok | `basic_fields.dart:1854-1903`; `packages/core/lib/src/fields/class_field.dart:163-188`, `:270-287`; Flutter `material/material.dart:225-332`, `material/theme_data.dart:452` (M3 `canvasColor` = surface) | |
| Ripple hidden by a filled widget; move the color to a **Material** wrapper below the **Ink Well** | ok | Flutter `material/ink_well.dart:1451-1471` ("The ink splashes aren't visible!") | Lower in **Details** = outside, so the Material becomes the Ink Well's ancestor as Flutter's docs require. |
| Text Direction: "so a whole section mirrors itself ... flip the whole screen" | fixed | Flutter `widgets/basic.dart` (Flex lays children out in the ambient text direction); Nowa's Align and Padding use non-directional `Alignment` and `EdgeInsets` (`wrappers_to_add.dart:16-23`, `:61-69`), which don't flip | Overstated. Now "so the first widget in a row moves to the right" (the wording `design/localization.md:39` uses) and "set the direction for the whole screen". |
| Text's own **Text Direction** setting | ok | `widget_fields.dart:307-310` | |
| Color Filter row: "It starts gray." | removed | see finding below | The rest of the row stays neutral and true: the section shows **Color** and **Blend Mode** (labels from `ColorFilter.mode`'s parameter names). |
| Dismissible: "or you'll see an error when you test" | fixed | Flutter `widgets/dismissible.dart:621-635` (a debug-only assert); local Run is `flutter run` in debug mode (`packages/nowa_run/lib/src/services/local/nowa_run_service_local.dart:54`), and cloud Run offers **Hot Restart**, a debug-mode feature | Instant Play runs inside Nowa's own release build, where the assert is off, so "when you test" was too broad. Now "when you try it with **Run**". |
| Other "use it for" rows: Align, Constrained Box, Fractionally Sized Box (0.5 = half), Aspect Ratio (2 = twice as wide), Fitted Box, Safe Area (new screens already have one), Container (fill behind the child; tint an Image with **Color**/**Blendmode**), Clip radius, Transform (doesn't change the space), Badge, AnimatedContainer, Ink Well (**Splash Color**), Refresh Indicator (needs a scrolling widget), Interactive Viewer, Tooltip, Default Text Style (a Text's own settings win), Data Builder, Notifier Builder (**Notifier**), Form (validators for Text Field, Dropdown menu, Pin Code Field; `formKey`), Screen slots, Drawer | ok | `wrappers_to_add.dart`; `widget_fields.dart:29-49`, `:202-259`, `:317-350`, `:460-486`, `:516-528`; `packages/core/lib/src/services/templates/built_in/empty_page.dart:21-27`; `default_blocks.dart:333-348`; `packages/designer/lib/src/design_experience/place_board.dart:22-30`; `packages/core/lib/src/fields/form_fields.dart:8-41`; `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:511-540`; `packages/core/lib/src/fields/data_field.dart:53-95`; Flutter `container.dart`, `basic.dart` (Transform, FractionallySizedBox, AspectRatio), `refresh_indicator.dart`, `interactive_viewer.dart`, `text.dart` | New Library Text widgets carry no explicit style (`default_blocks.dart:318`), so the Default Text Style example works. |
| Anchors | ok | script | All 32 IDs on `origin/main` are present exactly once (the seven moved to `### ... {#id}` headings), every `origin/main` auto heading ID still exists, and `redirects.js:154-160` targets resolve. No product link points into this page. |
| Links, structure | ok | script | 0 broken relative links or anchors; one admonition; no H1, `---`, emoji or hype words; front matter valid. |

### Color Filter finding (logged, not stated on the page)

The code shows the mismatch the writer suspected, at every layer:

- The wrapper's starting filter stores its values under the keys `'color'` and `'blendMode'`
  (`packages/core/lib/src/wrappers_to_add.dart:104-111`), but `ColorFilter.mode` takes two positional parameters
  (`material_library.dart:80350-80353`: `LazyParameter('Color', 'color', 0)`, `LazyParameter('BlendMode', 'blendMode', 1)`,
  run as `ColorFilter.mode(posArgs[0], posArgs[1])`). `CallExpr.klass` stores the keys as given
  (`packages/core/lib/src/interpreter/block_tree.dart:5757-5794`).
- Interpreter (board, Instant Play): string keys go to `namedArgs`, so `posArgs` stays empty and `posArgs[0]` is out of
  range (`packages/core/lib/src/interpreter/declaration_internal.dart:239-257`).
- Details: the **Color** and **Blend Mode** fields read slots 0 and 1 (`class_field.dart:100-105`), which are empty, so
  they don't show the gray. The same section lists the problem `NotEnoughPositionalArguments` ("2 positional arguments
  expected by ..., but 0 found", `block_tree.dart:5925-5951`, `packages/core/lib/src/interpreter/block_problems.dart:232-236`).
  The name lookup accepts `'color'` as a known parameter (`packages/core/lib/src/interpreter/block_utils.dart:216-219`,
  `declaration.dart:255`), so no "undefined parameter" problem appears.
- Code: `generateArgsSource` writes `color: ..., blendMode: ...` (`block_tree.dart:6262-6278`), which Dart rejects.
- The field editor's own **+** builds the filter correctly, with positional keys 0 and 1 (black, `srcIn`;
  `basic_fields.dart:1952-1969`).

The writer's possible workaround (remove the filter object and add it again with **+**) probably won't work.
`colorFilter` is required (`material_library.dart:86520`), and the remove button refuses with "ColorFilter is required
and can't be removed." unless the widget sits loose on the board (`class_field.dart:261-267`). I didn't run the app, so
the page only drops "It starts gray". To confirm live: add **Color Filter** to a Text on a screen, then check its section,
**Problems**, the board and **Run**. If it's confirmed, it belongs in `product-issues.md` and `known-issues.md`. The
writer already routed this.

## `docs/reference/shortcuts.md`

Bindings: `AdaptiveActivator` is <kbd>Ctrl</kbd> on Windows and Linux and <kbd>Cmd</kbd> on macOS
(`packages/core/lib/src/inputs.dart:22-25`).

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Five to learn first: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> opens the Library to add a widget, + <kbd>Z</kbd> undo, + <kbd>G</kbd> group, + <kbd>P</kbd> runs the app in the **Embedded preview**, + <kbd>.</kbd> Shortcuts sheet | ok | `packages/designer/lib/src/designer_setup.dart:20`, `:50-51`, `:106`; `packages/designer/lib/src/actions/add_actions.dart:13-25` (Library search in add mode; the widget picker only during a walkthrough); `packages/nowa_run/lib/src/actions/nowa_run_actions.dart:8-15`; `lib/setup_general_actions.dart:26`, `:34`; label `lib/project/run/run_button.dart:604` | Same keys on every OS apart from Ctrl/Cmd. |
| Undo per area: "undoing in Circuit doesn't touch your design on the board" | ok | follows from the verified per-area history sentence above it | |
| Nudge row: Stack explained in place | ok | `designer_setup.dart:26-49` | Wording only. |
| Restart key (<kbd>Shift</kbd> + <kbd>R</kbd>, all OS) applies the latest saved changes: **Hot Reload** (local, updates in place) / **Hot Restart** (cloud, starts again) | ok | `packages/nowa_run/lib/src/actions/actions_setup.dart:20`; `lib/project/top_bar_mapper.dart:187`; `packages/nowa_run/lib/src/nowa_run_manager.dart:80-84` ("Brings the preview in line with the just-saved code"); local `app.restart` with `fullRestart: false`, i.e. a hot reload (`packages/nowa_run/lib/src/services/local/daemon_protocol.dart:115-123`); https://docs.flutter.dev/tools/hot-reload | |
| Circuit "each step of your logic is a node"; regular expressions = search patterns | ok | `docs/logic/circuit.md` | Explanations only. |
| 3.13 exceptions: `/` dropped in **Details**; t, r, v, f in the **Variables** list | ok, link fixed | `docs/troubleshooting/known-issues.md:85-95` (verified in earlier phases); the bare `/` and V, R, T, F bindings `designer_setup.dart:16-19`, `:55` | The sentence promised "the workaround for each" but linked only `#slash-in-details`. Now it links both anchors (`#slash-in-details`, `#variables-list-rename`). |
| "If you used an older version": <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> now runs the app (add a widget with + <kbd>K</kbd>); + <kbd>G</kbd> only groups, ungroup from the right-click **Ungroup** | ok | `designer_setup.dart:20`, `:50-51`; `packages/designer/lib/src/actions/designer_actions.dart:46-56` (group only); `packages/designer/lib/src/menus/widget_context_menu.dart:40-42`; old page `_rewrite/old-docs/shortcuts.md:15`, `:24` | Framed as what readers may remember from older material, not as a 3.12 binding (3.12.5's real binding for the picker was already <kbd>K</kbd>; its sheet said <kbd>P</kbd>). |
| Removed lines | ok | diff | Rewordings only. No fact lost. |
| Headings and anchors | ok | script | All `origin/main` headings kept (`#code-editor` is linked from `docs/code/code-mode.md`), plus the new H2. 0 broken links. |

## `docs/reference/glossary.md`

Row counts: Nowa words 54 (46 on `origin/main`, plus 8), Building your app 19, Logic and data 10, Backend and services 30,
Testing and publishing 13, Code and Git 5 (77 new rows), Renamed or removed 12 (plus 1). Every new or rewritten row was
read against the page it links to and against the code or official docs below.

| Claim | Verdict | Source | Note |
|---|---|---|---|
| New Nowa words: **Api** panel (collections, test on the spot), Data Builder (widget and wrapper), **Embedded preview**, Instance, Integrations (Firebase, Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, Deep Links), Node (**Show snackbar**), Router (sidebar panel, first screen), Template | ok | `lib/project/side_bar.dart:76`; `wrappers_to_add.dart:86`; `lib/project/run/run_button.dart:604`; `docs/design/components.md:12`; `packages/core/lib/src/settings/project_settings.dart:33-40`, `packages/core/lib/src/settings/settings.dart:6`, `:118` (category header `Integrations`), `packages/data/lib/src/firebase/firebase_settings.dart:15`, `:29`, display names in `packages/core/lib/src/interpreter/packages/integrations/*_package_config.dart`; `packages/core/lib/src/state_management/global_state_suggestions.dart:65`; `docs/logic/router.md:14`; `docs/design/templates.md:8` | **Sample Settings** is also in that category, but only in debug builds (`packages/core/lib/src/plugin.dart:148-150`). |
| Rewritten Nowa words (Board, Circuit, Component, Event, Global state, Model with **New Model...**, Screen, Variable, Widget, Wrapper) | ok | `lib/project/panels/files_panel/add_lib_menu.dart:61`, `:79`; matching pages `docs/logic/*.md`, `docs/design/components.md` | No `fromJson` or "data class" left. |
| Unchanged Nowa labels spot-checked (22 labels, such as **Restore Checkpoint**, **Connect External Agent**, **On this device**, **Share preview**, **Search for a widget**, **Search boards**, **Your tickets**, **Deep Thinking**) | ok | grep of `lib`, `packages` (each label found) | |
| B04 routing: Constraints (**Left**, **Right**, **Left and right**, **Center**; **Top**, **Bottom**, **Top and bottom**, **Center**; Constrained Box sense), Group (Stack, Row or Column), Instance, Row/Column/Stack, Fixed/Auto/Expand | ok | `packages/designer/lib/src/details/positioned_details.dart:97-100`, `:148-151`; `group_details.dart:101-120`; `packages/core/lib/src/layout/layout.dart:388`, `size_fields.dart:154`; `docs/design/layout.md:12-46`, `:96-137`; B04 proposal `P14-B04-notes.md:236` | Merged faithfully. The additions (Constrained Box sense, the recipe example) are accurate. |
| Building your app: Asset, Container, Dart, Dialog/snackbar/bottom sheet, Flutter, Localization and RTL, Markdown and HTML (**Markdown**, **Html**), Material and Cupertino under **Built-in**, Overflow (**Overflow**, `ellipsis`), Padding and margin, Responsive, Route, Safe area, SVG/Lottie/Rive, Widget tree | ok | `docs/reference/widgets/index.md:25`, `:133-134`; `docs/design/library.md:26`; `widget_fields.dart:307-309` (**Text Direction**, **Overflow**); `flutter/bin/cache/pkg/sky_engine/lib/ui/text.dart:2061-2066` (ellipsis applies to the first overflowing line even without max lines); https://flutter.dev/ ("open-source framework for building ... multi-platform applications from a single codebase") | |
| Localization row: RTL languages "also mirror the layout" | fixed | `docs/design/localization.md:28`, `:39` | Now "also start their layout on the right". This matches the localization page and the Text Direction fix on `wrappers.md`. |
| Logic and data: Class (`@` mention), Expression, Function, JSON, null (**null**, **Set to null**), State, Types with **As List**, **refresh** / `notifyListeners`, **await** | ok | `docs/ai/context.md:42-50`, `docs/reference/shortcuts.md` chat table; `packages/core/lib/src/fields/block_field.dart:840`, `packages/core/lib/src/fields/reference_field.dart:22`; `packages/core/lib/src/fields/nowa_fields.dart:739`; `packages/code/lib/src/fields/future_options.dart:107`; `docs/logic/variables.md:87-91`; `docs/logic/global-state.md:40-42` | |
| Condition: "An **If** node" | fixed | `packages/code/lib/src/models/if_node.dart:34` (node title **If Statement**); `packages/code/lib/src/widgets/add_statement_menu.dart:70` (**Add If statement**) | The page promises bold = exact UI text. Now **If Statement**, linked to the dedicated section `logic/conditions.md#branch-with-if` (on this branch, in the sidebar). |
| Future and Stream link | fixed (precision) | `docs/logic/circuit.md:118` (`{#future-options}`) | Points at "Wait for a result", where **await** is explained. |
| Backend and services: Ad unit ID, API/REST API, keys and tokens (publishable keys safe in the app), Authentication, Backend, Cloud Firestore, CORS, cURL/Swagger/Postman/Xano, Database, Deep link, Edge Function, Endpoint/method/base URL (**GET**, **POST**, **PUT**, **PATCH**, **DELETE**), Entitlement and offering, In-app purchase and subscription, MCP, Migration, OAuth and client ID, Package/pub.dev/dependency (**Add Missing Dependencies**), Paywall (**RevenueCat Paywall**), Push notification (**Push Notifications (FCM)**), Query, Request/response/header, RLS, SDK, SQL, Storage bucket, Supabase (**Supabase** panel), Webhook | ok | `packages/data/lib/src/curl/curl_service.dart:61`; `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:47`; `revenuecat_package_config.dart:124`; `packages/data/lib/src/firebase/setup/views/notification_settings.dart:43`; `packages/data/lib/src/supabase/supabase_plugin.dart:24-26`; `packages/ai/lib/src/ui/mcp_connect_dialog.dart:7-35`; official docs read with curl on 2026-10-12: https://docs.stripe.com/keys, https://firebase.google.com/docs/firestore/data-model, https://www.revenuecat.com/docs/getting-started/entitlements, https://www.revenuecat.com/docs/offerings/overview ("the selection of products that are 'offered' to a user on your paywall"), https://modelcontextprotocol.io/docs/getting-started/intro, https://supabase.com/docs/guides/deployment/database-migrations, https://supabase.com/docs/guides/database/postgres/row-level-security, https://supabase.com/docs/guides/storage/buckets/fundamentals, https://supabase.com/docs/guides/functions, https://firebase.google.com/docs/cloud-messaging, https://docs.stripe.com/webhooks | Wording matches the REST API page (`docs/integrations/rest-api/index.md:18-22`, `:74`). |
| Firebase: "Google's backend service: sign-in, the Cloud Firestore database and push notifications" | fixed | `docs/integrations/index.md:14-18` | Read as if Firebase offered only these. Now "which Nowa uses for sign-in, ...". |
| pubspec.yaml | fixed (audience) | `packages/core/lib/src/interpreter/packages/package_service.dart:419`; `docs/test/problems.md:30` | Kept, because non-code pages show the **Problems** message "... is not in the pubspec" (R3). Added what that message means and that **Fix** adds the package. |
| Testing and publishing: APK/AAB/IPA, App Store Connect, Build, Bundle Identifier vs **Package Name**, Debug and release (**Debug mode**), Distribution certificate, Domain and DNS, Emulator and simulator, Google Play Console, Signing key, TestFlight | ok | `packages/core/lib/src/settings/project_detail_settings.dart:142`, `:210`; `packages/core/lib/src/settings/deployment_settings.dart:238`; `docs/publish/*.md`; `docs/test/devices.md`; https://developer.android.com/guide/app-bundle, https://developer.apple.com/app-store-connect/, https://developer.apple.com/testflight/ | |
| SHA-1 and SHA-256 location | fixed (precision) | `packages/core/lib/src/cloud_build_v2/ui/android_signing_key_card.dart:55`, `:162-170` (shown on the **Signing Key** card only when fingerprints exist) | Now "on the **Signing Key** card, on the **Android** tab of **Settings** → **Deployment**, once a key is saved". |
| Hot reload and hot restart | ok, completed | https://docs.flutter.dev/tools/hot-reload ("stateful hot reload preserves the state of your app"); `lib/project/top_bar_mapper.dart:187` | Added which projects show which button, matching `shortcuts.md` and `docs/test/run.md`. |
| Code and Git: commit/push/pull/branch, Git and repository, GitHub and access token (legacy), VS Code, Xcode and Android Studio | ok | `docs/code/git.md:9-23`; `docs/code/github.md:16`, `:82`; `docs/code/vs-code.md`; `docs/test/devices.md` (What your computer needs) | The two Git rows now link `#git-in-a-minute`, which defines the same words. |
| Renamed: widget picker row (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> now runs the app), Move Up/Down/To Top/To Bottom pairs, old wrapper names | ok | 3.12.5 `b84bfdafd:packages/designer/lib/src/menus/widget_context_menu.dart:78-91` vs 3.13 `widget_context_menu.dart:45-48` (same `ReorderIntent` arguments per pair); `_rewrite/old-docs/ui/wrappers/wrappers-list.md:14`, `:20`, `:32`; `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:44` (**Add a widget**) | |
| Front matter | fixed | coordinator report | Bare `null` keyword quoted (see the top of this log). |
| Removed lines | ok | diff | Only rewordings of the old intro and of the rows listed above. No fact lost. Nothing links to glossary anchors, so the new H2s change no inbound URL. |
| Links, structure | ok | script | 0 broken links; no H1, `---`, emoji, admonitions or hype words. |

## `docs/reference/index.md`

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro (look-up shelf), table rows (catalog "in the Library", wrappers' settings, five shortcuts to learn first, glossary sections), guide list with the media page's current title | ok | `docs/reference/widgets/index.md` description; titles of `widgets/{lists,forms,navigation,media}.md`; the batch's own pages | No new product facts. Links resolve. No H1, rules or admonitions. |

## Coverage spot checks

- **Obsolete rows (3 of 3 checked):** <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> opens the widget picker. Confirmed
  gone: `designer_setup.dart:50` → `RunAppAction` (`:106`). The change is explained on `shortcuts.md`. Interactive Viewer
  rotation: confirmed unsupported (`flutter/packages/flutter/lib/src/widgets/interactive_viewer.dart:510-513`,
  `_rotateEnabled = false`). Form validating checkboxes and buttons: confirmed. The Form section lists validators only
  for Text Field, Dropdown menu and Pin Code Field (`packages/core/lib/src/fields/form_fields.dart:13-23`).
- **Covered rows (11 sampled, all confirmed):** Undo and Redo (`shortcuts.md:44-45`); zoom with Ctrl/Cmd + scroll or
  pinch (`:112`); Alt/Option-drag copy (`:122`); Bring forward Ctrl/Cmd + ] (`:92`); Clip radius, Fractionally Sized Box
  (plus the glossary rename row), Safe Area, Text Direction (`wrappers.md`); Visibility (`logic/expressions.md:99-104`);
  the reorder-Padding tip (`design/properties.md` "Add a wrapper", `wrappers.md#reorder-wrappers`).
- **Not added (Color Filter grayscale):** agreed. It depends on the wrapper's starting filter, which the code shows as
  mismatched (finding above).
- **For-code file "None":** agreed. A scan of the four pages finds no file paths, generated names, Dart internals or
  build files outside front matter keywords.

## Open issues

1. **Color Filter wrapper (product, needs a live check).** The code shows the starting filter's values under names that
   `ColorFilter.mode` doesn't take by name. Expected: an error on the board, empty **Color** and **Blend Mode** with a
   "2 positional arguments expected" problem in the section, and generated code Dart rejects. I couldn't run the app,
   so the page stays neutral and I state no bug. If it's confirmed: list it in `product-issues.md` and `known-issues.md`.
   A workaround still needs testing: removing the filter object is refused for a widget inside a screen (the filter is
   required), so try the constructor menu on the filter's **...** (`class_field.dart:190-205`, `:290-314`) or ask Nowa AI
   in **Agent** mode to fix the filter.
2. **Visible off on the board (not verifiable here).** How a hidden widget looks on the board wasn't checked live. The
   page makes no claim about it.
3. **Length (no action).** Reference pages over the style guide's length, accepted by the brief. Split options are in the
   writer's notes if the orchestrator wants them.
