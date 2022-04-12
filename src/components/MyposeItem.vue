<template>
  <div class="search-item" style="display:flex">
    <div class="checkbox" v-if="bool">
      <mu-checkbox @change="change" v-model="dataJson.checkVal"></mu-checkbox>
    </div>
    <div class="flexItem" @click="toDetail">
      <div class="mb-3" style="color:#999">
        <mu-badge
          :content="
            dataJson.sub_type === 'why'
              ? '为什么'
              : dataJson.sub_type === 'what'
              ? '是什么'
              : dataJson.sub_type === 'how'
              ? '怎么办'
              : '怎么看'
          "
          color="primary"
        ></mu-badge>
        <span class="pl-2">{{ dataJson.ptime | filter(16) }}</span>
      </div>
      <div class="h-title">
        {{ dataJson.title }}
      </div>
      <div class="mt-3">
        <span>{{ dataJson.version }} 提问</span>
        <span class="pl-2 pr-2">|</span>
        <span>{{ dataJson.reask_count }} 多问一句</span>
        <span class="pl-2 pr-2">|</span>
        <span>{{ dataJson.answer_count }} 回答</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyposeItem',
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
}
.home-1 {
  font-size: 12px;
  color: #302626;
}
.checkbox {
  width: 35px;
}
</style>
