# W13 review: widget reference (catalog, forms, lists, navigation, media, wrappers)

Verifier run against `/home/user/nowa-master` (v3.12.5, b84bfdafd). Writer notes: `W13a-writer-notes.md`, `W13b-writer-notes.md`.
All code refs are relative to the repo root. This log is written page by page; the summary at the top is filled in last.

## Summary

(in progress: page 1 of 6 done)

## Page 1: `docs/reference/widgets/index.md` (Widget catalog)

Checked: all 45 rows (name, category, one-line behavior, setup details), the three picker bullets, the package paragraph, 45 anchors, 43 links, front matter, style.

### Page-level claims

| claim | verdict | code ref | note |
|---|---|---|---|
| 45 widgets, in 10 categories (Basic 5, Images 2, Buttons 3, Layout 10, Players 2, Animations 3, Progress Indicators 2, Forms 6, Screen Components 6, Integrations 6), no widget missing, none invented | ok | `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:69-80` (`widgetCategories`), `:116-937` (lists) | counted `name:` entries per list; all 45 names match the rows letter for letter (incl. `Dropdown menu`, `SizedBox`, `TabView`, `AnimatedContainer`, `Html`, `SVG`, `YouTube Player`) |
| headings use sentence case (**Progress indicators**, **Screen components**) although the code keys are title case | ok | `widgets_to_add.dart:69-80` | the picker draws no category names (below), so the headings are not UI labels; style guide wants sentence case |
| picker is one flat list, no group headings, built-in widgets first in code order | ok | `packages/core/lib/src/widgets/widget_picker.dart:131-190,376-387`; `captures/ui-map/11-widget-picker.png` | the category grid `WidgetPicker` is only used by `ToolBoxPanel` (`packages/designer/lib/src/panels/tool_box_panel.dart`) and `WidgetPanel` (`widget_panel.dart`), neither is referenced anywhere (grep), so no user can see the category names |
| Ctrl/Cmd + K or **Widget** in the toolbar opens the picker | ok | `packages/designer/lib/src/designer_setup.dart:48` (`AdaptiveActivator(keyK)`), `packages/designer/lib/src/widgets/designer_tools.dart:171-185` (tooltip `Widget`) | |
| hint **Search for a widget**; type part of a name, press Enter | ok | `widget_picker.dart:146`; `captures/ui-map/11-widget-picker.png` ("to select") | |
| "Your own components appear in the same list. Under **Search for:**, choose **Components** ... **BuiltIn**" | fixed | `widget_picker.dart:21-38` (`CustomWidgetsFinder`: every widget class in `lib`, except `MyApp`, no `isScreen` filter), `:191` (chips `All`, `BuiltIn`, `Components`), `packages/command_palette/lib/src/widgets/filter_section_widgets.dart:26` (`Search for: `) | the **Components** chip also lists screens. Now "Your own screens and components", same as `design/add-widgets.md` |
| **Request a Widget** link in the search bar, then **Submit Request** | ok | `widget_picker.dart:147-162`; `packages/core/lib/src/dialogs/feedback_dialogs.dart:85-88` | |
| Nine widgets need a package: SVG, Swipeable Stack, YouTube Player, Lottie, Rive, Pin Code Field, Admob Banner, Google Maps, RevenueCat Paywall | ok | `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:244,305,420,483,571,668`; `.../packages/integrations/admob_package_config.dart:345`, `google_maps_package_config.dart:128`, `revenuecat_package_config.dart:127` | `grep PackageDependency(` finds exactly these nine; Html, Markdown, Video Player, Web View declare none |
| Package names `flutter_svg`, `flutter_card_swiper`, `youtube_player_flutter`, `lottie`, `rive`, `pin_code_fields`, `nowa_mobile_ads`, `google_maps_flutter`, `purchases_flutter` + `purchases_ui_flutter` | ok | `packages/core/lib/src/interpreter/packages/dart_package.dart:107-133,158-169`; integration configs `name:` | |
| **Add Missing Dependencies** opens when you pick one; **Add** installs the package and places the widget | ok | `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:32-39,47,88-111`; `widget_picker.dart:395-409` | buttons **Cancel** / **Add** |
| capture placeholder `reference-widgets-1` well formed; request exists | ok | `_rewrite/captures/requests/W13.md` | image already captured (`static/img/docs/reference/reference-widgets-1.png`); the embed script reads the placeholder, left untouched |
| 36 required anchors present, plus 9 more (45 in total, no duplicates) | ok | script over `redirects.md` "Anchor targets" | extra ids: `icon-button`, `group`, `swipeable-stack`, `animated-container`, `popup-menu-button`, `dropdown-menu`, `pin-code-field`, `google-maps`, `revenuecat-paywall` |
| front matter, no H1, no `---`, one admonition, no emoji, sentence-case headings | ok | style guide | body is about 1,600 words for a 45-row reference table; kept |
| 43 relative links and anchors resolve (script) | ok | `design/add-widgets.md#add-a-widget-that-needs-a-package`, `design/layout.md#groups`, `#scroll-or-wrap-content`, `design/fonts-icons.md#choose-an-icon`, `logic/expressions.md#dollar`, `logic/popups.md#show-a-dialog`, `wrappers.md#container|data-builder|animated-container|drawer` | |

### Rows

| widget | verdict | code ref | note |
|---|---|---|---|
| Container (box with color, gradient or image, border, radius, shadow, padding, margin; one child; **Shape** tool; also a wrapper) | ok | `widgets_to_add.dart:116-126`; `packages/core/lib/src/fields/basic_fields.dart:268-320` (color/gradient, image, Border, Radius, Shadows); `packages/designer/lib/src/details/widget_fields.dart:317-350` (alignment, padding, margin); `packages/designer/lib/src/widgets/designer_tools.dart:90-91,142` (tooltip `Shape`) | |
| Text; `$` inserts a variable | ok | `widgets_to_add.dart:128-140`; `basic_fields.dart:100-115` (the `$` key opens the link menu) | |
| Text Field; creates `text` linked to **Controller**; validators | ok | `widgets_to_add.dart:142-153`; `packages/core/lib/src/interpreter/widget/text_field_info.dart:14-36`; `form_fields.dart:44-100` | |
| Icon (Material icon set, **Size**, **Color**) | ok | `widgets_to_add.dart:155-166`; `packages/core/lib/src/fields/icon_field.dart:58` (`Icons.<name>`); `button_fields.dart:35-52` | |
| SizedBox (fixed-size empty box; "Earlier docs called it Empty widget") | ok | `widgets_to_add.dart:168-173` (100 x 100); `redirects.md` (`empty-widget`) | |
| Image (web address, assets, bytes; **Network** / **Asset** / **Bytes**; **Pick Image**) | ok | `basic_fields.dart:888-950`; `packages/core/lib/src/fields/asset_fields.dart:52` | |
| SVG (`flutter_svg`; **Pick SVG** on **Asset**, `.svg` only) | ok | `widget_info.dart:565-577`; `basic_fields.dart:1196-1235`; `widget_fields.dart:127-186` | |
| Button (label is a Text; events) | fixed | `widgets_to_add.dart:205-211` (`onPressed: FuncExpr()`); `packages/core/lib/src/fields/nowa_fields.dart:793-830` (`FunctionField` reads **Edit** with a bolt when the value is a function, **+** otherwise); `logic/events.md` | page said "Click **+** next to **On Pressed**". A new Button already has an empty function, so the control reads **Edit** |
| Icon Button (icon only; **On Pressed**, **On Long Press**, **On Hover**) | ok | `widgets_to_add.dart:213-221`; `button_fields.dart:72-96,125-160` (`ButtonActions`) | same events as Button |
| Floating Button ("A round button ...", slot on a screen) | fixed | `widgets_to_add.dart:223-237`; `packages/designer/lib/src/design_experience/drag_rule.dart:393-440` (`ScaffoldRule`: `floatingActionButton` slot) | "round" is not shown by the code (no `useMaterial3` in any template, so the shape follows Flutter's default); removed. The picker's own text is "A button that floats above the interface" |
| Group (Stack / Row / Column, starts as empty Stack) | ok | `widgets_to_add.dart:241-252`; `packages/designer/lib/src/details/group_details.dart:81-110` (three icon buttons) | |
| TabView (two tabs "Tab1", "Tab2") | ok | `widgets_to_add.dart:254-294` | |
| List View (**Builder** / **Normal**, starts in Builder with three items, **Connect** next to **List**) | ok | `widgets_to_add.dart:296-321`; `packages/core/lib/src/fields/list_view_field.dart:97-130,285-345` | |
| Grid View (same choice, two columns, three items) | ok | `widgets_to_add.dart:323-361`; `packages/core/lib/src/fields/grid_view_field.dart:96-140` | |
| Swipeable Stack (`flutter_card_swiper`, `swiperController`, board draws at most two cards) | ok | `widget_info.dart:410-466` (`SwiperCardController`, `numberOfCardsDisplayed >= 2 ? 2`); `packages/core/lib/src/fields/swipeable_stack_fields.dart:96-102` | |
| Page View (swipe pages, dots, **Effect type**) | fixed | `default_blocks.dart:269-288` (Stack with `PageView` and a `Positioned(bottom: 8)` `AnimatedSmoothIndicator`); `basic_fields.dart:1983-2010` (**Effect type**) | "dots underneath" read as below the pages; the dots sit over the bottom of the pages. Now "at the bottom" |
| Indexed Stack (only the child at **Index**) | ok | `widgets_to_add.dart:403-415`; `packages/core/lib/src/interpreter/widget/widget_instance_impl.dart:176-180` | label derived from `index` |
| Cross Fade (**First Child**, **Second Child**, **Cross Fade State**, **Duration**) | ok | `widgets_to_add.dart:417-438`; `packages/core/lib/src/fields/block_field.dart:216-218` + `utils.dart:77-79` (labels = parameter names split at capitals; default editor lists every parameter, `class_field.dart:92-138`) | |
| Wrap (**Spacing**, **Run Spacing**) | ok | `widgets_to_add.dart:440-453` | derived labels |
| Data Builder (sources **API Request**, **Supabase**, **Firestore**; loading and error states; also a wrapper) | fixed | `packages/core/lib/src/fields/data_field.dart:38-48,170-215`; `packages/data/lib/src/api/views/api_field.dart:12`, `supabase/supabase_plugin.dart:45`, `firebase/firebase_field.dart:13` | "which is usually easier" is advice, not a code fact. Now "which keeps the widget you already built" (what `integrations/show-data.md` gives as the reason) |
| Video Player (URL or uploaded file, player controls, **Pick Video**, board placeholder) | ok | `widgets_to_add.dart:470-491`; `basic_fields.dart:956-1030` (`showControlsBar` defaults to true, `nowa_video_player_controller.dart:10`); `widget_info.dart:341-360` ("Designer mode") | |
| YouTube Player (`youtube_player_flutter`, **Initial Video Id**, thumbnail and title on the board) | ok | `widgets_to_add.dart:494-519`; `widget_info.dart:314-327`; `youtube_library.dart:418-466` | |
| Lottie (**Pick Lottie**, `.json`) | ok | `basic_fields.dart:1142-1180` | |
| Rive (**Pick Rive**, `.riv`, **Artboard**, **State Machine**) | ok | `basic_fields.dart:1258-1360` | **State Machine** shows only when the artboard has one |
| AnimatedContainer (300 ms **Duration**, also a wrapper) | ok | `widgets_to_add.dart:548-557`; wrapper `packages/core/lib/src/wrappers_to_add.dart:178-187` | |
| Circular / Linear Progress Indicator (spins until **Value** 0 to 1) | ok | `widgets_to_add.dart:562-585`; `packages/core/lib/src/interpreter/libraries/material_library.dart:61083-61100` | Flutter semantics: `value` is `double?` and is passed straight through |
| Checkbox, Switch (**Value**, **On Changed**) | ok | `widgets_to_add.dart:590-629` | |
| Popup Menu Button (one item "Item 1", **On Selected**) | ok | `widgets_to_add.dart:632-655`; `material_library_custom.dart:1312-1330` (`onSelected`) | |
| Dropdown menu (one option "first", **Items**) | ok | `widgets_to_add.dart:658-687`; `form_fields.dart:148-290` | |
| Slider (**Min**, **Max**, **On Changed**) | ok | `widgets_to_add.dart:690-707`; `packages/nowa_runtime/lib/src/widgets/slider.dart:3-30` | |
| Pin Code Field (`pin_code_fields`, `pinCode` variable, **Pin Code Length** up to 6) | ok | `widget_info.dart:476-492` (`TextFieldConnector(expr, name: 'pinCode')`); `packages/core/lib/src/fields/pin_code_fileds.dart:26-30` | |
| App Bar, Drawer (drop on a screen, slot); Bottom Navigation Bar (`pageIndex`, **Current Index**, **On Tap**) | ok | `drag_rule.dart:393-440`; `packages/core/lib/src/interpreter/widget/nav_bar_info.dart:14-45`; `navbar_field.dart:79-105` | Drawer also a wrapper (`wrappers_to_add.dart:93`) |
| List Tile (**On Tap**), Expansion Tile (**Children**, **Initially Expanded**), Alert Dialog (`showDialog` step) | ok | `widgets_to_add.dart:790-832`; `basic_fields.dart:2077-2100`; `logic/popups.md#show-a-dialog` | |
| Admob Banner (`nowa_mobile_ads`, App IDs in **Settings** → **Integrations**, test ads on) | ok | `widgets_to_add.dart:837-850` (`showTestAds: true`); `admob_package_config.dart:31,40` (**Android App ID**, **iOS App ID**); `packages/core/lib/src/settings/settings.dart:6,111` (category **Integrations** in the **Settings** list) | |
| Web View (`https://` added, board placeholder) | ok | `widget_fields.dart:432-455`; `packages/core/lib/src/interpreter/declaration_info/web_view_info.dart:6-14` | |
| Html, Markdown (**Data**; **Selectable**) | ok | `widget_fields.dart:392-430`; `packages/nowa_runtime/lib/src/widgets/markdown.dart:5-8` (`selectable` and `shrinkWrap` default true) | |
| Google Maps, RevenueCat Paywall (packages, API keys in **Settings** → **Integrations**, board placeholder) | ok | `google_maps_package_config.dart:23-44` (**Android/iOS/Web API Key**), `revenuecat_package_config.dart:26-42` (**Apple/Android/Web API Key**); `packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:46` ("Run to preview") | |

### Open issues for page 1

- None blocking. Deep links to a table row land under the sticky navbar (writer note 1): needs one CSS rule from the orchestrator, see `W13a-writer-notes.md`. Not checked in a browser.
