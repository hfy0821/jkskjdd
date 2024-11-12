<template>
  <div class="max_box">
    <div class="box_style">
      <div class="box_title">群人员</div>
      <div class="box_content">
        <div class="content_item" v-for="(item, idx) in peopleList" :key="idx">
          <img src="../../assets/image/peopleIcon.png" />
          <div>
            {{ item.name }}
          </div>
        </div>
        <div class="content_item" @click="popupVisible = true">
          <img src="@/assets/image/add_img.png" />
          <!-- <div>添加人员</div> -->
        </div>
      </div>
    </div>
    <div
      class="box_style flex_style"
      v-for="(item, idx) in tabsList"
      @click="toolChlick(item.type)"
      :key="idx"
    >
      <div>{{ item.name }}</div>
      <span>></span>
    </div>

    <multiSelectOdd
      v-if="popupVisible"
      :multiSelectOddData="SelectList"
      @multiSelectOddReturn="multiSelectOddReturn"
    />

    <!-- <van-popup v-model="popupVisible" position="bottom" v-if="popupVisible">
      <Depmentselect
        @saveInfo="SaveInfo($event)"
        :muitiple="false"
        :arrangedCaseType="arrangedCaseType"
      ></Depmentselect>
    </van-popup> -->
  </div>
</template>

<script>
import {
  queryChatRoomMemberPage,
  addChatRoomMember,
  getMeeetingAddList
} from '../../api/a.js'
import Depmentselect from '@/components/depmentSelect'
import multiSelectOdd from '@/components/multiSelect_odd'
export default {
  components: {
    multiSelectOdd,
    Depmentselect
  },
  data() {
    return {
      peopleList: [],
      popupVisible: false,
      eventId: null,
      SelectList: [],
      tabsList: [
        { name: '图片', type: 2 },
        { name: '查看聊天记录', type: 3 }
      ]
    }
  },
  async mounted() {
    this.eventId = this.$route.query.id
    this.getPeople()
    let list = await getMeeetingAddList({
      id: this.eventId
    })
    this.SelectList = list.data
  },
  methods: {
    async getPeople() {
      let data = await queryChatRoomMemberPage({
        id: this.$route.query.id,
        pageSize: -1,
        pageNo: 1
      })
      this.peopleList = data.data.data
    },
    async SaveInfo(e) {
      //  保存的数据
      //   this.saveInfo = [...this.saveInfo, ...e]
      const [oneInfo] = e
      const [oneUse] = oneInfo.userList
      let useId = oneUse.id
      let data = await addChatRoomMember({
        departmentId: oneInfo.id,
        userId: useId,
        group: this.eventId
      })
      if (data.success) {
        dd.device.notification
          .toast({
            duration: 20,
            delay: 82,
            onFail: `onFail示例值`,
            icon: `icon示例值`,
            text: `操作成功`,
            onSuccess: `onSuccess示例值`
          })
          .then((res) => {})
          .catch((err) => {})

        this.popupVisible = false
        this.getPeople()
        this.$forceUpdate()
      }
    },
    toolChlick(type) {
      this.$router.push(`/chatRoom/history?type=${type}&id=${this.eventId}`)
    },
    // 搜索 查询
    async multiSelectOddReturn(data) {
      let that = this
      that.popupVisible = data.status
      if (data.id) {
        let data1 = await addChatRoomMember({
          departmentId: '',
          userId: data.id,
          group: that.eventId
        })
        if (data1.success) {
          dd.device.notification
            .toast({
              duration: 20,
              delay: 82,
              onFail: `onFail示例值`,
              icon: `icon示例值`,
              text: `操作成功`,
              onSuccess: `onSuccess示例值`
            })
            .then((res) => {})
            .catch((err) => {})
          // 重新刷新列表
          let list = await getMeeetingAddList({
            id: this.eventId
          })
          this.SelectList = list.data
          that.popupVisible = false
          that.getPeople()
          that.$forceUpdate()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.max_box {
  .box_style {
    padding: 24px;
    border-bottom: 2px solid #dee3e9;
    .box_title {
    }
    .box_content {
      display: flex;
      flex-wrap: wrap;
      padding: 12px;
      .content_item {
        text-align: center;
        width: 20%;
        padding: 10px 3px;
        > img {
          width: 80px;
          height: 80px;
          border-radius: 8px;
        }
      }
    }
  }
  .flex_style {
    display: flex;
    justify-content: space-between;
    align-content: center;
    > span {
      font-size: 34px;
    }
  }
}
</style>