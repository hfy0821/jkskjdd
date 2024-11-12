<template>
  <div>
    <div class="eventHand">
      <div class="header_icon"><span>包案类型</span></div>
      <div class="eh_line">
        <p>{{missionDetail.isImportantEventDescription}}</p>
      </div>
    </div>
    <div class="eventHand">
      <div class="header_icon"><span>包案领导</span></div>
      <div class="eh_line">
        <p v-for="item in missionDetail.caseLeaderNameList">{{item}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["missionDetail"],
  data() {
    return {
      radio: 1,
    };
  },
  created() {},
  methods: {
    radioChange() {
      console.log(this.radio);
    },
  },
};
</script>
<style scoped lang="less">
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
  padding-bottom: 2vh;
  .eh_line {
    padding: 1vh 5vw;
    > p {
      margin-bottom: 1vh;
    }
  }
}
</style>
 <style >
.van-radio {
  padding: 1vh 0;
}
.van-radio__icon {
  font-size: 26px;
}
</style>
