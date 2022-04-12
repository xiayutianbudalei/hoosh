<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back to="/goHoosheha" />
        </template>
        <div class="text-center">活动详情</div>
        <template v-slot:right>
          <div style="width: 50px"></div>
        </template>
      </mu-appbar>
    </template>
    <mu-container>
      <div class="title-t">
        {{ data.title }}
      </div>
      <div class="ti-ti">
        <span>{{ data.user_name }}</span>
        <span class="pl-2">{{ data.mtime | filter(16) }}</span>
      </div>
      <div class="mt-2">
        <img
          class="img-vessel"
          preview="1000"
          :preview-text="data.title"
          :src="data.cover"
          alt="文章封面图"
        />
      </div>
      <div class="a-content" v-html="data.content"></div>
    </mu-container>
  </page>
</template>
<script>
import { activityGet } from 'api/subject';
export default {
  name: 'ActivityDetail',
  data() {
    return {
      id: this.$route.params.id,
      data: {
        title: '',
        user_name: '',
        content: '',
        mtime: '',
      },
    };
  },
  mounted() {
    this.activityGet();
  },
  methods: {
    activityGet() {
      activityGet({ id: this.id }).then(res => {
        this.data = res.data;
        //设置title
        this.$set(this.$route.meta, this.data.title);
        document.title = this.data.title;
        this.$nextTick(() => {
          var objs = document
            .getElementsByClassName('a-content')[0]
            .getElementsByTagName('img');

          for (var i = 0; i < objs.length; i++) {
            objs[i].setAttribute('preview', 1);
          }
          this.$previewRefresh();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title-t {
  font-size: 18px;
  margin-top: 20px;
}
.ti-ti {
  font-size: 13px;
  margin-top: 10px;
  color: #999;
}
.a-content {
  word-break: break-word;
  margin-top: 20px;
  & ::v-deep img {
    width: auto !important;
    height: auto !important;
    max-width: 100% !important;
    max-height: 100% !important;
  }
}
.img-vessel {
  object-fit: cover;
  width: 100%;
}
</style>
