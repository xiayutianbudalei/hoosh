<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width: 60px">
            <Back to="/mymessage" />
          </div>
        </template>
        <div class="text-center">系统通知</div>
        <template v-slot:right>
          <div style="width: 60px;height: 100%">
            <mu-button v-if="dataArr.length" icon @click="handleSelect">
              <mu-icon size="30" value="delete" :color="selectColor"></mu-icon>
            </mu-button>
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
        <SystemInformItem
          class="mt-3s"
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
              :label="`已选${checkTotal}`"
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
import SystemInformItem from "components/SystemInformItem";
import { noticeList, noticeSetread, noticeRemove } from "api/user";
import PlaceHolder from "components/PlaceHolder";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "DynamicMessage",
  components: {
    SystemInformItem,
    PlaceHolder,
    LoadAllTips
  },
  data() {
    return {
      item: {
        radio: false
      },
      bool: false,
      selectColor: "#bbb",
      dataArr: [],
      refreshing: false,
      loading: true,
      total: 0,
      limit: 20,
      page: 1,
      isPlaceHolder: false,
      loadAll: false
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
    this.getNoticeList();
  },
  methods: {
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.dataArr = [];
      this.page = 1;
      this.getNoticeList();
    },
    load() {
      this.loading = true;
      this.getNoticeList();
    },
    getNoticeList() {
      let params = {
        page: this.page,
        limit: this.limit
      };
      noticeList(params)
        .then(res => {
          const { list, total } = res.data;
          let setReadArr = [];
          list.forEach(item => {
            item.checkVal = false;
            if (item.status === 1) {
              setReadArr.push(item.id);
            }
          });
          setReadArr = setReadArr.join(",");
          if (setReadArr) {
            noticeSetread({ id: setReadArr });
          }
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
      this.dataArr.forEach(item => {
        item.checkVal = false;
      });
      this.bool = !this.bool;
      if (this.bool) {
        this.$refs.page.init();
        this.selectColor = "red";
        return;
      }
    },
    remove() {
      let arrId = [];
      this.dataArr.map(item => {
        if (item.checkVal === true) {
          arrId.push(item.id);
        }
      });
      arrId = arrId.join(",");
      noticeRemove({ id: arrId }).then(() => {
        this.$toast.success("系统消息删除成功！");
        this.selectColor = "#bbb";
        this.bool = false;
        this.loading = true;
        this.dataArr = [];
        this.page = 1;
        this.getNoticeList();
      });
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
</style>
