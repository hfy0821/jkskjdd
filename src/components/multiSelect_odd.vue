<template>
  <div class="multiSelectOdd">
    <van-popup
      @closed="multiSelectOddReturn_"
      v-model="multiSelect_show"
      round
      position="bottom"
      style="height:50%;"
    >
      <div class="multiSelectOdd_content">
        <div class="multiSelectOdd_content_div">
          <p class="multiSelectOdd_content_line0">请选择</p>
          <p
            @click="multiSelectOddReturn(item)"
            v-for="item in list"
            :key="item.name"
            class="multiSelectOdd_content_line"
          >{{item.name}}</p>
        </div>
        <div class="close">
          <div style="height:10px;background:#e6e6e6;margin-bottom:15px"></div>
          <div @click="multiSelectOddReturn_">取消</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: ["multiSelectOddData",'name'],
  data() {
    return {
      multiSelect_show: true,
      list: this.multiSelectOddData,
      name:this.name?this.name:'选择所属街道？',
      multiSelectOddObj: {
        status: false,
        id: "",
        name: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    multiSelectOddReturn_() {
      let that = this;
      that.$emit("multiSelectOddReturn", { status: false });
    },
    multiSelectOddReturn(v) {
      let that = this;
      that.multiSelectOddObj.name = v.name;
      that.multiSelectOddObj.id = v.id;
      that.$emit("multiSelectOddReturn", that.multiSelectOddObj);
    }
  }
};
</script>
<style lang="less" scoped>
.multiSelectOdd {
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