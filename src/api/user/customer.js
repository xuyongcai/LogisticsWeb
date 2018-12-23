import fetch from '@/api/fetch';

export function CustomerLogin(params) {
    return fetch({
        url: '/v1/user/customer/loginex',
        method: 'post',
        params
    });
}

export function getInfo(params) {
    return fetch({
        url: '/v1/user/customer/ex/info',
        method: 'get',
        params
    });
}

export function updateInfo(params) {
    return fetch({
        url: '/v1/user/customer/info',
        method: 'put',
        params
    });
}

export function updatePassword(params) {
    return fetch({
        url: '/v1/user/customer/password',
        method: 'put',
        params
    });
}

//注册

export function sendRegisterSms(params) {
    return fetch({
        url: '/v1/user/customer/send_register_sms',
        method: 'post',
        params
    });
}

export function registerSms(params) {
    return fetch({
        url: '/v1/user/customer/register_sms',
        method: 'post',
        params
    });
}
