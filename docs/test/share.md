---
title: Share your app
description: Send a link or QR code so anyone can try your app in a browser, or open your whole project to others.
sidebar_label: Share
keywords: [share, share preview, preview link, qr code, public project, public link, private, instant preview share, share app, link options, send app to client, feedback]
---

Send a link, and anyone can try your app in their browser, with nothing to build, publish or install. You can share a preview of the app, or open the whole project so others can look inside and keep their own copy.

## Choose how to share

| | Share preview | Public project link |
|---|---|---|
| What people get | A preview they can tap through but not edit. | Your project opened in Nowa. They edit their own copy. |
| Where you set it up | **Share preview** in the controls shown while an item plays. | **Settings** → **Project Details** → **Sharing**. |
| Who can open it | **Private**: project members. **Public**: anyone with the link. | Anyone with the link. |
| Projects | Cloud projects only. | Cloud projects only. |

Both options use the same switch. **Public** in **Share preview** and **Public project** in **Sharing** control one setting of your project.

:::warning
**Public** makes your whole project public, not only the preview. Anyone with the link can read every file and save their own copy. Keys, tokens and other secrets stored in your project, such as values in **Constants**, become readable too. Nowa asks you to confirm before it switches on.

Choosing **Private** again turns the project back to private, and the project link stops working too.
:::

## Share a preview

The preview is [Instant Play](instant-play.md) in a browser tab: quick, but not the compiled app.

1. Play a screen on the board. Hover its name above the screen and click the play button.
2. In the controls at the bottom of the board, click **Share preview**. The **Share Preview** popup opens.
3. Pick who can open the link. **Public** means "Anyone with the link can view the preview." **Private** means "Only members that have access to the project". Only project owners and editors see this choice, and it shows the project's current setting.
4. If you pick **Public**, Nowa asks "Make this project public?". Read the warning, tick "I checked, there are no secrets in this project", and click **Make public**.
5. Copy the link with the copy button. Or click the QR code button (**Qr code**) to show a code to scan, or **Open in browser** to see what others will see.

{/* CAPTURE: id=test-share-1 | state: signed-in cloud project open, a screen playing on the board, Share preview clicked, QR code button clicked | show: the Share Preview popup with the Public and Private options, the link field with its three buttons, and the QR code card | crop: bottom of the board with the popup and the QR card */}

The link looks like `https://app.nowa.dev/preview/<project>`. If you shared from a played screen, it ends with `?screen=` and that screen's file, so the preview opens on that screen.

To share the whole app, delete the `?screen=…` part of the link. A single-screen link is meant for reviewing one screen. Nowa's own warning says "Route-based navigation is disabled in Play Mode for single screen previews. To test navigation, you need to preview the full app."

The link doesn't change when you edit your app. People see your project as last saved each time they open it.

In a local project, **Share preview** says "Share preview is not available on local projects". Click **Sync to cloud** to copy the project to the cloud first. See [Work with local projects](../code/local-projects.md).

## What people see in a preview

On a computer, the app opens in a phone frame (an iPhone 13 at first) with a toolbar at the top.

| Button | What it does |
|---|---|
| **Share App** | Opens the same link and QR code. |
| **Full Screen** | Shows the preview full screen. |
| **Device Settings** | Opens **Play Settings**. |
| **Restart** | Restarts the preview. Only owners and editors see it. |

In **Play Settings**, viewers can turn **Free Size** and **Show mockup frame** on or off and rotate the device with **Orientation** (for devices that rotate). **Device Size** lists devices by platform and has a **Custom** tab with **Width**, **Height** and **Pixel ratio**. Nowa remembers these choices per project in the viewer's browser.

On a phone or in a narrow window, the app fills the screen. A floating button opens **Stop**, **Restart** and **Share preview**.

Owners and editors also get a warning button (**Show Play Warnings**) that lists what the preview can't show, such as "Custom code can't be shown" or "Dynamic packages can't be shown".

People who can't open a private preview see **Preview Not Available** with a **Sign In** button.

## Open your project to others

1. Click the gear in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>, then click **Project Details**.
2. Scroll to **Sharing** and turn on **Public project**.
3. Confirm "Make this project public?" as described above.
4. Click **Copy link**, or **Open in a new tab** to try it yourself.

{/* CAPTURE: id=test-share-2 | state: signed-in cloud project, Settings open on Project Details, scrolled to Sharing with Public project on, Link options popup open | show: the Cover field, the Public project switch with the link and its buttons (Copy link, Open in a new tab, Link options), and the four link options | crop: Settings page, Sharing section */}

Visitors can open the link without an account. Nowa opens your project in a private copy in their browser, so "your project is never changed by a visitor". They can explore, play and edit. Their edits are lost when they close the tab, unless they click **Save to keep changes**, which copies the project into their own account. **Run** and **Deploy** aren't available to them. See [Try Nowa without an account](../get-started/playground.md).

### Set how the link opens

Click **Link options** to choose what visitors see first. Nowa adds your choices to the link.

| Option | What it does |
|---|---|
| **Code mode** | Opens the project in code mode. |
| **Preview** | Shows the Instant Play preview next to the code. Needs **Code mode**. |
| **Assistant** | Opens the **AI Assistant** panel. |
| **Opened file** | Picks the file that opens first. Click it and search for a file, or choose **Default**. |

### Choose the project cover

The **Cover** is the image shown wherever your project is listed. Nowa takes it from your board on every save. To use your own image, click the cover preview. Click **Use my board** to go back to the automatic one.

## Next steps

- [Play your app on the board](instant-play.md): the preview you share.
- [Run your app](run.md): check the real app before you send a link.
- [Get ready to publish](../publish/index.md): put your app online or in the stores.
