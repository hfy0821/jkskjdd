(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-309a96da"],{"019e":function(t,e,n){"use strict";n("89cc")},"200c":function(t,e,n){},"4acd":function(t,e,n){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"grid"},[t._l(t.meta,(function(n){return t.microApps?e("div",{staticClass:"cell"},[e("single-app",{attrs:{item:n}})],1):t._e()})),t._l(t.meta,(function(n){return t.homeGroups?e("div",{staticClass:"cell"},[e("complex-app",{attrs:{item:n}})],1):t._e()}))],2)},i=[],s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"cell-box",on:{click:function(e){return t.microAppsOpenLink(t.item,e)}}},[e("div",{staticClass:"cell-image-container"},[e("img",{staticClass:"cell-image",attrs:{src:t.item.icon}})]),e("div",{staticClass:"cell-text"},[t._v(t._s(t.item.name))])])},o=[],r=n("f1ed"),l=!0,c={name:"singleApp",props:["item"],data:function(){return{}},mounted:function(){},methods:{microAppsOpenLink:function(t,e){if(l){l=!1;const e=t.appId,n=t.url,a=Object(r["b"])(location.href,"corpId");0===e?Object(r["a"])(n,(function(){l=!0})):(l=!0,window.location.href="dingtalk://dingtalkclient/action/switchtab?index=2&name=work&scene=1&corpid="+a+"&appid="+e)}}}},p=c,d=(n("019e"),n("2877")),u=Object(d["a"])(p,s,o,!1,null,null,null),m=u.exports,f=function(){var t=this,e=t._self._c;return e("div",{staticClass:"cell-box",on:{click:function(e){return t.homeGroupsOpenLink(t.item,e)}}},[3===t.item.appType?e("div",[e("div",{staticClass:"cell-image-container"},[e("div",{staticClass:"cell-mount"},[t._v(t._s(t.item.formatNumber.val))]),e("div",{staticClass:"cell-unit"},[t._v(t._s(t.item.formatNumber.unit))]),t._m(0)]),e("div",{staticClass:"cell-text"},[t._v(t._s(t.item.title))]),e("div",{staticClass:"cell-tag"},[t._v(t._s(t.item.tableName))])]):e("div",[e("div",{staticClass:"cell-image-container"},[e("img",{staticClass:"cell-image",attrs:{src:t.item.imgPath}}),1===t.item.appType?e("div",{staticClass:"cell-app-type-container"},[e("div",{staticClass:"cell-app-type"},[t._v("日志")])]):t._e(),2===t.item.appType?e("div",{staticClass:"cell-app-type-container"},[e("div",{staticClass:"cell-app-type"},[t._v("审批")])]):t._e()]),e("div",{staticClass:"cell-text"},[t._v(t._s(t.item.title))])])])},v=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"cell-app-type-container"},[e("div",{staticClass:"cell-app-type"},[t._v("智能报表")])])}],h=!0,g={name:"complexApp",props:["item"],data:function(){return{}},methods:{homeGroupsOpenLink:function(t){if(h){h=!1;var e=t.url;const n=t.redirect,a=t.tableName,i=t.title;n&&(e="https://h5.dingtalk.com//industry_versatility/notData.html?u="+encodeURIComponent(e)+"&tablename="+encodeURIComponent(a)+"&title="+encodeURIComponent(i)),Object(r["a"])(e,(function(){h=!0}))}}}},_=g,b=(n("a7e2"),Object(d["a"])(_,f,v,!1,null,null,null)),C=b.exports,w={name:"grid",props:["meta","corpId","microApps","homeGroups"],components:{singleApp:m,complexApp:C},data:function(){return{}}},k=w,M=(n("dafd"),Object(d["a"])(k,a,i,!1,null,null,null));e["a"]=M.exports},"5d1e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t._self._c;return t.allapplistMetas.isMicroApps?e("div",{staticClass:"index-all-applist"},[t._m(0),e("grid",{attrs:{meta:t.allapplistMetas.microApps,"corp-id":t.corpId,"micro-apps":!0}})],1):t._e()},i=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"applist-title"},[e("h1",{staticClass:"applist-text"},[t._v("全部应用")])])}],s=n("4acd"),o={name:"applist",props:["corpId","allapplistMetas"],components:{grid:s["a"]},data:function(){return{}},beforeMount:function(){},mounted:function(){}},r=o,l=(n("6e6c"),n("2877")),c=Object(l["a"])(r,a,i,!1,null,"37f31316",null);e["default"]=c.exports},"6e6c":function(t,e,n){"use strict";n("cddc")},"89cc":function(t,e,n){},a7e2:function(t,e,n){"use strict";n("f392")},cddc:function(t,e,n){},dafd:function(t,e,n){"use strict";n("200c")},f1ed:function(t,e,n){"use strict";function a(t,e){var n={},a=t.isDeptManager,i=t.isAdmin,s=t.boss;new Date;return n.act=a?"出勤人数":"出勤天数",n.homeHeaderModel=t,n.isAdminOrBoos=i||s,n.isHomeHeaderModel=!0,n.attendanceUrl="https://attend.dingtalk.com/attend/index.html?dd_web_timestamp="+(new Date).getTime()+"&showmenu=false&dd_share=false&corpId=ding68942498a5cd785e35c2f4657eb6378f&swfrom=work_homepage#stat",n.myTasksUrl="https://aflow.dingtalk.com/dingtalk/mobile/homepage.htm?corpid=ding68942498a5cd785e35c2f4657eb6378f&showmenu=false&dd_share=false&swfrom=work_homepage#upcoming",n.checkinsUrl="https://attendance.dingtalk.com/attendance/mobile/mapAttendance.html?corpid=ding68942498a5cd785e35c2f4657eb6378f&showmenu=false&dd_progress=false&dd_share=false&swfrom=work_homepage&to_page=footprint",n.notReadReportUrl="https://landray.dingtalkapps.com/alid/app/report/received_new.html?corpid=ding68942498a5cd785e35c2f4657eb6378f&ismy=2&dd_share=false&readType=1&swfrom=work_homepage",n}function i(t,e){var n={};return n.homeBannerModels=t,n.isHomeBannerModels=!!t.length,n}function s(t,e){var n={};return n.renderLine=t.length,n.isHomeGroups=n.renderLine>0,n.homeGroups=t.map((function(t){return t.homeGroupDetail=t.homeGroupDetail.map((function(t){if(3===t.appType){var e={};return e="undefined"===typeof t.value||"NaN"===typeof t.value?o(0):o(parseFloat(t.value,10)),t.formatNumber=e,t}return t})),t})),n}function o(t){var e=null;return t<999?(e={val:t.toString().substr(0,3),unit:""},r(e)):t<9999999?(t=Math.round(t/1e3)/10,e={val:t,unit:"万"},r(e)):t<99999999?(t=Math.round(t/1e6)/10,e={val:t,unit:"千万"},r(e)):t<99999999999?(t=Math.round(t/1e7)/10,e={val:t,unit:"亿"},r(e)):(t=Math.round(t/1e7)/10,e={val:t,unit:"亿"}),e}function r(t){t.val=t.val.toString().substr(0,3),"."==t.val.charAt(t.val.length-1)&&(t.val=t.val.substr(0,2))}function l(t,e){var n={};return n.isMicroApps=!!t.length,n.microApps=t,n}n.d(e,"b",(function(){return d})),n.d(e,"c",(function(){return u})),n.d(e,"d",(function(){return m})),n.d(e,"a",(function(){return f}));var c={homeHeaderModelHandler:a,homeBannerModelsHandler:i,homeGroupsHandler:s,microAppsHandler:l},p=/DingTalk/.test(navigator.userAgent);function d(t,e){for(var n=t.indexOf("?"),a=t.slice(n+1).split("&"),i=0;i<a.length;i++){var s=a[i].split("=");if(s[0].trim()==e)return s[1].trim()}}function u(t,e){var n={};return n.admin=t.admin,n.bannerMetas=c.homeBannerModelsHandler(t.homeBannerModels,e),n.itemMetas=c.homeHeaderModelHandler(t.homeHeaderModel,e),n.userlistMetas=c.homeGroupsHandler(t.homeGroups,e),n.allapplistMetas=c.microAppsHandler(t.microApps,e),n.h5Config=t.h5Config,n.userInfo=t.userInfo,n}function m(t,e){return c.microAppsHandler(t,e)}function f(t,e){e&&"string"===typeof e&&t&&-1!==t.indexOf("$CORPID$")&&(t=t.replace(/\$CORPID\$/,e)),p?dd.biz.util.openLink({url:t,onSuccess:function(){"function"===typeof e&&e()},onFail:function(){"function"===typeof e&&e()}}):window.open(t)}},f392:function(t,e,n){}}]);