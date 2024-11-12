<template>
  <div class="entrance_warp">
    <div class="main"
         v-if="toggle">
      <div v-for="(v, i) in t"
           :key="i"
           @click="handclick(v.router)"
           style="height: 110px">
        <img :src="require('assets/image/' + v.number + '.png')"
             alt />
        <h5>{{ v.name }}</h5>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fyApiGatewayConfig,
  fyApiGatewayUserInfo,
  updateJspticket,
} from "../../api/a";
import ding from "../../common/ding";
export default {
  data () {
    return {
      toggle: true,//false
      nums: 1,
      t: [
        // {name: "人员管控",number: 0,router: "/ARuiAn/SidePage/index", },
        {
          name: "135应急指挥",
          number: 1,
          router: "/ARuiAn/LinkageDisposal/list",
        },
        {
          name: "平安督办",
          number: 2,
          router: "/ARuiAn/SafetySupervision/list",
        },
        {
          name: "线索列表",
          number: 4,
          router: "/zhezheng/cluesReport/cluesList",
        },
        {
          name: "事件列表",
          number: 8,
          router: "/zhezheng/eventReport/eventList",
        },
        {
          name: "管控任务",
          number: 9,
          router: "/zhezheng/controlTask/taskList",
        },
        {
          name: "暗访系统",
          number: 9,
          router: "/SecretVisit/index",
        },
      ],
    };
  },
  computed: {
    // count () {
    //     return this.$store.state.userManager.a
    // },
  },
  async created () {
    let that = this;
    localStorage.clear();

    that.toggle = true;
    localStorage.setItem("rbacToken", "81d003cfd31340d6853f6f25e5b1d4bf");
    return;
    dd.showLoading({
      text: "加载中", //提示信息
    });
    that.GC();
    // userinfo
    // return;
    dd.ready(() => {
      // 免登登录
      dd.runtime.permission.requestAuthCode({
        corpId: ding.corpId,
        async onSuccess (info) {
          let data = {
            code: info.code,
            corpid: ding.corpId,
            dingId: ding.dingId,
          };
          // console.log(info.code, '出来吧code......')
          // console.log(ding.corpId, '出来吧corpid......')
          // console.log(ding.dingId, 'dingId......')
          // return
          const FU = await fyApiGatewayUserInfo(data);
          if (FU.success) {
            const userInfo = FU.data;
            localStorage.setItem("rbacToken", userInfo.rbacToken);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            that.$store.commit("setToken", userInfo.rbacToken);
            dd.hideLoading();
            if (that.$route.query.pageName == "LD_detail") {
              that.detailRouter(1);
            } else if (that.$route.query.pageName == "equipment_detail") {
              that.detailRouter(2);
            } else if (that.$route.query.pageName == "control_task") {
              that.detailRouter(3);
            } else {
              that.toggle = true;
            }
            let options = {
              nick: userInfo.name,
              userId: userInfo.empCode,
            };
            maidian.jcxx(options);

            if (
              that.$route.query &&
              that.$route.query.pageName == "SafetySupervision"
            ) {
              that.$router.push({
                path: "/ARuiAn/SafetySupervision/list",
                query: {},
              });
            }
            if (userInfo.ifOperater == true) {
              let a = [
                {
                  name: "设备操作员",
                  number: 3,
                  router: "/ARuiAn/Equipment/list",
                },
              ];
              that.t = that.t.concat(a);
            }
          }
        },
      });
    });
  },

  methods: {
    a () {
      function _classCallCheck (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("cannot call a class as a function");
        }
      }

      var Test = function (Test) {
        _classCallCheck(this, Test);
        this.name = "name";
      };
    },
    async GC () {
      const that = this;
      let GC = "";
      let config = "";
      if (that.nums == 1) {
        GC = await fyApiGatewayConfig({ dingId: ding.dingId });
        config = GC.data;
      }
      if (that.nums == 2 || that.nums == 3) {
        GC = await updateJspticket({ dingId: ding.dingId });
        config = GC.data;
      }
      if (config) {
        dd.authConfig({
          ticket: config.jsticket,
          jsApiList: [
            "locateOnMap",
            "searchOnMap",
            "getGeolocation",
            "startGeolocation",
          ],
        })
          .then(async (res) => {
            console.log(
              res,
              that.nums == 1 ? "鉴权成功 getConfig" : "鉴权成功 updateJspticket"
            );
          })
          .catch(async (err) => {
            console.log(
              err,
              that.nums == 1 ? "鉴权失败 getConfig" : "鉴权失败 updateJspticket"
            );
            that.nums += 1;
            that.GC();
          });
      }
    },
    handclick (i) {
      this.$router.push(i);
      // this.$router.push({
      //   path: "/ARuiAn/SafetySupervision/list",
      // });
    },
    detailRouter (type) {
      const that = this;
      if (type == 1) {
        that.$router.push({
          path: "/ARuiAn/LinkageDisposal/detail",
          query: {
            type: that.$route.query.type,
            emergencyId: that.$route.query.emergencyId,
          },
        });
      }
      if (type == 2) {
        that.$router.push({
          path: "/ARuiAn/equipment/detail",
          query: {
            type: 1,
            id: that.$route.query.id,
          },
        });
      }
      if (type == 3) {
        that.$router.push({
          path: "/zhezheng/controlTask/taskDetail",
          query: {
            id: that.$route.query.id,
            peopleId: that.$route.query.peopleId,
            missionStatus: 1,
          },
        });
      }
    },

    // pgdt() {
    //   let url = "http://maps.apple.com/?address=杭州中意新能源";
    //   window.open(url);
    // },
    // gddt() {
    //   let url =
    //     "https://uri.amap.com/marker?position=120.193306,30.201243&name=浙江省杭州市滨江区亚飞干洗&src=mypage&callnative=1";
    //   window.open(url);
    // },
    // bddt() {
    //   let url =
    //     "http://api.map.baidu.com/marker?location=30.27956,120.210561&title=杭州东站&output=html&src=webapp.baidu.openAPIdemo";
    //   window.open(url);
    // },
  },
};
</script>
<style lang="less" scoped>
.entrance_warp {
  .main {
    height: 100vh;
    padding: 32px 0 0 32px;
    display: flex;
    flex-wrap: wrap;
    background: #f5f5f5;
    align-content: flex-start;
    > div {
      margin: 0 20px 20px 0;
      background: #fff;
      width: 216px;
      height: 216px;
      text-align: center;
      padding-top: 40px;
      border-radius: 10px;
      img {
        width: 72px;
        height: 72px;
      }
      h5 {
        font-size: 26px;
        color: #2d2d2d;
      }
      p {
        font-size: 20px;
        color: #2d2d2d;
        opacity: 0.56;
      }
    }
  }
}
</style>
