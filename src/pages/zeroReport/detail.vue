<template>
  <div class="event_warp">
    <!-- 详情 -->
    <div class="detailMsg">
      <div class="header_icon"><span>零报基本信息</span></div>
        <ul class="ul">
          <li class="li">
            <span>零报任务</span>
            <div>
              {{ detail?.reportName }}
            </div>
          </li>
          <li>
            <span>截止日期</span>
            <div>{{ detail?.reportDeadline }}</div>
          </li>
          <li>
            <span>任务截止</span>
            <div>{{ detail?.startEndDate }}</div>
          </li>
          <li class="ea">
          <span>零报描述</span>
          <div class="ea_d">
            {{ detail?.remark }}
          </div>
        </li>
      </ul>
    </div>
    <!-- 报送信息 -->
    <div class="analyseClass">
      <div class="header_icon"><span>报送信息</span></div>
      <div class="form" :class="edit ? '' : 'unclick'">
        <div class="item" style="display: flex;">
          <p :class="formData.joinNum ? 'active' : ''">
            零报情况
            <span class="require">*</span>
          </p>
          <van-radio-group v-model="formData.normalAbnormal" direction="horizontal" style="margin-left: 20px;" @change="radioChange">
            <van-radio :name="0">无异常</van-radio>
            <van-radio :name="1">异常</van-radio>
          </van-radio-group>
        </div>
        <div v-show="formData.normalAbnormal === 1">
          <div class="item">
            <p :class="formData.remark ? 'active' : ''">
              异常描述
              <span class="require">*</span>
            </p>
            <textarea
              class="eh_line"
              v-model="formData.remark"
              cols="30"
              rows="5"
              placeholder="在此输入异常描述"
            ></textarea>
          </div>
          <div class="item">
            <van-radio-group v-model="type" @change="typeChange" class="radio">
              <van-radio :name="1">直接保存</van-radio>
              <van-radio :name="2">同步转应急事件</van-radio>
              <van-radio :name="3">同步转重大风险隐患库</van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="btn" >
      <span @click="submitFn(1)">取消</span>
      <span @click="submitFn(2)">保存</span>
    </div>
  </div>
</template>

<script>
import {
  getReportDetailInfo,
  doReport
} from '../../api/a'
import { Dialog } from 'vant'
export default {
  name: 'zeroReportDetail',
  data () {
    return {
      id: null,
      detail: {},
      edit: true,
      type: '1',
      formData: {

      }
    }
  },
  async created () {
    this.id = this.$route.query.id
    window.scrollTo(0, 0)
    dd.disablePullToRefresh()
    this.getDetail()
  },
  methods: {
    radioChange (val) {
      this.formData.normalAbnormal = val
      if (val === '1') {
        this.type = '1'
      }
    },
    typeChange (val) {
      this.type = val
    },
    submitFn (type) {
      if (type === 1) {
        this.$router.go(-1)
        return
      }
      if (!this.formData.normalAbnormal) {
        this.$toast('请选择零报情况')
        return
      }
      if (this.formData.normalAbnormal == 1 && !this.formData.remark) {
        this.$toast('请输入异常描述')
        return
      }
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确定提交？',
        className: 'confirm-dialog',
        getContainer: () => document.querySelector('.event_warp')
      }).then(async () => {
        const data = await doReport({...this.formData,reportDetailId:this.$route.query.reportDetailId})
        console.log('data', data)
      }).catch(() => {
        // on cancel
      })
      // dd.confirm({
      //   title: '温馨提示',
      //   message: '是否确定提交？',
      //   buttonLabels: ['取消', '确定']
      // }).then(async (res) => {
      //   if (res.buttonIndex === 1) {
      //     const data = await emergencyOperate(this.formData)
      //     if (data.success) {
      //       dd.toast({
      //         icon: 'success',
      //         text: '操作成功' // 提示信息
      //       }).then((res) => {
      //         this.$router.go(-1)
      //       })
      //     }
      //   }
      // })
    },
    async getDetail () {
      const data = await getReportDetailInfo({
        id: this.id
      })
      console.log('data:', data);
      this.detail = data.data
      console.log(data.data.remark)
      this.formData = {
        normalAbnormal:data.data.normalAbnormal,
        remark:data.data.remark,
      }
    }
  }
}
</script>

<style lang="less" scoped>
.event_warp {
  // padding-bottom: 9vh;
  .header_icon {
    padding: 1vh 5vw;
    background: #f3f3f3;
    > span {
      border-left: 0.133333rem solid #01a6ff;
      display: inline-block;
      padding-left: 1vw;
    }
  }
  .detailMsg {
    .ul {
      padding: 0 32px;
      .li,
      li {
        display: flex;
        font-size: 28px;
        line-height: 40px;
        padding: 20px 0;
        > span:first-child {
          // width: 200px;
          opacity: 0.7;
          width: 30%;
          text-align: text;
          padding-right: 5%;
        }
        > div {
          flex: 1;
          // color: #5f61f8;
          word-break: break-all;
        }
        .li_fileList {
          > img {
            width: 30%;
            height: 20vw;
            margin: 1%;
          }
        }
      }
      // .ea {
      //   position: relative;
      //   .ea_d {
      //     padding-right: 40px;
      //   }
      //   .ea_dh {
      //     position: absolute;
      //     right: -10px;
      //     background: #3893fe;
      //     color: #fff;
      //     border-radius: 5px;
      //     text-align: center;
      //     padding: 1px 5px;
      //   }
      // }
    }
  }
  .analyseClass{
    .form {
      padding: 0 32px;
      &.unclick {
        * {
          pointer-events: none;
        }
      }
      &::last-child {
        border-bottom: none;
      }
      .item {
        border-bottom: solid 1px #e4e4e4;
        padding: 8px 0 24px;
        .eh_line {
          width: 100%;
        }
        .require{
          color: red;
        }
        .radio{
          margin: 20px 0;
          .van-radio{
            height: 40px;
          }
        }
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
  /deep/.van-dialog{
    width: 80% !important;
  }
  /deep/.van-dialog__message {
    font-size: 26px !important;
  }
}
</style>
