import zyrRequest from '../request/index';
export function getCityAll() {
    return zyrRequest.get({
        url: '/city/all',
    });
}