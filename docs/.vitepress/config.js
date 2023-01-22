export default {
  
  base: '/',
  title: 'Xeito',
  description: 'Typescript framework for building web applications',
  titleTemplate: ':title | Xeito',
  appearance: 'dark',
  cleanUrls: 'with-subfolders',
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
        text: 'Docs',
        items: [
          { text: 'Guide', link: '/guide/introduction' },
          { text: 'Quick Start', link: '/guide/quick-start' },
        ]
      }
    ],
      
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aerotoad/xeito' },
    ],

    footer: {
      message: `
        Released under the 
        <a href="https://opensource.org/licenses/MIT" target="_blank" class="footer-year">MIT License</a>.
      `,
      copyright: 'Copyright © 2022 Samuel Bazaga'
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
          { text: 'Creating an application', link: '/essentials/application' },
          { text: 'Template syntax', link: '/essentials/template-syntax' },
          { text: 'Lists and conditionals', link: '/essentials/lists-and-conditionals' },
          { text: 'Event handling', link: '/essentials/event-handling' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Component Structure', link: '/components/structure' },
          { text: 'State', link: '/components/state' },
          { text: 'Props', link: '/components/props' },
          { text: 'Watchers', link: '/components/watchers' },
          { text: 'Events', link: '/components/events' },
          { text: 'Slotted Content', link: '/components/slotted-content' },
          { text: 'Imperative DOM', link: '/components/imperative-dom' },
          { text: 'Global properties', link: '/components/global' },
          { text: 'Manual Updates', link: '/components/manual-updates' },
        ]
      },
      {
        text: 'Stores',
        items: [
          { text: `What is a store`, link: '/stores/what-is-a-store' },
          { text: 'WriteStore', link: '/stores/write-store' },
          { text: 'ReadStore', link: '/stores/read-store' },
          { text: 'MixedStore', link: '/stores/mixed-store' },
          { text: 'Stores in components', link: '/stores/stores-in-components' }
        ]
      },
      {
        text: 'Reusability',
        items: [
          { text: 'Services', link: '/reusability/services' },
          { text: 'Actions', link: '/reusability/actions' },
          { text: 'Pipes', link: '/reusability/pipes' },
          { text: 'Plugins', link: '/reusability/plugins' },
        ]
      },
      {
        text: 'Routing',
        items: [
          { text: 'Using the router', link: '/routing/using' },
          { text: 'Router Components', link: '/routing/router-components' },
          { text: 'Dynamic Route Matching', link: '/routing/dynamic-matching' },
          { text: 'Nested Routes', link: '/routing/nested-routes' },
          { text: 'Programmatic Navigation', link: '/routing/programmatic-navigation' },
          { text: 'Route Guards', link: '/routing/guards' },
        ]
      }
    ]
  }
}
