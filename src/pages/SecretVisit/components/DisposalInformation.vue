<template>
  <div>
    <div class="Item_content_Box"
         v-if="disposeInfo.assignDetail != null">
      <div class="Item_title"
           style="display:flex;justify-content: space-between;align-items: center;">
        指派信息
      </div>

      <div class="Item_form">

        <div class="form_item"
             v-for="(item,idx) in AssignmentInfoKey"
             :key="idx">
          <div class="itemlable">{{item.name}}</div>
          <div>{{Object.keys(disposeInfo[item.key]).length  != 0 ? disposeInfo[item.key][item.propKey]:''}}</div>
        </div>
        <div class="form_item"
             v-if="timeShow != ''">
          <div class="itemlable">剩余时间</div>
          <div>{{timeShow}}</div>
        </div>
      </div>
    </div>

    <div v-if="disposeInfo.handleDetail == null"
         style="background-color:#C7E2FE;line-height:90px;color:white;text-align: center;border-radius: 3px;">
      尚未上传处置信息
    </div>

    <!-- 指派信息 对象 -->
    <div class="Item_content_Box"
         v-else>
      <div class="Item_title"
           style="display:flex;justify-content: space-between;align-items: center;">
        整改信息
      </div>
      <div class="Item_form">
        <div class="form_item"
             v-for="(item,idx) in RectificationAndReform"
             :key="idx">
          <div class="itemlable">{{item.name}}</div>
          <div class="itemContent">{{Object.keys(disposeInfo).length  != 0 ? disposeInfo[item.key][item.propKey]:''}}</div>
        </div>
        <div class="form_item">
          <div class="itemlable"
               style="padding-top:9px;">整改图片</div>
          <div class="itemContent">
            <imgUpload :disable="true"
                       :filelist="disposeInfo['handleDetail']['handlePicIds'] != null ? disposeInfo['handleDetail']['handlePicIds']:'0'"></imgUpload>
          </div>
        </div>
      </div>
    </div>

    <!-- 申述信息 数组-->
    <div class="Item_content_Box"
         v-if="disposeInfo['appealDetail'] != null && disposeInfo['appealDetail'].length != 0">
      <div class="Item_title"
           style="display:flex;justify-content: space-between;align-items: center;">
        申述信息
      </div>

      <div class="Item_form SeparationBox"
           v-for="(item1,idx1) in disposeInfo['appealDetail']"
           :key="idx1">
        <div class="form_item"
             v-for="(item,idx) in Representations"
             :key="idx">
          <div class="itemlable">{{item.name}}</div>
          <div class="itemContent">{{Object.keys(disposeInfo).length  != 0 ? item1[item.propKey]:''}}</div>
        </div>
        <div class="form_item">
          <div class="itemlable">申诉状态</div>
          <div :style="{color: item1['approveState'] == 3? '#db5050': item1['approveState'] == 2?'#5dc687':'#fdce1c'}">{{item1['approveStateName'] }}<span style="margin-left:10px">{{item1['backReason'] == '重新指派'?'重新指派':''}}</span></div>
        </div>
        <div class="form_item"
             v-if="item1['approveState'] == 3">
          <div class="itemlable">退回理由</div>
          <div class="itemContent">{{item1['backReason']}}</div>
        </div>
      </div>
    </div>

    <!-- 延期信息 数组-->
    <div class="Item_content_Box"
         v-if="Postponebool || (disposeInfo['delayDetail'] != null  && disposeInfo['delayDetail'].length != 0)">
      <div class="Item_title"
           style="display:flex;justify-content: space-between;align-items: center;">
        延期信息
      </div>

      <div class="Item_form SeparationBox"
           v-for="(item1,idx1) in disposeInfo['delayDetail']"
           :key="idx1">
        <div class="form_item"
             v-for="(item,idx) in PostponeInfoKey"
             :key="idx">
          <div class="itemlable">{{item.name}}</div>
          <div class="itemContent">{{Object.keys(disposeInfo).length  != 0 ? item1[item.propKey]:''}}{{item.propKey == 'delayDays'? ' 天': ''}}</div>
        </div>
        <div class="form_item">
          <div class="itemlable">申请状态</div>
          <div :style="{color: item1['approveState'] == 3? '#db5050': item1['approveState'] == 2?'#5dc687':'#fdce1c'}">{{item1['approveStateName']}}</div>
        </div>
        <div class="form_item"
             v-if="item1['approveState'] == 3">
          <div class="itemlable">退回理由</div>
          <div class="itemContent">{{item1['backReason']}}</div>
        </div>
      </div>
    </div>

    <!-- 市级审核信息 数组 -->
    <div class="Item_content_Box"
         v-if=" disposeInfo.checkDetail != null && disposeInfo.checkDetail.length > 0">
      <div class="Item_title"
           style="display:flex;justify-content: space-between;align-items: center;">
        市级审核信息
      </div>
      <div class="Item_form SeparationBox"
           v-for="(item,index) in disposeInfo.checkDetail"
           :key="index">
        <div class="form_item ">
          <div class="itemlable">审核状态</div>
          <div :style="{color: item['approveState'] == 3? '#db5050': item['approveState'] == 2?'#5dc687':'#fdce1c'}">{{Object.keys(disposeInfo) != 0  ? item.approveStateName:''}}</div>
        </div>
        <!-- 1 审核中 2 通过 3 没通过 -->
        <div v-if="item.approveState != 1">
          <div class="form_item"
               v-if="item.approveState == 3">
            <div class="itemlable">退回原因</div>
            <div class="itemContent">{{Object.keys(disposeInfo).length != 0  ? item.backReason:''}}</div>
          </div>

          <div class="form_item">
            <div class="itemlable">审核时间</div>
            <div class="itemContent">{{Object.keys(disposeInfo).length != 0  ?  item.approveTime:''}}</div>
          </div>
        </div>
      </div>

    </div>

    <!-- 复检信息 数组-->
    <div class="Item_content_Box"
         v-if="eventState == 4 || disposeInfo.reviewDetail != null && disposeInfo.reviewDetail['length'] > 0  ">
      <!-- -->
      <div class="Item_title"
           style="display:flex;justify-content: space-between;align-items: center;">
        复检信息
      </div>
      <div class="Item_form SeparationBox"
           v-for="(item,idx) in disposeInfo.reviewDetail"
           :key="idx">
        <div class="form_item">
          <div class="itemlable">复检结果</div>
          <div :style="{color: item['reviewState'] == 3? '#db5050': item['reviewState'] == 2?'#5dc687':'#fdce1c'}">{{Object.keys(disposeInfo) != 0  ? item.reviewStateName:''}}</div>
        </div>
        <div class="form_item"
             v-if="item.approveState == 3">
          <div class="itemlable">退回信息</div>
          <div class="itemContent">{{Object.keys(disposeInfo) != 0  ? item.reviewBackReason:''}}</div>
        </div>
        <div class="form_item"
             v-if="item.reviewState != 1">
          <div class="itemlable">审核时间</div>
          <div>{{Object.keys(disposeInfo) != 0  ? item.reviewTime:''}}</div>
        </div>
      </div>
    </div>
    <!-- 抽查信息 数组 -->
    <div class="Item_content_Box"
         v-if="disposeInfo.spotDetail != null && disposeInfo.spotDetail.length != 0">
      <div class="Item_title"
           style="display:flex;justify-content: space-between;align-items: center;">
        抽查信息
      </div>
      <div class="Item_form"
           v-for="(item,idx1) in disposeInfo.spotDetail"
           :key="idx1">
        <div class="form_item">
          <div class="itemlable">抽查结果</div>
          <div :style="{color: item.spotState != 3?'#5DC687':'red'}">{{Object.keys(disposeInfo) != 0  ? item.spotStateName:''}}</div>
        </div>
        <div class="form_item"
             v-if="item.spotState == 3">
          <div class="itemlable">退回理由</div>
          <div>{{Object.keys(disposeInfo) != 0  ? item.spotReason:''}}</div>
        </div>
        <div class="form_item">
          <div class="itemlable">抽查时间</div>
          <div>{{Object.keys(disposeInfo) != 0  ? item.spotTime:''}}</div>
        </div>
      </div>
    </div>
    <!-- 撤销信息 对象-->
    <div class="Item_content_Box"
         v-if="disposeInfo.revokeDetail != null && disposeInfo.revokeDetail != undefined">
      <!-- && (disposeInfo.appealDetail.length == 0 || disposeInfo.appealDetail[0].approveState != 2)  && Status == 7 -->
      <div class="Item_title"
           style="display:flex;justify-content: space-between;align-items: center;">
        撤销信息
      </div>

      <div class="Item_form">
        <div class="form_item"
             v-for="(item,idx) in RevocationInfoKey"
             :key="idx">
          <div class="itemlable">{{item.name}}</div>
          <div class="itemContent">{{Object.keys(disposeInfo).length  != 0 ? disposeInfo[item.key][item.propKey]:''}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import imgUpload from '../../../components/imgUpload'
export default {
  components: {
    imgUpload
  },
  props: {
    disposeInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    Status: {
      type: String,
      default: '0'
    },
    eventState: {
      type: String,
      default: '0'
    },
    // 是否延期
    Postponebool: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    disposeInfo (e) {
      if (e.assignDetail != null) {
        this.countTIME();
      }
    }
  },
  data () {
    return {
      // 指派单位
      AssignmentInfoKey: [
        {
          name: '牵头单位',
          key: "assignDetail",
          propKey: 'leadDepartmentName'
        },
        {
          name: '责任单位',
          key: "assignDetail",
          propKey: 'responsibleDepartmentName'
        },
        {
          name: '指派时间',
          key: "assignDetail",
          propKey: 'assignTime',
          type: 'time'
        },
      ],
      // 整改信息
      RectificationAndReform: [
        {
          name: '处置单位',
          key: 'handleDetail',
          propKey: 'handleDeparmentName'
        },
        {
          name: '处置时间',
          key: 'handleDetail',
          propKey: 'handleTime',
          type: 'time'
        },
        {
          name: '整改描述',
          key: 'handleDetail',
          propKey: 'handleDescription'
        },
      ],
      // 申述信息
      Representations: [
        {
          name: '申诉原因',
          key: 'appealDetail',
          propKey: 'appealReason'
        },
        {
          name: '申诉单位',
          key: 'appealDetail',
          propKey: 'createDepartmentName'
        },
        {
          name: '申诉时间',
          key: 'appealDetail',
          propKey: 'createTime',
          type: 'time'
        },
        // {
        //   name: '申诉状态',
        //   key: 'appealDetail',
        //   propKey: 'approveStateName'
        // }
      ],
      // 延期信息
      PostponeInfoKey: [
        {
          name: '延期天数',
          key: 'delayDetail',
          propKey: 'delayDays'
        },
        {
          name: '延期原因',
          key: 'delayDetail',
          propKey: 'appealReason'
        },
        {
          name: '申请时间',
          key: 'delayDetail',
          propKey: 'createTime',
          type: 'time'
        },
        {
          name: '申请单位',
          key: 'delayDetail',
          propKey: 'createDepartmentName'
        },
        // {
        //   name: '申请状态',
        //   key: 'delayDetail',
        //   propKey: 'approveStateName'
        // },
      ],
      // 撤销信息
      RevocationInfoKey: [
        {
          name: '撤销原因',
          key: 'revokeDetail',
          propKey: 'revokeReason'
        },
        {
          name: '撤销时间',
          key: 'revokeDetail',
          propKey: 'revokeTime',
          type: 'time'
        }
      ],
      // 抽查信息
      spotDetailInfoKey: [
        {
          name: '抽查结果',
          key: 'spotDetail',
          propKey: 'spotStateName'
        },
        {
          name: '抽查时间',
          key: 'spotDetail',
          propKey: 'spotTime',
        }
      ],
      timeShow: '',
      disposeIinfoImgurl: []
    }
  },
  methods: {
    countTIME () {
      // 撤销的信息不用倒计时 上传了信息不用
      if (this.disposeInfo.handleDetail != null || this.Status == 7) {
        return
      }
      // 当申请审核通过后，无需再开启倒计时
      if (this.disposeInfo.appealDetail != null && this.disposeInfo.appealDetail.length != 0 && this.disposeInfo.appealDetail[0].approveState == 2 && this.disposeInfo.appealDetail[0]['backReason'] != '重新指派') {
        return
      }
      let time = this.disposeInfo.assignDetail.endTime
      let tieminter = setInterval(() => {
        let timeshow = this.$utils.Countdown(time, this)
        if (timeshow) {
          this.timeShow = timeshow
        } else {
          clearInterval(tieminter)
          this.timeShow = "00:00:00 00:00:00"
        }
      }, 1000);
    },
  },
}
</script>

<style lang='less' scoped>
.Item_content_Box {
  word-break: break-all;
  word-wrap: break-word;
  .Item_title {
    margin: 35px 0px;
    font-weight: bold;
    span {
      color: red;
      margin-right: 9px;
    }
  }
  .Item_form {
    padding-left: 9px;
    .form_item {
      display: flex;
      width: 100%;
      margin-bottom: 15px;
      .itemlable {
        width: 20%;
        flex-basis: 20vw;
      }
      .itemContent {
        width: 80%;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
  }
  .SeparationBox {
    border-bottom: 4px dashed #ebebeb;
    margin-bottom: 10px;
  }
}
</style>