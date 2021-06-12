<template>
  <div class="main">
    <div v-if="isLoading" class="loading">
      <span></span>
    </div>
    <div v-else class="app">
      <Modal
        v-if="modalOpen"
        v-on:close-modal="toggleModal"
        v-bind:API_KEY="API_KEY"
        v-bind:locations="locations"
      />
      <Navigation
        v-on:add-city="toggleModal"
        v-on:edit-city="toggleEdit"
        v-bind:addCityActive="addCityActive"
        v-bind:isDay="isDay"
        v-bind:isNight="isNight"
      />
      <router-view
        v-bind:isDay="isDay"
        v-bind:isNight="isNight"
        v-bind:locations="locations"
        v-bind:edit="edit"
        v-bind:API_KEY="API_KEY"
        v-on:is-day="dayTime"
        v-on:is-night="nightTime"
        v-on:resetDays="resetDays"
        v-on:add-city="toggleModal"
      />
    </div>
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
      addCityActive: null,
      isDay: null,
      isNight: null,
      isLoading: true,
    };
  },
  created() {
    this.getLocationWeather();
    this.checkRoute();
  },
  methods: {
    getLocationWeather() {
      let firebaseDB = db.collection("locations");

      firebaseDB.onSnapshot((snap) => {
        if (snap.docs.length === 0) {
          this.isLoading = false;
        }
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              // Display cities from DB
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().location
                }&units=metric&lang=pl&appid=${API_KEY}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currWeather: data,
                })
                .then(() => {
                  this.locations.push(doc.doc.data());
                  this.isLoading = false;
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
      console.log("App.vue API CALL DONE");
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
    },
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    },
    resetDays() {
      this.isDay = false;
      this.isNight = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
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
body {
  background-color: #e7e5e5;
}

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
}

.container {
  padding: 0 20px;
}

.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 249);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  display: flex;

  width: 100%;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 45vh auto;
    border: 2px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
</style>
