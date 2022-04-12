<template>
  <div class="search-item flex">
    <div class="checkbox" v-if="bool">
      <mu-checkbox v-model="dataJson.checkVal"></mu-checkbox>
    </div>
    <router-link
      v-if="dataJson.action_type === 'invitemember'"
      :to="{ name: 'MynewsFeed', params: { id: dataJson.id } }"
    >
      <div>
        <span class="pl-2" style="color:#999;">
          {{ dataJson.ptime | filter(16) }}
        </span>
        <span style="margin-left:20px; color:#999;">邀请信息</span>
        <div class="link">
          <Avatar
            style="vertical-align:middle"
            class="gexiao"
            size="mini"
            :name="dataJson.from.user_abbr"
            :bgColor="dataJson.from.user_backcolor"
            :headIcon="dataJson.from.user_headicon"
          />
          <span style="color:#cccccc" class="pl-2">
            {{ dataJson.from.user_name }}: 邀请您加入我的小组
          </span>
          <span style="color:#000">{{ dataJson.target.name }}</span>
        </div>
      </div>
    </router-link>
    <router-link
      v-else-if="dataJson.action_type === 'acceptinvite'"
      :to="{ name: 'TeamDetails', query: { id: dataJson.target.id } }"
    >
      <div>
        <div>
          <span class="pl-2" style="color: #999;">
            {{ dataJson.ptime | filter(16) }}
          </span>
          <span style="margin-left:20px; color:#999;">邀请反馈</span>
          <div class="link">
            <Avatar
              style="vertical-align:middle"
              class="gexiao"
              size="mini"
              :name="dataJson.from.user_abbr"
              :bgColor="dataJson.from.user_backcolor"
              :headIcon="dataJson.from.user_headicon"
            />
            <span style="color:#cccccc" class="pl-2">
              {{ dataJson.from.user_name }}: 已加入我的小组
            </span>
            <span style="color:#000">{{ dataJson.target.name }}</span>
          </div>
        </div>
      </div>
    </router-link>
    <router-link
      v-else-if="dataJson.action_type === 'removemember'"
      :to="{ name: 'TeamDetails', query: { id: dataJson.target.id } }"
    >
      <div>
        <div>
          <span class="pl-2" style="color:#999;">
            {{ dataJson.ptime | filter(16) }}
          </span>
          <span style="margin-left:20px; color:#999;">小组信息</span>
          <div class="link">
            <Avatar
              style="vertical-align:middle"
              class="gexiao"
              size="mini"
              :name="dataJson.from.user_abbr"
              :bgColor="dataJson.from.user_backcolor"
              :headIcon="dataJson.from.user_headicon"
            />
            <span style="color:#cccccc" class="pl-2">
              {{ dataJson.from.user_name }}: 已退出我的小组
            </span>
            <span style="color:#000">{{ dataJson.target.name }}</span>
          </div>
        </div>
      </div>
    </router-link>
    <div class="flexItem" v-else>
      <div class="mb-3" style="color:#999;font-size:14px">
        <Avatar
          style="vertical-align:middle"
          class="gexiao"
          size="mini"
          :name="dataJson.from.user_abbr"
          :bgColor="dataJson.from.user_backcolor"
          :headIcon="dataJson.from.user_headicon"
        />
        <!-- <mu-avatar
          v-if="dataJson.from.user_headicon"
          size="24"
          style="vertical-align:middle"
        >
          <img :src="dataJson.from.user_headicon" />
        </mu-avatar>
        <mu-avatar
          v-else
          size="24"
          :color="dataJson.from.user_backcolor"
          style="vertical-align:middle"
        >
          {{ dataJson.from.user_abbr }}
        </mu-avatar> -->
        <span class="pl-2">{{ dataJson.from.user_name }}</span>
        <span class="pl-2">{{ dataJson.ptime | filter(16) }}</span>
        <!-- <span
          class="pl-2"
          style="color:#222;font-size:14px"
          v-if="dataJson.target_type === 'reask'"
          >【多问一句】我的提问
        </span> -->
        <span
          class="pl-2"
          style="color:#222;font-size:14px"
          v-if="
            dataJson.action_type === 'answer' && dataJson.target_type === 'ask'
          "
        >
          回答了我的 提问
        </span>
        <span
          class="pl-2"
          style="color:#222;font-size:14px"
          v-if="
            dataJson.action_type === 'reask' && dataJson.target_type === 'ask'
          "
        >
          【多问一句】我的提问
        </span>
        <span
          class="pl-2"
          style="color:#222;font-size:14px"
          v-if="
            dataJson.action_type === 'reask' && dataJson.target_type === 'reask'
          "
        >
          回复我的【多问一句】
        </span>
        <span
          class="pl-2"
          style="color:#222;font-size:14px"
          v-if="
            dataJson.action_type === 'reask' &&
              dataJson.target_type === 'answer'
          "
        >
          提问了我的 回答
        </span>
      </div>
      <div
        class="h-target"
        v-if="dataJson.target_type === 'ask'"
        v-html="dataJson.target.title"
      ></div>
      <div
        class="h-target"
        v-if="dataJson.target_type !== 'ask'"
        v-html="dataJson.target.brief"
      ></div>
      <router-link
        v-if="
          dataJson.action_type === 'reask' && dataJson.target_type === 'reask'
        "
        :to="{
          name: 'QuestionsDetail',
          params: { id: dataJson.target.parent_id },
        }"
      >
        <div class="h-title" style="font-size: 14px" v-html="dataJson.content">
          <span>内容：</span>
        </div>
      </router-link>
      <router-link
        v-else-if="
          dataJson.action_type === 'answer' && dataJson.target_type === 'ask'
        "
        :to="{ name: 'QuestionsDetail', params: { id: dataJson.target_id } }"
      >
        <div class="h-title" style="font-size: 14px" v-html="dataJson.content">
          <span>内容：</span>
        </div>
      </router-link>
      <router-link
        v-else
        :to="{ name: 'QuestionsDetail', params: { id: dataJson.target_id } }"
      >
        <div class="h-title" style="font-size: 14px" v-html="dataJson.content">
          <span>内容：</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import avatar from 'assets/images/u2101.png';
export default {
  name: 'DynamicMessageItem',
  props: {
    bool: {
      type: Boolean,
      default: false,
    },
    dataJson: {
      type: Object,
      default: () => {
        return {
          id: 0,
          checkVal: false,
        };
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      avatar,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-item {
  background: #fff;
  font-size: 14px;
  padding: 10px;
}
.h-title {
  font-size: 14px;
  margin-left: 10px;
  word-break: break-all;
  color: #999;
  span {
    font-size: 14px;
  }
}
.checkbox {
  width: 35px;
}
.h-target {
  word-break: break-all;
  font-size: 14px;
  margin-left: 10px;
  color: #ccc;
  margin-bottom: 5px;
}
.link {
  margin-top: 15px;
  line-height: 30px;
}
</style>
