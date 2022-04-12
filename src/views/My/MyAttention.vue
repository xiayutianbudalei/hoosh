<template>
  <div>
    <mu-appbar z-depth="0">
      <template v-slot:left>
        <div style="width: 100px">
          <Back />
        </div>
      </template>
      <div class="text-center" style="padding-right: 25px;">我的关注</div>
      <template v-slot:right>
        <div style="width: 100px">
          <span class="appwes" @click="djcx()">{{ guanzu }}</span>
          <span class="icon-container">
            <div style="width: 10px; height: 10px; ">
              <mu-icon
                size="36"
                value="arrow_drop_up"
                color=" #1bc6b8"
              ></mu-icon>
            </div>
            <div style="width: 10px; height: 10px; ">
              <mu-icon
                size="36"
                value="arrow_drop_down"
                color=" #1bc6b8"
              ></mu-icon>
            </div>
          </span>
        </div>
      </template>
    </mu-appbar>
    <div
      v-for="(item, index) in dataArr"
      :key="index"
      style="margin-top: 10px;"
    >
      <MyAttentionitem
        :dataArr="item"
        :index="index"
        @addTodo="addTodo"
        class="mb-3"
      />
    </div>
    <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
  </div>
</template>

<script>
import { user, add } from "api/subject";
import MyAttentionitem from "../../components/MyAttentionitem";
import PlaceHolder from "components/PlaceHolder";

export default {
  name: "MyAttention",
  components: { MyAttentionitem, PlaceHolder },
  data() {
    return {
      dataArr: [],
      refreshing: false,
      loading: false,
      total: 0,
      limit: 10,
      page: 1,
      orderby: "time_asc",
      uid: this.$store.getters.user.id,
      zjgz: false,
      guanzu: "最早关注",
      isPlaceHolder: false
    };
  },
  mounted() {
    this.updates();
  },
  methods: {
    updates() {
      let params = {
        page: this.page,
        limit: this.limit,
        uid: this.uid,
        orderby: this.orderby
      };
      user(params)
        .then(res => {
          const { list, total } = res.data;
          list.forEach(item => {
            item.checkVal = false;
          });

          const mergeList = this.dataArr.concat(list);
          this.page = ++this.page;
          this.total = total;
          this.dataArr = mergeList;
          this.isPlaceHolder = mergeList.length === 0;
          this.checked = this.selectedTotal === mergeList.length;
          console.log(
            "已请求列表总数：",
            mergeList.length,
            "可请求总数:",
            total
          );
          if (mergeList.length === total) {
            this.loadAll = true;
          }
          this.loading = false;
          this.refreshing = false;
        })
        .catch(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    // 取消关注
    addTodo(e) {
      let params = {
        obj_id: e.id,
        obj_type: "user",
        action: "remove"
      };
      add(params).then(() => {
        this.$toast.success("取消关注");
        this.modert(); // 取消成功后  调用列表请求  重新渲染数据
      });
    },
    modert() {
      (this.dataArr = []),
        (this.refreshing = false),
        (this.loading = false),
        (this.total = 0),
        (this.limit = 10),
        (this.page = 1),
        (this.orderby = "time_asc"),
        (this.uid = this.$store.getters.user.id),
        this.updates();
    },
    djcx() {
      this.zjgz = !this.zjgz;
      if (this.zjgz == false) {
        (this.guanzu = "最早关注"), this.modert();
      } else {
        (this.guanzu = "最新关注"), this.timAsc();
      }
    },
    timAsc() {
      (this.dataArr = []),
        (this.refreshing = false),
        (this.loading = false),
        (this.total = 0),
        (this.limit = 10),
        (this.page = 1),
        (this.uid = this.$store.getters.user.id),
        (this.orderby = ""),
        this.updates();
    }
  }
};
</script>

<style lang="scss" scoped>
.appwes {
  width: 70%;
  height: 100%;
  display: block;
  float: left;
  line-height: 40px;
  text-align: right;
}
.icon-container {
  width: 30%;
  height: 100%;
  display: block;
  float: right;
}
</style>
