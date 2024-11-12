<template>
  <div style="height: 6vh; width: 100%; background: #fff">
    <div class="tab_warp_h">
      <span
        v-for="(v, i) in tabs"
        :key="i"
        @click="checkTab(i)"
        :class="index === i + 1 ? 'active' : ''"
        v-show="!v.hide"
        >{{ v.name }}</span
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["tabs", "tabIndex"],
  data() {
    return {
      index: this.tabIndex,
    };
  },
  mounted() {},
  methods: {
    checkTab(i) {
      const that = this;
      if (that.index === i + 1) return;
      that.index = i + 1;
      that.$emit("changeIndex", that.index);
    },
  },
};
</script>
<style lang="less" scoped>
.tab_warp_h {
  display: flex;
  box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
  position: fixed;
  background: #fff;
  width: 100%;
  z-index: 99;
  span {
    flex: 1;
    text-align: center;
    line-height: 6vh;
    font-size: 28px;
    &.active {
      color: #3296fa;
      border-bottom: 2px solid #3296fa;
    }
  }
}
</style>