<template>
  <div class="reportedAdd_warp">
    <div class="form unclick">
      <div class="item">
        <p :class="formData.departmentName?'active':''">报告单位</p>
        <input type="text" readonly v-model.trim="formData.departmentName" placeholder="--" />
      </div>
      <div class="item">
        <p :class="1?'active':''">有无异常</p>
        <div>
          <input readonly type="text" :value="formData.isAbnormal?'有':'无'" placeholder />
        </div>
      </div>
      <div class="item">
        <p class="active">报告人</p>
        <div>
          <input readonly type="text" v-model="formData.userName" placeholder="--" />
        </div>
      </div>
      <div class="item">
        <p :class="formData.telephone?'active':''">联系电话</p>
        <div>
          <input type="text" readonly v-model="formData.telephone" placeholder="--" />
        </div>
      </div>
      <div class="item">
        <p :class="formData.reportDate?'active':''">上报时间</p>
        <div>
          <input type="text" readonly v-model="formData.reportDate" placeholder="--" />
        </div>
      </div>
      <div class="item reportContent">
        <p class="active">报告内容</p>
        <div>
          <article>{{formData.reportContent}}</article>
          <!-- <textarea readonly v-model.trim="formData.reportContent" placeholder=""></textarea> -->
          <!-- <input type="text"> -->
        </div>
      </div>
    </div>
    <div class="endHolder"></div>
  </div>
</template>
<script>
import {
  getAlertSettingToday,
  getReportedForUser,
  addDaySituation
} from "../../api/a";
export default {
  name: "reportedAdd",
  data() {
    return {
      id: this.$route.query.id,
      edit: true,
      formData: {
        departmentName: "",
        isAbnormal: 0,
        userName: "",
        telephone: "",
        reportDate: "",
        reportContent: ""
      },
      alertTime: "",
      depart: [],
      reportedForUser: []
    };
  },
  async created() {
    dd.disablePullToRefresh()
      .then(res => {
        console.log(res);
      })
      .catch(err => {});
    this.formData = JSON.parse(localStorage.getItem("zeroDetail"));
    // this.formData.reportContent = 'd按时打算d按时打算d按时打算d按时打算d按时打按时打算d按时打算d按时打算d按时打算d按时打算d按时打按时打算d按时打算d按时打算d按时打算d按时打算d按时打按时打算d按时打算d按时打算d按时打算d按时打算d按时打按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算d按时打算'
  },
  methods: {
    alert(v) {
      dd.device.notification.alert({
        message: v,
        title: "提示",
        buttonName: "确定"
      });
    }
  }
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
      &.reportContent {
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
        > div {
          // border: solid 1PX red;
          article {
            width: 100%;
            min-height: 200px;
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
    }
  }
  .tip {
    padding: 20px 32px;
    display: flex;
    i {
      font-size: 18px;
    }
    span {
      font-size: 18px;
      flex: 1;
      color: #555;
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
