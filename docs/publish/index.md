---
title: Get ready to publish
description: Put your app on the web or build it for Android and iOS from one Deploy menu, after you set its name, identifier, version and icon.
keywords: [publish, deploy, deployment, release, go live, ship, build for android, build for ios, build for web, app store, google play, cloud build, web deploy, deployment and sharing]
---

When your app is ready for real people, Nowa builds it for you in the cloud. Click **Deploy** in the top bar to put your app on the web, build it for Android, or send an iOS build to your App Store Connect account.

<Badge type="cloud" /> <Badge type="paid" />

Publishing needs a cloud project on a paid plan. If your plan doesn't include a target, its row in the **Deploy** menu shows **Premium**, and its tab on the **Deployment** page shows a lock with an **Upgrade** button. See [pricing](https://nowa.dev/pricing) for what each plan includes.

## What you can publish

| Target | What you get | Guide |
|---|---|---|
| **Web** | A live web address for your app. Update it, take it down, or serve it from your own domain. | [Publish to the web](./web.md) |
| **Android Debug** | An unsigned build for quick tests on a device. | [Publish to Google Play](./android.md) |
| **Android Release** | A signed build that you upload to Google Play. | [Publish to Google Play](./android.md) |
| **iOS** | A signed build that Nowa sends to your App Store Connect account. | [Publish to the App Store](./ios.md) |

## Check your app details {#app-details}

Stores and devices read these from your project, so set them before the first build. Click **Settings** (the gear in the top bar), then **Project Details**.

| Setting | What to enter |
|---|---|
| **App Name** | The name people see under your app icon. |
| **Bundle Identifier** | Your app's unique ID on iOS and Android, such as `com.yourcompany.yourapp`. Use letters and digits separated by dots, or Nowa shows **Invalid package name**. New projects start with a placeholder that begins with `com.example`, so replace it. Choose it once: stores treat a different identifier as a different app. |
| **Build version** | Three numbers separated by dots, such as `1.0.0`. |
| **Build number** | A whole number. Raise it before each new store upload, because stores turn down a build number you already used. |
| **App Icon** | Click **Change all** to set every platform at once, or pick **Android**, **iOS**, **Web** or **macOS**. Nowa accepts images up to 1024 x 1024 pixels. |

**Package Name** on the same page is a read-only Flutter name that your users never see. Don't use it as your store identifier.

If your app uses the camera, microphone, location or similar, switch those on under **Settings** → **Permissions**. For iOS you can also edit the message people see when the app asks. [Project settings](../account/project-settings.md) lists everything on both pages.

## Start a deployment

1. Open your cloud project. The **Deploy** button sits next to **Run** in the top bar.
2. Click **Deploy**. The menu lists **Web**, **Android Debug**, **Android Release** and **iOS**, each with its status.
3. Click **Deploy** on the row you want. The top-bar button reads **Deploying** while anything is building.

{/* CAPTURE: id=publish-index-1 | state: signed in, cloud project open, Deploy menu open | show: the four rows (Web, Android Debug, Android Release, iOS) with status text and buttons, and Advanced build settings | crop: top-right of the editor with the menu */}

Each row keeps you posted:

| Row | Status text | Buttons |
|---|---|---|
| **Web** | **Not published yet**, **Publishing…**, **Last publish failed**, or the host name of your live site | **Deploy**, then **Redeploy** once the site is live. **Cancel** while it publishes. |
| **Android Debug**, **Android Release**, **iOS** | **Not deployed yet**, the build status such as **Building…**, or **Deployed**, **Failed** or **Canceled** with how long ago | **Deploy**, or **Cancel** while it builds |

- On a mobile row, **Set up** replaces **Deploy** when something is missing: a signing key, App Store Connect credentials or a Git repository. It opens the **Deployment** page, where you pick the tab you need.
- **Premium** replaces the button when your plan doesn't include that target. Click it to see the **Time to level up** dialog.
- Click a live **Web** row to open your site. Click any other row to open its tab on the **Deployment** page.
- **Advanced build settings** opens the **Deployment** page directly. It has an **Android**, an **iOS** and a **Web** tab, and each mobile tab lists its past builds.

:::tip[Or ask Nowa AI]
Before you deploy, ask Nowa AI to check your project: "Fix the problems in my project." Publishing to the web stops when Nowa finds errors. See [How Nowa AI works](../ai/index.md).
:::

## Publish a local project

Local projects don't have a **Deploy** button. Open **Settings** → **Deployment** and you see **Cloud build is not available on local projects** with a **Sync to cloud** button. It opens **Project Sync**, where **Clone to Cloud** makes a cloud copy of your project. Deploy from that copy, and use **Sync from Local** to bring later changes over. [Work with local projects](../code/local-projects.md) has the details.

In the playground, **Save** your app to your account first. The playground has no **Deploy** button.

On a phone, **Build** in the top bar opens the same **Android**, **iOS** and **Web** tabs. See [Use Nowa on your phone](../get-started/mobile.md).

## Next steps

- [Build history and logs](./builds.md): start builds, follow them and read their logs.
- [Download your code](./download-code.md): take the full Flutter source with you.
- [Share a preview](../test/share.md): get feedback from others without a build.
