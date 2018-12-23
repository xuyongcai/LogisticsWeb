import fetch from '@/api/fetch';

export function CustomerList(params) {
    return fetch({
        url: '/v1/user/manager/ex/customer',
        method: 'get',
        params
    });
}

export function CustomerMoney(id,params) {
    return fetch({
        url: '/v1/user/manager/customer/money/'+id,
        method: 'post',
        params
    });
}

export function CustomerPassword(id,params) {
    return fetch({
        url: '/v1/user/manager/customer/password/'+id,
        method: 'post',
        params
    });
}

export function AdminList(params) {
    return fetch({
        url: '/v1/user/manager/ex/admin',
        method: 'get',
        params
    });
}


export function addAdmin(params) {
    return fetch({
        url: '/v1/user/manager/admin',
        method: 'post',
        params
    });
}

export function AdminPassword(id,params) {
    return fetch({
        url: '/v1/user/manager/admin/password/'+id,
        method: 'post',
        params
    });
}

export function deleteAdmin(id) {
    return fetch({
        url: '/v1/user/manager/admin/'+id,
        method: 'delete'
    });
}

export function addCustomer(params) {
    return fetch({
        url: '/v1/user/manager/customer',
        method: 'post',
        params
    });
}

export function deleteCustomer(id) {
    return fetch({
        url: '/v1/user/manager/customer/'+id,
        method: 'delete'
    });
}
