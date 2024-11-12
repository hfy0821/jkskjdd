<template>
  <div class="person_warp">
    <!-- 基本信息  -->
    <div class="analyseClass">
      <div class="header_icon"><span>基本信息</span></div>
      <div class="form" :class="edit ? '' : 'unclick'">
        <div class="item">
          <p :class="formData.name ? 'active' : ''">
            姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名
          </p>
          <input
            type="text"
            v-model.trim="formData.name"
            placeholder="输入人物姓名"
            :readonly="disabled"
          />
        </div>
        <div class="item">
          <p :class="sexId ? 'active' : ''">
            性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
          </p>
          <input
            type="text"
            @click="disabled ? null : sexFn()"
            readonly
            :value="formData.sex == 1 ? '男' : formData.sex == 2 ? '女' : ''"
            placeholder="性别选择"
          />
        </div>
        <div class="item">
          <p :class="formData.phone ? 'active' : ''">手机号码</p>
          <input
            type="text"
            v-model.trim="formData.phone"
            placeholder="在此输入手机号码"
          />
        </div>
        <div class="item">
          <p :class="formData.districtsId ? 'active' : ''">所属镇街</p>
          <input
            type="text"
            @click="disabled ? null : roadFn()"
            readonly
            v-model.trim="formData.roadName"
            placeholder="请选择"
          />
        </div>
        <div class="item">
          <p :class="formData.birthday ? 'active' : ''">出生日期</p>
          <input
            type="text"
            @click="disabled ? null : timeFn()"
            v-model.trim="formData.birthday"
            placeholder="在此输入出生日期"
            readonly
          />
        </div>
        <div class="item">
          <p :class="formData.address ? 'active' : ''">家庭地址</p>
          <div class="relativeC">
            <input
              type="text"
              v-model.trim="formData.address"
              placeholder="点击输入地址，也可地图进行定位"
              :readonly="disabled"
            />
            <i @click="addressFn()" class="iconfont icon-location"></i>
          </div>
        </div>
        <div class="item">
          <p :class="formData.cardId ? 'active' : ''">身份证号</p>
          <input
            type="text"
            v-model.trim="formData.cardId"
            placeholder="在此输入身份证号"
          />
        </div>
        <div class="item">
          <p :class="emphasesStatusId ? 'active' : ''">重点人</p>
          <input
            type="text"
            readonly
            :value="
              formData.emphasesStatus == 0
                ? '否'
                : formData.emphasesStatus == 1
                ? '是'
                : ''
            "
            @click="emphasisPersonFn()"
            placeholder="请选择"
          />
          <span class="item_img" v-if="!isKeyPerson">
            <img :src="require('assets/image/iconRight.svg')" alt="" />
            <span>已检索，该人员非重点人员</span>
          </span>
        </div>
      </div>
    </div>
    <div class="btn_check">
      <span @click="retrieve()">重点人检索</span>
    </div>
    <div class="btn_save">
      <span @click="save()">保存</span>
    </div>
  </div>
</template>
<script>
import { addPeople, isKeyPerson } from "../../../api/a";
export default {
  data() {
    return {
      disabled: false,
      edit: true,
      formData: {
        name: "",
        sex: "3",
        phone: "",
        districtsId: "",
        roadName: "",
        birthday: "",
        address: "",
        cardId: "",
        emphasesStatus: "3",
      },
      sexId: "",
      emphasesStatusId: "",
      isKeyPerson: true,
      roadData1: [],
      sexData: [],
      emphasisPerson: [],
    };
  },
  async created() {
    const that = this;
    let store = that.$store.state;
    that.roadData1 = store.roadData1;
    that.sexData = store.sexData;
    that.emphasisPerson = store.emphasisPerson;
    // console.log(store.roadData1,"666666");
  },
  computed: {},
  methods: {
    // 镇街选择
    roadFn() {
      const that = this;
      dd.showSelect({
        source: that.roadData1,
      })
        .then((res) => {
          that.formData.districtsId = res.value;
          that.formData.roadName = res.key;
        })
        .catch((err) => {});
      console.log(that.roadData1, "4444444");
    },
    // 性别选择
    sexFn() {
      const that = this;
      dd.showSelect({
        source: that.sexData,
      })
        .then((res) => {
          console.log("res", res);
          that.formData.sex = res.value;
          that.sexId = res.key;
        })
        .catch((err) => {});
    },
    // 重点人选择
    emphasisPersonFn() {
      const that = this;
      dd.showSelect({
        source: that.emphasisPerson,
      })
        .then((res) => {
          that.formData.emphasesStatus = res.value;
          that.emphasesStatusId = res.key;
        })
        .catch((err) => {});
    },
    // 出生日期选择
    timeFn() {
      const that = this;
      dd.showDatePicker({
        format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        value: that.formData.birthday, //默认显示日期
      })
        .then((res) => {
          that.formData.birthday = res.value;
        })
        .catch((err) => {});
      // dd.biz.util.datetimepicker({
      //   format: "yyyy-MM-dd",
      //   value: that.formData.birthday,
      //   onSuccess: function (res) {
      //     that.formData.birthday = res.value;
      //   },
      //   onFail: function (err) {},
      // });
    },
    // 提交验证
    validateFn() {
      const that = this;
      if (!that.formData.name) {
        that.alert("请输入姓名");
        return false;
      }
      if (!that.formData.sex) {
        that.alert("请输入性别");
        return false;
      }
      if (!that.formData.phone) {
        that.alert("请输入手机号");
        return false;
      }
      if (!that.formData.districtsId) {
        that.alert("请输入所属镇街");
        return false;
      }
      if (!that.formData.birthday) {
        that.alert("请输入年龄");
        return false;
      }
      if (!that.formData.address) {
        that.alert("请输入家庭地址");
        return false;
      }
      if (!that.formData.cardId) {
        that.alert("请输入身份证号");
        return false;
      }
      return true;
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
    // 选择地址
    addressFn() {
      const that = this;
      dd.locateOnMap({})
        .then((res) => {
          console.log("res", res);
          let address = res.province + res.city + res.adName + res.title;
          that.formData.address = address;
        })
        .catch((err) => {});
    },
    // 保存
    save() {
      const that = this;
      let v = that.validateFn();
      if (v) {
        dd.confirm({
          title: "温馨提示",
          message: "确定提交？",
          buttonLabels: ["取消", "确定"],
        })
          .then(async (res) => {
            if (res.buttonIndex == 1) {
              // const data = await addEmergencyEvent({
              //   event: that.formData,
              //   fileList: that.files,
              // });
              const data = await addPeople(that.formData);
              if (data.success) {
                dd.toast({
                  icon: "success",
                  text: "操作成功", //提示信息
                })
                  .then((res) => {})
                  .catch((err) => {});
                that.$router.go(-1);
              }
            }
          })
          .catch((err) => {});
      }
    },
    // 重点人检索验证
    validate() {
      const that = this;
      if (!that.formData.name) {
        that.alert("请输入姓名");
        return false;
      }
      if (!that.formData.cardId) {
        that.alert("请输入身份证号");
        return false;
      }
      return true;
    },
    // 重点人检索
    retrieve() {
      const that = this;
      let v = that.validate();
      if (v) {
        dd.confirm({
          title: "温馨提示",
          message: "确定重点人检索？",
          buttonLabels: ["取消", "确定"],
        })
          .then(async (res) => {
            if (res.buttonIndex == 1) {
              const data = await isKeyPerson({
                cardId: that.formData.cardId,
              });
              if (data.success) {
                dd.toast({
                  icon: "success",
                  text: "操作成功", //提示信息
                })
                  .then((res) => {
                    that.isKeyPerson = data.data;
                  })
                  .catch((err) => {});
              }
            }
          })
          .catch((err) => {});
      }
    },
  },
};
</script>
<style lang="less" scoped>
.person_warp {
  padding-bottom: 9vh;
  .header_icon {
    padding: 1vh 5vw;
    background: #f3f3f3;
    > span {
      border-left: 0.133333rem solid #01a6ff;
      display: inline-block;
      padding-left: 2vw;
      font-weight: 700;
    }
  }
  .analyseClass {
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
              font-size: 15px;
            }
          }
        }
        .relativeC {
          position: relative;
          .iconfont {
            position: absolute;
            right: 2vw;
            font-size: 40px;
            top: 0;
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
        .item_img {
          img {
            vertical-align: middle;
            width: 36px;
            height: 36px;
          }
          span {
            line-height: 36px;
            vertical-align: middle;
            color: #5dc687;
          }
        }
      }
    }
  }

  .btn_save {
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

  .btn_check {
    display: flex;
    background: #fff;
    height: 9vh;
    width: 40vw;
    padding: 2vh;
    margin-left: 60vw;

    span {
      margin: 0 1vw;
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      flex: 1;
      text-align: center;
      line-height: 5vh;
      color: #fff;
      border-radius: 8px;
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
