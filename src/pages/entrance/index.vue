<template>
  <div class="entrance_warp" v-show="toggle">
    <div class="logo">
      <img :src="require('@/assets/image/buwang.png')" alt />
    </div>
    <div class="content">
      <div class="rlist_tab">
        <div class="tab_item" v-for="(item, index) in rightList" :key="index">
          <div @click="onTab(index, 'scroll_' + index)" :class="tabIndex == index
           ? 'tab_item_active' : null">{{ item.name }}</div>
        </div>
      </div>
      <div class="main" id="scrollBox">
        <div class="inner">
          <div id="scroll_0" class="line">
            <div class="quick">县乡一体</div>
          </div>
          <div @click="handclick(item)" v-for="item in listOne" :key="item.name">
            <img :src="item.img" alt />
            <h5>{{ item.name}}</h5>
          </div>
          <div id="scroll_1" class="line">
            <div class="quick">一体两翼</div>
          </div>
          <div @click="handclick(item)" v-for="item in listTwo" :key="item.name">
            <img :src="item.img" alt />
            <h5>{{ item.name}}</h5>
          </div>
           <div id="scroll_2" class="line">
            <div class="quick">其他</div>
          </div>
          <div @click="handclick('/ARuiAn/Equipment/list')" v-if="userInfo.ifOperater">
            <img :src="require('@/assets/image/3.png')" alt />
            <h5>设备操作员</h5>
          </div>
          <div @click="handclick('/SecretVisit/index')">
            <img :src="require('@/assets/image/9.png')" alt />
            <h5>暗访系统</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fyApiGatewayConfig,
  fyApiGatewayUserInfo,
  updateJspticket
} from '../../api/a'
import ding from '../../common/ding'
export default {
  data () {
    return {
      toggle: false,
      userInfo: {},
      nums: 1,
      tabIndex: 0,
      rightList: [
        { id: 1, name: '县乡一体' },
        { id: 2, name: '一体两翼' },
        { id: 3, name: '其他' }
      ],
      listOne: [
        {
          name: '零报告',
          img: require('@/assets/image/6.png'),
          router: '/zeroReport'
        },
        {
          name: '指令管理',
          img: require('@/assets/image/zhiling.png'),
          router: '/orderAdmin'
        },
        {
          name: '135应急指挥',
          img: require('@/assets/image/1.png'),
          router: '/ARuiAn/LinkageDisposal/list'
        },
        {
          name: '重大风险隐患库',
          img: require('@/assets/image/zhongda.png'),
          router: '/ARuiAn/SafetySupervision/index'
        },
        {
          name: '我的评价',
          img: require('@/assets/image/pingjia.png'),
          router: '/myEvaluation'
        }
      ],
      listTwo: [
        {
          name: '线索列表',
          img: require('@/assets/image/4.png'),
          router: '/zhezheng/cluesReport/cluesList'
        },
        {
          name: '事件列表',
          img: require('@/assets/image/8.png'),
          router: '/zhezheng/eventReport/eventList',
        },
        {
          name: '管控任务',
          img: require('@/assets/image/9.png'),
          router: '/zhezheng/controlTask/taskList'
        }
      ]
    }
  },
  created () {
    localStorage.clear()
    this.toggle = true
    localStorage.setItem('rbacToken', '0e49a16d97fb45598eb2af736915b259')
    return
    dd.showLoading({
      text: '加载中'
    })
    this.GC()
    // return;
    dd.ready(() => {
      // 免登登录
      dd.runtime.permission.requestAuthCode({
        corpId: ding.corpId,
        async onSuccess (info) {
          const data = {
            code: info.code,
            corpid: ding.corpId,
            dingId: ding.dingId
          }
          // console.log(info.code, '出来吧code......')
          // console.log(ding.corpId, '出来吧corpid......')
          // console.log(ding.dingId, 'dingId......')
          // return
          const FU = await fyApiGatewayUserInfo(data)
          if (FU.success) {
            const userInfo = FU.data
            localStorage.setItem('rbacToken', userInfo.rbacToken)
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            this.$store.commit('setToken', userInfo.rbacToken)
            dd.hideLoading()
            if (this.$route.query.pageName == 'LD_detail') {
              this.detailRouter(1)
            } else if (this.$route.query.pageName == 'equipment_detail') {
              this.detailRouter(2)
            } else if (this.$route.query.pageName == 'control_task') {
              this.detailRouter(3)
            } else {
              this.toggle = true
            }
            const options = {
              nick: userInfo.name,
              userId: userInfo.empCode
            }
            maidian.jcxx(options)
            if (
              this.$route.query &&
              this.$route.query.pageName == 'SafetySupervision'
            ) {
              this.$router.push({
                path: '/ARuiAn/SafetySupervision/list',
                query: {}
              })
            }
            this.userId = userInfo
            // if (userInfo.ifOperater == true) {
            //   const a = [
            //     {
            //       name: '设备操作员',
            //       number: 3,
            //       router: '/ARuiAn/Equipment/list'
            //     }
            //   ]
            //   this.t = this.t.concat(a)
            // }
          }
        }
      })
    })
  },
  methods: {
    handclick (item) {
      if (typeof item === 'string') {
        this.$router.push(item)
        return
      }
      this.$router.push(item.router)
      // this.$router.push({
      //   path: "/ARuiAn/SafetySupervision/list",
      // });
    },
    onTab (index, id) {
      this.tabIndex = index
      if (id) {
        const anchor = document.getElementById(id)
        const main = document.getElementById('scrollBox')
        main.scrollTop = 0
        main.scrollTop = Number(anchor.offsetTop) - 10
        // console.log(Number(anchor.offsetTop))
        // console.log(Number(main.offsetTop))
        // console.log(Number(anchor.offsetTop) - Number(main.offsetTop))
      }
    },
    detailRouter (type) {
      const that = this
      if (type == 1) {
        that.$router.push({
          path: '/ARuiAn/LinkageDisposal/detail',
          query: {
            type: that.$route.query.type,
            emergencyId: that.$route.query.emergencyId
          }
        })
      }
      if (type == 2) {
        that.$router.push({
          path: '/ARuiAn/equipment/detail',
          query: {
            type: 1,
            id: that.$route.query.id
          }
        })
      }
      if (type == 3) {
        that.$router.push({
          path: '/zhezheng/controlTask/taskDetail',
          query: {
            id: that.$route.query.id,
            peopleId: that.$route.query.peopleId,
            missionStatus: 1
          }
        })
      }
    },
    async GC () {
      let GC = ''
      let config = ''
      if (this.nums == 1) {
        GC = await fyApiGatewayConfig({ dingId: ding.dingId })
        config = GC.data
      }
      if (this.nums == 2 || this.nums == 3) {
        GC = await updateJspticket({ dingId: ding.dingId })
        config = GC.data
      }
      if (config) {
        dd.authConfig({
          ticket: config.jsticket,
          jsApiList: [
            'locateOnMap',
            'searchOnMap',
            'getGeolocation',
            'startGeolocation'
          ]
        })
          .then(async (res) => {
            console.log(
              res,
              this.nums == 1 ? '鉴权成功 getConfig' : '鉴权成功 updateJspticket'
            )
          })
          .catch(async (err) => {
            console.log(
              err,
              this.nums == 1 ? '鉴权失败 getConfig' : '鉴权失败 updateJspticket'
            )
            this.nums += 1
            this.GC()
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.entrance_warp {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  .logo {
    display: flex;
    height: 360px;
    img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
  }
  .content {
    flex: 1;
    display: flex;
    overflow: hidden;
    height: 0;
    .rlist_tab {
      margin-bottom: 0px;
      width: 25%;
      font-size: 14px;
      left: 0px;
      background: #fff;
      .tab_item {
        text-align: center;
        color: #666666;
        font-size: 14px;
        padding: 12px 12px;
        border-left: 6px solid white;
        line-height: 70px;
        .tab_item_active {
          color: #297aff;
          background: #fff;
          border-left: 6px solid #297aff;
        }
      }
    }
    .main {
      flex: 1;
      overflow: hidden;
      overflow-y: scroll;
      position: relative;
      background: #fff;
      .inner {
        display: flex;
        flex-wrap: wrap;
        img {
          display: block;
          margin: 0 auto;
          width: 72px;
          height: 72px;
        }
        > div {
          margin: 20px 0 20px 0;
          width: 180px;
          height: 120px;
          text-align: center;
          border-radius: 10px;
          h5 {
            font-size: 28px;
            color: #2d2d2d;
            margin-top: 10px;
          }
          p {
            font-size: 16px;
            color: #2d2d2d;
            opacity: 0.56;
          }
        }
        .line {
          border-left: 6px solid #297aff;
          border-radius: 0;
          width: 100%;
          height: 40px;
          margin-top: 20px;
          margin-left: 40px;
        }

        .quick {
          width: 100%;
          height: 40px;
          line-height: 40px;
          display: flex;
          margin-left: 10px;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
}
</style>
