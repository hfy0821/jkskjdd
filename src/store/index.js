import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common/index'
import {
  getSomeList
} from '../api/a'

Vue.use(Vuex)

export default new Vuex.Store({
  // modules: {
  // common
  state: {
    streetList: [],
    actionList: [],
    actionList1: [],
    eventList: [],
    rbacToken: '',
    peopleType: '1',
    LoadShow: false,
    groupType: {}, //组别信息
    includeArry: ['HiddenDangerReported'], //keepalive name 集合
    searchHistory: '', //搜索记录
    pointInfo: {}, //点位信息
    pointImgUrls: [], //点位图片
    HiddenDangerInfo: [], //隐患信息
    pointRouteName: '点位上报',
    RequestName: '我的列表',
    hidedangRouteName: '',

  },
  getters: {
    rbacToken: state => state.rbacToken,
    streetList: state => state.streetList,
    actionList: state => state.actionList,
    eventList: state => state.eventList,
  },
  actions: {
    getSomeList({
      commit
    }, params) {

      getSomeList(params[0]).then(res => {
        let rec = res.data
        commit(params[1], {
          rec
        })
      })
    },
  },
  mutations: {
    setStreetList(state, {
      rec
    }) {
      state.streetList = rec
    },
    setactionList(state, {
      rec
    }) {
      state.actionList = rec
    },
    setactionList1(state, {
      rec
    }) {
      state.actionList1 = rec
    },
    setEventList(state, {
      rec
    }) {
      state.eventList = rec
    },
    setToken(state, rec) {
      state.rbacToken = rec
    },
    StoreData(state, {
      key,
      value
    }) {
      state[key] = value
    },
  }
  // }
})