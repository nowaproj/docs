# P14-B13 notes: widget reference (index, forms, lists, navigation, media)

Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). "Flutter SDK" = framework source at
`/home/user/flutter/packages/flutter/lib/src/` (3.44.8 stable); its doc comments are what api.flutter.dev shows (that site
doesn't resolve from this sandbox, so the source is cited). Package docs come from the pub cache
(`/root/.pub-cache/hosted/pub.dev/<package>/`), at the version Nowa adds. Details labels follow the parameter-name rule
(`packages/core/lib/src/utils.dart:77-79`, `capitalize()` then a space before each capital after a lowercase letter) unless a
custom editor names them; a widget without a custom editor lists every constructor parameter that has an editor
(`packages/core/lib/src/fields/class_field.dart:100-140`, `packages/core/lib/src/fields/block_field.dart:651-655`).

R9 (tone) was applied to every page: intros say what the widget is for with an everyday example, steps carry a short why or
result, and reassurance only where true.

## media.md

Changed for the reader:
- Intro rewritten (R9) with app examples; "package" explained in one clause (R4).
- Table column "Needs a package": package names replaced by Yes / No (R2; names moved to for-code `#packages`). Html says
  "Yes, and you add it yourself", and its section keeps `flutter_html` because **Problems** names it (R3).
- Package paragraph shortened (it duplicated `design/add-widgets.md`): Enter/**Insert** → **Add Missing Dependencies** →
  **Add**; a drag doesn't ask, **Hot Fix** in **Details** adds it. Same facts as before.
- Image **Asset**: "Nowa saves it in `assets/`" → "Nowa adds it to your project's assets" (R2; moved to `#assets`).
- Short "use it for" intros on Image, SVG, Video Player, YouTube Player, Lottie, Rive, Web View, Html, Markdown (R9).

Added (from old docs, verified):
- Image **Network**: the box is **Url** and must open the image itself (`packages/core/lib/src/fields/basic_fields.dart:915`;
  old `image.md`).
- Assets ship inside the app, so they show offline (old `widgets-ref.md` "online or offline"; bundled assets).
- **Color** alone makes the picture a flat shape in that color; pick a **Blendmode** such as `multiply` or `darken` to tint a
  photo. Image's default blend mode is srcIn: Flutter SDK `widgets/image.dart:962-970`, `rendering/image.dart:153`. Labels
  `packages/designer/lib/src/details/widget_fields.dart:41-42`; enum values are shown by name (`basic_fields.dart:1511-1548`).
- **Error Builder** example (gray box or icon): label `widget_fields.dart:44`.
- New section "Use a picture as a background {#background-image}" (old `container.md`): Container **Image** + **+**
  (`basic_fields.dart:315`; `BFDecorationImage` at `basic_fields.dart:727-741` creates the image settings with **Fit** `cover`, line 736); the inner
  **Image** row is the Network/Asset/Bytes editor (`basic_fields.dart:888-955`, its own **+** makes a sample web photo); the
  **Color** row hides while a picture is set (`basic_fields.dart:331-336`). Step 3 is worded to hold whether or not the inner
  row starts empty (not checked live; see open questions).
- New section "Choose how a picture fits its box {#fit}" (old `container.md`, `image.md`): the seven values as the dropdown
  shows them (`packages/core/lib/src/interpreter/libraries/material_library.dart:82187-82197`), meanings from Flutter SDK
  `painting/box_fit.dart:23-78`; Image's empty Fit = scaleDown (Flutter SDK `painting/decoration_image.dart:561`). Fit exists on
  Image (`widget_fields.dart:43`), the Container picture (`basic_fields.dart:738`), SVG (`widget_fields.dart:191`)
  and Lottie (`widget_fields.dart:90`). Not on Rive in 3.13 (old `rive.md` "fit" is obsolete: `widget_fields.dart:97-125`).
- Video Player: **Url** label (`basic_fields.dart:983`); a page link (like YouTube) won't play, use the YouTube Player (old
  `video-player.md`: the URL must point straight at the file); prefer **Network** for long videos (old caution); keep Auto Play or
  the controls on (old note). "from the desktop app" added to the run sentence: test/devices.md carries the desktop badge.
- YouTube Player: full flag list and player settings (old `youtube-player.md`), labels from Nowa's library
  (`packages/core/lib/src/interpreter/libraries/youtube_library.dart:138-165` player, `:303-322` flags) with the default
  editor; defaults are the ones Nowa declares there (captions on, `en`; 16:9; 3 seconds; Live UIColor red). Meanings from the
  package docs, `youtube_player_flutter-9.1.3/lib/src/utils/youtube_player_flags.dart:7-80` and
  `lib/src/player/youtube_player.dart:60-150` (Nowa adds `^9.1.3`: `packages/core/lib/src/interpreter/packages/dart_package.dart:142-146`).
  "Paste the ID only": the package passes the value straight to the player as a video ID
  (`youtube_player_flutter-9.1.3/lib/src/player/raw_youtube_player.dart:263`), so the old "or the full link" is obsolete.
  **Use Hybrid Composition** left out (technical; coverage says why).
- Lottie: "vector animations, so they stay sharp" (code description `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:559-560`).
- Rive: one file can hold several artboards with their own animations (`basic_fields.dart:1346-1350` reads artboards and
  their animations); "Error loading Rive file" when the file can't be read (`basic_fields.dart:1343-1344`).
- Html: what HTML is (R4), use case; **Shrink Wrap** is on at first (`widgets_to_add.dart:897`) and makes it only as wide as its
  content (`flutter_html-3.0.0/lib/flutter_html.dart:40-41`; was "as big as"). No-code fix for the missing package (R5):
  **Problems** shows `'flutter_html' is imported but is not in the pubspec.` with **Fix**
  (`packages/core/lib/src/interpreter/packages/package_service.dart:410-421`, button label
  `packages/core/lib/src/panels/errors_panel.dart:192`); the live check saw the import and the error count go from 0 to 1
  (`reviews/P12-live-checks-2.md:64`). The **Packages** page stays as the second way.
- Markdown: what Markdown is (R4); **Shrink Wrap** (old `markdown.md`): on at first, only as tall as its text
  (`packages/nowa_runtime/lib/src/widgets/markdown.dart:6,15`, a `markdown_widget` list; label `widget_fields.dart:424`).

Length: body ~2,500 words by `wc` (two long image alt texts and many link URLs count). If it must shrink, split into
"Images and animations" (Image, background, Fit, SVG, Lottie, Rive) and "Video and web content" (Video Player, YouTube Player,
Web View, Html, Markdown, board stand-ins), keeping every `{#id}` on whichever page takes the section.

Open questions:
- Container background, live: after **+** on **Image**, is the inner **Image** row empty (needs its own **+**) or filled? Code
  says the outer **+** creates only the Fit (`basic_fields.dart` BFDecorationImage `classGen`), so probably empty. The step
  covers both.

## lists.md

Changed for the reader:
- Intro (R9) with everyday examples; mentions List Tile and Expansion Tile, now on this page.
- Swipeable Stack: `flutter_card_swiper` package name moved (R2, `#packages`); use cases added (R9); `swipe`, `undo` and
  `moveTo` explained (R3) from the package docs (`flutter_card_swiper-7.2.0/lib/src/controller/card_swiper_controller.dart:13-26`;
  Nowa's library `packages/core/lib/src/interpreter/libraries/flutter_card_swiper_library.dart:305-326`).
- "Max" row: "so a tablet shows more columns than a phone" (R9 why): the max-extent grid fits as many columns as the width allows
  (same fact the row already stated).

Added (from old docs, verified):
- Builder only builds the items on screen (old `listview.md`): Flutter SDK `widgets/scroll_view.dart:1354-1356`. Normal works like a
  scrolling column (old `listview.md`).
- Item Count gives way to the list's length once connected (old `listview.md`; `packages/core/lib/src/fields/list_view_field.dart:36,156`).
- Separator: **Spacing** starts at 20 (`list_view_field.dart:272`, label `:203`); **Widget** adds a gray Divider, thickness 1
  (`list_view_field.dart:266-271`); restyle it via the brush (tooltip "Edit ...", `packages/core/lib/src/fields/nowa_fields.dart:466-480`)
  next to **Separator** (`list_view_field.dart:244-248`, `basic_fields.dart:449-520`); Divider labels **Color**, **Thickness**, **Indent**
  (`packages/core/lib/src/interpreter/libraries/material_library.dart:14105+`, default editor).
- New section "Change how a list scrolls {#scroll-settings}" (old `listview.md` Padding; the screenshot already showed these rows):
  fields `list_view_field.dart:122-126`, `packages/core/lib/src/fields/grid_view_field.dart:25-29`; Physics choices
  `list_view_field.dart:362-368` (shown by class name); meanings: Flutter SDK `widgets/scroll_physics.dart:648-660` (bouncing, iOS),
  `:818-822` (clamping, Android), `:925-928` (always scrollable), `:964` (never scrollable), `widgets/page_view.dart:560-563` (page
  snapping); Reverse, Shrink Wrap and Padding are the standard scroll-view meanings; **Individual padding** as on
  design/properties.md.
- "Design the item first, connect at the end" (old `listview.md`): connecting keeps the item (`list_view_field.dart:144-157`).
- New section "Example: a grid of plants {#example}" (old `gridview.md` plant cards and `listview.md` books): built only from
  documented steps (logic/models.md create a model and Use a model as a type, logic/parameters.md, lists' own steps). The param label
  reads **Plant** because labels are the param name split into words (`packages/core/lib/src/fields/block_field.dart:205-218`).
- Linking **Children** to a list switches to Builder and connects it (old `gridview.md` note): `list_view_field.dart:19-40,103`,
  `grid_view_field.dart:41,130`; a non-widget list is accepted on a widget-list field (`packages/core/lib/src/fields/field_link_menu.dart:139-148`).
- New section "Build rows with List Tile {#list-tile}" (old `listtile.md`): parameters `material_library.dart:55917+` (default editor,
  derived labels); Title starts "Tile" (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:819`); meanings: Flutter SDK
  `material/list_tile.dart:478-484` (Is Three Line), `:494-502` (Dense), `:537` (Selected Color), `:621` (Content Padding), `:626-633`
  (Enabled), `:660-670` (Selected), `:702` (Selected Tile Color), `:724-740` (gaps and minimums). Left out: On Focus Change, Focus/Hover/Splash
  Color, Autofocus, Enable Feedback (coverage).
- New section "Show more on tap with Expansion Tile {#expansion-tile}" (old `expansion-tile.md`): editor order and the advanced list
  `basic_fields.dart` `BFExpansionTile`; Children starts with one placeholder (`widgets_to_add.dart:837`); meanings: Flutter SDK
  `material/expansion_tile.dart:180-184` (`value` true/false), `:217-220` (Trailing replaces the arrow), `:223` (Show Trailing Icon),
  `:234-238` (Maintain State, corrected from the old "when navigating away"), `:254` (Tile Padding), `:305` (Children Padding), `:399`
  (Control Affinity), `:452` (Enabled). **Initially Expanded** is at the top in 3.13, not under advanced.

Length: body ~2,250 words by `wc`. If it must shrink, move "Build rows with List Tile" and "Show more on tap with Expansion Tile"
to a "List rows" page (anchors `#list-tile`, `#expansion-tile` go with them; the catalog links would follow).

Open questions:
- Not checked live: the brush next to **Separator** selects the Divider (code: `nowa_fields.dart:458-472` shows it whenever the
  separator has a drawn instance).

## forms.md

Changed for the reader:
- Intro (R9) with form examples; the page now also covers checkboxes, switches, sliders and popup menus (description and keywords
  updated).
- Controller explained in plain words (R4): it holds what the user typed so the screen and logic can read it.
- Small whys and results (R9): **Keyboard Type** gives the right keys, **Max Lines** for a review, validators show the message
  "so people can fix it", **Form** for a Sign up tap, the True branch example, **On Completed** saves a Verify button. No new claims.
- `formKey` and `validate` explained (R3): "lets your logic reach the form"; "checks every field and answers true when they all
  pass" (same fact as before).
- Pin Code Field: `pin_code_fields` moved to for-code `#packages` (R2).
- Min/Max length workaround (R5): moved into its own H3 "Length rules in Nowa 3.13" and led with the no-code path: ask Nowa AI in
  **Agent** mode, then check in **Play**; the code-mode step is kept, labelled "If you edit code yourself". Facts unchanged (product
  issue P47, still in 3.13: `packages/core/lib/src/fields/form_validator.dart:213,246` write `<` / `>`, `:315-329` read back only
  `>=` / `<=`).
- **Regex** explained (R4) as a pattern (a regular expression); "Nowa AI can write the pattern for you". The rule fails when the
  text has no match (`form_validator.dart:146-151`, `!RegExp(...).hasMatch(value)`); no syntax given.
- Older Text Field / dropdown: says the old widgets "can't use validators" (the warning text itself says so: `packages/core/lib/src/fields/form_fields.dart:112`).

Added (from old docs, verified):
- New section "Use checkboxes, switches and sliders {#checkbox-switch-slider}" with a settings table (old `checkbox.md`; old `slider.md`
  was a stub): Checkbox parameters `packages/core/lib/src/interpreter/libraries/material_library.dart:9016-9041` (default editor);
  starts checked (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:621`); Tristate dash and tap cycle Flutter SDK
  `material/checkbox.dart:254-263`; Is Error `checkbox.dart:385-392`. Switch parameters `material_library.dart:67122+`, starts on
  (`widgets_to_add.dart:642`), colors Flutter SDK `material/switch.dart:252-282`. Slider is Nowa's own (`packages/nowa_runtime/lib/src/widgets/slider.dart:4-18`:
  Min 0, Max 1, Slider Height, Thumb Radius, Overlay Radius, Label, Divisions, colors; library `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:516+`),
  starts at 0.5 (`widgets_to_add.dart:721`); Label shows only with Divisions, while dragging: Flutter SDK `material/slider.dart:402-428`,
  `material/slider_theme.dart:576-578`. `$` in a text field inserts a variable (design/properties.md). Left out: Splash Radius, Autofocus,
  Stroke-style details (coverage).
- New section "Add a popup menu {#popup-menu-button}" (catalog row only before): starts as the text "Popup Menu" with "Item 1"
  (`widgets_to_add.dart:659-682`); parameters `packages/core/lib/src/interpreter/libraries/material_library_custom.dart:1322+`; Item Builder is
  a function field with **Edit** that opens Circuit (`packages/core/lib/src/fields/basic_fields.dart:533-559`); On Selected / On Opened /
  On Canceled meanings Flutter SDK `material/popup_menu.dart:1366-1381`; Color and Shape style the menu (`popup_menu.dart:1473,1481`); Child and
  Icon can't both be set (`popup_menu.dart:1361`), so the page points at **Child** for the button's look, not **Icon**. The AI prompt is the
  no-code path for changing items (R5).

## navigation.md

Changed for the reader:
- Intro (R9): what the standard frame of an app is, before the four slots.
- "lets Flutter add a back arrow or a menu button" → "lets your app add the start button for you when **Leading** is empty: a
  menu button when the screen has a drawer, or a back arrow when there's a screen to go back to" (R1, R4). Flutter SDK
  `material/app_bar.dart:255-260`.
- "Flutter shows an error when they differ" → "your app shows an error"; plus "Nowa doesn't keep them in step for you" (no custom
  TabView editor: `DefaultTabController` isn't in `packages/core/lib/src/fields/block_field.dart:26-85` or
  `packages/designer/lib/src/designer_plugin.dart:45-72`).
- Page View package paragraph (R2, R5): dropped "which `nowa_runtime` no longer includes" (moved to `#packages`); the Problems
  message stays (R3) with a plain explanation, and the no-code fixes come first: **Fix** in **Problems**
  (`packages/core/lib/src/interpreter/packages/package_service.dart:410-421`, label `packages/core/lib/src/panels/errors_panel.dart:192`)
  or **Hot Fix** in **Details** (already on the page). Migration link kept: it's a dialog the reader sees.
- Short "what it's for" lines (R9) on the drawer, floating button (old `widgets-ref.md`: "highlighting a main app action"),
  bottom navigation bar (old: "switch between primary app areas"), Page View, TabView and Cross Fade; "stays put while the content
  scrolls" for slot parts (they sit outside the body); **refresh** explained once; Duration = how long the fade takes.
- "To show a different page for each tab" now points at the Indexed Stack section, then the navigation alternative (same facts).

Added (from old docs, verified):
- Indexed Stack keeps each hidden page's state (old `widgets-ref.md`: "keeps the states of other children unchanged"): Flutter SDK
  `widgets/basic.dart:4815-4826` (one child shown; the example keeps each card's state).
- Drawer rows link to the new List Tile section on lists.md.

## index.md (catalog)

All 45 `<Anchor id>` tags and `{#find-a-widget-in-the-picker}` are unchanged (diffed before/after); no existing link was removed or
changed. New links point to the new sections on the category pages.

Changed for the reader:
- Intro (R9). "Find a widget" second bullet now says the tables use the Library's groups (the old "not in the order of the tables
  below ... follow the same ones" read as a contradiction); same fact: groups from `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:96-107`.
- "package" explained in one clause (R4). Package names in the rows replaced by "Needs a package" (R2; moved to `#packages`,
  `#admob`, `#google-maps`, `#revenuecat`). The nine-widget sentence stays (the dialog lists them). New sentence: Html and the
  Page View dots need a package too, without a prompt (consistent with media.md and navigation.md; Html declares no dependency, the
  dots' package left `nowa_runtime`: see those pages' notes).
- Integration rows: "**Settings** → **Integrations**" → "**Settings** (**AdMob** / **Google Maps** / **RevenueCat**, under
  **Integrations**)", matching the integration pages (Integrations is a group in the Settings list, the page is the integration).
  API keys explained (R4).
- "Use it for" examples (R9; old `widgets-ref.md`): Container (cards, banners, a background behind an icon: old `container.md`),
  Button (Save, Sign in, Add to cart: old "sending emails, sharing documents, liking content"), Icon Button, Floating Button
  (main action: old), Wrap (tags), AnimatedContainer, Circular Progress Indicator (loading, form sent: old), Checkbox, Switch,
  Expansion Tile (FAQ), Alert Dialog (confirm an action, important information: old), Admob (earn money: old), Html (blog article:
  old "rich text or web content without a browser").

Added (from old docs, verified):
- "Container settings" table (old `container.md`): editor `packages/designer/lib/src/details/widget_fields.dart:317-350` and
  `packages/core/lib/src/fields/basic_fields.dart:291-321` (Color with gradients `:323-378` and `color_fields.dart:377-380`, hidden while an image is set `:331-336`;
  **Border** `:307`, created as black, width 1 at `:571-575`; **Radius** `:309-313` with the per-corner button and **TL**/**TR**/**BL**/**BR**
  in `BFBorderRadius`; **Image** `:315`; **Shadows** `:317`); Alignment, Padding, Margin `widget_fields.dart:334-336`. Gradient names: `packages/core/lib/src/fields/color_fields.dart:377-380` (**Solid**, **Linear**, **Radial**, **Sweep**).
- "Text settings" table (old `text.md`): fields `widget_fields.dart:261-315`; Auto size for a new text from the Text tool
  (`packages/designer/lib/src/widgets/designer_tools.dart:93-94`) and the Library (`widgets_to_add.dart:156-167`), Auto for a null
  size (`packages/designer/lib/src/details/layout_details.dart:116-122`); drawing a size with a drag (design/add-widgets.md; resize during
  placement `packages/designer/lib/src/design_experience/place_board.dart:100-113`); **Text Align** four buttons
  (`packages/core/lib/src/fields/text_fields.dart:336-363`); **Overflow** values `packages/core/lib/src/interpreter/libraries/material_library.dart:85218-85225`
  shown by name with **Default** (`basic_fields.dart:1540-1545`); meanings are Flutter's `TextOverflow` values; **Style** and CopyWith /
  Modify Style as design/theme-styles.md states them. Double-click to edit: design/select-and-edit.md.
- Icon: **Semantic Label** under **Show advanced options** (`packages/core/lib/src/fields/button_fields.dart:49-61`).
- Button: **On Hover** meaning (Flutter SDK `material/button_style_button.dart:118-122`).
- Progress indicators (old `loading-circular.md`, `linear-progress-indicator.md`): parameters `material_library.dart:61083+` and
  `:61150+` (default editor, derived labels; old "Minimum Height" is **Min Height**, old "Radius" is **Border Radius**); meanings Flutter
  SDK `material/progress_indicator.dart:109-130` (semantics), `:453` (Min Height), `:461` (Border Radius), `:927` (Background Color =
  the track), `:936` (Stroke Width). 0.4 = 40%: old linear page example.
- Indexed Stack: hidden children keep their state (see navigation.md).
- Rows link to the new sections: forms#checkbox-switch-slider, forms#popup-menu-button, lists#list-tile, lists#expansion-tile,
  media#fit, media#background-image, media#html.

Length: body ~2,650 words by `wc`, but about a fifth of that is table markup (45 `<Anchor id="..." />` tags, link targets). If it
must shrink, move the "Container settings" and "Text settings" tables (and the progress-indicator details) to a new category page
such as "Basic widgets" (`reference/widgets/basics.md`) and link to it from the rows. The catalog rows and their anchors must stay
on index.md, since the app links to `/reference/widgets#<id>` (D13).

## For other pages

1. **`design/fonts-icons.md`** (B05), "Choose an icon", after the sentence listing the advanced options. Proposed: "Fill, weight,
   grade and optical size only change icon fonts that support them. The Material icons in the picker don't, so these four have no
   visible effect. **Text Direction** matters for icons that point somewhere, such as a back arrow, which flips in a right-to-left
   language." Evidence: Flutter SDK `widgets/icon.dart:113-127` (fill needs the font's FILL axis "otherwise has no effect"; weight,
   grade and optical size are documented the same way), `:227-239` (direction-aware icons); the picker offers `MaterialIcons` only
   (`packages/core/lib/src/fields/icon_field.dart:128`), and `MaterialIcons-Regular.otf` (Flutter's bundled font,
   `/home/user/flutter/bin/cache/artifacts/material_fonts/`) has no `fvar` table, so no variable axes. Source: old `icon.md`, which
   described these four as if they always worked.
2. **`design/properties.md`** (B04), "Edit a value", row "A choice". It says "When the property may be empty, such as **Text Align**
   on a **Text**, the list starts with **Default**." **Text Align** is four toggle buttons with no **Default**
   (`packages/core/lib/src/fields/text_fields.dart:336-363`; registered for every `TextAlign` at
   `packages/core/lib/src/fields/block_field.dart:52`, and used by the Text editor at
   `packages/designer/lib/src/details/widget_fields.dart:307`). Proposed: "When the property may be empty, such as **Overflow** on a
   **Text**, the list starts with **Default**." (`TextOverflow?` goes through `BFEnum`, which adds **Default** for nullable enums:
   `packages/core/lib/src/fields/basic_fields.dart:1540-1545`; field `widget_fields.dart:309`.)
3. **`logic/events.md`** (B06), Button events. Optional: "**On Hover** runs when a mouse pointer moves onto the button (`value` is
   true) or off it (`value` is false), so it matters on the web and desktop." Evidence: Flutter SDK
   `material/button_style_button.dart:118-122`; parameter `void Function(bool value)? onHover`
   (`packages/core/lib/src/interpreter/libraries/material_library.dart:14903+`). The catalog's Button row now says it briefly.
4. **`reference/wrappers.md`** (B14), Container row. Optional, from old `container.md` (which said a Container wrapper can put a
   color or gradient "on top of" an image): "Its fill sits behind the widget it wraps, so it doesn't tint a picture. To tint one, use
   the Image's **Color** and **Blendmode** (see [Add an image](./widgets/media.md#image))." Evidence: Flutter SDK
   `widgets/container.dart:334` ("The decoration to paint behind the [child]"); Nowa's Container editor doesn't list Foreground
   Decoration unless it already has a value (`packages/designer/lib/src/details/widget_fields.dart:317-350`).

## Summary

- Pages changed: all five (`index`, `forms`, `lists`, `navigation`, `media`), R1-R9 applied; every old `{#id}`, `<Anchor id>`, image
  and link kept (checked against `9f21e4c`, the PR #18 version); new IDs: forms `#checkbox-switch-slider`, `#popup-menu-button`;
  lists `#scroll-settings`, `#example`, `#list-tile`, `#expansion-tile`; media `#background-image`, `#fit`.
- Coverage: 235 old-doc items; 78 added, 131 already covered, 8 obsolete, 16 not useful, 1 dev-only, 1 for another page.
- Moved to the code section: 18 facts from the pages (package names in 16 places, the `assets/` path, `nowa_runtime`), plus 1
  dev-only fact from the old YouTube page.
- Lengths by `wc` (body, with alt texts and link targets): index ~2,650, media ~2,500, lists ~2,250, forms ~2,030, navigation
  ~1,950. Split proposals for the first three are in their sections above.

## Open questions (all pages)

1. Container background picture (media.md step 3): is the inner **Image** row empty after the first **+**? The step covers both.
2. The brush next to the List View **Separator** selects the Divider (lists.md step 5): code says yes; not tried live.
3. Html: the live check (P12) saw the error count go to 1 after adding Html; the exact Problems text and its **Fix** button come from
   code (`package_service.dart:410-421`), not a screenshot.

