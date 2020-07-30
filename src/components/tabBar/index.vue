<template>
  <van-tabbar v-model="active"   active-color="red" placeholder  fixed route >
    <van-tabbar-item  icon="shop-o"  to="/home" >首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item icon="friends-o">我</van-tabbar-item>
  </van-tabbar>
  </template>
  <script type="text/javascript">
    import Vue from 'vue';
    import { Tabbar, TabbarItem } from 'vant';

    Vue.use(Tabbar);
    Vue.use(TabbarItem);
  import Item from './item.vue'
    import { Notify } from 'vant';
  export default {
    components: {
      Item
    },
    data: function () {
      return {
        // 默认展示哪一个菜单
        selected: '',
        active: 0,

        tabbarList: [{
          txt: '首页',
          page: '',
          normalImg: require('../../assets/images/home.png'),
          activeImg: require('../../assets/images/home-on.png')

        },
        {
          txt: '分类',
          page: 'category',
          normalImg: require('../../assets/images/collage.png'),
          activeImg: require('../../assets/images/collage-on.png')
        },
        {
          txt: '购物车',
          page: 'cart',
          normalImg: require('../../assets/images/order.png'),
          activeImg: require('../../assets/images/order-on.png')
        },
        {
          txt: '我的',
          page: 'user',
          normalImg: require('../../assets/images/my.png'),
          activeImg: require('../../assets/images/my-on.png')
        }
        ]
      }
    },
    methods: {
      // onChange(index) {
      //   Notify({ type: 'primary', message: index });
      // },
      // getVal: function (res) {
      //   this.selected = res
      // }
    }
  }
  </script>
  <style type="text/css">
    .warp {
      width: 100%;
      border-top: 1px solid #eee;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 0;
    }

    .warp img {
      width: 20px;
      height: 20px;
    }

    .tabberWarp img {
      margin-top: 10px;
      margin-bottom: 5px;

    }

    .tabberWarp {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-bottom: 5px;
      background: #fff;
    }
  </style>
