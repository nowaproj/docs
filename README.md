# Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

The build also validates every video referenced by the active documentation. The
validation requires `ffprobe`, which is included with
[FFmpeg](https://ffmpeg.org/download.html).

### Adding videos

Documentation videos must be web-optimized MP4 files with H.264 video, optional
AAC audio, a maximum resolution of 1920x1080, and a maximum frame rate of 30 fps.
Use this markup in Markdown and MDX files:

```mdx
<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/example.mp4" type="video/mp4" />
</video>
```

Run `yarn check:videos` before committing a new or replaced video. The check also
verifies exact filename case, URL separators, codec compatibility, and MP4 fast
start metadata.

### Adding a release to What's new

What's new (`/new/whats-new`) is a feed with one page per release, built from the
files in `whats-new/` by a second Docusaurus blog. The list, the sidebar, the tag
pages and the RSS and Atom feeds update on their own. For each release:

1. Add `whats-new/<date>-<slug>.md`, like `whats-new/2026-10-20-3-15.md`, with
   this front matter:

   ```md
   ---
   title: "Nowa 3.15: Design right on the board"
   sidebar_label: "3.15 · Design right on the board"
   description: "One or two sentences for search results and link previews."
   slug: 3-15
   date: 2026-10-20
   tags: [design, nowa-ai]
   image: /videos/whats-new/3.15.0-board-handles.jpg
   ---
   ```

   The slug is the version with dots turned into dashes, leaving out a final
   `.0` (3.15.0 is `3-15`, 3.14.1 is `3-14-1`). The page lives at
   `/new/whats-new/<slug>`. Tags must be listed in `whats-new/tags.yml`. `image`
   is the picture shown when someone shares the link, usually the poster of the
   first video.
2. Write the intro paragraph, then `<!-- truncate -->`. The list shows only
   what's above that line, followed by **Read more**.
3. Below it, add the changelog line, then the release notes with `##` section
   headings (`## **New in This Version ✨**`, `## **Bug Fixes 🩹**`). Link to
   docs and the changelog by URL, like `/new/change-log#3150-20-october-2026`,
   not by file path.
4. In `docs/new/change-log.md`, add a line under the version heading that links
   back to the release page:
   `📰 See the highlights of this release in [What's new](/new/whats-new/3-15).`

Links to a release on the old single What's new page, like
`/new/whats-new#3150-20-october-2026`, are sent to the release page by
`src/clientModules/whatsNewAnchors.js`. New releases don't need an entry there.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
