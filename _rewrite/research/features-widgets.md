# Features: Widgets, wrappers and the properties panel

Source: /home/user/nowa-master (v3.12.5). Researcher: research subagent "Widgets, wrappers and the properties panel". Date: 2026-10-06.

> STATUS: DRAFT 1 (saved early). Catalog skeleton from `packages/core/lib/src/widgets_to_add/widgets_to_add.dart`. Columns "notable properties" and "Nowa-specific setup" and all other sections are being filled in.

## Catalog table (45 built-in entries)

Order below is the order of `widgetCategories` (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:69-80`) and of the flat `widgetsToAdd` list (`:82-112`) that the Ctrl/⌘+K picker shows.

| # | Name as shown | Category | Description (from code) | Notable properties | Nowa-specific setup? | docUrl in code |
|---|---|---|---|---|---|---|
| 1 | Container | Basic | "A flexible widget that enables many design options." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/container |
| 2 | Text | Basic | "A run of text with a single style." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/text |
| 3 | Text Field | Basic | "A text field lets the user enter text, either with hardware keyboard or with an onscreen keyboard." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/textfield |
| 4 | Icon | Basic | "A widget that displays a Icon." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/icon |
| 5 | SizedBox | Basic | "A box with a specified size." | TBD | TBD | none |
| 6 | Image | Images | "A widget that displays an image." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/image |
| 7 | SVG | Images | "Display scalable vector graphics (SVG) images in your app." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/svg |
| 8 | Button | Buttons | (none) | TBD | TBD | none |
| 9 | Icon Button | Buttons | (none) | TBD | TBD | none |
| 10 | Floating Button | Buttons | "A button that floats above the interface" | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/floating-action-button |
| 11 | Group | Layout | "Group widgets together to control their layout.\nStack: overlays widgets\nRow: arranges widgets horizontally\nColumn: arranges widgets vertically." | TBD | TBD | https://docs.nowa.dev/ui/layout/groups |
| 12 | TabView | Layout | "Organize content into tabs, allowing users to switch between different sections." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/tabview |
| 13 | List View | Layout | "A scrollable list of widgets, arranged linearly." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/listview |
| 14 | Grid View | Layout | "A grid list of items, scrollable, 2D array of widgets." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/gridview |
| 15 | Swipeable Stack | Layout | "This is a Flutter package for a Tinder-like card swiper." | TBD | TBD | none |
| 16 | Page View | Layout | "Display a scrollable list of pages, one at a time." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/pageview |
| 17 | Indexed Stack | Layout | "Stack of widgets where only one is visible at a time, controlled by its index." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/index-stack |
| 18 | Cross Fade | Layout | "A widget that cross-fades between two given children." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/cross-fade |
| 19 | Wrap | Layout | "A layout widget that arranges its children in multiple rows or columns." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/wrap |
| 20 | Data Builder | Layout | "Dynamically build UI elements based on a collection of data." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/data-builder |
| 21 | Video Player | Players | "A widget that displays an Video Player." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/video-player |
| 22 | YouTube Player | Players | "A widget that displays an YouTube Player." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/youtube-player |
| 23 | Lottie | Animations | "A widget allows seamless integration of Lottie animations, which are vector animations in JSON format or links" | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/lottie |
| 24 | Rive | Animations | "Integrate animations created with the Rive tool into your app." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/rive |
| 25 | AnimatedContainer | Animations | (none) | TBD | TBD | none |
| 26 | Circular Progress Indicator | Progress Indicators | "Show a circular loading indicator to indicate that a task is in progress." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/loading-circular |
| 27 | Linear Progress Indicator | Progress Indicators | "Show a linear loading indicator to indicate that a task is in progress." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/linear-progress-indicator |
| 28 | Checkbox | Forms | "A material design checkbox." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/checkbox |
| 29 | Switch | Forms | "A material design switch." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/switch |
| 30 | Popup Menu Button | Forms | (none) | TBD | TBD | none |
| 31 | Dropdown menu | Forms | "A dropdown widget for selecting a single option from a predefined list, enhancing user interaction and input within your Flutter app." | TBD | TBD | none |
| 32 | Slider | Forms | "Custom Slider widget that can be customized to fit your design." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/slider |
| 33 | Pin Code Field | Forms | "A widget for entering and verifying a pin code (OTP)." | TBD | TBD | none |
| 34 | App Bar | Screen Components | "A widget in Flutter is a top-level container that typically serves as the primary navigation and title area in a mobile app." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/appbar |
| 35 | Bottom Navigation Bar | Screen Components | "A widget that displays a navigation bar at the bottom of the screen." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/navigation-bar |
| 36 | Drawer | Screen Components | "A sliding menu that is typically used for navigation or accessing additional options in an app." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/drawer |
| 37 | List Tile | Screen Components | "A single fixed-height row typically used in a scrolling list." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/listtile |
| 38 | Expansion Tile | Screen Components | "Expandable tile that can be used to create a list of expandable items." | TBD | TBD | none |
| 39 | Alert Dialog | Screen Components | "Display a pop-up dialog with a message and optional actions." | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/alert-dialog |
| 40 | Admob Banner | Integrations | "Rectangular ads that appear at the top or bottom of the device screen. Banner ads stay on screen while users are interacting with the app, and can refresh automatically after a certain period of time. " | TBD | TBD | https://docs.nowa.dev/ui/widgets/widget-desc/admob-banner |
| 41 | Web View | Integrations | "Embed a web page or web content within your app." | TBD | TBD | ` https://docs.nowa.dev/ui/widgets/widget-desc/webview` (leading space in code) |
| 42 | Html | Integrations | "Render HTML content within your Flutter app." | TBD | TBD | none |
| 43 | Markdown | Integrations | "Display formatted text using Markdown syntax." | TBD | TBD | none |
| 44 | Google Maps | Integrations | "Interactive map widget powered by Google Maps with support for markers, polygons, and custom styling." | TBD | TBD | none |
| 45 | RevenueCat Paywall | Integrations | "Pre-built paywall UI for in-app purchases and subscriptions powered by RevenueCat." | TBD | TBD | none |

## Wrappers ("Add Wrapper")

32 wrappers in `wrappersToAdd` (`packages/core/lib/src/wrappers_to_add.dart:12-188`), shown in this order, no categories. There are no description strings for wrappers in the code, so the one-liners below are derived from the Flutter class the wrapper creates and the default values the code sets.

| # | Name as shown | Creates | Defaults set by Nowa | Code |
|---|---|---|---|---|
| 1 | Padding | Padding | padding: symmetric, vertical 8.0, horizontal 8.0 | `wrappers_to_add.dart:13-26` |
| 2 | Visibility | Visibility | visible: true | `:27-31` |
| 3 | Gesture Detector | GestureDetector | none | `:32-36` |
| 4 | Opacity | Opacity | opacity: 0.5 | `:37-41` |
| 5 | Clip radius | ClipRRect | none | `:42` |
| 6 | Container | Container | decoration: BoxDecoration, color 0xFFC4C4C4 (grey) | `:43` (`containerBlock`, `default_blocks.dart:7-12`) |
| 7 | Transform | Transform | transform: Matrix4.rotationZ(1.0); alignment: Alignment(0.0, 0.0) | `:44-54` |
| 8 | Fitted Box | FittedBox | none | `:55` |
| 9 | Scroll View | SingleChildScrollView | none | `:56-60` |
| 10 | Align | Align | alignment: Alignment(0.0, 0.0) | `:61-70` |
| 11 | Fractionally Sized Box | FractionallySizedBox | none | `:71-75` |
| 12 | Intrinsic Height | IntrinsicHeight | none | `:76-80` |
| 13 | Intrinsic Width | IntrinsicWidth | none | `:81-85` |
| 14 | Data Builder | DataBuilder | builder (widget), loadingWidget (centered CircularProgressIndicator), errorBuilder (centered red Text of the error) | `:86` (`createDataBuilderBlock`, `default_blocks.dart:223-267`) |
| 15 | Constrained Box | ConstrainedBox | constraints: BoxConstraints() | `:87-91` |
| 16 | Material | Material | none | `:92` |
| 17 | Drawer | Drawer | none | `:93` |
| 18 | Ink Well | InkWell | none | `:94` |
| 19 | Interactive Viewer | InteractiveViewer | none | `:95-99` |
| 20 | Safe Area | SafeArea | none | `:100` |
| 21 | Color Filter | ColorFiltered | colorFilter: ColorFilter.mode(color 0xFFC4C4C4, blendMode srcATop) | `:101-114` |
| 22 | Text Direction | Directionality | textDirection: ltr | `:115-119` |
| 23 | Default Text Style | DefaultTextStyle | style: TextStyle() | `:120-124` |
| 24 | Form | Form | none | `:125-131` |
| 25 | Screen | Scaffold | none | `:132-138` |
| 26 | Notifier Builder | NotifierBuilder | builder: widget function with `context` | `:139-150` |
| 27 | Aspect Ratio | AspectRatio | aspectRatio: 1.0 | `:151-157` |
| 28 | Badge | Badge | label: Text "99" | `:158-162` |
| 29 | Tooltip | Tooltip | message: "Tooltip message" | `:163-167` |
| 30 | Dismissible | Dismissible | key: UniqueKey() | `:168-172` |
| 31 | Refresh Indicator | RefreshIndicator | onRefresh: empty function | `:173-177` |
| 32 | AnimatedContainer | AnimatedContainer | duration 300 ms; decoration color 0xFFC4C4C4 | `:178-187` |

(TBD: user-terms one-liners, see next save.)

## Widget picker (DRAFT notes, to be turned into the Features entry)

- **Opens with:** Ctrl+K (Windows/Linux) or ⌘+K (macOS): `AdaptiveActivator(LogicalKeyboardKey.keyK)` -> `OpenWidgetsDialogIntent` (`packages/designer/lib/src/designer_setup.dart:48`; `AdaptiveActivator` = Ctrl on non-Mac, Meta on Mac, `packages/core/lib/src/inputs.dart:22-25`). Also the bottom toolbar tool with tooltip **Widget** (`packages/designer/lib/src/widgets/designer_tools.dart:174-184`). Not enabled while another overlay is open (`add_actions.dart:8-11`) and not registered in view-only projects (`designer_setup.dart:117`).
- **Surface:** a floating command palette, not a grid. Search hint "Search for a widget" (`packages/core/lib/src/widgets/widget_picker.dart:146`); link "Request a Widget" opens a dialog titled "Request a Widget" ("Is there a widget you want that is missing from our library? Let us know!", button "Submit Request", `packages/core/lib/src/dialogs/feedback_dialogs.dart:76-90`); filter chips under "Search for:" are `All`, `BuiltIn`, `Components` (`widget_picker.dart:191`, `packages/command_palette/lib/src/widgets/filter_section_widgets.dart:25`); footer hints "to select", "to navigate", "to close" with Enter, up/down arrows, esc (`packages/command_palette/lib/src/widgets/command_palette_instructions.dart:36-68`).
- **Order and categories:** the list is flat and in the order of `widgetsToAdd` (Basic, Images, Buttons, Layout, Players, Animations, Progress Indicators, Forms, Screen Components, Integrations). The category names exist in `widgetCategories` (`widgets_to_add.dart:69-80`) but the only code that draws them as headings (`WidgetPicker` + `CategorizedGridView`, `widget_picker.dart:57-129`) is used only by `ToolBoxPanel` (`packages/designer/lib/src/panels/tool_box_panel.dart:13`), which nothing references. See Open questions.
- **Search:** fuzzy match on the widget name only (`kDefaultFilter`, `packages/command_palette/lib/src/controller/command_palette_controller.dart:264-288`; `filter` in `widget_picker.dart:192-195`), results sorted by match score; no search on description or category.
- **Preview popup** to the right of the list for the highlighted row (`DetailsPopup`, `command_palette_modal.dart`): picture or live render, name, description, a "Dependencies" list when the widget needs packages, and a link "Open Documentation." when the widget has a `docUrl` (`widget_picker.dart:214-288`). Preview source order: custom preview (Swipeable Stack, YouTube Player, Web View, RevenueCat Paywall), else a bundled image (`imagePath`), else the widget rendered live in design mode with the project theme (`widget_picker.dart:290-324`).
- **Project components:** after the built-in list, the picker loads every widget class found in the project's `lib` folder except one named `MyApp` (`CustomWidgetsFinder`, `widget_picker.dart:21-38`), with a purple widgets icon (`widget_picker.dart:394`), and the `Components` filter narrows to them. Description shown = the class doc comment (`nowa_widgets.dart:139-141`).
- **Adding:** Enter or click on a row -> palette closes -> the widget is placed at the pointer position on the board (`placeWidgetData` -> `placeBlock` uses `board.pointerLocation`, `packages/designer/lib/src/design/common_design.dart:194-222`) and dropped into whatever container the drag rules find under it. Dragging a row onto the canvas does the same (rows are `Draggable`; dragging closes the palette, `widget_picker.dart:461-487`). Widgets with a missing package are not draggable; selecting them first shows the dialog "Add Missing Dependencies" ("This widget requires the following dependencies", buttons "Cancel" / "Add", "Adding..." while working, `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:6-110`; flow in `widget_picker.dart:403-413`).
- **Same picker is reused** for: toolbar **Widget**; "Replace with..." in the widget right-click menu (`packages/designer/lib/src/menus/widget_context_menu.dart:48-65`); the **+** next to an empty "Empty" base-widget row (`widget_details.dart:281-307`); widget-typed fields such as Scaffold `appBar`/`drawer`/`floatingActionButton`/`bottomNavigationBar` (`basic_fields.dart:406-440`, `nowa_fields.dart:436`); the item/builder slots of List View, Grid View, Data Builder (`BFWidgetFunction`, `basic_fields.dart:464-532`); the Group header menu "Replace with..." (`group_details.dart:80-100`).
- **BETA tag:** the picker can show a green `BETA` pill (`_BetaLabel`, `widget_picker.dart:491-519`) but no widget in the list sets `isBeta: true`.

## Properties (Details) panel (DRAFT notes)

- **Where:** floating panel titled **Details**, docked top-right under the **Variables** panel, resizable by its left edge (starts 240 px wide, min 200, max 35% of the window); both panels are only drawn when the window is at least 600 px wide and not in code mode (`packages/designer/lib/src/designer_setup.dart:166-232`). Content follows the selection (`DetailsPanel`, `packages/core/lib/src/panels/details/details_panel.dart:52-77`); with nothing selected a board shows **Show Grid** / **Board Color** / **Reset** (`board_details.dart:33-66`); a screen opened on its own shows its widget details.
- **Sections of a widget selection (top to bottom)** (`packages/designer/lib/src/details/widget_details.dart:170-202`): breadcrumbs (owner / parent / selection, clickable); name row (widget name; **Create a component** button for plain widgets, or **Rename** + **Open in New Tab** for components, `name_group.dart:96-130`); one-line description (`Add description` placeholder, opens a description editor with back arrow "Back to fields", hint "Describe this widget, what it is for and how to use it."; only for widgets from the project's own source, otherwise "This widget has no source to document.", `widget_details.dart:360-527`); a warning box titled "Kept as code" if the widget could not be loaded (`:531-563`); **Layout** (+ button; X, Y, W, H and size modes **Fixed** / **Auto** / **Expand**, `layout_details.dart:49-90`, `size_fields.dart`); the widget's own fields (widget-specific editor or the default class editor); one section per wrapper (drag handle, name, `...` menu); **Add Wrapper** button (only when exactly one widget is selected and it can be wrapped, `widget_details.dart:145-148,189-199`). Several widgets selected: header "Widget x N" and fields that differ show "Mixed" (`name_group.dart:15-24`).
- **Field labels** are the Flutter parameter names split into words: first letter capitalised, a space before each capital (`camelCaseToSpaces`, `packages/core/lib/src/utils.dart:77-79`; label chosen in `block_field.dart:230-241`). Several editors rename labels (for example Image `colorBlendMode` -> "Blendmode", Lottie `reverse` -> "Boomerang", Container decoration `borderRadius` -> "Radius", `boxShadow` -> "Shadows", `backgroundBlendMode` -> "Blend Mode", AppBar `backgroundColor` -> "Background").
- **Per-field help:** hover a label for 0.5 s -> tooltip "<Dart type> <label>" plus the parameter's doc summary when the widget comes from project source (`block_field.dart:1003-1013`). No per-widget "?" link in the panel; the only per-widget docs link is "Open Documentation." in the picker preview (`widget_picker.dart:266-283`). The "?" button on the canvas is the general help menu (Tutorials, Documentation, Community, Shortcuts, Report an issue, Share feedback, `lib/widgets/help_icon.dart:34-86`).
- **Reset / null:** right-click a field -> "Reset to default" (removes the value, or restores a default when the parameter is required) and, for nullable parameters, "Set to null" (`block_field.dart:810-842`, `remove()` at `:256-280`). Dev (3.13) keeps both entries.
- **Link a property:** click the field label (turns orange on hover) -> link menu titled "Link <label>" with a search box and suggestions (variables, params, functions, theme values) filtered by the property type; extra entries "Custom Expression...", "Detach..." (red), "Create Param...", "Create Variable...", "Compute...", "Edit", "Open in Circuit" (`field_link_menu.dart:376-398`, `link_menu.dart:56-276`). In text fields typing `$` opens a variable picker and inserts `{name}` into the text (`basic_fields.dart:105-119`).
- **Advanced options:** many editors end with a text link "Show advanced options" / "Hide advanced options" (`AdvancedOptions`, `block_field.dart:1318-1352`).
- **Editors by type** (registry `BlockField.allFields`, `block_field.dart:27-95`, plus `designer_plugin.dart:45-71`): text (`String`, multi-line for Text/Html/Markdown), numbers (`int`, `double`; optional min/max), switch (`bool`), colour (swatch + HEX + opacity, popup picker with saturation/hue, opacity slider, eyedropper button, "HEX" and "OP" fields, "Colors From Theme" tiles `primary`, `onPrimary`, `secondary`, `onSecondary`, `tertiary`, `onTertiary`, `error`, `onError`, `surface`, `onSurface`, `shadow` and a "Show more colors" link; for Container fills a dropdown Solid / Linear / Radial / Sweep, `color_fields.dart:560-940`, `basic_fields.dart:290-380`), icon (button showing the icon and its name or `none`, opens popup "Icons" with search and a grid of Material icons, tooltips show icon names, `icon_field.dart:38-205`), text style (button opens popup ".. / Typography / <label>" with preview and a Reset-to-default icon; Font Family, Font Weight [Thin, Extra Light, Light, Normal, Medium, Semi Bold, Bold, Extra Bold, Thick], Decoration icons [none, line-through, underline, overline], Font Size, Color, Background, Letter Spacing, Height, Shadows; link-menu extras "Modify Style", "CopyWith", "Remove CopyWith"; `text_fields.dart:60-300`), padding (`EdgeInsets`: two number boxes Horizontal/Vertical, button tooltip "Individual padding" switches to left/top/right/bottom, `basic_fields.dart:744-870`), alignment (sliders X/Y, labelled Horizontal/Vertical, -1..1, `basic_fields.dart:1543-1580`), border radius (one number plus a button to set each corner TL/TR/BL/BR, `basic_fields.dart:605-705`), enums (dropdown of the enum values, `basic_fields.dart:1510-1540`), image source (tabs Network / Asset / Bytes; asset tab = button "Pick Image"), asset picker (popup "Pick {name}" with button "Upload {name}", a search box and the project's `assets` files with thumbnails, `asset_fields.dart:14-200`), events/functions (`onPressed`-style fields open the circuit editor; widget-returning functions offer "Pick Widget" / "Edit in circuit", `basic_fields.dart:532-560,464-528`), widget slots (`BFWidget`: button naming the widget plus an edit button, opens the same picker, `basic_fields.dart:406-440`, `nowa_fields.dart:420-480`), lists (`BFList`, add/remove rows), durations (button showing e.g. a short duration, popup "Duration"), shapes/borders and `WidgetStateProperty` styles (Button Style).
- **Connectors (Nowa adds variables for you):** adding some widgets silently creates a state variable and wires it in, removing the widget removes the variable: Text Field / TextFormField -> `text` (TextEditingController) in `controller`; Pin Code Field -> `pinCode`; Form -> `formKey`; Swipeable Stack -> `swiperController`; Bottom Navigation Bar -> `pageIndex` (int, 0) in `currentIndex` plus an `onTap` that sets it and calls `setState` (`widget_blocks.dart:195-209`, `text_field_info.dart:14-24`, `widget_info.dart:244-300,305-340`, `nav_bar_info.dart:12-45`). Names are made unique (`text`, `text2`...; `generateSymbolName`).
- **Names shown in Outline / Details can differ from the picker name:** Button (ElevatedButton), SVG Image (SvgPicture), Dropdown Menu (DropdownButtonFormField), Youtube Player, Slider (NSlider), TextField (TextFormField), Screen (Scaffold), Clip radius (ClipRRect), Scroll View (SingleChildScrollView), Color Filter, Text Direction, TabView Controller (DefaultTabController) (`widget_info.dart:182-420`).

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| (to be filled) | | |

## Open questions
- (to be filled)
