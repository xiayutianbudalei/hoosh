<template>
  <div>
    <mu-button flat slot="right" color="primary" @click="addLabel">
      + 添加标签
    </mu-button>
    <span class="place_holder">选填(最多五个标签)</span>
    <div>
      <mu-chip
        v-for="(item, i) in labelsList"
        :key="i"
        class="demo-chip"
        @delete="handleClose(i)"
        delete
      >
        {{ item }}
      </mu-chip>
    </div>

    <mu-bottom-sheet
      :open.sync="bottomSheet"
      @close="closeSheet"
      style="height:90%"
    >
      <mu-sub-header style="text-align:center">添加标签</mu-sub-header>
      <mu-divider></mu-divider>
      <div class="search-input">
        <mu-text-field
          id="input"
          v-model="searchName"
          placeholder="搜索标签..."
          action-icon="search"
          :max-length="15"
          full-width
          :action-click="search"
          @keydown="enter"
          autocomplete="off"
        ></mu-text-field>
      </div>
      <div style="margin-top:70px; overflow:auto;  height:80%;">
        <mu-list v-for="(item, index) in searchRstList" :key="index">
          <mu-list-item button>
            <mu-list-item-title>{{ item }}</mu-list-item-title>
            <mu-list-item-action>
              <mu-button color="primary" small @click="addItem(item)">
                添加
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
        <div class="flex ml-3 mr-3" v-if="noData">
          <div class="flexItem">{{ nodataPlaceText }}</div>
          <mu-button
            v-show="nodataPlaceText !== '标签列表中已存在相同标签'"
            color="primary"
            small
            @click="addItem(null)"
          >
            新增
          </mu-button>
        </div>
      </div>
    </mu-bottom-sheet>
  </div>
</template>

<script>
import { findTags } from 'api/subject';
export default {
  name: 'chooselabel',
  components: {},
  data() {
    return {
      bottomSheet: false,
      searchName: '',
      labelsList: [],
      searchRstList: [], //['star']
      noData: false,
      nodataPlaceText: '暂无匹配的标签',
    };
  },
  //方法集合
  methods: {
    addLabel() {
      this.bottomSheet = true;
    },
    closeSheet() {
      this.searchName = '';
      this.searchRstList = '';
      this.noData = false;
    },
    //删除某个标签
    handleClose(i) {
      this.labelsList.splice(i, 1);
      this.$emit('getTags', this.labelsList);
    },
    //将某个指定标签添加到选择框
    addItem(item) {
      let obj = item ? item : this.searchName;
      if (this.labelsList.length === 5) {
        //标签数量不大于5
        this.$toast.error('标签数量应不大于5,请确认后添加');
        return;
      }
      if (!this.labelsList.includes(obj)) {
        //现有 labellist列表中不存在该项标签
        this.labelsList.push(obj);
      }
      this.bottomSheet = false;
      this.closeSheet();
      this.$emit('getTags', this.labelsList);
    },
    enter(e) {
      if (e.keyCode === 13 || e.keyCode === 9) {
        this.search();
      }
    },
    search() {
      this.noData = false;
      let params = {
        page: 1,
        limit: 1000,
        key: this.searchName,
      };
      if (this.searchName.length > 15) {
        this.$toast.error('标签名长度应不大于15,请确认后重新输入');
        return;
      }
      findTags(params).then(res => {
        this.searchRstList = res.data.list;
        if (this.searchRstList.length === 0) {
          if (this.labelsList.includes(this.searchName)) {
            //当前 labellist已存在搜索的标签
            this.nodataPlaceText = '标签列表中已存在相同标签';
          } else {
            this.nodataPlaceText = '暂无匹配的标签';
          }
          this.noData = true;
        } else {
          if (!this.searchRstList.includes(this.searchName)) {
            //查询结果列表 与 查询内容 非精确匹配
            this.searchRstList.push(this.searchName);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.search-input {
  position: absolute;
  top: 60px;
  left: 15px;
  right: 15px;
}
.place_holder {
  color: #ccc;
}
.demo-chip {
  margin: 8px;
  vertical-align: middle;
  color: #00cccc;
}
.no_data {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mu-input ::v-deep .mu-input-help {
  right: 20px;
}
</style>
