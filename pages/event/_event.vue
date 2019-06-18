<template>
  <div>
    <nuxt-link :to="'/events'">Events</nuxt-link>
    <span>&middot; {{ getEvent().urlPath }}</span>
    <br>
    <div class="">
      <b-jumbotron
        id="hero"
        class="text-md-center text-sm-left mt-6"
        container-fluid
        :header="getEvent().name.text"
        :lead="getEvent().description.text"
        style="background-image: url(https://mdbootstrap.com/img/Photos/Others/forest2.jpg); background-repeat: no-repeat;"
      >
        <!-- <p v-html="getEvent().description.html"></p> -->
        <b-button variant="primary" href="#">More Info</b-button>
      </b-jumbotron>
    </div>
    <div>
      <!-- <b-jumbotron
        overlay
        :img-src="getEvent().logo.original.url"
        :header="getEvent().name.text"
        :lead="getEvent().description.text"
      >
      </b-jumbotron>-->
    </div>
    <!-- <b-img :src="getEvent().logo.original.url" fluid alt="Responsive image"></b-img> -->
    <div class="container">
      <div id="category">
        <p>
          Category:
          <span>{{ getCategory() }} / {{ getSubcategory() }}</span>
        </p>
      </div>
      <!-- <h1>{{ getEvent().name.text }}</h1> -->
      <div v-html="getEvent().description.html.replace(getEvent().description.text, '')"></div>
      <hr>
      <hr>
      <!-- <pre>{{ getEvent() }}</pre>
      <pre>{{ this.$store.state.events.categories }}</pre>
      <pre>{{ this.$store.state.events.subcategories }}</pre>-->
    </div>
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

<style>
#hero {
  min-height: 70vh;
}
img {
  border-radius: 8px;
  max-width: 450px;
  max-height: 450px;

  float: left;
}
</style>


