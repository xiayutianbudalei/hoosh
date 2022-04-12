<template>
  <div class="home-item" v-if="kong">
    <div @click="viewDetail()" class="pa-4">
      <div class="h-title ellipsis-line2">
        {{ datalist.name }}
      </div>
      <mu-row gutter>
        <mu-col :span="datalist.cover ? 8 : 12">
          <div
            class="home-1"
            v-for="(item, index) in datalist.asks"
            :key="index"
          >
            <div @click.stop="gotolink(item.creator.id)">
              <Avatar
                class="mr-2"
                style="vertical-align: middle"
                size="mini"
                :name="item.creator.user_abbr"
                :bgColor="item.creator.user_backcolor"
                :headIcon="item.creator.user_headicon"
              />
            </div>
            <div class="user_name">{{ item.title }}</div>
          </div>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "HomeTeam",
  components: {},
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      datalist: this.data,
      kong: true
    };
  },
  mounted() {
    this.ifdasdd();
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      user: state => state.user.user
    })
  },
  methods: {
    gotolink(e) {
      //指定跳转地址
      this.$router.push({ path: "/toAskFriends", query: { id: e } });
    },
    viewDetail() {
      this.$router.push({
        name: "TeamDetails",
        query: { id: this.datalist.id }
      });
    },
    ifdasdd() {
      if (this.datalist.asks.length == 0) {
        this.kong = false;
      } else {
        this.kong = true;
      }
    }
  }
  // mounted() {
  //   this.chipList = this.data.tags.split(",");
  //   //解决后台未处理的nbsp;
  //   this.data.brief = this.data.brief.replace(/&nbsp;/gi, " ");
  // }
};
</script>
<style lang="scss" scoped>
.demo-chip {
  color: #1bc6b8;
  border-radius: 5px;
  margin-right: 10px;
  line-height: 1.8;
}
.home-item {
  background: #fff;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 1px 1px 2px rgba($color: #7f7f7f, $alpha: 0.1);
}
.h-title {
  font-size: 16px;
  margin-bottom: 8px;
}
.home-1 {
  font-size: 13px;
  color: #7f7f7f;
  padding: 15px 10px;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
}
.desc {
  color: #7f7f7f;
  margin-top: 10px;
  margin-bottom: 10px;
}

// .cover {
//   height: 70px;
//   object-fit: cover;
//   width: 100%;
//   border-radius: 15px;
// }
.user_name {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
::v-deep.mu-refresh-control-noshow {
  margin-top: 1px !important;
}
</style>
