<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
      >
        <div class="order-table" v-for="(item,index) in orderList" :key="index">
          <div class="order-id-time">
            <div class="order-id">
              <a> 订单编号:{{ item.order.orderCode }}</a>
            </div>
            <div class="order-time">
              <a> {{ item.timeStr }}</a>
            </div>
          </div>
          <div class="order-product-simple">
            <div class="order-product-simple-img">
              <img :src="item.orderLine.image" height="80" width="80" alt="">
              <a>{{ item.orderLine.productName }}</a>
            </div>
            <div class="order-product-number">
              <a style="color: red;font-weight: bolder" class="order-product-price">&yen;
                {{ item.order.payAmount }}</a>
              <br/>
              <br/>
              <a>X {{ item.orderLine.quantity }}</a>
            </div>
          </div>
          <div :class="item.order.orderStatus ? 'order-product-count':'order-need-to-pay'">
            共<a style="color: red;font-weight: bolder">{{ item.order.totalNum }}</a>件商品
            ,
            应付总额:
            <a style="color: red;font-weight: bolder">&yen;
              {{ item.order.payAmount }}</a>
            <van-button v-if="item.order.orderStatus===0" class="pay-button" type="default" color="#DD1A21">

              <van-count-down :time="item.time" format="mm:ss" :auto-start="true"
                              style="color: white"/>
            </van-button>

          </div>
          <div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>

</template>
<script>
import Vue from 'vue';
import {Button} from 'vant';
import {CountDown} from 'vant';
import {findOrderList} from "../../api/order";

Vue.use(CountDown);

Vue.use(Button);
export default {
  name: "orderSimpleList",
  props: ['status'],
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 5,
      error: false,
      pageNumber: 1,
      active: 0,
      total: 1,
      orderList: [
        {
          order: {
            orderCode: '',
            timeStr: '',
            orderStatus: 0,
            payAmount: '',
            totalNum: 0,
            number: 0,
          },
          time: 0,
          orderLine: {
            productName: '',
            price: '',
            quantity: '',
          },
        }
      ],
    }
  },
  mounted() {

    this.onLoad();
  },
  methods: {

    onLoad() {
      this.loading = true;
      let data = {
        status: this.status,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      };
      findOrderList(data).then(res => {
          if (res.code === "0000") {
            const list = res.data || [];

            if (list == null) {
              this.finished = true;
              return;
            }
            if (list.length < this.pageSize) {
              this.orderList = list;
              this.finished = true;
              return;
            } else {
              if (this.pageNumber > 1) {
                this.orderList = [...this.orderList, ...list];
              } else {
                this.orderList = list;
              }
              this.pageNumber++;
            }
            this.total = list[0].total;
          } else {
            this.error = true;
          }
          this.loading = false;
        });
    },

    getListParams() {
      this.active = this.$route.params.active
    },
    beforeChange(index) {
    },
    onRefresh() {
      // 清空列表数据
      this.orderList = [];
      this.pageNumber = 1;
      this.finished = false;
      this.onLoad();
      this.refreshing = false;
    },
  },
}
</script>
<style>

.order-table {
  background-color: white;
  height: 185px;
  margin-top: 20px;
  width: 100%;
  font-family: PingFangSC-Light, helvetica, 'Heiti SC', serif;
  min-height: 185px
}

.order-product-simple {
  height: 105px;
  background-color: #F5F5F5;
}

.order-product-number {
  width: 25%;
  float: left;
  height: 50%;
  text-align: right;
  margin-top: 30px;

}

.order-product-price {
  padding-top: 20px;
}

.order-product-simple-img {
  width: 70%;
  padding-top: 14px;
  padding-left: 3%;
  float: left;

}

.order-product-number a {
  font-size: 14px;

}


.order-product-simple-img img {
  vertical-align: -50px;
}

.order-product-simple a {
  font-family: PingFangSC-Light, helvetica, 'Heiti SC', serif;
  margin-left: 10px;
  padding-top: -20px;
}

.order-need-to-pay {
  font-family: PingFangSC-Light, helvetica, 'Heiti SC', serif;
  line-height: 44px;
  font-size: 14px;
  width: 95%;
}

.order-product-count {
  font-family: PingFangSC-Light, helvetica, 'Heiti SC', serif;
  line-height: 44px;
  font-size: 14px;
  text-align: right;
  width: 95%;
}

.order-id-time {
  font-size: 14px;
  height: 36px;
  line-height: 36px;
}

.order-id {
  width: 54%;
  float: left;
  margin-left: 3%;
}

.pay-button {
  width: 70px;
  height: 30px;
  margin-left: 20px;
  float: right;
  margin-top: 6px;
  color: white;
}

.order-time {
  width: 40%;
  float: left;;
}
</style>
