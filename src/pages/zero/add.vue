<template>
  <div class="reportedAdd_warp">
    <!-- <div class="source"><span>来源：</span><i>{{sourceType}}</i></div>-->
    <div class="form" :class="edit ? '' : 'unclick'">
      <p class="done" v-if="formData.timeStatus && edit">
        您所在部门今日已上报
      </p>
      <div class="item">
        <p :class="formData.departmentName ? 'active' : ''">报告单位</p>
        <input
          @click="selectDepart"
          type="text"
          readonly
          v-model.trim="formData.departmentName"
          placeholder="--"
        />
      </div>
      <div class="item">
        <p :class="1 ? 'active' : ''">有无异常</p>
        <div>
          <input
            @click="unusual"
            readonly
            type="text"
            :value="formData.isAbnormal ? '有' : '无'"
            placeholder="点击选择有无异常"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.userName ? 'active' : ''">报告人</p>
        <div>
          <input
            readonly
            type="text"
            v-model="formData.userName"
            placeholder="--"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.telephone ? 'active' : ''">联系电话</p>
        <div>
          <input
            type="text"
            readonly
            v-model="formData.telephone"
            placeholder="--"
          />
        </div>
      </div>
      <div class="item reportContent">
        <p :class="formData.reportContent ? 'active' : ''">报告内容</p>
        <div>
          <textarea
            :readonly="formData.isAbnormal === 0"
            v-model.trim="formData.reportContent"
            placeholder="在此输入报告内容"
          ></textarea>
          <!-- <input type="text"> -->
        </div>
      </div>
    </div>
    <div class="tip" v-if="!id">
      <i>注：</i>
      <span>
        严格执行涉稳信息“零报告”制度，{{ startDate || "--" }}至{{
          endDate || "--"
        }}的每日{{ alertTime || "--" }}前向区委政法委值班室书面报送本
        辖区、本系统当日涉稳信息“零报告”单，没有情况的也要书面“零报告” （值班电
        话：86650962，传真号码：88511986）。
        遇重要、敏感信息要第一时间上报，在“零报告”规定时间之后，新发生或出现新情
        况的也要及时跟进上报。此外，对于一些仍在处理中的不稳定问题，后续化解稳控
        情况也要持续纳入每日“零报告”内容。
      </span>
    </div>
    <div class="endHolder"></div>
    <div class="btn">
      <span @click="handClick(1)">上报</span>
      <!-- <i @click="del()" v-show="!edit&&id">删除</i>
            <b @click="edit = true" v-show="!edit&&id">编辑</b>
            <i @click="cancel" v-show="edit&&id">取消</i>
      <b @click="handClick" v-show="edit&&id">保存</b>-->
    </div>
  </div>
</template>
<script>
import {
  getAlertSettingToday,
  getReportedForUser,
  addDaySituation,
} from "../../api/a";
export default {
  name: "zeroAdd",
  data() {
    return {
      id: this.$route.query.id,
      edit: true,
      formData: {
        departmentName: "",
        isAbnormal: 0,
        userName: "",
        telephone: "",
        reportContent: "",
      },
      alertTime: "",
      startDate: "",
      endDate: "",
      depart: [],
      reportedForUser: [],
    };
  },
  async created() {
    let that = this;
    dd.disablePullToRefresh()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
    if (that.id) {
      document.title = "零报详情";
      that.edit = false;
      that.formData = JSON.parse(localStorage.getItem("zeroDetail"));
      that.$forceUpdate();
    } else {
      const [data, data2] = await Promise.all([
        getAlertSettingToday(),
        getReportedForUser(),
      ]);
      if (data.success) {
        that.alertTime =
          data.data.alertTime && data.data.alertTime.substr(11, 5);
        that.startDate =
          data.data.beginSendDate && data.data.beginSendDate.substr(0, 10);
        that.endDate =
          data.data.lastSendDate && data.data.lastSendDate.substr(0, 10);
      }
      if (data2.success) {
        that.reportedForUser = data2.data;
        that.formData = data2.data && data2.data[0];
        if (that.formData.isAbnormal === 0) {
          that.formData.reportContent = "平稳";
        }
        if (!that.formData || that.formData.timeStatus !== 0) {
          that.edit = false;
          that.formData = {};
        }
        if (data2.data.length > 1) {
          that.depart = data2.data.map((v) => {
            return v.departmentName;
          });
        }
      }
    }
  },
  methods: {
    selectDepart() {
      const that = this;
      if (that.reportedForUser.length <= 1) return;
      dd.device.notification.actionSheet({
        title: "选择报告单位？",
        cancelButton: "取消",
        otherButtons: that.depart,
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData = that.reportedForUser[res.buttonIndex];
          if (that.formData.isAbnormal === 0) {
            that.formData.reportContent = "平稳";
          }
          if (that.formData.timeStatus !== 0) {
            that.edit = false;
          }
        },
        onFail: function (err) {},
      });
    },
    unusual() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择有无异常？",
        cancelButton: "取消",
        otherButtons: ["无", "有"],
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData.isAbnormal = res.buttonIndex;
          if (res.buttonIndex) {
            that.formData.reportContent = "";
          } else {
            that.formData.reportContent = "平稳";
          }
        },
        onFail: function (err) {},
      });
    },
    del() {},
    cancel() {
      this.$router.go(-1);
    },
    save() {},
    handClick(i) {
      if (!this.formData.reportContent) {
        this.alert("请输入报告内容");
        return;
      }
      this.formData.handleFilesListStr = JSON.stringify(this.files);
      const that = this;
      // console.log(that.formData)
      dd.device.notification.confirm({
        message: that.id ? "确定修改？" : "确定上报？",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        async onSuccess(res) {
          if (res.buttonIndex) {
            dd.device.notification.showPreloader({
              text: "提交中..",
              showIcon: true,
              async onSuccess(result) {
                const data = await addDaySituation(that.formData);
                dd.device.notification.hidePreloader({
                  onSuccess: function (result) {},
                  onFail: function (err) {},
                });
                if (data.success) {
                  dd.alert({
                    message: data.message ? data.message : "操作成功",
                    title: "提示",
                    button: "收到",
                  })
                    .then((res) => {
                      that.$router.go(-1);
                    })
                    .catch((err) => {});
                  //   dd.device.notification.toast({
                  //     icon: "",
                  //     text: "操作成功",
                  //     duration: 2,
                  //     delay: 0,
                  //     onSuccess(result) {
                  //       that.$router.go(-1);
                  //     },
                  //     onFail: function(err) {}
                  //   });
                }
              },
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {},
      });
    },
    async fileChange(e) {
      console.log(e.target.files);
      let sendData = new FormData();
      const files = [...e.target.files];
      if (files && files.length) {
        dd.device.notification.showPreloader({
          text: "文件上传中..",
          showIcon: true,
          onSuccess(result) {},
        });
        files.forEach((v) => {
          sendData.append("file", v);
          // this.files.push(v.name)
        });
        sendData.append("rbacToken", localStorage.getItem("rbacToken"));
        const data = await upload(sendData);
        dd.device.notification.hidePreloader({
          onSuccess: function (result) {},
          onFail: function (err) {},
        });
        if (data.success) {
          data.data &&
            data.data.length &&
            data.data.forEach((v, i) => {
              var obj = {};
              obj.fileType = files[i].type;
              obj.fileName = files[i].name;
              obj.fileId = v;
              this.files.push(obj);
            });
          console.log(this.files);
        }
      }
    },
    delFile(i) {
      this.files.splice(i, 1);
    },
    alert(v) {
      dd.device.notification.alert({
        message: v,
        title: "提示",
        buttonName: "确定",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.reportedAdd_warp {
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
  .form {
    padding: 0 32px;
    .done {
      color: #fd3d02;
      padding-top: 20px;
    }
    &.unclick {
      * {
        pointer-events: none;
      }
    }
    .item {
      border-bottom: solid 1px #e4e4e4;
      padding: 8px 0 24px;
      &.reportContent {
        p {
          display: inline-block;
          position: relative;
          // &::after{
          //     content: '*';
          //     position: absolute;
          //     right: -14px;
          //     top: 4px;
          //     color: red;
          // }
        }
        textarea {
          width: 100%;
          height: 200px;
        }
      }
      p {
        line-height: 68px;
        &.active {
          color: #409eff;
          font-size: 24px;
        }
      }
    }
  }
  .tip {
    padding: 20px 32px;
    display: flex;
    i {
      font-size: 18px;
    }
    span {
      font-size: 18px;
      flex: 1;
      color: #555;
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
</style>
