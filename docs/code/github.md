---
title: Connect GitHub
description: Connect your GitHub account to Nowa once, then clone, create and sync repositories without copying tokens, and set the identity on your commits.
keywords: [GitHub, Connect GitHub, GitHub Integration, OAuth, repository, remote, origin, Manage Remotes, Create GitHub Repository, Add Existing Repository, Disconnect, Set Identity, access token, personal access token, legacy credentials, SSH, ssh-agent, credentials, authenticate GitHub]
---

Connect GitHub once and Nowa can list your repositories, clone them as projects, create new ones and push and pull for you, with no tokens to copy and paste.

## Before you start

- A GitHub account.
- A plan with Git integration. If yours doesn't include it, the Git settings show "Your plan does not support git integration" with an **Upgrade** button. See [pricing](https://nowa.dev/pricing).

## Connect your GitHub account {#connect-github}

1. Open the Git settings. Click **Settings** in the dashboard sidebar, or click your avatar in a project's top bar and choose **General Settings**. Then, under **Editor Settings**, click **Git**.
2. Under **GitHub Integration**, click **Connect GitHub**.
3. Approve Nowa in the browser window that opens. Nowa shows "Waiting for Authorization..." and waits up to two minutes. Click **Cancel** to stop waiting.
4. When it works, you see your GitHub avatar and username with "n repositories connected".

Click **Manage** to open GitHub and change which repositories Nowa can use. Inside a project you can also connect from **Settings** (the gear in the top bar) → **Git**, or from **Manage Remotes**.

{/* CAPTURE: id=code-github-1 | state: signed in with a plan that includes Git integration; avatar → General Settings → Git, GitHub connected with a throwaway account | show: the Git Settings page with GitHub Integration in its connected state (avatar, username, number of repositories, Manage) and the Legacy Remote Credentials heading below | crop: the settings window content */}

While GitHub is connected, Nowa uses it instead of any access tokens you added.

## Create or connect a repository {#connect-a-repository}

A project needs a remote before it can push and pull. **Manage Remotes** sets one up. Open it from the **Git** panel: hover the branch row, click the **...** button and choose **Manage Remotes**. It also opens by itself when you click **Sync** in a project with no remote.

To create a new repository:

1. In **Create GitHub Repository**, check the **Name**. It starts as your project's name and sits after your GitHub username.
2. Keep **Private** ticked to keep the repository to yourself and the people you share it with.
3. Click **Create Repository**. Nowa creates it on GitHub, adds it as the remote `origin` and pushes your commits.

To connect a repository you already have:

1. Under **OR**, expand **Add Existing Repository**.
2. Pick a repository from the list (type in **Search repositories** to filter), or paste its **Repository URL**. Nowa accepts `http://` and `https://` URLs here.
3. Click **Connect Repository**, then click **Sync** in the **Git** panel.

:::warning
Make sure the repository is the right one for this project. Nowa warns that connecting the wrong repository may lead to the loss of your current changes.
:::

{/* CAPTURE: id=code-github-2 | state: signed in, GitHub connected, a project without a remote; Git panel → ... → Manage Remotes | show: the Create GitHub Repository form (Name with your username prefix, Private, Create Repository), the OR divider and the Add Existing Repository row | crop: the dialog */}

Once a repository is connected, **Connected Remote Repository** shows its address. The icon beside it (tooltip **View Repository in Browser**) opens it on GitHub, and **Disconnect** removes the remote from the project.

If GitHub isn't connected yet, the create section says "You need to connect your GitHub account to create a repository." and offers **Connect GitHub**. If GitHub didn't give Nowa permission to create repositories, you see "No permission to create repository. Try again" and **Grant Permission**.

## Set your Git identity {#set-your-git-identity}

Every commit carries a name and an email. New projects use your account's. To change them:

1. Click **Settings** (the gear) in the project's top bar, then **Git**. You can also hover the branch row in the **Git** panel and click **Git settings**.
2. Under **Identity**, type your **Name** and **Email**.
3. Click **Set Identity**.

The identity belongs to this project. If a commit needs one and there isn't any, Nowa asks first with "You need to set your identity first".

## Use an access token instead (legacy) {#legacy-remote-credentials}

Before GitHub Integration, Nowa signed in to Git hosts with personal access tokens. They still work when GitHub isn't connected. For a cloud project, Nowa's servers use the token to reach your repository.

1. Create a personal access token with your Git host, with permission to read and write the repository's code. For GitHub, see [GitHub's guide to personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
2. Open the Git settings (see above). Under **Legacy Remote Credentials**, click **Add Credentials**.
3. In **Set Git Credentials**, type your **Username**, paste the token into **Access Token** and click **Add Credentials**.

**Add Credentials** shows when nothing is saved. To replace a token, delete the saved one with its trash icon first. While GitHub Integration is on, Nowa says "When GitHub Integration is enabled, legacy remote credentials are not used."

## Local projects: credentials and SSH {#local-credentials-and-ssh}

<Badge type="desktop" />

Git for a local project runs on your computer, so Nowa signs in from your computer too.

- **HTTPS remotes.** Nowa uses GitHub Integration if it's connected. Otherwise it uses **External Local Credentials**: click **+** beside the heading and add a **Username** and **Access Token**. Nowa says "No credentials found" until you do.
- **SSH remotes.** For a remote such as `git@github.com:you/app.git` or `ssh://...`, Nowa never sends a token. It tries the keys in your ssh-agent first, then `~/.ssh/id_ed25519` and `~/.ssh/id_rsa`, each with its matching `.pub` file. A key protected by a passphrase works only through the agent. **Add Existing Repository** takes only `http://` and `https://` URLs, so an SSH remote is one you set up outside Nowa, for example by cloning with `git clone` in a terminal.

## Fix connection problems

| You see | Do this |
|---|---|
| An empty repository list in **Clone from GitHub** | Connect GitHub first, as above. The list stays empty until you do. |
| "You need to provide authentication for this action" | Connect GitHub, or add an access token. |
| "You don't have access to this repository, please check your credentials" | Click **Manage** under **GitHub Integration** and make sure Nowa can use that repository, or check your token. |
| "Authorization timed out. Please try again." | Click **Connect GitHub** again and finish in the browser within two minutes. |

## Next steps

- [Use Git](git.md)
- [Import an existing Flutter project](import.md)
- [Work with local projects](local-projects.md)
