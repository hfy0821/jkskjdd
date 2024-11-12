import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
const _import_ = file => () => import('@/pages/' + file)

Vue.use(Router)

const routes = [{
  path: '/ARuiAn/SafetySupervision/feedBack',
  name: 'SafetySupervision',
  meta: {},
  component: _import_('ARuiAn/SafetySupervision/feedBack')
},
// 旧版首页
{
  path: '/ARuiAn/SafetySupervision/list',
  name: 'SafetySupervision',
  meta: {},
  component: _import_('ARuiAn/SafetySupervision/list')
},
// 新办首页
{
  path: '/ARuiAn/SafetySupervision/index',
  name: 'SafetySupervisionIndex',
  meta: {
    title: '我的督办'
  },
  component: _import_('ARuiAn/SafetySupervision/index')
},
// 办结审核
{
  path: '/ARuiAn/SafetySupervision/review',
  name: 'SafetySupervisionReview',
  meta: {
    title: '办结审核'
  },
  component: _import_('ARuiAn/SafetySupervision/review')
},
// 督办详情 老版本
{
  path: '/ARuiAn/SafetySupervision/detail',
  name: 'SafetySupervision',
  meta: {},
  component: _import_('ARuiAn/SafetySupervision/detail')
},
// 督办详情 新版本
{
  path: '/ARuiAn/SafetySupervision/detailNew',
  name: 'SafetySupervision',
  meta: {},
  component: _import_('ARuiAn/SafetySupervision/detailNew')
},
{
  path: '/ARuiAn/Teamwork/detail',
  name: 'Teamwork',
  meta: {},
  component: _import_('ARuiAn/Teamwork/detail')
},
{
  path: '/ARuiAn/Teamwork/add',
  name: 'Teamwork',
  meta: {},
  component: _import_('ARuiAn/Teamwork/add')
},
{
  path: '/ARuiAn/Teamwork/list',
  name: 'Teamwork',
  meta: {},
  component: _import_('ARuiAn/Teamwork/list')
},
// 乐清一体两翼
{
  path: '/ARuiAn/SidePage/earlywarning',
  name: 'SidePage',
  meta: {},
  component: _import_('ARuiAn/SidePage/earlywarning')
},
{
  path: '/ARuiAn/SidePage/detail',
  name: 'SidePage',
  meta: {},
  component: _import_('ARuiAn/SidePage/detail')
},
{
  path: '/ARuiAn/SidePage/index',
  name: 'SidePage',
  meta: {},
  component: _import_('ARuiAn/SidePage/index')
},
{
  path: '/ARuiAn/SidePage/add',
  name: 'SidePage',
  meta: {},
  component: _import_('ARuiAn/SidePage/add')
},
{
  path: '/ARuiAn/SidePage/list',
  name: 'SidePage',
  meta: {},
  component: _import_('ARuiAn/SidePage/list')
},
{
  path: '/ARuiAn/LinkageDisposal/list',
  name: 'LinkageDisposal',
  meta: {},
  component: _import_('ARuiAn/LinkageDisposal/list')
},
{
  path: '/ARuiAn/LinkageDisposal/add',
  name: 'LinkageDisposal',
  meta: {},
  component: _import_('ARuiAn/LinkageDisposal/add')
},
{
  path: '/ARuiAn/LinkageDisposal/detail',
  name: 'LinkageDisposal',
  meta: {},
  component: _import_('ARuiAn/LinkageDisposal/detail')
},
{
  path: '/ARuiAn/LinkageDisposal/report',
  name: 'LinkageDisposal',
  meta: {},
  component: _import_('ARuiAn/LinkageDisposal/report')
},
{
  path: '/ARuiAn/LinkageDisposal/signIn',
  name: 'LinkageDisposal',
  meta: {},
  component: _import_('ARuiAn/LinkageDisposal/signIn')
},
{
  path: '/ARuiAn/LinkageDisposal/reportSuccess',
  name: 'LinkageDisposal',
  meta: {},
  component: _import_('ARuiAn/LinkageDisposal/reportSuccess')
},
{
  path: '/ARuiAn/SignIn/index',
  name: 'SignIn',
  meta: {},
  component: _import_('ARuiAn/SignIn/index')
},
// 设备操作
{
  path: '/ARuiAn/Equipment/list',
  name: 'Equipment',
  meta: {},
  component: _import_('ARuiAn/Equipment/list')
},
{
  path: '/ARuiAn/Equipment/detail',
  name: 'EquipmentDetail',
  meta: {},
  component: _import_('ARuiAn/Equipment/detail')
},
{
  path: '/suggestion/add',
  name: 'suggestion',
  meta: {},
  component: _import_('suggestion/add')
},
{
  path: '/emphPeopleTrack/add',
  name: 'emphPeopleTrack',
  meta: {
    title: '上报'
  },
  component: _import_('emphPeopleTrack/add')
},
{
  path: '/emphPeopleTrack',
  name: 'emphPeopleTrack',
  meta: {
    title: '一日三见面'
  },
  component: _import_('emphPeopleTrack/list')
},
{
  path: '/suggestion',
  name: 'suggestion',
  meta: {
    title: '意见反馈'
  },
  component: _import_('suggestion/list')
},
{
  path: '/charts',
  name: 'entrance',
  meta: {
    title: '乐清一体两翼'
  },
  component: _import_('charts/index')
},
{
  path: '/',
  name: 'entrance',
  meta: {
    title: '乐清一体两翼'
  },
  component: _import_('entrance/index')
},
{
  path: '/index',
  name: 'entranceIndex',
  meta: {
    title: '乐清一体两翼'
  },
  component: _import_('entrance/index')
},
// 零报告
{
  path: '/zeroReport',
  name: 'zeroReport',
  meta: {
    title: '零报告'
  },
  component: _import_('zeroReport/index')
},
// 零报告详情
{
  path: '/zeroReport/detail',
  name: 'zeroReportDetail',
  meta: {
    title: '报告详情'
  },
  component: _import_('zeroReport/detail')
},
// 指令管理
{
  path: '/orderAdmin',
  name: 'orderAdmin',
  meta: {
    title: '指令管理'
  },
  component: _import_('orderAdmin/index')
},
// 指令详情
{
  path: '/orderAdmin/detail',
  name: 'orderAdminDetail',
  meta: {
    title: '指令详情'
  },
  component: _import_('orderAdmin/detail')
},
// 指令反馈
{
  path: '/orderAdmin/feedBack',
  name: 'orderAdminFeedBack',
  meta: {
    title: '指令反馈'
  },
  component: _import_('orderAdmin/feedBack')
},
// 我的评价
{
  path: '/myEvaluation',
  name: 'myEvaluation',
  meta: {
    title: '我的评价'
  },
  component: _import_('myEvaluation/index')
},
// 评价详情
{
  path: '/myEvaluation/detail',
  name: 'myEvaluationDetail',
  meta: {
    title: '评价详情'
  },
  component: _import_('myEvaluation/detail')
},
// 会商研判
{
  path: '/chatRoom',
  name: 'chatRoom',
  meta: {
    title: '会商研判'
  },
  component: _import_('chatRoom/index')
},
{
  path: '/map',
  name: 'map',
  meta: {
    title: '地图'
  },
  component: _import_('map/map')
},
{
  path: '/reported',
  name: 'reported',
  meta: {
    title: '隐患上报'
  },
  component: _import_('reported/event')
},
{
  path: '/reported/detail',
  name: 'reportedDetail',
  meta: {
    title: '事件详情'
  },
  component: _import_('reported/detail')
},
{
  path: '/reported/add',
  name: 'reportedAdd',
  meta: {
    title: ''
  },
  component: _import_('reported/add')
},
{
  path: '/reported/excessAdd',
  name: 'reportedexcessAdd',
  meta: {
    title: ''
  },
  component: _import_('reported/excessAdd')
},
{
  path: '/emergency',
  name: 'emergency',
  meta: {
    title: '信访对象事件'
  },
  component: _import_('emergency/event')
},
{
  path: '/emergency/add',
  name: 'emergencyadd',
  meta: {},
  component: _import_('emergency/add')
},
{
  path: '/emergency/detail',
  name: 'emergencyDetail',
  meta: {
    title: '事件详情'
  },
  component: _import_('emergency/detail')
},
{
  path: '/emergency/confirm/',
  name: 'emergencyconfirm',
  meta: {
    title: '信访对象事件'
  },
  component: _import_('emergency/confirm')
},
{
  path: '/stability',
  name: 'stability',
  meta: {
    title: '隐患事件'
  },
  component: _import_('stability/event')
},
{
  path: '/stability/add',
  name: 'stabilityadd',
  meta: {},
  component: _import_('stability/add')
},
{
  path: '/stability/confirm/',
  name: 'stabilityconfirm',
  meta: {
    title: '隐患事件'
  },
  component: _import_('stability/confirm')
},
{
  path: '/stability/detail',
  name: 'stabilityDetail',
  meta: {
    title: '事件详情'
  },
  component: _import_('stability/detail')
},
{
  path: '/health',
  name: 'health',
  meta: {
    title: '卫健'
  },
  component: _import_('health/event')
},
{
  path: '/health/add',
  name: 'healthadd',
  meta: {},
  component: _import_('health/add')
},
{
  path: '/health/confirm/',
  name: 'healthconfirm',
  meta: {
    title: '卫健'
  },
  component: _import_('health/confirm')
},
{
  path: '/health/detail',
  name: 'healthdetail',
  meta: {
    title: '事件详情'
  },
  component: _import_('health/detail')
},
// {
// 	path: '/safety',
// 	name: 'safety',
// 	meta: {
// 		title: '平安事件'
// 	},
// 	component: _import_('safety/event')
// },
// {
// 	path: '/safety/add',
// 	name: 'safetyadd',
// 	meta: {
// 	},
// 	component: _import_('safety/add')
// },
// {
// 	path: '/safety/confirm/',
// 	name: 'safetyconfirm',
// 	meta: {
// 		title: '平安事件'
// 	},
// 	component: _import_('safety/confirm')
// },
// {
// 	path: '/safety/detail',
// 	name: 'safetyDetail',
// 	meta: {
// 		title: '事件详情'
// 	},
// 	component: _import_('safety/detail')
// },
{
  path: '/safety',
  name: 'safety',
  meta: {
    title: '平安事件'
  },
  component: _import_('safety/safetymenu/detail')
},
{
  path: '/safety/safetycheck',
  name: 'safetycheck',
  meta: {},
  component: _import_("safety/safetycheck/event")
},
{
  path: '/safety/safetycheck/add',
  name: 'safetyadd',
  meta: {},
  component: _import_('safety/safetycheck/add')
},
{
  path: '/safety/safetycheck/confirm',
  name: 'safetyconfirm',
  meta: {
    title: '平安事件'
  },
  component: _import_('safety/safetycheck/confirm')
},
// 申请办结
{
  path: '/safety/safetycheck/confirm2',
  name: 'safetyconfirm2',
  meta: {
    title: '平安事件'
  },
  component: _import_('safety/safetycheck/confirm2')
},
{
  path: '/safety/safetycheck/detail',
  name: 'safetyDetail',
  meta: {
    title: '事件详情'
  },
  component: _import_('safety/safetycheck/detail')
},
{
  path: '/safety/safetycheckself',
  name: 'safetycheckslefevent',
  meta: {
    title: '事件详情'
  },
  component: _import_('safety/safetycheckself/event')
},
{
  path: '/safety/safetycheckself/add',
  name: 'safetycheckslefadd',
  meta: {
    title: '事件详情'
  },
  component: _import_('safety/safetycheckself/add')
},
{
  path: '/safety/safetycheckself/detail',
  name: 'safetycheckselfdetail',
  meta: {},
  component: _import_('safety/safetycheckself/detail')
},
{
  path: '/confirm/',
  name: 'confirm',
  component: _import_('event/confirm')
},
// {
// 	path: '/confirm/',
// 	name: 'confirm',
// 	component: _import_('event/confirm')
// },
{
  path: '/synthesis',
  name: 'synthesis',
  meta: {
    title: '综合体事件'
  },
  component: _import_('synthesis/event')
},
{
  path: '/synthesis/add',
  name: 'synthesisadd',
  meta: {},
  component: _import_('synthesis/add')
},
{
  path: '/synthesis/confirm/',
  name: 'synthesisconfirm',
  meta: {
    title: '综合体事件'
  },
  component: _import_('synthesis/confirm')
},
{
  path: '/synthesis/detail',
  name: 'synthesisDetail',
  meta: {
    title: '事件详情'
  },
  component: _import_('synthesis/detail')
},
{
  path: '/zero',
  name: 'zero',
  meta: {
    title: '我的零报'
  },
  component: _import_('zero/event')
},
{
  path: '/zero/add',
  name: 'zeroAdd',
  meta: {
    title: '上报事件'
  },
  component: _import_('zero/add')
},
{
  path: '/zero/detail',
  name: 'zeroDetail',
  meta: {
    title: '零报详情'
  },
  component: _import_('zero/detail')
},
// 浙政钉钉
// 线索上报
{
  path: '/zhezheng/cluesReport/cluesList',
  name: 'cluesList',
  meta: {
    title: '线索列表'
  },
  component: _import_('zhezheng/cluesReport/cluesList')
},
{
  path: '/zhezheng/cluesReport/cluesDetail',
  name: 'cluesDetail',
  meta: {
    title: '线索详情'
  },
  component: _import_('zhezheng/cluesReport/cluesDetail')
},
{
  path: '/zhezheng/cluesReport/cluesAdd',
  name: 'cluesAdd',
  meta: {
    title: '新增线索列表'
  },
  component: _import_('zhezheng/cluesReport/cluesAdd')
},
{
  path: '/zhezheng/cluesReport/peopleSearch',
  name: 'peopleSearch',
  meta: {
    title: '人物检索'
  },
  component: _import_('zhezheng/cluesReport/peopleSearch')
},
{
  path: '/zhezheng/cluesReport/personAdd',
  name: 'personAdd',
  meta: {
    title: '人员新增'
  },
  component: _import_('zhezheng/cluesReport/personAdd')
},
// 事件上报
{
  path: '/zhezheng/eventReport/eventList',
  name: 'eventList',
  meta: {
    title: '事件列表'
  },
  component: _import_('zhezheng/eventReport/eventList')
},
{
  path: '/zhezheng/eventReport/eventAdd',
  name: 'eventList',
  meta: {
    title: '新增事件'
  },
  component: _import_('zhezheng/eventReport/eventAdd')
},
{
  path: '/zhezheng/eventReport/personRetrieve',
  name: 'personRetrieve',
  meta: {
    title: '人物检索'
  },
  component: _import_('zhezheng/eventReport/personRetrieve')
},
{
  path: '/zhezheng/eventReport/peopleSearch',
  name: 'peopleSearch',
  meta: {
    title: '人物检索'
  },
  component: _import_('zhezheng/eventReport/peopleSearch')
},
{
  path: '/zhezheng/eventReport/personAdd',
  name: 'personAdd',
  meta: {
    title: '人员新增'
  },
  component: _import_('zhezheng/eventReport/personAdd')
},
{
  path: '/zhezheng/eventReport/eventDetail',
  name: 'eventDetail',
  meta: {
    title: '事件详情'
  },
  component: _import_('zhezheng/eventReport/eventDetail')
},
// 管控任务
{
  path: '/zhezheng/controlTask/taskList',
  name: 'taskList',
  meta: {
    title: '我的管控任务'
  },
  component: _import_('zhezheng/controlTask/taskList')
},
{
  path: '/zhezheng/controlTask/taskDetail',
  name: 'taskDetail',
  meta: {
    title: '管控详情'
  },
  component: _import_('zhezheng/controlTask/taskDetail')
},
{
  path: '/zhezheng/controlTask/feedbackHistory',
  name: 'feedbackHistory',
  meta: {
    title: '反馈历史'
  },
  component: _import_('zhezheng/controlTask/feedbackHistory')
},
// 平安办 暗访系统
{
  path: '/SecretVisit/index',
  name: 'SecretIndex',
  meta: {
    title: '暗访系统',
    showMin: '暗访系统'
  },
  component: _import_('SecretVisit/index')
},
{
  path: '/SecretVisit/SearchPage/searchPage',
  name: 'searchPage',
  meta: {
    title: '搜索',
    showMin: '暗访系统'
  },
  component: _import_('SecretVisit/SearchPage/searchPage')
},
{
  path: '/SecretVisit/HiddenDangerReported/HiddenDangerReported',
  name: 'HiddenDangerReported',
  meta: {
    title: '点位上报',
    showMin: '暗访系统',
    type: 'change'
    // title: store.state.pointRouteName
  },
  component: _import_('SecretVisit/HiddenDangerReported/HiddenDangerReported')
},
{
  path: '/SecretVisit/HiddenDangerAdded/HiddenDangerAdded',
  name: 'HiddenDangerAdded',
  meta: {
    title: '隐患操作',
    showMin: '暗访系统'
    // type: 'change'
    // title: store.state.hidedangRouteName
  },
  component: _import_('SecretVisit/HiddenDangerAdded/HiddenDangerAdded')
},
{
  path: '/SecretVisit/HiddenDangerDetail/HiddenDangerDetail',
  name: 'HiddenDangerDetail',
  meta: {
    title: '隐患详情',
    showMin: '暗访系统'
  },
  component: _import_('SecretVisit/HiddenDangerDetail/HiddenDangerDetail')
},
{
  path: '/SecretVisit/ListRepresentations/ListRepresentations',
  name: 'ListRepresentations',
  meta: {
    title: '隐患列表',
    showMin: '暗访系统',
    type: 'change'
  },
  component: _import_('SecretVisit/ListRepresentations/ListRepresentations')
}
]

const router = new Router({
  routes
})
const agent = navigator.userAgent
const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

router.beforeEach((to, from, next) => {
  if (isiOS) {
    // if (to.meta.showMin) {
    //   document.title = to.meta.showMin
    // } else {
    //   if (to.meta.title) {
    //     document.title = to.meta.title
    //   }
    // }
    if (to.meta.title) {
      dd.setTitle({
        title: to.meta.title
      }).then(res => {
        console.log(res)
      }).catch(err => { })
    }
    if (to.meta.type) {
      switch (to.meta.title) {
        case '点位上报':
          dd.setTitle({
            title: store.state.pointRouteName
          }).then(res => {
            console.log(res)
          }).catch(err => { })
          break;
        case '隐患列表':
          dd.setTitle({
            title: store.state.RequestName
          }).then(res => {
            console.log(res)
          }).catch(err => { })
          break;
        default:
          break;
      }
    }
  } else {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    if (to.meta.type) {
      switch (to.meta.title) {
        case '点位上报':
          document.title = store.state.pointRouteName
          break;
        case '隐患列表':
          document.title = store.state.RequestName
          break;
        default:
          break;
      }
    }
  }


  // if (!store.getters.streetList || !store.getters.streetList.length) {
  // 	store.dispatch('getSomeList', [{ type: 4 }, 'setStreetList'])
  // }
  // if (!store.getters.actionList || !store.getters.actionList.length) {
  // 	store.dispatch('getSomeList', [{ type: 5 }, 'setactionList'])
  // }
  // if (!store.getters.eventList || !store.getters.eventList.length) {
  // 	store.dispatch('getSomeList', [{ type: 6 }, 'setEventList'])
  // }
  // if (!store.getters.actionList1 || !store.getters.actionList1.length) {
  // 	store.dispatch('getSomeList', [{ type: 14 }, 'setactionList1'])
  // }

  // jwt.verify(cookie('zp_token'), 'token', (err, res) => {
  //   if (!err) {
  //     if (to.name === 'login') router.push('')
  //   } else {
  //     cookie.remove('zp_token')
  //     if (to.name !== 'login') router.push('login')
  //   }
  // })

  next()

  // //基础埋点
  // // 单页应用 或 “单个页面”需异步补充PV日志参数还需进行如下埋点：
  // aplus_queue.push({
  // 	action: 'aplus.setMetaInfo',
  // 	arguments: ['aplus-waiting', 'MAN']
  // });
  // // // 单页应用路由切换后 或 在异步获取到pv日志所需的参数后再执行sendPV：
  // aplus_queue.push({
  // 	'action': 'aplus.sendPV',
  // 	'arguments': [{
  // 		is_auto: false
  // 	}, {
  // 		// 当前你的应用信息，此两行请勿修改
  // 		sapp_id: '1003',
  // 		sapp_name: 'cs-xtyy',
  // 		// 自定义PV参数key-value键值对（只能是这种平铺的json，不能做多层嵌套），如：
  // 		page_id: to.path,//'页面ID，与page 参数配合使用，保证唯一性',
  // 		page_name: to.meta.title,//'页面中文名称',
  // 		page_url: to.path,// '页面URL'
  // 	}]
  // })
  let obj = {
    sapp_id: '17017',
    sapp_name: 'yqytly',
    page_id: to.name,
    page_name: to.meta.title,
    page_url: process.env.baseUrl + to.name
  }
  maidian.jcmd(obj)
})
router.afterEach((to, from) => {
  // jwt.verify(cookie('zp_token'), 'token', (err, res) => {
  //   if (!err) {
  //     if (to.name === 'login') router.push('')
  //   } else {
  //     cookie.remove('zp_token')
  //     if (to.name !== 'login') router.push('login')
  //   }
  // })
})
export default router
