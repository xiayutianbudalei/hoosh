<template>
  <div>
    <span v-for="(item, i) in list" :key="i">
      <mu-chip
        class="demo-chip"
        v-if="item"
        @click.stop="gotolink(item, groupid)"
      >
        <text-highlight :queries="queries">
          {{ item }}
        </text-highlight>
      </mu-chip>
    </span>
  </div>
</template>
<script>
export default {
  name: "LabelLists",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    queries: {
      default: function() {
        return {};
      }
    },
    groupid: {
      default: function() {
        return [];
      }
    }
  },
  mounted() {},
  // data() {
  //   return {
  //     groupids: this.groupid
  //   };
  // },

  methods: {
    gotolink(e, b) {
      //指定跳转地址
      this.$router.push({
        path: "/Labepages",
        query: { name: e, group: b }
      });
    }
  }
};
</script>
<style scoped>
.demo-chip {
  color: #999;
  border-radius: 5px;
  margin-right: 10px;
  line-height: 1.8;
  margin-top: 6px;
}
</style>
