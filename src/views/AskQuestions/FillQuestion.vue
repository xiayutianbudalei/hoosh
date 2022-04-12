<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back />
        </template>
        <template v-slot:right class="nav_flex">
          <mu-button flat :color="btnColor" @click="reviseAsk">
            发布问题
          </mu-button>
        </template>
      </mu-appbar>
    </template>
    <mu-container>
      <mu-row gutter>
        <mu-col span="12" class="grid-cell">
          <TabLabelList
            class="mt-2"
            :list="tabLabelList"
            :value="tabLabelList[0]"
            @change="changeTap"
          />
        </mu-col>
        <mu-col span="12" class="grid-cell">
          <mu-form ref="form" :model="obj" class="mu-demo-form mt-3">
            <mu-form-item prop="title" :rules="questionTitleRules">
              <mu-text-field
                v-model="obj.title"
                placeholder="一句话描述问题"
                full-width
                multi-line
                :rows="3"
                :rows-max="5"
                underline-color="primary"
              ></mu-text-field>
            </mu-form-item>
          </mu-form>
        </mu-col>
        <mu-col span="12" class="grid-cell">
          <mu-divider class="mb-5"></mu-divider>
          <mu-flex class="demo-linear-progress" v-if="progressBar">
            <mu-linear-progress
              class="aaaa"
              mode="determinate"
              :value="progress"
              :size="10"
              color="#1bc6b8"
            ></mu-linear-progress>
          </mu-flex>
          <div
            ref="textareaRef"
            class="self-input"
            id="databox"
            @keyup="keyupDiv"
            contenteditable
            @focus="isDetailFocus"
            @input="initContent"
            placeholder="问题的详细描述(选填)"
          ></div>
          <mu-divider class="mb-5"></mu-divider>
        </mu-col>
        <mu-col span="12" class="grid-cell">
          <ChooseLabel @getTags="getTags" />
        </mu-col>
      </mu-row>
    </mu-container>
    <template #footer>
      <div class="upload-img">
        <ImgHandler
          :is-focus="isFocus"
          @progress-bar-value="progressBarValue"
          @is-focus-value="isFocusValue"
          @imgData="getImgData"
        />
      </div>
    </template>
  </page>
</template>

<script>
import { addAsk, reviseAsk } from 'api/subject';
import TabLabelList from './components/TabLabelList';
import ChooseLabel from './components/ChooseLabel';
import ImgHandler from './components/ImgHandler';
export default {
  name: 'fillQuestion', //填写问题
  components: { ChooseLabel, ImgHandler, TabLabelList },
  data() {
    return {
      progressBar: false,
      progress: 0,
      open: false,
      isFocus: false,
      trigger: null,
      tabLabelList: ['为什么', '怎么办', '怎么看'],
      activeLabel: 0,
      questionTitleRules: [
        { validate: val => !!val, message: '请填写一句话描述' },
        { validate: val => val.length > 3, message: '一句话描述长度大于3' },
      ],

      obj: {
        id: this.$route.query.id,
        sub_type: 'why',
        title: '',
        content: '',
        cover: '',
        tags: '',
        hide_flag: 0,
        group_id: this.$route.query.group_id,
      },

      cover: '',
      imgCount: 0,
      btndisabled: false, //限制重复点击发布
      btnColor: '#1bc6b8', //调整发布按钮状态样式
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        //键盘弹起与隐藏都会引起窗口的高度发生变化
        const resizeHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        // eslint-disable-next-line no-undef
        if (resizeHeight - 0 < originalHeight - 0) {
          //当软键盘弹起，在此处操作
          console.log('进入到软键盘弹起=========');
          document
            .querySelector('body')
            // eslint-disable-next-line no-undef
            .setAttribute('style', 'height:' + originalHeight + 'px;');
          this.scrollerHeight = resizeHeight;
        } else {
          //当软键盘收起，在此处操作
          console.log('进入到软键盘收起=========');
          document.querySelector('body').setAttribute('style', 'height:100%;');
          this.scrollerHeight = '100%';
        }
      })();
    };
  },
  watch: {
    progress(newval) {
      if (newval == 1) {
        this.progressBar = true;
        this.progres();
      }
      if (newval == 99) {
        this.progressBar = false;
      }
    },
  },
  methods: {
    progres() {
      return setTimeout(() => {
        for (var i = 1; i < 98; i++) {
          this.progress = i;
        }
      }, 100);
    },
    isDetailFocus() {
      this.isFocus = true;
    },
    isFocusValue() {
      this.isFocus = false;
    },
    changeTap(value) {
      let turnProp = '';
      switch (value) {
        case '为什么':
          turnProp = 'why';
          break;
        case '怎么看':
          turnProp = 'think';
          break;
        case '怎么办':
          turnProp = 'how';
          break;
        default:
          turnProp = 'why';
          break;
      }
      this.obj.sub_type = turnProp;
    },
    keyupDiv() {
      const imgdoms = document.querySelectorAll('img');
      if (imgdoms.length == 0) {
        this.obj.cover = '';
      }
    },
    getImgData(imgSrc) {
      this.$toast.success('图片上传成功');
      let initHtml = `<div style="text-align:center"><img src="${imgSrc}"  class="self-img"></div>`;
      document.getElementById('databox').innerHTML += initHtml;
      document.getElementById('databox').focus();
      this.isFocus = false;
    },
    initContent(e) {
      const content = e.currentTarget.innerHTML;
      this.obj.content = content;
    },
    progressBarValue(el) {
      this.progress = el;
    },
    // getImgData(data) {
    //   this.imgCount++;
    //   if (this.imgCount === 1) {
    //     this.cover = data;
    //   }
    //   let initHtml = `<div><img src="${data}" id="self-img-${this.imgCount}" class="self-img"></div>`;
    //   document.getElementById("databox").innerHTML += initHtml;
    //   // document.getElementById("databox").focus();
    //   this.$nextTick(() => {
    //     this.getSelectPos("databox");
    //   });
    //   this.initContent();
    // },
    // initContent() {
    //   this.validateForm.questionContent = document.getElementById(
    //     "databox"
    //   ).innerHTML;
    //   if (this.inputMsg) {
    //     this.inputMsg = this.inputMsg.replace(/&nbsp;/gi, "");
    //   }
    //   let imgBox = document.getElementsByClassName("self-img");
    //   for (var i = 0; i < imgBox.length; i++)
    //     imgBox[i].onclick = function() {
    //       this.remove();
    //     };
    // },
    // getSelectPos(obj) {
    //   var esrc = document.getElementById(obj);
    //   var range = document.createRange();
    //   range.selectNodeContents(esrc);
    //   range.collapse(false);
    //   var sel = window.getSelection();
    //   sel.removeAllRanges();
    //   sel.addRange(range);
    // },
    getTags(el) {
      this.obj.tags = el.toString();
    },
    reviseAsk() {
      if (!this.btndisabled) {
        if (this.obj.title) {
          if (this.obj.title.length < 3) {
            this.$toast.error('一句话描述长度大于3');
            return;
          }
          this.btndisabled = true;
          this.obj.content = this.$refs.textareaRef.innerHTML;
          const img = document.querySelector('#databox img');
          this.obj.cover = img ? img.src : '';
          if (this.obj.id !== undefined) {
            //修订当前问题
            reviseAsk(this.obj)
              .then(() => {
                this.$toast.success('问题修订成功');
                this.obj.title = '';
                this.$router.replace({
                  name: 'QuestionsDetail',
                  params: {
                    id: this.obj.id,
                  },
                });
              })
              .finally(() => {
                this.btndisabled = false;
              });
          } else {
            //新增问题
            addAsk(this.obj)
              .then(res => {
                this.$toast.success('问题添加成功');
                this.obj.title = '';
                const { total } = res.data.id;
                console.log(total);
                this.$router.replace({
                  name: 'QuestionsDetail',
                  params: {
                    id: res.data.id,
                  },
                });
              })
              .finally(() => {
                this.btndisabled = false;
              });
            // console.log(this.group_id);
          }
        } else {
          this.$toast.error('请填写一句话描述');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mu-form ::v-deep .mu-input-line {
  display: none;
}
.mu-input {
  ::v-deep .mu-input-label,
  ::v-deep .mu-text-field {
    padding: 0 10px 10px;
  }
}
/**css样式*/
.self-input {
  outline: none;
  width: 100%;
  min-height: 200px;
  line-height: 24px;
  font-size: 14px;
  padding: 5px 8px;
  & ::v-deep img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
// .adder {
//   text-align: end;
// }

.self-input:focus {
  border: 1px solid #1bc6b8;
}
.self-input:empty::before {
  content: attr(placeholder);
  color: #7f7f7f;
  font-size: 16px;
}
.upload-img {
  background: #fff;
  padding: 5px 15px;
}
.mu-button-wrapper {
  padding: 0 30px;
}
.mu-ripple-wrapper {
  margin-right: 20px;
}
</style>
