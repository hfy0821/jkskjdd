<template>
  <div class="rollMaxbox"
       :style="{height:maxheight}"
       @scroll="roll($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeOut: null
    }
  },
  props: {
    maxheight: {
      type: String,
      default: '200px'
    }
  },
  methods: {
    roll (e) {
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        if (e.srcElement.scrollTop + e.srcElement.offsetHeight >= e.srcElement.scrollHeight - 2) {
          this.sendInfo()
        }
      }, 200);
    },
    sendInfo () {
      this.$emit('scrollTop', null)
    }
  }
}
</script>

<style lang='less'>
.rollMaxbox {
  overflow: scroll;
  content-visibility: auto;
}
</style>