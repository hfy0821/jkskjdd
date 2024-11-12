<template>
  <div class="safetyAdd_warp multiSelectClass mapClass">
    <div class="form" :class="edit ? '' : 'unclick'">
      <div class="item">
        <p :class="formData.checkTarget ? 'active' : ''">被检查单位</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.checkTarget"
            placeholder="点击输入被检查单位"
          />
          <!-- <i @click="selectCompanyAddress" class="iconfont icon-location"></i> -->
        </div>
      </div>
      <div class="item">
        <p>时间</p>
        <input
          @click="selectTime"
          type="text"
          readonly
          :value="formData.incidentTime"
          placeholder="点击选择时间"
        />
      </div>
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
      <div class="check">
        <div
          v-for="(v, i) in checkList"
          :key="i"
          :class="checkIndex === i ? 'active' : ''"
          @click="handCheck(i)"
        >
          <span>检查项{{ i + 1 }}</span>
          <i
            class="iconfont icon-cha2"
            @click="delChack(i)"
            v-if="checkList.length > 1 && checkIndex != i"
          ></i>
        </div>
        <i class="iconfont icon-jia" @click="addCheck"></i>
      </div>
      <div class="item">
        <p :class="checkList[checkIndex].firstName ? 'active' : ''">检查项</p>
        <input
          type="text"
          @click="selectFirst"
          readonly
          v-model="checkList[checkIndex].firstName"
          placeholder="请选择检查项"
        />
      </div>
      <div class="item">
        <p :class="checkList[checkIndex].secondName ? 'active' : ''">
          所属类目
        </p>
        <input
          type="text"
          @click="selectSecond"
          readonly
          v-model="checkList[checkIndex].secondName"
          placeholder="请选择所属类目"
        />
      </div>
      <!-- 存在问题 -->
      <div class="item question">
        <div class="questionTitle">
          <p :class="1 ? 'active' : ''">存在问题</p>
          <i class="iconfont icon-jia" @click="addQues()"></i>
        </div>
        <div
          class="questionList"
          v-for="(v, i) in checkList[checkIndex].question"
          :key="i"
        >
          <div v-if="checkList[checkIndex].secondName != '其他'">
            <input
              type="text"
              @click="selectThird(i)"
              readonly
              :value="v.name"
              placeholder="请选择存在问题"
            />
            <i
              class="iconfont icon-cha2"
              @click="delQues(i)"
              v-if="checkList[checkIndex].question.length > 1"
            ></i>
          </div>
          <div class="item" v-if="checkList[checkIndex].secondName == '其他'">
            <!-- <p class="active">问题描述</p> -->
            <input
              type="text"
              v-model.trim="checkList[checkIndex].question[i].otherContent"
              placeholder="请输入问题描述"
              @input="inputChange($event, i)"
            />
          </div>
          <!-- checkList[that.checkIndex].question[i].id -->
        </div>
      </div>
      <!-- 文字描述 -->
      <div class="item">
        <p :class="checkList[checkIndex].fourName ? 'active' : ''">文字描述</p>
        <div class="address">
          <input
            type="text"
            v-model="checkList[checkIndex].fourName"
            placeholder="输入文字描述"
          />
        </div>
      </div>
      <!-- <div class="item">
        <p :class="checkList[checkIndex].fourName ? 'active' : ''">是否合格</p>
        <input
          type="text"
          @click="selectFour"
          readonly
          v-model="checkList[checkIndex].fourName"
          placeholder="请选择是否合格"
        />
      </div> -->
      <div class="item">
        <p :class="checkList[checkIndex].fiveName ? 'active' : ''">检查类型</p>
        <input
          type="text"
          @click="selectFive"
          readonly
          v-model="checkList[checkIndex].fiveName"
          placeholder="请选择检查类型"
        />
      </div>
      <div class="item">
        <p :class="checkList[checkIndex].sixName ? 'active' : ''">检查人</p>
        <input
          type="text"
          readonly
          v-model="checkList[checkIndex].sixName"
          placeholder="请输入检查人姓名"
        />
      </div>
      <!-- <div class="item">
        <p :class="formData.qualifiedName ? 'active' : ''">是否合格</p>
        <div>
          <input
            @click="selectQualified"
            type="text"
            v-model="formData.qualifiedName"
            placeholder="点击选择是否合格"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.checkTypeName? 'active' : ''">检查类型</p>
        <input
          @click="selectCheckType"
          type="text"
          v-model.trim="formData.checkTypeName"
          placeholder="请选择检查类型"
        />
      </div> -->
      <!-- <div class="item">
        <p :class="formData.checkPerson ? 'active' : ''">检查人</p>
        <input
          type="text"
          v-model.trim="formData.checkPerson"
          placeholder="请输入检查人姓名"
        />
      </div> -->
      <!-- 附件上传 -->
      <div class="item">
        <p :class="formData.aaa ? 'active' : ''">附件上传</p>
        <ul class="file">
          <li v-for="(v, i) in files" :key="i">
            <span>{{ v.fileName }}</span>
            <i @click="delFile(i)" class="iconfont icon-cha2"></i>
          </li>
        </ul>
        <button>
          上传<input @change="fileChange" multiple type="file" name="" id="" />
        </button>
      </div>
    </div>
    <!-- map -->
    <div>
      <van-dialog width="90%" v-model="mapStatus" :show-confirm-button="false">
        <mapComponents @map_return="map_return" />
      </van-dialog>
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
      <b @click="handClick" v-show="edit && id">保存</b>
    </div>
  </div>
</template>
<script>
import multiSelectOdd from "../../../components/multiSelect_odd";
import mapComponents from "../../../components/map";
import {
  upload,
  getSomeList,
  addSafetyEvent,
  getSafetyList,
  getHandleEventDetailByIdForApp,
  safetyUpdate,
  saveSafetyRectifySituation,
} from "../../../api/a";
export default {
  components: { multiSelectOdd, mapComponents },

  data() {
    return {
      id: this.$route.query.id,
      checkIndex: 0,
      edit: true,
      userInfo: "",
      mapStatus: false,
      multiSelectOddShow: false,
      checkList: [
        {
          question: [{ id: "", name: "", otherContent: "" }],
          firstName: "",
          secondName: "",
          fourName: "",
          fiveName: "",
          sixName: JSON.parse(localStorage.getItem("userInfo")).name,
          secondList: [],
          thirdList: [],
        },
      ],
      safety: [],
      formData: {
        id: this.$route.query.id,
        authName: "peaceIncident:permissionList",
        parentAuthName: "peaceIncident:permissionList",
        eventSafety: "",
        roadName: "",
        roadId: "",
        incidentAddress: "",
        incidentTime: "",
        handleFilesListStr: "",
        checkTarget: "",
        // 检查人
        // checkPerson: "",
        teamworkType: 3,
      },
      files: [],
      firstList: [],
      fourList: [
        { id: "1", name: "是" },
        { id: "0", name: "否" },
      ],
      fiveList: [
        { id: "1", name: "专项检查" },
        { id: "2", name: "暗查暗访" },
        { id: "3", name: "交叉检查" },
        { id: "4", name: "平安复查" },
      ],
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
  },
  async created() {
    const that = this;
    dd.disablePullToRefresh();
    that.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (that.id) {
      document.title = "事件详情";
      const [data, data2, data3] = await Promise.all([
        getHandleEventDetailByIdForApp(that.$route.query),
        getSafetyList({ eventId: that.id }),
        getSomeList({ type: 9 }),
      ]);
      if (data.success) {
        that.firstList = data3.data;
        that.formData.roadName = data.data.sourceData.roadName;
        that.formData.roadId = data.data.sourceData.roadId;
        that.formData.checkTarget = data.data.sourceData.checkTarget;
        that.formData.incidentAddress = data.data.sourceData.incidentAddress;
        that.formData.incidentTime = data.data.sourceData.incidentTime;

        let index = 0;
        let thirdIndex = 0;
        // console.log(data2,'data2')
        data2.data.forEach((v) => {
          if (v.page > index) {
            that.checkList[v.page - 1] = {
              question: [],
              firstName: "",
              secondName: "",
              fourName: "",
              fiveName: "",
              sixName: "",
              secondList: [],
              thirdList: [],
            };
            index++;
            thirdIndex = 0;
          }
          if (v.type === 1) {
            that.checkList[v.page - 1].firstName = v.otherContent;
            that.checkList[v.page - 1].firstId = v.id;
            // that.checkList[v.page - 1].fourId = v.isQualified;
            that.checkList[v.page - 1].fourName =  v.textDescription;
            that.checkList[v.page - 1].fiveId = v.checkType - 1;
            that.fiveList.map((item, index) => {
              if (item.id == v.checkType) {
                that.checkList[v.page - 1].fiveName = item.name;
              }
            });
            that.checkList[v.page - 1].sixName = v.checkPerson;
            getSomeList({ type: 9, parentId: v.id }).then((res) => {
              if (res.success) {
                that.checkList[v.page - 1].secondList = res.data;
                that.checkList[v.page - 1].secondList.push({
                  name: "其他",
                  id: -1,
                });
              }
            });
          }
          if (v.type === 2) {
            that.checkList[v.page - 1].secondName = v.otherContent;
            that.checkList[v.page - 1].secondId = v.id;
            getSomeList({ type: 9, parentId: v.id }).then((res) => {
              if (res.success) {
                that.checkList[v.page - 1].thirdList = res.data;
                that.checkList[v.page - 1].thirdList.push({
                  name: "无问题",
                  id: "",
                });
              }
            });
          }
          if (v.type === 3) {
            that.checkList[v.page - 1].question.push({
              id: "",
              name: "",
              otherContent: "",
            });
            that.checkList[v.page - 1].question[thirdIndex].name =
              v.otherContent;
            that.checkList[v.page - 1].question[thirdIndex].id = v.id;
            if (v.id === -1) {
              that.checkList[v.page - 1].question[thirdIndex].otherContent =
                v.otherContent;
            }
            thirdIndex++;
          }
        });
      }
      // that.edit = false
      return;
    }
    const data = await getSomeList({ type: 9 });
    if (data.success) {
      that.firstList = data.data;
    }
  },
  methods: {
    inputChange(e, i) {
      this.checkList[this.checkIndex].question[i].id = -1;
    },
    addCheck() {
      this.checkList.push({
        question: [{ id: "", name: "" }],
        sixName: this.userInfo.name,
        firstName: "",
        secondName: "",
      });
    },
    handCheck(i) {
      this.checkIndex = i;
    },
    delChack(i) {
      this.checkList.splice(i, 1);
    },
    addQues() {
      const that = this;
      that.checkList[that.checkIndex].question.push({ id: "", name: "" });
      that.$forceUpdate();
    },
    delQues(i) {
      const that = this;
      that.checkList[that.checkIndex].question.splice(i, 1);
      that.$forceUpdate();
    },
    // 选择检查项
    selectFirst() {
      const that = this;
      let option_ = [];
      that.firstList.map((item, index) => {
        option_.push(item.name);
      });
      dd.device.notification.actionSheet({
        title: "选择检查项",
        cancelButton: "取消",
        otherButtons: option_,
        async onSuccess(res) {
          if (res.buttonIndex === -1) return;
          that.checkList[that.checkIndex].firstName =
            that.firstList[res.buttonIndex].name;
          that.checkList[that.checkIndex].firstId =
            that.firstList[res.buttonIndex].id;
          that.checkList[that.checkIndex].secondName = "";
          that.checkList[that.checkIndex].question = [{ id: "", name: "" }];
          const data = await getSomeList({
            type: 9,
            parentId: that.firstList[res.buttonIndex].id,
          });
          if (data.success) {
            that.checkList[that.checkIndex].secondList = data.data;
            that.checkList[that.checkIndex].secondList.push({
              name: "其他",
              id: -1,
            });
          }
          that.$forceUpdate();
        },
        onFail: function (err) {},
      });
    },
    // 选择所属类目
    selectSecond() {
      const that = this;
      let option_ = [];
      that.checkList[that.checkIndex].secondList.map((item, index) => {
        option_.push(item.name);
      });
      dd.device.notification.actionSheet({
        title: "选择所属类目",
        cancelButton: "取消",
        otherButtons: option_,
        async onSuccess(res) {
          if (res.buttonIndex === -1) return;
          that.checkList[that.checkIndex].secondName =
            that.checkList[that.checkIndex].secondList[res.buttonIndex].name;
          that.checkList[that.checkIndex].secondId =
            that.checkList[that.checkIndex].secondList[res.buttonIndex].id;

          that.checkList[that.checkIndex].question = [{ id: "", name: "" }];

          const data = await getSomeList({
            type: 9,
            parentId:
              that.checkList[that.checkIndex].secondList[res.buttonIndex].id,
          });
          if (data.success) {
            that.checkList[that.checkIndex].thirdList = data.data;
            that.checkList[that.checkIndex].thirdList.push({
              name: "无问题",
              id: "",
            });
          }
          that.$forceUpdate();
        },
        onFail: function (err) {},
      });
    },
    // 选择存在问题
    selectThird(i) {
      const that = this;
      let option_ = [];
      that.checkList[that.checkIndex].thirdList.map((item, index) => {
        option_.push(item.name);
      });
      dd.device.notification.actionSheet({
        title: "选择存在问题",
        cancelButton: "取消",
        otherButtons: option_,
        async onSuccess(res) {
          if (res.buttonIndex === -1) return;
          that.checkList[that.checkIndex].question[i].name =
            that.checkList[that.checkIndex].thirdList[res.buttonIndex].name;
          that.checkList[that.checkIndex].question[i].id =
            that.checkList[that.checkIndex].thirdList[res.buttonIndex].id;
          that.$forceUpdate();
        },
        onFail: function (err) {},
      });
    },
    // 选择是否合格
    selectFour() {
      const that = this;
      let option_ = ["是", "否"];
      dd.device.notification.actionSheet({
        title: "选择是否合格",
        cancelButton: "取消",
        otherButtons: option_,
        async onSuccess(res) {
          if (res.buttonIndex === -1) return;
          // that.checkList[that.checkIndex].fourName =
          //   that.fourList[res.buttonIndex].name;
          // that.checkList[that.checkIndex].fourId =
          //   that.fourList[res.buttonIndex].id;
          that.$forceUpdate();
        },
        onFail: function (err) {},
      });
    },
    // 检查类型
    selectFive() {
      const that = this;
      let option_ = [];
      that.fiveList.map((item, index) => {
        option_.push(item.name);
      });
      dd.device.notification.actionSheet({
        title: "选择检查类型",
        cancelButton: "取消",
        otherButtons: option_,
        async onSuccess(res) {
          if (res.buttonIndex === -1) return;
          that.checkList[that.checkIndex].fiveName =
            that.fiveList[res.buttonIndex].name;
          that.checkList[that.checkIndex].fiveId =
            that.fiveList[res.buttonIndex].id;
          that.$forceUpdate();
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
    map_return(data) {
      let that = this;
      that.mapStatus = data.status;
      if (data.v == 1) {
        that.formData.incidentAddress = data.address;
        that.formData.x = data.x;
        that.formData.y = data.y;
      }
    },
    selectAddress() {
      const that = this;
      that.mapStatus = true;

      // dd.biz.map.locate({
      //   //latitude: 39.903578, // 纬度，非必须
      //   //longitude: 116.473565, // 经度，非必须
      //   onSuccess: function (result) {
      //     var address =
      //       result.province + result.city + result.adName + result.snippet;
      //     that.formData.incidentAddress = address;
      //     // var point = GPS.gcj_decrypt(result.latitude,result.longitude);//转换坐标系
      //     // $scope.formData.x=point.lon;
      //     // $scope.formData.y=point.lat;
      //   },
      //   onFail: function (err) {
      //     alert(JSON.stringify(err));
      //   },
      // });
    },
    selectCompanyAddress() {
      const that = this;
      dd.biz.map.locate({
        //latitude: 39.903578, // 纬度，非必须
        //longitude: 116.473565, // 经度，非必须
        onSuccess: function (result) {
          var address =
            result.province + result.city + result.adName + result.snippet;
          that.formData.checkTarget = address;
          // var point = GPS.gcj_decrypt(result.latitude,result.longitude);//转换坐标系
          // $scope.formData.x=point.lon;
          // $scope.formData.y=point.lat;
        },
        onFail: function (err) {
          alert(JSON.stringify(err));
        },
      });
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
      // const date = new Date();
      // const today = `${date.getFullYear()}-${String(
      //   date.getMonth() + 1
      // ).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`;
      // dd.biz.util.datepicker({
      //   start: today,
      //   format: "yyyy-MM-dd",
      //   value: that.formData.incidentTime, //默认显示
      //   onSuccess: function (result) {
      //     that.formData.incidentTime = result.value;
      //   },
      //   onFail: function (err) {},
      // });
    },
    del() {},
    cancel() {
      this.$router.go(-1);
    },
    save() {},
    handClick(i) {
      const that = this;
      if (!that.formData.checkTarget) {
        that.alert("请输入事件名称");
        return;
      }
      if (!that.formData.roadId) {
        that.alert("请选择请选择所属街道");
        return;
      }
      if (!that.formData.incidentAddress) {
        that.alert("请输入所属地点");
        return;
      }
      const api = that.id ? safetyUpdate : addSafetyEvent;
      that.safety = [];
      let index = 0;
      let num = 0;
      that.checkList.forEach((v, i) => {
        index++;
        that.safety.push({
          safetyTypeId: v.firstId,
          type: 1,
          page: index,
          // isQualified: v.fourId,
          checkType: v.fiveId,
          checkPerson: v.sixName,
          textDescription: v.fourName
        });
        that.safety.push({ safetyTypeId: v.secondId, type: 2, page: index });
        if (!v.secondId || !v.firstId || !v.fiveId) {
          num += 1;
        }
        v.question.forEach((y, j) => {
          if (v.secondId == -1 && !y.otherContent) {
            num += 1;
          }
          if (y.id || (y.id == -1 && y.otherContent)) {
            that.safety.push({
              safetyTypeId: y.id,
              type: 3,
              page: index,
              otherContent: y.otherContent,
            });
          }
          // y.otherContent&&
        });
      });
      if (num != 0) {
        that.alert("请完成检查项内容");
        return;
      }
      that.formData.eventSafety = JSON.stringify(that.safety);
      that.formData.handleFilesListStr = JSON.stringify(that.files);
      dd.device.notification.confirm({
        message: that.id ? "确定修改？" : "确定上报？",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        async onSuccess(res) {
          if (res.buttonIndex) {
            const data = await api(that.formData);
            if (data.success) {
              dd.device.notification.toast({
                // icon: '',
                text: "操作成功",
                duration: 1.5,
                onSuccess(result) {
                  that.$router.go(-1);
                },
              });
            }
          }
        },
        onFail: function (err) {},
      });
    },
    async fileChange(e) {
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
</style>
