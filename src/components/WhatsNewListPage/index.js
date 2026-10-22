import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogPostItems from '@theme/BlogPostItems';
import SearchMetadata from '@theme/SearchMetadata';
import Heading from '@theme/Heading';

// The What's new list (/new/whats-new): Docusaurus' blog list page plus a title and an intro,
// which the default one doesn't have. Set as `blogListComponent` in docusaurus.config.js.
export default function WhatsNewListPage(props) {
  const {metadata, items, sidebar} = props;
  const {blogTitle, blogDescription, page} = metadata;
  const rssUrl = useBaseUrl('/new/whats-new/rss.xml');
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <PageMetadata
        title={page > 1 ? `${blogTitle}, page ${page}` : blogTitle}
        description={blogDescription}
      />
      <SearchMetadata tag="blog_posts_list" />
      <BlogListPageStructuredData {...props} />
      <BlogLayout sidebar={sidebar}>
        <header className="margin-bottom--xl">
          <Heading as="h1">📰 What's new</Heading>
          <p>
            Discover the latest features and enhancements for each version of Nowa. For more
            details, check the <Link to="/new/change-log">changelog</Link>. To hear about new
            releases, follow the <a href={rssUrl}>RSS feed</a>.
          </p>
        </header>
        <BlogPostItems items={items} />
        <BlogListPaginator metadata={metadata} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
