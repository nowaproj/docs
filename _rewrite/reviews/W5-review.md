# W5 review: Add logic, part 1 (index, events, circuit, functions, expressions, popups, actions)

Verifier run against `/home/user/nowa-master` (v3.12.5). Pages are appended below as each one is finished.
Summary table at the end of the file is filled in when all seven pages are done (status: IN PROGRESS).

Pages done so far: index.md

## index.md (How logic works)

Front matter ok (title, description, sidebar_label, keywords). No H1 in body, headings sentence case, one admonition, no emoji, no `---` rules, no hype words. About 540 words.

| claim | verdict | code ref | note |
|---|---|---|---|
| Event (tap, long press, typing) starts logic; **On Pressed** | ok | `packages/core/lib/src/fields/button_fields.dart:144-161`, `form_fields.dart:70-93` | events are function properties |
| Steps are stacked in Circuit and run top to bottom | ok | `packages/code/lib/src/widgets/circuit_column.dart:41-70` (children laid out down the Y axis) | |
| Example: **On Pressed** adds one to `counter` and a Text linked to it shows the new number | fixed | `packages/core/lib/src/interpreter/suggestion.dart:616-618`, `packages/code/lib/src/models/expr_node.dart:86-91` | a screen variable only redraws after a **refresh** node (`setState`); sentence now says "and refreshes the screen" (same rule as `variables.md`) |
| Tip: **Agent** mode builds everything, **Design** mode builds "the look and flow without logic" | ok | `packages/ai/lib/src/ui/chat_field/mode_selector.dart:36-39` ("Create/refine the look and flow without logic", "For everything, from design to functionality") | matches `docs/ai/modes.md` |
| Table definitions of Event, Function, Circuit, Variable, Param, Global state, Model, Expression, Action | ok | concept summaries, no UI labels | |
| 11 same-section links, `../code/code-mode.md`, `../ai/modes.md`, `../test/problems.md` | ok | `pages.md` rows (W5, W6, W9, W2, W7) | link text equals each target's `title:` |
