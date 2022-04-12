<template>
  <span>
    <input
      style="display:none"
      type="file"
      id="file"
      name="file"
      accept="image/*"
      @change="beforeUpload($event)"
    />
    <svg-icon
      icon-class="picture"
      style="font-size: 24px;"
      @click="chooseFile()"
    />

    <!-- <mu-icon
      size="30"
      color="#888"
      value="image"
   
    ></mu-icon> -->
  </span>
</template>

<script>
import axios from 'axios';
// import NProgress from "muse-ui-progress";

export default {
  name: 'ImgHandler', //单独处理图片
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    isFocus: {
      type: Boolean,
      value: false,
    },
  },
  data() {
    //这里存放数据
    return {
      uploadActionUrl: `${process.env.VUE_APP_BASE_API}/user/info/upload?token=${this.$store.getters.token}`, //`${process.env.VUE_APP_BASE_API}/user/info/upload?token=${this.$store.getters.token}`,

      imgUrl: '',
    };
  },
  //方法集合
  methods: {
    chooseFile() {
      if (this.isFocus) {
        document.getElementById('file').click();
        this.$emit('is-focus-value', 'false');
      } else {
        this.$alert(
          '请在详细描述里添加图片，无法在“一句话描述”中添加图片',
          '提示'
        );
      }
    },
    beforeUpload(e) {
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        // this.$toast.warning(this.$t("setting-tips-imgMoreLimit"));
        console.log('图片格式错误');
        this.$toast.error('图片格式错误,请确认后再填');
        return false;
      }
      let fileMaxSize = 1024 * 5;
      let PictureSize = e.target.files[0].size / 1024;
      if (PictureSize >= fileMaxSize) {
        this.$alert('请上传小于5M的图片', '提示');
        return false;
      } else if (PictureSize < 0) {
        this.$alert('上传的图片不能为0M', '提示');
        return false;
      }
      this.$emit('progress-bar-value', 1);

      let file = e.target.files[0];

      const formData = new FormData();
      formData.append('file', file);
      axios
        .post(this.uploadActionUrl, formData, {
          contentType: false,
          processData: false,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // lang: this.$store.getters.lang,
          },
        })
        .then(async res => {
          this.imgUrl = res.data.data.url;
          this.$emit('progress-bar-value', 99);

          await this.$emit('imgData', this.imgUrl);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss"></style>
