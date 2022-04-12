<template>
  <div>
    <mu-bottom-sheet
      :open.sync="changeType"
      style="height:80%"
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
          [{{ type }}]{{ author }}:{{ passContent }}
        </div>
        <div class="flexItem mb-3">
          <textarea
            class="textarea-box"
            v-model="inputMsg"
            :placeholder="placeText"
          ></textarea>
          <!-- <mu-text-field
            v-model="inputMsg"
            full-width
            :placeholder="placeText"
            multi-line
            :rows="11"
          ></mu-text-field> -->
        </div>
        <TabLabelList
          class="mb-2"
          :list="tabList"
          :value="curLabel"
          @change="labelValue"
        />
      </div>
      <!-- <div class="bottom_menu">
       
      </div> -->
    </mu-bottom-sheet>
  </div>
</template>

<script>
import { addReask } from 'api/subject';
import TabLabelList from './TabLabelList';
export default {
  name: 'EditOnemore',
  props: {
    onoffa: { type: Boolean, default: false },
    passContent: { type: String, default: '' },
    author: { type: String, default: '' },
    parameter: { type: Number },
    id: { type: [String, Number] },
  },
  components: { TabLabelList },
  data() {
    return {
      tabListone: ['替换', '反问', '追问', '回答'],
      tabListtwo: ['替换', '反问', '追问'],
      tabList: [],
      placeText: '写明替换的原由',
      inputMsg: '',
      type: '多问一句',
      changeType: false,
      sub_type: 'replace',
      curLabel: '替换',
      guard: false,
      disappear: null,
    };
  },
  mounted() {
    this.disappear = this.parameter;
    if (this.disappear == 1) {
      this.tabList = this.tabListtwo;
    } else {
      this.tabList = this.tabListone;
    }
    this.changeType = this.onoffa;
  },
  watch: {
    parameter(newval) {
      this.disappear = newval;
      if (newval == 1) {
        this.tabList = this.tabListtwo;
      } else {
        this.tabList = this.tabListone;
      }
    },
    onoffa(newval) {
      this.labelValue('替换');
      this.changeType = newval;
    },
  },
  methods: {
    publish() {
      let params = {
        sub_type: this.sub_type,
        title: 'default',
        content: this.inputMsg,
        parent_id: this.id,
      };
      this.testContent(params);
      if (!this.guard) {
        return;
      }
      addReask(params).then(res => {
        this.inputMsg = '';
        this.$toast.success('多问一句发表成功');
        this.$emit('hideoneSheetAndUpdata', res.data.id);
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
    closeSheet() {
      this.curLabel = '替换';
      this.inputMsg = '';
      // this.onoffa = false;
      this.$emit('hideoneSheet');
    },
    labelValue(el) {
      this.curLabel = el;
      switch (el) {
        case '追问':
          this.placeText = '问因的因、果的果';
          this.sub_type = 'continue';
          //...
          break;
        case '反问':
          this.placeText = '质疑提问中的要素';
          this.sub_type = 'back';
          break;
        case '回答':
          this.placeText = '输入回复内容';
          this.sub_type = 'answer';
          break;
        default:
          this.placeText = '写明替换的原由';
          this.sub_type = 'replace';
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.d-box {
  display: flex;
  flex-direction: column;
  height: calc(100% - 58px);
}

.textarea-box {
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  display: block;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 100%;
  outline: none;
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
    padding: 0 18px;
    font-size: 14px;
  }
}
.button-wrapper ::v-deep .mu-tabs-inverse {
  background: #fff;
}
.bottom_menu {
  position: absolute;
  bottom: 5px;
  left: 0;
}
</style>
