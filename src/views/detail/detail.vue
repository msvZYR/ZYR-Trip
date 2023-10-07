<template>
    <div class="detail top-page" ref="detailRef">
        <tab-control class="tabs" v-if="showTabControl" :titles="titles" @tabItemClick="tabClick"></tab-control>
        <!-- <h2>detail:{{ $route.params.id }}</h2> -->
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <!-- <detail-swipe :swipe-data="mainPart?.topModule?.housePicture?.housePics"></detail-swipe> -->
        <div class="main" v-if="mainPart" v-memo="[mainPart]">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
            <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"></detail-infos>
            <detail-facility
                name="设施"
                :ref="getSectionRef"
                :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
            ></detail-facility>
            <detail-landloard
                name="房东"
                :ref="getSectionRef"
                :landlord="mainPart.dynamicModule.landlordModule"
            ></detail-landloard>
            <detail-comment
                name="评论"
                :ref="getSectionRef"
                :comment="mainPart.dynamicModule.commentModule"
            ></detail-comment>
            <detail-notice
                name="须知"
                :ref="getSectionRef"
                :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
            ></detail-notice>
            <detail-map name="地图" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail-map>
            <detail-intro :priceIntro="mainPart.introductionModule"></detail-intro>
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="" />
            <div class="text">开心旅途, 永无止境!</div>
        </div>
        <!-- <detail-action-bar :current-house="infos.currentHouse" /> -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getDetailInfos } from '@/services';
import useScroll from '@/hooks/useScroll.js';

import TabControl from '@/components/tab-control/tab-control.vue';
import DetailSwipe from './cpns/detail_01-swipe.vue';
import DetailInfos from './cpns/detail_02-infos.vue';
import DetailFacility from './cpns/detail_03-facility.vue';
import DetailLandloard from './cpns/detail_04-landlord.vue';
import DetailComment from './cpns/detail_05-comment.vue';
import DetailNotice from './cpns/detail_06-notice.vue';
import DetailMap from './cpns/detail_07_map.vue';
import DetailIntro from './cpns/detail_08-intro.vue';

const route = useRoute();

const houseId = route.params.id;

// 发送网络请求
const detailInfos = ref({});
const mainPart = computed(() => detailInfos.value.mainPart);
getDetailInfos(houseId).then((res) => {
    detailInfos.value = res.data;
});

const router = useRouter();
const onClickLeft = () => {
    router.back();
    // console.log('onClickLeft ');
};

// tabControl相关操作
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => {
    return scrollTop.value > 300;
});

// const landloardRef = ref();
// const sectionEls = [];
// const getSectionRef = (value) => {
//     sectionEls.push(value.$el);
// };
const sectionEls = ref({});
const titles = computed(() => {
    return Object.keys(sectionEls.value);
});
const getSectionRef = (value) => {
    // console.log('vvvv:', value.$el.getAttribute('name'));
    if (value) {
        const name = value.$el.getAttribute('name');
        sectionEls.value[name] = value.$el;
    }
    // console.log(value);
};

const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index];
    const el = sectionEls.value[key];
    let instance = el.offsetTop;
    if (index != 0) {
        instance -= 44;
    }
    detailRef.value.scrollTo({
        top: instance,
        behavior: 'smooth',
    });
};
</script>

<style lang="less" scoped>
.detail {
    position: relative;
    z-index: 9;
    height: 100vh;
    padding-bottom: 60px;
    background-color: #fff;
    overflow-y: auto;

    // &:deep(.van-nav-bar__left) {
    //     font-size: 16px;
    //     font-weight: 600;
    // }
}
.tabs {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
}

.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
        width: 123px;
    }

    .text {
        margin-top: 12px;
        font-size: 12px;
        color: #7688a7;
    }
}
</style>
