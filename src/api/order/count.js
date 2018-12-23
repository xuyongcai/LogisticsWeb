import fetch from '@/api/fetch';

export function getAll() {
  return fetch({
    url: '/v1/order/count/all',
    method: 'get'
  });
}

export function getCustomerAll(params) {
    return fetch({
        url: '/v1/order/count/customer/all',
        method: 'get',
        params
    });
}

export function getOrderCompany() {
    return fetch({
        url: '/v1/order/count/order/company',
        method: 'get'
    });
}

export function getOrderDay7() {
    return fetch({
        url: '/v1/order/count/order/day7',
        method: 'get'
    });
}

export function getCustomerOrderDay7(params) {
    return fetch({
        url: '/v1/order/count/customer/order/day7',
        method: 'get',
        params
    });
}

//物流公司统计
export function getCompanyAll(params) {
    return fetch({
        url: '/v1/order/count/company/all',
        method: 'get',
        params
    });
}

export function getCompanyOrderDay7(params) {
    return fetch({
        url: '/v1/order/count/company/order/day7',
        method: 'get',
        params
    });
}
