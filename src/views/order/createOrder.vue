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
                        {{ name }}
                    </span>
            <span>
                        {{ phone }}
                    </span>
          </div>
          <div class="order-detail-address">
            <span>{{ address }}</span>
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
          <div class="swiper-slide" :key="banner.sku" v-for="banner in banners">
            <swiper-slide>
              <img :src=banner.image width="68px" height="68px">
            </swiper-slide>
          </div>
        </swiper>
      </div>
      <div class="order-product-to" @click="toProduct">
        <div class="order-product-num">
          <span> {{ totalNum }}件</span>
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
            @click="findCoupon"
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
        <van-cell title="礼品卡">暂无</van-cell>
        <van-cell title="积分">暂无</van-cell>
      </div>
    </div>

    <div class="balance-amount">
      <div class="balance-amount-detail">
        <van-cell-group :border="false">
          <van-cell title="商品金额" :border="false">
            ￥{{ totalAmount }}
          </van-cell>
          <van-cell title="金豆" :border="false">
            -￥{{ point }}
          </van-cell>
          <van-cell title="优惠券" :border="false">
            -￥{{ couponDiscount }}
          </van-cell>
          <van-cell title="运费" :border="false">
            ￥{{ freight }}
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <div>

      <van-popup v-model="show" round>
        <div class="pay-code-div">
          <div class="wx-pay-text">
            <img src="../../assets/images/wxlog.png" width="40px" height="40px"/>
            <a>微信支付</a>
          </div>

          <div class="pay-code">
            <img class="code" :src="payUrl" alt="">
          </div>
          <div class="pay-warn">
            <a disabled="true">长按识别二维码支付</a>
          </div>
        </div>
        <van-button style="width: 100%;" type="primary" @click="paySuccess">支付成功</van-button>
      </van-popup>


      <van-submit-bar button-text="支付" :loading="loading"
                      @submit="createOrder()">
        <div class="bottom-price">
          <span> 应付：</span>
          <span style="font-size: 16px;font-weight: bolder">￥{{ payAmount }}</span>
        </div>

      </van-submit-bar>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import {NoticeBar} from 'vant';
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import {CouponCell, CouponList} from 'vant';
import {Form} from 'vant';
import invoice from './invoice'
import {Overlay} from 'vant';
import {orderSure, createOrder, orderPay} from "../../api/order";
import {Popup} from 'vant';
import {Toast} from 'vant';
import {Tag} from 'vant';

Vue.use(Tag);
Vue.use(Toast);
Vue.use(Overlay);
Vue.use(Form);
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(NoticeBar);
Vue.use(Popup);

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
      totalAmount: 0,
      addressId: 0,
      name: '',
      point: 0,
      freight: 0,
      phone: '',
      address: '',
      invoiceValue: "暂不开票",
      show: false,
      username: '',
      password: '',
      payUrl: '',
      payAmount: 0,
      totalNum: 0,
      coupons: [],
      disabledCoupons: [],
      banners: [],
      couponDiscount:0,
    }
  },

  mounted() {
    let routerParams = this.$route.query;
    this.orderSure(routerParams, false);
    this.getOrderParams();

  },


  methods: {

    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      let data = {
        addressId: this.addressId,
        couponId: this.coupons[index].couponId
      }
      this.orderSure(data, true);
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
          id: this.addressId
        }
      })
    },
    createOrder() {
      let data = {
        addressId: this.addressId,
        couponId: this.couponId,
        remark: this.remark,
        payAmount: this.payAmount,
      };

      createOrder(data).then(res => {
        if (res.code == '0000') {
          orderPay(res.data).then(ress => {
            this.payUrl = ress.data;
            this.show = true;
          })
        } else {
          Toast.fail("系统异常")
        }
      })
    },

    orderSure(routerParams, choseCoupon) {
      orderSure(routerParams).then(res => {
        this.name = res.data.name;
        this.phone = res.data.phone;
        this.address = res.data.addressDetail;
        this.addressId = res.data.addressId;
        this.totalAmount = res.data.cartResponse.total;
        this.banners = res.data.cartResponse.cartEntries;
        this.totalNum = res.data.cartResponse.totalNum;
        if (!choseCoupon) {
          this.coupons = res.data.userCoupon.sureCoupon;
          this.disabledCoupons = res.data.userCoupon.notUserCoupon;
        }

        this.point = res.data.point;
        this.freight = res.data.freight;
        this.payAmount = res.data.payAmount;
        this.couponDiscount=res.data.couponDiscount
      });
    },
    paySuccess() {
      this.$router.push({path: '/order/orderList'})

    },
    getOrderParams() {
      // 取到路由带过来的参数
      let routerParams = this.$route.query;
      // 将数据放在当前组件的数据内
      this.addressId = routerParams.id;
    },
    toProduct() {
      this.$route.push({
        path: '/order/orderProduct',
      })
    },
    findCoupon() {
      this.showList = true;
    }
  },
  watch: {
    '$route': 'getOrderParams'
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
  width: 80px;
  height: 80px;
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
  margin-left: 5px;
}

.order-product-to {
  width: 26%;
  float: left;
  font-size: 13px;
  /*position: absolute;*/
}

.order-product-num {
  width: 55%;
  float: left;
  font-size: 13px;
  height: 100%;
  margin-left: 8%;
}

.order-product-icon {
  width: 20px;
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

.pay-code-div {
  background: #25AB38;
  width: 220px;
  height: 260px;
}


.wx-pay-text {
  color: #FFFFFF;
  font-size: 30px;
  font-family: SONGTI, serif;
  width: 160px;
  height: 50px;
  margin: 0 auto;
}

.wx-pay-text img {
  vertical-align: -10px;
}

.pay-code {
  margin-left: 16%;
  margin-top: 10px;
}

.pay-warn {
  color: #FFFFFF;
  font-family: SONGTI, serif;
  font-size: 15px;
  /*margin: 0 auto;*/
  width: 150px;
  height: 20px;
  margin-top: 4px;
  margin-left: 18%;
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
  text-align: left;
  width: 70%;
}

</style>
