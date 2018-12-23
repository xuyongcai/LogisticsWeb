import fetch from '@/api/fetch';

export function getUploadToken() {
    return fetch({
        url: '/v1/util/upload/token',
        method: 'get'
    });
}
