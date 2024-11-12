<template>
  <div class="multiSelectOdd">
    <div style="padding:5px 8px"
         @click="openPop">
      <span v-if="val == '' && !disable"
            style="color:#d3cddb">{{placehold}}</span>
      <span v-else>{{val || exisVal}}</span>
    </div>
    <van-popup v-model="multiSelect_show"
               round
               position="bottom"
               style="height:50%;">
      <div class="multiSelectOdd_content">
        <div class="multiSelectOdd_content_div">
          <p class="multiSelectOdd_content_line0">请选择</p>
          <p @click="multiSelectOddReturn(item)"
             v-for="(item,index) in muiltdate"
             :key="index"
             class="multiSelectOdd_content_line">{{item[bindkey]}}</p>
        </div>
        <div class="close">
          <div style="height:10px;background:#e6e6e6;margin-bottom:25px"></div>
          <div @click="multiSelectOddReturn_"
               style="padding:10px 0px;">取消</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    muiltdate: {
      type: Array,
      default: []
    },
    bindkey: {
      type: String,
      default: 'name'
    },
    disable: {
      tyep: Boolean,
      default: false
    },
    placehold: {
      type: String,
      default: '请输入'
    },
    exisVal: {
      type: String,
      default: ''
    }
  },
  watch: {
    exisVal (value) {
      this.val = value
    }
  },
  data () {
    return {
      val: "",
      multiSelect_show: false,
    }
  },
  methods: {
    openPop () {
      if (this.disable) {
        return;
      }
      this.multiSelect_show = true;
    },
    Valchange (val) {
      this.$emit("ValChange", val);
      this.multiSelect_show = false;
    },
    multiSelectOddReturn_ () {
      this.multiSelect_show = false
    },
    multiSelectOddReturn (val) {
      this.val = val[this.bindkey];
      this.Valchange(val);
    }
  }
};
</script>
<style lang="less" scoped>
.multiSelectOdd {
  width: 100%;
  .multiSelectOdd_content {
    position: relative;
    height: 100%;
    text-align: center;
    padding-bottom: 170px;
    .multiSelectOdd_content_div {
      overflow-y: auto;
      height: 100%;
      .multiSelectOdd_content_line0 {
        padding-bottom: 30px;
        margin-top: 20px;
        border-bottom: 1px solid #e6e6e6;
        color: gray;
      }
      .multiSelectOdd_content_line {
        padding: 30px 0;
        border-bottom: 1px solid #e6e6e6;
      }
      .multiSelectOdd_content_line:active {
        background: #e6e6e6;
      }
    }

    .close {
      height: 170px;
      position: absolute;
      bottom: 0;
      text-align: center;
      width: 100%;
      padding-bottom: 70px;
      background: #fff;
    }
  }
}
</style>