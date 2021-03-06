export default {
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Campus ICB',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-markdown.js', mode: 'client' },
    // '~/plugins/api.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://api.localhost'
        : 'https://api.idiomascombasi.com.br',
  },

  auth: {
    scopeKey: 'roles',

    // plugins: [{ src: '~/plugins/api.ts' }],

    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/students',
    },

    strategies: {
      local: {
        token: {
          property: 'token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: false,
          // autoFetch: false,
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: false,
          user: { url: '/auth/getuser', method: 'get' },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
