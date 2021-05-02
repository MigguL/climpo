<template>
  <h4>Weather</h4>
</template>

<script>
import axios from "axios";
import db from "../firebase/firebaseinit";
export default {
  name: "Weather",
  props: ["API_KEY"],
  data() {
    return {
      forecast: null,
      currWeather: null,
      loading: true,
    };
  },
  created() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      db.collection("locations")
        .where("location", "==", `${this.$route.params.location}`)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            this.currWeather = doc.data().currWeather;
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${
                  doc.data().currWeather.coord.lat
                }&lon=${
                  doc.data().currWeather.coord.lon
                }&exclude=current,minutley,alerts&units=metric&appid=${
                  this.API_KEY
                }`
              )
              .then((res) => {
                this.forecast = res.data;
              })
              .then(() => {
                this.loading = false;
                console.log(this.forecast);
                console.log(this.currWeather);
              });
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  padding-top: 100px;
}
</style>