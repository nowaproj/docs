---
sidebar_position: 2
---

# Supabase MCP

Starting with **Nowa 3.4** (released **January 19, 2026**), you can enable **Supabase MCP** to let the Nowa agent work on your Supabase backend while it builds your Flutter frontend.

Supabase MCP is a secure bridge between the agent and your Supabase project. When enabled, the agent can *understand your current backend* (database schema, policies, functions, storage, etc.) and then create or update what’s needed to accomplish your request — end to end.

---

## What you can build with it

With Supabase MCP enabled, you can build a **fully functional app from Nowa alone**, including:

- **Frontend**: screens, UI components, state, actions, and clean scalable code.
- **Backend**: tables and relationships, SQL, **RLS policies**, triggers, **Edge Functions**, and **Storage** configuration.
- **Connection layer**: the agent wires everything together so your UI is powered by your Supabase backend.

---

## How it works

1. In the **Chat panel**, enable the **Supabase MCP** icon.
2. If your project isn’t connected to Supabase yet, Nowa will ask you to connect it first.
3. Describe what you want to build.
4. The agent will:
   - Understand the task and your current project.
   - Create a plan covering both **frontend + backend** work.
   - Implement the changes and connect everything together.

![](/img/supabase/supabase_mcp.png)

:::note
For any backend operation, you’ll be asked for **approval** before anything is applied — so the agent can’t change your Supabase project unless you review and confirm it first.
:::

---

## What the agent can do in Supabase

Supabase MCP isn’t limited to tables.

- Create and edit **tables**, columns, and relationships
- Add **Row Level Security (RLS)** policies
- Create **triggers** and database functions
- Build **Edge Functions**
- Work with **Supabase Storage** (buckets, access patterns, and policies)

---

## Example use case

You can ask the agent to build a full chat app — it can create the needed database tables, set up RLS so messages are stored per user, and build the complete UI and logic in Nowa.

---

## Dev Diary (Nowa 3.4)

This Dev Diary walks through Supabase MCP in Nowa 3.4 by building a full Todo app with Auth, task title/description/priority/due date, and a statistics page — with tasks stored per user account.

<iframe width="767" height="431" src="https://www.youtube.com/embed/bTy3cnsXDnA" title="Nowa 3.4 Dev Diary - Supabase MCP" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
