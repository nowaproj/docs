# W21 writer notes (store rules pointers, 2026-10-08)

Brief: D18 / Q3 (`_rewrite/decisions.md`, `_rewrite/open-questions.md`): the docs point readers to Apple's and Google's own store rules, citing only official pages. Facts about Nowa come from `/home/user/nowa-master` (v3.12.5); facts about the stores come only from the official pages listed below. Nothing here states a store rule that was not read on an official page.

## Official pages: what was fetched, what was not (2026-10-08)

Method: every page below was fetched with WebFetch first. Where a page's exact wording matters (everything I quote), I also downloaded the raw HTML with curl through the same proxy and grepped the text, because WebFetch answers through a summarizing model. The quotes in the docs were compared with the raw text. Apple's documentation pages (`/documentation/...`) are JavaScript-rendered, so WebFetch returns only the title; I read the page's own JSON data source (`https://developer.apple.com/tutorials/data/documentation/uikit/requesting-access-to-protected-resources.json`) instead.

### Fetched and read (Apple)

| Page | URL | What I used (verbatim quotes are in the page notes below) |
|---|---|---|
| App Review Guidelines (footer: "Last Updated: June 8, 2026") | https://developer.apple.com/app-store/review/guidelines/ | 3.1.1, 3.1.3, 4.8, 5.1.1(i), 5.1.1(v), "Before You Submit". Anchor ids checked in the raw HTML: `#payments` (3.1), `#in-app-purchase` (3.1.1), `#other-purchase-methods` (3.1.3), `#login-services` (4.8), `#data-collection-and-storage` (5.1.1), `#before-you-submit`. |
| 5.1.1(v) - Offering account deletion in your app | https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion | Linked from guideline 5.1.1(v) on the guidelines page; used only as a link target. |
| App privacy details on the App Store | https://developer.apple.com/app-store/app-privacy-details/ | Opening paragraph, privacy policy URL "(Required)". |
| Manage app privacy (App Store Connect Help) | https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy | Read for context ("A privacy policy URL is required for all apps, while a user privacy choices URL is optional."). |
| Requesting access to protected resources | https://developer.apple.com/documentation/uikit/requesting-access-to-protected-resources (read from its JSON data source) | "App Review checks for the use of protected resources, and rejects apps that contain code accessing those resources without a purpose string."; "You supply a message called a purpose string or a usage description". |

### Fetched and read (Google, developer.android.com)

| Page | URL | What I used |
|---|---|---|
| Google Play Policies | https://developer.android.com/distribute/play-policies | "This page is updated with the latest information about these policies, including any changes you may be required to make."; links "Google Play Developer Policy Center" -> `https://play.google.com/about/developer-content-policy/` (href checked in the raw HTML). |
| Google Play's billing system | https://developer.android.com/google/play/billing | "Google Play's billing system is a service that enables you to sell digital products and content in your Android app, whether you want to monetize through one-time purchases or offer subscriptions to your services." No sentence on when an app must use it (also checked `/distribute/play-billing`, `/google/play/billing/alternative`, `/google/play/billing/getting-ready`: none states the Payments rule). |
| Declare your app's data use | https://developer.android.com/privacy-and-security/declare-data-use (`/security-and-privacy/data/declare-data-use` redirects here) | Data safety form on the App content page; third-party SDK sentence. |
| Privacy checklist | https://developer.android.com/privacy-and-security/about | Read for context; it links Google's "User Data" article (below). |
| Google Play Console | https://developer.android.com/distribute/console | Read; nothing on privacy policy or account deletion. |

### NOT fetched (blocked by the egress proxy: `EGRESS_BLOCKED` for `play.google.com`, `support.google.com`, `play.google`)

These are linked from the docs, and every sentence that links to them stays generic (it names the page and says what its title says, nothing more). The URLs and titles come from official pages I could read (the developer.android.com links above) or from the official page titles in search results; I did not read their content.

| Link used in the docs | Title as seen | Where the URL came from |
|---|---|---|
| https://play.google.com/about/developer-content-policy/ | "Google Play Developer Policy Center" | link on https://developer.android.com/distribute/play-policies (fetched) |
| https://play.google.com/about/privacy-security-deception/user-data/ | "User Data" article in the Google Play Developer Policy Center | link on https://developer.android.com/privacy-and-security/about (fetched) |
| https://support.google.com/googleplay/android-developer/answer/10787469 | "Provide information for Google Play's Data safety section" | link on https://developer.android.com/privacy-and-security/declare-data-use (fetched) |
| https://support.google.com/googleplay/android-developer/answer/10281818 | "Understanding Google Play's Payments policy - Play Console Help" | title and URL in a search result, not linked from a fetched page |
| https://support.google.com/googleplay/android-developer/answer/13327111 | "Understanding Google Play's app account deletion requirements - Play Console Help" | title and URL in search results (several variants of the URL), not linked from a fetched page |

Consequences: the docs do not say what Google's Payments policy, User Data policy or account deletion requirements contain, and they do not say that Google Play requires a privacy policy (no fetchable official page says it).

Search-result summaries from WebSearch described these Google rules in detail. I did not use any of that text: it is a model summary of snippets and third-party articles, not an official page.
