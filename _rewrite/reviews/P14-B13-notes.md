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

