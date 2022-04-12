<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0" class="asqwe">
        <template v-slot:left>
          <Back class="classIcon" Icon="1" />
        </template>
        <div class="teamdeta" v-show="headerFixed">
          {{ array.name }}
        </div>
        <template v-slot:right class="nav_flex">
          <mu-button
            flat
            :color="btnColor"
            class="flexde"
            @click="question(disable, array.id)"
          >
            +提问
          </mu-button>
          <mu-container>
            <mu-flex justify-content="center">
              <button @click.stop="openBotttomSheet" class="dianjishijian">
                <svg-icon icon-class="spot1" style="font-size: 50px;" />
                <!-- <mu-icon size="36" value="more_horiz" color="#fff"></mu-icon> -->
              </button>
            </mu-flex>
            <mu-bottom-sheet :open.sync="open" class="Cancebackgro">
              <mu-list @item-click="closeBottomSheet">
                <div class="bagruend asserds" v-if="hasecrol">
                  <mu-list-item button @click="groupQuits">
                    <mu-list-item-title class="mupaper">
                      退出小组
                    </mu-list-item-title>
                  </mu-list-item>
                </div>
                <div class="bagruend asserds" v-if="hasecrollswe">
                  <mu-list-item button @click="invitass(disable, array.id)">
                    <mu-list-item-title class="mupaper">
                      邀请成员
                    </mu-list-item-title>
                  </mu-list-item>
                  <mu-divider></mu-divider>
                  <mu-list-item
                    button
                    @click="
                      Createss(disable, array.id, array.name, array.intro)
                    "
                  >
                    <mu-list-item-title class="mupaper">
                      编辑信息
                    </mu-list-item-title>
                  </mu-list-item>
                  <mu-divider></mu-divider>
                  <mu-list-item button @click="group(disable)">
                    <mu-list-item-title class="mupaper">
                      {{ disable }}
                    </mu-list-item-title>
                  </mu-list-item>
                </div>
              </mu-list>
              <mu-list @item-click="closeBottomSheet">
                <div class="bagruend">
                  <mu-list-item button>
                    <mu-list-item-title class="mupaperss ">
                      取消
                    </mu-list-item-title>
                  </mu-list-item>
                </div>
              </mu-list>
            </mu-bottom-sheet>
          </mu-container>
        </template>
      </mu-appbar>
    </template>
    <div id="xiding" style="background-color: #00cccc; padding:0 10px">
      <div class="fontcol">
        {{ array.name }}
      </div>
      <div class="aswer">
        <span
          v-for="(item, index) in array.members"
          :key="index"
          @click="golink(array.id)"
        >
          <Avatar
            class="mr-2 wixi1"
            style="vertical-align: middle"
            size="mini"
            :name="item.user_abbr"
            :headIcon="item.user_headicon"
          />
        </span>
      </div>
      <div style="padding-bottom:13px">
        <mu-col span="12" class="mb-1">
          <div
            class="title_box show fazsai"
            ref="title_box"
            v-html="array.intro"
          ></div>
          <div v-if="array.intro" class="toggle-group fazsai">
            <svg-icon
              class="toggle_logo fazsai"
              icon-class="icon-lower"
              v-show="isNotShowBrief"
              @click="checkShowBrief()"
              style="font-size: 25px;"
            />

            <!-- <mu-icon
              class="toggle_logo fazsai"
              value="keyboard_arrow_down"
             
            ></mu-icon> -->
            <svg-icon
              class="toggle_logo fazsai"
              icon-class="icon-upper"
              v-show="!isNotShowBrief"
              @click="checkShowBrief()"
              style="font-size: 25px;"
            />
            <!-- <mu-icon
              class="toggle_logo fazsai"
              value="expand_less"
              v-show="!isNotShowBrief"
              @click="checkShowBrief()"
            ></mu-icon> -->
          </div>
        </mu-col>
      </div>
    </div>
    <div>
      <!-- @click="toearch" -->
      <div class="searchss">
        <p class="ml-3">问题列表</p>
        <div class="search-input" @click="toearchs(array.id)">
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
      </div>
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
        :loaded-all="loadAll"
      >
        <PlaceHolder v-if="isPlaceHolder">
          <div style="font-size: 16px">
            <span>{{ csder }}</span>
            <span style="color:#1bc6b8" @click="gotolick(array.id)">
              {{ dlcj }}
            </span>
          </div>
        </PlaceHolder>
        <TeamDetailsitem
          :array="arrid"
          v-for="(item, index) in list"
          :key="index"
          :data="item"
          class="mb-2 "
          :id="item.id"
        />
      </mu-load-more>
      <LoadAllTips v-if="!isPlaceHolder && loadAll" />
    </div>
  </page>
</template>

<script>
import {
  groupGet,
  rstList,
  groupClose,
  groupOpen,
  groupQuit,
} from 'api/subject';
import TeamDetailsitem from 'components/TeamDetailsitem';
import PlaceHolder from 'components/PlaceHolder';
import LoadAllTips from 'components/LoadAllTips';
export default {
  name: 'teamdetails', //小组详情
  components: {
    TeamDetailsitem,
    LoadAllTips,
    PlaceHolder,
  },
  data() {
    return {
      hasecrol: true,
      hasecrollswe: false,
      userid: this.$store.getters.user.id,
      groupid: '',
      disable: '禁用',
      disa: true,
      refreshing: false,
      loading: true,
      isPlaceHolder: false,
      loadAll: false,
      csder: '还没有内容，你可以',
      dlcj: '+发布问题',
      uid: this.$route.query.id,
      isNotShowBrief: true,
      btnColor: '#1bc6b8',
      headerFixed: false,
      open: false,
      array: [],
      limit: 20,
      page: 1,
      list: [],
      type: 'ask',
      arrid: '',
    };
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.groupGet();
    this.rstList();
  },
  methods: {
    groupGet() {
      let params = {
        id: this.uid,
      };
      groupGet(params).then(res => {
        this.array = res.data;
        this.groupid = res.data.user_id;
        this.arrid = res.data.id;
        if (this.groupid == this.userid) {
          this.hasecrol = false;
          this.hasecrollswe = true;
        } else {
          this.hasecrol = true;
          this.hasecrollswe = false;
        }
        if (this.array.banned == 1) {
          this.disa = false;
          this.disable = '解禁';
        } else {
          this.disa = true;
          this.disable = '禁用';
        }
      });
    },

    rstList() {
      let params = {
        page: this.page,
        limit: this.limit,
        type: this.type,
        group_id: this.uid,
        icon: 1,
        parent: 1,
        order: 'time',
      };
      rstList(params)
        .then(res => {
          const { list, total } = res.data;
          const mergeList = this.list.concat(list);
          ++this.page;
          this.total = total;
          this.list = mergeList;
          this.isPlaceHolder = mergeList.length === 0;
          console.log(
            '已请求列表总数：',
            mergeList.length,
            '可请求总数:',
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
    group(elm) {
      if (elm == '禁用') {
        this.groupClose();
      } else {
        this.groupOpen();
      }
    },

    groupQuits() {
      this.$confirm(
        '退出后，不能进行任何操作，也无法查看历史信息，请确认是否继续操作？',
        '警告',
        {
          type: 'warning',
        }
      ).then(({ result }) => {
        if (result) {
          let params = {
            id: this.uid,
          };
          groupQuit(params).then(() => {
            this.$toast.success('退出成功');
            this.groupGet();
            this.rstList();
          });
          this.$router.push({ path: '/MyTeam' });
        } else {
          this.$toast.error('已取消');
        }
      });
    },

    groupClose() {
      let params = {
        id: this.uid,
      };
      this.$confirm(
        '禁用后，不能进行任何操作，只可查看历史信息，请确认是否继续操作？',
        '警告',
        {
          type: 'warning',
        }
      ).then(({ result }) => {
        if (result) {
          this.disa = !this.disa;
          groupClose(params).then(() => {
            this.$toast.success('禁用成功');
            this.disable = '解禁';
          });
        } else {
          this.$toast.error('已取消');
        }
      });
    },

    groupOpen() {
      let params = {
        id: this.uid,
      };
      this.disa = !this.disa;
      this.disable = '禁用';
      groupOpen(params).then(() => {
        this.$toast.success('已解禁');
      });
    },
    question(elm, e) {
      if (elm == '禁用') {
        this.gotolick(e);
      } else {
        this.aswewwe();
      }
    },

    aswewwe() {
      this.$alert('小组已被禁用，不可操作', '提示');
    },
    golink(e) {
      this.$router.push({
        path: 'MemberList',
        query: { id: e },
      });
    },
    CreateAgroup(e, b, d) {
      this.$router.replace({
        path: 'CreateAgroup',
        query: { id: e, name: b, intro: d },
      });
    },
    Createss(elm, e, b, d) {
      if (elm == '禁用') {
        this.CreateAgroup(e, b, d);
      } else {
        this.aswewwe();
      }
    },
    invitass(elm, e) {
      if (elm == '禁用') {
        this.invitation(e);
      } else {
        this.aswewwe();
      }
    },
    invitation(e) {
      this.$router.push({
        path: 'invitation',
        query: { id: e },
      });
    },
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.list = [];
      this.page = 1;
      this.rstList();
    },
    load() {
      this.loadAll = false;
      this.loading = true;
      this.rstList();
    },
    gotolick(e) {
      this.$router.push({ path: '/fillQuestion', query: { group_id: e } });
    },
    toearchs(e) {
      this.$router.push({
        path: 'Search',
        query: { group_id: e },
      });
    },

    checkShowBrief() {
      if (this.isNotShowBrief) {
        this.$refs['title_box'].classList.remove('show');
      } else {
        this.$refs['title_box'].classList.add('show');
      }

      this.isNotShowBrief = !this.isNotShowBrief;
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 判断页面滚动的距离是否大于吸顶元素的位置
      if (scrollTop > 30) {
        this.headerFixed = true;
      } else {
        this.headerFixed = false;
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  },
};
</script>

<style lang="scss" scoped>
.mu-appbar {
  background-color: #00cccc;
}
.mu-list {
  padding: 2px 0px !important;
}
.search-input {
  background: #ffffff;
  width: 120px;
  height: 36px;
  line-height: 36px;
  border-radius: 20px;
  text-align: center;
  font-size: 13px;
  color: #999;
  margin-top: 5px;
  margin-right: 10px;
}
.searchss {
  display: flex;
  justify-content: space-between;
}
.teamdeta {
  color: #fff;
  width: 80%;
  font-size: 14px;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flexde {
  background-color: #fff;
  height: 50%;
  font-size: 12px;
  border-radius: 5px;
}
.fazsai {
  color: #fff;
  font-size: 14px;
}
.fontcol {
  padding: 7px 0;
  margin-left: 5px;
  color: #fff;
  font-size: 16px;
}
.wixi1 {
  margin-left: -15px;
}

.aswer {
  display: flex;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 7px;
}
.mu-raised-button {
  background-color: #fafafa;
  box-shadow: 0 0 0 0;
  -webkit-box-shadow: 0 0 0 0;
}
.dianjishijian {
  background-color: transparent;
  min-width: 36px;
  border: none;
}
.Cancebackgro {
  background-color: transparent;
}
.bagruend {
  background-color: #ffffff;
  margin: 0 10px;
  padding: 0 5px;
  border-radius: 5px;
}
.mupaper {
  height: 100%;
  line-height: 48px;
}
.mupaperss {
  height: 100%;
  line-height: 48px;
  border-radius: 5px;
}
.mu-item-title {
  height: 100%;
  text-align: center;
}
.container {
  padding: 0;
}

.title_box {
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 15px;
  img {
    max-width: 100%;
  }
}
.classIcon {
  width: 50px;
  height: 50px;
}
.show {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  max-height: 40px;
}
.toggle-group {
  text-align: right;
  position: absolute;
  bottom: -20px;
  right: -5px;
}
.toggle_logo {
  font-size: 40px;
  width: 40px;
}
hr {
  margin: 0;
  padding: 0;
}
</style>
