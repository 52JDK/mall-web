import request from "@/utils/request"

// 添加购物车
export function addCart(data) {
    return request({
        url: '/cart/addCart',
        method: 'post',
        data: {
            sku: data.selectedkSuComb.id,
            quantity: data.selectedNum
        }
    })
}

export function addCartNum(sku, quantity) {
    return request({
        url: '/cart/cartNum',
        method: 'post',
        data: {
            sku: sku,
            quantity: quantity
        }
    })
}


export function selectCart(sku, check) {
    return request({
        url: '/cart/selectCart',
        method: 'post',
        data: {
            sku: sku,
            check: check
        }
    })
}

export function deleteCart(sku) {
    return request({
        url: '/cart/deleteCart',
        method: 'post',
        data: {
            sku: sku
        }
    })
}


// 查询购物车
export function findCart() {
    return request({
        url: '/cart/findCart',
        method: 'post',
    })
}


// 查询购物车
export function selectAll(selectAll) {
    return request({
        url: '/cart/selectAll',
        method: 'post',
        data: {
            selectAll: selectAll
        }
    })
}
