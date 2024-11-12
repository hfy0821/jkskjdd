<template>
  <div>
    <!-- 事件信息 -->
    <div class="detailMsg">
      <div class="header_icon"><span>事件信息</span></div>
      <ul class="ul">
        <li class="li" v-for="(item, index) in eventInfoList" :key="index">
          <span>{{ item.name }}</span>
          <div>
            {{ detailData[item.value] }}
          </div>
        </li>
        <li>
          <span>上报附件</span>
          <div class="li_fileList" v-if="detailData.attachFileIdList.length">
            <img
              @click="preview(item, detailData.fileList)"
              v-for="item in detailData.attachFileIdList"
              :src="
                baseUrl +
                '/emergency/sysFile/download/?fileId=' +
                item +
                '&rbacToken=' +
                rbacToken_
              "
              alt=""
            />
          </div>
        </li>
      </ul>
    </div>
    <!-- 事件处置进程 -->
    <div v-if="emergencyDetail.eventProcess" class="eventHand">
      <div class="header_icon"><span>事件处置进程</span></div>
      <div
        class="eh_line"
        v-for="(item, index) in emergencyDetail.eventProcess"
        :key="index"
      >
        <p class="eh_line_p">
          <span>{{ item.dealTime }}</span>
          <span>
            {{ item.dealDepartment ? item.dealDepartment + "-" : ""
            }}{{ item.dealPeople }}
          </span>
        </p>
        <p>{{ item.dealDetail }}</p>
      </div>
    </div>
    <!-- 预案流程 -->
    <div v-if="emergencyDetail.processName" class="eventHand">
      <div class="header_icon"><span>预案流程</span></div>
      <div class="eh_line eh_line_1">
        <span>预案名称</span>
        <div>{{ emergencyDetail.processName }}</div>
      </div>
      <div class="eh_line eh_line_1" v-if="emergencyDetail.planProcess">
        <span>预案流程</span>
        <div>
          <p v-for="(item, index) in emergencyDetail.planProcess" :key="index">
            <span>{{ item.name }}</span
            ><span>{{ item.createTime }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 处置反馈 -->
    <!-- <div v-if="missionDetail.dealProcess" class="eventHand">
      <div class="header_icon"><span>处置反馈</span></div>
      <div
        class="eh_line"
        v-for="(item, index) in missionDetail.dealProcess"
        :key="index"
      >
        <p class="eh_line_p">
          <span>{{ item.dealTime }}</span>
          <span
            >{{ item.dealDepartment ? item.dealDepartment + "-" : ""
            }}{{ item.dealPeople }}</span
          >
        </p>
        <p>{{ item.dealDetail }}</p>
      </div>
    </div> -->
    <!-- 事件档案信息 -->
    <!-- <div v-if="eventHandleList" class="eventHand">
      <div class="header_icon"><span>事件档案信息</span></div>
      <div
        class="eh_line"
        v-for="(item, index) in eventHandleList"
        :key="index"
      >
        <p class="eh_line_p">
          <span>{{ item.a }}</span> <span>{{ item.b }}</span>
        </p>
        <p>{{ item.c }}</p>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: ["detailData", "emergencyDetail", "missionDetail", "eventHandleList"],
  data() {
    return {
      baseUrl: '//192.168.1.234:9101',
      rbacToken_: localStorage.getItem("rbacToken"),
      eventInfoList: [
        { name: "事件名称", value: "eventTitle" },
        { name: "事发时间", value: "eventTime" },
        { name: "事件类别", value: "eventTypeStr" },
        { name: "事件等级", value: "eventLevelStr" },
        { name: "现实行为", value: "eventBehaviorStr" },
        { name: "所属镇街", value: "roadName" },
        { name: "事发地点", value: "eventPlace" },
        { name: "参与人数", value: "involvedPersonCount" },
        { name: "事件描述", value: "eventContent" },
        { name: "事件来源", value: "eventSourceStr" },
      ],
    };
  },
  created() {
    const that = this;
    that.rbacToken_ =
      that.$store.getters.rbacToken || localStorage.getItem("rbacToken");
  },
  methods: {
    preview(v, data) {
      const that = this;
      if (v.fileType.indexOf("image") >= 0) {
        let urlData = [];
        data.map((item, index) => {
          urlData.push(
            that.baseUrl +
              "rbac/file/downloadRb/" +
              item.fileId +
              "?rbacToken=" +
              that.rbacToken_
          );
        });
        dd.previewImage({
          current:
            that.baseUrl +
            "rbac/file/downloadRb/" +
            v.fileId +
            "?rbacToken=" +
            that.rbacToken_,
          urls: urlData,
        })
          .then((res) => {})
          .catch((err) => {});
      } else {
        // dd.biz.util.openLink({
        //   url: `${this.baseUrl}rbac/file/downloadRb/${   v.fileId
        //   }?rbacToken=${localStorage.getItem("rbacToken")}`, //要打开链接的地址
        //   onSuccess: function (result) {  },
        //   onFail: function (err) {  },
        // });
        // window.open(`${this.baseUrl}rbac/file/downloadRb/${v.fileId}?rbacToken=${localStorage.getItem('rbacToken')}`)
      }
    },
  },
};
</script>
<style scoped lang="less">
.detailMsg {
  .ul {
    padding: 0 5vw;
    .li,
    li {
      display: flex;
      font-size: 28px;
      line-height: 40px;
      padding: 10px 0;
      > span:first-child {
        opacity: 0.7;
        //   width: 30%;
        text-align: right;
        padding-right: 5%;
      }
      > div {
        flex: 1;
        word-break: break-all;
      }
      .li_fileList {
        > img {
          width: 30%;
          height: 20vw;
          margin: 1%;
        }
      }
    }
  }
}
.header_icon {
  padding: 1vh 5vw;
  background: #f3f3f3;
  > span {
    border-left: 0.133333rem solid #01a6ff;
    display: inline-block;
    padding-left: 2vw;
  }
}
.eventHand {
  .eh_line {
    padding: 1vh 5vw;
    > .eh_line_p {
      display: flex;
      justify-content: space-between;
    }

    .span_color {
      width: 10vw;
      display: inline-block;
      height: 2vh;
      margin-right: 3vw;
    }
    .red {
      background: red;
    }
    .green {
      background: green;
    }
    .yellow {
      background: yellow;
    }
  }
  .eh_line_1 {
    display: flex;
    > span {
      margin-right: 3vw;
    }
    > div {
      flex: 1;
      > p {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
