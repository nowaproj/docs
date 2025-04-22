---
sidebar_position: 2
title: Authenticate Github with Nowa
description: How to create a Github Repo out of your project
---

# Authenticate GitHub with Nowa

Integrating GitHub with Nowa lets you seamlessly manage your app development projects. By connecting GitHub to Nowa, you can easily:

- Clone existing GitHub projects directly into Nowa.
- Export your Nowa cloud projects to GitHub.
- Perform essential Git operations like push, pull, and commit.

As a start to be able to integrate Github with Nowa cloud projects, you will need to Authenticate your account on Nowa to access your repositories on Github.  This guide will help you do that using personal access tokens.

---

## Step 1: Generate a Personal Access Token from GitHub

Nowa uses GitHub’s **Personal Access Tokens (PAT)** to securely connect to your GitHub repositories. Follow these steps to create your token:

1. Log in to your [GitHub account](https://github.com/) and click on your profile icon at the top-right corner.
2. Select **Settings** from the dropdown menu.
3. On the settings page, choose **Developer settings** at the bottom-left.
4. Click on **Personal access tokens**.
5. Select **Fine-grained tokens** (GitHub’s recommended secure option), then click on **Generate new token**.

Here's a full video on how to generate the required token
<video controls width="720">
  <source src="/img/git/generate_token.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


You'll see the token creation page. Fill in the details:

- **Token Name**: Provide a clear, identifiable name (e.g., "Nowa Integration").
- **Description**: (Optional) Briefly describe the purpose of the token.
- **Expiration**: Set an expiration date or select **No expiration**.  
    **Note:** If your token expires, you'll lose the connection between Nowa and GitHub and will need to regenerate the token.

Next, choose the repository access:

- **Public Repositories**: Select this if you'll connect Nowa only to your public repositories.
- **Selected Repositories**: Limit Nowa's access to specific repositories you choose.
- **All Repositories**: Allows Nowa to interact with any repository—both public and private.

Under **Permissions**, configure the access rights:

- Look for the **Content** category.
- Set this permission to **Read and Write**. This lets Nowa perform operations such as cloning, committing, pulling, and pushing changes.

Finally, click **Generate token**.

:::warning[Copy your token right away]
GitHub shows this token only once. Copy and save it immediately. If you lose it, you'll have to create another token following the steps above.
:::

---

## Step 2: Add the Token to Nowa

Once you have your token, follow these simple steps to authenticate GitHub with Nowa:

1. Open your **Nowa Dashboard**.
2. Navigate to **Settings** → **Git**.
3. Next to **Remote credentials**, click on the **+** icon.
4. A popup window will appear:
    - **Username**: Enter your GitHub username.
    - **Access token**: Paste the personal access token you just created.
5. Click on **Add credentials**.

<video controls width="720">
  <source src="/img/git/add_token.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

Your Nowa account is now authenticated with GitHub.

:::note[One credential at a time]
Nowa allows only one Git credential at a time. If you add a new token, it will replace the existing one.
:::

:::info[]
For local projects, you don't need to do the authenticate Github. This is only needed when you want to connect Github with your Cloud projects on Nowa and perform git operations, but not with local ones.

For local repositories, you can manage them as you would do with standerd Flutter development using any of the options such as git commands, VS code, or Github desktop app itself. [Read more on using git with local projects here](./git-local.md)

:::
---

## You're Ready!

Now, your GitHub and Nowa accounts are connected. You can effortlessly manage, synchronize, and collaborate on your Flutter app projects between GitHub and Nowa.

Start exploring Nowa’s seamless integration and elevate your app-building experience!








