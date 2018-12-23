import fetch from '@/api/fetch';

//订单处理
export function addTakingOrder(params) {
    return fetch({
        url: '/v1/order/taking',
        method: 'post',
        params
    });
}

export function refuseCustomerOrder(params) {
    return fetch({
        url: '/v1/order/customer/refuse',
        method: 'post',
        params
    });
}
