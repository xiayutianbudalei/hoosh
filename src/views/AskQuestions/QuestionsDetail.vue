<template>
  <page style="background-color: #fff;">
    <template #header style="background-color: #fff;">
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back class="classIcon" v-if="!queryShow" />
          <Back class="classIcon" to="/Home" v-if="queryShow" />
        </template>
        <div class="teamd text-center" @click="gotolicks(groups.id)">
          <span v-if="namesw">
            {{ groups.name }}
          </span>
        </div>
        <template v-slot:right>
          <div class="nav_flex">
            <!--
              旧版本的样式
               <router-link
              class="mr-5"
              v-if="questionData.creator.id === curUserId ? true : false"

              :to="{ name: 'FillQuestion', params: { id: id } }"
              >
              <mu-icon value="help_outline" color="#000"></mu-icon
            >
            
            </router-link>
            <mu-icon
              class="mr-5 dspie"
              :value="
                questionData.hide_flag === 1 ? 'lock_filled' : 'lock_outline'
              "
              v-if="questionData.creator.id === curUserId ? true : false"
              @click="setStatus"
            ></mu-icon>
            <mu-icon
              value="share"
              class="shareBtn mr-4"
              @click="copyUrl"
            ></mu-icon> -->
            <mu-container>
              <mu-flex justify-content="center">
                <button @click="openBotttomSheet" class="dianjishijian">
                  <svg-icon icon-class="spot2" style="font-size: 50px;" />
                  <!-- <mu-icon
                    size="36"
                    value="more_horiz"
                    color="#999"
                    class="suobianju
                  "
                  ></mu-icon> -->
                </button>
              </mu-flex>
              <mu-bottom-sheet :open.sync="open" class="Cancebackgro">
                <mu-list @item-click="closeBottomSheet">
                  <div class="bagruend">
                    <mu-list-item
                      button
                      @click="
                        golises(
                          groups.banned,
                          id,
                          groups.id,
                          questionData.title
                        )
                      "
                      v-if="
                        questionData.creator.id === curUserId ? true : false
                      "
                    >
                      <mu-list-item-title class="mupaper">
                        重新提问
                      </mu-list-item-title>
                    </mu-list-item>
                    <mu-divider
                      style="background-color:#F6F6F6;"
                      v-if="
                        questionData.creator.id === curUserId ? true : false
                      "
                    ></mu-divider>

                    <mu-list-item button v-if="groupHiding" @click="setStatus">
                      <mu-list-item-title
                        class="mupaper"
                        v-html="PublicAndPrivate"
                      ></mu-list-item-title>
                    </mu-list-item>
                    <mu-divider
                      style="background-color:#F6F6F6;"
                      v-if="
                        questionData.creator.id === curUserId ? true : false
                      "
                    ></mu-divider>
                    <mu-list-item button @click="copyUrl">
                      <mu-list-item-title class="mupaper">
                        分享
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
          </div>
        </template>
      </mu-appbar>
    </template>
    <mu-container>
      <mu-row gutter style=" background-color: #fff;">
        <mu-col span="12" class="all_ques_text" v-if="questionData.version > 1">
          <router-link :to="{ name: 'AllQuestions', params: { id: id } }">
            全部提问 ({{ questionData.version }}) >>
          </router-link>
        </mu-col>
        <mu-col span="12" class="grid-cell-1">
          <mu-badge
            :content="
              questionData.sub_type === 'why'
                ? '为什么'
                : questionData.sub_type === 'what'
                ? '是什么'
                : questionData.sub_type === 'how'
                ? '怎么办'
                : '怎么看'
            "
            color="primary"
          ></mu-badge>
          <span class="text">{{ questionData.mtime | filter(16) }}</span>
          <div class="avatar_group ml-5">
            <span @click.stop="gotolink(questionData.creator.id)">
              <Avatar
                size="mini"
                :name="
                  questionData.creator ? questionData.creator.user_abbr : ''
                "
                :bgColor="
                  questionData.creator
                    ? questionData.creator.user_backcolor
                    : ''
                "
                :headIcon="
                  questionData.creator ? questionData.creator.user_headicon : ''
                "
              />
            </span>
            <span class="text ellipsis-line1" style="max-width: 70px">
              {{ author }}
            </span>
          </div>
        </mu-col>
        <mu-col span="12" class="mb-1">
          <p style="font-size: 18px" ref="content-title">
            {{ questionData.title }}
          </p>
          <div
            class="title_box show"
            ref="title_box"
            v-html="questionData.content"
          ></div>
          <div v-if="questionData.content" class="toggle-group">
            <mu-icon
              class="toggle_logo"
              value="keyboard_arrow_down"
              v-show="isNotShowBrief"
              @click="checkShowBrief()"
            ></mu-icon>

            <mu-icon
              class="toggle_logo"
              value="expand_less"
              v-show="!isNotShowBrief"
              @click="checkShowBrief()"
            ></mu-icon>
          </div>
        </mu-col>
        <mu-col span="12" class="pr-5 mb-1">
          <LabelList class="mb-3" :list="chipList" :groupid="groups.id" />
        </mu-col>
      </mu-row>
      <div>
        <!-- style=" padding: 2px 0px; background-color:rgb(242, 242, 242)" -->
        <mu-divider
          style=" padding: 2px 0px; background-color:rgb(242, 242, 242)"
        ></mu-divider>
      </div>

      <!-- 具体内容 -->
      <div v-if="noData" style="text-align: center">
        <PlaceHolder type="3" message="暂无内容" />
      </div>
      <div v-else style="background-color:#fff">
        <mu-row class="flex mt-2 mb-2 ">
          <div class="flexItem">
            <mu-button flat class="all data_active" @click="toggleDataRe(0)">
              全部
            </mu-button>
            <mu-button flat class="justlook" @click="toggleDataRe(1)">
              只看[多问一句]
            </mu-button>
          </div>
          <div class="set_menu">
            <div>
              <div class="moren active" ref="moren" @click="toggleSortMode(0)">
                默认
              </div>
              <div class="zuixin" ref="zuixin" @click="toggleSortMode(1)">
                最新
              </div>
            </div>
          </div>
        </mu-row>
        <div>
          <mu-divider style="background-color:#F6F6F6;"></mu-divider>
        </div>

        <div>
          <mu-load-more
            :refreshing="refreshing"
            :loading="loading"
            @load="load"
            :loaded-all="loadAll"
          >
            <div v-for="item in dataList" :key="item.index">
              <NormalOnemore
                @clickOnemore="handleClickOneMore"
                :data="item"
                ref="Expandmore"
              >
                <button
                  class="mores"
                  slot-scope="ite"
                  @click="Child(item.id, ite.index)"
                >
                  展开更多
                </button>
              </NormalOnemore>
            </div>
            <div>
              <GetDesce
                v-for="(it, index) in dataThreeList"
                :key="index"
                @clickreply="handleClickOneMore"
                @updaase="updates"
                :data="it"
              />
            </div>
            <!-- <div v-for="item in threeList" :key="item.index">
              <NormalAnswer v-if="item.type === 'answer'" :data="item" />
            </div> -->
          </mu-load-more>
          <LoadAllTips v-if="loadAll" />
        </div>
      </div>
    </mu-container>

    <!-- 回答弹出层 -->
    <EditAnswer
      :content="content"
      :onoff="showEditAnswer"
      :id="id"
      @hidetwoSheet="hidetwoSheet"
      @hidetwoSheetAndUpdata="hidetwoSheetAndUpdata"
    />
    <!-- 多问一句弹出层 -->
    <EditOnemore
      @hideoneSheet="hideoneSheet"
      @hideoneSheetAndUpdata="hideoneSheetAndUpdata"
      :passContent="passContent"
      :author="passAuthor ? passAuthor : author"
      :parameter="parameter"
      :onoffa="showEditOneMore"
      :id="passId ? passId : id"
    />
    <mu-dialog title="提示" width="360" :open.sync="dialogOnoff">
      {{ dialogContent }}
      <mu-button slot="actions" flat color="primary" @click="closeDialog">
        我知道了
      </mu-button>
    </mu-dialog>
    <template #footer>
      <mu-bottom-nav class="bottom-nav" v-if="noData">
        <div class="right" @click="createOnemore">多问一句</div>
      </mu-bottom-nav>
      <mu-bottom-nav class="bottom-nav" v-else>
        <div class="flexItem" @click="createAnswer">回答</div>
        <div class="flexItem one-more" @click="createOnemore">多问一句</div>
      </mu-bottom-nav>
    </template>
  </page>
</template>
<script>
import {
  groupMember,
  getContent,
  openQuestion,
  openSetpublic,
  closeQuestion,
  closeSetprotect,
  rstList,
  getDescendant,
} from 'api/subject';
import PlaceHolder from 'components/PlaceHolder';
// import OneMoreItem from "./components/OneMoreItem";
// import NormalAnswer from "./components/NormalAnswer";
import NormalOnemore from './components/NormalOnemore';
import GetDesce from './components/getDesce';
import EditOnemore from './components/EditOnemore';
import EditAnswer from './components/EditAnswer';
import ClipboardJS from 'clipboard';
import LabelList from 'components/LabelList';
import LoadAllTips from 'components/LoadAllTips';
import { passwordMd5 } from 'utils';
export default {
  name: 'QuestionsDetail', //提问详情
  components: {
    GetDesce,
    LabelList,
    // OneMoreItem,
    // NormalAnswer,
    NormalOnemore,
    EditOnemore,
    EditAnswer,
    LoadAllTips,
    PlaceHolder,
  },
  data() {
    return {
      xdrte: true,
      towxdrte: true,
      cunzai: false,
      namesw: false,
      btnColor: '#1bc6b8',
      headerFixed: false,
      groupHiding: false,
      open: false,
      noData: false, //控制开启提问（提问详情是否有数据）
      noOpen: false, //不含有多问一句时为true
      refreshing: false,
      loading: true,
      loadAll: true,
      id: this.$route.params.id,
      num: 10,
      questionData: {
        creator: {},
      },
      PublicAndPrivate: '设为公开',
      interface: {
        access_token: '',
        parent_id: this.$route.params.id,
        icon: 1,
        child: 1,
        total: 0,
        limit: 1000,
        page: 1,
        order: 'default',
      },
      // threeinterface: {
      //   access_token: "",
      //   parent_id: this.$route.params.id,
      //   icon: 1,
      //   total: 0,
      //   limit: 200,
      //   page: 1,
      //   type: "answer",
      //   order: "default"
      // },
      towinterface: {
        access_token: '',
        id: this.$route.params.id,
        icon: 1,
        total: 0,
        limit: 200,
        page: 1,
      },
      rstListes: '',
      membersList: [],
      arres: [],
      chipList: [],
      dataList: [],
      // threeList: [],
      dataThreeList: [],
      content: '',
      author: '昵称昵称11',
      parameter: 1,
      isNotShowBrief: true,
      showEditOneMore: false,
      showEditAnswer: false,
      dialogOnoff: false,
      dialogContent: '',
      passContent: '',
      passAuthor: '',
      passId: '',
      groups: '',
      asser: 0,
      queryShow: this.$route.params.share,
      indexid: null,
      toggleData: 0,
      toggleSortMo: 0,
      access_token: '',
      curUserId: this.$store.getters.user.id,
    };
  },
  beforeRouteEnter(to, from, next) {
    const { id, access_token, share } = to.params;
    const { name } = from;
    if (access_token && name != 'AccessCode') {
      next(vm => {
        vm.$router.push({
          name: 'AccessCode',
          query: {
            id: id,
            access_token: access_token,
            share: share,
          },
        });
      });
    } else {
      next(vm => {
        vm.access_token = access_token;
        vm.interface.access_token = access_token;
        // vm.threeinterface.access_token = access_token;
        vm.towinterface.access_token = access_token;
        vm.getBaseContent();
        vm.findAll();
      });
    }
  },

  watch: {
    dataList: function() {
      this.$nextTick(function() {
        this.dataRefreh();
      });
    },
  },
  //方法集合
  methods: {
    Child(el, index) {
      this.$refs.Expandmore[index].Childss(el);
    },
    dataRefreh() {
      if (this.indexid !== null) {
        return setTimeout(() => {
          console.log('刷新' + new Date());
          console.log(this.indexid);
        }, 5000);
      }
    },
    findAll(id) {
      Promise.all([
        this.rstList(),
        // this.rstListTwo(),
        this.getDescendant(),
      ]).then(() => {
        if (id != void 0) {
          this.$nextTick(() => {
            const { top } = document.getElementById(id).getBoundingClientRect();
            const wHeight = window.innerHeight || document.body.clientHeight;
            if (top > wHeight) {
              window.scrollTo(0, top - wHeight / 2);
            }
          });
        }
      });
    },
    rstList() {
      return rstList(this.interface).then(res => {
        const { list, total } = res.data;
        const mergeList = this.dataList.concat(list);
        mergeList.forEach((elm, ite) => {
          elm.page = this.interface.page;
          elm.ite = ite;
        });
        this.interface.page = ++this.interface.page;
        this.interface.total = total;
        this.dataList = mergeList;
        console.log(
          '已请求列表总数：',
          this.dataList.length,
          '可请求总数:',
          total
        );
        this.rstListes = total;
        if (mergeList.length === total) {
          this.loadAll = true;
        }
        if (total === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      });
    },
    // rstListTwo() {
    //   rstList(this.threeinterface).then(res => {
    //     const { list } = res.data;
    //     this.threeList = list;
    //     if (this.threeList.length === 0) {
    //       this.towxdrte = false;
    //     }
    //   });
    // },
    getDescendant() {
      return getDescendant(this.towinterface).then(res => {
        const { list, total } = res.data;
        const mergeList = this.dataThreeList.concat(list);
        mergeList.forEach((elm, ite) => {
          elm.page = this.towinterface.page;
          elm.ite = ite;
        });
        this.towinterface.total = total;
        this.dataThreeList = mergeList;
        console.log(
          '已请求列表总数：',
          this.dataThreeList.length,
          '可请求总数:',
          total
        );
        this.getDescendantas = total;
        if (this.dataThreeList.length === 0) {
          this.xdrte = false;
        }
        // if (mergeList.length === total) {
        //   this.loadAll = true;
        // }
      });
    },
    load() {
      if (this.rstListes !== this.dataList.length) {
        if (this.toggleData == 1) {
          this.loading = true;
          this.dataThreeList = [];
          this.threeList = [];
          this.rstList();
          this.getDescendant();
        } else {
          this.loading = true;
          this.dataThreeList = [];
          // this.threeList = [];
          this.findAll();
        }
        // this.rstListTwo();
        // this.getDescendant();
        // this.loading = false;
      } else {
        this.loading = false;
      }
    },
    getBaseContent() {
      let params = {
        id: this.id,
        icon: 1,
        access_token: this.access_token,
      };
      //问题详情问题本身接口
      getContent(params).then(res => {
        this.questionData = res.data;
        if (res.data.group == null) {
          this.namesw = false;
          this.cunzai = true;
          this.groupHiding =
            res.data.creator.id === this.curUserId ? true : false;
          this.PublicAndPrivate =
            res.data.hide_flag === 1 ? '设为公开' : '设为私有';
        } else {
          this.asser == 1;
          this.namesw = true;
          this.cunzai = false;
          this.groups = res.data.group;
          if (
            res.data.creator.id === this.curUserId ||
            res.data.group.id === this.curUserId
          ) {
            this.groupHiding = true;
          } else {
            this.groupHiding = false;
          }
          this.PublicAndPrivate =
            res.data.public === 0 ? '设为公开' : '取消公开';
          if (res.data.public === 0) {
            this.groupMember();
          } else {
            //...
          }
        }
        const { creator, tags, title } = res.data;
        this.content = title;
        this.author = creator.user_name;
        this.chipList = tags.split(',');
        //设置提问详情title
        // this.$set(this.$route.meta, this.questionData.title);
        // document.title = title;
        // this.$nextTick(async () => {
        //   var objs = document.querySelectorAll(".title_box img");
        //   for (var i = 0; i < objs.length; i++) {
        //     objs[i].setAttribute("preview", 1);
        //   }
        // });
        // this.$previewRefresh();
        // this.$nextTick(async () => {
        //   var objs = document
        //     .getElementsByClassName("grid-cell-2")[0]
        //     .getElementsByTagName("img");

        //   for (var i = 0; i < objs.length; i++) {
        //     objs[i].setAttribute("preview", 1);
        //   }
        //   await this.$previewRefresh();

        //   //js方式解决图片下拉问题
        //   try {
        //     let coverH = document.getElementsByClassName("self-img")[0]
        //       ? document.getElementsByClassName("self-img")[0].parentNode
        //       : (0).offsetHeight;
        //     let line1H = this.$refs["title_box"].children[0].offsetHeight;
        //     let boxH = this.$refs["title_box"].offsetHeight;
        //     if (coverH + line1H > boxH) {
        //       // console.log("jin");
        //       document.getElementsByClassName("toggle-group")[0].style.display =
        //         "inherit";
        //       this.isNotShowBrief = true;
        //     } else {
        //       document.getElementsByClassName("toggle-group")[0].style.display =
        //         "none";
        //     }
        //   } catch (error) {
        //     // var styles = window.getComputedStyle(this.$refs["title_box"], null);
        //     // var lh = parseInt(styles.lineHeight, 10);
        //     // var h = parseInt(styles.height, 10);
        //     // var lc = Math.round(h / lh);
        //     // console.log("line count:", lc, "line-height:", lh, "height:", h);
        //     if (this.questionData.content.length < 26) {
        //       document.getElementsByClassName("toggle-group")[0].style.display =
        //         "none";
        //     }
        //     // console.log("提问详情无图片");
        //     return;
        //   }
        //   if (this.$refs["title_box"].offsetHeight >= 20) {
        //     try {
        //       document.getElementsByClassName("toggle-group")[0].style.display =
        //         "inherit";
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   } else {
        //     try {
        //       document.getElementsByClassName("toggle-group")[0].style.display =
        //         "none";
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   }
        // });
      });
    },
    //查询小组成员
    groupMember() {
      let params = {
        page: 1,
        limit: 1000,
        id: this.groups.id,
      };
      groupMember(params).then(res => {
        const { list } = res.data;
        var twolist = list.filter(
          item => item.id == this.$store.getters.user.id
        );
        this.membersList = twolist;
        if (twolist.length > 0) {
          return true;
        } else {
          this.$toast.error('您非小组成员，暂不可访问');
          this.$router.replace('/');
        }
      });
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    golises(elm, e, d, b) {
      if (elm == 0) {
        this.gotolinkss(e, d, b);
      }
      if (this.asser == 0) {
        this.gotolinkss(e, d, b);
      } else {
        this.aswewwe();
      }
    },
    aswewwe() {
      this.$alert('小组已被禁用，不可操作', '提示');
    },
    gotolicks(e) {
      if (this.membersList.length > 0) {
        this.$router.push({ path: '/teamdetails', query: { id: e } });
      } else {
        this.$toast.error('您非小组成员，暂不可访问');
        return false;
      }
    },
    gotolinkss(e, d, b) {
      this.$router.replace({
        path: '/FillQuestion',
        query: { id: e, group_id: d, title: b },
      });
    },
    //复制url链接
    copyUrl(e) {
      const path = window.location.origin + window.location.pathname;
      const _this = this;
      const { hide_flag, title, access_token } = this.questionData;
      const inputCode = passwordMd5(access_token).substring(0, 6);
      var clipboard = new ClipboardJS(e.currentTarget, {
        text: function() {
          if (hide_flag === 1) {
            // hide_flag === 1  ==》 私有
            // share 表示分享页面
            return `${title}：${path}/6b80/${access_token}\n访问码:${inputCode}`;
          } else {
            //hide_flag === 0  ==》 公开
            return `${title}：${path}/6b80`;
          }
        },
      });

      clipboard.on('success', function() {
        _this.dialogContent = '已复制分享链接，请至社交平台粘贴';
        _this.dialogOnoff = true;
        clipboard.destroy();
      });
      clipboard.on('error', function() {
        clipboard.destroy();
        // console.log("fail");
      });
      e.currentTarget.click(); //解决clipboard二次点击生效问题
    },
    //关闭dialog
    closeDialog() {
      this.dialogOnoff = false;
    },
    //设置私有/公开
    setStatus() {
      if (this.questionData.group == null) {
        //0 =公开 ，1=私有
        if (this.questionData.hide_flag === 0) {
          closeQuestion({ id: this.id })
            .then(() => {
              this.dialogContent = '该提问已设置私有';
              this.dialogOnoff = true;
            })
            .finally(() => {
              this.getBaseContent();
            });
        } else {
          openQuestion({ id: this.id })
            .then(() => {
              this.dialogContent = '该提问已设置公开';
              this.dialogOnoff = true;
            })
            .finally(() => {
              this.getBaseContent();
            });
        }
      } else {
        //0=组内私有， 1=组内公开
        if (this.questionData.public === 0) {
          openSetpublic({ id: this.id })
            .then(() => {
              this.dialogContent = '该提问已设置为公开';
              this.dialogOnoff = true;
            })
            .finally(() => {
              this.getBaseContent();
            });
        } else {
          closeSetprotect({ id: this.id })
            .then(() => {
              this.dialogContent = '该提问已设置为组内私有';
              this.dialogOnoff = true;
            })
            .finally(() => {
              this.getBaseContent();
            });
        }
      }
    },
    createOnemore() {
      if (!this.$store.getters.token) {
        this.$router.push('/login');
        return;
      }
      this.parameter = 1;
      this.passContent = this.content;
      this.passId = this.id;
      this.showEditOneMore = true;
    },
    createAnswer() {
      if (!this.$store.getters.token) {
        this.$router.push('/login');
        return;
      }
      this.showEditAnswer = true;
    },
    handleClickOneMore(el) {
      if (!this.$store.getters.token) {
        this.$router.push('/login');
        return;
      }
      this.passContent = el.brief;
      this.passAuthor = el.user_name;
      this.passId = el.id;
      this.parameter = 2;
      this.showEditOneMore = true;
    },
    checkShowBrief() {
      if (this.isNotShowBrief) {
        this.$refs['title_box'].classList.remove('show');
      } else {
        this.$refs['title_box'].classList.add('show');
      }

      this.isNotShowBrief = !this.isNotShowBrief;
    },
    hideoneSheet() {
      this.showEditOneMore = false;
    },
    hideoneSheetAndUpdata(el) {
      this.indexid = el;
      this.showEditOneMore = false;
      // this.interface.page = this.interface.page;
      this.interface.page = 1;
      // this.interface.limit = 200;
      this.dataList = [];
      this.dataThreeList = [];
      // this.threeList = [];
      this.findAll(el);
    },
    hidetwoSheet() {
      this.showEditAnswer = false;
    },
    hidetwoSheetAndUpdata(el) {
      this.showEditAnswer = false;
      // this.interface.page = this.interface.page;
      this.interface.page = 1;
      // this.interface.limit = 200;
      this.dataList = [];
      this.dataThreeList = [];
      // this.threeList = [];
      this.findAll(el);
    },
    toggleSortMode(status) {
      this.toggleSortMo = status;
      if (status === 0) {
        this.$refs.moren.classList.add('active');
        this.$refs.zuixin.classList.remove('active');
        this.interface.order = 'default';
        this.interface.page = 1;
        this.interface.limit = 1000;
        // this.threeinterface.order = "default";
        this.loadAll = false;
        if (this.toggleData == 0) {
          this.dataList = [];
          this.dataThreeList = [];
          // this.threeList = [];
          this.findAll();
          this.loadAll = false;
        } else {
          this.dataList = [];
          this.dataThreeList = [];
          // this.threeList = [];
          this.rstList();
          this.getDescendant();
          this.loadAll = false;
        }

        this.loading = false;
      } else {
        this.$refs.zuixin.classList.add('active');
        this.$refs.moren.classList.remove('active');
        this.interface.order = 'time';
        this.interface.page = 1;
        this.interface.limit = 1000;
        // this.threeinterface.order = "time";
        this.loadAll = false;

        if (this.toggleData == 0) {
          this.dataList = [];
          this.dataThreeList = [];
          // this.threeList = [];
          this.findAll();
          this.loadAll = false;
        } else {
          this.dataList = [];
          this.dataThreeList = [];
          // this.threeList = [];
          this.rstList();
          this.getDescendant();
          this.loadAll = false;
        }
        this.loading = false;
      }
    },
    toggleDataRe(status) {
      this.toggleData = status;
      if (status === 0) {
        document.querySelector('.all').classList.add('data_active');
        document.querySelector('.justlook').classList.remove('data_active');
        if (this.toggleSortMo == 0) {
          this.interface = {
            access_token: '',
            parent_id: this.$route.params.id,
            icon: 1,
            child: 1,
            total: 0,
            limit: 1000,
            page: 1,
            order: 'default',
          };
          this.dataList = [];
          this.dataThreeList = [];
          this.findAll();
          this.loadAll = false;

          this.loading = false;
        } else {
          this.interface = {
            access_token: '',
            parent_id: this.$route.params.id,
            icon: 1,
            child: 1,
            total: 0,
            limit: 1000,
            page: 1,
            order: 'time',
          };
          this.dataList = [];
          this.dataThreeList = [];
          this.findAll();
          this.loadAll = false;

          this.loading = false;
        }
      } else {
        document.querySelector('.justlook').classList.add('data_active');
        document.querySelector('.all').classList.remove('data_active');
        if (this.toggleSortMo == 0) {
          this.interface.type = 'reask';
          this.interface.page = 1;
          this.interface.order = 'default';
          this.interface.limit = 1000;
          this.dataList = [];
          this.dataThreeList = [];
          // this.threeList = [];
          this.rstList();
          this.getDescendant();
          this.loading = false;
          this.loadAll = false;
        } else {
          this.interface.type = 'reask';
          this.interface.page = 1;
          this.interface.order = 'time';
          this.interface.limit = 1000;
          this.dataList = [];
          this.dataThreeList = [];
          // this.threeList = [];
          this.rstList();
          this.getDescendant();
          this.loading = false;
          this.loadAll = false;
        }
      }
    },
    updates() {
      this.getDescendant();
    },
    gotolink(e) {
      //指定跳转地址
      this.$router.push({ path: '/toAskFriends', query: { id: e } });
    },
  },
};
</script>

<style lang="scss" scoped>
.classIcon {
  width: 50px;
  height: 50px;
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
.suobianju {
  margin-right: -15px;
}
.mores {
  height: 50px;
  width: 100%;
  text-align: center;
  background: #f5f5f5;
  color: #1bc6b8;
  border: none;
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
::v-deep .all_ques_text {
  padding: 10px 0;
  padding-left: 10px;
  font-size: 18px;
  a {
    color: #1bc6b8;
  }
}
.title_box {
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 15px;
  img {
    max-width: 100%;
  }
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
.grid-cell-1 {
  margin-top: 10px;
  display: flex;
  align-items: center;
  // align-items: baseline;
  .text {
    color: #ccc;
    font-size: 14px;
    margin: 0 0 0 4px;
  }
  .avatar_group {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
    align-items: center;
  }
}

.toggle_logo {
  font-size: 40px;
}

.all {
  color: #ccc;
}
.data_active {
  color: #000 !important;
}
.justlook {
  color: #ccc;
}

.toggle-group {
  text-align: right;
  position: absolute;
  bottom: -25px;
  right: 10px;
}
.right {
  width: 100%;
  height: 100%;
  line-height: 55px;
}
p {
  margin: 10px auto;
}
.set_menu {
  & > div {
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .moren,
    .zuixin {
      width: 40%;
      height: 101%;
      border-radius: 20px;
      text-align: center;
      line-height: 34px;
    }

    .active {
      background: #1bc6b8;
      width: 60%;
      color: snow;
    }
  }
}
.bottom-nav {
  background: #06a9ac;
  color: #fff;
}
.one-more {
  background: #1bc6b8;
  height: 100%;
  line-height: 55px;
}
</style>
<style>
.mu-list {
  padding: 2px 0px !important;
}
.pswp {
  z-index: 3000;
}
.self-img {
  width: 100%;
  height: auto;
}
.material-icons {
  height: 24px;
}
.mu-icon-button {
  width: 20px;
}
i {
  width: 24px;
}
.teamd {
  margin-left: 10px;
  color: #000;
  width: 100%;
  font-size: 14px;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
