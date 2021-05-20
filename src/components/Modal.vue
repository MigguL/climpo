<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal-wrap" ref="modalWrap">
      <label for="city-name">Podaj miasto</label>
      <input
        type="text"
        name="city-name"
        placeholder="Nazwa szukanego miasta"
        v-model="city"
      />
      <button @click="addCity">Dodaj</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "../firebase/firebaseinit";

export default {
  name: "Modal",
  props: ["API_KEY", "locations"],
  data() {
    return {
      city: "",
    };
  },
  methods: {
    closeModal(event) {
      if (event.target === this.$refs.modal) {
        this.$emit("close-modal");
      }
    },
    async addCity() {
      if (this.city === "") {
        alert("pole nie może być puste");
      } else if (
        this.locations.some((res) => res.location === this.city.toLowerCase())
      ) {
        alert(`${this.city} znajduje się już na liście obserwowanych miast`);
      } else {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&lang=pl&appid=${this.API_KEY}`
          );
          const data = await response.data;
          db.collection("locations")
            .doc()
            .set({
              location: this.city.toLowerCase(),
              currWeather: data,
            })
            .then(() => {
              this.$emit("close-modal");
            });
        } catch {
          alert(`${this.city} nie istnieje, spróbuj ponownie`);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  max-width: 1024px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    color: #fff;
  }
  .modal-wrap {
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    input {
      color: #fff;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
    button {
      background-color: #222325;
      color: #fff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>