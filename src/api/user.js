import request from "@/utils/request"

export function login(data){
    return request({
        url: '/home/userLogin',
        method: 'post',
        data
      })
}

export function pwdLogin(data){
    return request({
        url: '/home/pwdLogin',
        method: 'post',
        data:{
            uid:data.uid,
            passWord:data.passWord
        }
    })
}

export function personCenter(data) {
    return request({
        url: '/home/personCenter',
        method: 'post',
        data
    })
}
