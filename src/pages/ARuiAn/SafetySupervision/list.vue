<template>
  <div class="stability_warp">
    <div class="tabClass">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
    </div>
    <div class="subTab" v-show="tabIndex == 3">
      <span
        v-for="(v, i) in subTabs"
        :key="i"
        :class="subTabIndex === i + 1 ? 'active' : ''"
        @click="checkSubTab(i)"
      >
        {{ v }}
      </span>
    </div>
    <ul
      class="listClass"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li
        v-for="(item, index) in listData"
        :key="index"
        @click="toDetail(item)"
        class="listClass_li"
      >
        <div class="listClass_li_special">
          <span
            :class="
              item.level == 1 ? 'green' : item.level == 2 ? 'yellow' : 'red'
            "
          ></span>
        </div>
        <div class="li_content">
          <div class="li_content_title">{{ item.eventName }}</div>
          <div class="li_content_">
            <div>
              <span>事件来源：</span>
              <div>{{ item.sourceType }}</div>
            </div>
            <div>
              <span>任务明细：</span>
              <div>{{ item.remark }}</div>
            </div>
          </div>
          <div class="li_content_time">
            <span>督办时间：</span>
            <span>{{ item.createTime }}</span>
            <!-- v-show="item.departPermission == 1 && item.monitorStatus == 1" -->
            <span v-show="item.aaa" @click="handFn($event, item)">
              开始处置
            </span>
          </div>
        </div>
      </li>
      <li v-if="!noMore" class="loadMoreClass">
        <i class="iconfont icon-Loading"></i>
        加载中...
      </li>
      <li v-if="noMore" class="loadMoreClass">没有更多了...</li>
    </ul>
  </div>
</template>
<script>
import { dealOpreate, _http } from "@/api/a";
import Nav from "../components/tab.vue";

export default {
  components: { Nav },
  data() {
    return {
      subTabs: ["审核中", "已通过", "已驳回"],
      tabs: [{ name: "督办中" }, { name: "已督办" }, { name: "办结申请" }],
      loading: false,
      noMore: false,
      tabIndex: localStorage.getItem("SafetySupervisionTabIndex") / 1 || 1,
      listData: [],
      total: 0,
      params: {
        pageNo: 1,
        pageSize: 10,
        // showType: 2,
      },
      subTabIndex: 1,
    };
  },
  computed: {
    streetList() {
      //   return this.$store.state.common.streetList;
    },
  },
  created() {
    const that = this;
    // that.$store.commit({
    //   type: "StoreData",
    //   key: "peopleType",
    //   value: "r.data.userType",
    // });
    that.getData();
  },
  methods: {
    checkSubTab(i) {
      if (this.subTabIndex === i + 1) return;
      this.subTabIndex = i + 1;
      // localStorage.setItem("emergencySubIndex", i + 1);
      this.pageSize = 10;
      this.keyword = "";
      this.getData();
    },
    async handFn(e, item) {
      const that = this;
      e.stopPropagation();
      dd.confirm({
        title: "温馨提示",
        message: "确定操作？",
        buttonLabels: ["取消", "确定"],
      }).then(async (res) => {
        if (res.buttonIndex == 1) {
          const data = await dealOpreate({
            id: item.missionId,
            dealContent: "",
            stateCode: "101",
          });
          if (data.success) {
            dd.toast({
              icon: "success",
              text: "操作成功", //提示信息
            })
              .then((res) => {
                that.getData();
              })
              .catch((err) => {});
          }
        }
      });
    },
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("SafetySupervisionTabIndex", i);
      that.params.pageSize = 10;
      that.getData();
      window.scrollTo(0, 0);
    },
    async getData() {
      const that = this;
      that.noMore = false;
      let url = "";
      let data = {};
      if (that.tabIndex == 3) {
        url = "socialGovernance/monitorMissionMobile/getMonitorAuditPagelist";
        data.auditState = that.subTabIndex;
      } else {
        url = "socialGovernance/monitorMissionMobile/getMonitorPagelist";
        data.state = that.tabIndex;
      }
      const res = await _http(url, { ...data, ...that.params }, "get");
      if (res.success) {
        that.listData = res.data.data;
        that.total = res.data.total;
        that.noMore = true;
      }
    },
    loadMore() {
      if (this.listData.length === this.total) return;
      this.params.pageSize += 10;
      this.getData();
    },
    toDetail(item) {
      this.$router.push({
        path: "/ARuiAn/SafetySupervision/detail",
        query: {
          type: this.tabIndex,
          ...item,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.stability_warp {
  padding-top: 100px;
  .tabClass {
    box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
    background: #fff;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .listClass {
    padding: 0 4vw;

    li {
      padding: 1vh 0;
      border-bottom: solid 1px #d6d6d6;

      &.loadMoreClass {
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
    .listClass_li {
      display: flex;
      justify-content: space-between;
      .li_img {
        width: 25%;
      }
      .li_content {
        flex: 1;
        overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;

        .li_content_title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .li_content_ {
          margin: 2vh 0 1vw 0;
          > div {
            display: flex;
            > div {
              flex: 1;
            }
          }
        }
        .li_content_time {
          color: #737373;
          position: relative;
          > span:last-child {
            position: absolute;
            right: 0;
            color: #fff;
            display: inline-block;
            background: #3893ff;
            border-radius: 5px;
            padding: 0 5px;
          }
        }
        // .li_content_bottom {
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        //   white-space: nowrap;
        //   color: #737373;
        // }
      }

      .red {
        background: red;
      }
      .green {
        background: green;
      }
      .yellow {
        background: yellow;
      }
      .listClass_li_special {
        padding: 0px 2vw 0 0;
        > span {
          display: inline-block;
          background: red;
          border-radius: 50%;
          height: 10px;
          width: 10px;
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

  .subTab {
    padding: 24px 32px;
    background: rgb(235, 235, 235);
    display: flex;
    span {
      width: 110px;
      line-height: 48px;
      height: 44px;
      text-align: center;
      background: #cecece;
      border-radius: 4px;
      margin-right: 20px;
      color: #191f2599;
      &.active {
        background: #3296fa;
        color: #fff;
      }
    }
  }
}
</style>
