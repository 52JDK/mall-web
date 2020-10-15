<template>
  <div>
    <van-nav-bar
                 :title="title"
                 :left-text="$route.meta.headReturn===true?'返回':''"
                 :left-arrow="$route.meta.headReturn"
                 :right-text="$route.meta.headReturn===true?'首页':''"
                 fixed
                 @click-left="onBack"
                 @click-right="onHome"
    >
      <template #right v-if="$route.meta.headReturn">
        <van-icon name="wap-home-o" size="18" />
      </template>
    </van-nav-bar>
  </div>


</template>

<script>
    import {NavBar} from 'vant';

    export default {
        name: 'headerNav',
        components: {
            [NavBar.name]: NavBar,
        },
        props: {
            title: String,
        },
        methods: {
            onBack() {
                history.back();
            },
          onHome() {
            this.$router.push('/home');
          },
        }
    }
</script>

<style>
    .van-nav-bar{
        height:46px !important; 
        line-height: 46px !important;
    }
</style>
