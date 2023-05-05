import { defineConfig } from 'vitepress';
import axios from 'axios';

export default async function() { 
  
  //const xeitoLatestRelease = await fetch('https://api.github.com/repos/aerotoad/xeito/releases/latest').then(res => res.json());
  const xeitoLatestRelease = await axios.get('https://api.github.com/repos/aerotoad/xeito/releases/latest').then(res => res.data);

  return defineConfig({
    base: '/',
    title: 'Xeito',
    description: 'Typescript framework for building web applications',
    titleTemplate: ':title | Xeito',
    appearance: 'dark',
    cleanUrls: 'without-subfolders',
    head: [
      ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
      ['link', { rel: 'manifest', href: '/site.webmanifest' }],
      ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
      ['meta', { name: 'msapplication-TileColor', content: '#5bbad5' }],
      ['meta', { name: 'theme-color', content: '#ffffff' }],
    ],
    themeConfig: {
      logo: '/images/logo_gradient.svg',
      nav: [
        {
          text: 'Documentation',
          items: [
            { text: 'Guide', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ]
        },
        {
          text: xeitoLatestRelease.tag_name,
          items: [
            { text: 'Latest Release', link: xeitoLatestRelease.html_url },
            { text: 'Changelog', link: 'https://github.com/aerotoad/xeito/blob/main/CHANGELOG.md' },
          ]
        }
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/aerotoad/xeito' },
        { icon: 'twitter', link: 'https://twitter.com/xeitojs' }
      ],

      footer: {
        message: `
          Released under the 
          <a href="https://opensource.org/licenses/MIT" target="_blank" class="footer-year">MIT License</a>.
        `,
        copyright: 'Copyright © 2022 Samuel Bazaga'
      },

      search: {
        provider: 'local'
      },

      sidebar: [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ]
        },
        {
          text: 'Essentials',
          items: [
            { text: 'Creating an application', link: '/guide/essentials/application' },
            { text: 'Template syntax', link: '/guide/essentials/template-syntax' },
            { text: 'Conditional rendering', link: '/guide/essentials/conditional-rendering' },
            { text: 'List rendering', link: '/guide/essentials/list-rendering' },
            { text: 'Event handling', link: '/guide/essentials/event-handling' }
          ]
        },
        {
          text: 'Components',
          items: [
            { text: 'Component Structure', link: '/guide/components/structure' },
            { text: 'State', link: '/guide/components/state' },
            { text: 'Props', link: '/guide/components/props' },
            { text: 'Watchers', link: '/guide/components/watchers' },
            { text: 'Events', link: '/guide/components/events' },
            { text: 'Slotted Content', link: '/guide/components/slotted-content' },
            { text: 'Imperative DOM', link: '/guide/components/imperative-dom' },
            { text: 'Global properties', link: '/guide/components/global' },
            { text: 'Manual Updates', link: '/guide/components/manual-updates' },
            { text: 'Styling', link: '/guide/components/styling' },
          ]
        },
        {
          text: 'Stores',
          items: [
            { text: `What is a store`, link: '/guide/stores/what-is-a-store' },
            { text: 'WriteStore', link: '/guide/stores/write-store' },
            { text: 'ReadStore', link: '/guide/stores/read-store' },
            { text: 'DerivedStore', link: '/guide/stores/derived-store' },
            { text: 'Stores in components', link: '/guide/stores/stores-in-components' }
          ]
        },
        {
          text: 'Reusability',
          items: [
            { text: 'Services', link: '/guide/reusability/services' },
            { text: 'Actions', link: '/guide/reusability/actions' },
            { text: 'Pipes', link: '/guide/reusability/pipes' },
            { text: 'Plugins', link: '/guide/reusability/plugins' },
          ]
        },
        {
          text: 'Routing',
          items: [
            { text: 'Using the router', link: '/guide/routing/using' },
            { text: 'Router Components', link: '/guide/routing/router-components' },
            { text: 'Dynamic Route Matching', link: '/guide/routing/dynamic-matching' },
            { text: 'Nested Routes', link: '/guide/routing/nested-routes' },
            { text: 'Programmatic Navigation', link: '/guide/routing/programmatic-navigation' },
            { text: 'Route Guards', link: '/guide/routing/guards' },
          ]
        }
      ]
    }
  })
};
