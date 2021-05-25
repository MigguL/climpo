<template>
  <div class="hourly-weather">
    <div class="container">
      <div
        class="hourly-temp"
        v-for="(time, index) in filteredList"
        :key="index"
      >
        <HourlyTemperature :time="time" />
      </div>
    </div>
  </div>
</template>

<script>
import HourlyTemperature from "./HourlyTemperature.vue";
export default {
  name: "HourlyWeather",
  props: ["forecast"],
  components: {
    HourlyTemperature,
  },
  created() {},
  computed: {
    filteredList() {
      return this.forecast.hourly.slice(0, 24);
    },
  },
};
</script>

<style lang="scss" scoped>
.hourly-weather {
  padding: 30px 5px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  .container {
    display: flex;
    max-width: 100vw;
    overflow: scroll;
    padding: 0;
    margin: 0 20px;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.6);
      -webkit-box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.6);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.6);
      -webkit-box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.8);
    }
  }
}
</style>