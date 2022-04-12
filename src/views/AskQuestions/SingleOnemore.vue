<template>
  <page>
    <template #header>
      <mu-appbar z-depth="0">
        <template v-slot:left>
          <Back />
          返回上级
        </template>
      </mu-appbar>
    </template>
    <div class="father_box">
      <mu-row class="mt-4">
        <mu-col span="12" class="more-grid-cell-1">
          <div class="avatar_group">
            <Avatar
              size="mini"
              :name="data.creator ? data.creator.user_abbr : ''"
              :bgColor="data.creator ? data.creator.user_backcolor : ''"
              :headIcon="data.creator ? data.creator.user_headicon : ''"
            />
            <span class="text ellipsis-line1" style="width:100px">
              {{ data.user_name }}
            </span>
          </div>
          <div class="time">
            {{ data.ptime | filter(16) }}
          </div>
        </mu-col>
        <mu-col span="12" class="more-grid-cell-2">
          <div
            class="type"
            v-html="
              data.sub_type === 'replace'
                ? '替换'
                : data.sub_type === 'continue'
                ? '追问'
                : '反问'
            "
          ></div>
          <div class="content">
            {{ data.content }}
          </div>
        </mu-col>
        <mu-col span="12" class="grid-cell-3">
          <div class="icon_class">
            <mu-icon value="thumb_up_alt_outline" @click="like(data)"></mu-icon>
            <span>{{ data.like_count }}</span>
          </div>
          <div class="icon_class">
            <mu-icon
              value="thumb_down_alt_outline"
              @click="unlike(data)"
            ></mu-icon>
            <span>{{ data.unlike_count }}</span>
          </div>
        </mu-col>
      </mu-row>
    </div>
    <mu-divider></mu-divider>
    <div class="child_box">
      <p class="title">相关信息（{{ data.child_count }}）</p>
      <mu-row>
        <div v-for="(item, index) in dataList" :key="index" style="width:100%">
          <mu-col span="12" class="more-grid-cell-1 pa-0">
            <div class="avatar_group">
              <Avatar
                size="mini"
                :name="item.creator ? item.creator.user_abbr : ''"
                :bgColor="item.creator ? item.creator.user_backcolor : ''"
                :headIcon="item.creator ? item.creator.user_headicon : ''"
              />
              <span class="text ellipsis-line1" style="width:100px">
                {{ item.user_name }}
              </span>
            </div>
            <div class="time">
              {{ item.ptime | filter(16) }}
            </div>
          </mu-col>
          <mu-col
            span="12"
            class="more-grid-cell-2"
            @click="toSingleOnemore(item)"
          >
            <div
              class="type"
              v-html="
                item.sub_type === 'replace'
                  ? '替换'
                  : item.sub_type === 'continue'
                  ? '追问'
                  : '反问'
              "
            ></div>
            <div class="content">
              {{ item.content }}
            </div>
          </mu-col>
          <mu-col span="12" class="grid-cell-3">
            <div class="icon_class" style="margin-right:3rem">
              <mu-icon
                value="thumb_up_alt_outline"
                @click="like(item)"
              ></mu-icon>
              <span>{{ item.like_count }}</span>
            </div>
            <div class="icon_class">
              <mu-icon
                value="thumb_down_alt_outline"
                @click="unlike(item)"
              ></mu-icon>
              <span>{{ item.unlike_count }}</span>
            </div>
            <div
              v-if="item.top_child.length > 0"
              class="read_text"
              @click="toSingleOnemore(item)"
            >
              查看回复
            </div>
          </mu-col>
        </div>
      </mu-row>
      <div v-if="noData" style="text-align:center;width:100%">
        <PlaceHolder type="3" message="暂无内容" />
      </div>
    </div>

    <EditOnemore
      @hideoneSheet="hideoneSheet"
      @hideoneSheetAndUpdata="hideoneSheetAndUpdata"
      :passContent="passContent"
      :author="passAuthor ? passAuthor : author"
      :onoffa="showEditOneMore"
      :id="passId ? passId : id"
    />
    <template #footer>
      <mu-bottom-nav class="bottom-nav">
        <div class="right" @click="focusInput">我要多问一句</div>
      </mu-bottom-nav>
    </template>

    <!-- <div class="grid_bottom">
      <mu-text-field
        full-width
        v-model="editMsg"
        placeholder="我要多问一句"
        @focus="focusInput"
      ></mu-text-field
      ><br />
    </div> -->
  </page>
</template>

<script>
import { getContentTree, like, unlike } from 'api/subject';
import PlaceHolder from 'components/PlaceHolder';
import EditOnemore from './components/EditOnemore';
export default {
  name: 'SingleOnemore',
  components: { EditOnemore, PlaceHolder },
  data() {
    //这里存放数据
    return {
      id: this.$route.params.id,
      data: '',
      noData: false,
      showEditOneMore: false,
      dataList: [],
      passContent: '',
      passAuthor: '',
      passId: '',
      author: '',
    };
  },
  watch: {
    $route() {
      this.$router.go(0);
    },
  },
  //方法集合
  methods: {
    like(el) {
      like({ id: el.id }).then(() => {
        // this.$toast.success("点赞成功");
        this.getBaseContent();
      });
    },
    unlike(el) {
      unlike({ id: el.id }).then(() => {
        // this.$toast.success("否认成功");
        this.getBaseContent();
      });
    },
    getBaseContent() {
      let params = {
        id: this.id,
        child_type: 'reask',
        order: 'default',
        icon: 1,
      };
      getContentTree(params).then(res => {
        this.data = res.data;
        this.dataList = res.data.child;
        if (this.dataList.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      });
    },
    hideoneSheet() {
      this.showEditOneMore = false;
    },
    hideoneSheetAndUpdata() {
      this.showEditOneMore = false;
      this.getBaseContent();
    },
    focusInput() {
      this.passContent = this.data.content;
      this.passId = this.id;
      this.passAuthor = this.data.user_name;
      this.showEditOneMore = true;
    },
    toSingleOnemore(el) {
      this.$router.push({
        name: 'SingleOnemore',
        params: {
          id: el.id,
        },
      });
    },
  },
  mounted() {
    this.getBaseContent();
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.father_box,
.child_box {
  padding: 10px 30px;
}
.child_box {
  .title {
    font-size: 14px;
  }
}
.grid_bottom {
  padding: 0 20px;
  & > ::v-deep .mu-input {
    margin-bottom: 0;
  }
}
.more-grid-cell-1 {
  display: flex;
  align-items: baseline;
  .text {
    color: #ccc;
    font-size: 14px;
    margin: 0 10px;
  }
  .avatar_group {
    flex: 3;
    display: flex;
    justify-content: flex-start;
    flex-shrink: 0;
    align-items: center;
  }
  .time {
    flex: 3;
    font-size: 14px;
    color: #ccc;
    text-align: right;
  }
}
.more-grid-cell-2 {
  display: flex;
  padding: 6px 0;
  margin: 8px 0;
  .type {
    flex: 1;
    color: #1bc6b8;
  }
  .content {
    flex: 8;
    word-break: break-all;
  }
}
.grid-cell-3 {
  display: flex;
  padding: 0 0 0 32px;
  .icon_class {
    margin-right: 40px;
    width: 20px;
    display: flex;
    align-items: center;
    i {
      width: 100%;
      font-size: 14px;
    }
  }
  .read_text {
    width: 50%;
    color: #1bc6b8;
    text-align: right;
  }
}

.bottom-nav {
  background: #06a9ac;
  color: #fff;
  div {
    width: 100%;
    height: 100%;
    line-height: 55px;
  }
}
</style>
