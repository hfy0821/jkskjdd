<template>
  <div class="stability_warp_index">
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
        <!-- <div class="listClass_li_special">
          <span
            :class="
              item.level == 1 ? 'green' : item.level == 2 ? 'yellow' : 'red'
            "
          ></span>
        </div> -->
        <div class="li_content">
          <div class="li_content_title">{{ item.eventName }}</div>
          <div class="li_content_time">
            您提交的督办事件
            <span style="color: #1c6ef7">{{ item.remark }}111</span>
            的办结申请
            <span class="pass">已通过</span>
            <span class="reject">已驳回</span>
          </div>
          <div class="li_content_time">
            驳回原因: 我是驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因
          </div>
        </div>
      </li>
      <li v-if="!noMore" class="loadMoreClass">
        <i class="iconfont icon-Loading"></i>
        加载中...
      </li>
      <li v-if="noMore" class="loadMoreClass">没有更多了...</li>
    </ul>
    <van-tabbar route v-model="active" class="tabbar" active-color="#ee0a24" inactive-color="#000" @change="onChange">
      <van-tabbar-item to="/ARuiAn/SafetySupervision/index"  name="home" icon="wap-home-o">我的督办事件</van-tabbar-item>
      <van-tabbar-item to="/ARuiAn/SafetySupervision/review" name="review" icon="envelop-o">办结审核</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { _http } from '@/api/a'
export default {
  name: 'SafetySupervisionReview',
  data () {
    return {
      active: 'review',
      listData: [],
      total: 0,
      params: {
        pageNo: 1,
        pageSize: 10
        // showType: 2,
      },
      noMore: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    onChange (index) {
      this.active = index
    },
    async getData () {
      this.noMore = false
      let url = ''
      const data = {}
      if (this.tabIndex === 2) {
        url = 'socialGovernance/monitorMissionMobile/getMonitorAuditPagelist'
        data.auditState = 1
      } else {
        url = 'socialGovernance/monitorMissionMobile/getMonitorPagelist'
        data.state = 3
      }
      const res = await _http(url, { ...data, ...this.params }, 'get')
      if (res.success) {
        this.listData = res.data.data
        this.total = res.data.total
        this.noMore = true
      }
    },
    loadMore () {
      if (this.listData.length === this.total) return
      this.params.pageSize += 10
      this.getData()
    },
    toDetail (item) {
      this.$router.push({
        path: '/ARuiAn/SafetySupervision/detailNew',
        query: {
          type: this.tabIndex,
          ...item
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.stability_warp_index {
  padding-top: 20px;
  .listClass{
    li {
      // padding: 1vh 0;
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
      padding: 0 3vw;
      .li_img {
        width: 25%;
      }
      .li_content {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: #fafafa;
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 12px 8px;
        .li_content_title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #a0a4a5;
        }
        .li_content_time {
          color: #737373;
          margin: 2vh 0 1.5vh 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: pre-wrap;
          color: #737373;
          .pass{
            color: #5dc6aa;
          }
          .reject {
            color: #db5699;
          }
        }
        .li_content_bottom {
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
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
</style>>
