import Favor from "../components/Favor.vue";
import Vue from 'vue'
import Router from 'vue-router'


export default new Router({
  routes: [
    {
      path: "/Favo",
        name: "Favor",
        component: Favor,
    }
  ]
})