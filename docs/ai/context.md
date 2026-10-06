---
title: Give Nowa AI context
description: Point Nowa AI at the right part of your app by selecting a widget, attaching screens, images and files, or mentioning a screen with @.
sidebar_label: Context
keywords: [attach, attachment, context, add context, mention, "@", select widget, attach image, attach text file, screenshot, reference image, selection, from your app]
---

Nowa AI makes better changes when it knows exactly what you mean. Select a widget on the board, attach a screen or an image, or mention a screen by name with `@`, and the change lands in the right place.

## Select what you want to change

Click a screen or widget on the board. A chip with its name appears above the chat field, and your next message goes to Nowa AI together with that part of your app.

- A component instance attaches the component itself, so Nowa AI can change it. A plain widget, such as a text or a button, attaches just that widget.
- If you select several widgets, Nowa AI gets the first one.
- With nothing selected, Nowa AI gets the screen or component that is open in the code editor.
- Hover a chip to highlight its widget on the board. Click **×** on the chip to remove it. A removed selection stays removed until you select something else.

## Add context

1. Click **+** (**Add context**) in the chat field. A search palette opens with the hint "Search screens, components, files…".
2. Pick what to add:
   - **Attach image** opens a file picker. You can choose several images.
   - **Attach text file** opens a file picker for a text file.
   - A screen, component or class under **From your app**.
3. The attachment appears as a chip above your message. Click **×** to remove one, or **Remove all attachments** to clear them all.

{/* CAPTURE: id=ai-context-1 | state: playground starter open, Assistant panel open, + (Add context) clicked | show: the Add context palette with the search field, the UPLOAD section (Attach image, Attach text file) and the FROM YOUR APP list | crop: left panel + palette */}

In the **From your app** list, a check mark means the item is already attached, a lock means it is read-only, and **included** means Nowa already sends it as a related declaration, in short form.

You can also paste an image into the chat field with <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>, or drag an image file onto it.

A few limits to know:

- You can attach up to 5 images to one message.
- A text file must contain readable text. Other files are skipped.
- Nowa keeps chat images only while the session is live. If you reopen a session and want Nowa AI to save an image to your assets, attach it again.

## Mention a screen with @

1. Type `@` in the chat field, then part of a name.
2. Pick from the list with <kbd>↑</kbd>, <kbd>↓</kbd> and <kbd>Enter</kbd>, or click an entry. Press <kbd>Esc</kbd> to close the list.

The list shows what you have already attached and every screen, component and class in your project. A mention appears highlighted in your message and counts as an attachment for it. In a message you've sent, click the mention to open its file.

{/* CAPTURE: id=ai-context-2 | state: playground starter open, Assistant panel open, "@" typed in the chat field | show: the mention suggestion list above the chat field | crop: chat field + list */}

## What Nowa AI receives

Along with your words, each request carries:

- Your selection, attachments and mentions.
- The code those attachments depend on, in short form.
- Your Custom Instructions. See [Write prompts that work](prompting.md#custom-instructions).
- A map of your project: the name of every widget and an outline of every public declaration. That is how Nowa AI finds things you didn't attach.

## What to attach when

| You want to | Attach |
|---|---|
| Change one widget | Nothing. Select it on the board. |
| Change a whole screen or component | Select it, or add it from **From your app** or with `@`. |
| Build something like an existing screen | That screen. |
| Match a design, sketch or screenshot | An image. Nowa AI uses it as a reference. |
| Put a logo or photo in your app | An image, and say it should appear in the app, so Nowa AI saves it to your assets. |
| Use copy, data or notes you already wrote | A text file. |

:::tip
Attach less, not more. Nowa AI can look around your project on its own, so one focused attachment, such as a single widget or screen, keeps its changes accurate.
:::

## Next steps

- [Write prompts that work](prompting.md)
- [Chat with Nowa AI](chat.md)
