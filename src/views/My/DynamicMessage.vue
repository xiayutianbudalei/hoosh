<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width:60px">
            <Back />
          </div>
        </template>
        <div class="text-center">动态消息</div>
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
        <DynamicMessageItem
          class="mb-3"
          v-for="(item, index) in dataArr"
          :key="item.id"
          @checkChange="itemCheckChange"
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
            <mu-button color="red" large @click="messageRemove">删除</mu-button>
          </div>
        </div>
      </footer>
    </template>
  </page>
</template>
<script>
import { messageReceivedevent, messageRemove, messageSetread } from "api/user";
import DynamicMessageItem from "components/DynamicMessageItem";
import PlaceHolder from "components/PlaceHolder";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "DynamicMessage",
  components: {
    DynamicMessageItem,
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
      limit: 10,
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
    this.loading = true;
    this.messageReceivedevent();
  },
  methods: {
    handleSelect() {
      this.dataArr.forEach(item => {
        item.checkVal = false;
      });
      this.bool = !this.bool;
      if (this.bool) {
        this.selectColor = "red";
        return;
      }
      this.selectColor = "#bbb";
    },
    // 子组件选择返回
    itemCheckChange(bool, index) {
      this.dataArr[index].checkVal = bool;
    },
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.dataArr = [];
      this.page = 1;
      this.messageReceivedevent();
    },
    load() {
      this.loading = true;
      this.messageReceivedevent();
    },
    messageReceivedevent() {
      let params = {
        page: this.page,
        limit: this.limit
      };
      messageReceivedevent(params)
        .then(res => {
          const { list, total } = res.data;
          console.log(res.data);
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
          console.log(
            "已请求列表总数：",
            mergeList.length,
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
    messageRemove() {
      let arrId = [];
      this.dataArr.map(item => {
        if (item.checkVal === true) {
          arrId.push(item.id);
        }
      });

      if (arrId.length > 0) {
        arrId = arrId.join(",");
        messageRemove({ id: arrId }).then(() => {
          this.$toast.success("动态消息删除成功！");
          this.bool = false;
          this.item.radio = false;
          this.loading = true;
          this.dataArr = [];
          this.page = 1;
          this.messageReceivedevent();
          this.selectColor = "#bbb";
        });
      } else {
        this.$toast.error("请选择要删除数据");
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
</style>
