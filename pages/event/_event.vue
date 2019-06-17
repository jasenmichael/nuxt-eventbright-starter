<template>
  <div class="container">
    <h3>Event Page</h3>
    <h1>{{ event().name.text }}</h1>
    <div v-html="event().description.html"></div>
    <pre>{{ event() }}</pre>
    <hr>
    <pre>{{ category() }}</pre>
    <pre>{{ subcategory().name }}</pre>
    <hr>
    <pre>{{ this.$store.state.events.categories }}</pre>
    <pre>{{ this.$store.state.events.subcategories }}</pre>
    
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    // console.log(store.state.events)
    await store.dispatch("events/get");
    await store.dispatch("events/getCategories");
    await store.dispatch("events/getSubcategories");
  },
  data() {
    return {
      event: () => {
        // console.log(this.$store.state.events);
        let eventPath = this.$nuxt.$route.params.event;
        let event = this.$store.state.events.list.find(
          event => event.urlPath == eventPath
        );
        return event;
      },
      category: () => {
        let event = this.event();
        let category = this.$store.state.events.categories.categories.find(
          category => category.id == event.category_id
        );
        return category.name;
      },
      subcategory: () => {
        let event = this.event();
        let subcategory = this.$store.state.events.subcategories.find(
          subcategory => subcategory.id == event.subcategory_id
        );
        return subcategory;
      }
    };
  }
};
</script>

