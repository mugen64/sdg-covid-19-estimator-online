import Fiber from 'fibers';
import Sass from 'sass';

const customSass = {
  implementation: Sass,
  sassOptions: {
    fiber: Fiber
  }
};

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'COVID-19 Estimator Online - SDG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['normalize.css/normalize.css', '~/css/global.scss'],
  /**
   * sass variables to expose
   */
  styleResources: {
    scss: ['~/css/_variables.scss']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/logic.js', '~/plugins/vue-inject.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Expose scss files globally
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    loaders: {
      scss: customSass
    }
  },
  generate: {
    fallback: true
  }
};
