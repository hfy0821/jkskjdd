<template>
  <div style="height: 100%">
    <NavHeader :tabs="tabs"
               :tabIndex="tabIndex"
               @changeIndex="changeIndex" />
    <div v-if="tabIndex == 1"
         class="listing">
      <!--事件详情-->
      <div class="content">
        <div class="content_detail">
          <div>
            <span>异动内容：</span>
            <span>{{ detail.petitionContent }}</span>
          </div>
          <div>
            <span>异动时间：</span>
            <span>{{ detail.petitionTime }}</span>
          </div>
          <div>
            <span>户籍地址：</span>
            <span>{{ detail.permanentAddress }}</span>
          </div>
        </div>
      </div>
      <!-- 处置情况 -->
      <div class="instructions">
        <div class="head">
          <div class="left-side">
            <img src="../../../assets/image/eventIcon/czqk.png" />
            <span>处置情况</span>
          </div>
          <div @click="handleAddClick()"
               class="right-side">
            <img src="../../../assets/image/eventIcon/add.png" />
            <span>添加</span>
          </div>
        </div>
        <div class="table handleClass">
          <div>
            <div class="title">
              <span class="title_inline"
                    style="width: 20%">处置人</span>
              <span class="title_inline"
                    style="width: 45%">处置内容</span>
              <span class="title_inline"
                    style="width: 35%">处置时间</span>
            </div>
            <div class="list"
                 v-if="detail.peoplePetitionRecordList.length == 0">
              <span style="width: 100%; text-align: center">
                暂无处置情况
              </span>
            </div>
            <div class="list"
                 v-for="(item, index) in detail.peoplePetitionRecordList"
                 :key="index">
              <span class="title_inline"
                    style="width: 20%">
                {{ item.createName }}
              </span>
              <span class="title_inline"
                    style="width: 45%">
                {{ item.recordContent }}
              </span>
              <span class="title_inline"
                    style="width: 35%">
                {{ item.createTime }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!--底部-->
      <div class="bottom-box">
        <p class="line"></p>
        <span>已是最底部</span>
        <p class="line"></p>
      </div>
    </div>
    <!-- 流程 -->
    <div v-if="tabIndex == 2"
         class="flowClass">
      <div v-for="(item, index) in processHandles"
           :key="index"
           :style="index + 1 == processHandles.length ? 'border:none' : ''">
        <span class="flowClass_icon"></span>
        <div class="flowClass_t">{{ item.createTime }}</div>
        <div class="flowClass_t">{{ item.combineContent }}</div>
        <!-- <div v-if="item.handleMap.fileList">
            <img
              @click="preview(t, item.handleMap.fileList)"
              v-for="(t, i) in item.handleMap.fileList"
              :key="i"
              :src="
                baseUrl +
                'rbac/file/downloadRb/' +
                t.fileId +
                '?rbacToken=' +
                rbacToken_
              "
              alt=""
              style="width: 30%; height: 25vw; margin: 1vw"
            />
          </div> -->
      </div>
    </div>
    <!-- btn -->
    <div style="height: 10vh"></div>
    <div class="btn">
      <span v-if="signOpdata && detail.isSign != 1 && type != 1"
            @click="signClick()">
        签到
      </span>
      <span @click="toEarlywarning(1)"
            v-if="
          (detail.warningOpdata &&
            signOpdata &&
            detail.isSign == 1 &&
            detail.petitionStatus != 1) ||
          (detail.warningOpdata && !signOpdata && detail.petitionStatus != 1)
        ">
        预警
      </span>
      <span @click="toEarlywarning(2)"
            v-if="
          (detail.urgOpdata &&
            signOpdata &&
            detail.isSign == 1 &&
            type != 1 &&
            detail.petitionStatus != 1) ||
          (detail.urgOpdata &&
            !signOpdata &&
            type != 1 &&
            detail.petitionStatus != 1)
        ">
        催办
      </span>
      <span @click="toEarlywarning(3)"
            v-if="
          (detail.endOpdata &&
            signOpdata &&
            detail.isSign == 1 &&
            detail.petitionStatus != 1 &&
            type != 1) ||
          (detail.endOpdata &&
            !signOpdata &&
            detail.petitionStatus != 1 &&
            type != 1)
        ">
        异动结束
      </span>
    </div>
  </div>
</template>
<script>
import {
  updateJspticket,
  fyApiGatewayConfig,
  fyApiGatewayUserInfo,
  confirmRead,
  signRecord,
  getPetitionRecordListById,
  getSignOpdata,
  getPeoplePetitionInfoByDing,
  addPeoplePetitionRecord,
} from "@/api/a.js";
import ding from "@/common/ding";
import NavHeader from "@/components/tab_header";
export default {
  components: { NavHeader },
  data () {
    return {
      signOpdata: false, //签到
      processHandles: [
        // { createTime: "createTime", title: "title" },
      ],
      tabs: [{ name: "异动详情" }],
      tabIndex: localStorage.getItem("SidePage_detail") / 1 || 1,
      petitionId: "",
      petitionRecordId: "",
      detail: {
        peoplePetitionRecordList: [],
      },
      nums: 1,
      latitude: "",
      longitude: "",
      address: "",
      type: "",
    };
  },
  async created () {
    const that = this;
    that.getGeolocationFn();
    let query = that.$route.query;
    that.petitionId = query.petitionId;
    that.petitionRecordId = query.petitionRecordId;
    that.type = query.type;
    if (query.type == 2 || query.type == 3) {
      that.getSignOpdataFn();
      that.tabs = [{ name: "异动详情" }, { name: "处置进度" }];
    } else {
      that.tabs = [{ name: "异动详情" }];
    }
    that.getPetitionRecordListByIdFn();
    that.getPeoplePetitionInfoByDingFn();
  },
  methods: {
    toEarlywarning (type) {
      const that = this;
      if (type == 1) {
        that.$router.push({
          path: "/ARuiAn/SidePage/earlyWarning",
          query: {
            petitionId: that.petitionId,
            recordType: 202,
            type: that.type,
            peopleId: that.detail.peopleId,
          },
        });
      }
      if (type == 2) {
        that.$router.push({
          path: "/ARuiAn/SidePage/earlyWarning",
          query: {
            petitionId: that.petitionId,
            recordType: 203,
            type: that.type,
          },
        });
      }
      if (type == 3) {
        dd.prompt({
          message: "",
          title: "异动结束内容",
          buttonLabels: ["确定", "取消"],
        })
          .then(async (res) => {
            console.log(res, "sssss");
            if (res.buttonIndex == 0) {
              let res1 = await addPeoplePetitionRecord({
                petitionId: that.petitionId,
                recordType: 299,
                recordContent: res.value ? res.value : "",
              });
              if (res1.success) {
                dd.toast({
                  icon: "success",
                  text: "操作成功",
                }).then((res) => {
                  that.getPetitionRecordListByIdFn();
                  that.getPeoplePetitionInfoByDingFn();
                });
              }
            }
          })
          .catch((err) => { });
        // dd.confirm({
        //   title: "温馨提示",
        //   message: "确定提交？",
        //   buttonLabels: ["取消", "确定"],
        // }).then(async (res) => {
        //   if (res.buttonIndex == 1) {
        //   }
        // });
      }
    },
    async changeIndex (i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("SidePage_detail", i);
    },
    async getPeoplePetitionInfoByDingFn () {
      const that = this;
      const res = await getPeoplePetitionInfoByDing({
        id: that.petitionId,
        petitionRecordId: that.petitionRecordId,
      });
      console.log(res, "详情接口");
      if (res.success) {
        that.detail = res.data;
      }
    },
    async getPetitionRecordListByIdFn () {
      const that = this;
      const res = await getPetitionRecordListById({
        pentitionId: that.petitionId,
      });
      if (res.success) {
        that.processHandles = res.data;
        console.log(that.processHandles, "流程详情");
      }
    },
    async signClick () {
      const that = this;
      const ress = await signRecord({
        recordType: 205,
        petitionId: that.petitionId,
        id: that.petitionRecordId,
        longitude: that.longitude,
        latitude: that.latitude,
        recordAddress: that.address,
      });
      if (ress.success) {
        that.getPetitionRecordListByIdFn();
        that.getPeoplePetitionInfoByDingFn();
        dd.toast({
          icon: "success",
          text: "操作成功", //提示信息
        });
      }
    },
    handleAddClick () {
      const that = this;
      //   跳转添加处置页面
      that.$router.push({
        path: "/ARuiAn/SidePage/add",
        query: {
          id: that.petitionId,
        },
      });
    },
    async getSignOpdataFn () {
      const that = this;
      const res = await getSignOpdata({ pentitionId: that.petitionId });
      if (res.success) {
        that.signOpdata = res.data;
      }
    },
    async confirmRead_interface () {
      const that = this;
      const res = await confirmRead({
        recordType: 204,
        petitionId: that.petitionId,
        id: that.petitionRecordId,
      });
    },
    getGeolocationFn () {
      const that = this;
      dd.getGeolocation({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
      })
        .then(async (res) => {
          that.latitude = res.latitude;
          that.longitude = res.longitude;
          that.address = res.address;
          //  var point = GPS.gcj_decrypt(res.latitude, res.longitude); //转换坐标系
          // that.formData.x = point.lon;
          // that.formData.y = point.lat;
        })
        .catch((err) => { });
    },
    async GC () {
      const that = this;
      let GC = "";
      let config = "";
      if (that.nums == 1) {
        GC = await fyApiGatewayConfig({ dingId: ding.dingId });
        config = GC.data;
      }
      if (that.nums == 2 || that.nums == 3) {
        GC = await updateJspticket({ dingId: ding.dingId });
        config = GC.data;
      }
      if (config) {
        dd.authConfig({
          ticket: config.jsticket,
          jsApiList: [
            "locateOnMap",
            "searchOnMap",
            "getGeolocation",
            "startGeolocation",
          ],
        })
          .then(async (res) => {
            console.log(
              res,
              that.nums == 1 ? "鉴权成功 getConfig" : "鉴权成功 updateJspticket"
            );
          })
          .catch(async (err) => {
            console.log(
              err,
              that.nums == 1 ? "鉴权失败 getConfig" : "鉴权失败 updateJspticket"
            );
            that.nums += 1;
            that.GC();
          });
      }

      // getuserInfo
      dd.getAuthCode().then(async (info) => {
        let data = {
          code: info.code,
          corpid: ding.corpId,
          dingId: ding.dingId,
        };
        const FU = await fyApiGatewayUserInfo(data);
        if (FU.success) {
          const userInfo = FU.data;
          localStorage.setItem("rbacToken", userInfo.rbacToken);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          that.$store.commit("setToken", userInfo.rbacToken);
          // 获取页面详情id
          // let getId = window.location.href;
          // that.petitionId = getId.split("petitionId=")[1].split("&")[0];
          // that.petitionRecordId = getId
          //   .split("petitionId=")[1]
          //   .split("&")[1]
          //   .split("=")[1];
          // let a ="http://192.168.1.185:8888/#/ARuiAn/SidePage/list?petitionId=3&petitionRecordId=4";
          console.log(window.location.href, "window.location.href");
          // 详情接口
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.listing {
  background-color: #f1f2f9;
  height: calc(100% - 16vh);
  .content {
    background-color: #fff;
    padding: 1vh;
    .content_detail {
      > div {
        display: flex;
        margin-bottom: 1vh;
        > span {
          display: inline-block;
        }
        > span:first-child {
          width: 23%;
        }
        > span:last-child {
          flex: 1;
        }
      }
    }
    .sub {
      border-bottom: 0.05rem solid #fc3f3f;
      padding-bottom: 0.1rem;
      margin-bottom: 0.37rem;
      display: flex;
      justify-content: space-between;

      span {
        color: #989898;
        font-size: 0.26rem;
      }
    }

    > p {
      color: #555;
      font-size: 0.31rem;
      text-indent: 2em;
    }
  }
  .table {
    margin: 0;
  }
  .instructions {
    margin-top: 0.2rem;
    background: white;
    .head {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e4e4e4;
      line-height: 0.93rem;
      padding: 0 0.3rem;
      .left-side {
        img {
          width: 0.35rem;
          height: 0.35rem;
        }
      }
      .right-side {
        image,
        img {
          width: 0.38rem;
          height: 0.38rem;
          vertical-align: middle;
        }
        span {
          color: #4a5bf4;
          font-size: 0.38rem;
          vertical-align: middle;
        }
      }
    }
    .table {
      padding: 0.3rem;
      > div {
        border-top: 1px solid #e4e4e4;
        border-left: 1px solid #e4e4e4;
        div {
          display: flex;
          span {
            padding: 0.19rem 0.23rem;
            border-right: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            &:nth-child(1) {
              width: 1.6rem;
            }
            &:nth-child(2) {
              flex: 1;
            }
            &:nth-child(3) {
              width: 2.05rem;
            }
          }
          &.title {
            font-size: 0.28rem;
            color: #999999;
          }
          &.list {
            color: #555555;
            font-size: 0.31rem;
          }
        }
      }
    }
    .handleClass {
      .title_inline {
        display: inline-block;
      }
    }
  }
  .program {
    margin-top: 0.2rem;
    background: white;
    .head {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e4e4e4;
      line-height: 0.93rem;
      padding: 0 0.3rem;
      .left-side {
        img {
          width: 0.35rem;
          height: 0.35rem;
        }
      }
      .right-side {
        image,
        img {
          width: 0.28rem;
          height: 0.28rem;
        }
        span {
          color: #4a5bf4;
          font-size: 0.28rem;
        }
      }
    }
    .table {
      padding: 0.3rem;
      table {
        td {
          border: 1px solid #ccc;
          text-align: center;
          padding: 0.2rem;
          word-break: break-all;
          vertical-align: middle;
        }
        .defuse {
          td {
            &:first-child {
              padding: 0.8rem 0;
            }
            &:last-child {
              padding: 0.3rem;
              text-align: left;
            }
          }
        }
      }
    }
  }
  .disposition {
    padding: 0.3rem 0.3rem 0.1rem;
    font-size: 0.28rem;
    color: #999999;
    span {
      color: #fc3f3f;
    }
  }
  .endList {
    line-height: 1.11rem;
    &.submission {
      margin-top: 0.2rem;
    }
    background: white;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    div {
      width: 1.8rem;
      img {
        width: 0.35rem;
        height: 0.35rem;
      }
      i {
        color: #333333;
        font-size: 0.33rem;
      }
    }
    section {
      flex: 1;
      display: flex;
      color: #555555;
      font-size: 0.33rem;
      justify-content: flex-end;
      flex-wrap: wrap;
      span {
        margin-left: 0.4rem;
      }
    }
  }
  .bottom-box {
    height: 0.76rem;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    background-color: #f1f2f9;
    span {
      font-size: 0.24rem;
      color: #999999;
      line-height: 0.76rem;
      padding: 0 0.3rem;
    }
    .line {
      flex: 1;
      height: 1px;
      background-color: #dddddd;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.flowClass {
  padding: 3vh;

  > div {
    position: relative;
    border-left: 1px solid #bbbbbb;
    padding: 0vh 5vw 3vh 5vw;
    .flowClass_icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: #d2d2d2;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: -15px;
    }
    .flowClass_t {
      margin-bottom: 2vh;
    }
  }
}
.btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: solid 1px #e4e4e4;
  background: #fff;
  display: flex;
  justify-content: space-between;
  span {
    flex: 1;
    background: #409eff;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    margin: 2vh 1vh 3vh 1vh;
    line-height: 5vh;
    display: inline-block;
  }
}
</style>