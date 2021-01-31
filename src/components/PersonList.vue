<template>
  <div>
    <div class="container">
      <b-alert class="alert" :show="noResults" variant="warning"
        >No Results to display</b-alert
      >
      <b-card title="ADDRESS BOOK">
        <b-input
          style="width: 50%; display: inline-block;"
          v-model="numberOfResults"
          placeholder="Enter the number of users"
        ></b-input>
        <b-button @click="loadAllPersons">Generate</b-button>
      </b-card>
      <br />
      <hr />
      <br />
      <b-card title="SEARCH RESULTS" v-if="loaded">
        <div class="form-row">
          <div class="col">
            <b-form-select
              style="width: 30%; display: inline-block;"
              v-model="gender"
              :options="genderOptions"
            ></b-form-select>
            <b-form-select
              v-model="nat"
              :options="natOptions"
              style="width: 30%; display: inline-block;"
            ></b-form-select>
            <b-button @click="filter">Filter Results</b-button>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div class="form-row" v-if="loaded">
          <div
            class="card-group col-sm-12 col-md-4 mb-4"
            v-for="(item, index) in persons"
            :key="index"
          >
            <b-card tag="article" style="max-width: 20rem;" class="mb-2">
              <b-img
                :id="'img' + index"
                :src="getImage('img' + index, item.picture.thumbnail)"
              />
              <div>
                <p>
                  {{
                    item.name.title +
                      " " +
                      item.name.first +
                      " " +
                      item.name.last
                  }}
                </p>
              </div>
              <p class="email">{{ item.email }}</p>
              <p class="cell">{{ item.cell }}</p>

              <b-button
                @click="
                  navigateToDetails(item.name.first, item.name.last, item.cell)
                "
                variant="primary"
                >View Details</b-button
              >
            </b-card>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
import PersonList from "@/services/personList";
import axios from "axios";
export default {
  created() {
    if (this.$route.params.response != null) {
      this.response = this.$route.params.response;
      this.persons = this.response.results;
      this.loaded = true;
    }
  },
  data() {
    return {
      noResults: false,
      loaded: false,
      numberOfResults: null,
      response: null,
      persons: [],
      gender: null,
      nat: null,
      genderOptions: [
        { value: "null", text: "Select One" },
        { value: "male", text: "Male" },
        { value: "female", text: "Female" }
      ],
      natOptions: [
        { value: "null", text: "Select One" },
        { value: "AU", text: "AU" },
        { value: "BR", text: "BR" },
        { value: "CA", text: "CA" },
        { value: "DE", text: "DE" },
        { value: "DK", text: "DK" },
        { value: "ES", text: "ES" },
        { value: "FI", text: "FI" },
        { value: "FR", text: "FR" },
        { value: "GB", text: "GB" },
        { value: "IE", text: "IE" },
        { value: "IR", text: "IR" },
        { value: "NO", text: "NO" },
        { value: "NL", text: "NL" },
        { value: "NZ", text: "NZ" },
        { value: "TR", text: "TR" },
        { value: "US", text: "US" }
      ]
    };
  },
  methods: {
    async loadAllPersons() {
      if (this.numberOfResults != null) {
        this.noResults = false;
        await PersonList.getListOfPersons(this.numberOfResults).then(
          async response => {
            try {
              this.loaded = true;
              this.response = response;
              this.persons = response.results;
              console.log(this.persons);
            } catch (err) {
              console.log(err);
            }
          }
        );
      } else {
        this.noResults = true;
      }
    },
    async getImage(id, url) {
      await PersonList.getPersonImage(id, url);
    },
    navigateToDetails(firstName, lastName, phoneNum) {
      this.$router.push({
        name: "PersonDetails",
        params: {
          response: this.response,
          fName: firstName,
          lName: lastName,
          cell: phoneNum
        }
      });
    },
    filter() {
      this.persons = this.response.results;
      if (this.gender != null) {
        this.persons = this.response.results.filter(
          person => person.gender === this.gender
        );
      }
      if (this.nat != null) {
        this.persons = this.persons.filter(
          person => person.nat === this.nat
        );
      }
    }
  }
};
</script>
<style scoped>
.search {
  border: solid 1px grey;
  height: 50px;
  width: 100%;
  background-color: lightgray;
  border-radius: 5px;
  position: relative;
}
.search div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.email,
.cell {
  background: #eaeaea;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 2px 0 10px 0;
  padding: 5px;
  color: #8a8a8a;
}
</style>
