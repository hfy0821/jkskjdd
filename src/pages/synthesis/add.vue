<template>
    <div class="reportedAdd_warp">
        <div class="source">
            <span>来源：</span>
            <i>{{sourceType}}</i>
        </div>
        <div class="form" :class="edit?'':'unclick'">
            <div class="item" v-if="type==='2'">
                <p :class="formData.title?'active':''">标题</p>
                <input type="text" v-model.trim="formData.title" placeholder="在此输入标题">
            </div>
            <div class="item" v-if="type==='3'">
                <p :class="formData.title?'active':''">舆情名称</p>
                <input type="text" v-model.trim="formData.title" placeholder="在此输入舆情名称">
            </div>
            <div class="item" v-if="type==='2'">
                <p :class="formData.name?'active':''">姓名</p>
                <input type="text" v-model.trim="formData.name" placeholder="在此输入姓名">
            </div>
            <div class="item" v-if="type==='2'">
                <p :class="formData.sex?'active':''">性别</p>
                <input @click="selectSex" type="text" readonly v-model.trim="formData.sex" placeholder="点击选择性别">
            </div>
            <div class="item" v-if="type==='0'||type==='1'||type==='4'">
                <p :class="formData.eventName?'active':''">事件名称</p>
                <input type="text" v-model.trim="formData.eventName" placeholder="在此输入事件名称">
            </div>
            <div class="item" v-if="type==='0'||type==='1'||type==='3'">
                <p :class="typeSelectOption.length?'active':''">事件类别</p>
                <div>
                    <input @click="selectEventType" readonly type="text" :value="typeSelectOption.join(',')" placeholder="点击选择事件类别">
                </div>
            </div>
            <div class="item">
                <p :class="formData.behave?'active':''">现实行为</p>
                <div>
                    <input @click="selectBehave" readonly type="text" v-model="formData.behave" placeholder="点击选择现实行为">
                </div>
            </div>
            <div class="item" v-if="type==='3'">
                <p :class="formData.seetSource?'active':''">舆情来源</p>
                <input type="text" v-model.trim="formData.seetSource" placeholder="在此输入舆情来源">
            </div>
            <div class="item" v-if="type==='0'">
                <p :class="formData.street?'active':''">所属街道</p>
                <div>
                    <input @click="selectStreet" readonly type="text" v-model="formData.street" placeholder="点击选择所属街道">
                </div>
            </div>
            <div class="item" v-if="type==='0'">
                <p :class="formData.incidentAddress?'active':''">所属地点</p>
                <div class="address">
                    <input type="text" v-model="formData.incidentAddress" placeholder="点击选择所属地点">
                    <i @click="selectAddress" class="iconfont icon-location"></i>
                </div>
            </div>
            <div class="item incidentContent" v-if="type==='0'||type==='1'||type==='3'||type==='4'">
                <p :class="formData.incidentContent?'active':''">事件描述</p>
                <div>
                    <input type="text" v-model.trim="formData.incidentContent" placeholder="在此输入事件描述">
                </div>
            </div>
            <div class="item incidentContent" v-if="type==='2'">
                <p :class="formData.intro?'active':''">简介</p>
                <div>
                    <input type="text" v-model.trim="formData.intro" placeholder="在此输入简介">
                </div>
            </div>
            <div class="item" v-if="type==='0'">
                <p :class="formData.incidentTime?'active':''">事发时间</p>
                <div>
                    <input @click="selectTime" readonly type="text" v-model="formData.incidentTime" placeholder="事发时间">
                </div>
            </div>
            <div class="item" v-if="type==='4'">
                <p :class="formData.incidentTime?'active':''">上报时间</p>
                <div>
                    <input @click="selectTime" readonly type="text" v-model="formData.incidentTime" placeholder="上报时间">
                </div>
            </div>
            <div class="item" v-if="type==='4'">
                <p :class="formData.earlyWarningName?'active':''">上报人</p>
                <div>
                    <input type="text" v-model.trim="formData.earlyWarningName" placeholder="在此输入上报人">
                </div>
            </div>
            <div class="item" v-if="type==='0'">
                <p :class="formData.joinNum?'active':''">涉及人数</p>
                <div>
                    <input type="text" v-model.number="formData.joinNum" placeholder="涉及人数">
                </div>
            </div>
            <div class="item" v-if="type==='3'">
                <p :class="formData.link?'active':''">网络连接</p>
                <div>
                    <input type="text" v-model.trim="formData.link" placeholder="在此输入网络连接">
                </div>
            </div>
            <div class="item" v-if="type==='3'">
                <p :class="formData.involveWeb?'active':''">涉及网站</p>
                <div>
                    <input type="text" v-model.trim="formData.involveWeb" placeholder="在此输入涉及网站">
                </div>
            </div>
        </div>
        <div class="endHolder"></div>
        <div class="btn">
            <span @click="handClick(1)" v-if="!id">上报</span>
            <i @click="del()" v-show="!edit&&id">删除</i>
            <b @click="edit = true" v-show="!edit&&id">编辑</b>
            <i @click="cancel" v-show="edit&&id">取消</i>
            <b @click="save" v-show="edit&&id">保存</b>
        </div>
    </div>
</template>
<script>
export default {
    name: 'reportedAdd',
    data(){
        return{
            sourceType: '',
            type: this.$route.query.type || '1',
            id: this.$route.query.id,
            index: [],
            edit: true,
            formData:{
                title: '',
                name: '',
                eventName: '',
                eventType: '',
                behave: '',
                behaveId: '',
                street: '',
                streetId: '',
                incidentAddress: '',
                incidentContent: '',
                intro: '',
                sex: '',
                incidentTime: '',
                joinNum: '',
                seetSource: '',
                link: '',
                involveWeb: '',
                earlyWarningName: '',
            },
            typeOption: ['劳资纠纷','非正常死亡','涉众型经济','住房纠纷','医疗纠纷','城中村改造','执法纠纷',
                '学区划分','校园安全','公共安全','国家安全','其他','村（社区）规模优化调整'],
            typeSelectOption: [],
            behaveOption: ["集体上访","拦路","聚集","其他"],
            streetOption: ["SB街道","XX街道","123","其他"],
        }
    },
    created(){
        console.log(this.id)
        if(this.id){
            document.title = '事件详情'
            this.edit = false
        }
        this.sourceType = ["维稳信息员","110报警",'综合帮扶',"舆情","公安警情"][this.type]
    },
    methods:{
        selectEventType() {
            const that = this
            dd.biz.util.multiSelect({
                options:that.typeOption,
                selectOption:that.typeSelectOption,
                onSuccess : function(res) {
                    that.typeSelectOption = res.map(v=>{
                        return that.typeOption[v]
                    })
                },
                onFail : function() {}
            })
        },
        selectBehave(){
            const that = this
            dd.device.notification.actionSheet({
                title: "选择现实行为？",
                cancelButton: '取消',
                otherButtons: that.behaveOption,
                onSuccess : function(res) {
                    if (res.buttonIndex===-1) return 
                    that.formData.behave = that.behaveOption[res.buttonIndex]
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
                    that.formData.street = that.streetOption[res.buttonIndex]
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
        selectTime() {
            const that = this
            dd.showDatePicker({
                format: "yyyy-MM-dd",//注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
                value:that.formData.incidentTime, //默认显示日期
            }).then(result => {
                that.formData.incidentTime = result.value;
            }).catch(err => {})
            // dd.biz.util.datetimepicker({
            //     format: 'yyyy-MM-dd HH:mm:ss',
            //     value: that.formData.incidentTime, //默认显示
            //     onSuccess : function(result) {
            //         that.formData.incidentTime = result.value;
            //     },
            //     onFail : function(err) {}
            // })
        },
        selectSex(){
            const that = this
            dd.device.notification.actionSheet({
                title: "选择性别？",
                cancelButton: '取消',
                otherButtons: ['男','女'],
                onSuccess : function(res) {
                    if (res.buttonIndex===-1) return
                    that.formData.sex = ['男','女'][res.buttonIndex]
                },
                onFail : function(err) {}
            })
        },
        del(){},
        cancel(){},
        save(){},
        handClick(i){
            dd.device.notification.confirm({
                message: "确定上报？",
                title: "提示",
                buttonLabels: ['取消', '确定'],
                onSuccess : function(res) {
                    if(res.buttonIndex){

                    }
                },
                onFail : function(err) {}
            });
        }
    }
}
</script>
<style lang="less" scoped>
.reportedAdd_warp{
    padding-top: 60px;
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
    .source{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        padding: 0 32px;
        background: #ebebeb;
        span,i{
            font-size: 24px;
            line-height: 60px;
        }
        span{
            opacity: .6;
        }
        i{
            color: #409eff;
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
