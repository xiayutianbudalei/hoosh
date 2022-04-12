<!--
 * @Description: 暂位图组件
 * @param:type,1 表示未搜索到相关数据,2 表示网络不给力,3 表示暂无内容,4 表示暂无评论,5 表示暂无通知
 * @param:message,文字说明
 * @Author: icony/精武陈真
 * @Date: 2019-07-25 10:52:37
 * @LastEditTime: 2020-03-16 10:27:58
 * @LastEditors: jun/屠峻祥
 -->

<template>
  <div class="vb-placeholder-box">
    <div class="vb-placeholder-img">
      <img v-if="type == 1" src="./images/no-data.png" />
      <img v-if="type == 2" src="./images/no-network.png" />
      <img v-if="type == 3" src="./images/no-content.png" />
      <img v-if="type == 4" src="./images/no-comment.png" />
      <img v-if="type == 5" src="./images/no-notice.png" />
      <slot></slot>
    </div>
    <div class="vb-placeholder-message">{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: "Placeholder",
  props: {
    message: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "1"
    }
  }
};
</script>
<style lang="css" scoped>
.vb-placeholder-box {
  text-align: center;
}
.vb-placeholder-img {
  margin-bottom: 10px;
}
.vb-placeholder-img > img {
  width: auto;
}
.vb-placeholder-message {
  color: #cccccc;
}
</style>
