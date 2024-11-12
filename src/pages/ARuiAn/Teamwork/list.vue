<template>
  <div class="Teamwork_class">
    <div class="tabClass">
      <NavHeader :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex" />
    </div>
    <ul
      class="listClass"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li
        @click="toDetail(item, index)"
        v-for="(item, index) in listData"
        :key="index"
        class="listClass_li"
      >
        <div class="li_img">
          <!-- <img :src="require('assets/image/0.png')" alt="" /> -->
        </div>
        <div class="li_content">
          <div class="li_content_line">{{ item.a }}</div>
          <div class="li_content_line">{{ item.b }}</div>
          <div class="li_content_line">{{ item.c }}</div>
          <div class="li_content_line">{{ item.d }}</div>
        </div>
      </li>
      <li v-if="!noMore" class="loadMoreClass">
        <i class="iconfont icon-Loading"></i>
        加载中...
      </li>
      <li v-if="noMore" class="loadMoreClass">没有更多了...</li>
    </ul>
    <div class="btn">
      <span @click="reportEventFn()">上报事件</span>
    </div>
    <!-- <div class="report">
      <i class="iconfont icon-daohanglan"></i>
      <p>上报</p>
    </div> -->
  </div>
</template>
<script>
import NavHeader from "@/components/tab_header";

export default {
  components: {
    NavHeader,
  },
  data() {
    return {
      noMore: false,
      tabs: [
        { name: "上报事件" },
        { name: "带处置事件" },
        { name: "进行中事件" },
        { name: "已处置事件" },
      ],
      tabIndex: localStorage.getItem("Teamwork_list") / 1 || 1,
      listData: [
        {
          a: "事件名称",
          b: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述",
          c: "2020-20-20",
          d: "地址地址地址地址地址",
        },
        {
          a: "事件名称",
          b: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述",
          c: "2020-20-20",
          d: "地址地址地址地址地址",
        },
        {
          a: "事件名称",
          b: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述",
          c: "2020-20-20",
          d: "地址地址地址地址地址",
        },
        {
          a: "事件名称",
          b: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述",
          c: "2020-20-20",
          d: "地址地址地址地址地址",
        },
        {
          a: "事件名称",
          b: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述",
          c: "2020-20-20",
          d: "地址地址地址地址地址",
        },
        {
          a: "事件名称",
          b: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述",
          c: "2020-20-20",
          d: "地址地址地址地址地址",
        },
      ],
    };
  },
  created() {},
  methods: {
    loadFn() {
      this.noMore = false;
      // if (data.success) {
      //   that.listData = data.data.list;
      //   that.total = data.data.total;
      //   that.noMore = true;
      // }
    },
    toDetail(t, i) {
      this.$router.push({
        path: "/ARuiAn/Teamwork/add",
        query: {
          id: t.a,
        },
      });
    },
    reportEventFn() {
      this.$router.push({
        path: "/ARuiAn/Teamwork/add",
      });
    },
    async changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("Teamwork_list", i);
      that.params.pageSize = 10;
      window.scrollTo(0, 0);
    },
  },
};
</script>
<style scoped lang='less'>
.Teamwork_class {
  padding: 7vh 0 11vh 0;

  .tabClass {
    // box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
    // background: #fff;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
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
      //   .li_img {
      // width: 25%;
      //   }
      .li_content {
        flex: 1;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        .li_content_line:nth-child(2) {
          margin: 1vh 0;
          color: gray;
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

    > span {
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      flex: 1;
      text-align: center;
      line-height: 5vh;
      color: #fff;
      border-radius: 8px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>