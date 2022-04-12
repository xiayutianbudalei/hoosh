<template>
  <wx-open-launch-weapp
    id="launch-btn"
    username="gh_fee539353724"
    path="pages/switchPage/home/home.html"
  >
    <script type="text/wxtag-template">
      <button class="open-launch-weapp-btn" style="background-color: transparent;border: none;color:#FDE6B0;font-size:12px;">去小程序</button>
    </script>
  </wx-open-launch-weapp>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
import { getjsapisign } from "api/user";
import wx from "weixin-js-sdk";

export default {
  data() {
    return {
      username: "gh_fee539353724", // gh_ 开头的原始小程序ID
      path: "pages/index/index.html", // 一定要以 .html 结尾
      temp: ""
    };
  },
  methods: {
    ToMiniapp() {},
    handleLaunchFn(e) {
      console.log("222" + e);
    },
    handleErrorFn(e) {
      console.log("333", e.detail);
    },
    getjsapisign() {}
  },
  created() {
    getjsapisign({ url: window.location.href }).then(async res => {
      await wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ["openLocation", "getLocation", "openCard"], // 必填，需要使用的JS接口列表
        openTagList: ["wx-open-launch-weapp"] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
      });
      let _this = this;
      wx.ready(function(res) {
        console.log(res);

        setTimeout(() => {
          _this.temp = `<wx-open-launch-weapp
                        id="launch-btn"
                        username="gh_fee539353724"
                        path="pages/home/index.html?user=123&action=abc"
                      >
                        <template>
                          <style>.btn { padding: 12px }</style>
                          <button class="btn">打开小程序</button>
                        </template>
                      </wx-open-launch-weapp>
                      `;
        }, 3000);
        //config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
        var btn = document.getElementById("launch-btn");
        btn.addEventListener("launch", function(e) {
          console.log("success");
        });

        btn.addEventListener("error", function(e) {
          console.log("fail", e.detail);
        });
      });
      wx.error(function(res) {
        console.log("111", res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    });
  },
  mounted() {
    this.getjsapisign();
  }
};
</script>
