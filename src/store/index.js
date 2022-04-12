import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import modules from "./modules";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vuex);
Vue.use(Vant);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters,
  modules
});
