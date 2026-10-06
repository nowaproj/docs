# W11 writer notes (Projects and account, Troubleshooting index)

Writer: W11 (Sonnet). Source of truth: `/home/user/nowa-master` (v3.12.5). Paths below are relative to that repo.
Research read: `features-account-projects.md` (all), `features-editor-shell.md` (Support, Notifications, Settings,
View only, Experimental flags), `features-ai.md` (usage and credits), `features-code-ship.md` (Permissions, App
details, Run/Deploy messages). Spot-checked the code for every label quoted below (dashboard sidebar, projects view,
project menu, workspace dialogs, Account Settings, Billing/Usage/Buy credits, support dialog, Project Details,
Sharing, Permissions, Constants).

Conventions I followed: `.md` files are MDX in this site, so no raw `<...>` or `{...}` in prose (placeholders are
rewritten or put in code). Headings I link to from other pages have explicit ids. No prices, credit amounts or
limits (D3).

## Corrections to the research (code wins)

- **Experimental flag defaults**: research says both flags default off. Code: a project's `.nowa/settings.json`
  template writes `'experimental': {'load_packages': true}` (`packages/core/lib/src/file_system/templates/common/nowa_settings_template.dart:17`),
  so **load packages** is on in projects created or imported in Nowa; **New UX** is off (`settings_service.dart:46-47`
  getters default false only when the key is missing). Docs say "on in new projects, off for New UX".
- **App Settings integrations**: research (account) lists "Nowa Mobile Ads", "App Links"; the UI labels are **AdMob**
  and **Deep Links** (`admob_package_config.dart:15`, `app_links_package_config.dart:10`) plus **Firebase**
  (`firebase_plugin.dart:127`); matches the reference screenshot `captures/ui-map/15-settings.png`.
- **Sharing is a section, not a settings page**: it sits at the bottom of **Project Details**
  (`project_detail_settings.dart:86-92`). Glossary row "Project settings" lists it as a page; fix when the glossary is built.
- **Support chat "Enter sends"** (editor-shell research): not supported by the code I read. The message field is a
  multi-line `TextField` (`support_dialog.dart:395-405`, `minLines: 2, maxLines: 10`); only `onSubmitted` is set, which
  does not fire on Enter for multi-line fields. Docs say "click the send button".
- **RECENTS**: built from the projects already loaded for the selected workspace plus local projects
  (`dashboard_mapper.dart:72-82`, `projects_view_provider.dart:140-165`), so it is "up to five recently edited
  projects of the current view", not a global list. Docs say "up to five projects you edited most recently".

## docs/account/projects.md

Key claims and code refs:
- Dashboard sidebar and **Projects** header labels: `packages/nowa_ui/lib/dashboard/projects_view.dart:171-264` (title, **Search...** hint
  `nowa_widgets.dart:298`, **Sort by** `:395`, grid/list toggle, **New project** / compact **New**, menu entries **New project**, **Clone from GitHub**,
  **Import project** gated by `NPlatform.isDesktop`), **Load More** `:538-554`, "No projects found" / "Try a different search term." `:158-174`.
- Project menu entries and which projects get them: `projects_grid.dart:289-331` (flags `canMoveToWorkspace` cloud, `canUploadToCloud` / `canUnlist` local:
  `lib/dashboard/dashboard_mapper.dart:66-68`). Delete dialog: `lib/dashboard/dashboard_page.dart:253-303` ("This action cannot be reversed." / **Delete Project**;
  git-repo exception "The files stay on disk." / **Remove**). Folder erased: `projects_view_provider.dart:278-289` -> `NFileSystemRoot.removeProject()`
  ("CAUTION: this is not undoable", `nfile_impl.dart:664-668`). **Remove from list** has no confirmation (`dashboard_page.dart:156`).
- **Move to...** dialog, **Move** button: `lib/dashboard/projects_view/move_project_dialog.dart:31-65`.
- **Project not found** screen buttons: `lib/project/missing_project_folder.dart:75-129`.
- New project dialog: `lib/dashboard/create_new_project/new_project_dialog.dart:33-316` (**Project name**, **Advanced**, **Local-only project**,
  web notice, **Create project**; request carries no workspace, `:84`, `project_service.dart:103-105` + `project.dart:223`). So "no workspace, appears under Personal" is
  inferred from the client (server could in theory default otherwise): **open question for the verifier**.
- Name rules and messages: `packages/core/lib/src/file_system/naming.dart:176-190`; package name rule `:192-217` (verified for local projects `local_project_service.dart:25-28`
  and cloud import `start_project_provider.dart:39-41`; for brand-new cloud projects the server decides, so the table scopes the rule to "local projects and imports");
  default bundle id `:241-255`.
- Clone/import summary and plan gate: `start_project_provider.dart:58-70` (`PaymentDialog.show(... feature: 'git')` = **Time to level up**, `nowa_dialogs.dart:93-120`);
  workspace chips `github_clone_dialog.dart:215-226`, import dialog per research.
- RECENTS up to five: `dashboard_mapper.dart:7,72-82`. Remembered workspace and sort: `projects_view_provider.dart:253-262`.

Left out / why:
- Grid vs list defaults, folder-name subtitle on cards, "Edited" label formats other than one example: too detailed.
- Dashboard debug buttons, "Learn how Nowa works" cards, Marketplace: not user-facing (research "Not user-facing").
- Import dialog details (package picker, forced local-only for monorepos): left to `code/import.md` (W10).

Assumptions / open questions:
- "Clone from GitHub needs a plan that includes it": code gates on the `github` entitlement; plan names not stated (D3).
- Page is about 850 words.

## docs/account/workspaces.md

Key claims and code refs:
- Switcher entries (**Personal** "Projects not in a workspace", **WORKSPACES**, **Create workspace**, gear): `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:560-680`.
- Create dialog ("Create Workspace", **Workspace Name** hint, **Create**, "Name cannot be empty", random color): `lib/dashboard/side_bar/workspace_widgets.dart:10-103`;
  new workspace becomes selected: `projects_view_provider.dart:196-200`.
- Workspace settings dialog (**Members**, invite row owner-only `_isOwner`, roles **Editor**/**View Only** default Editor, **Invite**, "Please enter a valid email address",
  **Save changes** owner-only, **Delete workspace** / **Leave workspace** + texts): `workspace_widgets.dart:105-512`.
- Member role badge menu (**Remove member**, **Make <role>**), **Pending**, **Cancel invitation** / **Resend invitation**, self-role warning:
  `packages/core/lib/src/settings/member_settings.dart:214-421`. Role names: `packages/core/lib/src/models/project.dart:7-38`.
- Accept invitation ("Invitation accepted!", **Ok**): `lib/invitation_page.dart:18-46`; `email` query param sign-out: `lib/router.dart:46-71,305-313`.
- **Move to...** / **Move**: `lib/dashboard/projects_view/move_project_dialog.dart:31-65`; local projects never in a workspace: `projects_view_provider.dart:28-30,64-65`.
- View Only behaviour: `project_provider.dart:573` (role == viewer), `designer_tools.dart:208-219` (**View only**), `widget_context_menu.dart:20-31` (**Copy**, **Export as image...**),
  `status_bar.dart:42` (no Save), `nowa_code_editor.dart:181` (read-only), `files_panel.dart:221` (**Add**/**Import** disabled), `file_context_menu.dart:36-56`,
  `project_detail_settings.dart:87` (Sharing hidden).

Left out / why:
- No claim about live co-editing, comments or seat limits: not found in the client (research summary says none exist in 3.12.5); I did not state the absence on the page.
- Per-role permissions beyond View Only: the client only restricts viewers (`isViewOnly`); server mapping unknown. **Editor** is described only as the default role.
- Workspace member count badge ("N people") not documented (counts "taken seats", server value).

Assumptions / open questions:
- "Nowa emails an invitation": the email is server-side; the code only calls `sendInvitation`.
- The role-badge menu is shown to every member (`MemberItem` ignores `canEdit`, `member_settings.dart:265-301`). The page describes the menu without saying who may use it;
  verify whether the server rejects non-owners.
- Delete workspace "projects move to your Personal space" is the app's own confirmation text.

## docs/account/project-settings.md

Key claims and code refs:
- Open/close: gear tooltip **Settings**, shortcut <kbd>Ctrl/Cmd+,</kbd>, Back closes: `packages/nowa_ui/lib/top_bar/top_bar_view.dart:738-763`, `lib/setup_general_actions.dart:33`,
  `lib/project/top_bar.dart:154,219-247` (`_back`, `_toggleSettings`).
- Page order and hidden pages in sandbox sessions / on web: `packages/core/lib/src/settings/project_settings.dart:18-45` (comment explains sandbox: "act on a backend project the user owns").
  Group headings **General** / **Integrations**: `settings.dart:103-121`. Integration labels: see "Corrections" above; reference screenshot `captures/ui-map/15-settings.png`.
- Project Details fields, helper texts and errors: `packages/core/lib/src/settings/project_detail_settings.dart:12-338` (Project Name, Package Name read-only unless `kDebugMode`, App Name, Bundle Identifier
  regex `:120-121`, Build version regex `:292-302`, Build number `:310-326`, **Shared Preferences** / **Clear** `:46-67`, **Experimental flags** / **Edit** `:69-84`, Sharing hidden for view-only/sandbox `:87`).
  Version stored as `<name>+<number>`: `packages/core/lib/src/settings/pubspec_manager.dart:60-63`.
- App icon: `app_icon_settings.dart:10-210` (**App Icon**, **Change all**, platform tiles, **Change Icon**), `app_icon_manager.dart:9-35,95-175` (1024 rule `:170-171`, Windows icons only for Change all `:140`, not for a single platform `:111`).
- Permissions: `packages/core/lib/src/settings/permissions/permission_settings.dart:8-151`, names/defaults `packages/core/lib/src/services/permissions_service.dart:104-213`; platform file rewrite `:80-82`; migration of existing permissions `:12-24`.
  Problems **Fix** for package permissions: `package_config_service.dart:388-430` (via editor-shell research).
- Constants: `packages/core/lib/src/settings/constants_settings.dart:9-284` (description text, **Custom Constants**, tooltips **Add custom constant**, **Confirm**, **Cancel**, **Remove**, empty text); file path `file_template.dart:35`.
- Sharing summary and confirmation dialog: `packages/core/lib/src/settings/sharing_settings.dart:13-501` (details live on `test/share.md`, W7).
- Experimental flags dialog: `packages/core/lib/src/settings/experimental_flags_dialog.dart:7-108` (**Apply** / **Cancel**, restart), defaults `nowa_settings_template.dart:17`, **NEW UX** badge `lib/project/top_bar_mapper.dart:43-48`.
- Project info popup: `lib/widgets/project_details_popup.dart:6-120`, trigger `lib/status_bar.dart:251-266`.

Left out / why:
- Settings pages **Main**, **Platform Files (Debug)**, Package Name rename: debug builds only (`kDebugMode`).
- Integration page contents: other batches (W14-W17).
- No Nowa AI tip: the agent has no tool for project settings (it can edit files, but permissions live in `.nowa/settings.json`).
- Link options of Sharing (**Code mode**, **Preview**, **Assistant**, **Opened file**): covered by `test/share.md` (W7); only summarized.

Assumptions / open questions:
- "App stores expect the build number to go up" is general store behaviour, not a Nowa rule (the app only checks it is digits).
- "Git ... needs a plan that includes Git": code message "Your plan does not support git integration" (`git_settings.dart:545-550`, `github` entitlement).
- Shared Preferences **Clear** only affects `DesignerNowaSharedPreferences` (values saved while the app runs on the board, `shared_preferences_library.dart:145-170`), not a compiled/published app.

## docs/account/account-settings.md

Key claims and code refs:
- Open: dashboard sidebar **Settings** (`dashboard_side_bar.dart:196-204`, `dashboard_page.dart:~212` `AccountEditorSettings.show`); in a project avatar menu **General Settings** / **Logout**
  (`packages/nowa_ui/lib/top_bar/top_bar_view.dart:609-691`).
- Window groups and tab names (**Account Settings**: **Account Details**, **Billing**, **Usage**; **Editor Settings**: **Local Setup**, **Git**), Billing/Usage hidden when `!kShowPurchaseUi`, mobile list:
  `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:15-35,115-160`, `mobile_settings_page.dart:7-60`. Git plan message: `git_settings.dart:545-550`.
- Account Details page: `.../account_details/account_details.dart:11-100` (**Password**, **Change Password**/**Set Password**, **Delete Account**, **Connected Accounts** when `FigmaIntegration.enabled`),
  `main_info_section.dart:8-171` (**First Name**/**Last Name** saved on editing complete, empty not saved `:128-145`, avatar picker, **Email** read-only, **Change Email** or "Google SignedIn").
  Status texts: `packages/core/lib/src/providers/user_provider.dart:167-221` ("Profile updated", "Profile picture updated", "OTP Code Sent on", "Email verified", "Password updated", "Account deletion verified", "Account deleted").
- Change email: `.../change_email.dart:36-106` (**New Email**, **Verify Email**, **OTP Code**, **Verify OTP**). Change password: `.../change_password.dart:30-110` (labels, "Please make sure the passwords match",
  **Restore Password** -> `/auth/request-reset-password`).
- Delete account flow and texts: `.../delete_account.dart:10-293` (two-step: `deleteNow:false` check, then `deleteNow:true`).
- Figma connected account: `packages/core/lib/src/figma/figma_settings_section.dart:7-97`; waiting dialog `packages/core/lib/src/settings/oauth_settings/auth_dialog.dart`.
- Log out: `dashboard_side_bar.dart:236-246` (tooltip **Logout**).

Left out / why:
- AppSumo partner sign-in, Continue with Google / Apple, onboarding survey: sign-in is W1 (`get-started/create-account.md`).
- Local Setup walkthrough and Git credentials: other batches (W1 `desktop-app.md`, W10 `github.md`).

Assumptions / open questions:
- Which conditions block account deletion (reasons list comes from the server): page quotes the app's own message and says "see Get help".
- "Resource Deletions" table content (Name, Type) is server data; not described beyond its title.

## docs/account/plans-and-usage.md

Key claims and code refs (no prices, credit amounts or limits anywhere on the page; plan names not used except "free plan"):
- Billing page = current plan + **Extra AI Usage** + **Invoices**: `packages/core/lib/src/billing/widgets/billing_settings_page.dart:8-57`; current plan text, past-due warning ("Your last payment failed." +
  **Update payment method** -> portal link), **Adjust Plan**: `current_plan_view.dart:9-135`; invoices table (**Date**, **Status** Paid/Unpaid, **Reason**, **Total**, "No invoices yet", "x of y"): `invoices_settings_page.dart:53-208`.
- Plans page: heading "Plans that grow with you", **Monthly**/**Annual** (`billing_models.dart:249-263`), **Current** badge, **Show**/**Hide**, **Subscribe**/**Manage**, portal vs checkout (`adjust_plan_page.dart:77-200,300-345,470-495`).
  Checkout result page "Payment Successful!" / "Payment Failed" / **Close Tab**: `lib/billing_status_page.dart:28-51`, routes `lib/router.dart:330-344`.
- Shortcuts to Adjust Plan: **Upgrade your plan** (sidebar, `dashboard_side_bar.dart:146-155`, opens plan/plans `dashboard_page.dart:~213`), top-bar **Upgrade** only on free plan / no subscription
  (`lib/project/top_bar_mapper.dart:109-120`, `top_bar_view.dart:583-607`). Sidebar offer shows for no subscription, free, `launch` type and AppSumo (`dashboard_mapper.dart:44-45`): page only says "shortcut", not who sees it.
- AppSumo link: `lib/integrations/appsumo.dart:12-26` (remembers `/plans`, locks email, hides Google).
- Usage page: `packages/core/lib/src/billing/widgets/usage_settings_page.dart:10-317` (**Plan Usage Limits**, "Resets in", "N% used", **Extra AI Usage**, "Top up your account to continue using Nowa AI if you hit a limit.",
  **Current balance**, **Buy credits**). The balance is shown as a dollar amount; page does not quote it.
- Buy credits page: `buy_credits_page.dart:52-200` (**Need more usage?**, preset buttons, **Other**, **Enter custom amount**, **Credits** / **Discount** / **Subtotal**, "Taxes may apply at checkout", **Checkout**,
  locked state text + **Upgrade Plan**; gate `EntitlementKeys.topUpCredits`).
- In-chat usage: `packages/ai/lib/src/ui/chat_panel/remaining_credits_view.dart:10-209` (ring, labels, tooltips, threshold constant not quoted), `ai_chat_panel.dart:120-182` (token counters, **Session Details**),
  `session_details_popup.dart:28-100` (**Details**, **Session ID**, **Credits Used**, **Global Usage**; last two hidden when `!kShowPurchaseUi`).
- Out of credits banner and buttons: `packages/ai/lib/src/ui/content_views.dart:228-324`; usage-row button (**Upgrade** / **Buy credits**): `remaining_credits_view.dart:158-209`; **Send** disabled:
  `ai_chat_field.dart:660-662`.
- **Invite a Friend**: sidebar `dashboard_side_bar.dart:159-179`; dialog `packages/ai/lib/src/ui/referral_invite_dialog.dart:100-221` (title, **Your invite link**, **Copy link**, progress texts, cap text). Credit amounts come from the server: not stated.
- **Time to level up**, default text, **Premium** pill, mobile variants: `packages/core/lib/src/widgets/nowa_dialogs.dart:89-180`; custom texts `lib/project/run/deploy_button.dart:188`.

Left out / why:
- Free Weekend **FREE** pill (transient promotion, research open question 13), welcome-discount tags on **Adjust Plan** / **Buy credits** (pricing detail, D3).
- Per-plan feature lists, prices, limits, which plan allows buying credits, GitHub, desktop or code download: D3 (link to nowa.dev/pricing only).
- Dashboard "Unlock more now!" upgrade dialog 15 minutes after load on the free plan (`dashboard_provider.dart:127-135`): marketing pop-up, not described.

Assumptions / open questions:
- "Rewards are capped": the cap value is server data.
- The sentence about the billing portal covers subscriptions whose payment provider is Stripe (`adjust_plan_page.dart:478-486`); worded as "managed in the billing portal" to avoid naming the provider.
- Whether the free plan counts as "managed in the billing portal" is unknown; the page does not claim it.

## docs/account/help.md

Key claims and code refs:
- Support button (**?**, `Icons.question_mark`, red badge, "9+" cap): `packages/nowa_ui/lib/support_icon_button.dart:9-42`, `nicons.dart:11`; mounted bottom-right in the editor `lib/project/project_page.dart:137`;
  mobile layout **More** -> **Support**: `lib/project/nowago/mobile_view.dart` (editor-shell research).
- Panel home texts ("Hey There", "Let’s help you build a great app!", **Your tickets**, statuses via `ticket_models.dart:48-51`, collapsed after 2 tickets `support_dialog.dart` `_collapsedTicketCount`, **Show all N tickets**,
  **Report an issue** / "Open a project to report an issue", **Chat with support**, **Documentation** https://docs.nowa.dev, **YouTube Channel** https://www.youtube.com/@nowadev, **Hire an Expert**):
  `packages/nowa_ui/lib/components/support_dialog.dart:170-215,455-545`.
- Chat view ("Nowa Team Support", empty text, **Include a snapshot of the current project** only for the first bug-report message `_canIncludeSnapshot` `:262-263`, hint "Type a detailed message...", image + send buttons): `support_dialog.dart:255-410`.
  Local snapshot zip and email deep link `/?ticketId=`: research `features-account-projects.md` (Support panel) + `lib/dashboard/dashboard_provider.dart:108-120` ("This support conversation isn't accessible with your current account.").
- Other entry points: **Report** on "Bug report ready" (`packages/ai/lib/src/ui/tool_inline_views.dart:638-694`), **Report issue** on preview internal error (`packages/nowa_run/lib/src/ui/nowa_run_error_actions.dart:132-139`).
- **Hire an Expert** dialog (booking page and form open externally): `packages/nowa_ui/lib/hire_expert_dialog.dart:8-106`. The dialog shows an hourly rate; the page says "shows the expert rate" without a number (D3).
- **Learning Resources** opens https://docs.nowa.dev: `dashboard_side_bar.dart:197-204`, `dashboard_page.dart:197`.
- Notifications bell and banners: `packages/nowa_ui/lib/src/components/notification_bell.dart:70-140` ("Notifications", "N new", "No notifications"), banner close tooltip **Dismiss announcement** `packages/core/lib/src/announcements/widgets/notification_banner.dart:76`.
- Discord https://discord.gg/ByKfn3H7gX (`lib/project/onboarding/completion_dialog.dart:20,97`), email `team@nowa.dev` (`completion_dialog.dart:61`).
- Feedback dialog (**How much would you rate Nowa?**, **Cancel**, **Submit Feedback**; shown from the second visit, 2 minutes after load, until submitted): `lib/dashboard/dashboard_provider.dart:72-101`, `packages/core/lib/src/dialogs/feedback_dialogs.dart:8-57`.

Left out / why:
- Welcome tour **Welcome to Nowa!** (cannot be restarted; covered by W1 `editor-tour.md`), the dead "?" help menu (Tutorials, Community, Share feedback), the Learning Resources view and Marketplace: not user-facing.
- Reddit (docs footer link only, not in the product) and Instagram.
- Support reply polling interval, `snapshot.zip` name: internal detail.

Assumptions / open questions:
- **Community forum** https://community.nowa.dev/ appears only in code that is never mounted (`lib/widgets/help_icon.dart:57-58`, `lib/dashboard/learning_resources/learning_resources_view.dart:63`). Kept because pages.md lists it;
  please confirm the URL is live before publishing.
- Editor-shell research says "Enter sends" in the support chat; not supported by my reading of the code, so the page says "click the send button" (see Corrections above).
