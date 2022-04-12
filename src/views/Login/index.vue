<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <!-- <template v-slot:left>
          <Back />
        </template> -->
        <div class="text-center">虎什哈伙伴内部交流</div>
        <!-- <template v-slot:right>
          <div style="width:56px"></div>
        </template> -->
      </mu-appbar>
    </template>
    <mu-container class="login-vessel">
      <!-- <div class="title-main">登录</div> -->
      <mu-form
        @submit="submit"
        class="mt-5 pa-2"
        ref="form"
        :model="validateForm"
      >
        <mu-form-item label="用户名" prop="account" :rules="usernameRules">
          <mu-text-field
            @keydown="keydown"
            v-model="validateForm.account"
            prop="account"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="user_pass" :rules="passwordRules">
          <mu-text-field
            @keydown="keydown"
            type="password"
            v-model="validateForm.user_pass"
            prop="user_pass"
          ></mu-text-field>
        </mu-form-item>
        <mu-button color="primary" full-width @click.once="submit"
          >登录</mu-button
        >
        <div class="wechat-box mt-2">
          <!-- 微信点击扫码登录入口打开即用 -->
          <div @click="wxlogin">
            <div>
              <img src="@/assets/icon/weChat.svg" alt />
            </div>
            <div class="wechat-txt">
              微信登录
            </div>
          </div>
        </div>
      </mu-form>
    </mu-container>
  </page>
</template>
<script>
import { passwordMd5 } from "utils";
export default {
  name: "Login",
  data() {
    return {
      redirect: "",
      usernameRules: [{ validate: val => !!val, message: "必须填写账号" }],
      passwordRules: [{ validate: val => !!val, message: "必须填写密码" }],
      validateForm: {
        account: "",
        user_pass: "",
        code: ""
      },
      redirect_uri: "http://www.hoosheha.com/login" //本地暂时无法调试，工具可以实现将公网上的域名映射到内网localhost的指定端口
    };
  },
  mounted() {
    const { code } = this.$route.query;
    if (code) {
      this.getAccessToken(code);
    }
  },

  methods: {
    keydown(e) {
      const keycode = e.keyCode;
      if (keycode === 13) {
        this.submit();
      }
    },
    submit() {
      this.$refs.form.validate().then(result => {
        if (result) {
          const { user_pass, account } = this.validateForm;
          const md5Pwd = passwordMd5(user_pass);
          this.$store
            .dispatch("user/login", { account: account, user_pass: md5Pwd })

            .then(() => {
              this.$router.replace({ path: this.redirect || "/" });
            });
        }
      });
    },
    wxlogin() {
      if (/(micromessenger)/i.test(navigator.userAgent)) {
        //服务号Appid 授权登录
        const APP_id = "wx5354a8ea292bcee9";
        window.location.replace(
          "https://open.weixin.qq.com/connect/oauth2/authorize?" +
            "appid=" +
            APP_id +
            "&" +
            "redirect_uri=" +
            this.redirect_uri +
            "&" +
            "response_type=code&" +
            "scope=snsapi_userinfo&state=STATE#wechat_redirect"
        );
      } else {
        //扫码登录
        const APP_id = "wxbb5b0c33ce2f4d62";
        window.location.replace(
          "https://open.weixin.qq.com/connect/qrconnect?" +
            "appid=" +
            APP_id +
            "&" +
            "redirect_uri=" +
            this.redirect_uri +
            "&" +
            "response_type=code&" +
            "scope=snsapi_login&state=STATE#wechat_redirect"
        );
      }
    },
    getAccessToken(code) {
      let login_type = "";
      if (/(micromessenger)/i.test(navigator.userAgent)) {
        login_type = "weixin_authorize";
      } else {
        login_type = "weixin_qrconnect";
      }
      let paramas = {
        code: code,
        login_type: login_type
      };

      this.$store.dispatch("user/wxLogin", paramas).then(() => {
        this.$router.push({ path: this.redirect || "/" });
      });
    }
  },
  computed: {
    token: function() {
      return this.$store.getters.token;
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.login-vessel {
  margin-top: 40px;

  .title-main {
    text-align: center;
    font-size: 18px;
  }
  .wechat-box {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    .wechat-txt {
      text-align: center;
      color: #bbb;
    }
  }
}
</style>
