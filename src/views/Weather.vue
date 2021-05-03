<template>
  <div class="main">
    <div class="loading" v-if="loading">
      <span> </span>
    </div>
    <div
      v-else
      class="weather"
      v-bind:class="{
        day: isDay,
        night: isNight,
      }"
    >
      <div class="weather-wrap">
        <CurrentWeather
          :isDay="isDay"
          :isNight="isNight"
          :currWeather="currWeather"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "../firebase/firebaseinit";
import CurrentWeather from "../components/CurrentWeather";
export default {
  name: "Weather",
  props: ["API_KEY", "isDay", "isNight"],
  components: {
    CurrentWeather,
  },
  data() {
    return {
      forecast: null,
      currWeather: null,
      loading: true,
      currentTime: null,
    };
  },
  created() {
    this.getWeather();
  },
  beforeDestroy() {
    this.$emit("resetDays");
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
                }&exclude=current,minutley,alerts&units=metric&lang=pl&appid=${
                  this.API_KEY
                }`
              )
              .then((res) => {
                this.forecast = res.data;
              })
              .then(() => {
                this.loading = false;
                this.getCurrentTime();
              });
          });
        });
    },
    getCurrentTime() {
      const dateObject = new Date();
      this.currentTime = dateObject.getHours();
      const sunrise = new Date(this.currWeather.sys.sunrise * 1000).getHours();
      const sunset = new Date(this.currWeather.sys.sunset * 1000).getHours();
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit("is-day");
      } else {
        this.$emit("is-night");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
.weather {
  transition: 500ms ease;
  // overflow: scroll;
  width: 100%;
  height: 100%;

  .weather-wrap {
    overflow: hidden;
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>