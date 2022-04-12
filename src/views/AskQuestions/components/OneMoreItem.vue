<template>
  <!-- 最新一条 多问一句 创建人信息 -->
  <mu-row class="one-more-item">
    <mu-col span="12" class="more-grid-cell-1">
      <div class="avatar_group">
        <Avatar
          size="mini"
          :name="
            data.top_child[0].creator ? data.top_child[0].creator.user_abbr : ''
          "
          :bgColor="
            data.top_child[0].creator
              ? data.top_child[0].creator.user_backcolor
              : ''
          "
          :headIcon="
            data.top_child[0].creator
              ? data.top_child[0].creator.user_headicon
              : ''
          "
        />
        <span class="text ellipsis-line1" style="width:100px">
          {{ data.top_child[0].user_name }}
        </span>
      </div>
      <div class="time">
        {{ data.top_child[0].mtime | filter(16) }}
      </div>
    </mu-col>
    <!-- 除开最新一条的 多问一句 集合  -->
    <mu-col span="12" class="mx-at more_box">
      <mu-row class="mt-4 contain">
        <mu-col span="12" class="more-grid-cell-1">
          <div class="avatar_group" @click="gotolink(data.creator.id)">
            <Avatar
              size="mini"
              :name="data.creator ? data.creator.user_abbr : ''"
              :bgColor="data.creator ? data.creator.user_backcolor : ''"
              :headIcon="data.creator ? data.creator.user_headicon : ''"
            />
            <span class="text ellipsis-line1" style="width:100px">
              {{ data.user_name }}
            </span>
          </div>
          <div class="time">
            {{ data.mtime | filter(16) }}
          </div>
        </mu-col>
        <mu-col span="12" class="more-grid-cell-2">
          <div
            class="type"
            v-html="
              data.sub_type === 'replace'
                ? '替换'
                : data.sub_type === 'continue'
                ? '追问'
                : data.sub_type === 'answer'
                ? '回答'
                : '反问'
            "
          ></div>
          <div class="content" @click="addreply(data)">
            {{ data.content | filterFun(200) }}
          </div>
        </mu-col>
        <mu-col span="12" class="grid-cell-3 mb-4">
          <div class="icon_class">
            <mu-icon value="thumb_up_alt_outline" @click="like(data)"></mu-icon>
            <span>{{ data.like_count }}</span>
          </div>
          <div class="icon_class">
            <mu-icon
              value="thumb_down_alt_outline"
              @click="unlike(data)"
            ></mu-icon>
            <span>{{ data.unlike_count }}</span>
          </div>
        </mu-col>
        <mu-divider v-if="data.bottom_child.length > 0"></mu-divider>
        <div
          v-for="(item, index) in data.bottom_child"
          :key="index"
          style="width:100%"
          class="mb-4 mt-4"
        >
          <mu-col span="12" class="more-grid-cell-1 pa-0">
            <div class="avatar_group">
              <span @click.stop="gotolink(item.creator.id)">
                <Avatar
                  size="mini"
                  :name="item.creator ? item.creator.user_abbr : ''"
                  :bgColor="item.creator ? item.creator.user_backcolor : ''"
                  :headIcon="item.creator ? item.creator.user_headicon : ''"
                />
              </span>

              <span class="text ellipsis-line1" style="width:100px">
                {{ item.user_name }}
              </span>
            </div>
            <div class="time">
              {{ item.mtime | filter(16) }}
            </div>
          </mu-col>
          <mu-col span="12" class="more-grid-cell-2">
            <div
              class="type"
              v-html="
                item.sub_type === 'replace'
                  ? '替换'
                  : item.sub_type === 'continue'
                  ? '追问'
                  : item.sub_type === 'answer'
                  ? '回答'
                  : '反问'
              "
            ></div>
            <div class="content">
              {{ item.content | filterFun(200) }}
            </div>
          </mu-col>
          <mu-col span="12" class="grid-cell-3 mb-4">
            <div class="icon_class" style="margin-right:3rem">
              <mu-icon
                value="thumb_up_alt_outline"
                @click="like(item)"
              ></mu-icon>
              <span>{{ item.like_count }}</span>
            </div>
            <div class="icon_class">
              <mu-icon
                value="thumb_down_alt_outline"
                @click="unlike(item)"
              ></mu-icon>
              <span>{{ item.unlike_count }}</span>
            </div>
            <div class="read_text" @click="toSingleOnemore(item)">
              查看回复
            </div>
          </mu-col>
          <mu-divider
            v-if="data.bottom_child.length !== index + 1"
          ></mu-divider>
        </div>
      </mu-row>
      <mu-divider></mu-divider>
      <div
        class="text-center mt-4 mb-4 text-place"
        v-if="data.child_count > 3"
        @click="toOnemoreDetail"
      >
        全部楼层({{ data.child_count }})
      </div>
    </mu-col>
    <!-- 最新一条 多问一句 内容 -->
    <mu-col span="12" class="more-grid-cell-2">
      <div
        class="type"
        v-html="
          data.top_child[0].sub_type === 'replace'
            ? '替换'
            : data.top_child[0].sub_type === 'continue'
            ? '追问'
            : data.top_child[0].sub_type === 'answer'
            ? '回答'
            : '反问'
        "
      ></div>
      <div class="content" style="flex:10" @click="addreply(data.top_child[0])">
        {{ data.top_child[0].content }}
      </div>
    </mu-col>
    <mu-col span="12" class="grid-cell-3 mb-1">
      <div class="icon_class" style="margin-right:3rem">
        <mu-icon
          value="thumb_up_alt_outline"
          @click="like(data.top_child[0])"
        ></mu-icon>
        <span>{{ data.top_child[0].like_count }}</span>
      </div>
      <div class="icon_class">
        <mu-icon
          value="thumb_down_alt_outline"
          @click="unlike(data.top_child[0])"
        ></mu-icon>
        <span>{{ data.top_child[0].unlike_count }}</span>
      </div>
    </mu-col>
    <!-- <mu-divider></mu-divider> -->
  </mu-row>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { like, unlike } from 'api/subject';
export default {
  name: 'OneMoreItem', //多问一句 集合
  props: ['data'],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //方法集合
  methods: {
    gotolink(e) {
      //指定跳转地址
      this.$router.push({ path: '/toAskFriends', query: { id: e } });
    },
    addreply(el) {
      el.id = this.data.id;
      this.$emit('clickreply', el);
    },
    like(el) {
      like({ id: el.id }).then(() => {
        // this.$toast.success("点赞成功");
        this.$emit('update');
      });
    },
    unlike(el) {
      unlike({ id: el.id }).then(() => {
        // this.$toast.success("否认成功");
        this.$emit('update');
      });
    },
    toOnemoreDetail() {
      this.$router.push({
        name: 'OneMoreQuestionDetails',
        params: { id: this.data.id },
      });
    },
    toSingleOnemore(el) {
      this.$router.push({
        name: 'SingleOnemore',
        params: {
          id: el.id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.one-more-item {
  padding: 15px 0 15px 15px;
  border-bottom: 1px solid #ddd;
}
.grid-cell-1,
.more-grid-cell-1 {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
    flex: 3;
    font-size: 14px;
    color: #ccc;
    text-align: right;
  }
}
.grid-cell-2,
.more-grid-cell-2 {
  display: flex;
  padding: 6px 0;
  margin: 8px 0;
  .type {
    flex: 1;
    color: #1bc6b8;
  }
  .content {
    flex: 8;
    word-break: break-all;
  }
}
.grid-cell-3 {
  display: flex;
  padding: 0 0 0 32px;
  .icon_class {
    margin-right: 40px;
    width: 20px;
    display: flex;
    i {
      width: 100%;
      font-size: 14px;
    }
  }
  .read_text {
    width: 50%;
    color: #1bc6b8;
    text-align: right;
  }
}
.more_box {
  background: rgba(242, 242, 242, 0.8);
  margin-left: 0;
  // margin-bottom: 10px;
  .contain {
    padding: 0 25px;
  }
}
.text-place {
  color: #1bc6b8;
}
</style>
