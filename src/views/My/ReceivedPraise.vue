<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width:60px">
            <Back to="/mymessage" />
          </div>
        </template>
        <div class="text-center">收到的赞</div>
        <template v-slot:right>
          <div style="width: 60px;text-align:right">
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
        <ReceivedPraiseItem
          class="mt-3"
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
            <mu-button color="red" large @click="messageRemove">删除</mu-button>
          </div>
        </div>
      </footer>
    </template>
  </page>
</template>
<script>
import { messageReceivedlike, messageSetread, messageRemove } from "@/api/user";
import ReceivedPraiseItem from "components/ReceivedPraiseItem";
import PlaceHolder from "components/PlaceHolder";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "ReceivedPraise",
  components: {
    ReceivedPraiseItem,
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
      loadAll: false,
      token: this.$store.getters.token
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
    this.messageReceivedlike();
  },
  methods: {
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.dataArr = [];
      this.page = 1;
      this.messageReceivedlike();
    },
    load() {
      this.loading = true;
      this.messageReceivedlike();
    },
    messageReceivedlike() {
      let params = {
        page: this.page,
        limit: this.limit,
        token: this.token,
        target_type: "ask"
      };
      messageReceivedlike(params)
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
            messageSetread({ id: setReadArr });
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
      this.selectColor = "#bbb";
    },
    messageRemove() {
      let arrId = [];
      this.dataArr.map(item => {
        if (item.checkVal === true) {
          arrId.push(item.id);
        }
      });
      arrId = arrId.join(",");
      messageRemove({ id: arrId }).then(() => {
        this.$toast.success("点赞消息删除成功！");
        this.selectColor = "#bbb";
        this.bool = false;
        this.loading = true;
        this.dataArr = [];
        this.page = 1;
        this.messageReceivedlike();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.footer-vessel {
  border-top: 1px solid #ddd;
  background: #fff;
}
</style>
