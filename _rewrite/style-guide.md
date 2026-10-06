# Nowa docs style guide

The goal of every page: the reader gets the value with the least effort, and trusts what they read.
Tone: **simple, clear, confident, concise, a little exciting.**

## Voice

1. **Lead with the payoff.** The first sentence says what the reader can do and why it's worth it.
   "Instant Play runs any screen right on the board, so you can tap through it without leaving the editor."
2. **Talk to the reader.** Second person, present tense, active voice. "Click **Run**." Not "The user
   should click on the Run button."
3. **Short sentences, one idea each.** Paragraphs are 1-3 sentences.
4. **Confident, not hyped.** State facts plainly. No "simply", "just", "easily", "seamlessly",
   "powerful", "revolutionary", "in order to", "please note", "it is important to note".
   A little excitement is welcome in intros ("That's it, your screen is live.") but never at the cost of facts.
5. **Plain words first, Flutter words second.** Say what it does, then the Flutter name if it helps:
   "A **Row** lines widgets up side by side." Explain a Flutter concept only as far as the reader needs it.
6. **No emojis** in docs pages (What's New keeps its own style).
7. **Never invent.** Every label, step, limit and behavior must come from the code (see BRIEF.md). If you are
   unsure, leave it out and log it in your notes file as an open question.
8. **No prices, credit amounts or plan limits** (D3). Link to [pricing](https://nowa.dev/pricing) instead.

## Words we use

Use the product's own terms exactly as the UI shows them, with the same capitalization, and use them the
same way on every page. The glossary in `_rewrite/glossary.md` is the reference (filled from research). When
the UI label is a button or menu item, write it in **bold**: click **New Screen**.

## Page anatomy

Front matter on every page:

```yaml
---
title: Create screens            # sentence case; tasks start with a verb
description: One sentence for search results and link previews.
sidebar_label: Screens           # optional, short
keywords: [screen, page, route]  # optional, words people search for
---
```

Then, in order (skip what doesn't apply):

1. **Intro** (1-3 sentences): what this is and why it's great. No heading above it. No "In this guide we will".
2. **Badges** right after the intro if the feature is gated: `<Badge type="enterprise" />` (see below).
3. **Before you start** (optional): bullet list of prerequisites, linked.
4. **Task sections**: `## Verb + object` ("## Add a screen"). Numbered steps, one action per step, starting
   with a verb. Put the result in the same step when short: "Click **Create**. The new screen opens on the board."
5. **Options / reference tables** where a feature has several settings: `| Setting | What it does |`.
6. **Tips and caveats** as admonitions, max two per page, never stacked:
   `:::tip`, `:::note`, `:::warning` (use `:::warning` only for data loss, costs, or irreversible actions).
7. **Next steps** (optional, last): 2-4 links to where readers usually go next.

Page types:
- **Overview** (section landing): 2-4 sentence intro + a short list or cards of what's in the section.
- **Concept**: what it is, how it works, key terms, where to go next. Short.
- **How-to**: the anatomy above. Most pages are how-tos.
- **Reference**: tables (widgets, shortcuts, actions, settings). Minimal prose.
- **Troubleshooting**: `## Symptom` headings, cause, fix.

Length: aim for 300-900 words. If a page grows past ~1,200 words, split it.

## Formatting

- Headings: sentence case. H1 comes from `title`; don't repeat it in the body. Use H2 and H3 only.
- UI labels in **bold**, exactly as in the UI. Menu paths with arrows: **Settings** → **Account Details**.
- Keys with `<kbd>`: <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>. Give both Windows/Linux and macOS when they differ.
- Code, file names, package names in `code`: `pubspec.yaml`, `assets/images/`.
- Links: relative links to the `.md`/`.mdx` file (`../design/screens.md`), so Docusaurus checks them at build time.
  External links: full URLs.
- Tables for 3+ parallel items with 2+ attributes; bullets otherwise.
- No horizontal rules (`---`) between sections in pages.

## Badges

Use the global `<Badge>` component (no import needed) right after the intro, or inline after a heading:

| Code | Shows | When |
|---|---|---|
| `<Badge type="beta" />` | Beta | the code marks the feature beta/experimental and it is still visible to users |
| `<Badge type="enterprise" />` | Enterprise | the code restricts it to Enterprise |
| `<Badge type="paid" />` | Paid plans | the code restricts it to paid plans (name the plan in text only as the code names it) |
| `<Badge type="desktop" />` | Desktop app | only in the desktop app |
| `<Badge type="web" />` | Web app | only in the web app |
| `<Badge type="local" />` | Local projects | only for local projects |
| `<Badge type="cloud" />` | Cloud projects | only for cloud projects |

## Screenshots and videos

Add an image only when it saves the reader real effort: finding a control in a busy UI, recognizing a dialog,
or seeing a result. Not every step. Typical: one image per how-to page, two at most, plus one short video
(≤20 s, no audio needed) for drag-and-drop or multi-step motion.

While writing, insert a **capture placeholder** where the image should go, and add a matching request to
`_rewrite/captures/requests/<section>.md`:

```mdx
{/* CAPTURE: id=design-screens-1 | state: playground starter open, Screens panel open | show: the + button and New Screen dialog | crop: left panel + dialog */}
```

Images live in `static/img/docs/<section>/<id>.png` and are embedded as
`![What the image shows, in plain words](/img/docs/<section>/<id>.png)`. Videos follow README.md "Adding videos".
Existing images/videos from the old docs may be reused only if they still match the current UI.

## Accuracy notes (for writers)

Keep a notes file per section (`_rewrite/reviews/<section>-writer-notes.md`): for every page, the code refs you
relied on and any claim you weren't sure about. Verifiers use it.
