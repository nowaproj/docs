# Still to capture

2 screenshots or videos the pages still ask for. Each one is an invisible placeholder in its page,
`{/* CAPTURE: id=... */}`, so readers never see it. This file is generated from those placeholders and the request
files in `requests/` by `tools/to-capture.py`: take the capture, log it in `log.md`, run `tools/embed.py`, then run
`tools/to-capture.py` again.

## Still blocked (2)

These wait for a fix on Nowa's side (such as Figma, product issue P117) or for an account or decision the capture
sessions didn't have (such as a custom domain). `_rewrite/MISSING-MEDIA.md` lists every missing screenshot,
including the ones with no placeholder, with where it goes and what unblocks it.

| id | page | type | what to capture | why it wasn't captured |
|---|---|---|---|---|
| ai-connectors-1 | docs/ai/connectors.md | png | the Figma menu with Connected, Auto-approve tools and Turn off MCP above the chat field (set-up: signed-in project with a Figma account linked, Figma icon clicked in the chat field) | connecting Figma fails on Nowa's side for every account (product issue P117); take it after the fix |
| publish-web-2 | docs/publish/web.md | png | DNS Records page with Pending status, Verify button and the Name/Type/Value table with copy icons (set-up: signed in, paid plan, custom domain set on the live site (throwaway domain), clicked DNS) | needs a custom domain or subdomain the project owner controls (owner's decision); the web publish itself was done |

## Optional: skipped as low value (0)

Possible in the playground, but each page already has a more useful screenshot (the capture runs took at most one
or two per page). Take them only if a page needs more help.

| id | page | type | what to capture |
|---|---|---|---|
