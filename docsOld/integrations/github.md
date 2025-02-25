---
sidebar_position: 2
title: Github Integration 
description: How to create a Github Repo out of your project
---

# Integrating GitHub with Your Nowa Project

Integrating GitHub with your Nowa project allows you to manage your project's version control, collaborate with others, and maintain a robust development workflow. This guide will walk you through the process of integrating GitHub with your local Nowa project.

*Are you a video type of person? great, then check out this Youtube Short to see quickly how to intergate with Github, create local repo out of Nowa project, do commits and discard changes.*

<iframe width="382" height="679" src="https://www.youtube.com/embed/i2bmqTUCKfo" title="Github Repo out of your Local Nowa project? YES #flutter #github #mobileappdevelopment #mobileappdev" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Prerequisites

Before starting, ensure you have the following:
- **Nowa Desktop:** GitHub integration requires Nowa Desktop because it allows you to create and manage local Flutter projects on your device, which you can then connect to a GitHub repository.

## GitHub Integration Steps

### 1. Create a Local Project in Nowa
To begin, create a local project within the Nowa Desktop application:
- **Select the option to create a new project** and specify a path on your local machine.
- **Save the project** at the specified location. This will be a standard Flutter project stored on your device.

### 2. Initialize a GitHub Repository
After creating your local project, follow these steps to integrate it with GitHub:

#### Using GitHub Desktop:
1. **Open GitHub Desktop** and navigate to the menu option to add an existing repository.
   - Click on `Add > Add Existing Repository`.
2. **Select your project folder** that you created in Nowa.
   - GitHub Desktop will notify you that no Git repository exists in the selected folder.
3. **Create a new Git repository**:
   - Click on the option to create a Git repository in that folder.
   - This action will initialize a Git repository and create the initial commit for your project.

### 3. Managing Changes
Now that your Nowa local project is linked to a GitHub repository, any changes you make within Nowa or your IDE will be tracked in Git.

- **Auto-Save on Nowa:** Nowa automatically saves your changes, but you can as well trigger the saving manually by clicking on the `Save` button in the top-right corner of the Nowa interface or by using the `Ctrl/Cmd + S` shortcut.
- **Viewing Changes:** You can view the changes in GitHub Desktop or your preferred IDE (e.g., VS Code).
   - The changes will be listed as uncommitted modifications in the repository.
- **Committing Changes:** You can commit these changes to your repository or discard them if necessary.
   - **Frequent Commits:** Commit changes frequently to track your progress and ensure you have a backup at any point in time, allowing you to revert to a previous state if needed.
- **Discarding Changes:** If you discard changes on your local repo while the project is already opened in Nowa, you must then reopen the project to see the discarded state reflected in the project.

### 4. Current Limitations

- **Cloud Project Integration:** GitHub integration is currently limited to local projects. Integration for cloud-based projects is under development and will be available soon.
- **Direct Code Modifications:** Modifying the code directly in your IDE and then opening it in Nowa will work but not all the time, since this feature is still under development. Very soon, it will be possible to load any changes made in the repository directly into Nowa, even if those changes were direct code modifications in any place in the project.

## Tips for Using GitHub with Nowa

- **Frequent Commits:** Commit changes frequently to keep your repository updated and to ensure that you can track your progress effectively.
- **Branching:** Use Git branches to work on new features or experiments without affecting the main project. This approach helps maintain a clean and organized codebase.
- **Collaboration:** If you're working with a team, make use of GitHub's collaborative features like pull requests and code reviews to streamline your workflow.
- **Backups:** Even though your project is saved locally, regular commits to GitHub ensure that you have an offsite backup of your work.

By following these steps, you can seamlessly integrate GitHub into your Nowa development workflow, enabling better version control and collaboration.