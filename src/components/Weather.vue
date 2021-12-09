<template>
  <div class="wrapper-weather-container">
    <div
      class="card d-flex weather-row"
      :class="[{ today: today }, backgroundColorProps]"
    >
      <div class="icon icon-weather">
        <span class="icon" :data-icon="generateIcon(weather.description)">
        </span>
      </div>
      <div class="details-weather d-flex flex-column">
        <p class="date">{{ title }}</p>
        <p
          class="temperature"
          v-if="showCelsius"
          @click="toggleTemperature('F')"
        >
          {{ weather.tempC }}ºC
        </p>
        <p class="temperature" v-else @click="toggleTemperature('C')">
          {{ weather.tempF }}ºF
        </p>

        <!-- <div :class="{ 'hide': !today }"> -->
        <div>
          <p class="state">{{ weather.description }}</p>
          <p class="wind">Vento: {{ weather.wind }}</p>
          <p class="humidty">Humidade: {{ weather.humidity }}</p>
          <p class="pressure">Pressão: {{ weather.pressure }}</p>
          <p class="pressure">Ciade: {{ weather.city }}</p>
          <p class="pressure">Pais: {{ getFullName(weather.country) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import temperature from "./../constants/temperature";
import temperatureIcons from "./../constants/temperatureIcons";
import country from "./../constants/country";

export default {
  name: "Weather",
  props: {
    weather: {
      type: Object,
      required: true,
      default: () => ({
        tempC: "",
        tempF: "",
        description: "",
        pressure: "",
        humidity: "",
        wind: "",
        city: "",
        country: "",
      }),
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    showCelsius: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    today() {
      return this.title === "Hoje";
    },
    backgroundColorProps() {
      let color = "gray";

      if (this.weather.tempC === null) {
        return this.generateColorTones(color);
      }

      if (this.weather.tempC <= temperature.LOWER) {
        color = "blue";
      } else if (
        this.weather.tempC > temperature.LOWER &&
        this.weather.tempC < temperature.HIGHER
      ) {
        color = "yellow";
      } else if (this.weather.tempC >= temperature.HIGHER) {
        color = "red";
      }

      return this.generateColorTones(color);
    },
  },
  methods: {
    generateColorTones(color) {
      const tones = [1, 2, 3, 4];
      const tone = tones[Math.floor(Math.random() * tones.length)];
      return `${color} tone-${tone}`;
    },
    toggleTemperature(type) {
      this.$emit("changeTemperatureType", type);
    },
    generateIcon(temperatureDescription) {
      let icon = ")";

      Object.keys(temperatureIcons).forEach((temperatureLabel) => {
        if (temperatureDescription.includes(temperatureLabel)) {
          icon = temperatureIcons[temperatureLabel];
        }
      });

      return icon;
    },
    getFullName(Sigl) {
      return country[Sigl]
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-weather-container {
  .hide {
    display: flex;
  }

  .weather-row {
    padding: 30px 20px;
    height: 100%;
    //   height: 45vh;

    &.gray {
      &.tone-1 {
        background-color: rgba(124, 124, 124, 0.9);
      }
      &.tone-2 {
        background-color: rgba(124, 124, 124, 0.9);
      }
      &.tone-3 {
        background-color: rgba(124, 124, 124, 0.9);
      }
      &.tone-4 {
        background-color: rgba(124, 124, 124, 0.9);
      }
    }

    &.yellow {
      &.tone-1 {
        background-color: rgba(140, 140, 0, 0.9);
      }
      &.tone-2 {
        background-color: rgba(140, 140, 0, 0.9);
      }
      &.tone-3 {
        background-color: rgba(140, 140, 0, 0.9);
      }
      &.tone-4 {
        background-color: rgba(140, 140, 0, 0.9);
      }
    }

    &.red {
      &.tone-1 {
        background-color: rgba(140, 0, 0, 0.9);
      }
      &.tone-2 {
        background-color: rgba(140, 0, 0, 0.9);
      }
      &.tone-3 {
        background-color: rgba(140, 0, 0, 0.9);
      }
      &.tone-4 {
        background-color: rgba(140, 0, 0, 0.9);
      }
    }

    &.blue {
      &.tone-1 {
        background-color: rgba(0, 73, 140, 0.9);
      }
      &.tone-2 {
        background-color: rgba(0, 73, 140, 0.9);
      }
      &.tone-3 {
        background-color: rgba(0, 73, 140, 0.9);
      }
      &.tone-4 {
        background-color: rgba(0, 73, 140, 0.9);
      }
    }
  }

  .icon-weather {
    width: 200px;
    text-align: center;
    position: relative;
    margin: 10px;

    .icon::before {
      font-size: 5rem;
      color: #fff;
    }
  }

  .details-weather {
    p {
      color: #fff;
      font-size: 1.3rem;
      font-weight: 500;

      &.temperature {
        cursor: pointer;
      }

      &.date {
        text-transform: uppercase;
      }

      &.state {
        padding: 35px 20px 10px 10px;
        text-transform: capitalize;
      }

      &.wind,
      &.humidty,
      &.pressure {
        font-size: 1rem;
      }
    }
  }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 90%;
    margin: 20px 20px;
    display: flex;
    flex-direction: column;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 2px 6px;
  }
}
</style>