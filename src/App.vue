<template>
  <div id="app-container">
    <div class="LoadBox"
         v-if="$store.state.LoadShow">
      <van-loading size="80" />
    </div>
    <keep-alive :include="$store.state.includeArry">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {
  getTypeList_7,
  getTypeList_1,
  getRoadList,
  getTypeList_13,
  getClueEventTypeSetting,
  getCharacterLabelSetting,
} from "./api/a";

export default {
  name: "app",
  data () {
    return {
      num: 1
    };
  },
  created () {
    const that = this;
    that.rbFn();
  },
  mounted () {

  },
  methods: {
    rbFn () {
      const that = this;
      setTimeout(() => {
        if (localStorage.getItem("rbacToken")) {
          that.load();
          that.num = 1;
        } else {
          that.num += 1;
          if (that.num < 5) {
            that.rbFn();
            // dd.toast({
            //   icon: "",
            //   text: "未获取到token" + that.num, //提示信息
            // })
          }
        }
      }, 1500);
    },
    async load () {
      const that = this;
      const [
        roadData1,
        cluesTypeData,
        eventTypeData,
        characterLabelsData,
        eventData,
        sourceData,
        roadData,
      ] = await Promise.all([
        getTypeList_13({ type: 13 }),
        getClueEventTypeSetting({ type: 1 }),
        getClueEventTypeSetting({ type: 2 }),
        getCharacterLabelSetting(),
        getTypeList_7({ type: 7 }),
        getTypeList_1({ type: 1 }),
        getRoadList(),
      ]);
      eventData.data.map((item, index) => {
        item.key = item.name;
        item.value = item.id;
      });
      console.log(eventData,'0000000000000000000')
      that.$store.commit({
        type: "StoreData",
        key: "eventData",
        value: eventData.data,
      });
      // levelData
      console.log(this.$store, this.$store.state, "opopop2");

      that.$store.commit({
        type: "StoreData",
        key: "levelData",
        value: [
          { key: "一般", value: "4" },
          { key: "较大", value: "3" },
          { key: "重大", value: "2" },
          { key: "特大", value: "1" },
        ],
      });
      // sourceData
      that.$store.commit({
        type: "StoreData",
        key: "sourceData",
        value: sourceData.data,
      });
      // roadData
      roadData.data.map((item, index) => {
        item.key = item.name;
        item.value = item.id;
      });
      that.$store.commit({
        type: "StoreData",
        key: "roadData",
        value: roadData.data,
      });

      // rodaData
      roadData1.data.map((item, index) => {
        item.key = item.name;
        item.value = item.id;
      });
      that.$store.commit({
        type: "StoreData",
        key: "roadData1",
        value: roadData1.data,
      });
      // sexData
      that.$store.commit({
        type: "StoreData",
        key: "sexData",
        value: [
          { key: "女", value: "2" },
          { key: "男", value: "1" },
        ],
      });
      // cluesTypeData
      cluesTypeData.data.map((item, index) => {
        item.key = item.name;
        item.value = item.id;
      });
      that.$store.commit({
        type: "StoreData",
        key: "cluesTypeData",
        value: cluesTypeData.data,
      });
      // eventTypeData
      eventTypeData.data.map((item, index) => {
        item.key = item.name;
        item.value = item.id;
      });
      that.$store.commit({
        type: "StoreData",
        key: "eventTypeData",
        value: eventTypeData.data,
      });
      let a = [];
      // characterLabelsData
      characterLabelsData.data.map((item, index) => {
        a.push({ id: item.id, name: item.name });
      });
      that.$store.commit({
        type: "StoreData",
        key: "characterLabelsData",
        value: a,
      });
      // 重点人员
      that.$store.commit({
        type: "StoreData",
        key: "emphasisPerson",
        value: [
          { key: "否", value: "0" },
          { key: "是", value: "1" },
        ],
      });
    },
  },
};
</script>

<style >
html,
body,
#app-container {
  height: 100%;
}
.mapClass .van-dialog {
  height: 80%;
}
.mapClass .van-dialog .van-dialog__content {
  height: 90%;
}
/* .mapClass .van-dialog .van-dialog__footer {
  height: 10%;
} */

.multiSelectClass .van-popup {
  overflow-y: initial;
  padding-top: 50px;
}
/* .multiSelectClass .van-checkbox__label, */
.multiSelectClass .van-popup__close-icon--top-right {
  font-size: 40px;
}
/* .multiSelectClass .van-popup__close-icon--top-right {
  position: absolute;
  top: 0;
  right: 0;
} */
.multiSelectClass .van-checkbox-group {
  /* margin-top: 20px; */
  overflow-y: auto;
  height: 100%;
}
.multiSelectClass .van-checkbox__icon {
  margin-right: 10vw;
}
.multiSelectClass .van-checkbox-group .van-checkbox {
  width: 100%;
  border-top: 1px solid #c8c9cc;
  padding: 30px 7vw;
  word-wrap: normal;
}
.multiSelectClass .van-checkbox-group .van-checkbox:first-child {
  border-top: none;
  padding-top: 5px;
}
.earlywarningClass .earlywarningClass_checkbox .van-checkbox__label {
  width: 100%;
  display: flex;
  line-height: initial;
}
.LoadBox {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(38, 38, 38, 0.2);
}
.vant-toast--text {
  padding: 20px !important;
  color: #fff !important;
}
.van-toast {
  /* 修改背景颜色 */
  color: #fff !important;
  /* 修改字体大小 */
  font-size: 32px !important;
  /* 修改边框圆角 */
  border-radius: 16px !important;
  /* 其他自定义样式 */
  padding: 20px !important; /* 增加内边距 */
}
.van-toast .van-toast__text{
  color: #fff !important;
}
.stability_warp_index .van-tabbar {
  height: 90px;
}
.stability_warp_index .van-tabbar-item--active {
  color: #1989fa !important;
}
.stability_warp_index .van-tabbar-item__icon {
  font-size: 0.5rem !important;
}
.stability_warp_index .van-tabbar-item--active .van-tabbar-item__text {
  color: #1989fa !important;
}
.stability_warp_index .van-tabbar-item--active .van-tabbar-item__icon .van-icon {
  color: #1989fa !important;
}
</style>
