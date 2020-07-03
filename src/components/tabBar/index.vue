<template>
    <div class="tabberWarp">
      <div class="warp">
        <Item :txt='item.txt' :page='item.page' @change='getVal' v-for='item in tabbarList' :sel='selected' v-bind:key="item.txt">
  
          <img :src="item.normalImg" slot='normalImg'>
          <img :src="item.activeImg" slot='activeImg'>
        </Item>
      </div>
    </div>
  </template>
  <script type="text/javascript">
  import Item from './item.vue'
  export default {
    components: {
      Item
    },
    data: function () {
      return {
        // 默认展示哪一个菜单
        selected: '',
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
      getVal: function (res) {
        this.selected = res
      }
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