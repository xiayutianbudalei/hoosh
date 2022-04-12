<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back />
          <span>返回提问</span>
        </template>
        <div class="text-center">多问一句</div>
      </mu-appbar>
    </template>
    <mu-row gutter>
      <mu-col span="12" class="flex grid_1">
        <span class="name_text">多问线索</span>
        <div class="set_menu">
          <div>
            <div class="moren active" ref="moren" @click="toggleSortMode(0)">
              默认
            </div>
            <div class="zuixin" ref="zuixin" @click="toggleSortMode(1)">
              最新
            </div>
          </div>
        </div>
      </mu-col>
      <!-- <mu-col span="12" class="grid_1">
          <span class="name_text">相关回复</span>
        </mu-col> -->
      <mu-col span="12">
        <OnemoreDetailItem :data="answerData" @update="update" />
      </mu-col>
    </mu-row>
    <template #footer>
      <div class="grid_bottom">
        <mu-text-field
          full-width
          v-model="editMsg"
          placeholder="我要多问一句"
          @focus="focusInput"
        ></mu-text-field
        ><br />
      </div>
    </template>
    <EditOnemore
      @hideoneSheet="hideoneSheet"
      @hideoneSheetAndUpdata="hideoneSheetAndUpdata"
      :passContent="passContent"
      :author="passAuthor"
      :onoff="showEditOneMore"
      :id="passId ? passId : id"
    />
  </page>
</template>

<script>
import { getContentTree } from "api/subject";
import OnemoreDetailItem from "./components/OnemoreDetailItem";
import EditOnemore from "./components/EditOnemore";
export default {
  name: "OneMoreQuestionDetails", //多问一句详情页
  components: { OnemoreDetailItem, EditOnemore },
  data() {
    return {
      id: this.$route.params.id,
      content:
        "活动期间，深圳缴纳社保人员在深圳市政府指定商户购买指定商品，在云闪付绑定银联实体卡，并打开云闪付APP“付款码”",
      dataList: [],
      answerData: [],
      passContent: "",
      passAuthor: "",
      passId: "",
      editMsg: "",
      showEditOneMore: false,
      reqParams: {
        id: this.$route.params.id,
        child_type: "reask",
        order: "default",
        icon: 1
      }
    };
  },
  //方法集合
  methods: {
    toggleSortMode(status) {
      if (status === 0) {
        this.$refs.moren.classList.add("active");
        this.$refs.zuixin.classList.remove("active");
        this.reqParams.order = "default";
        this.getBaseContent();
      } else {
        this.$refs.zuixin.classList.add("active");
        this.$refs.moren.classList.remove("active");
        this.reqParams.order = "time";
        this.getBaseContent();
      }
    },
    hideoneSheet() {
      this.showEditOneMore = false;
    },
    hideoneSheetAndUpdata() {
      this.showEditOneMore = false;
      this.getBaseContent();
    },
    focusInput() {
      if (this.editMsg === "") {
        this.passContent = this.answerData.content;
        this.passId = this.id;
        this.passAuthor = this.answerData.user_name;
        this.showEditOneMore = true;
      }
    },
    update() {
      this.getBaseContent();
    },
    getBaseContent() {
      let params = this.reqParams;
      getContentTree(params).then(res => {
        this.answerData = res.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getBaseContent();
  }
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.mu-appbar ::v-deep .mu-appbar-left {
  position: absolute;
  & > div {
    display: flex;
    align-items: center;
  }
}
.set_menu {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  & > div {
    margin-right: 6px;
    width: 80px;
    border: 1px solid #ccc;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .moren,
    .zuixin {
      width: 40%;
      height: 100%;
      border-radius: 20px;
      text-align: center;
      line-height: 34px;
    }

    .active {
      background: #1bc6b8;
      width: 60%;
      color: snow;
    }
  }
}
.grid_1 {
  padding: 10px 20px 20px;
  .name_text {
    font-size: 20px;
  }
}
.grid_bottom {
  padding: 0 20px;
  & > ::v-deep .mu-input {
    margin-bottom: 0;
  }
}
</style>
