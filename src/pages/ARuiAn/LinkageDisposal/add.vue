<template>
  <div class="reportedAdd_warp mapClass">
    <div class="form" :class="edit ? '' : 'unclick'">
      <div class="item">
        <p class="active">上报人员</p>
        <input
          type="text"
          v-model="userInfo.name"
          readonly
          placeholder="在此输入上报人员"
        />
      </div>
      <div class="item">
        <p :class="formData.title ? 'active' : ''">事件名称</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入事件名称"
        />
      </div>
      <div class="item">
        <p :class="formData.incidentTime ? 'active' : ''">上报时间</p>
        <input
          @click="incidentTimeFn"
          type="text"
          readonly
          v-model.trim="formData.incidentTime"
          placeholder="点击选择上报时间"
        />
      </div>
      <div class="item">
        <p :class="formData.eventType ? 'active' : ''">事件类别</p>
        <div>
          <input
            @click="eventTypeFn"
            readonly
            type="text"
            v-model="formData.eventTypeName"
            placeholder="点击选择事件类别"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.earlyWarningLevel ? 'active' : ''">事件等级</p>
        <div>
          <input
            @click="earlyWarningLevelFn"
            readonly
            type="text"
            v-model="formData.earlyWarningLevelName"
            placeholder="点击选择事件等级"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.sourceType ? 'active' : ''">事件来源</p>
        <div>
          <input
            @click="sourceIdFn"
            readonly
            type="text"
            v-model="formData.sourceTypeName"
            placeholder="事件来源"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.sourceType ? 'active' : ''">现实行为</p>
        <div>
          <input
            @click="sourceIdFn"
            readonly
            type="text"
            v-model="formData.sourceTypeName"
            placeholder="现实行为"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.roadId ? 'active' : ''">所属街道</p>
        <div>
          <input
            @click="roadIdFn"
            readonly
            type="text"
            v-model="formData.roadName"
            placeholder="所属街道"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.incidentContent ? 'active' : ''">事件描述</p>
        <div>
          <input
            type="text"
            v-model="formData.incidentContent"
            placeholder="事件描述"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.incidentAddress ? 'active' : ''">事件地址</p>
        <div>
          <input
            type="text"
            @click="incidentAddressFn"
            readonly
            :value="formData.incidentAddress"
            placeholder="点击选择事件地址"
          />
        </div>
      </div>
      <!-- <div class="item">
        <p :class="formData.trends ? 'active' : ''">事件发展趋势</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.trends"
            placeholder="点击选择事件发展趋势"
          />
        </div>
      </div>
      <div class="item incidentContent">
        <p :class="formData.measuresTaken ? 'active' : ''">已采取的措施</p>
        <div>
          <input
            type="text"
            v-model.trim="formData.measuresTaken"
            placeholder="在此输入已采取的措施"
          />
        </div>
      </div>
      <div class="item incidentContent">
        <p :class="formData.incidentRemark ? 'active' : ''">其他备注</p>
        <div>
          <textarea
            type="text"
            v-model.trim="formData.incidentRemark"
            placeholder="在此输入备注"
          />
        </div>
      </div> -->
      <!-- 照片 -->
      <div class="item">
        <p :class="files.length > 0 ? 'active' : ''">照片</p>
        <div class="item_main" style="">
          <span
            style="position: relative"
            v-for="(item1, index1) in files"
            :key="index1"
          >
            <img
              :src="
                url_ +
                'rbac/file/downloadRb/' +
                item1.fileId +
                '?rbacToken=' +
                rbacToken_
              "
            />
            <i style="" @click="delFile(index1)" class="iconfont icon-cha2"></i>
          </span>
          <span v-if="files.length < 5">
            <button style="background: #d7d7d7">
              上传
              <input @change="fileChange" multiple type="file" name="" id="" />
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="btn">
      <span @click="handClick(1)">保存</span>
    </div>
  </div>
</template>
<script>
import {
  upload,
  addHandle,
  getHandleEventDetailByIdForApp,
  addEmergencyEvent,
} from "../../../api/a";

export default {
  data() {
    return {
      url_: "",
      rbacToken_: "",
      eventData: [],
      levelData: [],
      sourceData: [],
      roadData: [],
      userInfo: {},
      id: this.$route.query.id,
      index: [],
      edit: true,
      files: [],
      formData: {
        id: "",
        title: "",
        eventType: "",
        eventTypeName: "",
        incidentTime: "",
        earlyWarningLevel: "",
        earlyWarningLevelName: "",
        sourceType: "401",
        sourceTypeName: "现场排查",
        incidentContent: "",
        incidentAddress: "",
        roadId: "",
        roadName: "",
        x: "120.991617",
        y: "28.119125",
        trends: "",
        measuresTaken: "",
        incidentRemark: "",
      },
    };
  },
  computed: {
    streetList() {
      return this.$store.state.common.streetList;
    },
    streetOption() {
      return this.$store.state.common.streetList.map((v) => {
        return v.name;
      });
    },
    actionList() {
      return this.$store.state.common.actionList;
    },
    actionOption() {
      return this.$store.state.common.actionList.map((v) => {
        return v.name;
      });
    },
    eventList() {
      return this.$store.state.common.eventList;
    },
    eventOption() {
      return this.$store.state.common.eventList.map((v) => {
        return v.name;
      });
    },
  },
  created() {
    const that = this;
    that.url_ = process.env.baseUrl;
    that.rbacToken_ =
      that.$store.getters.rbacToken || localStorage.getItem("rbacToken");
    that.userInfo = localStorage.userInfo
      ? JSON.parse(localStorage.userInfo)
      : {};
    let store = this.$store.state;
    that.eventData = store.eventData;
    that.levelData = store.levelData;
    that.sourceData = store.sourceData;
    that.roadData = store.roadData;
    that.formData.incidentTime = that.D();
    that.getGeolocationFn();
    this.$nextTick(()=>{
      console.log(store.eventData,'1111111')
    })
    dd.disablePullToRefresh()
      .then((res) => {})
      .catch((err) => {});
  },
  methods: {
    roadIdFn() {
      const that = this;
      dd.showSelect({
        source: that.roadData,
      })
        .then((res) => {
          that.formData.roadId = res.value;
          that.formData.roadName = res.key;
        })
        .catch((err) => {});
    },
    incidentTimeFn() {
      const that = this;
      // dd.showDatePicker({
      //   format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
      //   value: that.formData.incidentTime,
      // })
      //   .then((res) => {
      //     that.formData.incidentTime = res.value;
      //   })
      //   .catch((err) => {});
    },
    eventTypeFn() {
      const that = this;
      dd.showSelect({
        source: that.eventData,
      })
        .then((res) => {
          that.formData.eventType = res.value;
          that.formData.eventTypeName = res.key;
        })
        .catch((err) => {});
      // let options = that.eventData.map((item, index) => {
      //   return item.name;
      // });
      // dd.showMultiSelect({
      //   options: options,
      //   selectOption: that.formData.eventTypeName,
      // }).then((res) => {
      //   let t = [];
      //   let n = [];
      //   that.eventData.map((item, index) => {
      //     res.map((item1) => {
      //       if (index == item1) {
      //         t.push(item.id);
      //         n.push(item.name);
      //       }
      //     });
      //   });
      //   that.formData.eventType = t;
      //   that.formData.eventTypeName = n;
      // });
    },
    sourceIdFn() {
      const that = this;
      dd.showSelect({
        source: that.sourceData,
      })
        .then((res) => {
          that.formData.sourceType = res.value;
          that.formData.sourceTypeName = res.key;
        })
        .catch((err) => {});
    },
    incidentAddressFn() {
      const that = this;
      dd.locateOnMap({
        longitude: that.formData.x ? that.formData.x : 120.9661, //30.201243 120.193306
        latitude: that.formData.y ? that.formData.y : 28.1206,
      })
        .then((res) => {
          let address = res.province + res.city + res.adName + res.title;
          that.formData.incidentAddress = address;
          that.formData.x = res.longitude;
          that.formData.y = res.latitude;
        })
        .catch((err) => {});
    },
    getGeolocationFn() {
      const that = this;
      dd.getGeolocation({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
      })
        .then(async (res) => {
          // that.latitude = res.latitude;
          // that.longitude = res.longitude;
          // that.address = res.address;
          that.formData.incidentAddress = res.address;
          that.formData.x = res.longitude;
          that.formData.y = res.latitude;
        })
        .catch((err) => {});
    },
    earlyWarningLevelFn() {
      const that = this;
      dd.showSelect({
        source: that.levelData,
      })
        .then((res) => {
          that.formData.earlyWarningLevel = res.value;
          that.formData.earlyWarningLevelName = res.key;
        })
        .catch((err) => {});
    },
    handClick(i) {
      const that = this;
      const r = that.validateFn();
      if (r) {
        dd.confirm({
          title: "温馨提示",
          message: "确定提交？",
          buttonLabels: ["取消", "确定"],
        })
          .then(async (res) => {
            console.log(that.formData, "that.formData");

            if (res.buttonIndex == 1) {
              const data = await addEmergencyEvent({
                event: that.formData,
                fileList: that.files,
              });
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
    },
    async fileChange(e) {
      const that = this;
      let sendData = new FormData();
      let files = [...e.target.files];
      that.showLoadingFn();
      if (files && files.length) {
        files.forEach((v) => {
          sendData.append("file", v);
        });
        sendData.append("rbacToken", localStorage.getItem("rbacToken"));
        const data = await upload(sendData);
        if (data.success) {
          data.data &&
            data.data.length &&
            data.data.forEach((v, i) => {
              var obj = {};
              obj.fileType = files[i].type;
              obj.fileName = files[i].name;
              obj.fileId = v;
              that.files.push(obj);
            });
          that.hideLoadingFn();
        }
      }
    },
    delFile(i) {
      this.files.splice(i, 1);
    },
    showLoadingFn() {
      dd.showLoading({
        text: "加载中",
      })
        .then((res) => {})
        .catch((err) => {});
    },
    hideLoadingFn() {
      dd.hideLoading({})
        .then((res) => {})
        .catch((err) => {});
    },
    validateFn() {
      const that = this;
      // trends: "",
      // measuresTaken: "",
      // incidentRemark: "",
      if (!that.formData.title) {
        that.alert("请输入事件名称");
        return false;
      }
      if (!that.formData.eventType) {
        that.alert("请输入事件类别");
        return false;
      }
      // if (!that.formData.incidentTime) {
      //   that.alert("请输入上报时间");
      //   return false;
      // }
      if (!that.formData.earlyWarningLevel) {
        that.alert("请输入事件等级");
        return false;
      }
      if (!that.formData.roadId) {
        that.alert("请输入所属街道");
        return false;
      }
      if (!that.formData.sourceType) {
        that.alert("请输入事件来源");
        return false;
      }
      if (!that.formData.incidentContent) {
        that.alert("请输入事件描述");
        return false;
      }
      // if (!that.formData.incidentAddress) {
      //   that.alert("请输入事件地址");
      //   return false;
      // }
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
      // dd.device.notification.alert({
      //   message: v,
      //   title: "提示",
      //   buttonName: "确定",
      // });
    },
  },
};
</script>
<style lang="less" scoped>
.reportedAdd_warp {
  padding-bottom: 9vh;
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
            font-size: 30px;
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
  .btn {
    // border-top: solid 1px #e4e4e4;
    // background: #fff;
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
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      flex: 1;
      text-align: center;
      line-height: 5vh;
      color: #fff;
      border-radius: 8px;
      margin-right: 14px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
