---
title: Manage your Supabase backend
description: Save your Supabase backend into your project, rebuild it on another Supabase project, let Nowa AI manage it, or disconnect Supabase.
sidebar_label: Manage your backend
keywords: [Supabase backend, Pull Backend Files, Set up Backend, Set up Supabase backend, migrations, edge functions, storage buckets, supabase folder, Connect app with AI, Fix with AI, Disconnect, Supabase MCP, SupabaseService, template backend]
---

Your backend is more than your screens. It is the tables and rules in your Supabase project, its edge functions and its storage buckets. Nowa can save that backend into your project so it travels with your app, rebuild it on another Supabase project, and let Nowa AI keep working on it.

| Part of a backend | What it is |
|---|---|
| Migrations | SQL files that build your tables, rules and policies step by step. |
| Edge functions | Small server-side functions that run on Supabase. |
| Storage buckets | The containers that hold your files. |

## Before you start

- [Connect Supabase](connect.md) with **Connect**. Pulling and setting up a backend work through your Supabase account, so if you connected with **Use Keys**, Nowa opens the authorization step first.

## Save your backend into the project

**Pull Backend Files** copies your Supabase backend into the `supabase/` folder of your Nowa project. Use it when the backend should travel with the project, for example before you share or copy it. If you use [Git](../../code/git.md), commit the folder with your project.

1. Click ⋮ in the **Supabase** panel, then **Pull Backend Files**.
2. Click **Pull** in the **Pull backend files** dialog.
3. When **Backend files pulled** appears, click **Done**. The dialog reports how many migrations, edge functions and storage buckets it wrote.

| Path | What it holds |
|---|---|
| `supabase/migrations/` | One `.sql` file for each migration in your project's history. |
| `supabase/functions/<function name>/index.ts` | The code of each deployed edge function. |
| `supabase/nowa_setup.json` | The list of your storage buckets, plus a note. |

Pulling only reads your Supabase project, and nothing there changes. It replaces any files already in `supabase/migrations` and `supabase/functions`. Your table data, the files in your buckets, your auth provider settings and your secrets are not copied. The folder follows the layout of the Supabase CLI, so the files also work with it.

If Nowa shows **Pull failed** with "This Supabase project has no migration history, so its schema cannot be captured. Recreate it through migrations and pull again.", Supabase has no recorded migrations to copy. The Supabase connector can apply migrations: see [Let Nowa AI manage your backend](#nowa-ai).

## Set up a backend that came with a project

Some projects ship with a backend: a template, a copy of someone's project, or one you saved with **Pull Backend Files**. **Set up Backend** builds that backend on your own Supabase project.

1. Connect Supabase with **Connect**. If the project has backend files that your Supabase project doesn't have yet, Nowa opens **Set up Supabase backend**. It tells you how many migrations it will apply.
2. Click **Set up**. Click **Skip** to do it later.
3. Watch **Setting up backend**. Nowa applies each migration, deploys each edge function and creates the storage buckets that don't exist yet, then refreshes your tables.
4. When **Backend ready** appears, click **Done**, or click **Connect app with AI**.

{/* CAPTURE: id=integrations-supabase-backend-1 | state: signed-in cloud project that contains a supabase/ folder with migration files, freshly connected to an empty Supabase project with Connect (needs a Supabase account) | show: the Set up Supabase backend dialog with its message and the Skip and Set up buttons | crop: the dialog */}

To run it later, click ⋮, then **Set up Backend**. This item shows when the project has backend files. If nothing is left to apply, Nowa says "This project's backend is already set up." If you connected with **Use Keys**, Nowa asks you to authorize first. Afterward, click ⋮, then **Set up Backend** again.

Nowa skips migrations your Supabase project already has, and stops at the first step that fails. The result lists what it did: how many migrations it applied, edge functions it deployed and buckets it created, or "Your backend was already up to date." It also shows the setup note stored in `supabase/nowa_setup.json`. For a backend you saved with **Pull Backend Files**, the note reads: "Auth provider settings and secrets are not included; configure them manually after setup."

{/* CAPTURE: id=integrations-supabase-backend-2 | state: same project after clicking Set up and the run finished (needs a Supabase account) | show: the Backend ready dialog with its summary line, the setup note, and the Done and Connect app with AI buttons | crop: the dialog */}

**Backend ready** reminds you that your app still runs on the data it shipped with. Click **Connect app with AI** to switch it to your new backend. Nowa opens the **AI Assistant**, turns on the Supabase connector and sends a ready-made prompt for you, so this uses Nowa AI.

If a step fails, the dialog says **Setup stopped** and names the step. Click **Fix with AI** to open Nowa AI with a ready-made prompt, or **Close** to stop. After a fix, run **Set up Backend** again from ⋮.

## Let Nowa AI manage your backend {#nowa-ai}

With the Supabase connector on, Nowa AI can look at your backend and change it: tables, SQL, Row Level Security policies, triggers and database functions, edge functions and migrations. It works in **Agent** mode and asks for your approval before it acts. Turn it on with the Supabase icon in the chat field. See [Connect Figma and Supabase to Nowa AI](../../ai/connectors.md).

## Disconnect Supabase {#disconnect-supabase}

1. Click ⋮ in the **Supabase** panel, then **Disconnect**.
2. Confirm with **Yes**. Nowa asks "Are you sure you want to disconnect from supabase?" and warns that it will remove all queries and storage functions from your project.

Nowa deletes `lib/integrations/supabase_service.dart`, removes the `supabase_flutter` package and takes the startup line out of `main.dart`. Your Supabase project, your models in `lib/models/`, the `supabaseUrl` and `supabaseAnonKey` constants and the `supabase/` folder stay as they are.

:::warning
Disconnecting removes every function in `SupabaseService`, including ones you edited or wrote. Screens and events that call them stop working. Connecting again creates a fresh `SupabaseService`.
:::

## Next steps

- [Connect Supabase](connect.md)
- [Read and write Supabase data](database.md)
- [Store files in Supabase](storage.md)
- [Connect Figma and Supabase to Nowa AI](../../ai/connectors.md)
