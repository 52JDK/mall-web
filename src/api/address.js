import request from "@/utils/request"

export function addAddress(data) {
    return request({
        url: '/address/add',
        method: 'post',
        data
    })
}

export function updateAddress(data,defaultOrNot) {
    return request({
        url: '/address/update',
        method: 'post',
        data,
        defaultOrNot,
    })
}

export function findAddress() {
    return request({
        url: '/address/find',
        method: 'post',

    })
}
export function findAddressById(addressId) {
    return request({
        url: '/address/findById',
        method: 'post',
        data:{
            id:addressId
        }
    })
}

export function delAddress(addressId) {
    return request({
        url: '/address/delete',
        method: 'post',
        data:{
            id:addressId
        }
    })
}


// 获取商品规格
export function goodsRule(productId) {
    return request({
        url: '/product/category',
        method: 'post',
        data: {productId}
    })
}
