<template>
  <page ref="page">
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <div style="width: 60px">
            <Back />
          </div>
        </template>
        <div class="text-center">邀请详情</div>
        <template v-slot:right>
          <div style="width: 60px;height: 100%"></div>
        </template>
      </mu-appbar>
    </template>
    <mu-container class="mt-3">
      <mu-load-more>
        <div class="h-title" style="margin:10px 10px">
          <div style="margin:10px 0">
            <span class="pl-2">{{ dataArr.ptime | filter(16) }}</span>
            <span style="margin-left:20px">邀请信息</span>
          </div>

          <div style="margin:10px 0 ">
            <Avatar
              style="vertical-align:middle"
              class="gexiao"
              size="xiaoyidian"
              :name="dataArr.from.user_abbr"
              :bgColor="dataArr.from.user_backcolor"
              :headIcon="dataArr.from.user_headicon"
            />
            <span style="color:#cccccc; margin:0 10px">
              {{ dataArr.from.user_name }}: 邀请您加入我的小组
            </span>
          </div>
        </div>
        <div class="bggrue">
          <div>
            <h3>{{ dataArr.target.name }}</h3>
            <p>{{ dataArr.target.intro }}</p>
          </div>

          <mu-button
            v-show="aklsertss"
            class="demo-button"
            color="primary"
            @click.once="alert()"
          >
            加入
          </mu-button>
          <mu-button v-show="aklsert" class="demo-button" color="#9999">
            加入
          </mu-button>
        </div>
      </mu-load-more>
    </mu-container>
  </page>
</template>
<script>
import { messageGet, acceptinvite } from 'api/user';
import PlaceHolder from 'components/PlaceHolder';
import LoadAllTips from 'components/LoadAllTips';
export default {
  name: 'MynewsFeed',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PlaceHolder,
    // eslint-disable-next-line vue/no-unused-components
    LoadAllTips,
  },
  data() {
    return {
      aklsertss: true,
      aklsert: false,
      id: this.$route.params.id,
      dataArr: [],
      status: '',
    };
  },

  mounted() {
    this.getNoticeList();
  },
  methods: {
    getNoticeList() {
      let params = {
        id: this.id,
      };
      messageGet(params)
        .then(res => {
          this.dataArr = res.data;
          this.status = res.data.status;
          if (this.status == 3) {
            this.aklsertss = false;
            this.aklsert = true;
          } else {
            this.aklsertss = true;
            this.aklsert = false;
          }
        })
        .catch(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    alert() {
      let params = {
        id: this.id,
      };
      acceptinvite(params).then(() => {
        this.$toast.success('已加入');
        this.getNoticeList();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.footer-vessel {
  border-top: 1px solid #ddd;
  width: 100%;
  background: #fff;
}
.bggrue {
  background-color: #e3fbfb;
  padding: 10px 20px;
}
.demo-button {
  width: 25%;
  margin-left: 35%;
}
</style>
