import axios from "axios"
const service = axios.create({
    baseURL:'http://www.52jdk.com:8079',
    // baseURL:'http://127.0.0.1:8079',
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
        console.log(response,"response")
        Toast.clear();
        const res = response.data
        // 这里处理一些response 正常放回时的逻辑
        return res
    },
    error => {
        // 这里处理一些response 出错时的逻辑
        Toast.fail('网络开小差了。。。');
        return Promise.reject(error)
    }
)

export default service
