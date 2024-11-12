<template>
  <div class="mapC" style="height:100%">
    <iframe
      id="mapPage"
      width="100%"
      height="100%"
      frameborder="0"
      src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=ZZDBZ-7KQ36-S5ESB-MIUYS-AHQAO-ZGFOQ&referer=myapp"
    ></iframe>
    <div class="map_footer">
      <div @click="map_return(0)">取消</div>
      <div @click="map_return(1)">确定</div>
    </div>
  </div>
</template>
<script>
import { GPS } from "../utils/tools";
// import map from "./map";
export default {
  props: [],
  data() {
    return {
      mapData: {
        v: 0,
        address: "",
        x: "",
        y: "",
        status: false
      }
    };
  },
  created() {
    this.mapCreated();
  },
  mounted() {},
  methods: {
    map_return(v) {
      let that = this;
      that.mapData.v = v;
      // if (v == 1) {
      setTimeout(() => {
        that.$emit("map_return", that.mapData);
      }, 500);
      // } else {
      //   setTimeout(() => {
      //     that.$emit("map_return", { status: v });
      //   }, 500);
      // }
    },
    mapCreated() {
      let that = this;
      window.addEventListener(
        "message",
        function(event) {
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module == "locationPicker") {
            //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            that.mapData.address = loc.poiaddress;
            if(loc.poiname == '我的位置'){
              that.mapData.address = '当前位置'
            }
            var point = GPS.gcj_decrypt(loc.latlng.lat, loc.latlng.lng); //转换坐标系
            that.mapData.x = point.lon;
            that.mapData.y = point.lat;
            // alert(JSON.stringify(that.mapData));
          }
        }
        // false
      );
      //   /*{
      //       module:'locationPicker',
      //       latlng: {
      //           lat: 39.998766,
      //           lng: 116.273938
      //       },
      //       poiaddress: "北京市海淀区新建宫门路19号",
      //       poiname: "颐和园",
      //       cityname: "北京市"
      //     }
      //    */
    }
  }
};
</script>
<style lang="less" scoped>
.map_footer {
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  padding-top: 20px;
  border-top: 1px solid gray;
  div {
    display: inline-block;
    color: blue;
    font-size: 35px;
  }
}
</style>