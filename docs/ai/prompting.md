---
title: Write prompts that work
description: Practical ways to ask Nowa AI for what you want, with example prompts by task and Custom Instructions for rules you want every time.
sidebar_label: Prompting
keywords: [prompt, prompts, prompt tips, example prompts, custom instructions, prompting guide, vibe coding, ask AI, what to type, system prompt, rules]
---

Clear prompts get you closer to your app on the first try. Describe what people will see and do, ask for one job at a time, and use modes and context to steer.

## Start with what Nowa suggests

Nowa gives you hints in several places.

- **The chat field** changes its hint with the mode: "Describe the app you want to build..." in **Design**, "What would you like to plan?" in **Plan** and "Build something wild..." in **Agent**.
- **Starter chips** in an empty **Plan** or **Agent** chat fill in a full prompt you can edit. See [Chat with Nowa AI](chat.md#start-from-a-suggestion).
- **The dashboard** box **What do you want to build?** shows ideas such as "A habit tracker with streaks and reminders..." and "A booking app for my salon...". Under **Or try an example prompt**, chips such as **Habit Streak Tracker** and **Split the Bill** fill the box with a full prompt, and the refresh button shows other examples.
- **The quick tour** step **AI Agent** says: "Use the AI agent to build, edit, or fix anything. Select a screen or widget from the board to attach as context, or use the attach button to include any part of your project or upload an image."

Click **Habit Streak Tracker** and Nowa fills the box with this prompt:

> A habit tracking app where users build daily routines and watch their streaks grow. Each habit should have a custom color, icon, target frequency, and reminder time, with a heatmap calendar showing consistency over months. Include a weekly summary screen with completion rates, longest streaks, and gentle nudges when a streak is about to break.

It says what the app is for, what it keeps track of, and which screens it needs. That is a good shape for a first prompt.

## Tips that help

- **Describe what people see and do.** "Clients pick a stylist, a service and a time slot" works better than "add a booking form". You don't need Flutter words.
- **Start wide in Design, then go narrow.** Describe the whole app once in **Design** mode. After that, ask for one screen or one feature at a time.
- **Ask for one job at a time.** "Add a search bar to the product list screen" is easier to review, and to undo, than "Build me a full shopping app with everything".
- **Be specific about looks.** "A dark theme with high-contrast text" works better than "make it nice".
- **Point at the part you mean.** Select it on the board or attach it. See [Give Nowa AI context](context.md).
- **Say what it is for.** Who uses the screen and how they move through it helps Nowa AI make fewer guesses.
- **Plan big or unclear work first.** Use **Plan** mode and answer its questions. A choice marked **(Recommended)** is Nowa AI's suggestion, and **Other...** lets you type your own answer. See [Design, Plan and Agent modes](modes.md).
- **Start a new session for a new topic.** Old context can carry over, so begin a new session when you move to an unrelated feature. See [Undo AI changes and reopen chats](undo-and-history.md#start-a-new-session).
- **Check each result.** Look at the board or [play the screen](../test/instant-play.md), then ask for the next change.

When a request has several parts, this order keeps it clear:

```text
Goal: I'm building a booking app for my salon.
Details: Clients pick a stylist, a service and a free time slot.
Task: Design the booking screen.
Rules: Use my theme colors. Keep it to one screen.
```

## Example prompts by task

| Task | Mode | Prompt |
|---|---|---|
| Start an app | **Design** | A booking app for my salon. Clients pick a stylist, a service and a free time slot. The home screen shows their upcoming bookings. |
| Add a screen | **Design** or **Agent** | Add a profile screen with the user's photo, name and email, and a button to log out. |
| Change one widget | Select it on the board | Make this button full width, with rounded corners and the primary color. |
| Restyle the app | **Design** | Make the whole app feel calmer: softer colors, more spacing and rounded cards. |
| Add behavior | **Agent** | When I tap Save, show a message that says "Saved". |
| Fix a problem | **Agent** | The checkout screen shows an error. Find the cause and fix it. |
| Use an API | **Agent** | Show the products from this API on the home screen: `curl -X GET 'https://api.example.com/products' -H 'accept: application/json'` |
| Use an image | **Agent**, image attached | Use the attached image as the logo on the first screen. |
| Set a font | **Agent** | Use the Poppins font for all headings. |
| Plan a feature | **Plan** | Plan a Favorites feature: users save recipes and see them on a Favorites screen. |
| Build a backend | **Agent**, Supabase connector on | Create a tasks table where each person sees only their own tasks, then list them on the home screen. |
| Use a Figma design | **Agent**, Figma connector on | Bring the icons from my Figma design into the project and use its colors and text styles as the theme. |

:::tip
These are starting points. Change the names and details to fit your app. Nowa AI decides how to build each request, so results vary: review them and ask for changes.
:::

## Save standing rules with Custom Instructions {#custom-instructions}

Custom Instructions are rules that go along with every request you send in a project, such as "Always use concise language". Use them for steady preferences. Put one-off requests in the chat.

1. Click **⋮** (**Options**) in the **AI Assistant** header, then **Custom Instructions**.
2. Type your rules. The empty box suggests "Always use concise language", "Prefer specific widget types" and "Follow certain coding patterns".
3. Click **Save**. Nowa confirms with "Custom instructions saved successfully". **Reset** puts back the last saved text.

![The Custom Instructions popup opened from the three-dot menu of the AI Assistant panel: a short description, an empty text box with an example hint, the 0 / 5000 counter, and the Reset and Save buttons.](/img/docs/ai/ai-prompting-1.png)

- They apply to this project only.
- The limit is 5,000 characters. The counter shows how much you've used, and **Save** is disabled above the limit.
- Nowa stores them in the project, in `.nowa/assistant_instructions.md`, so they travel with it. A [connected external agent](external-agent.md) receives them too.

## Next steps

- [Give Nowa AI context](context.md)
- [Design, Plan and Agent modes](modes.md)
- [Chat with Nowa AI](chat.md)
