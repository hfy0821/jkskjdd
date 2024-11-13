<template>
  <div class="event_warp">
    <!-- 报送信息 -->
    <div class="analyseClass">
      <div class="header_icon"><span>反馈情况</span></div>
      <div class="form" :class="edit ? '' : 'unclick'">
        <div class="item">
          <p :class="formData.remark ? 'active' : ''">
            反馈说明
            <span class="require">*</span>
          </p>
          <textarea
            class="eh_line"
            v-model="formData.remark"
            cols="30"
            rows="5"
            placeholder="在此输入指令处置后的反馈说明"
          ></textarea>
        </div>
        <div class="item">
          <p :class="formData.aaa?'active':''">附件上传</p>
          <ul class="file">
            <li v-for="(v, i) in files" :key="i">
              <span>{{v.fileName}}</span>
              <i @click="delFile(i)" class="iconfont icon-cha2"></i>
            </li>
          </ul>
          <button>
            上传
            <input @change="fileChange" multiple type="file" name id />
          </button>
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
  getInstructionDetail,
  feedbackInstruction,
  newUpload
} from '@/api/a'
import { Dialog } from 'vant'
export default {
  name: 'zeroReportDetail',
  data () {
    return {
      id: null,
      detail: {},
      edit: true,
      formData: {
        remark: null,
        attachFiles: []
      },
      files: []
    }
  },
  async created () {
    this.id = this.$route.query.feedbackId
    window.scrollTo(0, 0)
    dd.disablePullToRefresh()
    this.getDetail()
  },
  methods: {
    radioChange (val) {
      this.formData.status = val
      this.formData.remark = null
      if (val === '2') {
        this.type = '1'
      }
    },
    submitFn (type) {
      if (type === 1) {
        this.$router.go(-1)
        return
      }
      if (!this.formData.remark) {
        this.$toast('请输入反馈说明')
        return
      }
      this.formData.attachFiles = this.files.map(file => {
        return file.fileId
      })
      // console.log('attach', this.formData);
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确定提交？',
        className: 'confirm-dialog',
        getContainer: () => document.querySelector('.event_warp')
      }).then(async () => {
        const data = await feedbackInstruction({ ...this.formData, id: this.id })
        if (data.success) {
          dd.alert({
            message: data.message ? data.message : '操作成功',
            title: '提示',
            button: '收到'
          })
            .then((res) => {
              this.$router.go(-1)
            })
        }
      }).catch(() => {
        // on cancel
      })
      return
      dd.confirm({
        title: '温馨提示',
        message: '是否确定提交？',
        buttonLabels: ['取消', '确定']
      }).then(async (res) => {
        if (res.buttonIndex === 1) {
          const data = await feedbackInstruction(this.formData)
          if (data.success) {
            dd.toast({
              icon: 'success',
              text: '操作成功' // 提示信息
            }).then((res) => {
              this.$router.go(-1)
            })
          }
        }
      })
    },
    async getDetail () {
      const res = await getInstructionDetail({
        id: this.id
      })
      this.detail = res.data
    },
     async fileChange (e) {
      let sendData = new FormData()
      const files = [...e.target.files]
      console.log(files)
      if (files && files.length) {
        // dd.device.notification.showPreloader({
        //   text: '文件上传中..',
        //   showIcon: true,
        //   onSuccess(result) {}
        // })
        files.forEach((v) => {
          sendData.append('files', v)
        })
        sendData.append('rbacToken', localStorage.getItem('rbacToken'))
        // dd.device.notification.hidePreloader({
        //   onSuccess: function (result) {},
        //   onFail: function (err) {}
        // })
        const data = await newUpload(sendData)
        if (data.success) {
          data.data &&
            data.data.length &&
            data.data.forEach((v, i) => {
              var obj = {}
              obj.fileType = files[i].type
              obj.fileName = files[i].name
              obj.fileId = v
              this.files.push(obj)
            })
        }
      }
    },
    delFile (i) {
      this.files.splice(i, 1);
    }
  }
}
</script>

<style lang="less" scoped>
.event_warp {
  padding-bottom: 9vh;
  .header_icon {
    padding: 1vh 5vw;
    background: #f3f3f3;
    > span {
      border-left: 0.133333rem solid #01a6ff;
      display: inline-block;
      padding-left: 1vw;
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
      .item:last-child {
        border-bottom: none;
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
