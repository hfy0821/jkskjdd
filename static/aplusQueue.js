let maidian = {
  // 稳定性监控
  wdjk(bid) {
    try {
      const config = {
        bid: bid,
        signkey: '1234567890abcdef',
        gateway: 'https://wpkgate-emas.ding.zj.gov.cn'
      };
      const wpk = new wpkReporter(config);
      wpk.installAll();
      window._wpk = wpk;
    } catch (err) {
      console.error('WpkReporterinitfail', err);
    }
  },
  //通用采集 SDK
  llfx() {
    (function (w, d, s, q, i) {
      w[q] = w[q] || [];
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
      j.async = true;
      j.id = 'beacon-aplus';
      j.src = 'https://alidt.alicdn.com/alilog/mlog/aplus_cloud.js';
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'aplus_queue');

    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['aplus-rhost-v', 'alog-api.ding.zj.gov.cn']
    });
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['aplus-rhost-g', 'alog-api.ding.zj.gov.cn']
    });

    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['appId', isAndroid ? '28302650' : isIOS ? '28328447' : '47130293']
    });
  },
  // 基础埋点
  jcmd(jcmdObj) {
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['aplus-waiting', 'MAN']
    });
    // // 单页应用路由切换后 或 在异步获取到pv日志所需的参数后再执行sendPV：
    aplus_queue.push({
      'action': 'aplus.sendPV',
      'arguments': [{
        is_auto: false
      }, {
        // 当前你的应用信息，此两行请勿修改
        sapp_id: jcmdObj.sapp_id,
        sapp_name: jcmdObj.sapp_name,
        // 自定义PV参数key-value键值对（只能是这种平铺的json，不能做多层嵌套），如：
        page_id: jcmdObj.page_id,//'页面ID，与page 参数配合使用，保证唯一性',
        page_name: jcmdObj.page_name,//'页面中文名称',
        page_url: jcmdObj.page_url,// '页面URL'
      }]
    })
  },

  // 用户信息埋点
  jcxx(options) {
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['_hold', 'BLOCK']
    });
    //设置会员昵称
    aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["_user_nick", options.nick]
    });
    //设置会员ID
    aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["_user_id", options.userId]
    });
    //如采集用户信息是异步行为，需要先设置完用户信息后再执行这个START埋点
    //此时被block住的日志会携带上用户信息逐条发出
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['_hold', 'START']
    });
  }
}
var aplus_queue=[];
// module.exports = maidian;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = maidian;
}
else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return maidian;
    });
  }
  else {
    window.maidian = maidian;
  }
}