<template>
  <div class="event_warp">
    <div class="tabClass">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
    </div>
    <div>
      <!-- 问题清单 -->
      <QuestionInventory
        v-if="tabIndex == 1"
        :detailData="detailData"
        :emergencyDetail="emergencyDetail"
        :missionDetail="missionDetail"
        :eventHandleList="eventHandleList"
      />
      <!-- 任务清单 -->
      <TaskInventory v-if="tabIndex == 2" :missionDetail="missionDetail" />
      <!-- 责任清单 -->
      <DutyInventory v-if="tabIndex == 3" :dutyDetail="dutyDetail" />
      <!-- 包案处置 -->
      <BaHandle v-if="tabIndex == 4" :missionDetail="missionDetail" />
      <!-- 督办反馈 -->
      <DbFeedback v-if="tabIndex == 5" :missionDetail="eventProgressList" />
      <!-- 领导批示 -->
      <HandlePs
        v-if="tabIndex == 6"
        :baseInstructionVOList="baseInstructionVOList"
      />
    </div>
    <div class="btn">
      <span
        v-if="
          missionDetail.monitorPermission == 2 ||
          missionDetail.monitorPermission == 3
        "
        @click="feedback(2)"
      >
        提交反馈
      </span>
      <span v-if="missionDetail.monitorPermission == 2" @click="handFn('103')">
        办结申请
      </span>
      <span v-if="missionDetail.monitorPermission == 4" @click="feedback(1)">
        新增批示
      </span>
      <span v-if="missionDetail.monitorPermission == 5" @click="handFn('105')">
        同意
      </span>
      <span v-if="missionDetail.monitorPermission == 5" @click="feedback(3)">
        驳回
      </span>
      <span @click="review()">
        申请化解销号
      </span>
    </div>
    <Dialog :show="show" @onDialog="onDialog" :type="dialogType" />
  </div>
</template>
<script>
import Nav from "../components/tab.vue";
// 问题清单
import QuestionInventory from "../components/questionInventory.vue";
// 任务清单
import TaskInventory from "../components/taskInventory.vue";
// 责任清单
import DutyInventory from "../components/dutyInventory.vue";
// 包案处置
import BaHandle from "../components/baHandle.vue";
import DbFeedback from "../components/dbFeedback.vue";
// 领导批示
import HandlePs from "../components/handlePs.vue";
import Dialog from "../components/dialog.vue";
import { dealOpreate, _http } from "@/api/a";

export default {
  components: {
    Nav,
    QuestionInventory,
    TaskInventory,
    DutyInventory,
    BaHandle,
    DbFeedback,
    HandlePs,
    Dialog,
  },
  data() {
    return {
      dialogType: 2,
      tabIndex: 1,
      tabs: [
        { name: "事件信息" },
        { name: "任务清单" },
        { name: "责任清单" },
        { name: "包案处置" },
        { name: "督办反馈" },
        { name: "领导批示" },
      ],
      type: 1,
      query: {},
      emergencyId: "",
      dutyDetail: {},
      baseInstructionVOList: [],
      show: false,
      detailData: {},
      emergencyDetail: {},
      missionDetail: {},
      eventHandleList: [],
      eventProgressList:[],
    };
  },
  async created() {
    const that = this;
    window.scrollTo(0, 0);
    that.query = that.$route.query;
    that.getDetail();
  },
  methods: {
    async onDialog(item) {
      const that = this;
      if (item.show == 1) {
        that.show = false;
        return false;
      }
      let data;
      if (that.dialogType == 1) {
        data = await _http(
          "socialGovernance/missionProcessInstructions/saveOrUpInstructions",
          {
            monitorId: that.query.monitorId,
            instructionsContent: item.data.dealContent,
            fileList: item.data.fileIdList,
          },
          "post"
        );
      } else {
        data = await dealOpreate({
          id: that.query.monitorId,
          dealContent: item.data.dealContent,
          stateCode: that.dialogType == 2 ? "102" : "104",
        });
      }

      if (data.success) {
        that.show = false;
        that.getDetail();
        dd.toast({
          icon: "success",
          text: "操作成功", //提示信息
        });
      }
    },
    async handFn(t) {
      const that = this;
      dd.confirm({
        title: "温馨提示",
        message: "确定提交？",
        buttonLabels: ["取消", "确定"],
      }).then(async (res) => {
        if (res.buttonIndex == 1) {
          const data = await dealOpreate({
            id: that.query.monitorId,
            dealContent: "",
            stateCode: t,
          });
          if (data.success) {
            dd.toast({
              icon: "success",
              text: "操作成功", //提示信息
            });
            that.getDetail();
          }
        }
      });
    },
    // 申请化解销号
    review () {
      dd.confirm({
        title: '申请化解销号',
        message: "提交办结审核后，将无法提交反馈。请确认已在反馈中上传销号单照片，否则会被退回。",
        buttonLabels: ["取消", "确定"],
      }).then(async (res) => {
        if (res.buttonIndex == 1) {
          const data = await dealOpreate({
            id: this.query.monitorId,
          });
          if (data.success) {
            dd.toast({
              icon: "success",
              text: "操作成功", //提示信息
            });
            that.getDetail();
          }
        }
      });
    },
    feedback(t) {
      this.show = true;
      this.dialogType = t;
      // this.$router.push({
      //   path: "/ARuiAn/SafetySupervision/feedBack",
      //   query: {
      //     type: this.tabIndex,
      //     missionId: this.missionId,
      //   },
      // });
    },

    // 获取详情
    async getDetail() {
      const that = this;
      let params = {
        // eventId: that.query.eventId,
        id: that.query.id,
      };
      const res = await _http(
        "emergency/securityEvent/getEventDetail",
        params,
        "get"
      );
      // const res = await getMonitorDetail(params);
      if (res.success) {
        that.detailData = res.data.eventInfo || {};
        that.emergencyDetail = res.data.emergencyDetail || {};
        that.missionDetail = res.data.eventAssignInfo || {};
        that.dutyDetail = res.data.eventAssignInfo || {};
        that.baseInstructionVOList = res.data.leaderCommentList || [];
        this.eventProgressList = res.data.eventProgressList
      }
    },
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      window.scrollTo(0, 0);
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
  padding-top: 120px;
  .tabClass {
    box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
    background: #fff;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 0.9;
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
