# P15 M10 media review: Circuit, popups, common functions, control flow

Pages owned: `docs/logic/{index,circuit,conditions,actions,events,navigation,popups,router,expressions}.md`.

Two kinds of old media in this batch:

- **Full-editor recordings and screenshots** (every video, plus `add-nodes.png` and both time picker PNGs). They were recorded on Nowa 2.0.x beta: status bar `v2.0.18-beta` / `v2.0.19-beta`, file tabs across the top, a file tree and a floating Outline on the left, a Variables panel listing Params / Variables / Functions, the toolbar with Play at the top centre, and an avatar in the top bar. The 3.13 editor (`get-started-editor-tour-1.png`) has the project and board pickers with **Save** in the top bar, the icon sidebar with **Library**, and the toolbar at the bottom. The node menu in these clips also shows the old categories (`NOWA`, `NOWABETATESTTWO`, `WATER_TRACKER_FINAL`, `API`...), where 3.13 shows `DART:CORE`, `MATERIAL`, `NOWA_RUNTIME`... (`logic-circuit-2.png`). The link menu shows the old order and categories (`Detach...`, Create Param..., ..., Custom Expression..., then NOWA, OPERATORS, SHARED PREFERENCES, GENERAL), where 3.13 shows Custom Expression... first and only LOCALS, GLOBALS, EXPRESSIONS (`logic-expressions-1.png`). So every video is OUTDATED, and no clip has a clean section that's free of the old chrome and the old menus.
- **Screenshots of the Circuit panel alone.** These match 3.13 closely: the same node shapes, the **Details** pane, `Expression:`, **Store result** with none / New Variable / Pick Variable (`store_result_field.dart`), **Future Options** with **await** / onValue / onError, where only **await** shows once it's on (`future_options.dart`), the **On Error** label on Try (`try_node.dart`), **If Statement** (`if_node.dart`), **Return** (`node_widgets.dart`) and **Show advanced options** (`AdvancedOptions` in `block_field.dart`). The only differences are the font and the colour of the clock badge, which are cosmetic. One exception: 3.13 draws the `setState` node as **refresh** (`expr_node.dart` `_mappedName`), so a shot with a `setState` node is OUTDATED.

| id | old page | what it shows (one line) | verdict | why (one line) | where added / what covers it |
|---|---|---|---|---|---|
| m174 | common-functionalities/media-picker.md | 2.0.16 editor: Image switched to Bytes, Link Bytes > Create Variable..., variable renamed `image` | OUTDATED | Old editor chrome and Variables panel; old link menu (Detach..., then Create Param...) | - |
| m175 | common-functionalities/media-picker.md | Circuit: showMediaPicker (NOWA category), await, New Variable, readAsBytes, Set image, setState | OUTDATED | `showMediaPicker` sits under NOWA (now NOWA_RUNTIME), the node is `setState` (now refresh), old editor in most frames | - |
| m176 | common-functionalities/media-picker.md | Play mode: Pick an image, macOS file dialog, picked photo shown | OUTDATED | Old editor chrome and play mode; the picked photo is a meme image of a real actor | - |
| m177 | common-functionalities/navigation.md | Navigator push to BlogScreen, linking its params through the old link menu | OUTDATED | Old editor and old link menu; the page leads with GoRouter now | - |
| m178 | common-functionalities/navigation.md | Navigator push node to Empty4 with await on and Store result New Variable `result` (String) | ADD | Panel, labels and the await-only state match 3.13 (`future_options.dart`, `store_result_field.dart`); the stored node shows its `push` title and `result` chip like a 3.13 VarNode | navigation.md:140, after "To bring a value back..." in "Use the Navigator" |
| m179 | common-functionalities/navigation.md | push with await, then Set name, setState; play mode returns "Alex" | OUTDATED | `setState` node (now refresh), old Variables panel and editor, old link menu | - |
| m180 | common-functionalities/navigation.md | Navigator pop with result type String and result `textController.text` | OUTDATED | Old editor chrome and node menu (NOWABETATESTTWO, NOWA, API) in several frames | - |
| m181 | common-functionalities/open-url.md | openUrl node selected (1), Url `https://nowa.dev` in Details (2) | ADD | Matches the page's two steps and the default Url exactly; Circuit panel only | actions.md:19, after step 2 of "Open a link" |
| m182 | common-functionalities/platform-checking.md | If with `NPlatform.isWeb && NPlatform.isAndroid` typed in the custom expression box | OUTDATED | Old editor, old node and link menus; the page uses GLOBALS > checkPlatform | - |
| m183 | common-functionalities/print.md | print "Hello All to Nowa docs", play, then the old Console with ERRORS / LOGS | OUTDATED | NOWA category (print is under DART:CORE now), old editor and status bar | - |
| m184 | common-functionalities/print.md | print linked to `textController` > `toString`, Console shows the typed names | OUTDATED | Old editor, old Console, old link menu | - |
| m185 | common-functionalities/print.md | print with a custom expression `textController.text`, then `My name is $` | OUTDATED | Old editor and link menu (Link text with LOCALS, GLOBALS, EXPRESSIONS, API) | - |
| m186 | control-flow/if-statement.mdx | Add If statement, Link Condition > Custom Expression... `dailyGoal > 10` | OUTDATED | Node menu with WATER_TRACKER_FINAL / NOWA, old link menu order (Detach... first) | - |
| m187 | control-flow/if-statement.mdx | Function getRemaining: an If nested in another If's True branch, with Returns | ADD | Shows "put another If inside a branch"; If Statement, True/False and Return look the same in 3.13 | conditions.md:24, after "Steps below the If node run afterwards..." |
| m188 | control-flow/if-statement.mdx | New If Statement with markers 1-5: node, Condition switch, True dot, False dot, join dot | ADD | conditions.md had no picture; the markers map to steps 1-3 and to "steps below the If run afterwards", and the alt explains each one | conditions.md:20, after the three If steps |
| m189 | control-flow/if-statement.mdx | Condition switch on, print in False, showSnackBar (red error mark) in True | NOT USEFUL | Repeats m188 and `logic-circuit-1.png` (circuit.md:12, Condition switch on); the red mark on showSnackBar would distract | - |
| m190 | control-flow/if-statement.mdx | Link Condition > LOCALS > `isLoading` | OUTDATED | Old link menu (Detach..., WATER_TRACKER_FINAL, NOWA, SHARED PREFERENCES...) | - |
| m191 | control-flow/if-statement.mdx | Condition from OPERATORS > greaterThanOrEqual, Type int, `dailyGoal >= 1400` | OUTDATED | Old link menu and the old "Logic Expression" popup look | - |
| m192 | control-flow/if-statement.mdx | YouTube: Advanced Expressions, Water Tracker App part 7 | OUTDATED | Water tracker series recorded on an older Nowa (per the brief), with the old editor in the thumbnail | - |
| m193 | control-flow/try-catch.mdx | onTap: Try, loadData (awaited) under it, showSnackBar in On Error, Navigator after both | ADD | Try / On Error and the branch joining match `try_node.dart` and the page's text; Circuit panel only | conditions.md:51, after "Steps below the whole Try run afterwards..." |
| m194 | control-flow/try-catch.mdx | Adding Try, loadData with await, showSnackBar in On Error | OUTDATED | Old editor chrome, old node menu (WATER_TRACKER_FINAL, NOWA, API) | - |
| m195 | intro-circuit.md | Whole 2.0.18 editor: function `func` in the Variables panel, Edit / Remove, plus under the node | OUTDATED | Old editor and Variables panel layout; also shows an avatar photo top right | Adding a node: `logic-circuit-2.png` and `logic-circuit-video.mp4` (circuit.md:32-36) |
| m196 | intro-circuit.md | loadData: getInt `tempDailyGoal`, If `tempDailyGoal != null`, Set dailyGoal, getString | NOT USEFUL | The page's walkthrough of this example uses `loadGoal`, `savedGoal` and **refresh**; the image's other names and extra getString would contradict it, and `logic-circuit-1.png` already shows a circuit | - |
| m197 | ui-popups/date-picker.md | Tooltip `Future<DateTime?>` over the showDatePicker title in Details | NOT USEFUL | A hover tooltip the page doesn't use; "Use what the person chose" explains the waiting in plain words | - |
| m198 | ui-popups/date-picker.md | showDatePicker with await on and Store result New Variable `selectedTime` (DateTime), then Set date, setState | OUTDATED | The panel itself matches 3.13, but the next node reads `setState`, which 3.13 shows as **refresh** (`expr_node.dart`), and the page's example uses refresh | - |
| m199 | ui-popups/date-picker.md | Full date picker example: First Date, await, format YEAR_NUM_MONTH_DAY, play | OUTDATED | Old editor, Variables panel and node menu (NOWA) | - |
| m200 | ui-popups/dialog.md | showDialog from NOWA... list, editing the AlertDialog title, play | OUTDATED | Old editor and node menu; 3.13 lists showDialog under MATERIAL | - |
| m201 | ui-popups/dialog.md | showDialog Details: Builder AlertDialog, Barrier..., Future Options, Store result | COVERED | Same node and Details | `/img/docs/logic/logic-popups-1.png` (popups.md:52) |
| m202 | ui-popups/snackbar.md | GLOBALS > Show snackbar, Content "Hey All", Background Color, play | OUTDATED | Old editor chrome and node menu (NOWABETATESTTWO, NOWA) | - |
| m203 | ui-popups/snackbar.md | showSnackBar Details: Snack Bar section (Content, Background Color, Width, Elevation, Shape, Show advanced options, Store result) | ADD | Labels match 3.13 and the page's options table; the brush next to Content matches step 2; Circuit panel only | popups.md:19, indented under step 2 of "Show a snackbar" |
| m204 | ui-popups/snackbar.md | Right-click Background Color > Reset to default / Set to null | OUTDATED | The first frames show the old editor, and the old Variables panel is visible throughout; the page doesn't cover resetting a field (still available in 3.13: `block_field.dart`) | - |
| m205 | ui-popups/snackbar.md | Content as custom expression `'Successfully removed ${item.name}'` | OUTDATED | Old editor and Variables panel; 3.13 has you type `$` in the text instead (popups.md step 2) | - |
| m206 | ui-popups/time-picker.md | showTimePicker Details (Initial Time, Hour, Minute, Builder, Barrier..., labels) | OUTDATED | The full 2.0.19 editor sits around the Circuit panel (file tabs, Outline, Variables panel, avatar) | - |
| m207 | ui-popups/time-picker.md | Link selectedTime menu: hour, minute, period, hourOfPeriod, format, isBefore, isAfter... | OUTDATED | Same full 2.0.19 editor around it | - |
| m208 | ui-popups/time-picker.md | showTimePicker example: await, format, Pick Variable `time`, refresh, play | OUTDATED | Old editor and Variables panel in every frame | - |
| m209 | ui-popups/time-picker.md | showTimePicker with onValue: format value into `time` | OUTDATED | Node menu with NOWA, old editor; the onValue function frames show the old Variables panel | - |

## Added

6 items, all images already in `static/` (`in repo`), referenced at their current paths. I copied, cut and re-encoded nothing.

- `docs/logic/actions.md:19`: `/img/circuit/common-functionalities/others/openurl.png` (m181)
- `docs/logic/conditions.md:20`: `/img/circuit/control-flow/if/ifstatement-sections.png` (m188)
- `docs/logic/conditions.md:24`: `/img/circuit/control-flow/if/nested-if.png` (m187)
- `docs/logic/conditions.md:51`: `/img/circuit/control-flow/try/try-catch.png` (m193)
- `docs/logic/navigation.md:140`: `/img/circuit/common-functionalities/navigation/push-with-await.png` (m178)
- `docs/logic/popups.md:19`: `/img/circuit/ui-popups/snackbar/snackbar-properties.png` (m203)

None of them shows personal data, keys or avatars. The nested-if alt text says "is less than" in words, because a bare `<` before a word breaks MDX (site-checks flagged it).

## Routed

None. Every item belongs on an M10 page.

## Open questions

- **m206 / m207 (time picker)**: the Circuit panel inside these screenshots matches 3.13. A crop down to the panel could illustrate "Pick a time" on popups.md, but the brief only covers cutting videos, so I left them OUTDATED.
- **m198 (date picker with await)**: the only problem is the `setState` node at the bottom. If the orchestrator accepts a crop that keeps just the showDatePicker node and Details, it would fit after step 3 of "Pick a date or time" on popups.md.
- The added Circuit screenshots use the older UI font, and the clock badge on awaited nodes is green where 3.13 uses the accent colour. I treated both as cosmetic.

## Checks

- `node scripts/check-videos.mjs`: passed (15 embeds; I added no videos).
- `python3 -I _rewrite/tools/site-checks.py`: `problems: 0`.

## Counts

ADD 6, COVERED 1, OUTDATED 26, NOT USEFUL 3, PRIVACY 0 (total 36).
