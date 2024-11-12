<template>
  <div class="file_dom_box">
    <div v-if="judgeFileType() == 'image'">
      <img :src="returnFileUrl()" @click="preverImage()" class="image_style" />
    </div>
    <div v-else-if="judgeFileType() == 'yvying'">
      <div class="yvying_style" @click="donloadAudio()">
        <img src="@/assets/image/yvyingLeft.png" v-if="item.isSendUser == 0" />
        <img src="@/assets/image/yvyingRight.png" v-if="item.isSendUser == 1" />
      </div>
    </div>
    <div v-else>
      <div class="otherFileStyle" @click="download(fileId)">{{ returnFileName() }}</div>
    </div>
  </div>
</template>

<script>
import { ImagePreview, Notify } from 'vant'
import { getBasicUrl } from '../../../api/a'
export default {
  props: {
    fileObj: {
      type: Object,
      default: () => {
        return null
      }
    },
    fileId: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      audioId: '' // 本地语音id
    }
  },
  methods: {
    judgeFileType(item) {
      console.log('judgeFileType', item);
      let typeName = this.fileObj ? this.fileObj.fileType : ''
      if (typeName.indexOf('image') > -1) {
        return 'image'
      } else if (typeName.indexOf('excel') > -1) {
        return 'excel'
      } else if (!!!this.fileObj && !!this.fileId) {
        return 'yvying'
      }
    },

    returnFileName() {
      return this.fileObj.fileName
    },

    // 返回文件url地址
    returnFileUrl() {
      let fileId = this.fileObj.id
      //   let baseUrls = localStorage.getItem('url_oh') || process.env.baseUrl
      let url = `${getBasicUrl()}/fyGric/sysFile/download/${fileId}?rbacToken=${localStorage.getItem(
        'rbacToken'
      )}`
      console.log(url)
      return url
    },

    // 图片预览
    preverImage() {
      let url = this.returnFileUrl()
      ImagePreview([url])
      //   dd.previewImage({
      //     current: url,
      //     urls: [url]
      //   })
      //     .then((res) => {})
      //     .catch((err) => {})
    },

    // 下载语音到本地拿localId
    async donloadAudio() {
      let mediaId = this.fileId
      let localAudioId = await new Promise((resolve) => {
        dd.downloadAudio({
          mediaId
        })
          .then((res) => {
            resolve(res.localAudioId)
          })
          .catch((err) => {
            resolve(null)
          })
      })
      if (!!localAudioId) {
        this.startRecordAudio(localAudioId)
      } else {
        Notify({ type: 'warning', message: '播放失败' })
      }
    },

    // 播放语音
    startRecordAudio(localAudioId) {
      const _that = this
      //   console.log(_that.audioId, 'hhahahha1')
      dd.playAudio({
        localAudioId
      })
        .then((res) => {
          console.log('播放成功', res)
        })
        .catch((err) => {})
    },
    download(item) {
      const rbacToken = localStorage.getItem('rbacToken')
      window.location.href = `${getBasicUrl()}/fyGric/sysFile/download/${item}?rbacToken=${rbacToken}`
    }
  }
}
</script>

<style lang="less" scoped>
.file_dom_box {
  .image_style {
    width: 150px;
    height: 150px;
  }
  .yvying_style {
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 8px;
    > img {
      width: 50px;
      height: 50px;
    }
  }

  .otherFileStyle {
    color: #428ffc;
    word-wrap: break-word;
  }
}
</style>
