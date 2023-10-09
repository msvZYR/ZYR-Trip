<template>
    <div class="home" ref="homeRef">
        <home-nav-bar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="" />
        </div>
        <home-search-box />
        <home-categories />

        <div class="search" v-if="isShowSearchBar">
            <search-bar />
        </div>
        <home-content />
    </div>
</template>

<!-- <script>
export default {
    name: 'home',
};
</script> -->
<script setup>
defineOptions({
    name: 'home',
});
import { ref, watch, computed, onActivated } from 'vue';
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeSearchBox from './cpns/home-search-box.vue';
import HomeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue';
import SearchBar from '@/components/search-bar/search-bar.vue';
import useScroll from '@/hooks/useScroll.js';
import useHomeStore from '@/stores/modules/home.js';
import useMainStore from '@/stores/modules/main.js';

const homeStore = useHomeStore();

// 回调方式
// useScroll(() => {
//     homeStore.fetchHouseListData();
// });
const homeRef = ref();
// 变量方式
const { isReachBottom, scrollTop } = useScroll(homeRef);
// console.log(isReachBottom, scrollTop);
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouseListData().then(() => {
            isReachBottom.value = false;
        });
    }
});
// 搜索框显示控制
// const isShowSearchBar = ref(false);
// watch(scrollTop, (newTop) => {
//     isShowSearchBar.value = newTop > 100;
// });
// 使用计算属性
// 定义的可响应式数据,依赖另外一个可响应式数据,那么可以使用计算属性
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360;
});

// 跳转回Home时保留原来位置

onActivated(() => {
    homeRef.value?.scrollTo({
        top: scrollTop.value,
    });
    console.log('&&&&&&&&&&&');
});
</script>

<style lang="less" scoped>
.home {
    // height: calc(100vh - 50px);
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 50px;
}
.banner {
    img {
        width: 100%;
    }
}
.search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
    z-index: 9;
}
</style>
