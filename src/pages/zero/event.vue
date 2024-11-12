<template>
  <div class="zero_warp">
    <!-- <form class="search" action=".">
            <input type="text" style="display:none;"/>
            <input ref="input" type="search" @keydown.enter="search" v-model="keyword" placeholder="请输入搜索关键字，如景山街道">
            <i  class="iconfont icon-sousuo"></i>
    </form>-->
    <!-- <div class="tab">
            <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
        </div>
        <div class="subTab" v-show="tabIndex===1">
            <span v-for="(v,i) in subTabs" :key="i" :class="subTabIndex===i+1?'active':''" @click="checkSubTab(i)">{{v}}</span>
    </div>-->
    <header>
      <!-- <div class="date">
                <span>零报日期</span>
                <s></s>
      </div>-->
      <span @click="selectTime">{{ params.date || "零报日期" }}</span>
      <div class="all">
        <b @click="getAll">全部</b>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </header>
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li
        v-for="(v, i) in list"
        :key="i"
        @click="toDetail(v)"
        :class="v.isAbnormal ? 'abnormal' : ''"
      >
        <div>
          <p>{{ v.isAbnormal ? "异常" : "平稳" }}</p>
          <p>{{ v.departmentName }}</p>
          <span>{{ v.reportTime || v.reportDate }}</span>
        </div>
        <i class="iconfont icon-gengduo"></i>
      </li>
      <p v-if="!list.length" class="noData">暂无数据</p>
      <!-- <li v-if="!noMore" class="loadMore">
                <i class="iconfont icon-Loading"></i>
                加载中...
            </li>
            <li v-if="noMore" class="loadMore">
                没有更多了...
      </li>-->
    </ul>
    <div class="report" @click="add" v-if="canAdd">
      <i class="iconfont icon-daohanglan"></i>
      <p>新增</p>
    </div>
  </div>
</template>
<script>
import {
  getList,
  getEventListByTodoForAPP,
  getReportedForUser,
} from "../../api/a";
export default {
  name: "zero",
  data() {
    return {
      loading: false,
      noMore: false,
      canAdd: false,
      list: [],
      total: 0,
      params: {
        pageNo: 1,
        pageSize: 10,
        date: "",
      },
    };
  },
  async created() {
    const that = this;
    dd.enablePullToRefresh()
      .then((res) => {
        that.getData();
      })
      .catch((err) => {
        dd.stopPullDownRefresh();
      });
    // dd.ui.pullToRefresh.enable({
    //   async onSuccess() {
    //     that.getData();
    //   },
    //   onFail: function() {
    //     dd.ui.pullToRefresh.stop();
    //   }
    // });
    that.getData();
    const data = await getReportedForUser();
    if (data.success) {
      that.formData = data.data && data.data[0];
      const arr = data.data.map((v) => {
        return v.timeStatus;
      });
      if (arr.includes(0)) {
        that.canAdd = true;
      }
    }
  },
  methods: {
    async getData() {
      const data = await getList(this.params);
      //   dd.ui.pullToRefresh.stop();
      if (data.success) {
        console.log(data);
        this.list = data.data.list;
        this.total = data.data.total;
        dd.stopPullDownRefresh();
      }
    },
    getAll() {
      this.params = {
        pageSize: 10,
        pageNo: 1,
        date: "",
      };
      this.getData();
    },
    selectTime() {
      const that = this;
      dd.showDatePicker({
        format: "yyyy-MM-dd",
        value: that.params.date, //默认显示
      })
        .then((result) => {
          that.params.pageNo = 1;
          that.params.date = result.value;
          that.getData();
        })
        .catch((err) => {});
      // dd.biz.util.datepicker({
      //   format: "yyyy-MM-dd",
      //   value: that.params.date, //默认显示
      //   onSuccess: function(result) {
      //     that.params.pageNo = 1;
      //     that.params.date = result.value;
      //     that.getData();
      //   },
      //   onFail: function(err) {}
      // });
    },
    loadMore() {
      if (this.list.length === this.total) return;
      this.params.pageSize += 10;
      this.getData();
      // if(this.list.length>=50){
      //     this.noMore = true
      //     return
      // }
      // this.loading = true;
      // setTimeout(() => {
      //     let last = this.list[this.list.length - 1];
      //     for (let i = 1; i <= 10; i++) {
      //     this.list.push(last + i);
      //     }
      //     this.loading = false;
      // }, 1000);
    },
    toDetail(v) {
      localStorage.setItem("zeroDetail", JSON.stringify(v));
      this.$router.push(`zero/detail`);
    },
    add() {
      this.$router.push("zero/add");
    },
  },
};
</script>
<style lang="less" scoped>
.zero_warp {
  header {
    display: flex;
    height: 64px;
    background: rgb(231, 231, 231);
    padding: 0 32px;
    align-items: center;
    justify-content: space-between;
    span {
      color: #76797d;
    }
    div {
      display: flex;
      // b {
      // }
      i {
        padding-top: 6px;
        font-size: 24px;
        color: #ccc;
        display: flex;
        align-items: center;
      }
    }
  }
  .list {
    padding: 0 32px;
    .noData {
      text-align: center;
      margin-top: 20px;
      color: rgb(126, 126, 126);
    }
    li {
      padding: 28px 0;
      border-bottom: solid 1px #d6d6d6;
      display: flex;
      justify-content: space-between;
      div {
        flex: 1;
        overflow: hidden;
        p {
          margin-bottom: 30px;
          font-size: 34px;
          .cf > .text-overflow-1();
        }
        span {
          display: inline-block;
          background-color: rgba(50, 150, 250, 0.1);
          padding: 6px 2px 4px;
          border-radius: 3px;
          color: #3296fa;
          font-size: 20px;
        }
      }
      i {
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #ccc;
      }
      &.abnormal {
        div {
          p {
            color: #fe031b;
          }
          span {
            background-color: rgba(254, 3, 27, 0.1);
            color: rgba(254, 3, 27, 0.5);
          }
        }
      }
      // h4{
      //     font-size: 32px;
      //     font-weight: 600;
      //     margin-bottom: 20px;
      //     .cf>.text-overflow-1()
      // }
      // p{
      //     line-height: 40px;
      //     .cf>.text-overflow;
      // }
      // div{
      //     display: flex;
      //     justify-content: space-between;
      //     margin-top: 20px;
      //     span{
      //         color: #f4ae4a;
      //         font-size: 24px;
      //     }
      //     i{
      //         b{
      //             opacity: .6;
      //             font-size: 24px;
      //         }
      //         s{
      //             font-size: 24px;
      //             opacity: .6;
      //         }
      //     }
      // }
      &.loadMore {
        text-align: center;
        border: 0;
        i {
          display: inline-block;
          position: relative;
          animation: rotat 1.3s linear infinite;
        }
        @keyframes rotat {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
  .report {
    position: fixed;
    right: 1px;
    bottom: 20%;
    width: 112px;
    height: 112px;
    border-radius: 50%;
    background-image: linear-gradient(135deg, #44abf0 0%, #4043f3 100%),
      linear-gradient(#4441f7, #3c4ffd);
    text-align: center;
    padding-top: 10px;
    i {
      color: #fff;
      font-size: 48px;
    }
    p {
      color: #fff;
      font-size: 24px;
    }
  }
}
</style>
