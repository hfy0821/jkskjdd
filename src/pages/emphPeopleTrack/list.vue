<template>
  <div class="reported_warp">
    <div class="reported_warp_top">
      <div @click="selectTime" class="search_time" style="">
        {{ createTime }}
        <img
          style="width: 15px"
          :src="require('assets/image/select.png')"
          alt=""
        />
      </div>
      <form class="search" action=".">
        <!-- <input type="text" style="display: none" /> -->
        <input
          ref="input"
          type="search"
          @keydown.enter="search"
          v-model.trim="keyword"
          placeholder="请输入重点人姓名关键字搜索"
        />
        <i @click="search" class="iconfont icon-sousuo"></i>
        <!-- <span class="search_btn" @click="search" style="">搜索</span> -->
      </form>
    </div>
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(item, index) in list" :key="index">
        <div>
          <span>重点人：</span>
          <span>{{ item.emphasesPeopleName }}</span>
        </div>
        <div>
          <span>地址：</span>
          <span>{{ item.address }}</span>
        </div>
        <div>
          <span>描述：</span>
          <span>{{ item.content }}</span>
        </div>
        <div class="list_img">
          <span>照片：</span>
          <div class="list_img_main">
            <img
              v-for="(item1, index1) in item.fileList"
              :key="index1"
              :src="
                url_ +
                'rbac/file/downloadRb/' +
                item1 +
                '?rbacToken=' +
                rbacToken_ +
                '&isSmall=1'
              "
              alt=""
            />
          </div>
        </div>
        <div class="list_createTime" style="">
          {{ item.reportTime }}
        </div>
        <div
          class="list_reportStatus"
          :class="
            item.reportStatus == 1
              ? 'green'
              : item.reportStatus == 2
              ? 'yellow'
              : 'red'
          "
        >
          {{
            item.reportStatus == 1
              ? "正常"
              : item.reportStatus == 2
              ? "补报"
              : item.reportStatus == 3
              ? "未报"
              : ""
          }}
        </div>
      </li>
      <!-- <li v-if="!noMore" class="loadMore">
                <i class="iconfont icon-Loading"></i>
                加载中...
            </li>
            <li v-if="noMore" class="loadMore">
                没有更多了...
      </li>-->
    </ul>
    <div class="btn" v-if="createTime == todayTime">
      <span @click="reportClick()">上报</span>
    </div>
  </div>
</template>
<script>
import Nav from "../../components/tab";
import {
  getEventListByTodoForAPP,
  getEventList,
  checkUrlRight,
  getPageList,
} from "../../api/a";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      url_: "",
      rbacToken_: "",
      keyword: "",
      todayTime: "",
      createTime: "",
      loading: false,
      noMore: false,
      list: [],
      total: 0,
      pageSize: 0,
    };
  },
  created() {
    const that = this;
    const date = new Date();
    const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      0
    )}-${String(date.getDate()).padStart(2, 0)}`;
    that.createTime = today;
    that.todayTime = today;
    that.url_ = process.env.baseUrl;
    that.rbacToken_ =
      that.$store.getters.rbacToken || localStorage.getItem("rbacToken");
    that.pageSize = 10;
    that.getData();
    dd.ui.pullToRefresh.enable({
      onSuccess: function (res) {
        that.pageSize = 10;
        that.getData();
      },
      onFail: function (err) {},
    });
    // dd.enablePullToRefresh()
    //   .then((res) => {
    //     console.log(res,'res')
    //     that.pageSize = 10;
    //     that.getData();
    //   })
    //   .catch((err) => {
    //     console.log(err,'err')
    //     dd.stopPullToRefresh();
    //   });
  },
  methods: {
    reportClick() {
      this.$router.push({
        path: "/emphPeopleTrack/add",
        query: {},
      });
    },
    selectTime() {
      const that = this;
      dd.showDatePicker({
        format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        value: that.createTime, //默认显示日期
      })
        .then((result) => {
          console.log(result, "////");
          that.createTime = result.value;
          that.getData();
        })
        .catch((err) => {});
    },
    search() {
      this.getData();
      this.$refs.input.blur();
    },
    async getData() {
      let that = this;
      let params = {
        keyword: that.keyword,
        pageNo: 1,
        createTime: that.createTime,
        pageSize: that.pageSize,
      };
      const data = await getPageList(params);
      if (data.success) {
        that.list = data.data.list;
        that.total = data.data.total;
        console.log(that.list, "ll");
        dd.stopPullToRefresh();
      }
    },
    changeIndex(i) {
      this.tabIndex = i;
    },
    checkSubTab(i) {
      this.subTabIndex = i + 1;
    },
    loadMore() {
      let that = this;
      if (that.list && that.list.length == that.total) {
        return false;
      }
      that.pageSize += 10;
      that.getData();
    },
    // 列表详情
    toDetail(v) {
      if (
        v.sourceType == 9 ||
        v.sourceType == 118 ||
        v.sourceType == 119 ||
        v.sourceType == 120 ||
        v.sourceType == 121
      ) {
        this.$router.push(`reported/excessAdd?id=${v.id}&type=${v.sourceType}`);
        // return;
      } else {
        this.$router.push(`reported/add?id=${v.id}&type=${v.sourceType}`);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.reported_warp {
  padding-top: 12vh;
  padding-bottom: 8vh;

  .reported_warp_top {
    position: fixed;
    background: #fff;
    padding-bottom: 1vh;
    z-index: 9999;
    width: 100%;
    top: 0;
    left: 0;
    .search_time {
      display: flex;
      justify-content: center;
      height: 5vh;
      align-items: center;
    }
    .search {
      // display: block;
      // padding: 12px 32px;
      position: relative;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .search_btn {
        color: blue;
        font-size: 0.5rem;
      }
      input {
        height: 100%;
        // width: 80%;
        width: 95%;
        border-radius: 3px;
        padding-left: 10vw;
        background: #dddddd;
        font-size: 30px;
      }
      i {
        font-size: 36px;
        position: absolute;
        left: 4vw;
        top: 18px;
      }
    }
  }

  .list {
    padding: 0 32px;
    li {
      position: relative;
      margin: 24px 0;
      border-bottom: solid 1px #d6d6d6;
      div {
        margin-bottom: 10px;
      }
      .list_img {
        display: flex;
        span {
          flex-shrink: 0;
        }
        .list_img_main {
          white-space: nowrap;
          overflow-x: auto;
          width: 70%;
          img {
            background: gray;
            width: 15vw;
            height: 15vw;
            margin-right: 2vw;
          }
        }
      }
      .list_createTime {
        position: absolute;
        top: 0;
        right: 0;
      }
      .list_reportStatus {
        position: absolute;
        bottom: 20%;
        right: 0;
        color: white;
        border-radius: 3px;
        padding: 5px 15px;
      }
      .green {
        background: #5cb85c;
      }
      .red {
        background: #d9534f;
      }
      .yellow {
        background: #f0ad4e;
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
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: solid 1px #191f251f;
    display: flex;
    background: #fff;
    height: 8vh;
    justify-content: center;
    align-items: center;
    span {
      text-align: center;
      line-height: 6vh;
      background: #409eff;
      color: #fff;
      width: 85%;
      border-radius: 8px;
      margin-right: 14px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
