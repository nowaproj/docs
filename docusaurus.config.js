// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// const lightCodeTheme = require('prism-react-renderer/themes/github');
// const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;



/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nowa Documentation',
  tagline: 'The official Documentation for Nowa',
  favicon: 'img/favicon.ico',

  stylesheets: [
    "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css",
  ],

  // Set the production url of your site here
  url: 'https://docs.nowa.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nowaproj', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  markdown: {
  hooks: {
    onBrokenMarkdownLinks: 'warn',
  },
},

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      "posthog-docusaurus",
      {
        apiKey: "phc_t9ByiL3PTqP8dTa6nWoqjoygz7nIuKOjLPXig1rxm6C",
        appUrl: "https://us.i.posthog.com", // optional, defaults to "https://us.i.posthog.com"
        enableInDevelopment: false, // optional
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-CMNS133C82',
          anonymizeIP: false,

        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/nowa_icon.png',

      // Replace with your project's social card
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },

      algolia: {
        // The application ID provided by Algolia
        appId: 'C8KMOL6UCU',

        // Public API key: it is safe to commit it
        apiKey: '40e215297ab6bcabae30fa4599cab238',

        indexName: 'nowa',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },

      announcementBar: {
        id: 'announcement-2',
        content:
          '🚀 <strong>Nowa 3.0 Docs are live!</strong> Missing something? Tell us at <a href="mailto:team@nowa.dev">team@nowa.dev</a> 💬',
        backgroundColor: '#A3784A',
        textColor: '#ffffff',
        isCloseable: true,
      },
      
            navbar: {
        title: 'Nowa Documentation',
        logo: {
          alt: 'Nowa',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'Get Started',
            position: 'right',
            to: 'https://app.nowa.dev/signup'
          },
          {
            label: 'Sign In',
            position: 'right',
            to: 'https://app.nowa.dev/'
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Product',
            items: [
              {
                label: 'Main website',
                href: 'https://nowa.dev',
              },
              {
                label: 'Get started with Nowa',
                href: 'https://app.nowa.dev/signup',
              },
              {
                label: 'Sign In',
                href: 'https://app.nowa.dev',
              },
            ],
          },
          {
            title: 'Resources & Communities',
            items: [
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UCvP7LKeb2sW1yTUqHAFEKOw',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/ByKfn3H7gX',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/nowa/',
              }

            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/nowa.dev/',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/nowaengine/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/nowa_dev',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nowa. All rights reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
