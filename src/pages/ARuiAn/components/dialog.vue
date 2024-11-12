<template>
  <div>
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="block" :style="{ height: type != 1 ? '45%' : '70%' }">
          <div class="header">
            <span>{{ title || "标题" }}</span>
            <span @click="onClick(1)">x</span>
          </div>
          <div class="main">
            <div class="content">
              <textarea
                type="text"
                v-model.trim="dealContent"
                style="width: 100%; background: #fafafa"
                placeholder="在此输入内容"
                rows="5"
              />
            </div>
            <div class="VPM_upload" v-if="type == 1">
              <div @click="uploadFn()">
                <span>+</span>
                <!-- <span>上传图片({{ fileIdList.length || 0 }}/9)</span> -->
              </div>
              <input
                @change="fileChange"
                style="display: none"
                multiple
                type="file"
                name=""
                id="aa"
              />
              <!-- @click="previewFn(item, fileIdList, 2)" -->
              <img
                v-for="(item, index) in fileIdList"
                :key="index"
                :src="
                  baseUrl +
                  'rbac/file/downloadRb/' +
                  item.fileId +
                  '?rbacToken=' +
                  rbacToken
                "
                alt=""
              />
            </div>
          </div>

          <div class="footer">
            <span @click="onClick(1)">取消</span>
            <span @click="onClick(2)">确认</span>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { upload } from "@/api/a";

export default {
  props: ["show", "title", "type"],
  data() {
    return {
      dealContent: "",
      baseUrl: process.env.baseUrl,
      rbacToken: localStorage.getItem("rbacToken") || "",
      fileIdList: [],
    };
  },
  mounted() {},
  created() {},
  methods: {
    uploadFn() {
      document.getElementById("aa").click();
    },
    // 上传图片
    async fileChange(e) {
      let sendData = new FormData();
      const files = [...e.target.files];
      if (this.fileIdList.length + files.length > 5) {
        dd.alert({
          message: "最多只能上传9张",
          title: "提示",
          button: "收到",
        });
        return false;
      }
      if (files && files.length) {
        dd.showLoading({
          text: "文件上传中..", //提示信息
        });
        files.forEach((v) => {
          sendData.append("file", v);
        });
        sendData.append("rbacToken", localStorage.getItem("rbacToken"));
        const data = await upload(sendData);
        dd.hideLoading({});
        if (data.success && data.data && data.data.length) {
          data.data.forEach((v, i) => {
            var obj = {};
            obj.fileType = files[i].type;
            obj.fileName = files[i].name;
            obj.fileId = v;
            this.fileIdList.push(obj);
          });
        }
      }
    },
    // 查看图片
    previewFn(it, list, type) {
      let a =
        this.baseUrl +
        "rbac/file/downloadRb/" +
        it +
        "?rbacToken=" +
        this.rbacToken;
      let b = [];

      if (type == 2) {
        list.map((item, index) => {
          b.push(
            this.baseUrl +
              "rbac/file/downloadRb/" +
              item +
              "?rbacToken=" +
              this.rbacToken
          );
        });
      } else {
        list.map((item, index) => {
          b.push(
            this.baseUrl +
              "rbac/file/downloadRb/" +
              item.fileId +
              "?rbacToken=" +
              this.rbacToken
          );
        });
      }
      this.previewImageFn(a, b);
    },
    onClick(item) {
      this.$emit("onDialog", {
        show: item,
        data: { dealContent: this.dealContent, fileIdList: this.fileIdList },
      });
    },
  },
  watch: {
    show(newVal, oldVal) {
      this.dealContent = "";
      this.fileIdList = [];
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 80%;
  background-color: #fff;
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    background: #1c69f7;
    padding: 1vh 5vw;
    > span {
      color: white;
      font-size: 0.5rem;
    }
  }
  .main {
    height: 70%;
    overflow: auto;
  }
  .content {
    padding: 1vh;
  }
  .VPM_upload {
    padding: 1vh;
    display: flex;
    flex-wrap: wrap;
    > div {
      display: inline-block;
      width: 22vw;
      height: 22vw;
      background: #fafafa;
      border-radius: 0.2rem;
      margin: 1vw;
      text-align: center;
      > span:first-child {
        line-height: 18vw;
        font-size: 1.5rem;
      }
    }
    > img {
      display: inline-block;
      width: 22vw;
      height: 22vw;
      margin: 1vw;
      vertical-align: middle;
    }
  }
  .footer {
    position: absolute;
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
      line-height: 5vh;
      background: #409eff;
      color: #fff;
      border-radius: 8px;
      margin-right: 14px;
    }
    > span:first-child {
      background: #fff;
      color: #9da0a2;
      border: 1px solid #9da0a2;
    }
  }
}
</style>