<template>
  <div class="multiSelect">
    <van-popup
      @closed="multiSelectClose"
      v-model="multiSelect_show"
      closeable
      round
      position="bottom"
      style="height:50%;"
    >
      <van-checkbox-group v-model="multiSelect_value" icon-size="20px">
        <van-checkbox v-for="item in multiSelect_Data" :key="item.id" :name="item.id">{{item.name}}</van-checkbox>
      </van-checkbox-group>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: ["multiSelectData"],
  data() {
    return {
      multiSelect_show: true,
      multiSelect_Data:
        this.multiSelectData.data.length > 0 ? this.multiSelectData.data : [],
      multiSelect_value: this.multiSelectData.value
      // multiSelect_value:
      //   typeof this.multiSelectData.value == String
      //     ? this.multiSelectData.value.split(",")
      //     : typeof this.multiSelectData.value == Array
      //     ? this.multiSelectData.value
      //     : []
    };
  },
  created() {
    // if (this.multiSelectData.value) {
    // alert(JSON.stringify(this.multiSelect_value));
    // }
    // console.log(this.multiSelectData)
  },
  mounted() {},
  methods: {
    multiSelectClose() {
      let that = this;
      let nameArr = [];
      if (
        that.multiSelect_Data &&
        that.multiSelect_Data.length > 0 &&
        that.multiSelect_value &&
        that.multiSelect_value.length > 0
      ) {
        that.multiSelect_Data.map((item, index) => {
          that.multiSelect_value.map((item1, index1) => {
            if (item.id == item1) {
              nameArr.push(item.name);
            }
          });
        });
      }

      that.$emit("multiSelectClose", {
        data: that.multiSelect_value,
        status: false,
        nameArr: nameArr
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>