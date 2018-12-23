import fetch from '@/api/fetch';

export function getOrderListAll(params) {
  return fetch({
    url: '/v1/order/page/all',
    method: 'get',
    params
  });
}

export function getOrderList(params) {
    return fetch({
        url: '/v1/order/page',
        method: 'get',
        params
    });
}

export function getOrder(id) {
    return fetch({
        url: '/v1/order/'+id,
        method: 'get'
    });
}

export function deleteOrder(id) {
    return fetch({
        url: '/v1/order/'+id,
        method: 'delete'
    });
}
