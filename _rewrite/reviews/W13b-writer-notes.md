# W13b writer notes (Reference: forms, lists, navigation and media widget pages)

Pages: `docs/reference/widgets/forms.md`, `lists.md`, `navigation.md`, `media.md`. Code paths are relative to `/home/user/nowa-master`
(v3.12.5, b84bfdafd). Research used: `research/features-widgets.md` ("Text Field and forms", "Lists and grids", "Bottom Navigation Bar,
App Bar, Drawer and Floating Button", "TabView, Page View, Indexed Stack and Cross Fade", "Image and SVG", "Video Player and YouTube
Player", "Lottie and Rive", "Web View, Html and Markdown", catalog rows and "Open questions"), `features-theme-assets.md` ("Pick or upload
an asset from a widget property"), `features-logic.md` (variables, link menu, events). I re-read the code for every label and default I
used (the research held up except where noted under "Differences from research"). All four pages compile as MDX with the scratchpad
`check-mdx.mjs` (front matter, GFM tables, heading ids) and every relative link resolves (`check_links.py`; its "anchor NOT FOUND" for
`../wrappers.md#form` is a false alarm: the anchor is a `<span id="form">` in a table row on W13a's page).

Cross-cutting
- W13a had already written `reference/widgets/index.md` (catalog) and `reference/wrappers.md` when I started. The catalog links to my four
  pages at page level; `wrappers.md#form` links to `forms.md`. I gave every per-widget section an explicit heading id so the catalog can
  deep-link later: forms `#text-field #validators #form #dropdown-menu #pin-code-field`; lists `#list-view #connect-a-list #grid-view
  #swipeable-stack`; navigation `#app-bar #drawer #floating-button #bottom-navigation-bar #indexed-stack #page-view #tabview #cross-fade`;
  media `#image #svg #video-player #youtube-player #lottie #rive #web-view #html #markdown`.
- No badges (nothing here is gated in code). No prices or plan limits.
- Capture requests appended to `captures/requests/W13.md` (W13a created the file; I only appended rows).

## docs/reference/widgets/forms.md (Text fields and forms)

Research: `features-widgets.md` "Text Field and forms (dedicated topic)", catalog rows 3, 28-33, wrapper row 24 (Form); `features-logic.md`
"Events", "Link <field> menu", "Variables (screen/component)".

Key claims and code refs
- Text Field starts as `TextFormField` with no decoration (`packages/core/lib/src/widgets_to_add/widgets_to_add.dart:143-153`). The picker name is
  **Text Field**; the Outline and Details show `TextField` (`packages/core/lib/src/interpreter/widget/text_field_info.dart:6-8`), so the page does not
  call it that except on the old-widget warning.
- Controller variable: `TextFieldConnector` creates `TextEditingController` variable `text`, linked to slot `controller`
  (`text_field_info.dart:14-36`), through `VarConnectorHelper` (`packages/core/lib/src/interpreter/widget/widget_connector.dart:14-91`), added to
  the enclosing screen/component class (`klass.addStateMember`, `:44-56`). It runs on add (`packages/core/lib/src/interpreter/widget/widget_blocks.dart:195-209`,
  `onAdd`/`onRemove`) and when a wrapper is added (`packages/core/lib/src/interpreter/widget/designer_model.dart:548-563`, `onAdd(false)`).
  **Removing the field removes the variable**: `disconnect()` calls `decl.remove()` on whatever declaration `controller` currently points at
  (`widget_connector.dart:63-78`). Hence the `:::note`.
- Reading the text: "click the label, **LOCALS**, controller, choose `text`" is the same flow W15 wrote for Supabase sign-in
  (`docs/integrations/supabase/auth.md` step 5).
- Style table labels: Details fields of `BFTextField` (`packages/core/lib/src/fields/form_fields.dart:44-100`: Controller, Decoration, Min Lines, Max Lines,
  Cursor Color, Show Cursor, Cursor Width, Autofocus, Obscure Text, Enabled, Text Align, Style, On Tap, On Changed, On Editing Complete, Keyboard Type, Text
  Input Action, On Field Submitted, validator). **Decoration** sub-fields: `packages/core/lib/src/fields/basic_fields.dart:1754-1788` (Hint Text, Hint Style,
  Label Text, Label Style, Content Padding, Border, Enabled/Focused/Disabled Border, Filled, Fill Color, Prefix Icon, Error Text, Error Style, Constraints).
  **Border** dropdown **None**/**Outlined**/**Underlined**: `basic_fields.dart:1790-1844`. **Keyboard Type** options (None, Text, Number, Name, Email,
  Phone, Datetime, Multiline, URL, Visible Password, Street Address, Web Search, Twitter): `packages/core/lib/src/fields/text_fields.dart:1049-1096`.
  Theme **Fields**: `docs/design/themes.md` (W4) "Style text fields and buttons". **On Changed** gives `value`: `docs/logic/events.md`.
- Validators: `packages/core/lib/src/fields/form_validator.dart`. Row label `'<field name> validator'` with **+** on hover (`:7-47`; name from the controller
  via `findFormFieldName`, `form_fields.dart:125-146`); `+` creates `ValidatorBuilder().build()` whose default item is **Required** with "Field is required"
  (`form_validator.dart:287-340`); **Required** shows only a **Message** row and has no remove button (`:98-101`); `+ Add validator` menu "<name> validator"
  for the rules not yet used (`:41-90`, `options.remove(item.runtimeType)` at `:50`, so each rule once); defaults "Too small"/6 (`:42`, class `:197`), "Too long"/40 (`:43`, class `:230`), "Invalid email", "Invalid phone",
  "Invalid input" (`:44-46`); field labels **Message**, **Min**, **max** (lower case, `:257`), **Regex** (`:133-168`). Rules run in order, the first failing `if` returns
  its message (`buildStatement` per item + `ValidatorBuilder.build`, `:133-285`, `:342-348`). Min fails when `length < min`, max when `length > max`, Required when the text is empty.
- Form wrapper: `FormConnector` creates `formKey` (`GlobalKey<FormState>`) in the Form's `key` slot (`packages/core/lib/src/interpreter/declaration_info/widget_info.dart:494-526`).
  `BFForm` lists a validator row for every `TextFormField`, `DropdownButtonFormField` and `PinCodeTextField` under the Form (`form_fields.dart:7-41`).
  Wrapper list entry "Form": `packages/core/lib/src/wrappers_to_add.dart:125-131`.
- `validate`: `FormState.validate` returns `bool` (`packages/core/lib/src/interpreter/libraries/material_library.dart:90726-90739`); `GlobalKey.currentState`
  (`material_library_custom.dart:790-806`). **Not run in the app**: the steps "Condition label -> LOCALS -> formKey -> currentState -> validate" follow the link-menu rule
  ("picking a value of another type opens its members", `docs/logic/expressions.md` and `packages/core/lib/src/fields/link_menu.dart:56-276`). Nowa derives `?`/`!` itself for
  such chains (`packages/core/lib/src/interpreter/block_tree.dart:3308-3350`). Verifier: please click through once.
- "Fields that fail show their messages", "validators run only when your logic asks": Flutter's `FormField` behavior (no `autovalidateMode` is exposed in `BFTextField`/`BFForm`).
- Dropdown menu: starter has one item "first", `initialValue` 'first', `onChanged(String? value)` (`widgets_to_add.dart:658-687`); editor `BFDropdownButton`
  (`form_fields.dart:148-292`): **Value type**, **Items** (each **Value**, **On Tap**, **Child**, **Enabled**), **On Changed**, **On Tap**, **Menu Max Height**, **Is Expanded**,
  **Autofocus**, **Border Radius**, **Decoration**, validator, **On Saved**. New list items copy the last item (`packages/core/lib/src/fields/list_field.dart:31-57`), hence the duplicate
  note ("Values contain duplicates", `form_fields.dart:220`).
- Pin Code Field: `pin_code_fields` package and `pinCode` connector (`widget_info.dart:476-492`); **Pin Code Length** 1-6 and its note, **Pin Theme**, **Enable Active Fill**,
  **On Completed** (`packages/core/lib/src/fields/pin_code_fileds.dart:8-120`).
- Checkbox/Switch/Slider: starter blocks with `onChanged(value)` (`widgets_to_add.dart:590-629`, `690-707`); **Create Variable...** flow from `docs/logic/variables.md`.
- Old widgets: "TextField does not support validation, use TextFormField instead" + **Change** (`form_fields.dart:111-113`), "You are using an old version of the dropdown button" + **Update**
  (`:280-284`); both only when the field is not a form field and one widget is selected.
- Legacy page `legacy/tutorials/form-validation.md` is a video only; linked in Next steps (D4: moved untouched).

Left out and why
- **Value** control of the Dropdown menu: the editor reads/writes a `value` argument (`form_fields.dart:222-232`) but the library's `DropdownButtonFormField` has `initialValue`
  (`material_library_custom.dart:969-1060`) and the starter sets `initialValue` (research open question 6). Not documented until checked live.
- Text Field copy/paste: a pasted copy still references the same controller, and `connect()` skips creating a variable when the field is already connected
  (`isConnected`, `packages/core/lib/src/interpreter/widget/widget_connector.dart:27-47`), so two fields may share one controller. Not verified live; not mentioned. Candidate for a known issue.
- `autovalidateMode`, `On Saved`, `Text Input Action` details, cursor settings: not Nowa-specific.

Differences from research
- The research says a second Text Field gets `text2`. The code names it `text1` (`generateSymbolName` appends `++increment` starting at 0: `packages/core/lib/src/file_system/naming.dart:125-152`;
  the unit test comment `packages/core/test/interpreter_tests/widget_connector_test.dart:50` says "text1, text2"). The page says "the same name with a number added" and the capture request
  expects `text`, `text1`.

Open questions
- Does a second Text Field really get `text1`? (code says yes; confirm live.)
- Does `formKey` -> `currentState` -> `validate` appear in the **Condition** link menu as written?
- Does the Dropdown **Value** control work? (left out)
