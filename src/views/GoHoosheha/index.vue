<template>
  <page>
    <div class="ml-2 mr-2">
      <mu-tabs
        class="mt-4"
        :value.sync="active"
        inverse
        full-width
        color="primary"
        indicator-color="#1BC6B8"
        center
      >
        <mu-tab>旅客</mu-tab>
        <mu-tab>顺风车</mu-tab>
      </mu-tabs>
      <div class="mt-5" v-if="active == 0">
        <wx-open-launch-weapp
          id="launch-btn"
          username="gh_fee539353724"
          path="/pages/home/home/home.html"
        >
          <mu-button color="primary" full-width @click="gowindcar">
            <button style="background-color: transparent;border: none;">
              马上预约行程
            </button>
          </mu-button>
          <script type="text/wxtag-template">
            <style>
               .btn {
                      border: none;
                      background-color: #1bc6b8;
                      width: 100%;
                      color: #fff;
                      text-align: center;
                      border-radius: 3px;
                      height: 2.25rem;
                      line-height: 2.25rem;
                      font-size: 0.875rem;
                    }
            </style>
            <button class="btn">马上预约行程</button>
          </script>
        </wx-open-launch-weapp>
      </div>
      <div class="mt-5" v-if="active == 1">
        <wx-open-launch-weapp
          id="launch-btn"
          username="gh_fee539353724"
          path="/pages/home/home/home.html"
        >
          <mu-button color="primary" full-width @click="gowindcar">
            提供顺风车
          </mu-button>
          <script type="text/wxtag-template">
            <style>
                .btn {
                      border: none;
                      background-color: #1bc6b8;
                      width: 100%;
                      color: #fff;
                      text-align: center;
                      border-radius: 3px;
                      height: 2.25rem;
                      line-height: 2.25rem;
                      font-size: 0.875rem;
                    }
            </style>
            <button class="btn">提供顺风车</button>
          </script>
        </wx-open-launch-weapp>
      </div>
      <div class="jchd">
        <mu-divider style="margin-top:40px" />
        <div class="jchd-title"><span class="jchd-in">精彩活动</span></div>
      </div>
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
        :loaded-all="loadAll"
      >
        <div
          v-for="(item, i) in list"
          :key="i"
          class="mb-3"
          @click="toActivityDetail(item)"
        >
          <img
            :src="item.cover ? item.cover : img"
            alt="活动封面"
            class="activity-img"
          />
          <div class="mt-2">{{ item.title }}</div>
        </div>
        <PlaceHolder v-if="isPlaceHolder" message="暂无数据" />
        <LoadAllTips v-if="!isPlaceHolder && loadAll" />
      </mu-load-more>
    </div>

    <mu-dialog width="360" :open.sync="showQR" class="qr-box">
      <img src="../../assets/images/mini-qrcode.png" alt="小程序QR" />
    </mu-dialog>
    <template #footer>
      <BottomNav />
    </template>
  </page>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
import PlaceHolder from "components/PlaceHolder";
import img from "assets/images/u2101.png";
import wx from "weixin-js-sdk";
import { activityList } from "api/subject";
import { getjsapisign } from "@/api/user";
import BottomNav from "components/BottomNav";
import LoadAllTips from "components/LoadAllTips";
import ToMini from "components/ToMini";
export default {
  name: "GoHoosheha",
  components: { PlaceHolder, BottomNav, LoadAllTips, ToMini },
  data() {
    return {
      active: 0,
      img,
      refreshing: false,
      loading: true,
      list: [],
      total: 0,
      limit: 20,
      page: 1,
      isPlaceHolder: false,
      temp: "",
      wxReady: false,
      loadAll: false,
      showQR: false
    };
  },

  mounted() {
    if (!window.name) {
      window.name = "test";
      window.location.reload();
    }
    this.activityList();
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      this.towindcar();
    } else {
      return true;
    }
  },
  methods: {
    gowindcar() {
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf("micromessenger") != -1;
      if (isWeixin) {
        return true;
      } else {
        this.showQR = true;
      }
    },
    towindcar() {
      getjsapisign({ url: window.location.href }).then(async res => {
        console.log(res);
        await wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
          appId: res.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: ["openLocation", "getLocation", "openCard"], // 必填，需要使用的JS接口列表
          openTagList: ["wx-open-launch-weapp"] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
        });
        wx.ready(function() {
          wx.checkJsApi({
            jsApiList: ["wx-open-launch-weapp"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
              console.log("可用", res.checkResult);
            },
            fail: err => {
              console.log(err, "不可用");
            }
          });
          var btn = document.getElementById("launch-btn");
          btn.addEventListener("launch", function(e) {
            console.log(e);
            console.log("success");
          });

          btn.addEventListener("error", function(e) {
            console.log("fail", e.detail);
          });
          //config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
        });
        wx.error(function(res) {
          console.log("res", res);
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      });
    },
    activityList() {
      let params = {
        page: this.page,
        limit: this.limit
      };
      activityList(params)
        .then(res => {
          const { list, total } = res.data;
          const mergeList = this.list.concat(list);
          ++this.page;
          this.total = total;
          this.list = mergeList;
          this.isPlaceHolder = mergeList.length === 0;
          console.log(
            "已请求列表总数：",
            this.list.length,
            "可请求总数:",
            total
          );
          if (this.list.length === total) {
            this.loadAll = true;
          }
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    refresh() {
      this.refreshing = true;
      this.loadAll = false;
      this.list = [];
      this.page = 1;
      this.activityList();
    },
    load() {
      this.loading = true;
      this.activityList();
    },
    toActivityDetail(item) {
      this.$router.push({ name: "ActivityDetail", params: { id: item.id } });
    }
  }
};
</script>
<style lang="scss" scoped>
#launch-btn {
  width: calc(100vw - 16px);
}
.jchd {
  position: relative;
  margin-bottom: 10px;
}

.jchd-title {
  text-align: center;
  position: relative;
}

.jchd-in {
  background: #fafafa;
  padding: 10px 20px;
  font-size: 16px;
  position: relative;
  top: -10px;
  background: #fff;
  border-radius: 10px;
}
.activity-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.qr-box {
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
