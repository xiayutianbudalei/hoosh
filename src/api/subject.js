import request from "@/utils/request";
/**
 * @description: 添加问题
 * @param {type}
 * @return:
 */
export function addAsk(data) {
  return request({
    url: `/subject/ask/addask`,
    method: "post",
    data
  });
}

/**
 * @description: 创建小组
 * @param {type}
 * @return:
 */
export function droupAdd(data) {
  return request({
    url: `/user/group/add`,
    method: "post",
    data
  });
}

/**
 * @description: 小组成员列表
 * @param {type}
 * @return:
 */
export function groupMember(params) {
  return request({
    url: `/user/group/member`,
    method: "get",
    params: params
  });
}

/**
 * @description: 非小组成员列表
 * @param {type}
 * @return:
 */
export function userforadd(data) {
  return request({
    url: `/user/group/userforadd`,
    method: "post",
    data: data
  });
}

/**
 * @description: 移除小组成员
 * @param {type}
 * @return:
 */
export function removemember(data) {
  return request({
    url: `/user/group/removemember`,
    method: "post",
    data
  });
}

/**
 * @description: 获取问题/再问一句/答案的内容
 * @param {type}
 * @return:
 */
export function getContent(params) {
  return request({
    url: `/subject/ask/get`, //?token=31026c5a7a0c28cd012e5c124485d0a15
    method: "get",
    params: params
  });
}

/**
 * @description: 获取问题/再问一句/答案的内容
 * @param {type}
 * @return:
 */
export function getDescendant(params) {
  return request({
    url: `/subject/ask/getdescendant`, //?token=31026c5a7a0c28cd012e5c124485d0a15
    method: "get",
    params: params
  });
}

/**
 * @description: 获取问题/再问一句/答案的内容(含子节点)
 * @param {type}
 * @return:
 */
export function getContentTree(params) {
  return request({
    url: `/subject/ask/getverlist`, //?token=31026c5a7a0c28cd012e5c124485d0a15
    method: "get",
    params: params
  });
}
/**
 * @description: 查找标签
 * @param {type}
 * @return:
 */
export function findTags(data) {
  return request({
    url: `/subject/ask/findtags`,
    method: "post",
    data
  });
}

/**
 * @description: 添加多问一句
 * @param {type}
 * @return:
 */
export function addReask(data) {
  return request({
    url: `/subject/ask/addreask`,
    method: "post",
    data
  });
}

/**
 * @description: 添加回答
 * @param {type}
 * @return:
 */
export function addAnswer(data) {
  return request({
    url: `/subject/ask/addanswer`,
    method: "post",
    data
  });
}

/**
 * @description: 打开问题
 * @param {type}
 * @return:
 */
export function openQuestion(data) {
  return request({
    url: `/subject/ask/open`,
    method: "post",
    data
  });
}

/**
 * @description: 关闭问题
 * @param {type}
 * @return:
 */
export function closeQuestion(data) {
  return request({
    url: `/subject/ask/close`,
    method: "post",
    data
  });
}

/**
 * @description: 设置组内问题为公开
 * @param {type}
 * @return:
 */
export function openSetpublic(data) {
  return request({
    url: `/subject/ask/setpublic`,
    method: "post",
    data
  });
}

/**
 * @description: 设置组内问题为私有
 * @param {type}
 * @return:
 */
export function closeSetprotect(data) {
  return request({
    url: `/subject/ask/setprotect`,
    method: "post",
    data
  });
}

/**
 * 首页问题列表
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function indexList(params) {
  return request({
    url: "/subject/index/list",
    method: "get",
    params: params
  });
}

/**
 * 首页小组列表
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function jionWithask(params) {
  return request({
    url: "/user/group/jionwithask",
    method: "get",
    params: params
  });
}

/**
 * 我创建的小组列表
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function groupMine(params) {
  return request({
    url: "/user/group/mine",
    method: "get",
    params: params
  });
}

/**
 * 我加入的小组列表
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function groupJionlist(params) {
  return request({
    url: "/user/group/jionlist",
    method: "get",
    params: params
  });
}

/**
 * 获取小组信息
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function groupGet(params) {
  return request({
    url: "/user/group/get",
    method: "get",
    params: params
  });
}

/**
 * 查找问题/再问一句/答案
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function askFind(params) {
  return request({
    url: "/subject/ask/find",
    method: "post",
    data: params
  });
}

/**
 * 搜索用户，邀请成员
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function infoFind(params) {
  return request({
    url: "/user/info/find",
    method: "post",
    data: params
  });
}

/**
 * 修订问题
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function reviseAsk(params) {
  return request({
    url: "/subject/ask/reviseask",
    method: "post",
    data: params
  });
}

/**
 * 修订小组信息
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function modify(params) {
  return request({
    url: "/user/group/modify",
    method: "post",
    data: params
  });
}

/**
 * 小组禁言
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function groupClose(params) {
  return request({
    url: "/user/group/close",
    method: "post",
    data: params
  });
}

/**
 * 小组解禁
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function groupOpen(params) {
  return request({
    url: "/user/group/open",
    method: "post",
    data: params
  });
}

/**
 * 退出小组
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function groupQuit(params) {
  return request({
    url: "/user/group/quit",
    method: "post",
    data: params
  });
}

/**
 * 顶问题/再问一句/答案
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function like(params) {
  return request({
    url: "/subject/ask/like",
    method: "post",
    data: params
  });
}

/**
 * 踩问题/再问一句/答案
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function unlike(params) {
  return request({
    url: "/subject/ask/unlike",
    method: "post",
    data: params
  });
}

/**
 * 文章列表
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function articleList(params) {
  return request({
    url: "/subject/article/list",
    method: "get",
    params: params
  });
}

/**
 * 文章详情
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function articleGet(params) {
  return request({
    url: "/subject/article/get",
    method: "get",
    params: params
  });
}

/**
 * 活动列表
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function activityList(params) {
  return request({
    url: "/subject/activity/list",
    method: "get",
    params: params
  });
}

/**
 * 活动详情
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function activityGet(params) {
  return request({
    url: "/subject/activity/get",
    method: "get",
    params: params
  });
}

/**
 * 删除问题/再问一句/答案
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function remove(params) {
  return request({
    url: "/subject/ask/remove",
    method: "post",
    data: params
  });
}

/**
 * 小组邀请
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function Lnvitemember(params) {
  return request({
    url: "/user/group/invitemember",
    method: "post",
    data: params
  });
}

/**
 * 满足条件的问题列表list,不包含私有
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function rstList(params) {
  return request({
    url: "/subject/ask/list",
    method: "get",
    params: params
  });
}

/**
 * 我的问题列表mine，包含私有
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function Mine(params) {
  return request({
    url: "/subject/ask/mine",
    method: "get",
    params: params
  });
}

/**
 * 列出系统的标签
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function tagsList(params) {
  return request({
    url: "/subject/article/listtags",
    method: "post",
    data: params
  });
}
export function tallys(params) {
  return request({
    url: "/subject/ask/findaskbytag",
    method: "post",
    data: params
  });
}
/**
 * 通过标签查文章
 * @date 2020-08-28
 * @param {Object} params
 * @returns {Promise}
 */

export function findbyTag(params) {
  return request({
    url: "/subject/article/findbytag",
    method: "post",
    data: params
  });
}

/**
 * @description: 添加关注
 * @param {type}
 * @return:
 */
export function add(params) {
  return request({
    url: `/user/favorite/updateStatus`,
    method: "post",
    data: params
  });
}
/**
 * @description
 * @param {type}
 * @return:
 */
export function searcStatus(params) {
  return request({
    url: `/user/favorite/status`,
    method: "get",
    params
  });
}

/**
 * @description: 会员更新目标的收藏（关注）状态
 * @param {Object} params
 * @returns {Promise}
 */
export function updateStatus(data) {
  return request({
    url: ` /user/favorite/updateStatus`,
    method: "post",
    data
  });
}

/**
 *  某人关注的用户列表
 * @date 2020-08-27
 * @param {Object} params
 * @returns {Promise}
 */

export function user(params) {
  return request({
    url: "/user/favorite/user",
    method: "get",
    params: params
  });
}
