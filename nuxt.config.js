export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // mode: 'universal',
  ssr: true,
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"stylesheet", type:"text/css", href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/config.css',
    '@/assets/css/style.css',

  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/axios.js',
    '~/plugins/mixins/validation.js'
  ],


  axios: {
    baseURL: process.env.API_BASE_URL,
    credentials: true
  },

  auth: {
    redirect: {
      login: '/?login=true',
      home: false
    },
    strategies: {
      'local': {
        user: {
          property: false
        },
        token: {
          property: 'token'
        },
        endpoints: {
          login: {
            url: '/api/v1/login',
            method: 'post',
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            },
          },
          logout: {
            url: '/api/v1/logout',
            method: 'post',
          },
          user: {
            url: '/api/v1/user',
            method: 'get'
          },
        },
      },
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.API_BASE_URL,
        endpoints: {
          login: {
            url: '/api/v1/login'
          },
          user: {
            url: '/api/v1/user'
          },
          logout: {
            url: '/api/v1/logout'
          }
        }
      }
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
