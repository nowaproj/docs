# P15 M06 media review: Design (themes, wrappers, layout)

Batch: `scratchpad/media/batch-M06.tsv`, 33 items. I looked at every image and every video sheet, and pulled extra frames for m240, m320 and m327. Each one was compared with the 3.13 captures in `static/img/docs/design/` and with the code at `/home/user/nowa-master` (`widget_context_menu.dart`, `basic_fields.dart` BFMaterial/BFShapeBorder, `nowa_fields.dart` BoolField, `wrappers_to_add.dart`).

Most of the batch was recorded on Nowa 2.0.8-beta or an even older editor (the file tree on the left, a `themes.dart` popup in place of the Themes panel, a top bar with Feedback/Report, a plain wrapper list in place of the search). Only the two non-UI or unchanged layout images are still valid.

## Items

| id | old page | what it shows (one line) | verdict | why (one line) | where added / what covers it |
|---|---|---|---|---|---|
| m239 | ui/layout/constrains.md | Constraints box (left and top bars orange, + in the middle) with the Left and Top dropdowns | ADD | Same control, labels and dropdowns as 3.13 (compare design-properties-1); only the typeface differs. layout.md had no picture of the box | docs/design/layout.md:111 |
| m240 | ui/layout/constrains.md | Board only: resizing a "Constraints" frame while a bottom-right button keeps its place | OUTDATED | Older board: tiny orange frame label and corner x instead of the 3.13 title pill. It also sat under "Center" but shows a bottom-right pin. design-responsive-2 shows resizing in 3.13 | (design-responsive-2 on responsive.md) |
| m241 | ui/layout/groups.mdx | Grouping an image, text and icon, then right-click menu | OUTDATED | The menu shows Move Up / Move Down / Move To Top; 3.13 has Bring to front / Bring forward / Send backward / Send to back, plus Play, Ungroup, Create component | - |
| m242 | ui/layout/rows-and-columns.md | Group header with the Stack / Row / Column buttons | COVERED | The same buttons are already shown, current, on layout.md | design-layout-1 (layout.md:53) |
| m243 | ui/layout/rows-and-columns.md | Clicking the 9-cell Alignment grid of a Row | OUTDATED | The Group section has Value (now Gap), no Main Axis Size, and a separate Padding section with Top/Bottom/Left/Right. The step is covered by design-layout-video | design-layout-video (layout.md:88) |
| m244 | ui/layout/rows-and-columns.md | Alignment grid with Between spacing (3 positions) | OUTDATED | Same older Group section as m243; the 3.13 video already shows Between | design-layout-video |
| m245 | ui/layout/rows-and-columns.md | Diagram: Between / Around / Evenly spacing compared | ADD | Not a UI screen; it matches the Spacing row exactly (Around ends are half, Evenly all equal) and the video only shows Between | docs/design/layout.md:83 |
| m246 | ui/layout/rows-and-columns.md | Layout section with X/Y/W/H and the Auto / Fixed mode dropdowns | COVERED | The page already shows the 3.13 W mode dropdown open | design-layout-2 (layout.md:132) |
| m247 | ui/layout/rows-and-columns.md | Reordering cards by dragging rows in Children | OUTDATED | Older Group section (Value, no Main Axis Size, separate Padding) and older Children rows | - |
| m253 | ui/themes/colors-themes.md | `themes.dart` popup: Color Scheme / Colors with the "Colors from" Light/Dark menu | OUTDATED | 2.0.8 editor: a file-tree popup and "Colors from"; 3.13 has the Themes panel with tiles and Brightness/Mode switches. An avatar photo also shows in the top bar | design-themes-1 |
| m254 | ui/themes/colors-themes.md | Changing theme colors in the `themes.dart` popup | OUTDATED | 2.0.8 popup and color list; 3.13 uses tiles and the Edit popup | design-themes-video, design-themes-2 |
| m255 | ui/themes/colors-themes.md | Linking a Container color to "Colors From Theme" | OUTDATED | The picker has no Solid dropdown and the old "Colors From Theme" list; the editor is 2.0.8 | design-theme-styles-1 |
| m256 | ui/themes/colors-themes.md | Adding opacity with "with Opacity" from the Link Color menu | OUTDATED | 3.13 uses With values / Alpha; withOpacity is deprecated in the product | - |
| m257 | ui/themes/colors-themes.md | Adding a Button that picks up the theme | OUTDATED | 2.0.8 widget picker and Details | - |
| m258 | ui/themes/create-themes.md | File tree: globals with app_state.dart and themes.dart | OUTDATED | The 3.13 sidebar has no such file tree; themes live in the Themes panel | - |
| m259 | ui/themes/create-themes.md | Create Theme Setup dialog in an imported project | OUTDATED | 2.0.8 editor; the dialog lists `lib/global/theme.dart`, and the flow ends in the old themes.dart popup | - |
| m260 | ui/themes/create-themes.md | Switching lightTheme / darkTheme with "Set as Default" | OUTDATED | 3.13 uses the Active label in the Themes panel's theme list, not Set as Default in a popup | - |
| m261 | ui/themes/create-themes.md | Circuit: AppState changeTheme with a Link Theme menu | OUTDATED | Old Circuit popup, the "Create AppState" node and Link Theme menu; 3.13 has GLOBALS > AppState > changeTheme > Select theme | - |
| m262 | ui/themes/typograhies.md | `themes.dart` popup: lightTheme / Typography list | OUTDATED | 2.0.8 popup; 3.13 Typography is grouped (Display/Title/...) in the Themes panel | - |
| m263 | ui/themes/typograhies.md | Picking a style from the Text Styles list on a Text | OUTDATED | 2.0.8 Details and style list | - |
| m264 | ui/themes/typograhies.md | Editing Title Large in the `themes.dart` popup | OUTDATED | Old popup editor | - |
| m265 | ui/themes/typograhies.md | Editing a style from the widget (Text Styles > Edit) | OUTDATED | 2.0.8 editor and style editor | - |
| m266 | ui/themes/typograhies.md | CopyWith from the Link Style menu (Detach..., CopyWith) | OUTDATED | 3.13 menu items differ (CopyWith / Modify Style / Remove CopyWith in a different menu); editor is 2.0.8 | - |
| m267 | ui/themes/typograhies.md | Remove CopyWith / detaching a style | OUTDATED | Same 2.0.8 Link Style menu | - |
| m320 | ui/wrappers/material.md | Material wrapper: Color, Elevation, Shadow/Tint Color, Border with Side and Radius | OUTDATED | The color picker has no Solid dropdown or theme list, and Color/Shadow Color start empty. In 3.13 they default to the theme's surface/shadow (BFMaterial) | - |
| m321 | ui/wrappers/opacity.md | Adding Opacity from the plain wrapper list | OUTDATED | Very old editor (Feedback/Report top bar, plain list, no search) | - |
| m322 | ui/wrappers/padding.md | Adding Padding to a long text | OUTDATED | Same very old editor; Padding has Top/Bottom/Left/Right in place of the 3.13 two fields plus Individual padding | - |
| m323 | ui/wrappers/padding.md | Moving Padding above/below Container on a card | OUTDATED | Very old editor, old Padding fields and Group section | - |
| m324 | ui/wrappers/scrollview.md | Adding Scroll View to a horizontal row of news cards | OUTDATED | Very old editor; the section is named "Single Child Scroll View" and runs in the old Play window | - |
| m325 | ui/wrappers/scrollview.md | Adding Scroll View to a vertical list | OUTDATED | Same as m324 | - |
| m326 | ui/wrappers/text-direction.md | Adding Text Direction; the section reads Directionality | OUTDATED | Very old editor; the section is "Directionality", not Text Direction | - |
| m327 | ui/wrappers/visibility.md | Toggling Visible on an image, showing a spinner as Replacement | OUTDATED | Older board and Details (plain screen title, old typeface). Replacement is already set to a CircularProgressIndicator, while 3.13 starts empty (`wrappers_to_add.dart`). A macOS screen-recording toolbar covers the last second | - |
| m328 | ui/wrappers/wrappers-intro.md | Adding Clip RRect and Transform, then reordering them | OUTDATED | Very old editor; the wrapper is "Clip RRect" (now Clip radius) and the list is the old plain list | - |

## Added

2 images, both on `docs/design/layout.md`:

- m245 at layout.md:83, after the Rows and columns settings table.
- m239 at layout.md:111, after the paragraph about clicking the bars in the constraints box.

Files copied from the scratchpad (`old commit only`):

- `static/img/ui/layout/spacing.png`
- `static/img/ui/layout/contraints-bg.png` (the old file name, typo included, kept as the brief says)

Nothing was cut or re-encoded.

## Routed

None. Every item belongs on one of my pages or has no valid place.

## Open questions

- m327 (Visibility) was close: its Visibility section (Visible checkbox, Replacement, the grip and the menu button) matches 3.13. I dropped it because Replacement is already filled while 3.13 starts empty, and because of the older styling and the recording toolbar at the end. A fresh 3.13 capture of the Visibility wrapper would fill the gap on wrappers.md.
- `python3 -I _rewrite/tools/site-checks.py` reports one problem, in `docs/logic/conditions.md:24` (bare `<dailyGoal>`). That is M10's page, not one of mine. `node scripts/check-videos.mjs` passes.

## Counts

ADD 2, COVERED 2, OUTDATED 29, NOT USEFUL 0, PRIVACY 0 (33 items).
