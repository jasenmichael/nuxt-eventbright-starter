<template>
  <h1>Home</h1>
</template>



<script>
// import Logo from "~/components/Logo.vue";
  import { mapState } from "vuex";






export default {
  components: {},
  data() {
    return {
      events: this.$store.state.events.list
    };
  },
  async fetch({ store }) {
    if (store.state.events.list.length == 0) {
      await store.dispatch("events/get");
    }
    if (store.state.events.categories.length == 0) {
      await store.dispatch("events/getCategories");
    }
    if (store.state.events.subcategories.length == 0) {
      await store.dispatch("events/getSubcategories");
    }
  }
};
</script>


