<template>
  <div style="with:100%;padding:15px;">
    <Newtab :List="tabList"
            style="margin-bottom:15px"
            @sendInfo="sendinfo($event)" />
    <ScrollBox @scrollTop="scrolltop"
               :maxheight="'85vh'">
      <div class="bgbox"
           v-for="(item,idx) in infoList"
           @click="
           $store.commit('StoreData', { key: 'pointRouteName', value: '点位详情' }),
           $push('/SecretVisit/HiddenDangerDetail/HiddenDangerDetail',{Postponebool:pageType,Status:'4',HiddenDangerId:item.id,pointId:item.pointId,eventState:item.eventState})"
           :key="idx">
        <div class="posTop">
          <div style="font-weight:bold"
               :style="{color: item.state == 3 ? '#DB5050' : item.state == 2 ? '#72cb96':'#fdce1c' }">{{item.stateName}}</div>
        </div>
        <div style="width:30%;height:15vh">
          <img style="width:100%;height:100%"
               :src="$utils.relimgUrl(item['picIds'],true)[0]" />
        </div>
        <div style="width:68%">
          <div class="Highlight">隐患描述</div>
          <div style="color:#808A91">
            {{item['description'] != undefined? item['description'].length > 25 ? item['description'].substring(0,25) + '......' : item['description']:''}}
          </div>
        </div>
      </div>
    </ScrollBox>
  </div>
</template>

<script>
import Newtab from '../../../components/newTab'
import ScrollBox from "../../../components/ScrollCont"
import { Notify } from 'vant';
export default {
  components: {
    Newtab,
    ScrollBox
  },
  data () {
    return {
      tabList: [
        {
          name: '全部',
          key: 1
        },
        {
          name: '申诉中',
          key: 2
        },
        {
          name: '已完成',
          key: 3
        }
      ],
      infoList: [
        // {
        //   name: '1',
        //   type: 1
        // },
      ],
      tabIdx: 0,
      pageNo: 1,
      pageTotal: 0,
      pageType: -1,
      loading: false,
      finished: false
    }
  },
  mounted () {
    this.$store.commit('StoreData', { key: "includeArry", value: [] })
    if (this.$route.query.pageType) {
      this.pageType = this.$route.query.pageType
      if (this.pageType == 2) {
        this.tabList[1].name = "申请中";
      }
      this.getTroublePage();
    }
  },
  methods: {
    sendinfo (e) {
      this.tabIdx = e.Index
      this.infoList = [];
      this.pageNo = 1;
      this.getTroublePage();
    },
    getTroublePage () {
      this.Load.hideLoad();
      this.$httpapi.queryFlowHiddenTroublePageForAppealOrExtension({
        pageSize: 20,
        pageNo: this.pageNo,
        queryRange: this.tabIdx + 1,
        approveType: this.pageType, // 1 2
      }).then((res) => {
        this.Load.hideLoad();
        this.pageTotal = res.data.total
        this.infoList = [...this.infoList, ...res.data.data]
      })
    },

    scrolltop () {
      if (this.infoList.length >= this.pageTotal) {
        Notify({ type: 'danger', message: '无更多数据' });
        return
      };
      this.pageNo += 1;
      this.getTroublePage();
    }
  }
}
</script>

<style lang='less'>
.bgbox {
  width: 100%;
  display: flex;
  padding: 15px;
  justify-content: space-between;
  background-color: #f8f8f9;
  border-radius: 5px;
  margin-bottom: 15px;
  position: relative;
}
.Highlight {
  margin-bottom: 15px;
  font-weight: bold;
  color: #88949f;
}
.posTop {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>