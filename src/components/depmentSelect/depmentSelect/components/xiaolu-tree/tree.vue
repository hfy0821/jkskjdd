<template>
  <div>
    <div v-if="!isShowCheckList && false" class="header">
      <!-- <search
        v-if="searchIf"
        ref="sea"
        @confirm="confirmSearch"
        @comeBack="comeBack"
      /> -->
      <div class="title">
        <div scroll-x style="width: 100%; white-space: nowrap">
          <div
            v-for="(item, index) in tree_stack"
            class="inline-item"
            :key="index"
          >
            <div
              class="inline-item"
              v-if="index == 0"
              @click="backTree(item, -1)"
            >
              <text
                :class="[
                  index == tree_stack.length - 1 && !isre ? 'none' : 'active'
                ]"
                >全部</text
              >
            </div>
            <div
              v-if="index == 0 && isre"
              @click="backTree(item, -2)"
              :class="
                [index == tree_stack.length - 1 && isre]
                  ? 'none inline-item'
                  : 'active inline-item'
              "
            >
              <i class="iconfont icon-z043 iconclass" />
              搜索结果
            </div>
            <div
              class="inline-item"
              @click="backTree(item, index)"
              v-if="index != 0"
            >
              <i class="iconfont icon-z043 iconclass" />
              <text
                :class="
                  index == tree_stack.length - 1 ? 'none inline-ite' : 'active'
                "
              >
                {{ item[props.label] }}
              </text>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isShowCheckList">
      <div class="container-list">
        <div
          class="common"
          v-for="(item, index) in tree"
          @click="handleClick(item, -1)"
          :key="index"
        >
          <div class="content">
            <div class="lable-text" style="margin-left: 0">
              <span
                v-if="searchKeyword"
                v-html="handelSearch(item[props.label])"
                :style="
                  radioSelect(item) && !props.multiple
                    ? 'color:#1890FF !important'
                    : ''
                "
              ></span>

              <span
                v-else
                :style="
                  radioSelect(item) && !props.multiple ? 'color:#1890FF' : ''
                "
                >{{ item[props.label] }}</span
              >
            </div>
            <div class="right">
              <i
                v-if="
                  !item[props.userValue] && item[props.childrenValue].length > 0
                "
                @click.stop="handleClick(item, index)"
                class="iconfont icon-z043 iconclass"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 
    <div class="btn box_sizing">
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
          }}{{ props.max < 10000 ? '/' + props.max : '' }}部门</span
        >
      </div>
      <button
        class="sureBtn"
        :style="props.multiple ? 'width:50%' : 'width:100%'"
        type="primary"
        @click="backConfirm"
      >
        确认
      </button>
    </div> -->
  </div>
</template>

<!-- 参考插件市场：https://ext.dcloud.net.cn/plugin?id=2423 -->
<!-- 参考github地址： https://github.com/LSZ579/xiaolu-tree-plugin.git -->
<script src="./code.js" type="text/javascript"></script>
<style lang="less" scoped>
@import url('./css/icon.css');
.checkbox {
  position: relative;
  margin-left: 10px;
  margin-right: 0px;
  height: 100%;
  .color {
    color: #00aaff;
    background-color: #00aaff;
  }

  .txt {
    font-size: 44px;
    width: 100%;
    height: 100%;
    display: flex;
  }
}

.header {
  width: 100%;
  position: fixed;
  background-color: #fff;
  z-index: 9999;

  .title {
    height: 90px;
    padding: 0 32px;
    line-height: 90px;
    font-size: 30px;
    background-color: #f5f5f5;
    color: #606064;
  }
}

.content {
  display: flex;
  justify-content: space-between;
}
.iconclass {
  display: inline-block;
  margin: 0 12rpx;
  color: #d0d4db;
  font-size: 28rpx;
}

.active {
  color: #4297ed !important;
}

.none {
  color: #666666;
}

.icon-selected {
  color: #0095f2 !important;
  font-size: 40rpx !important;
}

.icons {
  color: #0095f2 !important;
  font-size: 40rpx !important;
}

.inline-item {
  display: inline-block;
}

.content-item {
  display: flex;
  position: relative;
  align-items: center;
}

.box_sizing {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.btn {
  position: fixed;
  bottom: 0;
  padding: 20rpx;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));

  .sureBtn {
    background-color: #0095f2;
    color: #fff;
    display: inline-block;
    border-radius: 72rpx;
    line-height: 72rpx;
    font-size: 28rpx;
  }

  .checkListBtn {
    width: 50%;
    display: inline-block;
    color: rgba(24, 144, 255, 100);
    font-size: 28rpx;

    > span {
      padding-right: 6rpx;
    }
  }
}

.pop-mask {
  position: absolute;
  width: 100%;
  height: calc(100% - 112rpx - env(safe-area-inset-bottom));
  height: calc(100% - 112rpx - constant(safe-area-inset-bottom));
  top: 0;
  left: 0;
  z-index: 10;

  .pop-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60%;
    background-color: #ffffff;
    font-size: 28rpx;
  }

  .pop-item-heard {
    padding: 24rpx;
    display: flex;
    justify-content: space-between;

    .title {
      font-weight: 700;
    }

    .cancel {
      color: #1890ff;
    }
  }

  .pop-item-container {
    padding: 24rpx;
    height: calc(100% - 120rpx);
    overflow-y: auto;

    .pop-item {
      border-bottom: 1rpx solid #f5f5f5;

      > span {
        margin: 10rpx 0;
        display: inline-block;
        width: calc(100% - 40rpx);
        padding: 10rpx 0;
        vertical-align: middle;
      }

      > span:last-child {
        width: 40rpx;
        margin: 10rpx 0;
        display: inline-block;
        text-align: right;
        padding: 10rpx 0;

        .pop-item-icon {
          border-radius: 50%;
          border: 2rpx solid;
        }
      }
    }
  }
}
</style>
