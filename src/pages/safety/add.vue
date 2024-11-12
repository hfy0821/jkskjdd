<template>
    <div class="safetyAdd_warp">
        <div class="form" :class="edit?'':'unclick'">
            <div class="item">
                <p :class="formData.title?'active':''">事件名称</p>
                <input type="text" v-model.trim="formData.title" placeholder="在此输入事件名称">
            </div>
            <div class="item">
                <p :class="formData.roadName?'active':''">所属街道</p>
                <div>
                    <input @click="selectStreet" readonly type="text" v-model="formData.roadName" placeholder="点击选择所属街道">
                </div>
            </div>
            <div class="item">
                <p :class="formData.incidentAddress?'active':''">所属地点</p>
                <div class="address">
                    <input type="text" v-model="formData.incidentAddress" placeholder="点击选择所属地点">
                    <i @click="selectAddress" class="iconfont icon-location"></i>
                </div>
            </div>
            <div class="check">
                <div v-for="(v, i) in checkList" :key="i" :class="checkIndex===i?'active':''" @click="handCheck(i)">
                    <span>检查项{{i+1}}</span>
                    <i class="iconfont icon-cha2" @click="delChack(i)" v-if="checkList.length>1"></i>
                </div>
                <i class="iconfont icon-jia" @click="addCheck"></i>
            </div>
            <div class="item">
                <p :class="checkList[checkIndex].firstName?'active':''">检查项</p>
                <input type="text" @click="selectFirst" readonly v-model="checkList[checkIndex].firstName" placeholder="请选择检查项">
            </div>
            <div class="item">
                <p :class="checkList[checkIndex].secondName?'active':''">所属类目</p>
                <input type="text"  @click="selectSecond" readonly v-model="checkList[checkIndex].secondName" placeholder="请选择所属类目">
            </div>
            <div class="item question">
                <div class="questionTitle">
                    <p :class="1?'active':''">存在问题</p>
                    <i class="iconfont icon-jia" @click="addQues"></i>
                </div>
                <div class="questionList" v-for="(v,i) in checkList[checkIndex].question" :key="i">
                    <div>
                        <input type="text" @click="selectThird(i)" readonly :value="v.name" placeholder="请选择存在问题">
                        <i class="iconfont icon-cha2" @click="delQues(i)" v-if="checkList[checkIndex].question.length>1"></i>
                    </div>
                    <div class="item" v-if="checkList[checkIndex].question[i].id === -1">
                        <p class="active">问题描述</p>
                        <input type="text" v-model.trim="checkList[checkIndex].question[i].otherContent" placeholder="请输入问题描述">
                    </div>
                    <!-- checkList[that.checkIndex].question[i].id -->
                </div>
            </div>
            <div class="item">
                <p :class="formData.aaa?'active':''">附件上传</p>
                <ul class="file">
                    <li v-for="(v, i) in files" :key="i">
                        <span>{{v.fileName}}</span>
                        <i @click="delFile(i)" class="iconfont icon-cha2"></i>
                    </li>
                </ul>
                <button>上传<input @change="fileChange" multiple type="file" name="" id=""></button>
            </div>
        </div>
        <div class="endHolder"></div>
        <div class="btn">
            <span @click="handClick(1)" v-if="!id">上报</span>
            <i @click="del()" v-show="!edit&&id">删除</i>
            <b @click="edit = true" v-show="!edit&&id">编辑</b>
            <i @click="cancel" v-show="edit&&id">取消</i>
            <b @click="handClick" v-show="edit&&id">保存</b>
        </div>
    </div>
</template>
<script>
import { upload, getSomeList, addSafetyEvent, getSafetyList, getHandleEventDetailByIdForApp, safetyUpdate } from "../../api/a";
export default {
    name: 'reportedAdd',
    data(){
        return{
            id: this.$route.query.id,
            checkIndex: 0,
            edit: true,
            checkList: [
                {
                    question: [{id: '', name: '',otherContent: ''}],
                    firstName: '',
                    secondName: '',
                    secondList: [],
                    thirdList: [],
                    secondOption: [],
                    thirdOption: [],
                }
            ],
            safety: [],
            formData:{
                id: this.$route.query.id,
                authName: "peaceIncident:permissionList",
                parentAuthName: "peaceIncident:permissionList",
                eventSafety: '',
                handleType: 1,
                title: '',
                roadName: '',
                roadId: '',
                incidentAddress: '',
                incidentContent: '',
                incidentTime: '',
                earlyWarningName: '',
                joinNum: '',
                handleFilesListStr: '',
            },
            files: [],
            firstList: [],
            firstOption: [],
        }
    },
    computed: {
		streetList() {
			return this.$store.state.common.streetList
		},
		streetOption() {
			return this.$store.state.common.streetList.map(v=>{
				return v.name
			})
		},
	},
    async created(){
        dd.ui.pullToRefresh.disable()
        console.log(this.id)
        if(this.id){
            document.title = '事件详情'
            const [data, data2, data3] = await Promise.all([getHandleEventDetailByIdForApp(this.$route.query),
                getSafetyList({eventId: this.id}), getSomeList({type: 9})]) 
            if(data.success){
                this.firstList = data3.data
                this.firstOption = data3.data.map(v=>{
                    return v.name
                })

                this.formData.roadName = data.data.sourceData.roadName
                this.formData.roadId = data.data.sourceData.roadId
                this.formData.title = data.data.sourceData.title
                this.formData.incidentAddress = data.data.sourceData.incidentAddress

                let index = 0, thirdIndex = 0
                data2.data.forEach(v => {
                    if(v.page>index){
                        this.checkList[v.page-1] = {
                            question: [],
                            firstName: '',
                            secondName: '',
                            secondList: [],
                            thirdList: [],
                            secondOption: [],
                            thirdOption: [],
                        }
                        index++
                        thirdIndex = 0
                    }
                    if(v.type === 1){
                        this.checkList[v.page-1].firstName = v.content
                        this.checkList[v.page-1].firstId = v.id
                        getSomeList({type: 9,parentId: v.id}).then(res => {
                            if(res.success){
                                this.checkList[v.page-1].secondList = res.data
                                this.checkList[v.page-1].secondOption = res.data.map(v=>{
                                    return v.name
                                })
                            }
                        })
                    }
                    if(v.type === 2){
                        this.checkList[v.page-1].secondName = v.content
                        this.checkList[v.page-1].secondId = v.id
                        getSomeList({type: 9,parentId: v.id}).then(res => {
                            if(res.success){
                                this.checkList[v.page-1].thirdList = res.data
                                this.checkList[v.page-1].thirdOption = res.data.map(v=>{
                                    return v.name
                                })
                            }
                        })
                    }
                    if(v.type === 3){
                        this.checkList[v.page-1].question.push({id: '', name: '',otherContent: ''})
                        this.checkList[v.page-1].question[thirdIndex].name = v.content
                        this.checkList[v.page-1].question[thirdIndex].id = v.id
                        if(v.id === -1){
                            this.checkList[v.page-1].question[thirdIndex].otherContent = v.otherContent
                        }
                        thirdIndex++
                    }
                })
                console.log(this.checkList)

            }
            // this.edit = false
            return
        }
        const data = await getSomeList({type: 9})
        if(data.success){
            this.firstList = data.data
            this.firstOption = data.data.map(v=>{
                return v.name
            })
        }
    },
    methods:{
        addCheck(){
            this.checkList.push({question: [{id: '', name: ''}],firstName: '',secondName: '',})
        },
        handCheck(i){
            this.checkIndex = i
        },
        delChack(i){
            this.checkList.splice(i,1)
        },
        addQues(){
            console.log(this.checkList[this.checkIndex].question)
            this.checkList[this.checkIndex].question.push({id: '', name: ''})
        },
        delQues(i){
            this.checkList[this.checkIndex].question.splice(i,1)
        },
        selectFirst() {
            const that = this
            dd.device.notification.actionSheet({
                title: "选择检查项",
                cancelButton: '取消',
                otherButtons: that.firstOption,
                async onSuccess(res) {
                    if (res.buttonIndex===-1) return
                    that.checkList[that.checkIndex].firstName = that.firstOption[res.buttonIndex]
                    that.checkList[that.checkIndex].firstId = that.firstList[res.buttonIndex].id
                    that.checkList[that.checkIndex].secondName = ''
                    that.checkList[that.checkIndex].question =[{id: '', name: ''}]
                    const data = await getSomeList({type: 9,parentId: that.firstList[res.buttonIndex].id})
                    if(data.success){
                        that.checkList[that.checkIndex].secondList = data.data
                        that.checkList[that.checkIndex].secondOption = data.data.map(v=>{
                            return v.name
                        })
                    }
                    that.$forceUpdate()
                },
                onFail : function(err) {}
            })
        },
        selectSecond() {
            const that = this
            if(!that.checkList[that.checkIndex].secondOption.length) return
            dd.device.notification.actionSheet({
                title: "选择所属类目",
                cancelButton: '取消',
                otherButtons: that.checkList[that.checkIndex].secondOption,
                async onSuccess(res) {
                    if (res.buttonIndex===-1) return
                    that.checkList[that.checkIndex].secondName = that.checkList[that.checkIndex].secondOption[res.buttonIndex]
                    that.checkList[that.checkIndex].secondId = that.checkList[that.checkIndex].secondList[res.buttonIndex].id
                    that.checkList[that.checkIndex].question =[{id: '', name: ''}]
                    const data = await getSomeList({type: 9,parentId: that.checkList[that.checkIndex].secondList[res.buttonIndex].id})
                    if(data.success){
                        that.checkList[that.checkIndex].thirdList = [...data.data, {id: -1, name: '其他'}]
                        that.checkList[that.checkIndex].thirdOption = data.data.map(v=>{
                            return v.name
                        })
                        that.checkList[that.checkIndex].thirdOption.push('其他')
                    }
                    that.$forceUpdate()
                },
                onFail : function(err) {}
            })
        },
        selectThird(i) {
            const that = this
            if(!that.checkList[that.checkIndex].thirdOption.length) return
            dd.device.notification.actionSheet({
                title: "选择存在问题",
                cancelButton: '取消',
                otherButtons: that.checkList[that.checkIndex].thirdOption,
                async onSuccess(res) {
                    if (res.buttonIndex===-1) return
                    that.checkList[that.checkIndex].question[i].name = that.checkList[that.checkIndex].thirdOption[res.buttonIndex]
                    that.checkList[that.checkIndex].question[i].id = that.checkList[that.checkIndex].thirdList[res.buttonIndex].id
                    that.$forceUpdate()
                },
                onFail : function(err) {}
            })
        },
        selectStreet(){
            const that = this
            dd.device.notification.actionSheet({
                title: "选择所属街道？",
                cancelButton: '取消',
                otherButtons: that.streetOption,
                onSuccess : function(res) {
                    if (res.buttonIndex===-1) return
                    that.formData.roadId = that.streetList[res.buttonIndex].id
                    that.formData.roadName = that.streetOption[res.buttonIndex]
                },
                onFail : function(err) {}
            })
        },
        selectAddress() {
            const that = this
            dd.biz.map.locate({
                //latitude: 39.903578, // 纬度，非必须
                //longitude: 116.473565, // 经度，非必须
                onSuccess: function (result) {
                    var address = result.province+result.city+result.adName+result.snippet;
                    that.formData.incidentAddress = address;
                    // var point = GPS.gcj_decrypt(result.latitude,result.longitude);//转换坐标系
                    // $scope.formData.x=point.lon;
                    // $scope.formData.y=point.lat;
                },
                onFail: function (err) {
                    alert(JSON.stringify(err))
                }
            });
        },
        del(){},
        cancel(){
            this.$router.go(-1)
        },
        save(){},
        handClick(i){
            if(!this.formData.title){
                this.alert('请输入事件名称')
                return
            }
            if(!this.formData.roadId){
                this.alert('请选择请选择所属街道')
                return
            }
            if(!this.formData.incidentAddress){
                this.alert('请输入所属地点')
                return
            }
            const api = this.id ? safetyUpdate : addSafetyEvent
            this.safety = []
            console.log(this.checkList)
            let index = 0, flag = false
            this.checkList.forEach((v,i) => {
                if(!v.firstId) return
                index++
                this.safety.push({safetyTypeId: v.firstId, type: 1, page: index})
                this.safety.push({safetyTypeId: v.secondId, type: 2, page: index})
                v.question.forEach((y,j) => {
                    if(!y.id || (y.id === -1 && !y.otherContent)) return
                    flag = true
                    this.safety.push({safetyTypeId: y.id, type: 3, page: index, otherContent: y.otherContent})
                    // y.otherContent&&
                })
            })
            if(!flag){
                this.alert('请完成检查项选择')
                return
            }
            this.formData.eventSafety = JSON.stringify(this.safety)
            this.formData.handleFilesListStr = JSON.stringify(this.files);
            const that = this
            dd.device.notification.confirm({
                message: this.id ?'确定修改？':"确定上报？",
                title: "提示",
                buttonLabels: ['取消', '确定'],
                async onSuccess(res) {
                    if(res.buttonIndex){
                        // console.log(that.checkList)
                        // console.log(that.safety)
                        const data = await api(that.formData)
                        if(data.success){
                            dd.device.notification.toast({
                                // icon: '',
                                text: '操作成功',
                                duration: 1.5,
                                onSuccess(result) {
                                    that.$router.go(-1)
                                }
                            })
                        }
                    }
                },
                onFail : function(err) {}
            });
        },
        async fileChange(e){
            console.log(e.target.files)
            let sendData = new FormData();
            const files = [...e.target.files]
            if(files&&files.length){
                dd.device.notification.showPreloader({
                    text: "文件上传中..",
                    showIcon: true,
                    onSuccess(result) {}
                })
                files.forEach(v => {
                    sendData.append('file',v)
                    // this.files.push(v.name)
                })
                sendData.append('rbacToken',localStorage.getItem('rbacToken'))
                const data = await upload(sendData)
                dd.device.notification.hidePreloader()
                if(data.success){
                    data.data&&data.data.length&&data.data.forEach((v, i)=>{
                        var obj = {};
                        obj.fileType = files[i].type;
                        obj.fileName=files[i].name;
                        obj.fileId = v;
                        this.files.push(obj);
                    })
                    console.log(this.files)
                }
            }
            
        },
        delFile(i){
            this.files.splice(i,1)
        },
        alert(v){
            dd.device.notification.alert({
                message: v,
                title: "提示",
                buttonName: "确定"
            });
        }
    }
}
</script>
<style lang="less" scoped>
.safetyAdd_warp{
    // padding-top: 60px;
    input::-webkit-input-placeholder {
        font-size: 24px;
    }

    input::-moz-placeholder {
        font-size: 24px;
    }

    input:-moz-placeholder {
        font-size: 24px;
    }

    input:-ms-input-placeholder {
        font-size: 24px;
    }
    input{
        font-size: 30px;
        line-height: 50px;
        width: 100%;
    }
    .icon-jia,.icon-cha2{
        color: #409eff;
        font-size: 40px;
    }
    .icon-cha2{
        font-size: 30px;
    }
    .check{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        >div{
            border: 1PX solid #e4e4e4;
            height: 46px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            border-radius: 6px;
            margin: 0 14px 16px 0;
            i{
                margin-left: 10px;
            }
            &.active{
                span{
                    color: #409eff;
                }
                border-color: #409eff;
            }
        }
        .icon-jia{
            margin-top: 2px;
            margin-left: auto;
        }
    }
    .form{
        padding: 0 32px;
        &.unclick{
            *{
                pointer-events: none;
            }
        }
        .item{
            border-bottom: solid 1PX #e4e4e4;
            padding: 8px 0 24px;
            &.incidentContent{
                p{
                    display: inline-block;
                    position: relative;
                    &::after{
                        content: '*';
                        position: absolute;
                        right: -14px;
                        top: 4px;
                        color: red;
                    }
                }
            }
            &.question{
                .questionTitle{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    i{
                    }
                }
                .questionList{
                    >div{
                        &:first-child{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }
                    }
                    .item{
                        border: 0;
                    }
                }
            }
            .address{
                display: flex;
                input{
                    width: auto;
                    flex: 1;
                }
                i{
                    font-size: 38px;
                    opacity: .6;
                    padding: 4px;
                }
            }
            p{
                line-height: 68px;
                &.active{
                    color: #409eff;
                    font-size: 24px;
                }
            }
            button{
                line-height: 48px;
                width: 120px;
                color: #fff;
                background: #409eff;
                font-size: 18px;
                border-radius: 4px;
                position: relative;
                input{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
            .file{
                li{
                    line-height: 50px;
                    display: flex;
                    span{
                        flex: 1;
                        .cf>.text-overflow-1()
                    }
                    i{
                        font-size: 30px;
                        opacity: 0.6;
                        padding: 0 4px;
                    }
                }
            }
        }
    }
    .endHolder{
        height: 136px;
    }
    .btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: solid 1PX #e4e4e4;
        display: flex;
        justify-content: space-between;
        padding: 24px 32px;
        background: #fff;
        i,b,span{
            text-align: center;
            line-height: 72px;
            border-radius: 8px;
            letter-spacing: 5px;
        }
        span{
            width: 100%;
            background: #409eff;
            color: #fff;
        }
        i,b{
            width: 320px;
        }
        i{
            border: 1PX solid #409eff;
            color: #409eff;
        }
        b{
            background: #409eff;
            color: #fff;
        }
    }
}
</style>
