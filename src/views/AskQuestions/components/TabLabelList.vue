<template>
  <mu-tabs
    inverse
    indicator-color="transparent"
    :value="value"
    @change="change"
  >
    <mu-tab :value="item" v-for="(item, i) in list" :key="i">{{ item }}</mu-tab>
  </mu-tabs>
</template>
<script>
export default {
  name: "TabLabelList",
  props: {
    value: [String, Number],
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    change(value) {
      this.$emit("change", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.mu-tabs-inverse {
  background: transparent;
}
.mu-tab-active.is-inverse {
  background: #1bc6b8;
  color: snow;
  border: 1px solid #1bc6b8;
}
.mu-tab {
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 5px 8px;
  ::v-deep .mu-tab-wrapper {
    min-height: 28px;
    padding: 0 12px;
  }
}
</style>
