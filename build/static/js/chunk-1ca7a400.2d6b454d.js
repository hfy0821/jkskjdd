(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ca7a400"],{"2c46":function(t,e,a){},"5cba":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"Equipment_detail"},[1==t.type?e("div",{staticClass:"form",class:t.edit?"":"unclick"},[e("div",{staticClass:"form_item"},[e("p",{class:t.formData.name?"active":""},[t._v("事件名称")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.name,expression:"formData.name",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"在此输入事件名称",readonly:""},domProps:{value:t.formData.name},on:{input:function(e){e.target.composing||t.$set(t.formData,"name",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.time?"active":""},[t._v("时间")]),e("input",{attrs:{type:"text",readonly:"",placeholder:"在此输入时间"},domProps:{value:t.formData.time},on:{click:function(e){return t.timeFn()}}})]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.address?"active":""},[t._v("地点")]),e("div",{staticClass:"relativeC"},[e("input",{attrs:{type:"text",readonly:"",placeholder:"点击选择地点"},domProps:{value:t.formData.address}})])]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.content?"active":""},[t._v("描述")]),e("div",[e("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.content,expression:"formData.content",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"在此输入描述",rows:"5",readonly:""},domProps:{value:t.formData.content},on:{input:function(e){e.target.composing||t.$set(t.formData,"content",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.equipmentName?"active":""},[t._v("可视设备")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.equipmentName,expression:"formData.equipmentName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"请输入可视设备",readonly:""},domProps:{value:t.formData.equipmentName},on:{input:function(e){e.target.composing||t.$set(t.formData,"equipmentName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.missionContent?"active":""},[t._v("当前任务")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.missionContent,expression:"formData.missionContent",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"请输入当前任务",readonly:""},domProps:{value:t.formData.missionContent},on:{input:function(e){e.target.composing||t.$set(t.formData,"missionContent",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]):t._e(),2==t.type||3==t.type?e("div",{staticClass:"form",class:t.edit?"":"unclick"},[e("div",{staticClass:"form_item"},[e("p",{class:t.formData.name?"active":""},[t._v("事件名称")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.name,expression:"formData.name",modifiers:{trim:!0}}],attrs:{readonly:"",type:"text",placeholder:"在此输入事件名称"},domProps:{value:t.formData.name},on:{input:function(e){e.target.composing||t.$set(t.formData,"name",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.time?"active":""},[t._v("时间")]),e("input",{attrs:{readonly:"",type:"text",placeholder:"在此输入时间"},domProps:{value:t.formData.time}})]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.address?"active":""},[t._v("地点")]),e("div",{staticClass:"relativeC"},[e("input",{attrs:{readonly:"",type:"text",placeholder:"点击选择地点"},domProps:{value:t.formData.address}})])]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.content?"active":""},[t._v("描述")]),e("div",[e("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.content,expression:"formData.content",modifiers:{trim:!0}}],attrs:{readonly:"",type:"text",placeholder:"在此输入描述",rows:"5"},domProps:{value:t.formData.content},on:{input:function(e){e.target.composing||t.$set(t.formData,"content",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.equipmentName?"active":""},[t._v("可视设备")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.equipmentName,expression:"formData.equipmentName",modifiers:{trim:!0}}],attrs:{readonly:"",type:"text",placeholder:"请输入可视设备"},domProps:{value:t.formData.equipmentName},on:{input:function(e){e.target.composing||t.$set(t.formData,"equipmentName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),e("div",{staticClass:"form_item"},[e("p",{class:t.formData.missionContent?"active":""},[t._v("当前任务")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.missionContent,expression:"formData.missionContent",modifiers:{trim:!0}}],attrs:{readonly:"",type:"text",placeholder:"请输入当前任务"},domProps:{value:t.formData.missionContent},on:{input:function(e){e.target.composing||t.$set(t.formData,"missionContent",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]):t._e(),e("div",{staticClass:"btn"},[1==t.type?e("span",{staticClass:"btnSpan",on:{click:function(e){return t.handClick(1)}}},[t._v("拒绝执行")]):t._e(),1==t.type?e("span",{on:{click:function(e){return t.handClick(2)}}},[t._v("前往执行")]):t._e(),2==t.type?e("span",{on:{click:function(e){return t.handClick(3)}}},[t._v("结束任务")]):t._e()])])},n=[],i=a("c198"),r={data(){return{url_:"",rbacToken_:"",edit:!0,formData:{name:"",time:"",address:"",content:"",equipmentName:"",missionContent:""},emergencyId:"",equipmentId:"",excuteType:"",type:""}},created(){let t=this.$route.query;this.url_=Object({NODE_ENV:"production",VUE_APP_ENV:"production",BASE_URL:""}).baseUrl,this.rbacToken_=localStorage.getItem("rbacToken"),this.type=t.type,this.getDetail()},methods:{async getDetail(){const t=this;let e=t.$route.query;const a=await Object(i["W"])({id:e.id});if(a.success){let e=a.data;t.formData.name=e.name,t.formData.content=e.content,t.formData.time=e.createTime,t.formData.address=e.address,t.formData.equipmentName=e.equipmentName,t.formData.missionContent=e.missionContent,t.emergencyId=e.emergencyId,t.equipmentId=e.equipmentId}},showLoadingFn(){dd.showLoading({text:"加载中"}).then(t=>{}).catch(t=>{})},hideLoadingFn(){dd.hideLoading({}).then(t=>{}).catch(t=>{})},alert(t){dd.alert({message:t,title:"提示",button:"收到"}).then(t=>{}).catch(t=>{})},handClick(t){const e=this;let a=e.$route.query,o={emergencyId:e.emergencyId,equipmentId:e.equipmentId,excuteType:"",content:e.formData.missionContent,id:""};return 1==t?(o.excuteType="2",o.id=a.id,void dd.device.notification.confirm({message:"是否拒绝执行?",title:"提示",buttonLabels:["取消","确定"],onSuccess(t){1===t.buttonIndex&&dd.device.notification.showPreloader({text:"处理中..",showIcon:!0,async onSuccess(t){const a=await Object(i["Tb"])(o);dd.device.notification.hidePreloader({onSuccess:function(t){},onFail:function(t){}}),a.success&&dd.alert({message:a.message?a.message:"操作成功",title:"提示",button:"收到"}).then(t=>{e.$router.go(-1)}).catch(t=>{})},onFail:function(t){}})},onFail:function(t){}})):2==t?(o.excuteType="1",o.id=a.id,void dd.device.notification.confirm({message:"是否前往执行?",title:"提示",buttonLabels:["取消","确定"],onSuccess(t){1===t.buttonIndex&&dd.device.notification.showPreloader({text:"处理中..",showIcon:!0,async onSuccess(t){const a=await Object(i["Tb"])(o);dd.device.notification.hidePreloader({onSuccess:function(t){},onFail:function(t){}}),a.success&&dd.alert({message:a.message?a.message:"操作成功",title:"提示",button:"收到"}).then(t=>{e.$router.go(-1)}).catch(t=>{})},onFail:function(t){}})},onFail:function(t){}})):3==t?(o.excuteType="3",void dd.device.notification.confirm({message:"是否结束任务?",title:"提示",buttonLabels:["取消","确定"],onSuccess(t){1===t.buttonIndex&&dd.device.notification.showPreloader({text:"处理中..",showIcon:!0,async onSuccess(t){const a=await Object(i["Tb"])(o);dd.device.notification.hidePreloader({onSuccess:function(t){},onFail:function(t){}}),a.success&&dd.alert({message:a.message?a.message:"操作成功",title:"提示",button:"收到"}).then(t=>{e.$router.go(-1)}).catch(t=>{})},onFail:function(t){}})},onFail:function(t){}})):void 0}}},s=r,c=(a("e5dc"),a("2877")),m=Object(c["a"])(s,o,n,!1,null,"24b9df87",null);e["default"]=m.exports},e5dc:function(t,e,a){"use strict";a("2c46")}}]);