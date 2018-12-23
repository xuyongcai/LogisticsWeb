import fetch from '@/api/fetch';

export function AdminLogin(params) {
  return fetch({
    url: '/v1/user/admin/login',
    method: 'post',
    params
  });
}

export function getInfo(params) {
    return fetch({
        url: '/v1/user/admin/ex/info',
        method: 'get',
        params
    });
}

export function updateInfo(params) {
    return fetch({
        url: '/v1/user/admin/info',
        method: 'put',
        params
    });
}
export function updatePassword(params) {
    return fetch({
        url: '/v1/user/admin/password',
        method: 'put',
        params
    });
}
