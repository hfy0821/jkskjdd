<template>
  <div style="width:100%;height:100%;position: relative;">
    <div id="container">

    </div>
    <div class="newpos"
         @click="disable? init() : getLocation()">
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
  data () {
    return {
      center: [120.986297, 28.112519],
      mapobj: null,
      localName: ''
    }
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    Pointpos: {
      type: Array || null,
      default: () => {
        return [120.986297, 28.112519];
      }
    },
  },
  watch: {
    disable (e) {
      this.init();
    },
    Pointpos (e) {
      if (e[0] == undefined) {
        return
      }
      this.center = e
      this.init()
    }
  },
  mounted () {
    // this.center = this.Pointpos
    // this.init()
    this.getLocation();
  },
  methods: {
    getLocation () {
      const _that = this;
      dd.getGeolocation({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
      }).then(res => {
        _that.center = [res.longitude, res.latitude];
        _that.getAddress(_that);
        _that.init(_that);
      }).catch(err => {
        // console.log(err, 'cuowuw')
        Notify({ type: 'danger', message: err.errorMessage });
        _that.center = [120.986297, 28.112519];
        _that.init();
        _that.getAddress(_that);
      })
    },
    init (that) {
      const _that = this || that
      var map = new AMap.Map('container', {
        viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
        zoom: 17, //初始化地图层级
        center: _that.center, //初始化地图中心点
        resizeEnable: true,
      });
      var marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: _that.center,
        draggable: true,
        offset: new AMap.Pixel(-13, -30)
      });
      AMap.plugin([
        'AMap.ToolBar',
      ], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(new AMap.ToolBar({
          // 简易缩放模式，默认为 false
          liteStyle: true
        }));
      });
      map.add(marker)
      if (_that.disable) {
        return;
      }
      map.on('click', function (e) {
        map.remove([marker])
        _that.center = [e.lnglat.lng, e.lnglat.lat],
          marker = new AMap.Marker({
            // icon: "../../static/icon/didian.png",
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [e.lnglat.lng, e.lnglat.lat],
            offset: new AMap.Pixel(-10, -20)
          });
        map.add([marker]);
        _that.getAddress(_that);
      })
    },
    getAddress (that) {
      const _that = that
      var geocoder = new AMap.Geocoder({
        city: "全国", //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
      });
      geocoder.getAddress(_that.center, function (status, result) {
        console.log(result)
        if (status === 'complete' && result.regeocode) {
          var address = result.regeocode.formattedAddress;
          _that.localName = address
          _that.sendinfo(that)
        } else {
          // log.error('根据经纬度查询地址失败')
        }
      });
    },
    sendinfo (that) {
      const _that = this || that
      _that.$emit("getInfo", { lon: _that.center[0], lat: _that.center[1], addName: _that.localName })
    }
  }
}
</script>

<style lang="less">
#container {
  width: 100%;
  height: 100%;
}
.newpos {
  position: absolute;
  bottom: 80px;
  left: 40px;
  z-index: 99;
  height: 80px;
  width: 80px;
  border-radius: 50vw;
  border: 5px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.newpos::after {
  content: "";
  // position: absolute;
  // top: 25%;
  // left: 25%;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 99;
  background-color: #009eff;
}
</style>