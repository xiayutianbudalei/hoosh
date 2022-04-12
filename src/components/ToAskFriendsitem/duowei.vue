<template>
  <div class="search-item" style="display: flex">
    <div class="checkbox" v-if="bool">
      <mu-checkbox @change="change" v-model="dataJson.checkVal"></mu-checkbox>
    </div>
    <div class="flexItem" @click="toDetail(dataJson.ask_id)">
      <div class="mb-3" style="color: #666666">
        <div class="ask">
          <Avatar
            size="xiaoyidian"
            :name="dataJson.parent.creator.user_abbr"
            :bgColor="dataJson.parent.creator.user_backcolor"
            :headIcon="dataJson.parent.creator.user_headicon"
            style="vertical-align: middle; margin-top: 3px"
          />
          <span
            class="shenlve"
            v-html="
              dataJson.parent.brief
                ? dataJson.parent.brief
                : dataJson.parent.title
            "
          ></span>
        </div>

        <div class="pl-2">{{ dataJson.ptime | filter(16) }}</div>
      </div>
      <div class="h-title">
        {{ dataJson.brief }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyAskmoreitem',
  props: {
    bool: {
      type: Boolean,
      default: false,
    },
    dataJson: {
      type: Object,
      default: () => {
        return {
          creator: {},
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
    toDetail(el) {
      // if (el == "why") {
      this.$router.push({
        name: 'QuestionsDetail',
        params: { id: el },
      });
      // } else {
      //   this.$toast.error("该问题不存在");
      //   return false;
      // }
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
}
.home-1 {
  font-size: 12px;
  color: #302626;
}
.checkbox {
  width: 35px;
}
.ask {
  padding-left: 15px;
  margin-bottom: 5px;
  height: 60px;
  background-color: #f2f2f2;
  line-height: 60px;
  .shenlve {
    float: right;
    width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
