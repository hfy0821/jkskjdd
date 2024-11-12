<template>
  <div class="person_warp">
    <div class="listBut">
      <input type="text" v-model="name" class="listBtn" />
      <span class="listSize" @click="changeserch()">搜索</span>
    </div>
    <ul
      v-if="this.listData.length > 0"
      class="listClass"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <span class="person_title"
        >一共检索到<span>{{ this.listData.length }}</span
        >位人员</span
      >
      <li v-for="(item, index) in listData" :key="index" class="listClass_li">
        <div class="li_content">
          <div class="li_content_name">{{ item.name }}</div>
          <div class="li_content_bottom">
            性别:&nbsp;&nbsp;{{
              item.sex == 1 ? "男" : item.sex == 2 ? "女" : ""
            }}
          </div>
          <div class="li_content_bottom">
            出生:&nbsp;&nbsp;{{ item.birthday }}
          </div>
          <div class="li_content_bottom">
            地址:&nbsp;&nbsp;{{ item.address }}
          </div>
          <div class="li_content_citizenId">
            公民身份号码:&nbsp;&nbsp;{{ item.cardId }}
          </div>
          <div class="li_btn">
            <span @click="relevance(index)">关联</span>
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
    <div class="btn" v-if="this.listData.length > 0">
      <span @click="add()">新增</span>
    </div>
  </div>
</template>
<script>
import { associatePeople, peopleSearch } from "../../../api/a";
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
    // 线索列表数据
    async getData() {
      const that = this;
      that.noMore = false;
      let query = that.$route.query;
      const data = await peopleSearch({
        ...that.params,
        name: this.name,
      });
      if (data.success) {
        that.listData = data.data;
        that.total = data.data.total;
        that.noMore = true;
      }
    },
    loadMore() {
      if (this.listData.length === this.total) return;
      this.params.pageSize += 10;
      this.getData();
    },
    //搜索
    changeserch() {
      console.log(111);
      this.getData();
    },
    // 新增
    add() {
      this.$router.push("/zhezheng/cluesReport/personAdd");
    },
    // 关联
    relevance(index) {
      const that = this;
      let query = that.$route.query;
      if (query.type == "add") {
        dd.confirm({
          title: "温馨提示",
          message: "确定关联该人员吗？",
          buttonLabels: ["取消", "确定"],
        })
          .then(async (res) => {
            if (res.buttonIndex == 1) {
              that.$router.push({
                path: "/zhezheng/cluesReport/cluesAdd",
                query: {
                  listData: that.listData[index],
                  formData: query.formData,
                  peoples: query.peoples,
                },
              });
            }
          })
          .catch((err) => {});
      }
      if (query.type == "edit") {
        dd.confirm({
          title: "温馨提示",
          message: "确定关联该人员吗？",
          buttonLabels: ["取消", "确定"],
        })
          .then(async (res) => {
            if (res.buttonIndex == 1) {
              that.$router.push({
                path: "/zhezheng/cluesReport/cluesDetail",
                query: {
                  id: query.detailId,
                  listData: that.listData[index],
                  edit: true,
                },
              });
            }
          })
          .catch((err) => {});
      }
    },
  },
};
</script>
<style lang="less" scoped>
.person_warp {
  padding-top: 40px;
  .listClass {
    padding: 0 4vw;
    .person_title {
      margin-left: 4vw;
      color: #9da0a2;
      span {
        color: #409eff;
        margin: 0 1vw;
      }
    }
    li {
      padding: 1vh 0;
      border: solid 1px #f4f4f4;
      border-radius: 8px;
      margin-top: 2vh;

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
        padding: 0 3vw;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .li_content_name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: bold;
          padding: 2vh 0;
        }
        .li_content_bottom {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #9da0a2;
        }
        .li_content_citizenId {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #9da0a2;
          border-bottom: solid 1px #f4f4f4;
          padding-bottom: 3vh;
        }
        .li_btn {
          display: flex;
          background: #fff;
          height: 7vh;
          width: 30vw;
          padding: 1vh;
          margin-left: 60vw;

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
.listSize {
  margin: 0 1vw;
  background: #409eff;
  color: #fff;
  letter-spacing: 5px;
  flex: 1;
  text-align: center;
  line-height: 5vh;
  color: #fff;
  border-radius: 8px;
  padding: 0vh 1vh;
  display: inline-block;
}
.listBtn {
  border: 1px solid rgb(102, 99, 99);
  height: 5vh;
  width: 80%;
  margin-bottom: 4vw;
  margin-left: 3vw;
}
</style>
