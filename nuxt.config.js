import axios from 'axios'
require('dotenv').config()

export default {
  mode: 'universal',
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
    }]
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
    '@nuxtjs/dotenv'
  ],
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
