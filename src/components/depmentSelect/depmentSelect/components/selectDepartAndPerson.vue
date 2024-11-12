<template>
  <div class="select_max_box">
    <div class="head_box">人员选择</div>
    <div class="line_style_box" @click="clickChoose('depment')">
      <span class="left_box"
        >{{ !!saveDepmentInfo ? saveDepmentInfo.name : '请选择部门' }}
      </span>
      <span class="right_box" >></span>
    </div>

    <div class="line_style_box" @click="clickChoose('people')">
      <span class="left_box">
        {{ savePeopleInfo.length == 0 ? '请选择人员' : '' }}
        <div>
          <span
            v-for="(item, idx) in savePeopleInfo"
            :key="idx"
            class="peopleBox_style"
            >{{ item.name }}{{savePeopleInfo.length-2 >= idx ? ',' : ''}}</span
          >
        </div>
      </span>
      <span class="right_box" >></span>
    </div>
    <div class="but_box">
      <div style="width: 100%" class="but_style" @click="saveInfo()">
        确 认 提 交
      </div>
    </div>

    <!-- 弹出框 -->
    <van-popup v-model="popupVisible1" position="bottom">
      <Newselect
        @comeBack="comeBack(1)"
        @sendValue="confirm($event, 'depment')"
        :dataList="depmentList"
      ></Newselect>
    </van-popup>
    <van-popup v-model="popupVisible2" position="bottom" v-if="popupVisible2">
      <Newselect
        @comeBack="comeBack(2)"
        @sendValue="confirm($event, 'people')"
        :dataList="peopleList"
        componeType="people"
        :muitiple="muitiple"
      ></Newselect>
    </van-popup>
  </div>
</template>

<script>
import store from '@/store/index'

import { Notify } from 'vant'
import Newselect from './_new_list/index.vue'
import { getDepartmentTree, getDepartmentUserList ,getCaseLeader } from '@/api/a'
export default {
  props: {
    muitiple: {
      type: Boolean,
      default: false
    },
    arrangedCaseType: {
      type: String || null,
      default: null
    }
  },
  components: {
    Newselect
  },
  mounted() {
    console.log('eee');
    this.depmentList = store.state.common.depmentList;
    // this.getDepmentList()
  },
  data() {
    return {
      popupVisible1: false,
      popupVisible2: false,
      checkList: [],
      depmentList: [], // 部门列表
      peopleList: [], // 人员列表
      lastDepmentId: '',
      // 保存的部门信息
      saveDepmentInfo: null,
      savePeopleInfo: [],
      // 最终保存的内容
      endsaveInfo: [
        // {
        //   depmentId: '',
        //   depmentName: '',
        //   peopleList: [
        //     {
        //       name: '',
        //       id: ''
        //     }
        //   ]
        // }
      ]
    }
  },
  methods: {
    // 获取部门列表
    async getDepmentList() {
      let list = await getDepartmentTree()
      const { data, success } = list
      if (success == 1) {
        this.depmentList = data
      }
    },

    // 获取人员列表
    async getPeopleList() {
      let data1=  [];
      if(this.arrangedCaseType){
        //选择包案领导
        data1 = await getCaseLeader({
          id: this.lastDepmentId,
          arrangedCaseType: this.arrangedCaseType,
        })
      }else{
        data1 = await getDepartmentUserList({
          id: this.lastDepmentId
        })
      }
      const { data, success } = data1;
      if (success == 1) {
        this.savePeopleInfo = [];
        this.peopleList = data;
      }
    },

    // 打开 弹出框
    async clickChoose(type) {
      const that = this;
      if (type == 'depment') {
        this.popupVisible1 = true
      } else {
        if (!!!this.saveDepmentInfo) {
          Notify({ type: 'warning', message: '部门未选择' })
          return
        }
        // 本地测试环境下启用
        // await that.getPeopleList();
        // that.popupVisible2 = true;
        // return
        dd.device.notification.showPreloader({
              text: '正在加载..',
              showIcon: true,
              async onSuccess(result) {
                await that.getPeopleList();
                that.popupVisible2 = true;
                dd.device.notification.hidePreloader({
                  onSuccess: function (result) {},
                  onFail: function (err) {}
                })
              },
              onFail: function (err) {}
            })
      }
    },
    comeBack(type) {
      if (type == 1) {
        this.popupVisible1 = false
      } else {
        this.popupVisible2 = false
      }
    },

    // 获取数据
    async confirm(val, back) {
      if (back == 'people') {
        const { id, name } = this.saveDepmentInfo
        let newPeopleList = []
        this.savePeopleInfo = val

        val.map((res) => {
          newPeopleList.push({
            name: res.name,
            id: res.id
          })
        })
        this.endsaveInfo.push({
          id: id,
          name: name,
          userList:newPeopleList,
        })
        this.popupVisible2 = false
      } else {
        this.peopleList = [];
        const [depmentInfo] = val
        this.lastDepmentId = depmentInfo.id
        this.saveDepmentInfo = depmentInfo
        this.popupVisible1 = false;
        if(this.arrangedCaseType){
          await this.getPeopleList()
        }
      }
    },
    backConfirm(val) {},
    saveInfo() {
      this.$emit('saveInfo', this.endsaveInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.select_max_box {
  padding: 12px;
  .head_box {
    margin-bottom: 12px;
  }
  .line_style_box {
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #999999;
    padding: 12px 24px 12px 12px;

    .left_box {
    }
    .right_box {
      font-size: 48px;
    }
    .peopleBox_style {
    }
  }
  .but_box {
    width: 100%;
    margin-top: 24px;
    .but_style {
      background-color: #1989fa;
      color: white;
      text-align: center;
      padding: 15px 0px;
      border-radius: 8px;
    }
  }
}
</style>