<template>
  <div class="hiddenDetailMaxbox">
    <Tabs :List="tabList"
          @sendInfo="sendinfo($event)"
          v-if=" (Status != 1  || eventState != 1) || (disposeInfo!= null && disposeInfo.appealDetail != null && disposeInfo.appealDetail.length != 0) || (disposeInfo!= null && disposeInfo.revokeDetail != null)"
          style="margin-bottom:15px"></Tabs>
    <div v-show="tabIdx == 0 ">
      <div class="Item_content_Box">
        <div class="Item_title">
          隐患照片
        </div>
        <div>
          <imgUpload :filelist="hidedangerInfo['picIds']"
                     :disable="true"></imgUpload>
        </div>
      </div>
      <div class="Item_content_Box">
        <div class="Item_title">
          隐患描述
        </div>
        <div class="wordWrap">
          {{hidedangerInfo['description']}}
        </div>
      </div>

      <div class="Item_content_Box">
        <div class="Item_title">
          上报时间
        </div>
        <div>
          {{hidedangerInfo['reportTime']}}
        </div>
      </div>
    </div>
    <div v-show="tabIdx != 0">
      <disposaInfo :disposeInfo="disposeInfo !=null ? disposeInfo:{}"
                   :Status="Status"
                   :Postponebool="Postponebool"
                   :eventState="eventState"></disposaInfo>
    </div>

    <!-- 分隔底部 -->
    <div style="padding-bottom:10vh"></div>

    <div v-if="(groupInfo == 1 || groupInfo == 5 ) && Status == 5">

      <div class="butBox"
           v-if="!reloadChoice">
        <div class="butStyle">
          <div class="butStyle_color-gray"
               @click="$push('/SecretVisit/HiddenDangerAdded/HiddenDangerAdded',{type:5,HiddenDangerId:HiddenDangerId,reviewDetailid:reviewDetail})"
               style="width:90%">
            退回
          </div>
        </div>
        <div class="butStyle">
          <div class="butStyle_color-green"
               @click="Reexamination('pass')">
            通过
          </div>
        </div>
      </div>

      <div class="butBox"
           v-else>
        <div class="butStyle">
          <div class="butStyle_color-gray"
               @click="window.history.go(-1)">
            返回
          </div>
        </div>

        <div class="butStyle">
          <div class="butStyle_color-green"
               @click="reloadChoice = false">
            修改复检结果
          </div>
        </div>
      </div>
    </div>

    <div class="butBox"
         v-else>
      <div class="butStyle">
        <div class="butStyle_color-gray"
             @click="window.history.go(-1)">
          返回
        </div>
      </div>
      <div class="butStyle"
           v-if="Status == 4 && pointId !='' "
           @click="$push('/SecretVisit/HiddenDangerReported/HiddenDangerReported',{type:'detail',eventID:pointId,eventState:eventState})">
        <div class="butStyle_color-green">
          进入事件
        </div>
      </div>
      <div class="butStyle"
           v-if="(this.groupInfo == 2 || this.groupInfo == 3 || this.groupInfo == 4)  && eventState == 2 && Status == 2">
        <div class="butStyle_color-green"
             @click="$push('/SecretVisit/HiddenDangerAdded/HiddenDangerAdded',{type:2,HiddenDangerId:hidedangerInfo.id,reupload:1})">
          重新上传
        </div>
      </div>

      <div class="butStyle"
           v-if="(this.groupInfo == 2 || this.groupInfo == 3 || this.groupInfo == 4) && eventState == 2 && Status == 1 && isDelay == 0 && !hidedangerInfo.launchApprove"
           @click="$push('/SecretVisit/HiddenDangerAdded/HiddenDangerAdded',{type:4,HiddenDangerId:HiddenDangerId})">
        <div class="butStyle_color-gray">
          申请延期
        </div>
      </div>
      <!-- 申请延期还差一个状态值 -->

      <div class="butStyle"
           v-if="(this.groupInfo == 2 || this.groupInfo == 3 || this.groupInfo == 4)  && eventState == 2 && Status == 1 && !hidedangerInfo.launchApprove"
           @click="$push('/SecretVisit/HiddenDangerAdded/HiddenDangerAdded',{type:3,HiddenDangerId:HiddenDangerId})">
        <div class="butStyle_color-red">
          申诉
        </div>
      </div>

      <div class="butStyle"
           @click="$push('/SecretVisit/HiddenDangerAdded/HiddenDangerAdded',{type:2,HiddenDangerId:hidedangerInfo.id})"
           v-if="(this.groupInfo == 2 || this.groupInfo == 3 || this.groupInfo == 4)  && eventState == 2 && Status == 1">
        <div class="butStyle_color-green">
          上传结果
        </div>
      </div>

      <div class="butStyle"
           @click="$push('/SecretVisit/HiddenDangerAdded/HiddenDangerAdded',{type:6,HiddenDangerId:HiddenDangerId})"
           v-if="this.groupInfo == 5 &&  eventState == 5">
        <div class="butStyle_color-red">
          抽查驳回
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgUpload from "../../../components/imgUpload"
import Tabs from "../../../components/newTab"
import disposaInfo from "../components/DisposalInformation"
import { Dialog, Notify } from 'vant';
export default {
  components: {
    imgUpload,
    Tabs,
    disposaInfo
  },
  data () {
    return {
      value1: '',
      tabList: [
        {
          name: '隐患信息',
          key: ''
        },
        {
          name: '处置信息',
          key: ''
        }
      ],
      tabIdx: 0,
      window: window,
      eventState: '0', // 点位状态
      Status: '0', // 隐患状态 1待处置 2已处置 3审核中 4申诉中 5待复查 6办结 7撤销 
      groupInfo: null,//组别信息 包含等级
      HiddenDangerId: '',
      reviewDetail: '',//复查id
      Postponebool: false,//是否是延期信息
      disposeInfo: null,
      pointId: '',
      isDelay: 0,//是否延期中 1是 0 否
      isend: 0,//剩余隐患数量
      reloadChoice: false,
      hidedangerInfo: {
        picIds: [],
        description: '隐患描述',
        reportTime: '上报时间'
      }
    }
  },
  mounted () {
    if (this.$route.query.Status) {
      this.Status = this.$route.query.Status
      this.HiddenDangerId = this.$route.query.HiddenDangerId
      this.eventState = this.$route.query.eventState
      // if (this.Status != 1 || this.eventState != 1) {
      // }
      this.getHiddenTroubleHandleDetail();
      this.isend = this.$route.query.hidedangSize || '0'
      this.getHiddenTroubleDetail();
    }
    if (this.$route.query.pointId) {
      this.pointId = this.$route.query.pointId
    }
    if (this.$route.query.Postponebool) {
      this.Postponebool = this.$route.query.Postponebool == 2 ? true : false
    }
    this.groupInfo = this.$store.state.groupType;
  },
  methods: {
    removeHidden () {
      const _that = this;
      Dialog.confirm({
        title: '确认删除',
        width: '250px',
      })
        .then((res) => {

        })
    },
    sendinfo (e) {
      this.tabIdx = e.Index
    },
    // 获取隐患信息
    getHiddenTroubleDetail () {
      this.$httpapi.getHiddenTroubleDetail({
        id: this.HiddenDangerId
      }).then((res) => {
        if (res.success == 1) {
          this.hidedangerInfo = res.data
          this.isDelay = res.data.isDelay
          let pics = this.hidedangerInfo.picIds
          this.hidedangerInfo.picIds = this.$utils.relimgUrl(pics, true)
          if (this.eventState != res.data.eventState) {
            this.reloadChoice = true
          }
        } else {
          Notify({ type: 'danger', message: res.message });
        }
      })
    },
    // 获取隐患处置信息
    getHiddenTroubleHandleDetail () {
      this.$httpapi.getHiddenTroubleHandleDetail({
        id: this.HiddenDangerId
      }).then((res) => {

        if (res.success == 1) {
          this.disposeInfo = { ...res.data }

          if (this.disposeInfo['handleDetail'] != null) {
            this.disposeInfo['handleDetail']['handlePicIds'] = this.$utils.relimgUrl(res.data['handleDetail']['handlePicIds'], true)
          }
          // this.countTIME();
          const len = res.data.reviewDetail.length;
          if (len != 0) {
            this.reviewDetail = res.data.reviewDetail[len - 1].id
          }
        } else {
          Notify({ type: 'danger', message: res.message });
        }
      })
    },
    // countTIME () {
    //   let time = this.disposeInfo.assignDetail.endTime
    //   setInterval(() => {
    //     let timeshow = this.$utils.Countdown(time)
    //   }, 1000);
    // },
    // 复查
    Reexamination (option) {
      this.$httpapi.recheckApproveHiddenTrouble({
        businessKey: this.reviewDetail,
        operation: option
      }).then((res) => {
        if (res.success == 1) {
          this.getHiddenTroubleDetail();
          this.getHiddenTroubleHandleDetail();
        }
      })
    }

  },
}
</script>

<style lang="less" scoped>
.hiddenDetailMaxbox {
  padding: 15px;
  .Item_content_Box {
    .Item_title {
      margin: 35px 0px;
      font-weight: bold;
      span {
        color: red;
        margin-right: 9px;
      }
    }
  }

  .textBox {
    height: 400px;
    border: 1px solid #bbbbbb;
    border-radius: 5px;
  }

  .butBox {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    padding: 15px;
    justify-content: space-between;
    background-color: white;
    .butStyle {
      flex: 1;
      padding: 0px 9px;
    }
  }
}
</style>