<template>
  <div class="event_warp">
    <div class="tab">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
    </div>
    <div class="topHolder"></div>
    <div class="subTab"></div>
    <!-- 详细信息 -->
    <div class="detailMsg" v-show="tabIndex === 1">
      <ul class="ul">
        <li class="li">
          <span>被检查单位</span>
          <div>{{ detail.checkTarget }}</div>
        </li>
        <li>
          <span>时间</span>
          <div>{{ detail.incidentTime }}</div>
        </li>
        <li>
          <span>所属街道</span>
          <div>{{ detail.roadName }}</div>
        </li>
        <li>
          <span>截止时间</span>
          <div>{{ detail.cutOffTime }}</div>
        </li>
        <li>
          <span>所属地点</span>
          <div>{{ detail.incidentAddress }}</div>
        </li>

        <div v-for="(item, index) in safyData_" :key="index">
          <li>
            <span>检查项</span>
            <div>{{ item.safeValue }}</div>
          </li>
          <li>
            <span>检查类型</span>
            <div>{{ checkTypeArr[item.checkType - 1] }}</div>
          </li>
          <li>
            <span>检查人</span>
            <div>{{ item.checkPerson }}</div>
          </li>
          <li>
            <span>所属类目</span>
            <div>{{ item.sslmValue }}</div>
          </li>
          <li
            v-if="item.existQuestionValue.length > 0"
            v-for="(item1, index1) in item.existQuestionValue"
            :key="index1"
          >
            <span>存在问题</span>
            <div>{{ item1.otherContent }}</div>
          </li>
          <li v-if="item.existQuestionValue.length == 0">
            <span>存在问题</span>
            <div>无问题</div>
          </li>
          <li>
            <span>文字描述</span>
            <div>{{ item.textDescription }}</div>
          </li>
        </div>

        <!--  -->
        <!-- <div v-for="(item, index) in safyData_" :key="index">
          <li v-if="item.type == 1">
            <span>检查项</span>
            <div>{{ item.otherContent }}</div>
          </li>
          <li v-if="item.type == 2">
            <span>所属类目</span>
            <div>{{ item.otherContent }}</div>
          </li>
          <li v-if="item.type == 3">
            <span>存在问题</span>
            <div>{{ item.otherContent }}</div>
          </li> -->
        <!-- <li v-if="item.type == 1">
            <span>是否合格</span>
            <div>{{ item.isQualified == 1 ? "是" : "否" }}</div>
          </li> -->
        <!-- <li v-if="item.type == 1">
            <span>检查类型</span>
            <div>{{ checkTypeArr[item.checkType - 1] }}</div>
          </li>
          <li v-if="item.type == 1">
            <span>检查人</span>
            <div>{{ item.checkPerson }}</div>
          </li>
        </div> -->

        <!--  -->
      </ul>
    </div>
    <!-- 事件进度 -->
    <div class="schedule" v-if="tabIndex === 2">
      <ul
        class="list"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading && tabIndex === 2"
        infinite-scroll-distance="10"
      >
        <li v-for="(v, i) in handleList" :key="i">
          <div>
            <div class="title">{{ i + 1 }}</div>
            <i>{{ v.createTime }}</i>
          </div>
          <div>
            <span>处理阶段</span>
            <div>{{ v.step }}</div>
          </div>
          <div>
            <span>创建人</span>
            <div>{{ v.userName }}</div>
          </div>
          <div>
            <span>签收时间</span>
            <div>{{ v.signTime }}</div>
          </div>
        </li>
        <!-- <li v-if="!noMore[2]" class="loadMore">
                    <i class="iconfont icon-Loading"></i>
                    加载中...
                </li>
                <li v-if="noMore[2]" class="loadMore">
                    没有更多了...
        </li>-->
      </ul>
    </div>
    <!-- 附件信息 -->
    <div class="accessory" v-if="tabIndex === 3">
      <ul
        class="list"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading && tabIndex === 3"
        infinite-scroll-distance="10"
      >
        <li v-for="(v, i) in fileList" :key="i">
          <div>
            <div class="title">{{ i + 1 }}</div>
            <i>{{ v.createTime }}</i>
          </div>
          <div>
            <span>附件信息</span>
            <div>
              <!-- v-if="v.fileType.indexOf('image')>=0" -->
              <p @click="preview(v)">{{ v.fileName }}</p>
              <!-- <a v-else :href="baseUrl+'rbac/file/downloadRb/'+v.fileId">{{v.fileName}}</a> -->
            </div>
          </div>
          <div>
            <span>上传人</span>
            <div>{{ v.createUserName }}</div>
          </div>
        </li>
        <!-- <li v-if="!noMore[3]" class="loadMore">
                    <i class="iconfont icon-Loading"></i>
                    加载中...
                </li>
                <li v-if="noMore[3]" class="loadMore">
                    没有更多了...
        </li>-->
      </ul>
    </div>
    <!-- 整改情况- 处置情况  -->
    <div class="disposition" v-if="tabIndex === 4">
      <ul
        class="list"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading && tabIndex === 4"
        infinite-scroll-distance="10"
      >
        <li v-for="(v, i) in supplementHandleList" :key="i">
          <div>
            <div class="title">{{ i + 1 }}</div>
            <i>{{ v.checkDate }}</i>
          </div>
          <!-- <div v-if="type == 15 || type == 16 || type == 18">
            <span>处置情况</span>
            <div>{{ v.remark }}</div>
          </div> -->
          <div>
            <span>整改情况</span>
            <div>{{ v.rectifyContent }}</div>
          </div>
          <div>
            <span>上传人</span>
            <div>{{ v.checkPerson }}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 领导批示 -->
    <div class="instructions" v-if="tabIndex === 5">
      <ul
        class="list"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading && tabIndex === 5"
        infinite-scroll-distance="10"
      >
        <li v-for="(v, i) in leaderHandleList" :key="i">
          <div>
            <div class="title">{{ i + 1 }}</div>
            <i>{{ v.createTime }}</i>
          </div>
          <div>
            <span>领导批示</span>
            <div>{{ v.remark || "无" }}</div>
          </div>
          <div>
            <span>姓名</span>
            <div>{{ v.optUserName }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="preview" v-show="showImg" @click="showImg = false">
      <img :src="previewUrl" alt />
    </div>
    <div class="endHolder"></div>
    <!-- 代办事件（主办） -->
    <div class="btn" v-if="type == 13">
      <span v-if="checkRight('safeHandleManagement:edit')" @click="handClick(3)"
        >编辑</span
      >
      <span
        v-if="checkRight('safeHandleManagement:supplementaryExplanation')"
        @click="handClick(8)"
        >新增处置</span
      >
      <!-- <span @click="handClick(2)">申请办结</span> -->
      <span @click="handClick(99)">整改情况</span>
      <!-- <span @click="handClick(10)" v-if="signData.isSign===0">签收</span> -->
    </div>
    <!-- 代办事件（已回复） -->
    <div class="btn assist" v-if="type == 14"></div>
    <!-- 已发事件-处理中 -->
    <div class="btn" v-if="type == 15">
      <span
        v-if="checkRight('safeEventManagement:processingWithdraw')"
        @click="handClick(4)"
        >撤回</span
      >
      <!-- <span @click="handClick(99)">整改情况</span> -->
      <!-- <span @click="handClick(1)">处置情况</span> -->
    </div>
    <!-- 已发事件-已回复 -->
    <div class="btn" v-if="type == 16">
      <span
        v-if="checkRight('safeEventManagement:forback')"
        @click="handClick(5)"
        >退回</span
      >
      <!-- <span @click="handClick(99)">整改情况</span> -->
      <!-- <span @click="handClick(1)">处置情况</span> -->
      <span
        v-if="checkRight('safeEventManagement:repliedSetUp')"
        @click="handClick(9)"
        >办结</span
      >
    </div>
    <!-- 草稿箱 -->
    <div class="btn" v-if="type == 18">
      <span
        v-if="checkRight('safeDistributionManagement:delete')"
        @click="handClick(7)"
        >删除</span
      >
      <span
        v-if="checkRight('safeDistributionManagement:edit')"
        @click="handClick(3)"
        >编辑</span
      >
      <span
        v-if="checkRight('safeDistributionManagement:assign')"
        @click="handClick(6)"
        >指派</span
      >
    </div>
  </div>
</template>
<script>
import Nav from "../../../components/tab";
import {
  getSafetyList,
  getHandleEventDetailByIdForApp,
  getHandleRole,
  saveHandle,
  getHandleProgList,
  selHandleFileList,
  getLeaderHandleList,
  delHandle,
  getSupplementHandleList,
  getSafetyRectifySituationList,
  addHandleNew,
  addHandle1,
} from "../../../api/a";
export default {
  name: "detail",
  components: {
    Nav,
  },
  data() {
    return {
      showImg: false,
      previewUrl: "",
      baseUrl: process.env.baseUrl,
      loading: false,
      noMore: [false, false, false, false, false, false],
      tabs: [],
      tabIndex: 1,
      type: this.$route.query.type,
      id: this.$route.query.id,
      supplementHandleList: [],
      detail: {},
      right: "",
      handleList: [],
      fileList: [],
      leaderHandleList: [],
      safety: [],
      signData: {},
      safyData_: [],
      checkTypeArr: ["专项检查", "暗查暗访", "交叉检查", "平安复查"],
      // powerData: [],
    };
  },
  async created() {
    const that = this;
    dd.enablePullToRefresh()
      .then((res) => {
        that.getDetail();
        that.getMore();
        that.getHandleRole();
      })
      .catch((err) => {
        dd.stopPullDownRefresh();
      });
    that.getDetail();
    that.getMore();
    that.getHandleRole();
  },
  methods: {
    preview(v) {
      if (v.fileType.indexOf("image") >= 0) {
        this.showImg = true;
        this.previewUrl = `${this.baseUrl}rbac/file/downloadRb/${
          v.fileId
        }?rbacToken=${localStorage.getItem("rbacToken")}`;
      } else {
        dd.biz.util.openLink({
          url: `${this.baseUrl}rbac/file/downloadRb/${
            v.fileId
          }?rbacToken=${localStorage.getItem("rbacToken")}`, //要打开链接的地址
          onSuccess: function (result) {
            /**/
          },
          onFail: function (err) {},
        });
        // window.open(`${this.baseUrl}rbac/file/downloadRb/${v.fileId}?rbacToken=${localStorage.getItem('rbacToken')}`)
      }
    },
    async getHandleRole() {
      if (this.type === "13" || this.type === "14" || this.type === "16") {
        const data = await getHandleRole({
          eventId: this.id,
          isSign: 0,
          eventType: 1,
        });
        this.signData = { isSign: 0 };
        if (data.success) {
          if (data.data.length > 0 && data.data[0].operationType != 20) {
            this.signData = data.data[0];
            if (this.signData.isSign == 0) {
              const data1 = await saveHandle({ id: this.signData.id });
              if (data1.success) {
                // alert(data1.message ? data1.message : "签收成功");
                // that.getDetail();
                // that.getMore();
                // that.getHandleRole();
              }
            }
          } else {
            this.signData = { isSign: 1 };
          }
        }
      }
    },
    async getDetail() {
      console.log(this.$route.query, "this.$route.query");
      const [data, data2] = await Promise.all([
        getHandleEventDetailByIdForApp(this.$route.query),
        getSafetyList({ eventId: this.$route.query.id }),
      ]);
      if (data.success) {
        this.detail = data.data.sourceData;
        // this.powerData = data.data.bottomRight.map((item) => {
        //   return item.name;
        // });
        const rightList = [
          ...(data.data.barRight || []),
          ...(data.data.bottomRight || []),
          ...(data.data.filedRight || []),
        ];
        rightList.length &&
          rightList.forEach((v) => {
            this.right += v.name;
          });
        // ---------------------
        if (data2.success) {
          let safety = data2.data;
          // this.safyData_ = data2.data;
          let safyData_ = data2.data;
          //
          let safeTypeList = [];
          let i = [];
          safyData_.map((item, index) => {
            if (item.page) {
              i.push(item.page);
            }
          });
          let arr = [...new Set(i)];
          arr.map((item, index) => {
            let obj = { existQuestionValue: [] };
            safyData_.map((item1, index1) => {
              if (item == item1.page) {
                if (item1.type == 1) {
                  obj.safeValue = item1.otherContent;
                  obj.checkPerson = item1.checkPerson;
                  obj.checkDepartment = item1.checkDepartment;
                  obj.checkType = item1.checkType;
                  obj.textDescription = item1.textDescription;
                }
                if (item1.type == 2) {
                  obj.sslmValue = item1.otherContent;
                }
                if (item1.type == 3) {
                  obj.existQuestionValue.push({
                    otherContent: item1.otherContent,
                    rectifyStatus: item1.rectifyStatus,
                  });
                }
              }
            });
            safeTypeList.push(obj);
          });
          this.safyData_ = safeTypeList;
          safety.forEach((v) => {
            if (v.type == 1) {
              v.title = "检查项目";
              v.show = this.checkRight(":checkItem");
            } else if (v.type == 2) {
              v.title = "所属类目";
              v.show = this.checkRight(":category");
            } else {
              v.title = "存在问题";
              v.show = this.checkRight(":problem");
            }
          });
          this.safety = safety;
        }

        if (
          this.type == 13 ||
          this.type == 14 ||
          this.type == 17 ||
          this.type == 15 ||
          this.type == 16
        ) {
          this.tabs = [
            { name: "详细信息" },
            { name: "事件进度" },
            { name: "附件信息" },
            { name: "整改情况" },
            { name: "领导批示" },
          ];
          return;
        }
        if (this.type == 18) {
          this.tabs = [
            { name: "详细信息" },
            { name: "事件进度" },
            { name: "附件信息" },
          ];
          return;
        }
      }
    },
    async getMore() {
      const params = { eventId: this.id };
      const [data, data2, data3, data4] = await Promise.all([
        getHandleProgList(params),
        selHandleFileList(params),
        getLeaderHandleList({ eventId: this.id, operationType: 21 }),
        // getSupplementHandleList({
        //   eventType: -1,
        //   orderType: 1,
        //   eventId: this.id,
        // }),
        getSafetyRectifySituationList({ eventId: this.id }),
      ]);
      if (data.success) {
        this.fileList = data2.data;
        this.leaderHandleList = data3.data;
        this.supplementHandleList = data4.data;
        const result = data.data;
        this.handleList = [];
        result.length &&
          result.forEach((v) => {
            var cre = "";
            if (v.editDepartment) {
              cre += v.editDepartment;
            }
            cre += v.userName;
            switch (v.operationType) {
              case 0:
                v.step = cre + "将事件转入协同处置系统";
                break;
              case 1:
                v.step = cre + "将事件批转给" + v.department;
                break;
              case 2:
                v.step = cre + "将" + v.department + "加入协办";
                break;
              case 3:
                v.step = cre + "将事件指派给" + v.department;
                break;
              case 4:
                v.step = v.editDepartment + "添加补充说明";
                break;
              case 5:
                v.step = cre + "办结了该事件";
                break;
              case 6:
                v.step = cre + "上报该事件到协同处置系统";
                break;
              case 7:
                v.step = cre + "上报区级";
                break;
              case 8:
                v.step = cre + "申请办结";
                break;
              case 9:
                v.step = cre + "将事件撤回";
                break;
              case 10:
                v.step = cre + "将事件退回给" + v.department;
                break;
              case 22:
                v.step = cre + "将事件抄送给" + v.department;
                break;
            }
            this.handleList.push(v);
            if (v.operationType == 5) {
              return;
            }
            v.recordList &&
              v.recordList.forEach((y) => {
                var obj = {};
                obj.step = v.department + "处理人员:" + y.userName;
                obj.createTime = v.createTime;
                obj.userName = v.userName;
                obj.isSign = y.isSign;
                obj.signTime = y.signTime;
                this.handleList.push(obj);
              });
          });
      }
    },
    changeIndex(i) {
      if (this.tabIndex === i) return;
      window.scrollTo(0, 0);
      this.tabIndex = i;
    },
    loadMore() {
      // let list = 'list' + this.tabIndex
      // console.log(list)
      // console.log(this.list1.length)
      // if(this[list].length>=20){
      //     this.noMore.splice(this.tabIndex,1,true)
      //     return
      // }
      // this.loading = true;
      // setTimeout(() => {
      //     let last = this[list][this[list].length - 1];
      //     for (let i = 1; i <= 10; i++) {
      //     this[list].push(last + i);
      //     }
      //     this.loading = false;
      // }, 1000);
    },
    handClick(i) {
      if (i === 1 || i === 2 || i === 9 || i == 99) {
        this.$router.push(
          `/safety/safetycheck/confirm?i=${i}&id=${this.id}&handleType=${this.detail.handleType}&handleDepartmentId=${this.detail.handleDepartmentId}`
        );
        return;
      }
      if (i === 3) {
        this.$router.push(
          `/safety/safetycheck/add?id=${this.id}&type=${this.type}`
        );
        return;
      }
      if (i === 10) {
        const that = this;
        dd.device.notification.confirm({
          message: "是否确定签收?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "处理中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await saveHandle({ id: that.signData.id });
                  dd.device.notification.hidePreloader({
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                  if (data.success) {
                    dd.device.notification.toast({
                      // icon: '',
                      text: "操作成功",
                      duration: 1.5,
                      onSuccess(result) {
                        that.getDetail();
                        that.getMore();
                        that.getHandleRole();
                      },
                    });
                  }
                },
                onFail: function (err) {},
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      if (i === 4) {
        const params = {
          eventId: this.detail.id,
          operationType: 9,
          editDepartmentId: this.detail.firstDepartmentId,
          departmentId: this.detail.handleDepartmentId,
        };
        const that = this;
        dd.device.notification.confirm({
          message: "是否确定撤回此事件?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "处理中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await addHandleNew(params);
                  dd.device.notification.hidePreloader({
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                  if (data.success) {
                    dd.device.notification.toast({
                      // icon: '',
                      text: "操作成功",
                      duration: 1.5,
                      onSuccess(result) {
                        that.$router.go(-1);
                      },
                    });
                  }
                },
                onFail: function (err) {},
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      if (i === 5) {
        const params = {
          eventId: this.detail.id,
          operationType: 10,
          editDepartmentId: this.detail.firstDepartmentId,
        };
        const that = this;
        dd.device.notification.prompt({
          message: "处理意见",
          title: "退回",
          // defaultText:"默认提示",
          buttonLabels: ["取消", "确认"],
          async onSuccess(result) {
            if (!result.buttonIndex) return;
            params.remark = result.value;
            const data = await addHandleNew(params);
            if (data.success) {
              dd.device.notification.toast({
                // icon: '',
                text: "操作成功",
                duration: 1.5,
                onSuccess(result) {
                  that.$router.go(-1);
                },
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      if (i === 6) {
        this.$router.push(
          `/safety/safetycheck/confirm?i=${i}&id=${this.id}&handleDepartmentId=${this.detail.handleDepartmentId}`
        );
        return;
      }
      if (i === 8) {
        this.$router.push(
          `/safety/safetycheck/confirm?i=${i}&id=${this.id}&handleDepartmentId=${this.detail.handleDepartmentId}&firstDepartmentId=${this.detail.firstDepartmentId}`
        );
        return;
      }
      if (i === 7) {
        const that = this;
        dd.device.notification.confirm({
          message: "是否确定删除此事件?",
          title: "提示",
          buttonLabels: ["取消", "确定"],
          onSuccess(result) {
            if (result.buttonIndex === 1) {
              dd.device.notification.showPreloader({
                text: "删除中..",
                showIcon: true,
                async onSuccess(result) {
                  const data = await delHandle({ id: that.id });
                  dd.device.notification.hidePreloader({
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                  if (data.success) {
                    dd.device.notification.toast({
                      // icon: '',
                      text: "删除成功",
                      duration: 1.5,
                      onSuccess(result) {
                        that.$router.go(-1);
                      },
                    });
                  }
                },
                onFail: function (err) {},
              });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      // this.$router.push('confirm/'+i)
    },
    checkRight(v, x, y) {
      return (
        this.right.includes(v) ||
        (x && this.right.includes(x)) ||
        (y && this.right.includes(y))
      );
    },
  },
};
</script>
<style lang="less" scoped>
.event_warp {
  .tab {
    box-shadow: 0px 1px 0px 0px rgba(25, 31, 37, 0.12);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 1;
  }
  .topHolder {
    height: 96px;
  }
  .endHolder {
    height: 136px;
  }
  .subTab {
    height: 24px;
    background: @bgColor1;
  }
  .detailMsg {
    .ul {
      padding: 0 32px;
      .li,
      li {
        display: flex;
        font-size: 28px;
        line-height: 40px;
        padding: 20px 0;
        span {
          width: 200px;
          opacity: 0.7;
        }
        > div {
          flex: 1;
          color: #5f61f8;
        }
        &.checkItem {
          padding: 0;
          > div {
            display: flex;
            padding: 20px 0;
            div {
              flex: 1;
              color: #5f61f8;
            }
          }
        }
        &.first {
          border-top: 1px solid #dcdcdc;
        }
      }
    }
  }
  .list {
    padding: 0 32px;
    li {
      border-bottom: solid 1px #191f251f;
      padding: 20px 0 0;
      > div {
        .detailMsg > .ul > .li;
        padding: 0;
        margin-bottom: 20px;
        .title {
          color: @color;
          opacity: 0.7;
        }
        p {
          color: #5f61f8;
          text-decoration: underline;
          word-break: break-all;
        }
      }
      &.loadMore {
        text-align: center;
        border: 0;
        i {
          display: inline-block;
          position: relative;
          animation: rotat 1.3s linear infinite;
        }
        @keyframes rotat {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
  .preview {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(25, 31, 37, 0.7);
    z-index: 1;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: solid 1px #191f251f;
    display: flex;
    justify-content: space-between;
    padding: 24px 32px;
    background: #fff;
    span {
      flex: 1;
      text-align: center;
      line-height: 72px;
      background: #409eff;
      color: #fff;
      border-radius: 8px;
      margin-right: 14px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
