<template>
  <div class="hiddenDetailMaxbox">
    <div class="posabs"
         style="width:35vw">
      <div class=" butStyle_color-red"
           @click="infoid == -1 ? '':removeHidden()"
           v-if="pageType == 1 && infoid != -1"
           style="line-height:30px;border-radius:20vw">移除隐患</div>
    </div>

    <div class="Item_content_Box"
         v-if="pageType == 1 || pageType == 2">
      <div class="Item_title">
        <div>
          <span>*</span>{{pageType == 1? '隐患照片':'整改照片'}}
        </div>
      </div>
      <div>
        <imgUpload ref="imgDom"
                   :filelist="imginfo['url']"
                   :fileIdlist="imginfo['id']"
                   @getimgUrl="getimginfo($event,1)"
                   @getimgfile="getimginfo($event,2)"
                   @getimgId="getimginfo($event,3)"></imgUpload>
      </div>
    </div>

    <div class="Item_content_Box"
         style="margin:15px 0px;"
         v-if="pageType == 1 || pageType == 2">
      <div class="Item_title">
        <span>*</span>{{pageType == 1?'隐患描述':'整改描述'}}
      </div>
      <div class="textBox">
        <van-field v-model="hidedangerVal"
                   style="line-height:20px"
                   type="textarea"
                   :autosize="{ maxHeight: 180, minHeight: 50 }"
                   placeholder="请输入描述" />
      </div>
    </div>

    <div class="Item_content_Box"
         v-if="pageType == 4">
      <div class="Item_title">
        <span>*</span>延期天数
      </div>
      <div>
        <van-field v-model="deferralDays"
                   class="shellBox"
                   type="digit"
                   placeholder="请输入延期天数(单位：天)" />
      </div>
    </div>

    <div class="Item_content_Box"
         v-if="pageType == 3 || pageType == 4">
      <div class="Item_title">
        <span>*</span>{{pageType == 3? '申诉原因':'延期原因'}}
      </div>
      <div class="textBox">
        <van-field v-model="reason"
                   style="line-height:20px"
                   type="textarea"
                   :autosize="{ maxHeight: 180, minHeight: 50 }"
                   :placeholder="`请输入${pageType == 3 ? '申诉原因':'延期原因'}`" />
      </div>
    </div>

    <div class="Item_content_Box"
         v-if="pageType == 5 || pageType == 6">
      <div class="Item_title">
        <span>*</span>退回理由简述
      </div>
      <div class="textBox">
        <van-field v-model="RetuenVal"
                   style="line-height:20px"
                   type="textarea"
                   :autosize="{ maxHeight: 180, minHeight: 50 }"
                   :placeholder="pageType == 5 || pageType == 6 ? '请输入理由':'请输入隐患的描述'" />
      </div>
    </div>

    <div style="padding-bottom:15vh"></div>

    <div class="butBox">
      <van-button class="butStyle"
                  @click="$router.go(-1)"
                  type="default">取消</van-button>
      <van-button class="butStyle colorwhite"
                  v-if="pageType == 1"
                  @click="saveHiddenDangerInfo()"
                  type="primary">保存</van-button>

      <van-button class="butStyle colorwhite"
                  @click="uploadOtherResult()"
                  v-else
                  type="primary">提交</van-button>
    </div>
  </div>
</template>

<script>
import imgUpload from "../../../components/imgUpload"
import { Dialog, Notify } from 'vant';
export default {
  components: {
    imgUpload,
  },
  data () {
    return {
      upInfo: {

      },
      hidedangerVal: '',//隐患描述
      reason: '',//申述原因
      RetuenVal: '',
      deferralDays: 1, // 延期天数
      HiddenDangerId: '',//隐患id
      reviewDetailid: '',//复检id
      imginfo: [],
      infoid: -1,
      pageType: 1, // 1 普通页面 2 整改上传 3申诉原因 4 延期申请 5 抽查驳回
      reupload: 0//是否重新上传 0 否 1 是
    }
  },
  // activated () {
  //   debugger
  // },
  mounted () {
    if (this.$route.query.type) {
      this.pageType = this.$route.query.type;
    }
    if (this.$route.query.reupload) {
      this.reupload = this.$route.query.reupload
    }
    if (this.$route.query.reviewDetailid) {
      this.reviewDetailid = this.$route.query.reviewDetailid
    }
    if (this.$route.query.HiddenDangerId) {
      this.HiddenDangerId = this.$route.query.HiddenDangerId;
    }
    // 获取选中的第几栏数据
    if (this.$route.query.infoId) {
      this.infoid = this.$route.query.infoId - 1;
      const { imginfo, description } = this.$store.state.HiddenDangerInfo[this.infoid];
      this.hidedangerVal = description;
      this.imginfo = imginfo;
    }
  },

  methods: {
    saveHiddenDangerInfo (type) {
      this.$refs.imgDom.sendInfo();
      this.$refs.imgDom.sendInfo3();

      console.log(this.imginfo)

      if (this.imginfo.id.length == 0) {
        Notify({ type: 'danger', message: '隐患照片未上传' });
        return
      }
      if (this.hidedangerVal == '') {
        Notify({ type: 'danger', message: '隐患描述未填写' });
        return
      }
      // type 一个是修改一个是新增
      if (this.infoid != -1) {
        const idx = this.infoid;
        let arrys = this.$store.state.HiddenDangerInfo;
        arrys[idx] = { imginfo: this.imginfo, description: this.hidedangerVal }
        this.$store.commit('StoreData', { key: "HiddenDangerInfo", value: [...arrys] })
        // window.history.back(-1);
        this.$router.go(-1);
        return;
      }
      this.$store.commit('StoreData', { key: "HiddenDangerInfo", value: [...this.$store.state.HiddenDangerInfo, { imginfo: this.imginfo, description: this.hidedangerVal }] })
      // window.history.back(-1);
      this.$router.go(-1);
    },
    // 获取图片信息
    getimginfo (e, type) {
      if (type == 1) {
        this.imginfo['url'] = e;
      } else if (type == 2) {
        this.imginfo['file'] = e;
      } else {
        this.imginfo['id'] = e;
      }
    },
    removeHidden () {
      const _that = this;
      Dialog.confirm({
        title: '确认删除',
        width: '250px',
      })
        .then((res) => {
          if (_that.infoid != -1) {
            let arrys = this.$store.state.HiddenDangerInfo;
            arrys.splice(_that.infoid, 1);
            this.$store.commit('StoreData', { key: "HiddenDangerInfo", value: [...arrys] })
          }
          window.history.go(-1);
        })
    },
    async uploadOtherResult (type) {
      switch (this.pageType) {
        // 上传隐患处置
        case 2:
          this.$refs.imgDom.sendInfo3();
          let pics = this.$utils.getString(this.imginfo['id'], ',')
          if (pics == '') {
            Notify({ type: 'danger', message: '未上传整改图片' });
            return
          }
          if (this.hidedangerVal == '') {
            Notify({ type: 'danger', message: '未上传整改描述' });
            return
          }
          this.$httpapi.uploadHandleResult({
            id: this.HiddenDangerId,
            handlePicIds: pics,
            handleDescription: this.hidedangerVal,
            reUploadFlag: String(this.reupload)
          }).then((res) => {
            if (res.success == 1) {
              this.$router.go(-2);
            } else {
              Notify({ type: 'danger', message: res.message });
            }
          })
          break;
        // 上传申诉结果
        case 3:
          if (this.reason == '') {
            Notify({ type: 'danger', message: '未输入申述原因' });
            return
          }
          this.$httpapi.appealApproveHiddenTrouble({
            businessKey: this.HiddenDangerId, //隐患的id
            operation: 'appeal',
            opinion: this.reason //申述原因
          }).then((res) => {
            if (res.success == 1) {
              this.$router.go(-2);
            } else {
              Notify({ type: 'danger', message: res.message });
            }
          })
          break;
        // 上传申诉延期
        case 4:
          if (this.deferralDays == '') {
            Notify({ type: 'danger', message: '未输入延期天数' });
            return
          }
          if (this.reason == '') {
            Notify({ type: 'danger', message: '未输入原因' });
            return
          }
          this.$httpapi.delayApproveHiddenTrouble({
            id: this.HiddenDangerId,
            delayDays: this.deferralDays,//天数
            reason: this.reason,//原因
            operation: 'commit'
          }).then((res) => {
            if (res.success == 1) {
              this.$router.go(-2);
            } else {
              Notify({ type: 'danger', message: res.message });
            }
          })
          break;
        // 复检退回原因
        case 5:
          if (this.RetuenVal == '') {
            Notify({ type: 'danger', message: '未输入原因' });
            return
          }
          this.$httpapi.recheckApproveHiddenTrouble({
            businessKey: this.reviewDetailid,
            operation: 'reject',//操作流程
            opinion: this.RetuenVal//原因
          }).then((res) => {
            if (res.success == 1) {
              this.$router.go(-1);
            } else {
              Notify({ type: 'danger', message: res.message });
            }
          })
          break;
        // 隐患抽查驳回
        case 6:
          if (this.RetuenVal == '') {
            Notify({ type: 'danger', message: '未输入原因' });
            return
          }
          this.$httpapi.spotCheckHiddenTrouble({
            businessKey: this.HiddenDangerId,
            operation: 'reject',//操作流程
            opinion: this.RetuenVal//原因
          }).then((res) => {
            if (res.success == 1) {
              this.$router.go(-2);
            } else {
              Notify({ type: 'danger', message: res.message });
            }
          })
          break;
        default:
          break;
      }

    }
  },
}
</script>

<style lang="less" scoped>
.posabs {
  position: absolute;
  right: 15px;
  top: 15px;
}
.hiddenDetailMaxbox {
  padding: 15px;
  .Item_content_Box {
    margin: 15px 0px;
    .Item_title {
      margin-bottom: 15px;
      span {
        color: red;
        margin-right: 9px;
      }
    }
  }

  .textBox {
    height: 400px;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
  }

  .butBox {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    display: flex;
    padding: 15px;
    background-color: white;
    justify-content: space-between;
    .butStyle {
      width: 47vw;
      height: 80px;
    }
    .colorwhite {
      span {
        color: white;
      }
    }
    .van-button__text {
      font-size: 30px !important;
    }
  }
}
</style>