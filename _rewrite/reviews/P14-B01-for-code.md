# P14-B01 for-code: facts moved off the Get started and Build a great app pages

Each bullet is copied unchanged from the page it came from (rule R2), grouped under the anchors of
`docs/code/generated-code.md`. The orchestrator merges these into that page.

## #supabase

- From `docs/guides/complete-app.md` (step 3, Connect Supabase): "Nowa adds the Supabase package and a `SupabaseService` with `signUp`, `signIn` and `signOut`."
- From `docs/guides/ship-tips.md` (Keep a way back): "**Supabase:** **Pull Backend Files**, in the **Supabase** panel's ⋮ menu, copies your migrations, edge functions and bucket list into the `supabase/` folder, so you can commit it. It needs recorded migrations, and table data isn't copied."

## #project-files

- From `docs/guides/ai-tips.md` (Undo with checkpoints): "Checkpoints are an undo button, not a backup. They live in `.nowa/temp/`, which Git ignores."
- From `docs/guides/ship-tips.md` (Keep a way back): "**Checkpoints** undo Nowa AI requests. They aren't a backup: they live in `.nowa/temp/`, which Git ignores."

## #models

- From `docs/guides/data-and-state-tips.md` (Describe your data with models): "Create one [model](../logic/models.md) per kind of thing, such as `Recipe` or `Task`. Nowa keeps its constructor, `fromJson` and `toJson` up to date."

## #stripe

- From `docs/guides/ship-tips.md` (Publish checklist, test settings row): "Test settings are off: Stripe uses live keys instead of test keys and Google Pay's `testEnv: true` is changed."

## #publishing

- From `docs/guides/ship-tips.md` (Keep Problems clear): "**From Nowa (Instant)** checks as you edit. **From Code Analysis (Accurate)** runs `flutter analyze` on the whole app when you click **Run Code Check**. Run it before you publish: publishing to the web starts with a code check and stops on errors."
