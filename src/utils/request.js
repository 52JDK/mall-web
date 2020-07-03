import axios from "axios"
const service = axios.create({
    baseURL:'http://10.28.143.236:8079',
    timeout:50000
})
// request 拦截器
service.interceptors.request.use(
    config => {
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
        const res = response.data
        // 这里处理一些response 正常放回时的逻辑
        return res
    },
    error => {
        // 这里处理一些response 出错时的逻辑
        return Promise.reject(error)
    }
)

export default service