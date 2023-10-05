<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="" />
            </div>
        </div>
        <!-- 日期范围 -->
        <div class="section date-range" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDate }}</span>
                </div>
            </div>
            <div class="stay">共{{ stayCount }}晚</div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDate }}</span>
                </div>
            </div>
        </div>

        <van-calendar
            v-model:show="showCalendar"
            type="range"
            :round="false"
            :show-confirm="false"
            @confirm="onConfirm"
        />

        <!-- 价格/人数选择 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>

        <!-- 关键字 -->
        <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

        <!-- 热门建议 -->
        <div class="section hot-suggests">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city.js';
import { storeToRefs } from 'pinia';
import { formatMonthDay, getDiffDays } from '@/utils/format_date.js';
import useHomeStore from '@/stores/modules/home.js';

const router = useRouter();

// 位置/城市
const cityClick = () => {
    router.push('/city');
};
const positionClick = () => {
    navigator.geolocation.getCurrentPosition(
        (res) => {
            console.log('获取位置成功', res);
        },
        (err) => {
            console.log('获取位置失败', err);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
};

// 当前城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围处理
const nowDate = new Date();
const startDate = ref(formatMonthDay(nowDate));
const newDate = nowDate.setDate(nowDate.getDate() + 1);
const endDate = ref(formatMonthDay(newDate));
const stayCount = ref(1);
const showCalendar = ref(false);
const onConfirm = (value) => {
    startDate.value = formatMonthDay(value[0]);
    endDate.value = formatMonthDay(value[1]);
    stayCount.value = getDiffDays(value[0], value[1]);
    showCalendar.value = false;
};

// 从store中获取数据
const homeStore = useHomeStore();
homeStore.fetchHotSuggestsData();
homeStore.fetchCategoriesData();
const { hotSuggests, categories } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.search-box {
    --van-calendar-popup-height: 100%;
}
.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
        flex: 1;
        color: #333;
        font-size: 15px;
    }
    .position {
        width: 74px;
        align-items: center;
        .text {
            font-size: 12px;
            color: #666;
        }
        img {
            padding-left: 7px;
            width: 18px;
            height: 18px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.date-range {
    height: 44px;
    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}

.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}

.hot-suggests {
    margin: 10px 0;
    height: auto;

    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}

.search-btn {
    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}
</style>
