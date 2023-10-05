import { defineStore } from 'pinia';
import { getHotSuggests, getCategories } from '@/services';
const useHomeStore = defineStore('home', {
    state: () => ({
        hotSuggests: [],
        categories: [],
    }),
    getters: {},
    actions: {
        async fetchHotSuggestsData() {
            const res = await getHotSuggests();
            this.hotSuggests = res.data;
            // console.log(res.data);
        },
        async fetchCategoriesData() {
            const res = await getCategories();
            this.categories = res.data;
            // console.log(res.data);
        },
    },
});

export default useHomeStore;