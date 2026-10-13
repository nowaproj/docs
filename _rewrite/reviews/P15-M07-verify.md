# P15 M07 verify: Supabase media

Verifier: phase 15 media verifier (did neither M07 nor M08). Read `P15-MEDIA-BRIEF.md`, `P15-MEDIA-VERIFY.md`,
`reviews/P15-M07-media.md`, `batch-M07.tsv`, and the batch's commit `ba65729` (M07's edits were already in a WIP commit,
so `git diff` was empty at the start).

## What I checked

**The 4 ADDs, every frame at 1 fps** (59 frames, 1280 px wide, in the scratchpad `media/verify/m07/`), for privacy and for
the flow against the page steps.

| id | file | privacy (every 1 fps frame) | flow vs page | current Supabase dashboard | result |
|---|---|---|---|---|---|
| m064 | `static/videos/docs/integrations/integrations-supabase-authorize-nowa.mp4` (M07's 5 s cut) | Clean: no URL bar, only the org name "Nowa test" and `server.nowa.dev`. First frame and scene check: the cut has no leftover Nowa editor frame | Matches step 3 (pick org, **Authorize Nowa**) | **Changed.** Supabase moved `/authorize` to a new "connect interstitial" on 2026-06-08 (supabase/supabase #46359, live on master 2026-10-12, not behind a flag): the title is now **Authorize Nowa** with "This application wants to access your Supabase account", the organization picker sits at the top, the long "Read and Write access to ..." checklist is replaced by a short permission summary card with **Show detailed permissions**, and the buttons are stacked full width, **Authorize Nowa** above a **Cancel** text button (the video's **Decline** is gone). Source: `apps/studio/components/interfaces/ApiAuthorization/ApiAuthorization.Form.tsx` and `Organization/OAuthApps/AuthorizeRequesterDetails.tsx` | **Removed** (OUTDATED) |
| m070 | `/videos/supabase/db/create.mp4` | Clean: org "Nowa test", project name `nowa-project2-<number>` (a name, not a ref), no URL bar, generic avatar | Matches steps 2 to 4 (SQL Editor, paste, **Run**, "Success. No rows returned", `todos` in the Table Editor). But the SQL in the video is an older snippet (`id uuid`, policies named "Users can ... their own todos.", no `grant` line), not the one on the page | Table Editor, **New table**, SQL Editor and **Run** are still the same in studio master | **Kept**, lead-in changed |
| m072 | `/videos/supabase/db/visual.mp4` | Clean: org "nowa", project "nowa 2", table "test" | Matches "Prefer clicking?" (**New table**, **Name**, RLS checked, `id`/`created_at`, **Save**) | Same in studio master ("Create a new table under public", "Enable Row Level Security (RLS)", **New table**) | **Kept** |
| m081 | `/videos/supabase/storage/createbucket.mp4` | Clean: org "nowa", project "nowa project test", bucket "nowa" | Matches steps 2 to 5 and the public-bucket note | Refreshed but the same controls: studio master (`Storage/FilesBuckets/CreateBucketModal.tsx`, `NewBucketButton.tsx`) has **New bucket**, a dialog now titled "Create file bucket" with **Bucket name** (the video: "Create storage bucket", "Name of bucket", plus a Bucket type picker that's gone), the same **Public bucket** toggle and "Public buckets are not protected" warning, and **Create**. The Storage page now lists buckets in a table under Files/Analytics/Vectors, with **New bucket** at the top right instead of in a sidebar | **Kept**, step text fixed |

Placement: each kept video sits right after the step it shows, on the page for that task, with no current screenshot of
the same step next to it and no stacking. Files resolve; `check-videos.mjs` passes.

## M07's open question (storage.md step 5: "Create Bucket" vs "Create")

Supabase's docs (`apps/docs/content/guides/storage/buckets/creating-buckets.mdx` and `storage/quickstart.mdx`) still
say **New Bucket** / **Create Bucket**, but the dashboard code on master (12 Oct 2026) labels the buttons **New bucket**
and **Create**, which is also what the video shows. The dashboard is what the reader clicks, so I changed the text to
match it and kept the video.

## Rejected items re-checked

- **Third-party, NOT USEFUL / OUTDATED:**
  - m071 (Supabase's own dashboard AI Assistant making a todos table): agree NOT USEFUL; the page doesn't use that
    assistant.
  - m085 (Table Editor **Enable Realtime** → "Enable realtime for todos"): agree OUTDATED, for a sharper reason. The
    dialog still exists, but on studio master **Enable Realtime** is now an item in the Table Editor header's dropdown
    menu (`TableGridEditor/GridHeaderActions.tsx`), not the header button in the video. The page uses **Database** →
    **Publications**, which still works, so the text wins.
- **PRIVACY, all confirmed:** m068 (project ref in `https://<ref>.supabase.co` and the full anon key, in the Supabase
  Connect dialog and Nowa's fields), m074 and m076 (a personal Gmail address in "Testing as:"; read in `editcode.png`
  at full size), m077 and m078 (the same email plus a browser URL bar with `supabase.com/dashboard/project/<ref>/...`).
  All of these also show the old Nowa top bar, so they'd be OUTDATED anyway.
- **Nowa OUTDATED, spot-checked 12 of 25:** m055, m056, m059, m066, m067, m069, m082, m084, m086, m089, m090, m091. Every
  one shows the BETA chip, Feedback and Upgrade top bar and the floating Outline, and most show the old **Fetch Tables**
  panel or the removed AI "Generate a query" popup. Agree.
- **COVERED:** m065 (Create New Supabase Project dialog) is really covered by `integrations-supabase-create-1.png` at
  connect.md, and the old clip also has the old top bar. Agree.
- m080 (YouTube "Nowa 3.4 | Supabase MCP"): agree OUTDATED (3.4 in the title).

## Changes

- `−` `docs/integrations/supabase/connect.md`: removed the m064 video from step 3. Supabase redesigned this page in June
  2026 (see the table), so the clip shows a layout, permission list and **Decline** button readers won't see. Step 3's
  text (choose your organization, click **Authorize Nowa**) is still right and was left as is.
- `−` `static/videos/docs/integrations/integrations-supabase-authorize-nowa.mp4`: deleted the cut, since nothing references
  it now. The source `static/videos/supabase/1.mp4` is untouched.
- `~` `docs/integrations/supabase/database.md:64`: the lead-in before `create.mp4` now adds "It was recorded with an
  earlier version of the snippet, so paste the one above:". The video's SQL has no `grant` line, and the page explains
  that new tables need it.
- `~` `docs/integrations/supabase/storage.md:21,24`: step 2 **New Bucket** → **New bucket** and step 5 **Create Bucket** →
  **Create**, to match the current dashboard and the video.

## Verdicts overturned

- m064: ADD (cut) → OUTDATED (Supabase's authorization page was redesigned on 2026-06-08).

## Open questions

1. M07 couldn't reach supabase.com (DNS). WebFetch failed the same way for me, but `curl` through the proxy and a sparse
   `git clone` of `supabase/supabase` worked, so all dashboard facts above come from studio source on master
   (`cb4307f`, 2026-10-12). I couldn't see the live dashboard itself. If someone can, they should confirm the authorize
   page looks like the new interstitial. If it still shows the old layout, the m064 cut can be restored from
   `static/videos/supabase/1.mp4`: `-ss 2.97`, then re-encode as M07 did.
2. The storage video shows the older Storage sidebar and a dialog with a Bucket type section. I kept it because every
   control the steps name (**New bucket**, name, **Public bucket**, **Create**) is the same. Drop it if the orchestrator
   wants only screens that look current.
3. The privacy files M07 listed (m068, m074, m076, m077, m078) are still served from `static/`. Same suggestion as M07:
   delete them or check nothing links to them.

## Checks

`node scripts/check-videos.mjs`: "Validated 18 video embed(s) and 18 unique MP4 file(s)." `python3 -I
_rewrite/tools/site-checks.py`: "problems: 0".

## Counts

ADDs confirmed 3 (m070, m072, m081) · removed 1 (m064) · added 0.
