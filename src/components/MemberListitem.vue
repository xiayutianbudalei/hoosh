<template>
  <mu-container>
    <mu-row>
      <mu-col span="0" offset="0" style="margin-top: 2px">
        <mu-paper :z-depth="1">
          <mu-list>
            <mu-list-item avatar>
              <span @click.stop="gotolink(dataArr.id)">
                <Avatar
                  class="mr-2"
                  style="vertical-align: middle"
                  size="xiaoyidian"
                  :name="dataArr.user_abbr"
                  :bgColor="dataArr.user_backcolor"
                  :headIcon="dataArr.user_headicon"
                />
              </span>
              <mu-list-item-title>{{ dataArr.user_name }}</mu-list-item-title>
              <mu-list-item-action class="arsgess" v-show="groupleader">
                <div flat class="dkfg">组长</div>
              </mu-list-item-action>
              <mu-list-item-action>
                <mu-button flat class="arsge" @click="yichu" v-show="remove"
                  >移除</mu-button
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
    },
    curUserId: {
      type: Number,
      default: function() {}
    },
    group: {
      type: Number,
      default: function() {}
    }
  },
  data() {
    return {
      datajson: this.dataArr.id,
      nid: this.curUserId,
      founder: this.group,
      groupleader: false,
      remove: true
    };
  },
  mounted() {
    this.judge();
  },

  methods: {
    yichu() {
      this.$emit("removemember", { id: this.dataArr.id });
    },
    gotolink(e) {
      //指定跳转地址

      this.$router.push({ path: "/toAskFriends", query: { id: e } });
    },
    judge() {
      if (this.founder == this.nid) {
        if (this.founder == this.datajson) {
          this.remove = false;
          this.groupleader = true;
        } else {
          this.remove = true;
          this.groupleader = false;
        }
      } else {
        if (this.founder == this.datajson) {
          this.remove = false;
          this.groupleader = true;
        } else {
          this.remove = false;
          this.groupleader = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.arsge {
  color: red;
  border-radius: 6px;
}
.arsgess {
  height: 50%;
  margin-right: 70px;
  background-color: #00cccc;
  color: #fff;
  text-align: center;
  border-radius: 5px;
}
.dkfg {
  margin-right: 12px;
}
</style>
