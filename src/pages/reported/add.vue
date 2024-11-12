<template>
  <div class="reportedAdd_warp multiSelectClass mapClass">
    <div class="source">
      <span>来源：</span>
      <i>{{ sourceType }}</i>
    </div>
    <!-- 标题 -->
    <div class="form" :class="edit ? '' : 'unclick'">
      <div class="item" v-if="type === '9'">
        <p :class="formData.title ? 'active' : ''">标题</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入标题"
        />
      </div>
      <!-- 舆情名称 -->
      <div class="item" v-if="type === '8'">
        <p :class="formData.title ? 'active' : ''">舆情名称</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入舆情名称"
        />
      </div>
      <!-- 姓名 -->
      <div class="item" v-if="type === '9'">
        <p :class="formData.name ? 'active' : ''">姓名</p>
        <input
          type="text"
          v-model.trim="formData.name"
          placeholder="在此输入姓名"
        />
      </div>
      <!-- 性别 -->
      <div class="item" v-if="type === '9'">
        <p :class="formData.sexName ? 'active' : ''">性别</p>
        <input
          @click="selectSex"
          type="text"
          readonly
          :value="formData.sexName"
          placeholder="点击选择性别"
        />
      </div>
      <!-- 事件名称 -->
      <div
        class="item"
        v-if="type === '2' || type === '3' || type === '99' || type === '122'"
      >
        <p :class="formData.title ? 'active' : ''">事件名称</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入事件名称"
        />
      </div>
      <!-- 警情类型 -->
      <div class="item" v-if="type == '99'">
        <p :class="formData.eventType ? 'active' : ''">警情类型</p>
        <div>
          <input
            @click="selectEventType"
            readonly
            type="text"
            :value="
              formData.eventType == 1
                ? '信访人员异动信息'
                : formData.eventType == 2
                ? '矛盾纠纷信息'
                : ''
            "
            placeholder="点击选择警情类型"
          />
        </div>
      </div>
      <!-- 事件类别 -->
      <div
        class="item"
        v-if="type === '2' || type === '3' || type === '8' || type === '122'"
      >
        <p
          :class="
            formData.eventName && formData.eventName.length ? 'active' : ''
          "
        >
          事件类别
        </p>
        <div>
          <input
            @click="selectEvent()"
            readonly
            type="text"
            :value="formData.eventName"
            placeholder="点击选择事件类别"
          />
          <multiSelect
            v-if="multiSelectShow"
            @multiSelectClose="multiSelectComponent"
            :multiSelectData="{ data: eventList, value: formData.eventTypes }"
          />
        </div>
      </div>
      <!-- 现实行为 -->
      <div class="item" v-if="type != '122'">
        <p :class="formData.actionName ? 'active' : ''">现实行为</p>
        <div>
          <input
            @click="selectBehave"
            readonly
            type="text"
            v-model="formData.actionName"
            placeholder="点击选择现实行为"
          />
          <multiSelectOdd
            :multiSelectOddData="actionList"
            v-if="multiSelectOddShow_action"
            @multiSelectOddReturn="multiSelectOddReturn_action"
          />
        </div>
      </div>
      <!-- 舆情来源 -->
      <div class="item" v-if="type === '8'">
        <p :class="formData.seetSource ? 'active' : ''">舆情来源</p>
        <input
          type="text"
          v-model.trim="formData.seetSource"
          placeholder="在此输入舆情来源"
        />
      </div>
      <!-- 所属街道 -->
      <div class="item">
        <p :class="formData.roadName ? 'active' : ''">所属街道</p>
        <div>
          <input
            @click="selectStreet"
            readonly
            type="text"
            v-model="formData.roadName"
            placeholder="点击选择所属街道"
          />
        </div>
      </div>
      <!-- 所属地点 -->
      <div class="item" v-if="type == '2' || type == '99'">
        <p :class="formData.incidentAddress ? 'active' : ''">所属地点</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.incidentAddress"
            placeholder="点击选择所属地点"
          />
          <i @click="selectAddress" class="iconfont icon-location"></i>
        </div>
      </div>
      <div
        class="item incidentContent"
        v-if="
          type === '2' ||
          type === '3' ||
          type === '8' ||
          type === '99' ||
          type === '122'
        "
      >
        <p :class="formData.incidentContent ? 'active' : ''">
          {{ type === "122" ? "简要概况" : "事件描述" }}
        </p>
        <div>
          <!-- <input
            type="text"
            v-model.trim="formData.incidentContent"
            :placeholder="
              type === '122' ? '在此输入简要概况' : '在此输入事件描述'
            "
          /> -->
          <div>
            <textarea
              type="text"
              v-model.trim="formData.incidentContent"
              :placeholder="
                type === '122' ? '在此输入简要概况' : '在此输入事件描述'
              "
              style="width: 100%"
              v-show="edit"
            ></textarea>
            <div class="all-content" v-show="!edit">
              {{ formData.incidentContent }}
            </div>
          </div>
        </div>
      </div>
      <!-- 简介 -->
      <div class="item incidentContent" v-if="type === '9'">
        <p :class="formData.intro ? 'active' : ''">简介</p>
        <div>
          <input
            type="text"
            v-model.trim="formData.intro"
            placeholder="在此输入简介"
          />
        </div>
      </div>
      <!-- 事发时间 -->
      <div class="item" v-if="type === '2' || type === '122'">
        <p :class="formData.incidentTime ? 'active' : ''">事发时间</p>
        <div>
          <input
            @click="selectTime"
            readonly
            type="text"
            v-model="formData.incidentTime"
            placeholder="事发时间"
          />
        </div>
      </div>
      <!-- 事发时间 -->
      <div class="item" v-if="type === '99'">
        <p :class="formData.incidentTime ? 'active' : ''">事发时间</p>
        <div>
          <input
            @click="selectTime"
            readonly
            type="text"
            v-model="formData.incidentTime"
            placeholder="事发时间"
          />
        </div>
      </div>
      <!-- 上报人 -->
      <!-- <div class="item" v-if="type === '99'">
        <p :class="formData.earlyWarningName ? 'active' : ''">上报人</p>
        <div>
          <input
            type="text"
            v-model.trim="formData.earlyWarningName"
            placeholder="在此输入上报人"
          />
        </div>
      </div> -->
      <!-- 涉及人数 -->
      <div class="item" v-if="type == '2' || type == '99'">
        <p :class="formData.joinNum ? 'active' : ''">涉及人数</p>
        <div>
          <input
            type="text"
            v-model.number="formData.joinNum"
            placeholder="涉及人数"
          />
        </div>
      </div>
      <!-- 网络连接 -->
      <div class="item" v-if="type === '8'">
        <p :class="formData.link ? 'active' : ''">网络连接</p>
        <div>
          <input
            type="text"
            v-model.trim="formData.link"
            placeholder="在此输入网络连接"
          />
        </div>
      </div>
      <!-- 涉及网站 -->
      <div class="item" v-if="type === '8'">
        <p :class="formData.involveWeb ? 'active' : ''">涉及网站</p>
        <div>
          <input
            type="text"
            v-model.trim="formData.involveWeb"
            placeholder="在此输入涉及网站"
          />
        </div>
      </div>
      <!-- 处置意见 -->
      <div class="item" v-if="type == '122'">
        <p :class="formData.handDetail ? 'active' : ''">处置意见</p>
        <div>
          <input
            type="text"
            v-model.trim="formData.handDetail"
            placeholder="在此输入处置意见"
          />
        </div>
      </div>
      <!-- 是否隐患 -->
      <div class="item" v-if="type == '122'">
        <p :class="formData.hiddenDanger ? 'active' : ''">是否隐患</p>
        <div>
          <input
            type="text"
            readonly
            value="是"
            placeholder="在此输入是否隐患"
          />
        </div>
      </div>
      <!--重点信访异动信息 人员 -->
      <div
        class="xc"
        v-if="type == '122' || (type == '99' && formData.eventType == 1)"
      >
        <div
          class="xc_main"
          v-for="(item, index) in formData.eventLeader"
          :key="index"
        >
          <!-- 人员 -->
          <div class="xc_question">
            <div style="font-size: 17px">人员{{ index + 1 }}</div>
            <div>
              <span
                @click="SubtractAdd('subtract', item, index)"
                class="xc_subtract"
                >-</span
              >
              <span
                v-if="formData.eventLeader.length == index + 1"
                @click="SubtractAdd('add', item, index)"
                class="xc_add"
                >+</span
              >
            </div>
          </div>
          <!-- 重点人姓名 -->
          <div class="item">
            <p :class="item.name ? 'active' : ''">重点人姓名</p>
            <div>
              <input
                type="text"
                v-model="item.name"
                placeholder="请输入重点人姓名"
              />
            </div>
          </div>
          <!-- 身份证号 -->
          <div class="item">
            <p :class="item.cardId ? 'active' : ''">身份证号</p>
            <div>
              <input
                type="text"
                v-model="item.cardId"
                placeholder="请输入身份证号"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- map -->
    <div>
      <van-dialog width="90%" v-model="mapStatus" :show-confirm-button="false">
        <mapComponents @map_return="map_return" />
      </van-dialog>
    </div>
    <!-- multiSelectOdd -->
    <div>
      <multiSelectOdd
        :multiSelectOddData="streetList"
        v-if="multiSelectOddShow"
        @multiSelectOddReturn="multiSelectOddReturn"
      />
    </div>
    <div class="endHolder"></div>
    <div class="btn" v-if="authority == 1">
      <span @click="handClick(1)" v-if="!id">上报</span>
      <i @click="del()" v-show="!edit && id">删除</i>
      <b @click="edit = true" v-show="!edit && id">编辑</b>
      <i @click="cancel" v-show="edit && id">取消</i>
      <b @click="save" v-show="edit && id">保存</b>
    </div>
  </div>
</template>
<script>
import multiSelect from "../../components/multiSelect";
import mapComponents from "../../components/map";
import multiSelectOdd from "../../components/multiSelect_odd";

import {
  addEvent,
  updateEvent,
  updateEventNew,
  getEventByIdByRbacToken,
  checkUrlRight,
} from "../../api/a";
import { GPS } from "../../utils/tools";

export default {
  name: "reportedAdd",
  components: {
    multiSelect,
    mapComponents,
    multiSelectOdd,
  },
  data() {
    return {
      // multiSelectOdd
      multiSelectOddShow: false,
      multiSelectOddShow_action: false,
      // mapComponents
      mapStatus: false,
      //
      authority: 1, // 重点信访异动信息权限控制 删除编辑
      // 多选下拉
      multiSelectShow: false,
      //
      sourceType: "",
      typeList: [],
      type: this.$route.query.type || "",
      id: this.$route.query.id,
      index: [],
      edit: true,
      formData: {
        title: "",
        name: "",
        eventName: [],
        eventTypes: "",
        actionName: "",
        actionType: "",
        roadName: "",
        roadId: "",
        incidentAddress: "",
        incidentContent: "",
        intro: "",
        sex: "",
        incidentTime: "",
        joinNum: "",
        seetSource: "",
        sourceType: "",
        link: "",
        involveWeb: "",
        earlyWarningName: "",
        handDetail: "", //处置意见
        hiddenDanger: "", // 是否隐患
        // leaderCardId:'',
        // leaderName:'',
        eventLeader: [{ name: "", cardId: "" }], // 关联人员
        eventType: "",
        // eventTypeName:""
      },
      roadXY: {
        1: { y: 40.45323, x: 116.00169 },
        2: { y: 27.97642, x: 120.67887 },
        3: { y: 27.91188, x: 120.6826 },
        4: { y: 27.92924, x: 120.6808 },
        5: { y: 27.95435, x: 120.62727 },
        6: { y: 27.98281, x: 120.59619 },
        7: { y: 27.9486, x: 120.69722 },
        8: { y: 27.98681, x: 120.53914 },
        9: { y: 27.96574, x: 120.57076 },
        10: { y: 27.99762, x: 120.5709 },
        11: { y: 27.916, x: 120.64534 },
        12: { y: 27.88043, x: 120.64462 },
        13: { y: 28.03338, x: 120.38744 },
      },
      // eventOption: ['劳资纠纷','非正常死亡','涉众型经济','住房纠纷','医疗纠纷','城中村改造','执法纠纷',
      //     '学区划分','校园安全','公共安全','国家安全','其他','村（社区）规模优化调整'],
      // actionOption: ["集体上访","拦路","聚集","其他"],
    };
  },
  computed: {
    streetList() {
      return this.$store.state.common.streetList;
    },
    streetOption() {
      return this.$store.state.common.streetList.map((v) => {
        return v.name;
      });
    },
    actionList() {
      return this.$store.state.common.actionList;
    },
    actionOption() {
      return this.$store.state.common.actionList.map((v) => {
        return v.name;
      });
    },
    eventList() {
      return this.$store.state.common.eventList;
    },
    eventOption() {
      return this.$store.state.common.eventList.map((v) => {
        return v.name;
      });
    },
  },
  created() {
    let that = this;
    dd.disablePullToRefresh();
    that.formData.sourceType = that.type / 1;
    if (that.type === "122") {
      checkUrlRight({ name: "rawData:policeInformation" }).then((res) => {
        if (res.success && res.data) {
          that.authority = 1;
        } else {
          that.authority = 0;
        }
      });
      that.formData.hiddenDanger = 1;
    }
    if (that.type === "99") {
      that.formData.isType = 1;
    }
    if (that.id) {
      document.title = "事件详情";
      that.edit = false;
      that.formData.id = that.id;
      that.getDetail();
    }
    that.typeList = ["", "", "维稳信息员", "110报警"];
    that.typeList[9] = "综合帮扶";
    that.typeList[8] = "舆情";
    that.typeList[99] = "公安警情";
    that.typeList[122] = "重点信访异动信息";
    that.sourceType = that.typeList[that.type];
  },
  methods: {
    selectEventType() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择事件类型？",
        cancelButton: "取消",
        otherButtons: ["信访人员异动信息", "矛盾纠纷信息"],
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          if (res.buttonIndex == 0) {
            that.formData.eventLeader = [{ name: "", cardId: "" }];
            that.formData.eventType = 1;
            // that.formData.eventTypeName = '信访人员异动信息'
          } else {
            that.formData.eventLeader = [];
            that.formData.eventType = 2;
            // that.formData.eventTypeName = '矛盾纠纷信息'
          }
        },
        onFail: function (err) {},
      });
    },
    SubtractAdd(type, item, index) {
      let that = this;
      let eventLeader_obj = {
        name: "",
        cardId: "",
      };
      if (type == "add") {
        that.formData.eventLeader.push(eventLeader_obj);
      } else {
        if (that.formData.eventLeader.length > 1) {
          that.formData.eventLeader.splice(index, 1);
        }
      }
    },
    map_return(data) {
      let that = this;
      that.mapStatus = data.status;
      if (data.v == 1) {
        that.formData.incidentAddress = data.address;
        that.formData.x = data.x;
        that.formData.y = data.y;
      }
    },
    alertFn(value) {
      return alert(JSON.stringify(value));
    },
    async getDetail() {
      const data = await getEventByIdByRbacToken({ id: this.id });
      if (data.success) {
        this.formData = data.data;
        const item = this.actionList.find((v) => {
          return v.id === this.formData.actionType;
        });
        this.formData.actionName = item && item.name;
        if (data.data.sourceType === 2 && data.data.isType === 1) {
          this.type = "99";
        } else {
          this.type = data.data.sourceType + "";
        }
        this.formData.sexName = this.formData.sex == 1 ? "男" : "女";
        this.sourceType = this.typeList[this.type];
      }
    },
    // 事件类别
    multiSelectComponent(v) {
      let that = this;
      that.formData.eventTypes = v.data.length > 0 ? v.data.join(",") : "";
      that.multiSelectShow = v.status;
      let nameArr = [];
      if (that.eventList.length > 0 && v.data.length > 0) {
        that.eventList.map((item, index) => {
          v.data.map((item1, index1) => {
            if (item.id == item1) {
              nameArr.push(item.name);
            }
          });
        });
      }
      that.formData.eventName = nameArr;
    },
    selectEvent() {
      const that = this;
      that.formData.eventTypes = that.formData.eventTypes
        ? that.formData.eventTypes.split(",").map(Number)
        : [];
      setTimeout(() => {
        that.multiSelectShow = true;
      }, 100);

      // dd.biz.util.multiSelect({
      //   options: that.eventOption,
      //   selectOption: that.formData.eventName,
      //   onSuccess: function(res) {
      //     if (res.buttonIndex === -1) return;
      //     let arr = [];
      //     that.formData.eventName = res.map(v => {
      //       arr.push(that.eventList[v].id);
      //       return that.eventOption[v];
      //     });
      //     that.formData.eventTypes = arr.join();
      //   },
      //   onFail: function() {}
      // });
    },
    // 现实行为
    multiSelectOddReturn_action(data) {
      let that = this;
      that.multiSelectOddShow_action = data.status;
      if (data.id) {
        that.formData.actionType = data.id;
        that.formData.actionName = data.name;
      }
    },
    selectBehave() {
      const that = this;
      that.multiSelectOddShow_action = true;
      // dd.device.notification.actionSheet({
      //   title: "选择现实行为？",
      //   cancelButton: "取消",
      //   otherButtons: that.actionOption,
      //   onSuccess: function (res) {
      //     if (res.buttonIndex === -1) return;
      //     that.formData.actionType = that.actionList[res.buttonIndex].id;
      //     that.formData.actionName = that.actionList[res.buttonIndex].name;
      //   },
      //   onFail: function (err) {},
      // });
    },
    // 所属街道
    multiSelectOddReturn(data) {
      let that = this;
      that.multiSelectOddShow = data.status;
      if (data.id) {
        that.formData.roadId = data.id;
        that.formData.roadName = data.name;
      }
    },
    selectStreet() {
      const that = this;
      that.multiSelectOddShow = true;
      // alert(JSON.stringify(that.streetList));
      // alert(JSON.stringify(that.streetOption));

      // dd.device.notification.actionSheet({
      //   title: "选择所属街道？",
      //   cancelButton: "取消",
      //   otherButtons: that.streetOption,
      //   onSuccess: function(res) {
      //     if (res.buttonIndex === -1) return;
      //     that.formData.roadId = that.streetList[res.buttonIndex].id;
      //     that.formData.roadName = that.streetOption[res.buttonIndex];
      //   },
      //   onFail: function(err) {}
      // });
    },
    selectAddress() {
      const that = this;
      that.mapStatus = true;
      // that.$router.push({
      //   path: "/map",
      //   query: {
      //     formData: this.formData,
      //     type: this.type,
      //     id: this.id
      //   }
      // });

      // 政务钉钉端
      // dd.searchOnMap({
      //   // latitude: 39.903578, // 纬度
      //   // longitude: 116.473565, // 经度
      //   // scope: 500 // 限制搜索POI的范围；设备位置为中心，scope为搜索半径
      // })
      //   .then(result => {
      //     var address =
      //       result.province + result.city + result.adName + result.snippet;
      //     that.formData.incidentAddress = address;
      //     var point = GPS.gcj_decrypt(result.latitude, result.longitude); //转换坐标系
      //     that.formData.x = point.lon;
      //     that.formData.y = point.lat;
      //   })
      //   .catch(err => {
      //     alert(JSON.stringify(err));
      //   });
      // 钉钉端
      // dd.biz.map.locate({
      //   //latitude: 39.903578, // 纬度，非必须
      //   //longitude: 116.473565, // 经度，非必须
      //   onSuccess: function(result) {
      //     var address =
      //       result.province + result.city + result.adName + result.snippet;
      //     that.formData.incidentAddress = address;
      //     var point = GPS.gcj_decrypt(result.latitude, result.longitude); //转换坐标系
      //     that.formData.x = point.lon;
      //     that.formData.y = point.lat;
      //   },
      //   onFail: function(err) {
      //     alert(JSON.stringify(err));
      //   }
      // });
    },
    selectTime() {
      const that = this;
      dd.showDatePicker({
        format: "yyyy-MM-dd", //注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
        value: that.formData.incidentTime, //默认显示日期
      })
        .then((result) => {
          that.formData.incidentTime = result.value;
        })
        .catch((err) => {});
      // dd.biz.util.datetimepicker({
      //     format: 'yyyy-MM-dd HH:mm:ss',
      //     value: that.formData.incidentTime, //默认显示
      //     onSuccess : function(result) {
      //         that.formData.incidentTime = result.value;
      //     },
      //     onFail : function(err) {}
      // })
    },
    selectSex() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择性别？",
        cancelButton: "取消",
        otherButtons: ["男", "女"],
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData.sex = res.buttonIndex + 1;
          that.formData.sexName = ["男", "女"][res.buttonIndex];
          console.log(that.formData.sexName);
          that.$forceUpdate();
        },
        onFail: function (err) {},
      });
    },
    // 删除事件
    del() {
      const that = this;
      dd.device.notification.confirm({
        message: "您是否确定删除此事件?",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        onSuccess(result) {
          if (result.buttonIndex === 1) {
            dd.device.notification.showPreloader({
              text: "删除中..",
              showIcon: true,
              async onSuccess(result) {
                let params = { id: that.id, status: 0 };
                if (that.type == 122) {
                  params.sourceType = that.type;
                }
                const data = await updateEventNew(params);
                dd.device.notification.hidePreloader({
                  onSuccess: function (result) {},
                  onFail: function (err) {},
                });
                if (data.success) {
                  dd.alert({
                    message: data.message ? data.message : "操作成功",
                    title: "提示",
                    button: "收到",
                  })
                    .then((res) => {
                      that.$router.replace("/reported");
                    })
                    .catch((err) => {});
                  // dd.device.notification.toast({
                  //   // icon: '',
                  //   text: "删除成功",
                  //   duration: 1.5,
                  //   onSuccess(result) {
                  //     that.$router.replace("/reported");
                  //   }
                  // });
                } else {
                  alert(JSON.stringify(data.message ? data.message : "失败"));
                }
              },
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {},
      });
    },
    cancel() {
      this.edit = false;
      this.getDetail();
    },
    // 修改
    save() {
      const that = this;
      dd.device.notification.confirm({
        message: "您是否确定保存此次事件修改?",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        onSuccess: function (result) {
          if (result.buttonIndex === 1) {
            dd.device.notification.showPreloader({
              text: "修改中..",
              showIcon: true,
              async onSuccess(result) {
                const data = await addEvent(that.formData);
                dd.device.notification.hidePreloader({
                  onSuccess: function (result) {},
                  onFail: function (err) {},
                });
                if (data.success) {
                  dd.alert({
                    message: data.message ? data.message : "操作成功",
                    title: "提示",
                    button: "收到",
                  })
                    .then((res) => {
                      that.$router.replace("/reported");
                    })
                    .catch((err) => {});
                  // dd.device.notification.toast({
                  //   // icon: '',
                  //   text: "修改成功",
                  //   duration: 1.5,
                  //   onSuccess(result) {
                  //     that.$router.replace("/reported");
                  //   }
                  // });
                } else {
                  // alert(JSON.stringify(data.message ? data.message : "失败"));
                }
              },
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {},
      });
    },
    // 上报提交
    handClick(i) {
      let that = this;
      if (that.type === "2") {
        that.checkForm([
          ["title", "事件名称"],
          ["eventTypes", "事件类别"],
          ["actionType", "现实行为"],
          ["roadId", "所属街道"],
          ["incidentAddress", "所属地点"],
          ["incidentContent", "事件描述"],
          ["incidentTime", "事发时间"],
          ["joinNum", "涉及人数"],
        ]);
      }
      if (that.type === "3") {
        that.checkForm([
          ["title", "事件名称"],
          ["eventTypes", "事件类别"],
          ["actionType", "现实行为"],
          ["roadId", "所属街道"],
          ["incidentContent", "事件描述"],
        ]);
      }
      if (that.type === "9") {
        that.checkForm([
          ["title", "标题"],
          ["name", "姓名"],
          ["sex", "性别"],
          ["roadId", "所属街道"],
          ["actionType", "现实行为"],
          ["intro", "简介"],
        ]);
      }
      if (that.type === "8") {
        that.checkForm([
          ["title", "舆情名称"],
          ["eventTypes", "事件类别"],
          ["roadId", "所属街道"],
          ["actionType", "现实行为"],
          ["seetSource", "舆情来源"],
          ["incidentContent", "事件描述"],
          ["link", "网络连接"],
          ["involveWeb", "涉及网站"],
        ]);
      }
      if (that.type === "99") {
        that.checkForm([
          ["title", "事件名称"],
          ["eventType", "警情类型"],
          ["roadId", "所属街道"],
          ["actionType", "现实行为"],
          ["incidentContent", "事件描述"],
          ["incidentTime", "上报时间"],
          // ["earlyWarningName", "上报人"],
        ]);
        if (that.formData.eventType == 1) {
          that.arrverification(that.formData.eventLeader);
        }
      }
      if (that.type === "122") {
        that.checkForm([
          ["title", "事件名称"],
          ["eventTypes", "事件类别"],
          ["incidentContent", "简要概况"],
          ["roadId", "所属街道"],
          ["incidentTime", "事发时间"],
          ["handDetail", "处置意见"],
        ]);
        that.arrverification(that.formData.eventLeader);
      }
      if (that.formData.actionType && that.formData.actionType != 5) {
        that.formData.earlyWarningLevel = 1;
      }
      if (that.formData.eventName.length >= 3) {
        that.formData.earlyWarningLevel = 1;
      }
      if (!that.formData.x && that.formData.roadId) {
        that.formData.x = that.roadXY[that.formData.roadId].x;
        that.formData.y = that.roadXY[that.formData.roadId].y;
      }

      dd.device.notification.confirm({
        message: "确定上报？",
        title: "提示",
        buttonLabels: ["取消", "确定"],
        async onSuccess(res) {
          if (res.buttonIndex) {
            dd.device.notification.showPreloader({
              text: "上报中..",
              showIcon: true,
              async onSuccess(result) {
                const data = await addEvent(that.formData);
                dd.device.notification.hidePreloader({
                  onSuccess: function (result) {},
                  onFail: function (err) {},
                });
                if (data.success) {
                  dd.alert({
                    message: data.message ? data.message : "操作成功",
                    title: "提示",
                    button: "收到",
                  })
                    .then((res) => {
                      that.$router.replace("/reported");
                    })
                    .catch((err) => {});
                  // dd.device.notification.toast({
                  //   icon: "", //icon样式，不同客户端参数不同，请参考参数说明
                  //   text: "上报成功", //提示信息
                  //   duration: 1.5, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                  //   delay: 0, //延迟显示，单位秒，默认0
                  //   onSuccess(result) {
                  //     that.$router.replace("/reported");
                  //   },
                  //   onFail: function(err) {}
                  // });
                } else {
                  alert(JSON.stringify(data.message ? data.message : "失败"));
                }
              },
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {
          alert(JSON.stringify(err));
        },
      });
    },
    arrverification(arr) {
      let that = this;
      let i = 0;
      arr.map((item, index) => {
        if (item.name == "" || item.cardId == "") {
          i += 1;
        }
      });
      if (i > 0) {
        that.alert("人员信息不能为空");
        throw new Error("121");
      }
    },
    checkForm(arr) {
      arr.forEach((v) => {
        if (!(this.formData[v[0]] + "")) {
          this.alert("请完成" + v[1]);
          throw new Error("121");
        }
      });
    },
    alert(v) {
      dd.device.notification.alert({
        message: v,
        title: "提示",
        buttonName: "确定",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.reportedAdd_warp {
  padding-top: 60px;
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
  input {
    font-size: 30px;
    line-height: 50px;
    width: 100%;
  }
  .source {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 0 32px;
    background: #ebebeb;
    span,
    i {
      font-size: 24px;
      line-height: 60px;
    }
    span {
      opacity: 0.6;
    }
    i {
      color: #409eff;
    }
  }
  .form {
    .xc {
      .xc_main {
        .xc_question {
          padding: 10px 16px;
          background: #e6e6e6;
          color: gray;
          display: flex;
          justify-content: space-between;
          .xc_subtract {
            font-size: 40px;
            font-weight: bold;
            color: #5db1ff;
            margin-right: 2vw;
          }
          .xc_add {
            font-size: 40px;
            font-weight: bold;
            color: #5db1ff;
            margin-left: 8vw;
            margin-right: 2vw;
          }
        }
      }
    }
    // padding: 0 32px;
    &.unclick {
      * {
        pointer-events: none;
      }
    }
    .item {
      border-bottom: solid 1px #e4e4e4;
      padding: 8px 0 24px;
      padding-left: 32px;
      padding-right: 32px;
      &.incidentContent {
        p {
          display: inline-block;
          position: relative;
          // &::after{
          //     content: '*';
          //     position: absolute;
          //     right: -14px;
          //     top: 4px;
          //     color: red;
          // }
        }
      }
      .address {
        display: flex;
        input {
          width: auto;
          flex: 1;
        }
        i {
          font-size: 38px;
          opacity: 0.6;
          padding: 4px;
        }
      }
      p {
        line-height: 68px;
        &.active {
          color: #409eff;
          font-size: 24px;
        }
      }
    }
  }
  .endHolder {
    height: 136px;
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: solid 1px #e4e4e4;
    display: flex;
    justify-content: space-between;
    padding: 24px 32px;
    background: #fff;
    i,
    b,
    span {
      text-align: center;
      line-height: 72px;
      border-radius: 8px;
      letter-spacing: 5px;
    }
    span {
      width: 100%;
      background: #409eff;
      color: #fff;
    }
    i,
    b {
      width: 320px;
    }
    i {
      border: 1px solid #409eff;
      color: #409eff;
    }
    b {
      background: #409eff;
      color: #fff;
    }
  }
}
</style>
