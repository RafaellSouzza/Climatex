<template>
  <div class="app" :style="backgroundProps" >
    <div class="container d-flex" v-for="favo of weathersFavo" :key="favo">
      <div class="wrapper-weather d-flex" >
        <span>{{favo}}</span>
        <Weather
          v-if="favo.weathers[0]"
          title='Hoje'
          :weather="favo.weathers[0]"
          :showCelsius="showCelsius"
          @changeTemperatureType="changeTemperatureType"
        />

        <Weather
          v-if="favo.weathers[1]"
          title="Amanhã"
          :weather="favo.weathers[1]"
          :showCelsius="showCelsius"
          @changeTemperatureType="changeTemperatureType"
        />

        <Weather
          v-if="favo.weathers[2]"
          :title="getNow(2)"
          :weather="favo.weathers[2]"
          :showCelsius="showCelsius"
          @changeTemperatureType="changeTemperatureType"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Weather from "./Weather.vue";

export default {
  name: "Favor",
  components: {
    Weather,
  },
  data: () => ({
    showCelsius: true,
    timestamp: ""
  }),
  computed: {
    backgroundProps() {
      return {
        "background-image": `url(${this.$store.getters["app/backgroundImageUrl"]})`,
      };
    },
    weathersFavo() {
      return this.$store.state.search.weathersFavo;
    },
  },
  methods: {
    changeTemperatureType(type) {
      this.showCelsius = type === "C";
    },
    getNow: function (x) {
     const today = new Date();
     const tomorrow = new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate() + 2));
     const afterTomorrow = new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate() + 3));
     const after = new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate() + 4));
     const after1 = new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate() + 5));
     const after2 = new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate() + 6));
     const after3 = new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate() + 7));
     const after4 = new Date(Date.UTC(today.getFullYear(),today.getMonth(),today.getDate() + 8));
     var date = [today,tomorrow,afterTomorrow,after,after1,after2,after3,after4]
     var dayOf = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']
     var ra = dayOf[date[x].getDay()]
     return ra ;
    },
  },
  created() {
    this.$store.dispatch("app/getImageBackground");
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

html,
body {
  background-color: #cdcdcd;
}
.app{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 20px;
    width: 95%;
}
.d-flex {
  display: flex;
  margin: 10px;

  &.flex-column {
    flex-direction: column;
  }
}

.wrapper-app {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 10px;
  .container {
      display: flex;
    justify-content:space-between;
    height: 100%;
    width: 100%;
    min-width: 505px;
    margin: 10px ;
  }
}
</style>