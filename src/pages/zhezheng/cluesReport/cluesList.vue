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
          <div class="li_content_describe">{{ item.description }}</div>
          <div class="li_content_time">
            上报时间:&nbsp;&nbsp;{{ item.commitDate }}
          </div>
          <div class="li_content_type">
            类型:&nbsp;&nbsp;{{
              item.infoType == 1 ? "线索" : item.infoType == 2 ? "事件" : ""
            }}
          </div>
        </div>
      </li>
      <li v-if="!noMore" class="loadMoreClass">
        <i class="iconfont icon-Loading"></i>
        加载中...
      </li>
      <li v-if="noMore" class="loadMoreClass">没有更多了...</li>
    </ul>
    <!-- 新增按钮 -->
    <div class="btn">
      <span @click="add()">新增</span>
    </div>
  </div>
</template>
<script>
import { getCluesList } from "../../../api/a";
import Nav from "../../../components/tab";

export default {
  components: { Nav },
  data() {
    return {
      tabs: [{ name: "全部" }, { name: "待研判" }, { name: "已研判" }],
      loading: false,
      noMore: false,
      tabIndex: localStorage.getItem("cluesTabIndex") / 1 || 1,
      listData: [],
      total: 0,
      params: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  computed: {},
  created() {
    const that = this;
    localStorage.removeItem("people_re");
    dd.enablePullToRefresh()
      .then((res) => {
        console.log("res", res);
        that.getData();
      })
      .catch((err) => {
        dd.stopPullDownRefresh();
      });
    that.getData();
  },
  methods: {
    // 线索列表tab
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("cluesTabIndex", i);
      that.params.pageSize = 10;
      that.getData();
      window.scrollTo(0, 0);
    },
    // 线索列表数据
    async getData() {
      const that = this;
      that.noMore = false;
      const data = await getCluesList({
        ...that.params,
        type: 1,
        associateStatus: that.tabIndex - 2 >= 0 ? that.tabIndex - 2 : "",
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
      this.$router.push({
        path: "/zhezheng/cluesReport/cluesDetail",
        query: {
          id: item.id,
          associateStatus: item.associateStatus,
        },
      });
    },
    // 新增
    add() {
      this.$router.push("/zhezheng/cluesReport/cluesAdd");
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
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
  .listClass {
    padding: 0 4vw;

    li {
      padding: 1vh 0;
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
        text-overflow: ellipsis;
        white-space: nowrap;
        border: solid 1px #f4f4f4;
        border-radius: 8px;
        padding: 24px 0 24px 24px;
        .li_content_describe {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          line-height: 32px;
          font-weight: 700;
        }
        .li_content_time {
          color: #737373;
          margin: 20px 0 0 0;
        }
        .li_content_type {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #737373;
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
