<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back to="/seehsh" />
        </template>
      </mu-appbar>
    </template>
    <mu-container>
      <top-nav>
        <template v-slot:left>
          <Back to="/seehsh" />
        </template>
      </top-nav>
      <div class="title">
        {{ data.title }}
      </div>
      <div class="info-mian mt-4 mb-4">
        <span class="browse mr-2">{{ data.view_count }}浏览</span>
        <span class="time">{{ data.mtime | filter(16) }}</span>
      </div>
      <div class="tag-list mt-4">
        <LabelList :list="data.tags" gotokey="1" />
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
      <div class="mt-2 mb-5 content" v-html="data.content"></div>
    </mu-container>
  </page>
</template>
<script>
import { articleGet } from 'api/subject';
import LabelList from 'components/LabelList';
export default {
  name: 'SeeHooshehaDetail',
  components: {
    LabelList,
  },
  data() {
    return {
      id: this.$route.params.id,
      data: '',
    };
  },
  mounted() {
    this.articleGet();
  },
  methods: {
    articleGet() {
      articleGet({ id: this.id }).then(res => {
        this.data = res.data;
        this.data.tags = this.data.tags.split(',');
        //设置title
        this.$set(this.$route.meta, this.data.title);
        document.title = this.data.title;

        this.$nextTick(() => {
          var objs = document
            .getElementsByClassName('content')[0]
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
.title {
  font-size: 20px;
  margin-top: 10px;
}
.info-mian {
  color: #888;
  font-size: 12px;
}
.tag-list {
  min-height: 32px;
}
.img-vessel {
  object-fit: cover;
  width: 100%;
}
.content {
  & ::v-deep img {
    width: auto !important;
    height: auto !important;
    max-width: 100% !important;
    max-height: 100% !important;
  }
}
</style>
