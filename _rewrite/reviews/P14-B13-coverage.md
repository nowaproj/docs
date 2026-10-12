# P14-B13 coverage: widget reference

Old pages: `old-docs/ui/widgets/widgets-ref.md` and the 35 pages in `old-docs/ui/widgets/widget-desc/` (36 in all).
New pages: `docs/reference/widgets/` `index.md`, `forms.md`, `lists.md`, `navigation.md`, `media.md`.
Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). "Flutter SDK" refs are the framework source in
`/home/user/flutter` (3.44.8 stable), whose doc comments are what api.flutter.dev shows (api.flutter.dev itself doesn't
resolve from this sandbox). Details labels follow `packages/core/lib/src/utils.dart:77-79` (parameter name split into words)
unless a custom editor names them.

Status key: `covered` (page#section) / `added` (page#section) / `to add` (planned, not yet saved) / `obsolete` (code ref) /
`not useful` / `dev-only` / `for other page` (target).

## widgets-ref.md (list of all widgets)

| item | status | where / evidence | note |
|---|---|---|---|
| Container: painting, positioning and sizing in one widget | covered | index#container | |
| Text: text in one style | covered | index#text | |
| Image: picture from the web or from the project | covered | index#image, media#image | |
| Button: starts actions; use cases (send, share, like) | added | index#button ("Use it for") | |
| Text Field: typing box for forms and dialogs | covered | index#textfield, forms#text-field | |
| Group: row, column or free layout | covered | index#group | |
| AppBar: information and actions at the top | covered | index#appbar, navigation#app-bar | |
| Tabs: row of tabs to organize content | covered | index#tabview, navigation#tabview | |
| List: scrolling list | covered | index#listview, lists | |
| Floating Button: round button for the screen's main action | added | index#floating-action-button ("use it for") | what it is was covered |
| Loading Circular: shows loading, form submission | added | index#loading-circular (use cases) | |
| Data Builder: feeds data from REST APIs etc. into widgets | covered | index#data-builder, integrations/show-data.md | |
| Checkbox: turn options on or off | covered | index#checkbox, forms | |
| Icon: Material icon set | covered | index#icon, design/fonts-icons.md#choose-an-icon | |
| Navigation Bar: switch between main areas | covered | index#navigation-bar, navigation#bottom-navigation-bar | |
| Drawer: side panel with navigation options | covered | index#drawer, navigation#drawer | |
| List Tile: one row made for lists | covered | index#listtile; details added in lists (see listtile.md) | |
| Page View: one page at a time, sideways | covered | index#pageview, navigation#page-view | |
| Index Stack: shows one child by index and keeps the others' state | added | navigation#indexed-stack, index#index-stack | Flutter SDK `widgets/basic.dart:4815-4826` ("each keeping their respective states"; "as big as the largest child") |
| Dropdown Menu: pick one of several options in a form | covered | index#dropdown-menu, forms#dropdown-menu | |
| Admob Banner: show ads to earn money | covered | index#admob-banner, integrations/admob.md | |
| Video Player: "supports a range of video formats" | not useful | | vague; formats depend on the device |
| YouTube Player: play YouTube videos inside the app | covered | index#youtube-player, media#youtube-player | |
| Lottie: lightweight vector animations | added | media#lottie ("vector animations ... stay sharp") | code text `packages/core/lib/src/widgets_to_add/widgets_to_add.dart:559-560` |
| SVG: resolution-independent vector images | covered | media#svg ("stays sharp at any size") | |
| Rive: interactive animations made with Rive | covered | media#rive | Nowa only picks an artboard and state machine (`packages/core/lib/src/fields/basic_fields.dart:1326-1500`); "interactive" not claimed |
| HTML: rich text or web content without a browser | added | media#html ("use it for") | |
| Markdown: text with Markdown formatting | covered | media#markdown | |
| WebView: a web browser inside the app | covered | media#web-view | |
| Alert Dialog: confirm actions or show important information | added | index#alert-dialog (use cases) | |
| Wrap: children in runs that wrap | covered | index#wrap | |
| Cross Fade: smooth fade between two widgets over a duration | covered | navigation#cross-fade | |

## widget-desc/container.md

| item | status | where / evidence | note |
|---|---|---|---|
| A flexible widget with many design options | covered | index#container | |
| Add it with the **Shape** tool or the widget picker | covered | design/add-widgets.md#draw-a-shape-or-text, index#container | |
| **Color**: swatch, color picker, opacity | covered | design/properties.md#edit-a-value (color row) | |
| **Border**: + next to it, then color and width | added | index#container (Container settings) | `packages/core/lib/src/fields/basic_fields.dart:307,562-584` (Color, Width) |
| **Radius**: one number, or each corner separately with the button next to it | added | index#container (Container settings) | `basic_fields.dart:309-313`, BFBorderRadius (TL, TR, BL, BR) |
| Fill with an image: + next to **Image**, web address or asset (pick or upload) | added | media#background-image; index#container (Container settings) | `basic_fields.dart:315` BFDecorationImage (Image, Fit; Fit starts `cover`); color row hidden while an image is set (`basic_fields.dart:331-336`) |
| The seven **Fit** options explained | added | media#fit | enum values in `packages/core/lib/src/interpreter/libraries/material_library.dart:82187-82197`, shown as-is by `basic_fields.dart:1511-1548`; meanings Flutter SDK `painting/box_fit.dart:23-78` |
| **Shadow** for depth | added | index#container (Container settings) | label **Shadows** (`basic_fields.dart:317`) |
| **Gradient** fill | covered | design/properties.md (Solid, Linear, Radial, Sweep) | also named in index Container settings |
| "Add Widget" button at the top of a selected Container | obsolete | no such label in 3.13 (grep "Add Widget": none) | covered as the current way: design/add-widgets.md#put-a-widget-inside-a-container (**Empty** + **+**) |
| Use case: a background behind an icon | added | index#container ("use it for") | |
| You can keep editing the Container after adding a child | not useful | | obvious |
| Container as a wrapper (**Add Wrapper** → **Container**) | covered | reference/wrappers.md#container, index#container | |
| Use case: a color or gradient on top of an image with a Container wrapper | obsolete | a Container paints its decoration behind its child (Flutter SDK `widgets/container.dart:334`); Nowa's Container editor lists only the fill, border, radius, image, shadows, alignment, padding, margin and properties that already have a value (`packages/designer/lib/src/details/widget_fields.dart:317-350`) | the working way to tint a picture (**Color** + **Blendmode** on the Image) goes on media |
| Several Container wrappers can be stacked and reordered | covered | design/properties.md#add-a-wrapper (reorder; order changes the result) | |

## widget-desc/text.md

| item | status | where / evidence | note |
|---|---|---|---|
| Add a text with the **Text** tool or the T key | covered | design/add-widgets.md#draw-a-shape-or-text, reference/shortcuts.md | |
| One click: width and height **Auto**; click and drag: a size you draw | added | index#text (Text settings) | click places with width/height null = **Auto** (`packages/designer/lib/src/widgets/designer_tools.dart:93-94`, `packages/designer/lib/src/details/layout_details.dart:116-122` null → Auto); a drag resizes it (`packages/designer/lib/src/design_experience/place_board.dart:100-113`) |
| Added from the widget picker the size is "Fixed" | obsolete | Text is added with width and height null, so **Auto** (`widgets_to_add.dart:156-167`) | |
| **Text**: what it says | covered | design/select-and-edit.md (double-click to edit), design/properties.md | |
| **Text Align**: left, center, right, justify | added | index#text (Text settings) | four buttons (`packages/core/lib/src/fields/text_fields.dart:336-363`) |
| **Font Family**, custom fonts by drag and drop or the Files window | covered | design/fonts-icons.md#pick-a-font, #import-your-own-font | dropping font files from the computer doesn't import them in 3.13 (design/assets.md "Drag an asset onto the board") |
| **Font Weight** options | covered | design/themes.md (text style fields) | |
| **Decoration** (strikethrough, underline, overline) | covered | design/themes.md | |
| **Font Size**, **Color**, **Background** | covered | design/themes.md | |
| **Height** (line height), **Letter Spacing** | covered | design/themes.md ("letter spacing, line height") | |
| **Shadow** | covered | design/themes.md (**Shadows**) | |
| **Overflow** options: clip, ellipsis, fade, visible | added | index#text (Text settings) | enum `material_library.dart:85218-85225`; field `widget_fields.dart:309` |
| Remove the overflow setting: right-click → **Reset to default** | covered | design/properties.md#reset-a-property | |
| Link any text property to a variable | covered | design/properties.md#link-a-property-to-your-data, index#text (`$`) | |
| One text's own style vs the theme | covered | design/theme-styles.md (CopyWith / Modify Style) | linked from index Text settings |

## widget-desc/image.md

| item | status | where / evidence | note |
|---|---|---|---|
| What it is; images from assets or web addresses | covered | index#image, media#image | |
| Steps: add, paste a link in **Url**, or **Asset** → **Pick Image** → choose | covered | media#image | Network box label **Url** (`basic_fields.dart:915`) |
| Tip: **Upload Image** | covered | media#image | |
| Tip: drag and drop files from your computer into Nowa | obsolete | design/assets.md: dropping files from the computer doesn't import them; import, then drag from the Library | covered as the current way there |
| **Color** blends with the picture | added | media#image | Image default blend mode is srcIn (Flutter SDK `widgets/image.dart:962-970`), so a color alone turns the picture into a one-color shape |
| **Blendmode** options (darken, lighten, multiply...) | added | media#image | label `widget_fields.dart:42` |
| The seven **Fit** options | added | media#fit | as container.md |

## widget-desc/button.md

| item | status | where / evidence | note |
|---|---|---|---|
| What it does: navigate, submit, run logic | covered | index#button, logic/events.md | |
| Add from the widget picker | covered | design/add-widgets.md | Library in 3.13 |
| The label is a Text inside: change words, font, color | covered | index#button | wording extended slightly |
| **Enabled**: off = dimmed and can't be pressed | covered | logic/events.md (Enabled, "Disabling button will remove your function, use compute instead") | |
| **On Pressed**, **On Long Press** open Circuit | covered | logic/events.md, index#button | |
| **On Hover** (web and desktop) | added | index#button | runs when a pointer moves onto or off the button (Flutter SDK `material/button_style_button.dart:118-122`); events.md only lists it |
| **Button Style** follows the theme (shape, color, padding, border) | covered | design/theme-styles.md (Button Style, Button Theme) | |
| Tip: disable a button until a form is complete | covered | logic/events.md (**Compute**) | |
| Tip: change colors from state | covered | design/properties.md#link-a-property-to-your-data | |

## widget-desc/icon.md

| item | status | where / evidence | note |
|---|---|---|---|
| **Icon**: pick from the icon set | covered | design/fonts-icons.md#choose-an-icon | |
| **Size**, **Color** | covered | design/fonts-icons.md | |
| **Fill**, **Weight**, **Grade**, **Optical Size** explained | not useful | Flutter SDK `widgets/icon.dart:113-127`: no effect unless the icon font supports that axis; the picker offers `MaterialIcons` only (`packages/core/lib/src/fields/icon_field.dart:128`), whose font has no variable axes (`MaterialIcons-Regular.otf` has no `fvar` table) | for other page: a one-line caveat on design/fonts-icons.md |
| **Shadows** | covered | design/fonts-icons.md (advanced list) | |
| **Semantic Label**: read by screen readers | added | index#icon | `packages/core/lib/src/fields/button_fields.dart:61` |
| **Text Direction**: arrows and similar icons follow the reading direction | for other page | design/fonts-icons.md | Flutter `Icon.textDirection`; low priority |

## widget-desc/checkbox.md

| item | status | where / evidence | note |
|---|---|---|---|
| **Value**: checked, unchecked or (with Tristate) a dash | added | forms#checkbox-switch-slider | params `material_library.dart:9016-9041`; dash for null: Flutter SDK `material/checkbox.dart:254-263` |
| **Tristate** | added | forms#checkbox-switch-slider | same |
| **On Changed** | covered | forms (checkboxes section), index#checkbox | |
| **Active Color**, **Check Color** | added | forms#checkbox-switch-slider | |
| **Focus Color**, **Hover Color** | added | forms#checkbox-switch-slider | |
| **Splash Radius** | not useful | | minor cosmetic setting, visible in Details |
| **Autofocus** | not useful | | keyboard focus when the screen opens; rarely needed |
| **Side** (the box's border) | added | forms#checkbox-switch-slider | |
| **Is Error** | added | forms#checkbox-switch-slider | |
| **Semantic Label** | added | forms#checkbox-switch-slider | |

## widget-desc/loading-circular.md

| item | status | where / evidence | note |
|---|---|---|---|
| **Value**: empty spins; 0 to 1 shows progress | covered | index#loading-circular | |
| **Background Color** | added | index#loading-circular | params `material_library.dart:61150+` |
| **Color** | added | index#loading-circular / index#linear-progress-indicator | |
| **Stroke Width** | added | index#loading-circular / index#linear-progress-indicator | |
| **Stroke Align** | not useful | | minor cosmetic setting |
| **Semantics Label**, **Semantics Value** | added | index#loading-circular / index#linear-progress-indicator | |

## widget-desc/linear-progress-indicator.md

| item | status | where / evidence | note |
|---|---|---|---|
| Add it from the widget panel | covered | design/add-widgets.md | |
| Position and size with drag, L/T/R/B, W/H | covered | design/layout.md, design/select-and-edit.md | |
| Alignment tool | covered | design/layout.md | |
| **Value** 0 to 1 | covered | index#linear-progress-indicator | |
| **Background Color**, **Color** | added | index#loading-circular / index#linear-progress-indicator | params `material_library.dart:61083+` |
| Minimum height (thickness) | added | index#loading-circular / index#linear-progress-indicator | label **Min Height** |
| **Semantics Label** / **Semantics Value** | added | index#loading-circular / index#linear-progress-indicator | |
| **Radius** (rounded ends) | added | index#loading-circular / index#linear-progress-indicator | label **Border Radius** in 3.13 |
| Example: Value 0.4 = 40% | added | index#loading-circular / index#linear-progress-indicator | |

## widget-desc/listtile.md

| item | status | where / evidence | note |
|---|---|---|---|
| What it is: one row of information for a list | covered | index#listtile | |
| **Leading**, **Title**, **Subtitle**, **Trailing** | added | lists#list-tile | params `material_library.dart:55917+` |
| **Is Three Line** | added | lists#list-tile | Flutter SDK `material/list_tile.dart:478-484` |
| **Dense** | added | lists#list-tile | |
| **Shape** | added | lists#list-tile | |
| **Selected**, **Selected Color**, **Selected Tile Color** | added | lists#list-tile | |
| **Icon Color**, **Text Color** | added | lists#list-tile | |
| **Title Text Style**, **Subtitle Text Style**, **Leading And Trailing Text Style** | added | lists#list-tile | |
| **Content Padding** | added | lists#list-tile | |
| **Enabled** | added | lists#list-tile | |
| **On Tap**, **On Long Press** | added | lists#list-tile | |
| **On Focus Change** | not useful | | keyboard focus event |
| **Focus Color**, **Hover Color**, **Splash Color** | not useful | | minor cosmetic settings |
| **Autofocus**, **Enable Feedback** | not useful | | rarely needed |
| **Tile Color** | added | lists#list-tile | |
| **Horizontal Title Gap**, **Min Vertical Padding**, **Min Leading Width** | added | lists#list-tile | |

## widget-desc/expansion-tile.md

| item | status | where / evidence | note |
|---|---|---|---|
| What it is: a panel that expands; use case (grouped info) | added | lists#expansion-tile | |
| Add it from the widget picker | covered | design/add-widgets.md | |
| **Leading**, **Trailing** (can replace the arrow), **Title**, **Subtitle** | added | lists#expansion-tile | editor order `basic_fields.dart` BFExpansionTile; trailing replaces the arrow: Flutter SDK `material/expansion_tile.dart:217-220` |
| **Children**: + to add widgets | covered | index#expansion-tile | detail added in lists |
| **On Expansion Changed**: logic when it opens or closes | added | lists#expansion-tile | `value` is true when opening, false when closing (Flutter SDK `material/expansion_tile.dart:180-184`) |
| Colors and shapes for open and closed states | added | lists#expansion-tile | **Background Color**/**Collapsed Background Color**, **Text Color**/**Collapsed Text Color**, **Icon Color**/**Collapsed Icon Color**, **Shape**/**Collapsed Shape** |
| **Initially Expanded** | covered | index#expansion-tile | now at the top of the section, not under advanced |
| Advanced: **Enabled**, **Show Trailing Icon**, **Tile Padding**, **Children Padding**, **Control Affinity**, **Maintain State** | added | lists#expansion-tile | **Maintain State** corrected: keeps the hidden widgets while closed (Flutter SDK `material/expansion_tile.dart:234-238`), not "when navigating away" |
| Advanced: **Min Tile Height**, **Expanded Alignment**, **Expansion Animation Style**, **Controller**, **Clip Behavior**, **Dense**, **Visual Density**, **Enable Feedback** | not useful | | rarely needed; visible under **Show advanced options** |

## widget-desc/listview.md

| item | status | where / evidence | note |
|---|---|---|---|
| Lists show data; Builder and Normal | covered | lists#choose-builder-or-normal | |
| Video: GET request + Data Builder + ListView | not useful | | pure media; topic covered by integrations/show-data.md |
| Open the widget picker with Ctrl/Cmd + O | obsolete | Ctrl/Cmd + K opens the Library (`packages/designer/lib/src/actions/add_actions.dart:13-31`) | lists uses K |
| Builder only builds the items on screen, so long lists stay fast | added | lists#choose-builder-or-normal | Flutter SDK `widgets/scroll_view.dart:1354-1356` |
| Builder can add separators | covered | lists#list-view step 5 | |
| Normal takes any mix of widgets, like a scrolling column | added | lists#choose-builder-or-normal | |
| Fill the screen: screen as a Column, **Expand** | covered | lists#list-view | |
| Design first with placeholders, connect the list last | added | lists#connect-a-list | |
| Placeholder next to **itemBuilder**: pick a widget or component | covered | lists#list-view step 2 (**Item Builder** → **Pick Widget**) | |
| **Item Count** previews; follows the list once connected | covered | lists#list-view, #connect-a-list | |
| Fixed spacing; drag the space on the board | covered | lists#list-view (field) | starts at 20 (`packages/core/lib/src/fields/list_view_field.dart:272`); dragging on the board not verified, not added |
| Widget separator: a Divider with height, thickness, color | added | lists#list-view | Divider starts gray, thickness 1 (`list_view_field.dart:266-271`); Divider params `material_library.dart:14105+` |
| Worked example: model, component param, list variable, connect, `element` | added | lists#example | pieces covered in logic/models.md, logic/parameters.md, guides/complete-app.md |
| `element` appears under **LOCALS** once connected | covered | lists#connect-a-list | |
| **Padding** around the list | added | lists#scroll-settings | `list_view_field.dart:122-126` |
| Normal: **Children**, +, replace, reorder | covered | lists#build-a-list-by-hand | |
| Normal → Builder keeps only the first child | covered | lists#build-a-list-by-hand | |
| Tip: reorder so the widget you want is first | covered | lists#build-a-list-by-hand | |

## widget-desc/gridview.md

| item | status | where / evidence | note |
|---|---|---|---|
| ListView and GridView are the two ways to show data | covered | lists intro | |
| Builder: a list from a variable, a global state or a backend | covered | lists#connect-a-list | |
| Normal: widgets without data | covered | lists#choose-builder-or-normal | |
| Fill the space with a Column and **Expand** | covered | lists#list-view | |
| Starts in Builder; design, then connect | covered | lists#grid-view | |
| **itemCount** preview | covered | lists#grid-view (**Item Count**) | |
| Replace the placeholder | covered | lists#list-view | |
| **Fixed**: items across | covered | lists#grid-view | |
| **Max**: largest item width | covered | lists#grid-view | |
| Main and cross spacing | covered | lists#grid-view (the old explanation of axes was wrong) | |
| **Main Axis Extent** | covered | lists#grid-view | |
| Aspect ratio needs an empty Main Axis Extent; right-click to clear | covered | lists#grid-view (**Reset to default**) | |
| Normal: type a number or click + to add children | covered | lists#build-a-list-by-hand, design/properties.md (list editor) | |
| Linking **Children** to a list switches to Builder | added | lists#build-a-list-by-hand | `list_view_field.dart:19-40,103`; `packages/core/lib/src/fields/grid_view_field.dart:41,130` |
| Worked example: plant cards | added | lists#example | same as listview.md |
| The list usually comes from a backend; sample items for the demo | added | lists#example | |

## widget-desc/video-player.md

| item | status | where / evidence | note |
|---|---|---|---|
| Use case: course and education apps | added | media#video-player | |
| Open the widget panel with Ctrl/Cmd + P | obsolete | Ctrl/Cmd + K (`add_actions.dart:13-31`) | |
| Drag the Video Player onto the screen | covered | design/add-widgets.md | |
| **Asset**: pick or upload a video | covered | media#video-player (**Pick Video**, **Upload Video**) | |
| Caution: videos in the app make it bigger; prefer **Network** | added | media#video-player | size part covered; recommendation added |
| **Network**: **Url** must point straight at the file (.mp4) | covered | media#video-player | **Url** label (`basic_fields.dart:983`) added |
| **Auto Play** | covered | media#video-player | |
| **Show Controls Bar**; both off = can't play | covered | media#video-player | |
| Can't preview on the board; test on an emulator or phone (desktop app) | covered | media#video-player, test/devices.md (desktop badge) | |
| YouTube tutorial on testing with the desktop app | not useful | | pure media |
| Closing encouragement | not useful | | filler |

## widget-desc/youtube-player.md

| item | status | where / evidence | note |
|---|---|---|---|
| What it is | covered | media#youtube-player | |
| **Initial Video Id**: the ID (example `9Q2MZes5lt8`) | covered | media#youtube-player | |
| ...or the full link | obsolete | the package passes the value straight to the player as a video ID (`youtube_player_flutter` 9.1.3, `lib/src/player/raw_youtube_player.dart:263`); Nowa's board builds the thumbnail from it (`packages/core/lib/src/interpreter/declaration_info/widget_info.dart:330-343`) | |
| **Hide Controls**, **Auto Play**, **Mute**, **Loop**, **Start At**, **End At** | covered | media#youtube-player | |
| **Controls Visible At Start** | added | media#youtube-player | flags `packages/core/lib/src/interpreter/libraries/youtube_library.dart:303+`; meanings from the package docs (`lib/src/utils/youtube_player_flags.dart:7-80`) |
| **Is Live**, **Show Live Fullscreen Button**, **Live UIColor** | added | media#youtube-player | |
| **Hide Thumbnail** | added | media#youtube-player | |
| **Disable Drag Seek** | added | media#youtube-player | |
| **Enable Caption**, **Caption Language** | added | media#youtube-player | captions on by default, language `en` |
| **Force HD** | added | media#youtube-player | |
| **Use Hybrid Composition** | not useful | | technical rendering setting; the package recommends it only for Android 10+ |
| **Width**, **Aspect Ratio** (16:9) | added | media#youtube-player | player params `youtube_library.dart:138+`; defaults from the package (`lib/src/player/youtube_player.dart`) |
| Controls timeout | added | media#youtube-player | label **Controls Time Out** |
| **Buffer Indicator**, **Thumbnail** | added | media#youtube-player | |
| **Progress Indicator Color**, **Show Video Progress Indicator** | added | media#youtube-player | |
| **On Ready**, **On Ended** | added | media#youtube-player | |
| **Top Actions**, **Bottom Actions**, **Actions Padding** | added | media#youtube-player | |
| Needs the `youtube_player_flutter` package | dev-only | for-code #packages | the reader just clicks **Add** in **Add Missing Dependencies** |

## widget-desc/lottie.md

| item | status | where / evidence | note |
|---|---|---|---|
| What it is | covered | media#lottie | |
| Add from the widget picker | covered | design/add-widgets.md | |
| **Source**: web or assets | covered | media#lottie | |
| **Boomerang** | covered | media#lottie | |
| **Type**: **Loop** or **Once** | covered | media#lottie | |
| **Fit**: cover, contain | covered | media#lottie; Fit table added on media | |
| About Lottie and LottieFiles | covered | media#lottie | |

## widget-desc/rive.md

| item | status | where / evidence | note |
|---|---|---|---|
| What Rive is | covered | media#rive | |
| Add from the widget picker | covered | design/add-widgets.md | |
| Source: web address or asset | covered | media#rive | |
| **Fit**: cover, contain | obsolete | 3.13's Rive section has the file, **Artboard** and **State Machine** only (`packages/designer/lib/src/details/widget_fields.dart:97-125`, `basic_fields.dart:1326-1500`) | |

## widget-desc/html.md

| item | status | where / evidence | note |
|---|---|---|---|
| What it is | covered | media#html | |
| Steps: add, paste HTML in Details | covered | media#html | |
| **Data** | covered | media#html | |
| **Shrink Wrap** | covered | media#html | |

## widget-desc/markdown.md

| item | status | where / evidence | note |
|---|---|---|---|
| What it is | covered | media#markdown | |
| Steps | covered | media#markdown | |
| **Data** | covered | media#markdown | |
| **Selectable** | covered | media#markdown | |
| **Shrink Wrap** | added | media#markdown | `widget_fields.dart:424` |
| **Style** | covered | media#markdown | |

## widget-desc/data-builder.md

| item | status | where / evidence | note |
|---|---|---|---|
| Video: GET request, Data Builder, ListView | not useful | | pure media; Data Builder covered by integrations/show-data.md and index#data-builder |

## widget-desc/navigation-bar.md

| item | status | where / evidence | note |
|---|---|---|---|
| Video: bottom navigation bar (Water Tracker part 4) | not useful | | pure media; topic covered by navigation#bottom-navigation-bar |

## "Coming soon" stubs (front-matter description only)

| page | item | status | where / evidence |
|---|---|---|---|
| appbar.md | How to use the AppBar | covered | navigation#app-bar |
| slider.md | How to use the Slider | covered | index#slider; settings added on forms |
| drawer.md | How to add a drawer | covered | navigation#drawer |
| index-stack.md | How to use the Index Stack | covered | navigation#indexed-stack |
| pageview.md | Show several pages with a Page View | covered | navigation#page-view |
| svg.md | Show an SVG in the app | covered | media#svg |
| tabview.md | Add a TabView | covered | navigation#tabview |
| webview.md | Show a website with a Web View | covered | media#web-view |
| admob-banner.md | Show an AdMob banner | covered | integrations/admob.md, index#admob-banner |
| textfield.md | Accept user input with a Text Field | covered | forms#text-field |
| alert-dialog.md | Show an Alert Dialog | covered | logic/popups.md#show-a-dialog, index#alert-dialog |
| cross-fade.md | Switch between two widgets with a cross fade | covered | navigation#cross-fade |
| empty-widget.md | Use a SizedBox (Empty widget) to reserve space | covered | index#empty-widget |
| floating-action-button.md | Add a Floating Action Button | covered | navigation#floating-button |
| wrap.md | Show widgets in a wrap layout | covered | index#wrap, design/layout.md#scroll-or-wrap-content |

## Totals

235 items on 36 old pages (15 of them "Coming soon" stubs with only a description):

| status | count |
|---|---|
| covered | 131 |
| added | 78 |
| not useful | 16 |
| obsolete | 8 |
| dev-only | 1 |
| for other page | 1 |

Obsolete: the Container "Add Widget" button, Text from the picker being "Fixed", dropping files from the computer into Nowa,
Ctrl/Cmd + O and Ctrl/Cmd + P for the picker, the YouTube "full link", Rive **Fit**, and the Container wrapper "color on top of an
image" (a Container paints behind its child). "For other page" and two related proposals are in `P14-B13-notes.md`.
