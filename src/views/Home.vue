<template>
  <div>
    <van-search
            placeholder="请输入搜索关键词"
            input-align="center"
    />
    <homeSwiper/>
    <navLink/>
    <div class="banner-img">
      <img src="http://lppzcup.oss-cn-shanghai.aliyuncs.com//c5a2cd59de9f4fa88c0dc972f7e61683.jpg" alt="">
    </div>
    <van-notice-bar
            left-icon="volume-o"
            text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    />
    <goodsList title="图片标题"  type="navImg"/>
    <goodsList title="商品标题"  type="goods"/>
  </div>
</template>

<script>
  import homeSwiper from '../components/swiper'
  import navLink from '../components/navLink'
  import goodsList from '../components/goods/list'
  import Vue from 'vue';
  import { NoticeBar } from 'vant';

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


  }
}
</script>
<style lang="less" scoped>
  .banner-img{
    margin: 10px;
    height: 96px;
    border-radius: 10px;
    /*overflow: hidden;*/
    img{
      width: 100%;
      height:100%;
    }
  }
</style>
