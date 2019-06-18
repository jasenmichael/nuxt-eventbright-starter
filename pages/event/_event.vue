<template>
  <div class="container">
    <h3>Event Page</h3>
    <nuxt-link :to="'/events'">Back to Events Page</nuxt-link>
    <h1>{{ getEvent().name.text }}</h1>
    <div v-html="getEvent().description.html"></div>
    <hr>
    <pre>{{ getCategory() }}</pre>
    <pre>{{ getSubcategory() }}</pre>
    <hr>
    <pre>{{ getEvent() }}</pre>
    <!-- <pre>{{ this.$store.state.events.categories }}</pre>
    <pre>{{ this.$store.state.events.subcategories }}</pre>-->
  </div>
</template>

<script>
export default {
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
  },
  data() {
    return {
      getEvent: () => {
        let eventPath = this.$nuxt.$route.params.event;
        let event = this.$store.state.events.list.find(
          event => event.urlPath == eventPath
        );
        return event;
      },
      getCategory: () => {
        let event = this.getEvent();
        let category = this.$store.state.events.categories.find(
          category => category.id == event.category_id
        );
        return category.name;
      },
      getSubcategory: () => {
        let event = this.getEvent();
        let subcategory = this.$store.state.events.subcategories.find(
          subcategory => subcategory.id == event.subcategory_id
        );
        return subcategory.name;
      }
    };
  }
};
</script>

