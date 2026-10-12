import React from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {useAnchorTargetClassName} from '@docusaurus/theme-common';

// An invisible link target, for example inside a table cell. It registers the id with Docusaurus'
// broken-anchor check and gets the same sticky-navbar scroll offset as headings.
// Usage in any page: <Anchor id="textfield" />
export default function Anchor({id}) {
  useBrokenLinks().collectAnchor(id);
  const className = useAnchorTargetClassName(id);
  return <span id={id} className={className} />;
}
