<template>
  <page>
    <div class="tab-vessel">
      <mu-tabs
        color="primary"
        indicator-color="primary"
        inverse
        active-class="tab-active"
        :value.sync="curItem"
        full-width
      >
        <mu-tab
          v-for="(item, i) in tabList"
          :key="i"
          class="tab-fixed"
          @click="clickTab(item)"
          >{{ item }}</mu-tab
        >
      </mu-tabs>
    </div>
    <div class="scoll-box">
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
        :loaded-all="loadAll"
      >
        <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
        <SeeHooshehaItem
          v-for="(item, index) in list"
          :key="index"
          :data="item"
          class="mt-2 mr-2 ml-2"
        />
      </mu-load-more>
      <LoadAllTips v-if="!isPlaceHolder && loadAll" />
    </div>
    <template #footer>
      <BottomNav />
    </template>
  </page>
</template>
<script>
import { tagsList, findbyTag } from "api/subject";
import SeeHooshehaItem from "components/SeeHooshehaItem";
import PlaceHolder from "components/PlaceHolder";
import BottomNav from "components/BottomNav";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "SeeHoosheha",
  components: {
    SeeHooshehaItem,
    PlaceHolder,
    BottomNav,
    LoadAllTips
  },
  data() {
    return {
      curItem: 0,
      refreshing: false,
      loading: false,
      list: [],
      tabList: ["全部", "", "", "", ""],
      total: 0,
      limit: 10,
      page: 1,
      isPlaceHolder: false,
      loadAll: false
    };
  },
  methods: {
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.list = [];
      this.page = 1;
      this.indexList();
    },
    load() {
      this.loading = true;
      this.indexList();
    },
    indexList() {
      let params = {
        page: this.page,
        limit: this.limit,
        tag: this.curItem === 0 ? "" : this.tabList[this.curItem]
      };
      findbyTag(params)
        .then(res => {
          const { list, total } = res.data;
          const mergeList = this.list.concat(list);
          this.page = ++this.page;
          this.total = total;
          this.list = mergeList;
          this.isPlaceHolder = mergeList.length === 0;
          console.log(
            "已请求列表总数：",
            this.list.length,
            "可请求总数:",
            total
          );
          if (this.list.length === total) {
            this.loadAll = true;
          }
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    tabsList() {
      let params = {
        page: 1,
        limit: 1000
      };
      tagsList(params).then(res => {
        this.tabList = ["全部", ...res.data.list];
      });
    },
    clickTab(value) {
      if (value !== this.curItem) {
        this.curItem = this.tabList.indexOf(value);
        this.loading = true;
        this.refreshing = false;
        this.loadAll = false;
        this.page = 1;
        this.list = [];
        this.indexList();
      }
    }
  },
  mounted() {
    this.loading = true;
    this.indexList();
    this.tabsList();
  }
};
</script>
<style lang="scss" scoped>
.tab-vessel {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  box-shadow: 1px 1px 2px rgba($color: #7f7f7f, $alpha: 0.1);
  z-index: 20;
  overflow-x: auto;
  .tab-fixed {
    white-space: nowrap;
  }
}
.mu-tabs {
  overflow: visible;
}
.scoll-box {
  padding-top: 48px;
}
.loadall-text {
  margin-top: 10px;
  text-align: center;
  color: #ccc;
  margin-bottom: 20px;
}
</style>
