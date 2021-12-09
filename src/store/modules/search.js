import axios from "axios";

import {
    degreeToDirection,
    metersPerSecondToKilometerPerHour,
    kelvinToCelsius,
    kelvinToFahrenheit,
} from "./../../helper/weather";

const search = {
    namespaced: true,
    state: {
        latLong: {},
        placeholderUserLocation: "Cidade, Estado",
        userLocation: "",
        prevUserLocation: "",
        searching: false,
        weathers: [],
        weathersFavo: [],
        idCity:"",
    },
    mutations: {
        SET_LAT_LONG(state, payload) {
            state.latLong = payload;
        },
        SET_USER_LOCATION(state, payload) {
            state.userLocation = payload;
        },
        SET_PREV_USER_LOCATION(state, payload) {
            state.prevUserLocation = payload;
        },
        SET_SEARCHING(state, payload) {
            state.searching = payload;
        },
        SET_WEATHERS(state, payload) {
            state.weathers = payload;
        },
        SET_WEATHERSFAVO(state, payload) {
            state.weathersFavo = payload;
        },
        SET_IDCITY(state, payload) {
            state.idCity = payload;
        },
    },
    actions: {
        getUserCurrentPosition({ commit, dispatch, state }) {
            commit("SET_USER_LOCATION", state.placeholderUserLocation);
            commit("SET_SEARCHING", true);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latLong = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    };

                    commit("SET_LAT_LONG", latLong);
                    dispatch("convertLatLongInLocation");
                },
                (error) => {
                    console.error(error.message);
                },
                {
                    maximumAge: 60000,
                    timeout: 5000,
                    enableHighAccuracy: true,
                }
            );
        },
        async convertLatLongInLocation({ commit, dispatch, state }) {
            const params = {
                q: `${state.latLong.lat},${state.latLong.long}`,
                key: "c63386b4f77e46de817bdf94f552cddf",
                language: "pt_br",
            };
            const url = "https://api.opencagedata.com/geocode/v1/json";

            try {
                const { data } = await axios.get(url, { params });
                const { components: location } = data.results[0];

                if (location.city) {
                    commit(
                        "SET_USER_LOCATION",
                        `${location.city},${location.state}`
                    );
                    dispatch("fetchWeatherInformation");
                } else {
                    window.alert(
                        "Não conseguimos recuperar sua localização com precisão, por favor faça uma busca pelo Nome da Cidade, Estado"
                    );
                }
            } catch (_) {
                window.alert(
                    "Não conseguimos recuperar sua localização com precisão, por favor faça uma busca pelo Nome da Cidade, Estado"
                );
            }
        },
        async fetchWeatherInformation({ commit, state }) {
            commit("SET_SEARCHING", true);
            const weathers = [];

            try {
                if (state.prevUserLocation !== state.userLocation) {
                    const params = {
                        q: state.userLocation,
                        lang: "pt_br",
                        APPID: "206f559dbdf64855e8a6f9ca0bcd44ec",
                    };
                    const url = `https://api.openweathermap.org/data/2.5/forecast`;

                    const { data } = await axios.get(url, { params });
                    data.list.forEach((info, key) => {
                        if (key === 0 || info.dt_txt.includes("12:00:00")) {
                            weathers.push({
                                tempC: kelvinToCelsius(info.main.temp),
                                tempF: kelvinToFahrenheit(info.main.temp),
                                description: info.weather[0].description,
                                pressure: `${info.main.pressure}hPa`,
                                humidity: `${info.main.humidity}%`,
                                wind: `${degreeToDirection(
                                    info.wind.deg
                                )} ${metersPerSecondToKilometerPerHour(
                                    info.wind.speed
                                )}Km/h`,
                                dt_txt: info.dt_txt,
                                city: data.city.name,
                                country: data.city.country,
                                data: data,
                            });
                        }
                    });

                    commit("SET_PREV_USER_LOCATION", state.userLocation);
                    commit("SET_WEATHERS", weathers);
                }
            } catch (error) {
                for (let i = 0; i <= 2; i++) {
                    weathers.push({
                        tempC: null,
                        tempF: null,
                        description: "",
                        pressure: null,
                        humidity: null,
                        wind: null,
                    });
                }

                window.alert(
                    "Por favor, verifique o Nome da Cidade e Estado, pois não conseguimos fazer a busca."
                );
                commit("SET_WEATHERS", weathers);
            }

            commit("SET_SEARCHING", false);
        },
        async favoritWeatherInformation({ commit, state }) {
            const weathersFavo = [];

            try {
                const dataJson = await axios.get("http://localhost:3000/City");
                debugger
                if (dataJson.data) {
                    for (const iterator of Array(dataJson.data.length).keys()) {
                        const item = dataJson.data.length - 1 - iterator;
                        const city = dataJson.data[item].city;
                        const params = {
                            q: city,
                            lang: "pt_br",
                            APPID: "206f559dbdf64855e8a6f9ca0bcd44ec",
                        };
                        const url = `https://api.openweathermap.org/data/2.5/forecast`;

                        const { data } = await axios.get(url, { params });
                        const x = [];
                        data.list.forEach((info, key) => {
                            if (key === 0 || info.dt_txt.includes("12:00:00")) {
                                x.push({
                                    tempC: kelvinToCelsius(info.main.temp),
                                    tempF: kelvinToFahrenheit(info.main.temp),
                                    description: info.weather[0].description,
                                    pressure: `${info.main.pressure}hPa`,
                                    humidity: `${info.main.humidity}%`,
                                    wind: `${degreeToDirection(
                                        info.wind.deg
                                    )} ${metersPerSecondToKilometerPerHour(
                                        info.wind.speed
                                    )}Km/h`,
                                    dt_txt: info.dt_txt,
                                    city: data.city.name,
                                    country: data.city.country,
                                    id:dataJson.data[item].id
                                });
                            }
                        });
                        weathersFavo.push(x);
                    }
                }
                commit("SET_WEATHERSFAVO", weathersFavo);
            } catch (error) {
                for (let i = 0; i <= 2; i++) {
                    weathersFavo.push({
                        tempC: null,
                        tempF: null,
                        description: "",
                        pressure: null,
                        humidity: null,
                        wind: null,
                    });
                }

                window.alert(
                    "Por favor, verifique o Nome da Cidade e Estado, pois não conseguimos fazer a busca."
                );
                commit("SET_WEATHERSFAVO", weathersFavo);
            }
        },
        async favorDelete({state}) {
            try {
                debugger;
                const url = `http://localhost:3000/City/${state.idCity}`;
                axios.delete(url);
            } catch (_) {
                alert(`Erro ao Deletar. ${_}`);
            }
        },
    },
};

export default search;
