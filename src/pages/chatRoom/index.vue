<template>
  <div class="max_box">
    <div class="contnet_max_box">
      <!-- 事件详情 -->
      <div class="event_info_box">
        <div class="info_head_box">
          {{
            eventInfo.eventSubject && eventInfo.eventSubject.length > 20
              ? eventInfo.eventSubject.substring(0, 20) + '...'
              : eventInfo.eventSubject
          }}
        </div>
        <div class="info_content_box">
          {{
            eventInfo.eventContent && eventInfo.eventContent.length > 50
              ? eventInfo.eventContent.substring(0, 50) + '...'
              : eventInfo.eventContent
          }}
          <a @click="viewDetail()">查看详情>></a>
        </div>
      </div>
      <!-- 主体内容 -->
      <div id="contnet_box_1" @scroll="scrollEvent" class="contnet_box">
        <div v-for="(item, idx) in chatList" :key="idx">
          <div class="chat_box_style left_chat_box" v-if="item.isSendUser == 0">
            <div>
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
                <div class="text_content_box" v-if="item.content">
                  {{ !!!item.peopleNames ? item.content : '' }}
                  <div v-if="!!item.peopleNames" class="at_box">
                    <div
                      v-for="(item2, idx2) in optionAtString(item)"
                      :class="item2.type == 2 ? 'at_style' : ''"
                      :key="idx2"
                    >
                      {{ item2.content }}
                    </div>
                  </div>
                </div>
                <div class="file_content_box" v-else>
                  <Filedom
                    :fileObj="item.file"
                    :fileId="item.fileId"
                    :item="item"
                  ></Filedom>
                </div>
              </div>
              <div class="tip_box">{{ item.readMessage }}</div>
            </div>
          </div>

          <div class="chat_box_style right_chat_box" v-else>
            <div class="text_box">
              <div>
                <div class="text_content_box" v-if="item.content">
                  {{ !!!item.peopleNames ? item.content : '' }}
                  <div v-if="!!item.peopleNames" class="at_box">
                    <div
                      v-for="(item2, idx2) in optionAtString(item)"
                      :class="item2.type == 2 ? 'at_style' : ''"
                      :key="idx2"
                    >
                      {{ item2.content }}
                    </div>
                  </div>
                </div>
                <div class="file_content_box" v-else>
                  <Filedom
                    :fileObj="item.file"
                    :fileId="item.fileId"
                    :item="item"
                  ></Filedom>
                </div>
              </div>
              <div class="tip_box">{{ item.readMessage }}</div>
            </div>
            <div>
              <img src="../../assets/image/peopleIcon.png" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom_tool_box">
      <div
        class="bottom_tool_item"
        v-for="(item, idx) in tool_items"
        :key="idx"
        @click="toolChlick(item.type)"
      >
        <img :src="item.imageUrl" />
        <span>{{ item.name }}</span>
      </div>
    </div>

    <div class="foot_box">
      <img src="../../assets/image/u1.png" @click="audioFlag = !audioFlag" />
      <div
        class="video_box"
        v-if="!audioFlag"
        @touchstart.prevent="showDeleteButton()"
        @touchend.prevent="clearLoop()"
      >
        按 住 录 音
      </div>
      <input
        v-if="audioFlag"
        placeholder="单行输入"
        v-model="value"
        :style="!!value ? { width: '75%' } : { width: '80%' }"
        @input="AtPeopleList($event)"
      />
      <div v-if="audioFlag">
        <div class="but_style" @click="sendInfo(1)" v-if="!!value">发送</div>
        <img
          v-else
          src="../../assets/image/u2.png"
          @click="popupVisible2 = true"
        />
      </div>
    </div>

    <!-- 其他东西 -->
    <!-- 打开文件上传 -->
    <input
      @change="fileChange"
      style="display: none"
      multiple
      type="file"
      name=""
      id="aa"
    />

    <div v-if="recordVoidImageState" class="recordVoidStyle">
      <img src="@/assets/image/maike.png" />
      <div>语音录取中...</div>
    </div>

    <van-popup v-model="popupVisible" position="bottom" v-if="popupVisible">
      <div class="pop_box">
        <div
          v-for="(item, idx) in atPeopleList"
          :key="idx"
          class="atPeopleItem"
          @click="chooseAtPeople(idx)"
        >
          {{ item.name }}
        </div>
      </div>
    </van-popup>

    <van-popup v-model="popupVisible2" position="bottom" v-if="popupVisible2">
      <div class="pop_box2">
        <div class="but_style_box">
          <div
            class="style_item"
            v-for="(item, idx) in tool_items2"
            :key="idx"
            @click="toolChlick(item.type)"
          >
            <div>
              <img :src="item.imageUrl" />
            </div>
            {{ item.name }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  getqueryJudgeRecordPage,
  handleDangerEventDetails,
  queryChatRoomMemberPage,
  sendDingWork,
  upload,
  getConfigfyGric,
  getUserfyGric
} from '../../api/a.js'
import Filedom from './components/fileDom.vue'
import ding from '@/common/ding'
export default {
  components: {
    Filedom
  },
  async mounted() {
    // localStorage.setItem('rbacToken', '14f4d730b6d549df8d80fe47a0196c3b')
    // '14f4d730b6d549df8d80fe47a0196c3b'
    // 'bea57b9dcb1b4da282a4f9e22daadf9a'
    if (!!this.$route.query.type) {
      this.init()
    } else {
      this.GC()
    }
  },

  data() {
    return {
      chatList: [],
      eventInfo: {}, //事件详情
      eventId: this.$route.query.id, // || '90c00fbb0028423fa28adb47fe9a7d05',
      wsObj: null,
      popupVisible: false,
      popupVisible2: false,
      popType: 0,
      atPeopleList: [],
      value: '', // 输入框内容
      selectPeopleList: [],
      tool_items: [
        // {
        //   name: '群文件',
        //   imageUrl: require('../../assets/image/uu1.png'),
        //   type: 1
        // },
        {
          name: '文件上传',
          imageUrl: require('../../assets/image/uu2.png'),
          type: 6
        },
        {
          name: '聊天记录',
          imageUrl: require('../../assets/image/uu3.png'),
          type: 3
        },
        {
          name: '人员群组',
          imageUrl: require('../../assets/image/uu4.png'),
          type: 5
        }
      ],
      tool_items2: [
        {
          name: '文件上传',
          imageUrl: require('../../assets/image/hsyp_1.png'),
          type: 6
        },
        {
          name: '视频会议',
          imageUrl: require('../../assets/image/hsyp_3.png'),
          type: 7
        },
        {
          name: '聊天记录',
          imageUrl: require('../../assets/image/hsyp_2.png'),
          type: 3
        },
        {
          name: '文件管理',
          imageUrl: require('../../assets/image/hsyp_1.png'),
          type: 2
        }
      ],
      recordVoidImageState: false, // 按住录音的时候出一个图片
      audioFlag: true, // 录音开关
      audioId: '',
      pageNo: 1,
      pageSize: 200,
      pageTotal: 0
    }
  },

  methods: {
    async init() {
      const _that = this

      if (!!_that.wsObj) {
        _that.wsObj.close()
      }
      // https://pazht.ouhai.gov.cn:8000 线上地址 wss
      // http://192.168.1.234:14005 线下地址 ws
      // 测试
      // var ws = new WebSocket(
      //   `ws://192.168.1.234:14005/ws?rbacToken=${localStorage.getItem(
      //     'rbacToken'
      //   )}&group=${this.eventId}`
      // )
      // 线上
      var ws = new WebSocket(
        `wss://pazht.ouhai.gov.cn:8000/ws?rbacToken=${localStorage.getItem(
          'rbacToken'
        )}&group=${this.eventId}`
      )
      ws.onopen = function () {
        console.log('连接成功.')
      }

      ws.onmessage = function (message) {
        const { data } = message
        let dataForm = JSON.parse(data)
        if (dataForm.data && !!dataForm.data.fileId) {
          setTimeout(() => {
            _that.getHistory(_that)
          }, 500)
        } else {
          _that.getHistory(_that)
        }

        console.log(dataForm, '拿到消息了')
        // if (dataForm.success == 1) {
        //   let data = dataForm.data
        //   //   _that.chatList.push({ ...data })
        // }
        // _that.$forceUpdate()
        // message.data 过来的消息
      }

      ws.onclose = function () {
        console.log('连接关闭')
      }

      ws.onerror = function (e) {
        console.log(e, '连接异常')
      }

      this.wsObj = ws

      this.getEventInfo()
      this.getHistory()

      let data = await queryChatRoomMemberPage({
        pageNo: 1,
        pageSize: 500,
        id: this.eventId
      })

      this.atPeopleList = data.data.data

      let GCS = await getConfigfyGric({ dingId: ding.dingId })
      let config = GCS.data
      this.config = config
    },

    async sendInfo(type, fileId) {
      let data = {}

      if (type == 1) {
        // 验证一波是否有@人
        let atPeopleList = []
        if (this.selectPeopleList.length > 0) {
          dd.device.notification.showPreloader({
            text: '提交中..',
            showIcon: true,
            async onSuccess(result) {},
            onFail: function (err) {}
          })

          let ids = []
          this.selectPeopleList.map((res) => {
            if (this.value.indexOf(res.name) > -1) {
              ids.push(res.id)
              atPeopleList.push(res.name)
            }
          })
          for (let i = 0; i < ids.length; i++) {
            const element = ids[i]
            await sendDingWork({
              group: this.eventId,
              userId: element
            })
          }
          dd.device.notification.hidePreloader({
            onSuccess: function (result) {},
            onFail: function (err) {}
          })
        }
        // 文字
        data = {
          messageType: 2,
          content: this.value,
          contentType: 1,
          peopleNames: atPeopleList.join(','),
          // fileId: '11',
          messageTime: this.getNowFormatDate()
        }
      } else {
        // 文件
        data = {
          messageType: 2,
          contentType: 1,
          fileId: fileId,
          messageTime: this.getNowFormatDate()
        }
      }
      //   this.resoveChatList()
      this.wsObj.send(JSON.stringify(data))
      if (type == 1) {
        this.value = ''
      }
    },

    //  重置聊天列表
    resoveChatList() {
      this.pageNo = 1
      this.chatList = []
    },

    // 获取历史信息
    async getHistory(that, type) {
      let _that = that || this
      let returnData = await getqueryJudgeRecordPage({
        group: _that.eventId,
        pageNo: _that.pageNo,
        pageSize: _that.pageSize
      })
      _that.pageTotal = returnData.data.total
      let newList = returnData.data.data.reverse()
      //   _that.chatList = [...newList, ..._that.chatList]
      _that.chatList = newList
      if (type == 'load') {
      } else {
      }
    },

    // 获取会商研判具体内容
    async getEventInfo() {
      let info = await handleDangerEventDetails({ id: this.eventId })
      const { data, success } = info
      if (success == 1) {
        this.eventInfo = data
      }
    },

    // 获取时间
    getNowFormatDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour
      }
      if (minute >= 0 && minute <= 9) {
        minute = '0' + minute
      }
      if (second >= 0 && second <= 9) {
        second = '0' + second
      }
      return (
        year +
        '-' +
        month +
        '-' +
        strDate +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      )
    },

    // 文件上传
    uploadFn() {
      document.getElementById('aa').click()
    },

    // 上传图片
    async fileChange(e) {
      let sendData = new FormData()
      const files = [...e.target.files]
      if (files.length > 1) {
        dd.alert({
          message: '最多只能上传1个文件',
          title: '提示',
          button: '收到'
        })
        return false
      }
      if (files && files.length) {
        dd.showLoading({
          text: '文件上传中..' //提示信息
        })
        files.forEach((v) => {
          sendData.append('files', v)
        })
        sendData.append('rbacToken', localStorage.getItem('rbacToken'))
        const data = await upload(sendData)
        dd.hideLoading({})
        let fileId = ''
        if (data.success && data.data && data.data.length) {
          data.data.forEach((v, i) => {
            var obj = {}
            obj.fileType = files[i].type
            obj.fileName = files[i].name
            obj.fileId = v
            fileId = obj.fileId
          })
        }
        this.sendInfo(2, fileId)
      }
    },

    //  返回文件路径
    returnFileUrl(id) {
      let baseUrls = localStorage.getItem('url_oh') || process.env.baseUrl
      let url = `${baseUrls}/rbac/file/downloadRb/${id}?rbacToken=${localStorage.getItem(
        'rbacToken'
      )}`
      console.log(url)
      return url
    },

    //  触底 加载内容
    scrollEvent(e) {
      if (e.srcElement.scrollTop == 0) {
        if (this.pageTotal > this.chatList.length) {
          // 懒加载内容
          this.pageNo += 1
          //   this.getHistory(this, 'load')
        }
      }
    },

    async GC() {
      const that = this
      let GCS = ''
      let config = ''

      await new Promise((resolve) => {
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: ding.corpId,
            onSuccess(info) {
              let data = {
                code: info.code,
                corpid: ding.corpId,
                dingId: ding.dingId
              }
              getUserfyGric(data)
                .then((res) => {
                  if (res.success) {
                    const userInfo = res.data
                    localStorage.setItem('rbacToken', userInfo.rbacToken)
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    that.$store.commit('setToken', userInfo.rbacToken)
                    resolve(12)
                    let options = {
                      nick: userInfo.name,
                      userId: userInfo.empCode
                    }
                    maidian.jcxx(options)
                    if (userInfo.userPassword) {
                      // 若为首次登录发送桌面端账号密码;
                      dd.biz.ding.create({
                        users: [userInfo.emplId], // 用户列表，工号
                        corpId: ding.corpId, // 企业id
                        type: 1, // 附件类型 1：image  2：link
                        alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
                        attachment: {
                          images: ['']
                        }, // 附件信息
                        text:
                          '您的综治维稳管理平台账号为：' +
                          userInfo.userName +
                          '，密码为：' +
                          userInfo.userPassword +
                          '。请及时登录平台修改密码。（点击发送可将账号信息发至钉消息）', // 正文
                        bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
                        onFail: function () {}
                      })
                    }
                    getTeamWorkRightForAPP({}).then((res1) => {
                      if (res1.success) {
                        if (res1.data && res1.data.length && res1.data[0]) {
                          that.list = res1.data
                          let rightData = ''
                          that.list.map((item, index) => {
                            rightData += item.name + ','
                            if (item.tempList) {
                              item.tempList.map((item1, index1) => {
                                rightData += item1.name + ','
                              })
                            }
                          })
                          localStorage.setItem('rightData', rightData)
                          // that.list.push({ number: "10", displayName: "考核系统" });
                          // that.list.push({ number: "11", displayName: "领导包案" });
                        }
                        dd.hideLoading()
                        if (that.$route.query.pageType == 'assessment') {
                          that.detailRouter(1)
                        } else {
                          that.load = true
                        }
                      }
                    })
                  } else {
                    alert(res.message)
                  }
                })
                .catch((err) => {
                  console.log('err', err)
                })
            }
          })
        })
      })

      this.init()
      return
      if (config) {
        dd.authConfig({
          ticket: config.jsticket,
          jsApiList: [
            'alert',
            'chosen',
            'locateOnMap',
            'searchOnMap',
            'getGeolocation',
            'openPage',
            'startGeolocation',
            'previewDoc'
          ]
        })
          .then(async (res) => {
            if (that.nums == 1) {
              console.log(res, '鉴权成功 getConfigfyGric')
            }
            if (that.nums == 2 || that.nums == 3) {
              console.log(res, '鉴权成功 updateJspticketfyGric')
            }
          })
          .catch(async (err) => {
            if (that.nums == 1) {
              console.log(err, '鉴权失败 getConfigfyGric')
            }
            if (that.nums == 2 || that.nums == 3) {
              console.log(err, '鉴权失败 updateJspticketfyGric')
            }
            that.nums += 1
            // that.GC()
          })
      }
    },

    // toolitem click
    toolChlick(type) {
      // 人员群组
      if (type == 5) {
        this.$router.push(`/chatRoom/peopleList?id=${this.eventId}`)
        return
      } else if (type == 7) {
        // 视频会议
        let ids = []
        let that = this
        this.atPeopleList.map((res) => {
          if (res.empAccountId) {
            ids.push(res.empAccountId)
          }
        })
        console.log(ids, '人员ids')
        console.log(that.config.jsticket)
        dd.authConfig({
          ticket: that.config.jsticket,
          jsApiList: [
            'alert',
            'locateOnMap',
            'searchOnMap',
            'getGeolocation',
            'openPage',
            'startGeolocation',
            'createVideoMeeting'
          ]
        })
          .then((res) => {
            console.log(res, '鉴权成功')
            dd.ready(function () {
              dd.createVideoMeeting({
                title: '会议名称', //会议名称
                calleeStaffIds: ids //人员列表
              })
                .then((res) => {
                  console.log(res, '123456')
                })
                .catch((err) => {
                  console.log(err, '调用api失败')
                })
            })
            // that.createVideoMeetingFn(that)
          })
          .catch((err) => {
            console.log(err, '鉴权失败')
          })
        return
      } else if (type == 6) {
        // 文件上传
        this.uploadFn()
        return
      }
      // 聊天记录
      this.$router.push(`/chatRoom/history?type=${type}&id=${this.eventId}`)
    },

    // 查看详情
    viewDetail() {
      this.$router.push('/common/details?id=' + this.eventId)
      // this.$route.query.id
    },

    //录音
    showDeleteButton() {
      var that = this
      this.Loop = setTimeout(function () {
        that.Loop = 0
        dd.startRecordAudio()
          .then((res) => {
            that.recordVoidImageState = true
            console.log('开始录音')
          })
          .catch((err) => {})
      }, 300)
    },

    async clearLoop() {
      const _that = this
      clearTimeout(this.Loop)
      console.log('结束1')
      let mediaId = await new Promise((resolve) => {
        _that.recordVoidImageState = false
        dd.device.notification.showPreloader({
          text: '语音发送中..',
          showIcon: true,
          async onSuccess(result) {
            dd.stopRecordAudio()
              .then((res) => {
                console.log('结束2')
                resolve(res.mediaId)
              })
              .catch((err) => {
                resolve(null)
              })
          }
        })
      })

      dd.device.notification.hidePreloader({
        onSuccess: function (result) {},
        onFail: function (err) {}
      })

      if (!!mediaId) {
        _that.sendInfo(2, mediaId)
      }
    },

    // 输入框有内容的时候 弹出弹出框
    AtPeopleList(e) {
      if (e.data == '@') {
        setTimeout(() => {
          this.popupVisible = true
        }, 400)
      }
    },

    // 选择at的人员
    chooseAtPeople(idx) {
      let data = this.atPeopleList[idx]
      this.value = this.value + data.name
      this.selectPeopleList.push({
        id: data.id,
        name: '@' + data.name
      })
      setTimeout(() => {
        this.popupVisible = false
      }, 400)
    },

    optionAtString(e) {
      let newArry = []
      let peopleNamesArry = e.peopleNames.split(',')
      let stringBasic = e.content

      peopleNamesArry.map((res) => {
        stringBasic = stringBasic.replaceAll(res, ',' + res + ',')
      })

      let arr = stringBasic.split(',')
      arr = arr.filter((item) => item)
      arr.map((res) => {
        if (peopleNamesArry.indexOf(res) > -1) {
          newArry.push({
            type: 2,
            content: res
          })
        } else {
          newArry.push({
            type: 1,
            content: res
          })
        }
      })
      console.log(newArry)
      return newArry
    }
  },
  updated() {
    // 聊天定位到底部
    let ele = document.getElementById('contnet_box_1')
    ele.scrollTop = ele.scrollHeight
  }
}
</script>

<style lang="less" scoped>
.max_box {
  background-color: white;
  .contnet_max_box {
    height: calc(100vh - 210px);
    overflow: auto;
    padding: 24px 0px 0px;
    .event_info_box {
      width: 80%;
      margin: 0px auto;
      border: 1px solid #e7e7e7;
      padding: 10px;
      border-radius: 8px;
      height: 15vh;
      margin-bottom: 5%;
      overflow: hidden;
      .info_head_box {
        border-bottom: 1px solid #e7e7e7;
        padding: 10px;
        font-weight: bold;
        font-size: 32px;
      }
      .info_content_box {
        padding: 10px;
        word-break: break-all;
        > a {
          margin-left: 10px;
          color: #2785f8;
        }
      }
    }
    .contnet_box {
      height: 80%;
      padding: 24px;
      overflow: auto;
      .chat_box_style {
        display: flex;
        margin-bottom: 48px;
        width: 100%;
        img {
          width: 85px;
          height: 85px;
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

          .at_box {
            display: flex;
            flex-wrap: wrap;
            .at_style {
              color: #428ffc;
            }
          }
        }
        .tip_box {
          font-size: 20px;
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
      .left_chat_box {
        .text_box {
          margin-left: 24px;
        }
        .file_content_box {
          text-align: left;
        }
      }
      .right_chat_box {
        .text_box {
          margin-right: 24px;
          .tip_box {
            text-align: right;
          }
        }
        .file_content_box {
          text-align: right;
        }
      }
    }
  }

  .bottom_tool_box {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .bottom_tool_item {
      border-radius: 5px;
      padding: 8px;
      background-color: #f8f8f8;
      margin-right: 10px;
      > img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
  }

  .foot_box {
    display: flex;
    height: 130px;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: white;
    border-top: 1px solid gray;
    .video_box {
      width: 90%;
      padding: 13px 0px;
      text-align: center;
      background-color: #f3f4f8;
      border-radius: 8px;
    }
    img {
      width: 0.7rem;
      height: 0.7rem;
    }
    .input_divbox_style {
      border: 2px solid gray;
      padding: 10px 15px;
      border-radius: 8px;
      display: flex;
      a {
        background-color: red;
      }
    }
    input {
      padding: 14px 10px;
      border-radius: 8px;
      background-color: #f3f4f8;
      font-size: 25px;
    }
    .but_style {
      padding: 10px 18px;
      border-radius: 8px;
      color: white;
      text-align: center;
      background-color: #5087ec;
    }
  }

  .pop_box {
    height: 60vh;
    overflow: auto;
    padding: 24px;

    .atPeopleItem {
      padding: 12px;
      margin-bottom: 10px;
      border: 2px solid #808080;
      border-radius: 8px;
    }
  }

  .pop_box2 {
    overflow: auto;
    padding: 24px;
    .but_style_box {
      display: flex;
      flex-wrap: wrap;
      .style_item {
        // border: 2px solid gray;
        // border-radius: 8px;
        padding: 5px;
        width: 25%;
        text-align: center;
      }
    }
  }

  .recordVoidStyle {
    position: fixed;
    top: 50vh;
    left: 35vw;
    height: 220px;
    width: 220px;
    background-color: #f3f4f8;
    border-radius: 8px;
    text-align: center;
    padding-top: 25px;
    > img {
      width: 120px;
      height: 120px;
    }
  }
}
</style>