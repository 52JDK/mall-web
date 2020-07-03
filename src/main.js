import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/styles/base.css"
import 'lib-flexible/flexible.js'
import vConsole from 'vconsole'
import { Loadmore } from 'mint-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import './permission' // permission control
Vue.use(Vant);
Vue.component(Loadmore.name, Loadmore);
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
