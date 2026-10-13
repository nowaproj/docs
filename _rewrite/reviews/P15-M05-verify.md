# P15 M05 verify: Widgets

I read `P15-MEDIA-BRIEF.md`, `P15-MEDIA-VERIFY.md`, the batch report `P15-M05-media.md` and `batch-M05.tsv` (50 items,
m270 to m319). M05 added nothing and edited no page. `docs/reference/widgets/*` has no changes from this batch.

## What I checked

- **ADDs:** none to check.
- **Third-party items:** there are none. No item shows Apple, Google Play, GitHub, Firebase, Supabase, Stripe, Postman or any
  other provider's screen. The only items that aren't a Nowa editor screen:
  - **m270** (`static/img/designer/button.png`) is a plain render of a default Material button. It shows no step.
    `reference/widgets/index.md` covers Buttons in a table, and the picture adds nothing to it. NOT USEFUL upheld.
  - **m318** has an iOS Simulator playing a network video, but it sits next to the old editor in every frame (Feedback/Report
    bar, OUTLINE tab, DETAILS/VARIABLES tabs, small avatar), so it can't be cropped into a clean clip. OUTDATED upheld.
  - **m276 / m312** (YouTube): both thumbnails show the old editor. m276 has the Feedback/Report bar and OUTLINE/FILES tabs;
    m312 is the Water Reminder Part 4 tutorial, a series the brief names as OUTDATED. m300 duplicates m276. All upheld.
- **PRIVACY (4 items), every one confirmed:**
  - m316, m317 and m319: an avatar photo can be read in the top bar at full size. These are also the old editor (Feedback/Report,
    DETAILS/VARIABLES tabs, Run with sdk gphone64 arm64, checkboxes).
  - m296: the status bar reads "Failed to load Supabase: Failed host lookup: 'zobmru…supabase.co'", which is a Supabase
    project ref, in every frame. There is also a small avatar. Old editor.
- **Nowa OUTDATED (44 items):** I spot-checked 15 of them (more than a third) against `get-started-editor-tour-1`,
  `design-theme-styles-1`, `reference-media-1` and `reference-lists-1`, and grepped `/home/user/nowa-master`: m271, m272,
  m275, m276, m280, m281, m283, m291, m297, m301, m309, m311, m312, m314 and m318. I also looked at the four PRIVACY items
  above. Every one shows a pre-3.13 editor:
  - the board toolbar at the top in the order Select, Screen, Shape (3.13 puts it at the bottom with Shape second);
  - DETAILS/VARIABLES tabs or OUTLINE/FILES tabs;
  - the colour-wheel picker with no **Solid** dropdown;
  - the Feedback/Report top bar;
  - the old Play dialog;
  - the plain wrapper list in place of the search box.

  Two reasons are a little loose but don't change the verdicts:
  - m281: the report says the old "Colors From Theme" list is gone. The heading still exists in 3.13
    (`core/lib/src/fields/color_fields.dart:762`, shown when a color field is linked to a theme style). The clip is still
    outdated: its picker has capitalised names and no Solid dropdown, and the Details panel and editor around it are old.
  - m309: the "First Widget as Placeholder, Others will be Removed" dialog is still in 3.13
    (`core/lib/src/fields/lost_widget_dialog.dart:28`). Every frame shows it over the old editor (Feedback/Report,
    OUTLINE/FILES, Run/macOS), so OUTDATED stands.
- **COVERED:** none in this batch.

## Changes

None. I removed, added and changed nothing.

## Verdicts overturned

None.

## Open questions

- m270's file `static/img/designer/button.png` is still in `static/` and nothing uses it (as the batch report notes).
  Deleting it is outside this pass.

## Checks

- `node scripts/check-videos.mjs`: passed (15 embeds, 15 MP4 files).
- `python3 -I _rewrite/tools/site-checks.py`: problems: 0.

## Counts

ADDs confirmed 0, removed 0, added 0.
