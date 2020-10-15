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
      headReturn:false,
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
      headReturn:true,
      title:'密码登录'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login'),
    meta:{
      layout:false,
      head:true,
      headReturn:true,
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
      headReturn:true,
      title:'分类'
    }
  },
  {
    path: '/categoryList',
    name: 'categoryList',
    component: () => import('../views/category/categoryList'),
    meta:{
      layout:true,
      head:true,
      headReturn:true,
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
      headReturn:true,
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
      headReturn:true,
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
      headReturn:true,
      title:'商品详情'
    }
  },
  {
    path: '/order/createOrder',
    name: 'createOrder',
    component: () => import('../views/order/createOrder'),
    meta:{
      layout:false,
      head:true,
      headReturn:true,
      title:'创建订单'
    }
  },
  {
    path: '/order/addressList',
    name: 'addressList',
    component: () => import('../views/order/addressList'),
    meta:{
      layout:false,
      head:true,
      headReturn:true,
      title:'地址列表'
    }
  },
  {
    path: '/order/editAddress',
    name: 'editAddress',
    component: () => import('../views/order/editAddress'),
    meta:{
      layout:false,
      head:true,
      headReturn:true,
      title:'编辑地址'
    }
  },
  {
    path: '/order/orderProduct',
    name: 'orderProduct',
    component: () => import('../views/order/orderProduct'),
    meta:{
      layout:false,
      head:true,
      headReturn:true,
      title:'编辑地址'
    }
  },
  {
    path: '/order/orderList',
    name: 'orderList',
    component: () => import('../views/order/orderList'),
    meta:{
      layout:false,
      head:true,
      headReturn:true,
      title:'订单列表'
    }
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router
