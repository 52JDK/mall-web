<template>
  <div>
    <van-search
            placeholder="请输入搜索关键词"
            input-align="center"
    />
    <homeSwiper/>
    <navLink/>
    <div class="banner-img">
      <img src="http://ftp.52jdk.com/coupon-2.jpg" @click="onImgClick" alt="">
    </div>
    <van-notice-bar color="#1989fa" background="#ecf9ff" mode="closeable"
            left-icon="volume-o"
            text="我们不生产bug，我们只是bug的搬运工"
    />
    <div class="seckill-img">
      <img src="http://ftp.52jdk.com/home-1.jpg" @click="onImgClick" alt="">
    </div>
    <goodsList title="推荐商品"  type="goods"/>
  </div>
</template>

<script>
  import homeSwiper from '../components/swiper'
  import navLink from '../components/navLink'
  import goodsList from '../components/goods/list'
  import Vue from 'vue';
  import { Toast } from 'vant';
  import { NoticeBar } from 'vant';
  Vue.use(Toast);
  Vue.use(NoticeBar);
export default {
  name: 'Home',
  components: {
    homeSwiper,
    navLink,
    goodsList
  },
  data () {
    return {

    }
  },
  created(){

  },
  mounted(){

  },
  computed:{

  },
  methods: {
    onImgClick(){
      Toast('coding... 请选择其他商品');
    }
  }
}
</script>
<style lang="less" scoped>
  .banner-img{
    //margin: 10px;
    //height: 96px;
    border-radius: 10px;
    background: #F5F5F5 !important;
    /*overflow: hidden;*/
    img{
      width: 100%;
      height:100%;
    }
  }
  .seckill-img{
    margin-top: 10px;
    img{
      width: 100%;
      height:100%;
    }
  }
</style>
