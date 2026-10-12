# P14-B13: facts moved to the code section

Each bullet is copied unchanged from the page it left, for `docs/code/generated-code.md`.

## #assets

- From `reference/widgets/media.md` (Add an image, **Asset**): "Nowa saves it in `assets/` and picks it." (The page now says "Nowa adds it to your project's assets and picks it.")

## #packages

- From `reference/widgets/media.md` (table, "Needs a package" column, now "Yes" / "No"): "**SVG** ... `flutter_svg`"; "**YouTube Player** ... `youtube_player_flutter`"; "**Lottie** ... `lottie`"; "**Rive** ... `rive`"; "**Html** ... `flutter_html`, added by you". (`flutter_html` stays on the page because **Problems** names it.)
- From old `ui/widgets/widget-desc/youtube-player.md` (dev-only, never on a new page): "This widget uses the [`youtube_player_flutter`](https://pub.dev/packages/youtube_player_flutter) package, which handles embedding, controlling, and displaying YouTube videos in Flutter." Nowa adds it at `^9.1.3` (`packages/core/lib/src/interpreter/packages/dart_package.dart:142-146`).
- From `reference/widgets/lists.md` (Add swipeable cards, step 1): "The widget needs the `flutter_card_swiper` package." (The page now says "the cards need a package to work".)
