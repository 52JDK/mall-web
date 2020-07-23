import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/styles/base.css"
import 'lib-flexible/flexible.js'
import vConsole from 'vconsole'
import Vant from 'vant';
import 'vant/lib/index.css';
import './permission' // permission control
Vue.use(Vant);


import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '890a7be017930c49e1711d451be4db3b',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})
//打印console.log()
if( process.env.NODE_ENV=='development'){
  Vue.prototype.$vConsole= new vConsole()
}
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
