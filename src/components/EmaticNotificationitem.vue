<template>
  <div class="search-item" style="display: flex">
    <div class="flexItem">
      <div style="font-size: 24px">{{ dataJson.title }}</div>
      <div class="mr-3 home-1" v-if="dataJson.target && dataJson.target.mtime">
        系统通知 &nbsp;&nbsp;&nbsp;&nbsp;{{
          dataJson.target.mtime | filter(16)
        }}
      </div>
      <div class="mt-3" style="font-size: 16px">
        {{
          dataJson.target && dataJson.target.brief ? dataJson.target.brief : ''
        }}
        <div>
          <img
            :src="
              dataJson.target && dataJson.target.cover
                ? dataJson.target.cover
                : ''
            "
            style="width: 100%; margin-top: 10px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmaticNotificationitem',
  props: {
    dataJson: {
      type: Object,
      // default: {},
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.search-item {
  background: #fff;
  font-size: 14px;
}
.h-title {
  font-size: 16px;
  color: #999;
}
.home-1 {
  font-size: 14px;
  color: #999;
  margin: 0 10px;
}
</style>
