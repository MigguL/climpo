<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import API_KEY from "./credentials/credentials";
export default {
  name: "App",
  data() {
    return {
      API_KEY: API_KEY,
      location: "Lublin",
      locations: [],
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
          if (doc.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().location
                }&appid=${API_KEY}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currWeather: data,
                })
                .then(() => {
                  this.locations.push(doc.doc.data());
                })
                .then(() => {
                  console.log(this.locations);
                });
            } catch (err) {
              console.log(err);
            }
          }
        });
      });
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
</style>
