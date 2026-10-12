# P14-B03 notes: account pages (audience, tone and coverage pass)

Batch pages: `docs/account/` `index`, `projects`, `project-settings`, `account-settings`, `workspaces`,
`plans-and-usage`, `help`. Old page audited: `ai/price.md` (see `P14-B03-coverage.md`). Moved facts:
`P14-B03-for-code.md`.

Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). "Kept" means a verified fact from the
previous version that I reworded without changing it. Anchors that other pages link to were kept:
`project-settings.md#open-app-settings` (heading text unchanged) and `#experimental-flags`, `projects.md#project-not-found`
and `#project-menu`, `workspaces.md#invite-people` (heading text unchanged), `plans-and-usage.md#time-to-level-up`,
`help.md#report-an-issue`, plus the in-section anchors `help.md#notifications`, `#hire-an-expert`, `#share-feedback`,
`projects.md#find-a-project`, `plans-and-usage.md#invite-a-friend`. Images and alt texts are untouched.

## Summary

| Page | Words before → after (prose) | Facts moved (R2) | Old-docs items added |
|---|---|---|---|
| `index.md` | 564 → 620 | 0 | 0 |
| `projects.md` | 1,206 → 1,434 | 2 | 0 |
| `project-settings.md` | 1,168 → 1,869 | 4 | 0 |
| `account-settings.md` | 742 → 919 | 0 | 1 (privacy and data ownership) |
| `workspaces.md` | 777 → 843 | 0 | 0 |
| `plans-and-usage.md` | 1,020 → 1,388 | 0 | 0 (items 6-10 of `ai/price.md` were covered elsewhere; now also gathered in "What your plan includes") |
| `help.md` | 709 → 788 | 0 | 0 |
| **Total** | | **6** | **1** |

Before = commit `9f21e4c` (PR #18); after = this pass. All pages keep 2 admonitions or fewer, no em dashes, no `---`
rules, images and alt texts untouched. Every relative link and anchor on the seven pages resolves, and so does every
link into them from other pages (checked with a script on 2026-10-12).

## project-settings.md

**For the reader (R1-R4, R9).**
- Intro rewritten around what the page does for the app (identity, phone features, keys).
- General-pages table: **Packages**, **Git** and **Constants** explained in plain words (add-ons from pub.dev; history
  of saved changes and the GitHub link; keys plus your own fixed values).
- Fields table: **Package Name** is "an internal name for your project's code" (no Flutter wording); **Build version**
  is the version people see in the store; **Build number** is a counter for builds.
- New sub-sections "Choose your Bundle Identifier" and "Set the version" turn the two rules into guidance a founder
  can act on (what an ID usually looks like, why to keep it, when to raise each number).
- Permissions: one plain-words table (permission, platform, what it lets the app do) replaces the bare label list;
  the grey technical key under each name is explained (R3); an example iOS message is given.
- Constants: "key" explained in one clause (R4); the shipping-in-the-app warning keeps its facts, in the same words as
  `integrations/constants.md`.
- Shared Preferences explained by example (a dark-mode choice, a seen-the-welcome flag).
- Experimental flags: "load packages" explained as AI adding add-ons; New UX now carries the caveats below.

**Moved to for-code (R2), 4 facts:** the `pubspec.yaml` `1.3.4+7` sentence; the Android manifest / `Info.plist`
rewrite warning; the `lib/globals/app_constants.dart` sentence; "Keys that Nowa writes into your Android, iOS or web
files...". One pointer added: "Working in the code? What Nowa adds to your code" → `../code/generated-code.md#project-files`
(end of "Set permissions").

**New or changed claims and their evidence.**
| Claim | Evidence |
|---|---|
| Playground and guest sessions hide **Deployment**, **Permissions**, **Git**, **Project Sync**; **Project Sync** only in the desktop app | `packages/core/lib/src/settings/project_settings.dart:21-29` (`!_isSandboxed`, `!kIsWeb`) |
| **App Name** is also the web version's browser tab title | `packages/core/lib/src/project/rename.dart:29-46` (`changeAppName` → `changeWebAppName`), `:263-271` (rewrites `<title>`) |
| **Bundle Identifier** is used for iOS, Android, macOS and Linux | `rename.dart:48-67` (`changeBundleId` targets ios, android, macos, linux; called with `[]` = all at `project_detail_settings.dart:124`) |
| New projects start with a `com.example.` placeholder | `packages/core/lib/src/file_system/naming.dart:242-247` (`defaultBundleId`) |
| Bundle IDs usually use a reverse web address | Apple: "Typically, you use a reverse-DNS format for bundle ID strings." https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundleidentifier |
| Changing the ID after publishing makes Google Play treat the upload as a different app | "Once you publish your app, you should never change the application ID. If you change the application ID, Google Play Store treats the upload as a completely different app." https://developer.android.com/build/configure-app-module |
| Bundle ID rules and "Invalid package name" (kept) | `project_detail_settings.dart:122-123` |
| Build version is shown to users; build number is an internal counter that Google Play won't accept twice | versionName "the version number shown to users"; versionCode "an internal version number ... You can't upload an APK to the Play Store with a versionCode you have already used" https://developer.android.com/studio/publish/versioning. Raise Build number per store update, Build version for a new visible version: same advice as `publish/index.md#ship-an-update`, `publish/android.md` step 1 of "Release an update" |
| Build fields save on Enter or when you click away (kept) | `project_detail_settings.dart:293-331` (`onEditingComplete`), `packages/core/lib/src/fields/nowa_fields.dart:69-75` (fires on focus loss) |
| Nowa makes every icon size from one image; tiles refresh after a change | `packages/core/lib/src/settings/app_icon_manager.dart:94-160` (launcher_icon generation, Windows only for Change all at `:111,140`), `app_icon_settings.dart:65-71` (`loadIcons()` after a change) |
| Icon size limit and message (kept) | `app_icon_manager.dart:170-171`; shown with `showSnackbarError` (`app_icon_settings.dart:72-74`) |
| A permission switch takes effect right away; the iOS message is kept as you type | `packages/core/lib/src/settings/permissions/permissions_provider.dart:20-31` (`togglePermission` → `addPermission`/`removePermission`, then Problems refresh; `updateValue` on every change), `permission_settings.dart:117-123` (`onChanged`) |
| Each row shows the technical key under the name | `permission_settings.dart:112-113` (`item.friendlyName`, `item.key`) |
| What each permission does (table) | `packages/core/lib/src/services/permissions_service.dart:115-211` (`description` and default `value` of each item: e.g. Speech Recognition "Speech recognition for voice input", User Tracking "App tracking transparency for personalized ads", Boot Completed "Receive boot completed notifications") |
| Boot Completed example (reminders must be set again after a restart) | "By default, all alarms are canceled when a device shuts down ... Set the RECEIVE_BOOT_COMPLETED permission ... broadcast after the system finishes booting" https://developer.android.com/develop/background-work/services/alarms |
| **Problems** names a missing permission and **Fix** turns it on (kept, reworded) | `packages/core/lib/src/interpreter/packages/package_config/package_config_service.dart:411-433` ('... permission "X" is required by Y but not enabled.', `onFix: addPermission`), `packages/core/lib/src/interpreter/block_problems.dart:343-351` ("Missing permission: ...", `onFix`) |
| Tip: request only what your features need, explain the use | Apple App Review Guidelines 5.1.1(ii) "Ensure your purpose strings clearly and completely describe your use of the data", 5.1.1(iii) "Apps should only request access to data relevant to the core functionality of the app" https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage (anchor checked in the page HTML); Google Play "You may only request permissions and APIs that access sensitive information that are necessary to implement current features or services in your app" https://support.google.com/googleplay/android-developer/answer/16558241 (the old answer/9888170 redirects there) |
| Integration keys appear in both places (kept) | `packages/core/lib/src/settings/constants_settings.dart` page description "Changes here are reflected in individual integration panels and vice versa." |
| Constants ship inside the app (kept, now in the words of `integrations/constants.md`) | same as before; `integrations/constants.md` intro and warning |
| Public project: visitors edit their own copy, your project never changes | `packages/core/lib/src/settings/sharing_settings.dart` "A public project can be opened by anyone with the link. They edit their own copy of it, so your project is never changed by a visitor." |
| Sharing hidden for View Only and sandboxed sessions (kept) | `project_detail_settings.dart:88-94` |
| Experimental flags are per project and reversible | stored in the project's settings file under `experimental` (`packages/core/lib/src/project/settings_service.dart:42-64`); toggling back is the same switch (`experimental_flags_dialog.dart:54-79`) |
| **Apply** saves and reopens the project; **Cancel** when nothing changed (kept) | `experimental_flags_dialog.dart:30-39,100-106` |
| load packages: only gates Nowa AI adding packages; on in new projects (kept) | `packages/ai/lib/src/tools/packages_tool.dart:137-141`, `packages/ai/lib/src/tools/legacy/packages_tools.dart:94`; default `true` in `packages/core/lib/src/file_system/templates/common/nowa_settings_template.dart:17` |
| New UX: **Debug** panel lists global data with current values | `lib/project/side_bar.dart:91-96` (Debug icon only with New UX), `lib/project/panels/left_panel.dart:39` → `lib/project/panels/testing_panel.dart:16-36` (global defines, user-library defines, global-state instances from the board's environment) |
| New UX hides the board toolbar | `packages/designer/lib/src/panels/designer_board.dart:137-149` (`if (!playing && isNewUx) return const SizedBox.shrink()`) |
| New UX breaks double-click on the board | `packages/designer/lib/src/design_experience/designer_board_controller.dart:104-121,361-366,414-419` (`_tryDrillIntoComponent` throws `UnimplementedError('Drill into component is not implemented yet')` whenever New UX is on, before any double-click handling). Already recorded in `_rewrite/left-out.md:75` |
| Shared Preferences **Clear** also clears the REST API **Auth token value** | the token is stored in the same designer store: `packages/data/lib/src/api/model/test_api_func_provider.dart:136-143`, `packages/data/lib/src/api/views/api_panel/api_test_section/api_test_values_panel.dart:135-140,169`; **Clear** empties it: `packages/core/lib/src/interpreter/libraries/shared_preferences_library.dart:162-165`, `project_detail_settings.dart:55-62` |
| Values saved while testing on the board are separate from a phone's | `shared_preferences_library.dart:145-160` (editor-side store keyed `user_shared_prefs_<projectId>`); same wording as `logic/actions.md#save-values-on-the-device` |

**Open questions.**
- The **load packages** dialog text still says "Load packages from pubspec.yaml file automatically ... this will
  increase loading times" (`experimental_flags_dialog.dart:55-58`), but in 3.13 the flag only gates Nowa AI's package
  tool. The page describes the behavior, not the dialog text. Product copy to fix?
- New UX double-click bug: product issue (not documented elsewhere as a known issue). The page now says double-clicking
  doesn't work while the flag is on and that the docs assume it's off. Should the flag be documented at all
  (`left-out.md:75` recommended not documenting the New UX parts)? I kept the row because the flag is visible in every
  project and readers who flip it need the warning.

Word count (prose, same counter for all pages): 1,168 before, 1,869 after. Under the ~2,200 limit; if it must shrink, "Set permissions" (with its table and tip) is the natural part to move to its own page, `account/permissions.md`.

## projects.md

**For the reader (R1-R4, R9).**
- Intro and "Start from a prompt" now say what happens next (Nowa AI starts building right away) and give an everyday
  example prompt (a recipe app); step 2 says which mode and level to keep when unsure.
- "Starter app with routing, a theme, a home page and a board" → "a small starter app with a home page, a theme and a
  board" ("routing" dropped as jargon; the fact that it's a ready starter stays).
- Flutter, GitHub and "repository" are explained in one clause each (R4); "A Flutter folder" → "A Flutter project on
  your computer", with an everyday case (an app a developer built for you). "including monorepos" → "including folders
  that hold several apps or packages".
- Reserved words: "a Dart reserved word" → "a word with a special meaning in code"; the three on-screen messages stay
  verbatim (R3).
- Identifiers table: **Package Name** now "An internal name for your project's code, such as `my_app` ... Your users
  never see it"; its derivation rules moved (R2). **Bundle Identifier** placeholder described in plain words (same
  facts: `com.example.`, name without spaces/underscores/hyphens, a short code from the project ID).
- "Project not found": the `pubspec.yaml` requirement is replaced by the error the reader actually sees.
- "disk" → "computer" in running text; the UI quote "The files stay on disk." stays verbatim.

**Moved to for-code (R2), 2 facts:** the Package Name derivation sentence group; "(it must contain a `pubspec.yaml`)".
No pointer to the code section on this page (none needed).

**New or changed claims and their evidence.**
| Claim | Evidence |
|---|---|
| Dashboard marks **Design** with **Start here**; **Thinking** is the starting level | `lib/dashboard/dashboard_page.dart:222` (`recommended: AiMode.design`), `packages/nowa_ui/lib/src/components/option_chip.dart:185` ('Start here'); `packages/ai/lib/src/agent/agent.dart:44-52` (`promptToAppTier => AgentTier.thinking`); same advice as `get-started/first-app.md` steps 3-4 |
| A cloud project opens on any device you sign in on | `get-started/cloud-and-local.md` table ("The web app and the desktop app, on any device you sign in on") |
| You can change the **Project Name** later | `packages/core/lib/src/settings/project_detail_settings.dart:234-261` (`_ProjectName`, `setFriendlyName`) |
| Card line is the internal (folder/package) name when it differs, else the edit time | `packages/nowa_ui/lib/dashboard/projects_grid.dart:76-79`, `lib/dashboard/dashboard_mapper.dart:55-62` (kept; "package name" → "internal name" because for an added local project the line is the folder name, `packages/core/lib/src/services/local_project_service.dart:83,140-142`) |
| **RECENTS** shows edit times (kept) | `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:403` |
| Wrong folder in **Locate folder** shows "Exception: Chosen folder is not a nowa project or a flutter project" | `packages/core/lib/src/services/local_project_service.dart:103-107` (thrown by `relocateProject`, `:147`), shown as `e.toString()` in an error box: `lib/project/missing_project_folder.dart:53-66,87` |
| Matching-folder button, **Remove from projects**, **Back to dashboard**, **Try again** for cloud (kept) | `lib/project/missing_project_folder.dart:39-44,90-126` |
| Monorepo wording | `code/import.md#work-with-a-monorepo` (workspace members or packages in `packages/`/`apps/`) |

Word count (prose): 1,206 before, 1,434 after.

## plans-and-usage.md

**For the reader (R4, R9) and coverage (C5).**
- Intro now says in plain words how AI usage works (requests use your plan's allowance, which resets; extra credits top
  you up). This makes old `ai/price.md` item 1 explicit on the page the old URL opens.
- New section "What your plan includes" `{#what-your-plan-includes}`: one table of every plan-gated feature the code
  enforces, what the reader sees without it, and where to read more. No plan names (except Enterprise for the external
  agent, D18), no amounts (D3). It carries old items 6-10 (custom domain, mobile deploys, GitHub, buying credits,
  Enterprise) to this page in a D3-safe way. "When Nowa asks you to upgrade" links back to it.
- "Tokens" explained in one clause (R4). Out-of-credits section reassures that the project and its work stay, and that
  editing by hand keeps working. Small warm transitions elsewhere ("Know someone who'd like to build an app too?").

**Moved to for-code:** none.

**New or changed claims and their evidence.**
| Claim | Evidence |
|---|---|
| AI allowance resets; extra credits are used after it | `packages/core/lib/src/billing/widgets/usage_settings_page.dart:181-302` (grant rows, "Resets in"), `packages/ai/lib/src/ui/chat_panel/remaining_credits_view.dart:77-86` ("100% used · Using extra credits", "You've used 100% of your plan credits - now using your extra credits.") |
| Every gated feature in the table is enforced by a plan grant | `packages/core/lib/src/billing/entitlement_keys.dart:1-14`; full list of grant checks: `grep -rln "EntitlementKeys\.\|hasGrant\|PaymentDialog.show\|PremiumButton("` (20 files, all mapped below) |
| AI usage (`ai_credits`) | `packages/ai/lib/src/ui/content_views.dart:252-294` |
| Buying credits (`top_up_credits`) and its message | `packages/core/lib/src/billing/widgets/buy_credits_page.dart:70`, `packages/core/lib/src/settings/credits_settings.dart:419` |
| Desktop app (`desktop`) and its message after sign-in | `lib/router.dart:75-81`, `lib/upgrade_page.dart:28-31` |
| Git (`github`): "Your plan does not support git integration"; Clone from GitHub → Time to level up | `packages/core/lib/src/settings/git_settings.dart:33-38,550-553`, `lib/project/panels/git_panel/git_details.dart:28-32`; `lib/dashboard/dashboard_page.dart:301-306`, `lib/dashboard/create_new_project/start_project_provider.dart:59-63` (`PaymentDialog` = **Time to level up**, `packages/core/lib/src/widgets/nowa_dialogs.dart:86-134`) |
| Web publishing (`web_preview_deploys`) → **Premium** on the Web row | `lib/project/run/deploy_button.dart:56`, `packages/core/lib/src/web_deploy/web_deploy_widgets/environment_card.dart:78`, `environment_widgets.dart:265-266`, `packages/core/lib/src/settings/cloud_build/web_build_settings.dart:23` |
| Custom domain (`web_preview_custom_domain`) → **Custom Domain** shows **Premium** | `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:39-52` |
| Android and iOS builds (`cloud_builds`) → **Premium** rows; builds count against an allowance | `deploy_button.dart:60-61`, `packages/core/lib/src/settings/deployment_settings.dart:212-222,307-317`, `packages/core/lib/src/cloud_build_v2/ui/workflow_details_page.dart:360-363` |
| Code download (`code_download`) allowance | `lib/project/download_code_button.dart:131` |
| Premium templates (`premium_templates`) → Time to level up | `packages/core/lib/src/services/templates/add_template_action.dart:27-33` |
| External agent (`external_agent`), Enterprise, menu item hidden | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:39`, `packages/ai/lib/src/mcp/external_agent_access.dart:81`; D18; `ai/external-agent.md` "Before you start" |
| Out of credits: only **Send** stops; the project is untouched and hand editing keeps working | `packages/ai/lib/src/ui/content_views.dart:252-294` (chat banner), `ai/chat.md` ("**Send** is disabled ... when your AI credits are used up"); no other grant check guards editing (list above) |
| Tokens = chunks of text an AI reads and writes | general definition, used only to explain the on-screen **Input Tokens** / **Output Tokens** counters (`packages/ai/lib/src/ui/session_details_popup.dart`) |

Not added on purpose: Free Weekend (time-limited promotion, `_rewrite/left-out.md:129`); Max Mode (hidden from the
menu, `packages/ai/lib/src/agent/agent.dart:83-91`, `visibleInDropdown: false`); thinking levels costing different
amounts (only a code comment says so, `agent.dart:44-52`; the UI doesn't).

## account-settings.md

**For the reader (R4, R9) and coverage (C5).**
- Intro says these settings belong to the person, not to a project, and points to Project settings for per-project ones.
- Table: **Local Setup** explains Flutter in one clause ("the free toolkit that builds and runs your app on your
  computer"); **Git** says what the connection is for.
- "OTP Code" explained as a one-time code (R3/R4); one line says why the code goes to the new address.
- Logout reassures that projects stay where they are. Delete account: one line suggests downloading your code first.
- Figma: the P117 note stays exactly as it was (as the batch notes require).
- New section "Your data and privacy" `{#your-data-and-privacy}` from old `ai/price.md` item 11 (see coverage file).

**Moved to for-code:** none.

**New or changed claims and their evidence.**
| Claim | Evidence |
|---|---|
| Local Setup holds the Flutter SDK path, default projects folder and VS Code path (kept, reworded); desktop only | `packages/core/lib/src/settings/editor_settings/local_setup.dart:163,182,210,223` ('Not available on web', 'Flutter SDK Path', 'Default Projects Path', 'VS code Path') |
| Git page: GitHub connection and credentials; plan-gated (kept) | `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:34`, `packages/core/lib/src/settings/git_settings.dart:550-553` |
| Change email: code sent to the new address, then **Verify OTP** | `packages/core/lib/src/settings/account_editor_settings/account_details/change_email.dart:66-104` (**Verify Email** updates the email and sends the code; **OTP Code** shows while `emailVerified == false`; **Verify OTP** calls `reconfirmEmail`). I don't say the switch waits for the code, because **Verify Email** already calls `updateUserInfo` with the new email |
| All other labels and messages on the page (kept) | each string found in 3.13 (`grep -rn -F` over `lib`, `packages`): First Name, Last Name, Change Email, Google SignedIn, New Email, Verify Email, OTP Code Sent on, OTP Code, Verify OTP, Email verified, Change Password, Set Password, Current Password, New Password, Repeat New Password, Please make sure the passwords match, Restore Password, Forgot your Password?, Reset your password, Send reset link, Connected Accounts, Waiting for Authorization..., You will need to reconnect to Figma, Delete Account, Reason for deleting, Account Deletion Details, Resource Deletions, This action can not be reversed, You can't delete your account..., Profile updated, Profile picture updated, General Settings, Logout |
| Logging out leaves projects in place | logout only clears the session (`lib/upgrade_page.dart:54-63` uses the same `UserProvider.logout`); cloud projects are stored in the account, local ones on disk (`get-started/cloud-and-local.md`) |
| You keep ownership of what you create | Terms and Conditions, "Content Ownership": "You retain ownership over all content created using our Service, subject to the terms and conditions laid out in these Terms." https://nowa.dev/terms-and-conditions/ (last updated 22 May 2024; linked from the sign-up form, `lib/auth/auth_view.dart:500`) |
| Code can be taken along by download or GitHub, depending on plan | `publish/download-code.md`, `code/github.md`; grants `code_download`, `github` (`packages/core/lib/src/billing/entitlement_keys.dart:4,6`) |
| What personal information Nowa collects, and the right to access, correct or delete it via team@nowa.dev | Privacy Policy sections 2 ("Email address, Name and Surname, Password, Profile information (e.g. profile picture)"), 5 (access, correct, delete, object to direct marketing) and 6 (team@nowa.dev): https://nowa.dev/privacy-policy/ (the old docs' https://www.nowa.dev/2/privacy redirects there; checked with curl on 2026-10-12) |

**Open question.** The Privacy Policy says it "is not a legal document and is provided for informational purposes
only" (section 8). The docs only point to it and paraphrase sections 2 and 5; is that the wording Nowa wants?

## workspaces.md

**For the reader (R9).** The page had no developer detail. Changes are tone and guidance: an everyday example in the
intro (a client following your progress), **View Only** described as good for clients and reviewers, a workspace-name
example, short "why" clauses after moving a project and on the **Pending** badge, and a practical line after "no live
co-editing" (agree who works in a project at a time). All facts and labels kept.

**Moved to for-code:** none.

**New or changed claims and their evidence.**
| Claim | Evidence |
|---|---|
| **Pending** shows until the person accepts | `packages/core/lib/src/settings/member_settings.dart:406` (`role?.detailedName ?? 'Pending'`) |
| Role menu items are built as "Make" + role name (kept) | `member_settings.dart:274` ('Make ${e.detailedName}'), names from `packages/core/lib/src/models/project.dart:13-21` (Owner, Editor, View Only); own-role warning `member_settings.dart:242` |
| No live co-editing or comments (kept); the "agree who works in a project" line is advice that follows from it | `_rewrite/research/features-account-projects.md` "Workspace settings"; no lock or conflict handling found in client code (searched for "another session", "open elsewhere", "modified by", "conflict" outside Git) |
| All other labels (kept) | found in 3.13: Projects not in a workspace, Create workspace, Workspace Name, Name cannot be empty, Workspace settings (`lib/dashboard/side_bar/workspace_widgets.dart:227`), teammate@company.com, Cancel invitation, Resend invitation, Please enter a valid email address, Invitation accepted!, Remove member, Save changes, Leave workspace, Delete workspace, View only, Export as image..., Copy as path, Move to workspace... |

## help.md

**For the reader (R9).** No developer detail on the page. Tone only: a "why" line before the report steps, an
everyday example of a good bug report (a booking screen's **Book** button), short lead-ins for asking a question,
hiring an expert and the community. All facts, labels and links kept.

**Moved to for-code:** none.

**Evidence.** All labels re-checked in 3.13 (`grep -rn -F` over `lib`, `packages`): Hey There, "help you build a great
app", Your tickets, Report an issue, Open a project to report an issue, Chat with support, Have a question? We are here
to help, YouTube Channel, Hire an Expert, Type a detailed message..., Include a snapshot of the current project, This
support conversation isn't accessible with your current account., Bug report ready, Report issue, Get hands-on help
from certified Nowa experts., Book a Free Consultation, Become an expert, Learning Resources, No notifications, Dismiss
announcement, How much would you rate Nowa?, Submit Feedback, In Progress, Resolving, Resolved. "Tell us more about it
(optional)" is two spans: `packages/core/lib/src/dialogs/content_dialogs.dart:33-36`. Conversations stay under **Your
tickets** (kept fact; basis for "come back to the answer later").

## index.md

**For the reader (R4, R9).** Warmer intro and dashboard paragraph; "Local projects" explained as projects stored on
your computer; the **Download Desktop App** row says why you'd want it; the dialogs list says none of them change your
projects; "In this section" now mentions privacy (account settings) and what your plan includes (plans page). All
facts, labels, links and anchors kept.

**Moved to for-code:** none.

**New or changed claims and their evidence.**
| Claim | Evidence |
|---|---|
| The desktop app is needed for local projects and to run the real app on a phone or emulator | `get-started/cloud-and-local.md` table (local projects: desktop app only; "Run on devices and emulators: Yes, with the desktop app"), `test/devices.md` ("The web app can't reach the devices on your computer."); `packages/core/lib/src/settings/project_settings.dart:29`, `lib/dashboard/create_new_project/new_project_dialog.dart` (local option disabled on the web) |
| The automatic dashboard dialogs don't change projects | the four dialogs are an update prompt, the onboarding survey, the rating dialog and an upgrade offer (kept list; `_rewrite/research/features-account-projects.md` "Dashboard pop-ups"); none writes project files |

## For other pages

None of these come from an old-docs item that another batch owns; they are follow-ups from facts verified in this pass.

1. **`docs/troubleshooting/known-issues.md` (P14-B12): add the New UX double-click bug.** Proposed text:
   "### Double-clicking on the board doesn't work {#new-ux-double-click}
   If you turned on the **New UX** experimental flag, double-clicking on the board doesn't go one level deeper or start
   editing a text. Turn the flag off: open **Settings** (the gear in the top bar) → **Project Details** →
   **Experimental flags** → **Edit**, switch off **New UX** and click **Apply**. Nowa reopens your project. See
   [Experimental flags](../account/project-settings.md#experimental-flags)."
   Evidence: `packages/designer/lib/src/design_experience/designer_board_controller.dart:104-121,361-366,414-419`
   (`UnimplementedError('Drill into component is not implemented yet')` whenever New UX is on);
   `packages/core/lib/src/settings/experimental_flags_dialog.dart:30-39,67-79,100-106`; `_rewrite/left-out.md:75`.
2. **`docs/get-started/create-account.md` (P14-B01), optional:** after the step "Tick **I accept the terms &
   conditions**", add: "The link opens Nowa's [Terms and Conditions](https://nowa.dev/terms-and-conditions/). How Nowa
   handles your personal information is in the [Privacy Policy](https://nowa.dev/privacy-policy/); see also [Your data
   and privacy](../account/account-settings.md#your-data-and-privacy)." Evidence: `lib/auth/auth_view.dart:496-512` and
   `lib/auth/google_signup.dart:105` (link to https://www.nowa.dev/terms-and-conditions, which redirects to
   https://nowa.dev/terms-and-conditions/); Privacy Policy URL checked with curl (the old https://www.nowa.dev/2/privacy
   redirects to it).
3. **`docs/ai/index.md` (P14-B02), optional:** in "Usage and credits", after the pricing link, add "To see which
   features depend on your plan, see [What your plan includes](../account/plans-and-usage.md#what-your-plan-includes)."
   Evidence: the new section (all rows tied to `packages/core/lib/src/billing/entitlement_keys.dart`).

## Open questions (all pages)

1. **New UX flag** (`project-settings.md#experimental-flags`): it hides the board toolbar and breaks double-click on
   the board in 3.13. The row now warns about both and says the docs assume it's off. Keep documenting it, or drop the
   row as `left-out.md:75` once suggested?
2. **load packages** dialog copy is out of date (it talks about loading packages from `pubspec.yaml` and longer load
   times; in 3.13 it only gates Nowa AI adding packages). Product copy fix?
3. **Privacy wording**: the docs paraphrase the Terms ("you keep ownership of the content you create") and the Privacy
   Policy (what's collected; access, correction and deletion via team@nowa.dev). The policy calls itself "not a legal
   document" (section 8) and was last updated 22 May 2024. OK to point to it this way?
