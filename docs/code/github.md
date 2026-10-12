---
title: Connect GitHub
description: Connect your GitHub account once, then create, clone and sync repositories from Nowa, set the name on your commits, or use a personal access token instead.
keywords: [GitHub, Connect GitHub, GitHub Integration, OAuth, repository, remote, origin, Manage Remotes, Create GitHub Repository, Add Existing Repository, Disconnect, Set Identity, access token, personal access token, fine-grained token, classic token, Developer settings, Generate new token, Contents permission, Read and write, token expired, legacy credentials, SSH, ssh-agent, credentials, authenticate GitHub, new repository, collaborator]
---

Connect GitHub once and Nowa can list your repositories, clone them as projects, create new ones, and push and pull for you, with no tokens to copy and paste.

GitHub is a website that keeps Git repositories online. A repository is your project's files together with the full history of changes Git has saved for them (new to Git? [Use Git](git.md) explains the basics). With your app's repository on GitHub, you have a backup outside Nowa, a place to share the code with teammates, and an easy way to open the same project somewhere else, such as on your own computer.

## Before you start

- A GitHub account. You can create one at [github.com](https://github.com).
- A plan with Git integration. If yours doesn't include it, the Git settings show "Your plan does not support git integration" with an **Upgrade** button. See [pricing](https://nowa.dev/pricing).

## Connect your GitHub account {#connect-github}

1. Open the Git settings. Click **Settings** in the dashboard sidebar, or click your avatar in a project's top bar and choose **General Settings**. Then, under **Editor Settings**, click **Git**.
2. Under **GitHub Integration**, click **Connect GitHub**. GitHub opens in your browser.
3. Approve Nowa on GitHub. If GitHub asks which repositories Nowa can use, choose **All repositories**, or **Only select repositories** and pick the ones that hold your apps. You can change this later.
4. Come back to Nowa. It shows "Waiting for Authorization..." and waits up to two minutes for your approval. Click **Cancel** to stop waiting.
5. Once it works, you see your GitHub avatar and username with "n repositories connected".

![The Git Settings page of the settings window, opened from Git under Editor Settings: GitHub Integration is connected (highlighted), with the GitHub avatar and username (blurred), 1 repositories connected and a Manage button. Below it, Legacy Remote Credentials with a Documentation link reads When GitHub Integration is enabled, legacy remote credentials are not used.](/img/docs/code/code-github-1.png)

Nowa only sees the repositories you allowed, so a repository you left out won't show up in its lists. To change the choice, click **Manage**. It opens GitHub, where you pick the repositories under **Repository access** and click **Save**.

Inside a project you can also connect from **Settings** (the gear in the top bar) → **Git**, or from **Manage Remotes**. While GitHub is connected, Nowa uses it instead of any access tokens you added.

## Create or connect a repository {#connect-a-repository}

Your commits stay in your project until you connect it to a repository on GitHub, called a remote. Once it has one, you can push (send your commits to GitHub) and pull (bring in commits made somewhere else, for example by a teammate). **Manage Remotes** sets this up.

Open it from the **Git** panel: hover the branch row, click the **...** button and choose **Manage Remotes**. It also opens by itself when you click **Publish Branch** (or **Sync**) in a project with no remote.

### Let Nowa create the repository

1. In **Create GitHub Repository**, check the **Name**. It starts as your project's **Package Name** (for example `my_app`), after your GitHub account name. Use letters, numbers, hyphens, underscores and periods only.
2. Keep **Private** ticked to keep the repository to yourself and the people you share it with. A public repository can be seen by anyone on the internet.
3. Click **Create Repository**. Nowa creates it on GitHub, adds it as the remote `origin` (Git's usual name for a project's main remote) and pushes your commits, so your whole history is on GitHub in one go.

![The Manage Remotes dialog of a project without a remote: Create GitHub Repository with the Name field (the GitHub username, blurred, then /docs_capture_paid), Private ticked and the Create Repository button (highlighted), then the OR divider and the collapsed Add Existing Repository row (highlighted).](/img/docs/code/code-github-2.png)

### Connect a repository you already have

Creating the repository on GitHub yourself, for example because you use an access token instead of connecting GitHub? Create it empty first, so your first push has nothing to clash with:

1. On GitHub, click **+** in the upper-right corner, then **New repository**.
2. Choose the **Owner** and type a name.
3. Choose whether the repository is public or private.
4. Leave the README, .gitignore and license options off. GitHub advises against them when you bring in an existing project, because they can cause a merge conflict.
5. Click **Create repository**. On the Quick Setup page that opens, copy the repository's address (it ends in `.git`).

Then connect it in Nowa:

1. Under **OR**, expand **Add Existing Repository**.
2. Pick a repository from the list (it appears once GitHub is connected; type in **Search repositories** to filter), or paste its **Repository URL**. Nowa accepts `http://` and `https://` addresses here. If yours isn't listed, click **Manage your connected repositories** to give Nowa access to it on GitHub.
3. Click **Connect Repository**.
4. In the **Git** panel, click the button under the commit box: **Publish Branch** if the repository doesn't have your branch yet, otherwise **Sync**.

:::warning
Make sure the repository is the right one for this project. Nowa warns that connecting the wrong repository may lead to the loss of your current changes.
:::

### Check or remove the connection

Once a repository is connected, **Connected Remote Repository** shows its address. The icon beside it (tooltip **View Repository in Browser**) opens it on GitHub, and **Disconnect** removes the remote from the project. The repository on GitHub stays.

If GitHub isn't connected yet, **Create GitHub Repository** shows **Connect GitHub** instead of the form, and its info icon explains "You need to connect your GitHub account to create a repository." If GitHub didn't give Nowa permission to create repositories, you see "No permission to create repository. Try again" and **Grant Permission**.

## Set your Git identity {#set-your-git-identity}

Every commit carries a name and an email, so you and your teammates can see who changed what. New projects use your Nowa account's. The identity is only a label on your commits, and it doesn't have to match any account. If you'd like GitHub to show the commits as yours on your profile, use an email address that's on your GitHub account.

To change it:

1. Click **Settings** (the gear) in the project's top bar, then **Git**. You can also hover the branch row in the **Git** panel and click **Git settings**.
2. Under **Identity**, type your **Name** and **Email**.
3. Click **Set Identity**. Your next commits carry the new name; earlier commits keep the one they were made with.

The identity belongs to this project. If the page says "No repository found", click **Create Git Repository...** in the **Git** panel first. In a cloud project without an identity, Nowa asks when you commit ("You need to set your identity first"). A local project with no identity in its repository or in Git on your computer can't commit until you set one.

## Use an access token instead (legacy) {#legacy-remote-credentials}

A personal access token is a long, password-like code that you create on GitHub so a tool can work with your repositories. It's the older way to give Nowa access, so the settings call it legacy, but it still works when GitHub isn't connected. For a cloud project, Nowa's servers use the token to reach your repository. For a local project, your computer does: see [Local projects: credentials and SSH](#local-credentials-and-ssh).

### Create a token on GitHub

GitHub recommends fine-grained tokens, which you can limit to the repositories Nowa needs.

1. On GitHub, click your profile picture in the upper-right corner, then **Settings**.
2. In the left sidebar, click **Developer settings**.
3. Under **Personal access tokens**, click **Fine-grained tokens**, then **Generate new token**.
4. Under **Token name**, type a name you'll recognize later, such as `Nowa`.
5. Under **Expiration**, choose how long the token works. When it expires, push and pull stop working until you add a new token, because GitHub can't bring an expired token back.
6. Under **Resource owner**, keep your own account, or pick the organization that owns the repository.
7. Under **Repository access**, choose **Only select repositories** and pick your app's repository, or give the token all your repositories.
8. Under **Permissions**, open **Repository permissions**, find **Contents** and choose **Read and write**. That's the permission that lets Nowa pull and push.
9. Click **Generate token**, and confirm again if GitHub asks. Copy the token right away and keep it somewhere safe, such as a password manager: anyone who has it can change your code.

Two cases need a little more:

- **Someone else's repository.** Fine-grained tokens can't yet push to a repository that belongs to another person's account when you're a collaborator on it. Create a classic token instead: under **Personal access tokens**, click **Tokens (classic)**, then **Generate new token** → **Generate new token (classic)**. Give it a **Note** and an **Expiration**, tick the **repo** scope and click **Generate token**. A classic token reaches every repository you can access, so keep it extra safe.
- **An organization's repository.** Some organizations review fine-grained tokens. Until an administrator approves yours, it can only read public repositories.

For every detail, see [GitHub's guide to personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

### Add the token to Nowa

1. Open the Git settings, as in [Connect your GitHub account](#connect-github), step 1. Under **Legacy Remote Credentials**, click **Add Credentials**.
2. In **Set Git Credentials**, type your GitHub **Username** and paste the token into **Access Token**.
3. Click **Add Credentials**. Your cloud projects can now push and pull with this token.

**Add Credentials** shows when nothing is saved. To replace a token, for example when it expires, delete the saved one with its trash icon first, then add the new one. While GitHub Integration is on, **Add Credentials** is hidden and Nowa says "When GitHub Integration is enabled, legacy remote credentials are not used."

Tokens also work with other Git hosts. **Repository URL** takes any `http://` or `https://` address, so you can connect a repository on another host and add an access token from that host. Keep GitHub disconnected in that case: while it's connected, Nowa signs in to every repository with your GitHub account.

## Local projects: credentials and SSH {#local-credentials-and-ssh}

<Badge type="desktop" />

Git for a local project runs on your computer, so Nowa signs in from your computer too.

- **HTTPS remotes.** Nowa uses GitHub Integration if it's connected. Otherwise it uses **External Local Credentials** in the Git settings: click **+** beside the heading and add a **Username** and **Access Token**, such as the token you [created above](#create-a-token-on-github). Nowa says "No credentials found" until you do.
- **SSH remotes.** For a remote such as `git@github.com:you/app.git` or `ssh://...`, Nowa never sends a token. It tries the keys in your ssh-agent first, then `id_ed25519` and `id_rsa` in the `.ssh` folder of your home folder (found through the `HOME` environment variable), each with its matching `.pub` file. A key protected by a passphrase works only through the agent.
- **Adding an SSH remote.** **Add Existing Repository** takes only `http://` and `https://` URLs, so set an SSH remote up outside Nowa, for example by cloning with `git clone` in a terminal and then [importing the folder](import.md#import-a-project-from-a-folder).

## Fix connection problems

| You see | Do this |
|---|---|
| No repository list in **Clone from GitHub** | Connect GitHub first, as above. The list doesn't appear until you do. |
| A repository is missing from the list | Click **Manage your connected repositories** (or **Manage** in the Git settings) and give Nowa access to it on GitHub. |
| "You need to provide authentication for this action" or "You need to add your credentials to access the remote repository" | Connect GitHub, or add an access token: under **Legacy Remote Credentials** for a cloud project, under **External Local Credentials** for a local project. |
| "You don't have access to this repository, please check your credentials" | Click **Manage** under **GitHub Integration** and make sure Nowa can use that repository, or check your token. |
| Push and pull stopped working with a token that used to work | The token may have expired. Create a new one on GitHub, delete the saved token in the Git settings and add the new one. |
| The waiting window closes after two minutes and **Connect GitHub** is still there | The approval didn't arrive in time. Click **Connect GitHub** again and approve Nowa in the browser within two minutes. |

## Next steps

- [Use Git](git.md): commit, sync, branch and work with a team.
- [Import an existing Flutter project](import.md): clone a repository as a new project.
- [Work with local projects](local-projects.md): keep a copy on your computer.
