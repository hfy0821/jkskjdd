<template>
  <div class="Equipment_detail">
    <!-- 待处置任务 -->
    <div class="form" :class="edit ? '' : 'unclick'" v-if="type == 1">
      <!-- 事件名称 -->
      <div class="form_item">
        <p :class="formData.name ? 'active' : ''">事件名称</p>
        <input
          type="text"
          v-model.trim="formData.name"
          placeholder="在此输入事件名称"
          readonly
        />
      </div>
      <!-- /时间/ -->
      <div class="form_item">
        <p :class="formData.time ? 'active' : ''">时间</p>
        <input
          type="text"
          readonly
          @click="timeFn()"
          :value="formData.time"
          placeholder="在此输入时间"
        />
      </div>
      <!-- 地点 -->
      <div class="form_item">
        <p :class="formData.address ? 'active' : ''">地点</p>
        <div class="relativeC">
          <input
            type="text"
            readonly
            :value="formData.address"
            placeholder="点击选择地点"
          />
          <!-- <i @click="addressFn()" class="iconfont icon-location"></i> -->
        </div>
      </div>
      <!-- 描述 -->
      <div class="form_item">
        <p :class="formData.content ? 'active' : ''">描述</p>
        <div>
          <textarea
            type="text"
            v-model.trim="formData.content"
            placeholder="在此输入描述"
            rows="5"
            readonly
          />
        </div>
      </div>
      <!-- 可视设备 -->
      <div class="form_item">
        <p :class="formData.equipmentName ? 'active' : ''">可视设备</p>
        <input
          type="text"
          v-model.trim="formData.equipmentName"
          placeholder="请输入可视设备"
          readonly
        />
      </div>
      <!-- 当前任务 -->
      <div class="form_item">
        <p :class="formData.missionContent ? 'active' : ''">当前任务</p>
        <input
          type="text"
          v-model.trim="formData.missionContent"
          placeholder="请输入当前任务"
          readonly

        />
      </div>
    </div>
    <!-- 进行中任务,处置完成 -->
    <div
      class="form"
      :class="edit ? '' : 'unclick'"
      v-if="type == 2 || type == 3"
    >
      <!-- 事件名称 -->
      <div class="form_item">
        <p :class="formData.name ? 'active' : ''">事件名称</p>
        <input
          readonly
          type="text"
          v-model.trim="formData.name"
          placeholder="在此输入事件名称"
        />
      </div>
      <!-- /时间/ -->
      <div class="form_item">
        <p :class="formData.time ? 'active' : ''">时间</p>
        <input
          readonly
          type="text"
          :value="formData.time"
          placeholder="在此输入时间"
        />
      </div>
      <!-- 地点 -->
      <div class="form_item">
        <p :class="formData.address ? 'active' : ''">地点</p>
        <div class="relativeC">
          <input
            readonly
            type="text"
            :value="formData.address"
            placeholder="点击选择地点"
          />
          <!-- <i v-if="type == 1" @click="addressFn()" class="iconfont icon-location"></i> -->
        </div>
      </div>
      <!-- 描述 -->
      <div class="form_item">
        <p :class="formData.content ? 'active' : ''">描述</p>
        <div>
          <textarea
            readonly
            type="text"
            v-model.trim="formData.content"
            placeholder="在此输入描述"
            rows="5"
          />
        </div>
      </div>
      <!-- 可视设备 -->
      <div class="form_item">
        <p :class="formData.equipmentName ? 'active' : ''">可视设备</p>
        <input
          readonly
          type="text"
          v-model.trim="formData.equipmentName"
          placeholder="请输入可视设备"
        />
      </div>
      <!-- 当前任务 -->
      <div class="form_item">
        <p :class="formData.missionContent ? 'active' : ''">当前任务</p>
        <input
          readonly
          type="text"
          v-model.trim="formData.missionContent"
          placeholder="请输入当前任务"
        />
      </div>
    </div>
    <!-- 操作 -->
    <div class="btn">
      <span @click="handClick(1)" v-if="type == 1" class="btnSpan"
        >拒绝执行</span
      >
      <span @click="handClick(2)" v-if="type == 1">前往执行</span>
      <span @click="handClick(3)" v-if="type == 2">结束任务</span>
    </div>
  </div>
</template>
<script>
import {
  getEquipmentMissionDetail,
  saveEquipmentMissionDetail,
} from "@/api/a";
export default {
  data() {
    return {
      url_: "",
      rbacToken_: "",
      edit: true,
      formData: {
        name: "",
        time: "",
        address: "",
        content: "",
        equipmentName: "",
        missionContent: "",
      },
      emergencyId: "",
      equipmentId: "",
      excuteType: "",
      type: "",
    };
  },
  created() {
    let query = this.$route.query;
    console.log("query", query.id);
    this.url_ = process.env.baseUrl;
    this.rbacToken_ = localStorage.getItem("rbacToken");
    this.type = query.type;
    this.getDetail();
  },
  methods: {
    // 获取详情
    async getDetail() {
      const that = this;
      let query = that.$route.query;
      const res = await getEquipmentMissionDetail({ id: query.id });
      if (res.success) {
        let _data = res.data;
        that.formData.name = _data.name;
        that.formData.content = _data.content;
        that.formData.time = _data.createTime;
        that.formData.address = _data.address;
        that.formData.equipmentName = _data.equipmentName;
        that.formData.missionContent = _data.missionContent;
        that.emergencyId = _data.emergencyId;
        that.equipmentId = _data.equipmentId;
      }
    },
    // 选择时间
    // timeFn() {
    //   const that = this;
    //   dd.biz.util.datetimepicker({
    //     format: "yyyy.MM.dd HH:mm:ss",
    //     value: that.formData.time,
    //     onSuccess: function(res) {
    //       console.log('res',res);
    //       that.formData.time = res.value;
    //     },
    //     onFail: function(err) {},
    //   });
    // },
    // 选择地址
    // addressFn() {
    //   const that = this;
    //   dd.locateOnMap({
    //   })
    //     .then((res) => {
    //       console.log('res', res);
    //       let address = res.province + res.city + res.adName + res.title;
    //       that.formData.address = address;
    //     })
    //     .catch((err) => {});
    // },
    showLoadingFn() {
      dd.showLoading({
        text: "加载中",
      })
        .then((res) => {})
        .catch((err) => {});
    },
    hideLoadingFn() {
      dd.hideLoading({})
        .then((res) => {})
        .catch((err) => {});
    },
    alert(t) {
      dd.alert({
        message: t,
        title: "提示",
        button: "收到",
      })
        .then((res) => {})
        .catch((err) => {});
    },
    handClick(i) {
      const that = this;
      let query = that.$route.query;
      let obj = {
        emergencyId: that.emergencyId,
        equipmentId: that.equipmentId,
        excuteType: "",
        content: that.formData.missionContent,
        id: "",
      };
      if (i == 1) {
        obj.excuteType = "2";
        obj.id = query.id;
        dd.device.notification.confirm({
          message: "是否拒绝执行?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "处理中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await saveEquipmentMissionDetail(obj);
                  dd.device.notification.hidePreloader({
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                  if (data.success) {
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到",
                    })
                      .then((res) => {
                        that.$router.go(-1);
                      })
                      .catch((err) => {});
                  }
                },
                onFail: function (err) {},
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      if (i == 2) {
        obj.excuteType = "1";
        obj.id = query.id;
        dd.device.notification.confirm({
          message: "是否前往执行?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "处理中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await saveEquipmentMissionDetail(obj);
                  dd.device.notification.hidePreloader({
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                  if (data.success) {
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到",
                    })
                      .then((res) => {
                        that.$router.go(-1);
                      })
                      .catch((err) => {});
                  }
                },
                onFail: function (err) {},
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      if (i == 3) {
        obj.excuteType = "3";
        dd.device.notification.confirm({
          message: "是否结束任务?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "处理中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await saveEquipmentMissionDetail(obj);
                  dd.device.notification.hidePreloader({
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                  if (data.success) {
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到",
                    })
                      .then((res) => {
                        that.$router.go(-1);
                      })
                      .catch((err) => {});
                  }
                },
                onFail: function (err) {},
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
    },
  },
};
</script>
<style scoped lang="less">
.Equipment_detail {
  padding-bottom: 10vh;
  //   input::-webkit-input-placeholder {
  //     font-size: 24px;
  //   }
  //   input::-moz-placeholder {
  //     font-size: 24px;
  //   }

  //   input:-moz-placeholder {
  //     font-size: 24px;
  //   }

  //   input:-ms-input-placeholder {
  //     font-size: 24px;
  //   }
  input,
  textarea {
    // font-size: 30px;
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

    .form_item {
      border-bottom: solid 1px #e4e4e4;
      padding: 8px 0 24px;
      .item_main {
        display: flex;
        flex-wrap: wrap;
        // > span {
        //   position: relative;
        //   width: 20vw;
        //   height: 20vw;
        //   margin: 0 1vw;
        //   margin-bottom: 1vh;
        //   display: inline-block;

        //   > img {
        //     width: 100%;
        //     height: 100%;
        //   }
        //   > i {
        //     position: absolute;
        //     top: -5px;
        //     right: 0;
        //     font-size: 30px;
        //   }

        //   > button {
        //     width: 100%;
        //     height: 100%;
        //     background: #d7d7d7;
        //     color: #fff;
        //     position: relative;
        //     > input {
        //       position: absolute;
        //       top: 0;
        //       left: 0;
        //       width: 100%;
        //       height: 100%;
        //       opacity: 0;
        //     }
        //   }
        // }
      }
      p {
        line-height: 68px;
        &.active {
          color: #409eff;
          font-size: 24px;
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
      margin: 0 1vw;
      background: #409eff;
      color: #fff;
      letter-spacing: 5px;
      flex: 1;
      text-align: center;
      line-height: 5vh;
      color: #fff;
      border-radius: 8px;
      // &:last-child {
      //   margin: 0;
      // }
    }
    .btnSpan {
      background: #000;
    }
  }
}
</style>
