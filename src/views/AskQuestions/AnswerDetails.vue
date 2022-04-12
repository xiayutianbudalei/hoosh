<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back />
        </template>
      </mu-appbar>
    </template>
    <mu-container>
      <mu-row>
        <mu-col span="12" class="grid_1">
          <div class="avatar_group mb-3 mt-3">
            <Avatar
              size="mini"
              :name="data.creator ? data.creator.user_abbr : ''"
              :bgColor="data.creator ? data.creator.user_backcolor : ''"
              :headIcon="data.creator ? data.creator.user_headicon : ''"
            />
            <span class="text ml-2 ellipsis-line1" style="width:100px">
              {{ data.creator ? data.creator.user_name : '' }}
            </span>
            <span class="text ml-2 mr-2" style="position:absolute;right:0.5rem">
              {{ data.mtime | filter(16) }}
            </span>
          </div>
        </mu-col>
        <mu-divider></mu-divider>
        <mu-col
          span="11"
          class="mx-at mt-2 mb-2 content_box"
          v-html="data.content"
        ></mu-col>
        <mu-divider
          style=" padding: 2px 0px; background-color:rgb(242, 242, 242 ); margin: 0px 10px;"
        ></mu-divider>

        <!-- <mu-divider></mu-divider> -->
        <mu-col span="12" class="content-grid-1">
          <div>
            <mu-button flat class="all data_active ">多问一句</mu-button>
          </div>
          <div class="set_menu  mr-1">
            <div>
              <div class="moren active" ref="moren" @click="toggleSortMode(0)">
                默认
              </div>
              <div class="zuixin" ref="zuixin" @click="toggleSortMode(1)">
                最新
              </div>
            </div>
          </div>
        </mu-col>
        <mu-divider
          style="background-color:#F6F6F6; margin: 0px 10px;"
        ></mu-divider>
        <div class="ml-4 mr-4">
          <mu-load-more
            class="comment-box"
            :refreshing="refreshing"
            :loading="loading"
            @load="load"
            :loaded-all="loadAll"
          >
            <div v-for="(item, i) in dataList" :key="i" span="12">
              <NormalOnemore
                v-if="item.type === 'reask'"
                @clickOnemore="handleClickOneMore"
                :data="item"
                ref="Expandmore"
              >
                <button class="mores" @click="Child(item.id)">
                  展开更多
                </button>
              </NormalOnemore>
            </div>
            <div>
              <GetDesce
                v-for="(it, index) in dataThreeList"
                :key="index"
                @clickreply="handleClickOneMore"
                :data="it"
              />
            </div>
          </mu-load-more>
        </div>
        <div v-if="noData" style="text-align:center;width:100%">
          <PlaceHolder type="3" message="暂无内容" />
        </div>
      </mu-row>
    </mu-container>
    <EditOnemore
      @hideoneSheet="hideoneSheet"
      @hideoneSheetAndUpdata="hideoneSheetAndUpdata"
      :passContent="passContent"
      :parameter="parameter"
      :author="passAuthor ? passAuthor : author"
      :onoffa="showEditOneMore"
      :id="passId ? passId : id"
    />
    <template #footer>
      <mu-bottom-nav class="bottom-nav">
        <div class="left" @click="nextAnswer">下一个回答</div>
        <div class="right" @click="createOnemore">多问一句</div>
      </mu-bottom-nav>
    </template>
  </page>
</template>

<script>
import { getContent, rstList, getDescendant } from 'api/subject';
// import OneMoreItem from "./components/OneMoreItem";
import NormalOnemore from './components/NormalOnemore';
import EditOnemore from './components/EditOnemore';
import PlaceHolder from 'components/PlaceHolder';
// import LoadAllTips from "components/LoadAllTips";
import GetDesce from './components/getDesce';
export default {
  name: 'answerDetails', //回答详情
  components: {
    // LoadAllTips,
    // OneMoreItem,
    NormalOnemore,
    EditOnemore,
    PlaceHolder,
    GetDesce,
  },
  data() {
    //这里存放数据
    return {
      parameter: 1,
      id: this.$route.params.id,
      pid: '',
      passId: '',
      passContent: '',
      passAuthor: '',
      refreshing: false,
      loading: false,
      loadAll: false,
      data: {},
      chipList: [],
      dataList: [],
      threeList: [],
      dataThreeList: [],
      answerList: [],
      interface: {
        total: 0,
        limit: 10,
        page: 1,
        type: 'reask',
        order: 'default',
      },
      threeinterface: {
        total: 0,
        limit: 200,
        page: 1,
        type: 'answer',
        order: 'default',
      },
      towinterface: {
        total: 0,
        limit: 200,
        page: 1,
      },
      noData: false,
      content: '',
      author: '',
      showEditOneMore: false,
      rstIndex: null,
      reqParams: {
        id: this.$route.params.id,
        child_type: 'reask',
        order: 'default',
        icon: 1,
      },
    };
  },
  watch: {
    $route() {
      this.$router.go(0);
    },
  },
  //方法集合
  methods: {
    toggleSortMode(status) {
      if (status === 0) {
        this.$refs.moren.classList.add('active');
        this.$refs.zuixin.classList.remove('active');
        this.interface.order = 'default';
        this.interface.page = 1;
        this.interface.limit = 200;
        this.threeinterface.order = 'default';
        this.dataList = [];
        this.rstList();
        this.dataThreeList = [];
        this.getDescendant();
        this.threeList = [];
        this.answerlist();
      } else {
        this.$refs.zuixin.classList.add('active');
        this.$refs.moren.classList.remove('active');
        this.interface.order = 'time';
        this.interface.page = 1;
        this.interface.limit = 200;
        this.threeinterface.order = 'time';
        this.dataList = [];
        this.rstList();
        this.dataThreeList = [];
        this.getDescendant();
        this.threeList = [];
        this.answerlist();
      }
    },
    hideoneSheet() {
      this.showEditOneMore = false;
    },
    hideoneSheetAndUpdata(el) {
      this.indexid = el;
      this.showEditOneMore = false;
      // this.interface.page = this.interface.page;
      this.interface.page = 1;
      // this.interface.limit = 200;
      this.dataList = [];
      this.dataThreeList = [];
      this.threeList = [];
      this.findAll(el);
    },
    createOnemore() {
      if (!this.$store.getters.token) {
        this.$router.push('/login');
        return;
      }
      this.parameter = 1;
      this.passContent = this.content;
      this.passId = this.id;
      this.showEditOneMore = true;
    },
    getBaseContent() {
      let params = this.reqParams;
      getContent(params).then(res => {
        this.data = res.data;
        this.pid = res.data.ask_id;
        this.passContent = this.content = this.data.content;
        this.passAuthor = this.data.user_name;
      });
    },
    findAll(id) {
      Promise.all([
        this.rstList(),
        this.answerlist(),
        this.getDescendant(),
      ]).then(() => {
        if (id != void 0) {
          this.$nextTick(() => {
            const { top } = document.getElementById(id).getBoundingClientRect();
            const wHeight = window.innerHeight || document.body.clientHeight;
            if (top > wHeight) {
              window.scrollTo(0, top - wHeight / 2);
            }
          });
        }
      });
    },
    rstList() {
      const { page, limit, order, type } = this.interface;
      let params = {
        parent_id: this.reqParams.id,
        limit,
        page,
        icon: 1,
        child: 1,
        order,
        type,
      };
      rstList(params).then(res => {
        const { list, total } = res.data;
        const mergeList = this.dataList.concat(list);
        mergeList.forEach((elm, ite) => {
          elm.page = this.interface.page;
          elm.ite = ite;
        });
        this.interface.page = ++this.interface.page;
        this.interface.total = total;
        this.dataList = mergeList;
        console.log(
          '已请求列表总数：',
          this.dataList.length,
          '可请求总数:',
          total
        );
        if (mergeList.length === total) {
          this.loadAll = true;
        }
        if (total === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      });
    },
    answerlist() {
      const { page, limit, order, type } = this.threeinterface;
      let params = {
        parent_id: this.reqParams.id,
        limit,
        page,
        icon: 1,
        order,
        type,
      };
      rstList(params).then(res => {
        const { list } = res.data;
        this.threeList = list;
      });
    },
    getDescendant() {
      const { page, limit } = this.towinterface;
      let params = {
        id: this.reqParams.id,
        limit,
        page,
        icon: 1,
      };
      getDescendant(params).then(res => {
        const { list, total } = res.data;
        const mergeList = this.dataThreeList.concat(list);
        mergeList.forEach((elm, ite) => {
          elm.page = this.towinterface.page;
          elm.ite = ite;
        });
        this.towinterface.total = total;
        this.dataThreeList = mergeList;
        console.log(
          '已请求列表总数：',
          this.dataThreeList.length,
          '可请求总数:',
          total
        );
        this.getDescendantas = total;
        // if (mergeList.length === total) {
        //   this.loadAll = true;
        // }
      });
    },
    load() {
      if (this.interface.total !== this.dataList.length) {
        this.loading = true;
        this.dataThreeList = [];
        this.threeList = [];
        this.rstList();
        this.rstListTwo();
        this.getDescendant();
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    nextAnswer() {
      rstList({ parent_id: this.pid, type: 'answer' }).then(res => {
        this.answerList = res.data.list;
        if (this.id === this.answerList[this.answerList.length - 1].id) {
          //当前回答为回答列表中最后一个，弹框提示为最后一个
          this.$toast.error('下一个回答为空');
        } else {
          for (let i = 0; i < this.answerList.length; i++) {
            if (this.answerList[i].id === parseInt(this.id)) {
              this.rstIndex = i;
            }
          }
          // console.log(this.rstIndex);
          // console.log(this.answerList[this.rstIndex + 1].id);
          this.$router.push({
            name: 'AnswerDetails',
            params: {
              id: this.answerList[this.rstIndex + 1].id,
              pid: this.pid,
            },
          });
        }
      });
    },
    handleClickOneMore(el) {
      if (!this.$store.getters.token) {
        this.$router.push('/login');
        return;
      }
      this.parameter = 2;
      this.passContent = el.content;
      this.passAuthor = el.user_name;
      this.passId = el.id;
      this.showEditOneMore = true;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getBaseContent();
    this.findAll();
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.grid_1 {
  padding: 0 15px;
  .avatar_group {
    flex: 1;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    margin-right: 12px;
  }
}
.content_box {
  word-break: break-all;
  min-height: 160px;
  // overflow-y: hidden;
  text-align: left;
  ::v-deep div {
    text-align: left;
    img {
      width: auto;
      height: auto;
      max-width: 50%;
      max-height: 100%;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
.content-grid-1 {
  margin: 10px 0;
  display: flex;

  .all {
    color: #000;
    font-size: 16px;
  }

  .set_menu {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    & > div {
      margin-right: 10px;
      width: 100px;
      border: 1px solid #ccc;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .moren,
      .zuixin {
        width: 40%;
        height: 101%;
        border-radius: 20px;
        text-align: center;
        line-height: 34px;
      }

      .active {
        background: #1bc6b8;
        width: 60%;
        color: snow;
      }
    }
  }
}
.bottom-nav {
  div {
    width: 50%;
    height: 100%;
    line-height: 55px;
    color: snow;
  }
  .left {
    background: #fff;
    color: #1bc6b8;
  }
  .right {
    background: #1bc6b8;
  }
}
.container {
  width: 100%;
  padding-right: 0px;
  padding-left: 0px;
  margin-right: auto;
  margin-left: auto;
}
</style>
