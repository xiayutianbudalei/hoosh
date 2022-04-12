<template>
  <div class="search-item" style="display: flex">
    <div class="checkbox" v-if="bool">
      <mu-checkbox @change="change" v-model="dataJson.checkVal"></mu-checkbox>
    </div>
    <div class="flexItem" style="width: 100%;" @click="toDetail">
      <div class="mb-3" style="color: #666666">
        <div class="ask">
          <div>
            <Avatar
              class="wixi"
              size="xiaoyidian"
              :name="dataJson.parent.creator.user_abbr"
              :bgColor="dataJson.parent.creator.user_backcolor"
              :headIcon="dataJson.parent.creator.user_headicon"
            />
          </div>
          <div
            class="shenlve"
            v-html="
              dataJson.parent.brief
                ? dataJson.parent.brief
                : dataJson.parent.title
            "
          ></div>
        </div>

        <div class="pl-2">{{ dataJson.ptime | filter(16) }}</div>
      </div>
      <div style="word-break: break-all;" v-html="dataJson.brief"></div>
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
    toDetail() {
      this.$router.push({
        name: 'QuestionsDetail',
        params: {
          id: this.dataJson.parent.parent_id
            ? this.dataJson.parent.parent_id
            : this.dataJson.parent_id,
        },
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
.home-1 {
  font-size: 12px;
  color: #302626;
}
.checkbox {
  width: 35px;
}
.ask {
  display: flex;
  padding-left: 15px;
  margin-bottom: 5px;
  height: 60px;
  background-color: #f2f2f2;
  line-height: 60px;
  .shenlve {
    margin-left: 10px;
    width: 81%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
}
.wixi {
  margin-top: 10px;
}
</style>
