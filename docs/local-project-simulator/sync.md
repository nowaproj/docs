---
sidebar_position: 3
title: Cloud-Local Synchronization
---

# Cloud-local Synchronization

You can create new projects either as Cloud project or as a Local one. Each comes with its benefits.

For example, You can deploy your app with one click only to App Store/Play store or the Web (as building or hosting) when your project is on the cloud, but for local projects you have to do the deployment manually.

For local projects, you get the benefits of using local simulators with instant hot reload, your existing local tools with your project such as IDEs as VS Code, or GitHub desktop, with instant two ways sync, but for cloud projects you can use the built-in previwer only for testing, which has some limitations if you are using custom code or packages.

So, how can you benefit from both at the same time? **the solution is with syncing.**

We have made it easy for you to **have your project both as cloud and local project at the same time**, with the ability to sync changes between them with a single click.

With this, you will have two instances of your project, one on the cloud and one on the local,with them being connected to each other. Once you do a progress in one, you can sync the changes to be on the other instance with a click and vise versa.

To use it, simply create a project either as cloud or local, then inside your project, go to the Settings > Project Sync, then you will be able to create an instance on the other side. There you will also be able to sync changes between each other

:::warning[Sync require using Nowa Desktop version, not the Web]
To be able to sync your cloud project to local or vise versa you should be using Nowa desktop version, otherwise the option of Project Sync won't be visible.
Be sure to use Nowa desktop version either Windows or MacOS version to be able to sync.
:::

:::note[Desktop version can work on Cloud projects as well as Local]
You can still work on cloud projects from Nowa destkop verson as well as Local projects. Nowa desktop version gives an edge compare to using the Web version in terms of performance and some desktop-only features like Local projects.
:::

Let's dive into more.

## For a quick video tutorial

:::tip[Watch the full process]
Watch this section from the full onboarding video to see how we synced a local project from a cloud one, and how we kept them both in sync
<iframe width="767" height="431" src="https://www.youtube.com/embed/PB260DJZruA" title="Nowa 3 | Full Onboarding &amp; Platform Walkthrough" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
:::

To dive into more details, keep reading this page


## Cloud to Local

Select your **cloud project**, then click **Sync**. Next, click **Browse** to choose the folder where you want to save it, and finally, click **Clone to Local**.

<video src="/videos/sync/local.mp4" controls width="100%" />

---

## Local To Cloud

Select your **local project**, then click **Sync**. Next, choose your **workspace**, and finally click **Clone to Cloud**.

<video src="/videos/sync/cloud.mp4" controls width="100%" />

---

## Synchronize

:::warning

Always use this function carefully. If you synchronize in the wrong direction, you can easily overwrite or delete your work. Double-check the sync direction before clicking **Proceed with Sync**.


:::

Simply click **Sync**, then choose whether to sync **from cloud** or **from local**. 

You’ll see the direction of the sync — cloud to local or local to cloud.

Then click **Proceed with Sync** to start the synchronization.

<video src="/videos/sync/sync.mp4" controls width="100%" />

---

## Unlink

If you’ve accidentally linked the wrong project, no worries — you can easily fix it! 

Simply click **Sync** and then **Unlink Project**. 

You’ll see which project you’re about to unlink, and after confirming, you’ll be asked if you want to sync with other project.

<video src="/videos/sync/unlink.mp4" controls width="100%" />

