import zyrRequest from '../request/index';
export function getDetailInfos(houseId) {
    return zyrRequest.get({
        url: '/detail/infos',
        params: {
            houseId,
        },
    });
}