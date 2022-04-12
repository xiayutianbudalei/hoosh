<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back to="/my" />
        </template>
        <div class="text-center">消息</div>
        <template v-slot:right>
          <div style="width: 56px"></div>
        </template>
      </mu-appbar>
    </template>
    <mu-list style="padding-top:0">
      <mu-list-item
        @click="goToPage('/receivedPraise')"
        class="list-item"
        button
        :ripple="false"
      >
        <mu-list-item-action style="width:300px">
          收到的赞
        </mu-list-item-action>
        <mu-list-item-title style="text-align:right;overflow:unset">
          <mu-badge
            v-if="like_count !== '0'"
            :content="like_count"
            circle
            color="secondary"
            class="demo-icon-badge"
          ></mu-badge>
          <svg-icon
            icon-class="icon-right1"
            style="font-size: 16px;vertical-align: middle;"
          />
          <!-- <mu-icon
            value="keyboard_arrow_right"
            color="#999"
            style=" vertical-align: middle;"
          ></mu-icon> -->
        </mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item
        @click="goToPage('/dynamicMessage')"
        class="list-item"
        button
        :ripple="false"
      >
        <mu-list-item-action style="width:300px">
          动态消息
        </mu-list-item-action>
        <mu-list-item-title style="text-align:right;overflow:unset">
          <mu-badge
            v-if="event_count !== '0'"
            :content="event_count"
            circle
            color="secondary"
            class="demo-icon-badge"
          ></mu-badge>
          <svg-icon
            icon-class="icon-right1"
            style="font-size: 16px;vertical-align: middle;"
          />
          <!-- <mu-icon
            style=" vertical-align: middle;"
            color="#999"
            value="keyboard_arrow_right"
          ></mu-icon> -->
        </mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item
        @click="goToPage('/systemInform')"
        class="list-item"
        button
        :ripple="false"
      >
        <mu-list-item-action style="width:300px">
          系统通知
        </mu-list-item-action>
        <mu-list-item-title style="text-align:right;overflow:unset">
          <mu-badge
            v-if="notice_count !== '0'"
            :content="notice_count"
            circle
            color="secondary"
            class="demo-icon-badge"
          ></mu-badge>
          <svg-icon
            icon-class="icon-right1"
            style="font-size: 16px;vertical-align: middle;"
          />
          <!-- <mu-icon
            style=" vertical-align: middle;"
            color="#999"
            value="keyboard_arrow_right"
          ></mu-icon> -->
        </mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </page>
</template>
<script>
import { messageHasnew } from 'api/user';
export default {
  name: 'MyMessage',
  data() {
    return {
      like_count: '0',
      event_count: '0',
      notice_count: '0',
    };
  },
  mounted() {
    this.getnoticeHasnew();
  },
  methods: {
    goToPage(path) {
      this.$router.push({
        path,
      });
    },
    getnoticeHasnew() {
      messageHasnew().then(res => {
        // console.log("获取消息总数", res);
        const { like_count, event_count, notice_count } = res.data;
        this.like_count = String(like_count);
        this.event_count = String(event_count);
        this.notice_count = String(notice_count);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.left-c {
  vertical-align: middle;
}

.list-item {
  background: #fff;
}
mu-list-item-action {
  white-space: nowrap;
}
</style>
