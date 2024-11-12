<template>
  <div class="Maxbox">
    <div class="headInfoBox">
      <div class="infoHead">
        <span>{{GroupInfo.name}}</span>
        <span>组别：{{GroupInfo.groupName}}</span>
      </div>
      <div class="infoContent">
        <div v-for="(item,index) in useType == 1 ?infoArrys1:infoArrys2"
             :key="index"
             class="infoItem">
          {{
            item.title+"：" 
          }}
          {{
             hiddenDangerStatistics == null ? 0 :hiddenDangerStatistics[item.key]
          }}
        </div>
      </div>
    </div>

    <div class="MyRepresentations"
         v-if="useType == 2">
      <!-- ${process.env.baseUrl}fyProHandle/file/download/${item}?rbacToken=${user.rbacToken} -->
      <div @click="$store.commit('StoreData', { key: 'RequestName', value: '申述列表' }),$push('/SecretVisit/ListRepresentations/ListRepresentations',{pageType:1})">我的申诉</div>
      <div @click="$store.commit('StoreData', { key: 'RequestName', value: '延期申请' }),$push('/SecretVisit/ListRepresentations/ListRepresentations',{pageType:2})">延期申请</div>
    </div>

    <div class="searchBox"
         @click="$router.push('/SecretVisit/SearchPage/searchPage')">
      <div class="imgBox">
        <img src="../../assets/image/eventIcon/search.png" />
      </div>
      <span>{{searchVal == '' ? '搜索点位关键字':searchVal}}</span>
    </div>

    <div class="tabBox">
      <div v-for="(item,index) in tabItems"
           class="tabItem"
           :class="tabIdx == index?'tabClick':''"
           @click="tabClick(index,item)"
           :key="index">
        {{item.name}}
      </div>
    </div>
    <scrollBox @scrollTop="onScroller"
               maxheight="59vh">
      <div class="detailBigBox">
        <div class="detailBox"
             v-for="(item,index) in pointList"
             @click="
             $store.commit('StoreData', { key: 'pointRouteName', value: '点位详情' }),
             $push('/SecretVisit/HiddenDangerReported/HiddenDangerReported',{
                    type:'detail',
                    eventID:item.id,
                    eventState:item.eventState
                  })"
             :key="index">
          <div class="detail_address">
            {{item.pointName.length > 20 ? item.pointName.substring(0,20) +'......' : item.pointName}}
          </div>
          <div class="detail_line between"
               style="margin:9px 0px">
            <span>
              所属街镇：{{item.orgRoadName}}
            </span>
            <span>
              {{item.reportTime}}
            </span>
          </div>
          <div class="detail_line">
            地址：{{item.locationAddress}}
          </div>
          <div class="posBox"
               :style="item.eventState == 5 || item.eventState == 6 ? {backgroundColor:'#a1b7d0'}:''">
            {{item.eventStateName}}
            <!-- 事件状态名称 -->
          </div>
        </div>
      </div>
    </scrollBox>

    <div class="btuBox"
         v-if="useType == 1">
      <van-button class="butStyle"
                  @click="
                  $store.commit('StoreData', { key: 'pointRouteName', value: '点位上报' }),
                  $push('/SecretVisit/HiddenDangerReported/HiddenDangerReported',{
                    type:'add'
                  })"
                  style="color:white"
                  type="primary">点位上报</van-button>
    </div>
  </div>
</template>

<script>
import scrollBox from '../../components/ScrollCont'
import { Notify } from 'vant';
export default {
  components: {
    scrollBox
  },
  data () {
    return {
      infoArrys1: [
        {
          title: '累计上报点位数',
          key: 'totalPointEventCount'
        },
        {
          title: '累计上报隐患数',
          key: 'totalHiddenTroubleCount'
        },
      ],
      infoArrys2: [
        {
          title: '进行中的隐患数',
          key: 'handlingHiddenTroubleCount'
        },
        {
          title: '已完成隐患处置数',
          key: 'handledHiddenTroubleCount'
        }
      ],
      tabItems: [
        {
          name: '全部',
          key: ''
        },
        {
          name: '初查',
          key: '1'
        },
        {
          name: '进行中',
          key: '2'
        },
        {
          name: '审核中',
          key: '3'
        },
        {
          name: '复查',
          key: '4'
        },
        {
          name: '办结',
          key: '5'
        },
        {
          name: '撤销',
          key: '6'
        },
      ],
      tabIdx: 0,//idx
      tabkey: '',//name
      pageNo: 1,
      pgaeToatal: 0,
      useType: 1, // 1 督察 2 镇街
      timeOut: null,
      searchVal: '',//搜索内容
      hiddenDangerStatistics: null,//隐患统计
      loadMore: true,
      GroupInfo: {
        name: '',
        groupName: '',
        groupId: '',
        groupType: ''//1督查组，2镇街工作组，3总部，4分部，5市级抽查组
      },//组别信息
      pointList: [
        // {
        //   orgRoadName: '镇街',
        //   pointName: '点位名称',
        //   locationAddress: '定位地址',
        //   reportTime: '时间',
        //   eventStateName: '状态',
        //   eventState: '5'// 1-6
        // }
      ]
    }
  },
  watch: {
    // 当输入框内的值发生变化的时候在调用接口来进行数据的请求
    // searchVal (value) {
    //   this.getPointEventList()
    // },
    useType (value) {
      if (this.useType == 2) {
        this.tabItems.splice(1, 1);
      }
    }
  },
  mounted () {
    this.$store.commit('StoreData', { key: "includeArry", value: [] })
    this.getPointEventList();
    this.getUserGroupInfo();
  },
  created () {
    this.UpdateData()
  },
  methods: {
    // 滚动获取数据
    onScroller () {
      if (this.pgaeToatal == 0) {
        return
      }
      if (this.pointList.length >= this.pgaeToatal) {
        Notify({ type: 'danger', message: '无更多数据' });
        return
      }
      this.pageNo += 1;
      this.getPointEventList();
    },
    // 
    clertRecord () {
      this.pointList = [];
      this.pageNo = 1;
    },
    tabClick (idx, item) {
      this.tabIdx = idx
      this.tabkey = item.key
      this.clertRecord();
      this.getPointEventList();
    },
    UpdateData () {
      // 搜索记录
      this.searchVal = this.$store.state.searchHistory
      // 当从添加隐患页面出来后，清空隐患信息
      if (Object.keys(this.$store.state.HiddenDangerInfo).length != 0) {
        this.$store.commit('StoreData', { key: "HiddenDangerInfo", value: [] })
      }
    },
    // 获取点位列表
    getPointEventList () {
      this.Load.showLoad();
      this.$httpapi.getPointEventList({
        pageSize: 20,
        pageNo: this.pageNo,
        keyword: this.searchVal,
        // orgRoad: '',
        eventState: this.tabkey
      }).then((res) => {
        this.Load.hideLoad();
        if (res.success == 1) {
          this.pointList = [...this.pointList, ...res.data.data];
          this.pgaeToatal = res.data.total
        } else {
          Notify({ type: 'danger', message: res.message });
        }
      })
    },
    // 获取组别信息 事件统计
    getUserGroupInfo () {
      this.$httpapi.getUserGroupInfo({

      }).then((res) => {
        const _that = this
        if (res.success == 1) {
          this.GroupInfo = res.data
          let type = res.data.groupType
          if (type == 1 || type == 5) {
            _that.useType = 1
          } else {
            _that.useType = 2
          }
          this.$store.commit('StoreData', { key: "groupType", value: res.data.groupType })
        } else {
          Notify({ type: 'danger', message: res.message });
        }
      })
      this.$httpapi.getHiddenTroubleStatistic({
      }).then((res) => {

        if (res.success == 1) {
          this.hiddenDangerStatistics = res.data
        } else {
          Notify({ type: 'danger', message: res.message });
        }
      })

    }
  }
}
</script>

<style lang="less" scoped>
.radio-circle {
  border-radius: 9px;
}
.Separation {
  margin: 25px 0px;
}
.Maxbox {
  padding: 15px;
}
.headInfoBox {
  background-color: #1684fc;
  .radio-circle();
  padding: 9px;
  @padding: 19px;

  .infoHead {
    padding: 19px @padding;
    border-bottom: 1px solid #8ac1fd;
    color: white;
    span:nth-child(1) {
      font-size: 40px;
      color: white;
    }
    span:nth-child(2) {
      display: inline-block;
      padding: 3px 19px;
      margin-left: 9px;
      color: white;
      background-color: #5dc687;
      .radio-circle();
    }
  }
  .infoContent {
    padding: 25px @padding 15px @padding;
    .infoItem {
      color: white;
      margin-bottom: 15px;
    }
  }
}
//我的申请
.MyRepresentations {
  .Separation();
  display: flex;

  justify-content: space-between;
  div {
    width: 49%;
    background-color: #84bbf6;
    color: white;
    .radio-circle();
    line-height: 160px;
    text-align: center;
  }
}
// 搜索框
.searchBox {
  .radio-circle();
  .Separation();
  border: 1px solid #e0e3e3;
  background-color: #fafafa;
  padding: 9px 15px;
  display: flex;
  align-items: center;
  .imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    padding: 15px 0px;
    background-color: #1684fc;
    > img {
      width: 32px;
      height: 32px;
    }
    .radio-circle();
  }
  span {
    margin-left: 9px;
    color: #b2b6b6;
  }
}
// tab
.tabBox {
  margin: 35px 0px;
  display: flex;
  .tabItem {
    flex-grow: 1;
    text-align: center;
    color: #888888;
    background-color: white;
    padding: 9px 0px;
    .radio-circle();
  }
  .tabClick {
    color: white;
    background-color: #1684fc;
  }
}
.detailBigBox {
  padding-bottom: 4vh;
  .Separation();
  .between {
    display: flex;
    justify-content: space-between;
  }
  .detailBox {
    @paddingSize: 15px;
    background-color: #f8f8f9;
    position: relative;
    margin-bottom: 15px;
    padding: 42px @paddingSize 32px @paddingSize;
    .radio-circle();
    .detail_address {
      font-weight: bold;
    }
    .detail_line {
      color: #7f7c83;
      > span {
        color: #7f7c83;
      }
      span:nth-child(2) {
        flex-basis: 40%;
        text-align: right;
      }
    }
    .posBox {
      .radio-circle();
      background-color: #5dc687;
      position: absolute;
      right: @paddingSize;
      top: 0px;
      color: white;
      text-align: center;
      width: 160px;
      padding: 3px 0px;
    }
  }
}
.btuBox {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding: 15px;
  background-color: white;
  .butStyle {
    width: 100%;
    padding: 35px !important;
    background-color: #5dc687;
    span {
      color: white;
      margin: 15px 0px;
    }
  }
}
</style>