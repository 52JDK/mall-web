import request from "@/utils/request"

// 获取商品列表
export function goodsList(data){
    return request({
        url: '/home/productList',
        method: 'post',
        data
      })
}
// 获取商品详情
export function goodsDetail(productId){
  return request({
      url: '/product/detail',
      method: 'post',
      data:{ productId }
  })
}