<template>
  <div class="container">
    <h1>events</h1>
    <nuxt-link v-for="event in events" :key=event.id :to="'/event/' + event.urlPath">
    {{ event.name.html }}
    <br>
    </nuxt-link>
    <pre>{{ events }}</pre>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      events: this.$store.state.events.list
    };
  },
  async fetch({ store }) {
    if (store.state.events.list.length == 0) {
      await store.dispatch("events/get");
    }
  }
};
</script>
