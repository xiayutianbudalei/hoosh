/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-28 10:52:17
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-28 20:52:44
 */
import md5 from "md5";
// import dayjs from "dayjs";

/**
 * @description: 更新stage
 * @param {object}
 * @return:
 */
export function mutateState(state, payload) {
  if (typeCheck(state) === "Object" && typeCheck(payload) === "Object") {
    for (const key in payload) {
      state[key] = payload[key];
    }
  } else {
    console.error("state payload expected plain Object");
  }
}

/**
 * @description: 类型检查
 * @param { * } param
 * @returns { boolean }
 */

export function typeCheck(param) {
  return Object.prototype.toString.call(param).slice(8, -1);
}

/**
 * @description: 密码md5加密
 * @param {string} message
 * @returns {string}
 */
export function passwordMd5(message) {
  const KEY = md5("Hoosh");
  return md5(KEY + md5(message));
}

/**
 * @description: 判断是否是微信浏览器打开
 * @param {string}
 * @returns {string}
 */
export function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();

  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
