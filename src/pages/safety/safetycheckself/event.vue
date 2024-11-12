<template>
  <div class="safety_warp">
    <div class="header">
      <div class="header_left">
        <!-- <input
          type="text"
          @click="selectStreet"
          readonly
          v-model="params.roadName"
          placeholder="点击选择检查单位"
        /> -->
        <span @click="selectStreet">
          {{ params.roadName ? params.roadName : "点击选择检查单位" }}
        </span>
        <span>{{ rectifyCount }}/{{ total }}</span>
      </div>
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
    </div>
    <!-- <form class="search" action=".">
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
     <div class="subTab" v-show="tabIndex===1">
            <span v-for="(v,i) in subTabs" :key="i" :class="subTabIndex===i+1?'active':''" @click="checkSubTab(i)">{{v}}</span>
        </div> -->
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <!-- {{list}} -->
      <li v-for="(v, i) in list" :key="i" @click="toDetail(v.id)">
        <div>
          <h4>{{ v.checkTarget }}</h4>
          <i>
            <!-- <s>{{ v.rectifyStatus ? "已整改" : "未整改" }}</s> -->
            <s :style="{ color: v.rectifyStatus ? 'green' : '' }">{{
              v.rectifyStatus ? "已整改" : "未整改"
            }}</s>
          </i>
        </div>
        <!-- <h4>{{ v.checkTarget }}</h4> -->
        <!-- <p>{{v.sourceType}}</p> -->
        <div>
          <span>{{ v.roadName }}</span>
          <i>
            <b class="iconfont icon-time"></b>
            <!-- <s>{{ v.incidentTime }}</s> -->
            <s>{{ v.incidentTime ? v.incidentTime.split(" ")[0] : "" }}</s>
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
// import Nav from "../../../components/tab";
import {
  getEventListByTodoForAPP,
  getSafetySelfCheckPageList,
  getSelfCheckRectifyCount,
} from "../../../api/a";

export default {
  name: "safety",
  data() {
    return {
      keyword: "",
      pageSize: 10,
      loading: false,
      noMore: false,
      // tabs: [{name: '待办事件'},{name: '已办事件'},{name:'草稿箱'}],
      // subTabs: ['主办','协办','已发','已回复'],
      tabIndex: localStorage.getItem("safetyTabIndex") / 1 || 1,
      subTabIndex: localStorage.getItem("safetySubIndex") / 1 || 1,
      list: [],
      total: 0,
      rectifyCount: 0,
      params: {
        pageNo: 1,
        type: 2,
        teamworkType: 6,
        authName: "peaceIncident:statisticsManagement",
        parentAuthName: "peaceIncident:statisticsManagement",
        roadId: "",
        roadName: "",
      },
    };
  },
  computed: {
    streetList() {
      return this.$store.state.common.streetList;
    },
  },
  // mounted() {
  //   this.streetList = this.streetList.unshift({
  //     id: "",
  //     name: "请选择所属街道",
  //   });
  // },
  async created() {
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
    selectStreet() {
      const that = this;
      let options_ = that.streetList.map((item) => {
        return item.name;
      });
      options_.unshift("请选择所属街道");
      dd.device.notification.actionSheet({
        title: "选择检查单位？",
        cancelButton: "取消",
        otherButtons: options_,
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          // that.params.roadId = that.streetList[res.buttonIndex].id;
          // that.params.roadName = that.streetList[res.buttonIndex].name;
          that.params.roadId =
            res.buttonIndex == 0
              ? null
              : that.streetList[res.buttonIndex - 1].id;
          that.params.roadName =
            res.buttonIndex == 0
              ? "请选择所属街道"
              : that.streetList[res.buttonIndex - 1].name;
          that.getData();
        },
        onFail: function (err) {},
      });
    },
    async getData() {
      const that = this;
      const rectifyCount = await getSelfCheckRectifyCount({
        type: 2,
        keyword: that.keyword,
        roadId: that.params.roadId,
      });
      that.rectifyCount = rectifyCount.data.rectifyCount;
      that.params.keyword = that.keyword;
      that.params.teamworkType = 5;
      that.params.pageSize = that.pageSize;
      const data = await getSafetySelfCheckPageList(that.params);
      if (data.success) {
        that.list = data.data.list;
        that.total = data.data.total;
        dd.stopPullToRefresh();
      } else {
        that.list = [];
        that.total = 0;
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
      //   if (this.list.length === this.total) return;
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
      this.$router.push(`/safety/safetycheckself/detail?id=${id}`);
    },
    add() {
      this.$router.push("/safety/safetycheckself/add");
    },
  },
};
</script>
<style lang="less" scoped>
.safety_warp {
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .header_left {
      display: flex;
      width: 60%;
      justify-content: space-around;
    }
  }
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
