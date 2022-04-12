<template>
  <div>
    <div id="login_container"></div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import { wxLogin } from "api/user";

export default {
  name: "WxLogin",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      APP_id: "wxbb5b0c33ce2f4d62",
      redirect_uri: "http://www.hoosheha.com/my"
    };
  },
  //方法集合
  mounted() {
    router.beforeEach((to, from, next) => {
      let fullPath = to.fullPath;
      if (to.fullPath.includes("code")) {
        //判断url中是否有code，踩坑1-页面反复跳转
        fullPath = delCodeandstate(to);
      }
      let redirect_uri = encodeURIComponent(
          "http://www.hoosheha.com/my" + fullPath
        ),
        appid = "wxbb5b0c33ce2f4d62"; //redirect_uri，授权登陆后的回调地址，需要进行encodeURIComponent处理
      let code = to.query.code,
        state = to.query.state;
      let noLoginArr = ["/"],
        isCur = false,
        token = sessionStorage.getItem("token"); //noLoginArr，白名单，不需要授权登陆的页面
      for (let i of noLoginArr) {
        if (to.path == i) {
          isCur = true;
        }
      }
      if (isCur) {
        //白名单内不做登录判断，直接next
        next();
      } else {
        if (code && state && !token) {
          //登陆之后获取到code，传到后台登录
          let data = {
            code: code
          };
          axios
            .post("/api/auth/code", data)
            .then(res => {
              if (res.code == 200) {
                sessionStorage.setItem("token", res.data.token);
                axios.defaults.headers.common["token"] = res.data.token;
                next();
              } else if (res.code == 401) {
                //后台判断toke是否失效，失效返回401重新授权登陆
                //去登录
                window.location.href =
                  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                  appid +
                  "&redirect_uri=" +
                  redirect_uri +
                  "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
              }
            })
            .catch(function(error) {});
        } else if (token) {
          //已登录，有token，判断是否过期
          axios.defaults.headers.common["token"] = sessionStorage.getItem(
            "token"
          );
          let data = {
            token: token
          };
          axios
            .post("/api/auth/checkToken", data)
            .then(res => {
              //判断token是否过期接口
              if (res.code == 200) {
                next();
              } else if (res.code == 401) {
                //后台判断toke是否过期，过期返回401重新授权登陆
                sessionStorage.setItem("token", "");
                axios.defaults.headers.common["token"] = "";
                //去登录
                window.location.href =
                  "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                  appid +
                  "&redirect_uri=" +
                  redirect_uri +
                  "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
              }
            })
            .catch(function(error) {});
        } else {
          //未登录，没有token，去登录
          //去登录
          window.location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            appid +
            "&redirect_uri=" +
            redirect_uri +
            "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }
      }
    });
  }
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
#login_container {
  margin-top: 20px;
  text-align: center;
}
</style>
