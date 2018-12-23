import fetch from '@/api/fetch';

export function getDriverList(params) {
    return fetch({
        url: '/v1/fleet/driver/page',
        method: 'get',
        params
    });
}

export function getDriverListEx(params) {
    return fetch({
        url: '/v1/fleet/driver/ex/page',
        method: 'get',
        params
    });
}

export function getDriver(id, params) {
    return fetch({
        url: '/v1/fleet/driver/' + id,
        method: 'get',
        params
    });
}

export function addDriver(params) {
    return fetch({
        url: '/v1/fleet/driver',
        method: 'post',
        params
    });
}

export function addDriverEx(params) {
    return fetch({
        url: '/v1/fleet/driver/ex',
        method: 'post',
        params
    });
}

export function editDriver(id, params) {
    return fetch({
        url: '/v1/fleet/driver/' + id,
        method: 'put',
        params
    });
}

export function deleteDriver(id) {
    return fetch({
        url: '/v1/fleet/driver/' + id,
        method: 'delete'
    });
}
