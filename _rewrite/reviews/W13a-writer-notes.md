# W13a writer notes: Reference / Widget catalog and Wrappers

Pages: `docs/reference/widgets/index.md` (Widget catalog), `docs/reference/wrappers.md` (Wrappers). Code refs are relative to
`/home/user/nowa-master` (v3.12.5, b84bfdafd). Research used: `features-widgets.md` ("Catalog of built-in widgets (45)", "Wrappers",
"Widget picker", "Request a Widget", "Add Missing Dependencies", "Add Wrapper", "Open questions"). Every default and every label that is not
derived from a parameter name was re-read in code (the research held up; see "Differences from research" for the few places I deviated). Derived labels and
the few Flutter-semantics statements are listed under "Assumptions and open questions" (items 6 and 7). Both pages compile as
MDX (checked with `@mdx-js/mdx` 3.1.1 + remark-gfm in a scratch script, no site build).

## Page 1: `docs/reference/widgets/index.md` (Widget catalog)

### Structure and conventions

- One `##` per category in the code's order, sentence case (the picker draws no headings, so these are not UI labels): Basic (5), Images
  (2), Buttons (3), Layout (10), Players (2), Animations (3), Progress indicators (2), Forms (6), Screen components (6), Integrations (6) =
  45. Order and names: `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:69-80` (`widgetCategories`), `:82-112` (`widgetsToAdd`),
  lists at `:116` (Basic), `:176`, `:203`, `:240`, `:468`, `:522`, `:560`, `:588`, `:734`, `:835`.
- Table columns `Widget | What it does | Good to know`. Anchors: `<span id="..."></span>` at the start of each name cell, 45 in total:
  the 36 ids of `redirects.md` "Anchor targets" (checked by script: none missing, no duplicates) plus kebab-case for the other nine:
  `icon-button`, `group`, `swipeable-stack`, `animated-container`, `popup-menu-button`, `dropdown-menu`, `pin-code-field`, `google-maps`,
  `revenuecat-paywall`. Name cells link to the dedicated page when one exists (`./forms.md`, `./lists.md`, `./navigation.md`,
  `./media.md`, `../../integrations/*.md`; Group links to `../../design/layout.md#groups`).
- Link targets that did not exist when I wrote the page (the build fails on broken links, `docusaurus.config.js:38-43`): `./forms.md`, `./lists.md`, `./navigation.md`,
  `./media.md` (W13b), `../wrappers.md` (my page 2) and `../../design/properties.md` (W4b/W19). At my last check `wrappers.md`, `forms.md` and `design/properties.md` exist
  (and `properties.md` and `forms.md` link back to my anchors `#padding`, `#visibility`, `#gesture-detector`, `#scrollview`, `#form`: all defined); **still missing: `lists.md`, `navigation.md`,
  `media.md`**. All other links and anchors resolve: `design/add-widgets.md#add-a-widget-that-needs-a-package`, `design/layout.md#groups` and `#scroll-or-wrap-content`,
  `design/fonts-icons.md#choose-an-icon`, `logic/expressions.md#dollar`, `logic/popups.md#show-a-dialog`, `wrappers.md#container|data-builder|animated-container|drawer`.
- I did not link into W13b's pages with anchors (they were being written at the same time).
- Anchors in table cells land under the sticky navbar: Docusaurus gives only headings a `scroll-margin-top`
  (`node_modules/@docusaurus/theme-common/lib/utils/anchorUtils.module.css:9`) and `src/css/custom.css` has no rule, so a deep link such as
  `/reference/widgets#textfield` scrolls the row's first line under the 60 px navbar. I could not test in a browser here (none installed). **Suggestion
  for the orchestrator** (I may not edit `src/`): add to `src/css/custom.css`
  `table span[id] { display: block; position: relative; top: calc(-1 * (var(--ifm-navbar-height) + 0.5rem)); }`. It adds no height (the span is empty) and works in every browser;
  the simpler `table span[id] { scroll-margin-top: calc(var(--ifm-navbar-height) + 0.5rem); }` may be ignored on empty inline elements. The same applies to the wrapper
  anchors on page 2. (The spans are kept exactly as `redirects.md` describes: `<span id="..."></span>`, no inline style.)
- Capture: one request, `reference-widgets-1` (picker with SVG highlighted, showing **Dependencies**), in
  `captures/requests/W13.md`. `design-add-widgets-1` (W3) already covers the plain picker; mine shows the preview card of a widget that
  needs a package.
- One admonition (`:::tip Or ask Nowa AI`). No badges: nothing in the catalog is gated in the code (no entry sets `isBeta`,
  `widgets_to_add.dart:25`).
- No prices, plan limits or credit amounts.

### Claims and code refs

**Intro and picker**
- 45 built-in widgets: count of `name:` entries in `widgets_to_add.dart` (lines above).
- Picker opens with Ctrl/Cmd+K or the **Widget** tool: `packages/designer/lib/src/designer_setup.dart:48`;
  `packages/designer/lib/src/widgets/designer_tools.dart:171-185` (tooltip `Widget`). Steps are on `design/add-widgets.md` (W3), which I link.
- Flat list, no category headings: `packages/core/lib/src/widgets/widget_picker.dart:131-197` (`showCommandPalette`, hint `Search for a
  widget` `:146`, `Request a Widget` `:155`, chips `All`/`BuiltIn`/`Components` `:191`); actions are loaded as one stream, built-in first, then
  project widgets (`:376-387`). The category-headed grid `WidgetPicker` (`:57-129`) is not used by the picker (research "Not user-facing").
  No header rows are built for the picker (`isHeader` is only set in `packages/ai/lib/src/ui/attachement_menu.dart`). The screenshot
  `captures/ui-map/11-widget-picker.png` shows the same flat list.
- "With nothing typed, the picker lists the widgets in the order of the tables": the default filter returns the actions unchanged for an empty
  query (`packages/command_palette/lib/src/controller/command_palette_controller.dart:264-268`) and `widgetsToAdd` is the category lists in order.
- **Components** chip = project widget classes (`widget_picker.dart:21-38`, `:203-212`). Per the code this includes screens (no `isScreen`
  filter); I wrote "your own components" only, like the brief. W3's page says "the screens and components"; both fit the code.
- **Request a Widget** then **Submit Request**: `widget_picker.dart:147-162`; `packages/core/lib/src/dialogs/feedback_dialogs.dart:85-88`.
- The nine widgets that need a package (SVG, Swipeable Stack, YouTube Player, Lottie, Rive, Pin Code Field, Admob Banner, Google Maps,
  RevenueCat Paywall): `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:244-250` (Lottie), `:305-311` (YouTube),
  `:420-426` (Swipeable Stack), `:483-489` (Pin Code Field), `:571-577` (SVG), `:668-674` (Rive);
  `.../integrations/admob_package_config.dart:345-354`, `google_maps_package_config.dart:128-135`, `revenuecat_package_config.dart:127-139`.
  Package names: `packages/core/lib/src/interpreter/packages/dart_package.dart:107-133` (`flutter_svg`, `flutter_card_swiper`,
  `youtube_player_flutter`, `pin_code_fields`, `lottie`, `rive`); `nowa_mobile_ads`, `google_maps_flutter`, `purchases_flutter` and
  `purchases_ui_flutter` as in the integration pages (W17) and the config files. **Add Missing Dependencies** / **Add**: `missing_dependency_dialog.dart`
  (research), same wording as `design/add-widgets.md`.

**Rows** (entries are in `widgets_to_add.dart`; after a tightening pass the page keeps only claims a reader needs, so many "Starts as ..." details
from research are not on the page)
- Container: **Shape** tool places `containerBlock` (`packages/designer/lib/src/widgets/designer_tools.dart:91`); wrapper `wrappers_to_add.dart:43`. One child.
- Text: `$` inserts a variable (`basic_fields.dart:53-180`; `logic/expressions.md:41`, anchor `#dollar`).
- Text Field: `TextFieldConnector` creates a `text` controller variable linked to slot `controller`
  (`packages/core/lib/src/interpreter/widget/text_field_info.dart:14-36`); validators (research: `form_fields.dart`).
- Icon: **Size**, **Color** (research); icon picker lives on `design/fonts-icons.md#choose-an-icon` (W4). SizedBox: old slug `empty-widget` and old page title
  "How to use SizedBox (Empty widget)" (`redirects.md`).
- Image: tabs Network / Asset / Bytes and **Pick Image**: `basic_fields.dart:888-950` (name `'Image'` `:920`), `asset_fields.dart:52,172-173` (`'Pick $name'`).
  SVG: `flutter_svg` (`widget_info.dart:571-577`), `.svg` only (`basic_fields.dart:1228`), name `'SVG'` (`:1222`).
- Button: child `Text('Button')` and empty `onPressed` (`:205-211`); **+** next to **On Pressed** as on `logic/events.md` / `logic/global-state.md` (W5/W6). Icon Button: events as research
  (`On Pressed`, `On Long Press`, `On Hover`; same labels as `logic/events.md`). Floating Button: `ScaffoldRule`
  (`packages/designer/lib/src/design_experience/drag_rule.dart:393-440`: App Bar, Floating Action Button, Bottom Navigation Bar and Drawer go into their slot when one is
  dropped on a screen).
- Group: empty Stack (`:242-252`, `default_blocks.dart:290-296`); description text lists Stack / Row / Column; docUrl `/ui/layout/groups`, so the name links to `design/layout.md#groups`.
- TabView: two tabs "Tab1" and "Tab2" (`:255-294`). List View: Builder, 3 items (`:297-321`); Grid View: Builder, 2 columns, 3 items (`:324-361`); **List** / **Connect** and
  **Type** (**Normal** / **Builder**) as on `integrations/show-data.md` (W14) and `features-widgets.md` "Lists and grids".
- Swipeable Stack: `flutter_card_swiper`, `swiperController` (`widget_info.dart:410-426,455`); "at most two cards" from the note `swipeable_stack_fields.dart:96`.
- Page View: a Stack with a `PageView` and an `AnimatedSmoothIndicator` (count 2, active index 0, 8 from the bottom): `default_blocks.dart:269-288`; **Effect type**:
  `basic_fields.dart:2006`. I say only that the dots are "a separate indicator on top of the pages" (verified) and not whether they follow the swipes (not verified; research open question).
- Indexed Stack (`:404-415`): **Index** (derived); `pageIndex` is created by `BottomNavBarConnector` (`nav_bar_info.dart:14-45`). Cross Fade: `firstChild`, `secondChild`,
  `crossFadeState`, `duration` (`:418-438`; labels derived).
- Wrap: **Spacing** / **Run Spacing** are derived labels (`camelCaseToSpaces`, `packages/core/lib/src/utils.dart:77-79`); link target `design/layout.md#scroll-or-wrap-content` (W4).
- Data Builder: **Source** values and "usually easier as a wrapper": `integrations/show-data.md` (W14); wrapper `wrappers_to_add.dart:86`.
- Video Player: tabs, **Pick Video**, board shows a "Designer mode" placeholder (`basic_fields.dart:975-1020`, `widget_info.dart:340-357`). I did not describe where it plays (research open
  question 8). YouTube Player: `initialVideoId` (**Initial Video Id**, derived), the board shows `YouTubeVideoPlaceholder` (thumbnail and title per research,
  `youtube_library.dart:418-466`; `widget_info.dart:313-327`); package `youtube_player_flutter` (`widget_info.dart:305-311`).
- Lottie: `.json` only (`basic_fields.dart:1174`), **Pick Lottie** (`:1168`). Rive: `.riv` only (`:1287`), **Artboard** (`:1448`), **State Machine** (`:1482`).
  AnimatedContainer: 300 ms (`:548-557`); wrapper `wrappers_to_add.dart:178-187`.
- Circular / Linear Progress Indicator: no `value` set, so they spin (`:562-585`); "set **Value**, a number from 0 to 1" is Flutter's own rule for these widgets (not Nowa code).
- Checkbox / Switch: `value`, `onChanged` (`:590-629`; labels derived). Popup Menu Button: item "Item 1", `onSelected` (derived) (`:632-655`). Dropdown menu: item "first" (`:658-687`).
  Slider: `NSlider` with `min`, `max`, `onChanged` (`packages/nowa_runtime/lib/src/widgets/slider.dart:3-30`). Pin Code Field: **Pin Code Length** and the "maximum length ... 6" note
  (`packages/core/lib/src/fields/pin_code_fileds.dart:26-30`), `pinCode` connector (`widget_info.dart:492`).
- App Bar: `appBar` slot (`ScaffoldRule`). Bottom Navigation Bar: `BottomNavBarConnector` creates `pageIndex`, links `currentIndex` and sets `onTap` (`nav_bar_info.dart:14-45`). Drawer: `drawer`
  slot; wrapper `wrappers_to_add.dart:93`. List Tile: **On Tap** (research); "Typically the item of a List View" paraphrases the picker description "A single fixed-height row
  typically used in a scrolling list." Expansion Tile: **Children**, **Initially Expanded** (derived; `:805-818`). Alert Dialog: `showDialog` step per `logic/popups.md` "Show a dialog" (W5).
- Admob Banner: `showTestAds` true (`:837-850`); **Settings** -> **Integrations** path as in the W17 pages (`integrations/admob.md`, `google-maps.md`, `revenuecat.md`); packages per research
  and the config files. Web View: `https://` is added when the text does not start with "http" (`packages/designer/lib/src/details/widget_fields.dart:432-455`); the board placeholder reads
  "Web view to {url} / Run to preview" (`web_view_info.dart:11`). Html / Markdown: **Data** (`:868-888`); Markdown `selectable` and `shrinkWrap` default to true
  (`packages/nowa_runtime/lib/src/widgets/markdown.dart:5-8`), so the page says people can select the text unless **Selectable** is turned off. Google Maps and RevenueCat Paywall: `:891-926`;
  placeholders "Run to preview" (`packages/core/lib/src/interpreter/packages/integrations/integration_preview_view.dart:46`).

### Left out (on purpose)

- Starting sizes (width by height) and most starting content from research's "What you get when you add each widget" ("Write something", the star icon, titles such as "Title", "Tile" and "Hello",
  the sample video and animation URLs, default values such as the Slider's 0.5): dropped in a tightening pass to keep the rows to one or two short sentences. Kept only where a reader needs it to act:
  Group (empty Stack), TabView (two tabs), List View / Grid View (Builder, placeholder items), Popup Menu Button and Dropdown menu (their one starting item), AnimatedContainer (300 ms).
- Long Details property lists per widget (research lists them): the catalog names only the properties a reader needs first; the dedicated pages
  and `design/properties.md` own the rest.
- The "Names that differ between the picker and the Outline / Details header" table (SVG shows as "SVG Image", Text Field as "TextField",
  Dropdown menu as "Dropdown Menu", YouTube Player as "Youtube Player"; `widget_info.dart:565,532,302`, `text_field_info.dart:6-8`): minor, left out.
  Maybe worth one line in `design/outline.md`.
- The in-app "Open Documentation." link and the broken Web View link (leading space, `widgets_to_add.dart:857`; `product-issues.md`): not on the page.
- Html's missing package prompt (research open question 3): no statement about packages for Html.
- TabView **Length** (research open question 5), Dropdown menu **Value** (6), YouTube full link (4), Button **Enabled** → **Create Variable** (11): not stated.
- Instant Play/**Play** behavior of Video Player, Web View, Maps, Paywall: only the board placeholder is stated; platform details belong to W13b/W17.

### Differences from research

- Container: research lists a "Fill" label; the code's fill editor is the Container's color/gradient field (`basic_fields.dart:330-372`, dropdown
  **Solid / Linear / Radial / Sweep** in `color_fields.dart:373-376`) with no literal "Fill" label that I could confirm, so the page says
  "fill it with a color, gradient or image" in plain words and does not bold "Fill".
- Research says Interactive Viewer lets people "pan, zoom and rotate"; the page (wrappers) says pan and zoom only.
- I describe the picker as flat with no headings (research open question 1 is confirmed in code and by the screenshot).

## Page 2: `docs/reference/wrappers.md` (Wrappers)

### Structure and conventions

- Intro, then three short task sections (**Add a wrapper**, **Reorder wrappers**, **Remove a wrapper**), then `## All wrappers` with seven `###`
  groups and a two-column table `Wrapper | What it does` (one or two short sentences each). All 32 wrappers appear exactly once, with the exact
  names of `packages/core/lib/src/wrappers_to_add.dart:12-188` (checked by script, including the lowercase "Clip radius" and "AnimatedContainer").
  Groups (my own, the code has none): Space, size and position (9: Padding, Align, Constrained Box, Fractionally Sized Box, Aspect Ratio, Fitted
  Box, Intrinsic Height, Intrinsic Width, Safe Area); Look and effects (8: Container, Opacity, Clip radius, Transform, Color Filter, Material,
  Badge, AnimatedContainer); Touch and motion (6: Gesture Detector, Ink Well, Dismissible, Refresh Indicator, Interactive Viewer, Tooltip); Show,
  hide and scroll (2: Visibility, Scroll View); Text and language (2: Text Direction, Default Text Style); Data and logic (2: Data Builder, Notifier
  Builder); Forms and screen parts (3: Form, Screen, Drawer).
- Anchors: `<span id="..."></span>` in all 32 name cells. The 7 required ids (`gesture-detector`, `material`, `opacity`, `padding`, `scrollview`,
  `text-direction`, `visibility`) are present (checked by script); the other 25 are kebab-case of the name (`clip-radius`, `fitted-box`,
  `fractionally-sized-box`, `default-text-style`, `animated-container`, ...). The catalog links to four of them (`#container`, `#data-builder`,
  `#animated-container`, `#drawer`) and I link back to `./widgets/index.md#container`, `#animated-container`, `#drawer`.
- `text-direction` links to `../design/localization.md#show-text-right-to-left` (as `redirects.md` asks). `visibility` links to
  `../logic/expressions.md#visibility`; `design/properties.md` is linked once in **Add a wrapper** and under **Next steps**.
  `design/properties.md` (W4b) has the same how-to under `{#add-a-wrapper}` and agrees with my page (order, Padding/Container example, Reorder, Remove, hidden with several widgets selected).
- No capture on this page (brief: at most one request, used for the picker). The Add Wrapper list is a good candidate for the properties page.
- One admonition (`:::tip Or ask Nowa AI`). No badges (nothing is gated in the code). No prices or limits.

### Claims and code refs

- **Add Wrapper** button at the bottom of **Details**, hint **Search for a wrapper**, click or Enter to add, one undo entry "Add wrapper":
  `packages/designer/lib/src/details/widget_details.dart:66-113,189-199`. Button shown only when exactly one widget is selected and it can be
  wrapped: `widget_details.dart:145-148` (`instances.length != 1` -> false, then `canWrapWidget`,
  `packages/core/lib/src/interpreter/widget/widget_blocks.dart:356-372`). I state only the single-selection condition (the `canWrapWidget`
  cases are not enumerated; research open question 14).
- Position and size are not in the list ("layout wrappers"): `widget_blocks.dart:351-354` (`isLayout`), `Wrapper.isLayoutWrapper`; `widget_instance_impl.dart:274-275`
  (`wrappers` excludes layout wrappers); **Layout** section: `packages/designer/lib/src/details/layout_details.dart`.
- Section order and "new wrapper at the bottom": `widgets` is bottom-up (`widgets.first` is the base widget, `widget_instance_impl.dart:98,274`);
  `wrapperFields()` walks `wrappers` in that order (`packages/core/lib/src/fields/block_field.dart:791-809`); `addWrapper` inserts at
  `widgets.length`, i.e. outermost (`packages/core/lib/src/interpreter/widget/designer_model.dart:472-485`). So a wrapper listed later in
  **Details** is outside the ones above it. The Padding/Container example on the page is derived from this (not read from a screenshot): a
  Padding listed below a Container is outside it (space around the colored box); above it, inside it (space inside the box). Old docs
  (`old-docs/ui/wrappers/wrappers-intro.md`, `padding.md`) say the same ("bottom-up", Padding inside or outside).
- Reorder: grip icon (`Icons.drag_indicator`, cursor `move`, visible while hovering the section) on wrapper sections only; drop line (primary
  color, 4 px) above or below the hovered section; undo entry "Reorder": `packages/designer/lib/src/details/wrapper_details.dart:32-111`;
  `packages/core/lib/src/fields/class_field.dart:344-362,425-460` (`WidgetGroup` adds the handle when `block.isWrapper`).
- Remove: **...** (`Icons.more_horiz_outlined`, `packages/core/lib/src/widgets/nowa_widgets.dart:157-159`) appears on hover; menu entry
  **Remove** when more than one widget is in the instance: `class_field.dart:377-423`. `removeWidget` -> `dissolve()` puts the wrapped child back in the
  parent's slot (`designer_model.dart:384-392`, `packages/core/lib/src/interpreter/block_tree.dart:256-280`), so "the widget stays". Undo: the removal is
  recorded (`class_field.dart:393-399`); add and reorder are `Undo` records too (`widget_details.dart:82-89`, `wrapper_details.dart:59-66`).
- Padding: `EdgeInsets.symmetric(vertical: 8, horizontal: 8)` (`wrappers_to_add.dart:13-26`). "On a Group, the first Padding shows in the Group's own
  **Padding** row": `block_field.dart:795-806` (first Padding skipped for groups) and `packages/designer/lib/src/details/group_details.dart:143-153` (row label "Padding"
  bound to a Padding parent).
- Align: alignment 0,0, **Alignment** X/Y sliders (`wrappers_to_add.dart:61-70`; `basic_fields.dart:1543-1580`). Constrained Box: empty `BoxConstraints` (`:87-91`).
  Fractionally Sized Box (`:71-75`), Fitted Box (`:55`), Intrinsic Height/Width (`:76-85`): no defaults; labels **Width Factor**, **Height Factor**, **Fit**,
  **Alignment**, **Constraints** are derived (`camelCaseToSpaces`, `packages/core/lib/src/utils.dart:77-79`). Aspect Ratio 1.0 (`:151-157`).
  Safe Area: only the advanced options (`packages/designer/lib/src/details/widget_fields.dart:516-528`; label `Show advanced options`,
  `packages/core/lib/src/fields/block_field.dart:1318-1352`).
- Container wrapper = `containerBlock` (`wrappers_to_add.dart:43`, gray `0xFFC4C4C4`, `default_blocks.dart:7-12`) with the Container editor (research:
  `widget_fields.dart:317-350`). Opacity 0.5 (`:37-41`). Clip radius = `ClipRRect` (`:42`; label "Clip radius" as in code). Transform: `Matrix4.rotationZ(1.0)`,
  alignment 0,0 (`:44-54`). Color Filter: `ColorFilter.mode(0xFFC4C4C4, srcATop)` (`:101-114`). Material: **Color**, **Elevation**, **Shadow Color**, **Tint Color**,
  **Border**, **Border On Foreground** (`basic_fields.dart:1865-1895`; I name three). Badge: label text "99" (`:158-162`). AnimatedContainer: 300 ms, gray (`:178-187`).
- Gesture Detector: **On Tap**, **On Secondary Tap**, **On Double Tap**, **On Long Press**, rest under advanced options (`widget_fields.dart:488-514`). Ink Well: **On Tap**,
  **Border Radius**, **Focus Color**, **Hover Color**, **Highlight Color**, **Splash Color** (`:460-486`). Dismissible: `UniqueKey`, **On Dismissed** (derived) (`:168-172`).
  Refresh Indicator: empty `onRefresh` (`:173-177`). Interactive Viewer (`:95-99`): "pan and zoom". Tooltip: message "Tooltip message" (`:163-167`).
- Visibility: **Visible** on, **Replacement** (research `text_fields.dart:806-819`); linking to a bool: `logic/expressions.md` "Show or hide a widget" (W5).
  Scroll View (`:56-60`): **Scroll Direction** derived. I left out "Expand is not offered along the scroll direction" (it is on `design/layout.md`, `size_fields.dart:5-41`).
- Text Direction: `Directionality(textDirection: ltr)` (`:115-119`); `ltr`/`rtl` as on `design/localization.md` (W4). Default Text Style (`:120-124`).
- Data Builder wrapper: `createDataBuilderBlock` (`:86`); link to `integrations/show-data.md` (W14). Notifier Builder: **Notifier** dropdown lists notifiers from the screen's
  variables and global states (`packages/core/lib/src/fields/data_field.dart:53-117`); text matches `logic/global-state.md` "Rebuild only part of a screen" (W6).
- Form: `formKey` variable (`widget_info.dart:502-506`); **Screen** = `Scaffold` wrapper with **Color**, **App Bar**, **Drawer**, **Floating Action Button**, **Bottom Navigation Bar**, **Size**,
  **Route Settings** (`widget_fields.dart:202-259`; I list the four slots). Drawer wrapper: `CallExpr.klass($Drawer)` (`wrappers_to_add.dart:93`).

### Left out (on purpose)

- Per-wrapper field lists beyond the one or two a reader needs (research has them); `design/properties.md` and Details itself show the rest.
- "Individual padding" button of the Padding editor, the Opacity **Always Include Semantics** option, Scroll View **Reverse** / **Primary**, Material
  **Border On Foreground** (old single pages cover them; not re-verified as UI labels beyond derivation): not needed for one-liners.
- The old pages' "When to use" essays (padding, scroll view, visibility): replaced by one line each.
- Notifier Builder internals (ChangeNotifier): the page says "a notifier you pick".
- The `Expanded` / `Positioned` / `SizedBox` layout wrappers: not in the Add Wrapper list (only mentioned as "position and size are not in this list").

### Assumptions and open questions

1. **Anchor offset under the sticky navbar** (both pages): see page 1 notes; needs one CSS rule from the orchestrator.
2. **Pages that must exist before the build** (broken links throw: `docusaurus.config.js:38-43`): `docs/reference/widgets/lists.md`, `navigation.md`, `media.md` (W13b, not
   written at my last check). Page 1 links to them (and to `forms.md` and `design/properties.md`, which now exist); page 2 links to `forms.md` and `properties.md`.
3. **Category names**: the picker draws no group headings in 3.12.5 (flat list, confirmed in code and `captures/ui-map/11-widget-picker.png`). The catalog groups by the code's
   `widgetCategories` anyway, as the brief asks, and says so in one sentence. If a later release draws headings, the sentence "without group headings" must go.
4. **Components chip also lists screens** (code: no `isScreen` filter); the catalog says "your own components". Not confirmed live (research open question 2).
5. **3.13 (dev)**: Ctrl/Cmd+K and the **Widget** tool open the new **Library** panel in add mode instead of this picker (`upcoming-3.13.md`; research "3.13 (dev) changes"); the 45
   entries and the 32 wrappers are unchanged. Page 1's "Find a widget in the picker" section must be revisited when 3.13 ships.
6. Several Details labels on the pages are derived from parameter names (`camelCaseToSpaces`), not seen on screen: **Index**, **First Child**, **Second Child**, **Cross Fade State**,
   **Duration**, **Spacing**, **Run Spacing**, **Initial Video Id**, **Initially Expanded**, **Children**, **Items**, **On Selected**, **Min**, **Max**, **Value**, **On Changed**, **Constraints**, **Width Factor**,
   **Height Factor**, **Fit**, **Border Radius**, **On Dismissed**, **On Refresh**, **Scroll Direction**, **Current Index**, **Controller**, **Size**, **Color**, **Data**, **Selectable**, **On Tap**,
   **Visible**, **Replacement**, **Alignment** (Fitted Box). A verifier with a live editor should spot-check a few.
7. "Spins until you set **Value**" (progress indicators) and "Typically used as the item of a List View" are Flutter semantics / the picker's own description, not Nowa-specific code.
8. The Request a Widget dialog sends the text with the account email and date (`packages/core/lib/src/dialogs/dialog_data_sender.dart:24-28`); I did not mention it on the page. Say so if you want
   a privacy line there. (The same file holds the hard-coded credential noted in research open question 13: not docs content.)

### Coverage notes

- Both pages cover every "Must cover" item in `pages.md` rows `widgets/index.md` and `wrappers.md` (45 widgets with anchors and links; 32 wrappers; add, reorder, remove).
- Features not in `pages.md` that I added: the one-sentence note that the **Layout** section (position and size) is not part of the wrapper list; the Group-Padding quirk in the Padding row;
  the nine package widgets listed in the catalog intro (with **Add Missing Dependencies**).
- Redirect targets: the 36 widget and 7 wrapper anchors in `redirects.md` all exist; `/ui/layout/groups` stays on `design/layout.md#groups` (Group row links there, as the app does).
- Inbound links already written by others: `design/add-widgets.md` and `design/layout.md` -> `reference/widgets/index.md`, `logic/expressions.md` -> `reference/wrappers.md`, `legacy/tutorials/loading-indicator.md` -> catalog.
