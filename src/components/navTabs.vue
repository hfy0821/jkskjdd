<template>
  <div class="tab_warp">
    <span
      v-for="(v, i) in tabs"
      :key="v.code"
      @click="checkTab(v)"
      :class="tabIndex===v.code? 'active' : ''"
      v-show="!v.hide"
    >{{ v.value }}</span
    >
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
      if (this.tabIndex === i.code) return;
      this.$emit("changeIndex", i.code);
    },
  },
};
</script>
<style lang="less" scoped>
.tab_warp {
  display: flex;
  span {
    flex: 1;
    text-align: center;
    line-height: 96px;
    font-size: 28px;
    &.active {
      color: #3296fa;
      border-bottom: 2px solid #3296fa;
    }
  }
}
</style>
