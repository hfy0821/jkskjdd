(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d581177"],{9583:function(t,s,a){},c460:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"person_warp"},[s("div",{staticClass:"listBut"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"listBtn",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}}),s("span",{staticClass:"listSize",on:{click:function(s){return t.changeserch()}}},[t._v("搜索")])]),this.listData.length>0?s("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"listClass",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},[s("span",{staticClass:"person_title"},[t._v("一共检索到"),s("span",[t._v(t._s(this.listData.length))]),t._v("位人员")]),t._l(t.listData,(function(a,e){return s("li",{key:e,staticClass:"listClass_li"},[s("div",{staticClass:"li_content"},[s("div",{staticClass:"li_content_name"},[t._v(t._s(a.name))]),s("div",{staticClass:"li_content_bottom"},[t._v(" 性别:  "+t._s(1==a.sex?"男":2==a.sex?"女":"")+" ")]),s("div",{staticClass:"li_content_bottom"},[t._v(" 出生:  "+t._s(a.birthday)+" ")]),s("div",{staticClass:"li_content_bottom"},[t._v(" 地址:  "+t._s(a.address)+" ")]),s("div",{staticClass:"li_content_citizenId"},[t._v(" 公民身份号码:  "+t._s(a.cardId)+" ")]),s("div",{staticClass:"li_btn"},[s("span",{on:{click:function(s){return t.relevance(e)}}},[t._v("关联")])])])])})),t.noMore?t._e():s("li",{staticClass:"loadMoreClass"},[s("i",{staticClass:"iconfont icon-Loading"}),t._v(" 加载中... ")]),t.noMore?s("li",{staticClass:"loadMoreClass"},[t._v("没有更多了...")]):t._e()],2):t._e(),this.listData.length>0?s("div",{staticClass:"btn"},[s("span",{on:{click:function(s){return t.add()}}},[t._v("新增")])]):t._e()])},i=[],n=(a("14d9"),a("c198")),l={data(){return{loading:!1,noMore:!1,listData:[],total:0,params:{pageNo:1,pageSize:10}}},computed:{},created(){const t=this;dd.enablePullToRefresh().then(s=>{t.getData()}).catch(t=>{dd.stopPullDownRefresh()}),t.getData()},methods:{async getData(){const t=this;t.noMore=!1;t.$route.query;const s=await Object(n["Ob"])({...t.params,name:this.name});s.success&&(t.listData=s.data,t.total=s.data.total,t.noMore=!0)},loadMore(){this.listData.length!==this.total&&(this.params.pageSize+=10,this.getData())},changeserch(){this.getData()},add(){this.$router.push("/zhezheng/cluesReport/personAdd")},relevance(t){const s=this;let a=s.$route.query;"add"==a.type&&dd.confirm({title:"温馨提示",message:"确定关联该人员吗？",buttonLabels:["取消","确定"]}).then(async e=>{1==e.buttonIndex&&s.$router.push({path:"/zhezheng/cluesReport/cluesAdd",query:{listData:s.listData[t],formData:a.formData,peoples:a.peoples}})}).catch(t=>{}),"edit"==a.type&&dd.confirm({title:"温馨提示",message:"确定关联该人员吗？",buttonLabels:["取消","确定"]}).then(async e=>{1==e.buttonIndex&&s.$router.push({path:"/zhezheng/cluesReport/cluesDetail",query:{id:a.detailId,listData:s.listData[t],edit:!0}})}).catch(t=>{})}}},o=l,c=(a("ce84"),a("2877")),r=Object(c["a"])(o,e,i,!1,null,"46b4e55a",null);s["default"]=r.exports},ce84:function(t,s,a){"use strict";a("9583")}}]);