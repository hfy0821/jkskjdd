<template>
  <div class="confirm_warp">
    <h4>{{title}}</h4>
    <div v-if="i === '5'" class="opinion">
      <textarea v-model.trim="remark" name id placeholder="请输入意见"></textarea>
    </div>
    <div v-if="i === '8'||i === '2'||i === '9'" class="opinion">
      <textarea v-model.trim="remark" name id placeholder="请输入意见"></textarea>
      <div class="accessory">
        <span>附件</span>
        <b>
          <i class="iconfont icon-fujian">
            <input @change="fileChange" multiple type="file" name id />
          </i>
        </b>
      </div>
      <ul class="file">
        <li v-for="(v, i) in files" :key="i">
          <span>{{v.fileName}}</span>
          <i @click="delFile(i)" class="iconfont icon-cha2"></i>
        </li>
      </ul>
    </div>
    <div class="designate" v-if="i==='6'||i==='6.1'">
      <div class="item">
        <p>截止时间</p>
        <input
          @click="selectTime"
          type="text"
          readonly
          :value="formData.cutOffTime"
          placeholder="点击选择截止时间"
        />
      </div>
      <div class="item">
        <p>指派部门</p>
        <input
          @click="selectDept"
          type="text"
          readonly
          :value="formData.deptName"
          placeholder="点击选择部门"
        />
        <input
          v-if="formData.deptName"
          @click="selectUser"
          type="text"
          readonly
          :value="formData.userName.join()"
          placeholder="点击选择部门人员"
        />
      </div>
      <div class="item">
        <p>协办部门</p>
        <input
          @click="selectAssist"
          type="text"
          readonly
          :value="formData.assistName.join()"
          placeholder="点击选择部门"
        />
      </div>
      <div class="item">
        <p>报送领导</p>
        <input
          @click="selectLeader"
          type="text"
          readonly
          :value="formData.leaderName.join()"
          placeholder="点击选择报送领导"
        />
      </div>
      <div class="item">
        <p>处置要求</p>
        <textarea v-model.trim="formData.remark" name id placeholder="请输入处置要求"></textarea>
      </div>
    </div>
    <div class="designate" v-if="i==='11'||i==='11.1'">
      <div class="item">
        <p>协办部门</p>
        <input
          @click="selectAssist"
          type="text"
          readonly
          :value="formData.assistName.join()"
          placeholder="点击选择部门"
        />
      </div>
      <div class="item">
        <p>报送领导</p>
        <input
          @click="selectLeader"
          type="text"
          readonly
          :value="formData.leaderName.join()"
          placeholder="点击选择报送领导"
        />
      </div>
    </div>
    <div class="endHolder"></div>
    <div class="btn">
      <span @click="confirm">确认</span>
    </div>
  </div>
</template>
<script>
import {
  selAllDepAndUserByRight,
  selAllDepAndUserByRight2,
  addHandleData,
  upload,
  addHandleNew,
  addHandle1
} from "../../api/a";
export default {
  data() {
    return {
      i: this.$route.query.i,
      id: this.$route.query.id,
      title: "",
      titles: ["", "处置情况", "申请办结", "", "", "", "指派", "", "", "办结"],
      opinion: "",
      deptList: [],
      deptOption: [],
      userList: [],
      userOption: [],
      assistList: [],
      assistOption: [],
      leaderList: [],
      leaderOption: [],
      remark: "",
      formData: {
        remark: "",
        cutOffTime: "",
        deptName: "",
        userName: [],
        assistName: [],
        leaderName: [],
        leaderUserList: [],
        helpUserList: []
      },
      files: []
    };
  },
  async created() {
    dd.disablePullToRefresh()
      .then(res => {
        console.log(res);
      })
      .catch(err => {});
    this.title = this.titles[this.i];
    // document.title = this.title
    const [data, data2] = await Promise.all([
      selAllDepAndUserByRight({ isLeader: 1 }),
      selAllDepAndUserByRight2({
        workgroupCodeId: "WJGroup",
        workType: 3,
        permissionNames:
          this.i % 1
            ? "healthEvent:threeRole"
            : "healthEvent:twoRole,healthEvent:threeRole"
      })
    ]);
    if (data.success) {
      this.deptList = data2.data.departList;
      this.deptOption = data2.data.departList.map(v => {
        return v.name || "-";
      });
      data2.data.departList.forEach(v => {
        v.userList &&
          v.userList.length &&
          v.userList.forEach(y => {
            y.departmentId = v.id;
            this.assistList.push(y);
            this.assistOption.push((v.name || "-") + ":" + (y.name || "-"));
          });
      });
      console.log(this.assistList);
      data.data.departList.forEach(v => {
        v.userList &&
          v.userList.length &&
          v.userList.forEach(y => {
            this.leaderList.push(y);
            this.leaderOption.push(y.name);
          });
      });
    }
  },
  methods: {
    confirm() {
      if (this.i == 5) {
        let params = {
          eventId: this.id,
          editDepartmentId: this.$route.query.firstDepartmentId,
          operationType: 10
        };
        const that = this;
        dd.device.notification.confirm({
          message: "是否确定退回?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "处理中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await addHandle1(params);
                  dd.device.notification.hidePreloader({
                    onSuccess: function(result) {},
                    onFail: function(err) {}
                  });
                  if (data.success) {
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到"
                    })
                      .then(res => {
                        that.$router.go(-1);
                      })
                      .catch(err => {});
                    // dd.device.notification.toast({
                    //   // icon: '',
                    //   text: "操作成功",
                    //   duration: 1.5,
                    //   onSuccess(result) {
                    //     that.$router.go(-1);
                    //   }
                    // });
                  }
                },
                onFail: function(err) {}
              });
            }
          },
          onFail: function(err) {}
        });
        return;
      }
      if (this.i == 1 || this.i == 2 || this.i == 9) {
        let params = {
          rbacToken: localStorage.getItem("rbacToken"),
          remark: this.remark,
          eventId: this.id,
          handleType: this.$route.query.handleType,
          handleDepartmentId: this.$route.query.handleDepartmentId,
          operationType: 4 * this.i,
          authName: "emergencyHandleManagement:supplementaryExplanation",
          editDepartmentId: this.$route.query.handleDepartmentId
        };
        if (this.i == 9) {
          params.operationType = 5;
        }
        if (!this.files.length) {
          params.isFile = 0;
        } else {
          params.isFile = 1;
          params.handleFileListStr = JSON.stringify(this.files);
        }
        // let sendData = new FormData();
        // for (const k in params) {
        //     sendData.append(k, params[k])
        // }
        const that = this;
        dd.device.notification.confirm({
          message: "确定提交?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "提交中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await addHandleNew(params);
                  dd.device.notification.hidePreloader({
                    onSuccess: function(result) {},
                    onFail: function(err) {}
                  });
                  if (data.success) {
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到"
                    })
                      .then(res => {
                        if (that.i === "9") {
                          that.$router.go(-2);
                          return;
                        }
                        that.$router.go(-that.i);
                      })
                      .catch(err => {});
                    // dd.device.notification.toast({
                    //   // icon: '',
                    //   text: "操作成功",
                    //   duration: 1.5,
                    //   onSuccess(result) {
                    //     if (that.i === "9") {
                    //       that.$router.go(-2);
                    //       return;
                    //     }
                    //     that.$router.go(-that.i);
                    //   }
                    // });
                  }
                },
                onFail: function(err) {}
              });
            }
          },
          onFail: function(err) {}
        });
        return;
      }
      if (this.i == 8) {
        let params = {
          // dingLinkUrl: "https://pazht.ouhai.gov.cn:8000/fyDingtalkWeb/index.html#/listing/3",
          // helpUserList: this.formData.helpUserList,
          // leaderUserList: this.formData.leaderUserList,
          isFile: this.files.length ? 1 : 0,
          remark: this.remark,
          eventId: this.id,
          handleType: 1,
          departmentId: this.$route.query.handleDepartmentId,
          editDepartmentId: this.$route.query.firstDepartmentId,
          operationType: 4,
          authName: "emergencyHandleManagement:supplementaryExplanation"
        };

        const that = this;
        dd.device.notification.confirm({
          message: "是否确定新增处置?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "处理中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await addHandleNew(params);
                  dd.device.notification.hidePreloader({
                    onSuccess: function(result) {},
                    onFail: function(err) {}
                  });
                  if (data.success) {
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到"
                    })
                      .then(res => {
                        that.$router.go(-1);
                      })
                      .catch(err => {});
                    // dd.device.notification.toast({
                    //   // icon: '',
                    //   text: "操作成功",
                    //   duration: 1.5,
                    //   onSuccess(result) {
                    //     that.$router.go(-1);
                    //   }
                    // });
                  }
                },
                onFail: function(err) {}
              });
            }
          },
          onFail: function(err) {}
        });
        return;
      }
      if (this.i == 11 || this.i == 11.1) {
        //that.formData.helpUserList
        if (!this.formData.helpUserList.length) {
          this.alert("请选择部门及人员");
          return;
        }
        let params = {
          dingLinkUrl:
            "https://pazht.ouhai.gov.cn:8000/fyDingtalkWeb/index.html#/listing/3",
          departmentId: this.$route.query.handleDepartmentId,
          editDepartmentId: this.$route.query.firstDepartmentId,
          eventId: this.id,
          helpUserList: this.formData.helpUserList,
          operationType: 2,
          authName: "emergencyHandleManagement:supplementaryExplanation"
        };

        const that = this;
        dd.device.notification.confirm({
          message: "是否确定新增协办?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "处理中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await addHandleData(params);
                  dd.device.notification.hidePreloader({
                    onSuccess: function(result) {},
                    onFail: function(err) {}
                  });
                  if (data.success) {
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到"
                    })
                      .then(res => {
                        that.$router.go(-1);
                      })
                      .catch(err => {});
                    // dd.device.notification.toast({
                    //   // icon: '',
                    //   text: "操作成功",
                    //   duration: 1.5,
                    //   onSuccess(result) {
                    //     that.$router.go(-1);
                    //   }
                    // });
                  }
                },
                onFail: function(err) {}
              });
            }
          },
          onFail: function(err) {}
        });
        return;
      }
      if (!this.formData.userName.length) {
        this.alert("请指派部门及人员");
        return;
      }
      const that = this;
      that.formData.operationType = 3;
      that.formData.eventId = this.id;
      that.formData.handleDepartmentId = this.$route.query.handleDepartmentId;
      that.formData.dingLinkUrl =
        "https://pazht.ouhai.gov.cn:8000/fyDingtalkWeb/index.html#/listing/3";
      dd.device.notification.confirm({
        message: "确定指派？",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        async onSuccess(res) {
          if (res.buttonIndex) {
            dd.device.notification.showPreloader({
              text: "指派中..",
              showIcon: true,
              async onSuccess(result) {
                const data = await addHandleData(that.formData);
                if (data.success) {
                  const data2 = await addHandleData({
                    departmentId: "8d406cedc99448b3a68b7033a92487be",
                    eventId: that.id,
                    handleType: 1,
                    operationType: 4,
                    remark: that.formData.remark
                  });
                  dd.device.notification.hidePreloader({
                    onSuccess: function(result) {},
                    onFail: function(err) {}
                  });
                } else {
                  dd.device.notification.hidePreloader({
                    onSuccess: function(result) {},
                    onFail: function(err) {}
                  });
                }

                if (data.success) {
                  dd.alert({
                    message: data.message ? data.message : "操作成功",
                    title: "提示",
                    button: "收到"
                  })
                    .then(res => {
                      that.$router.go(-2);
                    })
                    .catch(err => {});
                  //   dd.device.notification.toast({
                  //     icon: "",
                  //     text: "指派成功",
                  //     duration: 2,
                  //     delay: 0,
                  //     onSuccess(result) {
                  //       that.$router.go(-2);
                  //     },
                  //     onFail: function(err) {}
                  //   });
                }
              },
              onFail: function(err) {}
            });
          }
        },
        onFail: function(err) {}
      });
    },
    async fileChange(e) {
      let sendData = new FormData();
      const files = [...e.target.files];
      console.log(files);
      if (files && files.length) {
        dd.device.notification.showPreloader({
          text: "文件上传中..",
          showIcon: true,
          onSuccess(result) {}
        });
        files.forEach(v => {
          sendData.append("file", v);
        });
        sendData.append("rbacToken", localStorage.getItem("rbacToken"));
        const data = await upload(sendData);
        dd.device.notification.hidePreloader({
          onSuccess: function(result) {},
          onFail: function(err) {}
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
    selectTime() {
      const that = this;
      const date = new Date();
      const today = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`;
      dd.showDatePicker({
        format: "yyyy-MM-dd",
        value: that.formData.incidentTime //默认显示日期
      })
        .then(result => {
          that.formData.cutOffTime = result.value;
        })
        .catch(err => {});
      // dd.biz.util.datepicker({
      //   start: today,
      //   format: "yyyy-MM-dd",
      //   value: that.formData.incidentTime, //默认显示
      //   onSuccess: function(result) {
      //     that.formData.cutOffTime = result.value;
      //   },
      //   onFail: function(err) {}
      // });
    },
    selectDept() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择指派部门？",
        cancelButton: "取消",
        otherButtons: that.deptOption,
        onSuccess: function(res) {
          if (res.buttonIndex === -1) return;
          that.formData.userName = [];
          that.formData.operationId = that.deptList[res.buttonIndex].id;
          that.formData.departmentId = that.deptList[res.buttonIndex].id;
          that.formData.deptName = that.deptOption[res.buttonIndex];
          that.userList = that.deptList[res.buttonIndex].userList;
          that.userOption = that.userList.map(v => {
            return v.name;
          });
        },
        onFail: function(err) {}
      });
    },
    selectUser() {
      const that = this;
      dd.biz.util.multiSelect({
        options: that.userOption,
        selectOption: that.formData.userName,
        onSuccess: function(res) {
          if (res.buttonIndex === -1) return;
          that.formData.mainUserList = [];
          that.formData.userName = res.map(v => {
            that.formData.mainUserList.push(that.userList[v]);
            return that.userOption[v];
          });
          // that.formData.eventTypes = arr.join()
        },
        onFail: function() {}
      });
    },
    selectAssist() {
      const that = this;
      dd.biz.util.multiSelect({
        options: that.assistOption,
        selectOption: that.formData.assistName,
        onSuccess(res) {
          if (res.buttonIndex === -1) return;
          that.formData.helpUserList = [];
          that.formData.assistName = res.map(v => {
            that.formData.helpUserList.push(that.assistList[v]);
            return that.assistOption[v];
          });
          // that.formData.eventTypes = arr.join()
        },
        onFail: function() {}
      });
    },
    selectLeader() {
      const that = this;
      dd.biz.util.multiSelect({
        options: that.leaderOption,
        selectOption: that.formData.leaderName,
        onSuccess(res) {
          if (res.buttonIndex === -1) return;
          that.formData.leaderUserList = [];
          that.formData.leaderName = res.map(v => {
            // arr.push(that.eventList[v].id)
            that.formData.leaderUserList.push(that.leaderList[v]);
            return that.leaderOption[v];
          });
          // that.formData.eventTypes = arr.join()
        },
        onFail: function() {}
      });
    },
    alert(v) {
      dd.device.notification.alert({
        message: v,
        title: "提示",
        buttonName: "确定"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.confirm_warp {
  height: 100vh;
  background: rgb(236, 236, 236);
  h4 {
    line-height: 80px;
    opacity: 0.6;
    padding: 0 32px;
  }
  .opinion {
    textarea {
      width: 100%;
      height: 300px;
      padding: 32px;
      font-size: 32px;
    }
    .file {
      flex: 1;
      background: #fff;
      li {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 32px;
        span {
          flex: 1;
          .cf>.text-overflow-1();
        }
        i {
          font-size: 30px;
          opacity: 0.6;
          padding: 0 4px;
        }
      }
    }
    .accessory {
      display: flex;
      background: #fff;
      padding: 0 32px;
      justify-content: space-between;
      span {
        line-height: 90px;
      }
      div {
        flex: 1;
        padding: 24px;
      }
      b i {
        display: inline-block;
        color: #000;
        font-size: 40px;
        font-weight: 600;
        margin-top: 25px;
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
    }
  }
  .designate {
    padding: 0 32px;
    background: #fff;
    .item {
      border-bottom: solid 1px #e4e4e4;
      padding: 8px 0 24px;
      p {
        line-height: 68px;
        &.active {
          color: #409eff;
          font-size: 24px;
        }
      }
      textarea {
        width: 100%;
        height: 200px;
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 32px;
    display: flex;
    span {
      width: 100%;
      line-height: 80px;
      text-align: center;
      background: #3296fa;
      color: #fff;
      border-radius: 6px;
    }
  }
  .endHolder {
    height: 136px;
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
  input {
    font-size: 30px;
    line-height: 50px;
    width: 100%;
  }
}
</style>