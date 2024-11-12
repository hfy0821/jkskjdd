<template>
  <div class="max_box">
    <div class="content_box">
      <div class="depment_max_box">
        <div
          class="depment_item_box"
          v-for="(item, idx) in saveInfo"
          :key="idx"
        >
          <span style="margin-bottom: 5px; display: inline-block"
            >{{ item.name }}：
            <img
              @click="delItem(idx)"
              src="../../assets/image/icon5.png"
              style="width: 14px; height: 14px"
            />
          </span>
          <div style="display: flex; flex-wrap: wrap">
            <div
              class="item_style"
              v-for="(item2, idx2) in item.userList"
              :key="idx2"
            >
              {{ item2.name }}
            </div>
          </div>
        </div>
      </div>
      <a v-if="single && saveInfo.length > 0"></a>
      <a  v-else @click="addDepment()" style="color: #0180ff">{{addText}}</a>
    </div>
    <van-popup v-model="popupVisible" position="bottom" v-if="popupVisible">
      <Depmentselect
        @saveInfo="SaveInfo($event)"
        :muitiple="muitiple"
        :arrangedCaseType="arrangedCaseType"
      ></Depmentselect>
    </van-popup>
  </div>
</template>

<script>
import Depmentselect from './components/selectDepartAndPerson'
export default {
  props: {
    selectedList: {
      type: Array || null,
      default: null
    },
    single: {
      type: Boolean,
      default: false
    },
    muitiple: {
      type: Boolean,
      default: false
    },
    arrangedCaseType: {
      type: String || null,
      default: null
    },
    addText:{
      type: String,
      default: "添加部门"
    }
  },
  components: {
    Depmentselect
  },
  data() {
    return {
      popupVisible: false,
      saveInfo: [
        // {
        //   depmentId: '',
        //   depmentName: '',
        //   userList: [
        //     {
        //       name: '',
        //       id: ''
        //     }
        //   ]
        // }
      ]
    }
  },
  watch: {
    
    selectedList(new1, old1){
      console.log('selectedList', new1);
      if(new1.length > 0){
        this.saveInfo = this.selectedList;
      }
    },
    muitiple(new1, old1) {
      if (!new1) {
       this.saveInfo = []
      }
      this.sendInfo()
    },
  },
  mounted(){
  },
  methods: {
    addDepment() {
      this.popupVisible = true
    },
    SaveInfo(e) {
      //  保存的数据
      console.log('muitiple', e);
      //   this.saveInfo = [...this.saveInfo, ...e]
      const [oneInfo] = e
      let flag = true
      for (let i = 0; i < this.saveInfo.length; i++) {
        const element = this.saveInfo[i]
        if (element.id == oneInfo.id) {
          flag = false
          let userList = element.userList
          userList = userList.concat(oneInfo.userList)
          userList = this.deWeightThree(userList)
          this.saveInfo[i].userList = userList
          break
        }
      }
      if (flag) {
        this.saveInfo = [...this.saveInfo, ...e]
      }
      this.popupVisible = false
      this.sendInfo()
      this.$forceUpdate()
    },
    delItem(idx) {
      this.saveInfo.splice(idx, 1)
      this.sendInfo()
    },
    deWeightThree(arry) {
      let map = new Map()
      for (let item of arry) {
        if (!map.has(item.name)) {
          map.set(item.name, item)
        }
      }
      return [...map.values()]
    },
    sendInfo() {
      this.$emit('GetDepmentSelectData', this.saveInfo)
    }
  }
}
</script>

<style lang="less">
.max_box {
  //   border-bottom: 1px solid gray;
  padding: 24px 12px 0px;
}
.content_box {
  display: flex;
  justify-content: space-between;
  font-size: 14px !important;
  .depment_max_box {
    max-width: 80%;
    overflow: auto;
    .depment_item_box {
      margin-bottom: 12px;
      .item_style {
        padding: 5px 10px;
        background-color: #409eff;
        color: white;
        margin-right: 12px;
        margin-bottom: 12px;
        color: white;
        border-radius: 8px;
      }
    }
  }
}
</style>