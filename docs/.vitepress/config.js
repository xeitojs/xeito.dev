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
        text: 'Services',
        items: [
          { text: 'Creating a service', link: '/services/creating' },
          { text: 'Injecting a service', link: '/services/injecting' },
        ]
      },
      {
        text: 'Routing',
        items: [
          { text: 'Using the router', link: '/routing/router' },
          { text: 'Defining routes', link: '/routing/defining-routes' },
          { text: 'Navigation', link: '/routing/navigation' },
        ]
      },
      {
        text: 'Advanced routing',
        items: [
          { text: 'Nested navigation', link: '/advanced-routing/nested-navigation' },
          { text: 'Route guards', link: '/advanced-routing/guards' },
        ]
      }
    ]
  }
}
