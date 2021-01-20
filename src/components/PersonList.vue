<template>
  <div>
    <div class="container">
      <div class="form-row">
        <div
          class="card-group col-sm-12 col-md-3"
          v-for="item in persons"
          :key="item.id.value"
        >
          <b-card
            title="Card Title"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-img
              :id="item.name.last"
              :src="getImage(item.name.last, item.picture.thumbnail)"
            />
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PersonList from "@/services/personList";
import axios from "axios";
export default {
  created() {
    this.loadAllPersons();
  },
  computed: {},
  data() {
    return {
      persons: {}
    };
  },
  methods: {
    async loadAllPersons() {
      await PersonList.getListOfPersons().then(async response => {
        try {
          this.persons = response.results;
          console.log(this.persons);
        } catch (err) {
          console.log(err);
        }
      });
    },

    async getImage(id, url) {
      await PersonList.getPersonImage(id, url);
    }
  }
};
</script>
