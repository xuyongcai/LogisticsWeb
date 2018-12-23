import fetch from '@/api/fetch';

//修改合同
export function editContractOrder(id,params) {
    return fetch({
        url: '/v1/order/contract/'+id,
        method: 'put',
        params
    });
}

