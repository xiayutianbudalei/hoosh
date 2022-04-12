<template>
  <div class="search-item" @click="gotoDetail">
    <div class="h-title">
      <text-highlight :queries="queries">
        {{ data.title }}
      </text-highlight>
    </div>
    <div class="mb-3" style="color:#999">
      <span class="pl-2 ellipsis user_name">{{ data.user_name }}</span>
      <span class="pl-2">{{ data.ptime | filter(16) }}</span>
    </div>
    <div class="h-title suolve">
      <text-highlight :queries="queries">
        {{ data.brief }}
      </text-highlight>
    </div>
    <div class="mt-3">
      <span>{{ data.version }} 提问</span>
      <span class="pl-2 pr-2">|</span>
      <span>{{ data.reask_count }} 多问一句</span>
      <span class="pl-2 pr-2">|</span>
      <span>{{ data.answer_count }} 回答</span>
    </div>
    <div>
      <LabelLists
        v-for="(item, index) in queries"
        :key="index"
        class="mt-1 asaw"
        :list="chipList"
        :queries="item"
      />
    </div>
  </div>
</template>
<script>
import LabelLists from 'components/LabelLists';
export default {
  name: 'SearchItem',
  components: {
    LabelLists,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      chipList: [],
      queries: [],
    };
  },
  methods: {
    gotoDetail() {
      this.$router.push({
        name: 'QuestionsDetail',
        params: { id: this.data.id },
      });
    },
  },
  mounted() {
    this.queries.push(String(this.data.searchValue));
    this.chipList = this.data.tags.split(',');
    //解决后台未处理的nbsp;
    this.data.brief = this.data.brief.replace(/&nbsp;/gi, ' ');
  },
};
</script>
<style lang="scss">
.text__highlight {
  color: #1bc6b8 !important;
  background: none !important;
  font-weight: bold;
}
</style>
<style lang="scss" scoped>
.search-item {
  background: #fff;
  font-size: 14px;
  padding: 10px;
}
.h-title {
  font-size: 16px;
}
.home-1 {
  font-size: 12px;
  color: #302626;
}
.user_name {
  max-width: 40vw;
  display: inline-block;
  vertical-align: middle;
}
.suolve {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
