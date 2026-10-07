# Intentionally left out

Features found in the code that the docs deliberately do not cover, with the reason (D2: internal, debug,
developer-only, hidden behind a flag, unreachable or unreleased). Collected from the "Not user-facing" tables of
`research/features-*.md`; code refs are relative to `/home/user/nowa-master`.

| Area | Feature | Where in code | Reason |
|---|---|---|---|
| account-projects | "Learn how Nowa works" / "Start from Scratch" cards under "More ways to start", "Guided Walkthrough" banner | `lib/dashboard/dashboard_page.dart:242,314-344`, `packages/core/lib/src/walkthrough/walkthrough_engine.dart:11`, `packages/core/lib/src/announcements/announcement_provider.dart:27-45` | hidden flag (`WalkthroughEngine.isEnabled = false`) |
| account-projects | Dashboard debug buttons "Open mock project", "Open public project", "Test prompt to app" | `lib/dashboard/dashboard_page.dart:243,346-358` | debug (`kDebugMode`) |
| account-projects | Marketplace / sample-app browser (MarketplaceView, SampleAppDetails, AddProjectDialog) | `lib/dashboard/market_place/*` | dead code, not referenced anywhere |
| account-projects | Learning resources view | `lib/dashboard/learning_resources/learning_resources_view.dart` | dead code |
| account-projects | Dashboard top banner | `lib/dashboard/projects_view/top_banner.dart` | dead code |
| account-projects | Old help "?" menu (Tutorials, Documentation, Community, Shortcuts, Report an issue, Share feedback) | `lib/widgets/help_icon.dart` | dead code (replaced by the support panel) |
| account-projects | Package Name rename on the backend | `packages/core/lib/src/settings/project_detail_settings.dart:152-219` | debug build only |
| account-projects | MainSettings, PlatformFilesDebugSettings pages | `packages/core/lib/src/settings/project_settings.dart:27-28` | debug only |
| account-projects | AiAssistantUsageSettings / AiAssistantUsageHistory, CreditsSettings / TopUpCreditsView | `packages/core/lib/src/settings/ai_assistant_usage_settings.dart`, `packages/core/lib/src/settings/credits_settings.dart` | unreferenced (replaced by Billing/Usage) |
| account-projects | Project-level members UI (AddMemberView, ProjectMemberService invites) | `packages/core/lib/src/settings/member_settings.dart:105-212`, `packages/core/lib/src/services/workspace_service.dart:170` | unreferenced (only accept-invitation uses the service) |
| account-projects | RequestTemplateDialog | `packages/core/lib/src/dialogs/feedback_dialogs.dart:59-74` | unreferenced |
| account-projects | "What's New" status-bar button | `lib/status_bar.dart:30-31,290-312` | commented out |
| account-projects | "FUTURE" top-bar badge | `lib/project/top_bar_mapper.dart:43-48` | internal build channel (`isFuture`) |
| account-projects | `/redirect-to-playground`, `/redirect-to-project/:id` | `lib/router.dart:418-438` | internal redirects |
| account-projects | Google Ads attribution params (`gclid` etc.) | `lib/router.dart:164-171` | analytics, internal |
| account-projects | Welcome-discount text in tour/billing ("40% off", "Expires in 5 days") | `lib/project/onboarding/welcome_dialog.dart:53-77`, `lib/project/onboarding/completion_dialog.dart:38-57` | pricing detail, excluded by D3 (feature itself is user-visible) |
| account-projects | Linux desktop download | `/home/user/nowa/packages/core/lib/src/dialogs/download_nowa_dialog.dart:7-8` | unreleased (dev only, hidden) |
| account-projects | Project ID–based mock projects (`/project/mock…`) | `lib/project/project_page.dart:300-301,345-356` | debug only |
| ai | Max Mode agent ("Most powerful. (Consumes 5x more credits.)", `max_mode` entitlement, locked-reason texts) | `packages/ai/lib/src/agent/agent.dart:83-92` (not in `allAgents`, line 11); `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:978-1115` | Unreachable: defined but not in the agent list, so never offered (What's New 3.5 still mentions Max) |
| ai | "Vibe" agent | `packages/ai/lib/src/agent/agent.dart:110-117` | Experimental, never registered |
| ai | Local planning agent and local agent prompts | `packages/ai/lib/src/agent/planning_agent.dart:6-19`, `packages/ai/lib/src/agent/local_agent.dart` | Dev-only (unreferenced) |
| ai | Trace panel ("Trace"), Manual tool call panel ("ManualTool"), Libraries icon | `packages/ai/lib/src/ai_plugin.dart:24-27`, `lib/project/side_bar.dart:77-92` | Debug builds only (`kDebugMode`) |
| ai | Runner debug view in the chat panel | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:94` | Debug only |
| ai | "Load" debug history popup (Project ID / Session ID) | `packages/ai/lib/src/ui/sessions_history_list.dart:114-132,232-270` | Debug only |
| ai | Prompt debug snapshots, checkpoints debug dialog | `packages/ai/lib/src/ui/debug/*`, `packages/ai/lib/src/agent/agent_runner.dart:90-97` | Debug only |
| ai | Cloudflare docs MCP | `packages/ai/lib/src/mcp/cloud_flare_mcp.dart` | Unused (not in `AiManager.mcps`) |
| ai | `bash` tool (needs approval) | `packages/ai/lib/src/tools/bash_tool.dart:45`, commented out at `packages/ai/lib/src/agent/agent.dart:141` | Disabled |
| ai | `play_app` / `stop_app`, `get_supabase_schemas`, legacy tools (`list_problems`, `flutter_analyze`, `list_packages`, `add_package`, `get_declarations`…) | `packages/ai/lib/src/tools/play_app_tool.dart`, `get_supabase_schemas_tool.dart`, `tools/legacy/*` | Not in any agent toolset (internal or legacy) |
| ai | "AI Usage" / "Credits Overview" / "Usage History" settings pages | `packages/core/lib/src/settings/ai_assistant_usage_settings.dart`, `ai_assistant_usage_history.dart`, `credits_settings.dart` | Unreferenced (dead code); the live pages are Account Settings → Usage / Billing |
| ai | "AI has been working for a while now" banner (continue button) | `packages/ai/lib/src/ui/content_views.dart:503-539`; only produced by legacy parser `packages/ai/lib/src/models/ai_models.dart:22` | Probably unreachable with the current server transport (`fromServerJson` has no max-turns event); see Open questions |
| ai | Legacy assistant service | `packages/ai/lib/src/services/assistant_service.dart`, registered at `packages/core/lib/src/services/locator.dart:63` | Internal; chat uses `AgentService` |
| ai | Attachment lock tooltips ("…Try enabling thinking mode.") | `packages/ai/lib/src/ui/attachement_menu.dart:41,59`; `packages/ai/lib/src/ai_manager.dart:73-82` | Unreachable: all agents accept all attachment types |
| ai | Mock snapshot DB | `packages/ai/lib/src/checkpoints/mock_snapshot_database.dart` | Tests |
| code-ship | Marketplace / "Sample Projects" view (MarketplaceView, SampleAppDetails) | `lib/dashboard/market_place/marketplace_view.dart:11-178` (no reference anywhere else); `packages/marketplace/` holds only `android/` and `ios/` folders | Unreachable in 3.12.5 (also on dev). Sample templates only feed the playground picker (`lib/sandbox/sandbox_picker.dart:64-65`). |
| code-ship | MarketPlaceProvider mock items | `packages/core/lib/src/providers/market_place_provider.dart:3-60` | Dead mock data. |
| code-ship | macOS tab in Deployment / MacosBuildPage | `packages/core/lib/src/settings/deployment_settings.dart:54`, `:126`, `:138` | `kDebugMode` only; no desktop cloud builds for users. |
| code-ship | Files grid view with search, filter ("Show all files") and Add/Import button | `lib/project/panels/files_panel/files_panel.dart:57`, `:118-236`; `packages/core/lib/src/providers/file_provider.dart:14` | Unreachable: view type is always list. |
| code-ship | SSH key-pair form in "Set Git Credentials" | `packages/core/lib/src/settings/git_settings.dart:389`, `:404-414`, `:494-521` | Unreachable: credential type is fixed to access token. |
| code-ship | "Import template", "Export template", "Reanalyze file(s)" | `lib/project/panels/files_panel/add_lib_menu.dart:147-154`; `lib/project/panels/files_panel/file_context_menu.dart:91-119` | `kDebugMode` only. |
| code-ship | Package Name rename | `packages/core/lib/src/settings/project_detail_settings.dart:164-218` | `kDebugMode` only. |
| code-ship | "Main" and "Platform Files (Debug)" settings | `packages/core/lib/src/settings/project_settings.dart:27-28` | `kDebugMode` only. |
| code-ship | Libraries / Trace / ManualTool panels, DebugButton | `lib/project/side_bar.dart:77-92`; `lib/project/top_bar.dart:330` | `kDebugMode` only. |
| code-ship | "Debug" side panel (TestingPanel) and panel icons in the top bar | `lib/project/side_bar.dart:93-98`; `lib/project/top_bar_mapper.dart:58-62` | "New UX" experimental flag (editor-shell research decides). |
| code-ship | Web Development environment | `packages/core/lib/src/web_deploy/web_deploy_manager.dart:15-27` (commented out) | Removed in 3.8.2. |
| code-ship | `kLocalRunForCloud` flag | `packages/core/lib/src/runner/local_run_config.dart:13` | Internal switch (on); the feature itself is documented. |
| code-ship | Escape in the run overlay (StopAppAction) | `packages/nowa_run/lib/src/actions/nowa_run_actions.dart:23-29` | No-op action; don't document Escape as "stop". |
| data | Firebase "Create New Firebase Project" dialogs (`CreateProjectNowaDialog`, loading/success/error) | `packages/data/lib/src/firebase/setup/views/create_project_dialog.dart:5`, `:93`, `:177`, `:239` | dead code: not referenced anywhere; users create projects in the Firebase console |
| data | `FirebaseApiService.createProject` / `createGoogleCloudProject` | `packages/data/lib/src/firebase/firebase_api_service.dart:165-180`; `packages/data/lib/src/firebase/firebase_manager.dart:108-110` | internal, unused by the UI (the needed OAuth scope is commented out at `firebase_manager.dart:152`) |
| data | "Sample Settings" integration page | `packages/core/lib/src/plugin.dart:146-148`; `packages/core/lib/src/samples/samples_settings.dart:8-23` | debug-only (`kDebugMode`) |
| data | Flutter Blue Plus package config | `packages/core/lib/src/interpreter/packages/integrations/flutter_blue_plus_package_config.dart:8-63` | not in `SupportedPackages.all` (`packages/core/lib/src/interpreter/packages/dart_package.dart:61-88`), marked "TODO: still needs testing" |
| data | Old Supabase table/realtime picker for the Data Builder | `packages/data/lib/src/supabase/ui/sb_field.dart:59-276` | commented out |
| data | API "mock data" button | `packages/data/lib/src/api/views/api_panel/api_request_settings/api_request_settings.dart:33-36` | mentioned in a code comment only; no UI |
| data | `SupabaseService.queryTable`, `listenToTable`, `insertRecord` | `packages/data/lib/src/supabase/supabase_service.dart:18-22` | internal service API, no UI |
| data | Debug side panels "Libraries", "Trace", "ManualTool" | `lib/project/side_bar.dart:77-92` | debug-only (other researchers may list) |
| designer-core | Drawing a screen directly with a "screen" place tool (ScreenPlaceData) | `packages/designer/lib/src/design_experience/place_board.dart:22`, `packages/designer/lib/src/widgets/designer_tools.dart:87-88` | unreachable: the toolbar **Screen** button opens the template picker (`designer_tools.dart:155-158`); no key binds it |
| designer-core | Locking board items (`locked`) | `packages/core/lib/src/board/board_block.dart:174-175`, `packages/core/lib/src/board/board_canvas.dart:159-162` | not implemented ("uncomment when lock is implemented"); only used internally for the single view's root |
| designer-core | Screen-size list for an "Empty" template | `packages/core/lib/src/services/templates/add_template_action.dart:164`, `:288-315` | dead code: checks for "Empty", the template is **Empty Page** |
| designer-core | "Dissolve" menu entry | `packages/designer/lib/src/menus/widget_context_menu.dart:40-42` | commented out |
| designer-core | DefaultDragRule (slot picker overlay) | `packages/designer/lib/src/design_experience/drag_rule.dart:93` | not mapped by `findRule`; unused |
| designer-core | Developer panel ("Input Fields", "Test widget") | `packages/designer/lib/src/panels/developer_panel.dart:26` | debug/internal |
| designer-core | ViewsOverlay, CursorFollower overlays | `packages/designer/lib/src/panels/designer_board.dart:112`, `:149-184` | debug, unused |
| designer-core | Board code view (TextEditor) | `packages/designer/lib/src/board/board_editor.dart:39-43` | `kDebugMode` only; users see **Code view is not available for boards** |
| designer-core | Side bar **Libraries**, **Trace**, **ManualTool** | `lib/project/side_bar.dart:77-92` | `kDebugMode` only |
| designer-core | Files menu "Reanalyze file", "Export template", "Import template" | `lib/project/panels/files_panel/file_context_menu.dart:91-119`, `lib/project/panels/files_panel/add_lib_menu.dart:147-154` | `kDebugMode` only |
| designer-core | StageViewer / stageThumbnail | `packages/designer/lib/src/thumbnail.dart:38-110` | unused internal helpers |
| designer-core | `BackToBoardButton` (**Back to Board**) | `packages/designer/lib/src/widgets/back_to_board_button.dart:14` | defined, never used |
| designer-core | New UX designer parts (bottom AI bar, closed outline, hidden tool bar, component drill-in) | `packages/core/lib/src/settings/experimental_flags_dialog.dart:67-79`, `packages/designer/lib/src/panels/designer_board.dart:113-132`, `packages/designer/lib/src/design_experience/designer_board_controller.dart:425-430` | experimental flag (Settings → **Experimental flags** → **Edit** → **New UX**, off by default); with it on, double-clicking the board throws "Drill into component is not implemented yet". Recommend not documenting |
| designer-core | "Pure UI" manifesto | `docs/pure_ui_manifesto.md` (repo) | developer architecture guideline, no UI; not linked from the product. Its user-visible part (mocking on the board) is documented as "Placeholder values on the board"; its table is partly outdated vs `packages/core/lib/src/interpreter/mock.dart:244-289` |
| editor-shell | Sidebar panels **Libraries**, **Trace**, **ManualTool** | `lib/project/side_bar.dart:77-92` | debug builds only (`kDebugMode`) |
| editor-shell | Top bar debug button | `lib/project/top_bar.dart:330` | debug builds only |
| editor-shell | Top bar badge **FUTURE** | `lib/project/top_bar_mapper.dart:43-48` | internal "future" environment |
| editor-shell | Settings pages **Main**, **Platform Files (Debug)**, **Sample Settings** | `packages/core/lib/src/settings/project_settings.dart:27-28`, `packages/core/lib/src/plugin.dart:146-148` | debug builds only |
| editor-shell | File menu **Reanalyze file(s)**, **Export template**; Add menu **Import template** | `lib/project/panels/files_panel/file_context_menu.dart:91-119`, `lib/project/panels/files_panel/add_lib_menu.dart:147-154` | debug builds only |
| editor-shell | Ctrl/⌘ + O searching the whole project; boards in a text editor in code mode | `packages/core/lib/src/actions/tab_actions.dart:47`, `packages/designer/lib/src/board/board_editor.dart:40-42` | debug builds only |
| editor-shell | Walkthrough engine (step-by-step guided project tours, `/walkthrough` action) | `packages/core/lib/src/walkthrough/walkthrough_engine.dart:11` | disabled: `isEnabled = false`, never set true |
| editor-shell | Help "?" menu (**Tutorials**, **Documentation**, **Community**, **Shortcuts**, **Report an issue**, **Share feedback**) and `ReportProblemDialog` | `lib/widgets/help_icon.dart:6-79`, `packages/core/lib/src/dialogs/feedback_dialogs.dart:94` | widget never mounted (replaced by the Support panel) |
| editor-shell | Native menu bar (Edit → Undo/Redo, View → History) | `lib/project/nowa_menu_bar.dart` | never mounted |
| editor-shell | Status bar **What's New** button | `lib/status_bar.dart:31`, `:290-311` | commented out |
| editor-shell | `SavingStatus` widget; `DropFromOutside` (drop OS files on the board) | `lib/widgets/saving_status.dart`, `lib/project/drop_from_outside.dart` | never mounted |
| editor-shell | Global command palette (package default Ctrl/⌘ + K) | `packages/command_palette/lib/src/command_palette.dart:212`, `packages/command_palette/lib/src/models/command_palette_config.dart:8-10` | widget never mounted; only pickers used |
| editor-shell | Files grid view and its search bar, **Filter options** → **Show all files**, background menu **New Folder** / **Paste** | `lib/project/panels/files_panel/files_panel.dart:57`, `:118-172`, `lib/project/panels/files_panel/files_grid.dart:18`, `:51`, `lib/project/panels/files_panel/files_context_menu.dart:15-28` | unreachable: view type is always list |
| editor-shell | `sideBarIconShortcut` (web Alt variant of panel shortcuts) | `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:246-250` | unused helper |
| editor-shell | Problem popup **Navigate to Code** | `packages/core/lib/src/panels/errors_panel.dart:107` | commented out |
| editor-shell | Dynamic shortcut cheat sheet | `packages/core/lib/src/widgets/shortcuts_cheat_sheet.dart:252-394` | commented out |
| editor-shell | Assets panel (routed, no entry point) | `lib/project/panels/left_panel.dart:42`, `lib/project/panels/assets_panel.dart` | no sidebar icon routes to it in 3.12.5 (see Open questions) |
| logic | Copy/paste of Circuit nodes | `packages/code/lib/src/circuit_actions.dart:77-103`, `packages/code/lib/src/providers/circuit.dart:28-57` | Commented-out code; not available |
| logic | Circuit test harness (code cases, test app) | `packages/code/lib/code_test_app.dart`, `packages/code/lib/code_cases.dart` | Dev-only |
| logic | **Import template** in the Add to library menu | `lib/project/panels/files_panel/add_lib_menu.dart:147-154` | Debug builds only (`kDebugMode`) |
| logic | `ClassView` / `ClassEditor` class editor | `packages/core/lib/src/fields/class_editor.dart:81-143` | Never instantiated; replaced by the default Dart file editor (`packages/core/lib/src/plugin.dart:118`) |
| logic | Get/Set suggestions ("Get x" / "Set x") | `packages/core/lib/src/interpreter/suggestion.dart:151-165,431-441` | Not used by any menu |
| logic | **Set item** for lists | `packages/core/lib/src/interpreter/suggestion.dart:45-82`; filtered in `packages/core/lib/src/fields/field_link_menu.dart:340`, `packages/core/lib/src/fields/expression_builder/expression_builder_provider.dart:79-81` | Filtered out of every menu |
| logic | Items in the **NOWA** category (`dynamic`, `void`, `BoardPosition`, `WidgetsBinding`, `usePathUrlStrategy`) | `packages/core/lib/src/interpreter/library.dart:605-612` | Internal declarations; meaningless to users |
| logic | `AutoCopyWith` | `packages/core/lib/src/interpreter/auto_blocks.dart:243-317`, `packages/core/lib/src/themes/theme_class_declaration.dart:19` | Used for theme classes only, not added to models |
| logic | Circuit analytics events | `packages/code/lib/src/circuit_commands.dart:14,38,50`, `packages/code/lib/src/widgets/add_statement_menu.dart:56,65,73,83,100` | Internal telemetry |
| theme-assets | Assets panel ("Assets", "Import asset", "No assets yet") | `lib/project/panels/assets_panel.dart`, routed at `lib/project/panels/left_panel.dart:42` | Unreachable: its sidebar icon was replaced by Files in commit f2d4aba1f (2026-06-15); not in `MainSidebar.getIcons()` (`lib/project/side_bar.dart:34-100`), `?panel=` only resolves sidebar icons (`lib/project/workspace_options.dart:100-105`). |
| theme-assets | Files grid view ("Import" button, "New Folder" / "Paste" menu, folder tree) | `lib/project/panels/files_panel/files_grid.dart`, `files_context_menu.dart`; `files_panel.dart:57` | Unreachable: `ViewType.grid` is never set (default list, `packages/core/lib/src/providers/file_provider.dart:14`). |
| theme-assets | Legacy theme pages: "Colors from" (Light/Dark), ThemeDataDetails, AllThemes, ThemeActionsMenu "Remove"/"Rename" | `packages/core/lib/src/fields/color_fields.dart:86-130`, `packages/core/lib/src/file_system/widgets/previews/themes_preview/all_themes.dart`, `theme_details.dart:12-152`, `theme_actions.dart` | Dead code: `AllThemes` is never instantiated; old theme UI removed in 3.0.8. |
| theme-assets | Drop files from the computer onto the board | `packages/designer/lib/src/design/drop_on_board.dart:10-35` | `onDropFromOutside` has no caller. (Dropping files on the AI chat field works: AI area.) |
| theme-assets | "Request a Template" dialog | `packages/core/lib/src/dialogs/feedback_dialogs.dart:59-73` | Never shown (no caller). |
| theme-assets | Marketplace view / sample apps browser | `lib/dashboard/market_place/marketplace_view.dart`; `packages/marketplace` (only native folders) | `MarketplaceView` is never used; `packages/marketplace` is not in the workspace. |
| theme-assets | "Sample Settings" (publish project as sample) | `packages/core/lib/src/samples/samples_settings.dart`, `packages/core/lib/src/plugin.dart:146-148` | `kDebugMode` only. |
| theme-assets | "Import template" / "Export template" | `lib/project/panels/files_panel/add_lib_menu.dart:147-154`, `lib/project/panels/files_panel/file_context_menu.dart:115-119` | `kDebugMode && !kIsWeb` only. |
| theme-assets | "Reanalyze file(s)" | `lib/project/panels/files_panel/file_context_menu.dart:91-106` | `kDebugMode` only. |
| theme-assets | Local templates folder (`Documents/Nowa/templates/templates.yaml`) | `packages/core/lib/src/services/templates/templates_service.dart:178-305` | `LocalTemplatesService` is never registered (`packages/core/lib/src/services/locator.dart:51` registers `CloudTemplatesService`, which streams built-ins only). |
| theme-assets | Animated Onboarding Screen template | `packages/core/lib/src/services/templates/built_in/animated_onboarding_template.dart:3-6`, `packages/core/lib/src/services/templates/templates_service.dart:380` | Commented out of the template list. |
| theme-assets | Device preview "System" section (Locale, Theme Dark/Light) | `packages/device_preview/lib/src/views/tool_panel/sections/system.dart`, `packages/device_preview/lib/src/device_preview.dart:112-118` | Commented out of the default tools; not shown. |
| theme-assets | Nowa editor's own theme (`useMaterial3: false`) | `packages/nowa_ui/lib/src/globals/themes.dart:15`, `theme_provider.dart` | Editor UI styling, not the user's app; no user setting. |
| widgets | `ToolBoxPanel` and the category-headed `WidgetPicker` grid | `packages/designer/lib/src/panels/tool_box_panel.dart:6-14`; `widget_picker.dart:57-129` | defined but referenced nowhere; only place `widgetCategories` headings would be drawn |
| widgets | `WidgetPanel` (flat widget grid) | `packages/designer/lib/src/panels/widget_panel.dart:5-100` | not referenced; the sidebar **Widgets** panel is a different file (screens and components) |
| widgets | `DeveloperPanel` ("Dev" list of field editors) | `packages/designer/lib/src/panels/developer_panel.dart:6-60` | not referenced anywhere |
| widgets | `isBeta` flag and `BETA` pill | `widgets_to_add.dart:25,31`; `widget_picker.dart:402,491-519` | no entry sets it in v3.12.5 |
| widgets | Commented-out "Page indicator" widget | `widgets_to_add.dart:928-936` | disabled |
| widgets | Onboarding and walkthrough anchors (`WalkthroughAnchor` on Text Field, Button, Group, Icon rows; wrapper "Container"; validator and icon-picker anchors) | `widget_picker.dart:175-185`; `widget_details.dart:106-108,192-199` | internal tour hooks |
| widgets | Analytics event on widget creation | `common_design.dart:198-201` | internal analytics |
| widgets | `DataBuilderItem.loadFuture` / `loadStream` returning null | `packages/data/lib/src/firebase/firebase_field.dart:35-42` | unused hooks |
| widgets | Hard-coded service credential in the client for feedback forms (value deliberately not copied here) | `packages/core/lib/src/dialogs/dialog_data_sender.dart:9-16` | security finding for the product team, never for docs |
| widgets | `ButtonConnector` (Enabled -> create variable) mostly commented out | `widget_info.dart:598-651`; `button_fields.dart:150-175` | "Create Variable" may not show, see Open questions |
