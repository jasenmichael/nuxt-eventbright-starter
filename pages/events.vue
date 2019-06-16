<template>
  <div class="container">
    <h1>events</h1>
    <pre>{{ this.$store.state.events.list }}</pre>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  async fetch({ store }) {
    await store.dispatch("events/get");
  }
};
</script>
