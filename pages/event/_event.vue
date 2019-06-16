<template>
  <div class="container">
    <h3>Event Page</h3>
    <h1>{{ event().name.text }}</h1>

    <!-- //res is html -->
    <div v-html="event().description.html"></div>
    <!-- <p>{{ event().description.text }}</p> -->

    <pre>{{ event() }}</pre>
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    console.log(store.state.events, "wazza")
    await store.dispatch("events/get");
  },
  data() {
    return {
      event: () => {
        // console.log(this.$store.state.events);
        let eventID = this.$nuxt.$route.params.event;
        let event = this.$store.state.events.list.find(
          event => event.id == eventID
        );
        return event;
      }
    };
  }
};
</script>

