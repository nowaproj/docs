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
