<template>
  <div class="stability_warp">
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
        <!-- <div class="li_img"><img :src="require('assets/image/0.png')" alt="" /></div> -->
        <div style="padding: 4px 2vw 0 0">
          <span
            style="
              display: inline-block;
              background: red;
              border-radius: 50%;
              height: 10px;
              width: 10px;
            "
          ></span>
        </div>
        <div class="li_content">
          <div class="li_content_title">{{ item.title }}</div>
          <div class="li_content_time">{{ item.incidentTime }}</div>
          <div class="li_content_bottom">{{ item.incidentAddress }}</div>
        </div>
      </li>
      <li v-if="!noMore" class="loadMoreClass">
        <i class="iconfont icon-Loading"></i>
        加载中...
      </li>
      <li v-if="noMore" class="loadMoreClass">没有更多了...</li>
    </ul>
    <div class="report" @click="add">
      <i class="iconfont icon-daohanglan"></i>
      <p>上报</p>
    </div>
  </div>
</template>
<script>
import {
  getEventListByTodoForAPP,
  getEmergencyEventList,
} from "../../../api/a";
import Nav from "../../../components/tab";

export default {
  components: { Nav },
  data() {
    return {
      tabs: [{ name: "未处置" }, { name: "处置中" }, { name: "处置完成" }],
      loading: false,
      noMore: false,
      tabIndex: localStorage.getItem("stabilityTabIndex") / 1 || 1,
      listData: [],
      total: 0,
      params: {
        pageNo: 1,
        pageSize: 10,
      },
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
    dd.enablePullToRefresh()
      .then((res) => {
        that.getData();
      })
      .catch((err) => {
        dd.stopPullDownRefresh();
      });
  },
  methods: {
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("stabilityTabIndex", i);
      that.params.pageSize = 10;
      that.getData();
      window.scrollTo(0, 0);
    },
    async getData() {
      const that = this;
      that.noMore = false;

      // that.listData = [
      //   {
      //     id: "1",
      //     title:
      //       "在玉海街道办事处附近，有发生踩踏在玉海街道办事处附近，有在玉海街道办事处附近，有发生踩踏在玉海街道办事处附近，有",
      //     time: "2020-20-20 10:10:10",
      //     address:
      //       "地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址",
      //   },
      //   {
      //     id: "1",
      //     title:
      //       "在玉海街道办事处附近，有发生踩踏在玉海街道办事处附近，有在玉海街道办事处附近，有发生踩踏在玉海街道办事处附近，有",
      //     time: "2020-20-20 10:10:10",
      //     address:
      //       "地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址地址",
      //   },
      // ];
      const data = await getEmergencyEventList({
        ...that.params,
        type: that.tabIndex,
      });
      if (data.success) {
        that.listData = data.data.list;
        that.total = data.data.total;
        that.noMore = true;
      }
    },
    search() {
      this.getData();
      this.$refs.input.blur();
    },

    loadMore() {
      if (this.listData.length === this.total) return;
      this.params.pageSize += 10;
      this.getData();
    },
    toDetail(item) {
      //   this.$router.push(`/ARuiAn/LinkageDisposal/detail?id=${id}`);
      this.$router.push({
        path: "/ARuiAn/LinkageDisposal/detail",
        query: {
          type: this.tabIndex,
          emergencyId: item.emergencyId,
        },
      });
    },
    add() {
      this.$router.push("/ARuiAn/LinkageDisposal/add");
    },
  },
};
</script>
<style lang="less" scoped>
.stability_warp {
  padding-top: 120px;
  .tabClass {
    box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
    background: #fff;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    // padding: 4vw;
    // > span {
    //   font-size: 30px;
    // }
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
        text-overflow: ellipsis;
        white-space: nowrap;

        .li_content_title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .li_content_time {
          color: #737373;
          margin: 2vh 0 1vw 0;
        }
        .li_content_bottom {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #737373;
          //   overflow: hidden;
          //   text-overflow: ellipsis;
          //   -webkit-line-clamp: 1;
          //   -webkit-box-orient: vertical;
          //   display: -webkit-box;
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
