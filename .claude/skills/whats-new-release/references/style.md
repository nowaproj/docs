# How our release notes read

These rules come from the owner's own briefs and from their edits to earlier pages. The 3.16.1 and 3.16.4 pages in `whats-new/` follow them all. When in doubt, copy what those pages do.

## What the owner asked for

- **Simple, clear, warm and natural**, like a person on the team wrote it, not AI.
- **Focus on what the user can do**, with the benefit and the outcome. Not "We have a design mode" but "You can now use Design mode to design your screens right on the board, so ...". Say the action, then why it matters to them.
- **Group technical changes into user benefits.** Many commits that make Nowa AI search, read and save in fewer steps become one point: Nowa AI got faster and uses fewer credits, with the details that matter below it. A change users won't notice doesn't need to be there at all.
- **Only the big things on the What's new page.** Bug fixes and small improvements go in the changelog, and the page links to it at the end.
- **Each version has its own What's new page.**
- **Open with a hook**: a normal sentence that tells the promise of this release and makes people want to read on.
- **Easy to follow from top to bottom**: a clear flow, easy to scan, short enough that people read all of it.
- **Show it when words aren't enough**: annotated screenshots that make the value obvious, and clear, high-quality videos, with zooms where they help. See `visuals.md`.
- **Packaged names only for the top feature**, like **Play-While-Edit** in 3.16.1. Don't name every section. Keep it simple.

## Voice

- **Talk to the reader as "you"**: "you can now...", "click **Run**", "your app".
- **Nowa and Nowa AI do things**: "Nowa AI now gets to the answer in fewer steps", "Nowa outlines it just like on your board". "We" is for the closing line ("We'd love to hear...") and for the rare case where the team made a choice.
- **Plain words, short sentences.** One idea per sentence. Say "faster" and "fewer credits", not "latency" and "token efficiency".
- **Exact names from the product, in bold**: **Details**, **Instant play**, **Run**, **Add account**. Keys in bold too: **V**, **Esc**, **Ctrl/Cmd + 6**. Say where things are: "in the top bar", "at the bottom of the left sidebar", "under **All boards** in **Details**".
- **Prompts in quotes**, written the way a user would type them: ask Nowa AI to "make this button bigger".
- **Results the user sees**: "Every board switches to it", "watch your app update as you type", "the screen updates without losing its state".
- **Benefits as outcomes**, not adjectives: "so you can find the one you want at a glance", "so nothing gets lost in chats or emails".
- **One emoji per heading, at the start.** One at the end of the hook (🚀 has been used). No emoji in bullets.

## Avoid

- Marketing words: excited to announce, thrilled, game-changer, seamless, effortless, powerful, unlock, supercharge, revolutionize, elevate, next level, cutting-edge, robust.
- Patterns that read as AI: "It's not X, it's Y", "No more X. No more Y.", questions as openers, "Here's the thing", "The best part?", em dashes, arrows (→).
- How it works inside, unless users need it: no ARB files, parsers, tool calls, request counts or class names on the What's new page. The changelog can be more precise, but still in terms of what users see.
- Claims you can't back up: "3x faster" without measurements, "for everyone", anything that hasn't shipped.
- Bug fixes and small polish on the What's new page.
- A screenshot or video that only decorates.

## From commits to benefits

What shipped in 3.16.4 (nowaproj/nowa #3752), as the PR titles read:

- #3738 fewer model trips per prompt, explorer locations and faster cloud writes
- #3740 an AI edit on a cloud project waits for one request, not four or more
- #3744 edit and write results give back only what Nowa changed, not the code sent
- #3749 the first read of a file under 30,000 characters returns it whole, ranges or not
- #3750 a search with at most 12 hits returns each hit's member
- #3751 a search hit on a class's own lines returns the class
- #3743 the agent moves and renames files with move_file
- nowa_server #255 Deep Thinking on Gemini 4 Argon, #261 the chat needs 3.16.4

What the page says:

```md
## ⚡ Nowa AI: faster, and lighter on your credits

Nowa AI now gets to the answer in fewer steps. It spends less time looking around your project and more time building, so your changes land sooner and each request uses fewer credits. Here's what changed:

- **Fewer trips back and forth.** Nowa AI reads several files at once and gets small files whole. When a search finds just a few places, it gets the code around each one right away, instead of going back for more.
- **No reading the same code twice.** After an edit, it hears only what Nowa changed, instead of reading the whole file again, and when it explores your project it skips the code it has already seen.
- **Faster saves on cloud projects.** Each edit Nowa AI makes waits for one trip to our servers, instead of four or more.

There's something new it can do, too: ask Nowa AI to move or rename a file or a folder, and every import that points to it follows, in your code and in your tests.
```

What happened:

- Six commits became one headline about what users want: faster answers, fewer credits.
- The details became three plain bullets, each one a reason it's faster. Exact numbers like "12 hits" and "30,000 characters" stayed in the changelog.
- The one thing users can now do that they couldn't before (moving files) got its own sentence.
- There's no "3x faster": early data showed about 30% fewer credits, too little to headline. Say so in the PR, and add a number once there's enough data.

## The What's new page

`whats-new/<YYYY-MM-DD>-<slug>.md`:

```md
---
title: "Nowa 3.16.4: Faster Nowa AI and Multilingual Apps"
sidebar_label: "3.16.4 · Faster AI, multilingual apps"
description: "One or two sentences for search results and link previews: what you can do now."
slug: 3-16-4
date: 2026-10-28
tags: [nowa-ai, design, code]
image: /videos/whats-new/3.16.4-languages.jpg
---

With Nowa 3.16.4, <the promise of the release, in one or two plain sentences>. 🚀

<!-- truncate -->

## <emoji> <What you can do, or the benefit>

<One short paragraph: what you can do now and why it helps.> <How: where to click, what to type, what you see.>

- **<Short bold lead.>** <One or two sentences.>
- **<Short bold lead.>** <One or two sentences.>

<video controls playsInline preload="metadata" width="100%" poster="/videos/whats-new/3.16.4-languages.jpg">
  <source src="/videos/whats-new/3.16.4-languages.mp4" type="video/mp4" />
</video>

## <emoji> <A smaller feature>

<One paragraph is enough. Link the docs page for more, like See [Connect GitHub](/code/github#connect-github).>

---

That's the big stuff! 📋 For every fix and smaller improvement in this release, see the [3.16.4 changelog](/new/change-log#3164-28-october-2026).

➡️ We'd love to hear how <the headline feature> works for you. Click **?** at the bottom of the left sidebar and choose **Support** to message us, or email us at `team@nowa.dev`. Happy building!
```

- **Title**: "Nowa <version>: <the promise in a few words>", in title case. With a packaged name: "Nowa 3.16.1: Introducing Play-While-Edit".
- **sidebar_label**: "<version> · <a few words>", in sentence case.
- **image**: the poster of the first video, or the first screenshot. It shows when someone shares the link.
- **The hook** sits above `<!-- truncate -->`. It's all the What's new list shows before **Read more**, so it has to make people click.
- **Headings** say what you can do or what you get: "Translate your app right on the board", "Bring all your GitHub accounts", "Get feedback right on your app", "Help, right where you look for it", "Nowa AI: faster, and lighter on your credits".
- **Big sections** can have `###` subsections, like "Play your app instantly" and "Fix what you see, while it plays" under Play-While-Edit.
- **Small sections** are one paragraph. A tidy group of small AI changes can be a bullet list under one heading, like "🤖 Nowa AI does more with your credits".
- **Covering skipped versions**: when 3.16.2 and 3.16.3 shipped without docs, their highlights went on the 3.16.4 page, and the closing line linked all three changelog entries: "see the changelog for [3.16.4](...), [3.16.3](...) and [3.16.2](...)."
- **Requirements**: say it plainly when a feature needs something, like "Nowa AI now needs Nowa 3.16.4 or later. If you're on an older version, the chat will ask you to update."

## The changelog entry

At the top of `docs/new/change-log.md`, under the intro, newest first:

```md
## **3.16.4 (28 October 2026)**

📰 See the highlights of this release in [What's new](/new/whats-new/3-16-4).

#### **Added 🌟**
- **<Name of the feature>**: <what you can do with it, precisely: where it is, what to click, shortcuts, limits>.

#### **Improved ⚙️**
- **<Area>**: <what's better, in terms of what you see. Numbers are welcome here when they're true>.

#### **Fixed 🩹**
- Fixed **<the thing>** <doing what users saw go wrong>. <What happens now, if it helps.>

---
```

- The heading gives the anchor that pages link to: `## **3.16.4 (28 October 2026)**` becomes `#3164-28-october-2026`.
- Leave out an empty section.
- Only user-facing changes. No internal ports, refactors, test or CI changes.
- One bullet per change users can notice. Group tiny related ones into one bullet with a bold area name, like **Dashboard** or **Instant play**.
- A fix describes the symptom the user saw, not the cause: "Fixed **screens that fade in** staying invisible on the board until you pointed at them."
- Code names are fine when users write them in their code, like `async*` or `CustomPaint`. Put them in backticks.
