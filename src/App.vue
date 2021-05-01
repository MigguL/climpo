<template>
  <div class="main">
    <Modal
      v-if="modalOpen"
      v-on:close-modal="toggleModal"
      v-bind:API_KEY="API_KEY"
    />
    <Navigation v-on:add-city="toggleModal" v-on:edit-city="toggleEdit" />
    <router-view v-bind:locations="locations" v-bind:edit="edit" />
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import API_KEY from "./credentials/credentials";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";
export default {
  name: "App",
  components: {
    Navigation,
    Modal,
  },
  data() {
    return {
      API_KEY: API_KEY,
      locations: [],
      modalOpen: null,
      edit: null,
    };
  },
  created() {
    this.getLocationWeather();
  },
  methods: {
    getLocationWeather() {
      let firebaseDB = db.collection("locations");

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().location
                }&units=metric&appid=${API_KEY}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currWeather: data,
                })
                .then(() => {
                  this.locations.push(doc.doc.data());
                });
            } catch (err) {
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.locations.push(doc.doc.data());
          } else if (doc.type === "removed") {
            this.locations = this.locations.filter(
              (location) => location.location !== doc.doc.data().location
            );
          }
        });
      });
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
}

.container {
  padding: 0 20px;
}
</style>
