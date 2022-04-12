<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width:60px">
            <Back to="/my" />
          </div>
        </template>
        <div class="text-center">回答</div>
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
        <MyAnswerItem
          class="mb-3"
          v-for="(item, index) in dataArr"
          :key="item.id"
          :dataJson="item"
          :bool="bool"
          :index="index"
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
              class="ml-5"
              v-model="item.radio"
              :label="`已选 ${checkTotal}`"
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
import { rstList, remove } from "api/subject";
import MyAnswerItem from "components/MyAnswerItem";
import PlaceHolder from "components/PlaceHolder";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "MyAnswer",
  components: {
    MyAnswerItem,
    PlaceHolder,
    LoadAllTips
  },
  data() {
    return {
      item: {
        radio: false
      },
      bool: false,
      dataArr: [],
      refreshing: false,
      loading: true,
      total: 0,
      limit: 10,
      page: 1,
      isPlaceHolder: false,
      loadAll: false,
      uid: this.$store.getters.user.id
    };
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
    checkTotal(newVal) {
      if (newVal === this.dataArr.length) {
        this.item.radio = true;
      } else {
        this.item.radio = false;
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
  mounted() {
    this.loading = true;
    this.answerList();
  },
  methods: {
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.dataArr = [];
      this.page = 1;
      this.answerList();
    },
    load() {
      this.loading = true;
      this.answerList();
    },
    answerList() {
      let params = {
        page: this.page,
        limit: this.limit,
        type: "answer",
        uid: this.uid,
        parent: 1,
        order: "time"
      };
      rstList(params)
        .then(res => {
          const { list, total } = res.data;
          list.forEach(item => {
            item.checkVal = false;
          });
          const mergeList = this.dataArr.concat(list);
          ++this.page;
          this.total = total;
          this.dataArr = mergeList;
          this.isPlaceHolder = mergeList.length === 0;
          this.item.radio = this.checkTotal === mergeList.length;
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
    handleSelect() {
      this.bool = !this.bool;
      if (this.bool) {
        this.$refs.page.init();
      }
      this.dataArr.forEach(item => {
        item.checkVal = false;
      });
    },
    async remove() {
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
        this.$toast.success("回答删除成功！");
        this.bool = false;

        this.loading = true;
        this.dataArr = [];
        this.page = 1;
        this.answerList();
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
