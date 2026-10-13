# P15 M11 verify: variables, params, functions, data models, global state

Verifier: phase 15 media verifier (did not do the batch). Inputs: `_rewrite/reviews/P15-M11-media.md`, `batch-M11.tsv`,
`docs/logic/models.md`, 3.13 code in `/home/user/nowa-master` and the 3.13 captures (`logic-variables-1.png`,
`logic-expressions-1.png`, `logic-models-1.png`). Also decided M08's routed suggestion for `models.md`.

## ADD checked

**m334 → `static/videos/docs/logic/logic-models-2.mp4` (cut), `docs/logic/models.md:73-75`: confirmed.**

- File: H.264 High, yuv420p, 1920x972, 30 fps, 8.8 s, no audio; passes `check-videos.mjs`.
- Frames: I looked at the first frame, a 1 fps contact sheet (all 9 s) and full-size frames at 0.5, 1.5, 2.5, 3.5,
  5, 6.5 and 8.7 s. Every frame is zoomed on the board and the Variables / Details tiles; no file tabs, file tree,
  top Play bar, status bar or avatar. The cut starts right where the old chrome ends.
- 3.13 match: the separate Variables tile (row `taskList`, **Functions**) above **Details** with Name / Type /
  Default Value / red **Remove** is the 3.13 layout (`logic-variables-1.png`). **Select type** with search, **As List**,
  the colour-coded base types and **show more...** match `nowa_fields.dart`; the list type shows as row icon + `Task`.
  The list Default Value (count field, **+** on hover, numbered collapsible items, drag handle, **−**) matches
  `list_field.dart` (`_buildHeader`, `BFListItem`). The light-blue crossed `MyWi...` placeholder at the edge is the
  3.13 look for a code-only widget (`code-limitations-1.png`).
- Words and place: right after step 4 of "Use a model as a type", which the clip shows (steps 1-4 in order). The
  lead-in is short and true. The extra `priority` field in the clip's Task model doesn't contradict the page.
- Privacy: nothing readable beyond `taskList`, `Task`, `[title]`, `[description]`.

## M08's routed suggestion, decided

**`/img/api2/post/model-select-data.jpg` on models.md after step 3 of "Generate models from JSON": added.**
Library → **Generate Models From Json...** opens the same `GenerateModelsDialog` the REST API panel uses
(`lib/project/panels/files_panel/add_lib_menu.dart` → `showGenerateModelDialog`; one implementation in
`packages/core/lib/src/model_generator/`), with the steps Content / **Select Data** / Generated Models and the
**Select All** checkbox (`selecting_data_section.dart`). The image shows exactly what step 3 describes: Select All, the
collapse/expand icons, ticked fields and the preview. models.md had no picture of this dialog, so it isn't
redundant; it's cropped to the dialog, so no old chrome or avatar. Alt text from the M08 report, with "shows a
DeepseekModel" added so the root name in the preview isn't a surprise.

## Rejected items checked

- No third-party items in this batch (m336 / m343 are Nowa's own water tracker videos, OUTDATED / duplicate per
  the brief). No PRIVACY items.
- COVERED m329: `logic-variables-1.png` (variables.md:32) shows the same Variables panel with a variable selected.
  Confirmed.
- Nowa OUTDATED spot-checked (5 of 12): m331 (**New Object** dialog from the file tree), m335 (old node menu, file
  tree), m337 (**New GlobalState** dialog from the file tree), m339 (top bar with file tabs and an avatar in every
  frame), m340 (old **Link field** menu with red **Detach...** first, NOWA / SHARED PREFERENCES categories). All
  confirmed outdated.

## Changes

- `+` `docs/logic/models.md:57`: `![The Select Data step of the Generate Models dialog: ...](/img/api2/post/model-select-data.jpg)`,
  indented under step 3 of "Generate models from JSON" (M08's routed item; the file already exists, nothing copied).

## Checks

- `node scripts/check-videos.mjs`: passed (15 embeds, 15 unique MP4 files).
- `python3 -I _rewrite/tools/site-checks.py`: `problems: 0` (the `conditions.md:24` problem M11 mentioned is gone).

## Counts

ADDs confirmed 1, removed 0, added 1 (M08's routed Select Data crop). Verdicts overturned: none.
