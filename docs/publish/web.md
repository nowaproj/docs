---
title: Publish to the web
description: Publish your app to a live web address with one click, update it, take it down, download the build files and serve it from your own domain.
sidebar_label: Web
keywords: [web, publish, deploy, hosting, website, live url, custom domain, dns, download files, web deploy, production, development mode, build for web, deactivate, republish]
---

Publish your Flutter app as a website straight from Nowa. One click builds it, hosts it and gives you an address to share. Publish again to update the same site.

<Badge type="cloud" /> <Badge type="paid" />

## Before you start

- Use a cloud project on a paid plan. [Get ready to publish](./index.md) covers the plan gate and the app details to set.
- Clear the errors in your project. Publishing starts with a code check (`flutter analyze`) and stops when it finds errors. [Find and fix problems](../test/problems.md) shows where to look.

## Publish your app

1. Click **Deploy** in the top bar, then **Deploy** on the **Web** row. Or click **Settings** → **Deployment**, open the **Web** tab and click **Publish**.
2. Wait while Nowa works. The status moves through **Saving** and **Creating** to **Deploying**: Nowa saves your project, checks it, then builds and hosts it. **Creating** appears only the first time. Click **Cancel** to stop.
3. When it finishes, the **Your Website** card shows **Published** with the date, and your site's address below it.
4. Click the open icon (**Open in browser**) to visit the site, or the copy icon (**Copy**) to copy the address and share it.

{/* CAPTURE: id=publish-web-1 | state: signed in, paid plan, cloud project already published; Settings → Deployment → Web tab | show: the Your Website card with Published date, address field with open and copy icons, Custom Domain, Download Files, Deactivate, Update | crop: Deployment page content area */}

If the **Problems** tab lists anything when you click **Publish** on the **Web** tab, a **Your Project has Problems** dialog asks first. Click **Close** to go and fix them, or **Ignore and Publish** to continue anyway.

When the card shows **Expires In:**, the countdown is the time left until the site expires.

## If publishing fails

A red bar on the card names what went wrong, and the button changes to **Republish**.

- **Analysis Failed** means the code check found errors. The Console opens on its **Logs** tab with the messages. Fix them, then publish again.
- **Publish Failed** (or another title) means the build or hosting step failed. Click **Show Details** to read the log on the **Error in Deployment** page.

Click **Fix with AI** next to the bar to hand the failure to Nowa AI. It closes Settings and sends the error log to the chat, asking Nowa AI to fix the project and tell you when it's safe to republish. See [How Nowa AI works](../ai/index.md).

:::tip[Or ask Nowa AI]
Type "Fix the problems in my project" in the chat, then publish again.
:::

## Update your site

Make your changes, then click **Update** on the **Web** tab. In the **Deploy** menu, the **Web** row's button reads **Redeploy**. Your site keeps the same address.

## Take your site down

Click **Deactivate** on the **Web** tab. Nowa takes the site down right away and doesn't ask you to confirm. Click **Publish** to put your app online again.

## Download the build files

If you'd rather host the site yourself, click **Download Files** once your site is live. In the web app, your browser downloads the files. In the desktop app, Nowa asks where to save them and then opens that folder.

## Use your own domain

Serve your site from an address you own, such as `example.com`. Custom domains need a higher plan. Without one, **Custom Domain** shows **Premium**.

1. Publish your site. The **Custom Domain** field appears below the address once the site is live.
2. Type your domain without `www.`. Nowa shows **Please remove "www."** if you include it.
3. Turn on the switch below the field if you want the `www` address too. It reads **Also www.** followed by your domain.
4. Click **Set**. The button changes to **DNS**.
5. Click **DNS**. The **DNS Records** page lists each record's **Name**, **Type** and **Value**, with a copy icon for each.
6. Add every record in your domain provider's DNS settings. Your provider's help explains where.
7. Click **Verify** to check. DNS changes can take up to 48 hours, and the status stays **Pending** until they land. When the records check out, the page closes and **Custom Domain** shows your domain.

{/* CAPTURE: id=publish-web-2 | state: signed in, paid plan, custom domain set on the live site (throwaway domain), clicked DNS | show: DNS Records page with Pending status, Verify button and the Name/Type/Value table with copy icons | crop: the DNS Records page */}

You can't change the **Also www.** switch after you set the domain. To change it, or to switch domains, click the trash icon in the field (**Remove custom domain**) and start again.

:::note
Each project has one live site. The separate Development mode from older versions is gone, as [What's New](../new/whats-new.md) explains.
:::

## Next steps

- [Get ready to publish](./index.md): set the name, identifier, version and icon.
- [Share a preview](../test/share.md): let others try your app without publishing it.
- [Download your code](./download-code.md): host or build the app yourself.
