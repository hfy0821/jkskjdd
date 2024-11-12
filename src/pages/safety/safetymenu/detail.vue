<template>
  <div class="entrance_warp">
    <div class="main">
      <!-- <div @click="handclick(0)">
        <img :src="require('assets/image/0.png')" alt="" />
        <h5>隐患上报</h5>
        <p>隐患信息上报</p>
      </div> -->
      <div
        v-for="(v, i) in list"
        :key="i"
        @click="handclick(v.number)"
        v-if="v.show"
      >
        <img :src="require('assets/image/' + v.number + '.png')" alt="" />
        <h5>{{ v.displayName }}</h5>
        <!-- <p>{{ list1[v.number] }}</p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "safetymenu",
  data() {
    return {
      list: [
        { number: 1, displayName: "平安暗访", show: true },
        { number: 2, displayName: "平安自查", show: true },
      ],
      rightData: "",
    };
  },
  created() {
    this.rightData = localStorage.getItem("rightData");
    console.log(this.rightFn("safeTeamwork:safeSelfCheck"), "llll");
    if (this.rightFn("teamwork:peaceIncident")) {
      this.list[0].show = true;
    } else {
      this.list[0].show = false;
    }
    // if (this.rightFn("safeTeamwork:safeSelfCheck")) {
    //   this.list[1].show = true;
    // } else {
    //   this.list[1].show = false;
    // }
  },
  methods: {
    rightFn(str) {
      return this.rightData.indexOf(str + ",") >= 0;
    },
    handclick(typeId) {
      if (typeId == 1) {
        this.$router.push("/safety/safetycheck");
      }
      if (typeId == 2) {
        this.$router.push("/safety/safetycheckself");
      }
    },
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
