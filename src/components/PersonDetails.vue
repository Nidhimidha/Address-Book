<template>
  <div>

 <b-card title="USER DETAILS" style="width: 80%; margin-left: auto; margin-right: auto;">
      <div class="form-row">
        <div class="col">{{ fName }} {{ lName }}</div>
      </div>
      <div class="form-row">
        <div class="col">{{ cell }}</div>
      </div>
      <br />
        <b-button @click="goBack">Previous</b-button>
 </b-card>

  </div>
</template>
<script>
export default {
  created() {
    this.response = this.$route.params.response;
    this.fName = this.$route.params.fName;
    this.lName = this.$route.params.lName;
    this.cell = this.$route.params.cell;
  },
  data() {
    return {
      response: null,
      fName: null,
      lName: null,
      cell: null
    };
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "PersonList",
        params: {
          response: this.response
        }
      });
    }
  }
};
</script>
