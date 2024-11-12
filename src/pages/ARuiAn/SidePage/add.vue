<template>
  <div class="reportedAdd_warp">
    <div class="form" :class="edit ? '' : 'unclick'">
      <div class="item">
        <p :class="formData.recordContent ? 'active' : ''">处置情况</p>
        <textarea
          type="text"
          v-model.trim="formData.recordContent"
          placeholder="在此输入处置情况"
        />
      </div>
    </div>
    <div class="btn">
      <span @click="handClick()">保存</span>
    </div>
  </div>
</template>
<script>
import { addPeoplePetitionRecord } from "@/api/a.js";

export default {
  data() {
    return {
      formData: {
        petitionId: "",
        recordContent: "",
        recordType: "201",
      },
      edit: true,
    };
  },
  created() {
    const that = this;
    that.formData.petitionId = that.$route.query.id;
  },
  methods: {
    handClick() {
      const that = this;
      //   判断处置情况是否为空
      if (that.formData.recordContent == "") {
        dd.toast({
          icon: "",
          text: "处置情况不能为空",
        });

        return false;
      }
      //   提交确定
      dd.confirm({
        title: "温馨提示",
        message: "确认提交？",
        buttonLabels: ["确定", "取消"],
      })
        .then(async (res) => {
          if (res.buttonIndex == 0) {
            const data = await addPeoplePetitionRecord(that.formData);
            if (data.success) {
              dd.toast({
                icon: "",
                text: "操作成功",
              });
              setTimeout(() => {
                that.$router.go(-1);
              }, 1000);
            }
            console.log(data, "提交接口返回的数据");
          }
        })
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
</style>