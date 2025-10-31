---
sidebar_position: 3
title: Connect GitHub Repositories with Nowa Cloud Projects
description: How to create a Github Repo out of your project
---

# Connect Your GitHub Repositories with Nowa Cloud Projects

This guide will help you to easily connect your GitHub repositories with your Nowa Cloud projects, enabling smooth collaboration, efficient development, and easy deployment.

:::note
For Local projects, you can simply clone a Github repository as a local one and open it in Nowa desktop. You can also create a local repository out of your Nowa project, then push it to Github. [Read more on using git with local projects](./git-local.md).
:::

## Two Methods to Integrate GitHub and Nowa

### 1. Clone a GitHub Repository into Nowa Cloud

If you have an existing GitHub Flutter project and wish to continue development using Nowa, you can easily clone it into your Nowa Cloud account.

**Why clone into Nowa Cloud?**

- Work from anywhere using Nowa web or desktop.
- Quickly deploy your app to the App Store, Google Play, or the web. [Read more about deployment](./intro-git.md)
- Easily share testable web versions (12-hour expiration) or production versions (permanent link with optional custom domain). [Read more about Web publishing](../deployment/web-deploy.mdx)
- Instant deployment after changes with just a single click.

#### Steps to Clone a GitHub Repository into Nowa Cloud

1. Be sure your Nowa account is authenticated with your GitHub account. [See authentication guide](./token-github.md).
2. Copy the HTTPS link from your GitHub repository.
3. Navigate to the Nowa dashboard:
    - Click on **Cloud Projects** on the left menu.
    - Select **New Project** on the top right, then choose **Clone from GitHub**.
4. Paste the copied GitHub repository link and confirm.
5. The project opens automatically, ready for editing and collaboration.


<video controls width="720">
  <source src="/img/git/clone-github-cloud.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


Your Nowa Cloud project is now linked with your GitHub repository. You can start committing your changes, pushing and pulling, creating branches, etc. In the next section, you will learn [how to use Git with cloud projects](./git-operations-cloud.md).

### 2. Push Your Nowa Cloud Project to GitHub

You can also take an existing Nowa Cloud project and push it to GitHub for version control and team collaboration.

#### Steps to Push Your Project to GitHub

1. Be sure your Nowa account is authenticated with your GitHub account. [See authentication guide](./git-local.md).
2. Create a new repository on GitHub:
    - Log in to GitHub and click on the **New repository** button (top right).
    - Enter a repository name and choose visibility (public or private). See how in the next video:

<video controls width="720">
  <source src="/img/git/create-repo-github.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

2. Go to your Nowa project and click the **Git icon** (next to the files icon) on the top left.
3. Select **Create Git Repository** to initialize your project as a git repository on Nowa Cloud.
4. Configure the remote GitHub repository:
    - Click the three-dot icon in the git panel.
    - Choose **Manage Remotes**.
    - Enter `origin` as the remote name (default standard, but you can enter another name).
    - Paste the HTTPS URL of your GitHub repository (ending in `.git`) into the Remote URL field, then click **Add Remote**.
5. Set your Git Identity if you haven't yet:
    - Click the **settings** icon in the git panel.
    - Under the Identity section, enter your name and email (this information is used for commit attribution only. It doesn't have to be the same name or email as the account. It's only used by GitHub to display the identity behind each commit).
    :::warning 
    If identity isn't set beforehand, Nowa will prompt you upon your first sync.
    :::
6. Commit your project files:
    - Initially, all files will show as "Changes" since you just created your repository, so all project files are considered changes to the repository. 
    - Enter a commit message (e.g., `init` for initial commit).
    - Click **Commit all** to commit your files to Nowa Cloud.
7. Sync your commit to GitHub:
    - Click **Sync** to push your local commits from Nowa Cloud to GitHub. 

Here's how you connect your cloud repository to Github 
<video controls width="720">
  <source src="/img/git/push-cloud-to-remote.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


Your Nowa Cloud project is now fully integrated with GitHub. You can start collaborating and doing version control. Head to the next section to learn how to [use git operations inside Nowa cloud projects](./git-operations-cloud.md).

## Team Collaboration Using Nowa and GitHub

With your Nowa Cloud project linked to GitHub, your team can efficiently collaborate by:

- Designers creating and updating the UI, easily syncing with developers.
- Developers working simultaneously on different branches for various features.
- Product managers adding project notes, performing tests on simulators, and sharing testable web versions with stakeholders.

## What's Next?

You’re now set up to perform basic git operations! Head to the next section to [learn more about essential Git workflows](./git-operations-cloud.md)), including branching, merging, pulling changes, and resolving conflicts effectively.

