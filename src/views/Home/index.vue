<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0" style="background: #fff">
        <div class="search-input" @click="toearch">
          <svg-icon
            icon-class="search"
            style="font-size: 25px;vertical-align: middle;"
          />
          <!-- <mu-icon
            size="20"
            style="vertical-align: middle;"
            value="search"
          ></mu-icon> -->
          &nbsp;请输入关键字
        </div>
      </mu-appbar>
      <mu-tabs
        :value.sync="active"
        color="#f3f3f3"
        indicator-color="#000000"
        class="tabtass"
      >
        <mu-tab style="margin-left:10px;width: 36px;">问题</mu-tab>
        <mu-tab style="width: 36px;">小组</mu-tab>
      </mu-tabs>
    </template>
    <mu-container
      data-mu-loading-color="#2196f3"
      data-mu-loading-overlay-color="rgba(0, 0, 0, 0.01)"
      v-loading="loading2"
    >
      <div v-if="active === 0">
        <mu-load-more
          @refresh="refreshIndex"
          :refreshing="indexlists.refreshing"
          :loading="indexlists.loading"
          @load="load"
          :loaded-all="indexlists.loadAll"
        >
          <PlaceHolder v-if="indexlists.isPlaceHolder" message="暂无数据" />
          <template v-if="indexlists.arr.length > 0">
            <HomeItem
              v-for="(item, index) in indexlists.arr"
              :key="index"
              :data="item"
              class="mb-2"
              :id="item.id"
            />
          </template>
        </mu-load-more>
      </div>
      <div v-if="active === 1">
        <div class="tema">
          <span>我的问答小组</span>
          <span style="color:#999 " @click="golink">全部 ></span>
        </div>
        <mu-load-more
          @refresh="refreshJion"
          :refreshing="jionWithaskPage.refreshing"
          :loading="jionWithaskPage.loading"
          @load="load"
          :loaded-all="jionWithaskPage.loadAll"
        >
          <div v-if="!jionWithaskPage.total">
            <PlaceHolder>
              <div>
                <span>您还没有小组，赶快来</span>
                <span>
                  <router-link
                    style="color:#1bc6b8"
                    :to="{ name: 'CreateAgroup' }"
                  >
                    创建
                  </router-link>
                </span>
              </div>
            </PlaceHolder>
          </div>
          <template v-if="jionWithaskPage.arr.length > 0">
            <HomeTeam
              v-for="(item, index) in jionWithaskPage.arr"
              :key="index"
              :data="item"
              :id="item.id"
              class="mt-1"
            />
          </template>
        </mu-load-more>
      </div>
      <LoadAllTips
        v-if="!jionWithaskPage.isPlaceHolder && jionWithaskPage.loadAll"
      />
    </mu-container>
    <template #footer>
      <BottomNav />
    </template>
  </page>
</template>
<script>
import wenHa from 'assets/images/wen-ha.png';
import HomeItem from 'components/HomeItem';
import HomeTeam from 'components/HomeTeam';
import { indexList, jionWithask } from 'api/subject';
import PlaceHolder from 'components/PlaceHolder';
import BottomNav from 'components/BottomNav';
import LoadAllTips from 'components/LoadAllTips';
export default {
  name: 'Home',
  components: {
    HomeItem,
    HomeTeam,
    PlaceHolder,
    BottomNav,
    LoadAllTips,
  },
  data() {
    return {
      loading2: true,
      csder: '',
      dlcj: '',
      wenHa,
      indexlists: {
        isPlaceHolder: false,
        loadAll: false,
        refreshing: false,
        loading: false,
        arr: [],
        total: 0,
        limit: 20,
        page: 1,
      },
      group_id: 0,
      jionWithaskPage: {
        isPlaceHolder: false,
        loadAll: false,
        refreshing: false,
        loading: false,
        total: 0,
        limit: 20,
        arr: [],
        page: 1,
      },

      active: 0,
    };
  },
  mounted() {
    this.indexList();
    this.jionWithask();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'FillQuestion') {
        vm.loading = true;
        vm.loadAll = false;
        vm.list = [];
        vm.lists = [];
        vm.page = 1;
        vm.indexList();
        vm.jionWithask();
      }
    });
  },
  methods: {
    load() {
      if (this.active == 0) {
        if (this.indexlists.loadAll) {
          return;
        }
        this.loadIndex();
      } else {
        if (this.jionWithaskPage.loadAll) {
          return;
        }
        this.loadJion();
      }
    },
    indexList() {
      const { page, limit, arr } = this.indexlists;
      let params = {
        page,
        limit,
        group_id: this.group_id,
      };

      indexList(params)
        .then(res => {
          const { list, total } = res.data;
          const mergeList = arr.concat(list);
          this.indexlists.page = ++this.indexlists.page;
          this.indexlists.total = total;
          this.indexlists.arr = mergeList;
          this.indexlists.isPlaceHolder = mergeList.length === 0;
          console.log(
            '已请求列表总数：',
            this.indexlists.arr.length,
            '可请求总数:',
            total
          );
          if (mergeList.length === total) {
            this.indexlists.loadAll = true;
          }
          this.loading2 = false;
        })
        .finally(() => {
          this.indexlists.loading = false;
          this.indexlists.refreshing = false;
        });
    },
    jionWithask() {
      const { page, limit, arr } = this.jionWithaskPage;
      let params = {
        page: page,
        limit: limit,
      };
      jionWithask(params)
        .then(res => {
          const { list, total } = res.data;
          const mergeList = arr.concat(list);
          this.jionWithaskPage.page = ++this.jionWithaskPage.page;
          this.jionWithaskPage.total = total;
          this.jionWithaskPage.arr = mergeList;
          this.jionWithaskPage.isPlaceHolder = mergeList.length === 0;
          console.log(
            '已请求小组列表总数：',
            this.jionWithaskPage.arr.length,
            '可请求小组总数:',
            total
          );
          if (mergeList.length === total) {
            this.jionWithaskPage.loadAll = true;
          }
        })
        .finally(() => {
          this.jionWithaskPage.loading = false;
          this.jionWithaskPage.refreshing = false;
        });
    },
    refreshIndex() {
      this.indexlists.refreshing = true;
      this.indexlists.loadAll = false;
      this.indexlists.arr = [];
      this.indexlists.page = 1;
      this.indexList();
    },
    refreshJion() {
      this.jionWithaskPage.refreshing = true;
      this.jionWithaskPage.loadAll = false;
      this.jionWithaskPage.arr = [];
      this.jionWithaskPage.page = 1;
      this.jionWithask();
    },
    loadIndex() {
      this.indexlists.loadAll = false;
      if (!this.indexlists.loading) {
        this.indexlists.loading = true;
        this.indexList();
      }
    },
    loadJion() {
      this.jionWithaskPage.loadAll = false;
      if (!this.jionWithaskPage.loading) {
        this.jionWithaskPage.loading = true;
        this.jionWithask();
      }
    },

    // gotolinks() {
    //   if () {
    //     this.$router.push({ path: "/createAgroup" });
    //   } else {
    //     this.$router.push({ path: "/login" });
    //   }
    // },
    golink() {
      this.$router.push({ path: '/MyTeam' });
    },
    toearch() {
      this.$router.push({
        name: 'Search',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.search-input {
  background: #f3f3f3;
  height: 36px;
  line-height: 36px;
  border-radius: 20px;
  text-align: center;
  font-size: 13px;
  color: #999;
}
.mu-tab {
  color: #737373;
}
.mu-tab-active {
  color: #000;
  font-weight: bold;
}
.tabtass {
  height: 35px;
  border-top: #fff 1px solid;
}
.tema {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  padding: 0 15px;
}
</style>
