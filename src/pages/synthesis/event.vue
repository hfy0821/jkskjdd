<template>
    <div class="synthesis_warp">
        <form class="search" action=".">
            <input type="text" style="display:none;"/>
            <input ref="input" type="search" @keydown.enter="search" v-model="keyword" placeholder="搜索">
            <i  class="iconfont icon-sousuo"></i>
        </form>
        <div class="tab">
            <Nav :tabs="tabs" :tabIndex="tabIndex" @changeIndex="changeIndex"></Nav>
        </div>
        <ul class="list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li v-for="(v,i) in list" :key="i" @click="toDetail(v.id)">
                <h4>{{v.title}}</h4>
                <p>高翔村部分村民因二产返还指标问题长期未得到妥善处置，而多次到属地街道、C-47地块及区行政中心而多次到属地街道、C-47地块及区行政中心</p>
                <div>
                    <span>{{v.roadId&&streetList.length&&streetList[v.roadId].name}}</span>
                    <i>
                        <b class="iconfont icon-time"></b>
                        <s>{{v.teamWorkTime}}</s>
                    </i>
                </div>
            </li>
            <li v-if="!noMore" class="loadMore">
                <i class="iconfont icon-Loading"></i>
                加载中...
            </li>
            <li v-if="noMore" class="loadMore">
                没有更多了...
            </li>
        </ul>
        <div class="report" @click="add">
            <i class="iconfont icon-daohanglan"></i>
            <p>上报</p>
        </div>
    </div>
</template>
<script>
import Nav from "../../components/tab";
export default {
    name: 'synthesis',
    components:{
        Nav
    },
    data(){
        return{
            keyword: '',
            loading: false,
            noMore: false,
            tabs: [{name: '待办事件'},{name: '已批转'},{name: '已办结'},{name: '草稿箱'}],
            tabIndex: 1,
            list: [],
            params: {
                teamworkType: 1,
                eventHandleType: 1
            }
        }
    },
    computed: {
        streetList () {
            return this.$store.state.common.streetList
        }
    },
    created(){
        this.getData()
    },
    methods:{
        async  getData(){
            this.params.keyword = this.keyword
            if(this.tabIndex===1&&this.subTabIndex===1){
                this.params.dataType = 1
                this.params.type = 7
            }else if(this.tabIndex===1&&this.subTabIndex===2){
                this.params.dataType = 2
                this.params.type = 8
            }else if(this.tabIndex===1&&this.subTabIndex===3){
                this.params.dataType = 3
                this.params.type = 9
            }else if(this.tabIndex===1&&this.subTabIndex===4){
                this.params.dataType = 5
                this.params.type = 10
            }else if(this.tabIndex===2){
                this.params.dataType = 4
                this.params.type = 11
            }else if(this.tabIndex===3){
                this.params.dataType = 0
                this.params.type = 12
            }
            const data = await getEventListByTodoForAPP(this.params)
            if(data.success){
                console.log(data)
                this.list = data.data.list
            }
        },
        search(){
            this.getData()
            this.$refs.input.blur()
        },
        changeIndex(i){
            console.log(i)
            this.tabIndex = i
        },
        loadMore() {
            if(this.list.length>=50){
                this.noMore = true
                return
            }
            this.loading = true;
            setTimeout(() => {
                let last = this.list[this.list.length - 1];
                for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
                }
                this.loading = false;
            }, 1000);
        },
        toDetail(id){
            this.$router.push('synthesis/detail?id=1231231')
        }
    }
}
</script>
<style lang="less" scoped>
.synthesis_warp{
    .search{
        padding: 12px 32px;
        position: relative;
        input{
            width: 100%;
            height: 72px;
            // line-height: 72px;
            background: @bgColor;
            padding-left: 72px;
            background: #dddddd;
            font-size: 30px;
        }
        i{
            font-size: 36px;
            position: absolute;
            left: 52px;
            top: 30px;
        }
    }
    .tab{
        box-shadow: 0px 1PX 0px 0px 
		rgba(25, 31, 37, 0.12);
    }
    .list{
        padding: 0 32px;
        li{
            padding: 24px 0;
            border-bottom: solid 1PX #d6d6d6;
            h4{
                font-size: 32px;
                font-weight: 600;
                margin-bottom: 20px;
                .cf>.text-overflow-1()
            }
            p{
                line-height: 40px;
                .cf>.text-overflow;
            }
            div{
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                span{
                    color: #f4ae4a;
                    font-size: 24px;
                }
                i{
                    b{
                        opacity: .6;
                        font-size: 24px;
                    }
                    s{
                        font-size: 24px;
                        opacity: .6;
                    }
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
    .report{
        position: fixed;
        right: 1px;
        bottom: 20%;
        width: 112px;
        height: 112px;
        border-radius: 50%;
        background-image: linear-gradient(135deg, #44abf0 0%, #4043f3 100%), linear-gradient(#4441f7, #3c4ffd);
        text-align: center;
        padding-top: 10px;
        i{
            color: #fff;
            font-size: 48px;
        }
        p{
            color: #fff;
            font-size: 24px;
        }
    }
}
</style>
