import Cookies from "js-cookie";

// const domain =
//   process.env.NODE_ENV == "development" ? "localhost" : "paradeum.com";

export function getCookie(key) {
  return Cookies.get(key);
}

export function setCookie(key, value) {
  return Cookies.set(key, value);
}

export function removeCookie(key) {
  return Cookies.remove(key);
}
