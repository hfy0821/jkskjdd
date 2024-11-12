<template>
  <div class="event_warp">
    <div class="analyseClass">
      <div v-for="(item, index) in list" :key="index">
        <div class="header_icon"><span>参与部门{{index + 1}}</span></div>
        <div class="form" :class="edit ? '' : 'unclick'">
          <div class="item">
            <p :class="formData.remark ? 'active' : ''">
              配合程度
            </p>
            <van-rate class="rate" :size="20" color="#ffd21e" void-icon="star"  void-color="#eee" v-model="value" :readonly="type== '2' ? true : false" />
          </div>
          <div class="item">
            <p :class="formData.remark ? 'active' : ''">
              沟通顺畅度
            </p>
            <van-rate class="rate" :size="20" color="#ffd21e" void-icon="star"  void-color="#eee" v-model="value" :readonly="type== '2' ? true : false" />
          </div>
          <div class="item">
            <p :class="formData.remark ? 'active' : ''">
              总体评价
            </p>
            <van-rate class="rate" :size="20" color="#ffd21e" void-icon="star"  void-color="#eee" v-model="value" :readonly="type== '2' ? true : false" />
          </div>
        </div>
      </div>
    </div>
    <div class="btn" >
      <template v-if="type === '1'">
        <span @click="submitFn(1)">取消</span>
        <span @click="submitFn(2)">保存</span>
      </template>
      <span v-else>关闭</span>
    </div>
  </div>
</template>

<script>
import {
  getDetailById,
  emergencyOperate
} from '../../api/a'
export default {
  name: 'zeroReportDetail',
  data () {
    return {
      type: null,
      id: null,
      value: null,
      list: [],
      detail: {},
      edit: true,
      formData: {
        status: '1',
        remark: null
      }
    }
  },
  async created () {
    const list = [
      {},
      {},
      {}
    ]
    this.list = list
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    window.scrollTo(0, 0)
    dd.disablePullToRefresh()
    if (this.type === '2') {
      this.getDetail()
    }
  },
  methods: {
    submitFn (type) {
      if (type === 1) {
        this.$router.go(-1)
        return
      }
      if (!this.formData.status) {
        this.$toast('请选择零报情况')
        return
      }
      if (this.formData.status == 2 && !this.formData.remark) {
        this.$toast('请输入异常描述')
        return
      }
      dd.confirm({
        title: '温馨提示',
        message: '是否确定提交？',
        buttonLabels: ['取消', '确定']
      }).then(async (res) => {
        if (res.buttonIndex === 1) {
          const data = await emergencyOperate(this.formData)
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
      const res = await getDetailById({
        id: this.id
      })
      this.detail = res.data
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
        display: flex;
        align-items: center;
        .rate{
          margin-left: 20px;
        }
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
          width: 160px;
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
}
</style>
