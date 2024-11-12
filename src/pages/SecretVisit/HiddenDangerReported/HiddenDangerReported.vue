<template>
  <div class="hiddenReportMaxbox">
    <div style="height:50vh;width:100%">
      <Map :disable="pageType == 2"
           v-if="pageType == 1"
           @getInfo="getMapinfo($event)" />
      <Map :disable="pageType == 2"
           v-else
           :Pointpos="[uploadinfo.longitude,uploadinfo.latitude]"
           @getInfo="getMapinfo($event)" />
    </div>
    <div class="contentBox">
      <div style="display:flex;justify-content: space-between;">
        <div class="contentTitle">点位信息</div>
        <div style="width:19vw"
             v-if="pageType == 2">
          <div class="StatusBox"
               :style="{backgroundColor: uploadinfo.eventState == 5 || uploadinfo.eventState == 6 ? '#c4c4c4':'#5DC687'}">
            {{uploadinfo.eventStateName}}
          </div>
        </div>
      </div>
      <div class="contentForm">
        <div class="content_label"><span>*</span>地点定位</div>
        <div class="shellBox"
             style="width:75%;">
          <input style="padding:5px 8px;width:100%;background-color:white;"
                 v-if="!(pageType == 2)"
                 :style="{color: uploadinfo.locationAddress == '' ? '#E4E4E4':'black'}"
                 :disabled="true"
                 placeholder="请在地图上取点选择"
                 v-model="uploadinfo.locationAddress" />
          <div v-else
               class="scrollBarBox">
            {{uploadinfo.locationAddress}}
          </div>

          <!-- <div style="padding:5px 8px;color:#c8c9cc;overflow: scroll;"
               :style="uname != ''?{color:'black'}:''">
            {{uname == ''?"请输入":uname}}
          </div> -->
          <!-- <van-field v-model="uname"
                     :value="uname"
                     :style="{color:'black'}"
                     :disabled="true"
                     placeholder="请在地图上点击" /> -->
        </div>
      </div>
      <div class="contentForm">
        <div class="content_label"><span>*</span>所属镇街</div>
        <div class="shellBox"
             style="width:75%">
          <popSelect :muiltdate="streetList"
                     :exisVal="uploadinfo.orgRoadName"
                     placehold="请选择镇街"
                     :disable="pageType == 2"
                     @ValChange="onChange($event)"
                     :bindkey="'name'">
            <div>1</div>
          </popSelect>
        </div>
      </div>
      <div class="contentForm">
        <div class="content_label"><span>*</span>点位名称</div>
        <div class="shellBox"
             style="width:75%">
          <input style="padding:5px 8px;width:100%;background-color:white;"
                 v-if="!(pageType == 2)"
                 :style="{color: uploadinfo.pointName == '' ? '#E4E4E4':'black'}"
                 placeholder="请输入点位名称"
                 v-model="uploadinfo.pointName" />
          <div v-else
               class="scrollBarBox">{{uploadinfo.pointName}}</div>
        </div>
      </div>
      <div class="contentForm"
           style="align-items: flex-start;margin-bottom:0px">
        <div class="content_label"
             style="margin-top:19px;"><span>*</span>照片信息</div>
        <div style="width:75%">
          <!-- <div class="butStyle_color-gray">
            添加照片
          </div> -->
          <imgUp :disable="pageType == 2"
                 :filelist="pointImgUrls"
                 ref="imgDom"
                 @getimgId="getimginfo($event)"></imgUp>
        </div>
      </div>
    </div>

    <div class="contentBox">
      <div class="contentTitle">隐患信息</div>

      <div class="HiddenDangerDetailBox"
           v-for="(item,idx) in HiddenDangerInfo"
           :key="idx"
           @click="pageType == 2?$push('/SecretVisit/HiddenDangerDetail/HiddenDangerDetail',{Status:item.state,eventState:uploadinfo.eventState,HiddenDangerId:item.id,hidedangSize:HiddenDangerInfo.length}):$push('/SecretVisit/HiddenDangerAdded/HiddenDangerAdded',{infoId:idx+1})">

        <div style="width:28%">
          <!-- <img style="width:20vw;height:20vw;"
               src="../../../assets/image/0.png" /> -->
          <img style="width:25vw;height:25vw;"
               v-if="pageType == 2"
               :src="item['picIds'][0]" />
          <img style="width:25vw;height:25vw;"
               v-else
               :src="item.imginfo['url'][0]" />
        </div>

        <div style="width:50%">
          <div style="color:#9A8D8E;font-weight:bold;margin-top:10px;margin-bottom:8px;">
            隐患描述
          </div>
          <div style="color:#9A8D8E">
            {{item.description.length > 25 ? item.description.substring(0,20) + "......" : item.description}}
          </div>
        </div>

        <div class="delIcon">
          <img v-if="pageType == 1"
               @click.stop="removeHideDanger(idx)"
               src="../../../assets/image/del2.png" />
          <div v-else
               style="width:20vw;text-align: center;line-height:20px;color:white;border-radius: 4px;"
               :style="{backgroundColor: item.state == 1 || item.state == 7 ? '#C4C4C5' : item.start == 2 ? '#5dc687' : item.start == 6 ?'#5dc687' : '#ffc900' }">
            {{item.stateName}}
          </div>
        </div>
      </div>

      <div>
        <div class="butStyle_color-gray"
             v-if="pageType == 1"
             style="margin-top:25px;"
             @click="gotoaddPage">
          添加隐患
        </div>
      </div>

    </div>

    <div class="contentBox"
         v-if="pageType == 2">
      <div class="contentTitle">流转信息</div>
      <div class="contentForm">
        <div class="content_label">上报时间</div>
        <div style="width:75%;">
          {{uploadinfo.reportTime}}
        </div>
      </div>
      <div class="contentForm"
           v-if="pointinfoType != 6 &&  pointinfoType != 1">
        <div class="content_label">指派时间</div>
        <div style="width:75%;">
          {{uploadinfo.assignTime}}
        </div>
      </div>
      <div class="contentForm"
           v-if="pointinfoType != 6 &&  pointinfoType != 1 &&  pointinfoType != 2">
        <div class="content_label">提交审核</div>
        <div style="width:75%;">
          {{uploadinfo.approveTime}}
        </div>
      </div>
      <div class="contentForm"
           v-if="pointinfoType == 5">
        <div class="content_label">办结时间</div>
        <div style="width:75%;">
          {{uploadinfo.finishTime}}
        </div>
      </div>
      <div class="contentForm"
           v-if="pointinfoType == 6">
        <div class="content_label">撤销时间</div>
        <div style="width:75%;">
          {{uploadinfo.revokeTime}}
        </div>
      </div>
    </div>

    <div style="padding-bottom:15vh"></div>

    <div class="newButton-submit-botBox">
      <div class="butStyle_color-green"
           @click="submitReview"
           v-if="groupType == 2  && pointinfoType == 2">
        提交审核
      </div>
      <div class="butStyle_color-green"
           @click="upInfo"
           v-else-if="pageType == 1">
        提交
      </div>
      <div class="butStyle_color-green"
           @click="window.history.go(-1)"
           v-else>
        返回
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Notify } from 'vant';
import popSelect from "../../../components/newmultiSelect"
import Map from "../../../components/newMap"
import imgUp from "../../../components/imgUpload"
import { getTypeList_13, upload } from "../../../api/a"
export default {
  name: 'HiddenDangerReported',
  components: {
    popSelect,
    Map,
    imgUp
  },
  data () {
    return {
      streetList: [
        {
          name: 'al'
        }
      ],
      selectShow: false,
      pageType: -1, // 1 添加 2 编辑
      eventid: 0,//事件id
      pointinfoType: 0, // 1-6 页面 type
      groupType: 0,
      window: window,
      HiddenDangerInfo: [],
      pointImgUrls: [], //图片的url集合
      conversionTimeArrys: ['reportTime', 'assignTime', 'approveTime', 'finishTime', 'revokeTime'],
      uploadinfo: {
        // locationAddress: '123',
        // pointName: '点位名称1234',
        // orgRoad: '',
        // orgRoadName: '123456',
        // longitude: '120.986297',
        // latitude: '30.112520',
        // picIds: '照片id',
        // reportTime: '12',
        // assignTime: '123',
        // approveTime: '1234',
        // finishTime: '结束时间',
        // revokeTime: '撤销时间'
      },
      timeOut: null
    }
  },
  activated () {
    if (this.pageType == 1) {
      this.getHiddenDangerList();
    }
    else {
      this.getPointEventDetail();
    }
  },
  mounted () {
    if (this.$route.query.type == 'detail') {
      this.pageType = 2;
      this.eventid = this.$route.query.eventID;
      this.pointinfoType = this.$route.query.eventState;
      this.groupType = this.$store.state.groupType
      this.getPointEventDetail();
    } else {
      this.pageType = 1;
      this.getHiddenDangerList();
    }
    this.$store.commit('StoreData', { key: "includeArry", value: ['HiddenDangerReported'] })
    this.getStreetList();
  },
  methods: {
    getTypeList_13,
    upload,
    onChange (e) {
      this.uploadinfo.orgRoad = e.id
      this.uploadinfo.orgRoadName = e.name
    },
    // 获取地图点击
    getMapinfo (e) {
      if (this.pageType == 2) {
        return
      }
      this.uploadinfo.latitude = e.lat;
      this.uploadinfo.longitude = e.lon;
      this.uploadinfo.locationAddress = e.addName;
      this.$forceUpdate();
    },
    // 获取选择的图片
    async getimginfo (e, type) {
      let _endString = this.$utils.getString(e, ',');
      this.uploadinfo['picIds'] = _endString;
    },
    // 获取前端的隐患信息
    getHiddenDangerList () {
      if (this.pageType == 1) {
        this.HiddenDangerInfo = this.$store.state.HiddenDangerInfo;
      } else {
        this.getPointEventDetail();
      }
    },
    // 获取隐患详情 -- 接口
    getPointEventDetail () {
      this.$httpapi.getPointEventDetail({
        pageSize: 20,
        pageNo: 1,
        id: this.eventid,
        eventState: this.pointinfoType
      }).then((res) => {
        if (res.success == 1) {
          this.HiddenDangerInfo = res.data.hiddenTroubleList
          this.pointinfoType = res.data.eventState
          this.HiddenDangerInfo.map((itemRes, idx) => {
            let end = this.$utils.relimgUrl(itemRes.picIds, true)
            return itemRes.picIds = end;
          })
          this.uploadinfo = res.data;
          // this.conversionTimeArrys.map((res1, idx1) => {
          //   if (this.uploadinfo[res1] != undefined) {
          //     this.uploadinfo[res1] = this.$utils.timeDeal(this.uploadinfo[res1])
          //   }
          // })
          let end = this.$utils.relimgUrl(res.data.picIds, true)
          this.pointImgUrls = end
        } else {
          if (res.message == '查询失败,请联系管理员') {
            this.$router.go(-1);
          }
        }
      })
    },
    // 移除隐患
    removeHideDanger (idx) {
      const _that = this;
      Dialog.confirm({
        title: '确认删除',
        width: '250px',
      })
        .then((res) => {
          let arrys = this.$store.state.HiddenDangerInfo;
          arrys.splice(idx, 1);
          this.$store.commit('StoreData', { key: "HiddenDangerInfo", value: [...arrys] })
        })
    },
    // 获取街道信息
    async getStreetList () {
      let street = await this.getTypeList_13({
        type: 13
      })
      this.streetList = street.data
    },
    // 信息上传
    async upInfo () {
      console.log(this.uploadinfo)
      if (this.uploadinfo.orgRoadName == '' || this.uploadinfo.orgRoadName == undefined) {
        Notify({ type: 'danger', message: '所属镇街未选择' });
        return
      }
      if (this.uploadinfo.pointName == '' || this.uploadinfo.pointName == undefined) {
        Notify({ type: 'danger', message: '点位名称不能为空' });
        return
      }

      const _that = this;
      this.$refs.imgDom.sendInfo3();

      if (this.uploadinfo.picIds == '' || this.uploadinfo.picIds == undefined) {
        Notify({ type: 'danger', message: '照片信息不能为空' });
        return
      }

      let arry = [...this.HiddenDangerInfo];
      let newarry = [];
      arry.map((item, idx) => {
        let enditem = {
          picIds: null,
          description: null
        }
        let _endString = _that.$utils.getString(item.imginfo.id, ',');
        enditem.description = item.description
        enditem.picIds = _endString

        newarry.push(enditem);
      })
      console.log(newarry)


      this.Load.showLoad();
      this.$httpapi.addPointLocationEvent({
        ...this.uploadinfo,
        hiddenTroubleList: [
          ...newarry
        ]
      }).then((res) => {
        this.Load.hideLoad();
        if (res.success == 1) {
          setTimeout(() => {
            this.$router.go(-1)
          }, 200);
        } else {
          Notify({ type: 'danger', message: res.message });
        }
      })
    },
    // 初查审核
    submitReview () {
      this.$httpapi.checkApproveHiddenTrouble({
        businessKey: this.uploadinfo.id,
        operation: 'commit',
      }).then((res) => {
        if (res.success == 1) {
          Notify({ type: 'success', message: "提交成功" });
          setTimeout(() => {
            this.$router.go(-1);
          }, 500);
        } else {
          Notify({ type: 'danger', message: res.message });
        }
      })
    },
    gotoaddPage () {
      this.$refs.imgDom.sendInfo();
      // this.$store.commit('StoreData', { key: 'hidedangRouteName', value: '隐患上报' });
      this.$push('/SecretVisit/HiddenDangerAdded/HiddenDangerAdded');
    }
  }
}
</script>
<style lang="less" scoped>
.hiddenReportMaxbox {
  width: 100vw;
  overflow: hidden;
}
.contentBox {
  padding: 15px;
  width: 100%;
  .contentTitle {
    font-weight: bold;
    margin-bottom: 15px;
  }
  .contentForm {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    .content_label {
      flex-basis: 20%;
      width: 20%;
      span {
        color: red;
        margin-right: 5px;
      }
    }
  }
}
.HiddenDangerDetailBox {
  border-radius: 9px;
  background-color: #f8f8f9;
  display: flex;
  position: relative;
  margin-bottom: 12px;
  width: 100%;
  padding: 15px 15px;
  .delIcon {
    position: absolute;
    top: 9px;
    right: 9px;
    > img {
      @size: 40px;
      height: @size;
      width: @size;
    }
  }
}
.StatusBox {
  color: white;
  width: 100%;
  border-radius: 9px;
  line-height: 40px;
  text-align: center;
}
.van-field__control:disabled {
  color: black !important;
  -webkit-text-fill-color: black !important;
}
.scrollBarBox {
  padding: 5px 8px;
  // color: #c8c9cc;
  white-space: nowrap;
  overflow-x: auto;
}
::-webkit-scrollbar {
  display: none;
}
// .scrollBarBox::-webkit-scrollbar-thumb {
//   // background-color: transparent !important;
//   background: #5d7cd7;
//   display: none;
//   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   // border: 1px solid transparent;
// }
</style>
