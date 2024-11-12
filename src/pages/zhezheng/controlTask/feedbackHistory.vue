<template>
  <div class="history_warp">
    <ul
      class="listClass"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(item, index) in listData" :key="index" class="listClass_li">
        <div class="li_content">
          <div class="li_content_desrcibe">{{ item.content }}</div>
          <div class="li_content_time">
            反馈时间&nbsp;&nbsp;&nbsp;{{ item.handleTime }}
          </div>
          <div class="li_content_department">
            处置单位&nbsp;&nbsp;&nbsp;{{ item.dealDepartmentName }}
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
import { getTaskHandle } from '../../../api/a';
export default {
  data() {
    return {
      loading: false,
      noMore: false,
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
    // 反馈历史数据
    async getData() {
      const that = this;
      that.noMore = false;
      let query = that.$route.query;
      const data = await getTaskHandle({
        id: query.id
      });
      if (data.success) {
        that.listData = data.data;
        that.noMore = true;
      }
    },
    loadMore() {
      if (this.listData.length === this.total) return;
      this.params.pageSize += 10;
      this.getData();
    },
  },
};
</script>
<style lang="less" scoped>
.history_warp {
  padding-top: 40px;
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
        .li_content_desrcibe {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          margin-top: 2vh;
          line-height: 4vh;
        }
        .li_content_time {
          color: #9da0a2;
          margin: 2vh 0 1vw 0;
        }
        .li_content_department {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #9da0a2;
          padding-bottom: 3vh;
        }
      }
    }
  }
}
</style>
