<template>
  <div class="SidePage_index">
    <NavHeader :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex" />
    <ul
      class="ulListClass"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li
        @click="detailClick(item, index)"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="li_content">
          {{ item.petitionTime }}
        </div>
        <div class="li_source">
          {{ item.petitionContent }}
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
import NavHeader from "@/components/tab_header";
import { getPeoplePetitionListByDing } from "@/api/a";
export default {
  components: { NavHeader },
  data() {
    return {
      noMore: true,
      tabs: [{ name: "未处置" }, { name: "处置中" }, { name: "处置完成" }],
      tabIndex: localStorage.getItem("SidePage_index") / 1 || 1,
      pageSize: 10,
      list: [
        // {
        //   petitionContent:
        //     "未处置未处置未处置未处置未处置未处置未处置未处置未处置未处置未处置未处置未处置未处置",
        // },
      ],
      total: 0,
    };
  },
  created() {
    this.loadFn();
  },
  methods: {
    //详情页
    detailClick(item) {
      const that = this;
      that.$router.push({
        path: "/ARuiAn/SidePage/detail",
        query: {
          type: that.tabIndex,
          petitionId: item.id,
          petitionRecordId: item.recordId ? item.recordId : "",
        },
      });
    },
    // 分页
    loadMore() {
      const that = this;
      that.pageSize += 10;
      that.loadFn();
    },
    // 列表数据
    async loadFn() {
      const that = this;
      that.noMore = false;
      const res = await getPeoplePetitionListByDing({
        type: that.tabIndex,
        pageSize: that.pageSize,
        pageNo: 1,
      });
      if (res.success) {
        that.total = res.data.total;
        that.list = res.data.list;
        console.log(that.list);
        setTimeout(() => {
          that.noMore = true;
        }, 1000);
      }
    },
    // 切换
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      that.pageSize = 10;
      localStorage.setItem("SidePage_index", i);
      that.loadFn();
    },
  },
};
</script>
<style scoped lang="less">
.SidePage_index {
  .ulListClass {
    > li {
      border: 1px solid #d7d7d7;
      border-radius: 7px;
      margin: 2vh;
      padding: 1vh 2vh;
    }
    .li_content {
      margin-bottom: 1vh;
    }
    .li_source {
      color: #7f7f7f;
    }
    .loadMoreClass {
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
</style>