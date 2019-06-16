# Nuxt Eventbrite Starter

filters and gets only "live events"
copy example.env to .env, add your eventbright key (make sure to NOT commit your .env file!)

> Made for Greenbriar Community School Events page - greenbriarschool.org

take note of the files...
- store/events.js
- pages/events.vue
- pages/event/_event.vue

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## todo:
- get categories, subcategories and organizations, and add to store.
