<template>
  <div>
    <div class="reportedAdd_warp">
      <div class="form" :class="edit ? '' : 'unclick'">
        <div class="item">
          <p :class="formData.dealContent ? 'active' : ''">处置反馈</p>
          <div>
            <textarea
              type="text"
              v-model.trim="formData.dealContent"
              placeholder="在此输入处置反馈"
              rows="10"
            />
          </div>
        </div>
      </div>
      <div class="btn">
        <span @click="handClick(1)">保存</span>
      </div>
    </div>
  </div>
</template>
<script>
import { dealOpreate } from "@/api/a";

export default {
  components: {},
  data() {
    return {
      missionId: this.$route.query.missionId,
      edit: true,
      formData: {
        dealContent: "",
      },
    };
  },
  computed: {
    streetList() {
      return this.$store.state.common.streetList;
    },
  },
  async created() {
    const that = this;
  },
  methods: {
    handClick(i) {
      const that = this;
      dd.confirm({
        title: "温馨提示",
        message: "确定提交？",
        buttonLabels: ["取消", "确定"],
      }).then(async (res) => {
        if (res.buttonIndex == 1) {
          const data = await dealOpreate({
            id: that.missionId,
            dealContent: that.formData.dealContent,
            stateCode: "102",
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
      });
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
  },
};
</script>
<style lang="less" scoped>
.reportedAdd_warp {
  padding-bottom: 9vh;
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
    // line-height: 50px;
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
            font-size: 30px;
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
  .btn {
    // border-top: solid 1px #e4e4e4;
    // background: #fff;
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
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      flex: 1;
      text-align: center;
      line-height: 5vh;
      color: #fff;
      border-radius: 8px;
      margin-right: 14px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
.reportSuccess {
  > h1 {
    font-size: 80px;
    padding: 10vh 0;
    text-align: center;
  }
  .btn {
    // width: 100%;
    // border-top: solid 1px #191f251f;
    // display: flex;
    // justify-content: space-between;
    // background: #fff;
    // height: 9vh;
    // padding: 2vh;
    text-align: center;

    span:first-child {
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      display: inline-block;
      width: 90%;
      text-align: center;
      line-height: 7vh;
      color: #fff;
      border-radius: 8px;
      margin: 2vh 0;
    }
    span:last-child {
      letter-spacing: 5px;
      display: inline-block;
      width: 90%;
      text-align: center;
      line-height: 7vh;
      color: #a1a1a1;
      border-radius: 8px;
      margin: 2vh 0;
      border: 1px solid #a1a1a1;
    }
  }
}
</style>
