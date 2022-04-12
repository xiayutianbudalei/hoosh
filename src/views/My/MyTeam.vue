<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width: 100px">
            <Back />
          </div>
        </template>
        <div class="text-center" style="padding-right: 25px;">我的小组</div>
        <template v-slot:right>
          <div class="cheswe">
            <mu-button flat color="#1BC6B8" @click="gotolick"> 创建</mu-button>
          </div>
        </template>
      </mu-appbar>
    </template>
    <div class="tab-vessel">
      <mu-tabs
        :value.sync="active"
        inverse
        full-width
        color="primary"
        indicator-color="#1BC6B8"
        center
        @change="aserfe"
      >
        <!-- @change="changeVal" -->
        <mu-tab>我创建的</mu-tab>
        <mu-tab>我加入的</mu-tab>
      </mu-tabs>
    </div>
    <div class="demo-text ml-3" v-if="active === 0">
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
        :loaded-all="loadAll"
      >
        <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
        <MyTeamitem
          v-for="(item, index) in list"
          :key="index"
          :data="item"
          :id="item.id"
          class="mt-1 "
          :disa="disa"
          @MyTeam="groupCloses"
          :disable="disable"
        />
      </mu-load-more>
    </div>
    <div class=" ml-3" v-if="active === 1">
      <mu-load-more
        @refresh="refreshs"
        :refreshing="refreshing"
        :loading="loading"
        @load="loads"
        :loaded-all="loadAll"
      >
        <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
        <MyTeamitems
          v-for="(item, index) in lists"
          :key="index"
          :data="item"
          :id="item.id"
          class="mt-1"
          @exit="groupQuits"
        />
      </mu-load-more>
    </div>
    <LoadAllTips v-if="!isPlaceHolder && loadAll" />
  </page>
</template>

<script>
import MyTeamitem from "components/MyTeamitem";
import MyTeamitems from "components/MyTeamitems";
import {
  groupMine,
  groupJionlist,
  groupClose,
  groupOpen,
  groupQuit
} from "api/subject";
import LoadAllTips from "components/LoadAllTips";
import PlaceHolder from "components/PlaceHolder";
export default {
  name: "MyTeam",
  components: {
    MyTeamitem,
    MyTeamitems,
    LoadAllTips,
    PlaceHolder
  },
  data() {
    return {
      banned: "",
      disa: true,
      active: 0,
      refreshing: false,
      loading: true,
      list: [],
      lists: [],
      total: 0,
      limit: 20,
      page: 1,
      isPlaceHolder: false,
      loadAll: false,
      disabless: {},
      exitss: {},
      selActive: 0,

      disable: "禁用"
    };
  },
  mounted() {
    this.list = [];
    this.lists = [];
    this.page = 1;
    this.limit = 20;

    this.changeVal(0);
  },
  methods: {
    changeVal(elm) {
      if (this.selActive != elm) {
        this.selActive = elm;

        this.limit = 20;
      }

      let params = {
        page: this.page,
        limit: this.limit
      };
      let port = groupMine;
      if (elm == 0) {
        this.limit = 20;

        port = groupMine;
        this.loadAll = false;
      } else {
        if (!this.token) {
          this.loadAll = false;
          this.page = 1;
          this.lists = [];
          this.limit = 20;
        }
        port = groupJionlist;
      }
      port(params)
        .then(res => {
          const { list, total } = res.data;
          const mergeList =
            elm == 0 ? this.list.concat(list) : this.lists.concat(list);
          this.page = ++this.page;
          this.total = total;
          elm == 0 ? (this.list = mergeList) : (this.lists = mergeList);
          this.isPlaceHolder = mergeList.length === 0;
          console.log(
            "已请求列表总数：",
            this.list.length,
            "可请求总数:",
            total
          );
          if (mergeList.length == total && elm == 0) {
            this.loadAll = true;
          }

          if (mergeList.length == total && elm == 1) {
            this.loadAll = true;
          }
        })

        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    aserfe(elm) {
      if (elm == 0) {
        this.page = 1;
        this.list = [];
        this.limit = 20;
        this.changeVal(0);
      } else {
        this.page = 1;
        this.lists = [];
        this.limit = 20;
        this.changeVal(1);
      }
    },
    groupCloses(val) {
      this.disabless = val;
      this.banned = this.disabless.disable;
      let params = {
        id: this.disabless.id
      };
      if (this.banned == 0) {
        this.$confirm(
          "禁用后，不能进行任何操作，只可查看历史信息，请确认是否继续操作？",
          "警告",
          {
            type: "warning"
          }
        ).then(({ result }) => {
          if (result) {
            this.disa = !this.disa;
            groupClose(params).then(() => {
              this.$toast.success("禁用成功");
            });
            this.disable = "解禁";
            this.list = [];
            this.lists = [];
            this.page = 1;
            this.limit = 20;
            this.changeVal(0);
          } else {
            this.$toast.error("已取消");
          }
        });
      } else {
        groupOpen(params).then(() => {
          this.$toast.success("已解禁");
        });
        this.disable = "禁用";
        this.list = [];

        this.page = 1;
        this.limit = 20;
        this.changeVal(0);
      }
    },

    groupQuits(val) {
      this.exitss = val;
      this.$confirm(
        "退出后，不能进行任何操作，也无法查看历史信息，请确认是否继续操作？",
        "警告",
        {
          type: "warning"
        }
      ).then(({ result }) => {
        if (result) {
          let params = {
            id: this.exitss.id
          };
          groupQuit(params).then(() => {
            this.$toast.success("退出成功");
          });

          this.lists = [];
          this.page = 1;
          this.limit = 20;
          this.changeVal(1);
        } else {
          this.$toast.error("已取消");
        }
      });
    },
    gotolick() {
      this.$router.push({ path: "/createAgroup" });
    },
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.limit = 20;
      this.page = 1;
      this.list = [];
      this.changeVal(0);
    },
    refreshs() {
      this.refreshing = true;
      this.loadAll = false;
      this.limit = 20;
      this.page = 1;
      this.list = [];
      this.changeVal(1);
    },
    load() {
      this.loadAll = false;
      this.loading = true;
      this.changeVal(0);
    },
    loads() {
      this.loadAll = false;
      this.loading = true;
      this.changeVal(1);
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.cheswe {
  height: 100%;
  width: 70px;
}
</style>
