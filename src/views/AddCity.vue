<template>
  <div>
    <div v-if="locations.length === 0" class="no-cities">
      <p>Obecnie nie obserwujesz żadnych miast. <br />Dodaj nowe miasto 😊</p>
      <button @click="addCity()">Dodaj miasto</button>
    </div>
    <div class="grid">
      <div
        class="city-link"
        v-for="(location, index) in locations"
        v-bind:key="index"
      >
        <City v-bind:location="location" v-bind:edit="edit" />
      </div>
    </div>
  </div>
</template>

<script>
import City from "../components/City";

export default {
  name: "AddCity",
  props: ["locations", "edit"],
  created() {},
  methods: {
    addCity() {
      this.$emit("add-city");
    },
  },
  components: {
    City,
  },
};
</script>

<style lang="scss">
p {
  cursor: default;
}
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

.no-cities {
  position: absolute;
  min-height: 100vh;
  max-width: 1024px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
}

button {
  margin-top: 16px;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 500ms ease all;

  &:hover {
    outline: none;
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
}
</style>
