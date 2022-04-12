<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width: 56px">
            <Back />
          </div>
        </template>
        <div class="text-center">问题</div>
        <template v-slot:right>
          <div class="cheswe">
            <mu-button
              v-if="dataArr.length"
              flat
              color="#1BC6B8"
              @click="handleSelect"
            >
              选择</mu-button
            >
          </div>
        </template>
      </mu-appbar>
    </template>
    <mu-container class="mt-3">
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
        :loaded-all="loadAll"
      >
        <MyposeItem
          v-for="(item, index) in dataArr"
          :key="item.id"
          @checkChange="itemCheckChange"
          :dataJson="item"
          :bool="bool"
          :index="index"
          class="mb-3"
        />
        <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
        <LoadAllTips v-if="!isPlaceHolder && loadAll" />
      </mu-load-more>
    </mu-container>
    <template v-slot:footer>
      <footer class="footer-vessel" v-if="bool">
        <div class="flex">
          <div class="flexItem">
            <mu-checkbox
              @change="changeAll"
              class="ml-5"
              v-model="checked"
              :label="`已选 ${selectedTotal}`"
            ></mu-checkbox>
          </div>
          <div>
            <mu-button color="red" large @click="remove">删除</mu-button>
          </div>
        </div>
      </footer>
    </template>
  </page>
</template>
<script>
import { Mine, remove } from "api/subject";
import MyposeItem from "components/MyposeItem";
import PlaceHolder from "components/PlaceHolder";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "MyPose",
  components: {
    MyposeItem,
    PlaceHolder,
    LoadAllTips
  },
  data() {
    return {
      checked: false,
      bool: false,
      dataArr: [],
      refreshing: false,
      loading: true,
      total: 0,
      limit: 10,
      page: 1,
      isPlaceHolder: false,
      loadAll: false,
      selectedTotal: 0,
      uid: this.$store.getters.user.id
    };
  },
  mounted() {
    this.questionList();
  },
  watch: {
    selectedTotal(newVal) {
      if (newVal === this.dataArr.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },
  methods: {
    changeAll(value) {
      let arr = [];
      if (value) {
        arr = this.dataArr.map(item => {
          item.checkVal = true;
          return item;
        });
        this.selectedTotal = arr.length;
      } else {
        arr = this.dataArr.map(item => {
          item.checkVal = false;
          return item;
        });
        this.selectedTotal = 0;
      }
      this.dataArr = arr;
    },
    handleSelect() {
      this.bool = !this.bool;
      if (this.bool) {
        this.$refs.page.init();
      }
      this.selectedTotal = 0;
      this.dataArr.forEach(item => {
        item.checkVal = false;
      });
    },
    // 子组件选择返回
    itemCheckChange(bool, index) {
      this.dataArr[index].checkVal = bool;
      if (bool) {
        this.selectedTotal++;
      } else {
        this.selectedTotal--;
      }
    },
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.dataArr = [];
      this.page = 1;
      this.questionList();
    },
    load() {
      this.loading = true;
      this.questionList();
    },
    questionList() {
      let params = {
        page: this.page,
        limit: this.limit,
        type: "ask",
        uid: this.uid,
        order: "time"
      };
      Mine(params)
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
    async remove() {
      // console.log(this.dataArr);
      let arrId = [];
      this.dataArr.map(item => {
        if (item.checkVal === true) {
          arrId.push(item.id);
        }
      });

      if (arrId.length > 0) {
        for (let i = 0; i < arrId.length; i++) {
          await remove({ id: arrId[i] });
        }

        this.$toast.success("提问删除成功！");
        this.bool = false;

        this.loading = true;
        this.dataArr = [];
        this.page = 1;
        this.questionList();
      } else {
        this.$toast.error("请选择");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.footer-vessel {
  border-top: 1px solid #ddd;
  width: 100%;
  background: #fff;
}
.cheswe {
  height: 100%;
  width: 70px;
}
</style>
