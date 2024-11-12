<template>
  <div class="event_warp">
    <div class="tab">
      <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
    </div>
    <div class="topHolder"></div>
    <div class="subTab"></div>
    <div class="detailMsg" v-show="tabIndex === 1">
      <ul class="ul">
        <li
          class="li"
          v-if="
            checkRight(
              'handleManagement:eventName',
              'eventManagement:eventName',
              'distributionManagement:eventName'
            )
          "
        >
          <span>事件名称</span>
          <div>{{ detail.title }}</div>
        </li>
        <li
          v-if="
            checkRight(
              'handleManagement:location',
              'eventManagement:location',
              'distributionManagement:location'
            )
          "
        >
          <span>事发地址</span>
          <div>{{ detail.incidentAddress }}</div>
        </li>
        <li
          v-if="
            checkRight(
              'handleManagement:eventDescription',
              'eventManagement:eventDescription',
              'distributionManagement:eventDescription'
            )
          "
        >
          <span>事件描述</span>
          <div>{{ detail.incidentContent }}</div>
        </li>
        <li
          v-if="
            checkRight(
              'handleManagement:eventCategory',
              'eventManagement:eventCategory',
              'distributionManagement:eventCategory'
            )
          "
        >
          <span>事件类别</span>
          <div>
            {{
              detail.eventName &&
              detail.eventName.length &&
              detail.eventName.join()
            }}
          </div>
        </li>
        <li
          v-if="
            checkRight(
              'handleManagement:eventSource',
              'eventManagement:eventSource',
              'distributionManagement:eventSource'
            )
          "
        >
          <span>事件来源</span>
          <div>涉稳事件录入</div>
        </li>
        <li
          v-if="
            checkRight(
              'handleManagement:area',
              'eventManagement:area',
              'distributionManagement:area'
            )
          "
        >
          <span>所属区域</span>
          <div>瓯海区</div>
        </li>
        <li
          v-if="
            checkRight(
              'handleManagement:affiliatedStreet',
              'eventManagement:affiliatedStreet',
              'distributionManagement:affiliatedStreet'
            )
          "
        >
          <span>所属街道</span>
          <div>{{ detail.roadName }}</div>
        </li>
        <li>
          <span>事发时间</span>
          <div>{{ detail.incidentTime }}</div>
        </li>
        <li>
          <span>截止时间</span>
          <div>
            {{ detail.cutOffTime ? detail.cutOffTime.split(" ")[0] : "" }}
          </div>
        </li>
        <li>
          <span>最新处置时间</span>
          <div>{{ detail.updateTime }}</div>
        </li>
        <!-- <li>
                    <div>
                        <span>位置信息</span>
                        <div class="map"></div>
                    </div>
        </li>-->
      </ul>
    </div>
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
            <i>{{ v.createTime }}</i>
          </div>
          <div>
            <span>处置情况</span>
            <div>{{ v.remark }}</div>
          </div>
          <div>
            <span>上传人</span>
            <div>{{ v.userName }}</div>
          </div>
        </li>
        <!-- <li v-if="!noMore[4]" class="loadMore">
                    <i class="iconfont icon-Loading"></i>
                    加载中...
                </li>
                <li v-if="noMore[4]" class="loadMore">
                    没有更多了...
        </li>-->
      </ul>
    </div>
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
        <!-- <li v-if="!noMore[5]" class="loadMore">
                    <i class="iconfont icon-Loading"></i>
                    加载中...
                </li>
                <li v-if="noMore[5]" class="loadMore">
                    没有更多了...
        </li>-->
      </ul>
    </div>
    <div class="preview" v-show="showImg" @click="showImg = false">
      <img :src="previewUrl" alt />
    </div>
    <div class="endHolder"></div>
    <div class="btn" v-if="type == 7">
      <!-- <span @click="handClick(10)" v-if="signData.isSign===0">签收</span> -->
      <span
        @click="handClick(1)"
        v-if="checkRight('handleManagement:disposalSituation')"
        >处置情况</span
      >
      <span
        @click="handClick(2)"
        v-if="checkRight('handleManagement:applyForKnot')"
        >申请办结</span
      >
    </div>
    <div class="btn assist" v-if="type == 8">
      <!-- <span @click="handClick(10)" v-if="signData.isSign===0">签收</span> -->
      <span
        @click="handClick(1)"
        v-if="checkRight('handleManagement:disposalSituation')"
        >处置情况</span
      >
    </div>
    <!-- 已发事件-处理中 -->
    <div class="btn" v-if="type == 9">
      <span @click="handClick(3)" v-if="checkRight('eventManagement:edit')"
        >编辑</span
      >
      <span @click="handClick(4)" v-if="checkRight('eventManagement:withdraw')"
        >撤回</span
      >
      <span @click="handClick(8)" v-if="checkRight('eventManagement:edit')"
        >新增处置</span
      >
      <span
        @click="handClick(1)"
        v-if="checkRight('eventManagement:supplementaryExplanation')"
        >处置情况</span
      >
    </div>
    <!-- 已发事件-已回复 -->
    <div class="btn" v-if="type == 10">
      <span @click="handClick(3)" v-if="checkRight('eventManagement:edit')"
        >编辑</span
      >
      <span
        @click="handClick(5)"
        v-if="checkRight('eventManagement:repliedWithdraw')"
        >退回</span
      >
      <span
        @click="handClick(1)"
        v-if="checkRight('eventManagement:supplementaryExplanation')"
        >处置情况</span
      >
      <span
        @click="handClick(9)"
        v-if="checkRight('eventManagement:repliedSetUp')"
        >办结</span
      >
      <!-- <span @click="handClick(10)" v-if="signData.isSign===0">签收</span> -->
    </div>
    <!-- 草稿箱 -->
    <div class="btn" v-if="type == 12">
      <span
        @click="handClick(6)"
        v-if="checkRight('distributionManagement:assign')"
        >指派</span
      >
      <span
        @click="handClick(3)"
        v-if="checkRight('distributionManagement:edit')"
        >编辑</span
      >
      <span
        @click="handClick(7)"
        v-if="checkRight('distributionManagement:delete')"
        >删除</span
      >
    </div>
  </div>
</template>
<script>
// import { ImagePreview } from 'vant';
import Nav from "../../components/tab";
import {
  getHandleEventDetailByIdForApp,
  getHandleRole,
  saveHandle,
  getHandleProgList,
  selHandleFileList,
  getLeaderHandleList,
  delHandle,
  getSupplementHandleList,
  addHandleNew,
  addHandle1,
} from "../../api/a";
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
      signData: {},
    };
  },
  async created() {
    const that = this;
    // 政务钉钉语法
    dd.enablePullToRefresh()
      .then((res) => {
        that.getDetail();
        that.getMore();
        that.getHandleRole();
      })
      .catch((err) => {
        dd.stopPullDownRefresh();
      });
    this.getDetail();
    this.getMore();
    this.getHandleRole();
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
      if (this.type === "7" || this.type === "8" || this.type === "10") {
        const data = await getHandleRole({
          eventId: this.id,
          isSign: 0,
          eventType: 1,
        });
        console.log(data);
        if (data.success) {
          if (data.data.length > 0 && data.data[0].operationType != 20) {
            this.signData = data.data[0];
            if (this.signData.isSign == 0) {
              const data1 = await saveHandle({ id: this.signData.id });
              if (data1.success) {
                // alert(data1.message?data1.message:'签收成功')
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
      const data = await getHandleEventDetailByIdForApp(this.$route.query);
      if (data.success) {
        this.detail = data.data.sourceData;
        const rightList = [
          ...(data.data.barRight || []),
          ...(data.data.bottomRight || []),
          ...(data.data.filedRight || []),
        ];
        rightList.length &&
          rightList.forEach((v) => {
            this.right += v.name;
          });
        if (this.type == 7 || this.type == 8 || this.type == 11) {
          this.tabs = [
            { name: "详细信息" },
            {
              name: "事件进度",
              hide: !this.checkRight("handleManagement:processing"),
            },
            {
              name: "附件信息",
              hide: !this.checkRight("handleManagement:extInfo"),
            },
            {
              name: "处置情况",
              hide: !this.checkRight("handleManagement:resultInfo"),
            },
            {
              name: "领导批示",
              hide: !this.checkRight("handleManagement:leadershipInstructions"),
            },
          ];
          return;
        }
        if (this.type == 9 || this.type == 10) {
          this.tabs = [
            { name: "详细信息" },
            {
              name: "事件进度",
              hide: !this.checkRight("eventManagement:processing"),
            },
            {
              name: "附件信息",
              hide: !this.checkRight("eventManagement:extInfo"),
            },
            {
              name: "处置情况",
              hide: !this.checkRight("eventManagement:resultInfo"),
            },
            {
              name: "领导批示",
              hide: !this.checkRight("eventManagement:leadershipInstructions"),
            },
          ];
          return;
        }
        this.tabs = [
          { name: "详细信息" },
          {
            name: "事件进度",
            hide: !this.checkRight("distributionManagement:processing"),
          },
          {
            name: "附件信息",
            hide: !this.checkRight("distributionManagement:extInfo"),
          },
          { name: "处置情况", hide: 1 },
          {
            name: "领导批示",
            hide: !this.checkRight(
              "distributionManagement:leadershipInstructions"
            ),
          },
        ];
      }
    },
    async getMore() {
      const params = { eventId: this.id };
      const [data, data2, data3, data4] = await Promise.all([
        getHandleProgList(params),
        selHandleFileList(params),
        getLeaderHandleList({ eventId: this.id, operationType: 21 }),
        getSupplementHandleList({
          eventType: -1,
          orderType: 1,
          eventId: this.id,
        }),
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
        dd.stopPullDownRefresh(); //政务钉钉语法
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
      if (i === 1 || i === 2 || i === 9) {
        this.$router.push(
          `confirm?i=${i}&id=${this.id}&handleType=${this.detail.handleType}&handleDepartmentId=${this.detail.handleDepartmentId}`
        );
        return;
      }
      if (i === 3) {
        this.$router.push(`add?id=${this.id}&type=${this.type}`);
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
                    // 政务钉钉语法
                    onSuccess: function (result) {},
                    onFail: function (err) {},
                  });
                  if (data.success) {
                    // 政务钉钉语法
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到",
                    })
                      .then((res) => {
                        that.getDetail();
                        that.getMore();
                        that.getHandleRole();
                      })
                      .catch((err) => {});
                    // dd.device.notification.toast({
                    //   // icon: '',
                    //   text: "操作成功",
                    //   duration: 1.5,
                    //   onSuccess(result) {
                    //     that.getDetail();
                    //     that.getMore();
                    //     that.getHandleRole();
                    //   }
                    // });
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
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到",
                    })
                      .then((res) => {
                        that.$router.go(-1);
                      })
                      .catch((err) => {});
                    // dd.device.notification.toast({
                    //   // icon: '',
                    //   text: "操作成功",
                    //   duration: 1.5,
                    //   onSuccess(result) {
                    //     that.$router.go(-1);
                    //   }
                    // });
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
              dd.alert({
                message: data.message ? data.message : "操作成功",
                title: "提示",
                button: "收到",
              })
                .then((res) => {
                  that.$router.go(-1);
                })
                .catch((err) => {});
              //   dd.device.notification.toast({
              //     // icon: '',
              //     text: "操作成功",
              //     duration: 1.5,
              //     onSuccess(result) {
              //       that.$router.go(-1);
              //     }
              //   });
            }
          },
          onFail: function (err) {},
        });
        return;
      }
      if (i === 6) {
        this.$router.push(
          `confirm?i=${i}&id=${this.id}&handleDepartmentId=${this.detail.handleDepartmentId}`
        );
        return;
      }
      if (i === 8) {
        this.$router.push(
          `confirm?i=${i}&id=${this.id}&handleDepartmentId=${this.detail.handleDepartmentId}&firstDepartmentId=${this.detail.firstDepartmentId}`
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
                    dd.alert({
                      message: data.message ? data.message : "操作成功",
                      title: "提示",
                      button: "收到",
                    })
                      .then((res) => {
                        that.$router.go(-1);
                      })
                      .catch((err) => {});
                    // dd.device.notification.toast({
                    //   // icon: '',
                    //   text: "删除成功",
                    //   duration: 1.5,
                    //   onSuccess(result) {
                    //     that.$router.go(-1);
                    //   }
                    // });
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
          word-break: break-all;
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
        p,
        a {
          color: #5f61f8;
          text-decoration: underline;
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
