// import search from './search/index.vue'
export default {
    name: "listComponent",
      components: {
    // search
  },
  data() {
    return {
      searchResult: [],
      newCheckList: [],
      isShowCheckList: false,
      searchKeyword: '',
      listData: this.data
    }
  },

  computed: {},
  created() {
    this.newCheckList = JSON.parse(JSON.stringify(this.checkList))
    this.isShowCheckList = false
    this.listData = this.data
  },
  methods: {
    handleClick(item) {
      if (this.props.multiple) {
        debugger
        let checkIds = this.newCheckList.map((t) => {
          return t[this.props.keyValue]
        })
        if (checkIds.indexOf(item[this.props.keyValue]) > -1) {
          this.newCheckList.splice(checkIds.indexOf(item[this.props.keyValue]), 1)
        } else {
          this.newCheckList.push(item)
        }
      } else {
        this.newCheckList = [item]
      }
      this.$forceUpdate()
    },
    //搜索
    confirmSearch(val) {
      if (val) {
        this.searchKeyword = val
        this.search(val)
      } else {
        this.listData = this.data
      }
    },
    search(keyword) {
      var that = this
      //配置搜索传参
      if (this.props.searchUrl && this.props.searchParams) {
        this.props.params[this.props.searchParams] = keyword
        this.$http.get(this.props.searchUrl, this.props.params ? this.props.params : {}).then(res => {
          this.listData = res.data.data
        })
      } else {
        //没有配置搜索传参,只搜索label
        let searchResult = []
        this.listData.map((item) => {
          if (item[that.props.label].indexOf(keyword) >= 0) {
            searchResult.push(item)
          }
        })
        this.listData = searchResult
      }
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
    comeBack() {
      this.newCheckList = JSON.parse(JSON.stringify(this.checkList))
      this.$emit('comeBack')
    }
  },
  props: {
    data: {
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
    searchIf: {
      type: Boolean,
      default: () => true
    },
    props: {
      type: Object,
      default: () => {
        return {
          keyValue: 'id',
          label: 'name',
          imgSrc: 'imgSrc',
          contentName: 'content',
          positionName: 'position',
          multiple: false, //多选
          max: 10000, //最大选择
          min: 0,
          searchUrl: null,
          searchParams: '',
          params: {}
        }
      }
    }
  },
}