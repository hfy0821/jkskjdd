// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./store";
import 'lib-flexible/flexible.js'
import './assets/css/theme.less'
import './assets/css/common.less'
import './assets/css/mycompant.less'
import "./assets/iconFont/iconfont.css";
import "./assets/newIconFont/iconfont.css"
import {
  InfiniteScroll,
  Checklist,
  Cell
} from 'mint-ui';
import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import myRequst from './api/a'
import file from "./common/utils" //工具类
Vue.component(Checklist.name, Checklist);
Vue.component(Cell.name, Cell);
Vue.use(InfiniteScroll);

Vue.use(Vant);
Vue.prototype.M = function (paramObj) {
  var lng1 = paramObj.lng1
  var lat1 = paramObj.lat1
  var lng2 = paramObj.lng2
  var lat2 = paramObj.lat2
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  s = s * 1000
  return s;
}
Vue.prototype.$httpapi = myRequst;
Vue.prototype.$fileup = file.fileUpload;
Vue.prototype.$utils = file;

Vue.prototype.$push = (url, params) => {
  if (params) {
    router.push({
      path: url,
      query: {
        ...params
      }
    })
  } else {
    router.push(url)
  }
}

Vue.prototype.D = function () {
  let date = new Date();
  let F = date.getFullYear();
  let MT = date.getMonth() + 1;
  let D = date.getDate();
  let H = date.getHours();
  let M = date.getMinutes();
  let S = date.getSeconds();
  if (MT < 10) {
    MT = "0" + MT;
  }
  if (D < 10) {
    D = "0" + D;
  }
  if (H < 10) {
    H = "0" + H;
  }
  if (M < 10) {
    M = "0" + M;
  }
  if (S < 10) {
    S = "0" + S;
  }
  return F + "-" + MT + "-" + D + " " + H + ":" + M + ":" + S;
}
// 获取url中的信息
Vue.prototype.getQuery = (queryName) => {
  let reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
// 加载中的方法
Vue.prototype.Load = {
  showLoad: function (params) {
    store.commit('StoreData', {
      key: "LoadShow",
      value: true
    })
  },
  hideLoad: function (params) {
    store.commit('StoreData', {
      key: "LoadShow",
      value: false
    })
  }
}
// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: {
//     App
//   },
//   created() {}
// });
//runtime

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
