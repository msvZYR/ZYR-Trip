<template>
    <div class="content">
        <div class="content">
            <h2 class="title">热门精选</h2>
            <div class="list">
                <template v-for="(item, index) in houseList" :key="item.data.houseId">
                    <house-item-v9 v-if="item.discoveryContentType === 9" :item-data="item.data" />
                    <house-item-v3 v-else-if="item.discoveryContentType === 3" :item-data="item.data" />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useHomeStore from '@/stores/modules/home.js';
import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue';
import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue';

const router = useRouter();

const homeStore = useHomeStore();
homeStore.fetchHouseListData();
const { houseList } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.content {
    padding: 10px 8px;
    .title {
        font-size: 22px;
        padding: 10px;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
