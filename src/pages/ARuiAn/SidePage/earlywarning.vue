<template>
  <div class="earlywarningClass">
    <div class="earlywarningClass_header">已选人员</div>
    <div
      v-for="(item, index) in checkedList"
      :key="index"
      class="earlywarningClass_line"
    >
      <van-checkbox
        shape="square"
        @click="checkedArr($event, item, index)"
        v-model="item.checked"
        icon-size="20px"
      >
        {{ item.name }}
      </van-checkbox>
      <van-checkbox
        shape="square"
        @click="checkedbox($event, item2, index2, index)"
        v-model="item2.checked"
        v-for="(item2, index2) in item.allMemberList"
        :key="index2"
        icon-size="20px"
        class="earlywarningClass_checkbox"
        style="margin: 1vh 0"
      >
        <span style="display: inline-block; width: 45%">
          {{ item2.departmentName }}
        </span>
        <span style="display: inline-block; width: 20%; margin: 0 2%">
          {{ item2.teamDuty }}
        </span>
        <span style="display: inline-block; width: 30%">
          {{ item2.userName }}
        </span>
      </van-checkbox>
    </div>
    <div class="earlywarningClass_textarea">
      <textarea
        v-model="formData.recordContent"
        cols="20"
        rows="10"
        placeholder="请输入内容"
      ></textarea>
    </div>
    <!-- btn -->
    <div style="height: 11vh"></div>
    <div class="btn">
      <span @click="submit()">确定</span>
      <span @click="cancel()">取消</span>
    </div>
  </div>
</template>
<script>
import { getDealTeamListByScreen, addPeoplePetitionRecord } from "@/api/a";
export default {
  data() {
    return {
      type: "",
      // roadId: "",
      checkedList: [
        // {
        //   allMemberList: [
        //     {
        //       departmentName:
        //         "飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页飞页",
        //       teamDuty: "123123",
        //       userName: "1231",
        //     },
        //   ],
        // },
      ],
      formData: {
        recordContent: "",
        petitionId: "",
        recordType: "",
        recipientList: [],
      },
    };
  },
  created() {
    const that = this;
    let query = that.$route.query;
    that.formData.petitionId = query.petitionId;
    that.formData.recordType = query.recordType;
    that.formData.peopleId = query.peopleId;
    that.type = query.type;
    // let localStorageData = JSON.parse(localStorage.getItem("userInfo"));
    // that.roadId = localStorageData.roadId;
    console.log(query, "query");
    that.getDealTeamListByScreenFn();
  },
  methods: {
    checkedArr(e, item, index) {
      const that = this;
      if (item.checked) {
        that.checkedList[index].allMemberList.map((item2, index2) => {
          item2.checked = true;
        });
        that.$forceUpdate();
      }
      if (!that.checkedList[index].checked) {
        that.checkedList[index].allMemberList.map((item2, index2) => {
          item2.checked = false;
        });
        that.$forceUpdate();
      }
    },
    // 选中
    checkedbox(e, item2, index2, index) {
      const that = this;
      if (item2.checked) {
        for (var i = 0; i < that.checkedList[index].allMemberList.length; i++) {
          if (!that.checkedList[index].allMemberList[i].checked) {
            that.checkedList[index].checked = false;
            that.$forceUpdate();
            return;
          } else {
            that.checkedList[index].checked = true;
            that.$forceUpdate();
          }
        }
      }
      if (!item2.checked) {
        that.checkedList[index].checked = false;
        that.$forceUpdate();
      }
    },
    // 提交
    submit() {
      const that = this;
      let arr = [];
      that.checkedList.map((item, index) => {
        if (item.allMemberList && item.allMemberList.length) {
          item.allMemberList.map((item2, index2) => {
            if (item2.checked) {
              arr.push({
                teamId: item2.teamId,
                userId: item2.teamUserId,
                departId: item2.teamDepartId,
                empAccountId: item2.empAccountId,
              });
            }
          });
        }
      });
      that.formData.recipientList = arr;
      dd.confirm({
        title: "温馨提示",
        message: "确定提交？",
        buttonLabels: ["取消", "确定"],
      }).then(async (res) => {
        if (res.buttonIndex == 1) {
          let res = await addPeoplePetitionRecord(that.formData);
          if (res.success) {
            dd.toast({
              icon: "success",
              text: "操作成功",
            }).then((res) => {
              if (that.type == 1) {
                that.$router.go(-2);
              } else {
                that.$router.go(-1);
              }
            });
          }
        }
      });
    },
    async getDealTeamListByScreenFn() {
      const that = this;
      const res = await getDealTeamListByScreen({
        id: that.formData.peopleId,
      });
      if (res.success) {
        that.checkedList = res.data;
        that.checkedList.map((item, index) => {
          if (item.allMemberList && item.allMemberList.length) {
            item.allMemberList.map((item2, index2) => {
              item2.checked = item.checked;
              item2.teamId = item.id;
            });
          }
        });
        console.log(that.checkedList, "小组列表");
      }
    },
    // 取消
    cancel() {
      const that = this;
      that.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.earlywarningClass {
  padding: 0 5vw;
  .earlywarningClass_header {
    margin: 2vh 0;
  }
  .earlywarningClass_line {
    margin: 3vh 0;
    .earlywarningClass_checkbox {
    }
  }
  .earlywarningClass_textarea {
    border: 1px solid #e6e6e6;
    height: 15vh;
    textarea {
      width: 100%;
      height: 100%;
    }
  }
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
      margin: 2vh 1vh 3vh 1vh;
      line-height: 5vh;
      display: inline-block;
    }
  }
}
</style>