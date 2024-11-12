<template>
  <div class="bgbox">
    <div class="posTop">
      <slot></slot>
    </div>
    <div style="width:30%">
      <img style="width:100%;"
           :src="$utils.relimgUrl(itemContent['picIds'],true)[0]" />
    </div>
    <div style="width:68%">
      <div class="Highlight">隐患描述</div>
      <div style="color:#808A91">
        {{itemContent['description'] != undefined? itemContent['description'].length > 25 ? itemContent['description'].substring(0,25) + '......' : itemContent['description']:''}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemContent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less">
.bgbox {
  width: 100%;
  display: flex;
  padding: 15px;
  justify-content: space-between;
  background-color: #f8f8f9;
  border-radius: 5px;
  margin-bottom: 15px;
  position: relative;
}
.Highlight {
  margin-bottom: 15px;
  font-weight: bold;
  color: #88949f;
}
.posTop {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>