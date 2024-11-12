<template>
  <div class="searchMaxbox">
    <div class="searchInputBox">
      <div class="inputBox">
        <div class="imgBox">
          <img src="../../../assets/image/eventIcon/search.png" />
        </div>
        <div style="width:80%">
          <van-field v-model="value"
                     placeholder="搜索点位关键字" />
        </div>
      </div>

      <div class="ButBox">
        <van-button class="butStyle"
                    @click="sumbit"
                    type="primary">确认</van-button>
      </div>
    </div>

    <div class="searchHistory"
         style="margin-top:30px">
      <div class="historyHead">
        <span>搜索历史</span>
        <div>
          <img @click="delHistoryAll"
               style="width:22px;height:22px;"
               src="../../../assets/image/del.png" />
        </div>
      </div>

      <div class="historyItemBox">
        <div class="historyItem"
             v-for="(item,index) in testList"
             @click="value = item"
             :key="index">
          {{item}}
          <i style="font-size:15px;color:#969696"
             v-if="delMark"
             @click.stop="delHisttory(item,index)"
             class="iconfont icon-closel"></i>
        </div>
      </div>
    </div>

    <div class="pos">
      <div class="butStyle_color-gray"
           @click="$router.go(-1)">
        取消
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Notify } from 'vant';
export default {
  data () {
    return {
      value: '',
      // 
      delMark: false,
      testList: []
    }
  },
  mounted () {
    this.getHistory();
  },
  methods: {
    delHistoryAll () {
      if (!this.delMark) {
        this.delMark = true
        return
      }
      if (this.testList.length == 0) {
        return
      }
      Dialog.confirm({
        title: '确认清空历史记录',
        width: '250px',
      })
        .then((res) => {
          this.$httpapi.deleteEventSearchHistory({
            isAll: 1
          }).then((res) => {
            this.testList.splice(0, this.testList.length)
          })
        })
    },
    delHisttory (obj, idx) {
      this.$httpapi.deleteEventSearchHistory({
        name: obj,
      }).then((res) => {
        this.testList.splice(idx, 1)
      })
    },
    sumbit () {
      this.$store.commit('StoreData', { key: "searchHistory", value: this.value })
      window.history.go(-1)
    },
    getHistory () {
      this.$httpapi.getPointEventSearchHistory({
        pageNo: 1,
        pageSize: 120
      }).then((res) => {
        this.testList = res.data
      })
    }
  },
}
</script>

<style lang="less" scoped>
.searchMaxbox {
  padding: 15px;
  .van-cell {
    background-color: rgba(255, 255, 0, 0) !important;
  }
}
.radio-circle {
  border-radius: 9px;
}
.searchInputBox {
  display: flex;
  justify-content: space-between;
  .inputBox {
    .radio-circle();
    border: 1px solid #c8c8c8;
    background-color: #fafafa;
    width: 75%;
    padding: 9px 15px;
    display: flex;
    .imgBox {
      flex-basis: 60px;
      width: 60px;
      background-color: #1684fc;
      display: flex;
      justify-content: center;
      align-items: center;
      .radio-circle();
      > img {
        @imgsize: 32px;
        width: @imgsize;
        height: @imgsize;
      }
    }
  }
  .ButBox {
    width: 22%;
    .butStyle {
      width: 100%;
      height: 100%;
      background-color: #3893ff;
      border: 1px solid rgba(0, 0, 0, 0) !important;
      .radio-circle();
      span {
        color: white;
      }
    }
  }
}
.searchHistory {
  padding: 0px 15px;
  .historyHead {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    span:nth-child(1) {
      font-weight: bold;
    }
  }
  .historyItemBox {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    .historyItem {
      margin-right: 18px;
      margin-bottom: 32px;
      border-radius: 50vw;
      padding: 9px 32px;
      background-color: #f6f7f7;
    }
  }
}
.pos {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 15px;
  background-color: white;
}
</style>