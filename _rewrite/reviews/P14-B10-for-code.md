# P14-B10 for-code: facts moved off the Supabase pages

Each bullet is copied unchanged from the page version before phase 14 (verified in P13), with its source page. The
orchestrator moves them into `docs/code/generated-code.md`.

## #supabase

- (from `integrations/supabase/connect.md`, intro) "Nowa does the wiring: it saves your keys, adds the Supabase package and generates a `SupabaseService` that every other Supabase tool builds on."
- (from `integrations/supabase/connect.md`, "What Nowa adds to your project") "Adds the `supabase_flutter` package."
- (from `integrations/supabase/connect.md`, "What Nowa adds to your project") "Creates `lib/integrations/supabase_service.dart` with a `SupabaseService` class that has `initialize`, `signIn`, `signUp` and `signOut`. Everything you generate later is added to this class."
- (from `integrations/supabase/connect.md`, "What Nowa adds to your project") "Adds `await SupabaseService().initialize();` to `main.dart`, so Supabase starts with your app."
- (from `integrations/supabase/database.md`, "Change a function's code") "A generated function is ordinary Dart code that you can change."
- (from `integrations/supabase/database.md`, "Live queries", step 2) "Ask Nowa AI for a live query, or rewrite a generated function in **Edit Code**. Here's a minimal one:

   ```dart
   Stream<List<Map<String, dynamic>>> streamTodos() {
     return Supabase.instance.client.from('todos').stream(primaryKey: ['id']);
   }
   ```"

- (from `integrations/supabase/backend.md`, "Save your backend into the project") Table:

  | Path | What it holds |
  |---|---|
  | `supabase/migrations/` | One `.sql` file for each migration in your project's history. |
  | `supabase/functions/<function name>/index.ts` | The code of each deployed edge function. |
  | `supabase/nowa_setup.json` | The list of your storage buckets, plus a note. |
- (from `integrations/supabase/backend.md`, "Save your backend into the project") "It replaces what's already in `supabase/migrations`, `supabase/functions` and `supabase/nowa_setup.json`. Other files in `supabase/` stay."
- (from `integrations/supabase/backend.md`, "Save your backend into the project") "The folder follows the layout of the Supabase CLI, so the files also work with it."
- (from `integrations/supabase/backend.md`, "Set up a backend that came with a project") "It also shows the setup note stored in `supabase/nowa_setup.json`."
- (from `integrations/supabase/backend.md`, "Disconnect Supabase") "Nowa deletes `lib/integrations/supabase_service.dart`, removes the `supabase_flutter` package and takes the startup line out of `main.dart`. Your Supabase project, your models in `lib/models/`, the `supabaseUrl` and `supabaseAnonKey` constants and the `supabase/` folder stay as they are."
- (from `integrations/supabase/backend.md`, "Disconnect Supabase", warning) "Disconnecting removes every function in `SupabaseService`, including ones you edited or wrote. Screens and events that call them stop working. Connecting again creates a fresh `SupabaseService`."

## #models

- (from `integrations/supabase/database.md`, "Add a query from a template") "A model is a class with one field per column, so your screens can use `title` or `done` directly. A new model is saved in `lib/models/`, for example `lib/models/todos_model.dart`."
- (from `integrations/supabase/database.md`, "Add a query from a template") "**Use Existing Model** lists the models in your project's `models` folders."
