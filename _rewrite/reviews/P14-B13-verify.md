# P14-B13 verify: widget reference (index, forms, lists, navigation, media)

Verifier: P14-B13-V. Source of truth: `/home/user/nowa-master` (3.13.0, `3cb32031c`); paths below are relative to it.
Flutter behavior: SDK source `/home/user/flutter/packages/flutter/lib/src/` (3.44.8 stable), whose doc comments are what
api.flutter.dev shows. Package docs: pub cache `/root/.pub-cache/hosted/pub.dev/<package>/`. Details labels: parameter name
through `camelCaseToSpaces()` (`packages/core/lib/src/utils.dart:77-79`, used by `packages/core/lib/src/fields/block_field.dart:212-218`)
unless an editor passes `label:`.

## Anchors and links

- Explicit anchors (`{#id}`, `<Anchor id>`) on `origin/main` vs now: index 46/46, forms 5 (+2 new), lists 4 (+4 new),
  navigation 9/9, media 9 (+2 new). None lost.
- Auto heading IDs: one lost, forms `#use-checkboxes-switches-and-sliders` (the heading got the new explicit ID
  `{#checkbox-switch-slider}`). No page, `src/` file or app string links to it, but it was live on `origin/main`, so I kept it
  alive with an `<Anchor id="use-checkboxes-switches-and-sliders" />` at the start of that section (global component,
  `src/theme/MDXComponents.js`).
- Every relative link and anchor on the five pages resolves (script check of files, explicit IDs, `<Anchor>` and heading slugs).

## Summary

- Pages checked: 5 (`reference/widgets/` `index`, `forms`, `lists`, `navigation`, `media`), all `+` and `-` lines of
  `git diff origin/main`, plus an audience read of every page.
- Claims checked: about 240 (every new label against its Details editor or Nowa's library declaration, every behavior against
  the Flutter SDK or the package source).
- Fixed: 13. Removed: 1 (a claim the code contradicts). Facts restored: 2. Facts added from code: 2. Audience fixes (R3-R5,
  R8): 8. Routed item applied: 1 (from B07). Anchor kept alive: 1.
- Most serious: Container background picture steps had the inner **Image** **+** after "set the picture" (the outer **+** only
  creates the Fit, so the tabs don't exist yet); lists.md promised the "lost widgets" question when linking **Children** to a
  list, which the code never shows; the Container **Radius** row skipped the **+** that creates it; media.md had dropped
  "**Problems** lists the missing package" for dragged widgets.
- For-code file: checked, each bullet matches the `origin/main` text; I moved nothing new, so it's unchanged.
- Lengths after verify (body words by `wc`, tables, link targets and alt text included): index 2,689, media 2,575, lists 2,287,
  forms 2,049, navigation 1,959. The small growth is restored or corrected facts; I found little true repetition to cut (one
  clause in media Html reworded). No split, as instructed.

## index.md

| claim | verdict | source | note |
|---|---|---|---|
| Container settings: **Color** row offers **Linear**, **Radial**, **Sweep**; hides while a picture is set | ok | `packages/core/lib/src/fields/basic_fields.dart:291-321` (BFBoxDecoration), `:325-336` (returns nothing while `image` is set), `packages/core/lib/src/fields/color_fields.dart:377-380` (Solid/Linear/Radial/Sweep) | |
| **Border**: hover + **+**, starts black and 1 wide, **Color** and **Width** | ok | `basic_fields.dart:562-584` (classGen `Border.all(color: black, width: 1.0)`), `packages/core/lib/src/fields/class_field.dart:46-48,180-195` (empty class field = header with **+** on hover) | |
| **Radius**: rounds corners; per-corner button with **TL**/**TR**/**BL**/**BR** | fixed | `basic_fields.dart:606-707` | A new Container has no radius (`packages/core/lib/src/widgets_to_add/default_blocks.dart:8-13`), so the row is an empty class field: added "Hover the row, click **+** and type a number" (same as `design/properties.md` "A set of settings, such as **Border** or **Radius**"). |
| **Image** links to the background section; **Shadows** label, add and stack | ok | `basic_fields.dart:315,317`; `packages/core/lib/src/fields/list_field.dart:80-95,170-178` | The empty list shows **+** without hover; "hover and click" still works. Not changed. |
| **Alignment**, **Padding**, **Margin** | ok | `packages/designer/lib/src/details/widget_fields.dart:334-336` | |
| Text: new text is **Auto**; drag while placing to draw a size | ok | `packages/designer/lib/src/widgets/designer_tools.dart:93-94`, `widgets_to_add.dart:156-162` (width/height null), `packages/designer/lib/src/details/layout_details.dart:112-125` + `size_fields.dart:150` ("Auto"), `packages/designer/lib/src/design_experience/place_board.dart:100-113` | |
| **Text Align** four buttons; **Overflow** values and **Default**; **Style** + **CopyWith** / **Modify Style** | ok | `packages/core/lib/src/fields/text_fields.dart:336-363`, `material_library.dart:85218-85225`, `basic_fields.dart:1540-1545`, `text_fields.dart:173-196` | Flutter `TextOverflow` meanings; `painting/text_painter.dart:928-943` (ellipsis "…"). Matches `design/theme-styles.md#use-a-theme-text-style`. |
| Icon **Semantic Label** under **Show advanced options** | ok | `packages/core/lib/src/fields/button_fields.dart:49-61`; link text `packages/core/lib/src/fields/block_field.dart:1331,1354` | |
| Button: label is a Text inside; **On Hover** onto/off, web and desktop; Icon Button same events | ok | `button_fields.dart:141-162` (ButtonActions: **Enabled**, **On Pressed**, **On Long Press**, **On Hover**); Flutter `material/button_style_button.dart:118-122` | |
| Progress indicators: **Value** 0-1 (0.4 = 40%), **Color**, **Background Color** (track), **Stroke Width**, **Semantics Label**/**Value**, **Min Height**, **Border Radius** | ok | `material_library.dart:61083-61105`, `:61178-61193`; Flutter `material/progress_indicator.dart:109-129,452-467,927-936` | |
| Page View dots need a package | fixed | `packages/core/lib/src/interpreter/packages/package_service.dart:410-421` (**Fix** adds it), `packages/core/lib/src/fields/expression_builder/expression_dependencies.dart:41-62` (**Hot Fix**) | "a package that Nowa doesn't add for you" read as manual work; now "a package, which you add with one click". |
| Html row: package | fixed | same `package_service.dart:410-421` | "that you add yourself" → "which you add with one click". |
| Alert Dialog: reuse your own design as a component | added (routed from B07) | `basic_fields.dart:449-488` (Builder row: **Pick Widget**, **Edit in circuit**); anchor `logic/popups.md` "### Use your own design" → `#use-your-own-design` | Also explained `showDialog` in plain words ("the logic step that opens a dialog"). |
| Integration rows: **Settings** (**AdMob** / **Google Maps** / **RevenueCat**, under **Integrations**) | ok | `packages/core/lib/src/settings/settings.dart:6,110-118` (category header "Integrations"), `packages/core/lib/src/interpreter/packages/package_config/package_config_settings.dart:30`, display names in `.../integrations/*_package_config.dart:15` | |
| "Tables use the same groups" as the Library | ok | `widgets_to_add.dart:96-107` | |
| Indexed Stack keeps hidden children's state; Slider **Divisions**; Checkbox/Switch/Popup/List Tile/Expansion Tile links and use cases | ok | Flutter `widgets/basic.dart:4815-4826`; links resolve | |

## forms.md

| claim | verdict | source | note |
|---|---|---|---|
| Length rules: no **Min**/**max** field after adding; check still works with the start number; **Message** edit safe; adding/removing a rule rewrites it as **Required**; add it last | ok | `packages/core/lib/src/fields/form_validator.dart:42-43` (6 / 40), `:213,246` (writes `<` / `>`), `:315-331` (reads only `>=` / `<=`, else Required) | P47 still in 3.13. |
| No-code path first: ask Nowa AI in **Agent** mode, then check in **Play** | fixed | R5 | "type something shorter and submit the form" → "tap your submit button": validators run only on `validate` (section below). |
| **Regex** rule | fixed (R4) | `form_validator.dart:135-151` | "(a regular expression)" didn't explain anything to a non-coder; now "a regular expression that describes what valid text looks like". |
| Checkbox: starts checked; **Tristate** dash and tap cycle; **Active Color**, **Check Color**, **Side**, **Is Error**, **Semantic Label**, **Focus Color**, **Hover Color** | fixed (wording) | `material_library.dart:9016-9041`; `widgets_to_add.dart:615-626`; Flutter `material/checkbox.dart:246-263,383-393` | "a third, empty state" (unchecked already looks empty) → "a third state that shows a dash"; cycle ends "to the dash". |
| **Value**/**On Changed** with `value`; **Create Variable...**; **refresh** | ok | `material_library.dart:9025` (`bool? value`), `:67130`; `packages/core/lib/src/fields/field_link_menu.dart:374` | |
| Switch: starts on; four thumb/track colors | ok | `material_library.dart:67122-67135`; `widgets_to_add.dart:636-646`; Flutter `material/switch.dart:245-282` | |
| Slider: Nowa's own, 0 to 1, starts 0.5; **Divisions** steps; **Label** only with Divisions while dragging; `$` in **Label**; **Slider Height**, **Thumb Radius**, four colors | ok | `packages/nowa_runtime/lib/src/widgets/slider.dart:4-18,40-50`; `packages/core/lib/src/interpreter/libraries/nowa_runtime_library.dart:516-535`; `widgets_to_add.dart:712-721`; Flutter `material/slider.dart:402-428,847` (`onlyForDiscrete`), `material/slider_theme.dart:576-578`; `$` handling `basic_fields.dart:102-111` (BFString) | |
| Popup menu: starts "Popup Menu" + "Item 1"; **Item Builder** **Edit** opens Circuit; **On Selected** `value`, **On Opened**, **On Canceled**; **Child**, **Tooltip** (hover or long press), **Color**, **Shape** | ok | `widgets_to_add.dart:659-682`; `packages/core/lib/src/interpreter/libraries/material_library_custom.dart:1322-1351`; `packages/core/lib/src/fields/nowa_fields.dart:797-831` (**+** / **Edit**); `basic_fields.dart:533-559`; Flutter `material/popup_menu.dart:1361-1387,1468-1481`, `material/tooltip.dart:43` | Added "Then tap the button in **Play** to check the menu" after the AI prompt (R5: say how to check). |
| Older TextField / dropdown can't use validators | ok | `packages/core/lib/src/fields/form_fields.dart:112,286` | |
| Section anchor | kept | see "Anchors and links" | `<Anchor id="use-checkboxes-switches-and-sliders" />` on its own line (same pattern as `<Badge />` on `test/devices.md`). |

## lists.md

| claim | verdict | source | note |
|---|---|---|---|
| Builder builds only visible items; Normal works like a scrolling column; **Item Count** gives way to the list length | ok | Flutter `widgets/scroll_view.dart:1354-1356`; `packages/core/lib/src/fields/list_view_field.dart:139-160` | |
| Separator: **Spacing** starts at 20; **Widget** adds a gray Divider, thickness 1 | ok | `list_view_field.dart:243-285` | |
| Brush next to **Separator** selects the Divider | fixed (worded to the code) | `nowa_fields.dart:452-477` (brush only when the Divider has a drawn instance), `basic_fields.dart:498-500` | Now "select the Divider with the brush next to **Separator** (the brush shows while the board draws a divider)". Not tried live. |
| Divider settings | restored | `material_library.dart:14105-14115` | Old `listview.md` listed height; added **Height** (the space it takes between items), with **Color**, **Thickness**, **Indent**. |
| Scroll settings: **Scroll Direction**, **Reverse**, **Shrink Wrap**, **Padding**, **Physics** on List View and Grid View; five physics classes | ok | `list_view_field.dart:122-126,354-385`; `packages/core/lib/src/fields/grid_view_field.dart:25-29`; Flutter `widgets/scroll_physics.dart` (bouncing iOS, clamping Android, always, never), `widgets/page_view.dart:560-563` | |
| **Padding** | fixed | `basic_fields.dart:796-830` (empty = **+**, classGen 8/8; **Individual padding** is a button tooltip) | Added "Hover the row and click **+** to add it; the **Individual padding** button then sets each side." |
| Linking **Children** to a list switches to **Builder** and connects it "(with the same question when there are several)" | fixed (claim removed) | `field_link_menu.dart:137-147,160-185` (the field is replaced by a mapped list before `onLink` runs), `list_view_field.dart:20-53` (`_findWidgetInChildren` asks only for a plain list) | So the question never shows and the other widgets go. Now: "Only the first widget stays, as the item design, so drag the one you want to the top first." Same code path for Grid View (`grid_view_field.dart:41-95`). |
| Plant-grid example (model, list variable with **As List** and **Default Value** **+**, component param, **Item Builder** → **Pick Widget**, **List**, param label **Plant**, `element`) | ok + R8 | `logic/models.md#use-a-model-as-a-type`; `grid_view_field.dart:133-163` (labels **List**, **Item Count**, **Item Builder**); `block_field.dart:212-218` (param label) | Added one-clause explanations of "model" and "param" (R8). |
| List Tile: 11 rows of labels and meanings; **Title** starts "Tile" | ok | `material_library.dart:55917-55960`; `widgets_to_add.dart:817-829`; Flutter `material/list_tile.dart:476-492,494-503,530-537,615-633` | |
| Expansion Tile: editor order, advanced list, meanings; **Children** placeholder | ok | `basic_fields.dart:2084-2143`; `material_library_custom.dart:1174-1206` (`value`); `widgets_to_add.dart:831-845`; Flutter `material/expansion_tile.dart` | |
| Swipeable Stack `swipe`, `undo`, `moveTo` | ok | `packages/core/lib/src/interpreter/libraries/flutter_card_swiper_library.dart:298-326`; `flutter_card_swiper-7.2.0/lib/src/controller/card_swiper_controller.dart:13-26` | |

## navigation.md

| claim | verdict | source | note |
|---|---|---|---|
| **Automatically Imply Leading**: menu button with a drawer, back arrow when it can go back | ok | `widget_fields.dart:376-382` (under **Show advanced options**); Flutter `material/app_bar.dart:255-260` and the `leading` docs | |
| Page View dots: Problems text, **Fix** in **Problems**, **Hot Fix** under **Dependencies** | ok | `package_service.dart:410-421`; `packages/core/lib/src/panels/errors_panel.dart:186-192`; `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:256-266` (dots declare `smooth_page_indicator`) | Added "a ready-made add-on that draws them" (R4: "package" was unexplained on this page). |
| Indexed Stack keeps each page's state; TabView mismatch error; Cross Fade duration; slot parts stay put | ok | Flutter `widgets/basic.dart:4815-4826`, `material/tabs.dart:1914-1930` (debug assertion, shown while testing) | |
| Drawer, floating button, bottom bar whys (R9) | ok | | |

## media.md

| claim | verdict | source | note |
|---|---|---|---|
| Dragged widget: nothing asks | restored | `origin/main` text (verified in earlier phases); `package_service.dart:410-421` | The rewrite had dropped "**Problems** lists the missing package"; back: "nothing asks: **Problems** lists the missing package, and **Hot Fix** in **Details** adds it." |
| Html table cell | fixed | `package_service.dart:410-421` | "Yes, and you add it yourself" → "Yes, added from **Problems**". |
| Image: **Url** on **Network**; assets work offline; **Color** alone = flat shape, **Blendmode** to tint; **Error Builder** | ok | `widget_fields.dart:38-46`, `basic_fields.dart:889-918`, `packages/core/lib/src/interpreter/libraries/material_library_custom.dart:30` (`url`); Flutter `widgets/image.dart:962-966` (default srcIn) | |
| Image **Fit** start value | added | `default_blocks.dart:134-141` (`fit: BoxFit.cover`) | Step 3 now says it starts at `cover` (the Fit section's "Default works like `scaleDown`" only applies after a reset). |
| Background picture steps | fixed | `basic_fields.dart:727-741` (outer **+** creates only `fit: cover`), `:889-905` (inner **+** creates a sample NetworkImage); `block_tree.dart:5781-5795` (no auto-fill of required args) | The old step 3 said "set the picture ... if the inner row is still empty, click **+** first": the tabs only exist after that **+**. Now step 3 is the inner **+** ("If that inner **Image** row is empty, with no **Network** or **Asset** tab yet, ..."), step 4 sets the picture, step 5 Fit. Worded to hold either way; not tried live. |
| Color row hidden while a picture is set | ok + added | `basic_fields.dart:331-336`; Flutter `painting/box_decoration.dart:35-40` (color is the bottom layer) | Added that the color stays behind and shows where the picture doesn't cover the box (e.g. `contain`), so a reader isn't stuck with gray bars and no **Color** row. |
| Fit table (7 values), where Fit exists, Image Default = scaleDown | ok | `material_library.dart:82187-82197`; Flutter `painting/box_fit.dart:23-78`, `painting/decoration_image.dart:561`; `widget_fields.dart:43,90,191`, `basic_fields.dart:738` | |
| Video Player: **Url**; page links won't play; prefer **Network** for long videos; keep one of Auto Play / controls on | ok | `basic_fields.dart:957-1027` | "emulator" explained (R4). Desktop-app note matches `test/devices.md` badge. |
| YouTube: ID only; 15 flags (labels, starter Auto Play off / Mute on, captions on `en`); 12 player settings (16:9, 3 s, Live UIColor) | ok | `packages/core/lib/src/interpreter/libraries/youtube_library.dart:138-160,303-322`; `widgets_to_add.dart:520-545`; `youtube_player_flutter-9.1.3/lib/src/utils/youtube_player_flags.dart:7-80`, `lib/src/player/youtube_player.dart:60-150`, `lib/src/player/raw_youtube_player.dart:263` | Labels follow `camelCaseToSpaces` (**Force HD**, **Live UIColor**, **Controls Time Out**). |
| Rive error text | fixed | `basic_fields.dart:1334-1345,1973-1985` | "Error loading Rive file" only when the file can't be decoded or found; a web link that fails throws and the list keeps loading. Now says both. |
| Html: **Shrink Wrap** on, only as wide as content; Problems text + **Fix**; no prompt | ok + clarified | `widgets_to_add.dart:894-897`; `flutter_html-3.0.0/lib/flutter_html.dart:40-41`; `package_service.dart:410-421`; no `WidgetInfo` for Html (`widget_info.dart` class list), so no **Hot Fix** | Added "no **Add Missing Dependencies**, no **Hot Fix**" (the intro now names **Hot Fix** for dragged widgets). |
| Markdown: **Shrink Wrap** on, only as tall as its text | ok | `packages/nowa_runtime/lib/src/widgets/markdown.dart:6,15`; `widget_fields.dart:411-429` | |
| SVG, Lottie, Web View intros (R9) | ok | `widget_fields.dart:122-199`, `:50-93`, `:432-458` | |

## Coverage spot checks

Obsolete rows (all 8 confirmed obsolete in 3.13.0):

| row | result | evidence |
|---|---|---|
| Container "Add Widget" button | obsolete | no "Add Widget" string in `lib/` or `packages/` |
| Text from the picker is "Fixed" | obsolete | `widgets_to_add.dart:156-162` (width/height null = **Auto**) |
| Drag files from the computer into Nowa | obsolete | `lib/project/drop_from_outside.dart` defines `DropFromOutside` but nothing mounts it; the only drop target is the AI chat field (`packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:255`) |
| Ctrl/Cmd + O, Ctrl/Cmd + P for the picker | obsolete | `packages/designer/lib/src/designer_setup.dart:50-51` (P = Play, K = Library) |
| YouTube "or the full link" | obsolete | `raw_youtube_player.dart:263` passes the value as `videoId` |
| Rive **Fit** | obsolete | `widget_fields.dart:97-125` (file, **Artboard**, **State Machine** only) |
| Container wrapper paints a color "on top of" an image | obsolete | Flutter `widgets/container.dart:334` (decoration behind the child); foreground decoration not offered (`widget_fields.dart:337-345`) |

Covered rows sampled (10, all hold): Data Builder sources (index#data-builder); bottom bar "switch main areas"
(navigation#bottom-navigation-bar); **Upload Image** (media#image); button **Enabled** (`logic/events.md` L58-60); Normal →
Builder keeps the first child (lists#build-a-list-by-hand); aspect ratio needs an empty Main Axis Extent + **Reset to default**
(lists#grid-view); **Boomerang** (media#lottie); **Selectable** (media#markdown); **Reset to default** for Overflow
(`design/properties.md#reset-a-property`); wrapper reorder (`design/properties.md#add-a-wrapper`, "Reorder").

## Routed from B07

- `reference/widgets/index.md`, **Alert Dialog** row: added the reusable way ("make it a component and pick it as the dialog's
  content", link `../../logic/popups.md#use-your-own-design`) and explained `showDialog` ("the logic step that opens a
  dialog"). Evidence checked: `packages/core/lib/src/fields/basic_fields.dart:449-488` (**Pick Widget** / **Edit in circuit**
  on a widget-builder row), the anchor exists (auto ID of `### Use your own design` in `docs/logic/popups.md`).

## Open issues

1. Container background picture: the code says the inner **Image** row is empty after the first **+** (the class generator
   sets only Fit; nothing fills required arguments). The step is conditional and ordered correctly either way; a live check
   would let it drop the "If".
2. Separator brush: shown only while the Divider has a drawn instance on the board (`nowa_fields.dart:452-477`); worded that
   way, not tried live.
3. Linking **Children** to a list: from the code, no "lost widgets" question appears and only the first widget survives; I
   removed the old claim and added the "drag it to the top first" advice. Not tried live.
4. Lengths stay over the brief's ~2,200 for index, media and lists (see Summary); the writer's split proposals in the notes
   still apply if the orchestrator wants them.
5. Writer's "For other pages" items (fonts-icons, properties, events, wrappers) are for B05, B04, B06, B14; not applied here.
