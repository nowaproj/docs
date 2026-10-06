---
title: Accept payments with Stripe
description: Take one-time payments, consumable purchases and subscriptions in a Supabase-backed app, with Nowa deploying the payment tables, functions and webhook for you.
sidebar_label: Stripe
keywords: [stripe, payments, checkout, subscriptions, one-time payment, consumable, in-app purchase, apple pay, google pay, webhook, publishable key, secret key, supabase]
---

Stripe lets your app take card, Apple Pay and Google Pay payments. Nowa sets up the Supabase side for you (payment tables, server functions and a webhook) and generates a `StripePaymentService` that your buttons can call.

## Before you start

- A Stripe account with your [API keys](https://docs.stripe.com/keys). Use test keys while you build.
- Supabase connected with **Connect**. **Use Keys** is not enough: Nowa creates tables, deploys functions and saves secrets in your Supabase project through that authorization. See [Connect Supabase](./supabase/connect.md).
- Users who sign in with Supabase Auth. The payment functions refuse anyone who is not signed in. See [Sign users in with Supabase](./supabase/auth.md).
- For **One-Time** and **Consumable**: a Supabase table with one row per item you sell, a unique ID column and a price column. For **Subscription**: a price created in Stripe (you need its Price ID).

## Turn on Stripe and add your keys

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **Stripe**.
2. Turn on **Enabled**. Nowa adds the `flutter_stripe` package to your project.
3. Under **1. API Keys**, fill in **Merchant Name** (the name customers see), **Country Code** (two letters, such as `US`) and **Publishable Key** (starts with `pk_`). Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. A check mark confirms the save.
4. Under **Purchase Types**, select what your app sells.

| Purchase type | Use it for | How it works |
|---|---|---|
| **One-Time** | Digital goods, access passes, unique items | Each record can be bought once per user. Selected by default. |
| **Consumable** | Credits, tokens, in-app currency | Records can be bought many times. |
| **Subscription** | Memberships, plans, premium access | Recurring billing using a Stripe Price ID. |

You can select more than one type, and at least one always stays selected.

{/* CAPTURE: id=integrations-stripe-1 | state: playground starter open, Settings open on Integrations → Stripe, Enabled on | show: Enabled switch, 1. API Keys fields and the Purchase Types buttons | crop: Settings window content area */}

Nowa saves the three values from step 3 in **Constants** (**Settings** → **General**) and compiles them into your app. Your secret key is handled separately.

## Add your secret key and webhook

These fields appear once Supabase is connected. Until then the page shows "Connect to Supabase to configure backend settings, secrets, and deploy edge functions."

1. Paste your **Secret Key** (starts with `sk_`) and submit it. Nowa saves it as a Supabase secret (`STRIPE_SECRET_KEY`), never in your app.
2. Click the copy icon (**Copy webhook URL**) next to **Webhook URL**.
3. In your Stripe Dashboard, add a webhook endpoint with that URL and the events in the table below. [Stripe's webhook guide](https://docs.stripe.com/webhooks) covers the dashboard steps.
4. Copy the endpoint's signing secret (starts with `whsec_`) into **Webhook Secret** and submit it. Nowa saves it as `STRIPE_WEBHOOK_SECRET`.

| You selected | Events to send |
|---|---|
| **One-Time** or **Consumable** | `payment_intent.succeeded`, `payment_intent.payment_failed` |
| **Subscription** | `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed` |

Saved secrets are never shown again, so both fields are empty when you reopen the page. The webhook function exists only after you deploy (see below).

## Choose payment methods

Cards work without extra setup. To add wallets, use **2. Payment Methods**. Both wallets need the **Country Code** from step 3.

- **Apple Pay**: turn it on and enter your **Apple Merchant ID**, for example `merchant.com.example.yourapp`. Create the Merchant ID in your Apple Developer account and connect it to Stripe first ([Stripe's Apple Pay guide](https://docs.stripe.com/apple-pay)). Nowa writes the entitlement into `ios/Runner/Runner.entitlements`.
- **Google Pay**: turn it on and enable it in your Stripe Dashboard ([Stripe's Google Pay guide](https://docs.stripe.com/google-pay)). The generated code sets `testEnv: true`, which is Google's test environment. Before you publish, change it in `lib/integrations/stripe_payment_service.dart` ([Code mode](../code/code-mode.md)) or ask Nowa AI.

## Connect your table

Skip this section if you only chose **Subscription**.

1. Under **3. Business Table** ("Select the table containing your orders or transactions"), open **Table** and pick the table that holds your items. If you see "No tables found", click **Refresh**. After you add a table in Supabase, click the refresh icon (**Refresh tables**) next to **Table**.
2. Under **4. Map Fields**, set **ID Field** to the column that identifies each row and **Amount Field** to the column with the price.
3. Set **Currency** to **From Column** and pick a **Currency Column**, or to **Fixed Value** and type a **Fixed Currency** such as `USD`.

Your app sends only the row's ID. The function reads the price and currency from your table as the signed-in user, so the app can't change the amount, and your [row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security) rules must let signed-in users read these rows.

:::warning
Nowa multiplies the **Amount Field** by 100 before it sends the amount to Stripe. Store prices in whole currency units (`9.99`), not in cents, or customers are charged 100 times too much.
:::

## Deploy the configuration

Click **Deploy Configuration**. It stays disabled until the required fields are set: the **Apple Merchant ID** when Apple Pay is on, and, for One-Time and Consumable, a table, **ID Field**, **Amount Field** and a currency. Messages show progress, "Deployed successfully!" appears at the end, and errors show in red under the button.

Nowa creates these in your Supabase project:

| You selected | Table | Edge functions |
|---|---|---|
| **One-Time** | `nowa_stripe_one_time_payments` | `stripe-one-time-payment-intent` |
| **Consumable** | `nowa_stripe_consumable_payments` | `stripe-consumable-payment-intent` |
| **Subscription** | `nowa_stripe_subscriptions` | `stripe-create-subscription`, `stripe-cancel-subscription` |
| Any type | | `stripe-webhook` |

In your project, Nowa also generates `lib/integrations/stripe_payment_service.dart` and updates the platform files Stripe needs: on Android the minimum SDK (at least 23), `MainActivity`, ProGuard rules and the app theme; on iOS the **Camera** permission and, when Apple Pay is on, the Apple Pay entitlement.

Check your Supabase dashboard to confirm the tables and functions are there.

![Supabase dashboard listing the nowa_stripe_one_time_payments and nowa_stripe_consumable_payments tables created by Deploy Configuration](/img/docs/integrations/stripe-supabase-tables.png)

After any change, such as a new purchase type or a different table, click **Deploy Configuration** again. Existing payment tables are kept.

{/* CAPTURE: id=integrations-stripe-2 | state: signed-in cloud project, Supabase connected, Stripe enabled, One-Time selected, a table picked | show: 3. Business Table, 4. Map Fields and the Deploy Configuration button | crop: Settings window content area, lower half */}

## Take a payment from a button

1. Select your button. In **Details**, click **+** next to **On Pressed**. Circuit opens ([Respond to taps and other events](../logic/events.md)).
2. Hover the dot under the top node and click **+**. In **All nodes for this circuit**, search for `StripePaymentService`, pick it, then pick `processPayment` (or `subscribe`). See [Build logic in Circuit](../logic/circuit.md).
3. In **Details**, set `recordId` to the item's ID, a value from your **ID Field** column: click its label to open the link menu and pick the value ([Expressions and conditions](../logic/expressions.md)). For `subscribe`, set `priceId` to your Stripe Price ID.
4. Under **Future Options**, add logic to **onValue** for a successful payment and to **onError** for a failed one.

Stripe's payment sheet opens in your app. Test it on a device or emulator with Stripe's [test cards](https://docs.stripe.com/testing) while your keys are in test mode. Running on a device needs the desktop app: see [Run on a device or emulator](../test/devices.md).

:::tip[Or ask Nowa AI]
After you deploy, ask the agent to wire the button, for example: "When the user taps Buy, charge the selected product with StripePaymentService.processPayment and show a snackbar when it succeeds."
:::

`StripePaymentService` has these methods, depending on the types you selected:

| Method | What it does |
|---|---|
| `processPayment(recordId:)` | Opens the payment sheet for one item. Named `processOneTimePayment` and `processConsumablePayment` if you selected both types. |
| `getPaymentStatus(recordId)`, `getPaymentDetails(recordId)` | Return the signed-in user's payment status (`pending`, `succeeded` or `failed`) or full record for the item. Same naming rule. |
| `subscribe(priceId:)` | Starts a subscription for a Stripe Price ID and opens the payment sheet. |
| `getSubscriptionStatus()`, `getSubscriptionDetails()` | Return the status or full record of the user's latest subscription. |
| `cancelSubscription()` | Cancels the user's subscription at the end of the billing period. |

## Fix common problems

| Message or symptom | Cause and fix |
|---|---|
| "User must be authenticated to make payments" or "User not authenticated" | The user is not signed in with Supabase Auth. Sign them in before they pay. |
| "Payment already completed for this order" | A **One-Time** item can be bought once per user. Use **Consumable** for items people buy again. |
| A payment stays `pending` | The webhook is not reaching Supabase. Check the endpoint URL, the events selected in Stripe and **Webhook Secret**. |

## Remove Stripe

Turn **Enabled** off. Nowa deletes the Stripe settings, `lib/integrations/stripe_payment_service.dart` and the Android and iOS changes, so remove any logic that calls `StripePaymentService` first. Your Supabase project is not touched: delete its tables, functions and secrets yourself if you no longer need them.

## Next steps

- [Show your products with Data Builder](./show-data.md)
- [Keys and constants](./constants.md)
- [Sign users in with Supabase](./supabase/auth.md)
