<template>
  <div class="safety_warp">
    <form class="search" action=".">
      <input type="text" style="display: none" />
      <input
        ref="input"
        type="search"
        @keydown.enter="search"
        v-model="keyword"
        placeholder="请输入搜索单位"
      />
      <i class="iconfont icon-sousuo"></i>
    </form>
    <div class="tab">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
    </div>
    <div class="subTab" v-show="tabIndex === 1">
      <span
        v-for="(v, i) in subTabs"
        :key="i"
        :class="subTabIndex === i + 1 ? 'active' : ''"
        @click="checkSubTab(i)"
        >{{ v }}</span
      >
    </div>
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(v, i) in list" :key="i" @click="toDetail(v.id)">
        <h4>{{ v.checkTarget }}</h4>
        <p>{{ v.incidentContent }}</p>
        <div>
          <span>{{ v.roadName }}</span>
          <i>
            <b class="iconfont icon-time"></b>
            <s>{{ v.incidentTime }}</s>
          </i>
        </div>
      </li>
      <!-- <li v-if="!noMore" class="loadMore">
                <i class="iconfont icon-Loading"></i>
                加载中...
            </li>
            <li v-if="noMore" class="loadMore">
                没有更多了...
            </li> -->
    </ul>
    <div class="report" @click="add">
      <i class="iconfont icon-daohanglan"></i>
      <p>上报</p>
    </div>
  </div>
</template>
<script>
import Nav from "../../../components/tab";
import { getEventListByTodoForAPP } from "../../../api/a";
export default {
  name: "safety",
  components: {
    Nav,
  },
  data() {
    return {
      keyword: "",
      pageSize: 10,
      loading: false,
      noMore: false,
      tabs: [{ name: "待办事件" }, { name: "已办事件" }, { name: "草稿箱" }],
      subTabs: ["主办", "协办", "已发", "已回复"],
      tabIndex: localStorage.getItem("safetyTabIndex") / 1 || 1,
      subTabIndex: localStorage.getItem("safetySubIndex") / 1 || 1,
      list: [],
      total: 0,
      params: {
        pageNo: 1,
        teamworkType: 3,
        // eventHandleType: 1,
        // authName: "stabilityEvent:distributionManagement",
        // dataType: 0,
        // pageNo: 1,
        // pageSize: 10,
        // status: 1,
        // teamworkType: 3,
      },
    };
  },
  computed: {
    streetList() {
      return this.$store.state.common.streetList;
    },
  },
  created() {
    const that = this;
    dd.enablePullToRefresh()
      .then((res) => {
        that.getData();
      })
      .catch((err) => {
        dd.stopPullToRefresh();
      });
    that.getData();
  },
  methods: {
    async getData() {
      this.params.keyword = this.keyword;
      if (this.tabIndex === 1 && this.subTabIndex === 1) {
        this.params.dataType = 1;
        this.params.type = 13;
        // this.params.parentAuthName = "peaceIncident:safeHandleManagement";
      } else if (this.tabIndex === 1 && this.subTabIndex === 2) {
        this.params.dataType = 2;
        this.params.type = 14;
        // this.params.parentAuthName = "peaceIncident:safeHandleManagement";
      } else if (this.tabIndex === 1 && this.subTabIndex === 3) {
        this.params.dataType = 3;
        this.params.type = 15;
        // this.params.parentAuthName = "peaceIncident:safeHandleManagement";
      } else if (this.tabIndex === 1 && this.subTabIndex === 4) {
        this.params.dataType = 5;
        this.params.type = 16;
        // this.params.parentAuthName = "peaceIncident:safeHandleManagement";
      } else if (this.tabIndex === 2) {
        this.params.dataType = 4;
        this.params.type = 17;
        // this.params.parentAuthName = "peaceIncident:safeEventManagement";
      } else if (this.tabIndex === 3) {
        this.params.dataType = 0;
        this.params.type = 18;
        // this.params.parentAuthName = "peaceIncident:safeDistributionManagement";
      }
      this.params.pageSize = this.pageSize;
      const data = await getEventListByTodoForAPP(this.params);
      if (data.success) {
        this.list = data.data.list;
        this.total = data.data.total;
        dd.stopPullToRefresh();
      } else {
        this.list = [];
        this.total = 0;
        dd.stopPullToRefresh();
      }
    },
    search() {
      this.getData();
      this.$refs.input.blur();
    },
    changeIndex(i) {
      this.tabIndex = i;
      localStorage.setItem("safetyTabIndex", i);
      this.pageSize = 10;
      this.keyword = "";
      this.getData();
    },
    checkSubTab(i) {
      if (this.subTabIndex === i + 1) return;
      this.subTabIndex = i + 1;
      localStorage.setItem("safetySubIndex", i + 1);
      this.pageSize = 10;
      this.keyword = "";
      this.getData();
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
    toDetail(id) {
      // let parentAuthName = "";
      // if (this.tabIndex == 1) {
      //   parentAuthName = "peaceIncident:safeHandleManagement";
      // }
      // if (this.tabIndex == 2) {
      //   parentAuthName = "peaceIncident:safeEventManagement";
      // }
      // if (this.tabIndex == 3) {
      //   parentAuthName = "peaceIncident:safeDistributionManagement";
      // }
      this.$router.push(
        // `/safety/safetycheck/detail?id=${id}&type=${this.params.type}&parentAuthName=${parentAuthName}`
        `/safety/safetycheck/detail?id=${id}&type=${this.params.type}`
      );
    },
    add() {
      this.$router.push("/safety/safetycheck/add");
    },
  },
};
</script>
<style lang="less" scoped>
.safety_warp {
  .search {
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
  .tab {
    box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
  }
  .subTab {
    padding: 24px 32px;
    background: #ebebeb;
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
  .list {
    padding: 0 32px;
    li {
      padding: 24px 0;
      border-bottom: solid 1px #d6d6d6;
      h4 {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 20px;
        .cf > .text-overflow-1();
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
