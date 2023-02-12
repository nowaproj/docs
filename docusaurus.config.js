// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nowa Documentation',
  tagline: 'The official Documentation for Nowa',
  favicon: 'img/favicon.ico',

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
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

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
