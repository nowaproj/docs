# P15-M05 media: Widgets

Batch M05, 50 items (m270 to m319), from the old `docs/ui/widgets/widget-desc/*` pages. I looked at every image, every
video frame sheet and both YouTube thumbnails. To compare with 3.13 I used
`static/img/docs/get-started/get-started-editor-tour-1.png` (whole editor),
`static/img/docs/design/design-properties-1.png` (Details for a Text), `static/img/docs/reference/reference-lists-1.png`
(Details for a List View), `static/img/docs/design/design-theme-styles-1.png` (color picker) and
`static/img/docs/design/design-properties-2.png` (wrapper search). Code refs are in `/home/user/nowa-master` (3.13.0).

What the 3.13 editor looks like: the board toolbar sits at the **bottom** with five tools in the order Select, Shape,
Screen, Text, Widget. Clicking Widget (or pressing Ctrl/Cmd + K) opens the **Library**. **Variables** and **Details** are
two separate collapsible panels. Details starts with breadcrumbs and a **Layout** section (L, T, R, B, W, H). A Text
shows **Style** as a single **Connect...** row. The color picker has a **Solid** dropdown. **Add Wrapper** opens a
search box.

What the old items show: the 3.0-era editor. **Feedback** and **Report** sit in the top bar, with an account avatar and
**Save / Run / Play**. The left panel has **OUTLINE / FILES** tabs and the right panel has **DETAILS / VARIABLES** tabs.
The toolbar sits at the **top** of the board in the order Select, Screen, Shape, Text, Widget, and its Widget button
opens the old picker dialog. Layout shows X / Y. The Container has an **Empty / Add widget** row and a **Gradient**
dropdown, the color picker is a colour wheel, and Text has its Style fields expanded inline. Every Nowa item in this
batch shows that older editor, either whole or as a crop of the old Details panel, so none of them can be added under the
strict rule. No item shows a third-party screen.

## Items

| id | old page | what it shows (one line) | verdict | why (one line) | where added / covering image |
|---|---|---|---|---|---|
| m270 | widget-desc/button.md | A default Material button (lavender pill, purple "Button") on a blue background | NOT USEFUL | Decorative render of the widget, illustrates no step; the Buttons table explains it in words | - |
| m271 | widget-desc/container.md | Old board toolbar with the Shape tooltip | OUTDATED | Old toolbar: at the top, with Screen before Shape; the 3.13 toolbar is at the bottom with Shape second | `get-started-editor-tour-1.png` (toolbar, marker 6) |
| m272 | widget-desc/container.md | Video: Container Color (wheel picker), Border width 4, Radius 30 | OUTDATED | Old Details (Empty / Add widget row, Gradient dropdown, no Layout L/T/R/B, no breadcrumbs) and colour-wheel picker | - |
| m273 | widget-desc/container.md | Video: Container Image row, Network URL pasted, picture fills the box | OUTDATED | Same old Details panel; Image subsection labels differ from 3.13 | `reference-media-1.png` (Image source) |
| m274 | widget-desc/container.md | Video: Add widget on a Container, Icon added, icon colour changed | OUTDATED | Old editor (OUTLINE tab, top toolbar), old Add widget picker and colour wheel | - |
| m275 | widget-desc/container.md | Video: Add Wrapper list, Container wrapped, colour opacity over an image | OUTDATED | Old wrapper list menu (3.13 uses a search box), old Details and picker | `design-properties-2.png` (wrapper search) |
| m276 | widget-desc/data-builder.md | YouTube: "API GET and Listview tutorial" (WordPress blogs) | OUTDATED | Thumbnail shows the old editor (Feedback/Report bar, OUTLINE/FILES tabs, old API panel) | - |
| m277 | widget-desc/expansion-tile.md | Video: adding an Expansion Tile from the toolbar Widget picker | OUTDATED | Top toolbar with Play button and old picker dialog; 3.13 opens the Library | `design-add-widgets-video.mp4` (adding a widget) |
| m278 | widget-desc/expansion-tile.md | Video: Expansion Tile Leading, Trailing, Title, Subtitle slots | OUTDATED | Old Details panel and old icon picker around the slots | - |
| m279 | widget-desc/expansion-tile.md | Video: adding a child to Children, previewed with Cmd+P | OUTDATED | Old picker, old Details and the old Play mode | - |
| m280 | widget-desc/expansion-tile.md | Video: On Expansion Changed in Circuit with a print node, Console logs | OUTDATED | Old editor with the top toolbar; old Circuit node search popup and old Console | - |
| m281 | widget-desc/expansion-tile.md | Video: Expansion Tile colours from theme, Shape and Collapsed Shape | OUTDATED | Old picker with a "Colors From Theme" list and capitalised names; 3.13 picker differs | `design-theme-styles-1.png` (color picker) |
| m282 | widget-desc/gridview.md | Video: dropping a Grid View on ListScreen | OUTDATED | Old editor (Feedback/Report, OUTLINE/FILES, DETAILS/VARIABLES, top toolbar, old picker) | - |
| m283 | widget-desc/gridview.md | Video: Item Builder set to a plant_card component, Item Count, Play | OUTDATED | Old editor and old Play dialog | - |
| m284 | widget-desc/gridview.md | Video: Cross Axis Fixed, Cross Axis Count 2 to 4 | OUTDATED | Old editor | - |
| m285 | widget-desc/gridview.md | Video: Cross Axis Max, Max Cross Axis Extent | OUTDATED | Old editor | - |
| m286 | widget-desc/gridview.md | Video: Main Spacing | OUTDATED | Old editor | - |
| m287 | widget-desc/gridview.md | Video: Cross Spacing | OUTDATED | Old editor; a screen-recorder thumbnail also covers the Outline panel | - |
| m288 | widget-desc/gridview.md | Video: Main Axis Extent with horizontal scroll | OUTDATED | Old editor | - |
| m289 | widget-desc/gridview.md | Video: Child Aspect Ratio | OUTDATED | Old editor | - |
| m290 | widget-desc/gridview.md | Video: Normal Grid View with hand-placed children, Play | OUTDATED | Old editor and old Play dialog | - |
| m291 | widget-desc/gridview.md | Video: New Object dialog from FILES, plant params name and imageURL | OUTDATED | Old Files panel and New Object dialog; 3.13 makes models with New Model... in the Library | `logic-models-1.png` (model editor) |
| m292 | widget-desc/gridview.md | Video: plantItem param on plant_card, linking Url and Text | OUTDATED | Old VARIABLES tab, old Select type and link menus | - |
| m293 | widget-desc/gridview.md | Video: list variable of plants with default values | OUTDATED | Old VARIABLES tab and old Edit Variable popup | - |
| m294 | widget-desc/gridview.md | Video: List connected to plants, element passed to plant_card, Play | OUTDATED | Old editor, old link menu, old Play dialog | - |
| m295 | widget-desc/html.md | Video: Html widget Data typed in, rendered on the board | OUTDATED | Old DETAILS/VARIABLES tabs, X/Y layout, top toolbar | - |
| m296 | widget-desc/image.md | Video: Image from Network, Asset with Pick an image / Upload Image | PRIVACY | The status bar shows a Supabase project ref in "Failed host lookup: 'zobmru...supabase.co'" from the first frame on; also an old editor (OUTDATED anyway) | `reference-media-1.png` covers Pick Image |
| m297 | widget-desc/image.md | Video: Image Color and Blendmode (softLight, exclusion) | OUTDATED | Labels Color/Blendmode still exist (`designer/lib/src/details/widget_fields.dart:42`), but old Details and colour-wheel picker | - |
| m298 | widget-desc/linear-progress-indicator.md | Video: adding a Linear Progress Indicator, Value set | OUTDATED | Old editor and old picker | - |
| m299 | widget-desc/linear-progress-indicator.md | Video: progress bar height, Background and Color | OUTDATED | Old editor | - |
| m300 | widget-desc/listview.md | YouTube: same "API GET and Listview tutorial" as m276 | NOT USEFUL | Duplicate of m276 (which is OUTDATED) | - |
| m301 | widget-desc/listview.md | Video: dropping a List View in Builder mode, W set to Expand | OUTDATED | Old editor and old picker | `reference-lists-1.png` |
| m302 | widget-desc/listview.md | Video: Item Builder placeholder replaced with book_card | OUTDATED | Old editor and old picker | `reference-lists-1.png` (Item Builder) |
| m303 | widget-desc/listview.md | Video: Item Count 3 to 6, Play | OUTDATED | Old editor and old Play dialog | `reference-lists-2.png` (Item Count) |
| m304 | widget-desc/listview.md | Video: Separator Fixed Spacing | OUTDATED | Old editor | - |
| m305 | widget-desc/listview.md | Video: Separator Widget with a Divider, colour changed | OUTDATED | Old editor and old picker | - |
| m306 | widget-desc/listview.md | Video: listOfBooks variable, List connected, element linked | OUTDATED | Old editor, old Edit Variable and link menus | - |
| m307 | widget-desc/listview.md | Video: List View Padding | OUTDATED | Old editor | - |
| m308 | widget-desc/listview.md | Video: Normal List View with children added by hand | OUTDATED | Old editor and old picker | - |
| m309 | widget-desc/listview.md | Video: switching Normal to Builder, "First Widget as Placeholder" dialog | OUTDATED | Old editor around the dialog | - |
| m310 | widget-desc/listview.md | Video: reordering children, then switching to Builder | OUTDATED | Old editor | - |
| m311 | widget-desc/markdown.md | Video: Markdown Data typed in, rendered on the board | OUTDATED | Old DETAILS/VARIABLES tabs, X/Y layout, top toolbar | - |
| m312 | widget-desc/navigation-bar.md | YouTube: "Bottom Navigation Bar in Nowa, Water Tracker App Part 4" | OUTDATED | Water tracker series on an older Nowa (the brief names it); the thumbnail shows the old editor | `reference-navigation-2.png` |
| m313 | widget-desc/text.md | Video: Text tool placing "Write something" | OUTDATED | Old toolbar at the top, with Screen before Shape | `get-started-editor-tour-1.png` (toolbar) |
| m314 | widget-desc/text.md | Video: Text Style fields inline (Font Weight, Decoration, Color...) | OUTDATED | 3.13 Text has Text Direction and Overflow rows and Style as one Connect... row | `design-properties-1.png` |
| m315 | widget-desc/text.md | Video: Overflow ellipsis and fade, Reset to default | OUTDATED | Old editor and old inline Style | `design-properties-1.png` (Overflow row) |
| m316 | widget-desc/video-player.md | Video Player Details with numbered Controller, video, Auto Play, Show Controls Bar | PRIVACY | Readable account avatar photo in the top bar; also an old editor (Feedback/Report, DETAILS tab, checkboxes) | - |
| m317 | widget-desc/video-player.md | Pick Video popup with Upload Video | PRIVACY | Same readable avatar photo; old editor | - |
| m318 | widget-desc/video-player.md | Video: network video playing in the iOS Simulator next to the editor | OUTDATED | Old editor in every frame (small avatar in the top bar too) | `reference-media-2.png` (board stand-in) |
| m319 | widget-desc/video-player.md | Old Play dialog: "Platform not supported, only available on iOS and Android" | PRIVACY | Same readable avatar photo; old Play dialog and editor. The message itself is still described in `media.md:89` | - |

## Added

0 items. I copied, cut or re-encoded no files, and edited no pages in `docs/reference/widgets/`.

## Routed

None. No item in this batch belongs on another batch's page, and none is valid.

## Open questions

- m296, m316, m317, m319: they would be OUTDATED anyway, so the privacy issue doesn't change the outcome. The files
  exist only in the old commit and in the scratchpad; nothing in `static/` serves them.
- m270 (`static/img/designer/button.png`) is still in `static/`. I didn't add it: it's decorative, and it shows only the
  default look of a Material button. Whether to keep or delete the file is outside this pass.

## Checks

- `node scripts/check-videos.mjs`: passed (10 embeds, 10 MP4 files).
- `python3 -I _rewrite/tools/site-checks.py`: problems: 0.

## Counts

ADD 0 · COVERED 0 · OUTDATED 44 · NOT USEFUL 2 · PRIVACY 4 (total 50)
