import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/login/psd'] // no redirect whitelist

router.beforeEach(async(to,from, next)=>{
    NProgress.start()
    window.scrollTo(0,0)
    next()
    // const hasToken = getToken()
    // if(hasToken){
    //     if(to.path==='/login'||to.path==='/login/psd'){
    //         next({ path: '/' })
    //         NProgress.done()
    //     }else{
    //         try {
    //             next()
    //         }
    //         catch {
    //             await store.dispatch('user/resetToken')
    //             Message.error(error || 'Has Error')
    //             next(`/login?redirect=${to.path}`)
    //             NProgress.done()  
    //         }
    //     }
    // }else{
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         // in the free login whitelist, go directly
    //         next()
    //       } else {
    //         // other pages that do not have permission to access are redirected to the login page.
    //         next(`/login?redirect=${to.path}`)
    //         NProgress.done()
    //       } 
    // }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })