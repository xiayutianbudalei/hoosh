<template>
  <mu-button icon style="vertical-align:middle" @click="goBack">
    <svg-icon
      icon-class="icon-left1"
      v-if="Icon"
      style="font-size: 50px;font-weight:bold"
    />
    <svg-icon icon-class="icon-left2" v-if="!Icon" style="font-size: 50px; " />
  </mu-button>
</template>
<script>
export default {
  name: 'Back',
  props: {
    to: String,
    Icon: {
      type: String,
      default: function() {
        return '';
      },
    },
  },
  methods: {
    goBack() {
      this.to ? this.$router.push(this.to) : this.$router.back();
    },
  },
};
</script>
