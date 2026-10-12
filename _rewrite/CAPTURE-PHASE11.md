# Phase 11 capture brief (2026-10-11)

You take screenshots for the Nowa docs (Docusaurus repo `/home/user/docs`, branch `docs-rewrite`, a **public** repo) in
the live Nowa 3.13.0 app, signed in with the test account, now on the paid **Scale** plan.

## Read first

1. `/home/user/docs/_rewrite/CAPTURE-SIGNED-IN.md`, all of it, especially **Phase 11 rules** at the end: what is allowed
   now (a web publish and one Android build of a `Docs capture ...` project you create, generating an Android signing key,
   connecting the throwaway Figma account) and what still isn't (iOS builds, custom domains, public projects, purchases,
   invitations, AI prompts, CAPTCHAs or getting around a site's bot checks).
2. `/home/user/docs/_rewrite/CAPTURE.md`, sections "For each request" (highlight `#F7A93A`, check every image by eye)
   and "Hard limits". Ignore its "Setup" section.
3. `/home/user/docs/_rewrite/captures/README.md`, especially "Nowa 3.13 on app.nowa.dev" (proxy flag, cookie banner,
   coordinates, Flutter canvas tips). Tools: `/home/user/docs/_rewrite/captures/tools/` (`capture.mjs`).
4. The capture requests for your rows in `/home/user/docs/_rewrite/captures/requests/W*.md` (search the ID), and the docs
   page each row belongs to.

## Credentials

In the session scratchpad, mode 600: `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/test-account.env`
(`NOWA_TEST_EMAIL`, `NOWA_TEST_PASSWORD`) and `.../scratchpad/ext-accounts.env` (`EXT_MAIN_EMAIL`, `EXT_MAIN_PASSWORD`:
the throwaway Figma account). Load them with `source` in the shell that starts your script and read them from
`process.env`. Never print them, never write them anywhere else, type them only into the sign-in forms of Nowa and Figma.

## Work area

Use your own `CAPTURE_CDP_PORT`, your own Xvfb display if you need one, and your own folder under
`/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/` (named in your prompt). Final images go to
`/home/user/docs/static/img/docs/<section>/<id>.png` (at most 1600 px wide).

## Privacy (public repo)

Blur every email address, person's name, username and avatar before saving a final image (ffmpeg `boxblur` on the
region, or crop it out). Check the image again after blurring. Never put an email in a file name, alt text or log.

## Output

- Your own log file (named in your prompt) under `/home/user/docs/_rewrite/captures/phase11/`, with:
  1. a table `| id | file | alt text | checked |` (same format as `captures/log.md`; the alt text says what the image
     shows, one or two sentences, no `|`, no square brackets; checked = `yes (3.13.0)`), one row per final image;
  2. a list `| id | status |` for rows you couldn't do, with the reason (`not-possible: ...`);
  3. **Live check:** for each docs page you captured for, compare the page's steps and labels with what the live UI
     shows, and list every mismatch with a suggested correction (`| page | claim | what the UI shows | suggestion |`).
     Don't edit docs pages.
- Don't edit `captures/log.md`, the request files or any docs page; the orchestrator merges your log.
- Never commit or push.

Final message (at most 12 lines): captured / not possible, mismatches found, anything you did that has a lasting effect
(a published site, a build, a connected account, a project you created).
