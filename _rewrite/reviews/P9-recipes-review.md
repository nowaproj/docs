# P9 recipes review

Verifier run, 2026-10-07. Batch "P9 recipes": text added after the pages were verified (items 1 to 7 of the assignment). Source of truth: `/home/user/nowa-master` (v3.12.5). Writer refs: `reviews/phase9-fixes.md` ("Recipes and clarifications", parts 1 to 3) and `reviews/W20-writer-notes.md` (tasks 3, 4, 5). Only the added or changed parts were checked (`git diff b0b2c98 -- <page>`).

Summary: (filled in at the end of the run)

## Item 1. Pointers to the list-to-detail recipe

Pages: `docs/reference/widgets/lists.md`, `docs/integrations/show-data.md`, `docs/integrations/supabase/database.md`, `docs/ai/prompting.md`. Target: `docs/logic/navigation.md`, H2 "Open a detail screen when a list item is tapped" with `{#open-a-detail-screen}` (line 79).

| Claim | Verdict | Code ref | Note |
|---|---|---|---|
| lists.md (end of "Fill a list from your data"): "To open a screen when someone taps an item, see [Open a detail screen when a list item is tapped](../../logic/navigation.md#open-a-detail-screen)." | ok | recipe heading text matches; anchor `{#open-a-detail-screen}` at `navigation.md:79` | Relative path resolves to `docs/logic/navigation.md`. The sentence only says where to go. |
| show-data.md (end of "Show a list"): "To open a detail screen when someone taps a row, see ..." | ok | same anchor | Path `../logic/navigation.md` resolves. |
| database.md (end of "Show the results in your app"): "load that row with **Get Record by ID**" | ok | template name `Get Record by ID` (`getById`, "Fetch a single record by its ID"): `packages/data/lib/src/supabase/templates/supabase_template_definitions.dart:31-37`; the recipe's step 4 uses the function made from that template | Label is also in the page's own table (line 30). |
| prompting.md: new row "Open a detail screen", mode **Agent**, prompt "When I tap a product in the list, open a detail screen that shows its name, photo and price." | ok | Design mode's toolset has no Supabase or API vertical ("the designer must not be able to wire data even by accident"): `packages/ai/lib/src/agent/designer_agent.dart:7, 35-37`; the recipe says "ask in **Agent** mode" (`navigation.md:93`) | **Agent** is the safe mode for a screen that loads a row. The row's link target resolves. The page keeps its other rows unchanged. |
| Style: no emoji, no hype words, no `---`, headings unchanged | ok | n/a | Front matter of the four pages unchanged. |

Item 1: 5 rows, 0 fixed, 0 removed.
