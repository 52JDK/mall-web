import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/styles/base.css"
import 'lib-flexible/flexible.js'
// import vConsole from 'vconsole'
import Vant from 'vant';
import 'vant/lib/index.css';
import './permission' // permission control
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import "../src/assets/icon/iconfont.css"


import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueAwesomeSwiper);

Vue.use(Vant);


import JSEncrypt from 'jsencrypt';

Vue.prototype.$getRsaCode = function(str){ // 注册方法
  let pubKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkBiZpzUAETelvbe8Q8g8BGjCvEC7i+McdFNlevcThgBsEu+qELhj+bGeAWdmRzOq0hTUBdiNU4ydyai4+Ru1btjzYfIncjlGefbsL7JtVquKhsH5C1AVaaJsKZagZMZUFyZV6QVwCmERYFmP3duq1sqSWA/VFO1MZJ9mCUMj1twD8YN7ftZGW3w2G/xSihq9yZS6ANzTGgdO8TDJsEMLb+uE7A5ymsX8RDwguaI/TkoFt3KcW/YNHlLzmpRJ58+QXz01T4QdkGOQhbKvUzyEaYKW3g7stHcfkq/cwla/GI4PrqcBjLh2laHYQZbdm5DwkWexEsb2VF9Jd1b39M8dywIDAQAB';
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  let  data = encryptStr.encrypt(str.toString());  // 进行加密
  return data;
}
import VueAMap from 'vue-amap'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '890a7be017930c49e1711d451be4db3b',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
});
//打印console.log()
// if( process.env.NODE_ENV=='development'){
//   Vue.prototype.$vConsole= new vConsole()
// }
Vue.config.productionTip = false
new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
