import fetch from '@/api/fetch';

export function getDefindTypeAll(params) {
    return fetch({
        url: '/v1/system/defind_type/all',
        method: 'get',
        params
    });
}

export function getDefindAll(params) {
    return fetch({
        url: '/v1/system/defind/type',
        method: 'get',
        params
    });
}

export function getDefindList(params) {
    return fetch({
        url: '/v1/system/defind/type_page',
        method: 'get',
        params
    });
}

export function deleteDefind(id) {
    return fetch({
        url: '/v1/system/defind/'+id,
        method: 'delete'
    });
}

export function addDefind(params) {
    return fetch({
        url: '/v1/system/defind/',
        method: 'post',
        params
    });
}

export function editDefind(id,params) {
    return fetch({
        url: '/v1/system/defind/'+id,
        method: 'put',
        params
    });
}

//系统配置
export function editConfig(id,params) {
    return fetch({
        url: '/v1/system/config/'+id,
        method: 'put',
        params
    });
}

export function getConfigList(params) {
    return fetch({
        url: '/v1/system/config/page',
        method: 'get',
        params
    });
}
//版本管理
export function getVersionNewest(params) {
    return fetch({
        url: '/v1/system/version/newest',
        method: 'get',
        params
    });
}

export function addVersion(params) {
    return fetch({
        url: '/v1/system/version',
        method: 'post',
        params
    });
}

export function deleteVersion(id) {
    return fetch({
        url: '/v1/system/version/'+id,
        method: 'delete'
    });
}

export function getVersionList(params) {
    return fetch({
        url: '/v1/system/version/page',
        method: 'get',
        params
    });
}
