<template>
  <div class="additional-info container">
    <div>
      <span> Wschód słońca </span>
      <span>
        {{
          new Date(this.currWeather.sys.sunrise * 1000).toLocaleString(
            "pl-PL",
            {
              timeStyle: "short",
            }
          )
        }}
      </span>
    </div>
    <div>
      <span> Zachód słońca </span>
      <span>
        {{
          new Date(this.currWeather.sys.sunset * 1000).toLocaleString("pl-PL", {
            timeStyle: "short",
          })
        }}
      </span>
    </div>
    <div>
      <span>Wilgotność</span>
      <span> {{ this.currWeather.main.humidity }} % </span>
    </div>
    <div>
      <span>Zachmurzenie</span>
      <span> {{ this.currWeather.clouds.all }} % </span>
    </div>
    <div>
      <span>Wiatr</span>
      <span> {{ Math.round(this.currWeather.wind.speed) }} km/h </span>
    </div>
    <div>
      <span>Ciśnienie</span>
      <span> {{ this.currWeather.main.pressure }} hPa </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdditionalInfo",
  props: ["currWeather"],
  created() {
    console.log(this.currWeather);
  },
};
</script>

<style lang="scss" scoped>
.additional-info {
  padding: 30px 20px;
  display: flex;
  flex-wrap: wrap;
  color: #fff;

  > div {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    margin-bottom: 20px;

    span:first-child {
      font-size: 12px;
      margin-block: 8px;
    }
    span:nth-child(2) {
      font-weight: 600;
    }
  }
  div:nth-child(5),
  div:nth-child(6) {
    margin-bottom: 0;
  }
}
</style>