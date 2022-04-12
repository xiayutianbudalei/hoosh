<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back />
        </template>
        <div class="text-center">全部提问({{ data.version }})</div>
      </mu-appbar>
    </template>
    <mu-stepper :linear="false" orientation="vertical">
      <mu-step v-for="(item, i) in dataList" :key="i" active>
        <mu-step-label>
          <mu-icon
            slot="icon"
            value="panorama_fish_eye"
            color="primary"
          ></mu-icon>
          <mu-badge
            :content="
              item.sub_type === 'why'
                ? '为什么'
                : item.sub_type === 'what'
                ? '是什么'
                : item.sub_type === 'how'
                ? '怎么办'
                : '怎么看'
            "
            color="primary"
          ></mu-badge>
          <span class="ml-3 aqwq">{{ item.ptime | filter(16) }}</span>
        </mu-step-label>
        <mu-step-content>
          <p style="font-size:14px">{{ item.title }}</p>
          <p
            style="color:#ccc; font-size:12px;"
            class="imgses"
            v-html="item.content"
          >
            <!-- {{ item.brief }} -->
          </p>
        </mu-step-content>
      </mu-step>
    </mu-stepper>
  </page>
</template>

<script>
import { getContentTree } from 'api/subject';
export default {
  name: 'allQuestions', //全部提问
  data() {
    //这里存放数据
    return {
      id: this.$route.params.id,
      dataList: [],
      data: '',
    };
  },
  //方法集合
  methods: {
    getData() {
      getContentTree({ id: this.id }).then(res => {
        this.data = res.data.list[0];
        this.dataList = res.data.list;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.mu-appbar ::v-deep .mu-appbar-left {
  position: absolute;
}
.imgses ::v-deep img {
  width: 100%;
}
.aqwq {
  color: #999;
  font-size: 12px;
}
</style>
