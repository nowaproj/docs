# Phase 13 brief: Supabase, Stripe and GitHub shots from the cloud

You take screenshots for the Nowa docs (Docusaurus repo `/home/user/docs`, branch `docs-rewrite`, a **public** repo) in
the live Nowa 3.13.0 app on app.nowa.dev, signed in with the test account (paid **Scale** plan). A Claude session on the
user's Mac (see `LOCAL-SESSION.md`, Part 1) connected the throwaway Supabase and GitHub accounts to Nowa, which keeps
those connections on its server, so you can use them from here.

## Read first

1. `/home/user/docs/_rewrite/CAPTURE-SIGNED-IN.md`, all of it, including **Phase 11 rules**.
2. `/home/user/docs/_rewrite/CAPTURE.md`, sections "For each request" (highlight `#F7A93A`, look at every image) and
   "Hard limits". Ignore its "Setup" section.
3. `/home/user/docs/_rewrite/captures/README.md`, especially "Nowa 3.13 on app.nowa.dev". Tools:
   `/home/user/docs/_rewrite/captures/tools/` (`capture.mjs`).
4. Your rows in `/home/user/docs/_rewrite/captures/requests/W*.md` (search the ID) and the docs page of each row.

## What the Mac session set up

- Nowa project **Docs capture services**, connected to the Supabase project `docs-capture`, which has a `todos` table
  (`title` text, `done` boolean, three rows), a public storage bucket `files`, and email confirmation turned off.
- An empty Supabase project `docs-capture-empty` in the same Supabase account.
- GitHub connected to the test account (avatar → **General Settings** → **Git**), and a private repository
  `docs-capture-repo` with a README.

## Credentials

The Nowa test account only: `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/test-account.env`
(`NOWA_TEST_EMAIL`, `NOWA_TEST_PASSWORD`), mode 600. Load it with `source` in the shell that starts your script and
read it from `process.env`. Never print it or write it anywhere else. **Never sign in to Supabase, GitHub, Stripe or
Google** from here: if a step opens one of their sign-in or authorization pages, stop that row and report it as
`not-possible: needs the Mac session (<what opened>)`.

## Allowed in this phase (in `Docs capture ...` projects only)

- Generate Supabase functions from the templates, run them in the test panel, and open the ⋮ menus.
- Create a made-up test user with the generated `signUp` (an `@example.com` address and a password you generate; keep
  the password only in your scratchpad folder, mode 600), then use it for `signIn`.
- Upload a small PNG to the `files` bucket and download it again.
- Create or duplicate a `Docs capture ...` project, pull backend files, connect a project to `docs-capture-empty` and
  click **Set up** in the backend dialog (it creates tables in that throwaway Supabase project).
- Turn on Stripe and pick a table. No Stripe keys, and never click **Deploy Configuration**.
- Open the Git settings, **Manage Remotes** and the **Clone from GitHub** list. Don't create a repository. Clone only if
  a row needs it, into a project named `Docs capture clone`.

Still not allowed: AI prompts, deploying edge functions or Stripe configuration, payments, invitations, public projects,
custom domains, iOS builds, and solving a CAPTCHA.

## Privacy (public repo)

Blur every real email address, person's name, GitHub username, avatar, Supabase project ref or URL and API key before
saving a final image (ffmpeg `boxblur`, or crop it out), and check the image again after blurring. A made-up
`@example.com` address may stay. Never put an email, username or key in a file name, alt text or log.

## Work area and output

Use the `CAPTURE_CDP_PORT`, Xvfb display and scratchpad folder named in your prompt. Final images go to
`/home/user/docs/static/img/docs/<section>/<id>.png` (at most 1600 px wide).

Your log file (named in your prompt) under `/home/user/docs/_rewrite/captures/phase13/` has:

1. a table `| id | file | alt text | checked |` (same format as `captures/log.md`; alt text says what the image shows, one
   or two sentences, no `|`, no square brackets; checked = `yes (3.13.0)`), one row per final image;
2. a list `| id | status |` for rows you couldn't do, with the reason;
3. **Live check:** for each page you captured for, compare its steps and labels with the live UI and list every mismatch
   with a suggested correction (`| page | claim | what the UI shows | suggestion |`). Don't edit docs pages.

Don't edit `captures/log.md`, the request files or any docs page. Never commit or push. Stop any browser and Xvfb you
started before you finish.

Final message (at most 12 lines): captured / not possible, mismatches found, anything with a lasting effect (a project
created or duplicated, a test user, an uploaded file, tables created by **Set up**).
