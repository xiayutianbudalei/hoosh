<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back />
        </template>
        <div class="text-center">
          <span class="bqxqihs">{{ tagName }}</span>
        </div>
        <template v-slot:right>
          <div style="height: 100%;width:48px"></div>
        </template>
      </mu-appbar>
    </template>
    <mu-container class="mt-3">
      <div>共有({{ total }})个提问</div>
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
        :loaded-all="loadAll"
      >
        <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
        <Labepages
          v-for="(item, index) in list"
          :key="index"
          :data="item"
          class="mb-2"
          :id="item.id"
        />
      </mu-load-more>
      <LoadAllTips v-if="!isPlaceHolder && loadAll" />
    </mu-container>
    <template #footer> </template>
  </page>
</template>
<script>
import wenHa from "assets/images/wen-ha.png";
import Labepages from "components/Labepages";
import { tallys } from "api/subject";
import PlaceHolder from "components/PlaceHolder";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "Home",
  components: {
    Labepages,
    PlaceHolder,
    LoadAllTips
  },
  data() {
    return {
      wenHa,
      refreshing: false,
      loading: true,
      list: [],
      total: 0,
      limit: 20,
      page: 1,
      isPlaceHolder: false,
      loadAll: false,
      tagName: "",
      groupid: ""
    };
  },
  mounted() {
    let name = this.$route.query.name;
    // let group = this.$route.query.group;
    // console.log(group);
    this.tagName = name;
    this.loading = true;
    this.tallys();
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (from.name === "FillQuestion") {
  //       vm.loading = true;
  //       vm.loadAll = false;
  //       vm.list = [];
  //       vm.page = 1;
  //       vm.tallys();
  //     }
  //   });
  // },
  methods: {
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.list = [];
      this.page = 1;
      this.tallys();
    },
    load() {
      this.loading = true;
      this.tallys();
    },
    tallys() {
      console.log(this.$route.query.group);
      let group = this.$route.query.group;

      this.groupid = group;

      if (this.groupid == "" || JSON.stringify(this.groupid) === "{}") {
        this.groupid = "";
      }
      let params = {
        page: this.page,
        limit: this.limit,
        tag: this.tagName,
        group_id: this.groupid
      };
      tallys(params)
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
          if (mergeList.length === total) {
            this.loadAll = true;
          }
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    toFillquestion() {
      this.$router.push({
        name: "FillQuestion"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.bqxqihs {
  box-sizing: border-box;
  vertical-align: middle;
  font-size: 17px;
  width: 100%;
}
</style>
