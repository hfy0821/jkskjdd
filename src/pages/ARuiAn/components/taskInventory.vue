<template>
  <div>
    <!-- 牵头单位 -->
    <div class="eventHand">
      <div class="header_icon"><span>任务明细</span></div>
      <div class="eh_line">
        <p >
          <span>{{ missionDetail.missionRemark }}</span>
        </p>
      </div>
    </div>
    <!-- 协同单位 -->
    <div class="eventHand">
      <div class="header_icon"><span>督办等级</span></div>
      <div class="eh_line">
        <p class="inline">
          <span :class="`rect ${['green','yellow','red'][missionDetail.missionSuperviseLevel]}`"/>
          <span>{{ missionDetail.missionSuperviseLevelStr }}</span>
        </p>
      </div>
    </div>
    <!-- 时间限定 -->
    <div class="eventHand">
      <div class="header_icon"><span>时间限定</span></div>
      <div
        class="eh_line"
      >
        <p>{{missionDetail.missionTimeLimitDescriptionRow1}}</p>
        <p>{{missionDetail.missionTimeLimitDescriptionRow2}}</p>
      </div>
    </div>
    <!-- 任务反馈 -->
    <!-- <div v-if="missionDetail.dealProcess" class="eventHand">
      <div class="header_icon"><span>任务反馈</span></div>
      <div
        class="eh_line"
        v-for="(item, index) in missionDetail.dealProcess"
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
    </div> -->
  </div>
</template>
<script>
export default {
  props: ["missionDetail"],
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="less">
.inline{
  display: flex;
  .rect{
    flex: 0 0 60px;
    margin-right: 12px;
    &.green{
      background: #0ab408;
    }
    &.red{
      background: #f15627;
    }
    &.yellow{
      background: #f0ad4e;
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
  padding-bottom: 2vh;
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
}
</style>
