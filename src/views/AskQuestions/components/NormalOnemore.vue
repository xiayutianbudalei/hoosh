<template>
  <div>
    <!-- <mu-paper class="demo-paper pl-2 pr-2 " :z-depth="1" style="background: #fff"> -->
    <div :id="data.id" v-if="data.type == 'reask' ? true : false">
      <mu-row class="mt-2 mb-2 ">
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
              {{ data.creator.user_name }}
            </span>
            <span class="time">
              {{ data.mtime | filter(16) }}
            </span>
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
          <div
            class="content"
            @click="clickOnemore"
            v-html="data.content"
          ></div>
        </mu-col>
        <mu-col span="12" class="grid-cell-3 mb-1">
          <div class="icon_class" style="margin-right:3rem">
            <mu-icon
              class="iconstyle"
              value="thumb_up_alt_outline"
              @click.stop="like(data)"
            ></mu-icon>
            <span>{{ arrlike }}</span>
          </div>
          <div class="icon_class">
            <mu-icon
              class="iconstyle"
              value="thumb_down_alt_outline"
              @click.stop="unlike(data)"
            ></mu-icon>
            <span>{{ arrunlike }}</span>
          </div>
        </mu-col>

        <div class="aqqw mb-2" v-if="chiiders">
          <!-- style="margin-left: 25px;width: 86%;margin-top:13px ;" -->
          <mu-divider style="background-color:#F6F6F6"></mu-divider>
          <TowNormalOnemore
            @clickOnemore="tolsclickOnemore"
            v-for="(item, i) in dataChild"
            :key="i"
            :arrwess="i++"
            :data="item"
            @update="update"
            :child_count="data.child_count"
          ></TowNormalOnemore>
          <slot v-if="qwsede" :index="data.ite"></slot>
        </div>
      </mu-row>
      <!-- style=" padding: 2px 0px; background-color:rgb(242, 242, 242)" -->
      <mu-divider
        v-if="!chiiders"
        style="background-color:#F6F6F6"
      ></mu-divider>
    </div>

    <div :id="data.id" v-if="data.type == 'answer' ? true : false">
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
          <mu-col span="12" class="grid-cell-3">
            <div :id="'item-' + data.id">
              <div class="content" v-html="picture"></div>
            </div>
          </mu-col>
          <mu-col span="12" class="grid-cell-3 mt-3">
            <svg-icon icon-class="62" style="font-size: 20px" />
            <div class="letter">
              {{ data.child_count }}
            </div>
          </mu-col>
        </div>
      </mu-row>
      <!-- style=" padding: 2px 0px; background-color:rgb(242, 242, 242)" -->
      <mu-divider style="background-color:#F6F6F6;"></mu-divider>
    </div>
  </div>
  <!-- </mu-paper> -->
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { like, unlike, rstList } from 'api/subject';
import TowNormalOnemore from './TowNormalOnemore';
export default {
  name: 'NormalOnemore', //单个多问一句
  props: ['data'],
  //import引入的组件需要注入到对象中才能使用
  components: { TowNormalOnemore },
  data() {
    //这里存放数据
    return {
      picture: null,
      qwsede: true,
      chiiders: true,
      limit: 10,
      page: 2,
      total: 0,
      parent_id: this.data.id,
      dataChild: [],
      arrlike: this.data.like_count,
      arrunlike: this.data.unlike_count,
    };
  },
  mounted() {
    this.dataChild = this.data.child.slice(0, 10);
    if (this.data.type == 'answer') {
      let divRegular = new RegExp('div', 'g');
      let divResult = this.data.content.replace(divRegular, 'span');
      let brRegular = new RegExp('<br/>', 'g');
      let brResult = divResult.replace(brRegular, '');
      let styleRegular = new RegExp('style', 'g');
      let styleResult = brResult.replace(styleRegular, '');
      let brRegularTow = new RegExp('<br>', 'g');
      let brResultTow = styleResult.replace(brRegularTow, '');
      let imgResult = brResultTow.replace(
        /<img.*?src=[/"|/']?(.*?)[/"|/']?\s.*?>/g,
        '[图片]'
      );
      this.picture = imgResult;
    }
    this.fhddf();
  },
  // created() {
  //   window.addEventListener("beforeunload", this.updateHandler);
  // },
  //方法集合
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
    fhddf() {
      if (!this.data.child) {
        console.log(this.data.child);
      } else if (this.data.child.length === 0) {
        this.chiiders = false;
      } else {
        this.chiiders = true;
        if (this.data.child.length < 10) {
          this.qwsede = false;
        }
      }
    },
    Childss(el) {
      let params = {
        parent_id: el,
        limit: this.limit,
        page: this.page,
        icon: 1,
        order: 'time',
      };
      rstList(params).then(res => {
        const { list, total } = res.data;

        const mergeList = this.dataChild.concat(list);
        mergeList.forEach(elm => {
          elm.page = this.page * 1 + 1;
        });
        this.page = ++this.page;
        this.dataChild = mergeList;
        console.log(mergeList.length);
        if (mergeList.length === total) {
          this.qwsede = false;
        }
      });
    },
    update(e) {
      let update = e.name == 'like' ? like : unlike;
      update({ id: e.id }).then(() => {
        this.$emit('update');
      });
    },
    tolsclickOnemore(el) {
      this.$emit('clickOnemore', el);
    },
    clickOnemore() {
      this.$emit('clickOnemore', this.data);
    },
    like(el) {
      like({ id: el.id }).then(res => {
        this.arrlike = res.data.like_count;
        this.arrunlike = res.data.unlike_count;
        // this.$emit("update", { id: el.id, name: "like" });
      });
    },
    unlike(el) {
      unlike({ id: el.id }).then(res => {
        this.arrlike = res.data.like_count;
        this.arrunlike = res.data.unlike_count;
        // this.$emit("update", { id: el.id, name: "unlike" });
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.grid-cell-3 {
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
  margin: 8px 0;
  .type {
    flex: 1;
    color: #1bc6b8;
  }
  .content {
    flex: 8;
    white-space: pre-wrap;
  }
}
.grid-cell-3 {
  display: flex;
  padding: 0 0 0 40px;
  .icon_class {
    // font-size: 14px;
    width: 20px;
    display: flex;
    .iconstyle {
      width: 100%;
      color: #e0e0e0;
      line-height: 20px;
    }
    i {
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>
