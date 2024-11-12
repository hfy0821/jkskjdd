import axios from "axios";
import store from "../../store/index";

//websocket
function initWebpack() {
  var url = store.state.url
  var wsurl = ''
  var ws = new WebSocket("ws://127.0.0.1:8899/ws?rbacToken=792f55f317384eadbe96ce24fea8471c&group=eventId");
  axios.get(`${url}/bcall/url`)  //这是我在从后端拿ws链接的地址
    .then((res) => {
      console.log(res.data.data)
      wsurl = res.data.data
      store.state.ws = new WebSocket(wsurl);
      store.state.ws.onopen = onopen;
      store.state.ws.onmessage = onmessage;
      store.state.ws.onclose = onclose;
      store.state.ws.onerror = onerror;

    }).catch((err) => {
      console.log(err)
    })
}

function onopen() {
  console.log("连接websocket");
  var params = '{"reqtype":"Query","action":"allexts"}'
  store.state.ws.send(params)
  start();
}
function reconnect() {//重新连接
  var that = store.state;
  if (that.lockReconnect) {
    return;
  }
  that.lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  that.timeoutnum && clearTimeout(that.timeoutnum);
  that.timeoutnum = setTimeout(function () {
    //新连接
    initWebpack();
    that.lockReconnect = false;
    that.isFirstGet = true
  }, 5000);
}
function reset() {//重置心跳
  var that = store.state;
  //清除时间
  clearTimeout(that.timeoutObj);
  clearTimeout(that.serverTimeoutObj);
  //重启心跳
  start();
}
function start() { //开启心跳
  console.log('开启心跳');
  var self = store.state;
  self.timeoutObj && clearTimeout(self.timeoutObj);
  self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
  self.timeoutObj = setTimeout(function () {
    //这里发送一个心跳，后端收到后，返回一个心跳消息，
    if (self.ws.readyState === 1) {//如果连接正常

      self.ws.send(heartbeat); //心跳包格式需要自己确定

    } else {//否则重连
      reconnect();
    }
    self.serverTimeoutObj = setTimeout(function () {
      //超时关闭
      self.ws.close();
      reconnect()
    }, self.timeout);
  }, self.timeout)
}
function onmessage(e) {
  console.log('接收数据', e)
  //处理数据的地方
  reset();
}
function onclose(e) {
  console.log('websocket 断开: ', e);

}
function onerror(e) {
  console.log("出现错误");
  //重连
  reconnect();
}

export default {
  initWebpack,
  onmessage,
  onclose,
  onopen,
  onerror

}