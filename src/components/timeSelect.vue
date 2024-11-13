<template>
  <!-- 日期选择组件 可指定选择范围 -->
  <div class="calendar" :style="`width:${Width}`">
    <van-field
      :label="title"
      v-model="date"
      right-icon="arrow-down"
      readonly
      @click="show = true"
      :placeholder="placeholder"
      class="input_select"
    />
    <!-- 日期选择器 -->
    <van-calendar
      safe-area-inset-bottom
      v-model="show"
      color="#1989fa"
      type="range"
      @confirm="onConfirm"
      :min-date="minDate"
      :max-date="maxDate"
      :default-date="timeInterval()"
      ref="myCalendar"
    >
      <template slot="footer">
        <div class="footer">
          <span class="footerBtn" @click="clearTimeAll">清除时间</span>
          <span class="footerBtn" @click="onConfirmAll">确认</span>
        </div>
      </template>
    </van-calendar>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  components: {},
  props: {
    /*  可以不用传  用来展示左侧的文案  为空则不展示文案*/
    title: {
      type: String,
      default: ''
    },
    /* 传过来的默认值 */
    defaultData: {
      type: String
      // default:'请选择'
    },
    placeholder: {
      type: String,
      default: '请选择时间区间'
    },
    // 宽度
    Width: {
      type: String
    }
  },
  data() {
    return {
      date: this.defaultData ? this.defaultData : '', // 先判断有没有默认值 有就用没有就为空
      show: false,
      // 日期区间
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2025, 12, 31),

      // 当前日期
      currentDate: new Date().getDate()
    }
  },
  computed: {},
  watch: {
    // 监听到需要重新赋值
    defaultData(newValue) {
      this.date = newValue
    }
  },
  created() {
    // 处理默认值 如果有默认值直接赋值
    if (this.defaultData) {
      this.date = this.defaultData
    }
  },
  mounted() {},
  methods: {
    /* 日期区间 当前自动选择的日期区间 ：取当天到月底   返回的是一个数组*/
    timeInterval() {
      let new_year = new Date().getFullYear()
      let new_month = new Date().getMonth() + 1
      let new_date = new Date(new_year, new_month, 1) //取当年当月中的第一天
      let end = new Date(new_date.getTime() - 1000 * 60 * 60 * 24) //取最后一天
      return [new Date(), end]
    },

    /* 确认选择 组件自带的事件 */
    onConfirm(date) {
      const [start, end] = date
      // debugger
      this.show = false
      this.date = `${this.formatDate(start)} 至 ${this.formatDate(end)}`
      // 传给父组件 以此来请求数据
      this.$emit(
        'dateFun',
        `${this.formatDate(start)}`,
        `${this.formatDate(end)}`
      )
    },

    /* 确认按钮 */
    onConfirmAll() {
      // 直接调用上面的方法
      if (this.$refs.myCalendar) {
        this.$refs.myCalendar.onConfirm()
      } else {
        console.warn('myCalendar实例没有获取到')
      }
    },

    /* 清除时间 时间置空*/
    clearTimeAll() {
      this.date = ''
      this.show = false
      this.$emit('dateFun', ``, ``)
    },
    /* 转换时间 */
    formatDate(date) {
      // 给日期补0
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    }
  }
}
</script>

  
<style scoped lang="less">
// 覆盖 van-field的样式
/deep/ .van-calendar {
  .van-calendar__header-subtitle {
    height: 60px;
    line-height: 60px;
    font-size: 30px !important;
  }
  .van-cell {
    padding: 12px 12px;
    border-radius: 10px;
    border: 1px solid #f3f3f3;
  }
  .van-calendar__header-title {
    font-size: 30px !important;
  }
  .van-calendar__weekdays {
    height: 30px !important;
  }
  .van-calendar__weekday {
    font-size: 30px !important;
  }
  .van-calendar__day {
    font-size: 30px !important;
  }
  .van-calendar__month-title {
    font-size: 30px !important;
  }
  .van-calendar__bottom-info {
    display: none !important;
  }
  .van-field__right-icon {
    margin-right: 0;
    padding: 0;
    color: #1457f0;
    text-align: center;
  }
}

/deep/ .van-field__control {
  font-size: 28px !important;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 底部自定义按钮的样式
  .footerBtn {
    border-radius: 4px;
    background: #409eff;
    color: #fff;
    width: 100%;
    text-align: center;
    line-height: 70px;
    height: 70px;
    margin: 20px 20px;
  }
}

.input_select {
}
</style>

