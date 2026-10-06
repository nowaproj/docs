---
title: Connect Supabase
description: Link your project to a Supabase project so your app gets sign-in, a database and file storage, then find your way around the Supabase panel.
sidebar_label: Connect
keywords: [Supabase, connect Supabase, Connect, Use Keys, API Url, anon key, Create New Project, Supabase project, backend, database, SupabaseService, Supabase panel, Change API Keys, Tables]
---

Connect Supabase and your app gets user sign-in, a Postgres database and file storage. Nowa does the wiring: it saves your keys, adds the Supabase package and generates a `SupabaseService` that every other Supabase tool builds on.

## Before you start

- A [Supabase](https://supabase.com) account. You can create the Supabase project from Nowa while you connect.
- For **Connect**, you must be signed in to your Nowa account.

## Choose how to connect

| | **Connect** | **Use Keys** |
|---|---|---|
| You give Nowa | Permission to use your Supabase account, in a browser step | Your project URL and anon key |
| Pick or create the project in Nowa | Yes | No, create it in Supabase first |
| [Backend files](backend.md) and [Nowa AI's Supabase connector](../../ai/connectors.md) | Work right away | Nowa asks you to authorize the first time you use them |
| [Stripe payments](../stripe.md) | Work | Need **Connect** |

Pick **Connect** unless you only have keys. You can switch later with **Change API Keys**.

## Connect with your Supabase account

1. Click the **Supabase** icon in the left sidebar, then click **Connect**.
2. Finish in the browser. A Supabase page opens: choose your organization and approve the request. Nowa shows **Waiting for Authorization...** and carries on by itself, for up to two minutes.
3. In the project list (titled **Projects in** and your organization's name), click **Select** next to the project you want, or [create a new one](#create-a-new-supabase-project).
4. Wait for the "Connecting to ..." message. The panel now lists your Supabase functions.

{/* CAPTURE: id=integrations-supabase-connect-1 | state: playground starter open, Supabase panel open and not connected | show: the Supabase icon highlighted in the left sidebar, the panel header, and the Connect and Use Keys buttons | crop: left sidebar + Supabase panel */}

If you already authorized Nowa for this project, Nowa skips step 2 and shows your projects right away. Nowa works with one organization at a time: click **Change organization** to authorize a different one. Projects that aren't active show **Unavailable** and can't be selected.

:::tip
You can also start from the chat. Click the Supabase icon in the chat field of the **AI Assistant** panel. If the project isn't connected yet, the same connection flow opens.
:::

### Create a new Supabase project {#create-a-new-supabase-project}

1. In the project list, click **Create New Project**.
2. Fill in the form.

   | Field | What to enter |
   |---|---|
   | **Project Name** | Starts as your Nowa project's name plus `-backend`. |
   | **Region** | Where Supabase hosts your database. Pick the one closest to your users. It starts as West US (North California). |
   | **Database Password** | A password for the database. Nowa needs at least 4 characters, so choose a strong one and keep it safe. The eye icon shows what you typed. |

3. Click **Create Project**. The button shows **Creating...**, then Nowa connects to the new project. Click **Back** instead to return to the project list.

## Connect with keys

1. Click the **Supabase** icon in the left sidebar, then click **Use Keys**. The page is called **Supabase Setup**.
2. Paste your project URL into **API Url**.
3. Paste your anon key into **Key**.
4. Click **Connect**.

Each field has a help icon that tells you where to find the value in your Supabase project settings: **Data API** for the URL and **API Keys** for the anon key. **Open Supabase** on this page takes you to your Supabase dashboard.

Use the anon key, not a publishable or secret key. Nowa doesn't support the new key types yet.

## What Nowa adds to your project

When the connection succeeds, Nowa:

- Adds the `supabase_flutter` package.
- Creates `lib/integrations/supabase_service.dart` with a `SupabaseService` class that has `initialize`, `signIn`, `signUp` and `signOut`. Everything you generate later is added to this class.
- Adds `await SupabaseService().initialize();` to `main.dart`, so Supabase starts with your app.
- Saves two constants, `supabaseUrl` and `supabaseAnonKey`. You can see and edit them in **Settings** → **General** → **Constants**. See [Keys and constants](../constants.md).

The anon key ships inside your app, so rely on Row Level Security (RLS) in Supabase to decide who can read and write what.

## Find your way around the panel

After you connect, the **Supabase** panel lists the functions in `SupabaseService`, grouped by what they do.

{/* CAPTURE: id=integrations-supabase-connect-2 | state: signed-in cloud project connected to a Supabase project that has a table, a few generated functions and a storage function, ⋮ menu open | show: the Authentication, Queries and Storage sections with their badges, and the open ⋮ menu | crop: Supabase panel */}

| Section | What it holds |
|---|---|
| **Generate a Query** | The **+** button adds functions from templates. See [Read and write Supabase data](database.md) and [Store files in Supabase](storage.md). |
| **Authentication** | Sign-in, sign-up and sign-out. Shows **Not logged in**, or **Testing as:** and the email of the user you signed in as. See [Sign users in with Supabase](auth.md). |
| **Queries** | Functions that read or change a table. |
| **Storage** | Functions that upload, download or delete files. |
| **RPC** | Functions that call a database function. |
| **Other Functions** | Functions that call a Supabase Edge Function. |

**Queries**, **Storage**, **RPC** and **Other Functions** only show up once they have a function. Every function has a badge for its kind: SELECT, INSERT, UPDATE, DELETE, STREAM, AUTH, RPC FUNCTION, STORAGE, OTHER FUNCTIONS, or UNKNOWN. Functions you or Nowa AI write into `SupabaseService` appear too, sorted by what their code does.

Click a function to test it. Right-click it to **Rename** or **Remove** it. **Remove** deletes the function from `SupabaseService`.

The ⋮ menu at the top of the panel has these items:

| Menu item | What it does |
|---|---|
| **Open Supabase** | Opens your project's dashboard in the browser. |
| **Tables** | Lists your tables and their columns. |
| **Change API Keys** | Opens **Connect** and **Use Keys** again, so you can switch to another project or other keys. Your functions stay: Nowa only updates the URL and key. |
| **Pull Backend Files** | Saves your backend into the project. See [Manage your Supabase backend](backend.md). |
| **Set up Backend** | Builds the backend that came with a project on your Supabase. It shows when the project has backend files. |
| **Disconnect** | Removes Supabase from the project. See [Disconnect Supabase](backend.md#disconnect-supabase). |

## See your tables

Click ⋮, then **Tables**. You get a read-only list of your Supabase tables with their column names. Click the back arrow to return.

Nowa has no table editor. Create and change tables in Supabase, or ask Nowa AI to do it. Created a table after you connected? Opening **Tables** refreshes the list. If there are no tables, Nowa says "No tables found, create tables in Supabase and you will see them here."

## If something goes wrong

| What you see | What to do |
|---|---|
| Authorization timed out. Please try again. | Click **Connect** again and finish the browser step within two minutes. |
| No organizations found. Please create a Supabase organization first. | Create an organization in Supabase, then click **Connect** again. |
| **Unavailable** next to a project | Only active projects can be selected. The project's status is shown under its name. |
| Anon key not found for project … | Nowa couldn't read an anon key for that project. Check the project's API keys in Supabase. |
| Using the new Supabase keys is not currently supported, please use the anon key. | You pasted a publishable or secret key. Paste the project's anon key into **Key**. |

## Next steps

- [Sign users in with Supabase](auth.md)
- [Read and write Supabase data](database.md)
- [Store files in Supabase](storage.md)
- [Manage your Supabase backend](backend.md)
