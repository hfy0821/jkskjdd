<template>
  <div class="reported_warp">
    <form class="search" action=".">
      <input type="text" style="display: none" />
      <input
        ref="input"
        type="search"
        @keydown.enter="search"
        v-model.trim="keyword"
        placeholder="请输入搜索关键字，标题或内容"
      />
      <i class="iconfont icon-sousuo"></i>
    </form>
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(v, i) in list" :key="i" @click="toDetail(v)">
        <div class="title">
          <h4>{{ v.title || "--" }}</h4>
          <!-- <span :class="v.handType ? 'blue' : ''">{{
            v.handType ? "已处理" : "未处理"
          }}</span> -->
        </div>
        <p>{{ v.incidentContent }}</p>
        <div>
          <span>{{ v.road }}</span>
          <i>
            <b class="iconfont icon-time"></b>
            <s>{{ v.incidentTime && v.incidentTime.split(" ")[0] }}</s>
          </i>
        </div>
      </li>
      <!-- <li v-if="!noMore" class="loadMore">
                <i class="iconfont icon-Loading"></i>
                加载中...
            </li>
            <li v-if="noMore" class="loadMore">
                没有更多了...
      </li>-->
    </ul>
    <div class="report" @click="eventType">
      <i class="iconfont icon-daohanglan"></i>
      <p>上报</p>
    </div>
  </div>
</template>
<script>
import Nav from "../../components/tab";
import {
  getEventListByTodoForAPP,
  getEventList,
  checkUrlRight,
  getReportSourceNameList,
} from "../../api/a";
export default {
  name: "reported",
  components: {
    Nav,
  },
  data() {
    return {
      keyword: "",
      loading: false,
      noMore: false,
      list: [],
      pageSize: 0,
    };
  },
  created() {
    console.log(aplus_queue, "aplus_queue10000");
    const that = this;
    dd.enablePullToRefresh()
      .then((res) => {
        that.pageSize = 10;
        that.getData();
      })
      .catch((err) => {
        dd.stopPullDownRefresh();
      });
  },
  methods: {
    search() {
      this.getData();
      this.$refs.input.blur();
    },
    async getData() {
      const params = {
        keyword: this.keyword,
        pageNo: 1,
        pageSize: this.pageSize,
        startPage: 0,
        reportId: localStorage.getItem("userId"),
      };
      const data = await getEventList(params);
      if (data.success) {
        this.list = data.data.list;
        dd.stopPullDownRefresh();
      } else {
      }
    },
    changeIndex(i) {
      console.log(i);
      this.tabIndex = i;
    },
    checkSubTab(i) {
      this.subTabIndex = i + 1;
    },
    loadMore() {
      this.pageSize += 10;
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
    // 列表详情
    toDetail(v) {
      if (
        v.sourceType == 9 ||
        v.sourceType == 118 ||
        v.sourceType == 119 ||
        v.sourceType == 120 ||
        v.sourceType == 121
      ) {
        this.$router.push(`reported/excessAdd?id=${v.id}&type=${v.sourceType}`);
        // return;
      } else {
        this.$router.push(`reported/add?id=${v.id}&type=${v.sourceType}`);
      }
    },
    // -= 上报菜单
    async eventType() {
      const that = this;
      const data = await getReportSourceNameList();
      const menuData = data.data;
      // var menuArr = [
      //   "维稳信息员", // 2
      //   "110报警", // 3
      //   "心理服务", // 9
      //   "舆情", // 8
      //   "公安警情", // 99
      //   "劳动仲裁", // 118
      //   "社会帮扶", // 119
      //   "区法院", // 120
      //   "区检察院", // 121
      //   // "重点信访异动信息" // 122
      // ];
      const menuArr = menuData.map((item) => {
        return item.sourceName;
      });
      const menuType = menuData.map((item) => {
        return item.sourceType;
      });
      dd.device.notification.actionSheet({
        title: "选择事件来源？",
        cancelButton: "取消",
        otherButtons: menuArr,
        onSuccess: function (res) {
          // const arr = [2, 3, 9, 8, 99, 118, 119, 120, 121, 122];
          //[{'id':2,'name':'维稳信息员'},{'id':3,'name':'110报警'},{'id':9,'name':'综合帮扶'},
          //{'id':8,'name':'舆情'},{'id':99,'name':'公安警情'}];
          if (res.buttonIndex >= 0) {
            //   心理服务、劳动仲裁、社会帮扶、区法院、区检察院
            if (
              // res.buttonIndex == 2 ||
              // res.buttonIndex == 5 ||
              // res.buttonIndex == 6 ||
              // res.buttonIndex == 7 ||
              // res.buttonIndex == 8
              res.buttonIndex == 2 ||
              res.buttonIndex == 3 ||
              res.buttonIndex == 4 ||
              res.buttonIndex == 5 ||
              res.buttonIndex == 6
            ) {
              that.$router.push(
                "reported/excessAdd?type=" + menuType[res.buttonIndex]
              );
            } else {
              that.$router.push(
                "reported/add?type=" + menuType[res.buttonIndex]
              );
            }
          }
        },
        onFail: function (err) {},
      });
      // checkUrlRight({ name: "rawData:policeInformation" }).then((res) => {
      //   checkUrlRight({ name: "policeInformation:new" }).then((res1) => {
      //     if (res.success && res.data && res1.success && res1.data) {
      //       menuArr.push("重点信访异动信息");
      //     }
      //     dd.device.notification.actionSheet({
      //       title: "选择事件来源？",
      //       cancelButton: "取消",
      //       otherButtons: menuArr,
      //       onSuccess: function (res) {
      //         const arr = [2, 3, 9, 8, 99, 118, 119, 120, 121, 122];
      //         //[{'id':2,'name':'维稳信息员'},{'id':3,'name':'110报警'},{'id':9,'name':'综合帮扶'},
      //         //{'id':8,'name':'舆情'},{'id':99,'name':'公安警情'}];
      //         if (res.buttonIndex >= 0) {
      //           //   心理服务、劳动仲裁、社会帮扶、区法院、区检察院
      //           if (
      //             res.buttonIndex == 2 ||
      //             res.buttonIndex == 5 ||
      //             res.buttonIndex == 6 ||
      //             res.buttonIndex == 7 ||
      //             res.buttonIndex == 8
      //           ) {
      //             that.$router.push(
      //               "reported/excessAdd?type=" + arr[res.buttonIndex]
      //             );

      //           } else {
      //             that.$router.push(
      //               "reported/add?type=" + arr[res.buttonIndex]
      //             );
      //           }
      //         }
      //       },
      //       onFail: function (err) {},
      //     });
      //   });
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.reported_warp {
  .search {
    display: block;
    padding: 12px 32px;
    position: relative;
    input {
      width: 100%;
      height: 72px;
      // line-height: 72px;
      padding-left: 72px;
      background: #dddddd;
      font-size: 30px;
    }
    i {
      font-size: 36px;
      position: absolute;
      left: 52px;
      top: 30px;
    }
  }
  .list {
    padding: 0 32px;
    li {
      padding: 24px 0;
      border-bottom: solid 1px #d6d6d6;
      .title {
        display: flex;
        h4 {
          flex: 1;
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 20px;
          .cf > .text-overflow-1();
        }
        span {
          height: 32px;
          line-height: 32px;
          padding: 0 8px;
          color: #4a5bf4;
          background-color: #dbdefd;
          &.green {
            color: #0ab408;
            background-color: #cef0ce;
          }
          .red {
            color: #ef3030;
            background-color: #fcd6d6;
          }
        }
      }
      p {
        line-height: 40px;
        .cf > .text-overflow;
      }
      div {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        span {
          color: #f4ae4a;
          font-size: 24px;
        }
        i {
          b {
            opacity: 0.6;
            font-size: 24px;
          }
          s {
            font-size: 24px;
            opacity: 0.6;
          }
        }
      }
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
