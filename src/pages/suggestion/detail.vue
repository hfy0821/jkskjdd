<template>
  <div class="stability_warp">
    <form class="search" action=".">
      <input type="text" style="display: none" />
      <input
        ref="input"
        type="search"
        @keydown.enter="search"
        v-model="keyword"
        placeholder="请输入搜索关键字，如景山街道"
      />
      <i class="iconfont icon-sousuo"></i>
    </form>
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(v, i) in list" :key="i">


        <div class="content">
          <span>反馈类型</span>
          <span>{{ v.sourceTypeName }}</span>
        </div>
        <div class="content">
          <span>反馈模块</span>
          <span>{{ v.moduleName }}</span>
        </div>
        <div class="content">
          <span>问题和意见</span>
          <span>{{ v.content }}</span>
        </div>


        <div class="img-content" v-show="v.fileList">
          <span>图片</span>
          <div class="img-boxs">
            <div class="img-box" v-for="(imgItem, i) in v.fileList" :key="i" @click="preview(imgItem)">
              <img
                :src="
                  url_ +
                  'rbac/file/downloadRb/' +
                  imgItem +
                  '?rbacToken=' +
                  rbacToken_ 
                "
                alt=""
              />
            </div>
          </div>
        </div>

        <div class="time-style">
          <i>
            <b class="iconfont icon-time"></b>
            <s>{{ v.createTime }}</s>
          </i>
        </div>
      </li>
    </ul>

      <div class="preview" v-show="showImg" @click="showImg = false">
      <img :src="previewUrl" @click="showImg = false" alt />
    </div>
    <div class="btn">
      <span @click="goToAdd">意见反馈</span>
    </div>
    <!-- <button class="bottomBtn" @click="goToAdd">意见反馈</button> -->
  </div>
</template>
<script>
import Nav from "../../components/tab";
import { getDetailList } from "../../api/a";
export default {
  name: "stability",
  components: {
    Nav,
  },
  data() {
    return {
      keyword: "",
      url_: "",
      showImg: false,
      previewUrl: "",
      rbacToken_: "",
      pageSize: 10,
      loading: false,
      noMore: false,
      tabs: [{ name: "待办事件" }, { name: "已办事件" }, { name: "草稿箱" }],
      subTabs: ["主办", "协办", "已发", "已回复"],
      tabIndex: localStorage.getItem("stabilityTabIndex") / 1 || 1,
      subTabIndex: localStorage.getItem("stabilitySubIndex") / 1 || 1,
      list: [],
      total: 0,
      params: {
        pageNo: 1,
        teamworkType: 1,
        eventHandleType: 1,
      },
    };
  },
  computed: {
    streetList() {
      return this.$store.state.common.streetList;
    },
  },
  created() {
    const that = this;
    that.url_ = process.env.baseUrl;
    that.rbacToken_ =
      that.$store.getters.rbacToken || localStorage.getItem("rbacToken");

    dd.enablePullToRefresh()
      .then((res) => {
        that.getData();
      })
      .catch((err) => {
        dd.stopPullDownRefresh();
      });
    this.getData();
  },
  methods: {
    async getData() {
      this.params.pageSize = this.pageSize;
      this.params.keyword = this.keyword;
      if (this.tabIndex === 1 && this.subTabIndex === 1) {
        this.params.dataType = 1;
        this.params.type = 7;
      } else if (this.tabIndex === 1 && this.subTabIndex === 2) {
        this.params.dataType = 2;
        this.params.type = 8;
      } else if (this.tabIndex === 1 && this.subTabIndex === 3) {
        this.params.dataType = 3;
        this.params.type = 9;
      } else if (this.tabIndex === 1 && this.subTabIndex === 4) {
        this.params.dataType = 5;
        this.params.type = 10;
      } else if (this.tabIndex === 2) {
        this.params.dataType = 4;
        this.params.type = 11;
      } else if (this.tabIndex === 3) {
        this.params.dataType = 0;
        this.params.type = 12;
      }
      const data = await getDetailList(this.params);
      if (data.success) {
        this.list = data.data.list;
        this.total = data.data.total;
        dd.stopPullDownRefresh();
      }
    },
    search() {
      this.getData();
      this.$refs.input.blur();
    },
    changeIndex(i) {
      console.log(i);
      this.tabIndex = i;
      localStorage.setItem("stabilityTabIndex", i);
      this.pageSize = 10;
      this.keyword = "";
      this.getData();
    },
    checkSubTab(i) {
      if (this.subTabIndex === i + 1) return;
      this.subTabIndex = i + 1;
      localStorage.setItem("stabilitySubIndex", i + 1);
      this.pageSize = 10;
      this.keyword = "";
      this.getData();
    },
    loadMore() {
      this.pageSize += 10;
      this.getData();
    },
    add() {
      this.$router.push("stability/add");
    },
     preview(v) {
        this.showImg = true;
        this.previewUrl = `${this.url_}rbac/file/downloadRb/${v}?rbacToken=${localStorage.getItem("rbacToken")}`
    },
    goToAdd(){
      this.$router.push('suggestion/add')
    }
  },
};
</script>
<style lang="less" scoped>
.stability_warp {
  .search {
    padding: 12px 32px;
    position: relative;
    input {
      width: 100%;
      height: 72px;
      padding-left: 72px;
      background: #dddddd;
      font-size: 30px;
    }
    i {
      font-size: 36px;
      position: absolute;
      left: 52px;
      top: 30px;
    }
  }
  .tab {
    box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
  }
  .subTab {
    padding: 24px 32px;
    background: rgb(235, 235, 235);
    display: flex;
    span {
      width: 110px;
      line-height: 48px;
      height: 44px;
      text-align: center;

      border-radius: 4px;
      margin-right: 20px;
      color: #191f2599;
      &.active {

        color: #fff;
      }
    }
  }
  .list {
    padding: 0 32px;
    padding-bottom: 150px;
    li {
      padding: 24px 0;
      border-bottom: solid 1px #d6d6d6;
      .content {
        margin: 20px 0 20px 0;
        > span{
          margin-right: 20px;
        }
        .img-box {
          margin-left: 20px;
          width: 50px;
          height: 50px;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .img-content {
        > span {
          margin-right: 20px;
          float: left;
        }
        .img-boxs {
          display: flex;
          flex-wrap: wrap;
          .img-box {
            margin: 20px;
            width: 100px;
            height: 100px;
            border: 1px solid#000000;
            >img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .time-style {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        span {
          color: #f4ae4a;
          font-size: 24px;
        }
        i {
          b {
            opacity: 0.6;
            font-size: 24px;
          }
          s {
            font-size: 24px;
            opacity: 0.6;
          }
        }
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
    .preview {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(25, 31, 37, 0.7);
    z-index: 1;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
    .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: solid 1px #e4e4e4;
    display: flex;
    justify-content: space-between;
    padding: 24px 32px;
    background: #fff;
    i,
    b,
    span {
      text-align: center;
      line-height: 72px;
      border-radius: 8px;
      letter-spacing: 5px;
    }
    span {
      width: 100%;
      background: #409eff;
      color: #fff;
    }
    i,
    b {
      width: 320px;
    }
    i {
      border: 1px solid #409eff;
      color: #409eff;
    }
    b {
      background: #409eff;
      color: #fff;
    }
  }
  // button {
  //   position: fixed;
  //   bottom: 30px;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   display: block;
  //   width: 60%;
  //   height: 100px;
  //   border-radius: 5px;
  //   outline: none;
  //   border: 0;
  //   background-color: blue;
  //   line-height: 100px;
  //   text-align: center;
  //   color: #ffffff;
  //   font-size: 30px;
  //   font-weight: bold;
  //   letter-spacing: 5px;
  // }
}
</style>
