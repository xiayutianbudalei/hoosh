<template>
  <div class="search-item" style="display:flex; margin-top:10px">
    <div class="checkbox" v-if="bool">
      <mu-checkbox v-model="dataJson.checkVal"></mu-checkbox>
    </div>
    <div class="flexItem" @click.stop="Hdaser">
      <div class="h-title flex">
        <div class="mr-3 home-1">{{ dataJson.target.ptime | filter(16) }}</div>
      </div>
      <div class="mt-3">
        {{ dataJson.title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SystemInformItem',
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
  methods: {
    Hdaser() {
      this.$router.push({
        name: 'EmaticNotification',
        query: { id: this.dataJson.id },
      });
    },
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
  color: #999;
}
.home-1 {
  font-size: 12px;
  color: #302626;
}
.checkbox {
  width: 35px;
}
</style>
