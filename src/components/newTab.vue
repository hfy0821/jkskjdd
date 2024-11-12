<template>
  <div style="width:100%">
    <div class="TabBox">
      <div v-for="(item,idx) in List"
           :key="idx"
           class="TabItem"
           :class="onIdx == idx? 'TabOn':''"
           :style=" idx == List.length-1 ? {}:{borderRight:'none'}"
           @click="OnClick(item,idx)">
        {{item[bindKey]}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      onIdx: 0
    }
  },
  props: {
    List: {
      type: Array,
      default: [1, 2, 3]
    },
    bindKey: {
      type: String,
      default: 'name'
    }
  },
  methods: {
    OnClick (item, idx) {
      this.onIdx = idx;
      this.$emit('sendInfo', { itemName: item, Index: idx });
    }
  }
}
</script>

<style lang="less" scoped>
.TabBox {
  display: flex;
  flex-grow: 1;
}
.TabItem {
  border: 1px solid #d4d4d4;
  color: #9a9a9a;
  background-color: white;
  flex-grow: 1;
  text-align: center;
  line-height: 80px;
  border-radius: 5px;
  // border-left: none;
}
.TabOn {
  color: white;
  background-color: #1684fc;
  border: 1px solid #1684fc;
}
</style>