import React from 'react';
import DocVersionBanner from '@theme-original/DocVersionBanner';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

// Marks every page under /legacy/ (except the section overview) as made with an earlier version of Nowa,
// without editing the legacy pages themselves.
export default function DocVersionBannerWrapper(props) {
  const {pathname} = useLocation();
  const isLegacyPage = /^\/legacy\/.+/.test(pathname);
  return (
    <>
      {isLegacyPage && (
        <div className="alert alert--warning margin-bottom--md" role="alert">
          <strong>Legacy tutorial.</strong> Made with an earlier version of Nowa, so screens and labels may look
          different today. For current steps, see{' '}
          <Link to="/get-started/first-app">Build your first app</Link> or{' '}
          <Link to="/legacy">all legacy tutorials</Link>.
        </div>
      )}
      <DocVersionBanner {...props} />
    </>
  );
}
