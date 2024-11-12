<template>
  <div class="pop_box">
    <div v-if="type == 3">
      <div class="pop_top_box">
        <van-search
          style="width: 100%"
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          show-action
          @input="onSearch($event)"
          @cancel="onCancel"
        />
      </div>

      <div class="pox_content_box">
        <div
          class="chat_box_style"
          v-for="(item, idx) in searchChatList"
          :key="idx"
        >
          <div style="margin-right: 10px">
            <img src="../../assets/image/peopleIcon.png" />
          </div>
          <div class="text_box">
            <div>
              <div class="text_name_box">
                {{ item.fromUserName }}
                <span style="font-size: 14px; color: gray">
                  ({{ item.fromDepartmentName }})</span
                >
              </div>
              <div class="text_content_box" v-if="!!item.content">
                {{ item.content }}
              </div>
              <div style="width: 75vw" v-else>
                <Filedom
                  :fileObj="item.file"
                  :fileId="item.fileId"
                  :item="item"
                ></Filedom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="pox_content_box">
          <div class="file_list_box">
            <div class="file_list_item_box">
              <div class="item_head">
                <div>人<span>（职位）</span></div>
                <div>时间</div>
              </div>
              <div>
                <img />
                <div>
                  <div>文件名称</div>
                  <div>大小</div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
    <div v-if="type == 2">
      <div class="pox_content_box">
        <div class="file_list_image_box2">
          <div
            class="file_item_style"
            v-for="(item, idx) in chatList"
            :key="idx"
            @click="download(item.file)"
          >
            文件名称：<span>{{ item.file.fileName }}</span>
            <div style="margin-top: 5px">
              文件类型：<span>{{ item.file.fileType }}</span>
            </div>
          </div>
        </div>
        <!-- <div class="file_list_image_box">
          <div
            v-for="(item, idx) in chatList"
            :key="idx"
            style="width: 25%; height: 25%"
          >
            <img
              v-if="judgeFiletype(item) == 1"
              :src="returnFileUrl(item.file.fileId)"
              @click="preverImage(item.file.fileId)"
            />
            <div v-if="judgeFiletype(item) == 2" class="otherFileStyle">
              <img
                src="@/assets/image/otherFileType.png"
                style="padding-top: 10px"
              />
              <div>其他类型文件</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  getqueryJudgeRecordPage,
  queryJudgeFileRecordPage,
  getBasicUrl
} from '../../api/a.js'
import { ImagePreview } from 'vant'
import Filedom from './components/fileDom.vue'
export default {
  components: {
    Filedom
  },
  data() {
    return {
      searchValue: '', // 搜索框内容
      searchChatList: [], // 搜索的聊天记录
      timeOut1: null,
      type: 3 || this.$route.query.type,
      eventId: this.$route.query.id,
      chatList: []
    }
  },
  created() {
    this.init()
  },
  beforeRouteEnter(to, from, next) {
    const { query } = to
    next((vm) => {
      vm.type = query.type
      vm.id = query.id
    })
  },
  methods: {
    async init() {
      if (this.type == 2) {
      } else if (this.type == 3) {
        this.getImageList()
      }
    },
    // 历史记录
    onSearch(val) {
      clearTimeout(this.timeOut1)
      this.timeOut1 = setTimeout(() => {
        this.getHistoryInfo(val)
      }, 700)
    },

    onCancel(e) {
      this.searchChatList = []
    },

    // 获取历史信息 - 模糊查询
    async getHistoryInfo(value) {
      let _that = this
      if (!!!value) {
        return
      }
      let listData = await getqueryJudgeRecordPage({
        group: _that.eventId,
        keyword: value,
        pageNo: 1,
        pageSize: -1
      })
      const { data } = listData
      this.searchChatList = data.data
    },

    // 获取图片列表
    async getImageList() {
      let data = await queryJudgeFileRecordPage({
        group: this.eventId
      })
      let list = data.data.data
      list = list.filter((res) => {
        if (!!res.file) {
          return res
        }
      })
      console.log(list)
      this.chatList = list
    },

    // 返回文件url地址
    returnFileUrl(fileId) {
      let url = `${getBasicUrl()}/fyGric/sysFile/download/${fileId}?rbacToken=${localStorage.getItem(
        'rbacToken'
      )}`
      return url
    },

    // 图片预览
    preverImage(fileId) {
      let url = this.returnFileUrl(fileId)
      ImagePreview([url])
    },

    download(item) {
      const rbacToken = localStorage.getItem('rbacToken')
      window.location.href = `${getBasicUrl()}/fyGric/sysFile/download/${
        item.fileId
      }?rbacToken=${rbacToken}`
    },

    // 判断文件类型
    judgeFiletype(item) {
      const { fileId, file } = item
      // 1 图片 3其他
      if (file.fileType.indexOf('image') > -1) {
        return 1
      } else {
        return 2
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pop_box {
  height: 100vh;
  width: 100%;
  /deep/ .van-cell {
    input {
      font-size: 28px !important;
    }
  }
  /deep/ .van-search__action {
    font-size: 28px !important;
  }
  /deep/ .van-field__left-icon {
    padding-top: 10px;
  }
  .pop_top_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 12px;
    .top_but_style {
      background-color: #008cff;
      color: white;
      padding: 10px 24px;
      border-radius: 8px;
    }
  }
  .pox_content_box {
    padding-bottom: 24px;
    // 聊天记录
    .chat_box_style {
      display: flex;
      margin-bottom: 48px;
      width: 100%;
      padding: 0px 24px;
      img {
        width: 95px;
        height: 95px;
      }

      // 文字内容
      .text_name_box {
        margin-bottom: 10px;
        line-height: 28px;
      }
      .text_content_box {
        padding: 12px;
        border-radius: 8px;
        width: 75vw;
        background-color: #f8f8f8;
      }
      .tip_box {
        font-size: 12px;
        margin-top: 5px;
      }

      // 文件内容
      .file_content_box {
        width: 75vw;
        > img {
          width: 3rem;
          height: 3rem;
        }
      }
    }

    // 文件列表
    .file_list_box {
      .file_list_item_box {
        .item_head {
          display: flex;
          justify-content: space-between;
        }
        .item_body {
          display: flex;
        }
      }
    }

    // 图片列表
    .file_list_image_box {
      display: flex;
      flex-wrap: wrap;
      img {
        width: 100%;
        height: 15vh;
        margin-right: 1%;
        margin-bottom: 1%;
        // border: 1px solid gray;
        border-radius: 5px;
      }
      .otherFileStyle {
        text-align: center;
        border: 2px solid #e6e6e6;
        border-radius: 8px;
        width: 100%;
        height: 15vh;
        > img {
          width: 50%;
          height: 50%;
        }
      }
    }

    .file_list_image_box2 {
      .file_item_style {
        padding: 24px;
        border-bottom: 2px solid #e6e6e6;
        span {
          color: gray;
        }
      }
    }
  }
}
</style>