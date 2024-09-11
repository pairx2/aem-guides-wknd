export const App = {
  LOCALHOST_API_URL: '',
  THEME_GLOBALS_KEY: 'theme-globals',
  THEME_VARIABLES_KEY: 'theme-variables',

  THEME_BUILDER: {
    ID: 'themeBuilder',
    PATH: '/theme-builder',
    TITLE: 'Theme Builder',
    HASH:'#b=theme&c=color-system'
  },
  STORYBOOK: {
    ID: 'storybook',
    PATH: '/',
    TITLE: 'Storybook',
    HASH: '#b=layouts&c=page-layout&v=default'

  },
  NEW_THEME: {
    ID: 'newTheme',
    PATH: '/new-theme',
    TITLE: 'Theme Libraries',
    HASH: ''
  },
  NO_RIGHT_RAIL: ['page-layout', 'icons', 'spacing', 'faq-page', 'home-page', 'product-page', 'support-page'],
  TINT_OPTIONS: [25, 50, 75],
  SHADE_OPTIONS: [10]

}
