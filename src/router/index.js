import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home'),
    meta:{
      layout:true,
      head:true,
      title:'首页'
    }
  },
  {
    path: '/login/psd',
    name: 'Home',
    component: () => import('../views/login/psdLogin.vue'),
    meta:{
      layout:false,
      head:true,
      title:'密码登录'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index'),
    meta:{
      layout:false,
      head:true,
      title:'登录'
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/category/index'),
    meta:{
      layout:true,
      head:true,
      title:'分类'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart/index'),
    meta:{
      layout:false,
      head:true,
      title:'购物车'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/index'),
    meta:{
      layout:true,
      head:true,
      title:'我的'
    }
  },
   {
    path: '/goods/detail',
    name: 'detail',
    component: () => import('../views/goods/detail.vue'),
    meta:{
      layout:false,
      head:true,
      title:'商品详情'
    }
  },
  {
    path: '/order/createOrder',
    name: 'detail',
    component: () => import('../views/order/createOrder'),
    meta:{
      layout:false,
      head:true,
      title:'创建订单'
    }
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
