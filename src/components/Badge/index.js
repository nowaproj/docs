import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// Availability badges used across the docs. Usage in any page: <Badge type="enterprise" />
const TYPES = {
  beta: {label: 'Beta', className: styles.beta},
  enterprise: {label: 'Enterprise', className: styles.enterprise},
  paid: {label: 'Paid plans', className: styles.enterprise},
  desktop: {label: 'Desktop app', className: styles.platform},
  web: {label: 'Web app', className: styles.platform},
  local: {label: 'Local projects', className: styles.platform},
  cloud: {label: 'Cloud projects', className: styles.platform},
};

export default function Badge({type, children}) {
  const config = TYPES[type] ?? {label: type, className: styles.platform};
  return (
    <span className={clsx(styles.badge, config.className)}>
      {children ?? config.label}
    </span>
  );
}
