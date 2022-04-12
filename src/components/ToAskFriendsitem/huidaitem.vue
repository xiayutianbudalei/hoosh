<template>
  <div class="search-item" style="display: flex">
    <div class="checkbox" v-if="bool">
      <mu-checkbox @change="change" v-model="dataJson.checkVal"></mu-checkbox>
    </div>
    <div class="flexItem" @click="Hdaser">
      <div
        class="h-title mb-3"
        v-if="dataJson.parent.title"
        v-html="
          dataJson.parent.brief ? dataJson.parent.brief : dataJson.parent.title
        "
      ></div>
      <div class="home-1 mb-3">{{ dataJson.mtime | filter(16) }}</div>
      <div style=" word-break: break-all;">
        {{ dataJson.brief }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyAnswerItem',
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
    change(value) {
      this.$emit('checkChange', value, this.index);
    },
    Hdaser() {
      this.$router.push({
        name: 'AnswerDetails',
        params: { id: this.dataJson.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-item {
  background: #fff;
  font-size: 14px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px rgba($color: #7f7f7f, $alpha: 0.1);
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
