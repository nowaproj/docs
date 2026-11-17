// A What's new page as plain Markdown, for the app to show inside Nowa (`_nowa.markdown` in feed.json).
// The page's own Markdown, with what only the docs site understands turned into plain Markdown:
// HTML comments (like the truncate marker) go, links and images get the site's full address, and a
// video becomes its poster image with the video's address as the image's title, which the app plays
// in its place.

const comment = /<!--[\s\S]*?-->/g;
const video = /<video\b[^>]*?poster="([^"]+)"[^>]*>[\s\S]*?<source\b[^>]*?src="([^"]+)"[\s\S]*?<\/video>/g;
const img = /<img\b[^>]*\/?>/g;
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '';
const rootLink = /\]\((\/[^)\s]*)\)/g;

function releaseMarkdown(content, siteUrl) {
  const absolute = (path) => (path.startsWith('/') ? siteUrl + path : path);
  return content
    .replace(comment, '')
    .replace(video, (_, poster, src) => `![Watch the video](${absolute(poster)} "${absolute(src)}")`)
    .replace(img, (tag) => `![${attribute(tag, 'alt')}](${absolute(attribute(tag, 'src'))})`)
    .replace(rootLink, (_, path) => `](${absolute(path)})`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// What would look broken in the app's Markdown renderer, which shows HTML and Docusaurus syntax as text.
// Code blocks and code spans are left out, since `List<String>` in code is fine.
const checks = [
  [/<\/?[a-zA-Z][^>]*>/g, (m) => `HTML the app can't show: ${m}. Use Markdown, or a <video> with a poster and a <source>.`],
  [/^:::\w*/gm, (m) => `a Docusaurus box (${m}), which the app shows as text. Use a plain paragraph.`],
  [/^(import|export)\s.*$/gm, (m) => `MDX (${m}), which the app shows as text.`],
  [/\]\((?!https?:\/\/|mailto:|#)([^)\s]+)/g, (m, path) => `a link to ${path}. Link by URL from the site root, like /ai/chat.`],
  [/!\[[^\]]*\]\(([^)\s]+\.svg)\b/gi, (m, src) => `an SVG image (${src}), which the app can't draw. Use PNG or JPG.`],
];

function releaseMarkdownProblems(markdown) {
  const prose = markdown.replace(/^```[\s\S]*?^```/gm, '').replace(/`[^`\n]*`/g, '');
  const problems = checks.flatMap(([pattern, message]) => [...prose.matchAll(pattern)].map((match) => message(...match)));
  return [...new Set(problems)];
}

module.exports = {releaseMarkdown, releaseMarkdownProblems};
