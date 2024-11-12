<template>
  <div class="clues_warp">
    <div class="tabClass">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
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
        <div class="li_content">
          <div class="li_content_name">{{ item.peopleName }}</div>
          <div class="li_content_riskLevel">
            <span>{{ item.warningLevel }}</span>
          </div>
          <div class="li_content_stress">
            所属镇街:&nbsp;&nbsp;{{ item.roadName }}
          </div>
          <div class="li_content_time">
            最近管控时间:&nbsp;&nbsp;{{ item.controlTime }}
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
import { getControlTaskList } from "../../../api/a";
import Nav from "../../../components/tab";

export default {
  components: { Nav },
  data() {
    return {
      tabs: [
        { name: "全部" },
        { name: "待开启" },
        { name: "进行中" },
        { name: "审核中" },
        { name: "已完结" },
      ],
      loading: false,
      noMore: false,
      tabIndex: localStorage.getItem("taskTabIndex") / 1 || 1,
      listData: [],
      total: 0,
      params: {
        pageNo: 1,
        pageSize: 10,
      },
      missionStatus: "",
    };
  },
  computed: {},
  created() {
    const that = this;
    dd.enablePullToRefresh()
      .then((res) => {
        that.getData();
      })
      .catch((err) => {
        dd.stopPullDownRefresh();
      });
    that.getData();
  },
  methods: {
    // 任务列表tab
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("taskTabIndex", i);
      that.params.pageSize = 10;
      that.getData();
      window.scrollTo(0, 0);
    },
    // 任务列表数据
    async getData() {
      const that = this;
      that.noMore = false;
      const data = await getControlTaskList({
        ...that.params,
        missionStatus: that.tabIndex - 1 == 0 ? "" : that.tabIndex - 1,
      });
      if (data.success) {
        that.listData = data.data.data;
        that.total = data.data.total;
        that.noMore = true;
      }
    },
    loadMore() {
      if (this.listData.length === this.total) return;
      this.params.pageSize += 10;
      this.getData();
    },
    // 查看详情
    toDetail(item) {
      const that = this;
      // 待开启、进行中任务详情
      if (
        item.missionStatus == 1 ||
        item.missionStatus == 2 ||
        item.missionStatus == 3 ||
        item.missionStatus == 4
      ) {
        that.$router.push({
          path: "/zhezheng/controlTask/taskDetail",
          query: {
            id: item.id,
            peopleId: item.peopleId,
            missionStatus: item.missionStatus,
          },
        });

      }
    },
  },
};
</script>
<style lang="less" scoped>
.clues_warp {
  padding-top: 120px;
  .tabClass {
    box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
    background: #fff;
    z-index: 99;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
  .listClass {
    padding: 0 4vw;

    li {
      padding: 1vh 0;
      // border-bottom: solid 1px #d6d6d6;

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
        position: relative;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: solid 1px #eeeeee;
        border-radius: 8px;
        padding-left: 3vw;
        .li_content_name {
          // overflow: hidden;
          display: inline-block;
          text-overflow: ellipsis;
          white-space: normal;
          margin: 2vh 0 1vh 0;
          font-weight: 700;
        }
        .li_content_riskLevel {
          position: absolute;
          // display: inline-block;
          right: 2vw;
          top: 2vw;
          background: #fff;
          height: 6vh;
          padding: 1vh;
          span {
            flex: 1;
            line-height: 4vh;
            background: #eea163;
            color: #fff;
            border-radius: 8px;
            padding: 1vh 5vw;
          }
        }
        .li_content_stress {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #9da0a2;
        }
        .li_content_time {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #9da0a2;
          margin-bottom: 2vh;
        }
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: solid 1px #191f251f;
    display: flex;
    justify-content: space-between;
    background: #fff;
    height: 9vh;
    padding: 2vh;

    span {
      margin: 0 1vw;
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      flex: 1;
      text-align: center;
      line-height: 5vh;
      color: #fff;
      border-radius: 8px;
    }
  }
}
</style>
