<template>
    <div>
        <router-view v-slot="props">
            <keep-alive include="home">
                <component :is="props.Component"></component>
            </keep-alive>
        </router-view>
        <!-- 这里不能使用v-if，组件的销魂和重新加载导致tabbar加载时机不匹配（来不及），应该使用v-show -->
        <tab-bar v-show="!route.meta.hideTabBar" />
        <!-- <tab-bar></tab-bar> -->
        <loading></loading>
    </div>
</template>

<script setup>
import TabBar from '@/components/tab-bar/tab-bar.vue';
import Loading from '@/components/loading/loading.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped></style>
