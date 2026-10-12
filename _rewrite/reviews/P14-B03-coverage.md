# P14-B03 coverage: old account pages vs new docs

Batch P14-B03 (`docs/account/`). Old pages audited: `ai/price.md` ("Credits, Limits & Privacy"; redirects to
`/account/plans-and-usage`, `redirects.md:27`). No items routed from other batches yet.

Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Greps for C2 covered all of `docs/` except
`docs/new/` and `docs/legacy/`.

## ai/price.md

| item | status | where / evidence | note |
|---|---|---|---|
| 1. Credits are what Nowa AI runs on: chatting, building features, turning ideas into apps | covered | `ai/index.md#usage-and-credits` ("Nowa AI runs on your plan's AI credits"); `account/plans-and-usage.md` intro (now says in plain words that each request to Nowa AI uses part of your plan's AI allowance, which resets, and that extra credits top you up) and `#usage` | Plan allowance and extra credits: `packages/core/lib/src/billing/widgets/usage_settings_page.dart:181-221` (Plan Usage Limits), `:60-179` (Extra AI Usage); `packages/ai/lib/src/ui/content_views.dart:252` (`ai_credits` grant) |
| 2. Your plan gives a credit allowance that refreshes automatically | covered | `account/plans-and-usage.md#usage` ("Resets in" a time, per row) | Reset date comes from the server (`usage_settings_page.dart:252`, `grant.periodEnd`), so the docs don't say "each month" |
| 3. Out of credits: upgrade, or buy more on a plan that allows it | covered | `account/plans-and-usage.md#out-of-credits`, `#buy-credits` ("Not every plan can buy extra credits") | Which plan can buy credits is server-side (`top_up_credits` grant, `packages/core/lib/src/billing/widgets/buy_credits_page.dart:70`); the old "Scale" name isn't in the code, so no plan is named |
| 4. "Plans at a Glance" table: AI messages per month, monthly and annual prices per plan | not useful | D3 (no prices, credit amounts or plan limits) | The **Monthly** / **Annually** switch itself is covered in `#change-plan` (`packages/core/lib/src/billing/widgets/adjust_plan_page.dart:122-150`, `billing_models.dart:262-265`) |
| 5. "Who are these plans for?": Starter for the curious and hobby projects, Launch for solo developers and small teams, Scale for startups and agencies, Enterprise for large teams | not useful | Marketing; the plan line-up, names and features come from Nowa's servers (`adjust_plan_page.dart:160-175`) | The pricing link covers it. Only the default badge name **Starter** is in the code (`usage_settings_page.dart:313`) |
| 6. A custom domain for your web app depends on your plan (old: Launch) | covered | `publish/web.md#use-your-own-domain` ("Custom domains need a higher plan ... **Premium**"); also listed in the new `account/plans-and-usage.md#what-your-plan-includes` table | `web_preview_custom_domain` grant, `packages/core/lib/src/web_deploy/web_deploy_widgets/custom_domain/custom_domain_section.dart:40` |
| 7. Mobile (Android and iOS) deployments depend on your plan (old: Scale) | covered | `publish/index.md` (Premium rows, lock and **Upgrade**), `publish/builds.md` (build allowance); listed in the new plans table | `cloud_builds` grant, `lib/project/run/deploy_button.dart:60-61`, `packages/core/lib/src/settings/deployment_settings.dart:212-222,307-317` |
| 8. GitHub integration depends on your plan (old: Scale) | covered | `account/project-settings.md` (Git row), `account/account-settings.md` (Git row), `code/git.md`, `code/import.md`, `account/projects.md#clone-or-import-a-project`; listed in the new plans table | `github` grant, `packages/core/lib/src/settings/git_settings.dart:33-38`, `lib/project/panels/git_panel/git_details.dart:28-32` ("Your plan does not support git integration"), `lib/dashboard/create_new_project/start_project_provider.dart:60` |
| 9. Buying extra credits depends on your plan | covered | `account/plans-and-usage.md#buy-credits` | `buy_credits_page.dart:70`, message "Your current plan doesn't support buying additional credits..." |
| 10. Enterprise: custom credit quotas, SSO, audit logs, on-premise options, personalized guidance | not useful | Not in the 3.13 app: no SSO, audit-log or on-premise strings (`grep -rni "SSO\|audit log\|on-premise"` over `lib`, `packages`: no hits) | The one Enterprise-only feature in the app, **Connect External Agent** (`packages/ai/lib/src/ui/chat_panel/ai_chat_panel.dart:39`, D18), is covered on `ai/external-agent.md` and listed in the new plans table |
| 11. Privacy and trust: your data and projects belong to you; read the Privacy Policy | added | `account/account-settings.md#your-data-and-privacy` | Privacy Policy now at https://nowa.dev/privacy-policy/ (the old https://www.nowa.dev/2/privacy redirects there); Terms: "You retain ownership over all content created using our Service" (https://nowa.dev/terms-and-conditions/, "Content Ownership"); rights to access, correct and delete personal information via team@nowa.dev (Privacy Policy section 5). "Strong security practices" is not repeated: neither page says it |
| 12. See Nowa's pricing page to compare plans | covered | `account/plans-and-usage.md` intro, `ai/index.md#usage-and-credits`, publish pages | https://nowa.dev/pricing |

## Totals

| Status | Count |
|---|---|
| covered | 8 |
| added | 1 |
| obsolete | 0 |
| not useful | 3 |
| dev-only | 0 |
| for other page | 0 |
| **Total** | **12** |

Also new on `account/plans-and-usage.md` (not an old-docs item, but it carries items 6-10 to the page the old URL now
opens): a "What your plan includes" table that lists every plan-gated feature the code enforces, with no plan names or
amounts, each linking to its page.
