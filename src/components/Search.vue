<template>
  <div class="wrapper-form-field d-flex">
    <input
      type="text"
      v-model="userLocation"
      @keypress.enter="fetchWeatherInformation()"
      placeholder="Cidade, Estado"
    />
    <button v-on:click="setfavorit(weathers)">⭐️</button> 
    <button v-link="'/Favo'">☀️</button> 
  </div>
</template>

<script>
import axios from "axios";
import country from "./../constants/country";
export default {
  name: "Search",
  computed: {
    userLocation: {
      get() {
        return this.$store.state.search.userLocation;
      },
      set(value) {
        this.$store.commit("search/SET_USER_LOCATION", value);
      },
    },
    searching() {
      return this.$store.state.search.searching;
    },
      weathers() {
      return this.$store.state.search.weathers;
    },
  },
  methods: {
    getUserCurrentLatLong() {
      this.$store.dispatch("search/getUserCurrentPosition");
    },
    fetchWeatherInformation() {
      this.$store.dispatch("search/fetchWeatherInformation");
    },
    favoritWeatherInformation() {
      this.$store.dispatch("search/favoritWeatherInformation");
    },
    getFullName(Sigl) {
      return country[Sigl];
    },
    test() {
      let cont;
      return cont++;
    },
    setfavorit(weathers) {
      let city = weathers[0].city
      let country = weathers[0].country
      axios.post("http://localhost:3000/City", {
        city:city,
        country:country
      });
    },
  },
  created() {
    this.getUserCurrentLatLong();
  },
};
</script>

<style lang="scss" scoped>
.wrapper-form-field {
  padding: 20px;
  height: 80px;
  width: 70%;
  align-items: center;
  background-color: #fff;
  margin: 0px;
  border-radius: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  input {
    margin-left: 20px;
    width: 100%;
    border: none;
    color: #7d7978;
    font-weight: 500;
    font-size: 2rem;
    outline: none;
  }
  button,router-link {
    background-color: transparent;
    border: none;
    color: white;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 50px;
    margin: 0px -10px 6px 0px;
    align-items: center;
    display: flex;
    cursor: pointer;
  }
}
</style>
