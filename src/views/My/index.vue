<template>
  <page>
    <div class="my-top">
      <div class="mu-list-box">
        <mu-list @click="goToPage('/profile')">
          <mu-list-item avatar button :ripple="false">
            <mu-list-item-action v-if="token" @click.stop="goToLink(user.id)">
              <Avatar
                size="small"
                :name="user.user_abbr"
                :bgColor="user.user_backcolor"
                :headIcon="user.user_headicon"
              />
            </mu-list-item-action>
            <mu-list-item-title style="color: #fff" class="ml-2">
              {{ user.user_name ? user.user_name : '请登录' }}
            </mu-list-item-title>
            <mu-list-item-action>
              <svg-icon
                icon-class="icon-right2"
                style="font-size: 25px;vertical-align: middle;"
              />
              <!-- <mu-icon
                size="40"
                color="#fff"
                value="keyboard_arrow_right"
              ></mu-icon> -->
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
      <div class="card-wrap">
        <mu-card class="card-box">
          <mu-card-text>
            <mu-row gutter>
              <mu-col span="4" @click="goToPage('/mypose')">
                <div class="text-center">
                  <mu-avatar color="#dddde0" size="50">
                    <mu-icon value="help"></mu-icon>
                  </mu-avatar>
                </div>
                <div class="text-center mt-2">提问</div>
              </mu-col>
              <mu-col span="4" @click="goToPage('/myAnswer')">
                <div class="text-center">
                  <mu-avatar color="#dddde0" size="50">
                    <mu-icon value="book"></mu-icon>
                  </mu-avatar>
                </div>
                <div class="text-center mt-2">回答</div>
              </mu-col>
              <mu-col span="4" @click="goToPage('/myaskmore')">
                <div class="text-center">
                  <mu-avatar color="#dddde0" size="50">
                    <mu-icon value="message"></mu-icon>
                  </mu-avatar>
                </div>
                <div class="text-center mt-2">多问一句</div>
              </mu-col>
            </mu-row>
          </mu-card-text>
        </mu-card>
      </div>
    </div>

    <mu-card class="my-bottom">
      <mu-list>
        <mu-list-item
          class="list-item"
          button
          :ripple="false"
          @click="goToPage('/myteam')"
        >
          <mu-list-item-action style="width:350px">
            我的小组
          </mu-list-item-action>
          <mu-list-item-title style="text-align: right">
            <svg-icon
              icon-class="icon-right1"
              style="font-size: 16px;vertical-align: middle;"
            />

            <!-- <mu-icon
              style="vertical-align: middle"
              color="#999"
              value="keyboard_arrow_right"
            ></mu-icon> -->
          </mu-list-item-title>
        </mu-list-item>
        <div class="mr-2 ml-2">
          <mu-divider></mu-divider>
        </div>
        <mu-list-item
          class="list-item"
          button
          :ripple="false"
          @click="goToPage('/myattention')"
        >
          <mu-list-item-action style="width:350px">
            我的关注
          </mu-list-item-action>
          <mu-list-item-title style="text-align: right">
            <svg-icon
              icon-class="icon-right1"
              style="font-size: 16px;vertical-align: middle;"
            />
            <!-- <mu-icon
              style="vertical-align: middle"
              color="#999"
              value="keyboard_arrow_right"
            ></mu-icon> -->
          </mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-card>

    <mu-card class="my-bottom">
      <mu-list>
        <mu-list-item
          class="list-item"
          button
          :ripple="false"
          @click="goToPage('/mymessage')"
        >
          <mu-list-item-action>消息</mu-list-item-action>
          <mu-list-item-title style="text-align:right;overflow:unset">
            <mu-badge
              v-if="countTotal !== '0'"
              :content="countTotal"
              circle
              color="secondary"
              class="demo-icon-badge"
            ></mu-badge>
            <svg-icon
              icon-class="icon-right1"
              style="font-size: 16px;vertical-align: middle;"
            />
            <!-- <mu-icon
              style="vertical-align: middle"
              color="#999"
              value="keyboard_arrow_right"
            ></mu-icon> -->
          </mu-list-item-title>
        </mu-list-item>
        <div class="mr-2 ml-2">
          <mu-divider></mu-divider>
        </div>
        <router-link to="/setting">
          <mu-list-item class="list-item" button :ripple="false">
            <mu-list-item-action>设置</mu-list-item-action>
            <mu-list-item-title style="text-align:right;overflow:unset">
              <svg-icon
                icon-class="icon-right1"
                style="font-size: 16px;vertical-align: middle;"
              />
              <!-- <mu-icon
                style="vertical-align: middle"
                color="#999"
                value="keyboard_arrow_right"
              ></mu-icon> -->
            </mu-list-item-title>
          </mu-list-item>
        </router-link>
      </mu-list>
    </mu-card>

    <mu-card class="my-bottom">
      <mu-list>
        <mu-list-item
          class="list-item"
          button
          :ripple="false"
          @click="openPicture()"
        >
          <wx-open-launch-weapp
            style="width: 100%;"
            id="launch-btn"
            username="gh_fee539353724"
            path="/pages/itinerary/home/home.html"
          >
            <mu-list-item-action>
              行程
            </mu-list-item-action>
            <script type="text/wxtag-template">
              <style>
                .btn {
                  padding-left: 0.1px;
                  padding-top: 15px;
                  display: flex;
                  justify-content: space-between;
                  border: none;
                  background-color:#fff;
                  width: 100%;
                  height: 48px;
                  color: #757575;
                  text-align: left;
                  font-size: 14px;
                      }
              </style>
                <button class="btn">
                  <div>行程</div>
                  <img
                  src="https://cdn.jsdelivr.net/gh/chenguzhen87/images@latest/imgs20211026163313.png"
                  alt=""
                />
                  </button>
            </script>
          </wx-open-launch-weapp>

          <mu-list-item-title style="text-align: right; " v-if="disappear">
            <svg-icon
              icon-class="icon-right1"
              style="font-size: 16px;vertical-align: middle;"
            />
            <!-- <mu-icon
              style="vertical-align: middle; "
              color="#999"
              value="keyboard_arrow_right"
            ></mu-icon> -->
          </mu-list-item-title>
        </mu-list-item>
        <div class="mr-2 ml-2">
          <mu-divider></mu-divider>
        </div>
        <mu-list-item
          class="list-item"
          button
          :ripple="false"
          @click="openPicture()"
        >
          <wx-open-launch-weapp
            style="width: 100%;"
            id="launch-btn"
            username="gh_fee539353724"
            path="/pages/itinerary/home/home.html"
          >
            <mu-list-item-action>
              顺风车
            </mu-list-item-action>
            <script type="text/wxtag-template">
                <style>
                  .btn {
                    padding-left: 0.1px;
                    padding-top: 15px;
                    display: flex;
                    justify-content: space-between;
                    border: none;
                    background-color:#fff;
                    width: 100%;
                    height: 48px;
                    color: #757575;
                    text-align: left;
                    font-size: 14px;
                  }
                </style>
              <button class="btn">
                <div>顺风车</div>
                <img
                  src="https://cdn.jsdelivr.net/gh/chenguzhen87/images@latest/imgs20211026163313.png"
                  alt=""
                />
              </button>
            </script>
          </wx-open-launch-weapp>
          <mu-list-item-title style="text-align: right" v-if="disappear">
            <svg-icon
              icon-class="icon-right1"
              style="font-size: 16px;vertical-align: middle;"
            />
            <!-- <mu-icon
              style="vertical-align: middle"
              color="#999"
              value="keyboard_arrow_right"
            ></mu-icon> -->
          </mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-card>

    <mu-dialog width="360" :open.sync="showQR" class="qr-box">
      <img src="../../assets/images/mini-qrcode.png" alt="小程序QR" />
    </mu-dialog>
    <template #footer>
      <BottomNav />
    </template>
  </page>
</template>

<script>
import { mapState } from 'vuex';
import wx from 'weixin-js-sdk';

import { messageHasnew, getjsapisign } from '@/api/user';
import BottomNav from 'components/BottomNav';
export default {
  name: 'My',
  components: {
    BottomNav,
  },
  data() {
    return {
      disappear: true,
      countTotal: '0',
      showQR: false,
    };
  },

  computed: {
    ...mapState({
      token: state => state.user.token,
      user: state => state.user.user,
    }),
  },
  mounted() {
    if (!window.name) {
      window.name = 'test';
      window.location.reload();
    }
    // location.reload();
    this.getMessageHasnew();
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
      this.towindcar();
      this.disappear = false;
    } else {
      return true;
    }
  },

  methods: {
    goToLink(e) {
      this.$router.push({ path: '/toAskFriends', query: { id: e } });
    },
    goToPage(path) {
      if (this.token) {
        this.$router.push({
          path,
        });
      } else {
        this.$router.push('/login');
      }
    },
    getMessageHasnew() {
      if (this.user.id) {
        messageHasnew().then(res => {
          // console.log("获取消息总数", res);
          const { like_count, event_count, notice_count } = res.data;
          this.countTotal = String(like_count + event_count + notice_count);
        });
      }
    },

    openPicture() {
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if (isWeixin) {
        return true;
      } else {
        this.showQR = true;
      }
    },
    towindcar() {
      const url = {
        url: window.location.href.split('#')[0],
      };
      getjsapisign(url).then(res => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
          appId: res.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: ['openLocation', 'getLocation', 'openCard'], // 必填，需要使用的JS接口列表
          openTagList: ['wx-open-launch-weapp'], // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
        });
        this.disappear = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-top {
  // padding-top: 30px;
  color: #dddde0;
}

.btne {
  padding: 0.1px;
  border: none;

  background-color: #fff;
  width: 100%;
}
.mu-list-box {
  padding: 0 0 20px;
  background: #1bc6b8;
}
.card-wrap {
  background: #1bc6b8;
  border-bottom-left-radius: 30vw;
  border-bottom-right-radius: 30vw;
  position: relative;
  top: -1px;
}
.card-box {
  width: 90%;
  border-radius: 10px;
  overflow: unset;
  margin: 0 auto;
  padding: 20px 0 10px;
}

.my-bottom {
  width: 90%;
  margin: 20px auto 0;
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
