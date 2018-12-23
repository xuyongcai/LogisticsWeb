import fetch from '@/api/fetch';

export function createRecharge(params) {
    return fetch({
        url: '/v1/finance/recharge/create',
        method: 'get',
        params
    });
}

export function getMyRechargeList(params) {
    return fetch({
        url: '/v1/finance/recharge/my/page',
        method: 'get',
        params
    });
}
