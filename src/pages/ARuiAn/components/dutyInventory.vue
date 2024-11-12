<template>
  <div>
    <!-- 牵头单位 -->
    <div class="eventHand">
      <div class="header_icon"><span>牵头单位</span></div>
      <div class="eh_line">
        <p>{{ dutyDetail.hostUserDepartment.departmentName }}-{{ dutyDetail.hostUserDepartment.userName }}</p>
      </div>
    </div>
    <!-- 责任领导 -->
    <div class="eventHand">
      <div class="header_icon"><span>协同单位</span></div>
      <div class="eh_line">
        <p v-for="(item, index) in dutyDetail.mateUserDepartmentList" :key="index">
          {{ item.departmentName }} - {{item.userName}}
        </p>
      </div>
    </div>
    <!-- 责任人 -->
    <div class="eventHand">
      <div class="header_icon"><span>责任单位</span></div>
      <div class="eh_line">
        <p v-for="(item, index) in dutyDetail.responsibleUserDepartmentNameList" :key="index">
          {{ item }}
        </p>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
export default {
  props: ["dutyDetail"],
  data() {
    return {};
  },
  created() {},
  methods: {},
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
