<template>
  <mu-container>
    <mu-row>
      <mu-col span="0" offset="0" style="margin-top: 2px">
        <mu-paper :z-depth="1">
          <mu-list>
            <mu-list-item avatar>
              <mu-list-item-action avatar>
                <span @click.stop="gotolink(dataArr.id)">
                  <Avatar
                    class="mr-2"
                    style="vertical-align: middle"
                    size="mini"
                    :name="dataArr.user_abbr"
                    :bgColor="dataArr.user_backcolor"
                    :headIcon="dataArr.user_headicon"
                  />
                </span>
                <!-- <mu-avatar>
                  <img :src="dataArr.user_headicon" />
                </mu-avatar> -->
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ dataArr.user_name }}</mu-list-item-title>
              </mu-list-item-content>
              <mu-list-item-action>
                <mu-button flat class="arsge" @click="dianzan">
                  已关注</mu-button
                >
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
export default {
  props: {
    dataArr: {
      type: Object,
      default: function() {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    dianzan() {
      this.$emit("addTodo", { id: this.dataArr.id });
    },
    gotolink(e) {
      //指定跳转地址

      this.$router.push({ path: "/toAskFriends", query: { id: e } });
    }
  }
};
</script>

<style lang="scss" scoped>
.arsge {
  background-color: #9999;
  color: #ffffff;
  border-radius: 6px;
}
</style>
