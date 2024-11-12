<template>
  <div class="listing">
    <!--事件详情-->
    <div class="content">
      <h3>人员异动</h3>
      <div class="sub"></div>
      <!-- <h4>title</h4> -->
      <!-- <p>incidentContent</p> -->
      <div class="content_detail">
        <!-- <div>
          <span>异动人员:</span>
          <span>某某某</span>
        </div> -->
        <div>
          <span>异动内容：</span>
          <span>{{ detail.petitionContent }}</span>
        </div>
        <div>
          <span>异动时间：</span>
          <span>{{ detail.petitionTime }}</span>
        </div>
        <div>
          <span>户籍地址：</span>
          <span>{{ detail.s }}</span>
        </div>
      </div>
      <!-- <div class="event-detail-box">
        <div class="text-item">
          <div class="left-side">
            <span>附<span style="opacity: 0">人数</span>件</span>
            <span>:</span>
          </div>
          <div class="right-side">
            <div class="swiper-container img-swiper">
              <ul class="swiper-wrapper">
                <li
                  class="swiper-slide"
                  style="width: 1.94rem; margin-left: 0.09rem"
                >
                  <img style="width: 100%; height: 100%" src="" />
                </li>
              </ul>
            </div>
            <div class="file-list">
              <p class="file-item">
                fileName
                <i
                  class="fa fa-download"
                  style="color: #4a5bf4; cursor: pointer"
                  >下载</i
                >
              </p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- 领导批示 -->
    <!-- <div class="instructions">
      <div class="head">
        <div class="left-side">
          <span>领导批示</span>
        </div>
        <div class="right-side">
          <span>添加</span>
        </div>
      </div>
      <div class="table">
        <div>
          <div class="title">
            <span style="width: 25%; display: inline-block">姓名</span>
            <span style="width: 50%; display: inline-block">批示内容</span>
            <span style="width: 25%; display: inline-block">批示时间</span>
          </div>
          <div class="list" style="display: flex">
            <span style="width: 25%; display: inline-block">optUserName</span>
            <span style="width: 50%; display: inline-block">remark</span>
            <span style="width: 25%; display: inline-block">item.createTime | myfilter</span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 领导签收 -->
    <!-- <div class="instructions">
      <div class="head">
        <div class="left-side">
          <span>领导签收</span>
        </div>
      </div>
      <div class="table">
        <div>
          <div class="title" style="display: flex">
            <span style="width: 50%; display: inline-block">姓名</span>
            <span style="width: 50%; display: inline-block">签收时间</span>
          </div>
          <div class="list" style="display: flex">
            <span style="width: 50%; display: inline-block">item.optUserName</span>
            <span style="width: 50%; display: inline-block">item.signTime | myfilter</span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="disposition">
      <span>处置要求</span>
      <p>event.reqDepartContent</p>
      <div>
        <span>处置期限：</span>
        cutOffTime</div>
    </div> -->
    <!-- 处置情况 -->
    <div class="instructions">
      <div class="head">
        <div class="left-side">
          <img src="../../../assets/image/eventIcon/czqk.png" />
          <span>处置情况</span>
        </div>
        <div @click="handleAddClick()" class="right-side">
          <img src="../../../assets/image/eventIcon/add.png" />
          <span>添加</span>
        </div>
      </div>
      <div class="table handleClass">
        <div>
          <div class="title">
            <!-- <span class="title_inline" style="width: 20%">处置单位</span> -->
            <span class="title_inline" style="width: 20%">处置人</span>
            <span class="title_inline" style="width: 45%">处置内容</span>
            <span class="title_inline" style="width: 35%">处置时间</span>
          </div>
          <div class="list" v-if="detail.peoplePetitionRecordList.length == 0">
            <span style="width: 100%; text-align: center"> 暂无处置情况 </span>
          </div>
          <div
            class="list"
            v-for="(item, index) in detail.peoplePetitionRecordList"
            :key="index"
          >
            <!-- <span class="title_inline" style="width: 20%">
              {{ item.company }}
            </span> -->
            <span class="title_inline" style="width: 20%">
              {{ item.createName }}
            </span>
            <span class="title_inline" style="width: 45%">
              {{ item.recordContent }}
            </span>
            <span class="title_inline" style="width: 35%">
              {{ item.createTime }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 稳控专版 -->
    <!-- <div class="program">
      <div class="head">
        <div class="left-side">
          <span>稳控专班人员及稳控（化解）方案</span>
        </div>
        <div class="right-side"></div>
      </div>
      <div class="table">
        <table border="1" width="100%">
          <tr>
            <td rowspan="9">事<br />权<br />单<br />位</td>
            <td rowspan="6">稳控<br />专班</td>
            <td rowspan="2">包案<br />领导</td>
            <td>姓名</td>
            <td>职务</td>
            <td>联系电话</td>
          </tr>
          <tr>
            <td>emphEventControl.authorityLeader.name</td>
            <td>emphEventControl.authorityLeader.duty</td>
            <td>emphEventControl.authorityLeader.phone</td>
          </tr>
          <tr>
            <td>专班<br />成员</td>
            <td>emphEventControl.firstauthorityList.name</td>
            <td>emphEventControl.firstauthorityList.duty</td>
            <td>emphEventControl.firstauthorityList.phone</td>
          </tr>
          <tr>
            <td>item.name</td>
            <td>item.duty</td>
            <td>item.phone</td>
          </tr>
          <tr class="defuse">
            <td>稳控<br />（化解）<br />方案</td>
            <td colspan="4">emphEventControl.authorityIdea</td>
          </tr>
        </table>
        <table border="1" width="100%">
          <tr>
            <td rowspan="9">稳<br />控<br />单<br />位</td>
            <td rowspan="6">稳控<br />专班</td>
            <td rowspan="2">包案<br />领导</td>
            <td>姓名</td>
            <td>职务</td>
            <td>联系电话</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>专班<br />成员</td>
            <td>4</td>
            <td>5</td>
            <td>1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2</td>
            <td>2</td>
          </tr>
          <tr class="defuse">
            <td>稳控<br />（化解）<br />方案</td>
            <td colspan="4">emphEventControl.controlIdea</td>
          </tr>
        </table>
      </div>
    </div> -->
    <!-- 签收 -->
    <!-- <div class="instructions">
      <div class="head">
        <div class="left-side">
          <span>签收</span>
        </div>
      </div>
      <div class="table">
        <div>
          <div class="title" style="display: flex">
            <span style="width: 20%; display: inline-block">签收单位</span>
            <span style="width: 20%; display: inline-block">签收人</span>
            <span style="width: 40%; display: inline-block">签收状态</span>
            <span style="width: 20%; display: inline-block">签收时间</span>
          </div>
          <div class="list">
            <span style="width: 20%; display: inline-block">1</span>
            <span style="width: 20%; display: inline-block">1</span>
            <span style="width: 40%; display: inline-block">2</span>
            <span style="width: 20%; display: inline-block">item.signTime | myfilter}</span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 抄送 -->
    <!-- <div class="instructions">
      <div class="head">
        <div class="left-side">
          <span>抄送</span>
        </div>
      </div>
      <div class="table">
        <div>
          <div class="title" style="display: flex">
            <span style="width: 20%; display: inline-block">抄送单位</span>
            <span style="width: 20%; display: inline-block">抄送人</span>
            <span style="width: 40%; display: inline-block">状态</span>
            <span style="width: 20%; display: inline-block">时间</span>
          </div>
          <div class="list">
            <span style="width: 20%; display: inline-block">department</span>
            <span style="width: 20%; display: inline-block">item.signUserName</span>
            <span style="width: 40%; display: inline-block">item.isSign == 1 ? "已读" : "未读" </span>
            <span style="width: 20%; display: inline-block">item.signTime }}</span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 报送领导 -->
    <!-- <div class="endList submission">
      <div>
        <span>报送领导</span>
      </div>
      <section>
        <span>userName</span>
      </section>
    </div>
    <div class="endList">
      <div>
        <span>发送单位</span>
      </div>
      <section>
        <span>department</span>
      </section>
    </div>
    <div class="endList">
      <div>
        <span>签发日期</span>
      </div>
      <section>createTime</section>
    </div> -->
    <!--底部-->
    <div class="bottom-box">
      <p class="line"></p>
      <span>已是最底部</span>
      <p class="line"></p>
    </div>

    <!-- btn -->
    <div class="btn">
      <span v-if="detail.isSign != 1" @click="signClick()">签到</span>
      <span v-if="detail.isSign == 1">已签到</span>
    </div>
  </div>
</template>
<script>
import {
  getPeoplePetitionInfo,
  updateJspticket,
  fyApiGatewayConfig,
  fyApiGatewayUserInfo,
  confirmRead,
  signRecord,
} from "@/api/a.js";
import ding from "@/common/ding";

export default {
  data() {
    return {
      petitionId: "",
      petitionRecordId: "",
      detail: {
        peoplePetitionRecordList: [],
      },
      nums: 1,
      latitude: "",
      longitude: "",
      address: "",
    };
  },
  async created() {
    const that = this;
    that.GC();
    dd.ready(() => {
      dd.runtime.permission.requestAuthCode({
        corpId: ding.corpId,
        async onSuccess(info) {
          console.log(info.code, "0");
          let data = {
            code: info.code,
            corpid: ding.corpId,
            dingId: ding.dingId,
          };
          const FU = await fyApiGatewayUserInfo(data);
          if (FU.success) {
            const userInfo = FU.data;
            localStorage.setItem("rbacToken", userInfo.rbacToken);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            that.$store.commit("setToken", userInfo.rbacToken);
            // 获取页面详情id
            let getId = window.location.href;
            that.petitionId = getId.split("petitionId=")[1].split("&")[0];
            that.petitionRecordId = getId
              .split("petitionId=")[1]
              .split("&")[1]
              .split("=")[1];
            // let a ="http://192.168.1.233:8888/#/ARuiAn/SidePage/list?petitionId=3&petitionRecordId=4";
            // console.log(window.location.href, "ooo");
            // 详情接口
            that.getGeolocationFn();
            that.getPeoplePetitionInfo_interface();
          }
        },
      });
    });
  },
  methods: {
    // 详情接口
    async getPeoplePetitionInfo_interface() {
      const that = this;
      const res = await getPeoplePetitionInfo({
        id: that.petitionId,
        petitionRecordId: that.petitionRecordId,
      });
      if (res.success) {
        // 详情数据 赋值
        that.detail = res.data;
        if (that.detail.isRead != 1) {
          that.confirmRead_interface();
        }
      }
    },
    // 已读
    async confirmRead_interface() {
      const that = this;
      const res = await confirmRead({
        recordType: 204,
        petitionId: that.petitionId,
        id: that.petitionRecordId,
      });
    },
    // 获取地址
    getGeolocationFn() {
      const that = this;
      dd.getGeolocation({
        targetAccuracy: 200,
        coordinate: 1,
        withReGeocode: true,
        useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
      })
        .then(async (res) => {
          that.latitude = res.latitude;
          that.longitude = res.longitude;
          that.address = res.address;
          // that.formData.incidentAddress = res.address;
          // // var point = GPS.gcj_decrypt(res.latitude, res.longitude); //转换坐标系
          // that.formData.x = point.lon;
          // that.formData.y = point.lat;
        })
        .catch((err) => {});
    },
    // 签到
    async signClick() {
      const that = this;
      const ress = await signRecord({
        recordType: 205,
        petitionId: that.petitionId,
        id: that.petitionRecordId,
        longitude: that.longitude,
        latitude: that.latitude,
        recordAddress: that.address,
      });
      if (ress.success) {
        that.getPeoplePetitionInfo_interface();
        dd.toast({
          icon: "success",
          text: "操作成功", //提示信息
        });
      }
    },
    //   添加处置情况
    handleAddClick() {
      const that = this;
      //   跳转添加处置页面
      that.$router.push({
        path: "/ARuiAn/SidePage/add",
        query: {
          id: that.petitionId,
        },
      });
    },
    async GC() {
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
            if (that.nums == 1) {
              console.log(res, "鉴权成功 getConfig");
            }
            if (that.nums == 2 || that.nums == 3) {
              console.log(res, "鉴权成功 updateJspticket");
            }
          })
          .catch(async (err) => {
            if (that.nums == 1) {
              console.log(err, "鉴权失败 getConfig");
            }
            if (that.nums == 2 || that.nums == 3) {
              console.log(err, "鉴权失败 updateJspticket");
            }
            that.nums += 1;
            that.GC();
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.listing {
  background-color: #f1f2f9;
  padding-bottom: 10vh;
  height: 100%;
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: solid 1px #e4e4e4;
    background: #fff;
    display: flex;
    justify-content: space-between;
    span {
      flex: 1;
      background: #409eff;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      margin: 2vh 2vh 3vh 2vh;
      line-height: 5vh;
      display: inline-block;
    }
  }
  .content {
    background-color: #fff;
    padding: 0 0.3rem 0.35rem;
    h3 {
      font-size: 0.44rem;
      color: #fc3f3f;
      text-align: center;
      padding: 0.56rem 0 0.44rem;
    }

    h4 {
      color: #333333;
      text-align: center;
      font-weight: bold;
      font-size: 0.39rem;
      margin-bottom: 0.35rem;
    }
    .content_detail {
      > div {
        display: flex;
        margin-bottom: 1vh;
        > span {
          display: inline-block;
        }
        > span:first-child {
          width: 23%;
        }
        > span:last-child {
          flex: 1;
        }
      }
    }
    .sub {
      border-bottom: 0.05rem solid #fc3f3f;
      padding-bottom: 0.1rem;
      margin-bottom: 0.37rem;
      display: flex;
      justify-content: space-between;

      span {
        color: #989898;
        font-size: 0.26rem;
      }
    }

    > p {
      color: #555;
      font-size: 0.31rem;
      text-indent: 2em;
    }
  }
  .table {
    margin: 0;
  }
  .instructions {
    margin-top: 0.2rem;
    background: white;
    .head {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e4e4e4;
      line-height: 0.93rem;
      padding: 0 0.3rem;
      .left-side {
        img {
          width: 0.35rem;
          height: 0.35rem;
        }
      }
      .right-side {
        image,
        img {
          width: 0.38rem;
          height: 0.38rem;
          vertical-align: middle;
        }
        span {
          color: #4a5bf4;
          font-size: 0.38rem;
          vertical-align: middle;
        }
      }
    }
    .table {
      padding: 0.3rem;
      > div {
        border-top: 1px solid #e4e4e4;
        border-left: 1px solid #e4e4e4;
        div {
          display: flex;
          span {
            padding: 0.19rem 0.23rem;
            border-right: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            &:nth-child(1) {
              width: 1.6rem;
            }
            &:nth-child(2) {
              flex: 1;
            }
            &:nth-child(3) {
              width: 2.05rem;
            }
          }
          &.title {
            font-size: 0.28rem;
            color: #999999;
          }
          &.list {
            color: #555555;
            font-size: 0.31rem;
          }
        }
      }
    }
    .handleClass {
      .title_inline {
        display: inline-block;
      }
    }
  }
  .program {
    margin-top: 0.2rem;
    background: white;
    .head {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e4e4e4;
      line-height: 0.93rem;
      padding: 0 0.3rem;
      .left-side {
        img {
          width: 0.35rem;
          height: 0.35rem;
        }
      }
      .right-side {
        image,
        img {
          width: 0.28rem;
          height: 0.28rem;
        }
        span {
          color: #4a5bf4;
          font-size: 0.28rem;
        }
      }
    }
    .table {
      padding: 0.3rem;
      table {
        td {
          border: 1px solid #ccc;
          text-align: center;
          padding: 0.2rem;
          word-break: break-all;
          vertical-align: middle;
        }
        .defuse {
          td {
            &:first-child {
              padding: 0.8rem 0;
            }
            &:last-child {
              padding: 0.3rem;
              text-align: left;
            }
          }
        }
      }
    }
  }
  .disposition {
    padding: 0.3rem 0.3rem 0.1rem;
    font-size: 0.28rem;
    color: #999999;
    span {
      color: #fc3f3f;
    }
  }
  .endList {
    line-height: 1.11rem;
    &.submission {
      margin-top: 0.2rem;
    }
    background: white;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    padding: 0 0.3rem;
    div {
      width: 1.8rem;
      img {
        width: 0.35rem;
        height: 0.35rem;
      }
      i {
        color: #333333;
        font-size: 0.33rem;
      }
    }
    section {
      flex: 1;
      display: flex;
      color: #555555;
      font-size: 0.33rem;
      justify-content: flex-end;
      flex-wrap: wrap;
      span {
        margin-left: 0.4rem;
      }
    }
  }
  .bottom-box {
    height: 0.76rem;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    background-color: #f1f2f9;
    span {
      font-size: 0.24rem;
      color: #999999;
      line-height: 0.76rem;
      padding: 0 0.3rem;
    }
    .line {
      flex: 1;
      height: 1px;
      background-color: #dddddd;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.modal-box {
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
  position: absolute;
  .button-box {
    position: absolute;
    bottom: 0;
    width: 10rem;
    height: 1.48rem;
    background-color: #ffffff;
    box-shadow: 0rem -0.04rem 0.19rem 0rem rgba(0, 0, 0, 0.2);
    p {
      width: 9.44rem;
      height: 1.11rem;
      background: linear-gradient(90deg, #22d120, #0ab408);
      border-radius: 0.56rem;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 0.54rem;
      line-height: 1.11rem;
      text-align: center;
      margin: 0 auto;
    }
  }
  .content-main {
    display: flex;
    flex-flow: column;
    .close-box {
      height: 1.57rem;
      line-height: 1.57rem;
      margin: 0 0.28rem;
      i {
        font-size: 0.35rem;
        color: #989898;
      }
    }
    textarea {
      font-size: 0.31rem;
      color: #555555;
      padding: 0.2rem 0.28rem;
      height: 2.77rem;
    }
  }
}
</style>