<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back to="/my" />
        </template>
        <div class="text-center">设置</div>
        <template v-slot:right>
          <div style="width: 56px"></div>
        </template>
      </mu-appbar>
    </template>
    <mu-list style="padding-top:0">
      <mu-divider></mu-divider>
      <mu-list-item class="list-item" button :ripple="false">
        <mu-list-item-action>
          邮箱
        </mu-list-item-action>
        <mu-list-item-title style="text-align:right">
          {{ user.user_email }}
        </mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item class="list-item" button :ripple="false">
        <mu-list-item-action>
          手机号
        </mu-list-item-action>
        <mu-list-item-title style="text-align:right">
          {{ user.user_mobile }}
        </mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item class="list-item" button :ripple="false">
        <mu-list-item-action>
          绑定微信号
        </mu-list-item-action>
        <mu-list-item-title
          style="text-align:right"
          v-html="user.power === 0 ? user.account : ''"
        >
        </mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
    <div class="pa-5" style="margin-top:30px">
      <mu-button full-width color="primary" @click="logout">登出</mu-button>
    </div>
  </page>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "MySetting",
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    }
  }
};
</script>
<style lang="scss">
.mu-item-action {
  min-width: 80px;
}

.list-item {
  background: #fff;
}
</style>
