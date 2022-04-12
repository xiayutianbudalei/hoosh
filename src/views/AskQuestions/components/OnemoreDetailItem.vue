<template>
  <div>
    <!-- 最新一条 多问一句 创建人信息 -->
    <mu-row style="margin: 16px 14px;" class="pr-2">
      <mu-col span="12" class="more-grid-cell-1">
        <div class="avatar_group">
          <span @click.stop="gotolink(lastItem.creator.id)">
            <Avatar
              size="mini"
              :name="lastItem.creator ? lastItem.creator.user_abbr : ''"
              :bgColor="lastItem.creator ? lastItem.creator.user_backcolor : ''"
              :headIcon="lastItem.creator ? lastItem.creator.user_headicon : ''"
            />
          </span>

          <span class="text ellipsis-line1" style="width:100px">{{
            lastItem.user_name
          }}</span>
        </div>
        <div class="time">
          {{ lastItem.mtime | filter(16) }}
        </div>
      </mu-col>
      <!-- 除开最新一条的 多问一句 集合  -->
      <mu-col span="11" class="mx-at more_box">
        <mu-row class="mt-4">
          <mu-col span="12" class="more-grid-cell-1">
            <div class="avatar_group">
              <span @click.stop="gotolink(data.creator.id)">
                <Avatar
                  size="mini"
                  :name="data.creator ? data.creator.user_abbr : ''"
                  :bgColor="data.creator ? data.creator.user_backcolor : ''"
                  :headIcon="data.creator ? data.creator.user_headicon : ''"
                />
              </span>

              <span class="text ellipsis-line1" style="width:100px">{{
                data.user_name
              }}</span>
            </div>
            <div class="time">
              {{ data.ptime | filter(16) }}
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
                  : '反问'
              "
            ></div>
            <div class="content">
              {{ data.content }}
            </div>
          </mu-col>
          <mu-col span="12" class="grid-cell-3 mb-3">
            <div class="icon_class" style="margin-right:3rem">
              <mu-icon
                value="thumb_up_alt_outline"
                @click="like(data)"
              ></mu-icon>
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

          <div
            v-for="(item, index) in dataList"
            :key="index"
            style="width:100%"
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

                <span class="text ellipsis-line1" style="width:100px">{{
                  item.user_name
                }}</span>
                <span class="time">
                  {{ item.ptime | filter(16) }}
                </span>
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
                    : '反问'
                "
              ></div>
              <div class="content">
                {{ item.content }}
              </div>
            </mu-col>
            <mu-col span="12" class="grid-cell-3 mb-3">
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
          </div>
        </mu-row>
      </mu-col>

      <!-- 最新一条 多问一句 内容 -->
      <mu-col span="12" class="more-grid-cell-2">
        <div
          class="type"
          v-html="
            lastItem.sub_type === 'replace'
              ? '替换'
              : lastItem.sub_type === 'continue'
              ? '追问'
              : '反问'
          "
        ></div>
        <div class="content">
          {{ lastItem.content }}
        </div>
      </mu-col>
      <mu-col span="12" class="grid-cell-3 mb-1">
        <div class="icon_class" style="margin-right:3rem">
          <mu-icon
            value="thumb_up_alt_outline"
            @click="like(lastItem)"
          ></mu-icon>
          <span>{{ lastItem.like_count }}</span>
        </div>
        <div class="icon_class">
          <mu-icon
            value="thumb_down_alt_outline"
            @click="unlike(lastItem)"
          ></mu-icon>
          <span>{{ lastItem.unlike_count }}</span>
        </div>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { like, unlike } from "api/subject";
export default {
  name: "OnemoreDetailItem",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["data"],
  data() {
    //这里存放数据
    return {
      dataList: [],
      lastItem: ""
    };
  },
  watch: {
    data: function() {
      this.handleData();
    },
    deep: true
  },
  //方法集合
  methods: {
    gotolink(e) {
      //指定跳转地址
      this.$router.push({ path: "/toAskFriends", query: { id: e } });
    },
    like(el) {
      like({ id: el.id }).then(() => {
        // this.$toast.success("点赞成功");
        this.$emit("update");
      });
    },
    unlike(el) {
      unlike({ id: el.id }).then(() => {
        // this.$toast.success("否认成功");
        this.$emit("update");
      });
    },
    toSingleOnemore(el) {
      this.$router.push({
        name: "SingleOnemore",
        params: {
          id: el.id
        }
      });
    },
    handleData() {
      //倒序数组，将最后一个项取出来在最后一行显示，并删除原数组中该项
      this.data.child.reverse();
      this.dataList = this.data.child;
      this.lastItem = this.dataList.pop();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.grid-cell-1,
.more-grid-cell-1 {
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
  }
}
.grid-cell-3 {
  display: flex;
  padding: 0 0 0 32px;
  margin-bottom: 10px;
  .icon_class {
    // font-size: 14px;
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
  // margin-bottom: 10px;
}
.text-place {
  color: #1bc6b8;
}
</style>
