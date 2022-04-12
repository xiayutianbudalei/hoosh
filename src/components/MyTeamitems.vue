<template>
  <div>
    <div style=" margin:0px 15px 0px 10px" @click.stop="gotolink(data.id)">
      <div class="icon-container">
        <div class="icon-container">
          <Avatar
            class="wixi"
            size="xiaoyidian"
            :name="data.creator.user_abbr"
            :bgColor="data.creator.user_backcolor"
            :headIcon="data.creator.user_headicon"
          />

          <span class=" ml-2 mt-3 mb-3 ">{{ data.name }}</span>
        </div>

        <mu-container class="containerss">
          <mu-flex justify-content="center">
            <mu-button @click.stop="openBotttomSheet">
              <svg-icon icon-class="spot2" style="font-size: 50px;" />
              <!-- <mu-icon size="36" value="more_horiz" color="#999"></mu-icon> -->
            </mu-button>
          </mu-flex>
          <mu-bottom-sheet :open.sync="open" class="Cancebackgro ">
            <mu-list @item-click="closeBottomSheet">
              <div class="bagruend asserds">
                <mu-list-item button @click="goleskss(data.banned, data.id)">
                  <mu-list-item-title class="mupaper">
                    发布问题
                  </mu-list-item-title>
                </mu-list-item>
                <mu-divider></mu-divider>
                <mu-list-item button @click="exitas(data.id)">
                  <mu-list-item-title class="mupaper">
                    退出小组
                  </mu-list-item-title>
                </mu-list-item>
              </div>
            </mu-list>
            <mu-list @item-click="closeBottomSheet">
              <div class="bagruend">
                <mu-list-item button>
                  <mu-list-item-title class="mupaperss ">
                    取消
                  </mu-list-item-title>
                </mu-list-item>
              </div>
            </mu-list>
          </mu-bottom-sheet>
        </mu-container>
      </div>
      <div class="jianjie">
        {{ data.intro }}
      </div>
      <div style=" margin-bottom:10px; color: #999;">
        <span>{{ data.ptime | filter(16) }}</span>
        <span class="ml-2">{{ data.ask_count }}提问</span>
        <span class="ml-2">|</span>
        <span class="ml-2">{{ data.member_count }}成员</span>
      </div>
      <mu-divider></mu-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTeamitems',
  components: {},
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      open: false,
      chipList: [],
    };
  },

  methods: {
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    gotolink(e) {
      this.$router.push({ path: '/teamdetails', query: { id: e } });
    },
    gotolickss(e) {
      this.$router.push({ path: '/fillQuestion', query: { group_id: e } });
    },
    CreateAgroup(e) {
      this.$router.push({
        path: 'CreateAgroup',
        query: { id: e },
      });
    },

    aswewwe() {
      this.$alert('小组已被禁用，不可操作', '提示');
    },
    goleskss(elm, e) {
      if (elm == '0') {
        this.gotolickss(e);
      } else {
        this.aswewwe();
      }
    },

    exitas(e) {
      this.$emit('exit', { id: e });
    },
  },
};
</script>

<style lang="scss" scoped="scoped">
.icon-container {
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.jianjie {
  color: #999;
  max-width: 90%;
  margin: 10px 0;
  overflow: hidden; //超出一行文字自动隐藏
  text-overflow: ellipsis; //文字隐藏后添加省略号
  white-space: nowrap; //强制不换行
}
.containerss {
  margin: 1px 0;
  width: 20%;
}
.mu-raised-button {
  background-color: #fafafa;
  box-shadow: 0 0 0 0;
  -webkit-box-shadow: 0 0 0 0;
}
.Cancebackgro {
  background-color: transparent;
}
.bagruend {
  background-color: #ffffff;
  margin: 0 10px;
  padding: 0 5px;
  border-radius: 5px;
}
.asserds ::v-deep .mu-item {
  height: 70px;
}
.mupaper {
  height: 100%;
  line-height: 70px;
  height: 100%;
  text-align: center;
}
.mupaperss {
  height: 100%;
  line-height: 48px;
  border-radius: 5px;
  height: 100%;
  text-align: center;
}
</style>
