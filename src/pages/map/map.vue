<template>
  <div class="mapC" style="height:100%">
    <div
      @click="map_submit()"
      style="color:blue;text-align:right;margin-right:20px;font-size:18px"
    >确定</div>
    <iframe
      id="mapPage"
      width="100%"
      height="100%"
      frameborder="0"
      src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=ZZDBZ-7KQ36-S5ESB-MIUYS-AHQAO-ZGFOQ&referer=myapp"
    ></iframe>
  </div>
</template>
<script>
import { GPS } from "../../utils/tools";
import map from "./map";
export default {
  props: [],
  data() {
    return {
      mapData: {
        map_formData: this.$route.query.formData
          ? this.$route.query.formData
          : {},
        type: this.$route.query.type,
        id: this.$route.query.id
      },

      x: "",
      y: "",
      incidentAddress: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    map_submit() {
      this.mapCreated();
      this.$router.go(-1);
      map.$emit("mapData", this.mapData);
    },
    mapCreated() {
      window.addEventListener(
        "message",
        function(event) {
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module == "locationPicker") {
            //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            // console.log("location", loc);
            // alert(JSON.stringify(loc.latlng));
            this.incidentAddress = loc.poiaddress;
            var point = GPS.gcj_decrypt(loc.latlng.lat, loc.latlng.lng); //转换坐标系
            this.mapData.map_formData.x = point.lon;
            this.mapData.map_formData.y = point.lat;
          }
          return
        },
        false
      );
      /*{
          module:'locationPicker',
          latlng: {
              lat: 39.998766,
              lng: 116.273938
          },
          poiaddress: "北京市海淀区新建宫门路19号",
          poiname: "颐和园",
          cityname: "北京市"
        }
       */
    }
  }
};
</script>
<style lang="less" scoped>
</style>