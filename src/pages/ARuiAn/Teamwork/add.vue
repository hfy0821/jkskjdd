<template>
  <div class="Teamwork_add">
    <div class="form" :class="edit ? '' : 'unclick'">
      <!-- 事件名称 -->
      <div class="form_item">
        <p :class="formData.title ? 'active' : ''">事件名称</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入事件名称"
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
        <p :class="formData.incidentAddress ? 'active' : ''">地点</p>
        <div class="relativeC">
          <input
            type="text"
            readonly
            @click="addressFn()"
            :value="formData.incidentAddress"
            placeholder="点击选择地点"
          />
          <i @click="addressFn()" class="iconfont icon-location"></i>
        </div>
      </div>
      <!-- 上报部门 -->
      <div class="form_item" v-if="!edit">
        <p :class="formData.a ? 'active' : ''">上报部门</p>
        <div class="relativeC">
          <input type="text" readonly :value="formData.a" placeholder="无" />
        </div>
      </div>
      <!-- 上报人 -->
      <div class="form_item" v-if="!edit">
        <p :class="formData.b ? 'active' : ''">上报人</p>
        <div class="relativeC">
          <input type="text" readonly :value="formData.b" placeholder="无" />
        </div>
      </div>
      <!-- 事件等级 -->
      <div class="form_item" v-if="!edit">
        <p :class="formData.c ? 'active' : ''">事件等级</p>
        <div class="relativeC">
          <input type="text" readonly :value="formData.c" placeholder="无" />
        </div>
      </div>
      <!-- 描述 -->
      <div class="form_item">
        <p :class="formData.incidentRemark ? 'active' : ''">描述</p>
        <div>
          <textarea
            type="text"
            v-model.trim="formData.incidentRemark"
            placeholder="在此输入描述"
            rows="5"
          />
        </div>
      </div>
      <!-- 照片 -->
      <div class="form_item">
        <p :class="files.length > 0 ? 'active' : ''">照片</p>
        <div class="item_main">
          <span
            @click="previewDoc(item1, index1)"
            v-for="(item1, index1) in files"
            :key="index1"
          >
            <img
              :src="
                url_ +
                'rbac/file/downloadRb/' +
                item1.fileId +
                '?rbacToken=' +
                rbacToken_
              "
            />
            <!-- <img :src="require('assets/image/0.png')" alt /> -->
            <i @click="delFile(index1)" class="iconfont icon-cha2"></i>
          </span>
          <span v-if="files.length < 5">
            <button>
              上传
              <input @change="fileChange" multiple type="file" name="" id="" />
            </button>
          </span>
        </div>
      </div>
      <!-- 流转信息 -->
      <div class="detailMsg" v-if="!edit">
        <div class="header_icon"><span>流转信息</span></div>
        <ul class="ul">
          <li class="li">
            <span>截止时间：</span>
            <div>
              上报人员上报人员上报人员上报人员上报人员上报人员上报人员上报人员上报人员上报人员上报人员上报人员
            </div>
          </li>
          <li class="li">
            <span>处置要求：</span>
            <div>上报人员</div>
          </li>
          <li class="li">
            <span>流转系统：</span>
            <div>上报人员</div>
          </li>
        </ul>
      </div>
      <!-- 处置反馈 -->
      <div class="form_item" v-if="!edit">
        <p :class="formData.incidentRemark ? 'active' : ''">处置反馈</p>
        <div>
          <textarea
            type="text"
            v-model.trim="formData.incidentRemark"
            placeholder="无"
            rows="5"
          />
        </div>
      </div>
    </div>
    <!-- 操作 -->
    <div class="btn">
      <span v-if="edit">保存</span>
      <span v-if="!edit">继续跟踪</span>
      <span v-if="!edit">处置完毕</span>
    </div>
  </div>
</template>
<script>
import { upload } from "@/api/a";
export default {
  data() {
    return {
      url_: "",
      rbacToken_: "823c854064d64961833ddc67a8618ac5",
      edit: true,
      files: [],
      formData: {
        title: "",
        incidentAddress: "",
        trends: "",
        trends: "",
      },
    };
  },
  created() {
    let query = this.$route.query;
    this.url_ = process.env.baseUrl;
    this.rbacToken_ = localStorage.getItem("rbacToken");
    if (query.id) {
      this.edit = false;
    }
  },
  methods: {
    previewDoc(t, i) {
      let u = [];
      this.files.map((item, index) => {
        u.push(
          this.url_ +
            "rbac/file/downloadRb/" +
            item.fileId +
            "?rbacToken=" +
            this.rbacToken_
        );
      });
      dd.previewImage({
        current: u[i],
        urls: u,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
    timeFn() {
      dd.showTimePicker({
        format: "yyyy-MM-dd HH:mm:ss",
        value: "2015-04-17 10:10:10",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
      //   dd.showDatePicker({
      //     format: "yyyy-MM-dd HH:mm:ss", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
      //     value: "2015-04-17", //默认显示日期
      //   })
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((err) => {});
    },
    addressFn() {
      dd.locateOnMap({
        // latitude: 39.903578, // 纬度，非必须
        // longitude: 116.473565, // 经度，非必须
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
    async fileChange(e) {
      const that = this;
      let sendData = new FormData();
      let files = [...e.target.files];
      that.showLoadingFn();
      if (files && files.length) {
        files.forEach((v) => {
          sendData.append("file", v);
        });
        sendData.append("rbacToken", localStorage.getItem("rbacToken"));
        const data = await upload(sendData);
        if (data.success) {
          data.data &&
            data.data.length &&
            data.data.forEach((v, i) => {
              var obj = {};
              obj.fileType = files[i].type;
              obj.fileName = files[i].name;
              obj.fileId = v;
              that.files.push(obj);
            });
          that.hideLoadingFn();
        }
      }
    },
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
    delFile(t) {},
    alert(t) {
      dd.alert({
        message: t,
        title: "提示",
        button: "收到",
      })
        .then((res) => {})
        .catch((err) => {});
    },
  },
};
</script>
<style scoped lang="less">
.Teamwork_add {
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
        > span {
          position: relative;
          width: 20vw;
          height: 20vw;
          margin: 0 1vw;
          margin-bottom: 1vh;
          display: inline-block;

          > img {
            width: 100%;
            height: 100%;
          }
          > i {
            position: absolute;
            top: -5px;
            right: 0;
            font-size: 30px;
          }

          > button {
            width: 100%;
            height: 100%;
            background: #d7d7d7;
            color: #fff;
            position: relative;
            > input {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            }
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
    .detailMsg {
      .header_icon {
        padding: 1vh 5vw;
        background: #f3f3f3;
        > span {
          border-left: 0.133333rem solid #01a6ff;
          display: inline-block;
          padding-left: 2vw;
        }
      }
      .ul {
        padding: 0 32px;
        .li,
        li {
          display: flex;
          font-size: 28px;
          line-height: 40px;
          padding: 20px 0;
          span {
            // width: 200px;
            opacity: 0.7;
            width: 30%;
            text-align: right;
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
  }
}
</style>
