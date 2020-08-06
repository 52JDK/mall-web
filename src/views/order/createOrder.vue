<template>
    <div class="order-main">
        <van-notice-bar
                left-icon="volume-o"
                text="受道路封闭影响，发往新疆区域及大连市、鹤岗市的订单派送将有所延迟，请见谅。"
                mode="closeable"
        />
        <div class="address-main">
            <div class="order-address">
                <div class="address" @click="choseAddress">
                    <div class="order-address-name">
                        <span>
                        {{name}}
                    </span>
                        <span>
                        {{phone}}
                    </span>
                    </div>
                    <div class="order-detail-address">
                        <span>{{address}}</span>
                    </div>
                </div>

                <div class="address-chose" @click="choseAddress">
                    <van-icon name="arrow" size="16px" color="#b3b3b3"/>
                </div>
            </div>
        </div>


        <div class="order-product">
            <div class="order-product-img">
                <swiper class="swiper">
                    <div class="swiper-slide" :key="banner" v-for="banner in banners">
                        <swiper-slide>
                            <img :src=banner width="62px" height="62px">
                        </swiper-slide>
                    </div>
                </swiper>
            </div>
            <div class="order-product-to">
                <div class="order-product-num">
                    <span> 共100件</span>
                </div>
                <div class="order-product-icon">
                    <van-icon name="arrow" size="16px" color="#b3b3b3"/>
                </div>
            </div>
        </div>
        <div class="product-balance">
            <div class="product-balance-detail">
                <!-- 优惠券单元格 -->
                <van-coupon-cell
                        :coupons="coupons"
                        :chosen-coupon="chosenCoupon"
                        @click="showList = true"
                />
                <!-- 优惠券列表 -->
                <van-popup
                        v-model="showList"
                        round
                        position="bottom"
                        style="height: 90%; padding-top: 4px;"
                >
                    <van-coupon-list
                            :coupons="coupons"
                            :chosen-coupon="chosenCoupon"
                            :disabled-coupons="disabledCoupons"
                            @change="onChange"
                            @exchange="onExchange"
                    />
                </van-popup>
                <van-cell title="礼品卡" value="暂无" disabled/>
                <van-cell title="发票" value="不开发票" v-model="show" is-link position="bottom" @click="showPopup">
                    {{invoiceValue}}
                </van-cell>
                <van-popup v-model="show" position="bottom" round>
                    <invoice></invoice>

                </van-popup>
            </div>
        </div>

        <div class="balance-amount">
            <div class="balance-amount-detail">
                <van-cell-group :border="false">
                    <van-cell title="商品金额" value="￥4999.99" :border="false"/>
                    <van-cell title="运费" value="-￥100.00" :border="false"/>
                    <van-cell title="金豆" value="-￥10.00" :border="false"/>
                    <van-cell title="运费" value="￥10.00" :border="false"/>
                </van-cell-group>
            </div>
        </div>
        <div>

            <van-submit-bar price="11111" button-text="支付" :loading="loading" @submit="onSubmit "
                            to="/order/createOrder">
                <div class="bottom-price">
                    <span> 应付：</span>
                    <span style="font-size: 16px">￥10000</span>
                </div>
            </van-submit-bar>
        </div>
    </div>

</template>

<script>
    import Vue from 'vue';
    import {NoticeBar, Toast} from 'vant';
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import {CouponCell, CouponList} from 'vant';
    import {Form} from 'vant';
    import invoice from './invoice'
    import {Overlay} from 'vant';

    Vue.use(Overlay);
    Vue.use(Form);
    Vue.use(CouponCell);
    Vue.use(CouponList);
    Vue.use(NoticeBar);
    const coupon = {
        available: 1,
        condition: '无使用门槛\n最多优惠12元',
        reason: '',
        value: 150,
        name: '优惠券名称',
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: '1.5',
        unitDesc: '元',
    };

    export default {

        name: 'swiper-example-responsive-breakpoints',
        title: 'Responsive breakpoints',
        components: {      // Invoice,
            invoice,
            Swiper,
            SwiperSlide
        },
        data() {
            return {
                // banners: ['http://52jdk.com/head.jpeg'],
                couponValue: "暂无可用",
                chosenCoupon: -1,
                showList: false,
                loading: false,
                addressId: 0,
                name: "",
                phone: "",
                address: "",
                isShow: false,
                invoiceValue: "暂不开票",
                show: false,
                username: '',
                password: '',
                coupons: [coupon],
                disabledCoupons: [coupon],
                banners: ['http://52jdk.com/head.jpeg', 'http://52jdk.com/head.jpeg', 'http://52jdk.com/head.jpeg'],
            }
        },

        created() {
            this.getParams()
        },

        methods: {
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            onExchange(code) {
                this.coupons.push(coupon);
            },
            showPopup() {
                this.show = true;
            },
            choseAddress() {
                this.$router.push({
                    path: '/order/addressList',
                    query: {
                        id:this.addressId
                    }})
            },
            getParams() {
                // 取到路由带过来的参数
                let routerParams = this.$route.query;
                // 将数据放在当前组件的数据内
                this.name = routerParams.name;
                this.phone = routerParams.phone;
                this.address = routerParams.address;
                this.addressId = routerParams.id;
            }
        },
        watch: {
            '$route': 'getParams'
        }
    }

</script>

<style>

    .order-main {


    }

    .order-address {
        width: 94%;
        height: 95px;
        margin-left: 3%;
        margin-top: 6%;
        padding-bottom: 2px;
        box-sizing: border-box;

        background: linear-gradient(45deg, #f25953 12.5%, #fbfaf5 12.5%, #fbfaf5 25%, #5590d6 25%, #5590d6 37.5%, #fbfaf5 37.5%, #fbfaf5 50%, #f25953 50%, #f25953 62.5%, #fbfaf5 62.5%, #fbfaf5 75%, #5590d6 75%, #5590d6 87.5%, #fbfaf5 87.5%, #fbfaf5 100%);
        background-size: 30px 30px;
    }

    .address-main {
        margin-left: 5%;
        width: 90%;
        height: 95px;
        border-radius: 10px;
        background: #FFF;

    }

    .order-product {
        margin-top: 20px;
        margin-left: 5%;
        width: 90%;
        height: 100px;
        border-radius: 10px;
        background: #FFF;
    }

    .address {
        width: 94%;
        height: 100%;
        float: left;
        background: #FFF;
    }

    .order-address-name {
        width: 100%;
        height: 50%;
        float: left;
        line-height: 60px;
        margin-left: 3%;
        background: #FFF;
    }

    .order-detail-address {
        margin-left: 3%;
        background: #FFF;
    }

    .order-address-name span {
        font-size: 16px;
        font-weight: bold;
        background: #FFF;
    }

    .swiper-slide {
        width: 75px;
        height: 75px;
    }

    .address-chose {
        width: 6%;
        height: 100%;
        float: left;
        text-align: center;
        line-height: 100px;
        background: #FFF;
    }

    .swiper-slide {
        width: 80px !important;
        margin-top: 10px;
    }

    .order-product-img {
        width: 72%;
        float: left;
    }

    .order-product-to {
        width: 26%;
        float: left;
        font-size: 13px;
        /*position: absolute;*/
    }

    .order-product-num {
        width: 68%;
        float: left;
        font-size: 13px;
        height: 100%;
        margin-left: 8%;
    }

    .order-product-icon {
        width: 18px;
        height: 100%;
        float: left;
        text-align: center;
        line-height: 100px;
        background: #FFF;
    }

    .order-product-to span {

        line-height: 90px;
        margin-left: 10px;
    }

    .product-balance {
        margin-top: 20px;
        margin-left: 5%;
        width: 90%;
        height: 146px;
        border-radius: 10px;
        background: #FFF;

    }

    .balance-amount {
        margin-top: 20px;
        margin-left: 5%;
        width: 90%;
        height: 200px;
        border-radius: 10px;
        background: #FFF;

    }

    .balance-amount-detail {
        padding-top: 6px;
    }

    .product-balance-detail {
        padding-top: 6px;
    }

    .invoice {
        width: 100%;
        height: 500px;
    }

    .bottom-price {
        color: #E55050;
        margin-right: 35%;
    }

</style>
