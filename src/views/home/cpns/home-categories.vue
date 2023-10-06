<template>
    <div class="categories">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="" />
                <div class="text">{{ item.title }}</div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useHomeStore from '@/stores/modules/home.js';

const router = useRouter();
const homeStore = useHomeStore();
homeStore.fetchCategoriesData();
const { categories } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.categories {
    display: flex;
    overflow-x: auto;
    height: 80px;
    padding: 0 10px;
    margin-top: 6px;
    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }
    .item {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 70px;
        text-align: center;
        img {
            width: 32px;
            height: 32px;
        }
        .text {
            font: size 12px;
            margin-top: 8px;
        }
    }
}
</style>
