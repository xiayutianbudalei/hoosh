<template>
  <div class="home-item">
    <div @click="viewDetail">
      <div class="h-title ellipsis-line2">
        {{ data.title }}
      </div>
      <mu-row gutter>
        <mu-col :span="data.cover ? 8 : 12">
          <div class="home-1">
            <Avatar
              class="mr-2"
              @click.stop="gotolink(data.creator.id)"
              style="vertical-align: middle"
              size="mini"
              :name="data.creator.user_abbr"
              :bgColor="data.creator.user_backcolor"
              :headIcon="data.creator.user_headicon"
            />
            <span class="user_name ellipsis">{{ data.user_name }}</span>
            <span class="ml-2">{{ data.ptime | filter(16) }}</span>
          </div>
          <div v-if="data.brief" class="ellipsis-line2 desc">
            {{ data.brief }}
          </div>
        </mu-col>
        <mu-col span="4" v-if="data.cover">
          <img :src="data.cover" class="cover" />
        </mu-col>
      </mu-row>
      <div>
        <span>{{ data.version }} 提问</span>
        <span class="pl-2 pr-2">|</span>
        <span>{{ data.reask_count }} 多问一句</span>
        <span class="pl-2 pr-2">|</span>
        <span>{{ data.answer_count }} 回答</span>
      </div>
    </div>
  </div>
</template>
<script>
// import LabelList from "components/LabelList";
export default {
  name: 'Labepages',
  // components: {
  //   LabelList
  // },
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      chipList: [],
    };
  },
  methods: {
    viewDetail() {
      this.$router.push({
        name: 'QuestionsDetail',
        params: { id: this.data.id },
      });
    },
  },
  mounted() {
    this.chipList = this.data.tags.split(',');
    //解决后台未处理的nbsp;
    this.data.brief = this.data.brief.replace(/&nbsp;/gi, ' ');
  },
};
</script>
<style lang="scss" scoped>
.demo-chip {
  color: #1bc6b8;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  line-height: 1.8;
}
.home-item {
  background: #fff;
  font-size: 14px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px rgba($color: #7f7f7f, $alpha: 0.1);
}
.h-title {
  font-size: 16px;
  margin-bottom: 8px;
}
.home-1 {
  font-size: 13px;
  color: #7f7f7f;
  margin-bottom: 10px;
}
.desc {
  color: #7f7f7f;
  margin-top: 10px;
  margin-bottom: 10px;
}

.cover {
  height: 70px;
  object-fit: cover;
  width: 100%;
  border-radius: 5px;
}
.user_name {
  max-width: 80px;
  display: inline-block;
  vertical-align: middle;
}
</style>
