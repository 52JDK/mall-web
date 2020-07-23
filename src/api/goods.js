import request from "@/utils/request"

// 获取商品列表
export function goodsListApi(data){
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
// 获取商品规格
export function goodsRule(productId){
   return request({
      url: '/product/category',
      method: 'post',
      data:{ productId }
  })
}