<template>
  <div class="reportedAdd_warp multiSelectClass">
    <div class="form" :class="edit ? '' : 'unclick'">
      <div class="item">
        <p :class="formData.title ? 'active' : ''">事件名称</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入事件名称"
        />
      </div>
      <div class="item">
        <p :class="formData.earlyWarningLevel ? 'active' : ''">事件等级</p>
        <input
          @click="selectWarningLevel"
          type="text"
          readonly
          v-model.trim="formData.earlyWarningLevelName"
          placeholder="点击选择事件等级"
        />
      </div>
      <!-- 所属街道 -->
      <div class="item">
        <p :class="formData.roadName ? 'active' : ''">所属街道</p>
        <div>
          <input
            @click="selectStreet"
            readonly
            type="text"
            v-model="formData.roadName"
            placeholder="点击选择所属街道"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.actionName ? 'active' : ''">现实行为</p>
        <div>
          <input
            @click="selectBehave"
            readonly
            type="text"
            v-model="formData.actionName"
            placeholder="点击选择现实行为"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.incidentTime ? 'active' : ''">事发时间</p>
        <div>
          <input
            @click="selectTime"
            readonly
            type="text"
            v-model="formData.incidentTime"
            placeholder="事发时间"
          />
        </div>
      </div>
      <div class="item">
        <p
          :class="
            formData.eventName && formData.eventName.length ? 'active' : ''
          "
        >
          事件类别
        </p>
        <div>
          <input
            @click="selectEventType"
            readonly
            type="text"
            :value="formData.eventName"
            placeholder="点击选择事件类别"
          />
          <multiSelect
            v-if="multiSelectShow"
            @multiSelectClose="multiSelectComponent"
            :multiSelectData="{ data: eventList, value: formData.eventTypes }"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.incidentAddress ? 'active' : ''">所属地点</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.incidentAddress"
            placeholder="点击选择所属地点"
          />
          <i @click="selectAddress" class="iconfont icon-location"></i>
        </div>
      </div>
      <div class="item">
        <p :class="formData.remark ? 'active' : ''">补充地址</p>
        <input
          type="text"
          v-model.trim="formData.remark"
          placeholder="在此输入补充地址"
        />
      </div>
      <div class="item incidentContent">
        <p :class="formData.incidentContent ? 'active' : ''">事件描述</p>
        <div>
          <input
            type="text"
            v-model.trim="formData.incidentContent"
            placeholder="在此输入事件描述"
          />
        </div>
      </div>

      <div class="item" v-if="!id">
        <p :class="formData.aaa ? 'active' : ''">附件上传</p>
        <ul class="file">
          <li v-for="(v, i) in files" :key="i">
            <span>{{ v.fileName }}</span>
            <i @click="delFile(i)" class="iconfont icon-cha2"></i>
          </li>
        </ul>
        <button>
          上传
          <input @change="fileChange" multiple type="file" name id />
        </button>
      </div>
    </div>
    <!-- multiSelectOdd -->
    <div>
      <multiSelectOdd
        :multiSelectOddData="streetList"
        v-if="multiSelectOddShow"
        @multiSelectOddReturn="multiSelectOddReturn"
      />
    </div>
    <div class="endHolder"></div>
    <div class="btn">
      <span @click="handClick(1)" v-if="!id">上报</span>
      <i @click="del()" v-show="!edit && id">删除</i>
      <b @click="edit = true" v-show="!edit && id">编辑</b>
      <i @click="cancel" v-show="edit && id">取消</i>
      <b @click="handClick(1)" v-show="edit && id">保存</b>
    </div>
  </div>
</template>
<script>
import multiSelect from "../../components/multiSelect";
import multiSelectOdd from "../../components/multiSelect_odd";

import {
  upload,
  saveData,
  getHandleEventDetailByIdForApp,
  getSomeList,
} from "../../api/a";
export default {
  name: "reportedAdd",
  components: {
    multiSelect,
    multiSelectOdd,
  },
  data() {
    return {
      multiSelectOddShow: false,
      // 多选下拉
      multiSelectShow: false,
      //
      id: this.$route.query.id,
      index: [],
      edit: true,
      warningLevel: ["一般", "黄色", "橙色", "红色"],
      formData: {
        authType: 1,
        handType: 0,
        isTeamWork: 1,
        teamworkType: 5,
        sourceType: 117,
        // authName: "healthEvent:roleList",
        // parentAuthName: "healthEvent:roleList",
        reportId: JSON.parse(localStorage.getItem("userInfo")).id,
        title: "",
        eventName: "",
        eventTypes: "",
        actionName: "",
        actionType: "",
        roadName: "",
        roadId: "",
        incidentAddress: "",
        incidentContent: "",
        remark: "",
        incidentTime: "",
        earlyWarningLevel: "",
        earlyWarningLevelName: "",
        handleFilesListStr: "",
      },
      files: [],
      typeSelectOption: [],
      // typeOption: ['劳资纠纷','非正常死亡','涉众型经济','住房纠纷','医疗纠纷','城中村改造','执法纠纷',
      //     '学区划分','校园安全','公共安全','国家安全','其他','村（社区）规模优化调整'],
      // behaveOption: ["集体上访","拦路","聚集","其他"],
      // streetOption: ["SB街道","XX街道","123","其他"],
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
    // actionList() {
    // 	return this.$store.state.common.actionList
    // },
    // actionOption() {
    // 	return this.$store.state.common.actionList.map(v=>{
    // 		return v.name
    // 	})
    // },
    // eventList() {
    // 	return this.$store.state.common.eventList
    // },
    // eventOption() {
    // 	return this.$store.state.common.eventList.map(v=>{
    // 		return v.name
    // 	})
    // },
  },
  async created() {
    dd.disablePullToRefresh()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
    console.log(this.id);
    if (this.id) {
      document.title = "事件详情";
      // this.edit = false
      const data = await getHandleEventDetailByIdForApp(this.$route.query);

      if (data.success) {
        this.formData = data.data.sourceData;
        // this.formData.authName = "eventManagement:edit"
        // this.formData.parentAuthName = "healthEvent:eventManagement"
        this.formData.earlyWarningLevelName =
          typeof this.formData.earlyWarningLevel === "number" &&
          this.warningLevel[this.formData.earlyWarningLevel];
      }
    }
    const [data1, data2] = await Promise.all([
      getSomeList({ type: 12 }),
      getSomeList({ type: 13 }),
    ]);
    if (data1.success) {
      this.actionList = data1.data;
      this.actionOption =
        this.actionList &&
        this.actionList.length &&
        this.actionList.map((v) => {
          return v.name;
        });
    }
    if (data2.success) {
      this.eventList = data2.data;
      this.eventOption =
        data2.data &&
        data2.data.length &&
        this.actionList.map((v) => {
          return v.name;
        });
    }
  },
  methods: {
    // 事件类别
    multiSelectComponent(v) {
      let that = this;
      that.formData.eventTypes = v.data.length > 0 ? v.data.join(",") : "";
      that.multiSelectShow = v.status;
      let nameArr = [];
      if (that.eventList.length > 0 && v.data.length > 0) {
        that.eventList.map((item, index) => {
          v.data.map((item1, index1) => {
            if (item.id == item1) {
              nameArr.push(item.name);
            }
          });
        });
      }
      that.formData.eventName = nameArr;
    },
    selectEventType() {
      const that = this;
      that.formData.eventTypes = that.formData.eventTypes
        ? that.formData.eventTypes.split(",").map(Number)
        : [];
      setTimeout(() => {
        that.multiSelectShow = true;
      }, 100);
      // dd.biz.util.multiSelect({
      //     options:that.eventOption,
      //     selectOption:that.typeSelectOption,
      //     onSuccess : function(res) {
      //         let arr = []
      //         that.formData.eventName = res.map(v=>{
      // 			arr.push(that.eventList[v].id)
      // 			return that.eventOption[v]
      // 		})
      // 		that.formData.eventTypes = arr.join()
      //     },
      //     onFail : function() {}
      // })
    },
    selectBehave() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择现实行为？",
        cancelButton: "取消",
        otherButtons: that.actionOption ? that.actionOption : [],
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          // that.formData.actionName = that.actionOption[res.buttonIndex]
          that.formData.actionType = that.actionList[res.buttonIndex].id;
          that.formData.actionName = that.actionList[res.buttonIndex].name;
        },
        onFail: function (err) {},
      });
    },
    // 所属街道
    multiSelectOddReturn(data) {
      let that = this;
      that.multiSelectOddShow = data.status;
      if (data.id) {
        that.formData.roadId = data.id;
        that.formData.roadName = data.name;
      }
    },
    selectStreet() {
      const that = this;
      that.multiSelectOddShow = true;

      // dd.device.notification.actionSheet({
      //   title: "选择所属街道？",
      //   cancelButton: "取消",
      //   otherButtons: that.streetOption,
      //   onSuccess: function (res) {
      //     if (res.buttonIndex === -1) return;
      //     that.formData.roadId = that.streetList[res.buttonIndex].id;
      //     that.formData.roadName = that.streetOption[res.buttonIndex];
      //   },
      //   onFail: function (err) {},
      // });
    },
    selectAddress() {
      const that = this;
      dd.locateOnMap({
        // latitude: 39.903578, // 纬度，非必须
        // longitude: 116.47F3565, // 经度，非必须
      })
        .then((result) => {
          var address =
            result.province + result.city + result.adName + result.snippet;
          that.formData.incidentAddress = address;
          const point = GPS.gcj_decrypt(result.latitude, result.longitude); //转换坐标系
          that.formData.x = point.lon;
          that.formData.y = point.lat;
        })
        .catch((err) => {});
      // dd.biz.map.locate({
      //   //latitude: 39.903578, // 纬度，非必须
      //   //longitude: 116.473565, // 经度，非必须
      //   onSuccess: function (result) {
      //     var address =
      //       result.province + result.city + result.adName + result.snippet;
      //     that.formData.incidentAddress = address;
      //     const point = GPS.gcj_decrypt(result.latitude, result.longitude); //转换坐标系
      //     that.formData.x = point.lon;
      //     that.formData.y = point.lat;
      //   },
      //   onFail: function (err) {
      //     alert(JSON.stringify(err));
      //   },
      // });
    },
    selectTime() {
      const that = this;
      dd.showDatePicker({
        format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        value: that.formData.incidentTime, //默认显示日期
      })
        .then((result) => {
          that.formData.incidentTime = result.value;
        })
        .catch((err) => {});
      // dd.biz.util.datetimepicker({
      //     format: 'yyyy-MM-dd HH:mm:ss',
      //     value: that.formData.incidentTime, //默认显示
      //     onSuccess : function(result) {
      //         that.formData.incidentTime = result.value;
      //     },
      //     onFail : function(err) {}
      // })
    },
    selectWarningLevel() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择事件等级？",
        cancelButton: "取消",
        otherButtons: this.warningLevel,
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData.earlyWarningLevel = res.buttonIndex;
          that.formData.earlyWarningLevelName = [
            "一般",
            "黄色",
            "橙色",
            "红色",
          ][res.buttonIndex];
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
      console.log(this.formData, 11111111);
      // return
      this.formData.authType = 1;
      if (!this.formData.title) {
        this.alert("请输入事件名称");
        return;
      }
      if (!this.formData.roadId) {
        this.alert("请选择请选择所属街道");
        return;
      }
      if (!this.formData.incidentTime) {
        this.alert("请选择事发时间");
        return;
      }
      if (!this.formData.eventTypes.length) {
        this.alert("请选择事件类别");
        return;
      }
      if (!this.formData.incidentAddress) {
        this.alert("请输入所属地点");
        return;
      }
      if (!this.formData.incidentContent) {
        this.alert("请输入事件描述");
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
                const data = await saveData(that.formData);
                console.log(data, 2);
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
                    .then((result) => {
                      that.formData = {
                        authType: 1,
                        handType: 0,
                        isTeamWork: 1,
                        teamworkType: 5,
                        sourceType: 117,
                        // authName: "healthEvent:roleList",
                        // parentAuthName: "healthEvent:roleList",
                        reportId: JSON.parse(localStorage.getItem("userInfo"))
                          .id,
                        title: "",
                        eventName: "",
                        eventTypes: "",
                        actionName: "",
                        actionType: "",
                        roadName: "",
                        roadId: "",
                        incidentAddress: "",
                        incidentContent: "",
                        remark: "",
                        incidentTime: "",
                        earlyWarningLevel: "",
                        earlyWarningLevelName: "",
                        handleFilesListStr: "",
                      };
                      that.$router.go(-1);
                    })
                    .catch((err) => {});
                  //   dd.device.notification.toast({
                  //     icon: "",
                  //     text: "操作成功",
                  //     duration: 2,
                  //     delay: 0,
                  //     onSuccess(result) {
                  //       that.formData = {
                  //         authType: 1,
                  //         handType: 0,
                  //         isTeamWork: 1,
                  //         teamworkType: 5,
                  //         sourceType: 117,
                  //         // authName: "healthEvent:roleList",
                  //         // parentAuthName: "healthEvent:roleList",
                  //         reportId: JSON.parse(localStorage.getItem("userInfo"))
                  //           .id,
                  //         title: "",
                  //         eventName: "",
                  //         eventTypes: "",
                  //         actionName: "",
                  //         actionType: "",
                  //         roadName: "",
                  //         roadId: "",
                  //         incidentAddress: "",
                  //         incidentContent: "",
                  //         remark: "",
                  //         incidentTime: "",
                  //         earlyWarningLevel: "",
                  //         earlyWarningLevelName: "",
                  //         handleFilesListStr: ""
                  //       };
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
  .source {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 32px;
    background: #ebebeb;
    span,
    i {
      font-size: 24px;
      line-height: 60px;
    }
    span {
      opacity: 0.6;
    }
    i {
      color: #409eff;
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
          // &::after{
          //     content: '*';
          //     position: absolute;
          //     right: -14px;
          //     top: 4px;
          //     color: red;
          // }
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
</style>
