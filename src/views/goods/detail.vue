<template>


  <div class="detail-container">
    <div class="goods-image">
      <!--            <img :src="goodsDetail.pictureUrl" alt/>-->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="goods-info">
      <div class="info-left">
        <div class="tag-icon">百亿补贴</div>
        <div class="price">
          <span>￥</span>
          <span>{{ goodsDetail.price }}</span>
        </div>
        <div class="old-price">
          <span>原价￥{{ goodsDetail.marketPrice }}</span>
          <span class="tag">8折</span>
        </div>
      </div>
      <div class="info-right">
        <span>百亿补贴</span>
      </div>
    </div>
    <div class="goods-detail">
      <div class="h3">{{ goodsDetail.name }}</div>
      <div class="h6">{{ goodsDetail.title }}</div>
    </div>
    <div class="goods-content">
      <div class="item-top">
        <div class="text">假一赔十，100%保证</div>
      </div>
      <div class="goods-banner">
        <div v-for="(item, index) in goodsDetail.productRightsList" :key="index">
          <div class="item" v-if="item.type == '2'">
            <div class="icon">
              <img :src="item.icon" alt/>
            </div>
            <div class="text">{{ item.describe }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="goods-rule">
      <div class="select" @click="showBaseFun">
        <div class="div1">选择</div>
        <div class="div2">请选择规格</div>
        <van-icon name="arrow"/>
      </div>
      <div class="params">
        <div class="div1">参数</div>
        <div class="div2">品牌 {{ goodsDetail.brand }}</div>
        <van-icon name="arrow"/>
      </div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="首页" dot/>
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart"/>
      <van-goods-action-icon icon="star" text="收藏" badge="0"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="showBaseFun"/>
      <van-goods-action-button type="danger" text="立即购买" @click="showBaseFun"/>
    </van-goods-action>
    <div class="goods-title">
      <div class="after"></div>
      商品评价
    </div>
    <div v-for="(item,index) in access" :key="index" class="access">
      <div class="access-user">
        <div class="access-head">
          <img
              round
              width="40px"
              height="40px"
              :src="item.headImg"
          />
        </div>
        <div class="access-name">
          <span>{{ item.nickName }}</span>
          <van-rate v-model="item.branch" size="10px"/>
        </div>
      </div>
      <div class="access-text">
        <span style="font-size: 14px">{{ item.text }}</span>
      </div>
      <div class="access-img">
        <img
            width="80px"
            height="80px"
            :src="item.img"
            style="margin-right: 5px"
            v-for="(item,index) in item.accessImg"
        />
      </div>
    </div>
    <div class="goods-title">
      <div class="after"></div>
      商品详情
    </div>

    <div class="product-detail">
      <img v-for="img in detailImg" v-lazy="img" width="100%" height="100%" alt=""/>
      <van-sku
          v-model="showBase"
          :sku="sku"
          :goods="goods"
          :goods-id="goodsId"
          :hide-stock="true"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"

      >
      </van-sku>
    </div>
  </div>
</template>
<script>
import {goodsDetail, goodsRule} from "../../api/goods";
import {addCart} from "../../api/cart";
import {Lazyload} from 'vant';
import Vue from 'vue';
import {Rate} from 'vant';
import {Toast} from 'vant';

Vue.use(Toast);
Vue.use(Rate);
Vue.use(Lazyload);

export default {
  data() {
    return {
      images: [],
      access: [
        {
          headImg: "http://ftp.52jdk.com/head.png",
          nickName: '因为太帅被罚5块',
          branch: 5,
          text: "东西很nice，我很喜欢，女友60大寿送的",
          accessImg: [
            {
              img: 'http://ftp.52jdk.com/access-1.jpg'
            },
            {
              img: 'http://ftp.52jdk.com/access-2.jpg'
            }
          ],
        },
        {
          headImg: "http://ftp.52jdk.com/head.png",
          nickName: '装逼过头你不遭雷劈吗',
          branch: 5,
          text: "还行，也就一顿早餐的钱",
        }
      ],
      detailImg: [],
      value: 5,
      goodsDetail: {
        pictureUrl: "",
        marketPrice: 0
      },
      showBase: false,
      // sku:{},
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        list: [],
        price: 0,
        stock_num: 0,
        none_sku: false,
        hide_stock: false
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: ""
      },
      goodsId: ""
    };
  },
  created() {
    const {id} = this.$route.params;
    this.productId = id;
    if (typeof (id) == 'undefined') {
      this.productId = JSON.parse(localStorage.getItem("productId"));
    } else {
      let obj = JSON.stringify(id); //转化为JSON字符串
      localStorage.setItem("productId", obj); //数据存storage，防止刷新丢失
    }
    this.getGoodsList();
    this.getGoodsRule();
  },
  methods: {
    // 获取商品规格
    getGoodsRule() {
      let {productId} = this;
      goodsRule(productId).then(res => {
        // this.goodsDetail = res.data;
        this.sku.tree = res.data.tree;
        this.sku.list = res.data.list;
        this.sku.price = res.data.price;
        this.sku.stock_num = res.data.stock_num;
        this.none_sku = res.data.none_sku;
        this.hide_stock = res.data.hide_stock;
      });
    },
    showBaseFun() {
      // getVal();
      this.showBase = true;

    },

    onBuyClicked(data) {
      addCart(data).then(res => {
        if (res.code == "0000") {
          this.$router.push('/cart');
          this.showBase = false;
        } else {
          Toast.fail('失败');
        }
      });
    },

    onAddCartClicked(data) {
      let {} = this;
      addCart(data).then(res => {
        if (res.code == "0000") {
          Toast.success("添加成功");
        } else {
          Toast.fail('添加失败');
        }
      });
      this.showBase = false;
    },
    getGoodsList() {
      let {productId} = this;
      goodsDetail(productId).then(res => {
        if (res.code == "0000") {
          this.goodsDetail = res.data;
          if (typeof this.goodsDetail.marketPrice == 'undefined') {
            this.goodsDetail.marketPrice = res.data.price / 0.8
          }
          this.images = res.data.productImg.rollImg.split(",")
          this.detailImg = res.data.productImg.detailImg.split(",")
          this.goods.picture = res.data.productImg.rollImg.split(",")[0];

        } else {
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
.goods-title {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 13px;
  box-sizing: border-box;
  width: 132px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(151, 118, 80, 1);

  .after {
    width: 3px;
    height: 11px;
    background: linear-gradient(0deg, rgba(255, 212, 145, 1), rgba(212, 157, 70, 1));
    border-radius: 2px;
    margin-right: 13px;
  }
}

.detail-container {
  background-color: #f5f5f5;

  .goods-info {
    height: 96px;
    background: linear-gradient(90deg,
    rgba(246, 81, 50, 1),
    rgba(217, 24, 21, 1));
    color: #fff;
    display: flex;
    justify-content: space-between;

    .info-left {
      flex: 1;

      .tag-icon {
        width: 50px;
        height: 20px;
        background: linear-gradient(90deg,
        rgba(255, 212, 145, 1),
        rgba(212, 157, 70, 1));
        border-radius: 0px 0px 5px 5px;
        color: rgba(85, 60, 31, 1);
        text-align: center;
        font-size: 10px;
        line-height: 20px;
        margin-left: 12px;
      }
    }

    pn
    .price {
      margin: 8px 0 8px 10px;

      span:nth-child(2) {
        font-size: 30px !important;
        font-weight: bold;
      }
    }

    .old-price {
      margin-left: 10px;
      font-size: 12px;

      span:nth-child(1) {
        text-decoration: line-through;
      }

      .tag {
        padding: 1px 3px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 2px;
        color: #fff;
        font-size: 12px;
        margin-left: 10px;
      }
    }

    .info-right {
      width: 162px;
      height: 96px;
      background: url("http://libiaoimg.oss-cn-beijing.aliyuncs.com/user/icon/goods_details/biaotiBgc.png") no-repeat;
      background-size: 100% 100%;
      color: #b87a35;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      line-height: 96px;
    }
  }

  .goods-detail {
    width: 375px;
    height: 100px;
    background-color: #fff;
    padding: 21px 19px 21px 12px;
    color: #333;
    box-sizing: border-box;

    .h3 {
      width: 100%;
      font-size: 15px;
      font-weight: 500;
      text-overflow: -o-ellipsis-lastline;
      /*overflow: hidden;*/
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 20px;
    }

    .h6 {
      width: 100%;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }

  .goods-image {
    img {
      width: 375px;
      height: 375px;
      display: block;
    }
  }
}

.goods-content {
  width: 100%;
  height: 75px;
  background-color: #fff;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.goods-banner {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1;

  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;

    img {
      width: 15px;
      height: 15px;
      display: block;
      margin-right: 10px;
    }
  }
}

.item-top {
  color: rgba(85, 60, 31, 1);
  font-weight: bold;
  font-size: 15px;
  flex: 1;
  display: flex;
  align-items: center;
}

.goods-rule {
  width: 100%;
  height: 85px;
  background-color: #fff;
  padding: 0 12px;
  box-sizing: border-box;
  margin-bottom: 10px;

  .select,
  .params {
    height: 42px;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    font-size: 13px;

    .div1 {
      width: 36px;
      height: 100%;
      line-height: 42px;
      font-weight: 500;
      color: rgba(120, 120, 120, 1);
    }

    .div2 {
      flex: 1;
      height: 100%;
      line-height: 42px;
      color: rgba(51, 51, 51, 1);
    }

    .van-icon-arrow {
      height: 100%;
      line-height: 42px;
    }
  }

  .params {
    border: none !important;
  }
}

.detail-img {
  width: 200px;
  height: 200px;
}


.access-head {
  width: 50px;
}

.access-name {
  width: 120px;
  margin-top: -38px;
  margin-left: 50px;
  color: #999999;
}

.access-text {
  margin-top: 12px;
  margin-left: 10px;
}

.price {
  font-size: 25px;
}

.access-img {
  margin-top: 10px;
  margin-left: 10px;
}

.access {
  border-bottom: 2px solid #fff;
  margin-top: 3px;
}

</style>
