<template>
  <!-- <mu-paper class="demo-paper pl-2 pr-2 " :z-depth="1" style="background: #fff"> -->
  <div :id="data.id">
    <mu-row class="mt-4 mb-4 " @click="toDetail">
      <mu-col span="12" class="grid-cell-1">
        <div class="avatar_group mt-2 mb-2">
          <span @click.stop="gotolink(data.creator.id)">
            <Avatar
              size="mini"
              :name="data.creator ? data.creator.user_abbr : ''"
              :bgColor="data.creator ? data.creator.user_backcolor : ''"
              :headIcon="data.creator ? data.creator.user_headicon : ''"
            />
          </span>
          <span class="text ellipsis-line1" style="width:100px">
            {{ data.creator.user_name }}
          </span>
          <span class="time">
            {{ data.mtime | filter(16) }}
          </span>
        </div>
      </mu-col>
      <div>
        <mu-col span="12" class="grid-cell-2">
          <div :id="'item-' + data.id">
            <div class="content" v-html="picture"></div>
          </div>
        </mu-col>
        <mu-col span="12" class="grid-cell-2">
          <svg-icon icon-class="62" style="font-size: 20px" />
          <div class="letter">
            {{ data.child_count }}
          </div>
        </mu-col>
      </div>
    </mu-row>
    <!-- style=" padding: 2px 0px; background-color:rgb(242, 242, 242)" -->
    <mu-divider></mu-divider>
  </div>
  <!-- </mu-paper> -->
</template>

<script>
export default {
  name: 'NormalAnswer', //普通单条回复
  props: ['data'],
  data() {
    return {
      picture: null,
    };
  },
  mounted() {
    let divRegular = new RegExp('div', 'g');
    let divResult = this.data.content.replace(divRegular, 'span');
    let brRegular = new RegExp('<br/>', 'g');
    let brResult = divResult.replace(brRegular, '');
    let brRegularTow = new RegExp('<br>', 'g');
    let brResultTow = brResult.replace(brRegularTow, '');
    let imgResult = brResultTow.replace(
      /<img.*?src=[/"|/']?(.*?)[/"|/']?\s.*?>/g,
      '[图片]'
    );
    this.picture = imgResult;
  },
  methods: {
    toDetail() {
      this.$router.push({
        name: 'AnswerDetails',
        params: {
          id: this.data.id,
          pid: this.data.parent_id,
        },
      });
    },

    gotolink(e) {
      //指定跳转地址
      this.$router.push({ path: '/toAskFriends', query: { id: e } });
    },
  },
};
</script>
<style lang="scss" scoped>
.grid-cell-1 {
  display: flex;
  align-items: baseline;
  .text {
    color: #ccc;
    font-size: 14px;
    margin: 0 10px;
  }

  .avatar_group {
    flex: 3;
    display: flex;
    justify-content: flex-start;
    flex-shrink: 0;
    align-items: center;
  }
  .time {
    flex: 2;
    font-size: 14px;
    color: #ccc;
    text-align: right;
  }
}
.grid-cell-2 {
  display: flex;
  padding: 6px 0;
  .type {
    flex: 1;
    color: #1bc6b8;
  }
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    flex: 1;
    word-break: break-all;
  }
}
.letter {
  margin-left: 5px;
  line-height: 20px;
}
</style>
