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
        <div style="padding: 0 2vw 0 0">
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
          <div class="li_content_title">{{ item.name }}</div>
          <div class="li_content_desrcibe">{{ item.content }}</div>
          <div class="li_content_time">{{ item.createTime }}</div>
          <div class="li_content_bottom">{{ item.address }}</div>
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
import { getEquipmentMission } from "../../../api/a";
import Nav from "../../../components/tab";

export default {
  components: { Nav },
  data() {
    return {
      tabs: [
        { name: "待处置任务" },
        { name: "进行中任务" },
        { name: "已处置任务" },
      ],
      loading: false,
      noMore: false,
      tabIndex: localStorage.getItem("equipmentTabIndex") / 1 || 1,
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
    // that.$store.commit({
    //   type: "StoreData",
    //   key: "peopleType",
    //   value: "r.data.userType",
    // });
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
    // 设备操作tab
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("equipmentTabIndex", i);
      that.params.pageSize = 10;
      that.getData();
      window.scrollTo(0, 0);
    },
    // 设备操作数据
    async getData() {
      const that = this;
      that.noMore = false;
      const data = await getEquipmentMission({
        ...that.params,
        type: that.tabIndex,
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
        path: "/ARuiAn/Equipment/detail",
        query: {
          type: this.tabIndex,
          id: item.id,
        },
      });
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
        .li_content_desrcibe {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          margin-top: 2vh;
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
}
</style>
