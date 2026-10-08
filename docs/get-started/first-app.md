---
title: Build your first app
description: "Go from one sentence to a running app in about 15 minutes: describe your idea, watch Nowa AI build it, change it by hand, and run it."
sidebar_label: Build your first app
keywords: [quickstart, first app, tutorial, get started, prompt to app, build with AI, Design mode, Make it real, Instant Play, Run, New Cloud Project]
---

You describe an app in plain words, Nowa AI builds it on your board, and you finish with a real app running in your browser. This walkthrough takes about 15 minutes, and most of that is Nowa AI working while you watch.

## Before you start

- A Nowa account. [Create one](./create-account.md) if you don't have one yet.
- A browser window at least 840 px wide. Narrower windows get the [phone layout](./mobile.md) instead of the full editor.
- Some Nowa AI usage. Every prompt uses your plan's AI allowance. See [Plans, billing and AI usage](../account/plans-and-usage.md).

## 1. Describe your app

1. Open [app.nowa.dev](https://app.nowa.dev) and sign in. The dashboard opens with the question **What do you want to build?** A new account answers a short survey first.
2. Type your idea in the box. For example:

   > A habit tracker. The home screen lists today's habits with a checkbox for each one. Another screen adds a new habit.

   Or click one of the examples under **Or try an example prompt**. It fills the box with a full prompt you can edit. The refresh button shows more examples.
3. Check the mode chip at the bottom left of the box. It says **Design**, which the chip's menu marks **Start here**. Keep it: Design builds the look and flow of your app first, with demo data, so you can see and change it before anything is wired up. [Modes](../ai/modes.md) explains **Plan** and **Agent**.
4. Check the thinking level chip next to it. Keep it on **Thinking**, or pick **Deep Thinking** for a big, complex app.
5. Click the send button at the bottom right of the box (tooltip **Build it**).

{/* CAPTURE: id=get-started-first-app-1 | state: signed-in dashboard, prompt box with a short prompt typed and the mode menu open | show: the What do you want to build? box, the mode menu (Design with Start here, Plan, Agent), the thinking chip, the send button and the example chips | crop: prompt panel only */}

**You should see:** a loading screen that says "Setting things up…", then "Naming your app…" and "Creating your project…". Then the editor opens with your prompt in the **AI Assistant** panel and Nowa AI already working on it.

If **Welcome to Nowa!** appears over the editor, click **Take the quick tour** for a short guided tour, or **Close**. The [editor tour](./editor-tour.md) covers the same ground.

## 2. Watch Nowa AI build it

The **AI Assistant** panel on the left shows each step as it happens. New screens appear on the board in the middle as they are designed.

- If a **Questions** card appears, pick an answer for each question, then click **Send Answers**.
- To stop, click the red stop button at the bottom right of the chat (tooltip **Abort**). Changes made before you stop stay.
- You don't need to save. Nowa saves your project when each run ends.

**You should see:** one or more screens on the board and, at the end of the chat, a card titled **Your app design is complete**.

## 3. Change something by hand

1. Click a widget on a screen, such as a heading or a button. The **Details** panel on the right shows its properties. If it is hard to click, pick it in the **Outline** panel instead (sidebar → **Outline**).
2. Change a property. For a text, edit **Text** in **Details**, or double-click the text on the board and type. Colors, sizes and spacing have their own fields in **Details**.
3. Don't like it? Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> to undo.

If you can't see **Details**, make the window wider or close the left panel. Nowa hides **Details** when the board area is narrower than 600 px.

:::tip Or ask Nowa AI
Select a widget, then type in the chat: "Make this button orange with rounded corners." The widget you select is attached to your message automatically.
:::

**You should see:** the widget on the board change as you edit it.

## 4. Play a screen

1. Point at a screen's title above it on the board. Two buttons appear: **Play** and **Open in new tab**.
2. Click **Play**. The board zooms to the screen and runs it in place. Click, scroll and type as a user would. Scrolling over the screen scrolls the app, not the board.
3. Click **Stop** in the bar at the bottom of the board when you're done. Select another screen to play that one instead.

**You should see:** the screen reacting to your clicks, and a bar at the bottom of the board that says "This screen is capturing scroll".

**Play** is instant but approximate. The warning icon in the bar says "In board preview is not 100% accurate, run the app to see the real output". You run the real app in step 6.

## 5. Make it real

Design mode builds every screen with demo data, so the app doesn't save anything yet. **Make it real** hands your design to **Agent** mode, which makes the features work, starting with the one you pick. To keep data in a database and let people sign in, connect a backend: see [Connect data and services](../integrations/index.md).

1. On the **Your app design is complete** card, pick the feature you want first under **Pick what to make work first:**, or click **Make it real** and let Nowa AI choose. To change the design first, type what you want in the chat instead.
2. Watch the steps in the chat.

{/* CAPTURE: id=get-started-first-app-2 | state: project after a finished Design-mode run (needs an AI prompt) | show: the board with two or more screens and the chat with the Your app design is complete card and the Make it real button | crop: whole editor window */}

**You should see:** **Switched to Agent mode** on the card, then new steps as Nowa AI starts making the features work.

If you picked **Agent** on the dashboard, skip this step: Agent mode builds features as it goes.

To undo what Nowa AI did, hover the dotted line above its reply, click **Restore Checkpoint**, and confirm. That also undoes the later requests in the same session. See [Undo AI changes](../ai/undo-and-history.md).

## 6. Run the real app

1. Click **Run** at the right of the top bar.
2. Wait while Nowa starts your app. The first start can take a few minutes.
3. Use the app in the phone frame. To change something, click **Back to board**, edit, and save. The preview restarts with your changes.
4. To try it on your phone, click **Open on Mobile** (the QR icon in the top bar) and scan the code.

**You should see:** your app running for real in a phone frame inside the editor.

If an error screen offers **Fix with AI**, click it. Nowa AI gets the error and tries to fix it.

## 7. Save and share

- **Save:** Nowa saves as you go. **Auto save** is on by default, and every Nowa AI run ends with a save. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd> to save right away and you see **Saved!**
- **Share a screen:** play it (step 4), click **Share preview** in the bar at the bottom of the board, and choose **Private** (people with access to the project) or **Public** (anyone with the link). Then copy the link or show the QR code. Viewers get an interactive preview in any browser.
- **Come back later:** click the Nowa logo at the top left to return to the dashboard. Your project is listed under **Projects** and in the **RECENTS** list in the sidebar.

:::warning
**Public** makes the whole project public. Anyone with the link can read every file and save their own copy, including any API keys inside it. Nowa asks you to confirm first.
:::

## Next steps

- [Build a complete app](../guides/complete-app.md): follow one app from idea to published.
- [How logic works](../logic/index.md): make your app react to taps, remember values and move between screens.
- [Connect data and services](../integrations/index.md): save data in a database and add sign-in.
- [Get ready to publish](../publish/index.md): put your app on the web, Android and iOS.
