<template>
  <div class="event_warp">
    <div class="tab">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
    </div>
    <div class="topHolder"></div>
    <div class="subTab"></div>
    <!-- 事件详情 -->
    <div class="detailMsg" v-show="tabIndex === 1">
      <ul class="ul">
        <li class="li">
          <span>被检查单位</span>
          <div>{{ detail.checkTarget }}</div>
        </li>
        <li>
          <span>时间</span>
          <div>{{ detail.incidentTime }}</div>
        </li>
        <li>
          <span>检查单位</span>
          <div>{{ detail.roadName }}</div>
        </li>
        <li>
          <span>所属地点</span>
          <div>{{ detail.incidentAddress }}</div>
        </li>
        <div v-for="(item, i) of question" :key="i">
          <li>
            <span>{{
              item.type == 1
                ? "检查项"
                : item.type == 2
                ? "所属类目"
                : item.type == 3
                ? "存在问题"
                : ""
            }}</span>
            <div>{{ item.otherContent }}</div>
          </li>
          <li v-show="item.safetyDepartmentName">
            <span>部门单位</span>
            <div>{{ item.safetyDepartmentName }}</div>
          </li>
          <li v-show="item.textDescription">
            <span>文字描述</span>
            <div>{{ item.textDescription }}</div>
          </li>
        </div>
        <div class="file-box">
          <li v-show="handleList && handleList.length > 0">
            <span>附件信息</span>
          </li>
          <div v-for="(v, i) in handleList" :key="i">
            <li>
              <div class="title">{{ i + 1 }}</div>
              <i>{{ v.createTime }}</i>
            </li>
            <li>
              <div>
                <span>附件信息</span>
                <p @click="preview(v)">{{ v.fileName }}</p>
              </div>
            </li>
            <li>
              <span>上传人</span>
              <div>{{ v.createUserName }}</div>
            </li>
          </div>
        </div>
        <!-- <li v-show="handleList && handleList.length > 0">
          <span>附件信息</span>
        </li>
        <div v-for="(v, i) in handleList" :key="i">
          <li>
            <div class="title">{{ i + 1 }}</div>
            <i>{{ v.createTime }}</i>
          </li>
          <li>
            <div>
              <span>附件信息</span>
              <p @click="preview(v)">{{ v.fileName }}</p>
            </div>
          </li>
          <li>
            <span>上传人</span>
            <div>{{ v.createUserName }}</div>
          </li>
        </div> -->
      </ul>
    </div>
    <!-- 整改情况 -->
    <div class="schedule" v-show="tabIndex === 2">
      <div class="safetyAdd_warp">
        <div class="form">
          <div class="item">
            <p :class="formData.checkPerson ? 'active' : ''">检查人</p>
            <div class="address">
              <input
                readonly
                type="text"
                v-model="formData.checkPerson"
                placeholder="输入检查人"
              />
            </div>
          </div>
          <div class="item">
            <p :class="formData.checkDate ? 'active' : ''">整改时间</p>
            <input
              @click="selectTime"
              type="text"
              readonly
              :value="formData.checkDate"
              placeholder="点击选择时间"
              v-show="!isDetail"
            />
            <div v-show="isDetail">
              {{ formData.checkDate ? formData.checkDate.split(" ")[0] : "" }}
            </div>
          </div>
          <div class="item">
            <p :class="formData.rectifyContent ? 'active' : ''">整改详情</p>
            <input
              type="text"
              v-model="formData.rectifyContent"
              placeholder="整改详情"
              v-show="!isDetail"
            />
            <div v-show="isDetail">
              {{ formData.rectifyContent ? formData.rectifyContent : "" }}
            </div>
          </div>
          <div class="item">
            <p :class="formData.files.length > 0 ? 'active' : ''">照片</p>
            <div class="item_main">
              <span
                style="position: relative"
                v-for="(item1, index1) in formData.files"
                :key="index1"
              >
                <span
                  style="border: 1px solid #e0e0e0; display: inline-block"
                  @click="preview_detail(item1)"
                >
                  <img
                    :src="
                      url_ +
                      'rbac/file/downloadRb/' +
                      item1 +
                      '?rbacToken=' +
                      rbacToken_
                    "
                    alt=""
                  />
                </span>
                <!-- <i style="" @click="delFile(i)" class="iconfont icon-cha2"></i> -->
                <i
                  style=""
                  v-if="!isDetail"
                  @click="delFile(i)"
                  class="iconfont icon-cha2"
                ></i>
              </span>
              <!-- <span v-if="formData.files.length < 5 && !isDetail"> -->
              <span v-if="files.length < 5 && !isDetail">
                <!-- <img :src="require('assets/image/add_img.png')" alt="" /> -->
                <button style="background: #d7d7d7">
                  上传
                  <input
                    @change="fileChange"
                    multiple
                    type="file"
                    name=""
                    id=""
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="endHolder"></div>
        <div class="btn">
          <span @click="handClick(1)" v-if="!isDetail">上报</span>
        </div>
      </div>
    </div>
    <!-- <div class="schedule" v-show="tabIndex === 2">
      <ul
        class="list"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading && tabIndex === 2"
        infinite-scroll-distance="10"
      >
        <li v-for="(v, i) in handleList" :key="i">
          <div>
            <div class="title">{{ i + 1 }}</div>
            <i>{{ v.createTime }}</i>
          </div>
          <div>
            <span>附件信息</span>
            <p @click="preview(v)">{{ v.fileName }}</p>
          </div>
          <div>
            <span>上传人</span>
            <div>{{ v.createUserName }}</div>
          </div>
        </li>
      </ul>
    </div> -->
    <div class="preview" v-show="showImg" @click="showImg = false">
      <img :src="previewUrl" alt />
    </div>
    <div class="endHolder"></div>
  </div>
</template>
<script>
import Nav from "../../../components/tab";
import { GPS } from "../../../utils/tools";
import {
  upload,
  getHandleEventDetailById,
  getSafetyList,
  selSelfCheckFileList,
  saveSafetyRectifySituation,
  getSafetyRectifyProblemList,
  getSafetyRectifySituationList,
} from "../../../api/a";
export default {
  name: "detail",
  components: {
    Nav,
  },
  data() {
    return {
      showImg: false,
      previewUrl: "",
      baseUrl: process.env.baseUrl,
      loading: false,
      noMore: [false, false, false, false, false, false],
      tabs: [{ name: "事件详情" }, { name: "整改详情" }],
      tabIndex: 1,
      id: this.$route.query.id,
      detail: {},
      question: [],
      // right: "",
      handleList: [],
      fileList: [],
      leaderHandleList: [],
      // safety: [],
      signData: {},
      isDetail: 0,
      detailData: [],

      formData: {
        checkPerson: JSON.parse(localStorage.getItem("userInfo")).name, // 检查人
        checkDate: "", // 整改时间
        rectifyContent: "", //文字描述
        files: [], // 附件
        handleFilesListStr: [],
        problemList: [], // 问题对象
        eventId: this.$route.query.id, //事件id
      },
      files: [],
      url_: process.env.baseUrl,
      rbacToken_:
        this.$store.getters.rbacToken || localStorage.getItem("rbacToken"),
      distanceStatus: false,
    };
  },
  async created() {
    const that = this;
    const date = new Date();
    const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      0
    )}-${String(date.getDate()).padStart(2, 0)}`;
    that.formData.checkDate = today;
    that.getDetail();
  },
  methods: {
    async fileChange(e) {
      let sendData = new FormData();
      const files = [...e.target.files];
      let fileCount = this.files.length;
      dd.device.notification.showPreloader({
        text: "文件上传中..",
        showIcon: false,
        onSuccess(result) {
          dd.device.notification.hidePreloader({
            onSuccess: function (result) {},
            onFail: function (err) {},
          });
        },
      });
      dd.device.notification.hidePreloader();
      if (files && files.length) {
        if (files.length > 5) {
          this.alert("最多只能上传5张").call(this);
          return false;
        }
        if (fileCount + files.length > 5) {
          this.alert("最多只能上传5张").call(this);
          return false;
        }
        files.forEach((v, i) => {
          // if (v.type == "image/jpeg" || v.type == "image/png") {
          sendData.append("file", v);
          // } else {
          //   alert("请上传JPG、png图片");
          //   return;
          // }
        });

        sendData.append("rbacToken", localStorage.getItem("rbacToken"));
        // sendData.append("isSmall", 1);
        const data = await upload(sendData);
        // dd.device.notification.hidePreloader();
        if (data.success) {
          data.data.map((item, index) => {
            this.formData.files.push(item);
          });
          data.data.forEach((v, i) => {
            var obj = {};
            obj.fileType = files[i].type;
            obj.fileName = files[i].name;
            obj.fileId = v;
            this.files.push(obj);
          });
        }
      }
    },
    delFile(i) {
      this.formData.files.splice(i, 1);
      this.files.splice(i, 1);
    },
    selectTime() {
      const that = this;
      dd.showDatePicker({
        format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        value: that.formData.checkDate, //默认显示日期
      })
        .then((result) => {
          that.formData.checkDate = result.value;
        })
        .catch((err) => {});
    },
    preview_detail(v) {
      this.showImg = true;
      this.previewUrl = `${
        this.baseUrl
      }rbac/file/downloadRb/${v}?rbacToken=${localStorage.getItem(
        "rbacToken"
      )}`;
    },
    preview(v) {
      // if (v.fileType.indexOf("image") >= 0) {
      this.showImg = true;
      this.previewUrl = `${this.baseUrl}rbac/file/downloadRb/${
        v.fileId
      }?rbacToken=${localStorage.getItem("rbacToken")}`;
      // } else {
      // dd.biz.util.openLink({
      //   url: `${this.baseUrl}rbac/file/downloadRb/${
      //     v.id
      //   }?rbacToken=${localStorage.getItem("rbacToken")}`, //要打开链接的地址
      //   onSuccess: function (result) {
      //     /**/
      //   },
      //   onFail: function (err) {},
      // });
      // }
    },
    alert(v) {
      dd.device.notification.alert({
        message: v,
        title: "提示",
        buttonName: "确定",
      });
    },
    async getDetail() {
      const that = this
      const [data, data2, data3, data4, data5] = await Promise.all([
        // getHandleEventDetailByIdForApp(that.$route.query),
        getHandleEventDetailById({
          id: that.$route.query.id,
          parentAuthName: "peaceIncident:statisticsManagement",
          authType: 1,
        }),
        getSafetyList({ eventId: that.$route.query.id }),
        selSelfCheckFileList({ eventId: that.$route.query.id }),
        getSafetyRectifyProblemList({ eventId: that.$route.query.id }),
        getSafetyRectifySituationList({ eventId: that.$route.query.id }),
      ]);
      if (data.success) {
        that.detail = data.data;
        if(that.detail.handType){
          that.tabs = [{ name: "事件详情" }];
        }
        dd.getGeolocation({
          targetAccuracy: 200,
          coordinate: 1,
          withReGeocode: true,
          useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
        })
          .then((res) => {
            let point = GPS.gcj_decrypt(res.latitude, res.longitude); //转换坐标系
            let distance = that.M({
              lng1: that.detail.x ? that.detail.x : 0,
              lat1: that.detail.y ? that.detail.y : 0,
              lng2: point.lon ? point.lon : 0,
              lat2: point.lat ? point.lat : 0,
            });
            if (distance > 500) {
              that.distanceStatus = false;
            } else {
              that.distanceStatus = true;
            }
          })
          .catch((err) => {});
      }
      if (data2.success) {
        that.question = data2.data;
        let num = 0;
        that.question.map((item, index) => {
          if (item.type == 3) {
            num += 1;
          }
        });
        if (num == 0) {
          that.question.push({ type: 3, otherContent: "无问题" });
        }
      }
      if (data3.success) {
        that.handleList = data3.data;
      }
      if (data4.success) {
        that.formData.problemList = data4.data.map((item) => {
          // item.status = 3;
          item.rectifyStatus = 3;
          return item;
        });
      }
      if (data5.success) {
        if (data5.data.length > 0) {
          that.isDetail = data5.data[0].status;
          that.formData.checkDate = data5.data[0].checkDate;
          that.formData.files = JSON.parse(data5.data[0].files);
          that.formData.rectifyContent = data5.data[0].rectifyContent;
        }
      }
      console.log(data,'ddddddddddddddddddddd')
    },
    // 上报
    handClick() {
      const that = this;
      if (!that.distanceStatus) {
        alert("超出范围");
        return false;
      }
      // console.log(that.formData,'that.formData')
      // return false
      dd.device.notification.confirm({
        message: "确定上报？",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        async onSuccess(result) {
          if (result.buttonIndex == 1) {
            const data = await saveSafetyRectifySituation(that.formData);
            if (data.success == 1) {
              dd.device.notification.toast({
                text: "操作成功",
                duration: 1.5,
                onSuccess(result) {
                  that.$router.go(-1);
                },
                onFail: function (err) {},
              });
            }
          }
        },
        onFail: function (err) {},
      });
    },
    changeIndex(i) {
      if (this.tabIndex === i) return;
      window.scrollTo(0, 0);
      this.tabIndex = i;
    },
    loadMore() {},
  },
};
</script>
<style lang="less" scoped>
.event_warp {
  .tab {
    box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 1;
  }
  .topHolder {
    height: 96px;
  }
  .endHolder {
    height: 136px;
  }
  .subTab {
    height: 24px;
    background: @bgColor1;
  }
  .detailMsg {
    .ul {
      padding: 0 32px;
      .li,
      li {
        display: flex;
        font-size: 28px;
        line-height: 40px;
        padding: 20px 0;
        span {
          width: 200px;
          opacity: 0.7;
        }
        p {
          color: #5f61f8;
          text-decoration: underline;
          word-break: break-all;
        }
        > div {
          flex: 1;
          color: #5f61f8;
        }
        &.checkItem {
          padding: 0;
          > div {
            display: flex;
            padding: 20px 0;
            div {
              flex: 1;
              color: #5f61f8;
            }
          }
        }
        &.first {
          border-top: 1px solid #dcdcdc;
        }
      }
    }
  }
  .list {
    padding: 0 32px;
    li {
      border-bottom: solid 1px #191f251f;
      padding: 20px 0 0;
      > div {
        .detailMsg > .ul > .li;
        padding: 0;
        margin-bottom: 20px;
        .title {
          color: @color;
          opacity: 0.7;
        }
        i {
          display: block;
        }
        p {
          color: #5f61f8;
          text-decoration: underline;
          word-break: break-all;
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
    border-top: solid 1px #191f251f;
    display: flex;
    justify-content: space-between;
    padding: 24px 32px;
    background: #fff;
    span {
      flex: 1;
      text-align: center;
      line-height: 72px;
      background: #409eff;
      color: #fff;
      border-radius: 8px;
      margin-right: 14px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
.safetyAdd_warp {
  // padding-top: 60px;
  input::-webkit-input-placeholder {
    font-size: 24px;
  }

  input::-moz-placeholder {
    font-size: 24px;
  }

  input:-moz-placeholder {
    font-size: 24px;
  }

  input:-ms-input-placeholder {
    font-size: 24px;
  }
  input {
    font-size: 30px;
    line-height: 50px;
    width: 100%;
  }
  .icon-jia,
  .icon-cha2 {
    color: #409eff;
    font-size: 40px;
  }
  .icon-cha2 {
    font-size: 30px;
  }
  .check {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    > div {
      border: 1px solid #e4e4e4;
      height: 46px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-radius: 6px;
      margin: 0 14px 16px 0;
      i {
        margin-left: 10px;
      }
      &.active {
        span {
          color: #409eff;
        }
        border-color: #409eff;
      }
    }
    .icon-jia {
      margin-top: 2px;
      margin-left: auto;
    }
  }
  .form {
    padding: 0 32px;
    &.unclick {
      * {
        pointer-events: none;
      }
    }
    .item {
      border-bottom: solid 1px #e4e4e4;
      padding: 8px 0 24px;
      &.incidentContent {
        p {
          display: inline-block;
          position: relative;
          &::after {
            content: "*";
            position: absolute;
            right: -14px;
            top: 4px;
            color: red;
          }
        }
      }
      .item_main {
        display: flex;
        flex-wrap: wrap;
        span,
        button {
          width: 20vw;
          height: 20vw;
          margin: 0 1vw;
          margin-bottom: 1vh;
          display: inline-block;
          img {
            width: 100%;
            height: 100%;
          }
          i {
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 25px;
          }
        }
      }
      &.question {
        .questionTitle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          i {
          }
        }
        .questionList {
          > div {
            &:first-child {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          }
          .item {
            border: 0;
          }
        }
      }
      .address {
        display: flex;
        input {
          width: auto;
          flex: 1;
        }
        i {
          font-size: 38px;
          opacity: 0.6;
          padding: 4px;
        }
      }
      p {
        line-height: 68px;
        &.active {
          color: #409eff;
          font-size: 24px;
        }
      }
      button {
        line-height: 48px;
        width: 120px;
        color: #fff;
        background: #409eff;
        font-size: 18px;
        border-radius: 4px;
        position: relative;
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      .file {
        li {
          line-height: 50px;
          display: flex;
          span {
            flex: 1;
            .cf > .text-overflow-1();
          }
          i {
            font-size: 30px;
            opacity: 0.6;
            padding: 0 4px;
          }
        }
      }
    }
  }
  .endHolder {
    height: 136px;
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
}
.file-box > div:not(:nth-of-type(1))::before,
.file-box::before {
  content: "";
  display: block;
  border: 1px solid #e0e0e0;
  height: 0;
}
</style>
