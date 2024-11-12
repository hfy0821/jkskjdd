<template>
  <div class="stability_warp_index">
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
        <!-- <div class="listClass_li_special">
          <span
            :class="
              item.level == 1 ? 'green' : item.level == 2 ? 'yellow' : 'red'
            "
          ></span>
        </div> -->
        <div class="li_content">
          <div class="li_content_btn">
            <span :class="
              ['red','yellow','green',''][item.eventLevel]
            ">{{ ['特大','重大','较大','一般'][item.eventLevel]}}督办</span>
            <span>主责单位</span>
          </div>
          <div class="li_content_title">{{ item.eventTitle }}</div>
          <div class="li_content_time">{{ item.eventContent }}</div>
          <div class="li_content_bottom">
            <span>{{ tabIndex == 1 ? '督办' : tabIndex == 2 ? '申请' :  '办结'}}时间：</span>
            <span>{{ item.eventTime }}</span>
            <!-- v-show="item.departPermission == 1 && item.monitorStatus == 1" -->
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
import Nav from '@/components/navTabs'
import { _http } from '@/api/a'
import {dictDropDown} from "../../../api/a";
export default {
  name: 'SafetySupervisionIndex',
  components: { Nav },
  data () {
    return {
      active: 'home',
      tabIndex: localStorage.getItem('SafetySupervisionTabIndex') / 1 || 1,
      tabs: [{ value: '督办中',code:1 }, { value: '审核中',code:2 }, { value: '已办结',code:3 }],
      listData: [],
      total: 0,
      params: {
        pageNo: 1,
        pageSize: 10,
        // showType: 2,
      },
      noMore: false
    }
  },
  created () {
    this.getData()
    this.getDictOptions()
  },
  methods: {
    onChange (index) {
      console.log(index)
      this.active = index
    },
    getDictOptions(){
      dictDropDown({dictCode:'SecurityEventMissionSuperviseLevel'}).then(res=>{})
    },
    async getData () {
      this.noMore = false
      let url = ''
      const data = {}
      if (this.tabIndex === 2) {
        url = 'emergency/securityEvent/queryMyEventPage'
        data.auditState = 1
      } else {
        url = 'emergency/securityEvent/queryMyEventPage'
        data.state = this.tabIndex
      }
      const res = await _http(url, { ...data, ...this.params,superviseState:this.tabIndex }, 'get')
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
    },
    changeIndex (i) {
      this.tabIndex = i
      localStorage.setItem('SafetySupervisionTabIndex', i)
      this.params.pageSize = 10
      this.getData()
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.stability_warp_index {
  padding-top: 120px;
  height: 100%;
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
        .li_content_btn {
          text-align: right;
          span {
            display: inline-block;
            padding: 5px 10px;
            background: #5dc687;
            border-radius: 5px;
            color: #fff;
            text-align: center;
            font-size: 24px;
          }
          span:last-child {
            margin-left: 10px;
          }
          .red {
            background: red;
          }
          .green {
            background: green;
          }
          .yellow {
            background: yellow;
          }
        }
        .li_content_title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .li_content_time {
          color: #737373;
          margin: 2vh 0 1.5vh 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: pre-wrap;
          color: #737373;

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
