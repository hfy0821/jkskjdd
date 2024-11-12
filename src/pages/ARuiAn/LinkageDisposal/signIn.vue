<template>
  <div class="SignInClass">
    <div class="SC_circle" @click="singInFn()">
      <div class="name">{{ title }}</div>
      <div class="time">{{ time }}</div>
    </div>
    <div class="SC_info">{{ address }}</div>
  </div>
</template>

<script>
import { SignIn } from "../../../api/a";
export default {
  data() {
    return {
      time: "",
      address: "",
      title: "现场就位",
      userInfo: {},
      runTeamId: "",
      runStationId: "",
      emergencyId: "",
      teamId: "",
      runProcessesTaskId: "",
      disabled: false,
    };
  },
  computed: {},
  created() {
    const that = this;
    that.loadFn();
  },

  methods: {
    async singInFn() {
      const that = this;
      if (that.disabled) {
        that.alert("已签到");
      } else {
        const res = await SignIn({
          runStationId: that.runStationId,
          runTeamId: that.runTeamId,
          emergencyId: that.emergencyId,
          userId: that.userInfo.id,
          teamId: that.teamId,
          runProcessesTaskId: that.runProcessesTaskId,
        });
        if (res.success) {
          that.title = "签到成功";
          that.disabled = true;
        }
      }
    },
    alert(v) {
      dd.alert({
        message: v,
        title: "提示",
        button: "收到",
      })
        .then((res) => {})
        .catch((err) => {});
    },
    loadFn() {
      const that = this;
      that.disabled = false;

      let query = that.$route.query;
      that.runTeamId = query.runTeamId;
      that.runStationId = query.runStationId;
      that.emergencyId = query.emergencyId;
      that.teamId = query.teamId;
      that.runProcessesTaskId = query.runProcessesTaskId;

      //date
      setInterval(() => {
        let date = new Date();
        let H = date.getHours();
        let M = date.getMinutes();
        let S = date.getSeconds();
        if (H < 10) {
          H = "0" + H;
        }
        if (M < 10) {
          M = "0" + M;
        }
        if (S < 10) {
          S = "0" + S;
        }
        that.time = H + ":" + M + ":" + S;
      }, 500);
      //localStorage
      if (localStorage.userInfo) {
        that.userInfo = JSON.parse(localStorage.userInfo);
      }
      //
      dd.getGeolocation({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
      })
        .then((res) => {
          that.address = res.address;
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
  padding: 10vh 0;
  // padding-bottom: 5vh;
  .SC_circle {
    background: #345fe6;
    width: 50vw;
    height: 50vw;
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
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
    margin-top: 5vh;
  }
  // #345fe6
}
</style>
