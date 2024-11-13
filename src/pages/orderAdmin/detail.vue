<template>
  <div class="event_warp">
    <!-- 详情 -->
    <div class="detailMsg">
      <div class="header_icon"><span>指令内容</span></div>
        <ul class="ul">
          <li class="li">
            <span>初始发送人</span>
            <div>
              {{ detail.sendName }}
            </div>
          </li>
          <li>
            <span>发送时间</span>
            <div>{{ detail.sendTime }}</div>
          </li>
          <li class="ea">
          <span>指令内容</span>
          <div class="ea_d">
            {{ detail.instructionContent }}
          </div>
        </li>
      </ul>
    </div>
    <div class="detailMsg">
      <div class="header_icon"><span>反馈情况</span></div>
        <ul class="ul" v-for="(item, index) in detail.feedbackList" :key="index">
          <li class="li">
            <span>转发人</span>
            <div>
              {{ item.feedbackUserName }}
            </div>
          </li>
          <li>
            <span>发送时间</span>
            <div>{{ item.createTime }}</div>
          </li>
          <li class="ea">
            <span>指令内容</span>
            <div class="ea_d">
              {{ detail.description }}
            </div>
          </li>
          <li>
            <span>状态</span>
            <div>{{ item.feedbackStatusName }}</div>
          </li>
        </ul>
    </div>
    <div class="btn" >
      <span @click="submitFn(1)">取消</span>
      <!-- 有反馈id 并且反馈状态为未反馈 -->
      <span v-if="!detail.feedbackId && detail.feedbackStatus ==0" @click="submitFn(2)">反馈</span>
    </div>
  </div>
</template>

<script>
import {
  getInstructionDetail
} from '@/api/a'
export default {
  name: 'orderAdminDetail',
  data () {
    return {
      id: null,
      detail: {},
      edit: true,
      type: '1',
      formData: {
        status: '1',
        remark: null
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
      this.formData.status = val
      this.formData.remark = null
      if (val === '2') {
        this.type = '1'
      }
    },
    typeChange (val) {
      this.type = val
    },
    submitFn (type) {
      if (type === 1) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          path: '/orderAdmin/feedBack',
          query: {
            id: this.detail.feedbackId
          }
        })
      }
    },
    async getDetail () {
      const res = await getInstructionDetail({
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
}
</style>
