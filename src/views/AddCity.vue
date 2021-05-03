<template>
  <div class="grid">
    <div
      class="city-link"
      v-for="(location, index) in locations"
      v-bind:key="index"
    >
      <City v-bind:location="location" v-bind:edit="edit" />
    </div>
  </div>
</template>

<script>
import City from "../components/City";

export default {
  name: "AddCity",
  props: ["locations", "edit"],
  created() {},
  components: {
    City,
  },
};
</script>

<style lang="scss">
.grid {
  display: grid;
  padding-top: 81px;
  background-color: #31363d;
  width: 100%;
  min-height: 100vh;
  grid-auto-rows: 250px;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
