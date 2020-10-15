<template>
    <div class="goods-container">
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
             <van-list
                :finished="finished"
                 v-model="vantLoading"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="onLoad"
                :offset="1"
                v-if="type=='goods'"
            >
                <div id="list-content" class="goods-list">
                     <van-cell  class="goods-item" v-for="(item,index) in goodsList" :key="index" @click="tapDetail(item.productId)">
                      <van-skeleton title avatar :row="3" :loading="loading">
                    <div class="goods-img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="goods-info">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <div class="small-title">
                            {{ item.name }}
                        </div>
                        <div class="info">
                            <div class="price"><span>￥</span><span>{{ item.price }}</span></div>
                            <div class="cart-icon">
                                <img src="https://libiaoimg.oss-cn-beijing.aliyuncs.com/user/icon/goods_details/addcatr.png" alt="">
                            </div>
                        </div>
                    </div>
                </van-skeleton>
                </van-cell>
                </div>
             </van-list>
    </div>
</template>

<script>
    import { goodsListApi } from "../../api/goods"
    export default {
        name: 'goods',
        data() {
            return {
                pageSize:6,
                pageNum:1,
                vantLoading:false,
                loading:true,
                list:[
                ],
                goodsList:[],
                finished:false
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
            },
            optionId:{

            }
        },
        created: function () {
            let { type } = this;
           if(type=='goods'){
               this.getGoodsList();
           }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight                 //视口大小
            document.getElementById('list-content').style.minHeight = (winHeight - 82) +'px'  //调整上拉加载框高度
        },
        methods: {
            getGoodsList(){
                let { pageSize,pageNum,optionId } = this;
                let params = {
                    pageSize,
                    pageNum,
                    optionId

                }
                goodsListApi(params).then(res=>{
                   if(res.code=='0000'){
                        this.vantLoading = false;
                        let goodsList = this.goodsList||[];
                        this.goodsList = [...goodsList,...res.data];
                        this.loading  = false;
                        //表示没有下一页了
                        if(res.data.length<pageSize){
                             this.finished = true;
                        }
                   }
                })

            },
            onLoad(){
               this.pageNum++;
               this.getGoodsList();
            },
            tapDetail(id){
                this.$router.push({
                    name:'detail',
                    params:{id}
                })
            }
        }
    }

</script>
<style lang="less" scope>
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
            margin-bottom:9px;
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
    .goods-list{
        padding: 0 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
         flex-wrap: wrap;
    }

    .goods-item{
        width: 170px;
        height: 255px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 10px 0px rgba(135,135,135,0.16);
        border-radius:3px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 15px;
        padding: 0 !important;
        line-height:18px !important;
        .goods-img{
            width:170px;
            height: 170px;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .goods-info{
            flex: 1;
            padding: 0 10px;
            .title{
                white-space: nowrap;
                text-overflow: ellipsis;
                /*overflow: hidden;*/
                word-break: break-all;
                font-size:15px;
                font-weight:500;
                color:rgba(51,51,51,1);
                margin: 8px 0 5px 0;
            }
            .small-title{
                font-size:12px;
                font-weight:500;
                color:rgba(120,120,120,1);
            }
            .info{
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #E55050;
                .price{
                    span:nth-child(2){
                        font-size:18px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        color:rgba(229,80,80,1);
                    }
                }
                .cart-icon{
                    width:23px;
                    height: 23px;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
            }
        }
    }
    .van-list__loading{
        width: 100%;
        height: 50px;
    }
    .van-list__finished-text{
          width: 100%;
          display: block;
          text-align:center;
    }
</style>


