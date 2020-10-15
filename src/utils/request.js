import axios from "axios"
import router from "@/router";
const service = axios.create({
    // baseURL:'http://javamall.52jdk.com',
    // baseURL:'http://10.28.143.236:8079',
    baseURL:'http://127.0.0.1:8079',
    timeout:50000
})
import { Toast  } from "vant"
// request 拦截器
service.interceptors.request.use(
    config => {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration:0
        });
        // 这里可以自定义一些config 配置
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config
    },
    error => {
        //  这里处理一些请求出错的情况

        return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        Toast.clear();
        const res = response.data
        if (response.data.code == '1004' || response.data.code=="1008") {
            Toast.fail("登录失效，请重新登录")
            router.replace({
                path: '/login',
            })
        }        // 这里处理一些response 正常放回时的逻辑
        return res
    },
    error => {
        // 这里处理一些response 出错时的逻辑
        Toast.fail('网络开小差了。。。');
        return Promise.reject(error)
    }
)

export default service
