import { defineStore } from 'pinia';
import { getHotSuggests, getCategories, getHouseList } from '@/services';
const useHomeStore = defineStore('home', {
    state: () => ({
        hotSuggests: [],
        categories: [],

        currentPage: 1,
        houseList: [],
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
        async fetchHouseListData() {
            const res = await getHouseList(this.currentPage++);
            this.houseList.push(...res.data);
            console.log(res.data);
        },
    },
});

export default useHomeStore;