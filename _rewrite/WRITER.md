# Writer brief

You write one batch of new Nowa docs pages. Another agent will verify every claim against the code afterwards,
so cite what you rely on.

## Read first (in this order)

1. `/home/user/docs/_rewrite/BRIEF.md`: context, paths, non-negotiable rules, decisions.
2. `/home/user/docs/_rewrite/style-guide.md`: voice, page anatomy, formatting, badges, capture placeholders.
3. `/home/user/docs/_rewrite/glossary.md`: the exact terms and UI labels to use.
4. `/home/user/docs/_rewrite/structure.md` and `/home/user/docs/_rewrite/pages.md`: the whole site map (for
   cross-links) and **your batch's rows** (path, title, type, must-cover list, sources, old pages, anchors).
5. The research files your rows cite (`/home/user/docs/_rewrite/research/features-*.md`). They are detailed and
   cite code as `path:line` (relative to `/home/user/nowa-master`). Search them for the feature names.

## Work incrementally (important)

Usage limits can stop you mid-task. **Write each page to disk as soon as it's drafted**, then move to the next, and
append to your notes file as you go. Before starting, check which of your pages already exist (a previous run may
have written some): keep and improve those rather than starting over.

## How to write each page

- **Rely on the research files, spot-check the code.** The research files were built from the code and cite
  `path:line` for every label. Use their exact labels. Open `/home/user/nowa-master` only when a detail you need
  is missing, unclear, or looks contradictory (the code wins; note it). Don't re-verify everything: a separate
  verifier checks every claim against the code after you. If you can't confirm something, leave it out and note it.
- Cover every item in the page's "Must cover" list, in a sensible order for a reader doing the task. If an item
  turns out not to exist or not to be user-facing, skip it and note why. If you find a user-facing feature that
  belongs on your page but isn't listed, add it and note it.
- Old pages (now in `/home/user/docs/_rewrite/old-docs/`, same sub-paths as the old `docs/` folder) are only for
  ideas and media; most are outdated. Never copy a step or label from them without confirming it in code. Never
  copy prices, credit amounts or plan limits (D3).
- **Front matter**: `title`, `description` (one sentence), optional `sidebar_label` (short), `keywords` (search
  words users would type, incl. old names like "Hybrid approach", "Think mode", "Instant preview"). No
  `sidebar_position` (the sidebar is explicit). No H1 in the body.
- **Links**: relative links to other pages' `.md`/`.mdx` files using the paths in pages.md (e.g. from
  `docs/design/screens.md` to `../logic/navigation.md`), even if that page isn't written yet. External links: full URLs.
- **Anchors**: when pages.md says "Keep anchors", give that heading the explicit id: `## Set up Flutter {#setting-up-flutter-sdk}`.
- **"Or ask Nowa AI"**: where the agent can do the task (see `features-ai.md` "What the agent can do"), add a short
  `:::tip` with one example prompt. Don't promise specific output.
- **Badges** (`<Badge type="..." />`, see style guide) only where the code gates the feature.
- **Media**: don't reuse old Nowa screenshots/videos (the UI changed); add capture placeholders instead, at most
  1-2 per page where they really help, and add each request as a row in
  `/home/user/docs/_rewrite/captures/requests/<batch>.md` (format: `captures/requests/README.md`; create the file
  with the header row if it doesn't exist). Old screenshots of third-party consoles (Firebase, Supabase, Apple,
  Google, Stripe) may be reused if still plausible: copy them to `static/img/docs/<section>/` and note it.
  Captures are done from the `/playground` editor without sign-in (no dashboard/account/deploy screens possible
  tonight); still request what's useful and mark `needs-sign-in` in the request's status when it does.

## Notes file (required)

Write `/home/user/docs/_rewrite/reviews/<batch>-writer-notes.md` (append per page as you go): for each page, the
research sections and code refs (`path:line`) behind its key claims, anything you left out and why, assumptions,
open questions, and "coverage notes" (features you found that aren't in pages.md, or must-cover items that don't
exist). Keep it concise.

## Boundaries

- Write only: your batch's page files, any images you copy into `static/img/docs/<section>/`, your capture
  request file and your notes file. Create folders as needed.
- Don't edit `sidebars.js`, `docusaurus.config.js`, `src/`, other batches' pages, `docs/new/*`, or other `_rewrite`
  files. Don't run `yarn build` (the orchestrator does it). Never commit or push.
- Final message (at most 15 lines): pages written (paths + word counts), number of capture requests, the most
  important open questions, anything blocking. Don't paste page contents.
