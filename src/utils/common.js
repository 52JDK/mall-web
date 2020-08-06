import {getAuth} from "@/api"
import config from '@/config/index.js' // 路径配置
var isLppzApp;
var ua = navigator.userAgent.toLowerCase();
var uaApp = ua ? ua.match(/BeStore/i) : '';
var uaAndroid = /android/i.test(ua);
var uaIos = /iphone|ipad|ipod/i.test(ua);

if (uaApp == 'bestore') {
    isLppzApp = true;
} else {
    isLppzApp = false;
}
//获取 UUID
function getUUID () {
    let localuserinfo = localStorage.getItem('userinfo')
    if((!!localuserinfo) && (!!JSON.parse(localuserinfo).uuid)){
        return JSON.parse(localuserinfo).uuid
    }
    var c, d, a = [],
        b = "0123456789abcdef";
    for (c = 0; 36 > c; c++) a[c] = b.substr(Math.floor(16 * Math.random()), 1);
    return a[14] = "4",
        a[19] = b.substr(8 | 3 & a[19], 1),
        a[8] = a[13] = a[18] = a[23] = "-",
        d = a.join("")

    return d;
}
const uuid = getUUID ()
//微信登录刷新
function loginWxRefresh(pageType){
  let url = "/member/pages/h5Login/index"
    if(pageType) url=`/member/pages/h5Login/index?pageType=${ pageType }`
    //let statusId = parseQueryString(window.location.href).statusId||'';
    wx.miniProgram.redirectTo({
        url
    });//去登陆
};
//APP关闭页面
function closePageLppzRequest(){
  if (isLppzApp && uaAndroid) {
      javascript:obj.closePageLppzRequest('');
  } else if (isLppzApp && uaIos) {
      window.webkit.messageHandlers.closePageLppzRequest.postMessage('');
  }
};
//APP登录刷新
function loginLppzRefresh(url){
    var thisData = {};
    thisData.targetUrl = url;
    if (isLppzApp && uaAndroid) {
        javascript:obj.loginLppzRefresh(url);
    } else if (isLppzApp && uaIos) {
        window.webkit.messageHandlers.loginLppzRefresh.postMessage(thisData);
    }
};
// 判断在app内
function InLppzApp(){
  return new Promise((resolve,reject)=>{
    let InLppzApp=false
    if (isLppzApp) {
      InLppzApp = true
    }
    resolve({InLppzApp})
 })
}
// get URL参数
function parseQueryString(url) {
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(decodeURIComponent(decodeURIComponent(url))),
    ret = {};
    if (arr_url && arr_url[1]) {
        var str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
        }
    }
    return ret;
}
//获取APP参数
function getAppParams() {
    let appParams = {};
    let windowParams = parseQueryString(window.location.href) || {};
    if (windowParams.channel == "1101") {//链接加入channel 1101是 小程序，1149是app
        return new Promise((resolve, reject) => {
            if (windowParams.uid) {
                resolve(windowParams);
            } else {
                reject(windowParams);
            }
        })
    } else { //app渠道
        let ua = window.navigator.userAgent.toLocaleLowerCase(),
            uaApp = ua ? ua.match(/BeStore/i) : '';
        if (cookies.get('params')) {
            try {
                appParams = JSON.parse(decodeURIComponent(cookies.get('params'))).reqParam;
            } catch (e) {
            }
        } else {
            appParams = parseQueryString(window.location.href) || {};
        }
        return new Promise((resolve, reject) => {
            if (uaApp && appParams.uuid) {
                resolve(appParams);
            } else {
                reject(channel == "1149");
            }
        })
    }
}
//获取token用户信息
function getAuthInfo(appParams){
    let postData = appParams || {};
    postData.body = JSON.stringify({});
    const paramData = {
        url:config.basePath+'/services/user/refreshToken',
        data:postData
    }
    return new Promise((resolve, reject)=>{
        getAuth(paramData).then(res=>{
            resolve(res);
        },(error)=>{
            reject(error);
        })
        //toast('加载中...',{type:'loading',time:9999999});
        // axiosPost(config.basePath+'/services/user/refreshToken',postData, {
        //     success:(res)=> {
        //         //toastHide();//移除加载
        //         resolve(res);
        //     },
        //     error:(data)=> {
        //         reject(data);
        //         //toastHide();//移除加载
        //         //toast('您尚未登录，请先登录！',{type:'warning'});
        //     }
        // })
    });
}
// cookies
const cookies={
    set:function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    get:function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    clear:function(name) {
        cookies.setCookie(name, "", -1);
    }
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
 function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (!time) {
      return ''
    } else if (typeof time === 'object') {
      date = time
    } else {
      if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }
  //判断打开APP
function gotoApp() {
    let ua = window.navigator.userAgent.toLowerCase();
    let isWeiXin = false;
    if(/MicroMessenger/i.test(ua) || /_SQ_/i.test(ua)){
      isWeiXin = true;
    }else{
      isWeiXin = false;
    }
    if (/Android/i.test(ua)) {
      if (isWeiXin){
        location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.lppz.mobile.android.outsale';
      } else {
        var iframe = document.createElement('iframe');
        var body = document.body;
        iframe.style.cssText='display:none;width=0;height=0';
        body.appendChild(iframe);
        iframe.src='bestore://lppz/';
        setTimeout(function() {
          location.href = 'https://sns.lppz.com/app/h5download.html';
        }, 2000);
      }
    } else if (/iphone|ipad|ipod/.test(ua)) {
      location.href = 'https://mappssl.lppz.com';
      setTimeout(function() {
        location.href = 'https://itunes.apple.com/cn/app/BeStore/id1207741092?mt=8';
      }, 500);
    } else {
      location.href = 'https://sns.lppz.com/app/h5download.html';
    }
    return false;
  }
  function systemType(){
    return new Promise((resolve,reject)=>{
        let verNew = '',system = null;
        if (uaAndroid)  system = 'ard';
        if (uaIos)  system = 'ios';
        resolve({system})
    })
}
export {
    parseQueryString,
    loginWxRefresh,
    parseTime,
    gotoApp,
    getAppParams,
    uuid,
    cookies,
    getAuthInfo,
    loginLppzRefresh,
    closePageLppzRequest,
    systemType,
    InLppzApp
}
