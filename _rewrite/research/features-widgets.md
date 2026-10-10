# Features: Widgets, wrappers and the properties panel

Source: /home/user/nowa-master (v3.12.5, b84bfdafd). Researcher: widgets research subagent (feeds D5, widget catalog). Date: 2026-10-06. Dev (3.13) compared against /home/user/nowa (changes in "3.13 (dev) changes" lines only).

How to read this file: section "Catalog" has the 45-widget table the picker offers. "Wrappers" has the 32-wrapper list. "Features" has one entry per feature in the FORMAT.md shape (picker, Add Wrapper, Details panel and its editors, and the widgets that need a dedicated page). "Proposed dedicated pages" turns that into a page list. Labels are quoted as the code writes them. Field labels in the Details panel are the Flutter parameter name split into words ("clipBehavior" shows as "Clip Behavior", `block_field.dart:230-241`, `utils.dart:77-79`); where this file says a label is "derived", it was computed from that rule, not seen on screen.

## Summary

- **Widget picker** (Ctrl/⌘+K, or the toolbar's **Widget** tool): floating search palette that lists 45 built-in widgets plus every widget class in the project, with a live preview, description and "Open Documentation." link.
- **Request a Widget**: link in the picker's search bar that sends a free-text request to the Nowa team.
- **Add Missing Dependencies**: dialog that appears when a picked widget needs a package the project does not have yet.
- **Add Wrapper** (Details panel): picker of 32 wrappers (Padding, Visibility, Gesture Detector, ...) that wrap the selected widget; wrappers can be reordered by dragging and removed from a "..." menu.
- **Details** panel: floating panel top-right; breadcrumbs, name, **Layout**, the widget's own fields, one section per wrapper, **Add Wrapper**.
- **Field editors**: text, number, switch, colour, icon, text style, padding, alignment, enum dropdown, image/asset picker, event ("+"/"Edit"), widget slot, list, link menu.
- **Link menu** (click a field name): link a property to a variable, param, function or expression.
- **Reset to default** / **Set to null** (right-click a field).
- **Connectors**: Text Field, Pin Code Field, Form, Swipeable Stack and Bottom Navigation Bar create a variable for you when added.
- **Screen slots**: App Bar, Drawer, Floating Button and Bottom Navigation Bar dropped on a screen go into that screen's matching slot.
- **Integration widgets** (Admob Banner, Google Maps, RevenueCat Paywall) need a package plus keys in project settings.

---

## Catalog of built-in widgets (45)

### How the list is built

The released picker (Ctrl/⌘+K) shows one flat list: first the 45 built-in entries in the order below (`widgetsToAdd`, `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:82-112`), then, after a short load, every widget class found in the project's `lib` folder except one named `MyApp` (`CustomWidgetsFinder`, `packages/core/lib/src/widgets/widget_picker.dart:21-38`, `376-387`). Project entries are shown with a purple widgets icon (`widget_picker.dart:394`) and the **Components** filter chip narrows to them. Per the code this includes screens too (no filter on `isScreen`; the router editor opens the same picker with "Components" preselected to choose a screen: `packages/core/lib/src/editors/router_editor/go_route_node_view.dart:151`). No widgets from installed packages or from Flutter libraries are listed: the only sources are the curated list and the project's own classes. The category names (**Basic**, **Images**, **Buttons**, **Layout**, **Players**, **Animations**, **Progress Indicators**, **Forms**, **Screen Components**, **Integrations**) exist in `widgetCategories` (`widgets_to_add.dart:69-80`), and the flat list follows exactly that order, but the released picker draws no category headings (see Open questions). The table below is grouped by those categories because they are the picker's own order.

### Table

Columns: name exactly as shown in the picker row; what it is in user terms (paraphrase of the code description plus what the default block creates); notable Details-panel properties (labels as the panel shows them; "derived" labels follow the word-splitting rule); Nowa-specific setup (tags: **package** = "Add Missing Dependencies" dialog, **assets**, **data**, **platform**, **integration**, **variable** = Nowa creates a variable, **slot** = lands in a screen slot); docUrl in code (`https://docs.nowa.dev/...`, shown as the path; "none" = no `docUrl` in the entry); code = lines in `widgets_to_add.dart`.

| # | Name as shown | Category | What it is | Notable properties (Details labels) | Nowa-specific setup | docUrl in code | Code |
|---|---|---|---|---|---|---|---|
| 1 | Container | Basic | A box you can fill with a colour, gradient or image, give a border, rounded corners, shadow, padding and margin, and put one widget in. Code text: "A flexible widget that enables many design options." | Fill (colour, or Solid / Linear / Radial / Sweep gradient), Border (Color, Width), Radius (one value or per corner TL/TR/BL/BR), Image (Image, Fit), Blend Mode, Shadows, Alignment, Padding, Margin | none | /ui/widgets/widget-desc/container | 118-126 |
| 2 | Text | Basic | Text in one style; new text reads "Write something". Code text: "A run of text with a single style." | Text (type `$` to insert a variable), Text Align (left / center / right / justify icons), Text Direction, Overflow, Style (Font Family, Font Weight, Decoration, Font Size, Color, Background, Letter Spacing, Height, Shadows); rich text shows "Text Span" | none | /ui/widgets/widget-desc/text | 129-140 |
| 3 | Text Field | Basic | A box where the user types; created as a form-capable text field (`TextFormField`). Code text: "A text field lets the user enter text, either with hardware keyboard or with an onscreen keyboard." | Controller, Decoration (Hint Text, Label Text, Prefix Icon, Border, Filled, Fill Color, Error Text, ...), Min Lines, Max Lines, Obscure Text, Enabled, Text Align, Style, Keyboard Type, Text Input Action, On Changed, On Editing Complete, On Field Submitted, Validator | **variable** (a `text` controller is created and linked); validation: see Dedicated topics "Text Field and forms" | /ui/widgets/widget-desc/textfield | 143-153 |
| 4 | Icon | Basic | One Material icon (starts as a star outline). Code text: "A widget that displays a Icon." | Icon (picker, shows the icon name or `none`), Size, Color; under "Show advanced options": Fill, Weight, Grade, Optical Size, Shadows, Text Direction, Blend Mode, Apply Text Scaling, Semantic Label | none | /ui/widgets/widget-desc/icon | 156-166 |
| 5 | SizedBox | Basic | An empty box of a set size (added at 100 x 100). Code text: "A box with a specified size." | Width, Height, Child (derived) | none | none | 169-173 |
| 6 | Image | Images | A picture from a web address, from the project's assets or from bytes. Code text: "A widget that displays an image." | Image source tabs Network / Asset / Bytes (asset tab button "Pick Image"), Color, Blendmode, Fit, Error Builder | **assets** (pick or upload into the project's assets folder) | /ui/widgets/widget-desc/image | 177-187 |
| 7 | SVG | Images | A vector (.svg) image from the web or an uploaded file. Code text: "Display scalable vector graphics (SVG) images in your app." | Source tabs Asset / Network (asset button "Pick SVG"), Fit, Color Filter, Alignment, Clip Behavior, Placeholder Builder | **package** `flutter_svg`; **assets** (only `.svg` files are accepted) | /ui/widgets/widget-desc/svg | 190-200 |
| 8 | Button | Buttons | A button that runs an action when pressed; its label is a Text inside it (starts as "Button"). Outline name: Button. | Enabled (switch) with "Compute" link, On Pressed, On Long Press, On Hover, Button Style (Background Color, Foreground Color, Shadow Color, Elevation, Side, Radius, or connect to "Button Theme") | actions are built in the circuit editor (click the event's "+") | none | 205-211 |
| 9 | Icon Button | Buttons | A tap target that shows only an icon (starts as the "add" icon). | Icon Size, Tooltip, Enabled, On Pressed, On Long Press, On Hover, Button Style, Padding, Constraints, Alignment | same as Button | none | 214-221 |
| 10 | Floating Button | Buttons | A round action button that floats above the screen (starts with the "add" icon). Code text: "A button that floats above the interface" | Tooltip, Foreground Color, Background Color, Elevation, Mini, Shape, Is Extended, On Pressed (default editor, derived labels) | **slot**: dropped on a screen it goes into the screen's floating-action-button slot | /ui/widgets/widget-desc/floating-action-button | 224-237 |
| 11 | Group | Layout | Puts widgets together and arranges them: stacked on top of each other, in a row, or in a column. Starts as an empty Stack. Code text: "Group widgets together to control their layout." | Header buttons Stack / horizontal / vertical, Alignment (3x3 grid), Main Axis Size, Spacing (Fixed, Between, Around, Evenly), Gap, Children, Padding | none (layout page owns the detail) | /ui/layout/groups | 242-252 |
| 12 | TabView | Layout | Tabs with a page for each; starts with two tabs, "Tab1" and "Tab2". Code text: "Organize content into tabs, allowing users to switch between different sections." | Outline shows "TabView Controller" (Length, Initial Index, Animation Duration), a TabBar (Tabs, Is Scrollable, Indicator Color, Label Color, Unselected Label Color, ...) and a TabBarView (Children); no special editor | none found; nothing in the code keeps Length in step with the number of tabs (see Open questions) | /ui/widgets/widget-desc/tabview | 255-294 |
| 13 | List View | Layout | A scrolling list: one repeated item for every entry of a list (Builder) or a hand-made set of widgets (Normal). Starts in Builder with 3 items. Code text: "A scrollable list of widgets, arranged linearly." | Type (Normal / Builder), List (Connect), Item Count, Item Builder, Separator (None / Fixed Spacing / Widget), Spacing, Scroll Direction, Reverse, Shrink Wrap, Padding, Physics | **data** (connect a list variable): see "Lists and grids" | /ui/widgets/widget-desc/listview | 297-321 |
| 14 | Grid View | Layout | A scrolling grid; same Normal / Builder choice. Starts in Builder with 2 columns and 3 items. Code text: "A grid list of items, scrollable, 2D array of widgets." | Type (Normal / Builder), List, Item Count, Item Builder, grid type Fixed / Max, Cross Axis Count or Max Cross Axis Extent, Main Spacing, Cross Spacing, Main Axis Extent, Child Aspect Ratio, Scroll Direction, Reverse, Shrink Wrap, Padding, Physics | **data** (as List View) | /ui/widgets/widget-desc/gridview | 324-361 |
| 15 | Swipeable Stack | Layout | A deck of cards the user swipes away (up, down, left, right). Code text: "This is a Flutter package for a Tinder-like card swiper." | List (Connect), Cards Count, Card Builder, Displayed Cards, Initial Index, Is Loop, Is Disabled, allowed swipe directions (four arrow toggles), Scale, Back Card Offset, On Swipe, On Undo, On End, On Tap Disabled, On Swipe Direction Change, Controller | **package** `flutter_card_swiper`; **variable** (`swiperController`); on the board at most two cards are drawn ("Only two cards will appear in designer mode, run to see the real view") | none | 364-388 |
| 16 | Page View | Layout | Pages the user swipes between, added together with a dots indicator (a Stack holding a PageView and an indicator 8 px from the bottom). Code text: "Display a scrollable list of pages, one at a time." | PageView: Scroll Direction, Reverse, Controller, Physics, Page Snapping, On Page Changed, Children; indicator: Effect type (WormEffect, SlideEffect, JumpingDotEffect, ExpandingDotsEffect, ScaleEffect, SwapEffect, ScrollingDotsEffect), Count, Active Index | none; the indicator is added with Count 2 and Active Index 0 and is not wired to the pages by Nowa | /ui/widgets/widget-desc/pageview | 391-401 (`default_blocks.dart:269-288`) |
| 17 | Indexed Stack | Layout | Children on top of each other but only the one at Index is visible. Code text: "Stack of widgets where only one is visible at a time, controlled by its index." | Index, Alignment, Sizing, Text Direction, Clip Behavior, Children | none; pairs with the `pageIndex` variable of a Bottom Navigation Bar | /ui/widgets/widget-desc/index-stack | 404-415 |
| 18 | Cross Fade | Layout | Fades between two widgets (First Child, Second Child); added with two grey placeholder boxes and 200 ms. Code text: "A widget that cross-fades between two given children." | First Child, Second Child, Cross Fade State (showFirst / showSecond), Duration, Reverse Duration, First Curve, Second Curve, Size Curve, Alignment, On End | none | /ui/widgets/widget-desc/cross-fade | 418-438 |
| 19 | Wrap | Layout | Lays children out in a row (or column) and continues on a new line when full. Code text: "A layout widget that arranges its children in multiple rows or columns." | Direction, Alignment, Spacing, Run Alignment, Run Spacing, Cross Axis Alignment, Vertical Direction, Clip Behavior, Children | none | /ui/widgets/widget-desc/wrap | 441-453 |
| 20 | Data Builder | Layout | Loads data and builds its child from the result, with a loading and an error state. Code text: "Dynamically build UI elements based on a collection of data." | Source (Firestore / Supabase / API Request), Query / API button (pick a function), that function's parameters, Loading Widget (centered spinner), Error Builder (centered red error text) | **data**: needs a Firebase, Supabase or API collection (see `show-data.md`) | /ui/widgets/widget-desc/data-builder | 456-465 |
| 21 | Video Player | Players | Plays a video from a web URL or an uploaded video with player controls. Code text: "A widget that displays an Video Player." | Source tabs Network / Asset (asset button "Pick Video"), Auto Play, Show Controls Bar | **platform**: on the board it is a "Designer mode" placeholder; in Instant Play inside the desktop app, or for asset videos, it shows "Platform not supported, only available on iOS and Android"; **assets** | /ui/widgets/widget-desc/video-player | 470-491 |
| 22 | YouTube Player | Players | Embeds a YouTube video (starts with video id `9Q2MZes5lt8`, muted, not auto-playing). Code text: "A widget that displays an YouTube Player." | Controller (Initial Video Id, Flags: Hide Controls, Controls Visible At Start, Auto Play, Mute, Is Live, Hide Thumbnail, Disable Drag Seek, Enable Caption, Caption Language, Loop, Force HD, Start At, End At, Use Hybrid Composition, Show Live Fullscreen Button), Width, Aspect Ratio, Controls Time Out, Progress Indicator Color, Show Video Progress Indicator, On Ready, On Ended, Top Actions, Bottom Actions | **package** `youtube_player_flutter`; the board shows the video's thumbnail and title fetched from YouTube | /ui/widgets/widget-desc/youtube-player | 494-519 |
| 23 | Lottie | Animations | Plays a Lottie animation (.json) from the web or an uploaded file. Code text: "A widget allows seamless integration of Lottie animations, which are vector animations in JSON format or links" | Source tabs Network / Asset (asset button "Pick Lottie"), Boomerang, Type (Once / Loop), Fit | **package** `lottie`; **assets** (`.json` only) | /ui/widgets/widget-desc/lottie | 524-535 |
| 24 | Rive | Animations | Plays a Rive animation (.riv). Code text: "Integrate animations created with the Rive tool into your app." | Source tabs Network / Asset (asset button "Pick Rive"), then Artboard and State Machine dropdowns read from the file | **package** `rive`; **assets** (`.riv` only) | /ui/widgets/widget-desc/rive | 538-546 |
| 25 | AnimatedContainer | Animations | A container that animates when its properties change (300 ms, grey fill when added). No description in the code. | Duration, Curve, Alignment, Padding, Color, Decoration, Width, Height, Margin, Transform, On End (derived) | none | none | 548-557 |
| 26 | Circular Progress Indicator | Progress Indicators | A spinning loading ring. Code text: "Show a circular loading indicator to indicate that a task is in progress." | Value, Background Color, Color, Stroke Width, Stroke Align, Stroke Cap, Padding (derived) | none | /ui/widgets/widget-desc/loading-circular | 562-572 |
| 27 | Linear Progress Indicator | Progress Indicators | A loading bar (added 200 wide). Code text: "Show a linear loading indicator to indicate that a task is in progress." | Value, Background Color, Color, Min Height, Border Radius (derived) | none | /ui/widgets/widget-desc/linear-progress-indicator | 575-585 |
| 28 | Checkbox | Forms | A tick box (starts checked). Code text: "A material design checkbox." | Value, Tristate, On Changed, Active Color, Check Color, Fill Color, Focus Color, Hover Color, Shape, Side, Is Error (derived) | none | /ui/widgets/widget-desc/checkbox | 590-608 |
| 29 | Switch | Forms | An on/off switch (starts on). Code text: "A material design switch." | Value, On Changed, Active Thumb Color, Active Track Color, Inactive Thumb Color, Inactive Track Color, Thumb Icon (derived) | none | /ui/widgets/widget-desc/switch | 611-629 |
| 30 | Popup Menu Button | Forms | A button labelled "Popup Menu" that opens a menu (starts with one item, "Item 1"). No description in the code. | Item Builder, Initial Value, On Selected, On Opened, On Canceled, Tooltip, Icon, Icon Size, Offset, Color (derived) | none | none | 632-655 |
| 31 | Dropdown menu | Forms | A dropdown for choosing one option from a list (starts with one option, "first"). Code text: "A dropdown widget for selecting a single option from a predefined list, enhancing user interaction and input within your Flutter app." | Value type, Value, Items (each: Value, On Tap, Child, Enabled), On Changed, On Tap, Menu Max Height, Is Expanded, Autofocus, Border Radius, Decoration, Validator, On Saved | none; an older dropdown shows the banner "You are using an old version of the dropdown button" with an **Update** button | none | 658-687 |
| 32 | Slider | Forms | A slider for a number between Min and Max (starts at 0.5). Code text: "Custom Slider widget that can be customized to fit your design." | Value, On Changed, Min, Max, Slider Height, Thumb Radius, Overlay Radius, Label, Divisions, Thumb Color, Overlay Color, Active Color, Inactive Color | none | /ui/widgets/widget-desc/slider | 690-707 |
| 33 | Pin Code Field | Forms | Boxes for a short one-time code (OTP). Code text: "A widget for entering and verifying a pin code (OTP)." | Pin Code Length (1 to 6, note "The maximum length of the pin code is 6. Please set the length to 6 or less."), Obscure Text, Keyboard Type, Enable Active Fill, Pin Theme (button), Box Shadows, Background Color, Text Style, behaviour and cursor options, On Changed, On Completed, On Submitted, Controller, Validator | **package** `pin_code_fields`; **variable** (`pinCode` controller) | none | 710-731 |
| 34 | App Bar | Screen Components | The top bar of a screen (starts with the title "Title"). Code text: "A widget in Flutter is a top-level container that typically serves as the primary navigation and title area in a mobile app." | Title, Center Title, Elevation, Background, Foreground, Shadow, Leading, Width (of Leading), Border, Actions; under advanced: Spacing, Height, Automatically Imply Leading, Flexible Space | **slot**: dropped on a screen it becomes the screen's App Bar; dropped on an App Bar you choose leading, title or actions | /ui/widgets/widget-desc/appbar | 736-747 |
| 35 | Bottom Navigation Bar | Screen Components | A tab bar at the bottom of a screen (starts with items "home" and "call"). Code text: "A widget that displays a navigation bar at the bottom of the screen." | Current Index, Background Color, Elevation, Type, Landscape Layout, Unselected / Selected (Edit: Color, Show label, style), On Tap, Items (add, move left/right, remove; at least 2) | **variable** (`pageIndex`, with an On Tap that sets it); **slot** (bottom navigation slot) | /ui/widgets/widget-desc/navigation-bar | 750-774 |
| 36 | Drawer | Screen Components | A side menu that slides in. Code text: "A sliding menu that is typically used for navigation or accessing additional options in an app." | Background Color, Elevation, Shadow Color, Surface Tint Color, Shape, Width, Child, Semantic Label, Clip Behavior (derived) | **slot** (screen's drawer slot) | /ui/widgets/widget-desc/drawer | 777-788 |
| 37 | List Tile | Screen Components | One row with a title and optional leading, subtitle and trailing widgets (starts with title "Tile"). Code text: "A single fixed-height row typically used in a scrolling list." | Leading, Title, Subtitle, Trailing, Is Three Line, Dense, Shape, Selected Color, Icon Color, Text Color, Content Padding, Enabled, On Tap, On Long Press, Selected, Tile Color (derived) | none | /ui/widgets/widget-desc/listtile | 791-802 |
| 38 | Expansion Tile | Screen Components | A tile that expands to show more widgets (starts with title "Tile"). Code text: "Expandable tile that can be used to create a list of expandable items." | Initially Expanded, Leading, Trailing, Title, Subtitle, Children, On Expansion Changed, Background Color, Collapsed Background Color, Text Color, Collapsed Text Color, Icon Color, Collapsed Icon Color, Shape, Collapsed Shape | none | none | 805-818 |
| 39 | Alert Dialog | Screen Components | A pop-up box with a title (starts as "Hello"), content and action buttons. Code text: "Display a pop-up dialog with a message and optional actions." | Icon, Title, Content, Actions, Background Color, Elevation, Shape, Alignment, Constraints, Scrollable (derived) | none in the picker; showing it in a running app is a logic step (see `popups.md`) | /ui/widgets/widget-desc/alert-dialog | 821-832 |
| 40 | Admob Banner | Integrations | A banner ad (test ads on). Code text: "Rectangular ads that appear at the top or bottom of the device screen. Banner ads stay on screen while users are interacting with the app, and can refresh automatically after a certain period of time. " | With no keys: text "No API Keys" and a button "AdMob setup". With keys: Android Unit ID, Ios Unit ID (derived) (or buttons "AdMob Android setup" / "AdMob IOS setup" when only one platform has a key), Show Test Ads | **package** `nowa_mobile_ads`; **integration** (settings **AdMob**: "Android App ID", "iOS App ID", must start with "ca-app-pub-") | /ui/widgets/widget-desc/admob-banner | 837-850 |
| 41 | Web View | Integrations | A web page inside your app (starts at https://nowa.dev). Code text: "Embed a web page or web content within your app." | URL (if the text does not start with "http", "https://" is added) | on the board a placeholder reads "Web view to {url}" and "Run to preview"; no package prompt | /ui/widgets/widget-desc/webview (the code string has a leading space) | 853-865 |
| 42 | Html | Integrations | Renders HTML text (starts as `<h1>Hello World</h1>`). Code text: "Render HTML content within your Flutter app." | Data (multi-line), Shrink Wrap | no package dialog in the code, see Open questions | none | 868-878 |
| 43 | Markdown | Integrations | Renders Markdown text (starts as `# Hello World`). Code text: "Display formatted text using Markdown syntax." | Data, Selectable, Shrink Wrap, Style | none | none | 881-888 |
| 44 | Google Maps | Integrations | An interactive map (starts centred on 39.5, -98.0 at zoom 4 with the location button on). Code text: "Interactive map widget powered by Google Maps with support for markers, polygons, and custom styling." | Initial Camera Position, Map Type, My Location Enabled, My Location Button Enabled, Zoom Controls Enabled, Markers, Polygons, Polylines, Circles, On Tap, ... (derived); red note "Google Maps API keys are not set. Please configure them in the project settings to use the Google Map widget." with a gear button | **package** `google_maps_flutter`; **integration** (settings **Google Maps**: "Android API Key", "iOS API Key", "Web API Key"); the board and Instant Play show a placeholder ("Run to preview" / "Run on a simulator/emulator or mobile device to preview") | none | 891-914 |
| 45 | RevenueCat Paywall | Integrations | A ready-made paywall screen for in-app purchases. Code text: "Pre-built paywall UI for in-app purchases and subscriptions powered by RevenueCat." | Fields come from the package's own `PaywallView` widget, which is not defined in Nowa's code (not listed) | **package** `purchases_flutter` and `purchases_ui_flutter`; **integration** (settings **RevenueCat**: "Apple API Key", "Android API Key", "Web API Key"; Nowa also writes `lib/integrations/revenuecat_service.dart`); same placeholders as Google Maps | none | 916-926 |

Notes on the table:

- docUrl count: 32 of 45 entries carry a `docUrl` (31 under `/ui/widgets/widget-desc/` plus Group's `/ui/layout/groups`); these are exactly the widget links in `_rewrite/research/app-links.txt`. The 13 without: SizedBox, Button, Icon Button, Swipeable Stack, AnimatedContainer, Popup Menu Button, Dropdown menu, Pin Code Field, Expansion Tile, Html, Markdown, Google Maps, RevenueCat Paywall. Where the docUrl appears is only the picker preview link "Open Documentation." (`widget_picker.dart:266-283`); no other code uses `docUrl`.
- The picker row shows the name only; the description appears in the preview popup and as a tooltip on grid tiles (`nowa_widgets.dart:73-78`, 0.5 s delay).
- No entry sets `isBeta`, so no **BETA** pill is shown for any built-in widget in v3.12.5.
- Widgets that bring a dialog for missing packages (from `dependencies` in `widget_info.dart` and the three integration configs): SVG (`flutter_svg`), Lottie (`lottie`), YouTube Player (`youtube_player_flutter`), Swipeable Stack (`flutter_card_swiper`), Pin Code Field (`pin_code_fields`), Rive (`rive`), Admob Banner (`nowa_mobile_ads`), Google Maps (`google_maps_flutter`), RevenueCat Paywall (`purchases_flutter`, `purchases_ui_flutter`). Code: `packages/core/lib/src/interpreter/declaration_info/widget_info.dart:244-250,305-311,420-426,483-489,571-577,668-674`, `.../integrations/admob_package_config.dart:345-354`, `google_maps_package_config.dart:128-135`, `revenuecat_package_config.dart:127-139`. Video Player, Web View, Markdown, Slider and the page indicator need nothing: they ship inside `nowa_runtime` (`packages/nowa_runtime/pubspec.yaml`, `packages/nowa_runtime/lib/nowa_runtime.dart:18`).

### What you get when you add each widget (defaults and starting size)

Size is the width x height written in the entry; "auto" means the entry passes `null`, which the Layout section shows as **Auto** (`layout_details.dart:117-131` uses `isNull` -> `SizeType.auto`).

| Widget | Size | Starts as |
|---|---|---|
| Container | 100 x 100 | grey fill 0xFFC4C4C4 (`default_blocks.dart:7-12`) |
| Text | auto x auto | "Write something" (`default_blocks.dart:317`) |
| Text Field | 100 x auto | `TextFormField` |
| Icon | auto x auto | `star_border_rounded` |
| SizedBox | 100 x 100 | width 100, height 100 |
| Image | 100 x 100 | sample photo from a web address, Fit "cover" (`default_blocks.dart:133-141`) |
| SVG | 100 x 100 | the Nowa logo from a web address |
| Button | auto x 40 | label "Button", empty On Pressed |
| Icon Button | auto x auto | icon "add", empty On Pressed |
| Floating Button | auto x auto | icon "add", empty On Pressed |
| Group | 100 x 100 | empty Stack, Alignment 0,0 (`default_blocks.dart:290-296`) |
| TabView | 200 x 200 | two tabs and two text pages |
| List View | 330 x 500 | Builder, 3 items, each a 100 x 100 box labelled "Placeholder" |
| Grid View | 330 x 500 | Builder, 2 columns, spacing 10, 3 items labelled "Placeholder" |
| Swipeable Stack | 300 x 500 | 5 cards, 3 shown, labelled "Card Placeholder" |
| Page View | 300 x 300 | pages "first page" and "second page" plus the dots indicator |
| Indexed Stack | 300 x 300 | empty |
| Cross Fade | 100 x 100 | two Placeholder boxes, state showFirst, 200 ms |
| Wrap | 100 x 100 | empty, horizontal |
| Data Builder | 100 x 100 | no source yet; Loading Widget and Error Builder pre-filled |
| Video Player | 350 x 250 | Big Buck Bunny sample URL |
| YouTube Player | 350 x 250 | video id `9Q2MZes5lt8`, Auto Play off, Mute on |
| Lottie | 100 x 100 | sample animation from lottiefiles.com |
| Rive | 100 x 100 | sample `vehicles.riv` from cdn.rive.app |
| AnimatedContainer | 100 x 100 | 300 ms, grey fill |
| Circular Progress Indicator | auto x auto | spinning |
| Linear Progress Indicator | 200 x auto | bar |
| Checkbox | auto x auto | checked, empty On Changed |
| Switch | auto x auto | on, empty On Changed |
| Popup Menu Button | 200 x 50 | text "Popup Menu", item "Item 1" |
| Dropdown menu | 200 x 50 | one item "first" |
| Slider | 350 x 40 | value 0.5 |
| Pin Code Field | 300 x 70 | 6 boxes, black inactive colour |
| App Bar | 200 x 50 | title "Title" |
| Bottom Navigation Bar | 300 x auto | items "home" and "call" |
| Drawer | 200 x 400 | empty column |
| List Tile | 300 x auto | title "Tile" |
| Expansion Tile | 300 x auto | title "Tile", one placeholder child |
| Alert Dialog | 200 x 100 | title "Hello" |
| Admob Banner | 300 x 50 | `showTestAds` on |
| Web View | 400 x 350 | https://nowa.dev |
| Html | 100 x 100 | `<h1>Hello World</h1>`, Shrink Wrap on |
| Markdown | 100 x 100 | `# Hello World` |
| Google Maps | 400 x 400 | centre 39.5, -98.0, zoom 4, location on |
| RevenueCat Paywall | 350 x 500 | package default |

Source for all rows: `widgets_to_add.dart` entry lines in the table above and `default_blocks.dart`.

### Names that differ between the picker and the Outline / Details header

The picker shows `name`; the Outline and the Details header show the widget's display name from `widget_info.dart`: Button (class ElevatedButton), SVG Image (SvgPicture, `:565`), Dropdown Menu (`:532`), Youtube Player (`:302`), Slider (`:730`), TextField (`text_field_info.dart:6-8`), Screen (Scaffold, `:655`), Clip radius (`:695`), Scroll View (`:702`), Color Filter (`:709`), Text Direction (`:716`), TabView Controller (`:723`), Group (`:269`), Floating Button (`:681`). "Cross Fade" is defined (`:688`) but the lookup key in `declaration_info_factory.dart:46` is spelled `AnimatedCrossFadeInfo`, so the class name `AnimatedCrossFade` will be shown instead (see Open questions).

---

## Wrappers

32 wrappers, in this order, no categories (`packages/core/lib/src/wrappers_to_add.dart:12-188`). The code has no description strings for wrappers. One-liners below use Nowa's own earlier wording from the old docs (`old-docs/ui/wrappers/wrappers-list.md`) where it exists (rows 1-25 except 26-32 marked "new"), otherwise they describe the class and the defaults Nowa sets. "Fields" are the Details labels the wrapper section shows (derived where no special editor exists; special editors named).

| # | Name as shown | One-liner | Defaults Nowa sets | Fields in its Details section | Code (`wrappers_to_add.dart`) |
|---|---|---|---|---|---|
| 1 | Padding | Adds empty space around the widget. | all sides 8 (symmetric vertical 8, horizontal 8) | Padding (Horizontal, Vertical; "Individual padding" button switches to left/top/right/bottom); on a Group the first Padding shows inside the Group's own Padding row | 13-26 |
| 2 | Visibility | Shows or hides the widget; link Visible to a variable. | Visible on | Visible, Replacement (`text_fields.dart:806-819`) | 27-31 |
| 3 | Gesture Detector | Makes the widget react to touch: tap, double tap, long press and more. | none | On Tap, On Secondary Tap, On Double Tap, On Long Press, then "Show advanced options" for the rest (`widget_fields.dart:488-514`) | 32-36 |
| 4 | Opacity | Makes the widget partly see-through. | Opacity 0.5 | Opacity, Always Include Semantics (derived) | 37-41 |
| 5 | Clip radius | Rounds the widget's corners. | none | Border Radius, Clipper, Clip Behavior (derived) | 42 |
| 6 | Container | Wraps the widget in a Container (fill, border, radius, shadow, padding, margin). | grey fill 0xFFC4C4C4 | same editor as the Container widget (`widget_fields.dart:317-350`) | 43 |
| 7 | Transform | Rotates, scales or moves the widget. | rotation Matrix4.rotationZ(1.0), alignment 0,0 | Transform, Origin, Alignment, Transform Hit Tests, Filter Quality (derived) | 44-54 |
| 8 | Fitted Box | Scales and positions the widget inside the space it is given. | none | Fit, Alignment, Clip Behavior (derived) | 55 |
| 9 | Scroll View | Makes the widget scrollable when it is bigger than the space. | none | Scroll Direction, Reverse, Padding, Primary, Physics, Controller, ... (derived). Also affects whether **Expand** is offered in Layout (`size_fields.dart:5-41`) | 56-60 |
| 10 | Align | Places the widget inside the available space. | alignment 0,0 | Alignment (X/Y sliders), Width Factor, Height Factor (derived) | 61-70 |
| 11 | Fractionally Sized Box | Sizes the widget as a fraction of the available space. | none | Alignment, Width Factor, Height Factor (derived) | 71-75 |
| 12 | Intrinsic Height | Forces the widget to its content's natural height. | none | none beyond the base widget | 76-80 |
| 13 | Intrinsic Width | Forces the widget to its content's natural width. | none | Step Width, Step Height (derived) | 81-85 |
| 14 | Data Builder | Takes data from a source and feeds it into the widget. | loading spinner and red error text prepared | Source, Query / API, Loading Widget, Error Builder (`data_field.dart:22-52`) | 86 |
| 15 | Constrained Box | Limits the widget's minimum and maximum size. | Constraints (empty) | Constraints (derived) | 87-91 |
| 16 | Material | Gives the widget a Material surface (colour, shape, elevation); needed for ink effects. | none | Color, Elevation, Shadow Color, Tint Color, Border, Border On Foreground (`basic_fields.dart:1865-1895`) | 92 |
| 17 | Drawer | Turns the widget into a slide-in side panel. | none | Background Color, Elevation, Shadow Color, Surface Tint Color, Shape, Width, Semantic Label, Clip Behavior (derived) | 93 |
| 18 | Ink Well | Adds a ripple on tap. | none | On Tap, Border Radius, Focus Color, Hover Color, Highlight Color, Splash Color, then advanced (`widget_fields.dart:460-486`) | 94 |
| 19 | Interactive Viewer | Lets the user pan, zoom and rotate the widget. | none | Pan Enabled, Scale Enabled, Min Scale, Max Scale, Boundary Margin, Constrained, ... (derived) | 95-99 |
| 20 | Safe Area | Keeps the widget clear of notches and system bars. | none | only "Show advanced options" (Left, Top, Right, Bottom, Minimum, Maintain Bottom View Padding; `widget_fields.dart:516-528`) | 100 |
| 21 | Color Filter | Recolours the widget (tint, grayscale and similar). | colour 0xFFC4C4C4, blend mode srcATop | Color Filter (derived; Outline name "Color Filter") | 101-114 |
| 22 | Text Direction | Sets left-to-right or right-to-left for what is inside. | ltr | Text Direction (derived) | 115-119 |
| 23 | Default Text Style | Sets the text style used by all Text inside. | empty TextStyle | Style, Text Align, Soft Wrap, Overflow, Max Lines, ... (derived) | 120-124 |
| 24 | Form | Groups form fields so they can be validated together. | none | one "<field name> validator" row per Text Field, Dropdown menu and Pin Code Field inside (`form_fields.dart:7-41`); creates the `formKey` variable | 125-131 |
| 25 | Screen | Wraps the widget in a screen (Scaffold). | none | Color, App Bar, Drawer, Floating Action Button, Bottom Navigation Bar, Size, Route Settings (`widget_fields.dart:202-259`) | 132-138 |
| 26 | Notifier Builder | new: rebuilds the widget when a notifier you pick changes. | builder with `context` | Notifier (dropdown of notifiers found in the screen's variables and global states, `data_field.dart:53-117`) | 139-150 |
| 27 | Aspect Ratio | new: forces a width-to-height ratio. | Aspect Ratio 1.0 | Aspect Ratio (derived) | 151-157 |
| 28 | Badge | new: adds a small badge to the widget. | label Text "99" | Label, Is Label Visible, Background Color, Text Color, Alignment, Offset (derived) | 158-162 |
| 29 | Tooltip | new: shows a text hint on hover or long press. | Message "Tooltip message" | Message, Rich Message, Padding, Margin, Decoration, Text Style, Wait Duration, ... (derived) | 163-167 |
| 30 | Dismissible | new: lets the user swipe the widget away. | key UniqueKey() | Direction, Background, Secondary Background, On Dismissed, Confirm Dismiss, ... (derived) | 168-172 |
| 31 | Refresh Indicator | new: adds pull-to-refresh. | empty On Refresh | On Refresh, Color, Background Color, Displacement, Edge Offset, ... (derived) | 173-177 |
| 32 | AnimatedContainer | new: a container that animates property changes. | 300 ms, grey fill | Duration, Curve, Color, Decoration, Alignment, Padding, ... (derived) | 178-187 |

Notes:

- A wrapper is any widget with a child or builder slot (`Wrapper` in `packages/core/lib/src/interpreter/widget/widget_blocks.dart:443-499`). The **Layout** section (X/Y/W/H) is a separate kind, "layout wrappers" (`Expanded`, `Positioned`, `SizedBox`, `FlexSizedBox`, `BoardPosition`, `widget_blocks.dart:465`), and is never in this list.
- Same wrappers in 3.13 (dev): list and button unchanged (`diff` of `wrappers_to_add.dart` is empty; the button is restyled only).

---

## Features

### Widget picker

- **What it does:** Opens a search palette over the board to find a widget by name and add it, with a live preview, description and link to the docs. Lists the 45 built-in widgets and the project's own screens and components.
- **Where:** press Ctrl+K (Windows/Linux) or ⌘+K (macOS) with a board open, or click **Widget** (tooltip text "Widget"; icon of four blocks) in the floating toolbar at the bottom of the board (tools in order: "Select tool", "Shape", "Screen", "Text", "Widget"). The same picker also opens from the widget right-click menu **Replace with...**, from the **+** next to an empty base-widget row, and from widget-typed fields in Details (Scaffold App Bar, Drawer, Floating Action Button, Bottom Navigation Bar; the item slot of List View, Grid View, Data Builder).
- **Labels:** search box hint "Search for a widget"; link "Request a Widget"; filter row "Search for:" with chips `All`, `BuiltIn`, `Components`; footer "to select" (Enter key), "to navigate" (up/down arrows), "to close" (esc); preview card: widget name, description, "Dependencies" heading, link "Open Documentation."; label on rows with the tag `BETA` (never set).
- **How to use:**
  1. Open the picker (shortcut or **Widget** tool). The search box is focused.
  2. Type part of a name; matching is fuzzy on the name only and results are ordered by match score. Matched letters are highlighted. Use the chips to show only built-in widgets or only project components.
  3. Move the highlight with the up/down arrows or by moving the mouse over a row; the preview card to the right updates (picture or live render, name, description, packages needed, docs link).
  4. Press Enter or click a row to add it. The palette closes and the widget is placed at the mouse pointer position on the board (inside the container found under the pointer by the drag rules, or loose on the board), at the starting size in the defaults table.
  5. Or drag the row onto the canvas: the palette hides when the drag starts and the widget drops under the cursor.
  6. If the widget needs a package the project lacks, the dialog "Add Missing Dependencies" appears first (see next entry); such rows cannot be dragged.
- **Options:** filter chips (default `All`); in router and navigator contexts the picker opens with `Components` preselected (`go_route_node_view.dart:151`, `shell_route_node_view.dart:219`, `packages/code/lib/src/customizations/navigator_field.dart:87`).
- **Limits and rules:** not available while another overlay is open (`add_actions.dart:8-11`); shortcut not registered in view-only projects (`designer_setup.dart:119`) and ignored while the app plays in the designer (`designer_setup.dart:133`); in view-only projects the toolbar shows "View only" instead of tools (`designer_tools.dart:208-218`). Search does not look at descriptions or categories. The preview takes the project's applied theme.
- **Gating:** none found (no Beta/plan flag on any entry); view-only and play mode as above.
- **Code refs:** `packages/core/lib/src/widgets/widget_picker.dart:131-197` (palette), `:214-325` (preview), `:376-414` (loading and select); `packages/command_palette/lib/src/widgets/command_palette_modal.dart:74-190` (keys Enter, arrows, esc, backspace; details popup); `packages/command_palette/lib/src/widgets/options/command_palette_body.dart:140-210` (hover highlights, search-match highlight); `packages/command_palette/lib/src/controller/command_palette_controller.dart:264-288` (fuzzy filter); `packages/designer/lib/src/designer_setup.dart:48`; `packages/designer/lib/src/actions/add_actions.dart:6-23`; `packages/designer/lib/src/widgets/designer_tools.dart:171-185`; `packages/designer/lib/src/design/common_design.dart:194-222` (`placeWidgetData`, `placeBlock`).
- **Old docs:** `ui/widget-panel.md` (title "Widgets Panel"): describes the left sidebar **Widgets** panel (screens and components), not the picker; its tab names "Pages" / "Components" are outdated, the code shows "Page" / "Component", and it omits the search box and the grid/list toggle ("Switch to grid view"; `lib/project/panels/widgets_panel/widgets_panel.dart:164-250`) - partly outdated, see editor-shell research. `ui/widgets/widgets-ref.md` (list of widgets): outdated and incomplete (31 rows; no Switch, Popup Menu Button, Slider, Pin Code Field, Expansion Tile, Swipeable Stack, AnimatedContainer, Progress Indicators naming, Google Maps, RevenueCat Paywall) - partly outdated. Several old pages say the picker opens with Ctrl/Cmd+O or Ctrl/Cmd+P; the real key is K (`designer_setup.dart:48`): `listview.md` says O, `video-player.md` says P - wrong. In-app **Shortcuts** sheet also says "Open widget picker" is P (`shortcuts_cheat_sheet.dart:40`); P runs Play (`designer_setup.dart:47`).
- **3.13 (dev) changes:** Ctrl/⌘+K and the **Widget** tool open the new **Library** panel in add mode (hint "Add...", Enter inserts, Ctrl/⌘+Enter opens) instead of this picker; the picker stays for **Replace with...** and walkthroughs; a component's `@Preview` variants show as chips in the preview (`_rewrite/upcoming-3.13.md`; `dev:packages/designer/lib/src/actions/add_actions.dart:13-31`, `dev:packages/core/lib/src/widgets/widget_picker.dart`). The 45-entry list itself is unchanged.
- **Screenshot value:** high. `captures/ui-map/11-widget-picker.png` shows the palette with the preview card; a good second capture is the same palette with a search ("button") and the `Components` chip selected, and the "Add Missing Dependencies" dialog.

### Request a Widget

- **What it does:** Sends a short text request for a missing widget to the Nowa team.
- **Where:** widget picker, orange underlined link **Request a Widget** at the right end of the search box.
- **Labels:** dialog title "Request a Widget"; subtitle "Is there a widget you want that is missing from our library? Let us know!"; text hint "Write something..."; button "Submit Request"; error text "A problem happened, please check your internet connection and try again".
- **How to use:** click the link, type the request, click **Submit Request**; the dialog closes on success.
- **Limits and rules:** the request is posted together with your account email and the date (`dialog_data_sender.dart:24-28`).
- **Gating:** none found.
- **Code refs:** `widget_picker.dart:147-162`; `packages/core/lib/src/dialogs/feedback_dialogs.dart:76-90`; `packages/core/lib/src/dialogs/dialog_data_sender.dart:18-42`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Add Missing Dependencies

- **What it does:** Before adding a widget that needs a package, lists what is missing and adds it for you.
- **Where:** appears after choosing a widget in the picker (Enter or click) when its packages are not in the project.
- **Labels:** title "Add Missing Dependencies"; text "This widget requires the following dependencies"; list lines of the form `Add package "<name>" to pubspec.yaml (version: <version>)` (or a permission line `Request the "<name>" permission in your app.`); buttons "Cancel", "Add"; while working "Adding...". In the picker preview the same packages show under "Dependencies" with a one-line description each.
- **How to use:** click **Add**; Nowa writes the package(s) to the project's pubspec, imports them and then places the widget. **Cancel** closes without adding.
- **Limits and rules:** applies to the nine widgets named in the catalog notes; rows with missing packages cannot be dragged.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/dependency_system/missing_dependency_dialog.dart:6-110`, `dependency.dart:16-37`, `dependency_helper.dart:6-45`; `widget_picker.dart:199-201,403-413`; `packages/core/lib/src/interpreter/packages/package_service.dart:133-143`.
- **Old docs:** missing.
- **Screenshot value:** medium (add an SVG or Lottie widget to a project without the package).

### Add Wrapper

- **What it does:** Wraps the selected widget in another widget (padding, tap detection, visibility, ...). The wrapper gets its own section in Details; the widget is not rebuilt.
- **Where:** select one widget -> **Details** panel -> button **Add Wrapper** at the bottom of the panel.
- **Labels:** button "Add Wrapper"; palette hint "Search for a wrapper"; undo entry "Add wrapper"; drag-reorder undo entry "Reorder"; section "..." menu entry "Remove".
- **How to use:**
  1. Select a widget on the board (one widget only).
  2. In **Details**, click **Add Wrapper**. A palette opens with the 32 wrappers (list above); type to filter by name.
  3. Press Enter or click a wrapper. It is added as the outermost wrapper, which means it appears at the bottom of the wrapper sections (the base widget's own fields are at the top). Ctrl/⌘+Z removes it again.
  4. Edit the wrapper in its own section.
  5. Reorder: hover a wrapper section header, drag the grip icon (cursor "move") up or down; a coloured line marks the drop position. Order changes the result (a Padding inside versus outside a Container).
  6. Remove: hover the header, click the "..." button, choose "Remove". The base widget itself is not removable this way.
- **Options:** none beyond the wrapper's own fields.
- **Limits and rules:** the button is hidden when several widgets are selected or when the widget's slot cannot take a wrapper (`canWrapWidget`, `widget_blocks.dart:356-372`); each wrapper picker row is click-only (no dragging, no preview, no filter chips). Adding a wrapper to several selected widgets is not offered. On a Group, the first Padding wrapper is drawn inside the Group's own "Padding" row, not as a separate section (`block_field.dart:791-806`). When the widget has a **Layout** section (X/Y/W/H), new wrappers are inserted inside it (`designer_model.dart:472-486`).
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/details/widget_details.dart:66-113` (palette), `:145-148`, `:189-199` (button); `packages/core/lib/src/wrappers_to_add.dart:12-188`; `packages/designer/lib/src/details/wrapper_details.dart:8-109` (drag-reorder); `packages/core/lib/src/fields/class_field.dart:344-446` (`WidgetGroup`, `WidgetMoreButton` with "Remove", `_DragHandle`); `packages/core/lib/src/interpreter/widget/designer_model.dart:472-503,548-562`.
- **Old docs:** `ui/wrappers/wrappers-intro.md`: accurate (steps, bottom-up order, drag to reorder), but never says how to remove a wrapper. `ui/wrappers/wrappers-list.md`: outdated (24 rows, spelled "Fractional Sized Box", "Clip Radius" and "Default text style", missing Notifier Builder, Screen, Aspect Ratio, Badge, Tooltip, Dismissible, Refresh Indicator, AnimatedContainer). Single pages `padding.md`, `opacity.md`, `visibility.md`, `scrollview.md`, `gesture-detector.md`, `material.md`, `text-direction.md`: not individually re-checked.
- **3.13 (dev) changes:** none to the list; the button and the "..." menu are restyled.
- **Screenshot value:** high: Details panel with two wrapper sections and the **Add Wrapper** palette open.

### Details panel (properties)

- **What it does:** Shows and edits every property of the selected widget, grouped in sections, and links each property to variables and logic.
- **Where:** floating panel titled **Details**, top-right of the board, under the **Variables** panel; click the title bar to collapse. Drag its left edge to resize (240 px wide at first, 200 min, 35% of the window max). Hidden when the window is narrower than 600 px and in code mode.
- **Labels:** see the sections below.
- **How to use:** select a widget (click on the board or in the Outline). Sections, top to bottom:
  1. Breadcrumbs: owner component or `..`, parent, selection (click to select the parent).
  2. Name row: the widget's name; for plain widgets the button "Create a component", for components "Rename" (pencil) and "Open in New Tab".
  3. A one-line description for components and screens ("Add description" when empty); click it to open the description editor (title = widget name, back arrow "Back to fields", hint "Describe this widget, what it is for and how to use it."). Flutter widgets show "This widget has no source to document.".
  4. A warning box "Kept as code" when the widget could not be loaded, with the reason.
  5. **Layout**: header "Layout" with a **+** to add the layout wrapper; fields X, Y, W, H and size modes **Fixed**, **Auto**, **Expand** (Expand is hidden inside a scroll view along its direction); inside a Stack: L, T, R, B, W, H with "Left / Right / Left and right / Center" and "Top / Bottom / Top and bottom / Center"; inside Row/Column: **Fixed / Auto / Expand** per axis.
  6. The widget's own fields (special editor or the default class editor).
  7. One section per wrapper, each with a grip, a name and a "..." menu.
  8. **Add Wrapper**.
- **Options:** with several widgets selected the header reads "Widget x N", fields that differ show "Mixed", and **Add Wrapper** is hidden.
- **Limits and rules:** none beyond field types. Hovering a label for half a second shows a tooltip "<type> <label>" plus the parameter's doc summary when the widget comes from project source (`block_field.dart:1003-1013`).
- **Gating:** none found. Nothing selected on a board: **Show Grid**, **Board Color**, **Reset** (`board_details.dart:33-66`).
- **Code refs:** `packages/designer/lib/src/designer_setup.dart:166-232`; `packages/core/lib/src/panels/details/details_panel.dart:52-77`; `packages/designer/lib/src/details/widget_details.dart:22-205`, `name_group.dart:8-130`, `layout_details.dart:49-90`, `size_fields.dart`, `positioned_details.dart:9-90`, `flex_size_field.dart`.
- **Old docs:** no page covers the Details panel as a whole; it is described piecemeal in widget pages (e.g. `container.md` "Container Properties": accurate for Color, Border, Radius, Image, Shadow, Gradient; its claim of an "Add Widget" button on a selected Container is not found in the code). `text.md` says a Text added from the picker is "Fixed" size; the code adds it with auto width and height (`widgets_to_add.dart:129-139`) - outdated.
- **Screenshot value:** high: Details for a Text and for a Container; `captures/ui-map/18-widget-selected.png` exists.

### Field editors in Details

- **What it does:** Each property has an editor chosen by its type; the label on the left is the property name in words.
- **Where:** inside the Details panel.
- **Labels and behaviour by type** (registry `BlockField.allFields`, `block_field.dart:27-95`, and `designer_plugin.dart:45-71`):
  - **Text** (`BFString`, `basic_fields.dart:53-180`): one-line box; multi-line for Text, Html, Markdown. Hint `null` when unset. Type `$` to open a picker and insert `{variable}` inside the text.
  - **Numbers** (`BFInt`, `BFDouble`, `basic_fields.dart:182-288`): number box; hint `-` when unset, `Mixed` with several widgets; some have min and max (padding, border width, radius: min 0).
  - **Switch** (`BFBool`, `basic_fields.dart:378-404`): on/off.
  - **Colour** (`color_fields.dart:190-700`): swatch plus HEX box plus opacity box; click the swatch for a picker with saturation/hue area, opacity bar, an eyedropper button, "HEX" and "OP" boxes and **Colors From Theme** tiles (primary, onPrimary, secondary, onSecondary, tertiary, onTertiary, error, onError, surface, onSurface, shadow; link "Show more colors"). Picking a theme tile links the property to the theme; a detach icon turns it back into a fixed colour. For a Container's fill a dropdown offers Solid, Linear, Radial, Sweep with gradient editors.
  - **Icon** (`icon_field.dart:38-205`): button with the icon and its name (or `none`); popup titled "Icons" with a search box and a grid of Material icons; hover an icon for its name.
  - **Text style** (`text_fields.dart:60-300`): a button (shows the theme style name when linked) that opens a ".. / Typography / <label>" popup: preview, a refresh icon with tooltip "Reset to default", then Font Family, Font Weight (Thin, Extra Light, Light, Normal, Medium, Semi Bold, Bold, Extra Bold, Thick), Decoration (four icons), Font Size, Color, Background, Letter Spacing, Height, Shadows. Link-menu extras: "Modify Style", "CopyWith", "Remove CopyWith". Font picker: popup "Fonts" with "Import", a search box, "Google Fonts" and a group "Imported by you".
  - **Padding** (`basic_fields.dart:744-870`): Horizontal and Vertical boxes; the button with tooltip "Individual padding" switches to Left, Top, Right, Bottom.
  - **Alignment** (`basic_fields.dart:1543-1580`): two sliders X (Horizontal) and Y (Vertical) from -1 to 1. Rows and columns use a 3x3 "Alignment" grid (`flex_field.dart`).
  - **Enum dropdown** (`basic_fields.dart:1510-1540`): lists the allowed values; when a nullable enum is unset the box reads "Custom" (3.13 adds "Default").
  - **Image source** (`basic_fields.dart:888-950`): tabs Network (URL box) / Asset / Bytes. Asset tab: button "Pick Image" (names for other types: "Pick SVG", "Pick Video", "Pick Audio", "Pick Lottie", "Pick Rive"), popup "Pick <name>" with button "Upload <name>", a search box and the project's `assets` files with thumbnails; uploading adds the file to the assets folder and picks it (`asset_fields.dart:14-200`).
  - **Events** (functions, `basic_fields.dart:532-560`, `nowa_fields.dart:793-825`): button "+" when empty, bolt icon with "Edit" when set; opens the circuit editor. For Button and Icon Button the **Enabled** switch turns On Pressed and On Long Press on or off; "Compute" links a bool variable.
  - **Widget slot** (`basic_fields.dart:406-440`, `nowa_fields.dart:420-480`): a button naming the current widget plus an edit button that selects it; click to open the widget picker. Function-typed widget slots (item builders) offer "Pick Widget" and "Edit in circuit".
  - **List** (`list_field.dart:8-200`): collapsible header with a length box and **+**; rows labelled 0, 1, ... drag to reorder; "Load More" after 10 rows.
  - **Duration**, **Border**, **Border radius**, **Matrix4**, **Offset**, **Shadows**, **Button Style** (`WidgetStateProperty` fields: Background Color, Foreground Color, Shadow Color, Elevation, Side, Radius): small class editors with the same + / remove pattern (`class_field.dart:10-330`).
- **How to use:** edit a value and press Enter or click away. Every edit is undoable (Ctrl/⌘+Z).
- **Limits and rules:** which properties appear: custom editors (named in the catalog and wrapper tables) show a hand-picked set; every other widget shows every constructor parameter that has an editor (all except `Key`, `class_field.dart:121-136`). Many editors end with the text link "Show advanced options" / "Hide advanced options" (`block_field.dart:1318-1352`).
- **Gating:** none found.
- **Code refs:** as listed per bullet.
- **Old docs:** widget pages mention individual editors; no overview.
- **Screenshot value:** medium; one capture per editor popup (colour, icon, text style, asset picker).

### Link a property (link menu)

- **What it does:** Replaces a property's fixed value by a variable, param, function result or expression.
- **Where:** click a property's label in Details (the label turns orange on hover).
- **Labels:** menu title "Link <label>"; a search box; categories of matching items filtered by the property's type; extra entries "Custom Expression...", "Detach..." (red), "Create Param...", "Create Variable...", "Compute...", "Edit", "Open in Circuit"; a "With values" entry on colour references.
- **How to use:** click the label, search or choose an item; for a list you pick an item then its members. "Detach..." turns the link back into a fixed value.
- **Limits and rules:** if the field is disabled the menu says "Field is not enabled". Deeper behaviour belongs to the logic pages.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/field_link_menu.dart:9-398`; `packages/core/lib/src/fields/link_menu.dart:56-276`; `block_field.dart:991-1035`.
- **Old docs:** see logic research.
- **Screenshot value:** medium.

### Reset to default / Set to null

- **What it does:** Clears a property back to its default.
- **Where:** right-click a property row in Details.
- **Labels:** "Reset to default"; "Set to null" (only for nullable properties).
- **How to use:** right-click the row and choose the entry. "Reset to default" removes the value (Flutter's own default applies) or, for required properties, restores a default of that type. In the text-style popup a refresh icon (tooltip "Reset to default") resets the whole style.
- **Limits and rules:** not offered on disabled fields.
- **Gating:** none found.
- **Code refs:** `block_field.dart:810-842`, `:256-280`; `text_fields.dart:100-110`.
- **Old docs:** `text.md` mentions "Reset to default" for Overflow only; `gridview.md` mentions "Set to Null"/"Set to default": accurate.
- **3.13 (dev) changes:** same entries in the new menu component.
- **Screenshot value:** low.

### Text Field and forms (dedicated topic)

- **What it does:** Collects text and validates it.
- **Where:** picker -> **Text Field** (Basic); wrappers **Form**; picker -> **Dropdown menu**, **Pin Code Field** (Forms).
- **Labels:** Text Field fields (see catalog). Validator block: row "<name> validator" with **+** (add) or a remove button; "+ Add validator" button; menu items "Min length validator", "Max length validator", "Email validator", "Phone validator", "Regex validator"; each item has "Message" plus "Min", "max" or "Regex". The default first item is "Required" with the message "Field is required"; other defaults: "Too small" (min 6), "Too long" (max 40), "Invalid email", "Invalid phone", "Invalid input".
- **How to use:**
  1. Add a **Text Field**. Nowa creates a variable `text` (a `TextEditingController`) and links it to **Controller**; a second field gets `text2` and so on. Deleting the field deletes the variable.
  2. Set **Decoration** (hint, label, prefix icon, borders), **Keyboard Type**, **Obscure Text** for passwords.
  3. To validate, click **+** on the "validator" row (adds "Required"), then "+ Add validator" for more rules.
  4. For several fields: add the **Form** wrapper around them. The Form section lists every field's validator in one place and creates a `formKey` variable; validate from logic through `formKey` (the logic editor knows `FormState.validate`).
  5. Dropdown menu: set **Value type**, add **Items** (Value and Child each), choose **Value**; a **Pin Code Field** has **Pin Code Length** up to 6 and a **Pin Theme** popup.
- **Limits and rules:** an older "TextField" shows the warning "TextField does not support validation, use TextFormField instead" with a **Change** button (`form_fields.dart:96-120`). Dropdown duplicates: "Values contain duplicates". Pin length 1 to 6 (note text above).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/form_fields.dart:7-330`; `packages/core/lib/src/fields/form_validator.dart:10-347`; `packages/core/lib/src/interpreter/widget/text_field_info.dart:1-36`; `widget_info.dart:476-526`; `packages/core/lib/src/fields/pin_code_fileds.dart:8-120`; `packages/core/lib/src/interpreter/libraries/material_library.dart:90726-90739` (`FormState.validate`).
- **Old docs:** `textfield.md`: "Coming soon" - missing.
- **Screenshot value:** high: Text Field Details with validator row; Form wrapper section.

### Lists and grids (dedicated topic)

- **What it does:** Repeats one item for each entry of a list, or holds a hand-made set of widgets.
- **Where:** picker -> **List View**, **Grid View** (Layout); also **Swipeable Stack** for decks of cards; **Data Builder** loads the list from data (own page `show-data.md`).
- **Labels:** (List View) "Type" tabs "Normal" / "Builder"; "List" button showing "Connect" (or the connected list name) and a detach icon (tooltip "detach"); "Item Count"; "Item Builder"; "Separator" dropdown "None" / "Fixed Spacing" / "Widget"; "Spacing". (Grid View) tabs "Normal"/"Builder", delegate tabs "Fixed" / "Max", "Main Spacing", "Cross Spacing", "Main Axis Extent", "Child Aspect Ratio". Confirmation dialog "First Widget as Placeholder, Others will be Removed" (buttons "Cancel", "Continue") when switching from Normal with more than one child.
- **How to use:**
  1. Add a List View. It starts in Builder with 3 placeholder items.
  2. Choose the placeholder: click the **Item Builder** button and pick a widget (or a component you built).
  3. Preview: change **Item Count**; on the board only the first item is full strength, the rest are dimmed (opacity 0.3), and a list with no count shows 20 items.
  4. Create a list variable (or have one from data), then click **List** -> pick it. Nowa sets Item Count to the list's length and makes `element` available inside the item for linking item properties.
  5. **Separator**: "Fixed Spacing" or a "Widget" (a Divider is added).
  6. **Normal** type: add widgets to Children by hand.
  7. Group children from a list: select the Group and use "Test <Type>" (Copies) to preview.
- **Limits and rules:** switching Normal -> Builder keeps only the first child (dialog above). Grid delegate Fixed needs a Cross Axis Count; Max needs a Max Cross Axis Extent.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/fields/list_view_field.dart:11-350`; `grid_view_field.dart:12-230`; `packages/core/lib/src/interpreter/widget/list_grid_view_custom_view.dart:4-76`; `packages/core/lib/src/fields/lost_widget_dialog.dart:15-60`; `swipeable_stack_fields.dart:8-120`; `packages/designer/lib/src/details/group_details.dart:144-250`.
- **Old docs:** `listview.md`, `gridview.md`: partly outdated (wrong shortcut Ctrl/Cmd+O, "Placeholder next to itemBuilder", "Extend"/"connect +" wording; the steps still match). `data-builder.md`: a video link only.
- **Screenshot value:** high.

### Bottom Navigation Bar, App Bar, Drawer and Floating Button (dedicated topic)

- **What it does:** Adds the standard parts around a screen's body.
- **Where:** picker -> Screen Components (App Bar, Bottom Navigation Bar, Drawer) and Buttons (Floating Button).
- **Labels:** see catalog rows 10, 34 to 36. Bottom Navigation Bar: "Current Index", "Unselected" / "Selected" with an "Edit" button (popups "Unselected" / "Selected" with "Color", "Show label", "style"), "Items" strip with tooltips "move to the left" / "move to the right", error "Cannot have less than 2 items".
- **How to use:**
  1. Drag the widget onto a screen (or pick it with the pointer over the screen): App Bar -> top, Drawer -> side menu, Floating Button -> corner button, Bottom Navigation Bar -> bottom. Each goes into its slot of the screen instead of the body; dropped over an App Bar you choose leading, title or actions.
  2. Bottom Navigation Bar: Nowa creates `pageIndex` (int, 0), links **Current Index** to it and fills **On Tap** with "set pageIndex, then refresh".
  3. Show a different page per tab: put an **Indexed Stack** (or Page View) in the screen body and link its **Index** to `pageIndex`.
  4. Edit items with the strip: click an item to select, **+** copies the last item, arrows move it, the remove button deletes it.
- **Limits and rules:** at least two items. The screen's own sections list the same slots (Color, App Bar, Drawer, Floating Action Button, Bottom Navigation Bar).
- **Gating:** none found.
- **Code refs:** `packages/designer/lib/src/design_experience/drag_rule.dart:393-512`; `packages/core/lib/src/interpreter/widget/nav_bar_info.dart:1-45`; `packages/designer/lib/src/details/navbar_field.dart:8-260`; `widget_fields.dart:202-259,352-390`.
- **Old docs:** `navigation-bar.md`: a video link only; `appbar.md`, `drawer.md`, `floating-action-button.md`: "Coming soon" - missing.
- **Screenshot value:** high.

### TabView, Page View, Indexed Stack and Cross Fade (dedicated topic)

- **What it does:** Four ways to show one piece of content at a time.
- **Where:** picker -> Layout.
- **Labels:** catalog rows 12, 16, 17, 18.
- **How to use:** TabView: edit the TabBar's **Tabs** and the TabBarView's **Children** and set the TabView Controller's **Length** to match. Page View: add pages in **Children**; pick the dots style with **Effect type**. Indexed Stack: set **Index** (link it to a variable). Cross Fade: link **Cross Fade State** to a variable and use **Duration**.
- **Limits and rules:** none of these has a special editor (default class editor); the PageView picker entry is a Stack with a PageView and an indicator.
- **Gating:** none found.
- **Code refs:** `widgets_to_add.dart:255-294,391-438`; `default_blocks.dart:269-288`; `basic_fields.dart:1983-2010` (indicator effects).
- **Old docs:** `tabview.md`, `pageview.md`, `index-stack.md`, `cross-fade.md`: "Coming soon" - missing.
- **Screenshot value:** medium.

### Image and SVG (dedicated topic)

- **What it does:** Shows pictures from the web or from the project's assets.
- **Where:** picker -> Images.
- **Labels:** tabs "Network" / "Asset" / "Bytes" (Image), "Asset" / "Network" (SVG); buttons "Pick Image" / "Pick SVG"; popup "Pick Image" with "Upload Image", search, file list; Color, Blendmode, Fit, Error Builder.
- **How to use:** Network: paste the URL. Asset: click **Pick Image**, choose a file from the list or **Upload Image** (a new file goes into the project's assets folder and is picked at once). SVG needs the `flutter_svg` package (accept the dialog); only `.svg` files can be uploaded. An empty SVG asset path shows the error view "No path".
- **Limits and rules:** Fit options come from the standard fit list (the old docs list seven).
- **Gating:** none found.
- **Code refs:** `widget_fields.dart:29-49,127-200`; `basic_fields.dart:888-950`; `asset_fields.dart:14-200`; `widget_info.dart:561-596`.
- **Old docs:** `image.md`: accurate in substance (older wording "Url", "Assets"), `svg.md`: "Coming soon" - missing.
- **Screenshot value:** medium.

### Video Player and YouTube Player (dedicated topic)

- **What it does:** Plays a video file or a YouTube video.
- **Where:** picker -> Players.
- **Labels:** Video Player: tabs "Network" / "Asset" ("Pick Video"), "Auto Play", "Show Controls Bar". YouTube: "Initial Video Id" and the flags listed in the catalog.
- **How to use:** Video Player: paste a direct video URL or pick an uploaded video. The board shows "Designer mode" and a play icon: use Run/Instant Play to see it. YouTube Player: accept the `youtube_player_flutter` dialog, then type the video id (the default is `9Q2MZes5lt8`); the board shows the thumbnail and title.
- **Limits and rules:** Instant Play in the desktop app or with an asset video shows "Platform not supported, only available on iOS and Android". With a missing URL: error view "no Url".
- **Gating:** desktop app (Instant Play) as above.
- **Code refs:** `widget_info.dart:295-408`; `basic_fields.dart:956-1020`; `packages/nowa_runtime/lib/src/widgets/nowa_video_player_controller.dart:5-48`; `packages/core/lib/src/interpreter/libraries/youtube_library.dart:418-466`.
- **Old docs:** `video-player.md`: partly outdated (Ctrl+P, "Pick a video", "exclusive to the Desktop version of Nowa" does not match the code message); `youtube-player.md`: flag list matches; "or the full link" unverified.
- **Screenshot value:** medium.

### Lottie and Rive (dedicated topic)

- **What it does:** Plays vector animations.
- **Where:** picker -> Animations.
- **Labels:** tabs "Network" / "Asset"; "Pick Lottie" (only `.json`), "Pick Rive" (only `.riv`); Boomerang, Type (Once/Loop), Fit; Rive: Artboard, State Machine.
- **How to use:** add the widget and accept the package dialog (`lottie` or `rive`); paste a URL or upload a file. For Rive, after the file loads choose the artboard and state machine from the dropdowns.
- **Limits and rules:** file extensions as above.
- **Gating:** none found.
- **Code refs:** `widget_fields.dart:51-125`; `basic_fields.dart:1130-1500`; `widget_info.dart:237-251,658-675`.
- **Old docs:** `lottie.md`, `rive.md`: accurate but short (Rive: no Artboard/State Machine mention).
- **Screenshot value:** low.

### Web View, Html and Markdown (dedicated topic)

- **What it does:** Shows a web page, HTML text or Markdown text.
- **Where:** picker -> Integrations.
- **Labels:** Web View "URL"; Html "Data", "Shrink Wrap"; Markdown "Data", "Selectable", "Shrink Wrap", "Style".
- **How to use:** Web View: type the address; "https://" is added if the text does not start with "http"; the board shows "Web view to {url}" and "Run to preview". Html and Markdown: type or paste the text in the Data box (up to 20 lines are shown for Html).
- **Limits and rules:** Html needs `flutter_html`; no dialog is shown (Open questions).
- **Gating:** none found.
- **Code refs:** `widget_fields.dart:392-458`; `web_view_info.dart:1-150`; `packages/nowa_runtime/lib/src/widgets/markdown.dart`.
- **Old docs:** `html.md`, `markdown.md`: accurate; `webview.md`: "Coming soon".
- **Screenshot value:** low.

### Integration widgets: Admob Banner, Google Maps, RevenueCat Paywall

- **What it does:** Adds ads, maps or purchases; each needs a package and keys set in project settings.
- **Where:** picker -> Integrations; keys in **Settings** -> integration page named in the catalog.
- **Labels:** see catalog rows 40, 44, 45; settings token labels quoted there.
- **How to use:** add the widget, accept the dependency dialog, open the settings page named in the note (the Details panel has a button or gear that opens it), paste the keys. The board shows a placeholder ("Run to preview"); a real preview needs Run on a simulator, emulator or device.
- **Limits and rules:** AdMob App ID must start with "ca-app-pub-"; an AdMob key for only one platform breaks the other (settings text).
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/interpreter/packages/integrations/admob_package_config.dart:11-60,268-360`; `google_maps_package_config.dart:11-135`; `revenuecat_package_config.dart:11-140`; `integration_preview_view.dart:1-80`.
- **Old docs:** `admob-banner.md`: "Coming soon"; none for the others.
- **Screenshot value:** medium.

---

## Proposed dedicated pages (D5)

| Proposed page | Widgets covered | Why a full page | Key content (from the entries above) | Old URLs it answers |
|---|---|---|---|---|
| Widget catalog (`widgets/index.md`) | all 45 | D5 | the table, grouped by category, one anchor per old docUrl slug | all 31 `/ui/widgets/widget-desc/*`, `/ui/layout/groups` (anchor to Group) |
| Text field and forms | Text Field, Dropdown menu, Pin Code Field, Form wrapper | Nowa creates variables and validators; non-obvious | steps 1-5 in "Text Field and forms" | `.../textfield` |
| Lists and grids | List View, Grid View, Swipeable Stack | Builder vs Normal, list linking, preview rules | steps in "Lists and grids" | `.../listview`, `.../gridview` |
| Navigation bar and screen parts | Bottom Navigation Bar, App Bar, Drawer, Floating Button (+ Indexed Stack, Page View, TabView, Cross Fade as a "switching content" section) | slots, auto `pageIndex` | the two entries above | `.../navigation-bar`, `.../appbar`, `.../drawer`, `.../floating-action-button`, `.../tabview`, `.../pageview`, `.../index-stack`, `.../cross-fade` |
| Images, video and animations | Image, SVG, Video Player, YouTube Player, Lottie, Rive | assets, packages, platform limits | the four media entries | `.../image`, `.../svg`, `.../video-player`, `.../youtube-player`, `.../lottie`, `.../rive` |
| Web content | Web View, Html, Markdown | small; may merge into the media page | one entry | `.../webview` |
| (already planned) `show-data.md` | Data Builder | data sources | Source / Query, loading and error | `.../data-builder` |
| (already planned) `admob.md`, `google-maps.md`, `revenuecat.md` | Admob Banner, Google Maps, RevenueCat Paywall | integration setup | catalog notes | `.../admob-banner` |
| Everything else stays catalog-only | Container, Text, Icon, Buttons, progress, Checkbox, Switch, Slider, tiles, Alert Dialog, Wrap, AnimatedContainer ... | no Nowa-specific setup beyond the Details panel | catalog rows | rest of app links |

---

## Not user-facing (leave out)

| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| `ToolBoxPanel` and the category-headed `WidgetPicker` grid | `packages/designer/lib/src/panels/tool_box_panel.dart:6-14`; `widget_picker.dart:57-129` | defined but referenced nowhere; only place `widgetCategories` headings would be drawn |
| `WidgetPanel` (flat widget grid) | `packages/designer/lib/src/panels/widget_panel.dart:5-100` | not referenced; the sidebar **Widgets** panel is a different file (screens and components) |
| `DeveloperPanel` ("Dev" list of field editors) | `packages/designer/lib/src/panels/developer_panel.dart:6-60` | not referenced anywhere |
| `isBeta` flag and `BETA` pill | `widgets_to_add.dart:25,31`; `widget_picker.dart:402,491-519` | no entry sets it in v3.12.5 |
| Commented-out "Page indicator" widget | `widgets_to_add.dart:928-936` | disabled |
| Onboarding and walkthrough anchors (`WalkthroughAnchor` on Text Field, Button, Group, Icon rows; wrapper "Container"; validator and icon-picker anchors) | `widget_picker.dart:175-185`; `widget_details.dart:106-108,192-199` | internal tour hooks |
| Analytics event on widget creation | `common_design.dart:198-201` | internal analytics |
| `DataBuilderItem.loadFuture` / `loadStream` returning null | `packages/data/lib/src/firebase/firebase_field.dart:35-42` | unused hooks |
| Hard-coded service credential in the client for feedback forms (value deliberately not copied here) | `packages/core/lib/src/dialogs/dialog_data_sender.dart:9-16` | security finding for the product team, never for docs |
| `ButtonConnector` (Enabled -> create variable) mostly commented out | `widget_info.dart:598-651`; `button_fields.dart:150-175` | "Create Variable" may not show, see Open questions |

---

## Open questions

1. **Categories in the picker.** The released picker (Ctrl/⌘+K) is flat; `widgetCategories` (Basic, Images, Buttons, Layout, Players, Animations, Progress Indicators, Forms, Screen Components, Integrations) is only drawn by an unreferenced panel. Should the catalog page group by these anyway (this file does), and is there another released surface (mobile project view, empty-workspace "Browse widgets") that shows them?
2. **Screens in the picker.** Per code the **Components** chip also lists screens (no `isScreen` filter). Confirm live.
3. **Html needs `flutter_html`** (`dart_package.dart:109`) but `Html` declares no dependency (`DefaultWidgetInfo.dependencies` is empty), so no "Add Missing Dependencies" dialog. How does the package reach `pubspec.yaml`? Confirm live.
4. **YouTube Player "Initial Video Id".** Old docs say a full link also works; code shows only an id (`9Q2MZes5lt8`) and the board placeholder builds `watch?v=<value>`. Does a URL work?
5. **TabView Length.** Nothing in the code keeps `DefaultTabController.length` equal to the number of tabs and pages (no custom editor). Confirm what a user must do.
6. **Dropdown menu "Value".** The editor reads and writes a `value` argument (`form_fields.dart:222-232`) but `DropdownButtonFormField` in the library has `initialValue` (`material_library_custom.dart`) and the picker default sets `initialValue: 'first'` (`widgets_to_add.dart:670`). Does choosing a Value work on a Dropdown menu?
7. **Cross Fade name.** The Outline name lookup key is misspelled (`AnimatedCrossFadeInfo`, `declaration_info_factory.dart:46`), so the widget probably shows as "AnimatedCrossFade". Confirm.
8. **Video Player in Instant Play on the web editor.** `VideoPlayerCustomView` returns the real player for network videos when not on desktop; does it play in the browser editor? The message "Platform not supported, only available on iOS and Android" appears on desktop and for asset videos.
9. **Web View in Instant Play.** The board shows a placeholder; the code falls back to a real in-app browser outside the designer. Which platforms support it? Not in the code.
10. **RevenueCat Paywall fields.** They come from `PaywallView` in `purchases_ui_flutter`, not defined in Nowa's code; list them only after a live check.
11. **Button "Enabled" -> Compute -> "Create Variable".** The code carries the comment "FixMe: the additional items are not showing up in the linkMenu" (`button_fields.dart:155-156`); does "Create Variable" appear?
12. **In-app Shortcuts sheet says "Open widget picker" is Ctrl/⌘+P** (`shortcuts_cheat_sheet.dart:40`) but the binding is K and P is Play. Also noted in `upcoming-3.13.md`. Product issue.
13. **Hard-coded Airtable credential** in the client (`dialog_data_sender.dart:9-16`). Not docs content; logged here for the orchestrator.
14. **Add Wrapper conditions.** `canWrapWidget` hides the button for some slots; which user-visible cases (for example a widget placed directly as a list-builder return) hide it was not enumerated.
15. **Which widgets are mobile-only at run time** (Admob real ads, Google Maps, RevenueCat) is stated in integration page texts, not per-widget in the code; the integration researcher owns it.
