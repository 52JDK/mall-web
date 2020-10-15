import request from "@/utils/request"

export function orderSure(id) {
    return request({
        url: '/order/orderSure',
        method: 'post',
        data:{
            id:id
        }
    })
}

export function createOrder(data) {
    return request({
        url: '/order/createOrder',
        method: 'post',
        data:{
            addressId: data.addressId,
            couponId: data.couponId,
            remark: data.remark,
            payAmount: data.payAmount,
        }
    })
}

export function orderPay(orderCode) {
    return request({
        url: '/order/orderPay',
        method: 'post',
        data:{
            orderCode:orderCode
        }
    })
}

export function findCoupon() {
    return request({
        url: '/coupon/findCoupon',
        method: 'post',
    })
}

export function findOrderList(data) {
    return request({
        url: '/order/findOrderList',
        method: 'post',
        data:data
    })
}

