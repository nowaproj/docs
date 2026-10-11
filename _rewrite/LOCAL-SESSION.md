# Local session brief: what needs the user's own computer

The cloud session (where the docs were written) can't sign in to Supabase, Stripe, GitHub or Google: their sites block
its browser with CAPTCHAs or bot checks, and Nowa keeps the Firebase sign-in only in the browser that made it. This brief
is for a Claude session on the user's Mac with computer use and a browser it can drive (the Claude app's built-in
browser, or Claude in Chrome). The user is there to click any CAPTCHA: never solve one yourself.

Read first: `_rewrite/CAPTURE.md` ("For each request": highlight `#F7A93A`, check every image by eye),
`_rewrite/CAPTURE-SIGNED-IN.md` (all of it, including **Phase 11 rules**), `_rewrite/captures/README.md` ("Nowa 3.13 on
app.nowa.dev"), and the request rows below in `_rewrite/captures/requests/W*.md`. All are in the public repo
`nowaproj/docs`, branch `docs-rewrite`.

**Accounts.** Use only the Nowa test account and the throwaway Supabase, Stripe, GitHub, Figma and Google (Firebase)
accounts the user created for this. The user gives you their sign-in details in your session; never write them into a
file, a commit or a screenshot. **The docs repo is public:** blur every email, person's name, username and avatar in a
screenshot, and keep them out of file names, alt text and logs.

## Part 1: connect the services (about 15 minutes, the user clicks any CAPTCHA)

Do this in the browser, signed in to app.nowa.dev with the Nowa test account. Create one project for it, named
`Docs capture services`. Nowa keeps the Supabase and GitHub connections on its server, so once they're made here the cloud
session can take those screenshots itself.

1. **Supabase.** Sign in at supabase.com with the throwaway account and create a free project named `docs-capture`
   (any region). Then in Nowa: the project's **Settings** (gear) → **Integrations** → **Supabase** → **Connect**, approve
   Nowa in the window that opens, and pick that project.
2. **GitHub.** Sign in at github.com with the throwaway account and create a private repository `docs-capture-repo` with a
   README. Then in Nowa: avatar menu → **General Settings** → **Git**, connect GitHub and approve Nowa.
3. **Stripe.** Sign in at dashboard.stripe.com with the throwaway account, stay in **test mode**, and copy the
   **Publishable key** (Developers → API keys). In Nowa: **Settings** → **Integrations** → **Stripe**: turn on
   **Enabled**, set **Merchant Name** `Docs capture`, **Country Code** `US` and paste the publishable key. Don't paste the
   secret key anywhere and don't click **Deploy Configuration**.
4. **Firebase.** Sign in to the Firebase console with the throwaway Google account and create a project `docs-capture`
   (no Google Analytics). Then in Nowa, in **another** project named `Docs capture firebase`: **Settings** →
   **Integrations** → **Firebase** → **Continue with Google**, pick the project, **Connect Apps**.

Tell the user (and the cloud session) which of the four worked.

## Part 2: the Firebase screenshots (in the same browser)

The Firebase sign-in stays in this browser, so these are taken here, in `Docs capture firebase`. Rows (their states are
in `captures/requests/W16.md` and `W20.md`): `integrations-firebase-connect-1`, `integrations-firebase-connect-2`,
`integrations-firebase-auth-1`, `integrations-firebase-auth-2`, `integrations-firebase-notifications-1`,
`integrations-firebase-firestore-1`, `logic-router-1`. Don't send test push notifications to real devices, and don't
send any AI prompt.

For `integrations-firebase-firestore-1` you need a collection and a query: the 3.13.0 designer has no button for them
(product issue P48). Open the project with `?panel=files` at the end of its address to get the old **Files** panel,
click `lib/firebase/collections.dart` for **Add Main Collection** and `queries.dart` for **Add New Query**. That trick is
only for setting up the state; don't capture it.

## Part 3: the emulator screenshot (Nowa desktop app on the Mac)

`test-devices-1` (`docs/test/devices.md`, request in `captures/requests/W7.md`): the Nowa desktop app for macOS, signed in
with the test account, a cloud project open, an iOS Simulator booted (Xcode) and, if installed, an Android emulator.
Click the arrow next to **Run** and capture the **Run on** menu: **Embedded preview**, a device row, the **Start an
emulator** rows, the **Local cache** row (hover it for its three buttons) and **Local environment settings**.

## Handing the images back

Save each image as `<id>.png` (at most 1600 px wide, highlighted and blurred as above) in a folder on the Mac, plus a
`captures.md` with one row per image: `| id | file | alt text | checked |` (file `/img/docs/<section>/<id>.png`; alt text
one or two sentences, no `|`; checked `yes (3.13.0, macOS)`), and a short list of anything on the pages that didn't match
what you saw. The user uploads the folder to the cloud session, which embeds the images. If this Mac has the docs repo
cloned and the user agrees, commit them to `docs-rewrite` instead.

## Still blocked (the user decides)

- `ai-connectors-1` (Figma menu): connecting Figma fails on Nowa's side today (product issue P117). Take it after the fix.
- `ai-connectors-2` (Supabase approval card): needs one AI request in Agent mode; the 5-prompt budget is used up.
- `ai-external-agent-1`: needs the **external_agent** feature on the test account (the paid plan doesn't include it).
- `publish-web-2` (custom domain DNS records): needs a domain or subdomain the user owns.
- `test-share-2` (public sharing): needs a throwaway project made public for a moment.
