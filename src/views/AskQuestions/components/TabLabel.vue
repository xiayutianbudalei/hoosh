<template>
  <mu-tabs
    inverse
    :value.sync="activeLabel"
    indicator-color="rgba(0,0,0,0)"
    text-color="rgba(0, 0, 0, .54)"
    center
    :value="curvalue"
    @change="chooseLabel"
  >
    <mu-tab :value="item" v-for="(item, i) in tabList" :key="i">{{
      item
    }}</mu-tab>
  </mu-tabs>
</template>

<script>
export default {
  name: "TabLabel",
  props: ["tabList", "curTab"],
  data() {
    return {
      activeLabel: 0,
      curvalue: this.$props.tabList[0]
    };
  },
  methods: {
    chooseLabel(el) {
      // console.log(el);
      if (el === "替换" || el === "反问" || el === "追问") {
        this.$emit("labelValue", el);
      }
      if (
        el === "为什么" ||
        el === "是什么" ||
        el === "怎么看" ||
        el === "怎么办"
      ) {
        let turnProp = "";
        switch (el) {
          case "为什么":
            turnProp = "why";
            break;
          case "是什么":
            turnProp = "what";
            break;
          case "怎么看":
            turnProp = "think";
            break;
          case "怎么办":
            turnProp = "how";
            break;
          default:
            turnProp = "why";
            break;
        }
        this.$emit("tabItem", turnProp);
      }
    }
  },
  created() {
    if (this.curTab) {
      this.tabList.forEach((item, i) => {
        if (item === this.curTab) {
          this.activeLabel = i;
          this.curvalue = item;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.button-wrapper {
  text-align: center;
  .mu-button {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}
.mu-tab-active.is-inverse {
  background: #1bc6b8;
  color: snow;
}
.mu-tab {
  border: 1px solid #ccc;
  border-radius: 16px;
  margin: 5px 8px;
  max-height: 28px;
  line-height: 28px;
  & ::v-deep .mu-tab-wrapper {
    padding: 0 12px;
    justify-content: start !important;
  }
}
</style>
