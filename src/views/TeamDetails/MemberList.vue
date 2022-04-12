<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width:60px">
            <Back />
          </div>
        </template>
        <div class="text-center">小组成员</div>
        <template v-slot:right>
          <div class="yaoqing">
            <mu-button
              flat
              color="#1BC6B8"
              @click="gotolave(group.banned, group.id)"
            >
              +邀请</mu-button
            >
          </div>
        </template>
      </mu-appbar>
    </template>
    <p style="margin-left: 10px;">成员（{{ total }}）</p>
    <div v-for="(item, index) in list" :key="index" style="margin-top: 10px;">
      <MemberListitem
        :dataArr="item"
        :index="index"
        :group="group.user_id"
        :curUserId="curUserId"
        @removemember="removemembers"
        class="mb-3"
      />
    </div>
  </page>
</template>

<script>
import { groupMember, removemember } from "api/subject";
import MemberListitem from "../../components/MemberListitem";
export default {
  name: "MemberList",
  components: { MemberListitem },
  data() {
    return {
      group: {},
      list: [],
      total: 0,
      limit: 10,
      page: 1,
      uid: this.$route.query.id,
      curUserId: this.$store.getters.user.id
    };
  },
  mounted() {
    this.updates();
    // console.log(this.curUserId);
  },
  methods: {
    updates() {
      let params = {
        page: this.page,
        limit: this.limit,
        id: this.uid
      };
      groupMember(params).then(res => {
        const { list, total } = res.data;
        this.group = res.data.group;
        const mergeList = this.list.concat(list);
        ++this.page;
        this.total = total;
        this.list = mergeList;
        console.log("已请求列表总数：", mergeList.length, "可请求总数:", total);
      });
    },
    //移除小组成员

    removemembers(e) {
      this.$confirm("是否确定移除该成员？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          let params = {
            id: this.uid,
            uid: e.id
          };
          removemember(params).then(() => {
            this.$toast.success("移除成功");
            this.list = [];
            this.limit = 10;
            this.page = 1;
            this.updates();
          });
        } else {
          this.$toast.error("已取消");
        }
      });
    },
    gotolave(elm, e) {
      if (elm == 0) {
        this.gotolink(e);
      } else {
        this.aswewwe();
      }
    },
    aswewwe() {
      this.$alert("小组已被禁用，不可操作", "提示");
    },
    gotolink(e) {
      this.$router.push({
        path: "invitation",
        query: { id: e }
      });
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
.yaoqing {
  height: 100%;
  width: 70px;
}
</style>
