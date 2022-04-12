<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <div class="flex flextow">
          <mu-text-field
            class="inputtext"
            solo
            full-width
            @change="change"
            v-model="key"
            icon="search"
            placeholder="关键字"
            :action-icon="key ? 'close' : ''"
            :action-click="actionClick"
            ref="inputId"
          >
          </mu-text-field>
          <mu-button @click="goBacks" flat style="padding: 10px 0"
            >取消</mu-button
          >
        </div>
      </mu-appbar>

      <mu-tabs
        color="#fff"
        :value.sync="active"
        full-width
        indicator-color="#1BC6B8"
        class="bagurous"
        @change="asewsw"
      >
        <mu-tab value="all" style=" border-right: #f2f2f2 1px solid;"
          >全部</mu-tab
        >
        <mu-tab value="title" style=" border-right: #f2f2f2 1px solid;"
          >问题</mu-tab
        >
        <mu-tab value="tag">标签</mu-tab>
      </mu-tabs>
    </template>
    <mu-container class="mt-3">
      <div v-if="active === 'all'">
        <mu-load-more
          class="mt-2"
          @refresh="refresh"
          :refreshing="refreshing"
          :loading="loading"
          @load="load"
          :loaded-all="loadedAll"
        >
          <SearchItem
            v-for="(item, index) in list"
            :key="index"
            :data="item"
            class="mb-2"
          />
          <div v-if="isPlaceHolder">
            <PlaceHolder v-if="list.length == 0" message="暂无数据" />
          </div>
          <LoadAllTips v-if="list.length != 0 && loadAll" />
        </mu-load-more>
      </div>
      <div v-if="active === 'title'">
        <mu-load-more
          class="mt-2"
          @refresh="refresh"
          :refreshing="refreshing"
          :loading="loading"
          @load="load"
          :loaded-all="loadedAll"
        >
          <SearchItem
            v-for="(item, index) in list"
            :key="index"
            :data="item"
            class="mb-2"
          />
          <div v-if="isPlaceHolder">
            <PlaceHolder v-if="list.length == 0" message="暂无数据" />
          </div>
          <LoadAllTips v-if="list.length != 0 && loadAll" />
        </mu-load-more>
      </div>
      <div v-if="active === 'tag'">
        <mu-load-more
          class="mt-2"
          @refresh="refresh"
          :refreshing="refreshing"
          :loading="loading"
          @load="load"
          :loaded-all="loadedAll"
        >
          <div v-if="list">
            <SearchItem
              v-for="(item, index) in list"
              :key="index"
              :data="item"
              class="mb-2"
            />
          </div>
          <div v-if="isPlaceHolder">
            <PlaceHolder v-if="list.length == 0" message="暂无数据" />
          </div>
          <LoadAllTips v-if="list.length != 0 && loadAll" />
        </mu-load-more>
      </div>
    </mu-container>
  </page>
</template>
<script>
import SearchItem from "components/SearchItem";
import { askFind } from "api/subject";
import PlaceHolder from "components/PlaceHolder";
import LoadAllTips from "components/LoadAllTips";
export default {
  name: "Search",
  components: {
    PlaceHolder,
    SearchItem,
    LoadAllTips
  },
  data() {
    return {
      loadedAll: false,
      refreshing: false,
      loadAll: true,
      loading: false,
      list: [],
      total: 0,
      limit: 20,
      group_id: 0,
      page: 1,
      key: "",
      active: "all",
      isPlaceHolder: true
    };
  },
  mounted() {
    this.group_id = this.$route.query.group_id ? this.$route.query.group_id : 0;
    this.$refs.inputId.focus();
  },
  methods: {
    asewsw() {
      if (this.key == "") {
        this.$refs.inputId.focus();
      } else {
        this.isPlaceHolder = false;
        this.refreshing = true;
        this.list = [];
        this.page = 1;
        this.askFind();
        this.refreshing = false;
      }
    },
    refresh() {
      if (this.list.length == !0) {
        this.refreshing = true;
        this.loadAll = false;
        this.reset();
      }
    },
    load() {
      this.loading = true;
      this.askFind();
    },
    askFind() {
      let params = {
        page: this.page,
        limit: this.limit,
        key: this.key,
        type: "ask",
        group_id: this.group_id,
        keytype: this.active
      };
      askFind(params)
        .then(res => {
          const { list, total } = res.data;
          const mergeList = this.list.concat(list);
          this.page = ++this.page;
          this.total = total;
          this.list = mergeList;
          this.list.map(item => {
            item.searchValue = String(this.key);
            return;
          });
          console.log(
            "已请求列表总数：",
            this.list.length,
            "可请求总数:",
            total
          );

          if (mergeList.length == total && total != 0) {
            this.loadAll = true;
            this.loadedAll = true;
          }
          if (mergeList.length == 0 && total == 0) {
            this.isPlaceHolder = true;
          }
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    reset() {
      this.list = [];
      this.page = 1;
      this.askFind();
    },
    change() {
      if (!this.key) {
        this.isPlaceHolder = true;
        this.list = [];
      } else {
        // window.sessionStorage.setItem("key", this.key);
        this.loading = true;
        this.reset();
      }
    },
    actionClick() {
      this.isPlaceHolder = true;
      this.list = [];
      this.loading = false;
      this.key = "";
    },
    goBacks() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.flexItem ::v-deep .mu-text-field-input,
.flexItem ::v-deep .mu-input-icon {
  height: 36px;
}
.inputtext {
  background-color: #ffff;
  color: #000;
  border-radius: 20px;
  line-height: 36px;
  font-size: 13px;
  height: 36px;
}
.mu-input {
  min-height: 36px;
}

::v-deep .mu-input.is-solo .mu-input-icon {
  top: 0.5rem;
}
::v-deep .mu-input-action-icon {
  padding: 0 0.6rem;
  margin: 10px;
}
.mu-tab {
  color: #9999;
}
.mu-tab-active {
  color: #1bc6b8;
}
.bagurous {
  border-top: #d7d7d7 1px solid;
  border-bottom: #f2f2f2 1px solid;
}
</style>
