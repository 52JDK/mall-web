import request from "@/utils/request"
//获取轮播图
export function swiperList(data){
    return request({
        url: '/home/carouselList',
        method: 'post',
        data:{ type:data }
      })
}
