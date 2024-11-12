<template>
  <div class="reportedAdd_warp">
    <!-- <div class="source"><span>来源：</span><i>{{sourceType}}</i></div> -->
    <div class="form" :class="edit ? '' : 'unclick'">
      <!-- 重点人 -->
      <div class="item">
        <p :class="formData.emphasesPeopleIdName ? 'active' : ''">重点人</p>
        <div>
          <input
            @click="select_emphasesPeopleId"
            readonly
            type="text"
            v-model="formData.emphasesPeopleIdName"
            placeholder="点击选择重点人"
          />
        </div>
      </div>
      <!-- 居住地 -->
      <div v-if="address_" class="item">
        <p :class="address_ ? 'active' : ''">居住地</p>
        <div>
          <input readonly type="text" v-model="address_" />
        </div>
      </div>
      <!-- 联系方式 -->
      <div v-if="phone_" class="item">
        <p :class="phone_ ? 'active' : ''">联系方式</p>
        <div>
          <input readonly type="text" v-model="phone_" />
        </div>
      </div>
      <!-- 详细地址 -->
      <div class="item">
        <p :class="formData.address ? 'active' : ''">详细地址</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.address"
            placeholder="点击选择详细地址"
            readonly
          />
          <i @click="geolocation()" class="iconfont icon-location"></i>
        </div>
      </div>
      <!-- 是否见面 -->
      <div class="item">
        <p :class="formData.isMeet ? 'active' : ''">是否见面</p>
        <div>
          <input
            @click="select_isMeet"
            readonly
            type="text"
            v-model="isMeetName"
            placeholder="点击选择是否见面"
          />
        </div>
      </div>
      <!-- 描述 -->
      <div class="item incidentContent">
        <p :class="formData.content ? 'active' : ''">描述</p>
        <div>
          <textarea
            style="width: 100%"
            name=""
            id=""
            cols="30"
            rows="5"
            v-model.trim="formData.content"
            placeholder="在此输入描述"
          ></textarea>
        </div>
      </div>
      <!-- 照片 -->
      <div class="item">
        <p :class="formData.files.length > 0 ? 'active' : ''">照片</p>
        <div class="item_main" style="">
          <span
            style="position: relative"
            v-for="(item1, index1) in formData.files"
            :key="index1"
          >
            <img
              :src="
                url_ +
                'rbac/file/downloadRb/' +
                item1 +
                '?rbacToken=' +
                rbacToken_ +
                '&isSmall=1'
              "
            />
            <i style="" @click="delFile(i)" class="iconfont icon-cha2"></i>
          </span>
          <span v-if="formData.files.length < 5">
            <!-- <img :src="require('assets/image/add_img.png')" alt="" /> -->
            <button style="background: #d7d7d7">
              上传
              <input @change="fileChange" multiple type="file" name="" id="" />
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="endHolder"></div>
    <div class="btn">
      <span @click="handClick()">提交</span>
    </div>
  </div>
</template>
<script>
import {
  getEmphPeopleList,
  upload,
  addEvent2,
  getHandleEventDetailByIdForApp,
  addTrack,
} from "../../api/a";
import { GPS } from "../../utils/tools";
export default {
  data() {
    return {
      url_: "",
      rbacToken_: "",
      edit: true,
      phone_: "",
      address_: "",
      isMeetName: "",
      formData: {
        emphasesPeopleId: "",
        emphasesPeopleIdName: "",
        isMeet: "",
        address: "",
        x: "",
        y: "",
        content: "",
        files: [],
      },
      getEmphPeopleList: [],
      getEmphPeopleListName: [],
    };
  },
  computed: {},
  async created() {
    let that = this;
    dd.disablePullToRefresh();
    that.url_ = process.env.baseUrl;
    that.rbacToken_ =
      that.$store.getters.rbacToken || localStorage.getItem("rbacToken");
    const data = await getEmphPeopleList();
    if (data.success) {
      that.getEmphPeopleList = data.data;
      data.data.map((item, index) => {
        // if (item.phone) {
        //   that.getEmphPeopleListName.push(item.name + "(" + item.phone + ")");
        // } else {
        //   that.getEmphPeopleListName.push(item.name + "(无手机号)");
        // }
        that.getEmphPeopleListName.push(item.name);
      });
    }
    that.geolocation();
  },
  methods: {
    geolocation() {
      let that = this;
      dd.getGeolocation({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
      })
        .then((res) => {
          that.formData.address = res.address;
          var point = GPS.gcj_decrypt(res.latitude, res.longitude); //转换坐标系
          that.formData.x = point.lon;
          that.formData.y = point.lat;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    select_emphasesPeopleId() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择重点人？",
        cancelButton: "取消",
        otherButtons: that.getEmphPeopleListName,
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData.emphasesPeopleId =
            that.getEmphPeopleList[res.buttonIndex].id;
          that.formData.emphasesPeopleIdName =
            that.getEmphPeopleList[res.buttonIndex].name;
          that.address_ = that.getEmphPeopleList[res.buttonIndex].address
            ? that.getEmphPeopleList[res.buttonIndex].address
            : "暂无居住地信息";
          that.phone_ = that.getEmphPeopleList[res.buttonIndex].phone
            ? that.getEmphPeopleList[res.buttonIndex].phone
            : "暂无手机号信息";
        },
        onFail: function (err) {},
      });
    },
    select_isMeet() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "是否见面？",
        cancelButton: "取消",
        otherButtons: ["否", "是"],
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData.isMeet = res.buttonIndex;
          that.isMeetName = res.buttonIndex == 1 ? "是" : "否";
        },
        onFail: function (err) {},
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    handClick() {
      const that = this;
      if (that.formData.emphasesPeopleId == "") {
        that.alert("请选择重点人");
        return false;
      }
      if (that.formData.address == "") {
        that.alert("请选择详细地址");
        return false;
      }
      if (!that.formData.isMeet && that.formData.isMeet != 0) {
        that.alert("请选择是否见面");
        return false;
      }
      if (that.formData.content == "") {
        that.alert("请输入描述");
        return false;
      }
      if (that.formData.files.length == 0) {
        that.alert("请上传图片");
        return false;
      }
      dd.device.notification.confirm({
        message: "确定上报？",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        async onSuccess(res) {
          if (res.buttonIndex) {
            dd.device.notification.showPreloader({
              text: "提交中..",
              showIcon: true,
              async onSuccess(result) {
                console.log(that.formData, "that.formData");
                const data = await addTrack(that.formData);
                dd.device.notification.hidePreloader({});
                if (data.success) {
                  dd.device.notification.toast({
                    icon: "",
                    text: "操作成功",
                    duration: 2,
                    delay: 0,
                    onSuccess(result) {
                      that.$router.go(-1);
                    },
                    onFail: function (err) {},
                  });
                }
              },
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {},
      });
    },
    async fileChange(e) {
      let sendData = new FormData();
      const files = [...e.target.files];
      if (files && files.length) {
        if (files.length > 5) {
          this.alert("最多只能上传5张");
          return false;
        }
        files.forEach((v, i) => {
          // if (v.type == "image/jpeg" || v.type == "image/png") {
          sendData.append("file", v);
          // } else {
          //   alert("请上传JPG、png图片");
          //   return;
          // }
        });
        dd.device.notification.showPreloader({
          text: "文件上传中..",
          showIcon: true,
          onSuccess(result) {},
        });

        sendData.append("rbacToken", localStorage.getItem("rbacToken"));
        sendData.append("isSmall","1");
        const data = await upload(sendData);
        dd.device.notification.hidePreloader({});
        if (data.success) {
          data.data.map((item, index) => {
            this.formData.files.push(item);
          });
          // data.data.forEach((v, i) => {
          // var obj = {};
          // obj.fileType = files[i].type;
          // obj.fileName = files[i].name;
          // obj.fileId = v;
          // this.files.push(obj);
          // });
        }
      }
    },
    delFile(i) {
      this.formData.files.splice(i, 1);
    },
    alert(v) {
      dd.device.notification.alert({
        message: v,
        title: "提示",
        buttonName: "确定",
      });
    },
  },
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
  .source {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 32px;
    background: #ebebeb;
    span,
    i {
      font-size: 24px;
      line-height: 60px;
    }
    span {
      opacity: 0.6;
    }
    i {
      color: #409eff;
    }
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
            font-size: 15px;
          }
        }
      }
      &.incidentContent {
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
