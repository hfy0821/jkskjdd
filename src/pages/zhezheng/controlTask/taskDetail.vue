<template>
  <div class="task_warp">
    <div class="tabClass" :class="edit ? '' : 'unclick'">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
    </div>
    <!-- 管控信息 -->
    <div v-if="tabIndex == 1">
      <!-- 风险等级 -->
      <div class="cluesMsg">
        <div class="header_icon"><span>风险等级</span></div>
        <div class="riskLevel">
          <span>{{ formData.controlLevel }}</span>
        </div>
      </div>
      <!-- 管控工作  -->
      <div class="analyseClass">
        <div class="header_icon"><span>管控工作</span></div>
        <div class="form" :class="edit ? '' : 'unclick'">
          <div class="item">
            <p :class="formData.controlProject ? 'active' : ''">管控计划</p>
            <input
              type="text"
              v-model.trim="formData.controlProject"
              placeholder="输入管控计划"
              :readonly="disabled"
            />
          </div>
          <!-- <div class="item">
            <p :class="formData.controlCycle ? 'active' : ''">管控周期</p>
            <input
              type="number"
              v-model.trim="formData.controlCycle"
              :readonly="disabled"
              placeholder="在此输入管控周期"
            />
          </div> -->
        </div>
      </div>
      <!-- 管控反馈 -->
      <div
        class="feedbackClass"
        v-if="status == 1 || status == 2"
      >
        <div class="header_icon"><span>管控反馈</span></div>
        <div class="form" :class="edit ? '' : 'unclick'">
          <div class="item">
            <textarea
              type="text"
              v-model.trim="feedback"
              placeholder="输入管控反馈内容"
              rows="6"
            />
            <span class="feedbackHistory" @click="feedbackHistory()"
              >反馈历史</span
            >
          </div>
        </div>
      </div>
      <!-- 管控反馈 -->
      <div
        class="feedbackClass"
        v-if="status == 3 || status == 4"
      >
        <div class="header_icon"><span>管控反馈</span></div>
        <div class="form" :class="edit ? '' : 'unclick'">
          <div class="item">
            <ul class="listClass">
              <li
                v-for="(item, index) in listData"
                :key="index"
                class="listClass_li"
              >
                <div class="li_content">
                  <div class="li_content_content">{{ item.content }}</div>
                  <div class="li_content_time">
                    反馈时间&nbsp;&nbsp;&nbsp;{{ item.createTime }}
                  </div>
                  <div class="li_content_department">
                    处置单位&nbsp;&nbsp;&nbsp;{{ item.handleDepart }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 人员信息 -->
    <div v-if="tabIndex == 2">
      <!-- 人物信息 -->
      <div class="analyseClass">
        <div class="header_icon"><span>人物信息</span></div>
        <div class="form" :class="edit ? '' : 'unclick'">
          <div class="item">
            <p :class="personData.name ? 'active' : ''">事件人物</p>
            <input
              type="text"
              v-model.trim="personData.name"
              placeholder="输入人物姓名"
              :readonly="disabled"
            />
          </div>
          <div class="item">
            <p :class="personData.sex ? 'active' : ''">
              性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
            </p>
            <input
              type="text"
              readonly
              :value="
                personData.sex == 1 ? '男' : personData.sex == 2 ? '女' : ''
              "
              placeholder="性别选择"
            />
          </div>
          <div class="item">
            <p :class="personData.phone ? 'active' : ''">手机号码</p>
            <input
              type="number"
              v-model.trim="personData.phone"
              :readonly="disabled"
              placeholder="在此输入手机号码"
            />
          </div>
          <div class="item">
            <p :class="personData.birthday ? 'active' : ''">出生日期</p>
            <input
              type="text"
              :readonly="disabled"
              v-model.trim="personData.birthday"
              placeholder="在此输入出生日期"
            />
          </div>
          <div class="item">
            <p :class="personData.cardId ? 'active' : ''">身份证号</p>
            <input
              type="text"
              :readonly="disabled"
              v-model.trim="personData.cardId"
              placeholder="在此输入身份证号"
            />
          </div>
          <div class="item">
            <p :class="personData.roadName ? 'active' : ''">所属镇街</p>
            <input
              type="text"
              v-model.trim="personData.roadName"
              placeholder="请选择"
              :readonly="disabled"
            />
          </div>
          <div class="item">
            <p :class="personData.address ? 'active' : ''">家庭地址</p>
            <div class="relativeC">
              <input
                type="text"
                v-model.trim="personData.address"
                placeholder="点击输入地址，也可地图进行定位"
                :readonly="disabled"
              />
              <!-- <i @click="addressFn()" class="iconfont icon-location"></i> -->
            </div>
          </div>
          <div class="item">
            <p
              :class="
                personData.emphasesStatus == 0 || personData.emphasesStatus == 1
                  ? 'active'
                  : ''
              "
            >
              重点人员
            </p>
            <input
              type="text"
              :value="
                personData.emphasesStatus == 0
                  ? '不是'
                  : personData.emphasesStatus == 1
                  ? '是'
                  : ''
              "
              placeholder="请选择"
              :readonly="disabled"
            />
          </div>
          <div class="item" v-if="personData.emphasesStatus == 1">
            <p :class="personData.emphasesType ? 'active' : ''">人员类型</p>
            <!-- <div class="item_person">
              <span>
                {{ personData.emphasesType }}
              </span>
            </div> -->
            <input
              type="text"
              v-model.trim="personData.emphasesType"
              placeholder="请输入"
              :readonly="disabled"
            />
          </div>
          <div class="item">
            <p :class="personData.controlCount ? 'active' : ''">管控历史</p>
            <input
              type="text"
              v-model.trim="personData.controlCount"
              placeholder="请输入"
              :readonly="disabled"
            />
          </div>
        </div>
      </div>
      <!-- 性格标签  -->
      <div class="analyseClass">
        <div class="header_icon"><span>性格标签</span></div>
        <div class="form" :class="edit ? '' : 'unclick'">
          <div class="item" style="border-bottom: 0px">
            <div
              v-for="(item, index) in personData.characterLabels"
              :key="index"
              class="item_tags"
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 审核信息 -->
    <div
      v-if="
        missionStatus == 1 ||
        missionStatus == 2 ||
        missionStatus == 3 ||
        missionStatus == 4
      "
    >
      <div v-if="tabIndex == 3">
        <div class="analyseClass">
          <div class="header_icon"><span>审核信息</span></div>
          <div class="form" :class="edit ? '' : 'unclick'">
            <ul class="listClass_ul">
              <li
                v-for="(item1, index1) in auditData"
                :key="index1"
                class="listClass_li"
              >
                <div class="li_content">
                  <div class="li_content_applyTime">
                    申请时间
                    <span>{{ item1.createTime }}</span>
                  </div>
                  <div class="li_content_auditTime">
                    审核时间
                    <span>{{ item1.updateTime }}</span>
                  </div>
                  <div class="li_content_result">
                    审核结果
                    <span>{{ item1.verifyResult }}</span>
                  </div>
                  <div class="li_content_description">
                    描述&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{ item1.content }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="btn" v-if="missionStatus !== 4">
      <span
        @click="endFn()"
        class="btn_span"
        v-if="status == 1 || status == 2"
        >结束管控</span
      >
      <span
        @click="feedbackFn(missionStatus)"
        v-if="status == 1 || status == 2"
        >管控反馈</span
      >
      <span @click="reviewFn()" class="btn_span" v-if="status == 3"
        >审核中</span
      >
    </div>
  </div>
</template>
<script>
import {
  getControlDetail,
  getControlPeopleDetail,
  saveFeedBack,
  getTaskVerify,
  endTask,
} from "@/api/a";
import Nav from "../../../components/tab";
export default {
  components: { Nav },
  data() {
    return {
      disabled: true,
      edit: true,
      tabs: [{ name: "管控信息" }, { name: "人员信息" }],
      tabIndex: localStorage.getItem("taskDetailTabIndex") / 1 || 1,
      formData: {
        controlLevel: "",
        controlProject: "",
        // controlCycle: "",
      },
      feedback: "",
      personData: {
        name: "",
        sex: "",
        phone: "",
        birthday: "",
        cardId: "",
        // roadId: "",
        roadName: "",
        address: "",
        emphasesStatus: "",
        emphasesType: "",
        controlCount: "",
        characterLabels: [],
      },
      auditData: [],
      // sexData: [],
      roadData1: [],
      listData: [],
      missionStatus: "",
      // emphasisPerson: [],
      detailId: "",
      status: "",
    };
  },
  async created() {
    const that = this;
    let store = this.$store.state;
    that.roadData1 = store.roadData1;
    // that.sexData = store.sexData;
    // that.emphasisPerson = store.emphasisPerson;
    that.getData();
    that.getPeopleData();
    that.getVerifyData();
    that.$forceUpdate();
  },
  computed: {},
  methods: {
    // 管控信息数据
    async getData() {
      const that = this;
      let query = that.$route.query;
      that.missionStatus = query.missionStatus;
      that.detailId = query.id;
      if (
        that.missionStatus == 1 ||
        that.missionStatus == 2 ||
        that.missionStatus == 3 ||
        that.missionStatus == 4
      ) {
        that.tabs = that.tabs.concat([{ name: "审核信息" }]);
      }
      const data = await getControlDetail({
        ...that.params,
        id: query.id,
      });
      if (data.success) {
        const _data = data.data;
        that.formData.controlLevel = _data.controlLevel;
        that.formData.controlProject = _data.controlProject;
        // that.formData.controlCycle = _data.controlCycle;
        that.listData = _data.handlePageList;
        that.status = _data.missionStatus;
      }
    },
    // 人员信息数据
    async getPeopleData() {
      const that = this;
      let query = that.$route.query;
      const res = await getControlPeopleDetail({
        id: query.peopleId,
      });
      if (res.success) {
        const _res = res.data;
        console.log("_res", _res);
        that.personData.name = _res.name;
        that.personData.sex = _res.sex;
        that.personData.phone = _res.phone;
        that.personData.birthday = _res.birthday;
        that.personData.cardId = _res.cardId;
        that.personData.roadName = _res.roadName;
        that.personData.emphasesStatus = _res.emphasesStatus;
        that.personData.emphasesType = _res.emphasesType;
        that.personData.characterLabels = _res.characterLabelNameList;
        that.personData.roadName = _res.roadName;
        that.personData.controlCount = _res.controlCount;
        that.personData.address = _res.address;
      }
    },
    // 审核信息数据
    async getVerifyData() {
      const that = this;
      let query = that.$route.query;
      const res = await getTaskVerify({ id: query.id });
      if (res.success) {
        that.auditData = res.data;
      }
    },
    // 镇街选择
    roadFn() {
      const that = this;
      dd.showSelect({
        source: that.roadData1,
      })
        .then((res) => {
          that.personData.roadId = res.value;
          that.personData.roadName = res.key;
        })
        .catch((err) => {});
    },
    // 选择地址
    addressFn() {
      const that = this;
      dd.locateOnMap({})
        .then((res) => {
          let address = res.province + res.city + res.adName + res.title;
          that.personData.address = address;
        })
        .catch((err) => {});
    },
    // 提交验证
    validateFn() {
      const that = this;
      if (!that.feedback) {
        that.alert("请输入管控反馈内容");
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
    // tab切换
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("taskDetailTabIndex", i);
      that.$forceUpdate();
    },
    // 结束反馈
    endFn() {
      const that = this;
      dd.confirm({
        title: "温馨提示",
        message: "确定结束管控？",
        buttonLabels: ["取消", "确定"],
      })
        .then(async (res) => {
          if (res.buttonIndex == 1) {
            const res = await endTask({ id: that.detailId });
            if (res.success) {
              that.$router.go(-1);
            }
          }
        })
        .catch((err) => {});
    },
    // 管控反馈
    feedbackFn(missionStatus) {
      const that = this;
      let query = that.$route.query;
      missionStatus = query.missionStatus;
      console.log("query", query);
      let v = that.validateFn();
      if (v) {
        if (missionStatus == 1) {
          dd.confirm({
            title: "温馨提示",
            message: "确定提交管控反馈？",
            buttonLabels: ["取消", "确定"],
          })
            .then(async (res) => {
              if (res.buttonIndex == 1) {
                const data = await saveFeedBack({
                  content: that.feedback,
                  missionId: query.id,
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
        } else if (missionStatus == 2) {
          dd.confirm({
            title: "温馨提示",
            message: "确定提交管控反馈？",
            buttonLabels: ["取消", "确定"],
          })
            .then(async (res) => {
              if (res.buttonIndex == 1) {
                const data = await saveFeedBack({
                  content: that.feedback,
                  missionId: query.id,
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
                    that.feedback=""
                }
              }
            })
            .catch((err) => {});
        }
        
      }
      // if (missionStatus == 1) {
      //   let v = that.validateFn();
      //   if (v) {
      //     dd.confirm({
      //       title: "温馨提示",
      //       message: "确定管控反馈？",
      //       buttonLabels: ["取消", "确定"],
      //     })
      //       .then(async (res) => {
      //         if (res.buttonIndex == 1) {
      //           const data = await saveFeedBack({
      //             content: that.feedback,
      //             missionId: query.id,
      //           });
      //           if (data.success) {
      //             dd.toast({
      //               icon: "success",
      //               text: "操作成功", //提示信息
      //             })
      //               .then((res) => {
      //                 that.$router.go(-1);
      //               })
      //               .catch((err) => {});
      //           }
      //         }
      //       })
      //       .catch((err) => {});
      //   }
      // } else if (missionStatus == 2) {
      //   dd.confirm({
      //     title: "温馨提示",
      //     message: "确定管控反馈？",
      //     buttonLabels: ["取消", "确定"],
      //   }).then(async (res) => {
      //     if (res.buttonIndex == 1) {
      //       const data = await saveFeedBack({
      //         content: that.feedback,
      //         missionId: query.id,
      //       });
      //       if (data.success) {
      //         dd.toast({
      //           icon: "success",
      //           text: "操作成功", //提示信息
      //         })
      //           .then((res) => {
      //             that.$router.go(-1);
      //           })
      //           .catch((err) => {});
      //       }
      //     }
      //   });
      // }
    },
    // 反馈历史
    feedbackHistory() {
      const that = this;
      let query = that.$route.query;
      that.$router.push({
        path: "/zhezheng/controlTask/feedbackHistory",
        query: { id: query.id },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.task_warp {
  padding-bottom: 9vh;
  .header_icon {
    padding: 1vh 5vw;
    background: #f3f3f3;
    > span {
      border-left: 0.133333rem solid #01a6ff;
      display: inline-block;
      padding-left: 2vw;
      font-weight: 700;
    }
  }
  .cluesMsg,
  .analyseClass,
  .feedbackClass {
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
        .relativeC {
          position: relative;
          .iconfont {
            position: absolute;
            right: 2vw;
            font-size: 40px;
            top: 0;
          }
        }
        .item_tags {
          display: inline-block;
          background: #fff;
          height: 6vh;
          padding: 1vh;
          margin-top: 2vh;
          span {
            flex: 1;
            color: #fff;
            background: #409eff;
            border-radius: 8px;
            padding: 1vh;
          }
        }
        .item_person {
          display: inline-block;
          background: #fff;
          height: 6vh;
          // width: 25vw;
          padding: 1vh;
          span {
            flex: 1;
            color: #fff;
            background: #ee6363;
            border-radius: 8px;
            padding: 1vh 5vw;
          }
        }
      }
      .listClass {
        li {
          padding: 1vh 0;
          border-bottom: solid 1px #d6d6d6;

          &.loadMoreClass {
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
        .listClass_li {
          display: flex;
          justify-content: space-between;
          .li_img {
            width: 25%;
          }
          .li_content {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .li_content_content {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
              margin-top: 2vh;
              line-height: 4vh;
            }
            .li_content_time {
              color: #737373;
              margin: 2vh 0 1vw 0;
            }
            .li_content_department {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #737373;
              padding-bottom: 2vh;
            }
          }
        }
      }
      .listClass_ul {
        li {
          padding: 1vh 0;
          border-bottom: solid 1px #d6d6d6;

          &.loadMoreClass {
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
        .listClass_li {
          display: flex;
          justify-content: space-between;
          .li_img {
            width: 25%;
          }
          .li_content {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .li_content_applyTime {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
              padding-top: 2vh;
              line-height: 4vh;
              color: #9da0a2;
              span {
                padding-left: 5vw;
              }
            }
            .li_content_auditTime {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #9da0a2;
              padding-top: 3vh;
              span {
                padding-left: 5vw;
              }
            }
            .li_content_result {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #9da0a2;
              padding-top: 3vh;
              span {
                padding-left: 5vw;
              }
            }
            .li_content_description {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding: 3vh 0;
              color: #9da0a2;
              span {
                padding-left: 5vw;
              }
            }
          }
        }
      }
    }
    .tabClass {
      box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
      background: #fff;
      width: 80vw;
    }
    .riskLevel {
      margin: 4vh;
      background: #fff;
      height: 6vh;
      padding: 1vh;
      span {
        flex: 1;
        color: #fff;
        background: #eea163;
        border-radius: 8px;
        padding: 1vh 5vw;
      }
      .active {
        flex: 1;
        color: #fff;
        background: #409eff;
        border-radius: 8px;
        padding: 1vh;
      }
    }
  }
  .feedbackClass {
    .form {
      .item {
        border-bottom: 0px;
        textarea {
          margin: 2vh 0;
          background: #f7f7f7;
        }
        .feedbackHistory {
          margin-left: 72vw;
          border-bottom: solid 1px #01a6ff;
          color: #01a6ff;
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
    .btn_span {
      background-color: #eeeeee;
      color: #b3b5b7;
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
