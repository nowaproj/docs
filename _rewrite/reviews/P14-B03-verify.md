# P14-B03 verify: account pages

Verifier P14-B03-V. Pages: `docs/account/` `index`, `projects`, `project-settings`, `account-settings`, `workspaces`,
`plans-and-usage`, `help`. Diff checked: `git diff origin/main -- docs/account/`. Code refs are relative to
`/home/user/nowa-master` (3.13.0, `3cb32031c`). Legal pages fetched with curl on 2026-10-12 (both "Last updated:
22 May 2024").

## Summary

(Filled in at the end.)

## plans-and-usage.md

"What your plan includes" was checked row by row against every client-side grant check. `entitlement_keys.dart` has 12
keys; `grep -rn "EntitlementKeys\." lib packages` gives 26 uses in 20 files, plus `PaymentDialog.show` / `PremiumButton(`
calls (all on the same keys). Mapping:

| Key | Where it's checked | Table |
|---|---|---|
| `top_up_credits` | `packages/core/lib/src/billing/widgets/buy_credits_page.dart:69-95`, `packages/core/lib/src/settings/credits_settings.dart:418-422` | row "Buying extra credits" |
| `desktop` | `lib/router.dart:75-81` → `/upgrade`, `lib/upgrade_page.dart:28-31` | row "The desktop app" |
| `github` | `packages/core/lib/src/settings/git_settings.dart:34-38,549-553`, `lib/project/panels/git_panel/git_details.dart:28-32`, `lib/dashboard/dashboard_page.dart:300-306`, `lib/dashboard/create_new_project/start_project_provider.dart:59-64` | row "Git and GitHub" |
| `web_preview_deploys` | `lib/project/run/deploy_button.dart:56,186-190,348-349`, `packages/core/lib/src/settings/cloud_build/web_build_settings.dart:22-34`, `web_deploy_widgets/environment_card.dart:77-78`, `environment_widgets.dart:264-270` | row "Publishing to the web" |
| `web_preview_custom_domain` | `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:39-54` | row "Your own domain" |
| `cloud_builds` | `deploy_button.dart:60-61,273-298` (all three mobile rows), `packages/core/lib/src/settings/deployment_settings.dart:212-224,307-319`, `packages/core/lib/src/cloud_build_v2/ui/workflow_details_page.dart:358-368` (quota) | row "Android and iOS builds" + allowance paragraph |
| `premium_templates` | `packages/core/lib/src/services/templates/add_template_action.dart:28-33` (gate), `:60-75` (**Premium** label in the picker) | row "Premium templates" |
| `external_agent` | `packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:37-39,78` (menu item only on desktop with the grant), `packages/ai/lib/src/mcp/external_agent_access.dart:81` | row "Connecting your own AI agent" |
| `ai_credits` | `packages/ai/lib/src/ui/content_views.dart:250-298` | allowance paragraph, "When you run out" |
| `code_download` | `lib/project/download_code_button.dart:130-142` | allowance paragraph |
| `max_mode` | `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:946,1028`; Max Mode agent has `visibleInDropdown: false` (`packages/ai/lib/src/agent/agent.dart:83-92`, `chat_session.dart:102-105`) | correctly left out (not reachable) |
| `hide_web_preview_banner` | defined only, never checked in the client | correctly left out |

No other plan gate exists in the client: `isFreePlan` only switches button labels (Upgrade / Buy credits / Purchase
Credits), and "Session Limit Reached" (`content_views.dart:437`) is the AI context window, not a plan limit. No row was
removed: every row matches a real check. No prices, credit amounts or plan limits on the page (D3).

| Claim | Verdict | Source | Note |
|---|---|---|---|
| Intro: requests use the plan's AI allowance, which resets; top up with extra credits | fixed | `usage_settings_page.dart:181-302`, `buy_credits_page.dart:69-95` | Added "if your plan allows it": buying credits is itself gated (`top_up_credits`). |
| Table lead-in "Nowa tells you when you try it and offers an upgrade" | fixed | `ai_chat_panel.dart:78` | Now "usually": for the external agent the menu item is simply hidden. |
| Row: buying extra credits, message and **Upgrade Plan** | fixed | `buy_credits_page.dart:77-90` | Wording: the message is on the page that **Buy credits** opens (header "Extra AI Usage"), not on the button. |
| Row: desktop app, "Upgrade to unlock desktop version, or use on web at app.nowa.dev" after sign-in | ok | `lib/router.dart:75-81`, `lib/upgrade_page.dart:28-31` | |
| Row: Git, "Your plan does not support git integration"; **Clone from GitHub** → **Time to level up** | ok | see mapping; `PaymentDialog` title `packages/core/lib/src/widgets/nowa_dialogs.dart:109` | |
| Row: web publishing, **Web** row shows **Premium** | ok | `deploy_button.dart:348-349`, pill label `nowa_dialogs.dart:161` | |
| Row: custom domain, **Custom Domain** shows **Premium** | ok | `custom_domain_section.dart:43-52` | |
| Row: Android and iOS builds, their **Deploy** rows show **Premium** | ok | `deploy_button.dart:59-61,278-283` | All three mobile rows (Android Debug, Android Release, iOS). |
| Row: premium templates → **Time to level up** | ok | `add_template_action.dart:28-33,60-75` | |
| Row: external agent, "for Enterprise accounts" | fixed | `ai_chat_panel.dart:37-39,78-84`, `ai_options.dart:32-36` (⋮, tooltip **Options**); D18 | Now names the place (**⋮** menu of the **AI Assistant** panel) and the desktop-app limit, in the words of `ai/external-agent.md`. "Enterprise" kept on D18 (user's answer to Q2), although the code never names the plan (its comment says "Granted by the beta plan"). See open issue 1. |
| AI, builds and code downloads have an allowance; upgrade or extra credits when it runs out | ok | `content_views.dart:250-298`, `workflow_details_page.dart:358-368`, `download_code_button.dart:130-142` | |
| Out of credits: project untouched, editing by hand keeps working | ok | only **Send** is gated (`content_views.dart`); no grant check guards editing (mapping above) | |
| Tokens explained | ok | general definition for the on-screen **Input Tokens** / **Output Tokens** counters | |
| Other changed sentences ("Once you've paid", "right now", "so you can see a limit coming", "Know someone...") | ok | tone only | |
| Removed facts | none | | Every `-` line is still on the page in other words. |

Audience: no code-only facts. Plan names: "free plan" (code `free_plan`, `billing_models.dart:45`), "Starter" only in the
untouched image alt text (default badge, `usage_settings_page.dart:313`), "Enterprise" (D18).

## account-settings.md

"Your data and privacy" was checked sentence by sentence against the raw text of both legal pages
(https://nowa.dev/terms-and-conditions/ and https://nowa.dev/privacy-policy/, both "Last updated: 22 May 2024").

| Claim | Verdict | Source | Note |
|---|---|---|---|
| "What you build in Nowa is yours." | removed | Terms, "Content Ownership" | Unqualified: the Terms say "You retain ownership over all content created using our Service, subject to the terms and conditions laid out in these Terms", and the same section grants Nowa a license to the content. Neither page says "what you build is yours". |
| "The Terms say you keep ownership of the content you create with Nowa" | fixed | Terms, "Content Ownership" | Paraphrase dropped the "subject to these Terms" qualifier. Replaced by the section's first sentence, quoted exactly, with a pointer to the section. |
| (new) "Nowa's Terms and Conditions govern your use of Nowa" | ok | Terms, "Introduction": "These Terms and Conditions govern your use of our visual app builder services" | Near-quote. |
| "The Privacy Policy explains what personal information Nowa collects, such as your name, email and profile picture, and what it's used for" | fixed | Policy sections 2, 4, 5 | The policy says only that you "may be asked" for these at sign-up, and also collects usage data through cookies. Reduced to the neutral pointer "what personal information Nowa collects, how it's used and the options you have to manage it" (section headings "Information Collection", "Use of Information", and section 5's "Nowa provides you the following options for you to manage your information"). |
| "To see, correct or delete your personal information, email team@nowa.dev" | removed | Policy sections 5, 6, 8 | The policy speaks of rights to *request* access, correction or deletion, names the email only for access requests, and section 8 says it "does not create any legal rights or obligations". Replaced by what both pages state plainly: questions go to team@nowa.dev (Policy section 6, Terms "Contact Us"). Account deletion itself is the in-app flow on this page. |
| "To take your app's code with you, download it or connect GitHub, depending on your plan" | fixed | `publish/download-code.md` (cloud projects, `code_download` allowance, `lib/project/download_code_button.dart:130-142`), `code/github.md` (`github` grant) | Product fact, kept but separated from the legal text: "To keep your own copy of a cloud project's code ...". Added "A local project's files are already on your computer" (`get-started/cloud-and-local.md`), since download is a cloud-project feature. |
| Description "see how your data is handled" | fixed | | Now "find Nowa's terms and privacy policy", which is what the section does. |
| Intro: settings belong to you, not to one project | ok | `account_editor_settings.dart:19-34` | |
| Local Setup row: desktop only, Flutter path, projects folder, VS Code; Flutter explained | ok | `packages/core/lib/src/settings/editor_settings/local_setup.dart:163` ("Not available on web"), `:182,210,223` | |
| Git row: GitHub connection and Git sign-in details; plan-gated | ok | `git_settings.dart:549-589` (GitHub integration, remote and local credentials) | |
| "Google SignedIn ... because Google manages that address for you" | fixed | `account_details/main_info_section.dart:30-47` (`withGoogle`) | The code only shows the label for Google sign-ins. Now "because your email comes from your Google account". |
| One-time code goes to the new address; "OTP Code Sent on"; "Email verified" | ok | `change_email.dart:66-104`, `user_provider.dart:166-186` | "OTP" explained as a one-time code (R3). |
| Logout leaves projects in place | ok | `packages/core/lib/src/providers/user_provider.dart:148-155` (only tokens cleared) | |
| Figma "Already designed something in Figma?" | ok | tone | P117 note untouched. |
| Delete account: "download your code first" | ok, link added | `delete_account.dart:84,212-219` | Linked to the download page. |
| Removed facts | none | | All other `-` lines are still on the page. |

Audience: no code-only facts on the page.
