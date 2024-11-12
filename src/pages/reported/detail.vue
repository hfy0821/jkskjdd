<template>
    <div class="event_warp">
        <div class="tab">
            <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
        </div>
        <div class="topHolder"></div>
        <div class="subTab"></div>
        <div class="detailMsg" v-show="tabIndex===1">
            <ul class="ul">
                <li class="li">
                    <span>事件名称</span>
                    <div>人社平台投诉事件</div>
                </li>
                <li>
                    <span>事发地址</span>
                    <div>温州汽车城综合展示摊位A01号</div>
                </li>
                <li>
                    <span>事件描述</span>
                    <div>无故克扣工资</div>
                </li>
                <li>
                    <span>事件类别</span>
                    <div>劳资纠纷</div>
                </li>
                <li>
                    <span>事件来源</span>
                    <div>人社平台</div>
                </li>
                <li>
                    <span>所属区域</span>
                    <div>瓯海区</div>
                </li>
                <li>
                    <span>所属街道</span>
                    <div>娄桥街道</div>
                </li>
                <li>
                    <span>事发时间</span>
                    <div>2019/07/09  12:32:09</div>
                </li>
                <li>
                    <span>截止时间</span>
                    <div>2019/07/12  12:32:09</div>
                </li>
                <li>
                    <span>最新处置时间</span>
                    <div>2019/07/12  12:32:09</div>
                </li>
                <!-- <li>
                    <div>
                        <span>位置信息</span>
                        <div class="map"></div>
                    </div>
                </li> -->
            </ul>
        </div>
        <div class="schedule" v-if="tabIndex===2">
            <ul class="list"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="loading&&tabIndex===2"
                infinite-scroll-distance="10">
                <li v-for="(v,i) in list2" :key="i">
                    <div>
                        <div class="title">{{i+1}}</div>
                        <i>{{v.createTime}}</i>
                    </div>
                    <div>
                        <span>处理阶段</span>
                        <div>{{v.step}}</div>
                    </div>
                    <div>
                        <span>创建人</span>
                        <div>{{v.userName}}</div>
                    </div>
                    <div>
                        <span>签收时间</span>
                        <div>{{v.signTime}}</div>
                    </div>
                </li>
                <li v-if="!noMore[2]" class="loadMore">
                    <i class="iconfont icon-Loading"></i>
                    加载中...
                </li>
                <li v-if="noMore[2]" class="loadMore">
                    没有更多了...
                </li>
            </ul>
        </div>
        <div class="accessory" v-if="tabIndex===3">
            <ul class="list"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="loading&&tabIndex===3"
                infinite-scroll-distance="10">
                <li v-for="(v,i) in list3" :key="i">
                    <div>
                        <div class="title">{{i+1}}</div>
                        <i>{{v.createTime}}</i>
                    </div>
                    <div>
                        <span>附件信息</span>
                        <div>
                            <p>事件详情.docx</p>
                            <div>
                                <img src="" alt="">
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>上传人</span>
                        <div>{{v.createUserName}}</div>
                    </div>
                </li>
                <li v-if="!noMore[3]" class="loadMore">
                    <i class="iconfont icon-Loading"></i>
                    加载中...
                </li>
                <li v-if="noMore[3]" class="loadMore">
                    没有更多了...
                </li>
            </ul>
        </div>
        <div class="disposition" v-if="tabIndex===4">
            <ul class="list"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="loading&&tabIndex===4"
                infinite-scroll-distance="10">
                <li v-for="(v,i) in list4" :key="i">
                    <div>
                        <div class="title">{{i+1}}</div>
                        <i>{{v.createTime}}</i>
                    </div>
                    <div>
                        <span>处置情况</span>
                        <div>事件上传到数据管理系统</div>
                    </div>
                    <div>
                        <span>上传人</span>
                        <div>{{v.createUserName}}</div>
                    </div>
                </li>
                <li v-if="!noMore[4]" class="loadMore">
                    <i class="iconfont icon-Loading"></i>
                    加载中...
                </li>
                <li v-if="noMore[4]" class="loadMore">
                    没有更多了...
                </li>
            </ul>
        </div>
        <div class="instructions" v-if="tabIndex===5">
            <ul class="list"
                v-infinite-scroll="loadMore"
                :infinite-scroll-disabled="loading&&tabIndex===5"
                infinite-scroll-distance="10">
                <li v-for="(v,i) in list5" :key="i">
                    <div>
                        <div class="title">1111111</div>
                        <i>12212121</i>
                    </div>
                    <div>
                        <span>领导批示</span>
                        <div>事件上传到数据管理系统</div>
                    </div>
                    <div>
                        <span>姓名</span>
                        <div>111</div>
                    </div>
                </li>
                <li v-if="!noMore[5]" class="loadMore">
                    <i class="iconfont icon-Loading"></i>
                    加载中...
                </li>
                <li v-if="noMore[5]" class="loadMore">
                    没有更多了...
                </li>
            </ul>
        </div>
        <div class="endHolder"></div>
        <div class="btn">
            <span @click="handClick(1)">处置情况</span>
            <span @click="handClick(2)">申请办结</span>
        </div>
    </div>
</template>
<script>
import Nav from "../../components/tab";
export default {
    name: 'detail',
    components:{
        Nav
    },
    data(){
        return{
            loading: false,
            noMore: [false,false,false,false,false,false],
            tabs: ['详细信息','事件进度','附件信息','处置情况','领导批示'],
            tabIndex: 1,
            list1: new Array(6).fill(1),
            list2: new Array(6).fill(1),
            list3: new Array(6).fill(1),
            list4: new Array(6).fill(1),
            list5: new Array(6).fill(1),
        }
    },
    created(){

    },
    methods:{
        changeIndex(i){
            window.scrollTo(0,0)
            this.tabIndex = i
        },
        loadMore() {
            let list = 'list' + this.tabIndex
            console.log(list)
            console.log(this.list1.length)
            if(this[list].length>=20){
                this.noMore.splice(this.tabIndex,1,true)
                return
            }
            this.loading = true;
            setTimeout(() => {
                let last = this[list][this[list].length - 1];
                for (let i = 1; i <= 10; i++) {
                this[list].push(last + i);
                }
                this.loading = false;
            }, 1000);
        },
        handClick(i){
            this.$router.push('confirm/'+i)
        }
    }
}
</script>
<style lang="less" scoped>
.event_warp{
    .tab{
        box-shadow: 0px 1PX 0px 0px rgba(25, 31, 37, 0.12);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 1;
    }
    .topHolder{
        height: 96px;
    }
    .endHolder{
        height: 136px;
    }
    .subTab{
        height: 24px;
        background: @bgColor1;
    }
    .detailMsg{
        .ul{
            padding: 0 32px;
            .li,li{
                display: flex;
                font-size: 28px;
                line-height: 40px;
                padding: 20px 0;
                span{
                    width: 200px;
                    opacity: .7;
                }
                >div{
                    flex: 1;
                    color: #5f61f8;
                }
            }
        }
    }
    .list{
        padding: 0 32px;
        li{
            border-bottom: solid 1PX #191f251f;
            padding: 20px 0 0;
            >div{
                .detailMsg>.ul>.li;
                padding: 0;
                margin-bottom: 20px;
                .title{
                    color: @color;
                    opacity: 0.7;
                }
                p{
                    color: #5f61f8;
                    text-decoration: underline;
                }
            }
            &.loadMore{
                text-align: center;
                border: 0;
                i{
                    display: inline-block;
                    position: relative;
                    animation: rotat 1.3s linear infinite;
                }
                @keyframes rotat {
                    0%{
                        transform: rotate(0);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }
    .btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: solid 1PX #191f251f;
        display: flex;
        justify-content: space-between;
        padding: 24px 32px;
        background: #fff;
        span{
            width: 300px;
            text-align: center;
            line-height: 72px;
            background: #409eff;
            color: #fff;
            border-radius: 8px;
        }
    }
}
</style>
