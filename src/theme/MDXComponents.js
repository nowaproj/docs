import MDXComponents from '@theme-original/MDXComponents';
import Anchor from '@site/src/components/Anchor';
import Badge from '@site/src/components/Badge';

// Make <Badge> and <Anchor> available in every doc page without an import.
export default {
  ...MDXComponents,
  Anchor,
  Badge,
};
