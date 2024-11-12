<template>
  <div class="new_list_max_box">
    <div class="head_box">
      <span style="margin: 2.5%" @click="comeBack()">返回</span>
      <!-- <van-search
        shape="round"
        placeholder="请输入搜索关键词"
        v-model="searchValue"
        style="width: 85%"
      /> -->
    </div>

    <div class="head_cascade_box" v-if="componeType == 'depment'">
      <div class="cascade_item_box">
        <div
          class="cascade_item_style"
          :class="tree_stack.length == 0 ? '' : 'cascade_item_style_select'"
          @click="backTree(basicTreeList, -1, tree_stack.length - 1 == idx)"
        >
          全部
        </div>
        <div
          class="cascade_item_style"
          v-for="(item, idx) in tree_stack"
          :key="idx"
          @click="backTree(item, idx, tree_stack.length - 1 == idx)"
        >
          <span style="font-size: 18px">></span>
          <div
            :class="
              tree_stack.length - 1 == idx ? '' : 'cascade_item_style_select'
            "
          >
            {{ item[props.label || name] }}
          </div>
        </div>
      </div>
    </div>

    <div class="container_list" v-if="componeType == 'depment'">
      <div
        v-for="(item, idx) in depmentTreeList"
        :key="idx"
        class="list_item"
        @click="handleClick(item, idx, 1)"
      >
        <span :style="radioSelect(item) ? { color: '#1890FF !important' } : {}">
          {{ item.name }}
        </span>
        <span
          v-if="!item[props.userValue] && item[props.childrenValue].length > 0"
          style="font-size: 30px; line-height: 25px; color: gray"
          @click.stop="handleClick(item, idx, 2)"
          >></span
        >
      </div>
    </div>

    <div class="container_list" v-else>
      <div
        v-for="(item, idx) in depmentTreeList"
        :key="idx"
        class="list_item_2"
        @click="handleClick2(item)"
        :style="
          radioSelect(item) ? { backgroundColor: '#e6f7ff !important' } : {}
        "
      >
        <span>
          {{ item.name }}
        </span>
      </div>
    </div>

    <div class="but_box">
      <div class="but_style" style="width: 100%" @click="backConfirm()">
        确 认
      </div>
    </div>
  </div>
</template>

<script>
import { treeNode } from './data.js'
export default {
  props: {
    componeType: {
      type: String,
      default: 'depment'
    },
    muitiple: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      idx:0,
      basicTreeList:[],
      searchValue: '',
      depmentTreeList: this.dataList, // 数据列表
      catchTreeNone: this.dataList, // 原始数组
      tree_stack: [], // 头部 上一级内容 列表
      newCheckList: [],
      keyCode: 'id',
      props: {
        childrenValue: 'children',
        userValue: 'user', // 无用
        label: 'name', // lable name
        keyValue: 'id'
      }
    }
  },
  methods: {
    // 点击项目处理
    handleClick(item, index, type) {
      let children = item[this.props.childrenValue]
      if (index > -1 && children && children.length > 0 && type == 2) {
        // 打开下一级
        this.toChildren(item)
      } else {
        // 选中数据
        this.checkbox(item, index)
      }
    },

    //到下一级
    toChildren(item) {
      if (item[this.props.userValue]) return
      var that = this
      let children = that.props.childrenValue
      if (
        !item[this.props.userValue] &&
        item[children].length > 0
        //   &&
        // !(that.tree_stack[0][this.props.label] == item[this.props.label])
      ) {
        that.depmentTreeList = item[children]
        that.tree_stack.push(item)
      }

      if (this.props.checkStrictly) this.checkAllChoose()
    },

    //单选
    checkbox(item, index) {
      const path = this.getPath()
      this.$set(this, 'newCheckList', [
        {
          ...item,
          path
        }
      ])
    },

    // 人员的无下一级的 选中
    handleClick2(item) {
      if (this.muitiple) {
        let checkIds = this.newCheckList.map((t) => {
          return t[this.props.keyValue]
        })

        if (checkIds.indexOf(item[this.props.keyValue]) > -1) {
          this.newCheckList.splice(
            checkIds.indexOf(item[this.props.keyValue]),
            1
          )
        } else {
          this.newCheckList.push(item)
        }
      } else {
        this.newCheckList = [item]
      }
      this.$forceUpdate()
    },

    radioSelect(item) {
      const list = this.newCheckList
      if (this.muitiple) {
        let flag = false
        list.map((res) => {
          if (res[this.keyCode] == item[this.keyCode]) {
            flag = true
          }
        })
        return flag
      } else {
        return list.length > 0 && item[this.keyCode] == list[0][this.keyCode]
      }
    },

    // 获取路径
    getPath() {
      const { keyCode, tree_stack, props } = this
      const path = [...tree_stack].map((e) => {
        const item = Object.assign({}, e)
        delete item[props.childrenValue]
        return item
      })
      return path.slice(1, path.length) || []
    },

    //返回其它层
    backTree(item, index, flag) {
      if (flag) {
        return
      }
      let that = this,
        tree_stack = that.tree_stack,
        max = 10000
      if (index === -1) {
        that.depmentTreeList = that.catchTreeNone
        that.tree_stack.splice(0, max)
        that.isre = false
        that.$refs.sea.clears()
      } else if (index === -2) {
        that.depmentTreeList = that.searchResult
        that.tree_stack.splice(1, max)
      } else {
        if (tree_stack.length - index > 2) {
          tree_stack.forEach((item, i) => {
            if (i > index) {
              that.tree_stack.splice(i, max)
            }
          })
        } else if (index !== tree_stack.length - 1) {
          that.tree_stack.splice(tree_stack.length - 1, 1)
        }
        that.depmentTreeList = item[that.props.childrenValue]
      }
      //   if (this.props.checkStrictly) this.checkAllChoose()
      this.$forceUpdate()
    },

    // 返回信息
    backConfirm() {
      if (this.props.multiple && this.newCheckList.length > this.props.max) {
        uni.showToast({
          icon: 'none',
          title: '最多选择' + this.props.max + '个'
        })
        return
      } else {
        if (
          this.props.multiple &&
          this.props.min &&
          this.newCheckList.length < this.props.min
        ) {
          uni.showToast({
            icon: 'none',
            title: '请至少选择' + this.props.min + '个'
          })
          return
        } else {
          this.$emit('sendValue', this.newCheckList, 'back')
        }
      }
    },

    //关闭 模态框
    comeBack() {
      this.$emit('comeBack')
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.new_list_max_box {
  height: 100vh;
  width: 100%;
  // 头部框
  .head_box {
    display: flex;
    align-items: center;
    padding: 6px 6px 0px;
    color: #666666;
    font-size: 14px;
    border-bottom: 1px solid #f7f7f7;
  }

  .head_cascade_box {
    background-color: #f5f5f5;
    color: gray;
    padding: 12px 15px;
    overflow: auto;
    width: 100%;
    white-space: nowrap;
    .cascade_item_box {
      display: flex;
      padding: 10px 0px 12px;
      .cascade_item_style {
        margin-right: 8px;
        display: flex;
        align-items: center;
        font-size: 28px;
        > span {
          color: gray;
          margin-right: 8px;
          line-height: 20px;
          font-size: 22px;
        }
      }
      .cascade_item_style_select {
        color: #63a8ee !important;
      }
    }
  }

  .container_list {
    height: 83%;
    overflow: auto;
    .list_item {
      padding: 24px 24px;
      border-bottom: 1px solid #f7f7f7;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .list_item_2 {
      padding: 24px 10px;
      border-bottom: 1px solid #f7f7f7;
    }
  }

  .but_box {
    position: fixed;
    bottom: 0px;
    left: 1%;
    width: 98%;
    padding: 10px 0px;
    .but_style {
      background-color: #1989fa;
      color: white;
      text-align: center;
      padding: 15px 0px;
      border-radius: 8px;
    }
  }
}
</style>