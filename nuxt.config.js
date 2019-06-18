import axios from 'axios'
require('dotenv').config()

export default {
  mode: 'universal',
  dev: (process.env.NODE_ENV !== 'production'),
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],

    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        href: "@/assets/css/bootstrap.min.css",
        rel: "stylesheet"
      },
      {
        href: "@/assets/css/all.min.css",
        rel: "stylesheet"
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic',
        rel: 'stylesheet'
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800',
        rel: 'stylesheet'
      },
      {
        href: '@/assets/css/bootstrap-custom.css',
        rel: 'stylesheet'
      }
    ]
  },
  server: {
    port: "3030"
  },
  generate: {
    dir: "dist",
    routes: function () {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
        }
      }
      return axios.get('https://www.eventbriteapi.com/v3/users/me/events', config)
        .then((res) => {
          let events = res.data.events.filter(event => event.status === "live")
          return events.map((event) => {
            let liveEvents = {
              route: '/event/' + event.name.text.replace(/\s+/g, '-').toLowerCase(),
              // route: '/event/' + event.id,
              payload: event
            }
            return liveEvents
          })
        })
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      'assets/scss/scss/style.scss'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    credentials: false
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
