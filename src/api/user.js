import request from "@/utils/request"

export function login(data){
    return request({
        url: '/home/userLogin',
        method: 'post',
        data
      })
}

export function personCenter(data) {
    return request({
        url: '/home/personCenter',
        method: 'post',
        data
    })
}
