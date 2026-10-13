# Phase 15 verifier brief: check the brought-back images and videos

You check one or two media batches that another agent did. Read `_rewrite/P15-MEDIA-BRIEF.md` first: it has the
verdicts, the rules for adding media, the privacy rules and the page ownership. Then read the batch report
`_rewrite/reviews/P15-<ID>-media.md` and the batch items in
`/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/media/batch-<ID>.tsv`. See what changed with
`git -C /home/user/docs diff` and `git -C /home/user/docs status --short` (other batches are editing other pages at the
same time; look only at your batches' pages and files).

## Check every ADD

1. **Still valid.** Look at the image, or at frames spread over the whole video (at least one every 3 seconds:
   `ffmpeg -v error -i <file> -vf fps=1/3,scale=640:-1 <scratchpad>/media/verify/<id>-%02d.jpg`). For a Nowa screen,
   compare with a current 3.13 screenshot of the same area (`static/img/docs/**`, index `_rewrite/captures/log.md`)
   and grep the labels in `/home/user/nowa-master`. For a third-party screen, compare with the page's step and, when in
   doubt, the provider's current help page (WebFetch/WebSearch via ToolSearch).
2. **Right place.** Right after the step it shows, on the page that covers that task; not next to a current
   screenshot of the same step; not stacked with other media.
3. **Words.** Alt text describes what's shown and matches it; a lead-in sentence (if any) is true, short and follows
   R1-R9 in `_rewrite/P14-BRIEF.md`. The media doesn't contradict the page's text.
4. **Privacy.** Every frame: no readable personal email, person's name or username, avatar photo, password, key or
   token value, private key, webhook secret, Supabase project ref or key, Apple Team ID / Key ID / Issuer ID.
5. **Files.** The path resolves (`static/<path>` exists), copied files landed where the brief says, videos pass
   `node scripts/check-videos.mjs`.

## Check the rejected items

- Every third-party item (Apple, Google Play, GitHub, Firebase console, Supabase dashboard, Stripe, Postman, Swagger,
  OpenRouter, Xano, Google Cloud...) marked OUTDATED, COVERED or NOT USEFUL: re-check it. These are what the user asked
  for, so a wrong rejection matters most.
- Every PRIVACY item: confirm what's readable.
- Nowa items marked OUTDATED: spot-check at least a third of them, and every one whose reason is vague.
- Every COVERED item: the named current image really shows the same step.

## Fix, then log

Fix what you find directly on the pages: remove a wrong ADD, add a wrongly rejected item (following the media brief),
fix alt text or placement. Add routed items only if they're for your batches' own pages; leave other routed items to
the orchestrator. Then run `node scripts/check-videos.mjs` and `python3 -I _rewrite/tools/site-checks.py` from
`/home/user/docs`. Don't run `yarn build`, don't commit.

Write `_rewrite/reviews/P15-<ID>-verify.md` for each batch: what you checked, every change you made (`+` added,
`−` removed, `~` changed) with the reason, verdicts you overturned, and open questions. End your final message with
the number of ADDs confirmed, removed and added per batch.
