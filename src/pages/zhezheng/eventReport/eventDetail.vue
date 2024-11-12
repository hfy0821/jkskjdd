<template>
  <div class="clues_warp">
    <!-- 线索信息 -->
    <div class="cluesMsg">
      <div class="header_icon"><span>线索信息</span></div>
      <div class="form" :class="edit ? '' : 'unclick'">
        <div class="item">
          <p :class="formData.address ? 'active' : ''">事件地址</p>
          <div class="relativeC">
            <input
              type="text"
              v-model.trim="formData.address"
              placeholder="点击输入地址，也可地图进行定位"
              :readonly="disabled"
            />
            <i @click="addressFn()" class="iconfont icon-location"></i>
          </div>
        </div>
        <div class="item">
          <p :class="formData.description ? 'active' : ''">线索描述</p>
          <textarea
            type="text"
            v-model.trim="formData.description"
            placeholder="在此输入事件描述"
            :readonly="disabled"
            rows="4"
          />
        </div>
        <div class="item">
          <p :class="formData.clueType ? 'active' : ''">线索类型</p>
          <input
            type="text"
            @click="disabled ? null : cluesTypeFn()"
            readonly
            v-model.trim="formData.clueTypeName"
            placeholder="在此输入线索类型"
          />
        </div>
        <div class="item">
          <p :class="formData.happenDate ? 'active' : ''">事件时间</p>
          <input
            type="text"
            readonly
            :value="formData.happenDate"
            placeholder="在此输入时间"
            @click="disabled ? null : timeFn()"
          />
        </div>
      </div>
    </div>
    <!-- 关联人员  -->
    <div class="analyseClass">
      <div class="header_icon"><span>人员信息</span></div>
      <!-- <div v-if="clueEventPeopleList.length != 0"> -->
        <div
          v-for="(item, index) in clueEventPeopleList"
          :key="index"
          class="form"
        >
          <div class="form_people">
            人员{{ index + 1 }}
            <div class="add_btn" @click="personRetrieve()" v-if="edit">
              <img :src="require('assets/image/iconAdd.svg')" alt="" />
            </div>
          </div>
          <div class="item">
            <p :class="item.name ? 'active' : ''">人物姓名</p>
            <input type="text" v-model="item.name" placeholder="输入人物姓名" />
          </div>
          <div class="item">
            <p :class="item.cardid ? 'active' : ''">身份证号</p>
            <input
              type="text"
              v-model="item.cardid"
              placeholder="输入身份证号"
            />
          </div>
          <div class="item">
            <p :class="item.districtsId ? 'active' : ''">所属街道</p>
            <input
              type="text"
              @click="disabled ? null : roadFn(item)"
              v-model="item.districtsName"
              placeholder="输入所属街道"
              readonly
            />
          </div>
          <div class="item">
            <p :class="item.communityId ? 'active' : ''">所属社区</p>
            <input
              type="text"
              @click="disabled ? null : communityFn(item)"
              v-model="item.communityName"
              placeholder="输入所属社区"
              readonly
            />
          </div>
          <div class="del_btn" v-if="clueEventPeopleList.length >=2" @click="delPeople(index)">
            <img :src="require('assets/image/iconDel.png')" alt="" />
          </div>
        </div>
      <!-- </div> -->
    </div>
    <!-- <div class="analyseClass">
      <div class="header_icon"><span>关联人员</span></div>
      <div class="tabClass">
        <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
      </div>
      <div class="add_btn" @click="personRetrieve()" v-if="edit">
        <img :src="require('assets/image/iconAdd2.svg')" alt="" />
      </div>
      <div
        class="form"
        :class="edit ? '' : 'unclick'"
        v-if="formData.peoples && formData.peoples.length > 0"
      >
        <div class="item">
          <p :class="formData.peoples[tabIndex - 1].name ? 'active' : ''">
            人物姓名
          </p>
          <input
            type="text"
            v-model.trim="formData.peoples[tabIndex - 1].name"
            placeholder="输入人物姓名"
            readonly
          />
          <div class="item_btn">
            <span @click="personRetrieve()">人物检索</span>
          </div>
        </div>
        <div class="item">
          <p :class="formData.peoples[tabIndex - 1].sex ? 'active' : ''">
            性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
          </p>
          <input
            type="text"
            @click="sexFn()"
            readonly
            :value="
              formData.peoples[tabIndex - 1].sex == 1
                ? '男'
                : formData.peoples[tabIndex - 1].sex == 2
                ? '女'
                : ''
            "
            placeholder="性别选择"
          />
        </div>
        <div class="item">
          <p :class="formData.peoples[tabIndex - 1].phone ? 'active' : ''">
            手机号码
          </p>
          <input
            type="number"
            v-model.trim="formData.peoples[tabIndex - 1].phone"
            placeholder="在此输入手机号码"
            readonly
          />
        </div>
        <div class="item" v-if="formData.peoples[tabIndex - 1].birthday">
          <p :class="formData.peoples[tabIndex - 1].birthday ? 'active' : ''">
            出生日期
          </p>
          <input
            type="text"
            :value="formData.peoples[tabIndex - 1].birthday.substring(0, 10)"
            placeholder="在此输入出生日期"
            readonly
          />
        </div>
        <div class="item">
          <p :class="formData.peoples[tabIndex - 1].cardId ? 'active' : ''">
            身份证号
          </p>
          <input
            type="text"
            v-model.trim="formData.peoples[tabIndex - 1].cardId"
            placeholder="在此输入身份证号"
            readonly
          />
        </div>
        <div class="item">
          <p
            :class="
              formData.peoples[tabIndex - 1].characterLabelNameList
                ? 'active'
                : ''
            "
          >
            性格标签
          </p>
          <input
            type="text"
            :value="formData.peoples[tabIndex - 1].characterLabelNameList"
            placeholder="请选择"
            @click="selectLabel(tabIndex - 1)"
          />
        </div>
        <div class="item">
          <p class="item_p">关联操作</p>
          <div class="item_btn">
            <span @click="remove(tabIndex - 1)">移除关联</span>
          </div>
        </div>
      </div>
    </div> -->
    <div class="btn">
      <span v-if="!edit" @click="reEdit()">重新编辑</span>
      <span v-if="edit" @click="report()" class="report">上报</span>
    </div>
  </div>
</template>
<script>
import {
  getCluesDetail,
  addClues,
  getCommunityListByRoadId,
} from "../../../api/a";
import Nav from "../../../components/tab";
export default {
  components: { Nav },
  data() {
    return {
      disabled: false,
      edit: false,
      tabs: [],
      tabIndex: localStorage.getItem("eventDetailTabIndex") / 1 || 1,
      formData: {
        address: "",
        districtsId: "",
        roadName: "",
        description: "",
        clueType: "",
        clueTypeName: "",
        happenDate: "",
        peoples: [
          {
            id: "",
            name: "",
            // sexId: "",
            sex: "",
            birthday: "",
            phone: "",
            cardId: "",
            // characterLabelsId: "",
            characterLabels: "",
          },
          { id: "", name: "" },
          { id: "", name: "" },
        ],
        // commitType: 1,
        longitude: "",
        latitude: "",
      },
      cluesTypeData: [],
      sexData: [],
      characterLabelsData: [],
      // roadData: [],
      clueEventId: "",
      peopleData: [],
      associateStatus: "",
      clueEventPeopleList: [
        {
          name: "",
          cardid: "",
          districtsId: "",
          districtsName: "",
          communityId: "",
          communityName: "",
        },
      ],
      roadData1: [],
    };
  },
  async created() {
    const that = this;
    window.scrollTo(0, 0);
    dd.disablePullToRefresh()
      .then((res) => {})
      .catch((err) => {});
    that.getData();
    let store = this.$store.state;
    that.cluesTypeData = store.cluesTypeData;
    that.roadData1 = store.roadData1;
    that.characterLabelsData = store.characterLabelsData;
  },
  computed: {},
  methods: {
    // 默认数据
    async getData() {
      const that = this;
      let query = that.$route.query;
      that.associateStatus = query.associateStatus;
      that.edit = query.edit;

      const res = await getCluesDetail({ id: query.id });
      if (res.success) {
        let _data = res.data;
        that.detailData = _data;
        that.formData.address = _data.address;
        that.formData.description = _data.description;
        that.formData.clueType = _data.clueType;
        that.formData.clueTypeName = _data.clueTypeName;
        that.formData.happenDate = _data.happenDate;
        that.clueEventId = _data.id;
        that.formData.peoples = _data.peopleList;
        that.clueEventPeopleList = _data.clueEventPeopleList;
        console.log(_data.peopleList, "44444444");

        if (that.formData.peoples != null) {
          let a = [];
          that.formData.peoples.map((item, index) => {
            index += 1;
            a.push({ name: "人员" + index });
          });
          that.tabs = a;
        }
      }
      if (query && query.listData) {
        let b = [];
        b.push(query.listData);
        var data1 = JSON.parse(localStorage.getItem("b"));
        let people_re = [];
        if (data1) {
          people_re = b.concat(data1);
        } else {
          people_re = b;
        }
        that.formData.peoples = people_re;

        localStorage.setItem("b", JSON.stringify(people_re));
        // } else if (that.formData.peoples != null) {
        // that.formData.peoples = that.formData.peoples.concat(b);
        // }
        console.log(that.formData.peoples, "4444445555");
        let c = [];
        that.formData.peoples.map((item, index) => {
          index += 1;
          c.push({ name: "人员" + index });
        });
        that.tabs = c;
      }
    },
    // 选择地址
    addressFn() {
      const that = this;
      dd.locateOnMap({
        longitude: that.formData.longitude ? that.formData.longitude : "",
        latitude: that.formData.latitude ? that.formData.latitude : "",
      })
        .then((res) => {
          let address = res.province + res.city + res.adName + res.title;
          that.formData.address = address;
          that.formData.longitude = res.longitude;
          that.formData.latitude = res.latitude;
        })
        .catch((err) => {});
    },
    // 人员tab切换
    changeIndex(i) {
      const that = this;
      that.tabIndex = i;
      localStorage.setItem("evnetDetailTabIndex", i);
      this.$forceUpdate();
    },
    // 重新编辑
    reEdit() {
      this.edit = true;
    },
    // 线索类型
    cluesTypeFn() {
      const that = this;
      dd.showSelect({
        source: that.cluesTypeData,
      })
        .then((res) => {
          that.formData.clueType = res.value;
          that.formData.clueTypeName = res.key;
        })
        .catch((err) => {});
    },
    // 人物检索
    personRetrieve(index) {
      const that = this;
      let clueEventPeopleList_obj = {
        name: "",
        cardid: "",
        districtsId: "",
      };
      that.clueEventPeopleList.push(clueEventPeopleList_obj);
      // const that = this;
      // let query = that.$route.query;
      // dd.confirm({
      //   title: "温馨提示",
      //   message: "是否进行人物检索?",
      //   buttonLabels: ["取消", "确定"],
      // })
      //   .then(async (res) => {
      //     if (res.buttonIndex == 1) {
      //       that.$router.push({
      //         path: "/zhezheng/eventReport/peopleSearch",
      //         query: {
      //           id: that.clueEventId,
      //           type: "edit",
      //           detailId: query.id,
      //         },
      //       });
      //     }
      //   })
      //   .catch((err) => {});
    },
    // 提交验证
    validateFn() {
      const that = this;
      if (!that.formData.address) {
        that.alert("请输入地址");
        return false;
      }
      if (!that.formData.description) {
        that.alert("请输入事件描述");
        return false;
      }
      if (!that.formData.clueType) {
        that.alert("请输入线索类型");
        return false;
      }
      if (!that.formData.happenDate) {
        that.alert("请输入时间");
        return false;
      }
      for (var i = 0; i < that.clueEventPeopleList.length; i++) {
        if (!that.clueEventPeopleList[i].name) {
          that.alert("请输入姓名");
          return false;
        }
        if (!that.clueEventPeopleList[i].cardid) {
          that.alert("请输入身份证号");
          return false;
        }
        if (!that.clueEventPeopleList[i].districtsId) {
          that.alert("请输入所属街道");
          return false;
        }
        if (!that.clueEventPeopleList[i].communityId) {
          that.alert("请输入所属村社");
          return false;
        }
      }
      return true;
    },
    alert(v) {
      dd.alert({
        message: v,
        title: "提示",
        button: "收到",
      })
        .then((res) => {})
        .catch((err) => {});
    },
    // 上报
    report() {
      const that = this;
      let query = that.$route.query;
      // console.log("query", query);
      const v = that.validateFn();
      if (v) {
        dd.confirm({
          title: "温馨提示",
          message: "确定提交？",
          buttonLabels: ["取消", "确定"],
        })
          .then(async (res) => {
            if (res.buttonIndex == 1) {
              let a = [];
              // that.formData.peoples.map((item, index) => {
              //   a.push({ id: item.id, characterLabel: item.characterLabel });
              // });
              // console.log("a", a);
              // return false;
              that.clueEventPeopleList.map((item, index) => {
                a.push({
                  name: item.name,
                  cardid: item.cardid,
                  districtsId: item.districtsId,
                  communityId: item.communityId,
                });
              });
              const data = await addClues({
                id: query.id,
                description: that.formData.description,
                address: that.formData.address,
                districtsId: that.formData.districtsId,
                clueType: that.formData.clueType,
                longitude: that.formData.longitude,
                latitude: that.formData.latitude,
                commitType: 2,
                happenDate: that.formData.happenDate,
                clueEventPeopleList: a,
              });
              // console.log("data", data);
              if (data.success) {
                dd.toast({
                  icon: "success",
                  text: "操作成功", //提示信息
                })
                  .then((res) => {
                    // that.$router.push("/zhezheng/eventReport/eventList");
                  })
                  .catch((err) => {});
                that.$router.push("/zhezheng/eventReport/eventList");
              }
            }
          })
          .catch((err) => {});
      }
    },
    // 移除关联
    remove(i) {
      const that = this;
      dd.confirm({
        title: "温馨提示",
        message: "是否移除关联?",
        buttonLabels: ["取消", "确定"],
      })
        .then(async (res) => {
          if (res.buttonIndex == 1) {
            that.formData.peoples.splice(i, 1);
            that.tabs.splice(i, 1);
            // if (that.formData.peoples.length == 0) {
            //   that.formData.peoples = [];
            // }
            this.$forceUpdate();
          }
        })
        .catch((err) => {});
    },
    // 选择性格标签
    selectLabel(i) {
      const that = this;
      let a = that.characterLabelsData.map((item, index) => {
        return item.name;
      });
      dd.showMultiSelect({
        options: a,
        selectOption: that.formData.peoples[i].characterLabelNameList,
      }).then((res) => {
        let b = [];
        let c = [];
        res.map((item, index) => {
          b.push(that.characterLabelsData[item].name);
          c.push(that.characterLabelsData[item].id);
        });
        that.formData.peoples[i].characterLabelNameList = b;
        that.formData.peoples[i].characterLabel = c.join(",");
        this.$forceUpdate();
      });
    },
    // 选择所属街道
    roadFn(item) {
      const that = this;
      dd.showSelect({
        source: that.roadData1,
      })
        .then((res) => {
          item.districtsId = res.value;
          item.districtsName = res.key;
          that.$forceUpdate();
        })
        .catch((err) => {});
    },
    // 选择村社
    async communityFn(item) {
      // 获取村社信息
      //  debugger
      const that = this;
      const data1 = await getCommunityListByRoadId({
        roadId: item.districtsId,
      });
      let a = data1.data.map((item1, index1) => {
        return { key: item1.name, value: item1.id };
      });
      dd.showSelect({
        source: a,
      })
        .then((res) => {
          item.communityId = res.value;
          item.communityName = res.key;
          that.$forceUpdate();
        })
        .catch((err) => {});
    },
    // 选择时间
    timeFn() {
      const that = this;
      dd.showDateTimePicker({
        format: "yyyy-MM-dd HH:mm:ss",
        value: that.formData.happenDate,
      }).then((res) => {
        that.formData.happenDate = res.value;
      });
    },
     // 删除人员
    delPeople(index) {
      this.clueEventPeopleList.splice(index,1)
    }
  },
};
</script>
<style lang="less" scoped>
.clues_warp {
  padding-bottom: 9vh;
  .header_icon {
    padding: 1vh 5vw;
    background: #f3f3f3;
    > span {
      border-left: 0.133333rem solid #01a6ff;
      display: inline-block;
      padding-left: 2vw;
      font-weight: 700;
    }
  }
  .cluesMsg,
  .analyseClass {
    position: relative;
    .form {
      padding: 0 32px;
      &.unclick {
        * {
          pointer-events: none;
        }
      }
      .item {
        border-bottom: solid 1px #e4e4e4;
        padding: 8px 0 24px;
        .item_main {
          display: flex;
          flex-wrap: wrap;
          span,
          button {
            width: 20vw;
            height: 20vw;
            margin: 0 1vw;
            margin-bottom: 1vh;
            display: inline-block;
            img {
              width: 100%;
              height: 100%;
            }
            i {
              position: absolute;
              top: -5px;
              right: 0;
              font-size: 15px;
            }
          }
        }
        .relativeC {
          position: relative;
          .iconfont {
            position: absolute;
            right: 2vw;
            font-size: 40px;
            top: 0;
          }
        }
        p {
          line-height: 68px;
          &.active {
            color: #409eff;
            font-size: 24px;
          }
        }
        button {
          line-height: 48px;
          width: 120px;
          color: #fff;
          background: #409eff;
          font-size: 18px;
          border-radius: 4px;
          position: relative;
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
        .item_tags {
          display: inline-block;
          background: #fff;
          height: 6vh;
          padding: 1vh;
          span {
            flex: 1;
            color: #fff;
            background: #409eff;
            border-radius: 8px;
            padding: 1vh;
          }
        }
        .item_p {
          float: left;
          line-height: 9vh;
        }
        .item_btn {
          display: flex;
          background: #fff;
          height: 9vh;
          width: 30vw;
          padding: 2vh;
          margin-left: 60vw;
          span {
            flex: 1;
            text-align: center;
            // line-height: 72px;
            line-height: 5vh;
            background: #ee6363;
            color: #fff;
            border-radius: 8px;
            margin-right: 14px;
          }
        }
      }
    }
    .tabClass {
      box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
      background: #fff;
      width: 90vw;
    }
    .add_btn {
      position: absolute;
      right: 4vw;
      top: 5vh;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .form_people {
      padding: 1vh 0;
      border-bottom: solid 1px #e4e4e4;
      font-weight: bold;
    }
    .del_btn {
      position: fixed;
      bottom: 10vh;
      right: 4vw;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: solid 1px #191f251f;
    display: flex;
    justify-content: space-between;
    background: #fff;
    height: 9vh;
    padding: 2vh;
    span {
      flex: 1;
      text-align: center;
      // line-height: 72px;
      line-height: 5vh;
      background: #ee6363;
      color: #fff;
      border-radius: 8px;
      margin-right: 14px;
      &:last-child {
        margin: 0;
      }
    }
    .report {
      background: #409eff;
    }
  }

  input::-webkit-input-placeholder {
    font-size: 24px;
  }
  input::-moz-placeholder {
    font-size: 24px;
  }

  input:-moz-placeholder {
    font-size: 24px;
  }

  input:-ms-input-placeholder {
    font-size: 24px;
  }
  input,
  textarea {
    font-size: 30px;
    line-height: 50px;
    width: 100%;
  }
}
</style>
