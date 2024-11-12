<template>
  <div class="reportedAdd_warp multiSelectClass mapClass">
    <div class="form" :class="edit ? '' : 'unclick'">
      <!-- 反馈类型 -->
      <div class="item">
        <p :class="formData.sourceType ? 'active' : ''">反馈类型</p>
        <div>
          <input
            @click="selectSource"
            readonly
            type="text"
            v-model="formData.sourceName"
            placeholder="请选择反馈类型"
          />
          <multiSelectOdd
            :multiSelectOddData="sourceList"
            :name="selectTypeName"
            v-if="multiSelectOddShow_source"
            @multiSelectOddReturn="multiSelectOddReturn_sourceList"
          />
        </div>
      </div>
      <!-- 反馈模块 -->
      <div class="item">
        <p :class="formData.sourceType ? 'active' : ''">反馈模块</p>
        <div>
          <input
            @click="selectModule"
            readonly
            type="text"
            v-model="formData.moduleName"
            placeholder="请选择反馈模块"
          />
          <multiSelectOdd
            :multiSelectOddData="moduleIdList"
            :name="selectTypeName"
            v-if="multiSelectOddShow_module"
            @multiSelectOddReturn="multiSelectOddReturn_moduleIdList"
          />
        </div>
      </div>
      <!-- 问题和建议 -->
      <div class="item">
        <p :class="formData.content ? 'active' : ''">问题和建议</p>
        <textarea
          rows="10"
          type="text"
          v-model.trim="formData.content"
          placeholder="请输入问题和建议"
        ></textarea>
      </div>
      <!-- 附件上传 -->
      <div class="item">
        <p :class="formData.files ? 'active' : ''">图片</p>
        <div class="img-box">
          <div v-for="(v, i) in formData.files" :key="i">
            <img
              :src="
                url_ +
                'rbac/file/downloadRb/' +
                v.fileId +
                '?rbacToken=' +
                rbacToken_
              "
            />

            <i @click="delFile(i)" class="iconfont icon-cha2"></i>
          </div>
          <button v-show="formData.files.length < 5">
            +
            <input
              @change="fileChange"
              type="file"
              multiple
              name
              id
              accept="image/jpeg,image/png"
            />
          </button>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <span @click="handClick">上报</span>
      </div>
    </div>
  </div>
</template>
<script>
import multiSelect from "../../components/multiSelect";
import multiSelectOdd from "../../components/multiSelect_odd";
import { upload, getTypeList17, addFeedback } from "../../api/a.js";
export default {
  components: {
    multiSelectOdd,
    multiSelect,
  },
  created() {
    this.url_ = process.env.baseUrl;
    this.rbacToken_ =
      this.$store.getters.rbacToken || localStorage.getItem("rbacToken");
  },
  data() {
    return {
      url_: "",
      rbacToken_: "",
      edit: true,
      // limitNum: true,
      // 反馈类型
      sourceList: [
        { name: "PC端", id: 1 },
        { name: "移动端", id: 2 },
        { name: "其他", id: 3 },
      ],
      // 反馈模块
      moduleIdList: [],
      // multiSelectOdd
      multiSelectOddShow: false,
      multiSelectOddShow_source: false,
      multiSelectOddShow_module: false,
      formData: {
        rbacToken: this.rbacToken_,
        sourceType: "",
        sourceName: "",
        moduleId: "",
        moduleName: "",
        selectTypeName: "",
        content: "",
        files: [],
      },
    };
  },
  methods: {
    selectSource() {
      const that = this;
      that.multiSelectOddShow_source = true;
      that.selectTypeName = "选择反馈类型";
    },
    selectModule() {
      const that = this;
      that.multiSelectOddShow_module = true;
      that.selectTypeName = "选择反馈模块";
    },

    // // 拉起下拉框
    // selectBehave(type) {
    //   const that = this;
    //   if (type == "source") {
    //     that.multiSelectOddShow_source = true;
    //     that.selectTypeName = "选择反馈类型";
    //   }
    //   if (type == "module") {
    //     that.multiSelectOddShow_module = true;
    //     that.selectTypeName = "选择反馈模块";
    //   }
    // },
    // 反馈类型
    multiSelectOddReturn_sourceList(data) {
      let that = this;
      // that.formData.moduleName = "";
      that.multiSelectOddShow_source = data.status;
      if (data.id) {
        that.formData.sourceType = data.id;
        that.formData.sourceName = data.name;
        this.getModuleData(data.id);
      }else{
        return false
      }
      that.formData.moduleId = "";
      that.formData.moduleName = "";
    },

    // 反馈模块
    async getModuleData(parentId) {
      this.sourceType;
      let sendData = {
        type: 17,
        parentId,
      };
      const data = await getTypeList17(sendData);
      this.moduleIdList = data.data.map((item) => {
        return { id: item.id, name: item.name };
      });
    },
    multiSelectOddReturn_moduleIdList(data) {
      let that = this;
      that.multiSelectOddShow_module = data.status;
      if (data.id) {
        that.formData.moduleId = data.id;
        that.formData.moduleName = data.name;
      }
    },
    // 图片上传
    async fileChange(e) {
      let sendData = new FormData();
      const files = [...e.target.files];
      if (files[0].type == "image/jpeg" || files[0].type == "image/png") {
        if (files && files.length) {
          if (files.length > 5) {
            this.alert("最多上传5张图片");
            return false;
          }
          if (this.formData.files.length + files.length > 5) {
            this.alert("最多上传5张图片");
            return false;
          }
          dd.device.notification.showPreloader({
            text: "文件上传中..",
            showIcon: true,
            onSuccess(result) {},
          });
          files.forEach((v) => {
            sendData.append("file", v);
            // this.files.push(v.name)
          });

          sendData.append("rbacToken", localStorage.getItem("rbacToken"));
          const data = await upload(sendData);
          dd.device.notification.hidePreloader({
            onSuccess: function (result) {},
            onFail: function (err) {},
          });
          if (data.success) {
            data.data &&
              data.data.length &&
              data.data.forEach((v, i) => {
                var obj = {};
                obj.fileType = files[i].type;
                obj.fileName = files[i].name;
                obj.fileId = v;
                this.formData.files.push(obj);
                // if (this.formData.files.length > 4) {
                  // this.limitNum = false;
                // }
              });
          }
        }
      } else {
        this.alert("仅支持jpeg、png格式的图片");
        return;
      }
    },
    delFile(i) {
      // this.limitNum = true;
      this.formData.files.splice(i, 1);
      this.files.splice(i, 1);
    },
    alert(v) {
      dd.device.notification.alert({
        message: v,
        title: "提示",
        buttonName: "确定",
      });
    },
    handClick() {
      if (!this.formData.sourceType) {
        this.alert("请选择反馈类型");
        return;
      }
      if (!this.formData.moduleId) {
        this.alert("请选择请反馈模块");
        return;
      }
      if (!this.formData.content) {
        this.alert("请输入反馈内容");
        return;
      }
      const that = this;
      // 处理数组，只拿里面的id
      that.formData.files = that.formData.files.map((item) => {
        return item.fileId;
      });
      // console.log(that.formData)
      dd.device.notification.confirm({
        message: "确定反馈？",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        async onSuccess(res) {
          if (res.buttonIndex) {
            dd.device.notification.showPreloader({
              text: "提交中..",
              showIcon: true,
              async onSuccess(result) {
                const data = await addFeedback(that.formData);
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
                      that.$router.replace("/suggestion");
                    })
                    .catch((err) => {});
                  // dd.device.notification.toast({
                  //   icon: "",
                  //   text: "操作成功",
                  //   duration: 2,
                  //   delay: 0,
                  //   onSuccess(result) {
                  //     alert(result);
                  //     that.$router.replace("/stability");
                  //   },
                  //   onFail: function(err) {}
                  // });
                }
              },
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {},
      });
    },
    // 发送请求
    // async sendSuggestion() {
    //   let files = this.files.map(item=>{
    //     return item.fileId
    //   })
    //   let formData = {
    //     sourceType: this.formData.sourceType,
    //     moduleId: this.formData.moduleId,
    //     content: this.formData.question,
    //     files,
    //     rbacToken: this.rbacToken_
    //   }
    //   const data = await addFeedback(formData)
    //   console.log(data,'返回的数据')
    // }
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
      > textarea {
        width: 100%;
        white-space: pre-wrap;
      }
      .img-box {
        position: relative;
        width: 100%;
        display: flex;
        > div {
          position: relative;
          width: 210px;
          height: 210px;
          margin-right: 10px;
          display: inline-block;
          > img {
            width: 100%;
            height: 100%;
            border: 1px solid#e0e0e0;
          }
          i {
            position: absolute;
            top: 0px;
            right: 0px;
          }
        }
        > button {
          position: ab;
          width: 210px;
          height: 210px;
          background-color: #e0e0e0;
          border: 1px solid#e0e0e0;
          border-radius: 2px;
          font-size: 100px;
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