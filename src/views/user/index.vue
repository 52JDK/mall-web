<template>
    <div class="person-center">

        <div class="my-head" v-if="nickname!=null">
            <div class="head-img">
                <img width="50px" height="50px" alt="" :src="headImg"/>
                <label>{{nickname}}</label>
                <button><i class="iconfont iconjifen"></i> 每日签到</button>
            </div>
        </div>
        <div class="my-vip">
            <div class="vip-description">
                <p class="vip-text">
                    开通超级会员
                    <img src="../../assets/images/ar.png" width="16" height="16" alt=""/>
                </p>
                <p>可享95折专享价免邮费等权益</p>
            </div>
            <div class="vip-icon">
                <van-icon name="vip-card" size="40px"/>
            </div>
        </div>
        <div class="my-order">
            <div class="my-order-cell">
                <van-cell title="我的订单" value="查看全部订单" @click=""  is-link to="/order/orderList" title-class="my-order-list" size="16px"/>
            </div>
            <div>
                <van-grid :border="false" icon-size="22px" :column-num="5">
                    <van-grid-item icon="todo-list-o" text="待付款" url="" :badge="tobePay" :to="{ name: 'orderList', params: { active: 0 }}"/>
                    <van-grid-item icon="logistics" text="待发货" url="" :badge="pay" :to="{ name: 'orderList', params: { active: 1 }}"/>
                    <van-grid-item icon="send-gift-o" text="待收货" url="" :badge="tobeDelivered" :to="{ name: 'orderList', params: { active: 2 }}"/>
                    <van-grid-item icon="notes-o" text="待评价" url="" :badge="received" :to="{ name: 'orderList', params: { active: 3 }}"/>
                    <van-grid-item icon="after-sale" text="售后" url=""/>
                </van-grid>
            </div>
        </div>
        <div class="swipe">
            <van-swipe>
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" width="100%" alt=""/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <other class="other-icon"/>
        <div class="recommend-product">
            <van-divider>为你推荐</van-divider>
        </div>
    </div>
</template>

<script>
    import other from "./other";
    import Vue from 'vue';
    import {Grid, GridItem} from 'vant';
    import {Icon} from 'vant';
    import {Cell, CellGroup} from 'vant';
    import {Image as VanImage} from 'vant';
    import {Swipe, SwipeItem} from 'vant';
    import {Lazyload} from 'vant';
    import {Divider} from 'vant';
    import {personCenter} from "../../api/user";

    Vue.use(Divider);
    Vue.use(Lazyload);
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(VanImage);
    Vue.use(Cell);
    Vue.use(CellGroup);

    Vue.use(Icon);
    Vue.use(Grid);
    Vue.use(GridItem);
    export default {
        components: {other},
        data() {
            return {
                nickname: '',
                tobePay: '',
                pay: '',
                tobeDelivered: '',
                received: '',
                headImg: '',
                images: [
                    'http://ftp.52jdk.com/banner-1.jpg',
                    'http://ftp.52jdk.com/banner-2.jpg',
                ],
            };
        },
        created() {
            this.personCenter();
        },

        methods: {
            personCenter() {
                personCenter().then(res => {
                    this.nickname = res.data.data.user.userName;
                    this.headImg = res.data.data.user.headImg;
                    if (res.data.data.tobePay > 0) {
                        this.tobePay = res.data.data.tobePay;
                    }
                    if (res.data.data.tobeDelivered > 0) {
                        this.tobeDelivered = res.data.data.tobeDelivered;
                    }
                    if (res.data.data.received > 0) {
                        this.received = res.data.data.received;
                    }
                    if (res.data.data.pay > 0) {
                        this.pay = res.data.data.pay;
                    }
                })
            },
        },
      goOrderList(){
        this.$router.push({path:'/order/orderList'})

      },
    }

</script>
<style>

    .recommend-product {
        padding-top: 20px;
    }

    .swipe {
        width: 94%;
        margin-left: 3%;
        margin-top: 14px;

    }

    .van-swipe {
        border-radius: 10px;
    }

    .my-order {
        width: 94%;
        margin-left: 3%;
        margin-top: 14px;
        border-radius: 10px;
        height: 120px;
        background-color: white;

    }

    .van-grid-item__content {
        padding-top: 13px !important;
    }

    .head-img label {
        padding-left: 2%;
    }

    .head-img img {
        border: 3px solid #fff;
        border-radius: 50%;
        vertical-align: -18px;
        margin-left: 6%;
    }

    .head-img button {
        border-radius: 4%;
        font-size: 12px !important;
        background-color: #bb9951;
        width: 80px;
        height: 20px;
        border: none;
        float: right;
        margin-right: 20px;
        margin-top: 15px;
    }

    .my-order-cell {
        padding-top: 8px;
    }

    .other-icon {
        margin-top: 14px;

    }

    .my-vip {
        width: 94%;
        margin-left: 3%;
        height: 60px;
        margin-top: -30px;
        background-image: linear-gradient(to right, #281F0D, #5D5139);
        border-radius: 10px;
        color: #f1debd;
    }

    .my-head {
        background-image: linear-gradient(to right, #dfc48e, #c4a566);
        width: 100%;
        height: 130px;
    }

    .head-img {
        padding-top: 10%;
        color: white;
        font-size: 18px;

    }

    .head-img label {
        padding-left: 2%;
    }

    .head-img img {
        border: 3px solid #fff;
        border-radius: 50%;
        vertical-align: -18px;
        margin-left: 6%;
    }

    .head-img button {
        border-radius: 4%;
        font-size: 12px !important;
        background-color: #bb9951;
        width: 80px;
        height: 20px;
        border: none;
        float: right;
        margin-right: 20px;
        margin-top: 15px;
    }

    .vip-description {
        padding-top: 10px;
        margin-left: 10%;
        width: 60%;
    }

    .vip-text {
        font-size: 16px;
        font-weight: bolder;

    }

    .vip-text img {
        vertical-align: -2px;
    }

    .vip-icon {
        float: right;
        margin-top: -35px;
        margin-right: 10px;
    }
</style>
