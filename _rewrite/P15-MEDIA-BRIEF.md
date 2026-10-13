# Phase 15 brief: bring back the old docs' images and videos that are still valid

Read this whole file first. You are one of 11 media agents. Each agent owns one batch of old-docs media items and the
new pages listed for it at the end.

## Why: the user's request (verbatim, condensed)

> For the parts that were explained in the older documents, things like images are missing. For example, for Apple or
> deployment to iOS, there were images or videos showing the process from the Apple console and from the other Apple
> side. If any useful content exists in the older docs and it's still valid, add it to the new docs as well. So any
> kind of video or image, for example when viewers see how to deploy their app on the App Store.

Phase 14 brought back the old docs' still-valid *text*. This pass does the same for their *images, videos and YouTube
embeds*. Of 343 media items on the old pages (`git -C /home/user/docs show fba731b:<old page>`), the new docs use 6.
Most old Nowa screenshots show an older Nowa and are outdated now. But many items show screens outside Nowa (Apple
Developer, App Store Connect, Google Play Console, GitHub, Firebase console, Supabase dashboard, Stripe, Postman,
Swagger...), and some show Nowa screens that still look the same in 3.13. Those are what readers miss.

## Your inputs

- `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/media/batch-<ID>.tsv`: one row per item.
  Columns: `id`, `old_page`, `heading` (the old page's heading above it), `alt` (old alt text), `ref` (how the old page
  referenced it), `kind` (image, video, youtube), `file` (the file on disk), `file_status` (`in repo`: the file is
  still in `static/` and served live; `old commit only`: it was deleted, the copy is in the scratchpad), `preview` (for
  videos: a sheet of 8 frames spread over the video, left to right, top to bottom; for YouTube: the thumbnail),
  `duration_s`, `yt_title`.
- Look at every preview and every image with the Read tool. For a video whose frames leave doubt, extract more:
  `ffmpeg -v error -ss <sec> -i <file> -frames:v 1 -vf scale=900:-1 <scratchpad>/media/frames/<id>-<sec>.jpg`.
- The old page text around each item, for what it was meant to show.
- **What Nowa 3.13 looks like:** the current screenshots and videos in `/home/user/docs/static/img/docs/**` and
  `/home/user/docs/static/videos/docs/**` (index: `_rewrite/captures/log.md`), and the product code at
  `/home/user/nowa-master` (3.13.0, `3cb32031c`; grep the labels you see in the old image).
- **What the third-party sites look like today:** the new pages' steps were checked against the providers' current
  help pages in phase 14 (links are on the pages). Use WebFetch or WebSearch (load them with ToolSearch) when you need
  to confirm a console screen or flow is still the same.

## Decide each item

Give every item exactly one verdict:

| Verdict | When |
|---|---|
| **ADD** | Still valid, useful, and the new page doesn't already show the same thing. Add it (see below). |
| **COVERED** | The new page already shows the same step with a current screenshot or video. Name it. |
| **OUTDATED** | It shows a Nowa screen that changed in 3.13 (different labels, panels, dialogs, layout or flow), a removed feature, or a third-party screen that changed so much a reader would get lost. Say what differs. |
| **NOT USEFUL** | Decorative, a duplicate of another item, or it doesn't help the reader do anything. |
| **PRIVACY** | It shows personal data or a secret (see Privacy). Don't add it. Say what and where. |

**Nowa screens: be strict.** Valid only if the labels the reader acts on, the panel and the flow are the same as in 3.13
(compare with a current screenshot of the same area, and grep the labels in the code). Small cosmetic changes (a
colour, an icon, spacing) are fine; a renamed button, a moved panel, a different dialog are not. A video is only valid
if every frame is. If only its start or end is outdated and the rest is a clean, self-contained clip, you may cut it
(`ffmpeg -ss A -to B -i in.mp4 -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an out.mp4`) and save the cut as a
new file under `static/videos/docs/<section>/`. When in doubt, it's OUTDATED.

**Third-party screens: the highest value.** Valid if the flow matches the steps the new page describes and the screens
are still recognisably the same (a visual refresh with the same fields and buttons is fine). These are what the user
asked for: show them next to the step they illustrate, especially where the page has no picture for that step yet.

**YouTube (Nowa's own channel):** add only if the feature and the flow in the video still work the same in 3.13 and
the thumbnail matches the 3.13 editor. Tutorials recorded on an older Nowa (titles like "Nowa 3.4", the water tracker
or to-do series, older editor in the thumbnail) are OUTDATED unless you can show otherwise.

## Adding an item

- **Where:** right after the step or paragraph it illustrates, on the new page that covers that task (your pages are
  listed at the end). One picture or video per step at most; don't stack them, and don't add one where the page already
  shows that step (that's COVERED).
- **Image:** `![alt text](/path)`. **Video:**

  ```
  <video controls playsInline preload="metadata" width="100%">
    <source src="/videos/....mp4" type="video/mp4" />
  </video>
  ```

  **YouTube:**

  ```
  <iframe width="100%" height="400" src="https://www.youtube.com/embed/<id>" title="<video title>" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  ```

- **Alt text:** describe what the image shows and what to notice, in the style of the page's current alt texts
  (for example "The Register an App ID page in Apple Developer: Bundle ID set to Explicit with com.example.myapp
  filled in"). Videos have no alt text: when the step text doesn't already say what the video shows, put one short
  sentence before it ("This short video shows the whole thing in Apple Developer:"). Never put a heading or a long
  caption around media.
- **Text:** don't rewrite the page. If the media shows something the text doesn't say (or says differently), the text
  wins: check which is right in the code or the provider's docs, and drop the media if it contradicts a correct step.
  Any words you add follow `_rewrite/P14-BRIEF.md` (R1 meaning not code, R4 explain jargon, R9 warm, no filler) and
  `_rewrite/style-guide.md`.
- **Files:** `in repo` → reference the file at its current path (`/videos/...`, `/img/...`); don't move it.
  `old commit only` → copy the scratchpad file into `static/` first: a `ref` starting with `/` goes to `static<ref>`; a
  `docs-rel:docs/<folder>/img/<name>` ref goes to `static/img/<folder>/<name>` (for example
  `static/img/deployment/add-app-ios.gif`). Check you don't overwrite a different file.
- **Videos must pass** `node scripts/check-videos.mjs` (from `/home/user/docs`): MP4 with H.264, `+faststart`, one
  `<source>`, `controls playsInline preload="metadata"`. If a reused file fails, re-encode it in place with
  `ffmpeg -i in.mp4 -c:v libx264 -pix_fmt yuv420p -profile:v high -movflags +faststart -an out.mp4` and replace it.
  GIFs are images (`![alt](/img/....gif)`).

## Privacy (the docs repo is public)

Look at every image and every frame you add. Never add one that shows, readable: a personal email address, a person's
name or username (other than "Nowa"), an avatar photo, a password, an API key or token value, a private key, a
webhook secret, or a Supabase project ref or key. Nowa's own company name, its app names and bundle IDs like
`com.nowa.*` are fine. An Apple **Team ID**, **Key ID** or **Issuer ID** that is readable: report it as PRIVACY and
don't add it (the orchestrator decides). Blurred or cropped-out values are fine.

## Rules

- Edit only your own pages. An item that belongs on another batch's page or on a page nobody owns: decide it anyway,
  write its exact placement (page, after which line, alt text or lead-in) under **Routed** in your report; the
  orchestrator adds it.
- Don't touch `docs/legacy/`, `docs/new/`, `sidebars.js` or `redirects.js`.
- Never commit or push; the orchestrator does.
- Before you finish, run from `/home/user/docs`: `node scripts/check-videos.mjs` and
  `python3 -I _rewrite/tools/site-checks.py` (both must pass for your pages). Don't run `yarn build`; the orchestrator
  builds once at the end.

## Your report

Write `_rewrite/reviews/P15-<ID>-media.md`:

1. A table with one row per item: `id | old page | what it shows (one line) | verdict | why (one line) | where added
   (page:line) or the new image that covers it`.
2. **Added:** count, plus every file you copied, cut or re-encoded.
3. **Routed:** items for other pages, with exact placement.
4. **Open questions:** anything you couldn't decide.

End your final message with the counts per verdict.

## Batches and the pages each one owns

| ID | Old media | Pages you may edit |
|---|---|---|
| M01 | Publishing (iOS, Android, web, share) | `docs/publish/*`, `docs/test/share.md` |
| M02 | Git and GitHub | `docs/code/git.md`, `docs/code/github.md`, `docs/code/import.md` |
| M03 | Desktop app, local projects, devices | `docs/get-started/desktop-app.md`, `docs/get-started/cloud-and-local.md`, `docs/code/local-projects.md`, `docs/code/vs-code.md`, `docs/test/{index,devices,run,instant-play,problems}.md` |
| M04 | Getting started and editor basics | `docs/get-started/{welcome,create-account,editor-tour,first-app,mobile,playground}.md`, `docs/design/{index,boards,screens,components,assets,outline,templates,add-widgets,select-and-edit,library}.md`, `docs/account/projects.md` |
| M05 | Widgets | `docs/reference/widgets/*` |
| M06 | Design: themes, wrappers, layout | `docs/design/{themes,theme-styles,fonts-icons,layout,properties,responsive,localization}.md`, `docs/reference/wrappers.md` |
| M07 | Supabase | `docs/integrations/supabase/*` |
| M08 | REST API | `docs/integrations/rest-api/*`, `docs/integrations/show-data.md` |
| M09 | Firebase, Stripe, Nowa AI | `docs/integrations/firebase/*`, `docs/integrations/stripe.md`, `docs/ai/*` |
| M10 | Logic: Circuit, popups, common functions, control flow | `docs/logic/{index,circuit,conditions,actions,events,navigation,popups,router,expressions}.md` |
| M11 | Variables, params, functions, data models, global state | `docs/logic/{variables,parameters,functions,global-state,models}.md` |
