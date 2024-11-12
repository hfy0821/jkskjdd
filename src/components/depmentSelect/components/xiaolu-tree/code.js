import search from './search/index.vue'
/*
 *	已兼容h5和小程序端,其它端没测试过，估计问题不大，只需要改一下传值的方式
 * 
 *	如有问题可以加qq：122720267
 * 	
 *	使用该插件的朋友请给个好评，或者到git start一下
 *   git地址：https://github.com/LSZ579/xiaolu-tree-plugin.git
 *   插件市场地址： https://ext.dcloud.net.cn/plugin?id=2423
 * 
 */
export default {
  name: "treeComponent",
  data() {
    return {
      isre: false,
      tree: Object.freeze(this.treeNone),
      newNum: 0,
      oldNum: 0,
      catchTreeNone: [...this.treeNone],
      tree_stack: [1],
      searchResult: [],
      newCheckList: JSON.parse(JSON.stringify(this.checkList)),
      scrollLeft: 999,
      nodePathArray: [],
      isShowCheckList: false,
      searchKeyword: ''
    }
  },
  components: {
    search
  },
  computed: {
    isSelect() {
      return (item) => {
        const checkList = this.newCheckList
        if (checkList.length == 0) {
          this.props.checkStrictly ? (item.bx = 0, item.qx = 0) : ''
          return false
        }
        const i = checkList.findIndex(e => {
          return item[this.keyCode] == e[this.keyCode]
        }) > -1
        return i && !item.qx
      }
    },
    radioSelect() {
      const list = this.newCheckList
      return (item) => {
        return list.length > 0 && item[this.keyCode] == list[0][this.keyCode]
      }
    },
    keyCode() {
      return this.props.keyValue
    }
  },
  created() {
    this.Init()
  },
  methods: {
    // 初始化
    Init() {
      if (this.newCheckList.length !== 0) {
        let {
          tree_stack,
          props,
          catchTreeNone,
          newCheckList
        } = this
        if (props.multiple) {
          if (props.checkStrictly) {
            this.checkAllChoose();
          }
        } else {
          this.getNodeRoute(catchTreeNone, newCheckList[0][this.keyCode])
          let arr = this.nodePathArray.reverse()
          console.log(arr)
          if (arr.length == 0) return
          this.tree_stack = tree_stack.concat(arr);
          this.tree = this.tree_stack[this.tree_stack.length - 1][this.props.childrenValue];
        }
      }
    },
    // 点击项目处理
    handleClick(item, index) {
      let children = item[this.props.childrenValue]
      if (index > -1 && children && children.length > 0) {
        // 打开下一级
        this.toChildren(item)
      } else if (this.props.multiple) {
        // 多选 -- 永远没有
        this.checkboxChange(item, index, item.bx, item.qx)
      } else {
        // 选中数据
        this.checkbox(item, index)
      }
    },
    // 获取路径
    getPath() {
      const {
        keyCode,
        tree_stack,
        props
      } = this
      const path = [...tree_stack].map(e => {
        const item = Object.assign({}, e)
        delete item[props.childrenValue]
        return item
      })
      return path.slice(1, path.length) || []
      },
    
    //多选
    async checkboxChange(item, index, bx, qx) {
      let that = this;
      const {
        props
      } = that
      if (!props.multiple) return;
      let findIdex = that.newCheckList.findIndex(e => item[this.keyCode] == e[this.keyCode]);
      const path = this.getPath()
      if (findIdex > -1) { //反选
        if (props.checkStrictly) { //关联子级
          if (item[props.userValue]) { //用户
            that.newCheckList.splice(findIdex, 1)
          } else { //非用户，取消所有下一级
            that.getIdBydelete(item[props.childrenValue])
          }
        } else {
          that.newCheckList.splice(findIdex, 1)
        }
      } else { //选中
        if (!item[props.userValue] && props.checkStrictly) { //选中下一级
          if (qx || bx) { //取消下级
            await that.getIdBydelete(item[this.props.childrenValue]);
            item.qx = 0;
            item.bx = 0;
          } else {
            // item[props.childrens].length+
            item.qx = 1;
            item.bx = 0;
            let id = item[props.keyValue];
            let name = item[props.label];
            let user = item[props.userValue];
            const newObj = {}
            newObj[props.keyValue] = id
            newObj[props.label] = name
            newObj[props.userValue] = user
            const pathList = this.tree_stack.length === 1 ? [newObj, ...path] : [...path, newObj]
            await that.chooseChild(item[this.props.childrenValue], pathList);
          }
          this.$forceUpdate()
          return
        }
        that.newCheckList.push({
          ...item,
          path
        });
      }
    },
    // 取消下一级的选中
    getIdBydelete(arr) {
      arr.forEach(e => {
        if (e[this.props.userValue]) {
          for (var i = 0; i < this.newCheckList.length; i++) {
            if (e[this.keyCode] == this.newCheckList[i][this.keyCode]) {
              this.newCheckList.splice(i, 1)
              break;
            }
          }
        } else {
          this.getIdBydelete(e[[this.props.childrenValue]])
        }
      })
    },

    // 关联下一级,选中
    chooseChild(arr, path) {
      let that = this;
      const oldPath = [...path]
      for (var i = 0, len = arr.length; i < len; i++) {
        let item = arr[i];
        if (item[this.props.userValue]) {
          that.newCheckList.push({
            ...item,
            path: oldPath
          })
        } else {
          const newItem = {
            ...item
          }
          delete newItem[that.props.childrenValue]
          const newPath = [...oldPath, newItem]
          that.chooseChild(item[that.props.childrenValue], newPath)
        }
      }
    },

    // (tree为目标树，targetId为目标节点id) 
    getNodeRoute(tree, targetId) {
      for (let index = 0; index < tree.length; index++) {
        if (tree[index][this.props.childrenValue]) {
          let endRecursiveLoop = this.getNodeRoute(tree[index][this.props.childrenValue], targetId)
          if (endRecursiveLoop) {
            this.nodePathArray.push(tree[index])
            return true
          }
        }
        if (tree[index][this.keyCode] === targetId) {
          return true
        }
      }
    },

    //单选
    checkbox(item, index) {
      const path = this.getPath()
      this.$set(this, 'newCheckList', [{
        ...item,
        path
      }])
    },

    //到下一级
    toChildren(item) {
      if (item[this.props.userValue]) return
      var that = this;
      uni.showLoading({
        title: '加载中'
      })
      let children = that.props.childrenValue;
      if (!item[this.props.userValue] && item[children].length > 0 && !(that.tree_stack[0][this.keyCode] == item[this.keyCode])) {
        that.tree = item[children];
        that.tree_stack.push(item);
      }
      this.$nextTick(() => {
        uni.hideLoading()
        this.scrollLeft += 200;
      })
      if (this.props.checkStrictly) this.checkAllChoose();
    },

    //搜索
    confirmSearch(val) {
      this.searchKeyword = val
      this.searchResult = []
      this.search(this.catchTreeNone, val)
      this.isre = true
      this.tree_stack.splice(1, 1000)
      uni.showLoading({
        title: '正在查找'
      })
      setTimeout(() => {
        this.tree = this.searchResult
        uni.hideLoading()
      }, 300)
    },
    search(data, keyword) {
      var that = this
      let children = that.props.childrenValue
      let user = that.props.userValue
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i][that.props.label].indexOf(keyword) >= 0) {
          that.searchResult.push(data[i])
        }
        if (!data[i][user] && data[i][children].length > 0) {
          that.search(data[i][children], keyword)
        }
      }
    },
    handelSearch(val) {
      let startIndex = -1
      startIndex = val.indexOf(this.searchKeyword)
      let htmlStr = ''
      if (startIndex == 0) {
        // htmlStr += "<span  style='color: red'>" + val.substr(startIndex, this.searchKeyword.length) + "</span>"
        htmlStr += "<span>" + val.substr(startIndex, this.searchKeyword.length) + "</span>"
        htmlStr += "<span>" + val.substr(startIndex + this.searchKeyword.length) + "</span>"
      } else if (startIndex > 0) {
        htmlStr += "<span>" + val.substr(0, startIndex) + "</span>"
        // htmlStr += "<span style='color: red'>" + val.substr(startIndex, this.searchKeyword.length) + "</span>"
        htmlStr += "<span>" + val.substr(startIndex, this.searchKeyword.length) + "</span>"
        htmlStr += "<span>" + val.substr(startIndex + this.searchKeyword.length) + "</span>"
      } else {
        htmlStr += "<span>" + val + "</span>"
      }
      return htmlStr
    },
    checkAllChoose() {
      let o = false,
        t = true;
      this.tree.forEach((e, i) => {
        if (!e[this.props.userValue]) {
          e.qx = o;
          e.bx = o;
          this.computAllNumber(e[this.props.childrenValue]);
          // console.log(this.newNum,this.oldNum)
          if (this.newNum != 0 && this.oldNum != 0) {
            if (this.newNum == this.oldNum) {
              e.qx = t;
              e.bx = o;
            } else {
              e.qx = o;
              e.bx = t;
            }
          }
          if (this.newNum != 0 && this.oldNum == 0) {
            this.$set(this.tree[i], 'bx', o);
            this.$set(this.tree[i], 'qx', o);
          }
          this.$forceUpdate()
          this.newNum = 0
          this.oldNum = 0
        }
      })
    },

    computAllNumber(arr) {
      for (let j = 0; j < arr.length; j++) {
        var e = arr[j];
        this.checkSum(e[this.keyCode])
        if (e[this.props.userValue]) {
          this.newNum++;
        } else {
          this.computAllNumber(e[this.props.childrenValue])
        }
      }
    },

    checkSum(id) {
      for (let i = 0; i < this.newCheckList.length; i++) {
        if (id == this.newCheckList[i][this.keyCode]) {
          this.oldNum++;
          break
        }
      }
    },

    //返回其它层
    backTree(item, index) {
      let that = this,
        tree_stack = that.tree_stack,
        max = 10000;
      if (index === -1) {
        that.tree = that.catchTreeNone
        that.tree_stack.splice(1, max)
        that.isre = false
        that.$refs.sea.clears()
      } else if (index === -2) {
        that.tree = that.searchResult
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
        that.tree = item[that.props.childrenValue]
      }
      if (this.props.checkStrictly) this.checkAllChoose();
      this.$forceUpdate()
    },
    backConfirm() {
      if (this.props.multiple && this.newCheckList.length > this.props.max) {
        uni.showToast({
          icon: 'none',
          title: "最多选择" + this.props.max + "个"
        })
        return
      } else {
        if (this.props.multiple && this.props.min && this.newCheckList.length < this.props.min) {
          uni.showToast({
            icon: 'none',
            title: "请至少选择" + this.props.min + "个"
          })
          return
        } else {
          this.$emit('sendValue', this.newCheckList, 'back')
        }
      }
    },
    changeCheckList() {
      this.isShowCheckList = !this.isShowCheckList
    },
    handelResult(result) {
      //处理回显数据格式
      let showName = ''
      let completeName = ''
      if (Array.isArray(result.path) && result.path.length > 0) {
        result.path.map((item01) => {
          completeName += item01[this.props.label] + '-'
        })
      }
      showName += completeName + result[this.props.label]
      return showName
    },
    comeBack() {
      this.newCheckList = JSON.parse(JSON.stringify(this.checkList))
      this.$emit('comeBack')
    }
  },
  props: {
    treeNone: {
      type: Array,
      default: () => {
        return []
      }
    },
    //是否开启选中
    isCheck: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    checkList: {
      type: Array,
      default: () => []
    },
    parentList: {
      type: Array,
      default: () => []
    },
    searchIf: {
      type: Boolean,
      default: () => true
    },
    // keyValue: {
    // 	type: String,
    // 	default: 'id',
    // },
    props: {
      type: Object,
      default: () => {
        return {
          keyValue: 'id',
          label: 'name',
          childrenValue: 'children',
          userValue: 'user',
          multiple: false, //多选
          checkStrictly: false, //不关联
          max: 10000, //最大选择
          min: 0, //必选个数
          nodes: true, //单选有效，是否只能选子节点
        }
      }
    }
  },
}