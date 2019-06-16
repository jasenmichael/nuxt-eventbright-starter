import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  // events: [],
  event: {},
});

export const mutations = {
  set(state, events) {
    state.list = events
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
  async get({commit}) {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
      }
    }
    await this.$axios.get('https://www.eventbriteapi.com/v3/users/me/events', config)
      .then((res) => {
        if (res.status === 200) {
          let liveEvents = res.data.events.filter(event => event.status === "live")
          commit('set', liveEvents)
        }
      })
  },
  async show({ commit }, params) {
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
