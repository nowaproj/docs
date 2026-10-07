---
title: Account settings
description: Update your name and photo, change your email or password, connect Figma, log out, or delete your account.
sidebar_label: Account settings
keywords: [account, profile, account details, change email, change password, delete account, connected accounts, Figma, log out, logout, sign out, settings, General Settings]
---

Account settings is the one place for who you are in Nowa: your profile, your sign-in details, the accounts you've connected, your plan and your editor setup.

## Open account settings

- On the dashboard, click **Settings** in the sidebar.
- In a project, click your avatar in the top bar, then **General Settings**.

The window has two groups. In a narrow browser window, such as on a phone, it opens as a full-screen list of the account pages instead.

| Group | Page | What's there |
|---|---|---|
| **Account Settings** | **Account Details** | Your profile, email, password, connected accounts and account deletion. This page. |
| | **Billing** | Your plan, **Adjust Plan**, **Extra AI Usage** and **Invoices**. See [Plans, billing and AI usage](./plans-and-usage.md). |
| | **Usage** | How much of your plan's usage you've used, and **Extra AI Usage**. See [Plans, billing and AI usage](./plans-and-usage.md). |
| **Editor Settings** | **Local Setup** | Flutter SDK, projects folder and VS Code path (desktop app). See [Install the desktop app](../get-started/desktop-app.md). |
| | **Git** | Your GitHub connection and Git credentials. It needs a plan that includes Git. See [Connect GitHub](../code/github.md). |

{/* CAPTURE: id=account-account-settings-1 | state: signed in (throwaway account), dashboard sidebar Settings, Account Details page showing | show: the Account Settings and Editor Settings groups on the left and the Account Details page (First Name, Last Name, Email with Change Email, Password, Delete Account, Connected Accounts); blur the email | crop: the window */}

Nowa's editor has a single dark look. There is no light/dark switch and no interface-language setting. Your app's light and dark themes are separate: see [Create and edit themes](../design/themes.md).

## Update your profile

1. Open **Account Details**.
2. Edit **First Name** or **Last Name** and press <kbd>Enter</kbd>. Nowa doesn't save an empty name.
3. To change your photo, click the picture and choose an image from your files.

A status line at the top right confirms each change, for example "Profile updated" or "Profile picture updated".

## Change your email {#change-email}

You can change your email if you signed up with an email address. If you use Google to sign in, **Account Details** shows "Google SignedIn" instead of **Change Email**.

1. In **Account Details**, click **Change Email**.
2. Type the new address in **New Email** and click **Verify Email**. Nowa sends a code to that address and says "OTP Code Sent on" followed by the address.
3. Type the code in the **OTP Code** box, which shows once the code is sent, and click **Verify OTP**. "Email verified" confirms it.

## Change or set your password {#change-password}

1. In **Account Details**, click **Change Password**. If your account has no password yet, for example because you signed up with Google, the button reads **Set Password**.
2. Type your **Current Password** (only if you have one), then your **New Password** and **Repeat New Password**.
3. Click **Submit**.

If the two new passwords differ, Nowa says "Please make sure the passwords match". If you've forgotten your current password, click **Restore Password** in the line "Forgot your Password?". Nowa opens **Reset your password**, where you enter your email and click **Send reset link**. You can also start from **Forgot Password?** on the sign-in page. See [Create your account](../get-started/create-account.md).

## Connect Figma {#connect-figma}

Under **Connected Accounts**, the **Figma** row lets Nowa AI use your Figma account, for example to bring in images, icons, colors and text styles.

1. Click **Connect**. A **Waiting for Authorization...** dialog appears while you approve Nowa in your browser.
2. When it finishes, the row shows your Figma name and email, and the button reads **Disconnect**.

To disconnect, click **Disconnect**, then **Yes** under "Are you sure?". Nowa warns "You will need to reconnect to Figma if you want to use Figma features again." Using Figma from the chat is covered in [Connect Figma and Supabase to Nowa AI](../ai/connectors.md).

## Log out

- On the dashboard, click the logout icon next to your name in the sidebar (tooltip **Logout**).
- In a project, click your avatar, then **Logout**.

Either way, Nowa signs you out and opens the sign-in page.

## Delete your account {#delete-account}

:::warning
Deleting your account is permanent. Nowa tells you "This action can not be reversed" and deletes all the resources listed on the next page.
:::

1. In **Account Details**, click **Delete Account**.
2. Optionally write a reason under "Reason for deleting". If your account has a password, enter it.
3. Click **Delete Account**. Nowa checks what the deletion would remove.
4. On **Account Deletion Details**, read the **Resource Deletions** list. Click **Delete Account** again to confirm. You're signed out and the account is gone.

If Nowa can't delete the account yet, this page says "You can't delete your account, contact support for more information." and lists the reasons. See [Get help](./help.md).

## Next steps

- [Plans, billing and AI usage](./plans-and-usage.md)
- [Project settings](./project-settings.md)
- [Get help](./help.md)
