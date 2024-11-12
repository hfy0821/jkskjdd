<template>
  <div>
    <div class="eventHand" >
      <div class="header_icon"><span>反馈记录</span></div>
      <div
        class="eh_line"
        v-for="(item, index) in missionDetail"
        :key="index"
      >
        <p class="eh_line_p">
          <span>{{ item.createTime }}</span>
          <span>
            {{ item.createUserDepartmentName }}
          </span>
        </p>
        <p>{{ item.description }}</p>
         <div class="eh_line_div" v-if="item.fileList && item.fileList.length">
          <img
            @click="preview(item, index)"
            v-for="(item, index) in item.fileList"
            :key="index"
            :src="
              baseUrl +
              'rbac/file/downloadRb/' +
              item.fileId +
              '?rbacToken=' +
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
  props: ['missionDetail'],
  data () {
    return {
      rbacToken_: localStorage.getItem('rbacToken') || ''
    }
  },
  created () {},
  methods: {
    preview (v, index) {
      const that = this
      const data = this.baseInstructionVOList[index].fileList
      if (v.fileType.indexOf('image') >= 0) {
        const urlData = []
        data.map((item, index) => {
          urlData.push(
            that.baseUrl +
              'rbac/file/downloadRb/' +
              item.fileId +
              '?rbacToken=' +
              that.rbacToken_
          )
        })
        dd.previewImage({
          current:
            that.baseUrl +
            'rbac/file/downloadRb/' +
            v.fileId +
            '?rbacToken=' +
            that.rbacToken_,
          urls: urlData
        })
          .then()
          .catch()
      } else {
        // dd.biz.util.openLink({
        //   url: `${this.baseUrl}rbac/file/downloadRb/${   v.fileId
        //   }?rbacToken=${localStorage.getItem("rbacToken")}`, //要打开链接的地址
        //   onSuccess: function (result) {  },
        //   onFail: function (err) {  },
        // });
        // window.open(`${this.baseUrl}rbac/file/downloadRb/${v.fileId}?rbacToken=${localStorage.getItem('rbacToken')}`)
      }
    }
  }
};
</script>
<style scoped lang="less">
.header_icon {
  padding: 1vh 5vw;
  background: #f3f3f3;
  > span {
    border-left: 0.133333rem solid #01a6ff;
    display: inline-block;
    padding-left: 2vw;
  }
}
.eventHand {
  padding-bottom: 2vh;
  .eh_line {
    border-bottom: 1px solid #e6e6e6;
    padding: 1vh 5vw;
    > .eh_line_p {
      display: flex;
      justify-content: space-between;
    }
    > p {
      margin-bottom: 1vh;
    }
    .eh_line_div {
      > img {
        display: inline-block;
        width: 30%;
        margin: 0 1%;
      }
    }
  }
}
.preview {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(25, 31, 37, 0.7);
  z-index: 1;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>
 <style >
.van-radio {
  padding: 1vh 0;
}
.van-radio__icon {
  font-size: 26px;
}
</style>
