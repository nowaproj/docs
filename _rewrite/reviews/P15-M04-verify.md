# P15 M04 verify: Getting started and editor basics

I read `P15-MEDIA-BRIEF.md`, `P15-MEDIA-VERIFY.md`, the batch report `P15-M04-media.md` and `batch-M04.tsv` (29 items).
The batch's one change is already in the WIP commits: `/img/exploreinterface/circle.png` on
`docs/get-started/editor-tour.md`. Code refs are relative to `/home/user/nowa-master` (3.13.0).

## ADD

### m119: `/img/exploreinterface/circle.png` at editor-tour.md:96

- **Valid, and it's the 3.13 look.** The file sits in the same old folder as the v3.0.7-beta editor shots, so I checked it
  against the 3.13 captures of the same panel: `logic-navigation-1.png`, `logic-popups-1.png` and `logic-circuit-1.png`
  (all marked 3.13.0 in `captures/log.md`). Everything matches:
  - The floating panel: the event name as title, a close X and the dotted canvas.
  - The orange event node: the tap icon, onPressed and ElevatedButton under it.
  - The dark step nodes: the lightning icon and the dots between steps.
  - The selected step's orange outline.
  - The Details box: a collapse chevron, **Expression:** with green `openUrl(...)` and a **+** button, a divider, then the
    function name as a heading and its title-cased parameter (**Url**), laid out like **Context** and **Builder** in
    `logic-popups-1`.

  It shows none of the 3.0 editor (no BETA top bar, file tabs or toolbar). In the code, `Expression:` comes from
  `packages/code/lib/src/fields/expression_statement_field.dart:44`. There is no **Store result** row because
  `store_result_field.dart` (`_findState`, l.66-74, and `build`, l.91) hides it for void calls, and `openUrl` is
  `void openUrl(String url)` (`packages/nowa_runtime/lib/src/functions.dart:3`). The image is what 3.13 draws for this
  circuit.
- **Place:** right after the paragraph on how Circuit opens (an event's **+** / **Edit** in Details). The Circuit section
  had no picture, and the only other image on the page is the editor overview at line 10, so nothing is stacked.
- **Words:** the alt text matches the image (event at the top, showDialog and openUrl stacked, openUrl outlined, Details with
  Expression openUrl(...) and Url https://nowa.dev). It doesn't contradict the text.
- **Privacy:** nothing personal. **File:** exists (1444 × 987).

## Rejected items

- **Third-party:** none in this batch (every item is a Nowa screen).
- **PRIVACY:** none marked. The old whole-editor shots (m111, m112, m116, m117) show a small default avatar in the top bar,
  with no name. They're not added anyway.
- **COVERED:** m251 (the annotated Screen Details panel) → `design-screens-2.png` shows the same Screen section in 3.13
  (Color, App Bar, Drawer, Floating Act…, Bottom Nav…, Size), plus the Route Settings the old image lacks. Confirmed.
- **NOT USEFUL:** m133 (the finished stopwatch running) confirmed: it shows only the result of an app the new tutorial
  doesn't build.
- **Nowa OUTDATED, spot-checked 9 of 26:** m111, m112, m116, m117, m118, m131, m232, m249 and m268. All confirmed:
  - m111, m112, m116, m117: v3.0.7-beta-12 whole-editor shots (BETA badge, file tab, Feedback/Upgrade, top toolbar with
    Play, Files folder icon).
  - m118: the old widget picker (Search for: All / Builtin / Components) opened from the top toolbar, in v3.0.9-beta.
  - m131: the v3.0.4-beta AI Assistant ("0/5 messages used", no Design/Plan/Agent modes) building a stopwatch.
  - m232: the New Component from Column dialog over the BETA editor in every frame.
  - m249: the template list with Empty Page / Basic Cards 1-3 and the New Empty Page dialog, in the BETA editor.
  - m268: the toolbar with a Play button (3.13 has five tools and no Play).

  m116 and m117 are rejected only for the editor around the panel. A crop of the panel alone was possible, so I checked
  that too. The 3.13 Themes panel no longer has the **Seed** mode (`'Seed'` doesn't appear in the code), so m117 stays
  OUTDATED. The Supabase panel's **Connect** / **Use Keys** still exist (`packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart`),
  but a two-button panel adds nothing to the tour's one-line Supabase mention, and the Supabase pages (M07) have their own
  captures. NOT USEFUL either way, so not added.

## Changes

None. No verdicts overturned, nothing removed or added.

## Checks

`node scripts/check-videos.mjs`: 15 embeds OK. `python3 -I _rewrite/tools/site-checks.py`: problems: 0.

## Open questions

- m124 from batch M03 belongs on this batch's page `create-account.md` (a Google consent screen, redacted). I couldn't
  write it into `static/`. The proposal is in `P15-M03-verify.md` under Open questions.
