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