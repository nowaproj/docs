# P15 M10 verify: Circuit, popups, common functions, control flow

Verifier: phase 15 media verifier (did not do the batch). Inputs: `_rewrite/reviews/P15-M10-media.md`, `batch-M10.tsv`,
the six embeds on `docs/logic/{actions,conditions,navigation,popups}.md`, 3.13 code in `/home/user/nowa-master`
(`packages/code/lib/src/...`, `packages/core/lib/src/...`) and the 3.13 captures (`logic-circuit-1.png`,
`logic-variables-2.png`, `logic-router-1.png`, `logic-popups-1.png`, `logic-expressions-1.png`, last frame of
`logic-circuit-video.mp4`).

## ADDs checked

| id | page | verdict | notes |
|---|---|---|---|
| m181 openurl.png | actions.md:19 | confirmed | `openUrl` default `https://nowa.dev` (`block_utils.dart` `generateDefaultBlocks`), void so no Store result; Circuit panel only. Alt matches. |
| m188 ifstatement-sections.png | conditions.md:20 | confirmed, re-cropped | If Statement node, False left / True right, join dot, Condition switch (off → node reads `false`) match `if_node.dart` / `IfStatementField` and `logic-circuit-1.png`. The left 14 px held fragments of the old editor's code text, so I cropped them off into a new file. |
| m187 nested-if.png | conditions.md:24 | confirmed | If Statement / True / False and the light-blue **Return** nodes look as in `logic-router-1.png`; the `result` chip matches `VarNode`. |
| m193 try-catch.png | conditions.md:51 | confirmed | **Try** (no icon) and the **On Error** label on the left match `try_node.dart`; awaited badge = `Icons.schedule` (`expr_node.dart`). One cosmetic difference: 3.13 subtitles a Navigator node `push: Settings` (`navigator_field.dart` `_findSubtitle`), the image says `to: Settings`. It's a node caption, not something the reader acts on, and the alt doesn't quote it, so I kept it. |
| m178 push-with-await.png | navigation.md:140 | confirmed, re-cropped, lead-in added | Details match 3.13: Type / to (`NavigatorDetails`), **await** only once it's on (`future_options.dart`), Store result **New Variable** then Name / Type / Is Final (`VariableStatementField` → `VariableField`); node titled `push` with the `result` chip and clock badge (`VarNode` + `ExprHelper.describe`). 3.13 also shows a small info note under **to** ("To use named routes, use GoRouter navigation instead.") that the image lacks; treated as cosmetic. The original showed board frames around the floating panel, so I cropped it to the Circuit panel. The sentence before it only described the `pop` side, so I added one sentence for the `push` side the image shows. |
| m203 snackbar-properties.png | popups.md:19 | confirmed | Same Snack Bar section as 3.13 (`BFSnackBar` in `expression_details.dart`: Content, Background Color, Width, Elevation, Shape, **Show advanced options**) and as the last frame of `logic-circuit-video.mp4`; Store result `none`. Indented under step 2, no current image of this step on popups.md. |

Privacy: none of the six shows a name, avatar, email or key. Placement: each sits right after its step, none stacked
with other media or next to a current shot of the same step.

## Open questions from M10, decided

- **m206 (time picker Details, crop): not added.** The crop itself is clean (Circuit panel only), and Builder `null`
  matches `WidgetField`, but the field list doesn't fully match 3.13: the 3.13 library
  (`material_library.dart`, `showTimePicker`) has **Initial Entry Mode** between Use Root Navigator and Cancel Text,
  which the generic renderer shows (enums do show, e.g. Traversal Edge Behavior in `logic-popups-1.png`); the shot
  goes straight from Use Root Navigator to Cancel Text. Stays OUTDATED.
- **m207 (Link selectedTime menu, crop): not added.** 3.13's link menu always starts with **Custom Expression...**
  (`field_link_menu.dart` `buildAdditionalItems`) and its title row carries the type; the shot has only **Edit**
  above the members. Stays OUTDATED.
- **m198 (date picker with await, crop without setState): not added.** A rectangle that drops the `setState` node
  also drops the showDatePicker node (setState sits under it), leaving only Details; there, an arrow annotation covers
  the **Store result** label, 3.13 has an extra **Calendar Delegate** row after Switch To Calendar... (`calendarDelegate`
  in `material_library.dart`), and the variable is named `selectedTime` for a date while the page uses `pickedDate`.
  Stays OUTDATED.

## Rejected items checked

- No third-party items in this batch (m192 is Nowa's own water tracker video, OUTDATED per the brief).
- No PRIVACY items.
- COVERED m201: `logic-popups-1.png` shows the same showDialog node and Details. Confirmed.
- Nowa OUTDATED spot-checked (13 of 26): m175, m177, m180, m186, m191, m198, m200, m202, m204, m205, m206, m207, m209.
  All show the 2.0.x chrome (file tabs, file tree, avatar, top Play bar) and/or the old menus (NOWA /
  NOWABETATESTTWO categories, red **Detach...** first in the link menu). m204's later frames are close to 3.13 (Reset
  to default / Set to null still exist), but the page doesn't cover resetting a field, so not adding it is right.
- NOT USEFUL m189, m196, m197: agree (duplicate of m188 + `logic-circuit-1.png`; contradicting example names; a hover
  tooltip the page doesn't use).

## Changes

- `~` `docs/logic/conditions.md:20`: image path → `/img/circuit/control-flow/if/ifstatement-sections-crop.png`
  (new file: crop 1596x1212+14+0 of `ifstatement-sections.png`, removes old-editor text fragments at the left edge).
- `~` `docs/logic/navigation.md:140`: image path → `/img/circuit/common-functionalities/navigation/push-with-await-crop.png`
  (new file: crop 798x598+199+54 of `push-with-await.png`, the Circuit panel without the board around it).
- `~` `docs/logic/navigation.md:138`: added "On the first screen, the `push` node waits for that value with **await**
  and keeps it with **Store result**." so the text says what the image shows.

Originals were left in place (only these pages referenced them).

## Checks

- `node scripts/check-videos.mjs`: passed (15 embeds).
- `python3 -I _rewrite/tools/site-checks.py`: `problems: 0`.

## Counts

ADDs confirmed 6 (2 re-cropped), removed 0, added 0. Verdicts overturned: none.
