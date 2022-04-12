<template>
  <mu-appbar z-depth="0" class="top-nav">
    <template slot="left" v-if="$slots.left">
      <slot name="left"></slot>
    </template>
    <div slot="default" style="text-align:center">
      <slot></slot>
    </div>
    <template slot="right" v-if="$slots.right">
      <slot name="right"></slot>
    </template>
  </mu-appbar>
</template>

<script>
export default {
  name: "TopNav"
};
</script>
<style lang="scss" scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 200;
  background: #fff;
  border-bottom: 1px solid #e4e8e7;
}
</style>
