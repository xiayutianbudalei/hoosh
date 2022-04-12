<template>
  <!-- <mu-paper class=" pl-2 pr-2 " :z-depth="1" round style="background: #fff"> -->
  <div :id="data.id">
    <mu-row class="mt-2 ">
      <mu-col span="12" class="grid-cell-1">
        <div class="avatar_group mt-2">
          <span @click.stop="gotolink(data.creator.id)">
            <Avatar
              size="mini"
              :name="data.creator ? data.creator.user_abbr : ''"
              :bgColor="data.creator ? data.creator.user_backcolor : ''"
              :headIcon="data.creator ? data.creator.user_headicon : ''"
            />
          </span>

          <span class="text ellipsis-line1" style="width:100px">
            {{ data.user_name }}
          </span>
          <span class="time">
            {{ data.mtime | filter(16) }}
          </span>
        </div>
      </mu-col>
      <mu-col>
        <div class="grid-cell-4 ">
          <span>{{ data.grand.user_name }}</span>
          <span
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
          ></span>
          <div class="connd" v-html="data.grand.brief"></div>
        </div>
        <div class="grid-cell-4">
          <span>{{ data.parent.user_name }}</span>
          <span
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
          ></span>
          <div class="connd">{{ data.parent.brief }}</div>
        </div>
      </mu-col>
      <mu-col span="12" class="grid-cell-2">
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
        <div class="content" @click="addOneMore" v-html="data.content"></div>
      </mu-col>
      <mu-col span="12" class="grid-cell-3 mb-2">
        <div class="icon_class" style="margin-right:3rem">
          <mu-icon
            class="iconstyle"
            value="thumb_up_alt_outline"
            @click="like(data)"
          ></mu-icon>
          <span>{{ likeas }}</span>
        </div>
        <div class="icon_class">
          <mu-icon
            class="iconstyle"
            value="thumb_down_alt_outline"
            @click="unlike(data)"
          ></mu-icon>
          <span>{{ unlikeas }}</span>
        </div>
      </mu-col>
    </mu-row>
    <!-- style=" padding: 2px 0px; background-color:rgb(242, 242, 242)" -->
    <mu-divider style="background-color:#F6F6F6;"></mu-divider>
  </div>

  <!-- </mu-paper> -->
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { like, unlike } from 'api/subject';
export default {
  name: 'getDesce', //二级多问一句
  props: ['data'],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      likeas: this.data.like_count,
      unlikeas: this.data.unlike_count,
    };
  },
  //方法集合
  methods: {
    gotolink(e) {
      //指定跳转地址
      this.$router.push({ path: '/toAskFriends', query: { id: e } });
    },
    addOneMore() {
      this.$emit('clickreply', this.data);
    },
    like(el) {
      like({ id: el.id }).then(res => {
        // this.$toast.success("点赞成功");
        this.likeas = res.data.like_count;
        this.unlikeas = res.data.unlike_count;
      });
    },
    unlike(el) {
      unlike({ id: el.id }).then(res => {
        // this.$toast.success("否认成功");
        this.likeas = res.data.like_count;
        this.unlikeas = res.data.unlike_count;
        // this.$emit("updaase");
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
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
.iconstyle {
  line-height: 20px;
  color: #e0e0e0;
}
.grid-cell-2 {
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
  padding: 0 0 0 40px;
  .icon_class {
    // font-size: 14px;
    width: 20px;
    display: flex;
    i {
      width: 100%;
      font-size: 14px;
    }
  }
}
.grid-cell-4 {
  background: #f5f5f5;
  margin-top: 10px;
  padding: 15px 20px;
  .type {
    margin-left: 8px;
    flex: 1;
    color: #1bc6b8;
  }
  .connd {
    padding: 10px 0;
  }
}
</style>
