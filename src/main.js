// import Toast from 'muse-ui-toast'; 本地保存会自动删除、只能曲线解决
import Avatar from "@/components/Avatar";
import Back from "@/components/Back";
import Toast from "@/components/muse-ui-toast";
import "@/icons"; // icon
import "@/styles/index.scss";
import Page from "components/Page";
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import theme from "muse-ui/lib/theme";
import { format } from "timeago.js";
import Vue from "vue";
import "muse-ui-message/dist/muse-ui-message.css";
import Message from "muse-ui-message";
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
import App from "./App.vue";
import * as filters from "./filters"; // global filters
import "./permission";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import lrz from "lrz";
import TextHighlight from "vue-text-highlight";
import "muse-ui-progress/dist/muse-ui-progress.css";
import NProgress from "muse-ui-progress";
import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
import Loading from "muse-ui-loading";
import wx from "weixin-js-sdk";
//Vconsole展示或不展示
// import vconsole from "vconsole";
// const Vconsole = new vconsole();
// export default Vconsole;
console.log(lrz);
Vue.use(wx);
Vue.use(Loading);
Vue.component("text-highlight", TextHighlight);
Vue.use(preview);
Vue.use(Message);
Vue.use(NProgress);
Vue.config.ignoredElements = ["wx-open-launch-weapp"];
//定义全局的过滤器 "changeTime":改变时间为几周前
Vue.filter("changeTime", function(dateStr) {
  return format(dateStr, "zh_CN");
});

if (process.env.NODE_ENV == "mock") {
  require("./mock");
}
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
// if (process.env.NODE_ENV === "production") {
//   const VConsole = require("vconsole");
//   new VConsole();
// }

Vue.use(Toast, { position: "top", time: 1000 });

theme.add(
  "teal",
  {
    primary: "#1BC6B8",
    secondary: "#ff4081",
    success: "#4caf50",
    warning: "#ffeb3b",
    info: "#1BC6B8"
  },
  "light"
);

theme.use("teal");
Vue.use(MuseUI);

// Vue.component(TopNav.name, TopNav);

Vue.component(Back.name, Back);

Vue.component(Avatar.name, Avatar);
Vue.component(Page.name, Page);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
