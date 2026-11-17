// A What's new page as plain Markdown, for the app to show inside Nowa (`_nowa.markdown` in feed.json).
// The page's own Markdown, with what only the docs site understands turned into plain Markdown:
// the truncate marker goes, links and images get the site's full address, and a video becomes its
// poster image with the video's address as the image's title, which the app plays in its place.

const truncate = /^\s*<!--\s*truncate\s*-->\s*$/m;
const video = /<video\b[^>]*?poster="([^"]+)"[^>]*>[\s\S]*?<source\b[^>]*?src="([^"]+)"[\s\S]*?<\/video>/g;
const img = /<img\b[^>]*\/?>/g;
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '';
const rootLink = /\]\((\/[^)\s]*)\)/g;

module.exports = function releaseMarkdown(content, siteUrl) {
  const absolute = (path) => (path.startsWith('/') ? siteUrl + path : path);
  return content
    .replace(truncate, '')
    .replace(video, (_, poster, src) => `![Watch the video](${absolute(poster)} "${absolute(src)}")`)
    .replace(img, (tag) => `![${attribute(tag, 'alt')}](${absolute(attribute(tag, 'src'))})`)
    .replace(rootLink, (_, path) => `](${absolute(path)})`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};
