<template>
  <div class="SignInClass">
    <div class="SC_circle">
      <div class="name">现场就位</div>
      <div class="time">{{ time }}</div>
    </div>
    <div class="SC_info">{{ address }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
      address: "",
    };
  },
  computed: {},
  created() {
    setInterval(() => {
      let d = new Date();
      let H = d.getHours();
      let M = d.getMinutes();
      let S = d.getSeconds();
      this.time = H + ":" + M + ":" + S;
    }, 500);
    this.geolocation();
  },

  methods: {
    geolocation() {
      let that = this;
      dd.getGeolocation({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
      })
        .then((res) => {
          this.address = res.address;
          //   that.formData.incidentAddress = res.address;
          //   var point = GPS.gcj_decrypt(res.latitude, res.longitude); //转换坐标系
          //   that.formData.x = point.lon;
          //   that.formData.y = point.lat;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.SignInClass {
  .SC_circle {
    background: #345fe6;
    width: 50vw;
    height: 50vw;
    border-radius: 50%;
    position: relative;
    margin: 5vh auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    .name {
      color: #fff;
      font-size: 60px;
      margin-bottom: 10px;
    }
    .time {
      font-size: 40px;
      color: #fff;
    }
  }
  .SC_info {
    text-align: center;
  }
  // #345fe6
}
</style>
