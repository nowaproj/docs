# Phase 11: Figma connection, ai-connectors-1 (2026-10-11)

Worker `p11-figma` (CDP 9342). Nowa 3.13.0 (`v3.13.0-79`) on app.nowa.dev, signed in with the test account (Scale plan), in the
existing project **Docs capture Main** (opened only: nothing edited, no AI prompt sent, no project created).

## Captures

| id | file | alt text | checked |
|---|---|---|---|

No final image: the Figma account could not be connected (see below), so there is nothing new to show.

## Not possible

| id | status |
|---|---|
| ai-connectors-1 | not-possible: Figma can't be connected to a Nowa account in 3.13.0 right now. First try (Figma icon in the chat field): Nowa opened Figma's sign-in in a new window; the sign-in went through (no CAPTCHA), but Figma's authorization page then only said "OAuth app with client id ... doesn't exist", with no Allow button. None of the four later tries (two from Account Details > Connect, two from the chat field) opened a window; the three I logged got HTTP 500 from Nowa's server (`POST /auth/figma/connect`). Without a connected account the Figma icon never turns on, so its menu (Connected, Auto-approve tools, Turn off MCP) can't be opened. Retry once Nowa fixes its Figma OAuth app. |
| account-account-settings-figma | not-possible: same cause. Account Details > Connected Accounts still shows Figma with Connect (as already shown in account-account-settings-1), so there is no connected row to capture. It would belong to `docs/account/account-settings.md` (Connect Figma section). |

## What happened (details for the orchestrator and the Nowa team)

1. Chat field Figma icon, tooltip **Enable MCP**. Click: Nowa showed **Waiting for Authorization...** and opened a new window on
   `www.figma.com/login`. Signed in with the throwaway Figma account (no CAPTCHA or other check). Figma then went to `www.figma.com/oauth`
   and showed a plain-text error: "OAuth app with client id ... doesn't exist" (the client id is Nowa's, taken from the authorization URL
   that Nowa's server generated). No consent page, nothing to approve. Nowa's dialog kept polling `GET /auth/figma/me` (404 = not connected).
2. Account Details > Connected Accounts > **Connect** (twice): the same **Waiting for Authorization...** dialog, but no window opened;
   on the second try the network log shows `POST server.nowa.dev/auth/figma/connect` answering **500**. The dialog showed no error and
   simply counted on (the source clears the error on the next poll).
3. Chat field icon again (twice, about 18 and 24 minutes after the first try): `POST /auth/figma/connect` **500** each time, no window.
   On the last try the dialog was left to time out: see the live check.
4. Result: the test account has **no** Figma connection (Account Details still shows **Connect**). Nothing was authorized on the Figma side.
   The throwaway Figma account was signed in only inside this worker's cloud browser, which is now closed (profile deleted).

## Live check

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| docs/ai/connectors.md (Connect Figma, step 2) | "If your Nowa account isn't linked to Figma yet, a browser window opens. Approve access there." | The window opens on Figma's sign-in, but after signing in Figma shows only "OAuth app with client id ... doesn't exist": there is no access to approve. Later tries open no window at all (Nowa's server answers 500) while Nowa still shows Waiting for Authorization... with no error. | Product bug, not wording: report it to the Nowa team. Until it is fixed, consider a short note (or a Troubleshooting entry) that Figma authorization can currently fail, and keep the ai-connectors-1 placeholder. |
| docs/ai/connectors.md (Connect Figma, step 2) | "Nowa waits with Waiting for Authorization... for up to 2 minutes, and shows "Authorization timed out. Please try again." after that. Click Cancel to stop waiting." | At 2 minutes a red bar at the bottom of the window shows "Authorization timed out. Please try again." for about 2 seconds (behind the dialog's dimmed background), as the page says. But the dialog stays open, its counter stopped at "Waiting for 2m 0s..." and its spinner still turning; only Cancel closes it. | "Nowa waits with Waiting for Authorization... for up to 2 minutes. Then a red message at the bottom says "Authorization timed out. Please try again.", but the dialog stays open: click Cancel to close it. You can click Cancel at any time to stop waiting." |
| docs/account/account-settings.md (Connect Figma, step 1) | "Click Connect. A Waiting for Authorization... dialog appears while you approve Nowa in your browser." | The dialog appears, but on both tries no browser window opened (Nowa's server answered 500 on the try I logged) and nothing told the user; the dialog just counted on. | Same product bug as the first row. No wording change needed once it is fixed. |

Checked and matching: the Figma icon's tooltip reads **Enable MCP** while off; clicking it opens **Waiting for Authorization...** ("Please
complete the authorization in your browser.", a "Waiting for 9s..." style counter, **Cancel**), and **Cancel** closes it and leaves the icon
off; in a project, the avatar menu has **General Settings** (and **Logout**), which opens the window on **Account Details**; **Connected
Accounts** shows the Figma row with **Connect**.

Not verifiable live (Figma never connected): the icon turning on, its menu (**Connected**, **Auto-approve tools**, **Turn off MCP**), the
connected row (Figma name, email, **Disconnect**) and the Disconnect confirmation (**Are you sure?**, the reconnect warning, **No** / **Yes**).
All of these match the 3.13 source.
