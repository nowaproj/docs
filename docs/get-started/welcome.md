---
title: Welcome to Nowa
description: "Turn your app idea into a real app for iOS, Android and the web without writing code: describe it to Nowa AI, refine every detail visually, and publish it."
sidebar_label: Welcome
keywords: [introduction, overview, what is Nowa, getting started, AI app builder, Flutter app builder, visual editor, no-code, no code, without coding, build an app without code, cross-platform app, iOS, Android]
---

Nowa turns your app idea into a real app for iOS, Android and the web, and you don't need to write a line of code. You describe what you want, Nowa AI builds it on your board, and then you shape every detail with visual tools until it's exactly right.

What you see on the board is your real app, not a mockup. Behind it, Nowa writes real Flutter code (Flutter is Google's toolkit for apps that run on phones, the web and computers), and that code belongs to you. You never have to open it. If one day a developer joins you, you can [download the code](../publish/download-code.md) and hand it over.

## How building works

Most projects follow the same loop. You can jump in at any step and go back whenever you like.

1. **Describe.** Tell Nowa AI what you want in plain words, the way you'd explain it to a friend: "A booking app for my yoga studio, with this week's classes and a sign-up form." See [Build with Nowa AI](../ai/index.md).
2. **Watch it build.** Nowa AI designs your screens right on the board while you follow each step in the chat. In **Agent** mode it also makes them work, with real data and the logic behind every button.
3. **Refine visually.** Click anything on a screen and change it in the **Details** panel, drag it into place, or restyle the whole app with a theme. See [Design your app](../design/index.md).
4. **Add logic.** Decide what happens when someone taps a button, what your app remembers and which screen comes next. Nowa AI can build this for you in **Agent** mode, and you can see and change every step in **Circuit**, a visual editor where each step is a block instead of a line of code. See [Add logic](../logic/index.md).
5. **Connect data and sign-in.** Keep your app's data in an online database and let people sign in, with Supabase or Firebase. You can also pull in data from a service you already use, through its REST API (the way most online services share data). See [Connect data and services](../integrations/index.md).
6. **Play.** **Play** (Instant Play) runs a screen right on the board in an instant, so you can tap through it the way your users will. See [Preview and test](../test/index.md).
7. **Run.** **Run** builds and starts your real app: inside the editor, on your phone, or on a device or emulator (a phone simulated on your computer) with the desktop app.
8. **Publish.** **Deploy** builds your app for the web, Android and iOS. Your app goes live on the web and in the stores only when you publish it, so you can experiment freely until then. See [Get ready to publish](../publish/index.md).
9. **Update.** Change your app, then publish it again. See [Ship an update](../publish/index.md#ship-an-update).

Nowa AI and the visual tools work on the same project, so you can switch between them any time. Tweak a widget by hand and ask Nowa AI to build on it, or let Nowa AI make a change and fine-tune it yourself.

## What you can build

Because Nowa builds Flutter apps, one project can become an app for several platforms.

| Platform | How you get there |
|---|---|
| Web | **Deploy** publishes your app to a live web address that anyone can open. |
| Android and iOS | **Deploy** builds your Android and iOS apps. Before that, you can try them on your phone, or on devices and emulators with the desktop app. |
| Desktop | From the desktop app, you can also run your app on your computer itself: it shows up in the **Run on** menu next to your phones and emulators. |

You can start on the free plan. **Deploy** is for cloud projects, and publishing to a live web address or building for Android and iOS needs a paid plan. See [pricing](https://nowa.dev/pricing).

## Who Nowa is for

- **People with an idea.** Founders, shop owners, teachers, designers and hobbyists. You describe your app, watch it take shape and change what you don't like, without writing code or learning Flutter. Every page in these docs outside [Work with code](../code/index.md) is written for you.
- **Teams.** [Workspaces](../account/workspaces.md) let you share projects with the people you build with.
- **People who also code.** The same project is real Flutter code, so you can use [Git](../code/git.md), add [packages](../code/packages.md) and write [your own custom code](../code/custom-code.md). Already have a Flutter app? [Import it](../code/import.md) in the desktop app as a [local project](../code/local-projects.md), and keep Nowa and [VS Code](../code/vs-code.md) open on the same folder. You'll find all of this in [Work with code](../code/index.md), and you can skip it if you don't code.

## Where Nowa runs

- **The web app** at [app.nowa.dev](https://app.nowa.dev). Sign in and build in your browser, with nothing to install. On a phone-sized window you get a [phone layout](./mobile.md) for checking and chatting on the go.
- **The desktop app** for macOS, Windows and Linux. It adds local projects, running on devices and emulators, and importing existing Flutter projects. You don't need it to build and publish your app. See [Install the desktop app](./desktop-app.md).
- **The playground** at [app.nowa.dev/playground](https://app.nowa.dev/playground). Try the editor without an account. See [Try Nowa without an account](./playground.md).

## Key terms

| Term | What it means |
|---|---|
| **Nowa AI** | The AI agent that builds, edits and fixes your app when you ask. It lives in the **AI Assistant** panel (the **Assistant** icon in the sidebar). |
| **Board** | The design surface where your screens, components and widgets sit side by side, like pages pinned to a wall. |
| **Screen** | A page of your app, such as a home page, a product page or a checkout. The [Library](../design/library.md) lists your screens. |
| **Component** | A piece you build once and reuse on any screen, such as a product card. Change it once and every copy updates. |
| **Widget** | A building block, such as a text, a button, an image or a row. Every screen is made of widgets (they're Flutter widgets). |
| **Details** | The panel on the right that shows the settings of whatever you selected. |
| **Circuit** | The visual logic editor, where you stack steps to say what happens, for example when someone taps a button. |
| **Cloud project** and **local project** | Where a project's files live: in your Nowa account, or in a folder on your computer. See [Cloud and local projects](./cloud-and-local.md). |

More terms are in the [glossary](../reference/glossary.md).

## Next steps

- [Create your account](./create-account.md): sign up and sign in.
- [Build your first app](./first-app.md): describe an app and run it.
- [Build with Nowa AI](../ai/index.md): modes, prompts, context and checkpoints.
- [Build a complete app](../guides/complete-app.md): follow one app from idea to published.
