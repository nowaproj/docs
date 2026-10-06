# W13a writer notes: Reference / Widget catalog and Wrappers

Pages: `docs/reference/widgets/index.md` (Widget catalog), `docs/reference/wrappers.md` (Wrappers). Code refs are relative to
`/home/user/nowa-master` (v3.12.5, b84bfdafd). Research used: `features-widgets.md` ("Catalog of built-in widgets (45)", "Wrappers",
"Widget picker", "Request a Widget", "Add Missing Dependencies", "Add Wrapper", "Open questions"). Every default and label I put on the
pages was re-read in code (the research held up; see "Differences from research" for the few places I deviated). Both pages compile as
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
- Link targets that did not exist when I wrote the page (build fails on broken links, so they must exist before the build):
  `./forms.md`, `./lists.md`, `./navigation.md`, `./media.md` (W13b), `../wrappers.md` (my page 2), `../../design/properties.md` (W4b/W19).
  All other links and anchors I checked resolve: `design/add-widgets.md#add-a-widget-that-needs-a-package`, `design/layout.md#groups` and
  `#scroll-or-wrap-content`, `design/fonts-icons.md#choose-an-icon`, `logic/expressions.md#dollar`, `logic/popups.md#show-a-dialog`.
- I did not link into W13b's pages with anchors (they were being written at the same time).
- Anchors in table cells land under the sticky navbar (Docusaurus only gives headings a `scroll-margin-top`:
  `node_modules/@docusaurus/theme-common/lib/utils/anchorUtils.module.css:9`; `src/css/custom.css` has no rule). **Suggestion for the
  orchestrator** (I may not edit `src/`): add to `src/css/custom.css`
  `table span[id] { scroll-margin-top: calc(var(--ifm-navbar-height) + 0.5rem); }` (if a browser ignores scroll-margin on empty inline
  elements, use `display: block; position: relative; top: calc(-1 * (var(--ifm-navbar-height) + 0.5rem));` instead). The same applies to
  the wrapper anchors on page 2.
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

**Rows** (defaults are in the entries of `widgets_to_add.dart`)
- Container: gray box `default_blocks.dart:7-12`; **Shape** tool places `containerBlock` (`designer_tools.dart:91`); wrapper
  `wrappers_to_add.dart:43`.
- Text: "Write something" (`default_blocks.dart:317`, research; same on `design/add-widgets.md`); `$` inserts a variable (`basic_fields.dart:53-180`,
  `logic/expressions.md:41`). **Style** label: research (Text styles).
- Text Field: `TextFieldConnector` creates a `text` controller variable linked to slot `controller`
  (`packages/core/lib/src/interpreter/widget/text_field_info.dart:14-36`); validators: `form_fields.dart` (research).
- Icon: `Icons.star_border_rounded` (`widgets_to_add.dart:156-166`); icon picker is on `design/fonts-icons.md`.
- SizedBox: 100 by 100 (`:169-173`). "Earlier docs called it Empty widget": `redirects.md` (old slug `empty-widget`, old page title
  "How to use SizedBox (Empty widget)").
- Image: tabs Network / Asset / Bytes and **Pick Image**: `basic_fields.dart:888-950` (name `'Image'` `:920`), `asset_fields.dart:52,172-173`
  (`'Pick $name'`). SVG: `.svg` only `basic_fields.dart:1228`, name `'SVG'` `:1222`; package `widget_info.dart:571-577`.
- Button: label "Button", empty On Pressed (`:205-211`). Icon Button: "add" icon, events from research (`On Pressed`, `On Long Press`,
  `On Hover`; same labels as `logic/events.md`). Floating Button: "add" icon (`:224-237`); slot behavior: `ScaffoldRule`
  (`packages/designer/lib/src/design_experience/drag_rule.dart:393-440`: App Bar, Floating Action Button, Bottom Navigation Bar and Drawer
  go into their slot when dropped on a screen).
- Group: empty Stack (`:242-252`, `default_blocks.dart:290-296`); docUrl `/ui/layout/groups` so I link `design/layout.md#groups`.
- TabView: two tabs "Tab1"/"Tab2" and two text pages (`:255-294`).
- List View: Builder, 3 items (`:297-321`); Grid View: Builder, 2 columns, 3 items (`:324-361`); **List** / **Connect** and **Type**
  (**Normal** / **Builder**) as on `integrations/show-data.md` (W14) and `features-widgets.md` "Lists and grids".
- Swipeable Stack: `flutter_card_swiper`, `swiperController` (`widget_info.dart:410-426,455`); "at most two cards" from the note
  `packages/core/lib/src/fields/swipeable_stack_fields.dart:96`.
- Page View: a Stack with a `PageView` (pages "first page" and "second page") and an `AnimatedSmoothIndicator` (count 2, active index 0,
  8 from the bottom): `default_blocks.dart:269-288`; **Effect type**: `basic_fields.dart:2006`. I say only that the dots are "a separate
  indicator on top of the pages" (verified) and do not say how or whether they follow the pages (not verified; research open question).
- Indexed Stack (`:404-415`): link **Index** to a variable, `pageIndex` of a Bottom Navigation Bar (`nav_bar_info.dart:17`). Cross Fade:
  two placeholders, `showFirst`, 200 ms (`:418-438`).
- Wrap: empty, horizontal (`:441-453`). **Spacing** / **Run Spacing** are derived labels (`camelCaseToSpaces`, `packages/core/lib/src/utils.dart:77-79`).
  Link target `design/layout.md#scroll-or-wrap-content` (W4).
- Data Builder: `:456-465`; **Source** values and "usually easier as a wrapper": `integrations/show-data.md` (W14); wrapper
  `wrappers_to_add.dart:86`.
- Video Player: BigBuckBunny sample, tabs and **Auto Play** / **Show Controls Bar** (`basic_fields.dart:975-1020`); the board shows a "Designer
  mode" placeholder (`widget_info.dart:340-357`). I did not describe where it plays (open question 8 in research).
- YouTube Player: id `9Q2MZes5lt8`, **Initial Video Id** (derived label); the board shows `YouTubeVideoPlaceholder` (thumbnail and title per
  research, `youtube_library.dart:418-466`; `widget_info.dart:313-327`).
- Lottie: `.json` only (`basic_fields.dart:1174`), **Pick Lottie** (name `'Lottie'` `:1168`). Rive: `.riv` only (`:1287`), **Artboard** (`:1448`) and
  **State Machine** (`:1482`).
- AnimatedContainer: 300 ms, gray fill (`:548-557`); wrapper `wrappers_to_add.dart:178-187`.
- Circular / Linear Progress Indicator: no `value` set, so it spins (`:562-585`); "set **Value**, a number from 0 to 1" is Flutter's own rule for
  these widgets (not code in Nowa); linear 200 wide (`:583`).
- Checkbox / Switch: value true, empty `onChanged` (`:590-629`). Popup Menu Button: "Popup Menu" and "Item 1" (`:632-655`). Dropdown menu:
  item "first" (`:658-687`). Slider: 0.5 (`:690-707`). Pin Code Field: 6 boxes, **Pin Code Length** and the "maximum length ... 6" note
  (`packages/core/lib/src/fields/pin_code_fileds.dart:26-30`), `pinCode` connector (`widget_info.dart:492`).
- App Bar: title "Title" (`:736-747`). Bottom Navigation Bar: items "home" and "call"; `BottomNavBarConnector` creates `pageIndex`, links
  `currentIndex` and sets `onTap` (`packages/core/lib/src/interpreter/widget/nav_bar_info.dart:14-45`). Drawer: empty column (`:777-788`);
  wrapper `wrappers_to_add.dart:93`. List Tile "Tile", Expansion Tile "Tile" plus a placeholder child, Alert Dialog "Hello" (`:791-832`). "Typically
  used as the item of a List View" paraphrases the picker description "A single fixed-height row typically used in a scrolling list."
- Alert Dialog "to show it in a running app, add a `showDialog` step": `logic/popups.md` "Show a dialog" (W5): `showDialog` content starts as an `AlertDialog`.
- Admob Banner: `showTestAds` true (`:837-850`); **Settings** → **Integrations** path as in the W17 pages. Web View: `https://nowa.dev`
  (`:853-865`); the board placeholder reads "Web view to {url} / Run to preview" (`web_view_info.dart:11`); `https://` is added when missing (research,
  `widget_fields.dart:392-458`). Html: `<h1>Hello World</h1>`, **Data** (`:868-878`); Markdown: `# Hello World`, **Data**, **Selectable**
  (`:881-888`, research). Google Maps and RevenueCat Paywall: `:891-926`; placeholders "Run to preview"
  (`integration_preview_view.dart:46`).

### Left out (on purpose)

- Starting sizes (width by height) and starting-size tables from research: too much detail for a catalog; only recognizable starting content is shown.
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
