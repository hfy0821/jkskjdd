<template>
  <div>
    <div v-if="!isShowCheckList">
      <div class="container-list">
        <div
          class="common"
          v-for="(item, index) in listData"
          @click="handleClick(item, index)"
          :key="index"
        >
          <label class="content">
            <div
              class="list-item"
              :style="
                newCheckList
                  .map((t) => {
                    return t[props.keyValue]
                  })
                  .indexOf(item[props.keyValue]) > -1
                  ? ' background: #E6F7FF;'
                  : ''
              "
            >
              <div style="width: 100%">
                <div style="display: inline-block">
                  <image
                    v-if="item[props.imgSrc]"
                    :src="item[props.imgSrc]"
                    class="list-item-image"
                  ></image>
                  <uni-icons
                    v-else
                    type="person-filled"
                    size="40"
                    color="#1890FF"
                    class="img-style"
                  ></uni-icons>
                </div>
                <div
                  style="
                    display: inline-block;
                    vertical-align: top;
                    width: calc(100% - 120rpx);
                    padding: 0 4rpx;
                  "
                >
                  <div class="lable-text">{{ item[props.label] }}</div>
                  <div class="position-text">
                    {{ item[props.positionName] }}
                  </div>
                </div>
              </div>
              <div style="width: 40rpx; height: 56rpx">
                <uni-icons
                  v-if="
                    newCheckList
                      .map((t) => {
                        return t[props.keyValue]
                      })
                      .indexOf(item[props.keyValue]) > -1
                  "
                  type="checkmarkempty"
                  size="18"
                  color="#1890FF"
                  style="margin-right: 20rpx"
                ></uni-icons>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div
      class="pop-mask"
      style="background-color: rgba(54, 55, 56, 0.3)"
      v-if="isShowCheckList"
    >
      <div class="pop-box">
        <div class="pop-item-heard">
          <div class="title">已选择人员</div>
          <div class="cancel" @click="changeCheckList">关闭</div>
        </div>
        <div class="pop-item-container">
          <div class="pop-item" v-for="(t, idx) of newCheckList" :key="idx">
            <span style="width: 100%">
              <div style="display: inline-block">
                <image
                  v-if="t[props.imgSrc]"
                  :src="t[props.imgSrc]"
                  class="pop-item-image"
                ></image>
                <uni-icons
                  v-else
                  type="person-filled"
                  size="40"
                  color="#1890FF"
                  class="pop-item-img"
                ></uni-icons>
              </div>
              <div
                style="
                  display: inline-block;
                  vertical-align: top;
                  width: calc(100% - 120rpx);
                  padding: 0 4rpx;
                "
              >
                <div class="lable-text">{{ t[props.label] }}</div>
                <div class="position-text">{{ t[props.positionName] }}</div>
                <div class="content-text">{{ t[props.contentName] }}</div>
              </div>
            </span>
            <span>
              <uni-icons
                class="pop-item-icon"
                type="closeempty"
                size="14"
                color="#C6C6CB"
                @click="handleClick(t)"
              ></uni-icons>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn box_sizing" v-if="newCheckList">
      <div
        v-if="props.multiple"
        class="checkListBtn"
        @click="
          () => {
            if (newCheckList.length > 0) {
              changeCheckList()
            }
          }
        "
      >
        <span
          >已选择{{ newCheckList.length
          }}{{ props.max < 10000 ? '/' + props.max : '' }}人</span
        >
        <uni-icons
          type="bottom"
          size="18"
          color="rgba(24, 144, 255, 100)"
          v-if="newCheckList.length > 0 && isShowCheckList"
        ></uni-icons>
        <uni-icons
          type="top"
          size="18"
          color="rgba(24, 144, 255, 100)"
          v-if="newCheckList.length > 0 && !isShowCheckList"
        ></uni-icons>
      </div>
      <button
        class="sureBtn"
        :style="props.multiple ? 'width:50%' : 'width:100%'"
        type="primary"
        @click="backConfirm"
      >
        确认
      </button>
    </div>
  </div>
</template>
<script src="./code.js" type="text/javascript"></script>
<style lang="less" scoped>
@import './css/style.less';
@import url('./css/icon.css');
</style>
