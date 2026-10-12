# P14-B13: facts moved to the code section

Each bullet is copied unchanged from the page it left, for `docs/code/generated-code.md`.

## #assets

- From `reference/widgets/media.md` (Add an image, **Asset**): "Nowa saves it in `assets/` and picks it." (The page now says "Nowa adds it to your project's assets and picks it.")

## #packages

- From `reference/widgets/media.md` (table, "Needs a package" column, now "Yes" / "No"): "**SVG** ... `flutter_svg`"; "**YouTube Player** ... `youtube_player_flutter`"; "**Lottie** ... `lottie`"; "**Rive** ... `rive`"; "**Html** ... `flutter_html`, added by you". (`flutter_html` stays on the page because **Problems** names it.)
- From old `ui/widgets/widget-desc/youtube-player.md` (dev-only, never on a new page): "This widget uses the [`youtube_player_flutter`](https://pub.dev/packages/youtube_player_flutter) package, which handles embedding, controlling, and displaying YouTube videos in Flutter." Nowa adds it at `^9.1.3` (`packages/core/lib/src/interpreter/packages/dart_package.dart:142-146`).
- From `reference/widgets/lists.md` (Add swipeable cards, step 1): "The widget needs the `flutter_card_swiper` package." (The page now says "the cards need a package to work".)
- From `reference/widgets/forms.md` (Add a pin code field, step 1): "The field needs the `pin_code_fields` package." (The page now says "the boxes need a package to work".)
- From `reference/widgets/navigation.md` (Swipe between pages): "They come from the `smooth_page_indicator` package, which `nowa_runtime` no longer includes." (The page keeps the package name, because **Problems** names it, and drops `nowa_runtime`.)
- From `reference/widgets/index.md` (catalog rows; each now says "Needs a package"): SVG "Needs the `flutter_svg` package."; Swipeable Stack "Needs the `flutter_card_swiper` package and creates a `swiperController` variable."; Page View "They come from the `smooth_page_indicator` package"; YouTube Player "Needs the `youtube_player_flutter` package."; Lottie "Needs the `lottie` package."; Rive "Needs the `rive` package."; Pin Code Field "Needs the `pin_code_fields` package and creates a `pinCode` variable."

## #admob

- From `reference/widgets/index.md` (Admob Banner row): "Needs the `nowa_mobile_ads` package and your App IDs in **Settings** → **Integrations**."

## #google-maps

- From `reference/widgets/index.md` (Google Maps row): "Needs the `google_maps_flutter` package and your API keys in **Settings** → **Integrations**."

## #revenuecat

- From `reference/widgets/index.md` (RevenueCat Paywall row): "Needs the `purchases_flutter` and `purchases_ui_flutter` packages and your RevenueCat keys in **Settings** → **Integrations**."
