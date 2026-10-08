# Signed-in capture brief

You take the screenshots (and a few videos) that need a signed-in Nowa account. Everything in `CAPTURE.md`
(setup, highlight, checking every image, log format, file names and sizes) applies; this file adds the rules for the
test account. Read `CAPTURE.md` and `captures/README.md` first.

## The test account

- The user gave a test account for this work. Its email and password are in the session scratchpad file
  `test-account.env` (two `export` lines: `NOWA_TEST_EMAIL`, `NOWA_TEST_PASSWORD`). Load them into your capture
  script's environment (`source <file>` in the shell that starts node, then `process.env.NOWA_TEST_EMAIL`).
- **Never print them, never write them to any other file, log, screenshot, commit or message**, and type them only
  into Nowa's own sign-in form. Crop or blur the account's email wherever it would show in a screenshot (account
  settings, the dashboard's name area, workspace member lists).
- Use only this account. Never sign up, never sign in with Google or Apple, never change the account's name, email,
  password, plan or settings.

## Where to sign in

1. First try the local 3.12.5 build (`http://localhost:8080`, see `CAPTURE.md`). It talks to `https://server.nowa.dev`.
   If sign-in fails there (for example a CORS or network error), use `https://app.nowa.dev` instead.
2. Before using app.nowa.dev, check which version it runs (open `https://app.nowa.dev/version.json`, or the version
   shown in the app). The docs describe **3.12.5**. If it runs 3.13 or later, the UI differs (Library panel instead
   of the widget picker, new top bar): capture only screens that look the same as 3.12.5 and list the rest as
   `not-possible: app.nowa.dev runs <version>`.

## Hard limits (from the user)

- No deploys, cloud builds (web, Android, iOS), purchases, upgrades, invitations or connected external accounts
  (GitHub, Figma, Supabase, Firebase, Stripe, RevenueCat, Google). You may open a dialog or menu to photograph it,
  then cancel it. **Run** in the embedded preview is fine (it isn't a deploy).
- **AI prompts: at most 5 for the whole project.** Log each one in `captures/ai-prompts.md` (time, mode, text, the
  rows it serves) *before* you send it. Plan them so one result serves several rows:
  1. A **Design** mode prompt on the dashboard (use the example prompt from `docs/guides/complete-app.md` step 1 or
     `docs/get-started/first-app.md`): record it for `ai-index-video` and capture `get-started-first-app-2`,
     `guides-complete-app-1`, `ai-chat-1`.
  2. **Make it real** or one **Agent** request in the same project: capture the checkpoint rows (`ai-undo-1`,
     `ai-undo-2`: open the dialog, then **Cancel**; never restore).
  Stop sending prompts once you reach 5, even if a row stays undone.
- Don't delete or change projects you didn't create. Name projects you create `Docs capture ...`, and leave them.
- Don't restore checkpoints, don't publish, don't make a project public, don't share links outside the session.

## What to capture

The rows in `captures/to-capture.md` (and their full descriptions in `captures/requests/W*.md`) whose reason is
"needs sign-in" or similar. Skip anything the hard limits forbid (for example the published web page, a finished
build, a connected Git remote) and mark it `not-possible: <why>`. Value first: one or two per page, the most
useful first: `get-started-first-app-1`, `get-started-first-app-2`, `account-index-1`, `account-projects-1`,
`publish-index-1` (the Deploy menu, opened and closed), `test-run-1`, `test-share-1`, `ai-chat-1`, `ai-undo-1`,
then the rest.

Log each capture in `captures/log.md` right after you check it. Update the request rows' status. Never commit.

Final message (at most 15 lines): captured / not possible counts, AI prompts sent (with the log), problems.
