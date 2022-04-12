<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back to="/my" />
        </template>
        <div class="text-center">个人信息</div>
        <template v-slot:right>
          <div style="width: 56px"></div>
        </template>
      </mu-appbar>
    </template>
    <mu-list style="padding-top:0">
      <input
        type="file"
        id="File"
        name="pic"
        accept="image/*"
        class="file-input"
        @change="beforeRead($event)"
      />
      <mu-list-item class="list-item" button :ripple="false">
        <mu-list-item-action>
          头像
        </mu-list-item-action>
        <mu-list-item-title style="text-align:right;height:auto">
          <!-- <mu-avatar size="24" :color="user.user_backcolor">
            <img :src="user_headicon" />
          </mu-avatar> -->
          <Avatar
            size="mini"
            :name="user.user_abbr"
            :bgColor="user.user_backcolor"
            :headIcon="user.user_headicon"
          />
          <mu-icon value="keyboard_arrow_right" color="#999"></mu-icon>
        </mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item
        @click="openBotttomSheet"
        class="list-item"
        button
        :ripple="false"
      >
        <mu-list-item-action>
          昵称
        </mu-list-item-action>
        <mu-list-item-title style="text-align:right">
          <span style="color:#999">{{ user.user_name }}</span>
          <mu-icon
            style=" vertical-align: middle;"
            color="#999"
            value="keyboard_arrow_right"
          ></mu-icon>
        </mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item class="list-item" button :ripple="false">
        <mu-list-item-action>
          用户名
        </mu-list-item-action>
        <mu-list-item-title>
          <span
            style="color:#999;margin-right:10px;width: 100px;display: block;float: right;text-align:right"
            class="ellipsis-line1"
            >{{ user.account }}</span
          >
        </mu-list-item-title>
      </mu-list-item>
    </mu-list>
    <mu-bottom-sheet :open.sync="open">
      <div class="flex pa-4">
        <div class="flexItem">
          <mu-text-field
            max-length="20"
            solo
            full-width
            v-model="userName"
            placeholder="输入昵称"
            :action-icon="userName.length ? 'close' : ''"
            :action-click="actionClick"
          >
          </mu-text-field>
        </div>
        <mu-button @click="modifyUser" flat style="padding: 10px 0"
          >确定</mu-button
        >
      </div>
    </mu-bottom-sheet>
  </page>
</template>
<script>
// import avatar from "assets/images/u2101.png";
import { uploadVia, modifyUserInfo } from "@/api/user.js";
import { mapGetters, mapActions } from "vuex";
import lrz from "lrz";
import NProgress from "muse-ui-progress";

import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      avatar: "",
      open: false,
      userName: "",
      uploadActionUrl: `${process.env.VUE_APP_BASE_API}/user/info/upload?token=${this.$store.getters.token}`
    };
  },
  computed: {
    ...mapGetters(["user_headicon", "user"])
  },
  methods: {
    actionClick() {
      this.userName = this.user.user_name;
    },
    openBotttomSheet() {
      this.open = true;
    },
    closeBottomSheet() {
      this.open = false;
    },

    beforeRead(e) {
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        // this.$toast.warning(this.$t("setting-tips-imgMoreLimit"));
        console.log("图片格式错误");
        this.$toast.error("头像格式错误,请确认后再填");
        return false;
      }
      const thisVessel = this;
      lrz(e.target.files[0], {
        quality: 0.4
      }).then(function(rst) {
        //成功时执行
        NProgress.start();
        let file = rst.file;
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post(thisVessel.uploadActionUrl, formData, {
            contentType: false,
            processData: false,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
              // lang: this.$store.getters.lang,
            }
          })
          .then(res => {
            thisVessel.$toast.success("头像上传成功");
            const imgBase = res.data.data.url;
            uploadVia({
              user_headicon: imgBase
            }).then(() => {
              thisVessel.getUser();
            });
            NProgress.done();
          })

          .catch(err => {
            console.log(err);
          });
      });
    },
    modifyUser() {
      if (this.userName === "") {
        this.$toast.error("昵称不能为空");
        return;
      }
      modifyUserInfo({
        user_name: this.userName
      }).then(() => {
        this.$toast.success("昵称修改成功");
        this.getUser();
        this.closeBottomSheet();
      });
    },
    ...mapActions("user", ["getUser"])
  }
};
</script>
<style lang="scss">
.mu-linear-progress-background {
  position: fixed;
  top: 200px !important;
  height: 10px;
  left: 20px !important;
  right: 20px !important;
  background-color: #2196f3;
}
.mu-linear-progress-determinate {
  position: fixed;
  top: 200px !important;
  height: 10px;
  left: 20px !important;
  right: 20px !important;
  background-color: #1bc6b8 !important;
}
.left-c {
  vertical-align: middle;
}

.list-item {
  background: #fff;
}
.file-input {
  position: absolute;
  // clip: rect(0 0 0 0);
  width: 100%;
  height: 48px;
  top: 0;
  z-index: 999;
  opacity: 0;
}
.mu-avatar img {
  width: auto;
}
.flexItem /*deep*/ .mu-input-help {
  position: relative;
  top: -20px !important;
}
</style>
