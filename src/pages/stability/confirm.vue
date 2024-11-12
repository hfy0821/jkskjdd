<template>
  <div class="confirm_warp multiSelectClass">
    <h4>{{ title }}</h4>
    <div v-if="i === '1' || i === '2' || i === '9'" class="opinion">
      <textarea
        v-model.trim="remark"
        name
        id
        placeholder="请输入意见"
      ></textarea>
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
          <span>{{ v.fileName }}</span>
          <i @click="delFile(i)" class="iconfont icon-cha2"></i>
        </li>
      </ul>
    </div>
    <div class="designate" v-if="i === '6'">
      <!-- 截止时间 -->
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
      <!-- 指派部门 -->
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
          @click="selectUser()"
          type="text"
          readonly
          :value="formData.userName"
          placeholder="点击选择部门人员"
        />
        <multiSelect
          v-if="multiSelectShow_r"
          @multiSelectClose="multiSelectComponent_r"
          :multiSelectData="{ data: userList, value: mainUserList_ }"
        />
      </div>
      <!-- 协办部门 -->
      <div class="item">
        <p>协办部门</p>
        <input
          @click="selectAssist($event)"
          type="text"
          readonly
          :value="formData.assistName"
          placeholder="点击选择部门"
        />
        <multiSelect
          v-if="multiSelectShow_x"
          @multiSelectClose="multiSelectComponent_x"
          :multiSelectData="{ data: assistOption, value: helpUserList_ }"
        />
      </div>
      <!-- 报送领导 -->
      <div class="item">
        <p>报送领导</p>
        <input
          @click="selectLeader($event)"
          type="text"
          readonly
          :value="formData.leaderName"
          placeholder="点击选择报送领导"
        />
        <multiSelect
          v-if="multiSelectShow"
          @multiSelectClose="multiSelectComponent"
          :multiSelectData="{ data: leaderList, value: leaderUserList_ }"
        />
      </div>
      <!-- 抄送人员 -->
      <div class="item">
        <p>抄送人员</p>
        <input
          type="text"
          @click="copyDeptartClick($event)"
          readonly
          :value="formData.copyDeptartName"
          placeholder="点击选择抄送人员"
        />
        <multiSelect
          v-if="multiSelectShow_copyDeptart"
          @multiSelectClose="multiSelectComponent_copyDeptart"
          :multiSelectData="{ data: assistOption, value: copyDeptartList_ }"
        />
      </div>
      <!-- 处置要求 -->
      <div class="item">
        <p>处置要求</p>
        <textarea
          v-model.trim="formData.remark"
          name
          id
          placeholder="请输入处置要求"
        ></textarea>
      </div>
    </div>
    <div class="designate" v-if="i === '8'">
      <div class="item">
        <p>协办部门</p>
        <input
          @click="selectAssist($event)"
          type="text"
          readonly
          :value="formData.assistName"
          placeholder="点击选择部门"
        />
        <multiSelect
          v-if="multiSelectShow_x"
          @multiSelectClose="multiSelectComponent_x"
          :multiSelectData="{ data: assistOption, value: helpUserList_ }"
        />
      </div>
      <div class="item">
        <p>报送领导</p>
        <input
          @click="selectLeader($event)"
          type="text"
          readonly
          :value="formData.leaderName"
          placeholder="点击选择报送领导"
        />
        <multiSelect
          v-if="multiSelectShow"
          @multiSelectClose="multiSelectComponent"
          :multiSelectData="{ data: leaderList, value: leaderUserList_ }"
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
import multiSelect from "../../components/multiSelect";

import {
  selAllDepAndUserByRight,
  addHandleData,
  upload,
  addHandleNew,
} from "../../api/a";
export default {
  components: {
    multiSelect,
  },
  data() {
    return {
      // 多选下拉
      multiSelectShow: false,
      multiSelectShow_x: false,
      multiSelectShow_r: false,
      leaderUserList_: [], //报送领导
      helpUserList_: [], // 协办
      mainUserList_: [], // 部门人员
      multiSelectShow_copyDeptart: false,
      copyDeptartList_: [],
      //
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
        helpUserList: [],
        copyDeptartList: [],
        copyDeptartName: [],
        copyUserList: [],
      },
      files: [],
    };
  },
  async created() {
    dd.disablePullToRefresh();
    this.title = this.titles[this.i];
    // document.title = this.title
    const [data, data2] = await Promise.all([
      selAllDepAndUserByRight({ isLeader: 1 }),
      selAllDepAndUserByRight({ workgroupCodeId: "ZFWstab", workType: 1 }),
    ]);
    if (data.success) {
      this.deptList = data2.data.departList;
      this.deptOption = data2.data.departList.map((v) => {
        return v.name || "-";
      });
      data2.data.departList.forEach((v) => {
        v.userList &&
          v.userList.length &&
          v.userList.forEach((y) => {
            y.onlyId = v.id + y.id;
            y.departmentId = v.id;
            this.assistList.push(y);
            // this.assistOption.push((v.name || "-") + ":" + (y.name || "-"));
            this.assistOption.push({
              name: (v.name || "-") + ":" + (y.name || "-"),
              id: v.id + y.id,
            });
          });
      });
      data.data.departList.forEach((v) => {
        v.userList &&
          v.userList.length &&
          v.userList.forEach((y) => {
            this.leaderList.push(y);
            this.leaderOption.push(y.name);
          });
      });
    }
  },
  methods: {
    multiSelectComponent_copyDeptart(v) {
      let that = this;
      that.multiSelectShow_copyDeptart = v.status;
      that.copyDeptartList_ = v.data;
      that.formData.copyDeptartName = v.nameArr;
      let arr = [];
      if (
        that.assistList &&
        that.assistList.length > 0 &&
        v.data &&
        v.data.length > 0
      ) {
        that.assistList.map((item, index) => {
          v.data.map((item1, index1) => {
            if (item.onlyId == item1) {
              arr.push(item);
            }
          });
        });
      }
      that.formData.copyUserList = arr;
    },
    copyDeptartClick(event) {
      let that = this;
      event.stopPropagation();
      that.multiSelectShow_copyDeptart = true;
    },
    confirm() {
      let that = this;
      if (that.i == 1 || that.i == 2 || that.i == 9) {
        let params = {
          rbacToken: localStorage.getItem("rbacToken"),
          remark: that.remark,
          eventId: that.id,
          handleType: that.$route.query.handleType,
          handleDepartmentId: that.$route.query.handleDepartmentId,
          operationType: 4 * that.i,
          authName: "emergencyHandleManagement:supplementaryExplanation",
          editDepartmentId: that.$route.query.handleDepartmentId,
        };
        if (that.i == 9) {
          params.operationType = 5;
        }
        if (!that.files.length) {
          params.isFile = 0;
        } else {
          params.isFile = 1;
          params.handleFileListStr = JSON.stringify(that.files);
        }
        // let sendData = new FormData();
        // for (const k in params) {
        //     sendData.append(k, params[k])
        // }
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
                        if (that.i === "9") {
                          that.$router.go(-2);
                          return;
                        }
                        that.$router.go(-that.i);
                      })
                      .catch((err) => {});
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
                onFail: function (err) {},
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      if (that.i == 8) {
        let params = {
          dingLinkUrl:
            "https://pazht.ouhai.gov.cn:8000/fyDingtalkWeb/index.html#/listing/3",
          departmentId: that.$route.query.handleDepartmentId,
          eventId: that.id,
          editDepartmentId: that.$route.query.firstDepartmentId,
          operationType: 2,
          helpUserList: that.formData.helpUserList,
          leaderUserList: that.formData.leaderUserList,
        };

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
                  const data = await addHandleData(params);
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
                onFail: function (err) {},
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      if (!that.formData.userName.length) {
        that.alert("请指派部门及人员");
        return;
      }
      that.formData.operationType = 3;
      that.formData.eventId = that.id;
      that.formData.handleDepartmentId = that.$route.query.handleDepartmentId;
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
                let d = Object.assign({}, that.formData, { remark: null });
                const data = await addHandleData(d);
                // const data = await addHandleData(that.formData);
                if (data.success) {
                  const data2 = await addHandleData({
                    departmentId: "8d406cedc99448b3a68b7033a92487be",
                    eventId: that.id,
                    handleType: 1,
                    operationType: 4,
                    remark: that.formData.remark,
                  });
                  dd.device.notification.hidePreloader({
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                } else {
                  dd.device.notification.hidePreloader({
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                }

                if (data.success) {
                  dd.alert({
                    message: data.message ? data.message : "操作成功",
                    title: "提示",
                    button: "收到",
                  })
                    .then((res) => {
                      that.$router.go(-2);
                    })
                    .catch((err) => {});
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
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {},
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
          onSuccess(result) {},
        });
        files.forEach((v) => {
          sendData.append("file", v);
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
    selectTime() {
      const that = this;
      const date = new Date();
      const today = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`;
      dd.showDatePicker({
        format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        value: that.formData.incidentTime, //默认显示日期
      })
        .then((result) => {
          that.formData.cutOffTime = result.value;
        })
        .catch((err) => {});
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
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData.userName = [];
          that.formData.operationId = that.deptList[res.buttonIndex].id;
          that.formData.departmentId = that.deptList[res.buttonIndex].id;
          that.formData.deptName = that.deptOption[res.buttonIndex];
          that.userList = that.deptList[res.buttonIndex].userList;
          that.userOption = that.userList.map((v) => {
            return v.name;
          });
        },
        onFail: function (err) {},
      });
    },
    //部门人员
    multiSelectComponent_r(v) {
      let that = this;
      // that.formData.leaderUserList = v.data.length > 0 ? v.data.join(",") : "";
      that.multiSelectShow_r = v.status;
      that.mainUserList_ = v.data;
      let nameArr = [];
      let mainUserList_value = [];

      if (
        that.userList &&
        that.userList.length > 0 &&
        v.data &&
        v.data.length > 0
      ) {
        that.userList.map((item, index) => {
          v.data.map((item1, index1) => {
            if (item.id == item1) {
              mainUserList_value.push(item);
              nameArr.push(item.name);
            }
          });
        });
      }
      that.formData.userName = nameArr;
      that.formData.mainUserList = mainUserList_value;
    },
    selectUser() {
      const that = this;
      that.multiSelectShow_r = true;

      // dd.biz.util.multiSelect({
      //   options: that.userOption,
      //   selectOption: that.formData.userName,
      //   onSuccess: function(res) {
      //     if (res.buttonIndex === -1) return;
      //     that.formData.mainUserList = [];
      //     that.formData.userName = res.map(v => {
      //       that.formData.mainUserList.push(that.userList[v]);
      //       return that.userOption[v];
      //     });
      //     // that.formData.eventTypes = arr.join()
      //   },
      //   onFail: function() {}
      // });
    },
    // 协办部门
    multiSelectComponent_x(v) {
      let that = this;
      // that.formData.leaderUserList = v.data.length > 0 ? v.data.join(",") : "";
      that.multiSelectShow_x = v.status;
      that.helpUserList_ = v.data;
      that.formData.assistName = v.nameArr;

      let helpUserList_value = [];
      if (
        that.assistList &&
        that.assistList.length > 0 &&
        v.data &&
        v.data.length > 0
      ) {
        that.assistList.map((item, index) => {
          v.data.map((item1, index1) => {
            if (item.onlyId == item1) {
              helpUserList_value.push(item);
            }
          });
        });
      }
      that.formData.helpUserList = helpUserList_value;
    },
    selectAssist(event) {
      event.stopPropagation();
      // event.preventDefault()
      const that = this;
      that.multiSelectShow_x = true;

      // alert(JSON.stringify(that.assistList));
      // dd.biz.util.multiSelect({
      //   options: that.assistOption,
      //   selectOption: that.formData.assistName,
      //   onSuccess(res) {
      //     if (res.buttonIndex === -1) return;
      //     that.formData.helpUserList = [];
      //     that.formData.assistName = res.map(v => {
      //       that.formData.helpUserList.push(that.assistList[v]);
      //       return that.assistOption[v];
      //     });
      //     // that.formData.eventTypes = arr.join()
      //   },
      //   onFail: function() {}
      // });
    },
    // 报送领导 ---
    multiSelectComponent(v) {
      let that = this;
      // that.formData.leaderUserList = v.data.length > 0 ? v.data.join(",") : "";
      that.multiSelectShow = v.status;
      that.leaderUserList_ = v.data;
      let nameArr = [];
      let leaderList_value = [];

      if (
        that.leaderList &&
        that.leaderList.length > 0 &&
        v.data &&
        v.data.length > 0
      ) {
        that.leaderList.map((item, index) => {
          v.data.map((item1, index1) => {
            if (item.id == item1) {
              leaderList_value.push(item);
              nameArr.push(item.name);
            }
          });
        });
      }
      that.formData.leaderName = nameArr;
      that.formData.leaderUserList = leaderList_value;
    },
    selectLeader(event) {
      event.stopPropagation();
      // event.preventDefault()
      const that = this;
      that.multiSelectShow = true;
      // dd.biz.util.multiSelect({
      //   options: that.leaderOption,
      //   selectOption: that.formData.leaderName,
      //   onSuccess(res) {
      //     if (res.buttonIndex === -1) return;
      //     that.formData.leaderUserList = [];
      //     that.formData.leaderName = res.map(v => {
      //       // arr.push(that.eventList[v].id)
      //       that.formData.leaderUserList.push(that.leaderList[v]);
      //       return that.leaderOption[v];
      //     });
      //     // that.formData.eventTypes = arr.join()
      //   },
      //   onFail: function() {}
      // });
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
          .cf > .text-overflow-1();
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