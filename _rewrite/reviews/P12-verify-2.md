# P12 verify, round 2: check of the P12 fixes, round 2

Scope: every change in `_rewrite/reviews/P12-fixes-2.md` (docs edits in commit `313bf46`). Code: `/home/user/nowa-master` at `3cb32031c`
(3.13.0); `file:line` is relative to that repo. Live evidence: `_rewrite/reviews/P12-live-checks.md` (named `LC item N`, row by page line,
screenshot names as that log gives them) and `_rewrite/captures/phase12/c.md`. My edits are uncommitted working-tree changes on top of
`313bf46`, on three pages: `design/screens.md`, `logic/navigation.md`, `troubleshooting/known-issues.md`. Images, videos and `<video>` tags
were not touched.

| page | claim | verdict (holds / fixed / removed) | evidence |
|---|---|---|---|
| troubleshooting/known-issues.md | Shift heading "Shift + drag can drop a widget out of its screen", anchor `{#shift-drag}` kept | holds | Anchor still used by `select-and-edit.md`; same H2 + paragraph + "See [...]" format as the other entries |
| troubleshooting/known-issues.md | Shift keeps the widget on one axis even when the pointer drifts off that line | holds | `packages/designer/lib/src/design_experience/move_tool.dart:126,174-183` (`_mapSingleAxis` locks the drawn spot to the larger movement), Shift read at `designer_board_controller.dart:198-200`; LC item 5 row 1 (119 px right, 5 px down, T stayed 43) |
| troubleshooting/known-issues.md | If the pointer is outside the screen at release, the widget leaves it and becomes a board item, even if it still looks inside | holds | `move_tool.dart:116-127,255-274` (`_findHost` uses the raw pointer), `designer_board_controller.dart:34-35` (`hitTestCanvas` reads `board.pointerLocation`); LC item 5 row 2 (`233ab`: drawn over the screen, a board item at X 563, Y 531). c.md's Shift row recorded no pointer position, so it fits; "can" stays |
| troubleshooting/known-issues.md | Keep the pointer inside, or one Ctrl/Cmd + Z puts the widget back | holds | `move_tool.dart:215-229` (one `BatchRecord` per drop); LC item 5 row 3 |
| troubleshooting/known-issues.md | Shift + an arrow key nudges a widget in a **Stack** 10 px (kept) | holds | `packages/designer/lib/src/designer_setup.dart:26-49`; LC item 5 row 4 |
| troubleshooting/known-issues.md | New `/` entry: H2 with `{#slash-in-details}`, one paragraph, closing "See [...]" | holds | Matches the page's entries; linked from `navigation.md` and `reference/widgets/media.md` |
| troubleshooting/known-issues.md | A `/` you type in a field in **Details** is dropped | holds | `designer_setup.dart:55` (`/` → `FocusAiChatIntent`), `packages/designer/lib/src/actions/designer_actions.dart:261-266` (no `isEnabled`, unlike `tool_actions.dart:14-17`), `packages/designer/lib/src/board/board_editor.dart:46-53` + `designer_setup.dart:199-223` (Details and Variables sit inside those shortcuts); LC product bug 5 (`a/b` typed in a Text's **Text** became `ab`) |
| troubleshooting/known-issues.md | "Details" read as every Details panel | fixed | The docs also call Circuit's panel **Details** (`logic/circuit.md`, `logic/events.md`), and there `/` works: LC item 3 row L39 (Circuit **Location**). Circuit opens as a floating panel beside the page content (`packages/core/lib/src/fields/basic_fields.dart:521-530`, `packages/core/lib/src/providers/panel_provider.dart:12-26,221-238`, `lib/project/project_page.dart:635`), outside the board editor's shortcuts; `designer_setup.dart:55` is the only `/` binding. Added "Fields in Circuit aren't affected." |
| troubleshooting/known-issues.md | A path typed in **Route Settings** loses its slashes; **Problems** reports "Top-level route path must start with a leading slash" | holds | `packages/designer/lib/src/details/route_details.dart:131-134` (a `StringField` in Details), `packages/core/lib/src/editors/router_editor/router_problems.dart:61,67-69` (message 'Invalid route path "...": Top-level route path must start with a leading slash.'); LC item 3 row L67 (`167-path-set.png`, `172-problems.png`) |
| troubleshooting/known-issues.md | Type route paths in the Router panel's **Path**, which keeps every `/` | holds | `packages/core/lib/src/editors/router_editor/go_route_node_view.dart:27-40` (saves on Enter or on leaving the field); the Router panel is its own tab (`router_editor_actions.dart:17-31`, `lib/project/side_bar.dart:101-104`), and `DesignerActions` wraps only `board_editor.dart:46`, `widgets/widget_designer.dart:187`, `panels/outline_panel.dart:33`; LC item 3 row L67 (`176b-router-path-enter.png`: `/product/:id` kept) |
| troubleshooting/known-issues.md | Paste other text with a `/`, such as a web address, into the field | holds | Ctrl/Cmd + V is `PasteIntent` app-wide (`lib/setup_general_actions.dart:29`); the board's paste stands down for a `FieldFocus` (`designer_actions.dart:115-125`), so the field pastes; Details text fields are `StringField`s with `FieldFocus` (`packages/core/lib/src/fields/nowa_fields.dart:62`; `BFString` wraps one, `basic_fields.dart:155-171`). Live: a paste into Route Settings **Path** kept `/product/:id` (`171b-pasted-path.png`) |
| troubleshooting/known-issues.md | Link `../logic/navigation.md#give-a-screen-a-path` | holds | `## Give a screen a path` (navigation.md:20) |
| troubleshooting/known-issues.md | Detach entry: H2 with `{#detach}`, format | holds | Linked from `components.md` |
| troubleshooting/known-issues.md | After **Detach** the plain widgets still point at the params; the instance's values are lost | holds | `packages/designer/lib/src/design/common_design.dart:182-192` (copies `component.rootBlock` unchanged); LC item 1 row L38 (`90b-detached-shoes.png`) |
| troubleshooting/known-issues.md | A red box such as "[title] is not found" "for each one", while **Problems** lists nothing | fixed | Seen for one param (LC item 1 row L38, `91-problems-after-detach.png`: "No issues detected"). A widget stops at its first missing name (`packages/core/lib/src/interpreter/block_tree.dart:3582` throws), so one widget using two params shows one box: "for each one" removed |
| troubleshooting/known-issues.md | Workaround: click the broken property's name, choose **Detach...** and retype, or link something else | holds (code; not tried live) | `packages/core/lib/src/fields/field_link_menu.dart:357-361` (**Detach...** shown for a field that holds a reference), `:292-300` (puts a plain value in its place); label click opens the Link menu as `logic/expressions.md` describes |
| troubleshooting/known-issues.md | Link `../design/components.md#edit-a-component-or-one-instance` | holds | `## Edit a component or one instance` (components.md:33) |
| troubleshooting/known-issues.md | The app bar takes a dragged widget in while the pointer is over it | holds | `packages/designer/lib/src/design_experience/drag_rule.dart:441-516` (`AppBarRule` zones call `setHost` on pointer enter); LC item 5 "Also seen", product bug 7 |
| troubleshooting/known-issues.md | Dropped afterwards it "lands as a thin line with a height of 0" (and heading "lands squashed") | fixed | Seen for one Container (160 x 100 → 361 x 0, three drops, LC product bug 7); the size change isn't traced in code, so other widgets aren't confirmed. Now "can land as a thin line" and heading "can land squashed" (anchor kept) |
| troubleshooting/known-issues.md | One Ctrl/Cmd + Z undoes it; keep the pointer off the app bar | holds | LC product bug 7 ("Ctrl+Z restores it"); `move_tool.dart:215-229`; the host changes only on entering the zones (`drag_rule.dart:459-500`) |
| troubleshooting/known-issues.md | Link `../design/select-and-edit.md#where-a-dragged-widget-lands`; keywords | holds | `{#where-a-dragged-widget-lands}` at select-and-edit.md:32; keywords cover the three new entries |
| design/select-and-edit.md | Shift bullet: keep the pointer inside at release; outside, the widget becomes a board item even if it looks inside | holds | Same code and LC item 5 rows as the known-issues Shift rows |
| design/select-and-edit.md | Ctrl/Cmd + Z undoes that, or Shift + arrow keys move along one axis inside the screen | holds | `move_tool.dart:215-229`, `designer_setup.dart:26-49`; LC item 5 rows 3-4 |
| design/components.md | Expand the instance in the Outline and pick the widget | holds | LC item 1 row L36 (`70-outline-pick-name.png`); `packages/designer/lib/src/panels/outline_mapper.dart:72-79` |
| design/components.md | If the row has nothing to expand, edit the component itself | holds | `outline_mapper.dart:72-79` (an instance row lists the children of the component's root), `:86-96` (wrappers share a row); LC item 1 row L36 (ProductCard: no chevron) |
| design/components.md | Double-click the instance on the board to go one level deeper (in the changed sentence) | holds (code; not verified live) | `designer_board_controller.dart:104-121` (`_tryDrillIntoComponent` is off without the new UX flag, `:415-419`, then `selectChild`), `selection_manager.dart:75-95`; LC item 1 row L36 couldn't register a double-click in the rig |
| design/components.md | **Detach** on an instance; values lost, param-linked widgets show "[title] is not found"; link to `#detach` | holds | `packages/designer/lib/src/menus/widget_context_menu.dart:50-51`; same evidence as the known-issues Detach rows |
| design/components.md | "Right-click an instance and choose **Copy as new widget**" | holds | `widget_context_menu.dart:52-56` (component instances only); the Library row menu has no such entry (`lib/project/panels/library_panel/library_host.dart:156-171`); LC item 1 row L39 (**New Copy InfoCard**, **Submit**) |
| design/components.md | Params step 3: Nowa adds `param` and selects it, so **Details** shows it | holds | `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:108-115,286-300`; LC item 1 row L47 |
| design/components.md | Type the name in **Name**, press Enter, choose **Type** | holds | `packages/core/lib/src/widgets/code/variable_widgets.dart:436-441,505-507`, `nowa_fields.dart:62,69-76`; LC item 1 (renamed to `title` in Details) |
| design/components.md | In the list's name field t, r, v and f can trigger board shortcuts | holds | `packages/nowa_ui/lib/src/components/nrename_field.dart:45` (plain `FocusNode`), `designer_setup.dart:16-19`, `tool_actions.dart:14-17`; LC product bug 2; "can" as on parameters.md |
| design/add-widgets.md | Tool keys don't work while you type in a field in **Details** | holds | `tool_actions.dart:14-17`, `designer_actions.dart:232-237` (F), `nowa_fields.dart:62,205` (text and number fields use `FieldFocus`) |
| design/add-widgets.md | The **Variables** list's name field is the exception; link `#variables-list-rename` | holds | `nrename_field.dart:45`; anchor at known-issues.md:61 |
| design/add-widgets.md | With a widget selected, the paste goes into its parent, at your pointer | holds | `packages/designer/lib/src/design/copy_paste.dart:79-107,132-138` (`board.pointerLocation`, `update(host: active?.parent)`); LC item 2 row "With a widget selected" (`107-paste-with-selection.png`) |
| design/add-widgets.md | In the web app the browser may ask to see the clipboard on the first paste; allow it, or nothing is pasted | holds (live, Chrome) | LC item 1 row L29 and item 2 row L49 (Chrome's "See text and images copied to the clipboard", nothing pasted until **Allow**); the board paste reads the system clipboard (`copy_paste.dart:79-107`). Other browsers unchecked, hence "may" |
| design/assets.md | Right-click empty board space and choose **Paste** | holds | `packages/designer/lib/src/menus/board_context_menu.dart:6-13`; the widget menu has no **Paste** (`widget_context_menu.dart:21-58`); LC item 2 row assets L61 |
| logic/navigation.md | Step 1: click **Router** in the sidebar; link `router.md#open-the-router-panel` | holds | `lib/project/side_bar.dart:101-104`; `## Open the Router panel` (router.md:12) |
| logic/navigation.md | Step 2: in the **Routes** list, select the screen's route | holds | `packages/core/lib/src/editors/router_editor/router_block_view.dart:132` (**Routes**), rows show the path and the screen's name (`:341,372`); `176b-router-path-enter.png` |
| logic/navigation.md | Step 3: type the path in **Path** and press Enter | holds | `go_route_node_view.dart:27-40`; LC item 3 row L67 |
| logic/navigation.md | No route yet: **+** (**Add Route**), then **Route** | holds | `router_block_view.dart:142-151`, `router_context_menus.dart:20-32` |
| logic/navigation.md | "Then type its **Path** and click **Screen** to pick the screen" | fixed | **Add Route** doesn't select the new route (`router_editor_actions.dart:91-106` only records `createRoute`), so typing would change whichever route is still selected. The new route reads `/` (`packages/core/lib/src/project/env_services/router_file_service.dart:266-271`, title = path at `:668`). **Screen** is a label; the picker opens from the name next to it (`go_route_node_view.dart:146-153`, `nowa_fields.dart:508-522`, as in `176b`). Now "Select the new `/` route, type its **Path**, then click the name next to **Screen** to pick the screen." |
| logic/navigation.md | The **Path** under **Route Settings** drops every `/`; link `#slash-in-details` | holds | As the known-issues `/` rows |
| logic/navigation.md | Play: a screen whose path has a parameter can show the home screen, so play the screen that opens it | holds (live) | LC item 3 "Also seen" (`204-select-other-screen-while-playing.png`); Play starts the router at the route's path pattern as is (`packages/designer/lib/src/play_mode/play_mode.dart:261-276,462-484`); from the opener, navigation runs in that router (step 5 of the recipe) |
| logic/navigation.md | Path parameter step 1: to type `/product/:id`, use the Router panel's **Path**; the Details **Path** drops `/` | holds | As the known-issues `/` rows; **Add Route Parameter** writes `/:param1` itself (`route_details.dart:55-61`, `go_router_routing_service.dart:215-232`) |
| logic/navigation.md | "If you change the type later, drag the chip onto the param again." | holds | LC item 3 row L85 (`198-problems-id-int.png`, `200b-problems-after-redrag.png`, `201-edit-condition.png`); `packages/core/lib/src/editors/router_editor/auto_type_parser.dart:69-100` (the conversion is built when the chip is dropped) |
| logic/navigation.md | Step 3: **LOCALS** is near the end of the list | holds | LC item 3 row L89 (`188b-locals-scrolled.png`) |
| logic/navigation.md | After the pick the whole text is selected, so typing replaces it | holds | LC item 3 rows L89 (`189b-location-selected-zoom.png`, `207cd-typed-replaces.png`) |
| logic/navigation.md | Click before the closing `}` (or End, then ←) and type `.id` | holds | LC item 3 row L89 (`190a-cursor-before-brace.png`, `190d-location-id-zoom.png`); no arrow or End shortcuts in Circuit or app-wide (none in `packages/code`, `lib/`) |
| logic/navigation.md | A wrong field name puts a red mark on the GoRouter node; point at it for the reason | holds | LC item 3 row L89 (`194b-node-error-tip.png`: "Undefined name 'idx'.") |
| design/screens.md | Step 1: the route icon (**Open Router Editor**) opens the Router panel | holds | `route_details.dart:121-125`, `router_editor_actions.dart:17-31` (opens the router file, as the sidebar does) |
| design/screens.md | Select the screen's route, type a path in **Path**, press Enter | holds | As navigation steps 2-3; the icon doesn't pre-select a route |
| design/screens.md | The **Path** field of **Route Settings** drops every `/` | holds | As the known-issues `/` rows |
| design/screens.md | Step 3: "set a **Default value** if you like" (the fixer's open question) | removed | The field is a `StringField` with only `value` and `hint` (`route_details.dart:196-201`): no `onUpdate` or `onEditingComplete`, so nothing is saved, and the next rebuild puts the stored value back (`nowa_fields.dart:84-97`). Nothing else in the router UI writes one (`go_router_routing_service.dart:215-263` always passes `null`); the field only shows a `?? value` written in code (`:327-337,360-367`), and with none its hint reads `null` (`nowa_fields.dart:110`). Step now: "Type a **Param name** and link it to one of the screen's params with the link button." |
| design/screens.md | A screen without a route shows the default path as the hint in **Path**, like `/home-page` | holds | `route_details.dart:26,133` (`value: routePath ?? ''`, hint `defaultPath`), `packages/core/lib/src/utils.dart:81-83` (hyphens, lowercase) |
| design/screens.md | Link `../logic/router.md#add-nest-and-delete-routes` | holds | `## Add, nest and delete routes` (router.md:18) |
| design/templates.md | Add a route for each screen in the **Router** panel; link | holds | `router_context_menus.dart:20-32`, `router_file_service.dart:266-303`, `go_route_node_view.dart:27-40,146-153`; anchor at router.md:18 |
| guides/complete-app.md | 4.3: give each template screen a route in the **Router** panel; link | holds | As the navigation rows (with the Add Route fix) |
| guides/complete-app.md | 6.1: select the detail route (or add one), type `/recipe/:id` in **Path**, Enter, then drag the `id` chip | holds | LC item 3 set-up and row L67 (`/product/:id` typed in the Router panel's **Path**, chip dragged onto `id`, `180b-chip-dropped.png`) |
| reference/widgets/navigation.md | Step 2: at the default panel width longer labels are cut short, such as **Bottom Nav...** | holds | LC item 6 row L19-21 (`241-details-scrolled.png`); Details starts 240 px wide (`designer_setup.dart:203-205`) |
| reference/widgets/navigation.md | **Create Variable...** adds a whole-number variable and links **Current Index** | holds | `field_link_menu.dart:241-264`; LC item 6 row L55 (`248-after-create-variable.png`) |
| reference/widgets/navigation.md | Open **Variables**, select it, rename to `pageIndex` in **Details** | holds | LC item 6 row L55 (`250-var1-selected.png`, `251b-renamed.png`) |
| reference/widgets/navigation.md | **Default Value** starts empty; type `0` | holds | `field_link_menu.dart:231-238` (no starting value when the property was never set), label at `variable_widgets.dart:318-322`; LC item 6 row L55 (`278c-default-0.png`, `279-code-default-0.png`) |
| logic/variables.md | A never-set property gives an empty **Default Value**; select the variable and type one | holds | `field_link_menu.dart:231-238,241-252`; LC item 6 row L55 |
| logic/expressions.md | **Create Variable...** row: a property that only shows its default gives an empty **Default Value** | holds | Same as above |
| get-started/first-app.md | A click can select something bigger (a heading in the app bar selects the whole app bar) | holds | `packages/designer/lib/src/design_experience/selection_manager.dart:36-52` (outermost selectable widget under the pointer); LC item 4 row L46 (`121-click-heading.png`) |
| get-started/first-app.md | Selecting is an undo step, so press Ctrl/Cmd + Z again | holds | `selection_manager.dart:55-61` (`recordClear` / `recordSelect` go on the undo stack); LC item 4 row L48 (two presses) |
| reference/widgets/media.md | Web View: paste the address, since a `/` typed in **Details** is dropped; link | holds (code) | **Url** is a `BFString` in Details (`packages/designer/lib/src/details/widget_fields.dart:432-455`), so the `/` and paste rows above apply; not tried on a Web View |
| reference/widgets/media.md | Html and Markdown **Data**: a typed `/` is dropped; paste text that has one | holds (code) | Both are `BFString`s in Details (`widget_fields.dart:403,422`), the same path as the Text field in LC product bug 5 |
| get-started/playground.md | The full code check waits for an account; **Run Code Check** fails with "Unauthorized" in the playground | holds | LC product bug 3 (`94-run-code-check.png`: "Code check failed / DioException [bad response]: Unauthorized"); `packages/core/lib/src/panels/problems_panel.dart:501`, `packages/core/lib/src/services/flutter_service.dart:57-66` (a cloud project's check is a server call for that project); "full code check" as on `test/problems.md` |

## Totals

69 claims checked: 64 hold, 4 fixed, 1 removed. Pages edited: `design/screens.md`, `logic/navigation.md`, `troubleshooting/known-issues.md`.

- The open question is settled in the code: **Default value** under **Route Parameters** has nothing that saves it, so screens.md no
  longer offers it.
- Most useful fix: after **Add Route** the new route isn't selected, so "Then type its **Path**" would have renamed the route still on
  screen. navigation.md now says to select the new `/` route first.
- The two workarounds work by the code. The Router panel's **Path** is a separate tab outside the designer's `/` shortcut. A paste in a
  Details field reaches the field because the board's paste stands down for it, and a live paste into Route Settings kept every `/`.
- `yarn build`: passes (10 video embeds validated), with no broken-link or anchor warnings.

## Needs a live check

- `design/screens.md` **Route Parameters** > **Default value**: type a value, click away, reselect the screen. The code says it isn't kept.
  If it is, the step can offer it again.
- `logic/navigation.md`: **Add Route** > **Route**, then select the new `/` route, set **Path**, and pick the screen from the name next to
  **Screen**. Only the code covers this; the live run set paths on routes that already existed.
- `known-issues.md#detach` workaround: after **Detach**, click the broken property's label, choose **Detach...** and retype the value.
  Only the code covers it.
- Pasting into a Web View **Url** and the Html and Markdown **Data** boxes keeps `/`. Live, only Route Settings **Path** was tried.
- `known-issues.md#drag-across-app-bar`: do widgets other than a sized Container (a Text, say) also land squashed? Only a Container was
  tried.
- Keyboards that need Shift for `/` (German, for example): Flutter's `SingleActivator(slash)` only fires with Shift up
  (`designer_setup.dart:55`), so those users may not lose the `/`. The pages state it without that condition, which is right for US and
  UK layouts.
- `design/components.md`, double-click an instance to go one level deeper: still open from LC item 1, where the rig couldn't double-click.
- `logic/navigation.md`, Play: play the list screen and tap a row to open a detail screen whose path has a parameter. Code only; the
  live run played the detail screen itself.

## Noticed in passing (not changed)

- `docs/logic/router.md` "Add, nest and delete routes" says "Then set its **Path** and **Screen**" after **Add Route** with the same gap
  (the new route isn't selected). It isn't in this commit, so it's left for its owner.
