<template>
  <div>
    <div style=" margin:0px 15px 0px 10px" @click.stop="gotolink(data.id)">
      <div class="icon-container">
        <div class="icon-container">
          <span style="font-size:16px; margin:9px 0;">{{ data.name }}</span>
        </div>

        <mu-container class="containerss">
          <mu-flex justify-content="center">
            <mu-button @click.stop="openBotttomSheet">
              <svg-icon icon-class="spot2" style="font-size: 50px;" />
              <!-- <mu-icon size="36" value="more_horiz" color="#999"></mu-icon
            > -->
            </mu-button>
          </mu-flex>
          <mu-bottom-sheet :open.sync="open" class="Cancebackgro ">
            <mu-list @item-click="closeBottomSheet">
              <div class="bagruend asserds">
                <mu-list-item button @click="golises(disables, data.id)">
                  <mu-list-item-title class="mupaper">
                    发布问题
                  </mu-list-item-title>
                </mu-list-item>
                <mu-divider></mu-divider>
                <mu-list-item
                  button
                  @click="Createss(disables, data.id, data.name, data.intro)"
                >
                  <mu-list-item-title class="mupaper">
                    编辑信息
                  </mu-list-item-title>
                </mu-list-item>
                <mu-divider></mu-divider>
                <mu-list-item button @click="MyTeamss(data.id, data.banned)">
                  <mu-list-item-title class="mupaper">
                    {{ disables }}
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
  name: 'MyTeamitem',
  components: {},
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      },
    },
    disable: {
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      open: false,
      chipList: [],
      banned: this.data.banned,
      disables: '禁用',
    };
  },
  mounted() {
    if (this.banned == 0) {
      this.disables = '禁用';
    } else {
      this.disables = '解禁';
    }
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
    golises(elm, e) {
      if (elm == '禁用') {
        this.gotolickss(e);
      } else {
        this.aswewwe();
      }
    },
    aswewwe() {
      this.$alert('小组已被禁用，不可操作', '提示');
    },
    gotolickss(e) {
      this.$router.push({ path: '/fillQuestion', query: { group_id: e } });
    },
    Createss(elm, e, b, d) {
      if (elm == '禁用') {
        this.CreateAgroup(e, b, d);
      } else {
        this.aswewwe();
      }
    },
    CreateAgroup(e, b, d) {
      this.$router.push({
        path: 'CreateAgroup',
        query: { id: e, name: b, intro: d },
      });
    },
    MyTeamss(e, d) {
      this.$emit('MyTeam', { id: e, disable: d });
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
.asserds ::v-deep .mu-item {
  height: 70px;
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
.mupaper {
  height: 100%;
  line-height: 70px;
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
