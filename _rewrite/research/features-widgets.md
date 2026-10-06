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

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| (to be filled) | | |

## Open questions
- (to be filled)
