import request from "@/utils/request"

export function login(data){
    return request({
        url: '/home/userLogin',
        method: 'post',
        data
      })
}