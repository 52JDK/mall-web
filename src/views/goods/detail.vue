<template>
    <div class="detail-container">
        <div class="goods-image">
            <img :src="goodsDetail.pictureUrl" alt="">
        </div>
        <div class="goods-info">
            <div class="info-left">
                <div class="tag-icon">百亿补贴</div>
                <div class="price"><span>￥</span><span>159</span></div>
                <div class="old-price"><span>原价￥300</span><span class="tag">6折</span></div>
            </div>
            <div class="info-right">
                <span>百亿补贴</span>
            </div>
        </div>
        <div class="goods-detail">
            <div class="h3">{{ goodsDetail.subtitle }}</div>
            <div class="h6">{{ goodsDetail.title }}</div>
        </div>
        <!-- <div class="goods-banner">
            <img src="" alt="">
        </div> -->
        <div class="goods-rule">
            <div class=""></div>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="shop-o" text="首页" dot />
            <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
            <van-goods-action-icon icon="star" text="收藏" badge="12" />
            <van-goods-action-button type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>
<script>
import { goodsDetail } from "../../api/goods"
export default {
    data() {
        return {
           productId:'',
           goodsDetail:{}
        }
    },
    created() {
        const { id } = this.$route.params
        this.productId=id;
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            let { productId } = this;
            goodsDetail(productId).then(res=>{
              if(res.code=='0000'){
                  this.goodsDetail = res.data;
              }
            })
        }
    }
}
</script>
<style lang="less" scope>
    .detail-container{
        background-color: #f5f5f5;
          .goods-info{
        height: 96px;
        background:linear-gradient(90deg,rgba(246,81,50,1),rgba(217,24,21,1));
        color: #fff;
        display: flex;
        justify-content: space-between;
        .info-left{
            flex: 1;
            .tag-icon{
                width: 50px;
                height: 20px;
                background:linear-gradient(90deg,rgba(255,212,145,1),rgba(212,157,70,1));
                border-radius:0px 0px 5px 5px;
                color:rgba(85,60,31,1);
                text-align: center;
                font-size:10px;
                line-height: 20px;
                margin-left: 12px;
            }
        }
        .price{
             margin:8px 0 8px 10px;
             span:nth-child(2){
            font-size:25px;
            font-weight:bold;
           
        }
        }
        .old-price{
            margin-left:10px;
            font-size:12px;
            span:nth-child(1){
                 text-decoration:line-through;
            }
            .tag{
                padding: 1px 3px;
                border:1px solid rgba(255,255,255,1);
                border-radius:2px;
                color: #fff;
                font-size: 12px; 
                margin-left: 10px;
            }
        }
        .info-right{
            width:162px;
            height: 96px;
            background: url('http://libiaoimg.oss-cn-beijing.aliyuncs.com/user/icon/goods_details/biaotiBgc.png') no-repeat;
            background-size: 100% 100%;
            color: #B87A35;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            line-height: 96px;
        }
       
    }
      .goods-detail{
        width: 375px;
        height: 100px;
        background-color: #fff;
        padding: 21px 19px 21px 12px;
         color:#333;
         box-sizing: border-box;
        .h3{
            width: 100%;
            font-size:15px;
            font-weight:500;
             text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height:20px;
        }
        .h6{
             width: 100%;
             font-size:12px; 
              white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }
    }
      .goods-image{
        img{
            width: 375px;
            height: 375px;
            display: block;
        }
    }
    }
  
  
  
</style>