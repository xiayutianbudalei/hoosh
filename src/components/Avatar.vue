<template>
  <div
    v-if="headIcon === ''"
    :class="computedClass"
    :style="{ background: bgColor }"
  >
    {{ name }}
  </div>
  <div v-else :class="computedClass">
    <img :src="headIcon" width="100%" height="100%" />
  </div>
</template>
<script>
export default {
  name: "Avatar",
  props: {
    size: {
      type: [String, Number],
      default: "medium"
    },
    name: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: "#1BC6B8"
    },
    headIcon: {
      type: String,
      default: ""
    }
  },

  computed: {
    computedClass: function(vm) {
      const { size } = vm;
      return {
        [size]: true,
        avatar: true
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar {
  position: relative;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  display: inline-block;
  overflow: hidden;
}

.small {
  height: 55px;
  width: 55px;
  line-height: 55px;
  font-size: 18px;
}
.smallqq {
  height: 75px;
  width: 75px;
  line-height: 75px;
  font-size: 20px;
}
.mini {
  height: 30px;
  width: 30px;
  line-height: 30px;
  font-size: 14px;
}

.gexiao {
  height: 24px;
  width: 24px;
  line-height: 24px;
  font-size: 12px;
}
.xiaoyidian {
  height: 38px;
  width: 38px;
  line-height: 38px;
  font-size: 16px;
}

.medium {
  height: 70px;
  width: 70px;
  line-height: 70px;
  font-size: 20px;
}
</style>
