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
    // await this.$axios.get('https://www.eventbriteapi.com/v3/users/me/events', config)
    // await this.$axios.get('https://www.eventbriteapi.com/v3/events/search', config)
    await this.$axios.get('https://www.eventbriteapi.com/v3/organizations/312706594048/events/?order_by=start_asc', config)
      .then((res) => {
        if (res.status === 200) {
          // get "live" events
          let events = res.data.events.filter(event => event.status === "live")
          events.map(event => {
            event.urlPath = event.name.text.replace(/\s+/g, '-').toLowerCase()
          })
          // async function getEventDescription (eventID) {
          //   let descriptionHTML = await this.$axios.$get(`https://www.eventbriteapi.com/v3/events/${eventID}/description`, config)
          //   return descriptionHTML
          // }
          events.forEach(event => {
            console.log(event.id)
            // getEventDescription()
            this.$axios.$get(`https://www.eventbriteapi.com/v3/events/${event.id}/description`, config)
              .then(res => {
                event.description.html = res.description
              })
            // event.description.html = getEventDescription(event.id)
          })

          return events
        }
      }).then((events) => {
        commit('set', events)

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
    commit('setCategories', categories.categories)
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
    let moreCategories = []
    if (subcategories.pagination.page_count != 1) {
      for (let i = 2; i < subcategories.pagination.page_count + 1; i++) {
        await this.$axios.get('https://www.eventbriteapi.com/v3/subcategories?page=' + i, config)
          .then((res) => {
            // console.log("index", i)
            // console.log("-----------")
            if (res.status === 200) {
              let categories = moreCategories.concat(res.data.subcategories)
              moreCategories = categories
            }
          })
      }
    }

    // console.log("-----------")
    // console.log(moreCategories.length)
    let allCategories = moreCategories.concat(subcategories.subcategories)
    // console.log(allCategories.length)
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
