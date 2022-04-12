import request from "@/utils/request";
/**
 * @description 获取用户列表
 * @param { Object } data
 * @param { string } data.account - 注册账号
 * @param { string } data.user_pass - 加密密码
 * @returns Promise
 */
export function login(data) {
  return request({
    url: `/user/sign/verifypassword`,
    method: "post",
    data
  });
}

/**
 * @description: 用户结束会话
 * @param {type}
 * @returns Promise
 */
export function logout() {
  return request({
    url: "/user/sign/out",
    method: "get"
  });
}

/**
 * @description: 获取用户资料 token || uid
 * @param { string }
 * @returns Promise
 */
export function getUser(params) {
  return request({
    url: "user/info/get",
    method: "get",
    params: params
  });
}

/**
 * @description 获取用户列表
 * @returns Promise
 */
export function findUserList() {
  return request({
    url: "/user/findUserList",
    method: "get"
  });
}

/**
 * 微信登录
 * @date 2020-08-27
 * @param {Object} params
 * @param {string} params.access_token
 * @param {string} params.openid
 * @returns {Promise}
 */
export function signWeixin(params) {
  return request({
    url: "/user/sign/weixin",
    method: "post",
    data: params
  });
}

/**
 * 已登录会员移除消息
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function messageRemove(params) {
  return request({
    url: "/user/message/remove",
    method: "post",
    data: params
  });
}

/**
 * 设置消息已读
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function messageSetread(params) {
  return request({
    url: "/user/message/setread",
    method: "post",
    data: params
  });
}

/**
 * 获取未读消息数量
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function messageHasnew(params) {
  return request({
    url: "/user/message/hasnew",
    method: "get",
    params: params
  });
}

/**
 * 已登录会员查看自己收到的赞
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function messageReceivedlike(params) {
  return request({
    url: "/user/message/receivedlike",
    method: "get",
    params: params
  });
}

/**
 * 会员查看自己收到的动态消息
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function messageReceivedevent(params) {
  return request({
    url: "/user/message/receivedevent",
    method: "get",
    params: params
  });
}

/**
 * 已登录会员查看基本消息
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function messageGet(params) {
  return request({
    url: "/user/message/get",
    method: "get",
    params: params
  });
}

/**
 * 会员查看系统通知消息
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function noticeList(params) {
  return request({
    url: "/user/notice/list",
    method: "get",
    params: params
  });
}
/**
 * 会员查看系统通知消息---详情
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function getNotice(params) {
  return request({
    url: "/user/notice/get",
    method: "get",
    params
  });
}

/**
 * 已登录会员移除通知消息
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function noticeRemove(params) {
  return request({
    url: "/user/notice/remove",
    method: "post",
    data: params
  });
}

/**
 * 接收邀请
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function acceptinvite(params) {
  return request({
    url: "/user/group/acceptinvite",
    method: "post",
    data: params
  });
}

/**
 * 已登录会员设置通知消息已读
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function noticeSetread(params) {
  return request({
    url: "/user/notice/setread",
    method: "post",
    data: params
  });
}

/**
 * 已登录会员获取发给自己的未读通知消息数量
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function noticeHasnew(params) {
  return request({
    url: "/user/notice/hasnew",
    method: "get",
    params: params
  });
}

/**
 * 已登录会员查看基本通知消息
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */
export function noticeGet(params) {
  return request({
    url: "/user/notice/get",
    method: "post",
    params: params
  });
}

/**
 * 上传头像
 * @date 2020-08-28
 * @param {Object} data { user_headicon: data } base64
 * @returns {Promise}
 */
export function uploadVia(data) {
  return request({
    url: "/user/info/changeheadicon",
    method: "post",
    data
  });
}

/**
 * 修改用户信息
 * @date 2020-08-28
 * @param {Object} data { user_headicon: data } base64
 * @returns {Promise}
 */
export function modifyUserInfo(data) {
  return request({
    url: "/user/info/modify",
    method: "post",
    data
  });
}

/**
 * 微信登录
 * @date 2020-08-28
 * @param {Object}
 * @returns {Promise}
 */
export function wxLogin(data) {
  return request({
    url: "/user/sign/weixin",
    method: "post",
    data
  });
}

/**
 * 获取jsSdk配置数据
 * @date 2020-08-28
 * @param {Object}
 * @returns {Promise}
 */
export function getjsapisign(data) {
  return request({
    url: "/user/weixin/getjsapisign",
    method: "post",
    data
  });
}
