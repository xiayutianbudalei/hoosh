<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width: 60px">
            <Back />
          </div>
        </template>
        <div class="text-center">系统通知</div>
        <template v-slot:right>
          <div style="width: 60px;height: 100%"></div>
        </template>
      </mu-appbar>
    </template>
    <mu-container class="mt-3">
      <mu-load-more>
        <EmaticNotificationitem :dataJson="dataArr" />
      </mu-load-more>
    </mu-container>
  </page>
</template>
<script>
import EmaticNotificationitem from "components/EmaticNotificationitem";
import { getNotice } from "api/user";

export default {
  name: "DynamicMessage",
  components: {
    EmaticNotificationitem
  },
  data() {
    return {
      id: this.$route.query.id,
      dataArr: {}
    };
  },

  mounted() {
    this.getNoticeList();
  },
  methods: {
    getNoticeList() {
      let params = {
        id: this.id
      };
      getNotice(params)
        .then(res => {
          this.dataArr = res.data;
        })
        .catch(() => {
          this.loading = false;
          this.refreshing = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.footer-vessel {
  border-top: 1px solid #ddd;
  width: 100%;
  background: #fff;
}
</style>
