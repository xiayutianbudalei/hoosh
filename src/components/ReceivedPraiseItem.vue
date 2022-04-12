<template>
  <div class="search-item flex">
    <div class="checkbox" v-if="bool">
      <mu-checkbox v-model="dataJson.checkVal"></mu-checkbox>
    </div>
    <div class="flexItem">
      <div class="mb-3" style="color:#999;font-size:13px;">
        <Avatar
          style="vertical-align:middle"
          class="gexiao"
          size="xiaoyidian"
          :name="dataJson.from.user_abbr"
          :bgColor="dataJson.from.user_backcolor"
          :headIcon="dataJson.from.user_headicon"
        />
        <span class="pl-2">{{ dataJson.from.user_name }}</span>
        <span class="pl-2">{{ dataJson.ptime | filter(16) }}</span>
        <span
          class="pl-2"
          style="color:#222;font-size:14px"
          v-if="dataJson.target_type === 'reask'"
        >
          赞我的【多问一句】
        </span>
      </div>
      <div class="h-title">
        {{ dataJson.target.brief }}
      </div>
    </div>
  </div>
</template>
<script>
import avatar from 'assets/images/u2101.png';
export default {
  name: 'ReceivedPraiseItem',
  props: {
    bool: {
      type: Boolean,
      default: false,
    },
    dataJson: {
      type: Object,
      default: () => {
        return {
          id: 0,
          checkVal: false,
        };
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      avatar,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-item {
  background: #fff;
  font-size: 14px;
  padding: 10px;
}
.h-title {
  font-size: 16px;
  margin-left: 10px;
  word-break: break-all;
  color: #999;
  span {
    font-size: 14px;
  }
}
.checkbox {
  width: 35px;
}
</style>
