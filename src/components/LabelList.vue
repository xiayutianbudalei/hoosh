<template>
  <div>
    <span v-for="(item, i) in list" :key="i">
      <mu-chip
        class="demo-chip"
        v-if="item"
        @click.stop="gotolink(item, groupid, gotokey)"
      >
        {{ item }}
      </mu-chip>
    </span>
  </div>
</template>
<script>
export default {
  name: 'LabelList',
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      },
    },
    gotokey: {
      type: String,
      default: function() {
        return '';
      },
    },
    groupid: {
      default: function() {
        return {};
      },
    },
  },
  mounted() {},
  // data() {
  //   return {
  //     groupids: this.groupid
  //   };
  // },

  methods: {
    gotolink(e, b, gotokey) {
      if (gotokey) {
        return;
      } else {
        this.$router.push({
          path: '/Labepages',
          query: { name: e, group: b },
        });
      }
      //指定跳转地址
    },
  },
};
</script>
<style lang="scss" scoped>
.demo-chip {
  color: #1bc6b8;
  border-radius: 5px;
  margin-right: 10px;
  line-height: 1.8;
  margin-top: 6px;
}
</style>
