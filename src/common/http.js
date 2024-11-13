import router from '../router'
import axios from 'axios'
import store from '../store/index'
import getQuery from './getrbacToken'
// var qs = require('qs')
const rbacToken = 'cef4e9e5dda04a61b3ef41741aff06fe'

axios.interceptors.request.use(
  config => {
    if (window.localStorage.token) {
      config.headers.auth = `${window.localStorage.token}`
      // alert(window.localStorage.token)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
const Utils = {
  get(url, data = {}) {
    // data.rbacToken = store.getters.rbacToken
    data.rbacToken = store.getters.rbacToken || localStorage.getItem('rbacToken') || getQuery('rbacToken')

    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: data,
          withCredentials: false
        })
        .then(function (response) {
          if (!response.data.success) {
          }
          if (response.data.message?.indexOf('登录') >= 0) {
            router.push('/')
          }
          resolve(response?.data)
        })
        .catch(function (error) {
          // reject(new Error())
        })
    })
  },
  post(url, data = {}) {
    data.rbacToken = store.getters.rbacToken || localStorage.getItem('rbacToken') || getQuery('rbacToken')
    return new Promise((resolve, reject) => {
      // axios.post(url, qs.stringify(data), {
      axios
        .post(url, data, {
          // withCredentials: true,
          // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        .then(function (response) {
          if (!response.data.success) {
            // dd.alert({
            //     message: response.data.message ? response.data.message : "",
            //     title: "提示",
            //     button: "收到"
            // })
            //     .then(res => { })
            //     .catch(err => { });
          }
          if (response.data.message?.indexOf('登录') >= 0) {
            router.push('/')
          }
          resolve(response.data)
        })
        .catch(function (error) {
          // reject(new Error())
          // console.log(error)
        })
    })
  },
}
export default Utils