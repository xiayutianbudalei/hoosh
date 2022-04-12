import { getUser, login, logout, wxLogin } from "api/user";
import router from "router";
import { mutateState } from "utils";
import { getCookie, removeCookie, setCookie } from "utils/cookie";

const state = {
  token: getCookie(process.env.VUE_APP_TOKEN),
  user: {
    username: ""
  }
};

const mutations = {
  mutateState
};

const actions = {
  async login({ commit }, payload) {
    const result = await login(payload);
    await commit("mutateState", result.data);
    const { token } = result.data;
    await setCookie(process.env.VUE_APP_TOKEN, token);
    return result;
  },
  async wxLogin({ commit }, payload) {
    const result = await wxLogin(payload);
    await commit("mutateState", result.data);
    const { token } = result.data;
    await setCookie(process.env.VUE_APP_TOKEN, token);
    return result;
  },
  async logout({ commit }) {
    const result = await logout();
    commit("mutateState", {
      token: "",
      user: { username: "" }
    });
    removeCookie(process.env.VUE_APP_TOKEN);
    router.push("/login");
    return result;
  },
  reset({ commit }) {
    commit("mutateState", { token: "", user: { username: "" } });
    removeCookie(process.env.VUE_APP_TOKEN);
    router.push("/login");
  },
  async getUser({ commit }, payload) {
    // payload 可选，默认从header传token
    const result = await getUser(payload);
    const { token } = result.data;
    if (token) {
      commit("mutateState", result.data);
      setCookie(process.env.VUE_APP_TOKEN, token);
    } else {
      commit("mutateState", { user: result.data });
    }
    return result;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
