<template>
  <div>
    <mu-bottom-sheet
      :open.sync="changeType"
      style="height:90%"
      @close="closeSheet"
    >
      <mu-appbar>
        <div icon slot="left" @click="closeSheet" class="btn_close">
          取消
        </div>
        <div icon slot="right" class="btn_pub" @click.once="publish">
          发布
        </div>
      </mu-appbar>
      <div class="d-box">
        <div class="ml-2 ellipsis mt-4 mb-3">
          {{ content }}
        </div>
        <!-- <mu-text-field
        v-model="inputMsg"
        full-width
        :placeholder="placeText"
        multi-line
        :rows="15"
      ></mu-text-field> -->

        <div
          class="self-input"
          id="databox"
          contenteditable
          @input="initContent"
          :placeholder="placeText"
        ></div>
        <div class="bottom_menu">
          <mu-flex class="demo-linear-progress" v-if="progressBar">
            <mu-linear-progress
              mode="determinate"
              :value="progress"
              :size="10"
              color="#1bc6b8"
            ></mu-linear-progress>
          </mu-flex>
          <mu-divider></mu-divider>

          <ImgHandler
            :is-focus="isFocus"
            @progress-bar-value="progressBarValue"
            @is-focus-value="isFocusValue"
            @imgData="getImgData"
          />

          <!-- <mu-icon value="image"></mu-icon> -->
        </div>
      </div>
    </mu-bottom-sheet>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ImgHandler from './ImgHandler';
import { addAnswer } from 'api/subject';
export default {
  name: 'EditAnswer',
  props: {
    onoff: { type: Boolean, default: false },
    content: { type: String, default: '' },
    id: { type: [String, Number] },
  },
  //import引入的组件需要注入到对象中才能使用
  components: { ImgHandler },
  data() {
    //这里存放数据
    return {
      progressBar: false,
      progress: 0,
      isFocus: true,
      placeText: '输入回答内容',
      inputMsg: '',
      changeType: false,
    };
  },
  mounted() {
    this.changeType = this.onoff;
  },
  watch: {
    onoff(newval) {
      this.changeType = newval;
    },
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
  //方法集合
  methods: {
    progres() {
      return setTimeout(() => {
        for (var i = 1; i < 98; i++) {
          this.progress = i;
        }
      }, 100);
    },
    isFocusValue() {
      // console.log(el);
      this.isFocus = true;
    },
    isDetailFocus() {
      this.isFocus = true;
    },
    progressBarValue(el) {
      this.progress = el;
    },
    closeSheet() {
      this.$emit('hidetwoSheet');
    },
    initContent() {
      this.inputMsg = document.getElementById('databox').innerHTML;
      // if (this.inputMsg) {
      //   this.inputMsg = this.inputMsg.replace(/&nbsp;/gi, "");
      // }
      // let imgBox = document.getElementsByClassName("self-img");
      // for (var i = 0; i < imgBox.length; i++)
      //   imgBox[i].onclick = function() {
      //     this.remove();
      //   };
    },
    getImgData(imgSrc) {
      //如果需要上传封面图：
      // this.imgCount++;
      // if (this.imgCount === 1) {
      //   this.cover = data;
      // }
      this.$toast.success('图片上传成功');
      let initHtml = `<div style="text-align:center"><img src="${imgSrc}" id="self-img-${this.imgCount}" class="self-img"></div>`;
      document.getElementById('databox').innerHTML += initHtml;
      document.getElementById('databox').focus();
      this.$nextTick(() => {
        this.getSelectPos('databox');
      });
      this.initContent();
    },
    getSelectPos(obj) {
      var esrc = document.getElementById(obj);
      var range = document.createRange();
      range.selectNodeContents(esrc);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    },
    publish() {
      let params = {
        title: this.content,
        content: this.inputMsg,
        parent_id: this.id,
      };
      this.testContent(params);
      if (!this.guard) {
        return;
      }
      addAnswer(params).then(res => {
        this.inputMsg = '';
        this.$toast.success('回答发表成功');
        this.$emit('hidetwoSheetAndUpdata', res.data.id);
      });
    },
    testContent(data) {
      this.guard = false;
      if (!data.content) {
        this.$toast.info('请填写内容');
        return;
      }
      if (!data.parent_id) {
        this.$toast.info('父节点为空');
        return;
      }
      this.guard = true;
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.d-box {
  display: flex;
  flex-direction: column;
  height: calc(100% - 58px);
}
.btn_close {
  padding-left: 10px;
  font-size: 16px;
}
.btn_pub {
  padding-right: 10px;
  font-size: 16px;
  color: #1bc6b8;
}
.sub_text {
  padding: 0 15px;
}
.mu-input {
  ::v-deep .mu-text-field {
    padding: 0 30px;
  }
}
.button-wrapper ::v-deep .mu-tabs-inverse {
  background: #fff;
}
.bottom_menu {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  & ::v-deep i {
    font-size: 44px;
    margin: 6px 10px 0;
  }
}
.self-input {
  outline: none;
  width: 100%;
  overflow: auto;
  min-height: 200px;
  max-height: 300px;
  line-height: 24px;
  font-size: 14px;
  padding: 5px 8px;
  border: 1px solid #bbb;

  & ::v-deep img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
.self-input:focus {
  border: 1px solid #1bc6b8;
}
.self-input:empty::before {
  content: attr(placeholder);
}
</style>
