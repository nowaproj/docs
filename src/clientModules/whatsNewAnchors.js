import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// What's new used to be one long page with a section per release, so links (and the Nowa app)
// may point at /new/whats-new#3150-20-october-2026. That page is now the list of release pages:
// send those links on to the release's own page. whatsNewAnchors.json maps each old section ID
// to the release page's slug; it's only loaded when such a link is opened.
export function onRouteDidUpdate({location}) {
  if (!ExecutionEnvironment.canUseDOM || !location.hash) return;
  if (location.pathname.replace(/\/$/, '') !== '/new/whats-new') return;
  const anchor = decodeURIComponent(location.hash.slice(1));
  import('./whatsNewAnchors.json').then(({default: anchors}) => {
    const slug = anchors[anchor];
    if (slug) window.location.replace(`/new/whats-new/${slug}`);
  });
}
