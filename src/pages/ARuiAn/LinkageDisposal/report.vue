<template>
  <div>
    <div v-if="!reportSuccess" class="reportedAdd_warp">
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
        <!-- <div class="item">
        <p :class="formData.incidentAddress ? 'active' : ''">所在地址</p>
        <div>
          <input
            type="text"
            @click="incidentAddressFn"
            readonly
            :value="formData.incidentAddress"
            placeholder="点击选择所在地址"
          />
        </div>
      </div> -->

        <div class="item incidentContent">
          <p :class="formData.remark ? 'active' : ''">描述</p>
          <div>
            <textarea
              type="text"
              v-model.trim="formData.remark"
              placeholder="在此输入描述"
            />
          </div>
        </div>
        <!-- 照片 -->
        <div class="item">
          <p :class="formData.fileList.length > 0 ? 'active' : ''">照片</p>
          <div class="item_main" style="">
            <span
              style="position: relative"
              v-for="(item1, index1) in formData.fileList"
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
              <i
                style=""
                @click="delFile(index1)"
                class="iconfont icon-cha2"
              ></i>
            </span>
            <span v-if="formData.fileList.length < 5">
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
      <div class="btn">
        <span @click="handClick(1)">保存</span>
      </div>
    </div>
    <div v-if="reportSuccess" class="reportSuccess">
      <h1>上报成功</h1>
      <div class="btn">
        <span @click="goC(1)">继续上报</span>
        <span @click="goC(2)">返回处置事件</span>
      </div>
    </div>
  </div>
</template>
<script>
import { upload, addEmergencyEvent, emergencyOperate } from "../../../api/a";

export default {
  components: {},
  data() {
    return {
      reportSuccess: false,
      url_: "",
      rbacToken_: "",
      userInfo: {},
      id: this.$route.query.id,
      index: [],
      edit: true,
      formData: {
        operationType: "102",
        emergencyId: "",
        // incidentAddress: "",
        // x: "",
        // y: "",
        remark: "",
        fileList: [],
        runTeamId: "",
        runStationId: "",
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
  async created() {
    const that = this;
    dd.disablePullToRefresh()
      .then((res) => {})
      .catch((err) => {});
    that.url_ = process.env.baseUrl;
    that.rbacToken_ =
      that.$store.getters.rbacToken || localStorage.getItem("rbacToken");

    let query = that.$route.query;
    that.formData.emergencyId = query.emergencyId;
    that.formData.runTeamId = query.runTeamId;
    that.formData.runStationId = query.runStationId;

    if (localStorage.userInfo) {
      that.userInfo = JSON.parse(localStorage.userInfo);
    }
  },
  methods: {
    goC(type) {
      const that = this;
      if (type == 1) {
        that.formData.remark = "";
        that.formData.fileList = [];
        that.reportSuccess = false;
      } else {
        that.$router.push({
          path: "/ARuiAn/LinkageDisposal/detail",
          query: {
            type: 2,
            item: {},
          },
        });
      }
    },
    incidentAddressFn() {
      const that = this;
      dd.locateOnMap({})
        .then((res) => {
          let address = res.province + res.city + res.adName + res.title;
          that.formData.incidentAddress = address;
          that.formData.x = res.longitude;
          that.formData.y = res.latitude;
        })
        .catch((err) => {});
    },
    handClick(i) {
      const that = this;
      dd.confirm({
        title: "温馨提示",
        message: "确定提交？",
        buttonLabels: ["取消", "确定"],
      })
        .then(async (res) => {
          if (res.buttonIndex == 1) {
            const data = await emergencyOperate(that.formData);
            if (data.success) {
              dd.toast({
                icon: "success",
                text: "操作成功", //提示信息
              })
                .then((res) => {
                  that.reportSuccess = true;
                })
                .catch((err) => {});
            }
          }
        })
        .catch((err) => {});
    },
    async fileChange(e) {
      const that = this;
      let sendData = new FormData();
      let files = [...e.target.files];
      if (files && files.length) {
        files.forEach((v) => {
          sendData.append("file", v);
          // that.files.push(v.name)
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
              that.formData.fileList.push(obj);
            });
        }
      }
    },
    delFile(i) {
      this.formData.fileList.splice(i, 1);
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
.reportSuccess {
  > h1 {
    font-size: 80px;
    padding: 10vh 0;
    text-align: center;
  }
  .btn {
    // width: 100%;
    // border-top: solid 1px #191f251f;
    // display: flex;
    // justify-content: space-between;
    // background: #fff;
    // height: 9vh;
    // padding: 2vh;
    text-align: center;

    span:first-child {
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      display: inline-block;
      width: 90%;
      text-align: center;
      line-height: 7vh;
      color: #fff;
      border-radius: 8px;
      margin: 2vh 0;
    }
    span:last-child {
      letter-spacing: 5px;
      display: inline-block;
      width: 90%;
      text-align: center;
      line-height: 7vh;
      color: #a1a1a1;
      border-radius: 8px;
      margin: 2vh 0;
      border: 1px solid #a1a1a1;
    }
  }
}
</style>
