(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d6d0065"],{"04b9":function(t,e,a){"use strict";var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"multiSelectOdd"},[e("van-popup",{staticStyle:{height:"50%"},attrs:{round:"",position:"bottom"},on:{closed:t.multiSelectOddReturn_},model:{value:t.multiSelect_show,callback:function(e){t.multiSelect_show=e},expression:"multiSelect_show"}},[e("div",{staticClass:"multiSelectOdd_content"},[e("div",{staticClass:"multiSelectOdd_content_div"},[e("p",{staticClass:"multiSelectOdd_content_line0"},[t._v("请选择")]),t._l(t.list,(function(a){return e("p",{key:a.name,staticClass:"multiSelectOdd_content_line",on:{click:function(e){return t.multiSelectOddReturn(a)}}},[t._v(t._s(a.name))])}))],2),e("div",{staticClass:"close"},[e("div",{staticStyle:{height:"10px",background:"#e6e6e6","margin-bottom":"15px"}}),e("div",{on:{click:t.multiSelectOddReturn_}},[t._v("取消")])])])])],1)},n=[],o={props:["multiSelectOddData","name"],data(){return{multiSelect_show:!0,list:this.multiSelectOddData,name:this.name?this.name:"选择所属街道？",multiSelectOddObj:{status:!1,id:"",name:""}}},created(){},mounted(){},methods:{multiSelectOddReturn_(){let t=this;t.$emit("multiSelectOddReturn",{status:!1})},multiSelectOddReturn(t){let e=this;e.multiSelectOddObj.name=t.name,e.multiSelectOddObj.id=t.id,e.$emit("multiSelectOddReturn",e.multiSelectOddObj)}}},s=o,l=(a("67f9"),a("2877")),c=Object(l["a"])(s,i,n,!1,null,"4493de27",null);e["a"]=c.exports},"4f02":function(t,e,a){"use strict";a("d3a6")},"67f9":function(t,e,a){"use strict";a("f9eb")},"6bfc":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"reportedAdd_warp multiSelectClass"},[e("div",{staticClass:"form",class:t.edit?"":"unclick"},[e("div",{staticClass:"item"},[e("p",{class:t.formData.title?"active":""},[t._v("事件名称")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.title,expression:"formData.title",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"在此输入事件名称"},domProps:{value:t.formData.title},on:{input:function(e){e.target.composing||t.$set(t.formData,"title",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),e("div",{staticClass:"item"},[e("p",{class:t.formData.earlyWarningLevel?"active":""},[t._v("事件等级")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.earlyWarningLevelName,expression:"formData.earlyWarningLevelName",modifiers:{trim:!0}}],attrs:{type:"text",readonly:"",placeholder:"点击选择事件等级"},domProps:{value:t.formData.earlyWarningLevelName},on:{click:t.selectWarningLevel,input:function(e){e.target.composing||t.$set(t.formData,"earlyWarningLevelName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),e("div",{staticClass:"item"},[e("p",{class:t.formData.roadName?"active":""},[t._v("所属街道")]),e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.roadName,expression:"formData.roadName"}],attrs:{readonly:"",type:"text",placeholder:"点击选择所属街道"},domProps:{value:t.formData.roadName},on:{click:t.selectStreet,input:function(e){e.target.composing||t.$set(t.formData,"roadName",e.target.value)}}})])]),e("div",{staticClass:"item"},[e("p",{class:t.formData.actionName?"active":""},[t._v("现实行为")]),e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.actionName,expression:"formData.actionName"}],attrs:{readonly:"",type:"text",placeholder:"点击选择现实行为"},domProps:{value:t.formData.actionName},on:{click:t.selectBehave,input:function(e){e.target.composing||t.$set(t.formData,"actionName",e.target.value)}}})])]),e("div",{staticClass:"item"},[e("p",{class:t.formData.incidentTime?"active":""},[t._v("事发时间")]),e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.incidentTime,expression:"formData.incidentTime"}],attrs:{readonly:"",type:"text",placeholder:"事发时间"},domProps:{value:t.formData.incidentTime},on:{click:t.selectTime,input:function(e){e.target.composing||t.$set(t.formData,"incidentTime",e.target.value)}}})])]),e("div",{staticClass:"item"},[e("p",{class:t.formData.eventName&&t.formData.eventName.length?"active":""},[t._v(" 事件类别 ")]),e("div",[e("input",{attrs:{readonly:"",type:"text",placeholder:"点击选择事件类别"},domProps:{value:t.formData.eventName},on:{click:t.selectEventType}}),t.multiSelectShow?e("multiSelect",{attrs:{multiSelectData:{data:t.eventList,value:t.formData.eventTypes}},on:{multiSelectClose:t.multiSelectComponent}}):t._e()],1)]),e("div",{staticClass:"item"},[e("p",{class:t.formData.incidentAddress?"active":""},[t._v("所属地点")]),e("div",{staticClass:"address"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.incidentAddress,expression:"formData.incidentAddress"}],attrs:{type:"text",placeholder:"点击选择所属地点"},domProps:{value:t.formData.incidentAddress},on:{input:function(e){e.target.composing||t.$set(t.formData,"incidentAddress",e.target.value)}}}),e("i",{staticClass:"iconfont icon-location",on:{click:t.selectAddress}})])]),e("div",{staticClass:"item"},[e("p",{class:t.formData.remark?"active":""},[t._v("补充地址")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.remark,expression:"formData.remark",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"在此输入补充地址"},domProps:{value:t.formData.remark},on:{input:function(e){e.target.composing||t.$set(t.formData,"remark",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),e("div",{staticClass:"item incidentContent"},[e("p",{class:t.formData.incidentContent?"active":""},[t._v("事件描述")]),e("div",[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.incidentContent,expression:"formData.incidentContent",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"在此输入事件描述"},domProps:{value:t.formData.incidentContent},on:{input:function(e){e.target.composing||t.$set(t.formData,"incidentContent",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),t.id?t._e():e("div",{staticClass:"item"},[e("p",{class:t.formData.aaa?"active":""},[t._v("附件上传")]),e("ul",{staticClass:"file"},t._l(t.files,(function(a,i){return e("li",{key:i},[e("span",[t._v(t._s(a.fileName))]),e("i",{staticClass:"iconfont icon-cha2",on:{click:function(e){return t.delFile(i)}}})])})),0),e("button",[t._v(" 上传 "),e("input",{attrs:{multiple:"",type:"file",name:"",id:""},on:{change:t.fileChange}})])])]),e("div",[t.multiSelectOddShow?e("multiSelectOdd",{attrs:{multiSelectOddData:t.streetList},on:{multiSelectOddReturn:t.multiSelectOddReturn}}):t._e()],1),e("div",{staticClass:"endHolder"}),e("div",{staticClass:"btn"},[t.id?t._e():e("span",{on:{click:function(e){return t.handClick(1)}}},[t._v("上报")]),e("i",{directives:[{name:"show",rawName:"v-show",value:!t.edit&&t.id,expression:"!edit && id"}],on:{click:function(e){return t.del()}}},[t._v("删除")]),e("b",{directives:[{name:"show",rawName:"v-show",value:!t.edit&&t.id,expression:"!edit && id"}],on:{click:function(e){t.edit=!0}}},[t._v("编辑")]),e("i",{directives:[{name:"show",rawName:"v-show",value:t.edit&&t.id,expression:"edit && id"}],on:{click:t.cancel}},[t._v("取消")]),e("b",{directives:[{name:"show",rawName:"v-show",value:t.edit&&t.id,expression:"edit && id"}],on:{click:function(e){return t.handClick(1)}}},[t._v("保存")])])])},n=[],o=(a("14d9"),a("6e53")),s=a("04b9"),l=a("c198"),c={name:"reportedAdd",components:{multiSelect:o["a"],multiSelectOdd:s["a"]},data(){return{multiSelectOddShow:!1,multiSelectShow:!1,id:this.$route.query.id,index:[],edit:!0,warningLevel:["一般","黄色","橙色","红色"],formData:{authType:1,handType:0,isTeamWork:1,teamworkType:5,sourceType:117,reportId:JSON.parse(localStorage.getItem("userInfo")).id,title:"",eventName:"",eventTypes:"",actionName:"",actionType:"",roadName:"",roadId:"",incidentAddress:"",incidentContent:"",remark:"",incidentTime:"",earlyWarningLevel:"",earlyWarningLevelName:"",handleFilesListStr:""},files:[],typeSelectOption:[]}},computed:{streetList(){return this.$store.state.common.streetList},streetOption(){return this.$store.state.common.streetList.map(t=>t.name)}},async created(){if(dd.disablePullToRefresh().then(t=>{}).catch(t=>{}),this.id){document.title="事件详情";const t=await Object(l["bb"])(this.$route.query);t.success&&(this.formData=t.data.sourceData,this.formData.earlyWarningLevelName="number"===typeof this.formData.earlyWarningLevel&&this.warningLevel[this.formData.earlyWarningLevel])}const[t,e]=await Promise.all([Object(l["Bb"])({type:12}),Object(l["Bb"])({type:13})]);t.success&&(this.actionList=t.data,this.actionOption=this.actionList&&this.actionList.length&&this.actionList.map(t=>t.name)),e.success&&(this.eventList=e.data,this.eventOption=e.data&&e.data.length&&this.actionList.map(t=>t.name))},methods:{multiSelectComponent(t){let e=this;e.formData.eventTypes=t.data.length>0?t.data.join(","):"",e.multiSelectShow=t.status;let a=[];e.eventList.length>0&&t.data.length>0&&e.eventList.map((e,i)=>{t.data.map((t,i)=>{e.id==t&&a.push(e.name)})}),e.formData.eventName=a},selectEventType(){const t=this;t.formData.eventTypes=t.formData.eventTypes?t.formData.eventTypes.split(",").map(Number):[],setTimeout(()=>{t.multiSelectShow=!0},100)},selectBehave(){const t=this;dd.device.notification.actionSheet({title:"选择现实行为？",cancelButton:"取消",otherButtons:t.actionOption?t.actionOption:[],onSuccess:function(e){-1!==e.buttonIndex&&(t.formData.actionType=t.actionList[e.buttonIndex].id,t.formData.actionName=t.actionList[e.buttonIndex].name)},onFail:function(t){}})},multiSelectOddReturn(t){let e=this;e.multiSelectOddShow=t.status,t.id&&(e.formData.roadId=t.id,e.formData.roadName=t.name)},selectStreet(){const t=this;t.multiSelectOddShow=!0},selectAddress(){const t=this;dd.locateOnMap({}).then(e=>{var a=e.province+e.city+e.adName+e.snippet;t.formData.incidentAddress=a;const i=GPS.gcj_decrypt(e.latitude,e.longitude);t.formData.x=i.lon,t.formData.y=i.lat}).catch(t=>{})},selectTime(){const t=this;dd.showDatePicker({format:"yyyy-MM-dd",value:t.formData.incidentTime}).then(e=>{t.formData.incidentTime=e.value}).catch(t=>{})},selectWarningLevel(){const t=this;dd.device.notification.actionSheet({title:"选择事件等级？",cancelButton:"取消",otherButtons:this.warningLevel,onSuccess:function(e){-1!==e.buttonIndex&&(t.formData.earlyWarningLevel=e.buttonIndex,t.formData.earlyWarningLevelName=["一般","黄色","橙色","红色"][e.buttonIndex])},onFail:function(t){}})},del(){},cancel(){this.$router.go(-1)},save(){},handClick(t){if(this.formData.authType=1,!this.formData.title)return void this.alert("请输入事件名称");if(!this.formData.roadId)return void this.alert("请选择请选择所属街道");if(!this.formData.incidentTime)return void this.alert("请选择事发时间");if(!this.formData.eventTypes.length)return void this.alert("请选择事件类别");if(!this.formData.incidentAddress)return void this.alert("请输入所属地点");if(!this.formData.incidentContent)return void this.alert("请输入事件描述");this.formData.handleFilesListStr=JSON.stringify(this.files);const e=this;dd.device.notification.confirm({message:e.id?"确定修改？":"确定上报？",title:"提示",buttonLabels:["取消","确定"],async onSuccess(t){t.buttonIndex&&dd.device.notification.showPreloader({text:"提交中..",showIcon:!0,async onSuccess(t){const a=await Object(l["Sb"])(e.formData);dd.device.notification.hidePreloader({onSuccess:function(t){},onFail:function(t){}}),a.success&&dd.alert({message:a.message?a.message:"操作成功",title:"提示",button:"收到"}).then(t=>{e.formData={authType:1,handType:0,isTeamWork:1,teamworkType:5,sourceType:117,reportId:JSON.parse(localStorage.getItem("userInfo")).id,title:"",eventName:"",eventTypes:"",actionName:"",actionType:"",roadName:"",roadId:"",incidentAddress:"",incidentContent:"",remark:"",incidentTime:"",earlyWarningLevel:"",earlyWarningLevelName:"",handleFilesListStr:""},e.$router.go(-1)}).catch(t=>{})},onFail:function(t){}})},onFail:function(t){}})},async fileChange(t){let e=new FormData;const a=[...t.target.files];if(a&&a.length){dd.device.notification.showPreloader({text:"文件上传中..",showIcon:!0,onSuccess(t){}}),a.forEach(t=>{e.append("file",t)}),e.append("rbacToken",localStorage.getItem("rbacToken"));const t=await Object(l["gc"])(e);dd.device.notification.hidePreloader({onSuccess:function(t){},onFail:function(t){}}),t.success&&t.data&&t.data.length&&t.data.forEach((t,e)=>{var i={};i.fileType=a[e].type,i.fileName=a[e].name,i.fileId=t,this.files.push(i)})}},delFile(t){this.files.splice(t,1)},alert(t){dd.device.notification.alert({message:t,title:"提示",buttonName:"确定"})}}},r=c,d=(a("4f02"),a("2877")),m=Object(d["a"])(r,i,n,!1,null,"7f43d303",null);e["default"]=m.exports},"6e53":function(t,e,a){"use strict";var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"multiSelect"},[e("van-popup",{staticStyle:{height:"50%"},attrs:{closeable:"",round:"",position:"bottom"},on:{closed:t.multiSelectClose},model:{value:t.multiSelect_show,callback:function(e){t.multiSelect_show=e},expression:"multiSelect_show"}},[e("van-checkbox-group",{attrs:{"icon-size":"20px"},model:{value:t.multiSelect_value,callback:function(e){t.multiSelect_value=e},expression:"multiSelect_value"}},t._l(t.multiSelect_Data,(function(a){return e("van-checkbox",{key:a.id,attrs:{name:a.id}},[t._v(t._s(a.name))])})),1)],1)],1)},n=[],o=(a("14d9"),{props:["multiSelectData"],data(){return{multiSelect_show:!0,multiSelect_Data:this.multiSelectData.data.length>0?this.multiSelectData.data:[],multiSelect_value:this.multiSelectData.value}},created(){},mounted(){},methods:{multiSelectClose(){let t=this,e=[];t.multiSelect_Data&&t.multiSelect_Data.length>0&&t.multiSelect_value&&t.multiSelect_value.length>0&&t.multiSelect_Data.map((a,i)=>{t.multiSelect_value.map((t,i)=>{a.id==t&&e.push(a.name)})}),t.$emit("multiSelectClose",{data:t.multiSelect_value,status:!1,nameArr:e})}}}),s=o,l=a("2877"),c=Object(l["a"])(s,i,n,!1,null,"7855c86c",null);e["a"]=c.exports},d3a6:function(t,e,a){},f9eb:function(t,e,a){}}]);