<template>
  <div class="page">
    <div ref="header" class="wrapper-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.header" :style="{ height: headerh + 'px' }"></div>
    <div ref="main" class="main-container">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" :style="{ height: footerh + 'px' }"></div>
    <div
      ref="footer"
      v-if="$slots.footer"
      class="wrapper-footer safe-area-inset-bottom"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Page",
  data() {
    return {
      headerh: 0,
      footerh: 0
    };
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.init());
  },
  destroyed() {
    window.removeEventListener("resize", this.init());
  },
  methods: {
    init() {
      // 确保等待 DOM 更新时，获取正确值
      this.$nextTick(function() {
        const refHeader = this.$refs.header;
        const refFooter = this.$refs.footer;
        if (refHeader) {
          this.headerh = refHeader.offsetHeight;
        }

        if (refFooter) {
          this.footerh = refFooter.offsetHeight;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.safe-area-inset-top {
  /* Status bar height on iOS 11.0 */
  padding-top: constant(safe-area-inset-top);
  /* Status bar height on iOS 11+ */
  padding-top: calc(env(safe-area-inset-top) * 1);
}
.safe-area-inset-bottom {
  /* Status bar height on iOS 11.0 */
  padding-bottom: constant(safe-area-inset-bottom);
  /* Status bar height on iOS 11+ */
  padding-bottom: calc(env(safe-area-inset-bottom) * 1);
}
.wrapper-header {
  position: fixed; // 不用fixed原因，在ios上各种问题，表单场景
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
}

.main-container {
  position: relative;
  // z-index: 1;
  // top: 0;
  width: 100%;
  // overflow: auto;
  // -webkit-overflow-scrolling: touch;
}
.wrapper-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 200;
  background: #fff;
}
</style>
