<!--
 * @Description: 
 * @Author: Duchin/梁达钦
 * @Date: 2020-08-12 15:35:06
 * @LastEditors: Duchin/梁达钦
 * @LastEditTime: 2020-08-17 10:38:33
-->
<template>
  <div class="bottom-nav">
    <mu-tabs
      inverse
      color="primary"
      style="background: #fff"
      indicator-color="#fff"
      full-width
      center
    >
      <mu-tab to="/">
        <svg-icon
          v-if="shift == '/'"
          icon-class="answer-primary"
          style="font-size: 30px"
        />
        <svg-icon v-else icon-class="answer" style="font-size: 30px" />
      </mu-tab>

      <mu-tab to="/seehsh">
        <svg-icon
          v-if="shift == '/seehsh'"
          icon-class="youji-primary"
          style="font-size: 30px"
        />
        <svg-icon v-else icon-class="youji" style="font-size: 30px" />
      </mu-tab>
      <mu-tab to="/FillQuestion">
        <div class="question">
          <svg-icon
            v-if="shift == '/FillQuestion'"
            icon-class="logo(1)"
            style="font-size: 40px;"
          />
          <svg-icon
            v-else
            icon-class="logo-white-01"
            style="font-size: 40px;background: #1bc6b8"
            class="fillques"
          />
        </div>
      </mu-tab>
      <mu-tab to="/goHoosheha">
        <svg-icon
          v-if="shift == '/goHoosheha'"
          icon-class="map-primary"
          style="font-size: 30px"
        />
        <svg-icon v-else icon-class="map" style="font-size: 30px" />
      </mu-tab>
      <mu-tab to="/my">
        <mu-badge
          v-if="countTotal !== '0'"
          circle
          color="secondary"
          class="demosqr"
        ></mu-badge>
        <svg-icon
          v-if="shift == '/my'"
          icon-class="my-primary"
          style="font-size: 30px"
        />
        <svg-icon v-else icon-class="my" style="font-size: 30px" />
      </mu-tab>
    </mu-tabs>
    <div class=""></div>
  </div>
</template>

<script>
import { messageHasnew } from '@/api/user';
import { mapState } from 'vuex';
export default {
  name: 'BottomNav',
  data() {
    return {
      shift: this.$route.path,
      countTotal: '0',
    };
  },
  watch: {
    $route: function(to) {
      this.shift = to.path;
    },
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      user: state => state.user.user,
    }),
  },
  mounted() {
    this.getMessageHasnew();
  },
  methods: {
    getMessageHasnew() {
      if (this.user.id) {
        messageHasnew().then(res => {
          const { like_count, event_count, notice_count } = res.data;
          this.countTotal = String(like_count + event_count + notice_count);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.bottom-nav {
  // position: fixed;
  // bottom: 0;
  // left: 0;
  // right: 0;
  width: 100%;
  // z-index: 100;
  height: 56px;
  background: #fff;
  border-top: 1px solid #e4e8e7;
}
.fillques {
  background-color: #1bc6b8;
}

.question {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.question svg {
  vertical-align: middle;
  border-radius: 20px;
}
.demosqr {
  position: absolute;
  top: 8px;
  left: 45px;

  .mu-secondary-color {
    width: 8px;
    height: 8px;
  }
}
</style>
