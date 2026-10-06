---
title: Undo AI changes and reopen chats
description: Take your project back to before an AI request with a checkpoint, start a fresh session, and reopen any past chat.
sidebar_label: Undo and history
keywords: [restore checkpoint, reapply checkpoint, replay checkpoint, undo AI, revert AI changes, new session, new chat, chat history, all sessions, session limit reached, long session]
---

Every time Nowa AI changes your files, Nowa saves a checkpoint. Restore it to take your project back to how it was before that request, and reapply it if you change your mind.

## Restore a checkpoint

:::warning
Restoring a checkpoint also undoes every later request in the same session. It puts each file the AI touched back to its earlier version, so edits you made yourself to those files after the request are lost. **Reapply Checkpoint** brings back only the AI's version of them.
:::

1. Find the AI reply that made the changes you want to undo. Above it is a bookmark icon and a dotted line.
2. Hover the dotted line. The **Restore Checkpoint** button appears.
3. Click **Restore Checkpoint**. The **Undo Last Request?** dialog lists the files that request changed.
4. Click **Continue**. Click **Cancel** to leave everything as it is.

{/* CAPTURE: id=ai-undo-1 | state: signed-in project with a finished Agent run that changed files, pointer hovering the dotted line above the reply | show: the bookmark icon, the dotted line and the Restore Checkpoint button | crop: Assistant panel, conversation area */}

{/* CAPTURE: id=ai-undo-2 | state: same project, Restore Checkpoint clicked | show: the Undo Last Request? dialog with the file list, Cancel and Continue | crop: dialog */}

Your project goes back to how it was before that request, and files the request created are deleted. The messages stay in the conversation.

## Reapply a checkpoint

After a restore, the same line shows a redo icon.

1. Hover the line.
2. Click **Reapply Checkpoint**. Your project goes back to how it was right after that request.

Requests after the one you reapply stay undone until you reapply them too. To bring everything back, reapply the last request.

A few rules apply to checkpoints:

- A checkpoint exists only for replies that changed files, and only for changes Nowa AI made.
- The buttons are disabled while Nowa AI is working.
- Checkpoints are saved with your project, in its `.nowa/temp/` folder, which Git ignores.
- They aren't available in the [playground](../get-started/playground.md), which has no account.

## Start a new session

A new session starts with a clean conversation in the same project. Nowa AI still sees your project. It only forgets the earlier chat, which helps when you move on to an unrelated task.

1. Click **+** in the panel header. Its tooltip is **New Session**.
2. The conversation clears. Your project doesn't change, and the old conversation stays in **Chat History**.

The button is disabled while Nowa AI is working, and does nothing on an empty chat.

Nowa also nudges you. When a session gets long, a note appears above the chat field: "This session is getting long. For better results, start a new session and continue there." Click the **Start new session** icon, or the **Dismiss** icon to keep going.

If the conversation fills up completely, the chat shows **Session Limit Reached**. Nowa AI can't take more messages in that session, so click the **Start new session** icon to continue building.

## Reopen a past chat

1. Click **⋮** (**Options**) in the panel header, then **Chat History**. The **All Sessions** list opens.
2. Click a session. Nowa loads it, and the chat shows "Please wait a minute while we load this conversation..." meanwhile.
3. Keep chatting from where it ended.

Each row shows the session's name and when it was last active, such as "Just now", "Yesterday" or "3 days ago". A session that has no name yet shows **New Chat**. Click **Load More** to show more sessions, 25 at a time. Click the back arrow to return to your current chat.

History belongs to the project, and Nowa stores it on its servers. You can't open a session while Nowa AI is working. When you reopen a session, its checkpoints show again where the project still holds them.

## Next steps

- [Chat with Nowa AI](chat.md)
- [Write prompts that work](prompting.md)
