<template>
    <div>
        <div class="goods-title">
            <div class="after"></div>
            {{ title }}
        </div>
        <div class="nav-img" v-if="type=='navImg'">
            <van-swipe
                :autoplay="3000"
            >
            <van-swipe-item
                class="swipe-item"
            >
            <div class="item" v-for="(item,index) in list" :key="index">
                <img :src="item" alt="">
            </div>
            </van-swipe-item>   
            </van-swipe>
        </div>
        <div class="goods-list" v-if="type=='goods'">
                    111111111
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goods',
        data() {
            return {
                list:[
                   "http://lppzcup.oss-cn-shanghai.aliyuncs.com//8b7dbc096bb045029ed42f33dace966e.jpg",
                   "http://lppzcup.oss-cn-shanghai.aliyuncs.com//8b7dbc096bb045029ed42f33dace966e.jpg" ,
                   "http://lppzcup.oss-cn-shanghai.aliyuncs.com//8b7dbc096bb045029ed42f33dace966e.jpg",
                   "http://lppzcup.oss-cn-shanghai.aliyuncs.com//8b7dbc096bb045029ed42f33dace966e.jpg" ,
                   "http://lppzcup.oss-cn-shanghai.aliyuncs.com//8b7dbc096bb045029ed42f33dace966e.jpg",
                   "http://lppzcup.oss-cn-shanghai.aliyuncs.com//8b7dbc096bb045029ed42f33dace966e.jpg" 
                ]
            }
        },
        props: {
            data: Object,
            title:{
                type:String,
                default:'标题'
            },
            type:{
                type:String,
                default:'navImg'
            }
        },
        created: function () {
        },
        methods: {
        }
    }

</script>
<style lang="less">
    .goods-title{
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 13px;
        box-sizing: border-box;
        width:132px;
        font-size:16px;
        font-weight:500;
        color:rgba(151,118,80,1);
        .after{
            width: 3px;
            height:11px;
            background:linear-gradient(0deg,rgba(255,212,145,1),rgba(212,157,70,1));
            border-radius:2px;
            margin-right:13px;
        }
    }
    .swipe-item{
        padding:0 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        flex-wrap:wrap;
        .item{
            width: 111px;
            height:111px;
            margin-right:9px;
            &:nth-child(3n+0){
                margin-right: 0;
            }
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
</style>


