// @ts-check

/**
 * The docs sidebar, in the order a new user builds an app: get started, build with Nowa AI, design,
 * add logic, connect data, preview, publish, then code, account, troubleshooting and reference.
 * Every section opens on its overview page.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docs: [
    {type: 'doc', id: 'index', label: 'Home'},
    {
      type: 'category',
      label: 'Get started',
      collapsed: false,
      link: {type: 'doc', id: 'get-started/welcome'},
      items: [
        'get-started/first-app',
        'get-started/create-account',
        'get-started/editor-tour',
        'get-started/cloud-and-local',
        'get-started/desktop-app',
        'get-started/playground',
        'get-started/mobile',
      ],
    },
    {
      type: 'category',
      label: 'Build with Nowa AI',
      link: {type: 'doc', id: 'ai/index'},
      items: [
        'ai/modes',
        'ai/chat',
        'ai/context',
        'ai/undo-and-history',
        'ai/prompting',
        'ai/connectors',
        'ai/external-agent',
      ],
    },
    {
      type: 'category',
      label: 'Design your app',
      link: {type: 'doc', id: 'design/index'},
      items: [
        'design/boards',
        'design/screens',
        'design/components',
        'design/add-widgets',
        'design/select-and-edit',
        'design/properties',
        'design/layout',
        'design/responsive',
        'design/outline',
        'design/themes',
        'design/theme-styles',
        'design/assets',
        'design/fonts-icons',
        'design/templates',
        'design/localization',
      ],
    },
    {
      type: 'category',
      label: 'Add logic',
      link: {type: 'doc', id: 'logic/index'},
      items: [
        'logic/events',
        'logic/circuit',
        'logic/variables',
        'logic/parameters',
        'logic/global-state',
        'logic/functions',
        'logic/expressions',
        'logic/navigation',
        'logic/popups',
        'logic/actions',
        'logic/models',
      ],
    },
    {
      type: 'category',
      label: 'Connect data and services',
      link: {type: 'doc', id: 'integrations/index'},
      items: [
        'integrations/show-data',
        {
          type: 'category',
          label: 'REST APIs',
          link: {type: 'doc', id: 'integrations/rest-api/index'},
          items: ['integrations/rest-api/import'],
        },
        {
          type: 'category',
          label: 'Supabase',
          link: {type: 'doc', id: 'integrations/supabase/connect'},
          items: [
            'integrations/supabase/auth',
            'integrations/supabase/database',
            'integrations/supabase/storage',
            'integrations/supabase/backend',
          ],
        },
        {
          type: 'category',
          label: 'Firebase',
          link: {type: 'doc', id: 'integrations/firebase/connect'},
          items: [
            'integrations/firebase/auth',
            'integrations/firebase/firestore',
            'integrations/firebase/notifications',
          ],
        },
        'integrations/stripe',
        'integrations/revenuecat',
        'integrations/admob',
        'integrations/google-maps',
        'integrations/google-sign-in',
        'integrations/deep-links',
        'integrations/constants',
      ],
    },
    {
      type: 'category',
      label: 'Preview and test',
      link: {type: 'doc', id: 'test/index'},
      items: ['test/instant-play', 'test/run', 'test/devices', 'test/share', 'test/problems'],
    },
    {
      type: 'category',
      label: 'Publish',
      link: {type: 'doc', id: 'publish/index'},
      items: ['publish/web', 'publish/android', 'publish/ios', 'publish/builds', 'publish/download-code'],
    },
    {
      type: 'category',
      label: 'Work with code',
      link: {type: 'doc', id: 'code/index'},
      items: [
        'code/code-mode',
        'code/files',
        'code/packages',
        'code/custom-code',
        'code/limitations',
        'code/local-projects',
        'code/vs-code',
        'code/import',
        'code/git',
        'code/github',
      ],
    },
    {
      type: 'category',
      label: 'Projects and account',
      link: {type: 'doc', id: 'account/index'},
      items: [
        'account/projects',
        'account/project-settings',
        'account/account-settings',
        'account/workspaces',
        'account/plans-and-usage',
        'account/help',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: {type: 'doc', id: 'troubleshooting/index'},
      items: ['troubleshooting/known-issues'],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {
          type: 'category',
          label: 'Widgets',
          link: {type: 'doc', id: 'reference/widgets/index'},
          items: [],
        },
        'reference/wrappers',
        'reference/shortcuts',
        'reference/glossary',
      ],
    },
    {
      type: 'category',
      label: "What's new",
      link: {type: 'doc', id: 'new/whats-new'},
      items: ['new/change-log'],
    },
    {
      type: 'category',
      label: 'Legacy tutorials',
      link: {type: 'doc', id: 'legacy/index'},
      items: [
        {
          type: 'category',
          label: 'Design courses',
          items: [
            'legacy/design-courses/booking-app',
            'legacy/design-courses/ecommerce-app',
            'legacy/design-courses/football-app',
            'legacy/design-courses/workout-planner',
          ],
        },
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'legacy/tutorials/chat-template',
            'legacy/tutorials/design-responsive',
            'legacy/tutorials/form-validation',
            'legacy/tutorials/loading-indicator',
            'legacy/tutorials/splashscreen',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
