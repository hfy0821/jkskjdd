import { getSomeList } from '../../../api/a'
import * as types from '../../mutation-types'

const state = {
	streetList: [],
	actionList: [],
	actionList1: [],
	eventList: [],
	rbacToken: ''
}
const getters = {
	rbacToken: state => state.rbacToken,
	streetList: state => state.streetList,
	actionList: state => state.actionList,
	eventList: state => state.eventList,
}

const actions = {
	getSomeList({ commit }, params) {
		getSomeList(params[0]).then(res => {
			let rec = res.data
			commit(params[1], {rec})
		})
	},
}
const mutations = {
	setStreetList(state, { rec }) {
		state.streetList = rec
	},
	setactionList(state, { rec }) {
		state.actionList = rec
	},
	setactionList1(state, { rec }) {
		state.actionList1 = rec
	},
	setEventList(state, { rec }) {
		state.eventList = rec
	},
	setToken(state, rec){
		state.rbacToken = rec
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
