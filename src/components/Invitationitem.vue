<template>
  <mu-container>
    <mu-row v-if="teasw">
      <mu-col span="0" offset="150" style="margin-top: 2px">
        <mu-paper :z-depth="1">
          <mu-list>
            <mu-list-item avatar>
              <span v-if="bool" class="assde">
                <mu-checkbox
                  v-model="data.checkVal"
                  @change="change(data)"
                ></mu-checkbox>
              </span>
              <span class="paswe">
                <Avatar
                  class="mr-2"
                  style="vertical-align: middle"
                  size="xiaoyidian"
                  :name="data.user_abbr"
                  :bgColor="data.user_backcolor"
                  :headIcon="data.user_headicon"
                />
              </span>
              <mu-list-item-title>{{ data.user_name }}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
export default {
  name: "SearchItem",
  props: {
    bool: {
      type: Boolean,
      default: false
    },
    registerid: {
      default: false
    },
    data: {
      type: Object,
      default: function() {
        return {
          id: 0,
          checkVal: false
        };
      }
    }
  },
  data() {
    return {
      registerids: this.registerid,
      id: this.data.id,
      teasw: true
    };
  },
  mounted() {
    if (this.registerids == this.id) {
      this.teasw = false;
    }
  },
  methods: {
    change(e) {
      this.$emit("changeSel", { selItem: e });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.paswe {
  margin: 0 10px;
}
</style>
