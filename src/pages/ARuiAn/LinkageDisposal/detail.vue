<template>
  <div class="event_warp">
    <!-- <div class="tab">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
    </div>
    <div class="topHolder"></div>
    <div class="subTab"></div> -->
    <!-- 详情 -->
    <div class="detailMsg">
      <div class="header_icon"><span>基本信息</span></div>
      <ul class="ul">
        <li class="li">
          <span>上报人员</span>
          <div>
            {{ runHanding.createUserName }}
          </div>
        </li>
        <li>
          <span>上报时间</span>
          <div>{{ runHanding.createTime }}</div>
        </li>
        <li>
          <span>事件类别</span>
          <div>{{ runHanding.eventTypeName }}</div>
        </li>
        <li class="ea">
          <span>事件地点</span>
          <div class="ea_d">
            {{ runHanding.incidentAddress }}
            <span
              v-if="runHanding.incidentAddress"
              @click="
                navigationFn(
                  runHanding.incidentAddress,
                  runHanding.x,
                  runHanding.y
                )
              "
              style="color: #01a6ff"
              >【点击导航】</span
            >
          </div>
        </li>
        <!-- <li>
          <span>事件发展趋势</span>
          <div>{{ runHanding.trends }}</div>
        </li>
        <li>
          <span>已采取的措施</span>
          <div>{{ runHanding.measuresTaken }}</div>
        </li>
        <li>
          <span>其他备注</span>
          <div>{{ runHanding.incidentRemark }}</div>
        </li> -->
        <li>
          <span>照片信息</span>
          <div class="li_fileList">
            <img
              @click="preview(item, runHanding.fileList)"
              v-for="(item, index) in runHanding.fileList"
              :key="index"
              :src="
                baseUrl +
                'rbac/file/downloadRb/' +
                item.fileId +
                '?rbacToken=' +
                rbacToken_
              "
              alt=""
            />
          </div>
        </li>
      </ul>
    </div>
    <!-- 分析  -->
    <div class="analyseClass">
      <div class="header_icon"><span>分析研判</span></div>
      <div class="form" :class="edit ? '' : 'unclick'">
        <div class="item">
          <p :class="formData.joinNum ? 'active' : ''">人员数量</p>
          <input
            type="number"
            v-model.trim="formData.joinNum"
            placeholder="在此输入人员数量"
            :readonly="disabled"
          />
        </div>
        <div class="item">
          <p :class="formData.warningLevel ? 'active' : ''">事件等级</p>
          <input
            type="text"
            @click="disabled ? null : warningLevelFn()"
            readonly
            v-model.trim="formData.warningLevelName"
            placeholder="在此输入事件等级"
          />
        </div>
        <div class="item">
          <p :class="formData.warningLevel ? 'active' : ''">现实行为</p>
          <input
            type="text"
            @click="disabled ? null : warningLevelFn()"
            readonly
            v-model.trim="formData.warningLevelName"
            placeholder="在此选择现实行为"
          />
        </div>
        <!-- <div class="item">
          <p :class="formData.eventType ? 'active' : ''">适用类型</p>
          <input
            type="text"
            @click="disabled ? null : eventTypFn()"
            readonly
            v-model.trim="formData.eventTypeName"
            placeholder="在此输入适用类型"
          />
        </div> -->
        <div class="item">
          <p :class="planId ? 'active' : ''">选择预案</p>
          <input
            type="text"
            v-model.trim="planName"
            @click="disabled ? null : planIdFn()"
            readonly
            placeholder="在此选择应急预案"
          />
        </div>
        <div class="item">
          <p :class="formData.incidentContent ? 'active' : ''">事件描述</p>
          <input
            type="text"
            v-model.trim="formData.incidentContent"
            placeholder="在此输入事件描述"
            :readonly="disabled"
          />
        </div>
        <div class="item">
          <p :class="formData.remark ? 'active' : ''">备注</p>
          <input
            type="text"
            v-model.trim="formData.remark"
            placeholder="在此输入备注"
            :readonly="disabled"
          />
        </div>
        <div class="item">
          <p class="active">研判人员</p>
          <input
            type="text"
            v-model.trim="formData.createUserName"
            readonly
            placeholder="在此输入研判人员"
          />
        </div>
        <div class="item">
          <p class="active">研判时间</p>
          <input
            type="text"
            readonly
            v-model.trim="formData.createTime"
            placeholder="在此输入研判时间"
          />
        </div>
        <div class="item" style="border-bottom: none">
          <p class="active">研判地址</p>
          <input
            type="text"
            readonly
            v-model.trim="formData.studyAddress"
            placeholder="在此输入研判地址"
          />
        </div>
      </div>
    </div>
    <!-- 指挥调度  -->
    <div v-if="type != 1 && emergencyData.length" class="emergency_c">
      <div class="header_icon"><span>指挥调度</span></div>
      <div class="emergency_c_header">
        <span
          @click="emergencyClick(true)"
          :class="emergencyStatus ? 'active_s' : ''"
          >指挥室信息</span
        >
        <span
          @click="emergencyClick(false)"
          :class="!emergencyStatus ? 'active_s' : ''"
          >已上报信息</span
        >
      </div>
      <div class="emergency_c_content">
        <div v-for="(item, index) in emergencyData" :key="index">
          <p>{{ item.progressTime }}</p>
          <p>{{ item.progressContent }}</p>
        </div>
      </div>
    </div>
    <!-- 流程 -->
    <div v-if="type == 3" class="handleClass">
      <div class="header_icon"><span>处置详情</span></div>
      <div class="handle_div" v-if="detailData.processHandles">
        <div
          v-for="(item, index) in detailData.processHandles"
          :key="index"
          :style="
            index + 1 == detailData.processHandles.length ? 'border:none' : ''
          "
        >
          <span class="handle_icon"></span>
          <div class="handle_div_t">{{ item.createTime }}</div>
          <div class="handle_div_t">{{ item.handleMap.title }}</div>
          <div v-for="(t, i) in item.handleMap.contentList" :key="i">
            {{ t }}
          </div>
          <div v-if="item.handleMap.fileList">
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
          </div>
        </div>
      </div>
    </div>
    <div class="btn" v-if="type == 1">
      <span @click="submitFn(1)">启动预案</span>
    </div>
    <div class="btn" v-if="type == 2">
      <span @click="submitFn(3)" v-if="detailData.signStatus == 1"> 上报 </span>
      <span @click="changeSignStatusClick(3)" v-if="detailData.signStatus == 2">
        确认
      </span>
      <span @click="changeSignStatusClick(4)" v-if="detailData.signStatus == 2">
        无法执行
      </span>
      <span @click="changeSignStatusClick(1)" v-if="detailData.signStatus == 3">
        签到
      </span>
      <span v-if="detailData.signStatus == 4" style="background: gray">
        无法执行
      </span>
    </div>

    <!-- <div class="btn" v-if="type == 1">
      <span @click="submitFn(1)">启动预案</span>
    </div>
    <div class="btn" v-if="type == 2 && detailData.signStatus != 1">
      <span @click="submitFn(1)" v-if="type == 1">启动预案</span>
      <span @click="submitFn(2)">签到</span>
      <span @click="submitFn(3)">上报</span>
    </div> -->
  </div>
</template>
<script>
// import Nav from "../../../components/tab";
import {
  getEmergencyEventDetail,
  emergencyOperate,
  getListByCondition,
  getDetailById,
  changeSignStatus,
  getSceneFeedBackList,
} from "../../../api/a";
export default {
  data() {
    return {
      emergencyData: [],
      trueData: [],
      falseData: [],
      emergencyStatus: true,
      rbacToken_: "",
      disabled: false,
      edit: true,
      eventData: [],
      levelData: [],
      planData: [],
      baseUrl: process.env.baseUrl,
      tabIndex: 1,
      type: "",
      emergencyId: "",
      recordId: "",
      runHanding: {},
      detailData: {},
      formData: {
        joinNum: "",
        warningLevel: "",
        warningLevelName: "",
        eventType: "",
        eventTypeName: "",
        incidentContent: "",
        remark: "",
        createUserId: "",
        createUserName: "",
        createTime: "",
        studyAddress: "",
        studyLng: "",
        studyLat: "",
        isPlat: 2,
      },
      planId: "",
      planName: "",
    };
  },
  async created() {
    const that = this;
    window.scrollTo(0, 0);
    dd.disablePullToRefresh()
      .then((res) => {})
      .catch((err) => {});
    that.loadFn();
    that.getDetail();
    that.getSceneFeedBackListFn();
  },
  computed: {},
  methods: {
    // 指挥调度数据
    async getSceneFeedBackListFn() {
      const that = this;
      const data = await getSceneFeedBackList({
        emergencyId: that.emergencyId,
      });
      if (data.success) {
        let b = [];
        let c = [];
        let a = data.data.feddBackList;
        a.map((item, index) => {
          if (item.self) {
            b.push(item);
          } else {
            c.push(item);
          }
        });
        that.trueData = b;
        that.falseData = c;
        if (that.emergencyStatus) {
          that.emergencyData = that.trueData;
        } else {
          that.emergencyData = that.falseData;
        }
      }
    },
    changeSignStatusClick(type) {
      const that = this;
      if (type == 1) {
        let distance = that.M({
          lng1: that.formData.studyLng || 0,
          lat1: that.formData.studyLat || 0,
          lng2: that.runHanding.x || 0,
          lat2: that.runHanding.y || 0,
        });
        console.log(distance, "distance");
        if (distance > 500) {
          that.alert("超出打卡距离");
          return false;
        }
      }
      dd.confirm({
        title: "温馨提示",
        message: "确定操作？",
        buttonLabels: ["取消", "确定"],
      })
        .then(async (res) => {
          if (res.buttonIndex == 1) {
            const data = await changeSignStatus({
              emergencyId: that.emergencyId,
              recordId: that.recordId,
              changeType: type,
            });
            if (data.success) {
              dd.toast({
                icon: "success",
                text: "操作成功", //提示信息
              })
                .then((res) => {
                  that.getDetail();
                })
                .catch((err) => {});
            }
          }
        })
        .catch((err) => {});
    },
    // 指挥调度 tab
    emergencyClick(type) {
      const that = this;
      that.emergencyStatus = type;
      if (that.emergencyStatus) {
        that.emergencyData = that.trueData;
      } else {
        that.emergencyData = that.falseData;
      }
    },
    // 导航
    navigationFn(a, x, y) {
      let ar = ["百度地图", "高德地图"];
      if (x && y) {
        dd.getPhoneInfo().then((res) => {
          if (res.brand == "Apple") {
            ar = ["百度地图", "高德地图", "苹果地图"];
          }
          dd.showActionSheet({
            title: "",
            cancelButton: "取消",
            otherButtons: ar,
          })
            .then((res) => {
              let url = "";
              if (res.buttonIndex == 0) {
                url =
                  "http://api.map.baidu.com/marker?output=html&src=webapp.baidu.openAPIdemo&title=" +
                  a +
                  "&location=" +
                  y +
                  "," +
                  x;
              }
              if (res.buttonIndex == 1) {
                url =
                  "https://uri.amap.com/marker?src=mypage&callnative=1&name=" +
                  a +
                  "&position=" +
                  x +
                  "," +
                  y;
                // url =
                //   "https://uri.amap.com/marker?src=mypage&callnative=1&name=浙江省杭州市滨江区亚飞干洗&position=120.193306,30.201243";
              }
              if (res.buttonIndex == 2) {
                url = "http://maps.apple.com/?address=" + a;
              }

              window.open(url);
            })
            .catch((err) => {});
        });
      } else {
        dd.toast({
          icon: "",
          text: "未获取到经纬度", //提示信息
        })
          .then((res) => {})
          .catch((err) => {});
      }
    },
    // 默认数据
    loadFn() {
      const that = this;
      let query = that.$route.query;
      if (query.emergencyId && query.type) {
        localStorage.setItem("type", query.type);
        localStorage.setItem("emergencyId", query.emergencyId);
        that.emergencyId = query.emergencyId;
        that.type = query.type;
      } else {
        that.emergencyId = localStorage.getItem("emergencyId");
        that.type = localStorage.getItem("type");
      }
      if (that.type == 2 || that.type == 3) {
        that.disabled = true;
      } else {
        that.disabled = false;
      }
      //store
      let store = that.$store.state;
      that.eventData = store.eventData;
      that.levelData = store.levelData;
      //localStorage
      that.rbacToken_ =
        that.$store.getters.rbacToken || localStorage.getItem("rbacToken");
      if (localStorage.userInfo) {
        that.formData.createUserId = JSON.parse(localStorage.userInfo).id;
        that.formData.createUserName = JSON.parse(localStorage.userInfo).name;
      }

      //date
      that.formData.createTime = that.D();

      //location
      dd.getGeolocation({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
      })
        .then((res) => {
          that.formData.studyAddress = res.address;
          that.formData.studyLng = res.longitude;
          that.formData.studyLat = res.latitude;
        })
        .catch((err) => {});
    },
    // 流程名称
    planIdFn() {
      const that = this;
      let source = that.planData.map((item, index) => {
        return { key: item.planName, value: item.id };
      });
      dd.showSelect({
        source: source,
      })
        .then(async (res) => {
          that.planId = res.value;
          that.planName = res.key;
        })
        .catch((err) => {});
    },
    // 适用类型
    eventTypFn() {
      const that = this;
      dd.showSelect({
        source: that.eventData,
      })
        .then(async (res) => {
          that.formData.eventType = res.value;
          that.formData.eventTypeName = res.key;
          const da = await getListByCondition({
            planType: that.formData.eventType,
          });
          that.planData = da.data;
        })
        .catch((err) => {});
    },
    // 事件等级
    warningLevelFn() {
      const that = this;
      dd.showSelect({
        source: that.levelData,
      })
        .then((res) => {
          that.formData.warningLevel = res.value;
          that.formData.warningLevelName = res.key;
        })
        .catch((err) => {});
    },
    preview(v, data) {
      const that = this;
      if (v.fileType.indexOf("image") >= 0) {
        let urlData = [];
        data.map((item, index) => {
          urlData.push(
            that.baseUrl +
              "rbac/file/downloadRb/" +
              item.fileId +
              "?rbacToken=" +
              that.rbacToken_
          );
        });
        dd.previewImage({
          current:
            that.baseUrl +
            "rbac/file/downloadRb/" +
            v.fileId +
            "?rbacToken=" +
            that.rbacToken_,
          urls: urlData,
        })
          .then((res) => {})
          .catch((err) => {});
        // this.showImg = true;
        // this.previewUrl = `${this.baseUrl}rbac/file/downloadRb/${
        //   v.fileId
        // }?rbacToken=${localStorage.getItem("rbacToken")}`;
      } else {
        dd.biz.util.openLink({
          url: `${this.baseUrl}rbac/file/downloadRb/${
            v.fileId
          }?rbacToken=${localStorage.getItem("rbacToken")}`, //要打开链接的地址
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
        // window.open(`${this.baseUrl}rbac/file/downloadRb/${v.fileId}?rbacToken=${localStorage.getItem('rbacToken')}`)
      }
    },
    // 获取详情
    async getDetail() {
      const that = this;
      const res = await getDetailById({
        emergencyId: that.emergencyId,
        type: that.type,
      });
      that.detailData = res.data;
      that.recordId = that.detailData.recordId;
      that.runHanding = res.data.runHanding;
      let handingStudy = res.data.handingStudy;
      console.log("hang", handingStudy);
      console.log(res, "详情返回数据");
      if (that.type == 2 || that.type == 3) {
        that.formData = {
          joinNum: handingStudy.joinNum,
          warningLevel: handingStudy.warningLevel,
          warningLevelName: handingStudy.warningLevelName,
          eventType: handingStudy.eventType,
          eventTypeName: handingStudy.eventTypeName,
          incidentContent: handingStudy.incidentContent,
          remark: handingStudy.remark,
          createUserId: handingStudy.createUserId,
          createUserName: handingStudy.createUserName,
          createTime: handingStudy.createTime,
          studyAddress: handingStudy.studyAddress,
          studyLng: handingStudy.studyLng,
          studyLat: handingStudy.studyLat,
          isPlat: 2,
        };
        that.planName = that.runHanding.planName;
        // that.planId = "";
      }
    },
    changeIndex(i) {
      if (this.tabIndex === i) return;
      window.scrollTo(0, 0);
      this.tabIndex = i;
    },
    // 启动
    async submitFn(type) {
      const that = this;
      if (type == 1) {
        const r = that.validateFn();
        if (r) {
          let obj = {
            planId: that.planId,
            planName: that.planName,
            emergencyId: that.emergencyId,
            operationType: "101",
            handingStudy: that.formData,
          };
          dd.confirm({
            title: "温馨提示",
            message: "确定提交？",
            buttonLabels: ["取消", "确定"],
          })
            .then(async (res) => {
              if (res.buttonIndex == 1) {
                const data = await emergencyOperate(obj);
                if (data.success) {
                  dd.toast({
                    icon: "success",
                    text: "操作成功", //提示信息
                  })
                    .then((res) => {
                      that.$router.go(-1);
                    })
                    .catch((err) => {});
                }
              }
            })
            .catch((err) => {});
        }
      }
      if (type == 2 && that.detailData.signStatus) {
        if (that.detailData.signStatus == 3) {
          that.alert("已签到");
        } else {
          that.$router.push({
            path: "/ARuiAn/LinkageDisposal/signIn",
            query: {
              runTeamId: that.detailData.runTeamId,
              runStationId: that.detailData.runStationId,
              emergencyId: that.emergencyId,
              teamId: that.detailData.teamId,
              runProcessesTaskId: that.detailData.runProcessesTaskId,
            },
          });
        }
      }
      if (type == 3) {
        that.$router.push({
          path: "/ARuiAn/LinkageDisposal/report",
          query: {
            runTeamId: that.detailData.runTeamId,
            runStationId: that.detailData.runStationId,
            emergencyId: that.emergencyId,
            teamId: that.detailData.teamId,
            runProcessesTaskId: that.detailData.runProcessesTaskId,
          },
        });
      }
    },
    validateFn() {
      const that = this;
      if (!that.formData.joinNum) {
        that.alert("人员数量只能为数字并且不能为空");
        return false;
      }
      if (!that.formData.warningLevel) {
        that.alert("请输入事件等级");
        return false;
      }
      // if (!that.formData.eventType) {
      //   that.alert("请输入适用类型");
      //   return false;
      // }
      if (!that.formData.incidentContent) {
        that.alert("请输入事件描述");
        return false;
      }
      if (!that.formData.remark) {
        that.alert("请输入备注");
        return false;
      }
      if (!that.planId) {
        that.alert("请输入流程名称");
        return false;
      }
      return true;
    },
    alert(v) {
      dd.alert({
        message: v,
        title: "提示",
        button: "收到",
      })
        .then((res) => {})
        .catch((err) => {});
    },
    // checkRight(v, x, y) {
    //   return (
    //     this.right.includes(v) ||
    //     (x && this.right.includes(x)) ||
    //     (y && this.right.includes(y))
    //   );
    // },
  },
};
</script>
<style lang="less" scoped>
.event_warp {
  padding-bottom: 9vh;
  // .tab {
  //   box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   background: #fff;
  //   z-index: 1;
  // }
  // .topHolder {
  //   height: 96px;
  // }
  // .endHolder {
  //   height: 136px;
  // }
  // .subTab {
  //   height: 24px;
  //   background: @bgColor1;
  // }
  .header_icon {
    padding: 1vh 5vw;
    background: #f3f3f3;
    > span {
      border-left: 0.133333rem solid #01a6ff;
      display: inline-block;
      padding-left: 2vw;
    }
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
        > span:first-child {
          // width: 200px;
          opacity: 0.7;
          width: 30%;
          text-align: right;
          padding-right: 5%;
        }
        > div {
          flex: 1;
          // color: #5f61f8;
          word-break: break-all;
        }
        .li_fileList {
          > img {
            width: 30%;
            height: 20vw;
            margin: 1%;
          }
        }
      }
      // .ea {
      //   position: relative;
      //   .ea_d {
      //     padding-right: 40px;
      //   }
      //   .ea_dh {
      //     position: absolute;
      //     right: -10px;
      //     background: #3893fe;
      //     color: #fff;
      //     border-radius: 5px;
      //     text-align: center;
      //     padding: 1px 5px;
      //   }
      // }
    }
  }
  .analyseClass {
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
              right: 0;
              font-size: 15px;
            }
          }
        }
        &.incidentContent {
          p {
            display: inline-block;
            position: relative;
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
  }
  .emergency_c {
    .emergency_c_header {
      padding: 2vh 10vw 0vh 10vw;
      display: flex;
      justify-content: center;
      > span {
        flex: 1;
        text-align: center;
        background: #eeeeee;
        color: #acafb0;
        padding: 1vh 0;
        border-radius: 0px 10px 10px 0px;
      }
      > span:first-child {
        border-radius: 10px 0px 0px 10px;
      }
      .active_s {
        background: #3893fe;
        color: #fff;
      }
    }
    .emergency_c_content {
      padding: 0 10vw;
      > div {
        margin: 2vh 0;
        > p {
          color: gray;
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
      flex: 1;
      text-align: center;
      // line-height: 72px;
      line-height: 5vh;
      background: #409eff;
      color: #fff;
      border-radius: 8px;
      margin-right: 14px;
      &:last-child {
        margin: 0;
      }
    }
  }

  .handleClass {
    .handle_div {
      padding: 3vh;

      > div {
        position: relative;
        border-left: 1px solid #bbbbbb;
        padding: 0vh 5vw 5vh 5vw;
        .handle_icon {
          display: inline-block;
          width: 30px;
          height: 30px;
          background: #d2d2d2;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: -15px;
        }
        .handle_div_t {
          margin-bottom: 2vh;
        }
      }
    }
  }

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
  input,
  textarea {
    font-size: 30px;
    line-height: 50px;
    width: 100%;
  }
}
</style>
