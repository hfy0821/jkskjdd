<template>
  <view class="tmp-box">
    <view class='filterBox'>
      <view class='filter-back'
            @click="comeBack">返回</view>
      <view class='filter-input'>
        <text style="color: #b8b8b8;"
              class="iconfont icon-sousuo filterImg" />
        <input class="text"
               type='text'
               v-model="inputVal"
               confirm-type="搜索"
               @confirm='handleFllter'
               placeholder='搜索'></input>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputVal: ''
    }
  },
  methods: {
    handleFllter(e) {
      // console.log(e.detail.value)
      this.$emit('confirm', e.detail.value)
    },
    clears() {
      console.log(this.inputVal)
      this.inputVal = ''
      console.log('清除了内容')
    },
    comeBack() {
      this.$emit('comeBack')
    }
  }
}
</script>

<style lang="less" scoped>
.filterBox {
  padding: 15rpx 32rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .filter-back {
    width: 100rpx;
    font-size: 28rpx;
    margin: auto;
    color: #666666;
  }
  .filter-input {
    width: calc(100% - 30px);
    height: 80rpx;
    background-color: #eeeff0;
    border-radius: 40rpx;
    display: flex;
    align-items: center;

    padding-left: 40rpx;
    .filterImg {
      width: 32rpx;
      height: 32rpx;
      margin-right: 20rpx;
      margin-bottom: 5rpx;
    }
    .filterImgs {
      width: 32rpx;
      height: 32rpx;
    }
    .text {
      width: 84%;
      background-color: #eeeff0;
      font-size: 32rpx;
      color: #000;
    }
  }
}
@import url('../css/icon.css');
</style>
