<template>
  <div>
    <div class="eventHand" v-if="baseInstructionVOList">
      <div
        class="eh_line"
        v-for="(item, index) in baseInstructionVOList"
        :key="index"
      >
        <p class="eh_line_p">
          <span>{{ item.createTime }}</span>
          <span>
            {{ item.createUserName }}
          </span>
        </p>
        <p>{{ item.handlingDescription }}</p>
        <div class="eh_line_div" v-if="item.attachFileIdList && item.attachFileIdList.length">
          <img
            v-if="item"
            @click="preview(item, index)"
            v-for="(item, index) in item.fileList"
            :key="index"
            :src="
                baseUrl +
                '/emergency/sysFile/download/?fileId=' +
                item +
                '&rbacToken=' +
                rbacToken_
              "
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["baseInstructionVOList"],
  data() {
    return {
      baseUrl: process.env.baseUrl,
      rbacToken_: localStorage.getItem("rbacToken") || "",
    };
  },
  created() {},
  methods: {
    preview(v, index) {
      const that = this;
      let data = this.baseInstructionVOList[index].fileList;
      if (v.fileType.indexOf("image") >= 0) {
        console.log(data, "ddddddddddddddddddd");
        let urlData = [];
        data.map((item, index) => {
          urlData.push(
            that.baseUrl +
              "rbac/file/downloadRb/" +
              item.fileId +
              "?rbacToken=" +
              that.rbacToken_
          );
        });
        dd.previewImage({
          current:
            that.baseUrl +
            "rbac/file/downloadRb/" +
            v.fileId +
            "?rbacToken=" +
            that.rbacToken_,
          urls: urlData,
        })
          .then((res) => {})
          .catch((err) => {});
      } else {
        // dd.biz.util.openLink({
        //   url: `${this.baseUrl}rbac/file/downloadRb/${   v.fileId
        //   }?rbacToken=${localStorage.getItem("rbacToken")}`, //要打开链接的地址
        //   onSuccess: function (result) {  },
        //   onFail: function (err) {  },
        // });
        // window.open(`${this.baseUrl}rbac/file/downloadRb/${v.fileId}?rbacToken=${localStorage.getItem('rbacToken')}`)
      }
    },
  },
};
</script>
<style scoped lang="less">
.eventHand {
  padding-bottom: 2vh;
  .eh_line {
    border-bottom: 1px solid #e6e6e6;
    padding: 1vh 5vw;
    > .eh_line_p {
      display: flex;
      justify-content: space-between;
    }
    .eh_line_div {
      > img {
        display: inline-block;
        width: 30%;
        margin: 0 1%;
      }
    }
    > p {
      margin-bottom: 1vh;
    }
  }
}
</style>
