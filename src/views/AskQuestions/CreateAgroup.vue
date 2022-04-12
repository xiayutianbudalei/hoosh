<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back />
        </template>
        <div class="text-center">{{ creact }}</div>
        <template v-slot:right class="nav_flex">
          <mu-button flat :color="btnColor" @click="droupAdd">提交</mu-button>
        </template>
      </mu-appbar>
    </template>
    <mu-container>
      <mu-row gutter>
        <mu-col span="12" class="grid-cell">
          <mu-form ref="form" :model="obj" class="mu-demo-form mt-3">
            <mu-form-item prop="name" :rules="questionTitleRules">
              <mu-text-field
                v-model="obj.name"
                placeholder="问答小组名称（12个字符）"
                full-width
                multi-line
                :rows="3"
                :rows-max="5"
                underline-color="primary"
              ></mu-text-field>
            </mu-form-item>
          </mu-form>
        </mu-col>
        <mu-text-field
          style="margin-top: 40px;"
          v-model="obj.intro"
          full-width
          ref="intro"
          class="self-input"
          id="databox"
          placeholder="小组简介(选填 ，120个字符)"
          underline-color="#1bc6b8"
          multi-line
          :rows="12"
          :max-length="120"
        ></mu-text-field
        ><br />
      </mu-row>
    </mu-container>
  </page>
</template>

<script>
import { droupAdd, modify } from "api/subject";
export default {
  name: "CreateAgroup", //填写问题
  components: {},
  data() {
    return {
      creact: "编辑信息",
      open: false,
      trigger: null,
      activeLabel: 0,
      questionTitleRules: [
        { validate: val => !!val, message: "请填写一个组名" },
        { validate: val => val.length < 13, message: "组名不能大于12" }
      ],
      groupid: null,
      obj: {
        id: this.$route.query.id,
        intro: this.$route.query.intro,
        name: this.$route.query.name
      },
      imgCount: 0,
      btndisabled: false, //限制重复点击
      btnColor: "#1bc6b8" //调整按钮状态样式
    };
  },
  mounted() {
    // if (this.obj.intro == null) {
    //   this.creact = "创建小组";
    // } else {
    //   this.creact = "编辑信息";
    // }
  },
  methods: {
    getImgData(imgSrc) {
      this.imgCount++;
      if (this.imgCount === 1) {
        this.obj.cover = imgSrc;
      }
      let initHtml = `<div style="text-align:center"><img src="${imgSrc}"  id="self-img-${this.imgCount}" class="self-img"></div>`;
      document.getElementById("databox").innerHTML += initHtml;
      document.getElementById("databox").focus();
    },

    droupAdd() {
      if (!this.btndisabled) {
        if (this.obj.name) {
          if (this.obj.name.length > 12) {
            this.$toast.error("组名不能大于12");
            this.btndisabled = false;
            return false;
          }
          this.btndisabled = true;

          if (this.obj.id) {
            //修订当前问题
            modify(this.obj)
              .then(() => {
                this.$toast.success("小组信息修订成功");
                this.$router.replace({
                  name: "TeamDetails",
                  query: { id: this.obj.id }
                });
                this.btndisabled = false;
              })
              .finally(() => {
                this.btndisabled = false;
              });
          } else {
            //新增问题
            droupAdd(this.obj)
              .then(res => {
                // const { total } = res.data.id;
                // console.log(total);
                this.groupid = res.data.id;
                this.$toast.success("小组创建成功");
                this.$router.replace({
                  name: "TeamDetails",
                  query: { id: this.groupid }
                });
              })
              .finally(() => {
                this.btndisabled = false;
              });
          }
        } else {
          this.$toast.error("请输入小组名称");
        }
      }
    }
  }
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
