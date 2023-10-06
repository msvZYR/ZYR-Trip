import zyrRequest from '../request/index';
export function getHotSuggests() {
    return zyrRequest.get({
        url: '/home/hotSuggests',
    });
}
export function getCategories() {
    return zyrRequest.get({
        url: '/home/categories',
    });
}
export function getHouseList(currentPage) {
    return zyrRequest.get({
        url: '/home/houselist',
        params: {
            page: currentPage,
        },
    });
}