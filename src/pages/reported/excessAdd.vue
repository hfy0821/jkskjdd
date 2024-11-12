<template>
  <div class="reportedAdd_warp mapClass">
    <div class="source">
      <span>来源：</span>
      <i>{{ sourceType }}</i>
    </div>
    <div class="form" :class="edit ? '' : 'unclick'" v-if="type == '9'">
      <div class="item">
        <p :class="formData.leaderName ? 'active' : ''">姓名</p>
        <input
          type="text"
          v-model.trim="formData.leaderName"
          placeholder="在此输入姓名"
        />
      </div>
      <div class="item">
        <p :class="formData.sexName ? 'active' : ''">性别</p>
        <input
          @click="selectSex"
          type="text"
          readonly
          :value="formData.sexName"
          placeholder="点击选择性别"
        />
      </div>
      <div class="item">
        <p :class="formData.age ? 'active' : ''">年龄</p>
        <input
          type="text"
          v-model.trim="formData.age"
          placeholder="被在此输入年龄"
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
      <div class="item">
        <p :class="formData.leaderAddress ? 'active' : ''">住址</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.leaderAddress"
            placeholder="点击选择住址"
          />
          <i @click="selectAddress(type)" class="iconfont icon-location"></i>
        </div>
      </div>
      <div class="item">
        <p :class="formData.incidentTime ? 'active' : ''">来访时间</p>
        <div class="address">
          <input
            readonly
            @click="selectTime"
            type="text"
            v-model="formData.incidentTime"
            placeholder="点击选择来访时间"
          />
        </div>
      </div>
      <div class="item">
        <p :class="formData.marriedName ? 'active' : ''">婚姻</p>
        <input
          @click="selectMarried"
          type="text"
          readonly
          :value="formData.marriedName"
          placeholder="点击选择婚姻"
        />
      </div>
      <div class="item">
        <p :class="formData.incidentContent ? 'active' : ''">心理简介</p>
        <textarea
          v-model.trim="formData.incidentContent"
          placeholder="在此输入心理简介"
        ></textarea>
        <!-- <input type="text" v-model.trim="formData.incidentContent" placeholder="在此输入仲裁请求"> -->
      </div>
      <div class="item">
        <p :class="formData.initialDiagnosis ? 'active' : ''">初步诊断</p>
        <textarea
          v-model.trim="formData.initialDiagnosis"
          placeholder="在此输入初步诊断"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.hiddenDangerValue ? 'active' : ''">是否存在隐患</p>
        <input
          @click="selectHiddenDanger"
          type="text"
          readonly
          :value="formData.hiddenDangerValue"
          placeholder="点击选择是否存在隐患"
        />
      </div>
    </div>
    <div class="form" :class="edit ? '' : 'unclick'" v-if="type === '118'">
      <div class="item">
        <p :class="formData.leaderName ? 'active' : ''">申请人</p>
        <input
          type="text"
          v-model.trim="formData.leaderName"
          placeholder="在此输入申请人"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderPhone ? 'active' : ''">申请人联系方式</p>
        <input
          type="text"
          v-model.trim="formData.leaderPhone"
          placeholder="在此输入申请人联系方式"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderCardId ? 'active' : ''">申请人身份证号</p>
        <input
          type="text"
          v-model.trim="formData.leaderCardId"
          placeholder="在此输入申请人身份证号"
        />
      </div>
      <div class="item">
        <p :class="formData.targetPeople ? 'active' : ''">被申请人</p>
        <input
          type="text"
          v-model.trim="formData.targetPeople"
          placeholder="在此输入被申请人姓名"
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
      <div class="item">
        <p :class="formData.incidentContent ? 'active' : ''">仲裁请求</p>
        <textarea
          v-model.trim="formData.incidentContent"
          placeholder="在此输入仲裁请求"
        ></textarea>
        <!-- <input type="text" v-model.trim="formData.incidentContent" placeholder="在此输入仲裁请求"> -->
      </div>
      <div class="item">
        <p :class="formData.incidentReason ? 'active' : ''">事实与理由</p>
        <textarea
          v-model.trim="formData.incidentReason"
          placeholder="在此输入事实与理由"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.hiddenDangerValue ? 'active' : ''">是否存在隐患</p>
        <input
          @click="selectHiddenDanger"
          type="text"
          readonly
          :value="formData.hiddenDangerValue"
          placeholder="点击选择是否存在隐患"
        />
      </div>
    </div>
    <div class="form" :class="edit ? '' : 'unclick'" v-if="type === '119'">
      <div class="item">
        <p :class="formData.title ? 'active' : ''">标题</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入标题"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderName ? 'active' : ''">姓名</p>
        <input
          type="text"
          v-model.trim="formData.leaderName"
          placeholder="在此输入姓名"
        />
      </div>
      <div class="item">
        <p :class="formData.sexName ? 'active' : ''">性别</p>
        <input
          @click="selectSex"
          type="text"
          readonly
          :value="formData.sexName"
          placeholder="点击选择性别"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderCardId ? 'active' : ''">身份证</p>
        <input
          type="text"
          v-model.trim="formData.leaderCardId"
          placeholder="在此输入身份证"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderPhone ? 'active' : ''">联系方式</p>
        <input
          type="text"
          v-model.trim="formData.leaderPhone"
          placeholder="在此输入联系方式"
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
      <div class="item">
        <p :class="formData.incidentAddress ? 'active' : ''">家庭住址</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.incidentAddress"
            placeholder="点击选择家庭住址"
          />
          <i @click="selectAddress(type)" class="iconfont icon-location"></i>
        </div>
      </div>
      <div class="item">
        <p :class="formData.leaderAddress ? 'active' : ''">户籍地</p>
        <div>
          <input
            type="text"
            v-model="formData.leaderAddress"
            placeholder="点击输入户籍地"
          />
        </div>
      </div>
      <div class="item">
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
      <div class="item">
        <p :class="formData.hiddenDangerValue ? 'active' : ''">是否存在隐患</p>
        <input
          @click="selectHiddenDanger"
          type="text"
          readonly
          :value="formData.hiddenDangerValue"
          placeholder="点击选择是否存在隐患"
        />
      </div>
      <div class="item">
        <p :class="formData.incidentContent ? 'active' : ''">简介</p>
        <textarea
          v-model.trim="formData.incidentContent"
          placeholder="在此输入简介"
        ></textarea>
      </div>
    </div>
    <div class="form" :class="edit ? '' : 'unclick'" v-if="type === '120'">
      <div class="item">
        <p :class="formData.incidentReason ? 'active' : ''">案由</p>
        <textarea
          v-model.trim="formData.incidentReason"
          placeholder="在此输入案由"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.title ? 'active' : ''">案号</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入案号"
        />
      </div>
      <!-- <div class="item">
        <p :class="formData.peopleSituation?'active':''">当事人基本情况</p>
        <textarea v-model.trim="formData.peopleSituation" placeholder="在此输入当事人基本情况"></textarea>
      </div>-->
      <div class="item">
        <p :class="formData.leaderName ? 'active' : ''">姓名</p>
        <input
          type="text"
          v-model.trim="formData.leaderName"
          placeholder="在此输入姓名"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderCardId ? 'active' : ''">身份证</p>
        <input
          type="text"
          v-model.trim="formData.leaderCardId"
          placeholder="在此输入身份证"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderPhone ? 'active' : ''">联系方式</p>
        <input
          type="text"
          v-model.trim="formData.leaderPhone"
          placeholder="在此输入联系方式"
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
      <div class="item">
        <p :class="formData.incidentAddress ? 'active' : ''">家庭住址</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.incidentAddress"
            placeholder="点击选择家庭住址"
          />
          <i @click="selectAddress(type)" class="iconfont icon-location"></i>
        </div>
      </div>
      <div class="item">
        <p :class="formData.incidentContent ? 'active' : ''">简要案情</p>
        <textarea
          v-model.trim="formData.incidentContent"
          placeholder="在此输入简要案情"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.reportReason ? 'active' : ''">维稳上报理由</p>
        <textarea
          v-model.trim="formData.reportReason"
          placeholder="在此输入维稳上报理由"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.measure ? 'active' : ''">工作建议</p>
        <textarea
          v-model.trim="formData.measure"
          placeholder="在此输入工作建议"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.hiddenDangerValue ? 'active' : ''">是否存在隐患</p>
        <input
          @click="selectHiddenDanger"
          type="text"
          readonly
          :value="formData.hiddenDangerValue"
          placeholder="点击选择是否存在隐患"
        />
      </div>
    </div>
    <!-- -= 区检察院 -->
    <div class="form" :class="edit ? '' : 'unclick'" v-if="type === '121'">
      <div class="item">
        <p :class="formData.incidentReason ? 'active' : ''">案由</p>
        <textarea
          v-model.trim="formData.incidentReason"
          placeholder="在此输入案由"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.title ? 'active' : ''">案号</p>
        <input
          type="text"
          v-model.trim="formData.title"
          placeholder="在此输入案号"
        />
      </div>
      <!-- <div class="item">
        <p :class="formData.peopleSituation?'active':''">当事人基本情况</p>
        <textarea v-model.trim="formData.peopleSituation" placeholder="在此输入当事人基本情况"></textarea>
      </div>-->
      <div class="item">
        <p :class="formData.leaderName ? 'active' : ''">姓名</p>
        <input
          type="text"
          v-model.trim="formData.leaderName"
          placeholder="在此输入姓名"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderCardId ? 'active' : ''">身份证</p>
        <input
          type="text"
          v-model.trim="formData.leaderCardId"
          placeholder="在此输入身份证"
        />
      </div>
      <div class="item">
        <p :class="formData.leaderPhone ? 'active' : ''">联系方式</p>
        <input
          type="text"
          v-model.trim="formData.leaderPhone"
          placeholder="在此输入联系方式"
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
      <div class="item">
        <p :class="formData.incidentAddress ? 'active' : ''">家庭住址</p>
        <div class="address">
          <input
            type="text"
            v-model="formData.incidentAddress"
            placeholder="点击选择家庭住址"
          />
          <i @click="selectAddress(type)" class="iconfont icon-location"></i>
        </div>
      </div>
      <div class="item">
        <p :class="formData.incidentContent ? 'active' : ''">简要案情</p>
        <textarea
          v-model.trim="formData.incidentContent"
          placeholder="在此输入简要案情"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.reportReason ? 'active' : ''">维稳上报理由</p>
        <textarea
          v-model.trim="formData.reportReason"
          placeholder="在此输入维稳上报理由"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.measure ? 'active' : ''">工作建议</p>
        <textarea
          v-model.trim="formData.measure"
          placeholder="在此输入工作建议"
        ></textarea>
      </div>
      <div class="item">
        <p :class="formData.hiddenDangerValue ? 'active' : ''">是否存在隐患</p>
        <input
          @click="selectHiddenDanger"
          type="text"
          readonly
          :value="formData.hiddenDangerValue"
          placeholder="点击选择是否存在隐患"
        />
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
    <div class="btn">
      <span @click="handClick(1)" v-if="!id">上报</span>
      <i @click="del()" v-show="!edit && id">删除</i>
      <b @click="edit = true" v-show="!edit && id">编辑</b>
      <i @click="cancel" v-show="edit && id">取消</i>
      <b @click="save" v-show="edit && id">保存</b>
    </div>
  </div>
</template>
<script>
import {
  addEvent,
  updateEvent,
  updateEventNew,
  getEventByIdByRbacToken,
} from "../../api/a";
import { GPS } from "../../utils/tools";
import mapComponents from "../../components/map";
import multiSelectOdd from "../../components/multiSelect_odd";

export default {
  name: "reportedAdd",
  components: {
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
      sourceType: "",
      typeList: [],
      type: this.$route.query.type || "",
      id: this.$route.query.id,
      index: [],
      edit: true,
      formData: {
        marriedName: "",
        married: "",
        title: "",
        leaderCardId: "",
        leaderPhone: "",
        leaderName: "",
        targetPeople: "",
        actionName: "",
        psyActionType: "",
        incidentContent: "",
        incidentReason: "",
        sex: "",
        sexName: "",
        hiddenDanger: "",
        hiddenDangerValue: "",
        incidentAddress: "",
        leaderAddress: "",
        peopleSituation: "",
        initialDiagnosis: "",
        reportReason: "",
        measure: "",
        roadName: "",
        roadId: "",
        incidentTime: "",
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
      // streetOption: ["SB街道","XX街道","123","其他"],
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
      return this.$store.state.common.actionList1;
    },
    actionOption() {
      return this.$store.state.common.actionList1.map((v) => {
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
    dd.disablePullToRefresh()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
    this.formData.sourceType = this.type / 1;
    if (this.type === "99") {
      this.formData.isType = 1;
    } else {
    }
    console.log(this.id);
    if (this.id) {
      document.title = "事件详情";
      this.edit = false;
      this.formData.id = this.id;
      this.getDetail();
    }
    this.typeList = ["", "", "维稳信息员", "110报警"];
    this.typeList[9] = "心理服务";
    this.typeList[8] = "舆情";
    this.typeList[99] = "公安警情";
    this.typeList[118] = "劳动仲裁";
    this.typeList[119] = "社会帮扶";
    this.typeList[120] = "区法院";
    //  -= 区检察院
    this.typeList[121] = "区检察院";
    this.sourceType = this.typeList[this.type];
  },
  methods: {
    map_return(data) {
      let that = this;
      that.mapStatus = data.status;
      if (data.v == 1) {
        if (that.type == 9) {
          that.formData.leaderAddress = data.address;
          that.formData.x = data.x;
          that.formData.y = data.y;
        }
        if (that.type == 119 || that.type == 120 || that.type == 121) {
          that.formData.incidentAddress = data.address;
          that.formData.x = data.x;
          that.formData.y = data.y;
        }

        // that.formData.incidentAddress = data.address; //家庭住址
        // that.formData.leaderAddress = data.address; //住址
        // that.formData.x = data.x;
        // that.formData.y = data.y;
      }
    },
    async getDetail() {
      const data = await getEventByIdByRbacToken({ id: this.id });
      if (data.success) {
        this.formData = data.data;
        // alert(typeof this.formData.married)
        // if(data.data.sourceType===2&&data.data.isType === 1){
        // 	this.type = '99'
        // } else {
        if (this.formData.psyActionType) {
          const item = this.actionList.find((v) => {
            return v.id === this.formData.psyActionType;
          });
          this.formData.actionName = item && item.name;
        }
        this.formData.hiddenDangerValue =
          this.formData.hiddenDanger == 0 ? "否" : "是";
        this.formData.sexName = this.formData.sex == 1 ? "男" : "女";
        this.formData.marriedName = ["未婚", "已婚", "离异", "丧偶"][
          this.formData.married
        ];
        this.type = data.data.sourceType + "";
        // }
        this.sourceType = this.typeList[this.type];
        // this.$forceUpdate()
      }
    },
    selectEventType() {
      const that = this;
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
        that.formData.psyActionType = data.id;
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
      //     that.formData.psyActionType = that.actionList[res.buttonIndex].id;
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
    selectAddress(type) {
      const that = this;
      that.mapStatus = true;
      // dd.locateOnMap({
      //   // latitude: 39.903578, // 纬度，非必须
      //   // longitude: 116.473565, // 经度，非必须
      // })
      //   .then((result) => {
      //     var address =
      //       result.province + result.city + result.adName + result.snippet;
      //     var point = GPS.gcj_decrypt(result.latitude, result.longitude); //转换坐标系
      //     if (that.type == 9) {
      //       that.formData.leaderAddress = address;
      //       that.formData.x = point.lon;
      //       that.formData.y = point.lat;
      //     }
      //     if (that.type == 119 || that.type == 120 || that.type == 121) {
      //       that.formData.incidentAddress = address;
      //       that.formData.x = point.lon;
      //       that.formData.y = point.lat;
      //     }
      //   })
      //   .catch((err) => {});
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
    },
    // selectTime() {
    //     const that = this
    //     dd.biz.util.datetimepicker({
    //         format: 'yyyy-MM-dd HH:mm:ss',
    //         value: that.formData.incidentTime,
    //         onSuccess : function(result) {
    //             that.formData.incidentTime = result.value;
    //         },
    //         onFail : function(err) {}
    //     })
    // },
    selectHiddenDanger() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择是否存在隐患？",
        cancelButton: "取消",
        otherButtons: ["否", "是"],
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData.hiddenDanger = res.buttonIndex;
          that.formData.hiddenDangerValue = ["否", "是"][res.buttonIndex];
          that.$forceUpdate();
        },
        onFail: function (err) {},
      });
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
    selectMarried() {
      const that = this;
      dd.device.notification.actionSheet({
        title: "选择是否已婚？",
        cancelButton: "取消",
        otherButtons: ["未婚", "已婚", "离异", "丧偶"],
        onSuccess: function (res) {
          if (res.buttonIndex === -1) return;
          that.formData.married = res.buttonIndex;
          that.formData.marriedName = ["未婚", "已婚", "离异", "丧偶"][
            res.buttonIndex
          ];
          that.$forceUpdate();
        },
        onFail: function (err) {},
      });
    },
    del() {
      this.verification();
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
                const data = await updateEventNew({ id: that.id, status: 0 });
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
                  // 	// icon: '',
                  // 	text: '删除成功',
                  // 	duration: 1.5,
                  // 	onSuccess(result) {
                  // 		that.$router.replace('/reported')
                  // 	}
                  // })
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
    save() {
      this.verification();
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
                const data = await updateEventNew(that.formData);
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
                  //   dd.device.notification.toast({
                  //     // icon: '',
                  //     text: "修改成功",
                  //     duration: 1.5,
                  //     onSuccess(result) {
                  //       that.$router.replace("/reported");
                  //     }
                  //   });
                }
              },
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {},
      });
    },
    handClick(i) {
      const that = this;
      that.verification();
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
                // alert(JSON.stringify(that.formData))
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
                  //   dd.device.notification.toast({
                  //     icon: "", //icon样式，不同客户端参数不同，请参考参数说明
                  //     text: "上报成功", //提示信息
                  //     duration: 1.5, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                  //     delay: 0, //延迟显示，单位秒，默认0
                  //     onSuccess(result) {
                  //       that.$router.replace("/reported");
                  //     },
                  //     onFail: function(err) {}
                  //   });
                }
              },
              onFail: function (err) {},
            });
          }
        },
        onFail: function (err) {},
      });
    },
    verification() {
      if (this.type === "9") {
        this.checkForm([
          ["leaderName", "姓名"],
          ["sex", "性别"],
          ["roadId", "所属街道"],
          ["leaderAddress", "住址"],
          ["married", "婚姻"],
          ["incidentContent", "心理简介"],
          ["initialDiagnosis", "初步诊断"],
          ["hiddenDanger", "是否存在隐患"],
        ]);
      }
      if (this.type === "118") {
        this.checkForm([
          ["leaderName", "申请人"],
          ["targetPeople", "被申请人"],
          ["roadId", "所属街道"],
          ["incidentContent", "仲裁请求"],
          ["incidentReason", "事实与理由"],
          ["hiddenDanger", "是否存在隐患"],
        ]);
      }
      if (this.type === "119") {
        this.checkForm([
          ["title", "标题"],
          ["leaderName", "姓名"],
          ["sex", "性别"],
          ["leaderCardId", "身份证"],
          ["leaderPhone", "联系方式"],
          ["roadId", "所属街道"],
          ["incidentAddress", "家庭住址"],
          ["leaderAddress", "户籍地"],
          ["psyActionType", "现实行为"],
          ["hiddenDanger", "是否存在隐患"],
          ["incidentContent", "简介"],
        ]);
      }
      if (this.type === "120") {
        this.checkForm([
          ["title", "案号"],
          ["leaderName", "姓名"],
          ["leaderCardId", "身份证"],
          ["leaderPhone", "联系方式"],
          ["roadId", "所属街道"],
          ["incidentAddress", "家庭住址"],
          // ["peopleSituation", "当事人基本情况"],
          ["incidentReason", "案由"],
          ["incidentContent", "简要案情"],
          ["reportReason", "维稳上报理由"],
          ["measure", "工作建议"],
          ["hiddenDanger", "是否存在隐患"],
        ]);
      }
      //  -= 区检察院
      if (this.type === "121") {
        this.checkForm([
          ["title", "案号"],
          ["leaderName", "姓名"],
          ["leaderCardId", "身份证"],
          ["leaderPhone", "联系方式"],
          ["roadId", "所属街道"],
          ["incidentAddress", "家庭住址"],
          // ["peopleSituation", "当事人基本情况"],
          ["incidentReason", "案由"],
          ["incidentContent", "简要案情"],
          ["reportReason", "维稳上报理由"],
          ["measure", "工作建议"],
          ["hiddenDanger", "是否存在隐患"],
        ]);
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
    padding: 0 32px;
    &.unclick {
      * {
        pointer-events: none;
      }
    }
    .item {
      border-bottom: solid 1px #e4e4e4;
      padding: 8px 0 24px;
      textarea {
        width: 100%;
        height: 100px;
      }
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
