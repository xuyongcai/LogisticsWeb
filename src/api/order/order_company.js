import fetch from '@/api/fetch';

//根据公司Token列出所有的Order
export function getCompanyOrder(params) {
    return fetch({
        url: '/v1/order/page/company',
        method: 'get',
        params
    });
}

//根据公司Token列出所有开放的Order
export function getCompanyOpenOrder(params) {
    return fetch({
        url: '/v1/order/page/company/open',
        method: 'get',
        params
    });
}
