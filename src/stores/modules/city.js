import { defineStore } from 'pinia';
import { getCityAll } from '@/services';
const useCityStore = defineStore('city', {
    state: () => ({
        allCities: {},
        currentCity: { cityName: '广州' },
    }),
    getters: {},
    actions: {
        async fetchAllCitiesData() {
            const res = await getCityAll();
            this.allCities = res.data;
        },
    },
});

export default useCityStore;