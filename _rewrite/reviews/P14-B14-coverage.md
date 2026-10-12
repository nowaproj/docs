# P14-B14 coverage: old shortcuts and wrapper pages

Batch pages: `docs/reference/index.md`, `wrappers.md`, `shortcuts.md`, `glossary.md`.
Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Flutter refs are the framework doc comments in the
local Flutter 3.44.8 SDK (`/home/user/flutter`), which are the text api.flutter.dev publishes (api.flutter.dev does not
resolve from this environment, so the source was read directly).

Status: `covered` (already in the new docs) / `added` (added in this pass) / `obsolete` / `not useful` / `dev-only` /
`for other page`.

## Old `shortcuts.md` (redirect `/shortcuts` → `/reference/shortcuts`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Intro: learn the shortcuts to work faster | not useful | | Filler. The new intro gives the same idea with specifics. |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>G</kbd> groups / ungroups | covered + added | `shortcuts.md#design-on-the-board` (group), the sheet-mismatch table and the ungroup note; added to `shortcuts.md#if-you-used-an-older-version` | The key only groups now: `packages/designer/lib/src/designer_setup.dart:20` (`CreateGroupIntent`); ungroup is the right-click entry `packages/designer/lib/src/menus/widget_context_menu.dart:42`; the in-app sheet still says "Group/Ungroup" (`packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:56`). |
| Undo <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> | covered | `shortcuts.md#general` | `lib/setup_general_actions.dart:26` |
| Redo <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> or <kbd>Y</kbd> | covered | `shortcuts.md#general` | `lib/setup_general_actions.dart:27-28` |
| Zoom with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + mouse wheel or a two-finger pinch | covered | `shortcuts.md#mouse-and-trackpad` | `packages/core/lib/src/board/board_view.dart:170-237` |
| Hold <kbd>Alt</kbd>/<kbd>Option</kbd> and drag to duplicate a widget or screen | covered | `shortcuts.md#mouse-and-trackpad` ("Drag a copy of the selection") | `packages/designer/lib/src/design_experience/designer_board_controller.dart:199` (`copy: isAltPressed`) |
| Copy <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd> | covered | `shortcuts.md#general` | `lib/setup_general_actions.dart:30` |
| Paste (the old table said <kbd>Ctrl</kbd> + <kbd>Z</kbd>, a typo) | covered | `shortcuts.md#general` (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>) | `lib/setup_general_actions.dart:29` |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>]</kbd> moves the widget one layer up | covered | `shortcuts.md#design-on-the-board` (**Bring forward**) | `packages/designer/lib/src/designer_setup.dart:22` |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>[</kbd> moves the widget one layer down | covered | `shortcuts.md#design-on-the-board` (**Send backward**) | `packages/designer/lib/src/designer_setup.dart:23` |
| <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>P</kbd> opens the widget picker | obsolete (+ added as a "changed" row) | Now runs the app in the **Embedded preview**: `packages/designer/lib/src/designer_setup.dart:50` (`PlayInDesignerIntent`) → `:108` (`RunAppAction`). Adding a widget is <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> (`designer_setup.dart:51`), which opens the Library. | Both covered on `shortcuts.md#run-your-app` and `#design-on-the-board`; the change is now spelled out in `shortcuts.md#if-you-used-an-older-version` for people who arrive from the old URL. |

## Old `ui/wrappers/wrappers-list.md` (redirect → `/reference/wrappers`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Gesture detector: reacts to tap, double tap, swipe and pinch | covered + added | `wrappers.md#gesture-detector` | Swipes and pinches live under **Show advanced options** (for example **On Horizontal Drag End**, **On Scale Update**): `packages/designer/lib/src/details/widget_fields.dart:488-514`; parameter names in `packages/core/lib/src/interpreter/libraries/material_library.dart:92329-92420`; labels split from the names (`packages/core/lib/src/utils.dart:77-79`, `packages/core/lib/src/fields/block_field.dart:212-221`). |
| Padding: space so content doesn't stick to the edges | covered | `wrappers.md#padding` | |
| Opacity: makes the child partly transparent | covered | `wrappers.md#opacity` | |
| Clip Radius: rounder corners | covered | `wrappers.md#clip-radius` | The list now spells it **Clip radius** (`packages/core/lib/src/wrappers_to_add.dart:42`). |
| Container: positioning and sizing in one | covered | `wrappers.md#container` | |
| Transform: scale, rotate, translate | covered | `wrappers.md#transform` | |
| Fitted Box: scale and position within itself | covered | `wrappers.md#fitted-box` | |
| Scroll View: scrolling for overflowing content | covered | `wrappers.md#scrollview` | |
| Align: align a child within itself | covered | `wrappers.md#align` | |
| Fractional Sized Box: a percentage of the parent's size | covered | `wrappers.md#fractionally-sized-box` | Now **Fractionally Sized Box** (`wrappers_to_add.dart:73`); old spelling kept in keywords and added to the glossary's renamed table. |
| Intrinsic Height / Intrinsic Width | covered | `wrappers.md#intrinsic-height`, `#intrinsic-width` | |
| Data Builder: feeds data from sources like REST APIs | covered | `wrappers.md#data-builder`, `docs/integrations/show-data.md` | |
| Constrained Box: imposes constraints | covered | `wrappers.md#constrained-box` | |
| Material: ink splash, color, shape, elevation | covered + added | `wrappers.md#material` | Ripples paint on the nearest Material: Flutter `material/ink_well.dart:264-297` (InkResponse) and `:1440-1471` (InkWell troubleshooting). |
| Ink Well: splash on tap | covered + added | `wrappers.md#ink-well` (tip when the ripple doesn't show) | Same Flutter refs as above. |
| Interactive Viewer: panning, zooming and rotation | covered (pan, zoom) / obsolete (rotation) | `wrappers.md#interactive-viewer` | Flutter has no rotation: `widgets/interactive_viewer.dart:510-513` (`_rotateEnabled = false`, TODO). |
| Safe Area: padding that avoids system intrusions | covered | `wrappers.md#safe-area` | |
| Drawer: sliding navigation panel | covered | `wrappers.md#drawer` | |
| Color Filter: grayscale, sepia or custom color changes | covered (recolor) / not added (grayscale, open question) / not useful (sepia) | `wrappers.md#color-filter` | Grayscale would be **Blend Mode** `saturation` with the starting gray color (fields: `packages/core/lib/src/fields/basic_fields.dart:1952-1969`; `mode` constructor `material_library.dart:80347-80353`; `saturation` value `material_library.dart:79852`; Flutter `ColorFilter.mode` and `BlendMode.saturation` in `bin/cache/pkg/sky_engine/lib/ui/painting.dart:4092-4099`, `:956-970`). Not added: the wrapper's starting filter passes positional arguments by name (`wrappers_to_add.dart:101-114`), which looks broken; see notes, open question 1. Sepia needs the `matrix` form (20 numbers), not a practical no-code path. |
| Text Direction: left-to-right or right-to-left | covered | `wrappers.md#text-direction`, `docs/design/localization.md#show-text-right-to-left` | |
| Default text style | covered | `wrappers.md#default-text-style` | Now **Default Text Style** (`wrappers_to_add.dart:122`). |
| Visibility: a variable or a function decides | covered | `wrappers.md#visibility`, `docs/logic/expressions.md#visibility` | |
| Form: groups and validates text fields, checkboxes and buttons | covered / obsolete (checkboxes, buttons) | `wrappers.md#form`, `docs/reference/widgets/forms.md` | The Form section lists a validator per **Text Field**, **Dropdown menu** and **Pin Code Field** only: `packages/core/lib/src/fields/form_fields.dart:13-23`. |
| (List lacked Notifier Builder, Screen, Aspect Ratio, Badge, Tooltip, Dismissible, Refresh Indicator, AnimatedContainer) | covered | `wrappers.md#all-wrappers` | All 32 from `wrappers_to_add.dart:12-188`. |

## Old `ui/wrappers/gesture-detector.md` (redirect → `/reference/wrappers#gesture-detector`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Makes any widget interactive with taps and presses | covered | `wrappers.md#gesture-detector` | `wrappers_to_add.dart:32-36` |
| **On Tap**: one tap, for example go to another page or change what's shown | added | `wrappers.md#gesture-detector` | `widget_fields.dart:495` (`alwaysShown`) |
| **On Secondary Tap**: right-click with a mouse | added | `wrappers.md#gesture-detector` | `widget_fields.dart:495`; Flutter `onSecondaryTap` is the secondary (right) mouse button |
| **On Double Tap**: two quick taps, for example zoom an image | added | `wrappers.md#gesture-detector` | `widget_fields.dart:495` |
| **On Long Press**: press and hold, for example show a menu or more information | added | `wrappers.md#gesture-detector` | `widget_fields.dart:495` |
| Clicking an event opens Circuit to build the logic visually | covered + added | `docs/logic/events.md#add-logic-to-an-event`; one line on `wrappers.md#gesture-detector` | `packages/core/lib/src/fields/basic_fields.dart:533-559` (`BFFunction` → `openBlockInCircuit`); buttons **+** / **Edit**: `packages/core/lib/src/fields/nowa_fields.dart:808`, `:824-826` |
| Link to "Intro to Circuit" | covered | `docs/logic/circuit.md` | |

## Old `ui/wrappers/material.md` (redirect → `/reference/wrappers#material`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Adds a surface with color and shadow so parts stand out | covered + added | `wrappers.md#material` | `basic_fields.dart:1873-1903` |
| **Color**: the surface's color | added | `wrappers.md#material` | Defaults to the theme's surface color (`basic_fields.dart:1880-1884`). |
| **Elevation**: how high it looks, so the shadow's size | added | `wrappers.md#material` | Flutter `material/material.dart:225-250`; a shadow shows only above 0 (`:318-326`). |
| **Shadow Color** | added | `wrappers.md#material` | Flutter `material.dart:269-285` |
| **Tint Color**: a color overlay | added | `wrappers.md#material` | Label is `surfaceTintColor` renamed (`basic_fields.dart:1896`). Flutter `material.dart:287-312`: overlay strength follows **Elevation** (Material 3, Flutter's default: `material/theme_data.dart:413`). |
| **Border**: outline thickness and color | added | `wrappers.md#material` | Label is `shape` renamed (`basic_fields.dart:1897`); **+** starts a rounded rectangle with a 1 px black side (`basic_fields.dart:1854-1869`). |
| **Border On Foreground**: border over or under the content | added | `wrappers.md#material` | Flutter `material.dart:328-332` (default on: drawn in front of the child). |
| Animated GIF | not useful | | Media from an older UI. |

## Old `ui/wrappers/opacity.md` (redirect → `/reference/wrappers#opacity`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| What it does: transparency, to blend in or focus attention | covered + added | `wrappers.md#opacity` | Use-it-for examples added. |
| "Create a fade-in or fade-out effect" | added (corrected) | `wrappers.md#opacity` | The wrapper sets a fixed level and doesn't animate; for a smooth fade the page points to **Cross Fade** (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:444-462`). |
| Steps: select, **Add Wrapper**, **Opacity** | covered | `wrappers.md#add-a-wrapper` | |
| Value between 0 and 1: 0 invisible, 1 fully visible | covered | `wrappers.md#opacity` | Starts at 0.5: `wrappers_to_add.dart:40`. Flutter `widgets/basic.dart:345-352`. |
| **Always Include Semantics**: screen readers | added (corrected) | `wrappers.md#opacity` | Only a fully transparent (0) widget is hidden from screen readers by default: Flutter `rendering/proxy_box.dart:956-960` (`RenderOpacity.visitChildrenForSemantics`, `_alpha != 0 || alwaysIncludeSemantics`), `widgets/basic.dart:353-362`. The old page said semi-transparent ones may be excluded too, which is wrong. |
| Why: accessibility; transparent for sight but still announced | added | `wrappers.md#opacity` | Folded into the line above. |
| Animated GIF | not useful | | |

## Old `ui/wrappers/padding.md` (redirect → `/reference/wrappers#padding`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Empty space so content isn't too close to the edge or other widgets | covered | `wrappers.md#padding` | |
| Use: makes the UI less cramped, easier to read | added | `wrappers.md#padding` | Design guidance. |
| Use: keeps touch targets apart, fewer accidental taps | added | `wrappers.md#padding` | Design guidance. |
| Use: groups related widgets visually | added | `wrappers.md#padding` | Design guidance. |
| Use: helps align widgets | not useful | | Vague; alignment is covered by **Align** and the Group's **Alignment** (`docs/design/layout.md#rows-and-columns`). |
| Use: keeps text away from edges, easier to read | added | `wrappers.md#padding` | Merged with "less cramped". |
| Steps: select, **Add Wrapper**, **Padding** | covered | `wrappers.md#add-a-wrapper` | |
| Change the values in Details | covered + added | `wrappers.md#padding` | Horizontal and vertical fields, **Individual padding** for each side, no negative values: `basic_fields.dart:745-842`. Starts at 8: `wrappers_to_add.dart:13-26`. |
| Tip: reorder Padding to put it inside or outside a widget | covered | `wrappers.md#reorder-wrappers`, `docs/design/properties.md#add-a-wrapper` | Reorder by drag: `packages/designer/lib/src/details/wrapper_details.dart:54-70`. |
| Animated GIFs | not useful | | |

## Old `ui/wrappers/scrollview.md` (redirect → `/reference/wrappers#scrollview`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Makes content scrollable when it's bigger than the screen | covered | `wrappers.md#scrollview` | `wrappers_to_add.dart:56-60` |
| When: content taller than the screen, so parts are out of reach | covered + added | `wrappers.md#scrollview` | Plain "why" added. |
| When: content loaded from data whose size changes | added | `wrappers.md#scrollview` | |
| When: "more flexible navigation within a screen" | not useful | | Vague. |
| Steps: select the Row with the content, **Add Wrapper**, search **Scroll View** | covered + added | `wrappers.md#add-a-wrapper`, `wrappers.md#scrollview` | "Wrap the widget that holds the content" added. |
| **Scroll Direction**: horizontal for a Row, vertical for a Column | added | `wrappers.md#scrollview` | Dropdown values `vertical` (default) and `horizontal`: enum dropdown `basic_fields.dart:1511-1548`, values `material_library.dart:78960-78966`, default `material_library.dart:109286`. |
| Test the scrolling in play mode | added (updated) | `wrappers.md#scrollview` | Now Instant Play (**Play**): `docs/test/instant-play.md`. |
| **Reverse**: starts at the bottom (or the end) | added | `wrappers.md#scrollview` | Flutter `widgets/single_child_scroll_view.dart:172-185`. |
| **Padding**: space between the scroll area's edges and the content | added | `wrappers.md#scrollview` | Flutter `single_child_scroll_view.dart:187-188`. |
| **Primary** | not useful | `wrappers.md#scrollview` says these can stay as they are | Advanced; the old explanation (drag to refresh) doesn't match Flutter (`widgets/scroll_view.dart:191-216`). |
| **Restoration Id** | not useful | same | Advanced; only matters when an app turns on state restoration (no Nowa code sets `restorationScopeId`; grep of `packages/core/lib`, `lib`). |
| Animated GIFs | not useful | | |

## Old `ui/wrappers/text-direction.md` (redirect → `/reference/wrappers#text-direction`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Sets the direction text is shown in: left to right (English) or right to left (Arabic) | covered | `wrappers.md#text-direction`, `docs/design/localization.md#show-text-right-to-left` | |
| Add it around a Text and pick the direction in Details | covered + added | `wrappers.md#text-direction` | Values `ltr` (default) and `rtl`: `wrappers_to_add.dart:115-119`, `material_library.dart:81163-81168`. It applies to everything inside, rows included (Flutter `widgets/basic.dart:5479-5493`). A single Text also has its own **Text Direction** (localization page). |
| LTR is the default for most languages; RTL for Arabic and Hebrew | covered | `wrappers.md#text-direction` | |
| Animated GIF | not useful | | |

## Old `ui/wrappers/visibility.md` (redirect → `/reference/wrappers#visibility`)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Shows or hides a widget based on conditions | covered | `wrappers.md#visibility`, `docs/logic/expressions.md#visibility` | |
| Use: toggle parts on user actions or state changes | added | `wrappers.md#visibility` | Examples added. |
| Use: show only the relevant parts of a screen | added | `wrappers.md#visibility` | |
| Use: performance, removing off-screen widgets | not useful | | Developer-level. The reader-relevant part (a hidden widget takes no space) is added. |
| **Visible**: on shows the widget; off removes it from the layout | added | `wrappers.md#visibility` | Fields `packages/core/lib/src/fields/text_fields.dart:802-815`; default on `wrappers_to_add.dart:27-31`; hidden = replaced by **Replacement**, an empty box by default (`material_library.dart:115590-115592`). |
| **Replacement**: what to show while hidden (a placeholder, a loading spinner) | covered + added | `wrappers.md#visibility` | Examples added. |
| Animated GIF | not useful | | |

## Totals

| Status | Count |
|---|---|
| covered (incl. covered + added) | 38 |
| added (new on my pages, incl. corrected) | 34 |
| obsolete (incl. partial) | 4 |
| not useful | 20 |
| dev-only | 0 |
| for other page | 0 |

Counting rule: an item marked "covered + added" counts once under covered and once under added; partial statuses
("covered / obsolete") count once under each. 70 old items in all.
