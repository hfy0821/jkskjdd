<template>
  <div class="tab_warp">
    <span
      v-for="(v, i) in tabs"
      :key="i"
      @click="checkTab(i)"
      :class="index === i + 1 ? 'active' : ''"
      v-show="!v.hide"
      :style="{ width: tabs.length > 3 ? '27%' : '33%' }"
    >
      {{ v.name }}
    </span>
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
  created() {},
  methods: {
    checkTab(i) {
      if (this.index === i + 1) return;
      this.index = i + 1;
      this.$emit("changeIndex", this.index);
    },
  },
};
</script>
<style lang="less" scoped>
.tab_warp {
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 1vh;
  span {
    text-align: center;
    display: inline-block;
    padding: 1vh 4vw;
    font-size: 28px;
    &.active {
      color: #3296fa;
      border-bottom: 2px solid #3296fa;
    }
  }
}
</style>