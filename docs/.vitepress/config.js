export default {
  
  base: '/xeito-docs/',
  title: 'Xeito',
  description: 'Typescript framework for building web applications',
  themeConfig: {
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
        <a href="https://opensource.org/licenses/MIT" target="_blank" style="color: #fff">MIT License</a>.
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
          { text: 'Styles', link: '/essentials/styles' },
          { text: 'Conditional rendering', link: '/essentials/conditional' },
          { text: 'List rendering', link: '/essentials/list' },
          { text: 'Event handling', link: '/essentials/event-handling' },
          { text: 'Form input binding', link: '/essentials/forms' },
          { text: 'Lifecycle hooks', link: '/essentials/lifecycle' },
          { text: 'Component props', link: '/essentials/props' },
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Component Structure', link: '/components/structure' },
          { text: 'State', link: '/components/state' },
          { text: 'Props', link: '/components/props' },
          { text: 'Events', link: '/components/events' },
          { text: 'Slotted Content', link: '/components/slotted-content' },
          { text: 'Imperative DOM', link: '/components/imperative-dom' },
          { text: 'Global properties', link: '/components/global' },
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
