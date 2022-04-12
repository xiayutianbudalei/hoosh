<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width: 50px">
            <Back />
          </div>
        </template>
        <div class="text-center">以问会友</div>
        <template v-slot:right>
          <div style=" height: 100%; width:85px;  position:relative;">
            <mu-button
              v-show="Tafds"
              flat
              @click.stop="favor"
              class="buttt"
              :style="{
                backgroundColor: bg_color,
                color: ft_color,
                border: db_border
              }"
              >{{ asdd }}
            </mu-button>
          </div>
        </template>
      </mu-appbar>
    </template>
    <div>
      <div
        style="
          width: 100%;
          height: 100px;
          text-align: center;
          line-height: 50px;
        "
      >
        <Avatar
          v-if="creator.user_abbr"
          size="small"
          :name="creator.user_abbr"
          :bgColor="creator.user_backcolor"
          :headIcon="creator.user_headicon"
          style="vertical-align: middle; margin-top: 20px"
        />

        <div v-if="creator.user_name" class="shenlve" style="font-size: 20px">
          {{ creator.user_name }}
        </div>
      </div>
    </div>
    <mu-container>
      <div class="tab-vessel" v-show="headerFixed">
        <mu-tabs
          class="mt-4"
          :value.sync="active"
          inverse
          @change="onChange"
          full-width
          color="primary"
          indicator-color="#1BC6B8"
          center
        >
          <mu-tab value="ask">提问</mu-tab>
          <mu-tab value="answer">回答</mu-tab>
          <mu-tab value="reask">多问一句</mu-tab>
        </mu-tabs>
      </div>
      <div id="fixedHeaderRoot" v-show="headerFixedred">
        <mu-tabs
          class="mt-4"
          :value.sync="active"
          inverse
          @change="onChange"
          full-width
          color="primary"
          indicator-color="#1BC6B8"
          center
        >
          <mu-tab value="ask">提问</mu-tab>
          <mu-tab value="answer">回答</mu-tab>
          <mu-tab value="reask">多问一句</mu-tab>
        </mu-tabs>
      </div>

      <div class="mt-5" v-if="active == 'ask'">
        <div v-for="(item, index) in dataArr" :key="item.id">
          <Aserrt :dataJson="item" :bool="bool" :index="index" class="mb-3" />
        </div>
      </div>
      <div class="mt-5" v-if="active == 'answer'">
        <div v-for="(item, index) in dataArr" :key="item.id">
          <Huidaitem
            :dataJson="item"
            class="mb-3"
            :bool="bool"
            :index="index"
          />
        </div>
      </div>
      <div class="mt-5" v-if="active == 'reask'">
        <div v-for="(item, index) in dataArr" :key="index">
          <Duowei :dataJson="item" class="mb-3" :bool="bool" :index="index" />
        </div>
      </div>
      <mu-container class="mt-3">
        <mu-load-more
          :refreshing="refreshing"
          :loading="loading"
          @load="load"
          :loaded-all="loadAll"
        >
          <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
          <LoadAllTips v-if="!isPlaceHolder && loadAll" />
        </mu-load-more>
      </mu-container>
    </mu-container>
  </page>
</template>

<script>
import PlaceHolder from "components/PlaceHolder";
import { rstList, add, searcStatus } from "api/subject";
import { getUser } from "api/user";
import LoadAllTips from "components/LoadAllTips";
import Aserrt from "components/ToAskFriendsitem/aserrt";
import Huidaitem from "components/ToAskFriendsitem/huidaitem";
import Duowei from "components/ToAskFriendsitem/duowei";

export default {
  name: "ToAskFriends",
  components: { PlaceHolder, LoadAllTips, Aserrt, Huidaitem, Duowei },
  data() {
    return {
      nid: this.$route.query.id,
      bool: false,
      dataArr: [],
      refreshing: false,
      loading: false,
      total: 0,
      group_id: 0,
      limit: 20,
      page: 1,
      isPlaceHolder: false,
      loadAll: false,
      uid: this.$store.getters.user.id,
      active: "ask",
      asdd: "+关注",
      bg_color: "#ffffff",
      ft_color: "#1bc6b8",
      db_border: "1px solid #1bc6b8",
      dianzan: false,
      userId: "",
      num: 1,
      creator: {},
      headerFixed: false,
      headerFixedred: true,
      Tafds: false
    };
  },
  mounted() {
    let id = this.$route.query.id;
    // let type = this.active;
    // console.log(type);
    this.page = 1;
    this.total = 0;
    this.limit = 20;
    this.idName = id;
    this.getUser();
    this.answerList();
    this.getIsStatus();
    // handleScroll为页面滚动的监听回调
    window.addEventListener("scroll", this.handleScroll);
  },

  computed: {
    checkTotal: function() {
      let num = [];
      this.dataArr.forEach(item => {
        if (item.checkVal) {
          num.push(1);
        }
      });
      return num.length;
    }
  },
  watch: {
    dianzan(newVal) {
      if (newVal) {
        this.asdd = "已关注";
        this.bg_color = "#999999";
        this.ft_color = "#ffffff";
        this.db_border = "1px solid #999999";
      } else {
        this.asdd = "+关注";
        this.bg_color = "#ffffff";
        this.ft_color = "#1bc6b8";
        this.db_border = "1px solid #1bc6b8";
      }
    },
    "item.radio"(newVal) {
      if (newVal) {
        this.dataArr.forEach(item => {
          item.checkVal = true;
        });
      } else {
        if (this.checkTotal === this.dataArr.length) {
          this.dataArr.forEach(item => {
            item.checkVal = false;
          });
        }
      }
    }
  },
  methods: {
    getUser() {
      getUser({ uid: this.nid }).then(res => {
        this.creator = res.data;
      });
    },
    onChange(value) {
      this.active = value;
      this.dataArr = [];
      this.page = 1;
      this.total = 0;
      this.limit = 20;
      this.answerList();
    },
    // 查询关注状态
    getIsStatus() {
      let params = {
        obj_id: this.nid,
        obj_type: "user"
      };
      if (!this.$store.getters.token) {
        return false;
      }
      searcStatus(params).then(res => {
        if (res.code == 200) {
          this.dianzan = res.data.status == 0 ? false : true;
        }
      });
    },
    yhbsbxs() {
      if (this.nid == this.uid) {
        this.Tafds = false;
      } else {
        this.Tafds = true;
      }
    },
    // refresh() {
    //   this.refreshing = true;
    //   this.loadAll = false;
    //   this.dataArr = [];
    //   this.page = 1;
    //   this.answerList();
    // },
    load() {
      this.loading = true;
      this.answerList();
    },
    answerList() {
      let params = {
        page: this.page,
        limit: this.limit,
        type: this.active,
        uid: this.$route.query.id,
        group_id: this.group_id,
        order: "time",
        icon: 1,
        public: 1,
        parent: 1
      };
      rstList(params).then(res => {
        const { list, total } = res.data;
        const mergeList = this.dataArr.concat(list);
        ++this.page;
        this.total = total;
        this.dataArr = mergeList;
        if (this.num == 1) {
          this.num += 1;
        }
        this.loading = false;
        this.yhbsbxs();
        if (mergeList.length === 0) {
          this.isPlaceHolder = true;
        } else {
          this.isPlaceHolder = false;
        }

        console.log("已请求列表总数：", mergeList.length, "可请求总数:", total);
        if (mergeList.length === total) {
          this.loadAll = true;
        } else {
          this.loadAll = false;
        }
      });

      this.$nextTick(function() {
        // 这里fixedHeaderRoot是吸顶元素的ID
        let header = document.getElementById("fixedHeaderRoot");
        // 这里要得到top的距离和元素自身的高度
        this.offsetTop = header.offsetTop;
        this.offsetHeight = header.offsetHeight;
      });
    },
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 判断页面滚动的距离是否大于吸顶元素的位置
      if (scrollTop > this.offsetTop - this.offsetHeight) {
        this.headerFixed = true;
        this.headerFixedred = false;
      } else {
        this.headerFixed = false;
        this.headerFixedred = true;
      }
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    favor() {
      this.userId = this.nid;
      this.modifyUser(this.userId);
    },
    modifyUser(e) {
      if (!e) {
        this.$toast.error("关注失败");
        return false;
      }
      let isState = this.dianzan ? "remove" : "add";
      let params = {
        obj_id: e,
        obj_type: "user",
        action: isState
      };
      add(params).then(() => {
        this.dianzan = !this.dianzan;
        this.$toast.success(this.dianzan ? "关注成功" : "取消关注");
      });
    },
    handleSelect() {
      this.bool = !this.bool;
      if (this.bool) {
        this.$refs.page.init();
      }
      this.dataArr.forEach(item => {
        item.checkVal = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.jchd {
  position: relative;
}
.tab-vessel {
  position: fixed;
  width: 100%;
  top: 40px;
  box-shadow: 1px 1px 2px rgba($color: #7f7f7f, $alpha: 0.1);
  z-index: 20;
  overflow-x: auto;
  margin-bottom: 15px;
}
.jchd-title {
  text-align: center;
  position: relative;
  top: -10px;
}
.jchd-in {
  background: #fafafa;
  padding: 3px 10px;
  font-size: 16px;
}
.activity-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.qr-box {
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
.buttt {
  // width: 100%;
  margin-right: 5px;
  height: 50%;
  border: 1px solid #1bc6b8;
  color: #1bc6b8;
  border-radius: 6px;
  margin-top: 13px;
}
</style>
