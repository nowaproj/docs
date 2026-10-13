# P15 M06 verify: Design (themes, wrappers, layout)

I read `P15-MEDIA-BRIEF.md`, `P15-MEDIA-VERIFY.md`, the batch report `P15-M06-media.md` and `batch-M06.tsv` (33 items).
The batch's changes are already in the WIP commits: two images on `docs/design/layout.md`, plus
`static/img/ui/layout/spacing.png` and `static/img/ui/layout/contraints-bg.png`.

## ADDs

### m245: `/img/ui/layout/spacing.png` at layout.md:83

- **Valid:** this is a diagram, not a UI screen. It has three purple panels labelled BETWEEN, AROUND and EVENLY, each holding a
  row of three yellow boxes. I measured the gaps:
  - Between: 0 at the ends and about 47 px between the boxes.
  - Around: 16 px at the ends and 32 px between the boxes.
  - Evenly: 24 px everywhere.

  That matches Flutter's spaceBetween, spaceAround and spaceEvenly. The labels match 3.13: `FlexSpacingField` in
  `designer/lib/src/details/flex_field.dart:387-406` maps Between, Around and Evenly to exactly those values. The image
  also agrees with the page's Spacing row ("Around ... the ends get half as much", "Evenly makes every space the same, ends
  included").
- **Place:** right after the Rows and columns table, which has the Spacing row. One paragraph separates it from
  `design-layout-video`, so the two aren't stacked. The video shows only Between, so this isn't COVERED.
- **Words:** the old alt began "Three rows of three yellow boxes side by side". That misdescribes the picture: it is three
  panels side by side, each holding one row. Fixed (see Changes).
- **Privacy:** nothing personal.
- **File:** byte-identical to the scratchpad copy (md5 `81afc18b…`). It landed at the brief's path for
  `docs-rel:docs/ui/layout/img/spacing.png`.

### m239: `/img/ui/layout/contraints-bg.png` at layout.md:111

- **Valid:** a close-up of the constraints box on a light-blue background. The top and left bars are orange, the right and
  bottom bars grey, a + sits in the middle, and the dropdowns read Left and Top. I compared it with the 3.13 captures
  `design-properties-1` and `reference-media-1`, which show the same box for a widget pinned left and top: same glyphs,
  same orange for pinned sides, same + and the same Left/Top dropdowns. Only the typeface differs slightly, which is
  cosmetic. In the code, `_HorizontalSelect` and `_VerticalSelect` (`designer/lib/src/details/positioned_details.dart:92-185`) offer
  Left / Right / Left and right / Center and Top / Bottom / Top and bottom / Center. `_ConstrainsBox` colours selected bars
  with `primaryColor` (orange), the rest with text or greyed colour, and draws the + as `Icons.add`. That matches the image
  and the page's table.
- **Place:** right after the paragraph about clicking the bars and the +. layout.md had no picture of the box.
  `design-properties-1` is on `properties.md`, not here, so this isn't COVERED.
- **Words:** the alt is accurate. I made it say the picture is a close-up, because no Details labels appear in it (see
  Changes).
- **Privacy:** nothing personal.
- **File:** byte-identical to the scratchpad copy (md5 `5df1824c…`), at the brief's path.

**Both ADDs confirmed.**

## Rejected items

- **Third-party items:** none in this batch.
- **PRIVACY:** none marked. While checking, I saw that m253 (`colors-from.png`) shows a small avatar photo in the top bar.
  It's OUTDATED anyway (2.0.8 `themes.dart` popup), as the report says.
- **COVERED:**
  - m242 (Group header with the Stack/Row/Column buttons): `design-layout-1` on layout.md:53 shows the same three buttons in
    3.13. Upheld.
  - m246 (Layout X/Y/W/H with the Auto/Fixed mode dropdowns): `design-layout-2` on layout.md:132 shows the same W/H mode
    dropdowns in 3.13, with the list open. Upheld.
- **OUTDATED (29), spot-checked 12:** m240, m241, m243, m244, m253, m261, m266, m320, m322, m327, plus m326 and m328
  through the code. Every reason holds:
  - m241: the context menu reads Move Up / Move Down / Move To Top. 3.13 has Bring to front / Send backward
    (`widget_context_menu.dart:45-47`).
  - m243, m244: the Group section has a **Value** row (now **Gap**, `flex_field.dart:47`) and Padding Top/Bottom/Left/Right.
  - m253, m261, m266: Nowa 2.0.8-beta, with the file tree and the `themes.dart` popup.
  - m320: the colour-wheel picker.
  - m322: the old Feedback/Report editor and the plain wrapper list.
  - m326 and m328: 3.13 names them **Text Direction** and **Clip radius** (`wrappers_to_add.dart:42,117`).
  - m327 (Visibility) was the closest call. Its Visibility section matches 3.13, but the Image section above it doesn't:
    Source has a third tab, Blendmode reads Custom (3.13: Default) and there is no Error Builder row (compare
    `reference-media-1`). The screen title is the old plain "Empty8", and a macOS recording toolbar covers the last
    second. OUTDATED stands.

## Changes

- `~` `docs/design/layout.md:83` alt text: "Three rows of three yellow boxes side by side, one for each spacing" became
  "Three panels side by side, labelled Between, Around and Evenly, each with a row of three yellow boxes". The old wording
  didn't match the picture.
- `~` `docs/design/layout.md:111` alt text: "The constraints box in the Layout section of Details" became "A close-up of the
  constraints box from the Layout section of Details". The image is a cropped close-up with no Details labels in it.

## Verdicts overturned

None.

## Open questions

- **Image size.** Both copied PNGs are 10932 px wide (10932 × 3556 and 10932 × 2052). The files are small (258 KB and
  322 KB), but a browser decodes them to about 155 MB and 90 MB of memory, which is heavy on phones. The widest current
  screenshot is 1600 px. I made 2000 px copies (lanczos), 50 KB and 26 KB, at
  `scratchpad/media/verify/spacing-2000.png` and `scratchpad/media/verify/contraints-bg-2000.png`. Replacing the files in
  `static/` was blocked by the permission system. I suggest the orchestrator copies them over
  `static/img/ui/layout/spacing.png` and `static/img/ui/layout/contraints-bg.png`; the paths stay the same.

## Checks

- `node scripts/check-videos.mjs`: passed (15 embeds, 15 MP4 files).
- `python3 -I _rewrite/tools/site-checks.py`: problems: 0.

## Counts

ADDs confirmed 2, removed 0, added 0.
