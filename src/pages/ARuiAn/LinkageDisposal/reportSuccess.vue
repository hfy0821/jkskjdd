<template>
  <div class="reportSuccess">
    <h1>上报成功</h1>
    <div class="btn">
      <span @click="goC(1)">继续上报</span>
      <span @click="goC(2)">返回处置事件</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},

  methods: {
    goC(type) {
      const that = this;
      if (type == 1) {
        that.$router.go(-1);
      } else {
        that.$router.push({
          path: "/ARuiAn/LinkageDisposal/detail",
          query: {
            type: 2,
            item: {},
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.reportSuccess {
  > h1 {
    font-size: 80px;
    padding: 10vh 0;
    text-align: center;
  }
  .btn {
    // width: 100%;
    // border-top: solid 1px #191f251f;
    // display: flex;
    // justify-content: space-between;
    // background: #fff;
    // height: 9vh;
    // padding: 2vh;
    text-align: center;

    span:first-child {
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      display: inline-block;
      width: 90%;
      text-align: center;
      line-height: 7vh;
      color: #fff;
      border-radius: 8px;
      margin: 2vh 0;
    }
    span:last-child {
      letter-spacing: 5px;
      display: inline-block;
      width: 90%;
      text-align: center;
      line-height: 7vh;
      color: #a1a1a1;
      border-radius: 8px;
      margin: 2vh 0;
      border: 1px solid #a1a1a1;
    }
  }
}
</style>
