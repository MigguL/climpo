<template>
  <div class="hour">
    <span>
      {{
        new Date(this.time.dt * 1000).toLocaleString("pl-PL", {
          hour: "numeric",
        })
      }}
    </span>
    <span>
      <img
        :src="
          require(`../../public/conditions/${this.time.weather[0].icon}.svg`)
        "
        alt=""
      />
    </span>
    <span>{{ Math.round(this.time.temp) }}&deg;</span>
  </div>
</template>

<script>
export default {
  name: "HourlyTemperature",
  props: ["time"],
};
</script>

<style lang="scss" scoped>
.hour {
  color: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 45px;
  margin-right: 30px;
}

img {
  width: auto;
  height: 22px;
  display: block;
}

span {
  display: block;
  align-self: center;
  margin-bottom: 20px;
  &:first-child {
    font-weight: 300;
    margin-bottom: 12px;
  }
  &:nth-child(2) {
    margin-bottom: 12px;
  }
  &:nth-child(3) {
    font-weight: 600;
  }
}
</style>