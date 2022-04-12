<template>
  <div class="seehsh-item" @click="goToPage">
    <div class="title">{{ data.title }}</div>
    <img class="img-vessel" :src="data.cover" alt v-if="data.cover" />
    <div class="item-info">
      <span class="mr-2">{{ data.view_count }} 浏览</span>
      <span>{{ data.ptime | filter(16) }}</span>
    </div>
  </div>
</template>
<script>
import img from 'assets/images/u2101.png';
export default {
  name: 'seehsh',
  props: ['data'],
  data() {
    return {
      img,
    };
  },
  mounted() {
    // console.log(this.$attrs);
  },
  methods: {
    goToPage() {
      this.$router.push({
        name: 'SeeHooshehaDetail',
        params: { id: this.data.id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.seehsh-item {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px rgba($color: #7f7f7f, $alpha: 0.1);
}
.title {
  font-size: 16px;
  margin-bottom: 10px;
}
.item-info {
  color: #999;
  font-size: 13px;
  margin-top: 10px;
}

.img-vessel {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
