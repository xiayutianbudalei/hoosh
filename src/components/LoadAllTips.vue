<template functional>
  <div class="loadall">
    {{ props.text }}
  </div>
</template>
<script>
export default {
  name: "LoadAllTips",
  props: {
    text: {
      type: String,
      default: "我也是有底线的"
    }
  }
};
</script>
<style lang="scss" scoped>
.loadall {
  text-align: center;
  color: #ccc;
  padding: 15px;
}
</style>
