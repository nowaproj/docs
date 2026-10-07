---
title: Build history and logs
description: Start Android and iOS builds, follow their progress, download the files and read the log of every step when a build fails.
sidebar_label: Build history
keywords: [build, builds, build history, logs, artifacts, start new build, active build, latest build, cancel build, init repository, explain with ai, failed build, cloud build, steps, apk, aab, ipa]
---

Every Android and iOS build runs in the cloud and leaves a record. Start a build, watch it run, then download its files, or read its logs when something goes wrong.

<Badge type="cloud" /> <Badge type="paid" />

## Start a build

1. Click **Settings** → **Deployment** and open the **Android** or **iOS** tab. On **Android**, **Debug mode** decides which build you start.
2. In **Start New Build**, pick a **Branch**. It starts on the branch you have checked out.
3. Click **Build**. Above the button, Nowa reminds you: "Starting a build will commit all changes to the selected branch."

If **Branch** shows **Init Repository** instead of a menu, your project has no Git repository yet. Click **Init Repository** once, and Nowa selects the checked-out branch for you. The **Deploy** menu points at the same gap with "Connect a repository in settings to deploy to the app stores."

You can also click **Deploy** in the top bar, then **Deploy** on an Android or iOS row. That builds the branch you have checked out.

When **Build** is off, hover over it to see why:

| Hint | What to do |
|---|---|
| Finish the workflow configuration above | Save the signing key on **Android** (with **Debug mode** off), or the certificate and App Store Connect credentials on **iOS**. An error icon next to **Start New Build** also reads "Missing configuration. Check your workflow settings above". |
| A build is already running | Wait for it, or click **Cancel** on the **Active Build** card. |
| Select a branch to build from | Pick a branch, or click **Init Repository**. |
| Loading the workflow status… | Wait a moment. |

Your plan sets how many builds you can run. When the allowance is used up, **Time to level up** appears with the message "Your build quota has been used up. Please upgrade your plan to continue using this feature." See [Plans, billing and AI usage](../account/plans-and-usage.md).

## Follow a build

While a build runs, the card is called **Active Build**. It shows the current status and a **Cancel** button. Nowa checks the status every few seconds, so you don't need to refresh.

Along the way the status reads **Queued**, **Initializing**, **Preparing**, **Fetching**, **Building**, **Testing**, **Publishing** or **Finishing**. It ends as **Finished**, **Failed**, **Canceled**, **Skipped** or **Timeout**.

The **Deploy** button in the top bar reads **Deploying** while a build runs, and the build's row in the **Deploy** menu shows the same status.

## Read the results

When a build ends, the card is called **Latest Build**. Click its header to open or close it.

- **Build Info** shows the build's ID, **Status**, **Branch**, **Started** and, once it has finished, **Duration**.
- **Artifacts** lists the files the build produced. Click a file to download it in your browser. Download links are short-lived. If one stops working, open the build again from **History** to reload its files.
- **Steps** lists each stage with a status icon and how long it took. Click a step to read its log.

{/* CAPTURE: id=publish-builds-1 | state: signed in, paid plan, cloud project with a finished Android build; Settings → Deployment → Android, Latest Build open with one step expanded | show: Build Info, Artifacts, Steps with one step's log open, and the History list below | crop: Deployment page, Android tab */}

## When a build fails

1. Find the step with the red icon under **Steps** and click it to read the log.
2. Click **Explain with AI** to send the failure and the end of the log to Nowa AI. See [How Nowa AI works](../ai/index.md).
3. On a failed **iOS code signing** step, click **Documentation** for help with your [distribution certificate](./ios.md#apple-distribution-certificate).
4. Fix the problem, then click **Build** again.

## Browse past builds

**History** lists your builds, newest first, with a status icon and how long ago each one started. Click a row to open **Build Details**, which shows the same **Build Info**, **Artifacts** and **Steps**. Use the arrows and the page counter, such as 1 of 3, to move through the list. Before your first build, the list reads "No builds yet".

## What runs behind the scenes

Builds run in Nowa's cloud. Nowa commits your changes to the branch you pick, and the build starts from that branch. Your project may contain a `codemagic.yaml` file with the build steps. Leave it alone unless you know the build system. If the editor reports an error in it, open it in code mode and click **Reset to default** to restore the default steps.

## Next steps

- [Publish to Google Play](./android.md): create a signing key and upload your release.
- [Publish to the App Store](./ios.md): save your Apple credentials and send builds to App Store Connect.
- [Find and fix problems](../test/problems.md): clear errors before you build.
