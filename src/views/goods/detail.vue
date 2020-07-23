<template>
  <div class="detail-container">
    <div class="goods-image">
      <img :src="goodsDetail.pictureUrl" alt />
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
          <span class="tag">6折</span>
        </div>
      </div>
      <div class="info-right">
        <span>百亿补贴</span>
      </div>
    </div>
    <div class="goods-detail">
      <div class="h3">{{ goodsDetail.subtitle }}</div>
      <div class="h6">{{ goodsDetail.title }}</div>
    </div>
    <div class="goods-content">
      <div class="item-top">
        <div class="text">假一赔十，100%保证</div>
      </div>
      <div class="goods-banner">
        <div  v-for="(item, index) in goodsDetail.productRightsList" :key="index">
          <div class="item" v-if="item.type == '2'">
            <div class="icon">
              <img :src="item.icon" alt />
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
        <van-icon name="arrow" />
      </div>
      <div class="params">
        <div class="div1">参数</div>
        <div class="div2">品牌 面膜单品</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="首页" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon icon="star" text="收藏" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="true"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>
<script>
import { goodsDetail, goodsRule } from "../../api/goods";
export default {
  data() {
    return {
      productId: "",
      goodsDetail: {},
      showBase: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色",
            k_s: "s1",
            v: [
              {
                id: 1,
                name: "红色",
                attrId: 1,
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-2.png",
                sort: 999
              },
              {
                id: 2,
                name: "蓝色",
                attrId: 1,
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
                sort: 999
              }
            ]
          },
          {
            k: "尺寸",
            k_s: "s2",
            v: [
              {
                id: 3,
                name: "大",
                attrId: 2,
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-2.png",
                sort: 999
              },
              {
                id: 4,
                name: "小",
                attrId: 2,
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
                sort: 999
              }
            ]
          }
        ],
        list: [
          {
            id: "1000001",
            s1: 1,
            s2: 3,
            price: 20.0,
            stock_num: 20
          },
          {
            id: "1000002",
            s1: 1,
            s2: 4,
            price: 20.0,
            stock_num: 20
          },
          {
            id: "1000001",
            s1: 2,
            s2: 3,
            price: 20.0,
            stock_num: 20
          },
          {
            id: "1000002",
            s1: 2,
            s2: 4,
            price: 20.0,
            stock_num: 20
          }
        ],
        price: 20.0,
        stock_num: 20,
        none_sku: false,
        hide_stock: false
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://b.yzcdn.cn/vant/sku/shoes-2.png"
      },
      goodsId: "100001"
    };
  },
  created() {
    const { id } = this.$route.params;
    this.productId = id;
    this.getGoodsList();
    this.getGoodsRule();
  },
  methods: {
    // 获取商品规格
    getGoodsRule() {
      let { productId } = this;
      goodsRule(productId).then(res => {
        console.log(res, "getGoodsRule");
      });
    },
    showBaseFun() {
      this.showBase = true;
    },
    onBuyClicked(data) {
      console.log(data, "onBuyClicked");
      this.showBase = false;
    },

    onAddCartClicked(data) {
      console.log(data, "onAddCartClicked");
      this.showBase = false;
    },
    getGoodsList() {
      let { productId } = this;
      goodsDetail(productId).then(res => {
        if (res.code == "0000") {
          this.goodsDetail = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
.detail-container {
  background-color: #f5f5f5;
  .goods-info {
    height: 96px;
    background: linear-gradient(
      90deg,
      rgba(246, 81, 50, 1),
      rgba(217, 24, 21, 1)
    );
    color: #fff;
    display: flex;
    justify-content: space-between;
    .info-left {
      flex: 1;
      .tag-icon {
        width: 50px;
        height: 20px;
        background: linear-gradient(
          90deg,
          rgba(255, 212, 145, 1),
          rgba(212, 157, 70, 1)
        );
        border-radius: 0px 0px 5px 5px;
        color: rgba(85, 60, 31, 1);
        text-align: center;
        font-size: 10px;
        line-height: 20px;
        margin-left: 12px;
      }
    }
    .price {
      margin: 8px 0 8px 10px;
      span:nth-child(2) {
        font-size: 25px;
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
      background: url("http://libiaoimg.oss-cn-beijing.aliyuncs.com/user/icon/goods_details/biaotiBgc.png")
        no-repeat;
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
      overflow: hidden;
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
</style>
