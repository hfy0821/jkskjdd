<template>
    <div class="confirm_warp">
        <h4>{{title}}</h4>
        <textarea v-model.trim="opinion" name="" id="" :placeholder="placeHolder"></textarea>
        <div class="accessory">
            <span>附件</span>
            <div>
                <p>1</p>
                <p>1</p>
                <p>1</p>
            </div>
            <b>
                <i class="iconfont icon-fujian"></i>
            </b>
        </div>
        <div class="btn">
            <span>{{btnTxt}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id: 0,
            placeHolder: '',
            title: '',
            btnTxt: '',
            opinion: '',
        };
    },
    mounted(){
        this.id = this.$route.params.id
        this.title = this.id ==1?'处置情况':'申请办结'
        this.btnTxt = this.id ==1?'确认':'申请办结'
        this.placeHolder = this.id ==1?'请输入处置意见':'请输入处理意见'
        document.title = this.title
        
    },
    methods: {
    }
}

</script>
<style lang="less" scoped>
.confirm_warp{
    height: 100vh;
    background: rgb(236, 236, 236);
    h4{
        line-height: 80px;
        opacity: .6;
        padding: 0 32px;
    }
    textarea{
        width: 100%;
        height: 300px;
        padding: 32px;
        font-size: 32px;
    }
    .accessory{
        display: flex;
        background: #fff;
        padding: 0 32px;
        span{
            line-height: 90px;
        }
        div{
            flex: 1;
            padding: 24px;
        }
        i{
            display: inline-block;
            color: #000;
            font-size: 40px;
            font-weight: 600;
            margin-top: 25px;
        }
    }
    .btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 32px;
        display: flex;
        span{
            width: 100%;
            line-height: 80px;
            text-align: center;
            background: #3296fa;
            color: #fff;
            border-radius: 6px;
        }
    }
}
</style>