import { getCookie } from "utils/cookie"; // get token from cookie
import getPageTitle from "utils/get-page-title";
import router from "./router";
import store from "./store";

const whiteList = ["Login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  let origin = window.location.origin;
  if (origin == "http://hoosheha.com") {
    window.location.href = "http://www.hoosheha.com";
  }
  if (origin == "http://hoosh.paradeum.com") {
    window.location.href = "http://www.hoosh.paradeum.com";
  }
  if (origin == "http://hoosh.paradeum.com/home") {
    window.location.href = "http://www.hoosh.paradeum.com";
  }
  // set page title/
  document.title = getPageTitle(to.meta.title);
  // determine whether the user has logged in
  const hasToken = getCookie(process.env.VUE_APP_TOKEN);
  if (hasToken) {
    const hasGetUserInfo = store.getters.user.id;
    if (hasGetUserInfo) {
      next();
    } else {
      try {
        // get user info
        await store.dispatch("user/getUser");
        if (to.name == "Login") {
          next("/");
        } else {
          next();
        }
      } catch (error) {
        // remove token and go to login
        await store.dispatch("user/reset");
      }
    }
  } else {
    // has no token
    if (whiteList.indexOf(to.name) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.fullPath}`);
    }
  }
});
