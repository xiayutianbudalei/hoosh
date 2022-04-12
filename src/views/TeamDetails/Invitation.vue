<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width:60px">
            <Back />
          </div>
        </template>
        <div class="text-center">邀请成员</div>
        <template v-slot:right>
          <div style="height: 100%; width:70px;">
            <!-- v-if="list.length" -->

            <mu-button flat color="#1BC6B8" @click="handleSelect">
              选择</mu-button
            >
          </div>
        </template>
      </mu-appbar>
    </template>

    <div class="flex flextow ztjz">
      <mu-text-field
        class="inputtext"
        solo
        full-width
        @change="change"
        v-model="key"
        placeholder="昵称"
        :action-icon="key ? 'close' : ''"
        :action-click="actionClick"
        ref="inputId"
      >
      </mu-text-field>
    </div>
    <mu-container class="mt-3">
      <mu-load-more
        class="mt-2"
        @load="load"
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        :loaded-all="loadedall"
      >
        <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
        <Invitationitem
          v-for="(item, index) in list"
          :key="index"
          :data="item"
          class="mb-2"
          :bool="bool"
          :registerid="registerid"
          @changeSel="changeSel"
        />
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
            <mu-button color="#1bc6b8" large @click="Lnvitemember"
              >发送邀请</mu-button
            >
          </div>
        </div>
      </footer>
    </template>
  </page>
</template>
<script>
import Invitationitem from "components/Invitationitem";
import { userforadd, Lnvitemember } from "api/subject";
import PlaceHolder from "components/PlaceHolder";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "Invitation",
  components: {
    PlaceHolder,
    Invitationitem,
    LoadAllTips
  },
  data() {
    return {
      item: {
        radio: false
      },
      bool: false,
      loadedall: false,
      isPlaceHolder: false,
      refreshing: true,
      loadAll: false,
      loading: false,
      list: [],
      total: 0,
      limit: 20,
      page: 1,
      key: "",
      power: 0,
      more: false,
      xzid: this.$route.query.id,
      registerid: this.$store.getters.user.id
    };
  },
  computed: {
    checkTotal: function() {
      let num = [];
      this.list.forEach(item => {
        if (item.checkVal) {
          num.push(1);
        }
      });
      return num.length;
    }
  },
  watch: {
    checkTotal(newVal) {
      if (newVal === this.list.length) {
        if (newVal <= 10) {
          this.item.radio = true;
        }
      } else {
        this.item.radio = false;
      }
    },
    "item.radio"(newVal) {
      if (newVal) {
        this.list.forEach(item => {
          item.checkVal = true;
        });
      } else {
        if (this.checkTotal === this.list.length) {
          this.list.forEach(item => {
            item.checkVal = false;
          });
        }
      }
    }
  },
  mounted() {
    this.infoFind();
  },
  methods: {
    changeSel(e) {
      let elm = e.selItem;
      let dataList = JSON.parse(JSON.stringify(this.list));
      dataList.forEach(item => {
        if (item.id == elm.id) {
          item.checkVal = elm.checkVal;
          return item;
        }
      });
      this.list = dataList;
    },
    handleSelect() {
      this.bool = !this.bool;
      if (this.bool) {
        this.$refs.page.init();
      }
    },
    infoFind() {
      let params = {
        id: this.xzid,
        page: this.page,
        limit: this.limit,
        key: this.key
      };
      userforadd(params)
        .then(res => {
          const { list, total } = res.data;
          list.forEach(item => {
            item.checkVal = false;
          });

          const mergeList = this.list.concat(list);
          this.page = ++this.page;
          this.total = total;
          this.list = mergeList;
          this.item.radio = this.checkTotal === mergeList.length;
          console.log(
            "已请求列表总数：",
            this.list.length,
            "可请求总数:",
            total
          );
          if (mergeList.length === total) {
            this.loadAll = true;
            this.loadedall = true;
            this.refreshing = false;
          }
          this.loading = false;
          this.refreshing = false;
        })
        .catch(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    Lnvitemember() {
      let dataList = JSON.parse(JSON.stringify(this.list));
      let list = [];
      dataList.forEach(item => {
        if (item.checkVal) {
          list.push(item.id);
        }
      });
      let params = {
        id: this.xzid,
        uid: list.toString()
      };
      Lnvitemember(params).then(() => {
        if (list.length > 0) {
          this.$toast.success("邀请消息已发送");
          this.bool = false;
          this.loading = true;
          this.page = 1;
          this.list = [];
          this.infoFind();
        } else {
          this.$toast.error("请选择");
        }
      });
      this.infoFind();
    },
    change() {
      this.loading = true;
      this.list = [];
      this.page = 1;
      this.infoFind();
    },
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.list = [];
      this.page = 1;

      this.infoFind();
    },
    load() {
      this.loading = true;

      this.infoFind();
    },
    actionClick() {
      this.list = [];
      this.page = 1;
      this.loading = true;
      this.key = "";
      this.infoFind();
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.flex {
  background-color: #f0f0f0;
}
.inputtext {
  background-color: #ffff;
  margin: 10px 15px;
  border-radius: 5px;
  font-size: 15px;
  height: 20px;
}
.flexItem ::v-deep .mu-text-field-input,
.flexItem ::v-deep .mu-input-icon {
  height: 20px;
}
.mu-input {
  min-height: 36px;
}
::v-deep .mu-text-field-input {
  text-align: center;
}
.one-more {
  background: #1bc6b8;
  height: 100%;
  line-height: 55px;
}
</style>
