<template>
  <div id="app">
    <div class="header-nav">
      <headerNav :title="$route.meta.title" />
    </div>
    <router-view/>
    <div class="tab-bar">
      <Tabbar v-if="$route.meta.layout"/>
    </div>
  </div>
</template>
<script>
  import Tabbar from './components/tabBar/index'
  import headerNav from './components/headerNav/index'
export default {
  name: 'App',
  components:{
    Tabbar,
    headerNav
  }
}
</script>
<style>
  .tab-bar{
    width: 100%;
    height: 60px;
  }
  .header-nav{
    width: 100%;
    height: 46px;
  }
</style>

