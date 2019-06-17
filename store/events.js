import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  categories: [],
  subcategories: []
});

export const mutations = {
  set(state, events) {
    state.list = events
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setSubcategories(state, subcategories) {
    state.subcategories = subcategories
  },
  add(state, value) {
    merge(state.list, value)
  },
  remove(state, {
    event
  }) {
    state.list.filter(c => event.id !== c.id)
  },
  mergeEvents(state, form) {
    // console.log(params)
    // state.event = {}
    assign(state.event, form)
  },
  setEvents(state, form) {
    state.event = form
  }
};

export const actions = {
  async get({
    commit
  }) {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
      }
    }
    await this.$axios.get('https://www.eventbriteapi.com/v3/users/me/events', config)
      .then((res) => {
        if (res.status === 200) {
          // get "live" events
          let events = res.data.events.filter(event => event.status === "live")
          events.map(event => {
            event.urlPath = event.name.text.replace(/\s+/g, '-').toLowerCase()
          })
          // console.log(liveEvents)
          // listEvents.urlPath = event.name.text.replace(/\s+/g, '-').toLowerCase(),
          commit('set', events)
        }
      })
  },
  async getCategories({
    commit
  }) {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
      }
    }
    const categories = await this.$axios.$get('https://www.eventbriteapi.com/v3/categories', config)
    commit('setCategories', categories)
  },
  async getSubcategories({
    commit
  }) {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
      }
    }
    const subcategories = await this.$axios.$get('https://www.eventbriteapi.com/v3/subcategories', config)
    // console.log(subcategories.pagination)
    let moreCategories = []
    if (subcategories.pagination.page_count != 1) {
      // console.log("yo...")
      for (let i = 2; i < subcategories.pagination.page_count + 1; i++) {
        // console.log(i+1)
        await this.$axios.get('https://www.eventbriteapi.com/v3/subcategories?page=' + i, config)
          .then((res) => {
            console.log("index", i)
            console.log("-----------")
            // console.log(res.data.subcategories)
            if (res.status === 200) {
              let categories = moreCategories.concat(res.data.subcategories)
              // let categories = [...moreCategories, ...res.data.subcategories]
              moreCategories = categories
              console.log(res.data.subcategories.length)
              console.log("cat len", categories.length)
              // console.log("more length", moreCategories)
            }
          })
      }
    }

    console.log("-----------")
    console.log(moreCategories.length)
    let allCategories = moreCategories.concat(subcategories.subcategories)
    console.log(allCategories.length)
    // commit('setSubcategories', subcategories)
    commit('setSubcategories', allCategories)
  },
  async show({
    commit
  }, params) {
    // console.log("showing...", params.event)
    // console.log("state...", state.events)
    // commit('mergeCars', res.data)
  },
  async set({
    commit
  }, events) {
    await commit('set', events)
  },
  async form({
    commit
  }, form) {
    await commit('mergeevents', form)
  },
  async add({
    commit
  }, event) {
    await commit('add', event)
  },
  create({
    commit
  }, params) {
    return this.$axios.post(`/events`, {
      event: params
    })
  },
  update({
    commit
  }, params) {
    return this.$axios.put(`/events/${params.id}`, {
      event: params
    })
  },
  delete({
    commit
  }, params) {
    return this.$axios.delete(`/events/${params.id}`)
  }
};
