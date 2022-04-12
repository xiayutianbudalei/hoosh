<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <div class="text-center">问哈</div>
      </mu-appbar>
    </template>
    <mu-container>
      <mu-text-field
        style="margin-top: 50px"
        v-model="inputcode"
        placeholder="请输入访问码"
        full-width
      ></mu-text-field>
      <mu-button color="primary" full-width @click="toDetail"
        >立即进入</mu-button
      >
    </mu-container>
  </page>
</template>
<script>
import { passwordMd5 } from "utils";
export default {
  name: "AccessCode",
  data() {
    return {
      id: this.$route.query.id,
      access_token: this.$route.query.access_token,
      share: this.$route.query.share,
      inputcode: ""
    };
  },
  methods: {
    toDetail() {
      const inputCode = passwordMd5(this.access_token).substring(0, 6);
      if (this.inputcode === inputCode) {
        this.$router.push({
          name: "QuestionsDetail",
          params: {
            id: this.id,
            access_token: this.access_token,
            share: this.share
          }
        });
      } else {
        this.$toast.error("访问码错误，请确认后输入");
      }
    }
  }
};
</script>
