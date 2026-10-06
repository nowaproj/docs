# W15 writer notes (Connect data and services: Supabase)

Batch pages: `docs/integrations/supabase/connect.md`, `auth.md`, `database.md`, `storage.md`, `backend.md`.
Sources: `research/features-data.md` (Supabase section: Connect, Use Keys, Supabase panel, Tables, Query Templates,
Storage Templates, Testing, Edit Code, Authentication, Stream queries, Pull Backend Files, Set up Backend,
Disconnect, Supabase MCP, Data Builder, Constants), `features-ai.md` (Supabase MCP, Connect app with AI), `features-logic.md`
(Circuit menus, Future Options, showMediaPicker). Code paths are relative to `/home/user/nowa-master` (v3.12.5).

A previous run saved nothing; at the start of this run none of the 5 pages existed.

Environment note: `supabase.com` is blocked by the session's egress policy (proxy answers 403 to CONNECT; recorded in
`/root/.ccr/` status). I did not route around it, so **no external Supabase docs link could be checked**. The pages
link only to `https://supabase.com` (home) and a few canonical docs URLs listed under each page; see "Unverified links".

Old Supabase pages checked for media: all `static/img/supabase/*` images and `static/videos/supabase/*` videos show the
old Nowa UI (or Nowa UI inside Supabase screen recordings), so none were reused.

## connect.md

Research: `features-data.md` sections "Connect (Supabase)", "Use Keys (Supabase)", "Supabase panel (connected)", "Tables (Supabase)",
"Supabase MCP (AI chat Supabase icon)".
Code refs relied on (spot-checked, all match the research unless noted):
- Panel is the plugin panel named `Supabase`: `packages/data/lib/src/supabase/supabase_plugin.dart:24-26`; unconnected page shows
  **Connect** / **Use Keys** (`ui/sb_setup/sb_oauth_setup.dart:69-80`); connected page is `SbOutline` (`ui/sb_panel.dart:20-28`).
  Screenshot `captures/ui-map/08-panel-supabase.png` confirms the unconnected state.
- Browser step, **Waiting for Authorization...**, 120 s timeout, "Authorization timed out. Please try again.":
  `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart:44-108`; flow and "already authorized skips the browser":
  `sb_oauth_setup.dart:120-137` (`_start` tries `getOrganization()` first).
- One organization at a time (`org = orgs.first`), "No organizations found. Please create a Supabase organization first.":
  `supabase_oauth_manager.dart:64-76`; **Change organization** restarts the browser step: `sb_oauth_setup.dart:155-158`.
- Project list labels, **Select** / **Unavailable** (anything but ACTIVE_HEALTHY), **Create New Project**, form labels and defaults
  (`<name>-backend`, first region = West US (North California), password min 4, eye toggle, **Back**, **Create Project** / **Creating...**):
  `ui/sb_setup/project_selection_dialog.dart:94-231, 260-285, 339-430`.
- "Connecting to <project>..." and error dialog with **Close**: `sb_oauth_setup.dart:207-248`.
- "Anon key not found for project ...": `supabase_oauth_manager.dart:85-87`.
- **Use Keys** page labels, help text, "Already Connected", new-keys note, **Open Supabase**: `ui/sb_setup/sb_keys_setup.dart:92-158, 185-198`;
  page title **Supabase Setup**: `ui/sb_setup/sb_app_bar.dart:37`.
- What Connect writes (package, `initialize`/`signIn`/`signUp`/`signOut`, `main.dart` statement, `supabaseUrl`/`supabaseAnonKey`):
  `supabase_manager.dart:188-246`; package config `packages/core/lib/src/interpreter/packages/dart_package.dart:135-146`.
- **Change API Keys** reopens the Connect/Use Keys page (`ui/sb_outline.dart:304-315`); reconnecting keeps the class and only rewrites
  `initialize()` and the two constants (`supabase_manager.dart:194-212`), so generated functions stay.
- Panel sections, hidden-when-empty rule, **Authentication** text ("Not logged in" / "Testing as: <email or id>"): `ui/sb_outline.dart:52-111, 113-138`;
  section filters `supabase_manager.dart:250-288`; badge names (uppercased) `block/sb_func_helper.dart:94-107`, `common/request_badge.dart:19`.
- Right-click **Rename** / **Remove**: `common/data_request_tile.dart:67-71`.
- ⋮ menu items and their order, **Set up Backend** only when `hasBundleCached`: `ui/sb_outline.dart:281-346`.
- **Tables** page and messages: `ui/sb_tables_page.dart:52-79`; it refreshes on open (`fetchTables` -> `refreshTables`, `:27-45`).
- Chat Supabase icon starts the same connect flow when not connected: `packages/ai/lib/src/mcp/supabase_mcp.dart:50-66`
  (`SbAuthDialog.show(context, forceProjectSelection: false)`); keys-only connection gets "OAuth Authentication Required" (`:68-105`).
- Backend files / Pull / Set up with keys-only ask to authorize: `ui/sb_outline.dart:237-245`, `migrations/sb_backend_setup_flow.dart:23-29`.
Left out / assumptions:
- Stripe "needs Connect" follows pages.md and the research's gating line; what a keys-only user would see when deploying Stripe is an open
  question (research), so the table only says "Need **Connect**".
- I did not state that Connect fails in the playground (no account). The code throws "User not logged in" inside `_connect`
  (`sb_oauth_setup.dart:130-137`) without showing it in the UI, so the dialog just keeps waiting; I only say "you must be signed in".
- Per-project vs per-account authorization is unconfirmed (calls pass the Nowa `projectId`, `supabase_oauth_service.dart:21-24`);
  the page says "already authorized Nowa **for this project**".
- Region list (16 regions) not reproduced; only the default is named.
- **Open Supabase** (menu) only opens a URL when the Supabase URL ends in `.supabase.co` (`sb_outline.dart:261-272`); not mentioned.
- Constants page: `supabaseUrl` / `supabaseAnonKey` have no config token, so they should list under **Custom Constants**
  (`app_constants_service.dart:70-79`, `constants_settings.dart:55-70`); the page only says they can be seen and edited in Settings -> General -> Constants.
