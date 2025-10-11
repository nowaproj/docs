---
sidebar_position: 1
title: Using Git and Github with Nowa
description: How to create a Github Repo out of your project
---

## Introduction to Git & GitHub Integration

Using Git for your projects is a must these days to build big and successful apps. It provides a strong foundation for collaboration, version control, and safe experimentation in development.

### Benefits of Using Git with a Project

- **Track Changes**: See exactly what changed, when, and by whom.
- **Revert Mistakes**: Restore older versions of your code if something goes wrong.
- **Collaboration**: Multiple developers can work on the same project without stepping on each other’s changes.
- **Experiment Freely**: Try new ideas in branches without affecting your main codebase.
- **Backup**: Your project is safely stored in a remote repository like GitHub.

## Git Integration in Nowa

Nowa allows you to use Git and any Git service like GitHub to manage your repository. Whether you’re working locally or on the cloud, Git fits right into your workflow.

### What You Can Do with Git in Nowa

- **Create a Local Git Repository** from your Nowa project and use operations like commit, discard changes, create branches, and more.
- **Clone a Remote Git Repository** from GitHub (or other Git services) into your Nowa Cloud, and work with it using commit, push, pull, discard, and branching operations.
- **Push a Cloud Project** in Nowa directly to GitHub (or any Git hosting provider) to create a remote repository.

## Best Practice: All Repositories in Sync

![](/img/git/git-setup-explanation.png)


You can structure your workflow with three synced copies of your project:

- A **Local Repository** on your machine
- A **Cloud Repository** on Nowa
- A **Remote Repository** on GitHub

This gives you maximum flexibility:

- Use the **Nowa hybrid approach** locally—run Nowa side-by-side with your IDE and simulators, with instant sync and hot reload.
- Deploy your app to the App Store, Play Store, or Web directly from the **cloud repository**.
- Use the **remote repository** (GitHub) as the single source of truth shared by the whole team.

## Setting Up Git with Nowa

### If You Started Locally

1. Create a Git repository from your local project.
2. Push it to GitHub (or another Git service).
3. Clone the remote GitHub repo into Nowa Cloud.
4. Make changes locally, commit and push to GitHub, then pull from GitHub inside Nowa Cloud to keep it updated.

### If You Started on Nowa Cloud

1. Push your Nowa Cloud project to GitHub.
2. Clone the GitHub repo to your local machine to create a local repository.

Alternatively:

- Download the source code from your Nowa Cloud project.
- Create a Git repo locally and push it to GitHub.
- Set your Nowa Cloud project’s remote to point to that GitHub repository.

## Team Collaboration Made Easy

Nowa helps your team collaborate smoothly with no extra overhead. You can:

- Pull any teammate’s changes from the shared GitHub repository into your own environment.
- Open and work on the same project in Nowa without conflicts.
- No need for extra branches just because of using Nowa—use Git normally.

### How to Collaborate with Your Team

1. One team member creates the project and pushes it to GitHub.
2. Add the rest of the team to the remote repository on GitHub.
3. Each teammate can:
    - Clone the project into their **Nowa Cloud** account.
    - Or clone the project locally and open it with the **Nowa Desktop version**.
4. Everyone can commit their changes locally/cloud and push them to GitHub.

### When to Use Branching

- Create a new branch **for each feature or task**.
- Work on branches to avoid interfering with others’ work.
- Switch branches easily:
    - **On Nowa Cloud**: Use the Nowa interface to change branches.
    - **Locally**:
        - In VS Code or GitHub Desktop, switch via UI.
        - Or via command line:
            
            ```bash
            git checkout branch-name
            ```
            

This setup ensures everyone stays in sync, works efficiently, and uses the tools they’re comfortable with while enjoying the power of Nowa’s hybrid development environment.