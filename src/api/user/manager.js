import fetch from '@/api/fetch';

export function CompanyInfoListSelect() {
    return fetch({
        url: '/v1/user/manager/company/select',
        method: 'get'
    });
}

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

//---公司

export function CompanyList(params) {
    return fetch({
        url: '/v1/user/manager/ex/company',
        method: 'get',
        params
    });
}

export function CompanyMoney(id,params) {
    return fetch({
        url: '/v1/user/manager/company/money/'+id,
        method: 'post',
        params
    });
}

export function CompanyPassword(id,params) {
    return fetch({
        url: '/v1/user/manager/company/password/'+id,
        method: 'post',
        params
    });
}


export function addCompany(params) {
    return fetch({
        url: '/v1/user/manager/company',
        method: 'post',
        params
    });
}

export function deleteCompany(id) {
    return fetch({
        url: '/v1/user/manager/company/'+id,
        method: 'delete'
    });
}

//---admin
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
